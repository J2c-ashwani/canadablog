import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ADMIN_SESSION_COOKIE, isValidAdminKey, isValidAdminSession } from '@/lib/admin/auth';
import { AdminLoginForm } from '../leads/AdminLoginForm';
import fs from 'fs';
import path from 'path';
import {
  Lock, KeyRound, BarChart3, Clock, Compass, AlertCircle,
  TrendingUp, Layers, ShieldCheck, ExternalLink,
  CheckSquare, Sparkles, User, Activity, Target, Zap, Leaf, RefreshCw, DollarSign
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Commercial Opportunity Portfolio | FSI Digital',
  robots: { index: false, follow: false },
};

function LockedState({ hasSecret }: { hasSecret: boolean }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
          <div className="mb-5 inline-flex rounded-md bg-amber-50 p-3 text-amber-700">
            {hasSecret ? <Lock className="h-6 w-6" /> : <KeyRound className="h-6 w-6" />}
          </div>
          <h1 className="text-3xl font-bold text-gray-950">Commercial Opportunity Portfolio — Locked</h1>
          <p className="mt-3 text-gray-700">
            {hasSecret
              ? 'Enter your private access code to view the Portfolio Dashboard.'
              : 'Private dashboard access is not ready yet.'}
          </p>
          {hasSecret ? (
            <AdminLoginForm />
          ) : (
            <div className="mt-6 rounded-md bg-gray-50 p-4 text-sm font-semibold text-gray-700">
              Ask the site owner to enable private dashboard access.
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default async function SEOOpportunitiesPage({
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

  // Load backlog opportunities JSON
  let opportunities: any[] = [];
  try {
    const filePath = path.join(process.cwd(), 'lib/data/seo-backlog.json');
    if (fs.existsSync(filePath)) {
      opportunities = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
  } catch (err) {
    console.error('Error loading seo-backlog.json:', err);
  }

  const activeOpportunities = opportunities.filter(o => o.status !== 'Optimized');
  const total = activeOpportunities.length;
  const optimizedCount = opportunities.filter(o => o.status === 'Optimized').length;

  // ── Priority Bands ──────────────────────────────────────────────
  const exceptional = activeOpportunities.filter(o => o.opportunityScore >= 85).length;
  const high = activeOpportunities.filter(o => o.opportunityScore >= 70 && o.opportunityScore < 85).length;
  const medium = activeOpportunities.filter(o => o.opportunityScore >= 50 && o.opportunityScore < 70).length;
  const low = activeOpportunities.filter(o => o.opportunityScore < 50).length;

  // ── Revenue Funnel ───────────────────────────────────────────────
  const funnelFiling   = activeOpportunities.filter(o => o.monetizationTier === 'direct-filing').length;
  const funnelAudit    = activeOpportunities.filter(o => o.monetizationTier === 'strategy-audit').length;
  const funnelReports  = activeOpportunities.filter(o => o.monetizationTier === 'report-bundle').length;
  const funnelCalc     = activeOpportunities.filter(o => o.monetizationTier === 'calculator-only').length;
  const funnelAware    = activeOpportunities.filter(o => o.monetizationTier === 'awareness-only').length;

  // ── Intent Stability ─────────────────────────────────────────────
  const evergreen   = activeOpportunities.filter(o =>
    o.url.match(/(vs-|-vs-|how-to-stack|difference|compare)/) ||
    (o.url.match(/(sred|irap|csbfp|canexport)/) && !o.url.match(/2026|2025|forecast|deadline/))
  ).length;
  const seasonal    = activeOpportunities.filter(o => o.url.match(/(forecast|early-bird|-2026|-2025|archive)/)).length;
  const volatile_   = activeOpportunities.filter(o => o.url.match(/(deadlines|last-chance|q1-|q4-|october-)/)).length;
  const semiStable  = total - evergreen - seasonal - volatile_;

  // ── Maintenance Cost ─────────────────────────────────────────────
  const maintHigh   = activeOpportunities.filter(o => o.url.match(/(deadlines|last-chance|news)/)).length;
  const maintMed    = activeOpportunities.filter(o => o.url.match(/(forecast|early-bird|q1-|q4-)/)).length;
  const maintLow    = total - maintHigh - maintMed;

  // ── Engineering Allocation ───────────────────────────────────────
  const pbCtr       = activeOpportunities.filter(o => o.playbookType === 'CTR Rescue' || o.playbookType === 'Title + Content Refresh' || o.playbookType === 'Snippet Enhancement').length;
  const pbContent   = activeOpportunities.filter(o => o.playbookType === 'Content Expansion' || o.playbookType === 'Structural Overhaul' || o.playbookType === 'Intent Realignment').length;
  const pbAuthority = activeOpportunities.filter(o => o.playbookType === 'Authority Build').length;
  const pbLaunch    = activeOpportunities.filter(o => o.playbookType === 'Launch Campaign').length;

  const pct = (n: number) => total > 0 ? Math.round((n / total) * 100) : 0;

  // ── Top 100 sorted ───────────────────────────────────────────────
  const top100 = [...activeOpportunities].sort((a, b) => b.opportunityScore - a.opportunityScore).slice(0, 100);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <Header />

      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex-1">

        {/* Dashboard Header */}
        <div className="md:flex md:items-center md:justify-between mb-8 pb-5 border-b border-slate-200">
          <div className="flex-1 min-w-0">
            <h2 className="text-3xl font-extrabold leading-7 text-slate-900 sm:text-4xl flex items-center gap-2">
              <Compass className="w-8 h-8 text-indigo-600" /> Commercial Opportunity Portfolio
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              FSI Digital · {total} active backlog assets · {optimizedCount} optimized assets · 9-factor opportunity engine + confidence signal · v1.2
            </p>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4 gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
              ● Engine Active
            </span>
          </div>
        </div>

        {/* ═══ PORTFOLIO HEALTH DASHBOARD ═══════════════════════════════════ */}
        <div className="mb-10">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-indigo-500" /> Portfolio Health
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">

            {/* ── Panel 1: Priority Bands ── */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-4 h-4 text-indigo-500" />
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Priority Bands</span>
              </div>
              <div className="space-y-2.5">
                {[
                  { label: 'Exceptional ≥ 85', count: exceptional, color: 'bg-violet-500', text: 'text-violet-700 bg-violet-50' },
                  { label: 'High 70–84', count: high, color: 'bg-emerald-500', text: 'text-emerald-700 bg-emerald-50' },
                  { label: 'Medium 50–69', count: medium, color: 'bg-blue-400', text: 'text-blue-700 bg-blue-50' },
                  { label: 'Low < 50', count: low, color: 'bg-slate-300', text: 'text-slate-600 bg-slate-50' },
                ].map(({ label, count, color, text }) => (
                  <div key={label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-600 font-medium">{label}</span>
                      <span className={`font-bold px-1.5 py-0.5 rounded text-xs ${text}`}>{count}</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-100">
                      <div className={`h-1.5 rounded-full ${color}`} style={{ width: `${pct(count)}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Panel 2: Revenue Funnel ── */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Revenue Funnel</span>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Direct Filing', count: funnelFiling, color: 'bg-violet-500', sub: 'SR&ED · IRAP' },
                  { label: 'Strategy Audit', count: funnelAudit, color: 'bg-indigo-500', sub: 'Cybersec · Mfg · Agri' },
                  { label: 'Reports', count: funnelReports, color: 'bg-blue-500', sub: '$19/$49/$79 tier' },
                  { label: 'Calculator', count: funnelCalc, color: 'bg-sky-400', sub: 'Calculator only' },
                  { label: 'Awareness', count: funnelAware, color: 'bg-slate-200', sub: 'U.S. / editorial' },
                ].map(({ label, count, color, sub }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className={`w-2 h-8 rounded-full shrink-0 ${color}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <span className="text-xs font-semibold text-slate-700">{label}</span>
                        <span className="text-xs font-black text-slate-900">{count}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">{sub}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Panel 3: Intent Stability + Maintenance ── */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Stability & Maintenance</span>
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Intent Stability</p>
              <div className="space-y-2 mb-4">
                {[
                  { label: 'Evergreen', count: evergreen, color: 'bg-emerald-500' },
                  { label: 'Semi-Stable', count: semiStable, color: 'bg-blue-400' },
                  { label: 'Seasonal', count: seasonal, color: 'bg-amber-400' },
                  { label: 'Volatile', count: volatile_, color: 'bg-red-400' },
                ].map(({ label, count, color }) => (
                  <div key={label} className="flex items-center gap-2 text-xs">
                    <div className={`w-2 h-2 rounded-full shrink-0 ${color}`} />
                    <span className="text-slate-600 flex-1">{label}</span>
                    <span className="font-bold text-slate-800">{count}</span>
                    <span className="text-slate-400">({pct(count)}%)</span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-2 mt-3 border-t border-slate-100 pt-3">Maintenance Cost</p>
              <div className="space-y-2">
                {[
                  { label: 'Low', count: maintLow, color: 'bg-emerald-400' },
                  { label: 'Medium', count: maintMed, color: 'bg-amber-400' },
                  { label: 'High', count: maintHigh, color: 'bg-red-400' },
                ].map(({ label, count, color }) => (
                  <div key={label} className="flex items-center gap-2 text-xs">
                    <div className={`w-2 h-2 rounded-full shrink-0 ${color}`} />
                    <span className="text-slate-600 flex-1">{label}</span>
                    <span className="font-bold text-slate-800">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Panel 4: Engineering Allocation ── */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Engineering Allocation</span>
              </div>
              <div className="space-y-4">
                {[
                  { label: 'CTR & Snippet', count: pbCtr, color: 'bg-blue-500', desc: 'CTR Rescue / Title Refresh / Snippet' },
                  { label: 'Content', count: pbContent, color: 'bg-indigo-500', desc: 'Expansion / Overhaul / Realignment' },
                  { label: 'Authority Build', count: pbAuthority, color: 'bg-violet-500', desc: 'CRA citations / Filing guides' },
                  { label: 'Launch Campaign', count: pbLaunch, color: 'bg-slate-400', desc: 'GSC indexation / Internal links' },
                ].map(({ label, count, color, desc }) => (
                  <div key={label}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <div>
                        <span className="font-semibold text-slate-700">{label}</span>
                        <p className="text-[10px] text-slate-400">{desc}</p>
                      </div>
                      <span className="font-black text-slate-900 text-sm">{pct(count)}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100">
                      <div className={`h-2 rounded-full ${color}`} style={{ width: `${pct(count)}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ═══ TOP 100 BACKLOG TABLE ════════════════════════════════════════ */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
          <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-indigo-500" /> Top 100 Commercial Backlog
            </h3>
            <span className="text-xs text-slate-500">Sorted by Net Opportunity Score (9-factor)</span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-150 text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="px-4 py-4">Score</th>
                  <th className="px-4 py-4">Page Route / Cluster</th>
                  <th className="px-4 py-4">Primary Keyword</th>
                  <th className="px-4 py-4">Funnel</th>
                  <th className="px-4 py-4 text-center">GSC Pos</th>
                  <th className="px-4 py-4 text-center">Confidence</th>
                  <th className="px-4 py-4">Why this score</th>
                  <th className="px-4 py-4">Playbook</th>
                  <th className="px-4 py-4 text-right">Live</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 bg-white">
                {top100.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-6 py-12 text-center text-slate-500 font-medium">
                      <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      No scored opportunities found. Run scripts/generate-backlog.ts first.
                    </td>
                  </tr>
                ) : (
                  top100.map((item, idx) => {
                    const scoreBg =
                      item.opportunityScore >= 85 ? 'bg-violet-100 text-violet-800' :
                      item.opportunityScore >= 70 ? 'bg-emerald-100 text-emerald-800' :
                      item.opportunityScore >= 50 ? 'bg-blue-100 text-blue-800' :
                      'bg-slate-100 text-slate-600';

                    const bandBadge =
                      item.priorityBucket === 'Exceptional' ? 'bg-violet-500 text-white' :
                      item.priorityBucket === 'High' ? 'bg-emerald-600 text-white' :
                      item.priorityBucket === 'Medium' ? 'bg-blue-500 text-white' :
                      'bg-slate-200 text-slate-600';

                    const tierBadge =
                      item.monetizationTier === 'direct-filing' ? 'bg-violet-50 text-violet-700 border border-violet-200' :
                      item.monetizationTier === 'strategy-audit' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' :
                      item.monetizationTier === 'report-bundle' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                      'bg-slate-50 text-slate-500 border border-slate-200';

                    const clusterBadge =
                      item.clusterType === 'Pillar Page' ? 'text-violet-700 bg-violet-50 border border-violet-200 font-bold' :
                      item.clusterType === 'Cluster Hub' ? 'text-indigo-700 bg-indigo-50 border border-indigo-200 font-bold' :
                      item.clusterType === 'Link Magnet' ? 'text-amber-700 bg-amber-50 border border-amber-200' :
                      'text-slate-500 bg-slate-50';

                    const confidenceColor =
                      item.confidenceLevel === 'High' ? 'text-emerald-700 bg-emerald-50' :
                      item.confidenceLevel === 'Medium' ? 'text-blue-700 bg-blue-50' :
                      'text-slate-500 bg-slate-100';

                    const posDisplay = item.position > 100 ? '–' : item.position;

                    return (
                      <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex flex-col items-center gap-1">
                            <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full font-extrabold text-sm ${scoreBg}`}>
                              {item.opportunityScore}
                            </span>
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${bandBadge}`}>
                              {item.priorityBucket}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 font-semibold text-slate-900 max-w-xs">
                          <div className="flex items-center gap-1.5 font-mono text-xs text-slate-700 truncate max-w-[200px]">
                            {item.url}
                            {item.status === 'Optimized' && (
                              <span className="inline-flex items-center px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-emerald-100 text-emerald-800 shrink-0">
                                ✓ Optimized
                              </span>
                            )}
                          </div>
                          <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] mt-1 ${clusterBadge}`}>
                            {item.clusterType}
                          </span>
                        </td>
                        <td className="px-4 py-3 italic text-slate-500 text-xs max-w-[160px]">
                          {item.primaryKeyword}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold ${tierBadge}`}>
                            {item.monetizationTier}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center font-bold text-slate-900 whitespace-nowrap text-sm">
                          {posDisplay}
                        </td>
                        <td className="px-4 py-3 text-center whitespace-nowrap">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${confidenceColor}`}>
                            {item.confidenceLevel}
                          </span>
                          <p className="text-[9px] text-slate-400 mt-0.5">data quality</p>
                        </td>
                        {/* Reason Score — why this page scored the way it did */}
                        <td className="px-4 py-3 max-w-[200px]">
                          {item.reasonScore?.positives?.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-1">
                              {item.reasonScore.positives.map((r: string, ri: number) => (
                                <span key={ri} className="inline-flex items-center gap-0.5 text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium leading-tight">
                                  <span className="text-emerald-500">+</span> {r}
                                </span>
                              ))}
                            </div>
                          )}
                          {item.reasonScore?.negatives?.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {item.reasonScore.negatives.map((r: string, ri: number) => (
                                <span key={ri} className="inline-flex items-center gap-0.5 text-[9px] px-1.5 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-200 font-medium leading-tight">
                                  <span className="text-red-400">−</span> {r}
                                </span>
                              ))}
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-[11px] font-semibold text-indigo-600 mb-0.5">{item.playbookType}</div>
                          <div className="text-xs text-slate-500">{item.recommendation}</div>
                          {item.playbookTasks?.length > 0 && (
                            <details className="mt-1 text-xs text-slate-500 cursor-pointer">
                              <summary className="font-semibold hover:text-indigo-600 focus:outline-none flex items-center gap-1 select-none text-[10px]">
                                <CheckSquare className="w-3 h-3 text-slate-400" /> Tasks ({item.playbookTasks.length})
                              </summary>
                              <ul className="list-disc pl-4 space-y-0.5 mt-1 text-[10px] text-slate-600 bg-slate-50 p-2 rounded border border-slate-100">
                                {item.playbookTasks.map((t: string, tIdx: number) => (
                                  <li key={tIdx}>{t}</li>
                                ))}
                              </ul>
                            </details>
                          )}
                        </td>
                        <td className="px-4 py-3 text-right whitespace-nowrap">
                          <Link
                            href={item.url.startsWith('/canada/') ? item.url : `/blog/${item.url.split('/').pop()}`}
                            target="_blank"
                            className="text-indigo-600 hover:text-indigo-900 inline-flex items-center gap-0.5 border border-indigo-200 rounded px-2 py-1 bg-indigo-50/20 text-xs font-bold"
                          >
                            Live <ExternalLink className="w-3 h-3" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })
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
