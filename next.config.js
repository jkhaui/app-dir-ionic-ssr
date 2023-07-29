/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: [
        '@ionic/core'
    ],
    eslint: {
        ignoreDuringBuilds: true
    },
    typescript: {
        ignoreBuildErrors: true
    }
}

module.exports = nextConfig
