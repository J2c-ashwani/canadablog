"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ShieldAlert, ShieldCheck, HelpCircle, Lock, Loader2, ArrowRight } from "lucide-react"

export default function FundingStackingDecisionEngine() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [company, setCompany] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [leadSaved, setLeadSaved] = useState(false)
  const [validationError, setValidationError] = useState<string | null>(null)

  // Inputs
  const [fedGrants, setFedGrants] = useState<number>(35000)
  const [provGrants, setProvGrants] = useState<number>(20000)
  const [sredCredits, setSredCredits] = useState<number>(45000)
  const [privateCash, setPrivateCash] = useState<number>(25000)
  const [devCount, setDevCount] = useState<number>(3)
  const [avgSalary, setAvgSalary] = useState<number>(85000)

  // Calculations
  const totalSalaries = devCount * avgSalary
  const totalPublicFunding = fedGrants + provGrants + sredCredits
  const totalProjectCost = totalSalaries // Assuming salaries represent the core eligible project costs
  
  // Stacking Ceiling (75% limit for CRA compliance)
  const legalCeilingPercent = 75
  const legalFundingCeiling = totalProjectCost * (legalCeilingPercent / 100)
  
  const excessFunding = totalPublicFunding - legalFundingCeiling
  const fundingLost = excessFunding > 0 ? excessFunding : 0
  const fundingPreserved = totalPublicFunding - fundingLost

  // Cash share required
  const minimumPrivateCashRequired = totalProjectCost - legalFundingCeiling
  const cashShareShortfall = minimumPrivateCashRequired > privateCash ? (minimumPrivateCashRequired - privateCash) : 0

  // Risk Rating
  let riskRating: "Safe" | "Moderate" | "High" = "Safe"
  let riskColor = "text-emerald-600 bg-emerald-50 border-emerald-200"
  let riskLabel = "CRA Compliant Stacking"

  const publicCoveragePercent = totalProjectCost > 0 ? (totalPublicFunding / totalProjectCost) * 100 : 0

  if (publicCoveragePercent > 75 || fundingLost > 0 || devCount < 2) {
    riskRating = "High"
    riskColor = "text-red-700 bg-red-50 border-red-200"
    riskLabel = "High Audit Risk (Potential Clawbacks)"
  } else if (publicCoveragePercent >= 50 && publicCoveragePercent <= 75) {
    riskRating = "Moderate"
    riskColor = "text-amber-700 bg-amber-50 border-amber-200"
    riskLabel = "Moderate Stacking Risk (Requires cost-splitting logs)"
  }

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes("@")) {
      setValidationError("Please enter a valid business email address.")
      return
    }
    setValidationError(null)
    setIsSubmitting(true)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name,
          companyName: company,
          category: "General",
          businessDescription: `Stacking Planner submission. Inputs: Fed Grants=$${fedGrants}, Prov Grants=$${provGrants}, SRED=$${sredCredits}, Private Cash=$${privateCash}, Dev Count=${devCount}, Salary=$${avgSalary}. Calculated Risk: ${riskRating}. Stacking Coverage: ${publicCoveragePercent.toFixed(1)}%`,
          source: "Funding Stacking Decision Engine",
          utmSource: "stacking_planner",
          utmMedium: "rde_tool",
          utmCampaign: "sprint_22"
        })
      })

      if (res.ok) {
        setLeadSaved(true)

        // Telemetry
        fetch("/api/subscriber/track-activity", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            event: "diagnostic_completed",
            toolUsed: "Funding Stacking Decision Engine",
            surveyResponse: riskRating
          })
        }).catch(() => {})
      } else {
        const errData = await res.json()
        setValidationError(errData.error || "Submission failed. Please try again.")
      }
    } catch (err) {
      setValidationError("Network error. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto border-slate-200 shadow-sm bg-white overflow-hidden rounded-2xl">
      <CardHeader className="bg-slate-50 border-b border-slate-200/80 p-6">
        <CardTitle className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-center gap-2">
          🛡️ Grant Stacking Planner & Decision Engine
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm text-slate-500 font-medium">
          Calculate legal stacking parameters, evaluate CRA audit risk bands, and preserve non-dilutive matching capital.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-6 space-y-6">
        {/* Form Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="fedGrants" className="text-xs font-bold text-slate-700">Federal Grants Expected ($)</Label>
            <Input 
              id="fedGrants" 
              type="number" 
              value={fedGrants} 
              onChange={(e) => setFedGrants(Number(e.target.value))}
              className="h-10 text-sm border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="provGrants" className="text-xs font-bold text-slate-700">Provincial Grants Expected ($)</Label>
            <Input 
              id="provGrants" 
              type="number" 
              value={provGrants} 
              onChange={(e) => setProvGrants(Number(e.target.value))}
              className="h-10 text-sm border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="sredCredits" className="text-xs font-bold text-slate-700">SR&ED Tax Credits Claim ($)</Label>
            <Input 
              id="sredCredits" 
              type="number" 
              value={sredCredits} 
              onChange={(e) => setSredCredits(Number(e.target.value))}
              className="h-10 text-sm border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="privateCash" className="text-xs font-bold text-slate-700">Private Matching Cash on Hand ($)</Label>
            <Input 
              id="privateCash" 
              type="number" 
              value={privateCash} 
              onChange={(e) => setPrivateCash(Number(e.target.value))}
              className="h-10 text-sm border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="devCount" className="text-xs font-bold text-slate-700">Number of Eligible Developers</Label>
            <Input 
              id="devCount" 
              type="number" 
              value={devCount} 
              onChange={(e) => setDevCount(Number(e.target.value))}
              className="h-10 text-sm border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="avgSalary" className="text-xs font-bold text-slate-700">Average Salary per Developer ($)</Label>
            <Input 
              id="avgSalary" 
              type="number" 
              value={avgSalary} 
              onChange={(e) => setAvgSalary(Number(e.target.value))}
              className="h-10 text-sm border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Lead Capture or Locked Results Wrapper */}
        {!leadSaved ? (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
            <div className="text-center space-y-1">
              <h4 className="font-extrabold text-slate-800 text-sm flex items-center justify-center gap-1.5">
                <Lock className="w-4 h-4 text-indigo-600" /> Unlock Compliance Risk Analysis & Planning Report
              </h4>
              <p className="text-[11px] text-slate-500">
                Submit your contact parameters to compute co-funding risk bands and custom next-step recommendations.
              </p>
            </div>
            
            <form onSubmit={handleSubmitLead} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input 
                  type="text" 
                  placeholder="First Name (Optional)" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  className="h-10 text-xs border-slate-200"
                />
                <Input 
                  type="text" 
                  placeholder="Company Name (Optional)" 
                  value={company} 
                  onChange={(e) => setCompany(e.target.value)}
                  className="h-10 text-xs border-slate-200"
                />
              </div>
              <Input 
                type="email" 
                placeholder="Business Email (Required)" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-10 text-xs border-slate-200"
              />
              
              {validationError && (
                <p className="text-[11px] text-red-600 font-bold text-center">{validationError}</p>
              )}

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-xs rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Unlocking Decision Report...
                  </>
                ) : (
                  <>Get Compliance Risk Analysis &rarr;</>
                )}
              </Button>
            </form>
          </div>
        ) : (
          <div className="space-y-5 animate-in fade-in duration-300">
            {/* Risk Badge Output */}
            <div className={`border rounded-xl p-4 flex items-start gap-3 ${riskColor}`}>
              <div className="pt-0.5">
                {riskRating === "Safe" ? (
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                ) : (
                  <ShieldAlert className="w-5 h-5" />
                )}
              </div>
              <div>
                <h5 className="font-extrabold text-sm uppercase tracking-wide">Risk Level: {riskRating}</h5>
                <p className="text-xs font-semibold mt-0.5">{riskLabel}</p>
              </div>
            </div>

            {/* Metrics Breakdown Output */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3.5">
              <h5 className="font-extrabold text-slate-800 text-xs uppercase tracking-wide border-b border-slate-200 pb-1.5">
                📊 Stacking Financial Summary
              </h5>
              <div className="grid grid-cols-2 gap-4 text-xs font-medium text-slate-600">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase">CRA Legal Stacking Limit</span>
                  <p className="font-extrabold text-slate-800 text-sm mt-0.5">{legalCeilingPercent}% (${legalFundingCeiling.toLocaleString()})</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase">Current Public Coverage</span>
                  <p className="font-extrabold text-slate-800 text-sm mt-0.5">{publicCoveragePercent.toFixed(1)}% (${totalPublicFunding.toLocaleString()})</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase">Funding Preserved (Safe)</span>
                  <p className="font-extrabold text-emerald-600 text-sm mt-0.5">${fundingPreserved.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase">Funding Lost / Audit Hazard</span>
                  <p className={`font-extrabold text-sm mt-0.5 ${fundingLost > 0 ? "text-red-600" : "text-slate-500"}`}>
                    ${fundingLost.toLocaleString()}
                  </p>
                </div>
              </div>

              {cashShareShortfall > 0 && (
                <div className="mt-2 text-xs font-bold text-amber-850 bg-amber-50 border border-amber-200 rounded-lg p-3">
                  ⚠️ Matching Capital Deficit: You need an additional ${cashShareShortfall.toLocaleString()} in private cash to legally satisfy public funding co-share rules.
                </div>
              )}
            </div>

            {/* Actionable Next Steps */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 text-left">
              <h5 className="font-extrabold text-slate-800 text-xs uppercase tracking-wide">
                🧭 Actionable Next Steps
              </h5>
              <ul className="space-y-2 text-xs text-slate-700 list-disc pl-4 leading-relaxed">
                {riskRating === "High" ? (
                  <>
                    <li><strong>Separate cost sprints immediately:</strong> Track separate developer hours to separate project tasks between IRAP (technical uncertainty) and SR&ED (experimental development).</li>
                    <li><strong>Reduce claiming base on T661:</strong> Ensure your accountant offsets the SR&ED expenditure pool by the exact amount of IRAP funding received.</li>
                    <li><strong>Assess program deletions:</strong> You may need to drop or delay one grant route to safeguard your larger non-dilutive returns.</li>
                  </>
                ) : (
                  <>
                    <li><strong>Maintain current claim levels:</strong> Stacking parameters are within safe bounds. Proceed with program applications.</li>
                    <li><strong>Compile developer timesheets:</strong> Implement monthly task logging to satisfy CRA audit compliance before files are compiled.</li>
                  </>
                )}
              </ul>
            </div>

            {/* Product Recommendations */}
            <div className="bg-gradient-to-br from-indigo-50 to-white border-2 border-indigo-200 rounded-2xl p-5 text-left space-y-4">
              <div>
                <span className="bg-indigo-100 text-indigo-850 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded">
                  Recommended Advisory Option
                </span>
                <h4 className="text-sm font-extrabold text-indigo-950 mt-1">
                  {riskRating === "High" 
                    ? "Schedule an Expert 1-on-1 Stacking & Compliance Review ($199)" 
                    : "Download the Complete Funding Application Toolkit ($49)"}
                </h4>
                <p className="text-xs text-slate-650 mt-1">
                  {riskRating === "High"
                    ? "Get a full audit preflight check of your developer wage claims. Let us verify your cost centers and offset calculations to prevent CRA clawbacks."
                    : "Access template packages, cash flow sheets, and grant budgets to satisfy co-share requirements and speed up applications by 40+ hours."}
                </p>
              </div>
              
              <a 
                href={riskRating === "High" ? "/audit?source=stacking_planner" : "/products/toolkit?source=stacking_planner"}
                className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs px-4 py-2.5 rounded-lg shadow-xs transition-colors"
              >
                {riskRating === "High" ? "Book Strategy Session" : "Get Application Toolkit"} <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
