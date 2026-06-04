'use client'

import { usePathname } from 'next/navigation'
import Script from 'next/script'

const EXCLUDED_ROUTES = [
  '/contact',
  '/consultation',
  '/booking',
  '/partners'
]

const ADSENSE_PUBLISHER_ID = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || 'ca-pub-1200907614877581'

export function AdSenseLoader() {
  const pathname = usePathname()

  // Prevent AdSense from loading on transactional funnel pages
  const isExcluded = EXCLUDED_ROUTES.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  )

  if (isExcluded) {
    return null
  }

  return (
    <Script
      id="adsense-loader"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUBLISHER_ID}`}
      strategy="afterInteractive"
      crossOrigin="anonymous"
    />
  )
}
