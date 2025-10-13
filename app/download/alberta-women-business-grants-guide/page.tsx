"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Download, Shield, FileText, Target, Users, Calendar, Zap, Loader2 } from "lucide-react"
import Link from "next/link"

export default function AlbertaWomenGrantsDownloadPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    region: "",
    interest: "",
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
          guideName: "Alberta Women Business Grants Guide",
          industry: "Women-Owned Business",
          country: "Canada",
          state: formData.region,
          additionalNotes: `Interest: ${formData.interest || "N/A"}`,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        router.push("/download/alberta-women-business-grants-guide/thank-you")
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
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              
              {/* Header Section */}
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-red-100 text-red-800 border-red-200">
                  🏔️ Free Alberta Women Business Toolkit
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Get Your Free Alberta Women Business Grants Guide
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Download our comprehensive Alberta women business grants toolkit covering $580M in provincial 
                  support including Alberta Women Entrepreneurs (AWE) loans up to $150,000, Women Building Futures 
                  skilled trades programs, energy sector women initiatives, and complete resources for Alberta's 
                  robust women entrepreneur ecosystem.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                
                {/* What's Included Section */}
                <Card className="border-red-200 bg-white">
                  <CardHeader>
                    <CardTitle className="text-red-700 text-2xl">
                      📦 What's Included in Your Free Alberta Toolkit:
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">AWE Loan Application Strategy</strong>
                          <p className="text-sm text-gray-600">Complete guide to Alberta Women Entrepreneurs financing up to $150,000 with business plan templates</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Women Building Futures Program Navigator</strong>
                          <p className="text-sm text-gray-600">Access guide to skilled trades training, job placement, and entrepreneurship in construction/energy sectors</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Energy Sector Women Initiatives</strong>
                          <p className="text-sm text-gray-600">Comprehensive directory of oil & gas, renewable energy, and cleantech women entrepreneur programs</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Alberta Innovates Women Support</strong>
                          <p className="text-sm text-gray-600">Tech innovation, AI, and research commercialization programs for women-led startups</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Regional Economic Development Programs</strong>
                          <p className="text-sm text-gray-600">Calgary, Edmonton, Red Deer, and rural Alberta women business support resources</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">WELF Alberta Access Guide</strong>
                          <p className="text-sm text-gray-600">How to access up to $50,000 Women Entrepreneurship Loan Fund through AWE delivery</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Indigenous Women Business Programs</strong>
                          <p className="text-sm text-gray-600">First Nations, Métis, and Inuit women entrepreneurship support specific to Alberta</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Mentorship Network Directory</strong>
                          <p className="text-sm text-gray-600">Connect with AWE mentors, industry experts, and successful women entrepreneurs in Alberta</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Shield className="w-5 h-5 text-red-600 mr-2" />
                        <strong className="text-red-800">Bonus Resources Included:</strong>
                      </div>
                      <ul className="text-sm text-red-700 space-y-1">
                        <li>• Calgary startup ecosystem map</li>
                        <li>• Edmonton tech community resources</li>
                        <li>• Rural Alberta business support network</li>
                        <li>• Energy transition women entrepreneur opportunities</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Lead Capture Form */}
                <div>
                  <Card className="border-orange-200 bg-white sticky top-4">
                    <CardHeader className="bg-gradient-to-r from-red-600 to-orange-700 text-white rounded-t-lg">
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
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
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
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
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
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                            placeholder="Your Alberta Business"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Alberta Region
                          </label>
                          <select 
                            value={formData.region}
                            onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                          >
                            <option value="">Select your region</option>
                            <option value="calgary">Calgary</option>
                            <option value="edmonton">Edmonton</option>
                            <option value="red-deer">Red Deer</option>
                            <option value="lethbridge">Lethbridge</option>
                            <option value="fort-mcmurray">Fort McMurray</option>
                            <option value="rural">Rural Alberta</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Primary Interest
                          </label>
                          <select 
                            value={formData.interest}
                            onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                          >
                            <option value="">Select focus area</option>
                            <option value="awe">AWE Loans & Mentorship</option>
                            <option value="trades">Women Building Futures (Trades)</option>
                            <option value="energy">Energy Sector Programs</option>
                            <option value="innovation">Alberta Innovates Tech</option>
                            <option value="all">All Alberta Programs</option>
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
                            I agree to receive the Alberta women business grants guide and occasional Alberta women entrepreneur 
                            funding opportunities. You can unsubscribe anytime. We respect your privacy.
                          </label>
                        </div>

                        <Button 
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-red-600 to-orange-700 hover:from-red-700 hover:to-orange-800 text-white font-semibold py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <Download className="w-5 h-5 mr-2" />
                              Get Instant Access to Alberta Guide
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
                      <div className="text-2xl font-bold text-red-600">$580M</div>
                      <div className="text-xs text-gray-600">Provincial Support</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-orange-600">$150K</div>
                      <div className="text-xs text-gray-600">AWE Loans</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">Energy</div>
                      <div className="text-xs text-gray-600">Sector Focus</div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Additional Benefits */}
              <div className="mt-12 bg-white rounded-lg shadow-sm p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Why Alberta Women Entrepreneurs Choose Our Provincial Guide
                </h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Zap className="w-8 h-8 text-red-600" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Energy Sector Expertise</h4>
                    <p className="text-sm text-gray-600">
                      Complete guide to oil & gas, renewable energy, and cleantech women entrepreneur opportunities
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target className="w-8 h-8 text-orange-600" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">AWE Loan Optimization</h4>
                    <p className="text-sm text-gray-600">
                      Strategic approach to securing up to $150,000 through Alberta Women Entrepreneurs
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Expert Alberta Support</h4>
                    <p className="text-sm text-gray-600">
                      Access to specialists who understand Alberta's unique business and energy environment
                    </p>
                  </div>
                </div>
              </div>

              {/* Related Resources */}
              <div className="mt-12 text-center">
                <p className="text-gray-600 mb-4">Want to learn more about Alberta women business grants before downloading?</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" asChild>
                    <Link href="/blog/alberta-women-business-grants">
                      Read Complete Alberta Grants Guide
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
