'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { calculateTrafficQuality } from '@/lib/telemetry/traffic-quality';

interface OrganicProductLadderImpressionProps {
  surface: string;
  context: string;
  offerId: string;
}

/** Records a paid-offer impression only when the ladder actually enters the viewport. */
export function OrganicProductLadderImpression({
  surface,
  context,
  offerId,
}: OrganicProductLadderImpressionProps) {
  const markerRef = useRef<HTMLSpanElement>(null);
  const pathname = usePathname() || '/';

  useEffect(() => {
    const marker = markerRef.current;
    if (!marker || typeof IntersectionObserver === 'undefined') return;
    const storageKey = `fsi:product-ladder:impression:${surface}:${context}:${offerId}`;
    if (sessionStorage.getItem(storageKey) === '1') return;

    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      sessionStorage.setItem(storageKey, '1');

      let sessionId = sessionStorage.getItem('fsi_session_id');
      if (!sessionId) {
        sessionId = `sess_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
        sessionStorage.setItem('fsi_session_id', sessionId);
      }
      const quality = calculateTrafficQuality();
      fetch('/api/telemetry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
        body: JSON.stringify({
          eventName: 'paid_offer_impression',
          sessionId,
          pagePath: pathname,
          referrer: document.referrer || 'direct',
          productId: offerId,
          trafficQualityScore: quality.score,
          trafficQualityClassification: quality.classification,
          timezone: quality.timezone,
          language: quality.language,
          heuristicMetadata: JSON.stringify({
            surface,
            context: context.slice(0, 160),
            experiment: 'focused-v2',
            evidence: 'viewport',
          }),
        }),
      }).catch(() => {});
    }, { threshold: 0.1 });

    observer.observe(marker);
    return () => observer.disconnect();
  }, [context, offerId, pathname, surface]);

  return <span ref={markerRef} aria-hidden="true" className="block h-px w-px overflow-hidden" />;
}
