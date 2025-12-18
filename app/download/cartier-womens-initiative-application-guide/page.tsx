"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Download, Shield, FileText, Target, Users, Calendar, Globe, Loader2 } from "lucide-react"
import Link from "next/link"

export default function CartierInitiativeDownloadPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    sdg: "",
    years: "",
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
          guideName: "Cartier Women's Initiative Application Guide",
          industry: "Impact Entrepreneurship",
          country: "Global",
          additionalNotes: `Primary SDG: ${formData.sdg || "N/A"}, Operating Years: ${formData.years || "N/A"}`,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        router.push("/download/cartier-womens-initiative-application-guide/thank-you")
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
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              
              {/* Header Section */}
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-purple-100 text-purple-800 border-purple-200">
                  🌍 Free Cartier Impact Entrepreneur Toolkit
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Get Your Free Cartier Women's Initiative Application Guide
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Download our comprehensive Cartier Women's Initiative application toolkit with UN Sustainable 
                  Development Goals alignment framework, impact demonstration templates, and proven strategies 
                  to win up to $100,000 in grant funding plus 12-month INSEAD fellowship for your impact-driven business.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                
                {/* What's Included Section */}
                <Card className="border-purple-200 bg-white">
                  <CardHeader>
                    <CardTitle className="text-purple-700 text-2xl">
                      📦 What's Included in Your Free Cartier Toolkit:
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">UN SDG Alignment Framework</strong>
                          <p className="text-sm text-gray-600">Complete guide to all 17 Sustainable Development Goals with business alignment worksheet</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Impact Demonstration Templates</strong>
                          <p className="text-sm text-gray-600">Frameworks to articulate social/environmental impact with measurable metrics</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Regional vs Science & Tech Award Guide</strong>
                          <p className="text-sm text-gray-600">Decision tool to choose between North America Regional or Deep Tech Pioneer awards</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Business Model Validation Checklist</strong>
                          <p className="text-sm text-gray-600">Verify product/market fit, revenue generation, and 1-6 year operating history</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Scale Potential Articulation Worksheet</strong>
                          <p className="text-sm text-gray-600">Framework to demonstrate realistic path to scaling impact and operations</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Fellowship Commitment Calculator</strong>
                          <p className="text-sm text-gray-600">12-month time commitment breakdown and in-person event preparation guide</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">B2 English Proficiency Self-Assessment</strong>
                          <p className="text-sm text-gray-600">Common European Framework evaluation tool and preparation resources</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Application Timeline Planner</strong>
                          <p className="text-sm text-gray-600">June 24, 2025 deadline countdown with document preparation schedule</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Shield className="w-5 h-5 text-purple-600 mr-2" />
                        <strong className="text-purple-800">Bonus Resources Included:</strong>
                      </div>
                      <ul className="text-sm text-purple-700 space-y-1">
                        <li>• INSEAD fellowship program overview</li>
                        <li>• Global fellows network benefits guide</li>
                        <li>• Prior applicant reapplication strategy</li>
                        <li>• For-profit structure requirement guide</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Lead Capture Form */}
                <div>
                  <Card className="border-indigo-200 bg-white sticky top-4">
                    <CardHeader className="bg-gradient-to-r from-purple-800 to-indigo-900 text-white rounded-t-lg">
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
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            placeholder="Jane Smith"
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
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            placeholder="jane@yourbusiness.com"
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
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            placeholder="Your Impact Business Name"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Primary UN SDG Focus
                          </label>
                          <select 
                            value={formData.sdg}
                            onChange={(e) => setFormData({ ...formData, sdg: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          >
                            <option value="">Select primary SDG</option>
                            <option value="no-poverty">1. No Poverty</option>
                            <option value="zero-hunger">2. Zero Hunger</option>
                            <option value="health">3. Good Health & Well-Being</option>
                            <option value="education">4. Quality Education</option>
                            <option value="gender">5. Gender Equality</option>
                            <option value="water">6. Clean Water & Sanitation</option>
                            <option value="energy">7. Affordable & Clean Energy</option>
                            <option value="work">8. Decent Work & Economic Growth</option>
                            <option value="innovation">9. Industry, Innovation & Infrastructure</option>
                            <option value="inequality">10. Reduced Inequalities</option>
                            <option value="cities">11. Sustainable Cities & Communities</option>
                            <option value="consumption">12. Responsible Consumption</option>
                            <option value="climate">13. Climate Action</option>
                            <option value="water-life">14. Life Below Water</option>
                            <option value="land-life">15. Life on Land</option>
                            <option value="peace">16. Peace, Justice & Strong Institutions</option>
                            <option value="partnerships">17. Partnerships for the Goals</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Business Operating Years
                          </label>
                          <select 
                            value={formData.years}
                            onChange={(e) => setFormData({ ...formData, years: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          >
                            <option value="">Select operating years</option>
                            <option value="under-1">Under 1 year (not yet eligible)</option>
                            <option value="1-2">1-2 years</option>
                            <option value="2-4">2-4 years</option>
                            <option value="4-6">4-6 years</option>
                            <option value="6+">6+ years (not eligible)</option>
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
                            I agree to receive the Cartier Women's Initiative application guide and occasional 
                            impact entrepreneur opportunities. You can unsubscribe anytime. We respect your privacy.
                          </label>
                        </div>

                        <Button 
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-purple-800 to-indigo-900 hover:from-purple-900 hover:to-indigo-950 text-white font-semibold py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <Download className="w-5 h-5 mr-2" />
                              Get Instant Access to Cartier Guide
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
                      <div className="text-2xl font-bold text-purple-600">$100K</div>
                      <div className="text-xs text-gray-600">1st Place</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-indigo-600">12 Mo</div>
                      <div className="text-xs text-gray-600">Fellowship</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">Global</div>
                      <div className="text-xs text-gray-600">Network</div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Additional Benefits */}
              <div className="mt-12 bg-white rounded-lg shadow-sm p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Why Impact Entrepreneurs Choose Our Cartier Application Guide
                </h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Globe className="w-8 h-8 text-purple-600" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">UN SDG Alignment Clarity</h4>
                    <p className="text-sm text-gray-600">
                      Framework to clearly connect your business to specific Sustainable Development Goals
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target className="w-8 h-8 text-indigo-600" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Impact Measurement Tools</h4>
                    <p className="text-sm text-gray-600">
                      Templates to articulate and quantify social/environmental impact with metrics
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Expert Application Support</h4>
                    <p className="text-sm text-gray-600">
                      Access to impact entrepreneurship specialists who understand Cartier criteria
                    </p>
                  </div>
                </div>
              </div>

              {/* Related Resources */}
              <div className="mt-12 text-center">
                <p className="text-gray-600 mb-4">Want to learn more about Cartier Women's Initiative before downloading?</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" asChild>
                    <Link href="/blog/cartier-womens-initiative-canada">
                      Read Complete Cartier Initiative Guide
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/canada/women-business-grants">
                      Explore More Women Business Grants
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
