import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ADMIN_SESSION_COOKIE, isValidAdminKey, isValidAdminSession } from '@/lib/admin/auth';
import { getAuthorityExceptions, getOutreachProspectsFromSheet } from '@/lib/google-sheets';
import { AuthorityEngine } from '@/lib/growth-os/authority/authority-engine';
import { Shield, Mail, Link as LinkIcon, AlertTriangle, CheckCircle, XCircle, Clock, Activity, Zap, KeyRound, Lock } from 'lucide-react';
import { AdminLoginForm } from '../leads/AdminLoginForm';
import { AuthorityProspectReviewClient } from '@/components/admin/AuthorityProspectReviewClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Authority Engine | FSI Digital',
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
          <h1 className="text-3xl font-bold text-gray-950">Authority Engine Locked</h1>
          <p className="mt-3 text-gray-700">
            {hasSecret
              ? 'Enter your private access code to view the Authority Engine dashboard.'
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

export default async function AuthorityDashboardPage({
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

  // Fetch data
  let engineStatus: any = {};
  let exceptions: any[] = [];
  let prospects: any[] = [];

  try {
    engineStatus = await AuthorityEngine.getEngineStatus();
    exceptions = await getAuthorityExceptions();
    prospects = await getOutreachProspectsFromSheet();
  } catch (error) {
    console.error("Error fetching Authority Engine data:", error);
  }

  const pendingExceptions = exceptions.filter((e) => e.status === 'pending');
  
  // Stats calculations
  const totalProspects = prospects.length;
  const sentCount = prospects.filter((p) => Boolean(p.providerMessageId)).length;
  const replyCount = prospects.filter((p) => p.replied || Boolean(p.repliedAt)).length;
  const backlinkCount = prospects.filter((p) => p.backlinkEarned).length;
  const pendingProspectsCount = prospects.filter((p) => ['pending', 'qualified', 'review_required'].includes(String(p.status || '').toLowerCase())).length;
  const reviewProspects = prospects
    .filter((p) => String(p.status || '').trim().toLowerCase() === 'review_required')
    .filter((p) => p.prospectId && p.sourceUrl && p.email)
    .map((p) => ({
      prospectId: p.prospectId || '',
      prospectName: p.prospectName || p.name || '',
      website: p.website || '',
      email: p.email || '',
      sourceUrl: p.sourceUrl || '',
      personalizedHook: p.personalizedHook || '',
    }));

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Zap className="h-8 w-8 text-indigo-600" />
              Authority Engine
            </h1>
            <p className="text-gray-500 mt-1">Controlled authority outreach with provider-receipt evidence</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Pipeline Status */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Activity className="h-5 w-5 text-gray-400" />
              Engine Status
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">System Mode</span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                  Controlled
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Kill Switch</span>
                {engineStatus.killSwitch !== 'active' ? (
                  <span className="inline-flex items-center text-xs font-medium text-red-600"><XCircle className="w-4 h-4 mr-1"/> Engaged</span>
                ) : (
                  <span className="inline-flex items-center text-xs font-medium text-green-600"><CheckCircle className="w-4 h-4 mr-1"/> Safe</span>
                )}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Daily Volume</span>
                <span className="text-sm font-medium text-gray-900">{engineStatus.dailySentCount || 0} / {engineStatus.effectiveDailyCap || 5}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Warm-up Week</span>
                <span className="text-sm font-medium text-gray-900">{engineStatus.warmUpWeek ? `Week ${engineStatus.warmUpWeek}` : 'Controlled cap'}</span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:col-span-2">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Activity className="h-5 w-5 text-gray-400" />
              Outreach Performance
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 text-gray-500 mb-1">
                  <Mail className="h-4 w-4" />
                  <span className="text-xs font-medium uppercase tracking-wider">Provider accepted</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">{sentCount}</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 text-gray-500 mb-1">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-xs font-medium uppercase tracking-wider">Replies</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">{replyCount}</div>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <div className="flex items-center gap-2 text-indigo-600 mb-1">
                  <LinkIcon className="h-4 w-4" />
                  <span className="text-xs font-medium uppercase tracking-wider">Backlinks</span>
                </div>
                <div className="text-2xl font-bold text-indigo-700">{backlinkCount}</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 text-gray-500 mb-1">
                  <Clock className="h-4 w-4" />
                  <span className="text-xs font-medium uppercase tracking-wider">Pending</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">{pendingProspectsCount}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 bg-emerald-50/50 px-6 py-5">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
              <CheckCircle className="h-5 w-5 text-emerald-600" />
              Source-backed prospect review
              {reviewProspects.length > 0 && (
                <span className="ml-2 inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
                  {reviewProspects.length} awaiting a decision
                </span>
              )}
            </h2>
            <p className="mt-1 text-sm text-gray-600">Open the exact public source, verify the published same-site contact and relevance, then explicitly queue or reject it. Queuing never sends a message immediately.</p>
          </div>
          <AuthorityProspectReviewClient prospects={reviewProspects} />
        </div>

        {/* Exception Queue */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="border-b border-gray-200 px-6 py-5 flex items-center justify-between bg-gray-50/50">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Shield className="h-5 w-5 text-amber-500" />
              Exception Queue
              {pendingExceptions.length > 0 && (
                <span className="ml-2 inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                  {pendingExceptions.length} Action Required
                </span>
              )}
            </h2>
          </div>
          
          {pendingExceptions.length === 0 ? (
            <div className="p-12 text-center">
              <CheckCircle className="mx-auto h-12 w-12 text-green-400" />
              <h3 className="mt-2 text-sm font-semibold text-gray-900">Queue is clear</h3>
              <p className="mt-1 text-sm text-gray-500">No pending exceptions require human review.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 font-medium">Prospect</th>
                    <th className="px-6 py-4 font-medium">Website</th>
                    <th className="px-6 py-4 font-medium">Issue</th>
                    <th className="px-6 py-4 font-medium">Date</th>
                    <th className="px-6 py-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {pendingExceptions.map((ex, i) => (
                    <tr key={ex.id || i} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                        {ex.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <a href={ex.website} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                          {ex.website}
                        </a>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 rounded bg-red-50 px-2 py-1 text-xs font-medium text-red-700">
                          <AlertTriangle className="h-3.5 w-3.5" />
                          {ex.failedChecks || ex.reason || 'Flagged by AI'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {ex.createdAt ? new Date(ex.createdAt).toLocaleDateString() : 'Unknown'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button className="text-xs font-medium text-indigo-600 hover:text-indigo-900 bg-indigo-50 px-3 py-1.5 rounded hover:bg-indigo-100 transition-colors">
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
