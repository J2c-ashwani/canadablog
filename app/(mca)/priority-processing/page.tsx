'use client';

// app/(mca)/priority-processing/page.tsx
// Priority Handling Page with automated token-based checkout bridge

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState, useRef } from 'react';
import Link from 'next/link';

const BENEFITS = [
  {
    icon: '⚡',
    title: '4-Hour Underwriting Review',
    desc: 'Our senior analysts review your file within 4 business hours to identify potential rejection points.',
  },
  {
    icon: '📋',
    title: 'Bank Statement Verification',
    desc: 'We verify statements, calculate exact monthly average deposits, and ensure formatting matches partner expectations.',
  },
  {
    icon: '✅',
    title: 'Pre-Submission Audit',
    desc: 'We audit your file for common red flags (NSFs, negative balances) and advise on resolution before underwriting.',
  },
  {
    icon: '🚀',
    title: 'Priority Queue Placement',
    desc: 'Your application bypasses the standard queue and lands directly on the priority desks of our funding partner.',
  },
  {
    icon: '📞',
    title: 'Dedicated Funding Specialist',
    desc: 'Get direct email access to your assigned analyst for continuous updates until your file is approved.',
  },
];

function PriorityCheckoutBridge() {
  const searchParams = useSearchParams();
  const token = searchParams.get('t') ?? '';

  const [loading, setLoading] = useState(!!token);
  const [appDetails, setAppDetails] = useState<any>(null);
  const [alreadyPaid, setAlreadyPaid] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [processing, setProcessing] = useState(false);
  const [paypalError, setPaypalError] = useState('');
  const resolvedRef = useRef(false);

  useEffect(() => {
    if (!token) return;
    if (resolvedRef.current) return;
    resolvedRef.current = true;

    async function resolveToken() {
      try {
        const res = await fetch(`/api/mca/resolve-token?t=${encodeURIComponent(token)}`);
        const data = await res.json();

        if (res.ok && data.alreadyPaid) {
          setAlreadyPaid(true);
          setLoading(false);
          return;
        }

        if (!res.ok) {
          setErrorMsg(data.error ?? 'Invalid or expired recovery link.');
          setLoading(false);
          return;
        }

        setAppDetails(data);
        setLoading(false);
      } catch (err) {
        setErrorMsg('Connection error resolving recovery link.');
        setLoading(false);
      }
    }

    resolveToken();
  }, [token]);

  const handlePriorityPurchase = async () => {
    if (!appDetails?.applicationId) return;
    setProcessing(true);
    setPaypalError('');

    try {
      const res = await fetch('/api/mca/priority-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicationId: appDetails.applicationId,
          email: appDetails.email,
        }),
      });
      const data = await res.json();

      if (!res.ok || !data.approveUrl) {
        setPaypalError('Unable to initiate payment. Please try again.');
        setProcessing(false);
        return;
      }

      window.location.href = data.approveUrl;
    } catch {
      setPaypalError('Payment system error. Please try again.');
      setProcessing(false);
    }
  };

  // 1. Loading State
  if (token && loading) {
    return (
      <div className="max-w-md mx-auto my-16 bg-white p-8 rounded-2xl border border-gray-200 shadow-sm text-center">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <h2 className="text-lg font-bold text-gray-900">Accessing Your Application...</h2>
        <p className="text-gray-500 text-sm mt-2">Loading secure checkout bridge, please wait.</p>
      </div>
    );
  }

  // 2. Error State
  if (token && errorMsg) {
    return (
      <div className="max-w-md mx-auto my-16 bg-white p-8 rounded-2xl border border-red-200 shadow-sm text-center">
        <div className="w-12 h-12 bg-red-50 text-red-650 flex items-center justify-center rounded-full mx-auto mb-4 text-xl font-bold">⚠️</div>
        <h2 className="text-lg font-bold text-gray-950">Link Unavailable</h2>
        <p className="text-gray-700 text-sm mt-2">{errorMsg}</p>
        <Link href="/apply" className="mt-6 inline-block bg-indigo-650 text-white font-bold text-sm px-6 py-2.5 rounded-lg">
          Submit New Application
        </Link>
      </div>
    );
  }

  // 3. Already Paid State
  if (token && alreadyPaid) {
    return (
      <div className="max-w-md mx-auto my-16 bg-white p-8 rounded-2xl border border-emerald-200 shadow-sm text-center">
        <div className="w-12 h-12 bg-emerald-50 text-emerald-650 flex items-center justify-center rounded-full mx-auto mb-4 text-xl font-bold">✓</div>
        <h2 className="text-lg font-bold text-gray-950">Priority Active</h2>
        <p className="text-gray-700 text-sm mt-2">Priority Funding Processing is already active for this application. Your file is with our underwriting specialists.</p>
        <Link href="/" className="mt-6 inline-block bg-indigo-650 text-white font-bold text-sm px-6 py-2.5 rounded-lg">
          Return to Homepage
        </Link>
      </div>
    );
  }

  // 4. Token Resolved & Active Checkout Bridging
  if (token && appDetails) {
    return (
      <div className="max-w-lg mx-auto my-16 bg-white rounded-2xl border border-indigo-250 shadow-lg overflow-hidden">
        <div className="bg-indigo-650 text-white px-6 py-4 text-center">
          <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded font-extrabold uppercase tracking-wider">Fast-Track Bridge</span>
          <h2 className="text-xl font-black mt-1">Activate Priority Processing</h2>
        </div>
        <div className="p-6">
          <p className="text-sm text-gray-650 leading-relaxed text-center mb-6">
            Hi <strong>{appDetails.legalBusinessName}</strong>, activate fast-track status for application <strong>{appDetails.applicationId}</strong>.
          </p>

          <div className="bg-slate-50 border border-slate-150 rounded-xl p-4 mb-6">
            <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-2">Service Package Includes:</h3>
            <ul className="text-xs text-slate-650 space-y-2">
              <li>⚡ <strong>4-Hour Review:</strong> Direct documents optimization assessment.</li>
              <li>🚀 <strong>Priority Forward:</strong> Bypass standard partner queue queues.</li>
              <li>📞 <strong>Specialist Support:</strong> Direct contact channel for updates.</li>
            </ul>
          </div>

          <div className="text-center p-4 border border-indigo-100 rounded-xl bg-indigo-50/20 mb-6">
            <span className="text-xs text-gray-400 block uppercase tracking-wider leading-none">One-time Processing Fee</span>
            <span className="text-3xl font-black text-gray-900 block mt-2">CAD $49</span>
          </div>

          <button
            onClick={handlePriorityPurchase}
            disabled={processing}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-base py-3.5 rounded-xl shadow-md transition active:scale-98 flex items-center justify-center gap-2"
          >
            {processing ? (
              <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Redirecting to PayPal...</>
            ) : (
              <>⚡ Activate Priority Handling</>
            )}
          </button>
          
          {paypalError && <p className="text-xs text-red-650 text-center mt-2.5 font-bold">{paypalError}</p>}
        </div>
      </div>
    );
  }

  // 5. Default General Layout (No Token Parameter)
  return (
    <div className="font-sans pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-16 sm:py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="bg-blue-600 text-white font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-full">
            PREMIUM UPGRADE SERVICE
          </span>
          <h1 className="text-3xl sm:text-5xl font-black mt-4 tracking-tight leading-none text-white">
            Priority Funding Processing
          </h1>
          <p className="text-blue-200 mt-4 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Review, optimize, and fast-track your business funding file. Get dedicated advisory review
            and priority partner queue placement for a one-time fee of <strong>CAD $49</strong>.
          </p>
          <div className="mt-8">
            <Link href="/apply" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3.5 rounded-lg text-base shadow-lg transition-transform active:scale-95 inline-block">
              Apply with Priority Handling Now
            </Link>
          </div>
        </div>
      </section>

      {/* Main Benefits Grid */}
      <section className="max-w-4xl mx-auto px-6 mt-16">
        <h2 className="text-2xl font-black text-gray-900 text-center mb-10">What is included in Priority Processing?</h2>
        <div className="space-y-6">
          {BENEFITS.map((b) => (
            <div key={b.title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 flex gap-4">
              <span className="text-2xl">{b.icon}</span>
              <div>
                <h3 className="font-bold text-gray-900 text-base mb-1">{b.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing / Callout */}
      <section className="max-w-3xl mx-auto px-6 mt-16 text-center">
        <div className="bg-white rounded-2xl p-8 border border-blue-200 shadow-md">
          <h3 className="text-lg font-bold text-gray-900 mb-1">Simple Transparent Pricing</h3>
          <span className="text-gray-400 text-xs block mb-4 uppercase tracking-wider">One-Time Handling Fee</span>
          <div className="text-3xl font-black text-gray-900 mb-6">CAD $49</div>
          <p className="text-gray-500 text-sm max-w-md mx-auto mb-6">
            No subscriptions. No success-based deductions. Your application remains 100% free to submit; this premium service is entirely optional.
          </p>
          <Link href="/apply" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-lg text-sm transition-transform active:scale-95 inline-block shadow-md">
            🔒 Start Secure Application
          </Link>
        </div>
      </section>

      {/* Disclaimers */}
      <section className="max-w-3xl mx-auto px-6 mt-12 text-center text-xs text-gray-400 leading-relaxed">
        * Priority Funding Processing is a documents-verification and priority handling service. FSI Digital does not make credit decisions. Purchasing this service guarantees professional handling and priority forward speed to our funding partner, but does not guarantee funding approval.
      </section>
    </div>
  );
}

export default function PriorityProcessingPage() {
  return (
    <Suspense fallback={
      <div className="max-w-md mx-auto my-16 bg-white p-8 rounded-2xl border border-gray-200 shadow-sm text-center">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <h2 className="text-lg font-bold text-gray-900">Loading checkout...</h2>
      </div>
    }>
      <PriorityCheckoutBridge />
    </Suspense>
  );
}
