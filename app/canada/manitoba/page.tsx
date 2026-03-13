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
    title: "Manitoba Business Grants 2026 | Provincial Funding Programs",
    description:
        "Find Manitoba business grants and provincial funding programs. Complete guide to Manitoba government grants, eligibility requirements, and application deadlines.",
    keywords:
        "Manitoba business grants, Manitoba government funding, provincial grants Manitoba, Winnipeg business grants, startup funding Manitoba",
}

const manitobaGrants: Grant[] = [
    {
        id: "mb-igp",
        name: "Innovation Growth Program",
        fundingMin: 25000,
        fundingMax: 100000,
        eligibility: ["SMEs", "Commercializing new products"],
        deadline: "Quarterly intakes",
        applicationLink: "https://www.gov.mb.ca/iec/invest/igp.html",
        description: "Funding for innovative product commercialization and growth.",
        country: "Canada",
        region: "Manitoba",
        category: "Innovation",
        agency: "Government of Manitoba",
        status: "Active",
        tags: ["Innovation", "Commercialization"],
        requirements: ["Business plan", "Market analysis"],
        lastUpdated: "2026-01-01"
    },
    {
        id: "mb-mwci",
        name: "Manitoba Works Capital Incentive",
        fundingMin: 100000,
        fundingMax: 1000000,
        eligibility: ["Major capital investments", "Job creation"],
        deadline: "Open",
        applicationLink: "https://www.gov.mb.ca/iec/invest/mwci.html",
        description: "Tax Increment Financing for significant capital investment projects.",
        country: "Canada",
        region: "Manitoba",
        category: "Business Development",
        agency: "Government of Manitoba",
        status: "Active",
        tags: ["Capital", "Investment"],
        requirements: ["Project proposal", "Economic benefit analysis"],
        lastUpdated: "2026-01-01"
    },
    {
        id: "mb-sector",
        name: "Sector Support Program",
        fundingMin: 10000,
        fundingMax: 150000,
        eligibility: ["Key economic sectors", "Business expansion"],
        deadline: "Various",
        applicationLink: "https://www.gov.mb.ca/",
        description: "Support for strategic sector growth and expansion.",
        country: "Canada",
        region: "Manitoba",
        category: "Sector Specific",
        agency: "Government of Manitoba",
        status: "Active",
        tags: ["Sector", "Growth"],
        requirements: ["Sector alignment"],
        lastUpdated: "2026-01-01"
    },
]

export default function ManitobaGrantsPage() {
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
                                Manitoba Provincial Funding
                            </Badge>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Manitoba Business Grants 2026</h1>
            <div className="mt-8 mb-4 text-left">
              <ShortAnswerBox
                question="What government grants are available for Manitoba businesses in 2026?"
                content="Manitoba businesses can access MABI (Manitoba Agriculture Business Improvement Loan) up to $500K, the Manitoba Interactive Digital Media Tax Credit (40% of eligible labour), PrairiesCan federal economic development contributions, the Manitoba Hydro Power Smart program for energy efficiency upgrades, and Manitoba Jobs and Economy grants for workforce development. Combined with federal IRAP and SR&ED, Manitoba agri-business, manufacturing, and digital media companies have multiple stacking options."
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
                                <div className="text-2xl font-bold text-primary">$60M+</div>
                                <p className="text-xs text-muted-foreground">Annual provincial programs</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Active Programs</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-primary">15+</div>
                                <p className="text-xs text-muted-foreground">Provincial grant programs</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-primary">38%</div>
                                <p className="text-xs text-muted-foreground">Average approval rate</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Grant Comparison Table */}
                    <div className="mb-12">
                        <GrantComparisonTable
                            grants={manitobaGrants}
                            title="Manitoba Business Grants Comparison"
                        />
                    </div>

                    {/* Content Sections */}

                    <div className="mb-12">
                        <InlineCTA
                            title="Need Strategy for Manitoba Grants?"
                            description="Our specialists can help you navigate Manitoba's provincial programs."
                            buttonText="Get Funding Assistance"
                            buttonLink="/contact"
                        />
                    </div>
                    <div className="grid lg:grid-cols-3 gap-8 mb-12">
                        <div className="lg:col-span-2 space-y-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Manitoba Business Grant Opportunities</CardTitle>
                                </CardHeader>
                                <CardContent className="prose max-w-none">
                                    <p>
                                        Manitoba offers targeted support for innovation, manufacturing, and food processing. The Innovation Growth Program is a key funding source for SMEs looking to commercialize new technologies.
                                    </p>

                                    <h3>Key Manitoba Grant Programs</h3>
                                    <ul>
                                        <li>
                                            <strong>Innovation Growth Program (IGP)</strong> - Cost-sharing assistance for commercialization
                                        </li>
                                        <li>
                                            <strong>Manitoba Works Capital Incentive</strong> - Tax rebates for capital investment
                                        </li>
                                        <li>
                                            <strong>Industry Expansion Program</strong> - Support for skills training
                                        </li>
                                    </ul>

                                    <h3>Eligibility Requirements</h3>
                                    <p>
                                        Typically requires:
                                    </p>
                                    <ul>
                                        <li>Permanent establishment in Manitoba</li>
                                        <li>Projects that generate economic benefit for the province</li>
                                        <li>Financial capacity to complete the project</li>
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
                                        <a href="/canada/saskatchewan" className="block text-primary hover:underline">
                                            Saskatchewan Funding
                                        </a>
                                        <a href="/canada/government-grants" className="block text-primary hover:underline">
                                            Federal Canadian Grants
                                        </a>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Deep Content Section */}
                    <div className="max-w-4xl mx-auto space-y-10 mb-12">

                        <Card>
                            <CardHeader><CardTitle className="text-xl">Manitoba&apos;s Core Provincial Grant Programs — Detailed Breakdown</CardTitle></CardHeader>
                            <CardContent className="text-gray-700 space-y-4">
                                <p className="leading-relaxed">Manitoba&apos;s provincial grant ecosystem is administered through the Province of Manitoba&apos;s Economic Development Ministry. The province has strong funding for manufacturing, agriculture, and food processing businesses reflecting Manitoba&apos;s core economic strengths. Winnipeg&apos;s growing tech sector also benefits from dedicated provincial startup support combined with PrairiesCan federal programs.</p>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm border-collapse">
                                        <thead><tr className="bg-blue-800 text-white"><th className="text-left p-3">Program</th><th className="text-left p-3">Amount</th><th className="text-left p-3">Best For</th><th className="text-left p-3">Type</th></tr></thead>
                                        <tbody>
                                            {[
                                                ["Innovation Growth Program (IGP)", "$25K–$100K", "Manitoba SMEs commercializing new products or technologies with clear market potential", "Non-repayable; quarterly competitive intake"],
                                                ["Manitoba Works Capital Incentive", "$100K–$1M+", "Major capital investments creating significant MB employment — Tax Increment Financing for qualifying projects", "Negotiated; significant job creation required"],
                                                ["Food Development Centre Support", "$10K–$50K", "MB food and beverage processors needing product development, testing, or shelf-life services", "Rolling — through FDC in Portage la Prairie"],
                                                ["Manitoba Employer Wage Subsidies", "$5K–$25K per hire", "MB employers hiring from employment disadvantaged groups (recent grads, persons with disabilities)", "Rolling applications through Manitoba Jobs"],
                                                ["Canada-MB Job Grant", "Up to $10K per employee", "Manitoba employers funding employee training — federal-provincial split covering 67% of training costs", "Rolling — apply before training begins"],
                                                ["PrairiesCan Scale-Up", "$50K–$10M", "MB businesses investing in productivity, innovation, and market expansion — the largest single grant available", "Competitive; repayable/non-repayable mix"],
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
                            <CardHeader><CardTitle className="text-xl">PrairiesCan — Manitoba&apos;s Federal Regional Development Funding</CardTitle></CardHeader>
                            <CardContent className="text-gray-700 space-y-4">
                                <p className="leading-relaxed">PrairiesCan (Prairies Economic Development Canada) is the federal regional development agency for Manitoba, Saskatchewan, and Alberta. For Manitoba businesses, PrairiesCan often offers larger individual grants than provincial programs — and can be stacked with provincial grants for maximum coverage. The PrairiesCan Winnipeg office processes Manitoba applications.</p>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {[
                                        { name: "PrairiesCan Business Scale-Up & Productivity", amount: "$50K–$10M", desc: "PrairiesCan&apos;s core program for Manitoba businesses — repayable and non-repayable contributions for companies investing in productivity, innovation, and market expansion. Priority: value-added agriculture, advanced manufacturing, ICT, and cleantech." },
                                        { name: "PrairiesCan Women Entrepreneurship Strategy", amount: "$25K–$250K", desc: "Federal WES ecosystem funding channeled through Prairie-region women&apos;s business associations and WBCs, with specific support for Manitoba women entrepreneurs. Applies alongside provincial women&apos;s programs for maximum funding access." },
                                        { name: "NRC-IRAP Manitoba", amount: "Up to $50K+", desc: "Industrial R&D support through IRAP advisors in Winnipeg. Particularly strong for Manitoba manufacturers and agri-food processors doing technology adoption or process innovation. Free advisory support is available before funding." },
                                        { name: "SR&ED Manitoba", amount: "15% federal refundable", desc: "Manitoba companies doing qualifying R&D claim the federal SR&ED credit at 15% (35% for CCPCs on first $3M). Manitoba does not have a separate provincial SR&ED credit — the federal credit is the primary R&D tax incentive for MB companies." },
                                    ].map(({ name, amount, desc }) => (
                                        <div key={name} className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                                            <div className="font-semibold text-blue-900 text-sm mb-1">{name}</div>
                                            <div className="text-xs text-green-700 font-medium mb-1">💰 {amount}</div>
                                            <div className="text-xs text-gray-600 leading-relaxed">{desc}</div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-red-50 border-red-100">
                            <CardHeader><CardTitle className="text-xl text-red-900">5 Mistakes Manitoba Businesses Make When Applying for Grants</CardTitle></CardHeader>
                            <CardContent className="text-red-900 space-y-3">
                                {[
                                    { n: "1", m: "Not Applying to Both IGP and IRAP for the Same R&D Project", d: "Manitoba&apos;s Innovation Growth Program (provincial) and NRC-IRAP (federal) can both fund R&D and commercialization activities for the same project covering different eligible costs. IGP provides non-repayable grants for product commercialization; IRAP provides technical advisory support and financial contributions. Apply to both simultaneously — the programs are complementary for Manitoba innovators." },
                                    { n: "2", m: "Overlooking PrairiesCan as a Larger Federal Alternative to Provincial Programs", d: "PrairiesCan Business Scale-Up contributions ($50K–$10M) are substantially larger than most Manitoba provincial programs. Many Manitoba businesses focus on provincial programs because they&apos;re more familiar — but PrairiesCan&apos;s Winnipeg office is accessible and covers similar eligible costs. Schedule a PrairiesCan meeting before your next major capital project." },
                                    { n: "3", m: "Not Using Manitoba&apos;s Food Development Centre Before Grant Applications", d: "The Food Development Centre in Portage la Prairie provides technical food product development services for Manitoba food businesses at subsidized costs. FDC work is fundable through IGP and other programs. FDC relationships with Manitoba agriculture ministry and AAFC open doors to additional programs not accessible directly. Food businesses should engage FDC before submitting grant applications." },
                                    { n: "4", m: "Applying for Manitoba Works Capital Incentive Without Pre-Qualifying Employment Commitments", d: "MWCI&apos;s Tax Increment Financing requires demonstrated major capital investment AND significant employment creation commitments. Applications without specific, quantified job creation projections (number of FTE positions, compensation levels, hiring timelines) are routinely rejected. Pre-qualify MWCI eligibility with provincial staff before designing your capital project budget around MWCI funding." },
                                    { n: "5", m: "Missing Saskatchewan STSI-Equivalent Investor Programs for Manitoba Startups", d: "Manitoba does not have a direct equivalent to Saskatchewan&apos;s 45% investor tax credit, but does have an Employee Share Purchase Tax Credit and periodic angel investor programs through Manitoba Capital Corporation. Manitoba tech startups raising angel rounds should investigate current Manitoba equity investment incentive programs before their fundraise — investor tax incentives substantially improve fundraising success rates in smaller markets." },
                                ].map(({ n, m, d }) => (
                                    <div key={n} className="bg-white rounded-lg p-4 border border-red-200">
                                        <div className="font-semibold text-red-900 mb-1 text-sm">{n}. {m}</div>
                                        <p className="text-xs text-red-800 leading-relaxed">{d}</p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">FAQ: Manitoba Business Grants 2026</h2>
                            <div className="space-y-4">
                                {[
                                    { q: "What is the Innovation Growth Program and how competitive is it?", a: "Manitoba&apos;s IGP provides non-repayable grants of $25K–$100K for MB SMEs commercializing new products or technologies. Applications are reviewed quarterly — competition is moderate (less competitive than Ontario OCE due to smaller applicant pool). Requirements: MB business registration, clear product innovation, documented commercialization plan with market analysis, financial statements, and matching funds. Applications with detailed commercialization roadmaps and early customer evidence consistently outperform generic product development applications." },
                                    { q: "Does Manitoba have grants for food and agricultural businesses?", a: "Yes — Manitoba has one of Canada&apos;s strongest agricultural funding ecosystems. The Food Development Centre (Portage la Prairie) provides subsidized product development services. Federal-provincial Canadian Agricultural Partnership programs are administered in Manitoba through MAFRD. For value-added food processors, PrairiesCan BDP specifically prioritizes agri-food businesses. SR&ED credits apply to food technology R&D. Manitoba&apos;s grain, pork, and potato industries have additional sector-specific programs through commodity boards." },
                                    { q: "Are there Manitoba grants specifically for Winnipeg vs. rural Manitoba?", a: "Most provincial programs (IGP, MWCI) are available province-wide. Rural Manitoba businesses have additional access to: Rural Economic Development Initiative (REDI) programs; Northern Manitoba Economic Development programs; Community Futures Manitoba network providing rural business loans; First Nations Economic Development programs for Indigenous communities. Urban Winnipeg businesses may find IRAP more accessible due to stronger NRC advisor presence. Rural businesses typically face less competition for programs available to their region." },
                                    { q: "What is the Manitoba aerospace sector?", a: "Manitoba has Canada&apos;s third-largest aerospace sector (after Quebec and Ontario), led by StandardAero, Magellan Aerospace, and Boeing Canada in Winnipeg. The sector has dedicated provincial support through the Aerospace Industries Association of Canada Manitoba chapter and specific ministry programs. Federal aerospace R&D is funded through NRC&apos;s aerospace programs, ISED, and SR&ED. For Manitoba aerospace companies, accessing NRC Flight Research Laboratory programs provides additional access not available to businesses outside this sector." },
                                    { q: "How does Manitoba support Indigenous entrepreneurs?", a: "Manitoba has Canada&apos;s largest proportion of First Nations people relative to population and strong Indigenous business support. The Manitoba Metis Federation Economic Development Corporation provides support for Métis entrepreneurs. First Nations Financial Management Board offers advisory services to First Nations businesses. Aboriginal Financial Institutions in Manitoba provide business loans with flexible eligibility. CANDO (Council for the Advancement of Native Development Officers) connects MB Indigenous entrepreneurs to programs nationally. Federal Indigenous Services Canada business programs provide specific contributions." },
                                    { q: "Are there Manitoba grants for clean energy?", a: "Yes — Manitoba is unique with nearly 100% hydroelectric electricity from Manitoba Hydro, making it Canada&apos;s cleanest electricity grid. Manitoba Hydro offers commercial efficiency programs and power cost rebates for industrial customers demonstrating efficiency improvements. The provincial government funds renewable energy development in remote and Indigenous communities through Northern Affairs programs. Federal NRCan programs are accessible to Manitoba clean energy businesses. Clean energy technology development can be funded through IGP and PrairiesCan." },
                                    { q: "What is Manitoba Works Capital Incentive (MWCI)?", a: "MWCI is Manitoba&apos;s Tax Increment Financing program for major capital investments creating significant employment. The province provides tax rebates on incremental property and business taxes generated by a new qualifying investment over typically 5–10 years. Qualifying investments: $5M+ capital projects creating 10+ full-time Manitoba jobs. MWCI is primarily used by manufacturers, data centres, and logistics operations making large capital commitments. Negotiate MWCI terms with the provincial Ministry before finalizing site and investment plans." },
                                    { q: "Can Manitoba businesses get startup grants without assets or revenue?", a: "Pre-revenue Manitoba startups have access to limited direct grant programs, but several options exist: Futurpreneur Canada provides loans ($15K–$60K) + mentorship to Manitoba entrepreneurs 18–39 without requiring assets; Winnipeg Chamber programs provide advisory support and micro-grants for startups; IRAP provides advisory support through ITAs at no cost to pre-revenue startups; Community Futures organizations in rural Manitoba provide startup financing with more flexible criteria than banks. Most substantial grants (IGP, PrairiesCan) require at least some operating history and matching funds." },
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
                            title="Get Manitoba Grant Updates"
                            description="Stay informed about new Manitoba business grants and funding opportunities"
                        />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
