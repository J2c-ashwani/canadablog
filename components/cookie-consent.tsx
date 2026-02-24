"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      setShowBanner(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setShowBanner(false)
  }

  const declineCookies = () => {
    localStorage.setItem("cookie-consent", "declined")
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="cookie-banner">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm leading-relaxed">
              We use cookies to improve your experience and show relevant content. By continuing to use our site, you
              agree to our{" "}
              <a href="/privacy" className="underline hover:no-underline">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="/terms" className="underline hover:no-underline">
                Terms of Service
              </a>
              .
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={declineCookies}
              className="bg-transparent border-white text-white hover:bg-white hover:text-gray-900"
            >
              Decline
            </Button>
            <Button size="sm" onClick={acceptCookies} className="bg-white text-gray-900 hover:bg-gray-100">
              Accept All
            </Button>
            <button onClick={declineCookies} className="text-white hover:text-gray-300 ml-2" aria-label="Close cookie banner">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
