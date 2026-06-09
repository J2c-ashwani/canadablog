"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Loader2, Settings, CheckCircle2, Sparkles, AlertTriangle } from "lucide-react"

function PreferencesContent() {
  const searchParams = useSearchParams()
  const queryEmail = searchParams.get("email") || ""

  // Form States
  const [email, setEmail] = useState(queryEmail)
  const [name, setName] = useState("")
  const [country, setCountry] = useState<"Canada" | "USA">("Canada")
  const [region, setRegion] = useState("")
  const [industry, setIndustry] = useState("")
  const [companySize, setCompanySize] = useState("")
  const [interests, setInterests] = useState<string[]>([])
  
  // App States
  const [isLoadingProfile, setIsLoadingProfile] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [successMsg, setSuccessMsg] = useState("")
  const [profileLoaded, setProfileLoaded] = useState(false)

  // Fetch subscriber profile if email query exists
  useEffect(() => {
    if (queryEmail) {
      loadProfile(queryEmail)
    }
  }, [queryEmail])

  const loadProfile = async (targetEmail: string) => {
    setIsLoadingProfile(true)
    setErrorMsg("")
    setSuccessMsg("")
    try {
      const response = await fetch(`/api/subscribe/profile?email=${encodeURIComponent(targetEmail)}`)
      const data = await response.json()
      if (response.ok && data.success && data.profile) {
        const p = data.profile
        setName(p.name || "")
        setCountry(p.country || "Canada")
        setRegion(p.region || "")
        setIndustry(p.industry || "")
        setCompanySize(p.companySize || "")
        setInterests(p.fundingInterests || [])
        setProfileLoaded(true)
      } else {
        setErrorMsg("Email profile not found in our directory. You can save to register a new alert profile.")
      }
    } catch (err) {
      console.error(err)
      setErrorMsg("Failed to load profile details.")
    } finally {
      setIsLoadingProfile(false)
    }
  }

  const handleInterestChange = (interest: string) => {
    setInterests(prev => 
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    )
  }

  const handleSavePreferences = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSaving(true)
    setErrorMsg("")
    setSuccessMsg("")

    try {
      const response = await fetch("/api/subscribe/preferences", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
          country,
          region,
          industry,
          companySize,
          fundingInterests: interests,
        }),
      })

      const data = await response.json()
      if (response.ok && data.success) {
        setSuccessMsg("Preferences updated successfully! Your funding intelligence profile is active.")
        setProfileLoaded(true)
      } else {
        setErrorMsg(data.error || "Failed to update alert preferences.")
      }
    } catch (err) {
      console.error(err)
      setErrorMsg("An unexpected error occurred. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

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
    { value: "CA", label: "California (CA)" },
    { value: "TX", label: "Texas (TX)" },
    { value: "NY", label: "New York (NY)" },
    { value: "FL", label: "Florida (FL)" },
    { value: "IL", label: "Illinois (IL)" },
    { value: "OH", label: "Ohio (OH)" },
    { value: "Other", label: "Other / Federal Only" }
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
    { value: "other", label: "Other Industry" }
  ]

  const sizes = [
    { value: "1-9", label: "Micro Enterprise (1-9 employees)" },
    { value: "10-49", label: "Small Business (10-49 employees)" },
    { value: "50-99", label: "Medium Venture (50-99 employees)" },
    { value: "100-499", label: "Mid-Market (100-499 employees)" },
    { value: "500+", label: "Enterprise (500+ employees)" }
  ]

  const fundingCategories = ["Grants", "Loans", "Tax Credits", "Hiring Subsidies"]

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      <Header />

      <main className="flex-1 py-12 flex items-center justify-center">
        <div className="w-full max-w-2xl px-4">
          <Card className="border border-slate-800 bg-slate-950 text-white shadow-2xl rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-950/20 to-slate-950 p-6 border-b border-slate-900 flex flex-row items-center gap-4">
              <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400">
                <Settings className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold">Funding Intelligence Alerts</CardTitle>
                <CardDescription className="text-slate-400 text-xs mt-1">
                  Configure your profile to receive targeted, compliant B2B alerts.
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              {/* Load Profile Section */}
              {!profileLoaded && !queryEmail && (
                <div className="mb-6 p-4 border border-slate-800 bg-slate-900/40 rounded-xl flex items-center gap-3">
                  <Input
                    type="email"
                    placeholder="Enter email to load existing profile"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-slate-950 border-slate-800 text-white placeholder-slate-500 text-xs"
                  />
                  <Button 
                    onClick={() => loadProfile(email)}
                    disabled={isLoadingProfile || !email}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs whitespace-nowrap px-4"
                  >
                    {isLoadingProfile ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Load Profile"}
                  </Button>
                </div>
              )}

              {isLoadingProfile ? (
                <div className="flex flex-col items-center justify-center py-12 space-y-3">
                  <Loader2 className="h-8 w-8 text-blue-400 animate-spin" />
                  <p className="text-xs text-slate-400">Fetching intelligence profile...</p>
                </div>
              ) : (
                <form onSubmit={handleSavePreferences} className="space-y-6">
                  {errorMsg && (
                    <div className="p-3 bg-amber-500/10 border border-amber-500/25 rounded-lg text-amber-400 text-xs font-semibold text-center flex items-center justify-center gap-2">
                      <AlertTriangle className="h-4 w-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {successMsg && (
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/25 rounded-lg text-emerald-400 text-xs font-semibold text-center flex items-center justify-center gap-2">
                      <CheckCircle2 className="h-4 w-4 shrink-0" />
                      <span>{successMsg}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        Work Email
                      </label>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={profileLoaded}
                        required
                        className="bg-slate-900 border-slate-800 text-white placeholder-slate-500 disabled:opacity-50"
                      />
                    </div>

                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        Full Name
                      </label>
                      <Input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="bg-slate-900 border-slate-800 text-white placeholder-slate-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Country */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        Country
                      </label>
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value as any)}
                        className="w-full h-10 px-3 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Canada">Canada</option>
                        <option value="USA">United States</option>
                      </select>
                    </div>

                    {/* Region */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        State / Province
                      </label>
                      <select
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        required
                        className="w-full h-10 px-3 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Region...</option>
                        {provinces
                          .filter(p => {
                            if (country === "Canada") return ["ON", "BC", "AB", "QC", "MB", "SK", "NS", "NB", "NL", "PE", "Other"].includes(p.value)
                            return !["ON", "BC", "AB", "QC", "MB", "SK", "NS", "NB", "NL", "PE"].includes(p.value)
                          })
                          .map((prov) => (
                            <option key={prov.value} value={prov.value}>
                              {prov.label}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Industry */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        Industry
                      </label>
                      <select
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        required
                        className="w-full h-10 px-3 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Sector...</option>
                        {industries.map((ind) => (
                          <option key={ind.value} value={ind.value}>
                            {ind.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Company Size */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        Company Size (Employees)
                      </label>
                      <select
                        value={companySize}
                        onChange={(e) => setCompanySize(e.target.value)}
                        required
                        className="w-full h-10 px-3 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Size...</option>
                        {sizes.map((sz) => (
                          <option key={sz.value} value={sz.value}>
                            {sz.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Funding Interests */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                      Funding Interests
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {fundingCategories.map((cat) => {
                        const isChecked = interests.includes(cat)
                        return (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => handleInterestChange(cat)}
                            className={`p-3 border rounded-xl text-xs font-semibold transition-all text-center ${
                              isChecked
                                ? "bg-blue-600/10 border-blue-500 text-blue-400 shadow-md shadow-blue-500/5"
                                : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
                            }`}
                          >
                            {cat}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSaving || !email || !region || !industry || !companySize}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-6 text-sm flex items-center justify-center gap-2 mt-4"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Saving Preferences...
                      </>
                    ) : (
                      <>
                        <Settings className="h-4 w-4" />
                        Save Alerts Configuration
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function PreferencesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-blue-400 animate-spin" />
      </div>
    }>
      <PreferencesContent />
    </Suspense>
  )
}
