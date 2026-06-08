import Link from 'next/link';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CheckCircle2, Mail, ShieldCheck } from 'lucide-react';
import { getPartnerPackage } from '@/lib/partners/packages';
import { PartnerPurchaseTracker } from '@/components/partners/PartnerPurchaseTracker';

export const metadata: Metadata = {
  title: 'Partner Payment Received | FSI Digital',
  robots: { index: false, follow: false },
};

export default async function PartnerPaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ package?: string; order?: string }>;
}) {
  const resolvedParams = await searchParams;
  const selectedPackage = getPartnerPackage(resolvedParams.package);

  return (
    <>
      {selectedPackage && resolvedParams.order && (
        <PartnerPurchaseTracker
          packageId={selectedPackage.id}
          packageName={selectedPackage.name}
          price={selectedPackage.priceUsd}
          orderId={resolvedParams.order}
        />
      )}
      <Header />

      <main className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <CheckCircle2 className="h-9 w-9" />
            </div>
            <h1 className="text-3xl font-bold text-gray-950">Payment Received</h1>
            <p className="mt-3 text-lg text-gray-700">
              Your PayPal payment for {selectedPackage?.name || 'the partner pilot'} has been captured. FSI Digital will
              review buyer fit and lead availability before delivery.
            </p>
            {resolvedParams.order && (
              <div className="mt-5 rounded-md bg-gray-50 p-4 text-sm text-gray-600">
                PayPal order reference: <span className="font-mono font-semibold text-gray-950">{resolvedParams.order}</span>
              </div>
            )}
            <div className="mt-6 flex gap-3 rounded-md border border-amber-200 bg-amber-50 p-4 text-left text-sm text-amber-900">
              <ShieldCheck className="mt-0.5 h-5 w-5 flex-none" />
              <span>
                Private lead details are not shown on this public success page. Delivery is handled manually or through
                a protected partner dashboard after review.
              </span>
            </div>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/partners"
                className="inline-flex items-center justify-center rounded-md bg-gray-950 px-5 py-3 font-semibold text-white hover:bg-gray-800"
              >
                Back to Partners
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-950 hover:bg-gray-100"
              >
                <Mail className="h-4 w-4" />
                Contact FSI Digital
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
