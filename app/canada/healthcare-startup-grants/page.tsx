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
    title: "Healthcare Startup Grants 2025 | Canada Health Tech Funding",
    description:
        "Find grants and funding for healthcare and medtech startups in Canada. Complete guide to IRAP, CIHR, and Digital Health funding.",
    keywords:
        "Healthcare startup grants, medtech funding Canada, digital health grants, CIHR, health innovation funding",
}

const healthGrants: Grant[] = [
    {
        id: "health-cihr",
        name: "CIHR Commercialization Grants",
        fundingMin: 50000,
        fundingMax: 500000,
        eligibility: ["Researchers", "Health Startups"],
        deadline: "Annual",
        applicationLink: "https://cihr-irsc.gc.ca/",
        description: "Funding to support the commercialization of health research products.",
        country: "Canada",
        region: "Federal",
        category: "Health",
        agency: "Canadian Institutes of Health Research",
        status: "Active",
        tags: ["Research", "Commercialization"],
        requirements: ["Scientific review"],
        lastUpdated: "2025-01-01"
    },
    {
        id: "health-irap",
        name: "NRC IRAP",
        fundingMin: 50000,
        fundingMax: 10000000,
        eligibility: ["SMEs in Canada", "Innovation focus"],
        deadline: "Rolling",
        applicationLink: "https://nrc.canada.ca/en/support-technology-innovation/nrc-irap",
        description: "Financial support for technology innovation, including medtech and digital health.",
        country: "Canada",
        region: "Federal",
        category: "Innovation",
        agency: "National Research Council",
        status: "Active",
        tags: ["Innovation", "R&D"],
        requirements: ["Project advisor assessment"],
        lastUpdated: "2025-01-01"
    },
    {
        id: "health-digital",
        name: "Digital Health Canada",
        fundingMin: 0,
        fundingMax: 0,
        eligibility: ["Health professionals", "Tech companies"],
        deadline: "Various",
        applicationLink: "https://digitalhealthcanada.com/",
        description: "Resources, networking, and potential funding pathways for digital health pros.",
        country: "Canada",
        region: "Federal",
        category: "Digital Health",
        agency: "Digital Health Canada",
        status: "Active",
        tags: ["Digital", "Health"],
        requirements: ["Membership"],
        lastUpdated: "2025-01-01"
    },
]

export default function HealthcareGrantsPage() {
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
                                HealthTech Funding
                            </Badge>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Healthcare Startup Grants 2025</h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                            Discover grants, R&D funding, and incubators for healthcare, medtech, and digital health startups in Canada.
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
                                <div className="text-2xl font-bold text-primary">$1B+</div>
                                <p className="text-xs text-muted-foreground">For Health Innovation</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Active Programs</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-primary">20+</div>
                                <p className="text-xs text-muted-foreground">Specialized programs</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
                                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-primary">High</div>
                                <p className="text-xs text-muted-foreground">Digital Health Boom</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Grant Comparison Table */}
                    <div className="mb-12">
                        <GrantComparisonTable
                            grants={healthGrants}
                            title="Healthcare Grants Comparison"
                        />
                    </div>

                    {/* Content Sections */}
                    <div className="grid lg:grid-cols-3 gap-8 mb-12">
                        <div className="lg:col-span-2 space-y-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle>HealthTech Innovation Support</CardTitle>
                                </CardHeader>
                                <CardContent className="prose max-w-none">
                                    <p>
                                        Canada is a world leader in health research. Funding streams are available from discovery research (CIHR) to commercialization and industrial application (IRAP, provincial agencies).
                                    </p>

                                    <h3>Key Funding Partners</h3>
                                    <ul>
                                        <li>
                                            <strong>National Research Council (NRC-IRAP)</strong> - Technical and financial support for SMEs.
                                        </li>
                                        <li>
                                            <strong>Canadian Institutes of Health Research (CIHR)</strong> - Major federal funding agency for health research.
                                        </li>
                                        <li>
                                            <strong>Health Canada</strong> - Grants for specific public health initiatives.
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
                                        <a href="/canada/life-sciences-funding-guide" className="block text-primary hover:underline">
                                            Life Sciences Guide
                                        </a>
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
                            title="Get HealthTech Grant Updates"
                            description="Stay informed about new healthcare business grants and funding opportunities"
                        />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
