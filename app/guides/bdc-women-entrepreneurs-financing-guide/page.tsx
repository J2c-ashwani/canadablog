import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, CheckCircle, Clock, FileText, Users, MessageCircle, Lightbulb, Target, DollarSign, AlertTriangle, Download, Shield, Building, TrendingUp, Zap, Award } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "How to Apply for BDC Women Entrepreneurs Financing 2025 | Complete Application Guide",
  description: "Step-by-step guide to applying for BDC Women Entrepreneurs financing with flexible loans and advisory services. Learn eligibility, application process, and winning strategies.",
  keywords: "BDC Women Entrepreneurs application guide, BDC women business loans, flexible financing application, BDC advisory services",
  openGraph: {
    title: "How to Apply for BDC Women Entrepreneurs Financing 2025",
    description: "Complete guide to BDC financing applications with step-by-step process and advisor engagement strategies.",
    url: "https://fsidigital.ca/guides/bdc-women-entrepreneurs-financing-guide",
  },
}

export default function BDCWomenEntrepreneursApplicationGuide() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-teal-800 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🏦 BDC Financing Application Guide
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                How to Apply for BDC Women Entrepreneurs Financing
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Complete step-by-step guide to applying for BDC flexible financing with strategic advisory services. 
                Learn the application process, advisor engagement strategies, and how to secure patient capital 
                for women-led business growth from Business Development Bank of Canada.
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
                  <div className="text-3xl font-bold text-blue-600 mb-2">Flexible</div>
                  <div className="text-gray-600">Customized Terms</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">All Stages</div>
                  <div className="text-gray-600">Startup to Scale-Up</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-teal-600 mb-2">Advisory</div>
                  <div className="text-gray-600">Expert Guidance</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">Patient</div>
                  <div className="text-gray-600">Growth Capital</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              
              {/* BDC Application Overview */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">BDC Financing Application Process</h2>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                  <div className="flex items-start">
                    <Building className="w-8 h-8 text-blue-600 mr-4 mt-1" />
                    <div>
                      <h4 className="font-bold text-blue-800 mb-2">Women Entrepreneur Banking Partner</h4>
                      <p className="text-blue-700">
                        BDC combines flexible financing with expert advisory services specifically for women-led businesses. 
                        Unlike traditional banks, BDC offers patient capital with terms aligned to business cash flow, 
                        plus strategic guidance from dedicated advisors with women entrepreneur expertise.
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
                      <h4 className="font-bold text-lg mb-3">Connect with Advisor</h4>
                      <p className="text-sm text-gray-600">
                        Initial consultation with BDC advisor to discuss needs
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">2</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Prepare Application</h4>
                      <p className="text-sm text-gray-600">
                        Gather financials and develop business plan with advisor
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">3</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Submit Application</h4>
                      <p className="text-sm text-gray-600">
                        Formal application through BDC with advisor support
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">4</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Receive Financing</h4>
                      <p className="text-sm text-gray-600">
                        Credit review, approval, and flexible disbursement
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Eligibility Requirements */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">BDC Financing Eligibility Requirements</h2>
                
                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700 flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      Business Owner & Financing Eligibility
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Type:</strong> Flexible Loans</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Stage:</strong> All Stages</span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-teal-600 mr-2" />
                        <span><strong>Advisory:</strong> Included</span>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-3 text-green-700">Business Requirements:</h5>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Women-led business (ownership or leadership)</li>
                          <li>• Canadian incorporated company</li>
                          <li>• Operating business or viable startup</li>
                          <li>• Demonstrated growth potential</li>
                          <li>• Financially viable business model</li>
                          <li>• Clear use of financing proceeds</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-3 text-green-700">All Business Stages:</h5>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Startups with strong business plans</li>
                          <li>• Early-stage building traction</li>
                          <li>• Growth-stage scaling operations</li>
                          <li>• Established businesses expanding</li>
                          <li>• Business acquisition financing</li>
                          <li>• Working capital and equipment needs</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* BDC Financing Programs */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">BDC Financing Program Overview</h2>
                
                <div className="space-y-6">
                  {[
                    {
                      title: "Business Growth Financing",
                      icon: <TrendingUp className="w-6 h-6 text-blue-600" />,
                      color: "blue",
                      description: "Term loans and lines of credit for working capital, equipment, expansion, and growth",
                      features: ["Flexible repayment terms", "Competitive interest rates", "Customized to cash flow", "All business stages"]
                    },
                    {
                      title: "Thrive ETA Fund ($50M)",
                      icon: <Award className="w-6 h-6 text-purple-600" />,
                      color: "purple",
                      description: "Business acquisition fund supporting 60+ women acquiring and operating companies",
                      features: ["$40M direct investments", "$10M PE fund investments", "Search fund support", "Accelerator program included"]
                    },
                    {
                      title: "Strategic Advisory Services",
                      icon: <Users className="w-6 h-6 text-green-600" />,
                      color: "green",
                      description: "Expert business advisors providing strategic guidance throughout growth journey",
                      features: ["Dedicated business advisors", "Growth strategy support", "Operational guidance", "Leadership development"]
                    },
                    {
                      title: "Thrive Lab Resources",
                      icon: <Lightbulb className="w-6 h-6 text-orange-600" />,
                      color: "orange",
                      description: "Comprehensive ecosystem of resources, networking, and support for women entrepreneurs",
                      features: ["Women entrepreneur network", "Education and training", "Mentorship programs", "Business tools access"]
                    }
                  ].map((program, index) => (
                    <Card key={index} className={`border-${program.color}-200`}>
                      <CardHeader>
                        <CardTitle className={`text-${program.color}-700 flex items-center`}>
                          {program.icon}
                          <span className="ml-2">{program.title}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 mb-4">{program.description}</p>
                        <div className="grid md:grid-cols-2 gap-2 text-sm text-gray-600">
                          {program.features.map((feature, i) => (
                            <div key={i} className="flex items-center">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Advisor Engagement Strategy */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">BDC Advisor Engagement Strategy</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-blue-700">Advisor Services & Benefits</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                          <div>
                            <strong>Strategic Guidance</strong>
                            <p className="text-sm text-gray-600">Growth planning and expansion strategy</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                          <div>
                            <strong>Application Support</strong>
                            <p className="text-sm text-gray-600">Help preparing financing applications</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                          <div>
                            <strong>Operational Advice</strong>
                            <p className="text-sm text-gray-600">Efficiency and productivity guidance</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                          <div>
                            <strong>Network Access</strong>
                            <p className="text-sm text-gray-600">Connections to resources and partners</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-green-200">
                    <CardHeader>
                      <CardTitle className="text-green-700">Advisor Engagement Tips</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Early Contact</strong>
                            <p className="text-sm text-gray-600">Connect with BDC advisor before formal application</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Clear Vision</strong>
                            <p className="text-sm text-gray-600">Have growth strategy and financing needs defined</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Regular Communication</strong>
                            <p className="text-sm text-gray-600">Maintain ongoing dialogue throughout relationship</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Leverage Expertise</strong>
                            <p className="text-sm text-gray-600">Use advisor's women entrepreneur experience</p>
                          </div>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Application Components */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">BDC Application Components</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <Card className="border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-blue-700">📊 Financial Components</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Historical Financials</strong>
                            <p className="text-sm text-gray-600">Past 2-3 years financial statements</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Financial Projections</strong>
                            <p className="text-sm text-gray-600">3-year revenue, expenses, and cash flow forecasts</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Use of Funds</strong>
                            <p className="text-sm text-gray-600">Detailed breakdown of financing allocation</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Repayment Plan</strong>
                            <p className="text-sm text-gray-600">Cash flow analysis and repayment capacity</p>
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
                            <strong>Business Plan</strong>
                            <p className="text-sm text-gray-600">Comprehensive strategy with market analysis</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Growth Strategy</strong>
                            <p className="text-sm text-gray-600">Expansion plans and market opportunities</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Management Team</strong>
                            <p className="text-sm text-gray-600">Leadership qualifications and experience</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Market Positioning</strong>
                            <p className="text-sm text-gray-600">Competitive advantages and differentiation</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Success Strategies */}
              <div className="bg-green-50 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">BDC Application Success Strategies</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-green-700">✅ Winning Strategies</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Strong financial position with clear repayment capacity and cash flow</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Comprehensive business plan with realistic projections and market analysis</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Clear use of funds tied to specific growth initiatives and outcomes</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Early advisor engagement for relationship building and guidance</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-red-700">❌ Common Pitfalls</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span>Incomplete financials or unrealistic revenue projections without support</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span>Weak repayment plan without clear cash flow analysis</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span>Vague use of funds without specific allocation and business impact</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span>Late advisor contact without sufficient relationship development time</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Official Resources */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Official BDC Resources</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-blue-700">BDC Resources</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">BDC Women Entrepreneurs</h5>
                          <p className="text-sm text-gray-600">Official program website</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://www.bdc.ca/en/i-am/woman-entrepreneur" target="_blank" rel="noopener noreferrer">
                            Visit <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">Thrive Lab for Women</h5>
                          <p className="text-sm text-gray-600">Resources and networking</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://www.bdc.ca/en/i-am/woman-entrepreneur" target="_blank" rel="noopener noreferrer">
                            Learn More <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">Find BDC Advisor</h5>
                          <p className="text-sm text-gray-600">Connect with local advisor</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://www.bdc.ca/en/contact-us" target="_blank" rel="noopener noreferrer">
                            Find Advisor <ExternalLink className="w-3 h-3 ml-1" />
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
                          <h5 className="font-semibold">BDC Assessment</h5>
                          <p className="text-sm text-gray-600">Free eligibility review</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="/contact?service=bdc-assessment">
                            Get Assessment <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">Advisor Connection</h5>
                          <p className="text-sm text-gray-600">Help connecting with BDC</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="/contact?service=bdc-advisor-connection">
                            Connect <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">Application Support</h5>
                          <p className="text-sm text-gray-600">Professional application help</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="/contact?service=bdc-women-entrepreneur-financing-help">
                            Get Support <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Lead Magnet CTA - UPDATED TO CONTACT */}
              <div className="bg-gradient-to-r from-blue-600 to-teal-800 rounded-lg p-8 text-white text-center mb-8">
                <Download className="w-16 h-16 mx-auto mb-4 text-blue-100" />
                <h3 className="text-2xl font-bold mb-4">Get Your Free BDC Application Kit</h3>
                <p className="text-blue-100 mb-6 text-lg">
                  Download our comprehensive BDC financing application guide with program comparison, 
                  business plan templates, and advisor engagement strategies.
                </p>
                <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100" asChild>
                  <Link href="/contact?service=bdc-expert-help">
                    <Download className="w-5 h-5 mr-2" />
                    Request Application Guide
                  </Link>
                </Button>
              </div>

              {/* Contact CTA */}
              <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-lg p-8 text-white text-center">
                <Users className="w-16 h-16 mx-auto mb-4 text-green-100" />
                <h3 className="text-2xl font-bold mb-4">Ready to Apply for BDC Financing?</h3>
                <p className="text-green-100 mb-6 text-lg">
                  Our women entrepreneur financing specialists understand BDC and can help you prepare 
                  applications, connect with advisors, and secure flexible financing for growth.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100" asChild>
                    <Link href="/contact?service=bdc-women-entrepreneur-financing-help">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Get Expert Help
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                    <Link href="/contact?service=bdc-assessment">
                      Free BDC Assessment
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
