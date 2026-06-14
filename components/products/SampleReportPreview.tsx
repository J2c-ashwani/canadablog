"use client"

import { Lock, CheckCircle, Star, TrendingUp, FileText, BarChart3 } from 'lucide-react'

/**
 * SampleReportPreview
 * 
 * Shows a realistic visual preview of what the Funding Match Report contains.
 * Displayed BEFORE payment so buyers can see the deliverable they're purchasing.
 * Uses example data — not the buyer's actual data.
 */
export function SampleReportPreview() {
  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <FileText className="w-5 h-5 text-emerald-400" />
          <span className="font-semibold text-white text-sm">Sample Funding Match Report</span>
        </div>
        <span className="text-xs text-slate-400 bg-slate-700/60 px-2.5 py-1 rounded-full">Preview</span>
      </div>

      {/* Summary Bar */}
      <div className="bg-emerald-50 border-b border-emerald-100 px-5 py-3 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
            <BarChart3 className="w-4 h-4" />
            8 Programs Matched
          </span>
          <span className="text-emerald-600">
            Est. Range: <strong>$75,000 – $350,000</strong>
          </span>
        </div>
        <span className="text-xs font-medium text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
          Readiness: 82/100
        </span>
      </div>

      {/* Example Program Cards */}
      <div className="divide-y divide-gray-100">
        {/* Program 1 - Visible */}
        <div className="px-5 py-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">#1</span>
                <h4 className="font-semibold text-slate-800 text-sm truncate">SR&ED Tax Credit</h4>
              </div>
              <p className="text-xs text-slate-500 mb-2">Canada Revenue Agency (CRA)</p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">$50K – $150K</span>
                <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                  <Star className="w-3 h-3" /> Strong Match
                </span>
                <span className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full">Tax Credit</span>
              </div>
            </div>
            <TrendingUp className="w-5 h-5 text-emerald-500 shrink-0 mt-1" />
          </div>
        </div>

        {/* Program 2 - Visible */}
        <div className="px-5 py-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">#2</span>
                <h4 className="font-semibold text-slate-800 text-sm truncate">IRAP Innovation Grant</h4>
              </div>
              <p className="text-xs text-slate-500 mb-2">National Research Council</p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">$25K – $75K</span>
                <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                  <Star className="w-3 h-3" /> Good Match
                </span>
                <span className="bg-violet-50 text-violet-700 px-2 py-0.5 rounded-full">Grant</span>
              </div>
            </div>
            <TrendingUp className="w-5 h-5 text-blue-500 shrink-0 mt-1" />
          </div>
        </div>

        {/* Programs 3-8 - Blurred/Locked */}
        <div className="relative px-5 py-4">
          <div className="filter blur-[3px] select-none pointer-events-none space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">#3</span>
              <div className="h-4 w-48 bg-slate-200 rounded" />
            </div>
            <div className="flex gap-2">
              <div className="h-5 w-24 bg-blue-100 rounded-full" />
              <div className="h-5 w-20 bg-emerald-100 rounded-full" />
            </div>
          </div>
          <div className="filter blur-[3px] select-none pointer-events-none space-y-3 mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">#4</span>
              <div className="h-4 w-40 bg-slate-200 rounded" />
            </div>
            <div className="flex gap-2">
              <div className="h-5 w-28 bg-blue-100 rounded-full" />
              <div className="h-5 w-24 bg-amber-100 rounded-full" />
            </div>
          </div>

          {/* Lock Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-[1px]">
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 shadow-sm">
              <Lock className="w-4 h-4 text-slate-500" />
              <span className="text-sm font-medium text-slate-600">+ 6 more programs in your report</span>
            </div>
          </div>
        </div>
      </div>

      {/* What's Included Footer */}
      <div className="border-t border-gray-100 bg-gray-50 px-5 py-4">
        <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2.5">Your report includes:</p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
          {[
            'Programs you may qualify for',
            'Estimated funding ranges',
            'Required documents',
            'Application difficulty',
            'Recommended next steps',
            'Funding readiness score',
            'Priority ranking',
          ].map((item) => (
            <div key={item} className="flex items-center gap-1.5 text-xs text-slate-600">
              <CheckCircle className="w-3 h-3 text-emerald-500 shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
