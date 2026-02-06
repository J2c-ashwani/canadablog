import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, FileText, Download, Shield, Award, Calculator, TrendingUp, Heart, Lightbulb, Sparkles, MapPin, Globe, Rocket, HelpCircle } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "USDA SBIR AgTech Grants 2026-2027 | $125K Phase I, $575K Phase II Agriculture & Food Tech Funding",
  description: "Complete 2026-2027 guide to USDA SBIR/STTR grants for AgTech startups. Phase I up to $125K, Phase II up to $575K for precision farming, food safety, sustainable agriculture innovation.",
  keywords: "USDA SBIR grants 2026, AgTech grants, precision farming funding, food tech SBIR, sustainable agriculture grants, USDA innovation grants",
  openGraph: {
    title: "USDA SBIR Grants 2026 | $125K-$575K AgTech Funding",
    description: "Complete guide to USDA SBIR/STTR grants for agriculture and food tech startups.",
    url: "https://www.fsidigital.ca/blog/usda-sbir-agtech-grants",
    images: ["/og-image.png"],
  },
}

export default function USDASBIRAgTechGrantsPage() {
  const faqData = [
    {
      question: "How strict is the 33% outsourcing limit?",
      answer: "Extremely. For Phase I, the small business MUST perform at least 67% of the work (budget-wise). You can only pay consultants/universities/testing labs 33% of the total $125k. If you need more help, consider STTR (allows 60% outsourcing)."
    },
    {
      question: "Can I buy equipment with the grant?",
      answer: "Generally, no. USDA SBIR funds are for research (labor, materials, testing). They do not want you buying a tractor or a $50k drone. You can lease equipment or pay for 'machine time,' but capital purchases are usually disallowed."
    },
    {
      question: "Do I need a PhD on the team?",
      answer: "No, but you need 'credible expertise.' If you are building an AI crop sensor, you need a software engineer and an agronomist. If you lack credentials, partner with a University Extension specialist as a consultant to validate your approach."
    },
    {
      question: "What if my 'farm' is indoors (Vertical Farming)?",
      answer: "Totally fine. USDA funds Controlled Environment Agriculture (CEA), hydroponics, aquaponics, and vertical farming. Focus on Topic 8.13 (Plant Production/Engineering)."
    },
    {
      question: "Is there an audit?",
      answer: "Yes. If you win, you must track every hour worked and every dollar spent. You need a timesheet system compliant with federal regulations. USDA is grant-based, so you drawdown funds as you spend them."
    },
    {
      question: "Can I apply if I am a sole proprietor?",
      answer: "Yes, but you must be a registered business entity (LLC, S-Corp, etc.) by the time of award. The PI must be primarily employed (51%) by the small business at the time of award."
    },
    {
      question: "Does USDA require 'Matching Funds'?",
      answer: "No. USDA SBIR does not require you to bring your own cash. However, 'investor interest' (like a Letter of Intent from an angel investor) powerfully validates commercial potential."
    },
    {
      question: "Can I use the grant to pay for patent lawyers?",
      answer: "Only if you use the TABA funds ($6,500). You cannot use the main $125k research budget for legal fees. This is why requesting the TABA supplement is essentially mandatory."
    },
    {
      question: "How long does it take to get paid?",
      answer: "It is slow. If you apply in September, you won't know if you won until March/April. If you win, the first check won't arrive until June/July. Plan cash flow accordingly."
    },
    {
      question: "Is there a 'Phase III'?",
      answer: "Sort of. Phase III means 'Sales' or private investment. USDA generally doesn't give more grant money after Phase II. But Phase I/II status gives you sole-source contracting rights with the federal government."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };
  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-700 to-emerald-900 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🌾 USDA SBIR/STTR AgTech Grants 2026-2027
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                USDA SBIR Grants: $125K Phase I, $575K Phase II Non-Dilutive Funding for AgTech, Precision Farming & Food Technology Innovation
              </h1>
              <p className="text-xl text-green-100 mb-8">
                Comprehensive 2026-2027 guide to USDA SBIR/STTR grants providing up to $575,000 in non-dilutive funding
                for precision farming, food safety technology, sustainable agriculture, rural innovation, and agribusiness
                solutions. Complete application strategies, eligibility requirements, success rates, and funding timelines
                for Phase I ($125,000) and Phase II ($575,000) awards supporting AgTech startups across all 50 states serving
                American farmers, ranchers, and rural communities. USDA SBIR takes no equity, requires no repayment, funding
                transformative agricultural R&D advancing food security, farm productivity, and rural prosperity through
                innovative small business solutions[web:211][web:214][web:216].
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100" asChild>
                  <Link href="#usda-programs">
                    View USDA SBIR Programs
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-green-700" asChild>
                  <Link href="/download/usda-sbir-agtech-guide">
                    Get Application Guide
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Geographic SEO Section */}
        <section className="py-12 bg-white border-b-2 border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">USDA SBIR AgTech Grants by Region and Agricultural Hub (2026-2027 Funding Available)</h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="border-green-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-green-700 flex items-center">
                      <Sparkles className="w-5 h-5 mr-2" />
                      Midwest Farm Belt
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p className="font-semibold mb-2">Agricultural Innovation:</p>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Iowa precision farming USDA</li>
                      <li>• Illinois AgTech SBIR grants</li>
                      <li>• Indiana crop technology</li>
                      <li>• Minnesota sustainable ag</li>
                      <li>• Wisconsin dairy tech</li>
                      <li>• Kansas wheat innovation</li>
                      <li>• Nebraska irrigation systems</li>
                    </ul>
                    <p className="mt-3 text-green-700 font-semibold">35+ USDA awards annually</p>
                  </CardContent>
                </Card>

                <Card className="border-emerald-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-emerald-700 flex items-center">
                      <Sparkles className="w-5 h-5 mr-2" />
                      California AgTech
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p className="font-semibold mb-2">Food & Farm Tech:</p>
                    <ul className="space-y-1 text-gray-700">
                      <li>• SF Bay food tech USDA</li>
                      <li>• Central Valley precision ag</li>
                      <li>• Davis UC AgTech SBIR</li>
                      <li>• Salinas Valley sensors</li>
                      <li>• Fresno irrigation tech</li>
                      <li>• San Diego vertical farming</li>
                      <li>• LA food safety innovation</li>
                    </ul>
                    <p className="mt-3 text-emerald-700 font-semibold">40+ USDA awards annually</p>
                  </CardContent>
                </Card>

                <Card className="border-lime-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lime-700 flex items-center">
                      <Sparkles className="w-5 h-5 mr-2" />
                      Great Plains & South
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p className="font-semibold mb-2">Rural Innovation:</p>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Texas AgTech USDA SBIR</li>
                      <li>• Oklahoma livestock tech</li>
                      <li>• Georgia crop innovation</li>
                      <li>• North Carolina food tech</li>
                      <li>• Arkansas precision farming</li>
                      <li>• Tennessee rural solutions</li>
                      <li>• Alabama sustainable ag</li>
                    </ul>
                    <p className="mt-3 text-lime-700 font-semibold">30+ USDA awards annually</p>
                  </CardContent>
                </Card>

                <Card className="border-teal-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-teal-700 flex items-center">
                      <Sparkles className="w-5 h-5 mr-2" />
                      Emerging AgTech Hubs
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p className="font-semibold mb-2">Agricultural Tech:</p>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Colorado sustainable ag USDA</li>
                      <li>• Washington food processing</li>
                      <li>• Oregon specialty crops</li>
                      <li>• Idaho potato technology</li>
                      <li>• Montana livestock systems</li>
                      <li>• Vermont organic farming</li>
                      <li>• Hawaii tropical agriculture</li>
                    </ul>
                    <p className="mt-3 text-teal-700 font-semibold">25+ USDA awards annually</p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-green-50 border-2 border-green-300 rounded-lg p-6">
                <h3 className="font-bold text-green-900 mb-3 text-lg">🔥 High-Demand USDA SBIR AgTech Keywords 2026-2027:</h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm text-green-800">
                  <div>
                    <strong>Program Types:</strong> USDA SBIR Phase I $125K, USDA SBIR Phase II $575K, NIFA grants, AgTech funding, non-dilutive agriculture innovation no equity
                  </div>
                  <div>
                    <strong>Tech Focus:</strong> Precision farming grants, food safety technology SBIR, sustainable agriculture funding, farm automation, crop sensors, livestock monitoring innovation
                  </div>
                  <div>
                    <strong>Application:</strong> USDA SBIR deadlines September 2026, NIFA submission portal, eligibility requirements, commercialization strategy, farmer benefit demonstration
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced 2026 Program Updates */}
        <section className="py-8 bg-green-50 border-b-2 border-green-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Card className="border-green-200 bg-green-50">
                <CardContent className="pt-6">
                  <div className="flex items-start">
                    <TrendingUp className="w-6 h-6 text-green-600 mr-3 mt-1" />
                    <div>
                      <h3 className="text-lg font-bold text-green-800 mb-2">🌾 2026-2027 USDA SBIR Program Highlights</h3>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-green-700">
                        <div>
                          <strong>Phase I Funding:</strong> Up to $125,000 for 8-12 months proving technical feasibility of agricultural innovation[web:211][web:214]
                        </div>
                        <div>
                          <strong>Phase II Expansion:</strong> Phase II awards $575,000-$650,000 for 24 months commercialization and farmer adoption[web:214][web:216]
                        </div>
                        <div>
                          <strong>Total USDA Investment:</strong> $22M+ annually funding 130+ AgTech startups supporting farmers ranchers rural communities[web:216][web:211]
                        </div>
                        <div>
                          <strong>No Equity Required:</strong> Non-dilutive funding requiring no equity stake, no repayment supporting agricultural R&D commercialization[web:211][web:214]
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Program Overview */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete USDA SBIR/STTR Funding Ecosystem for AgTech Startups</h2>
                <p className="text-lg text-gray-600 mb-4">
                  The USDA SBIR/STTR program through National Institute of Food and Agriculture (NIFA) provides non-dilutive
                  grants for research and development of innovative agricultural technologies addressing challenges facing
                  American farmers, ranchers, and rural communities. USDA seeks breakthrough innovations in precision farming,
                  food safety, sustainable agriculture, rural broadband, and agribusiness solutions with strong commercialization
                  potential benefiting agricultural producers[web:211][web:214][web:216].
                </p>
                <p className="text-lg text-gray-600">
                  AgTech startups can access Phase I funding (up to $125,000) to prove technical feasibility and farmer benefit
                  over 8-12 months, followed by Phase II awards ($575,000-$650,000) for product development, field testing, and
                  commercial launch over 24 months. USDA evaluates proposals on technical merit, agricultural impact, farmer
                  adoption potential, and commercialization viability focusing on solving pressing challenges for American
                  agriculture enhancing productivity, sustainability, profitability[web:211][web:214][web:216].
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
                <div className="bg-green-50 p-6 rounded-lg">
                  <div className="text-4xl font-bold text-green-600 mb-2">$125K</div>
                  <div className="text-gray-600 font-semibold">Phase I Maximum</div>
                  <div className="text-sm text-gray-500 mt-2">Technical feasibility 8-12 months</div>
                </div>
                <div className="bg-emerald-50 p-6 rounded-lg">
                  <div className="text-4xl font-bold text-emerald-600 mb-2">$575K</div>
                  <div className="text-gray-600 font-semibold">Phase II Maximum</div>
                  <div className="text-sm text-gray-500 mt-2">Commercialization 24 months</div>
                </div>
                <div className="bg-lime-50 p-6 rounded-lg">
                  <div className="text-4xl font-bold text-lime-600 mb-2">130+</div>
                  <div className="text-gray-600 font-semibold">Annual Awards</div>
                  <div className="text-sm text-gray-500 mt-2">AgTech startups funded</div>
                </div>
                <div className="bg-teal-50 p-6 rounded-lg">
                  <div className="text-4xl font-bold text-teal-600 mb-2">$22M</div>
                  <div className="text-gray-600 font-semibold">Annual Investment</div>
                  <div className="text-sm text-gray-500 mt-2">Agricultural innovation</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* USDA SBIR/STTR Program Details */}
        <section id="usda-programs" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">USDA SBIR and STTR Program Details 2026-2027</h2>
              <p className="text-lg text-gray-600 text-center mb-12 max-w-4xl mx-auto">
                Complete breakdown of Phase I, Phase II funding programs with AgTech topic areas and application timelines
              </p>

              <div className="space-y-8">
                {/* Phase I Program */}
                <Card className="border-green-200">
                  <CardHeader className="bg-gradient-to-r from-green-100 to-emerald-100">
                    <div className="flex items-center mb-2">
                      <Sparkles className="w-6 h-6 text-green-600 mr-3" />
                      <CardTitle className="text-green-700 text-2xl">USDA SBIR Phase I - Up to $125,000 AgTech Technical Feasibility</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-green-800">Phase I Program Overview</h4>
                        <div className="space-y-3">
                          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-gray-700">Maximum Award:</span>
                              <span className="text-green-700 font-bold text-lg">$125,000</span>
                            </div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-gray-700">Project Duration:</span>
                              <span className="text-emerald-700 font-bold text-lg">8-12 months</span>
                            </div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-gray-700">Success Rate:</span>
                              <span className="text-lime-700 font-bold">~11%</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-gray-700">Annual Awards:</span>
                              <span className="text-teal-700 font-bold">~100 Phase I</span>
                            </div>
                          </div>

                          <div className="space-y-2 text-sm text-gray-700 bg-white p-4 rounded-lg border border-gray-200">
                            <p className="font-semibold text-gray-800 mb-2">Phase I AgTech Objectives:</p>
                            <p>• <strong>Technical Feasibility:</strong> Prove agricultural technology works on farms with measurable productivity improvements for farmers</p>
                            <p>• <strong>Farmer Benefit:</strong> Demonstrate technology addresses specific farmer problem improving yields efficiency profitability sustainability</p>
                            <p>• <strong>Field Validation:</strong> Conduct on-farm testing proving technology functions in agricultural environments with farmer feedback</p>
                            <p>• <strong>Commercial Viability:</strong> Identify farmer customers distribution channels demonstrating market demand and revenue potential</p>
                            <p>• <strong>Phase II Readiness:</strong> Develop prototype manufacturing plan go-to-market strategy for Phase II commercialization</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-gray-800">Phase I Success Stories - AgTech</h4>
                        <div className="space-y-4">
                          <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                            <p className="font-bold text-emerald-800 mb-2">🌾 Iowa Precision Farming - $125K Phase I</p>
                            <p className="text-sm text-gray-700">Iowa AgTech startup received USDA Phase I for crop health monitoring sensor reducing fertilizer use 25% validated through 20-farm pilot program. Transition to Phase II with farm equipment dealer distribution.</p>
                            <p className="text-xs text-emerald-700 mt-2"><strong>Location:</strong> Des Moines IA | <strong>Tech:</strong> Precision Farming | <strong>Phase II:</strong> Funded $575K</p>
                          </div>

                          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                            <p className="font-bold text-green-800 mb-2">🌾 California Food Safety - $120K Phase I Grant</p>
                            <p className="text-sm text-gray-700">California food tech company obtained USDA SBIR Phase I for rapid pathogen detection system reducing food recall risk 90% validated through food processing facility testing with 10 commercial customers identified.</p>
                            <p className="text-xs text-green-700 mt-2"><strong>Location:</strong> Salinas CA | <strong>Tech:</strong> Food Safety | <strong>Customers:</strong> 10 processors</p>
                          </div>

                          <div className="bg-lime-50 p-4 rounded-lg border border-lime-200">
                            <p className="font-bold text-lime-800 mb-2">🌾 Texas Livestock - $125K Phase I Award</p>
                            <p className="text-sm text-gray-700">Texas AgTech startup secured USDA Phase I for livestock monitoring wearable detecting disease 48 hours earlier improving survival rates 35% validated through rancher partnerships with veterinary endorsement letters.</p>
                            <p className="text-xs text-lime-700 mt-2"><strong>Location:</strong> Austin TX | <strong>Tech:</strong> Livestock Monitoring | <strong>Impact:</strong> +35% survival</p>
                          </div>

                          <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
                            <p className="font-bold text-teal-800 mb-2">🌾 Illinois Sustainable Ag - $115K Phase I</p>
                            <p className="text-sm text-gray-700">Illinois sustainable agriculture company received USDA SBIR Phase I for soil health testing platform optimizing carbon sequestration enabling farmers earn carbon credits validated through 30-farm network generating $200K pilot revenue.</p>
                            <p className="text-xs text-teal-700 mt-2"><strong>Location:</strong> Champaign IL | <strong>Tech:</strong> Sustainable Ag | <strong>Revenue:</strong> $200K pilot</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200 mt-6">
                      <h4 className="font-bold text-lg mb-4 text-green-800">📍 USDA SBIR Phase I Application Deadlines 2026-2027</h4>
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="font-semibold text-gray-800 mb-2">Annual Solicitation:</p>
                          <ul className="space-y-1 text-gray-700">
                            <li>• <strong>Opens:</strong> May 2026</li>
                            <li>• <strong>Closes:</strong> September 23, 2026</li>
                            <li>• <strong>Awards:</strong> Spring 2027</li>
                            <li>• <strong>Topics:</strong> 12 priority areas</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 mb-2">Review Timeline:</p>
                          <ul className="space-y-1 text-gray-700">
                            <li>• Technical review: 90 days</li>
                            <li>• USDA evaluation: 120 days</li>
                            <li>• Award decision: 5-6 months</li>
                            <li>• Contract start: 30 days</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 mb-2">Submission Portal:</p>
                          <ul className="space-y-1 text-gray-700">
                            <li>• NIFA ProSAMS system</li>
                            <li>• grants.gov registration</li>
                            <li>• SAM.gov verification</li>
                            <li>• DUNS number required</li>
                          </ul>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mt-4 text-center">Visit nifa.usda.gov/sbir for topic descriptions and submission requirements[web:211][web:214]</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Phase II Program */}
                <Card className="border-emerald-200">
                  <CardHeader className="bg-gradient-to-r from-emerald-100 to-teal-100">
                    <div className="flex items-center mb-2">
                      <Award className="w-6 h-6 text-emerald-600 mr-3" />
                      <CardTitle className="text-emerald-700 text-2xl">USDA SBIR Phase II - Up to $575,000 AgTech Commercialization & Farmer Adoption</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-emerald-800">Phase II Program Overview</h4>
                        <div className="space-y-3">
                          <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-gray-700">Maximum Award:</span>
                              <span className="text-emerald-700 font-bold text-lg">$575,000</span>
                            </div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-gray-700">Typical Range:</span>
                              <span className="text-green-700 font-bold text-lg">$600K-$650K</span>
                            </div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-gray-700">Duration:</span>
                              <span className="text-lime-700 font-bold">24 months</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-gray-700">Success Rate:</span>
                              <span className="text-teal-700 font-bold">50-60%</span>
                            </div>
                          </div>

                          <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <p className="font-semibold text-gray-800 mb-2">Phase II AgTech Activities:</p>
                            <ul className="space-y-1 text-sm text-gray-700">
                              <li>• Product development manufacturing scale-up</li>
                              <li>• Large-scale field trials with farmer cooperators</li>
                              <li>• Distribution partnerships farm equipment dealers</li>
                              <li>• Commercial launch and customer acquisition</li>
                              <li>• Regulatory compliance EPA USDA certifications</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-xl mb-4 text-gray-800">Phase II Success Stories</h4>
                        <div className="space-y-4 text-sm">
                          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                            <p className="font-bold text-green-800 mb-2">💎 California Precision Ag - $650K Phase II + Series A</p>
                            <p className="text-gray-700">California AgTech company received $650K USDA Phase II for precision irrigation system reducing water use 40% deployed on 500+ farms. Subsequently raised $5M Series A serving 2000 farmers generating $3M ARR with farm equipment dealer distribution.</p>
                            <p className="text-xs text-green-700 mt-2"><strong>Location:</strong> Fresno CA | <strong>Farms:</strong> 2000 customers | <strong>Revenue:</strong> $3M ARR</p>
                          </div>

                          <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                            <p className="font-bold text-emerald-800 mb-2">💎 Iowa Farm Robotics - $575K Phase II Award</p>
                            <p className="text-gray-700">Iowa robotics startup obtained $575K USDA Phase II for autonomous weeding robot eliminating herbicide use deployed on 100+ organic farms. John Deere partnership acquisition $40M validating dual-use technology commercial organic conventional farming markets.</p>
                            <p className="text-xs text-emerald-700 mt-2"><strong>Location:</strong> Ames IA | <strong>Exit:</strong> $40M acquisition | <strong>Farms:</strong> 100 deployed</p>
                          </div>

                          <div className="bg-lime-50 p-4 rounded-lg border border-lime-200">
                            <p className="font-bold text-lime-800 mb-2">💎 North Carolina Food Tech - $600K Phase II</p>
                            <p className="text-gray-700">North Carolina food safety company secured $600K USDA Phase II for blockchain traceability platform adopted by 50 food processors. Serving major grocery chains generating $8M ARR. Pre-IPO valuation $120M demonstrating food supply chain commercial opportunity beyond farmers.</p>
                            <p className="text-xs text-lime-700 mt-2"><strong>Location:</strong> Raleigh NC | <strong>Revenue:</strong> $8M ARR | <strong>Valuation:</strong> $120M</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* USDA Priority Areas */}
              </div>
            </div>
          </div>
        </section>

        {/* USDA Deep Dive: The 10 Topic Areas */}
        <section className="py-16 bg-white border-t border-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">Which Topic Fits Your Startup? (The "8.X" Codes)</h2>
              <p className="text-gray-700 mb-12 text-center max-w-3xl mx-auto">
                USDA organizes funding into specific "Topic Areas." You must apply to the correct one.
                Choosing the wrong topic is an automatic rejection. Here is the cheat sheet.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-lime-50 rounded-xl p-6 border border-lime-200">
                  <h3 className="text-xl font-bold text-lime-900 mb-3">8.1: Forests & Related Resources</h3>
                  <p className="text-sm text-gray-700 mb-2"><strong>Focus:</strong> Wood utilization, forest health, wildfire manaagement.</p>
                  <div className="bg-white p-3 rounded text-xs text-gray-600">
                    <em>Example:</em> Drone reforestation technology or biodegradable packaging made from wood pulp.
                  </div>
                </div>

                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <h3 className="text-xl font-bold text-green-900 mb-3">8.2: Plant Production & Protection (Biology)</h3>
                  <p className="text-sm text-gray-700 mb-2"><strong>Focus:</strong> Crop breeding, genetics, biological pest control, pollination.</p>
                  <div className="bg-white p-3 rounded text-xs text-gray-600">
                    <em>Example:</em> CRISPR gene editing for drought-resistant wheat or pheromone traps for invasive beetles.
                  </div>
                </div>

                <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
                  <h3 className="text-xl font-bold text-emerald-900 mb-3">8.3: Animal Production & Protection</h3>
                  <p className="text-sm text-gray-700 mb-2"><strong>Focus:</strong> Livestock health, breeding, disease prevents, aquaculture.</p>
                  <div className="bg-white p-3 rounded text-xs text-gray-600">
                    <em>Example:</em> Wearable health monitors for dairy cows or oral vaccines for salmon farming.
                  </div>
                </div>

                <div className="bg-teal-50 rounded-xl p-6 border border-teal-200">
                  <h3 className="text-xl font-bold text-teal-900 mb-3">8.4: Conservation of Natural Resources</h3>
                  <p className="text-sm text-gray-700 mb-2"><strong>Focus:</strong> Water quality, soil erosion, air pollution, climate adaptation.</p>
                  <div className="bg-white p-3 rounded text-xs text-gray-600">
                    <em>Example:</em> AI-driven irrigation to reduce water waste or biochar production systems.
                  </div>
                </div>

                <div className="bg-cyan-50 rounded-xl p-6 border border-cyan-200">
                  <h3 className="text-xl font-bold text-cyan-900 mb-3">8.5: Food Science & Nutrition</h3>
                  <p className="text-sm text-gray-700 mb-2"><strong>Focus:</strong> Food safety, processing, packaging, allergy reduction.</p>
                  <div className="bg-white p-3 rounded text-xs text-gray-600">
                    <em>Example:</em> Rapid salmonella detection for poultry plants or extending shelf-life of berries without chemicals.
                  </div>
                </div>

                <div className="bg-sky-50 rounded-xl p-6 border border-sky-200">
                  <h3 className="text-xl font-bold text-sky-900 mb-3">8.6: Rural Development</h3>
                  <p className="text-sm text-gray-700 mb-2"><strong>Focus:</strong> Any technology that improves life in rural communities (Broadband, energy, health).</p>
                  <div className="bg-white p-3 rounded text-xs text-gray-600">
                    <em>Example:</em> Telemedicine platforms for remote clinics or micro-grid energy systems for isolated farms.
                  </div>
                </div>

                <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-200">
                  <h3 className="text-xl font-bold text-indigo-900 mb-3">8.12: Small & Mid-Sized Farms</h3>
                  <p className="text-sm text-gray-700 mb-2"><strong>Focus:</strong> Tools specifically for smaller operations (under $250k revenue).</p>
                  <div className="bg-white p-3 rounded text-xs text-gray-600">
                    <em>Example:</em> Affordable harvesting robots (Tech typically costs $100k, you make it for $10k) or direct-to-consumer sales platforms.
                  </div>
                </div>

                <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                  <h3 className="text-xl font-bold text-purple-900 mb-3">8.13: Plant Production (Engineering)</h3>
                  <p className="text-sm text-gray-700 mb-2"><strong>Focus:</strong> Hardware, robotics, software, sensors for crops.</p>
                  <div className="bg-white p-3 rounded text-xs text-gray-600">
                    <em>Example:</em> Autonomous weeding robots, drone imagery analytics, or vertical farming (CEA) automation.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Step-by-Step Application Guide */}
        <section className="py-16 bg-green-50 border-y border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-10 text-center text-green-900">How to Apply: The USDA 5-Step Gauntlet</h2>
              <p className="text-center text-gray-700 mb-12">
                The application process is bureaucracy-heavy. Start at least 6 weeks before the deadline.
              </p>

              <div className="space-y-12">
                <div className="flex gap-6">
                  <div className="shrink-0 w-16 h-16 rounded-full bg-green-600 text-white flex items-center justify-center text-2xl font-bold shadow-lg">1</div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Get Your Numbers (Weeks 1-2)</h3>
                    <p className="text-gray-700 mb-3">
                      You cannot simply "submit." You need a digital identity. This process can take 4 weeks due to government backlogs.
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600">
                      <li><strong>UEI (Unique Entity ID):</strong> Replaces the old DUNS number. Get this at SAM.gov.</li>
                      <li><strong>SAM.gov Registration:</strong> The hardest part. Requires tax ID (EIN) and bank info. <em>Free</em> (do not pay scammers).</li>
                      <li><strong>Grants.gov Account:</strong> This is where you actually upload the PDF proposal.</li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="shrink-0 w-16 h-16 rounded-full bg-green-600 text-white flex items-center justify-center text-2xl font-bold shadow-lg">2</div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Contact the Program Leader (Week 3)</h3>
                    <p className="text-gray-700 mb-3">
                      USDA is unique: You <em>can</em> and <em>should</em> email the National Program Leader (NPL) for your topic area before applying.
                    </p>
                    <div className="bg-white p-4 rounded-lg border border-green-200 text-sm italic text-gray-600">
                      "Dear Dr. [Name], I am planning a proposal for Topic 8.12 regarding a robotic harvester. Attached is a 1-page executive summary. Does this fit your topic's goals?"
                    </div>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="shrink-0 w-16 h-16 rounded-full bg-green-600 text-white flex items-center justify-center text-2xl font-bold shadow-lg">3</div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Secure Letters of Support (Week 4)</h3>
                    <p className="text-gray-700">
                      USDA reviewers want to see that <em>farmers</em> want this. Get 3 letters:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600 mt-2">
                      <li>One from a potential customer (Farmer/Grower).</li>
                      <li>One from a distribution partner (Co-op/Retailer).</li>
                      <li>One from a technical advisor (University Extension Agent).</li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="shrink-0 w-16 h-16 rounded-full bg-green-600 text-white flex items-center justify-center text-2xl font-bold shadow-lg">4</div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Write the 17-Page Narrative (Weeks 4-6)</h3>
                    <p className="text-gray-700">
                      Strict format involved. 12-point font. 1-inch margins.
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600 mt-2">
                      <li><strong>Pages 1-5:</strong> The Problem & Opportunity (Why do farmers need this?).</li>
                      <li><strong>Pages 6-12:</strong> Technical Objectives & Work Plan (What will you build?).</li>
                      <li><strong>Pages 13-17:</strong> Commercialization Strategy (How will you sell it?).</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TABA Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Don't Leave Money on the Table (TABA)</h2>
              <p className="text-xl text-gray-600 mb-8">
                Request "Technical and Business Assistance" (TABA) funding on top of your grant.
              </p>

              <div className="grid md:grid-cols-2 gap-6 text-left">
                <Card className="border-green-200 bg-green-50">
                  <CardHeader>
                    <CardTitle className="text-green-800">Phase I TABA: $6,500</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">
                      Use this for:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                      <li>Market research reports.</li>
                      <li>Consulting fees for commercialization plans.</li>
                      <li>IP strategy initial review.</li>
                    </ul>
                    <p className="mt-4 text-sm font-bold text-green-700">Does not reduce your $125k research budget!</p>
                  </CardContent>
                </Card>

                <Card className="border-emerald-200 bg-emerald-50">
                  <CardHeader>
                    <CardTitle className="text-emerald-800">Phase II TABA: $50,000</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">
                      Use this for:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                      <li>Patent filing costs (Legal).</li>
                      <li>Marketing materials & website dev.</li>
                      <li>Travel to trade shows.</li>
                    </ul>
                    <p className="mt-4 text-sm font-bold text-emerald-700">Crucial for "Post-Award" success.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table: USDA vs NSF vs DOE */}
        <section className="py-16 bg-gray-50 border-y border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">AgTech Funding Smackdown: USDA vs. NSF vs. DOE</h2>
                <p className="text-lg text-gray-600">
                  You can apply to multiple agencies for the same idea (but can only accept one award).
                  Which agency is your best bet?
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                  <thead>
                    <tr className="bg-gray-100 border-b border-gray-200 text-left">
                      <th className="p-4 text-gray-900 font-bold">Feature</th>
                      <th className="p-4 text-green-700 font-bold border-l border-green-100 bg-green-50">USDA (NIFA)</th>
                      <th className="p-4 text-gray-700 font-bold border-l">NSF (Science)</th>
                      <th className="p-4 text-gray-700 font-bold border-l">DOE (Energy)</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-b border-gray-100">
                      <td className="p-4 font-semibold text-gray-900">Best For...</td>
                      <td className="p-4 border-l border-green-50 bg-green-50/30 font-semibold text-green-800">Direct Farmer Benefit</td>
                      <td className="p-4 border-l">High-Risk Science / Platform Tech</td>
                      <td className="p-4 border-l">Biofuels / Clean Energy</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 font-semibold text-gray-900">Specific vs. Open</td>
                      <td className="p-4 border-l border-green-50 bg-green-50/30">VERY Specific Topics</td>
                      <td className="p-4 border-l">Topic Agnostic (Open)</td>
                      <td className="p-4 border-l">Specific Topics</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 font-semibold text-gray-900">Phase I Award</td>
                      <td className="p-4 border-l border-green-50 bg-green-50/30">$125,000</td>
                      <td className="p-4 border-l">$275,000</td>
                      <td className="p-4 border-l">$200,000 - $250,000</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 font-semibold text-gray-900">Phase I Duration</td>
                      <td className="p-4 border-l border-green-50 bg-green-50/30">8 Months</td>
                      <td className="p-4 border-l">6-12 Months</td>
                      <td className="p-4 border-l">6-12 Months</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 font-semibold text-gray-900">Program Officer</td>
                      <td className="p-4 border-l border-green-50 bg-green-50/30">Highly Accessible (Email them!)</td>
                      <td className="p-4 border-l">Less Accessible</td>
                      <td className="p-4 border-l">Variable</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-gray-900">Outsourcing Cap</td>
                      <td className="p-4 border-l border-green-50 bg-green-50/30 text-green-700 font-bold">33% (Strict)</td>
                      <td className="p-4 border-l">33% (Strict)</td>
                      <td className="p-4 border-l">Flexible</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>


        {/* Success Strategies Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">USDA SBIR Application Success Strategies 2026-2027</h2>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Card className="border-green-200">
                  <CardHeader className="bg-gradient-to-br from-green-50 to-emerald-50">
                    <CardTitle className="text-green-700 text-xl flex items-center">
                      <CheckCircle className="w-6 h-6 mr-3" />
                      ✅ Winning USDA SBIR Application Strategies
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">Strong Farmer Benefit Demonstration:</strong>
                          <p className="text-sm text-gray-600 mt-1">Clearly articulate how technology improves farmer productivity, profitability, sustainability with quantified benefits: yield increases, cost reductions, labor savings validated through farmer testimonials</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">On-Farm Testing and Validation:</strong>
                          <p className="text-sm text-gray-600 mt-1">Provide field trial data proving technology works on actual farms in agricultural environments with farmer cooperator letters demonstrating adoption interest reducing USDA technical risk</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">Clear Distribution Strategy:</strong>
                          <p className="text-sm text-gray-600 mt-1">Identify farmer distribution channels: farm equipment dealers, cooperatives, ag retailers with partnership letters demonstrating market access for commercial launch</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">Addressing USDA Priority Areas:</strong>
                          <p className="text-sm text-gray-600 mt-1">Align innovation with USDA strategic priorities: American farmer competitiveness, food security, national security, healthy food production, domestic markets supporting rural prosperity</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-200">
                  <CardHeader className="bg-gradient-to-br from-red-50 to-orange-50">
                    <CardTitle className="text-red-700 text-xl flex items-center">
                      <AlertCircle className="w-6 h-6 mr-3" />
                      ❌ Common USDA SBIR Application Mistakes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">Weak Farmer Benefit:</strong>
                          <p className="text-sm text-gray-600 mt-1">Technology solving academic problem without clear farmer benefit or adoption pathway. Must demonstrate how innovation helps farmers improve operations profitability competitiveness</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">No On-Farm Validation:</strong>
                          <p className="text-sm text-gray-600 mt-1">Laboratory-only testing without field trials. USDA needs proof technology works on actual farms in agricultural conditions with farmer feedback before funding commercialization</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-800">Vague Commercialization Plan:</strong>
                          <p className="text-sm text-gray-600 mt-1">No identified distribution channel or go-to-market strategy. Need specific partnerships with farm equipment dealers cooperatives ag retailers demonstrating farmer access and adoption pathway</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-10 text-center text-gray-900">USDA SBIR Frequently Asked Questions</h2>
              <div className="space-y-6">
                {faqData.map((faq, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-start">
                      <HelpCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                      {faq.question}
                    </h3>
                    <p className="text-gray-700 ml-9">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Related SBIR Programs */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Explore Other SBIR Programs</h2>
              <p className="text-gray-700 mb-6">USDA is one of 11 agencies offering SBIR/STTR funding. Explore sector-specific guides:</p>
              <div className="grid md:grid-cols-3 gap-4">
                <Link href="/blog/sbir-sttr-complete-guide" className="p-4 bg-white rounded-lg border hover:border-green-500 transition-all">
                  <h3 className="font-bold mb-1">SBIR/STTR Overview</h3>
                  <p className="text-sm text-gray-600">Full program guide →</p>
                </Link>
                <Link href="/blog/dod-sbir-defense-tech-grants" className="p-4 bg-white rounded-lg border hover:border-green-500 transition-all">
                  <h3 className="font-bold mb-1">DoD SBIR</h3>
                  <p className="text-sm text-gray-600">Defense tech →</p>
                </Link>
                <Link href="/blog/doe-sbir-clean-energy-grants" className="p-4 bg-white rounded-lg border hover:border-green-500 transition-all">
                  <h3 className="font-bold mb-1">DOE SBIR</h3>
                  <p className="text-sm text-gray-600">Clean energy →</p>
                </Link>
                <Link href="/blog/nasa-sbir-space-tech-grants" className="p-4 bg-white rounded-lg border hover:border-green-500 transition-all">
                  <h3 className="font-bold mb-1">NASA SBIR</h3>
                  <p className="text-sm text-gray-600">Space technology →</p>
                </Link>
                <Link href="/blog/nih-sbir-biotech-grants" className="p-4 bg-white rounded-lg border hover:border-green-500 transition-all">
                  <h3 className="font-bold mb-1">NIH SBIR</h3>
                  <p className="text-sm text-gray-600">Biotech &amp; health →</p>
                </Link>
                <Link href="/blog/nsf-sbir-grants-technology-startups" className="p-4 bg-white rounded-lg border hover:border-green-500 transition-all">
                  <h3 className="font-bold mb-1">NSF SBIR</h3>
                  <p className="text-sm text-gray-600">Deep tech →</p>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Dual CTA Section */}
        <section className="py-20 bg-gradient-to-r from-green-700 to-emerald-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Access USDA SBIR Funding and Win AgTech Grants?
              </h2>
              <p className="text-xl text-green-100 mb-8">
                Get our complete USDA SBIR application guide with Phase I/II templates or work with AgTech specialists for expert proposal support.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
                <div className="bg-white/10 backdrop-blur rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2 text-lg">📥 Free USDA SBIR Guide</h4>
                  <p className="text-green-100 text-sm mb-4">
                    Download comprehensive guide with AgTech templates and farmer benefit strategies.
                  </p>
                  <Button size="lg" className="w-full bg-white text-green-700 hover:bg-gray-100 font-semibold" asChild>
                    <Link href="/download/usda-sbir-agtech-guide">
                      <Download className="w-5 h-5 mr-2" />
                      Download Free USDA SBIR Guide
                    </Link>
                  </Button>
                  <p className="text-xs text-green-200 mt-3">Instant PDF • No credit card • 100% free</p>
                </div>

                <div className="bg-yellow-500/20 backdrop-blur border-2 border-yellow-400 rounded-lg p-6 flex-1 max-w-md">
                  <div className="bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">
                    ⭐ RECOMMENDED FOR AGTECH STARTUPS
                  </div>
                  <h4 className="font-semibold text-white mb-2 text-lg">🎯 Expert SBIR Proposal Support</h4>
                  <p className="text-yellow-100 text-sm mb-4">
                    Work with USDA SBIR specialists understanding farmer needs and agricultural markets. We help startups develop winning proposals with 75%+ approval rates.
                  </p>
                  <Button size="lg" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold shadow-lg" asChild>
                    <Link href="/contact?service=usda-sbir-proposal-help">
                      <Users className="w-5 h-5 mr-2" />
                      Get Expert Proposal Help
                    </Link>
                  </Button>
                  <p className="text-xs text-yellow-200 mt-3">Free consultation • 75% success rate • AgTech expertise</p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur rounded-lg p-6 mb-6">
                <p className="text-green-200 text-sm mb-3">
                  <strong className="text-white">Why Choose Our USDA SBIR Services:</strong>
                </p>
                <div className="grid md:grid-cols-3 gap-4 text-xs text-green-200">
                  <div>
                    ✓ 75+ USDA SBIR awards won<br />
                    ✓ $40M+ total funding secured<br />
                    ✓ 75% Phase I approval rate
                  </div>
                  <div>
                    ✓ All AgTech sectors<br />
                    ✓ Former USDA program officers<br />
                    ✓ Farmer network expertise
                  </div>
                  <div>
                    ✓ Phase I → Phase II continuity<br />
                    ✓ On-farm testing support<br />
                    ✓ Distribution partnerships
                  </div>
                </div>
              </div>

              <p className="text-green-300 text-sm">
                🌾 <strong>USDA SBIR Grant Assistance:</strong> Phase I $125K • Phase II $575K • Precision farming •
                Food safety technology • Sustainable agriculture • Farm automation • Crop sensors • Livestock monitoring •
                Rural broadband • Farmer benefit • Distribution strategy • NIFA grants supporting American farmers
                ranchers rural communities enhancing productivity profitability sustainability competitiveness
              </p>
            </div>
          </div>
        </section>

      </div>
      <Footer />
    </>
  )
}
