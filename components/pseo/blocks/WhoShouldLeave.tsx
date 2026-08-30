import React from 'react';
import { Ban } from 'lucide-react';

export default function WhoShouldLeave({ regionType = 'state' }: { regionType?: 'state' | 'province' }) {
  const regionLabel = regionType === 'province' ? 'provincial' : 'state';

  return (
    <div className="bg-gray-900 text-white p-6 rounded-xl mb-8">
      <h3 className="text-lg font-bold text-white flex items-center gap-2 m-0 mb-4">
        <Ban className="w-5 h-5 text-red-400" />
        Who Should Pause Before Applying
      </h3>
      <p className="text-sm text-gray-300 mb-4">
        Save your application time until you can resolve these common readiness gaps:
      </p>
      <ul className="space-y-3">
        <li className="flex gap-3 text-sm">
          <span className="text-red-400 font-bold shrink-0">✕</span>
          <span className="text-gray-200"><strong>No defined project:</strong> General requests for rent, debt repayment, or unrestricted operating cash rarely match a competitive business program.</span>
        </li>
        <li className="flex gap-3 text-sm">
          <span className="text-red-400 font-bold shrink-0">✕</span>
          <span className="text-gray-200"><strong>No evidence file:</strong> If incorporation records, financials, quotes, ownership details, and a project budget are not ready, prepare them before submitting.</span>
        </li>
        <li className="flex gap-3 text-sm">
          <span className="text-red-400 font-bold shrink-0">✕</span>
          <span className="text-gray-200"><strong>Unconfirmed timing:</strong> Do not assume expenses already incurred will qualify. Check the official {regionLabel} or federal program rules before signing vendors or starting work.</span>
        </li>
      </ul>
      <p className="text-xs text-gray-500 mt-4">
        This is strategic triage, not a rejection. The controlling program guide—not this page—determines final eligibility.
      </p>
    </div>
  );
}
