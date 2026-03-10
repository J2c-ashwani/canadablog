import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { GrantComparisonTable } from "@/components/grant-comparison-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DollarSign, Users, TrendingUp, CheckCircle, ArrowRight, Lightbulb, FileText, AlertCircle, Star, Zap, Leaf } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import type { Grant } from "@/lib/grants-data"
import ShortAnswerBox from "@/components/blog/ShortAnswerBox"
import EEATBadge from "@/components/blog/EEATBadge"
import EligibleCheck from "@/components/blog/EligibleCheck"

export const metadata: Metadata = {
    title: "Green Energy Grants Canada 2026 | $8B+ Cleantech & Renewable Funding Guide",
    description:
        "Complete guide to Canada's green energy grants and cleantech funding in 2026. SDTC up to $10M, Smart Renewables Program, Clean Investment Tax Credits (30% refundable), NRCan programs, and provincial green energy grants for Canadian businesses and startups.",
    keywords:
        "green energy grants Canada 2026, cleantech funding Canada, renewable energy grants, SDTC grants, NRCan grants, Net Zero Accelerator, clean investment tax credit Canada, Canada clean energy funding, green tech grants Canada",
    openGraph: {
        title: "Green Energy Grants Canada 2026 | $8B+ Cleantech Funding",
        description: "Discover Canada's $8B+ in green energy and cleantech grants, tax credits, and funding programs for 2026.",
        url: "https://www.fsidigital.ca/canada/green-energy-grants",
    },
}

const greenGrants: Grant[] = [
    {
        id: "green-scap",
        name: "Smart Renewables and Electrification Pathways (SREPs)",
        fundingMin: 500000,
        fundingMax: 50000000,
        eligibility: ["Renewable energy project developers", "Grid operators", "Indigenous community energy projects"],
        deadline: "Calls for proposals — check NRCan",
        applicationLink: "https://natural-resources.canada.ca/",
        description: "Funding for smart renewable energy and electrical grid modernization projects that advance Canada's clean electricity future.",
        country: "Canada",
        region: "Federal",
        category: "Green Energy",
        agency: "Natural Resources Canada",
        status: "Active",
        tags: ["Renewable", "Grid", "Solar", "Wind"],
        requirements: ["Technical feasibility study", "Quantified emissions reduction", "Indigenous engagement plan for large projects"],
        lastUpdated: "2026-01-01"
    },
    {
        id: "green-sdtc",
        name: "Sustainable Development Technology Canada (SDTC)",
        fundingMin: 1000000,
        fundingMax: 10000000,
        eligibility: ["Canadian clean technology companies", "Companies with working prototype", "Industrial sustainability innovators"],
        deadline: "Periodic intakes — watch sdtc.ca",
        applicationLink: "https://www.sdtc.ca/en/apply/",
        description: "Provides project funding to Canadian companies developing and demonstrating new environmental technologies that address climate change, clean air, water, and soil.",
        country: "Canada",
        region: "Federal",
        category: "Clean Tech",
        agency: "SDTC (Sustainable Development Technology Canada)",
        status: "Active",
        tags: ["Cleantech", "R&D", "Demonstration"],
        requirements: ["Working prototype or proof-of-concept", "Canadian company", "Clear environmental benefit metrics", "Industry partnership"],
        lastUpdated: "2026-01-01"
    },
    {
        id: "green-citc",
        name: "Clean Investment Tax Credits (ITC)",
        fundingMin: 50000,
        fundingMax: 100000000,
        eligibility: ["Companies investing in clean electricity", "Clean hydrogen producers", "Zero-emission vehicle manufacturers", "Clean tech manufacturers"],
        deadline: "Ongoing — claim via CRA",
        applicationLink: "https://www.canada.ca/en/department-finance/news/2023/03/budget-2023-clean-economy-investment-tax-credits.html",
        description: "Up to 30–40% refundable tax credits for investments in clean electricity infrastructure, clean hydrogen, clean tech manufacturing, and carbon capture.",
        country: "Canada",
        region: "Federal",
        category: "Tax Credit",
        agency: "Canada Revenue Agency / Finance Canada",
        status: "Active",
        tags: ["Tax Credit", "Clean Electricity", "ZEV", "Hydrogen"],
        requirements: ["Canadian-taxable entity", "Qualifying clean investment", "CRA pre-approval recommended for large projects"],
        lastUpdated: "2026-01-01"
    },
    {
        id: "green-ict",
        name: "Industrial Conservation Initiative (ICI)",
        fundingMin: 10000,
        fundingMax: 2000000,
        eligibility: ["Large industrial electricity users", "Commercial facilities over 1 MW demand", "On-site generation projects"],
        deadline: "Rolling",
        applicationLink: "https://natural-resources.canada.ca/",
        description: "NRCan funding for industrial facilities undertaking on-site clean energy generation, storage, or peak demand reduction projects.",
        country: "Canada",
        region: "Federal",
        category: "Industrial Energy",
        agency: "Natural Resources Canada",
        status: "Active",
        tags: ["Industrial", "Energy Storage", "Demand Response"],
        requirements: ["Peak demand >1 MW", "Documented energy reduction plan", "Operational Canadian facility"],
        lastUpdated: "2026-01-01"
    },
    {
        id: "green-act",
        name: "Agricultural Clean Technology Program",
        fundingMin: 25000,
        fundingMax: 2000000,
        eligibility: ["Farmers", "Agri-food businesses", "Indigenous agricultural enterprises"],
        deadline: "Periodic intakes",
        applicationLink: "https://agriculture.canada.ca/",
        description: "Adoption of precision agriculture, electrification, and clean energy technologies that reduce GHG emissions in the agriculture sector.",
        country: "Canada",
        region: "Federal",
        category: "Agriculture + Green",
        agency: "Agriculture and Agri-Food Canada",
        status: "Active",
        tags: ["Agriculture", "Cleantech", "Emissions Reduction"],
        requirements: ["Canadian agricultural enterprise", "Demonstrated GHG reduction", "50% cost-sharing required"],
        lastUpdated: "2026-01-01"
    },
]

export default function GreenEnergyGrantsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
            <Header />

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-green-700 via-emerald-800 to-teal-900 text-white py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="flex items-center justify-center gap-2 mb-6">
                            <Leaf className="h-6 w-6 text-green-300" />
                            <Badge className="bg-green-500/30 text-green-100 border-green-400">
                                Canada Clean Energy Funding Guide 2026
                            </Badge>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                            Green Energy & Cleantech Grants Canada 2026
                        </h1>
                        <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                            Canada's clean energy transition is backed by $120B+ in climate commitments and $8B+ in direct
                            annual funding. From SDTC grants (up to $10M for cleantech companies) to 30% refundable Clean
                            Investment Tax Credits, Canada offers the world's most generous green energy funding ecosystem
                            outside Europe.
                        </p>
                        <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
                            <div className="bg-white/10 rounded-xl p-4">
                                <div className="text-3xl font-bold">$8B+</div>
                                <div className="text-green-200 text-sm mt-1">Annual federal funding</div>
                            </div>
                            <div className="bg-white/10 rounded-xl p-4">
                                <div className="text-3xl font-bold">30%</div>
                                <div className="text-green-200 text-sm mt-1">Clean Investment Tax Credit</div>
                            </div>
                            <div className="bg-white/10 rounded-xl p-4">
                                <div className="text-3xl font-bold">$10M</div>
                                <div className="text-green-200 text-sm mt-1">Max SDTC cleantech grant</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* EEAT Components */}
            <section className="py-6 bg-emerald-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto space-y-4">
                        <ShortAnswerBox content="Yes — Canadian clean energy businesses can access SDTC grants (up to $10M), Smart Renewables Program ($500K–$50M for grid projects), Clean Investment Tax Credits (30% refundable on qualifying clean investments), NRCan industrial programs, and provincial green energy grants in BC, Ontario, Quebec and Alberta. Canada's $120B climate commitment makes it one of the top cleantech funding destinations globally." />
                        <EEATBadge authorName="Ashwani K." authorImage="/ash-author-1.jpg" date="2026-03-01" />
                        <EligibleCheck />
                    </div>
                </div>
            </section>

            <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">

                    <div className="flex flex-wrap gap-2 mb-10">
                        {["Top Programs", "Clean ITCs", "SDTC Guide", "Provincial Programs", "How to Apply", "FAQ"].map((item) => (
                            <Badge key={item} variant="outline" className="cursor-pointer hover:bg-green-50 px-3 py-1.5 text-sm">{item}</Badge>
                        ))}
                    </div>

                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Canada Green Energy Grant Programs Comparison 2026</h2>
                        <GrantComparisonTable grants={greenGrants} title="Green Energy Grants Comparison" />
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8 mb-12">
                        <div className="lg:col-span-2 space-y-10">

                            {/* Overview */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl flex items-center gap-2">
                                        <Leaf className="h-5 w-5 text-green-600" />
                                        Canada's Clean Energy Funding Landscape 2026
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="text-gray-700 prose max-w-none">
                                    <p className="leading-relaxed mb-4">
                                        Canada has committed to Net Zero by 2050 and has backing that commitment with $120B+ in climate
                                        financing commitments across 5 federal budgets (2021–2025). For businesses, this creates an extraordinary
                                        window of opportunity: the federal government, provincial governments, and Crown corporations are all
                                        actively co-investing in clean energy projects at unprecedented scale.
                                    </p>
                                    <p className="leading-relaxed mb-4">
                                        The landscape breaks down into three layers: (1) <strong>Direct grants</strong> like SDTC (for cleantech
                                        companies demonstrating technology) and SREPs (for renewable energy infrastructure projects);
                                        (2) <strong>Refundable tax credits</strong> through the Clean Investment Tax Credit families
                                        (clean electricity, clean hydrogen, CCUS, clean tech manufacturing — each with 15%–40% rates);
                                        (3) <strong>Financing</strong> through the Canada Infrastructure Bank, BDC, and EDC clean economy windows.
                                    </p>
                                    <p className="leading-relaxed">
                                        Strategically, the most valuable programs for growth companies are the <strong>Clean ITCs</strong> —
                                        because they're refundable (you get cash even if you have no tax liability), stack with direct grants,
                                        and apply to capital expenditures that you'd make anyway. A solar manufacturer in Ontario, for example,
                                        can combine the 30% Clean Tech Manufacturing ITC with Ontario's energy efficiency rebate and the Canada
                                        Infrastructure Bank's clean energy window — tripling the effective subsidy on a single investment.
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Program Deep Dives */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Canada Green Energy Programs Explained</h2>
                                <div className="space-y-6">

                                    <Card className="border-l-4 border-l-green-500">
                                        <CardHeader>
                                            <div className="flex items-start justify-between">
                                                <CardTitle className="text-lg">1. Clean Investment Tax Credits (ITCs)</CardTitle>
                                                <Badge className="bg-green-100 text-green-800 shrink-0 ml-2">15%–40% Refundable</Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="text-gray-700 space-y-3">
                                            <p>Canada's Clean ITCs are the most transformative funding tool for cleantech businesses — they're large, refundable (cash back even at a loss), and stack with other grants.</p>
                                            <div className="overflow-auto">
                                                <table className="w-full text-sm border-collapse">
                                                    <thead>
                                                        <tr className="bg-green-50">
                                                            <th className="text-left p-2 border border-green-200">ITC Type</th>
                                                            <th className="text-left p-2 border border-green-200">Rate</th>
                                                            <th className="text-left p-2 border border-green-200">Qualifying Investments</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {[
                                                            ["Clean Electricity", "15%", "Wind, solar, hydro, nuclear, electricity storage, transmission"],
                                                            ["Clean Tech Manufacturing", "30%", "EV, batteries, solar panels, wind equipment production"],
                                                            ["Clean Hydrogen", "15–40%", "Green/blue hydrogen production, based on emissions intensity"],
                                                            ["CCUS (Carbon Capture)", "37.5–60%", "Carbon capture equipment, storage, transportation"],
                                                            ["Clean Tech (General)", "30%", "Zero-emission equipment, air-source heat pumps, geothermal"],
                                                        ].map(([type, rate, desc]) => (
                                                            <tr key={type} className="hover:bg-gray-50">
                                                                <td className="p-2 border border-gray-200 font-medium">{type}</td>
                                                                <td className="p-2 border border-gray-200 text-green-700 font-bold">{rate}</td>
                                                                <td className="p-2 border border-gray-200 text-gray-600">{desc}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="border-l-4 border-l-teal-500">
                                        <CardHeader>
                                            <div className="flex items-start justify-between">
                                                <CardTitle className="text-lg">2. SDTC — Sustainable Development Technology Canada</CardTitle>
                                                <Badge className="bg-teal-100 text-teal-800 shrink-0 ml-2">Up to $10M</Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="text-gray-700 space-y-3">
                                            <p>
                                                SDTC is Canada's premier cleantech grant for companies in the <strong>demonstration phase</strong> — you have
                                                a working prototype and need funding to prove it at scale. Average award: $1.5M–$4M.
                                                SDTC does not take equity; funding is project-based with milestone disbursements.
                                            </p>
                                            <div className="grid sm:grid-cols-3 gap-3">
                                                <div className="bg-teal-50 rounded-lg p-3 text-center">
                                                    <div className="font-bold text-teal-800 text-lg">$10M</div>
                                                    <div className="text-xs text-teal-700">Maximum grant</div>
                                                </div>
                                                <div className="bg-teal-50 rounded-lg p-3 text-center">
                                                    <div className="font-bold text-teal-800 text-lg">Prototype</div>
                                                    <div className="text-xs text-teal-700">Required stage</div>
                                                </div>
                                                <div className="bg-teal-50 rounded-lg p-3 text-center">
                                                    <div className="font-bold text-teal-800 text-lg">0% equity</div>
                                                    <div className="text-xs text-teal-700">Non-dilutive</div>
                                                </div>
                                            </div>
                                            <p className="text-sm text-amber-700 bg-amber-50 rounded-lg p-3">
                                                <strong>📌 SDTC Intake Status:</strong> SDTC was subject to a federal governance review in 2024.
                                                Monitor sdtc.ca for new intake announcements. The program remains active with a reorganized board.
                                            </p>
                                        </CardContent>
                                    </Card>

                                    <Card className="border-l-4 border-l-blue-500">
                                        <CardHeader>
                                            <div className="flex items-start justify-between">
                                                <CardTitle className="text-lg">3. Net Zero Accelerator Initiative</CardTitle>
                                                <Badge className="bg-blue-100 text-blue-800 shrink-0 ml-2">Up to $400M+</Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="text-gray-700 space-y-3">
                                            <p>
                                                The $8B Net Zero Accelerator is Canada's largest single green industry fund. It targets large,
                                                capital-intensive decarbonization projects — typically $50M–$400M in project value —
                                                in sectors like steel, cement, chemicals, and heavy transportation.
                                            </p>
                                            <ul className="space-y-2 text-sm">
                                                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" /><span><strong>Large Emitter Stream:</strong> For industrial companies with {'>'}10KT annual CO₂ emissions</span></li>
                                                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" /><span><strong>Clean Technology & Innovation:</strong> SME cleantech demonstration ($1M–$20M)</span></li>
                                                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" /><span><strong>Industrial Transformation:</strong> Sector-wide decarbonization plans</span></li>
                                            </ul>
                                        </CardContent>
                                    </Card>

                                </div>
                            </div>

                            {/* Provincial Programs */}
                            <Card className="bg-green-50 border-green-200">
                                <CardHeader>
                                    <CardTitle className="text-xl text-green-900">Provincial Green Energy Programs</CardTitle>
                                </CardHeader>
                                <CardContent className="text-green-900">
                                    <div className="grid sm:grid-cols-2 gap-4 text-sm">
                                        {[
                                            { province: "Ontario", programs: "IESO clean energy procurement, Ontario Clean Resource Investment (OCRI), EV charging incentives" },
                                            { province: "British Columbia", programs: "CleanBC Industry Fund (up to $5M), BC Hydro PowerSmart, Innovative Clean Energy (ICE) Fund" },
                                            { province: "Alberta", programs: "ERA (Emissions Reduction Alberta) up to $5M, TIER carbon pricing credits, petrochemical diversification" },
                                            { province: "Quebec", programs: "ÉcoPerformance (up to $400K), Technoclimat (up to $2M), Hydro-Québec efficiency programs" },
                                        ].map(({ province, programs }) => (
                                            <div key={province} className="bg-white rounded-lg p-3 border border-green-200">
                                                <div className="font-bold text-green-800 mb-1">{province}</div>
                                                <div className="text-gray-600 text-xs">{programs}</div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* How to Apply */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl flex items-center gap-2">
                                        <FileText className="h-5 w-5 text-green-600" />
                                        How to Apply for Canada Green Energy Grants
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="text-gray-700">
                                    <div className="space-y-4">
                                        {[
                                            { step: "1", title: "Start with the Clean ITC Assessment", desc: "Before applying to any grant, have your tax advisor assess your eligibility for Clean ITCs through CRA. ITCs are refundable and don't require application — just proper documentation of qualifying investments. This can unlock immediate value before grant timelines." },
                                            { step: "2", title: "Determine Your Technology Readiness Level (TRL)", desc: "Canada's grants map to TRL: IRAP funds TRL 3–6 (early R&D), SDTC funds TRL 7–9 (demonstration), and Net Zero Accelerator funds TRL 8–9 (deployment). Applying to the wrong stage program is the most common rejection reason." },
                                            { step: "3", title: "Engage NRCan or ISED Early", desc: "For large projects (>$1M), contact Natural Resources Canada or ISED before submitting. Program officers inform you of fit, upcoming intakes, and can suggest complementary programs. This call is free and significantly improves success rates." },
                                            { step: "4", title: "Prepare an Environmental Benefits Quantification", desc: "Every green energy grant requires quantified GHG reduction projections. Use federal methodologies (National Inventory Report) to express expected CO₂e reductions. Weak quantification is the #1 rejection reason for SDTC and Net Zero Accelerator applications." },
                                            { step: "5", title: "Stack Provincial + Federal Programs", desc: "Plan your funding stack from the start: federal grant (SDTC/SREPs) + provincial program (e.g., ERA Alberta, Technoclimat Quebec) + Clean ITC. This combination can cover 60–80% of a clean energy project's cost with non-dilutive capital." },
                                        ].map((item) => (
                                            <div key={item.step} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                                                <div className="h-8 w-8 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-bold shrink-0">{item.step}</div>
                                                <div><div className="font-semibold text-gray-900 mb-1">{item.title}</div><div className="text-sm text-gray-600">{item.desc}</div></div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Expert Tips */}
                            <Card className="border-amber-200 bg-amber-50">
                                <CardHeader>
                                    <CardTitle className="text-xl flex items-center gap-2 text-amber-800">
                                        <Lightbulb className="h-5 w-5 text-amber-600" />
                                        Expert Strategy: Canada Clean Energy Funding
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="text-amber-900 space-y-4">
                                    <div className="bg-white rounded-lg p-4 border border-amber-200">
                                        <div className="font-semibold mb-2">💡 ITCs Are Cash, Not Credits</div>
                                        <p className="text-sm">Canada's Clean ITCs are fully refundable — even if your company has no tax liability, CRA sends you a cheque for the credit amount. For a cleantech startup investing $2M in qualifying equipment at 30% ITC rate, that's $600K in direct government cash within 12 months of filing. Model this into your financial projections and investor deck immediately.</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 border border-amber-200">
                                        <div className="font-semibold mb-2">💡 SDTC + IRAP Is the Bridge Strategy</div>
                                        <p className="text-sm">Win IRAP funding first (up to $500K) to advance your TRL from 4 to 6, then apply to SDTC when you have a working prototype (TRL 7+). This sequential approach is exactly what SDTC prioritizes — companies that have already used government funding responsibly and have demonstrated technical progress.</p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* FAQ */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions: Canada Green Energy Grants</h2>
                                <div className="space-y-4">
                                    {[
                                        { q: "Do I need to be a large company to access green energy grants in Canada?", a: "No — Canada's clean energy funding spans all sizes. SDTC funds SMEs with working prototypes ($1M–$10M). The Clean ITC applies to any Canadian-taxable entity making qualifying investments, starting from equipment purchases as small as $10K. IRAP funds cleantech SMEs at early R&D stages with $50K–$500K. Large-scale infrastructure grants like SREPs and Net Zero Accelerator tend to target larger projects ($5M+)." },
                                        { q: "Can a foreign-owned company access Canada's green energy grants?", a: "Generally, yes — if the company has a Canadian subsidiary that conducts qualifying activities in Canada. SDTC, IRAP, and the Clean ITCs all accept Canadian subsidiaries of foreign-owned companies as long as the R&D and commercialization activity happens in Canada and creates Canadian jobs. Some programs (like the Net Zero Accelerator) may prioritize Canadian-owned companies for discretionary decisions." },
                                        { q: "What is the difference between SDTC and Net Zero Accelerator?", a: "SDTC funds cleantech SMEs at the demonstration phase (TRL 7–9, $1M–$10M grants, prototype proven, first commercial installations being deployed). Net Zero Accelerator funds large industrial decarbonization projects ($50M–$400M+, typically for companies with >$100M revenue, focused on heavy industry: steel, cement, chemicals). They serve very different company profiles and scales." },
                                        { q: "How do provincial green energy programs interact with federal grants?", a: "They stack intentionally. Federal programs (SDTC, ITCs, SREPs) and provincial programs (ERA Alberta, Technoclimat Quebec, CleanBC) are designed to fund different portions of the same project. A cleantech company in Alberta might receive 25% from SDTC (federal), 15% from ERA (provincial), and 30% from the federal Clean Technology ITC — covering 70% of project costs in non-dilutive capital. Always apply to both federal and provincial simultaneously." },
                                    ].map((item, i) => (
                                        <Card key={i}>
                                            <CardContent className="pt-4">
                                                <div className="font-semibold text-gray-900 mb-2">{item.q}</div>
                                                <div className="text-gray-600 text-sm leading-relaxed">{item.a}</div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            <Card className="bg-green-700 text-white">
                                <CardContent className="pt-6">
                                    <Star className="h-8 w-8 text-yellow-300 mb-3" />
                                    <h3 className="font-bold text-lg mb-2">Free Cleantech Grant Matching</h3>
                                    <p className="text-green-100 text-sm mb-4">Our clean energy specialists identify which federal + provincial programs fit your project — and build your funding stack.</p>
                                    <Link href="/contact"><Button className="w-full bg-white text-green-700 hover:bg-green-50">Get Free Matching <ArrowRight className="h-4 w-4 ml-1" /></Button></Link>
                                </CardContent>
                            </Card>
                            <NewsletterSignup variant="sidebar" />
                            <Card>
                                <CardHeader><CardTitle className="text-lg">Related Programs</CardTitle></CardHeader>
                                <CardContent>
                                    <div className="space-y-2 text-sm">
                                        <Link href="/canada/innovation-grants" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> Canada Innovation Grants</Link>
                                        <Link href="/canada/government-grants" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> Federal Canadian Grants</Link>
                                        <Link href="/blog/irap-nrc-canada-guide" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> IRAP Complete Guide</Link>
                                        <Link href="/grant-finder" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> AI Grant Finder</Link>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    <div className="mb-8">
                        <NewsletterSignup title="Get Canada Clean Energy Grant Updates" description="Track SDTC intakes, Net Zero Accelerator calls, Clean ITC changes, and provincial green energy program openings." />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
