'use client';

import Script from 'next/script';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import type { PartnerPackage } from '@/lib/partners/packages';
import { CheckCircle2, Loader2, ShieldCheck } from 'lucide-react';

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

type BuyerInfo = {
  buyerName: string;
  buyerEmail: string;
  company: string;
  website: string;
  targetMarket: string;
  notes: string;
  acceptedTerms: boolean;
  buyerTitle: string;
  taxId: string;
};

const initialBuyerInfo: BuyerInfo = {
  buyerName: '',
  buyerEmail: '',
  company: '',
  website: '',
  targetMarket: '',
  notes: '',
  acceptedTerms: false,
  buyerTitle: '',
  taxId: '',
};

export function PayPalPartnerCheckout({
  selectedPackage,
  clientId,
  currency,
}: {
  selectedPackage: PartnerPackage;
  clientId: string;
  currency: string;
}) {
  const router = useRouter();
  const [buyerInfo, setBuyerInfo] = useState<BuyerInfo>(initialBuyerInfo);
  const [scriptReady, setScriptReady] = useState(false);
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const buyerInfoRef = useRef(buyerInfo);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonsRenderedRef = useRef(false);

  useEffect(() => {
    buyerInfoRef.current = buyerInfo;
  }, [buyerInfo]);

  useEffect(() => {
    if (!scriptReady || !containerRef.current || buttonsRenderedRef.current || !window.paypal) return;

    const buttons = window.paypal.Buttons({
      style: {
        layout: 'vertical',
        color: 'gold',
        shape: 'rect',
        label: 'pay',
      },
      onClick: (_data: unknown, actions: { reject: () => void; resolve: () => void }) => {
        const currentBuyer = buyerInfoRef.current;
        const missingRequired =
          !currentBuyer.buyerName ||
          !currentBuyer.buyerEmail ||
          !currentBuyer.company ||
          !currentBuyer.targetMarket ||
          !currentBuyer.buyerTitle ||
          !currentBuyer.taxId ||
          !currentBuyer.acceptedTerms;

        if (missingRequired) {
          setError('Please complete buyer name, email, company, title, Tax ID, target market, and agreement before paying.');
          return actions.reject();
        }

        setError('');
        return actions.resolve();
      },
      createOrder: async () => {
        setIsProcessing(true);
        setError('');
        const response = await fetch('/api/paypal/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ packageId: selectedPackage.id }),
        });
        const data = await response.json();
        if (!response.ok || !data.id) throw new Error(data.error || 'Unable to start secure checkout.');
        return data.id;
      },
      onApprove: async (data: { orderID?: string }) => {
        const orderId = data.orderID || '';
        if (!orderId) throw new Error('PayPal did not return an order ID.');
        const combinedNotes = `[Title: ${buyerInfoRef.current.buyerTitle || 'N/A'}] [Tax ID: ${buyerInfoRef.current.taxId || 'N/A'}] ${buyerInfoRef.current.notes || ''}`.trim();

        await fetch('/api/paypal/record-partner-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId,
            packageId: selectedPackage.id,
            buyerName: buyerInfoRef.current.buyerName,
            buyerEmail: buyerInfoRef.current.buyerEmail,
            company: buyerInfoRef.current.company,
            website: buyerInfoRef.current.website,
            targetMarket: buyerInfoRef.current.targetMarket,
            notes: combinedNotes,
          }),
        }).catch((error) => {
          console.error('Failed to log partner payment:', error);
        });

        setIsProcessing(false);

        router.push(`/partners/success?package=${selectedPackage.id}&order=${encodeURIComponent(orderId)}`);
      },
      onCancel: () => {
        setIsProcessing(false);
        setError('Payment was cancelled. You can restart checkout when ready.');
      },
      onError: (err: unknown) => {
        console.error('PayPal checkout error:', err);
        setIsProcessing(false);
        setError('PayPal checkout failed. Please try again or contact FSI Digital.');
      },
    });

    buttons.render(containerRef.current);
    buttonsRenderedRef.current = true;

    return () => {
      buttons.close?.();
      buttonsRenderedRef.current = false;
    };
  }, [currency, router, scriptReady, selectedPackage.id]);

  const sdkUrl = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(clientId)}&currency=${encodeURIComponent(currency)}&intent=capture&components=buttons`;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <Script src={sdkUrl} strategy="afterInteractive" onLoad={() => setScriptReady(true)} />

      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-950">Partner Checkout</h2>
          <p className="mt-1 text-gray-600">Pay with PayPal. Lead delivery is handled after partner review.</p>
        </div>
        <div className="rounded-md bg-emerald-50 p-2 text-emerald-700">
          <ShieldCheck className="h-6 w-6" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-semibold text-gray-700">Buyer Name *</span>
          <input
            value={buyerInfo.buyerName}
            onChange={(event) => setBuyerInfo({ ...buyerInfo, buyerName: event.target.value })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
            placeholder="Your full name"
            required
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-semibold text-gray-700">Buyer Email *</span>
          <input
            type="email"
            value={buyerInfo.buyerEmail}
            onChange={(event) => setBuyerInfo({ ...buyerInfo, buyerEmail: event.target.value })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
            placeholder="buyer@company.com"
            required
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-semibold text-gray-700">Company *</span>
          <input
            value={buyerInfo.company}
            onChange={(event) => setBuyerInfo({ ...buyerInfo, company: event.target.value })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
            placeholder="Funding company name"
            required
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-semibold text-gray-700">Website</span>
          <input
            value={buyerInfo.website}
            onChange={(event) => setBuyerInfo({ ...buyerInfo, website: event.target.value })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
            placeholder="https://example.com"
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-semibold text-gray-700">Purchaser Title *</span>
          <input
            value={buyerInfo.buyerTitle}
            onChange={(event) => setBuyerInfo({ ...buyerInfo, buyerTitle: event.target.value })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
            placeholder="e.g. Managing Partner, Director of Growth"
            required
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-semibold text-gray-700">Business Registration / Tax ID *</span>
          <input
            value={buyerInfo.taxId}
            onChange={(event) => setBuyerInfo({ ...buyerInfo, taxId: event.target.value })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
            placeholder="e.g. 123456789RT0001 or EIN"
            required
          />
        </label>
      </div>

      <label className="mt-4 block space-y-2">
        <span className="text-sm font-semibold text-gray-700">Target Market *</span>
        <textarea
          value={buyerInfo.targetMarket}
          onChange={(event) => setBuyerInfo({ ...buyerInfo, targetMarket: event.target.value })}
          className="min-h-24 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
          placeholder="Example: Canadian manufacturing leads in Ontario and BC, $100k+ funding needs."
        />
      </label>

      <label className="mt-4 block space-y-2">
        <span className="text-sm font-semibold text-gray-700">Notes</span>
        <textarea
          value={buyerInfo.notes}
          onChange={(event) => setBuyerInfo({ ...buyerInfo, notes: event.target.value })}
          className="min-h-20 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
          placeholder="Any partner requirements, exclusions, or lead qualification notes."
        />
      </label>

      <label className="mt-5 flex gap-3 rounded-md border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        <input
          type="checkbox"
          checked={buyerInfo.acceptedTerms}
          onChange={(event) => setBuyerInfo({ ...buyerInfo, acceptedTerms: event.target.checked })}
          className="mt-1 h-4 w-4 rounded border-amber-300"
        />
        <span>
          I understand this payment starts a partner pilot review. FSI Digital may approve, refund, or manually fulfill
          lead delivery based on fit, consent, inventory, and compliance requirements.
        </span>
      </label>

      {error && (
        <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-800">
          {error}
        </div>
      )}

      {isProcessing && (
        <div className="mt-4 flex items-center gap-2 rounded-md border border-blue-200 bg-blue-50 p-4 text-sm font-semibold text-blue-800">
          <Loader2 className="h-4 w-4 animate-spin" />
          Processing PayPal checkout...
        </div>
      )}

      <div className="mt-6">
        {!scriptReady && (
          <div className="flex items-center gap-2 rounded-md border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading PayPal...
          </div>
        )}
        <div ref={containerRef} />
      </div>

      <div className="mt-5 flex gap-3 rounded-md bg-gray-50 p-4 text-sm text-gray-600">
        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-emerald-600" />
        <span>Payment records are logged internally so partner delivery and refunds can be tracked.</span>
      </div>
    </div>
  );
}
