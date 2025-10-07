import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, Download, FileText, Calculator, Leaf, Zap, Sun, Wind } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Canada CleanTech Funding Guide | SDTC, ITCs & Net Zero Programs Download",
  description: "Get your free Canada clean technology funding guide with SDTC templates, Clean Tech ITC calculators, and expert strategies. Download comprehensive toolkit for $1.2B+ cleantech funding.",
  keywords: "cleantech funding guide download, free SDTC templates, clean technology grant checklist, SDTC application guide download, clean tech ITC calculator Canada",
}

export default function CanadaCleanTechFundingDownloadPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-teal-600 to-green-700 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🌱 Free Download
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Canada Clean Technology Funding Toolkit
              </h1>
              <p className="text-xl text-teal-100 mb-8">
                Get instant access to comprehensive clean technology funding guide with SDTC application templates, 
                Clean Tech ITC calculators, and expert strategies used by companies to secure $75M+ in environmental 
                innovation funding across 22+ programs.
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
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">What's Included in Your CleanTech Funding Toolkit</h2>
                  
                  <div className="space-y-6">
                    <Card className="border-teal-200">
                      <CardHeader>
                        <div className="flex items-center">
                          <Leaf className="w-6 h-6 text-teal-600 mr-3" />
                          <CardTitle className="text-teal-700">SDTC Application Templates</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Complete SDTC application template (up to $15M)</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Environmental impact assessment framework</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Technology readiness level (TRL) documentation</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>GHG emissions reduction calculator</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-green-200">
                      <CardHeader>
                        <div className="flex items-center">
                          <Zap className="w-6 h-6 text-green-600 mr-3" />
                          <CardTitle className="text-green-700">Clean Technology ITC Guide</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Clean Tech ITC calculator (15-30% rates)</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Eligible equipment categorization guide</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>ITC claim preparation checklist</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Solar, wind, and storage ITC templates</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-blue-200">
                      <CardHeader>
                        <div className="flex items-center">
                          <Calculator className="w-6 h-6 text-blue-600 mr-3" />
                          <CardTitle className="text-blue-700">Net Zero & Program Planning</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Net Zero Accelerator application framework</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Clean Growth Program templates</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Program selection decision matrix</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Multi-program stacking strategies</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-purple-200">
                      <CardHeader>
                        <div className="flex items-center">
                          <FileText className="w-6 h-6 text-purple-600 mr-3" />
                          <CardTitle className="text-purple-700">Provincial CleanTech Programs</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>BC CleanBC program application guide</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Alberta emissions reduction funding</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Ontario and Quebec cleantech incentives</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Regional program comparison matrix</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="mt-8 bg-teal-50 border border-teal-200 p-6 rounded-lg">
                    <h4 className="font-bold text-teal-800 mb-2">Bonus: Expert Consultation Offer</h4>
                    <p className="text-teal-700 text-sm">
                      Download includes a complimentary 30-minute clean technology funding strategy consultation 
                      with our specialists who have secured $75M+ in cleantech funding with 85% success rate.
                    </p>
                  </div>
                </div>

                {/* Right - Lead Capture Form */}
                <div>
                  <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-lg sticky top-8">
                    <div className="text-center mb-6">
                      <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Download className="w-8 h-8 text-teal-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Download Your Free CleanTech Funding Toolkit</h3>
                      <p className="text-gray-600">Join 1,200+ cleantech innovators who've accessed our funding resources</p>
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
                            <SelectItem value="ceo">CEO/Founder</SelectItem>
                            <SelectItem value="cto">CTO/Chief Technology Officer</SelectItem>
                            <SelectItem value="sustainability">Sustainability Director</SelectItem>
                            <SelectItem value="operations">Operations Manager</SelectItem>
                            <SelectItem value="business-dev">Business Development</SelectItem>
                            <SelectItem value="consultant">Consultant</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="cleanTechArea">Clean Technology Focus</Label>
                        <Select name="cleanTechArea">
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select technology area" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="solar">Solar Energy</SelectItem>
                            <SelectItem value="wind">Wind Energy</SelectItem>
                            <SelectItem value="storage">Energy Storage</SelectItem>
                            <SelectItem value="hydrogen">Clean Hydrogen</SelectItem>
                            <SelectItem value="ccus">Carbon Capture (CCUS)</SelectItem>
                            <SelectItem value="ev">Electric Vehicles</SelectItem>
                            <SelectItem value="waste">Waste to Energy</SelectItem>
                            <SelectItem value="water">Water Treatment</SelectItem>
                            <SelectItem value="agriculture">Sustainable Agriculture</SelectItem>
                            <SelectItem value="other">Other CleanTech</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="projectStage">Technology Stage</Label>
                        <Select name="projectStage">
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select development stage" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="concept">Concept/Early R&D (TRL 1-3)</SelectItem>
                            <SelectItem value="prototype">Prototype Development (TRL 4-5)</SelectItem>
                            <SelectItem value="demonstration">Demonstration (TRL 6-7)</SelectItem>
                            <SelectItem value="pilot">Pilot/Pre-Commercial (TRL 8)</SelectItem>
                            <SelectItem value="commercial">Commercial Deployment (TRL 9)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="fundingNeeds">Estimated Funding Needs</Label>
                        <Select name="fundingNeeds">
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select funding range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="under-500k">Under $500K</SelectItem>
                            <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                            <SelectItem value="1m-5m">$1M - $5M</SelectItem>
                            <SelectItem value="5m-15m">$5M - $15M</SelectItem>
                            <SelectItem value="over-15m">Over $15M</SelectItem>
                            <SelectItem value="exploring">Still exploring options</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="challenges">Biggest CleanTech Funding Challenge (Optional)</Label>
                        <Textarea 
                          id="challenges" 
                          name="challenges" 
                          placeholder="What's your biggest challenge with cleantech funding applications?"
                          className="mt-1"
                          rows={3}
                        />
                      </div>

                      <div className="text-xs text-gray-500">
                        <label className="flex items-start space-x-2">
                          <input type="checkbox" className="mt-1" required />
                          <span>
                            I agree to receive email communications about clean technology funding opportunities and 
                            related environmental innovation programs. You can unsubscribe at any time.
                          </span>
                        </label>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-teal-600 hover:bg-teal-700 text-lg py-3"
                      >
                        <Download className="w-5 h-5 mr-2" />
                        Download Free CleanTech Funding Toolkit Now
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
                    <h4 className="font-semibold text-gray-800 mb-4">Trusted by CleanTech Leaders</h4>
                    <div className="grid grid-cols-3 gap-4 text-xs text-gray-600">
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="font-bold text-teal-600">$75M+</div>
                        <div>CleanTech Secured</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="font-bold text-teal-600">85%</div>
                        <div>Success Rate</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="font-bold text-teal-600">1,200+</div>
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
                What CleanTech Innovators Say
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow">
                  <p className="text-gray-700 mb-4 italic">
                    "The SDTC templates in this toolkit were incredibly detailed. We secured $8.5M 
                    for our carbon capture technology demonstration project."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                      <Leaf className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <div className="font-semibold">Alexandra Chen</div>
                      <div className="text-sm text-gray-500">CEO, CleanCarbon Solutions</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <p className="text-gray-700 mb-4 italic">
                    "The Clean Tech ITC calculator helped us maximize our solar project incentives. 
                    We saved over $2M in upfront capital costs with the 30% credit."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                      <Sun className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <div className="font-semibold">Michael Rodriguez</div>
                      <div className="text-sm text-gray-500">Director, SolarTech Energy Inc.</div>
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
