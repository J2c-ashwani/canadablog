"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Download, Gift } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function LeadMagnetPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Show popup after 30 seconds or when user scrolls 50% down the page
    const timer = setTimeout(() => {
      if (!localStorage.getItem("newsletter-popup-shown")) {
        setIsOpen(true)
      }
    }, 30000)

    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      if (scrollPercent > 50 && !localStorage.getItem("newsletter-popup-shown")) {
        setIsOpen(true)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // ✅ FIXED: Now calls /api/subscribe instead of /api/newsletter
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name: ''
        }),
      })

      if (response.ok) {
        setIsSubmitted(true)
        localStorage.setItem("newsletter-popup-shown", "true")
      }
    } catch (error) {
      console.error("Newsletter signup error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      localStorage.setItem("newsletter-popup-shown", "true")
    }
  }

  if (isSubmitted) {
    return (
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Download className="h-8 w-8 text-green-600" />
            </div>
            <DialogTitle className="text-xl font-semibold text-green-800 mb-2">Success! Check Your Email</DialogTitle>
            <DialogDescription className="text-green-700 mb-6">
              We've sent you the Ultimate Grant Guide and you'll receive weekly funding opportunities.
            </DialogDescription>
            <Button
              onClick={() => {
                window.open("/pdf/ultimate-grant-guide.pdf", "_blank")
                setIsOpen(false)
              }}
              className="bg-green-600 hover:bg-green-700"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Guide Now
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">


        <DialogHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Gift className="h-6 w-6 text-primary" />
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              Limited Time
            </Badge>
          </div>
          <DialogTitle className="text-xl">Get Your Free Grant Guide</DialogTitle>
          <DialogDescription>
            50-page guide with templates, strategies, and insider tips to win government grants
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" disabled={isLoading || !email} className="w-full bg-primary hover:bg-primary/90">
            {isLoading ? "Getting Guide..." : "Get Free Guide + Weekly Updates"}
          </Button>
        </form>

        <p className="text-xs text-muted-foreground text-center mt-2">
          Join 10,000+ entrepreneurs. Unsubscribe anytime.
        </p>
      </DialogContent>
    </Dialog>
  )
}
