import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { GrantComparisonTable } from "@/components/grant-comparison-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DollarSign, CheckCircle, ArrowRight, Lightbulb, FileText, Star, Wheat } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import type { Grant } from "@/lib/grants-data"
import ShortAnswerBox from "@/components/blog/ShortAnswerBox"
import EEATBadge from "@/components/blog/EEATBadge"
import EligibleCheck from "@/components/blog/EligibleCheck"

export const metadata: Metadata = {
    title: "Agriculture Startup Funding Canada 2026 | $3B+ Agri-Food & AgTech Grants Guide",
    description:
        "Complete guide to agriculture startup funding in Canada 2026. AgriInnovate ($10M), Agricultural Clean Technology Program ($2M), AgriScience, AAFC programs, and provincial agri-food grants covering 50% of project costs. For farms, agribusinesses, and AgTech startups.",
    keywords:
        "agriculture startup funding Canada 2026, AgriInnovate grants, Canadian Agricultural Partnership, agri-food grants Canada, AgTech grants Canada, farm grants Canada, AAFC funding, agricultural clean technology program Canada",
    openGraph: {
        title: "Agriculture Startup Funding Canada 2026 | $3B+ AgTech & Farm Grants",
        description: "Find Canada's top agriculture grants for farms, agribusinesses, and AgTech startups — AgriInnovate, Clean Tech, provincial programs.",
        url: "https://www.fsidigital.ca/canada/agriculture-startup-funding",
    },
}

const agriGrants: Grant[] = [
    {
        id: "agri-innovate",
        name: "AgriInnovate Program",
        fundingMin: 1000000,
        fundingMax: 10000000,
        eligibility: ["For-profit agri-food businesses", "Companies commercializing innovative agri-food technologies", "Processors, biotechs, and farm equipment manufacturers"],
        deadline: "Continuous intake",
        applicationLink: "https://agriculture.canada.ca/en/agricultural-programs-and-services/agriinnovate-program",
        description: "Repayable contributions for later-stage (TRL 7+) commercialization of innovative agri-food products, technologies, or processes that have commercial potential.",
        country: "Canada",
        region: "Federal",
        category: "AgriTech Commercialization",
        agency: "Agriculture and Agri-Food Canada (AAFC)",
        status: "Active",
        tags: ["Commercialization", "AgTech", "Food Processing"],
        requirements: ["Registered Canadian company", "Commercial-stage technology (TRL 7+)", "Repayable at 0% interest", "50% matching contribution"],
        lastUpdated: "2026-01-01"
    },
    {
        id: "agri-science",
        name: "AgriScience Program",
        fundingMin: 50000,
        fundingMax: 5000000,
        eligibility: ["Industry-led research clusters", "Academic-industry partnerships in agri-food", "Producer organizations funding crop/livestock research"],
        deadline: "Cluster: 5-year, ongoing; Projects: intake-based",
        applicationLink: "https://agriculture.canada.ca/en/agricultural-programs-and-services/agriscience-program",
        description: "Funds pre-commercial R&D in agriculture — both industry clusters (large consortiums) and individual projects (company-level R&D with academic partnership).",
        country: "Canada",
        region: "Federal",
        category: "Agricultural R&D",
        agency: "Agriculture and Agri-Food Canada",
        status: "Active",
        tags: ["R&D", "Cluster", "Crop Science", "Livestock"],
        requirements: ["Canadian agri-food sector entity", "Industry co-investment (50%)", "Scientific merit", "Pre-commercial scope"],
        lastUpdated: "2026-01-01"
    },
    {
        id: "agri-clean-tech",
        name: "Agricultural Clean Technology Program (ACT)",
        fundingMin: 25000,
        fundingMax: 2000000,
        eligibility: ["Canadian farmers and producer groups", "Agri-food businesses adopting clean tech", "Indigenous agricultural businesses"],
        deadline: "Stream 1: Research & Innovation — closed. Stream 2: Adoption — periodic intakes",
        applicationLink: "https://agriculture.canada.ca/en/agricultural-programs-and-services/agricultural-clean-technology-program",
        description: "Funds adoption of precision agriculture technologies, electrification, renewable energy, and efficiency upgrades to reduce GHG emissions in Canadian agriculture.",
        country: "Canada",
        region: "Federal",
        category: "Clean Agriculture",
        agency: "Agriculture and Agri-Food Canada",
        status: "Active",
        tags: ["Clean Tech", "Emissions Reduction", "Precision Agriculture"],
        requirements: ["Demonstrated GHG reduction", "50% cost-sharing", "Farm or agri-food business", "Clean technology adoption (not R&D)"],
        lastUpdated: "2026-01-01"
    },
    {
        id: "agri-cap",
        name: "Canadian Agricultural Partnership (CAP)",
        fundingMin: 10000,
        fundingMax: 500000,
        eligibility: ["All Canadian agricultural producers and businesses", "Producer organizations", "Agri-food processors"],
        deadline: "Delivered through provinces/territories — check your provincial agriculture ministry",
        applicationLink: "https://agriculture.canada.ca/en/agricultural-programs-and-services/canadian-agricultural-partnership",
        description: "The $3B federal-provincial cost-shared framework that delivers hundreds of targeted agri-food programs across all provinces. Programs vary significantly by province.",
        country: "Canada",
        region: "Federal-Provincial",
        category: "Agri-Food General",
        agency: "AAFC + Provincial Agriculture Ministries",
        status: "Active",
        tags: ["Federal-Provincial", "Farm Programs", "Diversified Funding"],
        requirements: ["Varies by province and sub-program", "Generally: Canadian farm or agri-food business", "Verified gross farm revenue"],
        lastUpdated: "2026-01-01"
    },
    {
        id: "agri-irap",
        name: "IRAP for AgTech Startups",
        fundingMin: 50000,
        fundingMax: 500000,
        eligibility: ["AgTech software and hardware startups", "Precision agriculture companies", "Farm management, sensing, AI for agriculture"],
        deadline: "Rolling — contact NRC-IRAP",
        applicationLink: "https://nrc.canada.ca/en/support-technology-innovation/nrc-irap",
        description: "NRC's IRAP is increasingly funding AgTech companies developing AI, IoT, robotics, and data platforms for the agriculture sector.",
        country: "Canada",
        region: "Federal",
        category: "AgTech",
        agency: "National Research Council of Canada",
        status: "Active",
        tags: ["AgTech", "AI", "Precision Agriculture", "IoT"],
        requirements: ["Canadian-incorporated SME", "<500 employees", "Technology development (not adoption)", "Assigned NRC-IRAP advisor"],
        lastUpdated: "2026-01-01"
    },
]

export default function AgricultureStartupFundingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-amber-50">
            <Header />

            <section className="bg-gradient-to-br from-amber-700 via-yellow-800 to-orange-900 text-white py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="flex items-center justify-center gap-2 mb-6">
                            <Wheat className="h-6 w-6 text-yellow-300" />
                            <Badge className="bg-amber-500/30 text-amber-100 border-amber-400">Canada Agri-Food & AgTech Funding 2026</Badge>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Agriculture Startup Funding Canada 2026</h1>
                        <p className="text-xl text-amber-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                            Canada's $3B+ agri-food funding ecosystem supports farms, food processors, and AgTech startups.
                            From AgriInnovate ($10M for commercialization) to the Agricultural Clean Technology Program ($2M for
                            precision agriculture), Canada offers unmatched non-dilutive support for the entire food value chain.
                        </p>
                        <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
                            <div className="bg-white/10 rounded-xl p-4"><div className="text-3xl font-bold">$3B+</div><div className="text-amber-200 text-sm mt-1">CAP over 5 years</div></div>
                            <div className="bg-white/10 rounded-xl p-4"><div className="text-3xl font-bold">$10M</div><div className="text-amber-200 text-sm mt-1">Max AgriInnovate award</div></div>
                            <div className="bg-white/10 rounded-xl p-4"><div className="text-3xl font-bold">50%</div><div className="text-amber-200 text-sm mt-1">Cost-share on most programs</div></div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-6 bg-emerald-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto space-y-4">
                        <ShortAnswerBox content="Yes — Canadian agriculture businesses can access AgriInnovate (up to $10M for commercialization), Agricultural Clean Technology Program ($25K–$2M for clean tech adoption), AgriScience ($50K–$5M for R&D), and the Canadian Agricultural Partnership ($3B+ over 5 years delivered provincially). AgTech startups also qualify for IRAP (up to $500K) and SR&ED tax credits on R&D activities. Most programs require 50% cost-sharing." />
                        <EEATBadge authorName="Ashwani K." authorImage="/ash-author-1.jpg" date="2026-03-01" />
                        <EligibleCheck />
                    </div>
                </div>
            </section>

            <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">

                    <div className="flex flex-wrap gap-2 mb-10">
                        {["AgriInnovate", "CAP Program", "AgTech Grants", "Farm Grants", "How to Apply", "FAQ"].map((item) => (
                            <Badge key={item} variant="outline" className="cursor-pointer hover:bg-amber-50 px-3 py-1.5 text-sm">{item}</Badge>
                        ))}
                    </div>

                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Canada Agriculture Grant Programs Comparison 2026</h2>
                        <GrantComparisonTable grants={agriGrants} title="Agriculture Grants Comparison" />
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8 mb-12">
                        <div className="lg:col-span-2 space-y-10">

                            <Card>
                                <CardHeader><CardTitle className="text-xl flex items-center gap-2"><Wheat className="h-5 w-5 text-amber-600" />Canada's Agri-Food Funding Landscape 2026</CardTitle></CardHeader>
                                <CardContent className="text-gray-700 prose max-w-none">
                                    <p className="leading-relaxed mb-4">Canada's agriculture funding is structured around three distinct needs: (1) <strong>early-stage R&D</strong> for companies developing new agriculture technologies (IRAP, AgriScience Projects); (2) <strong>demonstration and commercialization</strong> for companies bringing proven technology to market (AgriInnovate, SDTC); and (3) <strong>adoption</strong> for farms and agribusinesses implementing existing clean technologies (ACT, CAP provincial programs).</p>
                                    <p className="leading-relaxed mb-4">The <strong>Canadian Agricultural Partnership (CAP)</strong> is the largest umbrella — $3B over 5 years, delivered jointly by AAFC and provincial agriculture ministries. Each province administers its own programs under CAP with locally relevant priorities: Ontario focuses heavily on food processing and innovation; Saskatchewan on crop science; Alberta on energy efficiency and diversification; Quebec on dairy, maple, and food sovereignty.</p>
                                    <p className="leading-relaxed">For AgTech startups specifically, <strong>IRAP and SR&ED are the core starting points</strong>. IRAP funds the R&D wages (salary costs for engineers, data scientists, agronomists) while SR&ED recaptures 35% of remaining eligible R&D expenses. Once you have a demonstrated product, AgriInnovate's repayable contributions provide large-scale commercialization capital at 0% interest.</p>
                                </CardContent>
                            </Card>

                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Canada Agriculture Grant Programs Explained</h2>
                                <div className="space-y-6">

                                    <Card className="border-l-4 border-l-amber-500">
                                        <CardHeader>
                                            <div className="flex items-start justify-between">
                                                <CardTitle className="text-lg">1. AgriInnovate — Commercialization at Scale</CardTitle>
                                                <Badge className="bg-amber-100 text-amber-800 shrink-0 ml-2">Up to $10M</Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="text-gray-700 space-y-3">
                                            <p>AgriInnovate provides repayable contributions (0% interest, 10-year repayment) for agri-food companies at commercialization stage (TRL 7+). Unlike grants, this is essentially a government loan with no interest — highly attractive for companies with revenue potential.</p>
                                            <div className="grid sm:grid-cols-2 gap-4">
                                                <div className="bg-amber-50 rounded-lg p-3 text-sm"><div className="font-semibold text-amber-900 mb-1">Ideal Applicants</div><div className="text-amber-700">Food processors, biotech companies with proven ag products, farm equipment innovators, precision agriculture scale-up</div></div>
                                                <div className="bg-gray-50 rounded-lg p-3 text-sm"><div className="font-semibold text-gray-900 mb-1">Key Requirement</div><div className="text-gray-700">50% matching from other sources (equity, other grants, company revenue). Repaid at 0% over 10 years after commercialization.</div></div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="border-l-4 border-l-green-500">
                                        <CardHeader>
                                            <div className="flex items-start justify-between">
                                                <CardTitle className="text-lg">2. Agricultural Clean Technology (ACT) Program</CardTitle>
                                                <Badge className="bg-green-100 text-green-800 shrink-0 ml-2">Up to $2M</Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="text-gray-700 space-y-3">
                                            <p>ACT's Adoption stream funds Canadian farms and agri-businesses buying and implementing clean technologies — precision agriculture systems, electrification, renewable energy, low-emission fertilizers, and automation.</p>
                                            <ul className="space-y-2 text-sm">
                                                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" /><span>Precision irrigation and variable rate application systems</span></li>
                                                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" /><span>Electric or hybrid farm equipment and machinery</span></li>
                                                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" /><span>On-farm renewable energy (solar, biogas, wind)</span></li>
                                                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" /><span>Enhanced efficiency fertilizers and nutrient management</span></li>
                                            </ul>
                                        </CardContent>
                                    </Card>

                                    <Card className="border-l-4 border-l-blue-500">
                                        <CardHeader>
                                            <div className="flex items-start justify-between">
                                                <CardTitle className="text-lg">3. CAP — Provincial Agriculture Programs</CardTitle>
                                                <Badge className="bg-blue-100 text-blue-800 shrink-0 ml-2">$3B over 5 years</Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="text-gray-700 space-y-3">
                                            <p>CAP is a federal-provincial cost-sharing framework. AAFC provides the funding envelope; provinces design and deliver programs matching their regional priorities. Every Canadian province has unique CAP programs. Key provincial contacts:</p>
                                            <div className="grid sm:grid-cols-2 gap-3 text-sm">
                                                {[
                                                    ["Ontario", "OMAFRA (omafra.gov.on.ca)"],
                                                    ["Alberta", "Alberta Agriculture (alberta.ca/agriculture)"],
                                                    ["Saskatchewan", "Sask. Agriculture (saskatchewan.ca/agriculture)"],
                                                    ["Quebec", "MAPAQ (mapaq.gouv.qc.ca)"],
                                                    ["BC", "BC Agriculture (gov.bc.ca/agriculture)"],
                                                    ["Manitoba", "Manitoba Ag (gov.mb.ca/agriculture)"],
                                                ].map(([prov, contact]) => (
                                                    <div key={prov} className="bg-blue-50 rounded p-2">
                                                        <div className="font-semibold text-blue-900">{prov}</div>
                                                        <div className="text-blue-700 text-xs">{contact}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>

                                </div>
                            </div>

                            {/* How to Apply */}
                            <Card>
                                <CardHeader><CardTitle className="text-xl flex items-center gap-2"><FileText className="h-5 w-5 text-amber-600" />How to Apply for Canada Agriculture Grants</CardTitle></CardHeader>
                                <CardContent className="text-gray-700">
                                    <div className="space-y-4">
                                        {[
                                            { step: "1", title: "Start with Your Provincial CAP Programs", desc: "Contact your provincial agriculture ministry — they administer the most accessible programs for farms and agri-food businesses. Ontario's OMAFRA, Alberta Agriculture, and Quebec's MAPAQ each have program specialists who can walk you through available funding in 30 minutes." },
                                            { step: "2", title: "Determine TRL for Federal Programs", desc: "Federal AAFC programs are TRL-gated: AgriScience (TRL 3–6), AgriInnovate (TRL 7–9). Determine where your technology sits before applying. Applying to the wrong stage is the primary rejection reason." },
                                            { step: "3", title: "Contact an NRC-IRAP Advisor for AgTech R&D", desc: "If you're an AgTech startup (software, sensors, AI, robotics), engage an NRC-IRAP advisor immediately. They assess your project, help structure your R&D plan, and submit the application on your behalf. Free service." },
                                            { step: "4", title: "Prepare Your GHG Reduction Quantification (for ACT)", desc: "ACT applications require quantified GHG emissions reductions. Use AAFC's Cleantech Assessment Tool or hire an agrologist or environmental consultant to run the numbers. Proposals with specific, measurable emission reduction targets score significantly higher." },
                                            { step: "5", title: "Build a 50% Match Plan Before Applying", desc: "Most AAFC programs require 50% cost-sharing. Your matching sources can include: provincial CAP funding, IRAP, SR&ED refund, private equity, or company revenues. Plan your complete funding stack before applying to any individual program." },
                                        ].map((item) => (
                                            <div key={item.step} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                                                <div className="h-8 w-8 rounded-full bg-amber-600 text-white flex items-center justify-center text-sm font-bold shrink-0">{item.step}</div>
                                                <div><div className="font-semibold text-gray-900 mb-1">{item.title}</div><div className="text-sm text-gray-600">{item.desc}</div></div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Expert Tips */}
                            <Card className="border-amber-200 bg-amber-50">
                                <CardHeader><CardTitle className="text-xl flex items-center gap-2 text-amber-800"><Lightbulb className="h-5 w-5 text-amber-600" />Expert Strategy: Canada Agri-Food Funding</CardTitle></CardHeader>
                                <CardContent className="text-amber-900 space-y-4">
                                    <div className="bg-white rounded-lg p-4 border border-amber-200">
                                        <div className="font-semibold mb-2">💡 AgriInnovate + IRAP Is the AgTech Growth Stack</div>
                                        <p className="text-sm">Win IRAP funding for R&D (up to $500K) → demonstrate your product → apply to AgriInnovate for $1M–$5M commercialization capital. This is the exact pathway AAFC's ecosystem is designed to support. AgriInnovate program officers look favorably on companies with a prior IRAP track record.</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 border border-amber-200">
                                        <div className="font-semibold mb-2">💡 Stack CAP + Federal ACT for Clean Technology Adoption</div>
                                        <p className="text-sm">For farms adopting clean technology, the stack is: 50% from Federal ACT + 25% from provincial CAP program + 25% farm contribution. This means a $500K precision agriculture implementation effectively costs the farm $125K with $375K in government support. Contact your provincial ministry and AAFC regional office simultaneously.</p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* FAQ */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">FAQ: Canada Agriculture Startup Funding</h2>
                                <div className="space-y-4">
                                    {[
                                        { q: "Can a new farm or agri-food startup access government grants?", a: "Yes, but startup eligibility varies by program. CAP provincial programs typically require 1–2 years of farm revenue. AgriInnovate requires a commercially-viable product (TRL 7+), which takes time to develop. For brand-new ag startups, the best starting points are: IRAP (for tech development, no revenue required), SR&ED (for R&D expenses from day 1), and provincial new entrant farmer programs (available in most provinces)." },
                                        { q: "Is the AgriInnovate contribution a grant or a loan?", a: "AgriInnovate provides a repayable contribution — not a grant. You don't pay interest (0% rate), but you repay the government's contribution as your commercialized product generates revenue. Repayment schedules are negotiated based on your business plan. This is actually advantageous: it's far larger than typical grants ($10M vs. $500K for most grants) and preserves your equity." },
                                        { q: "Can AgTech software companies access the same programs as farms?", a: "Yes — though they access different streams. AgTech software companies (precision ag platforms, farm management software, agricultural AI) access IRAP, SR&ED, and AgriScience Projects as technology developers. They are not eligible for ACT (adoption program) unless they're implementing, not developing, clean technology. The Agri-food Innovation Council (AIC) is a good resource for AgTech companies mapping out their federal funding pathway." },
                                        { q: "How do I find provincial CAP programs in my province?", a: "Every provincial agriculture ministry administers CAP programs with different names and priorities. Search '[Your Province] agricultural programs 2026' or call your provincial agriculture ministry directly: Ontario OMAFRA: 1-877-424-1300; Alberta Agriculture: 310-FARM (3276); Saskatchewan Agriculture: 1-866-457-2377; Quebec MAPAQ: 1-888-222-6272; BC Agriculture: 250-387-5121." },
                                    ].map((item, i) => (
                                        <Card key={i}><CardContent className="pt-4">
                                            <div className="font-semibold text-gray-900 mb-2">{item.q}</div>
                                            <div className="text-gray-600 text-sm leading-relaxed">{item.a}</div>
                                        </CardContent></Card>
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            <Card className="bg-amber-700 text-white">
                                <CardContent className="pt-6">
                                    <Star className="h-8 w-8 text-yellow-300 mb-3" />
                                    <h3 className="font-bold text-lg mb-2">Free Agri Grant Matching</h3>
                                    <p className="text-amber-100 text-sm mb-4">Our agriculture specialists find the right combination of federal and provincial programs for your farm or AgTech company.</p>
                                    <Link href="/contact"><Button className="w-full bg-white text-amber-700 hover:bg-amber-50">Get Free Matching <ArrowRight className="h-4 w-4 ml-1" /></Button></Link>
                                </CardContent>
                            </Card>
                            <NewsletterSignup variant="sidebar" />
                            <Card>
                                <CardHeader><CardTitle className="text-lg">Related Programs</CardTitle></CardHeader>
                                <CardContent>
                                    <div className="space-y-2 text-sm">
                                        <Link href="/canada/government-grants" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> Federal Canadian Grants</Link>
                                        <Link href="/canada/indigenous-entrepreneur-grants" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> Indigenous Agriculture Grants</Link>
                                        <Link href="/blog/irap-nrc-canada-guide" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> IRAP Complete Guide</Link>
                                        <Link href="/grant-finder" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> AI Grant Finder</Link>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    <div className="mb-8">
                        <NewsletterSignup title="Get Canada Agriculture Grant Updates" description="Track AgriInnovate intakes, ACT program openings, CAP updates, and provincial agri-food grant cycles." />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
