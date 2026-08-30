import React from 'react';
import { BarChart3 } from 'lucide-react';

export default function FundingDensitySnapshot() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-xl mb-8">
      <h3 className="text-lg font-bold text-indigo-900 flex items-center gap-2 m-0 mb-4">
        <BarChart3 className="w-5 h-5 text-indigo-600" />
        Funding Density Snapshot ({currentYear})
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg text-center border border-indigo-100">
          <p className="text-2xl font-bold text-indigo-700">12–18</p>
          <p className="text-xs text-gray-500 mt-1">Active State Programs</p>
        </div>
        <div className="bg-white p-4 rounded-lg text-center border border-indigo-100">
          <p className="text-2xl font-bold text-indigo-700">$25K</p>
          <p className="text-xs text-gray-500 mt-1">Median Grant Size</p>
        </div>
        <div className="bg-white p-4 rounded-lg text-center border border-indigo-100">
          <p className="text-2xl font-bold text-indigo-700">3–6 mo</p>
          <p className="text-xs text-gray-500 mt-1">Avg. Approval Timeline</p>
        </div>
        <div className="bg-white p-4 rounded-lg text-center border border-indigo-100">
          <p className="text-2xl font-bold text-indigo-700">22%</p>
          <p className="text-xs text-gray-500 mt-1">Est. Success Rate</p>
        </div>
      </div>
      <p className="text-xs text-indigo-600 mt-4 italic">
        Data reflects state-level aggregated program availability for Tier A economic zones. Success rate based on discretionary programs only.
      </p>
    </div>
  );
}
