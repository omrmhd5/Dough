import {
  DeleteObjectsCommand,
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

/**
 * Everything the portal publishes lives in a Backblaze B2 bucket (S3 API):
 *   pages/<id>/<version>/<file>        the files of one version (never changed once written)
 *   portal/manifest/<time>-<rand>.json the page list; every change writes a NEW file
 *   portal/current.json                a tiny pointer to the newest page list
 *
 * The bucket stays private: the server reads with its key, and the browser
 * uploads with short-lived signed links.
 */

export type PageVersion = { id: string; at: string; note: string; files: number };
export type PortalPage = {
  id: string;
  slug: string;
  title: string;
  current: string;
  versions: PageVersion[];
  createdAt: string;
  updatedAt: string;
};
export type Manifest = { pages: PortalPage[] };

export class PortalError extends Error {
  status: number;
  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
  }
}

const MANIFEST_DIR = "portal/manifest/";
const POINTER = "portal/current.json";
const KEEP_MANIFESTS = 6;
const PUBLIC_TTL = 30_000;

const REQUIRED = ["B2_ENDPOINT", "B2_REGION", "B2_BUCKET", "B2_KEY_ID", "B2_APP_KEY"] as const;

export const configured = () => REQUIRED.every((name) => Boolean(process.env[name]));

function requireConfig() {
  const missing = REQUIRED.filter((name) => !process.env[name]);
  if (missing.length) {
    throw new PortalError(`Storage is not connected yet (missing ${missing.join(", ")}).`, 500);
  }
}

let client: S3Client | null = null;
function s3() {
  requireConfig();
  client ??= new S3Client({
    region: process.env.B2_REGION!,
    endpoint: process.env.B2_ENDPOINT!,
    forcePathStyle: true,
    credentials: {
      accessKeyId: process.env.B2_KEY_ID!,
      secretAccessKey: process.env.B2_APP_KEY!,
    },
    // B2 does not accept the extra checksum headers newer SDKs add by default.
    requestChecksumCalculation: "WHEN_REQUIRED",
    responseChecksumValidation: "WHEN_REQUIRED",
  });
  return client;
}

const bucket = () => process.env.B2_BUCKET!;

/* ── Basic object operations ──────────────────────────────────────────── */

export async function putObject(
  key: string,
  body: string | Uint8Array,
  contentType: string,
) {
  await s3().send(
    new PutObjectCommand({ Bucket: bucket(), Key: key, Body: body, ContentType: contentType }),
  );
}

/** Returns null when the object does not exist. */
export async function getObject(key: string, range?: string) {
  try {
    return await s3().send(new GetObjectCommand({ Bucket: bucket(), Key: key, Range: range }));
  } catch (error) {
    const status = (error as { $metadata?: { httpStatusCode?: number } }).$metadata?.httpStatusCode;
    const name = (error as { name?: string }).name;
    if (status === 404 || name === "NoSuchKey" || name === "NotFound") return null;
    throw error;
  }
}

async function getJson<T>(key: string): Promise<T | null> {
  const object = await getObject(key);
  if (!object?.Body) return null;
  return JSON.parse(await object.Body.transformToString()) as T;
}

export async function listPrefix(prefix: string) {
  requireConfig();
  const found: { key: string; pathname: string; uploadedAt: number }[] = [];
  let token: string | undefined;
  do {
    const page = await s3().send(
      new ListObjectsV2Command({ Bucket: bucket(), Prefix: prefix, ContinuationToken: token }),
    );
    for (const item of page.Contents ?? []) {
      if (!item.Key) continue;
      found.push({
        key: item.Key,
        pathname: item.Key,
        uploadedAt: item.LastModified?.getTime() ?? 0,
      });
    }
    token = page.IsTruncated ? page.NextContinuationToken : undefined;
  } while (token);
  return found;
}

export async function removeObjects(keys: string[]) {
  requireConfig();
  for (let i = 0; i < keys.length; i += 1000) {
    await s3().send(
      new DeleteObjectsCommand({
        Bucket: bucket(),
        Delete: { Objects: keys.slice(i, i + 1000).map((Key) => ({ Key })), Quiet: true },
      }),
    );
  }
}

/** A link the browser can PUT one file to, valid for ten minutes. */
export async function signedUploadUrl(key: string, contentType: string, size: number) {
  return getSignedUrl(
    s3(),
    new PutObjectCommand({ Bucket: bucket(), Key: key, ContentType: contentType, ContentLength: size }),
    { expiresIn: 600 },
  );
}

/* ── The page list ────────────────────────────────────────────────────── */

async function manifestFiles() {
  const files = await listPrefix(MANIFEST_DIR);
  return files.sort((a, b) => (a.key < b.key ? 1 : -1));
}

/** The newest list, plus the name it was stored under (empty before the first save). */
async function readLatest(): Promise<{ manifest: Manifest; pathname: string }> {
  const files = await manifestFiles();
  if (!files.length) return { manifest: { pages: [] }, pathname: "" };
  const manifest = await getJson<Manifest>(files[0].key);
  return {
    manifest: { pages: Array.isArray(manifest?.pages) ? manifest!.pages : [] },
    pathname: files[0].key,
  };
}

let cached: { at: number; manifest: Manifest } | null = null;

/** What visitors read: the pointer file, then the list it names (no listing). */
async function readPublic(): Promise<Manifest> {
  try {
    const pointer = await getJson<{ pathname?: string }>(POINTER);
    if (pointer?.pathname) {
      const manifest = await getJson<Manifest>(pointer.pathname);
      if (manifest) return { pages: Array.isArray(manifest.pages) ? manifest.pages : [] };
    }
  } catch {}
  return (await readLatest()).manifest;
}

/**
 * Visitors (fresh = false) are served from a short per-server cache and the
 * pointer file. The portal (fresh = true) always lists, so it never sees a stale list.
 */
export async function readManifest(fresh = false): Promise<Manifest> {
  requireConfig();
  if (!fresh && cached && Date.now() - cached.at < PUBLIC_TTL) return cached.manifest;
  const manifest = fresh ? (await readLatest()).manifest : await readPublic();
  cached = { at: Date.now(), manifest };
  return manifest;
}

/** Read, change and save the list as a new file; if two people save at once the loser retries. */
export async function updateManifest<T>(change: (manifest: Manifest) => T | Promise<T>): Promise<T> {
  requireConfig();
  for (let attempt = 0; attempt < 5; attempt++) {
    const { manifest, pathname: basedOn } = await readLatest();
    const result = await change(manifest);

    const mine = `${MANIFEST_DIR}${String(Date.now()).padStart(15, "0")}-${Math.random()
      .toString(36)
      .slice(2, 8)}.json`;
    await putObject(mine, JSON.stringify(manifest, null, 2), "application/json");

    // Someone saved after we read? Then our copy is out of date: drop it and start over.
    const files = await manifestFiles();
    if (files.some((f) => f.key > basedOn && f.key !== mine)) {
      await removeObjects([mine]).catch(() => {});
      await new Promise((resolve) => setTimeout(resolve, 150 + Math.random() * 450));
      continue;
    }

    cached = { at: Date.now(), manifest };
    await putObject(POINTER, JSON.stringify({ pathname: mine }), "application/json");
    // Old copies are only kept for a short history; clearing them is best effort.
    const stale = files.slice(KEEP_MANIFESTS).map((f) => f.key);
    if (stale.length) await removeObjects(stale).catch(() => {});
    return result;
  }
  throw new PortalError("Someone saved at the same moment. Try again.", 409);
}
