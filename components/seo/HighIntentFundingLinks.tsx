import Link from 'next/link';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { getTopRevenuePages, type RevenueMarket } from '@/lib/seo/revenueOpportunities';

type HighIntentFundingLinksProps = {
  title?: string;
  description?: string;
  market?: RevenueMarket;
  limit?: number;
  className?: string;
};

export function HighIntentFundingLinks({
  title = 'High-Intent Funding Searches',
  description = 'These pages focus on grant topics with stronger search demand, buyer intent, and AdSense revenue potential.',
  market,
  limit = 8,
  className = '',
}: HighIntentFundingLinksProps) {
  const pages = getTopRevenuePages(limit, market);

  if (pages.length === 0) return null;

  return (
    <section className={`border-y border-gray-200 bg-slate-50 py-10 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 max-w-3xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm font-semibold text-emerald-700 ring-1 ring-emerald-100">
            <TrendingUp className="h-4 w-4" />
            Revenue Focus
          </div>
          <h2 className="text-2xl font-bold text-gray-950 sm:text-3xl">{title}</h2>
          <p className="mt-2 text-base leading-7 text-gray-700">{description}</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {pages.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="group flex min-h-36 flex-col justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:border-emerald-300 hover:shadow-md"
            >
              <div>
                <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  {page.market === 'cross-border' ? 'USA & Canada' : page.market} · {page.pageType}
                </div>
                <h3 className="text-base font-bold leading-6 text-gray-950 group-hover:text-emerald-700">
                  {page.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">{page.description}</p>
              </div>
              <span className="mt-4 inline-flex items-center text-sm font-semibold text-emerald-700">
                Open guide <ArrowRight className="ml-1 h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
