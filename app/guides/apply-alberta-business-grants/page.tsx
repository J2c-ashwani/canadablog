import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, FileText, DollarSign, Target, AlertCircle, Download, Building, Users, Shield, Award, TrendingUp, Zap, MessageCircle, HelpCircle, ExternalLink, Lightbulb, ArrowRight, Leaf, Flame } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Alberta Business Grants 2025: Complete Application Guide | Alberta Innovates, ERA, PrairiesCan",
  description: "Complete step-by-step guide to applying for Alberta business grants and provincial funding. Get Alberta application templates, energy innovation strategies, and frameworks for Alberta Innovates, ERA, and economic diversification programs.",
  keywords: "Alberta business grants, Alberta Innovates application, ERA funding, Alberta energy innovation grants, PrairiesCan Alberta, how to apply Alberta government grants",
  alternates: {
    canonical: "https://www.fsidigital.ca/guides/apply-alberta-business-grants",
  },
  openGraph: {
    title: "Alberta Business Grants Application Guide 2025 | Energy & Innovation Funding",
    description: "Step-by-step guide with templates and strategies for successful Alberta provincial funding applications.",
    url: "https://www.fsidigital.ca/guides/apply-alberta-business-grants",
    images: ["/og-image.png"],
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Alberta Innovates and who is eligible?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Alberta Innovates is the provincial agency supporting technology commercialization and innovation. Eligible applicants include Alberta-based tech companies, research partnerships, and businesses developing innovative solutions. They focus on health, energy, ag-tech, and emerging technologies."
      }
    },
    {
      "@type": "Question",
      "name": "What is Emissions Reduction Alberta (ERA)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ERA is Alberta's largest funder of clean technology, investing carbon levy revenues into projects that reduce greenhouse gas emissions. They fund projects in energy efficiency, methane reduction, carbon capture, and industrial transformation with grants ranging from $500K to $15M+."
      }
    },
    {
      "@type": "Question",
      "name": "How long does the Alberta grant application process take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Timelines vary by program: Alberta Innovates accelerators take 6-10 weeks; ERA competitive challenges run on set timelines (typically 12-16 weeks); and economic diversification grants typically take 8-12 weeks."
      }
    },
    {
      "@type": "Question",
      "name": "Can I combine Alberta provincial grants with federal funding?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! Alberta businesses frequently stack provincial funding with federal programs like IRAP, SR&ED, and PrairiesCan. This is encouraged and can significantly increase total funding available for your project."
      }
    },
    {
      "@type": "Question",
      "name": "What makes Alberta funding unique compared to other provinces?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Alberta uniquely emphasizes energy sector transformation, clean technology for heavy industry, and economic diversification. ERA's focus on emission reduction is unmatched in Canada, and Alberta Innovates has deep connections to the oil & gas industry for technology adoption."
      }
    },
    {
      "@type": "Question",
      "name": "What is PrairiesCan and how does it work with Alberta programs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "PrairiesCan (formerly Western Economic Diversification) is the federal regional development agency. They provide complementary funding for innovation, clean growth, and community development. Alberta businesses often stack PrairiesCan with provincial programs for larger total packages."
      }
    }
  ]
}

export default function AlbertaBusinessGrantsGuide() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-orange-600 to-orange-800 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30">
                🛢️ Energy Province Business Funding Guide 2025
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
                How to Apply for Alberta Business Grants
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-orange-100 leading-relaxed text-pretty">
                Step-by-step guide to successfully applying for Alberta provincial business grants and energy innovation funding.
                Complete with program-specific templates, clean technology strategies, and proven application frameworks.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                  <Link href="#programs">
                    View Programs
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-orange-700/30 border-white/30 text-white hover:bg-white/20" asChild>
                  <Link href="#timeline">
                    See Timeline
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* QUERY HOOK: Common Questions */}
        <div className="bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm/50">
          <div className="container mx-auto px-4 py-4">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-gray-600 gap-4">
              <span className="font-semibold text-gray-900 flex items-center">
                <MessageCircle className="w-4 h-4 mr-2 text-orange-600" />
                Common Questions:
              </span>
              <div className="flex gap-4 overflow-x-auto no-scrollbar whitespace-nowrap">
                <Link href="#alberta-innovates" className="hover:text-orange-600 transition-colors">Alberta Innovates?</Link>
                <Link href="#era" className="hover:text-orange-600 transition-colors">ERA Funding?</Link>
                <Link href="#timeline" className="hover:text-orange-600 transition-colors">How Long?</Link>
                <Link href="#eligibility" className="hover:text-orange-600 transition-colors">Who Qualifies?</Link>
                <Link href="#faq" className="hover:text-orange-600 transition-colors">FAQs</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Reference Stats */}
        <section className="py-12 bg-white border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">6-12 Weeks</div>
                  <div className="text-gray-600">Average Application Process</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">$15M Max</div>
                  <div className="text-gray-600">ERA Major Funding</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">$900M+</div>
                  <div className="text-gray-600">ERA Total Invested</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">Cleantech</div>
                  <div className="text-gray-600">Innovation Focus</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">

              {/* Understanding Alberta's Funding Ecosystem */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">How does the Alberta funding ecosystem work?</h2>

                <p className="text-gray-700 mb-6 leading-relaxed">
                  Alberta operates a unique funding ecosystem shaped by its energy dominance and aggressive diversification agenda.
                  Unlike other provinces, Alberta has specialized agencies focused on clean technology and industrial transformation,
                  reflecting its commitment to reducing emissions while maintaining economic competitiveness.
                </p>

                <div className="bg-orange-50 border border-orange-100 rounded-lg p-6 mb-6">
                  <div className="flex items-start">
                    <Flame className="w-8 h-8 text-orange-600 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-orange-900 mb-2">The Alberta Advantage: ERA + Energy Transition</h4>
                      <p className="text-orange-800 leading-relaxed">
                        Alberta's carbon levy funds the world's largest clean technology investment pool (ERA).
                        This creates substantial funding opportunities for companies developing emission reduction technologies,
                        particularly in oil & gas, heavy industry, and agriculture sectors.
                      </p>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4">Key Funding Agencies in Alberta</h3>

                <div className="space-y-4">
                  <div id="alberta-innovates" className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-gray-900">Alberta Innovates</h4>
                      <Badge variant="secondary">Innovation Hub</Badge>
                    </div>
                    <p className="text-sm text-gray-600">Provincial innovation agency supporting R&D, commercialization, and technology adoption across health, energy, ag-tech, and emerging sectors.</p>
                  </div>
                  <div id="era" className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-gray-900">Emissions Reduction Alberta (ERA)</h4>
                      <Badge variant="secondary">Clean Technology</Badge>
                    </div>
                    <p className="text-sm text-gray-600">World's largest investor in clean technology, funded by Alberta's carbon levy. Focuses on GHG reduction projects with over $900M invested to date.</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-gray-900">PrairiesCan (Federal)</h4>
                      <Badge variant="secondary">Regional Development</Badge>
                    </div>
                    <p className="text-sm text-gray-600">Federal regional agency supporting innovation, clean growth, and community development across Alberta, Saskatchewan, and Manitoba.</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-gray-900">Alberta Enterprise Corporation</h4>
                      <Badge variant="secondary">Venture Capital</Badge>
                    </div>
                    <p className="text-sm text-gray-600">Provincial VC fund-of-funds investing in Alberta-focused venture capital to support high-growth startups.</p>
                  </div>
                </div>
              </div>

              {/* Top Alberta Programs */}
              <div id="programs" className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">What are the top Alberta grant programs?</h2>

                <div className="space-y-6">
                  {/* ERA Programs */}
                  <div className="border border-green-200 rounded-lg p-6 bg-green-50/30">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-xl text-green-700 flex items-center">
                        <Leaf className="w-5 h-5 mr-2" />
                        Emissions Reduction Alberta (ERA)
                      </h3>
                      <Badge className="bg-green-100 text-green-800">Up to $15M</Badge>
                    </div>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      Alberta's flagship clean technology funding program. ERA invests carbon levy revenues into projects
                      that reduce greenhouse gas emissions. They've invested over $900M to date, leveraging $8.5B in total
                      project investment.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Priority Areas:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li className="flex items-start"><ArrowRight className="w-3 h-3 mr-2 mt-1 text-green-500" /> Oil & gas emission reduction</li>
                          <li className="flex items-start"><ArrowRight className="w-3 h-3 mr-2 mt-1 text-green-500" /> Carbon capture & storage (CCUS)</li>
                          <li className="flex items-start"><ArrowRight className="w-3 h-3 mr-2 mt-1 text-green-500" /> Industrial electrification</li>
                          <li className="flex items-start"><ArrowRight className="w-3 h-3 mr-2 mt-1 text-green-500" /> Methane reduction</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Funding Model:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li className="flex items-start"><CheckCircle className="w-3 h-3 mr-2 mt-1 text-green-500" /> Competitive challenges (set deadlines)</li>
                          <li className="flex items-start"><CheckCircle className="w-3 h-3 mr-2 mt-1 text-green-500" /> Targeted calls for specific sectors</li>
                          <li className="flex items-start"><CheckCircle className="w-3 h-3 mr-2 mt-1 text-green-500" /> Cost-effectiveness metric ($/tonne CO2)</li>
                          <li className="flex items-start"><CheckCircle className="w-3 h-3 mr-2 mt-1 text-green-500" /> Non-repayable grants</li>
                        </ul>
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded border border-green-100 text-sm">
                      <strong className="text-green-800">Pro Tip:</strong> ERA evaluates projects primarily on cost-per-tonne
                      of GHG reduced. Quantify your emission reduction potential clearly—projects with strong $/tonne metrics
                      win more often.
                    </div>
                  </div>

                  {/* Alberta Innovates Programs */}
                  <div className="border border-orange-200 rounded-lg p-6 bg-orange-50/30">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-xl text-orange-700 flex items-center">
                        <Zap className="w-5 h-5 mr-2" />
                        Alberta Innovates
                      </h3>
                      <Badge className="bg-orange-100 text-orange-800">Various</Badge>
                    </div>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      Provincial innovation agency with multiple program streams supporting technology development,
                      commercialization, and adoption. Strong focus on health, energy, agriculture, and emerging technologies.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Key Programs:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Scaleup and Growth Accelerator</li>
                          <li>• Technology Development Programs</li>
                          <li>• Industry Challenges & Partnerships</li>
                          <li>• Digital Innovation Initiatives</li>
                          <li>• Clean Tech & Energy Programs</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Focus Sectors:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Health & Life Sciences</li>
                          <li>• Energy & Environment</li>
                          <li>• Agriculture & Food Technology</li>
                          <li>• Digital & Emerging Tech</li>
                          <li>• Advanced Manufacturing</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* PrairiesCan */}
                  <div className="border border-blue-200 rounded-lg p-6 bg-blue-50/30">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-xl text-blue-700 flex items-center">
                        <Building className="w-5 h-5 mr-2" />
                        PrairiesCan (Federal)
                      </h3>
                      <Badge className="bg-blue-100 text-blue-800">Regional Federal</Badge>
                    </div>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      Federal regional development agency covering Alberta, Saskatchewan, and Manitoba. Provides complementary
                      funding that can be stacked with provincial programs for larger total packages.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-white p-3 rounded">
                        <h5 className="font-semibold text-gray-900 mb-1 text-sm">Innovation</h5>
                        <p className="text-xs text-gray-600">R&D, commercialization, tech adoption</p>
                      </div>
                      <div className="bg-white p-3 rounded">
                        <h5 className="font-semibold text-gray-900 mb-1 text-sm">Clean Growth</h5>
                        <p className="text-xs text-gray-600">Sustainability, emission reduction</p>
                      </div>
                      <div className="bg-white p-3 rounded">
                        <h5 className="font-semibold text-gray-900 mb-1 text-sm">Community</h5>
                        <p className="text-xs text-gray-600">Rural & Indigenous development</p>
                      </div>
                    </div>
                  </div>

                  {/* Alberta Enterprise Corporation */}
                  <div className="border border-purple-200 rounded-lg p-6 bg-purple-50/30">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-xl text-purple-700 flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2" />
                        Alberta Enterprise Corporation
                      </h3>
                      <Badge className="bg-purple-100 text-purple-800">Venture Capital</Badge>
                    </div>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      Provincial fund-of-funds that invests in Alberta-focused venture capital. Not a direct grant program,
                      but increases VC availability for high-growth Alberta startups.
                    </p>
                    <div className="bg-white p-3 rounded border border-purple-100 text-sm">
                      <strong className="text-purple-800">How It Helps:</strong> AEC-backed VCs are more likely to invest
                      in Alberta companies. Get introductions through Alberta Innovates or accelerator programs.
                    </div>
                  </div>
                </div>
              </div>

              {/* Application Timeline */}
              <div id="timeline" className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">How long does the Alberta application process take?</h2>

                <p className="text-gray-700 mb-6 leading-relaxed">
                  Timeline varies by program. ERA runs competitive challenges with set deadlines, while Alberta Innovates
                  has more flexible intake processes for some programs.
                </p>

                <div className="relative border-l-2 border-orange-100 pl-8 ml-4 space-y-8">
                  <div className="relative">
                    <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-orange-600 border-4 border-white shadow-sm flex items-center justify-center text-white text-xs font-bold">1</div>
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Program Selection & Eligibility</h4>
                    <p className="text-gray-600 mb-2">Week 1-2</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Contact Alberta Innovates or ERA</li>
                      <li>• Identify open challenges/intake windows</li>
                      <li>• Complete eligibility pre-screening</li>
                    </ul>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-orange-600 border-4 border-white shadow-sm flex items-center justify-center text-white text-xs font-bold">2</div>
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Business Case Development</h4>
                    <p className="text-gray-600 mb-2">Week 2-6</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Develop emission reduction quantification (ERA)</li>
                      <li>• Prepare innovation/technology documentation</li>
                      <li>• Build financial projections and budget</li>
                    </ul>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-orange-600 border-4 border-white shadow-sm flex items-center justify-center text-white text-xs font-bold">3</div>
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Application Submission</h4>
                    <p className="text-gray-600 mb-2">Week 6-8</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Complete all application forms</li>
                      <li>• Submit by challenge deadline (ERA)</li>
                      <li>• Respond to clarification requests</li>
                    </ul>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-green-600 border-4 border-white shadow-sm flex items-center justify-center text-white text-xs font-bold">4</div>
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Review & Funding Decision</h4>
                    <p className="text-gray-600 mb-2">Week 8-12+</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Technical and business merit review</li>
                      <li>• Panel evaluation (ERA challenges)</li>
                      <li>• Funding agreement negotiation</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="py-3 px-4 text-left font-semibold text-gray-900">Program</th>
                        <th className="py-3 px-4 text-left font-semibold text-gray-900">Typical Timeline</th>
                        <th className="py-3 px-4 text-left font-semibold text-gray-900">Key Factor</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="py-3 px-4 text-gray-700">Alberta Innovates Accelerators</td>
                        <td className="py-3 px-4 text-gray-600">6-10 weeks</td>
                        <td className="py-3 px-4 text-gray-500">Cohort start dates</td>
                      </tr>
                      <tr className="bg-gray-50/50">
                        <td className="py-3 px-4 text-gray-700">ERA Competitive Challenges</td>
                        <td className="py-3 px-4 text-gray-600">12-16 weeks</td>
                        <td className="py-3 px-4 text-gray-500">Challenge deadlines</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-gray-700">PrairiesCan Innovation</td>
                        <td className="py-3 px-4 text-gray-600">10-14 weeks</td>
                        <td className="py-3 px-4 text-gray-500">Project complexity</td>
                      </tr>
                      <tr className="bg-gray-50/50">
                        <td className="py-3 px-4 text-gray-700">Economic Diversification</td>
                        <td className="py-3 px-4 text-gray-600">8-12 weeks</td>
                        <td className="py-3 px-4 text-gray-500">Intake availability</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Eligibility Section */}
              <div id="eligibility" className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Who is eligible for Alberta business grants?</h2>

                <p className="text-gray-700 mb-6 leading-relaxed">
                  Eligibility varies by program. ERA focuses specifically on emission reduction projects, while Alberta
                  Innovates has broader innovation requirements.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h4 className="font-bold text-green-800 mb-4 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Generally Eligible
                    </h4>
                    <ul className="text-green-700 space-y-2 text-sm">
                      <li>✓ Alberta-incorporated or federally incorporated with Alberta operations</li>
                      <li>✓ Businesses with innovation/technology component</li>
                      <li>✓ Projects with emission reduction potential (ERA)</li>
                      <li>✓ Good standing with provincial taxes</li>
                      <li>✓ Companies with matching investment capability</li>
                      <li>✓ Research partnerships with Alberta institutions</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h4 className="font-bold text-red-800 mb-4 flex items-center">
                      <AlertCircle className="w-5 h-5 mr-2" />
                      Generally Ineligible
                    </h4>
                    <ul className="text-red-700 space-y-2 text-sm">
                      <li>✗ Businesses with no Alberta operations</li>
                      <li>✗ Projects without innovation component</li>
                      <li>✗ Operational/routine activities (not R&D)</li>
                      <li>✗ Businesses in arrears with government</li>
                      <li>✗ Projects already started (most programs)</li>
                      <li>✗ Projects without emission reduction (ERA)</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Common Mistakes */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">What are common Alberta application mistakes?</h2>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-red-700 flex items-center">
                      <AlertCircle className="w-5 h-5 mr-2" />
                      Application Killers
                    </h4>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</div>
                        <div>
                          <strong>Weak Emission Quantification</strong>
                          <p className="text-sm text-gray-600">ERA requires credible GHG reduction estimates</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</div>
                        <div>
                          <strong>Poor Cost-Effectiveness</strong>
                          <p className="text-sm text-gray-600">High $/tonne CO2 metrics hurt ERA applications</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</div>
                        <div>
                          <strong>Missing Innovation Element</strong>
                          <p className="text-sm text-gray-600">Must show technology advancement, not just adoption</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-orange-700 flex items-center">
                      <AlertCircle className="w-5 h-5 mr-2" />
                      Process Errors
                    </h4>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</div>
                        <div>
                          <strong>Missing Challenge Deadlines</strong>
                          <p className="text-sm text-gray-600">ERA challenges have fixed deadlines—no extensions</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</div>
                        <div>
                          <strong>Wrong Program Selection</strong>
                          <p className="text-sm text-gray-600">ERA vs. Alberta Innovates have different focuses</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</div>
                        <div>
                          <strong>Ignoring PrairiesCan Stacking</strong>
                          <p className="text-sm text-gray-600">Not maximizing federal/provincial combinations</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* FAQ Block */}
              <div id="faq" className="bg-gray-50 rounded-xl p-8 mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <HelpCircle className="w-6 h-6 text-orange-600 mr-2" />
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-2">What makes Alberta funding different?</h3>
                    <p className="text-gray-600">Alberta uniquely emphasizes energy sector transformation and has ERA—the world's largest single investor in clean technology. Projects reducing emissions in oil & gas or heavy industry have strong advantages.</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-2">How competitive are ERA challenges?</h3>
                    <p className="text-gray-600">Very competitive. ERA typically funds 10-20% of applications. Success depends heavily on credible emission reduction quantification and strong cost-effectiveness metrics ($/tonne).</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-2">Can non-energy companies apply?</h3>
                    <p className="text-gray-600">Yes! Alberta Innovates supports health, ag-tech, digital, and advanced manufacturing. ERA also funds projects in agriculture, transportation, and buildings—not just oil & gas.</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-2">Are Alberta grants taxable?</h3>
                    <p className="text-gray-600">Yes, business grants are generally taxable income. Consult an accountant to understand the implications and plan accordingly.</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-2">How do I find open ERA challenges?</h3>
                    <p className="text-gray-600">ERA publishes challenges on their website eralberta.ca. Subscribe to their newsletter for announcements. Challenges typically open 2-4 times per year.</p>
                  </div>
                </div>
              </div>

              {/* Neural Network: Related Guides */}
              <div className="border-t border-gray-200 pt-12 mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Explore Related Funding Opportunities</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <Link href="/guides/apply-ontario-business-grants" className="group block">
                    <div className="bg-white border hover:border-red-300 rounded-lg p-4 transition-all hover:shadow-md h-full">
                      <div className="text-sm text-red-600 font-semibold mb-2">Provincial Peer</div>
                      <h4 className="font-bold text-gray-900 group-hover:text-red-700 mb-2">Ontario Business Grants</h4>
                      <p className="text-sm text-gray-500">Compare Alberta with Ontario's diverse program ecosystem.</p>
                    </div>
                  </Link>
                  <Link href="/guides/irap-innovation-application-guide" className="group block">
                    <div className="bg-white border hover:border-purple-300 rounded-lg p-4 transition-all hover:shadow-md h-full">
                      <div className="text-sm text-purple-600 font-semibold mb-2">Federal Stacking</div>
                      <h4 className="font-bold text-gray-900 group-hover:text-purple-700 mb-2">IRAP Grant Guide</h4>
                      <p className="text-sm text-gray-500">Stack Alberta funding with federal IRAP for R&D projects.</p>
                    </div>
                  </Link>
                  <Link href="/guides/sred-application-guide" className="group block">
                    <div className="bg-white border hover:border-green-300 rounded-lg p-4 transition-all hover:shadow-md h-full">
                      <div className="text-sm text-green-600 font-semibold mb-2">Tax Credits</div>
                      <h4 className="font-bold text-gray-900 group-hover:text-green-700 mb-2">SR&ED Guide</h4>
                      <p className="text-sm text-gray-500">Recover R&D costs with federal and Alberta tax credits.</p>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Official Resources */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Official Alberta Resources</h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-orange-200 shadow-none">
                    <CardHeader>
                      <CardTitle className="text-orange-800 text-lg flex items-center">
                        <Zap className="w-5 h-5 mr-2" />
                        Alberta Innovates
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-600">Innovation programs, accelerators, and technology commercialization support.</p>
                      <Button size="sm" variant="outline" className="w-full justify-between" asChild>
                        <Link href="https://albertainnovates.ca/" target="_blank" rel="noopener noreferrer">
                          Visit Alberta Innovates <ExternalLink className="w-3 h-3 ml-2" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-green-200 shadow-none">
                    <CardHeader>
                      <CardTitle className="text-green-800 text-lg flex items-center">
                        <Leaf className="w-5 h-5 mr-2" />
                        Emissions Reduction Alberta
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-600">Clean technology funding, challenges, and emission reduction project support.</p>
                      <Button size="sm" className="w-full justify-between bg-green-600 hover:bg-green-700 text-white" asChild>
                        <Link href="https://www.eralberta.ca/" target="_blank" rel="noopener noreferrer">
                          Visit ERA <ExternalLink className="w-3 h-3 ml-2" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* CTA Section */}
              <div className="bg-gradient-to-r from-orange-700 to-orange-800 rounded-xl p-8 text-white text-center">
                <h3 className="text-2xl font-bold mb-4">Need Help with Your Alberta Application?</h3>
                <p className="text-orange-100 mb-6 max-w-xl mx-auto">
                  Our Alberta funding specialists have helped secure over $11M in provincial funding.
                  Get expert guidance through Alberta Innovates, ERA, and PrairiesCan applications.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-white text-orange-800 hover:bg-orange-50 font-semibold" asChild>
                    <Link href="/contact?service=alberta-business-expert-help">
                      Get Expert Help
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" asChild>
                    <Link href="/grant-finder">
                      Browse All Programs
                    </Link>
                  </Button>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
