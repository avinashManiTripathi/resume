import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Temporary: Ignore TypeScript errors during build (styled-jsx typing issue)
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'media.licdn.com',
      },
    ],
  },
};

export default nextConfig;
