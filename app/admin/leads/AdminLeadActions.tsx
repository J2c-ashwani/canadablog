'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, CheckCircle2, UserCheck, Send, FileCheck } from 'lucide-react';

type AdminLeadActionsProps = {
  rowIndex: number;
  email: string;
  currentStatus: string;
  gaClientId?: string;
  actualSignedValue?: string;
};

export function AdminLeadActions({ rowIndex, email, currentStatus, gaClientId, actualSignedValue }: AdminLeadActionsProps) {
  const router = useRouter();
  const [loadingStatus, setLoadingStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isEnteringValue, setIsEnteringValue] = useState(false);
  const [signedValue, setSignedValue] = useState('');

  const handleUpdateStatus = async (newStatus: string, valueStr?: string) => {
    setLoadingStatus(newStatus);
    setError(null);

    try {
      const response = await fetch('/api/admin/update-lead-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rowIndex,
          email,
          status: newStatus,
          gaClientId: gaClientId || '',
          actualSignedValue: valueStr || '',
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to update status.');
      }

      // Refresh the current route to fetch the new sheet data
      router.refresh();
    } catch (err: any) {
      console.error('Failed to update lead status:', err);
      setError(err.message || 'Error occurred.');
    } finally {
      setLoadingStatus(null);
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Filing Client Signed':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Proposal Sent':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'Audit Attended':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const isStatusLoading = (status: string) => loadingStatus === status;

  const displayStatus = currentStatus === 'Filing Client Signed' && actualSignedValue && actualSignedValue !== 'N/A'
    ? `Signed ($${actualSignedValue})`
    : currentStatus;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${getStatusBadgeClass(currentStatus)}`}>
          {displayStatus}
        </span>
        {gaClientId && gaClientId !== 'N/A' && (
          <span className="text-[10px] text-gray-400 font-mono" title={`GA Client ID: ${gaClientId}`}>
            ⚡ tracked
          </span>
        )}
      </div>

      {error && <div className="text-[10px] font-semibold text-red-600">{error}</div>}

      <div className="flex flex-wrap gap-1.5 mt-1">
        {currentStatus === 'Lead' && (
          <button
            onClick={() => handleUpdateStatus('Audit Attended')}
            disabled={loadingStatus !== null}
            className="inline-flex items-center gap-1 rounded bg-blue-50 border border-blue-200 px-2 py-1 text-xs font-bold text-blue-700 hover:bg-blue-100 disabled:opacity-50"
          >
            {isStatusLoading('Audit Attended') ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <UserCheck className="h-3 w-3" />
            )}
            Attended Audit
          </button>
        )}

        {(currentStatus === 'Lead' || currentStatus === 'Audit Attended') && (
          <button
            onClick={() => handleUpdateStatus('Proposal Sent')}
            disabled={loadingStatus !== null}
            className="inline-flex items-center gap-1 rounded bg-indigo-50 border border-indigo-200 px-2 py-1 text-xs font-bold text-indigo-700 hover:bg-indigo-100 disabled:opacity-50"
          >
            {isStatusLoading('Proposal Sent') ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <Send className="h-3 w-3" />
            )}
            Send Proposal
          </button>
        )}

        {currentStatus !== 'Filing Client Signed' && (
          <>
            {isEnteringValue ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setIsEnteringValue(false);
                  handleUpdateStatus('Filing Client Signed', signedValue);
                }}
                className="flex items-center gap-1 mt-1 animate-in fade-in duration-200"
              >
                <input
                  type="text"
                  required
                  placeholder="e.g. 5000"
                  value={signedValue}
                  onChange={(e) => setSignedValue(e.target.value)}
                  className="w-20 rounded border border-gray-300 px-1.5 py-0.5 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-800"
                />
                <button
                  type="submit"
                  disabled={loadingStatus !== null}
                  className="rounded bg-emerald-600 px-2 py-0.5 text-xs font-bold text-white hover:bg-emerald-700"
                >
                  Confirm
                </button>
                <button
                  type="button"
                  onClick={() => setIsEnteringValue(false)}
                  className="text-xs text-gray-500 hover:text-gray-900 px-1"
                >
                  Cancel
                </button>
              </form>
            ) : (
              <button
                onClick={() => setIsEnteringValue(true)}
                disabled={loadingStatus !== null}
                className="inline-flex items-center gap-1 rounded bg-emerald-600 border border-emerald-700 px-2 py-1 text-xs font-bold text-white hover:bg-emerald-700 disabled:opacity-50"
              >
                {isStatusLoading('Filing Client Signed') ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <FileCheck className="h-3 w-3" />
                )}
                Sign Client
              </button>
            )}
          </>
        )}

        {currentStatus === 'Filing Client Signed' && (
          <span className="inline-flex items-center gap-1 text-xs text-emerald-700 font-bold">
            <CheckCircle2 className="h-4 w-4" /> Fully Won
          </span>
        )}
      </div>
    </div>
  );
}

