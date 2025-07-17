import type { NextConfig } from "next";

const nextConfig :NextConfig= {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/seed/picsum/**',
      },
    ],
  },
};

export default nextConfig;
