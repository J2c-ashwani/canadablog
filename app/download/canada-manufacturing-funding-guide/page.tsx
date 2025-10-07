import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, Download, FileText, Calculator, Factory, Cog, Cpu, TrendingUp } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Canada Manufacturing Funding Guide | NGen, IRAP & CDAP Templates Download",
  description: "Get your free Canada manufacturing funding guide with NGen templates, IRAP application tools, ROI calculators, and expert strategies. Download comprehensive toolkit for $3.1B+ manufacturing funding.",
  keywords: "manufacturing funding guide download, free NGen templates, IRAP application guide download, CDAP manufacturing toolkit, automation ROI calculator Canada",
}

export default function CanadaManufacturingFundingDownloadPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-700 to-gray-900 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🏭 Free Download
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Canada Advanced Manufacturing Funding Toolkit
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Get instant access to comprehensive manufacturing funding guide with NGen application templates, 
                IRAP project tools, CDAP digital adoption resources, and automation ROI calculators used by manufacturers 
                to secure $120M+ across 38+ Industry 4.0 programs.
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
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">What's Included in Your Manufacturing Funding Toolkit</h2>
                  
                  <div className="space-y-6">
                    <Card className="border-gray-300">
                      <CardHeader>
                        <div className="flex items-center">
                          <Factory className="w-6 h-6 text-gray-700 mr-3" />
                          <CardTitle className="text-gray-800">NGen Application Templates</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Complete NGen collaborative project template (up to $10M)</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Industry 4.0 technology assessment framework</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Consortium partnership agreement templates</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Productivity improvement metrics calculator</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-blue-200">
                      <CardHeader>
                        <div className="flex items-center">
                          <Cog className="w-6 h-6 text-blue-600 mr-3" />
                          <CardTitle className="text-blue-700">IRAP Manufacturing Tools</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>IRAP manufacturing innovation project template</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Technical feasibility documentation guide</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Budget preparation worksheet</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Industrial Technology Advisor contact list</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-purple-200">
                      <CardHeader>
                        <div className="flex items-center">
                          <Cpu className="w-6 h-6 text-purple-600 mr-3" />
                          <CardTitle className="text-purple-700">CDAP Digital Adoption Resources</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Digital adoption plan template ($15K grant)</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>ERP/MES technology selection guide</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>IoT implementation checklist</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Digital advisor engagement strategies</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-green-200">
                      <CardHeader>
                        <div className="flex items-center">
                          <TrendingUp className="w-6 h-6 text-green-600 mr-3" />
                          <CardTitle className="text-green-700">ROI & Business Case Tools</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Automation ROI calculator with templates</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Productivity improvement metrics framework</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Cost-benefit analysis spreadsheet</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Multi-program funding stacking strategies</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="mt-8 bg-gray-100 border border-gray-300 p-6 rounded-lg">
                    <h4 className="font-bold text-gray-800 mb-2">Bonus: Expert Consultation Offer</h4>
                    <p className="text-gray-700 text-sm">
                      Download includes a complimentary 30-minute manufacturing funding strategy consultation 
                      with our specialists who have secured $120M+ in advanced manufacturing funding with 82% success rate.
                    </p>
                  </div>
                </div>

                {/* Right - Lead Capture Form */}
                <div>
                  <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-lg sticky top-8">
                    <div className="text-center mb-6">
                      <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Download className="w-8 h-8 text-gray-700" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Download Your Free Manufacturing Funding Toolkit</h3>
                      <p className="text-gray-600">Join 2,800+ manufacturers who've accessed our funding resources</p>
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
                            <SelectItem value="ceo">CEO/Owner</SelectItem>
                            <SelectItem value="operations">VP/Director Operations</SelectItem>
                            <SelectItem value="engineering">Engineering Manager</SelectItem>
                            <SelectItem value="production">Production Manager</SelectItem>
                            <SelectItem value="plant-manager">Plant Manager</SelectItem>
                            <SelectItem value="business-dev">Business Development</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="manufacturingType">Manufacturing Sector</Label>
                        <Select name="manufacturingType">
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select manufacturing sector" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="automotive">Automotive & Parts</SelectItem>
                            <SelectItem value="aerospace">Aerospace & Defense</SelectItem>
                            <SelectItem value="food-beverage">Food & Beverage</SelectItem>
                            <SelectItem value="metal-fabrication">Metal Fabrication</SelectItem>
                            <SelectItem value="plastics">Plastics & Composites</SelectItem>
                            <SelectItem value="electronics">Electronics & Technology</SelectItem>
                            <SelectItem value="medical-devices">Medical Devices</SelectItem>
                            <SelectItem value="machinery">Machinery & Equipment</SelectItem>
                            <SelectItem value="other">Other Manufacturing</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="technologyInterest">Primary Technology Interest</Label>
                        <Select name="technologyInterest">
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select technology area" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="robotics">Robotics & Automation</SelectItem>
                            <SelectItem value="ai-analytics">AI & Analytics</SelectItem>
                            <SelectItem value="iot-sensors">IoT & Smart Sensors</SelectItem>
                            <SelectItem value="additive">Additive Manufacturing (3D Printing)</SelectItem>
                            <SelectItem value="digital-twins">Digital Twins & Simulation</SelectItem>
                            <SelectItem value="erp-mes">ERP/MES Systems</SelectItem>
                            <SelectItem value="quality-control">Quality Control Systems</SelectItem>
                            <SelectItem value="multiple">Multiple Technologies</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="employees">Number of Employees</Label>
                        <Select name="employees">
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select company size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-10">1-10 employees</SelectItem>
                            <SelectItem value="11-50">11-50 employees</SelectItem>
                            <SelectItem value="51-100">51-100 employees</SelectItem>
                            <SelectItem value="101-250">101-250 employees</SelectItem>
                            <SelectItem value="251-500">251-500 employees</SelectItem>
                            <SelectItem value="500plus">500+ employees</SelectItem>
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
                            <SelectItem value="under-100k">Under $100K</SelectItem>
                            <SelectItem value="100k-500k">$100K - $500K</SelectItem>
                            <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                            <SelectItem value="1m-5m">$1M - $5M</SelectItem>
                            <SelectItem value="over-5m">Over $5M</SelectItem>
                            <SelectItem value="exploring">Still exploring options</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="challenges">Biggest Manufacturing Funding Challenge (Optional)</Label>
                        <Textarea 
                          id="challenges" 
                          name="challenges" 
                          placeholder="What's your biggest challenge with manufacturing funding applications?"
                          className="mt-1"
                          rows={3}
                        />
                      </div>

                      <div className="text-xs text-gray-500">
                        <label className="flex items-start space-x-2">
                          <input type="checkbox" className="mt-1" required />
                          <span>
                            I agree to receive email communications about manufacturing funding opportunities and 
                            related Industry 4.0 programs. You can unsubscribe at any time.
                          </span>
                        </label>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-gray-800 hover:bg-gray-900 text-lg py-3"
                      >
                        <Download className="w-5 h-5 mr-2" />
                        Download Free Manufacturing Funding Toolkit Now
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
                    <h4 className="font-semibold text-gray-800 mb-4">Trusted by Manufacturing Leaders</h4>
                    <div className="grid grid-cols-3 gap-4 text-xs text-gray-600">
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="font-bold text-gray-700">$120M+</div>
                        <div>Manufacturing Secured</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="font-bold text-gray-700">82%</div>
                        <div>Success Rate</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="font-bold text-gray-700">2,800+</div>
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
                What Manufacturers Say
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow">
                  <p className="text-gray-700 mb-4 italic">
                    "The NGen templates in this toolkit were incredibly detailed. We secured $3.2M 
                    for our robotics automation project with their framework."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                      <Factory className="w-5 h-5 text-gray-700" />
                    </div>
                    <div>
                      <div className="font-semibold">David Thompson</div>
                      <div className="text-sm text-gray-500">VP Operations, AutoTech Manufacturing</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <p className="text-gray-700 mb-4 italic">
                    "The ROI calculator helped us build a bulletproof business case. IRAP approved 
                    our $450K automation project in under 60 days."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                      <Cog className="w-5 h-5 text-gray-700" />
                    </div>
                    <div>
                      <div className="font-semibold">Sarah Martinez</div>
                      <div className="text-sm text-gray-500">CEO, Precision Parts Ltd.</div>
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
