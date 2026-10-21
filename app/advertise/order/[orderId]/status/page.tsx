import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getPublishingOrder } from "@/lib/advertising/store";
import { verifyOrderAccessToken, OrderStatus } from "@/lib/advertising/config";
import {
  CheckCircle2,
  Clock,
  FileText,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  ShieldAlert,
  Sparkles,
  HelpCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Order Production Status | FSI Digital Publishing",
  robots: { index: false, follow: false },
};

const STAGES = [
  { id: 'paid', label: 'Payment Confirmed' },
  { id: 'brief_submitted', label: 'Brief Received' },
  { id: 'in_production', label: 'In Production' },
  { id: 'draft_ready', label: 'Draft Ready' },
  { id: 'published', label: 'Published & Live' },
];

function getStageIndex(status: OrderStatus): number {
  switch (status) {
    case 'paid':
      return 0;
    case 'brief_submitted':
      return 1;
    case 'in_production':
      return 2;
    case 'draft_ready':
    case 'revision_requested':
    case 'approved':
      return 3;
    case 'published':
      return 4;
    default:
      return 0;
  }
}

export default async function OrderStatusPage({
  params,
  searchParams,
}: {
  params: Promise<{ orderId: string }>;
  searchParams: Promise<{ token?: string }>;
}) {
  const { orderId } = await params;
  const { token } = await searchParams;

  const order = await getPublishingOrder(orderId);

  if (!order) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
        <Header />
        <main className="flex-1 py-20 flex items-center justify-center">
          <div className="max-w-md w-full mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Order Not Found</h1>
            <p className="text-sm text-slate-600 mb-6">Could not find order <code>{orderId}</code>.</p>
            <Link href="/advertise/contact" className="inline-flex rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white">Contact Support</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const isValidToken = token && verifyOrderAccessToken(order.orderId, order.buyerEmail, token);
  if (!isValidToken) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
        <Header />
        <main className="flex-1 py-20 flex items-center justify-center">
          <div className="max-w-md w-full mx-auto px-4 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-amber-600 mb-4">
              <ShieldAlert className="h-8 w-8" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Access Token Required</h1>
            <p className="text-sm text-slate-600 mb-6">
              Please use the private link provided in your order receipt email to track status.
            </p>
            <Link href="/" className="inline-flex rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700">Home</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const currentStageIndex = getStageIndex(order.status);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Header />

      <main className="flex-1 py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Top Status Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  Article Production Tracker
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  {order.companyName} — {order.packageName}
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Order ID: <code>{order.orderId}</code> • Buyer: {order.buyerName}
                </p>
              </div>

              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider bg-indigo-50 border border-indigo-200 text-indigo-700">
                  <Clock className="h-3.5 w-3.5" />
                  Status: {order.status.replace(/_/g, ' ')}
                </span>
              </div>
            </div>

            {/* Stepper */}
            <div className="relative">
              <div className="grid grid-cols-5 gap-2 text-center">
                {STAGES.map((stage, idx) => {
                  const isCompleted = idx < currentStageIndex || order.status === 'published';
                  const isCurrent = idx === currentStageIndex && order.status !== 'published';

                  return (
                    <div key={stage.id} className="flex flex-col items-center">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                          isCompleted
                            ? 'bg-emerald-600 text-white'
                            : isCurrent
                            ? 'bg-indigo-600 text-white ring-4 ring-indigo-100'
                            : 'bg-slate-100 text-slate-400'
                        }`}
                      >
                        {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : idx + 1}
                      </div>
                      <span
                        className={`mt-2 text-[11px] sm:text-xs font-semibold leading-tight ${
                          isCompleted || isCurrent ? 'text-slate-900' : 'text-slate-400'
                        }`}
                      >
                        {stage.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Action Callout Based on Status */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm mb-8">
            {order.status === 'paid' && !order.brief && (
              <div className="text-center py-4">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600 mb-3">
                  <FileText className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Next Step: Submit Your Editorial Brief</h2>
                <p className="mt-2 text-sm text-slate-600 max-w-lg mx-auto leading-relaxed mb-6">
                  Your payment is confirmed, but we need your brand background, topics, and destination links before our team can begin writing.
                </p>
                <Link
                  href={`/advertise/order/${order.orderId}/brief?token=${encodeURIComponent(token!)}`}
                  className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-6 py-3 text-sm font-bold text-white hover:bg-indigo-500 shadow-md transition-colors"
                >
                  Complete Editorial Brief Now &rarr;
                </Link>
              </div>
            )}

            {(order.status === 'brief_submitted' || order.status === 'in_production') && (
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Drafting in Progress</h2>
                    <p className="text-xs text-slate-500">Initial draft turnaround: 3 to 5 business days</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Our specialized business writers are currently researching and drafting your 1,200–1,500 word article. As soon as the initial draft is complete, we will upload it to your private review portal and notify you at <strong>{order.buyerEmail}</strong>.
                </p>
              </div>
            )}

            {order.status === 'draft_ready' && (
              <div className="text-center py-4">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 mb-3">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Your Draft is Ready for Review!</h2>
                <p className="mt-2 text-sm text-slate-600 max-w-lg mx-auto leading-relaxed mb-6">
                  Our editorial team has completed the initial draft: <strong>{order.draftTitle || 'Your Sponsored Article'}</strong>. Inspect the full copy, verify outbound links, and approve or request edits.
                </p>
                <Link
                  href={`/advertise/order/${order.orderId}/review?token=${encodeURIComponent(token!)}`}
                  className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-7 py-3.5 text-base font-bold text-white hover:bg-indigo-500 shadow-md transition-colors"
                >
                  Open Draft Review Portal &rarr;
                </Link>
              </div>
            )}

            {order.status === 'revision_requested' && (
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Revisions in Progress</h2>
                    <p className="text-xs text-slate-500">Incorporating your feedback (1–2 business days)</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Our editorial team is updating the draft based on your requested changes:
                </p>
                {order.revisionNotes && (
                  <div className="rounded-lg bg-slate-50 border border-slate-200 p-4 text-xs text-slate-700 italic">
                    &ldquo;{order.revisionNotes}&rdquo;
                  </div>
                )}
              </div>
            )}

            {order.status === 'approved' && (
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Customer Approved — In Editorial Release Queue</h2>
                    <p className="text-xs text-slate-500">Undergoing final editorial verification &amp; link qualification</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Thank you! You have approved this draft. It is now staged in our Editorial Release Queue where a managing editor performs final destination URL validation, rel=&quot;sponsored&quot; qualification, and formatting checks prior to authorizing live publication.
                </p>
              </div>
            )}

            {order.status === 'published' && (
              <div className="text-center py-4">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-3">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Your Article is Live!</h2>
                <p className="mt-2 text-sm text-slate-600 max-w-lg mx-auto leading-relaxed mb-6">
                  Your sponsored feature is published on FSI Digital with guaranteed active hosting for at least 12 months and verified <code>rel=&quot;sponsored&quot;</code> links.
                </p>
                {order.publishedUrl && (
                  <a
                    href={order.publishedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-6 py-3 text-sm font-bold text-white hover:bg-emerald-500 shadow-md transition-colors"
                  >
                    View Published Article <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Support Info */}
          <div className="rounded-xl border border-slate-200 bg-slate-100/60 p-6 text-xs text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-slate-800">Questions about your order or draft?</p>
              <p className="mt-0.5">Reach out to the editorial team at <a href="mailto:ashwani@fsidigital.ca" className="text-indigo-600 underline">ashwani@fsidigital.ca</a>.</p>
            </div>
            <Link
              href="/advertise/editorial-guidelines"
              className="font-semibold text-indigo-600 hover:underline shrink-0"
            >
              Review Editorial Guidelines &rarr;
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
