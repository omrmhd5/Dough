import { readFileSync } from "node:fs";

/** Pages published through /portal: files in public/p/<slug>, listed in data/pages.json. */
function portalSlugs() {
  try {
    const manifest = JSON.parse(
      readFileSync(new URL("./data/pages.json", import.meta.url), "utf8"),
    );
    return (manifest.pages ?? [])
      .map((page) => page.slug)
      .filter((slug) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug));
  } catch {
    return [];
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["nodemailer"],
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  devIndicators: false,
  // Company profile deck lives in public/profile; serve it at /profile.
  async rewrites() {
    return [
      { source: "/profile", destination: "/profile/index.html" },
      { source: "/profile/", destination: "/profile/index.html" },
      // Portal pages: /<slug> serves public/p/<slug>/index.html, assets follow.
      ...portalSlugs().flatMap((slug) => [
        { source: `/${slug}`, destination: `/p/${slug}/index.html` },
        { source: `/${slug}/`, destination: `/p/${slug}/index.html` },
        { source: `/${slug}/:path+`, destination: `/p/${slug}/:path+` },
      ]),
    ];
  },
  // Published pages run their own scripts, so they are sandboxed: they cannot
  // read the site's cookies or call the portal API as a signed-in user.
  async headers() {
    const sandbox = {
      key: "Content-Security-Policy",
      value:
        "sandbox allow-scripts allow-popups allow-popups-to-escape-sandbox allow-forms",
    };
    return [
      { source: "/p/:path*", headers: [sandbox] },
      ...portalSlugs().flatMap((slug) => [
        { source: `/${slug}`, headers: [sandbox] },
        { source: `/${slug}/:path*`, headers: [sandbox] },
      ]),
    ];
  },
  async redirects() {
    return [
      {
        source: "/clients",
        destination: "/work",
        permanent: true,
      },
      {
        source: "/clients/:slug",
        destination: "/work/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
