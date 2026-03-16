/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: '/Users/ashwanikumar/Downloads/canadablog',
  outputFileTracingIncludes: {
    '/blog/[slug]': ['./lib/data/blog-content/**/*'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
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
      // US 2025 slugs from enrichment queue → 2026 equivalents
      { source: '/blog/clean-technology-2025', destination: '/blog/clean-technology-2026', permanent: true },
      { source: '/blog/apply-usa-grants-2025', destination: '/blog/apply-usa-grants-2026', permanent: true },
      { source: '/blog/canexport-grants-2025', destination: '/blog/canexport-grants-2026', permanent: true },
      { source: '/blog/rural-business-development-2025', destination: '/blog/rural-business-development-2026', permanent: true },
      { source: '/blog/veterans-business-grants-2025', destination: '/blog/veterans-business-grants-2026', permanent: true },
      { source: '/blog/new-york-business-grants-2025', destination: '/blog/new-york-business-grants-2026', permanent: true },
      { source: '/blog/manufacturing-grants-2025', destination: '/blog/manufacturing-grants-2026', permanent: true },
      { source: '/blog/minority-business-grants-2025', destination: '/blog/minority-business-grants-2026', permanent: true },
      { source: '/blog/digital-transformation-2025', destination: '/blog/digital-transformation-2026', permanent: true },
      { source: '/blog/agricultural-innovation-2025', destination: '/blog/agricultural-innovation-2026', permanent: true },
      { source: '/blog/usda-rural-grants-2025', destination: '/blog/usda-rural-grants-2026', permanent: true },
      { source: '/blog/women-business-grants-2025', destination: '/blog/women-business-grants-2026', permanent: true },
      { source: '/blog/technology-startup-grants-2025', destination: '/blog/technology-startup-grants-2026', permanent: true },
      { source: '/blog/healthcare-grants-2025', destination: '/blog/healthcare-grants-2026', permanent: true },
      { source: '/blog/california-business-grants-2025', destination: '/blog/california-business-grants-2026', permanent: true },
      { source: '/blog/florida-business-grants-2025', destination: '/blog/florida-business-grants-2026', permanent: true },
      { source: '/blog/illinois-business-development-2025', destination: '/blog/illinois-business-development-2026', permanent: true },
      { source: '/blog/michigan-manufacturing-renaissance-2025', destination: '/blog/michigan-manufacturing-renaissance-2026', permanent: true },
      { source: '/blog/pennsylvania-innovation-2025', destination: '/blog/pennsylvania-innovation-2026', permanent: true },
      { source: '/blog/texas-business-grants-2025', destination: '/blog/texas-business-grants-2026', permanent: true },
      { source: '/blog/doe-clean-tech-2025', destination: '/blog/doe-clean-tech-2026', permanent: true },
      { source: '/blog/epa-environmental-justice-2025', destination: '/blog/epa-environmental-justice-2026', permanent: true },
      { source: '/blog/hud-community-2025', destination: '/blog/hud-community-2026', permanent: true },
      { source: '/blog/nsf-stem-research-2025', destination: '/blog/nsf-stem-research-2026', permanent: true },
      // Industry pages without dedicated posts → Canada hub
      { source: '/blog/construction-business-grants-canada', destination: '/canada', permanent: true },
      { source: '/blog/disability-business-grants-canada', destination: '/canada', permanent: true },
      { source: '/blog/hospitality-business-grants-canada', destination: '/canada', permanent: true },
      { source: '/blog/retail-business-grants-canada', destination: '/canada', permanent: true },
      // Expert Insights 2026 Updates
      { source: '/blog/grant-writing-secrets-2025', destination: '/blog/grant-writing-secrets-2026', permanent: true },
      { source: '/blog/sba-sbir-grants-2025', destination: '/blog/sba-sbir-grants-2026', permanent: true },
      // Crawled-not-indexed fixes


      // Google "Excluded by noindex" fixes — Mar 2026
      // Old 2025 slugs → current 2026 equivalents
      { source: '/blog/biden-2-5b-grants-2025', destination: '/blog/biden-2-5b-grants-2026', permanent: true },
      { source: '/blog/manufacturing-grants', destination: '/blog/manufacturing-grants-2026', permanent: true },
      { source: '/blog/health-tech-grants', destination: '/blog/healthcare-grants-2026', permanent: true },
      { source: '/blog/rural-funding-guide', destination: '/blog/rural-business-development-2026', permanent: true },
      { source: '/blog/canexport-guide', destination: '/blog/canexport-grants-2026', permanent: true },
      { source: '/blog/sred-guide', destination: '/blog/sred-tax-credits-2026', permanent: true },
      { source: '/blog/sred-tax-credits-guide', destination: '/blog/sred-scientific-research-experimental-development', permanent: true },
      { source: '/blog/cdap-guide', destination: '/blog/canada-technology-adoption-grants-guide', permanent: true },
      { source: '/blog/ocean-tech-grants', destination: '/blog/canada-clean-technology-innovation-grants', permanent: true },
      { source: '/blog/futurpreneur-loans-mentorship', destination: '/blog/canada-startup-funding-grants-guide', permanent: true },
      { source: '/blog/texas-business-incentives', destination: '/blog/texas-business-grants-2026', permanent: true },
      { source: '/blog/texas-tech-programs', destination: '/usa/texas', permanent: true },
      { source: '/blog/energy-efficiency-grants-canada', destination: '/blog/canada-clean-technology-environment-grants-guide', permanent: true },

      // Old simplified slugs → full current slugs
      { source: '/blog/agricultural-grants-canada', destination: '/blog/agriculture-agri-food-canada-government-grants', permanent: true },
      { source: '/blog/small-business-grants-ontario', destination: '/blog/ontario-government-business-grants', permanent: true },
      { source: '/blog/quebec-business-grants-loans-guide', destination: '/blog/quebec-business-grants-2026', permanent: true },
      { source: '/blog/women-business-grants-canada', destination: '/blog/women-business-grants-2026', permanent: true },
      { source: '/blog/canadian-small-business-funding-guide', destination: '/blog/small-business-grants-complete-guide', permanent: true },
      { source: '/blog/women-minority-business-grants-guide', destination: '/blog/women-tech-stem-grants-guide', permanent: true },
      { source: '/blog/startup-business-grants-canada-guide', destination: '/blog/canada-startup-funding-grants-guide', permanent: true },

      // Double-dash URL fixes (broken URLs Google crawled)
      { source: '/blog/canada-aerospace--defence-innovation-grants', destination: '/blog/canada-aerospace-defence-innovation-grants', permanent: true },
      { source: '/blog/canada-digital--ai-innovation-grants', destination: '/blog/canada-digital-ai-innovation-grants', permanent: true },

      // Guide old slugs → correct current guide slugs
      { source: '/guides/apply-women-entrepreneurship-strateg', destination: '/guides/apply-women-entrepreneurship-strategy', permanent: true },
      { source: '/guides/canada-innovation-rd-funding-guide', destination: '/guides/canada-digital-ai-funding-guide', permanent: true },
      { source: '/guides/sbir-sttr-complete-guide', destination: '/guides/sbir-research-grants-guide', permanent: true },

      // 404 page fixes — Mar 2026
      { source: '/canada/life-sciences-funding-guide', destination: '/guides/canada-life-sciences-funding-guide', permanent: true },
      { source: '/cdbg-community-consultation', destination: '/grant-finder', permanent: true },
      { source: '/grants/technology-grants', destination: '/blog/canada-clean-technology-innovation-grants', permanent: true },
      { source: '/rural-grant-consultation', destination: '/blog/rural-business-development-2026', permanent: true },
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
      {
        // Prevent indexing of thank-you pages (post-form confirmation)
        source: '/download/:guide/thank-you',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
        ],
      },
    ];
  },
}

export default nextConfig
