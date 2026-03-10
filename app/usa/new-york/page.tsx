import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { GrantComparisonTable } from "@/components/grant-comparison-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, DollarSign, Users, TrendingUp, CheckCircle, Clock, ArrowRight, Building, Lightbulb, FileText, AlertCircle, Star } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import type { Grant } from "@/lib/grants-data"
import ShortAnswerBox from "@/components/blog/ShortAnswerBox"
import EEATBadge from "@/components/blog/EEATBadge"
import EligibleCheck from "@/components/blog/EligibleCheck"

export const metadata: Metadata = {
    title: "New York Business Grants 2026 | NY State Funding Programs & Startup Incentives Guide",
    description:
        "Complete guide to New York business grants and state funding in 2026. START-UP NY tax-free zones, NYSERDA clean energy grants up to $350K, Pre-Seed Matching Fund $50K–$250K, Empire State Development programs, and $1B+ in NYC tech funding opportunities.",
    keywords:
        "New York business grants 2026, NY state funding, startup grants New York, START-UP NY, NYSERDA grants, Empire State Development, NYC tech grants, NY SBIR grants, New York small business funding",
    alternates: {
        canonical: "https://www.fsidigital.ca/usa/new-york",
    },
    openGraph: {
        title: "New York Business Grants 2026 | Complete NY Funding Guide",
        description: "Discover New York's business incentives, clean energy grants, and startup funding programs for 2026.",
        url: "https://www.fsidigital.ca/usa/new-york",
    },
}

const newYorkGrants: Grant[] = [
    {
        id: "ny-startup-ny",
        name: "START-UP NY Program",
        fundingMin: 0,
        fundingMax: 5000000,
        eligibility: ["NY university/college affiliated businesses", "New or relocating companies", "Innovative businesses"],
        deadline: "Rolling",
        applicationLink: "https://esd.ny.gov/startup-ny-program",
        description: "10 years of no taxes — zero income, business, sales, or property taxes — for businesses operating in tax-free zones on or near NY college/university campuses.",
        country: "USA",
        region: "New York",
        category: "Tax Incentive",
        agency: "Empire State Development",
        status: "Active",
        tags: ["Tax-Free", "University Partnership", "Innovation"],
        requirements: ["University/college sponsorship", "Job creation in NY", "Innovation focus", "Not competing with local businesses"],
        lastUpdated: "2025-01-20"
    },
    {
        id: "ny-nyserda-clean",
        name: "NYSERDA Clean Energy Business Programs",
        fundingMin: 25000,
        fundingMax: 350000,
        eligibility: ["Clean energy businesses", "Building owners", "Manufacturers reducing energy use"],
        deadline: "Rolling",
        applicationLink: "https://www.nyserda.ny.gov/businesses",
        description: "NYSERDA funds clean energy technology development, manufacturing efficiency, and building decarbonization through grants, technical assistance, and low-interest financing.",
        country: "USA",
        region: "New York",
        category: "Clean Energy",
        agency: "NYSERDA",
        status: "Active",
        tags: ["Clean Energy", "Manufacturing", "Buildings"],
        requirements: ["NY-based operations", "Documented energy reduction plan", "Matching commitment"],
        lastUpdated: "2025-01-20"
    },
    {
        id: "ny-preseed",
        name: "Pre-Seed Matching Fund",
        fundingMin: 50000,
        fundingMax: 250000,
        eligibility: ["NY technology startups", "Companies with existing private investment", "Life sciences, cleantech, digital tech"],
        deadline: "Rolling through regional Tech Hubs",
        applicationLink: "https://esd.ny.gov/preseed-matching-fund",
        description: "Matches private investment 1:1 for early-stage NY technology companies, providing $50K–$250K in state co-investment alongside private angel/VC capital.",
        country: "USA",
        region: "New York",
        category: "Startup Funding",
        agency: "Empire State Development",
        status: "Active",
        tags: ["Co-investment", "Startup", "Technology"],
        requirements: ["NY-incorporated", "Raised qualifying private investment", "Tech focus", "Apply through regional Tech Hub"],
        lastUpdated: "2025-01-20"
    },
    {
        id: "ny-excelsior",
        name: "Excelsior Jobs Program",
        fundingMin: 5000,
        fundingMax: 10000000,
        eligibility: ["Businesses in target industries creating NY jobs", "Companies with 10+ new full-time positions"],
        deadline: "Applications accepted year-round",
        applicationLink: "https://esd.ny.gov/excelsior-jobs-program",
        description: "Tax credits worth up to $1.5B annually for NY companies in strategic sectors that create and maintain well-paying jobs in New York State.",
        country: "USA",
        region: "New York",
        category: "Tax Credit",
        agency: "Empire State Development",
        status: "Active",
        tags: ["Job Creation", "Tax Credits", "Strategic Industries"],
        requirements: ["10+ new FT jobs", "Average annual salary", "Target industry", "Multi-year commitment"],
        lastUpdated: "2025-01-20"
    },
    {
        id: "ny-mwbe",
        name: "NY MWBE Business Development Programs",
        fundingMin: 10000,
        fundingMax: 150000,
        eligibility: ["Minority-owned businesses", "Women-owned businesses", "NY-certified MWBE firms"],
        deadline: "Rolling",
        applicationLink: "https://esd.ny.gov/doing-business-ny/mwbe/mwbe-programs",
        description: "Targeted grants, technical assistance, and contract opportunities for Minority and Women-Owned Business Enterprises certified in New York.",
        country: "USA",
        region: "New York",
        category: "MWBE",
        agency: "Empire State Development",
        status: "Active",
        tags: ["Minority Business", "Women-Owned", "MWBE"],
        requirements: ["NY MWBE certification", "NY-based operations", "Demonstrated business need"],
        lastUpdated: "2025-01-20"
    },
]

export default function NewYorkGrantsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
            <Header />

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-purple-700 via-purple-800 to-indigo-900 text-white py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="flex items-center justify-center gap-2 mb-6">
                            <MapPin className="h-6 w-6 text-purple-300" />
                            <Badge className="bg-purple-500/30 text-purple-100 border-purple-400">
                                New York State Funding Guide 2026
                            </Badge>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                            New York Business Grants & Incentives 2026
                        </h1>
                        <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                            New York offers one of the most comprehensive business incentive ecosystems in the USA —
                            10-year tax-free zones through START-UP NY, NYSERDA clean energy grants up to $350K,
                            Pre-Seed Matching Funds of $50K–$250K, and $1.5B+ in annual Excelsior Job Credits for
                            high-growth companies.
                        </p>
                        <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
                            <div className="bg-white/10 rounded-xl p-4">
                                <div className="text-3xl font-bold">$1.5B+</div>
                                <div className="text-purple-200 text-sm mt-1">Annual Excelsior credits</div>
                            </div>
                            <div className="bg-white/10 rounded-xl p-4">
                                <div className="text-3xl font-bold">10 yrs</div>
                                <div className="text-purple-200 text-sm mt-1">Tax-free via START-UP NY</div>
                            </div>
                            <div className="bg-white/10 rounded-xl p-4">
                                <div className="text-3xl font-bold">$350K</div>
                                <div className="text-purple-200 text-sm mt-1">NYSERDA clean energy grants</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* EEAT Components */}
            <section className="py-6 bg-emerald-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto space-y-4">
                        <ShortAnswerBox content="Yes — New York businesses can access $1.5B+ annually through START-UP NY tax-free zones (10 years, zero taxes), NYSERDA clean energy grants (up to $350K), the Pre-Seed Matching Fund ($50K–$250K for tech startups), and Excelsior Job Credits. Federal SBIR programs add $1B+ annually for NY companies in life sciences, AI, and defense." />
                        <EEATBadge authorName="Ashwani K." authorImage="/ash-author-1.jpg" date="2026-03-01" />
                        <EligibleCheck />
                    </div>
                </div>
            </section>

            <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">

                    {/* Quick Navigation */}
                    <div className="flex flex-wrap gap-2 mb-10">
                        {["Top Programs", "How to Apply", "Eligibility", "NYC vs Upstate", "FAQ"].map((item) => (
                            <Badge key={item} variant="outline" className="cursor-pointer hover:bg-purple-50 px-3 py-1.5 text-sm">
                                {item}
                            </Badge>
                        ))}
                    </div>

                    {/* Grant Comparison Table */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">New York Business Grant Programs Comparison 2026</h2>
                        <GrantComparisonTable grants={newYorkGrants} title="New York Business Grants Comparison" />
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8 mb-12">
                        <div className="lg:col-span-2 space-y-10">

                            {/* Overview */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl flex items-center gap-2">
                                        <Building className="h-5 w-5 text-purple-600" />
                                        New York's Business Funding Landscape 2026
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="text-gray-700 prose max-w-none">
                                    <p className="text-base leading-relaxed mb-4">
                                        New York State administers one of the largest and most diverse business funding ecosystems in North America.
                                        Empire State Development (ESD) is the primary agency, overseeing $5B+ in annual economic development programs
                                        spanning tax incentives, direct grants, co-investment funds, and export assistance.
                                    </p>
                                    <p className="text-base leading-relaxed mb-4">
                                        What distinguishes New York from other states is the <strong>concentration of industry-specific programs</strong>:
                                        NYSERDA for clean energy, NY Green Bank for climate finance, the Life Sciences Initiative ($620M committed),
                                        and dedicated programs for FinTech, AgTech, and advanced manufacturing through Regional Economic Development
                                        Councils (REDCs). Each of New York's 10 economic regions has a Regional Council that allocates its own
                                        competitive grant funding annually.
                                    </p>
                                    <p className="text-base leading-relaxed">
                                        For startups specifically, New York is one of only three states with a structured <strong>co-investment
                                            matching fund</strong> (Pre-Seed Matching Fund). This 1:1 match program is ideal for companies that have
                                        raised angel or pre-seed VC capital and want to extend their runway without additional dilution.
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Program Deep Dives */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Top NY Business Grant Programs Explained</h2>
                                <div className="space-y-6">

                                    <Card className="border-l-4 border-l-purple-500">
                                        <CardHeader>
                                            <div className="flex items-start justify-between">
                                                <CardTitle className="text-lg">1. START-UP NY — 10-Year Tax-Free Zones</CardTitle>
                                                <Badge className="bg-purple-100 text-purple-800 shrink-0 ml-2">Zero Taxes, 10 Years</Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="text-gray-700 space-y-3">
                                            <p>
                                                START-UP NY is the most generous long-term incentive NY offers to growth companies. Businesses approved
                                                for a tax-free zone on or adjacent to a NY college campus pay <strong>zero income tax, zero business tax,
                                                    zero sales tax, and zero property tax</strong> for 10 years. Employees also pay no personal income tax
                                                for the first 5 years.
                                            </p>
                                            <div className="grid sm:grid-cols-2 gap-4 mt-3">
                                                <div className="bg-purple-50 rounded-lg p-3">
                                                    <div className="font-semibold text-purple-900 text-sm mb-1">Eligible Sectors</div>
                                                    <div className="text-purple-700 text-sm">Technology, biotech, manufacturing, green energy, software — must align with university's academic mission</div>
                                                </div>
                                                <div className="bg-green-50 rounded-lg p-3">
                                                    <div className="font-semibold text-green-900 text-sm mb-1">Duration</div>
                                                    <div className="text-green-700 text-sm">10 years for business, 5 years personal income tax-free for new hires</div>
                                                </div>
                                            </div>
                                            <p className="text-sm text-amber-700 bg-amber-50 rounded-lg p-3">
                                                <strong>⚠️ Key Requirement:</strong> You must physically operate within a designated START-UP NY campus zone.
                                                Contact your nearest SUNY, CUNY, or private college to identify participating campuses near you.
                                            </p>
                                        </CardContent>
                                    </Card>

                                    <Card className="border-l-4 border-l-green-500">
                                        <CardHeader>
                                            <div className="flex items-start justify-between">
                                                <CardTitle className="text-lg">2. NYSERDA Clean Energy Business Grants</CardTitle>
                                                <Badge className="bg-green-100 text-green-800 shrink-0 ml-2">Up to $350K</Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="text-gray-700 space-y-3">
                                            <p>
                                                The New York State Energy Research and Development Authority (NYSERDA) offers grants AND low-interest
                                                financing for businesses focused on clean energy, efficiency, or electrification. The program is
                                                exceptionally broad — covering solar, EV charging infrastructure, building retrofits, manufacturing
                                                energy efficiency, and clean energy R&D.
                                            </p>
                                            <ul className="space-y-2 text-sm">
                                                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" /><span><strong>NY Clean Energy Fund:</strong> Grants for clean energy technology development ($25K–$350K)</span></li>
                                                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" /><span><strong>FlexTech Program:</strong> Cost-shared technical studies for energy efficiency projects</span></li>
                                                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" /><span><strong>NY Green Bank:</strong> Low-cost loans for clean energy deals ($1M–$100M+)</span></li>
                                                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" /><span><strong>PON Solicitations:</strong> Competitive R&D grants for clean energy innovation</span></li>
                                            </ul>
                                        </CardContent>
                                    </Card>

                                    <Card className="border-l-4 border-l-blue-500">
                                        <CardHeader>
                                            <div className="flex items-start justify-between">
                                                <CardTitle className="text-lg">3. Pre-Seed Matching Fund</CardTitle>
                                                <Badge className="bg-blue-100 text-blue-800 shrink-0 ml-2">$50K–$250K</Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="text-gray-700 space-y-3">
                                            <p>
                                                NY's Pre-Seed Matching Fund is a landmark program for early-stage technology startups.
                                                For every dollar of qualified private investment raised, the state provides a matching dollar —
                                                up to $250K. This extends your runway significantly without issuing additional equity (the state
                                                takes a small royalty repayment arrangement, not equity).
                                            </p>
                                            <div className="grid sm:grid-cols-3 gap-3 my-3">
                                                <div className="text-center bg-blue-50 rounded-lg p-3">
                                                    <div className="text-2xl font-bold text-blue-700">1:1</div>
                                                    <div className="text-xs text-blue-600 mt-1">Matching ratio</div>
                                                </div>
                                                <div className="text-center bg-blue-50 rounded-lg p-3">
                                                    <div className="text-2xl font-bold text-blue-700">$250K</div>
                                                    <div className="text-xs text-blue-600 mt-1">Maximum state match</div>
                                                </div>
                                                <div className="text-center bg-blue-50 rounded-lg p-3">
                                                    <div className="text-2xl font-bold text-blue-700">No Equity</div>
                                                    <div className="text-xs text-blue-600 mt-1">Royalty repayment only</div>
                                                </div>
                                            </div>
                                            <p className="text-sm">
                                                Apply through the NY Tech Hub closest to your operations. Eligible sectors: life sciences,
                                                clean technology, advanced manufacturing, digital tech, and agtech.
                                            </p>
                                        </CardContent>
                                    </Card>

                                    <Card className="border-l-4 border-l-orange-500">
                                        <CardHeader>
                                            <div className="flex items-start justify-between">
                                                <CardTitle className="text-lg">4. Excelsior Jobs Program Tax Credits</CardTitle>
                                                <Badge className="bg-orange-100 text-orange-800 shrink-0 ml-2">$1.5B+ pool</Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="text-gray-700 space-y-3">
                                            <p>
                                                The Excelsior Jobs Program provides refundable tax credits to businesses in strategic industries
                                                that create and maintain jobs in NY. Credits include a Job Creation Credit (6.85% of wages for
                                                new employees), Investment Tax Credit (2% of qualified investments), and R&D Credit (50% of
                                                federal R&D credit allowed against NY taxes).
                                            </p>
                                            <div className="bg-gray-50 rounded-lg p-4 mt-3">
                                                <div className="font-semibold mb-2 text-sm">Target Industries:</div>
                                                <div className="flex flex-wrap gap-2">
                                                    {["Software/IT", "Biotech/Life Sciences", "Financial Services", "Clean Energy", "Distribution Logistics", "Agriculture/Food", "Manufacturing"].map(s => (
                                                        <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>

                            {/* NYC vs Upstate */}
                            <Card className="border-blue-200 bg-blue-50">
                                <CardHeader>
                                    <CardTitle className="text-xl text-blue-900">NYC vs. Upstate New York: Which Programs Apply?</CardTitle>
                                </CardHeader>
                                <CardContent className="text-blue-900">
                                    <div className="grid md:grid-cols-2 gap-6 text-sm">
                                        <div>
                                            <div className="font-bold mb-3 flex items-center gap-2"><MapPin className="h-4 w-4" /> New York City (5 Boroughs)</div>
                                            <ul className="space-y-2">
                                                <li className="flex items-start gap-2"><CheckCircle className="h-3.5 w-3.5 text-blue-600 mt-0.5 shrink-0" /><span>START-UP NY zones at CUNY campuses</span></li>
                                                <li className="flex items-start gap-2"><CheckCircle className="h-3.5 w-3.5 text-blue-600 mt-0.5 shrink-0" /><span>NYC Small Business Services (SBS) grants</span></li>
                                                <li className="flex items-start gap-2"><CheckCircle className="h-3.5 w-3.5 text-blue-600 mt-0.5 shrink-0" /><span>NYSERDA NYC programs (Con Edison efficiency)</span></li>
                                                <li className="flex items-start gap-2"><CheckCircle className="h-3.5 w-3.5 text-blue-600 mt-0.5 shrink-0" /><span>NY MWBE certification (major contract set-asides)</span></li>
                                                <li className="flex items-start gap-2"><CheckCircle className="h-3.5 w-3.5 text-blue-600 mt-0.5 shrink-0" /><span>NYC EDC tech sector programs</span></li>
                                            </ul>
                                        </div>
                                        <div>
                                            <div className="font-bold mb-3 flex items-center gap-2"><MapPin className="h-4 w-4" /> Upstate / Western NY</div>
                                            <ul className="space-y-2">
                                                <li className="flex items-start gap-2"><CheckCircle className="h-3.5 w-3.5 text-blue-600 mt-0.5 shrink-0" /><span>Buffalo / Rochester REDC competitive grants</span></li>
                                                <li className="flex items-start gap-2"><CheckCircle className="h-3.5 w-3.5 text-blue-600 mt-0.5 shrink-0" /><span>STAMP megasite incentives (Genesee Co.)</span></li>
                                                <li className="flex items-start gap-2"><CheckCircle className="h-3.5 w-3.5 text-blue-600 mt-0.5 shrink-0" /><span>Local development corporation microloans</span></li>
                                                <li className="flex items-start gap-2"><CheckCircle className="h-3.5 w-3.5 text-blue-600 mt-0.5 shrink-0" /><span>North Country agribusiness grants</span></li>
                                                <li className="flex items-start gap-2"><CheckCircle className="h-3.5 w-3.5 text-blue-600 mt-0.5 shrink-0" /><span>CNY Rising (Syracuse) cluster funding</span></li>
                                            </ul>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* How to Apply */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl flex items-center gap-2">
                                        <FileText className="h-5 w-5 text-purple-600" />
                                        How to Apply for New York Business Grants
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="text-gray-700">
                                    <div className="space-y-4">
                                        {[
                                            { step: "1", title: "Determine Your Region's REDC", desc: "NY's 10 Regional Economic Development Councils (REDCs) each administer their own grant competitions annually. Identify which REDC covers your county (e.g., Western NY, Finger Lakes, Capital Region) at esd.ny.gov." },
                                            { step: "2", title: "Register for NY Business Express", desc: "All ESD incentive applications start at ny.gov/nybe (NY Business Express). Register your business, complete your profile, and the system will recommend programs you may qualify for." },
                                            { step: "3", title: "Gather Required Documents", desc: "Standard requirements: NY business registration, 3 years financials, federal tax returns, list of current NY employees with wage data, 3-year business plan, and project budget." },
                                            { step: "4", title: "Contact Program Officer Before Submitting", desc: "ESD program officers strongly encourage a pre-application call. This 15-minute conversation can clarify your eligibility, improve your application, and can prevent rejections on technicalities." },
                                            { step: "5", title: "Submit & Track Performance Milestones", desc: "NY incentives are performance-based. Credits and grants are disbursed as you create jobs, complete training, or hit project milestones. Set up internal tracking from day one." },
                                        ].map((item) => (
                                            <div key={item.step} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                                                <div className="h-8 w-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-bold shrink-0">{item.step}</div>
                                                <div>
                                                    <div className="font-semibold text-gray-900 mb-1">{item.title}</div>
                                                    <div className="text-sm text-gray-600">{item.desc}</div>
                                                </div>
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
                                        Expert Strategy: Getting the Most from NY Funding
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="text-amber-900 space-y-4">
                                    <div className="bg-white rounded-lg p-4 border border-amber-200">
                                        <div className="font-semibold mb-2">💡 Combine Pre-Seed Match + Federal SBIR</div>
                                        <p className="text-sm">The Pre-Seed Matching Fund is designed to layer with federal SBIR. Raise $250K from angels (qualifying private investment), get the $250K state match, then win a $305K NSF SBIR Phase I. That's $800K in runway on roughly $250K of equity diluted.</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 border border-amber-200">
                                        <div className="font-semibold mb-2">💡 Apply to REDC Competitions in September</div>
                                        <p className="text-sm">NY's Regional Economic Development Council (REDC) annual competition opens each summer with awards announced in December. Historically, $750M+ is allocated each round. The deadline is August/September — start your REDC application by June.</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 border border-amber-200">
                                        <div className="font-semibold mb-2">💡 START-UP NY Works Best for Relocators</div>
                                        <p className="text-sm">The 10-year tax-free benefit of START-UP NY is most valuable for companies relocating from high-tax states or countries. A profitable tech company relocating from California can save $500K–$2M in state taxes over 10 years. Contact ESD's relocation team early — approvals take 3–6 months.</p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* FAQ */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions: NY Business Grants</h2>
                                <div className="space-y-4">
                                    {[
                                        { q: "Is there a minimum company size for NY business incentives?", a: "Most ESD programs require at least 1 full-time employee and a demonstrated plan to hire in New York. The Pre-Seed Fund targets early-stage companies with as few as 2–5 employees. START-UP NY has no minimum size — even solo founders can apply if operating in a university zone. Excelsior requires 10+ new NY jobs." },
                                        { q: "Can I apply for NY grants if I'm not headquartered in New York?", a: "Yes, for most programs, as long as you establish a meaningful NY presence (employees, operations, office) and commit to creating NY jobs. ESD frequently approves out-of-state companies expanding into NY if they can demonstrate economic impact to the state." },
                                        { q: "What's the most competitive NY grant to win?", a: "The REDC Capital Fund competitive grants are the most competitive — typically 300+ applications competing for 100 awards regionally. NYSERDA PON solicitations are also very competitive. The Pre-Seed Matching Fund is comparatively accessible since it leverages private investment you've already raised." },
                                        { q: "How does NY's Life Sciences Initiative work?", a: "NY's $620M Life Sciences Initiative (administered through ESD and SUNY) funds biotech company relocations, lab infrastructure, workforce training, and research partnerships. The initiative provides direct capital grants for lab build-outs ($500K–$5M) and co-investment for life sciences startups. Apply through NY BioHud Valley or NY Genome Center networks." },
                                        { q: "Are there grants specifically for NYC small businesses?", a: "Yes — NYC Small Business Services (SBS) offers the NYC Business Solutions program, which provides free courses, legal advice, and marketing assistance. NYC EDC provides direct grants and incentives for manufacturing, food production, and industrial businesses within the five boroughs. The NYC Industrial Development Agency (IDA) offers tax exemptions for qualifying businesses." },
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
                            <Card className="bg-purple-600 text-white">
                                <CardContent className="pt-6">
                                    <Star className="h-8 w-8 text-yellow-300 mb-3" />
                                    <h3 className="font-bold text-lg mb-2">Free NY Grant Matching</h3>
                                    <p className="text-purple-100 text-sm mb-4">Our grant specialists identify which NY programs you qualify for — free consultation, no commitment.</p>
                                    <Link href="/contact">
                                        <Button className="w-full bg-white text-purple-600 hover:bg-purple-50">
                                            Get Free Matching <ArrowRight className="h-4 w-4 ml-1" />
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>

                            <NewsletterSignup variant="sidebar" />

                            <Card>
                                <CardHeader><CardTitle className="text-lg">Key NY Agency Contacts</CardTitle></CardHeader>
                                <CardContent className="text-sm space-y-3">
                                    <div><div className="font-semibold">Empire State Development</div><div className="text-gray-500">esd.ny.gov | (800) 782-8369</div></div>
                                    <div><div className="font-semibold">NYSERDA</div><div className="text-gray-500">nyserda.ny.gov</div></div>
                                    <div><div className="font-semibold">NY Business Express</div><div className="text-gray-500">ny.gov/nybe</div></div>
                                    <div><div className="font-semibold">NYC Small Business Services</div><div className="text-gray-500">nyc.gov/sbs</div></div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader><CardTitle className="text-lg">Related Resources</CardTitle></CardHeader>
                                <CardContent>
                                    <div className="space-y-2 text-sm">
                                        <Link href="/usa/federal-grants" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> Federal Grants Guide</Link>
                                        <Link href="/usa/technology-startup-grants" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> Tech Startup Grants</Link>
                                        <Link href="/usa/women-entrepreneurs-grants" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> Women Entrepreneur Grants</Link>
                                        <Link href="/blog/nsf-sbir-complete-guide" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> NSF SBIR Complete Guide</Link>
                                        <Link href="/grant-finder" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> AI Grant Finder Tool</Link>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    <div className="mb-8">
                        <NewsletterSignup
                            title="Get New York Grant Updates"
                            description="Track NY REDC competition deadlines, START-UP NY campus openings, and NYSERDA PON solicitations — we monitor 20+ NY programs for you."
                        />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
