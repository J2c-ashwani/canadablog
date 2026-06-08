'use client';

import { useState, useEffect } from 'react';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CheckCircle, Clock, ShieldCheck, Mail, Calendar, AlertCircle } from 'lucide-react';
import { trackGAEvent } from '@/components/LeadConversionUpsellWatcher';

export default function BookingClient() {
  const [loading, setLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [rid, setRid] = useState('');
  const [source, setSource] = useState('');
  const [mounted, setMounted] = useState(false);
  const [calendlyUrl, setCalendlyUrl] = useState('');

  const CALENDLY_PATH = "ashwani-fsidigital/1-on-1-funding-consultation";

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Parse query params safely on client
    const searchParams = new URLSearchParams(window.location.search);
    const success = searchParams.get('success') === 'true';
    setIsSuccess(success);
    const parsedEmail = searchParams.get('email') || '';
    const parsedName = searchParams.get('name') || '';
    const parsedRid = searchParams.get('rid') || '';
    const parsedSource = searchParams.get('source') || '';
    setEmail(parsedEmail);
    setName(parsedName);
    setSource(parsedSource);

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

    // Build the final Calendly URL exactly once on mount to prevent iframe reload loops
    const host = window.location.host;
    let url = `https://calendly.com/${CALENDLY_PATH}?hide_landing_page_details=1&hide_gdpr_banner=1&background_color=ffffff&text_color=0f172a&primary_color=4f46e5&embed_domain=${encodeURIComponent(host)}&embed_type=Inline`;
    if (parsedEmail) {
      url += `&email=${encodeURIComponent(parsedEmail)}&prefill[email]=${encodeURIComponent(parsedEmail)}`;
    }
    if (parsedName) {
      url += `&name=${encodeURIComponent(parsedName)}&prefill[name]=${encodeURIComponent(parsedName)}`;
    }
    setCalendlyUrl(url);
    setMounted(true);

    // Track Purchase if we redirected here successfully after checkout
    if (success) {
      const orderId = searchParams.get('order') || '';
      const tier = searchParams.get('tier') || '';
      const priceStr = searchParams.get('price') || '';
      const price = Number(priceStr) || 199.00;

      if (orderId) {
        const storageKey = `purchase_tracked_${orderId}`;
        if (!window.sessionStorage.getItem(storageKey)) {
          trackGAEvent('purchase', {
            transaction_id: orderId,
            value: price,
            currency: 'USD',
            items: [
              {
                item_id: tier || 'audit',
                item_name: tier === 'vip' ? 'VIP Funding Blueprint & Strategy Session' : 'Funding Eligibility Audit & Roadmap',
                price: price,
                quantity: 1,
              }
            ],
            // Stitch UTM parameters if available in sessionStorage
            utm_source: window.sessionStorage.getItem('fsi:utm_source') || 'N/A',
            utm_medium: window.sessionStorage.getItem('fsi:utm_medium') || 'N/A',
            utm_campaign: window.sessionStorage.getItem('fsi:utm_campaign') || 'N/A',
          });
          window.sessionStorage.setItem(storageKey, 'true');
        }
      }
    }

    // Simulate loading state for Calendly iframe
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Listen to Calendly postMessage event
  useEffect(() => {
    if (isSuccess) return;

    const handleMessage = (e: MessageEvent) => {
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
          const payload = data.payload || {};
          const inviteeEmail = payload.invitee?.email || email;
          const inviteeName = payload.invitee?.name || name;
          const eventUri = payload.event?.uri || '';
          const inviteeUri = payload.invitee?.uri || '';
          const bookedAt = Date.now();

          console.log('[Calendly SDK] Redirecting to checkout with:', {
            inviteeEmail,
            inviteeName,
            eventUri,
            inviteeUri,
            bookedAt
          });

          // Track booking_complete immediately
          trackGAEvent('booking_complete', {
            recovery_id: rid,
            source: source,
            utm_source: window.sessionStorage.getItem('fsi:utm_source') || 'N/A',
            utm_medium: window.sessionStorage.getItem('fsi:utm_medium') || 'N/A',
            utm_campaign: window.sessionStorage.getItem('fsi:utm_campaign') || 'N/A',
          });

          // Redirect to checkout with slot details
          const checkoutUrl = `/consultation?email=${encodeURIComponent(inviteeEmail)}&name=${encodeURIComponent(inviteeName)}&rid=${encodeURIComponent(rid)}&source=${encodeURIComponent(source)}&scheduled=true&event_uri=${encodeURIComponent(eventUri)}&invitee_uri=${encodeURIComponent(inviteeUri)}&booked_at=${bookedAt}`;
          window.location.href = checkoutUrl;
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [isSuccess, email, name, rid, source]);


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
            /* STATE B: PAYMENT & BOOKING CONFIRMED SUCCESS VIEW */
            <div className="max-w-xl mx-auto bg-white border border-slate-200/80 rounded-3xl p-8 shadow-xl text-center">
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center justify-center mx-auto mb-6 shadow-sm">
                <CheckCircle className="w-9 h-9 text-emerald-600 animate-pulse" />
              </div>

              <h1 className="text-3xl font-black text-slate-950 tracking-tight mb-2">
                Eligibility Audit Confirmed!
              </h1>
              
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Thank you! Your research deposit is complete and your 30-minute private Google Meet consultation has been officially scheduled.
              </p>

              {/* Receipt / Process Details card */}
              <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200/50 text-left mb-6 space-y-3">
                <div className="flex justify-between items-center py-2.5 border-b border-slate-200/60 text-xs">
                  <span className="text-slate-500 font-semibold uppercase tracking-wider text-[10px]">Audit Status</span>
                  <span className="font-extrabold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">Secured & Confirmed</span>
                </div>
                <div className="flex justify-between items-center py-2.5 border-b border-slate-200/60 text-xs">
                  <span className="text-slate-500 font-semibold uppercase tracking-wider text-[10px]">Pre-Call Analysis</span>
                  <span className="font-bold text-slate-900">2 Hours Custom Audit (In Progress)</span>
                </div>
                <div className="flex justify-between items-center py-2.5 border-b border-slate-200/60 text-xs">
                  <span className="text-slate-500 font-semibold uppercase tracking-wider text-[10px]">Deliverable</span>
                  <span className="font-bold text-indigo-600">Roadmap PDF Included</span>
                </div>
                {email && (
                  <div className="flex justify-between items-center py-2.5 text-xs">
                    <span className="text-slate-500 font-semibold uppercase tracking-wider text-[10px]">Calendar Invite Sent To</span>
                    <span className="font-extrabold text-slate-900 truncate max-w-[180px]">{email}</span>
                  </div>
                )}
              </div>

              <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-4 flex gap-3 text-left text-xs text-indigo-950 leading-relaxed mb-6">
                <Mail className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>What's next?</strong> We sent a calendar invitation containing the Google Meet link directly to your inbox. Our analyst is already compiling your eligibility datasets.
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-slate-500 border-t border-slate-100 pt-6">
                <ShieldCheck className="w-4 h-4 text-slate-400" />
                <span>
                  Need to reschedule? Email support at{' '}
                  <a href="mailto:ashwani@fsidigital.ca" className="text-indigo-600 font-semibold hover:underline">
                    ashwani@fsidigital.ca
                  </a>
                </span>
              </div>
            </div>
          ) : (
            /* STATE A: SLOT SCHEDULING VIEW (DEFAULT) */
            <>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-semibold uppercase tracking-wider mb-6">
                <Calendar className="w-3.5 h-3.5" />
                Step 1: Choose Your Audit Time Slot
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight mb-4">
                Schedule Your Funding Audit
              </h1>
              
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
                Select a date and time for your Google Meet audit below. Your slot will be provisionally held for <span className="line-through text-slate-400 mr-1.5">10 minutes</span> 24 hours while you complete your pre-call research deposit.
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

                {mounted && calendlyUrl ? (
                  <iframe 
                    src={calendlyUrl}
                    width="100%" 
                    height="700px" 
                    frameBorder="0"
                    className="rounded-2xl bg-white"
                  />
                ) : (
                  <div className="w-full h-[700px] bg-white rounded-2xl" />
                )}
              </div>

              <div className="flex gap-2 text-xs text-slate-500 max-w-lg mx-auto leading-relaxed border-t border-slate-200/60 pt-6 justify-center">
                <AlertCircle className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                <span className="text-left">
                  Note: Each audit requires approximately 2 hours of dedicated analyst research. We limit intake weekly to maintain research quality.
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
