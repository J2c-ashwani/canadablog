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
  const [showExitIntent, setShowExitIntent] = useState(false)

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
            fundingInterests: sub.fundingInterests || [],
            businessStage: sub.businessStage || "",
            fundingPurpose: sub.fundingPurpose || ""
          })
          
          // Track report viewed
          fetch("/api/subscriber/track-activity", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: sub.email,
              event: "report_viewed",
              source: sessionStorage.getItem("fsi_attribution_source") || undefined
            })
          }).catch(err => console.error("Failed to track report viewed:", err))
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

  useEffect(() => {
    if (isLoading || error || !profile) return

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 10) {
        const shown = sessionStorage.getItem("fsi_exit_intent_shown") === "true"
        if (!shown) {
          setShowExitIntent(true)
          sessionStorage.setItem("fsi_exit_intent_shown", "true")
        }
      }
    }

    document.addEventListener("mouseleave", handleMouseLeave)
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [isLoading, error, profile])

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

  // Derived screener parameters from profile fields saved in Google Sheets
  const derivedFlags = useMemo(() => {
    if (!profile) return { isIncorporated: true, hasRd: true, hasHiring: true, hasExporting: true }
    
    const isIncorporated = profile.businessStage !== "idea"
    const hasRd = profile.fundingPurpose === "research" || profile.fundingInterests?.includes("sred-tax-credit") || profile.fundingInterests?.includes("irap-grant")
    const hasExporting = profile.fundingInterests?.includes("canexport") || profile.industry === "technology" || profile.industry === "manufacturing"
    const hasHiring = profile.companySize !== "500+"
    
    return { isIncorporated, hasRd, hasHiring, hasExporting }
  }, [profile])

  // Program name formatting helper
  const getShortProgramName = (fullName: string) => {
    const match = fullName.match(/\(([^)]+)\)/);
    if (match && match[1]) {
      return match[1];
    }
    if (fullName.includes("CanExport")) return "CanExport";
    if (fullName.includes("Sustainable Canadian Agricultural")) return "Sustainable Cap (Agri)";
    if (fullName.includes("Alberta Innovates")) return "Alberta Innovates";
    if (fullName.includes("Quebec R&D")) return "Quebec R&D Tax Credit";
    if (fullName.includes("Mitacs")) return "Mitacs";
    return fullName.replace(" Program", "").replace(" Grant", "").replace(" Tax Credit", "").replace(" SMEs", "");
  };

  // Funding Risks selector for Section 5
  const fundingRisks = useMemo(() => {
    if (!profile) return []
    const risks: { title: string; desc: string }[] = []
    
    if (!derivedFlags.isIncorporated) {
      risks.push({
        title: "Entity Structure Limitation",
        desc: "The business is not incorporated as a Canadian CCPC, restricting entry to primary innovation grants."
      })
    }
    if (!derivedFlags.hasRd) {
      risks.push({
        title: "No Documented R&D Process",
        desc: "Active technical operations and logs are required to verify eligibility for SR&ED and IRAP streams."
      })
    }
    if (!derivedFlags.hasExporting) {
      risks.push({
        title: "No Export Forecast",
        desc: "Missing international sales projections excludes your profile from CanExport and market expansion funding."
      })
    }
    if (profile.companySize === "1-9") {
      risks.push({
        title: "Small Team Size Constraints",
        desc: "Fewer than 10 FTEs limits co-investment capacity verification on larger wage and development grants."
      })
    }
    
    // Fallback if they have perfect parameters
    if (risks.length === 0) {
      risks.push({
        title: "Filing Sequence Risk",
        desc: "Submitting applications out of order could cause co-investment mismatches across stacked streams."
      })
    }
    
    return risks.slice(0, 3)
  }, [profile, derivedFlags])

  const excludedPrograms = useMemo(() => {
    if (!profile) return []
    const excluded: { name: string; reason: string }[] = []

    allPrograms.forEach(prog => {
      if (prog.country !== profile.country) return

      const matchRes = MatchScoreEngine.calculateMatch(prog, {
        country: profile.country,
        region: profile.region,
        companySize: profile.companySize,
        industry: profile.industry,
        fundingInterests: profile.fundingInterests || []
      })

      let isExcluded = matchRes.status === "Not Eligible"
      let exclusionReason = ""

      if (isExcluded) {
        exclusionReason = matchRes.explanations[0] || "Does not meet baseline parameters"
      } else {
        if (prog.status === "Closed" || prog.status === "Paused") {
          isExcluded = true
          exclusionReason = "Program intake is currently closed."
        } else if (prog.slug === "sustainable-cap" && !derivedFlags.hasExporting && profile.industry !== "agriculture") {
          isExcluded = true
          exclusionReason = "Agriculture or agri-tech sector focus required."
        } else if (prog.slug === "sif" && (profile.companySize === "1-9" || profile.companySize === "10-49")) {
          isExcluded = true
          exclusionReason = "Project scope does not meet the minimum $10M enterprise scale requirement."
        }
      }

      if (isExcluded) {
        const cleanReason = exclusionReason
          .replace(/^[✖⚠\s]+/, "")
          .replace("Program is restricted to businesses in ", "")
          .replace("Program is only available in ", "")

        let polishedReason = cleanReason
        if (polishedReason.includes("Ontario")) polishedReason = "Ontario business presence required."
        else if (polishedReason.includes("Alberta")) polishedReason = "Alberta business presence required."
        else if (polishedReason.includes("Quebec")) polishedReason = "Quebec business presence required."
        else if (polishedReason.includes("Texas")) polishedReason = "Texas business presence required."
        else if (polishedReason.includes("California")) polishedReason = "California business presence required."
        else if (polishedReason.includes("New York")) polishedReason = "New York business presence required."
        else if (polishedReason.includes("agricultural") || polishedReason.includes("agriculture")) polishedReason = "Agricultural or agri-tech sector focus required."
        else if (polishedReason.includes("non-profit")) polishedReason = "Non-profit or charity structure required."
        else if (polishedReason.includes("closed") || polishedReason.includes("paused")) polishedReason = "Program intake is currently closed."

        excluded.push({
          name: prog.name,
          reason: polishedReason
        })
      }
    })

    if (excluded.length < 5) {
      if (!derivedFlags.hasExporting && !excluded.some(e => e.name.includes("CanExport"))) {
        excluded.push({
          name: "CanExport Innovation Program",
          reason: "Export or international marketing initiative not identified."
        })
      }
      if (!derivedFlags.hasHiring && !excluded.some(e => e.name.includes("Youth"))) {
        excluded.push({
          name: "Youth Employment Stream (IRAP)",
          reason: "No active T4 wage hiring plans detected."
        })
      }
    }

    return excluded.slice(0, 5)
  }, [profile, allPrograms, derivedFlags])



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
          @page {
            size: letter;
            margin: 25mm 15mm 25mm 15mm;
          }
          body {
            background-color: white !important;
            color: #0f172a !important;
            font-size: 10.5pt !important;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .no-print {
            display: none !important;
          }
          .print-break-before {
            page-break-before: always !important;
            break-before: page !important;
          }
          .print-break-inside-avoid {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          .print-card {
            border: 1px solid #cbd5e1 !important;
            box-shadow: none !important;
            background-color: #f8fafc !important;
            padding: 18px !important;
            border-radius: 12px !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          .print-header {
            border-bottom: 3px solid #0f172a !important;
            padding-bottom: 12px !important;
            margin-bottom: 20px !important;
          }
          .print-running-header {
            position: fixed !important;
            top: -15mm !important;
            left: 0 !important;
            right: 0 !important;
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
            border-bottom: 1px solid #e2e8f0 !important;
            padding-bottom: 6px !important;
            height: 10mm !important;
          }
          .print-running-footer {
            position: fixed !important;
            bottom: -15mm !important;
            left: 0 !important;
            right: 0 !important;
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
            border-top: 1px solid #e2e8f0 !important;
            padding-top: 6px !important;
            height: 10mm !important;
          }
        }
      `}</style>

      {/* Running Print-Only Header and Footer */}
      <div className="hidden print:flex print-running-header text-[8px] text-slate-400 font-semibold">
        <span className="font-extrabold text-slate-700">FSI <span className="text-emerald-600">Digital</span> Funding Intelligence</span>
        <span>Executive Funding Assessment Report</span>
      </div>
      
      <div className="hidden print:flex print-running-footer text-[8px] text-slate-400 font-semibold">
        <span>Confidential • Prepared for {profile.companyName || "Your Company"}</span>
        <span>fsidigital.ca</span>
      </div>

      {/* Control Top Bar (No-Print) */}
      <div className="no-print space-y-2">
        <div className="flex items-center justify-between bg-white border border-slate-200 p-4 rounded-2xl shadow-xs">
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
        <p className="text-[10px] text-slate-500 text-right px-2">
          💡 <strong>Tip:</strong> In your print settings, change Destination to <strong>"Save as PDF"</strong> to save your report offline.
        </p>
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

        {/* Section 1: Executive Summary */}
        <div className="space-y-4 print-break-inside-avoid">
          <div className="border-b border-slate-200 pb-2 flex items-center gap-2">
            <Compass className="w-4.5 h-4.5 text-indigo-600" />
            <h2 className="text-lg font-black text-slate-900 tracking-tight">1. Executive Summary</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
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
              <div className="space-y-3">
                <span className="text-emerald-400 text-[10px] font-black uppercase tracking-wider block">Executive Stacking Summary</span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">{stackingRange.formatted}</h3>
                <div className="space-y-1.5 pt-1 text-left">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Priority Pipeline</span>
                  <ol className="text-xs font-bold text-slate-200 space-y-1">
                    {topMatches.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="flex items-center gap-1.5 truncate">
                        <span className="text-indigo-400 font-extrabold">{idx + 1}.</span>
                        <span>{getShortProgramName(item.program.name)}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-800 mt-4 text-[9px] text-slate-500 flex justify-between">
                <span>Programs Reviewed: {allPrograms.length}</span>
                <span>Qualified: {eligibleMatches.length}</span>
                <span>Excluded: {allPrograms.length - eligibleMatches.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Detailed Program Analysis */}
        <div className="space-y-4 print-break-before print-break-inside-avoid text-left">
          <div className="border-b border-slate-200 pb-2 flex items-center gap-2">
            <Compass className="w-4.5 h-4.5 text-indigo-600" />
            <h2 className="text-lg font-black text-slate-900 tracking-tight">2. Detailed Program Analysis</h2>
          </div>
          <p className="text-xs text-slate-500">
            A comprehensive mapping of qualified funding channels, detailing industry alignment points, potential filing barriers, and estimated capital yields.
          </p>

          <div className="space-y-4">
            {topMatches.map((item) => {
              // Filter checkmarks vs warnings from matched explanations
              const whyMatched = item.match.explanations.filter(e => e.startsWith("✓"))
              const blockers = item.match.explanations.filter(e => e.startsWith("⚠") || e.startsWith("Warning") || e.startsWith("✖"))
              
              // Add dynamic fallbacks for R&D/Export parameters if missing
              if (item.program.slug === "irap-grant" || item.program.slug === "sred-tax-credit") {
                if (!derivedFlags.hasRd && !blockers.some(b => b.toLowerCase().includes("r&d"))) {
                  blockers.push("⚠ Missing documented R&D process logs");
                }
              }
              if (item.program.slug === "canexport") {
                if (!derivedFlags.hasExporting && !blockers.some(b => b.toLowerCase().includes("export"))) {
                  blockers.push("⚠ Missing international market export plan");
                }
              }

              return (
                <div key={item.program.slug} className="p-6 border border-slate-200 rounded-2xl bg-white space-y-4 print-card">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 pb-3">
                    <div>
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">{item.program.fundingType}</span>
                      <h3 className="font-extrabold text-sm text-slate-900 mt-0.5">{item.program.name}</h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-left sm:text-right shrink-0">
                        <span className="text-[8px] font-bold text-slate-400 uppercase block">Estimated Value</span>
                        <span className="text-xs font-black text-emerald-600">{item.program.fundingAmount.split(" (")[0]}</span>
                      </div>
                      <Badge className="bg-indigo-50 border-indigo-200 text-indigo-805 font-extrabold uppercase py-1 px-2.5 tracking-wider text-[9px]">
                        {item.match.score}% Match
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    {/* Why Matched */}
                    <div className="space-y-2">
                      <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest block">Why Matched</span>
                      <ul className="space-y-1.5">
                        {whyMatched.map((explain, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 text-slate-700 font-semibold text-[11px] leading-normal">
                            <span className="text-emerald-500 font-extrabold shrink-0">✓</span>
                            <span>{explain.substring(1).trim()}</span>
                          </li>
                        ))}
                        {whyMatched.length === 0 && (
                          <li className="text-[11px] text-slate-400 italic">Meets baseline target sector parameters.</li>
                        )}
                      </ul>
                    </div>

                    {/* Potential Blockers */}
                    <div className="space-y-2">
                      <span className="text-[9px] font-black text-amber-600 uppercase tracking-widest block">Potential Blockers</span>
                      <ul className="space-y-1.5">
                        {blockers.map((explain, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 text-slate-700 font-semibold text-[11px] leading-normal">
                            <span className="text-amber-500 font-extrabold shrink-0">⚠</span>
                            <span>{explain.replace(/^[⚠✖]/, "").trim()}</span>
                          </li>
                        ))}
                        {blockers.length === 0 && (
                          <li className="text-[11px] text-slate-500 font-semibold flex items-center gap-1">
                            <span className="text-emerald-500 font-extrabold">✓</span> No high-risk blockers detected.
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Section 3: Funding Stacking Strategy */}
        <div className="space-y-4 print-break-before print-break-inside-avoid text-left">
          <div className="border-b border-slate-200 pb-2 flex items-center gap-2">
            <TrendingUp className="w-4.5 h-4.5 text-indigo-600" />
            <h2 className="text-lg font-black text-slate-900 tracking-tight">3. Funding Stacking Strategy</h2>
          </div>
          <p className="text-xs text-slate-500">
            Filing sequence is critical. We recommend submitting applications in this wave format to stack multiple streams and maximize non-dilutive capital.
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
                            <span className="block text-xs font-extrabold text-slate-900 truncate">{getShortProgramName(item.program.name)}</span>
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

        {/* Section 4: Required Documentation Checklist */}
        <div className="space-y-4 print-break-before print-break-inside-avoid text-left">
          <div className="border-b border-slate-200 pb-2 flex items-center gap-2">
            <CheckCircle2 className="w-4.5 h-4.5 text-indigo-600" />
            <h2 className="text-lg font-black text-slate-900 tracking-tight">4. Required Documentation Checklist</h2>
          </div>
          <p className="text-xs text-slate-500">
            Compile the following documents to establish compliance and qualify for filing intakes:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "Incorporation Documents", desc: "Corporate registration papers (CCPC status validation)", active: derivedFlags.isIncorporated },
              { label: "R&D Project Summaries", desc: "Technical project scope, development logs, or research descriptions", active: derivedFlags.hasRd },
              { label: "Payroll Records", desc: "T4 slips, staff roster, or active contractor agreements", active: derivedFlags.hasHiring },
              { label: "Market Expansion Plan", desc: "International sales forecasts or target country marketing budgets", active: derivedFlags.hasExporting },
              { label: "Corporate Financial Statements", desc: "Year-end balance sheets, income statements, or bank records", active: true }
            ].map((doc, idx) => (
              <div key={idx} className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex items-start gap-3 print-card print:bg-white">
                <span className={doc.active ? "text-emerald-600 font-extrabold text-sm shrink-0" : "text-amber-500 font-extrabold text-sm shrink-0"}>
                  {doc.active ? "✓" : "⚠"}
                </span>
                <div>
                  <span className="block text-xs font-black text-slate-900">{doc.label}</span>
                  <span className="block text-[10px] text-slate-500 mt-0.5">{doc.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: Strategic Risk Analysis */}
        <div className="space-y-4 print-break-before print-break-inside-avoid text-left">
          <div className="border-b border-slate-200 pb-2 flex items-center gap-2">
            <ShieldAlert className="w-4.5 h-4.5 text-indigo-600" />
            <h2 className="text-lg font-black text-slate-900 tracking-tight">5. Strategic Risk Analysis</h2>
          </div>
          <p className="text-xs text-slate-500">
            The following risk factors were identified based on your firmographics and operations. Addressing these is high-priority to prevent program rejection:
          </p>

          <div className="space-y-3">
            {fundingRisks.map((risk, idx) => (
              <div key={idx} className="p-4 border border-amber-200/60 bg-amber-50/5 rounded-xl flex items-start gap-3 print-card print:bg-white">
                <span className="text-amber-600 font-black text-sm shrink-0 mt-0.5">⚠</span>
                <div>
                  <h4 className="font-extrabold text-xs text-slate-900">{idx + 1}. {risk.title}</h4>
                  <p className="text-[10.5px] text-slate-600 font-medium mt-1 leading-normal">
                    {risk.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 6: Excluded Programs Analysis */}
        <div className="space-y-4 print-break-before print-break-inside-avoid text-left">
          <div className="border-b border-slate-200 pb-2 flex items-center gap-2">
            <ShieldAlert className="w-4.5 h-4.5 text-indigo-600" />
            <h2 className="text-lg font-black text-slate-900 tracking-tight">6. Excluded Programs Analysis</h2>
          </div>
          <p className="text-xs text-slate-600 font-semibold leading-relaxed">
            Our engine evaluated {allPrograms.length} federal, provincial, tax-credit, wage subsidy, export, and innovation funding programs against your profile and excluded opportunities that do not currently align with your business.
          </p>

          <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl print-card print:bg-slate-50/50">
            <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200 pb-3 mb-4">
              <div>Programs Reviewed: <span className="text-slate-950 font-black">{allPrograms.length}</span></div>
              <div>Qualified: <span className="text-emerald-600 font-black">{eligibleMatches.length}</span></div>
              <div>Excluded: <span className="text-slate-950 font-black">{allPrograms.length - eligibleMatches.length}</span></div>
            </div>

            <div className="space-y-3">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Top 5 Exclusions & Disqualification Factors</span>
              {excludedPrograms.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs">
                  <span className="text-slate-400 font-black text-xs shrink-0">{idx + 1}.</span>
                  <div className="space-y-0.5">
                    <span className="block font-extrabold text-slate-800">{item.name}</span>
                    <span className="block text-[10.5px] text-slate-500 font-medium leading-normal">
                      <span className="text-amber-600 font-bold">Reason:</span> {item.reason}
                    </span>
                  </div>
                </div>
              ))}
            </div>
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

      {/* Exit Intent Modal (No-Print) */}
      {showExitIntent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fade-in no-print">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative space-y-6">
            <button
              onClick={() => setShowExitIntent(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-extrabold text-sm"
            >
              ✕
            </button>
            <div className="space-y-3 text-center">
              <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-center mx-auto text-indigo-600">
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>
              <h3 className="text-xl font-black text-slate-950">Need Help Interpreting Your Assessment?</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Schedule a 15-minute Funding Strategy Call with our lead analyst to verify matched eligibility criteria, confirm deadlines, and map out your filing waves.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  setShowExitIntent(false)
                  router.push(`/booking?token=${token}&ref=exit_intent`)
                }}
                className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs py-3.5 px-6 rounded-xl transition-all animate-pulse"
              >
                Book Strategy Call
              </button>
              <button
                onClick={() => setShowExitIntent(false)}
                className="w-full text-slate-500 hover:text-slate-700 font-bold text-xs py-2 text-center"
              >
                No thanks, I'll review on my own
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
