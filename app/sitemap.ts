import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'
import { getAllStates } from '@/lib/data/states'
import { getAllBlogPosts } from '@/lib/data/blogPosts'
import { guidesDatabase } from '@/lib/data/guides'
import { getAllStateDetails } from '@/lib/data/stateDetails'
import { getAllPseoPages } from '@/lib/pseo-data'

// Recursively find all page.tsx files and convert to routes
function getAllRoutes(dir: string, baseDir: string = 'app'): string[] {
  const routes: string[] = []
  if (!fs.existsSync(dir)) return []

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

  // 1. Get ALL static routes by recursively scanning the app directory
  const staticRoutes = getAllRoutes(appDir)

  // 2. Add Dynamic Blog Posts (from data)
  const allPosts = getAllBlogPosts()
  const dynamicBlogRoutes = allPosts
    .map(post => `/blog/${post.slug}`)
    .filter(route => !staticRoutes.includes(route))

  // 3. Add Dynamic Guides (from data)
  const dynamicGuideRoutes = guidesDatabase
    .map(guide => `/guides/${guide.slug}`)
    .filter(route => !staticRoutes.includes(route))

  // 4. Add USA State Pages (Programmatic SEO)
  const stateRoutes = getAllStates().map(state => `/usa/${state.slug}`)

  // 5. Add USA City Pages (Programmatic SEO - Level 2)
  const cityRoutes: string[] = []
  const statesDetails = getAllStateDetails()

  statesDetails.forEach(state => {
    if (state.cityGuides) {
      state.cityGuides.forEach(city => {
        const citySlug = city.city.toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
        cityRoutes.push(`/usa/${state.slug}/${citySlug}`)
      })
    }
  })

  // 6. Add Daily Drip Programmatic SEO Pages
  const pseoRoutes = getAllPseoPages()
    .filter(page => page.isPublished)
    .map(page => `/grants/${page.provinceSlug}/${page.citySlug}/${page.industrySlug}`);

  // Combine all routes
  const allRoutes = Array.from(new Set([
    ...staticRoutes,
    ...dynamicBlogRoutes,
    ...dynamicGuideRoutes,
    ...stateRoutes,
    ...cityRoutes,
    ...pseoRoutes
  ])).filter(route => !route.includes('/thank-you'))

  // Convert to sitemap format
  const sitemapEntries = allRoutes.map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route.includes('/blog/') || route.includes('/guides/')
      ? 'weekly' as const
      : 'monthly' as const,
    priority: route === '/' ? 1.0 : route.startsWith('/usa/') ? 0.8 : 0.7,
  }))

  // Logging for verification
  const blogCount = allRoutes.filter(r => r.startsWith('/blog/')).length
  const guideCount = allRoutes.filter(r => r.startsWith('/guides/')).length
  const canadaCount = allRoutes.filter(r => r.startsWith('/canada/')).length
  const usaStateCount = allRoutes.filter(r => r.startsWith('/usa/') && r.split('/').length === 3).length
  const usaCityCount = allRoutes.filter(r => r.startsWith('/usa/') && r.split('/').length === 4).length
  const pseoCityIndustryCount = allRoutes.filter(r => r.startsWith('/grants/')).length
  const downloadCount = allRoutes.filter(r => r.startsWith('/download/')).length
  const otherCount = allRoutes.length - blogCount - guideCount - canadaCount - usaStateCount - usaCityCount - pseoCityIndustryCount - downloadCount

  console.log(`\n✅ Sitemap generated with ${allRoutes.length} URLs`)
  console.log(`   📝 ${blogCount} Blog Posts`)
  console.log(`   📚 ${guideCount} Guides`)
  console.log(`   🍁 ${canadaCount} Canada Pages`)
  console.log(`   🇺🇸 ${usaStateCount} USA State Pages`)
  console.log(`   🏙️ ${usaCityCount} USA City Pages`)
  console.log(`   🤖 ${pseoCityIndustryCount} Programmatic City+Industry Pages (Active Drip)`)
  console.log(`   📥 ${downloadCount} Download Pages`)
  console.log(`   🏠 ${otherCount} Other Pages\n`)

  return sitemapEntries
}
