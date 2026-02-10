"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, Download, FileText, Calculator, Users, Shield, Building, MapPin, Target, Loader2 } from "lucide-react"
import Link from "next/link"

export default function RDARegionalDownloadPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    role: "",
    region: "",
    rdaAgency: "",
    fundingAmount: "",
    industry: "",
    projectStage: "",
    challenges: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          phone: formData.phone,
          name: `${formData.firstName} ${formData.lastName}`,
          company: formData.company,
          guideName: "RDA Regional Application Kit",
          industry: formData.industry || "Regional Business",
          country: "Canada",
          additionalNotes: `Role: ${formData.role}, Region: ${formData.region}, RDA: ${formData.rdaAgency}, Amount: ${formData.fundingAmount}, Stage: ${formData.projectStage}, Challenges: ${formData.challenges || "N/A"}`,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        router.push("/download/rda-regional-application-kit/thank-you")
      } else {
        setError(data.error || "Failed to process download")
      }
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-600 to-purple-800 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🌍 Free Regional Development Toolkit
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                RDA Regional Application Toolkit
              </h1>
              <p className="text-xl text-purple-100 mb-8">
                Get instant access to comprehensive RDA regional application templates, federal compliance strategies, 
                and region-specific guides used by successful applicants to secure $45M+ in Regional Development Agency funding approvals.
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
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">What's Included in Your RDA Regional Toolkit</h2>
                  
                  <div className="space-y-6">
                    <Card className="border-purple-200">
                      <CardHeader>
                        <div className="flex items-center">
                          <FileText className="w-6 h-6 text-purple-600 mr-3" />
                          <CardTitle className="text-purple-700">Regional Application Templates</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>RDA Application Templates (All 7 Agencies)</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Regional Business Plan Framework</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Regional Economic Impact Assessment Template</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Federal-Regional Alignment Checklist</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-blue-200">
                      <CardHeader>
                        <div className="flex items-center">
                          <MapPin className="w-6 h-6 text-blue-600 mr-3" />
                          <CardTitle className="text-blue-700">Regional Strategy Guides</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Complete RDA Agency Selection Guide</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Regional Priority Alignment Matrix</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Regional Stakeholder Mapping Template</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Regional Economic Development Strategy Guide</span>
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
                            <span>RDA Funding Calculator (Excel)</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Regional Economic Impact Calculator</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Job Creation Projection Worksheets</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Multi-RDA Program Integration Planner</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-orange-200">
                      <CardHeader>
                        <div className="flex items-center">
                          <Building className="w-6 h-6 text-orange-600 mr-3" />
                          <CardTitle className="text-orange-700">Regional Network & Partnerships</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Complete RDA Business Development Officer Directory</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Regional Partnership Development Framework</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Regional Innovation Ecosystem Map</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Federal-Regional Program Integration Strategy</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="mt-8 bg-purple-50 border border-purple-200 p-6 rounded-lg">
                    <h4 className="font-bold text-purple-800 mb-2">Bonus: Regional Development Expert Consultation</h4>
                    <p className="text-purple-700 text-sm">
                      Download includes a complimentary 30-minute RDA strategy consultation with our regional 
                      development experts who have secured $45M+ in RDA funding across all 7 agencies.
                    </p>
                  </div>
                </div>

                {/* Right - Lead Capture Form */}
                <div>
                  <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-lg sticky top-8">
                    <div className="text-center mb-6">
                      <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Download className="w-8 h-8 text-purple-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Download Your Free RDA Regional Toolkit</h3>
                      <p className="text-gray-600">Join 2,800+ business leaders who've accessed our regional development resources</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input 
                            id="firstName"
                            required
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            placeholder="Your first name"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input 
                            id="lastName"
                            required
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            placeholder="Your last name"
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email">Business Email *</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="your.email@company.com"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input 
                          id="phone" 
                          type="tel" 
                          required 
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+1 (555) 000-0000"
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="company">Company/Organization *</Label>
                        <Input 
                          id="company"
                          required
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="Your business name"
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="role">Your Role *</Label>
                        <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })} required>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select your role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ceo">CEO/President</SelectItem>
                            <SelectItem value="business-dev">Business Development Manager</SelectItem>
                            <SelectItem value="operations">Operations Manager</SelectItem>
                            <SelectItem value="grants-manager">Grants Manager</SelectItem>
                            <SelectItem value="consultant">Business Consultant</SelectItem>
                            <SelectItem value="economic-dev">Economic Development Officer</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="region">Your Business Region *</Label>
                        <Select value={formData.region} onValueChange={(value) => setFormData({ ...formData, region: value })} required>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select your region" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="atlantic">Atlantic Canada (NB, NS, PE, NL)</SelectItem>
                            <SelectItem value="quebec">Quebec</SelectItem>
                            <SelectItem value="ontario-south">Southern Ontario</SelectItem>
                            <SelectItem value="ontario-north">Northern Ontario</SelectItem>
                            <SelectItem value="prairies">Prairies (AB, SK, MB)</SelectItem>
                            <SelectItem value="bc">British Columbia</SelectItem>
                            <SelectItem value="territories">Northern Territories (YT, NT, NU)</SelectItem>
                            <SelectItem value="multiple">Multiple Regions</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="rdaAgency">Target RDA Agency</Label>
                        <Select value={formData.rdaAgency} onValueChange={(value) => setFormData({ ...formData, rdaAgency: value })}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select target RDA" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="acoa">ACOA (Atlantic Canada)</SelectItem>
                            <SelectItem value="ced">CED (Quebec)</SelectItem>
                            <SelectItem value="feddev">FedDev Ontario</SelectItem>
                            <SelectItem value="fednor">FedNor (Northern Ontario)</SelectItem>
                            <SelectItem value="prairiescan">PrairiesCan</SelectItem>
                            <SelectItem value="pacifican">PacifiCan (BC)</SelectItem>
                            <SelectItem value="cannor">CanNor (Territories)</SelectItem>
                            <SelectItem value="unsure">Not sure yet</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="fundingAmount">Expected RDA Funding Request</Label>
                        <Select value={formData.fundingAmount} onValueChange={(value) => setFormData({ ...formData, fundingAmount: value })}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select funding range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="125k-500k">$125K - $500K</SelectItem>
                            <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                            <SelectItem value="1m-3m">$1M - $3M</SelectItem>
                            <SelectItem value="3m-5m">$3M - $5M</SelectItem>
                            <SelectItem value="5m-10m">$5M - $10M</SelectItem>
                            <SelectItem value="exploring">Still exploring options</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="industry">Industry/Sector Focus</Label>
                        <Select value={formData.industry} onValueChange={(value) => setFormData({ ...formData, industry: value })}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select your sector" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="technology">Technology/Software</SelectItem>
                            <SelectItem value="manufacturing">Advanced Manufacturing</SelectItem>
                            <SelectItem value="cleantech">Clean Technology</SelectItem>
                            <SelectItem value="life-sciences">Life Sciences/Biotech</SelectItem>
                            <SelectItem value="agriculture">Agriculture/Food Processing</SelectItem>
                            <SelectItem value="ocean">Ocean Technology</SelectItem>
                            <SelectItem value="mining">Mining/Resources</SelectItem>
                            <SelectItem value="tourism">Tourism/Creative Industries</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="projectStage">Project Development Stage</Label>
                        <Select value={formData.projectStage} onValueChange={(value) => setFormData({ ...formData, projectStage: value })}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select project stage" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="concept">Concept development</SelectItem>
                            <SelectItem value="planning">Business planning</SelectItem>
                            <SelectItem value="startup">Startup/launch phase</SelectItem>
                            <SelectItem value="scale-up">Scale-up/expansion</SelectItem>
                            <SelectItem value="established">Established business growth</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="challenges">Biggest RDA Challenge (Optional)</Label>
                        <Textarea 
                          id="challenges"
                          value={formData.challenges}
                          onChange={(e) => setFormData({ ...formData, challenges: e.target.value })}
                          placeholder="What's your biggest challenge with RDA regional funding or agency selection?"
                          className="mt-1"
                          rows={3}
                        />
                      </div>

                      {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                          <p className="text-red-800 text-sm">{error}</p>
                        </div>
                      )}

                      <div className="text-xs text-gray-500">
                        <label className="flex items-start space-x-2">
                          <input type="checkbox" className="mt-1" required />
                          <span>
                            I agree to receive email communications about Regional Development Agency funding opportunities and 
                            related federal regional programs. You can unsubscribe at any time.
                          </span>
                        </label>
                      </div>

                      <Button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-lg py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Download className="w-5 h-5 mr-2" />
                            Download Free RDA Regional Toolkit
                          </>
                        )}
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
                    <h4 className="font-semibold text-gray-800 mb-4">Trusted by Regional Business Leaders</h4>
                    <div className="grid grid-cols-3 gap-4 text-xs text-gray-600">
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="font-bold text-purple-600">$45M+</div>
                        <div>RDA Approvals</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="font-bold text-purple-600">88%</div>
                        <div>Success Rate</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="font-bold text-purple-600">2,800+</div>
                        <div>Downloads</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Regional Success Stories */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
                What Regional Business Leaders Say
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow">
                  <p className="text-gray-700 mb-4 italic">
                    "The regional agency selection guide was perfect. We identified ACOA as our best fit and 
                    secured $750K for our ocean technology project within 6 months."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                      <MapPin className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-semibold">Captain Sarah Mitchell</div>
                      <div className="text-sm text-gray-500">CEO, Atlantic Marine Solutions</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <p className="text-gray-700 mb-4 italic">
                    "The business development officer directory saved us weeks. We connected directly with 
                    PacifiCan and got our clean tech expansion funded for $1.2M."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                      <Building className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-semibold">David Chen</div>
                      <div className="text-sm text-gray-500">Founder, BC CleanTech Innovations</div>
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
