'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, CalendarCheck, CheckCircle2, ShieldCheck, X, FileCheck2 } from 'lucide-react';

type StrategySessionUpsellProps = {
  source?: string;
  compact?: boolean;
  leadEmail?: string;
  leadName?: string;
  autoOpen?: boolean;
  modalOnly?: boolean;
  onDismiss?: () => void;
};

function createRecoveryId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

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
  const recoveryIdRef = useRef('');
  const shownRecordedRef = useRef(false);
  const abandonmentRecordedRef = useRef(false);

  if (!recoveryIdRef.current) {
    recoveryIdRef.current = createRecoveryId();
  }

  const recoveryId = recoveryIdRef.current;
  const bookingHref = `/booking?email=${encodeURIComponent(leadEmail || '')}&name=${encodeURIComponent(leadName || '')}&rid=${encodeURIComponent(recoveryId)}&source=${encodeURIComponent(source)}`;

  const recordRecoveryEvent = useCallback(async (
    event: 'shown' | 'abandoned' | 'paid',
    details: { reason?: string; paypalOrderId?: string; rawSummary?: string } = {},
  ) => {
    if (!leadEmail && event !== 'paid') return;

    await fetch('/api/strategy-session/recovery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event,
        recoveryId,
        email: leadEmail,
        name: leadName,
        source,
        reason: details.reason,
        pagePath: typeof window !== 'undefined' ? window.location.pathname : '',
        paypalOrderId: details.paypalOrderId,
        rawSummary: details.rawSummary,
      }),
    }).catch((error) => {
      console.error('Strategy session recovery tracking failed:', error);
    });
  }, [leadEmail, leadName, recoveryId, source]);

  const recordAbandonment = useCallback((reason: string) => {
    if (abandonmentRecordedRef.current) return;
    abandonmentRecordedRef.current = true;
    void recordRecoveryEvent('abandoned', { reason });
  }, [recordRecoveryEvent]);

  const closeModal = () => {
    setIsModalOpen(false);
    recordAbandonment('modal_closed');
    onDismiss?.();
  };

  useEffect(() => {
    if (!isModalOpen || !leadEmail || shownRecordedRef.current) {
      return;
    }
    shownRecordedRef.current = true;
    void recordRecoveryEvent('shown', { reason: 'success_popup_shown' });
  }, [isModalOpen, leadEmail, recordRecoveryEvent]);

  return (
    <>
      {!modalOnly && (
        <div className={`rounded-lg border border-emerald-200 bg-emerald-50 p-5 text-left shadow-sm ${compact ? '' : 'sm:p-6'}`}>
          <div className="mb-4 flex items-start gap-3">
            <div className="rounded-md bg-white p-2 text-emerald-700 shadow-sm">
              <CalendarCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 className={`${compact ? 'text-lg' : 'text-xl'} font-bold text-gray-950`}>
                Upgrade to a Researched Funding Eligibility Audit & Roadmap
              </h3>
              <p className="mt-1 text-sm leading-6 text-gray-700">
                Book a 1-on-1 Funding Eligibility Audit and get a custom pre-researched Roadmap mapping your highest probability grants, tax credits, and loans.
              </p>
            </div>
          </div>

          <div className="mb-5 grid gap-2 text-sm text-gray-700 sm:grid-cols-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-700" />
              Manual pre-call audit
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-700" />
              Custom PDF roadmap
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-700" />
              Calendly selection first
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={bookingHref}
              data-google-vignette="false"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-gray-950 px-5 py-3 font-semibold text-white transition hover:bg-gray-800"
            >
              Book Funding Eligibility Audit
              <ArrowRight className="h-4 w-4" />
            </a>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <ShieldCheck className="h-4 w-4 text-emerald-700" />
              100% Risk-Free Money-Back Guarantee
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-950/70 px-4 py-6 backdrop-blur-sm">
          <div className="relative max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl border border-slate-100 text-left">
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-4 top-4 rounded-md p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
              aria-label="Close success message"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header Success Section */}
            <div className="pr-10 mt-2">
              <div className="mb-3 inline-flex rounded-xl bg-emerald-50 p-2.5 text-emerald-700 border border-emerald-200">
                <CheckCircle2 className="h-6 w-6 text-emerald-600 animate-bounce" />
              </div>
              <h2 className="text-2xl font-black text-slate-950 tracking-tight">✅ Inquiry Received & Under Review</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Your company profile and funding criteria have been successfully saved. Our research team will review your eligibility within <strong>2 business days</strong> and notify you by email.
              </p>
            </div>

            {/* Recommended Upgrade Offer Box */}
            <div className="mt-5 rounded-2xl border border-indigo-150 bg-indigo-50/50 p-5 shadow-sm">
              <div className="flex items-center gap-2 text-indigo-900 font-extrabold text-sm uppercase tracking-wider mb-2">
                <FileCheck2 className="w-5 h-5 text-indigo-600" />
                ⭐ Recommended Next Step
              </div>
              <h3 className="text-lg font-bold text-slate-950">Upgrade to a Researched Funding Eligibility Audit & Roadmap</h3>
              <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                Skip the 2-day queue. Book a 1-on-1 Funding Eligibility Audit. We conduct <strong>2 hours of manual pre-call research</strong> against 1,200+ active programs to prepare a customized Roadmap PDF for your business.
              </p>

              <ul className="mt-3.5 space-y-2.5 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-none text-indigo-600 font-bold" />
                  <span><strong>2 Hours Custom Research:</strong> Analyst review of entity structure & sector databases.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-none text-indigo-600 font-bold" />
                  <span><strong>Choose Time Slot First:</strong> Select a convenient Calendly slot first (no upfront charge).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-none text-indigo-600 font-bold" />
                  <span><strong>100% Partner Credit:</strong> Your research deposit is fully credited toward our full-service application preparation and submission support if we work together.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-none text-indigo-600 font-bold" />
                  <span><strong>100% Eligibility Guarantee:</strong> Refunded in full if our analysts determine that your business is not eligible for any active funding opportunities.</span>
                </li>
              </ul>
            </div>

            {/* CTA Buttons */}
            <div className="mt-6 flex flex-col gap-3">
              <a
                href={bookingHref}
                data-google-vignette="false"
                onClick={() => {
                  abandonmentRecordedRef.current = true; // prevent abandonment log
                  void recordRecoveryEvent('shown', { reason: 'clicked_upgrade_button' });
                }}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-4 font-black text-white transition hover:bg-indigo-700 shadow-md shadow-indigo-200 hover:-translate-y-0.5 active:translate-y-0 duration-150"
              >
                Book Funding Eligibility Audit
                <ArrowRight className="h-4.5 w-4.5" />
              </a>

              {/* Downgrade Promo Card */}
              <div className="rounded-xl border border-dashed border-emerald-300 bg-emerald-50/50 p-4 text-center my-1">
                <p className="text-xs font-bold text-slate-800">
                  Want immediate results without booking a session?
                </p>
                <p className="text-xs text-slate-600 mt-1">
                  Get your instant personalized Funding Match Report PDF for just $19.
                </p>
                <a
                  href={`/products/funding-match-report?email=${encodeURIComponent(leadEmail || '')}&utm_source=upsell-downgrade`}
                  onClick={() => {
                    abandonmentRecordedRef.current = true;
                  }}
                  className="mt-3 inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-4 py-2 rounded-lg transition shadow-xs self-center"
                >
                  Get Instant Report ($19) <ArrowRight className="w-3 h-3 ml-0.5" />
                </a>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="w-full text-center text-xs font-semibold text-slate-500 hover:text-slate-900 transition underline decoration-dotted underline-offset-4 py-1"
              >
                No thanks, I'll wait 2 days for the free email review
              </button>
            </div>

            <p className="mt-4 text-[10px] leading-relaxed text-slate-400 text-center border-t border-slate-100 pt-3">
              🛡️ Slot booking requires completing a secure research deposit post-scheduling to activate manual research.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
