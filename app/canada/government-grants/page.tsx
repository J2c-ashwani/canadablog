import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { GrantComparisonTable } from "@/components/grant-comparison-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Flag, CheckCircle, ArrowRight, Building, Lightbulb, FileText, AlertCircle, Star } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import type { Grant } from "@/lib/grants-data"
import ShortAnswerBox from "@/components/blog/ShortAnswerBox"
import EEATBadge from "@/components/blog/EEATBadge"
import EligibleCheck from "@/components/blog/EligibleCheck"

export const metadata: Metadata = {
  title: "Canada Government Grants 2026 | Federal Business Grants & Funding Complete Guide",
  description: "Complete guide to Canada federal government grants 2026. Strategic Innovation Fund, Regional Development Agencies (FedDev, WD, ACOA, Canada Economic Development), BDC programs, Export Development Canada, IRAP, SR&ED, and ISED sector grants for Canadian businesses.",
  keywords: "Canada government grants 2026, federal business grants Canada, Strategic Innovation Fund, FedDev Ontario, Western Economic Diversification, ACOA grants, Canada Economic Development, BDC grants, ISED Canada grants, federal funding for business Canada",
  alternates: { canonical: "https://www.fsidigital.ca/canada/government-grants" },
  openGraph: { title: "Canada Government Grants 2026 | Federal Business Funding Guide", description: "Navigate Canada's federal business grant system — SIF, Regional Development Agencies, IRAP, SR&ED, BDC, and sector-specific ISED programs for 2026.", url: "https://www.fsidigital.ca/canada/government-grants" },
}

const govGrants: Grant[] = [
  { id: "ca-sif", name: "Strategic Innovation Fund (SIF)", fundingMin: 1000000, fundingMax: 400000000, eligibility: ["Canadian companies in advanced manufacturing, cleantech, digital/ICT, agri-food, health/biotech", "Projects with significant R&D, commercialization, or productivity-boosting activity", "Large-scale capital-intensive projects (SME stream also available)"], deadline: "Continuous — ISED reviews project proposals ongoing", applicationLink: "https://ised-isde.canada.ca/site/strategic-innovation-fund/en", description: "Canada's largest direct federal business grant — up to $400M per project for major industrial innovation, R&D, commercialization, and productivity investments in priority sectors.", country: "Canada", region: "Federal", category: "Major Investment", agency: "Innovation, Science and Economic Development Canada (ISED)", status: "Active", tags: ["Large Grant", "R&D", "Commercialization", "Advanced Manufacturing"], requirements: ["Canadian corporation", "Priority sector project", "Significant economic benefit to Canada", "Multi-year project with milestones"], lastUpdated: "2026-01-01" },
  { id: "ca-feddev", name: "FedDev Ontario", fundingMin: 50000, fundingMax: 10000000, eligibility: ["Ontario businesses and non-profit organizations", "Technology, advanced manufacturing, commercialization projects", "Southern Ontario focus"], deadline: "Rolling — feddevontario.gc.ca for active programs", applicationLink: "https://feddevontario.gc.ca/eic/site/723.nsf/eng/home", description: "Federal Regional Development Agency for Southern Ontario — providing grants for Ontario businesses scaling technology, accessing new markets, pursuing commercialization, or investing in advanced manufacturing capabilities.", country: "Canada", region: "Ontario", category: "Regional Development", agency: "Federal Economic Development Agency for Southern Ontario", status: "Active", tags: ["Ontario", "Regional Development", "Advanced Manufacturing", "Commercialization"], requirements: ["Ontario business", "Job creation or economic benefit", "Matching investment confirmed", "Southern Ontario operations"], lastUpdated: "2026-01-01" },
  { id: "ca-wd", name: "Western Economic Diversification (WD / PacifiCan)", fundingMin: 25000, fundingMax: 5000000, eligibility: ["BC, Alberta, Saskatchewan, Manitoba businesses", "Innovation, commercialization, trade, and community projects", "Businesses and non-profits in Western Canada"], deadline: "Rolling — wd-deo.gc.ca and PacifiCan programs", applicationLink: "https://www.canada.ca/en/pacific-economic-development.html", description: "Federal regional development funding for Western Canada — covering BC (PacifiCan), Alberta, Saskatchewan, and Manitoba. Supports technology commercialization, export diversification, and inclusive growth.", country: "Canada", region: "Western Canada", category: "Regional Development", agency: "PacifiCan / WD Canada", status: "Active", tags: ["Western Canada", "Commercialization", "Innovation", "Export"], requirements: ["Western Canada-based business or organization", "Economic diversification project", "Provincial business registration"], lastUpdated: "2026-01-01" },
  { id: "ca-acoa", name: "Atlantic Canada Opportunities Agency (ACOA)", fundingMin: 10000, fundingMax: 3000000, eligibility: ["Atlantic Canada businesses — NS, NB, PEI, NL", "Tourism, fisheries, manufacturing, technology, community development", "For-profit and non-profit projects"], deadline: "Rolling — acoa-apeca.gc.ca regional offices", applicationLink: "https://www.canada.ca/en/atlantic-canada-opportunities.html", description: "Federal regional development grants for Atlantic Canada — Business Development Program (BDP) providing repayable and non-repayable contributions for Atlantic business growth, innovation, and market development.", country: "Canada", region: "Atlantic Canada", category: "Regional Development", agency: "Atlantic Canada Opportunities Agency", status: "Active", tags: ["Atlantic Canada", "Business Development", "Innovation", "Tourism"], requirements: ["Atlantic Canada-based business", "Economic benefit to Atlantic region", "Nova Scotia, New Brunswick, PEI, or Newfoundland"], lastUpdated: "2026-01-01" },
  { id: "ca-bdc", name: "BDC (Business Development Bank) Programs", fundingMin: 100000, fundingMax: 50000000, eligibility: ["Canadian businesses of all sizes", "Technology, innovation, growth-stage, and mature companies", "All industries"], deadline: "Rolling — bdc.ca or BDC Advisory Services", applicationLink: "https://www.bdc.ca/en/financing", description: "BDC offers a suite of financing products (not traditional grants): growth equity, venture capital, and term loans specifically structured for Canadian entrepreneurs — including patient capital that conventional banks won't provide.", country: "Canada", region: "Federal", category: "Business Financing", agency: "Business Development Bank of Canada", status: "Active", tags: ["Loan", "Equity", "Venture Capital", "Growth"], requirements: ["Canadian business", "Demonstrated commercial viability", "Use of funds for business growth"], lastUpdated: "2026-01-01" },
]

export default function CanadaGovernmentGrantsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50">
      <Header />

      <section className="bg-gradient-to-br from-red-700 via-red-800 to-slate-900 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Flag className="h-6 w-6 text-red-300" />
              <Badge className="bg-red-500/30 text-red-100 border-red-400">Canada Federal Government Grants 2026</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Canada Government Grants 2026</h1>
            <div className="mt-8 mb-4 text-left">
              <ShortAnswerBox
                question="What government grants are available for Canadian businesses in 2026?"
                content="Yes — Canada's federal government offers substantial business grants and funding through multiple channels: Strategic Innovation Fund (up to $400M for major investments), five Regional Development Agencies covering all provinces (FedDev Ontario, PacifiCan/WD, ACOA, Canada Economic Development), NRC IRAP for R&D-intensive SMEs, SR&ED tax credits (15–35% refundable on qualifying R&D), export support through EDC, and BDC growth financing. Most Canadian businesses can access 2–4 programs simultaneously."
              />
            </div>
            <div className="flex justify-center mb-4">
              <EEATBadge authorName="Ashwani K." authorImage="/author-ashwani.jpg" date="2026-03-01" />
            </div>
            
            
          </div>
        </div>
      </section>

      <section className="py-6 bg-emerald-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-4">
            
            
            <EligibleCheck />
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">

          <div className="flex flex-wrap gap-2 mb-10">
            {["Strategic Innovation Fund", "Regional Agencies", "IRAP & SR&ED", "BDC Financing", "How to Apply", "FAQ"].map((item) => (
              <Badge key={item} variant="outline" className="cursor-pointer hover:bg-red-50 px-3 py-1.5 text-sm">{item}</Badge>
            ))}
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Canada Federal Business Grant Programs — Quick Comparison 2026</h2>
            <p className="text-gray-600 mb-6">Overview of the major federal grant channels. Note that SR&ED and IRAP (not in this table) are the most widely accessible programs for any Canadian business doing R&D — see the Canada Innovation Grants page for those.</p>
            <GrantComparisonTable grants={govGrants} title="Canada Federal Government Grant Programs" />
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2 space-y-10">

              <Card>
                <CardHeader><CardTitle className="text-xl flex items-center gap-2"><Building className="h-5 w-5 text-red-600" />How Canada&apos;s Federal Business Funding System Works</CardTitle></CardHeader>
                <CardContent className="text-gray-700 space-y-4">
                  <p className="leading-relaxed">
                    Canada&apos;s federal business funding system operates on multiple parallel tracks — each targeting different
                    business sizes, development stages, and geographic regions. Understanding the architecture prevents the
                    most common mistake: applying to programs not designed for your business type or stage.
                  </p>
                  <p className="leading-relaxed">
                    At the top level is the <strong>Strategic Innovation Fund (SIF)</strong> — Canada&apos;s largest direct
                    industrial investment program, administered by ISED (Innovation, Science and Economic Development Canada).
                    SIF provides $1M to $400M per project for large-scale industrial R&D, advanced manufacturing investments,
                    and major commercialization projects in priority sectors (advanced manufacturing, cleantech, biotech/health,
                    digital technology, agri-food). SIF has funded Volkswagen&apos;s EV battery gigafactory ($13.2B), Stellantis/
                    LG Energy&apos;s Windsor battery plant ($15B government support package), Intact&apos;s AI platform ($75M),
                    and Air Canada&apos;s sustainable aviation fuel plant ($30M). SIF is relevant to growth companies and major
                    investors, less so to early-stage SMEs.
                  </p>
                  <p className="leading-relaxed">
                    Below SIF are five <strong>Regional Development Agencies (RDAs)</strong> — federal agencies whose mandate
                    is to diversify and grow regional economies. The RDAs distribute approximately $1.5B+ annually through
                    grants and contributions to regional businesses, non-profits, and municipalities:
                  </p>
                  <ul className="space-y-2 ml-4 text-sm">
                    {[
                      ["FedDev Ontario", "Southern Ontario — technology, advanced manufacturing, commercialization"],
                      ["PacifiCan (formerly WD BC)", "British Columbia — innovation, clean economy, Indigenous economic development"],
                      ["WD Canada (Prairies)", "Alberta, Saskatchewan, Manitoba — diversification, tech, export"],
                      ["ACOA", "Nova Scotia, New Brunswick, PEI, Newfoundland — business development, tourism, fisheries"],
                      ["Canada Economic Development (CED)", "Quebec — economic development, innovation, SME support"],
                    ].map(([name, desc]) => (
                      <li key={name} className="flex gap-2"><CheckCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" /><span><strong>{name}:</strong> {desc}</span></li>
                    ))}
                  </ul>
                  <p className="leading-relaxed">
                    At the most accessible and broadly relevant level are the <strong>horizontal programs</strong> available
                    to all Canadian businesses regardless of region or sector: NRC IRAP (R&D funding for SMEs), SR&ED
                    (tax credit on all qualifying R&D), the BDC (growth financing and venture capital), and Export
                    Development Canada (EDC) for businesses selling internationally. These programs collectively serve
                    hundreds of thousands of Canadian companies per year and are the most important starting point
                    for any Canadian business seeking federal support.
                  </p>
                </CardContent>
              </Card>

              {/* Regional Agency Map */}
              <Card className="border-2 border-red-200 bg-red-50">
                <CardHeader><CardTitle className="text-xl text-red-900">Federal Regional Development Agencies — By Province</CardTitle></CardHeader>
                <CardContent>
                  <p className="text-sm text-red-800 mb-5 leading-relaxed">
                    Your province determines which RDA to contact first. Most businesses should contact their RDA alongside
                    mainstream federal programs (IRAP, SR&ED) — RDA grants stack with national programs and cover different
                    project costs.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { agency: "FedDev Ontario", provinces: "Southern Ontario", focus: "Technology, advanced manufacturing, commercialization, inclusive growth", url: "feddevontario.gc.ca", range: "$50K – $10M" },
                      { agency: "PacifiCan", provinces: "British Columbia", focus: "Innovation, cleantech, Indigenous economic development, trade", url: "pacifican.gc.ca", range: "$25K – $5M" },
                      { agency: "WD Canada (Prairies)", provinces: "Alberta, Saskatchewan, Manitoba", focus: "Diversification, technology, trade and investment, clean energy", url: "wd-deo.gc.ca", range: "$25K – $5M" },
                      { agency: "ACOA", provinces: "NS, NB, PEI, NL", focus: "Business development, tourism, fisheries, SME growth", url: "acoa-apeca.gc.ca", range: "$10K – $3M" },
                      { agency: "Canada Economic Development (CED)", provinces: "Quebec", focus: "SME development, regional innovation, infrastructure, social economy", url: "dec-ced.gc.ca", range: "$25K – $5M" },
                      { agency: "CanNor", provinces: "Yukon, NWT, Nunavut", focus: "Northern economic diversification, Indigenous business, infrastructure", url: "cannor.gc.ca", range: "$10K – $2M" },
                    ].map(({ agency, provinces, focus, url, range }) => (
                      <div key={agency} className="bg-white rounded-lg p-4 border border-red-200">
                        <div className="font-bold text-red-900 text-sm mb-1">{agency}</div>
                        <div className="text-xs font-medium text-red-700 mb-2">📍 {provinces} | 💰 {range}</div>
                        <div className="text-xs text-gray-600 mb-1">{focus}</div>
                        <div className="text-xs text-blue-600">{url}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Program Deep Dives */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Federal Programs — Detailed Breakdown</h2>
                <p className="text-gray-600 mb-6">In-depth analysis of each program — who they serve, how the money flows, what makes a strong application, and what to avoid.</p>
                <div className="space-y-6">

                  <Card className="border-l-4 border-l-red-500">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">1. Strategic Innovation Fund (SIF) — Canada&apos;s Largest Business Grant</CardTitle>
                        <Badge className="bg-red-100 text-red-800 shrink-0 ml-2">$1M – $400M</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="text-gray-700 space-y-4">
                      <p>
                        The Strategic Innovation Fund brings together what were previously three separate programs (Strategic
                        Aerospace and Defence Initiative, Technology Demonstration Program, and Automotive Innovation Fund)
                        into a single, sector-flexible major investment vehicle. SIF is genuinely Canada&apos;s most powerful
                        industrial policy tool — providing large-scale, long-duration support for projects that advance
                        Canada&apos;s competitive position in global value chains.
                      </p>
                      <p>
                        SIF runs five streams: (1) Business Innovation and Growth for individual company projects; (2)
                        Collaborative R&D for industry-academic partnerships; (3) Net Zero Accelerator for industrial
                        decarbonization; (4) Canada&apos;s Digital Technology Supercluster and other cluster programs; and
                        (5) the SME Stream specifically designed for smaller companies (minimum $1M project, up to $50M
                        SIF contribution). The SME stream is specifically intended to bring mid-size companies into
                        major innovation investments that would otherwise only be accessible to large corporations.
                      </p>
                      <p>
                        SIF decisions involve ISED ministerial sign-off for grants above $10M — making the application
                        process inherently political in addition to technical. Companies applying for large SIF grants
                        typically engage federal officials, industry associations, and occasionally Members of Parliament
                        as part of building the case for their project&apos;s national economic significance. For SME-stream
                        projects ($1M–$50M), the process is more technical and less political, but still requires a
                        compelling case for national economic benefit.
                      </p>
                      <div className="grid sm:grid-cols-2 gap-4 mt-4">
                        <div className="bg-red-50 rounded-lg p-4">
                          <div className="font-semibold text-red-900 mb-2 text-sm">SIF Funds:</div>
                          <ul className="text-xs text-red-700 space-y-1">
                            <li>• Industrial R&D (capital equipment, personnel, overhead)</li>
                            <li>• Technology demonstration and pilots</li>
                            <li>• Commercialization of new technology</li>
                            <li>• Productivity-boosting manufacturing investments</li>
                            <li>• Industrial decarbonization (via Net Zero Accelerator)</li>
                          </ul>
                        </div>
                        <div className="bg-amber-50 rounded-lg p-4">
                          <div className="font-semibold text-amber-900 mb-2 text-sm">SIF Does NOT Fund:</div>
                          <ul className="text-xs text-amber-700 space-y-1">
                            <li>• Basic academic research (use NSERC/CIHR)</li>
                            <li>• Working capital, inventory, or operational costs</li>
                            <li>• Projects with no defined Canadian economic benefit</li>
                            <li>• Projects that have already started without SIF engagement</li>
                            <li>• Acquisitions of other companies</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-blue-500">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">2. Federal Regional Development Agencies (RDAs) in Depth</CardTitle>
                        <Badge className="bg-blue-100 text-blue-800 shrink-0 ml-2">$10K – $10M by region</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="text-gray-700 space-y-4">
                      <p>
                        While SIF serves major industrial investments, the RDAs are the primary source of federal grants
                        for the growth companies, scaling SMEs, and mid-market businesses that make up the bulk of Canada&apos;s
                        business sector. Each RDA administers several programs with different eligibility criteria, but all
                        share common principles: Canadian business operations in the region, a project with defined economic
                        benefits (jobs, revenue, exports, innovation), and matching investment from the applicant.
                      </p>
                      <p>
                        <strong>FedDev Ontario</strong>&apos;s active programs include the Investing in Business Innovation (IBI)
                        program ($50K–$1M for Ontario tech companies commercializing innovations) and the Advanced
                        Manufacturing Fund ($500K–$10M for Ontario manufacturers). <strong>PacifiCan</strong> (BC)
                        prioritizes clean technology, Indigenous economic development, and export diversification through
                        its Regional Innovation Ecosystems program. <strong>WD Canada</strong> (Prairies) offers the
                        Western Innovation Initiative (WINN) and prairie community infrastructure grants. <strong>ACOA</strong>
                        provides the Business Development Program (BDP) for Atlantic businesses — the most consistently
                        accessible of all RDA programs, covering a wide range of business activities.
                      </p>
                      <p>
                        RDA funding typically covers 33–50% of a project&apos;s total eligible costs, with the applicant and
                        sometimes a provincial government contributing the remainder. Unlike SIF, RDA grants typically
                        don&apos;t require ministerial approval and have faster decision timelines (3–6 months vs. 12+ months
                        for large SIF applications).
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-green-500">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">3. Export Development Canada (EDC) — For Businesses Selling Internationally</CardTitle>
                        <Badge className="bg-green-100 text-green-800 shrink-0 ml-2">Financing & guarantees</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="text-gray-700 space-y-4">
                      <p>
                        Export Development Canada is a Crown corporation specifically designed to help Canadian companies
                        grow internationally — filling gaps left by conventional banks for export-related financing. EDC
                        provides: export credit insurance (protecting against foreign buyer non-payment), accounts receivable
                        insurance, working capital guarantees for export activities, foreign buyer financing (allowing
                        foreign customers to purchase Canadian goods on credit), and performance bonds.
                      </p>
                      <p>
                        EDC is particularly valuable for Canadian tech and manufacturing companies that have won contracts
                        with foreign buyers but face cash flow challenges before payment: EDC can insure the receivable
                        and/or provide a working capital facility against the insured receivable, allowing the company
                        to fulfil the contract without equity dilution. EDC also offers a Women Entrepreneurs program
                        with additional trade financing support for women-owned export businesses. Access: edc.ca or
                        contact your bank for EDC-backed financial products.
                      </p>
                    </CardContent>
                  </Card>

                </div>
              </div>

              {/* BDC Financing */}
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader><CardTitle className="text-xl text-blue-900">BDC — Canada&apos;s Most Accessible Business Development Financing</CardTitle></CardHeader>
                <CardContent className="text-blue-900 space-y-3">
                  <p className="text-sm leading-relaxed">
                    The Business Development Bank of Canada (BDC) is not a grant program — it provides financing (loans,
                    quasi-equity, and venture capital) that conventional banks typically won&apos;t. BDC specifically targets
                    the gap between traditional bank lending and equity investment: growth-stage companies that need
                    patient capital without full equity dilution.
                  </p>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {[
                      { product: "BDC Term Loans", desc: "Flexible lending for equipment, facilities, working capital — terms up to 25 years, less restrictive covenants than banks" },
                      { product: "BDC Growth Equity", desc: "Minority equity investment (no operational control) for high-growth companies — $500K to $5M, patient returns timeline" },
                      { product: "BDC Venture Capital", desc: "$250K–$10M VC investment in early-stage tech companies through BDC Capital — one of Canada&apos;s most active VC investors" },
                    ].map(({ product, desc }) => (
                      <div key={product} className="bg-white rounded-lg p-4 border border-blue-200">
                        <div className="font-bold text-blue-900 mb-2 text-sm">{product}</div>
                        <div className="text-xs text-blue-700">{desc}</div>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed mt-2">
                    BDC advisory services (business planning, financial modeling, digital adoption support) are available
                    to any Canadian business at low cost — and are particularly valuable for companies preparing grant
                    applications to SIF or RDA programs that require detailed financial projections.
                  </p>
                </CardContent>
              </Card>

              {/* How to Apply */}
              <Card>
                <CardHeader><CardTitle className="text-xl flex items-center gap-2"><FileText className="h-5 w-5 text-red-600" />How to Navigate Canada&apos;s Federal Funding System — Step by Step</CardTitle></CardHeader>
                <CardContent className="text-gray-700">
                  <div className="space-y-4">
                    {[
                      { step: "1", title: "Start with SR&ED and IRAP — The Universal Foundation", desc: "Before contacting any regional agency or applying for SIF, confirm your SR&ED and IRAP eligibility. SR&ED (35% refundable for CCPCs) is available to any Canadian business doing qualifying R&D and requires only an annual tax filing. IRAP is available to any Canadian SME with fewer than 500 employees conducting technical product development. Together, SR&ED + IRAP can fund 60–90% of your R&D team's costs — providing the financial stability that makes you a stronger applicant to all other programs." },
                      { step: "2", title: "Identify Your Regional Development Agency and Contact Them", desc: "Your province determines your RDA. Find the relevant agency from the table above and contact their regional office directly — not through a generic web form. Ask specifically: 'What programs do you currently have that would be relevant to [describe your project and business type]?' RDA program officers can provide pre-application guidance, help you select the right program, and often indicate whether your project is competitive before you invest time in a full application." },
                      { step: "3", title: "For Large Projects ($1M+) — Engage ISED for SIF Pre-Assessment", desc: "If your project is $1M+ in total cost and falls into SIF&apos;s priority sectors (advanced manufacturing, cleantech, digital/ICT, agri-food, biotech), contact ISED&apos;s Strategic Innovation Fund team for a preliminary project assessment before writing any application. ISED program officers can tell you within 2–4 weeks whether your project is a viable SIF candidate and which stream it should target. SIF applications without pre-assessment frequently target the wrong stream or fail to frame the economic benefit case correctly." },
                      { step: "4", title: "Contact BDC for Growth Capital Needs That Grants Won&apos;t Cover", desc: "Federal grants typically cover 33–50% of total project costs. The remaining 50–67% must come from matching sources — your own capital, private investment, or BDC financing. Contact BDC (bdc.ca) before submitting any RDA or SIF application to confirm your matching financing is in place. Presenting a complete financing plan (grant + BDC loan + your equity) significantly strengthens any federal grant application because it demonstrates the project will be completed regardless of grant outcome." },
                      { step: "5", title: "For Export-Ready Businesses — Register with EDC and Trade Commissioner Service", desc: "If your business sells or plans to sell internationally, register with Export Development Canada at edc.ca and with the Trade Commissioner Service (TCS) at tradecommissioner.gc.ca. TCS provides free market intelligence, export advisor support, and introductions to foreign buyers in 160+ countries. EDC provides financing that enables international business that conventional banking won't support. Both are free to access and dramatically reduce the risk and cost of international expansion." },
                      { step: "6", title: "Layer All Non-Conflicting Programs Simultaneously", desc: "Canada&apos;s federal funding programs are explicitly designed to layer — RDA grants, IRAP, SR&ED, BDC, and EDC routinely co-fund the same companies at the same time (funding different cost categories or activities). The only conflict to avoid is double-claiming the same specific expense to two government programs — which is not permitted. As long as you maintain clear project-level accounting with each program funding distinct, documented cost categories, stacking is not only allowed but encouraged as the optimal approach to maximizing non-dilutive capital." },
                    ].map((item) => (
                      <div key={item.step} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="h-8 w-8 rounded-full bg-red-700 text-white flex items-center justify-center text-sm font-bold shrink-0">{item.step}</div>
                        <div><div className="font-semibold text-gray-900 mb-1">{item.title}</div><div className="text-sm text-gray-600 leading-relaxed">{item.desc}</div></div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Common Mistakes */}
              <Card className="border-red-100 bg-red-50">
                <CardHeader><CardTitle className="text-xl flex items-center gap-2 text-red-900"><AlertCircle className="h-5 w-5 text-red-600" />5 Costly Mistakes Businesses Make with Federal Canadian Grants</CardTitle></CardHeader>
                <CardContent className="text-red-900 space-y-4">
                  {[
                    { n: "1", m: "Applying to SIF Without Pre-Engagement with ISED", d: "The Strategic Innovation Fund is not a self-serve application portal. Successful SIF recipients almost universally begin with proactive engagement with ISED officials — explaining their project, testing the economic benefit narrative, and confirming stream eligibility — before any formal application is submitted. SIF applications submitted cold without prior ISED engagement have a dramatically lower success rate. Call or email ISED&apos;s SIF team early in your project planning, before writing any application materials." },
                    { n: "2", m: "Contacting ISED (Federal) When You Should Be Contacting Your RDA", d: "Many Canadian businesses email ISED or the federal government website with project enquiries that should go to their Regional Development Agency. RDAs have different programs, different eligibility criteria, faster timelines, and smaller project sizes than ISED&apos;s national programs. If your project is under $1M, ISED/SIF is likely not the right starting point regardless of your sector — your provincial RDA is. Determine which government — federal RDA or ISED — best matches your project scale before making first contact." },
                    { n: "3", m: "Starting Projects Before Government Grant Engagement", d: "Most federal grants in Canada — SIF, RDA contributions, and many ISED programs — explicitly prohibit retroactive funding. If you begin construction, purchase major equipment, or hire the key personnel for a project before a federal grant is negotiated and approved, those costs are typically ineligible. Engage federal programs during your project planning phase, before committing capital, and specifically ask: &apos;Are costs incurred before federal approval eligible?&apos; The answer in most cases is no." },
                    { n: "4", m: "Not Using BDC to Structure the Matching Funding Required by RDA Grants", d: "Regional Development Agency grants require applicants to demonstrate matching funding (typically 33–50% of total project cost from non-federal sources). Many applicants don&apos;t realize that BDC loans count as acceptable matching — they scramble to find equity investors when BDC growth financing would serve the same purpose without dilution. Contact BDC early in your RDA application process to structure a term loan or quasi-equity facility that provides the required matching contribution. This combination (RDA grant + BDC loan) is the standard structure for most RDA-funded projects in Canada." },
                    { n: "5", m: "Missing EDC and TCS for International Business Development", d: "Export Development Canada (EDC) and the Trade Commissioner Service (TCS) together constitute the most underutilized free international business support ecosystem in the world. Both are completely free to access and provide services worth $50K–$200K per year in equivalent consulting costs: TCS provides dedicated export advisors, foreign buyer introductions, and market intelligence in 160+ countries; EDC provides insurance, guarantees, and financing specifically structured to enable international business that conventional banks won&apos;t support. Any Canadian company with international revenue or ambitions should be registered and actively using both programs." },
                  ].map(({ n, m, d }) => (
                    <div key={n} className="bg-white rounded-lg p-4 border border-red-200">
                      <div className="font-semibold mb-2 text-red-900">{n}. {m}</div>
                      <p className="text-sm text-red-800 leading-relaxed">{d}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Expert Tip */}
              <Card className="border-amber-200 bg-amber-50">
                <CardHeader><CardTitle className="text-xl flex items-center gap-2 text-amber-800"><Lightbulb className="h-5 w-5 text-amber-600" />Expert Strategy: Navigating the Federal Funding Landscape</CardTitle></CardHeader>
                <CardContent className="text-amber-900 space-y-4">
                  <div className="bg-white rounded-lg p-4 border border-amber-200">
                    <div className="font-semibold mb-2">💡 The Canadian Business Funding Pyramid — Which Program for Which Stage</div>
                    <p className="text-sm leading-relaxed">Think of Canada&apos;s federal programs as a pyramid. At the base: SR&ED and IRAP — available to every Canadian SME doing R&D, no minimum project size, and the fastest decisions. In the middle: RDA grants — available to growing companies with defined economic projects, $25K–$10M, regional focus, 3–6 month decisions. Near the top: SIF — for major investments by established companies or large-scale partnerships, $1M–$400M, 12–18 month decisions. At the peak: large SIF investments and industrial policy deals negotiated at the ministerial level. Most businesses should work upward through this pyramid as they grow, starting at the base before attempting programs higher up.</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-amber-200">
                    <div className="font-semibold mb-2">💡 The Complete Federal Grant Stack for a $2M Technology Project in Ontario</div>
                    <p className="text-sm leading-relaxed">A $2M Ontario technology project can be funded as follows: IRAP ($400K for R&D wages) + SR&ED ($250K year-end refund) + FedDev Ontario IBI ($300K for commercialization) + Ontario provincial program ($200K) + BDC term loan ($500K matching) = $1.65M covered from 5 non-dilutive sources requiring only $350K in company equity + the BDC loan payments. The same project funded entirely by equity at typical angel/seed valuation would dilute founders by 15–25% at the $2M level. Government funding reduces dilution by 60–70% for a typical technology project.</p>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">FAQ: Canada Government Business Grants 2026</h2>
                <p className="text-gray-600 mb-6">Common questions from Canadian founders, CFOs, and executives navigating the federal business funding system.</p>
                <div className="space-y-4">
                  {[
                    { q: "What is the difference between a federal grant, a contribution, and a repayable contribution?", a: "In Canada, federal government funding to businesses commonly takes three forms. A non-repayable grant is money given with no expectation of repayment — the closest to a true grant. A contribution is also non-repayable but typically comes with more reporting conditions and audit rights. A repayable contribution is essentially a low-interest or interest-free government loan — the money must be repaid, often over 5–10 years, but at terms far more favorable than commercial lending. SIF typically provides repayable contributions. ACOA BDP provides both repayable and non-repayable contributions depending on the program and project type. IRAP provides non-repayable grants. When reviewing any federal program, confirm which type of funding is offered before applying." },
                    { q: "Does the federal government have grants for sole proprietors and very small businesses?", a: "Most large federal grants (SIF, RDA contributions above $500K) are designed for incorporated businesses with commercial operations and employees. However, several programs serve very small businesses: ACOA&apos;s Business Development Program has funded projects as small as $10,000 for Atlantic businesses. IRAP funds sole proprietor or very small team tech companies. SR&ED has no minimum business size. The Canada Small Business Financing Program (CSBFP) provides BDC-backed loan guarantees to any registered small business for equipment, leasehold improvements, and real property. The key threshold issue is incorporation — most federal grants require a corporation rather than a sole proprietorship." },
                    { q: "How long does it take to receive a federal government grant in Canada?", a: "Timeline varies dramatically by program. SR&ED is filed with your annual T2 and CRA processes/pays within 60–120 days of filing. IRAP can approve projects in 4–8 weeks and begins disbursing within 1–3 months. RDA grants (FedDev, PacifiCan, ACOA, WD, CED) typically take 3–6 months from full application to approval and 1–2 months more to first disbursement. SIF projects under $10M take 6–12 months. Major SIF projects ($50M+) can take 18–24+ months from concept to contribution agreement. Plan cash requirements accordingly — most companies need bridge financing to sustain operations until government grant disbursements begin." },
                    { q: "Can a non-Canadian company with Canadian operations access federal Canadian grants?", a: "Yes, with important nuances. Non-Canadian companies with Canadian-incorporated subsidiaries conducting genuine Canadian operations (employees, R&D, production, commercial activities in Canada) can access most federal programs as the Canadian subsidiary. For IRAP, the subsidiary must be a Canadian SME with fewer than 500 employees and the R&D must happen in Canada. For SIF, economic benefit to Canada (jobs, IP, supply chain, productivity) must be demonstrated. For RDA programs, the funded activities must create economic benefit to the relevant region. The Canadian subsidiary — not the foreign parent — typically signs the contribution agreement and is responsible for compliance. Always confirm with the program officer whether a foreign-controlled Canadian corporation is eligible." },
                    { q: "What is the CanExport program and who is it for?", a: "CanExport SME is a federal program specifically for Canadian SMEs (under $100M revenue) seeking to develop new export markets. It provides non-repayable grants of $20,000–$100,000 to reimburse up to 75% of export market development activities — including: international trade show attendance, foreign market research, product adaptation for international regulations, translation and localization, and export-focused digital marketing. Applications are online through tradecommissioner.gc.ca. CanExport is for developing NEW markets — it does not fund activities in markets where you already have significant sales (the program defines this as under $100K in sales to the target market in the past two years). Decisions are typically within 4–6 weeks." },
                    { q: "Are Canadian government grants taxable income?", a: "This is a critical and frequently misunderstood question. In general, federal government grants received by a Canadian corporation are taxable income in the year received, unless specifically exempt. However, the tax treatment varies: SR&ED tax credits reduce the SR&ED expenditure pool (reducing future depreciation deductions) rather than being directly taxable as income. Repayable contributions are generally not taxable income when received but may affect loss carryforwards. Non-repayable grants for capital expenditure reduce the capital cost allowance (CCA) base of the asset purchased. Engage your tax accountant specifically on the tax treatment of any federal grant before budgeting — the net after-tax value of the grant can differ significantly from the nominal amount." },
                    { q: "Is there a single portal to find all Canadian federal government grants?", a: "Canada&apos;s federal grant landscape is fragmented — there is no single comprehensive portal. The most useful starting points are: canada.ca/en/services/business/grants (federal grants overview), Innovation Canada&apos;s business benefits finder (innovation.canada.ca — provides a questionnaire that suggests matching programs), your RDA&apos;s website for regional programs, and nrc.canada.ca/irap for technology R&D funding. The Canada Business Network (canadabusiness.ca) also provides regional grant guidance and has business advisors who can help identify relevant programs. Grant consultants and firms specializing in Canadian federal funding can also survey the full landscape for fees or success-based compensation." },
                    { q: "Does Canada have any grants specifically for rural or remote businesses?", a: "Yes — multiple programs specifically address rural and remote business needs. The Rural Economic Development program (through Agriculture and Agri-Food Canada) supports rural community economic development. RDAs all have rural-specific programs: PacifiCan&apos;s Community Economic Development Interest, WD Canada&apos;s rural programs, ACOA&apos;s Community Infrastructure Improvement Fund. CanNor focuses on the three territories (Yukon, NWT, Nunavut). Some RDA programs apply higher contribution rates (up to 75% instead of 50%) for businesses in rural areas or smaller communities. Digital Adoption Program (CDAP) specifically helps rural SMEs digitally transform their operations with government support." },
                  ].map((item, i) => (
                    <Card key={i}><CardContent className="pt-5">
                      <div className="font-semibold text-gray-900 mb-2 text-base">{item.q}</div>
                      <div className="text-gray-600 text-sm leading-relaxed">{item.a}</div>
                    </CardContent></Card>
                  ))}
                </div>
              </div>

            </div>

            <div className="space-y-6">
              <Card className="bg-red-800 text-white">
                <CardContent className="pt-6">
                  <Star className="h-8 w-8 text-yellow-300 mb-3" />
                  <h3 className="font-bold text-lg mb-2">Free Federal Grant Matching</h3>
                  <p className="text-red-100 text-sm mb-4">Our specialists identify which SIF, RDA, IRAP, and provincial programs fit your business — and help you build a complete non-dilutive funding stack.</p>
                  <Link href="/contact"><Button className="w-full bg-white text-red-800 hover:bg-red-50">Get Free Matching <ArrowRight className="h-4 w-4 ml-1" /></Button></Link>
                </CardContent>
              </Card>
              <NewsletterSignup variant="sidebar" />
              <Card>
                <CardHeader><CardTitle className="text-lg">Key Federal Agency Contacts</CardTitle></CardHeader>
                <CardContent className="text-sm space-y-3">
                  <div><div className="font-semibold">ISED (SIF)</div><div className="text-gray-500">ised-isde.canada.ca</div></div>
                  <div><div className="font-semibold">FedDev Ontario</div><div className="text-gray-500">feddevontario.gc.ca</div></div>
                  <div><div className="font-semibold">PacifiCan (BC)</div><div className="text-gray-500">pacifican.gc.ca</div></div>
                  <div><div className="font-semibold">ACOA (Atlantic)</div><div className="text-gray-500">acoa-apeca.gc.ca</div></div>
                  <div><div className="font-semibold">BDC</div><div className="text-gray-500">bdc.ca | 1-888-463-6232</div></div>
                  <div><div className="font-semibold">EDC</div><div className="text-gray-500">edc.ca | 1-800-229-0575</div></div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-lg">Related Resources</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <Link href="/canada/small-business-grants" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> Canada Small Business Grants</Link>
                    <Link href="/canada/innovation-grants" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> Canada Innovation Grants</Link>
                    <Link href="/blog/irap-nrc-canada-guide" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> IRAP Complete Guide</Link>
                    <Link href="/blog/sred-tax-credit-guide" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> SR&ED Tax Credit Guide</Link>
                    <Link href="/grant-finder" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> AI Grant Finder Tool</Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mb-8">
            <NewsletterSignup title="Canada Government Grant Updates" description="Track SIF intake cycles, RDA program launches, federal budget grant announcements, and sector-specific funding opportunities — delivered to your inbox." />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
