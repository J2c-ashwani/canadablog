"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DollarSign, Percent, Calculator, Briefcase, Coins, CheckCircle2, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function ToolsClient() {
  const [activeTool, setActiveTool] = useState<"sred" | "hiring">("sred")

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

            <div className="space-y-1 relative z-10">
              <Badge className="bg-emerald-600 text-white border-none font-bold uppercase tracking-wider text-[9px]">CCPC Refund Estimate</Badge>
              <h3 className="text-slate-400 font-bold text-xs uppercase">Total Potential SR&ED Yield</h3>
              <div className="text-4xl sm:text-5xl font-black text-emerald-400 font-mono">
                ${Math.round(totalSredRefund).toLocaleString()}
              </div>
            </div>

            <hr className="border-white/10" />

            <div className="space-y-3 text-xs sm:text-sm text-slate-300 relative z-10">
              <div className="flex justify-between">
                <span>Federal CCPC Refund (35%):</span>
                <span className="font-mono text-white">${Math.round(federalRefund).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Provincial Refund ({provRate * 100}%):</span>
                <span className="font-mono text-white">${Math.round(provincialRefund).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-400 italic">
                <span>Assumes Proxy Overhead Option:</span>
                <span>Active</span>
              </div>
            </div>

            <hr className="border-white/10" />

            <div className="space-y-4 relative z-10">
              <p className="text-xs text-slate-400 leading-relaxed">
                *This is an estimation. Exact yields depend on CCPC status, taxable capital limits, and contemporaneous documentation logs.
              </p>
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

            <div className="space-y-1 relative z-10">
              <Badge className="bg-emerald-600 text-white border-none font-bold uppercase tracking-wider text-[9px]">SWPP Subsidy Estimate</Badge>
              <h3 className="text-slate-400 font-bold text-xs uppercase">Potential Grant Support</h3>
              <div className="text-4xl sm:text-5xl font-black text-emerald-400 font-mono">
                ${Math.round(estimatedHiringGrant).toLocaleString()}
              </div>
            </div>

            <hr className="border-white/10" />

            <div className="space-y-3 text-xs sm:text-sm text-slate-300 relative z-10">
              <div className="flex justify-between">
                <span>Total Gross Wages:</span>
                <span className="font-mono text-white">${Math.round(totalWageCost).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Matching Grant (Up to 70%):</span>
                <span className="font-mono text-emerald-400">+${Math.round(estimatedHiringGrant).toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-bold border-t border-white/10 pt-2">
                <span>Net Corporate Cost:</span>
                <span className="font-mono text-white">${Math.round(netHiringCost).toLocaleString()}</span>
              </div>
            </div>

            <hr className="border-white/10" />

            <div className="space-y-4 relative z-10">
              <p className="text-xs text-slate-400 leading-relaxed">
                *Estimation based on federal student co-op placement matching rules. Students must be enrolled in recognized post-secondary institutions.
              </p>
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
