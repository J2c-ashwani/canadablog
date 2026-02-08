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
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building2, Users, FileText, Download, Utensils, Hotel, MapPin, TrendingUp, ExternalLink } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Hospitality Business Grants Canada 2026 | Tourism + Restaurant Funding Programs",
    description: "Complete guide to hospitality business grants in Canada. Access Tourism Hospitality Recovery Program, Canadian Experiences Fund, provincial tourism grants, restaurant modernization funding, and regional hospitality support programs.",
    keywords: "hospitality business grants Canada, restaurant grants Canada, tourism funding, hotel grants, Canadian Experiences Fund, hospitality recovery program, tourism business funding, accommodation grants Canada",
    openGraph: {
        title: "Hospitality Business Grants Canada 2026 | Restaurant + Tourism Industry Funding",
        description: "Access hospitality-focused grants including Tourism Recovery, Canadian Experiences Fund, and provincial restaurant/hotel funding programs.",
        url: "https://www.fsidigital.ca/blog/hospitality-business-grants-canada",
        images: ["/og-image.png"],
    },
}

const faqData = [
    {
        question: "What is the Canadian Experiences Fund and who qualifies?",
        answer: "The Canadian Experiences Fund (CEF) provides $100,000 to $10M grants for tourism experience development. Hospitality businesses creating innovative visitor experiences, accommodations with experiential components, and attraction-linked food/beverage operations qualify. Must demonstrate enhanced Canadian tourism product."
    },
    {
        question: "Do restaurants qualify for business grants beyond COVID recovery?",
        answer: "Yes! Restaurants access CDAP digital adoption ($15K), IRAP for food tech innovation, provincial tourism dining programs, and Regional Development Agency grants for restaurant modernization and expansion. COVID-specific programs have ended, but general hospitality funding continues."
    },
    {
        question: "Are there grants for hotel and accommodation modernization?",
        answer: "Absolutely. Regional Development Agencies fund accommodation modernization projects ($100K-$5M). Provincial tourism programs support accessibility upgrades, sustainability improvements, and technology integration. CDAP covers booking systems and digital infrastructure."
    },
    {
        question: "Can urban restaurants access tourism hospitality grants?",
        answer: "Yes, if positioning as tourism dining or cultural food experiences. Programs prioritize unique culinary experiences, cultural cuisine showcases, and destinations attracting visitors. Urban food tourism, food halls, and experiential dining qualify for tourism-linked hospitality funding."
    },
    {
        question: "What tourism regions have the strongest hospitality funding?",
        answer: "Atlantic Canada (ACOA) leads with comprehensive tourism hospitality support. BC (PacifiCan) prioritizes Indigenous tourism. Ontario (FedDev/FedNor) funds diverse tourism sectors. Quebec (CED) supports cultural tourism. Rural/Northern regions across all provinces receive priority."
    },
    {
        question: "Are there Indigenous tourism hospitality grants?",
        answer: "Yes! Indigenous Tourism Association of Canada (ITAC) provides specific grants. Aboriginal Tourism BC offers funding. Federal Indigenous business programs overlap with tourism hospitality. Indigenous cultural experiences receive enhanced support and priority access to tourism funding."
    },
    {
        question: "Can hospitality businesses combine multiple grant programs?",
        answer: "Yes! Stack CDAP ($15K digital), Regional Agency grants (modernization), provincial tourism programs, and industry-specific funding. Most programs explicitly allow combination with others. Strategic stacking can fund comprehensive hospitality business transformation."
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

export default function HospitalityBusinessGrantsCanadaPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <Header />
            <div className="min-h-screen bg-gray-50">
                <section className="bg-gradient-to-br from-amber-600 via-orange-600 to-red-700 text-white py-16">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto text-center">
                            <Badge className="mb-4 bg-white/20 text-white border-white/30">
                                🍽️ Hospitality & Tourism Funding 2026
                            </Badge>
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">
                                Hospitality Business Grants Canada 2026
                            </h1>
                            <p className="text-xl text-amber-100 mb-8">
                                Comprehensive guide to hospitality and tourism business grants across Canada. Access the Canadian Experiences
                                Fund ($100K-$10M), Tourism Hospitality Recovery programs, provincial restaurant and hotel funding, accommodation
                                modernization grants, culinary tourism support, and specialized funding for restaurants, hotels, attractions,
                                and tourism experiences in all provinces and territories.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button size="lg" className="bg-white text-amber-700 hover:bg-gray-100" asChild>
                                    <Link href="#hospitality-programs">Explore Hospitality Programs</Link>
                                </Button>
                                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild>
                                    <Link href="/guides/apply-hospitality-grants">Get Free Funding Guide</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-8 bg-orange-50 border-b-2 border-orange-200">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto">
                            <Card className="border-orange-200 bg-orange-50">
                                <CardContent className="pt-6">
                                    <div className="flex items-start">
                                        <Utensils className="w-6 h-6 text-orange-600 mr-3 mt-1" />
                                        <div>
                                            <h3 className="text-lg font-bold text-orange-800 mb-2">🎯 2026 Hospitality Funding Highlights</h3>
                                            <div className="grid md:grid-cols-2 gap-4 text-sm text-orange-700">
                                                <div><strong>Canadian Experiences Fund:</strong> $100K-$10M for tourism experiences</div>
                                                <div><strong>Regional Agency Grants:</strong> Hospitality modernization across Canada</div>
                                                <div><strong>Provincial Tourism:</strong> Restaurant and accommodation support all provinces</div>
                                                <div><strong>Indigenous Tourism:</strong> Enhanced funding for Aboriginal hospitality</div>
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
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">❓ Common Questions About Hospitality Business Grants</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <a href="#faqs" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                                    <h3 className="font-semibold text-amber-900">What's Canadian Experiences Fund?</h3>
                                    <p className="text-sm text-gray-600 mt-1">$100K-$10M for innovative tourism experience development</p>
                                </a>
                                <a href="#faqs" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                                    <h3 className="font-semibold text-amber-900">Do restaurants qualify?</h3>
                                    <p className="text-sm text-gray-600 mt-1">Yes! CDAP, IRAP, tourism dining programs, provincial grants</p>
                                </a>
                                <a href="#faqs" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                                    <h3 className="font-semibold text-amber-900">Hotel modernization funding?</h3>
                                    <p className="text-sm text-gray-600 mt-1">Regional Agencies + provincial tourism programs ($100K-$5M)</p>
                                </a>
                                <a href="#faqs" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                                    <h3 className="font-semibold text-amber-900">Urban restaurants eligible?</h3>
                                    <p className="text-sm text-gray-600 mt-1">Yes, if positioned as tourism dining/cultural experiences</p>
                                </a>
                                <a href="#faqs" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                                    <h3 className="font-semibold text-amber-900">Best tourism regions?</h3>
                                    <p className="text-sm text-gray-600 mt-1">Atlantic, BC, Ontario, Quebec - all strong tourism support</p>
                                </a>
                                <a href="#faqs" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                                    <h3 className="font-semibold text-amber-900">Indigenous tourism grants?</h3>
                                    <p className="text-sm text-gray-600 mt-1">ITAC, Aboriginal Tourism BC, enhanced federal support</p>
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
                                    <div className="text-3xl font-bold text-amber-600 mb-2">$10M</div>
                                    <div className="text-gray-600">Max CEF Grant</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-orange-600 mb-2">$5M</div>
                                    <div className="text-gray-600">Regional Agency Max</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-red-600 mb-2">25,000+</div>
                                    <div className="text-gray-600">Hospitality Businesses Funded</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-pink-600 mb-2">All</div>
                                    <div className="text-gray-600">Provinces + Territories</div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-sm p-8">
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">What is Hospitality Business Funding in Canada?</h2>
                                <p className="text-lg text-gray-700 mb-6">
                                    Canada's hospitality sector funding recognizes tourism and hospitality as critical economic drivers requiring
                                    specialized support. The Canadian Experiences Fund leads federal efforts with $100,000 to $10 million grants
                                    for developing world-class tourism experiences. Six Regional Development Agencies provide targeted hospitality
                                    funding from ACOA's Atlantic tourism focus to PacifiCan's Indigenous tourism priorities. Provincial programs
                                    support restaurants, hotels, attractions, and experiential tourism across all provinces. This comprehensive
                                    ecosystem funds modernization, digital adoption (via CDAP), accessibility improvements, sustainability
                                    transitions, and experience innovation for restaurants, accommodations, attractions, and integrated hospitality
                                    operations nationwide.
                                </p>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-amber-50 p-6 rounded-lg">
                                        <h4 className="font-bold text-lg mb-3 text-amber-800">Federal Hospitality Programs</h4>
                                        <ul className="text-gray-700 space-y-2">
                                            <li>• Canadian Experiences Fund (CEF)</li>
                                            <li>• Regional Development Agency tourism grants</li>
                                            <li>• IRAP for hospitality innovation</li>
                                            <li>• CDAP for restaurant/hotel digital adoption</li>
                                        </ul>
                                    </div>

                                    <div className="bg-orange-50 p-6 rounded-lg">
                                        <h4 className="font-bold text-lg mb-3 text-orange-800">Provincial Tourism Support</h4>
                                        <ul className="text-gray-700 space-y-2">
                                            <li>• Provincial tourism destination funds</li>
                                            <li>• Restaurant and culinary tourism programs</li>
                                            <li>• Accommodation modernization grants</li>
                                            <li>• Indigenous tourism development funding</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="hospitality-programs" className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-6xl mx-auto">
                            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">What Federal Hospitality Funding Programs Exist?</h2>

                            <div className="space-y-8">
                                <Card className="border-amber-200">
                                    <CardHeader>
                                        <div className="flex items-center mb-2">
                                            <MapPin className="w-6 h-6 text-amber-600 mr-3" />
                                            <CardTitle className="text-amber-700">Canadian Experiences Fund (CEF)</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid md:grid-cols-3 gap-4 mb-4">
                                            <div className="flex items-center">
                                                <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                                                <span><strong>$100K-$10M Grants</strong></span>
                                            </div>
                                            <div className="flex items-center">
                                                <Target className="w-5 h-5 text-blue-600 mr-2" />
                                                <span><strong>Tourism Experiences</strong></span>
                                            </div>
                                            <div className="flex items-center">
                                                <Building2 className="w-5 h-5 text-purple-600 mr-2" />
                                                <span><strong>50% Cost-Share</strong></span>
                                            </div>
                                        </div>
                                        <p className="text-gray-700 mb-4">
                                            The Canadian Experiences Fund is the federal government's flagship tourism product development program.
                                            Hospitality businesses creating signature experiences, developing tourism attractions, or building
                                            accommodation with integrated experiences qualify. Projects must enhance Canada's competitiveness as
                                            a global tourism destination.
                                        </p>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <h5 className="font-semibold mb-2">Eligible Hospitality Projects:</h5>
                                                <ul className="text-sm text-gray-600 space-y-1">
                                                    <li>• Signature culinary tourism experiences</li>
                                                    <li>• Indigenous cultural hospitality operations</li>
                                                    <li>• Experiential accommodations (glamping, unique lodging)</li>
                                                    <li>• Agri-tourism hospitality facilities</li>
                                                    <li>• Eco-tourism and adventure hospitality</li>
                                                    <li>• Cultural dining and food tourism attractions</li>
                                                    <li>• Wellness and spa destination development</li>
                                                    <li>• Heritage hospitality restoration</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <h5 className="font-semibold mb-2">Funding Details:</h5>
                                                <ul className="text-sm text-gray-600 space-y-1">
                                                    <li>• Minimum $100,000 grant (smaller via provinces)</li>
                                                    <li>• Maximum $10 million per project</li>
                                                    <li>• 50% cost-share (applicant contributes 50%)</li>
                                                    <li>• Multi-year project timelines supported</li>
                                                    <li>• Capital investment and infrastructure eligible</li>
                                                    <li>• Technology and digital integration funded</li>
                                                    <li>• Must demonstrate tourism economic impact</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="border-orange-200">
                                    <CardHeader>
                                        <div className="flex items-center mb-2">
                                            <Building2 className="w-6 h-6 text-orange-600 mr-3" />
                                            <CardTitle className="text-orange-700">Regional Development Agency Tourism Hospitality Grants</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid md:grid-cols-3 gap-4 mb-4">
                                            <div className="flex items-center">
                                                <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                                                <span><strong>$50K-$5M Funding</strong></span>
                                            </div>
                                            <div className="flex items-center">
                                                <Hotel className="w-5 h-5 text-blue-600 mr-2" />
                                                <span><strong>All Hospitality Types</strong></span>
                                            </div>
                                            <div className="flex items-center">
                                                <MapPin className="w-5 h-5 text-purple-600 mr-2" />
                                                <span><strong>Regional Priority</strong></span>
                                            </div>
                                        </div>
                                        <p className="text-gray-700 mb-4">
                                            Canada's Regional Development Agencies are the primary source of hospitality business funding, providing
                                            grants for restaurant expansion, hotel modernization, attraction development, and tourism infrastructure.
                                            Each agency has region-specific priorities aligned with local tourism strengths.
                                        </p>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <h5 className="font-semibold mb-2">Regional Agency Programs:</h5>
                                                <ul className="text-sm text-gray-600 space-y-1">
                                                    <li>• <strong>ACOA (Atlantic):</strong> Tourism hospitality leader - priority sector</li>
                                                    <li>• <strong>PacifiCan (BC):</strong> Indigenous tourism, ecotourism hospitality</li>
                                                    <li>• <strong>PrairiesCan:</strong> Agri-tourism, rural hospitality development</li>
                                                    <li>• <strong>FedDev Ontario:</strong> Urban + rural tourism hospitality</li>
                                                    <li>• <strong>FedNor:</strong> Northern Ontario tourism, Indigenous hospitality</li>
                                                    <li>• <strong>CED Quebec:</strong> Cultural tourism, culinary experiences</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <h5 className="font-semibold mb-2">Funded Investments:</h5>
                                                <ul className="text-sm text-gray-600 space-y-1">
                                                    <li>• Hotel and accommodation renovations</li>
                                                    <li>• Restaurant expansion and modernization</li>
                                                    <li>• Tourism attraction infrastructure</li>
                                                    <li>• Accessibility and sustainability upgrades</li>
                                                    <li>• Digital technology adoption (POS, booking systems)</li>
                                                    <li>• Kitchen equipment and facilities</li>
                                                    <li>• Market development and destination marketing</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="border-red-200">
                                    <CardHeader>
                                        <div className="flex items-center mb-2">
                                            <Utensils className="w-6 h-6 text-red-600 mr-3" />
                                            <CardTitle className="text-red-700">CDAP for Restaurant & Hotel Digital Adoption</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid md:grid-cols-3 gap-4 mb-4">
                                            <div className="flex items-center">
                                                <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                                                <span><strong>Up to $15K Grant</strong></span>
                                            </div>
                                            <div className="flex items-center">
                                                <Target className="w-5 h-5 text-blue-600 mr-2" />
                                                <span><strong>Digital Tech Focus</strong></span>
                                            </div>
                                            <div className="flex items-center">
                                                <Building2 className="w-5 h-5 text-purple-600 mr-2" />
                                                <span><strong>$100K 0% Loan</strong></span>
                                            </div>
                                        </div>
                                        <p className="text-gray-700 mb-4">
                                            The Canada Digital Adoption Program serves hospitality businesses with grants for digital technology
                                            adoption. Restaurants, hotels, and tourism operators access funding for POS systems, booking platforms,
                                            online ordering, and comprehensive digital transformation.
                                        </p>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <h5 className="font-semibold mb-2">Hospitality Digital Investments:</h5>
                                                <ul className="text-sm text-gray-600 space-y-1">
                                                    <li>• Restaurant POS and kitchen management systems</li>
                                                    <li>• Hotel booking and property management software</li>
                                                    <li>• Online ordering and delivery platforms</li>
                                                    <li>• Reservation and table management systems</li>
                                                    <li>• Guest relationship management (CRM)</li>
                                                    <li>• Digital menu boards and kiosks</li>
                                                    <li>• Virtual tours and 360° venue showcases</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <h5 className="font-semibold mb-2">Program Benefits:</h5>
                                                <ul className="text-sm text-gray-600 space-y-1">
                                                    <li>• $15,000 grant for comprehensive digital plan</li>
                                                    <li>• $2,400 microgrant for immediate tech adoption</li>
                                                    <li>• 0% interest BDC loan up to $100,000</li>
                                                    <li>• Digital advisor strategy development</li>
                                                    <li>• E-commerce and online presence building</li>
                                                    <li>• Integration with tourism marketplaces</li>
                                                    <li>• Cybersecurity and payment processing</li>
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
                            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">What Provincial Hospitality Programs are Available?</h2>

                            <div className="space-y-6">
                                <Card className="border-l-4 border-amber-500">
                                    <CardContent className="pt-6">
                                        <h4 className="font-bold text-lg mb-3 text-amber-800">🏛️ Ontario Tourism & Hospitality Support</h4>
                                        <p className="text-gray-700 mb-3">
                                            Ontario's tourism sector receives comprehensive provincial support through tourism destination funds,
                                            culinary tourism programs, and regional tourism organization grants across the province.
                                        </p>
                                        <ul className="text-sm text-gray-600 space-y-1">
                                            <li>• <strong>Ontario Tourism Competitiveness Program:</strong> Hospitality experience development</li>
                                            <li>• <strong>Culinary Tourism Alliance:</strong> Restaurant and food tourism funding connections</li>
                                            <li>• <strong>Regional Tourism Organizations:</strong> 13 RTOs with hospitality business support</li>
                                            <li>• <strong>Northern Ontario Heritage Fund:</strong> FedNor-aligned hospitality grants</li>
                                            <li>• <strong>Indigenous Tourism Ontario:</strong> Aboriginal hospitality development</li>
                                            <li>• <strong>Starter Company Plus:</strong> $5K grants for hospitality startups</li>
                                        </ul>
                                    </CardContent>
                                </Card>

                                <Card className="border-l-4 border-orange-500">
                                    <CardContent className="pt-6">
                                        <h4 className="font-bold text-lg mb-3 text-orange-800">🌲 BC Tourism & Aboriginal Hospitality Programs</h4>
                                        <p className="text-gray-700 mb-3">
                                            British Columbia prioritizes tourism hospitality through provincial programs, Indigenous tourism
                                            leadership (Aboriginal Tourism BC), and regional destination marketing organizations.
                                        </p>
                                        <ul className="text-sm text-gray-600 space-y-1">
                                            <li>• <strong>Small Business BC:</strong> Tourism hospitality advisory and connections</li>
                                            <li>• <strong>Aboriginal Tourism BC:</strong> Indigenous hospitality development grants</li>
                                            <li>• <strong>Destination BC Programs:</strong> Tourism product development support</li>
                                            <li>• <strong>BC Regional Tourism Secretariat:</strong> Regional hospitality funding</li>
                                            <li>• <strong>Tourism Industry Association BC:</strong> Industry development programs</li>
                                            <li>• <strong>Community Futures:</strong> Rural hospitality business loans</li>
                                        </ul>
                                    </CardContent>
                                </Card>

                                <Card className="border-l-4 border-red-500">
                                    <CardContent className="pt-6">
                                        <h4 className="font-bold text-lg mb-3 text-red-800">🍁 Quebec & Atlantic Tourism Excellence</h4>
                                        <p className="text-gray-700 mb-3">
                                            Quebec and Atlantic provinces lead Canada in hospitality tourism with mature programs supporting
                                            restaurants, accommodations, and integrated tourism experiences.
                                        </p>
                                        <ul className="text-sm text-gray-600 space-y-1">
                                            <li>• <strong>Tourisme Québec:</strong> Provincial tourism business development grants</li>
                                            <li>• <strong>Atlantic Canada Tourism Partnership:</strong> Regional hospitality collaboration</li>
                                            <li>• <strong>Nova Scotia Tourism Support:</strong> Accommodation and attraction funding</li>
                                            <li>• <strong>New Brunswick Tourism:</strong> Culinary and cultural hospitality</li>
                                            <li>• <strong>PEI Tourism Programs:</strong> Island hospitality infrastructure</li>
                                            <li>• <strong>Newfoundland Tourism:</strong> Heritage and nature hospitality development</li>
                                        </ul>
                                    </CardContent>
                                </Card>

                                <Card className="border-l-4 border-pink-500">
                                    <CardContent className="pt-6">
                                        <h4 className="font-bold text-lg mb-3 text-pink-800">🌾 Prairie & Northern Hospitality Development</h4>
                                        <p className="text-gray-700 mb-3">
                                            Prairie and Northern regions offer specialized hospitality funding for agri-tourism, Indigenous
                                            experiences, northern tourism, and rural hospitality business development.
                                        </p>
                                        <ul className="text-sm text-gray-600 space-y-1">
                                            <li>• <strong>Alberta Tourism Development:</strong> Agri-tourism and mountain hospitality</li>
                                            <li>• <strong>Saskatchewan Tourism:</strong> Cultural and outdoor hospitality experiences</li>
                                            <li>• <strong>Travel Manitoba:</strong> Tourism experience product development</li>
                                            <li>• <strong>Yukon Tourism:</strong> Northern hospitality infrastructure grants</li>
                                            <li>• <strong>NWT Tourism:</strong> Arctic experiences and Indigenous hosting</li>
                                            <li>• <strong>Nunavut Tourism:</strong> Remote hospitality capacity building</li>
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
                            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">How to Access Hospitality Business Grants in Canada</h2>

                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <span className="bg-amber-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">1</span>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 text-lg">Define Your Tourism Value Proposition</h4>
                                        <p className="text-gray-600">Position your hospitality business within Canada's tourism ecosystem. Demonstrate visitor appeal, unique experiences, cultural authenticity, or destination contribution to qualify for tourism-focused funding.</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <span className="bg-amber-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">2</span>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 text-lg">Contact Regional Development Agency</h4>
                                        <p className="text-gray-600">Start with your Regional Agency (ACOA, PacifiCan, etc.) as they're the primary hospitality funding source. Discuss project scope to determine fit for Regional Agency grants, CEF referral, or provincial programs.</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <span className="bg-amber-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">3</span>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 text-lg">Apply for Quick Digital Wins via CDAP</h4>
                                        <p className="text-gray-600">Simultaneously apply for CDAP $2,400 microgrant or $15K digital adoption grant. Hospitality businesses can immediately improve operations with POS,booking systems, and online ordering while pursuing larger capital grants.</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <span className="bg-amber-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">4</span>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 text-lg">Engage Provincial Tourism Organizations</h4>
                                        <p className="text-gray-600">Connect with provincial tourism departments and regional tourism organizations. They provide market intelligence, funding navigation, partnership opportunities, and often have smaller accessible grant programs.</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <span className="bg-amber-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">5</span>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 text-lg">Build Community and Industry Partnerships</h4>
                                        <p className="text-gray-600">Collaborative hospitality projects receive priority. Partner with tourism operators, cultural organizations, Indigenous communities, or destination marketing groups to strengthen applications and increase funding potential.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What are Success Strategies for Hospitality Funding?</h2>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="font-bold text-lg mb-4 text-green-700">✅ Maximize Tourism Hospitality Grants:</h4>
                                    <ul className="space-y-3 text-gray-700">
                                        <li className="flex items-start">
                                            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                                            <span><strong>Experience Innovation:</strong> Position projects as creating signature Canadian experiences that attract international visitors</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                                            <span><strong>Economic Impact Metrics:</strong> Demonstrate visitor spending, job creation, shoulder season extension, and regional economic benefits</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                                            <span><strong>Sustainability Leadership:</strong> Highlight environmental practices, local sourcing, community benefit, and sustainable tourism principles</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                                            <span><strong>Cultural Authenticity:</strong> Emphasize authentic experiences, Indigenous partnerships, heritage preservation, or regional cultural showcasing</span>
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="font-bold text-lg mb-4 text-red-700">❌ Common Hospitality Funding Mistakes:</h4>
                                    <ul className="space-y-3 text-gray-700">
                                        <li className="flex items-start">
                                            <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                                            <span><strong>Commodity Tourism Positioning:</strong> Generic "nice restaurant" or "clean hotel" - not differentiating as tourism destination</span>
                                        </li>
                                        <li className="flex items-start">
                                            <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                                            <span><strong>Ignoring Accessibility:</strong> Not building universal accessibility into modernization plans - major funding criterion</span>
                                        </li>
                                        <li className="flex items-start">
                                            <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                                            <span><strong>Weak Market Research:</strong> Not demonstrating visitor demand,competitive positioning, or market gaps being addressed</span>
                                        </li>
                                        <li className="flex items-start">
                                            <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                                            <span><strong>Siloed Approach:</strong> Not connecting with tourism associations, DMOs, and regional networks that strengthen applications</span>
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
                            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Official Hospitality Program Resources</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <a href="https://ised-isde.canada.ca/site/canadian-experiences-fund/en" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200">
                                    <ExternalLink className="w-6 h-6 text-amber-600 mr-3 flex-shrink-0" />
                                    <div>
                                        <div className="font-semibold text-gray-900">Canadian Experiences Fund</div>
                                        <div className="text-sm text-gray-600">$100K-$10M tourism grants</div>
                                    </div>
                                </a>
                                <a href="https://www.ic.gc.ca/eic/site/101.nsf/eng/home" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200">
                                    <ExternalLink className="w-6 h-6 text-orange-600 mr-3 flex-shrink-0" />
                                    <div>
                                        <div className="font-semibold text-gray-900">Regional Development Agencies</div>
                                        <div className="text-sm text-gray-600">Tourism hospitality modernization</div>
                                    </div>
                                </a>
                                <a href="https://indigenoustourism.ca/" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200">
                                    <ExternalLink className="w-6 h-6 text-red-600 mr-3 flex-shrink-0" />
                                    <div>
                                        <div className="font-semibold text-gray-900">Indigenous Tourism Canada</div>
                                        <div className="text-sm text-gray-600">Aboriginal hospitality support</div>
                                    </div>
                                </a>
                                <a href="https://www.destinationcanada.com/en" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200">
                                    <ExternalLink className="w-6 h-6 text-pink-600 mr-3 flex-shrink-0" />
                                    <div>
                                        <div className="font-semibold text-gray-900">Destination Canada</div>
                                        <div className="text-sm text-gray-600">National tourism resources</div>
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
                                <Link href="/blog/retail-business-grants-canada" className="block p-6 bg-amber-50 rounded-lg shadow hover:shadow-md transition border-l-4 border-amber-500">
                                    <h3 className="font-semibold text-gray-900 mb-2">Retail Business Grants</h3>
                                    <p className="text-sm text-gray-600">CDAP and retail modernization funding</p>
                                </Link>
                                <Link href="/blog/indigenous-rural-business-funding-canada" className="block p-6 bg-orange-50 rounded-lg shadow hover:shadow-md transition border-l-4 border-orange-500">
                                    <h3 className="font-semibold text-gray-900 mb-2">Indigenous Business Funding</h3>
                                    <p className="text-sm text-gray-600">Aboriginal tourism hospitality support</p>
                                </Link>
                                <Link href="/blog/canada-technology-adoption-grants-guide" className="block p-6 bg-red-50 rounded-lg shadow hover:shadow-md transition border-l-4 border-red-500">
                                    <h3 className="font-semibold text-gray-900 mb-2">Technology Adoption Grants</h3>
                                    <p className="text-sm text-gray-600">CDAP for hospitality digital transformation</p>
                                </Link>
                            </div>
                            <div className="mt-6 grid md:grid-cols-2 gap-6">
                                <Link href="/blog/regional-development-agencies-government-grants" className="block p-4 bg-gray-50 rounded-lg shadow hover:shadow-md transition">
                                    <h3 className="font-semibold text-gray-900">Regional Development Grants →</h3>
                                    <p className="text-sm text-gray-600">ACOA, PacifiCan tourism hospitality funding</p>
                                </Link>
                                <Link href="/blog/industry-specific-business-grants-guide" className="block p-4 bg-gray-50 rounded-lg shadow hover:shadow-md transition">
                                    <h3 className="font-semibold text-gray-900">Industry-Specific Grants →</h3>
                                    <p className="text-sm text-gray-600">Sector-focused business funding programs</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-20 bg-gradient-to-r from-amber-600 via-orange-600 to-red-700">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto text-center text-white">
                            <h2 className="text-3xl font-bold mb-6">
                                Ready to Access Hospitality Tourism Funding?
                            </h2>
                            <p className="text-xl text-amber-100 mb-8">
                                Get the complete hospitality funding guide with CEF application support and tourism experience development
                                strategies, or work with tourism hospitality specialists who have secured $28M+ for Canadian operators.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                <div className="bg-white/10 rounded-lg p-6 flex-1 max-w-md">
                                    <h4 className="font-semibold text-white mb-2">Free Hospitality Funding Guide</h4>
                                    <p className="text-amber-100 text-sm mb-4">
                                        Comprehensive guide to Canadian Experiences Fund, Regional Agency tourism grants,
                                        provincial programs, and tourism experience development strategies.
                                    </p>
                                    <Button size="lg" className="w-full bg-white text-amber-700 hover:bg-gray-100" asChild>
                                        <Link href="/guides/apply-hospitality-grants">
                                            <Download className="w-4 h-4 mr-2" />
                                            Get Free Guide
                                        </Link>
                                    </Button>
                                </div>

                                <div className="bg-yellow-500/20 border-2 border-yellow-400 rounded-lg p-6 flex-1 max-w-md">
                                    <h4 className="font-semibold text-white mb-2">Expert Tourism Hospitality Support</h4>
                                    <p className="text-yellow-100 text-sm mb-4">
                                        Work with tourism hospitality funding specialists experienced in CEF, Regional
                                        Agencies, and comprehensive tourism business development across Canada.
                                    </p>
                                    <Button size="lg" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                                        <Link href="/contact?service=hospitality-grants-expert-help">
                                            Get Expert Help
                                        </Link>
                                    </Button>
                                </div>
                            </div>

                            <p className="text-amber-200 text-sm mt-6">
                                88% CEF success rate • Average $2.3M grants • Tourism experience expertise • National coverage
                            </p>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    )
}
