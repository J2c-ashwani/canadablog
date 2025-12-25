import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { GrantComparisonTable } from "@/components/grant-comparison-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, DollarSign, Users, TrendingUp } from "lucide-react"
import type { Metadata } from "next"
import type { Grant } from "@/lib/grants-data"

export const metadata: Metadata = {
    title: "Quebec Business Grants 2025 | Provincial Funding Programs",
    description:
        "Find Quebec business grants and provincial funding programs. Complete guide to Quebec government grants (programs de subventions), eligibility requirements, and application deadlines.",
    keywords:
        "Quebec business grants, Quebec government funding, subventions entreprises Quebec, Investissement Quebec, startup funding Quebec",
}

const quebecGrants: Grant[] = [
    {
        id: "qc-essor",
        name: "Investissement Quebec - ESSOR",
        fundingMin: 100000,
        fundingMax: 5000000,
        eligibility: ["Strategic investment projects", "Quebec businesses"],
        deadline: "Rolling basis",
        applicationLink: "https://www.investquebec.com/quebec/en/financial-products/all-our-solutions/ESSOR.html",
        description: "Support for strategic investment projects driving economic development.",
        country: "Canada",
        region: "Quebec",
        category: "Business Growth",
        agency: "Investissement Québec",
        status: "Active",
        tags: ["Investment", "Strategic", "Growth"],
        requirements: ["Business plan", "Financials"],
        lastUpdated: "2025-01-01"
    },
    {
        id: "qc-technoclimat",
        name: "Technoclimat",
        fundingMin: 50000,
        fundingMax: 3000000,
        eligibility: ["Technological innovation in energy", "Quebec companies"],
        deadline: "Open",
        applicationLink: "https://transitionenergetique.gouv.qc.ca/en/innovation/programme-technoclimat",
        description: "Funding for technological innovation in energy efficiency and emissions reduction.",
        country: "Canada",
        region: "Quebec",
        category: "Green Energy",
        agency: "Transition Énergétique Québec",
        status: "Active",
        tags: ["Green", "Energy", "Innovation"],
        requirements: ["Technical documentation", "Emissions impact"],
        lastUpdated: "2025-01-01"
    },
    {
        id: "qc-pme-action",
        name: "PME en action",
        fundingMin: 10000,
        fundingMax: 50000,
        eligibility: ["SMEs in Quebec", "Productivity projects"],
        deadline: "Various",
        applicationLink: "https://www.economie.gouv.qc.ca/",
        description: "Program to increase the productivity of Quebec SMEs.",
        country: "Canada",
        region: "Quebec",
        category: "SME Support",
        agency: "Ministry of Economy",
        status: "Active",
        tags: ["Productivity", "SME"],
        requirements: ["Project plan"],
        lastUpdated: "2025-01-01"
    },
    {
        id: "qc-creativite",
        name: "Créativité Québec",
        fundingMin: 100000,
        fundingMax: 5000000,
        eligibility: ["Innovative projects", "Companies in Quebec"],
        deadline: "Ongoing",
        applicationLink: "https://www.investquebec.com/",
        description: "Financing for projects that purchase new technologies or develop innovative products.",
        country: "Canada",
        region: "Quebec",
        category: "Innovation",
        agency: "Investissement Québec",
        status: "Active",
        tags: ["Innovation", "Technology"],
        requirements: ["Innovation assessment"],
        lastUpdated: "2025-01-01"
    },
]

export default function QuebecGrantsPage() {
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
                                Quebec Provincial Funding
                            </Badge>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Quebec Business Grants 2025</h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                            Discover comprehensive Quebec provincial funding programs, business grants, and government incentives
                            available to entrepreneurs and companies across Quebec.
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Available Funding</CardTitle>
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-primary">$350M+</div>
                                <p className="text-xs text-muted-foreground">Annual provincial programs</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Active Programs</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-primary">25+</div>
                                <p className="text-xs text-muted-foreground">Provincial grant programs</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-primary">35%</div>
                                <p className="text-xs text-muted-foreground">Average approval rate</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Grant Comparison Table */}
                    <div className="mb-12">
                        <GrantComparisonTable
                            grants={quebecGrants}
                            title="Quebec Business Grants Comparison"
                        />
                    </div>

                    {/* Content Sections */}
                    <div className="grid lg:grid-cols-3 gap-8 mb-12">
                        <div className="lg:col-span-2 space-y-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Quebec Business Grant Opportunities</CardTitle>
                                </CardHeader>
                                <CardContent className="prose max-w-none">
                                    <p>
                                        Quebec offers a robust ecosystem of financial support for businesses, primarily through Investissement Quebec and various provincial ministries. The focus is heavily on innovation, export, and sustainable development.
                                    </p>

                                    <h3>Key Quebec Grant Programs</h3>
                                    <ul>
                                        <li>
                                            <strong>ESSOR Program</strong> - Major support for strategic investment projects
                                        </li>
                                        <li>
                                            <strong>Technoclimat</strong> - Funding for energy efficiency and green tech
                                        </li>
                                        <li>
                                            <strong>PME en action</strong> - Support for productivity and growth initiatives
                                        </li>
                                        <li>
                                            <strong>Créativité Québec</strong> - Financing for innovative projects
                                        </li>
                                    </ul>

                                    <h3>Eligibility Requirements</h3>
                                    <p>
                                        Quebec business grants typically require:
                                    </p>
                                    <ul>
                                        <li>Business registration in Quebec (NEQ)</li>
                                        <li>Operational presence in the province</li>
                                        <li>For some programs, French language compliance</li>
                                        <li>Project alignment with economic development goals</li>
                                    </ul>

                                    <h3>Application Process</h3>
                                    <p>
                                        Applications are often managed through Investissement Québec or specific ministries. Detailed project plans, financial statements, and proof of additional financing are commonly required.
                                    </p>
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
                                        <a href="/canada/ontario" className="block text-primary hover:underline">
                                            Ontario Business Grants
                                        </a>
                                        <a href="/canada/government-grants" className="block text-primary hover:underline">
                                            Federal Canadian Grants
                                        </a>
                                        <a href="/grant-finder" className="block text-primary hover:underline">
                                            AI Grant Finder Tool
                                        </a>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Newsletter CTA */}
                    <div className="mb-8">
                        <NewsletterSignup
                            title="Get Quebec Grant Updates"
                            description="Stay informed about new Quebec business grants and funding opportunities"
                        />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
