'use client'

import { usePathname } from 'next/navigation'
import Script from 'next/script'
import { useEffect, useState } from 'react'

const EXCLUDED_ROUTES = [
  '/contact',
  '/consultation',
  '/booking',
  '/partners',
  '/calculator',
  '/products',
  '/portfolio',
  '/checkout'
]

const ADSENSE_PUBLISHER_ID = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || 'ca-pub-1200907614877581'

export function AdSenseLoader() {
  const pathname = usePathname()
  const [shouldLoad, setShouldLoad] = useState(false)

  // Prevent AdSense from loading on transactional funnel pages
  const isExcluded = EXCLUDED_ROUTES.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  )

  useEffect(() => {
    if (isExcluded || shouldLoad) return

    const handleInteraction = () => {
      setShouldLoad(true)
      cleanup()
    }

    const cleanup = () => {
      window.removeEventListener('scroll', handleInteraction, { capture: true })
      window.removeEventListener('mousemove', handleInteraction, { capture: true })
      window.removeEventListener('touchstart', handleInteraction, { capture: true })
      window.removeEventListener('keydown', handleInteraction, { capture: true })
    }

    window.addEventListener('scroll', handleInteraction, { passive: true, capture: true })
    window.addEventListener('mousemove', handleInteraction, { passive: true, capture: true })
    window.addEventListener('touchstart', handleInteraction, { passive: true, capture: true })
    window.addEventListener('keydown', handleInteraction, { passive: true, capture: true })

    // Safety fallback: load after 4 seconds of idle time
    const fallbackTimeout = setTimeout(handleInteraction, 4000)

    return () => {
      cleanup()
      clearTimeout(fallbackTimeout)
    }
  }, [isExcluded, shouldLoad])

  if (isExcluded || !shouldLoad) {
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

