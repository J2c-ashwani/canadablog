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
const LEAD_ENDPOINTS = ['/api/contact', '/api/grant-finder', '/api/download', '/api/download-guide'];
const IGNORED_ENDPOINTS = ['/api/subscribe', '/api/newsletter'];

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
  if (pathname === '/api/grant-finder') return 'ai-grant-finder-results';
  if (pathname === '/api/download-guide') return 'grant-guide-download-success';
  if (pathname === '/api/download') return `download-${String(payload.guideName || 'guide').toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  if (String(payload.category || '').toLowerCase().includes('calculator')) return 'grant-calculator-success';
  if (String(payload.category || '').toLowerCase().includes('consultation')) return 'consultation-request-success';
  return 'contact-form-success';
}

function shouldTriggerUpsell(pathname: string) {
  if (IGNORED_ENDPOINTS.some((endpoint) => pathname.startsWith(endpoint))) return false;
  return LEAD_ENDPOINTS.some((endpoint) => pathname.startsWith(endpoint));
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

export function LeadConversionUpsellWatcher() {
  const pathname = usePathname();
  const [pendingLead, setPendingLead] = useState<PendingLead | null>(null);
  const shouldSuppress = pathname === '/consultation' || pathname === '/booking' || pathname.startsWith('/partners');

  useEffect(() => {
    const storedLead = getStoredLead();
    if (storedLead && !shouldSuppress) {
      setPendingLead(storedLead);
    }
  }, [pathname, shouldSuppress]);

  useEffect(() => {
    const originalFetch = window.fetch.bind(window);

    window.fetch = async (input, init) => {
      const response = await originalFetch(input, init);

      try {
        const requestPathname = getPathname(input);

        if (!response.ok || !shouldTriggerUpsell(requestPathname)) {
          return response;
        }

        const payload = parseBody(init?.body);
        const email = String(payload.email || '').trim();

        if (!email) {
          return response;
        }

        const lead: PendingLead = {
          id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
          source: getLeadSource(requestPathname, payload),
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
      } catch (error) {
        console.error('Lead upsell watcher failed:', error);
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
