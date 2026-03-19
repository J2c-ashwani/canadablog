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
    title: "Saskatchewan Business Grants 2026 | Provincial Funding Programs",
    description:
        "Find Saskatchewan business grants and provincial funding programs. Complete guide to Saskatchewan government grants, eligibility requirements, and application deadlines.",
    keywords:
        "Saskatchewan business grants, SK government funding, provincial grants Saskatchewan, Regina business grants, startup funding Saskatoon",
}

const saskGrants: Grant[] = [
    {
        id: "sk-stsi",
        name: "Saskatchewan Technology Startup Incentive",
        fundingMin: 10000,
        fundingMax: 500000,
        eligibility: ["Tech startups", "Eligible Investors"],
        deadline: "Ongoing",
        applicationLink: "https://www.saskatchewan.ca/business/investment-and-economic-development/science-and-technology/metrics-and-achievements/saskatchewan-technology-startup-incentive",
        description: "45% tax credit for investors in eligible early-stage technology startups.",
        country: "Canada",
        region: "Saskatchewan",
        category: "Technology",
        agency: "Innovation Saskatchewan",
        status: "Active",
        tags: ["Tax Credit", "Angel Investment"],
        requirements: ["Eligible startup status"],
        lastUpdated: "2026-01-01"
    },
    {
        id: "sk-lean",
        name: "Saskatchewan Lean Improvements in Manufacturing",
        fundingMin: 5000,
        fundingMax: 20000,
        eligibility: ["Agri-business", "Manufacturing"],
        deadline: "Open",
        applicationLink: "https://www.saskatchewan.ca/",
        description: "Funding for efficiency improvements and lean process adoption.",
        country: "Canada",
        region: "Saskatchewan",
        category: "Manufacturing",
        agency: "Government of Saskatchewan",
        status: "Active",
        tags: ["Efficiency", "Manufacturing"],
        requirements: ["Project quote"],
        lastUpdated: "2026-01-01"
    },
    {
        id: "sk-job-grant",
        name: "Canada-Saskatchewan Job Grant",
        fundingMin: 1000,
        fundingMax: 10000,
        eligibility: ["Employers in SK", "Training for employees"],
        deadline: "Rolling",
        applicationLink: "https://www.saskatchewan.ca/business/hire-train-and-manage-employees/apply-for-the-canada-saskatchewan-job-grant",
        description: "Funding for third-party skills training for employees.",
        country: "Canada",
        region: "Saskatchewan",
        category: "Workforce",
        agency: "Government of Saskatchewan",
        status: "Active",
        tags: ["Training", "Employment"],
        requirements: ["Training plan"],
        lastUpdated: "2026-01-01"
    },
]

export default function SaskatchewanGrantsPage() {
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
                                Saskatchewan Provincial Funding
                            </Badge>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Saskatchewan Business Grants 2026</h1>
            <div className="mt-8 mb-4 text-left">
              <ShortAnswerBox
                question="What government grants are available for Saskatchewan businesses in 2026?"
                content="Saskatchewan businesses can access the Saskatchewan Advantage Grant for Education and Training (SAGES, $20,000 tuition rebate for grads who work in SK), the Saskatchewan Technology Startup Incentive (STSI, 45% non-refundable tax credit for investors), PrairiesCan federal contributions for prairie SMEs, STEP export grants for international market development, and AgriStability for agricultural operations. Combined with federal SR&ED and IRAP, Saskatchewan tech and agri-business companies have a strong funding stack."
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
                                <div className="text-2xl font-bold text-primary">$50M+</div>
                                <p className="text-xs text-muted-foreground">Annual provincial programs</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Active Programs</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-primary">12+</div>
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
                            grants={saskGrants}
                            title="Saskatchewan Business Grants Comparison"
                        />
                    </div>

                    {/* Content Sections */}

                    <div className="mb-12">
                        <InlineCTA
                            title="Need Strategy for Saskatchewan Grants?"
                            description="Our specialists can help you navigate Saskatchewan's provincial programs."
                            buttonText="Get Funding Assistance"
                            buttonLink="/contact"
                        />
                    </div>
                    <div className="grid lg:grid-cols-3 gap-8 mb-12">
                        <div className="lg:col-span-2 space-y-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Saskatchewan Business Grant Opportunities</CardTitle>
                                </CardHeader>
                                <CardContent className="prose max-w-none">
                                    <p>
                                        Saskatchewan is known for its strong agricultural base but is also rapidly growing its technology sector through the Saskatchewan Technology Startup Incentive (STSI).
                                    </p>

                                    <h3>Key Saskatchewan Grant Programs</h3>
                                    <ul>
                                        <li>
                                            <strong>STSI (Tech Startup Incentive)</strong> - 45% non-refundable tax credit for angel investors
                                        </li>
                                        <li>
                                            <strong>Canada-Saskatchewan Job Grant</strong> - Training support for employees
                                        </li>
                                        <li>
                                            <strong>Product2Market</strong> - Tech commercialization funding (Innovation Sask)
                                        </li>
                                    </ul>

                                    <h3>Eligibility Requirements</h3>
                                    <p>
                                        Standard requirements include:
                                    </p>
                                    <ul>
                                        <li>Operation in Saskatchewan</li>
                                        <li>Registration with ISCB</li>
                                        <li>Sector-specific requirements (e.g., Tech, Ag)</li>
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
                                        <a href="/canada/manitoba" className="block text-primary hover:underline">
                                            Manitoba Funding
                                        </a>
                                        <a href="/canada/alberta" className="block text-primary hover:underline">
                                            Alberta Business Grants
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
                            <CardHeader><CardTitle className="text-xl">Saskatchewan&apos;s Core Business Grant Programs — Full Breakdown</CardTitle></CardHeader>
                            <CardContent className="text-gray-700 space-y-4">
                                <p className="leading-relaxed">Saskatchewan&apos;s grant ecosystem is anchored in two strengths: technology startup incentives (STSI — the most generous angel investor tax credit in Canada) and agricultural innovation (the province&apos;s $16B+ agricultural economy generates substantial federal-provincial agri-business support). Innovation Saskatchewan leads the tech sector, while the Ministry of Agriculture administers agri-food programs. PrairiesCan (federal) is the largest funding source for established SK businesses.</p>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm border-collapse">
                                        <thead><tr className="bg-blue-800 text-white"><th className="text-left p-3">Program</th><th className="text-left p-3">Amount</th><th className="text-left p-3">Best For</th><th className="text-left p-3">Type</th></tr></thead>
                                        <tbody>
                                            {[
                                                ["Saskatchewan Technology Startup Incentive (STSI)", "45% tax credit (up to $500K invested)", "SK tech startup investors — 45% non-refundable SK tax credit on investments in eligible early-stage tech startups", "Tax credit; investor applies after receiving STSI certificate from startup"],
                                                ["Product2Market (P2M)", "$10K–$100K", "SK early-stage tech companies developing and commercializing innovative products — Innovation Saskatchewan program", "Non-repayable; competitive intake bi-annually"],
                                                ["Canada-Saskatchewan Job Grant", "$1K–$10K per employee", "SK employers training employees through third-party providers in eligible skills — joint federal-provincial funding", "Rolling — apply before training begins"],
                                                ["Saskatchewan Lean Improvements in Manufacturing (SLIM)", "$5K–$20K", "SK manufacturing businesses adopting lean management and process efficiency improvements", "Rolling — through SK Ministry of Economy"],
                                                ["AgriInnovate SK", "$25K–$1M+", "SK agri-tech and food processing companies commercializing agricultural innovations", "Federal program; AAFC administration in SK"],
                                                ["PrairiesCan Scale-Up", "$50K–$10M", "Established SK businesses investing in productivity, innovation, and market expansion — the largest single non-repayable source available to SK companies", "Competitive; Saskatoon and Regina offices"],
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
                            <CardHeader><CardTitle className="text-xl">Saskatchewan Technology Startup Incentive (STSI) — Canada&apos;s Best Angel Investor Tax Credit</CardTitle></CardHeader>
                            <CardContent className="text-gray-700 space-y-4">
                                <p className="leading-relaxed">The Saskatchewan Technology Startup Incentive (STSI) provides eligible investors with a 45% non-refundable Saskatchewan provincial tax credit on investments in qualifying early-stage tech startups. This is the highest angel investor tax credit rate in Canada — BC offers 30%, Manitoba offers lower rates — making Saskatchewan uniquely attractive for angel investment into local tech startups. For a $100K angel investment in a qualifying SK tech startup, an investor receives a $45K provincial tax credit.</p>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {[
                                        { name: "For Startups: How to Get STSI Certification", desc: "SK tech startups apply to Innovation Saskatchewan for STSI certification before approaching investors. Eligible startups: incorporated in SK, fewer than 50 employees, primarily technology-based business, less than $5M in assets. Once certified, the startup issues STSI certificates to eligible investors who claim the 45% credit on their SK provincial tax return. Process takes 4–8 weeks — plan certification before starting fundraising rounds." },
                                        { name: "For Investors: How to Claim the STSI Credit", desc: "Individual investors resident in Saskatchewan can claim the 45% STSI credit on investments of up to $1M in any tax year. The credit is non-refundable — it reduces SK provincial tax owing but does not generate a cash refund. Investors must hold the investment for at least 5 years. The credit is claimed on the SK provincial tax return in the year the investment is made. Consult a SK tax advisor before making STSI-eligible investments to optimize timing." },
                                        { name: "Combining STSI with Federal Capital Gains Exemptions", desc: "SK tech startup investors can combine the 45% STSI credit with the federal $1.25M Lifetime Capital Gains Exemption (LCGE) on qualifying small business corporation shares. The LCGE defers or eliminates capital gains tax on the sale of qualifying shares, making the combined STSI + LCGE structure among the most tax-efficient private investment structures in Canada for both investors and startups." },
                                        { name: "What Qualifies as a 'Technology Startup' under STSI", desc: "STSI-eligible businesses: primarily technology-focused (software, hardware, biotech, agritech, cleantech), incorporated in SK, active business operations in SK, fewer than 50 full-time employees, less than $5M in assets/revenues. Non-eligible: professional services, real estate, retail, financial services, resource extraction without technology focus. Innovation Saskatchewan reviews STSI certification applications — contact them before structuring your fundraise." },
                                    ].map(({ name, desc }) => (
                                        <div key={name} className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                                            <div className="font-semibold text-blue-900 text-sm mb-2">{name}</div>
                                            <div className="text-xs text-gray-700 leading-relaxed">{desc}</div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-red-50 border-red-100">
                            <CardHeader><CardTitle className="text-xl text-red-900">5 Mistakes Saskatchewan Businesses Make When Applying for Grants</CardTitle></CardHeader>
                            <CardContent className="text-red-900 space-y-3">
                                {[
                                    { n: "1", m: "Tech Startups Not Getting STSI Certified Before Fundraising", d: "STSI certification must be obtained from Innovation Saskatchewan before investments are made — investors cannot retroactively claim the 45% credit on investments made before STSI certification is issued. SK tech startups should apply for STSI certification as early as possible in their fundraising process (4–8 weeks processing time). Not having STSI certification actively reduces your ability to raise SK angel investment — it&apos;s the primary investor incentive in the province." },
                                    { n: "2", m: "Agricultural Businesses Not Accessing Federal Agri-Food Programs", d: "Saskatchewan farmers, agri-processors, and agri-tech companies have access to several federal programs beyond provincial grants: AgriInnovate (up to $5M for agricultural innovation), AgriInvest (government matching savings accounts), AgriStability (income protection), and Growing Forward programs. Many SK agricultural businesses only know about provincial agriculture programs and miss out on federal contributions that are often larger. Engage with your AAFC (Agriculture and Agri-Food Canada) regional office in Saskatoon or Regina." },
                                    { n: "3", m: "Not Engaging PrairiesCan Before Large Capital Projects", d: "PrairiesCan (formerly Western Economic Diversification) offers the largest single grants available to SK businesses ($50K–$10M) but is underutilized because many businesses don&apos;t know the agency&apos;s mandate and program structure. PrairiesCan Saskatoon and Regina offices work with SK manufacturers, food processors, technology companies, and diversified businesses. Schedule a PrairiesCan meeting at the earliest planning stages of any major capital project — program officers actively help design eligible projects." },
                                    { n: "4", m: "Applying to SLIM Without Documenting Baseline Operations", d: "The Saskatchewan Lean Improvements in Manufacturing (SLIM) program funds lean process improvement projects. Applications that don&apos;t baseline current process metrics (cycle times, defect rates, throughput, labour cost per unit) before proposing improvements are consistently scored lower than applications with clear before/after numerical targets. Document your manufacturing baseline data before writing your SLIM application." },
                                    { n: "5", m: "Not Stacking Canada-Saskatchewan Job Grant with New Employee Onboarding", d: "The Canada-Saskatchewan Job Grant covers up to $10K of third-party training costs per employee — but must be applied for before training begins. SK businesses that hire then train without applying first miss the two-thirds government cost recovery. Create a standard operating procedure for new hires: identify eligible training → submit CSJG application → receive approval → begin training. This simple process change converts substantial training expenses into funded investments." },
                                ].map(({ n, m, d }) => (
                                    <div key={n} className="bg-white rounded-lg p-4 border border-red-200">
                                        <div className="font-semibold text-red-900 mb-1 text-sm">{n}. {m}</div>
                                        <p className="text-xs text-red-800 leading-relaxed">{d}</p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">FAQ: Saskatchewan Business Grants 2026</h2>
                            <div className="space-y-4">
                                {[
                                    { q: "What is the Saskatchewan Technology Startup Incentive and how does it work?", a: "STSI provides eligible individual investors with a 45% non-refundable SK provincial tax credit on investments in qualifying early-stage tech startups registered and primarily operating in Saskatchewan. The startup must obtain STSI certification from Innovation Saskatchewan before investor funds are committed. Once certified, the startup issues certificates to investors who claim the 45% credit on their SK provincial tax return. Investment limit: up to $1M per investor per year. Hold period: at least 5 years. This is Canada&apos;s highest angel investor provincial tax credit and makes SK competitive with much larger tech ecosystems for attracting angel capital." },
                                    { q: "Are there Saskatchewan grants for agricultural technology companies?", a: "Yes — SK&apos;s agri-tech sector is one of the most funded in Canada relative to population. Innovation Saskatchewan&apos;s Product2Market program (P2M) supports agri-tech commercialization. Federal AgriInnovate program (Agriculture and Agri-Food Canada) provides $25K–$5M+ for agricultural innovation. AAFC&apos;s AgriScience clusters in SK provide funding for grain, oilseed, and specialty crop tech. The Global Institute for Food Security in Saskatoon provides research partnerships. SK agri-tech companies can stack STSI (for investor attraction) + P2M + AgriInnovate + PrairiesCan on the same company growth trajectory." },
                                    { q: "Does Innovation Saskatchewan administer grants beyond STSI?", a: "Yes — Innovation Saskatchewan administers several programs beyond STSI: the Technology Commercialization Program (TCP) for early-stage tech companies; Product2Market (P2M) for commercialization funding; and advisory support through the Sk Startup Ecosystem. Innovation Saskatchewan also works with NRC-IRAP to match SK companies with IRAP advisors. SK technology companies should establish a relationship with Innovation Saskatchewan before applying to any provincial program — IS representatives provide guidance on optimal program sequencing and application strategy." },
                                    { q: "What is the PrairiesCan mandate specific to Saskatchewan?", a: "PrairiesCan (Prairies Economic Development Canada) serves Manitoba, Saskatchewan, and Alberta from offices in Saskatoon and Regina for SK-focused work. PrairiesCan Business Scale-Up & Productivity contributions ($50K–$10M) are available for high-growth SK companies in advanced manufacturing, food processing, ICT, and clean technology. Unique SK focus: PrairiesCan specifically prioritizes agricultural diversification (value-added processing beyond grain commodity sales) and potash/mining technology diversification — reflecting SK&apos;s economic base. Applications that align with these provincial economic development priorities score highest in PrairiesCan review." },
                                    { q: "Are there Saskatchewan grants for oil and gas or potash companies?", a: "Direct government grants for conventional oil and gas extraction in SK are limited — the risk/return for resource companies is typically handled through market mechanisms and federal royalty structures. However, SK resource technology companies doing R&D in enhanced recovery, process efficiency, or environmental technology can access SR&ED (federal), PrairiesCan, and Innovation Saskatchewan programs. The Potash Innovation Challenge and associated programs support potash industry technology development. Clean technology applications within resource extraction (emissions reduction, water treatment) are more fundable than conventional extraction operations." },
                                    { q: "Can Saskatchewan based non-profits access business grants?", a: "SK non-profits and social enterprises have access to specific programs: the Community Initiatives Fund (CIF) provides grants to SK non-profits for community projects; the SK Lotteries Trust Fund for Community Sport, Culture &amp; Recreation supports community organizations; CreativeSask provides grants for SK artists and cultural organizations; federal NHCCF grants are accessible for health-focused non-profits; and Community Futures in rural SK provide financing for non-profit social enterprises. For-profit social enterprises that meet standard business eligibility can access STSI, PrairiesCan, and Innovation Saskatchewan programs like conventional tech businesses." },
                                    { q: "What is the Product2Market (P2M) program?", a: "Product2Market (P2M) is Innovation Saskatchewan&apos;s commercialization grant program providing $10K–$100K to early-stage SK technology companies developing and commercializing innovative products. Eligible costs: prototype development, beta testing, market validation, regulatory approval, commercialization marketing. Applications are reviewed bi-annually — typically in spring and fall. P2M is specifically designed for the gap between early R&D (often IRAP-funded) and market entry (often PrairiesCan-funded) — it bridges the commercialization valley of death for SK tech companies. Priority is given to SK-headquartered companies with protectable IP." },
                                    { q: "How does Saskatchewan compare to Alberta for business grants?", a: "Saskatchewan and Alberta have different grant ecosystems: Alberta has much larger provincial programs (Calgary and Edmonton are major cities with $500M+ in provincial innovation funding) but correspondingly higher competition. Saskatchewan&apos;s STSI (45% angel credit) is more generous than Alberta&apos;s ATB Investor Incentive programs. PrairiesCan serves both provinces from a combined budget, meaning SK businesses compete with AB businesses for some federal funds. For companies that can choose between provinces: SK offers better entrepreneur investment incentives (STSI); AB offers larger provincial program funds and bigger market access. Many Prairie companies incorporate in both provinces." },
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
                            title="Get Saskatchewan Grant Updates"
                            description="Stay informed about new Saskatchewan business grants and funding opportunities"
                        />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
