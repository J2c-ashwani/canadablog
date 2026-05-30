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
    title: "Florida Business Grants 2026 | FL State Funding Programs & Incentives Guide",
    description: "Complete guide to Florida business grants and state funding in 2026. Florida High Tech Corridor matching grants up to $250K, Incumbent Worker Training, QTI Tax Refund $3K–$6K per job, and export diversification funding for FL businesses.",
    keywords: "Florida business grants 2026, Florida state funding, small business grants Florida, Enterprise Florida grants, FL government grants, Florida High Tech Corridor, QTI tax refund, Incumbent Worker Training Florida, Florida SBIR, Florida startup grants",
    alternates: { canonical: "https://www.fsidigital.ca/usa/florida" },
    openGraph: { title: "Florida Business Grants 2026 | Complete FL Funding Guide", description: "Discover Florida's business incentives, research grants, and export funding programs for 2026.", url: "https://www.fsidigital.ca/usa/florida" },
}

const floridaGrants: Grant[] = [
    { id: "fl-hightech-corridor", name: "Florida High Tech Corridor Matching Grants", fundingMin: 25000, fundingMax: 250000, eligibility: ["Tech companies in 23-county region", "University partners (UF, UCF, USF)", "Applied research projects"], deadline: "Rolling", applicationLink: "https://floridahightech.com/matching-grants-research-program/", description: "1:1 matching grants for applied R&D projects between industry partners and universities in the I-4 Corridor region.", country: "USA", region: "Florida", category: "Technology", agency: "Florida High Tech Corridor", status: "Active", tags: ["R&D", "University", "Technology"], requirements: ["1:1 industry match", "University collaboration", "23-county region"], lastUpdated: "2025-01-20" },
    { id: "fl-export-diversification", name: "Florida Export Diversification & Expansion Program", fundingMin: 2500, fundingMax: 50000, eligibility: ["Florida manufacturers", "Service providers with exportable products"], deadline: "Rolling", applicationLink: "https://www.enterpriseflorida.com/", description: "Grants for Florida companies entering new international markets via trade shows, missions, and market research.", country: "USA", region: "Florida", category: "Business Growth", agency: "Enterprise Florida", status: "Active", tags: ["Export", "Trade"], requirements: ["Exportable product", "Florida HQ", "<500 employees"], lastUpdated: "2025-01-20" },
    { id: "fl-job-growth", name: "Florida Job Growth Grant Fund", fundingMin: 250000, fundingMax: 5000000, eligibility: ["Public infrastructure projects", "Workforce training programs", "Local government entities"], deadline: "Rolling", applicationLink: "https://floridajobs.org/jobgrowth", description: "Governor-approved funding for infrastructure and workforce training that supports private sector economic development.", country: "USA", region: "Florida", category: "Infrastructure", agency: "Florida DEO", status: "Active", tags: ["Infrastructure", "Workforce"], requirements: ["Government entity applicant", "Demonstrated economic ROI"], lastUpdated: "2025-01-20" },
    { id: "fl-incumbent-worker", name: "Incumbent Worker Training (IWT) Program", fundingMin: 5000, fundingMax: 200000, eligibility: ["Florida for-profit businesses", "Businesses with existing employees"], deadline: "Quarterly", applicationLink: "https://careersourceflorida.com/", description: "Reimburses 50–75% of training costs for upskilling existing Florida employees through CareerSource regional boards.", country: "USA", region: "Florida", category: "Workforce", agency: "CareerSource Florida", status: "Active", tags: ["Training", "Skills"], requirements: ["For-profit FL business", "Approved training plan", "Min. 10 trainees"], lastUpdated: "2025-01-20" },
    { id: "fl-qti", name: "Qualified Target Industry (QTI) Tax Refund", fundingMin: 3000, fundingMax: 2000000, eligibility: ["High-wage job creators", "Target industry sectors"], deadline: "Pre-approval required before hiring", applicationLink: "https://floridajobs.org/", description: "Performance-based tax refund of $3,000–$6,000 per qualified high-wage job created in Florida target industries.", country: "USA", region: "Florida", category: "Tax Incentive", agency: "Florida DEO", status: "Active", tags: ["Tax Refund", "Job Creation"], requirements: ["Pre-approval mandatory", "≥115% county average wage", "Min. 10 new FL jobs"], lastUpdated: "2025-01-20" },
]

export default function FloridaGrantsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <Header />

            <section className="bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="flex items-center justify-center gap-2 mb-6">
                            <MapPin className="h-6 w-6 text-blue-300" />
                            <Badge className="bg-blue-500/30 text-blue-100 border-blue-400">Florida State Funding Guide 2026</Badge>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Florida Business Grants & Incentives 2026</h1>
            <div className="mt-8 mb-4 text-left">
              <ShortAnswerBox content="Yes — Florida businesses can access $2B+ annually through state incentives, research matching grants, and workforce training programs. Key programs include the Florida High Tech Corridor Matching Grants (up to $250K), QTI Tax Refund ($3K–$6K per job created), and Incumbent Worker Training reimbursements up to $200K. No equity required." />
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
                        {["Top Programs", "How to Apply", "Eligibility", "Tax Incentives", "Common Mistakes", "FAQ"].map((item) => (
                            <Badge key={item} variant="outline" className="cursor-pointer hover:bg-blue-50 px-3 py-1.5 text-sm">{item}</Badge>
                        ))}
                    </div>

                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Florida Business Grant Programs — Quick Comparison 2026</h2>
                        <p className="text-gray-600 mb-6">Use the table below to identify which Florida programs match your industry, company size, and stage. All programs listed are active as of Q1 2026.</p>
                        <GrantComparisonTable grants={floridaGrants} title="Florida Business Grants Comparison" />
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8 mb-12">
                        <div className="lg:col-span-2 space-y-10">

                            {/* Deep Overview */}
                            <Card>
                                <CardHeader><CardTitle className="text-xl flex items-center gap-2"><Building className="h-5 w-5 text-blue-600" />Understanding Florida's Business Funding Philosophy</CardTitle></CardHeader>
                                <CardContent className="text-gray-700 space-y-4">
                                    <p className="leading-relaxed">
                                        Florida's business incentive ecosystem is deliberately different from states like New York or California, which offer broad
                                        direct grants. Florida concentrates its funding on <strong>four core objectives:</strong> high-wage job creation, university-industry
                                        research collaboration, workforce skills development, and export market expansion. This performance-based philosophy means
                                        businesses that demonstrate tangible economic impact — measured in jobs created, researchers employed, workers trained, or
                                        new export markets entered — receive the most substantial and sustained support.
                                    </p>
                                    <p className="leading-relaxed">
                                        The Florida Department of Economic Opportunity (DEO) and Enterprise Florida collectively administer over $500M in direct
                                        business incentives annually, while CareerSource Florida manages $300M+ in workforce training reimbursements across its
                                        24 regional boards. Additionally, the Florida High Tech Corridor — stretching 23 counties from the Tampa Bay area through
                                        Orlando to Daytona Beach along the I-4 highway — provides dedicated research matching grants for technology businesses
                                        collaborating with the University of Florida (Gainesville), the University of Central Florida (Orlando), or the University
                                        of South Florida (Tampa). These three research universities together form one of the most productive industry-academic
                                        partnerships in the southeastern United States.
                                    </p>
                                    <p className="leading-relaxed">
                                        One common misconception is that Florida's grants are exclusively for large enterprises. In reality, the High Tech Corridor
                                        program starts at $25,000 — accessible for early-stage startups with a university partner. The Incumbent Worker Training
                                        program works for any for-profit Florida company with as few as 10 employees. The QTI Tax Refund is pre-approval based,
                                        making it theoretically available even to companies hiring their first 10 Florida employees — as long as salaries exceed
                                        115% of the county average wage. The keys are knowing which program fits your stage, applying before spending, and
                                        documenting your economic impact meticulously.
                                    </p>
                                    <p className="leading-relaxed">
                                        For technology startups specifically, <strong>federal SBIR/STTR grants remain the single largest non-dilutive funding pool</strong>
                                        available to Florida companies. Florida ranks 5th nationally for total SBIR awards received, with Florida companies collectively
                                        winning $400M+ annually from NSF, NIH, DOD, DOE, and NASA programs. The state's 12 SBIR-supportive research universities
                                        provide free proposal review, technical assistance, and connections to commercial partners. Many companies use a federal SBIR
                                        Phase I win as a springboard into the High Tech Corridor matching grant system, effectively doubling or tripling their
                                        non-dilutive R&D capital in the first 18 months.
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Program Deep Dives */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Florida Business Grant Programs — Detailed Breakdown</h2>
                                <p className="text-gray-600 mb-6">Each program below is analyzed in depth: what it funds, who qualifies, the application process, and what successful applicants look like.</p>
                                <div className="space-y-6">

                                    <Card className="border-l-4 border-l-blue-500">
                                        <CardHeader>
                                            <div className="flex items-start justify-between">
                                                <CardTitle className="text-lg">1. Florida High Tech Corridor Matching Grants</CardTitle>
                                                <Badge className="bg-blue-100 text-blue-800 shrink-0 ml-2">Up to $250K</Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="text-gray-700 space-y-4">
                                            <p>
                                                The <strong>Florida High Tech Corridor Matching Grant Research Program</strong> is the state's cornerstone grant for
                                                technology companies conducting applied research in partnership with area universities. The program operates exclusively
                                                within the 23-county I-4 Corridor region — stretching from Hillsborough County (Tampa) through Orange County (Orlando)
                                                to Volusia County (Daytona Beach) — and requires companies to put up a matching dollar for every dollar the Corridor provides.
                                            </p>
                                            <p>
                                                Unlike basic research grants, the Corridor program is explicitly designed for <strong>applied, commercializable research</strong>.
                                                Your project should have a defined technical problem, a university research partner who brings academic expertise, and a
                                                clear path to a product or process improvement that can be commercialized or sold. The Corridor evaluates proposals on
                                                scientific merit, company commitment, economic impact potential, and the quality of the university partnership.
                                            </p>
                                            <div className="grid sm:grid-cols-2 gap-4 my-4">
                                                <div className="bg-blue-50 rounded-lg p-4">
                                                    <div className="font-semibold text-blue-900 mb-2">Funding Structure</div>
                                                    <ul className="text-sm text-blue-700 space-y-1">
                                                        <li>• Award range: $25,000 – $250,000</li>
                                                        <li>• 1:1 cash match required from company</li>
                                                        <li>• Paid in milestone tranches</li>
                                                        <li>• No equity taken by Corridor</li>
                                                    </ul>
                                                </div>
                                                <div className="bg-green-50 rounded-lg p-4">
                                                    <div className="font-semibold text-green-900 mb-2">University Partners</div>
                                                    <ul className="text-sm text-green-700 space-y-1">
                                                        <li>• University of Florida (UF)</li>
                                                        <li>• University of Central Florida (UCF)</li>
                                                        <li>• University of South Florida (USF)</li>
                                                        <li>• 11 other 23-county universities</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <p>
                                                A typical winning proposal involves a company that has already identified a technical challenge (e.g., improving a
                                                manufacturing process, developing a new software algorithm, creating a novel material), found a faculty member with
                                                relevant expertise at one of the Corridor universities, and structured a 12–18 month research project with defined
                                                deliverables. Timeline from application to funding decision is typically 4–6 months, with rolling application intake
                                                throughout the year.
                                            </p>
                                            <p className="text-sm text-amber-700 bg-amber-50 rounded-lg p-3">
                                                <strong>⚠️ Geographic Requirement:</strong> Your company must be physically located within or undertaking the research
                                                within the 23-county Corridor region. Remote companies where all personnel work outside the corridor do not qualify,
                                                even if they partner with a Corridor university remotely.
                                            </p>
                                        </CardContent>
                                    </Card>

                                    <Card className="border-l-4 border-l-green-500">
                                        <CardHeader>
                                            <div className="flex items-start justify-between">
                                                <CardTitle className="text-lg">2. Qualified Target Industry (QTI) Tax Refund</CardTitle>
                                                <Badge className="bg-green-100 text-green-800 shrink-0 ml-2">$3K–$6K per job</Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="text-gray-700 space-y-4">
                                            <p>
                                                The <strong>Qualified Target Industry Tax Refund</strong> is Florida's flagship performance-based business incentive —
                                                and arguably the most important program for companies creating high-wage jobs in the state. Unlike a traditional grant,
                                                this is a refund of Florida taxes you've already paid: sales tax, corporate income tax, ad valorem tax, intangible
                                                personal property tax, emergency excise tax, and insurance premium tax all qualify as the source of the refund.
                                            </p>
                                            <p>
                                                The mechanics are straightforward: for every qualified high-wage job you create in Florida, you receive a refund of
                                                $3,000 ($6,000 in rural areas). The refund is paid out over a 6-year period as you demonstrate that the committed jobs
                                                have been created and are being maintained. Companies in particularly strategic sectors (R&D facilities, corporate
                                                headquarters) can qualify for additional bonuses of $1,000–$2,000 per qualifying job on top of the base amount.
                                            </p>
                                            <div className="bg-gray-50 rounded-lg p-4 my-4">
                                                <div className="font-semibold mb-3 text-gray-900">QTI Refund Schedule (Per Qualifying Job):</div>
                                                <table className="w-full text-sm">
                                                    <thead><tr className="bg-green-50"><th className="text-left p-2">Scenario</th><th className="text-left p-2">Standard</th><th className="text-left p-2">Rural</th></tr></thead>
                                                    <tbody>
                                                        <tr className="border-b"><td className="p-2">Base Rate</td><td className="p-2 font-medium text-green-700">$3,000</td><td className="p-2 font-medium text-green-700">$6,000</td></tr>
                                                        <tr className="border-b"><td className="p-2">HQ Relocation Bonus</td><td className="p-2">+$1,000</td><td className="p-2">+$2,000</td></tr>
                                                        <tr className="border-b"><td className="p-2">R&D Facility Bonus</td><td className="p-2">+$1,000</td><td className="p-2">+$2,000</td></tr>
                                                        <tr><td className="p-2">Payment Period</td><td className="p-2 colspan-2">6 years after milestones verified</td></tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <p>
                                                Florida's target industries eligible for QTI include: Clean Technology / Renewable Energy, Corporate Headquarters,
                                                Data Science / Information Technology, Defense & Homeland Security, Financial & Professional Services, Life Sciences,
                                                Semiconductor & Microelectronics, and Transportation Equipment Manufacturing. Retail, hospitality, and consumer-facing
                                                service businesses are explicitly excluded from the program.
                                            </p>
                                            <p className="text-sm text-red-700 bg-red-50 rounded-lg p-3 mt-2">
                                                <strong>🚨 Critical Warning:</strong> QTI pre-approval MUST be obtained BEFORE you make any hiring decisions,
                                                sign office lease agreements, or purchase equipment. Applications submitted after expansion begins are rejected without
                                                exception. Many Florida companies lose $30K–$100K in potential refunds by missing this deadline. Contact DEO at (850)
                                                245-7130 the moment expansion becomes a possibility.
                                            </p>
                                        </CardContent>
                                    </Card>

                                    <Card className="border-l-4 border-l-purple-500">
                                        <CardHeader>
                                            <div className="flex items-start justify-between">
                                                <CardTitle className="text-lg">3. Incumbent Worker Training (IWT) Program</CardTitle>
                                                <Badge className="bg-purple-100 text-purple-800 shrink-0 ml-2">Up to $200K</Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="text-gray-700 space-y-4">
                                            <p>
                                                The <strong>Incumbent Worker Training Program</strong> is one of Florida's most consistently funded and least
                                                competitive programs — meaning higher success rates for applicants who meet the baseline criteria. Administered by
                                                CareerSource Florida through its 24 regional workforce development boards, IWT reimburses 50% to 75% of direct
                                                training costs for companies upskilling their existing Florida workforce.
                                            </p>
                                            <p>
                                                The reimbursement rate varies based on company size and the type of training delivered. Companies with fewer than
                                                25 employees typically receive the highest reimbursement rate (75%), while larger companies (100+ employees) receive
                                                closer to 50%. All training must be delivered by an approved third-party trainer, an accredited institution, or a
                                                proprietary training system — the company cannot simply reimburse employee self-directed online courses without a
                                                structured, measurable training plan.
                                            </p>
                                            <p>
                                                <strong>Eligible Training Categories:</strong> Technical certifications (AWS, Microsoft, Salesforce, ISO), manufacturing
                                                process training (Six Sigma, Lean, OSHA), software and ERP system implementation training, healthcare compliance and
                                                clinical skills, aviation and aerospace maintenance certifications, cybersecurity and IT security certifications, and
                                                leadership development programs that include measurable workforce outcomes. The key is that training must enhance the
                                                employee's productivity and earning potential in a way that CareerSource regional staff can verify.
                                            </p>
                                            <div className="grid sm:grid-cols-3 gap-3 my-4">
                                                <div className="text-center bg-purple-50 rounded-lg p-3">
                                                    <div className="text-2xl font-bold text-purple-700">50–75%</div>
                                                    <div className="text-xs text-purple-600 mt-1">Training cost reimbursement rate</div>
                                                </div>
                                                <div className="text-center bg-purple-50 rounded-lg p-3">
                                                    <div className="text-2xl font-bold text-purple-700">$200K</div>
                                                    <div className="text-xs text-purple-600 mt-1">Maximum reimbursement per award</div>
                                                </div>
                                                <div className="text-center bg-purple-50 rounded-lg p-3">
                                                    <div className="text-2xl font-bold text-purple-700">Quarterly</div>
                                                    <div className="text-xs text-purple-600 mt-1">Application intake cycles</div>
                                                </div>
                                            </div>
                                            <p>
                                                Apply through your specific CareerSource regional board — not through CareerSource Florida statewide. Find your
                                                local board at careersourceflorida.com. Applications are competitive within each region, so early submission in
                                                each quarterly cycle significantly improves success rates.
                                            </p>
                                        </CardContent>
                                    </Card>

                                    <Card className="border-l-4 border-l-orange-500">
                                        <CardHeader>
                                            <div className="flex items-start justify-between">
                                                <CardTitle className="text-lg">4. Florida Export Diversification & Expansion Program</CardTitle>
                                                <Badge className="bg-orange-100 text-orange-800 shrink-0 ml-2">Up to $50K</Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="text-gray-700 space-y-4">
                                            <p>
                                                Enterprise Florida's export grant program is designed specifically for Florida companies that manufacture products
                                                or provide services in the state and want to enter new international markets. Florida is the 4th-largest exporting
                                                state in the US, and this program helps sustain and grow that economic contribution by subsidizing the cost of
                                                international market entry — one of the most expensive and risky growth strategies for small businesses.
                                            </p>
                                            <p>
                                                The program is structured as a reimbursement grant: you spend on qualifying export activities, document your expenses
                                                and outcomes (new market contacts, distributor agreements signed, international sales generated), and Enterprise Florida
                                                reimburses up to 75% of eligible costs, capped at $50,000 per company per fiscal year. Eligible activities include
                                                international trade show booth fees, travel costs for international business development trips, interpreter and
                                                translation services, international market research reports, and costs associated with Enterprise Florida's governor-led
                                                or staff-led trade missions.
                                            </p>
                                            <p>
                                                <strong>Who Benefits Most:</strong> Florida manufacturers with existing domestic products looking to enter Latin American,
                                                European, or Asian markets. Florida's geographic position — especially Miami — makes it a natural hub for Latin American
                                                trade, and Enterprise Florida maintains strong trade offices in Brazil, Mexico, Colombia, and Chile to support FL companies
                                                entering those markets. The program is not suitable for companies that have already established international sales
                                                operations; it explicitly targets companies entering a market for the first time.
                                            </p>
                                        </CardContent>
                                    </Card>

                                    <Card className="border-l-4 border-l-teal-500">
                                        <CardHeader>
                                            <div className="flex items-start justify-between">
                                                <CardTitle className="text-lg">5. Florida Job Growth Grant Fund</CardTitle>
                                                <Badge className="bg-teal-100 text-teal-800 shrink-0 ml-2">$250K – $5M</Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="text-gray-700 space-y-4">
                                            <p>
                                                The Florida Job Growth Grant Fund is a capital infrastructure and workforce training grant administered directly
                                                through the Governor's office. Unlike the other programs where your company applies directly, the Job Growth Grant
                                                Fund typically involves local government entities, economic development organizations, or workforce training providers
                                                applying on behalf of a private sector project. The private company acts as the economic development driver —
                                                demonstrating job creation and investment commitments — while the public entity receives and administers the grant.
                                            </p>
                                            <p>
                                                This makes it best suited for companies negotiating with local governments and counties about where to locate or
                                                expand. If you're bringing 100+ jobs to a Florida community, the county economic development authority will often
                                                apply on your behalf for Job Growth funds to subsidize the infrastructure (roads, utilities, broadband) needed
                                                to support your expansion. Many major Florida corporate relocations — including by Amazon, Boeing, and pharmaceutical
                                                manufacturers — have been supported through Job Growth Fund infrastructure grants to local communities.
                                            </p>
                                        </CardContent>
                                    </Card>

                                </div>
                            </div>

                            {/* Eligibility */}
                            <Card>
                                <CardHeader><CardTitle className="text-xl flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-600" />Florida Grant Eligibility: Who Qualifies and Who Doesn't</CardTitle></CardHeader>
                                <CardContent className="text-gray-700">
                                    <p className="mb-4 leading-relaxed">
                                        Florida's business incentive programs have specific eligibility criteria that vary by program. Before investing time in any
                                        application, confirm you meet the core requirements. The most common rejection reason is applying to programs before
                                        beginning a project — for performance-based programs like QTI, retroactive applications are never accepted.
                                    </p>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2"><CheckCircle className="h-4 w-4" /> Generally Eligible</h3>
                                            <ul className="space-y-2 text-sm">
                                                {["Florida-registered for-profit businesses", "Companies in QTI target industries (tech, finance, biotech, aerospace, defense)", "Businesses with at least 1 year of Florida operating history", "Companies creating jobs at ≥115% of county average wage", "Tech companies in the 23-county High Tech Corridor", "Florida-based manufacturers and exporters", "Any for-profit FL business with 10+ employees seeking training reimbursement (IWT)"].map(i => <li key={i} className="flex items-start gap-2"><CheckCircle className="h-3.5 w-3.5 text-green-500 mt-0.5 shrink-0" />{i}</li>)}
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-red-800 mb-3 flex items-center gap-2"><AlertCircle className="h-4 w-4" /> Generally Not Eligible</h3>
                                            <ul className="space-y-2 text-sm">
                                                {["Retail, restaurant, and hospitality businesses (for QTI and High Tech programs)", "Businesses creating jobs below the county average wage", "Non-Florida registered entities without FL operations", "Companies that have already started the project being funded", "Consumer-facing service businesses without a B2B or export component", "Businesses with unresolved Florida tax or legal issues"].map(i => <li key={i} className="flex items-start gap-2"><AlertCircle className="h-3.5 w-3.5 text-red-500 mt-0.5 shrink-0" />{i}</li>)}
                                            </ul>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* How to Apply */}
                            <Card>
                                <CardHeader><CardTitle className="text-xl flex items-center gap-2"><FileText className="h-5 w-5 text-blue-600" />How to Apply for Florida Business Grants — Step by Step</CardTitle></CardHeader>
                                <CardContent className="text-gray-700">
                                    <p className="mb-6 leading-relaxed">
                                        The application process for Florida grants varies significantly by program. Some (QTI) require engagement before any business
                                        decision is made. Others (IWT) operate on a rolling quarterly schedule. High Tech Corridor grants are competitive but continuous.
                                        Here's the complete step-by-step process for each major program type:
                                    </p>
                                    <div className="space-y-4">
                                        {[
                                            { step: "1", title: "Identify Which Programs Match Your Current Stage", desc: "Use Enterprise Florida's Business Incentives Screening Tool at eflorida.com, or call (877) 352-3672 for a free 30-minute consultation. Florida program officers will honestly tell you which programs you qualify for based on your industry, location, and planned activities. This pre-screening call is free and can save weeks of time spent on unsuitable applications." },
                                            { step: "2", title: "For QTI — Contact DEO Before Any Hiring Decisions", desc: "This cannot be overstated: if you might qualify for QTI, call DEO's incentives division immediately — even before you know for certain that you'll hire. The pre-approval process takes 30–60 days, and you must have approval in hand before extending any job offers, signing leases, or purchasing equipment for an expansion project. The cost of not doing this is $3,000–$6,000 per job that goes unclaimed." },
                                            { step: "3", title: "For High Tech Corridor — Identify Your University Partner First", desc: "The High Tech Corridor application must include a named principal investigator from a qualifying university. Before writing your application, contact the research commercialization office at UF (research.ufl.edu), UCF (techtransfer.ucf.edu), or USF (research.usf.edu). They maintain lists of faculty actively looking for industry partners and can connect you within days. The partnership discussion takes 1–3 months before you have a proposal ready." },
                                            { step: "4", title: "Gather Your Core Business Documentation", desc: "All Florida grant applications require a standard document package. Prepare in advance: Florida business registration certificate, 3 years of audited financial statements or reviewed financials, 3 years of federal corporate tax returns, current employee roster with job titles and wage levels, detailed project description with budget breakdown, timeline and milestone plan, and for QTI specifically, a job creation schedule showing when each new position starts and at what salary." },
                                            { step: "5", title: "For IWT — Contact Your Regional CareerSource Board", desc: "CareerSource has 24 regional offices across Florida. Locate yours at careersourceflorida.com/find-yourcareer-source. IWT applications are submitted by your local board on your behalf after they've reviewed your training plan. Contact them at least 8 weeks before your planned training start date — training must not begin before the IWT application is submitted and approved." },
                                            { step: "6", title: "Submit, Track Milestones, and Document Everything", desc: "Most Florida incentives are milestone-based: funding is disbursed as you create jobs, complete training hours, or reach research deliverables. Set up internal systems to track every qualifying event from day one. Keep payroll records organized by QTI-qualifying employees, training attendance logs for IWT, and research progress reports for the Corridor. Incomplete milestone documentation is the most common reason for delayed or reduced disbursements." },
                                        ].map((item) => (
                                            <div key={item.step} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                                                <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold shrink-0">{item.step}</div>
                                                <div><div className="font-semibold text-gray-900 mb-1">{item.title}</div><div className="text-sm text-gray-600 leading-relaxed">{item.desc}</div></div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Common Mistakes */}
                            <Card className="border-red-100 bg-red-50">
                                <CardHeader><CardTitle className="text-xl flex items-center gap-2 text-red-900"><AlertCircle className="h-5 w-5 text-red-600" />The 5 Biggest Mistakes Florida Businesses Make with Grants</CardTitle></CardHeader>
                                <CardContent className="text-red-900 space-y-4">
                                    {[
                                        { n: "1", m: "Starting QTI-Qualifying Activities Before Approval", d: "This single mistake costs Florida businesses millions of dollars in unclaimed tax refunds every year. The QTI program is explicitly a pre-activity incentive — the government wants to know you're choosing Florida over another option, and if you've already started, you've proven you didn't need the incentive to make that choice. Pre-approval takes 30–60 days. Call DEO before any hiring, lease-signing, or equipment purchasing." },
                                        { n: "2", m: "Applying to the High Tech Corridor Without a Real University Partnership", d: "Corridor staff can tell immediately when a university relationship is superficial — a brief email exchange with a professor does not constitute a research partnership. Successful proposals involve faculty members who are co-authors on the research plan, who contribute specific laboratory resources or datasets, and who have a genuine scientific interest in the commercial outcome. Budget 3–6 months to develop a real partnership before applying." },
                                        { n: "3", m: "Not Stacking State and Federal Programs", d: "The single biggest funding optimization error is treating state programs and federal programs as either/or choices. A Florida tech company can simultaneously have: an NSF SBIR Phase I award ($305K) for core technology development, a High Tech Corridor matching grant ($100K) for a related applied research project, and an IWT reimbursement ($50K) for training the engineering team they hired with the SBIR funding. These programs explicitly allow co-funding of different project components." },
                                        { n: "4", m: "Missing the Export Diversification Program Reimbursement Window", d: "The Export Diversification Program reimburses expenses after they're incurred — but you must be registered with Enterprise Florida before attending the trade show or trade mission. Many Florida exporters attend international shows and then find out they can't claim reimbursement because they weren't registered beforehand. Register with Enterprise Florida's export team at least 90 days before any international trip or trade show." },
                                        { n: "5", m: "Submitting IWT After Training Has Already Started", d: "Like QTI, IWT requires pre-approval before training begins. If your employees start taking courses before your IWT application is submitted and approved, those training costs are ineligible for reimbursement. Plan your CareerSource engagement at minimum 8 weeks before training start dates, especially for large-scale training programs spanning multiple employee groups." },
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
                                <CardHeader><CardTitle className="text-xl flex items-center gap-2 text-amber-800"><Lightbulb className="h-5 w-5 text-amber-600" />Expert Strategy: Maximizing Florida Business Funding</CardTitle></CardHeader>
                                <CardContent className="text-amber-900 space-y-4">
                                    <div className="bg-white rounded-lg p-4 border border-amber-200">
                                        <div className="font-semibold mb-2">💡 The Three-Layer Funding Stack</div>
                                        <p className="text-sm leading-relaxed">Florida&apos;s most sophisticated funding recipients use a three-layer approach: federal SBIR Phase I ($305K) for core R&D, High Tech Corridor matching grant ($100K–$200K) for applied research with a university partner, and QTI tax refunds ($30K–$60K) as the team hired with the SBIR funding creates qualified jobs. Total non-dilutive capital: $435K–$565K from three programs running in parallel. This approach requires 6–12 months of planning and sequencing but is well-documented as a best practice by Florida SBIR support offices.</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 border border-amber-200">
                                        <div className="font-semibold mb-2">💡 Use IWT to Offset Salary Costs for New Hires</div>
                                        <p className="text-sm leading-relaxed">When you hire QTI-qualifying employees, many require onboarding and skills training in your specific systems and processes. Apply for IWT immediately after hiring to reimburse 50–75% of that onboarding training cost. For a hiring class of 20 employees at $5,000 training cost each, that&apos;s $50K–$75K in IWT reimbursements layered on top of $60K–$120K in QTI tax refunds for the same hiring cohort. Very few Florida HR teams are aware this is possible.</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 border border-amber-200">
                                        <div className="font-semibold mb-2">💡 Rural Area Locations Double Your QTI Value</div>
                                        <p className="text-sm leading-relaxed">If your business operations can be located in a Florida rural area (defined by DEO), your QTI refund per qualifying job doubles from $3,000 to $6,000. For a company creating 50 high-wage jobs, the difference between an urban and rural location choice is $150,000 in additional tax refunds. Several rural Florida counties — particularly in North Florida and the Panhandle — have strong infrastructure, affordable real estate, and proximity to university researchers who welcome the collaboration opportunity.</p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Timeline */}
                            <Card>
                                <CardHeader><CardTitle className="text-xl flex items-center gap-2"><TrendingUp className="h-5 w-5 text-blue-600" />Realistic Timeline: From Application to Receiving Florida Grant Funds</CardTitle></CardHeader>
                                <CardContent className="text-gray-700">
                                    <p className="mb-4 leading-relaxed">One of the most important planning factors is understanding how long Florida grant disbursements actually take. Don't plan your cash flow around grant receipt — plan your operations independently and treat grants as bonuses that arrive on a government timeline, not a startup timeline.</p>
                                    <div className="space-y-3">
                                        {[
                                            { prog: "QTI Tax Refund", timeline: "12–18 months from first hire to first disbursement", detail: "Pre-approval: 30–60 days → First qualifying jobs created → Annual milestone verification → DEO processes refund claim. Initial payment typically 12–18 months after pre-approval." },
                                            { prog: "High Tech Corridor", timeline: "4–6 months application review + project duration", detail: "Rolling intake with 4–6 month review cycle. Funding disbursed in milestone tranches during the 12–24 month research project." },
                                            { prog: "IWT Training Reimbursement", timeline: "60–90 days after training completes", detail: "Submit application 8 weeks before training. CareerSource approves. Training runs. Reimbursement claim submitted after completion. Check received in 60–90 days." },
                                            { prog: "Export Diversification", timeline: "30–60 days after international activity", detail: "Register with Enterprise Florida. Attend trade show / mission. Submit expense report with receipts. Reimbursement within 30–60 days of approved claim." },
                                        ].map(({ prog, timeline, detail }) => (
                                            <div key={prog} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                                                <div className="shrink-0 w-2 h-full bg-blue-400 rounded" />
                                                <div>
                                                    <div className="font-semibold text-gray-900">{prog}</div>
                                                    <div className="text-sm text-blue-700 font-medium mt-0.5">{timeline}</div>
                                                    <div className="text-xs text-gray-600 mt-1">{detail}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* FAQ */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Frequently Asked Questions: Florida Business Grants 2026</h2>
                                <p className="text-gray-600 mb-6">These are the most common questions we receive from Florida businesses researching state funding. If your question isn't answered below, contact us for a free consultation.</p>
                                <div className="space-y-4">
                                    {[
                                        { q: "Does Florida have direct cash grants for small businesses in 2026?", a: "Florida's general business grant programs are primarily performance-based (tied to job creation, training completion, or research milestones) or reimbursement-based (like IWT and the Export program) rather than upfront cash grants. The High Tech Corridor matching grant is the closest to a traditional direct grant — you receive a check from the Corridor after reaching research milestones. For general small business cash grants, the SBA SBIR program provides the most accessible non-performance-based funding, with Phase I awards of $305K available to any small business conducting R&D in NSF topic areas." },
                                        { q: "Can a startup that's less than 1 year old apply for Florida business grants?", a: "Many Florida programs require at least 1 year of operating history to verify financial stability and business viability. The High Tech Corridor has the lowest barrier — early-stage companies in the 23-county region can apply as long as they have a genuine university research partnership and matching cash. For pre-revenue startups, federal SBIR Phase I (no revenue requirement for NSF, NIH) followed by layering state programs is the proven pathway. SBIR Phase I wins also significantly improve your credibility for subsequent Florida state applications." },
                                        { q: "Can a company outside Florida use these programs if they're expanding into FL?", a: "Yes — out-of-state companies establishing or expanding Florida operations are explicitly eligible for QTI, IWT, and the Export programs. In fact, QTI is most powerful in competitive relocation situations, where Florida's refund can be the deciding factor against another state. The key is to engage Florida DEO and Enterprise Florida before your location decision is made. Out-of-state companies setting up Florida research offices can also apply for the High Tech Corridor grant if the research activities physically occur within the 23-county region." },
                                        { q: "What are Florida's QTI target industries for 2026?", a: "Florida's current QTI target industries include: Clean Technology / Renewable Energy, Corporate Headquarters, Data Science / Information Technology, Defense & Homeland Security, Financial & Professional Services, Life Sciences, Semiconductor & Microelectronics, and Transportation Equipment Manufacturing. Businesses in these sectors creating 10+ high-wage Florida jobs (at or above 115% of the county average wage) qualify. If your sector isn't on this list, you may still qualify if you can demonstrate that 50%+ of your revenues come from outside Florida (the 'traded sector' test)." },
                                        { q: "How does the IWT program interact with other FL workforce programs?", a: "IWT can be combined with other CareerSource programs including the Work Opportunity Tax Credit (WOTC) administration, apprenticeship program development, and on-the-job training (OJT) reimbursements. They fund different expense types: IWT covers upskilling existing employees, while OJT covers training for newly hired employees (particularly those from CareerSource's talent pool). Many Florida manufacturers use all three simultaneously — WOTC tax credits for eligible new hires, OJT reimbursement for their first 90 days, and IWT for the ongoing technical skills development of the same workers after the OJT period ends." },
                                        { q: "Can Florida businesses access both state and federal grants simultaneously?", a: "Yes — and they should. Florida state programs are designed to complement, not replace, federal funding. The most common and successful combination is: NSF SBIR (for core technology R&D) + High Tech Corridor matching grant (for applied university research) + QTI (for the jobs created with SBIR funding) + IWT (for training those new employees). Each program funds different cost categories, and using overlapping state and federal grants for the same expense is prohibited — but funding different aspects of your business growth plan with multiple programs is both allowed and encouraged by Florida economic development officials." },
                                        { q: "Is there a Florida grant specifically for women-owned or minority-owned businesses?", a: "Florida doesn't have a standalone direct grant exclusively for women-owned or minority-owned businesses at the state level, but several programs give priority consideration: the SBA 8(a) Business Development Program provides federal contract set-asides nationally and is available to FL businesses. The Florida Office of Supplier Diversity (OSD) certifies minority and women-owned businesses and helps them access state contracting opportunities — which while not grants, represent significant revenue. Additionally, many CareerSource regions have dedicated technical assistance and coaching for diverse business owners applying to IWT and other programs." },
                                        { q: "What documentation do I need to start a Florida grant application?", a: "Core documentation required for nearly all Florida business grant applications: (1) Florida Division of Corporations registration (sunbiz.org) showing your FL registration is active. (2) 3 years of financial statements — audited preferred, but reviewed financials may be accepted for smaller companies. (3) 3 years of federal corporate tax returns. (4) Current company org chart and employee roster with job titles, salaries, and hire dates. (5) Specific project description with budget, timeline, and defined deliverables. (6) For QTI specifically: job creation schedule by position, title, and salary level over 3 years. Having these 6 items ready in advance reduces application time from weeks to days." },
                                    ].map((item, i) => (
                                        <Card key={i}><CardContent className="pt-5">
                                            <div className="font-semibold text-gray-900 mb-2 text-base">{item.q}</div>
                                            <div className="text-gray-600 text-sm leading-relaxed">{item.a}</div>
                                        </CardContent></Card>
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            <Card className="bg-blue-600 text-white">
                                <CardContent className="pt-6">
                                    <Star className="h-8 w-8 text-yellow-300 mb-3" />
                                    <h3 className="font-bold text-lg mb-2">Free Florida Grant Matching</h3>
                                    <p className="text-blue-100 text-sm mb-4">Our grant specialists review your business and identify every FL program you qualify for — free consultation, no commitment required.</p>
                                    <Link href="/contact"><Button className="w-full bg-white text-blue-600 hover:bg-blue-50">Get Free Matching <ArrowRight className="h-4 w-4 ml-1" /></Button></Link>
                                </CardContent>
                            </Card>
                            <NewsletterSignup variant="sidebar" />
                            <Card>
                                <CardHeader><CardTitle className="text-lg">Key Florida Agency Contacts</CardTitle></CardHeader>
                                <CardContent className="text-sm space-y-3">
                                    <div><div className="font-semibold">Enterprise Florida</div><div className="text-gray-500">(877) 352-3672 | eflorida.com</div></div>
                                    <div><div className="font-semibold">FL Dept. of Economic Opportunity</div><div className="text-gray-500">(850) 245-7130 | floridajobs.org</div></div>
                                    <div><div className="font-semibold">CareerSource Florida (IWT)</div><div className="text-gray-500">careersourceflorida.com</div></div>
                                    <div><div className="font-semibold">High Tech Corridor</div><div className="text-gray-500">floridahightech.com</div></div>
                                    <div><div className="font-semibold">FL SBIR/STTR Support</div><div className="text-gray-500">Florida SBIR office at each major university R&D office</div></div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader><CardTitle className="text-lg">Related Resources</CardTitle></CardHeader>
                                <CardContent>
                                    <div className="space-y-2 text-sm">
                                        <Link href="/usa/federal-grants" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> Federal Grants for FL Businesses</Link>
                                        <Link href="/usa/small-business-grants" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> SBA Small Business Grants</Link>
                                        <Link href="/usa/texas" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> Texas Business Grants</Link>
                                        <Link href="/usa/new-york" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> New York Business Grants</Link>
                                        <Link href="/blog/sbir-sttr-complete-guide" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> NSF SBIR Complete Guide</Link>
                                        <Link href="/grant-finder" className="flex items-center gap-1.5 text-primary hover:underline"><ArrowRight className="h-3.5 w-3.5" /> AI Grant Finder Tool</Link>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    <div className="mb-8">
                        <NewsletterSignup title="Get Florida Grant Updates Delivered" description="We track 15+ Florida business incentive programs and notify you of new openings, QTI pre-approval windows, High Tech Corridor application cycles, and IWT quarterly intake dates." />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
