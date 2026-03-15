import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for GitHub Pages
  output: "export",

  // Trailing slash for proper routing on static hosting
  trailingSlash: true,

  // Images configuration for GitHub Pages
  images: {
    unoptimized: true, // Required for static export
  },
};

export default nextConfig;
