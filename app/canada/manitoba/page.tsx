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
    title: "Manitoba Business Grants 2026 | Provincial Funding Programs",
    description:
        "Find Manitoba business grants and provincial funding programs. Complete guide to Manitoba government grants, eligibility requirements, and application deadlines.",
    keywords:
        "Manitoba business grants, Manitoba government funding, provincial grants Manitoba, Winnipeg business grants, startup funding Manitoba",
}

const manitobaGrants: Grant[] = [
    {
        id: "mb-igp",
        name: "Innovation Growth Program",
        fundingMin: 25000,
        fundingMax: 100000,
        eligibility: ["SMEs", "Commercializing new products"],
        deadline: "Quarterly intakes",
        applicationLink: "https://www.gov.mb.ca/iec/invest/igp.html",
        description: "Funding for innovative product commercialization and growth.",
        country: "Canada",
        region: "Manitoba",
        category: "Innovation",
        agency: "Government of Manitoba",
        status: "Active",
        tags: ["Innovation", "Commercialization"],
        requirements: ["Business plan", "Market analysis"],
        lastUpdated: "2026-01-01"
    },
    {
        id: "mb-mwci",
        name: "Manitoba Works Capital Incentive",
        fundingMin: 100000,
        fundingMax: 1000000,
        eligibility: ["Major capital investments", "Job creation"],
        deadline: "Open",
        applicationLink: "https://www.gov.mb.ca/iec/invest/mwci.html",
        description: "Tax Increment Financing for significant capital investment projects.",
        country: "Canada",
        region: "Manitoba",
        category: "Business Development",
        agency: "Government of Manitoba",
        status: "Active",
        tags: ["Capital", "Investment"],
        requirements: ["Project proposal", "Economic benefit analysis"],
        lastUpdated: "2026-01-01"
    },
    {
        id: "mb-sector",
        name: "Sector Support Program",
        fundingMin: 10000,
        fundingMax: 150000,
        eligibility: ["Key economic sectors", "Business expansion"],
        deadline: "Various",
        applicationLink: "https://www.gov.mb.ca/",
        description: "Support for strategic sector growth and expansion.",
        country: "Canada",
        region: "Manitoba",
        category: "Sector Specific",
        agency: "Government of Manitoba",
        status: "Active",
        tags: ["Sector", "Growth"],
        requirements: ["Sector alignment"],
        lastUpdated: "2026-01-01"
    },
]

export default function ManitobaGrantsPage() {
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
                                Manitoba Provincial Funding
                            </Badge>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Manitoba Business Grants 2026</h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                            Discover comprehensive Manitoba provincial funding programs, business grants, and government incentives
                            available to entrepreneurs and companies across Manitoba.
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
                                <div className="text-2xl font-bold text-primary">$60M+</div>
                                <p className="text-xs text-muted-foreground">Annual provincial programs</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Active Programs</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-primary">15+</div>
                                <p className="text-xs text-muted-foreground">Provincial grant programs</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-primary">38%</div>
                                <p className="text-xs text-muted-foreground">Average approval rate</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Grant Comparison Table */}
                    <div className="mb-12">
                        <GrantComparisonTable
                            grants={manitobaGrants}
                            title="Manitoba Business Grants Comparison"
                        />
                    </div>

                    {/* Content Sections */}
                    <div className="grid lg:grid-cols-3 gap-8 mb-12">
                        <div className="lg:col-span-2 space-y-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Manitoba Business Grant Opportunities</CardTitle>
                                </CardHeader>
                                <CardContent className="prose max-w-none">
                                    <p>
                                        Manitoba offers targeted support for innovation, manufacturing, and food processing. The Innovation Growth Program is a key funding source for SMEs looking to commercialize new technologies.
                                    </p>

                                    <h3>Key Manitoba Grant Programs</h3>
                                    <ul>
                                        <li>
                                            <strong>Innovation Growth Program (IGP)</strong> - Cost-sharing assistance for commercialization
                                        </li>
                                        <li>
                                            <strong>Manitoba Works Capital Incentive</strong> - Tax rebates for capital investment
                                        </li>
                                        <li>
                                            <strong>Industry Expansion Program</strong> - Support for skills training
                                        </li>
                                    </ul>

                                    <h3>Eligibility Requirements</h3>
                                    <p>
                                        Typically requires:
                                    </p>
                                    <ul>
                                        <li>Permanent establishment in Manitoba</li>
                                        <li>Projects that generate economic benefit for the province</li>
                                        <li>Financial capacity to complete the project</li>
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
                                        <a href="/canada/saskatchewan" className="block text-primary hover:underline">
                                            Saskatchewan Funding
                                        </a>
                                        <a href="/canada/government-grants" className="block text-primary hover:underline">
                                            Federal Canadian Grants
                                        </a>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Newsletter CTA */}
                    <div className="mb-8">
                        <NewsletterSignup
                            title="Get Manitoba Grant Updates"
                            description="Stay informed about new Manitoba business grants and funding opportunities"
                        />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
