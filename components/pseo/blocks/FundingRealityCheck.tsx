import React from 'react';
import { AlertCircle, TrendingDown, Target } from 'lucide-react';

interface Props {
  program1: string;
  amount1: string;
  regionType?: 'state' | 'province';
}

export default function FundingRealityCheck({ program1, amount1, regionType = 'state' }: Props) {
  const regionNoun = regionType === 'province' ? 'province' : 'state';

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg mb-8">
      <div className="flex items-center gap-3 mb-4">
        <AlertCircle className="w-6 h-6 text-yellow-600" />
        <h3 className="text-xl font-bold text-yellow-900 m-0">The Funding Reality Check</h3>
      </div>
      
      <p className="text-yellow-800 text-sm leading-relaxed mb-6">
        A listing is not proof that your company qualifies. For <strong>{program1}</strong> ({amount1}), verify the current intake and controlling program guide before you plan around the funding. Competitive programs commonly evaluate project fit, applicant eligibility, budget evidence, delivery capacity, and measurable outcomes, but the exact test differs by program.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded border border-yellow-200">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-5 h-5 text-red-500" />
            <h4 className="font-semibold text-gray-900 text-sm m-0">Primary Risk Factor</h4>
          </div>
          <p className="text-gray-600 text-xs">Spending before approval, relying on an outdated intake, or submitting costs the program does not support.</p>
        </div>
        
        <div className="bg-white p-4 rounded border border-yellow-200">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-green-600" />
            <h4 className="font-semibold text-gray-900 text-sm m-0">Funding Lever</h4>
          </div>
          <p className="text-gray-600 text-xs">Build a documented project brief, then compare federal, {regionNoun}, and local routes against the same budget.</p>
        </div>
      </div>
    </div>
  );
}
