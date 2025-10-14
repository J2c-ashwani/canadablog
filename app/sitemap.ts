import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://grantfinder.pro'
  
  // Helper function to get directories
  function getDirectories(dirPath: string): string[] {
    try {
      const fullPath = path.join(process.cwd(), 'app', dirPath)
      return fs.readdirSync(fullPath).filter((item) => {
        const itemPath = path.join(fullPath, item)
        return fs.statSync(itemPath).isDirectory() && !item.startsWith('[') && item !== 'page.tsx'
      })
    } catch (error) {
      console.error(`Error reading ${dirPath}:`, error)
      return []
    }
  }

  // Get all blog posts dynamically
  const blogSlugs = getDirectories('blog')

  // Get all guide pages dynamically  
  const guideSlugs = getDirectories('guides')

  // Get USA subdirectories
  const usaSubdirs = getDirectories('usa')

  // Get Canada subdirectories
  const canadaSubdirs = getDirectories('canada')

  // ============================================
  // 1. CORE STATIC PAGES
  // ============================================
  const staticPages = [
    { url: '', priority: 1.0, changefreq: 'daily' as const },
    { url: '/about', priority: 0.8, changefreq: 'monthly' as const },
    { url: '/contact', priority: 0.8, changefreq: 'monthly' as const },
    { url: '/privacy', priority: 0.5, changefreq: 'yearly' as const },
    { url: '/terms', priority: 0.5, changefreq: 'yearly' as const },
    { url: '/disclaimer', priority: 0.5, changefreq: 'yearly' as const },
    { url: '/newsletter', priority: 0.7, changefreq: 'weekly' as const },
    { url: '/grant-finder', priority: 0.9, changefreq: 'daily' as const },
    { url: '/grants', priority: 0.9, changefreq: 'daily' as const },
    { url: '/guides', priority: 0.9, changefreq: 'weekly' as const },
    { url: '/blog', priority: 0.9, changefreq: 'daily' as const },
    { url: '/search', priority: 0.7, changefreq: 'weekly' as const },
  ].map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: new Date(),
    changeFrequency: page.changefreq,
    priority: page.priority,
  }))

  // ============================================
  // 2. USA PAGES
  // ============================================
  const usaMainPages = [
    { url: '/usa', priority: 0.9 },
    { url: '/usa/federal-grants', priority: 0.9 },
    { url: '/usa/small-business-grants', priority: 0.9 },
    { url: '/usa/technology-startup-grants', priority: 0.9 },
    { url: '/usa/women-entrepreneurs-grants', priority: 0.9 },
  ].map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: page.priority,
  }))

  // USA subdirectories (california, texas, etc.)
  const usaSubPages = usaSubdirs.map((slug) => ({
    url: `${baseUrl}/usa/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))

  // ============================================
  // 3. CANADA PAGES
  // ============================================
  const canadaMainPages = [
    { url: '/canada', priority: 0.9 },
    { url: '/canada/government-grants', priority: 0.9 },
    { url: '/canada/small-business-grants', priority: 0.9 },
    { url: '/canada/innovation-grants', priority: 0.9 },
    { url: '/canada/women-business-grants', priority: 0.9 },
  ].map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: page.priority,
  }))

  // Canada subdirectories (ontario, etc.)
  const canadaSubPages = canadaSubdirs.map((slug) => ({
    url: `${baseUrl}/canada/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))

  // ============================================
  // 4. BLOG POSTS (Dynamic - ALL 112 posts)
  // ============================================
  const blogPages = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // ============================================
  // 5. GUIDE PAGES (Dynamic - ALL guides)
  // ============================================
  const guidePages = guideSlugs.map((slug) => ({
    url: `${baseUrl}/guides/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // ============================================
  // 6. DOWNLOAD PAGES
  // ============================================
  const downloadPages = [
    { url: '/download/sba-application-checklist', priority: 0.7 },
    { url: '/download/sba-application-checklist/thank-you', priority: 0.5 },
  ].map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: page.priority,
  }))

  // ============================================
  // COMBINE ALL PAGES
  // ============================================
  const allPages = [
    ...staticPages,
    ...usaMainPages,
    ...usaSubPages,
    ...canadaMainPages,
    ...canadaSubPages,
    ...blogPages,
    ...guidePages,
    ...downloadPages,
  ]

  console.log(`✅ Sitemap generated with ${allPages.length} URLs`)

  return allPages
}
