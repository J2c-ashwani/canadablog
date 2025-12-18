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

export default function ColoradoTechGuideDownloadPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    location: "",
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
          name: formData.name,
          company: formData.company,
          guideName: "Colorado Tech Grants Guide",
          industry: formData.sector || "Technology",
          country: "USA",
          additionalNotes: `Location: ${formData.location || "N/A"}, Stage: ${formData.stage || "N/A"}, Funding Interest: ${formData.funding || "N/A"}`,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        router.push("/download/colorado-tech-guide/thank-you")
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              
              {/* Header Section */}
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-blue-100 text-blue-800 border-blue-200">
                  🏔️ Free Colorado Technology Startup Grants Complete Toolkit
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Get Your Free Colorado Tech Startup Grants Application Guide & Complete Funding Templates
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Download our comprehensive Colorado technology startup grants toolkit covering Advanced Industries 
                  Accelerator Program Early-Stage Capital and Retention Grants up to $250,000 supporting Colorado-based 
                  advanced industries technology businesses commercialization, Proof of Concept Grants up to $150,000 
                  helping Colorado research institutions University of Colorado Colorado State University Colorado School 
                  of Mines speed applied research commercialize partnership private sector, Advanced Industry Investment 
                  Tax Credit offering investors 25% state income tax credit or 35% rural Enterprise Zones up to $100,000 
                  credits encouraging early-stage capital formation, SBIR State Matching Program enhancing federal Phase I 
                  Phase II awards, Colorado Clean Energy Fund supporting renewable technology innovations. Complete application 
                  strategies, proposal templates for Denver RiNo Arts District tech corridor, Boulder CU University Colorado 
                  ecosystem, Colorado Springs military defense proximity, Fort Collins Colorado State University, regional 
                  Colorado innovation hubs, eligibility requirements seven advanced industries aerospace advanced manufacturing 
                  bioscience electronics energy infrastructure technology information, submission timelines, success strategies 
                  for technology startups pursuing non-dilutive Colorado State funding complementing federal SBIR/STTR grants, 
                  venture capital investment supporting Colorado innovation ecosystem leadership outdoor lifestyle quality of life.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                
                {/* What's Included Section */}
                <Card className="border-blue-200 bg-white">
                  <CardHeader>
                    <CardTitle className="text-blue-700 text-2xl">
                      📦 What's Included in Your Free Colorado Tech Grants Toolkit:
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Advanced Industries Early-Stage Capital Grant Templates</strong>
                          <p className="text-sm text-gray-600">Complete $250,000 maximum Early-Stage Capital grant application templates with seven advanced industries alignment strategies</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Proof of Concept Grant Application Guide</strong>
                          <p className="text-sm text-gray-600">Step-by-step guide to $150,000 Proof of Concept grants with 3:1 match requirements research institution partnership strategies</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Investment Tax Credit 35% Rural Enterprise Zone Frameworks</strong>
                          <p className="text-sm text-gray-600">Comprehensive framework for Investment Tax Credit 25% base or 35% rural Enterprise Zones up to $100,000 credits investor documentation</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Seven Advanced Industries Alignment Templates</strong>
                          <p className="text-sm text-gray-600">Templates for demonstrating alignment aerospace, advanced manufacturing, bioscience, electronics, energy, infrastructure, technology information</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Colorado Operations Job Creation Commitment Framework</strong>
                          <p className="text-sm text-gray-600">Framework for proving technologies created manufactured Colorado with operations job creation supporting state economic development requirements</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">SBIR State Matching Program Application Resources</strong>
                          <p className="text-sm text-gray-600">Complete guide to SBIR State Matching enhancing federal Phase I Phase II awards providing additional Colorado funding extending runway</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Colorado Clean Energy Fund Strategies</strong>
                          <p className="text-sm text-gray-600">Specialized strategies for Clean Energy Fund applications supporting renewable technology solar wind energy storage zero-emission vehicles</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Regional Colorado Innovation Hub Navigation</strong>
                          <p className="text-sm text-gray-600">Specialized strategies for Denver Boulder Colorado Springs Fort Collins regional hubs with university ecosystem connections sector examples</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Shield className="w-5 h-5 text-blue-600 mr-2" />
                        <strong className="text-blue-800">Bonus Colorado Resources Included:</strong>
                      </div>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• University of Colorado CU Boulder research commercialization technology transfer office partnership development</li>
                        <li>• Colorado State University Fort Collins CSU agricultural technology engineering research ecosystem connections</li>
                        <li>• Colorado School of Mines Golden energy natural resources expertise partnerships supporting startups</li>
                        <li>• Denver Boulder venture capital ecosystem investor introduction strategies $2B+ annual investment supporting startups</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Lead Capture Form */}
                <div>
                  <Card className="border-gray-200 bg-white sticky top-4">
                    <CardHeader className="bg-gradient-to-r from-blue-700 to-purple-900 text-white rounded-t-lg">
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
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="your.email@startup.com"
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
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Your Colorado Tech Startup"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Colorado Location
                          </label>
                          <select 
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="">Select your Colorado region</option>
                            <option value="denver">Denver (RiNo, DTC, Downtown)</option>
                            <option value="boulder">Boulder</option>
                            <option value="colorado-springs">Colorado Springs</option>
                            <option value="fort-collins">Fort Collins</option>
                            <option value="aurora">Aurora</option>
                            <option value="lakewood">Lakewood</option>
                            <option value="longmont">Longmont</option>
                            <option value="golden">Golden</option>
                            <option value="pueblo">Pueblo</option>
                            <option value="grand-junction">Grand Junction</option>
                            <option value="other-co">Other Colorado Region</option>
                            <option value="planning-co">Planning to relocate to Colorado</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Advanced Industry Sector
                          </label>
                          <select 
                            value={formData.sector}
                            onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="">Select primary advanced industry</option>
                            <option value="aerospace">Aerospace</option>
                            <option value="advanced-manufacturing">Advanced Manufacturing</option>
                            <option value="bioscience">Bioscience & Life Sciences</option>
                            <option value="electronics">Electronics</option>
                            <option value="energy">Energy & Natural Resources</option>
                            <option value="infrastructure">Infrastructure Engineering</option>
                            <option value="technology">Technology & Information</option>
                            <option value="other">Other Technology Sector</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Grant Application Stage
                          </label>
                          <select 
                            value={formData.stage}
                            onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="">Select your stage</option>
                            <option value="researching">Researching Colorado Grant Programs</option>
                            <option value="early-stage">Preparing Early-Stage Capital Application</option>
                            <option value="proof-concept">Exploring Proof of Concept Grant</option>
                            <option value="tax-credit">Pursuing Investment Tax Credit</option>
                            <option value="multiple">Applying to Multiple Programs</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Funding Interest
                          </label>
                          <select 
                            value={formData.funding}
                            onChange={(e) => setFormData({ ...formData, funding: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="">Select primary interest</option>
                            <option value="early-stage">Early-Stage Capital Grant ($250K)</option>
                            <option value="proof-concept">Proof of Concept Grant ($150K)</option>
                            <option value="tax-credit">Investment Tax Credit (25-35%)</option>
                            <option value="sbir-match">SBIR State Matching</option>
                            <option value="all">All Colorado Programs</option>
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
                            I agree to receive the Colorado tech grants guide and occasional Colorado State funding opportunities 
                            and innovation programs. You can unsubscribe anytime. We respect your privacy.
                          </label>
                        </div>

                        <Button 
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-blue-700 to-purple-900 hover:from-blue-800 hover:to-purple-950 text-white font-semibold py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <Download className="w-5 h-5 mr-2" />
                              Get Instant Access to Colorado Tech Guide
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
                      <div className="text-2xl font-bold text-blue-600">$250K</div>
                      <div className="text-xs text-gray-600">Early-Stage Max</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">35%</div>
                      <div className="text-xs text-gray-600">Tax Credit Rural</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-indigo-600">$2.9B</div>
                      <div className="text-xs text-gray-600">Portfolio Capital</div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Additional Benefits */}
              <div className="mt-12 bg-white rounded-lg shadow-sm p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Why Colorado Technology Startups Choose Our Grant Guide
                </h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="w-8 h-8 text-blue-600" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Complete Colorado Coverage</h4>
                    <p className="text-sm text-gray-600">
                      From Denver tech corridor to rural Enterprise Zones with strategies for all seven advanced industries
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-8 h-8 text-purple-600" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">University Ecosystem Expertise</h4>
                    <p className="text-sm text-gray-600">
                      Understand CU Boulder CSU Colorado School of Mines partnerships for commercialization success
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target className="w-8 h-8 text-indigo-600" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Multi-Program Strategy</h4>
                    <p className="text-sm text-gray-600">
                      Learn how to stack Early-Stage, Proof of Concept, Tax Credits maximizing total Colorado funding
                    </p>
                  </div>
                </div>
              </div>

              {/* Related Resources */}
              <div className="mt-12 text-center">
                <p className="text-gray-600 mb-4">Want to learn more about Colorado tech grants before downloading?</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" asChild>
                    <Link href="/blog/colorado-tech-programs">
                      Read Complete Colorado Tech Guide
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
