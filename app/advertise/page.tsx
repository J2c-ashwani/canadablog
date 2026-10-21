import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  ADVERTISING_PACKAGES,
  ACCEPTED_NICHES,
  PROHIBITED_NICHES,
} from "@/lib/advertising/config";
import {
  ArrowRight,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  FileText,
  Sparkles,
  Clock,
  Layers,
  HelpCircle,
  ExternalLink,
  BookOpen,
  Award,
  Lock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Sponsored Article Publishing & Advertising | FSI Digital",
  description:
    "Explore sponsored article publishing, guest-post guidelines and pricing at FSI Digital. Choose a client-supplied article, request a custom placement or order content creation. All placements undergo editorial review.",
  alternates: {
    canonical: "https://www.fsidigital.ca/advertise",
  },
  robots: { index: true, follow: true },
};

const FAQS = [
  {
    q: "What does sponsored article publishing cost?",
    a: "We offer transparent, fixed pricing across three formats: Done-for-You Sponsored Articles cost $225 USD (covering full research, writing, revisions, and publication); Client-Supplied Sponsored Articles start at $125 USD (covering editorial review, fact-checking, and publication of your draft); and Resource Insertions in established articles range from $100 to $150 USD. Agency volume pricing is available upon inquiry.",
  },
  {
    q: "Can I submit my own pre-written article?",
    a: "Yes. Through our Client-Supplied package (starting at $125 USD), you can submit an original draft of 1,000 to 2,000 words. Our editors evaluate the draft for factual accuracy, analytical depth, and audience relevance before scheduling publication.",
  },
  {
    q: "Does FSI Digital sell dofollow backlinks?",
    a: "No. FSI Digital does not sell dofollow links, PageRank manipulation, or PBN placements. In strict compliance with FTC regulations and Google Search Essentials, all commercial outbound links are tagged with rel=\"sponsored\" or rel=\"nofollow\". Articles are limited to a maximum of two contextual commercial outbound links to HTTPS destinations.",
  },
  {
    q: "Which topics and business categories are accepted?",
    a: "We accept articles covering small-business funding, government grants (such as IRAP, SR&ED, and SBIR), startup scaling, R&D innovation, B2B software, and professional advisory services (accounting, legal, consulting). We strictly reject gambling, casino promotions, adult content, payday loans, fraudulent finance, and unverified medical claims.",
  },
  {
    q: "What happens if an article or brief is rejected?",
    a: "For unpaid inquiries (/advertise/contact), no fee is charged and we notify you within 1 business day if a proposal cannot be accepted. For paid Done-for-You orders ($225 USD), if a submitted brief cannot meet our editorial guidelines prior to the start of drafting, we issue a 100% full refund to your original PayPal method within 3 to 5 business days. Once drafting has commenced, cancellations are eligible for a 50% partial refund to cover writing labor, provided live publication has not been authorized.",
  },
  {
    q: "Does publication guarantee Google indexing or search rankings?",
    a: "No. We never guarantee Google search rankings, indexing speeds, or organic traffic volumes. Articles are indexed naturally by search engines based on their relevance and quality. Our value is professional content creation, expert editorial review, and published placement on a specialized business funding and growth platform.",
  },
  {
    q: "What is included in the $225 Done-for-You package?",
    a: "The $225 USD Done-for-You package includes complete topic research, 1,200 to 1,500 words of original writing by our business editorial team, up to two rel=\"sponsored\" outbound links, custom header graphics, one structured revision round, an initial draft delivered in 3 to 5 business days, and active hosting guaranteed for at least 12 months.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.fsidigital.ca/advertise#webpage",
      "url": "https://www.fsidigital.ca/advertise",
      "name": "Sponsored Article Publishing & Advertising | FSI Digital",
      "description": "Explore sponsored article publishing, guest-post guidelines and pricing at FSI Digital. Choose a client-supplied article, request a custom placement or order content creation. All placements undergo editorial review.",
      "breadcrumb": {
        "@id": "https://www.fsidigital.ca/advertise#breadcrumb"
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
      "@id": "https://www.fsidigital.ca/advertise#breadcrumb",
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
          "name": "Advertise & Publish",
          "item": "https://www.fsidigital.ca/advertise"
        }
      ]
    },
    {
      "@type": "Service",
      "@id": "https://www.fsidigital.ca/advertise#service",
      "name": "Sponsored Article Publishing & Content Creation",
      "serviceType": "Sponsored Content & Publishing",
      "provider": {
        "@type": "Organization",
        "name": "FSI Digital",
        "url": "https://www.fsidigital.ca",
        "logo": "https://www.fsidigital.ca/logo.png"
      },
      "description": "Authoritative business article creation, editorial review, and publication for brands in business funding, technology, finance, and innovation.",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Publishing Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "name": "Done-for-You Sponsored Article",
            "price": "225.00",
            "priceCurrency": "USD",
            "description": "Full research, 1,200–1,500 word writing, 1 revision round, and active hosting for at least 12 months."
          },
          {
            "@type": "Offer",
            "name": "Client-Supplied Sponsored Article",
            "price": "125.00",
            "priceCurrency": "USD",
            "description": "Editorial fact-check, copyedit, and publication of client-supplied 1,000–2,000 word draft."
          },
          {
            "@type": "Offer",
            "name": "Resource Insertion / Article Sponsorship",
            "price": "100.00",
            "priceCurrency": "USD",
            "description": "Contextual resource mention in an existing topically aligned guide (from $100 USD, up to $150 USD depending on article placement context)."
          }
        ]
      }
    }
  ]
};

export default function AdvertisePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Header />

      <main className="flex-1">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-slate-950 text-white pt-20 pb-24 md:pt-28 md:pb-32">
          {/* Subtle grid backdrop */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />

          <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-indigo-300 uppercase mb-8">
              <Sparkles className="h-3.5 w-3.5" />
              FSI Digital Publishing &amp; Sponsorship Portal
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight mb-6">
              Put Your Business in Front of an Audience Interested in{" "}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent">
                Funding, Finance &amp; Growth
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
              FSI Digital works with businesses, agencies and subject-matter experts to create and publish useful content related to business funding, entrepreneurship, R&amp;D, technology and business growth. Submit an editorial proposal or choose our done-for-you article package.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/advertise/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-indigo-600 px-7 py-4 text-base font-semibold text-white shadow-lg hover:bg-indigo-500 transition-all duration-200"
              >
                Submit a Publishing Inquiry
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/advertise/order/done-for-you"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-900/80 px-7 py-4 text-base font-semibold text-slate-200 hover:bg-slate-800 hover:text-white transition-all duration-200"
              >
                Done-for-You Article — $225 USD
              </Link>
            </div>

            {/* Trust Pills */}
            <div className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-medium text-slate-400">
              <div className="flex items-center justify-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>100% Original Research</span>
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <Clock className="h-4 w-4 text-blue-400" />
                <span>3–5 Day Drafting SLA</span>
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-indigo-400" />
                <span>1 Revision Round Included</span>
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <Award className="h-4 w-4 text-amber-400" />
                <span>FTC &amp; Google Compliant</span>
              </div>
            </div>
          </div>
        </section>

        {/* What We Offer / Package Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-xs font-bold tracking-widest text-indigo-600 uppercase mb-3">
                Commercial Publishing Packages
              </h2>
              <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Transparent Options for Every Content Strategy
              </p>
              <p className="mt-4 text-base sm:text-lg text-slate-600">
                Whether you need our editorial team to research and write from scratch or you have a pre-written draft ready for review, we offer clear, fixed pricing with no hidden fees.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1: DFY */}
              <div className="relative rounded-2xl border-2 border-indigo-600 bg-white p-8 shadow-xl flex flex-col justify-between">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-indigo-600 px-4 py-1 text-xs font-bold uppercase tracking-wider text-white">
                  Most Popular • Direct Checkout
                </div>

                <div>
                  <div className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                    Done-for-You
                  </div>
                  <h3 className="mt-1 text-2xl font-bold text-slate-900">
                    {ADVERTISING_PACKAGES['done-for-you'].name}
                  </h3>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                    {ADVERTISING_PACKAGES['done-for-you'].description}
                  </p>

                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold tracking-tight text-slate-900">
                      $225
                    </span>
                    <span className="text-sm font-semibold text-slate-500">USD one-time</span>
                  </div>

                  <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
                    {ADVERTISING_PACKAGES['done-for-you'].inclusions.map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100">
                  <Link
                    href="/advertise/order/done-for-you"
                    className="w-full inline-flex items-center justify-center rounded-lg bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-md hover:bg-indigo-500 transition-colors"
                  >
                    Purchase Article Package ($225)
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <p className="mt-2 text-center text-[11px] text-slate-500">
                    Server-verified PayPal checkout. Unlock brief instantly.
                  </p>
                </div>
              </div>

              {/* Card 2: Client-Supplied */}
              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-colors">
                <div>
                  <div className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                    Client Draft
                  </div>
                  <h3 className="mt-1 text-2xl font-bold text-slate-900">
                    {ADVERTISING_PACKAGES['client-supplied'].name}
                  </h3>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                    {ADVERTISING_PACKAGES['client-supplied'].description}
                  </p>

                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold tracking-tight text-slate-900">
                      $125
                    </span>
                    <span className="text-sm font-semibold text-slate-500">USD starting</span>
                  </div>

                  <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
                    {ADVERTISING_PACKAGES['client-supplied'].inclusions.map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100">
                  <Link
                    href="/advertise/contact?package=client-supplied"
                    className="w-full inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-800 hover:bg-slate-50 transition-colors"
                  >
                    Submit Draft for Review
                  </Link>
                  <p className="mt-2 text-center text-[11px] text-slate-500">
                    Inquiry required. Editorial review prior to billing.
                  </p>
                </div>
              </div>

              {/* Card 3: Resource Insertion */}
              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-colors">
                <div>
                  <div className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                    Existing Article Spotlight
                  </div>
                  <h3 className="mt-1 text-2xl font-bold text-slate-900">
                    {ADVERTISING_PACKAGES['resource-insertion'].name}
                  </h3>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                    {ADVERTISING_PACKAGES['resource-insertion'].description}
                  </p>

                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold tracking-tight text-slate-900">
                      $100 – $150
                    </span>
                    <span className="text-sm font-semibold text-slate-500">USD</span>
                  </div>

                  <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
                    {ADVERTISING_PACKAGES['resource-insertion'].inclusions.map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100">
                  <Link
                    href="/advertise/contact?package=resource-insertion"
                    className="w-full inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-800 hover:bg-slate-50 transition-colors"
                  >
                    Request Article Placement
                  </Link>
                  <p className="mt-2 text-center text-[11px] text-slate-500">
                    Contextual fit evaluation within 24 hours.
                  </p>
                </div>
              </div>
            </div>

            {/* Agency Banner */}
            <div className="mt-12 rounded-xl border border-indigo-100 bg-gradient-to-r from-indigo-50/70 via-white to-blue-50/70 p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-700 mb-2">
                  <Layers className="h-3.5 w-3.5" />
                  Agencies, PR Firms &amp; Media Buyers
                </div>
                <h4 className="text-xl font-bold text-slate-900">
                  Managing multiple client placements or looking for monthly retainer volume?
                </h4>
                <p className="mt-1 text-sm text-slate-600 max-w-2xl">
                  We offer dedicated editorial support, custom publishing calendars, priority SLAs, and tiered volume discounts for agency partners.
                </p>
              </div>
              <Link
                href="/advertise/contact?package=agency-bulk"
                className="shrink-0 inline-flex items-center justify-center rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
              >
                Inquire for Agency Rates
              </Link>
            </div>
          </div>
        </section>

        {/* Accepted vs Prohibited Categories */}
        <section className="py-20 bg-slate-100/70 border-t border-slate-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-xs font-bold tracking-widest text-indigo-600 uppercase mb-3">
                Editorial Alignment
              </h2>
              <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Accepted Subject Areas &amp; Prohibited Niches
              </p>
              <p className="mt-4 text-base sm:text-lg text-slate-600">
                To protect reader trust and search engine authority, we maintain strict editorial boundaries. Every piece must provide actionable value to businesses and founders.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Accepted Niches */}
              <div className="rounded-xl border border-emerald-200 bg-white p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="rounded-lg bg-emerald-100 p-2 text-emerald-800">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Accepted Subject Areas</h3>
                    <p className="text-xs text-slate-500">Topical focus areas relevant to FSI Digital readers</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {ACCEPTED_NICHES.map((niche, idx) => (
                    <div key={idx} className="rounded-lg border border-slate-100 bg-slate-50/50 p-4">
                      <h4 className="text-sm font-bold text-slate-900 mb-1">{niche.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{niche.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prohibited Niches */}
              <div className="rounded-xl border border-rose-200 bg-white p-8 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="rounded-lg bg-rose-100 p-2 text-rose-800">
                      <XCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">Prohibited Categories</h3>
                      <p className="text-xs text-slate-500">Strictly excluded without exception</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {PROHIBITED_NICHES.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 rounded-lg border border-rose-50 bg-rose-50/40 p-3 text-xs sm:text-sm text-slate-700">
                        <XCircle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <p className="text-xs text-slate-500 leading-relaxed">
                    For complete details on style standards, source citations, and editorial veto rights, read our full{" "}
                    <Link
                      href="/advertise/editorial-guidelines"
                      className="text-indigo-600 font-semibold hover:underline inline-flex items-center gap-0.5"
                    >
                      Editorial Guidelines <ExternalLink className="h-3 w-3" />
                    </Link>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5-Step Publishing Process */}
        <section className="py-20 bg-white border-t border-slate-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-xs font-bold tracking-widest text-indigo-600 uppercase mb-3">
                Publishing Workflow
              </h2>
              <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                From Submission to Live Publication
              </p>
              <p className="mt-4 text-base sm:text-lg text-slate-600">
                A seamless, structured process designed for busy marketing teams and founders.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  step: "01",
                  title: "Select Package or Submit Inquiry",
                  desc: "Choose the Done-for-You package ($225 USD) for instant checkout, or submit an inquiry with your topic angle for client-supplied or custom campaigns.",
                },
                {
                  step: "02",
                  title: "Submit Your Editorial Questionnaire",
                  desc: "Complete our brief questionnaire outlining your brand background, target audience, core messaging points, desired call-to-action, and up to 2 destination URLs.",
                },
                {
                  step: "03",
                  title: "Expert Research & Drafting (3–5 Days)",
                  desc: "Our business editors research and draft an authoritative 1,200–1,500 word article aligned with FSI Digital's editorial focus on business funding and technology.",
                },
                {
                  step: "04",
                  title: "Private Draft Review & Revision Round",
                  desc: "You receive access to your private review portal to inspect the draft, suggest adjustments, and request edits. One comprehensive revision round is included.",
                },
                {
                  step: "05",
                  title: "Publication, Disclosures & Guaranteed Hosting",
                  desc: "Upon final approval, the article is published with compliant disclosures, high-resolution header graphics, and active hosting guaranteed for at least 12 months.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-6 rounded-xl border border-slate-200 bg-slate-50/60 p-6 shadow-sm hover:border-indigo-300 transition-colors"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-lg font-extrabold text-white">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                    <p className="mt-1 text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Editorial Policy Transparency Card */}
        <section className="py-16 bg-slate-900 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-8 sm:p-10 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="rounded-lg bg-indigo-500/20 p-2.5 text-indigo-400">
                  <Lock className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Our Editorial &amp; Link Disclosure Policy</h3>
                  <p className="text-xs text-slate-400">Commitment to search compliance and regulatory integrity</p>
                </div>
              </div>

              <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
                <p>
                  FSI Digital is committed to editorial honesty and reader trust. We are <strong>not a link brokerage</strong> and we do not sell algorithmic manipulation.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                  <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
                    <h4 className="font-semibold text-white text-sm mb-1">Clear Sponsorship Disclosure</h4>
                    <p className="text-xs text-slate-400">
                      Every paid placement is explicitly labeled with a visible &ldquo;Sponsored Article&rdquo; or &ldquo;Paid Partnership&rdquo; badge.
                    </p>
                  </div>
                  <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
                    <h4 className="font-semibold text-white text-sm mb-1">Compliant Outbound Links</h4>
                    <p className="text-xs text-slate-400">
                      Outbound links to advertiser properties are tagged with <code>rel=&quot;sponsored&quot;</code> in accordance with Google Webmaster standards.
                    </p>
                  </div>
                  <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
                    <h4 className="font-semibold text-white text-sm mb-1">No Algorithmic Guarantees</h4>
                    <p className="text-xs text-slate-400">
                      We never make deceptive promises regarding Google keyword rankings, indexing velocity, or Domain Authority inflation.
                    </p>
                  </div>
                  <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
                    <h4 className="font-semibold text-white text-sm mb-1">Full Editorial Veto</h4>
                    <p className="text-xs text-slate-400">
                      FSI Digital retains the right to reject submissions, require factual edits, or decline destination URLs that fail quality standards.
                    </p>
                  </div>
                </div>
                <p className="text-xs text-slate-400">
                  By submitting an inquiry or ordering a publishing package, advertisers agree to these publishing guidelines. Review our full{" "}
                  <Link href="/advertise/editorial-guidelines" className="text-indigo-400 underline hover:text-indigo-300">
                    Editorial Standards &amp; Terms
                  </Link>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-xs font-bold tracking-widest text-indigo-600 uppercase mb-3">
                Frequently Asked Questions
              </h2>
              <p className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Everything You Need to Know Before Publishing
              </p>
            </div>

            <div className="space-y-6">
              {FAQS.map((faq, idx) => (
                <div key={idx} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-start gap-2">
                    <HelpCircle className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5" />
                    <span>{faq.q}</span>
                  </h3>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed pl-7">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final Conversion Banner */}
        <section className="py-20 bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 text-white text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Ready to Feature Your Brand on FSI Digital?
            </h2>
            <p className="text-slate-300 text-base sm:text-lg mb-8 leading-relaxed">
              Feature your platform and expertise alongside in-depth editorial research on business funding, grants, and commercial scaling.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/advertise/order/done-for-you"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-indigo-500 px-8 py-4 text-base font-bold text-white shadow-lg hover:bg-indigo-400 transition-colors"
              >
                Order Done-for-You Article ($225 USD)
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/advertise/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-800/80 px-8 py-4 text-base font-bold text-slate-200 hover:bg-slate-700 transition-colors"
              >
                Submit an Inquiry
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
