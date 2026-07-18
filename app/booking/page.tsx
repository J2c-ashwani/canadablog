import type { Metadata } from "next"
import BookingClient from "./BookingClient"
import { SubscriberRepository } from "@/lib/leads/SubscriberRepository"
import { hasActiveEntitlement } from '@/lib/products/entitlements'
import { isLoginToken } from '@/lib/auth/subscriber-tokens'
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

async function verifyAuditPayment(email?: string, token?: string): Promise<boolean> {
  if (!email || !token) return false
  const subscriber = await SubscriberRepository.getSubscriberByEmail(email)
  if (!subscriber || !isLoginToken(token, subscriber.loginToken)) return false
  return hasActiveEntitlement(subscriber.email, 'strategy-audit-booking')
}

export default async function BookingPage({ searchParams }: PageProps) {
  const params = await searchParams
  const token = params.token

  let prefilledEmail = ""
  let prefilledName = ""

  if (token) {
    try {
      const all = await SubscriberRepository.getAllSubscribers()
      const found = all.find((sub) => isLoginToken(token, sub.loginToken))
      if (found) {
        prefilledEmail = found.email
        prefilledName = found.name || ""
      }
    } catch (e) {
      console.error("Failed to resolve booking token server-side:", e)
    }
  }

  const verificationEmail = prefilledEmail

  const isVerified = await verifyAuditPayment(verificationEmail, token)

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
              We could not verify an active Strategy Audit entitlement for this signed-in account. Booking is restricted to verified purchasers.
            </p>

            <div className="space-y-3">
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/50 text-[11px] text-slate-500 leading-relaxed">
                Have you already completed checkout? Open the secure account link in your purchase confirmation email.
              </div>
              
              <Link 
                href={`/audit?email=${encodeURIComponent(params.email || '')}&name=${encodeURIComponent(prefilledName)}&source=booking_gate`}
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
      token={token || ""}
    />
  )
}
