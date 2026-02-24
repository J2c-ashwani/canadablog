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
      // Zombie Page Redirects — Fixed Feb 2026 (pointing to correct 2026 slugs)
      { source: '/blog/manitoba-government-business-grants', destination: '/blog/manitoba-business-grants-2026', permanent: true },
      // Alberta Grant Consolidations
      { source: '/blog/alberta-government-business-grants', destination: '/blog/alberta-small-business-grants-guide', permanent: true },
      { source: '/blog/alberta-business-grants-2026', destination: '/blog/alberta-small-business-grants-guide', permanent: true },
      { source: '/blog/alberta-business-grants-2025', destination: '/blog/alberta-small-business-grants-guide', permanent: true },
      // Provincial Consolidations → correct 2026 slugs
      { source: '/blog/quebec-government-business-grants', destination: '/blog/quebec-business-grants-2026', permanent: true },
      { source: '/blog/quebec-business-grants-2025', destination: '/blog/quebec-business-grants-2026', permanent: true },
      { source: '/blog/saskatchewan-government-business-grants', destination: '/blog/saskatchewan-business-grants-2026', permanent: true },
      { source: '/blog/saskatchewan-business-grants-2025', destination: '/blog/saskatchewan-business-grants-2026', permanent: true },
      { source: '/blog/atlantic-canada-business-grants', destination: '/blog/atlantic-business-grants-2026', permanent: true },
      { source: '/blog/atlantic-business-grants-2025', destination: '/blog/atlantic-business-grants-2026', permanent: true },
      // Demographic Consolidations → correct 2026 slugs
      { source: '/blog/black-entrepreneur-grants-canada', destination: '/blog/black-entrepreneurship-loan-fund-2026', permanent: true },
      { source: '/blog/black-entrepreneurship-loan-fund-2025', destination: '/blog/black-entrepreneurship-loan-fund-2026', permanent: true },
      { source: '/blog/minority-business-grants-canada', destination: '/blog/minority-business-grants-2026', permanent: true },
      { source: '/blog/minority-business-grants-2025', destination: '/blog/minority-business-grants-2026', permanent: true },
      // Industry pages without dedicated posts → Canada hub
      { source: '/blog/construction-business-grants-canada', destination: '/canada', permanent: true },
      { source: '/blog/disability-business-grants-canada', destination: '/canada', permanent: true },
      { source: '/blog/hospitality-business-grants-canada', destination: '/canada', permanent: true },
      { source: '/blog/retail-business-grants-canada', destination: '/canada', permanent: true },
      // Expert Insights 2026 Updates
      { source: '/blog/grant-writing-secrets-2025', destination: '/blog/grant-writing-secrets-2026', permanent: true },
      { source: '/blog/sba-sbir-grants-2025', destination: '/blog/sba-sbir-grants-2026', permanent: true },
      // Crawled-not-indexed fixes
      { source: '/blog/healthcare-grants-2025', destination: '/blog/healthcare-grants-2026', permanent: true },
      { source: '/blog/clean-technology-2025', destination: '/blog/clean-technology-2026', permanent: true },
      { source: '/blog/illinois-business-development-2025', destination: '/usa/illinois', permanent: true },
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        // Cache static assets aggressively
        source: '/images/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
}

export default nextConfig
