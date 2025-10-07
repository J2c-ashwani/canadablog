import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, Download, FileText, Calculator, Users, Shield } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free IRAP Government Application Kit | Federal R&D Templates & Compliance Checklists Download",
  description: "Get your free IRAP government application kit with federal compliance templates, R&D funding checklists, and expert guides. Download comprehensive IRAP toolkit for government grants.",
  keywords: "IRAP government application kit download, free IRAP templates, federal R&D funding checklist, IRAP compliance guide download, government R&D grant templates Canada",
}

export default function IRAPGovernmentDownloadPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🏛️ Free Federal R&D Toolkit
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                IRAP Government Application Toolkit
              </h1>
              <p className="text-xl text-green-100 mb-8">
                Get instant access to comprehensive IRAP government application templates, federal compliance checklists, 
                and expert guidance used by successful applicants to secure $12M+ in IRAP government funding approvals.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Left - What's Included */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">What's Included in Your IRAP Government Toolkit</h2>
                  
                  <div className="space-y-6">
                    <Card className="border-green-200">
                      <CardHeader>
                        <div className="flex items-center">
                          <FileText className="w-6 h-6 text-green-600 mr-3" />
                          <CardTitle className="text-green-700">Federal Application Templates</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>NRC-IRAP Application Form Template</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Federal R&D Project Description Framework</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Government Technical Specifications Template</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Innovation Impact Assessment Template</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-blue-200">
                      <CardHeader>
                        <div className="flex items-center">
                          <Shield className="w-6 h-6 text-blue-600 mr-3" />
                          <CardTitle className="text-blue-700">Federal Compliance Tools</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Treasury Board Compliance Checklist</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Federal Audit Readiness Framework</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Government Reporting Schedule Template</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Performance Measurement System Guide</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-purple-200">
                      <CardHeader>
                        <div className="flex items-center">
                          <Calculator className="w-6 h-6 text-purple-600 mr-3" />
                          <CardTitle className="text-purple-700">Financial & Strategic Tools</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>IRAP Eligible Costs Calculator (Excel)</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Federal Program Integration Mapper</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Economic Impact Analysis Worksheet</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Strategic Innovation Fund Pathway Planner</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-orange-200">
                      <CardHeader>
                        <div className="flex items-center">
                          <Users className="w-6 h-6 text-orange-600 mr-3" />
                          <CardTitle className="text-orange-700">ITA & Government Relations</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>ITA Engagement Strategy Guide</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Government Partnership Development Framework</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Federal Innovation Ecosystem Map</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Multi-Program Government Funding Strategy</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="mt-8 bg-green-50 border border-green-200 p-6 rounded-lg">
                    <h4 className="font-bold text-green-800 mb-2">Bonus: Federal Compliance Expert Consultation</h4>
                    <p className="text-green-700 text-sm">
                      Download includes a complimentary 30-minute IRAP government strategy consultation with our federal 
                      funding experts who have secured $12M+ in IRAP government approvals.
                    </p>
                  </div>
                </div>

                {/* Right - Lead Capture Form */}
                <div>
                  <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-lg sticky top-8">
                    <div className="text-center mb-6">
                      <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Download className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Download Your Free IRAP Government Toolkit</h3>
                      <p className="text-gray-600">Join 1,800+ R&D leaders who've accessed our federal funding resources</p>
                    </div>

                    <form className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input 
                            id="firstName" 
                            name="firstName" 
                            required 
                            placeholder="Your first name"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input 
                            id="lastName" 
                            name="lastName" 
                            required 
                            placeholder="Your last name"
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email">Business Email *</Label>
                        <Input 
                          id="email" 
                          name="email" 
                          type="email" 
                          required 
                          placeholder="your.email@company.com"
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="company">Company/Organization *</Label>
                        <Input 
                          id="company" 
                          name="company" 
                          required 
                          placeholder="Your company name"
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="role">Your Role *</Label>
                        <Select name="role" required>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select your role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cto">CTO/VP Technology</SelectItem>
                            <SelectItem value="rd-director">R&D Manager/Director</SelectItem>
                            <SelectItem value="ceo">CEO/President</SelectItem>
                            <SelectItem value="grants-manager">Grants Manager</SelectItem>
                            <SelectItem value="business-dev">Business Development</SelectItem>
                            <SelectItem value="consultant">Consultant</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="fundingAmount">Expected IRAP Funding Request</Label>
                        <Select name="fundingAmount">
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select funding range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="under-100k">Under $100K</SelectItem>
                            <SelectItem value="100k-250k">$100K - $250K</SelectItem>
                            <SelectItem value="250k-500k">$250K - $500K</SelectItem>
                            <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                            <SelectItem value="exploring">Still exploring options</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="industry">Industry Sector</Label>
                        <Select name="industry">
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select your industry" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cleantech">Clean Technology</SelectItem>
                            <SelectItem value="biotech">Biotechnology/Life Sciences</SelectItem>
                            <SelectItem value="manufacturing">Advanced Manufacturing</SelectItem>
                            <SelectItem value="software">Software/AI</SelectItem>
                            <SelectItem value="aerospace">Aerospace/Defense</SelectItem>
                            <SelectItem value="automotive">Automotive</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="rdStage">R&D Project Stage</Label>
                        <Select name="rdStage">
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select project stage" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="concept">Concept development</SelectItem>
                            <SelectItem value="prototype">Prototype development</SelectItem>
                            <SelectItem value="testing">Testing and validation</SelectItem>
                            <SelectItem value="pilot">Pilot/demonstration</SelectItem>
                            <SelectItem value="commercialization">Pre-commercialization</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="challenges">Biggest IRAP Government Challenge (Optional)</Label>
                        <Textarea 
                          id="challenges" 
                          name="challenges" 
                          placeholder="What's your biggest concern about IRAP federal compliance or applications?"
                          className="mt-1"
                          rows={3}
                        />
                      </div>

                      <div className="text-xs text-gray-500">
                        <label className="flex items-start space-x-2">
                          <input type="checkbox" className="mt-1" required />
                          <span>
                            I agree to receive email communications about IRAP government funding opportunities and 
                            related federal R&D programs. You can unsubscribe at any time.
                          </span>
                        </label>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-green-600 hover:bg-green-700 text-lg py-3"
                      >
                        <Download className="w-5 h-5 mr-2" />
                        Download Free IRAP Government Toolkit
                      </Button>
                    </form>

                    <div className="mt-6 text-center">
                      <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                        <span>🔒 100% Secure</span>
                        <span>📧 No Spam</span>
                        <span>🎯 Instant Access</span>
                      </div>
                    </div>
                  </div>

                  {/* Trust Indicators */}
                  <div className="mt-8 text-center">
                    <h4 className="font-semibold text-gray-800 mb-4">Trusted by R&D Leaders</h4>
                    <div className="grid grid-cols-3 gap-4 text-xs text-gray-600">
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="font-bold text-green-600">$12M+</div>
                        <div>IRAP Approvals</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="font-bold text-green-600">85%</div>
                        <div>Success Rate</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="font-bold text-green-600">1,800+</div>
                        <div>Downloads</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
                What R&D Leaders Say
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow">
                  <p className="text-gray-700 mb-4 italic">
                    "The federal compliance checklist saved us from potential audit issues. The ITA engagement 
                    strategy helped us build a strong government relationship from day one."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <Shield className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-semibold">Dr. James Liu</div>
                      <div className="text-sm text-gray-500">CTO, Advanced Materials Inc</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <p className="text-gray-700 mb-4 italic">
                    "The Strategic Innovation Fund pathway planner was invaluable. We used our IRAP success 
                    to secure $25M in SIF funding for our next phase."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <Users className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-semibold">Maria Santos</div>
                      <div className="text-sm text-gray-500">VP Innovation, BioTech Solutions</div>
                    </div>
                  </div>
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
