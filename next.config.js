/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // https://github.com/vanilla-extract-css/vanilla-extract/issues/1085#issuecomment-1555986222
    config.optimization.splitChunks = false;

    return config;
  },
  images: {
    // Next's image optimization breaks capacitor
    unoptimized: true,
  },
  transpilePackages: ['@ionic/core'],
  experimental: {
    typedRoutes: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
