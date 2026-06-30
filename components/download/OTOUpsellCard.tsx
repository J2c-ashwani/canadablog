"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { ShieldCheck, Check, DollarSign, Loader2, Sparkles } from "lucide-react"
import Link from "next/link"

interface OTOUpsellCardProps {
  guideName: string
}

export function OTOUpsellCard({ guideName }: OTOUpsellCardProps) {
  const [sdkReady, setSdkReady] = useState(false)
  const [checkoutEmail, setCheckoutEmail] = useState("")
  const [isPurchased, setIsPurchased] = useState(false)
  const [paymentError, setPaymentError] = useState<string | null>(null)
  const [leadSaved, setLeadSaved] = useState(false)
  
  const buttonsRenderedRef = useRef(false)
  const paypalClientId = "AeuWqg4P1NhiSmsyZt2lDqXg4K6Fz4_lV_mU9t_l1K-08lQ_v2n2vG1T_w_R5f2R2"

  const isEmailValid = !!(checkoutEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(checkoutEmail.trim()))

  // Attempt to recover checkout email from sessionStorage or state
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = window.sessionStorage.getItem("fsi_cdp_profile")
      if (stored) {
        try {
          const parsed = JSON.parse(stored)
          if (parsed.email) {
            setCheckoutEmail(parsed.email)
          }
        } catch (e) {}
      }
    }
  }, [])

  // Load PayPal SDK
  useEffect(() => {
    if (isPurchased) return
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
  }, [isPurchased])

  // Render PayPal buttons
  useEffect(() => {
    if (isPurchased || !isEmailValid || !sdkReady || !(window as any).paypal) {
      buttonsRenderedRef.current = false
      return
    }

    if (buttonsRenderedRef.current) return
    buttonsRenderedRef.current = true

    const container = document.getElementById("oto-paypal-button")
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
              email: checkoutEmail,
              event: "download_oto_checkout_started",
              guideName
            })
          }).catch(() => {})

          return actions.order.create({
            purchase_units: [{
              amount: { value: "29.00", currency_code: 'USD' },
              description: `Grant Application Toolkit - OTO Upgrade (${guideName})`
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
                productId: 'funding-toolkit',
                email: checkoutEmail,
                name: checkoutEmail.split("@")[0] || "Founder",
                paypalOrderId: orderId,
                profileData: {
                  province: 'ON',
                  industry: 'other',
                  revenue: 'startup',
                  goal: 'research',
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
                  email: checkoutEmail,
                  event: "download_oto_purchase_success",
                  guideName
                })
              }).catch(() => {})
            } else {
              const errData = await res.json()
              setPaymentError(errData.error || "Failed to record purchase.")
            }
          } catch (e) {
            console.error("OTO Payment capture error:", e)
            setPaymentError("An error occurred during payment capture.")
          }
        },
        onError: (err: any) => {
          console.error("PayPal OTO Error:", err)
          setPaymentError("Secure checkout closed or encountered an error.")
          buttonsRenderedRef.current = false
        }
      }).render("#oto-paypal-button")
    } catch (e) {
      console.error("PayPal OTO render exception:", e)
      buttonsRenderedRef.current = false
    }
  }, [isPurchased, isEmailValid, sdkReady, checkoutEmail, guideName])

  return (
    <Card className="border-2 border-indigo-600 bg-white rounded-2xl shadow-lg overflow-hidden text-left my-8">
      <CardHeader className="bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 text-white p-6 relative">
        <div className="absolute top-3 right-4 bg-indigo-500 text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full">
          Special Subscriber Offer
        </div>
        <CardTitle className="text-xl font-black flex flex-col gap-1 items-start">
          <span className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-400 shrink-0" />
            Everything You Need Before You Submit
          </span>
          <span className="text-indigo-200 text-xs font-semibold uppercase tracking-wider block">
            Complete Application Prep Kit & Implementation Pack
          </span>
        </CardTitle>
        <CardDescription className="text-indigo-150 text-xs mt-1.5 leading-relaxed">
          Avoid starting from a blank page. We provide the structured check-sheets and worksheets built using current program guidance to help reduce preparation time.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-6 md:p-8">
        {isPurchased ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
              <ShieldCheck className="w-8 h-8 text-emerald-600" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">Purchase Confirmed!</h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              The Funding Application Toolkit is being sent to <strong className="text-slate-800">{checkoutEmail}</strong>. You can return to exploring funding options.
            </p>
            <Button className="bg-slate-850 hover:bg-slate-900 text-white font-bold" asChild>
              <Link href="/grants">Continue to Grant Database</Link>
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Left side: Outcomes list */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-850">
                What is included in the pack:
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-650 font-medium">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span><strong>Excel Budget Worksheets</strong>: Pre-built templates to map qualifying staff salaries and expense costs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span><strong>Cash-Flow Projection Model</strong>: Dynamic projection models to forecast how funding alters cash flow.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span><strong>Application Filing Checklist</strong>: Structured checklists built using current program guidance to help avoid missing critical documentation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span><strong>Designed to Help Reduce Prep Time</strong>: Step-by-step submission workflows mapping out required deliverables.</span>
                </li>
              </ul>
            </div>

            {/* Right side: Payment Wall */}
            <div className="border border-slate-100 rounded-xl p-5 bg-slate-50/50 flex flex-col justify-between">
              <div>
                <div className="flex items-baseline gap-1.5 mb-4 justify-center">
                  <span className="text-2xl font-black text-slate-900">$29</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">One-Time Upgrade</span>
                </div>

                {!leadSaved ? (
                  <div className="space-y-3">
                    <Label htmlFor="checkout-email" className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Verify Your Email Address
                    </Label>
                    <Input
                      id="checkout-email"
                      type="email"
                      placeholder="your@business.com"
                      value={checkoutEmail}
                      onChange={(e) => setCheckoutEmail(e.target.value)}
                      className="bg-white text-xs h-9"
                    />
                    <Button 
                      onClick={() => setLeadSaved(true)} 
                      disabled={!isEmailValid}
                      className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs"
                    >
                      Continue to Checkout
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="min-h-[100px]">
                      {!sdkReady ? (
                        <div className="flex items-center justify-center py-4 gap-2 text-xs text-slate-400 animate-pulse font-medium">
                          <Loader2 className="w-4 h-4 animate-spin text-slate-400" /> Loading secure transaction...
                        </div>
                      ) : (
                        <div id="oto-paypal-button" className="w-full"></div>
                      )}
                      {paymentError && (
                        <p className="text-[10px] text-red-500 mt-2 font-bold">{paymentError}</p>
                      )}
                    </div>
                    <div className="flex items-center justify-center gap-4 text-[9px] text-slate-400 font-semibold mt-2">
                      <span className="flex items-center gap-1">🔒 SSL Secured</span>
                      <span className="flex items-center gap-1">🛡️ 30-Day Guarantee</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="text-center mt-4 pt-3 border-t border-slate-100">
                <p className="text-[10px] text-slate-400">
                  Not ready to purchase? <a href="/consultation?source=download-oto-upsell" className="text-indigo-650 font-bold hover:underline">Book a 15-minute review call.</a>
                </p>
              </div>

            </div>

          </div>
        )}
      </CardContent>
    </Card>
  )
}
