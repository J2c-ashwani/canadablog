import React from 'react';
import { Users, FileCheck } from 'lucide-react';

export default function LocalBrokerStrategy() {
  return (
    <div className="bg-purple-50 border border-purple-200 p-6 rounded-xl mb-8">
      <h3 className="text-lg font-bold text-purple-900 flex items-center gap-2 m-0 mb-4">
        <Users className="w-5 h-5 text-purple-600" />
        Should You Hire a Grant Writer? (Honest Breakdown)
      </h3>
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg border border-purple-100">
          <div className="flex items-center gap-2 mb-2">
            <FileCheck className="w-4 h-4 text-green-600" />
            <h4 className="font-semibold text-sm text-gray-900 m-0">DIY (Apply Yourself)</h4>
          </div>
          <p className="text-sm text-gray-600">Best for: simple workforce training grants under $25K. The applications are 2-4 pages, and most state SBDC offices will review your draft for free.</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-purple-100">
          <div className="flex items-center gap-2 mb-2">
            <FileCheck className="w-4 h-4 text-blue-600" />
            <h4 className="font-semibold text-sm text-gray-900 m-0">Local CPA + SBDC</h4>
          </div>
          <p className="text-sm text-gray-600">Best for: tax credit programs (R&D, enterprise zone, job creation). Your CPA already has your financials; adding a free SBDC advisor makes you audit-proof at zero cost.</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-purple-100">
          <div className="flex items-center gap-2 mb-2">
            <FileCheck className="w-4 h-4 text-purple-600" />
            <h4 className="font-semibold text-sm text-gray-900 m-0">Professional Grant Writer (5-10% of Award)</h4>
          </div>
          <p className="text-sm text-gray-600">Only justified for: discretionary funds over $100K where the state conducts competitive RFP-style evaluation. Below that threshold, you are paying for overhead you don't need.</p>
        </div>
      </div>
    </div>
  );
}
