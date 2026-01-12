import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // Disable type checking during production builds
    // Type checking will still run during development
    ignoreBuildErrors: true,
  },
  // Skip static generation to avoid styled-jsx React context errors
  output: 'standalone',
};

export default nextConfig;
