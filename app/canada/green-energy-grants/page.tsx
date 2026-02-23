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
    title: "Green Energy Grants Canada 2026: $1.5B+ in Cleantech Funding",
    description:
        "Find grants and funding for green energy and cleantech projects in Canada. Complete guide to renewable energy grants, efficiency incentives, and Net Zero funding.",
    keywords:
        "Green energy grants Canada, cleantech funding, renewable energy grants, Net Zero Accelerator, energy efficiency business grants",
}

const greenGrants: Grant[] = [
    {
        id: "green-scap",
        name: "Smart Renewables and Electrification Pathways",
        fundingMin: 500000,
        fundingMax: 50000000,
        eligibility: ["Renewable energy projects", "Grid modernization"],
        deadline: "Calls for proposals",
        applicationLink: "https://natural-resources.canada.ca/",
        description: "Funding for smart renewable energy and electrical grid modernization projects.",
        country: "Canada",
        region: "Federal",
        category: "Green Energy",
        agency: "Natural Resources Canada",
        status: "Active",
        tags: ["Renewable", "Grid", "Cleantech"],
        requirements: ["Technical feasibility", "Emissions reduction"],
        lastUpdated: "2026-01-01"
    },
    {
        id: "green-homes",
        name: "Greener Neighbourhoods Pilot Program",
        fundingMin: 50000,
        fundingMax: 1000000,
        eligibility: ["Municipalities", "Developers"],
        deadline: "Rolling",
        applicationLink: "https://natural-resources.canada.ca/",
        description: "Supports deep energy retrofits in community housing and neighbourhoods.",
        country: "Canada",
        region: "Federal",
        category: "Green Building",
        agency: "NRCan",
        status: "Active",
        tags: ["Retrofit", "Efficiency"],
        requirements: ["Energy audit"],
        lastUpdated: "2026-01-01"
    },
    {
        id: "green-ag",
        name: "Agricultural Clean Technology Program",
        fundingMin: 25000,
        fundingMax: 2000000,
        eligibility: ["Farmers", "Agri-businesses"],
        deadline: "Periodic intakes",
        applicationLink: "https://agriculture.canada.ca/",
        description: "Adoption of clean technologies in the agriculture sector.",
        country: "Canada",
        region: "Federal",
        category: "Agriculture",
        agency: "Agriculture and Agri-Food Canada",
        status: "Active",
        tags: ["Agriculture", "Cleantech"],
        requirements: ["Environmental benefit"],
        lastUpdated: "2026-01-01"
    },
]

export default function GreenEnergyGrantsPage() {
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
                                Green Energy Funding
                            </Badge>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Green Energy & Cleantech Grants 2026: $1.5B+ Available</h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                            Discover grants and incentives for renewable energy projects, energy efficiency upgrades, and cleantech innovation across Canada.
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
                                <div className="text-2xl font-bold text-primary">$8B+</div>
                                <p className="text-xs text-muted-foreground">Dedicated federal funding</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Active Programs</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-primary">40+</div>
                                <p className="text-xs text-muted-foreground">Green grant programs</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Target Emissions</CardTitle>
                                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-primary">Net Zero</div>
                                <p className="text-xs text-muted-foreground">By 2050 goal</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Grant Comparison Table */}
                    <div className="mb-12">
                        <GrantComparisonTable
                            grants={greenGrants}
                            title="Green Energy Grants Comparison"
                        />
                    </div>

                    {/* Content Sections */}
                    <div className="grid lg:grid-cols-3 gap-8 mb-12">
                        <div className="lg:col-span-2 space-y-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Green Energy Opportunities</CardTitle>
                                </CardHeader>
                                <CardContent className="prose max-w-none">
                                    <p>
                                        Canada is aggressively investing in the transition to a low-carbon economy. This creates significant opportunities for businesses developing clean technologies or adopting energy-efficient practices.
                                    </p>

                                    <h3>Key Funding Areas</h3>
                                    <ul>
                                        <li>
                                            <strong>Renewable Energy Generation</strong> - Solar, wind, bioenergy
                                        </li>
                                        <li>
                                            <strong>Energy Efficiency</strong> - Building retrofits, industrial process improvements
                                        </li>
                                        <li>
                                            <strong>Clean Technology</strong> - R&D and commercialization of new solutions
                                        </li>
                                        <li>
                                            <strong>Zero-Emission Vehicles</strong> - Fleet adoption and charging infrastructure
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
                                        <a href="/canada/innovation-grants" className="block text-primary hover:underline">
                                            Innovation Grants
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
                            title="Get Green Energy Grant Updates"
                            description="Stay informed about new green energy business grants and funding opportunities"
                        />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
