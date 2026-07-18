const fs = require('fs')
const path = require('path')

const BASE_URL = 'https://www.fsidigital.ca'
const OUTPUT_PATH = path.join(__dirname, '../public/mca-sitemap.xml')

const MCA_ROUTES = [
  // MCA Platform — Core Pages
  '/apply',
  '/why-businesses-get-declined',
  '/funding-calculator',
  '/priority-processing',
  '/merchant-cash-advance-canada',
  '/business-cash-advance-canada',
  '/working-capital-canada',
  '/fast-business-funding-canada',
  '/same-day-business-funding',
  
  // MCA Platform — Industry Verticals
  '/restaurant-business-funding',
  '/trucking-business-funding',
  '/construction-business-funding',
  '/retail-business-funding',
  '/healthcare-business-funding',
  '/auto-repair-financing',
  '/manufacturing-business-funding',
  '/transportation-business-funding',

  // MCA Platform — Province Pages
  '/ontario-business-funding',
  '/british-columbia-business-funding',
  '/alberta-business-funding',
  '/quebec-business-funding',

  // MCA Platform — Educational / Comparison Pages
  '/merchant-cash-advance-vs-business-loan',
  '/how-merchant-cash-advance-works',
  '/business-loan-alternatives',
  '/working-capital-guide',
  '/funding-eligibility-guide',
  '/merchant-cash-advance-rates',
  
  // MCA Platform — Resource Center
  '/resources',
  '/resources/how-to-improve-business-cash-flow',
  '/resources/business-funding-checklist',
  '/resources/common-funding-mistakes',
  '/resources/understanding-factor-rates',
  '/resources/how-to-prepare-financial-documents',
  '/resources/business-credit-score-guide',
  '/resources/cash-flow-forecasting',
]

function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function buildXml(routes) {
  const lastmod = new Date().toISOString()
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...routes.map((route) => [
      '  <url>',
      `    <loc>${escapeXml(`${BASE_URL}${route}`)}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      '    <changefreq>weekly</changefreq>',
      '    <priority>0.85</priority>',
      '  </url>',
    ].join('\n')),
    '</urlset>',
    '',
  ].join('\n')
}

// Write the sitemap
const xmlContent = buildXml(MCA_ROUTES)
fs.writeFileSync(OUTPUT_PATH, xmlContent)
console.log(`Generated ${OUTPUT_PATH} with ${MCA_ROUTES.length} URLs`)
