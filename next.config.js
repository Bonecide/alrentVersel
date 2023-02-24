/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    distDir: 'build',
    images: {
        unoptimized: true
    },
    compress: false,
}

module.exports = nextConfig