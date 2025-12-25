import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'
import { blogPosts } from '@/lib/data/blogPosts'
import { guidesDatabase as guides } from '@/lib/data/guides'

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

  // Get ALL static pages recursively
  const staticPaths = getAllPagePaths()

  // Remove duplicates and sort
  const uniqueStaticPaths = [...new Set(staticPaths)].sort()

  // ============================================
  // CREATE SITEMAP ENTRIES
  // ============================================

  // 1. Static Pages
  const staticEntries = uniqueStaticPaths.map((urlPath) => {
    let priority = 0.7
    let changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly' = 'monthly'

    if (urlPath === '/') {
      priority = 1.0
      changeFrequency = 'daily'
    } else if (urlPath === '/grants' || urlPath === '/grant-finder' || urlPath === '/resources') {
      priority = 0.9
      changeFrequency = 'daily'
    } else if (urlPath === '/blog' || urlPath === '/guides') {
      priority = 0.9
      changeFrequency = 'weekly'
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
    }

    return {
      url: `${baseUrl}${urlPath}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    }
  })

  // 2. Dynamic Blog Posts
  const blogEntries = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // 3. Dynamic Guides
  const guideEntries = guides.map((guide) => ({
    url: `${baseUrl}/guides/${guide.slug}`,
    lastModified: new Date(guide.lastUpdated),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const allEntries = [...staticEntries, ...blogEntries, ...guideEntries]

  // ============================================
  // LOG DETAILED BREAKDOWN
  // ============================================
  console.log(`\n✅ Sitemap generated with ${allEntries.length} URLs\n`)
  console.log(`📊 Breakdown:`)
  console.log(`   - Static pages: ${staticEntries.length}`)
  console.log(`   - Blog posts: ${blogEntries.length}`)
  console.log(`   - Guides: ${guideEntries.length}`)
  console.log(`   - Total: ${allEntries.length}\n`)

  return allEntries
}
