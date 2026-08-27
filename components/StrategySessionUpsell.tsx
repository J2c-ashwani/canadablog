'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle2, FileCheck2, ShieldCheck, X } from 'lucide-react';

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
  autoOpen = true,
  modalOnly = false,
  onDismiss,
}: StrategySessionUpsellProps) {
  const [isModalOpen, setIsModalOpen] = useState(autoOpen);
  const context = encodeURIComponent(source);
  const bundleHref = `/api/growth-os/onsite-click?surface=lead-conversion&context=${context}&offer=bundle`;
  const reportHref = `/api/growth-os/onsite-click?surface=lead-conversion&context=${context}&offer=match-report`;

  const closeModal = () => {
    setIsModalOpen(false);
    onDismiss?.();
  };

  const offer = (
    <div className={`rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-left ${compact ? '' : 'sm:p-6'}`}>
      <div className="mb-4 flex items-start gap-3">
        <div className="rounded-lg bg-white p-2 text-emerald-700 shadow-sm">
          <FileCheck2 className="h-5 w-5" />
        </div>
        <div>
          <h3 className={`${compact ? 'text-lg' : 'text-xl'} font-black text-slate-950`}>
            Turn Your Saved Profile Into a Complete Funding Blueprint
          </h3>
          <p className="mt-1 text-sm leading-6 text-slate-700">
            Get the report, action plan, budget templates, and application checklists instantly. No call or live session is required.
          </p>
        </div>
      </div>

      <div className="mb-5 grid gap-2 text-sm text-slate-700 sm:grid-cols-3">
        <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-700" /> Match report</div>
        <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-700" /> Action plan</div>
        <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-700" /> Templates</div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <a
          href={bundleHref}
          data-google-vignette="false"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 font-extrabold text-white transition hover:bg-emerald-700"
        >
          Get Complete Blueprint ($79) <ArrowRight className="h-4 w-4" />
        </a>
        <a href={reportHref} className="text-center text-sm font-bold text-slate-700 hover:text-slate-950 hover:underline">
          Start with Match Report ($19)
        </a>
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs text-slate-600">
        <ShieldCheck className="h-4 w-4 text-emerald-700" /> Secure checkout and instant digital delivery
      </div>
    </div>
  );

  return (
    <>
      {!modalOnly && offer}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 px-4 py-6 backdrop-blur-sm">
          <div className="relative w-full max-w-xl rounded-2xl bg-white p-5 shadow-2xl sm:p-6">
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-3 top-3 rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              aria-label="Close product recommendation"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="mb-4 pr-10">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-700">Profile saved</p>
              <h2 className="mt-1 text-2xl font-black text-slate-950">Choose Your Self-Serve Next Step</h2>
            </div>
            {offer}
            <button
              type="button"
              onClick={closeModal}
              className="mt-4 w-full py-1 text-center text-xs font-semibold text-slate-500 hover:text-slate-900"
            >
              Continue with free resources
            </button>
          </div>
        </div>
      )}
    </>
  );
}
