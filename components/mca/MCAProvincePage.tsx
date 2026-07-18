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
  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-16">
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
          <h2 className="text-2xl font-black text-gray-900 mb-4 text-left">
            Business Funding Landscape in {provinceName}
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">{regionalInsights}</p>
          <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4 text-xs text-emerald-800 leading-relaxed">
            <strong>Note for {provinceName} business owners:</strong> Federal and provincial grants can be combined with working capital advances to optimize your overall cash position.
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
            <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
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
