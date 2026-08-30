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
          <p className="text-sm text-gray-600">Best for a clearly documented program with straightforward rules and an application the owner can complete accurately. Use free official guidance where it is available.</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-purple-100">
          <div className="flex items-center gap-2 mb-2">
            <FileCheck className="w-4 h-4 text-blue-600" />
            <h4 className="font-semibold text-sm text-gray-900 m-0">Accountant + Public Business Advisor</h4>
          </div>
          <p className="text-sm text-gray-600">Useful when tax treatment, payroll, cost allocation, financing, or recordkeeping is material. An advisor can improve preparation but cannot guarantee eligibility or make an application audit-proof.</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-purple-100">
          <div className="flex items-center gap-2 mb-2">
            <FileCheck className="w-4 h-4 text-purple-600" />
            <h4 className="font-semibold text-sm text-gray-900 m-0">Professional Grant Writer</h4>
          </div>
          <p className="text-sm text-gray-600">Consider specialist help when the proposal is technically complex or highly competitive. Check whether the program permits success-based fees, define ownership of the work, and never accept a promise of approval.</p>
        </div>
      </div>
    </div>
  );
}
