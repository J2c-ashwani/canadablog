import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { GrantComparisonTable } from "@/components/grant-comparison-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, DollarSign, Users, TrendingUp } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import type { Grant } from "@/lib/grants-data"

export const metadata: Metadata = {
    title: "New York Business Grants 2026 | NY State Funding Programs",
    description:
        "Find New York small business grants and state funding programs. Complete guide to NYS government grants, eligibility requirements, and application deadlines.",
    keywords:
        "New York business grants, NYS funding, New York small business grants, NY state grants, ESD grants",
    alternates: {
        canonical: "https://www.fsidigital.ca/usa/new-york",
    },
}

const newYorkGrants: Grant[] = [
    {
        id: "ny-esd-grant",
        name: "Empire State Development Grant Funds",
        fundingMin: 20000,
        fundingMax: 500000,
        eligibility: ["NYS businesses", "Non-profits", "Municipalities"],
        deadline: "Annual CFA Round",
        applicationLink: "https://esd.ny.gov/funding-opportunities",
        description: "New York's primary economic development funding source for capital-based infrastructure and industrial projects.",
        country: "USA",
        region: "New York",
        category: "Economic Development",
        agency: "Empire State Development",
        status: "Active",
        tags: ["Capital Projects", "Job Creation", "Infrastructure"],
        requirements: ["Consolidated Funding Application (CFA)", "20% match required", "Job creation"],
        lastUpdated: "2025-01-20"
    },
    {
        id: "ny-excelsior",
        name: "Excelsior Jobs Program",
        fundingMin: 10000,
        fundingMax: 5000000,
        eligibility: ["Strategic industries", "Job creation projects", "Expansion projects"],
        deadline: "Rolling",
        applicationLink: "https://esd.ny.gov/excelsior-jobs-program",
        description: "Refundable tax credits for businesses creating jobs in strategic industries like tech, manufacturing, and distribution.",
        country: "USA",
        region: "New York",
        category: "Tax Credit",
        agency: "Empire State Development",
        status: "Active",
        tags: ["Tax Credit", "Jobs", "Strategic Industry"],
        requirements: ["Net new job creation", "Capital investment", "R&D expenditures"],
        lastUpdated: "2025-01-20"
    },
    {
        id: "ny-nyserda",
        name: "NYSERDA Clean Energy Funding",
        fundingMin: 50000,
        fundingMax: 2000000,
        eligibility: ["Climatetech startups", "Clean energy developers", "Commercial buildings"],
        deadline: "Multiple Opportunities",
        applicationLink: "https://www.nyserda.ny.gov/Funding-Opportunities",
        description: "Various funding opportunities for clean energy innovation, energy efficiency upgrades, and renewable implementation.",
        country: "USA",
        region: "New York",
        category: "Green Energy",
        agency: "NYSERDA",
        status: "Active",
        tags: ["Clean Energy", "Sustainability", "Innovation"],
        requirements: ["Technical proposal", "Energy savings potential", "NYS impact"],
        lastUpdated: "2025-01-20"
    },
    {
        id: "ny-fast-ny",
        name: "FAST NY Shovel-Ready Grant Program",
        fundingMin: 500000,
        fundingMax: 5000000,
        eligibility: ["Municipalities", "IDAs", "Developers"],
        deadline: "Rolling",
        applicationLink: "https://esd.ny.gov/fast-ny-shovel-ready-grant-program",
        description: "Funding to prepare and develop shovel-ready sites to attract high-tech manufacturing and key industries.",
        country: "USA",
        region: "New York",
        category: "Infrastructure",
        agency: "Empire State Development",
        status: "Active",
        tags: ["Manufacturing", "Site Development", "Shovel Ready"],
        requirements: ["Site control", "Marketing plan", "Utility capacity"],
        lastUpdated: "2025-01-20"
    },
]

export default function NewYorkGrantsPage() {
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
                                New York State Funding
                            </Badge>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">New York Business Grants 2026</h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                            Access comprehensive New York state funding programs, startup grants, and economic incentives
                            for businesses in NYC, Upstate, and across the Empire State.
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">State Investment</CardTitle>
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-primary">$750M+</div>
                                <p className="text-xs text-muted-foreground">Annual economic development</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Active Programs</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-primary">40+</div>
                                <p className="text-xs text-muted-foreground">ESD & NYSERDA programs</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Tech Jobs</CardTitle>
                                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-primary">15K+</div>
                                <p className="text-xs text-muted-foreground">Supported annually</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Grant Comparison Table */}
                    <div className="mb-12">
                        <GrantComparisonTable
                            grants={newYorkGrants}
                            title="New York Business Grants Comparison"
                        />
                    </div>

                    {/* Content Sections */}
                    <div className="grid lg:grid-cols-3 gap-8 mb-12">
                        <div className="lg:col-span-2 space-y-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle>New York Funding Landscape</CardTitle>
                                </CardHeader>
                                <CardContent className="prose max-w-none">
                                    <p>
                                        New York State offers one of the most robust economic development ecosystems in the country.
                                        Through Empire State Development (ESD) and specialized agencies like NYSERDA, the state provides
                                        hundreds of millions in grants, tax credits, and low-interest loans.
                                    </p>

                                    <h3>Major NYS Funding Programs</h3>
                                    <ul>
                                        <li>
                                            <strong>Regional Economic Development Councils (REDC)</strong> - Consolidated Funding Application for regional projects.
                                        </li>
                                        <li>
                                            <strong>Excelsior Jobs Program</strong> - Performance-based tax credits for job creation.
                                        </li>
                                        <li>
                                            <strong>NY Ventures</strong> - Direct investment in high-growth startups.
                                        </li>
                                        <li>
                                            <strong>Minority and Women-Owned Business (MWBE)</strong> - Specialized access to capital and contracting.
                                        </li>
                                    </ul>

                                    <h3>Eligibility Criteria</h3>
                                    <p>
                                        New York's funding programs are generally targeted at strategic industries including technology,
                                        manufacturing, clean energy, and life sciences. Key eligibility factors include:
                                    </p>
                                    <ul>
                                        <li>Operation within New York State</li>
                                        <li>Commitment to job creation or retention</li>
                                        <li>Capital investment in facilities or equipment</li>
                                        <li>Alignment with Regional Economic Development Council priorities</li>
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
                                        <a href="/usa/california" className="block text-primary hover:underline">
                                            California Funding
                                        </a>
                                        <a href="/usa/federal-grants" className="block text-primary hover:underline">
                                            Federal Grants
                                        </a>
                                        <a href="/grant-finder" className="block text-primary hover:underline">
                                            AI Grant Finder Tool
                                        </a>
                                        <Link href="/blog/new-york-tech-programs" className="block text-primary hover:underline">
                                            START-UP NY & Tech Grants Details
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Newsletter CTA */}
                    <div className="mb-8">
                        <NewsletterSignup
                            title="Get NY Grant Updates"
                            description="Stay informed about new New York State business grants and funding rounds"
                        />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
