import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, CheckCircle, Clock, FileText, Users, MessageCircle, Lightbulb, Target, DollarSign, AlertTriangle, Download, GraduationCap, Shield } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "How to Apply for NSERC Research Grants 2025 | Natural Sciences & Engineering Guide",
  description: "Step-by-step guide to applying for NSERC research grants. Learn I2I application process, university-industry partnerships, and winning strategies for up to $350K.",
  keywords: "NSERC application guide, Idea to Innovation application, NSERC I2I guide, university research funding application, NSERC 2025",
  openGraph: {
    title: "How to Apply for NSERC Research Grants 2025",
    description: "Complete guide to NSERC research grant applications with step-by-step process and partnership strategies.",
    url: "https://grantfinder.pro/guides/nserc-research-grants-guide",
  },
}

export default function NSERCResearchGrantsGuide() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🔬 NSERC Research Grant Application Guide
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                How to Apply for NSERC Research Grants
              </h1>
              <p className="text-xl text-indigo-100 mb-8">
                Complete step-by-step guide to applying for Natural Sciences & Engineering Research Council grants. 
                Learn the I2I application process, university-industry partnerships, and strategies to secure up to $350K in research funding.
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
                  <div className="text-3xl font-bold text-indigo-600 mb-2">$1.3B</div>
                  <div className="text-gray-600">Annual NSERC Investment</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">$350K</div>
                  <div className="text-gray-600">Maximum I2I Grant</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">2,000+</div>
                  <div className="text-gray-600">Industry Partnerships</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">4</div>
                  <div className="text-gray-600">Annual I2I Deadlines</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              
              {/* NSERC Application Overview */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">NSERC Research Grant Application Process</h2>
                
                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6 mb-6">
                  <div className="flex items-start">
                    <GraduationCap className="w-8 h-8 text-indigo-600 mr-4 mt-1" />
                    <div>
                      <h4 className="font-bold text-indigo-800 mb-2">University-Industry Research Focus</h4>
                      <p className="text-indigo-700">
                        NSERC supports collaborative research between universities and industry, emphasizing technology transfer, 
                        commercialization, and highly qualified personnel training in the natural sciences and engineering.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">1</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Assess Eligibility</h4>
                      <p className="text-sm text-gray-600">
                        Confirm researcher and institutional eligibility requirements
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">2</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Secure Partnerships</h4>
                      <p className="text-sm text-gray-600">
                        Identify and engage industry or institutional partners
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">3</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Develop Proposal</h4>
                      <p className="text-sm text-gray-600">
                        Prepare comprehensive research proposal with budget
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-xl">4</span>
                      </div>
                      <h4 className="font-bold text-lg mb-3">Submit & Review</h4>
                      <p className="text-sm text-gray-600">
                        Submit application and undergo peer review process
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* I2I Program Details */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Idea to Innovation (I2I) Grant Application</h2>
                
                <Card className="border-indigo-200">
                  <CardHeader>
                    <CardTitle className="text-indigo-700 flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      I2I Grant Phases & Requirements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Phase I:</strong> Up to $125K</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Phase IIa:</strong> Up to $125K/year</span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Phase IIb:</strong> Up to $350K</span>
                      </div>
                    </div>
                    
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                      <h4 className="font-bold mb-2 text-yellow-800">⚠️ 2025 Program Status:</h4>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-yellow-700">
                        <div>
                          <p><strong>Active:</strong> Phase I, IIa, and IIb applications</p>
                          <p><strong>Deadlines:</strong> Jan 8, Mar 31, Jun 20, Sep 22</p>
                        </div>
                        <div>
                          <p><strong>Paused:</strong> Market Assessment and Phase Ib</p>
                          <p><strong>Reason:</strong> Program review and optimization</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <h5 className="font-semibold mb-3 text-indigo-700">Phase I Requirements:</h5>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Proof-of-concept validation</li>
                          <li>• 100% NSERC funding</li>
                          <li>• Up to 12 months duration</li>
                          <li>• Academic researcher led</li>
                          <li>• No industry partner required</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-3 text-green-700">Phase IIa Requirements:</h5>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Technology enhancement focus</li>
                          <li>• 67% NSERC, 33% partner funding</li>
                          <li>• 6-18 months duration</li>
                          <li>• Industry partner required</li>
                          <li>• Cash contribution mandatory</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-3 text-purple-700">Phase IIb Requirements:</h5>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Commercialization readiness</li>
                          <li>• 50% NSERC, 50% partner funding</li>
                          <li>• Up to 24 months duration</li>
                          <li>• Strong industry partnership</li>
                          <li>• 40% minimum cash contribution</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Eligibility Requirements */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">NSERC Researcher & Institution Eligibility</h2>
                
                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700 flex items-center">
                      <Shield className="w-5 h-5 mr-2" />
                      Researcher & Institution Requirements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-3 text-green-700">Researcher Eligibility:</h5>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Canadian citizen or permanent resident</li>
                          <li>• Faculty appointment at eligible institution</li>
                          <li>• PhD or equivalent in eligible field</li>
                          <li>• Active research program in NSERC areas</li>
                          <li>• Natural sciences or engineering focus</li>
                          <li>• Demonstrated research excellence</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-3 text-blue-700">Eligible Institutions:</h5>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Canadian universities and colleges</li>
                          <li>• NSERC-approved research institutions</li>
                          <li>• Provincial research organizations</li>
                          <li>• Federal research facilities</li>
                          <li>• Affiliated hospitals and institutes</li>
                          <li>• Degree-granting institutions</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-green-50 rounded-lg">
                      <h5 className="font-semibold mb-2">📋 NSERC Research Areas:</h5>
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <ul className="space-y-1">
                            <li>• Engineering sciences</li>
                            <li>• Physical sciences</li>
                            <li>• Mathematical sciences</li>
                          </ul>
                        </div>
                        <div>
                          <ul className="space-y-1">
                            <li>• Life sciences</li>
                            <li>• Computer science</li>
                            <li>• Earth & environmental sciences</li>
                          </ul>
                        </div>
                        <div>
                          <ul className="space-y-1">
                            <li>• Interdisciplinary research</li>
                            <li>• Applied research</li>
                            <li>• Technology development</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Partnership Strategy */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">University-Industry Partnership Strategy</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-blue-700">Industry Partner Types</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                          <div>
                            <strong>Canadian Companies</strong>
                            <p className="text-sm text-gray-600">For-profit entities with Canadian operations</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                          <div>
                            <strong>Government Organizations</strong>
                            <p className="text-sm text-gray-600">Federal, provincial, municipal departments</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                          <div>
                            <strong>Research Organizations</strong>
                            <p className="text-sm text-gray-600">Not-for-profit research institutions</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                          <div>
                            <strong>International Partners</strong>
                            <p className="text-sm text-gray-600">Limited eligibility with Canadian presence</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-green-200">
                    <CardHeader>
                      <CardTitle className="text-green-700">Partnership Best Practices</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Early Engagement</strong>
                            <p className="text-sm text-gray-600">Involve partners in proposal development</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Clear Value Proposition</strong>
                            <p className="text-sm text-gray-600">Demonstrate mutual benefits and outcomes</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Realistic Contributions</strong>
                            <p className="text-sm text-gray-600">Ensure partner can meet funding commitments</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Technology Transfer Plan</strong>
                            <p className="text-sm text-gray-600">Define clear commercialization pathway</p>
                          </div>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Application Components */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">NSERC Application Components</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <Card className="border-indigo-200">
                    <CardHeader>
                      <CardTitle className="text-indigo-700">📊 Research Components</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-indigo-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Research Proposal</strong>
                            <p className="text-sm text-gray-600">Clear objectives, methodology, and innovation</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-indigo-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Literature Review</strong>
                            <p className="text-sm text-gray-600">Current state of knowledge and research gaps</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-indigo-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Research Plan</strong>
                            <p className="text-sm text-gray-600">Detailed methodology and timeline</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-indigo-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Expected Outcomes</strong>
                            <p className="text-sm text-gray-600">Deliverables and impact assessment</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-green-200">
                    <CardHeader>
                      <CardTitle className="text-green-700">📋 Partnership & Impact</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Partner Commitment</strong>
                            <p className="text-sm text-gray-600">Letters of support and contribution details</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Commercialization Plan</strong>
                            <p className="text-sm text-gray-600">Technology transfer and market strategy</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>HQP Training Plan</strong>
                            <p className="text-sm text-gray-600">Student and postdoc development strategy</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                          <div>
                            <strong>Budget Justification</strong>
                            <p className="text-sm text-gray-600">Detailed cost breakdown and rationale</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Success Strategies */}
              <div className="bg-green-50 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">NSERC Application Success Strategies</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-green-700">✅ Winning Strategies</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Demonstrate clear research excellence and innovation potential</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Secure meaningful industry partnerships with genuine commitment</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Emphasize highly qualified personnel training and development</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span>Show clear pathway from research to Canadian economic benefit</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-red-700">❌ Common Pitfalls</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span>Weak industry partnerships or unrealistic partner commitments</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span>Unclear commercialization strategy or technology transfer plan</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span>Limited demonstration of research impact and Canadian benefit</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span>Poor budget justification or misaligned resource allocation</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Official Resources */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Official NSERC Resources</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-indigo-200">
                    <CardHeader>
                      <CardTitle className="text-indigo-700">NSERC Resources</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">NSERC-CRSNG</h5>
                          <p className="text-sm text-gray-600">Official NSERC website and programs</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://www.nserc-crsng.gc.ca/" target="_blank" rel="noopener noreferrer">
                            Visit <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">I2I Grants</h5>
                          <p className="text-sm text-gray-600">Idea to Innovation grant information</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://www.nserc-crsng.gc.ca/Professors-Professeurs/RPP-PP/I2I-Innov_eng.asp" target="_blank" rel="noopener noreferrer">
                            Learn More <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">CRD Grants</h5>
                          <p className="text-sm text-gray-600">Collaborative Research and Development</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://www.nserc-crsng.gc.ca/Professors-Professeurs/RPP-PP/CRD-RDC_eng.asp" target="_blank" rel="noopener noreferrer">
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
                          <h5 className="font-semibold">NSERC Assessment</h5>
                          <p className="text-sm text-gray-600">Free eligibility and proposal review</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="/contact?service=nserc-assessment">
                            Get Assessment <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">Partnership Support</h5>
                          <p className="text-sm text-gray-600">Help connecting with industry partners</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="/contact?service=nserc-partnership-help">
                            Get Connections <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">Expert Help</h5>
                          <p className="text-sm text-gray-600">Professional NSERC application development</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="/contact?service=nserc-expert-help">
                            Get Help <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Lead Magnet CTA */}
              <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-lg p-8 text-white text-center mb-8">
                <Download className="w-16 h-16 mx-auto mb-4 text-indigo-100" />
                <h3 className="text-2xl font-bold mb-4">Get Your Free NSERC Research Application Kit</h3>
                <p className="text-indigo-100 mb-6 text-lg">
                  Download our comprehensive NSERC application guide with I2I templates, partnership strategies, 
                  and successful university-industry collaboration examples.
                </p>
                <Button size="lg" className="bg-white text-indigo-700 hover:bg-gray-100" asChild>
                  <Link href="/contact?service=nserc-expert-help">
                    <Download className="w-5 h-5 mr-2" />
                    Request Application Guide
                  </Link>
                </Button>
              </div>

              {/* Contact CTA */}
              <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-lg p-8 text-white text-center">
                <Users className="w-16 h-16 mx-auto mb-4 text-green-100" />
                <h3 className="text-2xl font-bold mb-4">Ready to Apply for NSERC Research Funding?</h3>
                <p className="text-green-100 mb-6 text-lg">
                  Our research funding specialists understand university-industry partnerships and can help you develop 
                  compelling NSERC proposals that maximize your chances of securing up to $350K in research funding.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-white text-green-700 hover:bg-green-50 font-semibold shadow-lg" asChild>
                    <Link href="/contact?service=nserc-expert-help">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Get Expert Help
                    </Link>
                  </Button>
                  <Button size="lg" className="bg-green-700 text-white hover:bg-green-800 font-semibold shadow-lg border-2 border-white" asChild>
                    <Link href="/contact?service=nserc-assessment">
                      Free NSERC Assessment
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
