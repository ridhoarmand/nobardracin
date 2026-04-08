import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Matikan in-memory cache Next.js agar RAM tidak bengkak
  cacheMaxMemorySize: 0,
  
  // Matikan ETag generation untuk menghemat memory & CPU di server
  generateEtags: false,

  // React 19 strict mode
  reactStrictMode: true,

  // Performance optimizations
  poweredByHeader: false,
  compress: true,

  // Docker standalone output
  output: 'standalone',

  // Memory optimization - disable features we don't need
  experimental: {
    // Reduce memory footprint
    workerThreads: false,
    cpus: 1,
    // Disable unused features
    clientRouterFilter: false,
    // Ensure proper static file handling
    optimizePackageImports: ['lucide-react', '@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
  },

  // React 19 compiler optimizations
  compiler: {
    reactRemoveProperties: true,
    removeConsole: process.env.NODE_ENV === 'production',
  },

  logging: {
    fetches: {
      fullUrl: false,
    },
  },
  images: {
    // Matikan build-in image optimization (sharp/squoosh) untuk hemat RAM yang ekstrim
    unoptimized: true,
    // Optimize image formats
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imgcdnmi.dramaboxdb.com",
      },
      {
        protocol: "https",
        hostname: "hwztchapter.dramaboxdb.com",
      },
      {
        protocol: "https",
        hostname: "awscover.netshort.com",
      },
      {
        protocol: "https",
        hostname: "static.netshort.com",
      },
      {
        protocol: "https",
        hostname: "cover.netshort.com",
      },
      {
        protocol: "https",
        hostname: "alicdn.netshort.com",
      },
      {
        protocol: "https",
        hostname: "zshipubcdn.farsunpteltd.com",
      },
      {
        protocol: "https",
        hostname: "zshipricf.farsunpteltd.com",
      },
    ],
  },
};

export default nextConfig;

