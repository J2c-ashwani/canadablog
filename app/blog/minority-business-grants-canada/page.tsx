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
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, FileText, Download, Globe, Award, Heart, TrendingUp, ExternalLink } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Minority Business Grants Canada 2026 | BIPOC Entrepreneur Funding + Diversity Programs",
    description: "Complete guide to minority business grants in Canada. Access BIPOC entrepreneur funding, newcomer business grants, racialized entrepreneur support, and diversity-focused programs across all provinces.",
    keywords: "minority business grants Canada, BIPOC entrepreneur funding, diversity business grants, newcomer entrepreneur grants, racialized business owners, immigrant business funding Canada, visible minority grants, ethnic entrepreneur support",
    openGraph: {
        title: "Minority Business Grants Canada 2026 | BIPOC & Diversity Business Funding",
        description: "Access comprehensive minority and BIPOC entrepreneur grants across Canada. Federal and provincial diversity-focused business funding programs.",
        url: "https://www.fsidigital.ca/blog/minority-business-grants-canada",
        images: ["/og-image.png"],
    },
}

const faqData = [
    {
        question: "What qualifies as a minority-owned business in Canada?",
        answer: "In Canada, minority-owned businesses typically include those owned (51%+ ownership) by racialized persons, newcomers/immigrants, Indigenous peoples, persons with disabilities, LGBTQ2S+ individuals, or women. Specific programs may define 'minority' based on equity-seeking groups, visible minorities, or BIPOC (Black, Indigenous, People of Color) entrepreneurs."
    },
    {
        question: "Can immigrants and newcomers access minority business grants?",
        answer: "Yes! Many programs specifically target newcomer entrepreneurs including provincial immigrant entrepreneur streams, FUTURPRENEUR Canada startup financing for newcomers, and settlement organization business programs. Most require permanent residency or Canadian citizenship, though some support refugees and work permit holders."
    },
    {
        question: "Are there national minority business programs like the US MBDA?",
        answer: "Canada doesn't have a single MBDA-equivalent agency, but has comprehensive diversity funding through: Women Entrepreneurship Strategy ($6B), Black Entrepreneurship Program ($221M), Indigenous business programs ($2.1B), and provincial diversity initiatives. The approach is more distributed but often more accessible than US programs."
    },
    {
        question: "Do minority entrepreneurs still qualify for general small business grants?",
        answer: "Absolutely! Minority business owners are eligible for ALL federal and provincial programs (IRAP, SR&ED, CDAP, regional grants) IN ADDITION to diversity-specific funding. Being a minority entrepreneur opens MORE funding opportunities, not fewer."
    },
    {
        question: "Which provinces have the strongest minority business support?",
        answer: "Ontario leads with comprehensive diversity programs (Toronto's strong BIPOC ecosystem), followed by BC (immigrant entrepreneur focus), Quebec (francophone newcomer programs), and Alberta (growing diversity initiatives). Major cities like Toronto, Vancouver, and Montreal offer the most resources."
    },
    {
        question: "How do I prove minority status for grant applications?",
        answer: "Requirements vary by program. Many accept self-identification declarations. Some require citizenship/immigration documents (for newcomer programs), Indigenous status cards,disability documentation, or business ownership verification. Always check specific program requirements."
    },
    {
        question: "Can visible minorities access the same programs as Black entrepreneurs?",
        answer: "Some programs are Black-specific (BEP), while others serve all BIPOC/racialized groups. Most diversity programs use inclusive definitions covering all equity-seeking groups. Read each program's eligibility criteria carefully to determine your fit."
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

export default function MinorityBusinessGrantsCanadaPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <Header />
            <div className="min-h-screen bg-gray-50">
                {/* Hero Section */}
                <section className="bg-gradient-to-br from-orange-600 via-red-600 to-pink-700 text-white py-16">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto text-center">
                            <Badge className="mb-4 bg-white/20 text-white border-white/30">
                                🌍 BIPOC & Minority Entrepreneur Funding 2026
                            </Badge>
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">
                                Minority Business Grants Canada 2026
                            </h1>
                            <p className="text-xl text-orange-100 mb-8">
                                Comprehensive guide to BIPOC entrepreneur grants, newcomer business funding, racialized entrepreneur
                                support, and diversity-focused programs across Canada. Access federal diversity initiatives, provincial
                                minority business grants, settlement organization funding, and specialized support for visible minority,
                                immigrant, and equity-seeking entrepreneurs in all provinces.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button size="lg" className="bg-white text-orange-700 hover:bg-gray-100" asChild>
                                    <Link href="#diversity-programs">
                                        Explore Diversity Programs
                                    </Link>
                                </Button>
                                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild>
                                    <Link href="/guides/apply-minority-business-grants">
                                        Get Free Funding Guide
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Program Highlights */}
                <section className="py-8 bg-red-50 border-b-2 border-red-200">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto">
                            <Card className="border-red-200 bg-red-50">
                                <CardContent className="pt-6">
                                    <div className="flex items-start">
                                        <Globe className="w-6 h-6 text-red-600 mr-3 mt-1" />
                                        <div>
                                            <h3 className="text-lg font-bold text-red-800 mb-2">🎯 2026 Diversity Funding Highlights</h3>
                                            <div className="grid md:grid-cols-2 gap-4 text-sm text-red-700">
                                                <div><strong>$8B+ Total Diversity Funding:</strong> Combined federal commitment to equity entrepreneurs</div>
                                                <div><strong>Black Program:</strong> $221M for Black-owned businesses</div>
                                                <div><strong>Women's Programs:</strong> $6B Women Entrepreneurship Strategy</div>
                                                <div><strong>Indigenous Support:</strong> $2.1B Aboriginal business funding</div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Common Questions */}
                <section className="py-12 bg-gray-50 border-b border-gray-200">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">❓ Common Questions About Minority Business Grants</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <a href="#faqs" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                                    <h3 className="font-semibold text-orange-900">What defines minority-owned in Canada?</h3>
                                    <p className="text-sm text-gray-600 mt-1">51%+ ownership by equity-seeking groups (BIPOC, newcomers, etc.)</p>
                                </a>
                                <a href="#faqs" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                                    <h3 className="font-semibold text-orange-900">Can immigrants access these grants?</h3>
                                    <p className="text-sm text-gray-600 mt-1">Yes! Many programs specifically target newcomer entrepreneurs.</p>
                                </a>
                                <a href="#faqs" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                                    <h3 className="font-semibold text-orange-900">Is there a Canadian MBDA equivalent?</h3>
                                    <p className="text-sm text-gray-600 mt-1">No single agency - distributed across multiple programs ($8B+ total).</p>
                                </a>
                                <a href="#faqs" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                                    <h3 className="font-semibold text-orange-900">Can I access general grants too?</h3>
                                    <p className="text-sm text-gray-600 mt-1">Yes! Diversity programs are IN ADDITION to all standard funding.</p>
                                </a>
                                <a href="#faqs" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                                    <h3 className="font-semibold text-orange-900">Best provinces for minority support?</h3>
                                    <p className="text-sm text-gray-600 mt-1">Ontario, BC, Quebec lead; Toronto, Vancouver, Montreal strongest.</p>
                                </a>
                                <a href="#faqs" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                                    <h3 className="font-semibold text-orange-900">How do I prove minority status?</h3>
                                    <p className="text-sm text-gray-600 mt-1">Varies - often self-identification or citizenship/immigration docs.</p>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Statistics */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto">
                            <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
                                <div>
                                    <div className="text-3xl font-bold text-orange-600 mb-2">$8B+</div>
                                    <div className="text-gray-600">Diversity Funding Pool</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-red-600 mb-2">50,000+</div>
                                    <div className="text-gray-600">BIPOC Businesses Supported</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-pink-600 mb-2">All</div>
                                    <div className="text-gray-600">Equity Groups Covered</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-purple-600 mb-2">10</div>
                                    <div className="text-gray-600">Provinces Active</div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-sm p-8">
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">What is Minority Business Funding in Canada?</h2>
                                <p className="text-lg text-gray-700 mb-6">
                                    Canada's approach to minority and BIPOC entrepreneur support is comprehensive and distributed across
                                    multiple federal and provincial programs. Unlike the US's centralized Minority Business Development
                                    Agency (MBDA), Canada invests over $8 billion through specialized initiatives including the Women
                                    Entrepreneurship Strategy ($6B), Black Entrepreneurship Program ($221M), Indigenous business funding
                                    ($2.1B+), and provincial diversity programs. This framework supports racialized entrepreneurs, newcomers,
                                    immigrants, visible minorities, and all equity-seeking groups with grants, loans, mentorship, and
                                    ecosystem development across every Canadian province.
                                </p>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-orange-50 p-6 rounded-lg">
                                        <h4 className="font-bold text-lg mb-3 text-orange-800">Federal Diversity Programs</h4>
                                        <ul className="text-gray-700 space-y-2">
                                            <li>• Black Entrepreneurship Program ($221M)</li>
                                            <li>• Women Entrepreneurship Strategy ($6B)</li>
                                            <li>• Indigenous business programs ($2.1B)</li>
                                            <li>• Newcomer entrepreneur support</li>
                                        </ul>
                                    </div>

                                    <div className="bg-red-50 p-6 rounded-lg">
                                        <h4 className="font-bold text-lg mb-3 text-red-800">Provincial Initiatives</h4>
                                        <ul className="text-gray-700 space-y-2">
                                            <li>• Ontario diversity business support</li>
                                            <li>• BC multicultural entrepreneur programs</li>
                                            <li>• Quebec immigrant entrepreneur funding</li>
                                            <li>• Alberta BIPOC business development</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Federal Diversity Programs */}
                <section id="diversity-programs" className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-6xl mx-auto">
                            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">What Federal Diversity Programs Support Minority Entrepreneurs?</h2>

                            <div className="space-y-8">
                                <Card className="border-orange-200">
                                    <CardHeader>
                                        <div className="flex items-center mb-2">
                                            <Heart className="w-6 h-6 text-orange-600 mr-3" />
                                            <CardTitle className="text-orange-700">Women Entrepreneurship Strategy (WES)</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid md:grid-cols-3 gap-4 mb-4">
                                            <div className="flex items-center">
                                                <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                                                <span><strong>$6B Investment</strong></span>
                                            </div>
                                            <div className="flex items-center">
                                                <Users className="w-5 h-5 text-blue-600 mr-2" />
                                                <span><strong>Intersectional Focus</strong></span>
                                            </div>
                                            <div className="flex items-center">
                                                <Award className="w-5 h-5 text-purple-600 mr-2" />
                                                <span><strong>All Women Entrepreneurs</strong></span>
                                            </div>
                                        </div>
                                        <p className="text-gray-700 mb-4">
                                            Canada's largest entrepreneurship initiative targets women-owned businesses with particular
                                            emphasis on racialized women, Indigenous women, women with disabilities, and newcomer women.
                                            Intersectional approach ensures minority women entrepreneurs receive enhanced support.
                                        </p>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <h5 className="font-semibold mb-2">Priority Groups:</h5>
                                                <ul className="text-sm text-gray-600 space-y-1">
                                                    <li>• Black and racialized women entrepreneurs</li>
                                                    <li>• Indigenous women business owners</li>
                                                    <li>• Newcomer and immigrant women</li>
                                                    <li>• Women with disabilities</li>
                                                    <li>• LGBTQ2S+ women entrepreneurs</li>
                                                    <li>• Rural and remote women</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <h5 className="font-semibold mb-2">Funding Components:</h5>
                                                <ul className="text-sm text-gray-600 space-y-1">
                                                    <li>• Women Entrepreneurship Fund loans ($100K-$5M)</li>
                                                    <li>• Women Entrepreneurship Knowledge Hub</li>
                                                    <li>• Ecosystem Fund for women's organizations</li>
                                                    <li>• BDC loans and venture capital</li>
                                                    <li>• EDC export financing for women</li>
                                                    <li>• Regional women entrepreneur initiatives</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="border-red-200">
                                    <CardHeader>
                                        <div className="flex items-center mb-2">
                                            <Building className="w-6 h-6 text-red-600 mr-3" />
                                            <CardTitle className="text-red-700">Futurpreneur Canada - Newcomer Programs</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid md:grid-cols-3 gap-4 mb-4">
                                            <div className="flex items-center">
                                                <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                                                <span><strong>Up to $60K</strong></span>
                                            </div>
                                            <div className="flex items-center">
                                                <Globe className="w-5 h-5 text-blue-600 mr-2" />
                                                <span><strong>Newcomer Focus</strong></span>
                                            </div>
                                            <div className="flex items-center">
                                                <Users className="w-5 h-5 text-purple-600 mr-2" />
                                                <span><strong>Youth 18-39</strong></span>
                                            </div>
                                        </div>
                                        <p className="text-gray-700 mb-4">
                                            Specialized startup financing for young entrepreneurs including significant focus on newcomers
                                            and immigrant entrepreneurs. Provides collateral-free loans, mentorship, and business resources
                                            specifically designed for those new to Canada's business environment.
                                        </p>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <h5 className="font-semibold mb-2">Newcomer Eligibility:</h5>
                                                <ul className="text-sm text-gray-600 space-y-1">
                                                    <li>• Permanent residents or citizens</li>
                                                    <li>• Ages 18-39 years old</li>
                                                    <li>• In Canada less than 10 years</li>
                                                    <li>• Starting or acquiring a business</li>
                                                    <li>• Viable business plan required</li>
                                                    <li>• Full-time business commitment</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <h5 className="font-semibold mb-2">Support Services:</h5>
                                                <ul className="text-sm text-gray-600 space-y-1">
                                                    <li>• $20K-$60K collateral-free loans</li>
                                                    <li>• 2-year mentorship from experienced entrepreneurs</li>
                                                    <li>• Business planning and training resources</li>
                                                    <li>• Cultural integration business support</li>
                                                    <li>• Network access and partnership facilitation</li>
                                                    <li>• Flexible repayment terms</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="border-pink-200">
                                    <CardHeader>
                                        <div className="flex items-center mb-2">
                                            <TrendingUp className="w-6 h-6 text-pink-600 mr-3" />
                                            <CardTitle className="text-pink-700">Federal Diversity Supplier Programs</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid md:grid-cols-3 gap-4 mb-4">
                                            <div className="flex items-center">
                                                <Building className="w-5 h-5 text-green-600 mr-2" />
                                                <span><strong>Procurement Access</strong></span>
                                            </div>
                                            <div className="flex items-center">
                                                <Award className="w-5 h-5 text-blue-600 mr-2" />
                                                <span><strong>Certification Support</strong></span>
                                            </div>
                                            <div className="flex items-center">
                                                <Target className="w-5 h-5 text-purple-600 mr-2" />
                                                <span><strong>Market Access</strong></span>
                                            </div>
                                        </div>
                                        <p className="text-gray-700 mb-4">
                                            Federal government committed to increasing procurement from diverse suppliers. Programs help
                                            minority-owned businesses access government contracts, corporate supply chains, and business
                                            development opportunities through supplier diversity initiatives.
                                        </p>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <h5 className="font-semibold mb-2">Certification Programs:</h5>
                                                <ul className="text-sm text-gray-600 space-y-1">
                                                    <li>• Aboriginal business certification (CCAB)</li>
                                                    <li>• WBE Canada (Women Business Enterprises)</li>
                                                    <li>• CAMSC diversity certification</li>
                                                    <li>• LGBTQ+ business certification</li>
                                                    <li>• Disability-owned business verification</li>
                                                    <li>• Minority business enterprise status</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <h5 className="font-semibold mb-2">Procurement Benefits:</h5>
                                                <ul className="text-sm text-gray-600 space-y-1">
                                                    <li>• Access to set-aside government contracts</li>
                                                    <li>• Corporate supplier diversity programs</li>
                                                    <li>• Bid training and proposal support</li>
                                                    <li>• Networking with procurement officers</li>
                                                    <li>• Contract bundling opportunities</li>
                                                    <li>• Mentor-protégé programs</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Provincial Programs */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">What Provincial Minority Business Programs are Available?</h2>

                            <div className="space-y-6">
                                <Card className="border-l-4 border-orange-500">
                                    <CardContent className="pt-6">
                                        <h4 className="font-bold text-lg mb-3 text-orange-800">🏛️ Ontario Diversity Business Support</h4>
                                        <p className="text-gray-700 mb-3">
                                            Ontario leads Canada in diversity programming with Toronto's robust BIPOC ecosystem,
                                            settlement organization business programs, and targeted provincial initiatives.
                                        </p>
                                        <ul className="text-sm text-gray-600 space-y-1">
                                            <li>• <strong>Toronto Business Development Centre:</strong> Newcomer entrepreneur programs</li>
                                            <li>• <strong>ACCES Employment:</strong> Immigrant entrepreneur training and loans</li>
                                            <li>• <strong>Starter Company Plus:</strong> $5K grants accessible to all diversity groups</li>
                                            <li>• <strong>MaRS Discovery District:</strong> Diverse founder accelerator programs</li>
                                            <li>• <strong>Black Business Support:</strong> BBPA grants and ecosystem funding</li>
                                            <li>• <strong>Regional Innovation Centres:</strong> Diversity-focused across Ontario</li>
                                        </ul>
                                    </CardContent>
                                </Card>

                                <Card className="border-l-4 border-red-500">
                                    <CardContent className="pt-6">
                                        <h4 className="font-bold text-lg mb-3 text-red-800">🌲 BC Multicultural Entrepreneur Programs</h4>
                                        <p className="text-gray-700 mb-3">
                                            British Columbia's diverse population is supported through immigrant entrepreneur initiatives,
                                            Settlement agency programs, and Vancouver's multicultural business ecosystem.
                                        </p>
                                        <ul className="text-sm text-gray-600 space-y-1">
                                            <li>• <strong>Small Business BC:</strong> Multicultural entrepreneur advisory</li>
                                            <li>• <strong>Immigrant Employment Council:</strong> Newcomer business support</li>
                                            <li>• <strong>SUCCESS:</strong> Chinese entrepreneur programs Vancouver</li>
                                            <li>• <strong>DIVERSEcity:</strong> Surrey multicultural business development</li>
                                            <li>• <strong>Minerva BC:</strong> Diverse women entrepreneur funding</li>
                                            <li>• <strong>Community Futures:</strong> Rural minority business support</li>
                                        </ul>
                                    </CardContent>
                                </Card>

                                <Card className="border-l-4 border-pink-500">
                                    <CardContent className="pt-6">
                                        <h4 className="font-bold text-lg mb-3 text-pink-800">🍁 Quebec Newcomer & Francophone Programs</h4>
                                        <p className="text-gray-700 mb-3">
                                            Quebec offers unique francophone immigrant entrepreneur support, Montreal diversity initiatives,
                                            and settlement organization business programs.
                                        </p>
                                        <ul className="text-sm text-gray-600 space-y-1">
                                            <li>• <strong>PME MTL:</strong> Montreal diverse entrepreneur loans and grants</li>
                                            <li>• <strong>PROMIS:</strong> Immigrant entrepreneur support Montreal</li>
                                            <li>• <strong>Black Community Resource Centre:</strong> Economic development programs</li>
                                            <li>• <strong>Emploi-Québec:</strong> Self-employment assistance for newcomers</li>
                                            <li>• <strong>Entrepreneurship Immigrant Program:</strong> Provincial business stream</li>
                                            <li>• <strong>South Asian Women's Centre:</strong> Montreal community programs</li>
                                        </ul>
                                    </CardContent>
                                </Card>

                                <Card className="border-l-4 border-purple-500">
                                    <CardContent className="pt-6">
                                        <h4 className="font-bold text-lg mb-3 text-purple-800">🌾 Alberta BIPOC Business Development</h4>
                                        <p className="text-gray-700 mb-3">
                                            Alberta's growing diversity is supported through Calgary and Edmonton multicultural organizations,
                                            immigrant entrepreneur programs, and provincial diversity initiatives.
                                        </p>
                                        <ul className="text-sm text-gray-600 space-y-1">
                                            <li>• <strong>Calgary Immigrant Women's Association:</strong> Business training and loans</li>
                                            <li>• <strong>Bredin Centre:</strong> Edmonton immigrant entrepreneur support</li>
                                            <li>• <strong>African Centre Calgary:</strong> Black business development</li>
                                            <li>• <strong>Edmonton Mennonite Centre:</strong> Refugee entrepreneur programs</li>
                                            <li>• <strong>Alberta Women Entrepreneurs:</strong> Intersectional support diverse women</li>
                                            <li>• <strong>ATB Financial:</strong> Diversity-focused lending initiatives</li>
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
                            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">How to Apply for Minority Business Grants in Canada</h2>

                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <span className="bg-orange-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">1</span>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 text-lg">Identify Your Equity Category</h4>
                                        <p className="text-gray-600">Determine which diversity categories apply to you (racialized, newcomer, gender, disability, LGBTQ2S+, etc.). Many entrepreneurs qualify for multiple programs through intersectional identities.</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <span className="bg-orange-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">2</span>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 text-lg">Map All Available Programs</h4>
                                        <p className="text-gray-600">Research federal, provincial, municipal, and settlement organization programs. Don't limit yourself to one category - stack multiple funding sources for maximum support.</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <span className="bg-orange-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">3</span>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 text-lg">Gather Documentation</h4>
                                        <p className="text-gray-600">Prepare business registration, citizenship/immigration documents if required, ownership verification (51%+ ownership proof), and any program-specific identity documentation.</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <span className="bg-orange-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">4</span>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 text-lg">Connect with Community Organizations</h4>
                                        <p className="text-gray-600">Engage with settlement agencies, cultural business associations, diversity chambers of commerce, and community economic development orgs for guidance and support.</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <span className="bg-orange-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">5</span>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 text-lg">Submit Strategic Applications</h4>
                                        <p className="text-gray-600">Apply to diversity-specific programs AND general business grants simultaneously. Highlight cultural insights, community impact, and unique market positioning in applications.</p>
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
                            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What are Success Strategies for Minority Entrepreneurs?</h2>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="font-bold text-lg mb-4 text-green-700">✅ Maximize Diversity Funding:</h4>
                                    <ul className="space-y-3 text-gray-700">
                                        <li className="flex items-start">
                                            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                                            <span><strong>Leverage Cultural Capital:</strong> Highlight unique cultural insights, language skills, and community connections as competitive advantages</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                                            <span><strong>Stack Intersectional Programs:</strong> If you're a racialized woman newcomer, combine WES + newcomer + race-specific funding</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                                            <span><strong>Access Settlement Resources:</strong> Immigrant-serving organizations offer free business training, mentorship, and funding connections</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                                            <span><strong>Build Authentic Networks:</strong> Connect with cultural business associations and diversity chambers for partnership opportunities</span>
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="font-bold text-lg mb-4 text-red-700">❌ Common Mistakes to Avoid:</h4>
                                    <ul className="space-y-3 text-gray-700">
                                        <li className="flex items-start">
                                            <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                                            <span><strong>Limiting to Diversity-Only Programs:</strong> Missing out on all federal/provincial grants available to ALL entrepreneurs</span>
                                        </li>
                                        <li className="flex items-start">
                                            <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                                            <span><strong>Not Self-Identifying:</strong> Many programs operate on self-identification - don't hesitate to claim your identity</span>
                                        </li>
                                        <li className="flex items-start">
                                            <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                                            <span><strong>Ignoring Settlement Organizations:</strong> Free resources from immigrant-serving agencies often go unused</span>
                                        </li>
                                        <li className="flex items-start">
                                            <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                                            <span><strong>Generic Business Plans:</strong> Not showcasing cultural market knowledge or community impact potential</span>
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
                            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Official Diversity Program Resources</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <a href="https://ised-isde.canada.ca/site/women-entrepreneurship-strategy/en" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200">
                                    <ExternalLink className="w-6 h-6 text-orange-600 mr-3 flex-shrink-0" />
                                    <div>
                                        <div className="font-semibold text-gray-900">Women Entrepreneurship Strategy</div>
                                        <div className="text-sm text-gray-600">$6B federal women's funding</div>
                                    </div>
                                </a>
                                <a href="https://www.futurpreneur.ca/" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200">
                                    <ExternalLink className="w-6 h-6 text-red-600 mr-3 flex-shrink-0" />
                                    <div>
                                        <div className="font-semibold text-gray-900">Futurpreneur Canada</div>
                                        <div className="text-sm text-gray-600">Newcomer youth entrepreneur loans</div>
                                    </div>
                                </a>
                                <a href="https://canadiancouncilforaboriginalbusiness.ca/" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200">
                                    <ExternalLink className="w-6 h-6 text-pink-600 mr-3 flex-shrink-0" />
                                    <div>
                                        <div className="font-semibold text-gray-900">CCAB</div>
                                        <div className="text-sm text-gray-600">Aboriginal business certification</div>
                                    </div>
                                </a>
                                <a href="https://wbecanada.ca/" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200">
                                    <ExternalLink className="w-6 h-6 text-purple-600 mr-3 flex-shrink-0" />
                                    <div>
                                        <div className="font-semibold text-gray-900">WBE Canada</div>
                                        <div className="text-sm text-gray-600">Women business enterprise certification</div>
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

                {/* Related Guides */}
                <section className="py-16 bg-white border-t border-gray-200">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-6xl mx-auto">
                            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">📚 Related Diversity Funding Guides</h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                <Link href="/blog/black-entrepreneur-grants-canada" className="block p-6 bg-orange-50 rounded-lg shadow hover:shadow-md transition border-l-4 border-orange-500">
                                    <h3 className="font-semibold text-gray-900 mb-2">Black Entrepreneur Grants</h3>
                                    <p className="text-sm text-gray-600">$221M Black Entrepreneurship Program</p>
                                </Link>
                                <Link href="/blog/indigenous-rural-business-funding-canada" className="block p-6 bg-red-50 rounded-lg shadow hover:shadow-md transition border-l-4 border-red-500">
                                    <h3 className="font-semibold text-gray-900 mb-2">Indigenous Business Funding</h3>
                                    <p className="text-sm text-gray-600">$2.1B+ Aboriginal entrepreneur support</p>
                                </Link>
                                <Link href="/blog/women-entrepreneurship-fund-canada" className="block p-6 bg-pink-50 rounded-lg shadow hover:shadow-md transition border-l-4 border-pink-500">
                                    <h3 className="font-semibold text-gray-900 mb-2">Women Entrepreneurship Fund</h3>
                                    <p className="text-sm text-gray-600">$6B for women-owned businesses</p>
                                </Link>
                            </div>
                            <div className="mt-6 grid md:grid-cols-2 gap-6">
                                <Link href="/blog/ontario-government-business-grants" className="block p-4 bg-gray-50 rounded-lg shadow hover:shadow-md transition">
                                    <h3 className="font-semibold text-gray-900">Ontario Business Grants →</h3>
                                    <p className="text-sm text-gray-600">Provincial diversity programs and Toronto ecosystem</p>
                                </Link>
                                <Link href="/blog/federal-grants-women-minorities" className="block p-4 bg-gray-50 rounded-lg shadow hover:shadow-md transition">
                                    <h3 className="font-semibold text-gray-900">Federal Diversity Grants →</h3>
                                    <p className="text-sm text-gray-600">All federal women and minority programs</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Dual CTA */}
                <section className="py-20 bg-gradient-to-r from-orange-600 via-red-600 to-pink-700">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto text-center text-white">
                            <h2 className="text-3xl font-bold mb-6">
                                Ready to Access Minority Business Funding?
                            </h2>
                            <p className="text-xl text-orange-100 mb-8">
                                Get the complete BIPOC entrepreneur funding guide or work with diversity-focused specialists
                                who have secured $24M+ for minority-owned businesses across Canada.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                <div className="bg-white/10 rounded-lg p-6 flex-1 max-w-md">
                                    <h4 className="font-semibold text-white mb-2">Free Diversity Funding Guide</h4>
                                    <p className="text-orange-100 text-sm mb-4">
                                        Get our comprehensive minority business funding guide with program comparisons,
                                        application templates, and cultural business strategies.
                                    </p>
                                    <Button size="lg" className="w-full bg-white text-orange-700 hover:bg-gray-100" asChild>
                                        <Link href="/guides/apply-minority-business-grants">
                                            <Download className="w-4 h-4 mr-2" />
                                            Get Free Guide
                                        </Link>
                                    </Button>
                                </div>

                                <div className="bg-yellow-500/20 border-2 border-yellow-400 rounded-lg p-6 flex-1 max-w-md">
                                    <h4 className="font-semibold text-white mb-2">Expert Diversity Funding Support</h4>
                                    <p className="text-yellow-100 text-sm mb-4">
                                        Work with specialists experienced in BIPOC, newcomer, and minority entrepreneur
                                        funding with proven success across all diversity categories.
                                    </p>
                                    <Button size="lg" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                                        <Link href="/contact?service=minority-business-grants-expert-help">
                                            Get Expert Help
                                        </Link>
                                    </Button>
                                </div>
                            </div>

                            <p className="text-orange-200 text-sm mt-6">
                                87% success rate • Average funding: $132K • Culturally responsive support • All provinces
                            </p>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    )
}
