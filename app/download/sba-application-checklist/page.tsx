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
import { CheckCircle, Download, FileText, Shield, Target, Loader2, DollarSign } from "lucide-react"

export default function SBAChecklistDownloadPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    role: "",
    sbaProgram: "",
    fundingAmount: "",
    industry: "",
    businessStage: "",
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
          name: `${formData.firstName} ${formData.lastName}`,
          company: formData.company,
          guideName: "SBA Application Checklist",
          industry: formData.industry || "Small Business",
          country: "USA",
          additionalNotes: `Role: ${formData.role}, SBA Program: ${formData.sbaProgram}, Amount: ${formData.fundingAmount}, Stage: ${formData.businessStage}, Challenges: ${formData.challenges || "N/A"}`,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        router.push("/download/sba-application-checklist/thank-you")
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
        <section className="bg-gradient-to-br from-blue-600 to-green-600 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🇺🇸 Free SBA Application Toolkit
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                SBA Application Checklist & Toolkit
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Get instant access to comprehensive SBA application templates, document checklists, 
                and step-by-step guides used by successful applicants to secure $50M+ in Small Business Administration funding approvals.
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
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">What's Included in Your SBA Checklist Toolkit</h2>
                  
                  <div className="space-y-6">
                    <Card className="border-blue-200">
                      <CardHeader>
                        <div className="flex items-center">
                          <FileText className="w-6 h-6 text-blue-600 mr-3" />
                          <CardTitle className="text-blue-700">Complete Application Templates</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>50+ Item Document Checklist</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>SBA Business Plan Template (7a/504)</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Financial Statements Preparation Guide</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>SBIR/STTR Proposal Framework</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-green-200">
                      <CardHeader>
                        <div className="flex items-center">
                          <Shield className="w-6 h-6 text-green-600 mr-3" />
                          <CardTitle className="text-green-700">Step-by-Step Process Guides</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>SAM.gov Registration Walkthrough</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Grants.gov Application Guide</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>SBA Lender Matching Strategy</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Timeline & Deadline Tracker</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-purple-200">
                      <CardHeader>
                        <div className="flex items-center">
                          <DollarSign className="w-6 h-6 text-purple-600 mr-3" />
                          <CardTitle className="text-purple-700">Financial Tools & Calculators</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>SBA Loan Amount Calculator (Excel)</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Cash Flow Projection Templates</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Budget Justification Worksheets</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>ROI & Impact Measurement Tools</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-orange-200">
                      <CardHeader>
                        <div className="flex items-center">
                          <Target className="w-6 h-6 text-orange-600 mr-3" />
                          <CardTitle className="text-orange-700">Expert Strategies & Tips</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Common Application Mistakes Guide</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>SBA Program Selection Matrix</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Reviewer Evaluation Criteria Breakdown</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Winning Application Examples</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="mt-8 bg-blue-50 border border-blue-200 p-6 rounded-lg">
                    <h4 className="font-bold text-blue-800 mb-2">Bonus: SBA Expert Consultation</h4>
                    <p className="text-blue-700 text-sm">
                      Download includes a complimentary 30-minute SBA strategy consultation with our funding 
                      experts who have secured $50M+ in SBA approvals across all major programs.
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
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Download Your Free SBA Checklist</h3>
                      <p className="text-gray-600">Join 5,000+ entrepreneurs who've accessed our SBA resources</p>
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
                        <Label htmlFor="company">Company/Business Name *</Label>
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
                            <SelectItem value="owner">Business Owner</SelectItem>
                            <SelectItem value="ceo">CEO/President</SelectItem>
                            <SelectItem value="cfo">CFO/Finance Director</SelectItem>
                            <SelectItem value="grants-manager">Grants Manager</SelectItem>
                            <SelectItem value="consultant">Business Consultant</SelectItem>
                            <SelectItem value="accountant">Accountant/CPA</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="sbaProgram">Target SBA Program *</Label>
                        <Select value={formData.sbaProgram} onValueChange={(value) => setFormData({ ...formData, sbaProgram: value })} required>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select SBA program" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="7a">SBA 7(a) Loan</SelectItem>
                            <SelectItem value="504">SBA 504 Loan</SelectItem>
                            <SelectItem value="microloan">Microloan Program</SelectItem>
                            <SelectItem value="sbir-sttr">SBIR/STTR Grants</SelectItem>
                            <SelectItem value="express">SBA Express</SelectItem>
                            <SelectItem value="disaster">Disaster Relief</SelectItem>
                            <SelectItem value="unsure">Not sure yet</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="fundingAmount">Expected Funding Request</Label>
                        <Select value={formData.fundingAmount} onValueChange={(value) => setFormData({ ...formData, fundingAmount: value })}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select funding range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="under-50k">Under $50K</SelectItem>
                            <SelectItem value="50k-150k">$50K - $150K</SelectItem>
                            <SelectItem value="150k-500k">$150K - $500K</SelectItem>
                            <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                            <SelectItem value="1m-5m">$1M - $5M</SelectItem>
                            <SelectItem value="exploring">Still exploring</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="industry">Industry/Sector</Label>
                        <Select value={formData.industry} onValueChange={(value) => setFormData({ ...formData, industry: value })}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select your industry" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="technology">Technology/Software</SelectItem>
                            <SelectItem value="retail">Retail/E-commerce</SelectItem>
                            <SelectItem value="restaurant">Restaurant/Food Service</SelectItem>
                            <SelectItem value="manufacturing">Manufacturing</SelectItem>
                            <SelectItem value="healthcare">Healthcare</SelectItem>
                            <SelectItem value="professional">Professional Services</SelectItem>
                            <SelectItem value="construction">Construction</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="businessStage">Business Stage</Label>
                        <Select value={formData.businessStage} onValueChange={(value) => setFormData({ ...formData, businessStage: value })}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select business stage" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="startup">Startup (0-2 years)</SelectItem>
                            <SelectItem value="early">Early-stage (2-5 years)</SelectItem>
                            <SelectItem value="growth">Growth phase (5-10 years)</SelectItem>
                            <SelectItem value="established">Established (10+ years)</SelectItem>
                            <SelectItem value="planning">Pre-launch/Planning</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="challenges">Biggest SBA Challenge (Optional)</Label>
                        <Textarea 
                          id="challenges"
                          value={formData.challenges}
                          onChange={(e) => setFormData({ ...formData, challenges: e.target.value })}
                          placeholder="What's your biggest challenge with SBA applications?"
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
                            I agree to receive email communications about SBA funding opportunities and 
                            related federal programs. You can unsubscribe at any time.
                          </span>
                        </label>
                      </div>

                      <Button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-lg py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Download className="w-5 h-5 mr-2" />
                            Download Free SBA Checklist
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
                    <h4 className="font-semibold text-gray-800 mb-4">Trusted by Small Business Owners</h4>
                    <div className="grid grid-cols-3 gap-4 text-xs text-gray-600">
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="font-bold text-blue-600">$50M+</div>
                        <div>SBA Approvals</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="font-bold text-green-600">85%</div>
                        <div>Success Rate</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="font-bold text-purple-600">5,000+</div>
                        <div>Downloads</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
                What Small Business Owners Say
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow">
                  <p className="text-gray-700 mb-4 italic">
                    "The document checklist was a lifesaver. We had everything organized and submitted our 
                    7(a) application in record time. Approved for $350K!"
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold">Maria Rodriguez</div>
                      <div className="text-sm text-gray-500">Owner, Rodriguez Restaurant Group</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <p className="text-gray-700 mb-4 italic">
                    "The SBIR proposal framework helped us structure our tech grant perfectly. We won 
                    Phase I funding of $275K on our first try."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <Target className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-semibold">James Chen</div>
                      <div className="text-sm text-gray-500">CEO, TechStart Innovations</div>
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
