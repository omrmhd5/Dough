import {
  listPrefix,
  PortalError,
  readManifest,
  removeObjects,
  updateManifest,
  type PortalPage,
} from "./store";

export { PortalError };
export type { PortalPage };

export const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const ID_RE = /^[a-z0-9]{8,24}$/;
export const MAX_FILES = 400;
export const MAX_FILE_BYTES = 100_000_000;

/** Addresses the website itself uses; a published page can never take these. */
const RESERVED = new Set([
  "api", "portal", "p", "work", "contact", "profile", "clients", "uncledough",
  "cases", "home", "brand", "fonts", "images", "favicon.ico", "robots.txt",
  "sitemap.xml", "admin", "login", "_next",
]);

export const ALLOWED_EXT = new Set([
  "html", "htm", "css", "js", "mjs", "json", "txt", "svg", "ico", "map",
  "png", "jpg", "jpeg", "gif", "webp", "avif",
  "woff", "woff2", "ttf", "otf",
  "mp4", "webm", "mp3", "m4a", "wav",
]);

export function validateSlug(slug: unknown): string {
  if (typeof slug !== "string" || !SLUG_RE.test(slug) || slug.length > 60) {
    throw new PortalError(
      "The address can only use lowercase letters, numbers and dashes, for example client-content-calendar.",
    );
  }
  if (RESERVED.has(slug)) {
    throw new PortalError(`"${slug}" is already used by the website. Pick another address.`, 409);
  }
  return slug;
}

export function validateFilePath(path: unknown): string {
  if (
    typeof path !== "string" ||
    !path ||
    path.length > 200 ||
    path.split("/").some((part) => !part || part === "." || part === "..") ||
    !/^[A-Za-z0-9._ \-()]+(\/[A-Za-z0-9._ \-()]+)*$/.test(path)
  ) {
    throw new PortalError(`"${String(path)}" is not an allowed file name.`);
  }
  const ext = path.split(".").pop()?.toLowerCase() ?? "";
  if (!ALLOWED_EXT.has(ext)) {
    throw new PortalError(`Files of type .${ext} are not allowed (${path}).`);
  }
  return path;
}

/** Upload paths look like pages/<page id>/<version id>/<file>. */
export function parseUploadPath(pathname: string) {
  const match = pathname.match(/^pages\/([a-z0-9]{8,24})\/([a-z0-9]{6,16})\/(.+)$/);
  if (!match) throw new PortalError("Upload path not allowed.");
  return { id: match[1], version: match[2], file: validateFilePath(match[3]) };
}

const now = () => new Date().toISOString();

export type Publish = {
  mode: "create" | "update";
  pageId: string;
  slug: string;
  title: string;
  version: string;
  files: string[];
};

export async function publishPage(input: Publish) {
  const slug = validateSlug(input.slug);
  if (!ID_RE.test(input.pageId) || !/^[a-z0-9]{6,16}$/.test(input.version)) {
    throw new PortalError("Bad upload reference.");
  }
  const title = String(input.title ?? "").trim().slice(0, 120) || slug;
  const files = (input.files ?? []).map(validateFilePath);
  if (!files.length || files.length > MAX_FILES) {
    throw new PortalError(`Upload between 1 and ${MAX_FILES} files.`);
  }
  if (!files.includes("index.html")) {
    throw new PortalError("The upload needs an index.html at its top level.");
  }

  // Every file must really be in storage before the address points at it.
  const stored = new Set(
    (await listPrefix(`pages/${input.pageId}/${input.version}/`)).map((b) =>
      b.pathname.slice(`pages/${input.pageId}/${input.version}/`.length),
    ),
  );
  const missing = files.find((f) => !stored.has(f));
  if (missing) throw new PortalError(`${missing} did not finish uploading. Try again.`);

  return updateManifest((manifest) => {
    const existing = manifest.pages.find((p) => p.slug === slug);
    const version = {
      id: input.version,
      at: now(),
      note: existing ? "Updated" : "Published",
      files: files.length,
    };
    let page: PortalPage;
    if (input.mode === "create") {
      if (existing) throw new PortalError(`"${slug}" is already a published page.`, 409);
      if (manifest.pages.some((p) => p.id === input.pageId)) {
        throw new PortalError("That upload was already used.", 409);
      }
      page = {
        id: input.pageId,
        slug,
        title,
        current: version.id,
        versions: [version],
        createdAt: now(),
        updatedAt: now(),
      };
    } else {
      if (!existing || existing.id !== input.pageId) {
        throw new PortalError(`"${slug}" is not published.`, 404);
      }
      page = {
        ...existing,
        current: version.id,
        versions: [version, ...existing.versions],
        updatedAt: now(),
      };
    }
    manifest.pages = [...manifest.pages.filter((p) => p.slug !== slug), page];
    return page;
  });
}

export async function editPage(input: { slug: string; newSlug?: string; title?: string }) {
  const slug = String(input.slug);
  const newSlug = input.newSlug && input.newSlug !== slug ? validateSlug(input.newSlug) : slug;
  return updateManifest((manifest) => {
    const existing = manifest.pages.find((p) => p.slug === slug);
    if (!existing) throw new PortalError(`"${slug}" is not published.`, 404);
    if (newSlug !== slug && manifest.pages.some((p) => p.slug === newSlug)) {
      throw new PortalError(`"${newSlug}" is already a published page.`, 409);
    }
    const page = {
      ...existing,
      slug: newSlug,
      title: (input.title ?? existing.title).trim().slice(0, 120) || newSlug,
      updatedAt: now(),
    };
    manifest.pages = manifest.pages.map((p) => (p.id === existing.id ? page : p));
    return page;
  });
}

export async function restorePage(input: { slug: string; version: string }) {
  return updateManifest((manifest) => {
    const existing = manifest.pages.find((p) => p.slug === input.slug);
    if (!existing) throw new PortalError(`"${input.slug}" is not published.`, 404);
    if (!existing.versions.some((v) => v.id === input.version)) {
      throw new PortalError("That version no longer exists.", 404);
    }
    const page = { ...existing, current: input.version, updatedAt: now() };
    manifest.pages = manifest.pages.map((p) => (p.id === existing.id ? page : p));
    return page;
  });
}

export async function deletePage(slug: string) {
  const removed = await updateManifest((manifest) => {
    const existing = manifest.pages.find((p) => p.slug === slug);
    if (!existing) throw new PortalError(`"${slug}" is not published.`, 404);
    manifest.pages = manifest.pages.filter((p) => p.id !== existing.id);
    return existing;
  });
  // The address is gone; now remove every stored version of the page.
  try {
    await removeObjects((await listPrefix(`pages/${removed.id}/`)).map((b) => b.key));
  } catch {
    throw new PortalError(
      "The page was removed, but some of its files could not be deleted. Use Clean up to remove them.",
      500,
    );
  }
}

/** Before uploading anything: is this address allowed and does it fit the action? */
export async function checkSlug(input: { mode: "create" | "update"; slug: string }) {
  const slug = validateSlug(input.slug);
  const exists = (await readManifest(true)).pages.some((p) => p.slug === slug);
  if (input.mode === "create" && exists) {
    throw new PortalError(`"${slug}" is already published. Use Update on that page instead.`, 409);
  }
  if (input.mode === "update" && !exists) {
    throw new PortalError(`"${slug}" is not published.`, 404);
  }
}

/** Removes files of an upload that never became a version (a failed publish). */
export async function discardUpload(input: { pageId: string; version: string }) {
  if (!ID_RE.test(input.pageId) || !/^[a-z0-9]{6,16}$/.test(input.version)) return 0;
  const manifest = await readManifest(true);
  const used = manifest.pages.some(
    (p) => p.id === input.pageId && p.versions.some((v) => v.id === input.version),
  );
  if (used) return 0;
  const orphans = await listPrefix(`pages/${input.pageId}/${input.version}/`);
  await removeObjects(orphans.map((b) => b.key));
  return orphans.length;
}

/** Removes every stored file that no page version points at (older than 10 minutes, so uploads in progress are safe). */
export async function sweepUnused() {
  const manifest = await readManifest(true);
  const keep = manifest.pages.flatMap((p) => p.versions.map((v) => `pages/${p.id}/${v.id}/`));
  const cutoff = Date.now() - 10 * 60 * 1000;
  const orphans = (await listPrefix("pages/")).filter(
    (b) => b.uploadedAt < cutoff && !keep.some((prefix) => b.pathname.startsWith(prefix)),
  );
  await removeObjects(orphans.map((b) => b.key));
  return orphans.length;
}

export async function listPages() {
  const manifest = await readManifest(true);
  return manifest.pages.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}
