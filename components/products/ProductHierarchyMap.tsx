'use client';

import React from 'react';
import { Layers, CheckCircle2, ShieldCheck, Clock, Users, ArrowUpRight } from 'lucide-react';

interface ProductHierarchyMapProps {
  currentTier: 'starter' | 'planning' | 'roadmap' | 'complete' | 'expert' | 'dfy';
}

export function ProductHierarchyMap({ currentTier }: ProductHierarchyMapProps) {
  const tiers = [
    { 
      id: 'starter', 
      name: 'Starter', 
      price: '$9', 
      product: 'Approval Case Library', 
      desc: 'Winning narratives & budgets',
      bestFor: 'DIY writing references',
      time: '3–5 hours',
      guarantee: '30-Day Risk-Free'
    },
    { 
      id: 'planning', 
      name: 'Planning', 
      price: '$19', 
      product: 'Funding Match Report', 
      desc: 'Custom qualification mapping',
      bestFor: 'Assessing eligibility',
      time: '1–2 hours',
      guarantee: '30-Day Risk-Free'
    },
    { 
      id: 'roadmap', 
      name: 'Roadmap', 
      price: '$49', 
      product: 'Funding Action Plan', 
      desc: 'Prioritized Month 1-4 schedule',
      bestFor: 'Preventing clawbacks',
      time: '2–4 hours',
      guarantee: '30-Day Risk-Free'
    },
    { 
      id: 'complete', 
      name: 'Complete', 
      price: '$79', 
      product: 'Complete Stacking Bundle', 
      desc: 'Both Report + Stacking Timeline',
      bestFor: 'Comprehensive prep',
      time: '2–4 hours',
      guarantee: '30-Day Risk-Free'
    },
    { 
      id: 'expert', 
      name: 'Expert', 
      price: '$199', 
      product: 'Strategy Session Audit', 
      desc: '1-on-1 advisor review',
      bestFor: 'Pre-flight expert review',
      time: '60 minutes',
      guarantee: 'Upgrade Credit Applied'
    },
    { 
      id: 'dfy', 
      name: 'Done-For-You', 
      price: 'Retainer + Fee', 
      product: 'Application Filing Service', 
      desc: 'Full-service writing & audit',
      bestFor: 'Outsourcing everything',
      time: 'Minimal (FSI writes)',
      guarantee: 'Contracted SLA'
    }
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 max-w-5xl mx-auto text-left space-y-8">
      
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div className="space-y-1.5">
          <span className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" /> FSI Digital Value Ascension Pathway
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-slate-100 mt-2">Which Service Matches Your Stage?</h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl leading-relaxed">
            From self-serve templates to fully managed agency filing, we provide the exact level of support your co-funding application requires.
          </p>
        </div>
        <div className="bg-emerald-950/20 border border-emerald-800/30 rounded-xl px-4 py-3 shrink-0 flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <p className="text-[11px] text-emerald-300/80 leading-snug font-medium max-w-xs">
            <span className="font-extrabold text-emerald-300">Upgrade Credit Guarantee:</span> Every dollar spent on self-serve products is credited if you upgrade to a Strategy Session.
          </p>
        </div>
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
                  ? 'border-indigo-500 bg-indigo-950/20 shadow-lg shadow-indigo-950/20 ring-1 ring-indigo-500/20 scale-[1.02] z-10' 
                  : 'border-slate-800 bg-slate-900/40 opacity-75 hover:opacity-100'
              }`}
            >
              {isActive && (
                <div className="absolute -top-2.5 left-1/2 transform -translate-x-1/2 bg-indigo-650 text-white text-[8px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full border border-indigo-500">
                  Current View
                </div>
              )}
              <div className="space-y-1 text-slate-300">
                <span className="text-[9px] font-extrabold uppercase text-slate-450">Step 0{idx + 1} · {tier.name}</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-lg font-black text-slate-100">{tier.price}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-200 pt-1 leading-tight">{tier.product}</h4>
                <p className="text-[10px] text-slate-500 leading-normal pt-0.5">{tier.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Comparison Matrix Table */}
      <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/40">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-900 border-b border-slate-800 text-slate-350">
                <th className="p-4 font-bold uppercase tracking-wider text-[10px]">Product / Service</th>
                <th className="p-4 font-bold uppercase tracking-wider text-[10px]">Best For</th>
                <th className="p-4 font-bold uppercase tracking-wider text-[10px]">Your Time Required</th>
                <th className="p-4 font-bold uppercase tracking-wider text-[10px]">Refund / Guarantee</th>
                <th className="p-4 font-bold uppercase tracking-wider text-[10px] text-right">Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300 font-medium">
              {tiers.map((tier) => {
                const isActive = tier.id === currentTier;
                return (
                  <tr key={tier.id} className={`${isActive ? 'bg-indigo-950/10' : 'hover:bg-slate-900/30'}`}>
                    <td className="p-4 flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-indigo-400' : 'bg-slate-700'}`}></span>
                      <div>
                        <div className="font-extrabold text-slate-200">{tier.product}</div>
                        <div className="text-[10px] text-slate-500 font-normal">{tier.desc}</div>
                      </div>
                    </td>
                    <td className="p-4 text-slate-400">{tier.bestFor}</td>
                    <td className="p-4 text-slate-400 inline-flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" /> {tier.time}
                    </td>
                    <td className="p-4 text-slate-400">{tier.guarantee}</td>
                    <td className="p-4 text-right font-black text-slate-100">{tier.price}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
