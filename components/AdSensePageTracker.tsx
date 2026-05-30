'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}

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

    window.gtag?.('event', 'adsense_page_type_view', {
      page_path: pathname,
      page_type: pageType,
      expected_ad_slots: expectedAdSlots(pageType),
      send_to: 'G-DZ55NMNLYM',
    })
  }, [pathname])

  return null
}
