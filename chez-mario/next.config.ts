import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Export statique : le dossier out/ est mis en ligne tel quel sur Cloudflare Pages.
  output: "export",
  // Les images sont pré-optimisées en AVIF/WebP par scripts/optimize-images.mjs.
  images: { unoptimized: true },
  poweredByHeader: false,
  reactStrictMode: true,
  outputFileTracingRoot: path.resolve(__dirname),
};

export default nextConfig;
