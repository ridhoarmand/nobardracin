import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // React 19 strict mode for better development experience
  reactStrictMode: true,
  
  // Performance optimizations
  poweredByHeader: false,
  compress: true,
  
  // Docker standalone output - creates minimal production build
  output: 'standalone',
  
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
    // Optimize image formats
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
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

