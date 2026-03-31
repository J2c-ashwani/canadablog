import { Header } from "@/components/Header"
import EEATBadge from "@/components/blog/EEATBadge"
import { CTRTrap } from "@/components/blog/CTRTrap";
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
    title: "New Brunswick Business Grants (2026) – Applications Open Now + Deadlines",
    description:
        "Apply directly with official links for New Brunswick business grants. No middlemen. Updated deadlines and verified zero-equity funding programs for 2026.",
    keywords:
        "New Brunswick business grants, NB government funding, provincial grants New Brunswick, Opportunities NB, startup funding Moncton Fredericton",
}

const nbGrants: Grant[] = [
    {
        id: "nb-business-dev",
        name: "Business Development Program",
        fundingMin: 25000,
        fundingMax: 500000,
        eligibility: ["Strategic sectors", "New Brunswick businesses"],
        deadline: "Ongoing",
        applicationLink: "https://onbcanada.ca/",
        description:
        "Apply directly with official links for New Brunswick business grants. No middlemen. Updated deadlines and verified zero-equity funding programs for 2026.",
        country: "Canada",
        region: "New Brunswick",
        category: "Business Growth",
        agency: "Opportunities NB",
        status: "Active",
        tags: ["Growth", "Expansion"],
        requirements: ["Business plan", "Financials"],
        lastUpdated: "2026-01-01"
    },
    {
        id: "nb-export",
        name: "Export Development",
        fundingMin: 5000,
        fundingMax: 20000,
        eligibility: ["Export-ready SMEs", "New Brunswick companies"],
        deadline: "Apply before travel",
        applicationLink: "https://onbcanada.ca/exporting/",
        description:
        "Apply directly with official links for New Brunswick business grants. No middlemen. Updated deadlines and verified zero-equity funding programs for 2026.",
        country: "Canada",
        region: "New Brunswick",
        category: "Export",
        agency: "Opportunities NB",
        status: "Active",
        tags: ["Export", "Marketing"],
        requirements: ["Export strategy"],
        lastUpdated: "2026-01-01"
    },
    {
        id: "nb-workforce",
        name: "Workforce Expansion",
        fundingMin: 10000,
        fundingMax: 100000,
        eligibility: ["Employers creating new jobs", "Hiring unemployed"],
        deadline: "Ongoing",
        applicationLink: "https://www2.gnb.ca/content/gnb/en/services/services_renderer.201467.Workforce_Expansion_Program.html",
        description:
        "Apply directly with official links for New Brunswick business grants. No middlemen. Updated deadlines and verified zero-equity funding programs for 2026.",
        country: "Canada",
        region: "New Brunswick",
        category: "Workforce",
        agency: "Government of NB",
        status: "Active",
        tags: ["Hiring", "Wage Subsidy"],
        requirements: ["Hiring plan"],
        lastUpdated: "2026-01-01"
    },
]

export default function NewBrunswickGrantsPage() {
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
                                New Brunswick Provincial Funding
                            </Badge>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">New Brunswick Business Grants 2026</h1>
                        <div className="mt-6">
                            <CTRTrap />
                        </div>

            <div className="mt-8 mb-4 text-left">
              <ShortAnswerBox
                question="What government grants are available for New Brunswick businesses in 2026?"
                content="New Brunswick businesses can access Opportunities NB (ONB) direct investment grants ($50K–$5M for job-creating projects), ACOA Atlantic Canada contributions (up to $1M for scaling businesses), the NB Research and Innovation Fund for commercialization projects, the NB Small Business Investor Tax Credit (50% on investments up to $250K), and the NBFirst Digital Skills program for workforce training. Combined with federal IRAP and SR&ED, New Brunswick SMEs — particularly in IT, cybersecurity, and aquaculture — have a compelling funding pathway."
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
                                <div className="text-2xl font-bold text-primary">$35M+</div>
                                <p className="text-xs text-muted-foreground">Annual provincial programs</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Active Programs</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-primary">10+</div>
                                <p className="text-xs text-muted-foreground">Provincial grant programs</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-primary">42%</div>
                                <p className="text-xs text-muted-foreground">Average approval rate</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Grant Comparison Table */}
                    <div className="mb-12">
                        <GrantComparisonTable
                            grants={nbGrants}
                            title="New Brunswick Business Grants Comparison"
                        />
                    </div>

                    {/* Content Sections */}

                    <div className="mb-12">
                        <InlineCTA
                            title="Need Strategy for New Brunswick Grants?"
                            description="Our specialists can help you navigate New Brunswick's provincial programs."
                            buttonText="Get Funding Assistance"
                            buttonLink="/contact"
                        />
                    </div>
                    <div className="grid lg:grid-cols-3 gap-8 mb-12">
                        <div className="lg:col-span-2 space-y-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle>New Brunswick Business Grant Opportunities</CardTitle>
                                </CardHeader>
                                <CardContent className="prose max-w-none">
                                    <p>
                                        Opportunities NB (ONB) is the crown corporation responsible for economic development. They provide tailored support packages often involving a mix of non-repayable contributions and loans.
                                    </p>

                                    <h3>Key New Brunswick Grant Programs</h3>
                                    <ul>
                                        <li>
                                            <strong>Business Development Program</strong> - Core program for expansion and growth
                                        </li>
                                        <li>
                                            <strong>Workforce Expansion</strong> - Wage subsidies for new hires
                                        </li>
                                        <li>
                                            <strong>Export Development</strong> - Support for global market access
                                        </li>
                                    </ul>

                                    <h3>Eligibility Requirements</h3>
                                    <p>
                                        Standard eligibility includes:
                                    </p>
                                    <ul>
                                        <li>Operating within New Brunswick</li>
                                        <li>Registration with Corporate Registry</li>
                                        <li>Projects demonstrating clear economic benefits</li>
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
                                        <a href="/canada/nova-scotia" className="block text-primary hover:underline">
                                            Nova Scotia Grants
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
                            <CardHeader><CardTitle className="text-xl">Opportunities NB (ONB) — New Brunswick&apos;s Primary Economic Development Agency</CardTitle></CardHeader>
                            <CardContent className="text-gray-700 space-y-4">
                                <p className="leading-relaxed">Opportunities NB (ONB) is New Brunswick&apos;s crown corporation responsible for attracting investment and supporting business growth. ONB administers a range of contribution programs and often packages multiple incentives (grants + loans + workforce incentives) into single business development deals for qualifying companies. NB&apos;s small size, low business costs, and bilingual workforce make it uniquely attractive for businesses serving both English and French-Canadian markets.</p>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm border-collapse">
                                        <thead><tr className="bg-blue-800 text-white"><th className="text-left p-3">Program</th><th className="text-left p-3">Amount</th><th className="text-left p-3">Best For</th><th className="text-left p-3">Deadline</th></tr></thead>
                                        <tbody>
                                            {[
                                                ["Business Development Program (BDP)", "$25K–$500K", "NB businesses expanding capacity, adopting technology, modernizing operations, or entering new markets", "Ongoing — contact ONB"],
                                                ["Workforce Expansion", "$10K–$100K", "NB employers creating new, full-time jobs for previously unemployed New Brunswickers — wage subsidy program", "Ongoing — submit before hiring"],
                                                ["Export Development", "$5K–$20K", "NB exporters funding trade show travel, market research, international certification, and promotional materials", "Pre-approval required before travel"],
                                                ["NB Innovation Foundation (NBIF)", "$25K–$500K", "NB companies doing R&D and technology innovation — separate from ONB, administered through NBIF", "Semi-annual competitive intake"],
                                                ["Regional Development Corporation", "Varies", "Strategic sector investments with significant job creation potential — negotiated directly with RDC", "Open negotiation"],
                                                ["NB Jobs Act Incentives", "Varies", "Large employers committing to significant NB employment — payroll tax rebates up to 75% of NB payroll taxes for 10 years", "Negotiated — for employers 10+ jobs"],
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
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader><CardTitle className="text-xl">New Brunswick&apos;s Bilingual Advantage — Key for Call Centres, Digital, and Professional Services</CardTitle></CardHeader>
                            <CardContent className="text-gray-700 space-y-4">
                                <p className="leading-relaxed">New Brunswick is Canada&apos;s only officially bilingual province (both English and French constitutionally enshrined). This creates a unique and powerful advantage for businesses serving both language markets — particularly financial services, call centres, digital media, government services, and professional services. ACOA and ONB actively promote NB as a bilingual business location and have specific incentives for bilingual workforce development.</p>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {[
                                        { name: "ACOA Business Development Program NB", amount: "$25K–$3M", desc: "ACOA&apos;s largest program is highly active in NB — priority for bilingual businesses, IT companies, and manufacturers. ACOA Moncton and Fredericton offices process NB applications. The combination of ONB + ACOA on the same project is standard in NB." },
                                        { name: "NB Innovation Foundation (NBIF)", amount: "$25K–$500K", desc: "NBIF funds R&D projects in NB-based companies. Requires a collaboration component with University of New Brunswick (UNB) or Université de Moncton for full grants. Important for NB tech companies, biomedical businesses, and natural resource technology." },
                                        { name: "NB Jobs Act Payroll Tax Rebate", amount: "Up to 75% of payroll taxes x 10 years", desc: "The NB Jobs Act offers one of Canada&apos;s most aggressive job-creation incentive programs — rebating up to 75% of provincial payroll taxes for 10 years for qualifying new large employers. Makes NB extremely competitive for call centre, IT services, and back-office operations." },
                                        { name: "Canada-NB Job Grant", amount: "Up to $10K per employee", desc: "Joint federal-provincial grant covering up to two-thirds of employee training costs for NB employers. Particularly valuable for bilingual service businesses training staff in French-language skills, digital technology, and customer service excellence." },
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
                            <CardHeader><CardTitle className="text-xl text-red-900">5 Mistakes New Brunswick Businesses Make When Applying for Grants</CardTitle></CardHeader>
                            <CardContent className="text-red-900 space-y-3">
                                {[
                                    { n: "1", m: "Applying to ONB BDP Without an Appointment with an ONB Business Development Representative", d: "ONB strongly recommends (and effectively requires) a pre-application meeting with an ONB Business Development representative before submitting a formal application. Companies that submit cold applications without prior ONB engagement are frequently asked to resubmit after an ONB consultation — adding months to the timeline. Contact ONB at the earliest planning stages of your project." },
                                    { n: "2", m: "Not Stacking ONB with ACOA on the Same Capital Project", d: "ONB and ACOA routinely fund different portions of the same NB business project — this stacking is expected and encouraged. A NB manufacturer expanding capacity might receive ONB contribution (provincial) + ACOA BDP contribution (federal) covering different eligible cost categories. Apply to both simultaneously (with disclosures) to maximize non-dilutive capital on your expansion project." },
                                    { n: "3", m: "Overlooking the NB Jobs Act Payroll Tax Rebate for Workforce-Heavy Businesses", d: "The NB Jobs Act is one of the most valuable NB incentives — up to 75% payroll tax rebate for 10 years — but requires pre-negotiation with the government before establishing new operations. Businesses that establish NB operations without first negotiating Jobs Act terms lose the decade-long tax benefit entirely. Any business establishing a new NB location with 10+ employees should negotiate Jobs Act terms before signing commercial leases." },
                                    { n: "4", m: "Not Applying to NBIF for R&D-Intensive Projects", d: "The NB Innovation Foundation (NBIF) is separate from ONB and administers significant R&D funding for NB companies. Many NB businesses know ONB but are unfamiliar with NBIF — which can fund the same R&D work that IRAP funds federally. For NB tech companies and manufacturers doing innovation, apply to both IRAP (federal) and NBIF (provincial) for the same project — both can fund different aspects of the same R&D program." },
                                    { n: "5", m: "Applying to Workforce Expansion After the Employee Starts", d: "NB&apos;s Workforce Expansion program requires submission before the approved employee&apos;s start date — retroactive applications for employees already hired are not accepted. NB businesses planning new hires should assess Workforce Expansion eligibility and submit applications 4–6 weeks before the planned hire date for every qualifying position." },
                                ].map(({ n, m, d }) => (
                                    <div key={n} className="bg-white rounded-lg p-4 border border-red-200">
                                        <div className="font-semibold text-red-900 mb-1 text-sm">{n}. {m}</div>
                                        <p className="text-xs text-red-800 leading-relaxed">{d}</p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">FAQ: New Brunswick Business Grants 2026</h2>
                            <div className="space-y-4">
                                {[
                                    { q: "What is Opportunities NB and how is it different from other provincial agencies?", a: "Opportunities NB (ONB) is New Brunswick&apos;s crown corporation for economic development. Unlike some provinces that have separate agencies for different sectors, ONB is the single point of contact for most NB government business support — including grants, contributions, business attraction, and workforce development. ONB&apos;s approach is relationship-based: business development representatives work directly with NB companies to design funding packages rather than having businesses navigate a rigid program catalogue. Contact ONB at onbcanada.ca." },
                                    { q: "How does NB being bilingual affect business grants?", a: "NB&apos;s bilingual status provides several funding advantages: (1) Bilingual NB businesses can access Quebec-focused federal programs more easily than other provinces; (2) The NB government provides additional workforce funding for French-language training and bilingual skills development; (3) ACOA specifically promotes NB&apos;s bilingual advantage for businesses targeting both English and French Canadian markets; (4) The NB Jobs Act is particularly attractive to businesses that need a bilingual workforce for call centres, customer service, or government services — a relatively rare business advantage compared to other provinces." },
                                    { q: "Are there NB grants for technology and digital media companies?", a: "Yes — NB has a growing tech sector (led by Moncton and Fredericton). NBIF funds NB tech R&D. ACOA BDP supports ICT and digital businesses. CyberNB supports cybersecurity companies. The provincial government offers specific digital economy incentives. Introhive (CRM software), Q4 Inc., and other NB tech companies have used ONB + ACOA combinations to scale. For digital media, the NB Film industry has tax credits and ACOA/ONB funding through New Brunswick Film. Connect with the Enterprise NB (Moncton) or Capital Region technology hubs for ecosystem connection." },
                                    { q: "What is the NB Innovation Foundation and how does it differ from ONB?", a: "The NB Innovation Foundation (NBIF) is a separate NB agency specifically focused on R&D and innovation funding — different from ONB which focuses on business development broadly. NBIF administers: R&D Partnership grants (requiring UNB or Université de Moncton collaboration), Ignite grants for early-stage NB companies, and various sector-specific innovation programs. NBIF is best suited for NB technology companies, life sciences, and natural resource businesses doing active R&D. Apply at nbif.ca — separate from ONB applications." },
                                    { q: "Does New Brunswick have grants for agricultural businesses?", a: "Yes — Agriculture, Aquaculture and Fisheries New Brunswick administers provincial agricultural programs including the Agricultural Development Fund and sector-specific grants for NB farmers, processors, and aquaculture businesses. The ACOA BDP also supports NB agri-food businesses. The federal-provincial Canadian Agricultural Partnership (CAP) programs are administered in NB through provincial agriculture offices. For fishing and aquaculture, Fisheries and Oceans Canada (DFO) has specific programs relevant to NB&apos;s significant fishing industry along the Bay of Fundy and Gulf of St. Lawrence." },
                                    { q: "Can a non-NB company get New Brunswick grants if they relocate or expand to NB?", a: "Yes — New Brunswick actively recruits companies from other provinces and internationally to establish NB operations. ONB has a business attraction program specifically for companies considering NB expansion. The NB Jobs Act payroll tax rebate is primarily targeted at businesses establishing new NB operations (not existing NB companies). Companies considering NB expansion should contact ONB&apos;s business attraction team before making location decisions — the incentive packages available before establishing NB operations are substantially more generous than programs available to already-established NB businesses." },
                                    { q: "What is the success rate for NB provincial grant applications?", a: "NB&apos;s smaller business population means less competition for provincial programs compared to Ontario or Quebec. ONB&apos;s relationship-based approach (where ONB representatives guide applications) means applications that reach formal submission stage have high success rates — ONB representatives generally don&apos;t encourage formal submission of applications unlikely to succeed. NBIF competitive R&D grants are more competitive (multiple applications per intake), with success rates varying by year and program. ACOA NB success rates are comparable to other Atlantic provinces — the Moncton ACOA office is known for being accessible to SMEs." },
                                    { q: "Are there NB grants specifically for startup businesses?", a: "Yes — NBIF Ignite program supports early-stage NB tech companies. Futurpreneur Canada operates in NB, providing loans and mentoring to entrepreneurs 18–39. ONB Business Development Program has flexibility for qualifying startups with strong business plans and job creation potential. Enterprise zones in Moncton, Fredericton, and Saint John provide additional startup ecosystem support including co-working, mentorship, and connections to local angel networks. Community Futures NB organizations provide startup financing in rural NB communities." },
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
                            title="Get New Brunswick Grant Updates"
                            description="Stay informed about new New Brunswick business grants and funding opportunities"
                        />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
