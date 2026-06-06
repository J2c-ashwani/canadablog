import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import type { ElementType } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { PartnerInquiryForm } from "@/components/PartnerInquiryForm"
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Building2,
  CheckCircle2,
  Clock3,
  CreditCard,
  Eye,
  FileSpreadsheet,
  Handshake,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react"
import { PARTNER_PACKAGES } from "@/lib/partners/packages"

export const metadata: Metadata = {
  title: "Buy Government Grant & Loan Leads | Business Funding Lead Generation",
  description:
    "Partner with FSI Digital to acquire high-intent business funding leads, commercial loan leads, and government grant leads in the USA & Canada. Stored TCPA/CASL compliance logs.",
  alternates: {
    canonical: "https://www.fsidigital.ca/partners",
  },
  robots: { index: true, follow: true },
}

const redactedLeadDemo = [
  {
    tier: "A",
    market: "British Columbia, Canada",
    industry: "Manufacturing",
    need: "Hiring, equipment, and expansion funding",
    range: "$100k-$500k",
    buyer: "Equipment finance or grant consultant",
  },
  {
    tier: "A",
    market: "Ontario, Canada",
    industry: "Technology",
    need: "R&D and innovation funding",
    range: "$100k-$500k",
    buyer: "Grant/SR&ED/IRAP consultant",
  },
  {
    tier: "B",
    market: "British Columbia, Canada",
    industry: "Retail / Wellness",
    need: "Growth capital and working capital",
    range: "$25k-$100k",
    buyer: "Business lender or financing broker",
  },
  {
    tier: "B",
    market: "California, USA",
    industry: "Clean Energy",
    need: "Equipment and expansion funding",
    range: "$500k-$1m",
    buyer: "Clean-tech funding advisor",
  },
]

function Metric({ label, value, icon: Icon }: { label: string; value: string; icon: ElementType }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4 inline-flex rounded-md bg-emerald-50 p-2 text-emerald-700">
        <Icon className="h-5 w-5" />
      </div>
      <div className="text-3xl font-bold text-gray-950">{value}</div>
      <div className="mt-1 text-sm font-semibold text-gray-600">{label}</div>
    </div>
  )
}

export default function FundingPartnerProgramPage() {
  const schemaOrgJSONLD = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "FSI Digital Business Funding Lead Generation",
    "description": "High-intent lead generation service matching commercial finance lenders and grant advisors with businesses searching for funding in Canada and the United States.",
    "provider": {
      "@type": "Organization",
      "name": "FSI Digital",
      "url": "https://www.fsidigital.ca"
    },
    "areaServed": [
      {
        "@type": "Country",
        "name": "Canada"
      },
      {
        "@type": "Country",
        "name": "United States"
      }
    ],
    "offers": {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": "50.00",
      "description": "Starter Pay-Per-Lead (CPL) models for business funding advisors."
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrgJSONLD) }}
      />
      <Header />
      <main className="bg-white">
        {/* Hero Section */}
        <section className="relative flex min-h-[68vh] items-center overflow-hidden bg-gray-950 py-20 text-white">
          <Image
            src="/og-image.png"
            alt="FSI Digital funding partner program"
            fill
            priority
            className="object-cover opacity-25"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/90 to-gray-950/55" />
          <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-semibold text-emerald-100 backdrop-blur-sm">
                <Handshake className="h-4 w-4" />
                Qualified business funding leads for approved partners
              </div>
              <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl text-slate-100">
                Get Exclusive Business Funding Leads
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-100">
                FSI Digital captures active search engine traffic from US and Canadian business owners seeking government grants, commercial business loans, and tax credits. Acquire pre-verified, intent-driven leads on a transparent pay-per-lead basis.
              </p>
              <div className="mt-6 grid max-w-3xl gap-3 text-sm font-semibold text-gray-100 sm:grid-cols-3">
                <div className="flex items-center gap-2 rounded-md border border-white/15 bg-white/10 px-3 py-2 backdrop-blur-sm">
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                  Lead Score & Quality Tier
                </div>
                <div className="flex items-center gap-2 rounded-md border border-white/15 bg-white/10 px-3 py-2 backdrop-blur-sm">
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                  Detailed Funding Intent Data
                </div>
                <div className="flex items-center gap-2 rounded-md border border-white/15 bg-white/10 px-3 py-2 backdrop-blur-sm">
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                  100% Consent-Based (TCPA/CASL)
                </div>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#inquiry-form"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-500 px-5 py-3 font-semibold text-gray-950 transition hover:bg-emerald-400"
                >
                  Apply as Lead Buyer
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#pricing"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-white/25 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/15"
                >
                  View Pilot Packages
                  <Eye className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Metrics Section */}
        <section className="border-b border-gray-200 bg-gray-50 py-8">
          <div className="container mx-auto grid gap-4 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
            <Metric label="Funding Intent Tracked Monthly" value="$12M+" icon={Target} />
            <Metric label="Lead Verification & Scoring" value="Automatic" icon={BarChart3} />
            <Metric label="Regulatory Compliance Checks" value="Passed" icon={ShieldCheck} />
          </div>
        </section>

        {/* Categories Section */}
        <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">Lead Categories</p>
              <h2 className="mt-3 text-3xl font-bold text-gray-950 sm:text-4xl">
                Built for advisors, lenders, and consultants who need buyer-ready commercial demand.
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-700">
                Stop chasing cold directories. Our landing pages capture active searches for business financing, matching qualified owners directly with your parameters.
              </p>
              <div className="mt-6 space-y-4 text-gray-700">
                <div className="flex gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-none text-emerald-600" />
                  <span><strong>Government Grant Leads:</strong> US & Canadian firms seeking public funding.</span>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-none text-emerald-600" />
                  <span><strong>Business Loan Leads:</strong> Owners looking for commercial loans & working capital.</span>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-none text-emerald-600" />
                  <span><strong>SR&ED & Tax Credit Leads:</strong> Corporations looking to claim innovation incentives.</span>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-3 flex items-center gap-3">
                  <div className="rounded-md bg-blue-50 p-2 text-blue-700">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-950">Shared CPL Leads</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Qualified business profiles containing verified company details, funding categories, and target geography. Distributed to a maximum of 3 verified partners to maximize speed and options for the applicant.
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-3 flex items-center gap-3">
                  <div className="rounded-md bg-emerald-50 p-2 text-emerald-700">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-950">Exclusive CPL Leads</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Single-distribution priority leads. Assigned exclusively to your advisory firm or lending brokerage for maximum contact rates and immediate pipeline injection.
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-3 flex items-center gap-3">
                  <div className="rounded-md bg-purple-50 p-2 text-purple-700">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-950">Booked Consultation Calls</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Warm handoffs where FSI Digital confirms basic criteria alignment, verifies partner consent, and schedules the intake call directly on your sales calendar.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sample Table */}
        <section id="lead-demo" className="scroll-mt-24 border-t border-gray-200 bg-gray-50 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">Lead Sourcing Samples</p>
                <h2 className="mt-3 text-3xl font-bold text-gray-950 sm:text-4xl">
                  Inspect lead data layouts before launching a pilot.
                </h2>
                <p className="mt-3 max-w-3xl text-gray-700">
                  Privacy and compliance are paramount. Personal contact data is fully redacted until formal approval and secure CPL distribution.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm">
                <Eye className="h-4 w-4 text-emerald-700" />
                No personal details shown
              </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-gray-100 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                    <tr>
                      <th className="px-4 py-3">Tier</th>
                      <th className="px-4 py-3">Market</th>
                      <th className="px-4 py-3">Industry</th>
                      <th className="px-4 py-3">Funding Need</th>
                      <th className="px-4 py-3">Range</th>
                      <th className="px-4 py-3">Likely Buyer</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {redactedLeadDemo.map((lead, index) => (
                      <tr key={index} className="align-top">
                        <td className="px-4 py-3">
                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                              lead.tier === "A" ? "bg-emerald-100 text-emerald-800" : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {lead.tier}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-semibold text-gray-900">{lead.market}</td>
                        <td className="px-4 py-3 text-gray-700">{lead.industry}</td>
                        <td className="min-w-56 px-4 py-3 text-gray-700">{lead.need}</td>
                        <td className="whitespace-nowrap px-4 py-3 font-semibold text-gray-900">{lead.range}</td>
                        <td className="min-w-56 px-4 py-3 text-gray-700">{lead.buyer}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="container mx-auto scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">PayPal pilot packages</p>
            <h2 className="mt-3 text-3xl font-bold text-gray-950 sm:text-4xl">Let approved partners start with a paid pilot.</h2>
            <p className="mt-3 text-gray-700">
              These packages use PayPal checkout. Payment records are logged internally, and lead delivery remains controlled so private business data is not exposed to unapproved buyers.
            </p>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {PARTNER_PACKAGES.map((partnerPackage) => (
              <div
                key={partnerPackage.id}
                className={`rounded-lg border bg-white p-6 shadow-sm ${
                  partnerPackage.popular ? "border-emerald-400 ring-2 ring-emerald-100" : "border-gray-200"
                }`}
              >
                {partnerPackage.popular && (
                  <div className="mb-4 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-800">
                    Recommended
                  </div>
                )}
                <h3 className="text-xl font-bold text-gray-950">{partnerPackage.name}</h3>
                <p className="mt-2 text-gray-600">{partnerPackage.description}</p>
                <div className="mt-5">
                  <span className="text-4xl font-bold text-gray-950">${partnerPackage.priceUsd.toLocaleString("en-US")}</span>
                  <span className="ml-2 text-sm font-semibold text-gray-500">USD</span>
                </div>
                <div className="mt-2 text-sm font-semibold text-emerald-700">
                  {partnerPackage.leadCount} · {partnerPackage.leadType}
                </div>
                <div className="mt-5 space-y-3">
                  {partnerPackage.features.map((feature) => (
                    <div key={feature} className="flex gap-3 text-sm text-gray-700">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-emerald-600" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-md bg-gray-50 p-3 text-xs text-gray-600">{partnerPackage.delivery}</div>
                <Link
                  href={`/partners/checkout?package=${partnerPackage.id}`}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-gray-950 px-4 py-3 font-semibold text-white transition hover:bg-gray-800"
                >
                  <CreditCard className="h-4 w-4" />
                  Pay with PayPal
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Lead Intelligence Section */}
        <section className="bg-gray-950 py-16 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-emerald-300">Lead intelligence</p>
                <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Every serious inquiry carries the fields buyers ask for.</h2>
                <p className="mt-4 text-lg leading-8 text-gray-300">
                  This gives FSI Digital cleaner pricing power: partners are not just buying an email address. They are buying categorized funding demand with context, routing, and compliance signals.
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                <div className="mb-5 flex items-center gap-3">
                  <FileSpreadsheet className="h-6 w-6 text-emerald-300" />
                  <h3 className="text-xl font-bold">Captured Signals</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-3 text-gray-200">
                    <BadgeCheck className="mt-0.5 h-5 w-5 flex-none text-emerald-300" />
                    <span>Province, state, country, industry, funding goal, and estimated funding range</span>
                  </div>
                  <div className="flex gap-3 text-gray-200">
                    <BadgeCheck className="mt-0.5 h-5 w-5 flex-none text-emerald-300" />
                    <span>Lead source, page path, timestamp, device context, and consent version</span>
                  </div>
                  <div className="flex gap-3 text-gray-200">
                    <BadgeCheck className="mt-0.5 h-5 w-5 flex-none text-emerald-300" />
                    <span>Tier, score, buyer segment, routing recommendation, and missing-field notes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Workflow & Lifecycle */}
        <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">Distribution Workflow</p>
              <h2 className="mt-3 text-3xl font-bold text-gray-950 sm:text-4xl">Start with proof, then price by quality.</h2>
              <p className="mt-4 text-lg leading-8 text-gray-700">
                A serious buyer will want volume, quality, freshness, exclusivity, and consent. The internal dashboard now creates the proof package needed to sell a pilot professionally.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                  <Clock3 className="mb-4 h-6 w-6 text-emerald-700" />
                  <h3 className="font-bold text-gray-950">Fast follow-up</h3>
                  <p className="mt-2 text-gray-600">Priority leads can be routed while buying intent is still fresh.</p>
                </div>
                <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                  <Users className="mb-4 h-6 w-6 text-blue-700" />
                  <h3 className="font-bold text-gray-950">Segment control</h3>
                  <p className="mt-2 text-gray-600">Partners can focus on manufacturing, technology, hiring, R&D, or lending.</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 flex flex-col justify-center">
              <h3 className="text-xl font-bold text-gray-950 mb-4">Lead Delivery Process</h3>
              <ol className="space-y-4 text-sm text-gray-700 list-decimal pl-4">
                <li><strong>Inquiry Captured:</strong> Business owner submits details on our site tools.</li>
                <li><strong>Clean Verification:</strong> Fake emails, typos, and burner domains are automatically filtered.</li>
                <li><strong>Intelligence Scored:</strong> Inquiries are scored based on metrics (Tiers A-D).</li>
                <li><strong>CPL Distribution:</strong> Lead details are routed to active partner portfolios.</li>
                <li><strong>Partner Follow-up:</strong> The partner receives the lead and initiates sales contact.</li>
              </ol>
            </div>
          </div>
        </section>

        {/* Regulatory Compliance Section */}
        <section className="bg-slate-50 border-t border-b border-slate-200 py-10">
          <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
            <h3 className="text-lg font-bold text-slate-900 mb-2">100% Consent-Based & Regulatory Compliant</h3>
            <p className="text-sm text-slate-600 max-w-3xl mx-auto leading-relaxed">
              FSI Digital operates in strict compliance with <strong>TCPA (Telephone Consumer Protection Act)</strong>, <strong>CASL (Canada Anti-Spam Legislation)</strong>, <strong>GDPR</strong>, and <strong>CCPA</strong> guidelines. Every lead profile carries time-stamped checkboxes certifying express written consent, IP tracking verification, and authorization logs.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-10">Frequently Asked Questions</h2>
          <div className="grid gap-6 max-w-4xl mx-auto">
            <div className="rounded-xl border border-slate-200 p-6">
              <h4 className="font-bold text-slate-900 mb-2">How fresh are the leads?</h4>
              <p className="text-slate-600 text-sm">Our leads are generated in real-time. Direct CPL distribution occurs instantly when a business owner finishes submitting their details on our site.</p>
            </div>
            <div className="rounded-xl border border-slate-200 p-6">
              <h4 className="font-bold text-slate-900 mb-2">What is your replacement policy for dead leads?</h4>
              <p className="text-slate-600 text-sm">We verify emails and filter disposable domains. If you receive a lead with a disconnected phone number or fake contact email, submit a replacement request within 3 days for a full credit replacement.</p>
            </div>
            <div className="rounded-xl border border-slate-200 p-6">
              <h4 className="font-bold text-slate-900 mb-2">Do you sell leads on a revenue share basis?</h4>
              <p className="text-slate-600 text-sm">No. We sell leads strictly on a Pay-Per-Lead (CPL) basis or booked call batches. This keeps pricing predictable and transparent for both parties.</p>
            </div>
          </div>
        </section>

        {/* Embed Inquiry Form Section */}
        <section id="inquiry-form" className="scroll-mt-24 bg-gray-50 border-t border-gray-200 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:max-w-4xl lg:px-8">
            <PartnerInquiryForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
