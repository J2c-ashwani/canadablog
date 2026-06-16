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
  const now = Date.now();
  const oneDay = 24 * 60 * 60 * 1000;

  const filterToday = (dateStr: string) => {
    if (!dateStr) return false;
    return new Date(dateStr).getTime() >= (now - oneDay);
  };
  const filter7d = (dateStr: string) => {
    if (!dateStr) return false;
    return new Date(dateStr).getTime() >= (now - 7 * oneDay);
  };
  const filter30d = (dateStr: string) => {
    if (!dateStr) return false;
    return new Date(dateStr).getTime() >= (now - 30 * oneDay);
  };
  const filterAllTime = () => true;

  // Calculators helper
  const getFunnelMetrics = (filterFn: (d: string) => boolean) => {
    const periodTelemetry = telemetry.filter((e) => filterFn(e.timestamp));
    const visitors = new Set(periodTelemetry.map((e) => e.sessionId)).size;
    const starts = periodTelemetry.filter((e) => e.eventName === 'calculator_start').length;
    const completions = periodTelemetry.filter(
      (e) => e.eventName === 'calculator_complete' || e.eventName === 'calculator_completed'
    ).length;
    const periodLeads = leads.filter((s) => filterFn(s.timestamp)).length;
    const checkouts = periodTelemetry.filter((e) => e.eventName === 'checkout_started').length;

    const periodPurchases = purchases.filter((p) => filterFn(p.createdAt));
    const purchaseCount = periodPurchases.length;
    const revenue = periodPurchases.reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);

    const rpv = visitors > 0 ? revenue / visitors : 0;
    const rpc = completions > 0 ? revenue / completions : 0;
    const rpcs = checkouts > 0 ? revenue / checkouts : 0;

    return {
      visitors,
      starts,
      completions,
      leads: periodLeads,
      checkouts,
      purchases: purchaseCount,
      revenue,
      rpv,
      rpc,
      rpcs,
    };
  };

  const todayMetrics = getFunnelMetrics(filterToday);
  const metrics7d = getFunnelMetrics(filter7d);
  const metrics30d = getFunnelMetrics(filter30d);
  const allTimeMetrics = getFunnelMetrics(filterAllTime);

  // Funnel conversion & leakage rates helper
  const calculateFunnelRates = (metrics: typeof allTimeMetrics) => {
    const visitorToStart = metrics.visitors > 0 ? (metrics.starts / metrics.visitors) * 100 : 0;
    const startToComplete = metrics.starts > 0 ? (metrics.completions / metrics.starts) * 100 : 0;
    const completeToCheckout = metrics.completions > 0 ? (metrics.checkouts / metrics.completions) * 100 : 0;
    const checkoutToPurchase = metrics.checkouts > 0 ? (metrics.purchases / metrics.checkouts) * 100 : 0;

    return {
      visitorToStart,
      startToComplete,
      completeToCheckout,
      checkoutToPurchase,
      visitorToStartLeak: Math.max(0, 100 - visitorToStart),
      startToCompleteLeak: Math.max(0, 100 - startToComplete),
      completeToCheckoutLeak: Math.max(0, 100 - completeToCheckout),
      checkoutToPurchaseLeak: Math.max(0, 100 - checkoutToPurchase)
    };
  };

  const todayRates = calculateFunnelRates(todayMetrics);
  const rates7d = calculateFunnelRates(metrics7d);
  const rates30d = calculateFunnelRates(metrics30d);
  const allTimeRates = calculateFunnelRates(allTimeMetrics);

  // Recovery attribution buckets (All Time)
  const getRecoverySequenceRevenue = (sequence: 'calculator_recovery' | 'cart_recovery' | 'alert_nurture' | 'reactivation') => {
    return purchases
      .filter((p) => getAttributionCategory(p.utmCampaign, p.utmSource, p.utmMedium) === sequence)
      .reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);
  };

  const calcRecoveryRev = getRecoverySequenceRevenue('calculator_recovery');
  const cartRecoveryRev = getRecoverySequenceRevenue('cart_recovery');
  const alertNurtureRev = getRecoverySequenceRevenue('alert_nurture');
  const reactivationRev = getRecoverySequenceRevenue('reactivation');

  // Time to purchase
  let totalTimeDiff = 0;
  let buyerCount = 0;
  for (const p of purchases) {
    const sub = leads.find((s) => s.email.toLowerCase() === p.email.toLowerCase());
    if (sub && sub.timestamp) {
      const leadTime = new Date(sub.timestamp).getTime();
      const pTime = new Date(p.createdAt).getTime();
      if (pTime >= leadTime) {
        totalTimeDiff += pTime - leadTime;
        buyerCount++;
      }
    }
  }
  const avgPurchaseDelay = buyerCount > 0 ? totalTimeDiff / buyerCount / (24 * 60 * 60 * 1000) : 0;

  // Product mapping
  const PRODUCT_NAMES: Record<string, string> = {
    'funding-match-report': 'Funding Match Report ($19)',
    'funding-roadmap': 'Funding Action Plan ($49)',
    'funding-bundle': 'Complete Funding Bundle ($79)',
    'funding-toolkit': 'Funding Application Toolkit ($29)',
    'funding-approval-library': 'Funding Approval Library ($9)',
    'consultation': 'Strategy Session Audit ($199)',
  };

  // Group by Product
  const productStatsMap = new Map<string, { count: number; revenue: number }>();
  for (const p of purchases) {
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

  // Group by Landing Page
  const pageStatsMap = new Map<string, { visitors: Set<string>; leads: number; purchases: number; revenue: number }>();
  
  // Track visitors
  for (const e of telemetry) {
    if (e.pagePath) {
      if (!pageStatsMap.has(e.pagePath)) {
        pageStatsMap.set(e.pagePath, { visitors: new Set(), leads: 0, purchases: 0, revenue: 0 });
      }
      pageStatsMap.get(e.pagePath)!.visitors.add(e.sessionId);
    }
  }
  // Track leads
  for (const l of leads) {
    if (l.pagePath) {
      if (!pageStatsMap.has(l.pagePath)) {
        pageStatsMap.set(l.pagePath, { visitors: new Set(), leads: 0, purchases: 0, revenue: 0 });
      }
      pageStatsMap.get(l.pagePath)!.leads += 1;
    }
  }
  // Track purchases
  for (const p of purchases) {
    const page = p.landingPage || '/calculator';
    if (!pageStatsMap.has(page)) {
      pageStatsMap.set(page, { visitors: new Set(), leads: 0, purchases: 0, revenue: 0 });
    }
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

  // --- Traffic Source Scoreboard Aggregation ---
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

  for (const e of telemetry) {
    const ch = getTrafficChannel(e.utmSource, e.utmMedium, e.referrer);
    channelStats[ch].visitors.add(e.sessionId);
  }

  for (const l of leads) {
    const ch = getTrafficChannel(l.utmSource, l.utmMedium, '');
    channelStats[ch].leads += 1;
  }

  for (const p of purchases) {
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

  // Group by Cohort (Capture Date)
  const cohortMap = new Map<string, { leads: string[]; purchasesSum: number; buyers: Set<string> }>();
  for (const sub of leads) {
    if (!sub.timestamp) continue;
    const dateStr = new Date(sub.timestamp).toISOString().slice(0, 10);
    if (!cohortMap.has(dateStr)) {
      cohortMap.set(dateStr, { leads: [], purchasesSum: 0, buyers: new Set() });
    }
    cohortMap.get(dateStr)!.leads.push(sub.email.toLowerCase());
  }
  for (const p of purchases) {
    const email = p.email.toLowerCase();
    const sub = leads.find((s) => s.email.toLowerCase() === email);
    if (sub && sub.timestamp) {
      const dateStr = new Date(sub.timestamp).toISOString().slice(0, 10);
      const cohort = cohortMap.get(dateStr);
      if (cohort) {
        cohort.purchasesSum += parseFloat(p.amount) || 0;
        cohort.buyers.add(email);
      }
    }
  }
  const cohorts = Array.from(cohortMap.entries())
    .map(([date, data]) => ({
      date,
      leadsCount: data.leads.length,
      buyersCount: data.buyers.size,
      revenue: data.purchasesSum,
      conversionRate: data.leads.length > 0 ? (data.buyers.size / data.leads.length) * 100 : 0,
    }))
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 15);

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

        {/* ════════════════ KPI CARDS SECTION ════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Revenue */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="rounded-lg bg-indigo-50 p-2 text-indigo-700">
                <DollarSign className="h-6 w-6" />
              </div>
              <span className="text-[10px] font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-500 uppercase tracking-wider">Revenue</span>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-3xl font-black text-gray-950 tracking-tight">${allTimeMetrics.revenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                <p className="text-[11px] text-gray-400 font-semibold mt-0.5">All-Time Revenue</p>
              </div>
              <div className="grid grid-cols-3 gap-2 border-t border-gray-100 pt-3 text-center sm:text-left">
                <div>
                  <p className="font-extrabold text-gray-900">${todayMetrics.revenue.toLocaleString()}</p>
                  <p className="text-[10px] text-gray-400 font-medium uppercase mt-0.5">Today</p>
                </div>
                <div>
                  <p className="font-extrabold text-gray-900">${metrics7d.revenue.toLocaleString()}</p>
                  <p className="text-[10px] text-gray-400 font-medium uppercase mt-0.5">7 Days</p>
                </div>
                <div>
                  <p className="font-extrabold text-gray-900">${metrics30d.revenue.toLocaleString()}</p>
                  <p className="text-[10px] text-gray-400 font-medium uppercase mt-0.5">30 Days</p>
                </div>
              </div>
            </div>
          </div>

          {/* Economics */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="rounded-lg bg-emerald-50 p-2 text-emerald-700">
                <TrendingUp className="h-6 w-6" />
              </div>
              <span className="text-[10px] font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-500 uppercase tracking-wider">Economics</span>
            </div>
            <div className="space-y-3.5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-2xl font-black text-gray-900">${allTimeMetrics.rpv.toFixed(2)}</p>
                  <p className="text-[11px] text-gray-400 font-semibold">RPV (Rev/Visitor)</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-emerald-700">${allTimeMetrics.rpc.toFixed(2)}</p>
                  <p className="text-[11px] text-gray-400 font-semibold">RPC (Rev/Completion)</p>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-3.5 flex items-center justify-between">
                <span className="text-xs text-gray-400 font-semibold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Avg Time to First Purchase
                </span>
                <span className="font-extrabold text-gray-800 text-sm">{avgPurchaseDelay.toFixed(1)} Days</span>
              </div>
            </div>
          </div>

          {/* Checkout & Paywall Conversion */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="rounded-lg bg-indigo-50 p-2 text-indigo-700">
                <Sparkles className="h-6 w-6" />
              </div>
              <span className="text-[10px] font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-500 uppercase tracking-wider">Conversion CTR</span>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-2xl font-black text-gray-900">
                    {allTimeMetrics.completions > 0 ? ((allTimeMetrics.checkouts / allTimeMetrics.completions) * 100).toFixed(1) : '0.0'}%
                  </p>
                  <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Paywall CTR (All-Time)</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-emerald-700">
                    {allTimeMetrics.checkouts > 0 ? ((allTimeMetrics.purchases / allTimeMetrics.checkouts) * 100).toFixed(1) : '0.0'}%
                  </p>
                  <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Checkout CV (All-Time)</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 border-t border-gray-100 pt-3 text-center sm:text-left text-[11px]">
                <div>
                  <p className="font-bold text-gray-900">
                    {todayMetrics.checkouts > 0 ? ((todayMetrics.purchases / todayMetrics.checkouts) * 100).toFixed(0) : '0'}%
                  </p>
                  <p className="text-[10px] text-gray-400 font-medium uppercase mt-0.5">Today CV</p>
                </div>
                <div>
                  <p className="font-bold text-gray-900">
                    {metrics7d.checkouts > 0 ? ((metrics7d.purchases / metrics7d.checkouts) * 100).toFixed(0) : '0'}%
                  </p>
                  <p className="text-[10px] text-gray-400 font-medium uppercase mt-0.5">7D CV</p>
                </div>
                <div>
                  <p className="font-bold text-gray-900">
                    {metrics30d.checkouts > 0 ? ((metrics30d.purchases / metrics30d.checkouts) * 100).toFixed(0) : '0'}%
                  </p>
                  <p className="text-[10px] text-gray-400 font-medium uppercase mt-0.5">30D CV</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recovery Revenue */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="rounded-lg bg-amber-50 p-2 text-amber-700">
                <Award className="h-6 w-6" />
              </div>
              <span className="text-[10px] font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-500 uppercase tracking-wider">Recovery Revenue</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 font-medium">Calculator Recovery:</span>
                <span className="font-bold text-slate-800">${calcRecoveryRev.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 font-medium">Cart Recovery:</span>
                <span className="font-bold text-slate-800">${cartRecoveryRev.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 font-medium">Alert Nurture:</span>
                <span className="font-bold text-slate-800">${alertNurtureRev.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 font-medium">Reactivation:</span>
                <span className="font-bold text-slate-800">${reactivationRev.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between border-t border-gray-100 pt-2 font-bold text-indigo-700">
                <span>Total Recovered:</span>
                <span>${(calcRecoveryRev + cartRecoveryRev + alertNurtureRev + reactivationRev).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════ FUNNEL SCOREBOARD ════════════════ */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs mb-8">
          <div className="border-b border-gray-100 px-6 py-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-600" />
            <h2 className="font-extrabold text-slate-900 text-base">Funnel Scoreboard</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-50/70 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3.5">Metric</th>
                  <th className="px-6 py-3.5 text-center">Today</th>
                  <th className="px-6 py-3.5 text-center">Last 7 Days</th>
                  <th className="px-6 py-3.5 text-center">Last 30 Days</th>
                  <th className="px-6 py-3.5 text-center">All-Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 font-medium text-slate-700">
                <tr>
                  <td className="px-6 py-4 font-bold text-slate-800">Visitors (Sessions)</td>
                  <td className="px-6 py-4 text-center">{todayMetrics.visitors}</td>
                  <td className="px-6 py-4 text-center">{metrics7d.visitors}</td>
                  <td className="px-6 py-4 text-center">{metrics30d.visitors}</td>
                  <td className="px-6 py-4 text-center">{allTimeMetrics.visitors}</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-bold text-slate-800">Calculator Starts</td>
                  <td className="px-6 py-4 text-center">{todayMetrics.starts}</td>
                  <td className="px-6 py-4 text-center">{metrics7d.starts}</td>
                  <td className="px-6 py-4 text-center">{metrics30d.starts}</td>
                  <td className="px-6 py-4 text-center">{allTimeMetrics.starts}</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-bold text-slate-800">Calculator Completions</td>
                  <td className="px-6 py-4 text-center">{todayMetrics.completions}</td>
                  <td className="px-6 py-4 text-center">{metrics7d.completions}</td>
                  <td className="px-6 py-4 text-center">{metrics30d.completions}</td>
                  <td className="px-6 py-4 text-center">{allTimeMetrics.completions}</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-bold text-slate-800">Captured Leads</td>
                  <td className="px-6 py-4 text-center">{todayMetrics.leads}</td>
                  <td className="px-6 py-4 text-center">{metrics7d.leads}</td>
                  <td className="px-6 py-4 text-center">{metrics30d.leads}</td>
                  <td className="px-6 py-4 text-center">{allTimeMetrics.leads}</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-bold text-slate-800">Checkout Started</td>
                  <td className="px-6 py-4 text-center">{todayMetrics.checkouts}</td>
                  <td className="px-6 py-4 text-center">{metrics7d.checkouts}</td>
                  <td className="px-6 py-4 text-center">{metrics30d.checkouts}</td>
                  <td className="px-6 py-4 text-center">{allTimeMetrics.checkouts}</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-bold text-slate-800">Purchases</td>
                  <td className="px-6 py-4 text-center">{todayMetrics.purchases}</td>
                  <td className="px-6 py-4 text-center">{metrics7d.purchases}</td>
                  <td className="px-6 py-4 text-center">{metrics30d.purchases}</td>
                  <td className="px-6 py-4 text-center">{allTimeMetrics.purchases}</td>
                </tr>
                <tr className="bg-indigo-50/20 text-indigo-900">
                  <td className="px-6 py-4 font-black">Revenue</td>
                  <td className="px-6 py-4 text-center font-bold">${todayMetrics.revenue.toLocaleString()}</td>
                  <td className="px-6 py-4 text-center font-bold">${metrics7d.revenue.toLocaleString()}</td>
                  <td className="px-6 py-4 text-center font-bold">${metrics30d.revenue.toLocaleString()}</td>
                  <td className="px-6 py-4 text-center font-bold">${allTimeMetrics.revenue.toLocaleString()}</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-bold text-slate-800">RPV (Revenue/Visitor)</td>
                  <td className="px-6 py-4 text-center font-bold">${todayMetrics.rpv.toFixed(2)}</td>
                  <td className="px-6 py-4 text-center font-bold">${metrics7d.rpv.toFixed(2)}</td>
                  <td className="px-6 py-4 text-center font-bold">${metrics30d.rpv.toFixed(2)}</td>
                  <td className="px-6 py-4 text-center font-bold">${allTimeMetrics.rpv.toFixed(2)}</td>
                </tr>
                <tr className="bg-emerald-50/20 text-emerald-900">
                  <td className="px-6 py-4 font-black">RPC (Revenue/Completion)</td>
                  <td className="px-6 py-4 text-center font-bold">${todayMetrics.rpc.toFixed(2)}</td>
                  <td className="px-6 py-4 text-center font-bold">${metrics7d.rpc.toFixed(2)}</td>
                  <td className="px-6 py-4 text-center font-bold">${metrics30d.rpc.toFixed(2)}</td>
                  <td className="px-6 py-4 text-center font-bold">${allTimeMetrics.rpc.toFixed(2)}</td>
                </tr>
                <tr className="bg-purple-50/20 text-purple-900">
                  <td className="px-6 py-4 font-black">RPCS (Revenue/Checkout Start)</td>
                  <td className="px-6 py-4 text-center font-bold">${todayMetrics.rpcs.toFixed(2)}</td>
                  <td className="px-6 py-4 text-center font-bold">${metrics7d.rpcs.toFixed(2)}</td>
                  <td className="px-6 py-4 text-center font-bold">${metrics30d.rpcs.toFixed(2)}</td>
                  <td className="px-6 py-4 text-center font-bold">${allTimeMetrics.rpcs.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ════════════════ REVENUE LEAKAGE AUDIT ════════════════ */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs mb-8">
          <div className="border-b border-gray-100 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-red-600" />
              <h2 className="font-extrabold text-slate-900 text-base">Revenue Leakage Audit (Funnel Drop-offs)</h2>
            </div>
            <span className="text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded uppercase tracking-wider">
              Drop-off Rates
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-50/70 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3.5">Funnel Transition</th>
                  <th className="px-6 py-3.5 text-center">Today</th>
                  <th className="px-6 py-3.5 text-center">Last 7 Days</th>
                  <th className="px-6 py-3.5 text-center">Last 30 Days</th>
                  <th className="px-6 py-3.5 text-center">All-Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 font-medium text-slate-700">
                {/* Visitor -> Start */}
                <tr className="bg-slate-50/20">
                  <td className="px-6 py-3.5 font-bold text-slate-800">
                    <div>Visitor → Start</div>
                    <span className="text-[10px] text-gray-400 font-normal">Conversion Rate (Starts / Visitors)</span>
                  </td>
                  <td className="px-6 py-3.5 text-center text-slate-900 font-extrabold">{todayRates.visitorToStart.toFixed(1)}%</td>
                  <td className="px-6 py-3.5 text-center text-slate-900 font-extrabold">{rates7d.visitorToStart.toFixed(1)}%</td>
                  <td className="px-6 py-3.5 text-center text-slate-900 font-extrabold">{rates30d.visitorToStart.toFixed(1)}%</td>
                  <td className="px-6 py-3.5 text-center text-slate-900 font-extrabold">{allTimeRates.visitorToStart.toFixed(1)}%</td>
                </tr>
                <tr className="bg-red-50/30 text-red-700 border-b border-gray-100">
                  <td className="px-6 py-2.5 text-xs font-semibold pl-10 flex items-center gap-1.5">
                    <span className="inline-block w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                    Visitor → Start Leakage (Drop-off)
                  </td>
                  <td className="px-6 py-2.5 text-center font-bold">{todayRates.visitorToStartLeak.toFixed(1)}%</td>
                  <td className="px-6 py-2.5 text-center font-bold">{rates7d.visitorToStartLeak.toFixed(1)}%</td>
                  <td className="px-6 py-2.5 text-center font-bold">{rates30d.visitorToStartLeak.toFixed(1)}%</td>
                  <td className="px-6 py-2.5 text-center font-bold">{allTimeRates.visitorToStartLeak.toFixed(1)}%</td>
                </tr>

                {/* Start -> Completion */}
                <tr className="bg-slate-50/20">
                  <td className="px-6 py-3.5 font-bold text-slate-800">
                    <div>Start → Completion</div>
                    <span className="text-[10px] text-gray-400 font-normal">Completion Rate (Completions / Starts)</span>
                  </td>
                  <td className="px-6 py-3.5 text-center text-slate-900 font-extrabold">{todayRates.startToComplete.toFixed(1)}%</td>
                  <td className="px-6 py-3.5 text-center text-slate-900 font-extrabold">{rates7d.startToComplete.toFixed(1)}%</td>
                  <td className="px-6 py-3.5 text-center text-slate-900 font-extrabold">{rates30d.startToComplete.toFixed(1)}%</td>
                  <td className="px-6 py-3.5 text-center text-slate-900 font-extrabold">{allTimeRates.startToComplete.toFixed(1)}%</td>
                </tr>
                <tr className="bg-red-50/30 text-red-700 border-b border-gray-100">
                  <td className="px-6 py-2.5 text-xs font-semibold pl-10 flex items-center gap-1.5">
                    <span className="inline-block w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                    Start → Completion Leakage (Drop-off)
                  </td>
                  <td className="px-6 py-2.5 text-center font-bold">{todayRates.startToCompleteLeak.toFixed(1)}%</td>
                  <td className="px-6 py-2.5 text-center font-bold">{rates7d.startToCompleteLeak.toFixed(1)}%</td>
                  <td className="px-6 py-2.5 text-center font-bold">{rates30d.startToCompleteLeak.toFixed(1)}%</td>
                  <td className="px-6 py-2.5 text-center font-bold">{allTimeRates.startToCompleteLeak.toFixed(1)}%</td>
                </tr>

                {/* Completion -> Checkout */}
                <tr className="bg-slate-50/20">
                  <td className="px-6 py-3.5 font-bold text-slate-800">
                    <div>Completion → Checkout</div>
                    <span className="text-[10px] text-gray-400 font-normal">Checkout Clickthrough (Checkouts / Completions)</span>
                  </td>
                  <td className="px-6 py-3.5 text-center text-slate-900 font-extrabold">{todayRates.completeToCheckout.toFixed(1)}%</td>
                  <td className="px-6 py-3.5 text-center text-slate-900 font-extrabold">{rates7d.completeToCheckout.toFixed(1)}%</td>
                  <td className="px-6 py-3.5 text-center text-slate-900 font-extrabold">{rates30d.completeToCheckout.toFixed(1)}%</td>
                  <td className="px-6 py-3.5 text-center text-slate-900 font-extrabold">{allTimeRates.completeToCheckout.toFixed(1)}%</td>
                </tr>
                <tr className="bg-red-50/30 text-red-700 border-b border-gray-100">
                  <td className="px-6 py-2.5 text-xs font-semibold pl-10 flex items-center gap-1.5">
                    <span className="inline-block w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                    Completion → Checkout Leakage (Drop-off)
                  </td>
                  <td className="px-6 py-2.5 text-center font-bold">{todayRates.completeToCheckoutLeak.toFixed(1)}%</td>
                  <td className="px-6 py-2.5 text-center font-bold">{rates7d.completeToCheckoutLeak.toFixed(1)}%</td>
                  <td className="px-6 py-2.5 text-center font-bold">{rates30d.completeToCheckoutLeak.toFixed(1)}%</td>
                  <td className="px-6 py-2.5 text-center font-bold">{allTimeRates.completeToCheckoutLeak.toFixed(1)}%</td>
                </tr>

                {/* Checkout -> Purchase */}
                <tr className="bg-emerald-50/10">
                  <td className="px-6 py-3.5 font-bold text-slate-800">
                    <div>Checkout → Purchase</div>
                    <span className="text-[10px] text-gray-400 font-normal">Checkout Conversion (Purchases / Checkouts)</span>
                  </td>
                  <td className="px-6 py-3.5 text-center text-emerald-700 font-black">{todayRates.checkoutToPurchase.toFixed(1)}%</td>
                  <td className="px-6 py-3.5 text-center text-emerald-700 font-black">{rates7d.checkoutToPurchase.toFixed(1)}%</td>
                  <td className="px-6 py-3.5 text-center text-emerald-700 font-black">{rates30d.checkoutToPurchase.toFixed(1)}%</td>
                  <td className="px-6 py-3.5 text-center text-emerald-700 font-black">{allTimeRates.checkoutToPurchase.toFixed(1)}%</td>
                </tr>
                <tr className="bg-red-50/30 text-red-700">
                  <td className="px-6 py-2.5 text-xs font-semibold pl-10 flex items-center gap-1.5">
                    <span className="inline-block w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                    Checkout → Purchase Leakage (Drop-off)
                  </td>
                  <td className="px-6 py-2.5 text-center font-bold">{todayRates.checkoutToPurchaseLeak.toFixed(1)}%</td>
                  <td className="px-6 py-2.5 text-center font-bold">{rates7d.checkoutToPurchaseLeak.toFixed(1)}%</td>
                  <td className="px-6 py-2.5 text-center font-bold">{rates30d.checkoutToPurchaseLeak.toFixed(1)}%</td>
                  <td className="px-6 py-2.5 text-center font-bold">{allTimeRates.checkoutToPurchaseLeak.toFixed(1)}%</td>
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
              <h2 className="font-extrabold text-slate-900 text-base">Revenue by Landing Page</h2>
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
                      <td colSpan={5} className="px-6 py-8 text-center text-gray-400 font-semibold">No landing page traffic or sales recorded.</td>
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
              <h2 className="font-extrabold text-slate-900 text-base">Revenue by Product</h2>
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
                      <td colSpan={3} className="px-6 py-8 text-center text-gray-400 font-semibold">No product sales recorded yet.</td>
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
              <h2 className="font-extrabold text-slate-900 text-base">Traffic Source Scoreboard</h2>
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

        {/* Cohort Grid */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs mb-8">
          <div className="border-b border-gray-100 px-6 py-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-600" />
            <h2 className="font-extrabold text-slate-900 text-base">Revenue by Lead Capture Cohort (Last 15 Days)</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs whitespace-nowrap">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3">Capture Date</th>
                  <th className="px-6 py-3 text-center">Leads Captured</th>
                  <th className="px-6 py-3 text-center">Unique Buyers</th>
                  <th className="px-6 py-3 text-center">Conversion Rate</th>
                  <th className="px-6 py-3 text-right">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-slate-700 font-medium">
                {cohorts.map((cohort, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="px-6 py-3 font-bold text-slate-800">{cohort.date}</td>
                    <td className="px-6 py-3 text-center">{cohort.leadsCount}</td>
                    <td className="px-6 py-3 text-center">{cohort.buyersCount}</td>
                    <td className="px-6 py-3 text-center">
                      <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                        cohort.conversionRate >= 10 ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                        cohort.conversionRate >= 5 ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                        'bg-gray-50 text-gray-700 border border-gray-100'
                      }`}>
                        {cohort.conversionRate.toFixed(1)}%
                      </span>
                    </td>
                    <td className="px-6 py-3 text-right font-black text-slate-950">${cohort.revenue.toLocaleString()}</td>
                  </tr>
                ))}
                {cohorts.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-400 font-semibold">No lead cohorts recorded yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
