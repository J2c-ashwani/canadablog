"use client";

import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';

export interface EligibilitySnapshotProps {
  incorporated: string;
  employees: string;
  revenue: string;
  innovation: string;
  matching: string;
  summaryNote?: string;
}

export default function EligibilitySnapshot({
  incorporated,
  employees,
  revenue,
  innovation,
  matching,
  summaryNote = "Verify matching parameters and legal structure before submitting applications."
}: EligibilitySnapshotProps) {
  return (
    <div className="my-8 rounded-2xl border border-slate-150 bg-slate-50/40 p-5 md:p-6 shadow-sm">
      <h4 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-4 flex items-center gap-1.5">
        <ShieldCheck className="w-4 h-4 text-indigo-600" /> Eligibility Snapshot (Quick Criteria)
      </h4>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="min-w-full divide-y divide-slate-100 text-sm text-slate-700">
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="px-4 py-3 font-semibold bg-slate-50/30 text-slate-900 w-1/3">Incorporated</td>
              <td className="px-4 py-3">{incorporated}</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-semibold bg-slate-50/30 text-slate-900">Employees</td>
              <td className="px-4 py-3">{employees}</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-semibold bg-slate-50/30 text-slate-900">Revenue Profile</td>
              <td className="px-4 py-3">{revenue}</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-semibold bg-slate-50/30 text-slate-900">Technical R&D</td>
              <td className="px-4 py-3">{innovation}</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-semibold bg-slate-50/30 text-slate-900">Matching Funds</td>
              <td className="px-4 py-3">{matching}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-[11px] text-slate-500 mt-3 flex items-start gap-1 leading-normal">
        <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
        <span>{summaryNote}</span>
      </p>
    </div>
  );
}
