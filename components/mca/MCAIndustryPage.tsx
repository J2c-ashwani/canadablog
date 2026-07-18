import Link from 'next/link';

interface FAQ {
  q: string;
  a: string;
}

interface IndustryPageProps {
  industryName: string;
  heroHeadline: string;
  heroSubheadline: string;
  useCases: string[];
  faqs: FAQ[];
  relatedResources: Array<{ name: string; url: string }>;
}

export function MCAIndustryPage({
  industryName,
  heroHeadline,
  heroSubheadline,
  useCases,
  faqs,
  relatedResources,
}: IndustryPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white py-16 sm:py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-emerald-400 font-extrabold text-xs uppercase tracking-widest bg-emerald-950/50 border border-emerald-800/30 px-3 py-1 rounded-full">
            🇨🇦 CANADIAN INDUSTRY SECTOR SOLUTIONS
          </span>
          <h1 className="text-3xl sm:text-5xl font-black mt-4 tracking-tight leading-none text-white">
            {heroHeadline}
          </h1>
          <p className="text-emerald-200 mt-4 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            {heroSubheadline}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/apply?industry=${encodeURIComponent(industryName)}`}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3.5 rounded-lg text-base shadow-lg transition-transform active:scale-95"
            >
              Get Funded — Start Application
            </Link>
            <Link
              href={`/funding-calculator?industry=${encodeURIComponent(industryName)}`}
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
          <div>🇨🇦 Fast-track review for {industryName}s</div>
          <div>🔒 Secure Upload &amp; Data Privacy</div>
          <div>⏱ Approvals in 24–72 Hours</div>
          <div>💰 Funding limits up to $250,000</div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="max-w-4xl mx-auto px-6 mt-16">
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-black text-gray-900 mb-6 text-center">
            Common Uses of Funding for {industryName}s
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {useCases.map((useCase, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="text-emerald-600 font-bold text-lg">✓</span>
                <p className="text-gray-600 text-sm leading-relaxed">{useCase}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verification Notice */}
      <section className="max-w-4xl mx-auto px-6 mt-10">
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="text-center sm:text-left">
            <h3 className="font-bold text-blue-900 text-base">Required Documents for {industryName}s</h3>
            <p className="text-blue-800 text-xs mt-1">
              Provide your last 6 months of business bank statements. Automated cash flow verification matches you instantly.
            </p>
          </div>
          <Link
            href={`/apply?industry=${encodeURIComponent(industryName)}`}
            className="bg-blue-600 text-white font-bold px-6 py-3 rounded-lg text-sm transition hover:bg-blue-700 whitespace-nowrap shadow-md"
          >
            Start Free Application
          </Link>
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
