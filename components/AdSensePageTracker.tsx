'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { classifyRevenuePath } from '@/lib/seo/revenueOpportunities'

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    dataLayer?: any[]
  }
}

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-DZ55NMNLYM'

function classifyPage(pathname: string) {
  if (pathname === '/') return 'home'
  if (pathname.startsWith('/blog/')) return 'blog_article'
  if (pathname === '/blog') return 'blog_index'
  if (pathname.startsWith('/guides/')) return 'guide'
  if (pathname.startsWith('/grants/')) return 'pseo_grants'
  if (pathname.startsWith('/download/')) return 'lead_magnet'
  if (pathname.startsWith('/canada/')) return 'canada_hub'
  if (pathname.startsWith('/usa/')) return 'usa_hub'
  if (pathname === '/grant-finder') return 'grant_finder'
  return 'standard_page'
}

function expectedAdSlots(pageType: string) {
  switch (pageType) {
    case 'blog_article':
      return 5
    case 'pseo_grants':
      return 4
    case 'guide':
      return 2
    case 'blog_index':
      return 3
    default:
      return 0
  }
}

export function AdSensePageTracker() {
  const pathname = usePathname()

  useEffect(() => {
    const pageType = classifyPage(pathname)
    const revenue = classifyRevenuePath(pathname)
    const pageLocation = `${window.location.origin}${pathname}`

    window.dataLayer = window.dataLayer || []
    window.gtag = window.gtag || function gtagFallback() {
      window.dataLayer?.push(arguments)
    }

    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: pathname,
      page_location: pageLocation,
      page_title: document.title,
    })

    window.gtag?.('event', 'adsense_page_type_view', {
      page_path: pathname,
      page_type: pageType,
      market: revenue.market,
      content_format: revenue.contentFormat,
      revenue_tier: revenue.revenueTier,
      expected_ad_slots: revenue.expectedAdSlots || expectedAdSlots(pageType),
      is_known_revenue_page: revenue.isKnownRevenuePage ? 'yes' : 'no',
      non_interaction: true,
      send_to: GA_MEASUREMENT_ID,
    })
  }, [pathname])

  return null
}
