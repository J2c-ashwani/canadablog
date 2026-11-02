import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Building, MapPin, Search, ShieldCheck } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import {
  getPseoCitySummaries,
  getPseoProvincePages,
  getPseoProvinceSummaries,
  getPseoProvinceSummary,
} from '@/lib/pseo-data';
import { getStateDetailBySlugOrAbbreviation } from '@/lib/data/stateDetails';

export const revalidate = false; // Persistent static cache
export const dynamicParams = false;

type ProvincePageProps = {
  params: Promise<{
    province: string;
  }>;
};

export function generateStaticParams() {
  return getPseoProvinceSummaries().map((province) => ({
    province: province.provinceSlug,
  }));
}

export async function generateMetadata({ params }: ProvincePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const province = getPseoProvinceSummary(resolvedParams.province);

  if (!province) {
    return {
      title: 'Grant Hub Not Found | FSI Digital',
      robots: { index: false, follow: false },
    };
  }

  const canonical = `https://www.fsidigital.ca/grants/${province.provinceSlug}`;

  return {
    title: `${province.provinceName} Business Grants by City & Industry (2026) | FSI Digital`,
    description: `Browse ${province.pageCount} local business grant pages for ${province.provinceName}. Compare funding opportunities by city, industry, eligibility, and application strategy.`,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      title: `${province.provinceName} Business Grants by City & Industry`,
      description: `Find city and industry specific grant pages across ${province.provinceName}.`,
      url: canonical,
      type: 'website',
    },
  };
}

const PROVINCIAL_FOCUS_HUBS: Record<string, Array<{ title: string; href: string; city: string; sector: string; description: string }>> = {
  on: [
    {
      title: 'Toronto Technology Startup Grants',
      href: '/grants/on/toronto/technology',
      city: 'Toronto',
      sector: 'Technology & Startups',
      description: 'FedDev Ontario BSP scale-up funding, OCI VIP vouchers, and NRC-IRAP engineering wage subsidies.',
    },
    {
      title: 'Toronto Hospitality & Restaurant Grants',
      href: '/grants/on/toronto/restaurants-hospitality',
      city: 'Toronto',
      sector: 'Restaurants & Hospitality',
      description: 'City of Toronto commercial patio & façade grants, Destination Ontario tourism relief, and CSBFP equipment guarantees.',
    },
    {
      title: 'Thunder Bay Main Street & Retail Grants',
      href: '/grants/on/thunder-bay/retail',
      city: 'Thunder Bay',
      sector: 'Retail & Main Street',
      description: 'FedNor Northern Ontario development grants, NOHFC small business funds, and Thunder Bay CEDC vouchers.',
    },
  ],
  bc: [
    {
      title: 'Vancouver Women-Owned Business Grants',
      href: '/grants/bc/vancouver/women-entrepreneurs',
      city: 'Vancouver',
      sector: 'Women Founders',
      description: 'PacifiCan scale-up envelopes, WeBC low-barrier capital, and WorkBC leadership training vouchers.',
    },
    {
      title: 'Coquitlam Technology Innovation Grants',
      href: '/grants/bc/coquitlam/technology',
      city: 'Coquitlam',
      sector: 'Technology Startups',
      description: 'PacifiCan BSP commercialization funds, Innovate BC Ignite R&D vouchers, and Tri-Cities regional tax credits.',
    },
  ],
  ab: [
    {
      title: 'Calgary Restaurant & Hospitality Grants',
      href: '/grants/ab/calgary/restaurants-hospitality',
      city: 'Calgary',
      sector: 'Hospitality & Dining',
      description: 'City of Calgary BRZ patio improvements, Travel Alberta culinary investment, and PrairiesCan tourism relief.',
    },
  ],
  mb: [
    {
      title: 'Winnipeg Women Entrepreneur Grants',
      href: '/grants/mb/winnipeg/women-entrepreneurs',
      city: 'Winnipeg',
      sector: 'Women Founders',
      description: 'PrairiesCan REGI commercialization, WECM growth financing, and Manitoba Innovation Growth Program cost-shares.',
    },
  ],
};

export default async function ProvinceGrantHubPage({ params }: ProvincePageProps) {
  const resolvedParams = await params;
  const province = getPseoProvinceSummary(resolvedParams.province);

  if (!province) {
    notFound();
  }

  const cities = getPseoCitySummaries(resolvedParams.province);
  const samplePages = getPseoProvincePages(resolvedParams.province).slice(0, 12);
  const topCityNames = cities.slice(0, 4).map((city) => city.cityName).join(', ');
  const focusHubs = PROVINCIAL_FOCUS_HUBS[resolvedParams.province.toLowerCase()];

  // Fetch unique local programs for authority
  const stateData = getStateDetailBySlugOrAbbreviation(resolvedParams.province);
  const topPrograms = stateData?.topPrograms?.slice(0, 3) || [];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        <section className="border-b border-gray-200 bg-slate-50 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">
              <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500">
                <Link href="/" className="hover:text-green-700">Home</Link>
                <span>/</span>
                <Link href="/grants" className="hover:text-green-700">Grant Database</Link>
                <span>/</span>
                <span className="font-medium text-gray-900">{province.provinceName}</span>
              </nav>

              <div className="flex flex-wrap items-center gap-3 mb-5">
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                  {province.cityCount} cities and {province.pageCount} grant pages
                </Badge>
                <span className="text-[10px] text-gray-500 font-bold bg-gray-150 px-2.5 py-1 rounded border border-gray-250 uppercase tracking-wider">
                  Last Reviewed: July 2026 | Updated Monthly
                </span>
              </div>
              <h1 className="max-w-4xl text-4xl font-bold tracking-normal text-gray-950 md:text-5xl">
                {province.provinceName} Business Grants by City and Industry
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-700">
                Explore local grant pages for {province.provinceName} businesses, including funding paths for technology,
                agriculture, manufacturing, healthcare, clean energy, women-owned companies, and more.
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-gray-200 bg-white py-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-3">
              <div className="rounded border border-gray-200 p-5">
                <MapPin className="mb-3 h-6 w-6 text-green-700" />
                <div className="text-2xl font-bold text-gray-950">{province.cityCount}</div>
                <div className="text-sm text-gray-600">covered cities</div>
              </div>
              <div className="rounded border border-gray-200 p-5">
                <Building className="mb-3 h-6 w-6 text-blue-700" />
                <div className="text-2xl font-bold text-gray-950">{province.industryCount}</div>
                <div className="text-sm text-gray-600">industry categories</div>
              </div>
              <div className="rounded border border-gray-200 p-5">
                <Search className="mb-3 h-6 w-6 text-amber-700" />
                <div className="text-2xl font-bold text-gray-950">{province.pageCount}</div>
                <div className="text-sm text-gray-600">canonical grant pages</div>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Authority Programs & Commercial Anchors Section */}
        <section className="py-12 bg-white border-b border-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* 2/3 Column: Featured Programs */}
                <div className="md:col-span-2 space-y-6">
                  <h2 className="text-2xl font-bold text-gray-950">Featured Funding Opportunities</h2>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Active public subsidies and capital programs available for businesses operating in {province.provinceName}:
                  </p>
                  
                  {topPrograms.length > 0 ? (
                    <div className="space-y-4">
                      {topPrograms.map((prog, idx) => (
                        <div key={idx} className="p-5 border border-gray-200 rounded-xl bg-white shadow-xs">
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                            <h3 className="font-bold text-gray-950 text-base">{prog.name}</h3>
                            <span className="text-xs font-bold text-green-700 bg-green-50 px-2 py-1 rounded border border-green-200">
                              {prog.fundingAmount}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mb-1">Provided by: {prog.agency} | Type: {prog.fundingType}</p>
                          <p className="text-xs text-gray-700 leading-relaxed mb-3">{prog.description}</p>
                          {prog.website && (prog.website.includes('gov') || prog.website.includes('http')) && (
                            <a 
                              href={prog.website} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="inline-flex items-center text-xs font-bold text-green-800 hover:underline"
                            >
                              Official Portal <ArrowRight className="w-3 h-3 ml-1" />
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-5 border border-dashed border-gray-200 rounded-xl text-center text-sm text-gray-505">
                      Top programs list is currently updating. Check specific city guides below for municipal opportunities.
                    </div>
                  )}
                </div>

                {/* 1/3 Side Column: Top Resources / Commercial Anchors */}
                <div className="space-y-6">
                  <div className="bg-indigo-950 text-white rounded-2xl p-6 shadow-sm border border-indigo-900">
                    <h3 className="font-extrabold text-xs uppercase tracking-wider text-indigo-300 mb-4">Top Resources</h3>
                    <div className="space-y-3">
                      <Link href="/calculator" className="block p-3 rounded-lg bg-indigo-900/50 hover:bg-indigo-900 border border-indigo-800 transition-colors">
                        <span className="block text-xs font-bold">📊 Free Grant Calculator →</span>
                        <span className="block text-[10px] text-indigo-200 mt-0.5">Find matching funding in 2 minutes</span>
                      </Link>
                      <a href={`/api/growth-os/onsite-click?surface=province-page&context=${encodeURIComponent(resolvedParams.province)}&offer=bundle`} className="block p-3 rounded-lg bg-indigo-900/50 hover:bg-indigo-900 border border-indigo-800 transition-colors">
                        <span className="block text-xs font-bold">🧭 $79 Complete Funding Blueprint →</span>
                        <span className="block text-[10px] text-indigo-200 mt-0.5">Report, action plan, and toolkit—self-serve</span>
                      </a>
                      <a href={`/api/growth-os/onsite-click?surface=province-page&context=${encodeURIComponent(resolvedParams.province)}&offer=match-report`} className="block p-3 rounded-lg bg-indigo-900/50 hover:bg-indigo-900 border border-indigo-800 transition-colors">
                        <span className="block text-xs font-bold">📄 $19 Custom Funding Report →</span>
                        <span className="block text-[10px] text-indigo-200 mt-0.5">Get a personalized PDF funding roadmap</span>
                      </a>
                      <Link href="/grants" className="block p-3 rounded-lg bg-indigo-900/50 hover:bg-indigo-900 border border-indigo-800 transition-colors">
                        <span className="block text-xs font-bold">🗂️ Federal Grant Database →</span>
                        <span className="block text-[10px] text-indigo-200 mt-0.5">Browse 500+ national incentives</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-950">Browse {province.provinceName} grant pages by city</h2>
                <p className="mt-3 max-w-3xl text-gray-700">
                  Start with major local markets such as {topCityNames}, then choose the industry page that matches your business.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {cities.map((city) => (
                  <Link
                    key={city.citySlug}
                    href={`/grants/${city.provinceSlug}/${city.citySlug}`}
                    className="group rounded border border-gray-200 p-5 transition hover:border-green-300 hover:bg-green-50"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-gray-950 group-hover:text-green-800">
                          {city.cityName}
                        </h3>
                        <p className="mt-2 text-sm text-gray-600">
                          {city.pageCount} city-industry grant pages
                        </p>
                      </div>
                      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-gray-400 group-hover:text-green-700" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Controlled Regional Directives & Statutory Intelligence Hubs */}
        {focusHubs && focusHubs.length > 0 && (
          <section className="border-t border-emerald-200 bg-gradient-to-b from-emerald-50/50 via-white to-gray-50 py-14">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-5xl">
                <div className="mb-8">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-600 text-white mb-3">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Regional Intelligence Hubs
                  </div>
                  <h2 className="text-2xl font-bold text-gray-950">
                    High-Priority {province.provinceName} Commercial & Municipal Guides
                  </h2>
                  <p className="mt-2 max-w-3xl text-sm text-gray-700">
                    Statutory local funding roadmaps, authorized regional agencies, and verified stacking caps for key regional business hubs.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {focusHubs.map((hub) => (
                    <Link
                      key={hub.href}
                      href={hub.href}
                      className="group rounded-xl border border-emerald-200 bg-white p-5 transition hover:border-emerald-400 hover:shadow-md"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                            {hub.city} • {hub.sector}
                          </span>
                          <h3 className="font-bold text-gray-950 group-hover:text-emerald-800 mt-1 text-base">
                            {hub.title}
                          </h3>
                          <p className="mt-2 text-xs text-gray-600 leading-relaxed">
                            {hub.description}
                          </p>
                        </div>
                        <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-emerald-600 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="border-t border-gray-200 bg-gray-50 py-14">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">
              <h2 className="text-2xl font-bold text-gray-950">Popular {province.provinceName} industry grant pages</h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {samplePages.map((page) => (
                  <Link
                    key={`${page.citySlug}-${page.industrySlug}`}
                    href={`/grants/${page.provinceSlug}/${page.citySlug}/${page.industrySlug}`}
                    className="rounded border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-green-800 transition hover:border-green-300 hover:bg-green-50"
                  >
                    {page.industryName} in {page.cityName}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
