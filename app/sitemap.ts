import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'
import { blogPosts } from '@/lib/data/blogPosts'
import { guidesDatabase as guides } from '@/lib/data/guides'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.fsidigital.ca'

  // Core static pages
  const coreRoutes = [
    '',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/disclaimer',
    '/grant-finder',
    '/resources',
    '/editorial-policy',
    '/about/author'
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }))

  // Blog Posts (Dynamic)
  // We include ALL posts. The "Quality Firewall" is now handled by the noindex tag 
  // inside the page template, not by excluding them from the sitemap.
  const blogRoutes = blogPosts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Guides (Dynamic)
  const guideRoutes = guides.map(guide => ({
    url: `${baseUrl}/guides/${guide.slug}`,
    lastModified: new Date(guide.lastUpdated || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  console.log(`\n✅ Sitemap generated with ${coreRoutes.length + blogRoutes.length + guideRoutes.length} URLs (Full Site)\n`)

  return [...coreRoutes, ...blogRoutes, ...guideRoutes]
}
