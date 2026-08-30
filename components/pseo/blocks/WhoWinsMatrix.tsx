import React from 'react';
import { Trophy } from 'lucide-react';

export default function WhoWinsMatrix() {
  return (
    <div className="mb-8 border border-gray-200 rounded-xl overflow-hidden">
      <div className="bg-emerald-50 px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-bold text-emerald-900 flex items-center gap-2 m-0">
          <Trophy className="w-5 h-5 text-emerald-600" />
          What Reviewers Commonly Compare
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="px-6 py-3 font-semibold text-gray-700">Profile</th>
              <th className="px-6 py-3 font-semibold text-gray-700">Evidence to prepare</th>
              <th className="px-6 py-3 font-semibold text-gray-700">What to verify</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr>
              <td className="px-6 py-3 font-medium text-gray-900">Hiring or expansion project</td>
              <td className="px-6 py-3 text-gray-600">Payroll plan, quotes, location, timeline</td>
              <td className="px-6 py-3 text-gray-600">Eligible jobs, costs, geography, start date</td>
            </tr>
            <tr className="bg-gray-50/50">
              <td className="px-6 py-3 font-medium text-gray-900">Research and development project</td>
              <td className="px-6 py-3 text-gray-600">Technical risk, work plan, team, market evidence</td>
              <td className="px-6 py-3 text-gray-600">Novelty, ownership, work location, eligible spend</td>
            </tr>
            <tr>
              <td className="px-6 py-3 font-medium text-gray-900">Local improvement project</td>
              <td className="px-6 py-3 text-gray-600">Address, permits, landlord consent, itemized quotes</td>
              <td className="px-6 py-3 text-gray-600">Boundary, approved improvements, matching funds</td>
            </tr>
            <tr className="bg-gray-50/50">
              <td className="px-6 py-3 font-medium text-gray-900">Energy or environmental project</td>
              <td className="px-6 py-3 text-gray-600">Baseline, technical scope, savings or impact model</td>
              <td className="px-6 py-3 text-gray-600">Eligible equipment, site, standards, incentive stacking</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
