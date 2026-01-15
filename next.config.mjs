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
      // SEO: Consolidate www and non-www (Phase 10A)
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'fsidigital.ca',
          },
        ],
        destination: 'https://www.fsidigital.ca/:path*',
        permanent: true,
      },
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
