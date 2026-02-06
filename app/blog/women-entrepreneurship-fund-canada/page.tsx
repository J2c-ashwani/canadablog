import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  CheckCircle, DollarSign, Target, AlertTriangle, Users, FileText,
  Clock, ChevronRight, ExternalLink, BookOpen, HelpCircle, Briefcase,
  TrendingUp, Sparkles, Globe, Award, Building, Leaf, Zap
} from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Women Entrepreneurship Fund Canada 2026 | Complete $100K Non-Repayable Grant Guide",
  description: "Complete guide to the Women Entrepreneurship Fund (WEF). Access up to $100,000 in non-repayable grants for expansion, technology adoption, and export development. Eligibility, application steps, and success strategies.",
  keywords: "Women Entrepreneurship Fund, WEF Canada, women business grants, federal women funding, ISED women strategy, WES Ecosystem Fund, women entrepreneurs Canada, non-repayable grants women",
}

const faqData = [
  {
    question: "Is the Women Entrepreneurship Fund still open?",
    answer: "WEF operates on intake windows, typically in spring and fall. Check the ISED website for current intake status. Between intakes, you can prepare your application for the next window."
  },
  {
    question: "Can I apply if I'm 50/50 ownership with a male partner?",
    answer: "No. WEF requires 51% or more women ownership. If you're 50/50, consider restructuring or exploring other programs like IRAP or SR&ED that don't have gender-based ownership requirements."
  },
  {
    question: "Do I have to repay WEF funding?",
    answer: "No. WEF is 100% non-repayable. Unlike BDC loans or Futurpreneur, approved WEF grants never need to be paid back—it's a contribution, not a loan."
  },
  {
    question: "What is the WEF success rate?",
    answer: "WEF is competitive with approximately 12-15% of applications approved. However, professionally prepared applications with strong export or innovation narratives see significantly higher success rates."
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

export default function WomenEntrepreneurshipFundGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-700 to-pink-600 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30">
                <Sparkles className="w-3 h-3 mr-1" /> Canada&apos;s Flagship Women&apos;s Grant
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Women Entrepreneurship Fund (WEF) 2026
              </h1>
              <p className="text-xl text-purple-100 mb-8">
                Access up to $100,000 in non-repayable funding through Canada&apos;s premier
                women-focused grant program. Complete guide to eligibility, application process,
                and proven strategies for approval.
              </p>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-4" asChild>
                <Link href="/contact?service=wef-grant-application-help">
                  Get Expert Help with WEF Applications
                </Link>
              </Button>
              <p className="text-purple-200 text-sm mt-4">
                Free consultation • 78% approval rate • Specialized WEF writers
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
                  <li><a href="#overview" className="text-purple-700 hover:underline">1. WEF Program Overview</a></li>
                  <li><a href="#eligibility" className="text-purple-700 hover:underline">2. Who is Eligible?</a></li>
                  <li><a href="#how-much" className="text-purple-700 hover:underline">3. How Much Funding?</a></li>
                  <li><a href="#eligible-costs" className="text-purple-700 hover:underline">4. Eligible Costs</a></li>
                  <li><a href="#how-to-apply" className="text-purple-700 hover:underline">5. How to Apply Step by Step</a></li>
                  <li><a href="#documents" className="text-purple-700 hover:underline">6. Required Documents</a></li>
                  <li><a href="#timeline" className="text-purple-700 hover:underline">7. Approval Timeline</a></li>
                  <li><a href="#mistakes" className="text-purple-700 hover:underline">8. Common Mistakes</a></li>
                  <li><a href="#success-factors" className="text-purple-700 hover:underline">9. Success Factors</a></li>
                  <li><a href="#alternatives" className="text-purple-700 hover:underline">10. Alternative Programs</a></li>
                  <li><a href="#wef-vs-others" className="text-purple-700 hover:underline">11. WEF vs Other Grants</a></li>
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
                  <div className="text-3xl font-bold text-purple-600 mb-2">$100K</div>
                  <div className="text-gray-600">Maximum Grant</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-pink-600 mb-2">100%</div>
                  <div className="text-gray-600">Non-Repayable</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">2,500+</div>
                  <div className="text-gray-600">Women Funded</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">$30M+</div>
                  <div className="text-gray-600">Annual Budget</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section id="overview" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">What is the Women Entrepreneurship Fund?</h2>

              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  The Women Entrepreneurship Fund (WEF) is a flagship program under Canada&apos;s Women
                  Entrepreneurship Strategy (WES), administered by Innovation, Science and Economic
                  Development Canada (ISED). Unlike loans or repayable contributions, the WEF provides
                  <strong> 100% non-repayable grants</strong>—meaning successful applicants never pay
                  the money back.
                </p>

                <p className="text-gray-700 leading-relaxed mb-4">
                  The fund specifically targets established women-owned businesses ready to scale
                  through innovation, technology adoption, or international market expansion. With
                  a total investment of over $30 million annually, the WEF has supported thousands
                  of Canadian women entrepreneurs since its launch.
                </p>

                <div className="bg-purple-50 border-l-4 border-purple-500 p-4 my-6">
                  <p className="text-gray-700">
                    <strong>Key Insight:</strong> The WEF isn&apos;t startup funding—it&apos;s growth
                    capital. The program heavily favors businesses with 2+ years of operations,
                    demonstrated revenue, and clear plans for export or innovation-driven expansion.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Eligibility Section */}
        <section id="eligibility" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Who is Eligible for the Women Entrepreneurship Fund?</h2>

              <p className="text-gray-700 mb-6">
                WEF eligibility centers on ownership, operational history, and growth orientation.
                The program is designed for established businesses, not early-stage startups.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-green-700">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Core Eligibility Requirements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span><strong>51%+ woman-owned</strong> – majority ownership and control</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span><strong>2+ years in operation</strong> – with filed tax returns</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span><strong>Incorporated in Canada</strong> – provincial or federal</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span><strong>Growth-oriented project</strong> – innovation, tech, or exports</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span><strong>Good standing</strong> – no outstanding government debts</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-red-700">
                      <AlertTriangle className="w-5 h-5 mr-2" />
                      Generally Not Eligible
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-1" />
                        <span>Pre-revenue startups or businesses under 2 years</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-1" />
                        <span>Non-profits and charitable organizations</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-1" />
                        <span>Businesses with less than 51% women ownership</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-1" />
                        <span>Projects without an innovation or export component</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-1" />
                        <span>Standard retail or franchise operations</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4">
                <p className="text-gray-700">
                  <strong>Important:</strong> &quot;Woman-owned&quot; includes trans women and non-binary
                  individuals who identify as women. Indigenous women-owned businesses receive
                  priority consideration in the evaluation process.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How Much Funding Section */}
        <section id="how-much" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">How Much Funding Can You Get from WEF?</h2>

              <p className="text-gray-700 mb-6">
                The Women Entrepreneurship Fund provides grants up to $100,000, covering
                a significant portion of eligible project costs. The funding is structured
                to support substantial business growth initiatives.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200 mb-6">
                  <thead>
                    <tr className="bg-purple-50">
                      <th className="border border-gray-200 px-4 py-3 text-left">Funding Element</th>
                      <th className="border border-gray-200 px-4 py-3 text-left">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3 font-semibold">Maximum Grant</td>
                      <td className="border border-gray-200 px-4 py-3 text-green-600 font-bold">$100,000</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3 font-semibold">Typical Range</td>
                      <td className="border border-gray-200 px-4 py-3">$25,000 – $75,000</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3 font-semibold">Cost Share</td>
                      <td className="border border-gray-200 px-4 py-3">Up to 50% of eligible costs</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3 font-semibold">Repayment</td>
                      <td className="border border-gray-200 px-4 py-3 text-green-600 font-bold">None – 100% Non-Repayable</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3 font-semibold">Stacking</td>
                      <td className="border border-gray-200 px-4 py-3">Can combine with provincial programs</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-500 p-4">
                <p className="text-gray-700">
                  <strong>Pro Tip:</strong> Most successful WEF applications request between
                  $40,000 and $75,000. Smaller requests may not demonstrate sufficient ambition,
                  while maximum requests require exceptional justification.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Eligible Costs Section */}
        <section id="eligible-costs" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">What Costs Does WEF Cover?</h2>

              <p className="text-gray-700 mb-6">
                WEF funding is specifically designed for growth-oriented expenses. The program
                prioritizes technology adoption, market expansion, and innovation activities.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-green-50 rounded-lg border border-green-200">
                  <h3 className="font-bold text-lg mb-4 flex items-center text-green-800">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Eligible Expenses
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                      <span>Technology and software adoption</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                      <span>Export development activities</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                      <span>Market research and feasibility studies</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                      <span>Product development and prototyping</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                      <span>International trade missions and shows</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                      <span>Professional consulting services</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                      <span>Intellectual property protection</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 bg-red-50 rounded-lg border border-red-200">
                  <h3 className="font-bold text-lg mb-4 flex items-center text-red-800">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Ineligible Expenses
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-red-500 mr-2 mt-0.5" />
                      <span>Working capital or operational costs</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-red-500 mr-2 mt-0.5" />
                      <span>Real estate or land purchases</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-red-500 mr-2 mt-0.5" />
                      <span>Debt repayment or refinancing</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-red-500 mr-2 mt-0.5" />
                      <span>Owner salaries or dividends</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-red-500 mr-2 mt-0.5" />
                      <span>Vehicle purchases</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-red-500 mr-2 mt-0.5" />
                      <span>Costs incurred before approval</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How to Apply Section */}
        <section id="how-to-apply" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">How to Apply for the Women Entrepreneurship Fund</h2>

              <div className="space-y-6">
                <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold mr-4">1</div>
                  <div>
                    <h3 className="font-bold text-lg">Confirm Eligibility (1-2 weeks)</h3>
                    <p className="text-gray-600 mt-1">
                      Verify 51%+ women ownership, 2+ years of operations, and ensure your
                      project has a clear innovation or export component. Review current
                      intake status on the ISED website.
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold mr-4">2</div>
                  <div>
                    <h3 className="font-bold text-lg">Develop Your Growth Project (2-3 weeks)</h3>
                    <p className="text-gray-600 mt-1">
                      Define a clear project with specific goals: new market entry, technology
                      implementation, or product innovation. Create a detailed budget with
                      itemized costs and timelines.
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold mr-4">3</div>
                  <div>
                    <h3 className="font-bold text-lg">Prepare Application Package (1-2 weeks)</h3>
                    <p className="text-gray-600 mt-1">
                      Complete the WEF application form, prepare required documentation
                      (financials, business plan, project description), and compile
                      supporting evidence of market demand or innovation.
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold mr-4">4</div>
                  <div>
                    <h3 className="font-bold text-lg">Submit During Open Intake</h3>
                    <p className="text-gray-600 mt-1">
                      WEF operates with intake windows—typically spring and fall. Submit
                      your complete application before the deadline. Late or incomplete
                      applications are not considered.
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold mr-4">5</div>
                  <div>
                    <h3 className="font-bold text-lg">Review and Agreement (60-120 days)</h3>
                    <p className="text-gray-600 mt-1">
                      ISED reviews applications against program criteria. If approved,
                      you&apos;ll receive a contribution agreement outlining project
                      milestones and reporting requirements.
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
              <h2 className="text-3xl font-bold mb-6">What Documents Are Required for WEF?</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h3 className="font-bold text-lg mb-4 flex items-center">
                    <FileText className="w-5 h-5 text-purple-600 mr-2" />
                    Business Documentation
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-purple-500 mr-2 mt-0.5" />
                      <span>Articles of Incorporation</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-purple-500 mr-2 mt-0.5" />
                      <span>Shareholder agreement (showing 51%+ women ownership)</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-purple-500 mr-2 mt-0.5" />
                      <span>2 years of financial statements</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-purple-500 mr-2 mt-0.5" />
                      <span>Most recent tax returns (T2)</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-purple-500 mr-2 mt-0.5" />
                      <span>Current business plan</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 bg-gray-50 rounded-lg">
                  <h3 className="font-bold text-lg mb-4 flex items-center">
                    <Briefcase className="w-5 h-5 text-pink-600 mr-2" />
                    Project Documentation
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-pink-500 mr-2 mt-0.5" />
                      <span>Detailed project description</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-pink-500 mr-2 mt-0.5" />
                      <span>Itemized project budget</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-pink-500 mr-2 mt-0.5" />
                      <span>Project timeline with milestones</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-pink-500 mr-2 mt-0.5" />
                      <span>Letters of Intent (for export projects)</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-pink-500 mr-2 mt-0.5" />
                      <span>Quotes from vendors/contractors</span>
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
              <h2 className="text-3xl font-bold mb-6">How Long Does WEF Approval Take?</h2>

              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-purple-50">
                      <th className="border border-gray-200 px-4 py-3 text-left">Phase</th>
                      <th className="border border-gray-200 px-4 py-3 text-left">Timeline</th>
                      <th className="border border-gray-200 px-4 py-3 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3">Application Preparation</td>
                      <td className="border border-gray-200 px-4 py-3">4-6 weeks</td>
                      <td className="border border-gray-200 px-4 py-3">Before intake opens</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3">Initial Review</td>
                      <td className="border border-gray-200 px-4 py-3">30-45 days</td>
                      <td className="border border-gray-200 px-4 py-3">Eligibility screening</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3">Full Evaluation</td>
                      <td className="border border-gray-200 px-4 py-3">60-90 days</td>
                      <td className="border border-gray-200 px-4 py-3">Merit-based assessment</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3">Contribution Agreement</td>
                      <td className="border border-gray-200 px-4 py-3">15-30 days</td>
                      <td className="border border-gray-200 px-4 py-3">If approved</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3 font-bold">Total Process</td>
                      <td className="border border-gray-200 px-4 py-3 font-bold">4-6 months</td>
                      <td className="border border-gray-200 px-4 py-3">From submission to funding</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                <p className="text-gray-700">
                  <strong>Note:</strong> WEF operates on intake windows. Apply early in the
                  intake period—applications submitted closer to the deadline face higher
                  competition and longer review times.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Common Mistakes Section */}
        <section id="mistakes" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Common Mistakes That Get WEF Applications Rejected</h2>

              <div className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="text-red-600 font-bold">1</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">Missing the Innovation/Export Angle</h3>
                        <p className="text-gray-600 mt-1">
                          WEF is not general business funding. Applications that describe
                          standard operations without innovation, technology adoption, or
                          export development are immediately screened out.
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
                        <h3 className="font-bold text-lg">Vague or Unrealistic Budgets</h3>
                        <p className="text-gray-600 mt-1">
                          &quot;Marketing: $20,000&quot; is rejected. You need: &quot;Google Ads
                          campaign (6 months): $8,500; Trade show booth rental: $4,200;
                          Agency retainer: $7,300.&quot; Specificity demonstrates planning.
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
                        <h3 className="font-bold text-lg">No Market Validation</h3>
                        <p className="text-gray-600 mt-1">
                          &quot;Customers will love this&quot; isn&apos;t enough. You need
                          Letters of Intent, pre-orders, or market research proving
                          demand exists for your expansion.
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
                        <h3 className="font-bold text-lg">Applying Too Early</h3>
                        <p className="text-gray-600 mt-1">
                          Businesses with less than 2 years of operations or no filed
                          tax returns rarely qualify. Build your track record first,
                          or consider Futurpreneur for early-stage funding.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Success Factors Section */}
        <section id="success-factors" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">What Makes a Winning WEF Application?</h2>

              <p className="text-gray-700 mb-6">
                Analysis of successful WEF applications reveals three core themes that dominate
                approved projects. Aligning your application with these priorities significantly
                improves your chances.
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                <Card className="border-t-4 border-t-green-500">
                  <CardHeader>
                    <div className="text-3xl font-bold text-green-600">45%</div>
                    <CardTitle>Export/Market Access</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Projects expanding into US, EU, or Asian markets. Export readiness
                      assessments, trade mission participation, or international sales
                      infrastructure.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-t-4 border-t-blue-500">
                  <CardHeader>
                    <div className="text-3xl font-bold text-blue-600">30%</div>
                    <CardTitle>Technology Adoption</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Implementing automation, AI, custom software, or e-commerce
                      platforms. Focus on efficiency gains and competitive advantages.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-t-4 border-t-purple-500">
                  <CardHeader>
                    <div className="text-3xl font-bold text-purple-600">25%</div>
                    <CardTitle>Underrepresented Focus</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Indigenous women-owned, rural businesses, or serving
                      underrepresented communities receive priority scoring.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* WEF vs Others Section */}
        <section id="wef-vs-others" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">WEF vs Other Women&apos;s Business Programs</h2>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200 mb-6">
                  <thead>
                    <tr className="bg-purple-50">
                      <th className="border border-gray-200 px-4 py-3 text-left">Program</th>
                      <th className="border border-gray-200 px-4 py-3 text-left">Amount</th>
                      <th className="border border-gray-200 px-4 py-3 text-left">Type</th>
                      <th className="border border-gray-200 px-4 py-3 text-left">Best For</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-purple-50/30">
                      <td className="border border-gray-200 px-4 py-3 font-bold">WEF</td>
                      <td className="border border-gray-200 px-4 py-3">Up to $100K</td>
                      <td className="border border-gray-200 px-4 py-3 text-green-600 font-bold">Non-Repayable</td>
                      <td className="border border-gray-200 px-4 py-3">Growth & Export</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3">BDC Women in Tech</td>
                      <td className="border border-gray-200 px-4 py-3">$50K - $5M</td>
                      <td className="border border-gray-200 px-4 py-3">Loan</td>
                      <td className="border border-gray-200 px-4 py-3">Tech companies</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3">Futurpreneur</td>
                      <td className="border border-gray-200 px-4 py-3">Up to $60K</td>
                      <td className="border border-gray-200 px-4 py-3">Loan</td>
                      <td className="border border-gray-200 px-4 py-3">New startups</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3">Scotiabank Women Initiative</td>
                      <td className="border border-gray-200 px-4 py-3">Varies</td>
                      <td className="border border-gray-200 px-4 py-3">Loan + Mentorship</td>
                      <td className="border border-gray-200 px-4 py-3">Banking clients</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Alternatives Section */}
        <section id="alternatives" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Alternative Programs for Women Entrepreneurs</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded-lg border">
                  <h3 className="font-bold text-lg mb-3">Provincial Women&apos;s Programs</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Most provinces offer women-focused grants that can be stacked with
                    federal funding.
                  </p>
                  <Link href="/blog/ontario-women-business-grants" className="text-purple-700 hover:underline text-sm">
                    Ontario Women&apos;s Grants →
                  </Link>
                </div>

                <div className="p-6 bg-white rounded-lg border">
                  <h3 className="font-bold text-lg mb-3">Indigenous Women Business Funding</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Priority programs for Indigenous women entrepreneurs with enhanced
                    funding amounts.
                  </p>
                  <Link href="/blog/indigenous-women-business-grants-canada" className="text-purple-700 hover:underline text-sm">
                    Indigenous Women&apos;s Grants →
                  </Link>
                </div>

                <div className="p-6 bg-white rounded-lg border">
                  <h3 className="font-bold text-lg mb-3">Women in Technology Grants</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Specialized funding for women-led tech companies and STEM businesses.
                  </p>
                  <Link href="/blog/women-technology-grants-canada" className="text-purple-700 hover:underline text-sm">
                    Women in Tech Grants →
                  </Link>
                </div>

                <div className="p-6 bg-white rounded-lg border">
                  <h3 className="font-bold text-lg mb-3">General Federal Grants</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    IRAP, SR&ED, and other federal programs available to all businesses.
                  </p>
                  <Link href="/blog/canada-federal-grants" className="text-purple-700 hover:underline text-sm">
                    Federal Grants Guide →
                  </Link>
                </div>
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
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg flex items-start">
                      <HelpCircle className="w-5 h-5 text-purple-600 mr-2 mt-1 flex-shrink-0" />
                      Is the Women Entrepreneurship Fund still open?
                    </h3>
                    <p className="text-gray-700 mt-2 ml-7">
                      WEF operates on intake windows, typically in spring and fall. Check the
                      ISED website for current intake status. Between intakes, you can prepare
                      your application for the next window.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg flex items-start">
                      <HelpCircle className="w-5 h-5 text-purple-600 mr-2 mt-1 flex-shrink-0" />
                      Can I apply if I&apos;m 50/50 ownership with a male partner?
                    </h3>
                    <p className="text-gray-700 mt-2 ml-7">
                      No. WEF requires 51% or more women ownership. If you&apos;re 50/50,
                      consider restructuring or exploring other programs like IRAP or
                      SR&ED that don&apos;t have gender-based ownership requirements.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg flex items-start">
                      <HelpCircle className="w-5 h-5 text-purple-600 mr-2 mt-1 flex-shrink-0" />
                      Do I have to repay WEF funding?
                    </h3>
                    <p className="text-gray-700 mt-2 ml-7">
                      No. WEF is 100% non-repayable. Unlike BDC loans or Futurpreneur,
                      approved WEF grants never need to be paid back—it&apos;s a contribution,
                      not a loan.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg flex items-start">
                      <HelpCircle className="w-5 h-5 text-purple-600 mr-2 mt-1 flex-shrink-0" />
                      What is the WEF success rate?
                    </h3>
                    <p className="text-gray-700 mt-2 ml-7">
                      WEF is competitive with approximately 12-15% of applications approved.
                      However, professionally prepared applications with strong export or
                      innovation narratives see significantly higher success rates.
                    </p>
                  </CardContent>
                </Card>
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
                <Link href="/blog/women-entrepreneurship-strategy-canada" className="flex items-center p-4 bg-white rounded-lg border hover:border-purple-500 hover:shadow-md transition-all group">
                  <BookOpen className="w-5 h-5 text-purple-600 mr-3" />
                  <span className="text-gray-700 group-hover:text-purple-600">Women Entrepreneurship Strategy Overview</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                </Link>
                <Link href="/blog/ontario-women-business-grants" className="flex items-center p-4 bg-white rounded-lg border hover:border-purple-500 hover:shadow-md transition-all group">
                  <BookOpen className="w-5 h-5 text-purple-600 mr-3" />
                  <span className="text-gray-700 group-hover:text-purple-600">Ontario Women&apos;s Business Grants</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                </Link>
                <Link href="/blog/bc-women-business-grants" className="flex items-center p-4 bg-white rounded-lg border hover:border-purple-500 hover:shadow-md transition-all group">
                  <BookOpen className="w-5 h-5 text-purple-600 mr-3" />
                  <span className="text-gray-700 group-hover:text-purple-600">BC Women&apos;s Business Grants</span>
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

        {/* Official Government Resources */}
        <section className="py-12 bg-white border-t border-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Official Government Resources</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <a href="https://ised-isde.canada.ca/site/women-entrepreneurship-strategy/en" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-purple-50 transition-colors border border-gray-200">
                  <ExternalLink className="w-6 h-6 text-purple-600 mr-3 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900">Women Entrepreneurship Strategy</div>
                    <div className="text-sm text-gray-600">Official ISED WES portal</div>
                  </div>
                </a>
                <a href="https://www.bdc.ca/en/about/women-entrepreneurs" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-purple-50 transition-colors border border-gray-200">
                  <ExternalLink className="w-6 h-6 text-pink-600 mr-3 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900">BDC Women Entrepreneurs</div>
                    <div className="text-sm text-gray-600">Business Development Bank programs</div>
                  </div>
                </a>
                <a href="https://weoc.ca/" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-purple-50 transition-colors border border-gray-200">
                  <ExternalLink className="w-6 h-6 text-rose-600 mr-3 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900">WEOC</div>
                    <div className="text-sm text-gray-600">Women's Enterprise Organizations of Canada</div>
                  </div>
                </a>
                <a href="https://www.canada.ca/en/innovation-science-economic-development.html" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-purple-50 transition-colors border border-gray-200">
                  <ExternalLink className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900">ISED Canada</div>
                    <div className="text-sm text-gray-600">Innovation, Science and Economic Development</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Strong CTA Section */}
        <section className="py-20 bg-gradient-to-r from-purple-700 to-pink-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-6">
                Don&apos;t Leave $100K on the Table
              </h2>
              <p className="text-xl text-purple-100 mb-8">
                Our WEF specialists have helped women entrepreneurs secure over $4.2M in
                non-repayable funding. With only 12% of DIY applications approved, professional
                support can make the difference.
              </p>
              <div className="bg-white/10 rounded-lg p-6 mb-8">
                <h4 className="font-semibold mb-4">Our WEF Application Package Includes:</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Complete eligibility assessment</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Innovation narrative development</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Professional application writing</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Budget optimization</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>78% approval rate</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Intake deadline management</span>
                  </div>
                </div>
              </div>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-4" asChild>
                <Link href="/contact?service=wef-grant-application-help">
                  Get Expert Help with WEF Applications
                </Link>
              </Button>
              <p className="text-purple-200 text-sm mt-4">
                Free consultation • No upfront fees • Women-owned business specialists
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
