'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  CheckCircle2,
  Edit3,
  Loader2,
  AlertCircle,
  FileText,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface DraftReviewProps {
  orderId: string;
  token: string;
  companyName: string;
  draftTitle?: string;
  draftContent?: string;
  currentStatus: string;
  revisionNotes?: string;
}

export function DraftReviewClient({
  orderId,
  token,
  companyName,
  draftTitle,
  draftContent,
  currentStatus,
  revisionNotes: initialRevisionNotes,
}: DraftReviewProps) {
  const router = useRouter();

  const [mode, setMode] = useState<'view' | 'revise'>('view');
  const [revisionNotes, setRevisionNotes] = useState(initialRevisionNotes || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const handleApprove = async () => {
    if (!confirm('Approve this draft and submit to the FSI Digital Editorial Release Queue? Our editorial desk will perform final link qualification and destination checks before authorizing live publication.')) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/advertise/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          token,
          action: 'approve',
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to approve draft.');
      }

      setStatusMessage('Draft approved! Submitted to Editorial Release Queue.');
      router.push(`/advertise/order/${orderId}/status?token=${encodeURIComponent(token)}`);
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'An error occurred.');
      setIsSubmitting(false);
    }
  };

  const handleRequestRevision = async () => {
    if (!revisionNotes.trim()) {
      setErrorMessage('Please enter your revision notes before submitting.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/advertise/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          token,
          action: 'request_revision',
          revisionNotes: revisionNotes.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit revision request.');
      }

      setStatusMessage('Revision notes received. Our editorial team has been notified.');
      router.push(`/advertise/order/${orderId}/status?token=${encodeURIComponent(token)}`);
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'An error occurred.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {errorMessage && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs sm:text-sm text-rose-800 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
          <div>{errorMessage}</div>
        </div>
      )}

      {statusMessage && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs sm:text-sm text-emerald-800 flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>{statusMessage}</div>
        </div>
      )}

      {/* Review Actions Banner */}
      <div className="rounded-2xl border border-indigo-200 bg-gradient-to-r from-indigo-50/80 via-white to-blue-50/80 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
            Action Required
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            Review Your Article Draft
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Read the full draft below. 1 structured revision round is included in your package.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => setMode(mode === 'revise' ? 'view' : 'revise')}
            className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <Edit3 className="mr-2 h-4 w-4 text-slate-600" />
            {mode === 'revise' ? 'Cancel Revisions' : 'Request Revisions'}
          </button>

          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleApprove}
            className="inline-flex items-center rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-emerald-500 shadow-md transition-colors"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting to Release Queue...
              </>
            ) : (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Approve &amp; Send to Release Queue
              </>
            )}
          </button>
        </div>
      </div>

      {/* Revision Form (if opened) */}
      {mode === 'revise' && (
        <div className="rounded-2xl border-2 border-amber-300 bg-amber-50/50 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-amber-900">
            <Edit3 className="h-4 w-4 text-amber-700" />
            <span>Submit Editorial Revision Notes (1 Round Included)</span>
          </div>
          <p className="text-xs text-amber-800 leading-relaxed">
            Please list all requested factual updates, phrasing adjustments, or anchor text edits in one consolidated message. Our editors will update your draft within 1 to 2 business days.
          </p>
          <textarea
            rows={5}
            required
            placeholder="e.g. Please update paragraph 3 to mention our newest Series A milestone ($4.2M led by VentureFund). Also adjust the secondary link anchor text to 'read the enterprise case study'."
            value={revisionNotes}
            onChange={(e) => setRevisionNotes(e.target.value)}
            className="w-full rounded-lg border border-amber-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
          />
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setMode('view')}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleRequestRevision}
              className="inline-flex items-center rounded-lg bg-indigo-600 px-5 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-indigo-500 transition-colors shadow-sm"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting Notes...
                </>
              ) : (
                <>
                  Submit Revision Notes
                  <ArrowRight className="ml-2 h-3.5 w-3.5" />
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Draft Content Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-12 shadow-sm">
        {/* Article Header */}
        <div className="border-b border-slate-200 pb-8 mb-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 mb-4">
            <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
            Sponsored Article Preview • rel=&quot;sponsored&quot;
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {draftTitle || 'Article Title Pending'}
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-slate-500">
            Client: {companyName} • Prepared by FSI Digital Editorial Desk
          </p>
        </div>

        {/* Article Body */}
        {draftContent ? (
          <div
            className="prose prose-slate max-w-none text-slate-800 leading-relaxed text-sm sm:text-base space-y-4"
            dangerouslySetInnerHTML={{ __html: draftContent }}
          />
        ) : (
          <div className="py-12 text-center text-slate-400">
            <FileText className="mx-auto h-12 w-12 text-slate-300 mb-3" />
            <p className="text-sm">The editorial desk has not yet uploaded the draft copy.</p>
          </div>
        )}
      </div>
    </div>
  );
}
