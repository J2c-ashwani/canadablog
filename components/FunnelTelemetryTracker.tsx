'use client';

import { useEffect, Suspense, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { calculateTrafficQuality } from '@/lib/telemetry/traffic-quality';

function getOrSetSessionId(): string {
  if (typeof window === 'undefined') return '';
  let sessId = sessionStorage.getItem('fsi_session_id');
  if (!sessId) {
    sessId = 'sess_' + Date.now() + '_' + Math.random().toString(36).substring(2, 11);
    sessionStorage.setItem('fsi_session_id', sessId);
  }
  return sessId;
}

function TelemetryTrackerInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Keep track of the last path we logged to avoid duplicate logs on double-render
  const lastLoggedPathRef = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const sessionId = getOrSetSessionId();
    const referrer = document.referrer || 'direct';
    const quality = calculateTrafficQuality();

    // Avoid logging duplicate page views for the exact same path/search combination in the same component lifecycle
    const currentPathString = pathname + (searchParams?.toString() ? '?' + searchParams.toString() : '');
    if (lastLoggedPathRef.current === currentPathString) return;
    lastLoggedPathRef.current = currentPathString;

    // 1. Log the route transition page_view event
    fetch('/api/telemetry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventName: 'page_view',
        sessionId,
        pagePath: pathname,
        referrer,
        trafficQualityScore: quality.score,
        trafficQualityClassification: quality.classification,
        timezone: quality.timezone,
        language: quality.language,
      }),
    }).catch((err) => console.error('Failed to log telemetry page_view:', err));

    // 2. Capture First Touch Attribution if not already stored
    if (!localStorage.getItem('fsi_first_touch_url')) {
      localStorage.setItem('fsi_first_touch_url', pathname);
      localStorage.setItem('fsi_first_touch_referrer', referrer);
      localStorage.setItem('fsi_first_touch_utm_source', searchParams?.get('utm_source') || searchParams?.get('utmSource') || '');
      localStorage.setItem('fsi_first_touch_utm_medium', searchParams?.get('utm_medium') || searchParams?.get('utmMedium') || '');
      localStorage.setItem('fsi_first_touch_utm_campaign', searchParams?.get('utm_campaign') || searchParams?.get('utmCampaign') || '');
    }

    // 3. Log session_start once per browser session
    if (sessionStorage.getItem('fsi_session_logged') !== 'true') {
      let utmSource = searchParams?.get('utm_source') || undefined;
      let utmMedium = searchParams?.get('utm_medium') || undefined;
      let utmCampaign = searchParams?.get('utm_campaign') || undefined;

      const source = searchParams?.get('source');
      if (source && !utmSource) {
        if (source.startsWith('alert_nurture_')) {
          utmSource = 'alert_nurture';
          utmMedium = 'email';
          utmCampaign = source;
        } else if (source === 'inactivity_alert') {
          utmSource = 'reactivation';
          utmMedium = 'email';
          utmCampaign = 'inactivity_alert';
        } else if (source.startsWith('reactivation_')) {
          utmSource = 'reactivation';
          utmMedium = 'email';
          utmCampaign = source;
        } else if (source === 'weekly_alert') {
          utmSource = 'alert_nurture';
          utmMedium = 'email';
          utmCampaign = 'weekly_alert';
        } else if (source === 'instant_alert') {
          utmSource = 'alert_nurture';
          utmMedium = 'email';
          utmCampaign = 'instant_alert';
        } else {
          utmSource = source;
        }
      }

      fetch('/api/telemetry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventName: 'session_start',
          sessionId,
          pagePath: pathname,
          referrer,
          utmSource,
          utmMedium,
          utmCampaign,
          trafficQualityScore: quality.score,
          trafficQualityClassification: quality.classification,
          timezone: quality.timezone,
          language: quality.language,
        }),
      })
        .then((res) => {
          if (res.ok) {
            sessionStorage.setItem('fsi_session_logged', 'true');
          }
        })
        .catch((err) => console.error('Failed to log telemetry session:', err));

      const isEmail =
        utmMedium === 'email' ||
        utmSource === 'email' ||
        ['calculator_recovery', 'cart_recovery', 'alert_nurture', 'reactivation'].includes(utmSource || '');
        
      if (isEmail) {
        fetch('/api/telemetry', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            eventName: 'emailClicked',
            sessionId,
            pagePath: pathname,
            referrer,
            utmSource,
            utmMedium,
            utmCampaign,
            trafficQualityScore: quality.score,
            trafficQualityClassification: quality.classification,
            timezone: quality.timezone,
            language: quality.language,
          }),
        }).catch((err) => console.error('Failed to log telemetry emailClicked:', err));
      }
    }
  }, [pathname, searchParams]);

  return null;
}

export function FunnelTelemetryTracker() {
  return (
    <Suspense fallback={null}>
      <TelemetryTrackerInner />
    </Suspense>
  );
}
