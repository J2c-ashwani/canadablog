import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'
import { getAllStates } from '@/lib/data/states'

// Recursively find all page.tsx files and convert to routes
function getAllRoutes(dir: string, baseDir: string = 'app'): string[] {
  const routes: string[] = []
  const items = fs.readdirSync(dir, { withFileTypes: true })

  for (const item of items) {
    const fullPath = path.join(dir, item.name)

    if (item.isDirectory()) {
      // Skip dynamic routes, node_modules, and hidden directories
      if (!item.name.startsWith('[') && !item.name.startsWith('.') && item.name !== 'api') {
        routes.push(...getAllRoutes(fullPath, baseDir))
      }
    } else if (item.name === 'page.tsx' || item.name === 'page.ts') {
      // Convert file path to route
      const route = fullPath
        .replace(path.join(process.cwd(), baseDir), '')
        .replace('/page.tsx', '')
        .replace('/page.ts', '')
        .replace(/\\/g, '/')  // Normalize Windows paths
      routes.push(route || '/')
    }
  }

  return routes
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.fsidigital.ca'
  const appDir = path.join(process.cwd(), 'app')

  // Get ALL routes by recursively scanning the app directory
  const allRoutes = getAllRoutes(appDir)

  // Add USA state dynamic routes (50 states)
  const stateRoutes = getAllStates().map(state => `/usa/${state.slug}`)
  const combinedRoutes = [...allRoutes, ...stateRoutes]

  // Convert to sitemap format
  const sitemapEntries = combinedRoutes.map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route.includes('/blog/') || route.includes('/guides/')
      ? 'weekly' as const
      : 'monthly' as const,
    priority: route === '/' ? 1.0 : 0.7,
  }))

  // Count by category for logging
  const blogCount = combinedRoutes.filter(r => r.startsWith('/blog/')).length
  const guideCount = combinedRoutes.filter(r => r.startsWith('/guides/')).length
  const canadaCount = combinedRoutes.filter(r => r.startsWith('/canada/')).length
  const usaCount = combinedRoutes.filter(r => r.startsWith('/usa/')).length
  const downloadCount = combinedRoutes.filter(r => r.startsWith('/download/')).length
  const otherCount = combinedRoutes.length - blogCount - guideCount - canadaCount - usaCount - downloadCount

  console.log(`\n✅ Sitemap generated with ${combinedRoutes.length} URLs`)
  console.log(`   📝 ${blogCount} Blog Posts`)
  console.log(`   📚 ${guideCount} Guides`)
  console.log(`   🍁 ${canadaCount} Canada Pages`)
  console.log(`   🇺🇸 ${usaCount} USA Pages (includes ${stateRoutes.length} states)`)
  console.log(`   📥 ${downloadCount} Download Pages`)
  console.log(`   🏠 ${otherCount} Other Pages\n`)

  return sitemapEntries
}
