"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Download, Shield, Users, MapPin, DollarSign, Target, Loader2 } from "lucide-react"
import Link from "next/link"

export default function DODSBIRDefenseTechDownloadPage() {
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
          guideName: "DOD SBIR Defense Tech Guide",
          industry: formData.sector || "Defense Technology",
          country: "USA",
          additionalNotes: `State: ${formData.state || "N/A"}, Stage: ${formData.stage || "N/A"}, Funding Interest: ${formData.funding || "N/A"}`,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        router.push("/download/dod-sbir-defense-tech-guide/thank-you")
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              
              {/* Header Section */}
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-slate-100 text-slate-800 border-slate-200">
                  🛡️ Free DOD SBIR/STTR Defense Tech Grants Toolkit
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Get Your Free DOD SBIR Defense Tech Grants Application Guide & Proposal Templates
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Download our comprehensive DOD SBIR/STTR defense tech grants toolkit covering Phase I ($256,000) and 
                  Phase II ($1,700,000) application strategies, technical proposal templates for cybersecurity, aerospace, 
                  UAV, advanced materials, and sensors, military transition frameworks, Program of Record (POR) identification, 
                  DOD component-specific strategies, eligibility requirements, submission timelines, and success strategies for 
                  defense tech startups pursuing non-dilutive federal military innovation funding across Army, Navy, Air Force, 
                  Space Force, DARPA, MDA, SOCOM, and Defense Agencies supporting warfighter capabilities and national security 
                  through breakthrough defense technologies.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                
                {/* What's Included Section */}
                <Card className="border-slate-200 bg-white">
                  <CardHeader>
                    <CardTitle className="text-slate-700 text-2xl">
                      📦 What's Included in Your Free DOD SBIR Toolkit:
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-slate-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Phase I & Phase II Defense Tech Proposal Templates</strong>
                          <p className="text-sm text-gray-600">Complete technical proposal template, military relevance section, transition plan, budget justification for $256K Phase I and $1.7M Phase II</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-slate-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">DOD Component-Specific Strategy Guide</strong>
                          <p className="text-sm text-gray-600">Detailed analysis of Army, Navy, Air Force, Space Force, DARPA, MDA, SOCOM topics with winning proposal strategies for each component</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-slate-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Military Transition Pathway Framework</strong>
                          <p className="text-sm text-gray-600">Step-by-step framework for identifying Program of Record (POR), engaging Program Managers, developing transition strategy with acquisition pathway planning</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-slate-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Dual-Use Commercialization Strategy</strong>
                          <p className="text-sm text-gray-600">Framework for developing commercial applications beyond military market enabling business sustainability with dual-use technology examples</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-slate-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Program Manager Engagement Templates</strong>
                          <p className="text-sm text-gray-600">Templates for obtaining letters of support from military Program Managers demonstrating transition pathway and acquisition interest</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-slate-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Military Testing Validation Strategy</strong>
                          <p className="text-sm text-gray-600">Framework for conducting military-relevant testing proving technology performance in operational environments with defense facility access guidance</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-slate-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Defense Tech Sector-Specific Guidance</strong>
                          <p className="text-sm text-gray-600">Specialized strategies for cybersecurity, aerospace, UAV, advanced materials, sensors with sector examples and defense contractor partnerships</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-slate-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Budget Development for Defense Projects</strong>
                          <p className="text-sm text-gray-600">Line-by-line budget templates for Phase I $256K and Phase II $1.7M with allowable costs for defense R&D, military testing, manufacturing scale-up</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Shield className="w-5 h-5 text-slate-600 mr-2" />
                        <strong className="text-slate-800">Bonus Resources Included:</strong>
                      </div>
                      <ul className="text-sm text-slate-700 space-y-1">
                        <li>• Defense SBIR Innovation Portal (DSIP) submission guide and navigation</li>
                        <li>• Topic description analysis framework identifying key requirements</li>
                        <li>• Manufacturing readiness level (MRL) assessment and scale-up planning</li>
                        <li>• Phase I to Phase II transition optimization with military customer engagement</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Lead Capture Form */}
                <div>
                  <Card className="border-gray-200 bg-white sticky top-4">
                    <CardHeader className="bg-gradient-to-r from-slate-700 to-blue-900 text-white rounded-t-lg">
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
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
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
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                            placeholder="your.email@defensetech.com"
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
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                            placeholder="Your Defense Tech Startup"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            State/Location
                          </label>
                          <select 
                            value={formData.state}
                            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                          >
                            <option value="">Select your state</option>
                            <option value="virginia">Virginia (DC Metro, Arlington, Norfolk)</option>
                            <option value="california">California (San Diego, LA, Silicon Valley)</option>
                            <option value="massachusetts">Massachusetts (Boston, Cambridge)</option>
                            <option value="texas">Texas (Austin, Dallas, Houston)</option>
                            <option value="colorado">Colorado (Colorado Springs)</option>
                            <option value="alabama">Alabama (Huntsville)</option>
                            <option value="ohio">Ohio (Dayton)</option>
                            <option value="florida">Florida (Tampa, Orlando)</option>
                            <option value="other">Other State</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Defense Tech Sector
                          </label>
                          <select 
                            value={formData.sector}
                            onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                          >
                            <option value="">Select primary sector</option>
                            <option value="cybersecurity">Cybersecurity & Encryption</option>
                            <option value="aerospace">Aerospace & UAV Technology</option>
                            <option value="advanced-materials">Advanced Materials & Composites</option>
                            <option value="sensors">Sensors & ISR Systems</option>
                            <option value="ai-ml">AI & Machine Learning Military</option>
                            <option value="autonomous">Autonomous Systems & Robotics</option>
                            <option value="communications">Communications & C4ISR</option>
                            <option value="electronics">Electronics & Electronic Warfare</option>
                            <option value="other">Other Defense Technology</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            DOD SBIR Application Stage
                          </label>
                          <select 
                            value={formData.stage}
                            onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                          >
                            <option value="">Select your stage</option>
                            <option value="researching">Researching DOD SBIR Program</option>
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
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                          >
                            <option value="">Select primary interest</option>
                            <option value="phase-i">DOD SBIR Phase I ($256K)</option>
                            <option value="phase-ii">DOD SBIR Phase II ($1.7M)</option>
                            <option value="army">Army SBIR Topics</option>
                            <option value="navy">Navy SBIR Topics</option>
                            <option value="air-force">Air Force SBIR Topics</option>
                            <option value="space-force">Space Force SBIR Topics</option>
                            <option value="darpa">DARPA Advanced Research</option>
                            <option value="all">All DOD SBIR/STTR Programs</option>
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
                            I agree to receive the DOD SBIR defense tech grants guide and occasional federal defense funding 
                            opportunities. You can unsubscribe anytime. We respect your privacy.
                          </label>
                        </div>

                        <Button 
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-slate-700 to-blue-900 hover:from-slate-800 hover:to-blue-950 text-white font-semibold py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <Download className="w-5 h-5 mr-2" />
                              Get Instant Access to DOD SBIR Guide
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
                      <div className="text-2xl font-bold text-slate-600">$256K</div>
                      <div className="text-xs text-gray-600">Phase I Max</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">$1.7M</div>
                      <div className="text-xs text-gray-600">Phase II Max</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-indigo-600">1,000+</div>
                      <div className="text-xs text-gray-600">Annual Awards</div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Additional Benefits */}
              <div className="mt-12 bg-white rounded-lg shadow-sm p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Why Defense Tech Startups Choose Our DOD SBIR Guide
                </h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-8 h-8 text-slate-600" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Complete DOD Component Coverage</h4>
                    <p className="text-sm text-gray-600">
                      From Army to Space Force with strategies for all military services and defense agencies
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-8 h-8 text-blue-600" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Military Transition Expertise</h4>
                    <p className="text-sm text-gray-600">
                      Understand Program of Record identification and acquisition pathway with transition planning
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target className="w-8 h-8 text-indigo-600" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Dual-Use Strategy Framework</h4>
                    <p className="text-sm text-gray-600">
                      Learn how to develop commercial applications beyond military for business sustainability
                    </p>
                  </div>
                </div>
              </div>

              {/* Related Resources */}
              <div className="mt-12 text-center">
                <p className="text-gray-600 mb-4">Want to learn more about DOD SBIR grants before downloading?</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" asChild>
                    <Link href="/blog/dod-sbir-defense-tech-grants">
                      Read Complete DOD SBIR Guide
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
