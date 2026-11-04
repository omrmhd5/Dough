/** Reads a .zip in the browser (no dependency): stored and deflate entries only. */

export type ZipFile = { path: string; data: Uint8Array };

const u16 = (v: DataView, o: number) => v.getUint16(o, true);
const u32 = (v: DataView, o: number) => v.getUint32(o, true);

async function inflate(data: Uint8Array): Promise<Uint8Array> {
  const stream = new Blob([data as BlobPart])
    .stream()
    .pipeThrough(new DecompressionStream("deflate-raw"));
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

export async function readZip(buffer: ArrayBuffer): Promise<ZipFile[]> {
  const view = new DataView(buffer);
  const bytes = new Uint8Array(buffer);

  let eocd = -1;
  for (let i = buffer.byteLength - 22; i >= Math.max(0, buffer.byteLength - 65557); i--) {
    if (u32(view, i) === 0x06054b50) {
      eocd = i;
      break;
    }
  }
  if (eocd < 0) throw new Error("This does not look like a zip file.");

  const count = u16(view, eocd + 10);
  let offset = u32(view, eocd + 16);
  const decoder = new TextDecoder();
  const files: ZipFile[] = [];

  for (let n = 0; n < count; n++) {
    if (u32(view, offset) !== 0x02014b50) throw new Error("The zip is damaged.");
    const flags = u16(view, offset + 8);
    const method = u16(view, offset + 10);
    const compressed = u32(view, offset + 20);
    const nameLength = u16(view, offset + 28);
    const extraLength = u16(view, offset + 30);
    const commentLength = u16(view, offset + 32);
    const local = u32(view, offset + 42);
    // Some Windows tools write backslashes; zips use forward slashes.
    const name = decoder
      .decode(bytes.subarray(offset + 46, offset + 46 + nameLength))
      .replace(/\\/g, "/");
    offset += 46 + nameLength + extraLength + commentLength;

    if (name.endsWith("/")) continue;
    if (flags & 1) throw new Error("Password-protected zips are not supported.");

    const localName = u16(view, local + 26);
    const localExtra = u16(view, local + 28);
    const start = local + 30 + localName + localExtra;
    const raw = bytes.subarray(start, start + compressed);

    if (method === 0) files.push({ path: name, data: raw.slice() });
    else if (method === 8) files.push({ path: name, data: await inflate(raw) });
    else throw new Error(`Unsupported zip compression in ${name}.`);
  }
  return files;
}

/** Drops system files and a single wrapping folder, so index.html ends up at the top. */
export function tidyZip(files: ZipFile[]): ZipFile[] {
  let list = files.filter(
    (f) =>
      !f.path.startsWith("__MACOSX/") &&
      !f.path.split("/").some((part) => part === ".DS_Store" || part === "Thumbs.db"),
  );
  const firstSegments = new Set(list.map((f) => f.path.split("/")[0]));
  if (
    firstSegments.size === 1 &&
    list.every((f) => f.path.includes("/")) &&
    !list.some((f) => f.path === "index.html")
  ) {
    list = list.map((f) => ({ ...f, path: f.path.split("/").slice(1).join("/") }));
  }
  return list;
}

/**
 * Makes the page work at /<slug> without a trailing slash: relative links
 * (img/…, style.css) resolve against the page's own folder.
 */
export function prepareIndex(html: string, slug: string, hideFromSearch: boolean) {
  let tags = "";
  if (!/<base\s/i.test(html)) tags += `<base href="/${slug}/" data-portal>`;
  if (hideFromSearch && !/name=["']?robots/i.test(html)) {
    tags += `<meta name="robots" content="noindex, nofollow">`;
  }
  if (!tags) return html;
  if (/<head[^>]*>/i.test(html)) return html.replace(/<head[^>]*>/i, (m) => m + tags);
  if (/<html[^>]*>/i.test(html)) return html.replace(/<html[^>]*>/i, (m) => `${m}<head>${tags}</head>`);
  return `${tags}${html}`;
}

export function titleOf(html: string, fallback: string) {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (!match) return fallback;
  return match[1]
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim() || fallback;
}
