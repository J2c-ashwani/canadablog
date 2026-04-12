import React from 'react';
import { Trophy } from 'lucide-react';

export default function WhoWinsMatrix() {
  return (
    <div className="mb-8 border border-gray-200 rounded-xl overflow-hidden">
      <div className="bg-emerald-50 px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-bold text-emerald-900 flex items-center gap-2 m-0">
          <Trophy className="w-5 h-5 text-emerald-600" />
          Who Actually Wins Grants Here? (Profile Matrix)
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="px-6 py-3 font-semibold text-gray-700">Profile</th>
              <th className="px-6 py-3 font-semibold text-gray-700">Approval Odds</th>
              <th className="px-6 py-3 font-semibold text-gray-700">Why</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr>
              <td className="px-6 py-3 font-medium text-gray-900">Relocating manufacturer (50+ jobs)</td>
              <td className="px-6 py-3"><span className="inline-block px-2 py-0.5 bg-green-100 text-green-800 rounded text-xs font-bold">HIGH</span></td>
              <td className="px-6 py-3 text-gray-600">Job creation + capital investment = state priority #1</td>
            </tr>
            <tr className="bg-gray-50/50">
              <td className="px-6 py-3 font-medium text-gray-900">Tech startup (under 10 employees)</td>
              <td className="px-6 py-3"><span className="inline-block px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded text-xs font-bold">MODERATE</span></td>
              <td className="px-6 py-3 text-gray-600">Eligible for R&D credits, but rarely qualify for large discretionary funds</td>
            </tr>
            <tr>
              <td className="px-6 py-3 font-medium text-gray-900">Local retail / service business</td>
              <td className="px-6 py-3"><span className="inline-block px-2 py-0.5 bg-red-100 text-red-800 rounded text-xs font-bold">LOW</span></td>
              <td className="px-6 py-3 text-gray-600">States rarely fund non-export businesses; SBA microloans are the better path</td>
            </tr>
            <tr className="bg-gray-50/50">
              <td className="px-6 py-3 font-medium text-gray-900">Clean energy / EV / battery</td>
              <td className="px-6 py-3"><span className="inline-block px-2 py-0.5 bg-green-100 text-green-800 rounded text-xs font-bold">VERY HIGH</span></td>
              <td className="px-6 py-3 text-gray-600">Federal + state stacking available; IRA subsidies create 2x leverage</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
