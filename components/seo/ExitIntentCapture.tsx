"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Bell, CheckCircle2, ChevronRight, Sparkles } from "lucide-react"

export function ExitIntentCapture() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  const [industry, setIndustry] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // clientY < 20 triggers when cursor moves up towards the address/tab bar
      if (
        e.clientY < 20 &&
        !localStorage.getItem("exit-intent-shown") &&
        !localStorage.getItem("newsletter-popup-shown")
      ) {
        setIsOpen(true)
        localStorage.setItem("exit-intent-shown", "true")
      }
    }

    document.addEventListener("mouseleave", handleMouseLeave)
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

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
          name,
          location,
          industry,
          source: "Exit Intent Capture",
          country: location === "USA" ? "USA" : "Canada",
        }),
      })

      if (response.ok) {
        setIsSubmitted(true)
        localStorage.setItem("newsletter-popup-shown", "true")
      }
    } catch (error) {
      console.error("Exit intent signup error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      localStorage.setItem("exit-intent-shown", "true")
    }
  }

  // Segment Options
  const provinces = [
    { value: "ON", label: "Ontario (ON)" },
    { value: "BC", label: "British Columbia (BC)" },
    { value: "AB", label: "Alberta (AB)" },
    { value: "QC", label: "Quebec (QC)" },
    { value: "MB", label: "Manitoba (MB)" },
    { value: "SK", label: "Saskatchewan (SK)" },
    { value: "NS", label: "Nova Scotia (NS)" },
    { value: "NB", label: "New Brunswick (NB)" },
    { value: "NL", label: "Newfoundland & Labrador (NL)" },
    { value: "PE", label: "Prince Edward Island (PE)" },
    { value: "USA", label: "United States (US)" },
    { value: "Other", label: "Other / International" },
  ]

  const industries = [
    { value: "technology", label: "Technology & Software" },
    { value: "manufacturing", label: "Manufacturing & Robotics" },
    { value: "agriculture", label: "Agriculture & Agri-Food" },
    { value: "cleantech", label: "CleanTech & Energy" },
    { value: "lifesciences", label: "Life Sciences & Biotech" },
    { value: "creative", label: "Creative & Digital Media" },
    { value: "construction", label: "Construction & Engineering" },
    { value: "retail", label: "Retail & E-commerce" },
    { value: "services", label: "Professional & B2B Services" },
    { value: "other", label: "Other Industry" },
  ]

  if (isSubmitted) {
    return (
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-md border-emerald-500/25 bg-slate-950 text-white p-0 overflow-hidden shadow-2xl shadow-emerald-500/10">
          <div className="bg-gradient-to-b from-emerald-950/50 to-slate-950 p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mb-5 animate-pulse">
              <CheckCircle2 className="h-8 w-8 text-emerald-400" />
            </div>
            <DialogTitle className="text-2xl font-bold tracking-tight text-white mb-2">
              Alert Profile Activated!
            </DialogTitle>
            <DialogDescription className="text-slate-300 text-base mb-6">
              You are now registered for priority funding alerts custom-tailored for{" "}
              <span className="font-semibold text-emerald-400">
                {industry ? industries.find((i) => i.value === industry)?.label : "your sector"}
              </span>{" "}
              in{" "}
              <span className="font-semibold text-emerald-400">
                {location ? provinces.find((p) => p.value === location)?.label : "your region"}
              </span>.
            </DialogDescription>
            <div className="border border-slate-800 bg-slate-900/50 rounded-lg p-4 mb-6 text-sm text-slate-400">
              ⚡ We've sent you the <strong>Ultimate Grant Guide & Templates</strong> to your inbox.
            </div>
            <div className="flex flex-col gap-3">
              <Button
                onClick={() => {
                  window.open("/lead-magnets/ultimate-grant-guide-2026.pdf", "_blank")
                  setIsOpen(false)
                }}
                className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold transition-all"
              >
                Get Free Guide & Templates
              </Button>
              <Button
                onClick={() => {
                  setIsOpen(false)
                  window.location.href = `/calculator?email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}&industry=${encodeURIComponent(industry)}&province=${encodeURIComponent(location)}&utm_source=exit_intent_success`
                }}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold transition-all shadow-lg shadow-emerald-500/20"
              >
                Check Grant Eligibility (30s)
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg border-blue-500/20 bg-slate-950 text-white p-0 overflow-hidden shadow-2xl shadow-blue-500/10">
        {/* Header Hero Gradient */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-950 px-6 py-8 relative">
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <Badge variant="outline" className="border-blue-400/30 text-blue-400 bg-blue-950/40 backdrop-blur-xs">
              <Sparkles className="h-3.5 w-3.5 mr-1 text-yellow-400" />
              Founder Intelligence
            </Badge>
          </div>
          <div className="mt-4 flex items-start gap-4">
            <div className="p-3 bg-blue-500/15 border border-blue-400/20 rounded-xl text-blue-400 hidden sm:block">
              <Bell className="h-6 w-6 animate-bounce" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold tracking-tight text-white">
                Don't Leave Empty Handed
              </DialogTitle>
              <DialogDescription className="text-slate-300 text-sm mt-1.5">
                New government grants open and close in weeks. Get targeted email alerts for your location and industry before deadlines pass.
              </DialogDescription>
            </div>
          </div>
        </div>

        {/* Capture Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="name" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Full Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-slate-900 border-slate-800 text-white placeholder-slate-500 focus-visible:ring-blue-500 focus-visible:border-blue-500"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Work Email <span className="text-blue-400">*</span>
              </label>
              <Input
                id="email"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-slate-900 border-slate-800 text-white placeholder-slate-500 focus-visible:ring-blue-500 focus-visible:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="location" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Location (Province/State)
              </label>
              <select
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full h-10 px-3 py-2 bg-slate-900 border border-slate-800 rounded-md text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">Select Location...</option>
                {provinces.map((prov) => (
                  <option key={prov.value} value={prov.value}>
                    {prov.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="industry" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Industry
              </label>
              <select
                id="industry"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full h-10 px-3 py-2 bg-slate-900 border border-slate-800 rounded-md text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">Select Industry...</option>
                {industries.map((ind) => (
                  <option key={ind.value} value={ind.value}>
                    {ind.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading || !email}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-6 text-base transition-all rounded-lg mt-6 shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 group"
          >
            {isLoading ? (
              "Setting Up Alerts..."
            ) : (
              <>
                Activate Custom Funding Alerts
                <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>

          <div className="text-center pt-2">
            <p className="text-[11px] text-slate-500 leading-relaxed">
              We respect your privacy. Zero spam. Vetted updates only. Unsubscribe anytime.
            </p>
            <p className="text-[10px] text-slate-600 mt-1">
              * By registering, you confirm agreement with our data privacy terms.
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
