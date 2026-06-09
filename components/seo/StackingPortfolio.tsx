import React, { useMemo } from "react"
import Link from "next/link"
import { ArrowRight, Sparkles, CheckSquare, Plus } from "lucide-react"
import { getAllPrograms } from "@/lib/data/programs"
import { MatchScoreEngine } from "@/lib/leads/MatchScoreEngine"
import type { SubscriberProfile } from "@/lib/leads/SubscriberRepository"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface StackingPortfolioProps {
  profile: Partial<SubscriberProfile>
  currentProgramSlug: string
}

export function StackingPortfolio({ profile, currentProgramSlug }: StackingPortfolioProps) {
  const programs = useMemo(() => getAllPrograms(), [])

  const { portfolio, totalValue } = useMemo(() => {
    // 1. Calculate matches for all other programs
    const matches = programs
      .filter(p => p.slug !== currentProgramSlug && p.status !== "Closed")
      .map(p => {
        const matchResult = MatchScoreEngine.calculateMatch(p, profile)
        return { program: p, result: matchResult }
      })
      .filter(item => item.result.status === "Eligible" && (item.result.fitBand === "Excellent" || item.result.fitBand === "Strong"))

    // Sort by score descending
    matches.sort((a, b) => b.result.score - a.result.score)
    const topMatches = matches.slice(0, 3)

    // Helper to estimate numeric value for stacking sum
    const parseOpportunityValue = (slug: string, rawAmt: string): number => {
      if (slug === "sred-tax-credit") return 120000
      if (slug === "irap-grant") return 75000
      if (slug === "canexport") return 50000
      if (slug === "mitacs-accelerate") return 15000
      
      const numbers = rawAmt.replace(/[^0-9]/g, "")
      if (numbers.length > 0) {
        const val = parseInt(numbers, 10)
        // Adjust for "k" shorthand if present
        if (rawAmt.toLowerCase().includes("k")) return val * 1000
        if (val < 1000) return val * 1000 // assume e.g. "50,000" parsed as "50"
        return val
      }
      return 25000 // default fallback
    }

    let sum = 0
    topMatches.forEach(item => {
      sum += parseOpportunityValue(item.program.slug, item.program.fundingAmount)
    })

    return {
      portfolio: topMatches,
      totalValue: sum
    }
  }, [programs, profile, currentProgramSlug])

  if (portfolio.length === 0) return null

  // Format total value (e.g. $245,000+)
  const formattedTotal = totalValue.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  })

  // Prefill checkout/consultation links
  const queryParams = new URLSearchParams()
  if (profile.email) queryParams.set("email", profile.email)
  if (profile.name) queryParams.set("name", profile.name)
  if (profile.region) queryParams.set("region", profile.region)
  if (profile.industry) queryParams.set("industry", profile.industry)
  if (profile.companySize) queryParams.set("size", profile.companySize)
  queryParams.set("ref", "funding_portfolio_stack")
  queryParams.set("stack_value", String(totalValue))

  const checkoutUrl = `/consultation?${queryParams.toString()}`

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-emerald-600" />
        <h3 className="text-xl font-bold text-slate-900">
          Your Stacking Funding Portfolio
        </h3>
      </div>

      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
        We identified the following high-probability stacking opportunities that your business can claim concurrently. Combining these streams maximizes research budgets and offsets operational payroll.
      </p>

      {/* Program Stack Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {portfolio.map((item, idx) => (
          <Card key={idx} className="border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-xs transition-all duration-200 rounded-xl overflow-hidden flex flex-col justify-between">
            <CardContent className="p-4 flex flex-col justify-between h-full space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between items-center gap-2">
                  <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-100 font-bold border-none text-[9px] py-0 px-2 shrink-0">
                    {item.program.fundingType}
                  </Badge>
                  <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full shrink-0 ${
                    item.result.fitBand === "Excellent" ? "bg-emerald-100 text-emerald-800" : "bg-blue-100 text-blue-800"
                  }`}>
                    {item.result.fitBand}
                  </span>
                </div>
                <h4 className="font-extrabold text-slate-900 text-xs tracking-tight line-clamp-2 hover:text-emerald-700 transition-colors">
                  <Link href={`/programs/${item.program.slug}?${queryParams.toString()}`}>
                    {item.program.name}
                  </Link>
                </h4>
              </div>

              <div>
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">Potential Yield</span>
                <span className="text-xs font-black text-slate-900 truncate block">
                  {item.program.fundingAmount.split(" (")[0]}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Aggregate Portfolio Value Summary Card */}
      <Card className="border border-emerald-200 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white rounded-2xl p-6 sm:p-8 shadow-md overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="md:flex md:items-center md:justify-between gap-6 relative z-10">
          <div className="space-y-2 mb-4 md:mb-0">
            <span className="text-xs text-emerald-400 font-black uppercase tracking-wider block">Stacking Match Confirmed</span>
            <h3 className="text-lg sm:text-xl font-black text-white">
              Claim Your {formattedTotal}+ Stacking Opportunity
            </h3>
            <p className="text-slate-300 text-xs leading-relaxed max-w-xl font-medium">
              Maximize your yield. Our funding analysts will review your company profile, stack regional wage subsidies, and outline a complete pre-qualification report with a 100% money-back guarantee.
            </p>
          </div>
          <Link 
            href={checkoutUrl}
            className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs px-6 py-4 rounded-xl shadow-lg shadow-emerald-500/10 transition-colors shrink-0 w-full md:w-auto text-center"
          >
            Claim Research Audit <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Card>
    </div>
  )
}
