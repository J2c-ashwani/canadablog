'use client';

import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, CalendarCheck, CheckCircle2, Loader2, ShieldCheck, X } from 'lucide-react';

const CONSULTATION_PRICE = '199.00';
const CONSULTATION_PAYPAL_CLIENT_ID =
  process.env.NEXT_PUBLIC_CONSULTATION_PAYPAL_CLIENT_ID ||
  process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ||
  'ATiNArUnyarxHv-FRUJ7pVi14uHjafO8fEGrRVGBSUBRIrS-Rpx-w8LNEcHyGsF5sExfJjT03aYo_0xq';

type StrategySessionUpsellProps = {
  source?: string;
  compact?: boolean;
  leadEmail?: string;
  leadName?: string;
  autoOpen?: boolean;
  modalOnly?: boolean;
  onDismiss?: () => void;
};

export function StrategySessionUpsell({
  source = 'lead-form',
  compact = false,
  leadEmail,
  leadName,
  autoOpen = true,
  modalOnly = false,
  onDismiss,
}: StrategySessionUpsellProps) {
  const [isModalOpen, setIsModalOpen] = useState(autoOpen);
  const [scriptReady, setScriptReady] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const paypalContainerRef = useRef<HTMLDivElement>(null);
  const buttonsRenderedRef = useRef(false);
  const followUpSentRef = useRef(false);

  const consultationHref = `/consultation?source=${encodeURIComponent(source)}`;
  const paypalSdkUrl = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(CONSULTATION_PAYPAL_CLIENT_ID)}&currency=USD&intent=capture&components=buttons`;

  const sendFollowUp = async (reason: string) => {
    if (!leadEmail || followUpSentRef.current) return;
    followUpSentRef.current = true;

    await fetch('/api/strategy-session/follow-up', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: leadEmail,
        name: leadName,
        source,
        reason,
      }),
    }).catch((error) => {
      console.error('Strategy session follow-up failed:', error);
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    sendFollowUp('modal_closed');
    onDismiss?.();
  };

  useEffect(() => {
    if ((window as any).paypal) {
      setScriptReady(true);
    }
  }, []);

  useEffect(() => {
    if (!isModalOpen || !scriptReady || buttonsRenderedRef.current || !paypalContainerRef.current || !(window as any).paypal) {
      return;
    }

    paypalContainerRef.current.innerHTML = '';
    const buttons = (window as any).paypal.Buttons({
      style: {
        layout: 'vertical',
        color: 'gold',
        shape: 'rect',
        label: 'pay',
      },
      createOrder: (_data: unknown, actions: any) => {
        setPaymentError('');
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: CONSULTATION_PRICE,
                currency_code: 'USD',
              },
              description: '1-on-1 B2B Funding Strategy Consultation',
            },
          ],
        });
      },
      onApprove: async (_data: unknown, actions: any) => {
        await actions.order.capture();
        window.location.href = `/booking?source=${encodeURIComponent(source)}`;
      },
      onCancel: () => {
        setPaymentError('Payment was cancelled. You can restart checkout whenever you are ready.');
        sendFollowUp('paypal_cancelled');
      },
      onError: (error: unknown) => {
        console.error('Strategy session PayPal error:', error);
        setPaymentError('Payment could not be completed. Please try again or use the full checkout page.');
      },
    });

    buttons.render(paypalContainerRef.current);
    buttonsRenderedRef.current = true;

    return () => {
      buttons.close?.();
      buttonsRenderedRef.current = false;
    };
  }, [isModalOpen, scriptReady, source]);

  return (
    <>
      <Script src={paypalSdkUrl} strategy="afterInteractive" onLoad={() => setScriptReady(true)} />

      {!modalOnly && (
        <div className={`rounded-lg border border-emerald-200 bg-emerald-50 p-5 text-left shadow-sm ${compact ? '' : 'sm:p-6'}`}>
          <div className="mb-4 flex items-start gap-3">
            <div className="rounded-md bg-white p-2 text-emerald-700 shadow-sm">
              <CalendarCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 className={`${compact ? 'text-lg' : 'text-xl'} font-bold text-gray-950`}>
                Want expert help choosing the right funding path?
              </h3>
              <p className="mt-1 text-sm leading-6 text-gray-700">
                Book a 30-minute Funding Strategy Session. We review your business profile, strongest grant/loan options,
                eligibility risks, and next steps.
              </p>
            </div>
          </div>

          <div className="mb-5 grid gap-2 text-sm text-gray-700 sm:grid-cols-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-700" />
              Custom roadmap
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-700" />
              PayPal checkout
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-700" />
              Calendly booking
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-gray-950 px-5 py-3 font-semibold text-white transition hover:bg-gray-800"
            >
              Book Strategy Session - $199
              <ArrowRight className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <ShieldCheck className="h-4 w-4 text-emerald-700" />
              No funding approval guarantee. Strategy guidance only.
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-950/70 px-4 py-6 backdrop-blur-sm">
          <div className="relative max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-lg bg-white p-6 shadow-2xl">
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-4 top-4 rounded-md p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
              aria-label="Close strategy session offer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="pr-10">
              <div className="mb-4 inline-flex rounded-md bg-emerald-50 p-3 text-emerald-700">
                <CalendarCheck className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold text-gray-950">Book Your Funding Strategy Session</h2>
              <p className="mt-2 leading-7 text-gray-700">
                Your lead has been saved. If you want expert help now, reserve a private 30-minute strategy session for
                <strong> $199 USD</strong>. After PayPal checkout, you will choose your time on Calendly.
              </p>
            </div>

            <div className="my-5 grid gap-3 rounded-md bg-gray-50 p-4 text-sm text-gray-700 sm:grid-cols-2">
              <div className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-emerald-700" />
                Top grant/loan matches
              </div>
              <div className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-emerald-700" />
                Eligibility risk review
              </div>
              <div className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-emerald-700" />
                Funding roadmap
              </div>
              <div className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-emerald-700" />
                Calendly scheduling
              </div>
            </div>

            {paymentError && (
              <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-800">
                {paymentError}
              </div>
            )}

            {!scriptReady && (
              <div className="mb-4 flex items-center gap-2 rounded-md border border-blue-200 bg-blue-50 p-4 text-sm font-semibold text-blue-800">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading secure checkout...
              </div>
            )}

            <div ref={paypalContainerRef} className="min-h-[150px]" />

            <div className="mt-4 flex flex-col gap-3 text-sm text-gray-600 sm:flex-row sm:items-center sm:justify-between">
              <button type="button" onClick={closeModal} className="font-semibold text-gray-600 underline-offset-4 hover:text-gray-950 hover:underline">
                Maybe later
              </button>
              <a href={consultationHref} className="font-semibold text-emerald-700 underline-offset-4 hover:text-emerald-900 hover:underline">
                Open full checkout page
              </a>
            </div>

            <p className="mt-4 text-xs leading-5 text-gray-500">
              This session provides strategy guidance only and does not guarantee funding approval.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
