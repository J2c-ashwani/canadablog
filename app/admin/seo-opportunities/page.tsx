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
  Lock, KeyRound, BarChart3, Clock, Compass, AlertCircle, CheckCircle2,
  TrendingUp, Award, Layers, ShieldCheck, HelpCircle, ExternalLink, RefreshCw,
  FolderDot, CheckSquare, Sparkles, User, BadgeAlert
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'SEO Opportunity Dashboard | FSI Digital',
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
          <h1 className="text-3xl font-bold text-gray-950">SEO Opportunity Dashboard Locked</h1>
          <p className="mt-3 text-gray-700">
            {hasSecret
              ? 'Enter your private access code to view the SEO Opportunity Prioritization Dashboard.'
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

export default async function SEEOpportunitiesPage({
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

  // Calculate bucket stats
  const bucketA = opportunities.filter(o => o.priorityBucket.includes('Bucket A')).length;
  const bucketB = opportunities.filter(o => o.priorityBucket.includes('Bucket B')).length;
  const bucketC = opportunities.filter(o => o.priorityBucket.includes('Bucket C')).length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <Header />

      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex-1">
        {/* Dashboard Header */}
        <div className="md:flex md:items-center md:justify-between mb-8 pb-5 border-b border-slate-200">
          <div className="flex-1 min-w-0">
            <h2 className="text-3xl font-extrabold leading-7 text-slate-900 sm:text-4xl sm:truncate flex items-center gap-2">
              <Compass className="w-8 h-8 text-indigo-600" /> Commercial Opportunity Engine
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              FSI Digital Prioritization Dashboard — dynamic data-informed selection of commercial search targets.
            </p>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4 gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
              Engine Stable
            </span>
          </div>
        </div>

        {/* Executive Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Scored Pages</p>
            <p className="text-3xl font-black text-slate-900 mt-1">{opportunities.length}</p>
            <div className="text-xs text-slate-500 mt-1.5 flex items-center gap-1">
              <BarChart3 className="w-3.5 h-3.5" /> Evaluated from 3-mo GSC report
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm border-l-4 border-l-emerald-500">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Bucket A (Fast Wins)</p>
            <p className="text-3xl font-black text-emerald-600 mt-1">{bucketA}</p>
            <p className="text-[11px] text-slate-500 mt-1.5">Pos 20-50, strong buying intent</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm border-l-4 border-l-blue-500">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Bucket B (Medium Wins)</p>
            <p className="text-3xl font-black text-blue-600 mt-1">{bucketB}</p>
            <p className="text-[11px] text-slate-500 mt-1.5">Pos 50-100, page 1 candidates</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm border-l-4 border-l-purple-500">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Bucket C (Breakthroughs)</p>
            <p className="text-3xl font-black text-purple-600 mt-1">{bucketC}</p>
            <p className="text-[11px] text-slate-500 mt-1.5">Pos &gt; 100 with massive search upside</p>
          </div>
        </div>

        {/* Backlog List */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
          <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <h3 className="font-bold text-slate-800 text-base">Top 100 Commercial Backlog</h3>
            <span className="text-xs text-slate-500">Sorted by Opportunity Score</span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-150 text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="px-6 py-4">Opportunity Score</th>
                  <th className="px-6 py-4">Page Route / Cluster</th>
                  <th className="px-6 py-4">Primary Keyword</th>
                  <th className="px-6 py-4">Expected ROI</th>
                  <th className="px-6 py-4 text-center">GSC Avg Pos</th>
                  <th className="px-6 py-4 text-center">Confidence</th>
                  <th className="px-6 py-4">Recommended Action & Playbook</th>
                  <th className="px-6 py-4">Status & Owner</th>
                  <th className="px-6 py-4 text-right">Links</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 bg-white">
                {opportunities.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-6 py-12 text-center text-slate-500 font-medium">
                      <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      No scored opportunities found. Run scripts/generate-backlog.ts first.
                    </td>
                  </tr>
                ) : (
                  opportunities.map((item, idx) => {
                    // Styles based on score and ROI
                    let scoreBg = 'bg-slate-100 text-slate-800';
                    if (item.opportunityScore >= 80) scoreBg = 'bg-emerald-100 text-emerald-800';
                    else if (item.opportunityScore >= 60) scoreBg = 'bg-blue-100 text-blue-800';

                    let roiBadge = 'bg-slate-100 text-slate-800';
                    if (item.expectedRoi === 'Very High') roiBadge = 'bg-emerald-500 text-white font-bold';
                    else if (item.expectedRoi === 'High') roiBadge = 'bg-indigo-600 text-white font-bold';

                    let confidenceColor = 'text-slate-500 bg-slate-100';
                    if (item.confidenceLevel === 'High') confidenceColor = 'text-emerald-700 bg-emerald-50';
                    else if (item.confidenceLevel === 'Medium') confidenceColor = 'text-blue-700 bg-blue-50';

                    let clusterBadge = 'text-slate-500 bg-slate-100';
                    if (item.clusterType === 'Cluster Hub') clusterBadge = 'text-indigo-700 bg-indigo-50 border border-indigo-150 font-bold';

                    return (
                      <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full font-extrabold text-sm ${scoreBg}`}>
                            {item.opportunityScore}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-semibold text-slate-900 max-w-xs">
                          <div className="font-semibold text-slate-900 truncate">{item.url}</div>
                          <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] mt-1 ${clusterBadge}`}>
                            {item.clusterType}
                          </span>
                        </td>
                        <td className="px-6 py-4 italic text-slate-500">
                          {item.primaryKeyword}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${roiBadge}`}>
                            {item.expectedRoi} ({item.engineeringEffort}h)
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center font-bold text-slate-900 whitespace-nowrap">
                          {item.position}
                        </td>
                        <td className="px-6 py-4 text-center whitespace-nowrap">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${confidenceColor}`}>
                            {item.confidenceLevel}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-slate-800 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-indigo-500 shrink-0" /> {item.recommendation}
                          </div>
                          
                          {/* Collapsible Playbook Tasks */}
                          {item.playbookTasks && item.playbookTasks.length > 0 && (
                            <details className="mt-1.5 text-xs text-slate-500 cursor-pointer group">
                              <summary className="font-semibold hover:text-indigo-600 focus:outline-none flex items-center gap-1 select-none">
                                <CheckSquare className="w-3 h-3 text-slate-400" /> View Playbook Tasks ({item.playbookTasks.length})
                              </summary>
                              <ul className="list-disc pl-4 space-y-1 mt-1 text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded border border-slate-100">
                                {item.playbookTasks.map((t: string, tIdx: number) => (
                                  <li key={tIdx} className="leading-relaxed">{t}</li>
                                ))}
                              </ul>
                            </details>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-500">
                          <div className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                            <span>{item.status}</span>
                          </div>
                          <div className="flex items-center gap-1 mt-1 text-slate-400">
                            <User className="w-3 h-3" />
                            <span>{item.owner}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right whitespace-nowrap text-xs font-bold">
                          <div className="flex gap-2 justify-end">
                            <Link
                              href={`/blog${item.url}`}
                              target="_blank"
                              className="text-indigo-600 hover:text-indigo-900 inline-flex items-center gap-0.5 border border-indigo-200 rounded px-2 py-1 bg-indigo-50/20"
                            >
                              Live <ExternalLink className="w-3 h-3" />
                            </Link>
                          </div>
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
