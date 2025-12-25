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
    title: "Florida Business Grants 2025 | FL State Funding Programs",
    description:
        "Find Florida small business grants and state funding programs. Complete guide to Enterprise Florida grants, research funding, and business incentives.",
    keywords:
        "Florida business grants, Florida state funding, small business grants Florida, Enterprise Florida, FL government grants",
    alternates: {
        canonical: "https://www.fsidigital.ca/usa/florida",
    },
}

const floridaGrants: Grant[] = [
    {
        id: "fl-hightech-corridor",
        name: "Florida High Tech Corridor Grants",
        fundingMin: 25000,
        fundingMax: 250000,
        eligibility: ["Tech companies", "University partners", "23-county region"],
        deadline: "Rolling",
        applicationLink: "https://floridahightech.com/matching-grants-research-program/",
        description: "Matching grants for applied research projects between industry partners and universities (UF, UCF, USF).",
        country: "USA",
        region: "Florida",
        category: "Technology",
        agency: "Florida High Tech Corridor",
        status: "Active",
        tags: ["R&D", "University Partnership", "Technology"],
        requirements: ["Industry match", "University collaboration", "Tech focus"],
        lastUpdated: "2025-01-20"
    },
    {
        id: "fl-export-diversification",
        name: "Florida Export Diversification & Expansion",
        fundingMin: 2500,
        fundingMax: 50000,
        eligibility: ["Florida manufacturers", "Service providers", "Exporters"],
        deadline: "Rolling",
        applicationLink: "https://www.enterpriseflorida.com/export-from-florida/trade-grants/",
        description: "Grants to help Florida companies enter new international markets and participate in trade shows.",
        country: "USA",
        region: "Florida",
        category: "Business Growth",
        agency: "Enterprise Florida",
        status: "Active",
        tags: ["Export", "Trade", "Expansion"],
        requirements: ["Exportable product", "Florida manufacturing", "Small business status"],
        lastUpdated: "2025-01-20"
    },
    {
        id: "fl-job-growth",
        name: "Florida Job Growth Grant Fund",
        fundingMin: 250000,
        fundingMax: 5000000,
        eligibility: ["Public infrastructure projects", "Workforce training"],
        deadline: "Rolling",
        applicationLink: "https://floridajobs.org/jobgrowth",
        description: "Funding for public infrastructure and workforce training projects that support economic development.",
        country: "USA",
        region: "Florida",
        category: "Infrastructure",
        agency: "DEO",
        status: "Active",
        tags: ["Infrastructure", "Workforce", "Public"],
        requirements: ["Government entity applicant", "Economic ROI", "Governor approval"],
        lastUpdated: "2025-01-20"
    },
    {
        id: "fl-incumbent-worker",
        name: "Incumbent Worker Training (IWT)",
        fundingMin: 5000,
        fundingMax: 200000,
        eligibility: ["Florida for-profit businesses", "Existing employees"],
        deadline: "Quarterly",
        applicationLink: "https://careersourceflorida.com/business-services/training-grants/",
        description: "Grants to provide training to currently employed workers to keep Florida's workforce competitive.",
        country: "USA",
        region: "Florida",
        category: "Workforce",
        agency: "CareerSource Florida",
        status: "Active",
        tags: ["Training", "Skills", "Employees"],
        requirements: ["For-profit business", "1 year in operation", "Training plan"],
        lastUpdated: "2025-01-20"
    },
]

export default function FloridaGrantsPage() {
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
                                Florida State Funding
                            </Badge>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Florida Business Grants 2025</h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                            Discover Florida's business incentives, research grants, and export funding programs
                            supporting the Sunshine State's diverse economy.
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Infrastructure Fund</CardTitle>
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-primary">$85M+</div>
                                <p className="text-xs text-muted-foreground">Job Growth Grant Fund</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Export Grants</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-primary">1,200+</div>
                                <p className="text-xs text-muted-foreground">Companies supported</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Tech Research</CardTitle>
                                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-primary">$10M+</div>
                                <p className="text-xs text-muted-foreground">In matching grants</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Grant Comparison Table */}
                    <div className="mb-12">
                        <GrantComparisonTable
                            grants={floridaGrants}
                            title="Florida Business Grants Comparison"
                        />
                    </div>

                    {/* Content Sections */}
                    <div className="grid lg:grid-cols-3 gap-8 mb-12">
                        <div className="lg:col-span-2 space-y-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Florida Funding Ecosystem</CardTitle>
                                </CardHeader>
                                <CardContent className="prose max-w-none">
                                    <p>
                                        Florida focuses heavily on tax incentives, infrastructure development, and workforce training rather
                                        than direct cash grants for general operations. However, specific sectors like export, high-tech research,
                                        and film production have dedicated grant programs.
                                    </p>

                                    <h3>Key Florida Programs</h3>
                                    <ul>
                                        <li>
                                            <strong>Enterprise Florida (EFI)</strong> - Primary economic development organization offering export and trade grants.
                                        </li>
                                        <li>
                                            <strong>Florida High Tech Corridor</strong> - Offers significant matching grants for R&D partnerships.
                                        </li>
                                        <li>
                                            <strong>QTI Tax Refund</strong> - Qualified Target Industry Tax Refund for creating high-wage jobs.
                                        </li>
                                        <li>
                                            <strong>Capital Investment Tax Credit</strong> - For capital-intensive industries.
                                        </li>
                                    </ul>

                                    <h3>Eligibility & Target Industries</h3>
                                    <p>
                                        Florida targets industries that diversify its economy beyond tourism and agriculture. Priority sectors include:
                                    </p>
                                    <ul>
                                        <li>Aviation & Aerospace</li>
                                        <li>Life Sciences & Manufacturing</li>
                                        <li>Information Technology</li>
                                        <li>Financial & Professional Services</li>
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
                                        <a href="/usa/texas" className="block text-primary hover:underline">
                                            Texas Funding
                                        </a>
                                        <a href="/usa/federal-grants" className="block text-primary hover:underline">
                                            Federal Grants
                                        </a>
                                        <a href="/grant-finder" className="block text-primary hover:underline">
                                            AI Grant Finder Tool
                                        </a>
                                        <a href="/guides" className="block text-primary hover:underline">
                                            Application Guides
                                        </a>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Newsletter CTA */}
                    <div className="mb-8">
                        <NewsletterSignup
                            title="Get Florida Grant Updates"
                            description="Stay informed about new Florida business incentives and funding opportunities"
                        />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
