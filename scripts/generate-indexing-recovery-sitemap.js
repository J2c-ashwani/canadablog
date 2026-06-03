const fs = require('fs')
const path = require('path')

const BASE_URL = 'https://www.fsidigital.ca'
const SOURCE_PATH = path.join(__dirname, '../lib/pseo-data.ts')
const OUTPUT_PATH = path.join(__dirname, '../public/indexing-recovery-sitemap.xml')
const DRIP_START_DATE = new Date('2026-03-05T00:00:00Z')
const PAGES_PER_DAY = 20

function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function parsePseoSource() {
  const source = fs.readFileSync(SOURCE_PATH, 'utf8')
  const cities = [...source.matchAll(/\{\s*city:\s*"([^"]+)",\s*citySlug:\s*"([^"]+)",\s*prov:\s*"([^"]+)",\s*provSlug:\s*"([^"]+)"\s*\}/g)]
    .map((match) => ({
      city: match[1],
      citySlug: match[2],
      province: match[3],
      provinceSlug: match[4],
    }))

  const industriesBlock = source.match(/const INDUSTRIES = \[([\s\S]*?)\];/)
  const industries = industriesBlock
    ? [...industriesBlock[1].matchAll(/\{\s*name:\s*"([^"]+)",\s*slug:\s*"([^"]+)"\s*\}/g)]
      .map((match) => ({ name: match[1], slug: match[2] }))
    : []

  if (cities.length === 0 || industries.length === 0) {
    throw new Error('Could not parse pSEO cities or industries from lib/pseo-data.ts')
  }

  return { cities, industries }
}

function buildRecoveryRoutes() {
  const { cities, industries } = parsePseoSource()
  const routes = new Set()
  const now = new Date()
  let counter = 0
  let dayOffset = 0

  for (const city of cities) {
    for (const industry of industries) {
      const publishedAt = new Date(DRIP_START_DATE)
      publishedAt.setUTCDate(DRIP_START_DATE.getUTCDate() + dayOffset)

      if (publishedAt <= now) {
        routes.add(`/grants/${city.provinceSlug}`)
        routes.add(`/grants/${city.provinceSlug}/${city.citySlug}`)
        routes.add(`/grants/${city.provinceSlug}/${city.citySlug}/${industry.slug}`)
      }

      counter += 1
      if (counter % PAGES_PER_DAY === 0) {
        dayOffset += 1
      }
    }
  }

  return Array.from(routes).sort()
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
      '    <priority>0.8</priority>',
      '  </url>',
    ].join('\n')),
    '</urlset>',
    '',
  ].join('\n')
}

const routes = buildRecoveryRoutes()
fs.writeFileSync(OUTPUT_PATH, buildXml(routes))
console.log(`Generated ${OUTPUT_PATH} with ${routes.length} URLs`)
