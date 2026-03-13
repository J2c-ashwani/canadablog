import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { GrantComparisonTable } from "@/components/grant-comparison-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Wheat, CheckCircle, ArrowRight, Building, Lightbulb, FileText, AlertCircle, Star } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import type { Grant } from "@/lib/grants-data"
import ShortAnswerBox from "@/components/blog/ShortAnswerBox"
import EEATBadge from "@/components/blog/EEATBadge"
import EligibleCheck from "@/components/blog/EligibleCheck"

export const metadata: Metadata = {
    title: "Canada Agriculture Startup Funding 2026 | AgriInnovate, CAP & AgTech Grant Guide",
    description: "Complete guide to Canada agriculture startup funding 2026. AgriInnovate Program grants ($1M–$10M), Agricultural Clean Technology Program, Canadian Agricultural Partnership CAP, AAFC programs, and provincial agriculture grants for AgTech startups and farm businesses.",
    keywords: "Canada agriculture startup grants 2026, AgriInnovate funding, agricultural clean technology Canada, CAP grants Canada, AAFC agriculture funding, AgTech grants Canada, farm startup grants Canada, food innovation grants Canada, precision agriculture grants",
    alternates: { canonical: "https://www.fsidigital.ca/canada/agriculture-startup-funding" },
    openGraph: { title: "Canada Agriculture Startup Funding 2026 | AgriInnovate, CAP & AgTech Guide", description: "Discover Canadian agriculture and AgTech funding — AgriInnovate, ACT Program, Canadian Agricultural Partnership, and provincial farm grants for 2026.", url: "https://www.fsidigital.ca/canada/agriculture-startup-funding" },
}

const agGrants: Grant[] = [
    { id: "ca-agriinnovate", name: "AgriInnovate Program", fundingMin: 1000000, fundingMax: 10000000, eligibility: ["Canadian agri-food companies", "Technology or process innovations with commercial potential", "Companies at demonstration or commercialization stage"], deadline: "Rolling intake — AAFC.ca/AgriInnovate", applicationLink: "https://agriculture.canada.ca/en/department/programs/agriinnovate-program", description: "Repayable loans of $1M–$10M for Canadian agri-food businesses implementing or demonstrating innovative technologies, processes, or products with commercial potential in the agriculture or food sector.", country: "Canada", region: "Federal", category: "Innovation Financing", agency: "Agriculture and Agri-Food Canada (AAFC)", status: "Active", tags: ["AgTech", "Repayable Loan", "Commercialization", "Food Innovation"], requirements: ["Canadian business", "Agriculture or food sector", "Commercial-stage innovation", "Financial viability demonstrated"], lastUpdated: "2026-01-01" },
    { id: "ca-act", name: "Agricultural Clean Technology Program (ACT)", fundingMin: 25000, fundingMax: 2000000, eligibility: ["Canadian agricultural producers and agri-businesses", "Projects reducing GHG emissions or improving environmental outcomes", "Both farm-level and supplier/manufacturer applicants"], deadline: "Two streams — adoption and R&D intake cycles at AAFC", applicationLink: "https://agriculture.canada.ca/en/department/programs/agricultural-clean-technology-program", description: "Non-repayable grants for clean technology adoption on farms ($25K–$2M) and clean agri-technology R&D and demonstrations ($100K–$2M). Covers precision agriculture, bioenergy, and emission-reducing farm equipment.", country: "Canada", region: "Federal", category: "Clean Agriculture", agency: "Agriculture and Agri-Food Canada", status: "Active", tags: ["Clean Tech", "Non-Repayable Grant", "Farm", "Precision Ag"], requirements: ["Canadian agricultural producer or business", "Climate-positive technology", "Demonstrated GHG reduction potential", "Mixed-use projects with environmental benefit"], lastUpdated: "2026-01-01" },
    { id: "ca-cap", name: "Canadian Agricultural Partnership (CAP)", fundingMin: 5000, fundingMax: 500000, eligibility: ["Canadian farmers and agricultural businesses by province", "Varies significantly by province — each has unique streams"], deadline: "Provincial delivery — varies by province and stream", applicationLink: "https://agriculture.canada.ca/en/department/programs/canadian-agricultural-partnership", description: "Federal-provincial cost-share program funding farm business development, innovation, market development, and sustainability initiatives. Delivered by provinces with different priorities per jurisdiction.", country: "Canada", region: "Federal-Provincial", category: "Business Development", agency: "AAFC + Provincial Governments", status: "Active", tags: ["Farm", "Business Development", "Cost-Share", "Provincial"], requirements: ["Canadian agricultural producer", "Province-specific eligibility", "Application through provincial agriculture ministry"], lastUpdated: "2026-01-01" },
    { id: "ca-irap-agtech", name: "IRAP AgTech / Food Innovation Stream", fundingMin: 50000, fundingMax: 2000000, eligibility: ["Canadian AgTech SMEs (not farm operations)", "Companies developing agricultural technology products", "Software, sensors, equipment, biotech for agriculture"], deadline: "Rolling — contact NRC ITA advisor in your region", applicationLink: "https://nrc.canada.ca/en/support-technology-innovation/nrc-industrial-research-assistance-program", description: "NRC IRAP R&D funding for AgTech companies developing precision agriculture software, agricultural sensors/IoT, crop protection products, vertical farming technology, or novel food processing innovations.", country: "Canada", region: "Federal", category: "R&D", agency: "National Research Council — IRAP", status: "Active", tags: ["IRAP", "AgTech", "R&D", "Precision Agriculture"], requirements: ["Canadian SME (<500 employees)", "Agricultural technology product development", "ITA advisor relationship", "Commercial agricultural market"], lastUpdated: "2026-01-01" },
    { id: "ca-cfia-innovation", name: "AAFC Science & Innovation Clusters", fundingMin: 100000, fundingMax: 3000000, eligibility: ["Researcher-industry partnerships in agriculture", "Canadian universities, RDCs, agriculture companies", "Commodity-specific research with commercial focus"], deadline: "Annual call — through AAFC's AgriScience program", applicationLink: "https://agriculture.canada.ca/en/department/programs/agriscience-program", description: "AgriScience Program funding for industry-academic research collaborations addressing production, processing, or value-added opportunities in Canadian agriculture commodity sectors.", country: "Canada", region: "Federal", category: "Research", agency: "AAFC — AgriScience Program", status: "Active", tags: ["Research", "Academic Partnership", "Commodity", "Industry Collaboration"], requirements: ["Canadian research institution lead", "Industry partner co-investment", "Commodity science focus", "Multi-year project timeline"], lastUpdated: "2026-01-01" },
]

export default function AgricultureStartupFundingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-lime-50">
            <Header />

            <section className="bg-gradient-to-br from-lime-700 via-green-800 to-emerald-900 text-white py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="flex items-center justify-center gap-2 mb-6">
                            <Wheat className="h-6 w-6 text-lime-300" />
                            <Badge className="bg-lime-500/30 text-lime-100 border-lime-400">Canada Agriculture & AgTech Funding 2026</Badge>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Canada Agriculture Startup Funding 2026</h1>
                        <p className="text-xl text-lime-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                            Canada's agricultural innovation ecosystem supports both AgTech startups and farm businesses through
                            a multi-billion dollar annual funding portfolio. The AgriInnovate Program provides $1M–$10M in repayable
                            loans for large-scale agriculture commercialization. The Agricultural Clean Technology Program offers
                            non-repayable grants for farms adopting precision ag and emission-reducing technology. The Canadian
                            Agricultural Partnership delivers $3B over 5 years in provincial cost-share funding for farm business
                            development and sustainability. And NRC IRAP specifically funds AgTech SMEs developing precision
                            agriculture software, sensors, and novel crop protection products. This guide explains every major
                            program, distinguishes clearly between farm-level programs and AgTech startup programs, and provides
                            a step-by-step funding strategy for both types of organizations.
                        </p>
                        <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
                            <div className="bg-white/10 rounded-xl p-4"><div className="text-3xl font-bold">$3B</div><div className="text-lime-200 text-sm mt-1">CAP 5-year commitment</div></div>
                            <div className="bg-white/10 rounded-xl p-4"><div className="text-3xl font-bold">$10M</div><div className="text-lime-200 text-sm mt-1">AgriInnovate max award</div></div>
                            <div className="bg-white/10 rounded-xl p-4"><div className="text-3xl font-bold">$2M</div><div className="text-lime-200 text-sm mt-1">ACT max non-repayable grant</div></div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-6 bg-emerald-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto space-y-4">
                        <ShortAnswerBox content="Yes — Canada offers agriculture funding through two distinct tracks. Farm businesses can access the Agricultural Clean Technology Program (non-repayable $25K–$2M for emission-reducing farm technology), CAP provincial cost-share programs ($5K–$500K), and AgriInnovate repayable loans ($1M–$10M). AgTech startups (companies developing agricultural technology products) can access NRC IRAP ($50K–$2M), SR&ED (35% R&D credit), AAFC AgriScience research partnerships, and all mainstream Canadian innovation programs." />
                        <EEATBadge authorName="Ashwani K." authorImage="/author-ashwani.jpg" date="2026-03-01" />
                        <EligibleCheck />
                    </div>
                </div>
            </section>

            <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">

                    <div className="flex flex-wrap gap-2 mb-10">
                        {["AgriInnovate", "ACT Grants", "CAP Provincial", "IRAP AgTech", "Farm vs AgTech", "FAQ"].map((item) => (
                            <Badge key={item} variant="outline" className="cursor-pointer hover:bg-lime-50 px-3 py-1.5 text-sm">{item}</Badge>
                        ))}
                    </div>

                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Canada Agriculture Grant Programs — Quick Comparison 2026</h2>
                        <p className="text-gray-600 mb-6">Compare farm-level programs (ACT, CAP) with AgTech startup programs (IRAP, SDTC). These serve different organizations with different eligibility criteria — make sure you are applying to programs designed for your business type.</p>
                        <GrantComparisonTable grants={agGrants} title="Canada Agriculture Funding Comparison" />
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8 mb-12">
                        <div className="lg:col-span-2 space-y-10">

                            <Card>
                                <CardHeader><CardTitle className="text-xl flex items-center gap-2"><Building className="h-5 w-5 text-lime-600" />Canada Agriculture Funding — The Critical Farm vs. AgTech Distinction</CardTitle></CardHeader>
                                <CardContent className="text-gray-700 space-y-4">
                                    <p className="leading-relaxed">
                                        The single most important concept to understand about Canadian agriculture funding is the difference between
                                        programs designed for <strong>farm businesses</strong> and programs designed for <strong>AgTech startups</strong>.
                                        These two categories overlap in subject matter (both involve agricultural technology) but are funded through
                                        completely different program streams with different eligibility, different agencies, and different application
                                        processes. Applying to the wrong category for your business type is the most common and most costly mistake
                                        in Canadian ag funding.
                                    </p>
                                    <div className="grid md:grid-cols-2 gap-6 my-4">
                                        <div className="bg-lime-50 rounded-lg p-4 border border-lime-200">
                                            <div className="font-bold text-lime-900 mb-3">You Are a FARM Business If:</div>
                                            <ul className="text-sm text-lime-800 space-y-1.5">
                                                <li>• You grow crops, raise livestock, or manage agricultural land</li>
                                                <li>• Your primary revenue comes from selling agricultural commodities or processed food</li>
                                                <li>• You are adopting new technology on your own farm operations</li>
                                                <li>• You are a food processor transforming raw agricultural products</li>
                                                <li>• You are a producer-led cooperative or agricultural organization</li>
                                            </ul>
                                            <div className="mt-3 text-xs font-semibold text-lime-700">Your Programs: ACT, CAP, AgriInnovate (if commercializing), AgriScience</div>
                                        </div>
                                        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                                            <div className="font-bold text-blue-900 mb-3">You Are an AGTECH Startup If:</div>
                                            <ul className="text-sm text-blue-800 space-y-1.5">
                                                <li>• You develop and sell software, sensors, equipment, or biotech to farms</li>
                                                <li>• Your revenue comes from selling technology products to agricultural customers</li>
                                                <li>• You are not a farm operation yourself</li>
                                                <li>• You are a technology company that serves the agriculture sector</li>
                                                <li>• Your R&D creates the technology; farms adopt and benefit from it</li>
                                            </ul>
                                            <div className="mt-3 text-xs font-semibold text-blue-700">Your Programs: IRAP, SR&ED, SDTC, BDC, AgriInnovate (if at commercialization)</div>
                                        </div>
                                    </div>
                                    <p className="leading-relaxed">
                                        Many programs serve both — but with entirely different eligibility streams within the same program.
                                        AgriInnovate, for example, can fund both a farm business implementing a commercial biodigester ($1M)
                                        and an AgTech company commercializing a novel precision fermentation technology ($3M) — but the
                                        application criteria, required documentation, and review process are different for each applicant type.
                                    </p>
                                    <p className="leading-relaxed">
                                        The <strong>Canadian Agricultural Partnership (CAP)</strong> is exclusively for farm businesses and agricultural
                                        organizations — AgTech companies cannot apply as primary recipients. The <strong>NRC IRAP AgTech stream</strong> is
                                        exclusively for technology companies developing agricultural products — farm operations buying equipment for their
                                        own use do not qualify. The <strong>Agricultural Clean Technology Program</strong> has two distinct streams, one
                                        for each category. Understanding where you fit before applying saves months of misdirected effort.
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Program Deep Dives */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Agriculture Funding Programs — Detailed Breakdown</h2>
                                <p className="text-gray-600 mb-6">Complete analysis of each program — eligibility mechanics, what the money can fund, how applications are assessed, and what to submit.</p>
                                <div className="space-y-6">

                                    <Card className="border-l-4 border-l-lime-500">
                                        <CardHeader>
                                            <div className="flex items-start justify-between">
                                                <CardTitle className="text-lg">1. AgriInnovate Program — Large-Scale Agriculture Innovation Finance</CardTitle>
                                                <Badge className="bg-lime-100 text-lime-800 shrink-0 ml-2">$1M – $10M</Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="text-gray-700 space-y-4">
                                            <p>
                                                AgriInnovate is Canada's largest single agri-food innovation financing program — providing repayable loans
                                                (not grants) of $1M to $10M to Canadian agri-food businesses implementing or demonstrating innovative
                                                technologies, processes, or products. The program explicitly targets the commercialization and scaling stage:
                                                companies that have already proven their technology works (through R&D or pilot projects) and now need capital
                                                to deploy it at commercial scale. The repayable nature makes it fundamentally different from grants — you
                                                must demonstrate financial capacity to ultimately repay, but terms are significantly more favorable than
                                                commercial lenders (below-market interest rates, 5–7 year repayment periods, interest-only periods during
                                                implementation).
                                            </p>
                                            <p>
                                                AgriInnovate has funded: large-scale precision fermentation facilities for novel protein production,
                                                commercial vertical farming installations using AI-controlled growing systems, agri-food processing
                                                facilities using waste-to-value biotechnology, precision agriculture platform deployments covering
                                                100,000+ acres, and Canadian food companies commercializing novel ingredient extraction processes.
                                                The common thread is scale: projects under $1M in total cost are better served by ACT or CAP grants.
                                            </p>
                                            <div className="grid sm:grid-cols-2 gap-4 my-4">
                                                <div className="bg-lime-50 rounded-lg p-4">
                                                    <div className="font-semibold text-lime-900 mb-2 text-sm">Evaluation Criteria</div>
                                                    <ul className="text-xs text-lime-700 space-y-1">
                                                        <li>• Innovation level (truly novel vs. incremental)</li>
                                                        <li>• Commercial viability and market analysis</li>
                                                        <li>• Financial health and repayment capacity</li>
                                                        <li>• Economic impact (jobs, sector advancement)</li>
                                                        <li>• Environmental benefit (GHG, resource use)</li>
                                                    </ul>
                                                </div>
                                                <div className="bg-gray-50 rounded-lg p-4">
                                                    <div className="font-semibold text-gray-900 mb-2 text-sm">Funding Not Available For:</div>
                                                    <ul className="text-xs text-gray-600 space-y-1">
                                                        <li>• Research and development activities (use IRAP or SR&ED)</li>
                                                        <li>• Incremental upgrades to existing technology</li>
                                                        <li>• Projects under $1M total cost</li>
                                                        <li>• Non-commercial (academic) projects</li>
                                                        <li>• Agricultural land purchase</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="border-l-4 border-l-green-500">
                                        <CardHeader>
                                            <div className="flex items-start justify-between">
                                                <CardTitle className="text-lg">2. Agricultural Clean Technology (ACT) Program</CardTitle>
                                                <Badge className="bg-green-100 text-green-800 shrink-0 ml-2">$25K – $2M (non-repayable)</Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="text-gray-700 space-y-4">
                                            <p>
                                                The ACT Program is Canada's primary non-repayable grant program for agricultural clean technology —
                                                covering both (1) farm-level adoption of proven clean technologies, and (2) R&D and demonstration
                                                of new clean agri-technologies. The two streams have different eligibility and different funding levels:
                                            </p>
                                            <div className="space-y-3 my-4">
                                                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                                                    <div className="font-bold text-green-900 mb-2 text-sm">Stream 1: Adoption Stream (Farm Businesses)</div>
                                                    <p className="text-xs text-green-800 mb-2">Non-repayable grants of $25K–$2M for farms and agri-businesses adopting proven clean technology that reduces GHG emissions, improves energy efficiency, or reduces environmental impact. Covers: precision application equipment, solar systems for farm operations, biodigesters, electric farm equipment, and cover cropping / soil carbon systems. Requires 50% matching from the applicant.</p>
                                                    <div className="text-xs font-semibold text-green-700">Who applies: Farm operations, producer groups, agricultural cooperatives</div>
                                                </div>
                                                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                                                    <div className="font-bold text-blue-900 mb-2 text-sm">Stream 2: Research & Innovation Stream (AgTech Companies + Farms)</div>
                                                    <p className="text-xs text-blue-800 mb-2">Non-repayable grants of $100K–$2M for R&D and demonstration of new clean agricultural technologies that are not yet commercially proven. Covers: new precision agriculture tools, novel biostimulants, biological crop protection, methane capture systems, carbon sequestration measurement technology, and sustainable packaging innovation. Requires research partnership and 50% matching.</p>
                                                    <div className="text-xs font-semibold text-blue-700">Who applies: AgTech companies, researchers, farm businesses piloting novel technology</div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="border-l-4 border-l-blue-500">
                                        <CardHeader>
                                            <div className="flex items-start justify-between">
                                                <CardTitle className="text-lg">3. Canadian Agricultural Partnership (CAP)</CardTitle>
                                                <Badge className="bg-blue-100 text-blue-800 shrink-0 ml-2">$5K – $500K per province</Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="text-gray-700 space-y-4">
                                            <p>
                                                CAP is a 5-year, $3 billion federal-provincial cost-sharing framework that runs 2023–2028. Unlike AAFC's
                                                directly-administered programs, CAP is delivered entirely by the provinces — meaning every province has
                                                designed its own programs within the CAP framework, with different priorities, different eligibility criteria,
                                                and different application systems. <strong>You must apply through your province's ministry of agriculture,
                                                    not through AAFC directly.</strong>
                                            </p>
                                            <p>
                                                While the specific programs differ by province, most provincial CAP programs include cost-share grants
                                                covering: farm business risk management (production insurance, AgriStability), on-farm environmental
                                                stewardship (soil health, water quality), market development for agricultural products, value-added
                                                and processing innovation, agricultural labour and skills development, and technology adoption on farm.
                                            </p>
                                            <div className="grid sm:grid-cols-2 gap-4 mt-4">
                                                {[
                                                    { prov: "Ontario", note: "OMAFRA administers Ontario's CAP programs — agriculture.ontario.ca" },
                                                    { prov: "BC", note: "BC Ministry of Agriculture and Food — gov.bc.ca/agriculture" },
                                                    { prov: "Alberta", note: "Alberta Agriculture and Irrigation — agriculture.alberta.ca" },
                                                    { prov: "Saskatchewan", note: "SK Ministry of Agriculture — saskatchewan.ca/agriculture" },
                                                    { prov: "Manitoba", note: "MB Agriculture — gov.mb.ca/agriculture" },
                                                    { prov: "Quebec", note: "MAPAQ (Quebec Agriculture Ministry) — mapaq.gouv.qc.ca" },
                                                ].map(({ prov, note }) => (
                                                    <div key={prov} className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                                                        <div className="font-semibold text-blue-900 text-sm mb-1">{prov}</div>
                                                        <div className="text-xs text-blue-700">{note}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="border-l-4 border-l-purple-500">
                                        <CardHeader>
                                            <div className="flex items-start justify-between">
                                                <CardTitle className="text-lg">4. NRC IRAP for AgTech Startups</CardTitle>
                                                <Badge className="bg-purple-100 text-purple-800 shrink-0 ml-2">$50K – $2M</Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="text-gray-700 space-y-4">
                                            <p>
                                                NRC IRAP is the most appropriate first-stage funding program for AgTech startups — companies that are
                                                building technology products for the agricultural market, not farm operations themselves. IRAP covers
                                                R&D wages and sub-contractor costs for Canadian AgTech SMEs developing: precision agriculture software
                                                (field mapping, crop analytics, yield prediction), agricultural IoT sensors and drones, biological crop
                                                protection and biocontrol products, vertical farming and controlled environment agriculture systems,
                                                novel food processing and ingredient technologies, and agricultural data platforms.
                                            </p>
                                            <p>
                                                AgTech companies are particularly well-served by IRAP because most AgTech development involves genuine
                                                technological uncertainty: new sensor designs, novel machine learning models for crop disease detection,
                                                new bioprocessing approaches for alternative protein, and novel precision delivery systems for farm inputs.
                                                These are all activities where outcomes are not predetermined by standard practice — the core SR&ED and
                                                IRAP qualifying criterion.
                                            </p>
                                            <p>
                                                For AgTech companies, the IRAP + SR&ED combination is particularly powerful: IRAP funds engineer and data
                                                scientist salaries during the development year, and SR&ED provides a 35% refund on qualifying R&D spend
                                                at year-end. Together, they can recover 70–80% of your technical team's cost through the development phase,
                                                preserving equity capital for go-to-market rather than product development.
                                            </p>
                                        </CardContent>
                                    </Card>

                                </div>
                            </div>

                            {/* How to Apply */}
                            <Card>
                                <CardHeader><CardTitle className="text-xl flex items-center gap-2"><FileText className="h-5 w-5 text-lime-600" />How to Apply for Canada Agriculture Funding — Step by Step</CardTitle></CardHeader>
                                <CardContent className="text-gray-700">
                                    <div className="space-y-4">
                                        {[
                                            { step: "1", title: "Clarify: Are You a Farm Business or an AgTech Startup?", desc: "Answer this before contacting any program. Farm businesses (producing or processing agricultural commodities) should start with their provincial Ministry of Agriculture for CAP programs, then explore ACT (for clean technology adoption), and AgriInnovate (if scaling commercially). AgTech startups (developing technology products for farmers) should start with NRC IRAP and SR&ED as their base, then explore ACT Stream 2 for demonstration funding and AgriInnovate for commercialization capital. The distinction shapes every subsequent decision." },
                                            { step: "2", title: "For Farm Businesses — Contact Your Provincial Ministry First", desc: "CAP is delivered provincially, not federally. Contact your provincial ministry of agriculture — OMAFRA (Ontario), BC Ministry of Agriculture and Food, Alberta Agriculture and Irrigation, etc. Ask specifically about: (a) Which CAP programs are currently accepting applications, (b) On-farm environmental or technology adoption cost-share programs, (c) Business risk management programs (AgriStability, AgriInsurance). Provincial agricultural extension offices and local farm organizations (Farm Credit Canada advisory, Grain Growers associations) can also provide direct guidance on provincial programs." },
                                            { step: "3", title: "For AgTech Startups — Contact NRC IRAP First", desc: "Find your regional NRC IRAP Industrial Technology Advisor (ITA) at nrc.canada.ca/irap. ITAs with agricultural technology knowledge are based in major Canadian ag regions: Saskatoon, Winnipeg, Guelph, Edmonton, and Lethbridge. Request an ITA with 'precision agriculture', 'agri-food', or 'food science' specialization when contacting the regional office. Your first IRAP meeting is a free informal advisory session — no funding commitment is made, but you'll get a clear assessment of IRAP eligibility and potential funding scope within one meeting." },
                                            { step: "4", title: "File SR&ED for All Agriculture R&D Activities — From Day One", desc: "If you're an AgTech startup doing any R&D — software development, sensor design, biological product testing, novel food formulation — track SR&ED-qualifying activities from day one of your business. Agriculture R&D commonly qualifies: developing new crop yield prediction models, designing sensor hardware for soil moisture or pest detection, creating novel biological formulations, or pioneering new extraction methods for plant-based ingredients. File with every annual corporate tax return — even if your R&D spend seems small, 35% back from CRA makes a significant difference to early-stage cash flow." },
                                            { step: "5", title: "Apply for ACT Program Matching Available Round", desc: "ACT's two streams (Adoption and Research/Innovation) open on different cycles — typically one to two intakes per year. Register at agriculture.canada.ca/en/act and select your stream. Prepare a 5-page technical brief covering: the specific technology, its environmental benefit (quantify GHG reduction or resource efficiency improvement), your supporting evidence (from trials, literature, or existing installations), the project timeline and budget, and your matching funding commitment (50% required). AAFC program officers provide pre-application consultations — book these before submitting to understand evaluation priorities for the current intake." },
                                            { step: "6", title: "Consider AgriInnovate for Commercial-Scale Projects ($1M+)", desc: "If your project is at commercial scale — you've proven the technology works and need $1M+ to scale deployment — contact AAFC's AgriInnovate team directly at agriculture.canada.ca/AgriInnovate. Prepare a comprehensive business case: the commercial-scale technology description, your revenue model and market analysis, 3 years of financial statements demonstrating repayment capacity, a deployment timeline, projected economic impact (jobs, sector advancement), and your environmental benefit analysis. AgriInnovate decisions take 4–6 months from a complete application." },
                                        ].map((item) => (
                                            <div key={item.step} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                                                <div className="h-8 w-8 rounded-full bg-lime-700 text-white flex items-center justify-center text-sm font-bold shrink-0">{item.step}</div>
                                                <div><div className="font-semibold text-gray-900 mb-1">{item.title}</div><div className="text-sm text-gray-600 leading-relaxed">{item.desc}</div></div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Common Mistakes */}
                            <Card className="border-red-100 bg-red-50">
                                <CardHeader><CardTitle className="text-xl flex items-center gap-2 text-red-900"><AlertCircle className="h-5 w-5 text-red-600" />5 Costly Mistakes Canadian Agriculture Companies Make with Grants</CardTitle></CardHeader>
                                <CardContent className="text-red-900 space-y-4">
                                    {[
                                        { n: "1", m: "AgTech Startup Applying to Farm-Level Programs (and Vice Versa)", d: "This is the most common and most time-wasting mistake in Canadian ag funding. AgTech companies applying to CAP programs (designed for farm operations) and farm businesses applying to IRAP (designed for technology companies) almost always receive polite rejections explaining eligibility mismatch. Before any application, call the AAFC program line and ask directly: 'Is this program available to a company that sells agricultural technology to farmers but does not farm itself?' The answer defines whether you proceed." },
                                        { n: "2", m: "Underestimating ACT's 50% Matching Requirement", d: "The Agricultural Clean Technology Program requires applicants to contribute 50% of total project cost as matching funds. For a $500,000 ACT grant, you need $500,000 in matching contributions (cash, in-kind, or other government funding from non-federal sources — some provincial programs can count as match). Many applicants discover midway through application preparation that they cannot demonstrate adequate matching capital, forcing withdrawal. Confirm your matching capacity before investing weeks in application preparation." },
                                        { n: "3", m: "Not Applying to CAP Early Enough in the Fiscal Year", d: "Provincial CAP programs have fixed annual budgets and serve applicants on a first-qualified, first-funded basis within each fiscal year. CAP programs delivered in spring or early summer often have their annual budgets exhausted by fall, leaving late applicants to wait until the following year's budget. In every province, contact your provincial agricultural ministry in January or February of each year to understand the current year's active programs and their application timelines. Early applicants in most provinces have a 3–5x higher success rate than applicants who wait until Q3 or Q4." },
                                        { n: "4", m: "Missing SR&ED Because 'Agriculture R&D Doesn't Qualify'", d: "Many AgTech company founders believe SR&ED is only for electronics and pharmaceutical companies. This is incorrect. Agricultural R&D qualifies when it involves genuine scientific or technological uncertainty: developing plant pathogen detection algorithms, designing novel biostimulant formulation processes, solving engineering problems in autonomous vehicle navigation for field operations, or creating new controlled environment agriculture HVAC modeling. AgTech companies that do not file SR&ED are routinely leaving $100K–$500K annually in refundable credits on the table." },
                                        { n: "5", m: "Applying to AgriInnovate Without Demonstrating Repayment Capacity", d: "AgriInnovate provides repayable loans — not grants. AAFC reviews applicants' financial statements with the same rigor as a commercial lender, assessing whether your agri-food business has the revenue trajectory, margin structure, and asset base to service a $1M–$10M loan over 5–7 years. Applications from early-stage companies without demonstrated commercial traction are routinely declined in favor of businesses with 3+ years of financial history. AgTech startups at proof-of-concept stage should pursue IRAP and ACT Stream 2 first, and return to AgriInnovate once they have 2–3 years of revenue history." },
                                    ].map(({ n, m, d }) => (
                                        <div key={n} className="bg-white rounded-lg p-4 border border-red-200">
                                            <div className="font-semibold mb-2 text-red-900">{n}. {m}</div>
                                            <p className="text-sm text-red-800 leading-relaxed">{d}</p>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            {/* Expert Tips */}
                            <Card className="border-amber-200 bg-amber-50">
                                <CardHeader><CardTitle className="text-xl flex items-center gap-2 text-amber-800"><Lightbulb className="h-5 w-5 text-amber-600" />Expert Strategy: Agriculture Funding in Canada</CardTitle></CardHeader>
                                <CardContent className="text-amber-900 space-y-4">
                                    <div className="bg-white rounded-lg p-4 border border-amber-200">
                                        <div className="font-semibold mb-2">💡 AgTech Startups: IRAP + SR&ED First, Then ACT Stream 2 and AgriInnovate</div>
                                        <p className="text-sm leading-relaxed">The optimal AgTech startup sequence: IRAP ($200K–$1M for R&D wages) and SR&ED (35% refund) running continuously as a baseline → ACT Research Stream ($100K–$2M) for on-farm demonstration with a pilot customer → AgriInnovate ($1M–$5M) once commercial traction is established. This progression matches funding availability to development stage and avoids applying to programs before you&apos;re ready (AgriInnovate rejected pre-revenue companies regularly). Total non-dilutive capital over a 4-year AgTech development cycle: $2M–$5M before needing significant equity.</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 border border-amber-200">
                                        <div className="font-semibold mb-2">💡 Farm Businesses: CAP for Operations, ACT for Technology Adoption, AgriInnovate for Scale</div>
                                        <p className="text-sm leading-relaxed">Farm businesses should run three programs in parallel rather than sequentially. CAP covers ongoing operational improvements (business risk management, market development, labour) on a year-round basis. ACT covers specific clean technology adoption projects (solar installation, precision equipment, biodigester) on a project-by-project basis. AgriInnovate is for when you&apos;re commercializing a farm innovation at a scale large enough to repay a $1M+ loan. The three programs target different activities and different budgets — there is no conflict in receiving all three simultaneously.</p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* FAQ */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">FAQ: Canada Agriculture Startup Funding 2026</h2>
                                <p className="text-gray-600 mb-6">Common questions from Canadian farmers, AgTech founders, food processors, and agricultural entrepreneurs navigating federal and provincial funding.</p>
                                <div className="space-y-4">
                                    {[
                                        { q: "What is the difference between AgriInnovate and the Agricultural Clean Technology Program?", a: "AgriInnovate provides repayable loans ($1M–$10M) for large-scale commercialization and demonstration of agri-food innovations — repayment is required over 5–7 years, making it essentially below-market-rate government financing. The Agricultural Clean Technology (ACT) Program provides non-repayable grants ($25K–$2M) for either farm-level adoption of clean technology (Adoption Stream) or R&D and demonstration of new clean agri-technologies (Research Stream). In practice: use ACT for projects under $2M where you want non-repayable capital; use AgriInnovate for projects $1M–$10M where you can demonstrate financial capacity to repay but need favorable financing terms not available commercially." },
                                        { q: "Is the Canadian Agricultural Partnership (CAP) the same program in every province?", a: "No — CAP is a federal-provincial framework, but each province designs and delivers its own programs within that framework. Ontario's OMAFRA programs under CAP are completely different in structure, eligibility, and focus from BC's Ministry of Agriculture and Food programs, Alberta Agriculture's programs, or Saskatchewan's provincial CAP delivery. The federal government and provinces share the cost (60% federal, 40% provincial in most cases), but the actual programs you apply to and the agencies you contact are different in each province. Always start with your provincial ministry, not AAFC, for CAP applications." },
                                        { q: "Can an AgTech startup apply for CAP funding if they work with farmers?", a: "In most cases, no — CAP programs are designed for agricultural producers (farmers, producer organizations, agricultural cooperatives, food processors). AgTech companies that sell technology to farmers are not agricultural producers and are typically ineligible for CAP direct grants. However, some provinces have specific CAP-funded programs for 'technology suppliers' or 'non-producer project leads' that can include technology companies in a partnership with a farm organization applicant. Contact your provincial ministry and ask specifically: 'Can a technology company that is not a farm operation apply directly, or must a farm organization be the lead applicant?'" },
                                        { q: "What types of precision agriculture technologies are eligible for ACT Program grants?", a: "The ACT Adoption Stream has funded: GPS-guided variable rate fertilizer and pesticide applicators (reducing input use by targeting application precisely), soil health monitoring technology (including sensor networks and remote sensing analysis), precision irrigation systems with real-time soil moisture sensing, UAV (drone) crop monitoring and scouting systems, electric and hybrid farm equipment replacing diesel machinery, on-farm biogas and anaerobic digestion systems, and cover crop seeding equipment enabling soil carbon sequestration. The key eligibility criterion is that the technology must demonstrably reduce GHG emissions, improve energy efficiency, or reduce environmental impact. Technology that purely increases yield without environmental benefit is generally not eligible." },
                                        { q: "Can a vertical farming company in Canada access AgriInnovate or ACT?", a: "Yes — vertical farming and controlled environment agriculture companies are excellent candidates for both programs. AgriInnovate has funded commercial-scale vertical farming facilities at the $1M–5M level when the company can demonstrate a commercially viable business model and the financial capacity to repay. ACT Research Stream has funded novel controlled environment agriculture R&D projects at the $100K–$2M scale, particularly where energy efficiency, water use reduction, or novel biological inputs reduce the environmental footprint of controlled environment production. Additionally, IRAP is highly applicable to AgTech startups developing the AI, lighting, climate control, or automation technology for vertical farming systems." },
                                        { q: "Are there agriculture grants specifically for Indigenous farmers or First Nations agricultural operations?", a: "Yes — Indigenous agricultural enterprises have access to specialized programming beyond mainstream agriculture grants. Indigenous Services Canada administered programs include agriculture-specific Indigenous business supports. The AAFC Indigenous Agriculture programs include dedicated streams within CAP for First Nations, Métis, and Inuit agricultural operations. The Aboriginal Financial Institutions (AFI) network provides agricultural business loans with Indigenous cultural competency. The Métis Capital Corporations include agricultural lending streams. Additionally, farm operations with Indigenous ownership qualify for all mainstream AAFC programs (CAP, ACT, AgriInnovate) using modified eligibility criteria that recognize land-based revenue and collective community ownership structures." },
                                        { q: "How does Farm Credit Canada (FCC) complement government agriculture grants?", a: "Farm Credit Canada (FCC) is Canada's largest agricultural lender — it provides commercial financing (loans, leasing, insurance) to Canadian farm operations and agri-food businesses, not grants. FCC complements government grants by providing the commercial financing component that grants typically require as matching funds. Since most ACT Program grants require 50% matching from the applicant, and since most farm operations can't fund 50% from cash reserves alone, FCC financing is commonly used to provide the matching capital for ACT grant applications. This combination (ACT grant + FCC loan for matching) allows farms to undertake $500K–$2M clean technology projects with only 25% equity from their own capital, with the rest covered by the grant and FCC." },
                                        { q: "What documentation do I need for an AgriInnovate application?", a: "AgriInnovate requires a comprehensive package: (1) Detailed innovation description — what the technology does, how it works, and why it is genuinely innovative (not incremental). (2) Market analysis — who your customers are, total addressable market, competitive landscape. (3) Three years of audited or CPA-reviewed financial statements demonstrating financial health and repayment capacity. (4) Business financial projections for 5 years showing how the loan will be repaid from operations. (5) Implementation plan with milestones, timeline, and budget showing how the AgriInnovate capital will be deployed. (6) Economic impact assessment — jobs created or retained, agricultural sector advancement, export potential. (7) Environmental impact assessment — GHG reduction, water efficiency, land management improvement. Applications without all seven components are deemed incomplete without formal review." },
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
                            <Card className="bg-lime-800 text-white">
                                <CardContent className="pt-6">
                                    <Star className="h-8 w-8 text-yellow-300 mb-3" />
                                    <h3 className="font-bold text-lg mb-2">Free Agriculture Grant Matching</h3>
                                    <p className="text-lime-100 text-sm mb-4">Our agriculture funding specialists identify which AAFC, provincial, and AgTech programs fit your specific situation — for farms and agtech startups alike.</p>
                                    <Link href="/contact"><Button className="w-full bg-white text-lime-800 hover:bg-lime-50">Get Free Matching <ArrowRight className="h-4 w-4 ml-1" /></Button></Link>
                                </CardContent>
                            </Card>
                            <NewsletterSignup variant="sidebar" />
                            <Card>
                                <CardHeader><CardTitle className="text-lg">Key Agency Contacts</CardTitle></CardHeader>
                                <CardContent className="text-sm space-y-3">
                                    <div><div className="font-semibold">AAFC (AgriInnovate / ACT)</div><div className="text-gray-500">agriculture.canada.ca | 1-888-523-7755</div></div>
                                    <div><div className="font-semibold">Farm Credit Canada</div><div className="text-gray-500">fcc.ca | 1-888-332-3301</div></div>
                                    <div><div className="font-semibold">NRC IRAP (AgTech)</div><div className="text-gray-500">nrc.canada.ca/irap</div></div>
                                    <div><div className="font-semibold">Ontario OMAFRA</div><div className="text-gray-500">agriculture.ontario.ca</div></div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader><CardTitle className="text-lg">Related Resources</CardTitle></CardHeader>
                                <CardContent>
                                    <div className="space-y-2 text-sm">
                                        <Link href="/canada/government-grants" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> Federal Canadian Grants</Link>
                                        <Link href="/canada/small-business-grants" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> Canada Small Business Grants</Link>
                                        <Link href="/blog/sred-tax-credit-guide" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> SR&ED Complete Guide</Link>
                                        <Link href="/blog/irap-nrc-canada-guide" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> IRAP Complete Guide</Link>
                                        <Link href="/grant-finder" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> AI Grant Finder Tool</Link>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    <div className="mb-8">
                        <NewsletterSignup title="Canada Agriculture Grant Updates" description="Track AgriInnovate intake openings, ACT Program rounds, provincial CAP program launches, and IRAP agriculture priorities — delivered to your inbox." />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
