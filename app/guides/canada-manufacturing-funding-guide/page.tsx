import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, CheckCircle, Clock, FileText, Users, MessageCircle, Target, DollarSign, AlertTriangle, Download, Factory, Cog, Cpu, TrendingUp } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "How to Apply for Canada Manufacturing Funding 2025 | NGen, IRAP & CDAP Guide",
  description: "Step-by-step guide to applying for advanced manufacturing funding in Canada. Learn NGen application process, IRAP manufacturing funding, and strategies for $3.1B+ in Industry 4.0 grants.",
  keywords: "manufacturing funding application guide, NGen application process, IRAP manufacturing guide, CDAP manufacturing, Industry 4.0 funding Canada",
  openGraph: {
    title: "How to Apply for Canada Manufacturing Funding 2025",
    description: "Complete guide to advanced manufacturing funding applications with NGen, IRAP, and CDAP program strategies.",
    url: "https://grantfinder.pro/guides/canada-manufacturing-funding-guide",
  },
}

export default function CanadaManufacturingFundingGuide() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-700 to-gray-900 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🏭 Manufacturing Funding Application Guide
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                How to Apply for Canada Manufacturing Funding
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Complete step-by-step guide to applying for advanced manufacturing funding in Canada. Learn the NGen application
                process, IRAP manufacturing support, CDAP digital adoption, and how to secure up to $10M in Industry 4.0
                funding across 38+ programs.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Overview */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
                <div>
                  <div className="text-3xl font-bold text-gray-700 mb-2">$3.1B+</div>
                  <div className="text-gray-600">Manufacturing Funding Available</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">$10M</div>
                  <div className="text-gray-600">Maximum NGen Funding</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">50%</div>
                  <div className="text-gray-600">Typical Cost Coverage</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">38+</div>
                  <div className="text-gray-600">Active Programs</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">

              {/* Manufacturing Funding Overview */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Canada Advanced Manufacturing Funding Overview</h2>

                <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 mb-6">
                  <div className="flex items-start">
                    <Factory className="w-8 h-8 text-gray-700 mr-4 mt-1" />
                    <div>
                      <h4 className="font-bold text-gray-800 mb-2">Industry 4.0 Focus</h4>
                      <p className="text-gray-700">
                        Canada provides $3.1B+ annually in advanced manufacturing funding through federal and provincial programs
                        supporting automation, robotics, AI integration, smart manufacturing, and productivity enhancement.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">1</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Assess Needs</h4>
                      <p className="text-sm text-gray-600">
                        Identify automation gaps and productivity improvement opportunities
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">2</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Select Programs</h4>
                      <p className="text-sm text-gray-600">
                        Match manufacturing needs with appropriate funding programs
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">3</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Build Business Case</h4>
                      <p className="text-sm text-gray-600">
                        Develop ROI analysis and productivity metrics
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">4</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Apply & Implement</h4>
                      <p className="text-sm text-gray-600">
                        Submit applications and execute technology deployment
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* NGen Application Process */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">NGen Application Process (Up to $10M)</h2>

                <Card className="border-gray-300">
                  <CardHeader>
                    <CardTitle className="text-gray-800 flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      Next Generation Manufacturing Canada
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Funding:</strong> Up to $10M</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Coverage:</strong> Up to 50%</span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Type:</strong> Collaborative</span>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-3 text-gray-700">Eligibility Requirements:</h5>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Canadian manufacturing operations</li>
                          <li>• Consortium of 2+ partners required</li>
                          <li>• Industry 4.0 technology focus</li>
                          <li>• Commercialization pathway clear</li>
                          <li>• Scale-up and adoption potential</li>
                          <li>• Skills development component</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-3 text-blue-700">Application Components:</h5>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Project description and innovation</li>
                          <li>• Productivity and efficiency gains</li>
                          <li>• Consortium partnership details</li>
                          <li>• Budget and financial projections</li>
                          <li>• Market adoption strategy</li>
                          <li>• Workforce development plan</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* IRAP Manufacturing */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">IRAP Manufacturing Innovation Funding</h2>

                <Card className="border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700 flex items-center">
                      <Cog className="w-5 h-5 mr-2" />
                      IRAP for Manufacturing SMEs
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Funding:</strong> Up to $500K</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Coverage:</strong> 60-80%</span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Type:</strong> Non-Repayable</span>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                      <h4 className="font-bold mb-2 text-blue-800">Manufacturing Innovation Projects:</h4>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
                        <div>
                          <p><strong>Technology Development:</strong></p>
                          <ul className="ml-4 space-y-1">
                            <li>• Process automation systems</li>
                            <li>• Quality control technologies</li>
                            <li>• Production optimization tools</li>
                            <li>• Custom manufacturing equipment</li>
                          </ul>
                        </div>
                        <div>
                          <p><strong>Digital Integration:</strong></p>
                          <ul className="ml-4 space-y-1">
                            <li>• IoT sensor networks</li>
                            <li>• AI-powered systems</li>
                            <li>• Predictive maintenance tools</li>
                            <li>• Supply chain digitization</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-3 text-blue-700">Application Process:</h5>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Contact local Industrial Technology Advisor</li>
                          <li>• Prepare technical project proposal</li>
                          <li>• Demonstrate innovation and feasibility</li>
                          <li>• Submit budget and timeline</li>
                          <li>• Receive advisor support throughout</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-3 text-green-700">Support Included:</h5>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Dedicated Industrial Technology Advisor</li>
                          <li>• Access to research networks</li>
                          <li>• Youth employment funding available</li>
                          <li>• Business scale-up support</li>
                          <li>• Export market development assistance</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* CDAP Digital Adoption */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">CDAP Manufacturing Digital Adoption</h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-purple-200">
                    <CardHeader>
                      <CardTitle className="text-purple-700">Digital Adoption Program</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                          <div>
                            <strong>Grant Component</strong>
                            <p className="text-sm text-gray-600">$15K for digital adoption plan</p>
                          </div>
                        </div>

                        <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                          <div>
                            <strong>Loan Component</strong>
                            <p className="text-sm text-gray-600">Up to $100K interest-free</p>
                          </div>
                        </div>

                        <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                          <div>
                            <strong>Advisor Support</strong>
                            <p className="text-sm text-gray-600">Digital advisor included</p>
                          </div>
                        </div>

                        <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                          <div>
                            <strong>Technology Focus</strong>
                            <p className="text-sm text-gray-600">ERP, MES, IoT, cloud platforms</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-green-200">
                    <CardHeader>
                      <CardTitle className="text-green-700">Manufacturing Technologies</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Manufacturing Execution Systems (MES)</strong>
                            <p className="text-sm text-gray-600">Real-time production tracking</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Enterprise Resource Planning (ERP)</strong>
                            <p className="text-sm text-gray-600">Integrated business management</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>IoT & Sensors</strong>
                            <p className="text-sm text-gray-600">Connected equipment monitoring</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Cloud Platforms</strong>
                            <p className="text-sm text-gray-600">Data analytics and collaboration</p>
                          </div>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Program Selection Matrix */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Manufacturing Program Selection by Need</h2>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-3 text-left">Manufacturing Need</th>
                        <th className="border border-gray-300 p-3 text-left">Recommended Programs</th>
                        <th className="border border-gray-300 p-3 text-left">Funding Range</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-200 p-3">
                          <strong>Digital Adoption</strong>
                          <p className="text-sm text-gray-600">ERP, MES, cloud systems</p>
                        </td>
                        <td className="border border-gray-200 p-3">
                          <ul className="text-sm space-y-1">
                            <li>• CDAP ($15K + $100K loan)</li>
                            <li>• Provincial digital grants</li>
                            <li>• Technology adoption programs</li>
                          </ul>
                        </td>
                        <td className="border border-gray-200 p-3">
                          <strong>$15K - $115K</strong>
                        </td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-200 p-3">
                          <strong>Process Innovation</strong>
                          <p className="text-sm text-gray-600">New production methods</p>
                        </td>
                        <td className="border border-gray-200 p-3">
                          <ul className="text-sm space-y-1">
                            <li>• IRAP Innovation Funding</li>
                            <li>• SR&ED Tax Credits</li>
                            <li>• Provincial R&D programs</li>
                          </ul>
                        </td>
                        <td className="border border-gray-200 p-3">
                          <strong>$100K - $500K</strong>
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 p-3">
                          <strong>Automation & Robotics</strong>
                          <p className="text-sm text-gray-600">Equipment and systems</p>
                        </td>
                        <td className="border border-gray-200 p-3">
                          <ul className="text-sm space-y-1">
                            <li>• NGen collaborative projects</li>
                            <li>• Regional development funding</li>
                            <li>• Automation-specific programs</li>
                          </ul>
                        </td>
                        <td className="border border-gray-200 p-3">
                          <strong>$500K - $5M</strong>
                        </td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-200 p-3">
                          <strong>Large-Scale Transformation</strong>
                          <p className="text-sm text-gray-600">Facility-wide Industry 4.0</p>
                        </td>
                        <td className="border border-gray-200 p-3">
                          <ul className="text-sm space-y-1">
                            <li>• NGen major projects</li>
                            <li>• Strategic Innovation Fund</li>
                            <li>• Provincial transformation programs</li>
                          </ul>
                        </td>
                        <td className="border border-gray-200 p-3">
                          <strong>$5M - $10M+</strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Success Strategies */}
              <div className="bg-blue-50 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Manufacturing Funding Success Strategies</h2>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-green-700">✅ Best Practices</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span><strong>Quantify ROI:</strong> Show clear productivity gains, cost savings, and efficiency improvements with metrics</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span><strong>Technology Integration Plan:</strong> Demonstrate how new technology integrates with existing systems</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span><strong>Workforce Development:</strong> Include comprehensive training and upskilling strategies</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span><strong>Build Partnerships:</strong> Collaborate with technology providers, research institutions, and industry partners</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-lg mb-4 text-red-700">❌ Common Mistakes</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span><strong>Weak Business Case:</strong> Insufficient ROI analysis and productivity improvement metrics</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span><strong>Technology Without Strategy:</strong> Adopting technology without clear implementation roadmap</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span><strong>Ignoring Change Management:</strong> Not addressing workforce training and organizational change</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span><strong>Poor Financial Planning:</strong> Inadequate matching funds or financial capacity demonstration</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Official Resources */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Official Manufacturing Resources</h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-gray-300">
                    <CardHeader>
                      <CardTitle className="text-gray-800">Government Resources</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">NGen</h5>
                          <p className="text-sm text-gray-600">Next Generation Manufacturing Canada</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://www.ngen.ca" target="_blank" rel="noopener noreferrer">
                            Visit <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">IRAP</h5>
                          <p className="text-sm text-gray-600">Industrial Research Assistance Program</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://nrc.canada.ca/en/support-technology-innovation/nrc-irap" target="_blank" rel="noopener noreferrer">
                            Learn More <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">CDAP</h5>
                          <p className="text-sm text-gray-600">Canada Digital Adoption Program</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://ised-isde.canada.ca/site/canada-digital-adoption-program/en" target="_blank" rel="noopener noreferrer">
                            Explore <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-blue-700">Professional Support</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">Manufacturing Assessment</h5>
                          <p className="text-sm text-gray-600">Free eligibility and program review</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="/contact?service=manufacturing-assessment">
                            Get Assessment
                          </Link>
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">ROI Calculator</h5>
                          <p className="text-sm text-gray-600">Calculate automation ROI</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="/contact">
                            Calculate ROI
                          </Link>
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">Expert Help</h5>
                          <p className="text-sm text-gray-600">Professional manufacturing funding support</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="/contact?service=manufacturing-expert-help">
                            Get Help
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Lead Magnet CTA */}
              <div className="bg-gradient-to-r from-gray-700 to-gray-900 rounded-lg p-8 text-white text-center mb-8">
                <Download className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-2xl font-bold mb-4">Get Your Free Manufacturing Funding Application Kit</h3>
                <p className="text-gray-300 mb-6 text-lg">
                  Download our comprehensive manufacturing funding guide with NGen templates, IRAP application tools,
                  ROI calculators, and successful project examples.
                </p>
                <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100" asChild>
                  <Link href="/download/canada-manufacturing-funding-guide">
                    <Download className="w-5 h-5 mr-2" />
                    Download Free Guide
                  </Link>
                </Button>
              </div>

              {/* Contact CTA */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-8 text-white text-center">
                <Users className="w-16 h-16 mx-auto mb-4 text-blue-100" />
                <h3 className="text-2xl font-bold mb-4">Ready to Apply for Manufacturing Funding?</h3>
                <p className="text-blue-100 mb-6 text-lg">
                  Our manufacturing funding specialists understand NGen, IRAP, and CDAP programs.
                  We've secured $120M+ in advanced manufacturing funding with 82% success rate.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100" asChild>
                    <Link href="/contact?service=manufacturing-expert-help">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Get Expert Help
                    </Link>
                  </Button>
                  <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white border-0" asChild>
                    <Link href="/contact?service=manufacturing-assessment">
                      Free Manufacturing Assessment
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
