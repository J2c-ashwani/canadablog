'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, ExternalLink, Loader2, RefreshCw, ShieldX, Undo2, WalletCards } from 'lucide-react';

export type AffiliateAdminPartner = {
  partnerId: string;
  name: string;
  email: string;
  payoutEmail: string;
  company: string;
  website: string;
  country: string;
  audienceType: string;
  audienceSize: string;
  promotionPlan: string;
  status: string;
  referralCode: string;
  appliedAt: string;
  reviewedAt: string;
  termsVersion: string;
};

export type AffiliateAdminCommission = {
  commissionId: string;
  partnerId: string;
  partnerName: string;
  payoutEmail: string;
  sourceType: string;
  sourceId: string;
  productId: string;
  grossAmount: number;
  commissionAmount: number;
  currency: string;
  status: string;
  earnedAt: string;
  holdUntil: string;
  payoutReference: string;
};

function money(value: number, currency: string) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency || 'USD' }).format(Number(value || 0));
}

export function AffiliateAdminClient({ partners, commissions }: { partners: AffiliateAdminPartner[]; commissions: AffiliateAdminCommission[] }) {
  const router = useRouter();
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [payoutReferences, setPayoutReferences] = useState<Record<string, string>>({});
  const [reversalReasons, setReversalReasons] = useState<Record<string, string>>({});

  const act = async (url: string, payload: Record<string, string>, confirmation: string) => {
    if (!window.confirm(confirmation)) return;
    setPendingId(payload.partnerId || payload.commissionId || 'action');
    setError('');
    setNotice('');
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(body.error || 'The decision could not be saved.');
      setNotice(body.message || 'Decision saved.');
      router.refresh();
    } catch (caught: any) {
      setError(caught?.message || 'The decision could not be saved.');
    } finally {
      setPendingId(null);
    }
  };

  const reviewPartner = (partner: AffiliateAdminPartner, action: 'approve' | 'reject') => act(
    '/api/admin/affiliates/partners',
    { partnerId: partner.partnerId, action },
    action === 'approve'
      ? `Approve ${partner.email}? Their referral links will become eligible and a decision email will be sent. No payout is sent.`
      : `Reject ${partner.email}? Their referral links will remain ineligible and a decision email will be sent.`,
  );

  const reviewCommission = (commission: AffiliateAdminCommission, action: 'approve_payable' | 'reverse' | 'mark_paid') => {
    const payoutReference = (payoutReferences[commission.commissionId] || '').trim();
    const reversalReason = (reversalReasons[commission.commissionId] || '').trim();
    if (action === 'mark_paid' && !payoutReference) {
      setError('Enter the PayPal transaction or payout reference before marking a commission paid.');
      return;
    }
    if (action === 'reverse' && reversalReason.length < 8) {
      setError('Record the refund, dispute, duplicate, or policy evidence before reversing a commission.');
      return;
    }
    const confirmation = action === 'approve_payable'
      ? `Confirm the ${money(commission.commissionAmount, commission.currency)} commission passed the hold and source-payment checks? This records it as payable but sends no money.`
      : action === 'reverse'
        ? `Reverse this commission? Use this only for a refund, dispute, duplicate, invalid attribution, or terms violation supported by evidence.`
        : `Confirm you already sent ${money(commission.commissionAmount, commission.currency)} to ${commission.payoutEmail} through PayPal under reference ${payoutReference}? This action does not transfer money.`;
    return act('/api/admin/affiliates/commissions', {
      commissionId: commission.commissionId,
      action,
      ...(payoutReference ? { payoutReference } : {}),
      ...(reversalReason ? { reason: reversalReason } : {}),
    }, confirmation);
  };

  const pendingPartners = partners.filter((partner) => partner.status === 'pending');

  return (
    <div className="space-y-8">
      {(error || notice) && <div className={`rounded-lg border px-4 py-3 text-sm font-semibold ${error ? 'border-red-200 bg-red-50 text-red-800' : 'border-emerald-200 bg-emerald-50 text-emerald-800'}`}>{error || notice}</div>}
      <div className="flex justify-end">
        <button disabled={pendingId !== null} onClick={() => act('/api/admin/affiliates/reconcile', {}, 'Reconcile provider-verified payment ledgers with affiliate commissions now? This does not send payouts.')} className="inline-flex items-center gap-2 rounded border border-gray-300 bg-white px-4 py-2 text-sm font-bold text-gray-800 hover:bg-gray-50 disabled:opacity-50">
          {pendingId === 'action' ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />} Reconcile verified payments
        </button>
      </div>

      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-5">
          <h2 className="text-xl font-bold text-gray-950">Applications awaiting review</h2>
          <p className="mt-1 text-sm text-gray-600">Inspect the public audience evidence and promotion plan. Approval enables attribution; it does not send outreach or money.</p>
        </div>
        {pendingPartners.length === 0 ? <div className="p-10 text-center text-sm text-gray-500">No pending applications.</div> : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-500"><tr><th className="px-6 py-3">Applicant</th><th className="px-6 py-3">Audience</th><th className="px-6 py-3">Promotion plan</th><th className="px-6 py-3 text-right">Decision</th></tr></thead>
              <tbody className="divide-y divide-gray-200">
                {pendingPartners.map((partner) => <tr key={partner.partnerId} className="align-top">
                  <td className="px-6 py-4"><strong className="text-gray-950">{partner.name}</strong><span className="mt-1 block text-xs text-gray-600">{partner.email}</span><span className="block text-xs text-gray-600">PayPal: {partner.payoutEmail}</span>{partner.website && <a href={partner.website} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:underline">Public evidence <ExternalLink className="h-3 w-3" /></a>}</td>
                  <td className="px-6 py-4 text-xs leading-5 text-gray-700"><strong className="capitalize">{partner.audienceType.replaceAll('-', ' ')}</strong><br />{partner.audienceSize}<br />{partner.country}<br />Applied {partner.appliedAt ? new Date(partner.appliedAt).toLocaleDateString('en-CA') : '—'}</td>
                  <td className="max-w-md whitespace-pre-wrap px-6 py-4 text-xs leading-5 text-gray-700">{partner.promotionPlan}</td>
                  <td className="px-6 py-4"><div className="flex justify-end gap-2"><button disabled={pendingId !== null} onClick={() => reviewPartner(partner, 'reject')} className="inline-flex items-center gap-1 rounded border border-gray-300 px-3 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 disabled:opacity-50"><ShieldX className="h-4 w-4" /> Reject</button><button disabled={pendingId !== null} onClick={() => reviewPartner(partner, 'approve')} className="inline-flex items-center gap-1 rounded bg-emerald-600 px-3 py-2 text-xs font-bold text-white hover:bg-emerald-700 disabled:opacity-50">{pendingId === partner.partnerId ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />} Approve</button></div></td>
                </tr>)}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-5">
          <h2 className="text-xl font-bold text-gray-950">Commission review and payout ledger</h2>
          <p className="mt-1 text-sm text-gray-600">Approve only after the 30-day hold and provider checks. Mark paid only after completing the PayPal transfer yourself.</p>
        </div>
        {commissions.length === 0 ? <div className="p-10 text-center text-sm text-gray-500">No commission records.</div> : (
          <div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-500"><tr><th className="px-6 py-3">Partner / source</th><th className="px-6 py-3">Economics</th><th className="px-6 py-3">Status</th><th className="px-6 py-3">Controlled action</th></tr></thead><tbody className="divide-y divide-gray-200">{commissions.map((commission) => {
            const isPending = pendingId === commission.commissionId;
            return <tr key={commission.commissionId} className="align-top">
              <td className="px-6 py-4"><strong className="text-gray-950">{commission.partnerName || commission.partnerId}</strong><span className="mt-1 block text-xs text-gray-600">{commission.payoutEmail}</span><code className="mt-1 block max-w-xs break-all text-[11px] text-gray-500">{commission.productId || commission.sourceType} · {commission.sourceId}</code></td>
              <td className="px-6 py-4"><strong>{money(commission.commissionAmount, commission.currency)}</strong><span className="block text-xs text-gray-500">from {money(commission.grossAmount, commission.currency)}</span><span className="mt-1 block text-xs text-gray-500">Hold until {commission.holdUntil ? new Date(commission.holdUntil).toLocaleDateString('en-CA') : '—'}</span></td>
              <td className="px-6 py-4 capitalize">{commission.status.replaceAll('_', ' ')}{commission.payoutReference && <code className="mt-1 block max-w-[180px] break-all text-[11px] text-gray-500">{commission.payoutReference}</code>}</td>
              <td className="min-w-[280px] px-6 py-4">
                {['holding', 'payable'].includes(commission.status) && <input value={reversalReasons[commission.commissionId] || ''} onChange={(event) => setReversalReasons((current) => ({ ...current, [commission.commissionId]: event.target.value }))} placeholder="Reversal evidence (required only to reverse)" className="mb-2 w-full rounded border border-gray-300 px-3 py-2 text-xs" maxLength={500} />}
                {commission.status === 'holding' && <div className="flex gap-2"><button disabled={pendingId !== null} onClick={() => reviewCommission(commission, 'reverse')} className="inline-flex items-center gap-1 rounded border border-gray-300 px-3 py-2 text-xs font-bold text-gray-700 disabled:opacity-50"><Undo2 className="h-3.5 w-3.5" /> Reverse</button><button disabled={pendingId !== null} onClick={() => reviewCommission(commission, 'approve_payable')} className="inline-flex items-center gap-1 rounded bg-emerald-600 px-3 py-2 text-xs font-bold text-white disabled:opacity-50">{isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <CheckCircle2 className="h-3.5 w-3.5" />} Approve payable</button></div>}
                {commission.status === 'payable' && <div><input value={payoutReferences[commission.commissionId] || ''} onChange={(event) => setPayoutReferences((current) => ({ ...current, [commission.commissionId]: event.target.value }))} placeholder="PayPal transaction / payout reference" className="w-full rounded border border-gray-300 px-3 py-2 text-xs" maxLength={200} /><div className="mt-2 flex gap-2"><button disabled={pendingId !== null} onClick={() => reviewCommission(commission, 'reverse')} className="inline-flex items-center gap-1 rounded border border-gray-300 px-3 py-2 text-xs font-bold text-gray-700 disabled:opacity-50"><Undo2 className="h-3.5 w-3.5" /> Reverse</button><button disabled={pendingId !== null} onClick={() => reviewCommission(commission, 'mark_paid')} className="inline-flex items-center gap-1 rounded bg-gray-950 px-3 py-2 text-xs font-bold text-white disabled:opacity-50">{isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <WalletCards className="h-3.5 w-3.5" />} Mark paid</button></div></div>}
                {['paid', 'reversed', 'clawback_due'].includes(commission.status) && <span className="text-xs text-gray-500">Final ledger state; no action available.</span>}
              </td>
            </tr>;
          })}</tbody></table></div>
        )}
      </section>

      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-5"><h2 className="text-xl font-bold text-gray-950">All affiliate accounts</h2></div>
        <div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-500"><tr><th className="px-6 py-3">Partner</th><th className="px-6 py-3">Status</th><th className="px-6 py-3">Referral code</th><th className="px-6 py-3">Terms</th></tr></thead><tbody className="divide-y divide-gray-200">{partners.map((partner) => <tr key={partner.partnerId}><td className="px-6 py-4"><strong>{partner.name}</strong><span className="block text-xs text-gray-500">{partner.email}</span></td><td className="px-6 py-4 capitalize">{partner.status}</td><td className="px-6 py-4 font-mono text-xs">{partner.referralCode || 'Not assigned'}</td><td className="px-6 py-4 text-xs">{partner.termsVersion || '—'}</td></tr>)}</tbody></table></div>
      </section>
    </div>
  );
}
