"use client"

import React, { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Loader2, Calculator, ArrowRight, ArrowLeft, CheckCircle, Mail, DollarSign,
  Search, Lock, Star, TrendingUp, FileText, ShieldCheck, Zap, Clock,
  BarChart3, ExternalLink
} from "lucide-react"
import { LEAD_CONSENT_TEXT } from "@/lib/leads/scoring"
import { SampleReportPreview } from "@/components/products/SampleReportPreview"
import { caseStudiesDatabase } from "@/lib/data/case-studies"
import { DiyComparisonTable } from "@/components/DiyComparisonTable"

type CalculatorData = {
    province: string;
    industry: string;
    revenue: string;
    goal: string;
    email: string;
    name: string;
    phone: string;
    company: string;
}

const INITIAL_DATA: CalculatorData = {
    province: "",
    industry: "",
    revenue: "",
    goal: "",
    email: "",
    name: "",
    phone: "",
    company: ""
}

/** Map province/state codes to readable names */
const PROVINCE_NAMES: Record<string, string> = {
  on: 'Ontario', bc: 'British Columbia', ab: 'Alberta', qc: 'Quebec',
  ns: 'Nova Scotia', mb: 'Manitoba', sk: 'Saskatchewan', nb: 'New Brunswick',
  nl: 'Newfoundland & Labrador', pe: 'Prince Edward Island',
  territories: 'Territories', national: 'Federal/Nationwide',
}

const INDUSTRY_NAMES: Record<string, string> = {
  technology: 'Technology & Software', manufacturing: 'Manufacturing',
  agriculture: 'Agriculture & Agri-Food', healthcare: 'Healthcare & Life Sciences',
  energy: 'Clean Tech & Energy', retail: 'Retail & E-commerce',
  services: 'Professional Services', other: 'General Business',
}

export function GrantCalculator() {
    const [step, setStep] = useState(1);
    const [data, setData] = useState<CalculatorData>(INITIAL_DATA);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [estimate, setEstimate] = useState(0);
    const [estimateMax, setEstimateMax] = useState(0);
    const [grantCount, setGrantCount] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [consentToPartnerContact, setConsentToPartnerContact] = useState(false);
    const [leadSaved, setLeadSaved] = useState(false);
    const [isPaypalButtonVisible, setIsPaypalButtonVisible] = useState(false);

    // Reactive live estimate calculation based on current steps filled
    const getLiveEstimate = () => {
        let base = 50000;
        let max = 150000;

        // Revenue adjustments
        if (data.revenue === "100k-500k") { base += 50000; max += 100000; }
        else if (data.revenue === "500k-1m") { base += 150000; max += 200000; }
        else if (data.revenue === "over-1m") { base += 350000; max += 400000; }

        // Industry adjustments
        if (data.industry === "technology" || data.industry === "agriculture" || data.industry === "manufacturing" || data.industry === "energy") {
            base = Math.round(base * 1.5);
            max = Math.round(max * 1.5);
        }

        // Goal adjustments
        if (data.goal === "research" || data.goal === "expansion" || data.goal === "expansion_equipment") {
            base = Math.round(base * 1.25);
            max = Math.round(max * 1.25);
        }

        return { base, max };
    };

    const liveEst = getLiveEstimate();

    const renderB2BMetadataBlock = (customRange?: string) => {
        const cleanField = (val: string, fallback: string) => {
            if (!val) return fallback;
            const trimmed = val.trim();
            const lower = trimmed.toLowerCase();
            if (lower === "n/a" || lower === "other" || lower === "general" || lower === "undefined" || lower === "null") {
                return fallback;
            }
            return trimmed;
        };

        const rawProv = cleanField(data.province, "Canada");
        const provinceName = PROVINCE_NAMES[rawProv.toLowerCase()] || rawProv;

        const rawInd = cleanField(data.industry, "General Business");
        const industryName = INDUSTRY_NAMES[rawInd.toLowerCase()] || rawInd;

        const companyName = cleanField(data.company, "Your Business");

        let opportunityRange = customRange;
        if (!opportunityRange) {
            if (estimate && estimateMax) {
                opportunityRange = `$${estimate.toLocaleString()} - $${estimateMax.toLocaleString()}+`;
            } else {
                opportunityRange = "$100,000 - $250,000+";
            }
        }

        return (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-4 text-left shadow-2xs font-sans w-full max-w-md mx-auto">
                <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs border-b border-slate-200 pb-3 mb-3">
                    <div>
                        <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Prepared for:</span>
                        <span className="font-bold text-slate-800 text-sm">{companyName}</span>
                    </div>
                    <div>
                        <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Industry:</span>
                        <span className="font-semibold text-slate-700 text-sm">{industryName}</span>
                    </div>
                    <div>
                        <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Region:</span>
                        <span className="font-semibold text-slate-700 text-sm">{provinceName}</span>
                    </div>
                    <div>
                        <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Estimated Opportunity Range:</span>
                        <span className="font-bold text-emerald-600 text-sm">{opportunityRange}</span>
                    </div>
                </div>
                <div className="flex items-center justify-between text-xs pt-0.5">
                    <div>
                        <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Generated:</span>
                        <span className="font-medium text-slate-600">Today</span>
                    </div>
                    <div>
                        <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider text-right">Analysis Status:</span>
                        <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full mt-0.5 uppercase tracking-wide">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Ready To Unlock
                        </span>
                    </div>
                </div>
            </div>
        );
    };

    // --- Revenue Ladder State ---
    const [sdkReady, setSdkReady] = useState(false);
    const [paymentError, setPaymentError] = useState<string | null>(null);
    const [isPurchased, setIsPurchased] = useState(false);
    const [accessToken, setAccessToken] = useState<string>('');
    const [reportData, setReportData] = useState<any>(null);
    const [isLoadingReport, setIsLoadingReport] = useState(false);
    const [reportLoadStep, setReportLoadStep] = useState(0);
    const [isDownloading, setIsDownloading] = useState(false);
    const [isStripeLoading, setIsStripeLoading] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<'funding-match-report' | 'funding-bundle' | 'funding-roadmap'>('funding-bundle');
    const [addonToolkit, setAddonToolkit] = useState(false);
    const [addonApprovalLibrary, setAddonApprovalLibrary] = useState(false);
    const [hasToolkitUnlocked, setHasToolkitUnlocked] = useState(false);
    const [hasApprovalLibraryUnlocked, setHasApprovalLibraryUnlocked] = useState(false);
    const [hasStrategyUnlocked, setHasStrategyUnlocked] = useState(false);
    const [strategyData, setStrategyData] = useState<any>(null);
    const [showUpsellScreen, setShowUpsellScreen] = useState(false);
    const [activeTab, setActiveTab] = useState<'ranking' | 'timeline' | 'sequence' | 'checklist' | 'risks' | 'actions'>('ranking');
    const [buyerSurveyCompleted, setBuyerSurveyCompleted] = useState(false);
    const [nonBuyerSurveyCompleted, setNonBuyerSurveyCompleted] = useState(false);
    const [trackingData, setTrackingData] = useState({
        landingPage: '',
        referrer: '',
        utmSource: '',
        utmMedium: '',
        utmCampaign: ''
    });
    const [isRestoring, setIsRestoring] = useState(false);
    const [isRestoredSession, setIsRestoredSession] = useState(false);
    const [restorationError, setRestorationError] = useState<string | null>(null);

    // --- Telemetry & Rendering Refs ---
    const dataRef = useRef(data);
    useEffect(() => {
        dataRef.current = data;
    }, [data]);

    const trackingDataRef = useRef(trackingData);
    useEffect(() => {
        trackingDataRef.current = trackingData;
    }, [trackingData]);

    const selectedProductIdRef = useRef(selectedProductId);
    useEffect(() => {
        selectedProductIdRef.current = selectedProductId;
    }, [selectedProductId]);

    const addonToolkitRef = useRef(addonToolkit);
    useEffect(() => {
        addonToolkitRef.current = addonToolkit;
    }, [addonToolkit]);

    const addonApprovalLibraryRef = useRef(addonApprovalLibrary);
    useEffect(() => {
        addonApprovalLibraryRef.current = addonApprovalLibrary;
    }, [addonApprovalLibrary]);

    const buttonsRenderedRef = useRef(false);

    // Track email validity to control PayPal mounting lifecycle
    const isEmailValid = !!(data.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()));

    const [showExitSurvey, setShowExitSurvey] = useState(false);
    const [exitSurveyStep, setExitSurveyStep] = useState<1 | 2>(1);
    const step6EnteredTimeRef = useRef<number | null>(null);
    const emailValidatedRef = useRef(false);

    // Client-side browser & device metadata parser
    const getDeviceMetadata = () => {
        if (typeof window === 'undefined' || typeof navigator === 'undefined') return {};
        const ua = navigator.userAgent;
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        let browser = "Other";
        if (ua.includes("Firefox")) browser = "Firefox";
        else if (ua.includes("Chrome") && !ua.includes("Chromium")) browser = "Chrome";
        else if (ua.includes("Safari") && !ua.includes("Chrome")) browser = "Safari";
        else if (ua.includes("Edge")) browser = "Edge";
        
        let os = "Other";
        if (ua.includes("Windows")) os = "Windows";
        else if (ua.includes("Macintosh")) os = "macOS";
        else if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";
        else if (ua.includes("Android")) os = "Android";
        
        const device = /Mobi|Android|iPhone|iPad/i.test(ua) ? "Mobile" : "Desktop";
        
        return {
            browser,
            os,
            device,
            viewport: `${width}x${height}`
        };
    };

    const calculateEstimateRestored = (profile: CalculatorData) => {
        let base = 50000;
        let max = 150000;

        // Revenue multiplier
        if (profile.revenue === "100k-500k") { base += 50000; max += 100000; }
        if (profile.revenue === "500k-1m") { base += 150000; max += 200000; }
        if (profile.revenue === "over-1m") { base += 350000; max += 400000; }

        // Industry multiplier
        if (profile.industry === "technology" || profile.industry === "agriculture" || profile.industry === "manufacturing") {
            base = Math.round(base * 1.5);
            max = Math.round(max * 1.5);
        }

        // Goal multiplier
        if (profile.goal === "research" || profile.goal === "expansion") {
            base = Math.round(base * 1.25);
            max = Math.round(max * 1.25);
        }

        setEstimate(base);
        setEstimateMax(max);
        setGrantCount(Math.floor(Math.random() * 8) + 7);
    };

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const params = new URLSearchParams(window.location.search);
        setTrackingData({
            landingPage: window.location.pathname,
            referrer: document.referrer || '',
            utmSource: params.get('utm_source') || '',
            utmMedium: params.get('utm_medium') || '',
            utmCampaign: params.get('utm_campaign') || ''
        });

        const emailParam = params.get('email');
        const nameParam = params.get('name');
        const phoneParam = params.get('phone');
        const companyParam = params.get('company');
        const provinceParam = params.get('province');
        const industryParam = params.get('industry');
        const revenueParam = params.get('revenue');
        const goalParam = params.get('goal');
        const stepParam = params.get('step');

        let hasEmail = false;
        setData(prev => {
            const updated = { ...prev };
            if (emailParam) {
                updated.email = emailParam;
                hasEmail = true;
            }
            if (nameParam) updated.name = nameParam;
            if (phoneParam) updated.phone = phoneParam;
            if (companyParam) updated.company = companyParam;
            if (provinceParam) updated.province = provinceParam.toLowerCase();
            if (industryParam) updated.industry = industryParam;
            if (revenueParam) updated.revenue = revenueParam;
            if (goalParam) updated.goal = goalParam;
            return updated;
        });
        if (hasEmail) {
            setLeadSaved(true);
        }

        if (stepParam === '6') {
            const restoredProfile = {
                province: provinceParam || '',
                industry: industryParam || '',
                revenue: revenueParam || '',
                goal: goalParam || '',
                email: emailParam || '',
                name: nameParam || '',
                phone: phoneParam || '',
                company: companyParam || '',
            };
            calculateEstimateRestored(restoredProfile);
            setStep(6);
        }

        const token = params.get('token');
        if (!token) return;

        const restoreSession = async () => {
            setIsRestoring(true);
            setRestorationError(null);
            try {
                const res = await fetch(`/api/subscriber/restore?token=${encodeURIComponent(token)}`);
                if (!res.ok) {
                    throw new Error('Restoration failed');
                }
                const result = await res.json();
                if (result.status === 'purchased' && result.token) {
                    window.location.href = `/products/report?token=${encodeURIComponent(result.token)}`;
                } else if (result.status === 'lead' && result.profile) {
                    const restoredProfile = {
                        province: result.profile.province || '',
                        industry: result.profile.industry || '',
                        revenue: result.profile.revenue || '',
                        goal: result.profile.goal || '',
                        email: result.profile.email || '',
                        name: result.profile.name || '',
                        phone: result.profile.phone || '',
                        company: result.profile.company || '',
                    };
                    setData(restoredProfile);
                    calculateEstimateRestored(restoredProfile);
                    setIsRestoredSession(true);
                    setStep(6); // Show teaser results first — value before ask
                    setLeadSaved(true);

                    // Track paywall_viewed event in subscriber history
                    if (restoredProfile.email) {
                      fetch("/api/subscriber/track-activity", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          email: restoredProfile.email,
                          event: "paywall_viewed",
                          priceShown: "19|79"
                        })
                      }).catch(e => console.error("Telemetry paywall_viewed error:", e));
                    }
                }
            } catch (err) {
                console.error('Session restoration failed:', err);
                setRestorationError('Failed to restore session.');
            } finally {
                setIsRestoring(false);
            }
        };

        restoreSession();
    }, []);

    // Auto-save lead draft when email becomes valid on Step 6
    const lastSavedEmail = useRef("");
    useEffect(() => {
        if (step !== 6 || leadSaved) return;
        const email = data.email?.trim();
        if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            if (email !== lastSavedEmail.current) {
                lastSavedEmail.current = email;
                const timer = setTimeout(() => {
                    saveCalculatorLead(email, data.name || "Founder", false);
                }, 1000); // 1s debounce
                return () => clearTimeout(timer);
            }
        }
    }, [data.email, step, leadSaved]);

    const [alertsEmail, setAlertsEmail] = useState('');
    const [isAlertsSubscribed, setIsAlertsSubscribed] = useState(false);
    const [isSubmittingAlerts, setIsSubmittingAlerts] = useState(false);
    const [alertsError, setAlertsError] = useState<string | null>(null);

    useEffect(() => {
        if (data.email) {
            setAlertsEmail(data.email);
        }
    }, [data.email]);

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
                    province: reportData?.profile?.provinceName || reportData?.profile?.province || data.province || 'ON',
                    industry: reportData?.profile?.industryName || reportData?.profile?.industry || data.industry || 'other',
                    source: 'calculator-dashboard-widget'
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
        if (!reportData) return;
        setIsDownloading(true);
        try {
            const { generateFundingMatchReportPDF } = await import('@/lib/products/report-pdf');
            const doc = generateFundingMatchReportPDF(reportData, data.name || 'Founder', hasStrategyUnlocked ? strategyData : undefined);
            doc.save(`Funding-Match-Report-${data.province}-${data.industry}.pdf`);
            
            if (typeof window !== 'undefined' && (window as any).gtag) {
                (window as any).gtag('event', 'report_pdf_downloaded_calc', { email: data.email });
            }
            // Fire pdf_downloaded telemetry
            fetch("/api/subscriber/track-activity", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: data.email,
                event: "pdf_downloaded"
              })
            }).catch(e => console.error("Telemetry error:", e));
        } catch (err) {
            console.error("Failed to generate PDF:", err);
        } finally {
            setIsDownloading(false);
        }
    };

    const paypalClientId = process.env.NEXT_PUBLIC_CONSULTATION_PAYPAL_CLIENT_ID
      || process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
      || "ATiNArUnyarxHv-FRUJ7pVi14uHjafO8fEGrRVGBSUBRIrS-Rpx-w8LNEcHyGsF5sExfJjT03aYo_0xq";

    // Calculate generic estimate based on inputs
    const calculateEstimate = () => {
        let base = 50000;
        let max = 150000;

        // Revenue multiplier
        if (data.revenue === "100k-500k") { base += 50000; max += 100000; }
        if (data.revenue === "500k-1m") { base += 150000; max += 200000; }
        if (data.revenue === "over-1m") { base += 350000; max += 400000; }

        // Industry multiplier
        if (data.industry === "technology" || data.industry === "agriculture" || data.industry === "manufacturing") {
            base = Math.round(base * 1.5);
            max = Math.round(max * 1.5);
        }

        // Goal multiplier
        if (data.goal === "research" || data.goal === "expansion") {
            base = Math.round(base * 1.25);
            max = Math.round(max * 1.25);
        }

        setEstimate(base);
        setEstimateMax(max);
        setGrantCount(Math.floor(Math.random() * 8) + 7); // Random 7-14 grants
    }

    const handleNext = () => {
        if (step === 4) {
            // Transition to analyzing step
            setIsAnalyzing(true);
            calculateEstimate();
            setStep(5);

            setTimeout(() => {
                setIsAnalyzing(false);
                setStep(6);
            }, 2500);
        } else {
            setStep(s => s + 1);
        }
    }

    const handleBack = () => {
        if (step === 6) {
            setExitSurveyStep(1);
            setShowExitSurvey(true);
            return;
        }
        setStep(s => Math.max(1, s - 1));
    }

    // --- Background lead saving helper ---
    const saveCalculatorLead = async (email: string, name: string, isFreeFallback: boolean) => {
        try {
            const messageInfo = `Calculator Lead (${isFreeFallback ? 'Free Summary' : 'Checkout Initiated'})\nProvince: ${data.province}\nIndustry: ${data.industry}\nRevenue: ${data.revenue}\nGoal: ${data.goal}\nEstimated Funding Range: $${estimate.toLocaleString()} - $${estimateMax.toLocaleString()}\nMatched Grants Count: ${grantCount}\nCompany: ${data.company || "Not provided"}`;

            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    phone: data.phone,
                    category: "Grant Calculator",
                    message: messageInfo,
                    companyName: data.company,
                    country: "Canada",
                    state: data.province,
                    industry: data.industry,
                    businessStage: data.revenue,
                    fundingAmount: `$${estimate.toLocaleString()} - $${estimateMax.toLocaleString()}`,
                    fundingPurpose: data.goal,
                    businessDescription: messageInfo,
                    consentToPartnerContact,
                    pagePath: trackingData.landingPage || window.location.pathname,
                    referrer: trackingData.referrer,
                    utmSource: trackingData.utmSource,
                    utmMedium: trackingData.utmMedium,
                    utmCampaign: trackingData.utmCampaign,
                }),
            });

            // Fire calculator_completed telemetry
            fetch("/api/subscriber/track-activity", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: email,
                    event: "calculator_completed",
                    source: "Calculator"
                })
            }).catch(e => console.error("Telemetry error:", e));

            // Fire paywall_viewed telemetry (fresh view)
            fetch("/api/subscriber/track-activity", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: email,
                    event: "paywall_viewed",
                    priceShown: "19|79"
                })
            }).catch(e => console.error("Telemetry paywall_viewed error:", e));

            // Fire calculator_complete telemetry to Funnel Events
            try {
                const sessId = sessionStorage.getItem('fsi_session_id') || 'sess_anonymous';
                fetch('/api/telemetry', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        eventName: 'calculator_complete',
                        sessionId: sessId,
                        pagePath: window.location.pathname,
                        referrer: document.referrer || 'direct'
                    })
                }).catch(err => console.error('Failed to log telemetry calculator_complete:', err));
            } catch (tErr) {}

            if (res.ok) {
                setLeadSaved(true);
            }

        } catch (error) {
            console.error("Failed to save lead:", error);
        }
    };

    // --- Free lead capture (fallback) ---
    const handleSubmitEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        await saveCalculatorLead(data.email, data.name, true);
        setIsSuccess(true);
        setIsSubmitting(false);
    }

    // --- Telemetry Calculator Start Hook ---
    useEffect(() => {
        if (step !== 2) return;
        if (sessionStorage.getItem('fsi_calc_start_logged') === 'true') return;

        try {
            const sessId = sessionStorage.getItem('fsi_session_id') || 'sess_anonymous';
            fetch('/api/telemetry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    eventName: 'calculator_start',
                    sessionId: sessId,
                    pagePath: window.location.pathname,
                    referrer: document.referrer || 'direct'
                })
            }).then((res) => {
                if (res.ok) {
                    sessionStorage.setItem('fsi_calc_start_logged', 'true');
                }
            }).catch(err => console.error('Failed to log telemetry calculator_start:', err));
        } catch (tErr) {}
    }, [step]);

    // --- Step 6 Entrance, Validation & Exit Telemetry ---
    useEffect(() => {
        if (step !== 6) return;
        
        step6EnteredTimeRef.current = Date.now();
        const currentEmail = dataRef.current.email;
        
        // Log step6_entered
        if (currentEmail) {
            fetch("/api/subscriber/track-activity", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: currentEmail,
                    event: "step6_entered",
                    ...getDeviceMetadata()
                })
            }).catch(() => {});
        }

        // Exit intent & page abandonment tracker
        const startTime = Date.now();
        const handleExit = () => {
            const duration = ((Date.now() - startTime) / 1000).toFixed(1);
            const emailVal = dataRef.current.email;
            if (emailVal) {
                const payload = JSON.stringify({
                    email: emailVal,
                    event: "step6_exit",
                    durationSeconds: duration,
                    ...getDeviceMetadata()
                });
                
                if (navigator.sendBeacon) {
                    navigator.sendBeacon("/api/subscriber/track-activity", payload);
                } else {
                    fetch("/api/subscriber/track-activity", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: payload
                    }).catch(() => {});
                }
            }
        };

        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY < 50) {
                setExitSurveyStep(1);
                setShowExitSurvey(true);
            }
        };

        window.addEventListener("beforeunload", handleExit);
        document.addEventListener("mouseleave", handleMouseLeave);
        
        return () => {
            window.removeEventListener("beforeunload", handleExit);
            document.removeEventListener("mouseleave", handleMouseLeave);
            // Fire exit handler on React component unmount (navigating within the app)
            handleExit();
        };
    }, [step]);

    useEffect(() => {
        if (step !== 6 || !isEmailValid) {
            emailValidatedRef.current = false;
            return;
        }
        
        // Ensure email_validated is logged exactly once per page load/state shift
        if (emailValidatedRef.current) return;
        emailValidatedRef.current = true;

        const currentEmail = dataRef.current.email;
        if (currentEmail) {
            fetch("/api/subscriber/track-activity", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: currentEmail,
                    event: "email_validated",
                    ...getDeviceMetadata()
                })
            }).catch(() => {});
        }
    }, [step, isEmailValid]);

    const handleStripeCheckout = async () => {
      if (!isEmailValid || isStripeLoading) return;
      setIsStripeLoading(true);
      setPaymentError(null);
      try {
        const currentEmail = dataRef.current.email;
        if (currentEmail) {
          fetch("/api/subscriber/track-activity", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: currentEmail,
              event: "stripe_checkout_clicked",
              ...getDeviceMetadata()
            })
          }).catch(() => {});
        }

        const res = await fetch('/api/stripe/create-checkout-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            productId: selectedProductId,
            email: data.email,
            name: data.name,
            profileData: {
              province: data.province,
              industry: data.industry,
              revenue: data.revenue,
              goal: data.goal,
              company: data.company,
              phone: data.phone,
            },
            addons: {
              toolkit: addonToolkit,
              approvalLibrary: addonApprovalLibrary
            },
            attribution: {
              landingPage: typeof window !== 'undefined' ? window.location.pathname : '',
              referrer: typeof document !== 'undefined' ? document.referrer : '',
              utmSource: data.utmSource || '',
              utmMedium: data.utmMedium || '',
              utmCampaign: data.utmCampaign || '',
            }
          })
        });
        const sessionData = await res.json();
        if (sessionData.checkoutUrl) {
          window.location.href = sessionData.checkoutUrl;
        } else {
          throw new Error(sessionData.error || 'Failed to start Stripe checkout');
        }
      } catch (err: any) {
        console.error('Stripe error:', err);
        setPaymentError(err.message || 'Card payment initiation failed. Please try again or use PayPal.');
      } finally {
        setIsStripeLoading(false);
      }
    };

    // --- PayPal SDK Load ---
    useEffect(() => {
      if (step < 6) return; // Only load when needed
      if ((window as any).paypal) { setSdkReady(true); return; }

      const script = document.createElement("script");
      script.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(paypalClientId)}&currency=USD&intent=capture&components=buttons`;
      script.type = "text/javascript";
      script.async = true;
      script.onload = () => setSdkReady(true);
      script.onerror = () => {
        console.error("PayPal SDK failed to load.");
        setPaymentError("Could not load secure checkout. Please refresh the page.");
        
        const currentEmail = dataRef.current.email;
        if (currentEmail) {
          fetch("/api/subscriber/track-activity", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: currentEmail,
              event: "paypal_sdk_load_failed",
              errorMessage: "PayPal SDK script loader element returned error callback",
              ...getDeviceMetadata()
            })
          }).catch(() => {});
        }
      };
      document.head.appendChild(script);
    }, [step, paypalClientId]);

    // --- PayPal Buttons Render ---
    useEffect(() => {
      if (!isEmailValid) {
        buttonsRenderedRef.current = false;
        return;
      }

      if (!sdkReady || !(window as any).paypal || step !== 6) return;
      
      // Prevent duplicate rendering in StrictMode or rapid render ticks
      if (buttonsRenderedRef.current) return;
      buttonsRenderedRef.current = true;

      const container = document.getElementById("calc-paypal-button");
      if (container) container.innerHTML = "";

      if (typeof (window as any).paypal.Buttons !== 'function') {
        setPaymentError("Could not load secure checkout. Please refresh.");
        buttonsRenderedRef.current = false;
        
        const currentEmail = dataRef.current.email;
        if (currentEmail) {
          fetch("/api/subscriber/track-activity", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: currentEmail,
              event: "paypal_buttons_failed",
              errorMessage: "paypal.Buttons is not a function",
              ...getDeviceMetadata()
            })
          }).catch(() => {});
        }
        return;
      }

      const emailVal = dataRef.current.email;
      
      // Telemetry: paypal_container_rendered
      if (emailVal) {
        fetch("/api/subscriber/track-activity", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: emailVal,
            event: "paypal_container_rendered",
            ...getDeviceMetadata()
          })
        }).catch(() => {});
      }

      try {
        (window as any).paypal.Buttons({
          style: { layout: 'vertical', color: 'gold', shape: 'rect', label: 'pay', height: 45 },
          onClick: () => {
            trackEvent('preview_cta_clicked');
            const currentEmail = dataRef.current.email;
            
            // Telemetry: paypal_button_clicked
            if (currentEmail) {
              fetch("/api/subscriber/track-activity", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  email: currentEmail,
                  event: "paypal_button_clicked",
                  ...getDeviceMetadata()
                })
              }).catch(() => {});
            }

            // Telemetry: paypal_popup_opened
            if (currentEmail) {
              fetch("/api/subscriber/track-activity", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  email: currentEmail,
                  event: "paypal_popup_opened",
                  ...getDeviceMetadata()
                })
              }).catch(() => {});
            }
          },
          createOrder: (_data: any, actions: any) => {
            setPaymentError(null);
            const currentEmail = dataRef.current.email;

            // Telemetry: create_order_started
            if (currentEmail) {
              fetch("/api/subscriber/track-activity", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  email: currentEmail,
                  event: "create_order_started",
                  ...getDeviceMetadata()
                })
              }).catch(() => {});
            }

            // Compute values dynamically from refs
            const currentProductId = selectedProductIdRef.current;
            const currentAddonToolkit = addonToolkitRef.current;
            const currentAddonApprovalLibrary = addonApprovalLibraryRef.current;

            let price = currentProductId === 'funding-bundle' ? 79 : currentProductId === 'funding-roadmap' ? 49 : 19;
            let itemsList = currentProductId === 'funding-bundle' ? 'Complete Funding Bundle' : currentProductId === 'funding-roadmap' ? 'Funding Action Plan' : 'Funding Match Report';
            if (currentAddonToolkit) {
              price += 29;
              itemsList += ' + Toolkit';
            }
            if (currentAddonApprovalLibrary) {
              price += 9;
              itemsList += ' + Approval Library';
            }
            const desc = `${itemsList} - FSI Digital`;

            // GA4 event: checkout started
            if (typeof window !== 'undefined' && (window as any).gtag) {
              (window as any).gtag('event', 'begin_checkout', {
                value: price, currency: 'USD', items: [{ item_name: desc, price: price }]
              });
            }

            // Telemetry: checkout_started & create_order_success
            if (currentEmail) {
              fetch("/api/subscriber/track-activity", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  email: currentEmail,
                  event: "checkout_started",
                  priceShown: price.toString(),
                  ...getDeviceMetadata()
                })
              }).catch(() => {});

              fetch("/api/subscriber/track-activity", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  email: currentEmail,
                  event: "create_order_success",
                  ...getDeviceMetadata()
                })
              }).catch(() => {});
            }

            return actions.order.create({
              purchase_units: [{
                amount: { value: price.toFixed(2), currency_code: 'USD' },
                description: desc
              }]
            });
          },
          onApprove: async (_data: any, actions: any) => {
            const currentEmail = dataRef.current.email;
            const currentName = dataRef.current.name;
            const currentProductId = selectedProductIdRef.current;
            const currentAddonToolkit = addonToolkitRef.current;
            const currentAddonApprovalLibrary = addonApprovalLibraryRef.current;

            let price = currentProductId === 'funding-bundle' ? 79 : currentProductId === 'funding-roadmap' ? 49 : 19;
            let itemsList = currentProductId === 'funding-bundle' ? 'Complete Funding Bundle' : currentProductId === 'funding-roadmap' ? 'Funding Action Plan' : 'Funding Match Report';
            if (currentAddonToolkit) {
              price += 29;
              itemsList += ' + Toolkit';
            }
            if (currentAddonApprovalLibrary) {
              price += 9;
              itemsList += ' + Approval Library';
            }
            const desc = `${itemsList} - FSI Digital`;

            try {
              // Telemetry: payment_approved
              if (currentEmail) {
                fetch("/api/subscriber/track-activity", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    email: currentEmail,
                    event: "payment_approved",
                    paypalOrderId: _data?.orderID || '',
                    ...getDeviceMetadata()
                  })
                }).catch(e => console.error("Telemetry error:", e));
              }

              const details = await actions.order.capture();
              const orderId = details?.id || '';

              // GA4 event: purchase complete
              if (typeof window !== 'undefined' && (window as any).gtag) {
                (window as any).gtag('event', 'purchase', {
                  transaction_id: orderId,
                  value: price, currency: 'USD',
                  items: [{ item_name: desc, price: price }]
                });
              }

              // Telemetry: payment_capture_success
              if (currentEmail) {
                fetch("/api/subscriber/track-activity", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    email: currentEmail,
                    event: "payment_capture_success",
                    ...getDeviceMetadata()
                  })
                }).catch(() => {});
              }

              // Record purchase via API
              const res = await fetch('/api/products/purchase', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  productId: currentProductId,
                  email: currentEmail,
                  name: currentName,
                  paypalOrderId: orderId,
                  addons: {
                    toolkit: currentAddonToolkit,
                    approvalLibrary: currentAddonApprovalLibrary
                  },
                  profileData: {
                    province: dataRef.current.province,
                    industry: dataRef.current.industry,
                    revenue: dataRef.current.revenue,
                    goal: dataRef.current.goal,
                    company: dataRef.current.company,
                    phone: dataRef.current.phone,
                  },
                  attribution: {
                    landingPage: trackingDataRef.current.landingPage,
                    referrer: trackingDataRef.current.referrer,
                    utmSource: trackingDataRef.current.utmSource,
                    utmMedium: trackingDataRef.current.utmMedium,
                    utmCampaign: trackingDataRef.current.utmCampaign,
                  },
                  sessionId: typeof window !== 'undefined' ? (sessionStorage.getItem('fsi_session_id') || 'sess_anonymous') : 'sess_anonymous'
                })
              });

              const result = await res.json();

              if (result.success) {
                setAccessToken(result.accessToken);
                setIsPurchased(true);
                if (currentProductId === 'funding-match-report') {
                  setShowUpsellScreen(true);
                }
                setStep(8);

                // Telemetry: redirect_booking
                if (currentEmail) {
                  fetch("/api/subscriber/track-activity", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      email: currentEmail,
                      event: "redirect_booking",
                      ...getDeviceMetadata()
                    })
                  }).catch(() => {});
                }

                // Load the full report
                loadReport(result.accessToken);
              } else {
                setPaymentError("Payment received but report generation failed. Contact hello@fsidigital.ca");
              }
            } catch (err) {
              console.error("Payment capture error:", err);
              setPaymentError("Payment processed, but we encountered an issue. Contact hello@fsidigital.ca");
              
              if (currentEmail) {
                fetch("/api/subscriber/track-activity", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    email: currentEmail,
                    event: "payment_capture_failed",
                    errorMessage: err instanceof Error ? err.message : String(err),
                    ...getDeviceMetadata()
                  })
                }).catch(() => {});
              }
            }
          },
          onApproveCancel: () => {},
          onCancel: () => {
            const currentProductId = selectedProductIdRef.current;
            const currentAddonToolkit = addonToolkitRef.current;
            const currentAddonApprovalLibrary = addonApprovalLibraryRef.current;

            let price = currentProductId === 'funding-bundle' ? 79 : currentProductId === 'funding-roadmap' ? 49 : 19;
            let itemsList = currentProductId === 'funding-bundle' ? 'Complete Funding Bundle' : currentProductId === 'funding-roadmap' ? 'Funding Action Plan' : 'Funding Match Report';
            if (currentAddonToolkit) {
              price += 29;
              itemsList += ' + Toolkit';
            }
            if (currentAddonApprovalLibrary) {
              price += 9;
              itemsList += ' + Approval Library';
            }
            const desc = `${itemsList} - FSI Digital`;

            setPaymentError("Payment cancelled. You can try again when ready.");
            // GA4 event
            if (typeof window !== 'undefined' && (window as any).gtag) {
              (window as any).gtag('event', 'checkout_cancelled', { item_name: desc });
            }
          },
          onError: (err: any) => {
            console.error("PayPal error:", err);
            setPaymentError("Payment failed. Please try again or use a different payment method.");
            
            const currentEmail = dataRef.current.email;
            if (currentEmail) {
              fetch("/api/subscriber/track-activity", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  email: currentEmail,
                  event: "create_order_failed",
                  errorMessage: err instanceof Error ? err.message : String(err),
                  ...getDeviceMetadata()
                })
              }).catch(() => {});
            }
          }
        }).render('#calc-paypal-button').then(() => {
          // Telemetry: paypal_buttons_rendered
          if (emailVal) {
            const renderTime = step6EnteredTimeRef.current 
              ? ((Date.now() - step6EnteredTimeRef.current) / 1000).toFixed(2)
              : "unknown";

            fetch("/api/subscriber/track-activity", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: emailVal,
                event: "paypal_buttons_rendered",
                renderTimeSeconds: renderTime,
                ...getDeviceMetadata()
              })
            }).catch(() => {});
          }
        });
      } catch (err) {
        console.error("Failed to render PayPal buttons:", err);
        setPaymentError("Could not load checkout. Please refresh.");
        buttonsRenderedRef.current = false;
        
        if (emailVal) {
          fetch("/api/subscriber/track-activity", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: emailVal,
              event: "paypal_buttons_failed",
              errorMessage: err instanceof Error ? err.message : String(err),
              ...getDeviceMetadata()
            })
          }).catch(() => {});
        }
      }
    }, [sdkReady, step, isEmailValid]);

    // --- PayPal SDK Upgrade Button Render ---
    useEffect(() => {
      if (!sdkReady || !(window as any).paypal || step !== 8 || hasStrategyUnlocked) return;

      const containerId = showUpsellScreen ? "calc-upgrade-paypal-button" : "calc-dashboard-upgrade-paypal-button";
      const container = document.getElementById(containerId);
      if (!container) return;
      
      container.innerHTML = "";

      if (typeof (window as any).paypal.Buttons !== 'function') {
        return;
      }

      try {
        (window as any).paypal.Buttons({
          style: { layout: 'vertical', color: 'gold', shape: 'rect', label: 'checkout', height: 45 },
          onClick: () => {
            trackEvent('preview_cta_clicked');
            if (data.email) {
              fetch("/api/subscriber/track-activity", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  email: data.email,
                  event: "preview_cta_clicked",
                  packageSelected: "funding-roadmap"
                })
              }).catch(() => {});
            }
          },
          createOrder: (_data: any, actions: any) => {
            setPaymentError(null);
            if (typeof window !== 'undefined' && (window as any).gtag) {
              (window as any).gtag('event', 'begin_checkout', {
                value: 49, currency: 'USD', items: [{ item_name: 'Funding Action Plan Upgrade', price: 49 }]
              });
            }
            // Fire checkout_started telemetry
            fetch("/api/subscriber/track-activity", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: data.email,
                event: "checkout_started",
                priceShown: "49"
              })
            }).catch(e => console.error("Telemetry error:", e));
            return actions.order.create({
              purchase_units: [{
                amount: { value: '49.00', currency_code: 'USD' },
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
                  email: data.email,
                  event: "payment_approved",
                  paypalOrderId: _data?.orderID || ''
                })
              }).catch(e => console.error("Telemetry error:", e));
              const details = await actions.order.capture();
              const orderId = details?.id || '';

              if (typeof window !== 'undefined' && (window as any).gtag) {
                (window as any).gtag('event', 'purchase', {
                  transaction_id: orderId,
                  value: 49, currency: 'USD',
                  items: [{ item_name: 'Funding Action Plan Upgrade', price: 49 }]
                });
              }

              // Record upgrade purchase via API
              const res = await fetch('/api/products/purchase', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  productId: 'funding-roadmap',
                  email: data.email,
                  name: data.name,
                  paypalOrderId: orderId,
                  profileData: {
                    province: data.province,
                    industry: data.industry,
                    revenue: data.revenue,
                    goal: data.goal,
                    company: data.company,
                    phone: data.phone,
                  },
                  attribution: {
                    landingPage: trackingData.landingPage,
                    referrer: trackingData.referrer,
                    utmSource: trackingData.utmSource,
                    utmMedium: trackingData.utmMedium,
                    utmCampaign: trackingData.utmCampaign,
                  },
                  sessionId: typeof window !== 'undefined' ? (sessionStorage.getItem('fsi_session_id') || 'sess_anonymous') : 'sess_anonymous'
                })
              });

              const result = await res.json();
              if (result.success) {
                // Reload report to get unlocked action plan data
                await loadReport(accessToken || result.accessToken);
                setShowUpsellScreen(false);
              } else {
                setPaymentError("Payment received but upgrade mapping failed. Contact hello@fsidigital.ca");
              }
            } catch (err) {
              console.error("Upgrade capture error:", err);
              setPaymentError("Payment processed, but we encountered an issue. Contact hello@fsidigital.ca");
            }
          },
          onError: (err: any) => {
            console.error("PayPal Upgrade error:", err);
            setPaymentError("Payment failed. Please try again.");
          }
        }).render(`#${containerId}`);
      } catch (err) {
        console.error("Failed to render PayPal Upgrade button:", err);
      }
    }, [sdkReady, step, showUpsellScreen, hasStrategyUnlocked, accessToken, data.email, data.name, data.province, data.industry, data.revenue, data.goal, data.company, data.phone]);

    // --- Load Report Data ---
    const loadReport = async (token: string) => {
      setIsLoadingReport(true);
      setReportLoadStep(0);

      // Start simulated processing interval (1200ms per step = 7.2 seconds total progress time)
      let stepCounter = 0;
      const interval = setInterval(() => {
        stepCounter++;
        if (stepCounter <= 5) {
          setReportLoadStep(stepCounter);
        } else {
          clearInterval(interval);
        }
      }, 1200);

      // Run API fetch concurrently
      let reportResult: any = null;
      try {
        const res = await fetch(`/api/products/verify?token=${encodeURIComponent(token)}`);
        const json = await res.json();
        if (json.report) {
          reportResult = json;
        }
      } catch (err) {
        console.error("Failed to load report:", err);
      }

      // Enforce waiting until the progress steps reach Step 5
      await new Promise<void>((resolve) => {
        const checkInterval = setInterval(() => {
          if (stepCounter >= 5) {
            clearInterval(checkInterval);
            clearInterval(interval); // Safe cleanup
            resolve();
          }
        }, 200);
      });

      // Complete last visual step
      setReportLoadStep(6);
      await new Promise(r => setTimeout(r, 2200));

      if (reportResult) {
        setReportData(reportResult.report);
        setHasStrategyUnlocked(!!reportResult.hasStrategyUnlocked);
        setStrategyData(reportResult.strategyData || null);
        setHasToolkitUnlocked(!!reportResult.hasToolkitUnlocked);
        setHasApprovalLibraryUnlocked(!!reportResult.hasApprovalLibraryUnlocked);
      }
      setIsLoadingReport(false);
    };

    const updateData = (field: keyof CalculatorData, value: string) => {
        setData(prev => ({ ...prev, [field]: value }));
    }

    const getMatchedPrograms = (profile: CalculatorData) => {
      const ind = profile.industry?.toLowerCase() || '';
      const goal = profile.goal?.toLowerCase() || '';
      const rev = profile.revenue?.toLowerCase() || '';
      const isSmall = rev === 'pre-revenue' || rev === 'under-100k' || rev === '100k-500k';
      const prov = profile.province?.toLowerCase() || 'on';
      const provLabel = PROVINCE_NAMES[prov] || 'Ontario';

      if (goal === 'hiring' || goal === 'training') {
        return [
          {
            name: "Canada Summer Jobs (CSJ)",
            range: isSmall ? "$10,000 - $25,000" : "$25,000 - $60,000",
            justification: "Provides wage subsidies to hire young Canadians (15-30) for full-time summer work.",
            category: "Wage Subsidies for New Grads & Youth"
          },
          {
            name: `Canada-${provLabel} Job Grant`,
            range: isSmall ? "$5,000 - $15,000" : "$15,000 - $45,005",
            justification: `Direct funding to offset costs of training employees in specialized technical skills in ${provLabel}.`,
            category: "Specialized Technical Training Programs"
          },
          {
            name: "IRAP Youth Employment Program (YEP)",
            range: isSmall ? "$20,000 - $50,500" : "$50,000 - $120,000",
            justification: "Wage subsidies for hiring post-secondary graduates for technical or innovation projects.",
            category: "Key Operations & Executive Hiring"
          }
        ];
      }
      if (ind === 'technology' || goal === 'research') {
        return [
          {
            name: "Scientific Research & Experimental Development (SR&ED)",
            range: isSmall ? "$25,000 - $95,000" : "$95,005 - $350,000",
            justification: "Provides up to a 35% refundable tax credit on qualifying R&D salaries, materials, and contractors.",
            category: "R&D Tax Credits (Scientific Research & Dev)"
          },
          {
            name: "Industrial Research Assistance Program (IRAP)",
            range: isSmall ? "$15,000 - $50,000" : "$50,050 - $150,000",
            justification: "Offers non-repayable grants to support the development and commercialization of new products.",
            category: "Technology Commercialization Assistance"
          },
          {
            name: "Canada Digital Adoption Program (CDAP)",
            range: "$2,400 - $15,000",
            justification: "Provides micro-grants to adopt e-commerce or hire advisors to write digital transformation plans.",
            category: "Digital Transformation & Software Adoption"
          }
        ];
      }
      if (ind === 'manufacturing' || goal === 'expansion_equipment') {
        return [
          {
            name: "Strategic Innovation Fund (SIF)",
            range: isSmall ? "$30,050 - $120,000" : "$120,000 - $500,000",
            justification: "Supports large-scale investments in manufacturing facility upgrades, clean-tech, and commercialization.",
            category: "Facility Modernization & Equipment Grants"
          },
          {
            name: "CME SMART Green Program",
            range: isSmall ? "$15,000 - $60,000" : "$60,000 - $180,000",
            justification: "Offsets the cost of equipment upgrades that improve manufacturing productivity and efficiency.",
            category: "Operational Productivity & Automation"
          },
          {
            name: "Sustainable Canadian Agricultural Partnership (CAP)",
            range: isSmall ? "$10,000 - $45,000" : "$45,000 - $150,000",
            justification: "Provincial-federal funding to implement clean technologies, reduce waste, and improve resource efficiency.",
            category: "Clean Tech & Sustainability Incentives"
          }
        ];
      }
      return [
        {
          name: "Canada Digital Adoption Program (CDAP)",
          range: "$2,400 - $15,000",
          justification: "Offsets costs of adopting e-commerce tools or upgrading software infrastructure.",
          category: "Digital Operations & E-commerce Enablement"
        },
        {
          name: "Canada Summer Jobs (CSJ) Program",
          range: isSmall ? "$10,000 - $30,000" : "$30,000 - $75,000",
          justification: "Funding to offset wages for hiring new employees or student workers to grow local operations.",
          category: "Job Creation & Youth Wage Subsidies"
        },
        {
          name: "CanExport SMEs Program",
          range: isSmall ? "$15,000 - $50,000" : "$50,000 - $100,000",
          justification: "Co-funds up to 50% of costs to expand into foreign markets (travel, translations, IP protection).",
          category: "Market Expansion & Export Grants"
        }
      ];
    };

    const getDeterministicCategories = (profile: CalculatorData) => {
      const ind = profile.industry?.toLowerCase() || '';
      const goal = profile.goal?.toLowerCase() || '';
      const rev = profile.revenue?.toLowerCase() || '';
      const isSmall = rev === 'pre-revenue' || rev === 'under-100k' || rev === '100k-500k';

      if (goal === 'hiring' || goal === 'training') {
        return [
          { category: "Wage Subsidies for New Grads & Youth", range: isSmall ? "$10,000 - $25,000" : "$25,000 - $60,000", justification: "Subsidizes payroll for onboarding new employees or students." },
          { category: "Specialized Technical Training Programs", range: isSmall ? "$5,000 - $15,000" : "$15,000 - $45,000", justification: "Offsets cost of upskilling current staff in digital tools/processes." },
          { category: "Key Operations & Executive Hiring", range: isSmall ? "$20,000 - $50,500" : "$50,000 - $120,000", justification: "Supports hiring senior or technical managers for regional growth." }
        ];
      }
      if (ind === 'technology' || goal === 'research') {
        return [
          { category: "R&D Tax Credits (Scientific Research & Dev)", range: isSmall ? "$25,000 - $95,000" : "$95,000 - $350,000", justification: "Provides tax recovery on salaries and overheads spent on technical challenges." },
          { category: "Technology Commercialization Assistance", range: isSmall ? "$15,000 - $50,000" : "$50,000 - $150,000", justification: "Funds development and testing of innovative software or hardware." },
          { category: "Digital Transformation & Software Adoption", range: "$2,400 - $15,000", justification: "Offsets cost of implementing productivity software, CRM, or cloud tools." }
        ];
      }
      if (ind === 'manufacturing' || goal === 'expansion_equipment') {
        return [
          { category: "Facility Modernization & Equipment Grants", range: isSmall ? "$30,000 - $120,000" : "$120,000 - $500,000", justification: "Co-funds purchasing manufacturing equipment or modernizing production lines." },
          { category: "Operational Productivity & Automation", range: isSmall ? "$15,000 - $60,000" : "$60,000 - $180,000", justification: "Supports purchasing automation hardware or implementing ERP software." },
          { category: "Clean Tech & Sustainability Incentives", range: isSmall ? "$10,000 - $45,000" : "$45,000 - $150,000", justification: "Grants or interest-free loans to reduce carbon footprint and energy use." }
        ];
      }
      return [
        { category: "Digital Operations & E-commerce Enablement", range: "$2,400 - $15,000", justification: "Supports setting up e-commerce, digital marketing, or cyber security." },
        { category: "Job Creation & Youth Wage Subsidies", range: isSmall ? "$10,000 - $30,000" : "$30,000 - $75,000", justification: "Offsets wage costs of hiring full-time, part-time, or student workers." },
        { category: "Market Expansion & Export Grants", range: isSmall ? "$15,000 - $50,000" : "$50,000 - $100,000", justification: "Grants to participate in trade shows, target new regions, or export goods." }
      ];
    };

    const getPackageDeliverables = (productId: string) => {
      if (productId === 'funding-bundle') {
        return {
          title: "Complete Funding Bundle",
          price: "$79",
          deliverables: [
            { label: "Named Programs", desc: "Full access to actual program names, application links, and official guides." },
            { label: "Eligibility Assessment", desc: "Detailed analysis of your eligibility chances based on your stage and goal." },
            { label: "Funding Prioritization", desc: "Ranked list showing which grants to apply for first to maximize success." },
            { label: "Application Strategy", desc: "Step-by-step guidance on writing pitches and compiling budgets." },
            { label: "Next Steps Roadmap", desc: "A structured 4-month application timeline for your business." }
          ]
        };
      } else if (productId === 'funding-roadmap') {
        return {
          title: "Funding Action Plan",
          price: "$49",
          deliverables: [
            { label: "Opportunity Summary", desc: "Summary of matching funding opportunities." },
            { label: "Funding Categories", desc: "Specific types of grants, loans, and tax credits your business fits." },
            { label: "Estimated Funding Range", desc: "Detailed ranges of potential capital for each matched category." },
            { label: "Priority Timeline", desc: "Months 1-4 schedule mapping for application deadlines." }
          ]
        };
      } else {
        return {
          title: "Basic Match Report",
          price: "$19",
          deliverables: [
            { label: "Opportunity Summary", desc: "Summary of matching funding opportunities." },
            { label: "Funding Categories", desc: "Specific types of grants, loans, and tax credits your business fits." },
            { label: "Estimated Funding Range", desc: "Detailed ranges of potential capital for each matched category." },
            { label: "Basic Recommendations", desc: "General tips on preparing your business documentation for applications." }
          ]
        };
      }
    };

    // --- Teaser Top Match ---
    const getRealTopMatch = () => {
      const ind = data.industry;
      const rev = data.revenue;
      const isSmall = rev === 'pre-revenue' || rev === 'under-100k' || rev === '100k-500k';

      if (ind === 'technology') {
        return isSmall 
          ? { name: 'Canada Digital Adoption Program', maxFunding: '$15,000', desc: 'Supports software adoption and digital transformation for scaling tech' }
          : { name: 'IRAP Innovation Grant', maxFunding: '$150,000', desc: 'Accelerates research and development for established tech firms' };
      }
      if (ind === 'manufacturing') {
        return isSmall
          ? { name: 'Manufacturing Modernization Fund', maxFunding: '$50,000', desc: 'Assists with equipment upgrades and process automation' }
          : { name: 'Strategic Innovation Fund (SIF)', maxFunding: '$500,000+', desc: 'For large scale manufacturing and industrial innovation' };
      }
      if (ind === 'agriculture') {
        return isSmall
          ? { name: 'AgriAssurance Program', maxFunding: '$50,000', desc: 'Helps small farms implement quality assurance and tracing' }
          : { name: 'AgriInnovate Program', maxFunding: '$5,000,000', desc: 'Accelerates commercialization and adoption of innovative agri-technologies' };
      }
      if (ind === 'healthcare') {
        return isSmall
          ? { name: 'Digital Health Innovation Grant', maxFunding: '$30,000', desc: 'Supports initial prototyping and feasibility studies' }
          : { name: 'Life Sciences Innovation Fund', maxFunding: '$500,000', desc: 'Advances early-stage health tech and life sciences innovation' };
      }
      if (ind === 'energy') {
        return isSmall
          ? { name: 'Green Business Audit Grant', maxFunding: '$10,000', desc: 'Covers costs for environmental assessments and planning' }
          : { name: 'Clean Growth Program', maxFunding: '$10,000,000', desc: 'Advances emerging clean technologies toward commercial readiness' };
      }
      
      return isSmall
        ? { name: 'Canada Digital Adoption Program', maxFunding: '$15,000', desc: 'Supports software adoption and digital transformation for all sectors' }
        : { name: 'Regional Economic Growth Fund', maxFunding: '$100,000', desc: 'Supports established businesses expanding operations and hiring' };
    };

    // --- GA4 tracking helper ---
    const trackEvent = (eventName: string, params?: Record<string, any>) => {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', eventName, params);
      }
      if (typeof window !== 'undefined' && (window as any).clarity) {
        (window as any).clarity('event', eventName);
      }
    };

    // Track calculator step progression
    useEffect(() => {
      if (step >= 1 && step <= 4) {
        trackEvent('calculator_step', { step_number: step });
      }
      if (step === 6) trackEvent('calculator_completed');
      if (step === 7) {
        trackEvent('report_paywall_viewed');
        // Track checkout_started event to telemetry sheet
        try {
          const logged = sessionStorage.getItem('fsi_checkout_started_logged') === 'true';
          if (!logged) {
            const sessId = sessionStorage.getItem('fsi_session_id') || 'sess_anonymous';
            fetch('/api/telemetry', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                eventName: 'checkout_started',
                sessionId: sessId,
                pagePath: window.location.pathname,
                referrer: document.referrer || 'direct',
                utmSource: trackingData.utmSource,
                utmMedium: trackingData.utmMedium,
                utmCampaign: trackingData.utmCampaign
              })
            }).then((res) => {
              if (res.ok) {
                sessionStorage.setItem('fsi_checkout_started_logged', 'true');
              }
            }).catch(err => console.error('Failed to log telemetry checkout_started:', err));
          }
        } catch (tErr) {}

        // Track checkout_started in subscriber history
        if (data.email) {
          fetch("/api/subscriber/track-activity", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: data.email,
              event: "checkout_started",
              priceShown: "19|79"
            })
          }).catch(e => console.error("Telemetry subscriber error:", e));
        }
      }
      if (step === 8) trackEvent('report_purchased');
    }, [step, data.email, trackingData]);

    // Telemetry for post-purchase consumption
    useEffect(() => {
      if (step === 8 && reportData) {
        // Track report_viewed
        fetch("/api/subscriber/track-activity", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: data.email,
            event: "report_viewed"
          })
        }).catch(e => console.error("Telemetry error:", e));

        // Track action_plan_viewed if strategy plan is unlocked
        if (hasStrategyUnlocked) {
          fetch("/api/subscriber/track-activity", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: data.email,
              event: "action_plan_viewed"
            })
          }).catch(e => console.error("Telemetry error:", e));
        }
      }
    }, [step, !!reportData, hasStrategyUnlocked]);

    // Telemetry: Track package selection changes on Step 6
    useEffect(() => {
      if (step === 6) {
        const priceMap: Record<string, number> = {
          'funding-bundle': 79,
          'funding-roadmap': 49,
          'funding-match-report': 19
        };
        const price = priceMap[selectedProductId] || 79;
        const specificEventName = `package_selected_${price}`;

        trackEvent(specificEventName, { package_id: selectedProductId, price });
        trackEvent('calc_package_selected', { package_id: selectedProductId });

        if (data.email && leadSaved) {
          fetch("/api/subscriber/track-activity", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: data.email,
              event: "package_selected",
              packageSelected: selectedProductId,
              packageSelectedPrice: price
            })
          }).catch(e => console.error("Telemetry error logging package selection:", e));
        }
      }
    }, [selectedProductId, step, data.email, leadSaved]);

    const paypalVisibleLogged = useRef(false);

    useEffect(() => {
      if (step !== 6) {
        paypalVisibleLogged.current = false;
      }
    }, [step]);

    // Telemetry: Track when PayPal checkout button enters viewport
    useEffect(() => {
      if (step !== 6 || !sdkReady) return;
      const el = document.getElementById("calc-paypal-button");
      if (!el) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          setIsPaypalButtonVisible(entry.isIntersecting);
        });
      }, { threshold: 0.1 });

      observer.observe(el);
      return () => observer.disconnect();
    }, [step, sdkReady]);

    useEffect(() => {
      if (step === 6 && isPaypalButtonVisible && data.email && leadSaved && !paypalVisibleLogged.current) {
        paypalVisibleLogged.current = true;
        trackEvent('calc_paypal_visible');
        fetch("/api/subscriber/track-activity", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: data.email,
            event: "paypal_visible"
          })
        }).catch(e => console.error("Telemetry error logging paypal_visible:", e));
      }
    }, [step, isPaypalButtonVisible, data.email, leadSaved]);

    // Telemetry: Step 6 preview tracking
    const scroll50Logged = useRef(false);
    const scroll100Logged = useRef(false);
    const previewViewedLogged = useRef(false);

    useEffect(() => {
      if (step !== 6) return;

      // Track preview_viewed on load
      if (!previewViewedLogged.current) {
        previewViewedLogged.current = true;
        trackEvent('preview_viewed', { package_id: selectedProductId });
        if (data.email) {
          fetch("/api/subscriber/track-activity", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: data.email,
              event: "preview_viewed",
              packageSelected: selectedProductId
            })
          }).catch(() => {});
        }
      }

      // Track 30s dwell timer
      const timer30 = setTimeout(() => {
        trackEvent('preview_time_30s');
        if (data.email) {
          fetch("/api/subscriber/track-activity", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: data.email,
              event: "preview_time_30s"
            })
          }).catch(() => {});
        }
      }, 30000);

      // Scroll listener
      const handleScroll = () => {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight <= 0) return;
        const scrollPercent = (window.scrollY / docHeight) * 100;

        if (scrollPercent >= 50 && !scroll50Logged.current) {
          scroll50Logged.current = true;
          trackEvent('preview_scroll_50');
          if (data.email) {
            fetch("/api/subscriber/track-activity", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: data.email,
                event: "preview_scroll_50"
              })
            }).catch(() => {});
          }
        }

        if (scrollPercent >= 95 && !scroll100Logged.current) {
          scroll100Logged.current = true;
          trackEvent('preview_scroll_100');
          if (data.email) {
            fetch("/api/subscriber/track-activity", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: data.email,
                event: "preview_scroll_100"
              })
            }).catch(() => {});
          }
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => {
        clearTimeout(timer30);
        window.removeEventListener('scroll', handleScroll);
      };
    }, [step, selectedProductId, data.email]);

    if (isRestoring) {
        return (
            <Card className="shadow-xl border-green-100 max-w-2xl mx-auto">
                <CardContent className="pt-16 pb-16 text-center space-y-4">
                    <Loader2 className="w-10 h-10 animate-spin text-green-600 mx-auto" />
                    <h3 className="text-xl font-bold text-slate-800">Restoring Your Saved Session...</h3>
                    <p className="text-sm text-slate-500">Retrieving your business eligibility details.</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className={`shadow-xl border-green-100 mx-auto transition-all duration-300 ${step === 6 && !isSuccess ? 'max-w-6xl' : 'max-w-2xl'}`}>
            {/* Exclude header on analysis, payment, and report steps */}
            {step < 5 && (
                <CardHeader className="text-center pb-2">
                    <div className="flex items-center justify-center mb-4">
                        <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center">
                            <Calculator className="w-8 h-8" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold">Grant Eligibility Calculator</CardTitle>
                    <CardDescription>Find out how much funding you qualify for in under 60 seconds.</CardDescription>

                    <div className="flex items-center justify-center gap-2 mt-6">
                        {[1, 2, 3, 4].map(i => (
                            <div
                                key={i}
                                className={`h-2 rounded-full transition-all duration-300 ${step >= i ? 'w-12 bg-green-500' : 'w-4 bg-gray-200'}`}
                            />
                        ))}
                    </div>
                </CardHeader>
            )}

            <CardContent className="pt-6 sm:p-8">
                {/* Real-time funding estimate widget (Step 2 to 4) */}
                {step >= 2 && step <= 4 && (
                    <div className="mb-6 bg-gradient-to-r from-emerald-50 to-teal-50/50 border border-emerald-200/60 rounded-2xl p-4 text-center shadow-2xs transition-all duration-500 animate-in fade-in duration-300">
                        <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-1">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            Live Funding Estimate
                        </div>
                        <div className="text-2xl sm:text-3xl font-black text-emerald-955 tracking-tight">
                            ${liveEst.base.toLocaleString()} - ${liveEst.max.toLocaleString()}+
                        </div>
                        <div className="text-[10px] text-emerald-700/80 font-medium mt-1">
                            Updates dynamically as you fill out details
                        </div>
                    </div>
                )}

                {/* Step 1: What are you looking for today? */}
                {step === 1 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h3 className="text-xl font-semibold text-center mb-6">What are you looking for today?</h3>
                        <RadioGroup value={data.goal} onValueChange={(val) => updateData("goal", val)} className="gap-3">
                            {[
                              { value: 'expansion', label: 'Looking for grants for my business', desc: 'Find active funding streams for operations' },
                              { value: 'hiring', label: 'Hiring & Training funding', desc: 'Wage subsidies and employee skill development grants' },
                              { value: 'expansion_equipment', label: 'Equipment & Facility Expansion', desc: 'Capital funding for equipment, facilities, or hardware' },
                              { value: 'research', label: 'R&D or Tax credits (e.g. SR&ED / IRAP)', desc: 'Developing new products, software, or advanced technology' },
                              { value: 'just researching', label: 'Just researching / learning', desc: 'Looking for general information, not ready to apply yet' },
                            ].map(opt => (
                              <Label key={opt.value} className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer hover:bg-gray-50 transition-colors ${data.goal === opt.value ? 'border-green-500 bg-green-50 text-green-700 ring-1 ring-green-500' : ''}`}>
                                <div className="flex items-center gap-3">
                                    <RadioGroupItem value={opt.value} />
                                    <div className="flex flex-col text-left">
                                        <span className="font-semibold text-base">{opt.label}</span>
                                        <span className="text-xs text-slate-500">{opt.desc}</span>
                                    </div>
                                </div>
                              </Label>
                            ))}
                        </RadioGroup>
                    </div>
                )}

                {/* Step 2: Location */}
                {step === 2 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h3 className="text-xl font-semibold text-center mb-6">Where is your business located?</h3>
                        <div className="space-y-3">
                            <Label>Province / Territory</Label>
                            <Select value={data.province} onValueChange={(val) => updateData("province", val)}>
                                <SelectTrigger className="h-14 text-lg">
                                    <SelectValue placeholder="Select a region..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="on">Ontario</SelectItem>
                                    <SelectItem value="bc">British Columbia</SelectItem>
                                    <SelectItem value="ab">Alberta</SelectItem>
                                    <SelectItem value="qc">Quebec</SelectItem>
                                    <SelectItem value="ns">Nova Scotia</SelectItem>
                                    <SelectItem value="mb">Manitoba</SelectItem>
                                    <SelectItem value="sk">Saskatchewan</SelectItem>
                                    <SelectItem value="nb">New Brunswick</SelectItem>
                                    <SelectItem value="nl">Newfoundland and Labrador</SelectItem>
                                    <SelectItem value="pe">Prince Edward Island</SelectItem>
                                    <SelectItem value="territories">Territories (YT, NT, NU)</SelectItem>
                                    <SelectItem value="national">Federal/Nationwide</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                )}

                {/* Step 3: Industry */}
                {step === 3 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h3 className="text-xl font-semibold text-center mb-6">What is your primary industry?</h3>
                        <div className="space-y-3">
                            <Label>Industry Sector</Label>
                            <Select value={data.industry} onValueChange={(val) => updateData("industry", val)}>
                                <SelectTrigger className="h-14 text-lg">
                                    <SelectValue placeholder="Select industry..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="technology">Technology & Software</SelectItem>
                                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                                    <SelectItem value="agriculture">Agriculture & Agri-Food</SelectItem>
                                    <SelectItem value="healthcare">Healthcare & Life Sciences</SelectItem>
                                    <SelectItem value="energy">Clean Tech & Energy</SelectItem>
                                    <SelectItem value="retail">Retail & E-commerce</SelectItem>
                                    <SelectItem value="services">Professional Services</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                )}

                {/* Step 4: Revenue */}
                {step === 4 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h3 className="text-xl font-semibold text-center mb-6">What is your current annual revenue?</h3>
                        <RadioGroup value={data.revenue} onValueChange={(val) => updateData("revenue", val)} className="gap-4">
                            {[
                              { value: 'pre-revenue', label: 'Pre-revenue / Startup' },
                              { value: 'under-100k', label: 'Under $100,000' },
                              { value: '100k-500k', label: '$100,000 - $500,000' },
                              { value: '500k-1m', label: '$500,000 - $1M' },
                              { value: 'over-1m', label: 'Over $1M' },
                            ].map(opt => (
                              <Label key={opt.value} className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer hover:bg-gray-50 transition-colors ${data.revenue === opt.value ? 'border-green-500 bg-green-50 text-green-700' : ''}`}>
                                <div className="flex items-center gap-3">
                                    <RadioGroupItem value={opt.value} />
                                    <span className="font-medium text-base">{opt.label}</span>
                                </div>
                              </Label>
                            ))}
                        </RadioGroup>
                    </div>
                )}

                {/* Step 5: Analyzing */}
                {step === 5 && (
                    <div className="space-y-6 animate-in fade-in zoom-in duration-500 py-8">
                        <div className="space-y-4 text-left max-w-sm mx-auto font-medium text-slate-700">
                            <div className="flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                <CheckCircle className="text-emerald-500 w-5 h-5 shrink-0" /> Checking {data.province || "provincial"} programs
                            </div>
                            <div className="flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-500" style={{ animationFillMode: 'backwards' }}>
                                <CheckCircle className="text-emerald-500 w-5 h-5 shrink-0" /> Checking {data.industry || "industry"} eligibility
                            </div>
                            <div className="flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-1000" style={{ animationFillMode: 'backwards' }}>
                                <CheckCircle className="text-emerald-500 w-5 h-5 shrink-0" /> Verifying revenue thresholds
                            </div>
                            {data.goal && (
                                <div className="flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-1500" style={{ animationFillMode: 'backwards' }}>
                                    <CheckCircle className="text-emerald-500 w-5 h-5 shrink-0" /> Scanning {data.goal === 'just researching' ? 'general' : data.goal} programs
                                </div>
                            )}
                            <div className="flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-[2000ms]" style={{ animationFillMode: 'backwards' }}>
                                <CheckCircle className="text-emerald-500 w-5 h-5 shrink-0" /> Checking active intakes
                            </div>
                            <div className="mt-8 text-center animate-in fade-in zoom-in duration-500 delay-[2500ms]" style={{ animationFillMode: 'backwards' }}>
                                <h3 className="text-2xl sm:text-3xl font-bold text-emerald-700">{grantCount} matches found</h3>
                            </div>
                        </div>
                    </div>
                )}

                {/* ═══════════════════════════════════════════════════
                    STEP 6: REPORT CHECKOUT / PAYWALL
                   ═══════════════════════════════════════════════════ */}
                {step === 6 && !isSuccess && (
                    <div className="grid md:grid-cols-12 gap-8 animate-in fade-in zoom-in-95 duration-500 py-2">
                        {/* LEFT COLUMN: Checkout & Preview (col-span-7) */}
                        <div className="md:col-span-7 space-y-6">
                            {/* Trust-First Copy Notice Banner */}
                            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-left shadow-xs flex items-start gap-3.5">
                              <CheckCircle className="w-5.5 h-5.5 text-emerald-600 shrink-0 mt-0.5 animate-pulse" />
                              <div>
                                <h4 className="font-extrabold text-emerald-955 text-sm sm:text-base">
                                  {data.company
                                    ? `Opportunity Identification for ${data.company}`
                                    : "Opportunities Identified"}
                                </h4>
                                <p className="text-emerald-800 text-xs sm:text-sm mt-1 leading-relaxed">
                                  Based on the information you provided, we identified matching programs that fit your regional and industry profile.
                                </p>
                                <div className="mt-3 bg-white/90 border border-emerald-250 rounded-lg px-3 py-2.5 text-xs text-emerald-900 font-semibold flex items-center gap-2">
                                  <span className="bg-emerald-600 text-white rounded px-1.5 py-0.5 text-[10px] font-extrabold uppercase shrink-0">Report Credit Offer</span>
                                  <span>Purchase your report today. Upgrade to a 1-on-1 Strategy Audit within 7 days, and your report fee is 100% credited.</span>
                                </div>
                              </div>
                            </div>

                            {/* Interactive Blurred Report Preview */}
                            <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm relative">
                                <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-5 py-4 flex items-center justify-between">
                                  <div className="flex items-center gap-2.5">
                                    <FileText className="w-5 h-5 text-emerald-400" />
                                    <span className="font-semibold text-white text-sm">Matched Programs Preview</span>
                                  </div>
                                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-bold uppercase">Live Match</span>
                                </div>
                                <div className="px-5 py-5 space-y-4">
                                  <p className="text-xs text-slate-500">
                                    Matched via regional and industry-specific criteria. Purchase any package to reveal full submission guidelines, eligibility checklists, and timeline templates.
                                  </p>
                                  {getMatchedPrograms(data).map((opp, idx) => (
                                    <div key={idx} className="border border-slate-150 rounded-xl p-4 bg-slate-50/40 flex flex-col gap-2 relative">
                                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                                        <div>
                                          <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 font-mono">Match #{idx + 1}</span>
                                          <h5 className="font-extrabold text-slate-800 text-sm mt-0.5">{opp.name}</h5>
                                        </div>
                                        <div className="text-left sm:text-right shrink-0 mt-1 sm:mt-0">
                                          <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded block sm:inline">Est. Funding Range</span>
                                          <span className="font-black text-slate-900 block text-xs sm:text-sm mt-0.5">{opp.range}</span>
                                        </div>
                                      </div>
                                      <p className="text-xs text-slate-600 leading-relaxed italic">
                                        Justification: {opp.justification}
                                      </p>
                                      
                                      {/* Match details - blurred for paywall except Match #1 */}
                                      <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs">
                                        <div>
                                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Match Fit Score</span>
                                          <div className="flex items-center gap-1.5 font-bold text-slate-750">
                                            {idx !== 0 && <Lock className="w-3.5 h-3.5 text-indigo-500 shrink-0" />}
                                            <span className={idx === 0 ? "text-emerald-700 font-extrabold" : "filter blur-[3.5px] select-none pointer-events-none text-slate-750"}>
                                              {idx === 0 ? "Strong Match" : "Strong Match"}
                                            </span>
                                          </div>
                                        </div>
                                        <div>
                                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Submission Complexity</span>
                                          <div className="flex items-center gap-1.5 font-bold text-slate-750">
                                            <span className={idx === 0 ? "text-slate-750 font-semibold" : "filter blur-[3.5px] select-none pointer-events-none text-slate-750"}>
                                              Moderate
                                            </span>
                                          </div>
                                        </div>
                                      </div>
 
                                      {/* Blurred Roadmap & Eligibility Teaser - unblurred for Match #1 */}
                                      <div className="mt-3 p-3 bg-slate-100/40 rounded-lg relative overflow-hidden border border-slate-100">
                                        {idx !== 0 && (
                                          <div className="absolute inset-0 bg-gradient-to-t from-slate-50/95 via-slate-50/60 to-slate-50/95 flex items-center justify-center z-10 select-none">
                                            <div className="flex items-center gap-1 bg-white/95 border border-indigo-150 px-2.5 py-1 rounded-full shadow-xs text-[10px] font-extrabold text-indigo-700">
                                              <Lock className="w-3 h-3 text-indigo-500" />
                                              <span>Unlock eligibility logic, documents list &amp; timeline roadmap</span>
                                            </div>
                                          </div>
                                        )}
                                        {idx === 0 ? (
                                          <div className="space-y-1.5 text-[11px] text-left">
                                            <div className="text-indigo-950 font-extrabold uppercase tracking-wider text-[9px] mb-2 flex items-center gap-1">
                                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Unlocked Match Parameters
                                            </div>
                                            <div className="flex items-start gap-1.5 text-slate-700">
                                              <span className="text-emerald-600 font-extrabold shrink-0">✓</span>
                                              <div>
                                                <strong>Funding Portion:</strong> {
                                                  opp.name.includes("SR&ED") ? "Up to 35% refundable tax credit on salaries" :
                                                  opp.name.includes("IRAP") ? "50% to 80% direct wage subsidy" :
                                                  opp.name.includes("Summer Jobs") ? "Up to 50% of provincial minimum wage" :
                                                  "50% matched co-funding"
                                                }
                                              </div>
                                            </div>
                                            <div className="flex items-start gap-1.5 text-slate-700">
                                              <span className="text-emerald-600 font-extrabold shrink-0">✓</span>
                                              <div>
                                                <strong>Deadline:</strong> {
                                                  opp.name.includes("SR&ED") ? "18 months from corporate fiscal year-end" :
                                                  opp.name.includes("IRAP") ? "Prior to active project start (no retroactive coverage)" :
                                                  opp.name.includes("Summer Jobs") ? "Annual program window (typically Jan-Feb)" :
                                                  "Rolling intake (approval takes 4-8 weeks)"
                                                }
                                              </div>
                                            </div>
                                            <div className="flex items-start gap-1.5 text-slate-700">
                                              <span className="text-emerald-600 font-extrabold shrink-0">✓</span>
                                              <div>
                                                <strong>Stacking Rules:</strong> {
                                                  opp.name.includes("SR&ED") ? "Fully stackable with provincial tax credits (OITC/CDAE)" :
                                                  opp.name.includes("IRAP") ? "Stackable with SR&ED on net non-subsidized wage portion" :
                                                  opp.name.includes("Summer Jobs") ? "Non-stackable with other concurrent federal wage grants" :
                                                  "Stackable with regional development loans"
                                                }
                                              </div>
                                            </div>
                                          </div>
                                        ) : (
                                          <div className="filter blur-[3.5px] space-y-1.5 opacity-40 text-[11px] select-none pointer-events-none">
                                            <div className="flex items-center gap-1.5">
                                              <span className="text-emerald-500 font-bold">✓</span>
                                              <span>Verify company registration status in province</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                              <span className="text-emerald-500 font-bold">✓</span>
                                              <span>Submit technical description within 18 months</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                              <span className="text-emerald-500 font-bold">✓</span>
                                              <span>Step 1: Contact regional technology advisor</span>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                            </div>

                            {/* "Your Analysis Includes" Checklist Card */}
                            <div className="border border-indigo-150 rounded-2xl bg-indigo-50/10 p-5 shadow-2xs text-left">
                              <h5 className="font-bold text-indigo-950 text-sm mb-3.5 flex items-center gap-2">
                                <ShieldCheck className="w-4.5 h-4.5 text-indigo-600" />
                                Your Custom Funding Analysis Includes:
                              </h5>
                              <ul className="space-y-3.5 text-xs sm:text-sm text-slate-800 font-medium">
                                <li className="flex items-start gap-2.5">
                                  <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                                  <div>
                                    <strong>Deterministic Funding Match Rating:</strong>
                                    <p className="text-xs text-slate-500 mt-0.5">Custom readiness assessment calculated from your business inputs.</p>
                                  </div>
                                </li>
                                <li className="flex items-start gap-2.5">
                                  <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                                  <div>
                                    <strong>Specific Program Eligibility Profiles:</strong>
                                    <p className="text-xs text-slate-500 mt-0.5">Full criteria checklists for each matched grant and tax incentive.</p>
                                  </div>
                                </li>
                                <li className="flex items-start gap-2.5">
                                  <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                                  <div>
                                    <strong>Deadline & Capital Allocations:</strong>
                                    <p className="text-xs text-slate-500 mt-0.5">Active funding windows, remaining program budgets, and lock-in dates.</p>
                                  </div>
                                </li>
                                <li className="flex items-start gap-2.5">
                                  <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                                  <div>
                                    <strong>Custom Document Preparation Checklists:</strong>
                                    <p className="text-xs text-slate-500 mt-0.5">Details on which financial and technical records you need to secure.</p>
                                  </div>
                                </li>
                                <li className="flex items-start gap-2.5">
                                  <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                                  <div>
                                    <strong>High-Risk Program Warning Flags:</strong>
                                    <p className="text-xs text-slate-500 mt-0.5">Key pitfalls to avoid to prevent rejection or post-audit clawbacks.</p>
                                  </div>
                                </li>
                              </ul>
                            </div>

                            {/* Trust Signals */}
                            <div className="rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                              <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-655 font-medium">
                                <span className="flex items-center gap-1.5"><span className="text-emerald-600 font-bold">✓</span> Sourced from verified B2B databases</span>
                                <span className="flex items-center gap-1.5"><span className="text-emerald-600 font-bold">✓</span> Weekly program updates &amp; amount checks</span>
                                <span className="flex items-center gap-1.5"><span className="text-emerald-600 font-bold">✓</span> Instant PDF access delivered to your inbox</span>
                              </div>
                              <div className="flex gap-3 shrink-0 text-xs font-semibold text-indigo-605">
                                <a href="/sample-report" target="_blank" rel="noopener" className="hover:underline whitespace-nowrap">Preview sample →</a>
                              </div>
                            </div>

                            {/* What You Receive deliverables summary */}
                            <div className="border border-slate-200 rounded-2xl bg-slate-50/40 p-6 text-left space-y-4">
                              <h4 className="font-extrabold text-slate-900 text-sm sm:text-base border-b border-slate-200 pb-2 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-indigo-605 shrink-0" />
                                What You Receive:
                              </h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs text-slate-707 font-medium">
                                <div className="flex items-center gap-2">
                                  <span className="text-emerald-600 font-extrabold">✓</span>
                                  <span>Up to 18 personalized opportunities based on your business profile</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-emerald-600 font-extrabold">✓</span>
                                  <span>Filing roadmap &amp; scheduler</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-emerald-600 font-extrabold">✓</span>
                                  <span>Program stacking order guidelines</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-emerald-600 font-extrabold">✓</span>
                                  <span>Programs to avoid (to prevent rejected applications)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-emerald-600 font-extrabold">✓</span>
                                  <span>Estimated success probability fit rates</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-emerald-600 font-extrabold">✓</span>
                                  <span>Required documents checklists</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-emerald-600 font-extrabold">✓</span>
                                  <span>Timeline month-by-month roadmaps</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-emerald-600 font-extrabold">✓</span>
                                  <span>CRA / IRAP stacking compliance notes</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-emerald-600 font-extrabold">✓</span>
                                  <span>Grant calendar timeline planning</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-emerald-600 font-extrabold">✓</span>
                                  <span>Provincial strategies &amp; local caps</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-emerald-600 font-extrabold">✓</span>
                                  <span>Funding sequence stacking matrices</span>
                                </div>
                              </div>
                              <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs">
                                <div className="text-slate-505 font-semibold">
                                  Estimated preparation time saved: <strong className="text-slate-800">32+ hours</strong>
                                </div>
                                <div className="text-slate-505 font-semibold text-right">
                                  <span>Designed to replace hours of manual research and consultant preparation.</span>
                                </div>
                              </div>
                            </div>

                             {/* 3-Tier Pricing Architecture */}
                             <div className="space-y-4">
                                 <h3 className="text-xl font-bold text-slate-900 text-center">Select Your Analysis Tier</h3>
                                 <p className="text-xs text-slate-500 font-semibold text-center -mt-2 mb-2">
                                   Choose the level of guidance that&apos;s right for your business.
                                 </p>
                                 <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-905 font-medium flex items-start gap-2.5 max-w-2xl mx-auto mb-4">
                                   <span className="text-base shrink-0 mt-0.5">⚠️</span>
                                   <div className="text-left">
                                     <strong>Intake Deadlines:</strong> Government program intakes open and close throughout the fiscal year. Some programs have limited intake windows or capping limits. Select your tier below to secure current eligibility stacking guidelines.
                                   </div>
                                 </div>
                                 
                                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                     {/* Tier 3: $19 Match Report */}
                                     <div
                                         onClick={() => setSelectedProductId('funding-match-report')}
                                         className={`cursor-pointer border-2 rounded-xl p-5 relative transition-all flex flex-col justify-between ${
                                         selectedProductId === 'funding-match-report'
                                             ? 'border-slate-500 bg-slate-50/50 shadow-md ring-1 ring-slate-500'
                                             : 'border-slate-200 bg-white hover:border-slate-350'
                                         }`}
                                     >
                                         <div>
                                             <div className="flex items-center justify-between">
                                                  <h4 className="font-bold text-slate-800 text-sm flex flex-col gap-0.5 items-start text-left">
                                                    <span>Know Which Programs to Apply To</span>
                                                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Funding Match Report</span>
                                                  </h4>
                                                 {selectedProductId === 'funding-match-report' && <CheckCircle className="w-4 h-4 text-slate-550 shrink-0" />}
                                             </div>
                                             <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed text-left">We identify which programs are worth your time before you spend hours applying.</p>
                                             <div className="mt-3 flex items-baseline gap-1">
                                                 <span className="text-2xl font-black text-slate-900">$19</span>
                                                 <span className="text-[10px] text-slate-400">one-time</span>
                                             </div>
                                             <ul className="mt-4 space-y-2 text-[11px] text-slate-600 border-t border-slate-100 pt-3 text-left">
                                                 <li className="flex items-center gap-1.5"><span className="text-emerald-600 font-bold">✓</span> Personalized Match List</li>
                                                 <li className="flex items-center gap-1.5"><span className="text-emerald-600 font-bold">✓</span> Est. Funding Ranges</li>
                                                 <li className="flex items-center gap-1.5"><span className="text-emerald-600 font-bold">✓</span> Documents Checklist</li>
                                                 <li className="flex items-center gap-1.5 text-slate-350 line-through"><span className="font-bold">✗</span> Program Risk Scores</li>
                                                 <li className="flex items-center gap-1.5 text-slate-350 line-through"><span className="font-bold">✗</span> Step-by-Step Roadmaps</li>
                                                 <li className="flex items-center gap-1.5 text-slate-350 line-through"><span className="font-bold">✗</span> Application Templates</li>
                                             </ul>
                                         </div>
                                         <div className="mt-4">
                                             <span 
                                                className={`w-full py-2.5 px-3 text-center text-xs font-bold rounded-lg block border cursor-pointer transition-all ${
                                                selectedProductId === 'funding-match-report' 
                                                  ? 'bg-slate-800 text-white border-slate-800 shadow-md' 
                                                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                                              }`}
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  setSelectedProductId('funding-match-report');
                                                  setTimeout(() => {
                                                    document.getElementById('calc-email-for-report')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                                    document.getElementById('calc-email-for-report')?.focus();
                                                  }, 300);
                                                }}
                                              >
                                                {selectedProductId === 'funding-match-report' ? 'Continue to Secure Checkout →' : 'Select Basic'}
                                              </span>
                                         </div>
                                     </div>

                                     {/* Tier 1: $79 Complete Bundle (Highlighted Center Card) */}
                                     <div
                                         onClick={() => setSelectedProductId('funding-bundle')}
                                         className={`cursor-pointer border-2 rounded-xl p-5 relative overflow-hidden transition-all flex flex-col justify-between md:-translate-y-1 md:scale-105 ${
                                         selectedProductId === 'funding-bundle'
                                             ? 'border-indigo-600 bg-indigo-50/15 shadow-lg ring-1 ring-indigo-600'
                                             : 'border-indigo-500/35 bg-white hover:border-indigo-400 shadow-xs'
                                         }`}
                                     >
                                         <div className="absolute top-0 inset-x-0 bg-indigo-600 text-white text-[8px] font-extrabold py-0.5 text-center uppercase tracking-wider">
                                             Most Popular &amp; Best Value
                                         </div>
                                         <div className="pt-2">
                                             <div className="flex items-center justify-between">
                                                  <h4 className="font-extrabold text-slate-900 text-sm flex flex-col gap-0.5 items-start text-left">
                                                    <span>Go From Research to Application</span>
                                                    <span className="text-[9px] text-indigo-650 font-bold uppercase tracking-wider block">Complete Stacking Bundle</span>
                                                  </h4>
                                                 {selectedProductId === 'funding-bundle' && <CheckCircle className="w-4 h-4 text-indigo-600 shrink-0" />}
                                             </div>
                                             <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed text-left font-medium">Everything required to map, plan, and prepare your applications correctly.</p>
                                             <div className="mt-3 flex items-baseline gap-1">
                                                 <span className="text-2xl font-black text-slate-900">$79</span>
                                                 <span className="text-[10px] text-slate-400">one-time</span>
                                             </div>
                                             <ul className="mt-4 space-y-2 text-[11px] text-slate-750 border-t border-indigo-100 pt-3 text-left">
                                                 <li className="flex items-center gap-1.5 font-bold text-indigo-950"><span className="text-indigo-600 font-bold">✓</span> Stacking Sequence Guidelines</li>
                                                 <li className="flex items-center gap-1.5 font-bold text-indigo-950"><span className="text-indigo-600 font-bold">✓</span> Eligibility Roadmaps</li>
                                                 <li className="flex items-center gap-1.5 font-bold text-indigo-950"><span className="text-indigo-600 font-bold">✓</span> Application Templates</li>
                                                 <li className="flex items-center gap-1.5 font-bold text-indigo-950"><span className="text-indigo-600 font-bold">✓</span> Winning Case Examples</li>
                                                 <li className="flex items-center gap-1.5"><span className="text-indigo-600 font-bold">✓</span> Program Fit Risk Ratings</li>
                                                 <li className="flex items-center gap-1.5"><span className="text-indigo-600 font-bold">✓</span> 30-Day Refund Guarantee</li>
                                             </ul>
                                         </div>
                                         <div className="mt-4">
                                              <span 
                                                className={`w-full py-2.5 px-3 text-center text-xs font-bold rounded-lg block border cursor-pointer transition-all ${
                                                selectedProductId === 'funding-bundle' 
                                                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg ring-2 ring-indigo-400 ring-offset-1' 
                                                  : 'bg-white text-indigo-600 border-indigo-200 hover:bg-indigo-50'
                                              }`}
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  setSelectedProductId('funding-bundle');
                                                  setTimeout(() => {
                                                    document.getElementById('calc-email-for-report')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                                    document.getElementById('calc-email-for-report')?.focus();
                                                  }, 300);
                                                }}
                                              >
                                                {selectedProductId === 'funding-bundle' ? 'Continue to Secure Checkout →' : 'Select Complete Bundle'}
                                              </span>
                                         </div>
                                     </div>

                                     {/* Tier 2: $49 Action Plan */}
                                     <div
                                         onClick={() => setSelectedProductId('funding-roadmap')}
                                         className={`cursor-pointer border-2 rounded-xl p-5 relative transition-all flex flex-col justify-between ${
                                         selectedProductId === 'funding-roadmap'
                                             ? 'border-emerald-500 bg-emerald-50/10 shadow-md ring-1 ring-emerald-500'
                                             : 'border-slate-200 bg-white hover:border-slate-350'
                                         }`}
                                     >
                                         <div>
                                             <div className="flex items-center justify-between">
                                                  <h4 className="font-bold text-slate-900 text-sm flex flex-col gap-0.5 items-start text-left">
                                                    <span>Your Step-by-Step Filing Plan</span>
                                                    <span className="text-[9px] text-emerald-600 font-bold uppercase tracking-wider block">Funding Action Plan</span>
                                                  </h4>
                                                 {selectedProductId === 'funding-roadmap' && <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />}
                                             </div>
                                             <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed text-left">We tell you exactly what to do first, second, and third to stack funding.</p>
                                             <div className="mt-3 flex items-baseline gap-1">
                                                 <span className="text-2xl font-black text-slate-900">$49</span>
                                                 <span className="text-[10px] text-slate-400">one-time</span>
                                             </div>
                                             <ul className="mt-4 space-y-2 text-[11px] text-slate-600 border-t border-slate-100 pt-3 text-left">
                                                 <li className="flex items-center gap-1.5"><span className="text-emerald-600 font-bold">✓</span> Stacking Sequence Guidelines</li>
                                                 <li className="flex items-center gap-1.5"><span className="text-emerald-600 font-bold">✓</span> Eligibility Roadmaps</li>
                                                 <li className="flex items-center gap-1.5"><span className="text-emerald-600 font-bold">✓</span> Program Fit Risk Ratings</li>
                                                 <li className="flex items-center gap-1.5"><span className="text-emerald-600 font-bold">✓</span> Verified B2B Database</li>
                                                 <li className="flex items-center gap-1.5 text-slate-350 line-through"><span className="font-bold">✗</span> Application Templates</li>
                                                 <li className="flex items-center gap-1.5 text-slate-350 line-through"><span className="font-bold">✗</span> Winning Case Examples</li>
                                             </ul>
                                         </div>
                                         <div className="mt-4">
                                              <span 
                                                className={`w-full py-2.5 px-3 text-center text-xs font-bold rounded-lg block border cursor-pointer transition-all ${
                                                selectedProductId === 'funding-roadmap' 
                                                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-md' 
                                                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                                              }`}
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  setSelectedProductId('funding-roadmap');
                                                  setTimeout(() => {
                                                    document.getElementById('calc-email-for-report')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                                    document.getElementById('calc-email-for-report')?.focus();
                                                  }, 300);
                                                }}
                                              >
                                                {selectedProductId === 'funding-roadmap' ? 'Continue to Secure Checkout →' : 'Select Action Plan'}
                                              </span>
                                         </div>
                                     </div>
                                 </div>
                             </div>

                            {/* Package Specific Deliverables Card */}
                            {(() => {
                              const info = getPackageDeliverables(selectedProductId);
                              return (
                                <div className="border-2 border-indigo-600 rounded-xl bg-indigo-50/10 p-5 text-left shadow-2xs">
                                  <div className="flex items-center justify-between mb-3 border-b border-indigo-150 pb-2">
                                    <span className="text-xs font-bold text-indigo-950 uppercase tracking-wider">Unlocks for Selected Tier:</span>
                                    <span className="font-extrabold text-indigo-700 text-xs sm:text-sm">{info.title} ({info.price})</span>
                                  </div>
                                  <p className="text-xs text-slate-500 mb-3 font-medium">This package unlocks the following deliverables on your dashboard:</p>
                                  <ul className="space-y-2 text-xs text-slate-707 font-medium">
                                    {info.deliverables.map((d, i) => (
                                      <li key={i} className="flex items-start gap-2">
                                        <span className="text-indigo-600 font-bold shrink-0">✓</span>
                                        <div>
                                          <strong>{d.label}:</strong> {d.desc}
                                        </div>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              );
                            })()}

                            {/* Social Proof Stats Bar */}
                            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                              <div>
                                <div className="font-extrabold text-slate-900 text-sm sm:text-base leading-tight">120+</div>
                                <div className="text-[9px] text-slate-500 font-bold uppercase mt-0.5">Funding Eligibility Assessments Generated</div>
                              </div>
                              <div>
                                <div className="font-extrabold text-slate-900 text-sm sm:text-base leading-tight">3,800+</div>
                                <div className="text-[9px] text-slate-500 font-bold uppercase mt-0.5">Funding Records Indexed</div>
                              </div>
                              <div>
                                <div className="font-extrabold text-slate-900 text-sm sm:text-base leading-tight">250+</div>
                                <div className="text-[9px] text-slate-500 font-bold uppercase mt-0.5">Active Programs</div>
                              </div>
                              <div>
                                <div className="font-extrabold text-slate-900 text-sm sm:text-base leading-tight">45s</div>
                                <div className="text-[9px] text-slate-500 font-bold uppercase mt-0.5">Avg Report Time</div>
                              </div>
                            </div>

                            {/* Email Capture & Payment */}
                            <div className="bg-gradient-to-br from-slate-50 to-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm focus-within:pb-36 md:focus-within:pb-6 transition-all duration-300">
                                {/* Personalized Metadata Header */}
                                {(() => {
                                  const cleanField = (val: string, fallback: string) => {
                                    if (!val) return fallback;
                                    const trimmed = val.trim();
                                    const lower = trimmed.toLowerCase();
                                    if (lower === "n/a" || lower === "other" || lower === "general" || lower === "undefined" || lower === "null") {
                                      return fallback;
                                    }
                                    return trimmed;
                                  };

                                  const rawProv = cleanField(data.province, "Canada");
                                  const provinceName = PROVINCE_NAMES[rawProv.toLowerCase()] || rawProv;

                                  const rawInd = cleanField(data.industry, "General Business");
                                  const industryName = INDUSTRY_NAMES[rawInd.toLowerCase()] || rawInd;

                                  const companyName = cleanField(data.company, "Your Business");

                                  return (
                                    <div className="bg-slate-800 text-white rounded-xl p-4 text-left shadow-2xs border border-slate-700 flex flex-col gap-1.5 mb-6">
                                      <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Personalized Outcome Preview</div>
                                      <div className="text-sm font-semibold">
                                        <span className="text-slate-400">Prepared specifically for:</span> <span className="text-emerald-400">{companyName}</span>
                                      </div>
                                      <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 pt-1.5 border-t border-slate-700 mt-1">
                                        <div>
                                          <span className="text-slate-400">Industry:</span> {industryName}
                                        </div>
                                        <div>
                                          <span className="text-slate-400">Region:</span> {provinceName}
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })()}

                                <h4 className="font-bold text-slate-900 text-base mb-4 text-center">Where should we send your custom analysis?</h4>
                                <div className="space-y-4 mb-6">
                                    <div>
                                        <Input 
                                            id="calc-email-for-report" 
                                            type="email" 
                                            placeholder="jane@yourbusiness.com" 
                                            className="h-12 bg-white text-base" 
                                            value={data.email} 
                                            onChange={(e) => {
                                                updateData("email", e.target.value);
                                                const el = document.getElementById('calc-email-for-report');
                                                if (el) el.classList.remove('ring-2', 'ring-red-500');
                                                const err = document.getElementById('email-error');
                                                if (err) err.classList.add('hidden');
                                            }} 
                                            onFocus={() => {
                                                trackEvent('calc_email_focused');
                                            }}
                                            required 
                                        />
                                        <p className="text-xs text-red-500 mt-1 hidden" id="email-error">Please enter a valid email to proceed.</p>
                                    </div>
                                </div>
                                
                                <div className="mb-5 bg-slate-50 border border-slate-200 rounded-xl p-4 text-left space-y-2.5">
                                    <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                                        <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
                                        <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Checkout Security &amp; Guarantees</h5>
                                    </div>
                                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-slate-655 font-medium">
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-emerald-600">🔒</span>
                                            <span>Secure PayPal Checkout</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-emerald-600">✅</span>
                                            <span>100% Money-Back Guarantee</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-emerald-600">⭐</span>
                                            <span>Analyst Reviewed</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-emerald-600">📄</span>
                                            <a href="/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-indigo-650">Refund Policy</a>
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-slate-505 leading-relaxed pt-1.5 border-t border-slate-150 mt-1">
                                        <strong>Founder Guarantee:</strong> If, based on the information you provide, we cannot identify any eligible funding opportunities in your report, you&apos;re covered by our refund policy.
                                    </p>
                                </div>

                                {/* What Happens Next Block */}
                                <div className="mb-6 bg-slate-50 rounded-xl p-4 border border-slate-200 text-left">
                                    <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">What Happens Next?</h5>
                                    <ol className="space-y-1.5 text-xs text-slate-600 font-medium">
                                        <li className="flex items-start gap-2">
                                            <span className="text-indigo-600 font-bold">1.</span>
                                            <span>Complete secure checkout</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-indigo-600 font-bold">2.</span>
                                            <span>Unlock your matching programs instantly</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-indigo-600 font-bold">3.</span>
                                            <span>Review detailed strategy timeline on your dashboard</span>
                                        </li>
                                    </ol>
                                    <p className="text-[10px] text-slate-505 mt-2.5 italic">
                                        Average access time: less than 60 seconds
                                    </p>
                                </div>

                                {/* CTA Social Proof & Checkout Summary */}
                                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-5 text-left">
                                  <p className="text-xs text-slate-600 italic font-semibold mb-3">
                                    &ldquo;Businesses similar to yours use these reports to identify grant, loan, and tax credit opportunities.&rdquo;
                                  </p>
                                  <div className="grid grid-cols-2 gap-3 pt-2.5 border-t border-slate-200 text-xs">
                                    <div>
                                      <span className="text-slate-500 block uppercase tracking-wider text-[9px] font-bold">Est. Funding Potential:</span>
                                      <span className="font-extrabold text-slate-800 text-sm">
                                        {estimate ? `$${estimate.toLocaleString()}` : "$25,000"} - {estimateMax ? `$${estimateMax.toLocaleString()}` : "$95,000"}
                                      </span>
                                    </div>
                                    <div>
                                      <span className="text-slate-500 block uppercase tracking-wider text-[9px] font-bold">Identified Categories:</span>
                                      <span className="font-extrabold text-slate-800 text-sm">
                                        3 Key Programs Matched
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                {/* B2B Upgrades / Addons / Bumps Section */}
                                 <div className="space-y-3.5 mb-6 text-left border-t border-slate-150 pt-5">
                                     <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Enhance Your Analysis (Optional Upgrades)</h5>

                                     {/* Upgrade 1: Action Plan Order Bump (Only shown if selectedProductId === 'funding-match-report') */}
                                     {selectedProductId === 'funding-match-report' && (
                                       <div 
                                         onClick={() => {
                                           setSelectedProductId('funding-bundle');
                                           if (typeof window !== 'undefined' && (window as any).gtag) {
                                             (window as any).gtag('event', 'addon_action_plan_bump_clicked');
                                           }
                                         }}
                                         className="cursor-pointer border-2 border-emerald-500 bg-emerald-50/20 rounded-xl p-4 flex items-start gap-3 transition-all hover:bg-emerald-50/40 relative overflow-hidden"
                                       >
                                         <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[8px] font-bold px-2 py-0.5 uppercase tracking-wider rounded-bl-lg">
                                           Best Value Upgrade
                                         </div>
                                         <div className="pt-1">
                                           <input 
                                             type="checkbox" 
                                             checked={false} 
                                             onChange={() => {}} 
                                             className="w-4 h-4 rounded text-emerald-605 focus:ring-emerald-500 border-slate-300"
                                           />
                                         </div>
                                         <div>
                                           <h6 className="font-extrabold text-slate-900 text-xs sm:text-sm">Add Step-by-Step Funding Action Plan (+$49 value)</h6>
                                           <p className="text-[11px] text-slate-505 leading-relaxed mt-1">
                                             Upgrades your basic report to the <strong>Complete Stacking Bundle</strong>. Tells you exactly what to do first, second, and third to stack matching programs successfully.
                                           </p>
                                           <div className="mt-2 text-xs font-bold text-slate-800">
                                             Upgrade for only <span className="text-emerald-700 font-extrabold">$79 total</span> (Save $10 on the bundle price!)
                                           </div>
                                         </div>
                                       </div>
                                     )}

                                     {/* Upgrade 1 Alternate (If they chose bundle, allow them to downgrade or see the locked-in check state) */}
                                     {selectedProductId === 'funding-bundle' && (
                                       <div 
                                         onClick={() => {
                                           setSelectedProductId('funding-match-report');
                                         }}
                                         className="cursor-pointer border border-indigo-200 bg-indigo-50/10 rounded-xl p-4 flex items-start gap-3 transition-all hover:bg-indigo-50/20"
                                       >
                                         <div className="pt-1">
                                           <input 
                                             type="checkbox" 
                                             checked={true} 
                                             readOnly 
                                             className="w-4 h-4 rounded text-indigo-605 focus:ring-indigo-500 border-slate-300"
                                           />
                                         </div>
                                         <div>
                                           <h6 className="font-extrabold text-indigo-950 text-xs sm:text-sm">Locked In: Complete Stacking Bundle ($79)</h6>
                                           <p className="text-[11px] text-slate-505 leading-relaxed mt-1">
                                             Includes both the <strong>Funding Match Report</strong> and the <strong>Filing Action Plan</strong>. Uncheck to downgrade back to basic $19 report.
                                           </p>
                                         </div>
                                       </div>
                                     )}

                                     {/* Upgrade 2: Toolkit Addon ($29) */}
                                     <div 
                                       onClick={() => setAddonToolkit(!addonToolkit)}
                                       className={`cursor-pointer border rounded-xl p-4 flex items-start gap-3 transition-all hover:bg-slate-50/80 ${
                                         addonToolkit ? 'border-indigo-500 bg-indigo-50/5 shadow-2xs' : 'border-slate-200 bg-white'
                                       }`}
                                     >
                                       <div className="pt-1">
                                         <input 
                                           type="checkbox" 
                                           checked={addonToolkit} 
                                           onChange={() => {}} 
                                           className="w-4 h-4 rounded text-indigo-605 focus:ring-indigo-505 border-slate-300"
                                         />
                                       </div>
                                       <div>
                                         <h6 className="font-extrabold text-slate-800 text-xs sm:text-sm flex items-center gap-1.5">
                                           <span>Add Funding Application Toolkit (+$29)</span>
                                           <span className="bg-indigo-100 text-indigo-805 text-[8px] font-bold px-1.5 py-0.5 rounded-full uppercase">Popular</span>
                                         </h6>
                                         <p className="text-[11px] text-slate-505 leading-relaxed mt-1">
                                           Instant download access to 6 premium templates, models, and tracking sheets including: Grant Budget Sheet, Cash Flow Forecast, Proposal Outline.
                                         </p>
                                       </div>
                                     </div>

                                     {/* Upgrade 3: Approval Library Addon ($9) */}
                                     <div 
                                       onClick={() => setAddonApprovalLibrary(!addonApprovalLibrary)}
                                       className={`cursor-pointer border rounded-xl p-4 flex items-start gap-3 transition-all hover:bg-slate-50/80 ${
                                         addonApprovalLibrary ? 'border-indigo-500 bg-indigo-50/5 shadow-2xs' : 'border-slate-200 bg-white'
                                       }`}
                                     >
                                       <div className="pt-1">
                                         <input 
                                           type="checkbox" 
                                           checked={addonApprovalLibrary} 
                                           onChange={() => {}} 
                                           className="w-4 h-4 rounded text-indigo-605 focus:ring-indigo-505 border-slate-300"
                                         />
                                       </div>
                                       <div>
                                         <h6 className="font-extrabold text-slate-800 text-xs sm:text-sm">Add Funding Approval Library (+$9)</h6>
                                         <p className="text-[11px] text-slate-505 leading-relaxed mt-1">
                                           Review real successful R&D (SR&ED/IRAP) narratives, project descriptions, and approved budgets to clone winning strategies.
                                         </p>
                                       </div>
                                     </div>
                                 </div>

                                {renderB2BMetadataBlock()}

                                <div className="min-h-[150px] space-y-3.5 pt-3">
                                    {!sdkReady ? (
                                        <div className="flex items-center justify-center py-4 gap-2 text-sm text-slate-500">
                                        <Loader2 className="w-4 h-4 animate-spin" /> Loading secure checkout...
                                        </div>
                                    ) : !isEmailValid ? (
                                        <div className="text-center p-6 bg-slate-50 border border-slate-200 border-dashed rounded-xl text-xs font-semibold text-slate-500 animate-pulse">
                                          Please enter a valid business email address above to enable secure checkout.
                                        </div>
                                    ) : (
                                        <>
                                           {/* Stripe Card Payment */}
                                           {process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY && (
                                             <>
                                               <Button 
                                                 disabled={isStripeLoading}
                                                 onClick={handleStripeCheckout}
                                                 className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm rounded-lg flex items-center justify-center gap-2 shadow-sm transition-all"
                                               >
                                                 {isStripeLoading ? (
                                                   <>
                                                     <Loader2 className="w-4 h-4 animate-spin" /> Starting secure checkout...
                                                   </>
                                                 ) : (
                                                   <>
                                                     💳 Pay with Credit Card / Apple Pay
                                                   </>
                                                 )}
                                               </Button>

                                               <div className="relative flex py-1.5 items-center">
                                                 <div className="flex-grow border-t border-slate-200"></div>
                                                 <span className="flex-shrink mx-4 text-[9px] text-slate-400 font-bold uppercase tracking-widest">or</span>
                                                 <div className="flex-grow border-t border-slate-200"></div>
                                               </div>
                                             </>
                                           )}

                                           {/* PayPal Container */}
                                           <div id="calc-paypal-button" className="w-full"></div>
                                         </>
                                    )}
                                </div>
                                {paymentError && (
                                    <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mt-4">
                                    {paymentError}
                                    </div>
                                )}
                                <div className="mt-4 flex items-center justify-center gap-5 text-xs text-slate-500">
                                    <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-500" /> 30-Day Guarantee</span>
                                    <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-emerald-500" /> Instant Access</span>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Trust, Proof & Context (col-span-5) */}
                        <div className="md:col-span-5 space-y-6 border-t md:border-t-0 md:border-l border-slate-200 pt-6 md:pt-0 md:pl-6">
                            {/* Founder Authority Block */}
                            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left shadow-2xs">
                              <div className="flex items-center gap-3.5 mb-3 pb-3 border-b border-slate-200">
                                <div className="w-12 h-12 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-center text-emerald-600 font-extrabold text-lg shadow-2xs">
                                  AK
                                </div>
                                <div>
                                  <h4 className="font-extrabold text-sm text-slate-900 leading-tight">Ashwani Kumar</h4>
                                  <p className="text-[10px] text-slate-505 font-medium">Founder, FSI Digital</p>
                                </div>
                              </div>
                              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-emerald-700 mb-1.5 flex items-center gap-1.5">
                                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" /> Why FSI Digital Exists
                              </h4>
                              <p className="text-slate-600 text-xs leading-relaxed mb-2">
                                Finding government funding shouldn&apos;t mean wasting hundreds of hours parsing confusing listings or paying 20% success fees to expensive agencies.
                              </p>
                              <p className="text-slate-600 text-xs leading-relaxed">
                                We package consultant-grade research into affordable, self-serve eligibility reports. Every assessment is <strong>built using FSI Digital&apos;s funding research framework and analyst review process</strong>, giving you stacking strategies without high advisory markups.
                              </p>
                              <div className="mt-3 flex items-center gap-4">
                                <a href="/methodology" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-emerald-700 hover:underline">Our Methodology →</a>
                              </div>
                            </div>

                            {/* Why Trust This Report Credibility Card */}
                            <div className="bg-gradient-to-br from-indigo-950 to-slate-900 text-white rounded-2xl p-5 text-left shadow-2xs space-y-3 border border-indigo-900/60">
                              <h4 className="font-extrabold text-sm sm:text-base border-b border-indigo-900 pb-2 flex items-center gap-2 text-indigo-100">
                                <ShieldCheck className="w-5 h-5 text-indigo-400 shrink-0" />
                                Why trust this report?
                              </h4>
                              <p className="text-xs text-indigo-200 leading-relaxed font-medium">
                                Your analysis is prepared and verified using FSI Digital&apos;s proprietary scoring algorithm and intelligence databases:
                              </p>
                              <ul className="space-y-2.5 text-xs text-indigo-100 font-semibold">
                                <li className="flex items-center gap-2">
                                  <span className="text-emerald-400 font-bold">✓</span>
                                  <span>Continuously monitored Canadian funding programs</span>
                                </li>
                                <li className="flex items-center gap-2">
                                  <span className="text-emerald-400 font-bold">✓</span>
                                  <span>Current fiscal program eligibility criteria</span>
                                </li>
                                <li className="flex items-center gap-2">
                                  <span className="text-emerald-400 font-bold">✓</span>
                                  <span>Anti-double-dipping program stacking rules</span>
                                </li>
                                <li className="flex items-center gap-2">
                                  <span className="text-emerald-400 font-bold">✓</span>
                                  <span>Provincial and municipal funding databases</span>
                                </li>
                                <li className="flex items-center gap-2">
                                  <span className="text-emerald-400 font-bold">✓</span>
                                  <span>Comprehensive compliance review framework</span>
                                </li>
                              </ul>
                            </div>

                            {/* Why Founders Choose FSI Digital Over Generic AI */}
                            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left shadow-2xs space-y-3">
                              <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5 border-b border-slate-200 pb-1.5">
                                🤖 FSI Digital vs General AI
                              </h4>
                              <p className="text-[10px] text-slate-500 leading-relaxed font-medium mb-2">
                                General AI is excellent for general research, but lacks company context. FSI Digital applies your business profile against funding rules, stacking limitations, and filing strategy.
                              </p>
                              <div className="overflow-x-auto">
                                <table className="w-full text-xs text-left border-collapse">
                                  <thead>
                                    <tr className="border-b border-slate-250 text-slate-450 font-bold uppercase tracking-wider text-[8px]">
                                      <th className="pb-1.5">Objection</th>
                                      <th className="pb-1.5 text-slate-500">General AI (e.g. ChatGPT)</th>
                                      <th className="pb-1.5 text-indigo-750">FSI Digital</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-slate-150 text-slate-600 font-medium">
                                    <tr>
                                      <td className="py-2 font-bold text-slate-800">Precision</td>
                                      <td className="py-2 text-red-500">General advice / deadlines</td>
                                      <td className="py-2 text-emerald-700 font-bold">Personalized maps</td>
                                    </tr>
                                    <tr>
                                      <td className="py-2 font-bold text-slate-800">Stacking</td>
                                      <td className="py-2 text-red-500">No stacking rules</td>
                                      <td className="py-2 text-emerald-700 font-bold">Anti-dipping checks</td>
                                    </tr>
                                    <tr>
                                      <td className="py-2 font-bold text-slate-800">Context</td>
                                      <td className="py-2 text-red-500">Doesn&apos;t know profile</td>
                                      <td className="py-2 text-emerald-700 font-bold">Built for your business</td>
                                    </tr>
                                    <tr>
                                      <td className="py-2 font-bold text-slate-800">Sequence</td>
                                      <td className="py-2 text-red-500">No filing order</td>
                                      <td className="py-2 text-emerald-700 font-bold">Timeline roadmap</td>
                                    </tr>
                                    <tr>
                                      <td className="py-2 font-bold text-slate-800">Timelines</td>
                                      <td className="py-2 text-red-500">Outdated details</td>
                                      <td className="py-2 text-emerald-700 font-bold">Weekly monitored data</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>

                            {/* DIY vs FSI Digital Comparison */}
                            <div className="space-y-2">
                              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-500">How We Save You Time</h4>
                              <DiyComparisonTable />
                            </div>

                            {/* Representative Case Studies */}
                            <div className="space-y-4 pt-2">
                              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-500">Representative Client Scenarios</h4>
                              <div className="space-y-3">
                                {caseStudiesDatabase.filter(cs => cs.country === 'Canada').slice(0, 3).map((study) => (
                                  <div key={study.id} className="border border-slate-200 bg-white rounded-xl p-4 shadow-2xs text-left text-xs space-y-2">
                                    <div className="flex justify-between items-center pb-1.5 border-b border-slate-100">
                                      <span className="font-bold text-slate-400 uppercase tracking-wider text-[8px]">{study.industry} | {study.region}</span>
                                      <span className="font-extrabold text-emerald-750 bg-emerald-50 px-1.5 py-0.5 rounded text-[9px]">{study.totalFundingMatch} Matched</span>
                                    </div>
                                    <div className="space-y-1.5 text-slate-600">
                                      <p className="font-bold text-slate-800 text-[11px] leading-tight">{study.subtitle}</p>
                                      <p className="leading-relaxed"><strong className="text-slate-700">Programs:</strong> {study.programsStacked.join(' + ')}</p>
                                      <p className="leading-relaxed"><strong className="text-slate-700">Challenge:</strong> {study.challenge}</p>
                                      <p className="leading-relaxed"><strong className="text-slate-700">Outcome:</strong> {study.solution}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                              <div className="text-center">
                                <a href="/case-studies" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-slate-500 hover:text-slate-800 hover:underline">
                                  Browse All Representative Case Studies →
                                </a>
                              </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ═══════════════════════════════════════════════════
                    STEP 8: INSTANT REPORT DELIVERY
                   ═══════════════════════════════════════════════════ */}
                {step === 8 && isPurchased && (
                  <div className="space-y-6 animate-in fade-in duration-500 py-2">
                    {showUpsellScreen ? (
                      /* High-Urgency Upsell Screen */
                      <div className="space-y-6 max-w-lg mx-auto py-4">
                        <div className="text-center space-y-2">
                          <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-full text-emerald-600">
                            <CheckCircle className="w-6 h-6" />
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900">Your Funding Match Report is ready.</h3>
                          <p className="text-sm text-slate-550 leading-relaxed">
                            Most businesses stop after identifying opportunities. The businesses that secure funding create an action plan and execute it.
                          </p>
                        </div>

                        <div className="bg-gradient-to-br from-indigo-50 to-white border-2 border-indigo-200 rounded-2xl p-6 shadow-sm space-y-4">
                          <div className="text-center">
                            <h4 className="text-lg font-bold text-indigo-900">Upgrade to Your Funding Action Plan</h4>
                            <p className="text-xs text-indigo-650 font-medium mt-0.5">Don&apos;t just look at matches. Know exactly what to do next.</p>
                          </div>

                          <div className="space-y-2.5">
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Upgrade now to unlock:</p>
                            <ul className="space-y-2 text-sm text-slate-700">
                              <li className="flex items-start gap-2">
                                <span className="text-indigo-600 font-bold shrink-0">✓</span>
                                <div>
                                  <strong>Priority ranking</strong>
                                  <p className="text-xs text-slate-500">Rankings of programs by likelihood of success and timeline.</p>
                                </div>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-indigo-600 font-bold shrink-0">✓</span>
                                <div>
                                  <strong>Funding action plan</strong>
                                  <p className="text-xs text-slate-500">Step-by-step task lists detailing immediate next steps.</p>
                                </div>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-indigo-600 font-bold shrink-0">✓</span>
                                <div>
                                  <strong>Required documents</strong>
                                  <p className="text-xs text-slate-500">Custom document compilation checklists for matches.</p>
                                </div>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-indigo-600 font-bold shrink-0">✓</span>
                                <div>
                                  <strong>Application timeline</strong>
                                  <p className="text-xs text-slate-500">Application milestones mapped month-by-month (Months 1–4).</p>
                                </div>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-indigo-600 font-bold shrink-0">✓</span>
                                <div>
                                  <strong>Risk warnings</strong>
                                  <p className="text-xs text-slate-500">Compliance & audit warnings to secure allocations safely.</p>
                                </div>
                              </li>
                            </ul>
                          </div>

                          <div className="pt-2 border-t border-indigo-100 flex items-center justify-between">
                            <span className="text-sm font-semibold text-slate-500">One-time upgrade price:</span>
                            <span className="text-2xl font-extrabold text-indigo-900">$49.00 <span className="text-xs text-slate-400 font-normal">USD</span></span>
                          </div>

                          {paymentError && (
                            <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded p-2.5">
                              {paymentError}
                            </div>
                          )}

                          {renderB2BMetadataBlock()}

                          <div id="calc-upgrade-paypal-button" className="min-h-[50px]"></div>
                        </div>

                        <div className="text-center pt-2">
                          <button
                            onClick={() => setShowUpsellScreen(false)}
                            className="text-slate-400 hover:text-slate-600 text-sm font-medium transition-colors"
                          >
                            No thanks, view my report &rarr;
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Report display */
                      <div className="space-y-6">
                        {/* Success Header */}
                        <div className="text-center">
                          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-3">
                            <CheckCircle className="w-8 h-8 text-emerald-600" />
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900">Your Report is Ready!</h3>
                          <p className="text-sm text-slate-500 mt-1">
                            A copy has been sent to <strong>{data.email}</strong>
                          </p>
                          {reportData && (
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
                          )}
                        </div>

                        {/* Loading state with step-by-step progress checklist */}
                        {isLoadingReport && (
                          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 max-w-md mx-auto text-left shadow-2xs space-y-6 animate-in fade-in duration-300">
                            {reportLoadStep === 6 ? (
                              <div className="space-y-4 animate-in fade-in duration-300">
                                <div className="text-center space-y-2 pb-3 border-b border-slate-200">
                                  <h4 className="font-extrabold text-slate-900 text-base">Analysis Complete</h4>
                                  <p className="text-[11px] text-slate-500 font-medium">Compilation verified successfully</p>
                                </div>
                                <div className="space-y-3">
                                  <div className="flex items-center gap-2.5 text-xs font-semibold text-emerald-600">
                                    <span className="font-extrabold text-sm">✔</span>
                                    <span>Up to 18 funding opportunities analyzed</span>
                                  </div>
                                  <div className="flex items-center gap-2.5 text-xs font-semibold text-emerald-600">
                                    <span className="font-extrabold text-sm">✔</span>
                                    <span>Stacking sequence rules applied</span>
                                  </div>
                                  <div className="flex items-center gap-2.5 text-xs font-semibold text-emerald-600">
                                    <span className="font-extrabold text-sm">✔</span>
                                    <span>Incorporation limits verified</span>
                                  </div>
                                  <div className="flex items-center gap-2.5 text-xs font-semibold text-emerald-600">
                                    <span className="font-extrabold text-sm">✔</span>
                                    <span>Intake deadlines mapped</span>
                                  </div>
                                </div>
                                <div className="pt-3 border-t border-slate-100 flex items-center gap-2.5 text-xs font-bold text-indigo-650 justify-center animate-pulse">
                                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                  <span>Opening Report...</span>
                                </div>
                              </div>
                            ) : (
                              <>
                                <div className="text-center space-y-2 pb-2 border-b border-slate-200">
                                  <Loader2 className="w-6 h-6 animate-spin text-indigo-655 mx-auto" />
                                  <h4 className="font-extrabold text-slate-900 text-base">Generating your report...</h4>
                                  <p className="text-[11px] text-slate-500 font-medium">FSI Digital research engine compiling matching parameters</p>
                                </div>
                                
                                <div className="space-y-3">
                                  {[
                                    "Checking Federal Programs",
                                    "Checking Provincial Programs",
                                    "Checking Tax Credits",
                                    "Running Stacking Rules",
                                    "Building Funding Timeline",
                                    "Preparing Action Plan"
                                  ].map((stepLabel, idx) => {
                                    const isDone = reportLoadStep > idx;
                                    const isActive = reportLoadStep === idx;
                                    return (
                                      <div key={idx} className="flex items-center justify-between text-xs font-semibold">
                                        <div className="flex items-center gap-2.5">
                                          <span className={isDone ? "text-emerald-600 font-extrabold" : isActive ? "text-indigo-600 animate-pulse font-extrabold" : "text-slate-350"}>
                                            {isDone ? "✓" : isActive ? "●" : "○"}
                                          </span>
                                          <span className={isDone ? "text-slate-700" : isActive ? "text-indigo-900 font-bold" : "text-slate-400 font-normal"}>
                                            {stepLabel}
                                          </span>
                                        </div>
                                        <span className={`text-[9px] uppercase font-bold tracking-wider ${
                                          isDone ? "text-emerald-600 font-bold" : isActive ? "text-indigo-600 animate-pulse font-bold" : "text-slate-350 font-normal"
                                        }`}>
                                          {isDone ? "Done" : isActive ? "Running..." : "Pending"}
                                        </span>
                                      </div>
                                    );
                                  })}
                                </div>
                              </>
                            )}
                          </div>
                        )}

                        {/* Full Report */}
                        {reportData && (
                          <div className="space-y-4">
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
                                <p className="text-xs text-slate-650 mb-4">
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
                                                email: data.email,
                                                event: "submit_survey",
                                                surveyType: "buyer",
                                                surveyResponse: opt.label
                                              })
                                            });
                                          } catch (e) {
                                            console.error(e);
                                          }
                                        }}
                                        className="bg-white hover:bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-left text-slate-700 font-medium transition-colors shadow-xs"
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
                                                email: data.email,
                                                event: "submit_survey",
                                                surveyType: "non-buyer-action-plan",
                                                surveyResponse: opt.label
                                              })
                                            });
                                          } catch (e) {
                                            console.error(e);
                                          }
                                        }}
                                        className="bg-white hover:bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-left text-slate-700 font-medium transition-colors shadow-xs"
                                      >
                                        {opt.label}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              )
                            )}

                            {/* Profile Summary */}
                            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                              <div className="grid grid-cols-2 gap-3 text-sm">
                                <div>
                                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">Region</p>
                                  <p className="font-semibold text-slate-700">{reportData.profile?.provinceName || PROVINCE_NAMES[data.province] || data.province}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">Industry</p>
                                  <p className="font-semibold text-slate-700">{reportData.profile?.industryName || INDUSTRY_NAMES[data.industry] || data.industry}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">Programs Matched</p>
                                  <p className="font-semibold text-emerald-700">{reportData.summary?.totalPrograms || grantCount}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">Readiness Score</p>
                                  <p className="font-semibold text-emerald-700">{reportData.summary?.readinessScore || 75}/100</p>
                                </div>
                              </div>
                            </div>

                            {/* Estimated Range */}
                            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
                              <p className="text-xs text-emerald-600 font-medium uppercase tracking-wide mb-1">Total Estimated Funding Range</p>
                              <p className="text-2xl font-bold text-emerald-700">
                                ${(reportData.summary?.estimatedTotalMin || estimate).toLocaleString()} – ${(reportData.summary?.estimatedTotalMax || estimateMax).toLocaleString()}
                              </p>
                            </div>

                            {/* Program Cards */}
                            <div className="space-y-3">
                              <h4 className="font-semibold text-slate-700 text-sm px-1">Matched Programs</h4>
                              {(reportData.programs || []).map((prog: any, i: number) => (
                                <div key={prog.id || i} className="border border-gray-200 rounded-xl p-4 space-y-3 bg-white">
                                  <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0 flex-1">
                                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                                        <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                                          prog.matchStrength === 'Strong Match' ? 'bg-emerald-100 text-emerald-700' :
                                          prog.matchStrength === 'Good Match' ? 'bg-blue-100 text-blue-700' :
                                          'bg-amber-100 text-amber-700'
                                        }`}>#{i + 1}</span>
                                        <h5 className="font-semibold text-slate-800 text-sm">{prog.name}</h5>
                                      </div>
                                      <p className="text-xs text-slate-500">{prog.agency}</p>
                                    </div>
                                    <div className="text-right shrink-0">
                                      <p className="text-sm font-bold text-emerald-700">{prog.estimatedRange || prog.fundingAmount}</p>
                                      <p className="text-xs text-slate-500">{prog.fundingType}</p>
                                    </div>
                                  </div>

                                  <div className="flex flex-wrap gap-2 text-xs">
                                    <span className={`px-2 py-0.5 rounded-full font-medium ${
                                      prog.matchStrength === 'Strong Match' ? 'bg-emerald-50 text-emerald-700' :
                                      prog.matchStrength === 'Good Match' ? 'bg-blue-50 text-blue-700' :
                                      'bg-amber-50 text-amber-700'
                                    }`}>
                                      <Star className="w-3 h-3 inline mr-0.5" />{prog.matchStrength}
                                    </span>
                                    <span className={`px-2 py-0.5 rounded-full ${
                                      prog.difficulty === 'Low' ? 'bg-green-50 text-green-700' :
                                      prog.difficulty === 'Moderate' ? 'bg-amber-50 text-amber-700' :
                                      'bg-red-50 text-red-700'
                                    }`}>
                                      Difficulty: {prog.difficulty}
                                    </span>
                                    <span className="bg-slate-50 text-slate-600 px-2 py-0.5 rounded-full">{prog.deadline || prog.status}</span>
                                  </div>

                                  {prog.matchReason && (
                                    <p className="text-xs text-slate-600 bg-slate-50 rounded-lg px-3 py-2">
                                      {prog.matchReason}
                                    </p>
                                  )}

                                  {prog.applicationSteps && prog.applicationSteps.length > 0 && (
                                    <div>
                                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Next Steps</p>
                                      <ul className="text-xs text-slate-600 space-y-1">
                                        {prog.applicationSteps.slice(0, 3).map((step: string, j: number) => (
                                          <li key={j} className="flex items-start gap-1.5">
                                            <span className="text-emerald-500 mt-0.5">→</span>
                                            <span>{step}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>

                            {/* ═══════ FUNDING ACTION PLAN DASHBOARD ═══════ */}
                            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden p-5 space-y-4">
                              <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-2">
                                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                                  <TrendingUp className="w-5 h-5 text-indigo-600" />
                                  Funding Action Plan Dashboard
                                </h3>
                                {!hasStrategyUnlocked && (
                                  <span className="bg-amber-100 text-amber-800 border border-amber-200 text-[10px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                                    <Lock className="w-3 h-3" /> Locked Upgrade
                                  </span>
                                )}
                              </div>

                              {/* Funding Potential Summary */}
                              {hasStrategyUnlocked && (
                                <div className="bg-slate-50 border border-slate-150 rounded-xl p-4 sm:p-5 text-left animate-in fade-in duration-300">
                                  <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-wide mb-3">Funding Potential Summary</h4>
                                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-center sm:text-left">
                                    <div className="bg-white border border-slate-100 rounded-lg p-3 shadow-xs">
                                      <span className="text-[10px] text-slate-400 font-semibold block uppercase tracking-wider">Potential Programs</span>
                                      <span className="text-lg font-extrabold text-slate-800 mt-1 block">{reportData?.programs?.length || 0}</span>
                                    </div>
                                    <div className="bg-white border border-slate-100 rounded-lg p-3 shadow-xs">
                                      <span className="text-[10px] text-slate-400 font-semibold block uppercase tracking-wider">Priority Programs</span>
                                      <span className="text-lg font-extrabold text-slate-800 mt-1 block">3</span>
                                    </div>
                                    <div className="bg-white border border-slate-100 rounded-lg p-3 shadow-xs col-span-2 sm:col-span-1">
                                      <span className="text-[10px] text-slate-400 font-semibold block uppercase tracking-wider">Est. Funding Range</span>
                                      <span className="text-sm font-extrabold text-emerald-700 mt-1 block">
                                        ${(reportData?.summary?.estimatedTotalMin || 0).toLocaleString()} – ${(reportData?.summary?.estimatedTotalMax || 0).toLocaleString()}
                                      </span>
                                    </div>
                                    <div className="bg-white border border-slate-100 rounded-lg p-3 shadow-xs">
                                      <span className="text-[10px] text-slate-400 font-semibold block uppercase tracking-wider">Est. Prep Time</span>
                                      <span className="text-sm font-extrabold text-slate-800 mt-1 block">
                                        {(() => {
                                          const topProgs = reportData?.programs?.slice(0, 3) || [];
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
                                          const topProgs = reportData?.programs?.slice(0, 3) || [];
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
                                    Never miss another grant deadline. Receive weekly updates on active programs, new grants, and approaching deadlines tailored for businesses in <span className="font-semibold text-indigo-300">{PROVINCE_NAMES[data.province] || data.province || 'your region'}</span> in the <span className="font-semibold text-indigo-300">{INDUSTRY_NAMES[data.industry] || data.industry || 'your industry'}</span> sector.
                                  </p>
                                  
                                  {isAlertsSubscribed ? (
                                    <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs rounded-lg p-3.5 flex items-center gap-2">
                                      <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                      </svg>
                                      <span>Success! You are subscribed to deadline alerts for {PROVINCE_NAMES[data.province] || data.province} ({INDUSTRY_NAMES[data.industry] || data.industry}).</span>
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
                              <div className="flex border-b border-slate-200 overflow-x-auto gap-2 text-xs font-medium scrollbar-thin">
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
                                    type="button"
                                    onClick={() => hasStrategyUnlocked && setActiveTab(tab.id as any)}
                                    className={`pb-2 px-2 border-b-2 transition-colors whitespace-nowrap ${
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
                              <div className="relative min-h-[200px]">
                                {/* Blurred overlay if locked */}
                                {!hasStrategyUnlocked && (
                                  <div className="absolute inset-0 bg-slate-50/70 backdrop-blur-[4.5px] z-10 rounded-xl flex items-center justify-center p-4">
                                    <div className="bg-white border border-indigo-100 rounded-xl p-5 text-center shadow-lg max-w-sm space-y-3">
                                      <div className="inline-flex items-center justify-center w-10 h-10 bg-indigo-50 rounded-full text-indigo-600">
                                        <Lock className="w-5 h-5 animate-pulse" />
                                      </div>
                                      <h4 className="text-sm font-bold text-slate-800">Unlock Your Funding Action Plan</h4>
                                      <p className="text-[11px] text-slate-500 leading-relaxed">
                                        Your Funding Match Report identifies matches, but securing funds requires a structured execution strategy. Upgrade to the Action Plan to prioritize applications, stack timelines, map document checklists, and review program risks.
                                      </p>
                                      <div className="text-xl font-extrabold text-slate-800">$49.00 <span className="text-xs text-slate-400 font-normal">USD one-time</span></div>
                                      
                                      {paymentError && (
                                        <p className="text-[11px] text-red-600 font-semibold bg-red-50 p-2 rounded border border-red-155">{paymentError}</p>
                                      )}
                                      
                                      {renderB2BMetadataBlock()}
                                      
                                      <div id="calc-dashboard-upgrade-paypal-button" className="min-h-[50px] w-full max-w-xs mx-auto"></div>
                                      
                                      <p className="text-[9px] text-slate-400">100% refund guarantee if your eligibility is not confirmed.</p>
                                    </div>
                                  </div>
                                )}

                                {/* Real Tab Contents */}
                                <div className={`${!hasStrategyUnlocked ? 'select-none pointer-events-none' : ''}`}>
                                  {activeTab === 'ranking' && (
                                    <div className="space-y-2.5">
                                      <p className="text-[11px] text-slate-500">Your matches ranked by funding feasibility and strategic alignment:</p>
                                      {(strategyData?.priorityRanking || [
                                        { rank: 1, name: 'Sample R&D Grant Opportunity', agency: 'Innovation Agency', fundingAmount: '$150,000', difficulty: 'Moderate', matchReason: 'Your software business matches the technology R&D mandate.' },
                                        { rank: 2, name: 'Sample Youth Employment Grant', agency: 'Employment & Training Corp', fundingAmount: '$15,000', difficulty: 'Low', matchReason: 'Your business operates in Canada and has hiring plans.' },
                                      ]).map((item: any, idx: number) => (
                                        <div key={idx} className="border border-slate-100 rounded-lg p-3 space-y-1 bg-white text-left">
                                          <div className="flex items-center justify-between gap-2">
                                            <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-1.5 py-0.5 rounded">Priority #{item.rank}</span>
                                            <strong className="text-xs text-emerald-700 font-bold">{item.fundingAmount}</strong>
                                          </div>
                                          <h4 className="text-xs font-semibold text-slate-800">{item.name}</h4>
                                          <p className="text-[10px] text-slate-400">{item.agency}</p>
                                          <p className="text-[11px] text-slate-650 bg-slate-50 p-2 rounded mt-1 leading-relaxed">{item.matchReason}</p>
                                        </div>
                                      ))}
                                    </div>
                                  )}

                                  {activeTab === 'timeline' && (
                                    <div className="space-y-3">
                                      <p className="text-[11px] text-slate-500">Milestone timeline to space out filings and secure matching cash reserves:</p>
                                      <div className="grid gap-2 sm:grid-cols-2 text-left">
                                        {(strategyData?.timeline || [
                                          { targetMonth: 'Month 1', programName: 'Primary Match R&D Program', actionRequired: 'Compile payroll sheets and begin writing project narrative summary.' },
                                          { targetMonth: 'Month 2', programName: 'Hiring/Wage Subsidy Match', actionRequired: 'Register job postings on job bank and submit candidate qualification forms.' },
                                          { targetMonth: 'Month 3', programName: 'Secondary R&D Tax Matching', actionRequired: 'Coordinate technical descriptions with developer sprints for review.' },
                                          { targetMonth: 'Month 4', programName: 'Pipeline Programs', actionRequired: 'Pre-check application pools for next intake window.' },
                                        ]).slice(0, 4).map((item: any, idx: number) => (
                                          <div key={idx} className="border border-slate-100 rounded-lg p-2.5 bg-slate-50/50">
                                            <span className="text-[10px] font-bold text-indigo-600 block mb-0.5">{item.targetMonth}</span>
                                            <h4 className="text-[11px] font-bold text-slate-800 truncate mb-0.5">{item.programName}</h4>
                                            <p className="text-[10px] text-slate-600 leading-relaxed">{item.actionRequired}</p>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {activeTab === 'sequence' && (
                                    <div className="space-y-2 text-left">
                                      <p className="text-[11px] text-slate-500">Staking sequence to maximize matching ratio and avoid grant duplication:</p>
                                      <ol className="space-y-1.5">
                                        {(strategyData?.sequence || [
                                          'Stage 1: Apply for wage subsidies/training grants before completing hires to lower baseline expenses.',
                                          'Stage 2: Leverage non-repayable grants to fund project development.',
                                          'Stage 3: Claim remaining technical labor via R&D tax credits at fiscal year-end.',
                                        ]).map((step: string, idx: number) => (
                                          <li key={idx} className="flex gap-2 text-xs text-slate-600 items-start bg-white p-2 border border-slate-100 rounded-lg">
                                            <span className="bg-indigo-100 text-indigo-700 font-bold shrink-0 w-4.5 h-4.5 rounded-full flex items-center justify-center text-[10px]">{idx + 1}</span>
                                            <span className="leading-relaxed mt-0.5 text-[11px]">{step}</span>
                                          </li>
                                        ))}
                                      </ol>
                                    </div>
                                  )}

                                  {activeTab === 'checklist' && (
                                    <div className="space-y-2 text-left">
                                      <p className="text-[11px] text-slate-500">Action items documentation checklist for matched programs:</p>
                                      <div className="grid gap-2 sm:grid-cols-2">
                                        {(strategyData?.docChecklist || [
                                          'Articles of Incorporation',
                                          'Financial statements for last 2 years',
                                          'Resume/profiles of key personnel',
                                          'Detailed software product architecture',
                                        ]).map((doc: string, idx: number) => (
                                          <label key={idx} className="flex items-start gap-2 text-[11px] text-slate-600 border border-slate-100 rounded-lg p-2 bg-white hover:bg-slate-50 transition-colors cursor-pointer select-none">
                                            <input type="checkbox" className="mt-0.5 border-slate-300 rounded text-indigo-600 focus:ring-indigo-500" />
                                            <span>{doc}</span>
                                          </label>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {activeTab === 'risks' && (
                                    <div className="space-y-2 text-left">
                                      <p className="text-[11px] text-slate-500">Core audit risk levels and potential compliance warnings:</p>
                                      <div className="space-y-1.5">
                                        {(strategyData?.riskWarnings || [
                                          { programName: 'Primary Match R&D Program', riskLevel: 'High', riskDescription: 'Rigorous documentation checks: keep strict hours logs.' },
                                          { programName: 'Hiring/Wage Subsidy Match', riskLevel: 'Low', riskDescription: 'Low audit risk. Requires simple tax returns and T4 summaries.' },
                                        ]).slice(0, 3).map((item: any, idx: number) => (
                                          <div key={idx} className="flex items-start gap-2 border border-slate-100 rounded-lg p-2.5 text-xs bg-white">
                                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                                              item.riskLevel === 'High' ? 'bg-red-100 text-red-700' :
                                              item.riskLevel === 'Moderate' ? 'bg-amber-100 text-amber-700' :
                                              'bg-green-100 text-green-700'
                                            }`}>{item.riskLevel} Risk</span>
                                            <div>
                                              <strong className="block text-slate-800 font-semibold mb-0.5 text-[11px]">{item.programName}</strong>
                                              <p className="text-slate-500 leading-relaxed text-[10px]">{item.riskDescription}</p>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {activeTab === 'actions' && (
                                    <div className="space-y-2 text-left">
                                      <p className="text-[11px] text-slate-500">Recommended action plan task list to initiate this month:</p>
                                      <div className="space-y-2 text-xs text-slate-705 bg-white p-2.5 border border-slate-100 rounded-lg">
                                        <div>
                                          <h5 className="font-bold text-slate-800 mb-1 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span> This Week</h5>
                                          <div className="space-y-1 pl-2.5 border-l border-indigo-100">
                                            {(strategyData?.actionPlan?.thisWeek || [
                                              'Review program guidelines for top matched program.',
                                              'Gather corporate incorporation documents.',
                                            ]).map((act: string, idx: number) => (
                                              <label key={idx} className="flex items-start gap-2 cursor-pointer select-none">
                                                <input type="checkbox" className="mt-0.5 border-slate-300 rounded text-indigo-600 focus:ring-indigo-500" />
                                                <span className="text-slate-600 text-[11px]">{act}</span>
                                              </label>
                                            ))}
                                          </div>
                                        </div>

                                        <div>
                                          <h5 className="font-bold text-slate-800 mb-1 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span> This Month</h5>
                                          <div className="space-y-1 pl-2.5 border-l border-indigo-100">
                                            {(strategyData?.actionPlan?.thisMonth || [
                                              'Setup R&D project developer time-logs tracking.',
                                              'Pre-verify matching credit line eligibility.',
                                            ]).map((act: string, idx: number) => (
                                              <label key={idx} className="flex items-start gap-2 cursor-pointer select-none">
                                                <input type="checkbox" className="mt-0.5 border-slate-300 rounded text-indigo-600 focus:ring-indigo-500" />
                                                <span className="text-slate-650 text-[11px]">{act}</span>
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

                            {/* Permanent Access Link */}
                            {accessToken && (
                              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
                                <p className="text-sm text-blue-700 font-medium mb-2">Bookmark your report for permanent access:</p>
                                <a
                                  href={`/products/report?token=${accessToken}`}
                                  data-google-vignette="false"
                                  className="text-sm text-blue-600 underline underline-offset-2 hover:text-blue-800 break-all"
                                >
                                  fsidigital.ca/products/report?token={accessToken.slice(0, 8)}...
                                </a>
                              </div>
                            )}
                          </div>
                        )}

                        {/* No report data yet and not loading */}
                        {!reportData && !isLoadingReport && (
                          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-center">
                            <p className="text-sm text-emerald-700 font-medium mb-2">Your report is being prepared.</p>
                            <p className="text-xs text-emerald-600">Check your email at <strong>{data.email}</strong> for a link to access it anytime.</p>
                          </div>
                        )}

                        {/* ═══════ UPSELL TO $199 AUDIT (Level 4 — Pay First) ═══════ */}
                        {(() => {
                          const discount = hasStrategyUnlocked 
                            ? (selectedProductId === 'funding-bundle' ? 79 : 49) 
                            : 19;
                          const netPrice = 199 - discount;
                          return (
                            <div className="border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-white rounded-2xl p-5 sm:p-6 text-center relative overflow-hidden">
                              <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-bl uppercase tracking-wider">
                                ${discount} Credit Applied
                              </div>
                              <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-full mb-3">
                                <TrendingUp className="w-6 h-6 text-indigo-600" />
                              </div>
                              <h4 className="text-lg font-bold text-slate-800 mb-1">Level 4 — Funding Strategy Audit</h4>
                              <p className="text-sm text-slate-500 mb-1 max-w-md mx-auto">
                                Want an FSI advisor to review your eligibility, identify your top 3 programs, and build a custom application roadmap?
                              </p>
                              <p className="text-xs text-slate-400 mb-4 max-w-sm mx-auto">
                                Pay now, then immediately book your 30-min strategy call. No waiting room. No sales pitch. Custom report delivered before the call.
                              </p>
                              <strong className="block mb-4 text-emerald-700 font-semibold bg-emerald-50 border border-emerald-100 rounded-lg p-2.5 max-w-xs mx-auto text-sm">
                                Your ${discount} report credit is applied — pay only ${netPrice}
                              </strong>
                              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                                <a
                                  href={`/audit?source=report-upsell&email=${encodeURIComponent(data.email)}&name=${encodeURIComponent(data.name)}&industry=${encodeURIComponent(data.industry)}&region=${encodeURIComponent(data.province)}&discount=${discount}`}
                                  data-google-vignette="false"
                                  className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-lg shadow-indigo-200"
                                  onClick={() => {
                                    trackEvent('audit_upsell_clicked', { source: 'funding_match_report' });
                                    fetch("/api/subscriber/track-activity", {
                                      method: "POST",
                                      headers: { "Content-Type": "application/json" },
                                      body: JSON.stringify({
                                        email: data.email,
                                        event: "audit_cta_clicked"
                                      })
                                    }).catch(e => console.error("Telemetry error:", e));
                                  }}
                                >
                                  Upgrade to Funding Audit — ${netPrice} <ArrowRight className="w-4 h-4" />
                                </a>
                                <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold px-3 py-1.5 rounded-full text-[11px] flex items-center gap-1 shadow-sm shrink-0">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                  ${discount} Report Credit Applied
                                </span>
                              </div>
                              <p className="text-xs text-slate-400 mt-2">Pay first → Book your call instantly → 100% refund if no programs match</p>
                            </div>
                          );
                        })()}
                      </div>
                    )}
                  </div>
                )}

                {/* Free Summary Success (fallback path) */}
                {isSuccess && step === 6 && (
                    <div className="py-12 space-y-6 text-center animate-in fade-in duration-500">
                        <div className="flex justify-center mb-6">
                            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-12 h-12" />
                            </div>
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900">Summary Sent!</h3>
                        <p className="text-xl text-gray-600 mb-4 max-w-md mx-auto">
                            Check your inbox. We&apos;ve sent a free summary to <strong>{data.email}</strong>.
                        </p>
                        {!nonBuyerSurveyCompleted && (
                          <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-150 rounded-xl p-5 text-left mb-6 max-w-md mx-auto animate-in fade-in duration-300">
                            <h4 className="text-xs font-bold text-amber-900 flex items-center gap-1.5 mb-1.5">
                              <span>💡 Quick Feedback</span>
                            </h4>
                            <p className="text-[11px] text-slate-650 mb-3 font-medium">
                              What stopped you from unlocking the full report today?
                            </p>
                            <div className="grid grid-cols-1 gap-2 text-xs">
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
                                          email: data.email,
                                          event: "submit_survey",
                                          surveyType: "non-buyer-free-fallback",
                                          surveyResponse: opt.label
                                        })
                                      });
                                    } catch (e) {
                                      console.error(e);
                                    }
                                  }}
                                  className="bg-white hover:bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-left text-slate-700 font-medium transition-colors shadow-xs"
                                >
                                  {opt.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                        <p className="text-sm text-slate-500 mb-6">
                          Want the full report with named programs, amounts, and next steps?
                        </p>
                        <Button
                          size="lg"
                          className="bg-emerald-600 hover:bg-emerald-700 text-white"
                          onClick={() => { setIsSuccess(false); setStep(6); }}
                        >
                          <FileText className="w-5 h-5 mr-2" />
                          Unlock Full Report — $19
                        </Button>
                        <div className="pt-4">
                          <Button variant="outline" size="sm" onClick={() => {
                              setStep(1);
                              setIsSuccess(false);
                              setConsentToPartnerContact(false);
                              setData(INITIAL_DATA);
                          }}>
                              Start Over
                          </Button>
                        </div>
                    </div>
                )}
            </CardContent>

            {/* Navigation Footer - only for input steps */}
            {step < 5 && (
                <CardFooter className="flex justify-between border-t bg-gray-50/50 p-6">
                    <Button
                        variant="outline"
                        onClick={handleBack}
                        disabled={step === 1}
                        className="w-24"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back
                    </Button>

                    <Button
                        onClick={handleNext}
                        className="w-32 bg-green-600 hover:bg-green-700 text-white"
                        disabled={
                            (step === 1 && !data.goal) ||
                            (step === 2 && !data.province) ||
                            (step === 3 && !data.industry) ||
                            (step === 4 && !data.revenue)
                        }
                    >
                        {step === 4 ? 'Calculate' : 'Next'} <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </CardFooter>
            )}
            {showExitSurvey && (
              <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
                <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-100 relative text-left">
                  <button 
                    onClick={() => setShowExitSurvey(false)} 
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-650 font-bold text-lg"
                  >
                    ✕
                  </button>
                  
                  {exitSurveyStep === 1 ? (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-2xl">💡</span>
                        <h4 className="font-extrabold text-slate-900 text-lg leading-tight">Before you go...</h4>
                      </div>
                      <p className="text-xs text-slate-500 mb-4 font-semibold leading-relaxed">
                        Here is one more personalized grant match identified for your business based on your regional and industry inputs:
                      </p>
                      
                      {(() => {
                        const matches = getMatchedPrograms(data);
                        const secondMatch = matches[1] || matches[0];
                        
                        const getSpecificValueEstimate = (programName: string, rangeStr: string) => {
                          const clean = (rangeStr || "$5,000 - $15,000").replace(/[\$,\+]/g, '');
                          const parts = clean.split('-');
                          let min = 5000;
                          let max = 15000;
                          if (parts.length === 2) {
                            min = parseInt(parts[0].trim(), 10) || 5000;
                            max = parseInt(parts[1].trim(), 10) || 15000;
                          } else if (parts.length === 1) {
                            max = parseInt(parts[0].trim(), 10) || 15000;
                            min = Math.floor(max * 0.3);
                          }

                          // Use estimate as a base to calculate a stable, personalized number inside program range
                          const seed = estimate > 0 ? estimate : 25000;
                          const nameLength = data.company ? data.company.trim().length : 7;
                          const ratio = ((seed + nameLength * 7) % 100) / 100;
                          
                          // Restrict ratio to 40% - 90% of the range so it is realistic
                          const rawVal = min + (max - min) * (0.4 + ratio * 0.5);
                          const roundedVal = Math.round(rawVal / 50) * 50;
                          return `$${roundedVal.toLocaleString()}`;
                        };

                        const specificVal = getSpecificValueEstimate(secondMatch.name, secondMatch.range);
                        
                        return (
                          <div className="bg-slate-55 border border-slate-200 rounded-xl p-4 mb-4 text-xs space-y-2">
                            <div>
                              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 font-mono">Matched Program #2</span>
                              <h5 className="font-extrabold text-slate-800 text-sm mt-0.5">{secondMatch.name}</h5>
                            </div>
                            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100 mt-1">
                              <div>
                                <span className="text-slate-450 font-medium block text-[9px] uppercase">Est. Eligible Program Value</span>
                                <strong className="text-slate-900 font-black text-xs">{specificVal}</strong>
                              </div>
                              <div>
                                <span className="text-slate-450 font-medium block text-[9px] uppercase">Fit Score</span>
                                <strong className="text-emerald-700 font-extrabold text-xs">Strong Match</strong>
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                      
                      <p className="text-xs text-slate-600 mb-5 leading-relaxed">
                        Unlock the complete report including this program&apos;s full stacking roadmaps, timelines, and application templates for just <strong className="text-indigo-950">$79</strong>.
                      </p>
                      
                      <div className="space-y-2.5">
                        <button
                          onClick={() => setShowExitSurvey(false)}
                          className="w-full py-3 px-4 bg-indigo-650 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs text-center block"
                        >
                          Yes, unlock my matches
                        </button>
                        <button
                          onClick={() => setExitSurveyStep(2)}
                          className="w-full py-2.5 px-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-slate-800 rounded-xl text-xs font-bold transition-all text-center block"
                        >
                          No thanks, exit report
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-2xl">📋</span>
                        <h4 className="font-extrabold text-slate-900 text-lg leading-tight">Quick Question before you go?</h4>
                      </div>
                      <p className="text-xs text-slate-500 mb-4 font-medium leading-relaxed">
                        As a startup-focused business, we rely on founder feedback to improve. What stopped you from checking out today?
                      </p>
                      
                      <div className="space-y-2">
                        {[
                          "Too expensive / Pricing concerns",
                          "Not enough information shown",
                          "I want to think about it / compare",
                          "Didn't trust the site credibility",
                          "Technical issue / Payment problem",
                          "Other reason / Just looking"
                        ].map((option, idx) => (
                          <button
                            key={idx}
                            onClick={async () => {
                              setShowExitSurvey(false);
                              
                              // Telemetry log exit survey response
                              const emailVal = dataRef.current.email;
                              if (emailVal) {
                                fetch("/api/subscriber/track-activity", {
                                  method: "POST",
                                  headers: { "Content-Type": "application/json" },
                                  body: JSON.stringify({
                                    email: emailVal,
                                    event: "exit_survey_submitted",
                                    surveyResponse: option,
                                    ...getDeviceMetadata()
                                  })
                                }).catch(() => {});
                              }
                              
                              // Proceed with going back
                              setStep(s => Math.max(1, s - 1));
                            }}
                            className="w-full text-left p-3 border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50/10 rounded-xl text-xs font-semibold text-slate-700 transition-all flex items-center justify-between"
                          >
                            <span>{option}</span>
                            <span className="text-slate-350 font-bold">→</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
        </Card>
    )
}
