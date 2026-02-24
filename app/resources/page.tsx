import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, ExternalLink, Briefcase, Landmark, Scale, Calculator } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Best Business Tools for Grant Applicants | Banking, Legal & Accounting",
    description:
        "Curated list of essential tools for small businesses and grant applicants. Best business bank accounts, incorporation services, and accounting software.",
    keywords:
        "business bank accounts for startups, incorporation services, small business accounting software, grant compliance tools",
}

interface Resource {
    id: string
    name: string
    category: string
    description: string
    icon: React.ReactNode
    features: string[]
    link: string
    badge?: string
}

const resources: Resource[] = [
    {
        id: "banking-1",
        name: "Mercury",
        category: "Business Banking",
        description: "Banking built for startups. No monthly fees, wire fees, or minimums. Ideal for holding grant funds separately.",
        icon: <Landmark className="w-8 h-8 text-blue-600" />,
        features: ["No monthly fees", "FDIC Insured", "Virtual Cards"],
        link: "https://mercury.com",
        badge: "Top Pick"
    },
    {
        id: "legal-1",
        name: "ZenBusiness",
        category: "Legal Formation",
        description: "The easiest way to form your LLC or Corporation. Required for 99% of government grant applications.",
        icon: <Scale className="w-8 h-8 text-indigo-600" />,
        features: ["Fast filing", "Registered Agent", "Compliance Alerts"],
        link: "https://www.zenbusiness.com",
        badge: "Essential"
    },
    {
        id: "accounting-1",
        name: "QuickBooks Online",
        category: "Accounting",
        description: "Track your grant spending accurately to withstand government audits. The industry standard.",
        icon: <Calculator className="w-8 h-8 text-green-600" />,
        features: ["Expense Tracking", "Invoicing", "Tax Prep"],
        link: "https://quickbooks.intuit.com",
    },
    {
        id: "hiring-1",
        name: "Gusto",
        category: "Payroll & HR",
        description: "Manage payroll for your team. Many hiring grants require robust payroll systems like Gusto.",
        icon: <Briefcase className="w-8 h-8 text-orange-600" />,
        features: ["Automated Payroll", "Tax Filing", "Benefits"],
        link: "https://gusto.com",
    }
]

export default function ResourcesPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <main className="container mx-auto px-4 py-12">
                <div className="max-w-6xl mx-auto">
                    {/* Hero Section */}
                    <div className="text-center mb-12">
                        <Badge variant="secondary" className="mb-4">
                            Verified Tools
                        </Badge>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Essential Tools for Grant Applicants</h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                            To secure and manage government funding, you need the right infrastructure.
                            These are the tools we recommend for compliance, financial management, and legal standing.
                        </p>
                    </div>

                    {/* Resources Grid */}
                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        {resources.map((resource) => (
                            <Card key={resource.id} className="hover:shadow-lg transition-shadow border-gray-200">
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-white border border-gray-100 rounded-lg shadow-sm">
                                                {resource.icon}
                                            </div>
                                            <div>
                                                <CardTitle className="text-xl">{resource.name}</CardTitle>
                                                <CardDescription className="text-sm font-medium text-primary mt-1">
                                                    {resource.category}
                                                </CardDescription>
                                            </div>
                                        </div>
                                        {resource.badge && (
                                            <Badge className="bg-green-100 text-green-800 border-green-200 hover:bg-green-100">
                                                {resource.badge}
                                            </Badge>
                                        )}
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600 mb-6 min-h-[60px]">
                                        {resource.description}
                                    </p>

                                    <div className="space-y-3 mb-6">
                                        {resource.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-center text-sm text-gray-700">
                                                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                                {feature}
                                            </div>
                                        ))}
                                    </div>

                                    <Button className="w-full" asChild>
                                        <a href={resource.link} target="_blank" rel="noopener noreferrer">
                                            Visit Website <ExternalLink className="w-4 h-4 ml-2" />
                                        </a>
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Context Section */}
                    <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 mb-12">
                        <h2 className="text-2xl font-bold mb-6">Why You Need These Tools for Grants</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="space-y-2">
                                <h3 className="font-semibold text-lg">1. Separation of Funds</h3>
                                <p className="text-gray-600 text-sm">
                                    Most grants require a dedicated business bank account. keeping grant funds separate from personal or operating funds is critical for audits.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-semibold text-lg">2. Legal Entity Status</h3>
                                <p className="text-gray-600 text-sm">
                                    Sole proprietorships often qualify for fewer grants. Forming an LLC or Corporation often unlocks typically larger state and federal funding pools.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-semibold text-lg">3. Financial Tracking</h3>
                                <p className="text-gray-600 text-sm">
                                    "If you can't prove it, you didn't spend it." Accounting software is non-negotiable for reporting how you used grant money.
                                </p>
                            </div>
                        </div>
                    </div>

                    <NewsletterSignup
                        title="Get Exclusive Partner Offers"
                        description="Sign up to get notified when we negotiate special deals on business tools for our community."
                    />
                </div>
            </main>

            <Footer />
        </div>
    )
}
