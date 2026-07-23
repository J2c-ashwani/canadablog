'use client';

import { useState, useEffect } from 'react';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CheckCircle, Clock, ShieldCheck, Mail, Calendar, AlertCircle, ArrowRight, FileText, Phone, TrendingUp } from 'lucide-react';
import { trackGAEvent } from '@/components/LeadConversionUpsellWatcher';
import { safeSessionStorage } from '@/lib/storage';

interface BookingClientProps {
  prefilledEmail?: string
  prefilledName?: string
  token?: string
}

export default function BookingClient({ prefilledEmail = '', prefilledName = '', token = '' }: BookingClientProps) {
  const [loading, setLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState(prefilledEmail);
  const [name, setName] = useState(prefilledName);
  const [rid, setRid] = useState('');
  const [source, setSource] = useState('');
  const [orderId, setOrderId] = useState('');
  const [tokenState, setTokenState] = useState(token);

  // Pre-call questionnaire state
  const [qGoal, setQGoal] = useState('');
  const [qAge, setQAge] = useState('');
  const [qExperience, setQExperience] = useState('');
  const [qSubmitted, setQSubmitted] = useState(false);
  const [qSubmitting, setQSubmitting] = useState(false);
  const [qError, setQError] = useState('');
  const [hasMounted, setHasMounted] = useState(false);

  const CALENDLY_PATH = "ashwani-fsidigital/1-on-1-funding-consultation";

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Parse query params safely on client
    const searchParams = new URLSearchParams(window.location.search);
    const success = searchParams.get('success') === 'true';
    setIsSuccess(success);
    const parsedEmail = prefilledEmail || searchParams.get('email') || '';
    const parsedName = prefilledName || searchParams.get('name') || '';
    const parsedRid = searchParams.get('rid') || '';
    const parsedSource = searchParams.get('source') || '';
    const parsedOrderId = searchParams.get('order') || '';
    const parsedToken = token || searchParams.get('token') || '';
    setEmail(parsedEmail);
    setName(parsedName);
    setSource(parsedSource);
    setOrderId(parsedOrderId);
    if (parsedToken) {
      setTokenState(parsedToken);
    } else {
      try {
        const storedToken = localStorage.getItem("fsi_login_token") || sessionStorage.getItem("fsi_login_token") || '';
        if (storedToken) setTokenState(storedToken);
      } catch (e) {}
    }

    let finalRid = parsedRid;
    if (finalRid) {
      setRid(finalRid);
    } else {
      // Auto-generate recovery ID if it's missing, to ensure we can track in the sheet
      finalRid = typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
      setRid(finalRid);
    }

    setHasMounted(true);

    // Track Purchase if we redirected here successfully after checkout
    if (success) {
      if (typeof window !== 'undefined' && (window as any).clarity) {
        (window as any).clarity("event", "strategy_session_paid");
      }
      const orderId = searchParams.get('order') || '';
      const tier = searchParams.get('tier') || '';
      const priceStr = searchParams.get('price') || '';
      const price = Number(priceStr) || 199.00;

      if (orderId) {
        const storageKey = `purchase_tracked_${orderId}`;
        if (!safeSessionStorage.getItem(storageKey)) {
          trackGAEvent('purchase', {
            transaction_id: orderId,
            value: price,
            currency: 'USD',
            items: [
              {
                item_id: tier || 'audit',
                item_name: tier === 'vip' ? 'VIP Funding Blueprint & Eligibility Audit' : 'Funding Eligibility Audit & Action Plan',
                price: price,
                quantity: 1,
              }
            ],
            // Stitch UTM parameters if available in sessionStorage
            utm_source: safeSessionStorage.getItem('fsi:utm_source') || 'N/A',
            utm_medium: safeSessionStorage.getItem('fsi:utm_medium') || 'N/A',
            utm_campaign: safeSessionStorage.getItem('fsi:utm_campaign') || 'N/A',
          });

          if (tier === 'vip') {
            trackGAEvent('vip_booking', {
              transaction_id: orderId,
              value: price,
              currency: 'USD'
            });
          } else {
            trackGAEvent('audit_booking', {
              transaction_id: orderId,
              value: price,
              currency: 'USD'
            });
          }

          safeSessionStorage.setItem(storageKey, 'true');
        }
      }
    }

    if (!success) {
      if (typeof window !== 'undefined' && (window as any).clarity) {
        (window as any).clarity("event", "strategy_session_page_view");
      }
    }

    // Simulate loading state for Calendly iframe
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Dynamically build the Calendly URL on render
  let calendlyUrl = `https://calendly.com/${CALENDLY_PATH}?hide_landing_page_details=1&hide_gdpr_banner=1&background_color=ffffff&text_color=0f172a&primary_color=4f46e5`;
  if (hasMounted) {
    const domain = window.location.hostname; // Exclude port to prevent Calendly embed errors
    calendlyUrl += `&embed_domain=${encodeURIComponent(domain)}&embed_type=Inline`;
    if (email) {
      calendlyUrl += `&email=${encodeURIComponent(email)}&prefill[email]=${encodeURIComponent(email)}`;
    }
    if (name) {
      calendlyUrl += `&name=${encodeURIComponent(name)}&prefill[name]=${encodeURIComponent(name)}`;
    }
  }

  // Listen to Calendly postMessage event
  useEffect(() => {
    if (isSuccess) return;

    const handleMessage = async (e: MessageEvent) => {
      console.log('[Calendly SDK] Raw postMessage received:', { origin: e.origin, data: e.data });
      
      let data = e.data;
      if (typeof data === 'string') {
        try {
          data = JSON.parse(data);
          console.log('[Calendly SDK] Parsed stringified JSON message:', data);
        } catch {
          // Ignore non-JSON string messages (e.g. webpack dev server)
        }
      }

      if (data && data.event && data.event.startsWith('calendly.')) {
        console.log('[Calendly SDK] Calendly event detected:', data.event, data.payload);
        
        if (data.event === 'calendly.event_scheduled') {
          if (typeof window !== 'undefined' && (window as any).clarity) {
            (window as any).clarity("event", "strategy_session_booked");
          }
          const payload = data.payload || {};
          const inviteeEmail = payload.invitee?.email || email;
          const inviteeName = payload.invitee?.name || name;
          const eventUri = payload.event?.uri || '';
          const inviteeUri = payload.invitee?.uri || '';
          const bookedAt = Date.now();

          console.log('[Calendly SDK] Event scheduled. Syncing to recovery ledger...');

          // Track booking_complete immediately
          trackGAEvent('booking_complete', {
            recovery_id: rid,
            source: source,
            utm_source: safeSessionStorage.getItem('fsi:utm_source') || 'N/A',
            utm_medium: safeSessionStorage.getItem('fsi:utm_medium') || 'N/A',
            utm_campaign: safeSessionStorage.getItem('fsi:utm_campaign') || 'N/A',
          });

          // Sync slot booking back to sheets database using the recovery API
          try {
            await fetch('/api/strategy-session/recovery', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                event: 'paid', // Mark as paid/secured booking
                recoveryId: rid || orderId || inviteeEmail,
                email: inviteeEmail,
                name: inviteeName,
                calendlyEventUri: eventUri,
                calendlyInviteeUri: inviteeUri,
                paypalOrderId: orderId || 'N/A',
                rawSummary: JSON.stringify({
                  amount: '199.00',
                  tier: 'audit',
                  orderId: orderId,
                }),
                source: source || 'audit-booking',
              }),
            });
            console.log('[Calendly SDK] Successfully synced booking back to server.');
          } catch (syncErr) {
            console.error('[Calendly SDK] Failed to sync booking back to server:', syncErr);
          }

          // Redirect to checkout with slot details
          const successUrl = `/booking?success=true&email=${encodeURIComponent(inviteeEmail)}&name=${encodeURIComponent(inviteeName)}&order=${encodeURIComponent(orderId)}&rid=${encodeURIComponent(rid)}&source=${encodeURIComponent(source)}&scheduled=true&event_uri=${encodeURIComponent(eventUri)}&invitee_uri=${encodeURIComponent(inviteeUri)}&booked_at=${bookedAt}`;
          window.location.href = successUrl;
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [isSuccess, email, name, rid, source, orderId]);


  // Stable Calendly URL loaded once on mount

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        /* Force hide all Google AdSense auto-ads and placeholders on this page */
        .adsbygoogle,
        .google-auto-placed,
        ins.adsbygoogle,
        iframe[name^="google_ads_iframe"],
        iframe[id^="google_ads_iframe"],
        div[id^="google_ads_iframe"],
        google-rabs-container {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          height: 0 !important;
          width: 0 !important;
          max-height: 0 !important;
          max-width: 0 !important;
          pointer-events: none !important;
        }
      `}} />
      <Header />
      <div className="min-h-screen bg-slate-50 text-slate-700 font-sans antialiased overflow-x-hidden pt-24 pb-16 selection:bg-indigo-500 selection:text-white">
        
        {/* Decorative Grid and Ambient light background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f080_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f080_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          
          {isSuccess ? (
            /* STATE B: PAYMENT & BOOKING CONFIRMED — UPGRADED SUCCESS SCREEN */
            <div className="max-w-2xl mx-auto space-y-6">

              {/* ── Confirmation Receipt ── */}
              <div className="bg-white border border-slate-200/80 rounded-3xl p-7 shadow-xl text-center">
                <div className="w-14 h-14 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center justify-center mx-auto mb-5 shadow-sm">
                  <CheckCircle className="w-8 h-8 text-emerald-600" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight mb-1.5">
                  Payment Confirmed. Call Booked.
                </h1>
                <p className="text-sm text-slate-500 mb-5">
                  Your Funding Strategy Audit is locked in. Our analyst will prepare your custom Funding Eligibility Report before the call.
                </p>
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/50 text-left space-y-2.5 mb-5">
                  <div className="flex justify-between items-center py-2 border-b border-slate-100 text-xs">
                    <span className="text-slate-500 font-semibold uppercase tracking-wider text-[10px]">Audit Status</span>
                    <span className="font-extrabold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">Secured & Confirmed</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100 text-xs">
                    <span className="text-slate-500 font-semibold uppercase tracking-wider text-[10px]">Pre-Call Analysis</span>
                    <span className="font-bold text-slate-900">Custom Funding Eligibility Report (In Progress)</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100 text-xs">
                    <span className="text-slate-500 font-semibold uppercase tracking-wider text-[10px]">Call Format</span>
                    <span className="font-bold text-indigo-600">30-min Google Meet · 1-on-1</span>
                  </div>
                  {email && (
                    <div className="flex justify-between items-center py-2 text-xs">
                      <span className="text-slate-500 font-semibold uppercase tracking-wider text-[10px]">Calendar Invite</span>
                      <span className="font-extrabold text-slate-900 truncate max-w-[180px]">{email}</span>
                    </div>
                  )}
                </div>
                <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-3.5 flex gap-3 text-left text-xs text-indigo-900 leading-relaxed">
                  <Mail className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Check your inbox.</strong> We sent your Calendly confirmation with the Google Meet link. Your analyst begins research immediately.</span>
                </div>
              </div>

              {/* ── Pre-Call Questionnaire ── */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <FileText className="w-5 h-5 text-indigo-600" />
                  <h2 className="text-base font-bold text-slate-900">3-Minute Pre-Call Questionnaire</h2>
                </div>
                <p className="text-xs text-slate-500 mb-5">
                  Help your analyst prepare a sharper report. Takes 60 seconds — answers go directly to your advisor before the call.
                </p>

                {qSubmitted ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3 text-sm text-emerald-800">
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span><strong>Got it!</strong> Your advisor will review these before your call.</span>
                  </div>
                ) : (
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      if (!qGoal || !qAge || !qExperience) {
                        setQError('Please answer all three questions.');
                        return;
                      }
                      setQSubmitting(true);
                      setQError('');
                      try {
                        await fetch('/api/audit/questionnaire', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            email,
                            orderId,
                            auditGoal: qGoal,
                            businessAge: qAge,
                            fundingExperience: qExperience,
                            token: tokenState,
                          }),
                        });
                        setQSubmitted(true);
                      } catch {
                        setQError('Could not save answers. Please email them to ashwani@fsidigital.ca');
                      } finally {
                        setQSubmitting(false);
                      }
                    }}
                    className="space-y-4"
                  >
                    {/* Q1 */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">
                        1. What is your primary funding goal?
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                          { val: 'sred', label: 'SR&ED / R&D' },
                          { val: 'hiring', label: 'Hiring Grants' },
                          { val: 'digital', label: 'Digital / Tech' },
                          { val: 'export', label: 'Export / Growth' },
                        ].map(opt => (
                          <button
                            key={opt.val}
                            type="button"
                            onClick={() => setQGoal(opt.val)}
                            className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-colors ${
                              qGoal === opt.val
                                ? 'bg-indigo-600 text-white border-indigo-600'
                                : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-300'
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Q2 */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">
                        2. How long has your business been operating?
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                          { val: 'under-1', label: 'Under 1 year' },
                          { val: '1-3', label: '1–3 years' },
                          { val: '3-7', label: '3–7 years' },
                          { val: '7-plus', label: '7+ years' },
                        ].map(opt => (
                          <button
                            key={opt.val}
                            type="button"
                            onClick={() => setQAge(opt.val)}
                            className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-colors ${
                              qAge === opt.val
                                ? 'bg-indigo-600 text-white border-indigo-600'
                                : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-300'
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Q3 */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">
                        3. Have you applied for government funding before?
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { val: 'never', label: 'Never' },
                          { val: 'yes-unsuccessful', label: 'Yes — no success' },
                          { val: 'yes-received', label: 'Yes — received funds' },
                        ].map(opt => (
                          <button
                            key={opt.val}
                            type="button"
                            onClick={() => setQExperience(opt.val)}
                            className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-colors ${
                              qExperience === opt.val
                                ? 'bg-indigo-600 text-white border-indigo-600'
                                : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-300'
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {qError && <p className="text-xs text-red-600">{qError}</p>}

                    <button
                      type="submit"
                      disabled={qSubmitting || !qGoal || !qAge || !qExperience}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold py-2.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
                    >
                      {qSubmitting ? 'Saving...' : 'Submit Answers →'}
                    </button>
                  </form>
                )}
              </div>

              {/* ── What Happens Next ── */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-indigo-600" />
                  What Happens Between Now and Your Call
                </h2>
                <ol className="space-y-3">
                  {[
                    { step: '1', label: 'Analyst Research (Right Now)', desc: 'Your advisor begins a 2-hour custom eligibility review of 1,200+ active programs against your business profile.' },
                    { step: '2', label: 'Report Delivered (24h Before Call)', desc: 'A custom Funding Eligibility Report PDF is sent to your inbox before the call so you can review it in advance.' },
                    { step: '3', label: '30-Min Strategy Call', desc: 'Walk through your top 3 matched programs, application sequence, and funding stacking strategy with your advisor.' },
                    { step: '4', label: 'Post-Call Summary', desc: 'A written roadmap of your recommended programs, timelines, and next steps — delivered within 24h of the call.' },
                  ].map(item => (
                    <li key={item.step} className="flex gap-3 text-sm">
                      <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">{item.step}</span>
                      <div>
                        <p className="font-bold text-slate-800">{item.label}</p>
                        <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* ── Level 5 Soft Mention ── */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-start gap-3 text-xs text-slate-600">
                <TrendingUp className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-800">If the audit finds strong opportunities:</strong> your $199 research deposit is credited 100% toward any full application and filing engagement. You'll hear more about this on the call.
                </span>
              </div>

              {/* ── Reschedule ── */}
              <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Need to reschedule? Email <a href="mailto:ashwani@fsidigital.ca" className="text-indigo-600 font-semibold hover:underline">ashwani@fsidigital.ca</a></span>
              </div>

            </div>
          ) : (
            /* STATE A: SLOT SCHEDULING VIEW (DEFAULT) */
            <>
              {/* Process Tracker */}
              <div className="max-w-3xl mx-auto mb-8 bg-white border border-slate-200/60 rounded-2xl p-4 shadow-sm">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-500">
                  <div className="flex items-center gap-2 text-indigo-600 bg-indigo-50 border border-indigo-200 px-3 py-1.5 rounded-full">
                    <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold">1</span>
                    <span>Intake Review</span>
                  </div>
                  <span className="hidden sm:block text-slate-300">➔</span>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px] font-bold">2</span>
                    <span>Eligibility Matching</span>
                  </div>
                  <span className="hidden sm:block text-slate-300">➔</span>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px] font-bold">3</span>
                    <span>Analyst Assignment</span>
                  </div>
                  <span className="hidden sm:block text-slate-300">➔</span>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px] font-bold">4</span>
                    <span>Deposit Confirmation</span>
                  </div>
                  <span className="hidden sm:block text-slate-300">➔</span>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px] font-bold">5</span>
                    <span>Funding Audit</span>
                  </div>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-semibold uppercase tracking-wider mb-6">
                <Calendar className="w-3.5 h-3.5" />
                Step 1: Choose Your Audit Time Slot
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight mb-4">
                Schedule Your Funding Audit
              </h1>
              
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
                Select a date and time for your Google Meet audit below. Your slot will be provisionally held for 24 hours while you complete your pre-call research deposit.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-10 text-left">
                <div className="bg-white border border-slate-200/80 rounded-xl p-4 flex items-center gap-3 shadow-sm">
                  <Clock className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Duration</div>
                    <div className="text-xs font-bold text-slate-950">30 Minutes</div>
                  </div>
                </div>
                <div className="bg-white border border-slate-200/80 rounded-xl p-4 flex items-center gap-3 shadow-sm">
                  <Calendar className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Platform</div>
                    <div className="text-xs font-bold text-slate-950">Google Meet</div>
                  </div>
                </div>
                <div className="col-span-2 md:col-span-1 bg-white border border-slate-200/80 rounded-xl p-4 flex items-center gap-3 shadow-sm">
                  <ShieldCheck className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Research Deposit</div>
                    <div className="text-xs font-bold text-slate-950">100% Credited</div>
                  </div>
                </div>
              </div>

              {/* Embedded Calendly Scheduling Widget */}
              <div className="relative bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl p-2 md:p-4 min-h-[700px] mb-10">
                {loading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10">
                    <div className="w-12 h-12 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin mb-4" />
                    <p className="text-sm text-slate-500 animate-pulse">Initializing scheduling dashboard...</p>
                  </div>
                )}

                <iframe 
                  src={calendlyUrl}
                  width="100%" 
                  height="700px" 
                  frameBorder="0"
                  className="rounded-2xl bg-white"
                  onLoad={() => setLoading(false)}
                  onError={() => setLoading(false)}
                />

                {/* Fallback CTA if Calendly fails to load */}
                {!loading && (
                  <noscript>
                    <div style={{ padding: '2rem', textAlign: 'center', background: '#f8fafc', borderRadius: '1rem', margin: '1rem' }}>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0f172a', marginBottom: '0.5rem' }}>Booking Widget Unavailable</h3>
                      <p style={{ color: '#64748b', marginBottom: '1rem' }}>Please contact us directly to schedule your strategy session.</p>
                      <a href="mailto:ashwani@fsidigital.ca?subject=Strategy%20Session%20Booking%20Request" style={{ display: 'inline-block', padding: '0.75rem 1.5rem', background: '#4f46e5', color: 'white', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: 600 }}>
                        Email: ashwani@fsidigital.ca
                      </a>
                    </div>
                  </noscript>
                )}
              </div>

              <div className="flex gap-2 text-xs text-slate-500 max-w-lg mx-auto leading-relaxed border-t border-slate-200/60 pt-6 justify-center">
                <AlertCircle className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                <span className="text-left">
                  Note: Each audit requires approximately 2 hours of dedicated analyst research. All business information is handled confidentially and used solely for funding eligibility analysis.
                </span>
              </div>
            </>
          )}

        </div>
      </div>
      <Footer />
    </>
  );
}
