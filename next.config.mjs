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
      // Primo's November content calendar (static page + images).
      {
        source: "/primos-november-calendar",
        destination: "/primos-november-calendar/index.html",
      },
      {
        source: "/primos-november-calendar/",
        destination: "/primos-november-calendar/index.html",
      },
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
