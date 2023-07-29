/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: [
        '@ionic/core'
    ],
    eslint: {
        ignoreDuringBuilds: true
    }
}

module.exports = nextConfig
