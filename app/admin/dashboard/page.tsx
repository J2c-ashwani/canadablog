import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getAllPurchases } from '@/lib/products/purchase-store';
import { getTelemetryEvents } from '@/lib/telemetry/telemetry-store';
import { getLeadsFromSheet } from '@/lib/google-sheets';
import { ADMIN_SESSION_COOKIE, isValidAdminKey, isValidAdminSession } from '@/lib/admin/auth';
import { AdminLoginForm } from '../leads/AdminLoginForm';
import { AdminLogoutButton } from '../leads/AdminLogoutButton';
import {
  Lock, KeyRound, DollarSign, Users, Calculator, ArrowRight,
  TrendingUp, BarChart3, Clock, Layers, Award, Tag, Sparkles
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Executive Revenue Dashboard | FSI Digital',
  robots: { index: false, follow: false },
};

function getAttributionCategory(utmCampaign: string = '', utmSource: string = '', utmMedium: string = ''): 'calculator_recovery' | 'cart_recovery' | 'alert_nurture' | 'reactivation' | 'other_email' | 'direct_organic' {
  const camp = (utmCampaign || '').toLowerCase();
  const src = (utmSource || '').toLowerCase();
  const med = (utmMedium || '').toLowerCase();

  if (src === 'calculator_recovery' || camp.includes('calculator-recovery') || camp.includes('calculator_recovery') || camp.includes('calc-recovery') || camp.includes('calculator-followup')) {
    return 'calculator_recovery';
  }
  if (src === 'cart_recovery' || camp.includes('cart-recovery') || camp.includes('cart_recovery') || camp.includes('cart-followup')) {
    return 'cart_recovery';
  }
  if (src === 'alert_nurture' || camp.includes('alert-nurture') || camp.includes('alert_nurture') || camp.includes('deadline-alerts') || camp.includes('weekly-alerts') || camp.includes('program-alert') || camp.includes('alert')) {
    return 'alert_nurture';
  }
  if (src === 'reactivation' || camp.includes('reactivation') || camp.includes('reactivate') || camp.includes('winback') || camp.includes('inactivity')) {
    return 'reactivation';
  }
  if (src === 'email' || med === 'email' || camp.includes('newsletter') || camp.includes('email')) {
    return 'other_email';
  }
  return 'direct_organic';
}

function LockedState({ hasSecret }: { hasSecret: boolean }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
          <div className="mb-5 inline-flex rounded-md bg-amber-50 p-3 text-amber-700">
            {hasSecret ? <Lock className="h-6 w-6" /> : <KeyRound className="h-6 w-6" />}
          </div>
          <h1 className="text-3xl font-bold text-gray-950">Executive Dashboard Locked</h1>
          <p className="mt-3 text-gray-700">
            {hasSecret
              ? 'Enter your private access code to view the executive revenue dashboard.'
              : 'Private dashboard access is not ready yet.'}
          </p>
          {hasSecret ? (
            <AdminLoginForm />
          ) : (
            <div className="mt-6 rounded-md bg-gray-50 p-4 text-sm font-semibold text-gray-700">
              Ask the site owner to enable private dashboard access.
            </div>
          )}
          <p className="mt-4 text-sm text-gray-500">
            This page is private and does not show revenue data unless the access code is correct.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default async function RevenueDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string; tab?: string }>;
}) {
  const resolvedParams = await searchParams;
  const resolvedTab = resolvedParams.tab || 'executive';
  const adminSecret = process.env.LEAD_DASHBOARD_SECRET;
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  const hasUrlAccess = !!adminSecret && isValidAdminKey(resolvedParams.key, adminSecret);
  const hasCookieAccess = !!adminSecret && isValidAdminSession(sessionCookie, adminSecret);

  if (!adminSecret || (!hasUrlAccess && !hasCookieAccess)) {
    return <LockedState hasSecret={!!adminSecret} />;
  }

  let purchases: any[] = [];
  let telemetry: any[] = [];
  let leads: any[] = [];
  let error: string | null = null;

  try {
    purchases = await getAllPurchases();
    telemetry = await getTelemetryEvents();
    leads = await getLeadsFromSheet(2000);
  } catch (err: any) {
    console.error('Error fetching dashboard data:', err);
    error = err.message || 'Failed to retrieve database records.';
  }

  // --- Calculate Metrics ---
  const TELEMETRY_LAUNCH_DATE_STR = '2026-06-20';
  const TELEMETRY_LAUNCH_DATE = new Date('2026-06-20T00:00:00.000Z');

  const parseDateSafe = (d?: string | null) => {
    if (!d) return new Date(0);
    const parsed = new Date(d);
    return isNaN(parsed.getTime()) ? new Date(0) : parsed;
  };

  const now = Date.now();
  const ONE_DAY = 24 * 60 * 60 * 1000;

  const isToday = (dateStr: string) => {
    if (!dateStr) return false;
    return parseDateSafe(dateStr).getTime() >= (now - ONE_DAY);
  };
  const is7d = (dateStr: string) => {
    if (!dateStr) return false;
    return parseDateSafe(dateStr).getTime() >= (now - 7 * ONE_DAY);
  };
  const is30d = (dateStr: string) => {
    if (!dateStr) return false;
    return parseDateSafe(dateStr).getTime() >= (now - 30 * ONE_DAY);
  };
  const isAllTimePost = (dateStr: string) => {
    if (!dateStr) return false;
    return parseDateSafe(dateStr).getTime() >= TELEMETRY_LAUNCH_DATE.getTime();
  };

  // Splitting telemetry, leads, purchases
  const postTelemetry = telemetry.filter((e) => parseDateSafe(e.timestamp).getTime() >= TELEMETRY_LAUNCH_DATE.getTime());
  const preTelemetry = telemetry.filter((e) => parseDateSafe(e.timestamp).getTime() < TELEMETRY_LAUNCH_DATE.getTime());

  const postLeads = leads.filter((l) => parseDateSafe(l.timestamp).getTime() >= TELEMETRY_LAUNCH_DATE.getTime());
  const preLeads = leads.filter((l) => parseDateSafe(l.timestamp).getTime() < TELEMETRY_LAUNCH_DATE.getTime());

  const postPurchases = purchases.filter((p) => parseDateSafe(p.createdAt || p.timestamp).getTime() >= TELEMETRY_LAUNCH_DATE.getTime());
  const prePurchases = purchases.filter((p) => parseDateSafe(p.createdAt || p.timestamp).getTime() < TELEMETRY_LAUNCH_DATE.getTime());

  // Post-Telemetry top KPIs
  const postLeadsCount = postLeads.length;
  const postPurchasesCount = postPurchases.length;
  const postTotalRevenue = postPurchases.reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);
  
  const postBookingsCount = postLeads.filter(l => {
    try {
      const act = JSON.parse(l.leadActivity || '{}');
      return act.bookedAudit === true || !!act.auditBookedAt || l.offlineStatus === 'Booked Audit' || l.offlineStatus === 'Audit Completed';
    } catch(e) { return false; }
  }).length;

  const postReportsPurchases = postPurchases.filter(p => p.productId !== 'consultation' && (parseFloat(p.amount) || 0) < 199);
  const postReportsRevenue = postReportsPurchases.reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);

  const postAuditPurchases = postPurchases.filter(p => p.productId === 'consultation' || (parseFloat(p.amount) || 0) >= 199);
  const postAuditRevenue = postAuditPurchases.reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);

  const postUniqueVisitors = new Set(postTelemetry.map(e => e.sessionId)).size;

  // RPV & RPL & other stats
  const postRpv = postUniqueVisitors > 0 ? postTotalRevenue / postUniqueVisitors : 0;
  const postRpl = postLeadsCount > 0 ? postTotalRevenue / postLeadsCount : 0;

  const postCalcStarts = postTelemetry.filter(e => e.eventName === 'calculator_start').length;
  const revPerCalcUser = postCalcStarts > 0 ? postReportsRevenue / postCalcStarts : 0;

  const postAuditViews = new Set(postTelemetry.filter(e => e.pagePath?.includes('/audit')).map(e => e.sessionId)).size;
  const revPerAuditVisitor = postAuditViews > 0 ? postAuditRevenue / postAuditViews : 0;

  // Drop-off helper
  const calculateDropOff = (val1: number, val2: number) => {
    if (val1 <= 0) return 0;
    return ((val1 - val2) / val1) * 100;
  };

  // Funnel calculations
  const getCalculatorFunnelStats = (filterFn: (d: string) => boolean) => {
    const events = postTelemetry.filter(e => filterFn(e.timestamp));
    const filteredLeads = postLeads.filter(l => filterFn(l.timestamp));
    const filteredPurchases = postPurchases.filter(p => filterFn(p.createdAt || p.timestamp));

    const starts = events.filter(e => e.eventName === 'calculator_start').length;
    const completed = events.filter(e => e.eventName === 'calculator_complete' || e.eventName === 'calculator_completed').length ||
                      filteredLeads.filter(l => {
                        try {
                          const act = JSON.parse(l.leadActivity || '{}');
                          return !!act.calculatorCompletedAt;
                        } catch(e) { return false; }
                      }).length;

    const pricing = events.filter(e => e.eventName === 'paywall_viewed' || e.eventName === 'report_paywall_viewed').length ||
                    filteredLeads.filter(l => {
                      try {
                        const act = JSON.parse(l.leadActivity || '{}');
                        return !!act.paywallViewedAt;
                      } catch(e) { return false; }
                    }).length;

    const checkouts = events.filter(e => e.eventName === 'checkout_started').length ||
                      filteredLeads.filter(l => {
                        try {
                          const act = JSON.parse(l.leadActivity || '{}');
                          return !!act.checkoutStartedAt;
                        } catch(e) { return false; }
                      }).length;

    const purchasesCount = filteredPurchases.filter(p => {
      const isReport = p.productId === 'funding-match-report' || p.productId === 'funding-roadmap' || p.productId === 'funding-bundle';
      const isPrice = (parseFloat(p.amount) || 0) < 199 && (parseFloat(p.amount) || 0) > 0;
      return isReport || isPrice;
    }).length || filteredLeads.filter(l => l.reportPurchased === true).length;

    return { starts, completed, pricing, checkouts, purchases: purchasesCount };
  };

  const getAiFinderFunnelStats = (filterFn: (d: string) => boolean) => {
    const events = postTelemetry.filter(e => filterFn(e.timestamp));
    const filteredLeads = postLeads.filter(l => filterFn(l.timestamp));
    const filteredPurchases = postPurchases.filter(p => filterFn(p.createdAt || p.timestamp));

    const starts = events.filter(e => e.pagePath?.includes('/grant-finder') && e.eventName === 'session_start').length;
    const generated = filteredLeads.filter(l => {
      const src = String(l.source || '').toLowerCase();
      return src.includes('ai finder') || src.includes('ai grant finder');
    }).length;

    const preview = events.filter(e => e.eventName === 'preview_viewed').length ||
                    filteredLeads.filter(l => {
                      try {
                        const act = JSON.parse(l.leadActivity || '{}');
                        return act.previewViewed === true || !!act.previewViewedAt;
                      } catch(e) { return false; }
                    }).length;

    const unlock = events.filter(e => e.eventName === 'preview_cta_clicked').length ||
                   filteredLeads.filter(l => {
                     try {
                       const act = JSON.parse(l.leadActivity || '{}');
                       return act.previewCtaClicked === true || !!act.previewCtaClickedAt;
                     } catch(e) { return false; }
                   }).length;

    const checkouts = events.filter(e => e.eventName === 'checkout_started' && e.pagePath?.includes('/products')).length ||
                      filteredLeads.filter(l => {
                        const src = String(l.source || '').toLowerCase();
                        if (!src.includes('ai finder') && !src.includes('ai grant finder')) return false;
                        try {
                          const act = JSON.parse(l.leadActivity || '{}');
                          return !!act.checkoutStartedAt;
                        } catch(e) { return false; }
                      }).length;

    const purchasesCount = filteredPurchases.filter(p => {
      const src = String(p.utmSource || p.utmCampaign || '').toLowerCase();
      const isReport = p.productId === 'funding-match-report' || p.productId === 'funding-roadmap' || p.productId === 'funding-bundle';
      return isReport && (src.includes('ai finder') || src.includes('ai-finder'));
    }).length || filteredLeads.filter(l => {
      const src = String(l.source || '').toLowerCase();
      return (src.includes('ai finder') || src.includes('ai grant finder')) && l.reportPurchased === true;
    }).length;

    return { starts, generated, preview, unlock, checkouts, purchases: purchasesCount };
  };

  const getAuditFunnelStats = (filterFn: (d: string) => boolean) => {
    const events = postTelemetry.filter(e => filterFn(e.timestamp));
    const filteredLeads = postLeads.filter(l => filterFn(l.timestamp));
    const filteredPurchases = postPurchases.filter(p => filterFn(p.createdAt || p.timestamp));

    const starts = events.filter(e => e.pagePath?.includes('/audit') && e.eventName === 'session_start').length;

    const preview = filteredLeads.filter(l => {
      const src = String(l.source || '').toLowerCase();
      const hasAuditIntent = src.includes('audit') || src.includes('strategy');
      try {
        const act = JSON.parse(l.leadActivity || '{}');
        return (act.previewViewed === true || !!act.previewViewedAt) && (hasAuditIntent || !!act.auditCtaClickedAt);
      } catch(e) { return false; }
    }).length;

    const unlock = filteredLeads.filter(l => {
      const src = String(l.source || '').toLowerCase();
      const hasAuditIntent = src.includes('audit') || src.includes('strategy');
      try {
        const act = JSON.parse(l.leadActivity || '{}');
        return (act.previewCtaClicked === true || !!act.previewCtaClickedAt) && (hasAuditIntent || !!act.auditCtaClickedAt);
      } catch(e) { return false; }
    }).length;

    const checkouts = events.filter(e => e.eventName === 'checkout_started' && (e.pagePath?.includes('/audit') || e.productId === 'consultation')).length ||
                      filteredLeads.filter(l => {
                        const src = String(l.source || '').toLowerCase();
                        const hasAuditIntent = src.includes('audit') || src.includes('strategy');
                        try {
                          const act = JSON.parse(l.leadActivity || '{}');
                          return !!act.checkoutStartedAt && (hasAuditIntent || !!act.auditCtaClickedAt);
                        } catch(e) { return false; }
                      }).length;

    const purchased = filteredPurchases.filter(p => {
      const isAudit = p.productId === 'consultation' || (parseFloat(p.amount) || 0) >= 199;
      return isAudit;
    }).length || filteredLeads.filter(l => l.strategyReportPurchased === true).length;

    const booked = filteredLeads.filter(l => {
      try {
        const act = JSON.parse(l.leadActivity || '{}');
        return act.bookedAudit === true || !!act.auditBookedAt || l.offlineStatus === 'Booked Audit' || l.offlineStatus === 'Audit Completed';
      } catch(e) { return false; }
    }).length;

    const completed = filteredLeads.filter(l => l.offlineStatus === 'Audit Completed').length;

    return { starts, preview, unlock, checkouts, purchased, booked, completed };
  };

  const compileFunnelStats = (getStatsFn: (filterFn: (d: string) => boolean) => any) => {
    return {
      today: getStatsFn(isToday),
      last7d: getStatsFn(is7d),
      last30d: getStatsFn(is30d),
      allTime: getStatsFn(isAllTimePost),
    };
  };

  const calculatorFunnelStats = compileFunnelStats(getCalculatorFunnelStats);
  const aiFinderFunnelStats = compileFunnelStats(getAiFinderFunnelStats);
  const auditFunnelStats = compileFunnelStats(getAuditFunnelStats);

  // Leak calculations
  const calcLeaks = (starts: number, completed: number, pricing: number, checkouts: number, purchases: number) => {
    const drops = [
      { transition: 'Start → Step 6', drop: calculateDropOff(starts, completed) },
      { transition: 'Step 6 → Pricing View', drop: calculateDropOff(completed, pricing) },
      { transition: 'Pricing View → Checkout Start', drop: calculateDropOff(pricing, checkouts) },
      { transition: 'Checkout Start → Purchase', drop: calculateDropOff(checkouts, purchases) }
    ];
    return drops.reduce((max, d) => d.drop > max.drop ? d : max, { transition: 'None', drop: 0 });
  };

  const aiFinderLeaks = (starts: number, generated: number, preview: number, unlock: number, checkouts: number, purchases: number) => {
    const drops = [
      { transition: 'Start → Results Generated', drop: calculateDropOff(starts, generated) },
      { transition: 'Results Generated → Preview Viewed', drop: calculateDropOff(generated, preview) },
      { transition: 'Preview Viewed → Unlock Clicked', drop: calculateDropOff(preview, unlock) },
      { transition: 'Unlock Clicked → Checkout Started', drop: calculateDropOff(unlock, checkouts) },
      { transition: 'Checkout Started → Purchase', drop: calculateDropOff(checkouts, purchases) }
    ];
    return drops.reduce((max, d) => d.drop > max.drop ? d : max, { transition: 'None', drop: 0 });
  };

  const auditLeaks = (starts: number, preview: number, unlock: number, checkouts: number, purchased: number, booked: number, completed: number) => {
    const drops = [
      { transition: 'Audit Page → Preview Viewed', drop: calculateDropOff(starts, preview) },
      { transition: 'Preview Viewed → Unlock Clicked', drop: calculateDropOff(preview, unlock) },
      { transition: 'Unlock Clicked → Checkout Started', drop: calculateDropOff(unlock, checkouts) },
      { transition: 'Checkout Started → Purchased', drop: calculateDropOff(checkouts, purchased) },
      { transition: 'Purchased → Booked', drop: calculateDropOff(purchased, booked) },
      { transition: 'Booked → Audit Completed', drop: calculateDropOff(booked, completed) }
    ];
    return drops.reduce((max, d) => d.drop > max.drop ? d : max, { transition: 'None', drop: 0 });
  };

  const calcLeaksAllTime = calcLeaks(
    calculatorFunnelStats.allTime.starts,
    calculatorFunnelStats.allTime.completed,
    calculatorFunnelStats.allTime.pricing,
    calculatorFunnelStats.allTime.checkouts,
    calculatorFunnelStats.allTime.purchases
  );

  const aiFinderLeaksAllTime = aiFinderLeaks(
    aiFinderFunnelStats.allTime.starts,
    aiFinderFunnelStats.allTime.generated,
    aiFinderFunnelStats.allTime.preview,
    aiFinderFunnelStats.allTime.unlock,
    aiFinderFunnelStats.allTime.checkouts,
    aiFinderFunnelStats.allTime.purchases
  );

  const auditLeaksAllTime = auditLeaks(
    auditFunnelStats.allTime.starts,
    auditFunnelStats.allTime.preview,
    auditFunnelStats.allTime.unlock,
    auditFunnelStats.allTime.checkouts,
    auditFunnelStats.allTime.purchased,
    auditFunnelStats.allTime.booked,
    auditFunnelStats.allTime.completed
  );

  // Group by Product (Post-Telemetry)
  const PRODUCT_NAMES: Record<string, string> = {
    'funding-match-report': 'Funding Match Report ($19)',
    'funding-roadmap': 'Funding Action Plan ($49)',
    'funding-bundle': 'Complete Funding Bundle ($79)',
    'funding-toolkit': 'Funding Application Toolkit ($29)',
    'funding-approval-library': 'Funding Approval Library ($9)',
    'consultation': 'Strategy Session Audit ($199)',
  };

  const productStatsMap = new Map<string, { count: number; revenue: number }>();
  for (const p of postPurchases) {
    const prodId = p.productId || 'unknown';
    if (!productStatsMap.has(prodId)) {
      productStatsMap.set(prodId, { count: 0, revenue: 0 });
    }
    const stat = productStatsMap.get(prodId)!;
    stat.count += 1;
    stat.revenue += parseFloat(p.amount) || 0;
  }
  const productStats = Array.from(productStatsMap.entries())
    .map(([id, data]) => ({
      id,
      name: PRODUCT_NAMES[id] || `Product: ${id}`,
      ...data,
    }))
    .sort((a, b) => b.revenue - a.revenue);

  // Group by Landing Page (Post-Telemetry)
  const pageStatsMap = new Map<string, { visitors: Set<string>; leads: number; purchases: number; revenue: number }>();
  for (const e of postTelemetry) {
    if (e.pagePath) {
      if (!pageStatsMap.has(e.pagePath)) pageStatsMap.set(e.pagePath, { visitors: new Set(), leads: 0, purchases: 0, revenue: 0 });
      pageStatsMap.get(e.pagePath)!.visitors.add(e.sessionId);
    }
  }
  for (const l of postLeads) {
    if (l.pagePath) {
      if (!pageStatsMap.has(l.pagePath)) pageStatsMap.set(l.pagePath, { visitors: new Set(), leads: 0, purchases: 0, revenue: 0 });
      pageStatsMap.get(l.pagePath)!.leads += 1;
    }
  }
  for (const p of postPurchases) {
    const page = p.landingPage || '/calculator';
    if (!pageStatsMap.has(page)) pageStatsMap.set(page, { visitors: new Set(), leads: 0, purchases: 0, revenue: 0 });
    const stat = pageStatsMap.get(page)!;
    stat.purchases += 1;
    stat.revenue += parseFloat(p.amount) || 0;
  }
  const pageStats = Array.from(pageStatsMap.entries())
    .map(([page, data]) => ({
      page,
      visitors: data.visitors.size,
      leads: data.leads,
      purchases: data.purchases,
      revenue: data.revenue,
    }))
    .filter((p) => p.visitors > 0 || p.leads > 0 || p.purchases > 0)
    .sort((a, b) => b.revenue - a.revenue || b.visitors - a.visitors)
    .slice(0, 15);

  // Traffic channel scoreboard (Post-Telemetry)
  function getTrafficChannel(utmSource: string = '', utmMedium: string = '', referrer: string = ''): 'Google Organic' | 'Email' | 'Direct' | 'Referral / Other' {
    const src = (utmSource || '').toLowerCase();
    const med = (utmMedium || '').toLowerCase();
    const ref = (referrer || '').toLowerCase();

    if (src.includes('email') || med.includes('email') || src === 'calculator_recovery' || src === 'cart_recovery' || src === 'alert_nurture' || src === 'reactivation' || src.includes('newsletter')) {
      return 'Email';
    }
    if (ref.includes('google.') || src.includes('organic') || med.includes('organic') || src.includes('seo') || src === 'google') {
      return 'Google Organic';
    }
    if (!ref || ref === 'direct' || ref === 'direct_organic' || ref === '') {
      if (!src) return 'Direct';
    }
    return 'Referral / Other';
  }

  const channelsList = ['Google Organic', 'Email', 'Direct', 'Referral / Other'] as const;
  type ChannelType = typeof channelsList[number];

  const channelStats: Record<ChannelType, { visitors: Set<string>; leads: number; purchases: number; revenue: number }> = {
    'Google Organic': { visitors: new Set(), leads: 0, purchases: 0, revenue: 0 },
    'Email': { visitors: new Set(), leads: 0, purchases: 0, revenue: 0 },
    'Direct': { visitors: new Set(), leads: 0, purchases: 0, revenue: 0 },
    'Referral / Other': { visitors: new Set(), leads: 0, purchases: 0, revenue: 0 },
  };

  for (const e of postTelemetry) {
    const ch = getTrafficChannel(e.utmSource, e.utmMedium, e.referrer);
    channelStats[ch].visitors.add(e.sessionId);
  }
  for (const l of postLeads) {
    const ch = getTrafficChannel(l.utmSource, l.utmMedium, '');
    channelStats[ch].leads += 1;
  }
  for (const p of postPurchases) {
    const ch = getTrafficChannel(p.utmSource, p.utmMedium, p.referrer);
    channelStats[ch].purchases += 1;
    channelStats[ch].revenue += parseFloat(p.amount) || 0;
  }

  const channelData = channelsList.map((chName) => {
    const stat = channelStats[chName];
    const visitorCount = stat.visitors.size;
    const rpvVal = visitorCount > 0 ? stat.revenue / visitorCount : 0;
    return {
      name: chName,
      visitors: visitorCount,
      leads: stat.leads,
      purchases: stat.purchases,
      revenue: stat.revenue,
      rpv: rpvVal,
    };
  });
  const getUtmStats = (param: 'utmSource' | 'utmMedium' | 'utmCampaign') => {
    const map = new Map<string, { visitors: Set<string>; leads: number; purchases: number; revenue: number }>();

    for (const e of postTelemetry) {
      const val = String(e[param] || 'Direct/None').trim() || 'Direct/None';
      if (!map.has(val)) map.set(val, { visitors: new Set(), leads: 0, purchases: 0, revenue: 0 });
      map.get(val)!.visitors.add(e.sessionId);
    }

    for (const l of postLeads) {
      const val = String(l[param] || 'Direct/None').trim() || 'Direct/None';
      if (!map.has(val)) map.set(val, { visitors: new Set(), leads: 0, purchases: 0, revenue: 0 });
      map.get(val)!.leads += 1;
    }

    for (const p of postPurchases) {
      const val = String(p[param] || 'Direct/None').trim() || 'Direct/None';
      if (!map.has(val)) map.set(val, { visitors: new Set(), leads: 0, purchases: 0, revenue: 0 });
      const stat = map.get(val)!;
      stat.purchases += 1;
      stat.revenue += parseFloat(p.amount) || 0;
    }

    return Array.from(map.entries())
      .map(([name, data]) => ({
        name,
        visitors: data.visitors.size,
        leads: data.leads,
        purchases: data.purchases,
        revenue: data.revenue,
      }))
      .sort((a, b) => b.revenue - a.revenue || b.visitors - a.visitors)
      .slice(0, 10);
  };

  const utmSourceStats = getUtmStats('utmSource');
  const utmMediumStats = getUtmStats('utmMedium');
  const utmCampaignStats = getUtmStats('utmCampaign');

  // Pre-Telemetry Historical metrics
  const preTotalRevenue = prePurchases.reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);
  const preLeadsCount = preLeads.length;
  const prePurchasesCount = prePurchases.length;
  const preBookingsCount = preLeads.filter(l => {
    try {
      const act = JSON.parse(l.leadActivity || '{}');
      return act.bookedAudit === true || !!act.auditBookedAt || l.offlineStatus === 'Booked Audit' || l.offlineStatus === 'Audit Completed';
    } catch(e) { return false; }
  }).length;

  // --- Founder Revenue Command Center Calculations ---
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayStartTime = todayStart.getTime();

  const monthStart = new Date();
  monthStart.setDate(1);
  monthStart.setHours(0, 0, 0, 0);
  const monthStartTime = monthStart.getTime();

  const isTimestampToday = (ts?: string | null) => {
    if (!ts) return false;
    return parseDateSafe(ts).getTime() >= todayStartTime;
  };

  const isTimestampThisMonth = (ts?: string | null) => {
    if (!ts) return false;
    return parseDateSafe(ts).getTime() >= monthStartTime;
  };

  // Today Operations Stats
  const telemetryToday = postTelemetry.filter(e => isTimestampToday(e.timestamp));
  const visitorsToday = new Set(telemetryToday.map(e => e.sessionId)).size;
  const calcStartsToday = telemetryToday.filter(e => e.eventName === 'calculator_start').length;

  const purchasesToday = postPurchases.filter(p => isTimestampToday(p.createdAt || p.timestamp));
  const revenueToday = purchasesToday.reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);
  const reportPurchasesToday = purchasesToday.filter(p => p.productId !== 'consultation' && (parseFloat(p.amount) || 0) < 199).length;
  const auditPurchasesToday = purchasesToday.filter(p => p.productId === 'consultation' || (parseFloat(p.amount) || 0) >= 199).length;

  // MTD
  const purchasesThisMonth = postPurchases.filter(p => isTimestampThisMonth(p.createdAt || p.timestamp));
  const revenueThisMonth = purchasesThisMonth.reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);

  // MTD Organic Visitors & Revenue for RP1KOV
  const telemetryThisMonth = postTelemetry.filter(e => isTimestampThisMonth(e.timestamp));
  const organicTelemetryThisMonth = telemetryThisMonth.filter(e => {
    const ch = getTrafficChannel(e.utmSource, e.utmMedium, e.referrer);
    return ch === 'Google Organic';
  });
  const organicVisitorsThisMonth = new Set(organicTelemetryThisMonth.map(e => e.sessionId)).size;

  const organicPurchasesThisMonth = purchasesThisMonth.filter(p => {
    const ch = getTrafficChannel(p.utmSource, p.utmMedium, p.referrer);
    return ch === 'Google Organic';
  });
  const organicRevenueThisMonth = organicPurchasesThisMonth.reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);
  const mtdRp1kov = organicVisitorsThisMonth > 0 ? (organicRevenueThisMonth / organicVisitorsThisMonth) * 1000 : 0;

  // Post-telemetry (All-time) Organic Visitors & Revenue for RP1KOV
  const organicTelemetryPost = postTelemetry.filter(e => {
    const ch = getTrafficChannel(e.utmSource, e.utmMedium, e.referrer);
    return ch === 'Google Organic';
  });
  const postOrganicVisitors = new Set(organicTelemetryPost.map(e => e.sessionId)).size;

  const organicPurchasesPost = postPurchases.filter(p => {
    const ch = getTrafficChannel(p.utmSource, p.utmMedium, p.referrer);
    return ch === 'Google Organic';
  });
  const postOrganicRevenue = organicPurchasesPost.reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);
  const postRp1kov = postOrganicVisitors > 0 ? (postOrganicRevenue / postOrganicVisitors) * 1000 : 0;

  // Unit Economics
  const totalPurchasesCount = postPurchases.length;
  const calculatedAov = totalPurchasesCount > 0 ? postTotalRevenue / totalPurchasesCount : 0;

  const uniqueCustomerEmails = new Set(postPurchases.map(p => (p.email || p.customerEmail || '').toLowerCase().trim()).filter(Boolean));
  const realizedLtv = uniqueCustomerEmails.size > 0 ? postTotalRevenue / uniqueCustomerEmails.size : 0;

  // Pipeline Calculations & Confidence Weighting
  const activeReportCheckoutsCount = postLeads.filter(l => {
    try {
      const act = JSON.parse(l.leadActivity || '{}');
      return !!act.checkoutStartedAt && l.reportPurchased !== true && l.strategyReportPurchased !== true;
    } catch(e) { return false; }
  }).length;

  const pendingAuditBookingsCount = postLeads.filter(l => {
    try {
      const act = JSON.parse(l.leadActivity || '{}');
      return act.bookedAudit === true && act.depositPaid !== true;
    } catch(e) { return false; }
  }).length;

  // Calculate historical conversion rates dynamically for pipeline weighting (with solid default fallbacks)
  const totalCheckoutsPost = calculatorFunnelStats.allTime.checkouts + aiFinderFunnelStats.allTime.checkouts;
  const totalPurchasesPost = calculatorFunnelStats.allTime.purchases + aiFinderFunnelStats.allTime.purchases;
  const estCheckoutCvr = totalCheckoutsPost > 0 ? totalPurchasesPost / totalCheckoutsPost : 0.11;
  const checkoutCvr = Math.max(0.01, Math.min(1.0, estCheckoutCvr)); // bounded

  const totalBookingsAll = auditFunnelStats.allTime.booked;
  const totalPaidBookings = postBookingsCount;
  const estBookingCvr = totalBookingsAll > 0 ? totalPaidBookings / totalBookingsAll : 0.35;
  const bookingCvr = Math.max(0.01, Math.min(1.0, estBookingCvr));

  const confidenceWeightedPipeline = (activeReportCheckoutsCount * 79 * checkoutCvr) + (pendingAuditBookingsCount * 199 * bookingCvr);
  const potentialRevenueValue = (activeReportCheckoutsCount * 79) + (pendingAuditBookingsCount * 199);

  // MTD Pace & July Forecast using rolling averages (last 7 days traffic rate)
  const telemetry7d = postTelemetry.filter(e => is7d(e.timestamp));
  const organicTelemetry7d = telemetry7d.filter(e => {
    const ch = getTrafficChannel(e.utmSource, e.utmMedium, e.referrer);
    return ch === 'Google Organic';
  });
  const organicVisitors7d = new Set(organicTelemetry7d.map(e => e.sessionId)).size;
  const organicVisitorsPerDay7d = organicVisitors7d / 7;
  const projectedJulyVisitors = organicVisitorsPerDay7d * 31;
  const projectedJulyRevenue = (projectedJulyVisitors / 1000) * postRp1kov;

  // MTD Days remaining in July
  const currentDate = new Date();
  const currentMonthIdx = currentDate.getMonth(); // 0-indexed, 5 = June, 6 = July
  let julyDaysRemaining = 31;
  if (currentMonthIdx === 6) { // July
    julyDaysRemaining = Math.max(1, 31 - currentDate.getDate());
  } else if (currentMonthIdx < 6) { // June
    julyDaysRemaining = 31;
  } else {
    julyDaysRemaining = 1;
  }
  const julyRevenueGoal = 500;
  const julyRevenueProgressPercent = Math.min(100, Math.round((revenueThisMonth / julyRevenueGoal) * 100));
  const julyRevenueNeeded = Math.max(0, julyRevenueGoal - revenueThisMonth);
  const requiredDailyPace = julyRevenueNeeded / julyDaysRemaining;

  // Days Since Last Sale calculation
  let daysSinceLastSale = 'No sales recorded';
  let lastPurchaseDesc = 'Never';
  if (purchases.length > 0) {
    const sortedPurchases = [...purchases].sort((a, b) => parseDateSafe(b.createdAt || b.timestamp).getTime() - parseDateSafe(a.createdAt || a.timestamp).getTime());
    const lastSaleDate = parseDateSafe(sortedPurchases[0].createdAt || sortedPurchases[0].timestamp);
    const diffMs = now - lastSaleDate.getTime();
    const diffDays = Math.floor(diffMs / ONE_DAY);
    daysSinceLastSale = diffDays === 0 ? 'Today' : `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
    lastPurchaseDesc = `${sortedPurchases[0].name || 'Founder'} (${sortedPurchases[0].productId}) - $${sortedPurchases[0].amount}`;
  }

  // RES rating with threshold validation
  const resScore = postRp1kov;
  const hasEnoughDataForRes = postOrganicVisitors >= 500 || totalPurchasesCount >= 5;
  let resRating = { color: 'text-red-650 bg-red-50 border-red-200', text: 'Funnel Not Validated', badge: '🔴 Under $100' };
  if (resScore >= 700) {
    resRating = { color: 'text-purple-600 bg-purple-50 border-purple-200', text: 'Scale Aggressively', badge: '🟣 $700+' };
  } else if (resScore >= 300) {
    resRating = { color: 'text-emerald-600 bg-emerald-50 border-emerald-200', text: 'Healthy Growth', badge: '🟢 $300–700' };
  } else if (resScore >= 100) {
    resRating = { color: 'text-amber-600 bg-amber-50 border-amber-200', text: 'Validation Stage', badge: '🟡 $100–300' };
  }

  // Leak calculations by Potential Revenue Lost
  const calculateLeakRevenueLost = (transition: string, dropPercentage: number, startsCount: number) => {
    const totalLost = Math.max(0, Math.round(startsCount * (dropPercentage / 100)));
    if (transition.includes('Checkout Start → Purchase') || transition.includes('Checkout Started → Purchased')) {
      return totalLost * 79;
    } else if (transition.includes('Pricing View → Checkout Start') || transition.includes('Unlock Clicked → Checkout Started')) {
      return totalLost * checkoutCvr * 79;
    } else if (transition.includes('Step 6 → Pricing View') || transition.includes('Results Generated → Preview Viewed')) {
      return totalLost * 0.20 * checkoutCvr * 79;
    }
    return totalLost * 0.05 * checkoutCvr * 79;
  };

  const leaksListForRevenue = [
    { 
      name: 'Calculator Funnel', 
      transition: calcLeaksAllTime.transition, 
      drop: calcLeaksAllTime.drop,
      revenueLost: calculateLeakRevenueLost(calcLeaksAllTime.transition, calcLeaksAllTime.drop, calculatorFunnelStats.allTime.starts)
    },
    { 
      name: 'AI Finder Funnel', 
      transition: aiFinderLeaksAllTime.transition, 
      drop: aiFinderLeaksAllTime.drop,
      revenueLost: calculateLeakRevenueLost(aiFinderLeaksAllTime.transition, aiFinderLeaksAllTime.drop, aiFinderFunnelStats.allTime.starts)
    },
    { 
      name: 'Audit Funnel', 
      transition: auditLeaksAllTime.transition, 
      drop: auditLeaksAllTime.drop,
      revenueLost: calculateLeakRevenueLost(auditLeaksAllTime.transition, auditLeaksAllTime.drop, auditFunnelStats.allTime.starts)
    }
  ];
  // Sort leaks by absolute Potential Revenue Lost rather than drop percentages
  leaksListForRevenue.sort((a, b) => b.revenueLost - a.revenueLost);
  const worstLeak = leaksListForRevenue[0] || { name: 'None', transition: 'N/A', drop: 0, revenueLost: 0 };

  // Leak Recommendation
  let leakRecommendation = "Optimize page layouts and call-to-actions to drive interest.";
  if (worstLeak.transition.includes('Checkout Start → Purchase') || worstLeak.transition.includes('Checkout Started → Purchased')) {
    leakRecommendation = "Reduce checkout friction. Add trust triggers, guarantees, and SSL badges near payment fields.";
  } else if (worstLeak.transition.includes('Pricing View → Checkout Start') || worstLeak.transition.includes('Unlock Clicked → Checkout Started')) {
    leakRecommendation = "Improve pricing copy. Focus on ROI, offer value-adds, and clarify refund guarantees.";
  } else if (worstLeak.transition.includes('Step 6 → Pricing View') || worstLeak.transition.includes('Results Generated → Preview Viewed')) {
    leakRecommendation = "Strengthen lead-to-preview bridge. Use a more compelling teaser and clarify value.";
  } else if (worstLeak.transition.includes('Start → Step 6') || worstLeak.transition.includes('Start → Results Generated')) {
    leakRecommendation = "Simplify calculator intake steps. Reduce form fields and make choices easier.";
  }

  // Landing Page conversion conversion rate
  const pagesForConversion = Array.from(pageStatsMap.entries())
    .map(([page, data]) => {
      const visitorsCount = data.visitors.size;
      const cvr = visitorsCount > 0 ? (data.purchases / visitorsCount) * 100 : 0;
      const starts = postTelemetry.filter(e => e.pagePath === page && e.eventName === 'calculator_start').length;
      return { page, cvr, purchases: data.purchases, visitors: visitorsCount, starts };
    })
    .filter(p => p.visitors >= 5);
  pagesForConversion.sort((a, b) => b.cvr - a.cvr);
  const topConvertingPage = pagesForConversion[0] || { page: 'N/A', cvr: 0, purchases: 0, visitors: 0, starts: 0 };

  const keyParam = resolvedParams.key ? `?key=${resolvedParams.key}` : '';
  const keyParamAmp = resolvedParams.key ? `&key=${resolvedParams.key}` : '';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <Header />

      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-7xl">
        {/* Title */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <span className="bg-indigo-150 text-indigo-700 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1.5 w-fit">
              <Sparkles className="w-3.5 h-3.5" /> Executive Command Center
            </span>
            <h1 className="text-3xl font-extrabold text-gray-950 tracking-tight mt-2">Executive Revenue Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/admin/leads"
              className="text-sm font-semibold text-indigo-650 hover:text-indigo-850 flex items-center gap-1.5"
            >
              Lead Manager Dashboard <ArrowRight className="w-4 h-4" />
            </a>
            <AdminLogoutButton />
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <a
              href={`/admin/dashboard${keyParam}`}
              className={`border-b-2 py-4 px-1 text-sm font-bold uppercase tracking-wider ${
                resolvedTab === 'executive'
                  ? 'border-indigo-600 text-indigo-650'
                  : 'border-transparent text-gray-400 hover:border-gray-300 hover:text-gray-600'
              }`}
            >
              👑 Revenue Command Center
            </a>
            <a
              href={`/admin/dashboard?tab=telemetry${keyParamAmp}`}
              className={`border-b-2 py-4 px-1 text-sm font-bold uppercase tracking-wider ${
                resolvedTab === 'telemetry'
                  ? 'border-indigo-600 text-indigo-650'
                  : 'border-transparent text-gray-400 hover:border-gray-300 hover:text-gray-600'
              }`}
            >
              📊 Telemetry & Funnel Audits
            </a>
          </nav>
        </div>

        {resolvedTab === 'executive' ? (
          /* 👑👑👑 FOUNDER REVENUE COMMAND CENTER VIEW 👑👑👑 */
          <div className="space-y-8">
            {/* Top Row: Daily Business Stats */}
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-indigo-600" />
                Daily Operations Tracker
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                  { label: "Organic Visitors Today", value: visitorsToday, sub: "Unique active sessions today" },
                  { label: "Calculator Starts Today", value: calcStartsToday, sub: "Calculator conversions today" },
                  { label: "Report Purchases Today", value: reportPurchasesToday, sub: "Checkouts (<$199) today" },
                  { label: "Audit Purchases Today", value: auditPurchasesToday, sub: "Checkouts (≥$199) today" },
                  { label: "Revenue Today", value: `$${revenueToday.toLocaleString()}`, sub: `${purchasesToday.length} total payments` },
                  { label: "Revenue This Month (MTD)", value: `$${revenueThisMonth.toLocaleString()}`, sub: `${purchasesThisMonth.length} MTD payments` },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs">
                    <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider leading-none">{stat.label}</p>
                    <p className="text-3xl font-black text-slate-950 mt-3 tracking-tight">{stat.value}</p>
                    <p className="text-[9px] text-gray-400 font-semibold mt-1 leading-tight">{stat.sub}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2: Executive Revenue Scorecard */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* July Goal Progress Card */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-indigo-700 font-extrabold uppercase tracking-wider bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded">July Revenue Goal</span>
                  <div className="flex justify-between items-baseline mt-3">
                    <p className="text-3xl font-black text-slate-950">${revenueThisMonth.toLocaleString()}</p>
                    <span className="text-sm font-extrabold text-gray-400">/ ${julyRevenueGoal}</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full mt-3 overflow-hidden">
                    <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${julyRevenueProgressPercent}%` }} />
                  </div>
                </div>
                <div className="mt-4 space-y-1.5 text-xs text-gray-500 font-semibold border-t border-gray-100 pt-3">
                  <div className="flex justify-between">
                    <span>Progress:</span>
                    <span className="text-slate-900 font-bold">{julyRevenueProgressPercent}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Needed:</span>
                    <span className="text-slate-900 font-bold">${julyRevenueNeeded.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Days Remaining:</span>
                    <span className="text-slate-900 font-bold">{julyDaysRemaining}</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-100 pt-1.5 mt-1 text-indigo-650">
                    <span>Required Daily Pace:</span>
                    <span className="font-extrabold">${requiredDailyPace.toFixed(2)}/day</span>
                  </div>
                </div>
              </div>

              {/* Confidence-Weighted Sales Pipeline Card */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-indigo-700 font-extrabold uppercase tracking-wider bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded">Expected Pipeline Value</span>
                  <p className="text-3xl font-black text-slate-950 mt-3">${confidenceWeightedPipeline.toFixed(2)}</p>
                  <p className="text-[9px] text-gray-400 font-semibold mt-1">Confidence-weighted deal estimates</p>
                </div>
                <div className="mt-4 space-y-1.5 text-xs text-gray-500 font-semibold border-t border-gray-100 pt-3">
                  <div className="flex justify-between">
                    <span>Report Checkouts:</span>
                    <span className="text-slate-900 font-bold">{activeReportCheckoutsCount} <span className="text-gray-400 font-medium">({(checkoutCvr * 100).toFixed(0)}% CVR)</span></span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pending Audits:</span>
                    <span className="text-slate-900 font-bold">{pendingAuditBookingsCount} <span className="text-gray-400 font-medium">({(bookingCvr * 100).toFixed(0)}% CVR)</span></span>
                  </div>
                  <div className="flex justify-between border-t border-gray-100 pt-1.5 mt-1 text-gray-400 text-[9px] font-bold uppercase">
                    <span>Raw Potential (Unweighted):</span>
                    <span>${potentialRevenueValue.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Sales Cadence Card */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-indigo-700 font-extrabold uppercase tracking-wider bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded">Sales Cadence</span>
                  <div className="mt-3 flex items-baseline gap-2">
                    <p className="text-3xl font-black text-slate-950">{daysSinceLastSale}</p>
                    <span className="text-xs font-bold text-gray-400">since last sale</span>
                  </div>
                </div>
                <div className="mt-4 space-y-1.5 text-xs text-gray-500 font-semibold border-t border-gray-100 pt-3">
                  <div className="text-[9px] text-gray-400 uppercase font-bold tracking-wider">Last Purchase Details</div>
                  <p className="text-xs text-slate-800 font-bold mt-1 break-words">{lastPurchaseDesc}</p>
                </div>
              </div>
            </div>

            {/* Row 3: Unit Economics & Traction */}
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-indigo-600" />
                Unit Economics & Traction
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* RES Widget */}
                <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs flex flex-col justify-between">
                  <div>
                    <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider">Revenue Efficiency Score (RES)</p>
                    {hasEnoughDataForRes ? (
                      <div className="flex items-baseline gap-2 mt-2">
                        <p className="text-3xl font-black text-slate-950">${resScore.toFixed(0)}</p>
                        <span className="text-[10px] font-bold text-gray-400">per 1k visits</span>
                      </div>
                    ) : (
                      <p className="text-xl font-bold text-slate-400 mt-3 leading-snug">Insufficient data for RES</p>
                    )}
                  </div>
                  {hasEnoughDataForRes ? (
                    <div className={`mt-3 px-3 py-1.5 rounded-lg border text-center text-xs font-bold ${resRating.color}`}>
                      {resRating.badge} · {resRating.text}
                    </div>
                  ) : (
                    <div className="mt-3 text-[9px] text-gray-400 leading-snug font-medium">
                      Requires 500+ organic visitors or 5+ purchases to compute reliable score.
                    </div>
                  )}
                </div>

                {/* RP1KOV Widget */}
                <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs flex flex-col justify-between">
                  <div>
                    <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider">RP1KOV (Rev / 1k Org Visitors)</p>
                    <p className="text-3xl font-black text-indigo-650 mt-2">${postRp1kov.toFixed(2)}</p>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-1 border-t border-gray-100 pt-3 text-[9px] text-gray-500 font-bold uppercase text-center">
                    <div>
                      <div className="text-gray-400 text-[8px]">Target</div>
                      <div className="text-slate-900 font-extrabold">$300.00</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-[8px]">Prev Mo</div>
                      <div className="text-slate-900 font-extrabold">$0.00</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-[8px]">Trend</div>
                      <div className="text-emerald-600 font-extrabold">+∞</div>
                    </div>
                  </div>
                </div>

                {/* AOV Card */}
                <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs">
                  <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider">Average Order Value (AOV)</p>
                  <p className="text-3xl font-black text-slate-950 mt-2">${calculatedAov.toFixed(2)}</p>
                  <p className="text-xs text-gray-500 mt-1">Total revenue divided by total purchases</p>
                </div>

                {/* Realized LTV Card */}
                <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs">
                  <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider">Realized Customer LTV</p>
                  <p className="text-3xl font-black text-slate-950 mt-2">${realizedLtv.toFixed(2)}</p>
                  <p className="text-xs text-gray-500 mt-1">Cumulative value of unique email cohorts</p>
                </div>
              </div>
            </div>

            {/* Row 4: July Traffic & Funnel Health Forecast */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Funnel Leak Alert - Ranked by Revenue Lost */}
              <div className="bg-gradient-to-br from-red-50 to-indigo-50 border border-red-100 rounded-xl p-6 shadow-xs flex items-start gap-4">
                <div className="bg-red-100 text-red-700 p-2.5 rounded-lg">
                  <TrendingUp className="w-5 h-5 shrink-0 transform rotate-180" />
                </div>
                <div className="space-y-2 w-full">
                  <span className="text-[10px] text-red-700 font-extrabold uppercase tracking-wider bg-red-100 px-2 py-0.5 rounded">Conversion Warning</span>
                  <h3 className="text-base font-bold text-slate-900 mt-2">Worst Funnel Leak: {worstLeak.name}</h3>
                  <div className="text-xs text-slate-700 space-y-1">
                    <div className="flex justify-between">
                      <span>Transition:</span>
                      <span className="font-bold text-slate-900">{worstLeak.transition}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Drop-off Rate:</span>
                      <span className="font-bold text-red-650">{worstLeak.drop.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100/50 pb-1.5 mb-1.5">
                      <span>Step Conversion Rate:</span>
                      <span className="font-bold text-indigo-650">{(100 - worstLeak.drop).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between text-slate-900 font-bold bg-white/70 px-2 py-1 rounded">
                      <span>Potential Revenue Lost:</span>
                      <span className="text-red-700">${Math.round(worstLeak.revenueLost).toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="text-xs text-slate-650 bg-white/90 border border-red-100/50 rounded-lg p-3 mt-2 font-medium">
                    <span className="font-bold text-red-700">💡 Recommendation: </span> {leakRecommendation}
                  </div>
                </div>
              </div>

              {/* Revenue Forecast (Rolling Traffic pace) */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-indigo-700 font-extrabold uppercase tracking-wider bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded">July Revenue Forecast</span>
                  <div className="flex justify-between items-baseline mt-3">
                    <p className="text-3xl font-black text-slate-950">${Math.round(projectedJulyRevenue).toLocaleString()}</p>
                    <span className="text-xs text-gray-400 font-bold">Projected Month-End</span>
                  </div>
                  <p className="text-[9px] text-gray-400 font-semibold mt-1">Based on rolling 7-day organic traffic pace</p>
                </div>
                <div className="mt-4 space-y-1.5 text-xs text-gray-500 font-semibold border-t border-gray-100 pt-3">
                  <div className="flex justify-between">
                    <span>Rolling 7d Organic Traffic:</span>
                    <span className="text-slate-900 font-bold">{organicVisitorsPerDay7d.toFixed(1)} visitors/day</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Projected July Visitors:</span>
                    <span className="text-slate-900 font-bold">{Math.round(projectedJulyVisitors).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-100 pt-1.5 mt-1 text-[9px] uppercase font-bold text-indigo-650">
                    <span>At Target RP1KOV ($300):</span>
                    <span>${Math.round((projectedJulyVisitors / 1000) * 300).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Executive Revenue by Landing Page */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs">
              <div className="border-b border-gray-100 px-6 py-4 flex items-center justify-between">
                <h2 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                  <Layers className="w-5 h-5 text-indigo-600" />
                  Revenue & Conversion by Landing Page
                </h2>
                <span className="text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 px-2.5 py-1 rounded uppercase tracking-wider">
                  Money Pages Ranked
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-gray-50/70 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-3.5">Landing Page</th>
                      <th className="px-6 py-3.5 text-center">Visitors</th>
                      <th className="px-6 py-3.5 text-center">Calculator Starts</th>
                      <th className="px-6 py-3.5 text-center">Purchases</th>
                      <th className="px-6 py-3.5 text-center">Visitor-to-Purchase CVR</th>
                      <th className="px-6 py-3.5 text-right">Revenue</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 font-medium text-slate-700">
                    {pageStats.map((stat, idx) => {
                      const cvr = stat.visitors > 0 ? (stat.purchases / stat.visitors) * 100 : 0;
                      return (
                        <tr key={idx} className="hover:bg-slate-50/50">
                          <td className="px-6 py-4 font-bold text-slate-800 break-all max-w-[250px] truncate">{stat.page}</td>
                          <td className="px-6 py-4 text-center">{stat.visitors}</td>
                          <td className="px-6 py-4 text-center">{stat.leads}</td>
                          <td className="px-6 py-4 text-center">{stat.purchases}</td>
                          <td className="px-6 py-4 text-center font-bold text-indigo-650">{cvr.toFixed(1)}%</td>
                          <td className="px-6 py-4 text-right font-black text-slate-950">${stat.revenue.toLocaleString()}</td>
                        </tr>
                      );
                    })}
                    {pageStats.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-6 py-8 text-center text-gray-400 font-semibold">No page traffic or revenue recorded post-telemetry.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              {topConvertingPage.page !== 'N/A' && (
                <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 text-xs text-gray-600 font-semibold flex items-center justify-between">
                  <span>🏆 Top Converting Asset: <span className="font-extrabold text-slate-900">{topConvertingPage.page}</span> ({topConvertingPage.visitors} visitors)</span>
                  <span className="text-indigo-650 font-extrabold">{topConvertingPage.cvr.toFixed(1)}% CVR</span>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* 📊📊📊 ORIGINAL TELEMETRY & TECHNICAL FUNNEL VIEW 📊📊📊 */
          <div className="space-y-8">
            {/* Telemetry Status Box */}
            <div className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-6">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div>
                  <h2 className="text-lg font-bold text-indigo-950 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-indigo-600 animate-pulse" />
                    Telemetry System Status
                  </h2>
                  <p className="text-sm text-indigo-800 mt-1 font-semibold">
                    Telemetry Active Since: <span className="font-black text-indigo-950">{TELEMETRY_LAUNCH_DATE_STR}</span>
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full lg:w-auto">
                  <div className="bg-white border border-indigo-100 rounded-lg p-3">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Post-Telemetry Leads</p>
                    <p className="text-2xl font-black text-slate-800 mt-0.5">{postLeadsCount}</p>
                  </div>
                  <div className="bg-white border border-indigo-100 rounded-lg p-3">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Post-Telemetry Revenue</p>
                    <p className="text-2xl font-black text-emerald-700 mt-0.5">${postTotalRevenue.toLocaleString()}</p>
                  </div>
                  <div className="bg-white border border-indigo-100 rounded-lg p-3">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Post-Telemetry Sales</p>
                    <p className="text-2xl font-black text-slate-800 mt-0.5">{postPurchasesCount}</p>
                  </div>
                  <div className="bg-white border border-indigo-100 rounded-lg p-3">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Post-Telemetry Bookings</p>
                    <p className="text-2xl font-black text-slate-800 mt-0.5">{postBookingsCount}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Founder Revenue Metrics */}
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-indigo-600" />
                Founder Revenue Metrics (Post-Telemetry)
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
                {[
                  { label: 'Reports Revenue', value: `$${postReportsRevenue.toLocaleString()}`, sub: `${postReportsPurchases.length} sales (<$199)` },
                  { label: 'Audit Revenue', value: `$${postAuditRevenue.toLocaleString()}`, sub: `${postAuditPurchases.length} sales (≥$199)` },
                  { label: 'Total Revenue', value: `$${postTotalRevenue.toLocaleString()}`, sub: `${postPurchasesCount} total sales` },
                  { label: 'Rev/Visitor (RPV)', value: `$${postRpv.toFixed(2)}`, sub: `${postUniqueVisitors} sessions` },
                  { label: 'Rev/Lead (RPL)', value: `$${postRpl.toFixed(2)}`, sub: `${postLeadsCount} leads` },
                  { label: 'Rev/Calc User', value: `$${revPerCalcUser.toFixed(2)}`, sub: `${postCalcStarts} starts` },
                  { label: 'Rev/Audit Visitor', value: `$${revPerAuditVisitor.toFixed(2)}`, sub: `${postAuditViews} views` },
                ].map((metric) => (
                  <div key={metric.label} className="bg-white rounded-xl border border-gray-200 p-4 shadow-xs">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider leading-tight">{metric.label}</p>
                    <p className="text-xl font-black text-slate-950 mt-1.5">{metric.value}</p>
                    <p className="text-[9px] text-gray-400 font-semibold mt-0.5 leading-tight">{metric.sub}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Economics & North Star Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5 shadow-xs flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] text-blue-700 font-extrabold uppercase tracking-wider bg-blue-100/50 px-2.5 py-1 rounded">Calculator Economics</span>
                  <h3 className="text-xl font-black text-slate-900 mt-2">Revenue Per Calculator User (RPU)</h3>
                  <p className="text-xs text-slate-500">Calculator Reports Revenue / Calculator Starts</p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-black text-blue-700">${revPerCalcUser.toFixed(2)}</span>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1">{postCalcStarts} Starts | ${postReportsRevenue.toLocaleString()} Rev</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-indigo-50 border border-emerald-200 rounded-xl p-5 shadow-xs flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] text-emerald-700 font-extrabold uppercase tracking-wider bg-emerald-100/50 px-2.5 py-1 rounded">Audit Funnel North Star</span>
                  <h3 className="text-xl font-black text-slate-900 mt-2">Audit Revenue Per Visitor</h3>
                  <p className="text-xs text-slate-500">Audit Revenue / Audit Page Unique Views</p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-black text-emerald-700">${revPerAuditVisitor.toFixed(2)}</span>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1">{postAuditViews} Views | ${postAuditRevenue.toLocaleString()} Rev</p>
                </div>
              </div>
            </div>

            {/* Calculator Funnel Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs">
              <div className="border-b border-gray-100 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-indigo-600" />
                  <h2 className="font-extrabold text-slate-900 text-base">Calculator Funnel (Post-Telemetry Only)</h2>
                </div>
                <div className={`text-xs font-bold px-3 py-1 rounded-full border ${
                  calcLeaksAllTime.drop > 0 ? 'text-red-700 bg-red-50 border-red-100' : 'text-slate-700 bg-slate-50 border-slate-100'
                }`}>
                  Biggest Leak: {calcLeaksAllTime.drop > 0 ? `${calcLeaksAllTime.transition} (${calcLeaksAllTime.drop.toFixed(1)}% drop)` : 'None'}
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-gray-50/70 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-3.5">Funnel Step</th>
                      <th className="px-6 py-3.5 text-center">Last 24 Hours (Today)</th>
                      <th className="px-6 py-3.5 text-center">Last 7 Days</th>
                      <th className="px-6 py-3.5 text-center">Last 30 Days</th>
                      <th className="px-6 py-3.5 text-center">All-Time (Post-Telemetry)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 font-medium text-slate-700">
                    <tr>
                      <td className="px-6 py-4 font-bold text-slate-800">1. Calculator Start</td>
                      <td className="px-6 py-4 text-center">{calculatorFunnelStats.today.starts}</td>
                      <td className="px-6 py-4 text-center">{calculatorFunnelStats.last7d.starts}</td>
                      <td className="px-6 py-4 text-center">{calculatorFunnelStats.last30d.starts}</td>
                      <td className="px-6 py-4 text-center">{calculatorFunnelStats.allTime.starts}</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-bold text-slate-800">2. Step 6 (Completions)</td>
                      <td className="px-6 py-4 text-center">{calculatorFunnelStats.today.completed}</td>
                      <td className="px-6 py-4 text-center">{calculatorFunnelStats.last7d.completed}</td>
                      <td className="px-6 py-4 text-center">{calculatorFunnelStats.last30d.completed}</td>
                      <td className="px-6 py-4 text-center">{calculatorFunnelStats.allTime.completed}</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-bold text-slate-800">3. Pricing View</td>
                      <td className="px-6 py-4 text-center">{calculatorFunnelStats.today.pricing}</td>
                      <td className="px-6 py-4 text-center">{calculatorFunnelStats.last7d.pricing}</td>
                      <td className="px-6 py-4 text-center">{calculatorFunnelStats.last30d.pricing}</td>
                      <td className="px-6 py-4 text-center">{calculatorFunnelStats.allTime.pricing}</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-bold text-slate-800">4. Checkout Start</td>
                      <td className="px-6 py-4 text-center">{calculatorFunnelStats.today.checkouts}</td>
                      <td className="px-6 py-4 text-center">{calculatorFunnelStats.last7d.checkouts}</td>
                      <td className="px-6 py-4 text-center">{calculatorFunnelStats.last30d.checkouts}</td>
                      <td className="px-6 py-4 text-center">{calculatorFunnelStats.allTime.checkouts}</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-bold text-slate-800">5. Purchase</td>
                      <td className="px-6 py-4 text-center">{calculatorFunnelStats.today.purchases}</td>
                      <td className="px-6 py-4 text-center">{calculatorFunnelStats.last7d.purchases}</td>
                      <td className="px-6 py-4 text-center">{calculatorFunnelStats.last30d.purchases}</td>
                      <td className="px-6 py-4 text-center text-emerald-700 font-extrabold">{calculatorFunnelStats.allTime.purchases}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* AI Finder Funnel Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs">
              <div className="border-b border-gray-100 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-600" />
                  <h2 className="font-extrabold text-slate-900 text-base">AI Finder Funnel (Post-Telemetry Only)</h2>
                </div>
                <div className={`text-xs font-bold px-3 py-1 rounded-full border ${
                  aiFinderLeaksAllTime.drop > 0 ? 'text-red-700 bg-red-50 border-red-100' : 'text-slate-700 bg-slate-50 border-slate-100'
                }`}>
                  Biggest Leak: {aiFinderLeaksAllTime.drop > 0 ? `${aiFinderLeaksAllTime.transition} (${aiFinderLeaksAllTime.drop.toFixed(1)}% drop)` : 'None'}
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-gray-50/70 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-3.5">Funnel Step</th>
                      <th className="px-6 py-3.5 text-center">Last 24 Hours (Today)</th>
                      <th className="px-6 py-3.5 text-center">Last 7 Days</th>
                      <th className="px-6 py-3.5 text-center">Last 30 Days</th>
                      <th className="px-6 py-3.5 text-center">All-Time (Post-Telemetry)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 font-medium text-slate-700">
                    <tr>
                      <td className="px-6 py-4 font-bold text-slate-800">1. Finder Start</td>
                      <td className="px-6 py-4 text-center">{aiFinderFunnelStats.today.starts}</td>
                      <td className="px-6 py-4 text-center">{aiFinderFunnelStats.last7d.starts}</td>
                      <td className="px-6 py-4 text-center">{aiFinderFunnelStats.last30d.starts}</td>
                      <td className="px-6 py-4 text-center">{aiFinderFunnelStats.allTime.starts}</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-bold text-slate-800">2. Results Generated</td>
                      <td className="px-6 py-4 text-center">{aiFinderFunnelStats.today.generated}</td>
                      <td className="px-6 py-4 text-center">{aiFinderFunnelStats.last7d.generated}</td>
                      <td className="px-6 py-4 text-center">{aiFinderFunnelStats.last30d.generated}</td>
                      <td className="px-6 py-4 text-center">{aiFinderFunnelStats.allTime.generated}</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-bold text-slate-800">3. Preview Viewed</td>
                      <td className="px-6 py-4 text-center">{aiFinderFunnelStats.today.preview}</td>
                      <td className="px-6 py-4 text-center">{aiFinderFunnelStats.last7d.preview}</td>
                      <td className="px-6 py-4 text-center">{aiFinderFunnelStats.last30d.preview}</td>
                      <td className="px-6 py-4 text-center">{aiFinderFunnelStats.allTime.preview}</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-bold text-slate-800">4. Unlock Clicked</td>
                      <td className="px-6 py-4 text-center">{aiFinderFunnelStats.today.unlock}</td>
                      <td className="px-6 py-4 text-center">{aiFinderFunnelStats.last7d.unlock}</td>
                      <td className="px-6 py-4 text-center">{aiFinderFunnelStats.last30d.unlock}</td>
                      <td className="px-6 py-4 text-center">{aiFinderFunnelStats.allTime.unlock}</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-bold text-slate-800">5. Checkout Started</td>
                      <td className="px-6 py-4 text-center">{aiFinderFunnelStats.today.checkouts}</td>
                      <td className="px-6 py-4 text-center">{aiFinderFunnelStats.last7d.checkouts}</td>
                      <td className="px-6 py-4 text-center">{aiFinderFunnelStats.last30d.checkouts}</td>
                      <td className="px-6 py-4 text-center">{aiFinderFunnelStats.allTime.checkouts}</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-bold text-slate-800">6. Purchase</td>
                      <td className="px-6 py-4 text-center">{aiFinderFunnelStats.today.purchases}</td>
                      <td className="px-6 py-4 text-center">{aiFinderFunnelStats.last7d.purchases}</td>
                      <td className="px-6 py-4 text-center">{aiFinderFunnelStats.last30d.purchases}</td>
                      <td className="px-6 py-4 text-center text-emerald-700 font-extrabold">{aiFinderFunnelStats.allTime.purchases}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Audit Funnel Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs">
              <div className="border-b border-gray-100 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-indigo-600" />
                  <h2 className="font-extrabold text-slate-900 text-base">Audit Funnel (Post-Telemetry Only)</h2>
                </div>
                <div className={`text-xs font-bold px-3 py-1 rounded-full border ${
                  auditLeaksAllTime.drop > 0 ? 'text-red-700 bg-red-50 border-red-100' : 'text-slate-700 bg-slate-50 border-slate-100'
                }`}>
                  Biggest Leak: {auditLeaksAllTime.drop > 0 ? `${auditLeaksAllTime.transition} (${auditLeaksAllTime.drop.toFixed(1)}% drop)` : 'None'}
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-gray-50/70 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-3.5">Funnel Step</th>
                      <th className="px-6 py-3.5 text-center">Last 24 Hours (Today)</th>
                      <th className="px-6 py-3.5 text-center">Last 7 Days</th>
                      <th className="px-6 py-3.5 text-center">Last 30 Days</th>
                      <th className="px-6 py-3.5 text-center">All-Time (Post-Telemetry)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 font-medium text-slate-700">
                    <tr>
                      <td className="px-6 py-4 font-bold text-slate-800">1. Audit Page View</td>
                      <td className="px-6 py-4 text-center">{auditFunnelStats.today.starts}</td>
                      <td className="px-6 py-4 text-center">{auditFunnelStats.last7d.starts}</td>
                      <td className="px-6 py-4 text-center">{auditFunnelStats.last30d.starts}</td>
                      <td className="px-6 py-4 text-center">{auditFunnelStats.allTime.starts}</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-bold text-slate-800">2. Preview Viewed</td>
                      <td className="px-6 py-4 text-center">{auditFunnelStats.today.preview}</td>
                      <td className="px-6 py-4 text-center">{auditFunnelStats.last7d.preview}</td>
                      <td className="px-6 py-4 text-center">{auditFunnelStats.last30d.preview}</td>
                      <td className="px-6 py-4 text-center">{auditFunnelStats.allTime.preview}</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-bold text-slate-800">3. Unlock Clicked</td>
                      <td className="px-6 py-4 text-center">{auditFunnelStats.today.unlock}</td>
                      <td className="px-6 py-4 text-center">{auditFunnelStats.last7d.unlock}</td>
                      <td className="px-6 py-4 text-center">{auditFunnelStats.last30d.unlock}</td>
                      <td className="px-6 py-4 text-center">{auditFunnelStats.allTime.unlock}</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-bold text-slate-800">4. PayPal Start</td>
                      <td className="px-6 py-4 text-center">{auditFunnelStats.today.checkouts}</td>
                      <td className="px-6 py-4 text-center">{auditFunnelStats.last7d.checkouts}</td>
                      <td className="px-6 py-4 text-center">{auditFunnelStats.last30d.checkouts}</td>
                      <td className="px-6 py-4 text-center">{auditFunnelStats.allTime.checkouts}</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-bold text-slate-800">5. Purchased Audit</td>
                      <td className="px-6 py-4 text-center">{auditFunnelStats.today.purchased}</td>
                      <td className="px-6 py-4 text-center">{auditFunnelStats.last7d.purchased}</td>
                      <td className="px-6 py-4 text-center">{auditFunnelStats.last30d.purchased}</td>
                      <td className="px-6 py-4 text-center text-emerald-700 font-extrabold">{auditFunnelStats.allTime.purchased}</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-bold text-slate-800">6. Booking Completed</td>
                      <td className="px-6 py-4 text-center">{auditFunnelStats.today.booked}</td>
                      <td className="px-6 py-4 text-center">{auditFunnelStats.last7d.booked}</td>
                      <td className="px-6 py-4 text-center">{auditFunnelStats.last30d.booked}</td>
                      <td className="px-6 py-4 text-center text-emerald-700 font-extrabold">{auditFunnelStats.allTime.booked}</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-bold text-slate-800">7. Audit Completed</td>
                      <td className="px-6 py-4 text-center">{auditFunnelStats.today.completed}</td>
                      <td className="px-6 py-4 text-center">{auditFunnelStats.last7d.completed}</td>
                      <td className="px-6 py-4 text-center">{auditFunnelStats.last30d.completed}</td>
                      <td className="px-6 py-4 text-center text-emerald-700 font-extrabold">{auditFunnelStats.allTime.completed}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Breakdown Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Revenue by Landing Page */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs">
                <div className="border-b border-gray-100 px-6 py-4 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-indigo-600" />
                  <h2 className="font-extrabold text-slate-900 text-base">Revenue by Landing Page (Post-Telemetry)</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs whitespace-nowrap">
                    <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider">
                      <tr>
                        <th className="px-6 py-3">Landing Page</th>
                        <th className="px-6 py-3 text-center">Visitors</th>
                        <th className="px-6 py-3 text-center">Leads</th>
                        <th className="px-6 py-3 text-center">Sales</th>
                        <th className="px-6 py-3 text-right">Revenue</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-slate-700 font-medium">
                      {pageStats.map((stat, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50">
                          <td className="px-6 py-3 font-semibold text-slate-800 break-all max-w-[200px] truncate">{stat.page}</td>
                          <td className="px-6 py-3 text-center">{stat.visitors}</td>
                          <td className="px-6 py-3 text-center">{stat.leads}</td>
                          <td className="px-6 py-3 text-center">{stat.purchases}</td>
                          <td className="px-6 py-3 text-right font-bold text-slate-950">${stat.revenue.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Revenue by Product */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs">
                <div className="border-b border-gray-100 px-6 py-4 flex items-center gap-2">
                  <Tag className="w-5 h-5 text-indigo-600" />
                  <h2 className="font-extrabold text-slate-900 text-base">Revenue by Product (Post-Telemetry)</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs whitespace-nowrap">
                    <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider">
                      <tr>
                        <th className="px-6 py-3">Product Name</th>
                        <th className="px-6 py-3 text-center">Sales Count</th>
                        <th className="px-6 py-3 text-right">Revenue</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-slate-700 font-medium">
                      {productStats.map((stat, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50">
                          <td className="px-6 py-3 font-semibold text-slate-800">{stat.name}</td>
                          <td className="px-6 py-3 text-center">{stat.count}</td>
                          <td className="px-6 py-3 text-right font-bold text-slate-950">${stat.revenue.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Traffic Source Scoreboard */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs">
              <div className="border-b border-gray-100 px-6 py-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-600" />
                <h2 className="font-extrabold text-slate-900 text-base">Traffic Source Scoreboard (Post-Telemetry)</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs whitespace-nowrap">
                  <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-3.5">Traffic Source</th>
                      <th className="px-6 py-3.5 text-center">Visitors (Sessions)</th>
                      <th className="px-6 py-3.5 text-center">Leads Captured</th>
                      <th className="px-6 py-3.5 text-center">Purchases (Sales)</th>
                      <th className="px-6 py-3.5 text-center">RPV (Rev/Visitor)</th>
                      <th className="px-6 py-3.5 text-right">Revenue</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 text-slate-700 font-medium">
                    {channelData.map((channel, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="px-6 py-3.5 font-bold text-slate-800">{channel.name}</td>
                        <td className="px-6 py-3.5 text-center">{channel.visitors}</td>
                        <td className="px-6 py-3.5 text-center">{channel.leads}</td>
                        <td className="px-6 py-3.5 text-center">{channel.purchases}</td>
                        <td className="px-6 py-3.5 text-center font-bold text-slate-800">${channel.rpv.toFixed(2)}</td>
                        <td className="px-6 py-3.5 text-right font-black text-slate-950">${channel.revenue.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* UTM Attribution */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs">
                <div className="border-b border-gray-100 px-6 py-4 flex items-center justify-between">
                  <h2 className="font-extrabold text-slate-900 text-sm">Revenue by UTM Source</h2>
                  <span className="text-[9px] font-bold bg-slate-100 px-1.5 py-0.5 rounded text-slate-500 uppercase">Source</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs whitespace-nowrap">
                    <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider">
                      <tr>
                        <th className="px-4 py-2.5">Source Value</th>
                        <th className="px-4 py-2.5 text-center">Leads</th>
                        <th className="px-4 py-2.5 text-center">Sales</th>
                        <th className="px-4 py-2.5 text-right">Revenue</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-slate-700 font-medium">
                      {utmSourceStats.map((stat, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50">
                          <td className="px-4 py-3 font-semibold text-slate-800 truncate max-w-[120px]">{stat.name}</td>
                          <td className="px-4 py-3 text-center">{stat.leads}</td>
                          <td className="px-4 py-3 text-center">{stat.purchases}</td>
                          <td className="px-4 py-3 text-right font-bold text-slate-950">${stat.revenue.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs">
                <div className="border-b border-gray-100 px-6 py-4 flex items-center justify-between">
                  <h2 className="font-extrabold text-slate-900 text-sm">Revenue by UTM Medium</h2>
                  <span className="text-[9px] font-bold bg-slate-100 px-1.5 py-0.5 rounded text-slate-500 uppercase">Medium</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs whitespace-nowrap">
                    <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider">
                      <tr>
                        <th className="px-4 py-2.5">Medium Value</th>
                        <th className="px-4 py-2.5 text-center">Leads</th>
                        <th className="px-4 py-2.5 text-center">Sales</th>
                        <th className="px-4 py-2.5 text-right">Revenue</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-slate-700 font-medium">
                      {utmMediumStats.map((stat, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50">
                          <td className="px-4 py-3 font-semibold text-slate-800 truncate max-w-[120px]">{stat.name}</td>
                          <td className="px-4 py-3 text-center">{stat.leads}</td>
                          <td className="px-4 py-3 text-center">{stat.purchases}</td>
                          <td className="px-4 py-3 text-right font-bold text-slate-950">${stat.revenue.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs">
                <div className="border-b border-gray-100 px-6 py-4 flex items-center justify-between">
                  <h2 className="font-extrabold text-slate-900 text-sm">Revenue by UTM Campaign</h2>
                  <span className="text-[9px] font-bold bg-slate-100 px-1.5 py-0.5 rounded text-slate-500 uppercase">Campaign</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs whitespace-nowrap">
                    <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider">
                      <tr>
                        <th className="px-4 py-2.5">Campaign Value</th>
                        <th className="px-4 py-2.5 text-center">Leads</th>
                        <th className="px-4 py-2.5 text-center">Sales</th>
                        <th className="px-4 py-2.5 text-right">Revenue</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-slate-700 font-medium">
                      {utmCampaignStats.map((stat, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50">
                          <td className="px-4 py-3 font-semibold text-slate-800 truncate max-w-[120px]">{stat.name}</td>
                          <td className="px-4 py-3 text-center">{stat.leads}</td>
                          <td className="px-4 py-3 text-center">{stat.purchases}</td>
                          <td className="px-4 py-3 text-right font-bold text-slate-950">${stat.revenue.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Historical CRM Archive */}
            <div className="border-t border-dashed border-gray-300 pt-8">
              <div className="flex items-center gap-2 mb-6">
                <Lock className="w-5 h-5 text-gray-400" />
                <h2 className="text-xl font-extrabold text-gray-600">Historical CRM Archive (Pre-Telemetry Data)</h2>
              </div>
              <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-6">
                <p className="text-sm text-gray-600 leading-relaxed max-w-4xl mb-6">
                  The following section contains metrics for leads captured before the telemetry system launch on <strong>{TELEMETRY_LAUNCH_DATE_STR}</strong>. 
                  Behavioral events (e.g. calculator completions, checkout starts, page scrolls) were not tracked for these historical records. 
                  Use this section strictly for auditing past cohorts.
                </p>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-white border border-gray-200 rounded-lg p-3">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Historical Leads</p>
                    <p className="text-2xl font-black text-gray-700 mt-0.5">{preLeadsCount}</p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-3">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Historical Revenue</p>
                    <p className="text-2xl font-black text-gray-700 mt-0.5">${preTotalRevenue.toLocaleString()}</p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-3">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Historical Sales</p>
                    <p className="text-2xl font-black text-gray-700 mt-0.5">{prePurchasesCount}</p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-3">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Historical Bookings</p>
                    <p className="text-2xl font-black text-gray-700 mt-0.5">{preBookingsCount}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
