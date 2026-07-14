"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Loader2, Search, Sparkles, ExternalLink, Target, CheckCircle, Lock, ShieldCheck, Mail, HelpCircle, Check, DollarSign } from "lucide-react"
import type { GrantFinderRequest, GrantFinderResponse } from "@/lib/ai-grant-matcher"
import { formatFundingRange } from "@/lib/grants-data"
import Link from "next/link"
import { LEAD_CONSENT_TEXT } from "@/lib/leads/scoring"
import { getOrCreateJourneyId, getOrCreateFunnelId, decorateTelemetryPayload } from "@/lib/analytics/journey"

export function AIGrantFinderForm() {
  const [formData, setFormData] = useState<Partial<GrantFinderRequest>>({})
  const [consentToPartnerContact, setConsentToPartnerContact] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<GrantFinderResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [hasTrackedStart, setHasTrackedStart] = useState(false)

  // Monetization State Variables
  const [selectedProductId, setSelectedProductId] = useState<'funding-match-report' | 'funding-roadmap' | 'funding-bundle'>('funding-bundle')
  const [isPurchased, setIsPurchased] = useState(false)
  const [checkoutEmail, setCheckoutEmail] = useState("")
  const [emailValidationError, setEmailValidationError] = useState("")
  const [leadSaved, setLeadSaved] = useState(false)
  const [sdkReady, setSdkReady] = useState(false)
  const [paymentError, setPaymentError] = useState<string | null>(null)

  const buttonsRenderedRef = useRef(false)
  const popupOpenedAtRef = useRef<number | null>(null)
  const paypalClientId = "AeuWqg4P1NhiSmsyZt2lDqXg4K6Fz4_lV_mU9t_l1K-08lQ_v2n2vG1T_w_R5f2R2"

  const isEmailValid = !!(checkoutEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(checkoutEmail.trim()))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/grant-finder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          consentToPartnerContact,
          pagePath: window.location.pathname,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to process request")
      }

      const data: GrantFinderResponse = await response.json()
      setResults(data)
      
      // Auto-set the checkout email if it was entered in the initial form
      if (formData.email) {
        setCheckoutEmail(formData.email)
      }

      // Track telemetry
      fetch("/api/subscriber/track-activity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email || "anonymous-finder",
          event: "ai_search_executed",
          query: formData.businessDescription || ""
        })
      }).catch(() => {})

      // Log telemetry completion to Funnel Events
      try {
        const sessId = typeof window !== 'undefined' ? sessionStorage.getItem('fsi_session_id') || 'sess_anonymous' : 'sess_anonymous';
        fetch('/api/telemetry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            eventName: 'grant_finder_completed',
            sessionId: sessId,
            pagePath: window.location.pathname,
            referrer: typeof document !== 'undefined' ? document.referrer || 'direct' : 'direct',
          })
        }).catch(() => {})
      } catch (tErr) {}

    } catch (err) {
      setError("Something went wrong. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const trackStart = () => {
    if (hasTrackedStart) return
    setHasTrackedStart(true)
    try {
      const sessId = typeof window !== 'undefined' ? sessionStorage.getItem('fsi_session_id') || 'sess_anonymous' : 'sess_anonymous';
      fetch('/api/telemetry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventName: 'grant_finder_started',
          sessionId: sessId,
          pagePath: window.location.pathname,
          referrer: typeof document !== 'undefined' ? document.referrer || 'direct' : 'direct',
        })
      }).catch(() => {})
    } catch (tErr) {}
  }

  const updateFormData = (field: keyof GrantFinderRequest, value: string) => {
    trackStart()
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Auto-save lead when email becomes valid in the checkout flow
  useEffect(() => {
    if (!results || leadSaved || !isEmailValid) return

    const saveLead = async () => {
      try {
        const messageInfo = `AI Grant Finder Lead\nCountry: ${formData.country}\nState: ${formData.state}\nIndustry: ${formData.industry}\nStage: ${formData.businessStage}\nAmount: ${formData.fundingAmount}\nPurpose: ${formData.fundingPurpose}\nDescription: ${formData.businessDescription}`;

        const jId = getOrCreateJourneyId();
        const fnId = getOrCreateFunnelId("ai_grant_finder");

        // Track diagnostic started / lead saved
        fetch("/api/subscriber/track-activity", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: checkoutEmail,
            event: "lead_saved",
            journeyId: jId,
            funnelId: fnId
          })
        }).catch(() => {});

        await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(decorateTelemetryPayload({
            name: formData.email ? formData.email.split("@")[0] : "Founder",
            email: checkoutEmail,
            phone: formData.phone || "Not provided",
            category: "AI Grant Finder",
            message: messageInfo,
            companyName: formData.companyName || "Not provided",
            country: formData.country || "Canada",
            state: formData.state || "ON",
            industry: formData.industry || "other",
            businessStage: formData.businessStage || "startup",
            fundingAmount: formData.fundingAmount || "25k-100k",
            fundingPurpose: formData.fundingPurpose || "research",
            businessDescription: messageInfo,
            consentToPartnerContact,
            pagePath: window.location.pathname,
          }, "ai_grant_finder"))
        })

        setLeadSaved(true)

        // Telemetry: lead captured & checkout viewed
        fetch("/api/subscriber/track-activity", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(decorateTelemetryPayload({
            email: checkoutEmail,
            event: "ai_finder_lead_captured"
          }, "ai_grant_finder"))
        }).catch(() => {})

        // Log checkout_viewed
        fetch("/api/subscriber/track-activity", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: checkoutEmail,
            event: "checkout_viewed",
            priceShown: "19.00",
            journeyId: jId,
            funnelId: fnId
          })
        }).catch(() => {});

        fetch("/api/telemetry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(decorateTelemetryPayload({
            eventName: "checkout_viewed",
            sessionId: checkoutEmail || "sess_anonymous",
            pagePath: window.location.pathname,
            referrer: document.referrer || "direct",
            productId: selectedProductId || "report",
            revenue: selectedProductId === "funding-bundle" ? "79.00" : selectedProductId === "funding-roadmap" ? "49.00" : "19.00"
          }, "ai_grant_finder"))
        }).catch(() => {});

      } catch (err) {
        console.error("Failed to save AI lead draft:", err)
      }
    }

    const timer = setTimeout(saveLead, 1000)
    return () => clearTimeout(timer)
  }, [checkoutEmail, isEmailValid, results, leadSaved, consentToPartnerContact, selectedProductId])

  // Track browser exited during checkout lifecycle
  useEffect(() => {
    const handleUnload = () => {
      if (results && !isPurchased && isEmailValid) {
        const payload = JSON.stringify({
          email: checkoutEmail,
          event: "browser_exited",
          journeyId: sessionStorage.getItem('fsi_journey_id') || '',
          funnelId: sessionStorage.getItem('fsi_funnel_id') || ''
        });
        if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
          navigator.sendBeacon("/api/subscriber/track-activity", payload);
        }
      }
    };
    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, [results, isPurchased, isEmailValid, checkoutEmail]);

  // Load PayPal SDK
  useEffect(() => {
    if (!results || isPurchased) return
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
  }, [results, isPurchased])

  // Render PayPal buttons
  useEffect(() => {
    if (!results || isPurchased || !isEmailValid || !sdkReady || !(window as any).paypal) {
      buttonsRenderedRef.current = false
      return
    }

    if (buttonsRenderedRef.current) return
    buttonsRenderedRef.current = true

    const container = document.getElementById("finder-paypal-button")
    if (container) container.innerHTML = ""

    try {
      // Telemetry: paypal_rendered
      fetch("/api/subscriber/track-activity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(decorateTelemetryPayload({
          email: checkoutEmail,
          event: "paypal_buttons_rendered"
        }, "ai_grant_finder"))
      }).catch(() => {})

      (window as any).paypal.Buttons({
        style: { layout: 'vertical', color: 'gold', shape: 'rect', label: 'pay', height: 45 },
        onClick: () => {
          popupOpenedAtRef.current = Date.now();
          // Telemetry: clicked, popup opened
          fetch("/api/subscriber/track-activity", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(decorateTelemetryPayload({
              email: checkoutEmail,
              event: "paypal_button_clicked"
            }, "ai_grant_finder"))
          }).catch(() => {})

          fetch("/api/subscriber/track-activity", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(decorateTelemetryPayload({
              email: checkoutEmail,
              event: "paypal_popup_opened"
            }, "ai_grant_finder"))
          }).catch(() => {})
        },
        onCancel: () => {
          const duration = popupOpenedAtRef.current ? (Date.now() - popupOpenedAtRef.current) / 1000 : 0;
          let heuristic = "Trust Issue or Undecided (Closed after 5-20s)";
          if (duration > 0 && duration < 5) {
            heuristic = "Price Shock (Immediate close < 5s)";
          } else if (duration >= 20) {
            heuristic = "Login/Auth Friction (Closed after > 20s)";
          }

          // Telemetry: payment_cancelled & popup_closed with heuristics
          fetch("/api/subscriber/track-activity", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(decorateTelemetryPayload({
              email: checkoutEmail,
              event: "payment_cancelled",
              heuristicMetadata: heuristic
            }, "ai_grant_finder"))
          }).catch(() => {})

          fetch("/api/subscriber/track-activity", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(decorateTelemetryPayload({
              email: checkoutEmail,
              event: "popup_closed",
              heuristicMetadata: heuristic
            }, "ai_grant_finder"))
          }).catch(() => {})

          fetch("/api/telemetry", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(decorateTelemetryPayload({
              eventName: "payment_cancelled",
              sessionId: checkoutEmail || "sess_anonymous",
              pagePath: window.location.pathname,
              referrer: document.referrer || "direct",
              productId: selectedProductId || "report",
              revenue: selectedProductId === "funding-bundle" ? "79.00" : selectedProductId === "funding-roadmap" ? "49.00" : "19.00",
              heuristicMetadata: heuristic
            }, "ai_grant_finder"))
          }).catch(() => {});

          setPaymentError(`Checkout closed: ${heuristic.split(" (")[0]}. You can try again when ready.`)
        },
        createOrder: (_data: any, actions: any) => {
          setPaymentError(null)
          
          let price = selectedProductId === 'funding-bundle' ? 79 : selectedProductId === 'funding-roadmap' ? 49 : 19
          const desc = `${selectedProductId === 'funding-bundle' ? 'Complete Funding Bundle' : selectedProductId === 'funding-roadmap' ? 'Funding Action Plan' : 'Funding Match Report'} - AI Finder`

          // Telemetry
          fetch("/api/subscriber/track-activity", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(decorateTelemetryPayload({
              email: checkoutEmail,
              event: "ai_finder_checkout_started",
              priceShown: price.toString()
            }, "ai_grant_finder"))
          }).catch(() => {})

          return actions.order.create({
            purchase_units: [{
              amount: { value: price.toFixed(2), currency_code: 'USD' },
              description: desc
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
              body: JSON.stringify(decorateTelemetryPayload({
                productId: selectedProductId,
                email: checkoutEmail,
                name: formData.email ? formData.email.split("@")[0] : "Founder",
                paypalOrderId: orderId,
                profileData: {
                  province: formData.state || 'ON',
                  industry: formData.industry || 'other',
                  revenue: formData.businessStage || 'startup',
                  goal: formData.fundingPurpose || 'research',
                },
                attribution: {
                  landingPage: window.location.pathname,
                  referrer: document.referrer || 'direct',
                },
                sessionId: typeof window !== 'undefined' ? (sessionStorage.getItem('fsi_session_id') || 'sess_anonymous') : 'sess_anonymous'
              }, "ai_grant_finder"))
            })

            if (res.ok) {
              setIsPurchased(true)
              
              // Telemetry
              fetch("/api/subscriber/track-activity", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(decorateTelemetryPayload({
                  email: checkoutEmail,
                  event: "ai_finder_purchase_success",
                  productId: selectedProductId
                }, "ai_grant_finder"))
              }).catch(() => {})
            } else {
              const errData = await res.json()
              setPaymentError(errData.error || "Failed to record purchase details.")
            }
          } catch (e) {
            console.error("Payment capture error:", e)
            setPaymentError("An error occurred during payment capture.")
          }
        },
        onError: (err: any) => {
          console.error("PayPal Error:", err)
          setPaymentError("Secure checkout closed or encountered an error.")
          buttonsRenderedRef.current = false
        }
      }).render("#finder-paypal-button")
    } catch (e) {
      console.error("PayPal render exception:", e)
      buttonsRenderedRef.current = false
    }
  }, [results, isPurchased, isEmailValid, sdkReady, selectedProductId, checkoutEmail])

  if (results) {
    // Show first 3 results, blur the rest if not purchased
    const visibleMatches = isPurchased ? results.matches : results.matches.slice(0, 3)
    const lockedCount = Math.max(0, results.matches.length - 3)

    return (
      <div className="space-y-8">
        {/* Results Header */}
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-extrabold text-slate-900">AI Grant Finder Results</CardTitle>
            <CardDescription className="text-base font-medium text-slate-600">
              Found {results.totalMatches} personalized grant recommendations for your business
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Grant Matches */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold flex items-center text-slate-800">
            <Target className="w-5 h-5 mr-2 text-purple-600" />
            Recommended Grants
          </h3>
          <div className="grid gap-6">
            {visibleMatches.map((match, index) => (
              <Card key={match.grant.id} className="hover:shadow-md transition-all duration-300 border border-slate-100">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-xs">
                          #{index + 1} Match
                        </Badge>
                        <Badge variant="outline" className="font-semibold text-xs">{Math.round(match.matchScore * 100)}% Match</Badge>
                        <Badge variant={match.grant.status === "Active" ? "default" : "secondary"}>
                          {match.grant.status}
                        </Badge>
                      </div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2">{match.grant.name}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed mb-3">{match.grant.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 bg-slate-50 p-4 rounded-xl text-left border border-slate-100">
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Funding Amount</div>
                      <div className="font-extrabold text-emerald-600 text-base">
                        {formatFundingRange(match.grant.fundingMin, match.grant.fundingMax)}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Deadline</div>
                      <div className="font-semibold text-slate-800 text-sm">{match.grant.deadline}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Agency</div>
                      <div className="font-semibold text-slate-800 text-sm truncate">{match.grant.agency}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Region</div>
                      <div className="font-semibold text-slate-800 text-sm">{match.grant.region}</div>
                    </div>
                  </div>

                  <div className="mb-4 text-left">
                    <div className="text-xs text-slate-400 font-bold mb-2 uppercase tracking-wider">Why this matches your business:</div>
                    <div className="space-y-1.5">
                      {match.matchReasons.map((reason, idx) => (
                        <div key={idx} className="flex items-center text-xs text-slate-655 font-medium">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {reason}
                        </div>
                      ))}
                    </div>
                  </div>

                  {isPurchased && (
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold" asChild>
                        <Link href={match.grant.applicationLink} target="_blank" rel="noopener noreferrer">
                          Apply Now <ExternalLink className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                      <Button variant="outline" className="flex-1 bg-transparent text-slate-600">
                        Save for Later
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}

            {/* Blurred Opportunity Lock Screen */}
            {!isPurchased && lockedCount > 0 && (
              <div className="relative border border-dashed border-purple-200 rounded-2xl bg-slate-50/50 p-6 md:p-10 text-center overflow-hidden shadow-2xs">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                    <Lock className="w-5 h-5 text-purple-600" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-800 mb-1.5">
                    Unlock {lockedCount} Additional Matches
                  </h4>
                  <p className="text-xs text-slate-500 max-w-md leading-relaxed mb-6">
                    Based on your profile, we identified regional, federal, and industry-specific grants. Unlock the complete list of matching programs, dynamic deadlines, and direct application links.
                  </p>

                  {/* Benefit-Driven Email Capture */}
                  {!leadSaved ? (
                    <div className="w-full max-w-md bg-white border border-slate-200 rounded-xl p-5 shadow-2xs mb-6 text-left">
                      <h5 className="text-xs font-bold text-slate-800 mb-1.5">
                        Save Your Funding Search &amp; Results
                      </h5>
                      <p className="text-[11px] text-slate-400 mb-4">
                        Save your search so you can return to it anytime. We will also email you a copy of your matched opportunities.
                      </p>
                      <div className="space-y-3">
                        <Input
                          type="email"
                          placeholder="your@business.com"
                          value={checkoutEmail}
                          onChange={(e) => setCheckoutEmail(e.target.value)}
                          className="h-10 bg-white"
                        />
                        {emailValidationError && (
                          <p className="text-[10px] text-red-500">{emailValidationError}</p>
                        )}
                        <Button 
                          onClick={() => {
                            if (!isEmailValid) {
                              setEmailValidationError("Please enter a valid email address.")
                            } else {
                              setEmailValidationError("")
                              setLeadSaved(true)
                            }
                          }}
                          className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs"
                        >
                          Save &amp; Continue →
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl p-6 text-left shadow-xs">
                      
                      {/* Locked preview categories */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                        <div className="border border-slate-100 rounded-xl p-3 bg-slate-50 text-center relative">
                          <Lock className="w-3.5 h-3.5 text-slate-400 absolute top-2 right-2" />
                          <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Federal</span>
                          <span className="text-xs font-bold text-slate-600">3 Matches</span>
                        </div>
                        <div className="border border-slate-100 rounded-xl p-3 bg-slate-50 text-center relative">
                          <Lock className="w-3.5 h-3.5 text-slate-400 absolute top-2 right-2" />
                          <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Provincial</span>
                          <span className="text-xs font-bold text-slate-600">4 Matches</span>
                        </div>
                        <div className="border border-slate-100 rounded-xl p-3 bg-slate-50 text-center relative">
                          <Lock className="w-3.5 h-3.5 text-slate-400 absolute top-2 right-2" />
                          <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Tax Credits</span>
                          <span className="text-xs font-bold text-slate-600">2 Matches</span>
                        </div>
                        <div className="border border-slate-100 rounded-xl p-3 bg-slate-50 text-center relative">
                          <Lock className="w-3.5 h-3.5 text-slate-400 absolute top-2 right-2" />
                          <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Wage Subsidies</span>
                          <span className="text-xs font-bold text-slate-600">3 Matches</span>
                        </div>
                      </div>

                      {/* Estimated Range Opportunity Card */}
                      <div className="bg-emerald-500/10 border border-emerald-500/25 rounded-xl p-4 mb-6">
                        <div className="flex gap-2.5">
                          <DollarSign className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                          <div>
                            <h5 className="text-xs font-bold text-emerald-950 uppercase tracking-wider mb-1">
                              Estimated Funding Opportunity Range
                            </h5>
                            <p className="text-[11px] text-emerald-800 leading-relaxed">
                              Based on your search, multiple programs may be relevant. Your complete report includes estimated funding opportunities, application limits, and eligibility analysis.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Outcome Value Summary Divider */}
                      <div className="border border-purple-100 bg-purple-500/5 rounded-xl p-4 mb-6">
                        <h5 className="text-xs font-bold text-purple-950 uppercase tracking-wider mb-3">
                          Your Complete Funding Strategy Includes:
                        </h5>
                        <ul className="grid md:grid-cols-2 gap-2 text-[11px] text-slate-700 font-medium">
                          <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-purple-600" /> Know which funding programs to prioritize first</li>
                          <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-purple-600" /> Avoid applications that are unlikely to succeed</li>
                          <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-purple-600" /> Reduce preparation time with checklists</li>
                          <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-purple-600" /> Understand combining / stacking rules</li>
                          <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-purple-600" /> Follow a step-by-step filing roadmap</li>
                        </ul>
                      </div>

                      {/* 3-Tier Pricing Grid */}
                      <div className="grid md:grid-cols-3 gap-4 mb-6">
                        {/* 19 Card */}
                        <div 
                          onClick={() => setSelectedProductId('funding-match-report')}
                          className={`border rounded-xl p-4 text-center cursor-pointer transition-all duration-200 ${
                            selectedProductId === 'funding-match-report' 
                              ? 'border-slate-800 bg-slate-50/50 shadow-sm ring-1 ring-slate-800' 
                              : 'border-slate-100 bg-white hover:border-slate-300'
                          }`}
                        >
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Basic</span>
                          <h6 className="text-xs font-bold text-slate-800 mb-1">Match Report</h6>
                          <div className="text-base font-extrabold text-slate-800">$19</div>
                          <span className="text-[10px] text-slate-400">one-time</span>
                          <span className="block mt-3 w-full py-1 bg-slate-100 text-[10px] text-slate-600 font-bold rounded-md">
                            {selectedProductId === 'funding-match-report' ? 'Selected' : 'Select'}
                          </span>
                        </div>

                        {/* 79 Card (Dominant) */}
                        <div 
                          onClick={() => setSelectedProductId('funding-bundle')}
                          className={`border-2 rounded-xl p-4 text-center cursor-pointer relative transition-all duration-200 ${
                            selectedProductId === 'funding-bundle' 
                              ? 'border-indigo-600 bg-indigo-50/10 shadow-md ring-2 ring-indigo-400' 
                              : 'border-indigo-200 bg-white hover:border-indigo-300'
                          }`}
                        >
                          <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full shrink-0">Popular</span>
                          <span className="text-[9px] font-bold text-indigo-500 uppercase tracking-wider block mb-1 mt-1">Recommended</span>
                          <h6 className="text-xs font-bold text-slate-800 mb-1">Complete Bundle</h6>
                          <div className="text-base font-extrabold text-slate-800">$79</div>
                          <span className="text-[10px] text-slate-400">one-time</span>
                          <span className="block mt-3 w-full py-1 bg-indigo-600 text-[10px] text-white font-bold rounded-md">
                            {selectedProductId === 'funding-bundle' ? 'Selected' : 'Select'}
                          </span>
                        </div>

                        {/* 49 Card */}
                        <div 
                          onClick={() => setSelectedProductId('funding-roadmap')}
                          className={`border rounded-xl p-4 text-center cursor-pointer transition-all duration-200 ${
                            selectedProductId === 'funding-roadmap' 
                              ? 'border-emerald-600 bg-slate-50/50 shadow-sm ring-1 ring-emerald-600' 
                              : 'border-slate-100 bg-white hover:border-slate-300'
                          }`}
                        >
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Action Plan</span>
                          <h6 className="text-xs font-bold text-slate-800 mb-1">Roadmap Timeline</h6>
                          <div className="text-base font-extrabold text-slate-800">$49</div>
                          <span className="text-[10px] text-slate-400">one-time</span>
                          <span className="block mt-3 w-full py-1 bg-slate-100 text-[10px] text-slate-600 font-bold rounded-md">
                            {selectedProductId === 'funding-roadmap' ? 'Selected' : 'Select'}
                          </span>
                        </div>
                      </div>

                      {/* Selected product description block */}
                      <div className="bg-slate-50 border border-slate-150 rounded-xl p-4 text-left mb-6 text-xs text-slate-600 font-medium">
                        <span className="font-bold text-slate-800 block mb-1">
                          Unlocking: {selectedProductId === 'funding-bundle' ? 'Complete Funding Bundle ($79)' : selectedProductId === 'funding-roadmap' ? 'Funding Action Plan ($49)' : 'Funding Match Report ($19)'}
                        </span>
                        {selectedProductId === 'funding-bundle' 
                          ? 'This tier unlocks the full PDF report matching all opportunities, Month 1-4 prioritizing timeline checklists, and premium document templates.' 
                          : selectedProductId === 'funding-roadmap' 
                          ? 'This tier unlocks matching opportunities prioritized and scheduled into a Month 1-4 step-by-step timeline.' 
                          : 'This tier unlocks the list of matching opportunities with deadlines, estimated values, and direct links.'}
                      </div>

                      {/* Upgrade Credit Guarantee — Brand Promise */}
                      <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 mb-4">
                        <span className="text-emerald-600 text-lg shrink-0">↑</span>
                        <p className="text-[11px] text-emerald-800 font-medium leading-snug">
                          <span className="font-extrabold text-emerald-700">Upgrade with confidence.</span> Every dollar you spend today is credited toward higher-tier products. <span className="font-extrabold text-emerald-700">You&apos;ll never pay twice.</span>
                        </p>
                      </div>

                      {/* Checkout Action Section */}
                      <div className="border border-slate-200 rounded-xl p-5 shadow-2xs mb-4">
                        <div className="flex items-center gap-2 border-b border-slate-200 pb-2 mb-4">
                          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                          <h5 className="text-[10px] font-bold text-slate-800 uppercase tracking-wider">Secure PayPal Checkout</h5>
                        </div>
                        <div className="min-h-[100px]">
                          {!sdkReady ? (
                            <div className="flex items-center justify-center py-4 gap-2 text-xs text-slate-400 animate-pulse font-medium">
                              <Loader2 className="w-4 h-4 animate-spin text-slate-400" /> Loading secure transaction...
                            </div>
                          ) : (
                            <div id="finder-paypal-button" className="w-full"></div>
                          )}
                          {paymentError && (
                            <p className="text-xs text-red-500 mt-2 font-bold">{paymentError}</p>
                          )}
                        </div>
                        <div className="mt-4 flex items-center justify-center gap-4 text-[10px] text-slate-400 font-semibold">
                          <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> 30-Day Guarantee</span>
                          <span className="flex items-center gap-1">🔒 SSL Secured</span>
                        </div>
                      </div>

                      {/* Secondary Booking Action */}
                      <div className="text-center mt-4">
                        <p className="text-[11px] text-slate-400">
                          Not ready to purchase? <a href="/consultation?source=grant-finder-upsell" className="text-purple-600 font-bold hover:underline">Book a 15-minute funding review.</a>
                        </p>
                      </div>

                    </div>
                  )}

                </div>
              </div>
            )}

          </div>
        </div>

        {/* Start Over Button */}
        {isPurchased && (
          <div className="text-center">
            <Button
              variant="outline"
              onClick={() => {
                setResults(null)
                setFormData({})
                setConsentToPartnerContact(false)
                setLeadSaved(false)
                setIsPurchased(false)
              }}
            >
              Start New Search
            </Button>
          </div>
        )}
      </div>
    )
  }

  return (
    <Card className="shadow-xl">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
        </div>
        <CardTitle className="text-3xl font-bold">AI Grant Finder</CardTitle>
        <CardDescription className="text-lg">Get personalized grant recommendations powered by AI</CardDescription>
      </CardHeader>
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Honeypot field */}
          <div style={{ display: "none" }} aria-hidden="true">
            <input
              type="text"
              name="confirmEmail"
              value={(formData as any).confirmEmail || ""}
              onChange={(e) => updateFormData("confirmEmail" as any, e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* Business Location */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="country" className="text-base font-semibold">
                Country *
              </Label>
              <Select onValueChange={(value) => updateFormData("country", value as "USA" | "Canada")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USA">United States</SelectItem>
                  <SelectItem value="Canada">Canada</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="state" className="text-base font-semibold">
                State/Province *
              </Label>
              <Select onValueChange={(value) => updateFormData("state", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your state/province" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="california">California</SelectItem>
                  <SelectItem value="texas">Texas</SelectItem>
                  <SelectItem value="new-york">New York</SelectItem>
                  <SelectItem value="florida">Florida</SelectItem>
                  <SelectItem value="ontario">Ontario</SelectItem>
                  <SelectItem value="quebec">Quebec</SelectItem>
                  <SelectItem value="alberta">Alberta</SelectItem>
                  <SelectItem value="british-columbia">British Columbia</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Business Details */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="industry" className="text-base font-semibold">
                Industry *
              </Label>
              <Select onValueChange={(value) => updateFormData("industry", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="agriculture">Agriculture</SelectItem>
                  <SelectItem value="energy">Clean Energy</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="services">Professional Services</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="stage" className="text-base font-semibold">
                Business Stage *
              </Label>
              <Select onValueChange={(value) => updateFormData("businessStage", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your business stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="idea">Idea Stage</SelectItem>
                  <SelectItem value="startup">Startup (0-2 years)</SelectItem>
                  <SelectItem value="growth">Growth Stage (2-5 years)</SelectItem>
                  <SelectItem value="established">Established (5+ years)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Funding Details */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-base font-semibold">
                Funding Amount Needed
              </Label>
              <Select onValueChange={(value) => updateFormData("fundingAmount", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select funding range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-25k">Under $25,000</SelectItem>
                  <SelectItem value="25k-100k">$25,000 - $100,000</SelectItem>
                  <SelectItem value="100k-500k">$100,000 - $500,000</SelectItem>
                  <SelectItem value="500k-1m">$500,000 - $1,000,000</SelectItem>
                  <SelectItem value="over-1m">Over $1,000,000</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="purpose" className="text-base font-semibold">
                Funding Purpose
              </Label>
              <Select onValueChange={(value) => updateFormData("fundingPurpose", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select funding purpose" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="research">Research & Development</SelectItem>
                  <SelectItem value="equipment">Equipment & Technology</SelectItem>
                  <SelectItem value="expansion">Business Expansion</SelectItem>
                  <SelectItem value="hiring">Hiring & Training</SelectItem>
                  <SelectItem value="marketing">Marketing & Sales</SelectItem>
                  <SelectItem value="working-capital">Working Capital</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Business Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-base font-semibold">
              Business Description
            </Label>
            <Textarea
              placeholder="Briefly describe your business, products/services, and what makes you unique..."
              className="min-h-[120px]"
              onChange={(e) => updateFormData("businessDescription", e.target.value)}
            />
            <p className="text-sm text-gray-500">
              This helps our AI better understand your business and find more relevant grants.
            </p>
          </div>

          {/* Contact Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base font-semibold">
                Email Address *
              </Label>
              <Input
                type="email"
                placeholder="your@email.com"
                className="h-12"
                onChange={(e) => updateFormData("email", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-base font-semibold">
                Phone Number *
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                className="h-12"
                onChange={(e) => updateFormData("phone", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company" className="text-base font-semibold">
                Company Name
              </Label>
              <Input
                type="text"
                placeholder="Your Company Name"
                className="h-12"
                onChange={(e) => updateFormData("companyName", e.target.value)}
              />
            </div>
          </div>

          <label className="flex gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4 text-left text-sm text-gray-700">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border-gray-300"
              checked={consentToPartnerContact}
              onChange={(event) => setConsentToPartnerContact(event.target.checked)}
            />
            <span>
              {LEAD_CONSENT_TEXT} You can unsubscribe or request deletion at any time.
            </span>
          </label>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <div className="text-center pt-6">
            <Button
              type="submit"
              size="lg"
              disabled={isLoading}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-12 py-4 text-lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Finding Your Grants...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5 mr-2" />
                  Find My Grants
                </>
              )}
            </Button>
            <p className="text-sm text-gray-500 mt-4">Results will be displayed instantly. No spam, ever.</p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
