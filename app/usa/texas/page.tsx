import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { GrantComparisonTable } from "@/components/grant-comparison-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, DollarSign, Users, TrendingUp, CheckCircle, ArrowRight, Building, Lightbulb, FileText, AlertCircle, Star, Zap } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import type { Grant } from "@/lib/grants-data"
import ShortAnswerBox from "@/components/blog/ShortAnswerBox"
import EEATBadge from "@/components/blog/EEATBadge"
import EligibleCheck from "@/components/blog/EligibleCheck"

export const metadata: Metadata = {
  title: "Texas Business Grants 2026 | TX State Funding, SBIR & Incentives Guide",
  description:
    "Complete guide to Texas business grants and state funding in 2026. Texas Enterprise Fund, Emerging Technology Fund, $300M+ annual SBIR awards, no state income tax advantage, and workforce training programs for TX businesses of all sizes.",
  keywords:
    "Texas business grants 2026, Texas state funding, startup grants Texas, Texas Enterprise Fund, Texas Emerging Technology Fund, TX SBIR grants, Texas small business funding, Texas no income tax, Texas startup incentives",
  alternates: {
    canonical: "https://www.fsidigital.ca/usa/texas",
  },
  openGraph: {
    title: "Texas Business Grants 2026 | Complete TX Funding Guide",
    description: "Discover Texas business grants, SBIR advantages, and state incentives for startups and SMBs in 2026.",
    url: "https://www.fsidigital.ca/usa/texas",
  },
}

const texasGrants: Grant[] = [
  {
    id: "tx-enterprise-fund",
    name: "Texas Enterprise Fund (TEF)",
    fundingMin: 500000,
    fundingMax: 10000000,
    eligibility: ["Companies relocating HQ to Texas", "Businesses undergoing significant expansion", "Competing with another state or country for the project"],
    deadline: "Applications reviewed on rolling basis by Governor's office",
    applicationLink: "https://gov.texas.gov/business/page/texas-enterprise-fund",
    description: "Governor-administered 'deal-closing' fund that provides direct grants to businesses choosing to relocate or expand in Texas over competing states or countries.",
    country: "USA",
    region: "Texas",
    category: "Relocation/Expansion",
    agency: "Office of the Governor — Economic Development",
    status: "Active",
    tags: ["Relocation", "Expansion", "Job Creation"],
    requirements: ["Competing location (another state or country)", "Minimum job commitment", "Average salary above state average", "Multi-year commitment"],
    lastUpdated: "2025-01-20"
  },
  {
    id: "tx-etf",
    name: "Texas Emerging Technology Fund (ETF)",
    fundingMin: 250000,
    fundingMax: 3000000,
    eligibility: ["Texas-based tech companies and startups", "Companies with federal grant matching", "University research commercialization"],
    deadline: "Rolling applications through regional centers",
    applicationLink: "https://gov.texas.gov/business/page/emerging-technology-fund",
    description: "Invests in Texas companies developing commercializable technology, with priority for those leveraging federal SBIR/STTR awards and university partnerships.",
    country: "USA",
    region: "Texas",
    category: "Technology",
    agency: "Office of the Governor — Science & Innovation",
    status: "Active",
    tags: ["Technology", "R&D", "SBIR Match"],
    requirements: ["Texas-based company", "Commercial technology development", "University or federal grant connection preferred"],
    lastUpdated: "2025-01-20"
  },
  {
    id: "tx-skills",
    name: "Texas Skills Development Fund",
    fundingMin: 5000,
    fundingMax: 500000,
    eligibility: ["Texas for-profit businesses", "Workforce training for current and new employees", "All industry sectors"],
    deadline: "Rolling through local community colleges",
    applicationLink: "https://gov.texas.gov/business/page/skills-development-fund",
    description: "Reimburses businesses for customized job training delivered through Texas community colleges. Covers training design, delivery, and assessment costs.",
    country: "USA",
    region: "Texas",
    category: "Workforce",
    agency: "Texas Workforce Commission",
    status: "Active",
    tags: ["Workforce Training", "Community College", "Skills"],
    requirements: ["TX for-profit company", "Community college partner", "Minimum trainee count", "Documented training outcomes"],
    lastUpdated: "2025-01-20"
  },
  {
    id: "tx-sbir-matching",
    name: "Texas SBIR/STTR Matching Program",
    fundingMin: 50000,
    fundingMax: 250000,
    eligibility: ["Texas companies that have won a federal SBIR or STTR award", "Phase I and Phase II awardees"],
    deadline: "Rolling",
    applicationLink: "https://gov.texas.gov/uploads/files/business/SBIR-STTR-Matching-Program.pdf",
    description: "State co-investment matching federal SBIR/STTR grants for Texas-based companies, providing an additional 50% in non-dilutive state matching funds.",
    country: "USA",
    region: "Texas",
    category: "SBIR Match",
    agency: "Texas Economic Development Corporation",
    status: "Active",
    tags: ["SBIR", "STTR", "Federal Match"],
    requirements: ["Active federal SBIR or STTR award", "Texas-based company", "Matching application submitted within 90 days of award"],
    lastUpdated: "2025-01-20"
  },
  {
    id: "tx-capital-access",
    name: "Texas Capital Access Program (CAP)",
    fundingMin: 25000,
    fundingMax: 750000,
    eligibility: ["Texas small businesses", "Companies unable to secure conventional bank financing", "Businesses in underserved markets"],
    deadline: "Through participating lenders (rolling)",
    applicationLink: "https://gov.texas.gov/business/page/capital-access-program",
    description: "Loan loss reserve program that encourages Texas banks to make loans to small businesses and nonprofits that face barriers to conventional financing.",
    country: "USA",
    region: "Texas",
    category: "Capital Access",
    agency: "Texas Treasury Safekeeping Trust Company",
    status: "Active",
    tags: ["Loan Guarantee", "Small Business", "Capital Access"],
    requirements: ["Texas small business", "For-profit or nonprofit", "Through participating lender", "Demonstrated financing barrier"],
    lastUpdated: "2025-01-20"
  },
]

export default function TexasGrantsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-700 via-red-800 to-slate-900 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <MapPin className="h-6 w-6 text-red-300" />
              <Badge className="bg-red-500/30 text-red-100 border-red-400">
                Texas State Funding Guide 2026
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Texas Business Grants & Incentives 2026
            </h1>
            <p className="text-xl text-red-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Texas is America's top relocation destination for businesses — and for good reason. No state income tax,
              the Texas Enterprise Fund (closing deals with $10M+ grants), $300M+ in annual federal SBIR awards,
              SBIR state matching funds, and the Emerging Technology Fund co-investing in TX startups.
            </p>
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-3xl font-bold">$0</div>
                <div className="text-red-200 text-sm mt-1">State income tax</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-3xl font-bold">$300M+</div>
                <div className="text-red-200 text-sm mt-1">Annual SBIR awards in TX</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-3xl font-bold">$10M</div>
                <div className="text-red-200 text-sm mt-1">Max Enterprise Fund grant</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EEAT Components */}
      <section className="py-6 bg-emerald-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-4">
            <ShortAnswerBox content="Yes — Texas businesses benefit from zero state income tax (a permanent annual advantage), Texas Enterprise Fund grants (up to $10M for relocations/expansions), Emerging Technology Fund co-investment ($250K–$3M), SBIR state matching funds (50% co-match), and the Skills Development Fund (up to $500K for workforce training). Texas also ranks #3 nationally for federal SBIR/STTR awards." />
            <EEATBadge authorName="Ashwani K." authorImage="/ash-author-1.jpg" date="2026-03-01" />
            <EligibleCheck />
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">

          <div className="flex flex-wrap gap-2 mb-10">
            {["Top Programs", "No-Tax Advantage", "SBIR in Texas", "How to Apply", "FAQ"].map((item) => (
              <Badge key={item} variant="outline" className="cursor-pointer hover:bg-red-50 px-3 py-1.5 text-sm">{item}</Badge>
            ))}
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Texas Business Grant Programs Comparison 2026</h2>
            <GrantComparisonTable grants={texasGrants} title="Texas Business Grants Comparison" />
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2 space-y-10">

              {/* Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Building className="h-5 w-5 text-red-600" />
                    Texas Business Funding Ecosystem 2026
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700 prose max-w-none">
                  <p className="text-base leading-relaxed mb-4">
                    Texas has built one of the country's most business-friendly funding environments through a combination of
                    <strong> structural tax advantages, direct relocation incentives, and technology co-investment programs</strong>.
                    The absence of a state income tax is not a minor perk — for a profitable tech company, this single factor
                    can represent $200K–$2M in annual tax savings that directly flows back into operations and hiring.
                  </p>
                  <p className="text-base leading-relaxed mb-4">
                    The Governor's Office administers the Texas Enterprise Fund and Emerging Technology Fund directly,
                    giving Texas unusual deal-making speed compared to bureaucratic state agencies in other states.
                    TEF decisions can happen in 30–60 days for competitive situations involving other states or countries.
                  </p>
                  <p className="text-base leading-relaxed">
                    For federal grants, Texas is a powerhouse. The state ranks <strong>#3 nationally for total SBIR/STTR
                      awards</strong> received — driven by concentration in Austin (tech), Houston (energy, life sciences),
                    San Antonio (defense), and Dallas/Fort Worth (aerospace, defense, finance). Texas's 8 major research
                    universities (UT, A&M, Rice, TTU, UH, etc.) each have SBIR support offices and actively connect
                    companies to university IP for commercialization.
                  </p>
                </CardContent>
              </Card>

              {/* No-Tax Advantage Box */}
              <Card className="border-2 border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="text-xl text-green-900 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-green-600" />
                    The Texas No-Tax Advantage: What It's Worth in Real Dollars
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-green-900">
                  <p className="text-sm mb-4">
                    Texas has no state income tax, no corporate income tax (only a franchise tax for larger companies),
                    and no personal income tax. For businesses and founders, this creates substantial compounding savings:
                  </p>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-4 text-center border border-green-200">
                      <div className="text-2xl font-bold text-green-700">$0</div>
                      <div className="text-xs text-green-800 mt-1">State income tax on $500K profit</div>
                      <div className="text-xs text-gray-500 mt-1">(vs. $59K in CA, $35K in NY)</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 text-center border border-green-200">
                      <div className="text-2xl font-bold text-green-700">$0</div>
                      <div className="text-xs text-green-800 mt-1">Founder personal income tax on $1M exit</div>
                      <div className="text-xs text-gray-500 mt-1">(vs. ~$130K CA state tax)</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 text-center border border-green-200">
                      <div className="text-2xl font-bold text-green-700">0.75%</div>
                      <div className="text-xs text-green-800 mt-1">TX Franchise Tax rate (vs. 8.84% CA corporate)</div>
                      <div className="text-xs text-gray-500 mt-1">Only applies at $2.47M+ revenue</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Program Deep Dives */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Texas Grant Programs Explained</h2>
                <div className="space-y-6">

                  <Card className="border-l-4 border-l-red-500">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">1. Texas Enterprise Fund (TEF)</CardTitle>
                        <Badge className="bg-red-100 text-red-800 shrink-0 ml-2">Up to $10M</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="text-gray-700 space-y-3">
                      <p>
                        TEF is Texas's most powerful incentive — a direct, upfront grant from the Governor's office to
                        companies that choose Texas <strong>over a competing state or country</strong>. It's designed as a
                        "deal closer." Notable recipients include Apple ($21M, Austin HQ), Toyota ($40M, Plano HQ), and
                        Samsung ($27M, Taylor semiconductor fab).
                      </p>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="bg-red-50 rounded-lg p-3 text-sm">
                          <div className="font-semibold text-red-900 mb-1">When To Apply</div>
                          <div className="text-red-700">When finalizing a location decision between TX and another state. TEF is explicitly a tie-breaker tool.</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3 text-sm">
                          <div className="font-semibold text-gray-900 mb-1">Jobs Required</div>
                          <div className="text-gray-700">Varies, but typically 500+ jobs for $1M+ awards. Smaller deals (50–100 jobs) qualify for $500K–$2M range.</div>
                        </div>
                      </div>
                      <p className="text-sm text-amber-700 bg-amber-50 rounded-lg p-3">
                        <strong>⚠️ Important:</strong> Contact the Governor's Office BEFORE your location decision is public.
                        TEF is not accessible retroactively. Call (512) 463-9870 early to initiate the process confidentially.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-blue-500">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">2. Texas Emerging Technology Fund (ETF)</CardTitle>
                        <Badge className="bg-blue-100 text-blue-800 shrink-0 ml-2">$250K–$3M</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="text-gray-700 space-y-3">
                      <p>
                        ETF specifically targets technology commercialization — it co-invests alongside federal SBIR/STTR
                        awards and university research. Texas is one of only 5 states with a dedicated SBIR co-investment
                        fund, making it exceptionally valuable for federally-funded tech startups.
                      </p>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" /><span>Priority for companies with NSF, NIH, DOD, DOE SBIR awards</span></li>
                        <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" /><span>Commercialization focus — must demonstrate path to market revenue</span></li>
                        <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" /><span>University IP licensing deals strongly favored</span></li>
                        <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" /><span>Apply through your regional Texas research university</span></li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-purple-500">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">3. Skills Development Fund</CardTitle>
                        <Badge className="bg-purple-100 text-purple-800 shrink-0 ml-2">Up to $500K</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="text-gray-700 space-y-3">
                      <p>
                        Texas's Skills Development Fund is administered through the Texas Workforce Commission and delivered
                        through community colleges. It's one of the largest workforce training reimbursement programs in the
                        country — awarded $73M+ in FY2024 alone.
                      </p>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="bg-purple-50 rounded-lg p-3 text-sm">
                          <div className="font-semibold text-purple-900 mb-1">What's Reimbursed</div>
                          <div className="text-purple-700">Training design, instructor costs, materials, certification fees, online platform licenses</div>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-3 text-sm">
                          <div className="font-semibold text-purple-900 mb-1">How to Apply</div>
                          <div className="text-purple-700">Contact your local community college (Lone Star, Austin CC, Dallas CC, etc.) to initiate the process — they apply on your behalf</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                </div>
              </div>

              {/* SBIR in Texas */}
              <Card className="border-blue-100 bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-900 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-700" />
                    SBIR/STTR in Texas: America's #3 State for Federal Non-Dilutive Funding
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-blue-900">
                  <p className="text-sm mb-4">
                    Texas companies receive $300M+ annually in federal SBIR/STTR awards — ranking 3rd nationally behind
                    California and Massachusetts. The top Texas cities for SBIR awards are:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-bold mb-2">By City</div>
                      <ul className="space-y-1.5">
                        <li className="flex items-start gap-2"><CheckCircle className="h-3.5 w-3.5 text-blue-600 mt-0.5 shrink-0" /><span><strong>Austin:</strong> Software, AI, semiconductors (NSF, DARPA)</span></li>
                        <li className="flex items-start gap-2"><CheckCircle className="h-3.5 w-3.5 text-blue-600 mt-0.5 shrink-0" /><span><strong>Houston:</strong> Energy tech, life sciences (DOE, NIH)</span></li>
                        <li className="flex items-start gap-2"><CheckCircle className="h-3.5 w-3.5 text-blue-600 mt-0.5 shrink-0" /><span><strong>San Antonio:</strong> Defense, cybersecurity (DOD, DHS)</span></li>
                        <li className="flex items-start gap-2"><CheckCircle className="h-3.5 w-3.5 text-blue-600 mt-0.5 shrink-0" /><span><strong>DFW:</strong> Aerospace, logistics tech, finance (NASA, DOD)</span></li>
                      </ul>
                    </div>
                    <div>
                      <div className="font-bold mb-2">Top Federal Agencies Funding TX</div>
                      <ul className="space-y-1.5">
                        <li className="flex items-start gap-2"><CheckCircle className="h-3.5 w-3.5 text-blue-600 mt-0.5 shrink-0" /><span>DOD SBIR — $100M+ to TX companies/year</span></li>
                        <li className="flex items-start gap-2"><CheckCircle className="h-3.5 w-3.5 text-blue-600 mt-0.5 shrink-0" /><span>NSF SBIR — Tech and deep tech</span></li>
                        <li className="flex items-start gap-2"><CheckCircle className="h-3.5 w-3.5 text-blue-600 mt-0.5 shrink-0" /><span>NIH SBIR — Houston life sciences cluster</span></li>
                        <li className="flex items-start gap-2"><CheckCircle className="h-3.5 w-3.5 text-blue-600 mt-0.5 shrink-0" /><span>NASA SBIR — Johnson Space Center pipeline</span></li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* How to Apply */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <FileText className="h-5 w-5 text-red-600" />
                    How to Apply for Texas Business Grants
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700">
                  <div className="space-y-4">
                    {[
                      { step: "1", title: "Start with the Governor's Office Economic Development Team", desc: "For TEF and ETF, your first call should be to the Governor's Office of Economic Development at (512) 463-9870. They pre-screen applications, provide honest eligibility guidance, and can fast-track applications in competitive situations." },
                      { step: "2", title: "Contact Your Local Community College for Skills Development", desc: "The Skills Development Fund is initiated by the community college — contact Lone Star, Austin Community College, or your local DCCCD institution. They file the application on your behalf with TWC." },
                      { step: "3", title: "Connect with Your Nearest University SBIR Office", desc: "Every major TX university (UT-Austin, Texas A&M, Rice, UH) has a SBIR/STTR support office offering free proposal review, industry connections, and ETF co-application assistance." },
                      { step: "4", title: "Prepare Performance-Based Documentation", desc: "Texas incentives require job creation commitments. Document: planned job count, titles, wage levels, benefits package, and timeline. Salary must exceed local county average for most programs." },
                      { step: "5", title: "Apply for Federal SBIR First, Then State Match", desc: "For ETF matching programs, win your federal SBIR Phase I first, then apply to ETF within 90 days of receiving your federal award notification. ETF decisions are fast — typically 45–60 days." },
                    ].map((item) => (
                      <div key={item.step} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="h-8 w-8 rounded-full bg-red-600 text-white flex items-center justify-center text-sm font-bold shrink-0">{item.step}</div>
                        <div>
                          <div className="font-semibold text-gray-900 mb-1">{item.title}</div>
                          <div className="text-sm text-gray-600">{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Expert Tips */}
              <Card className="border-amber-200 bg-amber-50">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2 text-amber-800">
                    <Lightbulb className="h-5 w-5 text-amber-600" />
                    Expert Strategy: Maximizing Texas Business Funding
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-amber-900 space-y-4">
                  <div className="bg-white rounded-lg p-4 border border-amber-200">
                    <div className="font-semibold mb-2">💡 Use TEF as a Negotiating Tool, Not a Last Resort</div>
                    <p className="text-sm">TEF is most powerful when you&apos;re genuinely considering another state or country. Contact the Governor&apos;s office early, even before you&apos;ve received competing offers. Texas can sometimes match or beat incentive packages from Tennessee, Nevada, or Florida — but only if you engage while still in decision mode.</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-amber-200">
                    <div className="font-semibold mb-2">💡 Stack Federal SBIR + ETF + UT/A&M Partnership</div>
                    <p className="text-sm">The winning Texas formula: Win NSF SBIR Phase I ($305K) → apply for ETF co-investment ($250K match) → license university IP from UT or A&M (access to facilities, staff, credibility for Phase II) → win Phase II ($2M). Total non-dilutive capital: $2.5M+ on a single technology.</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-amber-200">
                    <div className="font-semibold mb-2">💡 Houston Life Sciences Companies: Apply for NIH + Cancer Prevention Research</div>
                    <p className="text-sm">Texas has its own Cancer Prevention Research Institute (CPRIT) — a $3B endowment unique in the US. Houston-area women&apos;s health, oncology, and biotech companies should apply to CPRIT alongside NIH SBIR. CPRIT commercialization grants ($1M–$15M) don&apos;t require matching and are far less competitive than NIH.</p>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions: Texas Business Grants</h2>
                <div className="space-y-4">
                  {[
                    { q: "Does Texas have direct cash grants for small businesses?", a: "Yes, through the Texas Enterprise Fund (for relocations/expansions) and the Emerging Technology Fund (for tech companies). However, most TX incentives for SMBs are workforce training reimbursements (Skills Development Fund), loan guarantees (Capital Access Program), and the benefit of zero state income tax. For direct cash grants, the federal SBIR/STTR program is the highest-value path for Texas tech companies." },
                    { q: "What makes Texas better than California for startups?", a: "Three structural advantages: (1) Zero state income tax vs. California's 13.3% top rate — for a profitable company, this alone can mean $500K+ annually. (2) No personal income tax on founder equity events — a $5M acquisition in TX is $650K+ more in-pocket vs. California. (3) Much lower commercial real estate — Austin office space runs 40–60% cheaper than Bay Area equivalents. Combine with TEF and ETF and Texas can provide $1M+ more value over 5 years than California for equivalent companies." },
                    { q: "Can a company relocating from California get the Texas Enterprise Fund?", a: "Yes — this is precisely what TEF is designed for. California-to-Texas relocations have historically been among the most successful TEF applicants. You need: a genuine job creation commitment (50+ TX jobs preferred), wages above Texas county averages, and a formal request made before your relocation decision is publicized. Apple, Oracle, Tesla, and Hewlett Packard Enterprise have all used TEF as part of their Texas moves." },
                    { q: "Are there Texas grants for minority and women-owned businesses?", a: "Yes. The Texas Certified Historically Underutilized Business (HUB) program provides state contract set-asides, bid preferences, and technical assistance for minority and women-owned businesses. Additionally, the SBA's HUBZone program has TX-specific advantages in historically underutilized zones (common in South Texas and East Texas). The Texas Women's Business Center network (12+ locations) provides free grant navigation and business development support." },
                    { q: "Does CPRIT (Cancer Prevention Research Institute of Texas) fund startups?", a: "Yes — CPRIT's SBIR-equivalent program (the Company Formation and Early Growth program) provides $1.5M–$15M to Texas companies developing cancer prevention, diagnosis, or treatment technologies. Unlike NIH, CPRIT can fund companies at very early stages (pre-revenue), has a faster review timeline (6 months vs. 12+ for NIH), and doesn't require preliminary data to the same degree. Any Texas-based life sciences startup working in oncology spaces should apply." },
                  ].map((item, i) => (
                    <Card key={i}>
                      <CardContent className="pt-4">
                        <div className="font-semibold text-gray-900 mb-2">{item.q}</div>
                        <div className="text-gray-600 text-sm leading-relaxed">{item.a}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="bg-red-600 text-white">
                <CardContent className="pt-6">
                  <Star className="h-8 w-8 text-yellow-300 mb-3" />
                  <h3 className="font-bold text-lg mb-2">Free TX Grant Matching</h3>
                  <p className="text-red-100 text-sm mb-4">Our specialists identify which Texas programs fit your business — including TEF eligibility assessment and ETF application support.</p>
                  <Link href="/contact">
                    <Button className="w-full bg-white text-red-600 hover:bg-red-50">
                      Get Free Matching <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <NewsletterSignup variant="sidebar" />

              <Card>
                <CardHeader><CardTitle className="text-lg">Key Texas Agency Contacts</CardTitle></CardHeader>
                <CardContent className="text-sm space-y-3">
                  <div><div className="font-semibold">Governor's Office Economic Dev.</div><div className="text-gray-500">(512) 463-9870 | gov.texas.gov</div></div>
                  <div><div className="font-semibold">Texas Workforce Commission</div><div className="text-gray-500">twc.texas.gov/skills-development</div></div>
                  <div><div className="font-semibold">CPRIT (Cancer Research)</div><div className="text-gray-500">cprit.texas.gov</div></div>
                  <div><div className="font-semibold">Texas Economic Dev. Corp.</div><div className="text-gray-500">texaswideopenforbusiness.com</div></div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="text-lg">Related Resources</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <Link href="/usa/federal-grants" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> Federal Grants for TX Businesses</Link>
                    <Link href="/blog/dod-sbir-defense-tech-grants" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> DOD SBIR Defense Grants</Link>
                    <Link href="/usa/technology-startup-grants" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> Tech Startup Grants Guide</Link>
                    <Link href="/usa/florida" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> Florida Business Grants</Link>
                    <Link href="/grant-finder" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> AI Grant Finder Tool</Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mb-8">
            <NewsletterSignup
              title="Get Texas Grant Updates"
              description="Track TEF application windows, ETF cycles, Skills Development Fund quarterly intakes, and CPRIT deadlines. We monitor 20+ TX programs."
            />
          </div>

        </div>
      </main >

      <Footer />
    </div >
  )
}
