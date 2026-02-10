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
import { CheckCircle, Download, Rocket, Plane, Satellite, Shield, Loader2 } from "lucide-react"
import Link from "next/link"

export default function CanadaAerospaceDefenceFundingDownloadPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    role: "",
    aerospaceSector: "",
    technologyFocus: "",
    developmentStage: "",
    fundingNeeds: "",
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
          guideName: "Canada Aerospace & Defence Funding Guide",
          industry: formData.aerospaceSector || "Aerospace/Defence",
          country: "Canada",
          additionalNotes: `Role: ${formData.role}, Technology: ${formData.technologyFocus}, Stage: ${formData.developmentStage}, Funding: ${formData.fundingNeeds}, Challenges: ${formData.challenges || "N/A"}`,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        router.push("/download/canada-aerospace-defence-funding-guide/thank-you")
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
        <section className="bg-gradient-to-br from-blue-700 to-indigo-800 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                ✈️ Free Aerospace Download
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Canada Aerospace Grants Application Toolkit
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Get instant access to comprehensive aerospace funding guide with Canadian Space Agency templates, 
                IDEaS defence innovation tools, aviation grant strategies, and space technology frameworks used by aerospace 
                companies to secure $65M+ across 12+ space, defence, and aviation programs.
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
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">What's Included in Your Aerospace Toolkit</h2>
                  
                  <div className="space-y-6">
                    <Card className="border-blue-200">
                      <CardHeader>
                        <div className="flex items-center">
                          <Rocket className="w-6 h-6 text-blue-600 mr-3" />
                          <CardTitle className="text-blue-700">CSA Application Templates</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Complete CSA space technology project template (up to $5M)</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Satellite development proposal framework</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Space mission design and technical documentation</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Technology readiness level (TRL) assessment tools</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-indigo-200">
                      <CardHeader>
                        <div className="flex items-center">
                          <Shield className="w-6 h-6 text-indigo-600 mr-3" />
                          <CardTitle className="text-indigo-700">IDEaS Defence Innovation Kit</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>IDEaS competitive challenge application templates</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Defence innovation problem statement framework</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Sandbox program proposal guidelines</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Security clearance and IP retention strategies</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-green-200">
                      <CardHeader>
                        <div className="flex items-center">
                          <Plane className="w-6 h-6 text-green-600 mr-3" />
                          <CardTitle className="text-green-700">IRAP Aviation Resources</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>IRAP aerospace innovation project template</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Aviation technology feasibility documentation</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Aircraft certification pathway guides</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Aerospace manufacturing scale-up tools</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-purple-200">
                      <CardHeader>
                        <div className="flex items-center">
                          <Satellite className="w-6 h-6 text-purple-600 mr-3" />
                          <CardTitle className="text-purple-700">Aerospace Business Tools</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Aerospace project ROI calculator and cost models</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Space technology commercialization framework</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Export market analysis for aerospace products</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Multi-program funding stacking strategies</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="mt-8 bg-blue-50 border border-blue-200 p-6 rounded-lg">
                    <h4 className="font-bold text-blue-800 mb-2">Bonus: Expert Aerospace Consultation</h4>
                    <p className="text-blue-700 text-sm">
                      Download includes a complimentary 30-minute aerospace funding strategy consultation 
                      with our specialists who have secured $65M+ in space technology and defence grants with 74% success rate.
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
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Download Your Free Aerospace Toolkit</h3>
                      <p className="text-gray-600">Join 1,800+ aerospace innovators who've accessed our space technology funding resources</p>
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
                          placeholder="Your company name"
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
                            <SelectItem value="ceo">CEO/Founder</SelectItem>
                            <SelectItem value="cto">CTO/Chief Technology Officer</SelectItem>
                            <SelectItem value="engineer">Chief Engineer</SelectItem>
                            <SelectItem value="program-manager">Program Manager</SelectItem>
                            <SelectItem value="business-dev">Business Development</SelectItem>
                            <SelectItem value="rd-director">R&D Director</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="aerospaceSector">Aerospace Sector</Label>
                        <Select 
                          value={formData.aerospaceSector}
                          onValueChange={(value) => setFormData({ ...formData, aerospaceSector: value })}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select aerospace sector" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="space-technology">Space Technology / Satellites</SelectItem>
                            <SelectItem value="aircraft">Aircraft Design / Manufacturing</SelectItem>
                            <SelectItem value="defence">Defence / Military Systems</SelectItem>
                            <SelectItem value="propulsion">Propulsion Systems</SelectItem>
                            <SelectItem value="avionics">Avionics / Flight Systems</SelectItem>
                            <SelectItem value="earth-observation">Earth Observation / Remote Sensing</SelectItem>
                            <SelectItem value="space-robotics">Space Robotics</SelectItem>
                            <SelectItem value="other">Other Aerospace</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="technologyFocus">Primary Technology Focus</Label>
                        <Select 
                          value={formData.technologyFocus}
                          onValueChange={(value) => setFormData({ ...formData, technologyFocus: value })}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select technology area" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="satellite-systems">Satellite Systems & Subsystems</SelectItem>
                            <SelectItem value="launch-systems">Launch Systems / Propulsion</SelectItem>
                            <SelectItem value="spacecraft">Spacecraft / Space Vehicles</SelectItem>
                            <SelectItem value="aircraft-systems">Aircraft Systems</SelectItem>
                            <SelectItem value="autonomous">Autonomous Systems</SelectItem>
                            <SelectItem value="surveillance">Surveillance & Reconnaissance</SelectItem>
                            <SelectItem value="materials">Advanced Materials / Composites</SelectItem>
                            <SelectItem value="cyber-defence">Cyber Defence / Security</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="developmentStage">Development Stage</Label>
                        <Select 
                          value={formData.developmentStage}
                          onValueChange={(value) => setFormData({ ...formData, developmentStage: value })}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select development stage" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="concept">Concept Development</SelectItem>
                            <SelectItem value="design">Design & Engineering</SelectItem>
                            <SelectItem value="prototype">Prototype Development</SelectItem>
                            <SelectItem value="testing">Testing & Validation</SelectItem>
                            <SelectItem value="certification">Certification Process</SelectItem>
                            <SelectItem value="manufacturing">Manufacturing / Production</SelectItem>
                            <SelectItem value="commercialization">Commercialization</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="fundingNeeds">Estimated Funding Needs</Label>
                        <Select 
                          value={formData.fundingNeeds}
                          onValueChange={(value) => setFormData({ ...formData, fundingNeeds: value })}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select funding range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="under-250k">Under $250K</SelectItem>
                            <SelectItem value="250k-500k">$250K - $500K</SelectItem>
                            <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                            <SelectItem value="1m-3m">$1M - $3M</SelectItem>
                            <SelectItem value="3m-5m">$3M - $5M</SelectItem>
                            <SelectItem value="over-5m">Over $5M</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="challenges">Biggest Aerospace Funding Challenge (Optional)</Label>
                        <Textarea 
                          id="challenges" 
                          value={formData.challenges}
                          onChange={(e) => setFormData({ ...formData, challenges: e.target.value })}
                          placeholder="What's your biggest challenge with aerospace grant applications, CSA funding, or defence innovation programs?"
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
                            I agree to receive email communications about aerospace funding opportunities, 
                            space technology grants, defence innovation programs, and related aviation funding. You can unsubscribe at any time.
                          </span>
                        </label>
                      </div>

                      <Button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-700 hover:bg-blue-800 text-lg py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Download className="w-5 h-5 mr-2" />
                            Download Free Aerospace Toolkit Now
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
                    <h4 className="font-semibold text-gray-800 mb-4">Trusted by Aerospace Leaders</h4>
                    <div className="grid grid-cols-3 gap-4 text-xs text-gray-600">
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="font-bold text-blue-600">$65M+</div>
                        <div>Aerospace Grants Secured</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="font-bold text-blue-600">74%</div>
                        <div>Success Rate</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="font-bold text-blue-600">1,800+</div>
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
                What Aerospace Innovators Say
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow">
                  <p className="text-gray-700 mb-4 italic">
                    "The CSA templates and space technology framework helped us secure $3.2M 
                    for our satellite communications system. The technical documentation guides were outstanding."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <Rocket className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold">Dr. James Morrison</div>
                      <div className="text-sm text-gray-500">CTO, Orbital Systems Inc.</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <p className="text-gray-700 mb-4 italic">
                    "The IDEaS defence innovation toolkit was exactly what we needed. We won 
                    a $950K sandbox program for our autonomous surveillance platform."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <Shield className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold">Sarah Bennett</div>
                      <div className="text-sm text-gray-500">CEO, DefenceTech Solutions</div>
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
