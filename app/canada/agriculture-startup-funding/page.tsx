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
    title: "Agriculture Startup Funding 2025 | Canada Agritech Grants",
    description:
        "Find agriculture startup funding and grants in Canada. Complete guide to agritech grants, FCC loans, and Sustainable Canadian Agricultural Partnership.",
    keywords:
        "Agriculture grants Canada, agritech funding, farm startup grants, FCC loans, Sustainable CAP, food processing grants",
}

const agriGrants: Grant[] = [
    {
        id: "ag-agrishield",
        name: "AgriShield",
        fundingMin: 5000,
        fundingMax: 50000,
        eligibility: ["Farmers", "Agricultural businesses"],
        deadline: "Ongoing",
        applicationLink: "https://agriculture.canada.ca/",
        description: "Risk management and resiliency planning for farms.",
        country: "Canada",
        region: "Federal",
        category: "Agriculture",
        agency: "Agriculture Canada",
        status: "Active",
        tags: ["Risk Management", "Farm"],
        requirements: ["Risk assessment"],
        lastUpdated: "2025-01-01"
    },
    {
        id: "ag-agriinnovate",
        name: "AgriInnovate Program",
        fundingMin: 100000,
        fundingMax: 5000000,
        eligibility: ["For-profit organizations", "Agri-food sector"],
        deadline: "Rolling",
        applicationLink: "https://agriculture.canada.ca/en/programs/agriinnovate",
        description: "Funding for commercialization of innovative agricultural technologies and processes.",
        country: "Canada",
        region: "Federal",
        category: "Innovation",
        agency: "AAFC",
        status: "Active",
        tags: ["Innovation", "Commercialization"],
        requirements: ["Business case", "Innovation description"],
        lastUpdated: "2025-01-01"
    },
    {
        id: "ag-fcc",
        name: "FCC Young Farmer Loan",
        fundingMin: 100000,
        fundingMax: 1500000,
        eligibility: ["Farmers under 40", "Qualified producers"],
        deadline: "Ongoing",
        applicationLink: "https://www.fcc-fac.ca/",
        description: "Loans with special rates for young farmers starting or expanding their business.",
        country: "Canada",
        region: "Federal",
        category: "Loans",
        agency: "Farm Credit Canada",
        status: "Active",
        tags: ["Loan", "Young Farmer"],
        requirements: ["Credit check", "Business plan"],
        lastUpdated: "2025-01-01"
    },
]

export default function AgricultureGrantsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <Header />

            <main className="container mx-auto px-4 py-12">
                <div className="max-w-6xl mx-auto">
                    {/* Hero Section */}
                    <div className="text-center mb-12">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <Users className="h-6 w-6 text-primary" />
                            <Badge variant="secondary" className="bg-primary/10 text-primary">
                                Agriculture Funding
                            </Badge>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Agriculture Startup Funding 2025</h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                            Discover grants, loans, and funding opportunities for agriculture startups, agritech innovation, and food processors in Canada.
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
                                <div className="text-2xl font-bold text-primary">$3.5B+</div>
                                <p className="text-xs text-muted-foreground">Sustainable CAP funding</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Active Programs</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-primary">25+</div>
                                <p className="text-xs text-muted-foreground">Federal & Provincial</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Sector Growth</CardTitle>
                                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-primary">High</div>
                                <p className="text-xs text-muted-foreground">Demand for Agritech</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Grant Comparison Table */}
                    <div className="mb-12">
                        <GrantComparisonTable
                            grants={agriGrants}
                            title="Agriculture Grants Comparison"
                        />
                    </div>

                    {/* Content Sections */}
                    <div className="grid lg:grid-cols-3 gap-8 mb-12">
                        <div className="lg:col-span-2 space-y-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Agriculture & Agri-Food Opportunities</CardTitle>
                                </CardHeader>
                                <CardContent className="prose max-w-none">
                                    <p>
                                        The Sustainable Canadian Agricultural Partnership (Sustainable CAP) acts as the main policy framework, delivering billions in funding over 5 years. Programs target innovation, sustainability, and market development.
                                    </p>

                                    <h3>Key Funding Programs</h3>
                                    <ul>
                                        <li>
                                            <strong>AgriInnovate</strong> - Accelerating the commercializations of new products/tech.
                                        </li>
                                        <li>
                                            <strong>AgriMarketing</strong> - Growing market opportunities export.
                                        </li>
                                        <li>
                                            <strong>Farm Credit Canada (FCC)</strong> - Specialized loans and startup financing.
                                        </li>
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
                                        <a href="/canada/manitoba" className="block text-primary hover:underline">
                                            Manitoba Funding
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
                            title="Get Agritech Grant Updates"
                            description="Stay informed about new agriculture business grants and funding opportunities"
                        />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
