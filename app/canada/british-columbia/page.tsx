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

export const metadata: Metadata = {
    title: "BC Business Grants 2026: $200M+ Available [How to Apply]",
    description:
        "Find British Columbia business grants and provincial funding programs. Complete guide to BC government grants, Innovate BC funding, and application deadlines.",
    keywords:
        "BC business grants, British Columbia government funding, provincial grants BC, Innovate BC, startup funding Vancouver",
}

const bcGrants: Grant[] = [
    {
        id: "bc-ignite",
        name: "Innovate BC - Ignite",
        fundingMin: 100000,
        fundingMax: 300000,
        eligibility: ["BC-based R&D consortia", "Academic partnerships"],
        deadline: "Annual calls",
        applicationLink: "https://www.innovatebc.ca/programs/ignite/",
        description: "Funding for R&D projects addressing market problems.",
        country: "Canada",
        region: "British Columbia",
        category: "Innovation",
        agency: "Innovate BC",
        status: "Active",
        tags: ["R&D", "Technology"],
        requirements: ["Consortium agreement", "Research plan"],
        lastUpdated: "2026-01-01"
    },
    {
        id: "bc-clean-industry",
        name: "CleanBC Industry Fund",
        fundingMin: 100000,
        fundingMax: 5000000,
        eligibility: ["Industrial facilities in BC", "Emissions reduction projects"],
        deadline: "Calls for proposals",
        applicationLink: "https://www2.gov.bc.ca/gov/content/environment/climate-change/industry/cleanbc-industry-fund",
        description: "Funding for cleaner industrial operations and emissions reduction.",
        country: "Canada",
        region: "British Columbia",
        category: "Green Energy",
        agency: "Government of BC",
        status: "Active",
        tags: ["Clean Tech", "Environment"],
        requirements: ["Emissions study", "Project plan"],
        lastUpdated: "2026-01-01"
    },
    {
        id: "bc-employer-training",
        name: "BC Employer Training Grant",
        fundingMin: 1000,
        fundingMax: 300000,
        eligibility: ["Employers in BC", "Training for employees"],
        deadline: "Rolling",
        applicationLink: "https://www.workbc.ca/Employer-Resources/BC-Employer-Training-Grant.aspx",
        description: "Cost-sharing support for employee skills training.",
        country: "Canada",
        region: "British Columbia",
        category: "Workforce",
        agency: "WorkBC",
        status: "Active",
        tags: ["Training", "Workforce"],
        requirements: ["Training plan", "Employee eligibility"],
        lastUpdated: "2026-01-01"
    },
    {
        id: "bc-buy-bc",
        name: "Buy BC",
        fundingMin: 5000,
        fundingMax: 75000,
        eligibility: ["Agriculture", "Food/Beverage sector"],
        deadline: "Annual",
        applicationLink: "https://buybc.gov.bc.ca/",
        description: "Marketing support for BC food products and agricultural businesses.",
        country: "Canada",
        region: "British Columbia",
        category: "Agriculture",
        agency: "Ministry of Agriculture",
        status: "Active",
        tags: ["Agriculture", "Marketing"],
        requirements: ["Marketing plan"],
        lastUpdated: "2026-01-01"
    },
]

export default function BritishColumbiaGrantsPage() {
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
                                British Columbia Provincial Funding
                            </Badge>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">BC Business Grants 2026: $200M+ Available</h1>
            <div className="mt-8 mb-4 text-left">
              <ShortAnswerBox
                question="What government grants are available for BC businesses in 2026?"
                content="BC businesses can access Innovate BC grants ($50K–$250K for tech SMEs), CleanBC programs for energy efficiency and emissions reduction, the BC Employer Training Grant (up to 80% of training costs), PacifiCan federal contributions for economic development, and BC's Interactive Digital Media Tax Credit (17.5% of eligible labour). Combined with federal SR&ED and IRAP programs, BC tech and clean energy companies are among the strongest grant candidates in Canada."
              />
            </div>
            <div className="flex justify-center mb-4">
              <EEATBadge authorName="Ashwani K." authorImage="/author-ashwani.jpg" date="2026-02-09" />
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
                                <div className="text-2xl font-bold text-primary">$200M+</div>
                                <p className="text-xs text-muted-foreground">Annual provincial programs</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Active Programs</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-primary">22+</div>
                                <p className="text-xs text-muted-foreground">Provincial grant programs</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-primary">32%</div>
                                <p className="text-xs text-muted-foreground">Average approval rate</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Grant Comparison Table */}
                    <div className="mb-12">
                        <GrantComparisonTable
                            grants={bcGrants}
                            title="BC Business Grants Comparison"
                        />
                    </div>

                    {/* Content Sections */}

                    <div className="mb-12">
                        <InlineCTA
                            title="Need Strategy for British Columbia Grants?"
                            description="Our specialists can help you navigate British Columbia's provincial programs."
                            buttonText="Get Funding Assistance"
                            buttonLink="/contact"
                        />
                    </div>
                    <div className="grid lg:grid-cols-3 gap-8 mb-12">
                        <div className="lg:col-span-2 space-y-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle>BC Business Grant Opportunities</CardTitle>
                                </CardHeader>
                                <CardContent className="prose max-w-none">
                                    <p>
                                        British Columbia provides extensive support for technology, clean energy, and natural resource sectors. Innovate BC plays a central role in delivering funding to tech-enabled businesses.
                                    </p>

                                    <h3>Key BC Grant Programs</h3>
                                    <ul>
                                        <li>
                                            <strong>Innovate BC Ignite</strong> - Commercialization of research
                                        </li>
                                        <li>
                                            <strong>CleanBC Industry Fund</strong> - Reducing greenhouse gas emissions
                                        </li>
                                        <li>
                                            <strong>BC Employer Training Grant</strong> - Costs of skills training
                                        </li>
                                        <li>
                                            <strong>Launch Online Grant</strong> - E-commerce adoption (periodic)
                                        </li>
                                    </ul>

                                    <h3>Eligibility Requirements</h3>
                                    <p>
                                        Standard requirements for BC grants involve:
                                    </p>
                                    <ul>
                                        <li>Registration in BC</li>
                                        <li>Operating within the province</li>
                                        <li>Compliance with WorkSafeBC</li>
                                        <li>Specific sector focus (e.g., cleantech, agrifood)</li>
                                    </ul>
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
                                        <a href="/canada/alberta" className="block text-primary hover:underline">
                                            Alberta Business Grants
                                        </a>
                                        <a href="/canada/government-grants" className="block text-primary hover:underline">
                                            Federal Canadian Grants
                                        </a>
                                        <a href="/grant-finder" className="block text-primary hover:underline">
                                            AI Grant Finder Tool
                                        </a>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Deep Content Section */}
                    <div className="max-w-4xl mx-auto space-y-10 mb-12">

                        <Card>
                            <CardHeader><CardTitle className="text-xl">Innovate BC — British Columbia&apos;s Primary Innovation Agency</CardTitle></CardHeader>
                            <CardContent className="text-gray-700 space-y-4">
                                <p className="leading-relaxed">Innovate BC is the province&apos;s central innovation funding agency, connecting BC-based companies and researchers with funding, programs, and networks that accelerate commercialization and technology adoption. BC&apos;s tech sector — the third largest in Canada after Ontario and Quebec — benefits from a rich ecosystem of provincial, federal, and private funding stacked on top of each other.</p>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm border-collapse">
                                        <thead><tr className="bg-blue-800 text-white"><th className="text-left p-3">Program</th><th className="text-left p-3">Amount</th><th className="text-left p-3">Best For</th><th className="text-left p-3">Structure</th></tr></thead>
                                        <tbody>
                                            {[
                                                ["Ignite R&D Program", "$100K–$300K", "Collaborative R&D projects between BC companies and post-secondary institutions", "50% non-repayable grant; 50% from industry partners"],
                                                ["Innovate BC Venture Acceleration", "$50K", "Pre-seed BC tech startups needing structured go-to-market support", "Non-dilutive funding + 8-month program"],
                                                ["BC Employer Training Grant", "$1K–$300K", "BC employers training employees in high-demand skills (tech, trades, health)", "Up to 80% of training costs covered"],
                                                ["CleanBC Industry Fund", "$100K–$5M", "Industrial facilities in BC reducing GHG emissions through tech investment", "Competitive; project must demonstrate measurable emissions reduction"],
                                                ["Buy BC Partnership Program", "$5K–$75K", "BC food, beverage, and agriculture companies promoting products in-province or for export", "50% cost-share; marketing, labeling, promotion eligible"],
                                                ["BC Tech Fund", "Varies", "BC-based technology companies seeking scale-up capital through institutional channels", "Investment via BC Tech Fund LPs; not a direct grant"],
                                            ].map(([p, a, b, s], i) => (
                                                <tr key={p} className={i % 2 === 0 ? "bg-white" : "bg-blue-50"}>
                                                    <td className="p-3 font-semibold text-blue-900 text-xs">{p}</td>
                                                    <td className="p-3 text-green-700 font-medium text-xs">{a}</td>
                                                    <td className="p-3 text-gray-600 text-xs">{b}</td>
                                                    <td className="p-3 text-gray-500 text-xs">{s}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader><CardTitle className="text-xl">CleanBC &amp; Green Economy — BC&apos;s Largest Grant Category</CardTitle></CardHeader>
                            <CardContent className="text-gray-700 space-y-4">
                                <p className="leading-relaxed">British Columbia is Canada&apos;s most progressive clean economy province — CleanBC (BC&apos;s climate action plan) creates a substantial funding stream for businesses reducing emissions, adopting clean technologies, and building sustainable supply chains. Combined with federal clean economy programs, BC businesses can access some of the highest clean-tech funding stacks in North America.</p>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {[
                                        { name: "CleanBC Industry Fund", amount: "$100K–$5M+", desc: "The flagship fund for BC industrial businesses. Covers electrification, fuel switching, process efficiency, and low-carbon industrial technology. Heavy industry, pulp & paper, mining, and cement are priority sectors. Projects must demonstrate at least 30% GHG reduction.", apply: "gov.bc.ca/cleanbc-industry-fund" },
                                        { name: "CleanBC Go Electric Commercial Vehicle Program", amount: "Up to $26K per vehicle", desc: "Incentives for BC businesses purchasing zero-emission commercial vehicles (vans, trucks, forklifts, buses). Higher incentives for medium/heavy-duty commercial vehicles. No application required — claimed at point of sale through participating dealers.", apply: "pluginbc.ca" },
                                        { name: "BC On-Bill Financing", amount: "Up to $20K (residential) / Higher commercial", desc: "BC Hydro and FortisBC offer on-bill financing for energy efficiency upgrades. Businesses finance improvements via utility bill surcharge — no upfront capital required. Covers HVAC, lighting, motors, building envelope upgrades.", apply: "bchydro.com and fortisbc.com energy efficiency portals" },
                                        { name: "Innovative Clean Energy (ICE) Fund", amount: "$50K–$5M", desc: "BC government fund for clean energy technology development, demonstration, and deployment. Prioritizes projects advancing renewable energy, energy storage, smart grid, and waste-to-energy technologies in BC communities.", apply: "gov.bc.ca/ice-fund" },
                                    ].map(({ name, amount, desc, apply }) => (
                                        <div key={name} className="bg-green-50 rounded-lg p-4 border border-green-200">
                                            <div className="font-semibold text-green-900 text-sm mb-1">{name}</div>
                                            <div className="text-xs text-green-700 font-medium mb-1">💰 {amount}</div>
                                            <div className="text-xs text-gray-600 mb-1 leading-relaxed">{desc}</div>
                                            <div className="text-xs text-gray-500">{apply}</div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader><CardTitle className="text-xl">Federal Programs for BC Businesses — PacifiCan and Key Stacking Opportunities</CardTitle></CardHeader>
                            <CardContent className="text-gray-700 space-y-3">
                                <p className="text-sm leading-relaxed">PacifiCan (Pacific Economic Development Canada) replaced the former Western Economic Diversification (WD) as BC&apos;s regional development agency in 2021. For BC businesses not near a major tech hub, PacifiCan is often the most accessible large-grant federal program available. BC businesses can stack PacifiCan + Innovate BC + SR&ED for maximum funding coverage.</p>
                                <div className="grid sm:grid-cols-3 gap-3">
                                    {[
                                        { prog: "PacifiCan Business Scale-Up", val: "$50K–$10M", note: "Repayable/non-repayable contributions for high-growth BC businesses; offices in Vancouver, Kelowna, Surrey" },
                                        { prog: "NRC-IRAP", val: "Up to $50K+", note: "Industrial R&D support; IRAP advisors throughout BC including Surrey, Vancouver, Victoria" },
                                        { prog: "SR&ED + BC SRED", val: "15% federal + 10% BC", note: "BC has a 10% provincial SR&ED credit on top of the 15% federal — among the best R&D stacks in Canada" },
                                        { prog: "CanExport SMEs", val: "Up to $50K", note: "Federal export market development grants — popular with Vancouver tech and film companies" },
                                        { prog: "CDAP", val: "$15K", note: "Canada Digital Adoption Program grants for e-commerce/digital technology adoption by BC small businesses" },
                                        { prog: "CSBFP Loans", val: "Up to $1.15M", note: "Government-guaranteed business loans; popular for restaurant, retail, and service businesses in BC" },
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
                            <CardHeader><CardTitle className="text-xl text-red-900">5 Mistakes BC Businesses Make When Applying for Provincial Grants</CardTitle></CardHeader>
                            <CardContent className="text-red-900 space-y-3">
                                {[
                                    { n: "1", m: "Confusing Innovate BC Programs with Direct Cash Grants", d: "Innovate BC&apos;s flagship Ignite program requires a collaboration agreement between a BC company AND a BC post-secondary institution (UBC, SFU, BCIT, etc.) — it&apos;s not a direct company grant. BC businesses that apply without a post-secondary partner in place are disqualified immediately. Establish your university or college partnership before beginning the Ignite application." },
                                    { n: "2", m: "Missing CleanBC Industry Fund Intake Windows", d: "The CleanBC Industry Fund has competitive intakes — not rolling applications. BC industrial businesses that plan capital projects without aligning to CleanBC intake schedules miss out on substantial funding (up to $5M+). Monitor gov.bc.ca/CleanBC quarterly for upcoming intake announcements. For projects in planning phases, engage CleanBC staff early to understand intake timing before finalizing capital budgets." },
                                    { n: "3", m: "Not Combining BC SR&ED Credits with Federal SR&ED on the Same Project", d: "BC has a 10% provincial SR&ED credit (on top of the 15% federal credit) for qualifying R&D expenditures. BC technology companies that file only the federal SR&ED claim and miss the BC provincial credit are leaving 10 cents on every eligible R&D dollar on the table. File both claims through your SR&ED consultant in the same tax year." },
                                    { n: "4", m: "Applying to PacifiCan Without Understanding Repayable vs. Non-Repayable Funding", d: "PacifiCan Business Scale-Up contributions are frequently structured as partially repayable — meaning a portion must be repaid over time (typically 0% interest, cash flow-based). BC businesses that budget PacifiCan funding as full non-dilutive grants are often surprised by repayment terms. Clarify the repayable/non-repayable split in your PacifiCan contribution agreement before committing project resources." },
                                    { n: "5", m: "Overlooking the BC Employer Training Grant for Tech Hiring", d: "The BC Employer Training Grant covers up to 80% of training costs for BC employers upskilling their workforce — including technical training for software, AI, cybersecurity, and data science. This program is dramatically underutilized by tech companies who assume it only covers trades or construction training. Any BC employer training employees in eligible skills qualifies." },
                                ].map(({ n, m, d }) => (
                                    <div key={n} className="bg-white rounded-lg p-4 border border-red-200">
                                        <div className="font-semibold text-red-900 mb-1 text-sm">{n}. {m}</div>
                                        <p className="text-xs text-red-800 leading-relaxed">{d}</p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">FAQ: BC Business Grants 2026</h2>
                            <div className="space-y-4">
                                {[
                                    { q: "What BC grant is best for a technology startup in Vancouver?", a: "For very early-stage Vancouver tech startups (pre-revenue to early revenue), the Innovate BC Venture Acceleration Program ($50K non-dilutive + structured support) is the most accessible direct startup grant. For startups doing R&D in collaboration with UBC, SFU, or BCIT, Innovate BC Ignite ($100K–$300K) is more substantial but requires an academic partner. NRC-IRAP (via the Vancouver or Surrey IRAP office) is also excellent for startups with defined R&D projects. Most experienced BC startup founders combine two or three of these programs simultaneously." },
                                    { q: "Does BC have grants for clean energy or cleantech companies?", a: "Yes — BC is one of Canada&apos;s best provinces for cleantech funding. CleanBC Industry Fund (up to $5M+), the Innovative Clean Energy Fund ($50K–$5M), CleanBC commercial EV incentives, and BC Hydro/FortisBC energy efficiency financing are all active. Combined with federal programs (NRCan programs, SDTC, SR&ED), BC cleantech companies can stack multiple funding sources. Engage with Canada&apos;s Clean Energy Fund and CleanBC at the earliest planning stages of any capital project." },
                                    { q: "What is PacifiCan and how does it differ from Innovate BC?", a: "PacifiCan (Pacific Economic Development Canada) is the federal regional development agency for British Columbia — a federal government body with a BC focus. Innovate BC is a provincial Crown corporation funded by the BC government. They serve different purposes: PacifiCan focuses on business scale-up, market expansion, and economic diversification (larger funding amounts, often repayable); Innovate BC focuses on innovation, R&D commercialization, and startup support (smaller amounts, typically non-repayable grants). Many BC businesses successfully access both simultaneously for different project components." },
                                    { q: "Are there BC grants specifically for the film and entertainment industry?", a: "Yes — the BC Production Services Tax Credit (28% + additional credits) is among the most attractive film incentives in North America, bringing major Hollywood productions to BC. For BC domestic production companies, BC Film+Media administers various development and production funding programs. Digital media companies can access grants through Creative BC. The combination of BC film tax credits + the federal Canadian Film or Video Production Tax Credit (CPTC) makes BC one of the most financially attractive film production jurisdictions globally." },
                                    { q: "How does the BC Employer Training Grant work?", a: "The BC Employer Training Grant covers up to 80% of eligible training costs for BC employers who train their employees. Eligible training: any training from a recognized BC training provider that develops in-demand workforce skills. Eligible costs: tuition, materials, registration fees. The grant is administered through WorkBC — apply before training begins (not retroactively). Particularly valuable for tech companies upskilling development teams, healthcare employers training staff, and manufacturers implementing new production technologies." },
                                    { q: "Can non-BC companies access BC grants if they have a BC office?", a: "Generally yes — most BC provincial grants require businesses to be incorporated in BC (or have a registered BC entity) and have their primary operations or significant operations in BC. A company headquartered elsewhere that sets up a legitimate BC subsidiary or branch office with BC employees, BC operations, and BC tax obligations typically qualifies for provincial programs. Purely nominal BC addresses without substantive operations do not satisfy the BC presence requirement for Innovate BC or CleanBC programs." },
                                    { q: "What industries receive the most BC provincial grant funding?", a: "BC&apos;s provincial grant funding by sector: Clean technology and energy (28%), Information and communication technology (22%), Life sciences and health (18%), Agri-food and natural resources (17%), Other (15%). Vancouver&apos;s strong fintech, gaming, and digital media economies also receive significant ecosystem support through Creative BC, NOHFC, and industry associations. The most per-capita funded sector in BC relative to business count is life sciences — driven by multiple provincially-backed biotech clusters in Vancouver and Victoria." },
                                    { q: "Are there BC grants for rural or northern businesses?", a: "Yes — BC has specific programs for rural and northern communities including: Northern Development Initiative Trust (NDIT) grants for businesses in Northern BC; Columbia Basin Trust grants for the Columbia Basin region; and Community Futures network offices throughout rural BC providing business loans and advisory support. For all rural BC businesses, PacifiCan also prioritizes projects in underserved communities. Rural BC businesses often face less competition for funding than Vancouver Metro businesses applying to the same programs." },
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
                            title="Get BC Grant Updates"
                            description="Stay informed about new British Columbia business grants and funding opportunities"
                        />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
