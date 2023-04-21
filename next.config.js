/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://itl2023.groovestats.com/api/:path*' // Proxy to Backend
      },
    ]
  },
}

module.exports = nextConfig
