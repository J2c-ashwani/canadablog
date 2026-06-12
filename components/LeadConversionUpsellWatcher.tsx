'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { StrategySessionUpsell } from '@/components/StrategySessionUpsell';

type PendingLead = {
  id: string;
  source: string;
  email: string;
  name?: string;
};

const LEAD_UPSELL_EVENT = 'fsi:lead-conversion-upsell';
const STORAGE_KEY = 'fsi:pending-strategy-session-upsell';
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-DZ55NMNLYM';

const LEAD_ENDPOINTS = ['/api/contact', '/api/grant-finder', '/api/download', '/api/download-guide'];
const IGNORED_ENDPOINTS = ['/api/subscribe', '/api/newsletter'];
const TRACKED_ENDPOINTS = [
  '/api/contact',
  '/api/grant-finder',
  '/api/download',
  '/api/download-guide',
  '/api/subscribe',
  '/api/partners/inquiry'
];

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

function getPathname(input: RequestInfo | URL) {
  const url = typeof input === 'string' || input instanceof URL ? String(input) : input.url;
  return new URL(url, window.location.origin).pathname;
}

function parseBody(body: BodyInit | null | undefined) {
  if (!body || typeof body !== 'string') return {};

  try {
    return JSON.parse(body) as Record<string, unknown>;
  } catch {
    return {};
  }
}

function getLeadName(payload: Record<string, unknown>) {
  return String(payload.name || payload.companyName || payload.company || '').trim();
}

function getLeadSource(pathname: string, payload: Record<string, unknown>) {
  if (pathname === '/api/grant-finder') return 'ai_grant_finder';
  if (pathname === '/api/download-guide') return 'ultimate_grant_guide_cta';
  if (pathname === '/api/download') {
    const guideName = String(payload.guideName || 'guide').toLowerCase().replace(/[^a-z0-9]+/g, '_');
    return `lead_magnet_${guideName}`;
  }
  if (pathname === '/api/subscribe') return 'newsletter_signup';
  if (pathname === '/api/partners/inquiry') return 'partner_inquiry';
  if (pathname === '/api/contact') {
    const category = String(payload.category || '').toLowerCase();
    if (category.includes('calculator')) return 'grant_calculator';
    if (category.includes('consultation')) return 'consultation_request';
    return 'contact_form';
  }
  return 'unknown_lead';
}

function shouldTriggerUpsell(pathname: string) {
  if (IGNORED_ENDPOINTS.some((endpoint) => pathname.startsWith(endpoint))) return false;
  return LEAD_ENDPOINTS.some((endpoint) => pathname.startsWith(endpoint));
}

function shouldTrackLead(pathname: string) {
  return TRACKED_ENDPOINTS.some((endpoint) => pathname.startsWith(endpoint));
}

function getStoredLead() {
  const stored = window.sessionStorage.getItem(STORAGE_KEY);
  if (!stored) return null;

  try {
    return JSON.parse(stored) as PendingLead;
  } catch {
    return null;
  } finally {
    window.sessionStorage.removeItem(STORAGE_KEY);
  }
}

export function trackGAEvent(eventName: string, params: Record<string, any> = {}) {
  if (typeof window === 'undefined') return;
  
  // Restrict Google Analytics tracking to production domains only
  const isProduction = window.location.hostname === 'www.fsidigital.ca' || window.location.hostname === 'fsidigital.ca';
  if (!isProduction) {
    console.log(`[GA4 Bypass] Suppressed event "${eventName}" on environment: ${window.location.hostname}`, params);
    return;
  }
  
  try {
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtagFallback() {
      window.dataLayer?.push(arguments);
    };
    window.gtag('event', eventName, {
      ...params,
      send_to: GA_MEASUREMENT_ID,
    });
  } catch (err) {
    console.error(`[GA4 Tracking] Failed to track event "${eventName}":`, err);
  }
}

export function LeadConversionUpsellWatcher() {
  const pathname = usePathname();
  const [pendingLead, setPendingLead] = useState<PendingLead | null>(null);
  const shouldSuppress = pathname === '/consultation' || pathname === '/booking' || pathname.startsWith('/partners');

  // Capture UTM parameters from URL and store in sessionStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const utms = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid'];
      utms.forEach(param => {
        const val = searchParams.get(param);
        if (val) {
          window.sessionStorage.setItem(`fsi:${param}`, val);
        }
      });

      const utmSource = searchParams.get('utm_source');
      const utmCampaign = searchParams.get('utm_campaign');
      if (utmSource === 'funding_alerts' && utmCampaign) {
        const clickKey = `fsi:click-logged:${utmCampaign}`;
        if (!window.sessionStorage.getItem(clickKey)) {
          window.sessionStorage.setItem(clickKey, 'true');
          window.fetch(`/api/admin/alerts/metrics?campaignId=${encodeURIComponent(utmCampaign)}&event=click`)
            .catch(err => console.error('Failed to log alert click:', err));
        }
      }
    }
  }, [pathname]);

  useEffect(() => {
    const storedLead = getStoredLead();
    if (storedLead && !shouldSuppress) {
      setPendingLead(storedLead);
    }
  }, [pathname, shouldSuppress]);

  useEffect(() => {
    const originalFetch = window.fetch.bind(window);

    window.fetch = async (input, init) => {
      const requestPathname = getPathname(input);
      let updatedInit = init;

      // Automatically inject UTMs and GA Client ID for tracked lead endpoints
      if (shouldTrackLead(requestPathname) && init?.body) {
        try {
          const payload = parseBody(init.body);
          
          const utmSource = window.sessionStorage.getItem('fsi:utm_source') || '';
          const utmMedium = window.sessionStorage.getItem('fsi:utm_medium') || '';
          const utmCampaign = window.sessionStorage.getItem('fsi:utm_campaign') || '';
          
          let gaClientId = '';
          try {
            const match = document.cookie.match(/_ga=GA1\.[0-9]\.([^;]+)/);
            if (match) {
              gaClientId = match[1];
            }
          } catch (err) {
            console.error('Failed to parse _ga cookie:', err);
          }

          updatedInit = {
            ...init,
            body: JSON.stringify({
              ...payload,
              utmSource,
              utmMedium,
              utmCampaign,
              gaClientId,
            }),
          };
        } catch (err) {
          console.error('Failed to decorate lead fetch:', err);
        }
      }

      const response = await originalFetch(input, updatedInit);

      try {
        if (!response.ok || !shouldTrackLead(requestPathname)) {
          return response;
        }

        const payload = parseBody(updatedInit?.body);
        const email = String(payload.email || '').trim();

        if (!email) {
          return response;
        }

        const leadSource = getLeadSource(requestPathname, payload);

        // Fire GA4 Event (excluding PII email/name)
        trackGAEvent('generate_lead', {
          lead_source: leadSource,
          method: 'form',
        });

        // Log Alerts CDP metrics if referred from funding alert campaigns
        const sessionSource = window.sessionStorage.getItem('fsi:utm_source') || '';
        const sessionCampaign = window.sessionStorage.getItem('fsi:utm_campaign') || '';
        if (sessionSource === 'funding_alerts' && sessionCampaign) {
          let eventType = 'conversion';
          if (requestPathname.includes('/strategy-session/recovery')) {
            eventType = 'audit';
          }
          window.fetch(`/api/admin/alerts/metrics?campaignId=${encodeURIComponent(sessionCampaign)}&event=${eventType}`)
            .catch(err => console.error(`Failed to log alert event ${eventType}:`, err));
        }

        // Continue with upsell modal popup only for consumer/standard leads
        if (shouldTriggerUpsell(requestPathname)) {
          const lead: PendingLead = {
            id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
            source: leadSource,
            email,
            name: getLeadName(payload),
          };

          window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(lead));
          window.dispatchEvent(new CustomEvent<PendingLead>(LEAD_UPSELL_EVENT, { detail: lead }));

          window.setTimeout(() => {
            const stored = window.sessionStorage.getItem(STORAGE_KEY);
            if (stored?.includes(lead.id)) {
              window.sessionStorage.removeItem(STORAGE_KEY);
            }
          }, 4000);
        }
      } catch (error) {
        console.error('Lead upsell/analytics watcher failed:', error);
      }

      return response;
    };

    const handleLeadUpsell = (event: Event) => {
      if (shouldSuppress) return;
      setPendingLead((event as CustomEvent<PendingLead>).detail);
    };

    window.addEventListener(LEAD_UPSELL_EVENT, handleLeadUpsell);

    return () => {
      window.fetch = originalFetch;
      window.removeEventListener(LEAD_UPSELL_EVENT, handleLeadUpsell);
    };
  }, [shouldSuppress]);

  if (!pendingLead || shouldSuppress) {
    return null;
  }

  return (
    <StrategySessionUpsell
      key={pendingLead.id}
      source={pendingLead.source}
      leadEmail={pendingLead.email}
      leadName={pendingLead.name}
      modalOnly
      onDismiss={() => setPendingLead(null)}
    />
  );
}

