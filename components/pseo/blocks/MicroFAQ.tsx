import React from 'react';
import { MessageCircleQuestion } from 'lucide-react';

interface Props {
  industrySlug: string;
  cityName: string;
  program1: string;
  regionType?: 'state' | 'province';
}

export default function MicroFAQ({ industrySlug, cityName, program1, regionType = 'state' }: Props) {
  const formattedIndustry = industrySlug.charAt(0).toUpperCase() + industrySlug.slice(1);
  const regionProgramLabel = regionType === 'province' ? 'provincial programs' : 'state programs';

  // Generate hyper-specific long-tail questions
  const faqs = [
    {
      q: `Can a ${formattedIndustry.toLowerCase()} startup get grants in ${cityName} with no employees?`,
      a: `Possibly. Some research, founder, competition, or early-stage programs accept companies without employees, while many hiring and expansion programs do not. Check the applicant, project-stage, payroll, and operating-history rules for the exact program.`
    },
    {
      q: `What is the minimum revenue to qualify for the ${program1}?`,
      a: `Do not infer a revenue threshold. ${regionProgramLabel} use different tests, and ${program1} may be a directory or program family rather than a single open award. Use the current official eligibility guide and ask the administrator if the rule is unclear.`
    },
    {
      q: `How long does it actually take to receive grant money in ${cityName}?`,
      a: `Timing varies from rolling support to multi-stage competitive review. Some programs reimburse approved costs and others use different payment structures. Use the official service standard or agreement, and do not rely on unapproved funding for immediate operating cash.`
    }
  ];

  // Show 2-3 based on diversity
  const visibleFaqs = faqs.slice(0, cityName.length % 2 === 0 ? 3 : 2);

  return (
    <div className="bg-teal-50 border border-teal-200 p-6 rounded-xl mb-8">
      <h3 className="text-lg font-bold text-teal-900 flex items-center gap-2 m-0 mb-4">
        <MessageCircleQuestion className="w-5 h-5 text-teal-600" />
        Quick Answers (People Also Ask)
      </h3>
      <div className="space-y-4">
        {visibleFaqs.map((faq, idx) => (
          <details key={idx} className="bg-white rounded-lg border border-teal-100 group" open={idx === 0}>
            <summary className="px-4 py-3 cursor-pointer font-semibold text-sm text-gray-900 hover:text-teal-700 transition-colors list-none flex justify-between items-center">
              {faq.q}
              <span className="text-teal-500 group-open:rotate-180 transition-transform">▾</span>
            </summary>
            <div className="px-4 pb-3">
              <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
