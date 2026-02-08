import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  CheckCircle, DollarSign, Target, Mountain, MapPin, Building, Users, Snowflake,
  Clock, AlertTriangle, FileText, HelpCircle, Briefcase, ChevronRight,
  ExternalLink, BookOpen, TrendingUp, Leaf, Globe
} from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Territories Small Business Grants 2026 | $125M+ NT, YT, Nunavut Complete Guide",
  description: "Complete guide to Territories business grants. Access NWT Business Development, Yukon Small Business Support, Nunavut Economic Development, and Indigenous Business Programs. Northern specialists.",
  keywords: "Territories small business grants, NWT business development, Yukon small business support, Nunavut economic development, Northwest Territories business funding, Yukon business grants, Indigenous business grants",
}

export default function TerritoriesSmallBusinessGrantsGuide() {
  const faqData = [
    {
      question: "Do I need to be a territorial resident?",
      answer: "Most territorial programs require residency (often 6-12 months minimum) or substantial territorial operations. CanNor has more flexible requirements for businesses creating northern employment."
    },
    {
      question: "Are programs available in remote communities?",
      answer: "Yes. Northern programs are specifically designed for remote communities. Many offer higher support levels for businesses serving fly-in communities or particularly remote areas."
    },
    {
      question: "Can non-Indigenous businesses access funding?",
      answer: "Yes. General territorial business programs are available to all residents. However, Indigenous entrepreneurs often have access to additional funding streams and may receive priority consideration."
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
        <section className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30">
                ❄️ Northern Territories Business Funding Guide
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Territories Small Business Grants 2026
              </h1>
              <p className="text-xl text-purple-100 mb-8">
                Access $125M+ in combined funding across Northwest Territories, Yukon, and Nunavut.
                Complete guide to specialized programs for northern businesses, Indigenous enterprises,
                and remote community development.
              </p>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-4" asChild>
                <Link href="/contact?service=territories-business-grants-expert-help">
                  Get Expert Help with Territories Grants
                </Link>
              </Button>
              <p className="text-purple-200 text-sm mt-4">
                Free consultation • 83% northern success rate • Remote community specialists
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
                  <li><a href="#overview" className="text-purple-700 hover:underline">1. Northern Territories Overview</a></li>
                  <li><a href="#programs" className="text-purple-700 hover:underline">2. Major Grant Programs by Territory</a></li>
                  <li><a href="#eligibility" className="text-purple-700 hover:underline">3. Who is Eligible?</a></li>
                  <li><a href="#how-much" className="text-purple-700 hover:underline">4. How Much Funding?</a></li>
                  <li><a href="#how-to-apply" className="text-purple-700 hover:underline">5. How to Apply</a></li>
                  <li><a href="#documents" className="text-purple-700 hover:underline">6. Required Documents</a></li>
                  <li><a href="#timeline" className="text-purple-700 hover:underline">7. Approval Timeline</a></li>
                  <li><a href="#mistakes" className="text-purple-700 hover:underline">8. Common Mistakes</a></li>
                  <li><a href="#indigenous" className="text-purple-700 hover:underline">9. Indigenous Business Programs</a></li>
                  <li><a href="#industries" className="text-purple-700 hover:underline">10. Key Industries</a></li>
                  <li><a href="#alternatives" className="text-purple-700 hover:underline">11. Alternatives to Grants</a></li>
                  <li><a href="#faqs" className="text-purple-700 hover:underline">12. FAQs</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </section>

        {/* Key Statistics */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">$125M+</div>
                  <div className="text-gray-600">Combined Territory Funding</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-indigo-600 mb-2">3</div>
                  <div className="text-gray-600">Northern Territories</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">83%</div>
                  <div className="text-gray-600">Expert Success Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">$92K</div>
                  <div className="text-gray-600">Average Funding</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section id="overview" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">How does Northern Territories business funding work?</h2>

              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Canada&apos;s three northern territories—Northwest Territories, Yukon, and Nunavut—operate
                  distinct but complementary business support ecosystems. Combined, these jurisdictions
                  invest over $125 million annually in business development, with a strong emphasis on
                  Indigenous entrepreneurship, natural resource development, tourism, and remote
                  community economic resilience.
                </p>

                <p className="text-gray-700 leading-relaxed mb-4">
                  Northern business funding often comes with higher per-capita support than southern
                  provinces due to the unique challenges of operating in remote, Arctic, and sub-Arctic
                  environments. Programs recognize the higher costs of logistics, limited infrastructure,
                  and shorter operating seasons that characterize northern business operations.
                </p>

                <div className="bg-purple-50 border-l-4 border-purple-500 p-4 my-6">
                  <p className="text-gray-700">
                    <strong>Key Insight:</strong> Northern programs often provide a higher funding
                    percentage (up to 100% for some community development projects) compared to
                    southern equivalents. Indigenous-owned businesses and community enterprises
                    frequently receive priority consideration.
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
              <h2 className="text-3xl font-bold text-center mb-12">What grants are available in each territory?</h2>

              <div className="grid md:grid-cols-2 gap-8">
                {/* NWT Business Development */}
                <Card className="border-2 border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-purple-700">NWT Business Development Program</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $200K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>All Industries</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Comprehensive business support through the Department of Industry, Tourism
                      and Investment. Includes startup grants, expansion funding, and sector-specific programs.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>SEED Program – up to $15K for startups</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Business Development Fund – expansion</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Tourism programs – hospitality support</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Yukon Small Business Support */}
                <Card className="border-2 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700">Yukon Economic Development Programs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $150K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Snowflake className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Yukon Focus</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Yukon Economic Development offers multiple streams including the
                      Enterprise Trade Fund and regional development initiatives.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Enterprise Trade Fund – export support</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Dana Naye Ventures – loans up to $100K</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>YuKonstruct innovation hub</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Nunavut Economic Development */}
                <Card className="border-2 border-teal-200">
                  <CardHeader>
                    <CardTitle className="text-teal-700">Nunavut Economic Development</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $175K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Mountain className="w-5 h-5 text-teal-600 mr-2" />
                        <span><strong>Arctic Focus</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Nunavut Development Corporation and territorial programs focus on
                      community-based enterprises and Inuit economic participation.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Small Business Support Program</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Community Development Fund</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Inuit-focused business programs</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* CanNor Federal */}
                <Card className="border-2 border-orange-200">
                  <CardHeader>
                    <CardTitle className="text-orange-700">CanNor (Federal Northern Agency)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $500K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Globe className="w-5 h-5 text-orange-600 mr-2" />
                        <span><strong>All Territories</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Canadian Northern Economic Development Agency provides federal
                      funding across all three territories with significant capacity.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Strategic Investment Program</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Inclusive Diversification – Indigenous</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Northern economic development</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Eligibility Section */}
        <section id="eligibility" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Who is Eligible for Territories Business Grants?</h2>

              <p className="text-gray-700 mb-6">
                Eligibility varies by territory and program. Most require territorial residency or
                significant northern operations. Indigenous-owned businesses often receive priority
                and access to additional funding streams.
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
                        <span>Territorial residents (minimum residency varies)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Businesses registered in the territory</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Indigenous entrepreneurs (priority access)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Community-based enterprises</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Projects creating territorial employment</span>
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
                        <span>Non-territorial residents (most programs)</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-1" />
                        <span>Businesses without territorial operations</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-1" />
                        <span>Projects already completed</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-1" />
                        <span>Speculative investments</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-1" />
                        <span>Moving southern businesses north solely for funding</span>
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
              <h2 className="text-3xl font-bold mb-6">How Much Funding Can You Get in the Territories?</h2>

              <p className="text-gray-700 mb-6">
                Northern funding levels are often generous relative to project size, reflecting the
                higher costs and strategic importance of northern economic development. Stacking
                territorial and federal programs (CanNor) is common and encouraged.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200 mb-6">
                  <thead>
                    <tr className="bg-purple-50">
                      <th className="border border-gray-200 px-4 py-3 text-left">Territory/Program</th>
                      <th className="border border-gray-200 px-4 py-3 text-left">Typical Range</th>
                      <th className="border border-gray-200 px-4 py-3 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3">NWT SEED Program</td>
                      <td className="border border-gray-200 px-4 py-3 font-semibold text-green-600">Up to $15K</td>
                      <td className="border border-gray-200 px-4 py-3">Startup support</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3">Yukon Enterprise Trade Fund</td>
                      <td className="border border-gray-200 px-4 py-3 font-semibold text-green-600">Up to $150K</td>
                      <td className="border border-gray-200 px-4 py-3">Export/growth</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3">Nunavut Small Business</td>
                      <td className="border border-gray-200 px-4 py-3 font-semibold text-green-600">Up to $175K</td>
                      <td className="border border-gray-200 px-4 py-3">Community business</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3">CanNor (Federal)</td>
                      <td className="border border-gray-200 px-4 py-3 font-semibold text-green-600">Up to $500K+</td>
                      <td className="border border-gray-200 px-4 py-3">Strategic projects</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-500 p-4">
                <p className="text-gray-700">
                  <strong>Pro Tip:</strong> Northern businesses should plan to stack territorial
                  and federal funding. CanNor often provides matching or complementary funding
                  alongside territorial programs for larger projects.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How to Apply Section */}
        <section id="how-to-apply" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">How Do You Apply for Territories Business Grants?</h2>

              <div className="space-y-6">
                <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold mr-4">1</div>
                  <div>
                    <h3 className="font-bold text-lg">Contact Your Territorial Office</h3>
                    <p className="text-gray-600 mt-1">
                      Start with your territorial economic development office. Staff are
                      accessible and provide guidance on which programs fit your situation.
                      Remote consultations by phone or video are standard.
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold mr-4">2</div>
                  <div>
                    <h3 className="font-bold text-lg">Develop Your Business Case</h3>
                    <p className="text-gray-600 mt-1">
                      Northern programs often emphasize community impact and sustainability.
                      Document how your business will create local employment, serve
                      community needs, or contribute to economic diversification.
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold mr-4">3</div>
                  <div>
                    <h3 className="font-bold text-lg">Prepare Application Materials</h3>
                    <p className="text-gray-600 mt-1">
                      Applications typically require a business plan, financial projections,
                      and project budget. For Indigenous programs, documentation of
                      Indigenous ownership or community connection may be required.
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold mr-4">4</div>
                  <div>
                    <h3 className="font-bold text-lg">Submit & Review</h3>
                    <p className="text-gray-600 mt-1">
                      Northern programs often have rolling intakes and shorter review times.
                      Expect 30-60 days for most territorial programs. CanNor may take 60-90 days.
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
              <h2 className="text-3xl font-bold mb-6">What Documents Are Required?</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h3 className="font-bold text-lg mb-4 flex items-center">
                    <FileText className="w-5 h-5 text-purple-600 mr-2" />
                    Core Documents
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-purple-500 mr-2 mt-0.5" />
                      <span>Territorial business registration</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-purple-500 mr-2 mt-0.5" />
                      <span>Proof of territorial residency</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-purple-500 mr-2 mt-0.5" />
                      <span>Business plan (some provide templates)</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-purple-500 mr-2 mt-0.5" />
                      <span>Financial statements or personal finance</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 bg-gray-50 rounded-lg">
                  <h3 className="font-bold text-lg mb-4 flex items-center">
                    <Briefcase className="w-5 h-5 text-indigo-600 mr-2" />
                    Project-Specific
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-indigo-500 mr-2 mt-0.5" />
                      <span>Project budget and timeline</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-indigo-500 mr-2 mt-0.5" />
                      <span>Quotes from suppliers (logistics noted)</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-indigo-500 mr-2 mt-0.5" />
                      <span>Indigenous ownership documentation (if applicable)</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-indigo-500 mr-2 mt-0.5" />
                      <span>Community impact statement</span>
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
              <h2 className="text-3xl font-bold mb-6">How Long Does Approval Take?</h2>

              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-purple-50">
                      <th className="border border-gray-200 px-4 py-3 text-left">Program Type</th>
                      <th className="border border-gray-200 px-4 py-3 text-left">Review Timeline</th>
                      <th className="border border-gray-200 px-4 py-3 text-left">First Payment</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3">Small Territorial Grants</td>
                      <td className="border border-gray-200 px-4 py-3">2-4 weeks</td>
                      <td className="border border-gray-200 px-4 py-3">Upon approval</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3">Standard Programs</td>
                      <td className="border border-gray-200 px-4 py-3">30-60 days</td>
                      <td className="border border-gray-200 px-4 py-3">Milestone basis</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3">CanNor (Federal)</td>
                      <td className="border border-gray-200 px-4 py-3">60-90 days</td>
                      <td className="border border-gray-200 px-4 py-3">Contribution agreement</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                <p className="text-gray-700">
                  <strong>Note:</strong> Northern programs generally have more flexible
                  timelines than southern equivalents. Staff often work directly with
                  applicants to resolve issues rather than rejecting applications outright.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Common Mistakes Section */}
        <section id="mistakes" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">What Are Common Mistakes to Avoid?</h2>

              <div className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="text-red-600 font-bold">1</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">Underestimating Northern Logistics</h3>
                        <p className="text-gray-600 mt-1">
                          Budgets that don&apos;t account for higher northern costs
                          (shipping, seasonal access, labor) raise red flags. Reviewers
                          expect realistic northern pricing.
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
                        <h3 className="font-bold text-lg">Overlooking Community Impact</h3>
                        <p className="text-gray-600 mt-1">
                          Northern programs heavily weight community benefit. Applications
                          focusing solely on business profit without addressing community
                          employment or services score lower.
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
                        <h3 className="font-bold text-lg">Not Engaging Early</h3>
                        <p className="text-gray-600 mt-1">
                          Unlike competitive southern programs, northern offices often
                          work collaboratively with applicants. Submitting without prior
                          consultation misses valuable guidance.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Indigenous Business Programs Section */}
        <section id="indigenous" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">What Indigenous business programs are available?</h2>

              <p className="text-gray-700 mb-6">
                Indigenous entrepreneurs in the territories have access to additional funding
                streams. These programs recognize the importance of Indigenous economic
                participation and traditional economy integration.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Aboriginal Business Canada (CanNor)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Up to $300K for Indigenous businesses</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Youth entrepreneurship focus</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Cultural and arts enterprises</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Indigenous Loan Funds</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Dana Naye Ventures (Yukon)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>Nunavut Development Corporation</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span>NWT Aboriginal Financing Fund</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Industry Focus Section */}
        <section id="industries" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Which industries get funding in the Territories?</h2>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <Mountain className="w-8 h-8 text-purple-600 mb-3" />
                  <h3 className="font-bold mb-2">Natural Resources</h3>
                  <p className="text-sm text-gray-600">Mining, oil and gas services, renewable energy</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <MapPin className="w-8 h-8 text-teal-600 mb-3" />
                  <h3 className="font-bold mb-2">Tourism & Culture</h3>
                  <p className="text-sm text-gray-600">Aurora viewing, Indigenous tourism, adventure travel</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <Users className="w-8 h-8 text-orange-600 mb-3" />
                  <h3 className="font-bold mb-2">Community Services</h3>
                  <p className="text-sm text-gray-600">Essential services, construction, logistics</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <Leaf className="w-8 h-8 text-green-600 mb-3" />
                  <h3 className="font-bold mb-2">Traditional Economy</h3>
                  <p className="text-sm text-gray-600">Arts and crafts, harvesting, cultural enterprises</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <Globe className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="font-bold mb-2">IT & Remote Work</h3>
                  <p className="text-sm text-gray-600">Telecom, IT services, remote knowledge work</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <TrendingUp className="w-8 h-8 text-indigo-600 mb-3" />
                  <h3 className="font-bold mb-2">Film & Media</h3>
                  <p className="text-sm text-gray-600">Production services, northern content creation</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Alternatives Section */}
        <section id="alternatives" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">What if I don't qualify for Territories grants?</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded-lg border">
                  <h3 className="font-bold text-lg mb-3">CanNor Federal Programs</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Federal northern agency provides substantial funding that complements
                    territorial programs. Often used for larger projects.
                  </p>
                  <Link href="/blog/canada-federal-grants" className="text-purple-700 hover:underline text-sm">
                    Learn about Federal Grants →
                  </Link>
                </div>

                <div className="p-6 bg-white rounded-lg border">
                  <h3 className="font-bold text-lg mb-3">Indigenous Development Corporations</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Many Indigenous nations and Inuit organizations operate their own
                    business development funds and economic development programs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="faqs" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqData.map((faq, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <h3 className="font-bold text-lg flex items-start">
                        <HelpCircle className="w-5 h-5 text-purple-600 mr-2 mt-1 flex-shrink-0" />
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

        {/* Common Questions Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Common Questions About Territories Grants</h2>
              <div className="space-y-4">
                <a href="#programs" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <span className="font-medium text-purple-700">What grants are available in each territory?</span>
                </a>
                <a href="#eligibility" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <span className="font-medium text-purple-700">Who is eligible for territories business grants?</span>
                </a>
                <a href="#indigenous" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <span className="font-medium text-purple-700">What Indigenous business programs are available?</span>
                </a>
                <a href="#how-much" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <span className="font-medium text-purple-700">How much grant funding can territories businesses get?</span>
                </a>
                <a href="#faqs" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <span className="font-medium text-purple-700">Can I get territorial and federal funding together?</span>
                </a>
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
                <Link href="/blog/canada-federal-grants" className="flex items-center p-4 bg-white rounded-lg border hover:border-purple-500 hover:shadow-md transition-all group">
                  <BookOpen className="w-5 h-5 text-purple-600 mr-3" />
                  <span className="text-gray-700 group-hover:text-purple-600">Federal Grants for Canadian Businesses</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                </Link>
                <Link href="/blog/bc-small-business-grants-guide" className="flex items-center p-4 bg-white rounded-lg border hover:border-purple-500 hover:shadow-md transition-all group">
                  <BookOpen className="w-5 h-5 text-purple-600 mr-3" />
                  <span className="text-gray-700 group-hover:text-purple-600">BC Business Grants</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                </Link>
                <Link href="/blog/alberta-small-business-grants-guide" className="flex items-center p-4 bg-white rounded-lg border hover:border-purple-500 hover:shadow-md transition-all group">
                  <BookOpen className="w-5 h-5 text-purple-600 mr-3" />
                  <span className="text-gray-700 group-hover:text-purple-600">Alberta Business Grants</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                </Link>
                <Link href="/guides" className="flex items-center p-4 bg-white rounded-lg border hover:border-purple-500 hover:shadow-md transition-all group">
                  <BookOpen className="w-5 h-5 text-purple-600 mr-3" />
                  <span className="text-gray-700 group-hover:text-purple-600">All Grant Application Guides</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Strong CTA Section */}
        <section className="py-20 bg-gradient-to-r from-purple-600 to-indigo-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-6">
                Navigate Northern Canada&apos;s Unique Business Environment
              </h2>
              <p className="text-xl text-purple-100 mb-8">
                Our northern specialists have secured over $2.8M for territorial businesses.
                Get expert guidance on territorial and federal programs designed for the North.
              </p>
              <div className="bg-white/10 rounded-lg p-6 mb-8">
                <h4 className="font-semibold mb-4">Our Territories Grant Success Package Includes:</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>All three territories coverage</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Remote and northern business expertise</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Indigenous business development guidance</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Territorial government relationships</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>83% success rate for northern businesses</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>CanNor and territorial stacking expertise</span>
                  </div>
                </div>
              </div>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-4" asChild>
                <Link href="/contact?service=territories-grants-expert-help">
                  Get Expert Help with Territories Grants
                </Link>
              </Button>
              <p className="text-purple-200 text-sm mt-4">
                Free consultation • Northern specialists • Remote business expertise
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
