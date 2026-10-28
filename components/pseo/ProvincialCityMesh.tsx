import React from 'react';
import Link from 'next/link';
import { MapPin, Building2, ArrowRight, ShieldCheck, Sparkles, Compass } from 'lucide-react';
import { getPseoCitySummaries } from '@/lib/pseo-data';

interface ProvincialCityMeshProps {
  provinceSlug: 'on' | 'bc' | 'ab' | 'qc' | 'mb' | 'sk' | 'ns' | 'nb';
  provinceName: string;
}

const ALL_PROVINCES: { slug: string; name: string; path: string }[] = [
  { slug: 'on', name: 'Ontario', path: '/canada/ontario' },
  { slug: 'bc', name: 'British Columbia', path: '/canada/british-columbia' },
  { slug: 'ab', name: 'Alberta', path: '/canada/alberta' },
  { slug: 'qc', name: 'Quebec', path: '/canada/quebec' },
  { slug: 'mb', name: 'Manitoba', path: '/canada/manitoba' },
  { slug: 'sk', name: 'Saskatchewan', path: '/canada/saskatchewan' },
  { slug: 'ns', name: 'Nova Scotia', path: '/canada/nova-scotia' },
  { slug: 'nb', name: 'New Brunswick', path: '/canada/new-brunswick' },
];

const PROVINCE_COHORT_LINKS: Record<string, Array<{ title: string; href: string; city: string; sector: string; description: string }>> = {
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

export default function ProvincialCityMesh({ provinceSlug, provinceName }: ProvincialCityMeshProps) {
  // Query all cities for this province from pSEO data
  const cities = getPseoCitySummaries(provinceSlug);
  const displayCities = cities.slice(0, 8);
  const otherProvinces = ALL_PROVINCES.filter((p) => p.slug !== provinceSlug);
  const featuredCohort = PROVINCE_COHORT_LINKS[provinceSlug.toLowerCase()];

  return (
    <section className="my-16 space-y-12">
      {/* 0. Featured Regional Directives (Controlled Cohort) */}
      {featuredCohort && featuredCohort.length > 0 && (
        <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50/60 via-white to-slate-50 p-6 md:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 border-b border-emerald-100 pb-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-600 text-white shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Regional Intelligence
              </span>
              <h3 className="text-xl md:text-2xl font-black text-slate-900 mt-2">
                Featured {provinceName} Municipal & Sector Directives
              </h3>
            </div>
            <span className="text-xs font-bold text-slate-500">
              2026 Active Envelopes
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredCohort.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="bg-white rounded-xl border border-slate-200/90 p-5 hover:border-emerald-500 hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-emerald-700 mb-2">
                    <span>{item.city}</span>
                    <span className="bg-emerald-50 px-2 py-0.5 rounded text-[11px] border border-emerald-200/60">{item.sector}</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-base group-hover:text-emerald-700 leading-snug mb-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-black text-emerald-700">
                  <span>View Roadmap & Programs</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
      {/* 1. Metro Cities Grid */}
      <div>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 mb-2">
              <MapPin className="w-3.5 h-3.5" />
              Local Economic Hubs
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {provinceName} Business Grants by City & Metro Area
            </h2>
            <p className="text-sm md:text-base text-gray-600 mt-1">
              Explore hyper-local provincial funding programs, municipal grants, and regional innovation hubs.
            </p>
          </div>
          <Link
            href="/calculator"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900 group shrink-0"
          >
            Check City-Specific Eligibility
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {displayCities.map((city) => (
            <div
              key={city.citySlug}
              className="bg-white border border-gray-200/90 hover:border-blue-300 rounded-xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-gray-900 text-base flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-blue-600" />
                    {city.cityName}
                  </span>
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full font-medium">
                    {city.industryCount} Sectors
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-gray-600 mb-4">
                  <Link
                    href={`/grants/${provinceSlug}/${city.citySlug}/technology`}
                    className="block text-blue-600 hover:underline truncate"
                  >
                    • Tech & Startup Grants
                  </Link>
                  <Link
                    href={`/grants/${provinceSlug}/${city.citySlug}/women-entrepreneurs`}
                    className="block text-blue-600 hover:underline truncate"
                  >
                    • Women Founder Grants
                  </Link>
                  <Link
                    href={`/grants/${provinceSlug}/${city.citySlug}/manufacturing`}
                    className="block text-blue-600 hover:underline truncate"
                  >
                    • Manufacturing Grants
                  </Link>
                  <Link
                    href={`/grants/${provinceSlug}/${city.citySlug}/clean-energy`}
                    className="block text-blue-600 hover:underline truncate"
                  >
                    • Clean Energy Grants
                  </Link>
                </div>
              </div>

              <Link
                href={`/grants/${provinceSlug}/${city.citySlug}`}
                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:text-blue-900 pt-3 border-t border-gray-100"
              >
                View all {city.cityName} grants
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Interactive Qualification Engine CTA */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-2xl p-8 text-white relative overflow-hidden shadow-lg">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-blue-500/10 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-200 border border-blue-400/20 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-300" />
            AI Decision Engine
          </div>
          <h3 className="text-2xl font-bold mb-2">
            Calculate Your Total {provinceName} Funding Stack
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed mb-6">
            Compare non-dilutive provincial grants, federal wage subsidies (IRAP), and R&D tax refunds (SR&ED) matching your incorporation date and project scope.
          </p>
          <div className="flex flex-wrap gap-4 items-center">
            <Link
              href="/calculator"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm transition-all shadow-md"
            >
              Check Eligibility in 2 Minutes
              <ArrowRight className="w-4 h-4" />
            </Link>
            <div className="flex items-center gap-1 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Zero Impact on Credit • 100% Non-Dilutive
            </div>
          </div>
        </div>
      </div>

      {/* 3. National Cross-Provincial Bridges */}
      <div className="bg-white border border-gray-200/90 rounded-2xl p-6 shadow-xs">
        <h3 className="text-base font-extrabold text-gray-900 mb-4 flex items-center gap-2 pb-3 border-b border-gray-100">
          <Compass className="w-4.5 h-4.5 text-blue-600" />
          Other Canadian Provincial & Territorial Grant Directories
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {otherProvinces.map((prov) => (
            <Link
              key={prov.slug}
              href={prov.path}
              className="text-center p-3 rounded-lg bg-slate-50 hover:bg-blue-50 border border-slate-200/80 hover:border-blue-300 text-xs font-semibold text-slate-800 hover:text-blue-900 transition-colors"
            >
              {prov.name} Grants
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
