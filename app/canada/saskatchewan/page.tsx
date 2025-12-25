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
    title: "Saskatchewan Business Grants 2025 | Provincial Funding Programs",
    description:
        "Find Saskatchewan business grants and provincial funding programs. Complete guide to Saskatchewan government grants, eligibility requirements, and application deadlines.",
    keywords:
        "Saskatchewan business grants, SK government funding, provincial grants Saskatchewan, Regina business grants, startup funding Saskatoon",
}

const saskGrants: Grant[] = [
    {
        id: "sk-stsi",
        name: "Saskatchewan Technology Startup Incentive",
        fundingMin: 10000,
        fundingMax: 500000,
        eligibility: ["Tech startups", "Eligible Investors"],
        deadline: "Ongoing",
        applicationLink: "https://www.saskatchewan.ca/business/investment-and-economic-development/science-and-technology/metrics-and-achievements/saskatchewan-technology-startup-incentive",
        description: "45% tax credit for investors in eligible early-stage technology startups.",
        country: "Canada",
        region: "Saskatchewan",
        category: "Technology",
        agency: "Innovation Saskatchewan",
        status: "Active",
        tags: ["Tax Credit", "Angel Investment"],
        requirements: ["Eligible startup status"],
        lastUpdated: "2025-01-01"
    },
    {
        id: "sk-lean",
        name: "Saskatchewan Lean Improvements in Manufacturing",
        fundingMin: 5000,
        fundingMax: 20000,
        eligibility: ["Agri-business", "Manufacturing"],
        deadline: "Open",
        applicationLink: "https://www.saskatchewan.ca/",
        description: "Funding for efficiency improvements and lean process adoption.",
        country: "Canada",
        region: "Saskatchewan",
        category: "Manufacturing",
        agency: "Government of Saskatchewan",
        status: "Active",
        tags: ["Efficiency", "Manufacturing"],
        requirements: ["Project quote"],
        lastUpdated: "2025-01-01"
    },
    {
        id: "sk-job-grant",
        name: "Canada-Saskatchewan Job Grant",
        fundingMin: 1000,
        fundingMax: 10000,
        eligibility: ["Employers in SK", "Training for employees"],
        deadline: "Rolling",
        applicationLink: "https://www.saskatchewan.ca/business/hire-train-and-manage-employees/apply-for-the-canada-saskatchewan-job-grant",
        description: "Funding for third-party skills training for employees.",
        country: "Canada",
        region: "Saskatchewan",
        category: "Workforce",
        agency: "Government of Saskatchewan",
        status: "Active",
        tags: ["Training", "Employment"],
        requirements: ["Training plan"],
        lastUpdated: "2025-01-01"
    },
]

export default function SaskatchewanGrantsPage() {
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
                                Saskatchewan Provincial Funding
                            </Badge>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Saskatchewan Business Grants 2025</h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                            Discover comprehensive Saskatchewan provincial funding programs, business grants, and government incentives
                            available to entrepreneurs and companies across Saskatchewan.
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
                                <div className="text-2xl font-bold text-primary">$50M+</div>
                                <p className="text-xs text-muted-foreground">Annual provincial programs</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Active Programs</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-primary">12+</div>
                                <p className="text-xs text-muted-foreground">Provincial grant programs</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-primary">40%</div>
                                <p className="text-xs text-muted-foreground">Average approval rate</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Grant Comparison Table */}
                    <div className="mb-12">
                        <GrantComparisonTable
                            grants={saskGrants}
                            title="Saskatchewan Business Grants Comparison"
                        />
                    </div>

                    {/* Content Sections */}
                    <div className="grid lg:grid-cols-3 gap-8 mb-12">
                        <div className="lg:col-span-2 space-y-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Saskatchewan Business Grant Opportunities</CardTitle>
                                </CardHeader>
                                <CardContent className="prose max-w-none">
                                    <p>
                                        Saskatchewan is known for its strong agricultural base but is also rapidly growing its technology sector through the Saskatchewan Technology Startup Incentive (STSI).
                                    </p>

                                    <h3>Key Saskatchewan Grant Programs</h3>
                                    <ul>
                                        <li>
                                            <strong>STSI (Tech Startup Incentive)</strong> - 45% non-refundable tax credit for angel investors
                                        </li>
                                        <li>
                                            <strong>Canada-Saskatchewan Job Grant</strong> - Training support for employees
                                        </li>
                                        <li>
                                            <strong>Product2Market</strong> - Tech commercialization funding (Innovation Sask)
                                        </li>
                                    </ul>

                                    <h3>Eligibility Requirements</h3>
                                    <p>
                                        Standard requirements include:
                                    </p>
                                    <ul>
                                        <li>Operation in Saskatchewan</li>
                                        <li>Registration with ISCB</li>
                                        <li>Sector-specific requirements (e.g., Tech, Ag)</li>
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
                                        <a href="/canada/manitoba" className="block text-primary hover:underline">
                                            Manitoba Funding
                                        </a>
                                        <a href="/canada/alberta" className="block text-primary hover:underline">
                                            Alberta Business Grants
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
                            title="Get Saskatchewan Grant Updates"
                            description="Stay informed about new Saskatchewan business grants and funding opportunities"
                        />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
