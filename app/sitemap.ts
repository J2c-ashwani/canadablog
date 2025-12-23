import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.fsidigital.ca'

  // ============================================
  // RECURSIVE FUNCTION - Gets ALL pages
  // ============================================
  function getAllPagePaths(dirPath: string = '', basePath: string = ''): string[] {
    const results: string[] = []
    const fullPath = path.join(process.cwd(), 'app', dirPath)

    try {
      const items = fs.readdirSync(fullPath)

      for (const item of items) {
        const itemPath = path.join(fullPath, item)
        const stat = fs.statSync(itemPath)

        if (stat.isDirectory()) {
          // Skip dynamic route folders like [slug]
          if (!item.startsWith('[')) {
            // Recursively search subdirectories
            const newDirPath = dirPath ? `${dirPath}/${item}` : item
            const newBasePath = basePath ? `${basePath}/${item}` : `/${item}`
            const subResults = getAllPagePaths(newDirPath, newBasePath)
            results.push(...subResults)
          }
        } else if (item === 'page.tsx' || item === 'page.ts') {
          // Found a page file - add the path
          results.push(basePath || '/')
        }
      }
    } catch (error) {
      console.error(`Error reading directory ${dirPath}:`, error)
    }

    return results
  }

  // Get ALL pages recursively
  const allPaths = getAllPagePaths()

  // Remove duplicates and sort
  const uniquePaths = [...new Set(allPaths)].sort()

  // ============================================
  // CREATE SITEMAP ENTRIES WITH PRIORITIES
  // ============================================
  const sitemapEntries = uniquePaths.map((urlPath) => {
    let priority = 0.7
    let changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly' = 'monthly'

    // Set priority and frequency based on path type
    if (urlPath === '/') {
      priority = 1.0
      changeFrequency = 'daily'
    } else if (urlPath === '/grants' || urlPath === '/grant-finder') {
      priority = 0.9
      changeFrequency = 'daily'
    } else if (urlPath === '/blog' || urlPath === '/guides') {
      priority = 0.9
      changeFrequency = 'weekly'
    } else if (urlPath.startsWith('/blog/')) {
      priority = 0.7
      changeFrequency = 'weekly'
    } else if (urlPath.startsWith('/guides/')) {
      priority = 0.8
      changeFrequency = 'monthly'
    } else if (urlPath.startsWith('/usa/') || urlPath.startsWith('/canada/')) {
      priority = 0.9
      changeFrequency = 'weekly'
    } else if (urlPath.startsWith('/download/')) {
      priority = 0.6
      changeFrequency = 'monthly'
    } else if (urlPath === '/privacy' || urlPath === '/terms' || urlPath === '/disclaimer') {
      priority = 0.5
      changeFrequency = 'yearly'
    } else if (urlPath === '/about' || urlPath === '/contact') {
      priority = 0.8
      changeFrequency = 'monthly'
    } else if (urlPath === '/newsletter' || urlPath === '/search') {
      priority = 0.7
      changeFrequency = 'weekly'
    }

    return {
      url: `${baseUrl}${urlPath}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    }
  })

  // ============================================
  // LOG DETAILED BREAKDOWN
  // ============================================
  console.log(`\n✅ Sitemap generated with ${sitemapEntries.length} URLs\n`)
  console.log(`📊 Breakdown:`)
  console.log(`   - Total pages: ${sitemapEntries.length}`)
  console.log(`   - Blog posts: ${sitemapEntries.filter(e => e.url.includes('/blog/') && e.url.split('/').length === 5).length}`)
  console.log(`   - Guides: ${sitemapEntries.filter(e => e.url.includes('/guides/') && e.url.split('/').length === 5).length}`)
  console.log(`   - Downloads: ${sitemapEntries.filter(e => e.url.includes('/download/')).length}`)
  console.log(`   - USA pages: ${sitemapEntries.filter(e => e.url.includes('/usa/')).length}`)
  console.log(`   - Canada pages: ${sitemapEntries.filter(e => e.url.includes('/canada/')).length}`)
  console.log(`   - Core pages: ${sitemapEntries.filter(e => !e.url.includes('/blog/') && !e.url.includes('/guides/') && !e.url.includes('/download/') && !e.url.includes('/usa/') && !e.url.includes('/canada/')).length}\n`)

  return sitemapEntries
}
