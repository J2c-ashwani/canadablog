import React from 'react';

interface Props {
  cityName: string;
  industrySlug: string;
  topProgram: string;
  tier: 'A' | 'B' | 'C';
}

export default function AnchorBlock({ cityName, industrySlug, topProgram, tier }: Props) {
  // Format industry nicely (e.g., 'manufacturing' -> 'Manufacturing')
  const formattedIndustry = industrySlug.charAt(0).toUpperCase() + industrySlug.slice(1);
  const dateObj = new Date();
  const currentMonth = dateObj.toLocaleString('en-US', { month: 'long' });
  const currentYear = dateObj.getFullYear();

  return (
    <div className="prose max-w-none mb-12 text-gray-700 leading-relaxed text-lg">
      <p>
        Securing government funding for a {formattedIndustry} business in <strong>{cityName}</strong> is fundamentally different than navigating federal programs. As of {currentMonth} {currentYear}, the state economic development apparatus is actively shifting its capital deployment strategy. While generic national directories might tell you to apply for basic SBA loans, the reality on the ground in {cityName} requires a targeted approach built around high-leverage state assets like the <strong>{topProgram}</strong>.
      </p>
      <p>
        Because {cityName} operates as a Tier {tier} growth zone, the state evaluates expansion proposals—including property acquisition, workforce training, and capital equipment purchases—through a strict localized lens. You should not treat a state application here like a traditional bank loan. You must position your {formattedIndustry} company as a direct solution to the state's regional economic mandates. The following brief outlines the specific constraints, hidden advantages, and structural realities of securing operational capital in this specific corridor.
      </p>
    </div>
  );
}
