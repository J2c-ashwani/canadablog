import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getPublishingOrder } from "@/lib/advertising/store";
import { verifyOrderAccessToken } from "@/lib/advertising/config";
import { DraftReviewClient } from "@/components/advertising/DraftReviewClient";
import { ShieldAlert, Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Review Article Draft | FSI Digital Publishing",
  robots: { index: false, follow: false },
};

export default async function OrderDraftReviewPage({
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
            <Link href="/" className="inline-flex rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white">Home</Link>
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
            <p className="text-sm text-slate-600 mb-6">Please use the private link in your email to review the draft.</p>
            <Link href="/" className="inline-flex rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700">Home</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // If draft is not ready yet
  if (order.status === 'paid' || order.status === 'brief_submitted' || order.status === 'in_production') {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
        <Header />
        <main className="flex-1 py-20 flex items-center justify-center">
          <div className="max-w-md w-full mx-auto px-4 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 mb-4">
              <Clock className="h-8 w-8" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Draft Still in Production</h1>
            <p className="text-sm text-slate-600 mb-6">
              Our editorial team is currently researching and drafting your article. Your initial draft will be delivered within 3 to 5 business days.
            </p>
            <Link
              href={`/advertise/order/${order.orderId}/status?token=${encodeURIComponent(token!)}`}
              className="inline-flex items-center rounded-lg bg-indigo-600 px-6 py-3 text-sm font-bold text-white hover:bg-indigo-500 shadow-sm"
            >
              View Order Status
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
          <nav className="mb-8 flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Link href="/" className="hover:text-slate-800">Home</Link>
            <span>/</span>
            <Link
              href={`/advertise/order/${order.orderId}/status?token=${encodeURIComponent(token!)}`}
              className="hover:text-slate-800"
            >
              Order Status
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-bold">Draft Review</span>
          </nav>

          <DraftReviewClient
            orderId={order.orderId}
            token={token!}
            companyName={order.companyName}
            draftTitle={order.draftTitle}
            draftContent={order.draftContent}
            currentStatus={order.status}
            revisionNotes={order.revisionNotes}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
