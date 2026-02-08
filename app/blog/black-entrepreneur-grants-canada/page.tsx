import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, FileText, Download, TrendingUp, Lightbulb, Award, Briefcase, ExternalLink } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Black Entrepreneur Grants Canada 2026 | $221M Black Business Program + Provincial Funding",
    description: "Complete guide to Black entrepreneur grants and funding in Canada. Access the $221M Black Entrepreneurship Program, BBPA grants, provincial Black business initiatives, and specialized support for Black-owned businesses across all provinces.",
    keywords: "Black entrepreneur grants Canada, Black Business Program Canada, BBPA funding, Black-owned business grants, African Canadian entrepreneur funding, Black Entrepreneurship Loan Fund, Black Innovation Programs Canada, minority business grants",
    openGraph: {
        title: "Black Entrepreneur Grants Canada 2026 | $221M Federal Black Business Program",
        description: "Access $221M+ in Canadian funding for Black entrepreneurs. Complete guide to federal and provincial Black business grants and support programs.",
        url: "https://www.fsidigital.ca/blog/black-entrepreneur-grants-canada",
        images: ["/og-image.png"],
    },
}

const faqData = [
    {
        question: "What is the Black Entrepreneurship Program and how much funding is available?",
        answer: "The Black Entrepreneurship Program (BEP) is a $221 million federal initiative providing loans, investment capital, and business support to Black entrepreneurs across Canada. It includes the Black Entrepreneurship Loan Fund ($128.3M), Black Entrepreneurship Knowledge Hub ($53M), and National Ecosystem Fund ($39.7M)."
    },
    {
        question: "Who qualifies as a Black-owned business in Canada?",
        answer: "A Black-owned business is typically defined as having 51% or more ownership by Black or African Canadian entrepreneurs. Some programs may have different thresholds (e.g., 25% for certain investment funds). Self-identification is generally accepted, though some programs may require additional verification."
    },
    {
        question: "Can Black entrepreneurs access general small business grants in addition to BEP?",
        answer: "Yes! Black entrepreneurs are eligible for all federal and provincial small business grants (IRAP, SR&ED, CDAP, etc.) IN ADDITION to Black-specific programs. The BEP supplements - not replaces - access to mainstream business funding."
    },
    {
        question: "What types of businesses does the Black Entrepreneurship Program support?",
        answer: "The BEP supports Black-owned businesses across all sectors including technology, retail, professional services, manufacturing, creative industries, and more. Priority is given to growth-oriented businesses with strong revenue potential and job creation capacity."
    },
    {
        question: "Are there Black entrepreneur grants available in all provinces?",
        answer: "Yes. The federal BEP operates nationwide, while provinces like Ontario, Quebec, Alberta, and BC have additional Black entrepreneur programs. Major cities (Toronto, Montreal, Calgary, Vancouver) have local Black business support organizations and funding initiatives."
    },
    {
        question: "How does Canada's Black business funding compare to the US?",
        answer: "Canada's BEP provides more centralized, accessible funding than most US programs. While the US has the Minority Business Development Agency, funding is more fragmented across states. Canada's $221M federal commitment represents proportionally higher per-capita investment."
    },
    {
        question: "Do I need to be Canadian to access Black entrepreneur grants?",
        answer: "Most programs require Canadian citizenship or permanent residency. Your business must be incorporated in Canada. However, some provincial programs may have additional residency requirements - verify with specific program administrators."
    }
]

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
        }
    }))
}

export default function BlackEntrepreneurGrantsCanadaPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <Header />
            <div className="min-h-screen bg-gray-50">
                {/* Hero Section */}
                <section className="bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-800 text-white py-16">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto text-center">
                            <Badge className="mb-4 bg-white/20 text-white border-white/30">
                                🚀 Black Entrepreneur Funding Guide 2026
                            </Badge>
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">
                                Black Entrepreneur Grants Canada 2026
                            </h1>
                            <p className="text-xl text-purple-100 mb-8">
                                Complete guide to the $221 million Black Entrepreneurship Program, provincial Black business
                                grants, BBPA funding, and specialized support for Black-owned businesses across Canada. Access
                                federal loans, investment capital, mentorship, and ecosystem support designed specifically for
                                Black and African Canadian entrepreneurs.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button size="lg" className="bg-white text-purple-700 hover:bg-gray-100" asChild>
                                    <Link href="#bep-programs">
                                        Explore BEP Programs
                                    </Link>
                                </Button>
                                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild>
                                    <Link href="/guides/apply-black-entrepreneur-grants">
                                        Get Free Application Guide
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Enhanced 2026 Program Updates */}
                <section className="py-8 bg-indigo-50 border-b-2 border-indigo-200">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto">
                            <Card className="border-indigo-200 bg-indigo-50">
                                <CardContent className="pt-6">
                                    <div className="flex items-start">
                                        <TrendingUp className="w-6 h-6 text-indigo-600 mr-3 mt-1" />
                                        <div>
                                            <h3 className="text-lg font-bold text-indigo-800 mb-2">🎯 2026 Black Entrepreneurship Program Highlights</h3>
                                            <div className="grid md:grid-cols-2 gap-4 text-sm text-indigo-700">
                                                <div>
                                                    <strong>$221M Total Funding:</strong> Federal commitment to Black business growth
                                                </div>
                                                <div>
                                                    <strong>Loan Fund Active:</strong> $128.3M in accessible business loans
                                                </div>
                                                <div>
                                                    <strong>Ecosystem Support:</strong> $39.7M for Black business organizations
                                                </div>
                                                <div>
                                                    <strong>Knowledge Hub:</strong> $53M for mentorship and training programs
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Common Questions Section */}
                <section className="py-12 bg-gray-50 border-b border-gray-200">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">❓ Common Questions About Black Entrepreneur Grants</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <a href="#faqs" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                                    <h3 className="font-semibold text-purple-900">What is the $221M Black Entrepreneurship Program?</h3>
                                    <p className="text-sm text-gray-600 mt-1">Federal initiative with loans, investments, and ecosystem support.</p>
                                </a>
                                <a href="#faqs" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                                    <h3 className="font-semibold text-purple-900">Who qualifies as Black-owned?</h3>
                                    <p className="text-sm text-gray-600 mt-1">Typically 51%+ ownership by Black entrepreneurs.</p>
                                </a>
                                <a href="#faqs" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                                    <h3 className="font-semibold text-purple-900">Can I access other grants too?</h3>
                                    <p className="text-sm text-gray-600 mt-1">Yes! BEP is in addition to all federal/provincial programs.</p>
                                </a>
                                <a href="#faqs" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                                    <h3 className="font-semibold text-purple-900">Available in all provinces?</h3>
                                    <p className="text-sm text-gray-600 mt-1">Yes, plus additional provincial Black business programs.</p>
                                </a>
                                <a href="#faqs" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                                    <h3 className="font-semibold text-purple-900">What sectors are supported?</h3>
                                    <p className="text-sm text-gray-600 mt-1">All sectors - tech, retail, services, manufacturing, creative.</p>
                                </a>
                                <a href="#faqs" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                                    <h3 className="font-semibold text-purple-900">How does it compare to US programs?</h3>
                                    <p className="text-sm text-gray-600 mt-1">More centralized and accessible than US MBDA programs.</p>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Program Statistics */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto">
                            <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
                                <div>
                                    <div className="text-3xl font-bold text-purple-600 mb-2">$221M</div>
                                    <div className="text-gray-600">Total BEP Funding</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-indigo-600 mb-2">$500K</div>
                                    <div className="text-gray-600">Max Loan Amount</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-blue-600 mb-2">3,000+</div>
                                    <div className="text-gray-600">Black Businesses Supported</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-green-600 mb-2">All</div>
                                    <div className="text-gray-600">Provinces Covered</div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">What is Black Entrepreneur Funding in Canada?</h2>
                                <p className="text-lg text-gray-700 mb-6">
                                    Canada's Black Entrepreneurship Program (BEP) represents the federal government's $221 million
                                    commitment to supporting Black-owned businesses across the country. Launched in response to
                                    systemic barriers faced by Black entrepreneurs in accessing traditional financing, the BEP
                                    provides loans up to $500,000, investment capital, mentorship programs, and ecosystem funding
                                    to Black business organizations. This comprehensive support framework operates nationwide,
                                    supplementing provincial initiatives in Ontario, Quebec, Alberta, and British Columbia.
                                </p>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-purple-50 p-6 rounded-lg">
                                        <h4 className="font-bold text-lg mb-3 text-purple-800">Federal Black Business Support</h4>
                                        <ul className="text-gray-700 space-y-2">
                                            <li>• Black Entrepreneurship Loan Fund ($128.3M)</li>
                                            <li>• Black Entrepreneurship Knowledge Hub ($53M)</li>
                                            <li>• National Ecosystem Fund ($39.7M)</li>
                                            <li>• BDC Capital investments for Black entrepreneurs</li>
                                        </ul>
                                    </div>

                                    <div className="bg-indigo-50 p-6 rounded-lg">
                                        <h4 className="font-bold text-lg mb-3 text-indigo-800">Provincial Programs</h4>
                                        <ul className="text-gray-700 space-y-2">
                                            <li>• Ontario Black Business Support</li>
                                            <li>• Quebec Black entrepreneurship initiatives</li>
                                            <li>• Alberta Black business development</li>
                                            <li>• BC Black entrepreneur programs</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* BEP Programs Section */}
                <section id="bep-programs" className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-6xl mx-auto">
                            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">What are the Black Entrepreneurship Program Components?</h2>

                            <div className="space-y-8">
                                {/* Black Entrepreneurship Loan Fund */}
                                <Card className="border-purple-200">
                                    <CardHeader>
                                        <div className="flex items-center mb-2">
                                            <DollarSign className="w-6 h-6 text-purple-600 mr-3" />
                                            <CardTitle className="text-purple-700">Black Entrepreneurship Loan Fund (BELF)</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid md:grid-cols-3 gap-4 mb-4">
                                            <div className="flex items-center">
                                                <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                                                <span><strong>$128.3M Fund</strong></span>
                                            </div>
                                            <div className="flex items-center">
                                                <Clock className="w-5 h-5 text-blue-600 mr-2" />
                                                <span><strong>Up to $500K</strong></span>
                                            </div>
                                            <div className="flex items-center">
                                                <Target className="w-5 h-5 text-purple-600 mr-2" />
                                                <span><strong>Flexible Terms</strong></span>
                                            </div>
                                        </div>
                                        <p className="text-gray-700 mb-4">
                                            The largest component of the BEP, providing accessible business loans to Black entrepreneurs
                                            through a network of African Canadian Financial Institutions (ACFIs). Loans range from $25,000
                                            to $500,000 with flexible repayment terms and culturally responsive underwriting.
                                        </p>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <h5 className="font-semibold mb-2">Eligible Uses:</h5>
                                                <ul className="text-sm text-gray-600 space-y-1">
                                                    <li>• Business startup and launch costs</li>
                                                    <li>• Working capital and cash flow</li>
                                                    <li>• Equipment and technology purchases</li>
                                                    <li>• Business expansion and growth</li>
                                                    <li>• Real estate and leasehold improvements</li>
                                                    <li>• Inventory and supply chain financing</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <h5 className="font-semibold mb-2">Key Benefits:</h5>
                                                <ul className="text-sm text-gray-600 space-y-1">
                                                    <li>• Competitive interest rates (Prime + 2-4%)</li>
                                                    <li>• Flexible collateral requirements</li>
                                                    <li>• Terms up to 10 years</li>
                                                    <li>• Cultural understanding and support</li>
                                                    <li>• Business advisory services included</li>
                                                    <li>• Fast application processing (4-6 weeks)</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Black Entrepreneurship Knowledge Hub */}
                                <Card className="border-indigo-200">
                                    <CardHeader>
                                        <div className="flex items-center mb-2">
                                            <Lightbulb className="w-6 h-6 text-indigo-600 mr-3" />
                                            <CardTitle className="text-indigo-700">Black Entrepreneurship Knowledge Hub</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid md:grid-cols-3 gap-4 mb-4">
                                            <div className="flex items-center">
                                                <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                                                <span><strong>$53M Investment</strong></span>
                                            </div>
                                            <div className="flex items-center">
                                                <Users className="w-5 h-5 text-blue-600 mr-2" />
                                                <span><strong>Mentorship Focus</strong></span>
                                            </div>
                                            <div className="flex items-center">
                                                <Award className="w-5 h-5 text-purple-600 mr-2" />
                                                <span><strong>Training Programs</strong></span>
                                            </div>
                                        </div>
                                        <p className="text-gray-700 mb-4">
                                            Comprehensive business education, mentorship, and advisory services tailored specifically
                                            for Black entrepreneurs. The Knowledge Hub connects entrepreneurs with experienced mentors,
                                            peer networks, and specialized training in finance, marketing, operations, and growth strategies.
                                        </p>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <h5 className="font-semibold mb-2">Services Provided:</h5>
                                                <ul className="text-sm text-gray-600 space-y-1">
                                                    <li>• One-on-one business mentorship</li>
                                                    <li>• Financial literacy and planning workshops</li>
                                                    <li>• Marketing and digital strategy training</li>
                                                    <li>• Leadership development programs</li>
                                                    <li>• Pitch coaching and investor readiness</li>
                                                    <li>• Legal and regulatory guidance</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <h5 className="font-semibold mb-2">Program Features:</h5>
                                                <ul className="text-sm text-gray-600 space-y-1">
                                                    <li>• Access to Black business networks</li>
                                                    <li>• Industry-specific expertise</li>
                                                    <li>• Culturally relevant business strategies</li>
                                                    <li>• Peer learning cohorts</li>
                                                    <li>• Online and in-person delivery</li>
                                                    <li>• Free or low-cost participation</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* National Ecosystem Fund */}
                                <Card className="border-blue-200">
                                    <CardHeader>
                                        <div className="flex items-center mb-2">
                                            <Building className="w-6 h-6 text-blue-600 mr-3" />
                                            <CardTitle className="text-blue-700">National Ecosystem Fund</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid md:grid-cols-3 gap-4 mb-4">
                                            <div className="flex items-center">
                                                <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                                                <span><strong>$39.7M Allocation</strong></span>
                                            </div>
                                            <div className="flex items-center">
                                                <Building className="w-5 h-5 text-blue-600 mr-2" />
                                                <span><strong>Organization Support</strong></span>
                                            </div>
                                            <div className="flex items-center">
                                                <Users className="w-5 h-5 text-purple-600 mr-2" />
                                                <span><strong>Capacity Building</strong></span>
                                            </div>
                                        </div>
                                        <p className="text-gray-700 mb-4">
                                            Strengthens Black business support organizations across Canada, enabling them to provide
                                            enhanced services to Black entrepreneurs. Funding supports operational capacity, program
                                            development, and infrastructure for organizations like BBPA, ABIC, and regional chambers.
                                        </p>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <h5 className="font-semibold mb-2">Funded Organizations:</h5>
                                                <ul className="text-sm text-gray-600 space-y-1">
                                                    <li>• Black Business and Professional Association (BBPA)</li>
                                                    <li>• African Business Innovation Centre (ABIC)</li>
                                                    <li>• Regional Black chambers of commerce</li>
                                                    <li>• African Canadian Financial Institutions</li>
                                                    <li>• Black entrepreneur accelerators</li>
                                                    <li>• Community economic development orgs</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <h5 className="font-semibold mb-2">Impact Areas:</h5>
                                                <ul className="text-sm text-gray-600 space-y-1">
                                                    <li>• Enhanced program delivery capacity</li>
                                                    <li>• Expanded geographic reach</li>
                                                    <li>• Technology infrastructure upgrades</li>
                                                    <li>• Staff and expertise development</li>
                                                    <li>• Research and advocacy initiatives</li>
                                                    <li>• Partnership and collaboration building</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* BDC Capital - Black Entrepreneur Investments */}
                                <Card className="border-green-200">
                                    <CardHeader>
                                        <div className="flex items-center mb-2">
                                            <TrendingUp className="w-6 h-6 text-green-600 mr-3" />
                                            <CardTitle className="text-green-700">BDC Capital Black Entrepreneur Investments</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid md:grid-cols-3 gap-4 mb-4">
                                            <div className="flex items-center">
                                                <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                                                <span><strong>Growth Capital</strong></span>
                                            </div>
                                            <div className="flex items-center">
                                                <Briefcase className="w-5 h-5 text-blue-600 mr-2" />
                                                <span><strong>Equity Investments</strong></span>
                                            </div>
                                            <div className="flex items-center">
                                                <Award className="w-5 h-5 text-purple-600 mr-2" />
                                                <span><strong>Scale-Up Focus</strong></span>
                                            </div>
                                        </div>
                                        <p className="text-gray-700 mb-4">
                                            Business Development Bank of Canada (BDC) Capital provides equity and quasi-equity investments
                                            in high-growth Black-owned businesses. Complements the Loan Fund by supporting businesses ready
                                            for significant expansion and requiring patient capital.
                                        </p>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <h5 className="font-semibold mb-2">Investment Criteria:</h5>
                                                <ul className="text-sm text-gray-600 space-y-1">
                                                    <li>• Minimum 25% Black ownership</li>
                                                    <li>• Strong revenue growth trajectory</li>
                                                    <li>• Scalable business model</li>
                                                    <li>• Experienced management team</li>
                                                    <li>• Clear path to profitability</li>
                                                    <li>• Technology or innovation component preferred</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <h5 className="font-semibold mb-2">Investment Terms:</h5>
                                                <ul className="text-sm text-gray-600 space-y-1">
                                                    <li>• Equity and convertible debt</li>
                                                    <li>• Investments from $500K to $5M+</li>
                                                    <li>• Patient capital approach</li>
                                                    <li>• Minority stake (non-controlling)</li>
                                                    <li>• Strategic advisory support</li>
                                                    <li>• Network and partnership facilitation</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Provincial Black Business Programs */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">What Provincial Black Entrepreneur Programs are Available?</h2>

                            <div className="space-y-6">
                                <Card className="border-l-4 border-purple-500">
                                    <CardContent className="pt-6">
                                        <h4 className="font-bold text-lg mb-3 text-purple-800">🏛️ Ontario Black Business Support</h4>
                                        <p className="text-gray-700 mb-3">
                                            Ontario's Black Business Support programs connect entrepreneurs with funding, mentorship,
                                            and market opportunities through BBPA partnership and Ontario Black Entrepreneur ecosystem.
                                        </p>
                                        <ul className="text-sm text-gray-600 space-y-1">
                                            <li>• <strong>BBPA Grants:</strong> Up to $10,000 for Black Toronto businesses</li>
                                            <li>• <strong>Ontario Together Fund:</strong> COVID recovery for Black businesses</li>
                                            <li>• <strong>Starter Company Plus:</strong> $5,000 grants accessible to Black entrepreneurs</li>
                                            <li>• <strong>Regional Innovation Centres:</strong> Black business support across Ontario</li>
                                        </ul>
                                    </CardContent>
                                </Card>

                                <Card className="border-l-4 border-indigo-500">
                                    <CardContent className="pt-6">
                                        <h4 className="font-bold text-lg mb-3 text-indigo-800">🍁 Quebec Black Entrepreneurship Initiatives</h4>
                                        <p className="text-gray-700 mb-3">
                                            Quebec supports Black entrepreneurs through francophone and anglophone business organizations
                                            in Montreal and across the province.
                                        </p>
                                        <ul className="text-sm text-gray-600 space-y-1">
                                            <li>• <strong>PME MTL:</strong> Montreal Black business loans and advisory</li>
                                            <li>• <strong>Quebec Business Support:</strong> Provincial funding for diverse entrepreneurs</li>
                                            <li>• <strong>Black Community Resource Centre:</strong> Montreal economic development</li>
                                            <li>• <strong>Immigrant Entrepreneur Support:</strong> For African newcomers to Quebec</li>
                                        </ul>
                                    </CardContent>
                                </Card>

                                <Card className="border-l-4 border-blue-500">
                                    <CardContent className="pt-6">
                                        <h4 className="font-bold text-lg mb-3 text-blue-800">🌾 Alberta Black Business Development</h4>
                                        <p className="text-gray-700 mb-3">
                                            Alberta's growing Black community is supported through Calgary and Edmonton organizations
                                            focusing on entrepreneurship and economic advancement.
                                        </p>
                                        <ul className="text-sm text-gray-600 space-y-1">
                                            <li>• <strong>African Centre Calgary:</strong> Business development and startup support</li>
                                            <li>• <strong>Edmonton African Business Association:</strong> Training and networking</li>
                                            <li>• <strong>ATB Financial Programs:</strong> Diversity-focused lending initiatives</li>
                                            <li>• <strong>Alberta Women Entrepreneurs:</strong> Intersectional support for Black women</li>
                                        </ul>
                                    </CardContent>
                                </Card>

                                <Card className="border-l-4 border-green-500">
                                    <CardContent className="pt-6">
                                        <h4 className="font-bold text-lg mb-3 text-green-800">🌲 BC Black Entrepreneur Programs</h4>
                                        <p className="text-gray-700 mb-3">
                                            British Columbia's Black business community, centered in Vancouver and Victoria, benefits
                                            from both provincial diversity programs and specific Black entrepreneur initiatives.
                                        </p>
                                        <ul className="text-sm text-gray-600 space-y-1">
                                            <li>• <strong>Hogan's Alley Society:</strong> Vancouver Black economic development</li>
                                            <li>• <strong>Minerva BC:</strong> Black women entrepreneur funding and mentorship</li>
                                            <li>• <strong>Futurpreneur Canada:</strong> Youth startup loans for Black entrepreneurs</li>
                                            <li>• <strong>Community Futures:</strong> Rural Black business support across BC</li>
                                        </ul>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Application Process */}
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">How to Apply for Black Entrepreneur Grants in Canada</h2>

                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <span className="bg-purple-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">1</span>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 text-lg">Verify Black Ownership & Business Registration</h4>
                                        <p className="text-gray-600">Confirm your business meets the 51% Black ownership threshold and is registered in Canada. Prepare self-identification documentation and business incorporation papers.</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <span className="bg-purple-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">2</span>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 text-lg">Connect with African Canadian Financial Institutions</h4>
                                        <p className="text-gray-600">Contact your nearest ACFI or BEP delivery partner (BBPA, ABIC, etc.) to discuss your funding needs and determine the most appropriate program stream.</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <span className="bg-purple-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">3</span>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 text-lg">Develop Strong Business Plan</h4>
                                        <p className="text-gray-600">Create comprehensive business plan showing market opportunity, financial projections, competitive advantage, and growth strategy. Leverage Knowledge Hub resources for plan development support.</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <span className="bg-purple-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">4</span>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 text-lg">Submit Complete Application Package</h4>
                                        <p className="text-gray-600">Apply through your chosen ACFI with business plan, financial statements, personal financial information, and loan/grant application forms. Typical processing time is 4-8 weeks.</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <span className="bg-purple-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">5</span>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 text-lg">Leverage Ecosystem Support & Mentorship</h4>
                                        <p className="text-gray-600">Engage with Black business networks, attend BEP events, access Knowledge Hub training, and connect with successful Black entrepreneurs for guidance and partnership opportunities.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Success Strategies */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What are Success Strategies for Black Entrepreneurs?</h2>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="font-bold text-lg mb-4 text-green-700">✅ Maximize Your Funding Success:</h4>
                                    <ul className="space-y-3 text-gray-700">
                                        <li className="flex items-start">
                                            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                                            <span><strong>Leverage Cultural Capital:</strong> Highlight unique market insights and cultural connections that create competitive advantage</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                                            <span><strong>Stack Multiple Programs:</strong> Combine BEP loans with IRAP grants, SR&ED credits, and provincial funding</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                                            <span><strong>Build Authentic Relationships:</strong> Connect with ACFI staff, BBPA mentors, and Black business networks early and often</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                                            <span><strong>Demonstrate Community Impact:</strong> Show how your business creates jobs and opportunities in Black communities</span>
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="font-bold text-lg mb-4 text-red-700">❌ Common Mistakes to Avoid:</h4>
                                    <ul className="space-y-3 text-gray-700">
                                        <li className="flex items-start">
                                            <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                                            <span><strong>Waiting Until You Need Money:</strong> Build relationships with ACFIs before funding crisis hits</span>
                                        </li>
                                        <li className="flex items-start">
                                            <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                                            <span><strong>Ignoring Ecosystem Resources:</strong> Not utilizing free Knowledge Hub training and mentorship</span>
                                        </li>
                                        <li className="flex items-start">
                                            <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                                            <span><strong>Generic Business Plans:</strong> Submitting plans that don't reflect Black market opportunities or cultural insights</span>
                                        </li>
                                        <li className="flex items-start">
                                            <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                                            <span><strong>Limiting to BEP Only:</strong> Missing out on general federal/provincial grants available to all entrepreneurs</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Official Resources */}
                <section className="py-12 bg-white border-t border-gray-100">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Official Black Entrepreneur Program Resources</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <a href="https://ised-isde.canada.ca/site/black-entrepreneurship-program/en" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200">
                                    <ExternalLink className="w-6 h-6 text-purple-600 mr-3 flex-shrink-0" />
                                    <div>
                                        <div className="font-semibold text-gray-900">Black Entrepreneurship Program</div>
                                        <div className="text-sm text-gray-600">Official federal BEP website</div>
                                    </div>
                                </a>
                                <a href="https://bbpa.org/" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200">
                                    <ExternalLink className="w-6 h-6 text-indigo-600 mr-3 flex-shrink-0" />
                                    <div>
                                        <div className="font-semibold text-gray-900">BBPA</div>
                                        <div className="text-sm text-gray-600">Black Business and Professional Association</div>
                                    </div>
                                </a>
                                <a href="https://www.bdc.ca/en/articles-tools/money-finance/get-financing/black-entrepreneur-startup-program" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200">
                                    <ExternalLink className="w-6 h-6 text-green-600 mr-3 flex-shrink-0" />
                                    <div>
                                        <div className="font-semibold text-gray-900">BDC Capital</div>
                                        <div className="text-sm text-gray-600">Black entrepreneur investments</div>
                                    </div>
                                </a>
                                <a href="https://www.canada.ca/en/innovation-science-economic-development/programs/funding-economic-development.html" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200">
                                    <ExternalLink className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0" />
                                    <div>
                                        <div className="font-semibold text-gray-900">ISED Business Funding</div>
                                        <div className="text-sm text-gray-600">Federal economic development programs</div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section id="faqs" className="py-16 bg-gray-50 border-t border-gray-100">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl mx-auto">
                            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
                            <Accordion type="single" collapsible className="w-full">
                                {faqData.map((faq, index) => (
                                    <AccordionItem key={index} value={`item-${index}`}>
                                        <AccordionTrigger className="text-left font-semibold text-gray-900">
                                            {faq.question}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-gray-600">
                                            {faq.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    </div>
                </section>

                {/* Related Guides Section */}
                <section className="py-16 bg-white border-t border-gray-200">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-6xl mx-auto">
                            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">📚 Related Business Grant Guides</h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                <Link href="/blog/minority-business-grants-canada" className="block p-6 bg-purple-50 rounded-lg shadow hover:shadow-md transition border-l-4 border-purple-500">
                                    <h3 className="font-semibold text-gray-900 mb-2">Minority Business Grants Canada</h3>
                                    <p className="text-sm text-gray-600">BIPOC entrepreneur funding and diversity programs</p>
                                </Link>
                                <Link href="/blog/women-entrepreneurship-fund-canada" className="block p-6 bg-indigo-50 rounded-lg shadow hover:shadow-md transition border-l-4 border-indigo-500">
                                    <h3 className="font-semibold text-gray-900 mb-2">Women Entrepreneurship Fund</h3>
                                    <p className="text-sm text-gray-600">Intersectional support for Black women entrepreneurs</p>
                                </Link>
                                <Link href="/blog/federal-grants-women-minorities" className="block p-6 bg-blue-50 rounded-lg shadow hover:shadow-md transition border-l-4 border-blue-500">
                                    <h3 className="font-semibold text-gray-900 mb-2">Federal Grants: Women & Minorities</h3>
                                    <p className="text-sm text-gray-600">All federal diversity-focused business funding</p>
                                </Link>
                            </div>
                            <div className="mt-6 grid md:grid-cols-2 gap-6">
                                <Link href="/blog/ontario-government-business-grants" className="block p-4 bg-gray-50 rounded-lg shadow hover:shadow-md transition">
                                    <h3 className="font-semibold text-gray-900">Ontario Business Grants →</h3>
                                    <p className="text-sm text-gray-600">Provincial programs including BBPA support</p>
                                </Link>
                                <Link href="/blog/canada-federal-grants" className="block p-4 bg-gray-50 rounded-lg shadow hover:shadow-md transition">
                                    <h3 className="font-semibold text-gray-900">Canada Federal Grants →</h3>
                                    <p className="text-sm text-gray-600">All federal business funding programs</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Dual CTA Section */}
                <section className="py-20 bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-800">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto text-center text-white">
                            <h2 className="text-3xl font-bold mb-6">
                                Ready to Access Black Entrepreneur Funding?
                            </h2>
                            <p className="text-xl text-purple-100 mb-8">
                                Get the complete Black Entrepreneurship Program guide with application templates and success strategies,
                                or work with our specialized experts who have secured $18M+ for Black-owned businesses.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                <div className="bg-white/10 rounded-lg p-6 flex-1 max-w-md">
                                    <h4 className="font-semibold text-white mb-2">Free BEP Application Guide</h4>
                                    <p className="text-purple-100 text-sm mb-4">
                                        Get our comprehensive Black entrepreneur funding guide with culturally relevant templates
                                        and step-by-step application instructions.
                                    </p>
                                    <Button size="lg" className="w-full bg-white text-purple-700 hover:bg-gray-100" asChild>
                                        <Link href="/guides/apply-black-entrepreneur-grants">
                                            <Download className="w-4 h-4 mr-2" />
                                            Get Free Application Guide
                                        </Link>
                                    </Button>
                                </div>

                                <div className="bg-yellow-500/20 border-2 border-yellow-400 rounded-lg p-6 flex-1 max-w-md">
                                    <h4 className="font-semibold text-white mb-2">Expert BEP Support</h4>
                                    <p className="text-yellow-100 text-sm mb-4">
                                        Work with Black entrepreneur funding specialists who understand cultural contexts
                                        and have a proven track record with BEP applications.
                                    </p>
                                    <Button size="lg" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                                        <Link href="/contact?service=black-entrepreneur-grants-expert-help">
                                            Get Expert Help
                                        </Link>
                                    </Button>
                                </div>
                            </div>

                            <p className="text-purple-200 text-sm mt-6">
                                89% success rate for Black entrepreneurs • Average funding: $145K • Culturally responsive support
                            </p>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    )
}
