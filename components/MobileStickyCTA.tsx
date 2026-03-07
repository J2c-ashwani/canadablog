"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, Sparkles } from "lucide-react";

export function MobileStickyCTA() {
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    useEffect(() => {
        // Check if user has previously dismissed the CTA in this session
        const dismissed = sessionStorage.getItem("fsi_mobile_cta_dismissed");
        if (dismissed === "true") {
            setIsDismissed(true);
            return;
        }

        const handleScroll = () => {
            if (isDismissed) return;

            // Calculate how far the user has scrolled
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            const fullHeight = document.documentElement.scrollHeight;

            // Calculate scroll percentage (0 to 100)
            const scrollPercentage = (scrollPosition / (fullHeight - windowHeight)) * 100;

            // Show after scrolling 20% of the page
            if (scrollPercentage > 20) {
                setIsVisible(true);
            } else {
                // Optional: hide it if they scroll all the way back up
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        // Initial check in case they reload halfway down the page
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, [isDismissed]);

    const handleDismiss = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsVisible(false);
        setIsDismissed(true);
        sessionStorage.setItem("fsi_mobile_cta_dismissed", "true");
    };

    if (!isVisible || isDismissed) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:hidden animate-in slide-in-from-bottom-full duration-500">
            <div className="bg-white rounded-2xl shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.15)] border border-gray-100 p-4 relative overflow-hidden">
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none" />

                <button
                    onClick={handleDismiss}
                    className="absolute top-2 right-2 p-1.5 text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors z-10"
                    aria-label="Dismiss"
                >
                    <X className="w-4 h-4" />
                </button>

                <div className="pr-6">
                    <div className="flex items-center gap-2 mb-1.5">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <h4 className="text-sm font-bold text-gray-900">Find Your Funding</h4>
                    </div>
                    <p className="text-xs text-gray-600 mb-3 leading-tight">
                        See exactly how much your business qualifies for in 60 seconds.
                    </p>

                    <Link href="/calculator" className="block w-full">
                        <button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2.5 px-4 rounded-xl shadow-sm text-sm transition-all active:scale-[0.98]">
                            Calculate Grant Match ➔
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
