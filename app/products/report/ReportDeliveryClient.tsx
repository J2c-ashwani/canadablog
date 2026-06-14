"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState, Suspense } from "react"
import {
  CheckCircle, Loader2, Star, FileText, TrendingUp,
  ArrowRight, AlertCircle, BarChart3, Lock
} from "lucide-react"
import { Button } from "@/components/ui/button"
import type { FundingMatchReport, ReportProgram } from "@/lib/products/report-generator"

function ReportContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<FundingMatchReport | null>(null);
  const [purchaseInfo, setPurchaseInfo] = useState<any>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPDF = async () => {
    if (!report) return;
    setIsDownloading(true);
    try {
      const { generateFundingMatchReportPDF } = await import('@/lib/products/report-pdf');
      const doc = generateFundingMatchReportPDF(report, purchaseInfo?.name || 'Founder');
      doc.save(`Funding-Match-Report-${report.profile.province}-${report.profile.industry}.pdf`);
      
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'report_pdf_downloaded', { token });
      }
    } catch (err) {
      console.error("Failed to generate PDF:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      setError("No access token provided. Please use the link from your purchase confirmation email.");
      setLoading(false);
      return;
    }

    const loadReport = async () => {
      try {
        const res = await fetch(`/api/products/verify?token=${encodeURIComponent(token)}`);
        const json = await res.json();

        if (!res.ok || json.error) {
          setError(json.error || "Unable to verify your purchase. Please contact support@fsidigital.ca");
          return;
        }

        setReport(json.report);
        setPurchaseInfo(json.purchase);

        // GA4 event
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'report_opened', { method: 'standalone_page' });
        }
      } catch (err) {
        console.error("Failed to load report:", err);
        setError("Unable to load your report. Please try again or contact support@fsidigital.ca");
      } finally {
        setLoading(false);
      }
    };

    loadReport();
  }, [token]);

  // --- Loading State ---
  if (loading) {
    return (
      <div className="text-center py-16">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mx-auto mb-4" />
        <p className="text-slate-600 font-medium">Loading your report...</p>
      </div>
    );
  }

  // --- Error State ---
  if (error) {
    return (
      <div className="text-center py-16 space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-50 rounded-full mb-3">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>
        <h2 className="text-xl font-bold text-slate-800">Unable to Access Report</h2>
        <p className="text-slate-500 max-w-md mx-auto">{error}</p>
        <div className="flex items-center justify-center gap-3 pt-4">
          <a href="/calculator" className="text-sm text-emerald-600 hover:text-emerald-700 underline underline-offset-2">
            Get a new report
          </a>
          <span className="text-slate-300">·</span>
          <a href="mailto:support@fsidigital.ca" className="text-sm text-slate-500 hover:text-slate-700 underline underline-offset-2">
            Contact support
          </a>
        </div>
      </div>
    );
  }

  if (!report) return null;

  // --- Report Display ---
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-emerald-100 rounded-full mb-3">
          <FileText className="w-7 h-7 text-emerald-600" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Your Funding Match Report</h1>
        {purchaseInfo && (
          <p className="text-sm text-slate-500 mt-1">
            Prepared for {purchaseInfo.name} · {new Date(report.generatedAt).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        )}
        <div className="mt-4 flex justify-center">
          <Button
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium flex items-center gap-2 shadow-sm"
          >
            {isDownloading ? (
              <>
                <Loader2 className="w-4.5 h-4.5 animate-spin" />
                Generating PDF...
              </>
            ) : (
              <>
                <FileText className="w-4.5 h-4.5" />
                Download PDF Report
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Profile Summary */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-0.5">Region</p>
            <p className="font-semibold text-slate-700">{report.profile.provinceName}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-0.5">Industry</p>
            <p className="font-semibold text-slate-700">{report.profile.industryName}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-0.5">Revenue</p>
            <p className="font-semibold text-slate-700">{report.profile.revenueName}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-0.5">Goal</p>
            <p className="font-semibold text-slate-700">{report.profile.goalName}</p>
          </div>
        </div>
      </div>

      {/* Summary Banner */}
      <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 text-white rounded-xl p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-xs uppercase tracking-wider text-emerald-200 font-medium mb-1">Total Estimated Funding Range</p>
            <p className="text-2xl sm:text-3xl font-bold">
              ${report.summary.estimatedTotalMin.toLocaleString()} – ${report.summary.estimatedTotalMax.toLocaleString()}
            </p>
          </div>
          <div className="flex gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold">{report.summary.totalPrograms}</p>
              <p className="text-xs text-emerald-200">Programs</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{report.summary.readinessScore}<span className="text-lg opacity-70">/100</span></p>
              <p className="text-xs text-emerald-200">Readiness</p>
            </div>
          </div>
        </div>
      </div>

      {/* Program Cards */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-emerald-600" />
          Matched Programs ({report.programs.length})
        </h2>

        {report.programs.map((prog, i) => (
          <div key={prog.id || i} className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            {/* Program Header */}
            <div className="p-4 sm:p-5 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                      prog.matchStrength === 'Strong Match' ? 'bg-emerald-100 text-emerald-700' :
                      prog.matchStrength === 'Good Match' ? 'bg-blue-100 text-blue-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>#{i + 1}</span>
                    <h3 className="font-bold text-slate-800">{prog.name}</h3>
                  </div>
                  <p className="text-sm text-slate-500">{prog.agency}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-bold text-emerald-700">{prog.estimatedRange || prog.fundingAmount}</p>
                  <p className="text-xs text-slate-500">{prog.fundingType}</p>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 text-xs">
                <span className={`px-2.5 py-1 rounded-full font-medium flex items-center gap-1 ${
                  prog.matchStrength === 'Strong Match' ? 'bg-emerald-50 text-emerald-700' :
                  prog.matchStrength === 'Good Match' ? 'bg-blue-50 text-blue-700' :
                  'bg-amber-50 text-amber-700'
                }`}>
                  <Star className="w-3 h-3" />{prog.matchStrength}
                </span>
                <span className={`px-2.5 py-1 rounded-full ${
                  prog.difficulty === 'Low' ? 'bg-green-50 text-green-700' :
                  prog.difficulty === 'Moderate' ? 'bg-amber-50 text-amber-700' :
                  'bg-red-50 text-red-700'
                }`}>
                  Difficulty: {prog.difficulty}
                </span>
                <span className="bg-slate-50 text-slate-600 px-2.5 py-1 rounded-full">
                  {prog.deadline || prog.status}
                </span>
              </div>

              {/* Match Reason */}
              {prog.matchReason && (
                <div className="bg-slate-50 rounded-lg p-3 text-sm text-slate-600">
                  <p className="text-xs font-semibold text-slate-500 mb-1">Why This Matches</p>
                  {prog.matchReason}
                </div>
              )}
            </div>

            {/* Requirements + Steps */}
            <div className="border-t border-slate-100 bg-slate-50/50 p-4 sm:p-5 grid sm:grid-cols-2 gap-4">
              {/* Requirements */}
              {prog.requiredDocuments && prog.requiredDocuments.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Eligibility Requirements</p>
                  <ul className="text-xs text-slate-600 space-y-1.5">
                    {prog.requiredDocuments.map((doc, j) => (
                      <li key={j} className="flex items-start gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Application Steps */}
              {prog.applicationSteps && prog.applicationSteps.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Application Steps</p>
                  <ol className="text-xs text-slate-600 space-y-1.5">
                    {prog.applicationSteps.map((step, j) => (
                      <li key={j} className="flex items-start gap-1.5">
                        <span className="text-emerald-600 font-bold shrink-0 w-4">{j + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ═══════ UPSELL TO $199 AUDIT ═══════ */}
      <div className="border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-white rounded-2xl p-6 sm:p-8 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
          $19 Credit Active
        </div>
        <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-100 rounded-full mb-4">
          <TrendingUp className="w-7 h-7 text-indigo-600" />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">Need Help Applying?</h3>
        <p className="text-sm text-slate-500 mb-5 max-w-lg mx-auto">
          Our funding advisors can help you prepare applications, maximize eligibility, and navigate the process.
          <strong className="block mt-3 text-emerald-700 font-semibold bg-emerald-50 border border-emerald-100 rounded-lg p-3">
            Your $19 Report fee is credited back on booking — verification audit is only $180
          </strong>
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={`/consultation?source=report-upsell&email=${encodeURIComponent(purchaseInfo?.email || '')}&name=${encodeURIComponent(purchaseInfo?.name || '')}`}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors shadow-lg shadow-indigo-200"
            onClick={() => {
              if (typeof window !== 'undefined' && (window as any).gtag) {
                (window as any).gtag('event', 'audit_upsell_clicked', { source: 'standalone_report_page' });
              }
            }}
          >
            Book a $199 Funding Audit <ArrowRight className="w-4 h-4" />
          </a>
          <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold px-3.5 py-2 rounded-full text-xs flex items-center gap-1.5 shadow-sm shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            $19 Coupon Applied (Pay $180)
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-3">100% deposit refund if no programs match</p>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-slate-400 pt-4 pb-8 space-y-1">
        <p>This report is for informational purposes and does not guarantee funding eligibility.</p>
        <p>Program details and amounts are subject to change based on government program updates.</p>
        <p className="pt-2">
          <a href="/" className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2">FSI Digital</a> ·{' '}
          <a href="mailto:support@fsidigital.ca" className="text-slate-500 hover:text-slate-700 underline underline-offset-2">Contact Support</a>
        </p>
      </div>
    </div>
  );
}

export function ReportDeliveryClient() {
  return (
    <Suspense fallback={
      <div className="text-center py-16">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mx-auto mb-4" />
        <p className="text-slate-600 font-medium">Loading your report...</p>
      </div>
    }>
      <ReportContent />
    </Suspense>
  );
}
