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
    title: "Nova Scotia Business Grants 2026: Top 10 Programs [Free Guide]",
    description:
        "Find Nova Scotia business grants and provincial funding programs. Complete guide to Nova Scotia government grants, Invest Nova Scotia funding, and application deadlines.",
    keywords:
        "Nova Scotia business grants, Nova Scotia government funding, provincial grants NS, Halifax business grants, Invest Nova Scotia",
    alternates: {
        canonical: "https://www.fsidigital.ca/canada/nova-scotia",
    },
    robots: { index: true, follow: true },
}

const nsGrants: Grant[] = [
    {
        id: "ns-export",
        name: "Export Development Program",
        fundingMin: 5000,
        fundingMax: 15000,
        eligibility: ["Export-ready NS businesses", "SMEs"],
        deadline: "Rolling",
        applicationLink: "https://investnovascotia.ca/export/export-development-program",
        description: "Support for travel and export marketing activities.",
        country: "Canada",
        region: "Nova Scotia",
        category: "Export",
        agency: "Invest Nova Scotia",
        status: "Active",
        tags: ["Export", "Marketing"],
        requirements: ["Export plan", "Travel budget"],
        lastUpdated: "2026-01-01"
    },
    {
        id: "ns-loan-guarantee",
        name: "Small Business Loan Guarantee",
        fundingMin: 10000,
        fundingMax: 500000,
        eligibility: ["Small businesses", "Social enterprises", "Co-ops"],
        deadline: "Ongoing",
        applicationLink: "https://cuc.cu/business/small-business-loan-guarantee-program/",
        description: "Financing support through credit unions to help small businesses access capital.",
        country: "Canada",
        region: "Nova Scotia",
        category: "Small Business",
        agency: "Credit Unions / Prov NS",
        status: "Active",
        tags: ["Loan", "Small Business"],
        requirements: ["Business plan", "Credit union application"],
        lastUpdated: "2026-01-01"
    },
    {
        id: "ns-gto",
        name: "Graduate to Opportunity",
        fundingMin: 10000,
        fundingMax: 50000,
        eligibility: ["Employers hiring recent grads", "Nova Scotia businesses"],
        deadline: "Ongoing",
        applicationLink: "https://novascotia.ca/programs/graduate-to-opportunity/",
        description: "Salary subsidy for hiring recent post-secondary graduates.",
        country: "Canada",
        region: "Nova Scotia",
        category: "Workforce",
        agency: "Government of Nova Scotia",
        status: "Active",
        tags: ["Hiring", "Youth"],
        requirements: ["New hire details"],
        lastUpdated: "2026-01-01"
    },
]

export default function NovaScotiaGrantsPage() {
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
                                Nova Scotia Provincial Funding
                            </Badge>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Nova Scotia Business Grants 2026</h1>
            <div className="mt-8 mb-4 text-left">
              <ShortAnswerBox
                question="What government grants are available for Nova Scotia businesses in 2026?"
                content="Nova Scotia businesses can access Invest Nova Scotia innovation grants ($25K–$250K), ACOA federal contributions for Atlantic Canada SMEs (up to $1M for scaling projects), the NS Workplace Innovations & Productivity Skills Incentive ($5K–$50K for training), and the NS Digital Investment Fund for tech sector development. Combined with federal SR&ED and IRAP programs, Nova Scotia SMEs — particularly in ocean tech, defense, and agri-food — have strong funding pathways."
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
                                <div className="text-2xl font-bold text-primary">$40M+</div>
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
                                <div className="text-2xl font-bold text-primary">45%</div>
                                <p className="text-xs text-muted-foreground">Average approval rate</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Grant Comparison Table */}
                    <div className="mb-12">
                        <GrantComparisonTable
                            grants={nsGrants}
                            title="Nova Scotia Business Grants Comparison"
                        />
                    </div>

                    {/* Content Sections */}

                    <div className="mb-12">
                        <InlineCTA
                            title="Need Strategy for Nova Scotia Grants?"
                            description="Our specialists can help you navigate Nova Scotia's provincial programs."
                            buttonText="Get Funding Assistance"
                            buttonLink="/contact"
                        />
                    </div>
                    <div className="grid lg:grid-cols-3 gap-8 mb-12">
                        <div className="lg:col-span-2 space-y-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Nova Scotia Business Grant Opportunities</CardTitle>
                                </CardHeader>
                                <CardContent className="prose max-w-none">
                                    <p>
                                        Invest Nova Scotia is the primary driver of economic development, offering programs that support startups, export growth, and talent acquisition (like Graduate to Opportunity).
                                    </p>

                                    <h3>Key Nova Scotia Grant Programs</h3>
                                    <ul>
                                        <li>
                                            <strong>Export Development Program</strong> - Travel and marketing support
                                        </li>
                                        <li>
                                            <strong>Graduate to Opportunity (GTO)</strong> - Salary subsidy for hiring new grads
                                        </li>
                                        <li>
                                            <strong>Small Business Loan Guarantee</strong> - Capital access through credit unions
                                        </li>
                                    </ul>

                                    <h3>Eligibility Requirements</h3>
                                    <p>
                                        Commonly required:
                                    </p>
                                    <ul>
                                        <li>Registered to do business in Nova Scotia</li>
                                        <li>Good standing with Registry of Joint Stock Companies</li>
                                        <li>Permanently located in NS</li>
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
                                        <a href="/canada/new-brunswick" className="block text-primary hover:underline">
                                            New Brunswick Grants
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
                            <CardHeader><CardTitle className="text-xl">Invest Nova Scotia — Key Provincial Programs Explained</CardTitle></CardHeader>
                            <CardContent className="text-gray-700 space-y-4">
                                <p className="leading-relaxed">Invest Nova Scotia (formerly Nova Scotia Business Inc.) is the province&apos;s primary economic development agency, responsible for attracting, retaining, and growing businesses in Nova Scotia. The agency administers direct grant and contribution programs, provides advisory services, and connects NS businesses with federal funding available through ACOA (Atlantic Canada Opportunities Agency). No other province has as high a per-capita ACOA allocation as Nova Scotia — federal funding is as important as provincial for NS businesses.</p>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm border-collapse">
                                        <thead><tr className="bg-blue-800 text-white"><th className="text-left p-3">Program</th><th className="text-left p-3">Amount</th><th className="text-left p-3">Best For</th><th className="text-left p-3">Status</th></tr></thead>
                                        <tbody>
                                            {[
                                                ["Graduate to Opportunity (GTO)", "$10K–$50K", "NS businesses hiring recent post-secondary graduates — 25% salary subsidy (Year 1), 12.5% (Year 2), plus 5% bonus for diversity hires", "Rolling applications"],
                                                ["Export Development Program", "$5K–$15K", "NS exporters covering trade show travel, international marketing, certifications, and market research for export activities", "Pre-approval required before travel"],
                                                ["Small Business Loan Guarantee", "$10K–$500K", "NS small businesses, social enterprises, and co-ops needing access to credit through NS credit unions at favourable rates", "Ongoing through credit unions"],
                                                ["Film &amp; Creative Industries NS", "Tax credits", "NS film, television, and digital media productions — 25% base labour tax credit + regional bonuses for rural productions", "Annual intake"],
                                                ["Grow NS Fund", "$25K–$500K", "NS businesses in priority sectors (ocean tech, clean tech, aerospace, agri-food) needing growth capital", "Competitive intake — contact Invest NS"],
                                                ["NS Equity Tax Credit", "35% of investment", "Investors in qualifying NS small businesses — 35% non-refundable provincial tax credit on eligible investments", "Ongoing — investor applies"],
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
                            <CardHeader><CardTitle className="text-xl">ACOA — The Most Important Funder for Nova Scotia Businesses</CardTitle></CardHeader>
                            <CardContent className="text-gray-700 space-y-4">
                                <p className="leading-relaxed">The Atlantic Canada Opportunities Agency (ACOA) is the single most important funding source for Nova Scotia businesses — larger in total dollar value than all provincial programs combined. ACOA administers the Business Development Program (BDP) from its Halifax office, providing non-repayable and repayable contributions to NS businesses for innovation, trade development, and business growth. NS businesses that don&apos;t have a relationship with ACOA are leaving their largest available funding source untapped.</p>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {[
                                        { name: "ACOA Business Development Program (BDP)", amount: "$25K–$3M", desc: "ACOA&apos;s core program for Atlantic businesses. Non-repayable and repayable contributions for innovation, productivity improvement, trade development, and business establishment. Priority sectors: ocean technology, clean energy, agri-food, ICT. Apply through ACOA Halifax office." },
                                        { name: "ACOA Regional Relief and Recovery Fund (RRRF)", amount: "Varies", desc: "ACOA emergency and recovery funding for Atlantic businesses facing economic challenges. Provides bridge financing, working capital support, and loan relief. Activated during economic downturns — monitor ACOA announcements for program availability." },
                                        { name: "ACOA Women in Business Initiative", amount: "$5K–$100K", desc: "ACOA&apos;s national WBI program is particularly active in Nova Scotia — supporting women entrepreneurs in Atlantic Canada with targeted advisory services, networking, and some direct funding through regional partners. Administered through NS women&apos;s business organizations." },
                                        { name: "ACOA Atlantic Trade and Investment Partnership", amount: "Varies", desc: "ACOA trade development supports Nova Scotia exporters through market intelligence, trade missions, and bilateral agreements that create preferential access for Atlantic Canadian businesses in international markets." },
                                    ].map(({ name, amount, desc }) => (
                                        <div key={name} className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                                            <div className="font-semibold text-blue-900 text-sm mb-1">{name}</div>
                                            <div className="text-xs text-green-700 font-medium mb-1">💰 {amount}</div>
                                            <div className="text-xs text-gray-600 leading-relaxed">{desc}</div>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-xs text-gray-600">Contact ACOA Halifax at acoa-apeca.gc.ca or visit their Halifax office — ACOA program officers work directly with NS business applicants to identify the best program fit before the application is submitted.</p>
                            </CardContent>
                        </Card>

                        <Card className="bg-red-50 border-red-100">
                            <CardHeader><CardTitle className="text-xl text-red-900">5 Mistakes Nova Scotia Businesses Make When Applying for Grants</CardTitle></CardHeader>
                            <CardContent className="text-red-900 space-y-3">
                                {[
                                    { n: "1", m: "Not Applying for GTO Before Hiring the Graduate", d: "Graduate to Opportunity (GTO) requires pre-approval before the eligible graduate starts employment. NS businesses that hire a recent graduate and then apply for GTO are ineligible — retroactive applications are not accepted. Start the GTO application immediately upon identifying your graduate hire candidate, before their employment start date." },
                                    { n: "2", m: "Overlooking ACOA While Focusing Only on Provincial Programs", d: "NS businesses frequently focus exclusively on Invest Nova Scotia programs while not engaging with ACOA — which offers substantially larger funding (up to $3M+ vs. most provincial grants under $500K). ACOA&apos;s Halifax office has program officers who work directly with NS businesses to navigate program eligibility. Schedule an ACOA meeting before your next round of grant applications." },
                                    { n: "3", m: "Missing the NS Equity Tax Credit for Fundraising", d: "The NS Equity Tax Credit gives investors a 35% non-refundable provincial tax credit on investments in qualifying NS small businesses. This makes NS angel investment significantly more attractive — an investor putting $100K into your business receives a $35K tax credit. Most NS startups don&apos;t actively market this credit to their investor prospects. Include the Equity Tax Credit in all investor pitches and fundraising materials." },
                                    { n: "4", m: "Applying to Export Development Program After International Travel", d: "Like most export development programs, NS&apos;s Export Development Program requires pre-approval before export activities occur. Retroactive claims for trade show travel, international marketing missions, or market research already completed are not eligible. Apply at minimum 6–8 weeks before your planned international market development activity." },
                                    { n: "5", m: "Not Connecting with Community Futures Nova Scotia for Rural Business Support", d: "Community Futures Nova Scotia has 7 offices throughout rural NS providing business loans (up to $150K) and advisory services to rural businesses that don&apos;t qualify for or want alternative financing options. Rural NS businesses frequently don&apos;t know about Community Futures financing — which has more flexible eligibility than bank loans and no requirement for established credit history." },
                                ].map(({ n, m, d }) => (
                                    <div key={n} className="bg-white rounded-lg p-4 border border-red-200">
                                        <div className="font-semibold text-red-900 mb-1 text-sm">{n}. {m}</div>
                                        <p className="text-xs text-red-800 leading-relaxed">{d}</p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">FAQ: Nova Scotia Business Grants 2026</h2>
                            <div className="space-y-4">
                                {[
                                    { q: "What is the Graduate to Opportunity program and how much does it pay?", a: "The Graduate to Opportunity (GTO) program provides Nova Scotia employers with a salary subsidy of 25% in year one and 12.5% in year two when hiring a recent post-secondary graduate into a new full-time position. There is an additional 5% diversity bonus for employers hiring graduates from under-represented groups. Maximum subsidy per graduate: approximately $12,500 (Year 1) + $6,250 (Year 2). Employers must apply before the eligible graduate&apos;s employment start date — retroactive applications are not accepted. Apply at novascotia.ca/gto." },
                                    { q: "What is ACOA and how does it help Nova Scotia businesses?", a: "ACOA (Atlantic Canada Opportunities Agency) is the federal government&apos;s regional development agency for Atlantic Canada. For Nova Scotia businesses, ACOA is typically the largest available funding source — considerably larger than most provincial programs. ACOA&apos;s Business Development Program (BDP) provides non-repayable and repayable contributions from $25K to $3M+ for NS businesses in priority sectors. ACOA also supports export development, innovation, and business growth. Contact the ACOA Halifax office to discuss your project before applying." },
                                    { q: "Does Nova Scotia have grants for ocean technology businesses?", a: "Yes — ocean technology is one of Nova Scotia&apos;s strategic priority sectors. Invest Nova Scotia&apos;s Grow NS Fund targets ocean tech companies. ACOA specifically prioritizes ocean-related businesses in Atlantic Canada. The Ocean Supercluster (a federal-funded industry supercluster) is headquartered in Halifax and provides additional funding for ocean technology innovators. NS ocean tech companies can often access 3–4 different programs simultaneously — Invest NS + ACOA + Ocean Supercluster + SR&ED." },
                                    { q: "Are there Nova Scotia grants for tourism and hospitality businesses?", a: "Yes — Tourism Nova Scotia supports tourism operators through various programs including the Tourism Development Fund, regional tourism marketing co-ops, and business development support. ACOA BDP also funds tourism infrastructure and business development. For accommodations, restaurants, and attractions, the Hospitality industry has access to both provincial tourism programs and general business programs like GTO (for new staff) and the Export Development Program (for international tourism marketing)." },
                                    { q: "How do I find all active Nova Scotia grant programs?", a: "The best sources for current NS programs: (1) Invest Nova Scotia website (investnovascotia.ca) — the primary provincial program portal; (2) ACOA (acoa-apeca.gc.ca) — federal programs with Halifax office contact; (3) Nova Scotia government portal (novascotia.ca) — ministry-specific programs; (4) Community Futures Nova Scotia (cfns.ca) — rural business support. There is no single consolidated NS grant database — checking all four sources quarterly is the most effective approach. Signing up for Invest NS and ACOA newsletters provides program updates as they are announced." },
                                    { q: "Can an NS business access both ACOA grants and provincial grants on the same project?", a: "Yes — Nova Scotia businesses can and should stack ACOA and provincial programs on the same project. Total government funding typically cannot exceed 50–75% of eligible project costs, but within that ceiling, combining ACOA BDP + Invest NS Grow NS Fund + federal programs (SR&ED, CDAP) is standard practice for well-advised NS businesses. Disclose all funding sources in each application — this is required by both ACOA and provincial programs for compliance." },
                                    { q: "What businesses thrive in Nova Scotia&apos;s funding ecosystem?", a: "The most funded sectors in Nova Scotia: Ocean technology and marine sciences — multiple dedicated programs. Agri-food and fisheries — both NS and ACOA programs. ICT and digital innovation — ACOA and Invest NS priority. Clean energy and environment — NS and federal clean economy programs. Arts and culture — NS&apos;s NS Film Tax Credit, Foundation for Arts funding. Businesses in Halifax have access to the full ecosystem; rural NS businesses benefit from Community Futures and ACOA regional office support specific to rural economic development." },
                                    { q: "Are there Nova Scotia grants for women or youth entrepreneurs?", a: "Yes — ACOA administers a Women in Business Initiative with NS partners providing advisory support and some direct funding. Futurpreneur Canada (for entrepreneurs 18–39) operates in Nova Scotia. Nova Scotia Community College (NSCC) supports student and youth entrepreneurs through its Sandpit program. The Province&apos;s LaunchPad program historically supported youth entrepreneurs (check current availability at investnovascotia.ca). The NS Equity Tax Credit also makes it easier for women entrepreneurs to attract angel investment by providing investors with a 35% provincial tax credit." },
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
                            title="Get Nova Scotia Grant Updates"
                            description="Stay informed about new Nova Scotia business grants and funding opportunities"
                        />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
