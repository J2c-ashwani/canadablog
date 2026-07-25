"use client"

import React, { useState } from "react"
import { AlertTriangle, CheckCircle2, XCircle, ShieldAlert, ArrowRight, ExternalLink } from "lucide-react"

interface ExceptionItem {
  id: string
  trigger: string
  buyerSegment: string
  recommendedProduct: string
  trustScore: number
  reasons: string[]
  evidenceUrl: string
  createdAt: string
}

export default function ExceptionQueueDashboard() {
  const [exceptions, setExceptions] = useState<ExceptionItem[]>([
    {
      id: "opp_exc_001",
      trigger: "Unverified Funding Claim: Guaranteed $50,000 Free Money Grant",
      buyerSegment: "Canadian Business Owner",
      recommendedProduct: "$19 Match Report",
      trustScore: 45,
      reasons: [
        "Evidence domain 'https://some-unverified-blog.com' is not in verified official list.",
        "Prohibited claim terms detected ('guaranteed' / 'free money').",
      ],
      evidenceUrl: "https://some-unverified-blog.com/grants-2026",
      createdAt: "2026-07-25T15:30:00Z",
    },
  ])

  const [resolvedCount, setResolvedCount] = useState(0)

  const handleApprove = (id: string) => {
    setExceptions((prev) => prev.filter((item) => item.id !== id))
    setResolvedCount((prev) => prev + 1)
  }

  const handleReject = (id: string) => {
    setExceptions((prev) => prev.filter((item) => item.id !== id))
    setResolvedCount((prev) => prev + 1)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-6 gap-4">
          <div>
            <div className="flex items-center gap-3">
              <ShieldAlert className="w-8 h-8 text-amber-500" />
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                Growth OS — Founder Exception Queue
              </h1>
            </div>
            <p className="text-slate-400 text-sm mt-1">
              Zero routine button clicking. You are interrupted ONLY for high-risk or low-confidence exceptions.
            </p>
          </div>
          <div className="flex items-center gap-4 bg-slate-900 px-4 py-2 rounded-lg border border-slate-800">
            <span className="text-sm text-slate-400">Pending Exceptions:</span>
            <span className="text-xl font-bold text-amber-400">{exceptions.length}</span>
          </div>
        </div>

        {/* Content Area */}
        {exceptions.length === 0 ? (
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-12 text-center space-y-4">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
            <h2 className="text-xl font-semibold text-white">Zero Active Exceptions</h2>
            <p className="text-slate-400 max-w-md mx-auto text-sm">
              Growth OS is executing routine high-confidence campaigns automatically within verified safety guardrails. No action required.
            </p>
            {resolvedCount > 0 && (
              <p className="text-xs text-emerald-400 font-mono">
                {resolvedCount} exception(s) resolved in this session.
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Active Exception Alerts ({exceptions.length})
            </h2>

            {exceptions.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900 border border-amber-500/30 rounded-xl p-6 space-y-4 shadow-lg hover:border-amber-500/50 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-2">
                      Trust Score: {item.trustScore}/100
                    </span>
                    <h3 className="text-lg font-bold text-white">{item.trigger}</h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Segment: <span className="text-slate-200">{item.buyerSegment}</span> | Product: <span className="text-slate-200">{item.recommendedProduct}</span>
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleReject(item.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-lg text-sm font-semibold transition-all"
                    >
                      <XCircle className="w-4 h-4" /> Reject Opportunity
                    </button>
                    <button
                      onClick={() => handleApprove(item.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg text-sm font-semibold transition-all"
                    >
                      <CheckCircle2 className="w-4 h-4" /> Override & Approve
                    </button>
                  </div>
                </div>

                {/* Safety Audit Failure Reasons */}
                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                    Safety Audit Warnings
                  </span>
                  <ul className="space-y-1 text-sm text-slate-300 list-disc list-inside">
                    {item.reasons.map((reason, idx) => (
                      <li key={idx} className="text-amber-300">{reason}</li>
                    ))}
                  </ul>
                  {item.evidenceUrl && (
                    <div className="pt-2">
                      <a
                        href={item.evidenceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:underline"
                      >
                        Inspect Source URL <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
