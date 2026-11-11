import { configured, getObject, readManifest } from "@/lib/portal/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Serves pages published through /portal at xdough.com/<address>.
 * Real routes and files of the site are matched first; anything else lands
 * here and is looked up in the page list.
 */

const TYPES: Record<string, string> = {
  html: "text/html; charset=utf-8",
  htm: "text/html; charset=utf-8",
  css: "text/css; charset=utf-8",
  js: "text/javascript; charset=utf-8",
  mjs: "text/javascript; charset=utf-8",
  json: "application/json; charset=utf-8",
  txt: "text/plain; charset=utf-8",
  svg: "image/svg+xml",
  ico: "image/x-icon",
  map: "application/json",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  webp: "image/webp",
  avif: "image/avif",
  woff: "font/woff",
  woff2: "font/woff2",
  ttf: "font/ttf",
  otf: "font/otf",
  mp4: "video/mp4",
  webm: "video/webm",
  mp3: "audio/mpeg",
  m4a: "audio/mp4",
  wav: "audio/wav",
};

const notFound = () =>
  new Response(
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Page not found</title><style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#FFFCF7;color:#122940;font-family:Montserrat,system-ui,sans-serif}main{padding:24px}p{margin:0;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#457D9E;font-weight:500}h1{margin:16px 0 28px;font-size:clamp(48px,12vw,96px);font-weight:300;letter-spacing:-.03em;line-height:.95}h1 b{font-weight:700;display:block}a{color:#122940}</style></head><body><main><p>404</p><h1>page<b>not found.</b></h1><a href="/">Back to xdough.com</a></main></body></html>`,
    { status: 404, headers: { "content-type": "text/html; charset=utf-8" } },
  );

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string; path?: string[] }> },
) {
  const { slug, path = [] } = await params;
  if (!configured()) return notFound();

  const manifest = await readManifest().catch(() => null);
  const page = manifest?.pages.find((p) => p.slug === slug);
  if (!page) return notFound();

  if (path.some((part) => !part || part === "." || part === "..")) return notFound();
  let file = path.join("/");
  if (!file) file = "index.html";

  const ext = file.split(".").pop()?.toLowerCase() ?? "";
  const isHtml = ext === "html" || ext === "htm";
  // Videos are fetched in ranges so seeking works.
  const range = isHtml ? undefined : (request.headers.get("range") ?? undefined);
  const object = await getObject(`pages/${page.id}/${page.current}/${file}`, range).catch(() => null);
  if (!object || !object.Body) return notFound();

  const headers = new Headers({
    "content-type": TYPES[ext] ?? "application/octet-stream",
    // Short shared cache: a new version shows within seconds, assets stay fast.
    "cache-control": "public, max-age=0, s-maxage=10, stale-while-revalidate=60",
    // Published pages run their own scripts: isolate them from the site and portal.
    "content-security-policy":
      "sandbox allow-scripts allow-popups allow-popups-to-escape-sandbox allow-forms",
    // The sandbox gives the page an opaque origin, so its own scripts and
    // images are cross-origin requests and need this to load. Published pages
    // are public files; the portal API is a different route and stays closed.
    "access-control-allow-origin": "*",
    "accept-ranges": "bytes",
    "x-robots-tag": "noindex, nofollow",
    "x-content-type-options": "nosniff",
  });

  if (isHtml) {
    let html = await object.Body.transformToString();
    // Lets relative links (img/…, style.css) work at /<address> without a trailing slash.
    if (!/<base\s/i.test(html)) {
      const tag = `<base href="/${slug}/">`;
      html = /<head[^>]*>/i.test(html)
        ? html.replace(/<head[^>]*>/i, (m) => m + tag)
        : `${tag}${html}`;
    }
    return new Response(html, { status: 200, headers });
  }

  if (object.ContentLength != null) headers.set("content-length", String(object.ContentLength));
  if (object.ContentRange) headers.set("content-range", object.ContentRange);
  return new Response(object.Body.transformToWebStream(), {
    status: object.ContentRange ? 206 : 200,
    headers,
  });
}
