import Link from 'next/link';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PayPalPartnerCheckout } from '@/components/partners/PayPalPartnerCheckout';
import { getPartnerPackage, PARTNER_PACKAGES } from '@/lib/partners/packages';
import { ArrowLeft, CheckCircle2, ShieldCheck } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Partner PayPal Checkout | FSI Digital',
  description: 'Pay for an FSI Digital funding lead partner pilot using PayPal.',
  robots: { index: false, follow: false },
};

export default async function PartnerCheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ package?: string }>;
}) {
  const resolvedParams = await searchParams;
  const selectedPackage = getPartnerPackage(resolvedParams.package) || PARTNER_PACKAGES[0];
  const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const currency = process.env.NEXT_PUBLIC_PAYPAL_CURRENCY || 'USD';

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/partners" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-gray-950">
            <ArrowLeft className="h-4 w-4" />
            Back to partner page
          </Link>

          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <aside className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4 inline-flex rounded-md bg-emerald-50 p-2 text-emerald-700">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h1 className="text-3xl font-bold text-gray-950">{selectedPackage.name}</h1>
              <p className="mt-3 text-gray-700">{selectedPackage.description}</p>
              <div className="mt-6 rounded-lg bg-gray-950 p-5 text-white">
                <div className="text-sm font-semibold text-emerald-200">{selectedPackage.leadType}</div>
                <div className="mt-2 text-4xl font-bold">${selectedPackage.priceUsd.toLocaleString('en-US')}</div>
                <div className="mt-1 text-sm text-gray-300">{selectedPackage.leadCount} · paid via PayPal · {currency}</div>
              </div>
              <div className="mt-6 space-y-3">
                {selectedPackage.features.map((feature) => (
                  <div key={feature} className="flex gap-3 text-gray-700">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-emerald-600" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-md border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                This is a controlled partner pilot. FSI Digital does not publish raw lead downloads publicly. Delivery
                happens after buyer fit, consent, and available inventory are confirmed.
              </div>
            </aside>

            {paypalClientId ? (
              <PayPalPartnerCheckout selectedPackage={selectedPackage} clientId={paypalClientId} currency={currency} />
            ) : (
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-6 text-amber-900">
                <h2 className="text-2xl font-bold">PayPal is not configured yet</h2>
                <p className="mt-2">
                  Set NEXT_PUBLIC_PAYPAL_CLIENT_ID, PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, and PAYPAL_ENV in Vercel to
                  enable partner payments.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
