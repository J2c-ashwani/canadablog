import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getLeadsFromSheet, type SheetLead } from '@/lib/google-sheets';
import { ADMIN_SESSION_COOKIE, isValidAdminKey, isValidAdminSession } from '@/lib/admin/auth';
import { AdminLoginForm } from './AdminLoginForm';
import { AdminLogoutButton } from './AdminLogoutButton';
import { AdminLeadActions } from './AdminLeadActions';
import { BarChart3, Building2, CheckCircle, KeyRound, Lock, Mail, Phone, Users } from 'lucide-react';


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
          <div className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-600 shadow-sm">
            Latest {formatNumber(leads.length)} leads loaded from Google Sheets
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
              <StatCard label="Qualified non-newsletter leads" value={formatNumber(qualifiedLeads.length)} detail={`${qualifiedLeads.length ? Math.round((qualifiedLeads.length / leads.length) * 100) : 0}% of loaded leads`} icon={CheckCircle} />
              <StatCard label="Partner-consent leads" value={formatNumber(partnerConsentLeads.length)} detail="Can be routed to selected partners" icon={Building2} />
              <StatCard label="Phone-available leads" value={formatNumber(phoneLeads.length)} detail="Higher resale and booking value" icon={Phone} />
            </div>

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
