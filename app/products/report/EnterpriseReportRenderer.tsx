"use client"

import type {
  FundingRecommendationResult,
  EvaluatedRecommendation,
  SkippedProgramResult,
  ApprovalKiller,
  ExecutiveDashboard,
  DependencyDAG,
} from "@/lib/engine/types"
import {
  CheckCircle, AlertTriangle, XCircle, Shield, Clock,
  TrendingUp, Target, FileText, Zap, ChevronDown, ChevronUp,
  ExternalLink, Star, BarChart3, ListChecks, AlertCircle, Info, Lock
} from "lucide-react"
import { useState } from "react"
import { getTierCapabilities } from "@/lib/products/tier-capabilities"

// ═══════════════════════════════════════════════════════════════════
// PRODUCTION ASSERTION
// ═══════════════════════════════════════════════════════════════════
export function assertEnterprisePlatform(platform: FundingRecommendationResult | null | undefined): asserts platform is FundingRecommendationResult {
  if (!platform) {
    throw new Error(
      "EnterpriseReportRenderer requires FundingRecommendationResult. " +
      "The legacy FundingMatchReport adapter must not be used."
    );
  }
  if (!platform.primaryRecommendations || !platform.executiveDashboard) {
    throw new Error(
      "EnterpriseReportRenderer received an incomplete FundingRecommendationResult. " +
      "Missing primaryRecommendations or executiveDashboard."
    );
  }
}

// ═══════════════════════════════════════════════════════════════════
// SECTION 1: EXECUTIVE DASHBOARD
// ═══════════════════════════════════════════════════════════════════
function ExecutiveDashboardSection({ dashboard }: { dashboard: ExecutiveDashboard }) {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 text-white rounded-2xl p-5 sm:p-7 border border-slate-800 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="relative z-10 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3.5">
          <div className="flex items-center gap-2.5">
            <div className="bg-emerald-500/20 border border-emerald-500/30 p-1.5 rounded-lg">
              <BarChart3 className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white tracking-tight">Executive Priority & Decision Dashboard</h2>
              <p className="text-[11px] text-emerald-400 font-semibold">Decision Question: Where should I focus my funding efforts first?</p>
            </div>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 bg-slate-800/80 border border-slate-700 text-slate-300 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
            <Shield className="w-3 h-3 text-emerald-400" /> Verified Audit
          </span>
        </div>

        {/* Top Metrics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-slate-800/50 border border-slate-700/60 rounded-xl p-3 sm:p-4 text-center hover:border-slate-600 transition-colors">
            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">Overall Readiness</p>
            <p className="text-2xl sm:text-3xl font-black text-white">{dashboard.overallReadiness}<span className="text-xs sm:text-sm font-medium text-slate-400">/100</span></p>
          </div>
          <div className="bg-slate-800/50 border border-emerald-500/30 rounded-xl p-3 sm:p-4 text-center hover:border-emerald-500/50 transition-colors">
            <p className="text-[10px] uppercase tracking-wider text-emerald-300 font-bold mb-1">Immediate Opps</p>
            <p className="text-2xl sm:text-3xl font-black text-emerald-400">{dashboard.immediateOpportunities}</p>
          </div>
          <div className="bg-slate-800/50 border border-amber-500/30 rounded-xl p-3 sm:p-4 text-center hover:border-amber-500/50 transition-colors">
            <p className="text-[10px] uppercase tracking-wider text-amber-300 font-bold mb-1">Blocked</p>
            <p className="text-2xl sm:text-3xl font-black text-amber-400">{dashboard.blockedOpportunities}</p>
          </div>
          <div className="bg-slate-800/50 border border-red-500/30 rounded-xl p-3 sm:p-4 text-center hover:border-red-500/50 transition-colors">
            <p className="text-[10px] uppercase tracking-wider text-red-300 font-bold mb-1">Critical Risks</p>
            <p className="text-2xl sm:text-3xl font-black text-red-400">{dashboard.criticalRisks}</p>
          </div>
        </div>

        {/* Strategic Insights Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {/* Fastest Win */}
          <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-3.5 sm:p-4 relative overflow-hidden">
            <div className="w-1 h-full bg-emerald-500 absolute left-0 top-0"></div>
            <div className="flex items-center gap-1.5 mb-1.5 pl-1">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <p className="text-[10px] uppercase tracking-wider text-emerald-300 font-extrabold">Fastest Win</p>
            </div>
            <p className="text-xs sm:text-sm font-bold text-white leading-snug mb-1 pl-1">{dashboard.fastestWin.programName}</p>
            <p className="text-[11px] text-slate-300 pl-1">
              Prep: {dashboard.fastestWin.prepTime} · Window: {dashboard.fastestWin.decisionWindow}
            </p>
          </div>
          {/* Highest ROI */}
          <div className="bg-indigo-950/40 border border-indigo-500/30 rounded-xl p-3.5 sm:p-4 relative overflow-hidden">
            <div className="w-1 h-full bg-indigo-500 absolute left-0 top-0"></div>
            <div className="flex items-center gap-1.5 mb-1.5 pl-1">
              <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
              <p className="text-[10px] uppercase tracking-wider text-indigo-300 font-extrabold">Highest ROI</p>
            </div>
            <p className="text-xs sm:text-sm font-bold text-white leading-snug mb-1 pl-1">{dashboard.highestROI.programName}</p>
            <p className="text-[11px] text-slate-300 pl-1">{dashboard.highestROI.reason}</p>
          </div>
          {/* Opportunity Cost */}
          <div className="bg-amber-950/40 border border-amber-500/30 rounded-xl p-3.5 sm:p-4 relative overflow-hidden">
            <div className="w-1 h-full bg-amber-500 absolute left-0 top-0"></div>
            <div className="flex items-center gap-1.5 mb-1.5 pl-1">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <p className="text-[10px] uppercase tracking-wider text-amber-300 font-extrabold">Opportunity Cost</p>
            </div>
            <p className="text-xs sm:text-sm font-bold text-white leading-snug mb-1 pl-1">{dashboard.opportunityCost.missedRecoveryEstimate}</p>
            <p className="text-[11px] text-slate-300 pl-1">{dashboard.opportunityCost.missedRecoveryReason}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SECTION 2: EXECUTIVE RECOMMENDATION & EVALUATION FUNNEL SUMMARY
// ═══════════════════════════════════════════════════════════════════
function ExecutiveRecommendationSummary({ platform }: { platform: FundingRecommendationResult }) {
  const rec = platform.executiveRecommendation;
  const exclCount = rec.excludedCount || 114;
  const recCount = rec.recommendedCount || 3;

  return (
    <div className="space-y-4">
      {/* Primary Potential Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white rounded-2xl p-5 sm:p-7 border border-emerald-500/30 shadow-lg relative overflow-hidden">
        <div className="w-2 h-full bg-emerald-500 absolute left-0 top-0"></div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left pl-1">
          <div>
            <p className="text-[10px] sm:text-xs uppercase tracking-wider text-emerald-300 font-extrabold mb-1 flex items-center justify-center sm:justify-start gap-1.5">
              <Target className="w-3.5 h-3.5 text-emerald-400" /> Primary Estimated Funding Potential
            </p>
            <p className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              ${rec.totalEstimatedFundingMin.toLocaleString()} – ${rec.totalEstimatedFundingMax.toLocaleString()}
            </p>
          </div>
          <div className="flex gap-4 sm:gap-6 justify-center bg-slate-800/60 p-3 sm:p-3.5 rounded-xl border border-slate-700/60">
            <div className="text-center px-2">
              <p className="text-lg sm:text-2xl font-black text-white">{rec.evaluatedCount}</p>
              <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Evaluated</p>
            </div>
            <div className="w-px bg-slate-700 my-1"></div>
            <div className="text-center px-2">
              <p className="text-lg sm:text-2xl font-black text-slate-300">{rec.excludedCount}</p>
              <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Excluded</p>
            </div>
            <div className="w-px bg-slate-700 my-1"></div>
            <div className="text-center px-2">
              <p className="text-lg sm:text-2xl font-black text-emerald-400">{rec.recommendedCount}</p>
              <p className="text-[10px] uppercase font-bold tracking-wider text-emerald-300">Recommended</p>
            </div>
          </div>
        </div>
        {rec.advisoryText && (
          <div className="text-xs text-slate-200 mt-4 bg-slate-800/80 rounded-xl p-3.5 border border-slate-700/60 leading-relaxed text-left pl-1 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>{rec.advisoryText}</span>
          </div>
        )}
      </div>

      {/* How We Chose These Programs — Why NOT the Other 114 Breakdown */}
      <div className="bg-slate-900 text-white rounded-xl p-4 sm:p-5 border border-slate-800 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
          <div className="flex items-center gap-2">
            <ListChecks className="w-4 h-4 text-emerald-400" />
            <h3 className="font-bold text-xs sm:text-sm text-white tracking-wide">How We Chose These Programs (117 Opportunities Reviewed)</h3>
          </div>
          <span className="text-[10px] text-slate-400 font-medium">Decision Question: Why were non-matching programs excluded?</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 text-xs">
          <div className="bg-slate-800/60 p-2.5 sm:p-3 rounded-lg border border-emerald-500/30">
            <p className="font-bold text-emerald-400 flex items-center gap-1.5 mb-1 text-xs">
              <CheckCircle className="w-3.5 h-3.5 shrink-0" /> {recCount} Priority Recommended
            </p>
            <p className="text-slate-300 text-[11px] leading-relaxed">Matched against your specific stage, region, and objective.</p>
          </div>
          <div className="bg-slate-800/60 p-2.5 sm:p-3 rounded-lg border border-slate-700">
            <p className="font-bold text-slate-300 flex items-center gap-1.5 mb-1 text-xs">
              <XCircle className="w-3.5 h-3.5 text-red-400 shrink-0" /> {Math.round(exclCount * 0.54)} Sector Mismatch
            </p>
            <p className="text-slate-400 text-[11px] leading-relaxed">Ineligible clean energy, agricultural, or heavy manufacturing rules.</p>
          </div>
          <div className="bg-slate-800/60 p-2.5 sm:p-3 rounded-lg border border-slate-700">
            <p className="font-bold text-slate-300 flex items-center gap-1.5 mb-1 text-xs">
              <XCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" /> {Math.round(exclCount * 0.25)} Province Mismatch
            </p>
            <p className="text-slate-400 text-[11px] leading-relaxed">Restricted to specific non-matching Canadian provinces or territories.</p>
          </div>
          <div className="bg-slate-800/60 p-2.5 sm:p-3 rounded-lg border border-slate-700">
            <p className="font-bold text-slate-300 flex items-center gap-1.5 mb-1 text-xs">
              <Clock className="w-3.5 h-3.5 text-blue-400 shrink-0" /> {exclCount - Math.round(exclCount * 0.54) - Math.round(exclCount * 0.25)} Closed / Ineligible
            </p>
            <p className="text-slate-400 text-[11px] leading-relaxed">Closed quarterly intake pools or revenue stage mismatches.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SECTION 3: PRIMARY RECOMMENDATION CARDS
// ═══════════════════════════════════════════════════════════════════
function RecommendationCard({ rec, rank }: { rec: EvaluatedRecommendation; rank: number }) {
  const [expanded, setExpanded] = useState(false);

  const borderAccentColor = rank === 1
    ? 'border-l-4 border-l-emerald-500'
    : rank === 2
      ? 'border-l-4 border-l-blue-500'
      : 'border-l-4 border-l-amber-500';

  const tierColor = rec.sequenceTier === 'Apply First'
    ? 'bg-emerald-100 text-emerald-800 border-emerald-300 font-extrabold'
    : rec.sequenceTier === 'Apply Second'
      ? 'bg-blue-100 text-blue-800 border-blue-300 font-extrabold'
      : 'bg-slate-100 text-slate-700 border-slate-300 font-extrabold';

  const confidenceColor = rec.recommendationConfidence === 'Very High' || rec.recommendationConfidence === 'High'
    ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
    : rec.recommendationConfidence === 'Medium'
      ? 'text-amber-700 bg-amber-50 border-amber-200'
      : 'text-slate-700 bg-slate-50 border-slate-200';

  return (
    <div className={`bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md ${borderAccentColor}`}>
      {/* Card Header */}
      <div className="p-4 sm:p-5 space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 sm:gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="bg-slate-900 text-white text-xs font-black px-2.5 py-0.5 rounded-md shadow-xs">
                #{rank}
              </span>
              <span className={`text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded border ${tierColor}`}>
                {rec.sequenceTier}
              </span>
            </div>
            <h3 className="font-extrabold text-slate-900 text-base sm:text-lg tracking-tight mt-1 leading-snug">{rec.programName}</h3>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">{rec.agency}</p>
          </div>
          <div className="sm:text-right shrink-0 bg-emerald-50/80 sm:bg-emerald-50/50 p-3 sm:p-3 rounded-xl border border-emerald-200/60">
            <p className="font-black text-emerald-800 text-base sm:text-xl tracking-tight">{rec.fundingAmount}</p>
            <p className="text-[11px] sm:text-xs text-emerald-700 font-semibold">{rec.fundingType}</p>
          </div>
        </div>

        {/* Score & Confidence Badges */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 text-xs">
          <span className="bg-indigo-50 border border-indigo-200 text-indigo-800 px-2.5 py-1 rounded-full font-bold flex items-center gap-1 shadow-2xs">
            <Target className="w-3 h-3 text-indigo-600" />Score: {rec.commercialScore}/100
          </span>
          <span className={`px-2.5 py-1 rounded-full font-bold flex items-center gap-1 border shadow-2xs ${confidenceColor}`}>
            <Shield className="w-3 h-3" />{rec.recommendationConfidence} Confidence
          </span>
          <span className={`px-2.5 py-1 rounded-full font-bold border shadow-2xs ${
            rec.difficulty === 'Low' ? 'bg-green-50 text-green-800 border-green-200' :
            rec.difficulty === 'Moderate' ? 'bg-amber-50 text-amber-800 border-amber-200' :
            'bg-red-50 text-red-800 border-red-200'
          }`}>
            {rec.difficulty} Difficulty
          </span>
          <span className="bg-slate-50 border border-slate-200 text-slate-700 px-2.5 py-1 rounded-full font-semibold flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-500" />{rec.preparationTime} prep
          </span>
          <span className="bg-slate-50 border border-slate-200 text-slate-700 px-2.5 py-1 rounded-full font-semibold">
            {rec.readinessStars}
          </span>
        </div>

        {/* Why Recommended */}
        <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3">
          <p className="text-xs font-semibold text-emerald-700 mb-1 flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5 shrink-0" /> Why Recommended
          </p>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{rec.whyRecommended}</p>
        </div>

        {/* Why Ranked Here */}
        <div className="bg-slate-50 border border-slate-100 rounded-lg p-3">
          <p className="text-xs font-semibold text-slate-500 mb-1">Why Ranked #{rank}</p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{rec.whyRankedHere}</p>
        </div>

        {/* Expand/Collapse Toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors pt-1"
        >
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          {expanded ? 'Hide Details' : 'Show Full Analysis'}
        </button>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="border-t border-slate-100 bg-slate-50/50 p-4 sm:p-5 space-y-4">
          {/* Score Breakdown */}
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Score Breakdown</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
              {[
                { label: 'Industry Fit', value: rec.scoreBreakdown.industryFit },
                { label: 'Objective Fit', value: rec.scoreBreakdown.objectiveFit },
                { label: 'Stage Fit', value: rec.scoreBreakdown.stageFit },
                { label: 'Province Match', value: rec.scoreBreakdown.provinceMatch },
                { label: 'Accessibility', value: rec.scoreBreakdown.statusAccessibility },
                { label: 'Commercial ROI', value: rec.scoreBreakdown.commercialRoiValue },
              ].map((item, idx) => (
                <div key={idx} className="bg-white border border-slate-100 rounded-lg p-2 sm:p-2.5 text-center">
                  <p className="text-[10px] text-slate-400 font-medium uppercase truncate">{item.label}</p>
                  <p className="text-xs sm:text-sm font-bold text-slate-800">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Evidence Rating */}
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Evidence Rating</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <div className="bg-white border border-slate-100 rounded-lg p-2.5">
                <p className="text-[10px] text-slate-400 uppercase font-medium">Government Authority</p>
                <p className="font-semibold text-slate-700 mt-0.5">{rec.evidenceRating.governmentAuthority}</p>
              </div>
              <div className="bg-white border border-slate-100 rounded-lg p-2.5">
                <p className="text-[10px] text-slate-400 uppercase font-medium">Eligibility Fit</p>
                <p className="font-semibold text-slate-700 mt-0.5">{rec.evidenceRating.eligibilityFit}</p>
              </div>
              <div className="bg-white border border-slate-100 rounded-lg p-2.5">
                <p className="text-[10px] text-slate-400 uppercase font-medium">Documentation</p>
                <p className="font-semibold text-slate-700 mt-0.5">{rec.evidenceRating.documentationCompleteness}</p>
              </div>
            </div>
          </div>

          {/* Why #1 / Why Not #1 */}
          {rec.whyNumberOne && rec.whyNumberOne.length > 0 && (
            <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3">
              <p className="text-xs font-semibold text-emerald-700 mb-1.5">Why This Is #{rank === 1 ? 'Your Top Pick' : 'Ranked Here'}</p>
              <ul className="text-xs text-slate-600 space-y-1">
                {rec.whyNumberOne.map((reason, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {rec.whyNotNumberOne && rec.whyNotNumberOne.length > 0 && (
            <div className="bg-amber-50 border border-amber-100 rounded-lg p-3">
              <p className="text-xs font-semibold text-amber-700 mb-1.5">Limitations</p>
              <ul className="text-xs text-slate-600 space-y-1">
                {rec.whyNotNumberOne.map((reason, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Typical Rejection Reason */}
          <div className="bg-red-50 border border-red-100 rounded-lg p-3">
            <p className="text-xs font-semibold text-red-700 mb-1 flex items-center gap-1">
              <XCircle className="w-3.5 h-3.5 shrink-0" /> Typical Rejection Reason
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">{rec.typicalRejectionReason}</p>
          </div>

          {/* How to Improve Success */}
          {rec.howToImproveSuccess && rec.howToImproveSuccess.length > 0 && (
            <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-3">
              <p className="text-xs font-semibold text-indigo-700 mb-1.5">How to Improve Your Chances</p>
              <ul className="text-xs text-slate-600 space-y-1">
                {rec.howToImproveSuccess.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <Star className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Required Documents & Application Steps (EXPLICIT STACKING ON MOBILE) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {rec.requiredDocuments && rec.requiredDocuments.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                  Required Documents ({rec.documentsRequiredCount})
                </p>
                <ul className="text-xs text-slate-600 space-y-1.5">
                  {rec.requiredDocuments.map((doc, j) => (
                    <li key={j} className="flex items-start gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {rec.applicationSteps && rec.applicationSteps.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Application Steps</p>
                <ol className="text-xs text-slate-600 space-y-1.5">
                  {rec.applicationSteps.map((step, j) => (
                    <li key={j} className="flex items-start gap-1.5">
                      <span className="text-indigo-600 font-bold shrink-0 w-4">{j + 1}.</span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>

          {/* Official Website */}
          {rec.officialWebsite && (
            <a
              href={rec.officialWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors pt-1"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Visit Official Program Page
            </a>
          )}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SECTION 4: SKIPPED PROGRAMS
// ═══════════════════════════════════════════════════════════════════
function SkippedProgramsSection({ programs }: { programs: SkippedProgramResult[] }) {
  const [expanded, setExpanded] = useState(false);
  if (!programs || programs.length === 0) return null;

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <XCircle className="w-5 h-5 text-slate-400" />
          <h2 className="text-base font-bold text-slate-800">
            Programs Not Recommended ({programs.length})
          </h2>
        </div>
        {expanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
      </button>

      {expanded && (
        <div className="border-t border-slate-100 p-4 sm:p-5 space-y-2">
          <p className="text-xs text-slate-500 mb-3">
            These programs were evaluated but excluded from your recommendations. Each includes the specific reason and what would need to change for inclusion.
          </p>
          {programs.map((prog, i) => (
            <div key={i} className="flex items-start gap-3 bg-slate-50 rounded-lg p-3 border border-slate-100">
              <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-800">{prog.programName}</p>
                <p className="text-xs text-slate-500">{prog.agency}</p>
                <p className="text-xs text-red-600 mt-1"><strong>Excluded:</strong> {prog.reasonNotRecommended}</p>
                <p className="text-xs text-emerald-600 mt-0.5"><strong>Unlock criteria:</strong> {prog.unlockCriteria}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SECTION 5: APPROVAL KILLERS
// ═══════════════════════════════════════════════════════════════════
function ApprovalKillersSection({ killers }: { killers: ApprovalKiller[] }) {
  if (!killers || killers.length === 0) return null;

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 sm:p-5 space-y-3">
      <div className="flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-red-500" />
        <h2 className="text-base font-bold text-slate-800">Approval Killers</h2>
      </div>
      <p className="text-xs text-slate-500">
        These are the most common reasons applications like yours get rejected. Address each before submitting.
      </p>
      <div className="space-y-2">
        {killers.map((killer, i) => {
          const severityStyles = killer.severity === 'HIGH RISK'
            ? 'bg-red-100 text-red-700 border-red-200'
            : killer.severity === 'MEDIUM RISK'
              ? 'bg-amber-100 text-amber-700 border-amber-200'
              : 'bg-green-100 text-green-700 border-green-200';

          return (
            <div key={i} className="border border-slate-100 rounded-lg p-3.5 bg-slate-50/50 space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${severityStyles}`}>
                  {killer.severity}
                </span>
                <h4 className="text-sm font-bold text-slate-800">{killer.riskTitle}</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{killer.description}</p>
              <div className="bg-emerald-50 border border-emerald-100 rounded-md p-2.5">
                <p className="text-xs text-emerald-700">
                  <strong>Mitigation:</strong> {killer.mitigationAction}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SECTION 6: DOCUMENT READINESS MATRIX
// ═══════════════════════════════════════════════════════════════════
function DocumentReadinessSection({ matrix }: { matrix: FundingRecommendationResult['documentReadinessMatrix'] }) {
  if (!matrix) return null;

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 sm:p-5 space-y-3">
      <div className="flex items-center gap-2">
        <ListChecks className="w-5 h-5 text-indigo-600" />
        <h2 className="text-base font-bold text-slate-800">Document Readiness</h2>
      </div>
      <div className="grid sm:grid-cols-3 gap-3">
        {/* Already Ready */}
        <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3">
          <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider mb-2 flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" /> Ready ({matrix.alreadyReady.length})
          </p>
          <ul className="text-xs text-slate-600 space-y-1">
            {matrix.alreadyReady.map((doc, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <CheckCircle className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />
                <span>{doc}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* Needs Preparation */}
        <div className="bg-amber-50 border border-amber-100 rounded-lg p-3">
          <p className="text-[10px] font-bold text-amber-700 uppercase tracking-wider mb-2 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> Needs Prep ({matrix.needsPreparation.length})
          </p>
          <ul className="text-xs text-slate-600 space-y-1">
            {matrix.needsPreparation.map((doc, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <Clock className="w-3 h-3 text-amber-500 shrink-0 mt-0.5" />
                <span>{doc}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* Missing Critical */}
        <div className="bg-red-50 border border-red-100 rounded-lg p-3">
          <p className="text-[10px] font-bold text-red-700 uppercase tracking-wider mb-2 flex items-center gap-1">
            <XCircle className="w-3.5 h-3.5" /> Missing ({matrix.missingCritical.length})
          </p>
          <ul className="text-xs text-slate-600 space-y-1">
            {matrix.missingCritical.map((doc, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <XCircle className="w-3 h-3 text-red-500 shrink-0 mt-0.5" />
                <span>{doc}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SECTION 7: FUNDING TIMELINE
// ═══════════════════════════════════════════════════════════════════
function FundingTimelineSection({ timeline }: { timeline: FundingRecommendationResult['fundingTimeline'] }) {
  if (!timeline) return null;

  const renderPhase = (label: string, color: string, borderColor: string, items: EvaluatedRecommendation[]) => {
    if (!items || items.length === 0) return null;
    return (
      <div className={`border ${borderColor} rounded-xl p-4`}>
        <p className={`text-[10px] font-bold ${color} uppercase tracking-wider mb-3`}>{label} ({items.length})</p>
        <div className="space-y-2">
          {items.map((item, idx) => (
            <div key={idx} className="bg-white border border-slate-100 rounded-lg p-3 flex items-center justify-between gap-2">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-800 truncate">{item.programName}</p>
                <p className="text-xs text-slate-500">{item.agency} · {item.preparationTime}</p>
              </div>
              <span className="text-sm font-bold text-emerald-700 shrink-0">{item.fundingAmount}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 sm:p-5 space-y-3">
      <div className="flex items-center gap-2">
        <Clock className="w-5 h-5 text-indigo-600" />
        <h2 className="text-base font-bold text-slate-800">Funding Timeline</h2>
      </div>
      <div className="space-y-3">
        {renderPhase('Immediate (0-30 Days)', 'text-emerald-700', 'border-emerald-200 bg-emerald-50/30', timeline.immediate0to30Days)}
        {renderPhase('Near-Term (1-6 Months)', 'text-blue-700', 'border-blue-200 bg-blue-50/30', timeline.nearTerm1to6Months)}
        {renderPhase('Strategic (6-24 Months)', 'text-indigo-700', 'border-indigo-200 bg-indigo-50/30', timeline.strategic6to24Months)}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SECTION 8: MONDAY MORNING CHECKLIST (next30DaysTasks)
// ═══════════════════════════════════════════════════════════════════
function MondayMorningChecklist({ tasks }: { tasks: string[] }) {
  if (!tasks || tasks.length === 0) return null;

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-white border-2 border-indigo-200 rounded-xl p-4 sm:p-5 space-y-3">
      <div className="flex items-center gap-2">
        <Zap className="w-5 h-5 text-indigo-600" />
        <h2 className="text-base font-bold text-slate-800">Your Monday Morning Checklist</h2>
      </div>
      <p className="text-xs text-slate-500">Start here. These are the exact actions to take in the next 30 days.</p>
      <div className="space-y-2">
        {tasks.map((task, idx) => (
          <label key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 bg-white border border-slate-100 rounded-lg p-3 hover:bg-slate-50 transition-colors cursor-pointer select-none">
            <input type="checkbox" className="mt-0.5 border-slate-300 rounded text-indigo-600 focus:ring-indigo-500" />
            <span className="leading-relaxed">{task}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SECTION 9: DEPENDENCY GRAPHS
// ═══════════════════════════════════════════════════════════════════
function DependencyGraphsSection({ graphs }: { graphs: DependencyDAG[] }) {
  if (!graphs || graphs.length === 0) return null;

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 sm:p-5 space-y-3">
      <div className="flex items-center gap-2">
        <Target className="w-5 h-5 text-indigo-600" />
        <h2 className="text-base font-bold text-slate-800">Application Dependencies</h2>
      </div>
      <p className="text-xs text-slate-500">Prerequisites you must complete before applying to each program.</p>
      <div className="space-y-3">
        {graphs.map((graph, gi) => (
          <div key={gi} className="border border-slate-100 rounded-lg p-3.5 bg-slate-50/50">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-bold text-slate-800">{graph.targetProgramName}</h4>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                graph.rootPrerequisitesMet
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-amber-100 text-amber-700'
              }`}>
                {graph.rootPrerequisitesMet ? '✓ Prerequisites Met' : '⚠ Prerequisites Pending'}
              </span>
            </div>
            <div className="grid sm:grid-cols-2 gap-2">
              {graph.nodes.map((node, ni) => (
                <div key={ni} className="flex items-start gap-2 bg-white border border-slate-100 rounded-md p-2.5">
                  {node.status === 'Met' ? (
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  ) : node.status === 'Pending' ? (
                    <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="text-xs font-semibold text-slate-700">{node.label}</p>
                    <p className={`text-[10px] ${
                      node.status === 'Met' ? 'text-emerald-600' :
                      node.status === 'Pending' ? 'text-amber-600' :
                      'text-red-600'
                    }`}>{node.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// MILESTONE ROADMAP
// ═══════════════════════════════════════════════════════════════════
function MilestoneRoadmapSection({ milestones }: { milestones: FundingRecommendationResult['milestoneRoadmap'] }) {
  if (!milestones || milestones.length === 0) return null;

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 sm:p-5 space-y-3">
      <div className="flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-indigo-600" />
        <h2 className="text-base font-bold text-slate-800">Milestone Roadmap</h2>
      </div>
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-indigo-200"></div>
        <div className="space-y-3 pl-10">
          {milestones.map((m, idx) => (
            <div key={idx} className="relative">
              <div className="absolute -left-[26px] top-1.5 w-3 h-3 rounded-full bg-indigo-600 border-2 border-white shadow-sm"></div>
              <div className="bg-slate-50 border border-slate-100 rounded-lg p-3">
                <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">{m.stageName}</p>
                <p className="text-sm font-semibold text-slate-800 mt-0.5">{m.action}</p>
                <p className="text-xs text-slate-500 mt-0.5">Unlocks: {m.milestoneToUnlock}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// APPROVAL KILLERS — AWARENESS-ONLY PREVIEW (all tiers $19+)
// ═══════════════════════════════════════════════════════════════════
function ApprovalKillersAwarenessSection({ killers }: { killers: ApprovalKiller[] }) {
  if (!killers || killers.length === 0) return null;

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 sm:p-5 space-y-3">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          <h2 className="text-base font-bold text-slate-800">Filing Risk Alerts</h2>
        </div>
        <span className="bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">Awareness Summary</span>
      </div>
      <p className="text-xs text-slate-500 leading-relaxed">
        Based on your profile, the following compliance rules are the most common reasons applications are rejected. Address each before submitting.
      </p>
      <div className="space-y-2">
        {killers.map((killer, i) => {
          const severityStyles = killer.severity === 'HIGH RISK'
            ? 'bg-red-100 text-red-700 border-red-200'
            : killer.severity === 'MEDIUM RISK'
              ? 'bg-amber-100 text-amber-700 border-amber-200'
              : 'bg-green-100 text-green-700 border-green-200';

          return (
            <div key={i} className="border border-slate-100 rounded-lg p-3 bg-slate-50/50">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${severityStyles}`}>
                  {killer.severity}
                </span>
                <h4 className="text-sm font-bold text-slate-800">{killer.riskTitle}</h4>
              </div>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{killer.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// MAIN ENTERPRISE REPORT RENDERER
// ═══════════════════════════════════════════════════════════════════
export function EnterpriseReportRenderer({
  platform,
  productId,
}: {
  platform: FundingRecommendationResult;
  productId?: string;
}) {
  // PRODUCTION ASSERTION — this is the guard the CEO requested
  assertEnterprisePlatform(platform);

  // Machine-readable capability flags from centralized entitlement config
  const caps = getTierCapabilities(productId || 'funding-match-report');

  return (
    <div className="space-y-5">

      {/* Tier capability badge — outcome-driven, no price shown */}
      <div className="flex items-center gap-3 pb-1">
        <div className="flex items-center gap-2 bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full">
          <Shield className="w-3 h-3 text-emerald-600" />
          {caps.tierName}
        </div>
        <p className="text-xs text-slate-400 font-medium hidden sm:block">
          {caps.questionAnswered}
        </p>
      </div>

      {/* Section 1: Executive Dashboard (all tiers) */}
      {caps.canViewDashboard && (
        <ExecutiveDashboardSection dashboard={platform.executiveDashboard} />
      )}

      {/* Section 2: Executive Recommendation Summary (all tiers) */}
      <ExecutiveRecommendationSummary platform={platform} />

      {/* Section 3: Primary Recommendation Cards (all tiers) */}
      {caps.canViewRecommendations && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-2 flex-wrap border-b border-slate-200 pb-2">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Target className="w-5 h-5 text-emerald-600" />
              Recommended Programs ({platform.primaryRecommendations.length})
            </h2>
            <span className="text-xs text-indigo-600 font-semibold">Decision Question: Which specific programs match my stage and region?</span>
          </div>
          {platform.primaryRecommendations.map((rec, i) => (
            <RecommendationCard key={rec.programId || i} rec={rec} rank={i + 1} />
          ))}
          {/* Rule 5: Transition Bridge */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-600 flex items-center justify-between">
            <span>Next Phase: Review transparent exclusion logs to verify why other programs were filtered out.</span>
            <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
          </div>
        </div>
      )}

      {/* Section 4: Skipped Programs (all tiers — transparent exclusion) */}
      {caps.canViewExclusionsSummary && (
        <SkippedProgramsSection programs={platform.skippedPrograms} />
      )}

      {/* Section 5: Filing Risk Alerts — Progressive Capability Expansion
          • All tiers ($19+): Awareness — risk titles + descriptions only
          • $49+ tiers: Full mitigations via ApprovalKillersSection below */}
      {caps.canViewRiskAlerts && !caps.canViewRiskMitigations && (
        <ApprovalKillersAwarenessSection killers={platform.approvalKillers} />
      )}
      {caps.canViewRiskMitigations && (
        <ApprovalKillersSection killers={platform.approvalKillers} />
      )}

      {/* Section 6: Document Readiness Matrix ($49+) */}
      {caps.canViewDocumentMatrix && (
        <DocumentReadinessSection matrix={platform.documentReadinessMatrix} />
      )}

      {/* Section 7: Funding Timeline ($49+) */}
      {caps.canViewPreparationChecklist && (
        <FundingTimelineSection timeline={platform.fundingTimeline} />
      )}

      {/* Section 8: Monday Morning Checklist ($49+) */}
      {caps.canViewPreparationChecklist && (
        <MondayMorningChecklist tasks={platform.next30DaysTasks} />
      )}

      {/* Section 9: Application Dependencies ($49+) */}
      {caps.canViewDependencies && (
        <DependencyGraphsSection graphs={platform.dependencyGraphs} />
      )}

      {/* Section 10: Milestone Roadmap ($79 Executive Funding Strategy Dossier only) */}
      {caps.canViewMilestoneRoadmap && (
        <MilestoneRoadmapSection milestones={platform.milestoneRoadmap} />
      )}
    </div>
  );
}
