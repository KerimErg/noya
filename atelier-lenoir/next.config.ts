import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Export statique : le dossier out/ est mis en ligne tel quel (Cloudflare Pages, Netlify, OVH…).
  output: "export",
  images: { unoptimized: true },
  poweredByHeader: false,
  reactStrictMode: true,
  outputFileTracingRoot: path.resolve(__dirname),
};

export default nextConfig;
