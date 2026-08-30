import React from 'react';
import { XCircle } from 'lucide-react';

interface Props {
  industrySlug: string;
  program2: string;
}

export default function DisqualifiersList({ industrySlug, program2 }: Props) {
  // Deterministic fake rotation based on industry to look dynamic
  const formattedIndustry = industrySlug.charAt(0).toUpperCase() + industrySlug.slice(1);
  const isTech = ['technology', 'software', 'fintech'].includes(industrySlug.toLowerCase());

  return (
    <div className="bg-red-50 p-6 rounded-lg mb-8 border border-red-100">
      <h3 className="text-xl font-bold text-red-900 mb-4 flex items-center gap-2 m-0">
        <XCircle className="w-6 h-6 text-red-600" />
        Critical Disqualifiers for {formattedIndustry}
      </h3>
      <p className="text-red-800 text-sm mb-4">
        Do not waste 6 weeks applying for discretionary funds like the <strong>{program2}</strong> if your expansion triggers any of these hidden disqualifiers:
      </p>
      
      <ul className="space-y-3">
        {isTech ? (
          <>
            <li className="flex gap-2 text-sm text-red-700">
              <span className="font-bold shrink-0">1.</span>
              <span><strong>The "Remote Worker" Trap:</strong> Most state subsidies require employees to physically reside and work inside the state lines 51% of the year. Standard SaaS remote models are frequently disqualified.</span>
            </li>
            <li className="flex gap-2 text-sm text-red-700">
              <span className="font-bold shrink-0">2.</span>
              <span><strong>Pre-Revenue R&D:</strong> State funds generally do not seed pre-revenue product development unless explicitly tied to a state-backed university incubator.</span>
            </li>
          </>
        ) : (
          <>
            <li className="flex gap-2 text-sm text-red-700">
              <span className="font-bold shrink-0">1.</span>
              <span><strong>Zoning Compliance Failures:</strong> Applying for heavy equipment grants before securing environmental and municipal zoning variances guarantees an immediate denial.</span>
            </li>
            <li className="flex gap-2 text-sm text-red-700">
              <span className="font-bold shrink-0">2.</span>
              <span><strong>Prevailing Wage Violations:</strong> Many state-level capital expansion grants legally require you to sign agreements to pay "prevailing union wages" for construction and installation.</span>
            </li>
          </>
        )}
        <li className="flex gap-2 text-sm text-red-700">
          <span className="font-bold shrink-0">3.</span>
          <span><strong>The Signed Lease Penalty:</strong> If you sign your commercial lease <em>before</em> receiving the formal grant offer letter, the state will claim the grant wasn't an "inducement" and reject your application.</span>
        </li>
      </ul>
    </div>
  );
}
