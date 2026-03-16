import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { GrantComparisonTable } from "@/components/grant-comparison-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, CheckCircle, ArrowRight, Building, Lightbulb, FileText, AlertCircle, Star, TrendingUp } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import type { Grant } from "@/lib/grants-data"
import ShortAnswerBox from "@/components/blog/ShortAnswerBox"
import EEATBadge from "@/components/blog/EEATBadge"
import EligibleCheck from "@/components/blog/EligibleCheck"

export const metadata: Metadata = {
    title: "New York Business Grants 2026 | NY State Startup & SMB Funding Complete Guide",
    description: "Complete guide to New York business grants 2026. START-UP NY tax-free zones, Excelsior Jobs Tax Credits, NY Green Bank, NYS Pre-Seed Matching Fund up to $150K, and NYBDC lending programs. Expert strategies for NYC vs. Upstate NY funding differences.",
    keywords: "New York business grants 2026, New York state funding startup, START-UP NY grants, Excelsior Jobs Tax Credit, NY Pre-Seed Fund, New York small business grants, NYC business grants, upstate New York startup funding, NYBDC loans, New York green bank",
    alternates: { canonical: "https://www.fsidigital.ca/usa/new-york" },
    openGraph: { title: "New York Business Grants 2026 | Complete NY Funding Guide", description: "Discover New York's $4B+ in business grants, tax incentives, and startup funding programs for 2026.", url: "https://www.fsidigital.ca/usa/new-york" },
}

const nyGrants: Grant[] = [
    { id: "ny-startup-ny", name: "START-UP NY Program", fundingMin: 0, fundingMax: 5000000, eligibility: ["Startups and businesses relocating to tax-free zones", "Companies partnering with SUNY or CUNY campuses", "Businesses creating net new jobs"], deadline: "Rolling", applicationLink: "https://startup.ny.gov/", description: "10-year tax elimination for businesses and employees located in START-UP NY tax-free zones on or near NY state university campuses.", country: "USA", region: "New York", category: "Tax Incentive", agency: "Empire State Development", status: "Active", tags: ["Tax-Free", "Startup", "University"], requirements: ["Located in START-UP NY zone", "University campus affiliation", "Net new NY jobs", "Strategic industry"], lastUpdated: "2025-01-20" },
    { id: "ny-excelsior", name: "Excelsior Jobs Tax Credits", fundingMin: 10000, fundingMax: 10000000, eligibility: ["Strategic industry businesses", "Companies creating or retaining significant NY jobs", "Manufacturing, tech, biotech, financial services"], deadline: "Pre-approval required — rolling", applicationLink: "https://esd.ny.gov/excelsior-jobs-program", description: "Performance-based tax credits up to $10M for companies creating and retaining jobs in strategic New York State industries.", country: "USA", region: "New York", category: "Tax Credit", agency: "Empire State Development", status: "Active", tags: ["Tax Credit", "Job Creation", "Strategic"], requirements: ["Pre-approval before hiring/expansion", "Strategic industry", "≥5 net new full-time NY jobs", "Competitive wages"], lastUpdated: "2025-01-20" },
    { id: "ny-preseed", name: "NYS Pre-Seed Matching Fund", fundingMin: 50000, fundingMax: 150000, eligibility: ["Early-stage NY technology companies", "Pre-revenue or early-revenue startups", "Companies with angel investment or university IP"], deadline: "Rolling through Regional SUNY Tech Accelerators", applicationLink: "https://www.rfsuny.org/our-work/preseed/", description: "Non-dilutive matching grants for early-stage NY technology companies that have secured angel investment or are commercializing university research.", country: "USA", region: "New York", category: "Startup", agency: "SUNY Research Foundation", status: "Active", tags: ["Startup", "Pre-Seed", "University"], requirements: ["NY-incorporated company", "Angel match or university IP", "At least 1 NY employee", "Technology focus"], lastUpdated: "2025-01-20" },
    { id: "ny-green-bank", name: "NY Green Bank Financing", fundingMin: 1000000, fundingMax: 50000000, eligibility: ["Clean energy project developers", "Green technology companies", "Energy efficiency businesses in NY"], deadline: "Rolling", applicationLink: "https://greenbank.ny.gov/", description: "State-sponsored investment fund providing debt, equity, and risk mitigation for clean energy projects and businesses in New York.", country: "USA", region: "New York", category: "Clean Energy", agency: "NY Green Bank", status: "Active", tags: ["Clean Energy", "Green Finance", "Solar", "EV"], requirements: ["NY-based clean energy project", "Commercial viability", "Environmental impact metrics", "Demonstrated financing gap"], lastUpdated: "2025-01-20" },
    { id: "ny-innovate", name: "Innovate NY Fund", fundingMin: 250000, fundingMax: 3000000, eligibility: ["NY seed and early-stage companies", "High-growth potential businesses", "Technology, biotech, clean energy sectors"], deadline: "Rolling — through regional Centers of Excellence", applicationLink: "https://esd.ny.gov/innovateny", description: "State-backed venture matching fund that invests alongside private investors in high-growth New York startups at seed to Series A stages.", country: "USA", region: "New York", category: "Venture Matching", agency: "Empire State Development", status: "Active", tags: ["Venture", "Seed", "Matching Fund"], requirements: ["NY-based company", "Private investment co-lead", "High-growth potential", "Job creation plan"], lastUpdated: "2025-01-20" },
]

export default function NewYorkGrantsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
            <Header />

            <section className="bg-gradient-to-br from-indigo-700 via-blue-800 to-slate-900 text-white py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="flex items-center justify-center gap-2 mb-6">
                            <MapPin className="h-6 w-6 text-indigo-300" />
                            <Badge className="bg-indigo-500/30 text-indigo-100 border-indigo-400">New York State Funding Guide 2026</Badge>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">New York Business Grants & Incentives 2026</h1>
            <div className="mt-8 mb-4 text-left">
              <ShortAnswerBox content="Yes — New York businesses can access $4B+ annually across state programs. START-UP NY eliminates all NY taxes for 10 years for qualifying businesses. Excelsior Jobs Credits provide up to $10M in performance-based tax credits. The NYS Pre-Seed Matching Fund provides up to $150K non-dilutive for early-stage tech startups. NY is the #2 state nationally for total SBIR/STTR award dollars — Federal grants provide an additional $600M+ annually to NY companies." />
            </div>
            <div className="flex justify-center mb-4">
              <EEATBadge authorName="Ashwani K." authorImage="/author-ashwani.jpg" date="2026-03-01" />
            </div>
                        
                        
                    </div>
                </div>
            </section>

            <section className="py-6 bg-emerald-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto space-y-4">
                        
                        
                        <EligibleCheck />
                    </div>
                </div>
            </section>

            <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">

                    <div className="flex flex-wrap gap-2 mb-10">
                        {["Key Programs", "NYC vs. Upstate", "How to Apply", "Eligibility", "Common Mistakes", "FAQ"].map((item) => (
                            <Badge key={item} variant="outline" className="cursor-pointer hover:bg-indigo-50 px-3 py-1.5 text-sm">{item}</Badge>
                        ))}
                    </div>

                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">New York Business Grant Programs — Quick Comparison 2026</h2>
                        <p className="text-gray-600 mb-6">Compare all major New York State business incentive programs. Note that many NY incentives require pre-approval before hiring, investing, or expanding — do not wait until after starting to contact Empire State Development.</p>
                        <GrantComparisonTable grants={nyGrants} title="New York Business Grants Comparison" />
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8 mb-12">
                        <div className="lg:col-span-2 space-y-10">

                            <Card>
                                <CardHeader><CardTitle className="text-xl flex items-center gap-2"><Building className="h-5 w-5 text-indigo-600" />New York's Business Funding Ecosystem: The Big Picture</CardTitle></CardHeader>
                                <CardContent className="text-gray-700 space-y-4">
                                    <p className="leading-relaxed">
                                        New York State's $4B+ annual business incentive portfolio is the third-largest in the United States by total value.
                                        It is administered primarily through Empire State Development (ESD), the New York State Energy Research and Development
                                        Authority (NYSERDA), and a network of 10 Regional Economic Development Councils (REDCs) that distribute discretionary
                                        economic development funding to individual regions. Understanding this distributed structure is critical: many New York
                                        businesses miss out on regional funding because they apply only to statewide ESD programs, not realizing that their
                                        regional REDC controls a separate discretionary grant pool of $100M+ that is specifically designated for their geography.
                                    </p>
                                    <p className="leading-relaxed">
                                        New York's business incentive philosophy differs from Florida and Texas in one key way: <strong>New York places heavy
                                            emphasis on strategic industries</strong> and is willing to offer extremely generous, long-term incentives for businesses
                                        in sectors it has designated as priorities — clean energy, advanced manufacturing, life sciences, financial technology,
                                        and digital media. START-UP NY, for example, offers a complete 10-year elimination of all New York taxes (corporate
                                        income tax, personal income tax for employees, sales tax, property tax) — an incentive of enormous value that is
                                        effectively a decade-long operating cost advantage worth $500K–$5M for a typical 20–100-person company. This program
                                        is routinely underutilized because businesses don't realize it is available to for-profit companies, not just academic spin-offs.
                                    </p>
                                    <p className="leading-relaxed">
                                        New York ranks <strong>#2 nationally for total federal SBIR/STTR awards</strong> received — trailing only California.
                                        New York companies receive over $600M annually in SBIR/STTR awards, concentrated in New York City (biotech, fintech,
                                        media), the Capital Region (defense, semiconductor, materials science), Long Island (aerospace, defense, pharma),
                                        and Western New York/Rochester (photonics, optics, manufacturing). Every region has dedicated SBIR support officers at
                                        local universities and state technology parks, providing free proposal review and commercial partnership services.
                                    </p>
                                    <p className="leading-relaxed">
                                        The <strong>NYC-vs.-Upstate distinction matters enormously</strong> for grant strategy. NYC-based businesses have access
                                        to the NYC Economic Development Corporation's programs, which include SSBCI small business loans, NYC Small Business
                                        Services grants, and the NYC Advanced Manufacturing Fund — none of which are accessible from upstate. Upstate
                                        businesses, however, typically have access to higher-value incentives (rural Excelsior bonuses, Consolidated Funding
                                        Applications through regional councils) and dramatically lower operating costs — a combination that makes upstate NY
                                        the better absolute choice for capital-intensive manufacturing and R&D operations.
                                    </p>
                                </CardContent>
                            </Card>

                            {/* NYC vs. Upstate */}
                            <Card className="border-indigo-100 bg-indigo-50">
                                <CardHeader><CardTitle className="text-xl text-indigo-900">NYC vs. Upstate New York: Funding Strategy Comparison</CardTitle></CardHeader>
                                <CardContent className="text-indigo-900">
                                    <p className="text-sm mb-4">Your location within New York State dramatically affects which programs you can access and the value of those incentives. Here's a practical comparison to help you think about location trade-offs:</p>
                                    <div className="overflow-auto">
                                        <table className="w-full text-sm border-collapse">
                                            <thead>
                                                <tr className="bg-indigo-200">
                                                    <th className="text-left p-3 font-semibold">Factor</th>
                                                    <th className="text-left p-3 font-semibold">New York City</th>
                                                    <th className="text-left p-3 font-semibold">Upstate / Regional NY</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white">
                                                {[
                                                    ["Key Programs Available", "NYC EDC, SSBCI, NYC SBS grants, NYC Advanced Mfg Fund, Innovate NY", "Regional REDC grants, START-UP NY, Excelsior (enhanced rural), Consolidated Funding App"],
                                                    ["Excelsior Credit Value", "Standard rates", "Up to 2x premium in Empire Zones / rural areas"],
                                                    ["START-UP NY Access", "Limited campus zones in Brooklyn/Staten Island/Bronx", "Broader access — most SUNY campuses upstate in zones"],
                                                    ["SBIR Concentration", "Very high — biotech, fintech, media startups", "High — defense (Capital Region), photonics (Rochester), pharma (Long Island)"],
                                                    ["Real Estate Cost", "Very high — $70-120/sq ft commercial", "Low — $10-30/sq ft across most upstate markets"],
                                                    ["Talent Pool", "World-class depth, very competitive salaries required", "Strong in specialized sectors; lower wage competitiveness pressure"],
                                                    ["NYC-Specific Programs", "Yes — multiple EDC and borough-specific grants", "No — upstate must use regional programs"],
                                                ].map(([f, nyc, up]) => (
                                                    <tr key={f} className="border-b border-indigo-100">
                                                        <td className="p-3 font-medium text-indigo-900">{f}</td>
                                                        <td className="p-3 text-gray-700">{nyc}</td>
                                                        <td className="p-3 text-gray-700">{up}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Program Deep Dives */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">New York State Grant Programs — Detailed Breakdown</h2>
                                <p className="text-gray-600 mb-6">Each program analyzed below with complete eligibility criteria, funding mechanics, application tips, and realistic success factors.</p>
                                <div className="space-y-6">

                                    <Card className="border-l-4 border-l-indigo-500">
                                        <CardHeader>
                                            <div className="flex items-start justify-between">
                                                <CardTitle className="text-lg">1. START-UP NY — Total Tax Elimination for 10 Years</CardTitle>
                                                <Badge className="bg-indigo-100 text-indigo-800 shrink-0 ml-2">10-Year Tax-Free</Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="text-gray-700 space-y-4">
                                            <p>
                                                START-UP NY is among the most aggressive business incentive programs offered by any US state. Qualifying businesses
                                                established or relocated within a designated tax-free zone — located on or adjacent to a SUNY, CUNY, or private college
                                                campus — pay zero New York State taxes for 10 years. This includes corporate income tax, sales and use tax, property
                                                tax, and most importantly, <strong>personal income tax for employees</strong>. That last benefit is significant: your
                                                startup's engineers, researchers, and executives pay zero New York State personal income tax on their salaries for a
                                                decade. For employees earning $150K–$400K, this represents $18K–$50K in annual personal tax savings — a meaningful
                                                recruitment and retention advantage in the competition for top technical talent.
                                            </p>
                                            <p>
                                                The typical misconception is that START-UP NY is exclusively for academic spin-offs. It is not. Any business that
                                                (a) is in alignment with the academic mission of the affiliated campus, (b) creates net new NY jobs that did not
                                                previously exist, and (c) does not relocate existing NY jobs from elsewhere in the state can qualify. The "aligned
                                                with academic mission" criterion is interpreted broadly — a software company near a tech university, a biotech near
                                                a life sciences school, or a manufacturing company near an engineering campus all commonly qualify.
                                            </p>
                                            <div className="grid sm:grid-cols-2 gap-4 my-4">
                                                <div className="bg-indigo-50 rounded-lg p-4">
                                                    <div className="font-semibold text-indigo-900 mb-2">Taxes Eliminated (10 Years)</div>
                                                    <ul className="text-sm text-indigo-700 space-y-1">
                                                        <li>• Corporate income tax</li>
                                                        <li>• Sales and use tax</li>
                                                        <li>• Property tax (real and personal)</li>
                                                        <li>• Personal income tax for employees</li>
                                                        <li>• Business filing fees</li>
                                                    </ul>
                                                </div>
                                                <div className="bg-green-50 rounded-lg p-4">
                                                    <div className="font-semibold text-green-900 mb-2">Typical Dollar Value</div>
                                                    <ul className="text-sm text-green-700 space-y-1">
                                                        <li>• 20-person company: $300K–$800K over 10 years</li>
                                                        <li>• 50-person company: $1M–$2.5M</li>
                                                        <li>• 150-person company: $3M–$6M</li>
                                                        <li>• (Includes employee PIT savings)</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <p className="text-sm text-amber-700 bg-amber-50 rounded-lg p-3">
                                                <strong>📌 Key Process Point:</strong> You must apply to START-UP NY before locating in the zone. Find the affiliated
                                                campus for your intended location at startup.ny.gov/campuses, then contact the campus START-UP NY administrator
                                                directly. They coordinate your application with ESD. The process typically takes 60–90 days.
                                            </p>
                                        </CardContent>
                                    </Card>

                                    <Card className="border-l-4 border-l-blue-500">
                                        <CardHeader>
                                            <div className="flex items-start justify-between">
                                                <CardTitle className="text-lg">2. Excelsior Jobs Tax Credits</CardTitle>
                                                <Badge className="bg-blue-100 text-blue-800 shrink-0 ml-2">Up to $10M</Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="text-gray-700 space-y-4">
                                            <p>
                                                Excelsior Jobs is New York's flagship performance-based tax credit program — analogous to Florida's QTI. It
                                                provides up to $10 million in refundable or non-refundable tax credits for companies that create or retain a
                                                significant number of full-time jobs in New York's strategically important industries. The credits are structured
                                                across four components: (1) Job Creation Tax Credit (up to 6.85% of wages paid to eligible new employees),
                                                (2) Investment Tax Credit (2% of qualified capital investments), (3) R&D Tax Credit (50% of the Federal R&D credit
                                                for NY-situated research), and (4) Child Care Tax Credit (up to $3,000 per employee using qualifying childcare).
                                            </p>
                                            <p>
                                                Unlike Florida's QTI which provides a flat per-job refund over 6 years, Excelsior credits are calculated as a
                                                percentage of wages — meaning higher-wage jobs are worth more. A company that creates 50 jobs averaging $150,000
                                                each receives a 6.85% Job Creation Credit of approximately $512,000 per year, paid out for up to 10 years as
                                                those jobs are maintained. The R&D component is particularly valuable for technology companies: Excelsior provides
                                                credits equal to 50% of the <em>federal</em> R&D credit you already claim, effectively adding a New York-layer
                                                of non-dilutive funding on top of your existing federal R&D deduction.
                                            </p>
                                            <p className="text-sm bg-red-50 border border-red-200 rounded-lg p-3 text-red-800">
                                                <strong>⚠️ Pre-Approval is Mandatory:</strong> Like Florida's QTI, Excelsior requires pre-approval from ESD before
                                                the creation or retention of any qualifying jobs. Post-activity applications are categorically rejected. A 50-job
                                                expansion without pre-approval can mean $500K–$1M in missed annual credits permanently forfeited.
                                            </p>
                                        </CardContent>
                                    </Card>

                                    <Card className="border-l-4 border-l-green-500">
                                        <CardHeader>
                                            <div className="flex items-start justify-between">
                                                <CardTitle className="text-lg">3. NYS Pre-Seed Matching Fund</CardTitle>
                                                <Badge className="bg-green-100 text-green-800 shrink-0 ml-2">$50K – $150K</Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="text-gray-700 space-y-4">
                                            <p>
                                                The NYS Pre-Seed Matching Fund is a non-dilutive grant program specifically targeted at very early-stage New York
                                                technology companies. Administered through the SUNY Research Foundation's regional technology accelerators, the fund
                                                provides matching grants between $50,000 and $150,000 to startups that have either secured a qualifying angel
                                                investment or are commercializing intellectual property licensed from a New York university. The program is explicitly
                                                designed to fill the gap between university lab and first commercial customer — the most capital-constrained and
                                                risk-concentrated phase of a technology company's development.
                                            </p>
                                            <p>
                                                The "matching" structure means you must bring an equal amount of qualifying investment. For a $100,000 Pre-Seed
                                                grant, you need $100,000 in documented angel or institutional investment already committed. The combination creates
                                                $200,000 in early runway — enough for 12–18 months of product development for a 2–3 person team. Successful
                                                Pre-Seed recipients have commonly gone on to secure Phase I SBIR awards (using their funded prototype as the
                                                preliminary data requirement) and Innovate NY venture matching funding for their Series A.
                                            </p>
                                        </CardContent>
                                    </Card>

                                    <Card className="border-l-4 border-l-emerald-500">
                                        <CardHeader>
                                            <div className="flex items-start justify-between">
                                                <CardTitle className="text-lg">4. NY Green Bank</CardTitle>
                                                <Badge className="bg-emerald-100 text-emerald-800 shrink-0 ml-2">$1M – $50M</Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="text-gray-700 space-y-4">
                                            <p>
                                                The NY Green Bank is the largest state-financed clean energy institution in the United States, with $1B+ in
                                                committed capital. It provides debt financing, equity co-investment, and credit enhancements specifically for
                                                clean energy projects and companies in New York State. Unlike traditional grant programs, NY Green Bank's
                                                financing is structured to be repaid — but at terms that are more favorable than what commercial banks offer,
                                                specifically designed to make clean energy projects financially viable when commercial financing alone doesn't
                                                pencil out. Solar + storage, energy efficiency, clean transportation, and building electrification projects
                                                all qualify for NY Green Bank capital.
                                            </p>
                                            <p>
                                                For clean energy startups, NY Green Bank's equity co-investment window is particularly valuable — it provides
                                                patient capital that replaces or supplements traditional venture funding for capital-intensive clean energy
                                                hardware companies that take 5–8 years to reach profitability, longer than typical VC timelines. Companies
                                                should pair NY Green Bank applications with NYSERDA's Cleantech Program grants (separate but complementary),
                                                and the federal Clean Investment Tax Credits (30% refundable ITC on qualifying clean tech investments).
                                            </p>
                                        </CardContent>
                                    </Card>

                                </div>
                            </div>

                            {/* How to Apply */}
                            <Card>
                                <CardHeader><CardTitle className="text-xl flex items-center gap-2"><FileText className="h-5 w-5 text-indigo-600" />How to Apply for New York Business Grants — Complete Walkthrough</CardTitle></CardHeader>
                                <CardContent className="text-gray-700">
                                    <p className="mb-6 leading-relaxed">
                                        New York's grant ecosystem requires navigating multiple agencies — ESD for major incentives, SUNY RF for Pre-Seed,
                                        NYSERDA for clean energy, and Regional REDCs for discretionary local funding. The most common mistake is applying
                                        only to ESD without engaging the regional council for your area. Here's a complete walkthrough:
                                    </p>
                                    <div className="space-y-4">
                                        {[
                                            { step: "1", title: "Determine Your Regional Economic Development Council", desc: "New York has 10 REDCs: Western NY, Finger Lakes, Southern Tier, Central NY, Mohawk Valley, North Country, Capital Region, Mid-Hudson, NYC, and Long Island. Each council publishes an annual Consolidated Funding Application (CFA) call — typically in spring — where businesses apply for regional economic development grants, loans, and tax credits. Register at nys.gov/redc and follow your regional REDC for the annual CFA announcement. Missing this annual window means waiting a full year for the next opportunity." },
                                            { step: "2", title: "Contact ESD Before Any Hiring or Investment Decisions for Excelsior", desc: "Empire State Development's Business Attraction team (1-800-STATE-NY) offers free 30-minute consultations to determine Excelsior eligibility. Contact them before you hire your first qualifying employee, sign any lease expansion, or announce any capital investment plans. The ESD team can also assess whether your business and industry qualify for the Jobs Creation Tax Credit, R&D Credit, or Investment Credit components of Excelsior — each has different eligibility and value calculations." },
                                            { step: "3", title: "Identify Your START-UP NY Zone and Apply Through the Campus", desc: "Go to startup.ny.gov/campuses to find every designated START-UP NY zone in New York by county and campus. Each zone lists the contact for the on-campus START-UP NY administrator. Contact them directly — not ESD. The campus administrator will assess alignment with the university's academic mission, help you structure a qualifying business plan, and co-submit your application to ESD for state approval. Campus administrators are motivated to help because approved businesses strengthen their academic-industry partnerships." },
                                            { step: "4", title: "Apply for the Pre-Seed Fund Through Your Regional SUNY Accelerator", desc: "The NYS Pre-Seed Matching Fund is delivered through regional SUNY technology accelerators: SUNY Research Foundation offices in Albany, Buffalo, Stony Brook, Binghamton, and other locations. Find your nearest accelerator at rfsuny.org. You'll need: a completed NY business entity, documented qualifying private investment (term sheet or signed agreement), technology description, team bios, and a commercialization plan. Applications are reviewed on a rolling basis but with quarterly funding allocation decisions." },
                                            { step: "5", title: "For Clean Energy — Apply to NYSERDA Before NY Green Bank", desc: "For clean energy companies, the standard sequence is: NYSERDA Cleantech Program grant (smaller, for development-stage companies) → NY Green Bank financing (larger, for commercial-stage projects needing $1M+). NYSERDA's CleanTech Program at nyserda.ny.gov/programs reviews applications quarterly. Contact an NYSERDA program manager first — they'll assess whether your project is better suited for a NYSERDA grant (if early stage) or a NY Green Bank financing referral (if commercial-scale). NYSERDA and NY Green Bank coordinate regularly and often package both for the same company." },
                                            { step: "6", title: "Gather Standard NY Grant Documentation Package", desc: "Every ESD program requires a standard documentation set. Prepare in advance: NY State business registration certificate (from NYS Division of Corporations), 3 years of financial statements or CPA-reviewed financials for companies under 5 years, 3 years of federal corporate tax returns, a detailed project description with budget and timeline, your planned job creation or retention schedule with titles and wage levels, and a description of how your business qualifies for the target industry sector. Having this package ready means applications that take others 6 weeks can be completed in 1 week." },
                                        ].map((item) => (
                                            <div key={item.step} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                                                <div className="h-8 w-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-bold shrink-0">{item.step}</div>
                                                <div><div className="font-semibold text-gray-900 mb-1">{item.title}</div><div className="text-sm text-gray-600 leading-relaxed">{item.desc}</div></div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Common Mistakes */}
                            <Card className="border-red-100 bg-red-50">
                                <CardHeader><CardTitle className="text-xl flex items-center gap-2 text-red-900"><AlertCircle className="h-5 w-5 text-red-600" />5 Common Mistakes NY Businesses Make with State Grants</CardTitle></CardHeader>
                                <CardContent className="text-red-900 space-y-4">
                                    {[
                                        { n: "1", m: "Missing the Annual REDC Consolidated Funding Application Window", d: "Each of New York's 10 Regional Economic Development Councils opens its Consolidated Funding Application once per year — typically in spring. This is the primary pathway to regional economic development grants of $50K–$2M. Businesses that don't register and monitor their regional REDC wait a full calendar year for the next opportunity. Set calendar reminders for March–April each year and register at nys.gov/redc early to receive notifications." },
                                        { n: "2", m: "Applying to Excelsior or START-UP NY After the Business Decision is Made", d: "Both of New York's biggest programs — START-UP NY and Excelsior — require pre-approval before you begin the activities they're designed to incentivize. START-UP NY approval must be in hand before you move into the zone. Excelsior pre-approval must precede any hiring or investment. Post-activity retroactive applications are never accepted. The state's position is logical: if you've already made the decision without the incentive, the incentive isn't needed to influence your behavior." },
                                        { n: "3", m: "Not Using the REDC's Consolidated Funding Application to Bundle Multiple Programs", d: "The Consolidated Funding Application allows businesses to apply for multiple state funding programs simultaneously through a single application: Excelsior tax credits, Regional economic development grants, ESD capital grants, and REDC discretionary awards can all be requested in one submission. Many businesses apply separately to each program, spending 3–4x the time and often missing synergistic opportunities that REDC staff are eager to bundle for strong applicants." },
                                        { n: "4", m: "Overlooking Federal SBIR Matching Opportunities with NY State Programs", d: "New York State programs and federal SBIR/STTR programs are complementary, not competitive. An NSF SBIR Phase I award is frequently used as the 'private investment match' for the NYS Pre-Seed Fund, doubling its value. SBIR-funded R&D activity also generates Excelsior R&D Tax Credits, since 50% of your federal R&D credit translates into additional NY state credits. Companies that treat these as separate ecosystems leave $200K–$500K in unclaimed value annually." },
                                        { n: "5", m: "Ignoring NY Green Bank Because the Company is 'Not Big Enough'", d: "NY Green Bank gets perceived as a program for large utilities and solar farms. In reality, it provides equity co-investment starting at $1M for early-commercial-stage clean energy companies — a stage where most cleantech startup investors are not yet active. Clean energy hardware companies (EV charging, battery storage, heat pump manufacturers) should engage NY Green Bank at the moment they're securing their first commercial customer, not waiting until they're revenue-profitable. The earlier you engage, the more patient the capital structure NY Green Bank can offer." },
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
                                <CardHeader><CardTitle className="text-xl flex items-center gap-2 text-amber-800"><Lightbulb className="h-5 w-5 text-amber-600" />Expert Funding Strategy for New York Businesses</CardTitle></CardHeader>
                                <CardContent className="text-amber-900 space-y-4">
                                    <div className="bg-white rounded-lg p-4 border border-amber-200">
                                        <div className="font-semibold mb-2">💡 The START-UP NY + SBIR Combination for Deep Tech Startups</div>
                                        <p className="text-sm leading-relaxed">For deep tech founders, the sequence is: license university IP → apply for Pre-Seed Match ($100–$150K) → secure START-UP NY zone status (zero taxes for 10 years) → apply for NSF or NIH SBIR Phase I ($305K) → use Phase I results to win Excelsior R&D Credits (50% of federal R&D credit applied as NY state credit). This sequence can produce $800K–$1.2M in non-dilutive capital and tax savings in the first 2 years — enabling product development to revenue without the equity dilution that forces premature commercialization.</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 border border-amber-200">
                                        <div className="font-semibold mb-2">💡 Clean Energy Companies: NYSERDA → NY Green Bank → Federal ITC Stack</div>
                                        <p className="text-sm leading-relaxed">The optimal clean energy stack: NYSERDA CleanTech grant for development stage ($100K–$2M) → NY Green Bank debt or equity for commercial launch ($1M–$10M) → Federal 30% Clean Investment Tax Credit on qualifying capital. For a clean energy company deploying $5M in qualifying equipment, this stack can cover $4M+ of the total project cost through grants, below-market financing, and refundable tax credits — allowing a capital-efficient commercial launch that preserves equity for growth rather than project development.</p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* FAQ */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Frequently Asked Questions: New York Business Grants 2026</h2>
                                <p className="text-gray-600 mb-6">The most common questions we receive from NY founders, CFOs, and business owners researching state funding options.</p>
                                <div className="space-y-4">
                                    {[
                                        { q: "Is START-UP NY available to for-profit businesses, or only to university spin-offs?", a: "START-UP NY is available to any for-profit business that meets three criteria: the business must be newly established in New York or relocating to NY from out-of-state (existing NY businesses moving within the state typically don't qualify, as no net new jobs are created), the business must be located in or adjacent to a qualifying SUNY/CUNY/private college campus zone, and the business must be in alignment with the campus's academic mission — interpreted broadly to include tech companies near tech universities, biotech near life sciences schools, etc. Many companies that assume they don't qualify actually do — the alignment test is softer than most businesses expect." },
                                        { q: "How does New York compare to Texas or Florida for startup incentives?", a: "Each state excels in different areas. Texas beats New York for net tax savings (no state income tax vs. NY's graduated rates up to 10.9%), lower real estate costs, and deal-closing speed through the Texas Enterprise Fund. Florida beats New York for warm weather recruitment and export-focused incentives. But New York beats both for startup ecosystems (NYC is the #1 US startup city by venture funding), university research partnerships (20+ major research universities), federal SBIR access (NY companies win $600M+ annually vs. $400M for Florida and $300M for Texas), and clean energy investment (NY Green Bank is unmatched nationally). Choose based on your specific industry, stage, and talent needs — not a general ranking." },
                                        { q: "Can a company in New York City access upstate NY grant programs?", a: "Geographic eligibility matters for most NY programs. NYC-based companies access NYC EDC and NYC-specific ESD programs. Upstate regional REDC grants are limited to businesses located within the relevant region. Excelsior Jobs and START-UP NY are statewide programs accessible anywhere in NY, but the value of START-UP NY is higher upstate where more zone capacity exists. Companies with multiple NY locations can sometimes access both regional pools simultaneously — a manufacturing facility upstate paired with a sales/marketing office in NYC — if genuine operations exist in both locations." },
                                        { q: "What industries does New York State prioritize for Excelsior Tax Credits?", a: "New York's Excelsior-eligible sectors include: Manufacturing, Scientific Research & Development, Software Development, Agriculture, Financial Services, Back-Office Operations, Distribution, and certain Entertainment industries. The common thread is that these are 'traded sector' businesses — they generate revenue primarily from outside New York, bringing external income into the state's economy. Retail, restaurants, hospitals, and utilities are generally not eligible because their revenue is captured locally, not imported from outside NY. If your industry isn't listed, ESD staff can assess whether your specific business model qualifies under the 'traded sector' test." },
                                        { q: "How long does it take to receive Excelsior Tax Credits after approval?", a: "Excelsior credits are disbursed annually based on milestone performance, beginning one year after you reach your committed job creation targets. If you receive ESD pre-approval in January 2026, create 50 qualifying jobs by December 2026, and verify those jobs through an annual milestone report in Q1 2027, you'll receive your first Job Creation Credit payment in mid-2027 — approximately 18 months after pre-approval. Credits continue annually for up to 10 years as long as you maintain the qualifying job count and wage levels. The Investment and R&D credit components have slightly different timing tied to capital deployment and R&D activity cycles." },
                                        { q: "Is there a New York grant specifically for women-owned or minority-owned businesses?", a: "New York has several relevant programs. The NY State Minority- and Women-Owned Business Enterprise (MWBE) certification, administered by Empire State Development, provides access to state contract set-asides where a percentage of all state procurement is reserved for certified MWBEs. This isn't a direct grant but represents significant recurring revenue opportunity. For direct grants, the NYC Small Business Services (SBS) operates the NYC SBS Grant Program with specific rounds targeting MWBE-certified businesses in NYC. Several REDCs also have MWBE-focused grant pools within their discretionary allocations. Contact your regional REDC and NYC SBS directly for current open opportunities." },
                                        { q: "Can a company relocating from another state to New York qualify for START-UP NY?", a: "Yes — in fact, relocating companies from other states are among the primary intended beneficiaries of START-UP NY. The program was explicitly designed to attract companies from outside New York (particularly from expensive Silicon Valley and Boston markets) by offering a 10-year period of zero New York taxation. The relocation must create net new New York jobs — you cannot simply bring your existing workforce across the state border and claim the incentive for pre-existing employees. New hires made after establishing in the START-UP NY zone are the qualifying employees whose income benefits from the personal income tax elimination." },
                                        { q: "What is the Consolidated Funding Application and how does it differ from applying to ESD directly?", a: "The Consolidated Funding Application (CFA) is New York's unified annual grant application process managed through the Regional Economic Development Councils. It allows businesses to apply simultaneously for multiple state programs — ESD capital grants, Excelsior tax credits, regional REDC discretionary awards, and sometimes NYSERDA programs — in a single submission reviewed by your regional council. Direct ESD applications are for specific programs (Excelsior only, for example) at any time of year. The CFA is more powerful for capital projects requiring multiple funding sources, but only opens annually (typically spring). If your project can wait for the next CFA cycle, the consolidated approach often yields larger total incentive packages than individual program applications." },
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
                            <Card className="bg-indigo-700 text-white">
                                <CardContent className="pt-6">
                                    <Star className="h-8 w-8 text-yellow-300 mb-3" />
                                    <h3 className="font-bold text-lg mb-2">Free NY Grant Consultation</h3>
                                    <p className="text-indigo-100 text-sm mb-4">Our state incentives specialists help NY businesses navigate ESD, REDC, and federal programs — identifying every dollar available for your specific situation.</p>
                                    <Link href="/contact"><Button className="w-full bg-white text-indigo-700 hover:bg-indigo-50">Get Free Matching <ArrowRight className="h-4 w-4 ml-1" /></Button></Link>
                                </CardContent>
                            </Card>
                            <NewsletterSignup variant="sidebar" />
                            <Card>
                                <CardHeader><CardTitle className="text-lg">Key New York Agency Contacts</CardTitle></CardHeader>
                                <CardContent className="text-sm space-y-3">
                                    <div><div className="font-semibold">Empire State Development</div><div className="text-gray-500">1-800-STATE-NY | esd.ny.gov</div></div>
                                    <div><div className="font-semibold">START-UP NY Program</div><div className="text-gray-500">startup.ny.gov</div></div>
                                    <div><div className="font-semibold">NYSERDA (Clean Energy)</div><div className="text-gray-500">nyserda.ny.gov</div></div>
                                    <div><div className="font-semibold">NY Green Bank</div><div className="text-gray-500">greenbank.ny.gov</div></div>
                                    <div><div className="font-semibold">SUNY Research Foundation (Pre-Seed)</div><div className="text-gray-500">rfsuny.org/preseed</div></div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader><CardTitle className="text-lg">Related Resources</CardTitle></CardHeader>
                                <CardContent>
                                    <div className="space-y-2 text-sm">
                                        <Link href="/usa/federal-grants" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> Federal Grants for NY Businesses</Link>
                                        <Link href="/usa/florida" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> Florida Business Grants</Link>
                                        <Link href="/usa/texas" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> Texas Business Grants</Link>
                                        <Link href="/blog/sbir-sttr-complete-guide" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> NSF SBIR Complete Guide</Link>
                                        <Link href="/grant-finder" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> AI Grant Finder Tool</Link>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    <div className="mb-8">
                        <NewsletterSignup title="New York Business Grant Updates" description="We monitor 20+ NY State incentive programs and alert you to REDC CFA openings, Excelsior program updates, START-UP NY zone capacity, and NYSERDA grant intakes." />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
