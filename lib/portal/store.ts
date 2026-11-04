import { del, head, list, put } from "@vercel/blob";

/**
 * Everything the portal publishes lives in Vercel Blob:
 *   pages/<id>/<version>/<file>        the files of one version (never changed once written)
 *   portal/manifest/<time>-<rand>.json the page list; every change writes a NEW file
 *
 * The list is never overwritten in place: a blob's public URL is cached by the
 * CDN, so an overwritten list can be read stale for a minute. A new path is
 * always fresh, and the newest one (found with list(), which is not cached) wins.
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
const OLD_MANIFEST = "portal/manifest.json";
const KEEP_MANIFESTS = 6;
const READ_TTL = 8_000;

export const configured = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN);

function requireToken() {
  if (!configured()) {
    throw new PortalError(
      "Storage is not connected yet (BLOB_READ_WRITE_TOKEN is missing).",
      500,
    );
  }
}

/** Public blob URLs are https://<store id>.public.blob.vercel-storage.com/<pathname>. */
function baseUrl() {
  const storeId = (process.env.BLOB_READ_WRITE_TOKEN ?? "").split("_")[3];
  if (!storeId) throw new PortalError("The Blob token looks wrong.", 500);
  return `https://${storeId.toLowerCase()}.public.blob.vercel-storage.com`;
}

export const urlFor = (pathname: string) =>
  `${baseUrl()}/${pathname.split("/").map(encodeURIComponent).join("/")}`;

async function fetchJson(url: string): Promise<Manifest> {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) throw new PortalError("Could not read the page list.", 502);
  const parsed = (await response.json()) as Manifest;
  return { pages: Array.isArray(parsed.pages) ? parsed.pages : [] };
}

async function manifestFiles() {
  const found: { pathname: string; url: string }[] = [];
  let cursor: string | undefined;
  do {
    const page = await list({ prefix: MANIFEST_DIR, cursor, limit: 1000 });
    found.push(...page.blobs.map((b) => ({ pathname: b.pathname, url: b.url })));
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  return found.sort((a, b) => (a.pathname < b.pathname ? 1 : -1));
}

/** The newest list, plus the name it was stored under (empty before the first save). */
async function readLatest(): Promise<{ manifest: Manifest; pathname: string }> {
  const files = await manifestFiles();
  if (files.length) return { manifest: await fetchJson(files[0].url), pathname: files[0].pathname };
  // Lists saved by the first version of the portal used a single file.
  const old = await head(OLD_MANIFEST).catch(() => null);
  if (old) return { manifest: await fetchJson(`${old.url}?t=${Date.now()}`), pathname: "" };
  return { manifest: { pages: [] }, pathname: "" };
}

let cached: { at: number; manifest: Manifest } | null = null;

/** Public pages read the list often, so it is kept for a few seconds per server. */
export async function readManifest(fresh = false): Promise<Manifest> {
  requireToken();
  if (!fresh && cached && Date.now() - cached.at < READ_TTL) return cached.manifest;
  const { manifest } = await readLatest();
  cached = { at: Date.now(), manifest };
  return manifest;
}

/** Read, change and save the list as a new file; if two people save at once the loser retries. */
export async function updateManifest<T>(change: (manifest: Manifest) => T | Promise<T>): Promise<T> {
  requireToken();
  for (let attempt = 0; attempt < 5; attempt++) {
    const { manifest, pathname: basedOn } = await readLatest();
    const result = await change(manifest);

    const mine = `${MANIFEST_DIR}${String(Date.now()).padStart(15, "0")}-${Math.random()
      .toString(36)
      .slice(2, 8)}.json`;
    const saved = await put(mine, JSON.stringify(manifest, null, 2), {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: false,
    });

    // Someone saved after we read? Then our copy is out of date: drop it and start over.
    const files = await manifestFiles();
    if (files.some((f) => f.pathname > basedOn && f.pathname !== mine)) {
      await del(saved.url).catch(() => {});
      await new Promise((resolve) => setTimeout(resolve, 150 + Math.random() * 450));
      continue;
    }

    cached = { at: Date.now(), manifest };
    // Old copies are only kept for a short history; clearing them is best effort.
    const stale = files.slice(KEEP_MANIFESTS).map((f) => f.url);
    if (stale.length) await del(stale).catch(() => {});
    return result;
  }
  throw new PortalError("Someone saved at the same moment. Try again.", 409);
}

export async function listPrefix(prefix: string) {
  requireToken();
  const found: { url: string; pathname: string }[] = [];
  let cursor: string | undefined;
  do {
    const page = await list({ prefix, cursor, limit: 1000 });
    found.push(...page.blobs.map((b) => ({ url: b.url, pathname: b.pathname })));
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  return found;
}

export async function removeBlobs(urls: string[]) {
  for (let i = 0; i < urls.length; i += 100) await del(urls.slice(i, i + 100));
}
