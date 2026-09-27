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

export default function ProvincialCityMesh({ provinceSlug, provinceName }: ProvincialCityMeshProps) {
  // Query all cities for this province from pSEO data
  const cities = getPseoCitySummaries(provinceSlug);
  const displayCities = cities.slice(0, 8);
  const otherProvinces = ALL_PROVINCES.filter((p) => p.slug !== provinceSlug);

  return (
    <section className="my-16 space-y-12">
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
