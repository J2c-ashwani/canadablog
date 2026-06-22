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
  searchParams: Promise<{ key?: string }>;
}) {
  const resolvedParams = await searchParams;
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <Header />

      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-7xl">
        {/* Title */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <span className="bg-indigo-150 text-indigo-700 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1.5 w-fit">
              <Sparkles className="w-3.5 h-3.5" /> Executive Summary
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

        {/* ════════════════ TELEMETRY SYSTEM STATUS ════════════════ */}
        <div className="mb-8 rounded-xl border border-indigo-100 bg-indigo-50/50 p-6">
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

        {/* ════════════════ FOUNDER REVENUE METRICS ════════════════ */}
        <div className="mb-8">
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

        {/* ════════════════ ECONOMICS & NORTH STAR METRICS ════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Calculator Economics Card */}
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

          {/* Audit North Star Card */}
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

        {/* ════════════════ CALCULATOR FUNNEL ════════════════ */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs mb-8">
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

        {/* ════════════════ AI FINDER FUNNEL ════════════════ */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs mb-8">
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

        {/* ════════════════ AUDIT FUNNEL ════════════════ */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs mb-8">
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

        {/* ════════════════ BREAKDOWN TABLES SECTION ════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
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
                  {pageStats.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-gray-400 font-semibold">No landing page traffic or sales recorded post-telemetry.</td>
                    </tr>
                  )}
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
                  {productStats.length === 0 && (
                    <tr>
                      <td colSpan={3} className="px-6 py-8 text-center text-gray-400 font-semibold">No product sales recorded post-telemetry.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ════════════════ TRAFFIC SOURCE SCOREBOARD ════════════════ */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs mb-8">
          <div className="border-b border-gray-100 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-600" />
              <h2 className="font-extrabold text-slate-900 text-base">Traffic Source Scoreboard (Post-Telemetry)</h2>
            </div>
            <span className="text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded uppercase tracking-wider">
              Acquisition & Channel Quality
            </span>
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

        {/* ════════════════ UTM REVENUE ATTRIBUTION ════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* UTM Source */}
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
                  {utmSourceStats.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-4 py-6 text-center text-gray-400 font-semibold">No UTM source sales recorded.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* UTM Medium */}
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
                  {utmMediumStats.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-4 py-6 text-center text-gray-400 font-semibold">No UTM medium sales recorded.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* UTM Campaign */}
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
                  {utmCampaignStats.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-4 py-6 text-center text-gray-400 font-semibold">No UTM campaign sales recorded.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ════════════════ HISTORICAL ARCHIVE SECTION ════════════════ */}
        <div className="my-12 border-t border-dashed border-gray-300 pt-8">
          <div className="flex items-center gap-2 mb-6">
            <Lock className="w-5 h-5 text-gray-400" />
            <h2 className="text-xl font-extrabold text-gray-600">Historical CRM Archive (Pre-Telemetry Data)</h2>
          </div>
          <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-6 mb-8">
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
      </main>

      <Footer />
    </div>
  );
}
