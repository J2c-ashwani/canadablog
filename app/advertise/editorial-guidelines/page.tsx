import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  ACCEPTED_NICHES,
  PROHIBITED_NICHES,
  PUBLISHING_STANDARDS,
} from "@/lib/advertising/config";
import {
  ArrowRight,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  FileText,
  AlertTriangle,
  Scale,
  ExternalLink,
  BookOpen,
  Award,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Guest Post & Sponsored Content Guidelines | FSI Digital",
  description:
    "Review publishing standards, accepted topics, prohibited niches, paid-link qualification (rel=\"sponsored\"), editorial review terms, and refund policy on FSI Digital.",
  alternates: {
    canonical: "https://www.fsidigital.ca/advertise/editorial-guidelines",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.fsidigital.ca/advertise/editorial-guidelines#webpage",
      "url": "https://www.fsidigital.ca/advertise/editorial-guidelines",
      "name": "Guest Post & Sponsored Content Guidelines | FSI Digital",
      "description": "Review publishing standards, accepted topics, prohibited niches, paid-link qualification (rel=\"sponsored\"), editorial review terms, and refund policy on FSI Digital.",
      "breadcrumb": {
        "@id": "https://www.fsidigital.ca/advertise/editorial-guidelines#breadcrumb"
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
      "@id": "https://www.fsidigital.ca/advertise/editorial-guidelines#breadcrumb",
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
          "name": "Editorial Guidelines",
          "item": "https://www.fsidigital.ca/advertise/editorial-guidelines"
        }
      ]
    }
  ]
};

export default function EditorialGuidelinesPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Header />

      <main className="flex-1 py-16 sm:py-24">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Breadcrumbs */}
          <nav className="mb-8 flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Link href="/" className="hover:text-slate-800">Home</Link>
            <span>/</span>
            <Link href="/advertise" className="hover:text-slate-800">Advertise</Link>
            <span>/</span>
            <span className="text-slate-900 font-bold">Editorial Guidelines</span>
          </nav>

          {/* Page Header */}
          <div className="border-b border-slate-200 pb-10 mb-12">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 border border-indigo-200/60 px-3 py-1 text-xs font-semibold text-indigo-700 uppercase tracking-wider mb-4">
              <BookOpen className="h-3.5 w-3.5" />
              Publishing Standards &amp; Quality Mandate
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              FSI Digital Editorial &amp; Publishing Guidelines
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
              FSI Digital operates an authoritative commercial intelligence publication dedicated to business funding, innovation, and scaling. To protect our readers and maintain search engine compliance, all sponsored articles, guest contributions, and content features must satisfy these rigorous standards.
            </p>
          </div>

          {/* Core Content Blocks */}
          <div className="space-y-12">
            {/* 1. Core Editorial Mission */}
            <section className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                  <Award className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">1. Editorial Philosophy &amp; Reader Value</h2>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed mb-4">
                Our audience consists of founders, CEOs, CFOs, grant consultants, and institutional investors. Every article published on FSI Digital must deliver genuine educational, operational, or strategic clarity.
              </p>
              <ul className="space-y-2.5 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span><strong>Substantive Depth:</strong> Articles must be between {PUBLISHING_STANDARDS.minWordCount} and {PUBLISHING_STANDARDS.maxWordCount} words, featuring well-researched insights, structured frameworks, or practical case methodologies.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span><strong>Originality:</strong> 100% original copy. We do not accept spun content, AI-generated thin summaries without human synthesis, or articles syndicated verbatim from other domains.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span><strong>Objective, Authoritative Tone:</strong> Content must maintain an analytical, business-professional voice. Overtly promotional hype (&ldquo;the greatest tool ever made&rdquo;) will be edited into objective, benefit-driven analysis.</span>
                </li>
              </ul>
            </section>

            {/* 2. Accepted Subject Areas */}
            <section className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">2. Accepted Subject Areas</h2>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed mb-6">
                We accept sponsored contributions and done-for-you topics falling squarely within these professional domains:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ACCEPTED_NICHES.map((niche, idx) => (
                  <div key={idx} className="rounded-lg border border-slate-100 bg-slate-50/60 p-4">
                    <h3 className="text-sm font-bold text-slate-900">{niche.title}</h3>
                    <p className="mt-1 text-xs text-slate-600 leading-relaxed">{niche.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 3. Prohibited Topics & Niches */}
            <section className="bg-white rounded-xl border border-rose-200 p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
                  <XCircle className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">3. Strictly Prohibited Categories</h2>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed mb-4">
                FSI Digital enforces a zero-tolerance policy against deceptive, predatory, or unrelated content. We will not accept inquiries, content, or outbound links promoting:
              </p>
              <div className="space-y-2.5">
                {PROHIBITED_NICHES.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <XCircle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-lg bg-rose-50 border border-rose-100 p-4 text-xs text-rose-800 leading-relaxed">
                <strong>Enforcement:</strong> Any attempt to circumvent these restrictions through deceptive briefs, masked redirect links, or altered landing pages will result in immediate cancellation and forfeiture of fees.
              </div>
            </section>

            {/* 4. Link & Disclosure Policy */}
            <section className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <Scale className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">4. Outbound Links &amp; Disclosure Compliance</h2>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed mb-4">
                In strict adherence to regulatory guidelines set by the Federal Trade Commission (FTC), Competition Bureau Canada, and Google Search Essentials:
              </p>

              <div className="space-y-4 text-sm text-slate-700">
                <div className="rounded-lg border border-slate-100 bg-slate-50/60 p-4">
                  <h3 className="font-bold text-slate-900 mb-1">Mandatory Disclosure Tags</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Every commercial piece includes an unambiguous disclosure at the top of the article (e.g., &ldquo;Sponsored Article&rdquo; or &ldquo;Paid Partnership with [Company]&rdquo;). We do not disguise sponsored editorial as unbiased staff journalism.
                  </p>
                </div>

                <div className="rounded-lg border border-slate-100 bg-slate-50/60 p-4">
                  <h3 className="font-bold text-slate-900 mb-1">Link Limits and Attribution</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Articles may include a maximum of <strong>two (2)</strong> outbound links to the advertiser&apos;s legitimate, HTTPS-secured web properties. All commercial outbound links are tagged with <code>rel=&quot;sponsored&quot;</code> or <code>rel=&quot;nofollow&quot;</code>.
                  </p>
                </div>

                <div className="rounded-lg border border-slate-100 bg-slate-50/60 p-4">
                  <h3 className="font-bold text-slate-900 mb-1">No Algorithmic or Ranking Guarantees</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    FSI Digital does not sell &ldquo;dofollow backlinks&rdquo; or promise guaranteed Google rankings, indexation timelines, or traffic quotas. Content is evaluated and indexed organically by search engines on its own merits.
                  </p>
                </div>
              </div>
            </section>

            {/* 5. Editorial Control & Refund Policy */}
            <section className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">5. Editorial Rights, Revisions &amp; Clear Refund Terms</h2>
              </div>
              <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
                <p>
                  <strong>Editorial Discretion:</strong> FSI Digital maintains final editorial veto over headline phrasing, layout structure, internal contextual links, and graphic selection. We reserve the right to correct grammar, tighten phrasing, or decline destination URLs that do not meet trust criteria.
                </p>
                <p>
                  <strong>Revision Rounds:</strong> Our Done-for-You package includes one (1) dedicated revision round. The advertiser may submit consolidated feedback via their private order review portal within five (5) business days of draft delivery.
                </p>

                <div className="rounded-lg border border-slate-200 bg-slate-50/80 p-5 space-y-3">
                  <h3 className="font-bold text-slate-900 text-sm">Clear Cancellation &amp; Refund Terms:</h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700 list-disc pl-5">
                    <li>
                      <strong>Unpaid Inquiries (/advertise/contact):</strong> No payment is taken upfront. If a proposal cannot be accepted, the submitter is notified within 1 business day with zero fee or obligation.
                    </li>
                    <li>
                      <strong>Paid Orders Rejected Prior to Drafting:</strong> If an advertiser purchases the $225 Done-for-You package and submits a brief that cannot be harmonized with our publishing guidelines or promotes non-compliant niches, a <strong>100% full refund ($225.00 USD)</strong> is returned to the original PayPal payment method within 3 to 5 business days before drafting starts.
                    </li>
                    <li>
                      <strong>Cancellation After Drafting Commences:</strong> Because professional research and editorial labor have been expended once drafting begins, orders canceled after initial draft delivery are eligible for a <strong>50% partial refund</strong>, provided live publication has not been authorized.
                    </li>
                    <li>
                      <strong>Post-Publication:</strong> Once customer approval and final staff release authorization are completed and the article is published live to fsidigital.ca, active hosting is guaranteed for at least 12 months, and sales are final.
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Bottom Actions */}
            <div className="rounded-2xl bg-slate-900 text-white p-8 sm:p-10 text-center shadow-xl">
              <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">Ready to Publish with FSI Digital?</h2>
              <p className="text-sm text-slate-300 max-w-xl mx-auto mb-8">
                Submit an inquiry with your proposed angle, or proceed directly to our Done-for-You article checkout.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/advertise/order/done-for-you"
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-indigo-600 px-6 py-3.5 text-sm font-bold text-white hover:bg-indigo-500 transition-colors shadow-md"
                >
                  Order Done-for-You Article ($225 USD)
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/advertise/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-800 px-6 py-3.5 text-sm font-semibold text-slate-200 hover:bg-slate-700 transition-colors"
                >
                  Submit a Publishing Proposal
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
