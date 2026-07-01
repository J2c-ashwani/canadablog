'use client';

import React from 'react';
import { Layers, ArrowDown, Award, Sparkles, CheckCircle2 } from 'lucide-react';

interface ProductHierarchyMapProps {
  currentTier: 'starter' | 'planning' | 'roadmap' | 'complete' | 'expert' | 'dfy';
}

export function ProductHierarchyMap({ currentTier }: ProductHierarchyMapProps) {
  const tiers = [
    { id: 'starter', name: 'Starter', price: '$9', product: 'Approval Case Library', desc: 'Winning narratives & budgets', style: 'border-blue-500 bg-blue-950/20 text-blue-300' },
    { id: 'planning', name: 'Planning', price: '$19', product: 'Funding Match Report', desc: 'Custom program qualifications', style: 'border-emerald-500 bg-emerald-950/20 text-emerald-300' },
    { id: 'roadmap', name: 'Roadmap', price: '$49', product: 'Funding Action Plan', desc: 'Prioritized Month 1-4 schedule', style: 'border-purple-500 bg-purple-950/20 text-purple-300' },
    { id: 'complete', name: 'Complete', price: '$79', product: 'Complete Stacking Bundle', desc: 'Both Report + Action Plan timeline', style: 'border-amber-500 bg-amber-950/20 text-amber-300' },
    { id: 'expert', name: 'Expert', price: '$199', product: 'Strategy Session Audit', desc: '1-on-1 advisor consultation', style: 'border-rose-500 bg-rose-950/20 text-rose-300' },
    { id: 'dfy', name: 'Done-For-You', price: 'Full Program', product: 'Application Filing Service', desc: 'Full-service writing and compliance', style: 'border-indigo-500 bg-indigo-950/20 text-indigo-300' }
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto text-left space-y-6">
      <div className="space-y-1.5 text-center sm:text-left">
        <span className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5" /> FSI Digital ascension pathway
        </span>
        <h3 className="text-lg font-bold text-slate-100 mt-2">How Our Products Fit Together</h3>
        <p className="text-xs text-slate-400 max-w-lg leading-normal">
          From basic application analysis to full-service writing, we support your business at every stage of the funding process.
        </p>
      </div>

      {/* Ascension Ladder Grid */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        {tiers.map((tier, idx) => {
          const isActive = tier.id === currentTier;
          return (
            <div 
              key={tier.id} 
              className={`border rounded-xl p-4 flex flex-col justify-between relative transition-all duration-300 ${
                isActive 
                  ? 'border-indigo-500 bg-indigo-950/20 shadow-lg shadow-indigo-950/20 ring-1 ring-indigo-500/20 scale-[1.03] z-10' 
                  : 'border-slate-800 bg-slate-900/40 opacity-70 hover:opacity-90'
              }`}
            >
              {isActive && (
                <div className="absolute -top-2.5 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white text-[8px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full border border-indigo-500">
                  Your Tier
                </div>
              )}
              <div className="space-y-1">
                <span className="text-[9px] font-extrabold uppercase text-slate-400">Step 0{idx + 1} · {tier.name}</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-lg font-black text-slate-100">{tier.price}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-200 pt-1 leading-tight">{tier.product}</h4>
                <p className="text-[10px] text-slate-500 leading-tight pt-0.5">{tier.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
