import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for Vercel deployment
  output: "export",
  // Allow YouTube iframe embeds
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
