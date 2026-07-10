"use client";

import React from 'react';
import Link from 'next/link';
import { HelpCircle, Calculator, Calendar } from 'lucide-react';

export default function NeedHelpApplying() {
  return (
    <div className="my-10 rounded-2xl border border-indigo-150 bg-indigo-50/30 p-6 md:p-8 shadow-sm">
      <h3 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
        <HelpCircle className="w-5 h-5 text-indigo-600" /> Need Help Applying?
      </h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* DIY Path */}
        <div className="bg-white p-5 rounded-xl border border-slate-100 flex flex-col justify-between shadow-sm">
          <div>
            <h4 className="font-bold text-slate-800 flex items-center gap-1.5 mb-2.5 text-xs uppercase tracking-wide">
              <Calculator className="w-4 h-4 text-emerald-600" /> Applying Yourself? (DIY)
            </h4>
            <p className="text-sm text-slate-600 mb-5 leading-relaxed">
              Use our interactive Stacking Matching Tool to scan our database of active federal and provincial programs in 3 minutes.
            </p>
          </div>
          <Link 
            href="/calculator" 
            className="inline-flex items-center justify-center bg-slate-900 text-white rounded-lg py-2.5 px-4 font-semibold text-sm hover:bg-slate-800 transition-colors shadow-sm"
          >
            Start Free Eligibility Check →
          </Link>
        </div>

        {/* Consulting / Complex Path */}
        <div className="bg-white p-5 rounded-xl border border-slate-100 flex flex-col justify-between shadow-sm">
          <div>
            <h4 className="font-bold text-slate-800 flex items-center gap-1.5 mb-2.5 text-xs uppercase tracking-wide">
              <Calendar className="w-4 h-4 text-indigo-600" /> Complex Project? (Multi-Program)
            </h4>
            <p className="text-sm text-slate-600 mb-5 leading-relaxed">
              Applying for multiple programs or a large scale-up project? Book a strategy audit to review criteria before submitting applications.
            </p>
          </div>
          <Link 
            href="/audit" 
            className="inline-flex items-center justify-center bg-indigo-600 text-white rounded-lg py-2.5 px-4 font-semibold text-sm hover:bg-indigo-700 transition-colors shadow-sm"
          >
            Schedule Strategy Audit →
          </Link>
        </div>
      </div>
    </div>
  );
}
