'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CaseStudiesSection } from '@/components/CaseStudiesSection';
import { FounderCard } from '@/components/FounderCard';
import { DiyComparisonTable } from '@/components/DiyComparisonTable';
import {
  CheckCircle, ArrowRight, Shield, Lock, Clock, Star, TrendingUp,
  FileText, Phone, BadgeCheck, ChevronDown, Zap, DollarSign,
  CalendarClock, ShieldCheck, CircleDollarSign, Award, Users, Sparkles
} from 'lucide-react';

/* ─── Architecture: PAY FIRST → CALENDLY UNLOCKS ────────────────────────────
   This page enforces the revenue ladder rule:
     Level 4: $199 Funding Strategy Audit
       → Pay $199 via PayPal
       → Payment success → redirect to /booking?success=true&...
       → /booking page shows Calendly to book the call
   
   Calendly NEVER appears before payment on any Tier 1 path.
   This page is the entry point for:
     1. Post-report upsell (existing buyers)
     2. High-intent organic visitors who search "funding audit"
     3. Industry page consulting bridge clicks
────────────────────────────────────────────────────────────────────────────── */

function getGaClientId() {
  if (typeof document === 'undefined') return '';
  const match = document.cookie.match(/_ga=GA1\.\d+\.(\d+\.\d+)/);
  return match && match[1] ? match[1] : '';
}

const FAQ_DATA = [
  {
    q: 'Why is this a $199 paid audit and not a free call?',
    a: 'Free calls are usually high-pressure sales pitches. We charge a research fee because our team does real work before the call — we conduct a custom funding eligibility review of your business profile against 800+ active government programs and prepare a custom Funding Eligibility Report. You keep the report whether or not you hire us further.'
  },
  {
    q: 'What happens immediately after I pay?',
    a: 'You are redirected to our booking page where you select your preferred 30-minute call slot. No waiting. No email back-and-forth. Your Calendly booking link is unlocked immediately upon payment confirmation.'
  },
  {
    q: 'What does the audit include?',
    a: 'A 30-minute 1-on-1 strategy call with an FSI advisor. Before the call: a custom Funding Eligibility Report identifying your top 3 matched programs with funding amounts, eligibility criteria, and next steps. After the call: a written summary of the recommended strategy.'
  },
  {
    q: 'Is the $199 refundable?',
    a: 'Yes, 100%. If our analysts determine your business is not eligible for any active funding opportunities, your $199 research deposit is refunded in full.'
  },
  {
    q: 'If I already bought a report ($19/$49/$79), is my fee credited?',
    a: 'Yes. When you come from the post-report upsell page, your report fee is automatically credited toward the $199 audit (e.g. $79 bundle buyers pay only $120). Use the link from inside your report to get the credited price.'
  },
  {
    q: 'What if I want to hire FSI Digital after the audit?',
    a: 'Your $199 audit fee is credited 100% toward any filing service agreement. If we find strong opportunities and you choose to hire us for full application preparation, your invoice is reduced by $199 dollar for dollar.'
  }
];

const WHAT_IS_COVERED = [
  {
    icon: '📋',
    title: 'Custom Eligibility Review',
    desc: 'We screen your business profile against 800+ active government programs, tax credits, and grants across federal and provincial levels.'
  },
  {
    icon: '🎯',
    title: 'Top 3 Program Matches',
    desc: 'We identify your three highest-probability funding opportunities with estimated amounts, deadlines, and application complexity.'
  },
  {
    icon: '📄',
    title: 'Funding Eligibility Report',
    desc: 'A downloadable PDF report delivered to your inbox before the call. Yours to keep regardless of what you decide next.'
  },
  {
    icon: '📞',
    title: '30-Minute Strategy Call',
    desc: 'A focused 1-on-1 session where we walk through your matches, answer your questions, and map out your application sequence.'
  },
  {
    icon: '🗺️',
    title: 'Application Roadmap',
    desc: 'A written post-call summary outlining your recommended programs, stacking strategy, and month-by-month milestones.'
  },
  {
    icon: '🔄',
    title: '100% Refund Guarantee',
    desc: 'If we determine your business is not eligible for any active programs, your $199 research deposit is refunded in full.'
  }
];

const PROVINCE_NAMES: Record<string, string> = {
  on: 'Ontario', bc: 'British Columbia', ab: 'Alberta', qc: 'Quebec',
  ns: 'Nova Scotia', mb: 'Manitoba', sk: 'Saskatchewan', nb: 'New Brunswick',
  nl: 'Newfoundland & Labrador', pe: 'Prince Edward Island',
  territories: 'Territories', national: 'Federal/Nationwide',
};

const INDUSTRY_NAMES: Record<string, string> = {
  technology: 'Technology & Software', manufacturing: 'Manufacturing',
  agriculture: 'Agriculture & Agri-Food', healthcare: 'Healthcare & Life Sciences',
  energy: 'Clean Tech & Energy', retail: 'Retail & E-commerce',
  services: 'Professional Services', other: 'General Business',
};

const cleanField = (val: string, fallback: string) => {
  if (!val) return fallback;
  const trimmed = val.trim();
  const lower = trimmed.toLowerCase();
  if (lower === "n/a" || lower === "other" || lower === "general" || lower === "undefined" || lower === "null") {
    return fallback;
  }
  return trimmed;
};

const getProvinceName = (region: string) => {
  const val = cleanField(region, "Canada");
  return PROVINCE_NAMES[val.toLowerCase()] || val;
};

const getIndustryName = (industry: string) => {
  const val = cleanField(industry, "General Business");
  return INDUSTRY_NAMES[val.toLowerCase()] || val;
};

const getAuditEstimateRange = (industry: string, region: string) => {
  const ind = (industry || '').toLowerCase();
  const reg = (region || '').toLowerCase();
  if (ind.includes('tech') || ind.includes('clean') || ind.includes('manufacturing') || ind.includes('energy')) {
    return '$150,000 - $350,000+';
  }
  if (reg.includes('ab') || reg.includes('alberta') || reg.includes('on') || reg.includes('ontario') || reg.includes('bc') || reg.includes('british')) {
    return '$100,000 - $250,000+';
  }
  return '$75,000 - $200,000+';
};

export default function AuditClient() {
  const [sdkReady, setSdkReady] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [detailsConfirmed, setDetailsConfirmed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [params, setParams] = useState({
    email: '',
    name: '',
    company: '',
    industry: '',
    region: '',
    discount: 0,
    source: 'audit-page',
  });

  const paypalClientId =
    process.env.NEXT_PUBLIC_CONSULTATION_PAYPAL_CLIENT_ID ||
    process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ||
    'ATiNArUnyarxHv-FRUJ7pVi14uHjafO8fEGrRVGBSUBRIrS-Rpx-w8LNEcHyGsF5sExfJjT03aYo_0xq';

  /* ── URL Params ── */
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const emailVal = sp.get('email') || '';
    const nameVal = sp.get('name') || '';
    const regionVal = sp.get('region') || '';
    const industryVal = sp.get('industry') || '';
    const companyVal = sp.get('company') || sp.get('companyName') || sp.get('name') || '';
    const sourceVal = sp.get('source') || 'audit-page';

    setParams({
      email: emailVal,
      name: nameVal,
      company: companyVal,
      industry: industryVal,
      region: regionVal,
      discount: Number(sp.get('discount')) || 0,
      source: sourceVal,
    });

    if (emailVal && nameVal) {
      setDetailsConfirmed(true);

      // Auto-capture pre-filled lead details on page load to catch drop-offs
      const captureDraft = async () => {
        try {
          await fetch('/api/subscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: emailVal.trim(),
              name: nameVal.trim(),
              location: regionVal || 'ON',
              industry: industryVal || 'other',
              country: 'Canada',
              source: 'Audit Checkout Lead Draft (Pre-filled)',
              utmSource: sp.get('utm_source') || 'direct',
              utmMedium: sp.get('utm_medium') || 'N/A',
              utmCampaign: sp.get('utm_campaign') || 'N/A',
              gaClientId: getGaClientId(),
            }),
          });
        } catch (e) {
          console.error('Failed to auto-save pre-filled lead draft:', e);
        }
      };
      captureDraft();
    }
  }, []);

  /* ── PayPal SDK ── */
  useEffect(() => {
    if ((window as any).paypal) { setSdkReady(true); return; }
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(paypalClientId)}&currency=USD&intent=capture&components=buttons`;
    script.async = true;
    script.onload = () => setSdkReady(true);
    script.onerror = () => setPaymentError('Could not load secure checkout. Please refresh the page.');
    document.head.appendChild(script);
  }, [paypalClientId]);

  /* ── PayPal Buttons ── */
  useEffect(() => {
    if (!sdkReady || !(window as any).paypal) return;
    const container = document.getElementById('audit-paypal-button');
    if (container) container.innerHTML = '';

    if (!detailsConfirmed || !params.email || !params.name) {
      if (container) {
        container.innerHTML = `
          <div class="text-center p-4 bg-slate-50 border border-slate-200 border-dashed rounded-xl text-xs font-semibold text-slate-500">
            Please confirm your details above to unlock checkout.
          </div>
        `;
      }
      return;
    }

    const finalPrice = Math.max(0, 199 - params.discount).toFixed(2);
    const desc = params.discount > 0
      ? `FSI Digital Funding Strategy Audit ($${params.discount} report credit applied)`
      : 'FSI Digital Funding Strategy Audit';

    if (typeof (window as any).paypal.Buttons !== 'function') {
      setPaymentError('Could not load secure checkout. Please refresh the page.');
      return;
    }

    try {
      (window as any).paypal.Buttons({
        style: { layout: 'vertical', color: 'gold', shape: 'rect', label: 'pay', height: 52 },
        createOrder: (_data: any, actions: any) => {
          setPaymentError(null);
          return actions.order.create({
            purchase_units: [{ amount: { value: finalPrice, currency_code: 'USD' }, description: desc }]
          });
        },
        onApprove: async (_data: any, actions: any) => {
          try {
            setIsProcessing(true);
            const details = await actions.order.capture();
            if ((window as any).clarity) (window as any).clarity('event', 'audit_paid');
            const orderId = details?.id || '';
            
            const sp = new URLSearchParams(window.location.search);
            const attribution = {
              landingPage: window.location.pathname,
              referrer: document.referrer || 'direct',
              utmSource: sp.get('utm_source') || sp.get('source') || 'direct',
              utmMedium: sp.get('utm_medium') || 'N/A',
              utmCampaign: sp.get('utm_campaign') || 'N/A',
              gaClientId: getGaClientId(),
            };

            const res = await fetch('/api/products/purchase', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                productId: 'strategy-audit',
                email: params.email.trim(),
                name: params.name.trim(),
                paypalOrderId: orderId,
                profileData: {
                  province: params.region || 'ON',
                  industry: params.industry || 'other',
                  revenue: 'N/A',
                  goal: 'Funding Strategy Audit',
                  company: params.company || '',
                },
                attribution,
                sessionId: 'sess_audit_landing',
              }),
            });

            if (!res.ok) {
              const errBody = await res.json();
              throw new Error(errBody.error || 'Server failed to record purchase');
            }

            const resData = await res.json();
            const redirectUrl = resData.deliveryUrl || `/booking?success=true&email=${encodeURIComponent(params.email)}&name=${encodeURIComponent(params.name)}&source=${encodeURIComponent(params.source)}&tier=audit&price=${finalPrice}&order=${encodeURIComponent(orderId)}`;

            window.location.href = redirectUrl;
          } catch (err: any) {
            console.error('Payment capture/record error:', err);
            setIsProcessing(false);
            setPaymentError(err.message || 'Payment was processed but we encountered an issue logging your order. Please contact support immediately.');
          }
        },
        onCancel: () => setPaymentError('Payment cancelled. You can complete checkout whenever you are ready.'),
        onError: (err: any) => {
          console.error('PayPal error:', err);
          setPaymentError('Payment failed. Please check your card/account details and try again.');
        }
      }).render('#audit-paypal-button');
    } catch (err) {
      console.error('Failed to render PayPal buttons:', err);
      setPaymentError('Could not load secure checkout. Please refresh the page.');
    }
  }, [sdkReady, params, detailsConfirmed]);

  const finalPrice = Math.max(0, 199 - params.discount);
  const isDiscounted = params.discount > 0;

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-700 antialiased">

        {/* ── Hero ── */}
        <section className="relative pt-14 sm:pt-20 pb-10 px-5 sm:px-6 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-indigo-100/40 to-transparent rounded-full blur-[120px] pointer-events-none" />

          <div className="relative max-w-4xl mx-auto text-center">
            {/* Revenue Ladder Badge */}
            <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Level 4 — Funding Strategy Audit
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight mb-4">
              {params.source === 'personalized_preview' ? (
                <>
                  Unlock Your Full<br className="hidden sm:block" />
                  <span className="text-indigo-600">Funding Analysis.</span>
                </>
              ) : (
                <>
                  Pay. Book Instantly.<br className="hidden sm:block" />
                  <span className="text-indigo-600">Get Your Funding Roadmap.</span>
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed mb-6">
              An FSI advisor reviews your eligibility against <strong className="text-slate-700">800+ active programs</strong> and delivers a custom Funding Eligibility Report before your 30-min strategy call. No sales pitch. No waiting room.
            </p>

            {/* 4-Step B2B Process Timeline */}
            <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-4 gap-4 mb-10 mt-6 text-left">
              {[
                { step: "1. Deep Eligibility Review", desc: "Our analysts perform 2 hours of pre-call research against 800+ government programs." },
                { step: "2. Custom Report Prepared", desc: "We draft your private Funding Eligibility Report detailing matches, ranges, and pitfalls." },
                { step: "3. 1-on-1 Strategy Call", desc: "A 30-minute private consultation to walk through matches and stack programs." },
                { step: "4. Step-by-Step Action Plan", desc: "You receive a prioritized roadmap with deadlines and filing instructions." }
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-4 shadow-3xs relative overflow-hidden">
                  <span className="absolute -right-2 -bottom-4 text-slate-200/50 text-5xl font-black select-none">{idx + 1}</span>
                  <h5 className="font-bold text-slate-800 text-xs sm:text-sm mb-1">{item.step}</h5>
                  <p className="text-[10px] sm:text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Trust Strip */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-400 font-medium">
              <span className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5" /> SSL Encrypted</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> Secure PayPal Checkout</span>
              <span className="flex items-center gap-1.5"><BadgeCheck className="w-3.5 h-3.5" /> 100% Refund Guarantee</span>
              <span className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5" /> Audit Fee Credited Toward Filing</span>
            </div>
          </div>
        </section>

        {/* ── Main Content Grid ── */}
        <section className="px-5 sm:px-6 pb-16 max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8">

            {/* Left: What's Included */}
            <div className="lg:col-span-3 space-y-8">

              {/* What's Covered */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Award className="h-5 w-5 text-indigo-600" />
                  What&apos;s Included in Your $199 Audit
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {WHAT_IS_COVERED.map((item) => (
                    <div key={item.title} className="flex gap-3 items-start">
                      <span className="text-xl shrink-0 mt-0.5">{item.icon}</span>
                      <div>
                        <p className="font-bold text-slate-800 text-sm">{item.title}</p>
                        <p className="text-xs text-slate-500 leading-relaxed mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="my-6">
                <CaseStudiesSection limit={2} />
              </div>

              {/* Revenue Ladder Context */}
              <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="h-5 w-5 text-indigo-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">The FSI Revenue Ladder</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    {[
                      { level: 'Level 1', label: 'Funding Match Report', price: '$19', current: false },
                      { level: 'Level 2', label: 'Funding Action Plan', price: '$49', current: false },
                      { level: 'Level 3', label: 'Complete Funding Bundle', price: '$79', current: false },
                      { level: 'Level 4', label: 'Funding Strategy Audit', price: '$199', current: true },
                      { level: 'Level 5', label: 'Application & Filing Service', price: '$2,500+', current: false },
                      { level: 'Level 6', label: 'Success Fee Model', price: '1%', current: false },
                    ].map((item) => (
                      <div
                        key={item.level}
                        className={`flex items-center justify-between px-3 py-2 rounded-lg ${
                          item.current
                            ? 'bg-indigo-600 border border-indigo-500 font-bold'
                            : 'text-slate-400'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {item.current && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                          <span className="text-xs font-semibold text-slate-400">{item.level}</span>
                          <span className={item.current ? 'text-white' : ''}>{item.label}</span>
                        </span>
                        <span className={`text-xs font-bold ${item.current ? 'text-white' : 'text-slate-500'}`}>{item.price}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-slate-400 mt-4">
                    Your $199 audit fee is credited 100% toward any Level 5 filing service agreement.
                  </p>
                </div>
              </div>

              {/* FAQ */}
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-indigo-600" />
                  Frequently Asked Questions
                </h2>
                {FAQ_DATA.map((faq, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl border border-slate-200 overflow-hidden"
                  >
                    <button
                      id={`audit-faq-${idx}`}
                      className="w-full flex items-center justify-between p-4 text-left"
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    >
                      <span className="font-semibold text-slate-800 text-sm pr-4">{faq.q}</span>
                      <ChevronDown
                        className={`h-4 w-4 text-slate-400 shrink-0 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {openFaq === idx && (
                      <div className="px-4 pb-4 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 space-y-6">
                <FounderCard />
                <DiyComparisonTable />
              </div>

            </div>

            {/* Right: Sticky Checkout */}
            <div className="lg:col-span-2">
              <div className="sticky top-24 space-y-4">

                {/* Analyst Capacity Urgency Block */}
                <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 text-left shadow-3xs flex items-start gap-3">
                  <Clock className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-amber-950 text-xs uppercase tracking-wider">
                      Analyst Capacity Available This Week
                    </h4>
                    <p className="text-amber-800 text-[11px] mt-1 leading-relaxed font-semibold">
                      🟢 Accepting New Audit Clients &bull; Limited Analyst Capacity remaining. Slots allocated on a first-deposit basis.
                    </p>
                  </div>
                </div>

                {/* Pricing Card */}
                <div className="bg-white rounded-2xl border-2 border-indigo-200 shadow-xl shadow-indigo-100/40 p-6" id="audit-checkout">
                  {/* Personalization Section vs Form */}
                  {detailsConfirmed ? (
                    <>
                      {/* Personalized Metadata Header */}
                      {(params.name || params.industry || params.region) && (
                        <div className="bg-slate-900 text-white rounded-xl p-3.5 text-left shadow-2xs mb-4 border border-slate-800 flex flex-col gap-1">
                          <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Personalized Audit Queue</div>
                          <div className="text-xs font-semibold">
                            <span className="text-slate-400">Prepared for:</span> <span className="text-emerald-400">{params.name || "Qualified Lead"}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-300 pt-1.5 border-t border-slate-800 mt-1">
                            <div>
                              <span className="text-slate-400 font-normal">Industry:</span> {params.industry || "General Business"}
                            </div>
                            <div>
                              <span className="text-slate-400 font-normal">Region:</span> {params.region || "Canada"}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setDetailsConfirmed(false)}
                            className="text-[9px] text-indigo-400 hover:text-indigo-300 text-left mt-2 underline"
                          >
                            Edit Details
                          </button>
                        </div>
                      )}

                      {/* Opportunity Range Dossier Card */}
                      {(() => {
                        const companyName = cleanField(params.company || params.name, "Your Business");
                        const industryName = getIndustryName(params.industry);
                        const regionName = getProvinceName(params.region);
                        const opportunityRange = getAuditEstimateRange(params.industry, params.region);

                        return (
                          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-4 text-left shadow-2xs font-sans">
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
                                <span className="font-semibold text-slate-700 text-sm">{regionName}</span>
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
                      })()}
                    </>
                  ) : (
                    /* Interactive Form to collect details */
                    <div className="space-y-3.5 mb-5 bg-slate-50 border border-slate-200 rounded-xl p-4 text-left">
                      <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">Dossier Preparation Details</div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Company Email</label>
                        <input
                          type="email"
                          required
                          placeholder="you@company.com"
                          value={params.email}
                          onChange={(e) => setParams(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full px-3 py-1.5 text-sm text-slate-800 bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Contact Name</label>
                        <input
                          type="text"
                          required
                          placeholder="First & Last Name"
                          value={params.name}
                          onChange={(e) => setParams(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full px-3 py-1.5 text-sm text-slate-800 bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Company Name</label>
                        <input
                          type="text"
                          placeholder="Acme Inc. (Optional)"
                          value={params.company}
                          onChange={(e) => setParams(prev => ({ ...prev, company: e.target.value }))}
                          className="w-full px-3 py-1.5 text-sm text-slate-800 bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-500"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={async () => {
                          if (!params.email || !params.email.includes('@')) {
                            setPaymentError('Please enter a valid company email.');
                            return;
                          }
                          if (!params.name || params.name.trim().length < 2) {
                            setPaymentError('Please enter your contact name.');
                            return;
                          }
                          setPaymentError(null);
                          setDetailsConfirmed(true);

                          // Capture lead draft immediately to prevent funnel drop-off loss
                          try {
                            const sp = new URLSearchParams(window.location.search);
                            await fetch('/api/subscribe', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({
                                email: params.email.trim(),
                                name: params.name.trim(),
                                location: params.region || 'ON',
                                industry: params.industry || 'other',
                                country: 'Canada',
                                source: 'Audit Checkout Lead Draft',
                                utmSource: sp.get('utm_source') || 'direct',
                                utmMedium: sp.get('utm_medium') || 'N/A',
                                utmCampaign: sp.get('utm_campaign') || 'N/A',
                                gaClientId: getGaClientId(),
                              }),
                            });
                          } catch (e) {
                            console.error('Failed to save lead draft:', e);
                          }
                        }}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-lg text-xs transition-colors flex items-center justify-center gap-1"
                      >
                        Confirm & Lock In Dossier
                      </button>
                    </div>
                  )}

                  {/* Report Credit toward Audit Banner */}
                  <div className="bg-emerald-50/50 border border-emerald-200 rounded-xl p-3.5 text-xs text-emerald-800 mb-4">
                    💡 <strong>Risk-Free Start</strong>: Buy a Funding Report today. Upgrade to an audit within 7 days, and your report purchase is 100% credited toward your audit.
                  </div>

                  <div id="audit-paypal-button" className="min-h-[56px]">
                    {!sdkReady && (
                      <div className="h-14 bg-slate-100 animate-pulse rounded-lg flex items-center justify-center text-xs text-slate-400">
                        Loading secure checkout...
                      </div>
                    )}
                  </div>

                  <p className="text-center text-[10px] text-slate-400 mt-3">
                    Pay now → Book your call instantly → Calendly link unlocks immediately after payment
                  </p>
                </div>

                {/* Trust Box */}
                <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-2">
                  <p className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    Your purchase is protected
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-500">
                    <li className="flex items-start gap-1.5">
                      <span className="text-emerald-500 mt-0.5 shrink-0">✓</span>
                      <span>Encrypted PayPal checkout — we never store your card data</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-emerald-500 mt-0.5 shrink-0">✓</span>
                      <span>100% refund if you don&apos;t qualify for any active programs</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-emerald-500 mt-0.5 shrink-0">✓</span>
                      <span>$199 fee credited toward any Level 5 filing service</span>
                    </li>
                  </ul>
                </div>

                {/* Not Ready CTA */}
                <div className="text-center pt-2">
                  <p className="text-xs text-slate-400 mb-2">Not ready to pay yet?</p>
                  <Link
                    href="/calculator"
                    className="inline-flex items-center gap-1 text-xs text-emerald-700 font-semibold hover:text-emerald-800"
                  >
                    Start with the free eligibility calculator →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {isProcessing && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-xs z-50 flex flex-col items-center justify-center text-white">
          <div className="w-12 h-12 border-4 border-slate-700 border-t-indigo-500 rounded-full animate-spin mb-4" />
          <h3 className="text-lg font-bold">Securing Your Transaction...</h3>
          <p className="text-xs text-slate-400 mt-1 animate-pulse">Writing secure purchase record to the ledger, please do not close this window.</p>
        </div>
      )}
      <Footer />
    </>
  );
}
