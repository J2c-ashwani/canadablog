import { Header } from "@/components/Header"
import EEATBadge from "@/components/blog/EEATBadge"
import ShortAnswerBox from "@/components/blog/ShortAnswerBox"
import EligibleCheck from "@/components/blog/EligibleCheck"
import InlineCTA from "@/components/blog/InlineCTA"
import { Footer } from "@/components/Footer"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { GrantComparisonTable } from "@/components/grant-comparison-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, DollarSign, Users, TrendingUp } from "lucide-react"
import type { Metadata } from "next"
import type { Grant } from "@/lib/grants-data"

export const metadata: Metadata = {
    title: "New Brunswick Business Grants 2026 | Provincial Funding Programs",
    description:
        "Find New Brunswick business grants and provincial funding programs. Complete guide to New Brunswick government grants, ONB funding, and application deadlines.",
    keywords:
        "New Brunswick business grants, NB government funding, provincial grants New Brunswick, Opportunities NB, startup funding Moncton Fredericton",
}

const nbGrants: Grant[] = [
    {
        id: "nb-business-dev",
        name: "Business Development Program",
        fundingMin: 25000,
        fundingMax: 500000,
        eligibility: ["Strategic sectors", "New Brunswick businesses"],
        deadline: "Ongoing",
        applicationLink: "https://onbcanada.ca/",
        description: "Support for expansion, modernization, and productivity improvements.",
        country: "Canada",
        region: "New Brunswick",
        category: "Business Growth",
        agency: "Opportunities NB",
        status: "Active",
        tags: ["Growth", "Expansion"],
        requirements: ["Business plan", "Financials"],
        lastUpdated: "2026-01-01"
    },
    {
        id: "nb-export",
        name: "Export Development",
        fundingMin: 5000,
        fundingMax: 20000,
        eligibility: ["Export-ready SMEs", "New Brunswick companies"],
        deadline: "Apply before travel",
        applicationLink: "https://onbcanada.ca/exporting/",
        description: "Support for international market development and export activities.",
        country: "Canada",
        region: "New Brunswick",
        category: "Export",
        agency: "Opportunities NB",
        status: "Active",
        tags: ["Export", "Marketing"],
        requirements: ["Export strategy"],
        lastUpdated: "2026-01-01"
    },
    {
        id: "nb-workforce",
        name: "Workforce Expansion",
        fundingMin: 10000,
        fundingMax: 100000,
        eligibility: ["Employers creating new jobs", "Hiring unemployed"],
        deadline: "Ongoing",
        applicationLink: "https://www2.gnb.ca/content/gnb/en/services/services_renderer.201467.Workforce_Expansion_Program.html",
        description: "Wage subsidy support for hiring unemployed individuals.",
        country: "Canada",
        region: "New Brunswick",
        category: "Workforce",
        agency: "Government of NB",
        status: "Active",
        tags: ["Hiring", "Wage Subsidy"],
        requirements: ["Hiring plan"],
        lastUpdated: "2026-01-01"
    },
]

export default function NewBrunswickGrantsPage() {
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
                                New Brunswick Provincial Funding
                            </Badge>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">New Brunswick Business Grants 2026</h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                            Discover comprehensive New Brunswick provincial funding programs, business grants, and government incentives
                            available to entrepreneurs and companies across New Brunswick.
                        </p>
            <div className="mt-4">
              <ShortAnswerBox content="New Brunswick provides hundreds of millions in provincial government grants and funding programs for startups, small businesses, and expanding enterprises in 2026." />
            </div>
            <div className="mt-4 mb-8 flex justify-center">
              <EEATBadge authorName="Ashwani K." authorImage="/ash-author-1.jpg" date="2026-02-09" />
            </div>
            <div className="mt-8 mb-8">
              <EligibleCheck />
            </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Available Funding</CardTitle>
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-primary">$35M+</div>
                                <p className="text-xs text-muted-foreground">Annual provincial programs</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Active Programs</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-primary">10+</div>
                                <p className="text-xs text-muted-foreground">Provincial grant programs</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-primary">42%</div>
                                <p className="text-xs text-muted-foreground">Average approval rate</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Grant Comparison Table */}
                    <div className="mb-12">
                        <GrantComparisonTable
                            grants={nbGrants}
                            title="New Brunswick Business Grants Comparison"
                        />
                    </div>

                    {/* Content Sections */}
                    
          <div className="mb-12">
            <InlineCTA 
                title="Need Strategy for New Brunswick Grants?"
                description="Our specialists can help you navigate New Brunswick's provincial programs."
                buttonText="Get Funding Assistance"
                buttonLink="/contact"
            />
          </div>
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
                        <div className="lg:col-span-2 space-y-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle>New Brunswick Business Grant Opportunities</CardTitle>
                                </CardHeader>
                                <CardContent className="prose max-w-none">
                                    <p>
                                        Opportunities NB (ONB) is the crown corporation responsible for economic development. They provide tailored support packages often involving a mix of non-repayable contributions and loans.
                                    </p>

                                    <h3>Key New Brunswick Grant Programs</h3>
                                    <ul>
                                        <li>
                                            <strong>Business Development Program</strong> - Core program for expansion and growth
                                        </li>
                                        <li>
                                            <strong>Workforce Expansion</strong> - Wage subsidies for new hires
                                        </li>
                                        <li>
                                            <strong>Export Development</strong> - Support for global market access
                                        </li>
                                    </ul>

                                    <h3>Eligibility Requirements</h3>
                                    <p>
                                        Standard eligibility includes:
                                    </p>
                                    <ul>
                                        <li>Operating within New Brunswick</li>
                                        <li>Registration with Corporate Registry</li>
                                        <li>Projects demonstrating clear economic benefits</li>
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
                                        <a href="/canada/nova-scotia" className="block text-primary hover:underline">
                                            Nova Scotia Grants
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
                            title="Get New Brunswick Grant Updates"
                            description="Stay informed about new New Brunswick business grants and funding opportunities"
                        />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
