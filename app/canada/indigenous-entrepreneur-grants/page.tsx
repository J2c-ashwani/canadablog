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
    title: "Indigenous Entrepreneur Grants 2025 | Canada Funding",
    description:
        "Find grants and funding for Indigenous entrepreneurs in Canada. Complete guide to Indigenous business grants, CCAB resources, and government support.",
    keywords:
        "Indigenous business grants, First Nations funding, Metis business support, Inuit entrepreneur grants, CCAB, NACCA",
}

const indigenousGrants: Grant[] = [
    {
        id: "ind-ibdp",
        name: "Indigenous Business Development Program",
        fundingMin: 10000,
        fundingMax: 250000,
        eligibility: ["Indigenous entrepreneurs", "First Nations", "Inuit", "Métis"],
        deadline: "Rolling",
        applicationLink: "https://www.sac-isc.gc.ca/eng/1100100033057/1533641696528",
        description: "Funding support for Indigenous entrepreneurs to start or expand businesses.",
        country: "Canada",
        region: "Federal",
        category: "Indigenous Business",
        agency: "Indigenous Services Canada",
        status: "Active",
        tags: ["Indigenous", "Entrepreneurship"],
        requirements: ["Proof of ancestry", "Business plan"],
        lastUpdated: "2025-01-01"
    },
    {
        id: "ind-nacca",
        name: "Aboriginal Entrepreneurship Program",
        fundingMin: 20000,
        fundingMax: 99999,
        eligibility: ["Indigenous businesses", "Communities"],
        deadline: "Ongoing",
        applicationLink: "https://nacca.ca/aboriginal-entrepreneurship-program/",
        description: "Access to capital and business support for Indigenous business owners.",
        country: "Canada",
        region: "Federal",
        category: "Indigenous Business",
        agency: "NACCA",
        status: "Active",
        tags: ["Financing", "Capital"],
        requirements: ["Business viability"],
        lastUpdated: "2025-01-01"
    },
    {
        id: "ind-ccab",
        name: "CCAB Grant Programs",
        fundingMin: 2000,
        fundingMax: 10000,
        eligibility: ["CCAB members", "Indigenous businesses"],
        deadline: "Various",
        applicationLink: "https://www.ccab.com/programs/",
        description: "Various grant opportunities and support programs for Indigenous businesses.",
        country: "Canada",
        region: "Federal",
        category: "Indigenous Business",
        agency: "Canadian Council for Aboriginal Business",
        status: "Active",
        tags: ["Grants", "Support"],
        requirements: ["Membership"],
        lastUpdated: "2025-01-01"
    },
]

export default function IndigenousGrantsPage() {
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
                                Specific Funding
                            </Badge>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Indigenous Entrepreneur Grants 2025</h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                            Discover grants, loans, and resources specifically designed to support Indigenous (First Nations, Inuit, and Métis) entrepreneurs and businesses across Canada.
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
                                <div className="text-2xl font-bold text-primary">$100M+</div>
                                <p className="text-xs text-muted-foreground">Dedicated annual funding</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Active Programs</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-primary">15+</div>
                                <p className="text-xs text-muted-foreground">Specific grant programs</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-primary">High</div>
                                <p className="text-xs text-muted-foreground">Tailored support services</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Grant Comparison Table */}
                    <div className="mb-12">
                        <GrantComparisonTable
                            grants={indigenousGrants}
                            title="Indigenous Business Grants Comparison"
                        />
                    </div>

                    {/* Content Sections */}
                    <div className="grid lg:grid-cols-3 gap-8 mb-12">
                        <div className="lg:col-span-2 space-y-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Indigenous Business Support</CardTitle>
                                </CardHeader>
                                <CardContent className="prose max-w-none">
                                    <p>
                                        The Government of Canada and various organizations are committed to economic reconciliation and supporting Indigenous prosperity. Key partners include NACCA (National Aboriginal Capital Corporations Association) and CCAB.
                                    </p>

                                    <h3>Key Funding Organizations</h3>
                                    <ul>
                                        <li>
                                            <strong>NACCA & Aboriginal Financial Institutions (AFIs)</strong> - Provide developmental loans and non-repayable contributions.
                                        </li>
                                        <li>
                                            <strong>Indigenous Services Canada (ISC)</strong> - Operates the Aboriginal Entrepreneurship Program.
                                        </li>
                                        <li>
                                            <strong>Canadian Council for Aboriginal Business (CCAB)</strong> - Offers grants, mentorship, and certification.
                                        </li>
                                    </ul>

                                    <h3>Eligibility Requirements</h3>
                                    <p>
                                        Typically requires:
                                    </p>
                                    <ul>
                                        <li>Proof of Indigenous ancestry (Status Card, Métis Card, etc.)</li>
                                        <li>Controlling interest (51%+) by Indigenous individuals</li>
                                        <li>Business viability and job creation potential</li>
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
                                        <a href="/canada/government-grants" className="block text-primary hover:underline">
                                            Federal Canadian Grants
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
                            title="Get Indigenous Business Grant Updates"
                            description="Stay informed about new funding opportunities for Indigenous entrepreneurs"
                        />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
