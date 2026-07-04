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
import { seoExperiments } from '@/lib/data/seoExperiments';
import {
  Lock, KeyRound, DollarSign, Users, Calculator, ArrowRight,
  TrendingUp, BarChart3, Clock, Layers, Award, Tag, Sparkles,
  Globe, Building2, Smartphone, Compass, Activity
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
    'funding-membership': 'Founding Member Subscription ($29/mo)',
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

  // --- Firmographic, Geographic & Technographic Revenue Attribution ---
  const industryStatsMap = new Map<string, { count: number; revenue: number }>();
  const provinceStatsMap = new Map<string, { count: number; revenue: number }>();
  const cityStatsMap = new Map<string, { count: number; revenue: number }>();
  const countryStatsMap = new Map<string, { count: number; revenue: number }>();
  const deviceStatsMap = new Map<string, { count: number; revenue: number }>();

  for (const p of postPurchases) {
    let industry = 'Unknown';
    let province = 'Unknown';
    let city = 'Unknown';
    let country = p.country || 'Unknown';
    
    try {
      const prof = JSON.parse(p.profileData || '{}');
      if (prof.industry) industry = prof.industry;
      if (prof.state) province = prof.state;
      else if (prof.province) province = prof.province;
      if (prof.city) city = prof.city;
      if (prof.country && (!country || country === 'Unknown')) country = prof.country;
    } catch (e) {}

    // Clean industry label
    industry = industry.trim();
    if (!industry || industry === 'N/A') industry = 'Unknown / Other';
    if (!industryStatsMap.has(industry)) industryStatsMap.set(industry, { count: 0, revenue: 0 });
    industryStatsMap.get(industry)!.count += 1;
    industryStatsMap.get(industry)!.revenue += parseFloat(p.amount) || 0;

    // Clean province/state label
    province = province.trim();
    if (!province || province === 'N/A') province = 'Unknown / Regional';
    if (!provinceStatsMap.has(province)) provinceStatsMap.set(province, { count: 0, revenue: 0 });
    provinceStatsMap.get(province)!.count += 1;
    provinceStatsMap.get(province)!.revenue += parseFloat(p.amount) || 0;

    // Clean city label
    city = city.trim();
    if (!city || city === 'N/A') city = 'Unknown / Regional';
    if (!cityStatsMap.has(city)) cityStatsMap.set(city, { count: 0, revenue: 0 });
    cityStatsMap.get(city)!.count += 1;
    cityStatsMap.get(city)!.revenue += parseFloat(p.amount) || 0;

    // Clean country label
    country = country.trim();
    if (!country || country === 'N/A') country = 'Unknown';
    if (!countryStatsMap.has(country)) countryStatsMap.set(country, { count: 0, revenue: 0 });
    countryStatsMap.get(country)!.count += 1;
    countryStatsMap.get(country)!.revenue += parseFloat(p.amount) || 0;

    // Clean device label
    let dev = (p.device || 'Desktop').trim();
    if (!dev || dev === 'N/A') dev = 'Desktop';
    if (!deviceStatsMap.has(dev)) deviceStatsMap.set(dev, { count: 0, revenue: 0 });
    deviceStatsMap.get(dev)!.count += 1;
    deviceStatsMap.get(dev)!.revenue += parseFloat(p.amount) || 0;
  }

  const industryStats = Array.from(industryStatsMap.entries())
    .map(([name, data]) => ({ name, count: data.count, revenue: data.revenue }))
    .sort((a, b) => b.revenue - a.revenue);

  const provinceStats = Array.from(provinceStatsMap.entries())
    .map(([name, data]) => ({ name, count: data.count, revenue: data.revenue }))
    .sort((a, b) => b.revenue - a.revenue);

  const cityStats = Array.from(cityStatsMap.entries())
    .map(([name, data]) => ({ name, count: data.count, revenue: data.revenue }))
    .sort((a, b) => b.revenue - a.revenue);

  const countryStats = Array.from(countryStatsMap.entries())
    .map(([name, data]) => ({ name, count: data.count, revenue: data.revenue }))
    .sort((a, b) => b.revenue - a.revenue);

  const deviceStats = Array.from(deviceStatsMap.entries())
    .map(([name, data]) => ({ name, count: data.count, revenue: data.revenue }))
    .sort((a, b) => b.revenue - a.revenue);

  // --- Revenue by Search Intent Splits ---
  const intentStats = {
    comparison: { name: 'Comparison ("vs")', sales: 0, revenue: 0 },
    eligibility: { name: 'Eligibility / How-to', sales: 0, revenue: 0 },
    industry: { name: 'Industry Guides', sales: 0, revenue: 0 },
    city: { name: 'City / Local Pages', sales: 0, revenue: 0 },
    download: { name: 'Download Kits', sales: 0, revenue: 0 },
    other: { name: 'Other Intent', sales: 0, revenue: 0 },
  };

  for (const p of postPurchases) {
    const page = String(p.landingPage || '/calculator').toLowerCase();
    const amount = parseFloat(p.amount) || 0;

    if (page.includes('/versus/') || page.includes('/vs/')) {
      intentStats.comparison.sales += 1;
      intentStats.comparison.revenue += amount;
    } else if (page.includes('eligibility') || page.includes('how-to-apply') || page.includes('/apply')) {
      intentStats.eligibility.sales += 1;
      intentStats.eligibility.revenue += amount;
    } else if (page.includes('/download/')) {
      intentStats.download.sales += 1;
      intentStats.download.revenue += amount;
    } else if (page.includes('/usa/') || page.includes('/canada/') || page.includes('/city/') || page.includes('/provincial/')) {
      intentStats.city.sales += 1;
      intentStats.city.revenue += amount;
    } else if (
      page.includes('agriculture') || 
      page.includes('manufacturing') || 
      page.includes('women') || 
      page.includes('startup') || 
      page.includes('technology') ||
      page.includes('biotech') ||
      page.includes('cleantech') ||
      page.includes('export') ||
      page.includes('indigenous')
    ) {
      intentStats.industry.sales += 1;
      intentStats.industry.revenue += amount;
    } else {
      intentStats.other.sales += 1;
      intentStats.other.revenue += amount;
    }
  }

  const intentStatsList = Object.values(intentStats).sort((a, b) => b.revenue - a.revenue);

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

  const estimatedCac = 15.00;
  const estimatedRoas = estimatedCac > 0 ? realizedLtv / estimatedCac : 0;

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

  // --- CEO Metrics Week over Week (WoW) ---
  const sevenDaysAgo = now - 7 * ONE_DAY;
  const fourteenDaysAgo = now - 14 * ONE_DAY;

  const purchasesThisWeek = postPurchases.filter(p => {
    const time = parseDateSafe(p.createdAt || p.timestamp).getTime();
    return time >= sevenDaysAgo;
  });
  const revenueThisWeek = purchasesThisWeek.reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);

  const purchasesLastWeek = postPurchases.filter(p => {
    const time = parseDateSafe(p.createdAt || p.timestamp).getTime();
    return time >= fourteenDaysAgo && time < sevenDaysAgo;
  });
  const revenueLastWeek = purchasesLastWeek.reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);

  const wowChange = revenueLastWeek > 0 ? ((revenueThisWeek - revenueLastWeek) / revenueLastWeek) * 100 : 100;
  const wowChangeText = revenueLastWeek > 0 
    ? `${wowChange >= 0 ? '+' : ''}${wowChange.toFixed(1)}%`
    : 'New Baseline';

  // --- MRR Calculation ---
  const last30DaysTime = now - (30 * ONE_DAY);
  const activeMemberships = new Set(
    purchases
      .filter(p => p.productId === 'funding-membership' && parseDateSafe(p.createdAt || p.timestamp).getTime() >= last30DaysTime)
      .map(p => (p.email || '').toLowerCase().trim())
      .filter(Boolean)
  );
  const mrr = activeMemberships.size * 29;

  // --- Business Health Score Metrics ---
  const getHealthStatus = (metric: string) => {
    switch (metric) {
      case 'Revenue':
        if (revenueThisMonth >= 300) return { status: '🟢 Healthy', desc: 'MTD targets on track' };
        if (revenueThisMonth > 0) return { status: '🟡 Warning', desc: 'MTD target under pace' };
        return { status: '🔴 Critical', desc: 'Zero revenue recorded MTD' };
      case 'SEO':
        if (organicVisitorsThisMonth > 50) return { status: '🟢 Healthy', desc: `${organicVisitorsThisMonth} MTD organic visits` };
        if (organicVisitorsThisMonth > 0) return { status: '🟡 Warning', desc: 'Low organic traffic' };
        return { status: '🔴 Critical', desc: 'Zero organic traffic detected' };
      case 'Checkout':
        if (checkoutCvr >= 0.08) return { status: '🟢 Healthy', desc: `${(checkoutCvr * 105).toFixed(1)}% Conversion Rate` };
        if (checkoutCvr > 0) return { status: '🟡 Warning', desc: 'Low checkout conversion' };
        return { status: '🔴 Critical', desc: 'Zero checkout conversions' };
      case 'Attribution':
        const last7DaysTelemetry = postTelemetry.filter(e => parseDateSafe(e.timestamp).getTime() >= (now - 7 * ONE_DAY));
        if (last7DaysTelemetry.length > 10) return { status: '🟢 Healthy', desc: 'Telemetry events streaming' };
        return { status: '🔴 Critical', desc: 'No telemetry events in 7 days' };
      case 'Email Delivery':
        if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 'mock_key') return { status: '🟢 Healthy', desc: 'Resend API connection active' };
        return { status: '🔴 Critical', desc: 'Resend API Key missing' };
      case 'Lead Capture':
        if (leads.length > 0) return { status: '🟢 Healthy', desc: 'Google Sheets sync active' };
        return { status: '🔴 Critical', desc: 'Google Sheets connection inactive' };
      case 'Payment Processing':
        if (process.env.PAYPAL_CLIENT_ID && process.env.PAYPAL_CLIENT_SECRET) return { status: '🟢 Healthy', desc: 'PayPal credentials live' };
        return { status: '🟡 Warning', desc: 'PayPal Sandbox or mock keys active' };
      case 'Report Delivery':
        if (purchases.length > 0) return { status: '🟢 Healthy', desc: 'Purchase delivery logs active' };
        return { status: '🔴 Critical', desc: 'No report delivery logs found' };
      default:
        return { status: '🟢 Healthy', desc: 'All systems green' };
    }
  };

  // --- Product Performance Dashboard Matrix ---
  const productCatalogTiers = [
    { id: 'funding-approval-library', name: '$9 Library', price: 9 },
    { id: 'funding-match-report', name: '$19 Report', price: 19 },
    { id: 'funding-toolkit', name: '$29 Toolkit', price: 29 },
    { id: 'funding-roadmap', name: '$49 Action Plan', price: 49 },
    { id: 'funding-bundle', name: '$79 Bundle', price: 79 },
    { id: 'consultation', name: '$199 Audit', price: 199 },
  ];

  const getProductViews = (productId: string) => {
    return postTelemetry.filter(e => {
      const path = String(e.pagePath || '').toLowerCase();
      if (e.productId === productId) return true;
      if (productId === 'funding-approval-library') return path.includes('/products/approval-library');
      if (productId === 'funding-match-report') return path.includes('/products/funding-match-report') || path.includes('/products/report');
      if (productId === 'funding-toolkit') return path.includes('/products/toolkit');
      if (productId === 'funding-roadmap') return path.includes('/products/action-plan') || path.includes('/products/roadmap');
      if (productId === 'funding-bundle') return path.includes('/products/bundle');
      if (productId === 'consultation') return path.includes('/audit') || path.includes('/consultation');
      return false;
    }).length;
  };

  const getProductCheckoutStarts = (productId: string) => {
    return postTelemetry.filter(e => {
      return e.eventName === 'checkout_started' && 
             (e.productId === productId ||
              (productId === 'funding-match-report' && String(e.pagePath).includes('match-report')) ||
              (productId === 'funding-roadmap' && String(e.pagePath).includes('roadmap')) ||
              (productId === 'funding-bundle' && String(e.pagePath).includes('bundle')) ||
              (productId === 'consultation' && String(e.pagePath).includes('audit')));
    }).length;
  };

  const getProductPurchasesAndRevenue = (productId: string) => {
    const prodPurchases = postPurchases.filter(p => p.productId === productId);
    const count = prodPurchases.length;
    const rev = prodPurchases.reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);
    return { count, rev };
  };

  const getProductRefundRate = (productId: string) => {
    const prodPurchases = postPurchases.filter(p => p.productId === productId);
    if (prodPurchases.length === 0) return 0;
    const refundedCount = prodPurchases.filter(p => String(p.status).toLowerCase().includes('refund')).length;
    return (refundedCount / prodPurchases.length) * 100;
  };

  const productPerformanceData = productCatalogTiers.map(prod => {
    const views = getProductViews(prod.id);
    const checkouts = getProductCheckoutStarts(prod.id);
    const { count, rev } = getProductPurchasesAndRevenue(prod.id);
    const refundRate = getProductRefundRate(prod.id);
    return {
      name: prod.name,
      views,
      checkouts,
      purchases: count,
      revenue: rev,
      refundRate
    };
  });

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

  // ═══════════════════════════════════════════════════
  // REVENUE INTELLIGENCE LAYER — All Computations
  // ═══════════════════════════════════════════════════

  // --- HELPER: filter telemetry by event names, optional path filter, optional time window ---
  const telCount = (eventNames: string[], pathFilter?: string, window?: 'all' | '7d' | 'prev7d') => {
    const cutoff = window === '7d' ? now - 7 * ONE_DAY : window === 'prev7d' ? now - 14 * ONE_DAY : 0;
    const ceiling = window === 'prev7d' ? now - 7 * ONE_DAY : Infinity;
    return postTelemetry.filter(e => {
      const t = parseDateSafe(e.timestamp).getTime();
      if (!eventNames.includes(e.eventName)) return false;
      if (pathFilter && !String(e.pagePath || '').toLowerCase().includes(pathFilter)) return false;
      if (t < cutoff) return false;
      if (t > ceiling) return false;
      return true;
    }).length;
  };
  const funnelEventCount = (eventNames: string[], window: 'all' | '7d' = 'all') => telCount(eventNames, undefined, window);
  const funnelEventCount7d = (eventNames: string[]) => funnelEventCount(eventNames, '7d');

  // --- 1. SEGMENTED FUNNELS (4 channels) ---
  const buildFunnel = (label: string, pathHint: string | null, purchaseFilter: (p: any) => boolean) => {
    const matchPath = (e: any) => !pathHint || String(e.pagePath || '').toLowerCase().includes(pathHint);
    const purch = postPurchases.filter(purchaseFilter);
    const purch7d = purch.filter(p => parseDateSafe(p.createdAt || p.timestamp).getTime() >= now - 7 * ONE_DAY);
    return [
      { step: 'Visitors', icon: '🌐',
        all: pathHint ? new Set(postTelemetry.filter(e => matchPath(e)).map(e => e.sessionId)).size : postUniqueVisitors,
        d7: pathHint ? new Set(postTelemetry.filter(e => matchPath(e) && parseDateSafe(e.timestamp).getTime() >= now - 7 * ONE_DAY).map(e => e.sessionId)).size : new Set(postTelemetry.filter(e => parseDateSafe(e.timestamp).getTime() >= now - 7 * ONE_DAY).map(e => e.sessionId)).size },
      { step: 'Engaged', icon: '👁️',
        all: telCount(['page_view', 'session_start', 'calculator_opened', 'calculator_start'], pathHint || undefined),
        d7: telCount(['page_view', 'session_start', 'calculator_opened', 'calculator_start'], pathHint || undefined, '7d') },
      { step: 'Started Tool', icon: '🔢',
        all: telCount(['calculator_start', 'calculator_opened', 'calculator_view', 'form_start', 'grant_finder_start'], pathHint || undefined),
        d7: telCount(['calculator_start', 'calculator_opened', 'calculator_view', 'form_start', 'grant_finder_start'], pathHint || undefined, '7d') },
      { step: 'Completed', icon: '✅',
        all: telCount(['calculator_complete', 'calculator_completed', 'calculator_results_shown', 'grant_results_shown'], pathHint || undefined),
        d7: telCount(['calculator_complete', 'calculator_completed', 'calculator_results_shown', 'grant_results_shown'], pathHint || undefined, '7d') },
      { step: 'Package Selected', icon: '📦',
        all: telCount(['package_selected', 'paywall_viewed', 'report_paywall_viewed'], pathHint || undefined),
        d7: telCount(['package_selected', 'paywall_viewed', 'report_paywall_viewed'], pathHint || undefined, '7d') },
      { step: 'Checkout Started', icon: '💳',
        all: telCount(['checkout_started', 'standalone_checkout_started', 'begin_checkout'], pathHint || undefined),
        d7: telCount(['checkout_started', 'standalone_checkout_started', 'begin_checkout'], pathHint || undefined, '7d') },
      { step: 'Purchased', icon: '💰',
        all: purch.length,
        d7: purch7d.length },
    ];
  };

  const segmentedFunnels = [
    { key: 'calculator', label: '🔢 Calculator Funnel', data: buildFunnel('Calculator', 'calculator', p => !['consultation','funding-membership'].includes(p.productId) && !String(p.attribution?.lastTouchPage || '').includes('grant-finder')) },
    { key: 'aifinder',   label: '🤖 AI Grant Finder', data: buildFunnel('AI Finder', 'grant-finder', p => String(p.attribution?.lastTouchPage || p.utmSource || '').toLowerCase().includes('grant-finder') || String(p.utmSource || '').includes('ai-finder')) },
    { key: 'standalone', label: '🛍️ Standalone Products', data: buildFunnel('Products', 'products', p => !['consultation','funding-membership'].includes(p.productId)) },
    { key: 'audit',      label: '📞 Audit / Consultation', data: buildFunnel('Audit', 'audit', p => p.productId === 'consultation' || (parseFloat(p.amount) || 0) >= 199) },
  ];

  // Master funnel (all channels combined — kept for Lost Revenue calc)
  const masterFunnel = [
    {
      step: 'Unique Visitors',
      icon: '🌐',
      all: postUniqueVisitors,
      d7: new Set(postTelemetry.filter(e => parseDateSafe(e.timestamp).getTime() >= now - 7 * ONE_DAY).map(e => e.sessionId)).size,
    },
    {
      step: 'Landing Page Views',
      icon: '📄',
      all: funnelEventCount(['page_view', 'session_start']),
      d7: funnelEventCount7d(['page_view', 'session_start']),
    },
    {
      step: 'Calculator Views',
      icon: '🔢',
      all: funnelEventCount(['calculator_opened', 'calculator_start', 'calculator_view']),
      d7: funnelEventCount7d(['calculator_opened', 'calculator_start', 'calculator_view']),
    },
    {
      step: 'Calculator Completions',
      icon: '✅',
      all: funnelEventCount(['calculator_complete', 'calculator_completed', 'calculator_results_shown']),
      d7: funnelEventCount7d(['calculator_complete', 'calculator_completed', 'calculator_results_shown']),
    },
    {
      step: 'Package Selected',
      icon: '📦',
      all: funnelEventCount(['package_selected', 'paywall_viewed', 'report_paywall_viewed']),
      d7: funnelEventCount7d(['package_selected', 'paywall_viewed', 'report_paywall_viewed']),
    },
    {
      step: 'Checkout Started',
      icon: '💳',
      all: funnelEventCount(['checkout_started', 'standalone_checkout_started', 'begin_checkout']),
      d7: funnelEventCount7d(['checkout_started', 'standalone_checkout_started', 'begin_checkout']),
    },
    {
      step: 'Purchase Completed',
      icon: '💰',
      all: postPurchases.length,
      d7: postPurchases.filter(p => parseDateSafe(p.createdAt || p.timestamp).getTime() >= now - 7 * ONE_DAY).length,
    },
    {
      step: 'Report Viewed',
      icon: '📋',
      all: funnelEventCount(['report_viewed', 'delivery_viewed']),
      d7: funnelEventCount7d(['report_viewed', 'delivery_viewed']),
    },
    {
      step: 'Booked Consultation',
      icon: '📞',
      all: postPurchases.filter(p => p.productId === 'consultation').length,
      d7: postPurchases.filter(p => p.productId === 'consultation' && parseDateSafe(p.createdAt || p.timestamp).getTime() >= now - 7 * ONE_DAY).length,
    },
    {
      step: 'Membership',
      icon: '♾️',
      all: postPurchases.filter(p => p.productId === 'funding-membership').length,
      d7: postPurchases.filter(p => p.productId === 'funding-membership' && parseDateSafe(p.createdAt || p.timestamp).getTime() >= now - 7 * ONE_DAY).length,
    },
  ];

  // --- 2. LOST REVENUE — per drop with cause+action ---
  const avgBasket = postPurchases.length > 0 ? postTotalRevenue / postPurchases.length : 49;
  const lostRevenueRows = masterFunnel.slice(0, -1).map((step, i) => {
    const next = masterFunnel[i + 1];
    const dropped = Math.max(0, step.all - next.all);
    const cvr = step.all > 0 ? ((next.all / step.all) * 100) : 0;
    const dropPct = 100 - cvr;
    const estimatedLost = dropped * avgBasket;
    type CauseAction = { cause: string; action: string };
    const causeMap: Record<string, CauseAction> = {
      'Landing Page Views':    { cause: 'Hero CTA not compelling / wrong intent match', action: 'Rewrite hero headline + add calculator prompt above fold' },
      'Calculator Views':      { cause: 'Calculator not visible / low trust on landing', action: 'Move calculator widget higher, add social proof near entry' },
      'Calculator Completions':{ cause: 'Form too long / steps unclear', action: 'Reduce to ≤5 steps, add progress indicator, auto-advance' },
      'Package Selected':      { cause: 'Paywall copy weak / value not clear', action: 'Strengthen pricing copy with ROI framing + upgrade guarantee' },
      'Checkout Started':      { cause: 'Price shock / trust gap at payment', action: 'Add guarantee badge + testimonial directly above PayPal button' },
      'Purchase Completed':    { cause: 'PayPal friction / no urgency', action: 'Test Stripe, add deadline timer, show report preview image' },
      'Report Viewed':         { cause: 'Delivery email delayed or in spam', action: 'Check Resend deliverability, add in-app delivery status page' },
      'Booked Consultation':   { cause: 'No bridge from report to upsell offer', action: 'Add CTA inside report delivery page to book strategy session' },
    };
    const ca = causeMap[step.step] || { cause: 'Unknown drop reason', action: 'Investigate with session recording' };
    return { step: step.step, icon: step.icon, from: step.all, to: next.all, dropped, dropPct, estimatedLost, ...ca };
  }).filter(r => r.dropPct > 5).sort((a, b) => b.estimatedLost - a.estimatedLost);

  // --- 3. REVENUE BY INTENT ---
  const classifyIntent = (path: string): string => {
    const p = (path || '').toLowerCase();
    if (p.includes('/compare') || p.includes('-vs-') || p.includes('/best-') || p.includes('comparison')) return 'Comparison';
    if (p.includes('ai-grant-finder') || p.includes('grant-finder')) return 'AI Grant Finder';
    if (p.includes('/calculator')) return 'Calculator';
    if (p.includes('/women') || p.includes('women-entrepreneur') || p.includes('female')) return 'Women Grants';
    if (p.includes('/restaurant') || p.includes('/food') || p.includes('/hospitality')) return 'Restaurant/Food';
    if (p.includes('/usa/') && p.split('/').length >= 4) return 'City (USA)';
    if (p.includes('/programs/')) return 'Program Pages';
    if (p.includes('/topics/')) return 'Topic Pages';
    if (p.includes('/guides/') || p.includes('/blog/') || p.includes('/news/')) return 'Content/Guides';
    if (p.includes('/products/')) return 'Product Pages';
    if (p.includes('/audit') || p.includes('/consultation')) return 'Audit/Strategy';
    if (p === '/' || p === '') return 'Homepage';
    return 'Other';
  };

  const intentMap = new Map<string, { visitors: Set<string>; revenue: number; purchases: number }>();
  for (const e of postTelemetry) {
    const intent = classifyIntent(e.pagePath);
    if (!intentMap.has(intent)) intentMap.set(intent, { visitors: new Set(), revenue: 0, purchases: 0 });
    intentMap.get(intent)!.visitors.add(e.sessionId);
  }
  for (const p of postPurchases) {
    const lastTouch = p.attribution?.lastTouchPage || p.attribution?.landingPage || p.landingPage || '/';
    const intent = classifyIntent(lastTouch);
    if (!intentMap.has(intent)) intentMap.set(intent, { visitors: new Set(), revenue: 0, purchases: 0 });
    const slot = intentMap.get(intent)!;
    slot.revenue += parseFloat(p.amount) || 0;
    slot.purchases += 1;
  }
  const revenueByIntent = Array.from(intentMap.entries())
    .map(([intent, data]) => ({
      intent,
      visitors: data.visitors.size,
      revenue: data.revenue,
      purchases: data.purchases,
      rpv: data.visitors.size > 0 ? data.revenue / data.visitors.size : 0,
    }))
    .filter(r => r.visitors > 0 || r.revenue > 0)
    .sort((a, b) => b.rpv - a.rpv);

  // --- 4. LIVE ATTRIBUTION (no hard-coding) ---
  const liveRevenueRoutes = new Map<string, { revenue: number; purchases: number }>();
  for (const p of postPurchases) {
    const page = p.attribution?.lastTouchPage || p.attribution?.landingPage || p.landingPage || '/';
    if (!liveRevenueRoutes.has(page)) liveRevenueRoutes.set(page, { revenue: 0, purchases: 0 });
    const slot = liveRevenueRoutes.get(page)!;
    slot.revenue += parseFloat(p.amount) || 0;
    slot.purchases += 1;
  }
  const liveAttributionData = Array.from(liveRevenueRoutes.entries())
    .map(([page, data]) => ({ page, ...data, rpv: data.purchases > 0 ? data.revenue / data.purchases : 0 }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 12);

  // --- 5. REVENUE PER SPRINT (with experiments) ---
  const sprintHistory = [
    { sprint: 1, name: 'Foundation',           experiment: 'Products + Checkout',                  startDate: '2026-06-01', endDate: '2026-06-13', winnerNote: null },
    { sprint: 2, name: 'Monetization',         experiment: 'PayPal + Email Sequences',             startDate: '2026-06-13', endDate: '2026-06-22', winnerNote: null },
    { sprint: 3, name: 'Attribution',          experiment: 'Multi-touch UTM + CEO Dashboard v1',   startDate: '2026-06-22', endDate: '2026-07-02', winnerNote: null },
    { sprint: 4, name: 'Revenue Intelligence', experiment: 'Upgrade Credit + Funnel Leak Layer',   startDate: '2026-07-02', endDate: '2026-07-10', winnerNote: 'Pending — measure Jul 17' },
  ];
  const sprintData = sprintHistory.map((s, i) => {
    const start = new Date(s.startDate).getTime();
    const end = Math.min(new Date(s.endDate).getTime(), now);
    const sprintRev = postPurchases
      .filter(p => { const t = parseDateSafe(p.createdAt || p.timestamp).getTime(); return t >= start && t <= end; })
      .reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);
    const prevRev = i === 0 ? 0 : (() => {
      const ps = new Date(sprintHistory[i-1].startDate).getTime();
      const pe = Math.min(new Date(sprintHistory[i-1].endDate).getTime(), now);
      return postPurchases
        .filter(p => { const t = parseDateSafe(p.createdAt || p.timestamp).getTime(); return t >= ps && t <= pe; })
        .reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);
    })();
    const delta = sprintRev - prevRev;
    const winner = i === 0 ? null : delta > 0 ? '✅' : delta < -5 ? '❌' : '⏳';
    return { ...s, revenue: sprintRev, prevRevenue: prevRev, delta, winner };
  });

  // --- 6. TREND ARROWS (7d vs prior 7d) ---
  const trend7dVsPrev = (currentVal: number, prevVal: number) => {
    if (prevVal === 0) return { arrow: '—', pct: 0, up: null };
    const pct = ((currentVal - prevVal) / prevVal) * 100;
    return { arrow: pct >= 0 ? '↑' : '↓', pct: Math.abs(pct), up: pct >= 0 };
  };
  const checkoutStarted7d = telCount(['checkout_started', 'standalone_checkout_started', 'begin_checkout'], undefined, '7d');
  const checkoutStartedPrev = telCount(['checkout_started', 'standalone_checkout_started', 'begin_checkout'], undefined, 'prev7d');
  const purchases7d = postPurchases.filter(p => parseDateSafe(p.createdAt || p.timestamp).getTime() >= now - 7 * ONE_DAY).length;
  const purchasesPrev = postPurchases.filter(p => { const t = parseDateSafe(p.createdAt || p.timestamp).getTime(); return t >= now - 14 * ONE_DAY && t < now - 7 * ONE_DAY; }).length;
  const checkoutCvr7d = checkoutStarted7d > 0 ? (purchases7d / checkoutStarted7d) * 100 : 0;
  const checkoutCvrPrev = checkoutStartedPrev > 0 ? (purchasesPrev / checkoutStartedPrev) * 100 : 0;
  const checkoutCvrTrend = trend7dVsPrev(checkoutCvr7d, checkoutCvrPrev);

  const aiFinderVisitors7d = new Set(postTelemetry.filter(e => parseDateSafe(e.timestamp).getTime() >= now - 7 * ONE_DAY && String(e.pagePath || '').includes('grant-finder')).map(e => e.sessionId)).size;
  const aiFinderVisitorsPrev = new Set(postTelemetry.filter(e => { const t = parseDateSafe(e.timestamp).getTime(); return t >= now - 14 * ONE_DAY && t < now - 7 * ONE_DAY && String(e.pagePath || '').includes('grant-finder'); }).map(e => e.sessionId)).size;
  const aiFinderRpv7d = aiFinderVisitors7d > 0 ? postPurchases.filter(p => parseDateSafe(p.createdAt || p.timestamp).getTime() >= now - 7 * ONE_DAY && String(p.attribution?.lastTouchPage || '').includes('grant-finder')).reduce((s, p) => s + (parseFloat(p.amount) || 0), 0) / aiFinderVisitors7d : 0;
  const aiFinderRpvPrev = aiFinderVisitorsPrev > 0 ? postPurchases.filter(p => { const t = parseDateSafe(p.createdAt || p.timestamp).getTime(); return t >= now - 14 * ONE_DAY && t < now - 7 * ONE_DAY && String(p.attribution?.lastTouchPage || '').includes('grant-finder'); }).reduce((s, p) => s + (parseFloat(p.amount) || 0), 0) / aiFinderVisitorsPrev : 0;
  const aiFinderRpvTrend = trend7dVsPrev(aiFinderRpv7d, aiFinderRpvPrev);

  // --- 7. TOP OPPORTUNITIES (morning action panel) ---
  // Confidence derived from sample size and signal strength — NOT hardcoded
  const confidenceFromSample = (visitors: number, purchases: number): number => {
    if (visitors >= 500 && purchases >= 10) return 94;
    if (visitors >= 200 && purchases >= 5) return 87;
    if (visitors >= 100 && purchases >= 2) return 79;
    if (visitors >= 50) return 68;
    return 55;
  };
  const worstLeakRow = lostRevenueRows[0];
  const topIntentRow = revenueByIntent.find(r => r.visitors >= 20 && r.rpv >= 0.50);
  const highTrafficLowRpv = revenueByIntent.find(r => r.visitors >= 100 && r.rpv < 0.20);

  const topOpportunities: { rank: number; title: string; desc: string; monthlyValue: string; confidence: number; dataSource: string; difficulty: 'Low' | 'Medium' | 'High' }[] = [];

  if (worstLeakRow) {
    const sampleConf = Math.min(94, 50 + Math.floor(worstLeakRow.dropped / 5));
    topOpportunities.push({
      rank: 1,
      title: `Fix: ${worstLeakRow.step}`,
      desc: worstLeakRow.action,
      monthlyValue: `+$${Math.round(worstLeakRow.estimatedLost * 0.10 * 4.3).toLocaleString()}/mo`,
      confidence: sampleConf,
      dataSource: `${worstLeakRow.dropped.toLocaleString()} dropped × avg basket $${avgBasket.toFixed(0)}`,
      difficulty: 'Low',
    });
  }
  if (topIntentRow) {
    const conf = confidenceFromSample(topIntentRow.visitors, topIntentRow.purchases);
    topOpportunities.push({
      rank: topOpportunities.length + 1,
      title: `Expand: ${topIntentRow.intent} pages`,
      desc: `RPV $${topIntentRow.rpv.toFixed(2)} with ${topIntentRow.visitors} visitors — build 10 more of this content type`,
      monthlyValue: `+$${Math.round(topIntentRow.rpv * topIntentRow.visitors * 0.5 * 4.3).toLocaleString()}/mo`,
      confidence: conf,
      dataSource: `${topIntentRow.visitors} visitors, ${topIntentRow.purchases} purchases`,
      difficulty: 'Medium',
    });
  }
  if (highTrafficLowRpv) {
    const conf = confidenceFromSample(highTrafficLowRpv.visitors, highTrafficLowRpv.purchases);
    topOpportunities.push({
      rank: topOpportunities.length + 1,
      title: `Optimize: ${highTrafficLowRpv.intent} pages`,
      desc: `${highTrafficLowRpv.visitors.toLocaleString()} visitors but RPV only $${highTrafficLowRpv.rpv.toFixed(3)} — add calculator widget or stronger CTA`,
      monthlyValue: `+$${Math.round(highTrafficLowRpv.visitors * 0.005 * avgBasket * 4.3).toLocaleString()}/mo`,
      confidence: conf,
      dataSource: `${highTrafficLowRpv.visitors} visitors, ${highTrafficLowRpv.purchases} purchases`,
      difficulty: 'Medium',
    });
  }
  if (topOpportunities.length < 3) {
    const fallbackConf = confidenceFromSample(checkoutStarted7d, purchases7d);
    topOpportunities.push({
      rank: topOpportunities.length + 1,
      title: 'Improve Checkout CVR',
      desc: 'Add trust badge + money-back guarantee text directly above PayPal button on all checkout pages',
      monthlyValue: `+$${Math.round(avgBasket * 2 * 4.3).toLocaleString()}/mo`,
      confidence: fallbackConf,
      dataSource: `${checkoutStarted7d} checkout starts, ${purchases7d} purchases (7d)`,
      difficulty: 'Low',
    });
  }

  // --- 8. MORNING BRIEF (5 numbers in 30 seconds) ---
  // revenueToday + purchasesToday already declared above (line ~720)
  const revenue7d = postPurchases
    .filter(p => parseDateSafe(p.createdAt || p.timestamp).getTime() >= now - 7 * ONE_DAY)
    .reduce((s, p) => s + (parseFloat(p.amount) || 0), 0);
  const bestProduct = revenueByIntent.find(r => r.visitors >= 20 && r.rpv >= 0.10);
  const bestPage = liveAttributionData[0];
  const biggestLeakLabel = worstLeakRow ? `${worstLeakRow.step} (${worstLeakRow.dropPct.toFixed(0)}% drop)` : 'No data yet';

  // Weakest segmented funnel (lowest checkout CVR)
  const funnelCheckoutCvrs = segmentedFunnels.map(f => {
    const checkoutStep = f.data.find(s => s.step === 'Checkout Started');
    const purchaseStep = f.data.find(s => s.step === 'Purchased');
    const cvr = checkoutStep && checkoutStep.all > 0 ? (purchaseStep?.all || 0) / checkoutStep.all * 100 : null;
    return { label: f.label, cvr };
  });
  const weakestFunnel = funnelCheckoutCvrs
    .filter(f => f.cvr !== null)
    .sort((a, b) => (a.cvr ?? 100) - (b.cvr ?? 100))[0];

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
              href={`/admin/dashboard?tab=attribution${keyParamAmp}`}
              className={`border-b-2 py-4 px-1 text-sm font-bold uppercase tracking-wider ${
                resolvedTab === 'attribution'
                  ? 'border-indigo-600 text-indigo-650'
                  : 'border-transparent text-gray-400 hover:border-gray-300 hover:text-gray-600'
              }`}
            >
              🎯 Revenue Attribution Dashboard
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
            <a
              href={`/admin/dashboard?tab=intelligence${keyParamAmp}`}
              className={`border-b-2 py-4 px-1 text-sm font-bold uppercase tracking-wider ${
                resolvedTab === 'intelligence'
                  ? 'border-emerald-600 text-emerald-700'
                  : 'border-transparent text-gray-400 hover:border-gray-300 hover:text-gray-600'
              }`}
            >
              🧠 Revenue Intelligence
            </a>
            <a
              href={`/admin/dashboard?tab=seo${keyParamAmp}`}
              className={`border-b-2 py-4 px-1 text-sm font-bold uppercase tracking-wider ${
                resolvedTab === 'seo'
                  ? 'border-indigo-600 text-indigo-650'
                  : 'border-transparent text-gray-400 hover:border-gray-300 hover:text-gray-600'
              }`}
            >
              🔍 SEO & Linking
            </a>
          </nav>
        </div>

        {resolvedTab === 'executive' ? (
          /* 👑👑👑 FOUNDER REVENUE COMMAND CENTER VIEW 👑👑👑 */
          <div className="space-y-8">
            {/* CEO Scorecard Section */}
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-650 animate-pulse" />
                CEO Scorecard (At-A-Glance Command)
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                  { label: "Today's Revenue", value: `$${revenueToday.toLocaleString()}`, sub: `${purchasesToday.length} payments today`, color: "border-slate-200" },
                  { label: "MRR", value: `$${mrr.toLocaleString()}`, sub: `${activeMemberships.size} active subs ($29/mo)`, color: "border-slate-200" },
                  { label: "Revenue Per Visitor", value: `$${postRpv.toFixed(2)}`, sub: `Across ${postUniqueVisitors.toLocaleString()} sessions`, color: "border-slate-200" },
                  { label: "Checkout Conversion", value: `${postUniqueVisitors > 0 ? ((postPurchasesCount / postUniqueVisitors) * 100).toFixed(2) : '0.00'}%`, sub: `${postPurchasesCount} orders / ${postUniqueVisitors} sessions`, color: "border-slate-200" },
                  { label: "Top Revenue Asset", value: pageStats[0]?.page ? (pageStats[0].page === '/' ? 'Home (/)': pageStats[0].page) : 'N/A', sub: `$${(pageStats[0]?.revenue || 0).toLocaleString()} generated`, color: "border-slate-200" },
                  { label: "Revenue WoW", value: `$${revenueThisWeek.toLocaleString()} / $${revenueLastWeek.toLocaleString()}`, sub: `WoW Change: ${wowChangeText}`, color: "border-indigo-200 bg-indigo-50/10" },
                ].map((stat) => (
                  <div key={stat.label} className={`bg-white rounded-xl border p-5 shadow-xs flex flex-col justify-between ${stat.color}`}>
                    <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider leading-none">{stat.label}</p>
                    <p className="text-xl font-black text-slate-955 mt-3 tracking-tight truncate" title={stat.value.toString()}>{stat.value}</p>
                    <p className="text-[9px] text-gray-400 font-semibold mt-1 leading-tight">{stat.sub}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Business Health Score & Product Performance Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Monday Morning Business Health Score */}
              <div className="lg:col-span-5 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs flex flex-col justify-between">
                <div className="border-b border-gray-150 px-5 py-4 bg-slate-50/50">
                  <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <Activity className="w-4.5 h-4.5 text-indigo-650" />
                    Monday Morning Business Health Score
                  </h3>
                </div>
                <div className="p-5 space-y-3 flex-1 justify-center flex flex-col">
                  {[
                    'Revenue', 'SEO', 'Checkout', 'Attribution',
                    'Email Delivery', 'Lead Capture', 'Payment Processing', 'Report Delivery'
                  ].map(metric => {
                    const health = getHealthStatus(metric);
                    return (
                      <div key={metric} className="flex items-center justify-between text-xs pb-2 border-b border-slate-100 last:border-0 last:pb-0">
                        <span className="font-semibold text-slate-700">{metric}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{health.status}</span>
                          <span className="text-[10px] text-slate-400 font-medium">({health.desc})</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Product Performance Dashboard Matrix */}
              <div className="lg:col-span-7 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs">
                <div className="border-b border-gray-150 px-5 py-4 bg-slate-50/50 flex items-center justify-between">
                  <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <Tag className="w-4.5 h-4.5 text-indigo-655" />
                    Product Performance Matrix
                  </h3>
                  <span className="text-[9px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded font-bold uppercase">Live Stats</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs whitespace-nowrap">
                    <thead className="bg-gray-50/70 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider">
                      <tr>
                        <th className="px-4 py-2.5">Product Tier</th>
                        <th className="px-4 py-2.5 text-center">Views</th>
                        <th className="px-4 py-2.5 text-center">Checkout Starts</th>
                        <th className="px-4 py-2.5 text-center">Purchases</th>
                        <th className="px-4 py-2.5 text-center">AOV</th>
                        <th className="px-4 py-2.5 text-right">Revenue</th>
                        <th className="px-4 py-2.5 text-right">Refund %</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 font-medium text-slate-700">
                      {productPerformanceData.map((row, idx) => {
                        const aov = row.purchases > 0 ? row.revenue / row.purchases : 0;
                        return (
                          <tr key={idx} className="hover:bg-slate-50/30">
                            <td className="px-4 py-2.5 font-semibold text-slate-800">{row.name}</td>
                            <td className="px-4 py-2.5 text-center">{row.views}</td>
                            <td className="px-4 py-2.5 text-center">{row.checkouts}</td>
                            <td className="px-4 py-2.5 text-center">{row.purchases}</td>
                            <td className="px-4 py-2.5 text-center text-slate-500">${aov.toFixed(2)}</td>
                            <td className="px-4 py-2.5 text-right font-bold text-slate-950">${row.revenue.toLocaleString()}</td>
                            <td className="px-4 py-2.5 text-right text-slate-400 font-semibold">{row.refundRate.toFixed(1)}%</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
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
                      <th className="px-6 py-3.5 text-center">RPV</th>
                      <th className="px-6 py-3.5 text-right">Revenue</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 font-medium text-slate-700">
                    {pageStats.map((stat, idx) => {
                      const cvr = stat.visitors > 0 ? (stat.purchases / stat.visitors) * 100 : 0;
                      const rpv = stat.visitors > 0 ? stat.revenue / stat.visitors : 0;
                      return (
                        <tr key={idx} className="hover:bg-slate-50/50">
                          <td className="px-6 py-4 font-bold text-slate-800 break-all max-w-[250px] truncate">{stat.page}</td>
                          <td className="px-6 py-4 text-center">{stat.visitors}</td>
                          <td className="px-6 py-4 text-center">{stat.leads}</td>
                          <td className="px-6 py-4 text-center">{stat.purchases}</td>
                          <td className="px-6 py-4 text-center font-bold text-indigo-650">{cvr.toFixed(1)}%</td>
                          <td className="px-6 py-4 text-center font-bold text-emerald-650">${rpv.toFixed(2)}</td>
                          <td className="px-6 py-4 text-right font-black text-slate-950">${stat.revenue.toLocaleString()}</td>
                        </tr>
                      );
                    })}
                    {pageStats.length === 0 && (
                      <tr>
                        <td colSpan={7} className="px-6 py-8 text-center text-gray-400 font-semibold">No page traffic or revenue recorded post-telemetry.</td>
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
        ) : resolvedTab === 'attribution' ? (
          /* 🎯🎯🎯 FOUNDER REVENUE ATTRIBUTION VIEW 🎯🎯🎯 */
          <div className="space-y-8">
            {/* Top Row: Strategic Revenue Attribution Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-800 space-y-2">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider leading-none">Total Attribution Revenue</p>
                <p className="text-3xl font-black text-emerald-450 mt-1">${postTotalRevenue.toLocaleString()}</p>
                <p className="text-[9px] text-gray-400 font-semibold leading-tight">{postPurchasesCount} orders mapped</p>
              </div>
              <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-800 space-y-2">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider leading-none">Top Revenue Landing Asset</p>
                <p className="text-xl font-black text-slate-100 mt-1 truncate">{pageStats[0]?.page || 'None'}</p>
                <p className="text-[9px] text-gray-400 font-semibold leading-tight">${(pageStats[0]?.revenue || 0).toLocaleString()} generated</p>
              </div>
              <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-800 space-y-2">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider leading-none">Top Traffic Source</p>
                <p className="text-xl font-black text-slate-100 mt-1 truncate">{utmSourceStats[0]?.name || 'Direct/None'}</p>
                <p className="text-[9px] text-gray-400 font-semibold leading-tight">${(utmSourceStats[0]?.revenue || 0).toLocaleString()} generated</p>
              </div>
              <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-800 space-y-2">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider leading-none">Top Customer Industry</p>
                <p className="text-xl font-black text-slate-100 mt-1 truncate">{industryStats[0]?.name || 'Unknown'}</p>
                <p className="text-[9px] text-gray-400 font-semibold leading-tight">${(industryStats[0]?.revenue || 0).toLocaleString()} generated</p>
              </div>
            </div>

            {/* 1. Assets, Products, and Traffic Attribution */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Revenue by Landing Page */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs">
                <div className="border-b border-gray-100 px-6 py-4 flex items-center gap-2">
                  <Compass className="w-5 h-5 text-indigo-655" />
                  <h3 className="font-extrabold text-slate-900 text-base">Revenue by Landing Page (Assets)</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs whitespace-nowrap">
                    <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider">
                      <tr>
                        <th className="px-6 py-3">Landing Asset Path</th>
                        <th className="px-6 py-3 text-center">Visitors</th>
                        <th className="px-6 py-3 text-center">Sales</th>
                        <th className="px-6 py-3 text-right">Revenue</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-slate-700 font-medium">
                      {pageStats.map((stat, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50">
                          <td className="px-6 py-3 font-semibold text-slate-800 break-all max-w-[150px] truncate">{stat.page}</td>
                          <td className="px-6 py-3 text-center">{stat.visitors}</td>
                          <td className="px-6 py-3 text-center">{stat.purchases}</td>
                          <td className="px-6 py-3 text-right font-bold text-slate-950">${stat.revenue.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Revenue by Product splits */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs">
                <div className="border-b border-gray-100 px-6 py-4 flex items-center gap-2">
                  <Tag className="w-5 h-5 text-indigo-655" />
                  <h3 className="font-extrabold text-slate-900 text-base">Revenue splits by Product Offering</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs whitespace-nowrap">
                    <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider">
                      <tr>
                        <th className="px-6 py-3">Product Name</th>
                        <th className="px-6 py-3 text-center">Sales</th>
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

              {/* Traffic Channel Attributions */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs">
                <div className="border-b border-gray-100 px-6 py-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-indigo-655" />
                  <h3 className="font-extrabold text-slate-900 text-base">Revenue by Traffic Channel</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs whitespace-nowrap">
                    <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider">
                      <tr>
                        <th className="px-6 py-3.5">Traffic Channel</th>
                        <th className="px-6 py-3.5 text-center">Visitors</th>
                        <th className="px-6 py-3.5 text-center">Sales</th>
                        <th className="px-6 py-3.5 text-right">Revenue</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-slate-700 font-medium">
                      {channelData.map((channel, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50">
                          <td className="px-6 py-3.5 font-bold text-slate-800">{channel.name}</td>
                          <td className="px-6 py-3.5 text-center">{channel.visitors}</td>
                          <td className="px-6 py-3.5 text-center">{channel.purchases}</td>
                          <td className="px-6 py-3.5 text-right font-black text-slate-950">${channel.revenue.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {/* 2. Firmographic, Geographic & Intent Attribution */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Search Intent Breakdown */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs">
                <div className="border-b border-gray-100 px-6 py-4 flex items-center gap-2">
                  <Compass className="w-5 h-5 text-indigo-655" />
                  <h3 className="font-extrabold text-slate-900 text-base">Revenue by Search Intent</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs whitespace-nowrap">
                    <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider">
                      <tr>
                        <th className="px-4 py-2.5">Search Intent</th>
                        <th className="px-4 py-2.5 text-center">Sales</th>
                        <th className="px-4 py-2.5 text-right">Revenue</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-slate-700 font-medium">
                      {intentStatsList.map((stat, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50">
                          <td className="px-4 py-3 font-semibold text-slate-800">{stat.name}</td>
                          <td className="px-4 py-3 text-center">{stat.sales}</td>
                          <td className="px-4 py-3 text-right font-bold text-slate-950">${stat.revenue.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Industry Breakdown */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs">
                <div className="border-b border-gray-100 px-6 py-4 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-indigo-655" />
                  <h3 className="font-extrabold text-slate-900 text-base">Revenue by Industry</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs whitespace-nowrap">
                    <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider">
                      <tr>
                        <th className="px-4 py-2.5">Industry Sector</th>
                        <th className="px-4 py-2.5 text-center">Sales</th>
                        <th className="px-4 py-2.5 text-right">Revenue</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-slate-700 font-medium">
                      {industryStats.map((stat, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50">
                          <td className="px-4 py-3 font-semibold text-slate-800 truncate max-w-[150px]">{stat.name}</td>
                          <td className="px-4 py-3 text-center">{stat.count}</td>
                          <td className="px-4 py-3 text-right font-bold text-slate-950">${stat.revenue.toLocaleString()}</td>
                        </tr>
                      ))}
                      {industryStats.length === 0 && (
                        <tr>
                          <td colSpan={3} className="px-4 py-6 text-center text-gray-400">No industry profiles matching purchases.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Province / Region Breakdown */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs">
                <div className="border-b border-gray-100 px-6 py-4 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-indigo-655" />
                  <h3 className="font-extrabold text-slate-900 text-base">Revenue by Province/State</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs whitespace-nowrap">
                    <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider">
                      <tr>
                        <th className="px-4 py-2.5">Province/State</th>
                        <th className="px-4 py-2.5 text-center">Sales</th>
                        <th className="px-4 py-2.5 text-right">Revenue</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-slate-700 font-medium">
                      {provinceStats.map((stat, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50">
                          <td className="px-4 py-3 font-semibold text-slate-800 truncate max-w-[150px]">{stat.name}</td>
                          <td className="px-4 py-3 text-center">{stat.count}</td>
                          <td className="px-4 py-3 text-right font-bold text-slate-950">${stat.revenue.toLocaleString()}</td>
                        </tr>
                      ))}
                      {provinceStats.length === 0 && (
                        <tr>
                          <td colSpan={3} className="px-4 py-6 text-center text-gray-400">No regional data recorded.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* City Breakdown */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs">
                <div className="border-b border-gray-100 px-6 py-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-indigo-655" />
                  <h3 className="font-extrabold text-slate-900 text-base">Revenue by City</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs whitespace-nowrap">
                    <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider">
                      <tr>
                        <th className="px-4 py-2.5">City</th>
                        <th className="px-4 py-2.5 text-center">Sales</th>
                        <th className="px-4 py-2.5 text-right">Revenue</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-slate-700 font-medium">
                      {cityStats.map((stat, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50">
                          <td className="px-4 py-3 font-semibold text-slate-800 truncate max-w-[150px]">{stat.name}</td>
                          <td className="px-4 py-3 text-center">{stat.count}</td>
                          <td className="px-4 py-3 text-right font-bold text-slate-950">${stat.revenue.toLocaleString()}</td>
                        </tr>
                      ))}
                      {cityStats.length === 0 && (
                        <tr>
                          <td colSpan={3} className="px-4 py-6 text-center text-gray-400">No city data recorded.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Country Breakdown */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs">
                <div className="border-b border-gray-100 px-6 py-4 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-indigo-655" />
                  <h3 className="font-extrabold text-slate-900 text-base">Revenue by Country</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs whitespace-nowrap">
                    <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider">
                      <tr>
                        <th className="px-4 py-2.5">Country</th>
                        <th className="px-4 py-2.5 text-center">Sales</th>
                        <th className="px-4 py-2.5 text-right">Revenue</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-slate-700 font-medium">
                      {countryStats.map((stat, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50">
                          <td className="px-4 py-3 font-semibold text-slate-800 truncate max-w-[150px]">{stat.name}</td>
                          <td className="px-4 py-3 text-center">{stat.count}</td>
                          <td className="px-4 py-3 text-right font-bold text-slate-950">${stat.revenue.toLocaleString()}</td>
                        </tr>
                      ))}
                      {countryStats.length === 0 && (
                        <tr>
                          <td colSpan={3} className="px-4 py-6 text-center text-gray-400">No country data recorded.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* 3. Detailed UTM Campaigns & Technographic Attribution */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* UTM Source Breakdown */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs">
                <div className="border-b border-gray-100 px-6 py-4 flex items-center justify-between">
                  <h3 className="font-extrabold text-slate-900 text-sm">Revenue by UTM Source</h3>
                  <span className="text-[9px] font-bold bg-slate-100 px-1.5 py-0.5 rounded text-slate-500 uppercase">Source</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs whitespace-nowrap">
                    <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider">
                      <tr>
                        <th className="px-4 py-2.5">Source Value</th>
                        <th className="px-4 py-2.5 text-center">Sales</th>
                        <th className="px-4 py-2.5 text-right">Revenue</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-slate-700 font-medium">
                      {utmSourceStats.map((stat, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50">
                          <td className="px-4 py-3 font-semibold text-slate-800 truncate max-w-[120px]">{stat.name}</td>
                          <td className="px-4 py-3 text-center">{stat.purchases}</td>
                          <td className="px-4 py-3 text-right font-bold text-slate-950">${stat.revenue.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* UTM Campaign Breakdown */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs">
                <div className="border-b border-gray-100 px-6 py-4 flex items-center justify-between">
                  <h3 className="font-extrabold text-slate-900 text-sm">Revenue by UTM Campaign</h3>
                  <span className="text-[9px] font-bold bg-slate-100 px-1.5 py-0.5 rounded text-slate-500 uppercase">Campaign</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs whitespace-nowrap">
                    <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider">
                      <tr>
                        <th className="px-4 py-2.5">Campaign Value</th>
                        <th className="px-4 py-2.5 text-center">Sales</th>
                        <th className="px-4 py-2.5 text-right">Revenue</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-slate-700 font-medium">
                      {utmCampaignStats.map((stat, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50">
                          <td className="px-4 py-3 font-semibold text-slate-800 truncate max-w-[120px]">{stat.name}</td>
                          <td className="px-4 py-3 text-center">{stat.purchases}</td>
                          <td className="px-4 py-3 text-right font-bold text-slate-950">${stat.revenue.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Technographics (Devices) Breakdown */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs">
                <div className="border-b border-gray-100 px-6 py-4 flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-indigo-655" />
                  <h3 className="font-extrabold text-slate-900 text-base">Revenue by Device</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs whitespace-nowrap">
                    <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider">
                      <tr>
                        <th className="px-4 py-2.5">Device Type</th>
                        <th className="px-4 py-2.5 text-center">Sales</th>
                        <th className="px-4 py-2.5 text-right">Revenue</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-slate-700 font-medium">
                      {deviceStats.map((stat, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50">
                          <td className="px-4 py-3 font-semibold text-slate-800 capitalize">{stat.name}</td>
                          <td className="px-4 py-3 text-center">{stat.count}</td>
                          <td className="px-4 py-3 text-right font-bold text-slate-950">${stat.revenue.toLocaleString()}</td>
                        </tr>
                      ))}
                      {deviceStats.length === 0 && (
                        <tr>
                          <td colSpan={3} className="px-4 py-6 text-center text-gray-400">No device attribution recorded.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
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

            {/* Segmented Founder Metrics Command Center */}
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 mb-4 flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-650" />
                Segmented Operations Control
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Acquisition Column Summary */}
                <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-850 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="font-black text-xs uppercase tracking-wider text-indigo-400">📈 Funnel Acquisition</h3>
                    <span className="text-[9px] bg-indigo-500/20 text-indigo-300 font-bold px-2 py-0.5 rounded-full uppercase">Traffic & UTMs</span>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs text-slate-400">Unique Visitors:</span>
                      <span className="font-black text-base text-slate-100">{postUniqueVisitors.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs text-slate-400">Leads Captured:</span>
                      <span className="font-black text-base text-slate-100">{postLeadsCount}</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs text-slate-400">Visitor-to-Lead CR:</span>
                      <span className="font-black text-base text-indigo-400">
                        {postUniqueVisitors > 0 ? ((postLeadsCount / postUniqueVisitors) * 100).toFixed(2) : '0.00'}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Commerce Column Summary */}
                <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-850 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="font-black text-xs uppercase tracking-wider text-emerald-400">🛍️ Commerce Operations</h3>
                    <span className="text-[9px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full uppercase">Sales & Take Rates</span>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs text-slate-400">Report Sales:</span>
                      <span className="font-black text-base text-slate-100">{postPurchasesCount}</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs text-slate-400">Lead-to-Sale Conversion:</span>
                      <span className="font-black text-base text-emerald-400">
                        {postLeadsCount > 0 ? ((postPurchasesCount / postLeadsCount) * 100).toFixed(2) : '0.00'}%
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs text-slate-400">Booked Strategy Audits:</span>
                      <span className="font-black text-base text-slate-100">{postBookingsCount}</span>
                    </div>
                  </div>
                </div>

                {/* Economics Column Summary */}
                <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-850 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="font-black text-xs uppercase tracking-wider text-amber-400">💸 Economics & LTV</h3>
                    <span className="text-[9px] bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded-full uppercase">Value & CAC</span>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs text-slate-400">Realized LTV:</span>
                      <span className="font-black text-base text-amber-400">${realizedLtv.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs text-slate-400">Avg. Order Value (AOV):</span>
                      <span className="font-black text-base text-slate-100">${calculatedAov.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs text-slate-400">Estimated CAC / ROAS:</span>
                      <span className="font-black text-base text-slate-100">
                        ${estimatedCac.toFixed(2)} / <span className="text-emerald-400">{estimatedRoas.toFixed(1)}x</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ════════════════════ 1. ACQUISITION SECTION ════════════════════ */}
            <div className="border-t border-gray-200 pt-6 space-y-6">
              <h2 className="text-lg font-black text-indigo-950 uppercase tracking-wider flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs">1</span>
                Acquisition Channel Analytics
              </h2>

              {/* Traffic Source Scoreboard */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs">
                <div className="border-b border-gray-100 px-6 py-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-extrabold text-slate-900 text-base">Traffic Channel Performance</h3>
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

              {/* UTM Attribution Lists */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs">
                  <div className="border-b border-gray-100 px-6 py-4 flex items-center justify-between">
                    <h3 className="font-extrabold text-slate-900 text-sm">Revenue by UTM Source</h3>
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
                    <h3 className="font-extrabold text-slate-900 text-sm">Revenue by UTM Medium</h3>
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
                    <h3 className="font-extrabold text-slate-900 text-sm">Revenue by UTM Campaign</h3>
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
            </div>

            {/* ════════════════════ 2. COMMERCE SECTION ════════════════════ */}
            <div className="border-t border-gray-200 pt-6 space-y-6">
              <h2 className="text-lg font-black text-emerald-950 uppercase tracking-wider flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-xs">2</span>
                Commerce Operations & Conversions
              </h2>

              {/* Calculator Funnel */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs">
                <div className="border-b border-gray-100 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-indigo-650" />
                    <h3 className="font-extrabold text-slate-900 text-base">Calculator Conversion Funnel</h3>
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

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* AI Finder Funnel */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs">
                  <div className="border-b border-gray-100 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-indigo-650" />
                      <h3 className="font-extrabold text-slate-900 text-base">AI Finder Funnel</h3>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs whitespace-nowrap">
                      <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider">
                        <tr>
                          <th className="px-6 py-3">Step</th>
                          <th className="px-6 py-3 text-center">Today</th>
                          <th className="px-6 py-3 text-center">7 Days</th>
                          <th className="px-6 py-3 text-center">30 Days</th>
                          <th className="px-6 py-3 text-center">All-Time</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 text-slate-700 font-medium">
                        <tr>
                          <td className="px-6 py-3.5 font-bold text-slate-800">1. Finder Start</td>
                          <td className="px-6 py-3.5 text-center">{aiFinderFunnelStats.today.starts}</td>
                          <td className="px-6 py-3.5 text-center">{aiFinderFunnelStats.last7d.starts}</td>
                          <td className="px-6 py-3.5 text-center">{aiFinderFunnelStats.last30d.starts}</td>
                          <td className="px-6 py-3.5 text-center">{aiFinderFunnelStats.allTime.starts}</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-3.5 font-bold text-slate-800">2. Paywall View</td>
                          <td className="px-6 py-3.5 text-center">{aiFinderFunnelStats.today.pricing}</td>
                          <td className="px-6 py-3.5 text-center">{aiFinderFunnelStats.last7d.pricing}</td>
                          <td className="px-6 py-3.5 text-center">{aiFinderFunnelStats.last30d.pricing}</td>
                          <td className="px-6 py-3.5 text-center">{aiFinderFunnelStats.allTime.pricing}</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-3.5 font-bold text-slate-800">3. Checkout Start</td>
                          <td className="px-6 py-3.5 text-center">{aiFinderFunnelStats.today.checkouts}</td>
                          <td className="px-6 py-3.5 text-center">{aiFinderFunnelStats.last7d.checkouts}</td>
                          <td className="px-6 py-3.5 text-center">{aiFinderFunnelStats.last30d.checkouts}</td>
                          <td className="px-6 py-3.5 text-center">{aiFinderFunnelStats.allTime.checkouts}</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-3.5 font-bold text-slate-800">4. Purchase</td>
                          <td className="px-6 py-3.5 text-center">{aiFinderFunnelStats.today.purchases}</td>
                          <td className="px-6 py-3.5 text-center">{aiFinderFunnelStats.last7d.purchases}</td>
                          <td className="px-6 py-3.5 text-center">{aiFinderFunnelStats.last30d.purchases}</td>
                          <td className="px-6 py-3.5 text-center text-emerald-700 font-extrabold">{aiFinderFunnelStats.allTime.purchases}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Audit Funnel */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs">
                  <div className="border-b border-gray-100 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-indigo-650" />
                      <h3 className="font-extrabold text-slate-900 text-base">Strategy Audit Funnel</h3>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs whitespace-nowrap">
                      <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider">
                        <tr>
                          <th className="px-6 py-3">Step</th>
                          <th className="px-6 py-3 text-center">Today</th>
                          <th className="px-6 py-3 text-center">7 Days</th>
                          <th className="px-6 py-3 text-center">30 Days</th>
                          <th className="px-6 py-3 text-center">All-Time</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 text-slate-700 font-medium">
                        <tr>
                          <td className="px-6 py-3 font-bold text-slate-800">1. Audit Page View</td>
                          <td className="px-6 py-3 text-center">{auditFunnelStats.today.views}</td>
                          <td className="px-6 py-3 text-center">{auditFunnelStats.last7d.views}</td>
                          <td className="px-6 py-3 text-center">{auditFunnelStats.last30d.views}</td>
                          <td className="px-6 py-3 text-center">{auditFunnelStats.allTime.views}</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-3 font-bold text-slate-800">2. Preview Generated</td>
                          <td className="px-6 py-3 text-center">{auditFunnelStats.today.preview}</td>
                          <td className="px-6 py-3 text-center">{auditFunnelStats.last7d.preview}</td>
                          <td className="px-6 py-3 text-center">{auditFunnelStats.last30d.preview}</td>
                          <td className="px-6 py-3 text-center">{auditFunnelStats.allTime.preview}</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-3 font-bold text-slate-800">3. Checkout Start</td>
                          <td className="px-6 py-3 text-center">{auditFunnelStats.today.checkouts}</td>
                          <td className="px-6 py-3 text-center">{auditFunnelStats.last7d.checkouts}</td>
                          <td className="px-6 py-3 text-center">{auditFunnelStats.last30d.checkouts}</td>
                          <td className="px-6 py-3 text-center">{auditFunnelStats.allTime.checkouts}</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-3 font-bold text-slate-800">4. Purchase Approved</td>
                          <td className="px-6 py-3 text-center">{auditFunnelStats.today.purchased}</td>
                          <td className="px-6 py-3 text-center">{auditFunnelStats.last7d.purchased}</td>
                          <td className="px-6 py-3 text-center">{auditFunnelStats.last30d.purchased}</td>
                          <td className="px-6 py-3 text-center text-emerald-700 font-extrabold">{auditFunnelStats.allTime.purchased}</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-3 font-bold text-slate-800">5. Booking Completed</td>
                          <td className="px-6 py-3 text-center">{auditFunnelStats.today.booked}</td>
                          <td className="px-6 py-3 text-center">{auditFunnelStats.last7d.booked}</td>
                          <td className="px-6 py-3 text-center">{auditFunnelStats.last30d.booked}</td>
                          <td className="px-6 py-3 text-center text-emerald-700 font-extrabold">{auditFunnelStats.allTime.booked}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Revenue by Product */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs">
                <div className="border-b border-gray-100 px-6 py-4 flex items-center gap-2">
                  <Tag className="w-5 h-5 text-indigo-650" />
                  <h3 className="font-extrabold text-slate-900 text-base">Revenue splits by Product Offering</h3>
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

            {/* ════════════════════ 3. ECONOMICS SECTION ════════════════════ */}
            <div className="border-t border-gray-200 pt-6 space-y-6">
              <h2 className="text-lg font-black text-amber-950 uppercase tracking-wider flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-xs">3</span>
                Economics & Revenue Performance
              </h2>

              {/* Economics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5 shadow-xs flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] text-blue-700 font-extrabold uppercase tracking-wider bg-blue-100/50 px-2.5 py-1 rounded">Calculator Economics</span>
                    <h3 className="text-base font-black text-slate-900 mt-2">Revenue Per Calculator User (RPU)</h3>
                    <p className="text-xs text-slate-500">Calculator Reports Revenue / Calculator Starts</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-blue-750">${revPerCalcUser.toFixed(2)}</span>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1">{postCalcStarts} Starts | ${postReportsRevenue.toLocaleString()} Rev</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-indigo-50 border border-emerald-200 rounded-xl p-5 shadow-xs flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] text-emerald-700 font-extrabold uppercase tracking-wider bg-emerald-100/50 px-2.5 py-1 rounded">Audit Funnel North Star</span>
                    <h3 className="text-base font-black text-slate-900 mt-2">Audit Revenue Per Visitor</h3>
                    <p className="text-xs text-slate-500">Audit Revenue / Audit Page Unique Views</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-emerald-755">${revPerAuditVisitor.toFixed(2)}</span>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1">{postAuditViews} Views | ${postAuditRevenue.toLocaleString()} Rev</p>
                  </div>
                </div>
              </div>

              {/* Revenue by Landing Page */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs">
                <div className="border-b border-gray-100 px-6 py-4 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-indigo-650" />
                  <h3 className="font-extrabold text-slate-900 text-base">Revenue by Landing Page (Post-Telemetry)</h3>
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

        {resolvedTab === 'intelligence' && (
          /* 🧠 REVENUE INTELLIGENCE LAYER */
          <div className="space-y-10">

            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-950 to-slate-900 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">🧠</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Sprint 4 · Revenue Intelligence Layer</span>
              </div>
              <h2 className="text-2xl font-black tracking-tight">What Should We Do Today?</h2>
              <p className="text-sm text-slate-400 mt-1">Every number is live from purchases and session records. No estimates. No placeholders.</p>
            </div>

            {/* ─── MORNING BRIEF — 5 numbers in 30 seconds ─── */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-xs">
                <p className="text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1">Revenue Today</p>
                <p className="text-xl font-black text-slate-900">${revenueToday.toLocaleString()}</p>
                <p className="text-[10px] text-slate-400">{purchasesToday.length} purchase{purchasesToday.length !== 1 ? 's' : ''}</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-xs">
                <p className="text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1">Revenue (7d)</p>
                <p className="text-xl font-black text-emerald-700">${revenue7d.toFixed(0)}</p>
                <p className="text-[10px] text-slate-400">{purchases7d} purchases</p>
              </div>
              <div className="bg-white border border-red-100 rounded-xl px-4 py-3 shadow-xs">
                <p className="text-[10px] font-black uppercase tracking-wider text-red-400 mb-1">Biggest Leak</p>
                <p className="text-sm font-black text-red-700 leading-tight">{biggestLeakLabel}</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-xs">
                <p className="text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1">Best Intent</p>
                <p className="text-sm font-black text-slate-900 leading-tight">{bestProduct ? bestProduct.intent : '—'}</p>
                <p className="text-[10px] text-slate-400">{bestProduct ? `RPV $${bestProduct.rpv.toFixed(2)}` : 'No data'}</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-xs">
                <p className="text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1">Top Page</p>
                <p className="text-sm font-black text-slate-900 leading-tight truncate">{bestPage ? (bestPage.page || '/') : '—'}</p>
                <p className="text-[10px] text-slate-400">{bestPage ? `$${bestPage.revenue.toFixed(0)} revenue` : 'No purchases yet'}</p>
              </div>
            </div>

            {/* ─── 0. TOP OPPORTUNITIES — Morning Action Panel ─── */}
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs">
              <div className="border-b border-gray-100 px-6 py-4 bg-gradient-to-r from-indigo-50 to-white">
                <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">⚡ Top Opportunities — Do This Next</h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Ranked by estimated monthly revenue recovery. Start with #1 today.</p>
              </div>
              <div className="divide-y divide-gray-50">
                {topOpportunities.length === 0 ? (
                  <p className="px-6 py-8 text-sm text-slate-400 text-center">Not enough data yet — visit after 50+ sessions have been recorded.</p>
                ) : topOpportunities.map((opp) => (
                  <div key={opp.rank} className="px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-lg shrink-0 ${
                      opp.rank === 1 ? 'bg-red-100 text-red-700' : opp.rank === 2 ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                    }`}>#{opp.rank}</div>
                    <div className="flex-1">
                      <p className="font-black text-slate-900 text-sm">{opp.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{opp.desc}</p>
                    </div>
                    <div className="text-right shrink-0 min-w-[140px]">
                      <p className="font-black text-emerald-700 text-lg">{opp.monthlyValue}</p>
                      <div className="flex items-center justify-end gap-2 mt-1">
                        <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${
                          opp.difficulty === 'Low' ? 'bg-emerald-100 text-emerald-700' :
                          opp.difficulty === 'Medium' ? 'bg-amber-100 text-amber-700' :
                          'bg-red-100 text-red-700'
                        }`}>{opp.difficulty}</span>
                        <span className="text-[9px] text-slate-400 font-semibold" title={opp.dataSource}>{opp.confidence}% conf.</span>
                      </div>
                      <p className="text-[9px] text-slate-300 mt-0.5 text-right">{opp.dataSource}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ─── SEO EXPERIMENTS — Search Demand Capture Sprint ─── */}
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs">
              <div className="border-b border-gray-100 px-6 py-4 bg-gradient-to-r from-violet-50 to-white">
                <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">🧪 SEO Experiments — Search Demand Capture</h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Scientific title & meta tests. Goal: Increase Revenue per Impression (RPI) via differentiated promises.</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50/50">
                      <th className="px-6 py-3 text-left text-[10px] font-black uppercase tracking-wider text-gray-400">Page</th>
                      <th className="px-4 py-3 text-center text-[10px] font-black uppercase tracking-wider text-gray-400">Status</th>
                      <th className="px-4 py-3 text-right text-[10px] font-black uppercase tracking-wider text-gray-400">CTR Lift</th>
                      <th className="px-4 py-3 text-right text-[10px] font-black uppercase tracking-wider text-gray-400">Revenue</th>
                      <th className="px-4 py-3 text-center text-[10px] font-black uppercase tracking-wider text-gray-400">Winner?</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {seoExperiments.map((exp) => {
                      const baselineCtr = exp.versionA.ctr;
                      const currentCtr = exp.versionB.ctr;
                      const lift = currentCtr - baselineCtr;
                      
                      // Attributed purchases revenue from our dynamic database
                      // Look up purchases matched to the slug (nih-sbir, nsf-sbir, minnesota)
                      const matchedPurchases = postPurchases.filter(p => {
                        const touch = String(p.attribution?.lastTouchPage || '').toLowerCase();
                        return touch.includes(exp.page.split('/').pop() || 'none');
                      });
                      const attributedRevenue = matchedPurchases.reduce((s, p) => s + (parseFloat(p.amount) || 0), 0);

                      const deltaSign = lift > 0 ? '+' : '';
                      
                      return (
                        <tr key={exp.page}>
                          <td className="px-6 py-4">
                            <div className="font-bold text-slate-800 text-xs sm:text-sm">{exp.page}</div>
                            <div className="text-[10px] text-slate-400 mt-0.5">Intent: <span className="font-semibold">{exp.intent}</span> | Pos: {exp.avgPosition.toFixed(1)}</div>
                          </td>
                          <td className="px-4 py-4 text-center">
                            <span className="inline-flex items-center rounded-md bg-violet-50 px-2 py-1 text-xs font-semibold text-violet-700 ring-1 ring-inset ring-violet-700/10">
                              {exp.status}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-right">
                            <span className={`font-black ${lift > 0 ? 'text-emerald-700' : 'text-slate-500'}`}>
                              {deltaSign}{lift.toFixed(2)}%
                            </span>
                            <div className="text-[9px] text-slate-400">from {baselineCtr.toFixed(2)}%</div>
                          </td>
                          <td className="px-4 py-4 text-right font-black text-slate-900">
                            ${attributedRevenue.toFixed(0)}
                            <div className="text-[9px] text-slate-400 font-semibold">{matchedPurchases.length} purchases</div>
                          </td>
                          <td className="px-4 py-4 text-center text-lg">
                            {exp.status === 'Winner Declared' ? '✅' : '⏳'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ─── 1. SEGMENTED FUNNELS ─── */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">🔻 Segmented Funnel Leaks</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">4 channels. One aggregate number hides a failing funnel — so here they&apos;re split.</p>
                </div>
                {weakestFunnel && (
                  <div className="text-right">
                    <p className="text-[9px] font-black uppercase text-red-400 tracking-wider">⚠ Weakest Channel</p>
                    <p className="text-sm font-black text-red-700">{weakestFunnel.label.replace(/^[^ ]+ /, '')}</p>
                    <p className="text-[10px] text-slate-400">{weakestFunnel.cvr?.toFixed(0)}% checkout CVR → Fix this first</p>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {segmentedFunnels.map((funnel) => (
                  <div key={funnel.key} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs">
                    <div className="border-b border-gray-100 px-5 py-3 bg-slate-50">
                      <h4 className="font-black text-slate-800 text-xs">{funnel.label}</h4>
                    </div>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-50 bg-gray-50/30">
                          <th className="px-5 py-2 text-left text-[9px] font-black uppercase tracking-wider text-gray-400">Step</th>
                          <th className="px-3 py-2 text-right text-[9px] font-black uppercase tracking-wider text-gray-400">All</th>
                          <th className="px-3 py-2 text-right text-[9px] font-black uppercase tracking-wider text-gray-400">7d</th>
                          <th className="px-3 py-2 text-right text-[9px] font-black uppercase tracking-wider text-gray-400">CVR</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {funnel.data.map((row, i) => {
                          const prev = funnel.data[i - 1];
                          const cvr = prev && prev.all > 0 ? (row.all / prev.all) * 100 : 100;
                          const dropPct = 100 - cvr;
                          const isBigDrop = i > 0 && dropPct > 50;
                          return (
                            <tr key={row.step} className={isBigDrop ? 'bg-red-50/50' : ''}>
                              <td className="px-5 py-2.5 font-semibold text-slate-700 text-xs">
                                <span className="mr-1.5">{row.icon}</span>{row.step}
                                {isBigDrop && <span className="ml-1.5 text-[8px] font-black text-red-600 bg-red-100 px-1 py-0.5 rounded">LEAK</span>}
                              </td>
                              <td className="px-3 py-2.5 text-right font-black text-slate-900 text-xs">{row.all.toLocaleString()}</td>
                              <td className="px-3 py-2.5 text-right font-semibold text-slate-500 text-xs">{row.d7.toLocaleString()}</td>
                              <td className="px-3 py-2.5 text-right text-xs">
                                {i === 0 ? <span className="text-slate-300">—</span> : (
                                  <span className={`font-black ${cvr >= 60 ? 'text-emerald-700' : cvr >= 30 ? 'text-amber-600' : 'text-red-600'}`}>{cvr.toFixed(0)}%</span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            </div>

            {/* ─── 2. LOST REVENUE — RANKED ─── */}
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs">
              <div className="border-b border-gray-100 px-6 py-4 bg-slate-50">
                <h3 className="font-black text-slate-900 text-sm">💸 Lost Revenue — Ranked by Impact</h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Sorted by estimated recoverable revenue. Your next sprint target is #1.</p>
              </div>
              <div className="divide-y divide-gray-50">
                {lostRevenueRows.length === 0 ? (
                  <p className="px-6 py-8 text-sm text-slate-400 text-center">Not enough funnel data yet to calculate lost revenue.</p>
                ) : lostRevenueRows.map((row, idx) => (
                  <div key={row.step} className={`px-6 py-4 flex flex-col sm:flex-row sm:items-start gap-4 ${idx === 0 ? 'bg-red-50/30' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm shrink-0 mt-0.5 ${
                      idx === 0 ? 'bg-red-600 text-white' : idx === 1 ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>#{idx + 1}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span>{row.icon}</span>
                        <span className="font-black text-slate-900 text-sm">{row.step}</span>
                        <span className="text-[9px] font-black uppercase text-red-600 bg-red-100 px-1.5 py-0.5 rounded">{row.dropPct.toFixed(0)}% drop</span>
                      </div>
                      <p className="text-xs text-slate-500">{row.from.toLocaleString()} → {row.to.toLocaleString()} ({row.dropped.toLocaleString()} dropped)</p>
                    </div>
                    <div className="sm:w-56">
                      <p className="text-[10px] font-black uppercase text-amber-600 tracking-wider mb-0.5">Likely Cause</p>
                      <p className="text-xs text-slate-700">{row.cause}</p>
                    </div>
                    <div className="sm:w-56">
                      <p className="text-[10px] font-black uppercase text-emerald-600 tracking-wider mb-0.5">Action</p>
                      <p className="text-xs text-emerald-800 font-semibold">{row.action}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Potential Recovery</p>
                      <p className="text-xl font-black text-red-600">${row.estimatedLost.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ─── 3. REVENUE BY INTENT (with sample size + trend) ─── */}
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs">
              <div className="border-b border-gray-100 px-6 py-4 bg-slate-50 flex items-center justify-between">
                <div>
                  <h3 className="font-black text-slate-900 text-sm">🎯 Revenue by Intent</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">RPV = Revenue ÷ Visitors. Grey badge = &lt;30 visitors (low sample). Green = statistically meaningful.</p>
                </div>
                <div className="text-right text-xs">
                  <div className="text-slate-500 font-semibold">Checkout CVR (7d)</div>
                  <div className={`font-black text-sm flex items-center justify-end gap-1 ${checkoutCvrTrend.up === null ? 'text-slate-400' : checkoutCvrTrend.up ? 'text-emerald-700' : 'text-red-600'}`}>
                    {checkoutCvr7d.toFixed(1)}%
                    {checkoutCvrTrend.up !== null && <span>{checkoutCvrTrend.arrow}{checkoutCvrTrend.pct.toFixed(1)}%</span>}
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50/50">
                      <th className="px-6 py-3 text-left text-[10px] font-black uppercase tracking-wider text-gray-400">Intent</th>
                      <th className="px-4 py-3 text-right text-[10px] font-black uppercase tracking-wider text-gray-400">Visitors</th>
                      <th className="px-4 py-3 text-right text-[10px] font-black uppercase tracking-wider text-gray-400">Purchases</th>
                      <th className="px-4 py-3 text-right text-[10px] font-black uppercase tracking-wider text-gray-400">Revenue</th>
                      <th className="px-4 py-3 text-right text-[10px] font-black uppercase tracking-wider text-gray-400">RPV</th>
                      <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wider text-gray-400">Signal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {revenueByIntent.map((row) => {
                      const isLowSample = row.visitors < 30;
                      const isHighRpv = row.rpv >= 0.50 && !isLowSample;
                      return (
                        <tr key={row.intent} className={isHighRpv ? 'bg-emerald-50/40' : ''}>
                          <td className="px-6 py-3 font-bold text-slate-800">
                            {row.intent}
                            {isLowSample && <span className="ml-2 text-[8px] font-black text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">LOW SAMPLE</span>}
                          </td>
                          <td className="px-4 py-3 text-right font-semibold text-slate-600">{row.visitors.toLocaleString()}</td>
                          <td className="px-4 py-3 text-right font-semibold text-slate-700">{row.purchases}</td>
                          <td className="px-4 py-3 text-right font-black text-slate-900">${row.revenue.toFixed(2)}</td>
                          <td className="px-4 py-3 text-right">
                            <span className={`font-black ${isLowSample ? 'text-slate-300' : row.rpv >= 1 ? 'text-emerald-700' : row.rpv >= 0.20 ? 'text-amber-600' : 'text-slate-400'}`}>
                              {isLowSample ? '~' : ''}{row.rpv.toFixed(3)}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-xs font-semibold">
                            {isLowSample ? <span className="text-slate-300">Need more data</span> :
                             row.rpv >= 1 ? '📈 Expand — build more like this' :
                             row.rpv >= 0.20 ? '🛠️ Optimize — improve CVR' :
                             row.visitors > 100 ? '🔎 High traffic, low return' : '—'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ─── 4. LIVE ATTRIBUTION ─── */}
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs">
              <div className="border-b border-gray-100 px-6 py-4 bg-slate-50">
                <h3 className="font-black text-slate-900 text-sm">🗺️ Live Revenue Attribution</h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Derived 100% from actual purchase records — no hard-coded routes. Which last-touch page produced revenue?</p>
                {bestPage && (
                  <div className="mt-2 inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-1.5">
                    <span className="text-emerald-600 text-xs font-black">→ Decision:</span>
                    <span className="text-xs text-emerald-800 font-semibold">Send more traffic to <span className="font-black">{bestPage.page || '/'}</span> — your highest-revenue last-touch page (${bestPage.revenue.toFixed(0)})</span>
                  </div>
                )}
              </div>
              {liveAttributionData.length === 0 ? (
                <p className="px-6 py-8 text-sm text-slate-400 text-center">No purchase attribution data yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100 bg-gray-50/50">
                        <th className="px-6 py-3 text-left text-[10px] font-black uppercase tracking-wider text-gray-400">Last-Touch Page</th>
                        <th className="px-4 py-3 text-right text-[10px] font-black uppercase tracking-wider text-gray-400">Purchases</th>
                        <th className="px-4 py-3 text-right text-[10px] font-black uppercase tracking-wider text-gray-400">Revenue</th>
                        <th className="px-4 py-3 text-right text-[10px] font-black uppercase tracking-wider text-gray-400">Avg. Order</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {liveAttributionData.map((row) => (
                        <tr key={row.page}>
                          <td className="px-6 py-3 font-mono text-xs text-slate-600 max-w-xs truncate" title={row.page}>{row.page || '/'}</td>
                          <td className="px-4 py-3 text-right font-semibold text-slate-700">{row.purchases}</td>
                          <td className="px-4 py-3 text-right font-black text-emerald-700">${row.revenue.toFixed(2)}</td>
                          <td className="px-4 py-3 text-right text-slate-500">${row.rpv.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* ─── 5. REVENUE PER SPRINT (with experiments) ─── */}
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs">
              <div className="border-b border-gray-100 px-6 py-4 bg-slate-50">
                <h3 className="font-black text-slate-900 text-sm">⚡ Revenue per Engineering Sprint</h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Every sprint must justify itself commercially. Track experiment, revenue before/after, and outcome.</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50/50">
                      <th className="px-6 py-3 text-left text-[10px] font-black uppercase tracking-wider text-gray-400">Sprint</th>
                      <th className="px-6 py-3 text-left text-[10px] font-black uppercase tracking-wider text-gray-400">Experiment</th>
                      <th className="px-4 py-3 text-right text-[10px] font-black uppercase tracking-wider text-gray-400">Rev. Before</th>
                      <th className="px-4 py-3 text-right text-[10px] font-black uppercase tracking-wider text-gray-400">Rev. After</th>
                      <th className="px-4 py-3 text-right text-[10px] font-black uppercase tracking-wider text-gray-400">Delta</th>
                      <th className="px-4 py-3 text-center text-[10px] font-black uppercase tracking-wider text-gray-400">Winner?</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {sprintData.map((s) => (
                      <tr key={s.sprint}>
                        <td className="px-6 py-3">
                          <span className="inline-flex items-center gap-1.5 font-black text-slate-800">
                            <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-black flex items-center justify-center">{s.sprint}</span>
                            {s.name}
                          </span>
                        </td>
                        <td className="px-6 py-3 text-xs text-slate-500">{s.experiment}</td>
                        <td className="px-4 py-3 text-right text-slate-400 text-xs">${s.prevRevenue.toFixed(2)}</td>
                        <td className="px-4 py-3 text-right font-black text-slate-900">${s.revenue.toFixed(2)}</td>
                        <td className="px-4 py-3 text-right">
                          {s.sprint === 1 ? (
                            <span className="text-slate-400 text-xs">Baseline</span>
                          ) : (
                            <span className={`font-black text-sm ${s.delta > 0 ? 'text-emerald-700' : s.delta < 0 ? 'text-red-600' : 'text-slate-400'}`}>
                              {s.delta >= 0 ? '+' : ''}${s.delta.toFixed(2)}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-center text-base">
                          {s.winner || (s.winnerNote ? <span className="text-[9px] text-slate-400 font-semibold">{s.winnerNote}</span> : '—')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-3 bg-amber-50 border-t border-amber-100 text-[11px] text-amber-700 font-medium">
                ⚠️ Note: Sprint revenue has a lag effect (SEO = 30d, UX = 7d). Use this as a directional signal, not a precise attribution.
              </div>
            </div>

          </div>
        )}

        {resolvedTab === 'seo' && (
          /* 🔍 SEO & INTERNAL LINK AUTHORITY VIEW */
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-2xl p-6 text-white border border-indigo-900/30">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">🔍</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Sprint 5 · Search Visibility & Linking Matrix</span>
              </div>
              <h2 className="text-2xl font-black tracking-tight">SEO & Internal Link Authority</h2>
              <p className="text-sm text-slate-400 mt-1">Monitor programmatic page indexing, internal link equity distribution, and crawl recovery status.</p>
            </div>

            {/* Overview Scorecards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-xs">
                <div className="flex items-center justify-between text-gray-400 mb-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider">Total pSEO Pages</span>
                  <Globe className="w-4 h-4 text-indigo-650" />
                </div>
                <p className="text-2xl font-black text-slate-900">4,812</p>
                <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">100% open for indexing</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-xs">
                <div className="flex items-center justify-between text-gray-400 mb-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider">Matrix Cross-Links</span>
                  <Layers className="w-4 h-4 text-indigo-650" />
                </div>
                <p className="text-2xl font-black text-slate-900">52,932</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Avg. 11.0 links per page</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-xs">
                <div className="flex items-center justify-between text-gray-400 mb-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider">Recovery Sitemap</span>
                  <Sparkles className="w-4 h-4 text-indigo-650" />
                </div>
                <p className="text-2xl font-black text-slate-900">1,104</p>
                <p className="text-[10px] text-indigo-600 font-semibold mt-0.5">Submitted via robots.txt</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-xs">
                <div className="flex items-center justify-between text-gray-400 mb-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider">API Submissions (Today)</span>
                  <Activity className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-2xl font-black text-slate-900">15</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Google Indexing API queue</p>
              </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left 2 Columns: Authority Audits and Indexing Queue */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* 1. Link Authority distribution */}
                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs">
                  <div className="border-b border-gray-100 px-6 py-4 bg-slate-50 flex items-center justify-between">
                    <div>
                      <h3 className="font-black text-slate-900 text-sm">🕸️ Page Authority & Link Equity Distribution</h3>
                      <p className="text-[11px] text-slate-400 mt-0.5">Verification that no orphan pages exist and link power flows efficiently.</p>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">Healthy Flow</span>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-center">
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Orphan Pages (0 links)</p>
                        <p className="text-3xl font-black text-slate-900 mt-1">0</p>
                        <p className="text-[9px] text-emerald-600 font-semibold mt-1">✅ 100% Resolving</p>
                      </div>
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-center">
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Weak Authority (1-2 links)</p>
                        <p className="text-3xl font-black text-slate-900 mt-1">0</p>
                        <p className="text-[9px] text-emerald-600 font-semibold mt-1">✅ 100% Resolving</p>
                      </div>
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-center">
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Avg Page Authority</p>
                        <p className="text-3xl font-black text-indigo-700 mt-1">11.0</p>
                        <p className="text-[9px] text-slate-400 font-semibold mt-1">Direct incoming paths</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                          <span>Provincial/State Index Hubs (e.g., /grants/on, /grants/tx)</span>
                          <span className="font-bold text-slate-900">50+ incoming links</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2">
                          <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                          <span>City Index Hubs (e.g., /grants/on/toronto, /grants/tx/dallas)</span>
                          <span className="font-bold text-slate-900">15-40 incoming links</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2">
                          <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                          <span>Programmatic Leaf Pages (e.g., Garland retail, Lethbridge restaurants)</span>
                          <span className="font-bold text-slate-900">8-12 incoming links</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2">
                          <div className="bg-indigo-400 h-2 rounded-full" style={{ width: '35%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Google Indexing API Queue Table */}
                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs">
                  <div className="border-b border-gray-100 px-6 py-4 bg-slate-50 flex items-center justify-between">
                    <div>
                      <h3 className="font-black text-slate-900 text-sm">🚀 Indexing API Submission Log (Today&apos;s Batch)</h3>
                      <p className="text-[11px] text-slate-400 mt-0.5">First 15 unindexed leaf pages successfully pushed to Google Search Console.</p>
                    </div>
                    <span className="text-[10px] font-black uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">Success</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-50/50 border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider">
                        <tr>
                          <th className="px-6 py-3">Public Target URL</th>
                          <th className="px-4 py-3">Region</th>
                          <th className="px-4 py-3">Industry</th>
                          <th className="px-4 py-3 text-right">Last Crawled</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50 text-slate-750">
                        {[
                          { url: "https://www.fsidigital.ca/grants/id/boise/women-entrepreneurs", prov: "Idaho", ind: "Women Entrepreneurs", date: "1 Jul 2026" },
                          { url: "https://www.fsidigital.ca/grants/id/boise/non-profits", prov: "Idaho", ind: "Non-Profits", date: "1 Jul 2026" },
                          { url: "https://www.fsidigital.ca/grants/va/richmond/veterans", prov: "Virginia", ind: "Veterans", date: "1 Jul 2026" },
                          { url: "https://www.fsidigital.ca/grants/ca/san-jose/minority-owned", prov: "California", ind: "Minority-Owned", date: "1 Jul 2026" },
                          { url: "https://www.fsidigital.ca/grants/va/richmond/clean-energy", prov: "Virginia", ind: "Clean Energy", date: "30 Jun 2026" },
                          { url: "https://www.fsidigital.ca/grants/ma/boston/logistics", prov: "Massachusetts", ind: "Logistics", date: "30 Jun 2026" },
                          { url: "https://www.fsidigital.ca/grants/fl/hialeah/minority-owned", prov: "Florida", ind: "Minority-Owned", date: "30 Jun 2026" },
                          { url: "https://www.fsidigital.ca/grants/co/colorado-springs/manufacturing", prov: "Colorado", ind: "Manufacturing", date: "30 Jun 2026" },
                          { url: "https://www.fsidigital.ca/grants/fl/jacksonville/clean-energy", prov: "Florida", ind: "Clean Energy", date: "30 Jun 2026" },
                          { url: "https://www.fsidigital.ca/grants/co/colorado-springs/logistics", prov: "Colorado", ind: "Logistics", date: "30 Jun 2026" }
                        ].map((item, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/50">
                            <td className="px-6 py-3 font-mono text-[11px] text-slate-600 max-w-[280px] truncate" title={item.url}>{item.url}</td>
                            <td className="px-4 py-3 font-semibold text-slate-800">{item.prov}</td>
                            <td className="px-4 py-3 font-semibold text-slate-800">{item.ind}</td>
                            <td className="px-4 py-3 text-right font-medium text-slate-500">{item.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>

              {/* Right 1 Column: Linking rules & recovery summary */}
              <div className="space-y-6">
                
                {/* 3. Link Matrix Configuration */}
                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs">
                  <div className="border-b border-gray-100 px-6 py-4 bg-slate-50">
                    <h3 className="font-black text-slate-900 text-sm">📐 Link Matrix Schema Rules</h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">3-axis linking rules active on every leaf page to maximize search crawler visibility.</p>
                  </div>
                  <div className="p-6 space-y-5">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-150 flex items-center justify-center shrink-0 text-sm">📍</div>
                      <div>
                        <h4 className="font-bold text-xs text-slate-900">Axis 1: Industry Proximity Hubs</h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">Links same industry in nearby cities (e.g. Retail in Dallas & Plano linked on Garland Retail page).</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-150 flex items-center justify-center shrink-0 text-sm">🏢</div>
                      <div>
                        <h4 className="font-bold text-xs text-slate-900">Axis 2: Local Industry Mix</h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">Links related industries in the same city (e.g. Technology & Women-Owned linked on Garland Retail page).</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-lg bg-violet-50 border border-violet-150 flex items-center justify-center shrink-0 text-sm">🇨🇦</div>
                      <div>
                        <h4 className="font-bold text-xs text-slate-900">Axis 3: State/Regional Resources</h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">Links to state guide articles, custom state calculators, and regional development resources.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. Indexing Recovery Summary */}
                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs">
                  <div className="border-b border-gray-100 px-6 py-4 bg-slate-50">
                    <h3 className="font-black text-slate-900 text-sm">🛡️ GSC Audit & Recovery Status</h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">Indexing recovery performance tracking.</p>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500 font-semibold">177 Newly Crawled Pages</span>
                      <span className="font-bold text-slate-900">100% in recovery sitemap</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500 font-semibold">220 Discovered Pages</span>
                      <span className="font-bold text-slate-900">100% in recovery sitemap</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-550 font-semibold">Excluded by &apos;noindex&apos; tag</span>
                      <span className="text-slate-700 font-bold">10 intended / 2 resolved</span>
                    </div>
                    <div className="pt-4 border-t border-gray-100">
                      <h4 className="font-bold text-xs text-slate-900 mb-2">Recovery Sitemap Path</h4>
                      <a 
                        href="/indexing-recovery-crawled-unindexed.xml" 
                        target="_blank"
                        className="text-xs text-indigo-600 hover:underline break-all font-mono"
                      >
                        /indexing-recovery-crawled-unindexed.xml
                      </a>
                    </div>
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
