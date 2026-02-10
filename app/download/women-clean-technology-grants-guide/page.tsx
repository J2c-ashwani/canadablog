"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Download, Shield, Sparkles, Users, MapPin, DollarSign, Target, Loader2 } from "lucide-react"
import Link from "next/link"

export default function WomenCleanTechnologyGrantsDownloadPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    province: "",
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
          guideName: "Women Clean Technology Grants Guide",
          industry: formData.sector || "Clean Technology",
          country: "Canada",
          additionalNotes: `Province: ${formData.province || "N/A"}, Stage: ${formData.stage || "N/A"}, Funding Interest: ${formData.funding || "N/A"}`,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        router.push("/download/women-clean-technology-grants-guide/thank-you")
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
                  🌱 Free Women Clean Technology Grants Toolkit
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Get Your Free Women Clean Technology Grants & Environmental Innovation Funding Guide
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Download our comprehensive women clean technology grants toolkit covering Sustainable Development 
                  Technology Canada (SDTC) funding up to $10M, Natural Resources Canada (NRCan) clean energy innovation 
                  programs, provincial sustainability grants, environmental impact assessment frameworks, technology 
                  commercialization strategies for renewable energy, circular economy, water technology, sustainable 
                  transportation, and climate solutions across Canada supporting women cleantech entrepreneurs.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                
                {/* What's Included Section */}
                <Card className="border-green-200 bg-white">
                  <CardHeader>
                    <CardTitle className="text-green-700 text-2xl">
                      📦 What's Included in Your Free Cleantech Funding Toolkit:
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">SDTC Application Guide & Commercialization Templates</strong>
                          <p className="text-sm text-gray-600">Complete framework for accessing up to $10M SDTC funding with detailed application templates, technology readiness assessment, and commercialization roadmap</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Environmental Impact Assessment Framework</strong>
                          <p className="text-sm text-gray-600">Quantification methodologies for emissions reduction, energy savings, waste diversion, water conservation with life cycle analysis templates</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">NRCan Clean Energy Programs Directory</strong>
                          <p className="text-sm text-gray-600">Complete guide to Natural Resources Canada renewable energy innovation, clean fuels, energy efficiency, smart grid funding programs</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Technology Readiness Level (TRL) Assessment Tools</strong>
                          <p className="text-sm text-gray-600">Self-assessment framework for determining technology development stage and matching to appropriate funding programs</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Provincial Clean Tech Program Directory</strong>
                          <p className="text-sm text-gray-600">Ontario Green Fund, Quebec Éco-Performance, BC CleanBC, Alberta Innovates cleantech funding programs comparison</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Clean Tech Sector-Specific Funding Guides</strong>
                          <p className="text-sm text-gray-600">Specialized resources for renewable energy, energy storage, circular economy, water tech, sustainable transportation, green building sectors</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Net-Zero & Climate Solutions Funding Navigator</strong>
                          <p className="text-sm text-gray-600">Programs supporting carbon capture, emissions reduction, climate adaptation technology for women cleantech entrepreneurs</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Clean Tech Commercialization Strategy Templates</strong>
                          <p className="text-sm text-gray-600">Market validation frameworks, pilot project planning, scale-up strategies, partnership development guides for environmental technology</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Shield className="w-5 h-5 text-green-600 mr-2" />
                        <strong className="text-green-800">Bonus Resources Included:</strong>
                      </div>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Intellectual property strategy guide for cleantech</li>
                        <li>• Clean tech accelerator and incubator directory</li>
                        <li>• Environmental regulations and compliance checklist</li>
                        <li>• Multiple funding source stacking strategies for cleantech</li>
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
                            placeholder="Your Clean Tech Company"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Province/Region
                          </label>
                          <select 
                            value={formData.province}
                            onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          >
                            <option value="">Select your province</option>
                            <option value="ontario">Ontario (Toronto, Waterloo, Ottawa, Hamilton)</option>
                            <option value="quebec">Quebec (Montreal, Quebec City, Laval)</option>
                            <option value="bc">British Columbia (Vancouver, Victoria, Kelowna)</option>
                            <option value="alberta">Alberta (Calgary, Edmonton, Red Deer)</option>
                            <option value="manitoba">Manitoba</option>
                            <option value="saskatchewan">Saskatchewan</option>
                            <option value="atlantic">Atlantic Canada</option>
                            <option value="other">Other Province/Territory</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Clean Technology Sector
                          </label>
                          <select 
                            value={formData.sector}
                            onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          >
                            <option value="">Select primary sector</option>
                            <option value="renewable-energy">Renewable Energy (Solar, Wind, Hydro)</option>
                            <option value="energy-storage">Energy Storage & Grid Technology</option>
                            <option value="circular-economy">Circular Economy & Waste Reduction</option>
                            <option value="water-tech">Water Technology & Conservation</option>
                            <option value="sustainable-transport">Sustainable Transportation & EVs</option>
                            <option value="green-building">Green Building & Energy Efficiency</option>
                            <option value="carbon-capture">Carbon Capture & Climate Solutions</option>
                            <option value="clean-manufacturing">Clean Manufacturing & Industrial</option>
                            <option value="other">Other Clean Tech Sector</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Technology Development Stage
                          </label>
                          <select 
                            value={formData.stage}
                            onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          >
                            <option value="">Select development stage</option>
                            <option value="concept">Concept/Early R&D (TRL 1-3)</option>
                            <option value="development">Technology Development (TRL 4-6)</option>
                            <option value="demonstration">Demonstration/Pilot (TRL 7-8)</option>
                            <option value="commercialization">Commercialization Ready (TRL 9)</option>
                            <option value="market">In Market - Scaling Up</option>
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
                            <option value="sdtc">SDTC Commercialization Funding ($10M)</option>
                            <option value="nrcan">NRCan Clean Energy Innovation</option>
                            <option value="provincial">Provincial Clean Tech Programs</option>
                            <option value="net-zero">Net-Zero Accelerator</option>
                            <option value="irap">NRC IRAP Clean Tech R&D</option>
                            <option value="all">All Clean Technology Funding</option>
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
                            I agree to receive the women clean technology grants guide and occasional clean tech funding 
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
                              Get Instant Access to Cleantech Funding Guide
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
                      <div className="text-2xl font-bold text-green-600">$10M</div>
                      <div className="text-xs text-gray-600">SDTC Max</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-teal-600">Clean</div>
                      <div className="text-xs text-gray-600">Energy Focus</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">Net-Zero</div>
                      <div className="text-xs text-gray-600">Solutions</div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Additional Benefits */}
              <div className="mt-12 bg-white rounded-lg shadow-sm p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Why Women Clean Tech Entrepreneurs Choose Our Grants Guide
                </h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Complete SDTC Funding Coverage</h4>
                    <p className="text-sm text-gray-600">
                      From early-stage development to commercialization with SDTC, NRCan, and provincial programs all in one guide
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-8 h-8 text-teal-600" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Regional Cleantech Navigator</h4>
                    <p className="text-sm text-gray-600">
                      Province-specific clean technology programs with accelerators, incubators, testing facilities for women
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target className="w-8 h-8 text-blue-600" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Environmental Impact Framework</h4>
                    <p className="text-sm text-gray-600">
                      Proven methodologies for quantifying emissions reduction, resource efficiency, climate benefits
                    </p>
                  </div>
                </div>
              </div>

              {/* Related Resources */}
              <div className="mt-12 text-center">
                <p className="text-gray-600 mb-4">Want to learn more about women clean technology grants before downloading?</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" asChild>
                    <Link href="/blog/women-clean-technology-grants-canada">
                      Read Complete Clean Tech Grants Guide
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/canada/women-business-grants">
                      Explore All Women Business Grants
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
