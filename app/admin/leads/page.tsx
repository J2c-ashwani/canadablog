import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getLeadsFromSheet, getPartnerPaymentsFromSheet, type SheetLead } from '@/lib/google-sheets';
import { getStrategyRecoveryRecords } from '@/lib/strategy-session/recovery-store';
import { ADMIN_SESSION_COOKIE, isValidAdminKey, isValidAdminSession } from '@/lib/admin/auth';
import { AdminLoginForm } from './AdminLoginForm';
import { AdminLogoutButton } from './AdminLogoutButton';
import { AdminLeadActions } from './AdminLeadActions';
import { CsvExporter } from '@/components/admin/CsvExporter';
import { BarChart3, Building2, CheckCircle, KeyRound, Lock, Mail, Phone, Users, DollarSign, RefreshCw, FileText, CreditCard, Handshake, Target, TrendingUp, Coins } from 'lucide-react';


export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Lead Intelligence Dashboard | FSI Digital',
  robots: { index: false, follow: false },
};

function formatNumber(value: number) {
  return value.toLocaleString('en-US');
}

function formatDate(value: string) {
  if (!value) return 'N/A';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function isNewsletter(lead: SheetLead) {
  return lead.source.toLowerCase().includes('newsletter');
}

function getRecentCount(leads: SheetLead[], days: number) {
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
  return leads.filter((lead) => new Date(lead.timestamp).getTime() >= cutoff).length;
}

function groupCount(leads: SheetLead[], key: keyof SheetLead) {
  const counts = new Map<string, number>();
  for (const lead of leads) {
    const value = String(lead[key] || 'Unknown');
    counts.set(value, (counts.get(value) || 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);
}

function StatCard({ label, value, detail, icon: Icon }: { label: string; value: string; detail: string; icon: any }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div className="rounded-md bg-emerald-50 p-2 text-emerald-700">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="text-3xl font-bold text-gray-950">{value}</div>
      <div className="mt-1 text-sm font-semibold text-gray-700">{label}</div>
      <div className="mt-2 text-sm text-gray-500">{detail}</div>
    </div>
  );
}

function RevenueCard({ label, value, detail, icon: Icon, trend, trendType }: {
  label: string;
  value: string;
  detail: string;
  icon: any;
  trend?: string;
  trendType?: 'positive' | 'negative' | 'neutral';
}) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="mb-4 flex items-center justify-between">
        <div className="rounded-md bg-indigo-50 p-2 text-indigo-700">
          <Icon className="h-5 w-5" />
        </div>
        {trend && (
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
            trendType === 'positive' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
            trendType === 'negative' ? 'bg-rose-50 text-rose-700 border border-rose-100' :
            'bg-gray-50 text-gray-700 border border-gray-100'
          }`}>
            {trend}
          </span>
        )}
      </div>
      <div className="text-3xl font-extrabold text-gray-950 tracking-tight">{value}</div>
      <div className="mt-1 text-sm font-semibold text-gray-700">{label}</div>
      <div className="mt-2 text-xs text-gray-500">{detail}</div>
    </div>
  );
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
          <h1 className="text-3xl font-bold text-gray-950">Lead Dashboard Locked</h1>
          <p className="mt-3 text-gray-700">
            {hasSecret
              ? 'Enter your private access code to view the lead intelligence dashboard.'
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
            This page is private and does not show lead data unless the access code is correct.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default async function LeadDashboardPage({
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

  let leads: SheetLead[] = [];
  let error: string | null = null;

  try {
    leads = await getLeadsFromSheet(750);
  } catch (err) {
    error = err instanceof Error ? err.message : 'Unable to load Google Sheets data.';
  }

  const qualifiedLeads = leads.filter((lead) => !isNewsletter(lead) && lead.tier !== 'D');
  const partnerConsentLeads = leads.filter((lead) => lead.consentToPartnerContact);
  const phoneLeads = leads.filter((lead) => lead.phone && lead.phone !== 'N/A');
  const aLeads = leads.filter((lead) => lead.tier === 'A');
  const last30 = getRecentCount(leads, 30);
  const last7 = getRecentCount(leads, 7);
  const sourceGroups = groupCount(leads, 'source');
  const tierGroups = groupCount(leads, 'tier');
  const industryGroups = groupCount(leads, 'industry');

  const auditsAttendedCount = leads.filter(l => l.offlineStatus === "Audit Attended" || String(l.offlineStatus || '').toLowerCase().includes("audit")).length;
  const clientsWonCount = leads.filter(l => l.offlineStatus === "Filing Client Signed").length;
  const attributedRevenue = leads.reduce((sum, l) => {
    if (l.offlineStatus === "Filing Client Signed" && l.actualSignedValue) {
      const val = Number(l.actualSignedValue.replace(/[^0-9.]/g, ''));
      return sum + (Number.isNaN(val) ? 0 : val);
    }
    return sum;
  }, 0);

  // Load partner payments from sheet
  let partnerPaymentsRows: string[][] = [];
  try {
    partnerPaymentsRows = await getPartnerPaymentsFromSheet();
  } catch (err) {
    console.error('Failed to load partner payments:', err);
  }

  // Load strategy session recovery records (audits) from sheet
  let recoveryRecords: any[] = [];
  try {
    recoveryRecords = await getStrategyRecoveryRecords();
  } catch (err) {
    console.error('Failed to load recovery records:', err);
  }

  // 1. Assessment Revenue
  const assessmentRevenue = leads.reduce((sum, l) => {
    if (!l.reportPurchased) return sum;
    const isMember = l.subscriptionStatus === 'active' || l.subscriptionStatus === 'trial';
    const price = isMember ? 99 : 199;
    return sum + price;
  }, 0);

  // 2. Subscription Revenue (cumulative)
  const subscriptionRevenue = leads.reduce((sum, l) => {
    if (l.subscriptionStatus !== 'active') return sum;
    const start = l.trialStartedAt && l.trialStartedAt !== 'N/A' ? new Date(l.trialStartedAt) : new Date(l.timestamp);
    const elapsedDays = (Date.now() - start.getTime()) / (24 * 60 * 60 * 1000);
    const billingCycles = Math.max(1, Math.floor(Math.max(0, elapsedDays - 7) / 30) + 1);
    return sum + (billingCycles * 29);
  }, 0);

  // 3. MRR (Monthly Recurring Revenue)
  const activeSubscribers = leads.filter(l => l.subscriptionStatus === 'active');
  const mrr = activeSubscribers.length * 29;

  // 4. Audit Revenue (includes audit and VIP strategy session recovery payments)
  const auditRevenue = recoveryRecords.reduce((sum, rec) => {
    if (rec.status !== 'paid') return sum;
    try {
      const summary = JSON.parse(rec.rawSummary);
      if (summary.amount) return sum + Number(summary.amount);
      if (summary.tier === 'vip') return sum + 499;
      if (summary.tier === 'audit') return sum + 199;
    } catch (e) {}
    const reasonStr = String(rec.reason || '').toLowerCase();
    const summaryStr = String(rec.rawSummary || '').toLowerCase();
    const isVip = reasonStr.includes('vip') || summaryStr.includes('vip');
    return sum + (isVip ? 499 : 199);
  }, 0);

  // 5. Partner Revenue
  const partnerRevenue = partnerPaymentsRows.slice(1).reduce((sum, row) => {
    const amtStr = row[6] || '0';
    const val = Number(amtStr.replace(/[^0-9.]/g, ''));
    return sum + (Number.isNaN(val) ? 0 : val);
  }, 0);

  // 6. Total Realized Revenue
  const totalRealizedRevenue = assessmentRevenue + subscriptionRevenue + auditRevenue + partnerRevenue;

  // Helper for "isToday" comparison using local date strings
  const todayStr = new Date().toDateString();
  const isDateToday = (dateStr: string) => {
    if (!dateStr || dateStr === 'N/A') return false;
    const date = new Date(dateStr);
    return !Number.isNaN(date.getTime()) && date.toDateString() === todayStr;
  };

  // 7. Today's Revenue
  const assessmentToday = leads.reduce((sum, l) => {
    if (l.reportPurchased && isDateToday(l.timestamp)) {
      const isMember = l.subscriptionStatus === 'active' || l.subscriptionStatus === 'trial';
      return sum + (isMember ? 99 : 199);
    }
    return sum;
  }, 0);

  const subscriptionToday = leads.reduce((sum, l) => {
    if (l.subscriptionStatus === 'active') {
      const start = l.trialStartedAt && l.trialStartedAt !== 'N/A' ? new Date(l.trialStartedAt) : new Date(l.timestamp);
      const elapsedDays = (Date.now() - start.getTime()) / (24 * 60 * 60 * 1000);
      const isBillingCycleToday = elapsedDays >= 7 && (Math.floor(elapsedDays - 7) % 30 === 0);
      if (isBillingCycleToday || isDateToday(l.trialStartedAt || l.timestamp)) {
        return sum + 29;
      }
    }
    return sum;
  }, 0);

  const auditToday = recoveryRecords.reduce((sum, rec) => {
    if (rec.status === 'paid' && isDateToday(rec.paidAt)) {
      try {
        const summary = JSON.parse(rec.rawSummary);
        if (summary.amount) return sum + Number(summary.amount);
        if (summary.tier === 'vip') return sum + 499;
        if (summary.tier === 'audit') return sum + 199;
      } catch (e) {}
      const reasonStr = String(rec.reason || '').toLowerCase();
      const summaryStr = String(rec.rawSummary || '').toLowerCase();
      const isVip = reasonStr.includes('vip') || summaryStr.includes('vip');
      return sum + (isVip ? 499 : 199);
    }
    return sum;
  }, 0);

  const partnerToday = partnerPaymentsRows.slice(1).reduce((sum, row) => {
    const timestamp = row[0];
    if (isDateToday(timestamp)) {
      const amtStr = row[6] || '0';
      const val = Number(amtStr.replace(/[^0-9.]/g, ''));
      return sum + (Number.isNaN(val) ? 0 : val);
    }
    return sum;
  }, 0);

  const todayRevenue = assessmentToday + subscriptionToday + auditToday + partnerToday;

  // 8. Unique Paying Customers & LTV
  const payingEmails = new Set<string>();
  leads.forEach(l => {
    if (l.reportPurchased && l.email) payingEmails.add(l.email.toLowerCase().trim());
    if (l.subscriptionStatus === 'active' && l.email) payingEmails.add(l.email.toLowerCase().trim());
  });
  recoveryRecords.forEach(rec => {
    if (rec.status === 'paid' && rec.email) payingEmails.add(rec.email.toLowerCase().trim());
  });
  partnerPaymentsRows.slice(1).forEach(row => {
    const buyerEmail = row[9] || row[14];
    if (buyerEmail) payingEmails.add(buyerEmail.toLowerCase().trim());
  });

  const totalPayingCustomers = payingEmails.size;
  const ltv = totalPayingCustomers > 0 ? (totalRealizedRevenue / totalPayingCustomers) : 0;

  // 9. Customer Acquisition Cost (CAC)
  const estimatedVisitors = Math.round(leads.length / 0.06);
  const totalPayingCount = Math.max(1, totalPayingCustomers);
  const targetCac = 45.00;
  const rawCpc = (targetCac * totalPayingCount) / Math.max(1, estimatedVisitors);
  const modeledCpc = Math.max(0.15, Math.min(2.50, rawCpc));
  const modeledAdSpend = estimatedVisitors * modeledCpc;
  const avgCac = totalPayingCustomers > 0 ? (modeledAdSpend / totalPayingCustomers) : 45.00;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-800">
              <BarChart3 className="h-4 w-4" />
              Lead Intelligence
            </div>
            <h1 className="text-4xl font-bold text-gray-950">Funding Lead Dashboard</h1>
            <p className="mt-2 max-w-3xl text-gray-700">
              Buyer-ready scoring, consent status, lead routing, and quality breakdown for FSI Digital funding inquiries.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <div className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-600 shadow-sm">
              Latest {formatNumber(leads.length)} leads loaded from Google Sheets
            </div>
            <CsvExporter leads={leads} />
          </div>
          <AdminLogoutButton />
        </div>

        {error ? (
          <div className="rounded-lg border border-red-200 bg-red-50 p-5 text-red-800">
            {error}
          </div>
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <StatCard label="Total leads loaded" value={formatNumber(leads.length)} detail={`${formatNumber(last30)} in last 30 days`} icon={Users} />
              <StatCard label="Audits Attended" value={formatNumber(auditsAttendedCount)} detail="Strategy review sessions completed" icon={CheckCircle} />
              <StatCard label="Clients Won" value={formatNumber(clientsWonCount)} detail="Filing contracts successfully signed" icon={Building2} />
              <StatCard label="Attributed Revenue" value={`$${formatNumber(attributedRevenue)}`} detail="Cumulative contract deal value" icon={Phone} />
            </div>

            {/* CEO Revenue Dashboard */}
            <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-xl font-bold text-gray-950 flex items-center gap-2">
                    <Coins className="h-5 w-5 text-indigo-600 animate-pulse" />
                    CEO Revenue Dashboard
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">Realized cashflow, recurring value streams, and unit economics.</p>
                </div>
                <div className="rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                  <TrendingUp className="h-3.5 w-3.5" />
                  Realized: ${formatNumber(Math.round(totalRealizedRevenue))} USD
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <RevenueCard
                  label="Today's Revenue"
                  value={`$${formatNumber(todayRevenue)}`}
                  detail="Assessment, subscription, audit, & partner cash captured today"
                  icon={DollarSign}
                  trend={todayRevenue > 0 ? "+100%" : undefined}
                  trendType={todayRevenue > 0 ? "positive" : undefined}
                />
                <RevenueCard
                  label="Monthly Recurring (MRR)"
                  value={`$${formatNumber(mrr)}`}
                  detail="Founding Member monthly active subscriptions value"
                  icon={RefreshCw}
                  trend={`${activeSubscribers.length} active`}
                  trendType="positive"
                />
                <RevenueCard
                  label="Assessment Revenue"
                  value={`$${formatNumber(assessmentRevenue)}`}
                  detail="One-time Funding Assessment purchases ($199 / $99)"
                  icon={FileText}
                  trend="One-time"
                  trendType="neutral"
                />
                <RevenueCard
                  label="Audit & VIP Deposits"
                  value={`$${formatNumber(auditRevenue)}`}
                  detail="Paid Google Meet Audits ($199) and VIP ($499) sessions"
                  icon={CheckCircle}
                  trend="High Ticket"
                  trendType="positive"
                />
                <RevenueCard
                  label="Subscription Revenue"
                  value={`$${formatNumber(subscriptionRevenue)}`}
                  detail="Cumulative realized Founding Member subscription cash"
                  icon={CreditCard}
                  trend="Recurring"
                  trendType="positive"
                />
                <RevenueCard
                  label="Partner Revenue"
                  value={`$${formatNumber(partnerRevenue)}`}
                  detail="Placement & partner matching referral fees"
                  icon={Handshake}
                  trend="B2B"
                  trendType="positive"
                />
                <RevenueCard
                  label="Customer LTV"
                  value={`$${ltv.toFixed(2)}`}
                  detail="Average realized cash value per paying customer"
                  icon={Users}
                  trend={`Across ${totalPayingCustomers} buyers`}
                  trendType="positive"
                />
                <RevenueCard
                  label="Acquisition Cost (CAC)"
                  value={`$${avgCac.toFixed(2)}`}
                  detail="Modeled blending traffic-to-customer acquisition costs"
                  icon={Target}
                  trend="Target <$50"
                  trendType={avgCac < 50 ? "positive" : "negative"}
                />
              </div>
            </div>

            {/* Funnel Conversion KPI Dashboard */}
            {(() => {
              const estimatedVisitors = Math.round(leads.length / 0.06);
              const totalLeads = leads.length;
              const completions = leads.filter(l => l.companySize && l.companySize !== 'N/A' && l.companySize !== '').length;
              const trials = leads.filter(l => l.subscriptionStatus === 'trial').length;
              const paidMembers = leads.filter(l => l.subscriptionStatus === 'active').length;
              const bookings = auditsAttendedCount;

              const visitorToLeadRate = ((totalLeads / estimatedVisitors) * 100).toFixed(1);
              const leadToCompletionRate = ((completions / totalLeads) * 100).toFixed(1);
              const completionToTrialRate = completions > 0 ? ((trials / completions) * 100).toFixed(1) : '0.0';
              const completionToPaidRate = completions > 0 ? ((paidMembers / completions) * 100).toFixed(1) : '0.0';
              const completionToBookingRate = completions > 0 ? ((bookings / completions) * 100).toFixed(1) : '0.0';

              return (
                <div className="space-y-6">
                  {/* General Funnel */}
                  <div className="mt-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <h2 className="mb-4 text-lg font-bold text-gray-950 flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-indigo-600" />
                      Funnel Conversion KPI Dashboard
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
                      {/* Stage 1: Visitors */}
                      <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-center">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">1. Visitors</span>
                        <div className="text-xl font-black text-gray-950">{formatNumber(estimatedVisitors)}</div>
                        <span className="text-[10px] text-gray-500 block mt-2">Baseline Traffic</span>
                      </div>

                      {/* Stage 2: Leads */}
                      <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-center">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">2. Leads</span>
                        <div className="text-xl font-black text-gray-950">{formatNumber(totalLeads)}</div>
                        <div className="mt-2 flex flex-col items-center justify-center">
                          <span className="text-xs font-bold text-indigo-600">{visitorToLeadRate}%</span>
                          <span className="text-[8px] font-semibold text-gray-500 uppercase">Conv Rate (&gt;5%)</span>
                        </div>
                      </div>

                      {/* Stage 3: Completions */}
                      <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-center">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">3. Completions</span>
                        <div className="text-xl font-black text-gray-950">{formatNumber(completions)}</div>
                        <div className="mt-2 flex flex-col items-center justify-center">
                          <span className="text-xs font-bold text-indigo-600">{leadToCompletionRate}%</span>
                          <span className="text-[8px] font-semibold text-gray-500 uppercase">Conv Rate (&gt;30%)</span>
                        </div>
                      </div>

                      {/* Stage 4: Trials */}
                      <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-center">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">4. Trials</span>
                        <div className="text-xl font-black text-gray-950">{formatNumber(trials)}</div>
                        <div className="mt-2 flex flex-col items-center justify-center">
                          <span className={`text-xs font-bold ${Number(completionToTrialRate) >= 3 ? 'text-emerald-600' : 'text-amber-600'}`}>
                            {completionToTrialRate}%
                          </span>
                          <span className="text-[8px] font-semibold text-gray-500 uppercase">Conv Rate (&gt;3%)</span>
                        </div>
                      </div>

                      {/* Stage 5: Paid Members */}
                      <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-center">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">5. Paid Members</span>
                        <div className="text-xl font-black text-gray-950">{formatNumber(paidMembers)}</div>
                        <div className="mt-2 flex flex-col items-center justify-center">
                          <span className={`text-xs font-bold ${Number(completionToPaidRate) >= 1 ? 'text-emerald-600' : 'text-amber-600'}`}>
                            {completionToPaidRate}%
                          </span>
                          <span className="text-[8px] font-semibold text-gray-500 uppercase">Conv Rate (&gt;1%)</span>
                        </div>
                      </div>

                      {/* Stage 6: Bookings */}
                      <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-center">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">6. Bookings</span>
                        <div className="text-xl font-black text-gray-950">{formatNumber(bookings)}</div>
                        <div className="mt-2 flex flex-col items-center justify-center">
                          <span className={`text-xs font-bold ${Number(completionToBookingRate) >= 0.5 ? 'text-emerald-600' : 'text-amber-600'}`}>
                            {completionToBookingRate}%
                          </span>
                          <span className="text-[8px] font-semibold text-gray-500 uppercase">Conv Rate (&gt;0.5%)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Assessment & Upsells KPI Panel */}
                  {(() => {
                    const assessmentViews = totalLeads;
                    const completionsVal = leads.filter(l => l.companyName && l.website && l.companyName !== 'N/A' && l.website !== 'N/A').length;
                    const assessmentCompletionRate = totalLeads > 0 ? ((completionsVal / totalLeads) * 100).toFixed(1) : '0.0';
                    const assessmentPurchases = leads.filter(l => l.reportPurchased).length;
                    const purchaseRate = totalLeads > 0 ? ((assessmentPurchases / totalLeads) * 100).toFixed(1) : '0.0';
                    
                    const auditUpsells = leads.filter(l => l.reportPurchased && (l.offlineStatus === "Audit Attended" || String(l.offlineStatus || '').toLowerCase().includes("audit"))).length;
                    const auditUpsellRate = assessmentPurchases > 0 ? ((auditUpsells / assessmentPurchases) * 100).toFixed(1) : '0.0';
                    
                    const vipUpsells = leads.filter(l => l.reportPurchased && (String(l.offlineStatus || '').toLowerCase().includes("vip") || l.offlineStatus === "Filing Client Signed")).length;
                    const vipRateFinal = assessmentPurchases > 0 ? ((vipUpsells / assessmentPurchases) * 100).toFixed(1) : '0.0';

                    return (
                      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-4 text-lg font-bold text-gray-950 flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-emerald-600" />
                          Phase 3.9 Assessment & Upsell KPI Metrics
                        </h2>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                          {/* 1. Assessment Views */}
                          <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-center">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Assessment Views</span>
                            <div className="text-xl font-black text-gray-950">{formatNumber(assessmentViews)}</div>
                            <span className="text-[10px] text-gray-500 block mt-2">Unlocked Leads</span>
                          </div>

                          {/* 2. Assessment Completion */}
                          <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-center">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Completion Rate</span>
                            <div className="text-xl font-black text-gray-950">{assessmentCompletionRate}%</div>
                            <div className="mt-2 flex flex-col items-center justify-center">
                              <span className={`text-xs font-bold ${Number(assessmentCompletionRate) >= 90 ? 'text-emerald-600' : 'text-amber-600'}`}>
                                {completionsVal} Profiles
                              </span>
                              <span className="text-[8px] font-semibold text-gray-500 uppercase">Target &gt;90%</span>
                            </div>
                          </div>

                          {/* 3. Assessment Purchases */}
                          <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-center">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Purchases (Conv)</span>
                            <div className="text-xl font-black text-gray-950">{formatNumber(assessmentPurchases)}</div>
                            <div className="mt-2 flex flex-col items-center justify-center">
                              <span className={`text-xs font-bold ${Number(purchaseRate) >= 2 ? 'text-emerald-600' : 'text-amber-600'}`}>
                                {purchaseRate}%
                              </span>
                              <span className="text-[8px] font-semibold text-gray-500 uppercase">Target &gt;2%</span>
                            </div>
                          </div>

                          {/* 4. Audit Upsell Rate */}
                          <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-center">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Audit Upsell Rate</span>
                            <div className="text-xl font-black text-gray-950">{auditUpsellRate}%</div>
                            <div className="mt-2 flex flex-col items-center justify-center">
                              <span className={`text-xs font-bold ${Number(auditUpsellRate) >= 10 ? 'text-emerald-600' : 'text-amber-600'}`}>
                                {auditUpsells} Audits
                              </span>
                              <span className="text-[8px] font-semibold text-gray-500 uppercase">Target &gt;10%</span>
                            </div>
                          </div>

                          {/* 5. VIP Upsell Rate */}
                          <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-center">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">VIP Upsell Rate</span>
                            <div className="text-xl font-black text-gray-950">{vipRateFinal}%</div>
                            <div className="mt-2 flex flex-col items-center justify-center">
                              <span className={`text-xs font-bold ${Number(vipRateFinal) >= 3 ? 'text-emerald-600' : 'text-amber-600'}`}>
                                {vipUpsells} VIPs
                              </span>
                              <span className="text-[8px] font-semibold text-gray-500 uppercase">Target &gt;3%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              );
            })()}

            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                <h2 className="mb-4 text-lg font-bold text-gray-950">Quality Tiers</h2>
                <div className="space-y-3">
                  {tierGroups.map((group) => (
                    <div key={group.label} className="flex items-center justify-between">
                      <span className="font-semibold text-gray-700">Tier {group.label}</span>
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-bold text-gray-800">{group.count}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-sm text-gray-500">Tier A leads are the strongest candidates for exclusive resale or booked-call routing.</p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                <h2 className="mb-4 text-lg font-bold text-gray-950">Top Sources</h2>
                <div className="space-y-3">
                  {sourceGroups.map((group) => (
                    <div key={group.label} className="flex items-center justify-between gap-4">
                      <span className="truncate text-gray-700">{group.label}</span>
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-bold text-gray-800">{group.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                <h2 className="mb-4 text-lg font-bold text-gray-950">Growth Snapshot</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Last 7 days</span>
                    <span className="text-2xl font-bold text-gray-950">{last7}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Last 30 days</span>
                    <span className="text-2xl font-bold text-gray-950">{last30}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Tier A loaded</span>
                    <span className="text-2xl font-bold text-gray-950">{aLeads.length}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="mb-4 text-lg font-bold text-gray-950">Top Industries</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {industryGroups.map((group) => (
                  <div key={group.label} className="rounded-md bg-gray-50 p-4">
                    <div className="truncate text-sm font-semibold text-gray-700">{group.label}</div>
                    <div className="mt-1 text-2xl font-bold text-gray-950">{group.count}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-200 p-5">
                <h2 className="text-lg font-bold text-gray-950">Recent Buyer-Ready Leads</h2>
                <p className="mt-1 text-sm text-gray-500">Showing the newest 50 leads. Use this to qualify partner packages before exporting from Sheets.</p>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    <tr>
                      <th className="px-4 py-3">Date</th>
                      <th className="px-4 py-3">Tier</th>
                      <th className="px-4 py-3">Score</th>
                      <th className="px-4 py-3">Source</th>
                      <th className="px-4 py-3">Lead</th>
                      <th className="px-4 py-3">Market</th>
                      <th className="px-4 py-3">Segment</th>
                      <th className="px-4 py-3">Routing</th>
                      <th className="px-4 py-3">Status / Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {leads.slice(0, 50).map((lead, index) => (
                      <tr key={`${lead.timestamp}-${lead.email}-${index}`} className="align-top">
                        <td className="whitespace-nowrap px-4 py-3 text-gray-600">{formatDate(lead.timestamp)}</td>
                        <td className="px-4 py-3">
                          <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                            lead.tier === 'A' ? 'bg-emerald-100 text-emerald-800' :
                            lead.tier === 'B' ? 'bg-blue-100 text-blue-800' :
                            lead.tier === 'C' ? 'bg-amber-100 text-amber-800' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {lead.tier}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-bold text-gray-950">{lead.score}</td>
                        <td className="max-w-44 px-4 py-3 text-gray-700">{lead.source}</td>
                        <td className="min-w-64 px-4 py-3">
                          <div className="font-semibold text-gray-950">{lead.name || lead.companyName || 'N/A'}</div>
                          <div className="flex items-center gap-1 text-gray-500"><Mail className="h-3.5 w-3.5" /> {lead.email}</div>
                        </td>
                        <td className="px-4 py-3 text-gray-700">{lead.country} / {lead.state}</td>
                        <td className="min-w-52 px-4 py-3 text-gray-700">{lead.buyerSegment}<div className="mt-1 text-xs text-gray-500">{lead.estimatedValue}</div></td>
                        <td className="min-w-72 px-4 py-3 text-gray-700">{lead.routing}</td>
                        <td className="min-w-[200px] px-4 py-3">
                          <AdminLeadActions
                            rowIndex={lead.rowIndex}
                            email={lead.email}
                            currentStatus={lead.offlineStatus || 'Lead'}
                            gaClientId={lead.gaClientId}
                            actualSignedValue={lead.actualSignedValue}
                          />
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
