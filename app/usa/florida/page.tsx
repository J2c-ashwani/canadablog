import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { GrantComparisonTable } from "@/components/grant-comparison-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, DollarSign, Users, TrendingUp, CheckCircle, Clock, ArrowRight, Building, Lightbulb, FileText, AlertCircle, Star, Briefcase, Globe } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import type { Grant } from "@/lib/grants-data"
import ShortAnswerBox from "@/components/blog/ShortAnswerBox"
import EEATBadge from "@/components/blog/EEATBadge"
import EligibleCheck from "@/components/blog/EligibleCheck"

export const metadata: Metadata = {
    title: "Florida Business Grants 2026 | FL State Funding Programs & Incentives Guide",
    description:
        "Complete guide to Florida business grants, tax incentives, and funding programs in 2026. Florida High Tech Corridor matching grants up to $250K, Incumbent Worker Training, QTI Tax Refund, and export diversification funding for FL businesses.",
    keywords:
        "Florida business grants 2026, Florida state funding, small business grants Florida, Enterprise Florida grants, FL government grants, Florida High Tech Corridor, QTI tax refund, Incumbent Worker Training Florida, Florida SBIR, Florida startup grants",
    alternates: {
        canonical: "https://www.fsidigital.ca/usa/florida",
    },
    openGraph: {
        title: "Florida Business Grants 2026 | Complete FL Funding Guide",
        description: "Discover Florida's business incentives, research grants, and export funding programs for 2026.",
        url: "https://www.fsidigital.ca/usa/florida",
    },
}

const floridaGrants: Grant[] = [
    {
        id: "fl-hightech-corridor",
        name: "Florida High Tech Corridor Matching Grants",
        fundingMin: 25000,
        fundingMax: 250000,
        eligibility: ["Tech companies", "University partners", "23-county region businesses"],
        deadline: "Rolling",
        applicationLink: "https://floridahightech.com/matching-grants-research-program/",
        description: "Matching grants for applied research projects between industry partners and universities (UF, UCF, USF) in the 23-county High Tech Corridor region.",
        country: "USA",
        region: "Florida",
        category: "Technology",
        agency: "Florida High Tech Corridor",
        status: "Active",
        tags: ["R&D", "University Partnership", "Technology"],
        requirements: ["1:1 industry match required", "University collaboration", "Tech focus", "23-county region"],
        lastUpdated: "2025-01-20"
    },
    {
        id: "fl-export-diversification",
        name: "Florida Export Diversification & Expansion Program",
        fundingMin: 2500,
        fundingMax: 50000,
        eligibility: ["Florida manufacturers", "Service providers with exportable products", "Florida-based exporters"],
        deadline: "Rolling",
        applicationLink: "https://www.enterpriseflorida.com/export-from-florida/trade-grants/",
        description: "Grants to help Florida companies enter new international markets and participate in trade shows and missions.",
        country: "USA",
        region: "Florida",
        category: "Business Growth",
        agency: "Enterprise Florida",
        status: "Active",
        tags: ["Export", "Trade", "International Markets"],
        requirements: ["Exportable product or service", "Florida manufacturing/HQ", "Small business status (<500 employees)"],
        lastUpdated: "2025-01-20"
    },
    {
        id: "fl-job-growth",
        name: "Florida Job Growth Grant Fund",
        fundingMin: 250000,
        fundingMax: 5000000,
        eligibility: ["Public infrastructure projects", "Workforce training programs", "Local government entities"],
        deadline: "Rolling",
        applicationLink: "https://floridajobs.org/jobgrowth",
        description: "Governor-approved funding for public infrastructure and workforce training that supports private sector economic development and job creation.",
        country: "USA",
        region: "Florida",
        category: "Infrastructure",
        agency: "Florida Department of Economic Opportunity",
        status: "Active",
        tags: ["Infrastructure", "Workforce", "Economic Development"],
        requirements: ["Government entity applicant", "Demonstrated economic ROI", "Governor's Office approval", "Job creation metrics"],
        lastUpdated: "2025-01-20"
    },
    {
        id: "fl-incumbent-worker",
        name: "Incumbent Worker Training (IWT) Program",
        fundingMin: 5000,
        fundingMax: 200000,
        eligibility: ["Florida for-profit businesses", "Businesses with existing employees", "All industry sectors"],
        deadline: "Quarterly intake",
        applicationLink: "https://careersourceflorida.com/business-services/training-grants/",
        description: "Reimbursement grants to provide skills training to currently employed workers to keep Florida's workforce competitive and reduce turnover.",
        country: "USA",
        region: "Florida",
        category: "Workforce",
        agency: "CareerSource Florida",
        status: "Active",
        tags: ["Training", "Skills Upgrade", "Employee Development"],
        requirements: ["For-profit business in Florida", "1+ year in operation", "Approved training plan", "Minimum 10 trainees"],
        lastUpdated: "2025-01-20"
    },
    {
        id: "fl-qti",
        name: "Qualified Target Industry (QTI) Tax Refund",
        fundingMin: 3000,
        fundingMax: 2000000,
        eligibility: ["High-wage job creators", "Target industry sectors", "Businesses expanding in FL"],
        deadline: "Pre-approval required before hiring",
        applicationLink: "https://floridajobs.org/business-growth-and-partnerships/incentives/incentives-for-businesses",
        description: "Performance-based tax refund of $3,000–$6,000 per qualified job created, with bonuses for rural areas, R&D facilities, and HQ relocations.",
        country: "USA",
        region: "Florida",
        category: "Tax Incentive",
        agency: "Florida Department of Economic Opportunity",
        status: "Active",
        tags: ["Tax Refund", "Job Creation", "High-Wage Jobs"],
        requirements: ["Pre-approval mandatory", "Salaries ≥115% county average", "Target industry sector", "Minimum 10 new FL jobs"],
        lastUpdated: "2025-01-20"
    },
]

export default function FloridaGrantsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <Header />

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="flex items-center justify-center gap-2 mb-6">
                            <MapPin className="h-6 w-6 text-blue-300" />
                            <Badge className="bg-blue-500/30 text-blue-100 border-blue-400">
                                Florida State Funding Guide 2026
                            </Badge>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                            Florida Business Grants & Incentives 2026
                        </h1>
                        <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                            Florida's economy — the 4th largest in the USA — is backed by $2B+ in annual business incentives,
                            research grants, workforce training, and tax refund programs. From Miami tech startups to Orlando
                            biotech firms, Florida offers targeted funding across 15+ active programs.
                        </p>
                        <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
                            <div className="bg-white/10 rounded-xl p-4">
                                <div className="text-3xl font-bold">$2B+</div>
                                <div className="text-blue-200 text-sm mt-1">Annual business incentives</div>
                            </div>
                            <div className="bg-white/10 rounded-xl p-4">
                                <div className="text-3xl font-bold">15+</div>
                                <div className="text-blue-200 text-sm mt-1">Active grant programs</div>
                            </div>
                            <div className="bg-white/10 rounded-xl p-4">
                                <div className="text-3xl font-bold">$250K</div>
                                <div className="text-blue-200 text-sm mt-1">Max research matching grants</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* EEAT Components */}
            <section className="py-6 bg-emerald-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto space-y-4">
                        <ShortAnswerBox content="Yes — Florida businesses can access $2B+ annually through state incentives, research matching grants, and workforce training programs. Key programs include the Florida High Tech Corridor Matching Grants (up to $250K), QTI Tax Refund ($3K–$6K per job created), and Incumbent Worker Training reimbursements up to $200K. No equity required." />
                        <EEATBadge authorName="Ashwani K." authorImage="/ash-author-1.jpg" date="2026-03-01" />
                        <EligibleCheck />
                    </div>
                </div>
            </section>

            <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">

                    {/* Quick Navigation */}
                    <div className="flex flex-wrap gap-2 mb-10">
                        {["Top Programs", "How to Apply", "Eligibility", "Tax Incentives", "FAQ"].map((item) => (
                            <Badge key={item} variant="outline" className="cursor-pointer hover:bg-blue-50 px-3 py-1.5 text-sm">
                                {item}
                            </Badge>
                        ))}
                    </div>

                    {/* Grant Comparison Table */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Florida Business Grant Programs Comparison 2026</h2>
                        <GrantComparisonTable
                            grants={floridaGrants}
                            title="Florida Business Grants Comparison"
                        />
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid lg:grid-cols-3 gap-8 mb-12">
                        <div className="lg:col-span-2 space-y-10">

                            {/* Florida Funding Overview */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl flex items-center gap-2">
                                        <Building className="h-5 w-5 text-blue-600" />
                                        Florida's Business Funding Ecosystem 2026
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="prose max-w-none text-gray-700">
                                    <p className="text-base leading-relaxed mb-4">
                                        Florida's business incentive philosophy is different from most states: rather than offering broad direct cash grants
                                        to any business, Florida concentrates its funding on <strong>job creation, workforce training, R&D partnerships,
                                            and export growth</strong>. This performance-based approach means businesses that demonstrate economic impact —
                                        creating high-wage jobs, conducting university research, or entering new export markets — receive the most substantial support.
                                    </p>
                                    <p className="text-base leading-relaxed mb-4">
                                        The Florida Department of Economic Opportunity (DEO) and Enterprise Florida collectively administer over
                                        $500M in direct business incentives annually, while CareerSource Florida manages $300M+ in workforce training
                                        reimbursements. Additionally, the Florida High Tech Corridor — a 23-county region spanning Tampa Bay,
                                        Orlando, and I-4 — provides dedicated research matching grants for technology businesses collaborating
                                        with University of Florida, UCF, or USF.
                                    </p>
                                    <p className="text-base leading-relaxed">
                                        For technology startups and growth-stage companies, <strong>federal SBIR/STTR grants remain the largest
                                            non-dilutive funding pool</strong> available in Florida. The state ranks 5th nationally for SBIR awards,
                                        with Florida companies receiving $400M+ annually from NSF, NIH, DOD, DOE, and NASA programs. Many of
                                        Florida's 17 universities have SBIR support offices that provide free proposal assistance.
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Top 5 Programs Deep Dive */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Florida Business Grant Programs Explained</h2>
                                <div className="space-y-6">

                                    {/* High Tech Corridor */}
                                    <Card className="border-l-4 border-l-blue-500">
                                        <CardHeader>
                                            <div className="flex items-start justify-between">
                                                <CardTitle className="text-lg">1. Florida High Tech Corridor Matching Grants</CardTitle>
                                                <Badge className="bg-blue-100 text-blue-800 shrink-0 ml-2">Up to $250K</Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="text-gray-700 space-y-3">
                                            <p>
                                                The <strong>Florida High Tech Corridor Matching Grant Research Program</strong> is the most valuable direct
                                                research grant available to Florida tech companies. It operates across a 23-county region and requires a
                                                1:1 match from the applying company.
                                            </p>
                                            <div className="grid sm:grid-cols-2 gap-4 my-4">
                                                <div className="bg-blue-50 rounded-lg p-3">
                                                    <div className="font-semibold text-blue-900 mb-1">Funding Range</div>
                                                    <div className="text-blue-700">$25,000 – $250,000 per project</div>
                                                </div>
                                                <div className="bg-green-50 rounded-lg p-3">
                                                    <div className="font-semibold text-green-900 mb-1">Timeline</div>
                                                    <div className="text-green-700">Rolling applications, 4–6 month review</div>
                                                </div>
                                                <div className="bg-purple-50 rounded-lg p-3">
                                                    <div className="font-semibold text-purple-900 mb-1">Match Required</div>
                                                    <div className="text-purple-700">1:1 cash match from company</div>
                                                </div>
                                                <div className="bg-orange-50 rounded-lg p-3">
                                                    <div className="font-semibold text-orange-900 mb-1">Partner Required</div>
                                                    <div className="text-orange-700">UF, UCF, USF, or 23-county university</div>
                                                </div>
                                            </div>
                                            <p>
                                                <strong>Who Should Apply:</strong> Tech companies in the 23-county I-4 corridor (Tampa to Daytona Beach)
                                                developing new products in partnership with a Florida university. Ideal for companies with existing university
                                                connections who have a defined R&D problem to solve.
                                            </p>
                                        </CardContent>
                                    </Card>

                                    {/* QTI */}
                                    <Card className="border-l-4 border-l-green-500">
                                        <CardHeader>
                                            <div className="flex items-start justify-between">
                                                <CardTitle className="text-lg">2. Qualified Target Industry (QTI) Tax Refund</CardTitle>
                                                <Badge className="bg-green-100 text-green-800 shrink-0 ml-2">$3K–$6K per job</Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="text-gray-700 space-y-3">
                                            <p>
                                                The QTI Tax Refund is Florida's flagship performance-based incentive for companies creating high-wage
                                                jobs in target industries. Unlike grants, <strong>this is a refund of taxes already paid</strong> —
                                                but it's calculated per qualifying job created and is highly predictable.
                                            </p>
                                            <div className="bg-gray-50 rounded-lg p-4 my-3">
                                                <div className="font-semibold mb-2">QTI Refund Schedule:</div>
                                                <ul className="space-y-1 text-sm">
                                                    <li>• <strong>Standard:</strong> $3,000 per qualified job (paid over 6 years)</li>
                                                    <li>• <strong>Rural Areas:</strong> $6,000 per qualified job</li>
                                                    <li>• <strong>HQ Relocation:</strong> Up to $6,000 per job + bonuses</li>
                                                    <li>• <strong>R&D Facility:</strong> Additional $1,000 per job bonus</li>
                                                </ul>
                                            </div>
                                            <p className="text-sm text-amber-700 bg-amber-50 rounded-lg p-3">
                                                <strong>⚠️ Critical:</strong> You MUST receive QTI pre-approval BEFORE making hiring decisions or signing leases.
                                                Retroactive applications are not accepted. Contact DEO before committing to expansion.
                                            </p>
                                        </CardContent>
                                    </Card>

                                    {/* Incumbent Worker Training */}
                                    <Card className="border-l-4 border-l-purple-500">
                                        <CardHeader>
                                            <div className="flex items-start justify-between">
                                                <CardTitle className="text-lg">3. Incumbent Worker Training (IWT) Program</CardTitle>
                                                <Badge className="bg-purple-100 text-purple-800 shrink-0 ml-2">Up to $200K</Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="text-gray-700 space-y-3">
                                            <p>
                                                Administered by CareerSource Florida's 24 regional workforce boards, IWT reimburses
                                                <strong> 50%–75% of direct training costs</strong> for companies upgrading the skills of existing employees.
                                                It's one of the most consistently funded programs in Florida and has strong success rates for manufacturing,
                                                healthcare, and technology companies.
                                            </p>
                                            <div className="grid sm:grid-cols-3 gap-3 my-3">
                                                <div className="text-center bg-purple-50 rounded-lg p-3">
                                                    <div className="text-2xl font-bold text-purple-700">50–75%</div>
                                                    <div className="text-xs text-purple-600 mt-1">Training cost reimbursement</div>
                                                </div>
                                                <div className="text-center bg-purple-50 rounded-lg p-3">
                                                    <div className="text-2xl font-bold text-purple-700">$200K</div>
                                                    <div className="text-xs text-purple-600 mt-1">Maximum per award</div>
                                                </div>
                                                <div className="text-center bg-purple-50 rounded-lg p-3">
                                                    <div className="text-2xl font-bold text-purple-700">Quarterly</div>
                                                    <div className="text-xs text-purple-600 mt-1">Application cycles</div>
                                                </div>
                                            </div>
                                            <p>
                                                Reimbursable expenses include instructor costs, curriculum development, training materials, and
                                                online learning platforms. Apply through your local CareerSource Florida regional board —
                                                the program is locally administered and competitive within each region.
                                            </p>
                                        </CardContent>
                                    </Card>

                                    {/* Export Program */}
                                    <Card className="border-l-4 border-l-orange-500">
                                        <CardHeader>
                                            <div className="flex items-start justify-between">
                                                <CardTitle className="text-lg">4. Florida Export Diversification & Expansion Program</CardTitle>
                                                <Badge className="bg-orange-100 text-orange-800 shrink-0 ml-2">Up to $50K</Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="text-gray-700 space-y-3">
                                            <p>
                                                Enterprise Florida's export grant program helps Florida companies enter new international markets by
                                                reimbursing trade show participation, international market research, and trade mission costs.
                                            </p>
                                            <ul className="space-y-2 text-sm">
                                                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" /><span><strong>Trade show participation:</strong> International booth fees, travel, shipping of samples</span></li>
                                                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" /><span><strong>Market research:</strong> International feasibility studies, translation costs</span></li>
                                                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" /><span><strong>Trade missions:</strong> Governor-led or Enterprise FL trade missions</span></li>
                                                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" /><span><strong>Website localization:</strong> Foreign language website development</span></li>
                                            </ul>
                                        </CardContent>
                                    </Card>

                                </div>
                            </div>

                            {/* How to Apply */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl flex items-center gap-2">
                                        <FileText className="h-5 w-5 text-blue-600" />
                                        How to Apply for Florida Business Grants
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="text-gray-700">
                                    <div className="space-y-4">
                                        {[
                                            {
                                                step: "1",
                                                title: "Identify Programs You Qualify For",
                                                desc: "Use Florida's business incentives screening tool at floridajobs.org or call Enterprise Florida at (877) 352-3672 for a free consultation. Programs vary by county, industry sector, and company size.",
                                            },
                                            {
                                                step: "2",
                                                title: "Pre-Apply Before Making Commitments (for QTI)",
                                                desc: "For QTI and most DEO programs, you MUST receive approval before hiring, leasing space, or purchasing equipment. Pre-approval protects your eligibility — retroactive applications are rejected.",
                                            },
                                            {
                                                step: "3",
                                                title: "Prepare Your Business Documentation",
                                                desc: "Standard requirements: FL business registration, 3 years financial statements, federal tax returns, current employee count and wage data, detailed project plan with job creation projections.",
                                            },
                                            {
                                                step: "4",
                                                title: "Contact Your Local Program Office",
                                                desc: "Each program has regional administrators. CareerSource has 24 regional boards; High Tech Corridor has regional offices in Tampa, Orlando, and the Space Coast area.",
                                            },
                                            {
                                                step: "5",
                                                title: "Submit Application and Track Milestones",
                                                desc: "Most Florida programs are performance-based — funding is disbursed as you hit milestones (jobs created, training hours completed). Track and report carefully to receive full disbursements.",
                                            },
                                        ].map((item) => (
                                            <div key={item.step} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                                                <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold shrink-0">
                                                    {item.step}
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-gray-900 mb-1">{item.title}</div>
                                                    <div className="text-sm text-gray-600">{item.desc}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Eligibility */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl flex items-center gap-2">
                                        <CheckCircle className="h-5 w-5 text-green-600" />
                                        Eligibility Requirements for Florida Grants
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="text-gray-700">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                                                <CheckCircle className="h-4 w-4" /> Generally Eligible
                                            </h3>
                                            <ul className="space-y-2 text-sm">
                                                <li className="flex items-start gap-2"><CheckCircle className="h-3.5 w-3.5 text-green-500 mt-0.5 shrink-0" />Florida-registered for-profit businesses</li>
                                                <li className="flex items-start gap-2"><CheckCircle className="h-3.5 w-3.5 text-green-500 mt-0.5 shrink-0" />Companies in QTI target industries (tech, finance, biotech, aerospace)</li>
                                                <li className="flex items-start gap-2"><CheckCircle className="h-3.5 w-3.5 text-green-500 mt-0.5 shrink-0" />Businesses with at least 1 year of operating history</li>
                                                <li className="flex items-start gap-2"><CheckCircle className="h-3.5 w-3.5 text-green-500 mt-0.5 shrink-0" />Companies creating jobs at ≥115% of county average wage</li>
                                                <li className="flex items-start gap-2"><CheckCircle className="h-3.5 w-3.5 text-green-500 mt-0.5 shrink-0" />Tech companies in the 23-county High Tech Corridor</li>
                                                <li className="flex items-start gap-2"><CheckCircle className="h-3.5 w-3.5 text-green-500 mt-0.5 shrink-0" />Exporters with FL-manufactured or Florida HQ products</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                                                <AlertCircle className="h-4 w-4" /> Generally Not Eligible
                                            </h3>
                                            <ul className="space-y-2 text-sm">
                                                <li className="flex items-start gap-2"><AlertCircle className="h-3.5 w-3.5 text-red-500 mt-0.5 shrink-0" />Retail and hospitality businesses (for most programs)</li>
                                                <li className="flex items-start gap-2"><AlertCircle className="h-3.5 w-3.5 text-red-500 mt-0.5 shrink-0" />Businesses with primary consumer-facing revenue</li>
                                                <li className="flex items-start gap-2"><AlertCircle className="h-3.5 w-3.5 text-red-500 mt-0.5 shrink-0" />Companies creating jobs below county average wage</li>
                                                <li className="flex items-start gap-2"><AlertCircle className="h-3.5 w-3.5 text-red-500 mt-0.5 shrink-0" />Non-Florida registered entities (most programs)</li>
                                                <li className="flex items-start gap-2"><AlertCircle className="h-3.5 w-3.5 text-red-500 mt-0.5 shrink-0" />Businesses with pending legal or tax issues</li>
                                                <li className="flex items-start gap-2"><AlertCircle className="h-3.5 w-3.5 text-red-500 mt-0.5 shrink-0" />Companies that have already started the project being funded</li>
                                            </ul>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Expert Tips */}
                            <Card className="border-amber-200 bg-amber-50">
                                <CardHeader>
                                    <CardTitle className="text-xl flex items-center gap-2 text-amber-800">
                                        <Lightbulb className="h-5 w-5 text-amber-600" />
                                        Expert Strategy: Maximizing Florida Business Funding
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="text-amber-900 space-y-4">
                                    <div className="bg-white rounded-lg p-4 border border-amber-200">
                                        <div className="font-semibold mb-2">💡 Stack Federal + State Funding</div>
                                        <p className="text-sm">
                                            Florida&apos;s state programs are designed to complement, not replace, federal funding. A typical winning strategy:
                                            win a federal SBIR Phase I ($305K), use it to unlock a High Tech Corridor matching grant, then apply for QTI
                                            when hiring your first full-time team. This three-layer approach can generate $600K–$1M in non-dilutive capital.
                                        </p>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 border border-amber-200">
                                        <div className="font-semibold mb-2">💡 Get QTI Pre-Approval Early</div>
                                        <p className="text-sm">
                                            The single biggest mistake Florida founders make is initiating expansion — signing office leases, making
                                            job offers — before getting QTI pre-approved. Call DEO&apos;s incentives team at the very first sign you&apos;ll be
                                            hiring. Pre-approval takes 30–60 days but protects $30K–$60K in tax refunds per 10 employees hired.
                                        </p>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 border border-amber-200">
                                        <div className="font-semibold mb-2">💡 Use IWT for Employee Retention</div>
                                        <p className="text-sm">
                                            The Incumbent Worker Training program is chronically under-utilized. Florida for-profit businesses can
                                            reclaim 50–75% of training costs for certification programs, technical skills, and software training.
                                            If you&apos;re planning to upskill 10+ employees, this can offset $20K–$50K in annual training spend.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* FAQ */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions: Florida Business Grants</h2>
                                <div className="space-y-4">
                                    {[
                                        {
                                            q: "Does Florida have direct cash grants for small businesses?",
                                            a: "Florida's grant programs are primarily performance-based (tied to job creation, training completion, or research milestones) or reimbursement-based (like IWT) rather than upfront cash grants. However, the High Tech Corridor matching grant and Export Diversification grant are true grants with direct payments after project milestones. For general small business grants, the SBA programs (SBIR, SBA 7(a), SBA Microloan) provide the most accessible non-performance-based funding.",
                                        },
                                        {
                                            q: "Can a startup apply for Florida business incentives?",
                                            a: "Yes, but most Florida programs require at least 1 year of operating history, a demonstrated ability to create Florida jobs, and an approved business plan. The Florida High Tech Corridor has the lowest barrier for startups — if you have a university research partner and $25K of your own to match, you qualify. For pre-revenue startups, the best path is federal SBIR Phase I first, then layering in state programs as you grow.",
                                        },
                                        {
                                            q: "Are Florida businesses near Disney or tourist areas eligible?",
                                            a: "It depends on the program. Hospitality and retail businesses in tourist corridors are excluded from most DEO incentive programs (QTI, Job Growth Fund) because they typically don't create the high-wage, tradeable-sector jobs Florida targets. However, tourism technology companies (guest experience software, hospitality SaaS), convention center suppliers, and B2B service companies in those areas do qualify.",
                                        },
                                        {
                                            q: "What are Florida's target industries for QTI?",
                                            a: "Florida's current QTI target industries include: Clean Technology / Renewable Energy, Corporate HQ, Data Science / Information Technology, Defense & Homeland Security, Financial / Professional Services, Life Sciences, Semiconductor / Microelectronics, and Transportation Equipment Manufacturing. Businesses in these sectors creating 10+ high-wage FL jobs qualify for the full QTI refund schedule.",
                                        },
                                        {
                                            q: "How long does it take to receive Florida grant funding?",
                                            a: "Timeline varies: IWT workforce training reimbursements typically take 60–90 days after training completion. High Tech Corridor grants have a 4–6 month review cycle. QTI tax refunds are paid annually as milestones are verified (typically starting 12–18 months after initial approval). Plan for a 6–18 month cycle from application to receiving funds, and don't plan your cash flow around grant receipt.",
                                        },
                                        {
                                            q: "Can I apply to multiple Florida programs simultaneously?",
                                            a: "Yes — and you should. Florida programs are designed to stack. A common combination is: QTI (for job creation) + IWT (for training those new hires) + High Tech Corridor grant (for R&D work) + federal SBIR (for underlying technology). Each program has its own administrator, so applying to multiple programs in parallel is both allowed and encouraged.",
                                        },
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
                            <Card className="bg-blue-600 text-white">
                                <CardContent className="pt-6">
                                    <Star className="h-8 w-8 text-yellow-300 mb-3" />
                                    <h3 className="font-bold text-lg mb-2">Free Grant Matching</h3>
                                    <p className="text-blue-100 text-sm mb-4">
                                        Get matched to the exact Florida grant programs you qualify for — our grant specialists review your business profile free of charge.
                                    </p>
                                    <Link href="/contact">
                                        <Button className="w-full bg-white text-blue-600 hover:bg-blue-50">
                                            Get Free Matching <ArrowRight className="h-4 w-4 ml-1" />
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>

                            <NewsletterSignup variant="sidebar" />

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Key Florida Agency Contacts</CardTitle>
                                </CardHeader>
                                <CardContent className="text-sm space-y-3">
                                    <div>
                                        <div className="font-semibold">Enterprise Florida</div>
                                        <div className="text-gray-500">(877) 352-3672 | eflorida.com</div>
                                    </div>
                                    <div>
                                        <div className="font-semibold">FL Dept. of Economic Opportunity</div>
                                        <div className="text-gray-500">floridajobs.org/business-growth</div>
                                    </div>
                                    <div>
                                        <div className="font-semibold">CareerSource Florida (IWT)</div>
                                        <div className="text-gray-500">careersourceflorida.com</div>
                                    </div>
                                    <div>
                                        <div className="font-semibold">High Tech Corridor</div>
                                        <div className="text-gray-500">floridahightech.com</div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Related Resources</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2 text-sm">
                                        <Link href="/usa/federal-grants" className="flex items-center gap-1.5 text-primary hover:underline">
                                            <ArrowRight className="h-3.5 w-3.5" /> Federal Grants for FL Businesses
                                        </Link>
                                        <Link href="/usa/small-business-grants" className="flex items-center gap-1.5 text-primary hover:underline">
                                            <ArrowRight className="h-3.5 w-3.5" /> SBA Small Business Grants
                                        </Link>
                                        <Link href="/usa/texas" className="flex items-center gap-1.5 text-primary hover:underline">
                                            <ArrowRight className="h-3.5 w-3.5" /> Texas Business Grants
                                        </Link>
                                        <Link href="/usa/new-york" className="flex items-center gap-1.5 text-primary hover:underline">
                                            <ArrowRight className="h-3.5 w-3.5" /> New York Business Grants
                                        </Link>
                                        <Link href="/blog/sba-7a-loans-complete-guide" className="flex items-center gap-1.5 text-primary hover:underline">
                                            <ArrowRight className="h-3.5 w-3.5" /> SBA 7(a) Loan Guide
                                        </Link>
                                        <Link href="/grant-finder" className="flex items-center gap-1.5 text-primary hover:underline">
                                            <ArrowRight className="h-3.5 w-3.5" /> AI Grant Finder Tool
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Newsletter CTA */}
                    <div className="mb-8">
                        <NewsletterSignup
                            title="Get Florida Grant Updates"
                            description="Stay informed about new Florida business incentives, QTI pre-approval windows, and High Tech Corridor grant cycles. We track 15+ FL programs for you."
                        />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
