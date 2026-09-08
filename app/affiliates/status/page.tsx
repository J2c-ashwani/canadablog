import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, Clock3, ExternalLink, ShieldAlert, XCircle } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getAffiliatePortal } from '@/lib/affiliates/store';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Affiliate Status | FSI Digital',
  robots: { index: false, follow: false, nocache: true },
  referrer: 'no-referrer',
};

type PortalCommission = {
  commissionId?: string;
  productId?: string;
  sourceType?: string;
  commissionAmountUSD?: number | string;
  currency?: string;
  status?: string;
  createdAt?: string;
  holdUntil?: string;
};

const offerLabels: Record<string, string> = {
  'match-report': '$19 Funding Match Report',
  toolkit: '$29 Funding Application Toolkit',
  'action-plan': '$49 Funding Action Plan',
  blueprint: '$79 Complete Funding Blueprint',
  membership: '$29/month Funding Watch',
};

function amount(value: unknown, currency = 'USD') {
  const parsed = Number(value || 0);
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(Number.isFinite(parsed) ? parsed : 0);
}

function statusIcon(status: string) {
  if (status === 'approved') return <CheckCircle2 className="h-8 w-8 text-emerald-600" />;
  if (status === 'rejected' || status === 'suspended') return <XCircle className="h-8 w-8 text-red-600" />;
  return <Clock3 className="h-8 w-8 text-amber-600" />;
}

export default async function AffiliateStatusPage({ searchParams }: { searchParams: Promise<{ token?: string | string[] }> }) {
  const resolved = await searchParams;
  const token = Array.isArray(resolved.token) ? resolved.token[0] : resolved.token;
  const portal = token ? await getAffiliatePortal(token).catch(() => null) : null;

  if (!portal) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto max-w-2xl px-4 py-20 sm:px-6">
          <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <ShieldAlert className="mx-auto h-10 w-10 text-amber-600" />
            <h1 className="mt-4 text-3xl font-bold text-gray-950">Private status link required</h1>
            <p className="mt-3 text-gray-600">This link is missing, invalid, or no longer active. For privacy, application details cannot be retrieved without the original token.</p>
            <Link href="/affiliates" className="mt-6 inline-block font-semibold text-emerald-700 hover:underline">Return to the affiliate program</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const partner = portal.partner;
  const metrics = portal.metrics || {};
  const commissions = (portal.commissions || []) as PortalCommission[];
  const links = portal.links || [];
  const status = String(partner.status || 'pending').toLowerCase();
  const approved = status === 'approved';

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-start gap-4">
            {statusIcon(status)}
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-gray-500">Affiliate account</p>
              <h1 className="mt-1 text-3xl font-bold text-gray-950">{partner.name}</h1>
              <p className="mt-2 text-gray-700">
                Status: <strong className="capitalize">{status}</strong>
                {status === 'pending' && ' — your application is awaiting manual review.'}
                {status === 'rejected' && ' — this account is not eligible to earn commission.'}
                {status === 'suspended' && ' — referral attribution is currently disabled.'}
              </p>
            </div>
          </div>
        </div>

        {approved && (
          <>
            <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border border-gray-200 bg-white p-5"><span className="text-sm text-gray-500">Human clicks</span><strong className="mt-1 block text-2xl text-gray-950">{Number(metrics.clicks || 0)}</strong></div>
              <div className="rounded-lg border border-gray-200 bg-white p-5"><span className="text-sm text-gray-500">Verified purchases</span><strong className="mt-1 block text-2xl text-gray-950">{Number(metrics.verifiedPurchases || 0)}</strong></div>
              <div className="rounded-lg border border-gray-200 bg-white p-5"><span className="text-sm text-gray-500">Holding / payable</span><strong className="mt-1 block text-2xl text-gray-950">{amount(metrics.holdingCommission)} / {amount(metrics.payableCommission)}</strong></div>
              <div className="rounded-lg border border-gray-200 bg-white p-5"><span className="text-sm text-gray-500">Paid commission</span><strong className="mt-1 block text-2xl text-emerald-700">{amount(metrics.paidCommission)}</strong></div>
            </section>

            <section className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-950">Your tracked links</h2>
              <p className="mt-2 text-sm text-gray-600">Use these exact links. The most recent eligible affiliate click receives attribution for 30 days.</p>
              <div className="mt-5 grid gap-3">
                {links.map((item) => {
                  const label = offerLabels[item.offerId] || item.productId;
                  return (
                    <div key={item.offerId} className="flex flex-col justify-between gap-3 rounded-lg border border-gray-200 p-4 sm:flex-row sm:items-center">
                      <div><strong className="text-gray-950">{label}</strong><code className="mt-1 block break-all text-xs text-gray-500">{item.url}</code></div>
                      <Link href={item.url} target="_blank" rel="noopener noreferrer" className="inline-flex flex-none items-center gap-1 text-sm font-bold text-emerald-700 hover:underline">Test link <ExternalLink className="h-3.5 w-3.5" /></Link>
                    </div>
                  );
                })}
              </div>
              <div className="mt-5 rounded-md border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
                Every promotion must disclose your commission relationship. FSI Digital is private, not a government agency, and does not guarantee funding or approval.
              </div>
            </section>

            <section className="mt-8 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-200 px-6 py-5"><h2 className="text-xl font-bold text-gray-950">Commission ledger</h2><p className="mt-1 text-sm text-gray-600">Only provider-verified payments appear. Holding is not yet payable; refunds and disputes can reverse commission.</p></div>
              {commissions.length === 0 ? <p className="p-8 text-center text-sm text-gray-500">No verified commission events yet.</p> : (
                <div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="bg-gray-50 text-xs uppercase text-gray-500"><tr><th className="px-6 py-3">Earned</th><th className="px-6 py-3">Source</th><th className="px-6 py-3">Commission</th><th className="px-6 py-3">Status</th><th className="px-6 py-3">Hold until</th></tr></thead><tbody className="divide-y divide-gray-200">{commissions.map((entry) => <tr key={entry.commissionId}><td className="px-6 py-4">{entry.createdAt ? new Date(entry.createdAt).toLocaleDateString('en-CA') : '—'}</td><td className="px-6 py-4">{entry.productId || entry.sourceType || 'Purchase'}</td><td className="px-6 py-4 font-semibold">{amount(entry.commissionAmountUSD, entry.currency || 'USD')}</td><td className="px-6 py-4 capitalize">{String(entry.status || 'holding').replaceAll('_', ' ')}</td><td className="px-6 py-4">{entry.holdUntil ? new Date(entry.holdUntil).toLocaleDateString('en-CA') : '—'}</td></tr>)}</tbody></table></div>
              )}
            </section>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
