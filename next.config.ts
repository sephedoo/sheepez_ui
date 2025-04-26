/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '143.198.36.158',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
  },
  // Typescript configurations
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;