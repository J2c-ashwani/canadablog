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
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, FileText, Download, Heart, Award, TrendingUp, Accessibility, ExternalLink } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Disability Business Grants Canada 2026 | Funding for Entrepreneurs with Disabilities",
    description: "Complete guide to disability business grants in Canada. Access Opportunities Fund, Enabling Accessibility Fund, provincial disability entrepreneur programs, assistive technology funding, and self-employment support for persons with disabilities.",
    keywords: "disability business grants Canada, entrepreneur with disability funding, Opportunities Fund Canada, Enabling Accessibility Fund, disability self-employment programs, assistive technology grants, accessible business funding Canada",
    openGraph: {
        title: "Disability Business Grants Canada 2026 | Entrepreneur Funding for Persons with Disabilities",
        description: "Access disability-focused business grants across Canada. Federal and provincial funding for entrepreneurs with disabilities.",
        url: "https://www.fsidigital.ca/blog/disability-business-grants-canada",
        images: ["/og-image.png"],
    },
}

const faqData = [
    {
        question: "What is the Opportunities Fund for Persons with Disabilities?",
        answer: "The Opportunities Fund is a federal program providing grants up to $250,000 to organizations offering self-employment and entrepreneurship training for persons with disabilities. While not direct business grants, it funds programs that help disabled entrepreneurs start businesses with training, mentorship, and seed capital support."
    },
    {
        question: "Can disabled entrepreneurs access regular small business grants?",
        answer: "Yes! Persons with disabilities are eligible for ALL federal and provincial business grants (IRAP, SR&ED, CDAP, regional grants) IN ADDITION to disability-specific programs. Being a disabled entrepreneur opens more funding opportunities, not fewer."
    },
    {
        question: "What funding is available for assistive technology and accessibility modifications?",
        answer: "The Enabling Accessibility Fund provides grants for accessibility renovations ($100K-$3M for capital projects). Provincial WorkBC programs, ODSP Employment Supports, and Alberta AISH Employment offer assistive technology funding. Some entrepreneur programs include technology allowances."
    },
    {
        question: "Do I need to disclose my disability to access funding?",
        answer: "For disability-specific programs, yes - you'll need documentation from healthcare providers or disability agencies. However, for general business grants, disclosure is optional. Many entrepreneurs access mainstream funding without disclosure and supplement with disability programs."
    },
    {
        question: "Are there self-employment programs for people on disability income support?",
        answer: "Yes! Most provinces allow self-employment while receiving disability benefits with proper reporting. Ontario ODSP, BC PWD, Alberta AISH, and other provincial programs have self-employment provisions and business startup supports designed for benefit recipients transitioning to entrepreneurship."
    },
    {
        question: "Which provinces have the strongest disability entrepreneur support?",
        answer: "Ontario leads with ODSP Employment Supports and accessibility programs. BC offers strong WorkBC disability services. Alberta's AISH Employment program is well-funded. Quebec has OPHQ entrepreneurship support. Manitoba and Saskatchewan have Community Rehabilitation programs with business focus."
    },
    {
        question: "Can disabled women entrepreneurs access both disability and women's programs?",
        answer: "Absolutely! Intersectional entrepreneurs can stack multiple programs. Apply to Women Entrepreneurship Fund ($6B), disability-specific programs, and general grants simultaneously. Women with disabilities face compounded barriers and are priority applicants for most diversity programs."
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

export default function DisabilityBusinessGrantsCanadaPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <Header />
            <div className="min-h-screen bg-gray-50">
                <section className="bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800 text-white py-16">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto text-center">
                            <Badge className="mb-4 bg-white/20 text-white border-white/30">
                                ♿ Disability Entrepreneur Funding 2026
                            </Badge>
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">
                                Disability Business Grants Canada 2026
                            </h1>
                            <p className="text-xl text-blue-100 mb-8">
                                Comprehensive guide to business funding for entrepreneurs with disabilities across Canada. Access the
                                Opportunities Fund, Enabling Accessibility Fund, provincial disability entrepreneur programs, assistive
                                technology grants, self-employment support for benefit recipients, and specialized funding for accessible
                                business development. Programs support physical, cognitive, sensory, and invisible disabilities.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100" asChild>
                                    <Link href="#disability-programs">Explore Disability Programs</Link>
                                </Button>
                                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild>
                                    <Link href="/guides/apply-disability-grants">Get Free Funding Guide</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-8 bg-indigo-50 border-b-2 border-indigo-200">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto">
                            <Card className="border-indigo-200 bg-indigo-50">
                                <CardContent className="pt-6">
                                    <div className="flex items-start">
                                        <Accessibility className="w-6 h-6 text-indigo-600 mr-3 mt-1" />
                                        <div>
                                            <h3 className="text-lg font-bold text-indigo-800 mb-2">🎯 2026 Disability Funding Highlights</h3>
                                            <div className="grid md:grid-cols-2 gap-4 text-sm text-indigo-700">
                                                <div><strong>Opportunities Fund:</strong> $40M annual for disability employment programs</div>
                                                <div><strong>Enabling Accessibility Fund:</strong> $100K-$3M for accessibility projects</div>
                                                <div><strong>Provincial Programs:</strong> All provinces offer disability entrepreneur support</div>
                                                <div><strong>Intersectional Priority:</strong> Disabled women/BIPOC receive enhanced support</div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                <section className="py-12 bg-gray-50 border-b border-gray-200">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">❓ Common Questions About Disability Business Grants</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <a href="#faqs" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                                    <h3 className="font-semibold text-blue-900">What is the Opportunities Fund?</h3>
                                    <p className="text-sm text-gray-600 mt-1">Federal grants for disability entrepreneurship training programs</p>
                                </a>
                                <a href="#faqs" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                                    <h3 className="font-semibold text-blue-900">Can I get general grants too?</h3>
                                    <p className="text-sm text-gray-600 mt-1">Yes! Disability programs ADD to all standard business funding</p>
                                </a>
                                <a href="#faqs" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                                    <h3 className="font-semibold text-blue-900">Assistive technology funding?</h3>
                                    <p className="text-sm text-gray-600 mt-1">Enabling Accessibility Fund + provincial tech allowances</p>
                                </a>
                                <a href="#faqs" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                                    <h3 className="font-semibold text-blue-900">Must I disclose disability?</h3>
                                    <p className="text-sm text-gray-600 mt-1">Only for disability-specific programs; optional for general grants</p>
                                </a>
                                <a href="#faqs" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                                    <h3 className="font-semibold text-blue-900">Self-employment on benefits?</h3>
                                    <p className="text-sm text-gray-600 mt-1">Yes! Most provinces allow with proper reporting</p>
                                </a>
                                <a href="#faqs" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                                    <h3 className="font-semibold text-blue-900">Best provinces for support?</h3>
                                    <p className="text-sm text-gray-600 mt-1">Ontario, BC, Alberta lead with comprehensive programs</p>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto">
                            <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
                                <div>
                                    <div className="text-3xl font-bold text-blue-600 mb-2">$40M+</div>
                                    <div className="text-gray-600">Annual Opportunities Fund</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-indigo-600 mb-2">$250K</div>
                                    <div className="text-gray-600">Max Program Grants</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-purple-600 mb-2">10,000+</div>
                                    <div className="text-gray-600">Disabled Entrepreneurs Supported</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-green-600 mb-2">All</div>
                                    <div className="text-gray-600">Provinces Covered</div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-sm p-8">
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">What is Disability Business Funding in Canada?</h2>
                                <p className="text-lg text-gray-700 mb-6">
                                    Canada's disability entrepreneur support system operates through federal programs like the Opportunities
                                    Fund ($40M annually) and Enabling Accessibility Fund, combined with comprehensive provincial disability
                                    employment and self-employment programs. These initiatives recognize that persons with disabilities face
                                    unique barriers to traditional employment and that entrepreneurship offers flexible, accessible career paths.
                                    Funding supports business startup costs, assistive technology, workplace accessibility modifications,
                                    mentorship, and ongoing business development for entrepreneurs with physical, cognitive, sensory, and
                                    invisible disabilities across all Canadian provinces.
                                </p>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-blue-50 p-6 rounded-lg">
                                        <h4 className="font-bold text-lg mb-3 text-blue-800">Federal Disability Programs</h4>
                                        <ul className="text-gray-700 space-y-2">
                                            <li>• Opportunities Fund for Persons with Disabilities</li>
                                            <li>• Enabling Accessibility Fund (EAF)</li>
                                            <li>• Accessible Technology Program</li>
                                            <li>• Canada Disability Benefit (upcoming)</li>
                                        </ul>
                                    </div>

                                    <div className="bg-indigo-50 p-6 rounded-lg">
                                        <h4 className="font-bold text-lg mb-3 text-indigo-800">Provincial Programs</h4>
                                        <ul className="text-gray-700 space-y-2">
                                            <li>• ODSP Employment Supports (Ontario)</li>
                                            <li>• WorkBC Assistive Technology (BC)</li>
                                            <li>• AISH Employment (Alberta)</li>
                                            <li>• Quebec OPHQ entrepreneur programs</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="disability-programs" className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-6xl mx-auto">
                            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">What Federal Disability Business Programs are Available?</h2>

                            <div className="space-y-8">
                                <Card className="border-blue-200">
                                    <CardHeader>
                                        <div className="flex items-center mb-2">
                                            <Award className="w-6 h-6 text-blue-600 mr-3" />
                                            <CardTitle className="text-blue-700">Opportunities Fund for Persons with Disabilities</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid md:grid-cols-3 gap-4 mb-4">
                                            <div className="flex items-center">
                                                <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                                                <span><strong>$40M Annual Budget</strong></span>
                                            </div>
                                            <div className="flex items-center">
                                                <Target className="w-5 h-5 text-blue-600 mr-2" />
                                                <span><strong>Up to $250K Grants</strong></span>
                                            </div>
                                            <div className="flex items-center">
                                                <Users className="w-5 h-5 text-purple-600 mr-2" />
                                                <span><strong>Training & Self-Employment</strong></span>
                                            </div>
                                        </div>
                                        <p className="text-gray-700 mb-4">
                                            While not direct-to-entrepreneur grants, the Opportunities Fund provides substantial funding to
                                            organizations delivering self-employment and entrepreneurship programs for persons with disabilities.
                                            Many provincial disability organizations use Opportunities Fund grants to provide business training,
                                            startup capital, mentorship, and ongoing support to disabled entrepreneurs.
                                        </p>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <h5 className="font-semibold mb-2">Eligible Organizations:</h5>
                                                <ul className="text-sm text-gray-600 space-y-1">
                                                    <li>• Provincial disability employment centers</li>
                                                    <li>• Community rehabilitation organizations</li>
                                                    <li>• Disability advocacy groups</li>
                                                    <li>• Social enterprises serving disabled communities</li>
                                                    <li>• Aboriginal disability service providers</li>
                                                    <li>• Mental health employment agencies</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <h5 className="font-semibold mb-2">Entrepreneur Support Services:</h5>
                                                <ul className="text-sm text-gray-600 space-y-1">
                                                    <li>• Business planning and development training</li>
                                                    <li>• Seed capital grants ($5K-$15K typical)</li>
                                                    <li>• One-on-one business mentorship</li>
                                                    <li>• Assistive technology assessments</li>
                                                    <li>• Financial literacy and bookkeeping</li>
                                                    <li>• Marketing and digital presence building</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="border-indigo-200">
                                    <CardHeader>
                                        <div className="flex items-center mb-2">
                                            <Building className="w-6 h-6 text-indigo-600 mr-3" />
                                            <CardTitle className="text-indigo-700">Enabling Accessibility Fund (EAF)</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid md:grid-cols-3 gap-4 mb-4">
                                            <div className="flex items-center">
                                                <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                                                <span><strong>$100K-$3M Projects</strong></span>
                                            </div>
                                            <div className="flex items-center">
                                                <Building className="w-5 h-5 text-blue-600 mr-2" />
                                                <span><strong>Accessibility Renovations</strong></span>
                                            </div>
                                            <div className="flex items-center">
                                                <Target className="w-5 h-5 text-purple-600 mr-2" />
                                                <span><strong>50% Cost-Share</strong></span>
                                            </div>
                                        </div>
                                        <p className="text-gray-700 mb-4">
                                            The EAF provides grants for accessibility improvements to buildings and public spaces. While primarily
                                            focused on community infrastructure, business owners can access funding for making commercial spaces
                                            accessible, creating inclusive workplaces, and ensuring barrier-free customer access.
                                        </p>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <h5 className="font-semibold mb-2">Eligible Projects:</h5>
                                                <ul className="text-sm text-gray-600 space-y-1">
                                                    <li>• Wheelchair ramps and accessible entrances</li>
                                                    <li>• Accessible washroom renovations</li>
                                                    <li>• Elevators and lift installations</li>
                                                    <li>• Automatic door systems</li>
                                                    <li>• Accessible signage and wayfinding</li>
                                                    <li>• Sensory-friendly environment modifications</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <h5 className="font-semibold mb-2">Funding Details:</h5>
                                                <ul className="text-sm text-gray-600 space-y-1">
                                                    <li>• Small Projects: $1M max (50% cost-share)</li>
                                                    <li>• Mid-Sized Projects: Up to $3M</li>
                                                    <li>• Multi-year project timelines supported</li>
                                                    <li>• Planning grants available ($25K-$50K)</li>
                                                    <li>• Accessibility audits funded</li>
                                                    <li>• Technology integration eligible</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="border-purple-200">
                                    <CardHeader>
                                        <div className="flex items-center mb-2">
                                            <Heart className="w-6 h-6 text-purple-600 mr-3" />
                                            <CardTitle className="text-purple-700">Women Entrepreneurship Strategy - Disability Focus</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid md:grid-cols-3 gap-4 mb-4">
                                            <div className="flex items-center">
                                                <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                                                <span><strong>$6B Total Fund</strong></span>
                                            </div>
                                            <div className="flex items-center">
                                                <Users className="w-5 h-5 text-blue-600 mr-2" />
                                                <span><strong>Intersectional Priority</strong></span>
                                            </div>
                                            <div className="flex items-center">
                                                <Award className="w-5 h-5 text-purple-600 mr-2" />
                                                <span><strong>$100K-$5M Loans</strong></span>
                                            </div>
                                        </div>
                                        <p className="text-gray-700 mb-4">
                                            The Women Entrepreneurship Strategy explicitly prioritizes women with disabilities as an underserved
                                            intersectional group. Women entrepreneurs with disabilities can access enhanced support through the
                                            Women Entrepreneurship Fund, Knowledge Hub, and specialized programming recognizing compounded barriers.
                                        </p>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <h5 className="font-semibold mb-2">Priority Access For:</h5>
                                                <ul className="text-sm text-gray-600 space-y-1">
                                                    <li>• Women with physical disabilities</li>
                                                    <li>• Women with cognitive/learning disabilities</li>
                                                    <li>• Women with mental health disabilities</li>
                                                    <li>• Deaf and hard-of-hearing women</li>
                                                    <li>• Blind and visually impaired women</li>
                                                    <li>• Women with invisible/chronic conditions</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <h5 className="font-semibold mb-2">Enhanced Support:</h5>
                                                <ul className="text-sm text-gray-600 space-y-1">
                                                    <li>• Flexible loan terms and repayment</li>
                                                    <li>• Accessible mentorship programs</li>
                                                    <li>• Assistive technology allowances</li>
                                                    <li>• Disability-informed business coaching</li>
                                                    <li>• Private sector partnership facilitation</li>
                                                    <li>• Networking with disability business leaders</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">What Provincial Disability Entrepreneur Programs Exist?</h2>

                            <div className="space-y-6">
                                <Card className="border-l-4 border-blue-500">
                                    <CardContent className="pt-6">
                                        <h4 className="font-bold text-lg mb-3 text-blue-800">🏛️ Ontario - ODSP Employment Supports</h4>
                                        <p className="text-gray-700 mb-3">
                                            Ontario Disability Support Program (ODSP) recipients can access comprehensive self-employment supports
                                            while maintaining benefits. The program is Canada's most developed disability entrepreneur system.
                                        </p>
                                        <ul className="text-sm text-gray-600 space-y-1">
                                            <li>• <strong>Startup Grants:</strong> Up to $5,000 for business launch costs</li>
                                            <li>• <strong>Assistive Technology:</strong> $15,000 for work-related devices/software</li>
                                            <li>• <strong>Modified Work Vehicle:</strong> Up to $15,000 for accessible transportation</li>
                                            <li>• <strong>Business Development:</strong> Training, mentorship, and planning support</li>
                                            <li>• <strong>Income Exemptions:</strong> Self-employment earnings exemptions while on ODSP</li>
                                            <li>• <strong>Gradual Transition:</strong> Test business viability while retaining benefits</li>
                                        </ul>
                                    </CardContent>
                                </Card>

                                <Card className="border-l-4 border-indigo-500">
                                    <CardContent className="pt-6">
                                        <h4 className="font-bold text-lg mb-3 text-indigo-800">🌲 BC - WorkBC Assistive Technology & PWD Supports</h4>
                                        <p className="text-gray-700 mb-3">
                                            British Columbia's WorkBC program and Persons with Disabilities (PWD) benefits include robust
                                            self-employment and assistive technology support for disabled entrepreneurs.
                                        </p>
                                        <ul className="text-sm text-gray-600 space-y-1">
                                            <li>• <strong>Self-Employment Program:</strong> Business planning and startup assistance</li>
                                            <li>• <strong>Assistive Technology:</strong> Work-related technology and equipment funding</li>
                                            <li>• <strong>Workplace Modifications:</strong> Home office accessibility upgrades</li>
                                            <li>• <strong>PWD Income Exemptions:</strong> Self-employment earnings while on benefits</li>
                                            <li>• <strong>Supported Self-Employment:</strong> Ongoing coaching and mentorship</li>
                                            <li>• <strong>Small Business BC:</strong> Partnership for disability entrepreneur resources</li>
                                        </ul>
                                    </CardContent>
                                </Card>

                                <Card className="border-l-4 border-purple-500">
                                    <CardContent className="pt-6">
                                        <h4 className="font-bold text-lg mb-3 text-purple-800">🌾 Alberta - AISH Employment Programs</h4>
                                        <p className="text-gray-700 mb-3">
                                            Assured Income for the Severely Handicapped (AISH) includes employment and self-employment supports
                                            for Albertans with disabilities pursuing entrepreneurship.
                                        </p>
                                        <ul className="text-sm text-gray-600 space-y-1">
                                            <li>• <strong>Self-Employment Supports:</strong> Business development training and grants</li>
                                            <li>• <strong>Assistive Technology:</strong> $15,000+ for work devices and software</li>
                                            <li>• <strong>Income Exemptions:</strong> Self-employment earnings while receiving AISH</li>
                                            <li>• <strong>Community Rehabilitation:</strong> Partnership with CROs for business support</li>
                                            <li>• <strong>Alberta Innovates:</strong> Access to technology commercialization for disabled innovators</li>
                                            <li>• <strong>Skills Development:</strong> Business skills training specifically for AISH recipients</li>
                                        </ul>
                                    </CardContent>
                                </Card>

                                <Card className="border-l-4 border-pink-500">
                                    <CardContent className="pt-6">
                                        <h4 className="font-bold text-lg mb-3 text-pink-800">🍁 Quebec - OPHQ & Social Assistance Programs</h4>
                                        <p className="text-gray-700 mb-3">
                                            Quebec's Office des personnes handicapées du Québec (OPHQ) and social assistance programs support
                                            disability entrepreneurship with francophone and anglophone services.
                                        </p>
                                        <ul className="text-sm text-gray-600 space-y-1">
                                            <li>• <strong>OPHQ Support Programs:</strong> Accessibility and employment integration</li>
                                            <li>• <strong>Emploi-Québec:</strong> Self-employment assistance for persons with disabilities</li>
                                            <li>• <strong>PME MTL:</strong> Montreal small business loans for disabled entrepreneurs</li>
                                            <li>• <strong>Social Assistance Exemptions:</strong> Self-employment earnings allowances</li>
                                            <li>• <strong>Community Organizations:</strong> Disability-focused business development agencies</li>
                                            <li>• <strong>Assistive Technology:</strong> Work-related equipment through Régie de l'assurance maladie</li>
                                        </ul>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">How to Access Disability Business Grants in Canada</h2>

                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <span className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">1</span>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 text-lg">Connect with Disability Employment Services</h4>
                                        <p className="text-gray-600">Contact your provincial disability support program (ODSP, AISH, PWD, etc.) or local community rehabilitation organization to explore self-employment options and available supports.</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <span className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">2</span>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 text-lg">Understand Benefit Implications</h4>
                                        <p className="text-gray-600">If receiving disability benefits, understand income exemptions and reporting requirements for self-employment. Most provinces allow business income with proper reporting frameworks.</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <span className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">3</span>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 text-lg">Assess Assistive Technology Needs</h4>
                                        <p className="text-gray-600">Identify technologies, equipment, or workplace modifications needed for your business. Provincial programs typically fund assistive technology separately from business startup costs.</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <span className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">4</span>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 text-lg">Apply to Multiple Program Streams</h4>
                                        <p className="text-gray-600">Don't limit yourself to disability-specific funding. Apply to federal and provincial small business grants (IRAP, SR&ED, CDAP) AND disability programs simultaneously.</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <span className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">5</span>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 text-lg">Leverage Disability Business Networks</h4>
                                        <p className="text-gray-600">Connect with disability entrepreneur communities, accessibility-focused accelerators, and inclusive business networks for mentorship, partnership opportunities, and market access.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What are Success Strategies for Disabled Entrepreneurs?</h2>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="font-bold text-lg mb-4 text-green-700">✅ Maximize Disability Funding:</h4>
                                    <ul className="space-y-3 text-gray-700">
                                        <li className="flex items-start">
                                            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                                            <span><strong>Stack Multiple Programs:</strong> Combine disability supports with general grants, women's programs (if applicable), and provincial business funding</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                                            <span><strong>Prioritize Assistive Technology:</strong> Access full technology allowances before launching - proper tools are essential for success</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                                            <span><strong>Highlight Accessibility Innovation:</strong> Position your business as advancing accessibility and inclusive design - strong competitive angle</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                                            <span><strong>Gradual Transition with Benefits:</strong> Use provincial benefit exemptions to test business viability while maintaining income security</span>
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="font-bold text-lg mb-4 text-red-700">❌ Common Mistakes to Avoid:</h4>
                                    <ul className="space-y-3 text-gray-700">
                                        <li className="flex items-start">
                                            <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                                            <span><strong>Not Exploring Provincial Supports:</strong> Missing significant provincial disability employment programs and self-employment funding</span>
                                        </li>
                                        <li className="flex items-start">
                                            <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                                            <span><strong>Assuming Ineligibility:</strong> Many disabled entrepreneurs don't pursue general business grants, assuming they're only eligible for disability-specific programs</span>
                                        </li>
                                        <li className="flex items-start">
                                            <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                                            <span><strong>Inadequate Assistive Technology:</strong> Underinvesting in essential accessibility tools that enable productivity</span>
                                        </li>
                                        <li className="flex items-start">
                                            <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                                            <span><strong>Benefit Reporting Errors:</strong> Not properly reporting self-employment income, risking benefit clawbacks or termination</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-12 bg-white border-t border-gray-100">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Official Disability Program Resources</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <a href="https://www.canada.ca/en/employment-social-development/programs/disability/opportunities-fund.html" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200">
                                    <ExternalLink className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0" />
                                    <div>
                                        <div className="font-semibold text-gray-900">Opportunities Fund</div>
                                        <div className="text-sm text-gray-600">Federal disability employment funding</div>
                                    </div>
                                </a>
                                <a href="https://www.canada.ca/en/employment-social-development/programs/enabling-accessibility-fund.html" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200">
                                    <ExternalLink className="w-6 h-6 text-indigo-600 mr-3 flex-shrink-0" />
                                    <div>
                                        <div className="font-semibold text-gray-900">Enabling Accessibility Fund</div>
                                        <div className="text-sm text-gray-600">Accessibility project grants</div>
                                    </div>
                                </a>
                                <a href="https://www.ontario.ca/page/ontario-disability-support-program-employment-supports" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200">
                                    <ExternalLink className="w-6 h-6 text-purple-600 mr-3 flex-shrink-0" />
                                    <div>
                                        <div className="font-semibold text-gray-900">ODSP Employment Supports</div>
                                        <div className="text-sm text-gray-600">Ontario self-employment programs</div>
                                    </div>
                                </a>
                                <a href="https://www.workbc.ca/employment-services/assistive-technology-services.aspx" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200">
                                    <ExternalLink className="w-6 h-6 text-green-600 mr-3 flex-shrink-0" />
                                    <div>
                                        <div className="font-semibold text-gray-900">WorkBC Assistive Technology</div>
                                        <div className="text-sm text-gray-600">BC disability work supports</div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

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

                <section className="py-16 bg-white border-t border-gray-200">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-6xl mx-auto">
                            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">📚 Related Funding Guides</h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                <Link href="/blog/minority-business-grants-canada" className="block p-6 bg-blue-50 rounded-lg shadow hover:shadow-md transition border-l-4 border-blue-500">
                                    <h3 className="font-semibold text-gray-900 mb-2">Minority Business Grants</h3>
                                    <p className="text-sm text-gray-600">BIPOC entrepreneur and diversity funding</p>
                                </Link>
                                <Link href="/blog/women-entrepreneurship-fund-canada" className="block p-6 bg-indigo-50 rounded-lg shadow hover:shadow-md transition border-l-4 border-indigo-500">
                                    <h3 className="font-semibold text-gray-900 mb-2">Women Entrepreneurship Fund</h3>
                                    <p className="text-sm text-gray-600">Intersectional support for women with disabilities</p>
                                </Link>
                                <Link href="/blog/indigenous-rural-business-funding-canada" className="block p-6 bg-purple-50 rounded-lg shadow hover:shadow-md transition border-l-4 border-purple-500">
                                    <h3 className="font-semibold text-gray-900 mb-2">Indigenous Business Funding</h3>
                                    <p className="text-sm text-gray-600">Aboriginal entrepreneur programs</p>
                                </Link>
                            </div>
                            <div className="mt-6 grid md:grid-cols-2 gap-6">
                                <Link href="/blog/ontario-government-business-grants" className="block p-4 bg-gray-50 rounded-lg shadow hover:shadow-md transition">
                                    <h3 className="font-semibold text-gray-900">Ontario Business Grants →</h3>
                                    <p className="text-sm text-gray-600">ODSP and provincial funding programs</p>
                                </Link>
                                <Link href="/blog/canada-federal-grants" className="block p-4 bg-gray-50 rounded-lg shadow hover:shadow-md transition">
                                    <h3 className="font-semibold text-gray-900">Federal Business Grants →</h3>
                                    <p className="text-sm text-gray-600">All federal programs accessible to disabled entrepreneurs</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-20 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto text-center text-white">
                            <h2 className="text-3xl font-bold mb-6">
                                Ready to Access Disability Business Funding?
                            </h2>
                            <p className="text-xl text-blue-100 mb-8">
                                Get the complete disability entrepreneur funding guide with provincial program comparisons and
                                assistive technology resources, or work with accessibility-focused specialists.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                <div className="bg-white/10 rounded-lg p-6 flex-1 max-w-md">
                                    <h4 className="font-semibold text-white mb-2">Free Disability Funding Guide</h4>
                                    <p className="text-blue-100 text-sm mb-4">
                                        Comprehensive guide to disability entrepreneur programs, benefit coordination strategies,
                                        and assistive technology funding across all provinces.
                                    </p>
                                    <Button size="lg" className="w-full bg-white text-blue-700 hover:bg-gray-100" asChild>
                                        <Link href="/guides/apply-disability-grants">
                                            <Download className="w-4 h-4 mr-2" />
                                            Get Free Guide
                                        </Link>
                                    </Button>
                                </div>

                                <div className="bg-yellow-500/20 border-2 border-yellow-400 rounded-lg p-6 flex-1 max-w-md">
                                    <h4 className="font-semibold text-white mb-2">Expert Accessibility Support</h4>
                                    <p className="text-yellow-100 text-sm mb-4">
                                        Work with disability funding specialists experienced in navigating provincial
                                        programs, assistive technology, and accessible business development.
                                    </p>
                                    <Button size="lg" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                                        <Link href="/contact?service=disability-grants-expert-help">
                                            Get Expert Help
                                        </Link>
                                    </Button>
                                </div>
                            </div>

                            <p className="text-blue-200 text-sm mt-6">
                                Accessible support • All disability types • Self-employment while on benefits • Assistive technology funding
                            </p>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    )
}
