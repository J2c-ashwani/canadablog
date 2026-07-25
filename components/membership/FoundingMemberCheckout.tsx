'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Loader2, CheckCircle2, Lock } from 'lucide-react';

export function FoundingMemberCheckout() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your business email address.');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate PayPal Subscription Session Creation
    try {
      const mockSubId = `SUB-FOUNDING-${Date.now()}`;
      const res = await fetch('/api/paypal/capture-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subscriptionId: mockSubId,
          email,
          name: '',
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        setError(json.error || 'Failed to initialize subscription checkout.');
        setLoading(false);
        return;
      }

      // Track Privacy-First GA4 Event
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'membership_started', {
          value: 29.00,
          currency: 'USD',
          subscription_id: mockSubId,
        });
      }

      // Redirect to onboarding
      router.push(json.redirectUrl);
    } catch {
      setError('Checkout connection failed. Please try again.');
      setLoading(false);
    }
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
          <p className="text-xs text-slate-400 mt-1">Cancel or pause anytime in 1 click from your Member Dashboard.</p>
        </div>

        <div className="space-y-2 border-t border-b border-slate-800 py-4 text-xs text-slate-300">
          <div className="flex items-center gap-2">✓ <strong className="text-white">Personalized Weekly Radar Briefing</strong> (Every Monday)</div>
          <div className="flex items-center gap-2">✓ <strong className="text-white">Matching Opening &amp; Closing Deadline Alerts</strong></div>
          <div className="flex items-center gap-2">✓ <strong className="text-white">Template &amp; Budget Worksheet Library Access</strong></div>
          <div className="flex items-center gap-2">✓ <strong className="text-white">1 Monthly Group Office Hour</strong></div>
          <div className="flex items-center gap-2 text-slate-400">ℹ️ Self-serve automated intelligence &amp; group sessions</div>
        </div>

        {error && (
          <div className="p-3 bg-red-900/40 border border-red-500/50 rounded-xl text-red-200 text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleCheckout} className="space-y-3">
          <input
            type="email"
            required
            placeholder="Enter your business email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-500 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-4 px-6 rounded-xl transition flex items-center justify-center gap-2 text-base shadow-xl"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Join Founding Member Beta ($29/mo) →</>}
          </button>
        </form>

        <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 font-medium pt-1">
          <Lock className="w-3 h-3 text-emerald-500" /> Secure SSL PayPal Checkout · 100% Privacy Protected
        </div>
      </div>
    </div>
  );
}
