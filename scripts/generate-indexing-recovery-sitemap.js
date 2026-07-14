const fs = require('fs')
const path = require('path')

const BASE_URL = 'https://www.fsidigital.ca'
const SOURCE_PATH = path.join(__dirname, '../lib/pseo-data.ts')
const PUBLIC_DIR = path.join(__dirname, '../public')
const OUTPUT_PATH = path.join(__dirname, '../public/indexing-recovery-sitemap.xml')
const CHUNK_PREFIX = 'indexing-recovery-sitemap'
const CHUNK_SIZE = 500
const DRIP_START_DATE = new Date('2026-03-05T00:00:00Z')
const PAGES_PER_DAY = 20
const SUPERSEDED_BLOG_SLUGS = new Set([
  'canada-irap-grants-2025',
  'indigenous-business-development-2025',
  'small-business-financing-2025',
])

const ALWAYS_INCLUDE_ROUTES = [
  '/contact',
  '/get-started',
  '/grant-finder',
  '/services',
]

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
  const cities = [...source.matchAll(/\{\s*"?city"?:\s*"([^"]+)",\s*"?citySlug"?:\s*"([^"]+)",\s*"?prov"?:\s*"([^"]+)",\s*"?provSlug"?:\s*"([^"]+)"\s*\}/g)]
    .map((match) => ({
      city: match[1],
      citySlug: match[2],
      province: match[3],
      provinceSlug: match[4],
    }))

  const industriesBlock = source.match(/const INDUSTRIES = \[([\s\S]*?)\];/)
  const industries = industriesBlock
    ? [...industriesBlock[1].matchAll(/\{\s*"?name"?:\s*"([^"]+)",\s*"?slug"?:\s*"([^"]+)"\s*\}/g)]
      .map((match) => ({ name: match[1], slug: match[2] }))
    : []

  if (cities.length === 0 || industries.length === 0) {
    throw new Error('Could not parse pSEO cities or industries from lib/pseo-data.ts')
  }

  return { cities, industries }
}

function readJson(filePath, fallback) {
  if (!fs.existsSync(filePath)) return fallback
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function toSlug(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

function getRedirectSources() {
  const configPath = path.join(__dirname, '../next.config.mjs')
  if (!fs.existsSync(configPath)) return new Set()

  const source = fs.readFileSync(configPath, 'utf8')
  return new Set([...source.matchAll(/\{\s*source:\s*'([^']+)',\s*destination:\s*'[^']+',\s*permanent:\s*true,?\s*\}/g)]
    .map((match) => match[1]))
}

function isRecoveryRoute(route, redirectSources) {
  if (!route || !route.startsWith('/')) return false
  if (route.includes('?')) return false
  if (route.includes('/thank-you')) return false
  if (route.startsWith('/api/')) return false
  if (route === '/search') return false
  if (route === '/sitemap.xml') return false
  if (route === '/favicon.ico') return false
  if (route === '/site.webmanifest') return false
  if (redirectSources.has(route)) return false

  const blogSlug = route.startsWith('/blog/') ? route.replace('/blog/', '') : null
  if (blogSlug?.endsWith('-archive')) return false
  if (blogSlug && SUPERSEDED_BLOG_SLUGS.has(blogSlug)) return false

  return true
}

function getStaticRoutes(redirectSources) {
  const appDir = path.join(__dirname, '../app')
  const routes = []

  function walk(dir) {
    if (!fs.existsSync(dir)) return

    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name)

      if (entry.isDirectory()) {
        if (!entry.name.startsWith('[') && !entry.name.startsWith('.') && entry.name !== 'api') {
          walk(fullPath)
        }
        continue
      }

      if (entry.name !== 'page.tsx' && entry.name !== 'page.ts') continue

      const route = fullPath
        .replace(appDir, '')
        .replace(/\/page\.tsx?$/, '')
        .replace(/\\/g, '/') || '/'

      if (isRecoveryRoute(route, redirectSources)) {
        routes.push(route)
      }
    }
  }

  walk(appDir)
  return routes
}

function getBlogRoutes(redirectSources) {
  const metadata = readJson(path.join(__dirname, '../lib/data/blogMetadata.json'), { metadata: [] })
  const metadataRoutes = (metadata.metadata || [])
    .filter((post) => post.slug)
    .map((post) => `/blog/${post.slug}`)

  const contentDir = path.join(__dirname, '../lib/data/blog-content')
  const contentRoutes = fs.existsSync(contentDir)
    ? fs.readdirSync(contentDir)
      .filter((file) => file.endsWith('.json'))
      .map((file) => `/blog/${file.replace(/\.json$/, '')}`)
    : []

  return [...metadataRoutes, ...contentRoutes]
    .filter((route) => isRecoveryRoute(route, redirectSources))
}

function getGuideRoutes(redirectSources) {
  const guideDataPath = path.join(__dirname, '../lib/data/guides.ts')
  const source = fs.existsSync(guideDataPath) ? fs.readFileSync(guideDataPath, 'utf8') : ''
  const dynamicRoutes = [...source.matchAll(/slug:\s*["']([^"']+)["']/g)]
    .map((match) => `/guides/${match[1]}`)

  const guidesDir = path.join(__dirname, '../app/guides')
  const staticRoutes = fs.existsSync(guidesDir)
    ? fs.readdirSync(guidesDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory() && entry.name !== '[slug]')
      .filter((entry) => fs.existsSync(path.join(guidesDir, entry.name, 'page.tsx')))
      .map((entry) => `/guides/${entry.name}`)
    : []

  return [...dynamicRoutes, ...staticRoutes]
    .filter((route) => isRecoveryRoute(route, redirectSources))
}

function getUsStateAndCityRoutes(redirectSources) {
  const stateDetailsPath = path.join(__dirname, '../lib/data/stateDetails.ts')
  if (!fs.existsSync(stateDetailsPath)) return []

  const routes = new Set()
  const lines = fs.readFileSync(stateDetailsPath, 'utf8').split(/\r?\n/)
  let currentStateSlug = null
  let insideCityGuides = false

  for (const line of lines) {
    const stateSlugMatch = line.match(/^\s{8}slug:\s*'([^']+)'/)
    if (stateSlugMatch && !insideCityGuides) {
      currentStateSlug = stateSlugMatch[1]
      const route = `/usa/${currentStateSlug}`
      if (isRecoveryRoute(route, redirectSources)) routes.add(route)
      continue
    }

    if (currentStateSlug && line.match(/^\s{8}cityGuides:\s*\[/)) {
      insideCityGuides = true
      continue
    }

    if (insideCityGuides) {
      const cityMatch = line.match(/^\s{16}city:\s*'((?:\\'|[^'])+)'/)
      if (cityMatch) {
        const route = `/usa/${currentStateSlug}/${toSlug(cityMatch[1].replace(/\\'/g, "'"))}`
        if (isRecoveryRoute(route, redirectSources)) routes.add(route)
      }

      if (line.match(/^\s{8}\],?\s*$/)) {
        insideCityGuides = false
      }
    }
  }

  return Array.from(routes)
}

function buildRecoveryRoutes() {
  const { cities, industries } = parsePseoSource()
  const redirectSources = getRedirectSources()
  const routes = new Set()
  const now = new Date()
  let counter = 0
  let dayOffset = 0

  for (const route of ALWAYS_INCLUDE_ROUTES) {
    if (isRecoveryRoute(route, redirectSources)) routes.add(route)
  }

  for (const route of getStaticRoutes(redirectSources)) routes.add(route)
  for (const route of getBlogRoutes(redirectSources)) routes.add(route)
  for (const route of getGuideRoutes(redirectSources)) routes.add(route)
  for (const route of getUsStateAndCityRoutes(redirectSources)) routes.add(route)

  for (const city of cities) {
    for (const industry of industries) {
      const publishedAt = new Date(DRIP_START_DATE)
      publishedAt.setUTCDate(DRIP_START_DATE.getUTCDate() + dayOffset)

      if (publishedAt <= now) {
        const provinceRoute = `/grants/${city.provinceSlug}`
        const cityRoute = `/grants/${city.provinceSlug}/${city.citySlug}`
        const leafRoute = `/grants/${city.provinceSlug}/${city.citySlug}/${industry.slug}`
        if (isRecoveryRoute(provinceRoute, redirectSources)) routes.add(provinceRoute)
        if (isRecoveryRoute(cityRoute, redirectSources)) routes.add(cityRoute)
        if (isRecoveryRoute(leafRoute, redirectSources)) routes.add(leafRoute)
      }

      counter += 1
      if (counter % PAGES_PER_DAY === 0) {
        dayOffset += 1
      }
    }
  }

  return Array.from(routes).sort()
}

function buildUrlsetXml(routes, lastmod) {
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

function buildSitemapIndexXml(chunkFiles, lastmod) {
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...chunkFiles.map((fileName) => [
      '  <sitemap>',
      `    <loc>${escapeXml(`${BASE_URL}/${fileName}`)}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      '  </sitemap>',
    ].join('\n')),
    '</sitemapindex>',
    '',
  ].join('\n')
}

const routes = buildRecoveryRoutes()
const lastmod = new Date().toISOString()
const staleChunkPattern = new RegExp(`^${CHUNK_PREFIX}-\\d+\\.xml$`)

for (const fileName of fs.readdirSync(PUBLIC_DIR)) {
  if (staleChunkPattern.test(fileName)) {
    fs.unlinkSync(path.join(PUBLIC_DIR, fileName))
  }
}

const chunkFiles = []
for (let index = 0; index < routes.length; index += CHUNK_SIZE) {
  const chunkNumber = Math.floor(index / CHUNK_SIZE) + 1
  const chunkRoutes = routes.slice(index, index + CHUNK_SIZE)
  const fileName = `${CHUNK_PREFIX}-${chunkNumber}.xml`
  fs.writeFileSync(path.join(PUBLIC_DIR, fileName), buildUrlsetXml(chunkRoutes, lastmod))
  chunkFiles.push(fileName)
}

fs.writeFileSync(OUTPUT_PATH, buildSitemapIndexXml(chunkFiles, lastmod))
console.log(`Generated ${OUTPUT_PATH} as a sitemap index with ${chunkFiles.length} child sitemaps and ${routes.length} URLs`)
