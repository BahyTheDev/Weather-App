import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  // Enable static export for GitHub Pages
  output: "export",

  // Trailing slash for proper routing on static hosting
  trailingSlash: true,

  // Images configuration for GitHub Pages
  images: {
    unoptimized: true, // Required for static export
  },

  // Configure base path for GitHub Pages (only in production builds)
  ...(isProduction && {
    basePath: "/Weather-App",
    assetPrefix: "/Weather-App",
  }),
};

export default nextConfig;
