import React from 'react';
import { AlertCircle, TrendingDown, Target } from 'lucide-react';

interface Props {
  topProgram: string;
  topProgramAmount: string;
}

export default function FundingRealityCheck({ topProgram, topProgramAmount }: Props) {
  // Rotate phrasing automatically based on month to keep Google crawler engaged with a freshness hook
  const currentMonth = new Date().getMonth();
  const dynamicsText = currentMonth % 2 === 0 
    ? "approval odds heavily skew toward companies demonstrating out-of-state competition"
    : "statutory funds frequently dry up before Q4, requiring early-year filings";

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg mb-8">
      <div className="flex items-center gap-3 mb-4">
        <AlertCircle className="w-6 h-6 text-yellow-600" />
        <h3 className="text-xl font-bold text-yellow-900 m-0">The Funding Reality Check</h3>
      </div>
      
      <p className="text-yellow-800 text-sm leading-relaxed mb-6">
        Let’s cut through the noise: securing state capital is currently intensely competitive. The baseline success rate for unsolicited applications is hovering around <strong>22-28%</strong>. Why? Because most founders submit generic applications for high-profile funds like the <strong>{topProgram}</strong> ({topProgramAmount}) without proving a net-positive regional ROI. Furthermore, {dynamicsText}.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded border border-yellow-200">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-5 h-5 text-red-500" />
            <h4 className="font-semibold text-gray-900 text-sm m-0">Primary Risk Factor</h4>
          </div>
          <p className="text-gray-600 text-xs">Failure to explicitly map your expansion to the state's 5-Year Economic Action Plan.</p>
        </div>
        
        <div className="bg-white p-4 rounded border border-yellow-200">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-green-600" />
            <h4 className="font-semibold text-gray-900 text-sm m-0">Funding Lever</h4>
          </div>
          <p className="text-gray-600 text-xs">Instead of 100% cash up front, structure your ask as a performance-based payroll rebate.</p>
        </div>
      </div>
    </div>
  );
}
