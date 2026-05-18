import fs from 'fs'
import path from 'path'
import { getAllBlogPosts } from '@/lib/data/blogPosts'
import { guidesDatabase } from '@/lib/data/guides'

export const runtime = 'nodejs'
export const revalidate = 86400

const BASE_URL = 'https://www.fsidigital.ca'

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
]

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function wordCount(html: string): number {
  return String(html || '')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&[a-zA-Z0-9#]+;/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length
}

function getStaticGuideRoutes(): string[] {
  const guidesDir = path.join(process.cwd(), 'app/guides')
  if (!fs.existsSync(guidesDir)) return []

  return fs.readdirSync(guidesDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && entry.name !== '[slug]')
    .filter((entry) => fs.existsSync(path.join(guidesDir, entry.name, 'page.tsx')))
    .map((entry) => `/guides/${entry.name}`)
}

function getPriorityBlogRoutes(): string[] {
  const staticBlogDirs = new Set(
    fs.readdirSync(path.join(process.cwd(), 'app/blog'), { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .filter((entry) => entry.name !== '[slug]')
      .filter((entry) => fs.existsSync(path.join(process.cwd(), 'app/blog', entry.name, 'page.tsx')))
      .map((entry) => entry.name)
  )

  return getAllBlogPosts()
    .filter((post) => post.slug && !post.slug.endsWith('-archive'))
    .filter((post) => !SUPERSEDED_BLOG_SLUGS.has(post.slug))
    .map((post) => {
      const contentPath = path.join(process.cwd(), 'lib/data/blog-content', `${post.slug}.json`)
      const staticPath = path.join(process.cwd(), 'app/blog', post.slug, 'page.tsx')
      const contentJson = fs.existsSync(contentPath)
        ? JSON.parse(fs.readFileSync(contentPath, 'utf8')) as { content?: string }
        : {}
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
    .slice(0, 100)
    .map((row) => row.route)
}

function getPriorityRoutes(): string[] {
  const guideRoutes = [
    ...getStaticGuideRoutes(),
    ...guidesDatabase.map((guide) => `/guides/${guide.slug}`),
  ]

  return Array.from(new Set([
    ...CORE_PRIORITY_ROUTES,
    ...getPriorityBlogRoutes(),
    ...guideRoutes,
    '/usa/california',
    '/usa/texas',
    '/usa/new-york',
    '/usa/florida',
    '/canada/ontario',
    '/canada/alberta',
    '/canada/british-columbia',
    '/canada/quebec',
  ]))
}

export async function GET() {
  const now = new Date().toISOString()
  const urls = getPriorityRoutes()

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map((route) => [
      '  <url>',
      `    <loc>${escapeXml(`${BASE_URL}${route}`)}</loc>`,
      `    <lastmod>${now}</lastmod>`,
      '    <changefreq>daily</changefreq>',
      '    <priority>0.9</priority>',
      '  </url>',
    ].join('\n')),
    '</urlset>',
  ].join('\n')

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=86400',
    },
  })
}
