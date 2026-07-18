const fs = require('fs')
const path = require('path')

const BASE_URL = 'https://www.fsidigital.ca'
const OUTPUT_PATH = path.join(__dirname, '../public/priority-sitemap.xml')
const SUPERSEDED_BLOG_SLUGS = new Set([
  'canada-irap-grants-2025',
  'indigenous-business-development-2025',
  'small-business-financing-2025',
])

const CORE_PRIORITY_ROUTES = [
  '/',
  '/grant-finder',
  '/grants',
  '/blog',
  '/guides',
  '/usa',
  '/canada',
  '/contact',
  '/usa/small-business-grants',
  '/usa/technology-startup-grants',
  '/usa/women-entrepreneurs-grants',
  '/usa/federal-grants',
  '/canada/small-business-grants',
  '/canada/government-grants',
  '/canada/innovation-grants',
  '/canada/women-business-grants',
  
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

const GSC_QUICK_WIN_ROUTES = [
  '/usa/new-york',
  '/usa/california',
  '/usa/technology-startup-grants',
  '/usa/kentucky',
  '/usa/minnesota',
  '/usa/washington',
  '/usa/missouri',
  '/canada',
  '/canada/small-business-grants',
  '/canada/indigenous-entrepreneur-grants',
  '/canada/innovation-grants',
  '/canada/women-business-grants',
  '/blog/quebec-small-business-grants-guide',
  '/blog/nih-sbir-biotech-grants',
  '/blog/nsf-sbir-grants-technology-startups',
  '/blog/usda-sbir-agtech-grants',
  '/blog/canada-technology-adoption-grants-guide',
  '/blog/colorado-tech-programs',
  '/blog/healthcare-grants-2026',
  '/blog/women-entrepreneurship-strategy-canada',
  '/blog/veteran-business-funding-canada-2026',
  '/blog/ai-machine-learning-grants',
  '/blog/canada-aerospace-defence-innovation-grants',
  '/guides/irap-innovation-application-guide',
  '/guides/apply-strategic-innovation-fund',
  '/guides/california-loan-guarantee-guide',
  '/guides/apply-irap-grants',
  '/grants/on/toronto/restaurants-hospitality',
  '/grants/bc/vancouver/women-entrepreneurs',
  '/grants/ca/san-francisco/women-entrepreneurs',
  '/grants/on/ottawa/women-entrepreneurs',
  '/grants/ns/halifax/women-entrepreneurs',
]

function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function wordCount(html) {
  return String(html || '')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&[a-zA-Z0-9#]+;/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length
}

function readJson(filePath, fallback) {
  if (!fs.existsSync(filePath)) return fallback
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function getStaticGuideRoutes() {
  const guidesDir = path.join(__dirname, '../app/guides')
  if (!fs.existsSync(guidesDir)) return []

  return fs.readdirSync(guidesDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && entry.name !== '[slug]')
    .filter((entry) => fs.existsSync(path.join(guidesDir, entry.name, 'page.tsx')))
    .map((entry) => `/guides/${entry.name}`)
}

function getDynamicGuideRoutes() {
  const guideDataPath = path.join(__dirname, '../lib/data/guides.ts')
  const source = fs.existsSync(guideDataPath) ? fs.readFileSync(guideDataPath, 'utf8') : ''
  return [...source.matchAll(/slug:\s*["']([^"']+)["']/g)].map((match) => `/guides/${match[1]}`)
}

function getPriorityBlogRoutes() {
  const metadata = readJson(path.join(__dirname, '../lib/data/blogMetadata.json'), { metadata: [] })
  const posts = metadata.metadata || []
  const blogDir = path.join(__dirname, '../app/blog')
  const staticBlogDirs = new Set(
    fs.readdirSync(blogDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .filter((entry) => entry.name !== '[slug]')
      .filter((entry) => fs.existsSync(path.join(blogDir, entry.name, 'page.tsx')))
      .map((entry) => entry.name)
  )

  return posts
    .filter((post) => post.slug && !post.slug.endsWith('-archive'))
    .filter((post) => !SUPERSEDED_BLOG_SLUGS.has(post.slug))
    .map((post) => {
      const contentPath = path.join(__dirname, '../lib/data/blog-content', `${post.slug}.json`)
      const staticPath = path.join(blogDir, post.slug, 'page.tsx')
      const contentJson = readJson(contentPath, {})
      const source = staticBlogDirs.has(post.slug) && fs.existsSync(staticPath)
        ? fs.readFileSync(staticPath, 'utf8')
        : contentJson.content || ''

      return {
        route: `/blog/${post.slug}`,
        words: wordCount(source),
        recentlyExpanded: source.includes('Indexing recovery expansion'),
      }
    })
    .sort((a, b) => {
      if (a.recentlyExpanded !== b.recentlyExpanded) return a.recentlyExpanded ? -1 : 1
      return a.words - b.words
    })
    .map((row) => row.route)
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
      '    <changefreq>daily</changefreq>',
      '    <priority>0.9</priority>',
      '  </url>',
    ].join('\n')),
    '</urlset>',
    '',
  ].join('\n')
}

// 1. Gather all base priority routes
const baseRoutes = Array.from(new Set([
  ...CORE_PRIORITY_ROUTES,
  ...GSC_QUICK_WIN_ROUTES,
  ...getStaticGuideRoutes(),
  ...getDynamicGuideRoutes(),
  '/usa/california',
  '/usa/texas',
  '/usa/new-york',
  '/usa/florida',
  '/canada/ontario',
  '/canada/alberta',
  '/canada/british-columbia',
  '/canada/quebec',
]))

// 2. Fetch all sorted blog routes
const sortedBlogs = getPriorityBlogRoutes()

// 3. Accumulate up to exactly 176 unique routes
const finalRoutesSet = new Set(baseRoutes)
for (const route of sortedBlogs) {
  if (finalRoutesSet.size >= 176) break
  finalRoutesSet.add(route)
}

const routes = Array.from(finalRoutesSet)

fs.writeFileSync(OUTPUT_PATH, buildXml(routes))
console.log(`Generated ${OUTPUT_PATH} with ${routes.length} URLs`)

