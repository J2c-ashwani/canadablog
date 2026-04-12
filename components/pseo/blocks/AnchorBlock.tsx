import React from 'react';

interface Props {
  cityName: string;
  industrySlug: string;
  program1: string;
  amount1: string;
  program2: string;
  amount2: string;
  tier: 'A' | 'B' | 'C';
}

export default function AnchorBlock({ cityName, industrySlug, program1, amount1, program2, amount2, tier }: Props) {
  const formattedIndustry = industrySlug.charAt(0).toUpperCase() + industrySlug.slice(1);
  
  return (
    <div className="prose max-w-none mb-12 text-gray-700 leading-relaxed text-lg">
      <p>
        Securing government capital in <strong>{cityName}</strong> is not about having a good business plan; it is about proving strict alignment with regional economic deficits. While novice founders waste months chasing highly publicized national SBIR grants, sophisticated {formattedIndustry} operators in this corridor quietly execute localized capital stacks. You must view state funding not as a "startup lottery," but as a highly structured procurement transaction.
      </p>
      <p>
        Because {cityName} operates as a Tier {tier} economic zone, your primary leverage is job retention and capital equipment investment. The state is currently utilizing heavy-hitting incentive vehicles like the <strong>{program1}</strong> ({amount1}) to aggressively outbid neighboring regions. Furthermore, operators executing local hiring initiatives are simultaneously layering the <strong>{program2}</strong> ({amount2}) specifically to offset scale-up risks. If your {formattedIndustry} firm cannot explicitly prove a 3x ROI to the state's tax base within 24 months, your application will be silently archived.
      </p>
    </div>
  );
}
