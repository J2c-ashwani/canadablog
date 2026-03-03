import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  CheckCircle, DollarSign, Target, Zap, Building, Users, Leaf,
  Clock, AlertTriangle, FileText, HelpCircle, TrendingUp, MapPin,
  Briefcase, ChevronRight, ExternalLink, BookOpen
} from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Alberta Small Business Grants 2026 | $980M+ Complete Funding Guide",
  description: "Complete guide to Alberta small business grants and funding programs. Access Alberta Innovates, Technology Innovation Fund, Rural Economic Development, and Energy Diversification grants. Expert tips for successful applications.",
  keywords: "Alberta small business grants, Alberta business funding, Alberta Innovates grants, Technology Innovation Fund Alberta, Rural Economic Development Alberta, Energy Diversification Program, Calgary business grants, Edmonton business grants",
}

export default function AlbertaSmallBusinessGrantsGuide() {
  const faqData = [
    {
      question: "Are Alberta business grants taxable?",
      answer: "Yes, most Alberta business grants are considered taxable income by the CRA. However, if grant funds are used for depreciable assets or deductible expenses, the net tax impact may be minimal. Consult with a tax professional familiar with Alberta business incentives."
    },
    {
      question: "Can startups with no revenue apply for Alberta grants?",
      answer: "Yes, but usually only for \"Innovation\" grants (Alberta Innovates). If you are a standard retail or service startup, grants are almost non-existent. You are expected to use loans or personal equity. However, hiring grants (Alberta Jobs Now) ARE available to startups once you are ready to put someone on payroll."
    },
    {
      question: "Do I need to live in Alberta to apply?",
      answer: "Critically, yes. Your company must be registered in Alberta and the *benefits* of the project (jobs, economic growth) must accrue to the province. You cannot accept an Alberta grant and then spend the money hiring developers in Ontario or the US."
    },
    {
      question: "What is the \"CARES\" program?",
      answer: "The Community and Regional Economic Support (CARES) program funds projects that improve the local economy. While businesses can partner on them, the primary applicant is usually a municipality or non-profit. It is not a direct cash grant for your private business expenses."
    },
    {
      question: "Is there a grant for women entrepreneurs in Alberta?",
      answer: "While there is no specific \"Alberta Women's Grant,\" the Women Entrepreneurship Knowledge Hub (WEKH) has a strong Alberta chapter (at Mount Royal University) that connects women to funding. Additionally, the federal \"Women Entrepreneurship Loan Fund\" is active in Alberta."
    },
    {
      question: "Are there grants for startups in Alberta?",
      answer: "Yes, several Alberta programs specifically target pre-revenue startups, particularly Alberta Innovates Voucher programs and accelerator-linked funding. However, you'll need to demonstrate technical capability, market opportunity, and a clear path to revenue."
    },
    {
      question: "How competitive are Alberta business grants?",
      answer: "Competition varies by program. Voucher programs have 30-50% approval rates for well-prepared applications. Larger innovation grants are more competitive at 15-25% approval rates. Energy diversification programs are highly competitive but offer larger awards."
    },
    {
      question: "Can I apply for multiple Alberta grants simultaneously?",
      answer: "Yes, but you must disclose all applications and cannot receive duplicate funding for the same expense. Many businesses successfully combine multiple Alberta programs or stack provincial with federal funding (IRAP, SR&ED). Program officers can advise on complementary funding strategies."
    }
  ]

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
  }

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-orange-600 to-red-700 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30">
                🏔️ Alberta Business Funding Guide
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Alberta Small Business Grants 2026
              </h1>
              <p className="text-xl text-orange-100 mb-8">
                Access $980M+ in Alberta government funding. Complete guide covering Technology Innovation,
                Energy Diversification, Rural Development, and 35+ active programs for Alberta businesses.
              </p>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-4" asChild>
                <Link href="/contact?service=alberta-business-grants-expert-help">
                  Get Expert Help with Alberta Grants
                </Link>
              </Button>
              <p className="text-orange-200 text-sm mt-4">
                Free consultation • 85% success rate • Energy sector specialists
              </p>
            </div>
          </div>
        </section>

        {/* Table of Contents */}
        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <nav className="p-6 bg-gray-50 rounded-xl">
                <h2 className="text-lg font-bold mb-4">In This Guide</h2>
                <ul className="grid md:grid-cols-2 gap-2 text-sm">
                  <li><a href="#overview" className="text-orange-600 hover:underline">1. Alberta Funding Overview</a></li>
                  <li><a href="#programs" className="text-orange-600 hover:underline">2. Major Grant Programs</a></li>
                  <li><a href="#eligibility" className="text-orange-600 hover:underline">3. Who is Eligible?</a></li>
                  <li><a href="#how-much" className="text-orange-600 hover:underline">4. How Much Funding?</a></li>
                  <li><a href="#how-to-apply" className="text-orange-600 hover:underline">5. How to Apply</a></li>
                  <li><a href="#documents" className="text-orange-600 hover:underline">6. Required Documents</a></li>
                  <li><a href="#timeline" className="text-orange-600 hover:underline">7. Approval Timeline</a></li>
                  <li><a href="#mistakes" className="text-orange-600 hover:underline">8. Common Mistakes</a></li>
                  <li><a href="#industries" className="text-orange-600 hover:underline">9. Industry-Specific Grants</a></li>
                  <li><a href="#cities" className="text-orange-600 hover:underline">10. Calgary & Edmonton Programs</a></li>
                  <li><a href="#alternatives" className="text-orange-600 hover:underline">11. Alternatives to Grants</a></li>
                  <li><a href="#faqs" className="text-orange-600 hover:underline">12. FAQs</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </section>

        {/* Common Questions Section */}
        <section className="py-12 bg-blue-50 border-b border-blue-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">❓ Common Questions About Alberta Business Grants</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <a href="#eligibility" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                  <h3 className="font-semibold text-blue-700">Who is eligible for Alberta small business grants?</h3>
                  <p className="text-sm text-gray-600 mt-1">Check standard eligibility criteria for provincial funding.</p>
                </a>
                <a href="#programs" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                  <h3 className="font-semibold text-blue-700">What funding is available for start-ups?</h3>
                  <p className="text-sm text-gray-600 mt-1">Explore grants for new businesses and innovation.</p>
                </a>
                <a href="#funding" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                  <h3 className="font-semibold text-blue-700">How much money can my business get?</h3>
                  <p className="text-sm text-gray-600 mt-1">View funding limits for major Alberta programs.</p>
                </a>
                <a href="#programs" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                  <h3 className="font-semibold text-blue-700">How do I apply for Alberta Innovates?</h3>
                  <p className="text-sm text-gray-600 mt-1">Step-by-step application guide for tech grants.</p>
                </a>
                <a href="#alternatives" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                  <h3 className="font-semibold text-blue-700">Are there loans if I don't get a grant?</h3>
                  <p className="text-sm text-gray-600 mt-1">Learn about ATB Financial and other financing options.</p>
                </a>
                <a href="#industries" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                  <h3 className="font-semibold text-blue-700">Which industries get the most funding?</h3>
                  <p className="text-sm text-gray-600 mt-1">See priority sectors for Alberta government grants.</p>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Key Statistics */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">$980M+</div>
                  <div className="text-gray-600">Annual Alberta SME Funding</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-red-600 mb-2">35+</div>
                  <div className="text-gray-600">Active Provincial Programs</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">22%</div>
                  <div className="text-gray-600">Average Approval Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">60-120</div>
                  <div className="text-gray-600">Days Processing Time</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section id="overview" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Alberta Business Funding Overview</h2>

              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Alberta operates one of Canada&apos;s most robust business funding ecosystems, with over $980 million available annually
                  through provincial programs. The province&apos;s economic development strategy emphasizes diversification beyond
                  traditional energy sectors, creating unique opportunities for businesses in technology, clean energy, agriculture,
                  and advanced manufacturing.
                </p>

                <p className="text-gray-700 leading-relaxed mb-4">
                  Alberta Innovates serves as the primary gateway for innovation-focused funding, while Alberta Enterprise Corporation
                  manages venture capital and growth equity investments. Regional agencies including Community Futures and various
                  municipal economic development offices provide additional funding streams, particularly for rural and Indigenous
                  businesses.
                </p>

                <div className="bg-orange-50 border-l-4 border-orange-500 p-4 my-6">
                  <p className="text-gray-700">
                    <strong>Key Insight:</strong> Alberta&apos;s grant programs heavily favor projects that contribute to economic
                    diversification, particularly those that leverage the province&apos;s existing energy expertise for clean
                    technology applications. Businesses with energy transition or carbon reduction components often receive
                    priority consideration.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Major Programs Section */}
        <section id="programs" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Major Alberta Small Business Grant Programs</h2>

              <div className="space-y-12">
                {/* Alberta Innovates */}
                <div className="bg-white rounded-xl shadow-lg border border-orange-100 overflow-hidden">
                  <div className="bg-orange-600 text-white p-6">
                    <h3 className="text-2xl font-bold flex items-center">
                      <Zap className="w-6 h-6 mr-3" />
                      1. Alberta Innovates
                    </h3>
                  </div>
                  <div className="p-8">
                    <div className="grid md:grid-cols-2 gap-8 mb-6">
                      <div>
                        <h4 className="font-bold text-lg mb-2">Program Overview</h4>
                        <p className="text-gray-700 mb-4">
                          Alberta Innovates is the province's innovation engine, managing a portfolio of high-impact funding programs designed to accelerate technology development. Unlike generic business grants, these funds are strictly for "innovation" – meaning your project must involve developing a new product, process, or service that has technical risk.
                        </p>
                        <p className="text-gray-700">
                          <strong>Best for:</strong> Tech startups, researchers, and SMEs developing novel solutions in health, energy, agriculture, or digital technology.
                        </p>
                      </div>
                      <div className="bg-orange-50 p-6 rounded-lg">
                        <h4 className="font-bold text-lg mb-2 text-orange-800">Key Funding Streams</h4>
                        <ul className="space-y-3 text-sm">
                          <li className="flex items-start">
                            <span className="font-bold text-orange-600 mr-2">•</span>
                            <span><strong>Alberta Innovation Voucher ($10K - $100K):</strong> Pays for 75% of eligible costs to hire a service provider (e.g., software developer, IP lawyer, testing lab) to help you advance your idea.</span>
                          </li>
                          <li className="flex items-start">
                            <span className="font-bold text-orange-600 mr-2">•</span>
                            <span><strong>Product Demonstration Program ($50K - $500K):</strong> Funding to build and test a prototype in a real-world operational setting. Requires a partner/customer.</span>
                          </li>
                          <li className="flex items-start">
                            <span className="font-bold text-orange-600 mr-2">•</span>
                            <span><strong>Commercialization Associates ($120K):</strong> Subsidy to hire a business pro to help take your product to market.</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Technology Innovation and Emissions Reduction (TIER) */}
                <div className="bg-white rounded-xl shadow-lg border border-green-100 overflow-hidden">
                  <div className="bg-green-700 text-white p-6">
                    <h3 className="text-2xl font-bold flex items-center">
                      <Leaf className="w-6 h-6 mr-3" />
                      2. Emissions Reduction Alberta (ERA)
                    </h3>
                  </div>
                  <div className="p-8">
                    <div className="grid md:grid-cols-2 gap-8 mb-6">
                      <div>
                        <h4 className="font-bold text-lg mb-2">Program Overview</h4>
                        <p className="text-gray-700 mb-4">
                          Funded by the TIER carbon pricing system, ERA invests millions of dollars into technologies that reduce greenhouse gas emissions. These are typically large-scale capital projects but are open to SMEs partnering with large industry players.
                        </p>
                        <p className="text-gray-700">
                          <strong>Best for:</strong> Clean tech companies, energy services, and manufacturing facilities implementing efficiency upgrades.
                        </p>
                      </div>
                      <div className="bg-green-50 p-6 rounded-lg">
                        <h4 className="font-bold text-lg mb-2 text-green-800">Key Funding Streams</h4>
                        <ul className="space-y-3 text-sm">
                          <li className="flex items-start">
                            <span className="font-bold text-green-600 mr-2">•</span>
                            <span><strong>Partnership Intake Program:</strong> Accepts applications on a rolling basis for pilot projects that have significant GHG reduction potential.</span>
                          </li>
                          <li className="flex items-start">
                            <span className="font-bold text-green-600 mr-2">•</span>
                            <span><strong>Energy Savings for Business (ESB):</strong> Rebates for high-efficiency equipment upgrades (HVAC, lighting, motors) for any Alberta business.</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Jobs Now */}
                <div className="bg-white rounded-xl shadow-lg border border-blue-100 overflow-hidden">
                  <div className="bg-blue-600 text-white p-6">
                    <h3 className="text-2xl font-bold flex items-center">
                      <Users className="w-6 h-6 mr-3" />
                      3. Alberta Jobs Now Grant
                    </h3>
                  </div>
                  <div className="p-8">
                    <p className="text-gray-700 mb-6">
                      While technically a hiring subsidy rather than a "project grant," this is the most accessible funding for general small businesses. It covers 25% of a new employee's salary (up to $25,000) or 37.5% if hiring from underrepresented groups.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="border p-4 rounded text-center">
                        <div className="font-bold text-2xl text-blue-600 mb-1">Up to $25K</div>
                        <div className="text-sm text-gray-600">Per New Hire</div>
                      </div>
                      <div className="border p-4 rounded text-center">
                        <div className="font-bold text-2xl text-blue-600 mb-1">52 Weeks</div>
                        <div className="text-sm text-gray-600">Employment Duration</div>
                      </div>
                      <div className="border p-4 rounded text-center">
                        <div className="font-bold text-2xl text-blue-600 mb-1">2 Intakes</div>
                        <div className="text-sm text-gray-600">Per Year (Typically)</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CARES */}
                <div className="bg-white rounded-xl shadow-lg border border-purple-100 overflow-hidden">
                  <div className="bg-purple-600 text-white p-6">
                    <h3 className="text-2xl font-bold flex items-center">
                      <MapPin className="w-6 h-6 mr-3" />
                      4. Community and Regional Economic Support (CARES)
                    </h3>
                  </div>
                  <div className="p-8">
                    <p className="text-gray-700 mb-4">
                      CARES funds projects that improve local economic conditions. While grants are often awarded to municipalities or non-profits, private businesses can partner on these applications for shared initiatives like tourism marketing strategies or regional branding.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Eligibility Section */}
        <section id="eligibility" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Who is Eligible for Alberta Business Grants?</h2>

              <p className="text-gray-700 mb-6">
                Alberta business grants are available to for-profit businesses that operate and create economic benefit
                within the province. Eligibility varies by program, but most share common requirements centered on
                Alberta residency, business registration, and demonstrated capacity to execute proposed projects.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-green-700">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Generally Eligible
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Incorporated in Alberta or with significant Alberta operations</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Small and medium enterprises (typically under 500 employees)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Businesses with clear growth or innovation plans</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Good standing with provincial and federal tax authorities</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Projects with demonstrable economic impact for Alberta</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-red-700">
                      <AlertTriangle className="w-5 h-5 mr-2" />
                      Generally Ineligible
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-1" />
                        <span>Businesses without Alberta incorporation or significant operations</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-1" />
                        <span>Projects already completed before application</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-1" />
                        <span>Businesses in arrears with government obligations</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-1" />
                        <span>Real estate development or speculation</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-1" />
                        <span>Franchise fees and licensing costs</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* How Much Funding Section */}
        <section id="how-much" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">How Much Grant Funding Can Alberta Businesses Get?</h2>

              <p className="text-gray-700 mb-6">
                Alberta grant amounts vary widely depending on program type, business size, and project scope.
                Most programs use a cost-sharing model where grants cover 25-75% of eligible project costs,
                with the business contributing the remainder.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200 mb-6">
                  <thead>
                    <tr className="bg-orange-50">
                      <th className="border border-gray-200 px-4 py-3 text-left">Program Type</th>
                      <th className="border border-gray-200 px-4 py-3 text-left">Typical Range</th>
                      <th className="border border-gray-200 px-4 py-3 text-left">Cost Share</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3">Voucher Programs</td>
                      <td className="border border-gray-200 px-4 py-3 font-semibold text-green-600">$10K - $100K</td>
                      <td className="border border-gray-200 px-4 py-3">50-75%</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3">Innovation Grants</td>
                      <td className="border border-gray-200 px-4 py-3 font-semibold text-green-600">$50K - $500K</td>
                      <td className="border border-gray-200 px-4 py-3">33-50%</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3">Commercialization Funds</td>
                      <td className="border border-gray-200 px-4 py-3 font-semibold text-green-600">$100K - $2M</td>
                      <td className="border border-gray-200 px-4 py-3">25-50%</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3">Energy Diversification</td>
                      <td className="border border-gray-200 px-4 py-3 font-semibold text-green-600">$500K - $10M+</td>
                      <td className="border border-gray-200 px-4 py-3">25-40%</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <p className="text-gray-700">
                  <strong>Pro Tip:</strong> Many Alberta businesses successfully stack provincial grants with federal
                  programs like SR&ED, IRAP, and SDTC. This approach can cover 60-80% of eligible project costs
                  when strategically combined.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How to Apply Section */}
        <section id="how-to-apply" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">How to Apply for Alberta Business Grants - Step by Step</h2>

              <div className="space-y-6">
                <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold mr-4">1</div>
                  <div>
                    <h3 className="font-bold text-lg">Research & Program Selection (1-2 weeks)</h3>
                    <p className="text-gray-600 mt-1">
                      Identify programs aligned with your project. Alberta Innovates website lists all active programs
                      with eligibility criteria. Consider consulting with Alberta&apos;s Business Link or regional
                      economic development offices for program matching.
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold mr-4">2</div>
                  <div>
                    <h3 className="font-bold text-lg">Expression of Interest (if required)</h3>
                    <p className="text-gray-600 mt-1">
                      Many Alberta programs require an initial Expression of Interest (EOI) before full application.
                      This brief submission (typically 2-3 pages) outlines your project concept and business background.
                      EOI review takes approximately 2-4 weeks.
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold mr-4">3</div>
                  <div>
                    <h3 className="font-bold text-lg">Prepare Full Application (2-4 weeks)</h3>
                    <p className="text-gray-600 mt-1">
                      Develop comprehensive application including business plan, project description, timeline,
                      budget with quotes, and impact projections. Most applications require 15-30 pages plus
                      supporting documents.
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold mr-4">4</div>
                  <div>
                    <h3 className="font-bold text-lg">Submit & Interview Process</h3>
                    <p className="text-gray-600 mt-1">
                      Submit through the designated portal (usually Alberta Innovates online system).
                      Larger grants typically require an in-person or virtual presentation to the review committee.
                      Prepare for technical and business model questions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold mr-4">5</div>
                  <div>
                    <h3 className="font-bold text-lg">Award & Contribution Agreement</h3>
                    <p className="text-gray-600 mt-1">
                      If approved, you&apos;ll receive a contribution agreement outlining funding terms, milestones,
                      reporting requirements, and eligible expenses. Review carefully before signing—terms are
                      legally binding. Funds typically flow on a reimbursement or milestone basis.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Required Documents Section */}
        <section id="documents" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">What Documents Are Required for Alberta Grant Applications?</h2>

              <p className="text-gray-700 mb-6">
                Alberta grant applications require comprehensive documentation. Preparing these materials in advance
                significantly speeds up the application process and improves your chances of success.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h3 className="font-bold text-lg mb-4 flex items-center">
                    <FileText className="w-5 h-5 text-orange-600 mr-2" />
                    Core Business Documents
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-orange-500 mr-2 mt-0.5" />
                      <span>Alberta corporate registration documents</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-orange-500 mr-2 mt-0.5" />
                      <span>Most recent 2-3 years of financial statements</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-orange-500 mr-2 mt-0.5" />
                      <span>Current year-to-date financials</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-orange-500 mr-2 mt-0.5" />
                      <span>Bank statements (last 6 months)</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-orange-500 mr-2 mt-0.5" />
                      <span>Shareholder agreement (if applicable)</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 bg-gray-50 rounded-lg">
                  <h3 className="font-bold text-lg mb-4 flex items-center">
                    <Briefcase className="w-5 h-5 text-blue-600 mr-2" />
                    Project-Specific Documents
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-blue-500 mr-2 mt-0.5" />
                      <span>Detailed project plan with milestones</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-blue-500 mr-2 mt-0.5" />
                      <span>Itemized budget with vendor quotes</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-blue-500 mr-2 mt-0.5" />
                      <span>Technical specifications (for R&D projects)</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-blue-500 mr-2 mt-0.5" />
                      <span>Market analysis and competitive assessment</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-blue-500 mr-2 mt-0.5" />
                      <span>Letters of support from partners/customers</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section id="timeline" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">How Long Does Alberta Grant Approval Take?</h2>

              <p className="text-gray-700 mb-6">
                Alberta grant processing times vary by program complexity and funding amount. Most programs
                operate on continuous intake rather than fixed deadlines, though some have specific competition periods.
              </p>

              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-orange-50">
                      <th className="border border-gray-200 px-4 py-3 text-left">Program Type</th>
                      <th className="border border-gray-200 px-4 py-3 text-left">Review Timeline</th>
                      <th className="border border-gray-200 px-4 py-3 text-left">First Payment</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3">Voucher Programs</td>
                      <td className="border border-gray-200 px-4 py-3">2-4 weeks</td>
                      <td className="border border-gray-200 px-4 py-3">Upon milestone completion</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3">Standard Grants</td>
                      <td className="border border-gray-200 px-4 py-3">60-90 days</td>
                      <td className="border border-gray-200 px-4 py-3">30 days after agreement</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3">Large-Scale Programs</td>
                      <td className="border border-gray-200 px-4 py-3">90-180 days</td>
                      <td className="border border-gray-200 px-4 py-3">Project commencement</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                <p className="text-gray-700">
                  <strong>Important:</strong> Alberta programs typically operate on continuous intake throughout the year.
                  Check the official Alberta Innovates website for current program status and any temporary closures
                  or funding cycle updates.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">Alberta Success Stories: How They Got Funded</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center mb-4">
                    <Leaf className="w-10 h-10 text-green-600 bg-green-100 rounded-full p-2 mr-3" />
                    <div>
                      <h3 className="font-bold text-lg">The Ag-Tech Pivot</h3>
                      <div className="text-xs text-gray-500 uppercase tracking-wide">Lethbridge, AB</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4"><strong>The Business:</strong> A family-owned seed cleaning plant wanted to install optical sorting technology to separate wheat grades.</p>
                  <p className="text-sm text-gray-600 mb-4"><strong>The Strategy:</strong> They positioned the upgrade not as "buying equipment" (ineligible) but as "adoption of new technology" (eligible). They stacked a <strong>Sustainable CAP</strong> grant ($250,000) with a <strong>PrairiesCan</strong> loan.</p>
                  <div className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded inline-block">Result: $450K Funding</div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center mb-4">
                    <Zap className="w-10 h-10 text-blue-600 bg-blue-100 rounded-full p-2 mr-3" />
                    <div>
                      <h3 className="font-bold text-lg">The Methane Fix</h3>
                      <div className="text-xs text-gray-500 uppercase tracking-wide">Grande Prairie, AB</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4"><strong>The Business:</strong> An oilfield services company developed a new valve to prevent gas leaks but lacked cash to build 10 pilot units.</p>
                  <p className="text-sm text-gray-600 mb-4"><strong>The Strategy:</strong> They applied to <strong>Alberta Innovates</strong> for a Product Demonstration voucher. They partnered with a mid-size producer who agreed to be the test site.</p>
                  <div className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded inline-block">Result: $150K Non-Repayable</div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center mb-4">
                    <Users className="w-10 h-10 text-purple-600 bg-purple-100 rounded-full p-2 mr-3" />
                    <div>
                      <h3 className="font-bold text-lg">The Digital Shift</h3>
                      <div className="text-xs text-gray-500 uppercase tracking-wide">Red Deer, AB</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4"><strong>The Business:</strong> A manufacturing firm was using spreadsheets to track inventory, causing massive delays.</p>
                  <p className="text-sm text-gray-600 mb-4"><strong>The Strategy:</strong> They used the <strong>Canada Digital Adoption Program (CDAP)</strong> to hire a consultant to write a digital plan ($15K grant) and then accessed the BDC 0% loan ($100K) to buy an ERP system.</p>
                  <div className="bg-purple-100 text-purple-800 text-xs font-bold px-2 py-1 rounded inline-block">Result: $115K Value</div>
                </div>
              </div>
            </div>
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Common Mistakes to Avoid with Alberta Grant Applications</h2>

              <div className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="text-red-600 font-bold">1</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">Weak Economic Impact Narrative</h3>
                        <p className="text-gray-600 mt-1">
                          Alberta reviewers heavily weight economic benefit to the province. Vague statements like
                          &quot;we&apos;ll create jobs&quot; aren&apos;t sufficient. Quantify Alberta jobs created, tax
                          revenue generated, and local supply chain benefits.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="text-red-600 font-bold">2</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">Starting Work Before Approval</h3>
                        <p className="text-gray-600 mt-1">
                          Expenses incurred before your contribution agreement is signed are almost never eligible.
                          Wait for formal approval before purchasing equipment, hiring, or contracting services.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="text-red-600 font-bold">3</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">Ignoring the Energy Transition Angle</h3>
                        <p className="text-gray-600 mt-1">
                          Alberta prioritizes economic diversification. Even if your business isn&apos;t directly
                          in clean energy, highlighting how your project contributes to diversification,
                          reduces emissions, or leverages energy sector expertise can strengthen your application.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="text-red-600 font-bold">4</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">Not Demonstrating Matching Funds</h3>
                        <p className="text-gray-600 mt-1">
                          Most Alberta grants require you to co-invest 25-75% of project costs. Applications
                          without clear evidence of matching funds (bank statements, investor letters, or
                          credit facilities) are typically rejected.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Industry Focus Section */}
        <section id="industries" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">Sector Deep Dive: Where the Money Is</h2>
              <p className="text-center text-gray-700 max-w-3xl mx-auto mb-12">
                Alberta's funding strategy is sector-driven. General "small business grants" are rare; "Agriculture grants" or "Energy grants" are abundant. Here is the breakdown of the three hottest sectors for 2026.
              </p>

              <div className="space-y-12">
                {/* Sector 1: Agriculture & Agri-Food */}
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="md:w-1/3 bg-orange-100 p-6 rounded-xl">
                    <Leaf className="w-12 h-12 text-orange-600 mb-4" />
                    <h3 className="text-2xl font-bold text-orange-900 mb-2">Agriculture & Agri-Food</h3>
                    <p className="text-sm text-orange-800">
                      <strong>Priority:</strong> Value-added processing (turning raw potatoes into chips, or canola into protein isolate).
                    </p>
                  </div>
                  <div className="md:w-2/3">
                    <h4 className="font-bold text-lg mb-3">Key Program: Sustainable CAP</h4>
                    <p className="text-gray-700 mb-4">
                      The Sustainable Canadian Agricultural Partnership (Sustainable CAP) is a massive federal-provincial framework. In Alberta, it funds 25-50% of costs for projects that improve efficiency, water use, or product duality.
                    </p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li><strong className="text-gray-900">Emerging Opportunities Program:</strong> Funding for transformative processing equipment that doesn't exist yet in Alberta.</li>
                      <li><strong className="text-gray-900">Efficient Grain Handling:</strong> Grants for grain drying efficiency upgrades (reducing propane/natural gas usage).</li>
                    </ul>
                  </div>
                </div>

                <hr className="border-gray-200" />

                {/* Sector 2: Energy & Clean Tech */}
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="md:w-1/3 bg-blue-100 p-6 rounded-xl">
                    <Zap className="w-12 h-12 text-blue-600 mb-4" />
                    <h3 className="text-2xl font-bold text-blue-900 mb-2">Energy & Clean Tech</h3>
                    <p className="text-sm text-blue-800">
                      <strong>Priority:</strong> Hydrogen, Carbon Capture (CCUS), and Methane Reduction.
                    </p>
                  </div>
                  <div className="md:w-2/3">
                    <h4 className="font-bold text-lg mb-3">Key Program: TIER Economic Recovery</h4>
                    <p className="text-gray-700 mb-4">
                      Large industrial emitters pay into the TIER fund, which is then redistributed as grants to companies solving the emissions problem. If you have a technology that can measure, monitor, or reduce methane leaks, you are in high demand.
                    </p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li><strong className="text-gray-900">Digital Energy:</strong> Funding for software startups optimizing oilfield logistics to reduce truck rolls and emissions.</li>
                      <li><strong className="text-gray-900">Hydrogen Centre of Excellence:</strong> Specific funding for hydrogen production, storage, and retrofitting heavy-duty vehicles.</li>
                    </ul>
                  </div>
                </div>

                <hr className="border-gray-200" />

                {/* Sector 3: Digital & Creative */}
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="md:w-1/3 bg-purple-100 p-6 rounded-xl">
                    <Briefcase className="w-12 h-12 text-purple-600 mb-4" />
                    <h3 className="text-2xl font-bold text-purple-900 mb-2">Digital & Creative</h3>
                    <p className="text-sm text-purple-800">
                      <strong>Priority:</strong> AI adoption, Interactive Digital Media (Games/VR).
                    </p>
                  </div>
                  <div className="md:w-2/3">
                    <h4 className="font-bold text-lg mb-3">Key Program: Alberta Media Fund</h4>
                    <p className="text-gray-700 mb-4">
                      Often overlooked, this fund supports video game developers, post-production houses, and digital content creators. It offers a 25% grant on eligible labour costs.
                    </p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li><strong className="text-gray-900">Interactive Digital Media Grant:</strong> Up to $200,000 for game development studios.</li>
                      <li><strong className="text-gray-900">Post-Production Grant:</strong> For companies specializing in VFX and editing for film/TV.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* City-Specific Section */}
        <section id="cities" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Calgary & Edmonton Business Grant Programs</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Calgary Programs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Calgary Economic Development – Business expansion support</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Platform Calgary – Startup accelerator programs</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Innovate Calgary – Technology commercialization</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Community Futures – Small business loans and support</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Edmonton Programs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Edmonton Global – International business development</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Startup Edmonton – Tech ecosystem programs</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>TEC Edmonton – University-industry collaboration</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Edmonton Chamber – Business development resources</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Stacking Strategy Section */}
        <section className="py-16 bg-blue-900 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center mb-6">
                <Zap className="w-8 h-8 text-yellow-400 mr-3" />
                <h2 className="text-3xl font-bold">Pro Tip: The "Alberta Stack" Strategy</h2>
              </div>
              <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                Smart founders don't just apply for one grant; they layer them. Because Alberta has strong alignment with federal priorities, you can often fund 75% of your project by stacking sources.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-blue-800 p-6 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-xl mb-4 text-white">Step 1: The Federal Foundation</h3>
                  <p className="text-blue-200 mb-4">
                    Always start with <strong>PrairiesCan</strong> (formerly Western Economic Diversification). Their "Business Scale-up and Productivity" (BSP) program offers interest-free loans that count as "industry contribution" for some other grants.
                  </p>
                  <div className="bg-blue-900 p-3 rounded text-sm text-yellow-300 font-mono">
                    Result: 50% Funding (Interest-Free Loan)
                  </div>
                </div>

                <div className="bg-blue-800 p-6 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-xl mb-4 text-white">Step 2: The Provincial Top-Up</h3>
                  <p className="text-blue-200 mb-4">
                    Layer an <strong>Alberta Innovates</strong> voucher on top of your federal funding. Since AI grants are non-repayable cash, they reduce your actual debt load significantly.
                  </p>
                  <div className="bg-blue-900 p-3 rounded text-sm text-yellow-300 font-mono">
                    Result: +25% Funding (Non-Dilutive Grant)
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-black/20 p-4 rounded-lg flex items-start">
                <AlertTriangle className="w-6 h-6 text-yellow-500 mr-3 shrink-0 mt-1" />
                <p className="text-sm text-blue-200">
                  <strong>Stacking Limit Warning:</strong> Government stacking rules typically cap total public funding at 75% of project costs (or 90% for some research projects). Always check the "Stacking Limit" clause in your contribution agreement.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Alternatives Section */}
        <section id="alternatives" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Plan B: Funding When Grants Fail</h2>

              <p className="text-gray-700 mb-12 text-center max-w-2xl mx-auto">
                Grants are competitive and slow. If you need cash *now* or didn't qualify, these Alberta-specific alternatives are your safety net.
              </p>

              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6">
                  <div className="shrink-0 bg-yellow-100 p-4 rounded-full h-16 w-16 flex items-center justify-center">
                    <DollarSign className="w-8 h-8 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">1. ATB Financial "Boost" Loans</h3>
                    <p className="text-gray-600 mb-2">
                      Unlike the Big 5 banks, ATB is an Alberta crown corporation with a mandate to support local business. They often have higher risk tolerance for Alberta-based entrepreneurs.
                    </p>
                    <ul className="text-sm text-gray-500 list-disc pl-4">
                      <li><strong>Best For:</strong> Buying equipment, inventory, or operating lines of credit.</li>
                      <li><strong>Speed:</strong> Approval in days, not months.</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6">
                  <div className="shrink-0 bg-green-100 p-4 rounded-full h-16 w-16 flex items-center justify-center">
                    <Users className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">2. Community Futures (Rural)</h3>
                    <p className="text-gray-600 mb-2">
                      If a bank says no, go here. Community Futures has offices in 27 rural Alberta regions. They provide loans up to $150,000 specifically for businesses that can't get traditional financing.
                    </p>
                    <ul className="text-sm text-gray-500 list-disc pl-4">
                      <li><strong>Best For:</strong> Rural startups, succession planning (buying a business).</li>
                      <li><strong>Bonus:</strong> Includes free business coaching.</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6">
                  <div className="shrink-0 bg-blue-100 p-4 rounded-full h-16 w-16 flex items-center justify-center">
                    <Briefcase className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">3. The VCAP Model (Venture Capital)</h3>
                    <p className="text-gray-600 mb-2">
                      Alberta Enterprise Corporation invests in VC funds that invest in YOU. If you have a high-growth tech startup, look for funds backed by AEC, such as <strong>Accelerate Fund III</strong>.
                    </p>
                    <ul className="text-sm text-gray-500 list-disc pl-4">
                      <li><strong>Best For:</strong> Tech companies needing $500K+ to scale globally.</li>
                      <li><strong>Trade-off:</strong> You give up equity (ownership) in exchange for cash.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center bg-white p-4 rounded-lg border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-2">What about SR&ED?</h4>
                <p className="text-gray-600 text-sm mb-3">
                  While not an "upfront" grant, the Federal Scientific Research and Experimental Development (SR&ED) credit is the single biggest source of R&D funding. Alberta has no provincial top-up, but the federal portion (35% refundable) is essentially guaranteed cash if you qualify.
                </p>
                <Link href="/blog/sred-scientific-research-experimental-development" className="inline-flex items-center text-orange-600 font-bold hover:underline">
                  Read our full SR&ED Guide <ExternalLink className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faqs" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>

              <div className="space-y-4">
                {faqData.map((faq, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <h3 className="font-bold text-lg flex items-start">
                        <HelpCircle className="w-5 h-5 text-orange-600 mr-2 mt-1 flex-shrink-0" />
                        {faq.question}
                      </h3>
                      <p className="text-gray-700 mt-2 ml-7">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Related Resources Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Related Resources</h2>

              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/blog/canada-federal-grants" className="flex items-center p-4 bg-white rounded-lg border hover:border-orange-500 hover:shadow-md transition-all group">
                  <BookOpen className="w-5 h-5 text-orange-600 mr-3" />
                  <span className="text-gray-700 group-hover:text-orange-600">Federal Grants for Canadian Businesses</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                </Link>
                <Link href="/blog/sred-scientific-research-experimental-development" className="flex items-center p-4 bg-white rounded-lg border hover:border-orange-500 hover:shadow-md transition-all group">
                  <BookOpen className="w-5 h-5 text-orange-600 mr-3" />
                  <span className="text-gray-700 group-hover:text-orange-600">SR&ED Tax Credit Guide</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                </Link>
                <Link href="/blog/irap-industrial-research-assistance-program" className="flex items-center p-4 bg-white rounded-lg border hover:border-orange-500 hover:shadow-md transition-all group">
                  <BookOpen className="w-5 h-5 text-orange-600 mr-3" />
                  <span className="text-gray-700 group-hover:text-orange-600">IRAP Program Overview</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                </Link>
                <Link href="/guides" className="flex items-center p-4 bg-white rounded-lg border hover:border-orange-500 hover:shadow-md transition-all group">
                  <BookOpen className="w-5 h-5 text-orange-600 mr-3" />
                  <span className="text-gray-700 group-hover:text-orange-600">All Grant Application Guides</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Strong CTA Section */}
        <section className="py-20 bg-gradient-to-r from-orange-600 to-red-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-6">
                Ready to Access Alberta's $980M+ in Business Funding?
              </h2>
              <p className="text-xl text-orange-100 mb-8">
                Our Alberta specialists have secured over $7M for local businesses. Get expert guidance
                on navigating Alberta Innovates, energy diversification programs, and rural development funding.
              </p>
              <div className="bg-white/10 rounded-lg p-6 mb-8">
                <h4 className="font-semibold mb-4">Our Alberta Grant Success Package Includes:</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Free eligibility assessment</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Program matching service</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Application preparation support</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Energy sector expertise</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Calgary and Edmonton local teams</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>85% success rate for Alberta businesses</span>
                  </div>
                </div>
              </div>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-4" asChild>
                <Link href="/contact?service=alberta-grants-expert-help">
                  Get Expert Help with Alberta Grants
                </Link>
              </Button>
              <p className="text-orange-200 text-sm mt-4">
                Free consultation • Energy sector specialists • Local Alberta expertise
              </p>
            </div>
          </div>
        </section >
      </div >
      <Footer />
    </>
  )
}
