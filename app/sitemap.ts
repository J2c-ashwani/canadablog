import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'
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

  // Blog Posts (Dynamic) - Scan actual blog directory to include ALL pages
  const blogDir = path.join(process.cwd(), 'app', 'blog')
  const blogFolders = fs.readdirSync(blogDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && dirent.name !== '[slug]' && !dirent.name.startsWith('.'))
    .map(dirent => dirent.name)

  const blogRoutes = blogFolders.map(slug => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
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

  // Canada Provincial Pages (Dynamic)
  const canadaDir = path.join(process.cwd(), 'app', 'canada')
  const canadaFolders = fs.readdirSync(canadaDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && !dirent.name.startsWith('[') && !dirent.name.startsWith('.'))
    .map(dirent => dirent.name)

  const canadaRoutes = canadaFolders.map(slug => ({
    url: `${baseUrl}/canada/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Download Pages (Dynamic)
  const downloadDir = path.join(process.cwd(), 'app', 'download')
  const downloadFolders = fs.existsSync(downloadDir)
    ? fs.readdirSync(downloadDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory() && !dirent.name.startsWith('.'))
      .map(dirent => dirent.name)
    : []

  const downloadRoutes = downloadFolders.map(slug => ({
    url: `${baseUrl}/download/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  // US State Pages (Programmatic SEO)
  const stateRoutes = getAllStates().map(state => ({
    url: `${baseUrl}/usa/${state.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const allRoutes = [...coreRoutes, ...blogRoutes, ...guideRoutes, ...canadaRoutes, ...downloadRoutes, ...stateRoutes]
  const totalUrls = allRoutes.length

  console.log(`\n✅ Sitemap generated with ${totalUrls} URLs`)
  console.log(`   📝 ${blogRoutes.length} Blog Posts`)
  console.log(`   📚 ${guideRoutes.length} Guides`)
  console.log(`   🍁 ${canadaRoutes.length} Canada Pages`)
  console.log(`   📥 ${downloadRoutes.length} Download Pages`)
  console.log(`   🇺🇸 ${stateRoutes.length} USA State Pages`)
  console.log(`   🏠 ${coreRoutes.length} Core Pages\n`)

  return allRoutes
}
