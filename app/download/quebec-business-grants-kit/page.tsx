import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, Download, FileText, Calculator, Users, Shield, Building, Globe, Award } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Quebec Business Grants Kit | Aide aux Entreprises Provincial Funding Templates & R&D Guide Download",
  description: "Get your free Quebec business grants application kit with aide aux entreprises templates, R&D tax credit optimization guides, and francophone business strategies. Download comprehensive Quebec funding toolkit for ESSOR, PSCE, and Investissement Quebec programs.",
  keywords: "Quebec business grants kit download, free aide aux entreprises Quebec templates, ESSOR application guide, Quebec R&D tax credits guide, PSCE funding templates",
}

export default function QuebecBusinessGrantsDownloadPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-800 to-blue-900 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🍁 Free Quebec Provincial Business Toolkit
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Quebec Business Grants Application Toolkit
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Get instant access to comprehensive Quebec provincial business grants application templates, R&D tax credit optimization strategies, 
                and aide aux entreprises compliance guides used by successful Quebec businesses to secure $14M+ in provincial funding approvals.
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
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">What's Included in Your Quebec Business Grants Toolkit</h2>
                  
                  <div className="space-y-6">
                    <Card className="border-blue-200">
                      <CardHeader>
                        <div className="flex items-center">
                          <FileText className="w-6 h-6 text-blue-600 mr-3" />
                          <CardTitle className="text-blue-700">Provincial Aide aux Entreprises Application Templates</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>ESSOR (Investissement Quebec) Application Templates</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>PSCE Commercialization & Export Application Framework</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>NovaScience Innovation Management Template</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Quebec Provincial Business Plan Framework</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-purple-200">
                      <CardHeader>
                        <div className="flex items-center">
                          <Award className="w-6 h-6 text-purple-600 mr-3" />
                          <CardTitle className="text-purple-700">R&D Tax Credits Optimization Strategies</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Quebec R&D Tax Credits Maximization Guide (Up to 30%)</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>R&D Activities Documentation & Compliance Framework</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>University Partnership Credit Strategy (Additional 14%)</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Multi-Credit Program Stacking Optimization</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-green-200">
                      <CardHeader>
                        <div className="flex items-center">
                          <Calculator className="w-6 h-6 text-green-600 mr-3" />
                          <CardTitle className="text-green-700">Financial & Analysis Tools</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Quebec Program Funding Calculator (Excel)</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>R&D Tax Credit Calculator & Optimization Tool</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>International Market Entry ROI Analysis</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Productivity Improvement Investment Calculator</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-teal-200">
                      <CardHeader>
                        <div className="flex items-center">
                          <Globe className="w-6 h-6 text-teal-600 mr-3" />
                          <CardTitle className="text-teal-700">Francophone Business & Innovation Ecosystem Access</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Complete Quebec Innovation Hubs & Research Centers Directory</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>International Francophone Business Networks Contact List</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>CED-Quebec Regional Integration Strategy</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Multi-Program Quebec Funding Optimization Roadmap</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="mt-8 bg-blue-50 border border-blue-200 p-6 rounded-lg">
                    <h4 className="font-bold text-blue-800 mb-2">Bonus: Quebec Innovation Expert Consultation</h4>
                    <p className="text-blue-700 text-sm">
                      Download includes a complimentary 30-minute Quebec provincial funding strategy consultation with our 
                      Quebec innovation experts who have secured $14M+ in Quebec provincial funding approvals.
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
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Download Your Free Quebec Business Grants Toolkit</h3>
                      <p className="text-gray-600">Join 1,500+ Quebec business leaders who've accessed our provincial funding resources</p>
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
                          placeholder="Your Quebec business name"
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
                            <SelectItem value="rd-director">R&D Director</SelectItem>
                            <SelectItem value="owner">Business Owner</SelectItem>
                            <SelectItem value="director">Director/VP</SelectItem>
                            <SelectItem value="manager">Manager</SelectItem>
                            <SelectItem value="consultant">Business Consultant</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="quebecRegion">Quebec Business Region *</Label>
                        <Select name="quebecRegion" required>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select your Quebec region" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="montreal">Montreal Metro</SelectItem>
                            <SelectItem value="quebec-city">Quebec City/Capital Region</SelectItem>
                            <SelectItem value="laval">Laval/North Shore</SelectItem>
                            <SelectItem value="longueuil">Longueuil/South Shore</SelectItem>
                            <SelectItem value="gatineau">Gatineau/Outaouais</SelectItem>
                            <SelectItem value="sherbrooke">Sherbrooke/Eastern Townships</SelectItem>
                            <SelectItem value="trois-rivieres">Trois-Rivières/Mauricie</SelectItem>
                            <SelectItem value="saguenay">Saguenay/Lac-Saint-Jean</SelectItem>
                            <SelectItem value="abitibi">Abitibi-Témiscamingue</SelectItem>
                            <SelectItem value="bas-saint-laurent">Bas-Saint-Laurent</SelectItem>
                            <SelectItem value="other">Other Quebec Region</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="targetProgram">Target Quebec Program</Label>
                        <Select name="targetProgram">
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select Quebec program" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="essor">ESSOR (Investissement Quebec)</SelectItem>
                            <SelectItem value="psce">PSCE Commercialization & Export</SelectItem>
                            <SelectItem value="rd-tax-credits">Quebec R&D Tax Credits</SelectItem>
                            <SelectItem value="novascience">NovaScience Program</SelectItem>
                            <SelectItem value="ced-quebec">CED-Quebec Regional Programs</SelectItem>
                            <SelectItem value="digital-transformation">Digital Transformation Programs</SelectItem>
                            <SelectItem value="sodec">SODEC Cultural Industries</SelectItem>
                            <SelectItem value="unsure">Not sure yet</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="fundingAmount">Expected Quebec Funding Request</Label>
                        <Select name="fundingAmount">
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select funding range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="under-50k">Under $50K</SelectItem>
                            <SelectItem value="50k-100k">$50K - $100K</SelectItem>
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
                            <SelectItem value="rd-phase">R&D/Development Phase</SelectItem>
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
                            <SelectItem value="biotechnology">Biotechnology/Life Sciences</SelectItem>
                            <SelectItem value="manufacturing">Manufacturing</SelectItem>
                            <SelectItem value="creative-media">Creative Industries/Digital Media</SelectItem>
                            <SelectItem value="professional-services">Professional Services</SelectItem>
                            <SelectItem value="retail-wholesale">Retail/Wholesale Trade</SelectItem>
                            <SelectItem value="food-beverage">Food & Beverage</SelectItem>
                            <SelectItem value="transportation">Transportation/Logistics</SelectItem>
                            <SelectItem value="tourism">Tourism/Hospitality</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="languagePreference">Business Language Preference</Label>
                        <Select name="languagePreference">
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select language preference" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="french">French (Français)</SelectItem>
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="bilingual">Bilingual (French/English)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="rdActivities">R&D Activities Status</Label>
                        <Select name="rdActivities">
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select R&D status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active-rd">Active R&D Activities</SelectItem>
                            <SelectItem value="planning-rd">Planning R&D Projects</SelectItem>
                            <SelectItem value="university-collaboration">University Collaboration</SelectItem>
                            <SelectItem value="no-rd">No Current R&D</SelectItem>
                            <SelectItem value="unsure">Unsure about R&D Qualification</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="challenges">Biggest Quebec Funding Challenge (Optional)</Label>
                        <Textarea 
                          id="challenges" 
                          name="challenges" 
                          placeholder="What's your biggest challenge with Quebec provincial funding, R&D tax credits, or program selection?"
                          className="mt-1"
                          rows={3}
                        />
                      </div>

                      <div className="text-xs text-gray-500">
                        <label className="flex items-start space-x-2">
                          <input type="checkbox" className="mt-1" required />
                          <span>
                            I agree to receive email communications about Quebec provincial funding opportunities, R&D tax credits, 
                            and related aide aux entreprises programs. You can unsubscribe at any time.
                          </span>
                        </label>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-blue-800 hover:bg-blue-900 text-lg py-3"
                      >
                        <Download className="w-5 h-5 mr-2" />
                        Download Free Quebec Business Grants Toolkit
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
                    <h4 className="font-semibold text-gray-800 mb-4">Trusted by Quebec Innovation Leaders</h4>
                    <div className="grid grid-cols-3 gap-4 text-xs text-gray-600">
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="font-bold text-blue-600">$14M+</div>
                        <div>Quebec Approvals</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="font-bold text-blue-600">88%</div>
                        <div>Success Rate</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="font-bold text-blue-600">1,500+</div>
                        <div>Downloads</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quebec Success Stories */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
                What Quebec Innovation Leaders Say
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow">
                  <p className="text-gray-700 mb-4 italic">
                    "The Quebec R&D tax credit calculator was incredible. We optimized our credits to 28% and secured 
                    an additional $1.2M through the ESSOR program. The francophone market strategy opened doors to France."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <Award className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold">Marie Dubois</div>
                      <div className="text-sm text-gray-500">CEO, Montreal Biotech Innovations</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <p className="text-gray-700 mb-4 italic">
                    "The PSCE commercialization template was exactly what we needed for our international expansion. 
                    We secured $180K and successfully entered European markets within 6 months."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <Globe className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold">Jean-Luc Tremblay</div>
                      <div className="text-sm text-gray-500">Founder, Quebec City Tech Solutions</div>
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
