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
    title: "Quebec Business Grants 2026: 20+ Programs Open [Guide]",
    description:
        "Find Quebec business grants and provincial funding programs. Complete guide to Quebec government grants (programs de subventions), eligibility requirements, and application deadlines.",
    keywords:
        "Quebec business grants, Quebec government funding, subventions entreprises Quebec, Investissement Quebec, startup funding Quebec",
}

const quebecGrants: Grant[] = [
    {
        id: "qc-essor",
        name: "Investissement Quebec - ESSOR",
        fundingMin: 100000,
        fundingMax: 5000000,
        eligibility: ["Strategic investment projects", "Quebec businesses"],
        deadline: "Rolling basis",
        applicationLink: "https://www.investquebec.com/quebec/en/financial-products/all-our-solutions/ESSOR.html",
        description: "Support for strategic investment projects driving economic development.",
        country: "Canada",
        region: "Quebec",
        category: "Business Growth",
        agency: "Investissement Québec",
        status: "Active",
        tags: ["Investment", "Strategic", "Growth"],
        requirements: ["Business plan", "Financials"],
        lastUpdated: "2026-01-01"
    },
    {
        id: "qc-technoclimat",
        name: "Technoclimat",
        fundingMin: 50000,
        fundingMax: 3000000,
        eligibility: ["Technological innovation in energy", "Quebec companies"],
        deadline: "Open",
        applicationLink: "https://transitionenergetique.gouv.qc.ca/en/innovation/programme-technoclimat",
        description: "Funding for technological innovation in energy efficiency and emissions reduction.",
        country: "Canada",
        region: "Quebec",
        category: "Green Energy",
        agency: "Transition Énergétique Québec",
        status: "Active",
        tags: ["Green", "Energy", "Innovation"],
        requirements: ["Technical documentation", "Emissions impact"],
        lastUpdated: "2026-01-01"
    },
    {
        id: "qc-pme-action",
        name: "PME en action",
        fundingMin: 10000,
        fundingMax: 50000,
        eligibility: ["SMEs in Quebec", "Productivity projects"],
        deadline: "Various",
        applicationLink: "https://www.economie.gouv.qc.ca/",
        description: "Program to increase the productivity of Quebec SMEs.",
        country: "Canada",
        region: "Quebec",
        category: "SME Support",
        agency: "Ministry of Economy",
        status: "Active",
        tags: ["Productivity", "SME"],
        requirements: ["Project plan"],
        lastUpdated: "2026-01-01"
    },
    {
        id: "qc-creativite",
        name: "Créativité Québec",
        fundingMin: 100000,
        fundingMax: 5000000,
        eligibility: ["Innovative projects", "Companies in Quebec"],
        deadline: "Ongoing",
        applicationLink: "https://www.investquebec.com/",
        description: "Financing for projects that purchase new technologies or develop innovative products.",
        country: "Canada",
        region: "Quebec",
        category: "Innovation",
        agency: "Investissement Québec",
        status: "Active",
        tags: ["Innovation", "Technology"],
        requirements: ["Innovation assessment"],
        lastUpdated: "2026-01-01"
    },
]

export default function QuebecGrantsPage() {
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
                                Quebec Provincial Funding
                            </Badge>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Quebec Business Grants 2026: Programs Open Now</h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                            Discover comprehensive Quebec provincial funding programs, business grants, and government incentives
                            available to entrepreneurs and companies across Quebec.
                        </p>
                        <div className="mt-4">
                            <ShortAnswerBox
                question="What government grants are available for Quebec businesses in 2026?"
                content="Quebec businesses can access Investissement Québec grants and loans (flexible amounts up to $25M), the CDPQ innovation fund, PRIMA Québec for AI and data science companies, Transition énergétique Québec for clean energy projects, and the R-D tax credit from Revenu Québec (30% on eligible R&D, stacked on top of federal SR&ED). Quebec offers some of the most generous provincial R&D incentives in North America for French-language tech companies."
              />
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
                                <div className="text-2xl font-bold text-primary">$350M+</div>
                                <p className="text-xs text-muted-foreground">Annual provincial programs</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Active Programs</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-primary">25+</div>
                                <p className="text-xs text-muted-foreground">Provincial grant programs</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-primary">35%</div>
                                <p className="text-xs text-muted-foreground">Average approval rate</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Grant Comparison Table */}
                    <div className="mb-12">
                        <GrantComparisonTable
                            grants={quebecGrants}
                            title="Quebec Business Grants Comparison"
                        />
                    </div>

                    {/* Content Sections */}

                    <div className="mb-12">
                        <InlineCTA
                            title="Need Strategy for Quebec Grants?"
                            description="Our specialists can help you navigate Quebec's provincial programs."
                            buttonText="Get Funding Assistance"
                            buttonLink="/contact"
                        />
                    </div>
                    <div className="grid lg:grid-cols-3 gap-8 mb-12">
                        <div className="lg:col-span-2 space-y-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Quebec Business Grant Opportunities</CardTitle>
                                </CardHeader>
                                <CardContent className="prose max-w-none">
                                    <p>
                                        Quebec offers a robust ecosystem of financial support for businesses, primarily through Investissement Quebec and various provincial ministries. The focus is heavily on innovation, export, and sustainable development.
                                    </p>

                                    <h3>Key Quebec Grant Programs</h3>
                                    <ul>
                                        <li>
                                            <strong>ESSOR Program</strong> - Major support for strategic investment projects
                                        </li>
                                        <li>
                                            <strong>Technoclimat</strong> - Funding for energy efficiency and green tech
                                        </li>
                                        <li>
                                            <strong>PME en action</strong> - Support for productivity and growth initiatives
                                        </li>
                                        <li>
                                            <strong>Créativité Québec</strong> - Financing for innovative projects
                                        </li>
                                    </ul>

                                    <h3>Eligibility Requirements</h3>
                                    <p>
                                        Quebec business grants typically require:
                                    </p>
                                    <ul>
                                        <li>Business registration in Quebec (NEQ)</li>
                                        <li>Operational presence in the province</li>
                                        <li>For some programs, French language compliance</li>
                                        <li>Project alignment with economic development goals</li>
                                    </ul>

                                    <h3>Application Process</h3>
                                    <p>
                                        Applications are often managed through Investissement Québec or specific ministries. Detailed project plans, financial statements, and proof of additional financing are commonly required.
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
                                        <a href="/canada/ontario" className="block text-primary hover:underline">
                                            Ontario Business Grants
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
                            <CardHeader><CardTitle className="text-xl">Investissement Québec — The Engine of Quebec&apos;s Business Funding</CardTitle></CardHeader>
                            <CardContent className="text-gray-700 space-y-4">
                                <p className="leading-relaxed">Investissement Québec (IQ) is the province&apos;s primary economic development corporation, offering loans, loan guarantees, tax credits, and equity investments to Quebec businesses. Unlike most provincial agencies that primarily offer grants, IQ primarily provides financing tools — but these tools are often at subsidized rates with interest-free periods, making them economically equivalent to grants for growing businesses. IQ also administers several direct grant programs through the Quebec Ministry of Economy.</p>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm border-collapse">
                                        <thead><tr className="bg-blue-800 text-white"><th className="text-left p-3">Program</th><th className="text-left p-3">Amount</th><th className="text-left p-3">Best For</th><th className="text-left p-3">Type</th></tr></thead>
                                        <tbody>
                                            {[
                                                ["ESSOR Program", "$100K–$5M", "Strategic investment projects in manufacturing, processing, tourism — Quebec businesses creating/maintaining significant jobs", "Non-repayable contribution or loan supplement; competitive"],
                                                ["Créativité Québec", "$100K–$5M", "Innovative Quebec companies purchasing new technologies or developing new products with commercialization potential", "Subordinated loan (favorable terms); often partially forgiven"],
                                                ["PME en action", "$10K–$50K", "Quebec SMEs undertaking productivity improvement, digital transformation, or process optimization projects", "Non-repayable grant; multiple intake windows annually"],
                                                ["Export assistance programs", "$5K–$50K", "Quebec exporters developing international market strategies, attending trade shows, or seeking market studies", "Non-repayable contribution; Ministry of Economy administration"],
                                                ["Technoclimat", "$50K–$3M", "Quebec companies developing or deploying innovative energy efficiency and GHG reduction technologies", "Non-repayable; Transition Énergétique Québec administration"],
                                                ["Quebec R&D Tax Credits (CDAE)", "14–30% of R&D", "Quebec companies doing eligible R&D — additional provincial credit stacked on federal SR&ED at 14% base (30% for specific fields)", "Refundable tax credit; annual filing via provincial return"],
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
                            <CardHeader><CardTitle className="text-xl">Quebec&apos;s R&D Tax Credit Advantage — CDAE vs. Federal SR&ED</CardTitle></CardHeader>
                            <CardContent className="text-gray-700 space-y-4">
                                <p className="leading-relaxed">Quebec has one of the most attractive R&D tax credit environments in North America, combining the federal SR&ED credit with Quebec&apos;s own Crédit d&apos;impôt pour la recherche scientifique et le développement expérimental (CDAE). For Quebec companies doing significant R&D, the combined federal + provincial credit can return 29–65% of qualifying expenses — making Quebec particularly attractive for life sciences, AI, and aerospace R&D investment.</p>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {[
                                        { name: "CDAE Base Rate (for profit)", desc: "14% refundable provincial tax credit on eligible R&D expenditures for Quebec CCPCs. Applies to salaries, materials, and subcontracted R&D performed in Quebec. Filed with the Quebec provincial tax return alongside the federal SR&ED claim (T661)." },
                                        { name: "CDAE Enhanced Rate (university partnership)", desc: "30% refundable credit when R&D is done in collaboration with a Quebec university or certified research centre. The partnership requirement mirrors federal SR&ED contractor relationships — a formal collaboration agreement with a recognized Quebec research institution is required." },
                                        { name: "Combined Federal + Quebec R&D Credit", desc: "Quebec CCPCs can claim: 35% federal SR&ED (for first $3M eligible expenses) + 14% Quebec CDAE = up to 49% total return. For collaboration-eligible projects: 35% federal + 30% Quebec = 65% return on eligible R&D — exceptional non-dilutive capital for research-intensive companies." },
                                        { name: "Salary R&D Credits (separate program)", desc: "Quebec also offers additional R&D salary-specific credits for researchers employed in Quebec. These supplement CDAE for companies with significant in-house research teams — particularly valuable for companies with 10+ Quebec-based researchers." },
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
                            <CardHeader><CardTitle className="text-xl">CED-Q (Canada Economic Development for Quebec) &amp; Federal Programs</CardTitle></CardHeader>
                            <CardContent className="text-gray-700 space-y-3">
                                <p className="text-sm leading-relaxed">Canada Economic Development for Quebec Regions (CED-Q) is the federal regional development agency for Quebec — equivalent to PacifiCan (BC), FedDev Ontario, or PrairiesCan (Prairie provinces). CED-Q focuses on rural Quebec economic development, SME growth, and innovation ecosystem support. Quebec businesses can stack CED-Q with IQ and provincial programs for significantly higher total funding.</p>
                                <div className="grid sm:grid-cols-3 gap-3">
                                    {[
                                        { prog: "CED-Q Business Growth", val: "$50K–$5M", note: "Grants and repayable contributions for Quebec businesses growing, innovating, or developing new markets; bilingual applications accepted" },
                                        { prog: "NRC-IRAP", val: "Up to $50K+", note: "Industrial R&D support; IRAP advisors in Montreal, Quebec City, Sherbrooke, and throughout Quebec" },
                                        { prog: "SR&ED + CDAE", val: "Up to 65%", note: "Combined federal/provincial R&D credit — Quebec&apos;s most powerful business support tool" },
                                        { prog: "CanExport SMEs", val: "Up to $50K", note: "Federal export development grants — Quebec exporters are strong CanExport users (bilingual international business)" },
                                        { prog: "CDAP", val: "$15K", note: "Canada Digital Adoption Program for Quebec SMEs — applications available in French" },
                                        { prog: "BDC Quebec", val: "Flexible", note: "BDC has specific Quebec-focused financing, with multiple offices and French-language service throughout the province" },
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
                            <CardHeader><CardTitle className="text-xl text-red-900">5 Mistakes Quebec Businesses Make When Applying for Provincial Grants</CardTitle></CardHeader>
                            <CardContent className="text-red-900 space-y-3">
                                {[
                                    { n: "1", m: "Not Filing Quebec CDAE R&D Credits Alongside Federal SR&ED", d: "Many Quebec businesses (and some SR&ED consultants not specializing in Quebec) file the federal SR&ED (T661) but forget the provincial CDAE claim on the Quebec return. Missing CDAE means leaving 14–30% of R&D expenditures unclaimed. Confirm your SR&ED consultant explicitly handles Quebec provincial returns and CDAE in addition to federal claims." },
                                    { n: "2", m: "Applying to IQ ESSOR Without Demonstrating Strategic Economic Impact", d: "The ESSOR program specifically funds &quot;strategic investment projects&quot; — meaning the project must have significant economic impact for Quebec (job creation, export revenue, supply chain development). Generic business expansion without clearly articulated Quebec economic benefit is consistently rejected. ESSOR applications must lead with economic impact metrics: jobs created, GDP contribution, export revenue, supplier development." },
                                    { n: "3", m: "Assuming All Applications Can Be in English Only", d: "While many Quebec government programs formally accept bilingual applications, French-language applications are evaluated by French-speaking reviewers who are more comfortable assessing French documentation. English-only applications from companies without French services may also signal a disconnect from Quebec&apos;s market. For any significant grant application to a Quebec provincial program, professional French translation of key documents is a worthwhile investment." },
                                    { n: "4", m: "Not Engaging Investissement Québec Before Finalizing Capital Projects", d: "IQ representatives work with businesses during project planning — before applications are submitted. Companies that engage IQ early can have their project structured to maximize IQ funding eligibility; companies that design projects independently and then apply often find their project structure doesn&apos;t align with IQ program criteria. Contact your regional IQ office at the earliest planning stages of any significant capital investment." },
                                    { n: "5", m: "Overlooking PME en action for Short-Term Productivity Projects", d: "PME en action ($10K–$50K) is Quebec&apos;s most accessible provincial grant for established SMEs needing capital for productivity improvements, digital transformation, or process upgrades. Because it&apos;s smaller and less prestigious than ESSOR or Créativité Québec, many Quebec businesses overlook it — but its accessibility and rolling intake make it ideal for businesses that need funding quickly for specific operational improvements." },
                                ].map(({ n, m, d }) => (
                                    <div key={n} className="bg-white rounded-lg p-4 border border-red-200">
                                        <div className="font-semibold text-red-900 mb-1 text-sm">{n}. {m}</div>
                                        <p className="text-xs text-red-800 leading-relaxed">{d}</p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">FAQ: Quebec Business Grants 2026</h2>
                            <div className="space-y-4">
                                {[
                                    { q: "Can English-speaking Quebec businesses access provincial grants?", a: "Yes — English-speaking Quebec businesses can access all provincial grant programs. Most Investissement Québec programs formally accept bilingual applications. The provincial government publishes program guidelines in both English and French. For businesses operating in English-predominant industries (technology, film, finance), IQ and ministry staff in Montreal and Quebec City are generally bilingual. That said, French-language applications often receive more thorough review from evaluators who are native French speakers — bilingual documentation is advisable for large applications." },
                                    { q: "What is the Quebec R&D tax credit rate and how does it compare to other provinces?", a: "Quebec&apos;s CDAE credit is 14% base rate and 30% for collaborative R&D with universities — both fully refundable for CCPCs. Combined with the federal SR&ED credit (35% for CCPCs on first $3M), Quebec companies can receive up to 49% (base) or 65% (collaborative) total R&D tax credit on eligible expenditures. This is among the highest total R&D credit rates in Canada and North America — higher than Ontario (OITC 10%), Alberta (no provincial R&D credit for most sectors), or BC (BC SR&ED 10%). Quebec&apos;s R&D credit is a primary reason the province has attracted major aerospace, pharmaceutical, and AI research investment." },
                                    { q: "Does Quebec have grants specifically for artificial intelligence companies?", a: "Yes — Quebec is Canada&apos;s leading AI province (home to Mila - Quebec AI Institute, Element AI alumni, and major AI research at Université de Montréal, McGill, and Polytechnique). Specific Quebec AI programs include: AI Strategy Institute (IVADO) project funding; Mila Industry Partnerships for companies collaborating with Mila researchers; PROMPT research-industry collaboration grants with AI focus; and IQ Créativité Québec for AI companies developing new products. The Quebec AI ecosystem also provides indirect funding access through CDAE collaborative credits when partnering with university AI researchers." },
                                    { q: "Are there Quebec grants for the video game industry?", a: "Yes — Quebec is home to Canada&apos;s largest video game industry (Ubisoft Montreal, EA Montreal, Warner Bros Games Montreal) and has dedicated funding: the Tax Credit for the Production of Multimedia Titles (37.5% of qualifying labour costs) applies to video game development companies in Quebec. Telefilm Canada and Canada Media Fund (CMF) fund digital interactive media including video games. The SODEC (Society for the Development of Cultural Enterprise) supports Quebec cultural digital media. Combined federal and provincial video game tax credits make Quebec one of the most financially attractive game development locations globally." },
                                    { q: "How does Technoclimat work and who qualifies?", a: "Technoclimat is administered by Transition Énergétique Québec (TEQ) and funds Quebec companies developing or deploying innovative technologies that reduce greenhouse gas emissions and improve energy efficiency. Eligible projects: energy efficiency technology development, GHG reduction innovation, smart grid technology, industrial process decarbonization. Funding: $50K–$3M non-repayable grants. Applications are competitive — projects must demonstrate measurable GHG reduction or energy savings, technological innovation beyond current best practices, and commercial potential. Priority sectors: manufacturing, transportation, and building/industrial energy systems." },
                                    { q: "What is the difference between IQ ESSOR and Créativité Québec?", a: "Both are IQ programs but serve different purposes: ESSOR focuses on strategic investment projects with major economic impact — large manufacturers, tourism infrastructure, significant job-creating investments. It&apos;s IQ&apos;s flagship economic development tool for major projects ($100K–$5M+). Créativité Québec focuses specifically on innovation — companies developing new products or adopting new technologies. It&apos;s structured as a subordinated loan (favorable below-market terms, often with forgiveness provisions) rather than a pure grant. Créativité Québec is better for technology-oriented businesses; ESSOR is better for capital-intensive investment projects." },
                                    { q: "Can a startup incorporated outside Quebec but with Quebec operations access IQ programs?", a: "Most IQ programs and Quebec provincial grants require Quebec business registration (NEQ number) and significant Quebec operations. A company incorporated elsewhere (Ontario, federally under CBCA) can register as a Quebec extra-provincial corporation and access programs if they have substantive Quebec operations, Quebec employees, and Quebec tax obligations. A pro forma Quebec office without genuine Quebec operations does not qualify. For companies with genuine Quebec development or manufacturing operations, provincial registration and program access is straightforward — consult with a Quebec business lawyer to ensure your corporate structure qualifies." },
                                    { q: "Are there Quebec grants for agricultural and food businesses?", a: "Yes — La Financière agricole du Québec (FADQ) provides the primary agricultural financing and insurance programs for Quebec farm businesses. For agri-food processors and food businesses, Aliments du Québec labeling programs provide market access support. IQ ESSOR applies to food processing strategic investments. The federal-provincial Growing Forward/AgriInvest/AgriStability programs apply in Quebec through Agriculture and Agri-Food Canada. Quebec&apos;s strong dairy, maple syrup, and specialty food sectors have dedicated provincial market development programs through MAPAQ (Ministry of Agriculture, Fisheries and Food)." },
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
                            title="Get Quebec Grant Updates"
                            description="Stay informed about new Quebec business grants and funding opportunities"
                        />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
