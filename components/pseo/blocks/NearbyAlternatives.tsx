import React from 'react';
import Link from 'next/link';
import { ArrowRightLeft } from 'lucide-react';
import { getAllStateDetails } from '@/lib/data/stateDetails';

interface Props {
  currentTier: 'A' | 'B' | 'C';
  stateSlug: string;
  anchorText?: string;
}

function toSlug(text: string): string {
  return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
}

export default function NearbyAlternatives({ currentTier, stateSlug, anchorText }: Props) {
  // Hard Internal Linking: 1 State Hub + 2 Tier A cities from the same state
  const allStates = getAllStateDetails();
  const currentState = allStates.find(s => s.slug === stateSlug);
  
  const tierACities = currentState?.cityGuides
    ?.filter(c => c.tier === 'A')
    ?.slice(0, 2) || [];

  // Also link to 1 related industry hub (different state)
  const relatedState = allStates.find(s => s.slug !== stateSlug && s.cityGuides && s.cityGuides.length > 0);

  return (
    <div className="bg-sky-50 border border-sky-200 p-6 rounded-xl mb-8">
      <h3 className="text-lg font-bold text-sky-900 flex items-center gap-2 m-0 mb-3">
        <ArrowRightLeft className="w-5 h-5 text-sky-600" />
        Consider These Better-Funded Alternatives
      </h3>
      {currentTier !== 'A' && (
        <p className="text-sm text-sky-800 mb-4">
          Operating in a Tier {currentTier} zone means smaller discretionary funds. These nearby Tier A economic centers offer significantly more capital access:
        </p>
      )}
      <div className="space-y-2">
        {/* State Hub Link */}
        {currentState && (
          <Link href={`/usa/${currentState.slug}`} className="block p-3 bg-white rounded-lg border border-sky-100 hover:border-sky-300 hover:shadow-sm transition-all">
            <span className="font-semibold text-sky-700 text-sm">📍 Full {anchorText || `${currentState.name} grants`} guide →</span>
          </Link>
        )}
        {/* Tier A City Links */}
        {tierACities.map((city, idx) => (
          <Link key={idx} href={`/usa/${stateSlug}/${toSlug(city.city)}`} className="block p-3 bg-white rounded-lg border border-sky-100 hover:border-sky-300 hover:shadow-sm transition-all">
            <span className="font-semibold text-sky-700 text-sm">🏙️ {city.city} business incentives →</span>
            <span className="block text-xs text-gray-500 mt-0.5">{city.keyIndustries?.slice(0, 3).join(', ')}</span>
          </Link>
        ))}
        {/* Related State Link */}
        {relatedState && (
          <Link href={`/usa/${relatedState.slug}`} className="block p-3 bg-white rounded-lg border border-sky-100 hover:border-sky-300 hover:shadow-sm transition-all">
            <span className="font-semibold text-sky-700 text-sm">🗺️ Compare with {relatedState.name} funding programs →</span>
          </Link>
        )}
      </div>
    </div>
  );
}
