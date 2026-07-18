import Link from 'next/link';

interface FAQ {
  q: string;
  a: string;
}

interface CommercialPageProps {
  keyword: string;
  title: string;
  description: string;
  heroHeadline: string;
  heroSubheadline: string;
  advantages: string[];
  disadvantages: string[];
  faqs: FAQ[];
  relatedResources: Array<{ name: string; url: string }>;
}

export function MCACommercialPage({
  keyword,
  title,
  description,
  heroHeadline,
  heroSubheadline,
  advantages,
  disadvantages,
  faqs,
  relatedResources,
}: CommercialPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-16 sm:py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-blue-400 font-extrabold text-xs uppercase tracking-widest bg-blue-950/50 border border-blue-800/30 px-3 py-1 rounded-full">
            🇨🇦 CANADIAN BUSINESS SOLUTIONS
          </span>
          <h1 className="text-3xl sm:text-5xl font-black mt-4 tracking-tight leading-none text-white">
            {heroHeadline}
          </h1>
          <p className="text-blue-200 mt-4 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            {heroSubheadline}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/apply" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-lg text-base shadow-lg transition-transform active:scale-95">
              Check Your Eligibility Now
            </Link>
            <Link href="/funding-calculator" className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-8 py-3.5 rounded-lg text-base border border-slate-700 transition-transform active:scale-95">
              Calculate Funding Limit
            </Link>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="py-6 bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 flex flex-wrap justify-around gap-4 text-center text-sm font-semibold text-gray-600">
          <div>🇨🇦 100% Canadian Owned &amp; Operated</div>
          <div>🔒 Bank-Grade 256-bit Encryption</div>
          <div>⚡ 24 to 72 Hour Funding Decision</div>
          <div>📈 No Asset Collateral Required</div>
        </div>
      </section>

      {/* Value Prop & Eligibility Grid */}
      <section className="max-w-5xl mx-auto px-6 mt-16 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-black text-gray-900 mb-4">
            How {keyword} Works
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            Unlike traditional bank loans that require business plans, financial projections, and assets
            as collateral, we qualify your business based on your average monthly deposit history.
          </p>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="text-blue-600 font-bold text-lg">01.</div>
              <div>
                <strong className="text-gray-900 block text-sm">Apply Online</strong>
                <span className="text-gray-500 text-xs">Fill out our secure 3-step application form in under 3 minutes.</span>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="text-blue-600 font-bold text-lg">02.</div>
              <div>
                <strong className="text-gray-900 block text-sm">Verify Deposits</strong>
                <span className="text-gray-500 text-xs">Upload your last 6 months of bank statements to establish monthly revenue.</span>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="text-blue-600 font-bold text-lg">03.</div>
              <div>
                <strong className="text-gray-900 block text-sm">Receive Capital</strong>
                <span className="text-gray-500 text-xs">Approval decision is reached within 24–72 hours and funds are wired to your account.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Eligibility criteria */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Minimum Eligibility Criteria</h3>
          <ul className="space-y-3.5 mb-6 text-sm text-gray-600">
            <li className="flex items-center gap-2">
              <span className="text-emerald-500">✔</span> Active business operations in Canada
            </li>
            <li className="flex items-center gap-2">
              <span className="text-emerald-500">✔</span> At least 6 months of active sales history
            </li>
            <li className="flex items-center gap-2">
              <span className="text-emerald-500">✔</span> Minimum $10,000 in monthly revenue deposits
            </li>
            <li className="flex items-center gap-2">
              <span className="text-emerald-500">✔</span> Clean business checking account history
            </li>
          </ul>
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-xs text-blue-800 leading-relaxed">
            <strong>Required documents for review:</strong> Clean PDF copies of your last 6 months of business bank statements. No screenshots or paper photos.
          </div>
        </div>
      </section>

      {/* Pros & Cons */}
      <section className="max-w-5xl mx-auto px-6 mt-16">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Advantages */}
          <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-8">
            <h3 className="text-lg font-bold text-emerald-900 mb-4">Advantages</h3>
            <ul className="space-y-3 text-sm text-emerald-800">
              {advantages.map((adv, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span> {adv}
                </li>
              ))}
            </ul>
          </div>

          {/* Disadvantages */}
          <div className="bg-red-50/50 border border-red-100 rounded-2xl p-8">
            <h3 className="text-lg font-bold text-red-900 mb-4">Disadvantages</h3>
            <ul className="space-y-3 text-sm text-red-800">
              {disadvantages.map((dis, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✕</span> {dis}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-4xl mx-auto px-6 mt-20">
        <h2 className="text-2xl font-black text-gray-900 text-center mb-10">
          Frequently Asked Questions About {keyword}
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

      {/* Internal Links & Footer resources */}
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
