import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { GrantComparisonTable } from "@/components/grant-comparison-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Leaf, CheckCircle, ArrowRight, Building, Lightbulb, FileText, AlertCircle, Star, TrendingUp } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import type { Grant } from "@/lib/grants-data"
import ShortAnswerBox from "@/components/blog/ShortAnswerBox"
import EEATBadge from "@/components/blog/EEATBadge"
import EligibleCheck from "@/components/blog/EligibleCheck"

export const metadata: Metadata = {
    title: "Canada Green Energy Grants 2026 | Cleantech & Renewable Funding Complete Guide",
    description: "Complete guide to Canada green energy grants and cleantech funding in 2026. Clean Investment Tax Credits (30–40%), SDTC grants up to $10M, Net Zero Accelerator, provincial green programs, and IRAP cleantech streams for Canadian renewable energy and cleantech businesses.",
    keywords: "Canada green energy grants 2026, cleantech grants Canada, clean investment tax credit Canada, SDTC grants, Canada renewable energy funding, Net Zero Accelerator, IRAP cleantech, BC clean energy grants, Ontario cleantech grants, Alberta energy innovation",
    alternates: { canonical: "https://www.fsidigital.ca/canada/green-energy-grants" },
    openGraph: { title: "Canada Green Energy Grants 2026 | Cleantech Funding Guide", description: "Discover Canadian clean energy and cleantech grants, Clean ITC, SDTC, Net Zero Accelerator, and provincial programs for 2026.", url: "https://www.fsidigital.ca/canada/green-energy-grants" },
}

const greenEnergyGrants: Grant[] = [
    { id: "ca-sdtc", name: "Sustainable Development Technology Canada (SDTC)", fundingMin: 500000, fundingMax: 10000000, eligibility: ["Canadian cleantech companies", "Technology readiness levels 3–7", "Climate/energy/environmental technology solutions"], deadline: "Bi-annual calls — check sdtc.ca for current intake", applicationLink: "https://www.sdtc.ca/en/apply/", description: "Canada's primary cleantech grant program — non-dilutive funding of $500K–$10M for Canadian cleantech companies at the development and demonstration stage.", country: "Canada", region: "Federal", category: "Cleantech", agency: "Sustainable Development Technology Canada", status: "Active", tags: ["Cleantech", "Demonstration", "Development"], requirements: ["Canadian company", "TRL 3–7", "Consortium of 3+ organizations", "Matched funding from private sector"], lastUpdated: "2026-01-01" },
    { id: "ca-clean-itc", name: "Clean Investment Tax Credits (Clean ITC)", fundingMin: 100000, fundingMax: 100000000, eligibility: ["Canadian businesses investing in clean electricity, clean tech manufacturing, carbon capture", "Businesses across all provinces"], deadline: "Filing with CRA annual corporate tax return", applicationLink: "https://www.canada.ca/en/department-finance/programs/tax-policy/tax-expenditures/2023/clean-investment-tax-credits.html", description: "Refundable investment tax credits of 15–40% on qualifying clean energy investments, enacted under Budget 2024 and covering solar, wind, CCUS, energy storage, and clean tech manufacturing.", country: "Canada", region: "Federal", category: "Tax Credit", agency: "Canada Revenue Agency", status: "Active", tags: ["Tax Credit", "Refundable", "Clean Energy", "Manufacturing"], requirements: ["Canadian business", "Qualifying clean energy investment", "Labour conditions compliance for higher rates", "CRA compliance"], lastUpdated: "2026-01-01" },
    { id: "ca-nza", name: "Net Zero Accelerator Initiative", fundingMin: 1000000, fundingMax: 400000000, eligibility: ["Large industrial emitters", "Clean technology SMEs (separate SME stream)", "Capital-intensive decarbonization projects"], deadline: "Applications by sector invitation — ISED coordinates", applicationLink: "https://ised-isde.canada.ca/site/strategic-innovation-fund/en/net-zero-accelerator", description: "Canada's largest single clean industry fund at $8B — supporting industrial decarbonization in steel, cement, chemicals, and heavy transportation, with an SME cleantech demonstration stream.", country: "Canada", region: "Federal", category: "Industrial Decarbonization", agency: "Innovation, Science and Economic Development Canada", status: "Active", tags: ["Industrial", "Decarbonization", "Large Scale"], requirements: ["Decarbonization project plan", "Canadian facility", "Sector-specific eligibility", "Large project: 5+ year timeline commitment"], lastUpdated: "2026-01-01" },
    { id: "ca-irap-clean", name: "IRAP Cleantech Stream", fundingMin: 50000, fundingMax: 2000000, eligibility: ["Canadian SMEs developing clean technology", "Companies with fewer than 500 employees", "Technology development projects with commercial potential"], deadline: "Rolling — through regional NRC IRAP advisors", applicationLink: "https://nrc.canada.ca/en/support-technology-innovation/nrc-industrial-research-assistance-program", description: "NRC IRAP's cleantech-priority funding stream, covering R&D wages and sub-contractor costs for Canadian SMEs developing clean energy, clean water, and environmental technology solutions.", country: "Canada", region: "Federal", category: "R&D", agency: "National Research Council — IRAP", status: "Active", tags: ["IRAP", "R&D Wages", "SME", "Cleantech"], requirements: ["Canadian SME (<500 employees)", "Commercially viable technology", "NRC ITA advisor relationship", "Canadian-based R&D activity"], lastUpdated: "2026-01-01" },
    { id: "ca-provincial-green", name: "Provincial Clean Energy Programs", fundingMin: 25000, fundingMax: 25000000, eligibility: ["Varies by province", "Clean energy businesses, utilities, building owners"], deadline: "Various — BC DCAP, Ontario IEETF, Alberta TIER, Quebec Technoclimat", applicationLink: "https://www.canada.ca/en/environment-climate-change/services/climate-change/provincial-territorial-plans.html", description: "Province-specific clean energy and cleantech grant programs including BC's DCAP, Ontario's IEETF, Alberta's TIER innovation fund, and Quebec's Technoclimat.", country: "Canada", region: "Pan-Canadian", category: "Provincial", agency: "Various Provincial Governments", status: "Active", tags: ["Provincial", "Clean Energy", "Carbon Fund"], requirements: ["Province-specific eligibility", "Clean energy or decarbonization project", "Matching funding common"], lastUpdated: "2026-01-01" },
]

export default function GreenEnergyGrantsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
            <Header />

            <section className="bg-gradient-to-br from-green-700 via-emerald-800 to-teal-900 text-white py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="flex items-center justify-center gap-2 mb-6">
                            <Leaf className="h-6 w-6 text-green-300" />
                            <Badge className="bg-green-500/30 text-green-100 border-green-400">Canada Green Energy Funding Guide 2026</Badge>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Canada Green Energy & Cleantech Grants 2026</h1>
                        <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                            Canada has committed over $80 billion to clean energy and climate transition through Budget 2024 — creating the
                            largest clean investment opportunity in Canadian history. New refundable Clean Investment Tax Credits (15–40% of
                            qualifying capital), a revitalized SDTC program ($10M grants), the $8B Net Zero Accelerator for heavy industry,
                            and an enhanced IRAP cleantech stream combine to create the most comprehensive government clean energy funding
                            ecosystem any Canadian cleantech company has ever had access to. This guide explains every major program in
                            depth — from eligibility and application process to expert strategies for stacking multiple funding sources
                            and common mistakes that cost companies millions in unclaimed incentives.
                        </p>
                        <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
                            <div className="bg-white/10 rounded-xl p-4"><div className="text-3xl font-bold">$80B+</div><div className="text-green-200 text-sm mt-1">Federal clean energy commitment</div></div>
                            <div className="bg-white/10 rounded-xl p-4"><div className="text-3xl font-bold">40%</div><div className="text-green-200 text-sm mt-1">Max Clean ITC on qualifying investment</div></div>
                            <div className="bg-white/10 rounded-xl p-4"><div className="text-3xl font-bold">$10M</div><div className="text-green-200 text-sm mt-1">Max SDTC non-dilutive grant</div></div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-6 bg-emerald-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto space-y-4">
                        <ShortAnswerBox
                question="What grants are available for clean energy and cleantech companies in Canada?"
                content="Yes — Canadian clean energy and cleantech companies have access to the largest government funding ecosystem in Canadian history: Refundable Clean Investment Tax Credits (15–40% of qualifying capital investment), SDTC grants ($500K–$10M), the Net Zero Accelerator (up to $400M for industrial decarbonization), IRAP cleantech R&D funding ($50K–$2M), and province-specific clean energy programs from BC, Ontario, Alberta, and Quebec."
              />
                        <EEATBadge authorName="Ashwani K." authorImage="/author-ashwani.jpg" date="2026-03-01" />
                        <EligibleCheck />
                    </div>
                </div>
            </section>

            <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">

                    <div className="flex flex-wrap gap-2 mb-10">
                        {["Clean ITC", "SDTC Grants", "Net Zero Accelerator", "IRAP Cleantech", "Provincial Programs", "FAQ"].map((item) => (
                            <Badge key={item} variant="outline" className="cursor-pointer hover:bg-green-50 px-3 py-1.5 text-sm">{item}</Badge>
                        ))}
                    </div>

                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Canada Clean Energy Grant Programs — Quick Comparison 2026</h2>
                        <p className="text-gray-600 mb-6">Every major federal and provincial clean energy program compared. Programs vary significantly in stage requirements — Clean ITC needs commercial capital investment while SDTC and IRAP fund earlier technology development.</p>
                        <GrantComparisonTable grants={greenEnergyGrants} title="Canada Green Energy Programs Comparison" />
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8 mb-12">
                        <div className="lg:col-span-2 space-y-10">

                            <Card>
                                <CardHeader><CardTitle className="text-xl flex items-center gap-2"><Building className="h-5 w-5 text-green-600" />Canada&apos;s Clean Energy Funding Ecosystem — The Strategic Overview</CardTitle></CardHeader>
                                <CardContent className="text-gray-700 space-y-4">
                                    <p className="leading-relaxed">
                                        Canada's clean energy funding landscape underwent a fundamental transformation with Budget 2024's $80B+ commitment to
                                        the clean economy. The centrepiece is the family of <strong>Clean Investment Tax Credits (Clean ITCs)</strong> —
                                        refundable tax credits that return 15–40% of qualifying capital investments directly to Canadian businesses as cash,
                                        with no equity dilution, no application process beyond regular corporate tax filing, and no ministry approval required.
                                        These Clean ITCs are modelled on the U.S. Inflation Reduction Act and represent the most significant shift in Canadian
                                        clean energy policy in a generation.
                                    </p>
                                    <p className="leading-relaxed">
                                        Alongside the Clean ITCs, <strong>SDTC (Sustainable Development Technology Canada)</strong> continues to be Canada's
                                        primary grants program for cleantech companies at the development and demonstration stage — providing $500K to $10M
                                        per project in non-repayable funding for Canadian companies proving out novel clean technologies before commercial
                                        deployment. SDTC has funded 455+ companies since inception, creating over 17,000 clean economy jobs and generating
                                        $4.5B in economic activity. The program is highly competitive (10–20% success rate) but the awards are among the
                                        largest non-dilutive grants available to any Canadian company in any sector.
                                    </p>
                                    <p className="leading-relaxed">
                                        For early-stage cleantech companies — at the prototype or proof-of-concept phase — the <strong>NRC IRAP cleantech
                                            stream</strong> is the most accessible and fastest-disbursing funding source. IRAP provides $50K–$2M in R&D wage
                                        and sub-contractor reimbursements for Canadian SMEs developing clean technology, with funding decisions sometimes
                                        within 4–8 weeks of engagement with a regional IRAP Industrial Technology Advisor (ITA). IRAP is specifically
                                        designed to be a first-stage funder that helps companies generate the technical results needed to win larger
                                        grants (SDTC, NZA) and private investment.
                                    </p>
                                    <p className="leading-relaxed">
                                        Provincial programs add another critical layer. <strong>BC's Cleantech Fund</strong>, <strong>Ontario's IEETF</strong>,
                                        <strong>Alberta's TIER innovation fund</strong>, and <strong>Quebec's Technoclimat</strong> each provide $25K–$25M
                                        in province-specific clean energy funding that does not conflict with federal programs. Most cleantech companies
                                        can access both provincial and federal funding simultaneously — and should — as these programs explicitly allow
                                        co-funding of different project cost categories.
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Clean ITC Deep Dive */}
                            <Card className="border-2 border-green-200 bg-green-50">
                                <CardHeader><CardTitle className="text-xl text-green-900">Clean Investment Tax Credits — Complete Rate Table (2026)</CardTitle></CardHeader>
                                <CardContent className="text-green-900">
                                    <p className="text-sm mb-5 leading-relaxed">
                                        Budget 2024 created six distinct Clean ITC categories, each with a base rate and a higher rate for companies
                                        meeting prevailing wage and apprenticeship conditions. These are <strong>refundable</strong> credits — meaning
                                        even if you have no federal tax owing, CRA sends you a cheque for the credit amount. For capital-intensive
                                        clean energy projects, these credits represent an immediate, automatic return of 15–40% of your capital cost.
                                    </p>
                                    <div className="overflow-auto">
                                        <table className="w-full text-sm border-collapse">
                                            <thead>
                                                <tr className="bg-green-200">
                                                    <th className="text-left p-3 font-semibold">Clean ITC Category</th>
                                                    <th className="text-left p-3 font-semibold">Base Rate</th>
                                                    <th className="text-left p-3 font-semibold">Labour-Enhanced Rate</th>
                                                    <th className="text-left p-3 font-semibold">Qualifying Assets</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white">
                                                {[
                                                    ["Clean Electricity ITC", "15%", "30%", "Solar, wind, nuclear, hydro, tidal, battery storage, transmission"],
                                                    ["Clean Technology ITC", "30%", "30%", "Geothermal, small modular reactor, zero-emission vehicles for business"],
                                                    ["Clean Hydrogen ITC", "15–40%", "n/a (tiered by carbon intensity)", "Electrolyzers, hydrogen production equipment"],
                                                    ["Clean Tech Manufacturing ITC", "30%", "30%", "Equipment for EV/ battery/solar panel manufacturing in Canada"],
                                                    ["Carbon Capture ITC (CCUS)", "37.5–60%", "n/a (higher for direct air capture)", "CO₂ capture, transportation, and storage equipment"],
                                                    ["Zero-Emission Transit ITC", "30%", "30%", "Zero-emission buses, trucks, and associated charging infrastructure"],
                                                ].map(([cat, base, enhanced, assets]) => (
                                                    <tr key={cat} className="border-b border-green-100">
                                                        <td className="p-3 font-medium text-green-900">{cat}</td>
                                                        <td className="p-3 font-bold text-green-700">{base}</td>
                                                        <td className="p-3 font-bold text-green-800">{enhanced}</td>
                                                        <td className="p-3 text-gray-600 text-xs">{assets}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <p className="text-xs text-green-700 mt-3">Labour conditions for higher rates: paying prevailing wages to construction workers + ensuring 10% of labour is performed by apprentices. These conditions are tracked and verified by CRA.</p>
                                </CardContent>
                            </Card>

                            {/* Program Deep Dives */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Canada Green Energy Programs — Detailed Breakdown</h2>
                                <p className="text-gray-600 mb-6">In-depth analysis of each program: how decisions are made, what documentation you need, common rejection reasons, and the real value for different company stages.</p>
                                <div className="space-y-6">

                                    <Card className="border-l-4 border-l-green-500">
                                        <CardHeader>
                                            <div className="flex items-start justify-between">
                                                <CardTitle className="text-lg">1. SDTC (Sustainable Development Technology Canada)</CardTitle>
                                                <Badge className="bg-green-100 text-green-800 shrink-0 ml-2">$500K – $10M</Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="text-gray-700 space-y-4">
                                            <p>
                                                SDTC is the gold standard of Canadian cleantech grants — a non-repayable, non-dilutive contribution of $500K
                                                to $10M for Canadian cleantech companies moving a technology from development (TRL 3–4) through demonstration
                                                (TRL 5–7). SDTC has funded 455+ companies representing $3.8B in total project costs, with SDTC contribution
                                                covering $1.2B of that. Companies funded by SDTC have cumulatively raised $11B+ in private investment, making
                                                an SDTC award one of the strongest signals of technical and commercial credibility in the Canadian cleantech market.
                                            </p>
                                            <p>
                                                The program requires a consortium structure: your company must project lead, but you need at least two other
                                                partners — typically a technology development partner (university or research lab) and an industry partner
                                                (a corporation that will deploy or purchase the technology commercially). This consortium requirement is both
                                                SDTC's most important quality filter and its most significant application barrier. The strongest SDTC applications
                                                have a committed end-user who has agreed to run a commercial demonstration of the technology — not just an MOU
                                                of interest, but a signed demonstration agreement or letter of offtake.
                                            </p>
                                            <div className="grid sm:grid-cols-2 gap-4 my-4">
                                                <div className="bg-green-50 rounded-lg p-4">
                                                    <div className="font-semibold text-green-900 mb-2">What Makes a Strong Application</div>
                                                    <ul className="text-sm text-green-700 space-y-1">
                                                        <li>• Clear technology differentiation</li>
                                                        <li>• Committed commercial end-user partner</li>
                                                        <li>• Measurable environmental impact (CO₂ reduction quantified)</li>
                                                        <li>• Credible technical team with domain expertise</li>
                                                        <li>• 1:1 or better private sector matching funding</li>
                                                    </ul>
                                                </div>
                                                <div className="bg-amber-50 rounded-lg p-4">
                                                    <div className="font-semibold text-amber-900 mb-2">Common Rejection Reasons</div>
                                                    <ul className="text-sm text-amber-700 space-y-1">
                                                        <li>• No committed end-user (only MOU)</li>
                                                        <li>• Technology already at TRL 8+ (too commercial)</li>
                                                        <li>• Insufficient private sector matching commitment</li>
                                                        <li>• Environmental benefits too vague / unquantified</li>
                                                        <li>• Weak consortium (no genuine research partner)</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <p className="text-sm text-blue-700 bg-blue-50 rounded-lg p-3">
                                                <strong>📌 Application Tip:</strong> SDTC opens funding calls bi-annually. Registration of Intent (ROI) closes
                                                first — publish your intent to apply in the ROI system before the deadline even if your full application isn't
                                                ready. Missing the ROI deadline means waiting 6 months for the next intake. Check sdtc.ca in January and July
                                                for current intake status.
                                            </p>
                                        </CardContent>
                                    </Card>

                                    <Card className="border-l-4 border-l-blue-500">
                                        <CardHeader>
                                            <div className="flex items-start justify-between">
                                                <CardTitle className="text-lg">2. Net Zero Accelerator Initiative (NZA)</CardTitle>
                                                <Badge className="bg-blue-100 text-blue-800 shrink-0 ml-2">Up to $400M</Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="text-gray-700 space-y-4">
                                            <p>
                                                The Net Zero Accelerator is Canada's largest single industrial funding program — an $8B commitment under the
                                                Strategic Innovation Fund (SIF) targeting large-scale industrial decarbonization. The program runs three streams:
                                                (1) Large Emitter Stream for industrial facilities with over 10,000 tonnes of annual CO₂ emissions wanting to
                                                deploy proven decarbonization technology (steel, cement, aluminum, chemicals); (2) Clean Technology and Energy
                                                Stream for SME-scale cleantech demonstration projects of $1M–$20M; and (3) Industrial Transformation to support
                                                sector-wide decarbonization planning across major Canadian industries.
                                            </p>
                                            <p>
                                                For <strong>cleantech SMEs</strong>, the relevant stream is (2) — the Clean Technology and Energy Stream,
                                                which has funded solar+storage projects, green hydrogen demonstration plants, District Energy retrofits,
                                                and EV charging infrastructure deployments at the $1M–$20M scale. Applications to this stream go through
                                                Innovation, Science and Economic Development Canada (ISED) and are evaluated on: GHG reduction potential
                                                per dollar invested, technological readiness, project team capability, and economic benefits to Canada
                                                (jobs, supply chain, export potential).
                                            </p>
                                        </CardContent>
                                    </Card>

                                    <Card className="border-l-4 border-l-teal-500">
                                        <CardHeader>
                                            <div className="flex items-start justify-between">
                                                <CardTitle className="text-lg">3. Provincial Clean Energy Programs — In Depth</CardTitle>
                                                <Badge className="bg-teal-100 text-teal-800 shrink-0 ml-2">$25K – $25M by province</Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="text-gray-700 space-y-4">
                                            <p>
                                                Each Canadian province has created its own clean energy funding ecosystem — largely driven by Carbon Tax revenues
                                                (for TIER provinces), provincial electricity planning, and local economic development goals. The key programs by province:
                                            </p>
                                            <div className="space-y-3">
                                                {[
                                                    { prov: "British Columbia", prog: "CleanBC Industry Fund (DCAP)", detail: "Funded by BC's carbon levy revenue. $40M+ annually for industrial efficiency and clean fuel projects. BC-based industrial operations. Applications through CleanBC Consulting." },
                                                    { prov: "Ontario", prog: "Smart Grid Fund / IEETF", detail: "Ontario's Initiatives for Electrical and Energy Technologies Fund targets smart grid, energy storage, EV charging, and microgrids. Administered through IESO (ieso.ca)." },
                                                    { prov: "Alberta", prog: "TIER Technology Fund", detail: "Alberta's Technology Innovation and Emissions Reduction (TIER) system generates $700M+ annually for clean technology projects. Oil and gas sector dominant but open to all emitters. Clean tech demos: $500K–$5M." },
                                                    { prov: "Quebec", prog: "Technoclimat", detail: "TRANSITION ÉNERGÉTIQUE QUÉBEC's Technoclimat program: $500K–$3M for cleantech demonstration in Quebec. Priority for projects reducing GHGs in industry, buildings, and transportation." },
                                                ].map(({ prov, prog, detail }) => (
                                                    <div key={prov} className="bg-teal-50 rounded-lg p-4 border border-teal-200">
                                                        <div className="font-semibold text-teal-900 mb-1">{prov} — {prog}</div>
                                                        <div className="text-sm text-teal-800">{detail}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>

                                </div>
                            </div>

                            {/* Eligibility */}
                            <Card>
                                <CardHeader><CardTitle className="text-xl flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-600" />Who Qualifies for Canada Clean Energy Grants?</CardTitle></CardHeader>
                                <CardContent className="text-gray-700">
                                    <p className="mb-4 leading-relaxed">
                                        Eligibility varies significantly across programs. The Clean ITC is the most broadly accessible — any Canadian
                                        business making qualifying clean energy capital investments claims it automatically through their annual tax return.
                                        SDTC and IRAP require earlier-stage technology companies. NZA ranges from large industrial emitters to SMEs.
                                    </p>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <h3 className="font-semibold text-green-800 mb-3">Generally Eligible</h3>
                                            <ul className="space-y-2 text-sm">
                                                {["Canadian-incorporated businesses of any size (Clean ITC)", "SMEs with fewer than 500 employees developing clean technology (IRAP, SDTC)", "Companies at TRL 3–7 with real environmental impact quantification (SDTC)", "Canadian businesses investing in qualifying solar, wind, storage, EV (Clean ITC)", "Industrial companies with documented GHG emissions wanting to decarbonize (NZA)", "Cleantech companies forming a consortium with end-user and research partner (SDTC)"].map(i => <li key={i} className="flex items-start gap-2 text-sm"><CheckCircle className="h-3.5 w-3.5 text-green-500 mt-0.5 shrink-0" />{i}</li>)}
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-red-800 mb-3">Generally Not Eligible</h3>
                                            <ul className="space-y-2 text-sm">
                                                {["Companies with technology at TRL 8+ (too commercial) for SDTC — apply for Clean ITC instead", "Non-Canadian companies without Canadian operations or incorporation", "Projects with no quantified GHG or environmental benefit", "For-profit companies applying for SDTC without private sector consortium", "Companies that have already spent the capital they're claiming for Clean ITC (credit applies to new capital investments going forward)"].map(i => <li key={i} className="flex items-start gap-2 text-sm"><AlertCircle className="h-3.5 w-3.5 text-red-500 mt-0.5 shrink-0" />{i}</li>)}
                                            </ul>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* How to Apply */}
                            <Card>
                                <CardHeader><CardTitle className="text-xl flex items-center gap-2"><FileText className="h-5 w-5 text-green-600" />How to Apply for Canada Green Energy Grants — Step by Step</CardTitle></CardHeader>
                                <CardContent className="text-gray-700">
                                    <div className="space-y-4">
                                        {[
                                            { step: "1", title: "Start with IRAP for Early-Stage Technology Development", desc: "If your clean technology is at TRL 3–6 (prototype to pilot testing), contact NRC IRAP first. Find your regional Industrial Technology Advisor (ITA) at nrc.canada.ca/irap. Your ITA will assess your project, determine IRAP eligibility, and structure a funding proposal within 2–4 weeks. IRAP funding decisions can come in 4–8 weeks — the fastest of any major federal program. Use IRAP funding to generate the data and team credibility needed for subsequent SDTC applications." },
                                            { step: "2", title: "Monitor SDTC Intake Cycles and Submit Registration of Intent (ROI) Early", desc: "SDTC opens its calls for proposals twice a year (typically January and July, but check sdtc.ca). The ROI — a short online preliminary submission — closes before the full proposal. Register your ROI in the SDTC portal at the moment you become aware of a new intake. ROI registration does not commit you to a full application, but missing the ROI window means missing the intake entirely. Plan your consortium building and technical documentation 4–6 months ahead of your target intake." },
                                            { step: "3", title: "Claim Clean Investment Tax Credits Through Your Corporate Tax Return", desc: "Clean ITCs are administered by CRA, not through a separate application. If you are making qualifying capital investments in solar, wind, battery storage, EV fleet, or cleantech manufacturing equipment, track these costs separately in your accounting system throughout the fiscal year. At year-end, your accountant or tax advisor will include the relevant Investment Tax Credit (ITC) schedule in your corporate tax return (T2). CRA assesses and pays the refundable portion directly — no ministry approval required. For complex ITC situations (CCUS, clean hydrogen), engage a specialized tax advisor who understands Budget 2024's new ITC provisions." },
                                            { step: "4", title: "For Net Zero Accelerator — Contact ISED for Project Assessment", desc: "Unlike SDTC, there is no fixed intake calendar for the NZA's SME stream. Contact ISED's Strategic Innovation Fund team (ised-isde.canada.ca/sif) to arrange a preliminary project assessment meeting. Bring: a project description with cost estimates, your GHG reduction calculation (tonnes CO₂e per dollar invested), your company's financial statements and technology background, and a list of project partners. ISED staff will advise on whether your project qualifies and which NZA stream is most appropriate before you invest effort in a full application." },
                                            { step: "5", title: "Layer Provincial Programs on Top of Federal Funding", desc: "After engaging federal programs, identify provincial programs for your province. BC businesses: register at cleanbc.gov.bc.ca. Ontario businesses: contact IESO at ieso.ca. Alberta businesses: apply to TIER through your industry association. Quebec businesses: contact TRANSITION ÉNERGÉTIQUE QUÉBEC for Technoclimat. Provincial programs fund different cost categories than federal programs — typically provincial programs cover capital costs while federal programs (IRAP, SDTC) cover R&D and demonstration costs — enabling clean co-funding of a single project." },
                                            { step: "6", title: "Quantify Your Environmental Benefits Before Applying Anywhere", desc: "Every Canadian clean energy grant program requires quantified environmental benefits. Prepare a GHG accounting calculation before applying to any program — this is your most critical application document. Minimum requirements: baseline scenario emissions (business as usual), proposed scenario emissions (with your technology), annual CO₂e reduction, and cumulative reduction over 10–20 years. Tools: Canada's GHG quantification protocols (eccc.canada.ca), ISO 14064-1 methodology, or a third-party environmental consultant's assessment. Without this, your application is immediately at a competitive disadvantage." },
                                        ].map((item) => (
                                            <div key={item.step} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                                                <div className="h-8 w-8 rounded-full bg-green-700 text-white flex items-center justify-center text-sm font-bold shrink-0">{item.step}</div>
                                                <div><div className="font-semibold text-gray-900 mb-1">{item.title}</div><div className="text-sm text-gray-600 leading-relaxed">{item.desc}</div></div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Common Mistakes */}
                            <Card className="border-red-100 bg-red-50">
                                <CardHeader><CardTitle className="text-xl flex items-center gap-2 text-red-900"><AlertCircle className="h-5 w-5 text-red-600" />5 Costly Mistakes Canadian Cleantech Companies Make</CardTitle></CardHeader>
                                <CardContent className="text-red-900 space-y-4">
                                    {[
                                        { n: "1", m: "Applying to SDTC with Technology Too Early or Too Late", d: "SDTC explicitly targets TRL 3–7. Applications for technologies at TRL 1–2 (still in academic research) are rejected as too early. TRL 8–9 (already commercially deployed) are rejected as too late for SDTC — these companies should be claiming Clean ITC on their capital instead. Before applying, honestly assess your technology readiness level. SDTC's program officers will assess this within the first 10 minutes of reviewing your proposal." },
                                        { n: "2", m: "Missing Clean ITC Because You Don't Have a Tax Credit Specialist", d: "Clean ITC is automatic — but many Canadian businesses leave 15–40% of their qualifying capital investment unclaimed because their accountants are unfamiliar with the new ITC provisions from Budget 2024. A $2M solar installation should generate $600K in Clean Electricity ITC (30%). If your tax preparer doesn't know this, you're leaving $600K on the table. Ask specifically: 'Are you familiar with the 2024 budget Clean Investment Tax Credits and which of our capital investments qualify?'" },
                                        { n: "3", m: "Weak SDTC Consortium — Letters of Support Instead of Committed Agreements", d: "The single most common reason for SDTC rejection is a consortium that exists only on paper. A letter of support from a university professor is not the same as a formal research agreement with defined deliverables and IP allocation. A 'strategic partnership MOU' with a corporation is not the same as a signed demonstration agreement committing them to deploy your technology. SDTC reviewers distinguish clearly between committed partners and interested observers — build real contractual relationships before applying." },
                                        { n: "4", m: "Not Stacking IRAP with SDTC and Provincial Programs", d: "IRAP, SDTC, and provincial programs (Technoclimat, TIER, IEETF) can all co-fund different cost categories of a single cleantech project. IRAP covers R&D wages; SDTC covers demonstration and prototype costs; provincial programs cover certain capital or testing costs. Companies that apply to only one program at a time spend 5x as long raising the same amount of non-dilutive funding as companies that run parallel applications across all three levels of the funding ecosystem." },
                                        { n: "5", m: "Underestimating the SDTC Application Timeline", d: "From first contact with SDTC to funding disbursement is typically 18–24 months. Registration of Intent at intake open → 2 months review → invitation to full proposal → 4–6 months to write and submit → 4–6 months review → due diligence → contribution agreement negotiation → first disbursement. Companies that build SDTC funds into their 12-month operating cash runway always run out before the cheque arrives. Plan SDTC funding for month 18–30, not month 12." },
                                    ].map(({ n, m, d }) => (
                                        <div key={n} className="bg-white rounded-lg p-4 border border-red-200">
                                            <div className="font-semibold mb-2 text-red-900">{n}. {m}</div>
                                            <p className="text-sm text-red-800 leading-relaxed">{d}</p>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            {/* Expert Tip */}
                            <Card className="border-amber-200 bg-amber-50">
                                <CardHeader><CardTitle className="text-xl flex items-center gap-2 text-amber-800"><Lightbulb className="h-5 w-5 text-amber-600" />Expert Strategy: The Canadian Cleantech Funding Stack</CardTitle></CardHeader>
                                <CardContent className="text-amber-900 space-y-4">
                                    <div className="bg-white rounded-lg p-4 border border-amber-200">
                                        <div className="font-semibold mb-2">💡 The Complete Cleantech Funding Sequence</div>
                                        <p className="text-sm leading-relaxed">The optimal cleantech progression: IRAP ($200K–$500K) for TRL 4–6 development → SDTC ($1M–$5M) for TRL 6–7 demonstration → Clean ITC (30–40%) on commercial capital deployment → NZA for commercial-scale industrialization. Total non-dilutive funding over a 5-year cleantech company lifecycle: $3M–$15M before needing significant equity. This sequence is used by Canada&apos;s most successful cleantech companies including Carbon Engineering, DEEP Earth Energy, and CarbonCure.</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 border border-amber-200">
                                        <div className="font-semibold mb-2">💡 Clean ITC + SDTC Together — Not Either/Or</div>
                                        <p className="text-sm leading-relaxed">Many cleantech companies treat Clean ITC and SDTC as alternatives. They are not — they can fund the same company at different stages. Use SDTC to demonstrate your technology. Then, once you begin commercial capital deployment (buying solar panels, wind turbines, EV fleet, or production equipment), claim Clean ITC on that capital at 30–40%. A company that received $3M SDTC to demonstrate its technology and then deployed $5M in qualifying commercial capital saves an additional $1.5–2M through Clean ITC — automatically, through CRA, no application required beyond tax filing.</p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* FAQ */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Frequently Asked Questions: Canada Green Energy Grants 2026</h2>
                                <p className="text-gray-600 mb-6">Common questions from Canadian cleantech founders, CFOs, and clean energy project developers about federal and provincial funding programs.</p>
                                <div className="space-y-4">
                                    {[
                                        { q: "What is the Clean Investment Tax Credit and how do I claim it?", a: "The Clean ITC is a family of refundable tax credits enacted in Budget 2024, covering clean electricity (15–30%), clean technology (30%), clean hydrogen (15–40%), clean tech manufacturing (30%), carbon capture (37.5–60%), and zero-emission transit (30%). You claim it through your annual corporate tax return (T2) by filing the relevant Investment Tax Credit schedule. CRA pays the refundable portion — the portion exceeding your tax liability — directly as a cash payment. The higher labour-enhanced rates require meeting prevailing wage and apprenticeship conditions documented during the construction/installation phase. Engage a tax professional with Budget 2024 Clean ITC experience before your project begins." },
                                        { q: "Is SDTC accepting applications in 2026?", a: "SDTC is operating under updated governance following a 2023 audit, and its program terms have been renewed under the Canada Innovation Corporation. As of Q1 2026, SDTC applications are accepted through bi-annual intakes — check sdtc.ca for the current intake status, as dates shift based on the agency's annual review process. If SDTC has suspended its intake temporarily, IRAP and the Net Zero Accelerator remain open. The Canada Innovation Corporation (innovation.canada.ca) is consolidating some cleantech programs — monitor their site for updated application pathways." },
                                        { q: "Can a foreign company with a Canadian subsidiary apply for SDTC or IRAP?", a: "Yes — both SDTC and IRAP require that the project be conducted in Canada by a Canadian legal entity, but they do not require 100% Canadian ownership of that entity. A US, European, or Asian company with a Canadian-incorporated subsidiary conducting genuine R&D activity in Canada (Canadian employees, Canadian research facilities, Canadian IP development) qualifies. The key requirements are: Canadian incorporation, Canadian-based employment for the funded activities, and IP developed in Canada. IRAP specifically assesses whether the economic benefits (jobs, IP, commercialization) accrue to Canada." },
                                        { q: "How does IRAP differ from SDTC for cleantech companies?", a: "IRAP and SDTC are complementary, not competing. IRAP is a continuous program — no fixed intake cycles — and provides faster funding decisions (4–8 weeks from ITA engagement to approval). It covers R&D wages and sub-contractors for technical development work, with awards of $50K–$2M for SMEs. SDTC has bi-annual intakes, is more competitive (10–20% success rate vs. 40–60% for IRAP), but provides much larger grants ($500K–$10M) focused on demonstration projects with commercial end-users. The intended pathway is to use IRAP for development-stage work (TRL 3–6) to generate results, then apply to SDTC for demonstration funding (TRL 5–8) once those results are in hand." },
                                        { q: "What provincial clean energy programs are available for Ontario cleantech companies?", a: "Ontario cleantech companies have access to: IESO's Smart Grid Fund (for grid-connected energy technology deployments), IESO's Conservation and Demand Management programs (for energy efficiency technologies), Ontario's Driving Prosperity Advanced Manufacturing Partnership Fund (for EV and clean manufacturing), OCE (Ontario Centres of Excellence) innovation vouchers for SME technology development, and the federal programs (SDTC, IRAP, Clean ITC) available across all provinces. Ontario companies should also explore FedDev Ontario programs (feddevontario.gc.ca) which provide regional economic development funding that includes cleantech priorities. A combined provincial + federal application is the standard approach for major Ontario cleantech projects." },
                                        { q: "Does the Clean Investment Tax Credit work for renewable energy projects that already started?", a: "Clean ITC applies to qualifying capital expenditures made after the budget announcement dates specified in Budget 2024 (varies by ITC type — most have a start date of March 28, 2023 or later). Capital spent before those dates is not eligible. For new projects starting in 2026, Clean ITC is fully applicable from first dollar of qualifying capital. For projects that started before the Credit came into effect, only the capital spent after the relevant effective date qualifies. Your accountant should segregate capital by date and assess which expenditures fall within the eligible period." },
                                        { q: "Can a cleantech startup use government grants and private venture capital simultaneously?", a: "Yes — and most successful Canadian cleantech companies do exactly this. Government grants (IRAP, SDTC) are non-dilutive: they don't involve selling equity. Private venture capital is dilutive but provides larger capital and business development support. The combination allows a cleantech company to minimize equity dilution in the early development stage (funded primarily by government grants) while reserving equity raises for commercial scaling (where the grants slow down and VC provides faster, larger capital). SDTC's $10M maximum grant is sufficient to carry a cleantech company to commercial readiness, at which point Series A venture funding is much more achievable with demonstrated technology." },
                                        { q: "What sectors are SDTC's priorities for 2026 funding?", a: "SDTC's environmental mandate covers all technologies addressing climate change, clean air, water quality, and land remediation — but the highest-priority and most-funded sectors as of 2026 are: clean electricity generation (solar, wind, tidal, advanced nuclear), energy storage (grid-scale batteries, thermal storage), carbon capture utilization and storage (CCUS), clean hydrogen production (electrolysis, biomass), sustainable transportation (EV charging infrastructure, zero-emission commercial vehicles), green buildings (building electrification, low-carbon materials), and precision agriculture for emissions reduction. Technologies in these areas receive priority review and historically have higher success rates than technologies in adjacent areas." },
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
                            <Card className="bg-green-800 text-white">
                                <CardContent className="pt-6">
                                    <Star className="h-8 w-8 text-yellow-300 mb-3" />
                                    <h3 className="font-bold text-lg mb-2">Free Cleantech Grant Matching</h3>
                                    <p className="text-green-100 text-sm mb-4">Our specialists identify every SDTC, IRAP, Clean ITC, and provincial program available to your specific cleantech project — free consultation.</p>
                                    <Link href="/contact"><Button className="w-full bg-white text-green-800 hover:bg-green-50">Get Free Matching <ArrowRight className="h-4 w-4 ml-1" /></Button></Link>
                                </CardContent>
                            </Card>
                            <NewsletterSignup variant="sidebar" />
                            <Card>
                                <CardHeader><CardTitle className="text-lg">Key Agency Contacts</CardTitle></CardHeader>
                                <CardContent className="text-sm space-y-3">
                                    <div><div className="font-semibold">SDTC</div><div className="text-gray-500">sdtc.ca | 1-800-619-0188</div></div>
                                    <div><div className="font-semibold">NRC IRAP</div><div className="text-gray-500">nrc.canada.ca/irap</div></div>
                                    <div><div className="font-semibold">CRA (Clean ITC)</div><div className="text-gray-500">canada.ca/en/revenue-agency</div></div>
                                    <div><div className="font-semibold">ISED (Net Zero Accelerator)</div><div className="text-gray-500">ised-isde.canada.ca/sif</div></div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader><CardTitle className="text-lg">Related Resources</CardTitle></CardHeader>
                                <CardContent>
                                    <div className="space-y-2 text-sm">
                                        <Link href="/canada/innovation-grants" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> Canada Innovation Grants</Link>
                                        <Link href="/canada/government-grants" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> Federal Canadian Grants</Link>
                                        <Link href="/blog/irap-nrc-canada-guide" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> IRAP Complete Guide</Link>
                                        <Link href="/blog/sred-tax-credit-guide" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> SR&ED Tax Credit Guide</Link>
                                        <Link href="/grant-finder" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> AI Grant Finder Tool</Link>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    <div className="mb-8">
                        <NewsletterSignup title="Canada Clean Energy Grant Updates" description="Track SDTC intake openings, Clean ITC policy changes, provincial energy program announcements, and NZA competitive rounds — delivered to your inbox." />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
