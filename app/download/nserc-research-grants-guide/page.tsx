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
import { CheckCircle, Download, FileText, Calculator, Users, Building, GraduationCap, Lightbulb, Loader2 } from "lucide-react"
import Link from "next/link"

export default function NSERCResearchGrantsDownloadPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    institution: "",
    position: "",
    researchArea: "",
    annualResearchBudget: "",
    nsercExperience: "",
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
          company: formData.institution,
          guideName: "NSERC Research Grants Application Kit",
          industry: formData.researchArea || "Research/Academic",
          country: "Canada",
          additionalNotes: `Position: ${formData.position}, Budget: ${formData.annualResearchBudget}, Experience: ${formData.nsercExperience}, Challenges: ${formData.challenges || "N/A"}`,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        router.push("/download/nserc-research-grants-application-kit/thank-you")
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
        <section className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🔬 Free Download
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                NSERC Research Grants Application Toolkit
              </h1>
              <p className="text-xl text-indigo-100 mb-8">
                Get instant access to comprehensive NSERC research application templates, I2I grant guides, and university-industry partnership strategies 
                used by successful researchers to secure $25M+ in Natural Sciences & Engineering Research Council funding.
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
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">What's Included in Your NSERC Research Toolkit</h2>
                  
                  <div className="space-y-6">
                    <Card className="border-indigo-200">
                      <CardHeader>
                        <div className="flex items-center">
                          <FileText className="w-6 h-6 text-indigo-600 mr-3" />
                          <CardTitle className="text-indigo-700">I2I Application Templates & Forms</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Complete I2I Phase I, IIa, IIb Templates</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Research Proposal Framework</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Literature Review Template</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Technical Methodology Guide</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-blue-200">
                      <CardHeader>
                        <div className="flex items-center">
                          <Building className="w-6 h-6 text-blue-600 mr-3" />
                          <CardTitle className="text-blue-700">University-Industry Partnership Guide</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Partner Identification & Engagement Strategies</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Partnership Agreement Templates</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Industry Contribution Guidelines</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Technology Transfer Planning Tools</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-green-200">
                      <CardHeader>
                        <div className="flex items-center">
                          <Calculator className="w-6 h-6 text-green-600 mr-3" />
                          <CardTitle className="text-green-700">Budget & Project Planning Tools</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>NSERC Budget Calculator (Excel)</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Research Timeline & Milestone Template</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>HQP Training Plan Framework</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Budget Justification Worksheets</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-purple-200">
                      <CardHeader>
                        <div className="flex items-center">
                          <Lightbulb className="w-6 h-6 text-purple-600 mr-3" />
                          <CardTitle className="text-purple-700">Expert Success Strategies & Resources</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Success Stories from $25M+ in NSERC Funding</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Peer Review Evaluation Criteria Guide</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Common Application Pitfalls Checklist</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Commercialization Strategy Framework</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="mt-8 bg-indigo-50 border border-indigo-200 p-6 rounded-lg">
                    <h4 className="font-bold text-indigo-800 mb-2">Bonus: Expert Research Consultation Offer</h4>
                    <p className="text-indigo-700 text-sm">
                      Download includes a complimentary 30-minute NSERC research strategy consultation with our specialists 
                      who have secured $25M+ in NSERC funding with extensive university-industry partnership experience.
                    </p>
                  </div>
                </div>

                {/* Right - Lead Capture Form */}
                <div>
                  <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-lg sticky top-8">
                    <div className="text-center mb-6">
                      <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Download className="w-8 h-8 text-indigo-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Download Your Free NSERC Research Toolkit</h3>
                      <p className="text-gray-600">Join 950+ university researchers who've accessed our NSERC resources</p>
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
                            placeholder="Dr. John"
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
                            placeholder="Smith"
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email">Academic Email *</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="john.smith@university.ca"
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
                        <Label htmlFor="institution">Institution/University *</Label>
                        <Input 
                          id="institution"
                          required
                          value={formData.institution}
                          onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                          placeholder="University of Toronto"
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="position">Academic Position *</Label>
                        <Select value={formData.position} onValueChange={(value) => setFormData({ ...formData, position: value })} required>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select your position" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="full-professor">Full Professor</SelectItem>
                            <SelectItem value="associate-professor">Associate Professor</SelectItem>
                            <SelectItem value="assistant-professor">Assistant Professor</SelectItem>
                            <SelectItem value="research-scientist">Research Scientist</SelectItem>
                            <SelectItem value="postdoc">Postdoctoral Fellow</SelectItem>
                            <SelectItem value="graduate-student">Graduate Student</SelectItem>
                            <SelectItem value="research-administrator">Research Administrator</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="researchArea">Primary Research Area</Label>
                        <Select value={formData.researchArea} onValueChange={(value) => setFormData({ ...formData, researchArea: value })}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select research area" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="engineering">Engineering Sciences</SelectItem>
                            <SelectItem value="physical-sciences">Physical Sciences</SelectItem>
                            <SelectItem value="life-sciences">Life Sciences</SelectItem>
                            <SelectItem value="computer-science">Computer Science</SelectItem>
                            <SelectItem value="mathematical-sciences">Mathematical Sciences</SelectItem>
                            <SelectItem value="earth-environmental">Earth & Environmental Sciences</SelectItem>
                            <SelectItem value="interdisciplinary">Interdisciplinary Research</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="annualResearchBudget">Annual Research Budget</Label>
                        <Select value={formData.annualResearchBudget} onValueChange={(value) => setFormData({ ...formData, annualResearchBudget: value })}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select budget range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="under-50k">Under $50K</SelectItem>
                            <SelectItem value="50k-100k">$50K - $100K</SelectItem>
                            <SelectItem value="100k-250k">$100K - $250K</SelectItem>
                            <SelectItem value="250k-500k">$250K - $500K</SelectItem>
                            <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                            <SelectItem value="over-1m">Over $1M</SelectItem>
                            <SelectItem value="seeking-first-grant">Seeking first major grant</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="nsercExperience">NSERC Grant Experience</Label>
                        <Select value={formData.nsercExperience} onValueChange={(value) => setFormData({ ...formData, nsercExperience: value })}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select your NSERC experience" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="first-time">First time applying to NSERC</SelectItem>
                            <SelectItem value="discovery-grants">Have Discovery Grant experience</SelectItem>
                            <SelectItem value="some-nserc">Some NSERC grant experience</SelectItem>
                            <SelectItem value="multiple-nserc">Multiple NSERC grants</SelectItem>
                            <SelectItem value="i2i-experience">Previous I2I grant experience</SelectItem>
                            <SelectItem value="experienced-researcher">Extensive NSERC experience</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="challenges">Biggest NSERC Challenge (Optional)</Label>
                        <Textarea 
                          id="challenges"
                          value={formData.challenges}
                          onChange={(e) => setFormData({ ...formData, challenges: e.target.value })}
                          placeholder="What's your biggest challenge with NSERC applications or university-industry partnerships?"
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
                            I agree to receive email communications about NSERC research funding opportunities and 
                            related university research programs. You can unsubscribe at any time.
                          </span>
                        </label>
                      </div>

                      <Button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-lg py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Download className="w-5 h-5 mr-2" />
                            Download Free NSERC Research Toolkit Now
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
                    <h4 className="font-semibold text-gray-800 mb-4">Trusted by Leading Researchers</h4>
                    <div className="grid grid-cols-3 gap-4 text-xs text-gray-600">
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="font-bold text-indigo-600">$25M+</div>
                        <div>NSERC Secured</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="font-bold text-indigo-600">92%</div>
                        <div>Success Rate</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="font-bold text-indigo-600">950+</div>
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
                What Leading Researchers Say
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow">
                  <p className="text-gray-700 mb-4 italic">
                    "The I2I templates in this toolkit were incredibly detailed. We secured $280K 
                    in Phase IIb funding for our quantum computing research partnership."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                      <GraduationCap className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <div className="font-semibold">Dr. Sarah Chen</div>
                      <div className="text-sm text-gray-500">Professor, Computer Science, UBC</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <p className="text-gray-700 mb-4 italic">
                    "The partnership strategies helped us connect with the right industry collaborators. 
                    Our materials engineering project received full I2I Phase IIa funding."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                      <GraduationCap className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <div className="font-semibold">Dr. Michael Roberts</div>
                      <div className="text-sm text-gray-500">Associate Professor, Engineering, McGill</div>
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
