import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Keep dynamic API routes available in the desktop sidecar. This is not a
  // static export; Tauri launches the standalone Node server instead.
  output: "standalone",
  // PDF.js resolves its Node worker relative to its installed package files.
  // Keep it external so Next doesn't rewrite that dynamic import into .next chunks.
  serverExternalPackages: ["pdfjs-dist"],
};

export default nextConfig;
