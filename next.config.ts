/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextConfig } from "next";
import nextPWA from "next-pwa";

const withPWA = nextPWA({
  dest: "public",
  // Disable PWA in development mode
  disable: process.env.NODE_ENV === "development",
  // Additional PWA options
  register: true,
  skipWaiting: true,
  // Optionally, customize caching strategies
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
      handler: "CacheFirst",
      options: {
        cacheName: "google-fonts",
        expiration: {
          maxEntries: 4,
          maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
        },
      },
    },
    // Add more caching strategies as needed
  ],
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default withPWA(nextConfig as any);
