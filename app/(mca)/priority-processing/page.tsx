'use client';

import Link from 'next/link';
import { Suspense, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const INCLUDES = [
  ['Readiness score', 'A transparent 0–100 score from your declared monthly revenue, time in business, requested amount, and uploaded-file count.'],
  ['Request-to-revenue analysis', 'See how the requested funding amount compares with the monthly revenue declared in your application.'],
  ['Document inventory check', 'Confirm whether the number of uploaded files meets the report’s preparation threshold.'],
  ['Preparation checklist', 'Get specific steps to prepare complete PDFs, consistent business details, and factual explanations before underwriting.'],
];

function Checkout() {
  const params = useSearchParams();
  const token = params.get('t') || '';
  const resolvedRef = useRef(false);
  const [application, setApplication] = useState<any>(null);
  const [alreadyPaid, setAlreadyPaid] = useState(false);
  const [loading, setLoading] = useState(Boolean(token));
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token || resolvedRef.current) return;
    resolvedRef.current = true;
    fetch(`/api/mca/resolve-token?t=${encodeURIComponent(token)}`)
      .then(async (response) => ({ response, data: await response.json() }))
      .then(({ response, data }) => {
        if (response.ok && data.alreadyPaid) setAlreadyPaid(true);
        else if (response.ok) setApplication(data);
        else setError(data.error || 'This application link is unavailable.');
      })
      .catch(() => setError('The application link could not be loaded.'))
      .finally(() => setLoading(false));
  }, [token]);

  async function startCheckout() {
    if (!application?.applicationId) return;
    setProcessing(true);
    setError('');
    try {
      const response = await fetch('/api/mca/priority-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recoveryToken: token }),
      });
      const result = await response.json();
      if (!response.ok || !result.approveUrl) throw new Error(result.error || 'PayPal checkout could not be started.');
      window.location.assign(result.approveUrl);
    } catch (checkoutError) {
      setError(checkoutError instanceof Error ? checkoutError.message : 'PayPal checkout could not be started.');
      setProcessing(false);
    }
  }

  if (loading) return <div className="mx-auto my-16 max-w-lg rounded-2xl border bg-white p-10 text-center"><div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" /><p className="mt-4 text-sm text-slate-600">Loading your secure application checkout…</p></div>;
  if (alreadyPaid) return <div className="mx-auto my-16 max-w-lg rounded-2xl border border-emerald-200 bg-white p-10 text-center"><h1 className="text-2xl font-black text-slate-950">Report already purchased</h1><p className="mt-3 text-sm text-slate-600">This application already has a completed MCA readiness-report purchase. Use the private link delivered after payment.</p></div>;

  return <main className="bg-slate-50 pb-20">
    <section className="bg-slate-950 px-5 py-16 text-center text-white sm:py-20"><div className="mx-auto max-w-3xl"><div className="text-xs font-black uppercase tracking-[0.2em] text-blue-300">Optional self-serve information product</div><h1 className="mt-4 text-4xl font-black sm:text-5xl">MCA Funding Readiness Report</h1><p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-300">Turn the information already declared in your application into an instant readiness score, funding-request ratio, and underwriting preparation checklist for a one-time <strong>CAD $49</strong>.</p></div></section>

    <section className="mx-auto -mt-7 max-w-4xl px-5"><div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-xl sm:p-10"><div className="grid gap-5 sm:grid-cols-2">{INCLUDES.map(([title, description]) => <div key={title} className="rounded-xl border border-slate-200 p-5"><h2 className="font-black text-slate-950">{title}</h2><p className="mt-2 text-sm leading-6 text-slate-600">{description}</p></div>)}</div>

      <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950"><strong>Transparent scope:</strong> this automated report does not read bank-statement contents, identify NSF transactions, assess creditworthiness, make a lender decision, or guarantee funding. It evaluates declared fields and recorded document count only.</div>

      {token && application ? <div className="mt-8 rounded-2xl border-2 border-blue-200 bg-blue-50 p-6 text-center"><p className="text-sm text-slate-700">Report for <strong>{application.legalBusinessName}</strong><br /><span className="text-xs text-slate-500">Application {application.applicationId}</span></p><div className="mt-5 text-4xl font-black text-slate-950">CAD $49</div><div className="mt-1 text-xs text-slate-500">one time · no subscription</div><button type="button" onClick={startCheckout} disabled={processing} className="mt-6 w-full rounded-xl bg-emerald-600 px-6 py-4 font-black text-white hover:bg-emerald-700 disabled:opacity-60">{processing ? 'Opening secure PayPal checkout…' : 'Get my instant readiness report →'}</button>{error && <p className="mt-3 text-sm font-bold text-red-700">{error}</p>}</div> : <div className="mt-8 text-center"><p className="text-sm text-slate-600">The report needs the data from a submitted business-funding application.</p><Link href="/apply" className="mt-5 inline-flex rounded-xl bg-blue-600 px-7 py-4 font-black text-white hover:bg-blue-700">Submit application first →</Link>{error && <p className="mt-3 text-sm font-bold text-red-700">{error}</p>}</div>}
    </div></section>
  </main>;
}

export default function PriorityProcessingPage() {
  return <Suspense fallback={<main className="min-h-[60vh] bg-slate-50 p-16 text-center text-slate-500">Loading checkout…</main>}><Checkout /></Suspense>;
}
