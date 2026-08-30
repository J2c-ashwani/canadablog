import React from 'react';
import { BarChart3 } from 'lucide-react';

export default function FundingDensitySnapshot() {
  return (
    <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-xl mb-8">
      <h3 className="text-lg font-bold text-indigo-900 flex items-center gap-2 m-0 mb-4">
        <BarChart3 className="w-5 h-5 text-indigo-600" />
        Program Verification Snapshot
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg text-center border border-indigo-100">
          <p className="text-sm font-bold text-indigo-700">Status</p>
          <p className="text-xs text-gray-500 mt-1">Is the intake open now?</p>
        </div>
        <div className="bg-white p-4 rounded-lg text-center border border-indigo-100">
          <p className="text-sm font-bold text-indigo-700">Applicant</p>
          <p className="text-xs text-gray-500 mt-1">Does the company qualify?</p>
        </div>
        <div className="bg-white p-4 rounded-lg text-center border border-indigo-100">
          <p className="text-sm font-bold text-indigo-700">Project</p>
          <p className="text-xs text-gray-500 mt-1">Are the costs and timing eligible?</p>
        </div>
        <div className="bg-white p-4 rounded-lg text-center border border-indigo-100">
          <p className="text-sm font-bold text-indigo-700">Payment</p>
          <p className="text-xs text-gray-500 mt-1">Advance, claim, credit, or loan?</p>
        </div>
      </div>
      <p className="text-xs text-indigo-600 mt-4 italic">
        Verify each answer on the current official program page. Directory presence does not prove an open intake or eligibility.
      </p>
    </div>
  );
}
