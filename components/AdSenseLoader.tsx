'use client'

import { usePathname } from 'next/navigation'
import Script from 'next/script'
import { useEffect, useState } from 'react'

// ─── Ad-Free Zone Configuration ───────────────────────────────────────────────
// RULE: No ads on any page where a visitor is:
//   (a) about to pay,     → payment / checkout paths
//   (b) in the act of paying,  → PayPal / Stripe flows
//   (c) just paid,        → thank-you / success pages
//   (d) entering a lead form,  → contact / booking / consultation
//   (e) receiving a product,   → download / delivery / report
//   (f) managing an account,   → portfolio / dashboard / membership
//   (g) in the main funnel,    → calculator / grant-finder / audit tool
// Adding any new transactional route? Add it here first. Never rely solely on
// page-level CSS overrides — block at the script loader level.
// ──────────────────────────────────────────────────────────────────────────────
const EXCLUDED_ROUTES: string[] = [
  // ── Lead Capture Pages ────────────────────────────────────────────────────
  '/contact',           // Contact form
  '/consultation',      // Book a consultation
  '/booking',           // Book a call

  // ── Main Conversion Funnel ────────────────────────────────────────────────
  '/calculator',        // Grant calculator (primary lead entry)
  '/grant-finder',      // Grant finder tool
  '/audit',             // Readiness audit tool
  '/sample-report',     // Report preview (pre-purchase)

  // ── Payment & Checkout ────────────────────────────────────────────────────
  '/checkout',          // Generic checkout
  '/partners/checkout', // Partner lead purchase checkout
  '/products',          // All product pages + sub-pages (/products/*)

  // ── Post-Purchase / Delivery ──────────────────────────────────────────────
  '/portfolio',         // Buyer dashboard + report delivery
  '/partners/success',  // Partner purchase success page
  '/portfolio/thank-you',
  '/portfolio/report',  // Delivered matching report

  // ── Account & Membership ──────────────────────────────────────────────────
  '/membership',        // Membership signup / management

  // ── Partner Revenue Flow ──────────────────────────────────────────────────
  '/partners',          // All partner sub-pages

  // ── Email / Subscription Management ──────────────────────────────────────
  '/subscribe',         // Subscribe preferences + unsubscribe
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

