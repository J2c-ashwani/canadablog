"use client";

import React from 'react';
import { ArrowRight, CheckCircle, Info } from 'lucide-react';
import Link from 'next/link';

export interface FundingStrategyBoxProps {
  audience: string;
  steps: string[];
  expectedStack: string;
  focusArea?: string;
  buttonLink?: string;
  buttonText?: string;
}

export default function FundingStrategyBox({
  audience,
  steps,
  expectedStack,
  focusArea = "Recommended Stacking Sequence",
  buttonLink = "/calculator",
  buttonText = "Calculate Your Stack Match"
}: FundingStrategyBoxProps) {
  return (
    <div className="my-8 rounded-2xl border-2 border-emerald-100 bg-gradient-to-br from-emerald-50/40 via-white to-teal-50/20 p-6 md:p-8 shadow-md hover:shadow-lg transition-all duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-100">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 uppercase tracking-wide">
            Target Profile: {audience}
          </span>
          <h4 className="text-xl font-bold text-gray-900 mt-2">
            Structured Funding Strategy
          </h4>
        </div>
        <div className="bg-emerald-950 text-emerald-50 px-5 py-3 rounded-xl border border-emerald-900 text-center shrink-0">
          <div className="text-xs uppercase tracking-wider opacity-85">Expected Stack Total</div>
          <div className="text-2xl font-black tracking-tight mt-0.5">{expectedStack}</div>
        </div>
      </div>

      <div className="mb-6">
        <h5 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-emerald-600" /> {focusArea}
        </h5>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
          {steps.map((step, idx) => (
            <div 
              key={idx} 
              className="bg-white border border-gray-150 rounded-xl p-4 shadow-sm hover:border-emerald-200 transition-colors flex flex-col justify-between group relative"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100">
                    0{idx + 1}
                  </span>
                  {idx < steps.length - 1 && (
                    <ArrowRight className="hidden md:block w-4 h-4 text-emerald-300 absolute -right-3 top-1/2 -translate-y-1/2 z-10 group-hover:translate-x-0.5 transition-transform" />
                  )}
                </div>
                <h6 className="font-bold text-gray-900 leading-snug">{step}</h6>
                <p className="text-xs text-gray-500 mt-1">
                  {idx === 0 && "Primary intake point for early non-repayable base capital."}
                  {idx === 1 && "Secondary stack targeting tax rebates and payroll matching."}
                  {idx === 2 && "Tertiary expansion layers covering regional and trade credits."}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-500 max-w-md text-center sm:text-left leading-relaxed">
          ✔ Legal entities must maintain active status. Stacking is subject to standard governmental double-dipping salary limits (max 75% coverage).
        </p>
        <Link 
          href={buttonLink}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 shadow-md hover:shadow-lg transition-all text-sm shrink-0"
        >
          {buttonText}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
