import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, Download, FileText, Calculator, Users, Shield, Building, Mountain, Award } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free BC Business Grants Kit | British Columbia Provincial Funding Templates & Strategy Guide Download",
  description: "Get your free BC business grants application kit with provincial templates, innovation strategies, and CleanBC compliance checklists. Download comprehensive British Columbia funding toolkit for Innovate BC, CleanBC, and Creative BC programs.",
  keywords: "BC business grants kit download, free British Columbia provincial funding templates, Innovate BC application guide, CleanBC funding templates, Creative BC application templates",
}

export default function BritishColumbiaGrantsDownloadPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🏔️ Free BC Provincial Business Toolkit
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                BC Business Grants Application Toolkit
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Get instant access to comprehensive British Columbia provincial business grants application templates, innovation compliance strategies, 
                and CleanBC sustainability guides used by successful BC businesses to secure $8M+ in provincial funding approvals.
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
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">What's Included in Your BC Business Grants Toolkit</h2>
                  
                  <div className="space-y-6">
                    <Card className="border-blue-200">
                      <CardHeader>
                        <div className="flex items-center">
                          <FileText className="w-6 h-6 text-blue-600 mr-3" />
                          <CardTitle className="text-blue-700">Provincial Innovation Application Templates</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Innovate BC Ignite & Platform Application Templates</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>CleanBC Industry Fund Application Framework</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Creative BC Funding Application Templates</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>BC Manufacturing Jobs Fund (BCMJF) Template</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-green-200">
                      <CardHeader>
                        <div className="flex items-center">
                          <Mountain className="w-6 h-6 text-green-600 mr-3" />
                          <CardTitle className="text-green-700">CleanBC & Sustainability Strategies</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>CleanBC Net-Zero Alignment Assessment Framework</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>GHG Emission Reduction Calculation Worksheets</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Clean Technology Adoption Strategy Guide</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Environmental Impact Measurement Template</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-purple-200">
                      <CardHeader>
                        <div className="flex items-center">
                          <Calculator className="w-6 h-6 text-purple-600 mr-3" />
                          <CardTitle className="text-purple-700">Financial & Analysis Tools</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>BC Program Funding Calculator (Excel)</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Innovation ROI & Technology Commercialization Calculator</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Asia-Pacific Market Entry Cost Analysis</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Creative Industries Revenue Model Template</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-teal-200">
                      <CardHeader>
                        <div className="flex items-center">
                          <Users className="w-6 h-6 text-teal-600 mr-3" />
                          <CardTitle className="text-teal-700">BC Innovation Ecosystem Access</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Complete BC Innovation Hubs & Accelerators Directory</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Asia-Pacific Gateway Trade Partners Contact List</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>PacifiCan Regional Integration Strategy</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Multi-Program BC Funding Optimization Roadmap</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="mt-8 bg-blue-50 border border-blue-200 p-6 rounded-lg">
                    <h4 className="font-bold text-blue-800 mb-2">Bonus: BC Innovation Expert Consultation</h4>
                    <p className="text-blue-700 text-sm">
                      Download includes a complimentary 30-minute BC provincial funding strategy consultation with our 
                      BC innovation experts who have secured $8M+ in British Columbia provincial funding approvals.
                    </p>
                  </div>
                </div>

                {/* Right - Lead Capture Form */}
                <div>
                  <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-lg sticky top-8">
                    <div className="text-center mb-6">
                      <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Download className="w-8 h-8 text-blue-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Download Your Free BC Business Grants Toolkit</h3>
                      <p className="text-gray-600">Join 1,200+ BC business leaders who've accessed our provincial funding resources</p>
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
                        <Label htmlFor="company">Company/Business Name *</Label>
                        <Input 
                          id="company" 
                          name="company" 
                          required 
                          placeholder="Your BC business name"
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
                            <SelectItem value="founder">Founder/Co-Founder</SelectItem>
                            <SelectItem value="ceo">CEO/President</SelectItem>
                            <SelectItem value="cto">CTO/Technical Lead</SelectItem>
                            <SelectItem value="owner">Business Owner</SelectItem>
                            <SelectItem value="director">Director/VP</SelectItem>
                            <SelectItem value="manager">Manager</SelectItem>
                            <SelectItem value="consultant">Business Consultant</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="bcRegion">BC Business Region *</Label>
                        <Select name="bcRegion" required>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select your BC region" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="vancouver">Vancouver Metro</SelectItem>
                            <SelectItem value="victoria">Victoria/Capital Region</SelectItem>
                            <SelectItem value="fraser-valley">Fraser Valley</SelectItem>
                            <SelectItem value="burnaby">Burnaby/New Westminster</SelectItem>
                            <SelectItem value="richmond">Richmond/Delta</SelectItem>
                            <SelectItem value="surrey">Surrey/White Rock</SelectItem>
                            <SelectItem value="north-vancouver">North Vancouver/West Vancouver</SelectItem>
                            <SelectItem value="interior">BC Interior (Kelowna/Kamloops)</SelectItem>
                            <SelectItem value="northern-bc">Northern BC (Prince George/Fort St. John)</SelectItem>
                            <SelectItem value="island">Vancouver Island (outside Victoria)</SelectItem>
                            <SelectItem value="other">Other BC Region</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="targetProgram">Target BC Program</Label>
                        <Select name="targetProgram">
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select BC program" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="innovate-bc-ignite">Innovate BC Ignite Program</SelectItem>
                            <SelectItem value="innovate-bc-platform">Innovate BC Platform Program</SelectItem>
                            <SelectItem value="cleanbc-industry">CleanBC Industry Fund</SelectItem>
                            <SelectItem value="cleanbc-commercial">CleanBC Commercial Express</SelectItem>
                            <SelectItem value="creative-bc">Creative BC Programs</SelectItem>
                            <SelectItem value="bc-manufacturing">BC Manufacturing Jobs Fund (BCMJF)</SelectItem>
                            <SelectItem value="pacifican">PacifiCan Regional Programs</SelectItem>
                            <SelectItem value="community-futures">Community Futures BC</SelectItem>
                            <SelectItem value="unsure">Not sure yet</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="fundingAmount">Expected BC Funding Request</Label>
                        <Select name="fundingAmount">
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select funding range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="under-50k">Under $50K</SelectItem>
                            <SelectItem value="50k-150k">$50K - $150K</SelectItem>
                            <SelectItem value="150k-300k">$150K - $300K</SelectItem>
                            <SelectItem value="300k-500k">$300K - $500K</SelectItem>
                            <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                            <SelectItem value="1m-3m">$1M - $3M</SelectItem>
                            <SelectItem value="over-3m">Over $3M</SelectItem>
                            <SelectItem value="exploring">Still exploring options</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="businessStage">Business Stage</Label>
                        <Select name="businessStage">
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select business stage" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="startup">Startup/Early Stage</SelectItem>
                            <SelectItem value="growth">Growth Stage</SelectItem>
                            <SelectItem value="scaling">Scaling/Expansion</SelectItem>
                            <SelectItem value="established">Established Business</SelectItem>
                            <SelectItem value="export-ready">Export Ready</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="industry">Industry/Sector</Label>
                        <Select name="industry">
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select your industry" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="technology">Technology/Software</SelectItem>
                            <SelectItem value="clean-technology">Clean Technology</SelectItem>
                            <SelectItem value="life-sciences">Life Sciences/Biotech</SelectItem>
                            <SelectItem value="creative-media">Creative Industries/Digital Media</SelectItem>
                            <SelectItem value="manufacturing">Advanced Manufacturing</SelectItem>
                            <SelectItem value="forestry">Forestry/Natural Resources</SelectItem>
                            <SelectItem value="tourism">Tourism/Hospitality</SelectItem>
                            <SelectItem value="agriculture">Agriculture/Food Processing</SelectItem>
                            <SelectItem value="professional-services">Professional Services</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="innovationFocus">Innovation/Project Focus</Label>
                        <Select name="innovationFocus">
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select focus area" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="technology-commercialization">Technology Commercialization</SelectItem>
                            <SelectItem value="clean-tech-development">Clean Technology Development</SelectItem>
                            <SelectItem value="digital-transformation">Digital Transformation</SelectItem>
                            <SelectItem value="asia-pacific-expansion">Asia-Pacific Market Expansion</SelectItem>
                            <SelectItem value="r-and-d">Research & Development</SelectItem>
                            <SelectItem value="creative-content">Creative Content Development</SelectItem>
                            <SelectItem value="manufacturing-automation">Manufacturing Automation</SelectItem>
                            <SelectItem value="other">Other Innovation Focus</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="challenges">Biggest BC Funding Challenge (Optional)</Label>
                        <Textarea 
                          id="challenges" 
                          name="challenges" 
                          placeholder="What's your biggest challenge with BC provincial funding or program selection?"
                          className="mt-1"
                          rows={3}
                        />
                      </div>

                      <div className="text-xs text-gray-500">
                        <label className="flex items-start space-x-2">
                          <input type="checkbox" className="mt-1" required />
                          <span>
                            I agree to receive email communications about British Columbia provincial funding opportunities and 
                            related innovation support programs. You can unsubscribe at any time.
                          </span>
                        </label>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3"
                      >
                        <Download className="w-5 h-5 mr-2" />
                        Download Free BC Business Grants Toolkit
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
                    <h4 className="font-semibold text-gray-800 mb-4">Trusted by BC Innovation Leaders</h4>
                    <div className="grid grid-cols-3 gap-4 text-xs text-gray-600">
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="font-bold text-blue-600">$8M+</div>
                        <div>BC Approvals</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="font-bold text-blue-600">85%</div>
                        <div>Success Rate</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="font-bold text-blue-600">1,200+</div>
                        <div>Downloads</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BC Success Stories */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
                What BC Innovation Leaders Say
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow">
                  <p className="text-gray-700 mb-4 italic">
                    "The Innovate BC Platform application template was incredible. We secured $2.8M for our clean tech 
                    scale-up and the Asia-Pacific market strategy helped us expand to Japan within 8 months."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <Mountain className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold">Alex Thompson</div>
                      <div className="text-sm text-gray-500">CEO, Vancouver CleanTech Solutions</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <p className="text-gray-700 mb-4 italic">
                    "The CleanBC emission reduction calculator was exactly what we needed for our manufacturing project. 
                    We secured $4.2M in CleanBC Industry Fund and exceeded our GHG reduction targets."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <Award className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold">Sarah Patel</div>
                      <div className="text-sm text-gray-500">Founder, Surrey Advanced Manufacturing</div>
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
