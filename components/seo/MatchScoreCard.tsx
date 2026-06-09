import React from "react"
import { CheckCircle2, AlertTriangle, HelpCircle, ShieldAlert, Award, AlertCircle } from "lucide-react"
import type { MatchResult } from "@/lib/leads/MatchScoreEngine"

interface MatchScoreCardProps {
  result: MatchResult
}

export function MatchScoreCard({ result }: MatchScoreCardProps) {
  const isEligible = result.status === "Eligible"

  // Fit Band UI Styling Configurations
  const bandStyles = {
    Excellent: {
      bg: "bg-emerald-50/70 border-emerald-200 text-emerald-950",
      ringColor: "text-emerald-600",
      trackColor: "text-emerald-100",
      badge: "bg-emerald-600 text-white",
      icon: Award
    },
    Strong: {
      bg: "bg-blue-50/70 border-blue-200 text-blue-950",
      ringColor: "text-blue-600",
      trackColor: "text-blue-100",
      badge: "bg-blue-600 text-white",
      icon: CheckCircle2
    },
    Moderate: {
      bg: "bg-slate-50/70 border-slate-200 text-slate-950",
      ringColor: "text-slate-600",
      trackColor: "text-slate-100",
      badge: "bg-slate-600 text-white",
      icon: HelpCircle
    },
    Limited: {
      bg: "bg-amber-50/70 border-amber-200 text-amber-950",
      ringColor: "text-amber-500",
      trackColor: "text-amber-100",
      badge: "bg-amber-500 text-slate-950",
      icon: AlertTriangle
    },
    None: {
      bg: "bg-rose-50/70 border-rose-200 text-rose-950",
      ringColor: "text-rose-500",
      trackColor: "text-rose-100",
      badge: "bg-rose-500 text-white",
      icon: ShieldAlert
    }
  }

  const activeStyle = bandStyles[result.fitBand] || bandStyles.None
  const IconComponent = activeStyle.icon

  // SVG circular path setup
  const radius = 34
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (result.score / 100) * circumference

  return (
    <div className={`border rounded-2xl p-6 ${activeStyle.bg} shadow-xs space-y-6 transition-all duration-300 hover:shadow-md`}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-white/80 border border-slate-200 shadow-xs">
            <IconComponent className="h-6 w-6 text-slate-800 shrink-0" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Evaluation Result</span>
            <div className="flex items-center gap-2 mt-0.5">
              <h3 className="text-xl font-black tracking-tight text-slate-900">
                {isEligible ? `${result.fitBand} Match` : "Not Eligible"}
              </h3>
              {isEligible && (
                <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${activeStyle.badge}`}>
                  Active
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Circular Progress Ring */}
        {isEligible && (
          <div className="relative flex items-center justify-center shrink-0">
            <svg className="w-20 h-20 transform -rotate-90">
              <circle
                cx="40"
                cy="40"
                r={radius}
                className={`stroke-current ${activeStyle.trackColor}`}
                strokeWidth="7"
                fill="transparent"
              />
              <circle
                cx="40"
                cy="40"
                r={radius}
                className={`stroke-current ${activeStyle.ringColor} transition-all duration-1000 ease-out`}
                strokeWidth="7"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute text-sm font-black text-slate-900">
              {result.score}%
            </div>
          </div>
        )}
      </div>

      {/* Opportunity Values & Program Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-y border-slate-200/60 py-4 text-xs font-semibold text-slate-700">
        <div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">Potential Yield</span>
          <span className="text-sm font-extrabold text-slate-900">{result.potentialOpportunity}</span>
        </div>
        <div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">Filing Difficulty</span>
          <span className="text-sm font-extrabold text-slate-900">{result.difficulty}</span>
        </div>
        <div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">Engine Confidence</span>
          <span className="text-sm font-extrabold text-slate-900">{result.confidence}</span>
        </div>
      </div>

      {/* Explanations Checklist */}
      <div className="space-y-3">
        <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider">Verification Checklist</h4>
        <ul className="space-y-2.5 text-xs text-slate-700 font-semibold">
          {result.explanations.map((reason, idx) => {
            const isWarning = reason.startsWith("⚠")
            const isFail = reason.startsWith("✖")
            return (
              <li key={idx} className="flex items-start gap-2">
                {isFail ? (
                  <AlertCircle className="h-4.5 w-4.5 text-rose-500 shrink-0 mt-0.5" />
                ) : isWarning ? (
                  <AlertTriangle className="h-4.5 w-4.5 text-amber-500 shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600 shrink-0 mt-0.5" />
                )}
                <span className={isFail ? "text-rose-900" : isWarning ? "text-amber-900" : "text-slate-800"}>
                  {reason.replace(/^[✓⚠✖]\s*/, "")}
                </span>
              </li>
            )
          })}
        </ul>
      </div>
      
      <div className="flex items-start gap-2 bg-white/40 border border-slate-200/50 rounded-xl p-3 text-[10px] text-slate-500 font-medium">
        <ShieldAlert className="h-4 w-4 shrink-0 text-slate-400 mt-0.5" />
        <p>
          Matches are calculated programmatically using your business profile. Real-world qualification and audit approvals depend on official agency assessments and compliant project filings.
        </p>
      </div>
    </div>
  )
}
