import type { NextConfig } from "next";
import path from 'path';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname),
    };
    return config;
  },
  // Ensure that Next.js can resolve TypeScript and JavaScript files
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
};

export default nextConfig;

