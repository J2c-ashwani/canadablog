'use client';

import React, { useState, useEffect } from 'react';
import { Loader2, ShieldCheck, CreditCard, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createServerPayPalProductOrder, finalizeServerPayPalProductOrder } from '@/lib/payments/product-checkout-client';

interface StandaloneCheckoutProps {
  productId: 'funding-roadmap' | 'funding-toolkit' | 'funding-approval-library' | 'funding-match-report';
  price: number;
  productName: string;
}

export function StandaloneCheckout({ productId, price, productName }: StandaloneCheckoutProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [sdkReady, setSdkReady] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [checkoutStarted, setCheckoutStarted] = useState(false);
  
  // Order bump state
  const [bumpChecked, setBumpChecked] = useState(false);

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
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    
    // Guess country based on timezone
    let country = "Unknown";
    if (timezone.startsWith("America/")) {
      if (timezone.includes("Toronto") || timezone.includes("Vancouver") || timezone.includes("Edmonton") || timezone.includes("Winnipeg") || timezone.includes("Halifax")) {
        country = "CA";
      } else {
        country = "US";
      }
    } else if (timezone === "Asia/Singapore") {
      country = "SG";
    }
    
    return {
      browser,
      os,
      device,
      viewport: `${width}x${height}`,
      country
    };
  };

  // Multi-Touch channel attribution state
  const [attributionData, setAttributionData] = useState({
    landingPage: '',
    referrer: '',
    utmSource: '',
    utmMedium: '',
    utmCampaign: '',
    lastTouchPage: '',
    lastTouchReferrer: '',
    device: '',
    browser: '',
    country: ''
  });

  // Extract multi-touch parameters on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const firstTouchUrl = localStorage.getItem('fsi_first_touch_url') || window.location.pathname;
    const firstTouchReferrer = localStorage.getItem('fsi_first_touch_referrer') || document.referrer || 'direct';
    const firstTouchUtmSource = localStorage.getItem('fsi_first_touch_utm_source') || '';
    const firstTouchUtmMedium = localStorage.getItem('fsi_first_touch_utm_medium') || '';
    const firstTouchUtmCampaign = localStorage.getItem('fsi_first_touch_utm_campaign') || '';

    const deviceMeta = getDeviceMetadata();

    setAttributionData({
      landingPage: firstTouchUrl,
      referrer: firstTouchReferrer,
      utmSource: firstTouchUtmSource,
      utmMedium: firstTouchUtmMedium,
      utmCampaign: firstTouchUtmCampaign,
      lastTouchPage: window.location.pathname,
      lastTouchReferrer: document.referrer || 'direct',
      device: deviceMeta.device || 'Desktop',
      browser: deviceMeta.browser || 'Other',
      country: deviceMeta.country || 'Unknown'
    });
  }, []);

  // Compute final checkout values dynamically based on order bump selections
  let finalProductId: string = productId;
  let finalPrice: number = price;
  let finalProductName: string = productName;
  let addons: { toolkit?: boolean; approvalLibrary?: boolean } | undefined = undefined;

  if (productId === 'funding-toolkit' && bumpChecked) {
    finalPrice = price + 9;
    finalProductName = `${productName} + Approval Library`;
    addons = { approvalLibrary: true };
  } else if (productId === 'funding-approval-library' && bumpChecked) {
    finalPrice = price + 29;
    finalProductName = `${productName} + Application Toolkit`;
    addons = { toolkit: true };
  } else if (productId === 'funding-roadmap' && bumpChecked) {
    finalProductId = 'funding-bundle';
    finalPrice = 79;
    finalProductName = 'Complete Funding Bundle';
  }

  // Load personalized outcomes & prefill
  const [personalizedMatches, setPersonalizedMatches] = useState<string | null>(null);
  const [personalizedEstimate, setPersonalizedEstimate] = useState<string | null>(null);
  const [personalizedIndustry, setPersonalizedIndustry] = useState<string | null>(null);
  const [personalizedRegion, setPersonalizedRegion] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const sp = new URLSearchParams(window.location.search);
    
    let emailVal = sp.get('email') || '';
    let nameVal = sp.get('name') || '';
    
    // Fallback to localStorage if active within 24h
    const savedAt = localStorage.getItem('fsi:lead_saved_at');
    const isExpired = savedAt ? (Date.now() - Number(savedAt) > 24 * 60 * 60 * 1000) : false;
    
    if (!isExpired) {
      if (!emailVal) emailVal = localStorage.getItem('fsi:lead_email') || '';
      if (!nameVal) nameVal = localStorage.getItem('fsi:lead_name') || '';
    }
    
    if (emailVal) setEmail(emailVal);
    if (nameVal) setName(nameVal);

    // Parse outcomes
    const m = sp.get('matches') || (!isExpired ? localStorage.getItem('fsi:lead_matches') : null);
    const est = sp.get('estimate') || (!isExpired ? localStorage.getItem('fsi:lead_estimate') : null);
    const ind = sp.get('industry') || (!isExpired ? localStorage.getItem('fsi:lead_industry') : null);
    const reg = sp.get('region') || (!isExpired ? localStorage.getItem('fsi:lead_region') : null);

    if (m) setPersonalizedMatches(m);
    if (est) setPersonalizedEstimate(est);
    if (ind) setPersonalizedIndustry(ind);
    if (reg) setPersonalizedRegion(reg);
  }, []);

  // Email validation
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Valid if empty (meaning we fall back to PayPal profile details) or matches pattern
    setIsEmailValid(email.trim() === '' || emailRegex.test(email.trim()));
  }, [email]);

  const paypalClientId = process.env.NEXT_PUBLIC_CONSULTATION_PAYPAL_CLIENT_ID
    || process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
    || "ATiNArUnyarxHv-FRUJ7pVi14uHjafO8fEGrRVGBSUBRIrS-Rpx-w8LNEcHyGsF5sExfJjT03aYo_0xq";

  // Load PayPal SDK on mount
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

  // Render/Re-render PayPal buttons dynamically based on name, email, price, product, and bump updates
  useEffect(() => {
    if (!sdkReady || !(window as any).paypal) return;

    const container = document.getElementById("standalone-paypal-button");
    if (!container) return;
    
    container.innerHTML = "";

    if (typeof (window as any).paypal.Buttons !== 'function') {
      setPaymentError("Could not load secure checkout. Please refresh.");
      return;
    }

    try {
      (window as any).paypal.Buttons({
        style: {
          layout: 'vertical',
          color: 'gold',
          shape: 'rect',
          label: 'pay',
          height: 44
        },
        createOrder: async () => {
          setPaymentError(null);
          setCheckoutStarted(true);
          
          // Track event
          if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'begin_checkout', {
              value: finalPrice,
              currency: 'USD',
              items: [{ item_name: finalProductName, price: finalPrice }]
            });
          }

          // Telemetry
          fetch("/api/subscriber/track-activity", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: email.trim(),
              event: "standalone_checkout_started",
              productId: finalProductId,
              priceShown: finalPrice.toString()
            })
          }).catch(e => console.error(e));

          return createServerPayPalProductOrder({
            productId: finalProductId,
            email: email.trim(),
            name: name.trim() || 'Premium Member',
            addons,
            profileData: {
              province: personalizedRegion || (typeof window !== 'undefined' ? (localStorage.getItem('fsi:lead_region') || '') : ''),
              industry: personalizedIndustry || (typeof window !== 'undefined' ? (localStorage.getItem('fsi:lead_industry') || '') : ''),
              revenue: '', goal: '',
            },
            sessionId: typeof window !== 'undefined' ? (sessionStorage.getItem('fsi_session_id') || 'sess_anonymous') : 'sess_anonymous',
            attribution: attributionData,
          });
        },
        onApprove: async (data: any) => {
          try {
            setIsProcessing(true);
            const json = await finalizeServerPayPalProductOrder(data.orderID || '');
            if (json.deliveryUrl) {
              // Redirect to delivery page
              window.location.href = json.deliveryUrl;
            } else {
              throw new Error('Payment verification did not return a delivery link.');
            }
          } catch (err: any) {
            console.error("Capture error:", err);
            setPaymentError(err.message || "Payment was captured but product activation failed. Contact hello@fsidigital.ca.");
            setIsProcessing(false);
          }
        },
        onError: (err: any) => {
          console.error("PayPal error:", err);
          setPaymentError("Payment failed. Please try again.");
          setCheckoutStarted(false);
        }
      }).render('#standalone-paypal-button');
    } catch (err) {
      console.error("PayPal render error:", err);
    }
  }, [sdkReady, isEmailValid, name, email, finalProductId, finalPrice, finalProductName, addons, attributionData]);

  return (
    <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-6 sm:p-8 max-w-md mx-auto text-left relative overflow-hidden backdrop-blur-md shadow-xl shadow-slate-950/20 font-sans">
      <div className="absolute top-0 right-0 bg-indigo-650 text-white text-[9px] font-bold px-3.5 py-1 uppercase tracking-wider rounded-bl-lg">
        Secure Checkout
      </div>

      <div className="space-y-5">
        {/* Step 1: Personalized Outcome Block (Highly dynamic based on assessment results) */}
        {personalizedMatches || personalizedEstimate ? (
          <div className="bg-slate-900/60 border border-slate-700/50 rounded-xl p-4 space-y-2.5">
            <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">Personalized Match Outcome</span>
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <span className="text-[9px] text-slate-400 block uppercase font-bold tracking-wider">Estimated Limit</span>
                <span className="text-sm font-black text-emerald-400">{personalizedEstimate || '$100,000+'}</span>
              </div>
              <div>
                <span className="text-[9px] text-slate-400 block uppercase font-bold tracking-wider">Matched Programs</span>
                <span className="text-sm font-black text-indigo-300">{personalizedMatches || '11'} Active Programs</span>
              </div>
            </div>
            {personalizedIndustry && (
              <div className="text-[10.5px] text-slate-350 border-t border-slate-750 pt-2 flex items-center justify-between">
                <span>Segment: <span className="font-semibold text-slate-200">{personalizedIndustry}</span></span>
                <span>Region: <span className="font-semibold text-slate-200">{personalizedRegion ? personalizedRegion.toUpperCase() : 'CA'}</span></span>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-slate-900/60 border border-slate-700/50 rounded-xl p-4 space-y-2">
            <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">Product Outcome Summary</span>
            <div className="space-y-1.5 pt-1 text-[10.5px] text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-450 shrink-0" />
                <span>Eligibility diagnostic profile mapping</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-450 shrink-0" />
                <span>Full step-by-step strategic roadmap</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Product Name & Description */}
        <div className="border-b border-slate-700/40 pb-4">
          <h3 className="font-bold text-sm text-slate-100 mt-1">{finalProductName}</h3>
          <p className="text-[11px] text-slate-450 mt-1 leading-relaxed">
            {productId === 'funding-toolkit' && 'Full digital package of 6 pre-formatted Excel grant budgets, cash flow models, hiring wage subsidy planners, and pre-submission audit checklists.'}
            {productId === 'funding-approval-library' && 'Curated directory of successfully funded project proposal narratives, CRA SR&ED technical descriptions, and regional ITA checklist criteria.'}
            {productId === 'funding-roadmap' && 'Step-by-step strategic funding timeline matching your business profile to active Canadian/US grants and tax credits.'}
          </p>
        </div>

        {/* Step 3: Secure Delivery Inputs */}
        <div className="space-y-3.5 pt-1">
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-indigo-400">Secure Delivery Setup</h4>
            <p className="text-[10.5px] text-slate-400 mt-1 leading-normal">
              Enter your details below (or we will use your PayPal profile details automatically).
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-450 tracking-wider mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                disabled={isProcessing || checkoutStarted}
                placeholder="e.g. Sarah Jenkins"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-11 bg-slate-900 border border-slate-700 rounded-lg px-3.5 text-slate-100 text-sm font-semibold focus:outline-none focus:border-indigo-500 transition-colors disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-450 tracking-wider mb-1.5">
                Business Email Address
              </label>
              <input
                type="email"
                disabled={isProcessing || checkoutStarted}
                placeholder="e.g. sarah@company.ca"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 bg-slate-900 border border-slate-700 rounded-lg px-3.5 text-slate-100 text-sm font-semibold focus:outline-none focus:border-indigo-500 transition-colors disabled:opacity-50"
              />
              {email.trim().length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) && (
                <span className="text-[10px] text-red-400 mt-1.5 block">
                  Please enter a valid email format.
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ═══════ STANDALONE ONE-CLICK ORDER BUMPS ═══════ */}
        {!checkoutStarted && !isProcessing && (
          <>
            {productId === 'funding-toolkit' && (
              <div 
                className={`border rounded-xl p-4 flex items-start gap-3 hover:border-indigo-500/50 transition-colors cursor-pointer select-none ${
                  bumpChecked ? 'bg-indigo-950/20 border-indigo-500/40' : 'bg-slate-900 border-slate-750'
                }`}
                onClick={() => setBumpChecked(!bumpChecked)}
              >
                <input
                  type="checkbox"
                  checked={bumpChecked}
                  readOnly
                  className="w-4.5 h-4.5 rounded border-slate-700 text-indigo-650 focus:ring-indigo-500 mt-1 cursor-pointer shrink-0"
                />
                <div className="space-y-0.5">
                  <span className="bg-indigo-500/20 text-indigo-300 text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded border border-indigo-500/10">Special Offer Add-on</span>
                  <h4 className="text-xs font-bold text-slate-200 mt-2">Add Funding Approval Library (+$9)</h4>
                  <p className="text-[10px] text-slate-400 leading-normal mt-0.5">
                    Read the exact approved project texts &amp; budgets FSI Digital reviews. (Normally $9 separately).
                  </p>
                </div>
              </div>
            )}

            {productId === 'funding-approval-library' && (
              <div 
                className={`border rounded-xl p-4 flex items-start gap-3 hover:border-indigo-500/50 transition-colors cursor-pointer select-none ${
                  bumpChecked ? 'bg-indigo-950/20 border-indigo-500/40' : 'bg-slate-900 border-slate-750'
                }`}
                onClick={() => setBumpChecked(!bumpChecked)}
              >
                <input
                  type="checkbox"
                  checked={bumpChecked}
                  readOnly
                  className="w-4.5 h-4.5 rounded border-slate-700 text-indigo-650 focus:ring-indigo-500 mt-1 cursor-pointer shrink-0"
                />
                <div className="space-y-0.5">
                  <span className="bg-indigo-500/20 text-indigo-300 text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded border border-indigo-500/10">Special Offer Add-on</span>
                  <h4 className="text-xs font-bold text-slate-200 mt-2">Add Application Toolkit (+$29)</h4>
                  <p className="text-[10px] text-slate-400 leading-normal mt-0.5">
                    Get all 6 premium Excel budgets and wage planners to save 40+ hours. (Normally $29 separately).
                  </p>
                </div>
              </div>
            )}

            {productId === 'funding-roadmap' && (
              <div 
                className={`border rounded-xl p-4 flex items-start gap-3 hover:border-emerald-500/50 transition-colors cursor-pointer select-none ${
                  bumpChecked ? 'bg-emerald-950/10 border-emerald-500/40' : 'bg-slate-900 border-slate-750'
                }`}
                onClick={() => setBumpChecked(!bumpChecked)}
              >
                <input
                  type="checkbox"
                  checked={bumpChecked}
                  readOnly
                  className="w-4.5 h-4.5 rounded border-slate-700 text-emerald-650 focus:ring-emerald-500 mt-1 cursor-pointer shrink-0"
                />
                <div className="space-y-0.5">
                  <span className="bg-emerald-500/20 text-emerald-300 text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded border border-emerald-500/10">Upgrade Deal</span>
                  <h4 className="text-xs font-bold text-slate-200 mt-2">Upgrade to Complete Funding Bundle (+$30)</h4>
                  <p className="text-[10px] text-slate-400 leading-normal mt-0.5">
                    Unlocks both: custom report + action plan roadmap. Save $10 on the total stack.
                  </p>
                </div>
              </div>
            )}
          </>
        )}

        {/* Errors */}
        {paymentError && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-300 text-xs p-3 rounded-lg flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
            <span>{paymentError}</span>
          </div>
        )}

        {/* Checkout Buttons Container */}
        <div className="border-t border-slate-700/60 pt-5 space-y-4">
          <div className="flex justify-between items-baseline">
            <span className="text-xs font-bold text-slate-455">Total Price:</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-slate-100">${finalPrice}</span>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">USD</span>
            </div>
          </div>

          {isProcessing ? (
            <div className="flex flex-col items-center justify-center py-6 gap-2 text-xs font-semibold text-slate-400">
              <Loader2 className="w-6 h-6 animate-spin text-emerald-500" />
              <span>Verifying and capturing payment...</span>
            </div>
          ) : !sdkReady ? (
            <div className="flex items-center justify-center py-4 gap-2 text-xs text-slate-400">
              <Loader2 className="w-4 h-4 animate-spin text-indigo-400" /> Loading secure gateway...
            </div>
          ) : (
            <div className="space-y-3.5 animate-in fade-in duration-200">
              <div id="standalone-paypal-button" className="w-full"></div>
            </div>
          )}
        </div>

        {/* Trust Badges moved below the fold */}
        <div className="border-t border-slate-700/40 pt-4 space-y-4">
          {/* Trust 1: Expert Reviewed & Accredited */}
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-450" />
            </div>
            <div>
              <h4 className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Expert Reviewed & Accredited</h4>
              <p className="text-[10.5px] text-slate-450 mt-0.5 leading-relaxed">
                Compiled by FSI Digital Specialists. Reviewed by <span className="font-bold text-slate-200">Ashwani K</span>.
              </p>
            </div>
          </div>

          {/* Trust 2: Satisfaction Guarantee */}
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-450" />
            </div>
            <div>
              <h4 className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">30-Day Satisfaction Guarantee</h4>
              <p className="text-[10.5px] text-slate-455 mt-0.5 leading-relaxed">
                If this templates/reports pack does not fit your business scenario, email hello@fsidigital.ca within 30 days for adjustment.
              </p>
            </div>
          </div>

          {/* Trust 3: Upgrade Credit Guarantee */}
          <div className="flex items-start gap-3 bg-emerald-900/10 border border-emerald-700/20 rounded-xl p-3.5">
            <div className="w-7 h-7 rounded-full bg-emerald-900/30 border border-emerald-700/30 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-emerald-400 text-xs">↑</span>
            </div>
            <div>
              <h4 className="text-[9px] font-bold text-emerald-300 uppercase tracking-wider">Upgrade Credit Guarantee</h4>
              <p className="text-[10px] text-emerald-200/70 mt-0.5 leading-relaxed">
                Every dollar spent today is credited toward higher-tier services. You&apos;ll never pay twice.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-850 pt-3 flex flex-col items-center gap-2">
          <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>100% Secure &amp; Protected Payments</span>
          </div>
          {/* Payment Method Badges */}
          <div className="flex items-center justify-center gap-2 opacity-65 hover:opacity-85 transition-opacity mt-0.5">
            {/* Visa SVG */}
            <svg className="h-3 w-auto fill-current text-slate-500" viewBox="0 0 24 8" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0h24v8H0z" fill="none"/>
              <path d="M3.2 8h1.6L5.8 2H4.2L3.2 8zm5.2-5.7c-.3-.1-.8-.2-1.4-.2-1.5 0-2.6.8-2.6 2 0 .9.8 1.3 1.4 1.6.6.3.8.5.8.7 0 .4-.5.6-.9.6-.6 0-1-.1-1.5-.3l-.2-.1-.2 1.4c.4.2.9.3 1.5.3 1.6 0 2.7-.8 2.7-2 0-.8-.5-1.3-1.5-1.8-.6-.3-1-.5-1-.8 0-.3.3-.6 1-.6.6 0 1 .1 1.3.2l.1.1.2-1.4zm3.5-.3H10.7c-.4 0-.7.1-.8.5L7.5 8h1.7s.3-.8.3-1h1.9c0 .2.2 1 .2 1h1.5L11.9 2zm-1.8 3.6c.1-.3.6-1.5.6-1.5s.1.3.2.6l.4 1h-1.2zM2.8 2H0l2.4 5.6c.1.3.4.4.7.4h1.7L2.8 2z" fill="#94a3b8"/>
            </svg>
            {/* MasterCard Text/Logo representation */}
            <span className="text-[7.5px] font-black border border-slate-700/60 text-slate-500 rounded px-1 tracking-tighter leading-none shrink-0">MC</span>
            {/* Amex */}
            <span className="text-[7.5px] font-black border border-slate-700/60 text-slate-500 rounded px-1 tracking-tighter leading-none shrink-0">AMEX</span>
            {/* Apple Pay */}
            <span className="text-[7.5px] font-black border border-slate-700/60 text-slate-500 rounded px-1 tracking-tighter leading-none shrink-0"> PAY</span>
            {/* PayPal */}
            <span className="text-[7.5px] font-black border border-slate-700/60 text-slate-500 rounded px-1 tracking-tighter leading-none shrink-0">PAYPAL</span>
          </div>
        </div>
      </div>
    </div>
  );
}
