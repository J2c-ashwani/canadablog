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
      // Zombie Page Redirects (Feb 2026 Audit)
      { source: '/blog/manitoba-government-business-grants', destination: '/blog/manitoba-business-grants-2025', permanent: true },
      // Alberta Grant Consolidations (Batch 1 Cleanup)
      { source: '/blog/alberta-government-business-grants', destination: '/blog/alberta-small-business-grants-guide', permanent: true },
      { source: '/blog/alberta-business-grants-2026', destination: '/blog/alberta-small-business-grants-guide', permanent: true },
      { source: '/blog/alberta-business-grants-2025', destination: '/blog/alberta-small-business-grants-guide', permanent: true },
      { source: '/blog/quebec-government-business-grants', destination: '/blog/quebec-business-grants-2025', permanent: true },
      { source: '/blog/saskatchewan-government-business-grants', destination: '/blog/saskatchewan-business-grants-2025', permanent: true },
      { source: '/blog/atlantic-canada-business-grants', destination: '/blog/atlantic-business-grants-2025', permanent: true },
      { source: '/blog/black-entrepreneur-grants-canada', destination: '/blog/black-entrepreneurship-loan-fund-2025', permanent: true },
      { source: '/blog/construction-business-grants-canada', destination: '/blog/canada-construction-grants-2025', permanent: true },
      { source: '/blog/disability-business-grants-canada', destination: '/blog/disability-business-grants-2025', permanent: true },
      { source: '/blog/hospitality-business-grants-canada', destination: '/blog/hospitality-grants-canada-2025', permanent: true },
      { source: '/blog/minority-business-grants-canada', destination: '/blog/minority-business-grants-2025', permanent: true },
      { source: '/blog/retail-business-grants-canada', destination: '/blog/retail-business-grants-2025', permanent: true },
      // Expert Insights 2026 Updates
      { source: '/blog/grant-writing-secrets-2025', destination: '/blog/grant-writing-secrets-2026', permanent: true },
      { source: '/blog/sba-sbir-grants-2025', destination: '/blog/sba-sbir-grants-2026', permanent: true },
      { source: '/blog/alberta-business-grants-2025', destination: '/blog/alberta-business-grants-2026', permanent: true },
    ]
  },
}

export default nextConfig
