import React from 'react';
import { Ban } from 'lucide-react';

export default function WhoShouldLeave() {
  return (
    <div className="bg-gray-900 text-white p-6 rounded-xl mb-8">
      <h3 className="text-lg font-bold text-white flex items-center gap-2 m-0 mb-4">
        <Ban className="w-5 h-5 text-red-400" />
        Who Should NOT Build Here (Honest Warning)
      </h3>
      <p className="text-sm text-gray-300 mb-4">
        We believe in saving you time. If your business fits any of these profiles, this region is structurally disadvantaged for you:
      </p>
      <ul className="space-y-3">
        <li className="flex gap-3 text-sm">
          <span className="text-red-400 font-bold shrink-0">✕</span>
          <span className="text-gray-200"><strong>Pure e-commerce / dropshipping:</strong> State incentives are laser-focused on physical job creation and capital equipment purchases. Don't waste time applying — you will be auto-rejected regardless of revenue.</span>
        </li>
        <li className="flex gap-3 text-sm">
          <span className="text-red-400 font-bold shrink-0">✕</span>
          <span className="text-gray-200"><strong>Pre-revenue bootstrappers with no employees:</strong> Most discretionary state grants require a minimum of 3-5 W-2 employees and $250K+ annual revenue. If you're not there yet, start with federal SBIR/STTR instead.</span>
        </li>
        <li className="flex gap-3 text-sm">
          <span className="text-red-400 font-bold shrink-0">✕</span>
          <span className="text-gray-200"><strong>Businesses unwilling to commit to a 3-year stay:</strong> Clawback provisions are standard. If you take state money and relocate within 36 months, you will owe 100% of the grant back plus penalties.</span>
        </li>
      </ul>
      <p className="text-xs text-gray-500 mt-4">
        This isn't discouragement — it's strategic triage. Applying to programs you structurally cannot win wastes months of operational focus.
      </p>
    </div>
  );
}
