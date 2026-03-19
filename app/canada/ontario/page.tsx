import { Header } from "@/components/Header"
import EEATBadge from "@/components/blog/EEATBadge"
import ShortAnswerBox from "@/components/blog/ShortAnswerBox"
import EligibleCheck from "@/components/blog/EligibleCheck"
import InlineCTA from "@/components/blog/InlineCTA"
import { Footer } from "@/components/Footer"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { GrantComparisonTable } from "@/components/grant-comparison-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, DollarSign, Users, TrendingUp } from "lucide-react"
import type { Metadata } from "next"
import type { Grant } from "@/lib/grants-data"
import AutoLink from "@/components/seo/AutoLink"

export const metadata: Metadata = {
  title: "Ontario Business Grants 2026 | Provincial Funding Programs",
  description:
    "Find Ontario business grants and provincial funding programs. Complete guide to Ontario government grants, eligibility requirements, and application deadlines.",
  keywords:
    "Ontario business grants, Ontario government funding, provincial grants Ontario, small business funding Ontario",
  alternates: {
    canonical: "https://www.fsidigital.ca/canada/ontario",
  },
}

const ontarioGrants: Grant[] = [
  {
    id: "on-together-fund",
    name: "Ontario Together Fund",
    fundingMin: 250000,
    fundingMax: 2500000,
    eligibility: ["Ontario businesses", "Organizations", "Manufacturers"],
    deadline: "Rolling basis",
    applicationLink: "https://www.ontario.ca/page/ontario-together-fund",
    description: "Support for businesses adapting to economic challenges and strengthening supply chains.",
    country: "Canada",
    region: "Ontario",
    category: "Business Growth",
    agency: "Ontario Ministry of Economic Development",
    status: "Active",
    tags: ["Manufacturing", "Innovation", "Supply Chain"],
    requirements: ["Project proposal", "Financial statements", "Job creation potential"],
    lastUpdated: "2026-01-01"
  },
  {
    id: "on-tax-credit",
    name: "Ontario Innovation Tax Credit",
    fundingMin: 10000,
    fundingMax: 500000,
    eligibility: ["R&D performing corporations", "CCPCs", "Ontario residents"],
    deadline: "Annual",
    applicationLink: "https://www.ontario.ca/page/ontario-innovation-tax-credit",
    description: "10% refundable tax credit for scientific research and experimental development.",
    country: "Canada",
    region: "Ontario",
    category: "R&D",
    agency: "Ontario Ministry of Finance",
    status: "Active",
    tags: ["Tax Credit", "R&D", "Innovation"],
    requirements: ["Tax return filing", "SR&ED claim"],
    lastUpdated: "2026-01-01"
  },
  {
    id: "on-scale-vouchers",
    name: "Ontario Scale-Up Vouchers Program",
    fundingMin: 10000,
    fundingMax: 25000,
    eligibility: ["High-growth potential companies", "Tech startups"],
    deadline: "Quarterly",
    applicationLink: "https://www.ontario.ca/page/ontario-scale-vouchers-program",
    description: "Vouchers for accessing high-impact business advisory services.",
    country: "Canada",
    region: "Ontario",
    category: "Startups",
    agency: "Ontario Centres of Excellence",
    status: "Active",
    tags: ["Voucher", "Advisory", "Scale-up"],
    requirements: ["Application form", "Growth plan"],
    lastUpdated: "2026-01-01"
  },
  {
    id: "oce-tech",
    name: "Ontario Centres of Excellence",
    fundingMin: 50000,
    fundingMax: 500000,
    eligibility: ["Technology companies", "Startups", "Researchers"],
    deadline: "Multiple rounds",
    applicationLink: "https://www.oce-ontario.org/",
    description: "Funding for technology commercialization and industry-academic collaboration.",
    country: "Canada",
    region: "Ontario",
    category: "Technology",
    agency: "Ontario Centres of Excellence",
    status: "Active",
    tags: ["Deep Tech", "Commercialization", "Research"],
    requirements: ["Collaboration agreement", "Project plan"],
    lastUpdated: "2026-01-01"
  },
]

export default function OntarioGrantsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <MapPin className="h-6 w-6 text-primary" />
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Ontario Provincial Funding
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Ontario Business Grants 2026</h1>
            <div className="mt-8 mb-4 text-left">
              <ShortAnswerBox
                question="What government grants are available for Ontario businesses in 2026?"
                content="Ontario businesses can access Starter Company Plus ($5,000–$10,000 non-repayable for early-stage companies), the Ontario Vehicle Innovation Network (OVIN, up to $250K for automotive and EV SMEs), NOHFC Northern Ontario grants (up to $1M), the Ontario Made Manufacturing Investment Tax Credit (10% of eligible capital), and federal programs stacked on top: IRAP, SR&ED, and CDAP. Ontario-based tech and manufacturing companies are among the best-funded businesses in Canada."
              />
            </div>
            <div className="flex justify-center mb-4">
              <EEATBadge authorName="Ashwani K." authorImage="/author-ashwani.jpg" date="2026-02-09" />
            </div>
            <div className="mt-8 mb-4 text-left">
              
            </div>
            <div className="flex justify-center mb-4">
              
            </div>
            
            <div className="mt-4">
              
            </div>
            <div className="mt-4 mb-8 flex justify-center">
              
            </div>
            <div className="mt-8 mb-8">
              <EligibleCheck />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Available Funding</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">$400M+</div>
                <p className="text-xs text-muted-foreground">Annual provincial programs</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Programs</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">30+</div>
                <p className="text-xs text-muted-foreground">Provincial grant programs</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">40%</div>
                <p className="text-xs text-muted-foreground">Average approval rate</p>
              </CardContent>
            </Card>
          </div>

          {/* Grant Comparison Table */}
          <div className="mb-12">
            <GrantComparisonTable
              grants={ontarioGrants}
              title="Ontario Business Grants Comparison"
            />
          </div>

          {/* Content Sections */}

          <div className="mb-12">
            <InlineCTA
              title="Need Strategy for Ontario Grants?"
              description="Our specialists can help you navigate Ontario's provincial programs."
              buttonText="Get Funding Assistance"
              buttonLink="/contact"
            />
          </div>
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Ontario Business Grant Opportunities</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <AutoLink text="Ontario provides extensive business grant programs to support innovation, growth, and economic development across the province. With over $400 million in annual funding, Ontario maintains its position as Canada's economic engine." className="leading-relaxed" />

                  <h3>Key Ontario Grant Programs</h3>
                  <ul>
                    <li>
                      <strong>Ontario Together Fund</strong> - Up to $2.5M for business adaptation
                    </li>
                    <li>
                      <strong>Ontario Innovation Tax Credit</strong> - 10% tax credit for R&D
                    </li>
                    <li>
                      <strong>Ontario Scale-Up Vouchers</strong> - $25K for advisory services
                    </li>
                    <li>
                      <strong>Ontario Centres of Excellence</strong> - Up to $500K for tech commercialization
                    </li>
                  </ul>

                  <AutoLink text="Ontario business grants typically require companies to be incorporated in Ontario, demonstrate growth potential, and contribute to the province's economic objectives:" className="leading-relaxed" />
                  <ul>
                    <li>Ontario business registration and operations</li>
                    <li>Demonstration of innovation or growth potential</li>
                    <li>Job creation or retention commitments</li>
                    <li>Alignment with provincial priorities</li>
                  </ul>

                  <h3>Application Process</h3>
                  <p>
                    Ontario grant applications require detailed business plans, financial projections, and clear
                    demonstration of economic impact. The province emphasizes innovation, competitiveness, and
                    sustainable growth in its evaluation criteria.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <NewsletterSignup variant="sidebar" />

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Related Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <a href="/contact" className="block text-primary hover:underline">
                      Quebec Small Business Grants
                    </a>
                    <a href="/canada/government-grants" className="block text-primary hover:underline">
                      Federal Canadian Grants
                    </a>
                    <a href="/grant-finder" className="block text-primary hover:underline">
                      AI Grant Finder Tool
                    </a>
                    <a href="/guides" className="block text-primary hover:underline">
                      Application Guides
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Deep Content Section */}
          <div className="max-w-4xl mx-auto space-y-10 mb-12">

            <Card>
              <CardHeader><CardTitle className="text-xl">Ontario&apos;s Innovation Funding Ecosystem — OCE, MEDJCT, and Ontario Tech</CardTitle></CardHeader>
              <CardContent className="text-gray-700 space-y-4">
                <p className="leading-relaxed">Ontario is Canada&apos;s largest economy and offers the country&apos;s most diverse business grant ecosystem. The province funds innovation through Ontario Centres of Excellence (OCE), the Ontario Innovation Tax Credit (OITC), the Ontario Together Fund, and dozens of sector-specific programs administered through the Ministry of Economic Development, Job Creation and Trade (MEDJCT). Ontario&apos;s size means more programs, but also more competition — strong applications are critical.</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead><tr className="bg-blue-800 text-white"><th className="text-left p-3">Program</th><th className="text-left p-3">Amount</th><th className="text-left p-3">Best For</th><th className="text-left p-3">Type</th></tr></thead>
                    <tbody>
                      {[
                        ["Ontario Together Fund", "$250K–$2.5M", "Ontario manufacturers and businesses strengthening supply chains and adapting to economic challenges", "Non-repayable grant; competitive"],
                        ["Ontario Innovation Tax Credit (OITC)", "$10K–$500K", "Ontario CCPCs doing SR&ED — adds 10% provincial refundable tax credit on top of federal 15–35%", "Refundable tax credit; filed with SR&ED"],
                        ["Ontario Scale-Up Vouchers", "$10K–$25K", "High-growth Ontario tech startups accessing specialized advisory services for scaling", "Non-repayable vouchers; quarterly intake"],
                        ["Ontario Centres of Excellence (OCE)", "$50K–$500K", "Ontario tech companies doing collaborative R&D with universities; commercialization focus", "Non-repayable + industry match required"],
                        ["Invest Ontario Fund", "$500K–$10M+", "Large-scale capital investments by companies creating significant Ontario jobs", "Negotiated contributions; major employers only"],
                        ["Ontario Jobs Training Tax Credit", "Up to $2,000/person", "Ontario individuals + employers training workers in eligible skills — supports employer-sponsored training", "Refundable tax credit; annual filing"],
                      ].map(([p, a, b, t], i) => (
                        <tr key={p} className={i % 2 === 0 ? "bg-white" : "bg-blue-50"}>
                          <td className="p-3 font-semibold text-blue-900 text-xs">{p}</td>
                          <td className="p-3 text-green-700 font-medium text-xs">{a}</td>
                          <td className="p-3 text-gray-600 text-xs">{b}</td>
                          <td className="p-3 text-gray-500 text-xs">{t}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-xl">Ontario Innovation Tax Credit (OITC) — The Most Overlooked Ontario Program</CardTitle></CardHeader>
              <CardContent className="text-gray-700 space-y-4">
                <p className="leading-relaxed">The Ontario Innovation Tax Credit is a 10% refundable provincial tax credit applied to qualifying SR&ED (Scientific Research & Experimental Development) expenditures. It is claimed in addition to the federal SR&ED credit — and unlike the federal credit, the OITC&apos;s 10% applies to the full amount of qualifying Ontario R&D expenditure without the complex federal phase-out calculations. For a qualifying Ontario CCPC spending $500K on eligible R&D: federal SR&ED = ~$175K refund + OITC = $50K refund — total $225K non-dilutive return on $500K R&D investment.</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { name: "Who Qualifies", desc: "Canadian Controlled Private Corporations (CCPCs) incorporated in Ontario with qualifying SR&ED expenditures in Ontario. The same activities that qualify for federal SR&ED qualify for OITC — no separate Ontario eligibility assessment." },
                    { name: "What Expenses Qualify", desc: "Wages for employees doing SR&ED in Ontario, materials consumed in Ontario R&D activities, overhead allocated to R&D, and SR&ED performed by subcontractors in Ontario. Same eligible cost categories as federal SR&ED." },
                    { name: "How to Claim", desc: "Filed with the provincial tax return (Schedule T2SCH566) in the same tax year as the federal SR&ED claim (T661). Your SR&ED consultant handles both federal and Ontario claims simultaneously — no separate Ontario application process." },
                    { name: "Ontario Enhanced R&D Credit for Large Corporations", desc: "Non-CCPCs (larger companies) access the Ontario Research and Development Tax Credit (ORDTC) at 3.5% — lower than OITC but still meaningful for large R&D investments. Both credits can be claimed in the same tax year by qualifying entities." },
                  ].map(({ name, desc }) => (
                    <div key={name} className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <div className="font-semibold text-blue-900 text-sm mb-2">{name}</div>
                      <div className="text-xs text-gray-700 leading-relaxed">{desc}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-xl">FedDev Ontario &amp; Federal Programs for Ontario Businesses</CardTitle></CardHeader>
              <CardContent className="text-gray-700 space-y-3">
                <p className="text-sm leading-relaxed">FedDev Ontario (Federal Economic Development Agency for Southern Ontario) is Ontario&apos;s regional development agency, focused on business growth, innovation, and economic diversification in southern Ontario. For northern Ontario businesses, FedNor provides similar support. These federal programs stack with provincial programs for maximum funding coverage.</p>
                <div className="grid sm:grid-cols-3 gap-3">
                  {[
                    { prog: "FedDev Business Scale-Up", val: "$500K–$10M", note: "Repayable/non-repayable contributions for high-growth southern Ontario companies; offices in Toronto, Waterloo, Hamilton" },
                    { prog: "FedNor (Northern ON)", val: "$25K–$2M", note: "Economic development grants for northern Ontario businesses, municipalities, and First Nations communities" },
                    { prog: "NRC-IRAP", val: "Up to $50K+", note: "Industrial R&D support; IRAP advisors across Ontario including Toronto, Waterloo, Ottawa, Windsor" },
                    { prog: "SR&ED + OITC", val: "25–45% of R&D", note: "Ontario&apos;s combined federal/provincial R&D tax credit is among the highest in North America" },
                    { prog: "CanExport SMEs", val: "Up to $50K", note: "Federal export market development grants — Ontario exporters are the largest CanExport recipient group" },
                    { prog: "CDAP", val: "$15K", note: "Canada Digital Adoption Program; Ontario small businesses widely utilize this for e-commerce and digital technology adoption" },
                  ].map(({ prog, val, note }) => (
                    <div key={prog} className="bg-gray-50 rounded p-3 border border-gray-200">
                      <div className="font-semibold text-gray-900 text-xs mb-1">{prog}</div>
                      <div className="text-xs text-green-700 font-medium mb-1">{val}</div>
                      <div className="text-xs text-gray-600">{note}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-red-50 border-red-100">
              <CardHeader><CardTitle className="text-xl text-red-900">5 Mistakes Ontario Businesses Make When Applying for Provincial Grants</CardTitle></CardHeader>
              <CardContent className="text-red-900 space-y-3">
                {[
                  { n: "1", m: "Not Filing the Ontario Innovation Tax Credit Alongside Federal SR&ED", d: "Ontario CCPCs doing qualifying R&D are entitled to a 10% provincial refundable tax credit on top of the federal SR&ED. Most Ontario companies working with SR&ED consultants correctly file the federal claim but miss the Ontario OITC supplement. Confirm your SR&ED consultant files Schedule T2SCH566 (OITC) with every Ontario provincial return — it should be automatic but frequently isn&apos;t." },
                  { n: "2", m: "Applying to Ontario Centres of Excellence Without an Academic Partner", d: "OCE requires industry-academic collaboration — a formal agreement with an Ontario university, college, or research hospital before the application. Companies that apply without an established academic partner are automatically disqualified. Build your university relationship first (most Ontario universities have industry liaison offices that facilitate connections), then apply to OCE." },
                  { n: "3", m: "Treating the Ontario Together Fund as a General Business Grant", d: "The Ontario Together Fund was specifically designed for supply chain strengthening and business adaptation — not general business expansion. Applications that don&apos;t clearly articulate supply chain resilience, domestic production, or economic challenge response miss OCE&apos;s evaluation criteria. Frame your project in supply chain and economic resilience language even if your underlying motivation is growth." },
                  { n: "4", m: "Overlooking FedDev Ontario for Scale-Up Capital", d: "FedDev Ontario is one of the most underutilized federal programs by Ontario businesses — partly because it&apos;s less visible than NRC-IRAP or SR&ED. FedDev Business Scale-Up contributions ($500K–$10M+) are among the largest single grants available to Ontario companies outside of Invest Ontario. Growing Ontario companies with documented revenue and expansion plans should engage FedDev before their Series A, not after." },
                  { n: "5", m: "Not Engaging with Ontario&apos;s Sector-Specific Agencies Early", d: "Ontario has sector-specific agencies that manage dedicated funding pools: Ontario Media Development Corporation (OMDC) for digital media and film; Ontario Genomics for life sciences; MaRS Discovery District for health and cleantech startups; Communitech for Waterloo-region tech. These agencies often know about provincial and federal programs before they&apos;re publicly announced and can position your company for intake before deadlines." },
                ].map(({ n, m, d }) => (
                  <div key={n} className="bg-white rounded-lg p-4 border border-red-200">
                    <div className="font-semibold text-red-900 mb-1 text-sm">{n}. {m}</div>
                    <p className="text-xs text-red-800 leading-relaxed">{d}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">FAQ: Ontario Business Grants 2026</h2>
              <div className="space-y-4">
                {[
                  { q: "What is the largest Ontario business grant available to startups?", a: "The largest accessible Ontario startup grant is OCE Smart Prosperity (up to $500K) for tech-enabled companies doing collaborative R&D with Ontario universities. For growth-stage startups (with revenue), FedDev Ontario Business Scale-Up offers contributions from $500K to $10M+ but requires demonstrated traction. For true early-stage startups, Ontario Scale-Up Vouchers ($25K) are the most accessible — quarterly intake, minimal documentation." },
                  { q: "Does Ontario have grants for manufacturing businesses?", a: "Yes — Ontario has strong manufacturing support. Ontario Together Fund ($250K–$2.5M) specifically supports manufacturers adapting supply chains. The Automotive Supplier Innovation Program (ASIP) supports automotive sector innovation. FedDev Ontario supports manufacturing scale-up. SR&ED + OITC credits apply to manufacturing R&D. The Advanced Manufacturing Consortium (AMC) connects manufacturers to provincial and federal programs. Ontario manufacturers doing automation or process innovation can often stack 3–4 programs simultaneously." },
                  { q: "How does the Ontario Centres of Excellence differ from IRAP?", a: "NRC-IRAP (federal) funds a company&apos;s own internal R&D projects — no university partner required. An IRAP Advisor works directly with your technical team. OCE (provincial) specifically funds collaborative R&D projects between an Ontario company and an Ontario post-secondary institution — the academic partner is mandatory. IRAP is typically faster (weeks to award) and more flexible; OCE provides larger amounts ($50K–$500K) but requires more documentation and an established academic relationship." },
                  { q: "Are there Ontario grants for the digital media and gaming industry?", a: "Yes — Ontario Media Development Corporation (OMDC) administers several programs for Ontario digital media and interactive digital media (video games, apps, educational tech): the Interactive Digital Media Fund ($15K–$150K), the Export Fund for international market development, and the Interact program for companies entering U.S. and international markets. The federal Canada Media Fund (CMF) also funds Ontario digital media companies. Ontario&apos;s gaming industry (Ubisoft Toronto, EA Sports, Rockstar Toronto) benefits from both private investment and these public programs." },
                  { q: "What is Invest Ontario and who qualifies?", a: "Invest Ontario is the province&apos;s foreign direct investment and major business attraction agency — not a general small business grant program. Invest Ontario Fund contributions ($500K–$10M+) are negotiated with large employers making significant capital investments in Ontario with substantial job creation commitments (typically 100+ jobs). If your company is making a very large capital commitment to Ontario (new facility, major product line expansion), engage Invest Ontario early — the fund can provide substantial non-repayable contributions for qualified major projects." },
                  { q: "Can Ontario non-profits and social enterprises access business grants?", a: "Ontario has specific programs for non-profits and social enterprises: Ontario Trillium Foundation (OTF) provides grants for non-profits delivering community impact ($5K–$1M+). Social Enterprise Fund at MaRS supports social ventures. Community Futures offices throughout Ontario provide financing for rural social enterprises. For-profit social enterprises (B-Corps, impact businesses) can access standard business grants if they meet the for-profit eligibility criteria — the social mission doesn&apos;t disqualify them from programs like Scale-Up Vouchers, IRAP, or SR&ED." },
                  { q: "How competitive are Ontario grants compared to other provinces?", a: "Ontario grants are significantly more competitive than grants in smaller provinces (Manitoba, New Brunswick, Nova Scotia) due to the sheer volume of applications from Ontario&apos;s larger business population. OCE receives 3–5x more applications per intake than comparable Alberta Innovates programs. However, Ontario also has more total funding dollars available — the province&apos;s larger economy means larger budgets for provincial programs. Strong applications (clear innovation differentiation, solid financials, committed matching funds, defined commercialization plans) succeed in Ontario&apos;s competitive environment." },
                  { q: "Are there Ontario grants for immigrant or newcomer entrepreneurs?", a: "Yes — several Ontario programs specifically support immigrant and newcomer entrepreneurs: the Ontario Immigrant Nominee Program (OINP) Entrepreneur Stream (immigration pathway + business establishment); Futurpreneur Canada provides loans and mentoring for entrepreneurs age 18–39 including newcomers; some Community Futures offices provide specific newcomer entrepreneur support; and various municipal programs in Toronto, Ottawa, and Hamilton target immigrant business owners. BDC also has newcomer-specific financing programs with more flexible eligibility than standard bank products." },
                ].map((item, i) => (
                  <Card key={i}><CardContent className="pt-5">
                    <div className="font-semibold text-gray-900 mb-2 text-sm">{item.q}</div>
                    <div className="text-gray-600 text-xs leading-relaxed">{item.a}</div>
                  </CardContent></Card>
                ))}
              </div>
            </div>

          </div>

          {/* Newsletter CTA */}
          <div className="mb-8">
            <NewsletterSignup
              title="Get Ontario Grant Updates"
              description="Stay informed about new Ontario business grants and funding opportunities"
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
