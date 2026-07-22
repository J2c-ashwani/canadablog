import Link from 'next/link';

interface FAQ {
  q: string;
  a: string;
}

interface ProvincePageProps {
  provinceName: string;
  provinceCode: string;
  heroHeadline: string;
  heroSubheadline: string;
  regionalInsights: string;
  faqs: FAQ[];
  relatedResources: Array<{ name: string; url: string }>;
}

export function MCAProvincePage({
  provinceName,
  provinceCode,
  heroHeadline,
  heroSubheadline,
  regionalInsights,
  faqs,
  relatedResources,
}: ProvincePageProps) {
  // Generate FAQ Schema JSON-LD dynamically
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-16">
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-16 sm:py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-blue-400 font-extrabold text-xs uppercase tracking-widest bg-blue-950/50 border border-blue-800/30 px-3 py-1 rounded-full">
            🇨🇦 PROVINCIAL FUNDING PORTAL · {provinceCode}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black mt-4 tracking-tight leading-none text-white">
            {heroHeadline}
          </h1>
          <p className="text-blue-200 mt-4 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            {heroSubheadline}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/apply?province=${provinceCode}`}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-lg text-base shadow-lg transition-transform active:scale-95"
            >
              Apply for {provinceName} Funding
            </Link>
            <Link
              href={`/funding-calculator?province=${provinceCode}`}
              className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-8 py-3.5 rounded-lg text-base border border-slate-700 transition-transform active:scale-95"
            >
              Calculate Funding Limit
            </Link>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="py-6 bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 flex flex-wrap justify-around gap-4 text-center text-sm font-semibold text-gray-600">
          <div>🇨🇦 Tailored for {provinceName} Businesses</div>
          <div>🔒 Secure File Upload &amp; Review</div>
          <div>⏱ Fast 24–72 Hour Underwriting</div>
          <div>💰 Funding Limits: $5,000 – $250,000</div>
        </div>
      </section>

      {/* Regional Insights */}
      <section className="max-w-4xl mx-auto px-6 mt-16">
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-black text-gray-900 mb-4 text-left font-sans">
            Business Funding Landscape in {provinceName}
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">{regionalInsights}</p>
          <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4 text-xs text-emerald-800 leading-relaxed">
            <strong>Note for {provinceName} business owners:</strong> Federal and provincial grants can be combined with working capital advances to optimize your overall cash position.
          </div>
        </div>
      </section>

      {/* Redesigned 3-Step Process Section */}
      <section className="max-w-4xl mx-auto px-6 mt-16">
        <h2 className="text-2xl font-black text-gray-900 text-center mb-8">How it Works: Fast Track Funding</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-xs text-left">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-black text-lg mb-4">1</div>
            <h4 className="font-bold text-gray-900 text-base mb-2">Check Eligibility</h4>
            <p className="text-gray-500 text-xs leading-relaxed">Fill out our quick 2-minute pre-qualification form with your basic company details.</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-xs text-left">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-black text-lg mb-4">2</div>
            <h4 className="font-bold text-gray-900 text-base mb-2">Secure Assessment</h4>
            <p className="text-gray-500 text-xs leading-relaxed">Upload recent bank statements. Our underwriters review cash flows without affecting credit scores.</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-xs text-left">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-black text-lg mb-4">3</div>
            <h4 className="font-bold text-gray-900 text-base mb-2">Funds Disbursed</h4>
            <p className="text-gray-500 text-xs leading-relaxed">Once approved, sign the contract and receive up to $250,000 directly in your account in 24-72 hours.</p>
          </div>
        </div>
      </section>

      {/* Redesigned Comparison Matrix Section */}
      <section className="max-w-4xl mx-auto px-6 mt-16">
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm">
          <h2 className="text-xl font-black text-gray-900 mb-6 text-center">Government Grants vs. Working Capital Advances</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="p-3 font-bold text-gray-700">Feature</th>
                  <th className="p-3 font-bold text-gray-700">Government Grants</th>
                  <th className="p-3 font-bold text-blue-800 bg-blue-50/50">Working Capital Advance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="p-3 font-semibold text-gray-800">Processing Time</td>
                  <td className="p-3 text-gray-500">3 to 6+ Months (Slower review)</td>
                  <td className="p-3 text-blue-900 font-medium bg-blue-50/20">24 to 72 Hours (Urgent liquidity)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-gray-800">Approval Probability</td>
                  <td className="p-3 text-gray-500">Lower (Highly competitive, strict quotas)</td>
                  <td className="p-3 text-blue-900 font-medium bg-blue-50/20">High (Based on monthly deposits)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-gray-800">Usage Restrictions</td>
                  <td className="p-3 text-gray-500">Restricted (Pre-approved project milestones)</td>
                  <td className="p-3 text-blue-900 font-medium bg-blue-50/20">Unrestricted (Payroll, inventory, marketing)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-gray-800">Collateral Required</td>
                  <td className="p-3 text-gray-500">None required</td>
                  <td className="p-3 text-blue-900 font-medium bg-blue-50/20">None required</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Redesigned Industry Sector Grid Section */}
      <section className="max-w-4xl mx-auto px-6 mt-16">
        <h2 className="text-2xl font-black text-gray-900 text-center mb-8">Eligible Business Sectors in {provinceName}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-left">
          <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-xs">
            <h5 className="font-bold text-gray-900 text-sm mb-1">Retail & E-commerce</h5>
            <p className="text-gray-500 text-[11px] leading-relaxed">Inventory procurement and peak season working capital.</p>
          </div>
          <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-xs">
            <h5 className="font-bold text-gray-900 text-sm mb-1">Construction & Trades</h5>
            <p className="text-gray-500 text-[11px] leading-relaxed">Funding for equipment purchases and payroll coverage.</p>
          </div>
          <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-xs">
            <h5 className="font-bold text-gray-900 text-sm mb-1">Transport & Logistics</h5>
            <p className="text-gray-500 text-[11px] leading-relaxed">Fuel financing, fleet maintenance, and driver payroll.</p>
          </div>
          <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-xs">
            <h5 className="font-bold text-gray-900 text-sm mb-1">Manufacturing</h5>
            <p className="text-gray-500 text-[11px] leading-relaxed">Raw materials stocking and equipment repairs.</p>
          </div>
          <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-xs">
            <h5 className="font-bold text-gray-900 text-sm mb-1">Healthcare & Medical</h5>
            <p className="text-gray-500 text-[11px] leading-relaxed">Specialized equipment acquisition and clinic expansion.</p>
          </div>
          <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-xs">
            <h5 className="font-bold text-gray-900 text-sm mb-1">Professional Services</h5>
            <p className="text-gray-500 text-[11px] leading-relaxed">Contract expansion and client acquisition campaigns.</p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-4xl mx-auto px-6 mt-16">
        <h2 className="text-2xl font-black text-gray-900 text-center mb-10">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-left">
              <h4 className="font-bold text-gray-900 text-base mb-2">{faq.q}</h4>
              <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related Resources */}
      <section className="max-w-4xl mx-auto px-6 mt-16 border-t border-gray-200 pt-10 text-center">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Related Funding Resources</h3>
        <div className="flex flex-wrap justify-center gap-4 text-xs font-semibold">
          {relatedResources.map((res, i) => (
            <Link key={i} href={res.url} className="text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded-full transition">
              {res.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
