'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Lock } from 'lucide-react';

const PAYPAL_MEMBERSHIP_NAMESPACE = 'paypalMembershipCheckout';

export function FoundingMemberCheckout() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [checkoutReady, setCheckoutReady] = useState(false);
  const [sdkReady, setSdkReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '';
  const planId = process.env.NEXT_PUBLIC_PAYPAL_PLAN_ID || '';
  const containerId = useMemo(() => `membership-paypal-${Math.random().toString(36).slice(2)}`, []);

  useEffect(() => {
    if (!checkoutReady || !paypalClientId || !planId) return;
    if ((window as any)[PAYPAL_MEMBERSHIP_NAMESPACE]?.Buttons) {
      setSdkReady(true);
      return;
    }
    const markReady = () => {
      if ((window as any)[PAYPAL_MEMBERSHIP_NAMESPACE]?.Buttons) setSdkReady(true);
      else setError('PayPal subscription checkout could not initialize. Please refresh the page.');
    };
    const markFailed = () => setError('PayPal checkout could not load. Please try again.');
    const existing = document.querySelector<HTMLScriptElement>('script[data-fsi-membership-paypal="true"]');
    if (existing) {
      existing.addEventListener('load', markReady, { once: true });
      existing.addEventListener('error', markFailed, { once: true });
      return () => {
        existing.removeEventListener('load', markReady);
        existing.removeEventListener('error', markFailed);
      };
    }
    const script = document.createElement('script');
    script.dataset.fsiMembershipPaypal = 'true';
    script.setAttribute('data-namespace', PAYPAL_MEMBERSHIP_NAMESPACE);
    script.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(paypalClientId)}&currency=USD&vault=true&intent=subscription&components=buttons`;
    script.async = true;
    script.onload = markReady;
    script.onerror = markFailed;
    document.head.appendChild(script);
    return () => {
      script.onload = null;
      script.onerror = null;
    };
  }, [checkoutReady, paypalClientId, planId]);

  useEffect(() => {
    if (!checkoutReady || !sdkReady || !email || !planId) return;
    const container = document.getElementById(containerId);
    const paypal = (window as any)[PAYPAL_MEMBERSHIP_NAMESPACE];
    if (!container || !paypal?.Buttons) return;
    container.innerHTML = '';

    const buttons = paypal.Buttons({
      style: { layout: 'vertical', color: 'gold', shape: 'rect', label: 'subscribe' },
      createSubscription: (_data: any, actions: any) => actions.subscription.create({
        plan_id: planId,
        subscriber: { email_address: email.toLowerCase().trim() },
        application_context: {
          brand_name: 'FSI Digital',
          shipping_preference: 'NO_SHIPPING',
          user_action: 'SUBSCRIBE_NOW',
        },
      }),
      onApprove: async (data: any) => {
        setLoading(true);
        setError('');
        try {
          const subscriptionId = String(data.subscriptionID || '');
          if (!subscriptionId) throw new Error('PayPal did not return a subscription ID.');
          const response = await fetch('/api/paypal/capture-subscription', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              subscriptionId,
              email,
              attribution: {
                actionId: localStorage.getItem('fsi_growth_action_id') || '',
                actionChannel: localStorage.getItem('fsi_growth_action_channel') || '',
                actionCampaign: localStorage.getItem('fsi_growth_action_campaign') || '',
                actionRecipientId: localStorage.getItem('fsi_growth_action_recipient') || '',
              },
            }),
          });
          const result = await response.json();
          if (!response.ok) throw new Error(result.error || 'Subscription verification failed.');
          if ((window as any).gtag) {
            (window as any).gtag('event', 'membership_started', {
              value: 29,
              currency: 'USD',
              transaction_id: subscriptionId,
            });
          }
          router.push(result.redirectUrl);
        } catch (checkoutError: any) {
          setError(checkoutError.message || 'Membership activation failed.');
          setLoading(false);
        }
      },
      onCancel: () => setError('PayPal checkout was cancelled; no subscription was created.'),
      onError: (paypalError: any) => {
        console.error('Membership PayPal error:', paypalError);
        setError('PayPal could not create the subscription. Please try again.');
      },
    });
    if (buttons.isEligible()) buttons.render(`#${containerId}`);
    else setError('PayPal subscriptions are not available for this browser or account.');
    return () => {
      try { buttons.close(); } catch {}
    };
  }, [checkoutReady, sdkReady, email, planId, containerId, router]);

  const prepareCheckout = (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    if (!email.includes('@')) {
      setError('Please enter a valid business email address.');
      return;
    }
    if (!paypalClientId || !planId) {
      setError('Membership billing is temporarily unavailable because PayPal plan configuration is incomplete.');
      return;
    }
    setCheckoutReady(true);
    if ((window as any).gtag) {
      (window as any).gtag('event', 'membership_checkout_started', { value: 29, currency: 'USD' });
    }
    fetch('/api/telemetry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventName: 'checkout_started',
        sessionId: sessionStorage.getItem('fsi_session_id') || 'sess_anonymous',
        pagePath: window.location.pathname,
        referrer: document.referrer || 'direct',
        productId: 'funding-membership',
        revenue: '29.00',
        actionId: localStorage.getItem('fsi_growth_action_id') || '',
        actionChannel: localStorage.getItem('fsi_growth_action_channel') || '',
        actionCampaign: localStorage.getItem('fsi_growth_action_campaign') || '',
        actionRecipientId: localStorage.getItem('fsi_growth_action_recipient') || '',
      }),
    }).catch(() => {});
  };

  return (
    <div className="bg-slate-950 border border-emerald-500/40 rounded-2xl p-6 sm:p-8 text-left shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 bg-emerald-600 text-slate-950 text-[9px] font-black px-3.5 py-1 uppercase tracking-wider rounded-bl-lg">
        Founding Member Beta Cohort
      </div>
      <div className="space-y-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Founding Member Beta</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-4xl font-black text-white">$29</span>
            <span className="text-sm font-semibold text-slate-400">/ month USD</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Cancel anytime from your secure Member Dashboard.</p>
        </div>
        <div className="space-y-2 border-t border-b border-slate-800 py-4 text-xs text-slate-300">
          <div>✓ <strong className="text-white">Automated Weekly Funding Radar</strong></div>
          <div>✓ <strong className="text-white">Matching opening and deadline alerts</strong></div>
          <div>✓ <strong className="text-white">Template and worksheet library access</strong></div>
          <div className="text-slate-400">ℹ️ Fully self-serve; no calls or live sessions included</div>
        </div>
        {error && <div className="p-3 bg-red-900/40 border border-red-500/50 rounded-xl text-red-200 text-xs font-medium">{error}</div>}
        <form onSubmit={prepareCheckout} className="space-y-3">
          <input
            type="email"
            required
            disabled={checkoutReady || loading}
            placeholder="Enter your business email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-500 outline-none disabled:opacity-70"
          />
          {!checkoutReady && (
            <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-4 px-6 rounded-xl transition text-base shadow-xl">
              Continue to secure PayPal subscription →
            </button>
          )}
        </form>
        {checkoutReady && (
          <div className="space-y-2">
            {(!sdkReady || loading) && <div className="flex items-center justify-center gap-2 py-4 text-xs text-slate-400"><Loader2 className="w-4 h-4 animate-spin" /> {loading ? 'Verifying subscription…' : 'Loading PayPal…'}</div>}
            <div id={containerId} className={loading ? 'pointer-events-none opacity-50' : ''} />
            <button type="button" onClick={() => setCheckoutReady(false)} className="w-full text-xs text-slate-500 hover:text-slate-300">Use a different email</button>
          </div>
        )}
        <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 font-medium pt-1">
          <Lock className="w-3 h-3 text-emerald-500" /> PayPal recurring billing · Cancel anytime
        </div>
      </div>
    </div>
  );
}
