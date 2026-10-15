import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  skipTrailingSlashRedirect: true,
  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: true,
  },
  async redirects() {
    return [
      { source: "/templates", destination: "/template-website", permanent: true },
      { source: "/article", destination: "/blog", permanent: true },
      { source: "/article/:slug*", destination: "/blog/:slug*", permanent: true },
      { source: "/artikel", destination: "/blog", permanent: true },
      { source: "/artikel/:slug*", destination: "/blog/:slug*", permanent: true },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/demo/:template",
        has: [{ type: "header", key: "RSC" }],
        destination: "/demo/:template/index.txt",
      },
      {
        source: "/demo/:template/",
        has: [{ type: "header", key: "RSC" }],
        destination: "/demo/:template/index.txt",
      },
      {
        source: "/demo/:template/:path*/",
        has: [{ type: "header", key: "RSC" }],
        destination: "/demo/:template/:path*/index.txt",
      },
      {
        source: "/demo/:template/:path*.txt",
        destination: "/demo/:template/:path*/index.txt",
      },
      { source: "/demo/:template", destination: "/demo/:template/index.html" },
      { source: "/demo/:template/", destination: "/demo/:template/index.html" },
      {
        source: "/demo/:template/:path*/",
        destination: "/demo/:template/:path*/index.html",
      },
    ];
  },
};

export default nextConfig;
