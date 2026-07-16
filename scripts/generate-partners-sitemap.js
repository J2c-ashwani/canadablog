const fs = require('fs')
const path = require('path')

const BASE_URL = 'https://www.fsidigital.ca'
const OUTPUT_PATH = path.join(__dirname, '../public/partners-sitemap.xml')

const PARTNER_ROUTES = [
  '/partners', // Include main B2B partner landing page
  '/partners/business-loan-leads',
  '/partners/government-grant-leads',
  '/partners/startup-funding-leads',
  '/partners/tax-credit-leads',
  '/partners/sred-leads',
  '/partners/canada-funding-leads',
  '/partners/usa-funding-leads',
  '/partners/merchant-cash-advance-leads',
  '/partners/equipment-financing-leads',
  '/partners/working-capital-leads',
  '/partners/commercial-real-estate-leads',
  '/partners/sbir-grant-leads',
  '/partners/usda-grant-leads',
  '/partners/clean-energy-grant-leads',
  '/partners/women-owned-business-leads',
  '/partners/nonprofit-grant-leads',
  '/partners/invoice-financing-leads',
  '/partners/purchase-order-financing-leads',
  '/partners/asset-based-lending-leads',
  '/partners/sba-loan-leads',
  '/partners/agriculture-funding-leads',
  '/partners/franchise-financing-leads',
  '/partners/accounts-receivable-factoring-leads',
  '/partners/bridge-loan-leads',
  '/partners/rd-tax-credit-leads',
  '/partners/export-funding-leads',
  '/partners/venture-debt-leads',
  '/partners/business-line-of-credit-leads',
  '/partners/unsecured-business-loan-leads',
  '/partners/minority-owned-business-leads',
]

function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
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
      '    <priority>0.9</priority>',
      '  </url>',
    ].join('\n')),
    '</urlset>',
    '',
  ].join('\n')
}

fs.writeFileSync(OUTPUT_PATH, buildXml(PARTNER_ROUTES))
console.log(`Generated ${OUTPUT_PATH} with ${PARTNER_ROUTES.length} URLs`)
