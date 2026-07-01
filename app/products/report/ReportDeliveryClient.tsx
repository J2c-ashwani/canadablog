"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState, Suspense } from "react"
import {
  CheckCircle, Loader2, Star, FileText, TrendingUp,
  ArrowRight, AlertCircle, BarChart3, Lock, Sparkles
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { FundingMatchReport, ReportProgram } from "@/lib/products/report-generator"

function ReportContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<FundingMatchReport | null>(null);
  const [purchaseInfo, setPurchaseInfo] = useState<any>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [hasStrategyUnlocked, setHasStrategyUnlocked] = useState(false);
  const [strategyData, setStrategyData] = useState<any>(null);
  const [hasToolkitUnlocked, setHasToolkitUnlocked] = useState(false);
  const [hasApprovalLibraryUnlocked, setHasApprovalLibraryUnlocked] = useState(false);
  const [activeTab, setActiveTab] = useState<'ranking' | 'timeline' | 'sequence' | 'checklist' | 'risks' | 'actions'>('ranking');
  const [buyerSurveyCompleted, setBuyerSurveyCompleted] = useState(false);
  const [nonBuyerSurveyCompleted, setNonBuyerSurveyCompleted] = useState(false);

  const [alertsEmail, setAlertsEmail] = useState('');
  const [isAlertsSubscribed, setIsAlertsSubscribed] = useState(false);
  const [isSubmittingAlerts, setIsSubmittingAlerts] = useState(false);
  const [alertsError, setAlertsError] = useState<string | null>(null);

  useEffect(() => {
    if (purchaseInfo?.email) {
      setAlertsEmail(purchaseInfo.email);
    }
  }, [purchaseInfo]);

  const handleAlertsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingAlerts(true);
    setAlertsError(null);
    try {
      const res = await fetch('/api/subscriber/deadline-alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: alertsEmail,
          province: report?.profile?.provinceName || report?.profile?.province || 'ON',
          industry: report?.profile?.industryName || report?.profile?.industry || 'other',
          source: 'standalone-report-widget'
        })
      });
      if (res.ok) {
        setIsAlertsSubscribed(true);
      } else {
        setAlertsError('Failed to subscribe. Please try again.');
      }
    } catch (err) {
      setAlertsError('Network error. Please try again.');
    } finally {
      setIsSubmittingAlerts(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!report || !token) return;
    setIsDownloading(true);
    try {
      // Direct browser-native download using our server-side API endpoint
      window.location.href = `/api/products/download-pdf?token=${encodeURIComponent(token)}`;
      
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'report_pdf_downloaded', { token });
      }
      // Fire pdf_downloaded telemetry
      fetch("/api/subscriber/track-activity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: purchaseInfo?.email || "",
          event: "pdf_downloaded"
        })
      }).catch(e => console.error("Telemetry error:", e));
    } catch (err) {
      console.error("Failed to trigger PDF download redirect:", err);
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
          setError(json.error || "Unable to verify your purchase. Please contact hello@fsidigital.ca");
          return;
        }

        setReport(json.report);
        setPurchaseInfo(json.purchase);
        setHasStrategyUnlocked(!!json.hasStrategyUnlocked);
        setStrategyData(json.strategyData || null);
        setHasToolkitUnlocked(!!json.hasToolkitUnlocked);
        setHasApprovalLibraryUnlocked(!!json.hasApprovalLibraryUnlocked);

        // GA4 event
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'report_opened', { method: 'standalone_page' });
        }

        // Fire report_viewed telemetry
        fetch("/api/subscriber/track-activity", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: json.purchase?.email || "",
            event: "report_viewed"
          })
        }).catch(e => console.error("Telemetry error:", e));

        // Fire action_plan_viewed telemetry if strategy plan is unlocked
        if (json.hasStrategyUnlocked) {
          fetch("/api/subscriber/track-activity", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: json.purchase?.email || "",
              event: "action_plan_viewed"
            })
          }).catch(e => console.error("Telemetry error:", e));
        }
      } catch (err) {
        console.error("Failed to load report:", err);
        setError("Unable to load your report. Please try again or contact hello@fsidigital.ca");
      } finally {
        setLoading(false);
      }
    };

    loadReport();
  }, [token]);

  // --- PayPal SDK Load for Action Plan Upgrade ---
  const [sdkReady, setSdkReady] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const paypalClientId = process.env.NEXT_PUBLIC_CONSULTATION_PAYPAL_CLIENT_ID
    || process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
    || "ATiNArUnyarxHv-FRUJ7pVi14uHjafO8fEGrRVGBSUBRIrS-Rpx-w8LNEcHyGsF5sExfJjT03aYo_0xq";

  useEffect(() => {
    if (loading || hasStrategyUnlocked || !report) return;
    if ((window as any).paypal) { setSdkReady(true); return; }

    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(paypalClientId)}&currency=USD&intent=capture&components=buttons`;
    script.type = "text/javascript";
    script.async = true;
    script.onload = () => setSdkReady(true);
    script.onerror = () => {
      console.error("PayPal SDK failed to load.");
      setPaymentError("Could not load secure checkout. Please refresh the page.");
    };
    document.head.appendChild(script);
  }, [loading, hasStrategyUnlocked, report, paypalClientId]);

  // Render PayPal buttons when SDK is ready
  useEffect(() => {
    if (!sdkReady || !(window as any).paypal || hasStrategyUnlocked || !report) return;

    const container = document.getElementById("roadmap-paypal-button");
    if (container) container.innerHTML = "";

    if (typeof (window as any).paypal.Buttons !== 'function') {
      setPaymentError("Could not load secure checkout. Please refresh.");
      return;
    }

    try {
      const isMatchReportBuyer = purchaseInfo?.productId === 'funding-match-report';
      const upgradePrice = isMatchReportBuyer ? 30 : 49;

      (window as any).paypal.Buttons({
        style: { layout: 'vertical', color: 'gold', shape: 'rect', label: 'pay', height: 40 },
        createOrder: (_data: any, actions: any) => {
          setPaymentError(null);
          if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'begin_checkout', {
              value: upgradePrice, currency: 'USD', items: [{ item_name: 'Funding Action Plan Upgrade', price: upgradePrice }]
            });
          }
          // Fire checkout_started telemetry
          fetch("/api/subscriber/track-activity", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: purchaseInfo?.email || "",
              event: "checkout_started",
              priceShown: upgradePrice.toString()
            })
          }).catch(e => console.error("Telemetry error:", e));
          return actions.order.create({
            purchase_units: [{
              amount: { value: upgradePrice.toFixed(2), currency_code: 'USD' },
              description: 'Funding Action Plan Upgrade - FSI Digital'
            }]
          });
        },
        onApprove: async (_data: any, actions: any) => {
          try {
            // Fire payment_approved telemetry
            fetch("/api/subscriber/track-activity", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: purchaseInfo?.email || "",
                event: "payment_approved",
                paypalOrderId: _data?.orderID || ''
              })
            }).catch(e => console.error("Telemetry error:", e));
            const details = await actions.order.capture();
            const orderId = details?.id || '';
            
            // Record the purchase of the action plan upgrade
            const res = await fetch('/api/products/purchase', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                productId: 'funding-roadmap',
                email: purchaseInfo?.email,
                name: purchaseInfo?.name,
                paypalOrderId: orderId,
                profileData: {
                  province: report.profile.province,
                  industry: report.profile.industry,
                  revenue: report.profile.revenue,
                  goal: report.profile.goal,
                },
                sessionId: typeof window !== 'undefined' ? (sessionStorage.getItem('fsi_session_id') || 'sess_anonymous') : 'sess_anonymous'
              })
            });

            const json = await res.json();
            if (res.ok && json.success) {
              window.location.reload();
            } else {
              throw new Error(json.error || 'Failed to record purchase');
            }
          } catch (err) {
            console.error("Payment capture error:", err);
            setPaymentError("Payment was successful, but we failed to unlock the action plan. Please contact hello@fsidigital.ca.");
          }
        },
        onError: (err: any) => {
          console.error("PayPal error:", err);
          setPaymentError("Payment failed. Please check your card/account details and try again.");
        }
      }).render('#roadmap-paypal-button');
    } catch (err) {
      console.error("Failed to render PayPal buttons:", err);
      setPaymentError("Could not load secure checkout. Please refresh.");
    }
  }, [sdkReady, hasStrategyUnlocked, report, purchaseInfo]);
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
          <a href="mailto:hello@fsidigital.ca" className="text-sm text-slate-500 hover:text-slate-700 underline underline-offset-2">
            Contact support
          </a>
        </div>
      </div>
    );
  }

  if (!report) return null;

  const isStandaloneBuyer = !report.profile.province && !report.profile.industry && !report.profile.revenue && !report.profile.goal;

  if (isStandaloneBuyer) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        {/* Standalone Product Delivery Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-100 rounded-full mb-3 text-indigo-650">
            <CheckCircle className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Your Product Download Center</h1>
          {purchaseInfo && (
            <p className="text-sm text-slate-500 mt-1">
              Prepared for {purchaseInfo.name} · {new Date(report.generatedAt).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          )}
        </div>

        {/* Unlocked Toolkit Add-on */}
        {hasToolkitUnlocked && (
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-5 text-left mb-4 animate-in fade-in duration-300">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                Unlocked
              </span>
              <h4 className="text-sm font-bold text-slate-800">
                Your Funding Application Toolkit
              </h4>
            </div>
            <p className="text-xs text-slate-600 mb-4">
              Save over 40 hours of writing time. Download your premium application files and calculators below:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { name: "1. Grant Budget Template (.xlsx)", url: "/templates/FSI-Grant-Budget-Builder.xlsx" },
                { name: "2. Cash Flow Forecast Model (.xlsx)", url: "/templates/FSI-Cash-Flow-Forecast.xlsx" },
                { name: "3. Hiring & Wage Subsidy Plan (.docx)", url: "/templates/FSI-Hiring-Plan-Template.docx" },
                { name: "4. Project Proposal Outline (.docx)", url: "/templates/FSI-Project-Proposal-Framework.docx" },
                { name: "5. Pre-Submission Checklist (.pdf)", url: "/templates/FSI-Readiness-Preflight-Checklist.pdf" },
                { name: "6. Application Progress Tracker (.xlsx)", url: "/templates/FSI-Application-Tracking-Sheet.xlsx" }
              ].map((file, idx) => (
                <a
                  key={idx}
                  href={file.url}
                  download
                  className="flex items-center justify-between p-2.5 bg-white border border-slate-150 rounded-lg hover:border-emerald-300 hover:bg-emerald-50/10 transition-colors text-xs font-semibold text-slate-700"
                >
                  <span>{file.name}</span>
                  <span className="text-emerald-600 text-[10px] uppercase font-bold flex items-center gap-0.5">
                    Download &darr;
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Unlocked Approval Library Add-on */}
        {hasApprovalLibraryUnlocked && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5 text-left mb-4 animate-in fade-in duration-300">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-blue-100 text-blue-800 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                Unlocked
              </span>
              <h4 className="text-sm font-bold text-slate-800">
                Funding Approval Library
              </h4>
            </div>
            <p className="text-xs text-slate-650 mb-3">
              Analyze successful grant templates and projects that successfully won non-repayable government funding:
            </p>
            <div className="space-y-2.5">
              <div className="bg-white border border-slate-150 rounded-lg p-3">
                <span className="text-[10px] uppercase font-bold text-indigo-600 tracking-wider">Example A: Technology & R&D Projects</span>
                <h5 className="text-xs font-bold text-slate-800 mt-0.5">SR&ED tax credit project narrative & eligible activity description</h5>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed italic bg-slate-50 p-2 rounded border border-slate-100">
                  &ldquo;Developed a proprietary machine learning routing layer optimized for edge latency... Unresolved technological uncertainty existed around asynchronous prediction aggregation under 25ms. We conducted systematic experimental trials...&rdquo;
                </p>
              </div>
              <div className="bg-white border border-slate-150 rounded-lg p-3">
                <span className="text-[10px] uppercase font-bold text-indigo-600 tracking-wider">Example B: Hiring & Job Creation Grants</span>
                <h5 className="text-xs font-bold text-slate-800 mt-0.5">Winning hiring training plan justification structure</h5>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed italic bg-slate-50 p-2 rounded border border-slate-100">
                  &ldquo;The candidate will undergo a structured 12-week skills training curriculum focusing on advanced automation protocols. Upon completion, this role will transition to full-time management of our localized pipeline...&rdquo;
                </p>
              </div>
              <a
                href="/templates/FSI-Funding-Approval-Guide.pdf"
                download
                className="inline-flex items-center gap-1 text-xs font-bold text-indigo-650 hover:text-indigo-850 mt-1"
              >
                Download Complete Case Library Guide (PDF) &rarr;
              </a>
            </div>
          </div>
        )}

        {/* Free Calculator Promo Card */}
        <div className="border-2 border-indigo-100 bg-indigo-50/15 rounded-xl p-5 text-left space-y-3">
          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" /> Want a Custom Stacking Grant Report?
          </h4>
          <p className="text-xs text-slate-650 leading-relaxed font-semibold">
            Run our free 60-second calculator to map out your federal and provincial grant opportunities, estimated funding ranges, and stacking strategy. It will automatically link your results to this dashboard!
          </p>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs" asChild>
            <Link href="/calculator">
              Run Free Stacking Calculator &rarr;
            </Link>
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-slate-400 pt-4 pb-8 space-y-1">
          <p>This product is for informational purposes and does not guarantee funding eligibility.</p>
          <p className="pt-2">
            <a href="/" className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2">FSI Digital</a> ·{' '}
            <a href="mailto:hello@fsidigital.ca" className="text-slate-500 hover:text-slate-700 underline underline-offset-2">Contact Support</a>
          </p>
        </div>
      </div>
    );
  }

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

      {/* Done-For-You Strategic Consultation review CTA */}
      <div className="bg-gradient-to-r from-emerald-500 to-indigo-650 p-0.5 rounded-xl shadow-xs my-4 animate-in fade-in duration-300">
        <div className="bg-white rounded-[10px] p-5 md:p-6 text-left space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <span className="bg-indigo-50 text-indigo-700 text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full">
                Done-For-You Assistance
              </span>
              <h3 className="text-base font-extrabold text-slate-900 mt-2 leading-tight">
                Want Our Funding Specialists to Handle Your Filings?
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xl leading-relaxed">
                Take the stress out of compliance. Book a complimentary 15-minute consultation review to evaluate full-service application filing and secure max funding without manual writing.
              </p>
            </div>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shrink-0 self-start sm:self-center" asChild>
              <Link href="/consultation?source=report-dfy-hook">
                Book Consultation Call
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Unlocked Toolkit Add-on */}
      {hasToolkitUnlocked && (
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-5 text-left mb-4 animate-in fade-in duration-300">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
              Unlocked
            </span>
            <h4 className="text-sm font-bold text-slate-800">
              Your Funding Application Toolkit
            </h4>
          </div>
          <p className="text-xs text-slate-600 mb-4">
            Save over 40 hours of writing time. Download your premium application files and calculators below:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { name: "1. Grant Budget Template (.xlsx)", url: "/templates/FSI-Grant-Budget-Builder.xlsx" },
              { name: "2. Cash Flow Forecast Model (.xlsx)", url: "/templates/FSI-Cash-Flow-Forecast.xlsx" },
              { name: "3. Hiring & Wage Subsidy Plan (.docx)", url: "/templates/FSI-Hiring-Plan-Template.docx" },
              { name: "4. Project Proposal Outline (.docx)", url: "/templates/FSI-Project-Proposal-Framework.docx" },
              { name: "5. Pre-Submission Checklist (.pdf)", url: "/templates/FSI-Readiness-Preflight-Checklist.pdf" },
              { name: "6. Application Progress Tracker (.xlsx)", url: "/templates/FSI-Application-Tracking-Sheet.xlsx" }
            ].map((file, idx) => (
              <a
                key={idx}
                href={file.url}
                download
                className="flex items-center justify-between p-2.5 bg-white border border-slate-150 rounded-lg hover:border-emerald-300 hover:bg-emerald-50/10 transition-colors text-xs font-semibold text-slate-700"
              >
                <span>{file.name}</span>
                <span className="text-emerald-600 text-[10px] uppercase font-bold flex items-center gap-0.5">
                  Download &darr;
                </span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Unlocked Approval Library Add-on */}
      {hasApprovalLibraryUnlocked && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5 text-left mb-4 animate-in fade-in duration-300">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-blue-100 text-blue-800 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
              Unlocked
            </span>
            <h4 className="text-sm font-bold text-slate-800">
              Funding Approval Library
            </h4>
          </div>
          <p className="text-xs text-slate-650 mb-3">
            Analyze successful grant templates and projects that successfully won non-repayable government funding:
          </p>
          <div className="space-y-2.5">
            <div className="bg-white border border-slate-150 rounded-lg p-3">
              <span className="text-[10px] uppercase font-bold text-indigo-600 tracking-wider">Example A: Technology & R&D Projects</span>
              <h5 className="text-xs font-bold text-slate-800 mt-0.5">SR&ED tax credit project narrative & eligible activity description</h5>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed italic bg-slate-50 p-2 rounded border border-slate-100">
                &ldquo;Developed a proprietary machine learning routing layer optimized for edge latency... Unresolved technological uncertainty existed around asynchronous prediction aggregation under 25ms. We conducted systematic experimental trials...&rdquo;
              </p>
            </div>
            <div className="bg-white border border-slate-150 rounded-lg p-3">
              <span className="text-[10px] uppercase font-bold text-indigo-600 tracking-wider">Example B: Hiring & Job Creation Grants</span>
              <h5 className="text-xs font-bold text-slate-800 mt-0.5">Winning hiring training plan justification structure</h5>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed italic bg-slate-55 p-2 rounded border border-slate-105">
                &ldquo;The candidate will undergo a structured 12-week skills training curriculum focusing on advanced automation protocols. Upon completion, this role will transition to full-time management of our localized pipeline...&rdquo;
              </p>
            </div>
            <a
              href="/templates/FSI-Funding-Approval-Guide.pdf"
              download
              className="inline-flex items-center gap-1 text-xs font-bold text-indigo-650 hover:text-indigo-850 mt-1"
            >
              Download Complete Case Library Guide (PDF) &rarr;
            </a>
          </div>
        </div>
      )}

      {/* Funnel Survey */}
      {hasStrategyUnlocked ? (
        /* Buyer Survey */
        !buyerSurveyCompleted && (
          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100/50 border border-indigo-150 rounded-xl p-5 text-left mb-6 relative animate-in fade-in duration-300">
            <h4 className="text-sm font-bold text-indigo-900 flex items-center gap-1.5 mb-1.5">
              <span>🎉 Help Us Improve FSI Digital</span>
            </h4>
            <p className="text-xs text-slate-600 mb-3">
              Thank you for purchasing! What was the main reason you chose to buy today?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {[
                { value: 'matches', label: 'Wanted specific funding matches' },
                { value: 'clarity', label: 'Needed next-step execution clarity' },
                { value: 'affordable', label: 'Price was affordable & fair' },
                { value: 'curious', label: 'Curious to see what we found' },
                { value: 'urgent', label: 'Looking for grants urgently' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={async () => {
                    setBuyerSurveyCompleted(true);
                    try {
                      await fetch("/api/subscriber/track-activity", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          email: purchaseInfo?.email || "",
                          event: "submit_survey",
                          surveyType: "buyer-delivery",
                          surveyResponse: opt.label
                        })
                      });
                    } catch (e) {
                      console.error(e);
                    }
                  }}
                  className="bg-white hover:bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3 text-left text-slate-700 font-medium transition-colors shadow-xs"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )
      ) : (
        /* Non-Buyer Survey */
        !nonBuyerSurveyCompleted && (
          <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-150 rounded-xl p-5 text-left mb-6 relative animate-in fade-in duration-300">
            <h4 className="text-sm font-bold text-amber-900 flex items-center gap-1.5 mb-1.5">
              <span>💡 Quick Feedback</span>
            </h4>
            <p className="text-xs text-slate-600 mb-3">
              What stopped you from upgrading to the Complete Funding Action Plan today?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {[
                { value: 'expensive', label: 'Too expensive / not in my budget' },
                { value: 'details', label: 'Need more details before deciding' },
                { value: 'research', label: 'Just researching right now' },
                { value: 'not_ready', label: 'Not ready to apply yet' },
                { value: 'other', label: 'Other / none of the above' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={async () => {
                    setNonBuyerSurveyCompleted(true);
                    try {
                      await fetch("/api/subscriber/track-activity", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          email: purchaseInfo?.email || "",
                          event: "submit_survey",
                          surveyType: "non-buyer-delivery",
                          surveyResponse: opt.label
                        })
                      });
                    } catch (e) {
                      console.error(e);
                    }
                  }}
                  className="bg-white hover:bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3 text-left text-slate-700 font-medium transition-colors shadow-xs"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )
      )}

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

      {/* ═══════ FUNDING ACTION PLAN DASHBOARD ═══════ */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-2">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-600" />
            Funding Action Plan Dashboard
          </h2>
          {!hasStrategyUnlocked && (
            <span className="bg-amber-100 text-amber-800 border border-amber-200 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
              <Lock className="w-3.5 h-3.5" /> Locked Upgrade
            </span>
          )}
        </div>

        {/* Funding Potential Summary */}
        {hasStrategyUnlocked && (
          <div className="bg-slate-50 border border-slate-150 rounded-xl p-4 sm:p-5">
            <h3 className="text-xs font-bold text-indigo-900 uppercase tracking-wide mb-3">Funding Potential Summary</h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-center sm:text-left">
              <div className="bg-white border border-slate-100 rounded-lg p-3 shadow-xs">
                <span className="text-[10px] text-slate-400 font-semibold block uppercase tracking-wider">Potential Programs</span>
                <span className="text-lg font-extrabold text-slate-800 mt-1 block">{report?.programs?.length || 0}</span>
              </div>
              <div className="bg-white border border-slate-100 rounded-lg p-3 shadow-xs">
                <span className="text-[10px] text-slate-400 font-semibold block uppercase tracking-wider">Priority Programs</span>
                <span className="text-lg font-extrabold text-slate-800 mt-1 block">3</span>
              </div>
              <div className="bg-white border border-slate-100 rounded-lg p-3 shadow-xs col-span-2 sm:col-span-1">
                <span className="text-[10px] text-slate-400 font-semibold block uppercase tracking-wider">Est. Funding Range</span>
                <span className="text-sm font-extrabold text-emerald-700 mt-1 block">
                  ${(report?.summary?.estimatedTotalMin || 0).toLocaleString()} – ${(report?.summary?.estimatedTotalMax || 0).toLocaleString()}
                </span>
              </div>
              <div className="bg-white border border-slate-100 rounded-lg p-3 shadow-xs">
                <span className="text-[10px] text-slate-400 font-semibold block uppercase tracking-wider">Est. Prep Time</span>
                <span className="text-sm font-extrabold text-slate-800 mt-1 block">
                  {(() => {
                    const topProgs = report?.programs?.slice(0, 3) || [];
                    const highCount = topProgs.filter((p: any) => p.difficulty === 'High').length;
                    const lowCount = topProgs.filter((p: any) => p.difficulty === 'Low').length;
                    return highCount >= 2 ? '4-8 Weeks' : lowCount >= 2 ? '2-4 Weeks' : '3-6 Weeks';
                  })()}
                </span>
              </div>
              <div className="bg-white border border-slate-100 rounded-lg p-3 shadow-xs">
                <span className="text-[10px] text-slate-400 font-semibold block uppercase tracking-wider">Complexity</span>
                <span className="text-sm font-extrabold text-slate-800 mt-1 block">
                  {(() => {
                    const topProgs = report?.programs?.slice(0, 3) || [];
                    const highCount = topProgs.filter((p: any) => p.difficulty === 'High').length;
                    const lowCount = topProgs.filter((p: any) => p.difficulty === 'Low').length;
                    return highCount >= 2 ? 'High' : lowCount >= 2 ? 'Low' : 'Medium';
                  })()}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Funding Deadline Alerts Opt-in Card */}
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-xl p-5 text-left mb-6 relative overflow-hidden border border-indigo-950/40 shadow-sm animate-in fade-in duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1 bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-3">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span>Deadline Alerts</span>
            </div>
            <h4 className="text-base font-bold text-white mb-1.5">
              Get Government Funding Deadline Alerts
            </h4>
            <p className="text-xs text-slate-300 mb-4 leading-relaxed max-w-xl">
              Never miss another grant deadline. Receive weekly updates on active programs, new grants, and approaching deadlines tailored for businesses in <span className="font-semibold text-indigo-300">{report?.profile?.provinceName || report?.profile?.province || 'your region'}</span> in the <span className="font-semibold text-indigo-300">{report?.profile?.industryName || report?.profile?.industry || 'your industry'}</span> sector.
            </p>
            
            {isAlertsSubscribed ? (
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs rounded-lg p-3.5 flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Success! You are subscribed to deadline alerts for {report?.profile?.provinceName || report?.profile?.province} ({report?.profile?.industryName || report?.profile?.industry}).</span>
              </div>
            ) : (
              <form onSubmit={handleAlertsSubmit} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-2 max-w-lg">
                  <input
                    type="email"
                    value={alertsEmail}
                    onChange={(e) => setAlertsEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="bg-white/10 border border-white/20 text-white placeholder-slate-400 text-xs rounded-lg px-3.5 py-2.5 outline-hidden focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 flex-1 transition-all"
                  />
                  <button
                    type="submit"
                    disabled={isSubmittingAlerts}
                    className="bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 disabled:bg-emerald-700/50 text-white font-bold text-xs rounded-lg px-4 py-2.5 transition-colors shadow-sm flex items-center justify-center gap-1.5 shrink-0"
                  >
                    {isSubmittingAlerts ? 'Subscribing...' : 'Subscribe to Alerts →'}
                  </button>
                </div>
                {alertsError && (
                  <p className="text-red-400 text-[10px]">{alertsError}</p>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Tab Headers */}
        <div className="flex border-b border-slate-200 overflow-x-auto gap-2 text-sm font-medium scrollbar-thin">
          {[
            { id: 'ranking', label: 'Priority Ranking' },
            { id: 'timeline', label: 'Timeline' },
            { id: 'sequence', label: 'Sequence' },
            { id: 'checklist', label: 'Documents' },
            { id: 'risks', label: 'Risks & Warnings' },
            { id: 'actions', label: 'Action Checklist' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => hasStrategyUnlocked && setActiveTab(tab.id as any)}
              className={`pb-2.5 px-3 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-indigo-600 text-indigo-600 font-semibold'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              } ${!hasStrategyUnlocked ? 'cursor-not-allowed opacity-60' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Area */}
        <div className="relative min-h-[220px]">
          {/* Blurred overlay if locked */}
          {!hasStrategyUnlocked && (
            <div className="absolute inset-0 bg-slate-50/70 backdrop-blur-[4px] z-10 rounded-xl flex items-center justify-center p-4">
              <div className="bg-white border border-indigo-100 rounded-xl p-6 text-center shadow-lg max-w-md space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-50 rounded-full text-indigo-600">
                  <Lock className="w-6 h-6 animate-pulse" />
                </div>
                <h3 className="text-base font-black text-slate-800 flex flex-col gap-0.5 items-center">
                  <span>Know Exactly What to Do Next</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                    Funding Action Plan Upgrade
                  </span>
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  We tell you exactly what to do first, second, and third. Unlock the step-by-step application timelines, sequencing guidance, required check-sheets, and risk factors.
                </p>
                {purchaseInfo?.productId === 'funding-match-report' ? (
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-indigo-600 uppercase tracking-wide">Subscriber Discount Applied</div>
                    <div className="text-2xl font-extrabold text-slate-800">$30.00 <span className="text-xs text-slate-400 font-normal">USD one-time (Upgrade)</span></div>
                  </div>
                ) : (
                  <div className="text-2xl font-extrabold text-slate-800">$49.00 <span className="text-xs text-slate-400 font-normal">USD one-time</span></div>
                )}
                
                {paymentError && (
                  <p className="text-xs text-red-600 font-semibold bg-red-50 p-2 rounded border border-red-150">{paymentError}</p>
                )}
                
                <div id="roadmap-paypal-button" className="min-h-[50px] w-full max-w-sm mx-auto"></div>
                
                <p className="text-[10px] text-slate-400">100% refund guarantee if your eligibility is not confirmed.</p>
              </div>
            </div>
          )}

          {/* Real Tab Contents (also displayed under the blur overlay for aesthetics) */}
          <div className={`${!hasStrategyUnlocked ? 'select-none pointer-events-none' : ''}`}>
            {activeTab === 'ranking' && (
              <div className="space-y-3">
                <p className="text-xs text-slate-500">Your matches ranked by funding feasibility and strategic alignment:</p>
                {(strategyData?.priorityRanking || [
                  { rank: 1, name: 'Sample R&D Grant Opportunity', agency: 'Innovation Agency', fundingAmount: '$150,000', difficulty: 'Moderate', matchReason: 'Your software business matches the technology R&D mandate.' },
                  { rank: 2, name: 'Sample Youth Employment Grant', agency: 'Employment & Training Corp', fundingAmount: '$15,000', difficulty: 'Low', matchReason: 'Your business operates in Canada and has hiring plans.' },
                ]).map((item: any, idx: number) => (
                  <div key={idx} className="border border-slate-105 rounded-lg p-3.5 space-y-1 bg-white">
                    <div className="flex items-center justify-between gap-2">
                      <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-2 py-0.5 rounded">Priority #{item.rank}</span>
                      <strong className="text-sm text-emerald-700 font-bold">{item.fundingAmount}</strong>
                    </div>
                    <h4 className="text-sm font-semibold text-slate-800">{item.name}</h4>
                    <p className="text-xs text-slate-400">{item.agency}</p>
                    <p className="text-xs text-slate-600 bg-slate-50 p-2 rounded mt-1.5 leading-relaxed">{item.matchReason}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'timeline' && (
              <div className="space-y-4">
                <p className="text-xs text-slate-500">Milestone timeline to space out filings and secure matching cash reserves:</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {(strategyData?.timeline || [
                    { targetMonth: 'Month 1', programName: 'Primary Match R&D Program', actionRequired: 'Compile payroll sheets and begin writing project narrative summary.' },
                    { targetMonth: 'Month 2', programName: 'Hiring/Wage Subsidy Match', actionRequired: 'Register job postings on job bank and submit candidate qualification forms.' },
                    { targetMonth: 'Month 3', programName: 'Secondary R&D Tax Matching', actionRequired: 'Coordinate technical descriptions with developer sprints for review.' },
                    { targetMonth: 'Month 4', programName: 'Pipeline Programs', actionRequired: 'Pre-check application pools for next intake window.' },
                  ]).slice(0, 4).map((item: any, idx: number) => (
                    <div key={idx} className="border border-slate-100 rounded-lg p-3 bg-slate-50/50">
                      <span className="text-xs font-bold text-indigo-600 block mb-1">{item.targetMonth}</span>
                      <h4 className="text-xs font-bold text-slate-800 truncate mb-1">{item.programName}</h4>
                      <p className="text-[11px] text-slate-600 leading-relaxed">{item.actionRequired}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'sequence' && (
              <div className="space-y-3">
                <p className="text-xs text-slate-500">Staking sequence to maximize matching ratio and avoid grant duplication:</p>
                <ol className="space-y-2">
                  {(strategyData?.sequence || [
                    'Stage 1: Apply for wage subsidies/training grants before completing hires to lower baseline expenses.',
                    'Stage 2: Leverage non-repayable grants to fund project development.',
                    'Stage 3: Claim remaining technical labor via R&D tax credits at fiscal year-end.',
                  ]).map((step: string, idx: number) => (
                    <li key={idx} className="flex gap-2 text-xs text-slate-600 items-start bg-white p-2 border border-slate-100 rounded-lg">
                      <span className="bg-indigo-100 text-indigo-700 font-bold shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px]">{idx + 1}</span>
                      <span className="leading-relaxed mt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {activeTab === 'checklist' && (
              <div className="space-y-3">
                <p className="text-xs text-slate-500">Action items documentation checklist for matched programs:</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {(strategyData?.docChecklist || [
                    'Articles of Incorporation',
                    'Financial statements for last 2 years',
                    'Resume/profiles of key personnel',
                    'Detailed software product architecture',
                  ]).map((doc: string, idx: number) => (
                    <label key={idx} className="flex items-start gap-2 text-xs text-slate-600 border border-slate-100 rounded-lg p-2.5 bg-white hover:bg-slate-50 transition-colors cursor-pointer select-none">
                      <input type="checkbox" className="mt-0.5 border-slate-300 rounded text-indigo-600 focus:ring-indigo-500" />
                      <span>{doc}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'risks' && (
              <div className="space-y-3">
                <p className="text-xs text-slate-500">Core audit risk levels and potential compliance warnings:</p>
                <div className="space-y-2">
                  {(strategyData?.riskWarnings || [
                    { programName: 'Primary Match R&D Program', riskLevel: 'High', riskDescription: 'Rigorous documentation checks: keep strict hours logs.' },
                    { programName: 'Hiring/Wage Subsidy Match', riskLevel: 'Low', riskDescription: 'Low audit risk. Requires simple tax returns and T4 summaries.' },
                  ]).slice(0, 3).map((item: any, idx: number) => (
                    <div key={idx} className="flex items-start gap-2.5 border border-slate-100 rounded-lg p-3 text-xs bg-white">
                      <span className={`px-2 py-0.5 rounded font-bold shrink-0 ${
                        item.riskLevel === 'High' ? 'bg-red-100 text-red-700' :
                        item.riskLevel === 'Moderate' ? 'bg-amber-100 text-amber-700' :
                        'bg-green-100 text-green-700'
                      }`}>{item.riskLevel} Risk</span>
                      <div>
                        <strong className="block text-slate-800 font-semibold mb-0.5">{item.programName}</strong>
                        <p className="text-slate-500 leading-relaxed">{item.riskDescription}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'actions' && (
              <div className="space-y-3">
                <p className="text-xs text-slate-500">Recommended action plan task list to initiate this month:</p>
                <div className="space-y-3 text-xs text-slate-700 bg-white p-3 border border-slate-100 rounded-lg">
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1.5 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span> This Week</h4>
                    <div className="space-y-1.5 pl-3 border-l-2 border-indigo-100">
                      {(strategyData?.actionPlan?.thisWeek || [
                        'Review program guidelines for top matched program.',
                        'Gather corporate incorporation documents.',
                      ]).map((act: string, idx: number) => (
                        <label key={idx} className="flex items-start gap-2 cursor-pointer select-none">
                          <input type="checkbox" className="mt-0.5 border-slate-300 rounded text-indigo-600 focus:ring-indigo-500" />
                          <span className="text-slate-600">{act}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-800 mb-1.5 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span> This Month</h4>
                    <div className="space-y-1.5 pl-3 border-l-2 border-indigo-100">
                      {(strategyData?.actionPlan?.thisMonth || [
                        'Setup R&D project developer time-logs tracking.',
                        'Pre-verify matching credit line eligibility.',
                      ]).map((act: string, idx: number) => (
                        <label key={idx} className="flex items-start gap-2 cursor-pointer select-none">
                          <input type="checkbox" className="mt-0.5 border-slate-300 rounded text-indigo-600 focus:ring-indigo-500" />
                          <span className="text-slate-600">{act}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ═══════ UPSELL TO $199 AUDIT ═══════ */}
      <div className="border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-white rounded-2xl p-6 sm:p-8 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
          {hasStrategyUnlocked ? '$49 Credit Active' : '$19 Credit Active'}
        </div>
        <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-100 rounded-full mb-4">
          <TrendingUp className="w-7 h-7 text-indigo-600" />
        </div>
        {(() => {
          const discount = purchaseInfo?.productId === 'funding-bundle'
            ? 79
            : (purchaseInfo?.productId === 'funding-roadmap' || hasStrategyUnlocked)
              ? 49
              : 19;
          const netPrice = 199 - discount;
          return (
            <>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Need Help Applying?</h3>
              <p className="text-sm text-slate-500 mb-5 max-w-lg mx-auto">
                Our funding advisors can help you prepare applications, maximize eligibility, and navigate the process.
                <strong className="block mt-3 text-emerald-700 font-semibold bg-emerald-50 border border-emerald-100 rounded-lg p-3">
                  Your ${discount} fee is credited back on booking — verification audit is only ${netPrice}
                </strong>
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`/consultation?source=report-upsell&email=${encodeURIComponent(purchaseInfo?.email || '')}&name=${encodeURIComponent(purchaseInfo?.name || '')}&discount=${discount}`}
                  className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors shadow-lg shadow-indigo-200"
                  onClick={() => {
                    if (typeof window !== 'undefined' && (window as any).gtag) {
                      (window as any).gtag('event', 'audit_upsell_clicked', { source: 'standalone_report_page' });
                    }
                    // Fire audit_cta_clicked telemetry
                    fetch("/api/subscriber/track-activity", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        email: purchaseInfo?.email || "",
                        event: "audit_cta_clicked"
                      })
                    }).catch(e => console.error("Telemetry error:", e));
                  }}
                >
                  Book a $199 Funding Audit (${netPrice} net) <ArrowRight className="w-4 h-4" />
                </a>
                <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold px-3.5 py-2 rounded-full text-xs flex items-center gap-1.5 shadow-sm shrink-0">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  ${discount} Coupon Applied (Pay ${netPrice})
                </span>
              </div>
            </>
          );
        })()}
        <p className="text-xs text-slate-400 mt-3">100% deposit refund if no programs match</p>
      </div>

      {/* ═══════ MEMBERSHIP UPSELL BANNER ═══════ */}
      <div className="mt-8 border border-slate-200 bg-slate-50 text-slate-800 rounded-2xl p-6 sm:p-8 text-left relative overflow-hidden shadow-xs">
        <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[8px] font-bold px-3 py-1 uppercase tracking-wider rounded-bl-lg">
          Founding Member Opportunity
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-650 shrink-0" /> Never Miss a Matching Grant Intake
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              Intakes open and close quickly. For <strong>$29/month</strong>, we monitor your business profile against 800+ active programs and alert you via SMS &amp; email when windows open. Includes priority analyst Q&amp;A support.
            </p>
          </div>
          <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link
              href="/membership"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-extrabold text-xs px-6 py-3 rounded-xl transition-all shadow-md shadow-emerald-250 text-center"
            >
              Activate Monitoring ($29/mo) <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-slate-400 pt-4 pb-8 space-y-1">
        <p>This report is for informational purposes and does not guarantee funding eligibility.</p>
        <p>Program details and amounts are subject to change based on government program updates.</p>
        <p className="pt-2">
          <a href="/" className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2">FSI Digital</a> ·{' '}
          <a href="mailto:hello@fsidigital.ca" className="text-slate-500 hover:text-slate-700 underline underline-offset-2">Contact Support</a>
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
