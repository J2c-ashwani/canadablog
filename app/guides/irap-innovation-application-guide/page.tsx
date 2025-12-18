import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, CheckCircle, Clock, FileText, Users, MessageCircle, Lightbulb, Target, DollarSign, AlertTriangle, Download, Shield } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "How to Apply for IRAP Innovation Funding 2025 | Industrial Research Assistance Program Guide",
  description: "Step-by-step guide to applying for IRAP innovation funding. Learn the application process, ITA engagement, and winning strategies for up to $500K R&D grants.",
  keywords: "IRAP application guide, IRAP innovation funding, Industrial Research Assistance Program application, ITA engagement, R&D grants Canada",
  openGraph: {
    title: "How to Apply for IRAP Innovation Funding 2025",
    description: "Complete guide to IRAP innovation applications with step-by-step process and ITA engagement strategies.",
    url: "https://fsidigital.ca/guides/irap-innovation-application-guide",
  },
}

export default function IRAPInnovationApplicationGuide() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🔬 IRAP Innovation Application Guide
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                How to Apply for IRAP Innovation Funding
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Complete step-by-step guide to applying for Industrial Research Assistance Program innovation funding. 
                Learn the application process, ITA engagement strategies, and how to secure up to $500K in non-repayable R&D contributions.
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
                  <div className="text-3xl font-bold text-blue-600 mb-2">$500K</div>
                  <div className="text-gray-600">Maximum Innovation Funding</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">80%</div>
                  <div className="text-gray-600">Maximum Funding Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">500</div>
                  <div className="text-gray-600">Employee Limit</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">24</div>
                  <div className="text-gray-600">Months Max Duration</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              
              {/* IRAP Application Overview */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">IRAP Innovation Funding Application Process</h2>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                  <div className="flex items-start">
                    <Lightbulb className="w-8 h-8 text-blue-600 mr-4 mt-1" />
                    <div>
                      <h4 className="font-bold text-blue-800 mb-2">SME Innovation Focus</h4>
                      <p className="text-blue-700">
                        IRAP combines generous non-repayable funding with dedicated Industrial Technology Advisor (ITA) support. 
                        Unlike loans, funding doesn't require repayment and comes with expert guidance throughout your innovation journey.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">1</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Connect with ITA</h4>
                      <p className="text-sm text-gray-600">
                        Contact your local Industrial Technology Advisor to discuss project eligibility
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">2</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Project Assessment</h4>
                      <p className="text-sm text-gray-600">
                        Work with ITA to assess technical feasibility and commercial potential
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">3</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Develop Proposal</h4>
                      <p className="text-sm text-gray-600">
                        Prepare comprehensive project proposal with ITA guidance
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">4</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Submit & Execute</h4>
                      <p className="text-sm text-gray-600">
                        Submit application and execute project with ongoing ITA support
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Eligibility Requirements */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">IRAP Innovation Eligibility Requirements</h2>
                
                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700 flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      Company & Project Eligibility
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
                        <span><strong>Rate:</strong> 60-80% of costs</span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Size:</strong> Under 500 employees</span>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-3 text-green-700">Company Requirements:</h5>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Canadian incorporated for-profit business</li>
                          <li>• Fewer than 500 employees worldwide</li>
                          <li>• Financially stable with adequate cash flow</li>
                          <li>• Demonstrated innovation capacity</li>
                          <li>• Technology-based or innovation-focused</li>
                          <li>• Strong commercial growth potential</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-3 text-green-700">Project Requirements:</h5>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Technology development with technical uncertainty</li>
                          <li>• New product or service development</li>
                          <li>• Significant process improvements</li>
                          <li>• Pre-commercial technology validation</li>
                          <li>• Clear competitive advantage potential</li>
                          <li>• Export or national market focus</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* IRAP Funding Streams */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">IRAP Innovation Funding Streams</h2>
                
                <Card className="border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700 flex items-center">
                      <Lightbulb className="w-5 h-5 mr-2" />
                      R&D Innovation Project Funding
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Small Projects:</strong> Up to $50K</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Mid-size:</strong> Up to $500K</span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Duration:</strong> 12-24 months</span>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                      <h4 className="font-bold mb-2 text-blue-800">Funding Coverage:</h4>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
                        <div>
                          <p><strong>Salaries & Benefits:</strong> Up to 80% of costs</p>
                          <p><strong>Contractor Services:</strong> Up to 50% of costs</p>
                          <p><strong>Materials & Supplies:</strong> Case-by-case basis</p>
                        </div>
                        <div>
                          <p><strong>Equipment:</strong> Limited coverage available</p>
                          <p><strong>Travel:</strong> Project-related travel considered</p>
                          <p><strong>Overhead:</strong> Not typically covered</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-3 text-blue-700">Small Technology Innovation (ARP):</h5>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Accelerated review process</li>
                          <li>• Proof-of-concept development</li>
                          <li>• Commercialization preparation</li>
                          <li>• Quick approval for smaller projects</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-3 text-blue-700">Mid-sized Innovation Projects:</h5>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Comprehensive R&D project support</li>
                          <li>• Product development and innovation</li>
                          <li>• Process improvement initiatives</li>
                          <li>• Technology commercialization</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* ITA Engagement Strategy */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Industrial Technology Advisor (ITA) Engagement</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-orange-200">
                    <CardHeader>
                      <CardTitle className="text-orange-700">ITA Services & Support</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-orange-50 rounded">
                          <div>
                            <strong>Technical Advisory</strong>
                            <p className="text-sm text-gray-600">Project planning and risk assessment</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 bg-orange-50 rounded">
                          <div>
                            <strong>Business Guidance</strong>
                            <p className="text-sm text-gray-600">Commercialization and market strategies</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 bg-orange-50 rounded">
                          <div>
                            <strong>Network Access</strong>
                            <p className="text-sm text-gray-600">Connections to partners and customers</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 bg-orange-50 rounded">
                          <div>
                            <strong>Ongoing Support</strong>
                            <p className="text-sm text-gray-600">Throughout project lifecycle</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-green-200">
                    <CardHeader>
                      <CardTitle className="text-green-700">ITA Engagement Tips</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Contact Early</strong>
                            <p className="text-sm text-gray-600">Engage ITA before developing formal proposal</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Be Prepared</strong>
                            <p className="text-sm text-gray-600">Have clear project concept and business case</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Regular Communication</strong>
                            <p className="text-sm text-gray-600">Maintain ongoing dialogue throughout process</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Leverage Expertise</strong>
                            <p className="text-sm text-gray-600">Use ITA's industry knowledge and network</p>
                          </div>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Application Components */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">IRAP Application Components</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <Card className="border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-blue-700">📊 Technical Components</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Project Description</strong>
                            <p className="text-sm text-gray-600">Clear technical objectives and innovation focus</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Technical Approach</strong>
                            <p className="text-sm text-gray-600">Methodology and work plan with milestones</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Risk Assessment</strong>
                            <p className="text-sm text-gray-600">Technical challenges and mitigation strategies</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Team Qualifications</strong>
                            <p className="text-sm text-gray-600">Key personnel experience and capabilities</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-green-200">
                    <CardHeader>
                      <CardTitle className="text-green-700">📋 Business Components</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Market Analysis</strong>
                            <p className="text-sm text-gray-600">Target market size, competition, and positioning</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Commercialization Plan</strong>
                            <p className="text-sm text-gray-600">Path to market and revenue projections</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Budget & Timeline</strong>
                            <p className="text-sm text-gray-600">Detailed project budget and milestones</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Company Profile</strong>
                            <p className="text-sm text-gray-600">Capabilities, history, and financial stability</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Success Strategies */}
              <div className="bg-green-50 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">IRAP Innovation Application Success Strategies</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-green-700">✅ Winning Strategies</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Early and meaningful ITA engagement throughout process</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Clear demonstration of technical uncertainty and innovation</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Strong commercialization plan with realistic market analysis</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Qualified team with relevant technical and business experience</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-red-700">❌ Common Pitfalls</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span>Late ITA contact or inadequate relationship building</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span>Weak technical content or insufficient innovation focus</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span>Poor market analysis or unrealistic commercialization timeline</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span>Inadequate budget justification or timeline planning</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Official Resources */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Official IRAP Resources</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-blue-700">IRAP Resources</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">NRC-IRAP</h5>
                          <p className="text-sm text-gray-600">Official IRAP program website</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://nrc.canada.ca/en/support-technology-innovation" target="_blank" rel="noopener noreferrer">
                            Visit <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">ITA Directory</h5>
                          <p className="text-sm text-gray-600">Find your local Industrial Technology Advisor</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://nrc.canada.ca/en/support-technology-innovation/about-irap/find-your-nrc-irap-advisor" target="_blank" rel="noopener noreferrer">
                            Find ITA <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">Youth Employment</h5>
                          <p className="text-sm text-gray-600">Graduate placement program details</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://nrc.canada.ca/en/support-technology-innovation/funding-technology-innovation/nrc-irap-youth-employment-program" target="_blank" rel="noopener noreferrer">
                            Learn More <ExternalLink className="w-3 h-3 ml-1" />
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
                          <h5 className="font-semibold">IRAP Assessment</h5>
                          <p className="text-sm text-gray-600">Free eligibility review and project assessment</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="/contact?service=irap-innovation-assessment">
                            Get Assessment <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">ITA Connection</h5>
                          <p className="text-sm text-gray-600">Help connecting with right ITA in your region</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="/contact?service=ita-connection-help">
                            Connect ITA <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">Application Support</h5>
                          <p className="text-sm text-gray-600">Professional IRAP application development</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="/contact?service=irap-innovation-expert-help">
                            Get Help <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Lead Magnet CTA */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-8 text-white text-center mb-8">
                <Download className="w-16 h-16 mx-auto mb-4 text-blue-100" />
                <h3 className="text-2xl font-bold mb-4">Get Your Free IRAP Innovation Application Kit</h3>
                <p className="text-blue-100 mb-6 text-lg">
                  Download our comprehensive IRAP innovation application guide with project planning templates, 
                  ITA engagement strategies, and successful application examples.
                </p>
                <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100" asChild>
                  <Link href="/contact?service=irap-innovation-expert-help">
                    <Download className="w-5 h-5 mr-2" />
                    Request Application Guide
                  </Link>
                </Button>
              </div>

              {/* Contact CTA */}
              <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-lg p-8 text-white text-center">
                <Users className="w-16 h-16 mx-auto mb-4 text-green-100" />
                <h3 className="text-2xl font-bold mb-4">Ready to Apply for IRAP Innovation Funding?</h3>
                <p className="text-green-100 mb-6 text-lg">
                  Our R&D funding specialists understand the IRAP process and can help you connect with the right ITA, 
                  develop compelling proposals, and maximize your chances of securing up to $500K in funding.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-white text-green-700 hover:bg-green-50 font-semibold shadow-lg" asChild>
                    <Link href="/contact?service=irap-innovation-expert-help">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Get Expert Help
                    </Link>
                  </Button>
                  <Button size="lg" className="bg-green-700 text-white hover:bg-green-800 font-semibold shadow-lg border-2 border-white" asChild>
                    <Link href="/contact?service=irap-innovation-assessment">
                      Free IRAP Assessment
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
