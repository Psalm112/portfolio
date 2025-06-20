import type { NextConfig } from "next";
const path = require("path");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: [
      "framer-motion",
      "three",
      "@react-three/fiber",
      "@react-three/drei",
    ],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    deviceSizes: [375, 640, 768, 1024, 1280, 1536, 1920],
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.(gltf|glb)$/,
      use: [
        {
          loader: "file-loader",
        },
      ],
    });
    return config;
  },
};

export default nextConfig;
