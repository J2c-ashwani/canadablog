import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'
import { blogPosts } from '@/lib/data/blogPosts'
import { guidesDatabase as guides } from '@/lib/data/guides'
import { getAllStates } from '@/lib/data/states'

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
    '/about/author',
    '/usa',
    '/canada'
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

  // US State Pages (Programmatic SEO)
  const stateRoutes = getAllStates().map(state => ({
    url: `${baseUrl}/usa/${state.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const totalUrls = coreRoutes.length + blogRoutes.length + guideRoutes.length + stateRoutes.length
  console.log(`\n✅ Sitemap generated with ${totalUrls} URLs (Full Site + ${stateRoutes.length} State Pages)\n`)

  return [...coreRoutes, ...blogRoutes, ...guideRoutes, ...stateRoutes]
}

