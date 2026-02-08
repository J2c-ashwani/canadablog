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
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Users, FileText, Download, Building2, Wrench, Truck, TrendingUp, Award, ExternalLink } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Construction Business Grants Canada 2026 | Infrastructure + Green Building Funding",
    description: "Complete guide to construction business grants in Canada. Access IRAP innovation grants, green building incentives, apprenticeship funding, Regional Development infrastructure programs, and provincial construction business support.",
    keywords: "construction business grants Canada, IRAP construction funding, green building grants, infrastructure grants Canada, construction apprenticeship funding, GreenON construction, sustainable building grants Canada",
    openGraph: {
        title: "Construction Business Grants Canada 2026 | Infrastructure + Green Building Programs",
        description: "Access construction-focused grants including IRAP, green building incentives, infrastructure programs, and provincial construction funding.",
        url: "https://www.fsidigital.ca/blog/construction-business-grants-canada",
        images: ["/og-image.png"],
    },
}

const faqData = [
    {
        question: "What is IRAP and how does it support construction businesses?",
        answer: "The Industrial Research Assistance Program (IRAP) provides up to $1M in non-repayable grants for construction technology innovation. Contractors developing new building technologies, sustainable materials, construction automation, or innovative processes qualify. IRAP funds 80% of R&D project costs with no repayment requirement."
    },
    {
        question: "Are there grants for green building and sustainable construction?",
        answer: "Yes! Federal programs like Green Construction through IRAP, provincial green building incentives (Ontario GreenON legacy programs, BC energy retrofit grants), and Regional Agency sustainability initiatives fund energy-efficient construction, net-zero buildings, and sustainable material adoption."
    },
    {
        question: "Can construction companies get apprenticeship and training grants?",
        answer: "Absolutely. The Apprenticeship Grant provides up to $5,000 per apprentice. Apprenticeship Job Creation Tax Credits offer 10% credits. Provincial programs (Ontario Apprenticeship, BC ITA) provide wage subsidies and training support. Trades development is a priority funding area."
    },
    {
        question: "Do infrastructure contractors qualify for business grants?",
        answer: "Yes, through Regional Development Agencies and Infrastructure Canada programs. Civil contractors, heavy construction firms, and infrastructure technology companies access grants for equipment modernization, technology adoption, and business expansion projects supporting Canada's infrastructure priorities."
    },
    {
        question: "Are there construction equipment and technology adoption grants?",
        answer: "Yes! CDAP provides $15K for digital technology (project management software, BIM, estimating tools). Regional Agencies fund equipment purchases. IRAP supports construction tech innovation (drones, robotics, automation). Provincial programs offer accelerated depreciation and equipment grants."
    },
    {
        question: "Can small residential contractors access these grants?",
        answer: "Yes! Residential contractors qualify for CDAP digital adoption, apprenticeship grants, and provincial small business programs. Energy-efficiency contractors access green building incentives and retrofit program partnerships. Community Futures supports rural residential construction businesses."
    },
    {
        question: "What are the best construction grants for business growth?",
        answer: "Layer multiple programs: CDAP ($15K digital), IRAP (innovation R&D), Regional Agency business expansion grants ($100K-$5M), apprenticeship funding ($5K/apprentice), and provincial construction programs. Strategic stacking funds comprehensive construction business transformation and growth."
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

export default function ConstructionBusinessGrantsCanadaPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <Header />
            <div className="min-h-screen bg-gray-50">
                <section className="bg-gradient-to-br from-slate-700 via-gray-700 to-zinc-800 text-white py-16">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto text-center">
                            <Badge className="mb-4 bg-white/20 text-white border-white/30">
                                🏗️ Construction Industry Funding 2026
                            </Badge>
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">
                                Construction Business Grants Canada 2026
                            </h1>
                            <p className="text-xl text-slate-100 mb-8">
                                Comprehensive guide to construction business grants across Canada. Access IRAP innovation funding (up to $1M),
                                green building and sustainable construction incentives, apprenticeship grants ($5K per apprentice), infrastructure
                                program support, digital adoption funding (CDAP $15K), equipment modernization grants, and specialized funding
                                for general contractors, specialty trades, civil construction, and residential builders across all provinces.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button size="lg" className="bg-white text-slate-700 hover:bg-gray-100" asChild>
                                    <Link href="#construction-programs">Explore Construction Programs</Link>
                                </Button>
                                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild>
                                    <Link href="/guides/apply-construction-grants">Get Free Funding Guide</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-8 bg-slate-50 border-b-2 border-slate-200">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto">
                            <Card className="border-slate-200 bg-slate-50">
                                <CardContent className="pt-6">
                                    <div className="flex items-start">
                                        <Building2 className="w-6 h-6 text-slate-600 mr-3 mt-1" />
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-800 mb-2">🎯 2026 Construction Funding Highlights</h3>
                                            <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-700">
                                                <div><strong>IRAP Innovation:</strong> Up to $1M for construction technology R&D</div>
                                                <div><strong>Apprenticeship Grants:</strong> $5K per apprentice + tax credits</div>
                                                <div><strong>Green Building:</strong> Incentives for sustainable construction across Canada</div>
                                                <div><strong>Infrastructure Programs:</strong> Regional Agency support for civil contractors</div>
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
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">❓ Common Questions About Construction Business Grants</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <a href="#faqs" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                                    <h3 className="font-semibold text-slate-900">What is IRAP for construction?</h3>
                                    <p className="text-sm text-gray-600 mt-1">Up to $1M grants for construction innovation & R&D</p>
                                </a>
                                <a href="#faqs" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                                    <h3 className="font-semibold text-slate-900">Green building grants available?</h3>
                                    <p className="text-sm text-gray-600 mt-1">Yes! Federal + provincial sustainable construction incentives</p>
                                </a>
                                <a href="#faqs" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                                    <h3 className="font-semibold text-slate-900">Apprenticeship funding?</h3>
                                    <p className="text-sm text-gray-600 mt-1">$5K/apprentice grants + 10% tax credits</p>
                                </a>
                                <a href="#faqs" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                                    <h3 className="font-semibold text-slate-900">Infrastructure contractors eligible?</h3>
                                    <p className="text-sm text-gray-600 mt-1">Yes! Regional Agencies + Infrastructure Canada programs</p>
                                </a>
                                <a href="#faqs" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                                    <h3 className="font-semibold text-slate-900">Equipment modernization grants?</h3>
                                    <p className="text-sm text-gray-600 mt-1">CDAP ($15K), IRAP, Regional Agencies, provincial programs</p>
                                </a>
                                <a href="#faqs" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                                    <h3 className="font-semibold text-slate-900">Small contractors qualify?</h3>
                                    <p className="text-sm text-gray-600 mt-1">Yes! CDAP, apprenticeships, provincial small business grants</p>
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
                                    <div className="text-3xl font-bold text-slate-600 mb-2">$1M</div>
                                    <div className="text-gray-600">Max IRAP Grant</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-gray-600 mb-2">$5K</div>
                                    <div className="text-gray-600">Per Apprentice</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-zinc-600 mb-2">15,000+</div>
                                    <div className="text-gray-600">Construction Firms Funded</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-stone-600 mb-2">All</div>
                                    <div className="text-gray-600">Provinces Covered</div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-sm p-8">
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">What is Construction Business Funding in Canada?</h2>
                                <p className="text-lg text-gray-700 mb-6">
                                    Canada's construction sector funding ecosystem prioritizes innovation, sustainability, workforce development,
                                    and digital modernization. The Industrial Research Assistance Program (IRAP) leads federal innovation support
                                    with up to $1 million in non-repayable grants for construction technology R&D. Apprenticeship programs provide
                                    $5,000 per apprentice plus tax credits addressing skilled trades shortages. Green building incentives through
                                    federal and provincial programs fund sustainable construction practices and net-zero building expertise. Regional
                                    Development Agencies support infrastructure contractors, equipment modernization, and business expansion.
                                    The Canada Digital Adoption Program (CDAP) funds construction technology adoption including BIM, project management
                                    software, and estimating tools. This comprehensive system supports general contractors, specialty trades, civil
                                    construction, residential builders, and construction technology companies across all provinces.
                                </p>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-slate-50 p-6 rounded-lg">
                                        <h4 className="font-bold text-lg mb-3 text-slate-800">Federal Construction Programs</h4>
                                        <ul className="text-gray-700 space-y-2">
                                            <li>• IRAP for construction innovation</li>
                                            <li>• Apprenticeship Grants & Tax Credits</li>
                                            <li>• CDAP digital technology adoption</li>
                                            <li>• Regional Development Agency infrastructure support</li>
                                        </ul>
                                    </div>

                                    <div className="bg-gray-50 p-6 rounded-lg">
                                        <h4 className="font-bold text-lg mb-3 text-gray-800">Provincial Construction Support</h4>
                                        <ul className="text-gray-700 space-y-2">
                                            <li>• Green building and energy efficiency incentives</li>
                                            <li>• Provincial apprenticeship programs</li>
                                            <li>• Construction business development grants</li>
                                            <li>• Infrastructure partnership opportunities</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="construction-programs" className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-6xl mx-auto">
                            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">What Federal Construction Funding Programs are Available?</h2>

                            <div className="space-y-8">
                                <Card className="border-slate-200">
                                    <CardHeader>
                                        <div className="flex items-center mb-2">
                                            <Award className="w-6 h-6 text-slate-600 mr-3" />
                                            <CardTitle className="text-slate-700">IRAP for Construction Innovation & Technology</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid md:grid-cols-3 gap-4 mb-4">
                                            <div className="flex items-center">
                                                <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                                                <span><strong>Up to $1M Grants</strong></span>
                                            </div>
                                            <div className="flex items-center">
                                                <Target className="w-5 h-5 text-blue-600 mr-2" />
                                                <span><strong>80% Cost Coverage</strong></span>
                                            </div>
                                            <div className="flex items-center">
                                                <Building2 className="w-5 h-5 text-purple-600 mr-2" />
                                                <span><strong>Non-Repayable</strong></span>
                                            </div>
                                        </div>
                                        <p className="text-gray-700 mb-4">
                                            The Industrial Research Assistance Program funds construction companies developing innovative building
                                            technologies, sustainable materials, construction automation, and novel processes. IRAP covers 80% of R&D
                                            project costs with no repayment requirement, making it ideal for construction firms innovating in green
                                            building, modular construction, automation, or materials science.
                                        </p>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <h5 className="font-semibold mb-2">Eligible Construction Innovation:</h5>
                                                <ul className="text-sm text-gray-600 space-y-1">
                                                    <li>• Sustainable building materials development</li>
                                                    <li>• Construction automation and robotics</li>
                                                    <li>• Modular and prefabricated building systems</li>
                                                    <li>• Green building technology innovation</li>
                                                    <li>• Energy-efficient construction methods</li>
                                                    <li>• Drone and AI construction applications</li>
                                                    <li>• BIM and digital construction platforms</li>
                                                    <li>• Waste reduction and circular construction</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <h5 className="font-semibold mb-2">IRAP Benefits:</h5>
                                                <ul className="text-sm text-gray-600 space-y-1">
                                                    <li>• Covers 80% of eligible R&D costs</li>
                                                    <li>• Non-repayable contribution (grant, not loan)</li>
                                                    <li>• Maximum $1M per project</li>
                                                    <li>• Advisory support from IRAP advisors</li>
                                                    <li>• Intellectual property stays with company</li>
                                                    <li>• Youth employment wage subsidies</li>
                                                    <li>• Can be combined with SR&ED tax credits</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="border-gray-200">
                                    <CardHeader>
                                        <div className="flex items-center mb-2">
                                            <Users className="w-6 h-6 text-gray-600 mr-3" />
                                            <CardTitle className="text-gray-700">Apprenticeship Grants & Skilled Trades Development</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid md:grid-cols-3 gap-4 mb-4">
                                            <div className="flex items-center">
                                                <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                                                <span><strong>$5,000 Per Apprentice</strong></span>
                                            </div>
                                            <div className="flex items-center">
                                                <Users className="w-5 h-5 text-blue-600 mr-2" />
                                                <span><strong>10% Tax Credits</strong></span>
                                            </div>
                                            <div className="flex items-center">
                                                <Target className="w-5 h-5 text-purple-600 mr-2" />
                                                <span><strong>All Trades</strong></span>
                                            </div>
                                        </div>
                                        <p className="text-gray-700 mb-4">
                                            Construction employers receive substantial support for hiring and training apprentices. The federal
                                            Apprenticeship Grant provides $5,000 across apprenticeship completion milestones. Apprenticeship Job
                                            Creation Tax Credits offer 10% of eligible apprentice salaries (up to $2,000/year). Provincial programs
                                            provide additional wage subsidies and training support.
                                        </p>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <h5 className="font-semibold mb-2">Federal Apprenticeship Support:</h5>
                                                <ul className="text-sm text-gray-600 space-y-1">
                                                    <li>• <strong>Apprenticeship Incentive Grant:</strong> $1,000 per year (2 years)</li>
                                                    <li>• <strong>Apprenticeship Completion Grant:</strong> $2,000 at certification</li>
                                                    <li>• <strong>Apprenticeship Job Creation Tax Credit:</strong> 10% of wages</li>
                                                    <li>• <strong>EI Apprentice Training Support:</strong> Income during training</li>
                                                    <li>• <strong>Youth Employment Programs:</strong> Wage subsidies for young apprentices</li>
                                                    <li>• <strong>Women in Trades:</strong> Enhanced support for women apprentices</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <h5 className="font-semibold mb-2">Eligible Construction Trades:</h5>
                                                <ul className="text-sm text-gray-600 space-y-1">
                                                    <li>• Carpentry and joinery</li>
                                                    <li>• Electrical and HVAC trades</li>
                                                    <li>• Plumbing and pipefitting</li>
                                                    <li>• Heavy equipment operation</li>
                                                    <li>• Masonry and concrete finishing</li>
                                                    <li>• Welding and metal fabrication</li>
                                                    <li>• All Red Seal designated trades</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="border-zinc-200">
                                    <CardHeader>
                                        <div className="flex items-center mb-2">
                                            <Building2 className="w-6 h-6 text-zinc-600 mr-3" />
                                            <CardTitle className="text-zinc-700">CDAP for Construction Digital Transformation</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid md:grid-cols-3 gap-4 mb-4">
                                            <div className="flex items-center">
                                                <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                                                <span><strong>Up to $15K Grant</strong></span>
                                            </div>
                                            <div className="flex items-center">
                                                <Wrench className="w-5 h-5 text-blue-600 mr-2" />
                                                <span><strong>$2,400 Microgrant</strong></span>
                                            </div>
                                            <div className="flex items-center">
                                                <Target className="w-5 h-5 text-purple-600 mr-2" />
                                                <span><strong>$100K 0% Loan</strong></span>
                                            </div>
                                        </div>
                                        <p className="text-gray-700 mb-4">
                                            The Canada Digital Adoption Program supports construction firms adopting digital technologies. Contractors
                                            access funding for BIM software, project management platforms, estimating tools, drone technology, and
                                            comprehensive digital transformation initiatives that improve efficiency and competitiveness.
                                        </p>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <h5 className="font-semibold mb-2">Construction Technology Investments:</h5>
                                                <ul className="text-sm text-gray-600 space-y-1">
                                                    <li>• Building Information Modeling (BIM) software</li>
                                                    <li>• Project management platforms (Procore, Buildertrend)</li>
                                                    <li>• Estimating and bidding software</li>
                                                    <li>• Drone technology and aerial surveying</li>
                                                    <li>• Construction ERP and accounting systems</li>
                                                    <li>• Mobile workforce management apps</li>
                                                    <li>• Safety monitoring and IoT sensors</li>
                                                    <li>• Customer relationship and marketing platforms</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <h5 className="font-semibold mb-2">CDAP for Construction:</h5>
                                                <ul className="text-sm text-gray-600 space-y-1">
                                                    <li>• $15,000 for comprehensive digital strategy</li>
                                                    <li>• $2,400 microgrant for immediate tool adoption</li>
                                                    <li>• 0% interest BDC loan up to $100,000</li>
                                                    <li>• Digital advisor strategy development</li>
                                                    <li>• Technology implementation support</li>
                                                    <li>• Cybersecurity and data protection</li>
                                                    <li>• Integration with existing systems</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="border-stone-200">
                                    <CardHeader>
                                        <div className="flex items-center mb-2">
                                            <Truck className="w-6 h-6 text-stone-600 mr-3" />
                                            <CardTitle className="text-stone-700">Regional Development Agency Infrastructure & Expansion</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid md:grid-cols-3 gap-4 mb-4">
                                            <div className="flex items-center">
                                                <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                                                <span><strong>$100K-$5M Grants</strong></span>
                                            </div>
                                            <div className="flex items-center">
                                                <Building2 className="w-5 h-5 text-blue-600 mr-2" />
                                                <span><strong>Infrastructure Focus</strong></span>
                                            </div>
                                            <div className="flex items-center">
                                                <Target className="w-5 h-5 text-purple-600 mr-2" />
                                                <span><strong>All Regions</strong></span>
                                            </div>
                                        </div>
                                        <p className="text-gray-700 mb-4">
                                            Regional Development Agencies fund construction business expansion, equipment modernization, and capacity
                                            building. Civil contractors, infrastructure firms, and specialty trades access grants for expanding into
                                            new markets, upgrading equipment, and positioning for major infrastructure projects.
                                        </p>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <h5 className="font-semibold mb-2">Funded Construction Projects:</h5>
                                                <ul className="text-sm text-gray-600 space-y-1">
                                                    <li>• Heavy equipment purchases and upgrades</li>
                                                    <li>• Facility expansion and modernization</li>
                                                    <li>• Specialized equipment for infrastructure work</li>
                                                    <li>• Technology adoption and digital tools</li>
                                                    <li>• Market expansion and business development</li>
                                                    <li>• Green building capacity development</li>
                                                    <li>• Export market entry for construction products</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <h5 className="font-semibold mb-2">Regional Opportunities:</h5>
                                                <ul className="text-sm text-gray-600 space-y-1">
                                                    <li>• <strong>FedDev Ontario:</strong> Infrastructure readiness</li>
                                                    <li>• <strong>FedNor:</strong> Northern construction capacity</li>
                                                    <li>• <strong>PacifiCan:</strong> BC infrastructure and green building</li>
                                                    <li>• <strong>PrairiesCan:</strong> Prairie infrastructure contractors</li>
                                                    <li>• <strong>ACOA:</strong> Atlantic infrastructure projects</li>
                                                    <li>• <strong>CED Quebec:</strong> Infrastructure francophone support</li>
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
                            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">What Provincial Construction Programs Exist?</h2>

                            <div className="space-y-6">
                                <Card className="border-l-4 border-slate-500">
                                    <CardContent className="pt-6">
                                        <h4 className="font-bold text-lg mb-3 text-slate-800">🏛️ Ontario Construction & Green Building Support</h4>
                                        <p className="text-gray-700 mb-3">
                                            Ontario offers comprehensive construction sector support through apprenticeship programs, green building
                                            incentives, and business modernization grants across the province.
                                        </p>
                                        <ul className="text-sm text-gray-600 space-y-1">
                                            <li>• <strong>Ontario Apprenticeship Training Tax Credit:</strong> Up to $40K per apprentice</li>
                                            <li>• <strong>Skills Development Fund:</strong> Construction workforce training</li>
                                            <li>• <strong>Green Commercial Building Program:</strong> Retrofits and new construction</li>
                                            <li>• <strong>Ontario Business Programs:</strong> Construction business development</li>
                                            <li>• <strong>Innovation Vouchers:</strong> Construction technology adoption</li>
                                            <li>• <strong>Regional Programs:</strong> Municipal construction incentives</li>
                                        </ul>
                                    </CardContent>
                                </Card>

                                <Card className="border-l-4 border-gray-500">
                                    <CardContent className="pt-6">
                                        <h4 className="font-bold text-lg mb-3 text-gray-800">🌲 BC Construction & Sustainable Building</h4>
                                        <p className="text-gray-700 mb-3">
                                            British Columbia prioritizes green construction and sustainable building practices with comprehensive
                                            provincial incentives and Industry Training Authority (ITA) apprenticeship support.
                                        </p>
                                        <ul className="text-sm text-gray-600 space-y-1">
                                            <li>• <strong>ITA Apprenticeship Programs:</strong> Comprehensive trades training</li>
                                            <li>• <strong>CleanBC Building Innovation Fund:</strong> Net-zero construction</li>
                                            <li>• <strong>Energy Step Code Incentives:</strong> High-efficiency building</li>
                                            <li>• <strong>Small Business BC Support:</strong> Construction business advisory</li>
                                            <li>• <strong>Indigenous Construction Partnerships:</strong> Aboriginal contractor support</li>
                                            <li>• <strong>Community Benefits Agreements:</strong> Workforce development funding</li>
                                        </ul>
                                    </CardContent>
                                </Card>

                                <Card className="border-l-4 border-zinc-500">
                                    <CardContent className="pt-6">
                                        <h4 className="font-bold text-lg mb-3 text-zinc-800">🌾 Prairie Construction & Infrastructure Support</h4>
                                        <p className="text-gray-700 mb-3">
                                            Alberta, Saskatchewan, and Manitoba offer construction sector support through apprenticeship programs,
                                            infrastructure partnerships, and rural construction business development.
                                        </p>
                                        <ul className="text-sm text-gray-600 space-y-1">
                                            <li>• <strong>Alberta Apprenticeship Programs:</strong> Comprehensive trades support</li>
                                            <li>• <strong>Saskatchewan Apprenticeship Commission:</strong> Training and grants</li>
                                            <li>• <strong>Manitoba Apprenticeship:</strong> Red Seal trades development</li>
                                            <li>• <strong>Infrastructure Partnership Opportunities:</strong> Provincial projects</li>
                                            <li>• <strong>Rural Construction Support:</strong> Community Futures funding</li>
                                            <li>• <strong>Indigenous Construction Training:</strong> Aboriginal skills development</li>
                                        </ul>
                                    </CardContent>
                                </Card>

                                <Card className="border-l-4 border-stone-500">
                                    <CardContent className="pt-6">
                                        <h4 className="font-bold text-lg mb-3 text-stone-800">🍁 Quebec & Atlantic Construction Excellence</h4>
                                        <p className="text-gray-700 mb-3">
                                            Quebec and Atlantic provinces maintain mature construction sector support through comprehensive
                                            apprenticeship systems, infrastructure programs, and business development grants.
                                        </p>
                                        <ul className="text-sm text-gray-600 space-y-1">
                                            <li>• <strong>CCQ Quebec:</strong> Construction industry regulatory support</li>
                                            <li>• <strong>Emploi-Québec:</strong> Skilled trades training and placement</li>
                                            <li>• <strong>Atlantic Apprenticeship Programs:</strong> Regional trades development</li>
                                            <li>• <strong>Nova Scotia Skilled Trades:</strong> Construction workforce building</li>
                                            <li>• <strong>New Brunswick Construction:</strong> Infrastructure contractor support</li>
                                            <li>• <strong>PEI & NL Programs:</strong> Regional construction business growth</li>
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
                            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">How to Access Construction Business Grants in Canada</h2>

                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <span className="bg-slate-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">1</span>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 text-lg">Start with Apprenticeship Funding - Immediate Value</h4>
                                        <p className="text-gray-600">If hiring apprentices, secure $5K federal grants plus provincial wage subsidies and tax credits immediately. This funds workforce development while accessing capital grants for technology and equipment.</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <span className="bg-slate-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">2</span>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 text-lg">Apply for CDAP Digital Adoption</h4>
                                        <p className="text-gray-600">Construction firms benefit significantly from digital tools. Apply for $2,400 microgrant or $15K comprehensive grant to fund BIM, project management software, estimating platforms, and mobile workforce tools.</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <span className="bg-slate-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">3</span>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 text-lg">Explore IRAP for Construction Innovation</h4>
                                        <p className="text-gray-600">If developing new construction technology, sustainable materials, or innovative processes, contact NRC IRAP for up to $1M in R&D funding. Particularly strong for green building and automation innovation.</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <span className="bg-slate-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">4</span>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 text-lg">Contact Regional Development Agency</h4>
                                        <p className="text-gray-600">For equipment purchases, facility expansion, or business modernization, engage your Regional Agency. Infrastructure contractors and civil construction firms are priority candidates for substantial expansion grants.</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <span className="bg-slate-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">5</span>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 text-lg">Position for Green Building Transition</h4>
                                        <p className="text-gray-600">Emphasize sustainability in all applications. Green building, net-zero construction, and sustainable practices receive priority. Access federal and provincial environmental programs alongside construction grants.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What are Success Strategies for Construction Funding?</h2>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="font-bold text-lg mb-4 text-green-700">✅ Maximize Construction Grants:</h4>
                                    <ul className="space-y-3 text-gray-700">
                                        <li className="flex items-start">
                                            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                                            <span><strong>Innovation Positioning:</strong> Frame technology adoption and green building as innovation - access IRAP and premium funding streams</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                                            <span><strong>Workforce Development:</strong> Maximize apprenticeship funding while building skilled workforce - addresses industry priority</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                                            <span><strong>Green Building Leadership:</strong> Position firm as sustainability leader - access environmental programs and premium projects</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                                            <span><strong>Infrastructure Readiness:</strong> Demonstrate capacity for public infrastructure - unlock Regional Agency and Infrastructure Canada funding</span>
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="font-bold text-lg mb-4 text-red-700">❌ Common Construction Funding Mistakes:</h4>
                                    <ul className="space-y-3 text-gray-700">
                                        <li className="flex items-start">
                                            <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                                            <span><strong>Equipment-Only Focus:</strong> Requesting only equipment without demonstrating business strategy and market opportunity</span>
                                        </li>
                                        <li className="flex items-start">
                                            <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                                            <span><strong>Ignoring Apprenticeships:</strong> Not leveraging substantial workforce development funding - missing low-hanging fruit</span>
                                        </li>
                                        <li className="flex items-start">
                                            <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                                            <span><strong>Technology Resistance:</strong> Not adopting digital tools - limiting competitiveness and missing CDAP opportunities</span>
                                        </li>
                                        <li className="flex items-start">
                                            <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                                            <span><strong>Generic Positioning:</strong> Not differentiating through innovation, sustainability, or specialized expertise</span>
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
                            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Official Construction Program Resources</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <a href="https://nrc.canada.ca/en/support-technology-innovation/industrial-research-assistance-program" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200">
                                    <ExternalLink className="w-6 h-6 text-slate-600 mr-3 flex-shrink-0" />
                                    <div>
                                        <div className="font-semibold text-gray-900">IRAP Construction Innovation</div>
                                        <div className="text-sm text-gray-600">Up to $1M R&D grants</div>
                                    </div>
                                </a>
                                <a href="https://www.canada.ca/en/employment-social-development/programs/apprenticeship.html" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200">
                                    <ExternalLink className="w-6 h-6 text-gray-600 mr-3 flex-shrink-0" />
                                    <div>
                                        <div className="font-semibold text-gray-900">Apprenticeship Programs</div>
                                        <div className="text-sm text-gray-600">$5K/apprentice + tax credits</div>
                                    </div>
                                </a>
                                <a href="https://innovation.ised-isde.canada.ca/s/?language=en_CA" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200">
                                    <ExternalLink className="w-6 h-6 text-zinc-600 mr-3 flex-shrink-0" />
                                    <div>
                                        <div className="font-semibold text-gray-900">CDAP for Construction</div>
                                        <div className="text-sm text-gray-600">$15K digital adoption grants</div>
                                    </div>
                                </a>
                                <a href="https://www.ic.gc.ca/eic/site/101.nsf/eng/home" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200">
                                    <ExternalLink className="w-6 h-6 text-stone-600 mr-3 flex-shrink-0" />
                                    <div>
                                        <div className="font-semibold text-gray-900">Regional Development Agencies</div>
                                        <div className="text-sm text-gray-600">Infrastructure expansion grants</div>
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
                            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">📚 Related Industry Funding Guides</h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                <Link href="/blog/manufacturing-business-grants-canada" className="block p-6 bg-slate-50 rounded-lg shadow hover:shadow-md transition border-l-4 border-slate-500">
                                    <h3 className="font-semibold text-gray-900 mb-2">Manufacturing Business Grants</h3>
                                    <p className="text-sm text-gray-600">Industrial innovation and automation funding</p>
                                </Link>
                                <Link href="/blog/canada-technology-adoption-grants-guide" className="block p-6 bg-gray-50 rounded-lg shadow hover:shadow-md transition border-l-4 border-gray-500">
                                    <h3 className="font-semibold text-gray-900 mb-2">Technology Adoption Grants</h3>
                                    <p className="text-sm text-gray-600">CDAP for construction digital transformation</p>
                                </Link>
                                <Link href="/blog/green-business-grants-canada-guide" className="block p-6 bg-zinc-50 rounded-lg shadow hover:shadow-md transition border-l-4 border-zinc-500">
                                    <h3 className="font-semibold text-gray-900 mb-2">Green Business Grants</h3>
                                    <p className="text-sm text-gray-600">Sustainable construction incentives</p>
                                </Link>
                            </div>
                            <div className="mt-6 grid md:grid-cols-2 gap-6">
                                <Link href="/blog/irap-canada-industrial-research-assistance-program-guide" className="block p-4 bg-gray-50 rounded-lg shadow hover:shadow-md transition">
                                    <h3 className="font-semibold text-gray-900">IRAP Innovation Grants →</h3>
                                    <p className="text-sm text-gray-600">Construction technology R&D funding</p>
                                </Link>
                                <Link href="/blog/regional-development-agencies-government-grants" className="block p-4 bg-gray-50 rounded-lg shadow hover:shadow-md transition">
                                    <h3 className="font-semibold text-gray-900">Regional Development Grants →</h3>
                                    <p className="text-sm text-gray-600">Infrastructure contractor expansion</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-20 bg-gradient-to-r from-slate-700 via-gray-700 to-zinc-800">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto text-center text-white">
                            <h2 className="text-3xl font-bold mb-6">
                                Ready to Access Construction Business Funding?
                            </h2>
                            <p className="text-xl text-slate-100 mb-8">
                                Get the complete construction funding guide with IRAP application templates and green building strategies,
                                or work with construction industry specialists who have secured $34M+ for Canadian contractors.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                <div className="bg-white/10 rounded-lg p-6 flex-1 max-w-md">
                                    <h4 className="font-semibold text-white mb-2">Free Construction Funding Guide</h4>
                                    <p className="text-slate-100 text-sm mb-4">
                                        Comprehensive guide to IRAP, apprenticeship programs, CDAP, Regional Agency grants,
                                        and green building incentives with step-by-step application support.
                                    </p>
                                    <Button size="lg" className="w-full bg-white text-slate-700 hover:bg-gray-100" asChild>
                                        <Link href="/guides/apply-construction-grants">
                                            <Download className="w-4 h-4 mr-2" />
                                            Get Free Guide
                                        </Link>
                                    </Button>
                                </div>

                                <div className="bg-yellow-500/20 border-2 border-yellow-400 rounded-lg p-6 flex-1 max-w-md">
                                    <h4 className="font-semibold text-white mb-2">Expert Construction Funding Support</h4>
                                    <p className="text-yellow-100 text-sm mb-4">
                                        Work with construction funding specialists experienced in IRAP, green building,
                                        infrastructure programs, and comprehensive contractor business development.
                                    </p>
                                    <Button size="lg" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                                        <Link href="/contact?service=construction-grants-expert-help">
                                            Get Expert Help
                                        </Link>
                                    </Button>
                                </div>
                            </div>

                            <p className="text-slate-200 text-sm mt-6">
                                84% IRAP success rate • Average $480K innovation grants • Green building expertise • National coverage
                            </p>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    )
}
