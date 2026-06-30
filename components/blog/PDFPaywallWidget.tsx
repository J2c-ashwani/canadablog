"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { ShieldCheck, Check, Mail, Lock, CheckCircle, Loader2, Sparkles, Download } from "lucide-react"
import Link from "next/link"

interface PDFPaywallWidgetProps {
  guideName: string
  guideSlug: string
}

export function PDFPaywallWidget({ guideName, guideSlug }: PDFPaywallWidgetProps) {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  
  const [leadSaved, setLeadSaved] = useState(false)
  const [sdkReady, setSdkReady] = useState(false)
  const [isPurchased, setIsPurchased] = useState(false)
  const [paymentError, setPaymentError] = useState<string | null>(null)
  
  const buttonsRenderedRef = useRef(false)
  const paypalClientId = "AeuWqg4P1NhiSmsyZt2lDqXg4K6Fz4_lV_mU9t_l1K-08lQ_v2n2vG1T_w_R5f2R2"

  const isEmailValid = !!(email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))

  // Attempt to recover checkout email from sessionStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = window.sessionStorage.getItem("fsi_cdp_profile")
      if (stored) {
        try {
          const parsed = JSON.parse(stored)
          if (parsed.email) {
            setEmail(parsed.email)
          }
        } catch (e) {}
      }
    }
  }, [])

  const handleSaveLeadDraft = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isEmailValid) {
      setError("Please enter a valid work email address.")
      return
    }
    setError("")
    setIsSubmitting(true)

    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name: "Guide Reader",
          country: "Canada",
          region: "ON",
          industry: "other",
          companySize: "10-49",
          fundingInterests: ["Grants"]
        })
      })

      setLeadSaved(true)

      // Telemetry: lead captured
      fetch("/api/subscriber/track-activity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          event: "guide_page_lead_captured",
          guideSlug
        })
      }).catch(() => {})

    } catch (err) {
      console.error("Failed to register lead draft:", err)
      setError("Failed to register email. Please check your connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Load PayPal SDK
  useEffect(() => {
    if (!leadSaved || isPurchased) return
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
  }, [leadSaved, isPurchased])

  // Render PayPal buttons
  useEffect(() => {
    if (!leadSaved || isPurchased || !isEmailValid || !sdkReady || !(window as any).paypal) {
      buttonsRenderedRef.current = false
      return
    }

    if (buttonsRenderedRef.current) return
    buttonsRenderedRef.current = true

    const container = document.getElementById("guide-paypal-button")
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
              event: "guide_companion_checkout_started",
              guideSlug
            })
          }).catch(() => {})

          return actions.order.create({
            purchase_units: [{
              amount: { value: "9.00", currency_code: 'USD' },
              description: `Application Companion Kit - ${guideName}`
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
                productId: 'guide-companion-kit',
                email: email,
                name: "Guide Reader",
                paypalOrderId: orderId,
                profileData: {
                  province: 'ON',
                  industry: 'other',
                  revenue: '10-49',
                  goal: 'execute',
                },
                attribution: {
                  landingPage: window.location.pathname,
                  referrer: document.referrer || 'direct',
                }
              })
            })

            if (res.ok) {
              setIsPurchased(true)

              // Telemetry
              fetch("/api/subscriber/track-activity", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  email,
                  event: "guide_companion_purchase_success",
                  guideSlug
                })
              }).catch(() => {})
            } else {
              const errData = await res.json()
              setPaymentError(errData.error || "Failed to record purchase.")
            }
          } catch (e) {
            console.error("Companion Kit Payment capture error:", e)
            setPaymentError("An error occurred during payment capture.")
          }
        },
        onError: (err: any) => {
          console.error("PayPal Companion Kit Error:", err)
          setPaymentError("Secure checkout closed or encountered an error.")
          buttonsRenderedRef.current = false
        }
      }).render("#guide-paypal-button")
    } catch (e) {
      console.error("PayPal Companion Kit render exception:", e)
      buttonsRenderedRef.current = false
    }
  }, [leadSaved, isPurchased, isEmailValid, sdkReady, guideName, guideSlug])

  return (
    <Card className="border-2 border-emerald-600 bg-white rounded-2xl shadow-md overflow-hidden text-left my-8">
      <div className="bg-gradient-to-r from-emerald-900 to-teal-950 text-white p-6 relative">
        <div className="absolute top-3 right-4 bg-emerald-500 text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full">
          Implementation Pack
        </div>
        <h3 className="text-lg font-black flex flex-col gap-1 items-start">
          <span className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-400 shrink-0" />
            Prepare Your Application Faster
          </span>
          <span className="text-emerald-200 text-xs font-semibold uppercase tracking-wider block">
            Application Companion Kit &amp; Implementation Pack
          </span>
        </h3>
        <p className="text-emerald-100 text-xs mt-1.5 leading-relaxed">
          Avoid starting from a blank page. Skip the trial-and-error with structured checklists, worksheets, and templates designed to help reduce preparation time.
        </p>
      </div>

      <CardContent className="p-6">
        {isPurchased ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-emerald-600" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">Companion Kit Ready!</h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              The {guideName} Implementation Pack is being sent to <strong className="text-slate-800">{email}</strong>. Download link is active in your inbox.
            </p>
            <Button className="bg-slate-850 hover:bg-slate-900 text-white font-bold" asChild>
              <a href="/grants">Back to Database</a>
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Left Column: What's included */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-850 uppercase tracking-wide">
                What is included in the pack:
              </h4>
              <ul className="space-y-2 text-xs text-slate-650 font-medium">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Application Checklists</strong>: Structured checklists built using current program guidance.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Excel Budget Worksheets</strong>: Worksheets to map qualifying staff salaries and expense costs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Submission Playbook</strong>: Step-by-step guidance designed to help reduce preparation time.</span>
                </li>
              </ul>
            </div>

            {/* Right Column: Checkout Gate */}
            <div className="border border-slate-100 rounded-xl p-4 bg-slate-50/50 flex flex-col justify-between">
              <div>
                <div className="flex items-baseline gap-1 mb-3 justify-center">
                  <span className="text-xl font-black text-slate-900">$9</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">One-Time Download</span>
                </div>

                {!leadSaved ? (
                  <form onSubmit={handleSaveLeadDraft} className="space-y-3">
                    {error && (
                      <p className="text-[10px] text-red-500 font-bold text-center">{error}</p>
                    )}
                    <div className="space-y-1">
                      <Label htmlFor="guide-email" className="text-[9px] font-bold text-slate-450 uppercase tracking-wider">
                        Work Email Address
                      </Label>
                      <Input
                        id="guide-email"
                        type="email"
                        placeholder="your@business.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-white text-xs h-9"
                      />
                    </div>
                    <Button 
                      type="submit"
                      disabled={isSubmitting || !isEmailValid}
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
                    >
                      {isSubmitting ? "Saving Email..." : "Continue to Checkout"}
                    </Button>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="min-h-[100px]">
                      {!sdkReady ? (
                        <div className="flex items-center justify-center py-4 gap-2 text-xs text-slate-400 animate-pulse font-medium">
                          <Loader2 className="w-4 h-4 animate-spin text-slate-400" /> Loading secure transaction...
                        </div>
                      ) : (
                        <div id="guide-paypal-button" className="w-full"></div>
                      )}
                      {paymentError && (
                        <p className="text-[10px] text-red-500 mt-2 font-bold">{paymentError}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="text-center mt-3 pt-2 border-t border-slate-100">
                <p className="text-[10px] text-slate-400">
                  Prefer free expert advice? <a href="/contact?service=grant-expert-help" className="text-emerald-700 font-bold hover:underline">Schedule free call.</a>
                </p>
              </div>

            </div>

          </div>
        )}
      </CardContent>
    </Card>
  )
}
