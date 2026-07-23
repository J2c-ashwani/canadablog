"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DollarSign, Percent, Calculator, Briefcase, Coins, CheckCircle2, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function ToolsClient() {
  const [activeTool, setActiveTool] = useState<"sred" | "hiring">("sred")

  // Unlock State
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false)
  const [formState, setFormState] = useState({ email: "", name: "", company: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      const unlocked = sessionStorage.getItem("calculator_unlocked")
      if (unlocked === "true") {
        setIsUnlocked(true)
      }
    }
  }, [])

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")
    
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formState,
          source: activeTool === "sred" ? "SR&ED Calculator" : "Hiring Subsidy Calculator",
          message: "Requested calculator unlock"
        })
      })
      
      if (res.ok) {
        setIsUnlocked(true)
        if (typeof window !== "undefined") {
          sessionStorage.setItem("calculator_unlocked", "true")
          console.log("Telemetry: Email captured for calculator unlock", formState.email)
          window.dispatchEvent(new CustomEvent("calculator_unlock", { detail: { tool: activeTool } }))
        }
      } else {
        setError("Something went wrong. Please try again.")
      }
    } catch (err) {
      setError("Network error. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const formContainerStyle: React.CSSProperties = {
    background: "linear-gradient(145deg, #1e293b, #0f172a)",
    border: "1px solid #334155",
    padding: "24px",
    borderRadius: "16px",
    width: "100%",
    maxWidth: "320px",
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5)",
    textAlign: "center",
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 12px",
    marginBottom: "12px",
    backgroundColor: "#0f172a",
    border: "1px solid #475569",
    borderRadius: "8px",
    color: "#f8fafc",
    fontSize: "14px",
    outline: "none",
  }

  const buttonStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px",
    backgroundColor: "#059669",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.2s",
  }

  const renderCaptureForm = () => (
    <div style={formContainerStyle}>
      <h4 style={{ color: "#fff", margin: "0 0 8px 0", fontSize: "18px", fontWeight: "bold" }}>See Your Estimate</h4>
      <p style={{ color: "#94a3b8", margin: "0 0 20px 0", fontSize: "13px", lineHeight: "1.4" }}>
        Enter your email to reveal your personalized funding estimate.
      </p>
      <form onSubmit={handleUnlock} style={{ display: "flex", flexDirection: "column" }}>
        <input
          type="text"
          placeholder="Name (optional)"
          style={inputStyle}
          value={formState.name}
          onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
        />
        <input
          type="text"
          placeholder="Company (optional)"
          style={inputStyle}
          value={formState.company}
          onChange={(e) => setFormState(prev => ({ ...prev, company: e.target.value }))}
        />
        <input
          type="email"
          placeholder="Email address (required)"
          required
          style={inputStyle}
          value={formState.email}
          onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
        />
        {error && <p style={{ color: "#ef4444", fontSize: "12px", margin: "0 0 10px 0" }}>{error}</p>}
        <button type="submit" style={{ ...buttonStyle, opacity: isSubmitting ? 0.7 : 1 }} disabled={isSubmitting}>
          {isSubmitting ? "Unlocking..." : "Reveal My Estimate"}
        </button>
      </form>
      <p style={{ color: "#64748b", margin: "16px 0 0 0", fontSize: "11px" }}>
        We respect your privacy. Unsubscribe anytime.
      </p>
    </div>
  )

  // SR&ED State
  const [salaries, setSalaries] = useState<number>(150000)
  const [contractors, setContractors] = useState<number>(50000)
  const [province, setProvince] = useState<"on" | "qc" | "other">("on")

  // Hiring State
  const [interns, setInterns] = useState<number>(2)
  const [hourlyWage, setHourlyWage] = useState<number>(25)
  const [weeklyHours, setWeeklyHours] = useState<number>(35)
  const [weeksCount, setWeeksCount] = useState<number>(16) // Standard university semester

  // SR&ED Math
  // Proxy method: Overhead = 55% of technical wages. 
  // Federal refund rate for CCPC is 35% on wages + overhead, and 35% * 50% = 17.5% on contractor expenses.
  const eligibleWages = salaries * 1.55
  const eligibleContractors = contractors * 0.50
  const federalRefund = (eligibleWages + eligibleContractors) * 0.35

  const provRate = province === "qc" ? 0.30 : province === "on" ? 0.08 : 0
  const provincialRefund = (salaries + contractors) * provRate
  const totalSredRefund = federalRefund + provincialRefund

  // Hiring Math
  const totalWageCost = interns * hourlyWage * weeklyHours * weeksCount
  // Matching grant covers 70% up to $7,000 per student under student work placement programs
  const estimatedHiringGrant = Math.min(totalWageCost * 0.70, interns * 7000)
  const netHiringCost = Math.max(0, totalWageCost - estimatedHiringGrant)

  return (
    <div className="space-y-8">
      {/* Tabs */}
      <div className="flex justify-center gap-2 border-b border-slate-200 pb-px">
        <button
          onClick={() => setActiveTool("sred")}
          className={`flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 transition-all -mb-px ${
            activeTool === "sred"
              ? "border-emerald-600 text-emerald-700 font-extrabold"
              : "border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"
          }`}
        >
          <Calculator className="w-4 h-4" />
          SR&ED Refund Calculator
        </button>
        <button
          onClick={() => setActiveTool("hiring")}
          className={`flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 transition-all -mb-px ${
            activeTool === "hiring"
              ? "border-emerald-600 text-emerald-700 font-extrabold"
              : "border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"
          }`}
        >
          <Briefcase className="w-4 h-4" />
          Hiring Subsidy Calculator
        </button>
      </div>

      {/* SR&ED Calculator Panel */}
      {activeTool === "sred" && (
        <div className="grid lg:grid-cols-3 gap-8 items-start animate-in fade-in duration-200">
          {/* Sliders Column */}
          <Card className="lg:col-span-2 border border-slate-200 bg-white p-6 sm:p-8 rounded-3xl space-y-6">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Coins className="w-5 h-5 text-emerald-600" /> Enter Estimated R&D Expenditures
            </h2>

            {/* Wages Slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <label className="font-bold text-slate-700">T4 Technical Salaries (CAD)</label>
                <span className="text-emerald-700 font-extrabold text-base bg-emerald-50 px-2 py-0.5 rounded">
                  ${salaries.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1000000"
                step="10000"
                value={salaries}
                onChange={(e) => setSalaries(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <p className="text-[10px] text-slate-400">Total salaries paid directly to employees on corporate payroll conducting R&D.</p>
            </div>

            {/* Contractors Slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <label className="font-bold text-slate-700">R&D Subcontractors / Invoices (CAD)</label>
                <span className="text-emerald-700 font-extrabold text-base bg-emerald-50 px-2 py-0.5 rounded">
                  ${contractors.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="500000"
                step="5000"
                value={contractors}
                onChange={(e) => setContractors(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <p className="text-[10px] text-slate-400">Invoices paid to arm's-length consultants or corporations executing technical R&D work.</p>
            </div>

            {/* Province Selection */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700 block">Operational Province</label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setProvince("on")}
                  className={`py-3 rounded-xl border text-xs font-bold transition-all ${
                    province === "on"
                      ? "border-emerald-500 bg-emerald-50/50 text-emerald-800"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  Ontario (8% credit)
                </button>
                <button
                  type="button"
                  onClick={() => setProvince("qc")}
                  className={`py-3 rounded-xl border text-xs font-bold transition-all ${
                    province === "qc"
                      ? "border-emerald-500 bg-emerald-50/50 text-emerald-800"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  Quebec (30% credit)
                </button>
                <button
                  type="button"
                  onClick={() => setProvince("other")}
                  className={`py-3 rounded-xl border text-xs font-bold transition-all ${
                    province === "other"
                      ? "border-emerald-500 bg-emerald-50/50 text-emerald-800"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  Other / None (0%)
                </button>
              </div>
            </div>
          </Card>

          {/* Results Column */}
          <Card className="border border-emerald-200 bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-950 text-white p-6 sm:p-8 rounded-3xl space-y-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div style={{ position: "relative" }}>
              <div style={{ filter: !isUnlocked ? "blur(8px)" : "none", opacity: !isUnlocked ? 0.3 : 1, transition: "all 0.3s ease", pointerEvents: !isUnlocked ? "none" : "auto" }}>
                <div className="space-y-1 relative z-10">
                  <Badge className="bg-emerald-600 text-white border-none font-bold uppercase tracking-wider text-[9px]">CCPC Refund Estimate</Badge>
                  <h3 className="text-slate-400 font-bold text-xs uppercase">Total Potential SR&ED Yield</h3>
                  <div className="text-4xl sm:text-5xl font-black text-emerald-400 font-mono">
                    ${isUnlocked ? Math.round(totalSredRefund).toLocaleString() : "XX,XXX"}
                  </div>
                </div>

                <hr className="border-white/10 my-6" />

                <div className="space-y-3 text-xs sm:text-sm text-slate-300 relative z-10">
                  <div className="flex justify-between">
                    <span>Federal CCPC Refund (35%):</span>
                    <span className="font-mono text-white">${isUnlocked ? Math.round(federalRefund).toLocaleString() : "X,XXX"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Provincial Refund ({provRate * 100}%):</span>
                    <span className="font-mono text-white">${isUnlocked ? Math.round(provincialRefund).toLocaleString() : "X,XXX"}</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400 italic">
                    <span>Assumes Proxy Overhead Option:</span>
                    <span>Active</span>
                  </div>
                </div>

                <hr className="border-white/10 my-6" />

                <div className="space-y-4 relative z-10">
                  <p className="text-xs text-slate-400 leading-relaxed">
                    *This is an estimation. Exact yields depend on CCPC status, taxable capital limits, and contemporaneous documentation logs.
                  </p>
                </div>
              </div>

              {!isUnlocked && (
                <div style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  zIndex: 20
                }}>
                  {renderCaptureForm()}
                </div>
              )}
            </div>

            <div className="relative z-10 mt-4">
              <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3 rounded-xl shadow-md">
                <Link href="/get-started?calculator=sred" className="flex items-center justify-center gap-1.5">
                  Request SR&ED Pre-Audit <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Hiring Calculator Panel */}
      {activeTool === "hiring" && (
        <div className="grid lg:grid-cols-3 gap-8 items-start animate-in fade-in duration-200">
          {/* Sliders Column */}
          <Card className="lg:col-span-2 border border-slate-200 bg-white p-6 sm:p-8 rounded-3xl space-y-6">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-emerald-600" /> Enter Internship Parameters
            </h2>

            {/* Number of Interns */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <label className="font-bold text-slate-700">Number of Student Interns</label>
                <span className="text-emerald-700 font-extrabold text-base bg-emerald-50 px-2 py-0.5 rounded">
                  {interns} Student{interns > 1 ? "s" : ""}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={interns}
                onChange={(e) => setInterns(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
            </div>

            {/* Hourly Wage */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <label className="font-bold text-slate-700">Hourly Wage (CAD)</label>
                <span className="text-emerald-700 font-extrabold text-base bg-emerald-50 px-2 py-0.5 rounded">
                  ${hourlyWage}/hr
                </span>
              </div>
              <input
                type="range"
                min="15"
                max="60"
                step="1"
                value={hourlyWage}
                onChange={(e) => setHourlyWage(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
            </div>

            {/* Hours per Week */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <label className="font-bold text-slate-700">Hours per Week</label>
                <span className="text-emerald-700 font-extrabold text-base bg-emerald-50 px-2 py-0.5 rounded">
                  {weeklyHours} hrs/wk
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="40"
                step="5"
                value={weeklyHours}
                onChange={(e) => setWeeklyHours(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
            </div>

            {/* Placement Duration */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <label className="font-bold text-slate-700">Placement Duration (Weeks)</label>
                <span className="text-emerald-700 font-extrabold text-base bg-emerald-50 px-2 py-0.5 rounded">
                  {weeksCount} Weeks
                </span>
              </div>
              <input
                type="range"
                min="8"
                max="24"
                step="2"
                value={weeksCount}
                onChange={(e) => setWeeksCount(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <p className="text-[10px] text-slate-400">Typical university co-op semesters are 16 weeks (4 months).</p>
            </div>
          </Card>

          {/* Results Column */}
          <Card className="border border-emerald-200 bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-950 text-white p-6 sm:p-8 rounded-3xl space-y-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div style={{ position: "relative" }}>
              <div style={{ filter: !isUnlocked ? "blur(8px)" : "none", opacity: !isUnlocked ? 0.3 : 1, transition: "all 0.3s ease", pointerEvents: !isUnlocked ? "none" : "auto" }}>
                <div className="space-y-1 relative z-10">
                  <Badge className="bg-emerald-600 text-white border-none font-bold uppercase tracking-wider text-[9px]">SWPP Subsidy Estimate</Badge>
                  <h3 className="text-slate-400 font-bold text-xs uppercase">Potential Grant Support</h3>
                  <div className="text-4xl sm:text-5xl font-black text-emerald-400 font-mono">
                    ${isUnlocked ? Math.round(estimatedHiringGrant).toLocaleString() : "XX,XXX"}
                  </div>
                </div>

                <hr className="border-white/10 my-6" />

                <div className="space-y-3 text-xs sm:text-sm text-slate-300 relative z-10">
                  <div className="flex justify-between">
                    <span>Total Gross Wages:</span>
                    <span className="font-mono text-white">${isUnlocked ? Math.round(totalWageCost).toLocaleString() : "X,XXX"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Matching Grant (Up to 70%):</span>
                    <span className="font-mono text-emerald-400">+${isUnlocked ? Math.round(estimatedHiringGrant).toLocaleString() : "X,XXX"}</span>
                  </div>
                  <div className="flex justify-between font-bold border-t border-white/10 pt-2">
                    <span>Net Corporate Cost:</span>
                    <span className="font-mono text-white">${isUnlocked ? Math.round(netHiringCost).toLocaleString() : "X,XXX"}</span>
                  </div>
                </div>

                <hr className="border-white/10 my-6" />

                <div className="space-y-4 relative z-10">
                  <p className="text-xs text-slate-400 leading-relaxed">
                    *Estimation based on federal student co-op placement matching rules. Students must be enrolled in recognized post-secondary institutions.
                  </p>
                </div>
              </div>

              {!isUnlocked && (
                <div style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  zIndex: 20
                }}>
                  {renderCaptureForm()}
                </div>
              )}
            </div>

            <div className="relative z-10 mt-4">
              <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3 rounded-xl shadow-md">
                <Link href="/get-started?calculator=hiring" className="flex items-center justify-center gap-1.5">
                  Secure Hiring Voucher <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
