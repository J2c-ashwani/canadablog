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
const LeadConversionUpsellWatcher = dynamic(
    () => import("@/components/LeadConversionUpsellWatcher").then(m => ({ default: m.LeadConversionUpsellWatcher })),
    { ssr: false }
)
const ExitIntentCapture = dynamic(
    () => import("@/components/seo/ExitIntentCapture").then(m => ({ default: m.ExitIntentCapture })),
    { ssr: false }
)

const EXCLUDED_TRANSACTIONAL_ROUTES = [
    // Lead capture
    '/contact',
    '/consultation',
    '/booking',
    // Main conversion funnel
    '/calculator',
    '/grant-finder',
    '/audit',
    '/sample-report',
    // Payment & checkout
    '/checkout',
    '/partners/checkout',
    '/products',
    // Post-purchase / delivery
    '/portfolio',
    '/partners/success',
    '/portfolio/thank-you',
    '/portfolio/report',
    // Account & membership
    '/membership',
    // Partner revenue flow
    '/partners',
    // Email management
    '/subscribe',
]

export function ClientOverlays() {
    const [isClient, setIsClient] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        setIsClient(true)
    }, [])

    // Aggressively clean up AdSense vignette iframe and scroll-lock styles upon entering a transactional page
    useEffect(() => {
        const isExcluded = EXCLUDED_TRANSACTIONAL_ROUTES.some(route => 
            pathname === route || pathname.startsWith(route + "/")
        );

        if (isExcluded) {
            const cleanupAds = () => {
                try {
                    // Remove Google AdSense vignette blocker classes on html and body
                    document.documentElement.classList.remove('ins-adsbygoogle-noablate');
                    document.body.classList.remove('ins-adsbygoogle-noablate');
                    
                    // Reset body overflow settings to ensure scrollability
                    if (document.body.style.overflow === 'hidden') {
                        document.body.style.overflow = '';
                    }

                    // Remove the vignette overlay elements from DOM
                    const vignetteOverlay = document.getElementById('google_vignette') || document.querySelector('.google-vignette-active');
                    if (vignetteOverlay) {
                        vignetteOverlay.remove();
                    }

                    // Remove standard google ad containers and iframes
                    const adsContainers = document.querySelectorAll('iframe[name^="google_ads_iframe"], iframe[id^="google_ads_iframe"], div[id^="google_ads_iframe"]');
                    adsContainers.forEach(el => el.remove());

                    // Pause ad requests dynamically
                    if ((window as any).adsbygoogle) {
                        (window as any).adsbygoogle.pauseAdRequests = true;
                    }
                } catch (e) {
                    console.error("AdSense vignette cleanup error:", e);
                }
            };

            // Run cleanup immediately and periodically to intercept delayed script actions
            cleanupAds();
            const t1 = setTimeout(cleanupAds, 100);
            const t2 = setTimeout(cleanupAds, 500);
            const t3 = setTimeout(cleanupAds, 1500);
            const interval = setInterval(cleanupAds, 1000);

            return () => {
                clearTimeout(t1);
                clearTimeout(t2);
                clearTimeout(t3);
                clearInterval(interval);
                if ((window as any).adsbygoogle) {
                    (window as any).adsbygoogle.pauseAdRequests = false;
                }
            };
        }
    }, [pathname]);

    if (!isClient) {
        return null
    }

    // Suppress lead magnet popups on transaction-focused pages
    const shouldSuppressPopup = EXCLUDED_TRANSACTIONAL_ROUTES.some(route => 
        pathname === route || pathname.startsWith(route + "/")
    )

    return (
        <>
            {/* ─── CSS Kill-Switch: Nuke ALL ad units on revenue-critical pages ─── */}
            {shouldSuppressPopup && (
                <style dangerouslySetInnerHTML={{ __html: `
                    /* Kill Google AdSense auto-ads, vignette, anchor, and in-page units */
                    .adsbygoogle,
                    ins.adsbygoogle,
                    .google-auto-placed,
                    google-rabs-container,
                    #google_vignette,
                    .google-vignette-active,
                    iframe[name^="google_ads_iframe"],
                    iframe[id^="google_ads_iframe"],
                    div[id^="google_ads_iframe"],
                    div[id^="google_ads_frame"],
                    #google_esf,
                    [data-google-vignette],
                    .GoogleActiveViewElement {
                        display: none !important;
                        visibility: hidden !important;
                        opacity: 0 !important;
                        pointer-events: none !important;
                        height: 0 !important;
                        max-height: 0 !important;
                        width: 0 !important;
                        max-width: 0 !important;
                        overflow: hidden !important;
                        position: absolute !important;
                        top: -9999px !important;
                        left: -9999px !important;
                    }
                    /* Restore body scroll if AdSense vignette locked it */
                    body.ins-adsbygoogle-noablate,
                    html.ins-adsbygoogle-noablate {
                        overflow: auto !important;
                        position: static !important;
                    }
                `}} />
            )}
            <CookieConsent />
            <LeadConversionUpsellWatcher />
            {!shouldSuppressPopup && (
                <>
                    <LeadMagnetPopup />
                    <ExitIntentCapture />
                </>
            )}
        </>
    )
}
