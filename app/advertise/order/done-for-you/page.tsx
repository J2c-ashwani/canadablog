import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DfyCheckoutForm } from "@/components/advertising/DfyCheckoutForm";
import { ADVERTISING_PACKAGES } from "@/lib/advertising/config";
import {
  CheckCircle2,
  Clock,
  ShieldCheck,
  FileText,
  Sparkles,
  ArrowRight,
  Lock,
  Layers,
  Award,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Done-for-You Sponsored Article ($225 USD) | FSI Digital Checkout",
  description:
    "Secure checkout for our Done-for-You Sponsored Article package. Full research, expert writing, 1 revision round, and active hosting guaranteed for at least 12 months on FSI Digital.",
  robots: { index: false, follow: false },
};

export default function DfyOrderPage() {
  const clientId =
    process.env.PAYPAL_CLIENT_ID ||
    process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ||
    "sb";
  const currency = process.env.NEXT_PUBLIC_PAYPAL_CURRENCY || "USD";
  const pkg = ADVERTISING_PACKAGES["done-for-you"];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Header />

      <main className="flex-1 py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Link href="/" className="hover:text-slate-800">Home</Link>
            <span>/</span>
            <Link href="/advertise" className="hover:text-slate-800">Advertise</Link>
            <span>/</span>
            <span className="text-slate-900 font-bold">Done-for-You Checkout</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Product Details & Inclusions (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 px-3 py-1 text-xs font-bold uppercase tracking-wider text-indigo-700 mb-3">
                  <Sparkles className="h-3.5 w-3.5" />
                  Full-Service Editorial Package
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  Done-for-You Sponsored Article
                </h1>
                <p className="mt-3 text-base text-slate-600 leading-relaxed">
                  Put your product, platform, or professional advisory service in front of decision-makers evaluating business funding and tech innovation. We research, write, edit, and publish your feature end-to-end.
                </p>
              </div>

              {/* Inclusions Card */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
                <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Layers className="h-5 w-5 text-indigo-600" />
                  Everything Included in Your $225 USD Package:
                </h2>
                <div className="space-y-3.5">
                  {pkg.inclusions.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Editorial Timeline / Workflow */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
                <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-indigo-600" />
                  What Happens Immediately After Payment:
                </h2>
                <ol className="space-y-4 text-sm text-slate-600">
                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
                      1
                    </span>
                    <div>
                      <strong className="text-slate-900">Instant Brief Questionnaire Unlock:</strong>
                      <p className="mt-0.5 text-xs text-slate-500">
                        You are redirected immediately to your 5-section questionnaire to share your company background, target angles, and destination links.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
                      2
                    </span>
                    <div>
                      <strong className="text-slate-900">Expert Editorial Drafting (3–5 Days):</strong>
                      <p className="mt-0.5 text-xs text-slate-500">
                        Our specialized business writers research and draft an authoritative 1,200–1,500 word article.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
                      3
                    </span>
                    <div>
                      <strong className="text-slate-900">Private Review &amp; Included Revision Round:</strong>
                      <p className="mt-0.5 text-xs text-slate-500">
                        Inspect the full article copy on your private portal. Request edits or approve with a single click.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
                      4
                    </span>
                    <div>
                      <strong className="text-slate-900">Publication &amp; Guaranteed Active Hosting:</strong>
                      <p className="mt-0.5 text-xs text-slate-500">
                        Your article goes live with verified disclosures, header graphics, and guaranteed active hosting for at least 12 months.
                      </p>
                    </div>
                  </li>
                </ol>
              </div>

              {/* 100% Pre-Drafting Refund Guarantee */}
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-5 text-xs sm:text-sm text-emerald-900 flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold">Zero-Risk Editorial Guarantee:</strong> If our editorial team evaluates your submitted questionnaire and determines that your business or topic cannot meet our editorial criteria prior to drafting, we issue an immediate 100% full refund.
                </div>
              </div>
            </div>

            {/* Right Column: Checkout Form (5 cols) */}
            <div className="lg:col-span-5 sticky top-8">
              <DfyCheckoutForm clientId={clientId} currency={currency} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
