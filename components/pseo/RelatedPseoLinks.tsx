import React from 'react';
import Link from 'next/link';
import { getAllPseoPages } from '@/lib/pseo-data';
import { MapPin, Building2, Link2, BookOpen } from 'lucide-react';

interface Props {
  currentProvinceSlug: string;
  currentCitySlug: string;
  currentIndustrySlug: string;
}

export default function RelatedPseoLinks({ currentProvinceSlug, currentCitySlug, currentIndustrySlug }: Props) {
  // Get all published pages
  const allPages = getAllPseoPages().filter(p => p.isPublished);
  
  if (allPages.length === 0) return null;

  const samplePage = allPages.find(p => p.provinceSlug === currentProvinceSlug);
  const provinceName = samplePage ? samplePage.provinceName : '';
  const cityName = allPages.find(p => p.provinceSlug === currentProvinceSlug && p.citySlug === currentCitySlug)?.cityName || '';
  const industryName = allPages.find(p => p.provinceSlug === currentProvinceSlug && p.industrySlug === currentIndustrySlug)?.industryName || '';

  // 1. SILO 1: Other Industries in the SAME City (City topical cluster)
  const sameCityPages = allPages.filter(p => 
    p.provinceSlug === currentProvinceSlug && 
    p.citySlug === currentCitySlug && 
    p.industrySlug !== currentIndustrySlug
  );

  // 2. SILO 2: Same Industry in OTHER Cities of the same Province (Industry topical cluster)
  const sameIndustryPages = allPages.filter(p => 
    p.provinceSlug === currentProvinceSlug && 
    p.industrySlug === currentIndustrySlug && 
    p.citySlug !== currentCitySlug
  );

  // Favor Tier A cities, then Tier B, then Tier C
  const tierWeight = { 'A': 1, 'B': 2, 'C': 3 };
  
  const sortedCityPages = [...sameCityPages].sort((a, b) => {
    return (tierWeight[a.tier] || 3) - (tierWeight[b.tier] || 3);
  });

  const sortedIndustryPages = [...sameIndustryPages].sort((a, b) => {
    return (tierWeight[a.tier] || 3) - (tierWeight[b.tier] || 3);
  });

  const limit = 8;
  const displayCityPages = sortedCityPages.slice(0, limit);
  const displayIndustryPages = sortedIndustryPages.slice(0, limit);

  return (
    <div className="bg-slate-50 border-t border-slate-200 py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Silo A: City Hub and Spokes */}
          {displayCityPages.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
              <h3 className="text-base font-extrabold text-slate-900 mb-5 flex items-center gap-2 pb-3 border-b border-slate-100">
                <Building2 className="w-4.5 h-4.5 text-indigo-600" />
                Other Funding Options in {cityName}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {displayCityPages.map((page, idx) => (
                  <Link 
                    key={idx} 
                    href={`/grants/${page.provinceSlug}/${page.citySlug}/${page.industrySlug}`}
                    className="text-xs text-slate-600 hover:text-indigo-600 font-semibold flex items-center gap-1.5 transition-colors p-1.5 rounded hover:bg-slate-50 border border-transparent hover:border-slate-100"
                    title={`${page.industryName} Grants in ${cityName}`}
                  >
                    <Link2 className="w-3 h-3 text-slate-400" />
                    <span className="truncate">{page.industryName}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Silo B: Industry Clusters */}
          {displayIndustryPages.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
              <h3 className="text-base font-extrabold text-slate-900 mb-5 flex items-center gap-2 pb-3 border-b border-slate-100">
                <MapPin className="w-4.5 h-4.5 text-indigo-600" />
                {industryName} Grants in Other {provinceName} Cities
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {displayIndustryPages.map((page, idx) => (
                  <Link 
                    key={idx} 
                    href={`/grants/${page.provinceSlug}/${page.citySlug}/${page.industrySlug}`}
                    className="text-xs text-slate-600 hover:text-indigo-600 font-semibold flex items-center gap-1.5 transition-colors p-1.5 rounded hover:bg-slate-50 border border-transparent hover:border-slate-100"
                    title={`${industryName} Grants in ${page.cityName}`}
                  >
                    <Link2 className="w-3 h-3 text-slate-400" />
                    <span className="truncate">{page.cityName}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Silo C: Directory Hubs */}
        <div className="bg-indigo-950 border border-indigo-900 rounded-2xl p-6 text-white text-center shadow-md">
          <h3 className="text-base font-extrabold mb-4 flex items-center justify-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-400" />
            Complete Regional Funding Directories
          </h3>
          <p className="text-xs text-indigo-200 max-w-2xl mx-auto mb-5 leading-relaxed">
            Our databases cover municipal vouchers, provincial incentives, and federal tax credits. Explore the complete hubs below.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs">
            <Link 
              href={`/grants/${currentProvinceSlug}/${currentCitySlug}`} 
              className="bg-indigo-900 hover:bg-indigo-800 text-white font-bold px-4 py-2 rounded-xl transition-colors border border-indigo-700/50"
            >
              {cityName} Directory Hub
            </Link>
            <Link 
              href={`/grants/${currentProvinceSlug}`} 
              className="bg-indigo-900 hover:bg-indigo-800 text-white font-bold px-4 py-2 rounded-xl transition-colors border border-indigo-700/50"
            >
              {provinceName} Directory Hub
            </Link>
            <Link 
              href="/grants" 
              className="bg-indigo-900 hover:bg-indigo-800 text-white font-bold px-4 py-2 rounded-xl transition-colors border border-indigo-700/50"
            >
              Federal Grant Database
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
