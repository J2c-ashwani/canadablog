'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { classifyRevenuePath } from '@/lib/seo/revenueOpportunities'
import { calculateTrafficQuality } from '@/lib/telemetry/traffic-quality'

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


  // Track user interaction to detect humans dynamically
  useEffect(() => {
    if (typeof window === 'undefined') return

    const setInteraction = () => {
      if (sessionStorage.getItem('fsi_human_interaction') !== 'true') {
        sessionStorage.setItem('fsi_human_interaction', 'true')
        const quality = calculateTrafficQuality()
        
        // Update user properties in gtag dynamically
        window.gtag?.('set', {
          traffic_quality_score: quality.score,
          traffic_quality_classification: quality.classification
        })

        // Also track a dynamic event to capture verification
        window.gtag?.('event', 'human_interaction_verified', {
          traffic_quality_score: quality.score,
          traffic_quality_classification: quality.classification,
          non_interaction: true,
          send_to: GA_MEASUREMENT_ID,
        })
      }
    }

    window.addEventListener('mousemove', setInteraction, { passive: true })
    window.addEventListener('keydown', setInteraction, { passive: true })
    window.addEventListener('scroll', setInteraction, { passive: true })
    window.addEventListener('touchstart', setInteraction, { passive: true })
    window.addEventListener('click', setInteraction, { passive: true })

    return () => {
      window.removeEventListener('mousemove', setInteraction)
      window.removeEventListener('keydown', setInteraction)
      window.removeEventListener('scroll', setInteraction)
      window.removeEventListener('touchstart', setInteraction)
      window.removeEventListener('click', setInteraction)
    }
  }, [])

  // Page view and custom tracking effect
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Increment pages viewed
    const currentViews = parseInt(sessionStorage.getItem('fsi_pages_viewed') || '0', 10)
    sessionStorage.setItem('fsi_pages_viewed', (currentViews + 1).toString())

    const handleTracking = () => {
      const pageLocation = `${window.location.origin}${pathname}`
      const pageTitle = document.title
      const pageType = classifyPage(pathname)
      const revenue = classifyRevenuePath(pathname)
      const quality = calculateTrafficQuality()

      window.dataLayer = window.dataLayer || []
      window.gtag = window.gtag || function gtagFallback() {
        window.dataLayer?.push(arguments)
      }

      // Configure/set user properties for general tracking session
      window.gtag('set', {
        traffic_quality_score: quality.score,
        traffic_quality_classification: quality.classification,
        session_timezone: quality.timezone,
        session_language: quality.language
      })

      // 1. Explicitly dispatch 'page_view' for SPA route updates
      window.gtag('event', 'page_view', {
        page_path: pathname,
        page_location: pageLocation,
        page_title: pageTitle,
        traffic_quality_score: quality.score,
        traffic_quality_classification: quality.classification,
        session_timezone: quality.timezone,
        session_language: quality.language,
        send_to: GA_MEASUREMENT_ID,
      })

      // 2. Dispatch the custom revenue/ad slot optimization events
      window.gtag('event', 'adsense_page_type_view', {
        page_path: pathname,
        page_type: pageType,
        market: revenue.market,
        content_format: revenue.contentFormat,
        revenue_tier: revenue.revenueTier,
        expected_ad_slots: revenue.expectedAdSlots || expectedAdSlots(pageType),
        is_known_revenue_page: revenue.isKnownRevenuePage ? 'yes' : 'no',
        traffic_quality_score: quality.score,
        traffic_quality_classification: quality.classification,
        session_timezone: quality.timezone,
        session_language: quality.language,
        non_interaction: true,
        send_to: GA_MEASUREMENT_ID,
      })
    }

    // Delay event dispatch by 100ms to let document.title reflect the client transition metadata
    const timer = setTimeout(handleTracking, 100)
    return () => clearTimeout(timer)
  }, [pathname])

  return null
}

