import { del, head, list, put } from "@vercel/blob";

/**
 * Everything the portal publishes lives in Vercel Blob:
 *   pages/<id>/<version>/<file>   the files of one version (never changed once written)
 *   portal/manifest.json          which address points at which page and version
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

const MANIFEST = "portal/manifest.json";
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

let cached: { at: number; manifest: Manifest } | null = null;

async function fetchManifest(): Promise<Manifest> {
  const response = await fetch(`${urlFor(MANIFEST)}?t=${Date.now()}`, { cache: "no-store" });
  if (response.status === 404) return { pages: [] };
  if (!response.ok) throw new PortalError("Could not read the page list.", 502);
  const parsed = (await response.json()) as Manifest;
  return { pages: Array.isArray(parsed.pages) ? parsed.pages : [] };
}

/** Public pages read the list often, so it is kept for a few seconds per server. */
export async function readManifest(fresh = false): Promise<Manifest> {
  requireToken();
  if (!fresh && cached && Date.now() - cached.at < READ_TTL) return cached.manifest;
  const manifest = await fetchManifest();
  cached = { at: Date.now(), manifest };
  return manifest;
}

/** Read, change and write the list; if two people save at once the loser retries on the new list. */
export async function updateManifest<T>(change: (manifest: Manifest) => T | Promise<T>): Promise<T> {
  requireToken();
  let lastError: unknown;
  for (let attempt = 0; attempt < 5; attempt++) {
    const current = await head(MANIFEST).catch(() => null);
    const manifest = current
      ? ((await (await fetch(`${current.url}?t=${Date.now()}`, { cache: "no-store" })).json()) as Manifest)
      : { pages: [] };
    manifest.pages ??= [];
    const result = await change(manifest);
    try {
      await put(MANIFEST, JSON.stringify(manifest, null, 2), {
        access: "public",
        contentType: "application/json",
        allowOverwrite: true,
        cacheControlMaxAge: 60,
        ...(current ? { ifMatch: current.etag } : {}),
      });
      cached = { at: Date.now(), manifest };
      return result;
    } catch (error) {
      lastError = error;
      if (error instanceof Error && /precondition|etag|412/i.test(error.message)) continue;
      throw error;
    }
  }
  throw lastError instanceof Error ? lastError : new PortalError("Someone saved at the same moment. Try again.", 409);
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
