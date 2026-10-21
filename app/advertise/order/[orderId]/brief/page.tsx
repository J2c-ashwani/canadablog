import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getPublishingOrder } from "@/lib/advertising/store";
import { verifyOrderAccessToken } from "@/lib/advertising/config";
import { PostPurchaseBriefForm } from "@/components/advertising/PostPurchaseBriefForm";
import {
  ShieldAlert,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  FileText,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Complete Your Editorial Brief | FSI Digital Publishing",
  robots: { index: false, follow: false },
};

export default async function OrderBriefPage({
  params,
  searchParams,
}: {
  params: Promise<{ orderId: string }>;
  searchParams: Promise<{ token?: string }>;
}) {
  const { orderId } = await params;
  const { token } = await searchParams;

  const order = await getPublishingOrder(orderId);

  // Security Check 1: Order must exist
  if (!order) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
        <Header />
        <main className="flex-1 py-20 flex items-center justify-center">
          <div className="max-w-md w-full mx-auto px-4 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 text-rose-600 mb-4">
              <ShieldAlert className="h-8 w-8" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Order Not Found</h1>
            <p className="text-sm text-slate-600 mb-6">
              We could not locate an order matching reference <code>{orderId}</code>. Please check the link in your payment receipt email or contact support.
            </p>
            <Link
              href="/advertise/contact"
              className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500"
            >
              Contact Support
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Security Check 2: Token must be valid
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
              To protect client privacy, post-purchase editorial portals require a signed access link. Please click the secure link sent to <strong>{order.buyerEmail}</strong> upon checkout.
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Return Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // If brief was already submitted
  if (order.status !== 'paid' && order.brief) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
        <Header />
        <main className="flex-1 py-20 flex items-center justify-center">
          <div className="max-w-md w-full mx-auto px-4 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Editorial Brief Already Submitted</h1>
            <p className="text-sm text-slate-600 mb-6">
              Your questionnaire for <strong>{order.companyName}</strong> has already been received and is currently in production with our writing desk.
            </p>
            <Link
              href={`/advertise/order/${order.orderId}/status?token=${encodeURIComponent(token!)}`}
              className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-500 shadow-sm"
            >
              Track Production Status
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Header />

      <main className="flex-1 py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Order Header Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm mb-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-5">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Payment Confirmed ($225 USD)
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Submit Your Editorial Brief
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-slate-500">
                  Order ID: <code>{order.orderId}</code> • Buyer: {order.buyerName} ({order.companyName})
                </p>
              </div>

              <div className="sm:text-right">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Turnaround SLA</div>
                <div className="text-sm font-bold text-slate-900 flex items-center sm:justify-end gap-1 mt-0.5">
                  <Clock className="h-4 w-4 text-indigo-600" />
                  <span>3–5 Business Days</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              Please take 5 minutes to complete the questionnaire below. The more context you provide regarding your value proposition, ideal reader takeaways, and desired link targets, the more impactful and authoritative your article will be.
            </p>
          </div>

          {/* 5-Section Questionnaire Component */}
          <PostPurchaseBriefForm
            orderId={order.orderId}
            token={token!}
            companyName={order.companyName}
            website={order.website}
            buyerName={order.buyerName}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
