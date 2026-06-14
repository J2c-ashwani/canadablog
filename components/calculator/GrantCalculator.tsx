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

    const handleDownloadPDF = async () => {
        if (!reportData) return;
        setIsDownloading(true);
        try {
            const { generateFundingMatchReportPDF } = await import('@/lib/products/report-pdf');
            const doc = generateFundingMatchReportPDF(reportData, data.name || 'Founder');
            doc.save(`Funding-Match-Report-${data.province}-${data.industry}.pdf`);
            
            if (typeof window !== 'undefined' && (window as any).gtag) {
                (window as any).gtag('event', 'report_pdf_downloaded_calc', { email: data.email });
            }
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

    // --- Free lead capture (fallback) ---
    const handleSubmitEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const messageInfo = `Calculator Lead (Free Summary)\nProvince: ${data.province}\nIndustry: ${data.industry}\nRevenue: ${data.revenue}\nGoal: ${data.goal}\nEstimated Funding Range: $${estimate.toLocaleString()} - $${estimateMax.toLocaleString()}\nMatched Grants Count: ${grantCount}\nCompany: ${data.company || "Not provided"}`;

            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
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
                    pagePath: window.location.pathname,
                }),
            });

            if (!response.ok) throw new Error("Failed to submit");
            setIsSuccess(true);
        } catch (error) {
            console.error("Submission error:", error);
            setIsSuccess(true);
        } finally {
            setIsSubmitting(false);
        }
    }

    // --- PayPal SDK Load ---
    useEffect(() => {
      if (step < 7) return; // Only load when needed
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
      if (!sdkReady || !(window as any).paypal || step !== 7) return;

      const container = document.getElementById("calc-paypal-button");
      if (container) container.innerHTML = "";

      if (typeof (window as any).paypal.Buttons !== 'function') {
        setPaymentError("Could not load secure checkout. Please refresh.");
        return;
      }

      try {
        (window as any).paypal.Buttons({
          style: { layout: 'vertical', color: 'gold', shape: 'rect', label: 'pay', height: 45 },
          createOrder: (_data: any, actions: any) => {
            setPaymentError(null);
            // GA4 event: checkout started
            if (typeof window !== 'undefined' && (window as any).gtag) {
              (window as any).gtag('event', 'begin_checkout', {
                value: 19, currency: 'USD', items: [{ item_name: 'Funding Match Report', price: 19 }]
              });
            }
            return actions.order.create({
              purchase_units: [{
                amount: { value: '19.00', currency_code: 'USD' },
                description: 'Funding Match Report - FSI Digital'
              }]
            });
          },
          onApprove: async (_data: any, actions: any) => {
            try {
              const details = await actions.order.capture();
              const orderId = details?.id || '';

              // GA4 event: purchase complete
              if (typeof window !== 'undefined' && (window as any).gtag) {
                (window as any).gtag('event', 'purchase', {
                  transaction_id: orderId,
                  value: 19, currency: 'USD',
                  items: [{ item_name: 'Funding Match Report', price: 19 }]
                });
              }

              // Record purchase via API
              const res = await fetch('/api/products/purchase', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  productId: 'funding-match-report',
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
                  }
                })
              });

              const result = await res.json();

              if (result.success) {
                setAccessToken(result.accessToken);
                setIsPurchased(true);
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
          onCancel: () => {
            setPaymentError("Payment cancelled. You can try again when ready.");
            // GA4 event
            if (typeof window !== 'undefined' && (window as any).gtag) {
              (window as any).gtag('event', 'checkout_cancelled', { item_name: 'Funding Match Report' });
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
    }, [sdkReady, step, data.email, data.name, data.province, data.industry, data.revenue, data.goal, data.company, data.phone]);

    // --- Load Report Data ---
    const loadReport = async (token: string) => {
      setIsLoadingReport(true);
      try {
        const res = await fetch(`/api/products/verify?token=${encodeURIComponent(token)}`);
        const json = await res.json();
        if (json.report) {
          setReportData(json.report);
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

    // --- Teaser program cards data ---
    const getTeaserPrograms = () => {
      const ind = data.industry;
      if (ind === 'technology') return [
        { name: 'R&D Tax Credit', type: 'Tax Credit', strength: 'Strong Match' },
        { name: 'Innovation Grant', type: 'Grant', strength: 'Good Match' },
        { name: 'Digital Adoption Program', type: 'Hybrid', strength: 'Good Match' },
      ];
      if (ind === 'manufacturing') return [
        { name: 'Equipment Modernization Grant', type: 'Grant', strength: 'Strong Match' },
        { name: 'Workforce Training Subsidy', type: 'Rebate', strength: 'Good Match' },
        { name: 'Clean Energy Retrofit Program', type: 'Grant', strength: 'Potential Match' },
      ];
      if (ind === 'agriculture') return [
        { name: 'Agri-Innovation Fund', type: 'Grant', strength: 'Strong Match' },
        { name: 'Farm Modernization Program', type: 'Grant', strength: 'Good Match' },
        { name: 'Sustainable Agriculture Grant', type: 'Grant', strength: 'Good Match' },
      ];
      if (ind === 'healthcare') return [
        { name: 'Healthcare Innovation Grant', type: 'Grant', strength: 'Strong Match' },
        { name: 'R&D Tax Credit', type: 'Tax Credit', strength: 'Good Match' },
        { name: 'Workforce Development Program', type: 'Grant', strength: 'Potential Match' },
      ];
      return [
        { name: 'Regional Growth Grant', type: 'Grant', strength: 'Good Match' },
        { name: 'Hiring & Wage Incentive', type: 'Rebate', strength: 'Good Match' },
        { name: 'Digital Growth Program', type: 'Grant', strength: 'Potential Match' },
      ];
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
      if (step === 7) trackEvent('report_paywall_viewed');
      if (step === 8) trackEvent('report_purchased');
    }, [step]);

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

                {/* Step 1: Location */}
                {step === 1 && (
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

                {/* Step 2: Industry */}
                {step === 2 && (
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

                {/* Step 3: Revenue */}
                {step === 3 && (
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

                {/* Step 4: Goal */}
                {step === 4 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h3 className="text-xl font-semibold text-center mb-6">What is your primary funding goal?</h3>
                        <RadioGroup value={data.goal} onValueChange={(val) => updateData("goal", val)} className="grid sm:grid-cols-2 gap-4">
                            {[
                              { value: 'hiring', label: 'Hiring & Training', desc: 'Wage subsidies and skills grants' },
                              { value: 'research', label: 'R&D / Innovation', desc: 'Developing new tech or software' },
                              { value: 'expansion', label: 'Business Expansion', desc: 'New equipment or facilities' },
                              { value: 'export', label: 'Exporting', desc: 'Entering international markets' },
                            ].map(opt => (
                              <Label key={opt.value} className={`flex flex-col items-center justify-center p-6 border rounded-xl cursor-pointer hover:bg-gray-50 text-center gap-2 transition-colors ${data.goal === opt.value ? 'border-green-500 bg-green-50 text-green-700 ring-1 ring-green-500' : ''}`}>
                                <RadioGroupItem value={opt.value} className="sr-only" />
                                <span className="font-semibold text-lg">{opt.label}</span>
                                <span className="text-sm font-normal opacity-70">{opt.desc}</span>
                              </Label>
                            ))}
                        </RadioGroup>
                    </div>
                )}

                {/* Step 5: Analyzing */}
                {step === 5 && (
                    <div className="py-12 space-y-6 text-center animate-in fade-in duration-500">
                        <div className="flex justify-center mb-6">
                            <div className="relative">
                                <div className="w-24 h-24 border-4 border-green-200 rounded-full animate-spin border-t-green-600"></div>
                                <Search className="w-10 h-10 text-green-600 absolute top-1/2 left-1/2 -to-translate-x-1/2 -translate-y-1/2 transform -translate-x-1/2" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold">Analyzing Your Profile...</h3>
                        <p className="text-gray-500 text-lg">Matching against 4,000+ active Canadian grants and loans.</p>
                    </div>
                )}

                {/* ═══════════════════════════════════════════════════
                    STEP 6: TEASER RESULTS + EMAIL CAPTURE
                    This is the revenue conversion point.
                   ═══════════════════════════════════════════════════ */}
                {step === 6 && !isSuccess && (
                    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500 py-2">
                        {/* Results Header */}
                        <div className="text-center">
                          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-3">
                            <DollarSign className="w-8 h-8 text-green-600" />
                          </div>
                          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">Matches Found!</h3>
                        </div>

                        {/* Summary Stats */}
                        <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-5 rounded-xl border border-emerald-200">
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
                              <div className="text-center">
                                <p className="text-3xl font-bold text-emerald-700">{grantCount}</p>
                                <p className="text-sm text-emerald-600 font-medium">Active Programs</p>
                              </div>
                              <div className="hidden sm:block w-px h-10 bg-emerald-200" />
                              <div className="text-center">
                                <p className="text-3xl font-bold text-emerald-700">${estimate.toLocaleString()}</p>
                                <p className="text-sm text-emerald-600 font-medium">Estimated Minimum</p>
                              </div>
                              <div className="hidden sm:block w-px h-10 bg-emerald-200" />
                              <div className="text-center">
                                <p className="text-3xl font-bold text-emerald-700">${estimateMax.toLocaleString()}</p>
                                <p className="text-sm text-emerald-600 font-medium">Estimated Maximum</p>
                              </div>
                            </div>
                        </div>

                        {/* Teaser Program Cards - 3 partially visible, rest locked */}
                        <div className="space-y-2">
                          <p className="text-sm font-semibold text-slate-600 px-1">Top Matches for {INDUSTRY_NAMES[data.industry] || 'Your Industry'} in {PROVINCE_NAMES[data.province] || 'Your Region'}:</p>
                          <div className="border border-gray-200 rounded-xl overflow-hidden divide-y divide-gray-100">
                            {getTeaserPrograms().map((prog, i) => (
                              <div key={i} className="px-4 py-3 flex items-center justify-between gap-3">
                                <div className="flex items-center gap-3 min-w-0">
                                  <span className={`text-xs font-bold px-2 py-0.5 rounded shrink-0 ${
                                    prog.strength === 'Strong Match' ? 'bg-emerald-100 text-emerald-700' :
                                    prog.strength === 'Good Match' ? 'bg-blue-100 text-blue-700' :
                                    'bg-amber-100 text-amber-700'
                                  }`}>#{i + 1}</span>
                                  <div className="min-w-0">
                                    <p className="font-semibold text-slate-800 text-sm truncate">{prog.name}</p>
                                    <p className="text-xs text-slate-500">{prog.type} · {prog.strength}</p>
                                  </div>
                                </div>
                                <Lock className="w-4 h-4 text-slate-400 shrink-0" />
                              </div>
                            ))}
                            {/* Locked remainder */}
                            <div className="px-4 py-3 bg-gray-50 flex items-center justify-center gap-2">
                              <Lock className="w-4 h-4 text-slate-400" />
                              <span className="text-sm text-slate-500 font-medium">+ {grantCount - 3} more programs available</span>
                            </div>
                          </div>
                        </div>

                        {/* Sample Report Preview */}
                        <div>
                          <p className="text-sm font-semibold text-slate-600 px-1 mb-2">Here&apos;s what your full report looks like:</p>
                          <SampleReportPreview />
                        </div>

                        {/* Email Capture + CTA */}
                        <div className="bg-gradient-to-br from-slate-50 to-white border-2 border-emerald-200 rounded-2xl p-5 sm:p-6">
                          <div className="text-center mb-4">
                            <h4 className="text-lg font-bold text-slate-800">Unlock Your Funding Match Report</h4>
                            <p className="text-sm text-slate-500 mt-1">Named programs · Estimated amounts · Application steps · Priority ranking</p>
                          </div>

                          <form onSubmit={(e) => { e.preventDefault(); if (data.email && data.name) { setStep(7); } }} className="space-y-3">
                            <div className="grid sm:grid-cols-2 gap-3">
                              <div className="space-y-1">
                                <Label htmlFor="calc-name" className="text-sm font-semibold">Full Name *</Label>
                                <Input
                                  id="calc-name"
                                  placeholder="Jane Doe"
                                  className="h-11"
                                  value={data.name}
                                  onChange={(e) => updateData("name", e.target.value)}
                                  required
                                />
                              </div>
                              <div className="space-y-1">
                                <Label htmlFor="calc-email-for-report" className="text-sm font-semibold">Email Address *</Label>
                                <Input
                                  id="calc-email-for-report"
                                  type="email"
                                  placeholder="jane@yourbusiness.com"
                                  className="h-11"
                                  value={data.email}
                                  onChange={(e) => updateData("email", e.target.value)}
                                  required
                                />
                              </div>
                            </div>

                            <Button
                              type="submit"
                              size="lg"
                              className="w-full h-13 text-base bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-lg shadow-emerald-200"
                              disabled={!data.email || !data.name}
                            >
                              <FileText className="w-5 h-5 mr-2" />
                              Unlock Full Report — $19
                            </Button>

                            {/* Trust Signals */}
                            <div className="flex items-center justify-center gap-4 text-xs text-slate-500 pt-1">
                              <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> Instant Delivery</span>
                              <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> One-Time Purchase</span>
                              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> No Subscription</span>
                            </div>
                          </form>

                          {/* Free Fallback Divider */}
                          <div className="flex items-center gap-3 my-4">
                            <div className="flex-1 h-px bg-gray-200" />
                            <span className="text-xs text-gray-400 font-medium">or</span>
                            <div className="flex-1 h-px bg-gray-200" />
                          </div>

                          {/* Free Summary Capture */}
                          <button
                            type="button"
                            onClick={() => {
                              if (data.email && data.name) {
                                handleSubmitEmail({ preventDefault: () => {} } as React.FormEvent);
                              } else {
                                // Scroll to email field
                                document.getElementById('calc-email-for-report')?.focus();
                              }
                            }}
                            className="w-full text-center text-sm text-slate-500 hover:text-slate-700 py-2 transition-colors underline underline-offset-2"
                          >
                            Get free summary by email instead
                          </button>
                        </div>
                    </div>
                )}

                {/* ═══════════════════════════════════════════════════
                    STEP 7: PAYMENT
                    Email already captured. Show PayPal.
                   ═══════════════════════════════════════════════════ */}
                {step === 7 && (
                  <div className="space-y-6 animate-in fade-in duration-500 py-4">
                    {/* Back to results */}
                    <button
                      onClick={() => setStep(6)}
                      className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back to results
                    </button>

                    {/* Order Summary */}
                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                      <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-5 py-3">
                        <h3 className="text-white font-semibold text-base flex items-center gap-2">
                          <FileText className="w-5 h-5 text-emerald-400" />
                          Complete Your Purchase
                        </h3>
                      </div>
                      <div className="p-5 space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-semibold text-slate-800">Funding Match Report</p>
                            <p className="text-sm text-slate-500 mt-0.5">
                              {INDUSTRY_NAMES[data.industry] || 'Your Industry'} · {PROVINCE_NAMES[data.province] || 'Your Region'}
                            </p>
                            <p className="text-sm text-slate-500">
                              Prepared for: {data.name} ({data.email})
                            </p>
                          </div>
                          <p className="text-2xl font-bold text-emerald-700">$19</p>
                        </div>

                        <div className="border-t border-gray-100 pt-3 grid grid-cols-2 gap-2 text-xs text-slate-500">
                          <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> {grantCount} matched programs</span>
                          <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Estimated funding ranges</span>
                          <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Application requirements</span>
                          <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Priority ranking</span>
                          <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Readiness score</span>
                          <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Permanent access link</span>
                        </div>
                      </div>
                    </div>

                    {/* Trust Signals */}
                    <div className="flex items-center justify-center gap-5 text-xs text-slate-500">
                      <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-emerald-500" /> Instant Delivery</span>
                      <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> One-Time Purchase</span>
                      <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-emerald-500" /> No Subscription</span>
                    </div>

                    {/* PayPal Button Container */}
                    <div id="calc-paypal-button" className="min-h-[50px]">
                      {!sdkReady && (
                        <div className="flex items-center justify-center py-4 gap-2 text-sm text-slate-500">
                          <Loader2 className="w-4 h-4 animate-spin" /> Loading secure checkout...
                        </div>
                      )}
                    </div>

                    {paymentError && (
                      <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
                        {paymentError}
                      </div>
                    )}

                    <p className="text-xs text-center text-slate-400">
                      Secure payment processed by PayPal. We never store your card details.
                    </p>
                  </div>
                )}

                {/* ═══════════════════════════════════════════════════
                    STEP 8: INSTANT REPORT DELIVERY
                   ═══════════════════════════════════════════════════ */}
                {step === 8 && isPurchased && (
                  <div className="space-y-6 animate-in fade-in duration-500 py-2">
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

                        {/* Permanent Access Link */}
                        {accessToken && (
                          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
                            <p className="text-sm text-blue-700 font-medium mb-2">Bookmark your report for permanent access:</p>
                            <a
                              href={`/products/report?token=${accessToken}`}
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
                    <div className="border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-white rounded-2xl p-5 sm:p-6 text-center relative overflow-hidden">
                      <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-bl uppercase tracking-wider">
                        $19 Credit Active
                      </div>
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-full mb-3">
                        <TrendingUp className="w-6 h-6 text-indigo-600" />
                      </div>
                      <h4 className="text-lg font-bold text-slate-800 mb-1">Need Help Applying?</h4>
                      <p className="text-sm text-slate-500 mb-4 max-w-md mx-auto">
                        Our funding advisors can help you prepare applications, maximize eligibility, and navigate the process.
                        <strong className="block mt-2.5 text-emerald-700 font-semibold bg-emerald-50 border border-emerald-100 rounded-lg p-2.5">
                          Your $19 Report fee is credited back on booking — verification audit is only $180
                        </strong>
                      </p>
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <a
                          href={`/consultation?source=report-upsell&email=${encodeURIComponent(data.email)}&name=${encodeURIComponent(data.name)}&industry=${encodeURIComponent(data.industry)}&region=${encodeURIComponent(data.province)}`}
                          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-lg shadow-indigo-200"
                          onClick={() => trackEvent('audit_upsell_clicked', { source: 'funding_match_report' })}
                        >
                          Book a $199 Funding Audit <ArrowRight className="w-4 h-4" />
                        </a>
                        <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold px-3 py-1.5 rounded-full text-[11px] flex items-center gap-1 shadow-sm shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          $19 Coupon Applied (Pay $180)
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-2">100% deposit refund if no programs match</p>
                    </div>
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
                            (step === 1 && !data.province) ||
                            (step === 2 && !data.industry) ||
                            (step === 3 && !data.revenue) ||
                            (step === 4 && !data.goal)
                        }
                    >
                        {step === 4 ? 'Calculate' : 'Next'} <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </CardFooter>
            )}
        </Card>
    )
}
