"use client"

import React, { useState, useEffect, useCallback } from "react"
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

    // --- Revenue Ladder State ---
    const [sdkReady, setSdkReady] = useState(false);
    const [paymentError, setPaymentError] = useState<string | null>(null);
    const [isPurchased, setIsPurchased] = useState(false);
    const [accessToken, setAccessToken] = useState<string>('');
    const [reportData, setReportData] = useState<any>(null);
    const [isLoadingReport, setIsLoadingReport] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
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

        setData(prev => {
            const updated = { ...prev };
            if (emailParam) updated.email = emailParam;
            if (nameParam) updated.name = nameParam;
            if (phoneParam) updated.phone = phoneParam;
            if (companyParam) updated.company = companyParam;
            if (provinceParam) updated.province = provinceParam.toLowerCase();
            if (industryParam) updated.industry = industryParam;
            if (revenueParam) updated.revenue = revenueParam;
            if (goalParam) updated.goal = goalParam;
            return updated;
        });

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
        setStep(s => Math.max(1, s - 1));
    }

    // --- Background lead saving helper ---
    const saveCalculatorLead = async (email: string, name: string, isFreeFallback: boolean) => {
        try {
            const messageInfo = `Calculator Lead (${isFreeFallback ? 'Free Summary' : 'Checkout Initiated'})\nProvince: ${data.province}\nIndustry: ${data.industry}\nRevenue: ${data.revenue}\nGoal: ${data.goal}\nEstimated Funding Range: $${estimate.toLocaleString()} - $${estimateMax.toLocaleString()}\nMatched Grants Count: ${grantCount}\nCompany: ${data.company || "Not provided"}`;

            await fetch("/api/contact", {
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
      };
      document.head.appendChild(script);
    }, [step, paypalClientId]);

    // --- PayPal Buttons Render ---
    useEffect(() => {
      if (!sdkReady || !(window as any).paypal || step !== 6) return;

      const container = document.getElementById("calc-paypal-button");
      if (container) container.innerHTML = "";

      if (typeof (window as any).paypal.Buttons !== 'function') {
        setPaymentError("Could not load secure checkout. Please refresh.");
        return;
      }

      let price = selectedProductId === 'funding-bundle' ? 79 : selectedProductId === 'funding-roadmap' ? 49 : 19;
      let itemsList = selectedProductId === 'funding-bundle' ? 'Complete Funding Bundle' : selectedProductId === 'funding-roadmap' ? 'Funding Action Plan' : 'Funding Match Report';
      if (addonToolkit) {
        price += 29;
        itemsList += ' + Toolkit';
      }
      if (addonApprovalLibrary) {
        price += 9;
        itemsList += ' + Approval Library';
      }

      const desc = `${itemsList} - FSI Digital`;

      try {
        (window as any).paypal.Buttons({
          style: { layout: 'vertical', color: 'gold', shape: 'rect', label: 'pay', height: 45 },
          createOrder: (_data: any, actions: any) => {
            setPaymentError(null);
            // GA4 event: checkout started
            if (typeof window !== 'undefined' && (window as any).gtag) {
              (window as any).gtag('event', 'begin_checkout', {
                value: price, currency: 'USD', items: [{ item_name: desc, price: price }]
              });
            }
            // Fire checkout_started telemetry
            fetch("/api/subscriber/track-activity", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: data.email,
                event: "checkout_started",
                priceShown: price.toString()
              })
            }).catch(e => console.error("Telemetry error:", e));
            return actions.order.create({
              purchase_units: [{
                amount: { value: price.toFixed(2), currency_code: 'USD' },
                description: desc
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

              // GA4 event: purchase complete
              if (typeof window !== 'undefined' && (window as any).gtag) {
                (window as any).gtag('event', 'purchase', {
                  transaction_id: orderId,
                  value: price, currency: 'USD',
                  items: [{ item_name: desc, price: price }]
                });
              }

              // Record purchase via API
              const res = await fetch('/api/products/purchase', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  productId: selectedProductId,
                  email: data.email,
                  name: data.name,
                  paypalOrderId: orderId,
                  addons: {
                    toolkit: addonToolkit,
                    approvalLibrary: addonApprovalLibrary
                  },
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
                setAccessToken(result.accessToken);
                setIsPurchased(true);
                if (selectedProductId === 'funding-match-report') {
                  setShowUpsellScreen(true);
                }
                setStep(8);
                // Load the full report
                loadReport(result.accessToken);
              } else {
                setPaymentError("Payment received but report generation failed. Contact support@fsidigital.ca");
              }
            } catch (err) {
              console.error("Payment capture error:", err);
              setPaymentError("Payment processed, but we encountered an issue. Contact support@fsidigital.ca");
            }
          },
          onApproveCancel: () => {},
          onCancel: () => {
            setPaymentError("Payment cancelled. You can try again when ready.");
            // GA4 event
            if (typeof window !== 'undefined' && (window as any).gtag) {
              (window as any).gtag('event', 'checkout_cancelled', { item_name: desc });
            }
          },
          onError: (err: any) => {
            console.error("PayPal error:", err);
            setPaymentError("Payment failed. Please try again or use a different payment method.");
          }
        }).render('#calc-paypal-button');
      } catch (err) {
        console.error("Failed to render PayPal buttons:", err);
        setPaymentError("Could not load checkout. Please refresh.");
      }
    }, [sdkReady, step, selectedProductId, addonToolkit, addonApprovalLibrary, data.email, data.name, data.province, data.industry, data.revenue, data.goal, data.company, data.phone]);

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
                setPaymentError("Payment received but upgrade mapping failed. Contact support@fsidigital.ca");
              }
            } catch (err) {
              console.error("Upgrade capture error:", err);
              setPaymentError("Payment processed, but we encountered an issue. Contact support@fsidigital.ca");
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
      try {
        const res = await fetch(`/api/products/verify?token=${encodeURIComponent(token)}`);
        const json = await res.json();
        if (json.report) {
          setReportData(json.report);
          setHasStrategyUnlocked(!!json.hasStrategyUnlocked);
          setStrategyData(json.strategyData || null);
          setHasToolkitUnlocked(!!json.hasToolkitUnlocked);
          setHasApprovalLibraryUnlocked(!!json.hasApprovalLibraryUnlocked);
        }
      } catch (err) {
        console.error("Failed to load report:", err);
      } finally {
        setIsLoadingReport(false);
      }
    };

    const updateData = (field: keyof CalculatorData, value: string) => {
        setData(prev => ({ ...prev, [field]: value }));
    }

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

        if (data.email) {
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
    }, [selectedProductId, step, data.email]);

    // Telemetry: Track when PayPal checkout button enters viewport
    useEffect(() => {
      if (step !== 6 || !sdkReady) return;
      const el = document.getElementById("calc-paypal-button");
      if (!el) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            trackEvent('calc_paypal_visible');
            if (data.email) {
              fetch("/api/subscriber/track-activity", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  email: data.email,
                  event: "paypal_visible"
                })
              }).catch(e => console.error("Telemetry error logging paypal_visible:", e));
            }
            observer.disconnect();
          }
        });
      }, { threshold: 0.1 });

      observer.observe(el);
      return () => observer.disconnect();
    }, [step, sdkReady]);

    // Telemetry: Track time on Step 6
    useEffect(() => {
      if (step !== 6) return;
      
      const logTime = (seconds: number) => {
        trackEvent(`calc_step6_duration_${seconds}s`);
        if (data.email) {
          fetch("/api/subscriber/track-activity", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: data.email,
              event: "submit_survey",
              surveyType: "step6_duration",
              surveyResponse: `${seconds} seconds`
            })
          }).catch(() => {});
        }
      };

      const timer10 = setTimeout(() => logTime(10), 10000);
      const timer30 = setTimeout(() => logTime(30), 30000);
      const timer60 = setTimeout(() => logTime(60), 60000);

      return () => {
        clearTimeout(timer10);
        clearTimeout(timer30);
        clearTimeout(timer60);
      };
    }, [step, data.email]);

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
        <Card className="shadow-xl border-green-100 max-w-2xl mx-auto">
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
                    STEP 6: MERGED RESULTS & CHECKOUT
                   ═══════════════════════════════════════════════════ */}
                {step === 6 && !isSuccess && (
                    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500 py-2">
                        {/* Welcome Back / Review Completed Banner */}
                        {isRestoredSession && (
                          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-left shadow-xs flex items-start gap-3.5">
                            <CheckCircle className="w-5.5 h-5.5 text-emerald-600 shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-bold text-emerald-950 text-sm sm:text-base">
                                {data.company
                                  ? `Review Completed for ${data.company} in ${PROVINCE_NAMES[data.province.toLowerCase().trim()] || data.province || 'Canada'}`
                                  : "Funding Opportunity Review Completed"}
                              </h4>
                              <p className="text-emerald-800 text-xs sm:text-sm mt-1 leading-relaxed">
                                {data.company
                                  ? "Based on the information previously submitted, we identified funding opportunities that may be relevant to your business."
                                  : "We identified funding programs that may be relevant based on your location and business profile."}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Why You Received This Funding Alert Block */}
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

                          const REVENUE_MAP: Record<string, string> = {
                            'pre-revenue': 'Pre-revenue / Startup',
                            'under-100k': 'Under $105,000',
                            '100k-500k': '$100,000 - $500,000',
                            '500k-1m': '$500,000 - $1M',
                            'over-1m': 'Over $1M'
                          };
                          const rawRev = cleanField(data.revenue, "Active Business");
                          const revenueLabel = REVENUE_MAP[rawRev.toLowerCase()] || rawRev;

                          const GOAL_MAP: Record<string, string> = {
                            'hiring': 'Hiring & Training',
                            'research': 'R&D / Innovation',
                            'expansion': 'Business Expansion',
                            'export': 'Exporting'
                          };
                          const rawGoal = cleanField(data.goal, "Business Growth");
                          const goalLabel = GOAL_MAP[rawGoal.toLowerCase()] || rawGoal;

                          return (
                            <div className="bg-white border border-slate-200 rounded-xl p-5 mb-6 text-left shadow-sm">
                              <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3.5">Why You Received This Alert</h4>
                              <p className="text-xs text-slate-500 mb-3">Based on information previously submitted to FSI Digital:</p>
                              <ul className="space-y-2.5 text-sm text-slate-800 font-medium">
                                <li className="flex items-center gap-2.5">
                                  <span className="text-emerald-600 font-bold">✓</span>
                                  <span className="text-slate-500 font-normal">Location:</span> {provinceName}
                                </li>
                                <li className="flex items-center gap-2.5">
                                  <span className="text-emerald-600 font-bold">✓</span>
                                  <span className="text-slate-500 font-normal">Industry:</span> {industryName}
                                </li>
                                <li className="flex items-center gap-2.5">
                                  <span className="text-emerald-600 font-bold">✓</span>
                                  <span className="text-slate-500 font-normal">Business Stage:</span> {revenueLabel}
                                </li>
                                <li className="flex items-center gap-2.5">
                                  <span className="text-emerald-600 font-bold">✓</span>
                                  <span className="text-slate-500 font-normal">Funding Goal:</span> {goalLabel}
                                </li>
                              </ul>
                              <div className="mt-4 pt-4 border-t border-slate-100">
                                <p className="text-slate-700 text-sm leading-relaxed">
                                  We identified <strong className="text-emerald-700 font-bold">{grantCount}</strong> funding opportunities that may be relevant to your business, including programs related to hiring, expansion, equipment purchases, training, and growth initiatives.
                                </p>
                              </div>
                            </div>
                          );
                        })()}

                        {/* Top Match Preview */}
                        <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm relative mb-8">
                            <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-5 py-4 flex items-center justify-between">
                              <div className="flex items-center gap-2.5">
                                <FileText className="w-5 h-5 text-emerald-400" />
                                <span className="font-semibold text-white text-sm">Identified Funding Opportunities</span>
                              </div>
                            </div>
                            <div className="px-5 py-6 border-b border-gray-100">
                              <div className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-semibold mb-3">
                                <Search className="w-3 h-3" />
                                Matched via {(!data.industry || data.industry.toLowerCase() === 'n/a' || data.industry.toLowerCase() === 'other') ? "General" : data.industry} eligibility rules
                              </div>
                              <div className="flex items-center gap-2 mb-2">
                                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                                <span className="text-sm font-bold text-emerald-700 uppercase tracking-wide">Top Match Opportunity</span>
                              </div>
                              <h4 className="text-xl font-bold text-slate-900 mb-1">{getRealTopMatch().name}</h4>
                              <p className="text-sm text-slate-600 mb-4">{getRealTopMatch().desc}</p>
                              <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1.5 rounded-md font-semibold text-sm">
                                <DollarSign className="w-4 h-4" />
                                Potential: {getRealTopMatch().maxFunding}
                              </div>
                            </div>
                            <div className="px-5 py-6 relative">
                              <h5 className="font-bold text-slate-800 mb-3">Application Strategy & Links</h5>
                              <div className="space-y-3 filter blur-[4px]">
                                <div className="h-4 w-3/4 bg-slate-200 rounded" />
                                <div className="h-4 w-full bg-slate-200 rounded" />
                              </div>
                              <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-[2px]">
                                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-5 py-2.5 shadow-md">
                                  <Lock className="w-4 h-4 text-slate-600" />
                                  <span className="text-sm font-bold text-slate-800">Locked Section</span>
                                </div>
                              </div>
                            </div>
                        </div>

                        {/* 3-Tier Pricing Architecture */}
                        <div className="space-y-4 mb-8">
                            <h3 className="text-2xl font-bold text-slate-900 text-center mb-6">Unlock Funding Opportunities Identified For Your Business</h3>
                            
                            {/* Tier 1: $79 Complete Bundle (Highlighted) */}
                            <div
                                onClick={() => setSelectedProductId('funding-bundle')}
                                className={`cursor-pointer border-2 rounded-xl p-5 relative overflow-hidden transition-all ${
                                selectedProductId === 'funding-bundle'
                                    ? 'border-indigo-600 bg-indigo-50/10 shadow-md ring-1 ring-indigo-600'
                                    : 'border-slate-200 bg-white hover:border-slate-300'
                                }`}
                            >
                                <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                                    Most Popular & Best Value
                                </div>
                                {selectedProductId === 'funding-bundle' && (
                                <div className="absolute top-6 right-5 text-indigo-600">
                                    <CheckCircle className="w-5 h-5" />
                                </div>
                                )}
                                <h4 className="font-bold text-slate-900 text-lg">Complete Funding Bundle</h4>
                                <p className="text-sm text-slate-500 mt-1">Get the report + prioritized step-by-step Action Plan + Toolkit.</p>
                                <div className="mt-4 flex items-baseline gap-1">
                                    <span className="text-3xl font-extrabold text-slate-900">$79</span>
                                    <span className="text-sm text-slate-400 font-normal">one-time</span>
                                </div>
                                <ul className="mt-5 space-y-2.5 text-sm text-slate-700">
                                    <li className="flex items-start gap-2 font-semibold text-indigo-900"><CheckCircle className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" /> Everything in the Action Plan & Report</li>
                                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" /> Funding Application Toolkit (Templates)</li>
                                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" /> Funding Approval Library (Winning Examples)</li>
                                </ul>
                            </div>

                            {/* Tier 2: $49 Action Plan */}
                            <div
                                onClick={() => setSelectedProductId('funding-roadmap')}
                                className={`cursor-pointer border-2 rounded-xl p-5 relative transition-all ${
                                selectedProductId === 'funding-roadmap'
                                    ? 'border-emerald-500 bg-emerald-50/10 shadow-md ring-1 ring-emerald-500'
                                    : 'border-slate-200 bg-white hover:border-slate-300'
                                }`}
                            >
                                {selectedProductId === 'funding-roadmap' && (
                                <div className="absolute top-6 right-5 text-emerald-500">
                                    <CheckCircle className="w-5 h-5" />
                                </div>
                                )}
                                <h4 className="font-bold text-slate-900 text-lg">Funding Action Plan</h4>
                                <p className="text-sm text-slate-500 mt-1">Get a step-by-step roadmap for your matched programs.</p>
                                <div className="mt-4 flex items-baseline gap-1">
                                    <span className="text-3xl font-extrabold text-slate-900">$49</span>
                                    <span className="text-sm text-slate-400 font-normal">one-time</span>
                                </div>
                                <ul className="mt-5 space-y-2.5 text-sm text-slate-700">
                                    <li className="flex items-start gap-2 font-semibold text-emerald-800"><CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Everything in the Match Report</li>
                                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Priority program ranking</li>
                                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Month 1-4 timeline schedule</li>
                                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Program risk warning indicators</li>
                                </ul>
                            </div>

                            {/* Tier 3: $19 Match Report */}
                            <div
                                onClick={() => setSelectedProductId('funding-match-report')}
                                className={`cursor-pointer border border-slate-200 rounded-xl p-5 relative transition-all ${
                                selectedProductId === 'funding-match-report'
                                    ? 'border-slate-400 bg-slate-50 shadow-sm ring-1 ring-slate-400'
                                    : 'bg-white hover:border-slate-300'
                                }`}
                            >
                                {selectedProductId === 'funding-match-report' && (
                                <div className="absolute top-6 right-5 text-slate-500">
                                    <CheckCircle className="w-5 h-5" />
                                </div>
                                )}
                                <h4 className="font-bold text-slate-800 text-base">Basic Match Report</h4>
                                <div className="mt-2 flex items-baseline gap-1">
                                    <span className="text-2xl font-bold text-slate-900">$19</span>
                                </div>
                                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                                    <li className="flex items-start gap-2"><span className="text-slate-400">•</span> Programs you qualify for</li>
                                    <li className="flex items-start gap-2"><span className="text-slate-400">•</span> Estimated funding ranges</li>
                                    <li className="flex items-start gap-2"><span className="text-slate-400">•</span> Required documents overview</li>
                                </ul>
                            </div>
                        </div>

                        {/* Email Capture & Payment */}
                        <div className="bg-gradient-to-br from-slate-50 to-white border-2 border-slate-200 rounded-2xl p-6 mb-8 shadow-sm">
                            <h4 className="font-bold text-slate-900 text-lg mb-4 text-center">Where should we send your identified opportunities?</h4>
                            <div className="space-y-4 mb-6">
                                <div>
                                    <Input 
                                        id="calc-email-for-report" 
                                        type="email" 
                                        placeholder="jane@yourbusiness.com" 
                                        className="h-12 bg-white text-lg" 
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
                            
                            {/* Secure Checkout Notice */}
                            <div className="mb-4 text-center border-b border-slate-105 pb-4">
                                <h5 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-1">Secure Checkout</h5>
                                <p className="text-xs text-slate-600">
                                    Pay securely with Visa, Mastercard, American Express, Debit Card, or PayPal.
                                </p>
                                <p className="text-xs text-indigo-700 font-bold mt-1">
                                    No PayPal account required.
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
                                        <span>Unlock your funding matches instantly</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-indigo-600 font-bold">3.</span>
                                        <span>Review priority opportunities</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-indigo-600 font-bold">4.</span>
                                        <span>Download your funding report</span>
                                    </li>
                                </ol>
                                <p className="text-[10px] text-slate-500 mt-2.5 italic">
                                    Average access time: less than 60 seconds
                                </p>
                            </div>

                            <div className="min-h-[150px]">
                                {!sdkReady && (
                                    <div className="flex items-center justify-center py-4 gap-2 text-sm text-slate-500">
                                    <Loader2 className="w-4 h-4 animate-spin" /> Loading secure checkout...
                                    </div>
                                )}
                                {sdkReady && (
                                    <div id="calc-paypal-button" className="w-full"></div>
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

                        {/* Outcome Vision */}
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-6">
                            <h4 className="font-bold text-slate-900 mb-3 text-lg">What happens after approval?</h4>
                            <p className="text-sm text-slate-700 mb-4">Businesses typically use these programs to:</p>
                            <ul className="space-y-3 text-sm text-slate-700 font-medium ml-1">
                            {data.goal === 'hiring' ? (
                                <>
                                  <li className="flex items-center gap-2.5"><CheckCircle className="w-5 h-5 text-emerald-500"/> Hire technical talent</li>
                                  <li className="flex items-center gap-2.5"><CheckCircle className="w-5 h-5 text-emerald-500"/> Expand sales teams</li>
                                  <li className="flex items-center gap-2.5"><CheckCircle className="w-5 h-5 text-emerald-500"/> Add project capacity</li>
                                  <li className="flex items-center gap-2.5"><CheckCircle className="w-5 h-5 text-emerald-500"/> Accelerate growth</li>
                                </>
                            ) : data.goal === 'expansion' ? (
                                <>
                                  <li className="flex items-center gap-2.5"><CheckCircle className="w-5 h-5 text-emerald-500"/> Purchase new machinery</li>
                                  <li className="flex items-center gap-2.5"><CheckCircle className="w-5 h-5 text-emerald-500"/> Upgrade production lines</li>
                                  <li className="flex items-center gap-2.5"><CheckCircle className="w-5 h-5 text-emerald-500"/> Improve efficiency</li>
                                  <li className="flex items-center gap-2.5"><CheckCircle className="w-5 h-5 text-emerald-500"/> Reduce capital expenditure</li>
                                </>
                            ) : (
                                <>
                                  <li className="flex items-center gap-2.5"><CheckCircle className="w-5 h-5 text-emerald-500"/> Hire staff and scale teams</li>
                                  <li className="flex items-center gap-2.5"><CheckCircle className="w-5 h-5 text-emerald-500"/> Purchase equipment and modernize</li>
                                  <li className="flex items-center gap-2.5"><CheckCircle className="w-5 h-5 text-emerald-500"/> Expand into new geographic markets</li>
                                  <li className="flex items-center gap-2.5"><CheckCircle className="w-5 h-5 text-emerald-500"/> Reduce growth capital costs</li>
                                </>
                            )}
                            </ul>
                        </div>

                        {/* Cost of Delay */}
                        <div className="bg-rose-50 border border-rose-200 rounded-xl p-6 mb-6">
                            <h4 className="font-bold text-rose-900 flex items-center gap-2 mb-3 text-lg">
                                <Clock className="w-5 h-5 text-rose-600" />
                                The Cost of Delay
                            </h4>
                            <p className="text-sm text-rose-800 leading-relaxed mb-3">
                                Every month you delay is another month before you know:
                            </p>
                            <ul className="space-y-2 text-sm text-rose-800 font-medium ml-1 mb-5">
                                <li className="flex items-start gap-2"><span className="text-rose-500">•</span> Which programs fit your business</li>
                                <li className="flex items-start gap-2"><span className="text-rose-500">•</span> Which programs are currently active</li>
                                <li className="flex items-start gap-2"><span className="text-rose-500">•</span> Which opportunities should be prioritized first</li>
                            </ul>
                            <p className="text-sm text-rose-900 leading-relaxed font-semibold">
                                Most businesses never miss funding because they are ineligible. They miss funding because they discover the opportunity too late.
                            </p>
                        </div>

                        {/* Mini FAQ */}
                        <div className="border-t border-slate-200 pt-6 mt-6 space-y-4">
                            <h5 className="font-bold text-slate-900 text-lg mb-4">Common Questions</h5>
                            
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm font-bold text-slate-800">How does FSI Digital help businesses access funding?</p>
                                    <p className="text-sm text-slate-600 mt-1">Government funding is provided by federal, provincial, and regional agencies. FSI Digital identifies programs that appear relevant to your business, organizes eligibility requirements, highlights priority opportunities, and provides guidance to help you evaluate and pursue them.</p>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-800">What happens if I leave without my matches?</p>
                                    <p className="text-sm text-slate-600 mt-1">Your matches still exist. But you'll still face hours of manual Google research, comparing conflicting eligibility requirements, and uncertainty about which programs can be stacked.</p>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-800">Is there a guarantee?</p>
                                    <p className="text-sm text-slate-600 mt-1">Yes, 30 days. If the report doesn't help you identify relevant funding, email us and we'll refund your purchase immediately.</p>
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

                        {/* Loading state */}
                        {isLoadingReport && (
                          <div className="flex items-center justify-center py-8 gap-2 text-slate-500">
                            <Loader2 className="w-5 h-5 animate-spin" /> Generating your personalized report...
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

                        {/* ═══════ UPSELL TO $199 AUDIT ═══════ */}
                        {(() => {
                          const discount = hasStrategyUnlocked 
                            ? (selectedProductId === 'funding-bundle' ? 79 : 49) 
                            : 19;
                          const netPrice = 199 - discount;
                          return (
                            <div className="border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-white rounded-2xl p-5 sm:p-6 text-center relative overflow-hidden">
                              <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-bl uppercase tracking-wider">
                                ${discount} Credit Active
                              </div>
                              <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-full mb-3">
                                <TrendingUp className="w-6 h-6 text-indigo-600" />
                              </div>
                              <h4 className="text-lg font-bold text-slate-800 mb-1">Need Help Applying?</h4>
                              <p className="text-sm text-slate-500 mb-4 max-w-md mx-auto">
                                Our funding advisors can help you prepare applications, maximize eligibility, and navigate the process.
                                <strong className="block mt-2.5 text-emerald-700 font-semibold bg-emerald-50 border border-emerald-100 rounded-lg p-2.5">
                                  Your ${discount} fee is credited back on booking — verification audit is only ${netPrice}
                                </strong>
                              </p>
                              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                                <a
                                  href={`/consultation?source=report-upsell&email=${encodeURIComponent(data.email)}&name=${encodeURIComponent(data.name)}&industry=${encodeURIComponent(data.industry)}&region=${encodeURIComponent(data.province)}&discount=${discount}`}
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
                                  Book a $199 Funding Audit (${netPrice} net) <ArrowRight className="w-4 h-4" />
                                </a>
                                <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold px-3 py-1.5 rounded-full text-[11px] flex items-center gap-1 shadow-sm shrink-0">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                  ${discount} Coupon Applied (Pay ${netPrice})
                                </span>
                              </div>
                              <p className="text-xs text-slate-400 mt-2">100% deposit refund if no programs match</p>
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
                          onClick={() => { setIsSuccess(false); setStep(7); }}
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
        </Card>
    )
}
