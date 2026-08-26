import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AdminLoginForm } from '../leads/AdminLoginForm';
import { ADMIN_SESSION_COOKIE, isValidAdminKey, isValidAdminSession } from '@/lib/admin/auth';
import { CEOAgent } from '@/lib/ceo-agent/ceo-agent';
import { readOperationalRows } from '@/lib/growth-os/operations-store';
import { Activity, AlertTriangle, Bot, CheckCircle2, KeyRound, Lock, MailCheck, Target } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const maxDuration = 120;

export const metadata: Metadata = {
  title: 'GrowthOS Command Center | FSI Digital',
  robots: { index: false, follow: false },
};

const RUN_HEADERS = ['Attempt ID', 'Operation', 'Started At', 'Status', 'Completed At', 'Summary'];

function money(value: unknown) {
  return `$${Number(value || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function LockedState({ configured }: { configured: boolean }) {
  return <div className="min-h-screen bg-slate-950 text-slate-100"><Header /><main className="mx-auto max-w-xl px-4 py-20"><div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">{configured ? <Lock className="h-7 w-7 text-amber-400" /> : <KeyRound className="h-7 w-7 text-amber-400" />}<h1 className="mt-4 text-2xl font-black">GrowthOS command center locked</h1><p className="mt-2 text-sm text-slate-400">{configured ? 'Sign in with the private dashboard access code.' : 'Private dashboard access is not configured.'}</p>{configured && <AdminLoginForm />}</div></main><Footer /></div>;
}

export default async function GrowthOSDashboardPage({ searchParams }: { searchParams: Promise<{ key?: string }> }) {
  const params = await searchParams;
  const secret = process.env.LEAD_DASHBOARD_SECRET;
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (!secret || (!isValidAdminKey(params.key, secret) && !isValidAdminSession(session, secret))) {
    return <LockedState configured={Boolean(secret)} />;
  }

  let report: Awaited<ReturnType<typeof CEOAgent.runCEOLoop>> | null = null;
  let runs: string[][] = [];
  let loadError = '';
  try {
    [report, runs] = await Promise.all([
      CEOAgent.runCEOLoop('verification'),
      readOperationalRows('GrowthOS Runs', RUN_HEADERS),
    ]);
  } catch (error: any) {
    loadError = error.message || String(error);
  }

  const scoreboard = report?.scoreboard;
  const specialists = report?.specialistReports || {};
  const revenue = specialists.revenue || {};
  const growth = specialists.growth || {};
  const sales = specialists.sales || {};
  const product = specialists.product || {};
  const pipeline = sales.pipeline || {};
  const actionPerformance = revenue.actionPerformance || { actions: [] };
  const recentRuns = runs.slice(-12).reverse();
  const cards = [
    { label: 'Verified MRR', value: money(scoreboard?.currentMRRUSD), sub: `${scoreboard?.activeMemberships || 0} active $29 memberships`, icon: Target },
    { label: '30-day sprint cash', value: money(scoreboard?.currentVerifiedRevenueUSD), sub: `Target ${money(scoreboard?.monthlyRevenueTargetUSD)} by ${scoreboard?.targetWindowEndsAt ? new Date(scoreboard.targetWindowEndsAt).toLocaleDateString() : 'day 30'}`, icon: Activity },
    { label: 'Provider-accepted outreach', value: String(pipeline.contactedCount || 0), sub: `${pipeline.deliveredCount || 0} signed deliveries`, icon: MailCheck },
    { label: 'Verified purchases', value: String(pipeline.completedPurchasesCount || 0), sub: `${product.pendingDeliveriesCount || 0} pending · ${product.failedDeliveriesCount || 0} failed`, icon: CheckCircle2 },
    { label: 'Revenue / qualified lead', value: money(actionPerformance.verifiedRevenuePerQualifiedLeadUSD), sub: `${actionPerformance.totalQualifiedLeadsAffected || 0} attributed qualified leads`, icon: Target },
  ];

  return <div className="min-h-screen bg-slate-950 text-slate-100"><Header /><main className="mx-auto max-w-7xl px-4 py-10">
    <div className="mb-8 flex flex-col justify-between gap-4 border-b border-slate-800 pb-6 sm:flex-row sm:items-end"><div><div className="text-xs font-black uppercase tracking-widest text-emerald-400">Private evidence dashboard</div><h1 className="mt-2 text-3xl font-black">GrowthOS command center</h1><p className="mt-2 text-sm text-slate-400">Generated {report?.timestamp ? new Date(report.timestamp).toLocaleString() : 'unavailable'} · read-only verification run</p></div><div className={`rounded-lg border px-3 py-2 text-xs font-bold ${scoreboard?.evidenceState === 'VERIFIED' ? 'border-emerald-800 bg-emerald-950 text-emerald-300' : 'border-amber-800 bg-amber-950 text-amber-300'}`}>Evidence: {scoreboard?.evidenceState || 'UNKNOWN'}</div></div>

    {loadError && <div className="mb-6 rounded-xl border border-red-800 bg-red-950 p-4 text-sm text-red-200"><AlertTriangle className="mr-2 inline h-4 w-4" />Evidence load failed: {loadError}</div>}

    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">{cards.map(({ label, value, sub, icon: Icon }) => <div key={label} className="rounded-2xl border border-slate-800 bg-slate-900 p-5"><Icon className="h-5 w-5 text-emerald-400" /><div className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-500">{label}</div><div className="mt-1 text-3xl font-black">{value}</div><div className="mt-2 text-xs text-slate-400">{sub}</div></div>)}</div>

    <div className="mt-6 grid gap-6 lg:grid-cols-2">
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6"><h2 className="flex items-center gap-2 text-lg font-black"><Bot className="h-5 w-5 text-sky-400" />Agent truth</h2><div className="mt-5 space-y-3 text-sm">
        <div className="rounded-xl bg-slate-950 p-4"><strong>Revenue Agent:</strong> {revenue.evidenceState || 'UNKNOWN'} · all-time verified {money(revenue.verifiedTotalRevenueUSD)} · attributed to CEO {money(revenue.directlyAttributedToCEOUSD)}</div>
        <div className="rounded-xl bg-slate-950 p-4"><strong>Growth Agent:</strong> {growth.pipelineStatus || 'UNKNOWN'} · {growth.orphanedStagesCount || 0} measured pipeline gaps</div>
        <div className="rounded-xl bg-slate-950 p-4"><strong>Sales Agent:</strong> {pipeline.consentedLeads || 0} consented leads · {pipeline.checkoutStartsCount || 0} checkout starts · {pipeline.completedPurchasesCount || 0} purchases</div>
        <div className="rounded-xl bg-slate-950 p-4"><strong>Product Agent:</strong> {product.generatedReportsCount || 0} verified purchase records · {product.deliveredReportsCount || 0} webhook-verified deliveries</div>
      </div></section>

      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6"><h2 className="text-lg font-black">CEO decision</h2><div className="mt-4 rounded-xl border border-amber-900 bg-amber-950/40 p-4"><div className="text-xs font-bold uppercase tracking-wider text-amber-400">Primary bottleneck</div><p className="mt-2 text-sm">{report?.decisionBasis?.primary_bottleneck || 'Unavailable'}</p></div><div className="mt-4 rounded-xl bg-slate-950 p-4"><div className="text-xs font-bold uppercase tracking-wider text-slate-500">Current directive</div><p className="mt-2 text-sm text-slate-300">{report?.decisionBasis?.decision || 'Unavailable'}</p></div><p className="mt-4 text-xs text-slate-500">The 30-day operating target is $10K verified cash. Strict $10K MRR still requires 345 active $29 memberships. Call-dependent $199 products remain outside automated distribution.</p></section>
    </div>

    <section className="mt-6 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900"><div className="border-b border-slate-800 p-5"><h2 className="text-lg font-black">Action P&amp;L — what the CEO actually caused</h2><p className="mt-1 text-xs text-slate-400">Only signed first-party clicks and provider-verified payments qualify. Organic execution cost is reported as $0; USD and CAD are never silently combined.</p></div><div className="overflow-x-auto"><table className="w-full text-left text-xs"><thead className="bg-slate-950 text-slate-500"><tr><th className="p-3">Decision / campaign</th><th className="p-3">Leads</th><th className="p-3">Accepted / delivered</th><th className="p-3">Clicks</th><th className="p-3">Checkouts</th><th className="p-3">Payments</th><th className="p-3">Cash</th><th className="p-3">MRR</th><th className="p-3">Revenue / lead</th></tr></thead><tbody>{actionPerformance.actions?.length ? actionPerformance.actions.map((action: any) => <tr key={action.actionId} className="border-t border-slate-800"><td className="p-3"><span className={`mr-2 rounded px-2 py-1 font-black ${action.decision === 'SCALE' ? 'bg-emerald-950 text-emerald-300' : action.decision === 'STOP' ? 'bg-red-950 text-red-300' : 'bg-amber-950 text-amber-300'}`}>{action.decision}</span><span className="font-bold">{action.campaign}</span><div className="mt-2 max-w-xs text-[10px] text-slate-500">{action.decisionReason}</div></td><td className="p-3">{action.qualifiedLeadsAffected}</td><td className="p-3">{action.providerAccepted} / {action.delivered}</td><td className="p-3">{action.clicks}</td><td className="p-3">{action.checkouts}</td><td className="p-3">{action.purchases}</td><td className="p-3 font-bold">{money(action.revenueUSD)}{action.revenueCAD ? ` + C$${Number(action.revenueCAD).toFixed(2)}` : ''}</td><td className="p-3">{money(action.mrrUSD)}</td><td className="p-3">{money(action.revenuePerQualifiedLeadUSD)}</td></tr>) : <tr><td colSpan={9} className="p-6 text-center text-slate-500">No attributed commercial action has completed since this measurement layer went live.</td></tr>}</tbody></table></div></section>

    <section className="mt-6 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900"><div className="border-b border-slate-800 p-5"><h2 className="text-lg font-black">Recent durable scheduler runs</h2><p className="mt-1 text-xs text-slate-400">Duplicate schedulers are suppressed through these leases. A success state describes execution, never inbox delivery.</p></div><div className="overflow-x-auto"><table className="w-full text-left text-xs"><thead className="bg-slate-950 text-slate-500"><tr><th className="p-3">Operation</th><th className="p-3">Started</th><th className="p-3">Status</th><th className="p-3">Completed</th></tr></thead><tbody>{recentRuns.length ? recentRuns.map((run) => <tr key={run[0]} className="border-t border-slate-800"><td className="p-3 font-bold">{run[1]}</td><td className="p-3 text-slate-400">{run[2]}</td><td className="p-3">{run[3]}</td><td className="p-3 text-slate-400">{run[4] || 'running'}</td></tr>) : <tr><td colSpan={4} className="p-6 text-center text-slate-500">No durable run records yet.</td></tr>}</tbody></table></div></section>
  </main><Footer /></div>;
}
