import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PublishingInquiryForm } from "@/components/advertising/PublishingInquiryForm";
import {
  Sparkles,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Mail,
  Scale,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Submit a Guest Post or Sponsored Content Inquiry | FSI Digital",
  description:
    "Submit an editorial proposal, guest article pitch, or custom sponsored content inquiry to FSI Digital. 1 business day review turnaround.",
  alternates: {
    canonical: "https://www.fsidigital.ca/advertise/contact",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": "https://www.fsidigital.ca/advertise/contact#webpage",
      "url": "https://www.fsidigital.ca/advertise/contact",
      "name": "Submit a Guest Post or Sponsored Content Inquiry | FSI Digital",
      "description": "Submit an editorial proposal, guest article pitch, or custom sponsored content inquiry to FSI Digital. 1 business day review turnaround.",
      "breadcrumb": {
        "@id": "https://www.fsidigital.ca/advertise/contact#breadcrumb"
      },
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://www.fsidigital.ca/#website",
        "url": "https://www.fsidigital.ca",
        "name": "FSI Digital"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.fsidigital.ca/advertise/contact#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.fsidigital.ca"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Advertise",
          "item": "https://www.fsidigital.ca/advertise"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Publishing Inquiry",
          "item": "https://www.fsidigital.ca/advertise/contact"
        }
      ]
    }
  ]
};

export default function AdvertiseContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Header />

      <main className="flex-1 py-12 sm:py-20">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Link href="/" className="hover:text-slate-800">Home</Link>
            <span>/</span>
            <Link href="/advertise" className="hover:text-slate-800">Advertise</Link>
            <span>/</span>
            <span className="text-slate-900 font-bold">Publishing Inquiry</span>
          </nav>

          <div className="mb-10 text-center max-w-2xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Submit a Publishing Proposal
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              Tell us about your brand, proposed topic angle, and target audience. Our editorial team evaluates every proposal and responds within 24 business hours.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Form (7 cols) */}
            <div className="lg:col-span-7">
              <PublishingInquiryForm />
            </div>

            {/* Right: Sidebar context (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Card 1: Instant Checkout */}
              <div className="rounded-2xl border-2 border-indigo-600 bg-white p-6 shadow-md">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">
                  <Sparkles className="h-4 w-4" />
                  Instant Direct Checkout
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Done-for-You Sponsored Article
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Looking for our full-service research and writing package? Bypass the proposal phase and purchase directly with server-verified PayPal checkout.
                </p>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-slate-900">$225</span>
                  <span className="text-xs font-semibold text-slate-500">USD one-time</span>
                </div>
                <div className="mt-5">
                  <Link
                    href="/advertise/order/done-for-you"
                    className="w-full inline-flex items-center justify-center rounded-lg bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500 transition-colors"
                  >
                    Order Done-for-You Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Card 2: Editorial Review SLA */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-2 text-slate-900 font-bold mb-3">
                  <Clock className="h-5 w-5 text-indigo-600" />
                  <span>Editorial Review Timeline</span>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>1 Business Day:</strong> Initial proposal response from an editor</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>3–5 Business Days:</strong> Done-for-You drafting SLA</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>1 Revision Round:</strong> Full review portal with included edits</span>
                  </li>
                </ul>
              </div>

              {/* Card 3: Transparency & Trust */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-2 text-slate-900 font-bold mb-3">
                  <Scale className="h-5 w-5 text-indigo-600" />
                  <span>Link &amp; FTC Compliance</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  All published sponsored content carries an explicit disclosure tag. Outbound links are marked with <code>rel=&quot;sponsored&quot;</code> in accordance with FTC regulations and Google Search Essentials.
                </p>
                <Link
                  href="/advertise/editorial-guidelines"
                  className="text-xs font-semibold text-indigo-600 hover:underline"
                >
                  Read Editorial Guidelines &rarr;
                </Link>
              </div>

              {/* Card 4: Support */}
              <div className="rounded-2xl border border-slate-200 bg-slate-100/70 p-6 text-xs text-slate-600">
                <div className="flex items-center gap-2 font-bold text-slate-900 mb-1">
                  <Mail className="h-4 w-4 text-slate-700" />
                  <span>Direct Editorial Contact</span>
                </div>
                <p>
                  Have an urgent question or agency RFP? Reach our editorial desk directly at{" "}
                  <a href="mailto:ashwani@fsidigital.ca" className="font-semibold text-indigo-600 hover:underline">
                    ashwani@fsidigital.ca
                  </a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
