import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  CheckCircle, DollarSign, Target, AlertTriangle, Users, FileText,
  Clock, ChevronRight, ExternalLink, BookOpen, HelpCircle, Briefcase,
  TrendingUp, Lightbulb, Code, Zap, Award, Building, Beaker
} from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "IRAP Industrial Research Assistance Program 2026 | Up to $1M Non-Repayable R&D Grants",
  description: "Complete guide to IRAP funding. Access up to $1M in non-repayable R&D grants from the National Research Council of Canada. Eligibility, application process, and approval strategies for Canadian tech SMEs.",
  keywords: "IRAP, Industrial Research Assistance Program, NRC IRAP, Canada R&D grants, technology grants Canada, innovation funding, non-repayable grants",
}

export default function IRAPGuidePage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-700 to-emerald-600 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30">
                <Beaker className="w-3 h-3 mr-1" /> Canada&apos;s Premier R&amp;D Grant Program
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Industrial Research Assistance Program (IRAP)
              </h1>
              <p className="text-xl text-green-100 mb-8">
                Access up to $1 million in non-repayable R&amp;D funding through Canada&apos;s
                largest and most established technology assistance program. Complete guide
                to eligibility, application process, and proven approval strategies.
              </p>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-4" asChild>
                <Link href="/contact?service=irap-application-help">
                  Get Expert Help with IRAP Applications
                </Link>
              </Button>
              <p className="text-green-200 text-sm mt-4">
                Free consultation • 89% approval rate • $25M+ secured for clients
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
                  <li><a href="#overview" className="text-green-700 hover:underline">1. IRAP Program Overview</a></li>
                  <li><a href="#eligibility" className="text-green-700 hover:underline">2. Who is Eligible?</a></li>
                  <li><a href="#how-much" className="text-green-700 hover:underline">3. How Much Funding?</a></li>
                  <li><a href="#eligible-costs" className="text-green-700 hover:underline">4. Eligible Project Costs</a></li>
                  <li><a href="#funding-streams" className="text-green-700 hover:underline">5. IRAP Funding Streams</a></li>
                  <li><a href="#how-to-apply" className="text-green-700 hover:underline">6. How to Apply Step by Step</a></li>
                  <li><a href="#documents" className="text-green-700 hover:underline">7. Required Documents</a></li>
                  <li><a href="#timeline" className="text-green-700 hover:underline">8. Approval Timeline</a></li>
                  <li><a href="#mistakes" className="text-green-700 hover:underline">9. Common Mistakes</a></li>
                  <li><a href="#irap-vs-sred" className="text-green-700 hover:underline">10. IRAP vs SR&amp;ED</a></li>
                  <li><a href="#alternatives" className="text-green-700 hover:underline">11. Alternative Programs</a></li>
                  <li><a href="#faqs" className="text-green-700 hover:underline">12. FAQs</a></li>
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
                  <div className="text-3xl font-bold text-green-600 mb-2">$1M</div>
                  <div className="text-gray-600">Maximum Grant</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">67%</div>
                  <div className="text-gray-600">Project Funding</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">$350M+</div>
                  <div className="text-gray-600">Annual Budget</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-emerald-600 mb-2">3,000+</div>
                  <div className="text-gray-600">Projects/Year</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section id="overview" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">What is IRAP?</h2>

              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  The Industrial Research Assistance Program (IRAP) is Canada&apos;s largest
                  and most established technology assistance program for small and medium-sized
                  enterprises. Administered by the National Research Council of Canada (NRC),
                  IRAP has supported Canadian innovation for over 75 years.
                </p>

                <p className="text-gray-700 leading-relaxed mb-4">
                  IRAP provides <strong>non-repayable contributions</strong> (grants) to help
                  fund R&amp;D projects, along with free access to technical and business
                  advisory services. Unlike SR&amp;ED tax credits that reimburse after spending,
                  IRAP provides upfront funding to accelerate innovation.
                </p>

                <div className="bg-green-50 border-l-4 border-green-500 p-4 my-6">
                  <p className="text-gray-700">
                    <strong>Key Advantage:</strong> IRAP funding is 100% non-repayable and
                    provides upfront capital—you receive payments as you complete project
                    milestones, not after filing taxes. This cash flow advantage is critical
                    for R&amp;D-intensive SMEs.
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
              <h2 className="text-3xl font-bold mb-6">Who is Eligible for IRAP Funding?</h2>

              <p className="text-gray-700 mb-6">
                IRAP eligibility centers on company size, Canadian incorporation, and
                innovation focus. The program specifically targets growth-oriented SMEs
                with technology development mandates.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-green-700">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Eligible Companies
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span><strong>SME status</strong> – 500 or fewer full-time employees</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span><strong>Canadian incorporated</strong> – active Canadian operation</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span><strong>For-profit</strong> – commercially oriented business</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span><strong>Innovation focus</strong> – R&amp;D or technology mandate</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                        <span><strong>Growth potential</strong> – capacity to commercialize</span>
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
                        <span>Large corporations (500+ employees)</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-1" />
                        <span>Non-profit organizations</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-1" />
                        <span>Universities and research institutions</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-1" />
                        <span>Government entities</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-1" />
                        <span>Companies without technical innovation</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4">
                <p className="text-gray-700">
                  <strong>Pro Tip:</strong> IRAP considers &quot;potential for growth&quot; heavily.
                  Even early-stage startups with strong technology and market potential can
                  qualify. The key is demonstrating commercial viability of your innovation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How Much Funding Section */}
        <section id="how-much" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">How Much Funding Can You Get from IRAP?</h2>

              <p className="text-gray-700 mb-6">
                IRAP funding varies based on project scope, company size, and regional
                priorities. The program typically funds 50-67% of eligible project costs.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200 mb-6">
                  <thead>
                    <tr className="bg-green-50">
                      <th className="border border-gray-200 px-4 py-3 text-left">Funding Element</th>
                      <th className="border border-gray-200 px-4 py-3 text-left">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3 font-semibold">Maximum Grant</td>
                      <td className="border border-gray-200 px-4 py-3 text-green-600 font-bold">Up to $1,000,000</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3 font-semibold">Typical Range</td>
                      <td className="border border-gray-200 px-4 py-3">$50,000 – $500,000</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3 font-semibold">Cost Share</td>
                      <td className="border border-gray-200 px-4 py-3">Up to 67% of eligible costs</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3 font-semibold">Repayment</td>
                      <td className="border border-gray-200 px-4 py-3 text-green-600 font-bold">None – 100% Non-Repayable</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3 font-semibold">Youth Employment</td>
                      <td className="border border-gray-200 px-4 py-3">Up to $40K/year (75% of salary)</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3 font-semibold">Stacking</td>
                      <td className="border border-gray-200 px-4 py-3">Can combine with SR&amp;ED claims</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-4">
                <p className="text-gray-700">
                  <strong>Important:</strong> Average IRAP project funding is approximately
                  $320,000. Larger projects over $500K require additional review and
                  stronger justification.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Eligible Costs Section */}
        <section id="eligible-costs" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">What Project Costs Does IRAP Cover?</h2>

              <p className="text-gray-700 mb-6">
                IRAP primarily funds salaries and wages for technical personnel, with
                limited coverage for contractors and materials. Understanding eligible
                costs is critical for accurate budgeting.
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
                      <span>Salaries and wages (technical staff)</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                      <span>Contract research services</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                      <span>Prototype materials and supplies</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                      <span>Testing and validation costs</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                      <span>IP protection (limited)</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                      <span>Subcontractor costs</span>
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
                      <span>Capital equipment (major purchases)</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-red-500 mr-2 mt-0.5" />
                      <span>Marketing and sales activities</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-red-500 mr-2 mt-0.5" />
                      <span>General administrative overhead</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-red-500 mr-2 mt-0.5" />
                      <span>Working capital</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-red-500 mr-2 mt-0.5" />
                      <span>Costs incurred before approval</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-red-500 mr-2 mt-0.5" />
                      <span>Owner/shareholder salaries (limited)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Funding Streams Section */}
        <section id="funding-streams" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">IRAP Funding Streams</h2>

              <div className="space-y-6">
                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="flex items-center text-green-700">
                      <Lightbulb className="w-6 h-6 mr-2" />
                      R&amp;D Project Funding
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="text-center p-3 bg-green-50 rounded">
                        <div className="font-bold text-green-700">Up to $1M</div>
                        <div className="text-xs text-gray-600">Per Project</div>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded">
                        <div className="font-bold text-blue-700">67%</div>
                        <div className="text-xs text-gray-600">Cost Coverage</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded">
                        <div className="font-bold text-purple-700">12-24 months</div>
                        <div className="text-xs text-gray-600">Typical Duration</div>
                      </div>
                    </div>
                    <p className="text-gray-700">
                      Core funding for technology innovation, product development, process
                      improvements, and applied research activities.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-blue-200">
                  <CardHeader>
                    <CardTitle className="flex items-center text-blue-700">
                      <Users className="w-6 h-6 mr-2" />
                      Youth Employment Program
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="text-center p-3 bg-green-50 rounded">
                        <div className="font-bold text-green-700">Up to $80K</div>
                        <div className="text-xs text-gray-600">Per Hire</div>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded">
                        <div className="font-bold text-blue-700">75%</div>
                        <div className="text-xs text-gray-600">Salary Coverage</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded">
                        <div className="font-bold text-purple-700">12-24 months</div>
                        <div className="text-xs text-gray-600">Placement</div>
                      </div>
                    </div>
                    <p className="text-gray-700">
                      Wage subsidies for hiring recent STEM graduates (within 3 years)
                      aged 15-30 for innovation-related positions.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-purple-200">
                  <CardHeader>
                    <CardTitle className="flex items-center text-purple-700">
                      <Code className="w-6 h-6 mr-2" />
                      Advisory Services
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="text-center p-3 bg-green-50 rounded">
                        <div className="font-bold text-green-700">Free</div>
                        <div className="text-xs text-gray-600">No Cost</div>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded">
                        <div className="font-bold text-blue-700">200+</div>
                        <div className="text-xs text-gray-600">ITAs Across Canada</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded">
                        <div className="font-bold text-purple-700">Ongoing</div>
                        <div className="text-xs text-gray-600">Support</div>
                      </div>
                    </div>
                    <p className="text-gray-700">
                      Free access to Industrial Technology Advisors (ITAs) providing
                      technical guidance, business mentorship, and network connections.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* How to Apply Section */}
        <section id="how-to-apply" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">How to Apply for IRAP Funding</h2>

              <div className="space-y-6">
                <div className="flex items-start p-4 bg-gray-50 rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mr-4">1</div>
                  <div>
                    <h3 className="font-bold text-lg">Contact Your Local ITA (1-2 weeks)</h3>
                    <p className="text-gray-600 mt-1">
                      Reach out to an Industrial Technology Advisor in your region. ITAs
                      are your first point of contact and guide you through the entire
                      process. Find your local ITA on the NRC website.
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-gray-50 rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mr-4">2</div>
                  <div>
                    <h3 className="font-bold text-lg">Initial Assessment (2-4 weeks)</h3>
                    <p className="text-gray-600 mt-1">
                      Your ITA evaluates your company&apos;s eligibility, innovation
                      capacity, and growth potential. This includes reviewing your
                      technology, team, and commercialization strategy.
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-gray-50 rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mr-4">3</div>
                  <div>
                    <h3 className="font-bold text-lg">Project Development (2-6 weeks)</h3>
                    <p className="text-gray-600 mt-1">
                      Work with your ITA to define project scope, technical milestones,
                      timeline, and budget. Your ITA provides guidance on what makes a
                      strong project proposal.
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-gray-50 rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mr-4">4</div>
                  <div>
                    <h3 className="font-bold text-lg">Proposal Submission</h3>
                    <p className="text-gray-600 mt-1">
                      Submit your complete project proposal through your ITA. The proposal
                      includes technical plan, budget breakdown, commercialization
                      strategy, and milestone schedule.
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-gray-50 rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mr-4">5</div>
                  <div>
                    <h3 className="font-bold text-lg">NRC Review (4-8 weeks)</h3>
                    <p className="text-gray-600 mt-1">
                      NRC evaluates technical merit, commercial potential, and project
                      feasibility. You may be asked for clarifications or additional
                      documentation during review.
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-gray-50 rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mr-4">6</div>
                  <div>
                    <h3 className="font-bold text-lg">Contribution Agreement &amp; Execution</h3>
                    <p className="text-gray-600 mt-1">
                      Upon approval, sign the contribution agreement and begin project
                      execution. You receive payments as you complete milestones and
                      submit claims.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Required Documents Section */}
        <section id="documents" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">What Documents Are Required for IRAP?</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded-lg border">
                  <h3 className="font-bold text-lg mb-4 flex items-center">
                    <Building className="w-5 h-5 text-green-600 mr-2" />
                    Company Documentation
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                      <span>Articles of Incorporation</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                      <span>Financial statements (2-3 years)</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                      <span>Business plan</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                      <span>Organization chart</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                      <span>Key personnel resumes</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 bg-white rounded-lg border">
                  <h3 className="font-bold text-lg mb-4 flex items-center">
                    <Briefcase className="w-5 h-5 text-blue-600 mr-2" />
                    Project Documentation
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-blue-500 mr-2 mt-0.5" />
                      <span>Technical project description</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-blue-500 mr-2 mt-0.5" />
                      <span>Detailed budget breakdown</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-blue-500 mr-2 mt-0.5" />
                      <span>Milestone schedule</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-blue-500 mr-2 mt-0.5" />
                      <span>Commercialization strategy</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-blue-500 mr-2 mt-0.5" />
                      <span>Risk assessment</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section id="timeline" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">How Long Does IRAP Approval Take?</h2>

              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-green-50">
                      <th className="border border-gray-200 px-4 py-3 text-left">Phase</th>
                      <th className="border border-gray-200 px-4 py-3 text-left">Timeline</th>
                      <th className="border border-gray-200 px-4 py-3 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3">ITA Contact &amp; Assessment</td>
                      <td className="border border-gray-200 px-4 py-3">2-4 weeks</td>
                      <td className="border border-gray-200 px-4 py-3">Initial eligibility review</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3">Project Development</td>
                      <td className="border border-gray-200 px-4 py-3">2-6 weeks</td>
                      <td className="border border-gray-200 px-4 py-3">With ITA guidance</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3">NRC Review</td>
                      <td className="border border-gray-200 px-4 py-3">4-8 weeks</td>
                      <td className="border border-gray-200 px-4 py-3">Technical evaluation</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3">Agreement Signing</td>
                      <td className="border border-gray-200 px-4 py-3">1-2 weeks</td>
                      <td className="border border-gray-200 px-4 py-3">Contribution agreement</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3 font-bold">Total Process</td>
                      <td className="border border-gray-200 px-4 py-3 font-bold">2-4 months</td>
                      <td className="border border-gray-200 px-4 py-3">From initial contact</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                <p className="text-gray-700">
                  <strong>Pro Tip:</strong> Timeline can vary significantly based on project
                  complexity and regional demand. Engage early—IRAP fiscal year-end (March 31)
                  often sees faster processing to deploy remaining budgets.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Common Mistakes Section */}
        <section id="mistakes" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Common Mistakes That Get IRAP Applications Rejected</h2>

              <div className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="text-red-600 font-bold">1</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">Weak Technical Innovation</h3>
                        <p className="text-gray-600 mt-1">
                          IRAP requires genuine technological uncertainty. Incremental
                          improvements or routine engineering don&apos;t qualify. You must
                          demonstrate that you&apos;re solving a problem for which no
                          known solution exists.
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
                        <h3 className="font-bold text-lg">No Clear Commercialization Path</h3>
                        <p className="text-gray-600 mt-1">
                          IRAP funds innovation that will generate economic returns.
                          You need to demonstrate market demand, customer validation,
                          and a realistic go-to-market strategy.
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
                        <h3 className="font-bold text-lg">Insufficient Technical Team</h3>
                        <p className="text-gray-600 mt-1">
                          IRAP evaluates your capacity to execute. Projects without
                          qualified technical personnel or relevant R&amp;D experience
                          are rejected regardless of the technology&apos;s potential.
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
                        <h3 className="font-bold text-lg">Applying After Project Starts</h3>
                        <p className="text-gray-600 mt-1">
                          IRAP cannot fund retroactive costs. Contact your ITA before
                          starting the project—costs incurred before approval are
                          ineligible.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* IRAP vs SR&ED Section */}
        <section id="irap-vs-sred" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">IRAP vs SR&amp;ED: Which is Better?</h2>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200 mb-6">
                  <thead>
                    <tr className="bg-green-50">
                      <th className="border border-gray-200 px-4 py-3 text-left">Factor</th>
                      <th className="border border-gray-200 px-4 py-3 text-left">IRAP</th>
                      <th className="border border-gray-200 px-4 py-3 text-left">SR&amp;ED</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3 font-semibold">Timing</td>
                      <td className="border border-gray-200 px-4 py-3 text-green-600">Upfront funding</td>
                      <td className="border border-gray-200 px-4 py-3">After expenditure (tax filing)</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3 font-semibold">Application</td>
                      <td className="border border-gray-200 px-4 py-3">Before project starts</td>
                      <td className="border border-gray-200 px-4 py-3">After fiscal year-end</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3 font-semibold">Amount</td>
                      <td className="border border-gray-200 px-4 py-3">Up to $1M (67% of costs)</td>
                      <td className="border border-gray-200 px-4 py-3">35% refundable (CCPCs)</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3 font-semibold">Stacking</td>
                      <td className="border border-gray-200 px-4 py-3 text-green-600">Can combine with SR&amp;ED</td>
                      <td className="border border-gray-200 px-4 py-3">Can combine with IRAP</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3 font-semibold">Best For</td>
                      <td className="border border-gray-200 px-4 py-3">Cash flow sensitive SMEs</td>
                      <td className="border border-gray-200 px-4 py-3">Established R&amp;D operations</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <p className="text-gray-700">
                  <strong>Best Strategy:</strong> Apply for both! IRAP and SR&amp;ED can be
                  combined—IRAP funding reduces SR&amp;ED eligible expenses, but you still
                  get credits on the remaining costs. Many companies maximize returns by
                  leveraging both programs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Alternatives Section */}
        <section id="alternatives" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Alternative Programs for R&amp;D Funding</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded-lg border">
                  <h3 className="font-bold text-lg mb-3">SR&amp;ED Tax Credits</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Tax credits for R&amp;D expenditures—35% refundable for CCPCs,
                    15% non-refundable for others.
                  </p>
                  <Link href="/blog/sred-tax-credits-guide" className="text-green-700 hover:underline text-sm">
                    SR&amp;ED Guide →
                  </Link>
                </div>

                <div className="p-6 bg-white rounded-lg border">
                  <h3 className="font-bold text-lg mb-3">Strategic Innovation Fund</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Large-scale R&amp;D projects ($10M+) with significant economic
                    impact potential.
                  </p>
                  <Link href="/blog/strategic-innovation-fund" className="text-green-700 hover:underline text-sm">
                    SIF Guide →
                  </Link>
                </div>

                <div className="p-6 bg-white rounded-lg border">
                  <h3 className="font-bold text-lg mb-3">Regional Development Agencies</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    ACOA, WD, FedDev Ontario, and others provide regional innovation
                    funding.
                  </p>
                  <Link href="/blog/canada-regional-economic-development-grants-guide" className="text-green-700 hover:underline text-sm">
                    Regional Grants →
                  </Link>
                </div>

                <div className="p-6 bg-white rounded-lg border">
                  <h3 className="font-bold text-lg mb-3">Provincial R&amp;D Programs</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Many provinces offer additional R&amp;D funding that stacks with
                    federal programs like IRAP.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Link href="/blog/ontario-government-business-grants" className="text-green-700 hover:underline text-sm">Ontario →</Link>
                    <Link href="/blog/british-columbia-government-business-grants" className="text-green-700 hover:underline text-sm">BC →</Link>
                    <Link href="/blog/alberta-government-business-grants" className="text-green-700 hover:underline text-sm">Alberta →</Link>
                  </div>
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
                      <HelpCircle className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                      Does IRAP funding need to be repaid?
                    </h3>
                    <p className="text-gray-700 mt-2 ml-7">
                      No. IRAP provides non-repayable contributions (grants). Once approved
                      and claimed, the funding is yours to keep—no repayment required.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg flex items-start">
                      <HelpCircle className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                      Can startups apply for IRAP?
                    </h3>
                    <p className="text-gray-700 mt-2 ml-7">
                      Yes. IRAP funds companies at all stages, from early-stage startups
                      to established SMEs. The key requirements are incorporated in Canada,
                      under 500 employees, and pursuing technology innovation.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg flex items-start">
                      <HelpCircle className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                      Can I combine IRAP with SR&amp;ED?
                    </h3>
                    <p className="text-gray-700 mt-2 ml-7">
                      Absolutely. IRAP and SR&amp;ED can be stacked. IRAP funding reduces
                      your SR&amp;ED eligible expenditures, but you still claim credits
                      on the remaining costs you paid out of pocket.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg flex items-start">
                      <HelpCircle className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                      What is the IRAP success rate?
                    </h3>
                    <p className="text-gray-700 mt-2 ml-7">
                      IRAP has a high approval rate—approximately 70-80% of applications
                      that reach the proposal stage are approved. The key is working with
                      your ITA to develop a strong project before formal submission.
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
                <Link href="/blog/sred-tax-credits-guide" className="flex items-center p-4 bg-white rounded-lg border hover:border-green-500 hover:shadow-md transition-all group">
                  <BookOpen className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-gray-700 group-hover:text-green-600">SR&amp;ED Tax Credits Guide</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                </Link>
                <Link href="/blog/canada-digital-ai-innovation-grants" className="flex items-center p-4 bg-white rounded-lg border hover:border-green-500 hover:shadow-md transition-all group">
                  <BookOpen className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-gray-700 group-hover:text-green-600">Digital &amp; AI Innovation Grants</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                </Link>
                <Link href="/blog/canada-clean-technology-innovation-grants" className="flex items-center p-4 bg-white rounded-lg border hover:border-green-500 hover:shadow-md transition-all group">
                  <BookOpen className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-gray-700 group-hover:text-green-600">Clean Technology Grants</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                </Link>
                <Link href="/guides" className="flex items-center p-4 bg-white rounded-lg border hover:border-green-500 hover:shadow-md transition-all group">
                  <BookOpen className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-gray-700 group-hover:text-green-600">All Grant Application Guides</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Strong CTA Section */}
        <section className="py-20 bg-gradient-to-r from-green-700 to-emerald-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-6">
                Ready to Secure IRAP Funding?
              </h2>
              <p className="text-xl text-green-100 mb-8">
                Our IRAP specialists have secured over $25 million in R&amp;D funding for
                Canadian tech companies. With in-depth knowledge of what ITAs look for,
                we help you build a winning application.
              </p>
              <div className="bg-white/10 rounded-lg p-6 mb-8">
                <h4 className="font-semibold mb-4">Our IRAP Success Package Includes:</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Free eligibility assessment</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>ITA introduction and coordination</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Project proposal development</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Technical narrative writing</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Budget optimization</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>89% approval rate</span>
                  </div>
                </div>
              </div>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-4" asChild>
                <Link href="/contact?service=irap-application-help">
                  Get Expert Help with IRAP
                </Link>
              </Button>
              <p className="text-green-200 text-sm mt-4">
                Free consultation • Average funding secured: $320K • Success-based fees
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
