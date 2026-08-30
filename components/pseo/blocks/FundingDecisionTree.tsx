import React from 'react';
import { GitBranch } from 'lucide-react';

export default function FundingDecisionTree() {
  return (
    <div className="bg-amber-50 border border-amber-200 p-6 rounded-xl mb-8">
      <h3 className="text-lg font-bold text-amber-900 flex items-center gap-2 m-0 mb-4">
        <GitBranch className="w-5 h-5 text-amber-600" />
        Grant vs. Loan vs. VC — What Works HERE?
      </h3>
      <div className="space-y-3">
        <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
          <h4 className="font-bold text-sm text-gray-900 m-0 mb-1">🏆 State Grant (Best if you qualify)</h4>
          <p className="text-xs text-gray-600">Non-dilutive. Zero repayment. But: 3-6 month approval cycle, strict compliance, clawback risk if you miss job targets. Best for: established companies expanding operations.</p>
        </div>
        <div className="bg-white p-4 rounded-lg border-l-4 border-blue-500">
          <h4 className="font-bold text-sm text-gray-900 m-0 mb-1">🏦 SBA Microloan / Community Lender</h4>
          <p className="text-xs text-gray-600">Faster (2-4 weeks). Lower documentation. But: you repay with interest (6-9% typical). Best for: fast-moving small businesses needing $10K-$50K immediately.</p>
        </div>
        <div className="bg-white p-4 rounded-lg border-l-4 border-purple-500">
          <h4 className="font-bold text-sm text-gray-900 m-0 mb-1">💰 Venture Capital / Angel</h4>
          <p className="text-xs text-gray-600">Only viable for high-growth tech. Dilutive (10-30% equity). Most state VC matching programs require you to already have a lead investor. Not a replacement for grants — a completely different instrument.</p>
        </div>
      </div>
      <p className="text-xs text-amber-700 mt-4 font-medium">
        💡 Pro move: Stack a state grant + SBA loan simultaneously. Use the grant letter as leverage to negotiate better loan terms.
      </p>
    </div>
  );
}
