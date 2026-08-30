import React from 'react';
import { GitBranch } from 'lucide-react';

export default function FundingDecisionTree() {
  return (
    <div className="bg-amber-50 border border-amber-200 p-6 rounded-xl mb-8">
      <h3 className="text-lg font-bold text-amber-900 flex items-center gap-2 m-0 mb-4">
        <GitBranch className="w-5 h-5 text-amber-600" />
        Grant vs. Loan vs. Equity — Choose by Need
      </h3>
      <div className="space-y-3">
        <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
          <h4 className="font-bold text-sm text-gray-900 m-0 mb-1">🏆 Grant, contribution, or rebate</h4>
          <p className="text-xs text-gray-600">Potentially non-dilutive, but usually restricted to eligible projects and documented costs. Timing, payment structure, reporting, and repayment conditions are program-specific.</p>
        </div>
        <div className="bg-white p-4 rounded-lg border-l-4 border-blue-500">
          <h4 className="font-bold text-sm text-gray-900 m-0 mb-1">🏦 Loan or community financing</h4>
          <p className="text-xs text-gray-600">Can support costs a grant will not cover, but must be repaid under the lender’s current terms. Compare total cost, security, guarantees, repayment timing, and cash-flow capacity.</p>
        </div>
        <div className="bg-white p-4 rounded-lg border-l-4 border-purple-500">
          <h4 className="font-bold text-sm text-gray-900 m-0 mb-1">💰 Equity investment</h4>
          <p className="text-xs text-gray-600">Exchanges ownership for capital and investor support. It fits some scalable companies but is not a grant and can change control, governance, and future economics.</p>
        </div>
      </div>
      <p className="text-xs text-amber-700 mt-4 font-medium">
        Build the capital plan around the project and cash-flow need. Before combining sources, confirm permitted stacking, disclosure, and duplicate-cost rules.
      </p>
    </div>
  );
}
