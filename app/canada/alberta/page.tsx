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
    title: "Alberta Business Grants 2026: 15+ Programs Open Now [Full List]",
    description:
        "Find Alberta business grants and provincial funding programs. Complete guide to Alberta government grants, Alberta Innovates funding, and application deadlines.",
    keywords:
        "Alberta business grants, Alberta government funding, provincial grants Alberta, Alberta Innovates, startup funding Edmonton Calgary",
}

const albertaGrants: Grant[] = [
    {
        id: "ab-vouchers",
        name: "Alberta Innovates Vouchers",
        fundingMin: 10000,
        fundingMax: 100000,
        eligibility: ["Tech SMEs in Alberta", "Innovation projects"],
        deadline: "Rolling",
        applicationLink: "https://albertainnovates.ca/programs/voucher/",
        description: "Support for technology development, product testing, and commercialization.",
        country: "Canada",
        region: "Alberta",
        category: "Technology",
        agency: "Alberta Innovates",
        status: "Active",
        tags: ["Innovation", "Technology"],
        requirements: ["Service provider quote", "Project plan"],
        lastUpdated: "2026-01-01"
    },
    {
        id: "ab-cares",
        name: "CARES Program",
        fundingMin: 10000,
        fundingMax: 50000,
        eligibility: ["Non-profits", "Municipalities", "Regional alliances"],
        deadline: "Closed",
        applicationLink: "https://www.alberta.ca/community-and-regional-economic-support-program.aspx",
        description: "Community and Regional Economic Support for economic development projects.",
        country: "Canada",
        region: "Alberta",
        category: "Community",
        agency: "Government of Alberta",
        status: "Closed",
        tags: ["Economic Development", "Community"],
        requirements: ["Impact assessment"],
        lastUpdated: "2026-01-01"
    },
    {
        id: "ab-export",
        name: "Alberta Export Expansion Program",
        fundingMin: 5000,
        fundingMax: 25000,
        eligibility: ["Export-ready companies", "Alberta businesses"],
        deadline: "First-come, first-served",
        applicationLink: "https://www.alberta.ca/alberta-export-expansion-program.aspx",
        description: "Support for international market expansion and export activities.",
        country: "Canada",
        region: "Alberta",
        category: "Export",
        agency: "Government of Alberta",
        status: "Active",
        tags: ["Export", "Marketing"],
        requirements: ["Export plan", "Travel budget"],
        lastUpdated: "2026-01-01"
    },
    {
        id: "ab-digital-traction",
        name: "Digital Traction",
        fundingMin: 25000,
        fundingMax: 50000,
        eligibility: ["Software startups", "SMEs"],
        deadline: "Rolling",
        applicationLink: "https://albertainnovates.ca/",
        description: "Funding for software product development and market traction.",
        country: "Canada",
        region: "Alberta",
        category: "Technology",
        agency: "Alberta Innovates",
        status: "Active",
        tags: ["Software", "Startup"],
        requirements: ["Product roadmap"],
        lastUpdated: "2026-01-01"
    },
]

export default function AlbertaGrantsPage() {
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
                                Alberta Provincial Funding
                            </Badge>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Alberta Business Grants 2026: Programs Open Now</h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                            Discover comprehensive Alberta provincial funding programs, business grants, and government incentives
                            available to entrepreneurs and companies across Alberta.
                        </p>
                        <div className="mt-4">
                            <ShortAnswerBox content="Alberta provides hundreds of millions in provincial government grants and funding programs for startups, small businesses, and expanding enterprises in 2026." />
                        </div>
                        <div className="mt-4 mb-8 flex justify-center">
                            <EEATBadge authorName="Ashwani K." authorImage="/author-ashwani.jpg" date="2026-02-09" />
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
                                <div className="text-2xl font-bold text-primary">$150M+</div>
                                <p className="text-xs text-muted-foreground">Annual provincial programs</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Active Programs</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-primary">20+</div>
                                <p className="text-xs text-muted-foreground">Provincial grant programs</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-primary">30%</div>
                                <p className="text-xs text-muted-foreground">Average approval rate</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Grant Comparison Table */}
                    <div className="mb-12">
                        <GrantComparisonTable
                            grants={albertaGrants}
                            title="Alberta Business Grants Comparison"
                        />
                    </div>

                    {/* Content Sections */}

                    <div className="mb-12">
                        <InlineCTA
                            title="Need Strategy for Alberta Grants?"
                            description="Our specialists can help you navigate Alberta's provincial programs."
                            buttonText="Get Funding Assistance"
                            buttonLink="/contact"
                        />
                    </div>
                    <div className="grid lg:grid-cols-3 gap-8 mb-12">
                        <div className="lg:col-span-2 space-y-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Alberta Business Grant Opportunities</CardTitle>
                                </CardHeader>
                                <CardContent className="prose max-w-none">
                                    <p>
                                        Alberta's funding landscape is heavily driven by Alberta Innovates, focusing on technology, energy, agriculture, and health. The province is actively diversifying its economy and offers various incentives to support this goal.
                                    </p>

                                    <h3>Key Alberta Grant Programs</h3>
                                    <ul>
                                        <li>
                                            <strong>Alberta Innovates Vouchers</strong> - Funding for technology development and testing
                                        </li>
                                        <li>
                                            <strong>Alberta Export Expansion Program</strong> - Support for international travel and marketing
                                        </li>
                                        <li>
                                            <strong>CAP - Canadian Agricultural Partnership</strong> - Funding for agriculture businesses (Federal-Provincial)
                                        </li>
                                        <li>
                                            <strong>Alberta Jobs Now</strong> - Grants for hiring and training
                                        </li>
                                    </ul>

                                    <h3>Eligibility Requirements</h3>
                                    <p>
                                        Common requirements for Alberta grants include:
                                    </p>
                                    <ul>
                                        <li>Incorporation in Alberta</li>
                                        <li>Physical presence in the province</li>
                                        <li>Focus on innovation or export growth</li>
                                        <li>Financial viability and matching funds</li>
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
                                        <a href="/canada/british-columbia" className="block text-primary hover:underline">
                                            BC Business Grants
                                        </a>
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
                            <CardHeader><CardTitle className="text-xl">Alberta Innovates — The Centre of Alberta&apos;s Innovation Funding</CardTitle></CardHeader>
                            <CardContent className="text-gray-700 space-y-4">
                                <p className="leading-relaxed">Alberta Innovates is the province&apos;s primary innovation funding agency, investing over $200M annually into Alberta businesses, researchers, and entrepreneurs. Unlike federal programs (IRAP, SR&ED) which are available nationwide, Alberta Innovates programs are exclusively for Alberta-based businesses and researchers, and are designed to accelerate the province&apos;s economic diversification beyond oil and gas.</p>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm border-collapse">
                                        <thead><tr className="bg-blue-800 text-white"><th className="text-left p-3">Program</th><th className="text-left p-3">Amount</th><th className="text-left p-3">Best For</th><th className="text-left p-3">Deadline</th></tr></thead>
                                        <tbody>
                                            {[
                                                ["Innovation Vouchers", "$10K–$100K", "Tech SMEs needing R&D service from post-secondary institutions and service providers", "Rolling"],
                                                ["Digital Traction Program", "$25K–$50K", "Software startups building commercial B2B/B2C products with market traction", "Rolling"],
                                                ["Agri-Innovation Program", "$50K–$500K", "AgTech businesses developing precision agriculture, food safety, or sustainability tech", "Annual intake"],
                                                ["Health Innovation Program", "$50K–$1M", "Health technology companies, digital health platforms, medical device startups", "Annual intake"],
                                                ["Energy Innovation Program", "$100K–$5M", "Clean energy, carbon capture, oil sands technology, energy storage innovation", "Competitive intake"],
                                                ["Artificial Intelligence Program", "$50K–$250K", "Alberta businesses applying AI/ML to industry challenges (agriculture, energy, health)", "Rolling"],
                                            ].map(([p, a, b, d], i) => (
                                                <tr key={p} className={i % 2 === 0 ? "bg-white" : "bg-blue-50"}>
                                                    <td className="p-3 font-semibold text-blue-900 text-xs">{p}</td>
                                                    <td className="p-3 text-green-700 font-medium text-xs">{a}</td>
                                                    <td className="p-3 text-gray-600 text-xs">{b}</td>
                                                    <td className="p-3 text-gray-500 text-xs">{d}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <p className="text-sm text-gray-600 leading-relaxed"><strong>Application tip:</strong> Alberta Innovates Innovation Vouchers require you to partner with a qualified service provider (university, college, or approved technology service provider) before applying — the service provider&apos;s quote forms the basis of the funding request. Start by identifying your service provider partner before beginning the application.</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader><CardTitle className="text-xl">Alberta&apos;s Economic Diversification Programs — Beyond Oil &amp; Gas</CardTitle></CardHeader>
                            <CardContent className="text-gray-700 space-y-4">
                                <p className="leading-relaxed">Alberta&apos;s government actively funds economic diversification through a set of programs designed to help the province move beyond its historical dependence on oil and gas revenues. These programs are particularly well-funded during commodity price downturns when the provincial government prioritizes diversification spending.</p>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {[
                                        { name: "Alberta Export Expansion Program (AEEP)", amount: "$5K–$25K", desc: "Non-repayable grants for Alberta businesses pursuing international markets. Covers 50% of eligible costs: trade show participation, international travel, translation, certification for foreign markets, and market research. Particularly well-suited for manufacturers, agri-food companies, and technology firms entering U.S. or Asian markets.", apply: "alberta.ca/aeep" },
                                        { name: "Agri-Food Hub and Trade Centre", amount: "Varies", desc: "Alberta government initiative to position Alberta as North America&apos;s agri-food hub. Supports food processing businesses, value-added agriculture, and agri-food export companies through infrastructure grants, market access support, and business development funding.", apply: "agriculture.alberta.ca" },
                                        { name: "Film and Television Tax Credit", amount: "22–30% of eligible costs", desc: "Alberta Film and Television Tax Credit for productions shot in Alberta. 22% base credit; 5% bonus for productions in designated areas. Supports film studios, production companies, and streaming content producers choosing Alberta locations over other provinces.", apply: "alberta.ca/film" },
                                        { name: "Tourism Levy Rebate Programs", amount: "Varies", desc: "Alberta Tourism supports tourism operators, accommodations, and visitor experience businesses through rebate programs, marketing co-op funding, and destination development grants. Particularly active in supporting rural and First Nations tourism development.", apply: "tpr.alberta.ca" },
                                    ].map(({ name, amount, desc, apply }) => (
                                        <div key={name} className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                                            <div className="font-semibold text-blue-900 text-sm mb-1">{name}</div>
                                            <div className="text-xs text-green-700 font-medium mb-1">💰 {amount}</div>
                                            <div className="text-xs text-gray-600 mb-1 leading-relaxed">{desc}</div>
                                            <div className="text-xs text-gray-500">{apply}</div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader><CardTitle className="text-xl">Federal Programs Available in Alberta — Stacking with Provincial Grants</CardTitle></CardHeader>
                            <CardContent className="text-gray-700 space-y-3">
                                <p className="leading-relaxed text-sm">Alberta businesses can access federal programs on top of provincial grants — a strategy called &quot;grant stacking.&quot; Most programs permit stacking as long as total government funding does not exceed 75–100% of eligible project costs. These federal programs are particularly active in Alberta given the province&apos;s energy and agriculture sectors:</p>
                                <div className="grid sm:grid-cols-3 gap-3">
                                    {[
                                        { prog: "NRC-IRAP", val: "Up to $50K+", note: "Industrial R&D support for SMEs; IRAP advisors in Calgary and Edmonton" },
                                        { prog: "SR&ED Tax Credit", val: "15–35% refundable", note: "Federal + provincial R&D tax credits can be combined with Alberta Innovates grants" },
                                        { prog: "CSBFP Loans", val: "Up to $1.15M", note: "Government-guaranteed business loans for equipment and leasehold improvements" },
                                        { prog: "BDC Financing", val: "Flexible", note: "BDC offices in Calgary and Edmonton specialize in growth-stage Alberta businesses" },
                                        { prog: "WD (PrairiesCan)", val: "$25K–$5M", note: "Western Economic Diversification fund supports Alberta manufacturers and exporters" },
                                        { prog: "CDAP", val: "$15K", note: "Canada Digital Adoption Program: $15K grants for e-commerce and digital tech adoption" },
                                    ].map(({ prog, val, note }) => (
                                        <div key={prog} className="bg-gray-50 rounded p-3 border border-gray-200">
                                            <div className="font-semibold text-gray-900 text-xs mb-1">{prog}</div>
                                            <div className="text-xs text-green-700 font-medium mb-1">{val}</div>
                                            <div className="text-xs text-gray-600">{note}</div>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-xs text-gray-500 leading-relaxed"><strong>Key insight:</strong> PrairiesCan (formerly Western Diversification) is the regional development agency for Alberta and has offices in Calgary and Edmonton. For projects over $250K, PrairiesCan offers some of the most accessible large-grant funding available to Alberta businesses outside of Alberta Innovates.</p>
                            </CardContent>
                        </Card>

                        <Card className="bg-red-50 border-red-100">
                            <CardHeader><CardTitle className="text-xl text-red-900">5 Mistakes Alberta Businesses Make When Applying for Provincial Grants</CardTitle></CardHeader>
                            <CardContent className="text-red-900 space-y-3">
                                {[
                                    { n: "1", m: "Applying to Alberta Innovates Without a Pre-Qualified Service Provider Partner", d: "Innovation Vouchers require a quote from an approved service provider before application submission. Businesses that complete the application form first and then search for a service provider routinely find the program deadline has passed or the service provider&apos;s quote doesn&apos;t match program requirements. Identify your service provider partner first, get their quote, then apply." },
                                    { n: "2", m: "Missing the PrairiesCan (WD) Application Window for Capital Projects", d: "PrairiesCan funding for capital projects (equipment, facilities, market expansion) has competitive intakes with announced deadlines. Alberta businesses frequently discover PrairiesCan programs after the intake has closed and wait 12+ months for the next intake. Sign up for PrairiesCan mailing lists and monitor prairiescan.gc.ca quarterly." },
                                    { n: "3", m: "Not Leveraging SR&ED Credits Alongside Alberta Innovates Grants", d: "SR&ED (Scientific Research and Experimental Development) tax credits are available to Alberta businesses doing eligible R&D work — the same work funded by Alberta Innovates. Many Alberta businesses receiving Innovation Vouchers don&apos;t realize they can also file SR&ED claims for the same project, effectively doubling their government support. Engage an SR&ED consultant when receiving any Alberta Innovates grant for R&D work." },
                                    { n: "4", m: "Underestimating the AEEP Application Competitiveness", d: "The Alberta Export Expansion Program is popular and oversubscribed in Q1 and Q4 (around trade show season). Businesses that apply after attending an international trade show cannot claim retroactive costs — AEEP approval must precede the export activity. Apply 60–90 days before your planned international market development activity." },
                                    { n: "5", m: "Overlooking Alberta Jobs Now and Workforce Development Grants", d: "Alberta&apos;s workforce development programs (covering training costs, wage subsidies for new hires, upskilling grants) are substantially underutilized by growing businesses. For businesses hiring in Alberta, the combination of provincial training grants and federal Canada Job Grant can cover 50–100% of employee training costs — a significant operating expense reduction most companies miss." },
                                ].map(({ n, m, d }) => (
                                    <div key={n} className="bg-white rounded-lg p-4 border border-red-200">
                                        <div className="font-semibold text-red-900 mb-1 text-sm">{n}. {m}</div>
                                        <p className="text-xs text-red-800 leading-relaxed">{d}</p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">FAQ: Alberta Business Grants 2026</h2>
                            <div className="space-y-4">
                                {[
                                    { q: "What is the easiest Alberta government grant to get?", a: "The Alberta Export Expansion Program (AEEP) is considered one of the more accessible Alberta grants for established small businesses — it covers 50% of international market development costs up to $25K, has a straightforward application, and reviews applications relatively quickly (4–6 weeks). For technology businesses, the Alberta Innovates Innovation Voucher is similarly accessible but requires a service provider partner. Both are significantly less competitive than federal programs like IRAP or SR&ED." },
                                    { q: "Can a startup less than 1 year old get Alberta business grants?", a: "Most Alberta grants require at least 1–2 years of operating history and demonstrated financial viability. However, the Alberta Innovates Digital Traction Program and some ecosystem programs (through Startup Edmonton, Platform Calgary, and TEC Edmonton) support pre-revenue startups. Early-stage startups should engage with Alberta&apos;s startup accelerator ecosystem (Startup Edmonton, Platform Calgary, Zone Startups) before pursuing direct grant applications — accelerator programs often include grant support and direct referrals to government programs." },
                                    { q: "Does Alberta have grants for agricultural businesses?", a: "Yes — Alberta has one of Canada&apos;s most comprehensive agri-business funding ecosystems. Alberta Innovates runs a dedicated Agri-Innovation Program. The federal-provincial Canadian Agricultural Partnership (CAP) program provides additional agriculture funding specific to Alberta. The Agri-Food Hub and Trade Centre supports value-added food processing and export. Agriculture Financial Services Corporation (AFSC) provides low-interest loans specifically for Alberta agricultural producers. For organic, sustainable, or agri-tech businesses, the combination of Alberta Innovates + CAP + SR&ED can provide very substantial non-dilutive capital." },
                                    { q: "What is PrairiesCan and how does it help Alberta businesses?", a: "PrairiesCan (Prairies Economic Development Canada) is the federal regional development agency for Alberta, Saskatchewan, and Manitoba — formerly called Western Economic Diversification (WD). It provides grants and repayable contributions for business growth, innovation, and economic development in the Prairie provinces. For Alberta businesses, PrairiesCan&apos;s Business Scale-Up and Productivity Program (up to $5M) is one of the largest accessible grant programs for high-growth companies. PrairiesCan has offices in Calgary and Edmonton. Apply at prairisCan.gc.ca." },
                                    { q: "How long does Alberta Innovates take to review applications?", a: "Review timelines vary by program: Innovation Vouchers typically take 6–8 weeks from complete application to decision. Larger programs (Agri-Innovation, Energy Innovation, Health Innovation) with competitive intakes have defined review windows — usually 3–6 months from intake close to award decisions. Applications submitted close to intake deadlines with incomplete documentation are the most common cause of delays. Submit 2–3 weeks before the deadline to allow time for document corrections if Alberta Innovates requests additional information." },
                                    { q: "Can Alberta businesses combine provincial grants with federal grants?", a: "Yes — Alberta businesses can stack provincial and federal grants on the same project, provided total government support does not exceed the program maximums (typically 50–75% of eligible costs). Common stacking combinations include: Alberta Innovates Innovation Vouchers + IRAP contribution (both fund R&D); AEEP + EDC Trade Accelerator Program (both fund export market development); Alberta Innovates + SR&ED credits (provincial grant for project costs + federal tax credit for R&D expenditures). Document stacking in your application disclosures to avoid compliance issues." },
                                    { q: "Are there Alberta grants for hiring employees?", a: "Yes — Alberta Jobs Now provides wage subsidies of 25–50% for new hires (up to $25K per employee) for Alberta businesses in target industries. The federal Canada Job Grant covers up to 67% of eligible employee training costs (with provincial top-up). WorkBC (and Alberta equivalent programs) support apprenticeship training. For businesses in technology or advanced manufacturing, the combination of Jobs Now + Canada Job Grant can substantially reduce labor costs during growth phases." },
                                    { q: "What industries get the most Alberta grant funding?", a: "Alberta Innovates&apos; total funding allocation by sector (2024): Energy and environmental technology (32%), Health and life sciences (24%), Agriculture and food (18%), Digital technology (15%), Other (11%). This reflects Alberta&apos;s strategic priorities and means energy-adjacent startups (clean energy, carbon management, oilfield technology) and health tech companies receive the most per-capita funding. Digital businesses in Calgary or Edmonton that can demonstrate connections to Alberta&apos;s traditional industries (energy, agriculture) often perform better in Alberta Innovates applications than pure SaaS or consumer tech businesses." },
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
                            title="Get Alberta Grant Updates"
                            description="Stay informed about new Alberta business grants and funding opportunities"
                        />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
