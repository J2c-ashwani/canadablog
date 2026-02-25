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
    title: "Alberta Business Grants 2026: 15+ Programs Open Now [Full List]",
    description:
        "Find Alberta business grants and provincial funding programs. Complete guide to Alberta government grants, Alberta Innovates funding, and application deadlines.",
    keywords:
        "Alberta business grants, Alberta government funding, provincial grants Alberta, Alberta Innovates, startup funding Edmonton Calgary",
}

const albertaGrants: Grant[] = [
    {
        id: "ab-vouchers",
        name: "Alberta Innovates Vouchers",
        fundingMin: 10000,
        fundingMax: 100000,
        eligibility: ["Tech SMEs in Alberta", "Innovation projects"],
        deadline: "Rolling",
        applicationLink: "https://albertainnovates.ca/programs/voucher/",
        description: "Support for technology development, product testing, and commercialization.",
        country: "Canada",
        region: "Alberta",
        category: "Technology",
        agency: "Alberta Innovates",
        status: "Active",
        tags: ["Innovation", "Technology"],
        requirements: ["Service provider quote", "Project plan"],
        lastUpdated: "2026-01-01"
    },
    {
        id: "ab-cares",
        name: "CARES Program",
        fundingMin: 10000,
        fundingMax: 50000,
        eligibility: ["Non-profits", "Municipalities", "Regional alliances"],
        deadline: "Closed",
        applicationLink: "https://www.alberta.ca/community-and-regional-economic-support-program.aspx",
        description: "Community and Regional Economic Support for economic development projects.",
        country: "Canada",
        region: "Alberta",
        category: "Community",
        agency: "Government of Alberta",
        status: "Closed",
        tags: ["Economic Development", "Community"],
        requirements: ["Impact assessment"],
        lastUpdated: "2026-01-01"
    },
    {
        id: "ab-export",
        name: "Alberta Export Expansion Program",
        fundingMin: 5000,
        fundingMax: 25000,
        eligibility: ["Export-ready companies", "Alberta businesses"],
        deadline: "First-come, first-served",
        applicationLink: "https://www.alberta.ca/alberta-export-expansion-program.aspx",
        description: "Support for international market expansion and export activities.",
        country: "Canada",
        region: "Alberta",
        category: "Export",
        agency: "Government of Alberta",
        status: "Active",
        tags: ["Export", "Marketing"],
        requirements: ["Export plan", "Travel budget"],
        lastUpdated: "2026-01-01"
    },
    {
        id: "ab-digital-traction",
        name: "Digital Traction",
        fundingMin: 25000,
        fundingMax: 50000,
        eligibility: ["Software startups", "SMEs"],
        deadline: "Rolling",
        applicationLink: "https://albertainnovates.ca/",
        description: "Funding for software product development and market traction.",
        country: "Canada",
        region: "Alberta",
        category: "Technology",
        agency: "Alberta Innovates",
        status: "Active",
        tags: ["Software", "Startup"],
        requirements: ["Product roadmap"],
        lastUpdated: "2026-01-01"
    },
]

export default function AlbertaGrantsPage() {
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
                                Alberta Provincial Funding
                            </Badge>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Alberta Business Grants 2026: Programs Open Now</h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                            Discover comprehensive Alberta provincial funding programs, business grants, and government incentives
                            available to entrepreneurs and companies across Alberta.
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
                                <div className="text-2xl font-bold text-primary">$150M+</div>
                                <p className="text-xs text-muted-foreground">Annual provincial programs</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Active Programs</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-primary">20+</div>
                                <p className="text-xs text-muted-foreground">Provincial grant programs</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-primary">30%</div>
                                <p className="text-xs text-muted-foreground">Average approval rate</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Grant Comparison Table */}
                    <div className="mb-12">
                        <GrantComparisonTable
                            grants={albertaGrants}
                            title="Alberta Business Grants Comparison"
                        />
                    </div>

                    {/* Content Sections */}
                    <div className="grid lg:grid-cols-3 gap-8 mb-12">
                        <div className="lg:col-span-2 space-y-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Alberta Business Grant Opportunities</CardTitle>
                                </CardHeader>
                                <CardContent className="prose max-w-none">
                                    <p>
                                        Alberta's funding landscape is heavily driven by Alberta Innovates, focusing on technology, energy, agriculture, and health. The province is actively diversifying its economy and offers various incentives to support this goal.
                                    </p>

                                    <h3>Key Alberta Grant Programs</h3>
                                    <ul>
                                        <li>
                                            <strong>Alberta Innovates Vouchers</strong> - Funding for technology development and testing
                                        </li>
                                        <li>
                                            <strong>Alberta Export Expansion Program</strong> - Support for international travel and marketing
                                        </li>
                                        <li>
                                            <strong>CAP - Canadian Agricultural Partnership</strong> - Funding for agriculture businesses (Federal-Provincial)
                                        </li>
                                        <li>
                                            <strong>Alberta Jobs Now</strong> - Grants for hiring and training
                                        </li>
                                    </ul>

                                    <h3>Eligibility Requirements</h3>
                                    <p>
                                        Common requirements for Alberta grants include:
                                    </p>
                                    <ul>
                                        <li>Incorporation in Alberta</li>
                                        <li>Physical presence in the province</li>
                                        <li>Focus on innovation or export growth</li>
                                        <li>Financial viability and matching funds</li>
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
                                        <a href="/canada/british-columbia" className="block text-primary hover:underline">
                                            BC Business Grants
                                        </a>
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
                            title="Get Alberta Grant Updates"
                            description="Stay informed about new Alberta business grants and funding opportunities"
                        />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
