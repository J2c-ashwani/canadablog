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
import { CheckCircle, Download, FileText, Calculator, Users, Shield, Building, Leaf, Award, Loader2 } from "lucide-react"
import Link from "next/link"

export default function AgricultureAgriFoodDownloadPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    role: "",
    agriculturalSector: "",
    targetProgram: "",
    fundingAmount: "",
    innovationFocus: "",
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
          name: `${formData.firstName} ${formData.lastName}`,
          company: formData.company,
          guideName: "AAFC Agricultural Application Kit",
          industry: formData.agriculturalSector || "Agriculture",
          country: "Canada",
          additionalNotes: `Role: ${formData.role}, Target Program: ${formData.targetProgram}, Funding: ${formData.fundingAmount}, Focus: ${formData.innovationFocus}, Stage: ${formData.projectStage}, Challenges: ${formData.challenges || "N/A"}`,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        router.push("/download/aafc-agricultural-application-kit/thank-you")
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
        <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🌾 Free Agricultural Funding Toolkit
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                AAFC Agricultural Application Toolkit
              </h1>
              <p className="text-xl text-green-100 mb-8">
                Get instant access to comprehensive Agriculture & Agri-Food Canada application templates, federal compliance strategies,
                and sector-specific guides used by successful applicants to secure $18M+ in AAFC funding approvals.
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
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">What's Included in Your AAFC Agricultural Toolkit</h2>

                  <div className="space-y-6">
                    <Card className="border-green-200">
                      <CardHeader>
                        <div className="flex items-center">
                          <FileText className="w-6 h-6 text-green-600 mr-3" />
                          <CardTitle className="text-green-700">Federal Agricultural Application Templates</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>AgriInnovate Application Template</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>AgriScience Research Partnership Framework</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>AgriCompetitiveness Market Development Template</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Agricultural Business Plan Framework</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-blue-200">
                      <CardHeader>
                        <div className="flex items-center">
                          <Leaf className="w-6 h-6 text-blue-600 mr-3" />
                          <CardTitle className="text-blue-700">Agricultural Sector Strategy Guides</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Primary Production Innovation Strategy</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Agri-Food Processing Development Guide</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Agri-Based Products Strategy Framework</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Agricultural Federal Priority Alignment Matrix</span>
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
                            <span>AAFC Program Funding Calculator (Excel)</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Agricultural Innovation ROI Calculator</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Sustainability Impact Assessment Worksheet</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Agricultural Market Analysis Template</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-orange-200">
                      <CardHeader>
                        <div className="flex items-center">
                          <Building className="w-6 h-6 text-orange-600 mr-3" />
                          <CardTitle className="text-orange-700">Agricultural Partnership & Compliance</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Agricultural Research Institution Partnership Guide</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Federal Agricultural Compliance Checklist</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Sustainable CAP Integration Strategy</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Multi-Program Agricultural Funding Roadmap</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="mt-8 bg-green-50 border border-green-200 p-6 rounded-lg">
                    <h4 className="font-bold text-green-800 mb-2">Bonus: Agricultural Funding Expert Consultation</h4>
                    <p className="text-green-700 text-sm">
                      Download includes a complimentary 30-minute AAFC strategy consultation with our agricultural
                      funding experts who have secured $18M+ in Agriculture & Agri-Food Canada funding approvals.
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
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Download Your Free AAFC Agricultural Toolkit</h3>
                      <p className="text-gray-600">Join 1,400+ agricultural leaders who've accessed our federal funding resources</p>
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
                        <Label htmlFor="company">Company/Organization *</Label>
                        <Input
                          id="company"
                          required
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="Your agricultural business name"
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="role">Your Role *</Label>
                        <Select
                          required
                          value={formData.role}
                          onValueChange={(value) => setFormData({ ...formData, role: value })}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select your role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="owner">Farm Owner/Operator</SelectItem>
                            <SelectItem value="ceo">CEO/President</SelectItem>
                            <SelectItem value="rd-manager">R&D Manager</SelectItem>
                            <SelectItem value="operations">Operations Manager</SelectItem>
                            <SelectItem value="researcher">Agricultural Researcher</SelectItem>
                            <SelectItem value="consultant">Agricultural Consultant</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="agriculturalSector">Agricultural Sector *</Label>
                        <Select
                          required
                          value={formData.agriculturalSector}
                          onValueChange={(value) => setFormData({ ...formData, agriculturalSector: value })}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select your sector" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="crop-production">Crop Production</SelectItem>
                            <SelectItem value="livestock">Livestock/Animal Agriculture</SelectItem>
                            <SelectItem value="food-processing">Food Processing/Manufacturing</SelectItem>
                            <SelectItem value="agri-technology">Agricultural Technology</SelectItem>
                            <SelectItem value="research-institution">Research Institution</SelectItem>
                            <SelectItem value="agri-based-products">Agri-Based Products/Bio-economy</SelectItem>
                            <SelectItem value="supply-chain">Agricultural Supply Chain</SelectItem>
                            <SelectItem value="other">Other Agricultural Sector</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="targetProgram">Target AAFC Program</Label>
                        <Select
                          value={formData.targetProgram}
                          onValueChange={(value) => setFormData({ ...formData, targetProgram: value })}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select AAFC program" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="agriinnovate">AgriInnovate Program</SelectItem>
                            <SelectItem value="agriscience">AgriScience Program</SelectItem>
                            <SelectItem value="agricompetitiveness">AgriCompetitiveness Program</SelectItem>
                            <SelectItem value="agridiversity">AgriDiversity Program</SelectItem>
                            <SelectItem value="local-food">Local Food Infrastructure Fund</SelectItem>
                            <SelectItem value="clean-tech">Agricultural Clean Technology</SelectItem>
                            <SelectItem value="unsure">Not sure yet</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="fundingAmount">Expected AAFC Funding Request</Label>
                        <Select
                          value={formData.fundingAmount}
                          onValueChange={(value) => setFormData({ ...formData, fundingAmount: value })}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select funding range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="under-250k">Under $250K</SelectItem>
                            <SelectItem value="250k-1m">$250K - $1M</SelectItem>
                            <SelectItem value="1m-3m">$1M - $3M</SelectItem>
                            <SelectItem value="3m-5m">$3M - $5M</SelectItem>
                            <SelectItem value="over-5m">Over $5M (AgriScience Clusters)</SelectItem>
                            <SelectItem value="exploring">Still exploring options</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="innovationFocus">Innovation/Project Focus</Label>
                        <Select
                          value={formData.innovationFocus}
                          onValueChange={(value) => setFormData({ ...formData, innovationFocus: value })}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select focus area" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="precision-agriculture">Precision Agriculture/Digital Farming</SelectItem>
                            <SelectItem value="sustainable-practices">Sustainable Agricultural Practices</SelectItem>
                            <SelectItem value="alternative-proteins">Alternative Proteins/Novel Foods</SelectItem>
                            <SelectItem value="biotechnology">Agricultural Biotechnology</SelectItem>
                            <SelectItem value="climate-resilience">Climate Resilience/Adaptation</SelectItem>
                            <SelectItem value="food-processing">Food Processing Innovation</SelectItem>
                            <SelectItem value="bio-based-products">Bio-based Products</SelectItem>
                            <SelectItem value="other">Other Innovation Focus</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="projectStage">Project Development Stage</Label>
                        <Select
                          value={formData.projectStage}
                          onValueChange={(value) => setFormData({ ...formData, projectStage: value })}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select project stage" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="research">Research/Concept Phase</SelectItem>
                            <SelectItem value="development">Technology Development</SelectItem>
                            <SelectItem value="pilot">Pilot/Demonstration Phase</SelectItem>
                            <SelectItem value="pre-commercial">Pre-commercial Development</SelectItem>
                            <SelectItem value="commercialization">Commercialization Ready</SelectItem>
                            <SelectItem value="market-development">Market Development</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="challenges">Biggest AAFC Challenge (Optional)</Label>
                        <Textarea
                          id="challenges"
                          value={formData.challenges}
                          onChange={(e) => setFormData({ ...formData, challenges: e.target.value })}
                          placeholder="What's your biggest challenge with AAFC agricultural funding or program selection?"
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
                            I agree to receive email communications about Agriculture & Agri-Food Canada funding opportunities and
                            related federal agricultural programs. You can unsubscribe at any time.
                          </span>
                        </label>
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-green-600 hover:bg-green-700 text-lg py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Download className="w-5 h-5 mr-2" />
                            Download Free AAFC Agricultural Toolkit
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
                    <h4 className="font-semibold text-gray-800 mb-4">Trusted by Agricultural Innovators</h4>
                    <div className="grid grid-cols-3 gap-4 text-xs text-gray-600">
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="font-bold text-green-600">$18M+</div>
                        <div>AAFC Approvals</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="font-bold text-green-600">91%</div>
                        <div>Success Rate</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="font-bold text-green-600">1,400+</div>
                        <div>Downloads</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Agricultural Success Stories */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
                What Agricultural Leaders Say
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow">
                  <p className="text-gray-700 mb-4 italic">
                    "The AgriInnovate application template was exactly what we needed. We secured $850K for our
                    precision agriculture platform and the federal compliance checklist kept us on track."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <Leaf className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-semibold">Dr. Emma Richardson</div>
                      <div className="text-sm text-gray-500">CTO, FarmTech Innovations</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <p className="text-gray-700 mb-4 italic">
                    "The agricultural partnership guide helped us connect with the right research institutions.
                    Our AgriScience cluster proposal was approved for $12M in federal funding."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <Award className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-semibold">Dr. Michael Foster</div>
                      <div className="text-sm text-gray-500">Director, Sustainable Agriculture Consortium</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Resources - Engagement Booster */}
        <section className="py-12 bg-white border-t border-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">More Free Resources for Your Business</h3>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Card className="hover:shadow-md transition-shadow cursor-pointer border-green-100">
                <CardHeader>
                  <CardTitle className="text-lg text-green-700">Grant Finder Tool</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">Match your business with 5,000+ active funding opportunities in seconds.</p>
                  <Button variant="outline" className="w-full text-green-700 border-green-200 hover:bg-green-50" asChild>
                    <Link href="/grant-finder">Find Grants Now</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer border-blue-100">
                <CardHeader>
                  <CardTitle className="text-lg text-blue-700">Application Guides</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">Step-by-step instructions for winning federal and provincial grants.</p>
                  <Button variant="outline" className="w-full text-blue-700 border-blue-200 hover:bg-blue-50" asChild>
                    <Link href="/guides">Read Guides</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer border-purple-100">
                <CardHeader>
                  <CardTitle className="text-lg text-purple-700">Expert Review</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">Get your application reviewed by funding experts before submission.</p>
                  <Button variant="outline" className="w-full text-purple-700 border-purple-200 hover:bg-purple-50" asChild>
                    <Link href="/contact">Contact Experts</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
