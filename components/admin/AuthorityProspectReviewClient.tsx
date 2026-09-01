'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, ExternalLink, Loader2, ShieldX } from 'lucide-react';

export type ReviewableAuthorityProspect = {
  prospectId: string;
  prospectName: string;
  website: string;
  email: string;
  sourceUrl: string;
  personalizedHook: string;
};

export function AuthorityProspectReviewClient({ prospects }: { prospects: ReviewableAuthorityProspect[] }) {
  const router = useRouter();
  const [remaining, setRemaining] = useState(prospects);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const review = async (prospect: ReviewableAuthorityProspect, action: 'approve' | 'reject') => {
    const message = action === 'approve'
      ? `Approve ${prospect.email} for the next capped Authority Engine run? This does not send now. Only this source-reviewed record will be eligible.`
      : `Reject ${prospect.email}? It will not be eligible for outreach.`;
    if (!window.confirm(message)) return;

    setError(null);
    setPendingId(prospect.prospectId);
    try {
      const response = await fetch('/api/admin/authority/prospects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prospectId: prospect.prospectId, action }),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(body.error || 'Could not update this prospect.');
      setRemaining((current) => current.filter((item) => item.prospectId !== prospect.prospectId));
      router.refresh();
    } catch (caught: any) {
      setError(caught?.message || 'Could not update this prospect.');
    } finally {
      setPendingId(null);
    }
  };

  if (remaining.length === 0) {
    return (
      <div className="p-10 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-500" />
        <h3 className="mt-2 text-sm font-semibold text-gray-900">No source-backed prospects awaiting review</h3>
        <p className="mt-1 text-sm text-gray-500">New discovery records will appear here before they can become eligible for outreach.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      {error && <div className="m-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
      <table className="w-full text-left text-sm text-gray-600">
        <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500 border-b border-gray-200">
          <tr>
            <th className="px-6 py-4 font-medium">Candidate</th>
            <th className="px-6 py-4 font-medium">Public source</th>
            <th className="px-6 py-4 font-medium">Published contact</th>
            <th className="px-6 py-4 font-medium">Evidence</th>
            <th className="px-6 py-4 font-medium text-right">Decision</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {remaining.map((prospect) => {
            const pending = pendingId === prospect.prospectId;
            return (
              <tr key={prospect.prospectId} className="align-top hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="font-semibold text-gray-900">{prospect.prospectName || prospect.website}</div>
                  <div className="mt-1 text-xs text-gray-500">{prospect.website}</div>
                </td>
                <td className="px-6 py-4">
                  <a href={prospect.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-indigo-700 hover:underline">
                    Inspect page <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </td>
                <td className="px-6 py-4 font-mono text-xs text-gray-800">{prospect.email}</td>
                <td className="max-w-sm px-6 py-4 text-xs leading-5 text-gray-600">{prospect.personalizedHook}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => review(prospect, 'reject')}
                      disabled={pendingId !== null}
                      className="inline-flex items-center gap-1 rounded border border-gray-300 px-3 py-2 text-xs font-bold text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                    >
                      {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ShieldX className="h-3.5 w-3.5" />}
                      Reject
                    </button>
                    <button
                      onClick={() => review(prospect, 'approve')}
                      disabled={pendingId !== null}
                      className="inline-flex items-center gap-1 rounded bg-emerald-600 px-3 py-2 text-xs font-bold text-white hover:bg-emerald-700 disabled:opacity-50"
                    >
                      {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <CheckCircle2 className="h-3.5 w-3.5" />}
                      Queue after review
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
