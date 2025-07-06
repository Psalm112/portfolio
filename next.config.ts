import type { NextConfig } from "next";
const path = require("path");

const nextConfig: NextConfig = {
  reactStrictMode: true,
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

    // Optimize Three.js bundle
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        three: path.resolve("./node_modules/three"),
      };
    }

    return config;
  },
  // Add performance headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
