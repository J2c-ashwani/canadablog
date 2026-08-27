'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';

function PrioritySuccessContent() {
  const params = useSearchParams();
  const token = params.get('token') ?? '';
  const intentId = params.get('intent') ?? '';
  const capturedRef = useRef(false);
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState('');
  const [reportUrl, setReportUrl] = useState('');
  const [deliveryAccepted, setDeliveryAccepted] = useState(false);

  useEffect(() => {
    if (!token || !intentId) {
      setStatus('error');
      setError('The PayPal return URL is missing its secure order parameters.');
      return;
    }
    if (capturedRef.current) return;
    capturedRef.current = true;

    async function verifyPayment() {
      try {
        const response = await fetch('/api/mca/capture-priority-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token, intentId }),
        });
        const result = await response.json();
        if (!response.ok || !result.reportUrl) {
          setError(result.error || 'PayPal payment verification could not be completed.');
          setStatus('error');
          return;
        }
        setReportUrl(result.reportUrl);
        setDeliveryAccepted(Boolean(result.deliveryAccepted));
        setStatus('success');
        fetch('/api/telemetry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            eventName: 'purchase_completed',
            pagePath: window.location.pathname,
            timestamp: new Date().toISOString(),
            metadata: { productId: 'mca-readiness-report', amount: 49, currency: 'CAD' },
          }),
        }).catch(() => {});
      } catch {
        setError('The network connection was interrupted while verifying payment.');
        setStatus('error');
      }
    }
    verifyPayment();
  }, [intentId, token]);

  return (
    <main className="min-h-[75vh] bg-slate-50 px-4 py-16">
      <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-lg sm:p-12">
        {status === 'loading' && <>
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />
          <h1 className="mt-6 text-2xl font-black text-slate-950">Verifying your PayPal capture</h1>
          <p className="mt-2 text-sm text-slate-600">Keep this page open while we create your private report.</p>
        </>}

        {status === 'success' && <>
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-2xl font-black text-emerald-700">✓</div>
          <h1 className="mt-5 text-3xl font-black text-slate-950">Your report is ready</h1>
          <p className="mt-3 text-slate-600">PayPal verified the <strong>CAD $49</strong> payment and your private MCA Funding Readiness Report has been generated.</p>
          <a href={reportUrl} className="mt-7 inline-flex w-full justify-center rounded-xl bg-blue-600 px-6 py-4 font-black text-white hover:bg-blue-700">
            Open my readiness report →
          </a>
          <p className="mt-4 text-xs text-slate-500">
            {deliveryAccepted
              ? 'Resend or Brevo accepted a backup copy for delivery to your application email.'
              : 'Email delivery is pending, but your report is available immediately through the private button above.'}
          </p>
        </>}

        {status === 'error' && <>
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-2xl text-amber-700">!</div>
          <h1 className="mt-5 text-2xl font-black text-slate-950">Payment verification needs attention</h1>
          <p className="mt-3 text-sm text-slate-600">{error}</p>
          <p className="mt-4 text-xs text-slate-500">If PayPal shows a completed charge, email info@fsidigital.ca with the PayPal order ID shown in your PayPal receipt. Do not pay a second time.</p>
          <a href="mailto:info@fsidigital.ca" className="mt-6 inline-flex rounded-xl border border-slate-300 px-5 py-3 font-bold text-slate-800">Contact payment support</a>
        </>}
      </div>
    </main>
  );
}

export default function PrioritySuccessPage() {
  return <Suspense fallback={<main className="min-h-[75vh] bg-slate-50 p-16 text-center text-slate-500">Loading secure verification…</main>}><PrioritySuccessContent /></Suspense>;
}
