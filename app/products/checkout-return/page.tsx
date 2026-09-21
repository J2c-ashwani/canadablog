'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';

/**
 * Checkout Return Page — handles PayPal full-page redirect flow.
 *
 * When a user pays via the redirect flow (iOS Safari, in-app browsers), PayPal
 * redirects back to this page with `?token=<PayPalOrderId>&PayerID=<PayerID>&intent=<intentId>`.
 *
 * This page:
 *  1. Reads the PayPal order token and our internal intent ID from the URL.
 *  2. Calls /api/products/purchase to capture the payment server-side.
 *  3. Handles idempotency: repeated visits (refresh, Back/Forward) gracefully resolve
 *     to the existing purchase rather than creating duplicates.
 *  4. On success, redirects the customer to their product delivery page.
 *
 * Mirrors the proven pattern in app/mca/priority-success/page.tsx.
 */
function CheckoutReturnContent() {
  const params = useSearchParams();
  // PayPal appends `?token=<orderId>` to the return URL
  const paypalOrderId = params.get('token') ?? '';
  const intentId = params.get('intent') ?? '';

  const capturedRef = useRef(false);
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState('');
  const [deliveryUrl, setDeliveryUrl] = useState('');

  useEffect(() => {
    if (!paypalOrderId || !intentId) {
      setStatus('error');
      setError(
        'The PayPal return URL is missing its secure order parameters. ' +
        'If PayPal shows a completed charge, email hello@fsidigital.ca with your PayPal receipt.'
      );
      return;
    }

    // Idempotency guard: prevent double-capture on React StrictMode re-mounts or page refresh.
    if (capturedRef.current) return;
    capturedRef.current = true;

    async function capturePayment() {
      try {
        // Fire evidence telemetry for CEO diagnostic tracking
        fetch('/api/telemetry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          keepalive: true,
          body: JSON.stringify({
            eventName: 'paypal_redirect_return',
            pagePath: '/products/checkout-return',
            timestamp: new Date().toISOString(),
            metadata: {
              paypalOrderId,
              intentId,
              device: /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop',
              browser: navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome')
                ? 'Safari'
                : navigator.userAgent.includes('Chrome') ? 'Chrome' : 'Other',
              os: navigator.userAgent.includes('iPhone') || navigator.userAgent.includes('iPad')
                ? 'iOS'
                : navigator.userAgent.includes('Android') ? 'Android' : 'Other',
              flow: 'redirect',
            },
          }),
        }).catch(() => {});

        // Server-side capture: the purchase route independently verifies with PayPal,
        // checks order status, validates amount/currency, and handles idempotency.
        const response = await fetch('/api/products/purchase', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            paymentIntentId: intentId,
            paypalOrderId,
          }),
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          setError(
            result.error ||
            'PayPal payment verification could not be completed. If PayPal shows a completed charge, email hello@fsidigital.ca with your PayPal receipt.'
          );
          setStatus('error');
          return;
        }

        setDeliveryUrl(result.deliveryUrl || '');
        setStatus('success');

        // Fire purchase-completed telemetry
        fetch('/api/telemetry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          keepalive: true,
          body: JSON.stringify({
            eventName: 'purchase_completed',
            pagePath: '/products/checkout-return',
            timestamp: new Date().toISOString(),
            metadata: {
              paypalOrderId,
              intentId,
              flow: 'redirect',
              deliveryUrl: result.deliveryUrl || '',
            },
          }),
        }).catch(() => {});

        // Auto-redirect to product delivery after a short delay
        if (result.deliveryUrl) {
          setTimeout(() => {
            window.location.href = result.deliveryUrl;
          }, 2500);
        }
      } catch {
        setError(
          'The network connection was interrupted while verifying payment. ' +
          'If PayPal shows a completed charge, email hello@fsidigital.ca with your PayPal receipt. Do not pay a second time.'
        );
        setStatus('error');
      }
    }

    capturePayment();
  }, [intentId, paypalOrderId]);

  return (
    <main className="min-h-[75vh] bg-slate-50 px-4 py-16">
      <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-lg sm:p-12">

        {status === 'loading' && <>
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-600" />
          <h1 className="mt-6 text-2xl font-black text-slate-950">Verifying your payment</h1>
          <p className="mt-2 text-sm text-slate-600">
            Keep this page open while we confirm your PayPal payment and prepare your report.
          </p>
        </>}

        {status === 'success' && <>
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-2xl font-black text-emerald-700">✓</div>
          <h1 className="mt-5 text-3xl font-black text-slate-950">Payment confirmed</h1>
          <p className="mt-3 text-slate-600">
            Your payment has been verified and your personalized report is ready.
          </p>
          {deliveryUrl ? (
            <>
              <a
                href={deliveryUrl}
                className="mt-7 inline-flex w-full justify-center rounded-xl bg-emerald-600 px-6 py-4 font-black text-white hover:bg-emerald-700 transition-colors"
              >
                Open my report →
              </a>
              <p className="mt-3 text-xs text-slate-500">
                Redirecting you automatically in a few seconds…
              </p>
            </>
          ) : (
            <p className="mt-4 text-sm text-slate-600">
              A recovery link has been sent to your email. You can access your report anytime.
            </p>
          )}
          <p className="mt-4 text-xs text-slate-500">
            A backup copy and secure recovery link has also been sent to your email.
          </p>
        </>}

        {status === 'error' && <>
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-2xl text-amber-700">!</div>
          <h1 className="mt-5 text-2xl font-black text-slate-950">Payment verification needs attention</h1>
          <p className="mt-3 text-sm text-slate-600">{error}</p>
          <p className="mt-4 text-xs text-slate-500">
            Do not pay a second time. If PayPal shows a completed charge, our team will reconcile it within 24 hours.
          </p>
          <a
            href="mailto:hello@fsidigital.ca"
            className="mt-6 inline-flex rounded-xl border border-slate-300 px-5 py-3 font-bold text-slate-800 hover:bg-slate-50 transition-colors"
          >
            Contact payment support
          </a>
        </>}
      </div>
    </main>
  );
}

export default function CheckoutReturnPage() {
  return (
    <Suspense fallback={<main className="min-h-[75vh] bg-slate-50 p-16 text-center text-slate-500">Loading secure verification…</main>}>
      <CheckoutReturnContent />
    </Suspense>
  );
}
