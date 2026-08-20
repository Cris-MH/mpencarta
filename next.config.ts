import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow YouTube iframe embeds
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
