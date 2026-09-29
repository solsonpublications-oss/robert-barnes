import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standard (non-standalone) output: `next start` serves /public straight
  // from the project, so the author's drop-in media paths
  // (public/images/…, public/video/…) work identically in dev and production.
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
