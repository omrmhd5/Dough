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
  async rewrites() {
    // Pages published through the VPS portal live at xdough.com/<address>.
    // Anything this site does not own (no page, no file) is forwarded to the
    // VPS. Override with PAGES_ORIGIN in the Vercel environment variables, or
    // set it to an empty value to stop forwarding.
    const origin = (process.env.PAGES_ORIGIN ?? "https://bake.xdough.com")
      .trim()
      .replace(/\/+$/, "");
    return {
      // Company profile deck lives in public/profile; serve it at /profile.
      afterFiles: [
        { source: "/profile", destination: "/profile/index.html" },
        { source: "/profile/", destination: "/profile/index.html" },
      ],
      // Checked last, after every page, route and file of this site.
      fallback: origin ? [{ source: "/:path*", destination: `${origin}/:path*` }] : [],
    };
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
