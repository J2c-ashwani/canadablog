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
    title: "Nova Scotia Business Grants 2025 | Provincial Funding Programs",
    description:
        "Find Nova Scotia business grants and provincial funding programs. Complete guide to Nova Scotia government grants, Invest Nova Scotia funding, and application deadlines.",
    keywords:
        "Nova Scotia business grants, Nova Scotia government funding, provincial grants NS, Halifax business grants, Invest Nova Scotia",
}

const nsGrants: Grant[] = [
    {
        id: "ns-export",
        name: "Export Development Program",
        fundingMin: 5000,
        fundingMax: 15000,
        eligibility: ["Export-ready NS businesses", "SMEs"],
        deadline: "Rolling",
        applicationLink: "https://investnovascotia.ca/export/export-development-program",
        description: "Support for travel and export marketing activities.",
        country: "Canada",
        region: "Nova Scotia",
        category: "Export",
        agency: "Invest Nova Scotia",
        status: "Active",
        tags: ["Export", "Marketing"],
        requirements: ["Export plan", "Travel budget"],
        lastUpdated: "2025-01-01"
    },
    {
        id: "ns-loan-guarantee",
        name: "Small Business Loan Guarantee",
        fundingMin: 10000,
        fundingMax: 500000,
        eligibility: ["Small businesses", "Social enterprises", "Co-ops"],
        deadline: "Ongoing",
        applicationLink: "https://cuc.cu/business/small-business-loan-guarantee-program/",
        description: "Financing support through credit unions to help small businesses access capital.",
        country: "Canada",
        region: "Nova Scotia",
        category: "Small Business",
        agency: "Credit Unions / Prov NS",
        status: "Active",
        tags: ["Loan", "Small Business"],
        requirements: ["Business plan", "Credit union application"],
        lastUpdated: "2025-01-01"
    },
    {
        id: "ns-gto",
        name: "Graduate to Opportunity",
        fundingMin: 10000,
        fundingMax: 50000,
        eligibility: ["Employers hiring recent grads", "Nova Scotia businesses"],
        deadline: "Ongoing",
        applicationLink: "https://novascotia.ca/programs/graduate-to-opportunity/",
        description: "Salary subsidy for hiring recent post-secondary graduates.",
        country: "Canada",
        region: "Nova Scotia",
        category: "Workforce",
        agency: "Government of Nova Scotia",
        status: "Active",
        tags: ["Hiring", "Youth"],
        requirements: ["New hire details"],
        lastUpdated: "2025-01-01"
    },
]

export default function NovaScotiaGrantsPage() {
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
                                Nova Scotia Provincial Funding
                            </Badge>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Nova Scotia Business Grants 2025</h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                            Discover comprehensive Nova Scotia provincial funding programs, business grants, and government incentives
                            available to entrepreneurs and companies across Nova Scotia.
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
                                <div className="text-2xl font-bold text-primary">$40M+</div>
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
                                <div className="text-2xl font-bold text-primary">45%</div>
                                <p className="text-xs text-muted-foreground">Average approval rate</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Grant Comparison Table */}
                    <div className="mb-12">
                        <GrantComparisonTable
                            grants={nsGrants}
                            title="Nova Scotia Business Grants Comparison"
                        />
                    </div>

                    {/* Content Sections */}
                    <div className="grid lg:grid-cols-3 gap-8 mb-12">
                        <div className="lg:col-span-2 space-y-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Nova Scotia Business Grant Opportunities</CardTitle>
                                </CardHeader>
                                <CardContent className="prose max-w-none">
                                    <p>
                                        Invest Nova Scotia is the primary driver of economic development, offering programs that support startups, export growth, and talent acquisition (like Graduate to Opportunity).
                                    </p>

                                    <h3>Key Nova Scotia Grant Programs</h3>
                                    <ul>
                                        <li>
                                            <strong>Export Development Program</strong> - Travel and marketing support
                                        </li>
                                        <li>
                                            <strong>Graduate to Opportunity (GTO)</strong> - Salary subsidy for hiring new grads
                                        </li>
                                        <li>
                                            <strong>Small Business Loan Guarantee</strong> - Capital access through credit unions
                                        </li>
                                    </ul>

                                    <h3>Eligibility Requirements</h3>
                                    <p>
                                        Commonly required:
                                    </p>
                                    <ul>
                                        <li>Registered to do business in Nova Scotia</li>
                                        <li>Good standing with Registry of Joint Stock Companies</li>
                                        <li>Permanently located in NS</li>
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
                                        <a href="/canada/new-brunswick" className="block text-primary hover:underline">
                                            New Brunswick Grants
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
                            title="Get Nova Scotia Grant Updates"
                            description="Stay informed about new Nova Scotia business grants and funding opportunities"
                        />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
