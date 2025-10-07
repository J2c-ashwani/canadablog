import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, Download, FileText, Calculator, Users, Shield, Building, Zap, Award } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Alberta Business Grants Kit | Energy Innovation & Clean Technology Funding Templates Download",
  description: "Get your free Alberta business grants application kit with energy innovation templates, clean technology strategies, and economic diversification guides. Download comprehensive Alberta funding toolkit for Alberta Innovates, ERA, and diversification programs.",
  keywords: "Alberta business grants kit download, free Alberta provincial funding templates, Alberta Innovates application guide, ERA funding templates, Alberta energy innovation grants",
}

export default function AlbertaBusinessGrantsDownloadPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-orange-600 to-orange-800 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🛢️ Free Alberta Provincial Business Toolkit
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Alberta Business Grants Application Toolkit
              </h1>
              <p className="text-xl text-orange-100 mb-8">
                Get instant access to comprehensive Alberta provincial business grants application templates, energy innovation strategies, 
                and clean technology development guides used by successful Alberta businesses to secure $11M+ in provincial funding approvals.
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
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">What's Included in Your Alberta Business Grants Toolkit</h2>
                  
                  <div className="space-y-6">
                    <Card className="border-orange-200">
                      <CardHeader>
                        <div className="flex items-center">
                          <FileText className="w-6 h-6 text-orange-600 mr-3" />
                          <CardTitle className="text-orange-700">Provincial Energy Innovation Application Templates</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Alberta Innovates Program Application Templates</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Emissions Reduction Alberta (ERA) Application Framework</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Economic Diversification Program Templates</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Alberta Provincial Business Plan Framework</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-green-200">
                      <CardHeader>
                        <div className="flex items-center">
                          <Zap className="w-6 h-6 text-green-600 mr-3" />
                          <CardTitle className="text-green-700">Clean Technology & Emission Reduction Strategies</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>ERA Clean Technology Development Framework</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>GHG Emission Reduction Calculation Worksheets</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Industrial Transformation Strategy Guide</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Energy Sector Innovation Roadmap Template</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-blue-200">
                      <CardHeader>
                        <div className="flex items-center">
                          <Calculator className="w-6 h-6 text-blue-600 mr-3" />
                          <CardTitle className="text-blue-700">Financial & Analysis Tools</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Alberta Program Funding Calculator (Excel)</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Clean Technology ROI & Investment Calculator</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Economic Diversification Impact Analysis</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Alberta Tax Advantage Calculator (2% Small Business Rate)</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-purple-200">
                      <CardHeader>
                        <div className="flex items-center">
                          <Users className="w-6 h-6 text-purple-600 mr-3" />
                          <CardTitle className="text-purple-700">Alberta Innovation Ecosystem Access</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Complete Alberta Innovation Hubs & Accelerators Directory</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Energy Sector Partners & Clean Technology Networks</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>PrairiesCan Regional Integration Strategy</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Multi-Program Alberta Funding Optimization Roadmap</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="mt-8 bg-orange-50 border border-orange-200 p-6 rounded-lg">
                    <h4 className="font-bold text-orange-800 mb-2">Bonus: Alberta Energy Innovation Expert Consultation</h4>
                    <p className="text-orange-700 text-sm">
                      Download includes a complimentary 30-minute Alberta provincial funding strategy consultation with our 
                      Alberta energy innovation experts who have secured $11M+ in Alberta provincial funding approvals.
                    </p>
                  </div>
                </div>

                {/* Right - Lead Capture Form */}
                <div>
                  <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-lg sticky top-8">
                    <div className="text-center mb-6">
                      <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Download className="w-8 h-8 text-orange-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Download Your Free Alberta Business Grants Toolkit</h3>
                      <p className="text-gray-600">Join 1,100+ Alberta business leaders who've accessed our provincial funding resources</p>
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
                          placeholder="Your Alberta business name"
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
                            <SelectItem value="director">Director/VP</SelectItem>
                            <SelectItem value="owner">Business Owner</SelectItem>
                            <SelectItem value="manager">Manager</SelectItem>
                            <SelectItem value="consultant">Business Consultant</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="albertaRegion">Alberta Business Region *</Label>
                        <Select name="albertaRegion" required>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select your Alberta region" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="calgary">Calgary Metro</SelectItem>
                            <SelectItem value="edmonton">Edmonton Metro</SelectItem>
                            <SelectItem value="red-deer">Red Deer Region</SelectItem>
                            <SelectItem value="lethbridge">Lethbridge/Southern Alberta</SelectItem>
                            <SelectItem value="fort-mcmurray">Fort McMurray/Oil Sands</SelectItem>
                            <SelectItem value="grande-prairie">Grande Prairie/Peace River</SelectItem>
                            <SelectItem value="medicine-hat">Medicine Hat/Southeast</SelectItem>
                            <SelectItem value="lloydminster">Lloydminster/Border Region</SelectItem>
                            <SelectItem value="northern">Northern Alberta</SelectItem>
                            <SelectItem value="other">Other Alberta Region</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="targetProgram">Target Alberta Program</Label>
                        <Select name="targetProgram">
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select Alberta program" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="alberta-innovates">Alberta Innovates Programs</SelectItem>
                            <SelectItem value="era">Emissions Reduction Alberta (ERA)</SelectItem>
                            <SelectItem value="diversification">Economic Diversification Programs</SelectItem>
                            <SelectItem value="abif">Aboriginal Business Investment Fund (ABIF)</SelectItem>
                            <SelectItem value="prairiescan">PrairiesCan Regional Programs</SelectItem>
                            <SelectItem value="tax-credits">Alberta Tax Credits & Incentives</SelectItem>
                            <SelectItem value="workforce">Alberta Workplace Training</SelectItem>
                            <SelectItem value="unsure">Not sure yet</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="fundingAmount">Expected Alberta Funding Request</Label>
                        <Select name="fundingAmount">
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select funding range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="under-25k">Under $25K</SelectItem>
                            <SelectItem value="25k-100k">$25K - $100K</SelectItem>
                            <SelectItem value="100k-250k">$100K - $250K</SelectItem>
                            <SelectItem value="250k-500k">$250K - $500K</SelectItem>
                            <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                            <SelectItem value="1m-5m">$1M - $5M</SelectItem>
                            <SelectItem value="5m-15m">$5M - $15M</SelectItem>
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
                            <SelectItem value="rd-development">R&D/Technology Development</SelectItem>
                            <SelectItem value="growth">Growth Stage</SelectItem>
                            <SelectItem value="scaling">Scaling/Expansion</SelectItem>
                            <SelectItem value="established">Established Business</SelectItem>
                            <SelectItem value="diversifying">Diversifying Operations</SelectItem>
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
                            <SelectItem value="energy-oil-gas">Energy/Oil & Gas</SelectItem>
                            <SelectItem value="clean-technology">Clean Technology</SelectItem>
                            <SelectItem value="technology">Technology/Software</SelectItem>
                            <SelectItem value="manufacturing">Advanced Manufacturing</SelectItem>
                            <SelectItem value="agriculture">Agriculture/Food Processing</SelectItem>
                            <SelectItem value="health-sciences">Health Sciences/Biotech</SelectItem>
                            <SelectItem value="professional-services">Professional Services</SelectItem>
                            <SelectItem value="creative-media">Creative Industries/Media</SelectItem>
                            <SelectItem value="tourism">Tourism/Hospitality</SelectItem>
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
                            <SelectItem value="clean-technology">Clean Technology Development</SelectItem>
                            <SelectItem value="energy-innovation">Energy Sector Innovation</SelectItem>
                            <SelectItem value="emission-reduction">Emission Reduction Technologies</SelectItem>
                            <SelectItem value="economic-diversification">Economic Diversification</SelectItem>
                            <SelectItem value="technology-commercialization">Technology Commercialization</SelectItem>
                            <SelectItem value="digital-transformation">Digital Transformation</SelectItem>
                            <SelectItem value="automation">Industrial Automation</SelectItem>
                            <SelectItem value="other">Other Innovation Focus</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="challenges">Biggest Alberta Funding Challenge (Optional)</Label>
                        <Textarea 
                          id="challenges" 
                          name="challenges" 
                          placeholder="What's your biggest challenge with Alberta provincial funding or program selection?"
                          className="mt-1"
                          rows={3}
                        />
                      </div>

                      <div className="text-xs text-gray-500">
                        <label className="flex items-start space-x-2">
                          <input type="checkbox" className="mt-1" required />
                          <span>
                            I agree to receive email communications about Alberta provincial funding opportunities, energy innovation programs, 
                            and related business support initiatives. You can unsubscribe at any time.
                          </span>
                        </label>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-orange-600 hover:bg-orange-700 text-lg py-3"
                      >
                        <Download className="w-5 h-5 mr-2" />
                        Download Free Alberta Business Grants Toolkit
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
                    <h4 className="font-semibold text-gray-800 mb-4">Trusted by Alberta Innovation Leaders</h4>
                    <div className="grid grid-cols-3 gap-4 text-xs text-gray-600">
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="font-bold text-orange-600">$11M+</div>
                        <div>Alberta Approvals</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="font-bold text-orange-600">84%</div>
                        <div>Success Rate</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="font-bold text-orange-600">1,100+</div>
                        <div>Downloads</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Alberta Success Stories */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
                What Alberta Innovation Leaders Say
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow">
                  <p className="text-gray-700 mb-4 italic">
                    "The Alberta Innovates application template was perfect for our clean technology startup. We secured 
                    $1.8M and the emission reduction calculator helped us demonstrate clear environmental impact."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                      <Zap className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <div className="font-semibold">Michael Peterson</div>
                      <div className="text-sm text-gray-500">CEO, Calgary Clean Energy Solutions</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <p className="text-gray-700 mb-4 italic">
                    "The ERA Industrial Transformation application framework was exactly what we needed. We secured 
                    $4.5M for our emission reduction project and exceeded our GHG targets by 35%."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                      <Award className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <div className="font-semibold">Lisa Wong</div>
                      <div className="text-sm text-gray-500">Founder, Edmonton Advanced Manufacturing</div>
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
