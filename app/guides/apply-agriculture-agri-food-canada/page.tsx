import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, FileText, DollarSign, Target, AlertCircle, Download, Building, Users, Shield, Award, TrendingUp, Leaf, MessageCircle, HelpCircle, ArrowRight, ExternalLink } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Agriculture & Agri-Food Canada Application Guide 2025 | Federal Funding",
  description: "Step-by-step guide to applying for AAFC federal funding. Get application templates, AgriInnovate strategies, and compliance checklists.",
  keywords: "Agriculture Agri-Food Canada application, AAFC funding guide, AgriInnovate application, AgriScience program, farm grants Canada, agricultural funding process",
  alternates: {
    canonical: "https://www.fsidigital.ca/guides/apply-agriculture-agri-food-canada",
  },
  openGraph: {
    title: "Agriculture & Agri-Food Canada Application Guide 2025 | Federal Funding",
    description: "Step-by-step guide with templates and strategies for successful AAFC federal funding applications.",
    url: "https://www.fsidigital.ca/guides/apply-agriculture-agri-food-canada",
    images: ["/og-image.png"],
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Who is eligible for AAFC funding?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Eligibility varies by program but generally includes for-profit companies, cooperatives, and non-profit organizations operating in the agriculture, agri-food, and agri-based products sectors. Applicants must be legal entities capable of entering into legally binding agreements."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between AgriInnovate and AgriScience?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AgriScience focuses on pre-commercial research and development (science-based). AgriInnovate focuses on the commercialization and adoption of innovative technologies that are already developed but need help reaching the market."
      }
    },
    {
      "@type": "Question",
      "name": "Is AAFC funding repayable?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It depends. AgriInnovate contributions are typically repayable (interest-free loans), while AgriScience contributions are often non-repayable (grants). Review the specific terms of the stream you are applying to."
      }
    },
    {
      "@type": "Question",
      "name": "How long does the application process take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The process can take 4-6 months or longer. It typically involves a pre-screening form, followed by a full application invitation. Due diligence and final approval add to the timeline."
      }
    },
    {
      "@type": "Question",
      "name": "Can I stack AAFC funding with other grants?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, stacking is generally permitted up to a certain limit (often 75% or 90% of total project costs). You must disclose all other funding sources in your application."
      }
    }
  ]
}

export default function AgricultureAgriFoodGuide() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-700 to-emerald-900 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30">
                🌾 Federal Agricultural Funding Guide
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
                Agriculture & Agri-Food Canada Application Guide
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-green-100 leading-relaxed text-pretty">
                The complete guide to securing AAFC federal funding. Master the application process for AgriInnovate,
                AgriScience, and other key agricultural programs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                  <Link href="#programs">
                    View Programs
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-green-700/30 border-white/30 text-white hover:bg-white/20" asChild>
                  <Link href="/blog/agriculture-agri-food-canada-government-grants">
                    Back to Overview
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
                <MessageCircle className="w-4 h-4 mr-2 text-green-700" />
                Quick Links:
              </span>
              <div className="flex gap-4 overflow-x-auto no-scrollbar whitespace-nowrap">
                <Link href="#programs" className="hover:text-green-700 transition-colors">Programs</Link>
                <Link href="#process" className="hover:text-green-700 transition-colors">timeline</Link>
                <Link href="#strategies" className="hover:text-green-700 transition-colors">Strategies</Link>
                <Link href="#mistakes" className="hover:text-green-700 transition-colors">Mistakes</Link>
                <Link href="#faq" className="hover:text-green-700 transition-colors">FAQs</Link>
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
                  <div className="text-3xl font-bold text-green-700 mb-2">Multi-Year</div>
                  <div className="text-gray-600">Funding Agreements</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">$10M+</div>
                  <div className="text-gray-600">Max Project Value</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">Repayable</div>
                  <div className="text-gray-600">For Commercial Projects</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">Sector</div>
                  <div className="text-gray-600">Must be Agri-Focused</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Program Selection */}
        <section id="programs" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Choose Your AAFC Program Stream</h2>

              <div className="space-y-6">
                <Card className="border-green-200">
                  <CardHeader>
                    <div className="flex items-center">
                      <Leaf className="w-6 h-6 text-green-600 mr-3" />
                      <CardTitle>AgriInnovate Program</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h6 className="font-semibold mb-2">Purpose:</h6>
                        <p className="text-sm text-gray-600">
                          To accelerate the commercialization, adoption, and demonstration of innovative products, technologies, processes, or services.
                        </p>
                      </div>
                      <div>
                        <h6 className="font-semibold mb-2">Key Features:</h6>
                        <ul className="text-sm space-y-1 text-gray-600">
                          <li>• Repayable contributions (interest-free loans)</li>
                          <li>• Upcoming technology adoption focus</li>
                          <li>• Must be "new to Canada" or "new to world"</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-200">
                  <CardHeader>
                    <div className="flex items-center">
                      <Target className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle>AgriScience Program</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h6 className="font-semibold mb-2">Purpose:</h6>
                        <p className="text-sm text-gray-600">
                          To support pre-commercial science and research. Often organized into "Clusters" (industry-led) or "Projects" (single recipient).
                        </p>
                      </div>
                      <div>
                        <h6 className="font-semibold mb-2">Key Features:</h6>
                        <ul className="text-sm space-y-1 text-gray-600">
                          <li>• Non-repayable contributions (grants)</li>
                          <li>• Research center collaboration required</li>
                          <li>• Long-term scientific study focus</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Application Process Timeline */}
        <section id="process" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">The Application Timeline</h2>
              <div className="space-y-8">

                {/* Phase 1 */}
                <Card className="border-green-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-green-700">Phase 1: Pre-Screening</CardTitle>
                      <Badge className="bg-green-100 text-green-800">Month 1</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm text-gray-600">
                      <li className="flex items-start">
                        <FileText className="w-5 h-5 text-green-500 mr-2" />
                        <div>
                          <strong>Applicant Guide Review:</strong> Carefully read the specific Applicant Guide for your stream. AAFC guides are very detailed.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Target className="w-5 h-5 text-green-500 mr-2" />
                        <div>
                          <strong>Pre-Screening Form:</strong> Most programs require a short Project Summary Form to determine eligibility before you can submit a full application.
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Phase 2 */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-blue-700">Phase 2: Full Application</CardTitle>
                      <Badge className="bg-blue-100 text-blue-800">Months 2-3</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h6 className="font-semibold mb-2">Required Docs:</h6>
                        <ul className="text-sm space-y-1 text-gray-600">
                          <li>• Full Project Proposal</li>
                          <li>• Detailed Budget (Cost Breakdown)</li>
                          <li>• Work Plan (Gantt Chart)</li>
                          <li>• Financial Statements (2-3 years)</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="font-semibold mb-2">Strategic Focus:</h6>
                        <p className="text-sm text-gray-600">
                          Focus on the "Benefits to Canada." How will this project increase agricultural exports, reduce carbon footprint, or create rural jobs?
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Phase 3 */}
                <Card className="border-purple-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-purple-700">Phase 3: Approval & Reporting</CardTitle>
                      <Badge className="bg-purple-100 text-purple-800">Months 4+</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Once approved, you will sign a Contribution Agreement.
                    </p>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h5 className="font-bold text-purple-900 mb-2">Reporting Obligations:</h5>
                      <ul className="space-y-2 text-sm text-purple-800">
                        <li>• <strong>Financial Claims:</strong> Submitted quarterly or monthly.</li>
                        <li>• <strong>Performance Reports:</strong> Annual updates on project metrics.</li>
                        <li>• <strong>Final Report:</strong> Comprehensive summary at project end.</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

              </div>
            </div>
          </div>
        </section>

        {/* Success Strategies */}
        <section id="strategies" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Sector-Specific Application Strategies</h2>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center">
                      <Leaf className="w-6 h-6 text-green-600 mr-3" />
                      <CardTitle>Primary Production (Farms)</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-3">
                      <strong>Focus:</strong> Efficiency and Sustainability.
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
                      <li>Emphasize "Precision Agriculture" technologies.</li>
                      <li>Highlight reductions in fertilizer/water use (environmental benefit).</li>
                      <li>Calculate labor savings due to automation.</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center">
                      <Building className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle>Food Processing</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-3">
                      <strong>Focus:</strong> Product Innovation and Export.
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
                      <li>Are you making a product that replaces an import? (Import Substitution)</li>
                      <li>Are you extending shelf-life to reach new export markets?</li>
                      <li>Are you using waste streams to create new value (Circular Economy)?</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Common Mistakes */}
        <section id="mistakes" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Common Application Mistakes</h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-lg mb-4 text-red-700">❌ Eligibility Failures:</h4>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Not Innovative Enough:</strong>
                        <p className="text-sm text-gray-600">Buying standard production equipment usually doesn't qualify for AgriInnovate. It must be novel.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Wrong Sector:</strong>
                        <p className="text-sm text-gray-600">Project must clearly fall under agriculture or agri-food. Forestry or aquaculture may have separate programs or limitations.</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-lg mb-4 text-orange-700">⚠️ Process Failures:</h4>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-orange-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Incomplete Financials:</strong>
                        <p className="text-sm text-gray-600">AAFC requires robust financial proof (pro-forma statements) to ensure you can pay back the loan.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-orange-500 mr-3 mt-0.5" />
                      <div>
                        <strong>Missed Environmental Goals:</strong>
                        <p className="text-sm text-gray-600">Failing to quantify environmental benefits (e.g., "reduced GHG by X tonnes") weakens your case.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-left">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <HelpCircle className="w-6 h-6 text-green-700 mr-2" />
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-2">1. Can farm businesses apply?</h3>
                  <p className="text-gray-600 text-sm">Yes, primary producers are eligible for many AAFC programs (like <a href="https://agriculture.canada.ca/en/programs/agriscience" target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline">AgriScience</a>), provided the project involves innovation or adoption of new technology, not just routine expansion.</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-2">2. Are there grants for startups?</h3>
                  <p className="text-gray-600 text-sm">It is difficult for early-stage startups without revenue to qualify for AgriInnovate (repayable). Startups may look at AgriScience (if R&D focused) or partner with established firms.</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-2">3. What qualifies as "Innovative"?</h3>
                  <p className="text-gray-600 text-sm">"Innovative" generally means the technology or process is new to Canada or newly adapted for the agricultural sector. Off-the-shelf solutions are rarely funded.</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-2">4. Can I stack funding?</h3>
                  <p className="text-gray-600 text-sm">Yes. You can usually stack AAFC funding with provincial grants (like CAP/Sustainable CAP) up to a <strong>75% government funding limit</strong>. You must disclose all sources.</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-2">5. Do I need environmental benefits?</h3>
                  <p className="text-gray-600 text-sm">Increasingly, yes. Projects that reduce GHG emissions, water usage, or waste are prioritized under the new Sustainable CAP framework.</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-2">6. Is the funding taxable?</h3>
                  <p className="text-gray-600 text-sm">Yes. Government grants and non-repayable contributions are considered taxable income. Repayable contributions (loans) are generally not income, but you cannot deduct the repayment as an expense.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Neural Network: Related Guides */}
        <section className="py-16 bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Explore Related Funding</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <Link href="/guides/apply-regional-development-agencies" className="group block h-full">
                  <div className="bg-gray-50 border hover:border-blue-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-blue-600 font-semibold mb-2">Regional</div>
                    <h4 className="font-bold text-gray-900 group-hover:text-blue-700 mb-2">RDA Funding Guide</h4>
                    <p className="text-sm text-gray-500 flex-grow">Regional agencies often fund food processing and rural businesses.</p>
                    <div className="mt-3 text-xs text-blue-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
                <Link href="/guides/apply-small-business-grants" className="group block h-full">
                  <div className="bg-gray-50 border hover:border-green-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-green-600 font-semibold mb-2">Small Business</div>
                    <h4 className="font-bold text-gray-900 group-hover:text-green-700 mb-2">Small Business Grants</h4>
                    <p className="text-sm text-gray-500 flex-grow">General grants for hiring and digital adoption.</p>
                    <div className="mt-3 text-xs text-green-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
                <Link href="/guides/apply-sba-loans" className="group block h-full">
                  <div className="bg-gray-50 border hover:border-purple-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-purple-600 font-semibold mb-2">Loans</div>
                    <h4 className="font-bold text-gray-900 group-hover:text-purple-700 mb-2">CSBFP Loans</h4>
                    <p className="text-sm text-gray-500 flex-grow">Government-backed loans for equipment and land (often used by farms).</p>
                    <div className="mt-3 text-xs text-purple-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Get Expert Help CTA */}
        <section className="py-20 bg-gradient-to-r from-green-700 to-emerald-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-6">
                Need Help Branding or Applying?
              </h2>
              <p className="text-xl text-green-100 mb-8">
                AAFC applications can be complex. Our team of agricultural funding experts can help you navigate AgriInnovate and AgriScience.
              </p>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-4" asChild>
                <Link href="/contact?service=agriculture-expert-help">
                  Book a Consultation
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
