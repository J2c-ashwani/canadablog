"use client"

import React, { useState, useEffect, useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { 
  Sparkles, 
  Printer, 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  Lock, 
  TrendingUp, 
  AlertTriangle, 
  ShieldAlert, 
  BookOpen,
  Building,
  Globe,
  Users,
  Compass,
  FileText
} from "lucide-react"
import { getAllPrograms, type ProgramDetails } from "@/lib/data/programs"
import { MatchScoreEngine, type MatchResult } from "@/lib/leads/MatchScoreEngine"
import { PortfolioScoreEngine } from "@/lib/leads/PortfolioScoreEngine"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function ReportClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const [profile, setProfile] = useState<any>(null)
  const [reportPurchased, setReportPurchased] = useState(false)
  const [readinessScore, setReadinessScore] = useState(70)
  const [readinessBand, setReadinessBand] = useState("Good Candidate")

  const allPrograms = useMemo(() => getAllPrograms(), [])

  // 1. Fetch Subscriber Details
  useEffect(() => {
    if (!token) {
      setError("Authorization token is required to access your report.")
      setIsLoading(false)
      // Redirect back to portfolio after 3 seconds
      const timer = setTimeout(() => router.push("/portfolio"), 3000)
      return () => clearTimeout(timer)
    }

    fetch(`/api/auth/subscriber?token=${token}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.subscriber) {
          const sub = data.subscriber
          
          // Allow admin view or require purchased status
          const hasPurchased = !!sub.reportPurchased
          setReportPurchased(hasPurchased)
          setReadinessScore(sub.readinessScore || 70)
          setReadinessBand(sub.readinessBand || "Good Candidate")

          if (!hasPurchased) {
            setError("Access denied. The Executive Assessment Report has not been purchased for this profile yet.")
            // Redirect back to portfolio to complete purchase
            setTimeout(() => router.push(`/portfolio?token=${token}`), 4000)
            return
          }

          setProfile({
            email: sub.email,
            name: sub.name || "Founder",
            country: sub.country || "Canada",
            region: sub.region || "ON",
            companySize: sub.companySize || "1-9",
            industry: sub.industry || "technology",
            companyName: sub.companyName || "Your Company",
            website: sub.website || "",
            reportTransactionId: sub.reportTransactionId || "",
            fundingInterests: sub.fundingInterests || []
          })
        } else {
          setError(data.error || "Failed to authenticate report access.")
          setTimeout(() => router.push("/portfolio"), 3000)
        }
      })
      .catch(err => {
        console.error("Auth error:", err)
        setError("An error occurred during verification.")
      })
      .finally(() => setIsLoading(false))
  }, [token, router])

  // 2. Run Match engine on profile
  const { eligibleMatches, stackingRange } = useMemo(() => {
    if (!profile) return { eligibleMatches: [], stackingRange: { min: 0, max: 0, formatted: "$0" } }

    const eligible: { program: ProgramDetails; match: MatchResult }[] = []
    const programSlugs: string[] = []

    allPrograms.forEach(prog => {
      const matchRes = MatchScoreEngine.calculateMatch(prog, {
        country: profile.country,
        region: profile.region,
        companySize: profile.companySize,
        industry: profile.industry,
        fundingInterests: []
      })

      if (matchRes.status === "Eligible") {
        eligible.push({ program: prog, match: matchRes })
        programSlugs.push(prog.slug)
      }
    })

    // Sort by score descending
    eligible.sort((a, b) => b.match.score - a.match.score)

    const range = PortfolioScoreEngine.calculateStackingRange(programSlugs, allPrograms)

    return {
      eligibleMatches: eligible,
      stackingRange: range
    }
  }, [profile, allPrograms])

  const topMatches = useMemo(() => eligibleMatches.slice(0, 5), [eligibleMatches])

  const bookingUrl = useMemo(() => {
    if (!profile) return "/consultation"
    const queryParams = new URLSearchParams()
    queryParams.set("email", profile.email)
    queryParams.set("name", profile.name)
    queryParams.set("region", profile.region)
    queryParams.set("size", profile.companySize)
    queryParams.set("industry", profile.industry)
    queryParams.set("score", String(readinessScore))
    queryParams.set("range", stackingRange.formatted)
    queryParams.set("ref", "report_upsell")
    return `/consultation?${queryParams.toString()}`
  }, [profile, readinessScore, stackingRange])

  // Print function
  const handlePrint = () => {
    window.print()
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <Clock className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
        <p className="text-slate-600 text-sm font-medium">Loading Executive Assessment Report...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">Access Restricted</h3>
        <p className="text-slate-600 text-xs max-w-sm">{error}</p>
        <p className="text-[10px] text-slate-400">Redirecting you to the portal...</p>
      </div>
    )
  }

  if (!profile) return null

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8 print:bg-white print:p-0 print:py-0 print:my-0">
      
      {/* Print Stylesheet Hook */}
      <style jsx global>{`
        @media print {
          body {
            background-color: white !important;
            color: black !important;
            font-size: 11pt !important;
          }
          .no-print {
            display: none !important;
          }
          .print-break-before {
            page-break-before: always !important;
          }
          .print-break-inside-avoid {
            page-break-inside: avoid !important;
          }
          .print-card {
            border: 1px solid #e2e8f0 !important;
            box-shadow: none !important;
            background: white !important;
            padding: 0 !important;
          }
          .print-header {
            border-bottom: 2px solid #0f172a !important;
            padding-bottom: 12px !important;
          }
        }
      `}</style>

      {/* Control Top Bar (No-Print) */}
      <div className="no-print flex items-center justify-between bg-white border border-slate-200 p-4 rounded-2xl shadow-xs">
        <button
          onClick={() => router.push(`/portfolio?token=${token}`)}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Dashboard
        </button>

        <div className="flex gap-3">
          <Button
            onClick={handlePrint}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2 px-4 rounded-xl flex items-center gap-1.5 shadow-xs"
          >
            <Printer className="w-4 h-4" />
            Print / Save PDF
          </Button>
        </div>
      </div>

      {/* Main Printable Document */}
      <div className="bg-white border border-slate-200 rounded-3xl shadow-xl p-8 sm:p-12 space-y-10 print:border-none print:shadow-none print:p-0 print:space-y-8">
        
        {/* Cover Header */}
        <div className="border-b-2 border-slate-900 pb-6 print-header flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 block">FSI Digital Advisory Services</span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Executive Funding Assessment</h1>
            <p className="text-[10px] text-slate-400">Report Ref: {profile.reportTransactionId || "FSI-EVAL-ACTIVE"}</p>
          </div>
          <div className="text-right sm:text-right shrink-0">
            <span className="text-lg font-black text-slate-900">FSI <span className="text-emerald-600">Digital</span></span>
            <span className="block text-[9px] text-slate-400 font-bold uppercase tracking-wider">funding intelligence</span>
          </div>
        </div>

        {/* Firmographic Metadata Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-slate-50 border border-slate-100 rounded-2xl print-card print:bg-slate-50/50">
          <div className="space-y-1">
            <span className="text-[9px] font-bold text-slate-400 uppercase block">Company Name</span>
            <span className="text-xs font-black text-slate-900 flex items-center gap-1">
              <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              {profile.companyName}
            </span>
          </div>
          <div className="space-y-1">
            <span className="text-[9px] font-bold text-slate-400 uppercase block">Business Website</span>
            <span className="text-xs font-black text-slate-900 flex items-center gap-1 truncate max-w-[160px]">
              <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              {profile.website || "Not provided"}
            </span>
          </div>
          <div className="space-y-1">
            <span className="text-[9px] font-bold text-slate-400 uppercase block">Location & Scale</span>
            <span className="text-xs font-black text-slate-900 flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              {profile.region}, {profile.country} ({profile.companySize} FTE)
            </span>
          </div>
          <div className="space-y-1">
            <span className="text-[9px] font-bold text-slate-400 uppercase block">Assessment Date</span>
            <span className="text-xs font-black text-slate-900 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              {new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
        </div>

        {/* Executive Overview Row: Score Card & Benchmark */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch print-break-inside-avoid">
          {/* Readiness Score Card */}
          <div className="md:col-span-5 border border-slate-200 p-6 rounded-2xl flex flex-col justify-between items-center text-center bg-white print-card">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Funding Readiness Index</span>
              <div className="my-4 relative flex items-center justify-center">
                <svg className="w-24 h-24 transform -rotate-90">
                  <circle cx="48" cy="48" r="40" stroke="#f1f5f9" strokeWidth="8" fill="transparent" />
                  <circle 
                    cx="48" 
                    cy="48" 
                    r="40" 
                    stroke="#059669" 
                    strokeWidth="8" 
                    fill="transparent" 
                    strokeDasharray={251.2} 
                    strokeDashoffset={251.2 - (readinessScore / 100) * 251.2} 
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-2xl font-black text-slate-900">{readinessScore}</span>
                  <span className="text-[8px] font-bold text-slate-400 uppercase">Score</span>
                </div>
              </div>
              <Badge className="bg-emerald-50 text-emerald-800 border-emerald-200 font-extrabold uppercase py-0.5 px-3 tracking-wider text-[9px]">
                {readinessBand}
              </Badge>
            </div>
            <p className="text-[10px] text-slate-400 mt-3">Readiness computed using corporate location, incorporation status, and strategic activities.</p>
          </div>

          {/* Stacking Yield Summary Card */}
          <div className="md:col-span-7 bg-slate-900 text-white p-6 rounded-2xl flex flex-col justify-between print-card print:bg-slate-900">
            <div className="space-y-1">
              <span className="text-emerald-400 text-[10px] font-black uppercase tracking-wider block">Executive Stacking Summary</span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">{stackingRange.formatted}</h3>
              <p className="text-slate-300 text-xs leading-relaxed font-semibold">
                Estimated Capital Yield Potential
              </p>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed mt-4">
              This range is calculated by aggregate modeling of eligible federal, provincial, and regional capital intakes. Program stacking maximizes yield with zero equity dilution.
            </p>
            <div className="pt-3 border-t border-slate-800 mt-4 text-[9px] text-slate-500 flex justify-between">
              <span>Programs Evaluated: {allPrograms.length}</span>
              <span>Potential Matches: {eligibleMatches.length}</span>
            </div>
          </div>
        </div>

        {/* Section 1: Top Opportunities Stream */}
        <div className="space-y-4 print-break-before print-break-inside-avoid">
          <div className="border-b border-slate-200 pb-2 flex items-center gap-2">
            <Compass className="w-4.5 h-4.5 text-emerald-600" />
            <h2 className="text-lg font-black text-slate-900 tracking-tight">1. Qualified Intakes Shortlist</h2>
          </div>
          <p className="text-xs text-slate-500">
            The following programs represent the highest strategic fit for your profile. Program parameters are marked as <strong>Potential Match</strong> or <strong>Likely Eligible</strong> based on matching calculations.
          </p>

          <div className="space-y-3">
            {topMatches.map((item, idx) => {
              const priorityData = PortfolioScoreEngine.getProgramPriority(item.program.slug)
              return (
                <div key={item.program.slug} className="p-4 border border-slate-100 bg-slate-50/40 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 print-card print:bg-white">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">{item.program.fundingType}</span>
                      <span className="text-[8px] bg-emerald-50 border border-emerald-200 text-emerald-800 font-extrabold px-2 py-0.5 rounded-full uppercase">
                        Potential Match
                      </span>
                    </div>
                    <h3 className="font-extrabold text-sm text-slate-900">{item.program.name}</h3>
                    <p className="text-[10px] text-slate-500 line-clamp-2">{item.program.description}</p>
                  </div>
                  <div className="text-left sm:text-right shrink-0">
                    <span className="text-[8px] font-bold text-slate-400 uppercase block">Typical Yield</span>
                    <span className="text-xs font-black text-slate-900">{item.program.fundingAmount.split(" (")[0]}</span>
                    <span className="block text-[9px] font-extrabold text-indigo-600 mt-0.5 italic">{item.match.fitBand} Match</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Section 2: Priority Roadmap (Page Break for Print) */}
        <div className="space-y-4 print-break-before print-break-inside-avoid">
          <div className="border-b border-slate-200 pb-2 flex items-center gap-2">
            <TrendingUp className="w-4.5 h-4.5 text-emerald-600" />
            <h2 className="text-lg font-black text-slate-900 tracking-tight">2. Stacking & Intake Roadmap</h2>
          </div>
          <p className="text-xs text-slate-500">
            Intake sequencing is critical. We recommend filing applications in the following order to maximize stacking yields.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["Apply First", "Apply Second", "Apply Third"].map((priority, index) => {
              const matchesForPriority = eligibleMatches.filter(item => {
                const pData = PortfolioScoreEngine.getProgramPriority(item.program.slug)
                return pData.priority === priority
              }).slice(0, 2)

              return (
                <div key={priority} className="p-5 border border-slate-200 rounded-2xl bg-white flex flex-col justify-between space-y-4 print-card">
                  <div className="space-y-3">
                    <span className={`inline-block text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                      index === 0 ? "bg-blue-100 text-blue-800" : index === 1 ? "bg-emerald-100 text-emerald-800" : "bg-purple-100 text-purple-800"
                    }`}>
                      {priority}
                    </span>
                    
                    <ul className="space-y-2">
                      {matchesForPriority.length === 0 ? (
                        <li className="text-[10px] text-slate-400 italic">No programs in this stream.</li>
                      ) : (
                        matchesForPriority.map(item => (
                          <li key={item.program.slug} className="space-y-0.5">
                            <span className="block text-xs font-extrabold text-slate-900 truncate">{item.program.name}</span>
                            <span className="block text-[9px] text-slate-400">Yield: {item.program.fundingAmount.split(" (")[0]}</span>
                          </li>
                        ))
                      )}
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-slate-100 text-[9px] text-slate-500 leading-normal">
                    {index === 0 && "Intakes that are open now, have fast review periods, and low capital requirements."}
                    {index === 1 && "Intakes with medium intake cycles. Best stacked on top of first-wave grants."}
                    {index === 2 && "Larger capital projects and tax credit streams filed at fiscal year-end."}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Section 3: Action Checklist */}
        <div className="space-y-4 print-break-before print-break-inside-avoid">
          <div className="border-b border-slate-200 pb-2 flex items-center gap-2">
            <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600" />
            <h2 className="text-lg font-black text-slate-900 tracking-tight">3. Next Actions Checklist</h2>
          </div>
          <p className="text-xs text-slate-500">
            Execute these pre-qualification actions to prepare your company for filing streams.
          </p>

          <div className="space-y-3">
            {[
              "Audit entity details and confirm incorporation papers are in order.",
              "Document technical parameters of R&D activities (SR&ED, IRAP streams).",
              "Map out international marketing or export expense projections.",
              "Verify active payroll status for employee hiring subsidies.",
              "Coordinate application submission timing with an advisor review briefing."
            ].map((text, idx) => (
              <div key={idx} className="flex gap-3 items-start p-3 bg-slate-50 border border-slate-100 rounded-xl print-card print:bg-white">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <span className="text-xs font-bold text-slate-700 leading-relaxed">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Verification Upsell Card (No-Print) */}
        <div className="no-print pt-6 border-t border-slate-200 print-break-inside-avoid">
          <Card className="border border-indigo-200 bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-950 text-white shadow-xl rounded-2xl p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <div className="flex items-center gap-1.5 justify-center md:justify-start">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 text-[10px] font-black uppercase tracking-wider block">Verification Required</span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-white">
                  Schedule Your Funding Audit & Strategy Session
                </h3>
                <p className="text-slate-300 text-xs max-w-xl leading-relaxed">
                  Have a Senior Funding Analyst verify your matched programs, check eligibility restrictions, and compile your final filing plan. 100% money-back guarantee.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
                <button
                  onClick={() => router.push(bookingUrl)}
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs px-5 py-4 rounded-xl shadow-lg transition-colors text-center"
                >
                  Book Audit ($199)
                </button>
                <button
                  onClick={() => router.push(`${bookingUrl}&type=vip`)}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs px-5 py-4 rounded-xl shadow-lg transition-colors text-center border border-indigo-400/20"
                >
                  Book VIP Blueprint ($499)
                </button>
              </div>
            </div>
          </Card>
        </div>

        {/* Advisory Disclosure (Mandatory) */}
        <div className="pt-6 border-t border-slate-200 text-[9px] text-slate-400 leading-relaxed print-break-inside-avoid">
          <strong>Advisory Disclaimer:</strong> FSI Digital is an independent private consultancy. We do not represent, nor are we associated with or endorsed by, the Canada Revenue Agency (CRA), National Research Council (NRC), Small Business Administration (SBA), or any government funding body. Eligibility statements are calculated modeling based on typical applicant requirements and do not constitute legal, financial, or program guarantees.
        </div>

      </div>
    </div>
  )
}
