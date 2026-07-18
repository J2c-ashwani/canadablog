import Link from 'next/link';

export const metadata = {
  title: 'Why Business Funding Applications Get Declined | FSI Digital Advisory',
  description:
    'Discover the top 8 reasons Canadian business funding and cash advances get declined, and how to fix them before submitting to a partner.',
  alternates: {
    canonical: 'https://www.fsidigital.ca/why-businesses-get-declined',
  },
};

const DECLINE_REASONS = [
  {
    num: '1',
    title: 'Inconsistent Bank Deposits',
    desc: 'Funding partners check your daily and weekly bank balances. If your accounts show frequent negative balances, insufficient funds (NSF) events, or sporadic deposits, it signals high cash flow volatility.',
    fix: 'Maintain a positive daily balance for at least 30 days and avoid any overdrafts before applying.',
  },
  {
    num: '2',
    title: 'Insufficient Monthly Revenue',
    desc: 'Most Canadian working capital partners require a minimum of $10,000 in average monthly deposits. If your business falls below this threshold, traditional cash advances are rarely approved.',
    fix: 'Ensure all business revenue goes through a single business checking account to show the complete picture.',
  },
  {
    num: '3',
    title: 'Time in Business under 6 Months',
    desc: 'Startups under 6 months old are considered high-risk. Lenders need historical deposit data to calculate advance amounts.',
    fix: 'Focus on government startup grants first, then apply for revenue-based funding once you hit the 6-month mark.',
  },
  {
    num: '4',
    title: 'Too Many Active Funding Positions',
    desc: 'If you already have two or more active cash advances (known as stacking), partners are reluctant to add another position because it drains your daily cash flow.',
    fix: 'Consolidate existing positions or pay down at least 50% of your active advance before requesting more capital.',
  },
  {
    num: '5',
    title: 'High-Risk Industry Category',
    desc: 'Certain industries (like legal, adult entertainment, speculative finance, or heavy machinery) carry higher default rates and are restricted by some underwriters.',
    fix: 'Work with specialized niche lenders who understand your specific industry risk profile.',
  },
  {
    num: '6',
    title: 'Tax Liens or Unresolved Bankruptcies',
    desc: 'Active government tax liens, unresolved corporate bankruptcies, or open judgements will halt the underwriting process immediately.',
    fix: 'Settle tax liabilities or set up a formal payment arrangement with the CRA before submitting.',
  },
  {
    num: '7',
    title: 'Mismatched Legal Documentation',
    desc: 'Different business names, expired registration certificates, or unmatched bank account names create fraud flags in automated underwriting systems.',
    fix: 'Verify that your legal registration matches your bank account and application details exactly.',
  },
  {
    num: '8',
    title: 'Weak Bank Statement Quality',
    desc: 'Submitting low-resolution photos, screenshots, or incomplete statement pages (missing pages) prevents optical character recognition (OCR) verification.',
    fix: 'Always upload full, clean, original electronic PDF statements directly downloaded from your bank.',
  },
];

export default function WhyDeclinedPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-950 via-slate-900 to-slate-900 text-white py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-red-400 font-extrabold text-xs uppercase tracking-widest bg-red-950/50 border border-red-800/30 px-3 py-1 rounded-full">
            Decision-Stage Insights
          </span>
          <h1 className="text-3xl sm:text-5xl font-black mt-4 tracking-tight leading-none text-white">
            Why Business Funding Applications Get Declined
          </h1>
          <p className="text-gray-300 mt-4 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Understanding why underwriters say &ldquo;no&rdquo; is the first step to getting approved.
            Explore the top 8 decline reasons and how you can optimize your file.
          </p>
        </div>
      </section>

      {/* Pre-Submission Document Review Banner */}
      <section className="max-w-4xl mx-auto px-6 mt-10">
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-blue-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="max-w-xl text-center md:text-left">
            <span className="bg-blue-800 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
              Optional Document Review
            </span>
            <h2 className="text-xl sm:text-2xl font-black mt-3 text-white">
              Want a specialist to review your application before submission?
            </h2>
            <p className="text-blue-100 text-sm mt-2 leading-relaxed">
              Our specialists identify and resolve bank statement issues, file anomalies,
              and formatting errors before they reach underwriters, reducing avoidable rejection risk.
            </p>
          </div>
          <Link href="/apply" className="bg-white text-blue-900 font-extrabold px-6 py-3 rounded-lg text-sm transition hover:bg-gray-100 whitespace-nowrap shadow-lg">
            📋 Apply with Pre-Submission Review
          </Link>
        </div>
      </section>

      {/* 8 Reasons List */}
      <section className="max-w-4xl mx-auto px-6 mt-12">
        <div className="space-y-8">
          {DECLINE_REASONS.map((reason) => (
            <div key={reason.num} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex gap-4">
              <div className="w-12 h-12 rounded-lg bg-red-50 text-red-600 font-black text-xl flex items-center justify-center flex-shrink-0">
                {reason.num}
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-gray-900">{reason.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{reason.desc}</p>
                <div className="bg-emerald-50 text-emerald-800 text-xs px-3 py-2 rounded-lg font-medium border border-emerald-100 mt-2">
                  <strong>💡 How to resolve:</strong> {reason.fix}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust bar / Callout */}
      <section className="max-w-4xl mx-auto px-6 mt-12 text-center">
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Maximize Your Approval Probability</h3>
          <p className="text-gray-500 text-sm max-w-lg mx-auto mb-6">
            Correcting simple document omissions or deposit reporting structures increases partner acceptance rates by up to 40%.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/funding-calculator" className="border border-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-lg text-sm transition hover:bg-gray-50">
              Calculate Funding Eligibility
            </Link>
            <Link href="/apply" className="bg-blue-600 text-white font-bold px-6 py-3 rounded-lg text-sm transition hover:bg-blue-700 shadow-md">
              Start Application Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
