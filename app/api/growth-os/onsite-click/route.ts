import { randomUUID } from 'node:crypto';
import { type NextRequest, NextResponse } from 'next/server';
import {
  createTrackedGrowthUrl,
  isLikelyAutomatedUserAgent,
  type GrowthActionContext,
} from '@/lib/growth-os/action-attribution';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const OFFERS = {
  'match-report': '/products/funding-match-report',
  toolkit: '/products/toolkit',
  'action-plan': '/products/action-plan',
  bundle: '/products/bundle',
  membership: '/membership',
} as const;

const SURFACES = new Set([
  'blog',
  'grants-city-industry',
  'grant-guide',
  'mobile-sticky',
  'footer',
  'header',
  'guided-path',
  'rde',
  'homepage',
  'lead-conversion',
  'stacking-planner',
  'program-evaluator',
  'stacking-portfolio',
  'calculator-result',
  'industry-page',
  'province-page',
  'state-page',
]);

function safeSlug(value: string, fallback: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || fallback;
}

/**
 * First-party redirect for organic product distribution. The browser never
 * creates or signs attribution data: this route allowlists the destination,
 * gives the anonymous visitor a durable ID, then hands off to the existing
 * signed Growth OS click route.
 */
export async function GET(request: NextRequest) {
  const offer = request.nextUrl.searchParams.get('offer') || '';
  const surfaceInput = request.nextUrl.searchParams.get('surface') || '';
  const targetPath = OFFERS[offer as keyof typeof OFFERS];
  const surface = SURFACES.has(surfaceInput) ? surfaceInput : '';

  if (!targetPath || !surface) {
    return NextResponse.redirect(new URL('/products/funding-match-report', request.url));
  }

  const contentContext = safeSlug(request.nextUrl.searchParams.get('context') || '', 'unknown');
  const existingVisitorId = request.cookies.get('fsi_organic_visitor')?.value || '';
  const visitorId = /^[a-f0-9-]{36}$/i.test(existingVisitorId) ? existingVisitorId : randomUUID();
  const campaign = `product-ladder-${surface}`;
  const actionDate = new Date().toISOString().slice(0, 10);
  const context: GrowthActionContext = {
    actionId: `act_onsite_${surface}_product_ladder_${actionDate}`,
    channel: 'organic_onsite',
    campaign,
    recipientId: `web_${visitorId}`,
  };

  const destination = new URL(targetPath, request.nextUrl.origin);
  destination.searchParams.set('utm_source', 'organic_content');
  destination.searchParams.set('utm_medium', 'onsite');
  destination.searchParams.set('utm_campaign', campaign);
  destination.searchParams.set('utm_content', `${contentContext}-${offer}`);

  const trackedUrl = createTrackedGrowthUrl(destination.toString(), context);
  const response = NextResponse.redirect(trackedUrl);
  response.cookies.set('fsi_organic_visitor', visitorId, {
    httpOnly: true,
    sameSite: 'lax',
    secure: true,
    maxAge: 90 * 24 * 60 * 60,
    path: '/',
  });
  return response;
}
