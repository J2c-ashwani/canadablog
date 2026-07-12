"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Download, ArrowRight, ShieldCheck, Mail } from "lucide-react"
import Link from "next/link"

function ThankYouContent() {
  const searchParams = useSearchParams()
  const guideName = searchParams.get("guide") || "Government Grants Guide"
  
  // Set fallback PDF download link
  const downloadLink = "https://www.fsidigital.ca/lead-magnets/ultimate-grant-guide-2026.pdf"

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />

      <main className="flex-1 py-16 flex items-center justify-center">
        <div className="w-full max-w-2xl px-4">
          <Card className="border border-slate-200/80 bg-white text-slate-900 shadow-xl rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-emerald-500/5 to-teal-500/5 p-8 text-center border-b border-slate-100">
              <div className="mx-auto w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="h-8 w-8 text-emerald-600" />
              </div>
              <CardTitle className="text-2xl font-bold tracking-tight">Your Guide is Ready!</CardTitle>
              <CardDescription className="text-slate-500 text-sm mt-1.5">
                Thank you for downloading the <span className="font-semibold text-slate-800">{guideName}</span>
              </CardDescription>
            </CardHeader>

            <CardContent className="p-8 space-y-8">
              {/* Delivery Alert */}
              <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Check your inbox</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    We have dispatched a copy of this guide to your registered email address. If you do not see it within 2 minutes, please verify your spam or promotions folder.
                  </p>
                </div>
              </div>

              {/* Direct Download Action */}
              <div className="text-center py-2 space-y-4">
                <p className="text-xs text-slate-500">
                  Can't wait? Click below to download the guide directly in your browser:
                </p>
                <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-6 rounded-xl text-sm transition-all shadow-md inline-flex items-center gap-2">
                  <a href={downloadLink} target="_blank" rel="noopener noreferrer">
                    <Download className="h-4 w-4" />
                    Download PDF Guide
                  </a>
                </Button>
              </div>

              <hr className="border-slate-100" />

              {/* Next Step / Stacking Promo */}
              <div className="bg-emerald-950/5 border border-emerald-500/20 rounded-2xl p-6 text-center space-y-4">
                <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white border-none font-bold text-[10px] tracking-wide uppercase px-2.5 py-0.5">
                  Recommended Next Step
                </Badge>
                <h3 className="font-bold text-slate-900 text-lg leading-tight">
                  Calculate Your Small Business Grant Match in 60 Seconds
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed max-w-md mx-auto">
                  Now that you have the guide, let our interactive calculator scan $3.2B+ in active federal and regional programs to identify your exact funding opportunities.
                </p>
                <div className="pt-2">
                  <Button asChild className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-5 rounded-xl text-xs inline-flex items-center gap-2">
                    <Link href="/calculator">
                      Start Free Eligibility Assessment
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>
                <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 pt-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                  100% Free & Secure Assessment
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <ThankYouContent />
    </Suspense>
  )
}
