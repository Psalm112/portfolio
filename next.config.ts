import type { NextConfig } from "next";
const path = require("path");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Performance optimizations
  experimental: {
    optimizePackageImports: [
      "framer-motion",
      "three",
      "@react-three/fiber",
      "@react-three/drei",
      "gsap",
      "react-icons",
    ],
    optimizeCss: true,
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    deviceSizes: [375, 640, 768, 1024, 1280, 1536, 1920],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Webpack optimizations
  webpack: (config, { isServer, dev }) => {
    // GLTF/GLB loader
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

    // Performance optimizations for production
    if (!dev) {
      // Enable tree shaking
      config.optimization = {
        ...config.optimization,
        usedExports: true,
        sideEffects: false,
        splitChunks: {
          chunks: "all",
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: "vendors",
              chunks: "all",
            },
            three: {
              test: /[\\/]node_modules[\\/]three[\\/]/,
              name: "three",
              chunks: "all",
              priority: 10,
            },
            gsap: {
              test: /[\\/]node_modules[\\/]gsap[\\/]/,
              name: "gsap",
              chunks: "all",
              priority: 10,
            },
          },
        },
      };
    }

    return config;
  },

  // Compression and caching
  compress: true,

  // Performance headers
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
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Output optimization
  output: "standalone",

  // Bundle analyzer (uncomment for analysis)
  // ...(process.env.ANALYZE === 'true' && {
  //   webpack: (config) => {
  //     config.plugins.push(
  //       new BundleAnalyzerPlugin({
  //         analyzerMode: 'static',
  //         openAnalyzer: false,
  //       })
  //     );
  //     return config;
  //   },
  // }),
};

export default nextConfig;
