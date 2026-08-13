import fs from 'fs'
import path from 'path'

interface CrawlRecord {
  url: string
  status: number | string
  finalUrl: string
  canonical: string
  metaRobots: string
  xRobotsTag: string
  blogPostingJsonLd: boolean
  breadcrumbJsonLd: boolean
  siteJsonLd: boolean
  inSitemap: boolean
  notes: string
}

async function runTop100Crawler() {
  console.log('====================================================')
  console.log('🕷️ FSI TOP-100 INVENTORY CRAWLER')
  console.log('====================================================\n')

  const top100CsvPath = path.join(process.cwd(), 'reports', 'seo-top100-commercial-inventory.csv')
  let targetUrls: string[] = []

  if (fs.existsSync(top100CsvPath)) {
    const csvContent = fs.readFileSync(top100CsvPath, 'utf8')
    const lines = csvContent.split('\n').filter(Boolean)
    for (let i = 1; i < lines.length; i++) {
      const parts = lines[i].split(',')
      if (parts.length >= 2) {
        targetUrls.push(parts[1].trim())
      }
    }
  }

  // Fallback to Pages.csv if inventory not ready
  if (targetUrls.length === 0) {
    const pagesCsvPath = path.join(process.cwd(), '3monthGSCdata', 'Pages.csv')
    if (fs.existsSync(pagesCsvPath)) {
      const pagesContent = fs.readFileSync(pagesCsvPath, 'utf8')
      const lines = pagesContent.split('\n').filter(Boolean)
      for (let i = 1; i < Math.min(101, lines.length); i++) {
        const parts = lines[i].split(',')
        if (parts.length >= 1) {
          targetUrls.push(parts[0].trim().replace(/^"|"$/g, ''))
        }
      }
    }
  }

  console.log(`[Crawler] Found ${targetUrls.length} target URLs to crawl.`)

  // Fetch /sitemap.xml to check inclusion
  const sitemapUrls = new Set<string>()
  try {
    const sitemapRes = await fetch('https://www.fsidigital.ca/sitemap.xml', { signal: AbortSignal.timeout(10000) })
    if (sitemapRes.ok) {
      const xml = await sitemapRes.text()
      const matches = xml.match(/<loc>(.*?)<\/loc>/g) || []
      matches.forEach(m => {
        const clean = m.replace('<loc>', '').replace('</loc>', '').trim()
        sitemapUrls.add(clean)
      })
      console.log(`[Crawler] Ingested ${sitemapUrls.size} URLs from live sitemap.xml`)
    }
  } catch (e) {
    console.warn('[Crawler] Could not fetch live sitemap.xml, fallback to local static checks:', (e as any).message)
  }

  const results: CrawlRecord[] = []

  for (let i = 0; i < targetUrls.length; i++) {
    const url = targetUrls[i]
    const cleanUrl = url.replace(/\/$/, '')
    console.log(`[${i + 1}/${targetUrls.length}] Crawling: ${url}`)

    let status: number | string = 0
    let finalUrl = url
    let canonical = 'MISSING'
    let metaRobots = 'index, follow'
    let xRobotsTag = 'NONE'
    let blogPostingJsonLd = false
    let breadcrumbJsonLd = false
    let siteJsonLd = false
    let inSitemap = sitemapUrls.has(url) || sitemapUrls.has(cleanUrl) || sitemapUrls.has(`${cleanUrl}/`)
    let notes = 'OK'

    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; FSICrawler/2.0; +https://www.fsidigital.ca/bot)'
        },
        redirect: 'follow',
        signal: AbortSignal.timeout(8000)
      })

      status = res.status
      finalUrl = res.url
      xRobotsTag = res.headers.get('x-robots-tag') || 'NONE'

      if (res.ok) {
        const html = await res.text()

        // Extract canonical
        const canMatch = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i) ||
                         html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i)
        if (canMatch && canMatch[1]) {
          canonical = canMatch[1]
        }

        // Extract meta robots
        const robMatch = html.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i)
        if (robMatch && robMatch[1]) {
          metaRobots = robMatch[1]
        }

        // Detect JSON-LD types
        if (html.includes('"@type":"BlogPosting"') || html.includes('"@type": "BlogPosting"') || html.includes('BlogPosting')) {
          blogPostingJsonLd = true
        }
        if (html.includes('"@type":"BreadcrumbList"') || html.includes('"@type": "BreadcrumbList"') || html.includes('BreadcrumbList')) {
          breadcrumbJsonLd = true
        }
        if (html.includes('"@type":"Organization"') || html.includes('"@type":"WebSite"')) {
          siteJsonLd = true
        }

        if (metaRobots.includes('noindex') || xRobotsTag.includes('noindex')) {
          notes = '⚠️ NOINDEX DETECTED'
        } else if (canonical !== url && canonical !== `${url}/` && canonical !== cleanUrl) {
          notes = `⚠️ CANONICAL MISMATCH: ${canonical}`
        }
      } else {
        notes = `HTTP_${status}`
      }
    } catch (err: any) {
      status = 'FAILED'
      notes = `FETCH_ERROR: ${err.message}`
    }

    results.push({
      url,
      status,
      finalUrl,
      canonical,
      metaRobots,
      xRobotsTag,
      blogPostingJsonLd,
      breadcrumbJsonLd,
      siteJsonLd,
      inSitemap,
      notes
    })
  }

  // Save CSV Report
  const reportsDir = path.join(process.cwd(), 'reports')
  if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true })

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const csvPath = path.join(reportsDir, `seo-crawl-results-${timestamp}.csv`)
  const canonicalCsvPath = path.join(reportsDir, 'seo-crawl-results-latest.csv')

  const csvRows = [
    'url,status,final_url,canonical,meta_robots,x_robots_tag,blogposting_jsonld,breadcrumb_jsonld,site_jsonld,in_sitemap,notes'
  ]

  results.forEach(r => {
    csvRows.push([
      `"${r.url}"`,
      r.status,
      `"${r.finalUrl}"`,
      `"${r.canonical}"`,
      `"${r.metaRobots}"`,
      `"${r.xRobotsTag}"`,
      r.blogPostingJsonLd,
      r.breadcrumbJsonLd,
      r.siteJsonLd,
      r.inSitemap,
      `"${r.notes}"`
    ].join(','))
  })

  fs.writeFileSync(csvPath, csvRows.join('\n'), 'utf8')
  fs.writeFileSync(canonicalCsvPath, csvRows.join('\n'), 'utf8')

  console.log(`\n[Crawler] ✅ Saved crawl results to ${csvPath}`)
  console.log(`[Crawler] Total URLs Audited: ${results.length}`)
  console.log(`[Crawler] 200 OK Status:       ${results.filter(r => r.status === 200).length}`)
  console.log(`[Crawler] In Sitemap:         ${results.filter(r => r.inSitemap).length}`)
  console.log(`[Crawler] JSON-LD Schema:     ${results.filter(r => r.blogPostingJsonLd || r.breadcrumbJsonLd || r.siteJsonLd).length}`)
}

runTop100Crawler().catch(console.error)
