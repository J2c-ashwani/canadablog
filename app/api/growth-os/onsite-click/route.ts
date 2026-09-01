import { createHmac, randomUUID } from 'node:crypto';
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
  'engaged-reader',
  'linkedin-company',
  'facebook-page',
]);

function safeSlug(value: string, fallback: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || fallback;
}

function anonymousVisitorId(request: NextRequest) {
  const existingVisitorId = request.cookies.get('fsi_organic_visitor')?.value || '';
  if (/^(?:[a-f0-9-]{36}|[a-f0-9]{32})$/i.test(existingVisitorId)) return existingVisitorId;
  const secret = process.env.GROWTH_ATTRIBUTION_SECRET
    || process.env.CRON_SECRET
    || process.env.LEAD_DASHBOARD_SECRET
    || '';
  if (!secret) return randomUUID();
  const forwardedFor = String(request.headers.get('x-forwarded-for') || '').split(',')[0].trim();
  const userAgent = String(request.headers.get('user-agent') || '').slice(0, 240);
  const dailyFingerprint = `${forwardedFor}|${userAgent}|${new Date().toISOString().slice(0, 10)}`;
  return createHmac('sha256', secret).update(dailyFingerprint).digest('hex').slice(0, 32);
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
  const experimentInput = request.nextUrl.searchParams.get('experiment');
  const experiment = experimentInput === 'focused-v2' || experimentInput === 'intent-v1' || experimentInput === 'social-v1'
    ? experimentInput
    : 'baseline';
  const visitorId = anonymousVisitorId(request);
  const socialSource = surface === 'linkedin-company'
    ? 'linkedin'
    : surface === 'facebook-page'
      ? 'facebook'
      : '';
  const channel = socialSource ? 'organic_social' : 'organic_onsite';
  const isSearchDistributionCohort = contentContext.startsWith('seo-cohort-v1-');
  const campaign = socialSource
    ? `revenue-sprint-social-${socialSource}-${experiment}`
    : isSearchDistributionCohort
      ? `product-ladder-${experiment}-${surface}-${contentContext}`
      : `product-ladder-${experiment}-${surface}`;
  const actionDate = new Date().toISOString().slice(0, 10);
  const context: GrowthActionContext = {
    actionId: socialSource
      ? `act_social_${socialSource}_${offer}_${experiment}_${actionDate}`
      : isSearchDistributionCohort
        ? `act_onsite_${surface}_${contentContext}_${offer}_${actionDate}`
        : `act_onsite_${surface}_product_ladder_${experiment}_${actionDate}`,
    channel,
    campaign,
    recipientId: `web_${visitorId}`,
  };

  const destination = new URL(targetPath, request.nextUrl.origin);
  destination.searchParams.set('utm_source', socialSource || 'organic_content');
  destination.searchParams.set('utm_medium', socialSource ? 'organic_social' : 'onsite');
  destination.searchParams.set('utm_campaign', campaign);
  destination.searchParams.set('utm_content', `${contentContext}-${offer}`);

  if (isLikelyAutomatedUserAgent(request.headers.get('user-agent'))) {
    return NextResponse.redirect(destination);
  }

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
