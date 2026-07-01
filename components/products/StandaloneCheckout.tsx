'use client';

import React, { useState, useEffect } from 'react';
import { Loader2, ShieldCheck, CreditCard, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StandaloneCheckoutProps {
  productId: 'funding-roadmap' | 'funding-toolkit' | 'funding-approval-library';
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

  // UTM channel attribution state
  const [trackingData, setTrackingData] = useState({
    landingPage: '',
    referrer: '',
    utmSource: '',
    utmMedium: '',
    utmCampaign: ''
  });

  // Extract UTMs on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    setTrackingData({
      landingPage: window.location.pathname,
      referrer: document.referrer || '',
      utmSource: params.get('utm_source') || params.get('utmSource') || '',
      utmMedium: params.get('utm_medium') || params.get('utmMedium') || '',
      utmCampaign: params.get('utm_campaign') || params.get('utmCampaign') || ''
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

  // Email validation
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(email.trim()) && name.trim().length >= 2);
  }, [email, name]);

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
    if (!sdkReady || !(window as any).paypal || !isEmailValid) return;

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
        createOrder: (_data: any, actions: any) => {
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

          return actions.order.create({
            purchase_units: [{
              amount: { value: finalPrice.toFixed(2), currency_code: 'USD' },
              description: `${finalProductName} - FSI Digital`
            }]
          });
        },
        onApprove: async (_data: any, actions: any) => {
          try {
            setIsProcessing(true);
            const details = await actions.order.capture();
            const orderId = details?.id || '';

            // Record purchase
            const res = await fetch('/api/products/purchase', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                productId: finalProductId,
                email: email.trim(),
                name: name.trim(),
                paypalOrderId: orderId,
                addons,
                profileData: {
                  province: "",
                  industry: "",
                  revenue: "",
                  goal: ""
                },
                sessionId: typeof window !== 'undefined' ? (sessionStorage.getItem('fsi_session_id') || 'sess_anonymous') : 'sess_anonymous',
                attribution: {
                  landingPage: trackingData.landingPage,
                  referrer: trackingData.referrer,
                  utmSource: trackingData.utmSource,
                  utmMedium: trackingData.utmMedium,
                  utmCampaign: trackingData.utmCampaign
                }
              })
            });

            const json = await res.json();
            if (res.ok && json.success && json.deliveryUrl) {
              // Redirect to delivery page
              window.location.href = json.deliveryUrl;
            } else {
              throw new Error(json.error || 'Failed to record purchase');
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
  }, [sdkReady, isEmailValid, name, email, finalProductId, finalPrice, finalProductName, addons, trackingData]);

  return (
    <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-6 sm:p-8 max-w-md mx-auto text-left relative overflow-hidden backdrop-blur-md shadow-xl shadow-slate-950/20">
      <div className="absolute top-0 right-0 bg-indigo-650 text-white text-[9px] font-bold px-3.5 py-1 uppercase tracking-wider rounded-bl-lg">
        Secure Checkout
      </div>

      <div className="space-y-5">
        <div>
          <h3 className="font-bold text-xs uppercase tracking-wider text-indigo-400">Secure Download Link Setup</h3>
          <p className="text-[11px] text-slate-400 mt-1 leading-normal">
            Enter your email and name. We will send your temporary product activation link and receipt to this inbox.
          </p>
        </div>

        {/* Inputs */}
        <div className="space-y-3.5 border-b border-slate-700/40 pb-4">
          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1.5">
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
            <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1.5">
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

        {/* Checkout Container */}
        <div className="border-t border-slate-700/60 pt-5 space-y-4">
          <div className="flex justify-between items-baseline">
            <span className="text-xs font-bold text-slate-455">Total Price:</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-slate-100">${finalPrice}</span>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">CAD / USD equivalent</span>
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
          ) : !isEmailValid ? (
            <div className="text-center p-5 bg-slate-900/40 border border-slate-800 border-dashed rounded-xl text-[11px] font-semibold text-slate-500">
              Please enter your name and valid email above to activate checkout.
            </div>
          ) : (
            <div className="space-y-3.5 animate-in fade-in duration-200">
              <div id="standalone-paypal-button" className="w-full"></div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500 font-semibold border-t border-slate-850 pt-3">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
          <span>100% Secure &amp; Protected Payments</span>
        </div>
      </div>
    </div>
  );
}
