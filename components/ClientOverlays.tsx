'use client';

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { usePathname } from "next/navigation"

// Lazy-load these components so they don't block the main thread at page load
const CookieConsent = dynamic(
    () => import("@/components/cookie-consent").then(m => ({ default: m.CookieConsent })),
    { ssr: false }
)
const LeadMagnetPopup = dynamic(
    () => import("@/components/lead-magnet-popup").then(m => ({ default: m.LeadMagnetPopup })),
    { ssr: false }
)

export function ClientOverlays() {
    const [isClient, setIsClient] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!isClient) {
        return null
    }

    // Suppress lead magnet popups on transaction-focused pages (consultation & booking)
    const shouldSuppressPopup = pathname === "/consultation" || pathname === "/booking"

    return (
        <>
            <CookieConsent />
            {!shouldSuppressPopup && <LeadMagnetPopup />}
        </>
    )
}
