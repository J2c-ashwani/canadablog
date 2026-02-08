import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, FileText, Download, Shield, Award, HelpCircle, MapPin, Briefcase } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "IRAP Industrial Research Assistance Program Canada 2026 | Government R&D Funding Guide",
  description: "Complete guide to IRAP government funding for Canadian R&D projects. Federal compliance, reporting requirements, and strategic integration with other government innovation programs.",
  keywords: "IRAP government grants, Industrial Research Assistance Program Canada, federal R&D funding, government innovation grants, NRC IRAP compliance, Canadian government R&D support",
  openGraph: {
    title: "IRAP Industrial Research Assistance Program Canada 2026 | Government R&D Funding",
    description: "Comprehensive guide to IRAP federal R&D funding with compliance requirements and government program integration strategies.",
    url: "https://www.fsidigital.ca/blog/irap-industrial-research-assistance-program-government-grants",
    images: ["/og-image.png"],
  },
}

export default function IRAPGovernmentGrantsBlogPage() {
  const faqData = [
    {
      question: "Is IRAP funding considered taxable income?",
      answer: "Yes. Like most government grants, IRAP contributions are generally considered taxable income. However, since the funding covers expenses you would otherwise deduct, the net tax impact is often neutral. Always consult your accountant."
    },
    {
      question: "How does IRAP differ from a business loan?",
      answer: "IRAP is a 'non-repayable contribution,' meaning you do not pay it back and you give up zero equity. Loans (like BDC or CSBFL) must be repaid with interest."
    },
    {
      question: "What are the monthly reporting requirements?",
      answer: "You must submit a monthly 'claim' detailing the hours worked by your funded employees and any other eligible costs. This ensures you are reimbursed promptly (usually within 30 days)."
    },
    {
      question: "Can I stack IRAP with provincial grants?",
      answer: "Yes, in most cases. The government 'stacking limit' is typically 75% of total project costs. You can combine federal IRAP with provincial funds (like OCI or Innovate BC) up to that limit."
    },
    {
      question: "Does the National Research Council (NRC) take ownership of my IP?",
      answer: "No. You retain 100% ownership of all Intellectual Property developed during an IRAP project. The government's goal is to help you grow, not to own your technology."
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
        <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🏛️ Federal R&D Funding Program
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                IRAP Industrial Research Assistance Program
              </h1>
              <p className="text-xl text-green-100 mb-8">
                Canada's flagship federal R&D funding program providing up to $1M in non-repayable
                contributions for innovative technology development. Complete guide to IRAP government
                funding, compliance requirements, and strategic integration with federal innovation programs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100" asChild>
                  <Link href="/grant-finder?program=irap">
                    Check IRAP Eligibility
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild>
                  <Link href="/canada/government-grants">
                    Back to Government Grants
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Program Statistics */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">$1M</div>
                  <div className="text-gray-600">Max IRAP Contribution</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">67%</div>
                  <div className="text-gray-600">Average Funding Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">4,000+</div>
                  <div className="text-gray-600">Companies Supported Annually</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">85%</div>
                  <div className="text-gray-600">Project Success Rate</div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">IRAP as Canada's Strategic Innovation Policy Tool</h2>
                <p className="text-lg text-gray-700 mb-6">
                  The Industrial Research Assistance Program (IRAP) serves as the National Research Council of Canada's
                  primary mechanism for delivering federal innovation policy objectives. As part of Canada's comprehensive
                  innovation ecosystem, IRAP provides risk-sharing partnerships with businesses to advance technological
                  capabilities, enhance competitiveness, and drive economic growth through innovation.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h4 className="font-bold text-lg mb-3 text-green-800">Federal Policy Alignment</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Biomanufacturing and life sciences strategy</li>
                      <li>• Critical minerals and clean technology priorities</li>
                      <li>• Digital transformation and AI adoption</li>
                      <li>• Advanced manufacturing and Industry 4.0</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h4 className="font-bold text-lg mb-3 text-blue-800">Government Program Integration</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Strategic Innovation Fund (SIF) pathway</li>
                      <li>• SR&ED tax credit optimization</li>
                      <li>• Regional Development Agency coordination</li>
                      <li>• Innovation Supercluster participation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* IRAP Federal Program Structure */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">IRAP Federal Program Structure</h2>

              <div className="space-y-8">
                {/* Contribution-Based Funding */}
                <Card className="border-green-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Shield className="w-6 h-6 text-green-600 mr-3" />
                      <CardTitle className="text-green-700">Federal Contribution Framework</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $1M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Non-Repayable</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>SME Focus</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      IRAP operates as a federal contribution program under the Financial Administration Act,
                      providing risk-sharing partnerships with eligible businesses for qualifying R&D activities.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Eligible Cost Categories:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Canadian employee salaries and benefits (80% coverage)</li>
                          <li>• Contractor and consultant services (50% coverage)</li>
                          <li>• Materials and supplies directly related to R&D</li>
                          <li>• Equipment rental and specialized services</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Federal Compliance Requirements:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Treasury Board Secretariat reporting standards</li>
                          <li>• Financial Administration Act compliance</li>
                          <li>• Audit and monitoring requirements</li>
                          <li>• Performance measurement and evaluation</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Technical Advisory Network */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Users className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle className="text-blue-700">Federal Technical Advisory Network</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <Building className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>260+ ITAs</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>National Coverage</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Award className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Sector Expertise</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      IRAP's Industrial Technology Advisors (ITAs) represent the federal government's on-ground
                      innovation support network, providing technical and business advisory services nationwide.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Advisory Services:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Technology roadmap development</li>
                          <li>• Innovation strategy formulation</li>
                          <li>• Market intelligence and sector analysis</li>
                          <li>• Partnership facilitation and networking</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Government Integration:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Connection to other federal programs</li>
                          <li>• Provincial program coordination</li>
                          <li>• International partnership development</li>
                          <li>• Policy feedback and program evolution</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Youth Employment Initiative */}
                <Card className="border-purple-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Users className="w-6 h-6 text-purple-600 mr-3" />
                      <CardTitle className="text-purple-700">IRAP Youth Employment Strategy</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $30K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>12 Months</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>STEM Graduates</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      IRAP's Youth Employment Initiative aligns with federal skills development and innovation
                      workforce strategies, providing wage subsidies for hiring recent STEM graduates.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Program Benefits:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• 75% salary coverage for qualified youth</li>
                          <li>• Skills development and training support</li>
                          <li>• Mentorship and career development</li>
                          <li>• Pathway to permanent employment</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Strategic Alignment:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Future Skills Centre integration</li>
                          <li>• Digital Economy Strategy support</li>
                          <li>• Innovation workforce development</li>
                          <li>• Youth employment policy objectives</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Federal Compliance & Reporting */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">IRAP Federal Compliance Framework</h2>

              <div className="space-y-6">
                <Card className="border-red-200">
                  <CardHeader>
                    <CardTitle className="text-red-700">Treasury Board Secretariat Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Financial Reporting Standards:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Monthly contribution claims with supporting documentation</li>
                          <li>• Auditable expense tracking and time recording systems</li>
                          <li>• Compliance with Government of Canada accounting standards</li>
                          <li>• Quarterly progress reports and milestone updates</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Audit and Monitoring:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• NRC financial and technical audits (5-10% of projects)</li>
                          <li>• Document retention requirements (7 years minimum)</li>
                          <li>• Site visits and verification procedures</li>
                          <li>• Compliance monitoring and corrective measures</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700">Performance Measurement and Evaluation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold mb-2">Federal Program Evaluation Metrics:</h5>
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <strong>Innovation Outcomes:</strong>
                            <ul className="mt-1 space-y-1">
                              <li>• New products/services commercialized</li>
                              <li>• Intellectual property generated</li>
                              <li>• Technology readiness level advancement</li>
                            </ul>
                          </div>
                          <div>
                            <strong>Economic Impact:</strong>
                            <ul className="mt-1 space-y-1">
                              <li>• Revenue growth attributable to IRAP</li>
                              <li>• Job creation and retention</li>
                              <li>• Export market development</li>
                            </ul>
                          </div>
                          <div>
                            <strong>Competitiveness Indicators:</strong>
                            <ul className="mt-1 space-y-1">
                              <li>• R&D capacity building</li>
                              <li>• Market positioning improvements</li>
                              <li>• Innovation culture development</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Government Program Integration */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Strategic Integration with Federal Innovation Programs</h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-lg mb-4 text-green-700">🏛️ Federal Program Synergies:</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Strategic Innovation Fund (SIF):</strong> IRAP success creates SIF readiness for large-scale projects</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>SR&ED Tax Credits:</strong> Complementary funding maximizing total R&D support</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Innovation Superclusters:</strong> Pathway to collaborative mega-projects</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>SDTC Clean Technology:</strong> Environmental innovation project scaling</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-lg mb-4 text-blue-700">🌐 Regional & International Alignment:</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Regional Development Agencies:</strong> Coordinated innovation support delivery</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Provincial Innovation Programs:</strong> Complementary funding strategies</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Trade Commissioner Service:</strong> Export development and internationalization</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Global Affairs Partnerships:</strong> International R&D collaboration</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* IRAP Application Process */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">IRAP Federal Application Process</h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <span className="bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">1</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">Federal Eligibility Verification</h4>
                    <p className="text-gray-600">Confirm compliance with Federal Contractors Program requirements, Canadian incorporation status, and SME size criteria under government definitions.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">2</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">Industrial Technology Advisor (ITA) Engagement</h4>
                    <p className="text-gray-600">Connect with regional ITA for preliminary project assessment, alignment with federal innovation priorities, and strategic guidance.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">3</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">Formal Application Submission</h4>
                    <p className="text-gray-600">Submit comprehensive application through NRC-IRAP portal with technical project details, business case, and compliance documentation.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">4</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">Technical and Financial Review</h4>
                    <p className="text-gray-600">NRC technical panel evaluation, financial due diligence, and alignment assessment with federal innovation strategy priorities.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">5</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">Contribution Agreement Execution</h4>
                    <p className="text-gray-600">Sign federal contribution agreement with performance milestones, reporting requirements, and compliance obligations.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Tips */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">IRAP Federal Application Success Strategies</h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-lg mb-4 text-green-700">✅ Government Program Success Factors:</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Federal Policy Alignment:</strong> Demonstrate alignment with Canada's innovation priorities and economic strategies</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Compliance Readiness:</strong> Establish robust financial tracking and reporting systems</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Program Integration:</strong> Position IRAP as stepping stone to larger federal programs</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Performance Measurement:</strong> Define clear, measurable outcomes aligned with federal KPIs</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-lg mb-4 text-red-700">❌ Common Federal Application Mistakes:</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <span><strong>Inadequate Compliance Systems:</strong> Lacking proper expense tracking and audit readiness</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <span><strong>Weak Policy Connection:</strong> Failing to demonstrate alignment with federal innovation priorities</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <span><strong>Limited Strategic Vision:</strong> Not articulating pathways to larger government programs</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <span><strong>Poor Performance Metrics:</strong> Undefined or unmeasurable success indicators</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-gray-900">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqData.map((faq, index) => (
                  <Accordion type="single" collapsible key={index}>
                    <AccordionItem value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        <span className="font-medium text-blue-700">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Related Guides Section */}
        <section className="py-16 bg-gray-50 border-t border-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">More R&D and Innovation Funding</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-green-100">
                  <CardHeader>
                    <Briefcase className="w-8 h-8 text-green-600 mb-4" />
                    <CardTitle className="text-xl mb-2">Clean Tech Grants</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-6">
                      Explore funding for environmental and clean technology innovation projects.
                    </p>
                    <Button variant="outline" className="w-full text-green-700 border-green-200 hover:bg-green-50" asChild>
                      <Link href="/blog/canada-clean-technology-environment-grants-guide">
                        View Clean Tech
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="h-full hover:shadow-xl transition-all duration-300 border-green-100">
                  <CardHeader>
                    <MapPin className="w-8 h-8 text-green-600 mb-4" />
                    <CardTitle className="text-xl mb-2">Tech Funding</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-6">
                      Discover specialized funding programs for Canadian technology startups.
                    </p>
                    <Button variant="outline" className="w-full text-green-700 border-green-200 hover:bg-green-50" asChild>
                      <Link href="/blog/canadian-government-grants-tech-startups">
                        View Tech Funding
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="h-full hover:shadow-xl transition-all duration-300 border-green-100">
                  <CardHeader>
                    <Target className="w-8 h-8 text-green-600 mb-4" />
                    <CardTitle className="text-xl mb-2">Hiring Grants</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-6">
                      Find grants to subsidize hiring new talent for your R&D projects.
                    </p>
                    <Button variant="outline" className="w-full text-green-700 border-green-200 hover:bg-green-50" asChild>
                      <Link href="/blog/canada-employment-workforce-training-grants-guide">
                        View Hiring Grants
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Dual CTA Section */}
        <section className="py-16 bg-gradient-to-r from-green-600 to-green-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Access IRAP Government Funding?
              </h2>
              <p className="text-xl text-green-100 mb-8">
                Get the complete IRAP federal application guide or work with our government funding specialists
                who have secured $12M+ in IRAP approvals with deep federal compliance expertise.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                {/* Get Application Guide CTA */}
                <div className="bg-white/10 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">DIY Approach</h4>
                  <p className="text-green-100 text-sm mb-4">
                    Get our comprehensive IRAP government funding guide with federal compliance templates and success strategies.
                  </p>
                  <Button size="lg" className="w-full bg-white text-green-700 hover:bg-gray-100" asChild>
                    <Link href="/guides/apply-irap-government-grants">
                      <Download className="w-4 h-4 mr-2" />
                      Get IRAP Government Guide
                    </Link>
                  </Button>
                </div>

                {/* Get Expert Help CTA */}
                <div className="bg-yellow-500/20 border-2 border-yellow-400 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">Expert Assistance</h4>
                  <p className="text-yellow-100 text-sm mb-4">
                    Work with federal funding specialists who have secured $12M+ in IRAP approvals with 85% success rate and deep compliance expertise.
                  </p>
                  <Button size="lg" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                    <Link href="/contact?service=irap-government-expert-help">
                      Get Expert Help
                    </Link>
                  </Button>
                </div>
              </div>

              <p className="text-green-200 text-sm mt-6">
                85% success rate for IRAP applications • Average funding secured: $94K • Federal compliance expertise
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
