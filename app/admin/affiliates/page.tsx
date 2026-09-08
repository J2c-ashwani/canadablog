import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { KeyRound, Lock, Network } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AdminLoginForm } from '@/app/admin/leads/AdminLoginForm';
import { ADMIN_SESSION_COOKIE, isValidAdminSession } from '@/lib/admin/auth';
import { listAffiliateCommissions, listAffiliatePartners } from '@/lib/affiliates/store';
import { AffiliateAdminClient, type AffiliateAdminCommission, type AffiliateAdminPartner } from '@/components/admin/AffiliateAdminClient';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Affiliate Operations | FSI Digital', robots: { index: false, follow: false, nocache: true } };

function LockedState({ hasSecret }: { hasSecret: boolean }) {
  return <div className="min-h-screen bg-gray-50"><Header /><main className="container mx-auto max-w-2xl px-4 py-16 sm:px-6"><div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm"><div className="inline-flex rounded-md bg-amber-50 p-3 text-amber-700">{hasSecret ? <Lock className="h-6 w-6" /> : <KeyRound className="h-6 w-6" />}</div><h1 className="mt-4 text-3xl font-bold text-gray-950">Affiliate Operations Locked</h1><p className="mt-3 text-gray-700">{hasSecret ? 'Enter the private dashboard access code. Affiliate approvals and payout records require an authenticated admin session.' : 'Private dashboard access is not configured.'}</p>{hasSecret && <AdminLoginForm />}</div></main><Footer /></div>;
}

export default async function AffiliateAdminPage() {
  const secret = process.env.LEAD_DASHBOARD_SECRET;
  const session = (await cookies()).get(ADMIN_SESSION_COOKIE)?.value;
  if (!secret || !session || !isValidAdminSession(session, secret)) return <LockedState hasSecret={Boolean(secret)} />;

  const [partnerRecords, commissionRecords] = await Promise.all([listAffiliatePartners(), listAffiliateCommissions()]);
  const partnerById = new Map(partnerRecords.map((partner) => [partner.partnerId, partner]));
  const partners: AffiliateAdminPartner[] = partnerRecords.map((partner) => ({
    partnerId: String(partner.partnerId || ''), name: String(partner.name || ''), email: String(partner.email || ''), payoutEmail: String(partner.payoutEmail || ''), company: String(partner.company || ''), website: String(partner.website || ''), country: String(partner.country || ''), audienceType: String(partner.audienceType || ''), audienceSize: String(partner.audienceSize || ''), promotionPlan: String(partner.promotionPlan || ''), status: String(partner.status || 'pending').toLowerCase(), referralCode: String(partner.referralCode || ''), appliedAt: String(partner.appliedAt || ''), reviewedAt: String(partner.reviewedAt || ''), termsVersion: String(partner.termsVersion || ''),
  }));
  const commissions: AffiliateAdminCommission[] = commissionRecords.map((commission) => {
    const partner = partnerById.get(commission.partnerId);
    return { commissionId: String(commission.commissionId || ''), partnerId: String(commission.partnerId || ''), partnerName: String(partner?.name || ''), payoutEmail: String(partner?.payoutEmail || ''), sourceType: String(commission.sourceType || ''), sourceId: String(commission.sourceId || ''), productId: String(commission.productId || ''), grossAmount: Number(commission.grossAmountUSD || 0), commissionAmount: Number(commission.commissionAmountUSD || 0), currency: String(commission.currency || 'USD'), status: String(commission.status || 'holding').toLowerCase(), earnedAt: String(commission.createdAt || ''), holdUntil: String(commission.holdUntil || ''), payoutReference: String(commission.payoutReference || '') };
  });

  const pending = partners.filter((partner) => partner.status === 'pending').length;
  const holding = commissions.filter((commission) => commission.status === 'holding').reduce((sum, commission) => sum + commission.commissionAmount, 0);
  const payable = commissions.filter((commission) => commission.status === 'payable').reduce((sum, commission) => sum + commission.commissionAmount, 0);
  const clawback = commissions.filter((commission) => commission.status === 'clawback_due').reduce((sum, commission) => sum + commission.commissionAmount, 0);

  return <div className="min-h-screen bg-gray-50"><Header /><main className="container mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"><div className="mb-8"><h1 className="flex items-center gap-3 text-3xl font-bold text-gray-950"><Network className="h-8 w-8 text-emerald-600" /> Affiliate Operations</h1><p className="mt-2 text-gray-600">Manual application review, provider-verified commission controls, and auditable payout recording.</p></div><div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><div className="rounded-lg border border-gray-200 bg-white p-5"><span className="text-sm text-gray-500">Pending applications</span><strong className="mt-1 block text-2xl">{pending}</strong></div><div className="rounded-lg border border-gray-200 bg-white p-5"><span className="text-sm text-gray-500">Commission on hold</span><strong className="mt-1 block text-2xl">${holding.toFixed(2)}</strong></div><div className="rounded-lg border border-gray-200 bg-white p-5"><span className="text-sm text-gray-500">Approved payable</span><strong className="mt-1 block text-2xl text-emerald-700">${payable.toFixed(2)}</strong></div><div className="rounded-lg border border-red-200 bg-red-50 p-5"><span className="text-sm text-red-700">Clawback due</span><strong className="mt-1 block text-2xl text-red-800">${clawback.toFixed(2)}</strong></div></div><AffiliateAdminClient partners={partners} commissions={commissions} /></main><Footer /></div>;
}
