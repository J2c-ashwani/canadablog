import React from 'react';
import { Zap } from 'lucide-react';

export default function LocalAdvantageHack() {
  return (
    <div className="bg-lime-50 border border-lime-300 p-6 rounded-xl mb-8 relative">
      <div className="absolute top-3 right-3 bg-lime-200 text-lime-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">Insider</div>
      <h3 className="text-lg font-bold text-lime-900 flex items-center gap-2 m-0 mb-4">
        <Zap className="w-5 h-5 text-lime-700" />
        Local Advantage Hack
      </h3>
      <p className="text-sm text-gray-700 leading-relaxed mb-4">
        Most founders overlook the single most powerful lever in state-level funding: <strong>geographic arbitrage</strong>. Many states designate specific counties or census tracts as "Opportunity Zones," "Enterprise Zones," or "Distressed Areas." Simply by establishing your registered office within one of these zones — even if your operational footprint extends beyond it — you unlock:
      </p>
      <ul className="space-y-2 text-sm text-gray-700">
        <li className="flex gap-2">
          <span className="text-lime-600 font-bold">→</span>
          <span><strong>Double job creation credits</strong> (2x the standard per-employee rebate)</span>
        </li>
        <li className="flex gap-2">
          <span className="text-lime-600 font-bold">→</span>
          <span><strong>Priority application scoring</strong> on competitive discretionary funds</span>
        </li>
        <li className="flex gap-2">
          <span className="text-lime-600 font-bold">→</span>
          <span><strong>Property tax abatements</strong> of 50-100% for 5-10 years</span>
        </li>
      </ul>
      <p className="text-xs text-lime-700 mt-4 italic">
        The difference between a $10K grant and a $250K grant can literally be which side of the county line your lease is on.
      </p>
    </div>
  );
}
