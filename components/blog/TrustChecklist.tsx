"use client";

import React from 'react';
import { ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';

interface TrustChecklistProps {
  lastVerifiedDate: string;
}

export default function TrustChecklist({ lastVerifiedDate }: TrustChecklistProps) {
  // Format verified date safely
  const formattedDate = new Date(lastVerifiedDate.includes('T') ? lastVerifiedDate : `${lastVerifiedDate}T00:00:00Z`).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });

  return (
    <div className="my-6 p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/30 bg-emerald-50/20 dark:bg-emerald-950/10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs font-semibold text-slate-700 dark:text-slate-300">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>Last verified: {formattedDate}</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>Official source checked</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>Program limits updated</span>
        </div>
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
          <span>Eligibility disclaimer active</span>
        </div>
      </div>
      <p className="mt-3 text-[10px] text-slate-500 leading-relaxed border-t border-slate-100 dark:border-neutral-800 pt-2.5">
        Disclaimer: Program guidelines and funding pools are subject to change by administering agencies. Information provided is for research and estimation purposes only and does not constitute guaranteed funding approval.
      </p>
    </div>
  );
}
