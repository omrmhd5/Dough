import {
  commitOnHead,
  createBlob,
  readBlob,
  recursiveTree,
  treeAtCommit,
  type Change,
  type TreeEntry,
} from "./github";

export const MANIFEST_PATH = "data/pages.json";
export const FILES_ROOT = "public/p";

export type PortalPage = {
  slug: string;
  title: string;
  version: number;
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

export const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Addresses the website itself uses; a published page can never take these. */
const RESERVED = new Set([
  "api",
  "portal",
  "p",
  "work",
  "contact",
  "profile",
  "clients",
  "uncledough",
  "cases",
  "home",
  "brand",
  "fonts",
  "images",
  "favicon.ico",
  "robots.txt",
  "sitemap.xml",
  "admin",
  "login",
]);

export const ALLOWED_EXT = new Set([
  "html", "htm", "css", "js", "mjs", "json", "txt", "svg", "ico", "map",
  "png", "jpg", "jpeg", "gif", "webp", "avif",
  "woff", "woff2", "ttf", "otf",
  "mp4", "webm", "mp3", "m4a", "wav",
]);

export const MAX_FILES = 400;

export function validateSlug(slug: unknown): string {
  if (typeof slug !== "string" || !SLUG_RE.test(slug) || slug.length > 60) {
    throw new PortalError(
      "The address can only use lowercase letters, numbers and dashes, for example primos-november-calendar.",
    );
  }
  if (RESERVED.has(slug)) {
    throw new PortalError(`"${slug}" is used by the website. Pick another address.`);
  }
  return slug;
}

export function validateFilePath(path: unknown): string {
  if (
    typeof path !== "string" ||
    !path ||
    path.length > 200 ||
    path.startsWith("/") ||
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

const prefixOf = (slug: string) => `${FILES_ROOT}/${slug}/`;
const now = () => new Date().toISOString();

async function loadManifest(tree: TreeEntry[]): Promise<Manifest> {
  const entry = tree.find((e) => e.path === MANIFEST_PATH);
  if (!entry) return { pages: [] };
  try {
    const parsed = JSON.parse((await readBlob(entry.sha)).toString("utf8"));
    return { pages: Array.isArray(parsed.pages) ? parsed.pages : [] };
  } catch {
    return { pages: [] };
  }
}

async function manifestChange(manifest: Manifest): Promise<Change> {
  const body = JSON.stringify(manifest, null, 2) + "\n";
  const sha = await createBlob(Buffer.from(body, "utf8").toString("base64"));
  return { path: MANIFEST_PATH, sha };
}

/** The address a new page wants must not clash with the site's own routes or folders. */
function assertFree(tree: TreeEntry[], manifest: Manifest, slug: string) {
  if (manifest.pages.some((p) => p.slug === slug)) {
    throw new PortalError(`"${slug}" is already a published page.`, 409);
  }
  const taken = tree.some(
    (e) =>
      e.path === slug ||
      e.path === `app/${slug}` ||
      e.path === `public/${slug}`,
  );
  if (taken) {
    throw new PortalError(`"${slug}" is used by the website. Pick another address.`, 409);
  }
}

/** The base address injected at publish must follow the page when it moves or is restored. */
async function withBase(entry: TreeEntry, slug: string): Promise<string> {
  if (!/\.html?$/i.test(entry.path)) return entry.sha;
  const html = (await readBlob(entry.sha)).toString("utf8");
  const pattern = /<base\s+href="[^"]*"\s+data-portal>/i;
  const wanted = `<base href="/${slug}/" data-portal>`;
  if (!pattern.test(html) || html.includes(wanted)) return entry.sha;
  return createBlob(
    Buffer.from(html.replace(pattern, wanted), "utf8").toString("base64"),
  );
}

export type Publish = {
  mode: "create" | "update";
  slug: string;
  title: string;
  files: { path: string; sha: string }[];
};

export async function publishPage(input: Publish) {
  const slug = validateSlug(input.slug);
  const title = String(input.title ?? "").trim().slice(0, 120) || slug;
  if (!Array.isArray(input.files) || !input.files.length) {
    throw new PortalError("The upload has no files.");
  }
  if (input.files.length > MAX_FILES) {
    throw new PortalError(`Too many files (limit ${MAX_FILES}).`);
  }
  const files = input.files.map((f) => ({
    path: validateFilePath(f.path),
    sha: String(f.sha),
  }));
  if (!files.some((f) => f.path === "index.html")) {
    throw new PortalError("The zip needs an index.html at its top level.");
  }
  if (new Set(files.map((f) => f.path)).size !== files.length) {
    throw new PortalError("The zip contains the same file twice.");
  }

  let page!: PortalPage;
  await commitOnHead(async (head) => {
    const tree = await recursiveTree(head.tree);
    const manifest = await loadManifest(tree);
    const existing = manifest.pages.find((p) => p.slug === slug);
    if (input.mode === "create") assertFree(tree, manifest, slug);
    else if (!existing) throw new PortalError(`"${slug}" is not published.`, 404);

    const prefix = prefixOf(slug);
    const changes: Change[] = files.map((f) => ({
      path: prefix + f.path,
      sha: f.sha,
    }));
    const keep = new Set(changes.map((c) => c.path));
    for (const entry of tree) {
      if (entry.type === "blob" && entry.path.startsWith(prefix) && !keep.has(entry.path)) {
        changes.push({ path: entry.path, sha: null });
      }
    }

    page = existing
      ? { ...existing, title, version: existing.version + 1, updatedAt: now() }
      : { slug, title, version: 1, createdAt: now(), updatedAt: now() };
    manifest.pages = [...manifest.pages.filter((p) => p.slug !== slug), page];
    changes.push(await manifestChange(manifest));
    return {
      message: existing
        ? `Update page /${slug} (version ${page.version})`
        : `Publish page /${slug}`,
      changes,
    };
  });
  return page;
}

export async function editPage(input: {
  slug: string;
  newSlug?: string;
  title?: string;
}) {
  const slug = validateSlug(input.slug);
  const newSlug = input.newSlug ? validateSlug(input.newSlug) : slug;
  let page!: PortalPage;
  await commitOnHead(async (head) => {
    const tree = await recursiveTree(head.tree);
    const manifest = await loadManifest(tree);
    const existing = manifest.pages.find((p) => p.slug === slug);
    if (!existing) throw new PortalError(`"${slug}" is not published.`, 404);

    const changes: Change[] = [];
    if (newSlug !== slug) {
      assertFree(tree, manifest, newSlug);
      const from = prefixOf(slug);
      const to = prefixOf(newSlug);
      for (const entry of tree) {
        if (entry.type !== "blob" || !entry.path.startsWith(from)) continue;
        changes.push({ path: entry.path, sha: null });
        changes.push({
          path: to + entry.path.slice(from.length),
          sha: await withBase(entry, newSlug),
        });
      }
    }
    page = {
      ...existing,
      slug: newSlug,
      title: (input.title ?? existing.title).trim().slice(0, 120) || newSlug,
      updatedAt: now(),
    };
    manifest.pages = [...manifest.pages.filter((p) => p.slug !== slug), page];
    changes.push(await manifestChange(manifest));
    return { message: `Edit page /${slug}${newSlug !== slug ? ` → /${newSlug}` : ""}`, changes };
  });
  return page;
}

export async function deletePage(slugInput: string) {
  const slug = validateSlug(slugInput);
  await commitOnHead(async (head) => {
    const tree = await recursiveTree(head.tree);
    const manifest = await loadManifest(tree);
    if (!manifest.pages.some((p) => p.slug === slug)) {
      throw new PortalError(`"${slug}" is not published.`, 404);
    }
    const prefix = prefixOf(slug);
    const changes: Change[] = tree
      .filter((e) => e.type === "blob" && e.path.startsWith(prefix))
      .map((e) => ({ path: e.path, sha: null }));
    manifest.pages = manifest.pages.filter((p) => p.slug !== slug);
    changes.push(await manifestChange(manifest));
    return { message: `Delete page /${slug}`, changes };
  });
}

export async function restorePage(input: { slug: string; sha: string }) {
  const slug = validateSlug(input.slug);
  if (!/^[0-9a-f]{40}$/.test(input.sha)) throw new PortalError("Unknown version.");
  const old = (await treeAtCommit(input.sha)).filter(
    (e) => e.type === "blob" && e.path.startsWith(prefixOf(slug)),
  );
  if (!old.length) throw new PortalError("That version has no files for this page.");

  let page!: PortalPage;
  await commitOnHead(async (head) => {
    const tree = await recursiveTree(head.tree);
    const manifest = await loadManifest(tree);
    const existing = manifest.pages.find((p) => p.slug === slug);
    if (!existing) throw new PortalError(`"${slug}" is not published.`, 404);

    const changes: Change[] = [];
    for (const entry of old) {
      changes.push({ path: entry.path, sha: await withBase(entry, slug) });
    }
    const keep = new Set(old.map((e) => e.path));
    for (const entry of tree) {
      if (entry.type === "blob" && entry.path.startsWith(prefixOf(slug)) && !keep.has(entry.path)) {
        changes.push({ path: entry.path, sha: null });
      }
    }
    page = { ...existing, version: existing.version + 1, updatedAt: now() };
    manifest.pages = [...manifest.pages.filter((p) => p.slug !== slug), page];
    changes.push(await manifestChange(manifest));
    return {
      message: `Restore page /${slug} to ${input.sha.slice(0, 7)} (version ${page.version})`,
      changes,
    };
  });
  return page;
}

export async function listPages(): Promise<PortalPage[]> {
  const { getHead } = await import("./github");
  const head = await getHead();
  const tree = await recursiveTree(head.tree);
  const manifest = await loadManifest(tree);
  return manifest.pages.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}
