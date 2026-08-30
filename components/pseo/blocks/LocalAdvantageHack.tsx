import React from 'react';
import { Zap } from 'lucide-react';

export default function LocalAdvantageHack({ regionType = 'state' }: { regionType?: 'state' | 'province' }) {
  const regionNoun = regionType === 'province' ? 'provincial' : 'state';
  const localArea = regionType === 'province' ? 'municipality or designated region' : 'county, municipality, or designated zone';

  return (
    <div className="bg-lime-50 border border-lime-300 p-6 rounded-xl mb-8 relative">
      <div className="absolute top-3 right-3 bg-lime-200 text-lime-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">Local check</div>
      <h3 className="text-lg font-bold text-lime-900 flex items-center gap-2 m-0 mb-4">
        <Zap className="w-5 h-5 text-lime-700" />
        Check Location-Specific Eligibility
      </h3>
      <p className="text-sm text-gray-700 leading-relaxed mb-4">
        Some {regionNoun} and local programs restrict support to a particular {localArea}. Location can affect eligibility, but a mailing address alone is rarely enough; programs may require employees, project activity, assets, or a long-term operating commitment in the eligible area.
      </p>
      <ul className="space-y-2 text-sm text-gray-700">
        <li className="flex gap-2">
          <span className="text-lime-600 font-bold">→</span>
          <span><strong>Check the official boundary map</strong> and the address used for eligibility.</span>
        </li>
        <li className="flex gap-2">
          <span className="text-lime-600 font-bold">→</span>
          <span><strong>Confirm the required local activity</strong>, such as hiring, investment, or project delivery.</span>
        </li>
        <li className="flex gap-2">
          <span className="text-lime-600 font-bold">→</span>
          <span><strong>Document the commitment period</strong> and any repayment or clawback terms.</span>
        </li>
      </ul>
      <p className="text-xs text-lime-700 mt-4 italic">
        Do not relocate or sign a lease for a possible incentive until the administering agency confirms eligibility in writing.
      </p>
    </div>
  );
}
