import React from 'react';
import { MessageCircleQuestion } from 'lucide-react';

interface Props {
  industrySlug: string;
  cityName: string;
  program1: string;
}

export default function MicroFAQ({ industrySlug, cityName, program1 }: Props) {
  const formattedIndustry = industrySlug.charAt(0).toUpperCase() + industrySlug.slice(1);

  // Generate hyper-specific long-tail questions
  const faqs = [
    {
      q: `Can a ${formattedIndustry.toLowerCase()} startup get grants in ${cityName} with no employees?`,
      a: `Technically possible, but extremely limited. Most state discretionary grants require a minimum of 3-5 W-2 employees. However, automated tax credit programs (R&D credits, WOTC) have no employee minimum and can be claimed on your annual filing.`
    },
    {
      q: `What is the minimum revenue to qualify for the ${program1}?`,
      a: `Most state flagship programs like the ${program1} don't publish a hard revenue floor, but in practice, companies below $250K annual revenue are rarely approved for discretionary awards. The unstated filter is job creation commitments — you need to credibly promise 5-10+ new hires within 24 months.`
    },
    {
      q: `How long does it actually take to receive grant money in ${cityName}?`,
      a: `Expect 90-180 days from application submission to first disbursement for most state programs. Critical catch: most grants reimburse expenses — meaning you spend first, then get paid back. Budget accordingly and do not rely on grant money for immediate operational cash flow.`
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
