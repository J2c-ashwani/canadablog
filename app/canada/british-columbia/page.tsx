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
    title: "BC Business Grants 2026: $200M+ Available [How to Apply]",
    description:
        "Find British Columbia business grants and provincial funding programs. Complete guide to BC government grants, Innovate BC funding, and application deadlines.",
    keywords:
        "BC business grants, British Columbia government funding, provincial grants BC, Innovate BC, startup funding Vancouver",
}

const bcGrants: Grant[] = [
    {
        id: "bc-ignite",
        name: "Innovate BC - Ignite",
        fundingMin: 100000,
        fundingMax: 300000,
        eligibility: ["BC-based R&D consortia", "Academic partnerships"],
        deadline: "Annual calls",
        applicationLink: "https://www.innovatebc.ca/programs/ignite/",
        description: "Funding for R&D projects addressing market problems.",
        country: "Canada",
        region: "British Columbia",
        category: "Innovation",
        agency: "Innovate BC",
        status: "Active",
        tags: ["R&D", "Technology"],
        requirements: ["Consortium agreement", "Research plan"],
        lastUpdated: "2026-01-01"
    },
    {
        id: "bc-clean-industry",
        name: "CleanBC Industry Fund",
        fundingMin: 100000,
        fundingMax: 5000000,
        eligibility: ["Industrial facilities in BC", "Emissions reduction projects"],
        deadline: "Calls for proposals",
        applicationLink: "https://www2.gov.bc.ca/gov/content/environment/climate-change/industry/cleanbc-industry-fund",
        description: "Funding for cleaner industrial operations and emissions reduction.",
        country: "Canada",
        region: "British Columbia",
        category: "Green Energy",
        agency: "Government of BC",
        status: "Active",
        tags: ["Clean Tech", "Environment"],
        requirements: ["Emissions study", "Project plan"],
        lastUpdated: "2026-01-01"
    },
    {
        id: "bc-employer-training",
        name: "BC Employer Training Grant",
        fundingMin: 1000,
        fundingMax: 300000,
        eligibility: ["Employers in BC", "Training for employees"],
        deadline: "Rolling",
        applicationLink: "https://www.workbc.ca/Employer-Resources/BC-Employer-Training-Grant.aspx",
        description: "Cost-sharing support for employee skills training.",
        country: "Canada",
        region: "British Columbia",
        category: "Workforce",
        agency: "WorkBC",
        status: "Active",
        tags: ["Training", "Workforce"],
        requirements: ["Training plan", "Employee eligibility"],
        lastUpdated: "2026-01-01"
    },
    {
        id: "bc-buy-bc",
        name: "Buy BC",
        fundingMin: 5000,
        fundingMax: 75000,
        eligibility: ["Agriculture", "Food/Beverage sector"],
        deadline: "Annual",
        applicationLink: "https://buybc.gov.bc.ca/",
        description: "Marketing support for BC food products and agricultural businesses.",
        country: "Canada",
        region: "British Columbia",
        category: "Agriculture",
        agency: "Ministry of Agriculture",
        status: "Active",
        tags: ["Agriculture", "Marketing"],
        requirements: ["Marketing plan"],
        lastUpdated: "2026-01-01"
    },
]

export default function BritishColumbiaGrantsPage() {
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
                                British Columbia Provincial Funding
                            </Badge>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">BC Business Grants 2026: $200M+ Available</h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                            Discover comprehensive BC provincial funding programs, business grants, and government incentives
                            available to entrepreneurs and companies across British Columbia.
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
                                <div className="text-2xl font-bold text-primary">$200M+</div>
                                <p className="text-xs text-muted-foreground">Annual provincial programs</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Active Programs</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-primary">22+</div>
                                <p className="text-xs text-muted-foreground">Provincial grant programs</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-primary">32%</div>
                                <p className="text-xs text-muted-foreground">Average approval rate</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Grant Comparison Table */}
                    <div className="mb-12">
                        <GrantComparisonTable
                            grants={bcGrants}
                            title="BC Business Grants Comparison"
                        />
                    </div>

                    {/* Content Sections */}
                    <div className="grid lg:grid-cols-3 gap-8 mb-12">
                        <div className="lg:col-span-2 space-y-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle>BC Business Grant Opportunities</CardTitle>
                                </CardHeader>
                                <CardContent className="prose max-w-none">
                                    <p>
                                        British Columbia provides extensive support for technology, clean energy, and natural resource sectors. Innovate BC plays a central role in delivering funding to tech-enabled businesses.
                                    </p>

                                    <h3>Key BC Grant Programs</h3>
                                    <ul>
                                        <li>
                                            <strong>Innovate BC Ignite</strong> - Commercialization of research
                                        </li>
                                        <li>
                                            <strong>CleanBC Industry Fund</strong> - Reducing greenhouse gas emissions
                                        </li>
                                        <li>
                                            <strong>BC Employer Training Grant</strong> - Costs of skills training
                                        </li>
                                        <li>
                                            <strong>Launch Online Grant</strong> - E-commerce adoption (periodic)
                                        </li>
                                    </ul>

                                    <h3>Eligibility Requirements</h3>
                                    <p>
                                        Standard requirements for BC grants involve:
                                    </p>
                                    <ul>
                                        <li>Registration in BC</li>
                                        <li>Operating within the province</li>
                                        <li>Compliance with WorkSafeBC</li>
                                        <li>Specific sector focus (e.g., cleantech, agrifood)</li>
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
                                        <a href="/canada/alberta" className="block text-primary hover:underline">
                                            Alberta Business Grants
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
                            title="Get BC Grant Updates"
                            description="Stay informed about new British Columbia business grants and funding opportunities"
                        />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
