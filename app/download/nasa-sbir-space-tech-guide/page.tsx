"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Download, Shield, Rocket, Users, MapPin, DollarSign, Target, Loader2 } from "lucide-react"
import Link from "next/link"

export default function NASASBIRSpaceTechDownloadPage() {
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
          guideName: "NASA SBIR Space Tech Guide",
          industry: formData.sector || "Space Technology",
          country: "USA",
          additionalNotes: `State: ${formData.state || "N/A"}, Stage: ${formData.stage || "N/A"}, Funding Interest: ${formData.funding || "N/A"}`,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        router.push("/download/nasa-sbir-space-tech-guide/thank-you")
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
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              
              {/* Header Section */}
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-indigo-100 text-indigo-800 border-indigo-200">
                  🚀 Free NASA SBIR/STTR Space Tech Grants Toolkit
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Get Your Free NASA SBIR Space Tech Grants Application Guide & Proposal Templates
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Download our comprehensive NASA SBIR/STTR space tech grants toolkit covering Phase I ($150,000) and 
                  Phase II ($850,000) application strategies, technical proposal templates for satellites, remote sensing, 
                  advanced propulsion, aeronautics, and lunar systems, NASA mission alignment frameworks, space qualification 
                  planning, commercial space market strategies, eligibility requirements, submission timelines, and success 
                  strategies for space tech startups pursuing non-dilutive federal aerospace innovation funding supporting 
                  Artemis lunar program, Mars exploration, Earth science satellites, International Space Station, and aeronautics 
                  research advancing American leadership in space exploration and commercial space industry.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                
                {/* What's Included Section */}
                <Card className="border-indigo-200 bg-white">
                  <CardHeader>
                    <CardTitle className="text-indigo-700 text-2xl">
                      📦 What's Included in Your Free NASA SBIR Toolkit:
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-indigo-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Phase I & Phase II Space Tech Proposal Templates</strong>
                          <p className="text-sm text-gray-600">Complete technical proposal template, NASA mission relevance section, commercialization plan, budget justification for $150K Phase I and $850K Phase II</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-indigo-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">NASA Mission Alignment Strategy Guide</strong>
                          <p className="text-sm text-gray-600">Detailed framework for aligning innovation with Artemis lunar program, Mars exploration, Earth science, ISS operations with winning strategies</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-indigo-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Space Qualification Framework</strong>
                          <p className="text-sm text-gray-600">Step-by-step framework for validating technology in space environment: vacuum, thermal, radiation, microgravity with testing protocols</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-indigo-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">NASA Topic Analysis Templates</strong>
                          <p className="text-sm text-gray-600">Framework for analyzing NASA SBIR topic descriptions identifying key requirements, mission needs, evaluation criteria for competitive proposals</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-indigo-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">NASA Center Partnership Strategy</strong>
                          <p className="text-sm text-gray-600">Templates for engaging NASA centers (JPL, JSC, Glenn, Langley, Goddard) for technical support, facility access, mission integration opportunities</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-indigo-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Commercial Space Market Framework</strong>
                          <p className="text-sm text-gray-600">Framework for developing dual-use applications beyond NASA enabling business sustainability with commercial space customers and revenue</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-indigo-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Space Tech Sector-Specific Guidance</strong>
                          <p className="text-sm text-gray-600">Specialized strategies for satellites, remote sensing, propulsion, lunar systems, aeronautics with sector examples and NASA partnerships</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-indigo-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Budget Development for Space Projects</strong>
                          <p className="text-sm text-gray-600">Line-by-line budget templates for Phase I $150K and Phase II $850K with allowable costs for aerospace R&D, space testing, manufacturing</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Shield className="w-5 h-5 text-indigo-600 mr-2" />
                        <strong className="text-indigo-800">Bonus Resources Included:</strong>
                      </div>
                      <ul className="text-sm text-indigo-700 space-y-1">
                        <li>• SBIR Ignite program guide for rapid Phase I awards and commercialization focus</li>
                        <li>• I-Corps customer discovery framework for commercial space market validation</li>
                        <li>• Technology Readiness Level (TRL) assessment and advancement strategies</li>
                        <li>• Phase I to Phase II transition optimization with NASA mission integration planning</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Lead Capture Form */}
                <div>
                  <Card className="border-gray-200 bg-white sticky top-4">
                    <CardHeader className="bg-gradient-to-r from-indigo-700 to-purple-900 text-white rounded-t-lg">
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
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="your.email@spacetech.com"
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
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Your Space Tech Startup"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            State/Location
                          </label>
                          <select 
                            value={formData.state}
                            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          >
                            <option value="">Select your state</option>
                            <option value="california">California (Silicon Valley, LA, San Diego)</option>
                            <option value="texas">Texas (Houston, Austin, Dallas)</option>
                            <option value="florida">Florida (Space Coast, Cape Canaveral)</option>
                            <option value="massachusetts">Massachusetts (Boston, Cambridge)</option>
                            <option value="colorado">Colorado (Denver, Boulder)</option>
                            <option value="washington">Washington (Seattle)</option>
                            <option value="alabama">Alabama (Huntsville)</option>
                            <option value="new-york">New York (NYC)</option>
                            <option value="other">Other State</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Space Tech Sector
                          </label>
                          <select 
                            value={formData.sector}
                            onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          >
                            <option value="">Select primary sector</option>
                            <option value="satellites">Satellite Systems & CubeSats</option>
                            <option value="remote-sensing">Remote Sensing & Earth Observation</option>
                            <option value="propulsion">Advanced Propulsion Systems</option>
                            <option value="lunar">Lunar Surface Technology</option>
                            <option value="mars">Mars Exploration Systems</option>
                            <option value="aeronautics">Aeronautics & Aviation</option>
                            <option value="communications">Space Communications</option>
                            <option value="materials">Advanced Materials Composites</option>
                            <option value="other">Other Space Technology</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            NASA SBIR Application Stage
                          </label>
                          <select 
                            value={formData.stage}
                            onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          >
                            <option value="">Select your stage</option>
                            <option value="researching">Researching NASA SBIR Program</option>
                            <option value="preparing">Preparing Phase I Application</option>
                            <option value="phase-i-awarded">Phase I Awarded - Planning Phase II</option>
                            <option value="ignite">Considering SBIR Ignite</option>
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
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          >
                            <option value="">Select primary interest</option>
                            <option value="phase-i">NASA SBIR Phase I ($150K)</option>
                            <option value="phase-ii">NASA SBIR Phase II ($850K)</option>
                            <option value="ignite">SBIR Ignite Program</option>
                            <option value="sttr">NASA STTR (University Partnership)</option>
                            <option value="all">All NASA SBIR/STTR Programs</option>
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
                            I agree to receive the NASA SBIR space tech grants guide and occasional federal aerospace funding 
                            opportunities. You can unsubscribe anytime. We respect your privacy.
                          </label>
                        </div>

                        <Button 
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-indigo-700 to-purple-900 hover:from-indigo-800 hover:to-purple-950 text-white font-semibold py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <Download className="w-5 h-5 mr-2" />
                              Get Instant Access to NASA SBIR Guide
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
                      <div className="text-2xl font-bold text-indigo-600">$150K</div>
                      <div className="text-xs text-gray-600">Phase I Max</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">$850K</div>
                      <div className="text-xs text-gray-600">Phase II Max</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">300+</div>
                      <div className="text-xs text-gray-600">Annual Awards</div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Additional Benefits */}
              <div className="mt-12 bg-white rounded-lg shadow-sm p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Why Space Tech Startups Choose Our NASA SBIR Guide
                </h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Rocket className="w-8 h-8 text-indigo-600" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Complete NASA Mission Coverage</h4>
                    <p className="text-sm text-gray-600">
                      From Artemis to Mars with strategies for all NASA programs and space exploration priorities
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-8 h-8 text-purple-600" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Space Qualification Expertise</h4>
                    <p className="text-sm text-gray-600">
                      Understand vacuum thermal radiation testing with space environment validation frameworks
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target className="w-8 h-8 text-blue-600" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Dual-Use Strategy Framework</h4>
                    <p className="text-sm text-gray-600">
                      Learn how to develop commercial space markets beyond NASA for business sustainability
                    </p>
                  </div>
                </div>
              </div>

              {/* Related Resources */}
              <div className="mt-12 text-center">
                <p className="text-gray-600 mb-4">Want to learn more about NASA SBIR grants before downloading?</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" asChild>
                    <Link href="/blog/nasa-sbir-space-tech-grants">
                      Read Complete NASA SBIR Guide
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
