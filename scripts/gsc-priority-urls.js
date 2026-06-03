const fs = require('fs')
const path = require('path')

const BASE_URL = 'https://www.fsidigital.ca'
const SUPERSEDED_BLOG_SLUGS = new Set([
  'canada-irap-grants-2025',
  'indigenous-business-development-2025',
  'small-business-financing-2025',
])

const metadata = JSON.parse(fs.readFileSync(path.join(__dirname, '../lib/data/blogMetadata.json'), 'utf8'))
const posts = metadata.metadata || []
const staticBlogDirs = new Set(
  fs.readdirSync(path.join(__dirname, '../app/blog'))
    .filter((dir) => fs.existsSync(path.join(__dirname, '../app/blog', dir, 'page.tsx')) && dir !== '[slug]')
)

function wordCount(html) {
  return String(html || '')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&[a-zA-Z0-9#]+;/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length
}

function isCanonicalBlogPost(post) {
  if (!post?.slug) return false
  if (post.slug.endsWith('-archive')) return false
  if (SUPERSEDED_BLOG_SLUGS.has(post.slug)) return false
  return true
}

const rows = posts
  .filter(isCanonicalBlogPost)
  .map((post) => {
    const contentPath = path.join(__dirname, '../lib/data/blog-content', `${post.slug}.json`)
    const staticPath = path.join(__dirname, '../app/blog', post.slug, 'page.tsx')
    const contentJson = fs.existsSync(contentPath)
      ? JSON.parse(fs.readFileSync(contentPath, 'utf8'))
      : {}
    const source = staticBlogDirs.has(post.slug) && fs.existsSync(staticPath)
      ? fs.readFileSync(staticPath, 'utf8')
      : contentJson.content || ''

    return {
      url: `${BASE_URL}/blog/${post.slug}`,
      slug: post.slug,
      title: post.title,
      words: wordCount(source),
      sourceType: staticBlogDirs.has(post.slug) ? 'static' : 'dynamic',
      recentlyExpanded: source.includes('Indexing recovery expansion'),
      hasFaqSchemaNoise: /FAQPage|itemtype="https:\/\/schema.org\/FAQPage"/.test(source),
    }
  })
  .sort((a, b) => {
    if (a.hasFaqSchemaNoise !== b.hasFaqSchemaNoise) return a.hasFaqSchemaNoise ? -1 : 1
    if (a.recentlyExpanded !== b.recentlyExpanded) return a.recentlyExpanded ? -1 : 1
    return a.words - b.words
  })

const manualLimit = Math.max(1, Math.min(Number(process.argv[2] || 10), 50))
const priority = rows.slice(0, manualLimit)

console.log('\nGSC URL Inspection Priority List')
console.log('After deployment, submit these sitemaps in Google Search Console:')
console.log('https://www.fsidigital.ca/sitemap.xml')
console.log('https://www.fsidigital.ca/priority-sitemap.xml')
console.log('https://www.fsidigital.ca/indexing-recovery-sitemap.xml\n')
console.log(`Then manually inspect only these top ${manualLimit} URLs in Google Search Console.`)
console.log('Use sitemap validation for the wider recrawl instead of pasting every URL.\n')

for (const row of priority) {
  const flags = [
    row.recentlyExpanded ? 'expanded' : null,
    row.hasFaqSchemaNoise ? 'check-schema' : null,
    `${row.words} words`,
  ].filter(Boolean).join(', ')

  console.log(`${row.url}  (${flags})`)
}

const schemaNoiseCount = rows.filter((row) => row.hasFaqSchemaNoise).length
const expandedCount = rows.filter((row) => row.recentlyExpanded).length
const thinCount = rows.filter((row) => row.words < 900).length

console.log('\nSummary')
console.log(`Canonical blog URLs: ${rows.length}`)
console.log(`Recently expanded URLs: ${expandedCount}`)
console.log(`Canonical URLs under 900 words: ${thinCount}`)
console.log(`Canonical URLs still showing FAQ schema noise in content JSON: ${schemaNoiseCount}`)
console.log('\nManual shortcut')
console.log('Do not paste every changed URL into GSC. Submit the sitemaps above, then request indexing only for the URLs printed here.')
console.log('To print more manual URLs, run: node scripts/gsc-priority-urls.js 25\n')
