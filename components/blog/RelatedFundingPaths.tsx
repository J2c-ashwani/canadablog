"use client";

import React from 'react';
import { ArrowRight, BookOpen, Calculator, Calendar } from 'lucide-react';
import Link from 'next/link';

export interface RelatedFundingPathsProps {
  currentPathTitle: string;
  nextStepTitle: string;
  nextStepLink: string;
  nextStepDescription?: string;
  stepType: 'Comparison' | 'Program Guide' | 'Province Guide' | 'Funding Report';
  calculatorLink?: string;
  consultationLink?: string;
}

export default function RelatedFundingPaths({
  currentPathTitle,
  nextStepTitle,
  nextStepLink,
  nextStepDescription = "Deep dive into program parameters and eligibility structures.",
  stepType,
  calculatorLink = "/calculator",
  consultationLink = "/audit"
}: RelatedFundingPathsProps) {
  return (
    <div className="my-10 rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50/20 via-white to-slate-50/30 p-6 md:p-8 shadow-sm">
      <h4 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
        <BookOpen className="w-5 h-5 text-indigo-600" /> Guided Funding Path
      </h4>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 relative">
        {/* Step 1: Current Guide */}
        <div className="relative flex flex-col justify-between p-4 rounded-xl border border-indigo-100 bg-indigo-50/30">
          <div>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-100 text-indigo-800 uppercase tracking-wide mb-2">
              Step 1: Active Guide
            </span>
            <h5 className="font-semibold text-gray-900 text-sm leading-snug">{currentPathTitle}</h5>
            <p className="text-[11px] text-gray-500 mt-1">Researching current status and program updates.</p>
          </div>
          <div className="mt-4 flex items-center gap-1 text-[11px] font-semibold text-indigo-700">
            <span>You are here</span>
          </div>
        </div>

        {/* Step 2: Next Logical Read */}
        <div className="relative flex flex-col justify-between p-4 rounded-xl border border-gray-150 bg-white hover:border-indigo-300 hover:shadow-sm transition-all duration-300">
          <div>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-100 text-purple-800 uppercase tracking-wide mb-2">
              Step 2: {stepType}
            </span>
            <h5 className="font-semibold text-gray-950 text-sm leading-snug hover:text-indigo-600 transition-colors">
              <Link href={nextStepLink}>{nextStepTitle}</Link>
            </h5>
            <p className="text-[11px] text-gray-500 mt-1">{nextStepDescription}</p>
          </div>
          <div className="mt-4">
            <Link 
              href={nextStepLink} 
              className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 hover:text-indigo-800"
            >
              <span>Read Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Step 3: Calculator Match */}
        <div className="relative flex flex-col justify-between p-4 rounded-xl border border-gray-150 bg-white hover:border-emerald-300 hover:shadow-sm transition-all duration-300">
          <div>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-100 text-emerald-800 uppercase tracking-wide mb-2">
              Step 3: Stacking Check
            </span>
            <h5 className="font-semibold text-gray-900 text-sm leading-snug">
              <Link href={calculatorLink}>Stacking Match Calculator</Link>
            </h5>
            <p className="text-[11px] text-gray-500 mt-1">Estimate regional co-funding limits in 3 minutes.</p>
          </div>
          <div className="mt-4">
            <Link 
              href={calculatorLink} 
              className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 hover:text-emerald-800"
            >
              <span>Start Assessment</span>
              <Calculator className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Step 4: Audit */}
        <div className="relative flex flex-col justify-between p-4 rounded-xl border border-gray-150 bg-white hover:border-red-300 hover:shadow-sm transition-all duration-300">
          <div>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-red-100 text-red-800 uppercase tracking-wide mb-2">
              Step 4: Expert Review
            </span>
            <h5 className="font-semibold text-gray-900 text-sm leading-snug">
              <Link href={consultationLink}>Strategy Audit</Link>
            </h5>
            <p className="text-[11px] text-gray-500 mt-1">Validate application portfolio and prevent double-dipping.</p>
          </div>
          <div className="mt-4">
            <Link 
              href={consultationLink} 
              className="inline-flex items-center gap-1 text-[11px] font-bold text-red-600 hover:text-red-800"
            >
              <span>Book Strategy Audit</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
