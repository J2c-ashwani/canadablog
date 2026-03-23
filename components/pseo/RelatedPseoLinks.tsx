import React from 'react';
import Link from 'next/link';
import { getAllPseoPages } from '@/lib/pseo-data';
import { MapPin } from 'lucide-react';

interface Props {
  currentProvinceSlug: string;
  currentCitySlug: string;
  currentIndustrySlug: string;
}

export default function RelatedPseoLinks({ currentProvinceSlug, currentCitySlug, currentIndustrySlug }: Props) {
  // Get all published pages
  const allPages = getAllPseoPages().filter(p => p.isPublished);
  
  // Find pages in the same province but different cities/industries
  const sameProvincePages = allPages.filter(p => 
    p.provinceSlug === currentProvinceSlug && 
    (p.citySlug !== currentCitySlug || p.industrySlug !== currentIndustrySlug)
  );

  // We want to link to about 16 pages to massively boost internal links (>100 per page)
  // Use a deterministic scramble based on the current slug length to avoid identical blocks
  const scrambleSeed = currentCitySlug.length + currentIndustrySlug.length;
  
  // Sort deterministically to avoid hydration errors
  const sortedPages = [...sameProvincePages].sort((a, b) => {
    const aSeed = a.citySlug.length * scrambleSeed;
    const bSeed = b.citySlug.length * scrambleSeed;
    return aSeed - bSeed;
  });

  const selectedLinks = sortedPages.slice(0, 16);

  if (selectedLinks.length === 0) return null;

  return (
    <div className="bg-white border-t border-gray-200 py-10">
      <div className="max-w-4xl mx-auto px-4">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-green-600" />
          Explore More Funding Opportunities in {selectedLinks[0].provinceName}
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {selectedLinks.map((page, idx) => (
             <Link 
                key={idx} 
                href={`/grants/${page.provinceSlug}/${page.citySlug}/${page.industrySlug}`}
                className="text-sm text-green-700 hover:text-green-900 hover:underline block truncate p-2 rounded hover:bg-green-50 transition-colors border border-transparent hover:border-green-100"
                title={`${page.industryName} Grants in ${page.cityName}`}
             >
                {page.industryName} in {page.cityName}
             </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
