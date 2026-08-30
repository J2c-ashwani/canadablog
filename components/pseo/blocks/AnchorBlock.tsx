import React from 'react';

interface Props {
  cityName: string;
  industrySlug: string;
  program1: string;
  amount1: string;
  program2: string;
  amount2: string;
  tier: 'A' | 'B' | 'C';
  regionType?: 'state' | 'province';
}

export default function AnchorBlock({ cityName, industrySlug, program1, amount1, program2, amount2, regionType = 'state' }: Props) {
  const formattedIndustry = industrySlug.charAt(0).toUpperCase() + industrySlug.slice(1);
  const regionNoun = regionType === 'province' ? 'province' : 'state';
  const regionalFundingLabel = regionType === 'province' ? 'provincial funding' : 'state funding';
  
  return (
    <div className="prose max-w-none mb-12 text-gray-700 leading-relaxed text-lg">
      <p>
        Funding research for a <strong>{formattedIndustry}</strong> business in <strong>{cityName}</strong> should begin with the project, not a list of grants. Define the cost you need to fund, the expected outcome, the location of the work, and when spending will begin. Those facts determine whether a grant, tax credit, wage subsidy, loan, or advisory program is the relevant route.
      </p>
      <p>
        Start by checking the <strong>{program1}</strong> ({amount1}) and <strong>{program2}</strong> ({amount2}). Treat these as research paths, not guaranteed awards. Confirm the current intake, eligible applicants, eligible costs, matching-fund rules, and pre-approval requirements on the administering agency's official page before committing money. Strong {regionalFundingLabel} applications usually connect a documented business project to measurable outcomes for the {regionNoun} or local community.
      </p>
    </div>
  );
}
