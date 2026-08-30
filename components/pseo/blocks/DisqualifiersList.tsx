import React from 'react';
import { XCircle } from 'lucide-react';

interface Props {
  industrySlug: string;
  program2: string;
  regionType?: 'state' | 'province';
}

export default function DisqualifiersList({ industrySlug, program2, regionType = 'state' }: Props) {
  const formattedIndustry = industrySlug.charAt(0).toUpperCase() + industrySlug.slice(1);
  const regionLabel = regionType === 'province' ? 'provincial' : 'state';

  return (
    <div className="bg-red-50 p-6 rounded-lg mb-8 border border-red-100">
      <h3 className="text-xl font-bold text-red-900 mb-4 flex items-center gap-2 m-0">
        <XCircle className="w-6 h-6 text-red-600" />
        Eligibility Checks for {formattedIndustry}
      </h3>
      <p className="text-red-800 text-sm mb-4">
        Before applying through <strong>{program2}</strong>, compare these items with the current official guide. They are common checks, not universal rules:
      </p>
      
      <ul className="space-y-3">
        <li className="flex gap-2 text-sm text-red-700">
          <span className="font-bold shrink-0">1.</span>
          <span><strong>Applicant fit:</strong> Confirm entity type, ownership, location, operating history, sector, and any employee or revenue test.</span>
        </li>
        <li className="flex gap-2 text-sm text-red-700">
          <span className="font-bold shrink-0">2.</span>
          <span><strong>Project fit:</strong> Confirm the cost category, project location, measurable outcome, matching funds, and required permits or approvals.</span>
        </li>
        <li className="flex gap-2 text-sm text-red-700">
          <span className="font-bold shrink-0">3.</span>
          <span><strong>Timing:</strong> Check whether the {regionLabel} or federal program excludes costs committed before application, approval, or a signed agreement.</span>
        </li>
      </ul>
    </div>
  );
}
