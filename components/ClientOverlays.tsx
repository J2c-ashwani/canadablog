'use client';

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

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

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!isClient) {
        return null
    }

    return (
        <>
            <CookieConsent />
            <LeadMagnetPopup />
        </>
    )
}
