"use client"

import React, { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { CheckCircle2, ArrowRight, Calendar, Sparkles, Clock, AlertTriangle } from "lucide-react"

export default function ThankYouClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    if (!token) {
      setError("Authorization token is required to access this page.")
      setIsLoading(false)
      const timer = setTimeout(() => router.push("/portfolio"), 3000)
      return () => clearTimeout(timer)
    }

    fetch(`/api/auth/subscriber?token=${token}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.subscriber) {
          const sub = data.subscriber
          
          if (!sub.reportPurchased) {
            setError("The Funding Opportunity Assessment has not been purchased for this profile yet.")
            setTimeout(() => router.push(`/portfolio?token=${token}`), 3000)
            return
          }

          setProfile({
            email: sub.email,
            name: sub.name || "Founder",
            companyName: sub.companyName || "Your Company"
          })
        } else {
          setError(data.error || "Failed to authenticate session.")
          setTimeout(() => router.push("/portfolio"), 3000)
        }
      })
      .catch(err => {
        console.error("Auth error:", err)
        setError("An error occurred during verification.")
        setTimeout(() => router.push("/portfolio"), 3000)
      })
      .finally(() => setIsLoading(false))
  }, [token, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <Clock className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
        <p className="text-slate-600 text-sm font-medium">Preparing your assessment...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 mx-auto">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">Access Restricted</h3>
        <p className="text-slate-600 text-xs max-w-sm">{error}</p>
        <p className="text-[10px] text-slate-400">Redirecting you to the portal...</p>
      </div>
    )
  }

  const reportUrl = `/portfolio/report?token=${token}&ref=thank_you`
  const bookingUrl = `/booking?token=${token}&ref=thank_you`

  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-50 pt-28 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden">
        {/* Ambient background styling */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f080_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f080_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-gradient-to-r from-emerald-500/5 to-indigo-500/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative max-w-xl w-full bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-xl text-center space-y-8">
          
          {/* Congrats Section */}
          <div className="space-y-4">
            <div className="w-16 h-16 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-9 h-9 text-emerald-600" />
            </div>
            
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 block">✓ Assessment Purchased</span>
            <h1 className="text-3xl font-black text-slate-950 tracking-tight">Your report is ready.</h1>
            <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
              Your Funding Opportunity Assessment is fully compiled. You can now view your custom stacking roadmap, qualified programs list, and actions checklist.
            </p>

            <div className="pt-2">
              <button
                onClick={() => router.push(reportUrl)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm py-4 px-8 rounded-xl shadow-lg shadow-emerald-600/10 transition-colors"
              >
                View My Report
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Expert Verification Upsell Section */}
          <div className="bg-slate-50 border border-slate-200/50 rounded-2xl p-6 text-left space-y-4 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl pointer-events-none" />
            
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-indigo-600">
                <Sparkles className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-wider block">Highly Recommended</span>
              </div>
              
              <h3 className="font-extrabold text-base text-slate-950">
                Need expert verification?
              </h3>
              
              <p className="text-xs text-slate-600 leading-relaxed">
                Schedule a 15-minute Funding Strategy Call with our lead analyst to verify matched eligibility criteria, confirm pending application deadlines, and map out your filing waves.
              </p>
            </div>

            <button
              onClick={() => router.push(bookingUrl)}
              className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3.5 px-6 rounded-xl transition-all"
            >
              <Calendar className="w-4 h-4" />
              Book Funding Strategy Call
            </button>
          </div>

        </div>
      </div>
      <Footer />
    </>
  )
}
