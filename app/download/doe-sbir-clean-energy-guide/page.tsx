"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Download, Shield, Zap, Users, MapPin, DollarSign, Target, Loader2 } from "lucide-react"
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function DOESBIRCleanEnergyDownloadPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    state: "",
    sector: "",
    stage: "",
    funding: "",
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
          name: formData.name,
          company: formData.company,
          guideName: "DOE SBIR Clean Energy Guide",
          industry: formData.sector || "Clean Energy",
          country: "USA",
          additionalNotes: `State: ${formData.state || "N/A"}, Stage: ${formData.stage || "N/A"}, Funding Interest: ${formData.funding || "N/A"}`,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        router.push("/download/doe-sbir-clean-energy-guide/thank-you")
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
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50">
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              
              {/* Header Section */}
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-green-100 text-green-800 border-green-200">
                  ⚡ Free DOE SBIR/STTR Clean Energy Grants Toolkit
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Get Your Free DOE SBIR Clean Energy Grants Application Guide & Proposal Templates
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Download our comprehensive DOE SBIR/STTR clean energy grants toolkit covering Phase I ($200,000) and 
                  Phase II ($1,850,000) application strategies, technical proposal templates for renewable energy, energy 
                  storage, carbon capture, grid modernization, commercialization frameworks, topic area analysis, eligibility 
                  requirements, submission timelines, and success strategies for clean tech startups pursuing non-dilutive 
                  federal energy innovation funding across all DOE topic areas including solar, wind, batteries, hydrogen, 
                  geothermal, and climate solutions.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                
                {/* What's Included Section */}
                <Card className="border-green-200 bg-white">
                  <CardHeader>
                    <CardTitle className="text-green-700 text-2xl">
                      📦 What's Included in Your Free DOE SBIR Toolkit:
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Phase I & Phase II Clean Energy Proposal Templates</strong>
                          <p className="text-sm text-gray-600">Complete technical proposal template, energy impact analysis, commercialization plan, budget justification for $200K Phase I and $1.85M Phase II</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">DOE Topic Area Strategy Guide</strong>
                          <p className="text-sm text-gray-600">Detailed analysis of 40+ topic areas across EERE, FECM, Nuclear programs with winning proposal strategies for each topic</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Energy Mission Alignment Framework</strong>
                          <p className="text-sm text-gray-600">Step-by-step framework for articulating energy impact, DOE mission alignment, quantified performance metrics with clean energy examples</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Utility & Industry Partnership Guide</strong>
                          <p className="text-sm text-gray-600">Templates for obtaining letters of support from utilities, energy companies, industrial customers demonstrating market validation</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">DOE Application Timeline & Deadlines</strong>
                          <p className="text-sm text-gray-600">2025-2026 Release 1 and Release 2 submission windows, review timelines, award schedules, project planning</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Clean Energy Commercialization Strategies</strong>
                          <p className="text-sm text-gray-600">Energy sector-specific commercialization planning addressing utility procurement, regulatory requirements, demonstration needs, long sales cycles</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Technology Sector-Specific Guidance</strong>
                          <p className="text-sm text-gray-600">Specialized strategies for solar, wind, batteries, hydrogen, carbon capture, grid tech with sector examples and success stories</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Budget Development for Clean Energy Projects</strong>
                          <p className="text-sm text-gray-600">Line-by-line budget templates for Phase I $200K and Phase II $1.85M with allowable costs for energy R&D, equipment, testing</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Shield className="w-5 h-5 text-green-600 mr-2" />
                        <strong className="text-green-800">Bonus Resources Included:</strong>
                      </div>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Sequential Phase II application guide for additional $750K funding</li>
                        <li>• DOE National Lab collaboration and partnership strategies</li>
                        <li>• Utility customer discovery interview templates and validation frameworks</li>
                        <li>• Phase I to Phase II transition optimization and success planning</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Lead Capture Form */}
                <div>
                  <Card className="border-gray-200 bg-white sticky top-4">
                    <CardHeader className="bg-gradient-to-r from-green-700 to-teal-900 text-white rounded-t-lg">
                      <CardTitle className="text-2xl flex items-center">
                        <Download className="w-6 h-6 mr-2" />
                        Download Your Free Guide Now
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <form onSubmit={handleSubmit} className="space-y-4">
                        
                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Full Name *
                          </label>
                          <input 
                            type="text" 
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            placeholder="Your Name"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Business Email *
                          </label>
                          <input 
                            type="email" 
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            placeholder="your.email@cleantech.com"
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
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Company Name
                          </label>
                          <input 
                            type="text"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            placeholder="Your Clean Energy Startup"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            State/Location
                          </label>
                          <select 
                            value={formData.state}
                            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          >
                            <option value="">Select your state</option>
                            <option value="california">California (SF Bay Area, LA, San Diego)</option>
                            <option value="texas">Texas (Austin, Houston, Dallas)</option>
                            <option value="massachusetts">Massachusetts (Boston)</option>
                            <option value="new-york">New York (NYC)</option>
                            <option value="washington">Washington (Seattle)</option>
                            <option value="colorado">Colorado (Denver)</option>
                            <option value="illinois">Illinois (Chicago)</option>
                            <option value="pennsylvania">Pennsylvania</option>
                            <option value="other">Other State</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Clean Energy Sector
                          </label>
                          <select 
                            value={formData.sector}
                            onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          >
                            <option value="">Select primary sector</option>
                            <option value="solar">Solar Energy Technology</option>
                            <option value="wind">Wind Energy Systems</option>
                            <option value="battery">Battery & Energy Storage</option>
                            <option value="hydrogen">Hydrogen & Fuel Cells</option>
                            <option value="carbon-capture">Carbon Capture & CCUS</option>
                            <option value="grid">Grid Modernization</option>
                            <option value="geothermal">Geothermal Energy</option>
                            <option value="ev">Electric Vehicles</option>
                            <option value="efficiency">Building Energy Efficiency</option>
                            <option value="other">Other Clean Tech</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            DOE SBIR Application Stage
                          </label>
                          <select 
                            value={formData.stage}
                            onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          >
                            <option value="">Select your stage</option>
                            <option value="researching">Researching DOE SBIR Program</option>
                            <option value="preparing">Preparing Phase I Application</option>
                            <option value="phase-i-awarded">Phase I Awarded - Planning Phase II</option>
                            <option value="resubmitting">Resubmitting After Decline</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Funding Interest
                          </label>
                          <select 
                            value={formData.funding}
                            onChange={(e) => setFormData({ ...formData, funding: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          >
                            <option value="">Select primary interest</option>
                            <option value="phase-i">DOE SBIR Phase I ($200K)</option>
                            <option value="phase-ii">DOE SBIR Phase II ($1.85M)</option>
                            <option value="sequential">Sequential Phase II ($750K)</option>
                            <option value="sttr">DOE STTR (Lab Partnership)</option>
                            <option value="all">All DOE SBIR/STTR Programs</option>
                          </select>
                        </div>

                        {error && (
                          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                            <p className="text-red-800 text-sm">{error}</p>
                          </div>
                        )}

                        <div className="flex items-start pt-2">
                          <input 
                            type="checkbox" 
                            id="consent"
                            required 
                            className="mt-1 mr-3"
                          />
                          <label htmlFor="consent" className="text-xs text-gray-600">
                            I agree to receive the DOE SBIR clean energy grants guide and occasional federal energy funding 
                            opportunities. You can unsubscribe anytime. We respect your privacy.
                          </label>
                        </div>

                        <Button 
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-green-700 to-teal-900 hover:from-green-800 hover:to-teal-950 text-white font-semibold py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <Download className="w-5 h-5 mr-2" />
                              Get Instant Access to DOE SBIR Guide
                            </>
                          )}
                        </Button>

                        <p className="text-xs text-center text-gray-500 mt-4">
                          🔒 Your information is 100% secure. We never share your details.
                        </p>
                      </form>
                    </CardContent>
                  </Card>

                  {/* Trust Indicators */}
                  <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-600">$200K</div>
                      <div className="text-xs text-gray-600">Phase I Max</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-teal-600">$1.85M</div>
                      <div className="text-xs text-gray-600">Phase II Max</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">250+</div>
                      <div className="text-xs text-gray-600">Annual Awards</div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Additional Benefits */}
              <div className="mt-12 bg-white rounded-lg shadow-sm p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Why Clean Energy Startups Choose Our DOE SBIR Guide
                </h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Zap className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Complete DOE Topic Coverage</h4>
                    <p className="text-sm text-gray-600">
                      From solar to carbon capture with strategies for all 40+ DOE topic areas and energy priorities
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-8 h-8 text-teal-600" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Energy Mission Alignment</h4>
                    <p className="text-sm text-gray-600">
                      Understand how to align innovation with DOE priorities for renewable energy, grid, climate goals
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target className="w-8 h-8 text-blue-600" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Utility Partnership Strategies</h4>
                    <p className="text-sm text-gray-600">
                      Learn how to engage utilities and energy companies for market validation and commercialization
                    </p>
                  </div>
                </div>
              </div>

              {/* Related Resources */}
              <div className="mt-12 text-center">
                <p className="text-gray-600 mb-4">Want to learn more about DOE SBIR grants before downloading?</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" asChild>
                    <Link href="/blog/doe-sbir-clean-energy-grants">
                      Read Complete DOE SBIR Guide
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/usa/technology-startup-grants">
                      Explore All Tech Startup Grants
                    </Link>
                  </Button>
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
