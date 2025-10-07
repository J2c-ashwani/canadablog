import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, Download, FileText, Calculator, Users, Shield, Building, Heart, Award } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free WES Women Entrepreneurship Kit | Women Entrepreneurship Strategy Templates & Guide Download",
  description: "Get your free WES women entrepreneurship application kit with federal templates, gender equality strategies, and compliance checklists. Download comprehensive Women Entrepreneurship Strategy toolkit for ecosystem and loan programs.",
  keywords: "WES women entrepreneurship kit download, free Women Entrepreneurship Strategy templates, women business grants application Canada, WES Ecosystem Fund application guide, women-led business funding templates",
}

export default function WomenEntrepreneurshipDownloadPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-pink-600 to-pink-800 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                👩‍💼 Free Women Entrepreneurship Toolkit
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                WES Women Entrepreneurship Application Toolkit
              </h1>
              <p className="text-xl text-pink-100 mb-8">
                Get instant access to comprehensive Women Entrepreneurship Strategy application templates, federal gender equality compliance strategies, 
                and ecosystem development guides used by successful women entrepreneurs to secure $8M+ in WES funding approvals.
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
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">What's Included in Your WES Women Entrepreneurship Toolkit</h2>
                  
                  <div className="space-y-6">
                    <Card className="border-pink-200">
                      <CardHeader>
                        <div className="flex items-center">
                          <FileText className="w-6 h-6 text-pink-600 mr-3" />
                          <CardTitle className="text-pink-700">Federal Women Entrepreneurship Application Templates</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>WES Ecosystem Fund Application Template</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Women Entrepreneurship Loan Fund Application</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Women-Led Business Plan Framework</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Women Ownership Verification Template</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-blue-200">
                      <CardHeader>
                        <div className="flex items-center">
                          <Heart className="w-6 h-6 text-blue-600 mr-3" />
                          <CardTitle className="text-blue-700">Gender Equality & Compliance Guides</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Federal Gender-Based Analysis Plus (GBA+) Framework</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Women Leadership Documentation Checklist</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Federal WES Policy Alignment Matrix</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Gender Impact Measurement Template</span>
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
                            <span>WES Program Funding Calculator (Excel)</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Women-Led Business Growth Projections</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Export Readiness Assessment Worksheet</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Women Entrepreneurship ROI Calculator</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-green-200">
                      <CardHeader>
                        <div className="flex items-center">
                          <Users className="w-6 h-6 text-green-600 mr-3" />
                          <CardTitle className="text-green-700">WES Ecosystem & Network Development</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Complete WES Ecosystem Directory & Contact List</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Women Entrepreneurship Network Mapping Guide</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Mentorship & Partnership Development Framework</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Multi-Program Federal Funding Integration Strategy</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="mt-8 bg-pink-50 border border-pink-200 p-6 rounded-lg">
                    <h4 className="font-bold text-pink-800 mb-2">Bonus: Women Entrepreneurship Expert Consultation</h4>
                    <p className="text-pink-700 text-sm">
                      Download includes a complimentary 30-minute WES strategy consultation with our women 
                      entrepreneurship experts who have secured $8M+ in Women Entrepreneurship Strategy funding approvals.
                    </p>
                  </div>
                </div>

                {/* Right - Lead Capture Form */}
                <div>
                  <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-lg sticky top-8">
                    <div className="text-center mb-6">
                      <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Download className="w-8 h-8 text-pink-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Download Your Free WES Women Entrepreneurship Toolkit</h3>
                      <p className="text-gray-600">Join 900+ women entrepreneurs who've accessed our federal funding resources</p>
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
                          placeholder="Your women-led business name"
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
                            <SelectItem value="owner">Business Owner</SelectItem>
                            <SelectItem value="executive">C-Suite Executive</SelectItem>
                            <SelectItem value="director">Director/VP</SelectItem>
                            <SelectItem value="manager">Manager</SelectItem>
                            <SelectItem value="consultant">Business Consultant</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="womenOwnership">Women Ownership Level *</Label>
                        <Select name="womenOwnership" required>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select ownership level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="majority-owned">Majority Women-Owned (51%+)</SelectItem>
                            <SelectItem value="fully-owned">Fully Women-Owned (100%)</SelectItem>
                            <SelectItem value="minority-owned">Minority Women-Owned (less than 51%)</SelectItem>
                            <SelectItem value="planning">Planning women-led business</SelectItem>
                            <SelectItem value="supporting">Supporting women entrepreneurs</SelectItem>
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
                            <SelectItem value="idea">Idea/Concept Stage</SelectItem>
                            <SelectItem value="startup">Startup (0-2 years)</SelectItem>
                            <SelectItem value="early-growth">Early Growth (2-5 years)</SelectItem>
                            <SelectItem value="established">Established Business (5+ years)</SelectItem>
                            <SelectItem value="scaling">Scaling/Expansion</SelectItem>
                            <SelectItem value="export-ready">Export Ready</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="targetProgram">Target WES Program</Label>
                        <Select name="targetProgram">
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select WES program" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ecosystem-fund">WES Ecosystem Fund</SelectItem>
                            <SelectItem value="loan-fund">Women Entrepreneurship Loan Fund</SelectItem>
                            <SelectItem value="vc-initiative">Inclusive Women Venture Capital Initiative</SelectItem>
                            <SelectItem value="knowledge-hub">Women Entrepreneurship Knowledge Hub</SelectItem>
                            <SelectItem value="procurement">Women-Led Procurement Programs</SelectItem>
                            <SelectItem value="unsure">Not sure yet</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="fundingAmount">Expected WES Funding Request</Label>
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
                            <SelectItem value="1m-3m">$1M - $3M</SelectItem>
                            <SelectItem value="over-3m">Over $3M</SelectItem>
                            <SelectItem value="exploring">Still exploring options</SelectItem>
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
                            <SelectItem value="health-wellness">Health & Wellness</SelectItem>
                            <SelectItem value="retail-ecommerce">Retail/E-commerce</SelectItem>
                            <SelectItem value="professional-services">Professional Services</SelectItem>
                            <SelectItem value="food-beverage">Food & Beverage</SelectItem>
                            <SelectItem value="manufacturing">Manufacturing</SelectItem>
                            <SelectItem value="consulting">Consulting</SelectItem>
                            <SelectItem value="creative-arts">Creative Arts/Media</SelectItem>
                            <SelectItem value="education">Education/Training</SelectItem>
                            <SelectItem value="non-profit">Non-Profit Organization</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="location">Business Location</Label>
                        <Select name="location">
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select your location" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="british-columbia">British Columbia</SelectItem>
                            <SelectItem value="alberta">Alberta</SelectItem>
                            <SelectItem value="saskatchewan">Saskatchewan</SelectItem>
                            <SelectItem value="manitoba">Manitoba</SelectItem>
                            <SelectItem value="ontario">Ontario</SelectItem>
                            <SelectItem value="quebec">Quebec</SelectItem>
                            <SelectItem value="new-brunswick">New Brunswick</SelectItem>
                            <SelectItem value="nova-scotia">Nova Scotia</SelectItem>
                            <SelectItem value="prince-edward-island">Prince Edward Island</SelectItem>
                            <SelectItem value="newfoundland-labrador">Newfoundland and Labrador</SelectItem>
                            <SelectItem value="northwest-territories">Northwest Territories</SelectItem>
                            <SelectItem value="nunavut">Nunavut</SelectItem>
                            <SelectItem value="yukon">Yukon</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="challenges">Biggest WES Challenge (Optional)</Label>
                        <Textarea 
                          id="challenges" 
                          name="challenges" 
                          placeholder="What's your biggest challenge with women entrepreneurship funding or WES program selection?"
                          className="mt-1"
                          rows={3}
                        />
                      </div>

                      <div className="text-xs text-gray-500">
                        <label className="flex items-start space-x-2">
                          <input type="checkbox" className="mt-1" required />
                          <span>
                            I agree to receive email communications about Women Entrepreneurship Strategy funding opportunities and 
                            related federal women business programs. You can unsubscribe at any time.
                          </span>
                        </label>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-pink-600 hover:bg-pink-700 text-lg py-3"
                      >
                        <Download className="w-5 h-5 mr-2" />
                        Download Free WES Women Entrepreneurship Toolkit
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
                    <h4 className="font-semibold text-gray-800 mb-4">Trusted by Women Entrepreneurs</h4>
                    <div className="grid grid-cols-3 gap-4 text-xs text-gray-600">
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="font-bold text-pink-600">$8M+</div>
                        <div>WES Approvals</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="font-bold text-pink-600">89%</div>
                        <div>Success Rate</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="font-bold text-pink-600">900+</div>
                        <div>Downloads</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Women Entrepreneurship Success Stories */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
                What Women Entrepreneurs Say
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow">
                  <p className="text-gray-700 mb-4 italic">
                    "The women ownership verification template was exactly what I needed. We secured $85K through 
                    the Women Entrepreneurship Loan Fund and the ecosystem directory connected us with amazing mentors."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center mr-3">
                      <Heart className="w-5 h-5 text-pink-600" />
                    </div>
                    <div>
                      <div className="font-semibold">Sarah Chen</div>
                      <div className="text-sm text-gray-500">Founder, TechSolutions by Women</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <p className="text-gray-700 mb-4 italic">
                    "The GBA+ framework helped us demonstrate our commitment to gender equality. Our WES Ecosystem 
                    Fund application was approved for $450K to expand our women entrepreneur support programs."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center mr-3">
                      <Award className="w-5 h-5 text-pink-600" />
                    </div>
                    <div>
                      <div className="font-semibold">Dr. Maria Rodriguez</div>
                      <div className="text-sm text-gray-500">Executive Director, Women in Business Network</div>
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
