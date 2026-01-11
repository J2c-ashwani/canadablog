/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/portfolio',
        destination: '/',
        permanent: true,
      },
      {
        source: '/ai-grant-finder',
        destination: '/grant-finder',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
