'use client';

import Script from 'next/script';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Lock,
  ArrowRight,
} from 'lucide-react';
import { PUBLISHING_STANDARDS } from '@/lib/advertising/config';

declare global {
  interface Window {
    paypal?: {
      Buttons: (options: Record<string, unknown>) => {
        render: (element: HTMLElement) => Promise<void> | void;
        close?: () => Promise<void> | void;
      };
    };
  }
}

interface BuyerInfo {
  buyerName: string;
  buyerEmail: string;
  companyName: string;
  website: string;
  acceptedTerms: boolean;
}

const initialBuyerInfo: BuyerInfo = {
  buyerName: '',
  buyerEmail: '',
  companyName: '',
  website: '',
  acceptedTerms: false,
};

export function DfyCheckoutForm({
  clientId,
  currency = 'USD',
}: {
  clientId: string;
  currency?: string;
}) {
  const router = useRouter();
  const [buyerInfo, setBuyerInfo] = useState<BuyerInfo>(initialBuyerInfo);
  const [scriptReady, setScriptReady] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState('');
  const buyerInfoRef = useRef(buyerInfo);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonsRenderedRef = useRef(false);

  useEffect(() => {
    buyerInfoRef.current = buyerInfo;
  }, [buyerInfo]);

  useEffect(() => {
    if (!scriptReady || !containerRef.current || buttonsRenderedRef.current || !window.paypal) {
      return;
    }

    const buttons = window.paypal.Buttons({
      style: {
        layout: 'vertical',
        color: 'gold',
        shape: 'rect',
        label: 'pay',
      },
      onClick: (_data: unknown, actions: { reject: () => void; resolve: () => void }) => {
        const current = buyerInfoRef.current;

        if (!current.buyerName.trim()) {
          setErrorMessage('Please enter your full contact name.');
          return actions.reject();
        }
        if (!current.buyerEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(current.buyerEmail.trim())) {
          setErrorMessage('Please enter a valid work email address.');
          return actions.reject();
        }
        if (!current.companyName.trim()) {
          setErrorMessage('Please enter your company or brand name.');
          return actions.reject();
        }
        if (!current.website.trim() || !/^https?:\/\/.+/.test(current.website.trim())) {
          setErrorMessage('Please enter a valid website URL starting with https:// or http://.');
          return actions.reject();
        }
        if (!current.acceptedTerms) {
          setErrorMessage('You must review and agree to the editorial guidelines and disclosure terms.');
          return actions.reject();
        }

        setErrorMessage('');
        return actions.resolve();
      },
      createOrder: async () => {
        setIsProcessing(true);
        setProcessingStatus('Initializing secure PayPal order...');
        setErrorMessage('');

        try {
          const response = await fetch('/api/advertise/checkout/create-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ packageId: 'done-for-you' }),
          });
          const data = await response.json();
          if (!response.ok || !data.id) {
            throw new Error(data.error || 'Failed to initialize payment.');
          }
          return data.id;
        } catch (err: unknown) {
          setIsProcessing(false);
          const msg = err instanceof Error ? err.message : 'Unable to start checkout.';
          setErrorMessage(msg);
          throw err;
        }
      },
      onApprove: async (data: { orderID?: string }) => {
        const orderId = data.orderID;
        if (!orderId) {
          setIsProcessing(false);
          setErrorMessage('PayPal did not return a valid order ID.');
          return;
        }

        setProcessingStatus('Verifying payment and generating your brief portal...');

        try {
          const response = await fetch('/api/advertise/checkout/capture', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              orderId,
              buyerName: buyerInfoRef.current.buyerName,
              buyerEmail: buyerInfoRef.current.buyerEmail,
              companyName: buyerInfoRef.current.companyName,
              website: buyerInfoRef.current.website,
            }),
          });

          const result = await response.json();

          if (!response.ok || !result.success) {
            throw new Error(result.error || 'Server payment verification failed.');
          }

          setProcessingStatus('Payment verified! Redirecting to your brief...');
          router.push(result.redirectUrl);
        } catch (err: unknown) {
          setIsProcessing(false);
          const msg = err instanceof Error ? err.message : 'Failed to finalize order.';
          setErrorMessage(`Payment was processed, but server verification returned: ${msg}. Please contact ashwani@fsidigital.ca.`);
        }
      },
      onCancel: () => {
        setIsProcessing(false);
        setErrorMessage('Payment was cancelled. You can restart checkout whenever you are ready.');
      },
      onError: (err: unknown) => {
        console.error('PayPal checkout error:', err);
        setIsProcessing(false);
        setErrorMessage('PayPal checkout encountered an issue. Please try again.');
      },
    });

    buttons.render(containerRef.current);
    buttonsRenderedRef.current = true;

    return () => {
      buttons.close?.();
      buttonsRenderedRef.current = false;
    };
  }, [clientId, currency, router, scriptReady]);

  const sdkUrl = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(clientId)}&currency=${encodeURIComponent(currency)}&intent=capture&components=buttons`;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
      <Script src={sdkUrl} strategy="afterInteractive" onLoad={() => setScriptReady(true)} />

      {/* Header */}
      <div className="border-b border-slate-100 pb-5 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Instant Purchase Checkout
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            <Lock className="h-3 w-3" />
            256-bit SSL Secure
          </span>
        </div>
        <div className="mt-2 flex items-baseline justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Done-for-You Sponsored Article
          </h2>
          <span className="text-2xl font-extrabold text-slate-900">$225 USD</span>
        </div>
        <p className="mt-1 text-xs text-slate-500">
          Fixed fee • Full research, writing, revisions, and guaranteed active hosting for at least 12 months.
        </p>
      </div>

      {errorMessage && (
        <div className="mb-6 rounded-lg border border-rose-200 bg-rose-50 p-4 text-xs sm:text-sm text-rose-800 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
          <div>{errorMessage}</div>
        </div>
      )}

      {isProcessing && (
        <div className="mb-6 rounded-lg border border-indigo-200 bg-indigo-50 p-4 text-xs sm:text-sm text-indigo-900 flex items-center gap-3">
          <Loader2 className="h-5 w-5 text-indigo-600 animate-spin shrink-0" />
          <div className="font-semibold">{processingStatus || 'Processing transaction...'}</div>
        </div>
      )}

      {/* Buyer Inputs */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Your Full Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            disabled={isProcessing}
            placeholder="e.g. Michael Vance"
            value={buyerInfo.buyerName}
            onChange={(e) => setBuyerInfo({ ...buyerInfo, buyerName: e.target.value })}
            className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 disabled:bg-slate-50"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Work Email Address <span className="text-rose-500">*</span>
          </label>
          <input
            type="email"
            required
            disabled={isProcessing}
            placeholder="michael@yourcompany.com"
            value={buyerInfo.buyerEmail}
            onChange={(e) => setBuyerInfo({ ...buyerInfo, buyerEmail: e.target.value })}
            className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 disabled:bg-slate-50"
          />
          <p className="mt-1 text-[11px] text-slate-500">
            Your brief access link and payment receipt will be delivered here.
          </p>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Company / Brand Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            disabled={isProcessing}
            placeholder="e.g. VenturePulse Technologies"
            value={buyerInfo.companyName}
            onChange={(e) => setBuyerInfo({ ...buyerInfo, companyName: e.target.value })}
            className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 disabled:bg-slate-50"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Company Website URL <span className="text-rose-500">*</span>
          </label>
          <input
            type="url"
            required
            disabled={isProcessing}
            placeholder="https://www.venturepulse.io"
            value={buyerInfo.website}
            onChange={(e) => setBuyerInfo({ ...buyerInfo, website: e.target.value })}
            className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 disabled:bg-slate-50"
          />
        </div>

        {/* Terms Checkbox */}
        <div className="pt-2">
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              disabled={isProcessing}
              checked={buyerInfo.acceptedTerms}
              onChange={(e) => setBuyerInfo({ ...buyerInfo, acceptedTerms: e.target.checked })}
              className="mt-1 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-xs text-slate-600 leading-relaxed">
              I agree to FSI Digital&apos;s{' '}
              <Link href="/advertise/editorial-guidelines" target="_blank" className="text-indigo-600 underline font-medium">
                Editorial Guidelines
              </Link>
              , FTC sponsored disclosure standards (<code>rel=&quot;sponsored&quot;</code>), and understand that 1 comprehensive revision round is included prior to publication. Full refund applies if our brief cannot be aligned prior to drafting.
            </span>
          </label>
        </div>
      </div>

      {/* PayPal Container */}
      <div className="pt-4 border-t border-slate-100">
        {!scriptReady && (
          <div className="flex items-center justify-center py-6 text-xs text-slate-500">
            <Loader2 className="mr-2 h-4 w-4 animate-spin text-indigo-600" />
            Loading secure PayPal buttons...
          </div>
        )}
        <div ref={containerRef} className={isProcessing ? 'pointer-events-none opacity-50' : ''} />
      </div>

      {/* Trust footers */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-center gap-4 text-[11px] text-slate-400">
        <div className="flex items-center gap-1">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
          <span>Server Verified</span>
        </div>
        <div>•</div>
        <div>Instant Brief Access</div>
        <div>•</div>
        <div>100% Refund Guarantee</div>
      </div>
    </div>
  );
}
