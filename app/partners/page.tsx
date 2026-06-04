import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import type { ElementType } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
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
  Mail,
  ShieldCheck,
  Target,
  Users,
} from 'lucide-react';
import { PARTNER_PACKAGES } from '@/lib/partners/packages';

export const metadata: Metadata = {
  title: 'Funding Partner Program | FSI Digital',
  description:
    'Partner with FSI Digital to receive consent-based business funding leads from Canadian and US companies looking for grants, loans, tax credits, and growth capital.',
  alternates: {
    canonical: 'https://www.fsidigital.ca/partners',
  },
  robots: { index: true, follow: true },
};

const leadProducts = [
  {
    name: 'Shared Qualified Leads',
    fit: 'Best for consultants who can handle volume and nurture.',
    details: 'Business inquiry with funding need, market, industry, source page, and consent status.',
  },
  {
    name: 'Exclusive Priority Leads',
    fit: 'Best for firms that want category or region exclusivity.',
    details: 'Higher-scored leads with stronger business detail, phone availability, and faster routing.',
  },
  {
    name: 'Booked Funding Calls',
    fit: 'Best for premium advisors with a clear intake process.',
    details: 'Warm handoff after FSI Digital confirms fit and the business agrees to partner follow-up.',
  },
];

const qualitySignals = [
  'Province, state, country, industry, funding goal, and estimated funding range',
  'Lead source, page path, timestamp, device context, and consent version',
  'Tier, score, buyer segment, routing recommendation, and missing-field notes',
];

const proofItems = [
  'Recent lead samples with personal details redacted before a pilot starts',
  'Trailing 7-day and 30-day lead volume from the internal dashboard',
  'Source mix by grant finder, calculator, contact forms, downloads, and newsletter',
  'Tier breakdown so partners can price raw, qualified, and exclusive leads separately',
];

const redactedLeadDemo = [
  {
    tier: 'A',
    market: 'British Columbia, Canada',
    industry: 'Manufacturing',
    need: 'Hiring, equipment, and expansion funding',
    range: '$100k-$500k',
    buyer: 'Equipment finance or grant consultant',
  },
  {
    tier: 'A',
    market: 'Ontario, Canada',
    industry: 'Technology',
    need: 'R&D and innovation funding',
    range: '$100k-$500k',
    buyer: 'Grant/SR&ED/IRAP consultant',
  },
  {
    tier: 'B',
    market: 'British Columbia, Canada',
    industry: 'Retail / Wellness',
    need: 'Growth capital and working capital',
    range: '$25k-$100k',
    buyer: 'Business lender or financing broker',
  },
  {
    tier: 'B',
    market: 'California, USA',
    industry: 'Clean Energy',
    need: 'Equipment and expansion funding',
    range: '$500k-$1m',
    buyer: 'Clean-tech funding advisor',
  },
];

function Metric({ label, value, icon: Icon }: { label: string; value: string; icon: ElementType }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4 inline-flex rounded-md bg-emerald-50 p-2 text-emerald-700">
        <Icon className="h-5 w-5" />
      </div>
      <div className="text-3xl font-bold text-gray-950">{value}</div>
      <div className="mt-1 text-sm font-semibold text-gray-600">{label}</div>
    </div>
  );
}

export default function FundingPartnerProgramPage() {
  return (
    <>
      <Header />
      <main className="bg-white">
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
                Qualified funding leads for approved partners
              </div>
              <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                Buy Qualified Business Funding Leads
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-100">
                FSI Digital captures Canadian and US businesses actively looking for grants, loans, tax credits, and
                growth capital. Partners can review redacted lead quality, choose a PayPal pilot package, and receive
                approved lead delivery after consent and fit review.
              </p>
              <div className="mt-6 grid max-w-3xl gap-3 text-sm font-semibold text-gray-100 sm:grid-cols-3">
                <div className="flex items-center gap-2 rounded-md border border-white/15 bg-white/10 px-3 py-2 backdrop-blur-sm">
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                  Lead score and tier
                </div>
                <div className="flex items-center gap-2 rounded-md border border-white/15 bg-white/10 px-3 py-2 backdrop-blur-sm">
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                  Funding intent data
                </div>
                <div className="flex items-center gap-2 rounded-md border border-white/15 bg-white/10 px-3 py-2 backdrop-blur-sm">
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                  Consent-based routing
                </div>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#pricing"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-500 px-5 py-3 font-semibold text-gray-950 transition hover:bg-emerald-400"
                >
                  View Pricing
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="#lead-demo"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-white/25 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/15"
                >
                  See Redacted Demo
                  <Eye className="h-4 w-4" />
                </Link>
              </div>
              <p className="mt-4 max-w-2xl text-sm text-gray-300">
                Private lead details are not publicly downloadable. Delivery happens after payment, approval, and
                consent review.
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-gray-200 bg-gray-50 py-8">
          <div className="container mx-auto grid gap-4 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
            <Metric label="Business funding intent captured" value="High" icon={Target} />
            <Metric label="Lead routing and scoring" value="A-D" icon={BarChart3} />
            <Metric label="Partner consent tracked" value="Yes" icon={ShieldCheck} />
          </div>
        </section>

        <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">Partner offer</p>
              <h2 className="mt-3 text-3xl font-bold text-gray-950 sm:text-4xl">
                Built for advisors, lenders, and grant consultants who need buyer-ready demand.
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-700">
                The site now captures structured business details, scores each inquiry, records partner-contact
                consent, and separates raw newsletter contacts from qualified funding leads.
              </p>
              <div className="mt-6 grid gap-3 text-gray-700">
                <div className="flex gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-none text-emerald-600" />
                  <span>Lead quality is scored before partner routing.</span>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-none text-emerald-600" />
                  <span>Consent text and consent version are stored with every partner-eligible inquiry.</span>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-none text-emerald-600" />
                  <span>Partners can pilot by category, geography, tier, or source funnel.</span>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              {leadProducts.map((product) => (
                <div key={product.name} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="rounded-md bg-blue-50 p-2 text-blue-700">
                      <Building2 className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-950">{product.name}</h3>
                  </div>
                  <p className="font-semibold text-gray-700">{product.fit}</p>
                  <p className="mt-2 text-gray-600">{product.details}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="lead-demo" className="scroll-mt-24 border-t border-gray-200 bg-gray-50 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">Redacted demo</p>
                <h2 className="mt-3 text-3xl font-bold text-gray-950 sm:text-4xl">
                  Buyers can review sample lead quality before private delivery.
                </h2>
                <p className="mt-3 max-w-3xl text-gray-700">
                  Personal details are hidden publicly. Approved partners receive private lead data only after payment,
                  consent review, and fulfillment approval.
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
                    {redactedLeadDemo.map((lead) => (
                      <tr key={`${lead.market}-${lead.industry}`} className="align-top">
                        <td className="px-4 py-3">
                          <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                            lead.tier === 'A' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                          }`}>
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

        <section id="pricing" className="container mx-auto scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">PayPal pilot packages</p>
            <h2 className="mt-3 text-3xl font-bold text-gray-950 sm:text-4xl">Let approved partners start with a paid pilot.</h2>
            <p className="mt-3 text-gray-700">
              These packages use PayPal checkout. Payment records are logged internally, and lead delivery remains
              controlled so private business data is not exposed to unapproved buyers.
            </p>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {PARTNER_PACKAGES.map((partnerPackage) => (
              <div
                key={partnerPackage.id}
                className={`rounded-lg border bg-white p-6 shadow-sm ${
                  partnerPackage.popular ? 'border-emerald-400 ring-2 ring-emerald-100' : 'border-gray-200'
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
                  <span className="text-4xl font-bold text-gray-950">${partnerPackage.priceUsd.toLocaleString('en-US')}</span>
                  <span className="ml-2 text-sm font-semibold text-gray-500">USD</span>
                </div>
                <div className="mt-2 text-sm font-semibold text-emerald-700">{partnerPackage.leadCount} · {partnerPackage.leadType}</div>
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

        <section className="bg-gray-950 py-16 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-emerald-300">Lead intelligence</p>
                <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Every serious inquiry carries the fields buyers ask for.</h2>
                <p className="mt-4 text-lg leading-8 text-gray-300">
                  This gives FSI Digital cleaner pricing power: partners are not just buying an email address. They are
                  buying categorized funding demand with context, routing, and compliance signals.
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                <div className="mb-5 flex items-center gap-3">
                  <FileSpreadsheet className="h-6 w-6 text-emerald-300" />
                  <h3 className="text-xl font-bold">Captured Signals</h3>
                </div>
                <div className="space-y-4">
                  {qualitySignals.map((signal) => (
                    <div key={signal} className="flex gap-3 text-gray-200">
                      <BadgeCheck className="mt-0.5 h-5 w-5 flex-none text-emerald-300" />
                      <span>{signal}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">Pilot process</p>
              <h2 className="mt-3 text-3xl font-bold text-gray-950 sm:text-4xl">
                Start with proof, then price by quality.
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-700">
                A serious buyer will want volume, quality, freshness, exclusivity, and consent. The internal dashboard
                now creates the proof package needed to sell a pilot professionally.
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
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
              <h3 className="text-xl font-bold text-gray-950">What partners can request</h3>
              <div className="mt-5 space-y-4">
                {proofItems.map((item) => (
                  <div key={item} className="flex gap-3 text-gray-700">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-emerald-600" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-gray-200 bg-gray-50 py-14">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">Partner inquiry</p>
                <h2 className="mt-2 text-3xl font-bold text-gray-950">Want funding leads from FSI Digital?</h2>
                <p className="mt-3 max-w-2xl text-gray-700">
                  Send your target market, preferred lead type, region, and monthly capacity. We will review fit before
                  sharing any private lead details.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-gray-950 px-5 py-3 font-semibold text-white transition hover:bg-gray-800"
                >
                  <Mail className="h-4 w-4" />
                  Contact FSI Digital
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
