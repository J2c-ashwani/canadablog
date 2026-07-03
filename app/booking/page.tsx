import type { Metadata } from "next"
import BookingClient from "./BookingClient"
import { SubscriberRepository } from "@/lib/leads/SubscriberRepository"
import { getAllPurchases } from "@/lib/products/purchase-store"
import { getStrategyRecoveryRecords } from "@/lib/strategy-session/recovery-store"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Lock, ArrowRight } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Schedule Your Funding Eligibility Audit | FSI Digital",
  description: "Schedule your pre-paid 1-on-1 Business Funding Eligibility Audit & Action Plan. Select a date and time for your private Google Meet.",
  robots: "noindex, nofollow",
  alternates: {
    canonical: "https://www.fsidigital.ca/booking",
  },
}

interface PageProps {
  searchParams: Promise<{
    token?: string
    success?: string
    email?: string
    name?: string
    rid?: string
    source?: string
    order?: string
    tier?: string
    price?: string
  }>
}

async function verifyAuditPayment(email?: string, orderId?: string): Promise<boolean> {
  if (!email || !email.includes("@")) {
    return false
  }

  const cleanEmail = email.toLowerCase().trim()
  const cleanOrder = orderId ? orderId.trim() : ""

  // 1. Check Product Purchases Sheet (Authoritative Transaction Ledger)
  try {
    const purchases = await getAllPurchases()
    const match = purchases.find(p => 
      p.email.toLowerCase().trim() === cleanEmail &&
      (cleanOrder === "" || p.paypalOrderId === cleanOrder) &&
      (p.productId === 'strategy-audit' || p.productId === 'strategy-vip' || p.productId === 'funding-roadmap' || p.productId === 'funding-bundle')
    )
    if (match && match.createdAt) {
      const parsedDate = Date.parse(match.createdAt)
      if (!isNaN(parsedDate)) {
        console.log(`[Booking Server Guard] Verified via Product Purchases ledger for ${cleanEmail}`)
        return true
      }
    }
  } catch (err) {
    console.error("[Booking Server Guard] Error checking Product Purchases:", err)
  }

  // 2. Check Strategy Session Recovery Sheet
  try {
    const recoveryRecords = await getStrategyRecoveryRecords()
    const match = recoveryRecords.find(r => 
      r.email.toLowerCase().trim() === cleanEmail &&
      (cleanOrder === "" || r.paypalOrderId === cleanOrder) &&
      r.status === 'paid'
    )
    if (match) {
      console.log(`[Booking Server Guard] Verified via Strategy Session Recovery sheet for ${cleanEmail}`)
      return true
    }
  } catch (err) {
    console.error("[Booking Server Guard] Error checking Strategy Session Recovery:", err)
  }

  // 3. Check CRM Leads Sheet
  try {
    const sub = await SubscriberRepository.getSubscriberByEmail(cleanEmail)
    if (sub) {
      let activity: any = {}
      if (sub.leadActivity && sub.leadActivity !== "N/A" && sub.leadActivity !== "{}") {
        try {
          activity = JSON.parse(sub.leadActivity)
        } catch (e) {}
      }
      
      if (sub.strategyReportPurchased === true || activity.depositPaid === true || activity.auditPurchasedAt) {
        console.log(`[Booking Server Guard] Verified via CRM Leads sheet/leadActivity for ${cleanEmail}`)
        return true
      }
    }
  } catch (err) {
    console.error("[Booking Server Guard] Error checking CRM Leads:", err)
  }

  return false
}

export default async function BookingPage({ searchParams }: PageProps) {
  const params = await searchParams
  const token = params.token

  let prefilledEmail = ""
  let prefilledName = ""

  if (token) {
    try {
      const all = await SubscriberRepository.getAllSubscribers()
      const found = all.find((sub) => sub.loginToken === token)
      if (found) {
        prefilledEmail = found.email
        prefilledName = found.name || ""
      }
    } catch (e) {
      console.error("Failed to resolve booking token server-side:", e)
    }
  }

  const verificationEmail = prefilledEmail || params.email || ""
  const verificationOrder = params.order || ""

  const isVerified = await verifyAuditPayment(verificationEmail, verificationOrder)

  if (!isVerified) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-slate-50 text-slate-700 font-sans antialiased overflow-x-hidden pt-32 pb-20 px-6 selection:bg-indigo-500 selection:text-white relative">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f080_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f080_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-gradient-to-r from-red-500/5 to-indigo-500/5 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative max-w-md mx-auto bg-white border border-slate-200 rounded-3xl p-8 shadow-xl text-center">
            <div className="w-14 h-14 bg-red-50 rounded-2xl border border-red-100 flex items-center justify-center mx-auto mb-6 shadow-xs">
              <Lock className="w-6 h-6 text-red-650" />
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight mb-2">
              Pre-Paid Booking Access Only
            </h1>
            <p className="text-xs text-slate-500 leading-relaxed mb-6">
              We could not verify an active Funding Strategy Audit purchase for {params.email ? <strong className="text-slate-800">{params.email}</strong> : "this account"}. Booking is restricted to verified purchasers.
            </p>

            {/* Re-verification manual entry form */}
            <form action="/booking" method="GET" className="space-y-4 text-left border-t border-slate-100 pt-6 mb-6">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Registered Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  defaultValue={params.email || ""}
                  placeholder="you@company.com" 
                  className="w-full px-3 py-2 text-sm text-slate-800 bg-white border border-slate-250 rounded-lg focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">PayPal Order ID (Optional)</label>
                <input 
                  type="text" 
                  name="order"
                  defaultValue={params.order || ""}
                  placeholder="e.g. 5UR12345..." 
                  className="w-full px-3 py-2 text-sm text-slate-800 bg-white border border-slate-250 rounded-lg focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-indigo-650 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                Verify Purchase & Unlock Booking →
              </button>
            </form>

            <div className="space-y-3">
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/50 text-[11px] text-slate-500 leading-relaxed">
                Have you already completed checkout? Enter your PayPal registered email above or check your email receipt for a direct scheduling link.
              </div>
              
              <Link 
                href={`/audit?email=${encodeURIComponent(verificationEmail)}&name=${encodeURIComponent(prefilledName)}&source=booking_gate`}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-1"
              >
                Order Funding Strategy Audit ($199) <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <BookingClient 
      prefilledEmail={verificationEmail} 
      prefilledName={prefilledName} 
    />
  )
}
