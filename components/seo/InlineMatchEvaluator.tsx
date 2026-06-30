"use client"

import React, { useState, useEffect, useRef } from "react"
import { Sparkles, ArrowRight, ShieldCheck, Mail, Lock, CheckCircle, Loader2, DollarSign } from "lucide-react"
import { MatchScoreEngine, type MatchResult } from "@/lib/leads/MatchScoreEngine"
import type { SubscriberProfile } from "@/lib/leads/SubscriberRepository"
import type { ProgramDetails } from "@/lib/data/programs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface InlineMatchEvaluatorProps {
  program: ProgramDetails
  onUnlock: (profile: Partial<SubscriberProfile>, result: MatchResult) => void
}

export function InlineMatchEvaluator({ program, onUnlock }: InlineMatchEvaluatorProps) {
  const [step, setStep] = useState(1)
  
  // Profile Questionnaire States
  const [country, setCountry] = useState<"Canada" | "USA">("Canada")
  const [region, setRegion] = useState("ON")
  const [industry, setIndustry] = useState("technology")
  const [companySize, setCompanySize] = useState<SubscriberProfile["companySize"]>("10-49")
  const [interests, setInterests] = useState<string[]>(["Grants", "Tax Credits"])
  
  // Lead Capture States
  const [companyName, setCompanyName] = useState("")
  const [email, setEmail] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  
  // Teaser Result
  const [teaserResult, setTeaserResult] = useState<MatchResult | null>(null)

  // Monetization States
  const [leadSaved, setLeadSaved] = useState(false)
  const [sdkReady, setSdkReady] = useState(false)
  const [paymentError, setPaymentError] = useState<string | null>(null)

  const buttonsRenderedRef = useRef(false)
  const paypalClientId = "AeuWqg4P1NhiSmsyZt2lDqXg4K6Fz4_lV_mU9t_l1K-08lQ_v2n2vG1T_w_R5f2R2"

  const isEmailValid = !!(email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))

  const handleInterestToggle = (interest: string) => {
    setInterests(prev => 
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    )
  }

  const handleCalculateTeaser = () => {
    const tempProfile: Partial<SubscriberProfile> = {
      country,
      region,
      industry,
      companySize,
      fundingInterests: interests as any[]
    }
    const result = MatchScoreEngine.calculateMatch(program, tempProfile)
    setTeaserResult(result)
    setStep(5) // Move to unlock step
  }

  const handleSaveLeadDraft = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !companyName) {
      setError("Please fill in both company name and work email.")
      return
    }
    setError("")
    setSubmitting(true)

    try {
      // 1. Submit lead to database
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name: `${companyName} Founder`,
          country,
          region,
          industry,
          companySize,
          fundingInterests: interests
        })
      })

      // 2. Log evaluation parameters to Match Logs Sheet
      await fetch("/api/match/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          region,
          industry,
          companySize,
          programSlug: program.slug,
          fitBand: teaserResult?.fitBand || "None",
          confidence: teaserResult?.confidence || "Medium",
          difficulty: teaserResult?.difficulty || "Moderate"
        })
      })

      setLeadSaved(true)

      // Telemetry: lead captured
      fetch("/api/subscriber/track-activity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          event: "program_page_lead_captured",
          programSlug: program.slug
        })
      }).catch(() => {})

    } catch (err) {
      console.error("Failed to unlock and save lead:", err)
      setError("Failed to register. Please check your connection and try again.")
    } finally {
      setSubmitting(false)
    }
  }

  // Load PayPal SDK when lead is saved
  useEffect(() => {
    if (step !== 5 || !leadSaved) return
    if ((window as any).paypal) { setSdkReady(true); return; }

    const script = document.createElement("script")
    script.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(paypalClientId)}&currency=USD&intent=capture&components=buttons`
    script.type = "text/javascript"
    script.async = true
    script.onload = () => setSdkReady(true)
    script.onerror = () => {
      console.error("PayPal SDK failed to load.")
      setPaymentError("Could not load secure checkout. Please refresh the page.")
    }
    document.head.appendChild(script)
  }, [step, leadSaved])

  // Render PayPal button
  useEffect(() => {
    if (step !== 5 || !leadSaved || !isEmailValid || !sdkReady || !(window as any).paypal) {
      buttonsRenderedRef.current = false
      return
    }

    if (buttonsRenderedRef.current) return
    buttonsRenderedRef.current = true

    const container = document.getElementById("program-paypal-button")
    if (container) container.innerHTML = ""

    try {
      (window as any).paypal.Buttons({
        style: { layout: 'vertical', color: 'gold', shape: 'rect', label: 'pay', height: 45 },
        createOrder: (_data: any, actions: any) => {
          setPaymentError(null)

          // Telemetry
          fetch("/api/subscriber/track-activity", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email,
              event: "program_checkout_started",
              programSlug: program.slug
            })
          }).catch(() => {})

          return actions.order.create({
            purchase_units: [{
              amount: { value: "19.00", currency_code: 'USD' },
              description: `Funding Match Report - ${program.name}`
            }]
          })
        },
        onApprove: async (_data: any, actions: any) => {
          try {
            const details = await actions.order.capture()
            const orderId = details?.id || ''

            const res = await fetch('/api/products/purchase', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                productId: 'funding-match-report',
                email: email,
                name: `${companyName} Founder`,
                paypalOrderId: orderId,
                profileData: {
                  province: region,
                  industry: industry,
                  revenue: companySize,
                  goal: program.fundingPurpose || 'research',
                },
                attribution: {
                  landingPage: window.location.pathname,
                  referrer: document.referrer || 'direct',
                }
              })
            })

            if (res.ok) {
              const finalProfile: Partial<SubscriberProfile> = {
                email,
                name: `${companyName} Founder`,
                country,
                region,
                industry,
                companySize,
                fundingInterests: interests as any[],
                isSubscribed: true,
                reportPurchased: true
              }

              if (typeof window !== "undefined") {
                window.sessionStorage.setItem("fsi_cdp_profile", JSON.stringify(finalProfile))
                window.sessionStorage.setItem(`fsi_match_${program.slug}`, JSON.stringify(teaserResult))
              }

              // Telemetry
              fetch("/api/subscriber/track-activity", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  email,
                  event: "program_purchase_success",
                  programSlug: program.slug
                })
              }).catch(() => {})

              onUnlock(finalProfile, teaserResult!)
            } else {
              const errData = await res.json()
              setPaymentError(errData.error || "Failed to record purchase.")
            }
          } catch (e) {
            console.error("Payment capture error:", e)
            setPaymentError("An error occurred during payment capture.")
          }
        },
        onError: (err: any) => {
          console.error("PayPal Program Error:", err)
          setPaymentError("Secure checkout closed or encountered an error.")
          buttonsRenderedRef.current = false
        }
      }).render("#program-paypal-button")
    } catch (e) {
      console.error("PayPal Program render exception:", e)
      buttonsRenderedRef.current = false
    }
  }, [step, leadSaved, isEmailValid, sdkReady, teaserResult])

  return (
    <Card className="border border-slate-200 bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="bg-slate-950 text-white p-5 flex items-center justify-between">
        <div>
          <span className="text-[9px] font-black uppercase text-emerald-400 tracking-wider">Evaluation Wizard</span>
          <h3 className="text-base font-bold tracking-tight">Evaluate Program Match</h3>
        </div>
        <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400">
          <Sparkles className="h-4.5 w-4.5 animate-pulse" />
        </div>
      </div>

      <CardContent className="p-6">
        {step === 1 && (
          <div className="space-y-4">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Step 1 of 4: Incorporation Location</span>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Country</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => { setCountry("Canada"); setRegion("ON") }}
                    className={`py-2 rounded-lg text-xs font-bold border transition-colors ${
                      country === "Canada" ? "bg-slate-900 border-slate-900 text-white" : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    🍁 Canada
                  </button>
                  <button
                    type="button"
                    onClick={() => { setCountry("USA"); setRegion("TX") }}
                    className={`py-2 rounded-lg text-xs font-bold border transition-colors ${
                      country === "USA" ? "bg-slate-900 border-slate-900 text-white" : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    🇺🇸 United States
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  {country === "Canada" ? "Province" : "State"}
                </label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-semibold"
                >
                  {country === "Canada" ? (
                    <>
                      <option value="ON">Ontario (ON)</option>
                      <option value="QC">Quebec (QC)</option>
                      <option value="BC">British Columbia (BC)</option>
                      <option value="AB">Alberta (AB)</option>
                    </>
                  ) : (
                    <>
                      <option value="CA">California (CA)</option>
                      <option value="TX">Texas (TX)</option>
                      <option value="NY">New York (NY)</option>
                      <option value="FL">Florida (FL)</option>
                    </>
                  )}
                </select>
              </div>
            </div>

            <Button onClick={() => setStep(2)} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-5 text-xs flex items-center justify-center gap-2 mt-4 shadow-sm">
              Next Step <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Step 2 of 4: Business Sector</span>
            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-700 block mb-1">Primary Industry</label>
              <div className="space-y-2">
                {[
                  { id: "technology", label: "Technology / Software Development" },
                  { id: "manufacturing", label: "Advanced Manufacturing" },
                  { id: "cleantech", label: "Clean Tech & Energy Efficiency" },
                  { id: "services", label: "Professional & Business Services" },
                  { id: "agriculture", label: "Agriculture & Agri-Food" },
                  { id: "other", label: "Other General Sectors" }
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setIndustry(item.id)}
                    className={`w-full py-2.5 px-3 rounded-lg text-xs font-bold text-left border transition-colors ${
                      industry === item.id ? "bg-slate-900 border-slate-900 text-white" : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <Button onClick={() => setStep(1)} variant="outline" className="flex-1 border-slate-200 text-slate-700 font-bold py-5 text-xs">
                Back
              </Button>
              <Button onClick={() => setStep(3)} className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold py-5 text-xs flex items-center justify-center gap-2">
                Next <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Step 3 of 4: Company Size</span>
            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-700 block mb-1">Full-time Staff Size</label>
              <div className="space-y-2">
                {[
                  { id: "1-9", label: "1 to 9 employees" },
                  { id: "10-49", label: "10 to 49 employees" },
                  { id: "50-99", label: "50 to 99 employees" },
                  { id: "100-499", label: "100 to 499 employees" },
                  { id: "500+", label: "500+ employees" }
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCompanySize(item.id as any)}
                    className={`w-full py-2.5 px-3 rounded-lg text-xs font-bold text-left border transition-colors ${
                      companySize === item.id ? "bg-slate-900 border-slate-900 text-white" : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <Button onClick={() => setStep(2)} variant="outline" className="flex-1 border-slate-200 text-slate-700 font-bold py-5 text-xs">
                Back
              </Button>
              <Button onClick={() => setStep(4)} className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold py-5 text-xs flex items-center justify-center gap-2">
                Next <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Step 4 of 4: Funding Preferences</span>
            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-700 block mb-1">Select all preferred funding options</label>
              <div className="space-y-2">
                {["Grants", "Loans", "Tax Credits", "Hiring Subsidies"].map(item => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => handleInterestToggle(item)}
                    className={`w-full py-2.5 px-3 rounded-lg text-xs font-bold text-left border transition-colors flex items-center justify-between ${
                      interests.includes(item) ? "bg-slate-950 border-slate-950 text-white" : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <span>{item}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                      interests.includes(item) ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-600"
                    }`}>
                      {interests.includes(item) ? "Selected" : "Add"}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <Button onClick={() => setStep(3)} variant="outline" className="flex-1 border-slate-200 text-slate-700 font-bold py-5 text-xs">
                Back
              </Button>
              <Button onClick={handleCalculateTeaser} className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-5 text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-500/10">
                Calculate Match <Sparkles className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {step === 5 && teaserResult && (
          <div className="space-y-4 animate-fade-in text-left">
            <span className="text-[10px] font-bold text-emerald-650 uppercase tracking-wider block font-black">Pre-Screen Result Compiled!</span>
            
            {/* Fit Band Preview Teaser */}
            <div className="border border-emerald-100 bg-emerald-50/50 rounded-xl p-4 text-center space-y-1.5 shadow-xs">
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Calculated Match Strength</div>
              
              {teaserResult.status === "Eligible" ? (
                <>
                  <div className="text-xl font-black text-slate-900 tracking-tight">
                    {teaserResult.fitBand} Match
                  </div>
                  <div className="text-xs font-bold text-slate-600">
                    {teaserResult.potentialOpportunity}
                  </div>
                  <div className="text-[9px] text-emerald-800 font-bold mt-1 bg-emerald-150 inline-block px-2.5 py-0.5 rounded-full border border-emerald-200">
                    ✓ 3 Additional Stacking Matches Found
                  </div>
                </>
              ) : (
                <div className="text-lg font-extrabold text-rose-700">
                  Not Eligible
                </div>
              )}
            </div>

            {/* Email Save Form (Pre-Checkout Gate) */}
            {!leadSaved ? (
              <form onSubmit={handleSaveLeadDraft} className="space-y-3 pt-2">
                <div className="p-3 border border-slate-100 rounded-xl bg-slate-50 flex gap-2 items-start text-[10px] text-slate-500 font-semibold mb-3">
                  <Mail className="h-4 w-4 shrink-0 text-slate-400 mt-0.5" />
                  <p>Save your personalized funding search so you can return anytime. We will also email you your results.</p>
                </div>

                {error && (
                  <div className="p-2.5 bg-rose-50 border border-rose-100 rounded-lg text-rose-700 text-xs font-semibold text-center">
                    {error}
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Company Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Acme Software Ltd."
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                    className="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-semibold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Work Email</label>
                  <input
                    type="email"
                    placeholder="e.g. founder@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-semibold"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-5 text-xs flex items-center justify-center gap-2 mt-4 shadow-sm"
                >
                  {submitting ? (
                    "Saving Profile..."
                  ) : (
                    <>
                      Save &amp; Continue <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            ) : (
              <div className="space-y-4 pt-2">
                {/* Product Description */}
                <div className="border border-purple-100 bg-purple-500/5 rounded-xl p-4">
                  <div className="flex flex-col gap-1 items-start text-left mb-3">
                    <div className="flex gap-2 items-center text-xs font-black text-purple-950 uppercase tracking-wide">
                      <Lock className="w-4 h-4 text-purple-700 shrink-0" />
                      Know Which Programs Are Worth Applying To
                    </div>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
                      Funding Match Report ($19.00)
                    </span>
                  </div>
                  <p className="text-xs text-slate-650 leading-relaxed mb-3">
                    We identify which programs are worth your time before you spend hours applying.
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
                    <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-purple-600" /> Know which programs to prioritize first</li>
                    <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-purple-600" /> Avoid applications unlikely to succeed</li>
                    <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-purple-600" /> Stacking map (which programs combine)</li>
                  </ul>
                </div>

                {/* Secure Checkout Button */}
                <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
                  <div className="flex items-baseline gap-1 mb-3 justify-center">
                    <span className="text-xl font-black text-slate-900">$19</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Unlock Report</span>
                  </div>

                  <div className="min-h-[100px]">
                    {!sdkReady ? (
                      <div className="flex items-center justify-center py-4 gap-2 text-xs text-slate-400 animate-pulse font-medium">
                        <Loader2 className="w-4 h-4 animate-spin text-slate-400" /> Loading secure transaction...
                      </div>
                    ) : (
                      <div id="program-paypal-button" className="w-full"></div>
                    )}
                    {paymentError && (
                      <p className="text-xs text-red-500 mt-2 font-bold">{paymentError}</p>
                    )}
                  </div>
                </div>

                {/* Secondary Booking Action */}
                <div className="text-center mt-2">
                  <p className="text-[10px] text-slate-400">
                    Not ready to purchase? <a href="/consultation?source=program-page-wizard" className="text-purple-650 font-bold hover:underline">Book a 15-minute funding review.</a>
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
