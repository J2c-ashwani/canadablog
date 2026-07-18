import Link from 'next/link';

interface ResourcePageProps {
  title: string;
  description: string;
  author?: string;
  readTime: string;
  contentHtml: string;
  ctaText?: string;
  ctaUrl?: string;
}

export function MCAResourcePage({
  title,
  description,
  author = 'Funding Intelligence Analyst',
  readTime,
  contentHtml,
  ctaText = 'Apply for Business Funding',
  ctaUrl = '/apply',
}: ResourcePageProps) {
  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-16">
      {/* Article Header */}
      <section className="bg-gradient-to-br from-slate-900 to-blue-950 text-white py-12 sm:py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <Link href="/resources" className="text-blue-400 hover:text-blue-300 text-xs font-bold uppercase tracking-wider">
            ← Back to Resource Center
          </Link>
          <h1 className="text-2xl sm:text-4xl font-black mt-4 tracking-tight leading-tight text-white">
            {title}
          </h1>
          <p className="text-blue-200 mt-3 text-sm leading-relaxed max-w-xl mx-auto">
            {description}
          </p>
          <div className="mt-6 flex justify-center gap-4 text-xs text-blue-300">
            <span>By {author}</span>
            <span>·</span>
            <span>{readTime}</span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="max-w-3xl mx-auto px-6 mt-12 bg-white rounded-2xl p-8 sm:p-12 border border-gray-200 shadow-sm">
        <div 
          className="prose prose-blue max-w-none text-gray-700 text-sm leading-relaxed space-y-6"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
        
        {/* Author Box E-E-A-T */}
        <div className="border-t border-gray-200 mt-10 pt-6 flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center flex-shrink-0 text-base">
            FSI
          </div>
          <div className="text-center sm:text-left">
            <h4 className="font-bold text-gray-900 text-sm">{author}</h4>
            <p className="text-gray-500 text-xs mt-1 leading-relaxed">
              Reviewed by the Funding Intelligence Team. We verify all sources, regulatory guidelines,
              and banking parameters to maintain the highest standard of accuracy.
            </p>
          </div>
        </div>
      </article>

      {/* Prominent CTA */}
      <section className="max-w-3xl mx-auto px-6 mt-8">
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl p-8 shadow-xl border border-blue-800 text-center">
          <h3 className="text-xl font-black mb-2 text-white">Ready to Secure Funding?</h3>
          <p className="text-blue-100 text-xs max-w-md mx-auto mb-6">
            Submit your secure application in 3 minutes and receive a decision within 24 to 72 hours.
          </p>
          <Link href={ctaUrl} className="bg-white text-blue-900 font-extrabold px-8 py-3.5 rounded-lg text-sm transition hover:bg-gray-100 shadow-md inline-block">
            {ctaText}
          </Link>
        </div>
      </section>
    </div>
  );
}
