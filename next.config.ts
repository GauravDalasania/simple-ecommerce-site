import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['lifeadmin-app.s3.me-south-1.amazonaws.com', 'life-cdn.lifepharmacy.com'],
  },
};

export default nextConfig;
