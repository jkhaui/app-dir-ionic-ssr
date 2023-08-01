/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Next's image optimization breaks capacitor
    unoptimized: true,
  },
  transpilePackages: ['@ionic/core'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
