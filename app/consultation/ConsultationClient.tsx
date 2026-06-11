'use client';

import { useState, useEffect, useCallback } from 'react';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { trackGAEvent } from '@/components/LeadConversionUpsellWatcher';

import {
  CheckCircle,
  ShieldCheck,
  Clock,
  Award,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Users,
  ChevronDown,
  Zap,
  Star,
  Lock,
  BarChart3,
  FileText,
  Phone,
  Search,
  BadgeCheck,
  CircleDollarSign,
  Timer,
  Building2,
  Database,
} from 'lucide-react';

/* ─────────────────────────────────────────────
   Consultation Page – Premium Redesign
   Light advisory aesthetic · 2-tier cards · Collapsible FAQ
   ───────────────────────────────────────────── */

function getGaClientId() {
  if (typeof document === 'undefined') return '';
  const match = document.cookie.match(/_ga=GA1\.\d+\.(\d+\.\d+)/);
  return match && match[1] ? match[1] : '';
}

export default function ConsultationClient() {
  const [sdkReady, setSdkReady] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [selectedTier, setSelectedTier] = useState<'audit' | 'vip'>('audit');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [params, setParams] = useState<{
    email: string;
    name: string;
    rid: string;
    source: string;
    scheduled: boolean;
    eventUri: string;
    inviteeUri: string;
    bookedAt: number;
    score: number;
    range: string;
    region: string;
    size: string;
    industry: string;
  }>({
    email: '',
    name: '',
    rid: '',
    source: 'consultation-page',
    scheduled: false,
    eventUri: '',
    inviteeUri: '',
    bookedAt: 0,
    score: 0,
    range: '',
    region: '',
    size: '',
    industry: ''
  });

  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const isExpired = params.scheduled && params.bookedAt > 0 && timeLeft !== null && timeLeft <= 0;

  const paypalClientId = process.env.NEXT_PUBLIC_CONSULTATION_PAYPAL_CLIENT_ID
    || process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
    || "ATiNArUnyarxHv-FRUJ7pVi14uHjafO8fEGrRVGBSUBRIrS-Rpx-w8LNEcHyGsF5sExfJjT03aYo_0xq";

  /* ── URL Params ── */
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setParams({
      email: searchParams.get('email') || '',
      name: searchParams.get('name') || '',
      rid: searchParams.get('rid') || searchParams.get('recoveryId') || '',
      source: searchParams.get('source') || 'consultation-page',
      scheduled: searchParams.get('scheduled') === 'true',
      eventUri: searchParams.get('event_uri') || '',
      inviteeUri: searchParams.get('invitee_uri') || '',
      bookedAt: Number(searchParams.get('booked_at')) || 0,
      score: Number(searchParams.get('score')) || 0,
      range: searchParams.get('range') || '',
      region: searchParams.get('region') || '',
      size: searchParams.get('size') || '',
      industry: searchParams.get('industry') || ''
    });
  }, []);

  /* ── GA4 Fallback Booking Complete Tracking ── */
  useEffect(() => {
    if (params.scheduled && params.rid) {
      const storageKey = `booking_complete_tracked_${params.rid}`;
      if (!window.sessionStorage.getItem(storageKey)) {
        trackGAEvent('booking_complete', {
          recovery_id: params.rid,
          source: params.source,
          utm_source: window.sessionStorage.getItem('fsi:utm_source') || 'N/A',
          utm_medium: window.sessionStorage.getItem('fsi:utm_medium') || 'N/A',
          utm_campaign: window.sessionStorage.getItem('fsi:utm_campaign') || 'N/A',
        });
        window.sessionStorage.setItem(storageKey, 'true');
      }
    }
  }, [params.scheduled, params.rid, params.source]);

  /* ── Immediate Land Registration ── */
  useEffect(() => {
    if (params.scheduled && params.rid && (params.email || params.inviteeUri)) {
      const storageKey = `checkout_landed_registered_${params.rid}`;
      if (!window.sessionStorage.getItem(storageKey)) {
        fetch('/api/strategy-session/recovery', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'abandoned',
            recoveryId: params.rid,
            email: params.email,
            name: params.name,
            source: params.source,
            reason: 'checkout_scheduled_landed',
            pagePath: window.location.pathname,
            calendlyEventUri: params.eventUri,
            calendlyInviteeUri: params.inviteeUri,
            gaClientId: getGaClientId(),
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            window.sessionStorage.setItem(storageKey, 'true');
            if (data?.email || data?.name) {
              setParams((prev) => ({
                ...prev,
                email: data.email || prev.email,
                name: data.name || prev.name,
              }));
            }
          })
          .catch((error) => {
            console.error('Failed to log checkout landing recovery event:', error);
          });
      }
    }
  }, [params.scheduled, params.rid, params.email, params.name, params.source, params.eventUri, params.inviteeUri]);

  /* ── Countdown Timer ── */
  useEffect(() => {
    if (!params.scheduled || params.bookedAt <= 0) return;

    const interval = setInterval(() => {
      const remaining = (params.bookedAt + 60 * 60 * 1000) - Date.now();
      setTimeLeft(remaining > 0 ? remaining : 0);
    }, 1000);

    const initialRemaining = (params.bookedAt + 60 * 60 * 1000) - Date.now();
    setTimeLeft(initialRemaining > 0 ? initialRemaining : 0);

    return () => clearInterval(interval);
  }, [params.scheduled, params.bookedAt]);

  const formatCountdown = (ms: number) => {
    if (ms <= 0) return '00:00';
    const totalSecs = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSecs / 60);
    const seconds = totalSecs % 60;
    return [
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0')
    ].join(':');
  };

  const getExpirationTimeFormatted = () => {
    if (params.bookedAt <= 0) return '';
    const date = new Date(params.bookedAt + 60 * 60 * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' ' + date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  /* ── Recovery Tracking ── */
  const markRecoveryPaid = useCallback(async (details: any) => {
    if (!params.rid) return;
    const paypalOrderId = String(details?.id || '');
    await fetch('/api/strategy-session/recovery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'paid',
        recoveryId: params.rid,
        source: params.source,
        pagePath: typeof window !== 'undefined' ? window.location.pathname : '',
        paypalOrderId,
        rawSummary: JSON.stringify({
          paypalOrderId,
          status: details?.status || '',
          payerEmail: details?.payer?.email_address || '',
          tier: selectedTier,
          amount: selectedTier === 'audit' ? 199.00 : 499.00
        }),
        calendlyEventUri: params.eventUri,
        calendlyInviteeUri: params.inviteeUri,
        gaClientId: getGaClientId(),
      }),
    }).catch((error) => {
      console.error('Strategy session paid recovery update failed:', error);
    });
  }, [params.rid, params.source, params.eventUri, params.inviteeUri, selectedTier]);

  const markRecoveryAbandoned = useCallback(async (reason: string) => {
    if (!params.rid) return;
    await fetch('/api/strategy-session/recovery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'abandoned',
        recoveryId: params.rid,
        source: params.source,
        reason,
        pagePath: typeof window !== 'undefined' ? window.location.pathname : '',
        calendlyEventUri: params.eventUri,
        calendlyInviteeUri: params.inviteeUri,
        gaClientId: getGaClientId(),
      }),
    }).catch((error) => {
      console.error('Strategy session abandoned recovery update failed:', error);
    });
  }, [params.rid, params.source, params.eventUri, params.inviteeUri]);

  /* ── PayPal SDK Load ── */
  useEffect(() => {
    if ((window as any).paypal) {
      setSdkReady(true);
      return;
    }
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
  }, [paypalClientId]);

  /* ── PayPal Buttons ── */
  useEffect(() => {
    if (!sdkReady || !(window as any).paypal) return;

    const container = document.getElementById("paypal-button-container");
    if (container) container.innerHTML = "";

    const price = selectedTier === 'audit' ? '199.00' : '499.00';
    const description = selectedTier === 'audit'
      ? 'Funding Eligibility Audit & Roadmap'
      : 'VIP Funding Blueprint & Strategy Session';

    (window as any).paypal.Buttons({
      style: {
        layout: 'vertical',
        color: 'gold',
        shape: 'rect',
        label: 'pay',
        height: 48
      },
      createOrder: (_data: any, actions: any) => {
        setPaymentError(null);
        return actions.order.create({
          purchase_units: [{
            amount: { value: price, currency_code: 'USD' },
            description
          }]
        });
      },
      onApprove: async (_data: any, actions: any) => {
        try {
          const details = await actions.order.capture();
          await markRecoveryPaid(details);
          const orderId = details?.id || '';
          window.location.href = `/booking?success=true&email=${encodeURIComponent(params.email)}&name=${encodeURIComponent(params.name)}&rid=${encodeURIComponent(params.rid)}&source=${encodeURIComponent(params.source)}&tier=${selectedTier}&price=${price}&order=${encodeURIComponent(orderId)}`;
        } catch (err) {
          console.error("Payment capture error:", err);
          setPaymentError("Payment was processed, but we encountered an issue locking your slot. Please contact support.");
        }
      },

      onCancel: () => {
        setPaymentError("Payment was cancelled. You can complete checkout whenever you are ready.");
        void markRecoveryAbandoned(`paypal_cancelled_${selectedTier}`);
      },
      onError: (err: any) => {
        console.error("PayPal Smart Button Error:", err);
        setPaymentError("Payment failed. Please check your card/account details and try again.");
        void markRecoveryAbandoned(`paypal_error_${selectedTier}`);
      }
    }).render('#paypal-button-container');
  }, [sdkReady, selectedTier, params, markRecoveryPaid, markRecoveryAbandoned]);

  /* ── Funding Potential Score™ ── */
  const getFundingPotential = () => {
    const emailStr = (params.email || '').toLowerCase().trim();
    const sourceStr = (params.source || '').toLowerCase().trim();
    const isCorporate = emailStr && !/(gmail|yahoo|hotmail|outlook|live|icloud|aol|mail|msn)\./.test(emailStr);

    let readiness = params.score || (isCorporate ? 84 : 78);
    let range = params.range || (isCorporate ? '$100,000 – $500,000' : '$50,000 – $250,000');
    let region = params.region || '';
    let industry = params.industry || '';

    let industryFit = 'High Match';
    
    // Determine industry name to check
    const industryKey = (industry || sourceStr).toLowerCase();
    if (industryKey.includes('agriculture') || industryKey.includes('agri')) {
      industryFit = 'Specialized Match';
      if (!params.range) range = '$75,000 – $350,000';
    } else if (industryKey.includes('technology') || industryKey.includes('tech') || industryKey.includes('digital') || industryKey.includes('ai') || industryKey.includes('cleantech') || industryKey.includes('software')) {
      industryFit = 'High-Tech Match';
      if (!params.range) range = '$150,000 – $600,000';
    } else if (industryKey.includes('manufacturing') || industryKey.includes('industrial')) {
      industryFit = 'Industrial Match';
      if (!params.range) range = '$120,000 – $450,000';
    } else if (industryKey.includes('healthcare') || industryKey.includes('medical') || industryKey.includes('life sciences')) {
      industryFit = 'Healthcare Match';
      if (!params.range) range = '$200,000 – $800,000';
    }

    // Determine min value
    const cleanRange = range.replace(/[^0-9\–\-]/g, '');
    const parts = cleanRange.split(/[\–\-]/);
    let potentialMinVal = 50000;
    if (parts[0]) {
      const parsed = parseInt(parts[0], 10);
      if (!isNaN(parsed)) {
        potentialMinVal = parsed < 1000 ? parsed * 1000 : parsed;
      }
    }

    return { industryFit, readiness, range, potentialMinVal, region };
  };

  const calc = getFundingPotential();
  const currentDeposit = selectedTier === 'audit' ? 199 : 499;
  const roiMultiplier = Math.round(calc.potentialMinVal / currentDeposit);

  /* ── FAQ Data ── */
  const faqs = [
    {
      q: 'Why is this a paid audit instead of a free consultation?',
      a: 'Most "free consulting" calls online are high-pressure sales pitches. We charge a research deposit because our team provides real work — a senior funding analyst spends up to 4 hours manually auditing your business profile against 800+ active government grants, tax credits, and loans before we meet. You receive a customized, downloadable Funding Roadmap PDF to keep, whether or not you choose to work with us further.'
    },
    {
      q: 'What is the difference between the Audit and VIP Blueprint?',
      a: 'The standard Audit ($199) includes a 30-minute call, 2 hours of analyst research, and your top 3 program matches as a PDF Roadmap. The VIP Blueprint ($499) provides a 60-minute deep dive with a senior partner, 4 hours of research, and a comprehensive priority stack timeline mapping out exact stacking strategies for larger or multiple concurrent projects.'
    },
    {
      q: 'Is the research deposit refundable?',
      a: 'Yes, 100%. If our analysts determine that your business is not eligible for any active funding opportunities, your research deposit is refunded in full.'
    },
    {
      q: 'What happens after I complete my audit?',
      a: 'We deliver your custom Funding Roadmap PDF during the 1-on-1 strategy call. If the audit identifies strong opportunities and you choose to hire us for full application preparation and filing, we credit 100% of your deposit directly toward the service agreement — reducing your invoice dollar for dollar.'
    }
  ];

  /* ── Scroll to Checkout ── */
  const scrollToCheckout = () => {
    document.getElementById('checkout-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        /* Force hide all Google AdSense auto-ads on this page */
        .adsbygoogle, .google-auto-placed, ins.adsbygoogle,
        iframe[name^="google_ads_iframe"], iframe[id^="google_ads_iframe"],
        div[id^="google_ads_iframe"], google-rabs-container {
          display: none !important; visibility: hidden !important;
          height: 0 !important; width: 0 !important; pointer-events: none !important;
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .shimmer-border {
          background: linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.15) 50%, transparent 100%);
          background-size: 200% 100%;
          animation: shimmer 3s ease-in-out infinite;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeInUp 0.5s ease-out both; }
        .animate-fade-in-d1 { animation: fadeInUp 0.5s ease-out 0.1s both; }
        .animate-fade-in-d2 { animation: fadeInUp 0.5s ease-out 0.2s both; }
        .animate-fade-in-d3 { animation: fadeInUp 0.5s ease-out 0.3s both; }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spinSlow 12s linear infinite;
        }
      `}} />

      <Header />

      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-700 font-sans antialiased overflow-x-hidden selection:bg-indigo-500 selection:text-white">

        {/* ═══════════ HERO ═══════════ */}
        <section className="relative pt-28 sm:pt-32 pb-12 px-5 sm:px-6">
          {/* Soft radial glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-b from-indigo-100/50 to-transparent rounded-full blur-[100px] pointer-events-none" />

          <div className="relative max-w-4xl mx-auto text-center">
            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-8 text-xs sm:text-sm font-semibold animate-fade-in">
              <span className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
                <CheckCircle className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Profile Submitted</span>
                <span className="sm:hidden">Profile ✓</span>
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
              <span className="flex items-center gap-1.5 text-indigo-700 bg-indigo-50 border-2 border-indigo-300 px-3 py-1.5 rounded-full shadow-sm">
                <CircleDollarSign className="w-3.5 h-3.5" />
                Select Package
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
              <span className="flex items-center gap-1.5 text-slate-400 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full">
                <Phone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Book Your Call</span>
                <span className="sm:hidden">Book Call</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-black text-slate-950 tracking-tight leading-[1.15] mb-4 animate-fade-in-d1">
              Your Funding Eligibility<br className="hidden sm:block" /> Audit is Ready
            </h1>

            <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed mb-6 animate-fade-in-d2">
              Select your audit package below. A senior funding analyst will manually research your business against <strong className="text-slate-700">800+ active government programs</strong> and deliver a custom Funding Roadmap before your call.
            </p>

            {/* Trust Strip */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-400 font-medium animate-fade-in-d3">
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" /> SSL Encrypted Website
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> Secure Payments via PayPal
              </span>
              <span className="flex items-center gap-1.5">
                <BadgeCheck className="w-3.5 h-3.5" /> Privacy-First Data Handling
              </span>
            </div>
          </div>
        </section>

        {/* ═══════════ PRICING CARDS ═══════════ */}
        <section className="relative px-5 sm:px-6 pb-10" id="pricing">
          <div className="max-w-4xl mx-auto">
            <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">

              {/* ── Audit Card ($199) ── */}
              <div
                onClick={() => { setSelectedTier('audit'); scrollToCheckout(); }}
                className={`relative rounded-2xl sm:rounded-3xl p-6 sm:p-7 cursor-pointer transition-all duration-300 group ${
                  selectedTier === 'audit'
                    ? 'bg-white border-2 border-indigo-500 shadow-xl shadow-indigo-100/50 scale-[1.02]'
                    : 'bg-white border-2 border-slate-200 hover:border-indigo-300 hover:shadow-lg'
                }`}
              >
                {/* Popular Badge */}
                <div className="absolute -top-3 left-5 px-3 py-1 rounded-full bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest shadow-md">
                  Most Popular
                </div>

                {/* Selection Indicator */}
                <div className={`absolute top-5 right-5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  selectedTier === 'audit' ? 'border-indigo-500 bg-indigo-500' : 'border-slate-300'
                }`}>
                  {selectedTier === 'audit' && <CheckCircle className="w-4 h-4 text-white" />}
                </div>

                <div className="mt-2">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center">
                      <Search className="w-4.5 h-4.5 text-indigo-600" />
                    </div>
                    <h3 className="text-lg font-black text-slate-950">Funding Audit</h3>
                  </div>

                  <div className="flex items-baseline gap-1.5 mb-5">
                    <span className="text-4xl font-black text-slate-950 tracking-tight">$199</span>
                    <span className="text-sm font-bold text-indigo-600">USD</span>
                    <span className="text-xs text-slate-400 ml-1">/ deposit</span>
                  </div>

                  <div className="space-y-3 text-sm text-slate-600">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span><strong className="text-slate-800">2 Hours</strong> of custom pre-call desk research</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span><strong className="text-slate-800">Top 3 Matches</strong> grant/loan/tax credit roadmap PDF</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span><strong className="text-slate-800">30-Min Strategy Call</strong> private Google Meet session</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span><strong className="text-slate-800">Eligibility analysis</strong> with precision scoring criteria</span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => { e.stopPropagation(); setSelectedTier('audit'); scrollToCheckout(); }}
                    className={`w-full mt-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 ${
                      selectedTier === 'audit'
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {selectedTier === 'audit' ? '✓ Selected — Scroll to Checkout' : 'Select Audit'}
                  </button>
                </div>
              </div>

              {/* ── VIP Blueprint Card ($499) ── */}
              <div
                onClick={() => { setSelectedTier('vip'); scrollToCheckout(); }}
                className={`relative rounded-2xl sm:rounded-3xl p-6 sm:p-7 cursor-pointer transition-all duration-300 group ${
                  selectedTier === 'vip'
                    ? 'bg-white border-2 border-indigo-500 shadow-xl shadow-indigo-100/50 scale-[1.02]'
                    : 'bg-white border-2 border-slate-200 hover:border-indigo-300 hover:shadow-lg'
                }`}
              >
                {/* Best Value Badge */}
                <div className="absolute -top-3 left-5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-black uppercase tracking-widest shadow-md flex items-center gap-1">
                  <Star className="w-3 h-3" /> Best Value
                </div>

                {/* Selection Indicator */}
                <div className={`absolute top-5 right-5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  selectedTier === 'vip' ? 'border-indigo-500 bg-indigo-500' : 'border-slate-300'
                }`}>
                  {selectedTier === 'vip' && <CheckCircle className="w-4 h-4 text-white" />}
                </div>

                <div className="mt-2">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center">
                      <Zap className="w-4.5 h-4.5 text-amber-600" />
                    </div>
                    <h3 className="text-lg font-black text-slate-950">VIP Blueprint</h3>
                  </div>

                  <div className="flex items-baseline gap-1.5 mb-5">
                    <span className="text-4xl font-black text-slate-950 tracking-tight">$499</span>
                    <span className="text-sm font-bold text-indigo-600">USD</span>
                    <span className="text-xs text-slate-400 ml-1">/ deposit</span>
                  </div>

                  <div className="space-y-3 text-sm text-slate-600">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span><strong className="text-slate-800">4 Hours</strong> of senior-level deep dive research</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span><strong className="text-slate-800">All Eligible Programs</strong> full database query + stack timeline</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span><strong className="text-slate-800">60-Min Senior Partner Call</strong> direct advisory session</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span><strong className="text-slate-800">Written priority stack</strong> with exact stacking strategies</span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => { e.stopPropagation(); setSelectedTier('vip'); scrollToCheckout(); }}
                    className={`w-full mt-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 ${
                      selectedTier === 'vip'
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {selectedTier === 'vip' ? '✓ Selected — Scroll to Checkout' : 'Select VIP Blueprint'}
                  </button>
                </div>
              </div>

            </div>

            {/* Deposit Credit Callout */}
            <div className="mt-5 text-center">
              <p className="inline-flex items-center gap-2 text-xs sm:text-sm text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-full px-4 py-2 font-semibold">
                <Award className="w-4 h-4 flex-shrink-0" />
                100% of your deposit is credited toward full-service filing if you partner with us
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════ CONTENT GRID: Score + Checkout ═══════════ */}
        <section className="px-5 sm:px-6 pb-16">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-12 gap-8 items-start">

            {/* Left Column: Score + Social Proof + Guarantee (7 cols) */}
            <div className="lg:col-span-7 space-y-6">

              {/* customized status urgency banner */}
              {calc.readiness > 0 && (
                <div className={`p-4 rounded-xl border flex items-start gap-3 animate-fade-in ${
                  calc.readiness >= 80
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : calc.readiness >= 70
                      ? 'bg-blue-50 border-blue-200 text-blue-900'
                      : calc.readiness >= 50
                        ? 'bg-amber-50 border-amber-200 text-amber-900'
                        : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}>
                  {calc.readiness >= 80 ? (
                    <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <ShieldCheck className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <span className="font-extrabold text-xs block uppercase tracking-wider mb-0.5">
                      {calc.readiness >= 80
                        ? 'Excellent Candidate Status'
                        : calc.readiness >= 70
                          ? 'Strong Candidate Status'
                          : calc.readiness >= 50
                            ? 'Moderate Candidate Status'
                            : 'Limited Candidate Status'}
                    </span>
                    <p className="text-[11px] font-medium leading-relaxed">
                      {calc.readiness >= 80
                        ? 'Direct priority routing active. Your profile meets or exceeds pre-qualification standards for prime funding programs.'
                        : calc.readiness >= 70
                          ? 'Standard alignment checks complete. Your profile demonstrates solid alignment with several capital programs.'
                          : calc.readiness >= 50
                            ? 'Manual verification required. Additional firmographic parameters must be reviewed to confirm active program fits.'
                            : 'Basic requirements met. Standard advisory review recommended to explore niche or provincial support routes.'}
                    </p>
                  </div>
                </div>
              )}

              {/* Funding Potential Score™ */}
              <div className="bg-slate-950 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4.5 h-4.5 text-indigo-400" />
                    <h4 className="text-sm font-black tracking-tight">Funding Potential Score™</h4>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider bg-indigo-950/80 px-2.5 py-1 rounded-full border border-indigo-800/30">
                    Initial Scan
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 bg-slate-900/60 border border-slate-800/60 rounded-xl p-3 text-xs">
                  <div className="text-center">
                    <div className="text-slate-500 font-semibold mb-1">Readiness</div>
                    <div className="text-xl font-black text-white">{calc.readiness}<span className="text-indigo-400 text-sm">/100</span></div>
                  </div>
                  <div className="text-center border-x border-slate-800/40">
                    <div className="text-slate-500 font-semibold mb-1">Industry</div>
                    <div className="font-bold text-emerald-400 text-xs">{calc.industryFit}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-slate-500 font-semibold mb-1">Est. Pool</div>
                    <div className="font-bold text-white text-xs">{calc.range.split(' – ')[0]}+</div>
                  </div>
                </div>

                <p className="text-[10px] text-slate-500 leading-normal mt-3 text-center">
                  Complete your audit below to unlock the full manual assessment and customized Funding Roadmap.
                </p>
              </div>

              {/* Social Proof Stats */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center shadow-sm">
                  <Database className="w-5 h-5 text-indigo-500 mx-auto mb-2" />
                  <div className="text-xl sm:text-2xl font-black text-slate-950">2,000+</div>
                  <div className="text-[10px] sm:text-xs text-slate-500 font-medium">Programs Tracked</div>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center shadow-sm">
                  <BarChart3 className="w-5 h-5 text-emerald-500 mx-auto mb-2" />
                  <div className="text-xl sm:text-2xl font-black text-slate-950">$12M+</div>
                  <div className="text-[10px] sm:text-xs text-slate-500 font-medium">Funding Identified</div>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center shadow-sm">
                  <Building2 className="w-5 h-5 text-amber-500 mx-auto mb-2" />
                  <div className="text-xl sm:text-2xl font-black text-slate-950">150+</div>
                  <div className="text-[10px] sm:text-xs text-slate-500 font-medium">Audits Delivered</div>
                </div>
              </div>

              {/* Client Outcomes (Compact) */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-sm">
                <h4 className="text-sm font-black text-slate-950 flex items-center gap-2 mb-4">
                  <Users className="w-4.5 h-4.5 text-indigo-600" />
                  Recent Audit Outcomes (Anonymized)
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div>
                      <div className="text-xs font-bold text-slate-900">Ontario Manufacturer</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">Hiring Subsidy + IRAP Review</div>
                    </div>
                    <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100 whitespace-nowrap ml-3">
                      Potential Match: $120,000
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div>
                      <div className="text-xs font-bold text-slate-900">Alberta Clean-Tech SaaS</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">SR&ED + Innovation Grant Review</div>
                    </div>
                    <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100 whitespace-nowrap ml-3">
                      Potential Match: $65,000
                    </span>
                  </div>
                </div>
              </div>

              {/* Zero-Risk Guarantee */}
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5 flex items-start gap-3">
                <ShieldCheck className="w-7 h-7 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-extrabold text-emerald-950 text-sm mb-1">100% Money-Back Eligibility Guarantee</h4>
                  <p className="text-xs text-emerald-800 leading-relaxed font-medium">
                    If our analysts determine that your business is not eligible for any active funding opportunities, your research deposit is refunded in full.
                  </p>
                </div>
              </div>

            </div>

            {/* Right Column: Checkout Card (5 cols) — Sticky */}
            <div className="lg:col-span-5 lg:sticky lg:top-24" id="checkout-section">
              <div className="bg-white border-2 border-indigo-500/70 rounded-2xl sm:rounded-3xl p-6 shadow-xl shadow-indigo-100/30 relative overflow-hidden">

                {/* Shimmer top border */}
                <div className="absolute top-0 left-0 right-0 h-1 shimmer-border" />

                {isExpired ? (
                  /* EXPIRED STATE */
                  <div className="text-center py-6 animate-fade-in">
                    <div className="w-12 h-12 bg-amber-50 rounded-2xl border border-amber-100 flex items-center justify-center mx-auto mb-4">
                      <Clock className="w-6 h-6 text-amber-600 animate-pulse" />
                    </div>
                    <h3 className="text-lg font-black text-slate-950 mb-2">Slot Reservation Expired</h3>
                    <p className="text-xs text-slate-500 leading-relaxed mb-6">
                      To ensure fair access for all applicants, audit slots are temporarily reserved for a maximum of 60 minutes. Your selected slot has been released back into the public calendar.
                    </p>
                    <a
                      href={`/booking?email=${encodeURIComponent(params.email)}&name=${encodeURIComponent(params.name)}&rid=${encodeURIComponent(params.rid)}&source=${encodeURIComponent(params.source)}`}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 font-bold text-sm text-white hover:bg-indigo-700 hover:-translate-y-0.5 active:translate-y-0 duration-150 shadow-md shadow-indigo-100"
                    >
                      Choose a New Time Slot
                      <ArrowRight className="w-4.5 h-4.5" />
                    </a>
                  </div>
                ) : (
                  /* ACTIVE CHECKOUT STATE */
                  <>
                    {params.scheduled && timeLeft !== null && (
                      <div className="mb-4 bg-amber-50/70 border border-amber-200/60 rounded-xl p-3 text-xs flex items-center justify-between animate-fade-in">
                        <div className="flex items-center gap-1.5 text-amber-900 font-semibold">
                          <Timer className="w-3.5 h-3.5 text-amber-600 animate-spin-slow" />
                          <span>Slot Reserved Until:</span>
                        </div>
                        <div className="text-right">
                          <div className="font-extrabold text-amber-950 font-mono">{formatCountdown(timeLeft)}</div>
                          <div className="text-[9px] text-amber-600 font-semibold">{getExpirationTimeFormatted()}</div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-2 mb-1.5">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${selectedTier === 'audit' ? 'bg-indigo-50' : 'bg-amber-50'}`}>
                        {selectedTier === 'audit' ? <Search className="w-4 h-4 text-indigo-600" /> : <Zap className="w-4 h-4 text-amber-600" />}
                      </div>
                      <div>
                        <h3 className="text-base font-black text-slate-950 leading-tight">
                          {selectedTier === 'audit' ? 'Funding Audit' : 'VIP Blueprint'}
                        </h3>
                        <p className="text-[10px] text-slate-400 font-medium">Refundable research deposit</p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-1.5 mt-4 mb-4 pb-4 border-b border-slate-100">
                      <span className="text-4xl font-black text-slate-950 tracking-tight">
                        {selectedTier === 'audit' ? '$199' : '$499'}
                      </span>
                      <span className="text-sm font-bold text-indigo-600">USD</span>
                    </div>

                    {/* Summary Checklist */}
                    <div className="space-y-2.5 mb-5 text-xs text-slate-600">
                      <div className="flex items-center gap-2">
                        <Timer className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />
                        <span>{selectedTier === 'audit' ? '2 hours custom research' : '4 hours senior research'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />
                        <span>{selectedTier === 'audit' ? 'Top 3 matches Roadmap PDF' : 'Full program stack timeline'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />
                        <span>{selectedTier === 'audit' ? '30-min strategy call' : '60-min senior partner call'}</span>
                      </div>
                    </div>

                    {/* ROI Calculator */}
                    <div className="bg-gradient-to-br from-slate-50 to-indigo-50/30 border border-slate-200/80 rounded-xl p-3.5 mb-5 text-xs">
                      <div className="flex justify-between items-center py-1 border-b border-slate-200/50">
                        <span className="text-slate-500 font-semibold">Est. Funding Pool</span>
                        <span className="font-extrabold text-slate-900">{calc.range.split(' – ')[0]}</span>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-slate-200/50">
                        <span className="text-slate-500 font-semibold">Research Deposit</span>
                        <span className="font-extrabold text-slate-900">${currentDeposit}</span>
                      </div>
                      <div className="flex justify-between items-center pt-1.5">
                        <span className="text-slate-500 font-bold">Potential ROI</span>
                        <span className="font-black text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-md">
                          {roiMultiplier}x Return
                        </span>
                      </div>
                    </div>

                    {/* Deposit Credit */}
                    <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3 text-[11px] text-indigo-800 mb-5 leading-normal text-center font-medium">
                      🎁 Your ${currentDeposit} deposit is <strong>100% credited</strong> toward full-service application preparation if you partner with us.
                    </div>

                    {/* PayPal Checkout */}
                    <div>
                      {paymentError && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-semibold text-center leading-normal">
                          {paymentError}
                        </div>
                      )}

                      {!sdkReady && (
                        <div className="w-full py-5 flex flex-col items-center justify-center gap-2 border border-slate-200 rounded-2xl bg-slate-50 mb-3">
                          <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                          <span className="text-slate-400 text-xs font-semibold animate-pulse">Loading secure checkout...</span>
                        </div>
                      )}

                      <div id="paypal-button-container" className="w-full relative z-10 min-h-[140px]" />

                      <div className="flex items-center justify-center gap-3 mt-3 text-[10px] text-slate-400 font-medium">
                        <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> SSL Encrypted</span>
                        <span className="text-slate-200">|</span>
                        <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> PayPal Secure</span>
                        <span className="text-slate-200">|</span>
                        <span className="flex items-center gap-1"><BadgeCheck className="w-3 h-3" /> 100% Refundable</span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Fine Print */}
              <p className="text-center text-[10px] text-slate-400 mt-3 leading-normal px-2">
                By completing checkout, you authorize our analysts to begin compiling research data for your business profile. Processed securely via PayPal.
              </p>
            </div>

          </div>
        </section>

        {/* ═══════════ FAQ ACCORDION ═══════════ */}
        <section className="px-5 sm:px-6 pb-20">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-black text-slate-950 mb-6 text-center">Frequently Asked Questions</h3>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50/50 transition-colors"
                  >
                    <span className="text-sm font-bold text-slate-900 pr-4">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`transition-all duration-300 ease-in-out ${openFaq === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                    <p className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
}
