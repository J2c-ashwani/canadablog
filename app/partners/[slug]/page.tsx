import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
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

export const revalidate = 86400 // Revalidate once a day

// Map of all programmatic partner slugs and their customized content
interface SlugContent {
  title: string
  metaDescription: string
  h1: string
  subheading: string
  leadType: string
  geography: string
}

const SLUG_MAP: Record<string, SlugContent> = {
  "business-loan-leads": {
    title: "Buy High-Intent Business Loan Leads | Exclusive Loan Leads",
    metaDescription: "Acquire verified small business loan leads, merchant cash advance (MCA) leads, and commercial financing leads in USA & Canada. Apply for our lead pilot today.",
    h1: "Buy High-Intent Business Loan Leads",
    subheading: "Connect with real business owners actively seeking business loans, lines of credit, MCA, and commercial financing solutions.",
    leadType: "Business Loan & Debt Leads",
    geography: "Canada & United States",
  },
  "government-grant-leads": {
    title: "Buy Government Grant Leads | Verified Business Subsidy Leads",
    metaDescription: "Purchase qualified government grant leads for Canada and USA companies. Tap into active business owners searching for non-repayable grants and subsidies.",
    h1: "Buy Verified Government Grant Leads",
    subheading: "Acquire qualified leads of North American companies actively seeking federal, provincial, state, and local government grant programs.",
    leadType: "Government Grant Leads",
    geography: "Canada & United States",
  },
  "startup-funding-leads": {
    title: "Startup Funding Leads | Buy Venture & Angel Equity Leads",
    metaDescription: "Access pre-screened startup funding leads in the USA and Canada. Match with tech startups and business owners seeking equity, angel, and venture capital.",
    h1: "Buy Startup Funding & Venture Leads",
    subheading: "Connect with innovative, investor-ready startups looking for equity capital, angel investment, and venture capital partnerships.",
    leadType: "Equity & VC Funding Leads",
    geography: "Canada & United States",
  },
  "tax-credit-leads": {
    title: "Tax Credit Leads | Buy SR&ED & Innovation Tax Leads",
    metaDescription: "Purchase high-converting tax credit leads. Match with businesses actively seeking assistance with scientific research, innovation, and corporate tax credits.",
    h1: "Buy Innovation Tax Credit Leads",
    subheading: "Access verified companies looking to claim government tax credits, research & development incentives, and technical tax rebates.",
    leadType: "SR&ED / Tax Credit Leads",
    geography: "Canada & United States",
  },
  "sred-leads": {
    title: "Buy SR&ED Tax Credit Leads | Verified Canadian R&D Leads",
    metaDescription: "Looking to buy Canadian SR&ED leads? Partner with us to receive pre-screened technology, manufacturing, and biotech companies in Canada seeking SR&ED claims.",
    h1: "Buy Canadian SR&ED Tax Credit Leads",
    subheading: "Connect with Canadian tech, agricultural, and manufacturing corporations looking for specialized SR&ED tax consultants.",
    leadType: "SR&ED / Tax Credit Leads",
    geography: "Canada Only",
  },
  "canada-funding-leads": {
    title: "Buy Canadian Business Funding Leads | Grants & Loans Canada",
    metaDescription: "Get high-intent Canadian business funding leads. Connect with companies looking for BDC loans, commercial financing, and federal grants in Canada.",
    h1: "Buy Canadian Business Funding Leads",
    subheading: "Access pre-screened Canadian business owners seeking government grants, commercial business loans, and growth capital.",
    leadType: "All / Mixed Funding Leads",
    geography: "Canada Only",
  },
  "usa-funding-leads": {
    title: "Buy USA Business Funding Leads | Commercial SBA Leads",
    metaDescription: "Acquire USA business funding leads. Buy high-intent SBA loan leads, commercial financing, working capital, and federal grant leads for American firms.",
    h1: "Buy USA Business Funding Leads",
    subheading: "Connect with verified American business owners actively seeking SBA commercial loans, federal/state grants, and equipment financing.",
    leadType: "All / Mixed Funding Leads",
    geography: "United States Only",
  },
  "merchant-cash-advance-leads": {
    title: "Buy Merchant Cash Advance Leads | MCA Leads USA & Canada",
    metaDescription: "Buy exclusive, high-intent MCA leads and merchant cash advance leads. Verified business owners seeking working capital in the USA & Canada.",
    h1: "Buy High-Volume Merchant Cash Advance (MCA) Leads",
    subheading: "Connect directly with active business owners looking for rapid working capital, cash advances, and unsecured short-term funding.",
    leadType: "Business Loan & Debt Leads",
    geography: "Canada & United States",
  },
  "equipment-financing-leads": {
    title: "Buy Equipment Financing Leads | Equipment Leasing Leads",
    metaDescription: "Buy exclusive equipment financing and leasing leads. Access qualified businesses in manufacturing, construction, and transport seeking equipment capital.",
    h1: "Buy Equipment Financing & Leasing Leads",
    subheading: "Acquire pre-verified commercial profiles of businesses seeking equipment leasing, vehicle financing, and machinery capital.",
    leadType: "Business Loan & Debt Leads",
    geography: "Canada & United States",
  },
  "working-capital-leads": {
    title: "Buy Working Capital Leads | Commercial Business Loan Leads",
    metaDescription: "Acquire verified working capital leads and commercial business loan leads. Connect with active founders seeking lines of credit and inventory finance.",
    h1: "Buy Working Capital & Credit Line Leads",
    subheading: "Tap into daily search queries from business owners looking for working capital, accounts receivable financing, and lines of credit.",
    leadType: "Business Loan & Debt Leads",
    geography: "Canada & United States",
  },
  "commercial-real-estate-leads": {
    title: "Buy Commercial Real Estate Financing Leads | CRE Mortgages",
    metaDescription: "Purchase high-intent commercial real estate leads and CRE financing leads. Active developers and investors seeking commercial mortgage capital.",
    h1: "Buy Commercial Real Estate Financing Leads",
    subheading: "Connect with real estate developers, commercial property buyers, and investors seeking commercial mortgages and construction loans.",
    leadType: "Business Loan & Debt Leads",
    geography: "Canada & United States",
  },
  "sbir-grant-leads": {
    title: "Buy SBIR Grant Leads | STTR Federal R&D Innovation Leads",
    metaDescription: "Buy high-value SBIR grant leads. Tech startups and research labs seeking federal SBIR and STTR innovation funding in the United States.",
    h1: "Buy SBIR & STTR Innovation Grant Leads",
    subheading: "Connect with biotech, hardware, and software companies seeking professional SBIR grant consultants and research proposal writers.",
    leadType: "Government Grant Leads",
    geography: "United States Only",
  },
  "usda-grant-leads": {
    title: "Buy USDA Grant Leads | Rural Business & Agriculture Leads",
    metaDescription: "Access USDA grant leads. Connect with rural businesses, farmers, and agricultural enterprises seeking federal USDA funding and REAP grants.",
    h1: "Buy USDA & Rural Business Grant Leads",
    subheading: "Verified rural business owners and farmers seeking USDA rural development grants, farm subsidies, and green energy financing.",
    leadType: "Government Grant Leads",
    geography: "United States Only",
  },
  "clean-energy-grant-leads": {
    title: "Buy Clean Energy & Green Grants Leads | CleanTech Funding",
    metaDescription: "Buy green energy and cleantech grant leads. Commercial businesses seeking environmental grants, tax credits, and sustainability funding.",
    h1: "Buy Clean Energy & Green Grant Leads",
    subheading: "Acquire leads of commercial facilities, clean-tech startups, and agricultural operations looking for environmental grants.",
    leadType: "All / Mixed Funding Leads",
    geography: "Canada & United States",
  },
  "women-owned-business-leads": {
    title: "Buy Women-Owned Business Leads | Diversity Grant & Loan Leads",
    metaDescription: "Acquire women entrepreneur grant and loan leads. Connect with diversity-focused businesses seeking specialized funding programs.",
    h1: "Buy Women-Owned Business Funding Leads",
    subheading: "Connect with female entrepreneurs seeking diversity business grants, SBA women-owned business loans, and startup capital.",
    leadType: "All / Mixed Funding Leads",
    geography: "Canada & United States",
  },
  "nonprofit-grant-leads": {
    title: "Buy Nonprofit Grant Leads | NGO & Charity Funding Leads",
    metaDescription: "Access pre-screened nonprofit grant leads. Charities, NGOs, and community foundations seeking grant writing and corporate funding.",
    h1: "Buy Nonprofit & Charity Grant Leads",
    subheading: "Connect with charitable foundations, NGOs, and community organizations looking for federal, state, and private foundation grants.",
    leadType: "Government Grant Leads",
    geography: "Canada & United States",
  },
  "invoice-financing-leads": {
    title: "Buy Invoice Financing & Factoring Leads | Verified B2B Leads",
    metaDescription: "Acquire verified invoice financing leads and factoring leads. Connect with B2B companies looking for invoice discounting and account factoring solutions.",
    h1: "Buy Invoice Financing & Factoring Leads",
    subheading: "Connect with business owners seeking factoring services, AR financing, and cash flow acceleration tools.",
    leadType: "Invoice Factoring & AR Leads",
    geography: "Canada & United States",
  },
  "purchase-order-financing-leads": {
    title: "Buy Purchase Order Financing Leads | Verified PO Funding",
    metaDescription: "Buy high-intent purchase order financing leads. Connect with wholesalers, distributors, and manufacturers seeking trade finance and PO funding.",
    h1: "Buy Verified Purchase Order Financing Leads",
    subheading: "Access active wholesalers and distributors looking for purchase order funding to fulfill customer orders.",
    leadType: "Trade & PO Financing Leads",
    geography: "Canada & United States",
  },
  "asset-based-lending-leads": {
    title: "Buy Asset-Based Lending Leads | Commercial ABL Leads",
    metaDescription: "Purchase high-intent asset-based lending (ABL) leads. Connect with mid-market companies seeking line of credit structured against inventory & assets.",
    h1: "Buy Asset-Based Lending (ABL) Leads",
    subheading: "Connect with commercial borrowers seeking capital secured by accounts receivable, inventory, and equipment assets.",
    leadType: "Asset-Based Lending Leads",
    geography: "Canada & United States",
  },
  "sba-loan-leads": {
    title: "Buy SBA Loan Leads | USA Commercial SBA 7(a) & 504 Leads",
    metaDescription: "Purchase high-converting SBA loan leads. Match with American small business owners seeking SBA 7(a), SBA 504, and microloan financing options.",
    h1: "Buy USA SBA Loan Leads",
    subheading: "Access active business owners seeking SBA-guaranteed funding for acquisition, real estate, or working capital.",
    leadType: "SBA Loan & Debt Leads",
    geography: "United States Only",
  },
  "agriculture-funding-leads": {
    title: "Buy Agriculture & Farm Funding Leads | Agricultural Financing",
    metaDescription: "Access agricultural grant and farm loan leads. Connect with farmers, agro-businesses, and producers looking for agriculture grants and USDA financing.",
    h1: "Buy Agricultural & Farm Funding Leads",
    subheading: "Connect with B2B agricultural business owners seeking crop financing, farm equipment loans, and agricultural subsidies.",
    leadType: "Agricultural Funding Leads",
    geography: "Canada & United States",
  },
  "franchise-financing-leads": {
    title: "Buy Franchise Financing Leads | Verified Franchise Loan Leads",
    metaDescription: "Buy premium franchise financing and loan leads. Match with franchise buyers and operators looking for startup capital or multi-unit expansion loans.",
    h1: "Buy Franchise Financing & Expansion Leads",
    subheading: "Acquire verified leads of prospective and existing franchise owners looking for commercial startup or acquisition capital.",
    leadType: "Business Loan & Debt Leads",
    geography: "Canada & United States",
  },
  "accounts-receivable-factoring-leads": {
    title: "Buy Accounts Receivable Factoring Leads | AR Discounting Leads",
    metaDescription: "Acquire high-converting accounts receivable factoring leads. Match with B2B service firms and suppliers seeking invoice cash flow advances.",
    h1: "Buy Accounts Receivable Factoring Leads",
    subheading: "Get matched with B2B suppliers and service providers seeking cash flow advances on outstanding client invoices.",
    leadType: "Invoice Factoring & AR Leads",
    geography: "Canada & United States",
  },
  "bridge-loan-leads": {
    title: "Buy Commercial Bridge Loan Leads | Business Bridge Financing",
    metaDescription: "Purchase commercial bridge loan leads. Connect with business owners and real estate investors looking for short-term bridge financing and interim debt.",
    h1: "Buy Commercial Bridge Loan Leads",
    subheading: "Connect with borrowers looking for interim B2B debt, commercial bridge financing, and short-term capital transitions.",
    leadType: "Business Loan & Debt Leads",
    geography: "Canada & United States",
  },
  "rd-tax-credit-leads": {
    title: "Buy R&D Tax Credit Leads | Federal Research Incentive Leads",
    metaDescription: "Access premium R&D tax credit leads. Match with tech startups and corporations seeking assistance with research & development tax incentive claims.",
    h1: "Buy R&D Tax Credit & Incentive Leads",
    subheading: "Connect with high-growth technology and engineering firms looking to claim innovation tax rebates.",
    leadType: "SR&ED / Tax Credit Leads",
    geography: "Canada & United States",
  },
  "export-funding-leads": {
    title: "Buy Export Funding & Trade Finance Leads | Global Trade Leads",
    metaDescription: "Purchase global trade finance and export funding leads. Connect with domestic exporters seeking government trade credits and export loans.",
    h1: "Buy Export Funding & Trade Finance Leads",
    subheading: "Connect with North American exporters seeking trade credit insurance, working capital, and international export grants.",
    leadType: "All / Mixed Funding Leads",
    geography: "Canada & United States",
  },
  "venture-debt-leads": {
    title: "Buy Venture Debt Leads | Venture Lending B2B Leads",
    metaDescription: "Buy tech startup venture debt leads. Connect with venture-backed software, biotech, and hardware founders seeking non-dilutive lending solutions.",
    h1: "Buy Tech Venture Debt Leads",
    subheading: "Connect with high-growth startup founders looking to extend cash runway without equity dilution.",
    leadType: "Equity & VC Funding Leads",
    geography: "Canada & United States",
  },
  "business-line-of-credit-leads": {
    title: "Buy Business Line of Credit Leads | Commercial Credit Leads",
    metaDescription: "Access business line of credit leads. Connect with verified business owners looking to establish commercial credit lines or revolving capital.",
    h1: "Buy Business Line of Credit Leads",
    subheading: "Match with active company founders looking for revolving commercial credit lines and working capital safety nets.",
    leadType: "Business Loan & Debt Leads",
    geography: "Canada & United States",
  },
  "unsecured-business-loan-leads": {
    title: "Buy Unsecured Business Loan Leads | No-Collateral Financing",
    metaDescription: "Purchase high-converting unsecured business loan leads. Connect with companies seeking B2B debt and business loans without personal or asset collateral.",
    h1: "Buy Unsecured Business Loan Leads",
    subheading: "Connect with B2B business owners searching for quick, no-collateral commercial financing and short-term debt.",
    leadType: "Business Loan & Debt Leads",
    geography: "Canada & United States",
  },
  "minority-owned-business-leads": {
    title: "Buy Minority-Owned Business Leads | Diversity Grant & Loans",
    metaDescription: "Access minority business grant and loan leads. Connect with BIPOC-owned businesses seeking specialized federal and private diversity funding.",
    h1: "Buy Minority-Owned Business Funding Leads",
    subheading: "Connect with minority business owners seeking diversity grants, certifications, and minority business loans.",
    leadType: "All / Mixed Funding Leads",
    geography: "Canada & United States",
  },
}

export async function generateStaticParams() {
  return Object.keys(SLUG_MAP).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const content = SLUG_MAP[slug]

  if (!content) {
    return {
      title: "Page Not Found | FSI Digital",
      robots: { index: false, follow: false },
    }
  }

  return {
    title: content.title,
    description: content.metaDescription,
    alternates: {
      canonical: `https://www.fsidigital.ca/partners/${slug}`,
    },
    robots: { index: true, follow: true },
  }
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

export default async function ProgrammaticPartnerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const content = SLUG_MAP[slug]

  if (!content) {
    notFound()
  }

  return (
    <>
      <Header />
      <main className="bg-white">
        {/* Dynamic Hero Section */}
        <section className="relative flex min-h-[60vh] items-center overflow-hidden bg-gray-950 py-20 text-white">
          <Image
            src="/og-image.png"
            alt={content.title}
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
                Qualified B2B funding leads for approved partners
              </div>
              <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl text-slate-100">
                {content.h1}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-100">
                {content.subheading} FSI Digital captures active search demand from founders seeking growth resources. Pre-qualify applicants, verify intent, and receive real-time delivery on a pure pay-per-lead basis.
              </p>
              <div className="mt-6 grid max-w-3xl gap-3 text-sm font-semibold text-gray-100 sm:grid-cols-3">
                <div className="flex items-center gap-2 rounded-md border border-white/15 bg-white/10 px-3 py-2 backdrop-blur-sm">
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                  Verified Contact Information
                </div>
                <div className="flex items-center gap-2 rounded-md border border-white/15 bg-white/10 px-3 py-2 backdrop-blur-sm">
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                  Detailed Intent Criteria
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
                  <CreditCard className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Metrics Banner */}
        <section className="border-b border-gray-200 bg-gray-50 py-8">
          <div className="container mx-auto grid gap-4 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
            <Metric label="Funding Intent Tracked Monthly" value="$12M+" icon={Target} />
            <Metric label="Lead Quality Verification" value="Automatic" icon={BarChart3} />
            <Metric label="Consent & Compliance Records" value="Stored" icon={ShieldCheck} />
          </div>
        </section>

        {/* Lead Categories Grid */}
        <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">Lead Categories</p>
              <h2 className="mt-3 text-3xl font-bold text-gray-950 sm:text-4xl">
                High-intent business inquiries organized by funding needs.
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-700">
                Instead of buying unverified raw email contact lists, our partners receive structured funding request profiles complete with pre-calculated eligibility scores.
              </p>
              <div className="mt-6 space-y-4">
                <div className="flex gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-none text-emerald-600" />
                  <span><strong>Government Grant Leads:</strong> Businesses in Canada & US searching for grants.</span>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-none text-emerald-600" />
                  <span><strong>Business Loan Leads:</strong> Owners seeking lines of credit or expansion loans.</span>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-none text-emerald-600" />
                  <span><strong>SR&ED & Tax Credit Leads:</strong> Corporate files looking for technology/R&D tax credits.</span>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-950 flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-emerald-700" /> Shared CPL Leads
                </h3>
                <p className="mt-2 text-gray-600 text-sm">
                  Qualified business profiles containing verified company details, funding categories, and target geography. Distributed to a maximum of 3 verified partners to maximize speed and options for the applicant.
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-950 flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-emerald-700" /> Exclusive CPL Leads
                </h3>
                <p className="mt-2 text-gray-600 text-sm">
                  Single-distribution priority leads. Assigned exclusively to your advisory firm or lending brokerage for maximum contact rates and immediate pipeline injection.
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-950 flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-emerald-700" /> Booked Consultations
                </h3>
                <p className="mt-2 text-gray-600 text-sm">
                  Warm handoffs where FSI Digital confirms basic criteria alignment, verifies partner consent, and schedules the intake call directly on your sales calendar.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Lead Demo Table */}
        <section id="lead-demo" className="border-t border-gray-200 bg-gray-50 py-16">
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
                Redacted Demo View
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
                    {redactedLeadDemo.map((lead, idx) => (
                      <tr key={idx} className="align-top">
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

        {/* PayPal Pilot pricing packages */}
        <section id="pricing" className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">PayPal Starter Pilots</p>
            <h2 className="mt-3 text-3xl font-bold text-gray-950 sm:text-4xl">
              Launch a pilot batch to test lead-to-deal conversion rates.
            </h2>
            <p className="mt-3 text-gray-700">
              Approved B2B partners can purchase a starter package via secure PayPal checkout. Leads are hand-delivered upon application validation.
            </p>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {PARTNER_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`rounded-lg border bg-white p-6 shadow-sm ${
                  pkg.popular ? "border-emerald-400 ring-2 ring-emerald-100" : "border-gray-200"
                }`}
              >
                {pkg.popular && (
                  <div className="mb-4 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-800">
                    Recommended
                  </div>
                )}
                <h3 className="text-xl font-bold text-gray-950">{pkg.name}</h3>
                <p className="mt-2 text-gray-600">{pkg.description}</p>
                <div className="mt-5">
                  <span className="text-4xl font-bold text-gray-950">${pkg.priceUsd.toLocaleString("en-US")}</span>
                  <span className="ml-2 text-sm font-semibold text-gray-500">USD</span>
                </div>
                <div className="mt-2 text-sm font-semibold text-emerald-700">
                  {pkg.leadCount} · {pkg.leadType}
                </div>
                <div className="mt-5 space-y-3">
                  {pkg.features.map((feature) => (
                    <div key={feature} className="flex gap-3 text-sm text-gray-700">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-emerald-600" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-md bg-gray-50 p-3 text-xs text-gray-600">{pkg.delivery}</div>
                <Link
                  href={`/partners/checkout?package=${pkg.id}`}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-gray-950 px-4 py-3 font-semibold text-white transition hover:bg-gray-800"
                >
                  <CreditCard className="h-4 w-4" />
                  Pay with PayPal
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Lead Sourcing and Intelligence */}
        <section className="bg-gray-950 py-16 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-emerald-300">Lead Sourcing Engine</p>
                <h2 className="mt-3 text-3xl font-bold sm:text-4xl">How We Acquire Verified Search Intent</h2>
                <p className="mt-4 text-lg leading-8 text-gray-300 font-light">
                  Our leads are acquired directly through search engine traffic. Business owners searching for grants, SBA loans, MCA financing, or tax write-offs find our calculators, calendar deadlines, and editorial guides, submitting structured applications with explicit consent to receive third-party advisor matches.
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                <div className="mb-5 flex items-center gap-3">
                  <FileSpreadsheet className="h-6 w-6 text-emerald-300" />
                  <h3 className="text-xl font-bold">Captured Intelligence</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-3 text-gray-200">
                    <BadgeCheck className="mt-0.5 h-5 w-5 flex-none text-emerald-300" />
                    <span>Company size, target funding amount, industry category, and localization parameters.</span>
                  </div>
                  <div className="flex gap-3 text-gray-200">
                    <BadgeCheck className="mt-0.5 h-5 w-5 flex-none text-emerald-300" />
                    <span>IP address, referral URL, browser user agent, and timestamp signals.</span>
                  </div>
                  <div className="flex gap-3 text-gray-200">
                    <BadgeCheck className="mt-0.5 h-5 w-5 flex-none text-emerald-300" />
                    <span>Specific consent timestamps, check values, and legal validation records.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lead Delivery Flowchart */}
        <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">Distribution Workflow</p>
              <h2 className="mt-3 text-3xl font-bold text-gray-950 sm:text-4xl">
                A seamless 5-step delivery pipeline.
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-700">
                We maintain active buyer networks so inquiries are distributed instantly while search intent remains fresh.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                  <Clock3 className="mb-4 h-6 w-6 text-emerald-700" />
                  <h3 className="font-bold text-gray-950">Immediate Routing</h3>
                  <p className="mt-2 text-sm text-gray-600">Leads are delivered via secure dashboard access or API webhook within minutes.</p>
                </div>
                <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                  <Users className="mb-4 h-6 w-6 text-blue-700" />
                  <h3 className="font-bold text-gray-950">Segment Control</h3>
                  <p className="mt-2 text-sm text-gray-600">Filter incoming batches by region, monthly capacity, industry, or specific funding categories.</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 flex flex-col justify-center">
              <h3 className="text-xl font-bold text-gray-950 mb-4">Lead Lifecycle</h3>
              <ol className="space-y-4 text-sm text-gray-700 list-decimal pl-4">
                <li><strong>Demand Capture:</strong> Founder fills out eligibility finder or loan calculator.</li>
                <li><strong>Spam Filtering:</strong> Email domain check, disposable blocklist validation, and phone structure checks.</li>
                <li><strong>Lead Scoring:</strong> Score calculation (A-D) based on funding ranges and timeframe urgency.</li>
                <li><strong>Distribution Match:</strong> Route matches approved parameters of registered CPL buyers.</li>
                <li><strong>Partner Nurture:</strong> Partner receives notification and initiates direct advisory contact.</li>
              </ol>
            </div>
          </div>
        </section>

        {/* Compliance notice */}
        <section className="bg-slate-50 border-t border-b border-slate-200 py-10">
          <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
            <h3 className="text-lg font-bold text-slate-900 mb-2">100% Consent-Based & Regulatory Compliant</h3>
            <p className="text-sm text-slate-600 max-w-3xl mx-auto leading-relaxed">
              FSI Digital operates in strict compliance with <strong>TCPA (Telephone Consumer Protection Act)</strong>, <strong>CASL (Canada Anti-Spam Legislation)</strong>, <strong>GDPR</strong>, and <strong>CCPA</strong> guidelines. Every lead profile carries stored checkboxes certifying express written consent, IP tracking verification, and time-stamped authorization records.
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

        {/* Embed Intake Form Section */}
        <section id="inquiry-form" className="scroll-mt-24 bg-gray-50 border-t border-gray-200 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:max-w-4xl lg:px-8">
            <PartnerInquiryForm
              initialLeadType={content.leadType}
              initialGeography={content.geography}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
