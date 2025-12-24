import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, CheckCircle, Clock, FileText, Users, MessageCircle, Lightbulb, Target, DollarSign, AlertTriangle, Download, Leaf, Zap, Sun, Wind } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "How to Apply for Canada CleanTech Funding 2025 | SDTC, ITCs & Net Zero Guide",
  description: "Step-by-step guide to applying for clean technology funding in Canada. Learn SDTC application process, Clean Tech ITC claims, and strategies for $1.2B+ in environmental innovation funding.",
  keywords: "cleantech funding application guide, SDTC application process, Clean Tech ITC guide, Net Zero Accelerator application, environmental innovation funding Canada",
  openGraph: {
    title: "How to Apply for Canada CleanTech Funding 2025",
    description: "Complete guide to clean technology funding applications with SDTC, Clean Tech ITCs, and Net Zero program strategies.",
    url: "https://grantfinder.pro/guides/canada-cleantech-funding-guide",
  },
}

export default function CanadaCleanTechFundingGuide() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-teal-600 to-green-700 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🌱 CleanTech Funding Application Guide
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                How to Apply for Canada Clean Technology Funding
              </h1>
              <p className="text-xl text-teal-100 mb-8">
                Complete step-by-step guide to applying for clean technology funding in Canada. Learn the SDTC application
                process, Clean Tech ITC claims, Net Zero Accelerator strategies, and how to secure up to $15M in environmental
                innovation funding across 22+ programs.
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
                  <div className="text-3xl font-bold text-teal-600 mb-2">$1.2B+</div>
                  <div className="text-gray-600">CleanTech Funding Available</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">$15M</div>
                  <div className="text-gray-600">Maximum SDTC Grant</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">30%</div>
                  <div className="text-gray-600">Clean Tech ITC Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">22+</div>
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

              {/* CleanTech Funding Overview */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Canada Clean Technology Funding Overview</h2>

                <div className="bg-teal-50 border border-teal-200 rounded-lg p-6 mb-6">
                  <div className="flex items-start">
                    <Leaf className="w-8 h-8 text-teal-600 mr-4 mt-1" />
                    <div>
                      <h4 className="font-bold text-teal-800 mb-2">Environmental Innovation Focus</h4>
                      <p className="text-teal-700">
                        Canada provides $1.2B+ annually in clean technology funding through federal and provincial programs
                        supporting renewable energy, emissions reduction, sustainable technologies, and net-zero transition projects.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">1</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Assess Technology</h4>
                      <p className="text-sm text-gray-600">
                        Determine TRL level and environmental impact metrics
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">2</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Select Programs</h4>
                      <p className="text-sm text-gray-600">
                        Match technology stage with appropriate funding programs
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">3</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Prepare Application</h4>
                      <p className="text-sm text-gray-600">
                        Develop comprehensive proposal with impact metrics
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">4</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Submit & Execute</h4>
                      <p className="text-sm text-gray-600">
                        Submit applications and implement project milestones
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* SDTC Application Process */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">SDTC Application Process (Up to $15M)</h2>

                <Card className="border-teal-200">
                  <CardHeader>
                    <CardTitle className="text-teal-700 flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      Sustainable Development Technology Canada
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Funding:</strong> Up to $15M</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Coverage:</strong> Up to 40%</span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Stage:</strong> Demonstration</span>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-3 text-teal-700">Eligibility Requirements:</h5>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Canadian for-profit corporation</li>
                          <li>• Pre-commercial technology (TRL 5-8)</li>
                          <li>• Minimum $5M total project cost</li>
                          <li>• Addresses climate, air, water, or soil</li>
                          <li>• Demonstrated technical feasibility</li>
                          <li>• Clear commercialization pathway</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-3 text-green-700">Application Components:</h5>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Technology description and innovation</li>
                          <li>• Environmental impact quantification</li>
                          <li>• Project plan and milestones</li>
                          <li>• Budget and financial projections</li>
                          <li>• Market analysis and commercialization</li>
                          <li>• Team capabilities and partnerships</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Clean Technology ITCs */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Clean Technology Investment Tax Credits</h2>

                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700 flex items-center">
                      <Zap className="w-5 h-5 mr-2" />
                      Clean Tech ITC Rates & Equipment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <Sun className="w-5 h-5 text-yellow-600 mr-2" />
                        <span><strong>Solar/Wind:</strong> 30% ITC</span>
                      </div>
                      <div className="flex items-center">
                        <Zap className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Storage:</strong> 30% ITC</span>
                      </div>
                      <div className="flex items-center">
                        <Wind className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Hydrogen:</strong> 15% ITC</span>
                      </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                      <h4 className="font-bold mb-2 text-green-800">Eligible Equipment (30% ITC):</h4>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-green-700">
                        <div>
                          <p><strong>Renewable Generation:</strong></p>
                          <ul className="ml-4 space-y-1">
                            <li>• Solar photovoltaic systems</li>
                            <li>• Concentrated solar power</li>
                            <li>• Wind turbines (small & utility-scale)</li>
                            <li>• Small modular nuclear reactors</li>
                          </ul>
                        </div>
                        <div>
                          <p><strong>Energy Storage:</strong></p>
                          <ul className="ml-4 space-y-1">
                            <li>• Electrical energy storage systems</li>
                            <li>• Thermal energy storage</li>
                            <li>• Grid-scale battery systems</li>
                            <li>• Pumped hydro storage</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-3 text-green-700">ITC Claim Process:</h5>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Identify eligible clean technology equipment</li>
                          <li>• Calculate investment tax credit amount</li>
                          <li>• File ITC claim with corporate tax return</li>
                          <li>• Receive refundable credit payment</li>
                          <li>• Maintain equipment compliance</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-3 text-blue-700">Key Requirements:</h5>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Equipment must be new and unused</li>
                          <li>• Installed in Canada for Canadian use</li>
                          <li>• Acquired and available for use by 2034</li>
                          <li>• Meets specific technical standards</li>
                          <li>• Refundable for taxable Canadian corporations</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Net Zero Accelerator */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Net Zero Accelerator Application</h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-blue-700">Large-Scale Projects</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                          <div>
                            <strong>Funding Range</strong>
                            <p className="text-sm text-gray-600">$10M - $100M per project</p>
                          </div>
                        </div>

                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                          <div>
                            <strong>Project Requirements</strong>
                            <p className="text-sm text-gray-600">Minimum $50M total project cost</p>
                          </div>
                        </div>

                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                          <div>
                            <strong>Focus Areas</strong>
                            <p className="text-sm text-gray-600">Industrial decarbonization & CCUS</p>
                          </div>
                        </div>

                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                          <div>
                            <strong>Net-Zero Commitment</strong>
                            <p className="text-sm text-gray-600">Credible pathway to net-zero by 2050</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-green-200">
                    <CardHeader>
                      <CardTitle className="text-green-700">Application Strategy</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Significant GHG Reduction</strong>
                            <p className="text-sm text-gray-600">Quantify emissions reduction impact</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Economic Benefits</strong>
                            <p className="text-sm text-gray-600">Demonstrate job creation and GDP impact</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Technology Innovation</strong>
                            <p className="text-sm text-gray-600">Show technological advancement</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Financial Viability</strong>
                            <p className="text-sm text-gray-600">Strong balance sheet and co-funding</p>
                          </div>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Program Selection Matrix */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">CleanTech Program Selection by Stage</h2>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-teal-50">
                        <th className="border border-teal-200 p-3 text-left">Technology Stage (TRL)</th>
                        <th className="border border-teal-200 p-3 text-left">Recommended Programs</th>
                        <th className="border border-teal-200 p-3 text-left">Funding Range</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-200 p-3">
                          <strong>Early R&D (TRL 1-3)</strong>
                          <p className="text-sm text-gray-600">Concept to proof-of-concept</p>
                        </td>
                        <td className="border border-gray-200 p-3">
                          <ul className="text-sm space-y-1">
                            <li>• SR&ED Tax Credits</li>
                            <li>• NSERC Grants</li>
                            <li>• Provincial research programs</li>
                          </ul>
                        </td>
                        <td className="border border-gray-200 p-3">
                          <strong>Up to $2M</strong>
                        </td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-200 p-3">
                          <strong>Development (TRL 4-5)</strong>
                          <p className="text-sm text-gray-600">Prototype and lab validation</p>
                        </td>
                        <td className="border border-gray-200 p-3">
                          <ul className="text-sm space-y-1">
                            <li>• IRAP Innovation Funding</li>
                            <li>• Clean Growth Program</li>
                            <li>• SR&ED + Provincial credits</li>
                          </ul>
                        </td>
                        <td className="border border-gray-200 p-3">
                          <strong>$500K - $5M</strong>
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 p-3">
                          <strong>Demonstration (TRL 6-8)</strong>
                          <p className="text-sm text-gray-600">Pilot and demonstration projects</p>
                        </td>
                        <td className="border border-gray-200 p-3">
                          <ul className="text-sm space-y-1">
                            <li>• SDTC Funding (primary)</li>
                            <li>• Clean Growth Program</li>
                            <li>• Provincial demonstration grants</li>
                          </ul>
                        </td>
                        <td className="border border-gray-200 p-3">
                          <strong>$5M - $15M</strong>
                        </td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-200 p-3">
                          <strong>Commercial (TRL 9)</strong>
                          <p className="text-sm text-gray-600">Full-scale deployment</p>
                        </td>
                        <td className="border border-gray-200 p-3">
                          <ul className="text-sm space-y-1">
                            <li>• Clean Technology ITCs</li>
                            <li>• Net Zero Accelerator</li>
                            <li>• Strategic Innovation Fund</li>
                          </ul>
                        </td>
                        <td className="border border-gray-200 p-3">
                          <strong>$10M - $100M+</strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Success Strategies */}
              <div className="bg-green-50 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">CleanTech Funding Success Strategies</h2>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-green-700">✅ Best Practices</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span><strong>Quantify Environmental Impact:</strong> Use standardized metrics for GHG reductions and sustainability benefits</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span><strong>Demonstrate Technology Readiness:</strong> Match appropriate TRL level with program requirements</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span><strong>Stack Multiple Programs:</strong> Combine federal, provincial, and tax incentives strategically</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span><strong>Build Strong Partnerships:</strong> Engage industry partners, utilities, and research institutions</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-lg mb-4 text-red-700">❌ Common Mistakes</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span><strong>Weak Impact Metrics:</strong> Insufficient quantification of environmental benefits and GHG reductions</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span><strong>Wrong Program Selection:</strong> Applying to programs not aligned with technology stage</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span><strong>Inadequate Co-Funding:</strong> Failing to secure required matching funds from partners</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span><strong>Poor Market Analysis:</strong> Limited demonstration of commercial viability and scalability</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Official Resources */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Official CleanTech Resources</h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-teal-200">
                    <CardHeader>
                      <CardTitle className="text-teal-700">Government Resources</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-teal-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">SDTC</h5>
                          <p className="text-sm text-gray-600">Sustainable Development Technology Canada</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://www.sdtc.ca" target="_blank" rel="noopener noreferrer">
                            Visit <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-teal-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">Clean Tech ITCs</h5>
                          <p className="text-sm text-gray-600">Investment tax credit information</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://www.canada.ca/cleantech-itc" target="_blank" rel="noopener noreferrer">
                            Learn More <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-teal-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">Net Zero Accelerator</h5>
                          <p className="text-sm text-gray-600">Strategic Innovation Fund stream</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://www.ic.gc.ca/netzero" target="_blank" rel="noopener noreferrer">
                            Explore <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-green-200">
                    <CardHeader>
                      <CardTitle className="text-green-700">Professional Support</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">CleanTech Assessment</h5>
                          <p className="text-sm text-gray-600">Free eligibility and program review</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="/contact?service=cleantech-assessment">
                            Get Assessment
                          </Link>
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">ITC Calculator</h5>
                          <p className="text-sm text-gray-600">Calculate your Clean Tech ITC savings</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="/contact">
                            Calculate ITCs
                          </Link>
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">Expert Help</h5>
                          <p className="text-sm text-gray-600">Professional cleantech funding support</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="/contact?service=cleantech-expert-help">
                            Get Help
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Lead Magnet CTA */}
              <div className="bg-gradient-to-r from-teal-600 to-green-700 rounded-lg p-8 text-white text-center mb-8">
                <Download className="w-16 h-16 mx-auto mb-4 text-teal-100" />
                <h3 className="text-2xl font-bold mb-4">Get Your Free CleanTech Funding Application Kit</h3>
                <p className="text-teal-100 mb-6 text-lg">
                  Download our comprehensive clean technology funding guide with SDTC templates, Clean Tech ITC calculators,
                  program selection tools, and successful application examples.
                </p>
                <Button size="lg" className="bg-white text-teal-700 hover:bg-gray-100" asChild>
                  <Link href="/download/canada-cleantech-funding-guide">
                    <Download className="w-5 h-5 mr-2" />
                    Download Free Guide
                  </Link>
                </Button>
              </div>

              {/* Contact CTA - FIXED BACKGROUND */}
              <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-lg p-8 text-white text-center">
                <Users className="w-16 h-16 mx-auto mb-4 text-green-100" />
                <h3 className="text-2xl font-bold mb-4">Ready to Apply for CleanTech Funding?</h3>
                <p className="text-green-100 mb-6 text-lg">
                  Our clean technology funding specialists understand SDTC, Clean Tech ITCs, and Net Zero programs.
                  We've secured $75M+ in environmental innovation funding with 85% success rate.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100" asChild>
                    <Link href="/contact?service=cleantech-expert-help">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Get Expert Help
                    </Link>
                  </Button>
                  <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white border-0" asChild>
                    <Link href="/contact?service=cleantech-assessment">
                      Free CleanTech Assessment
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
