"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Download, Shield, FileText, Target, Users, Calendar, Heart, Loader2 } from "lucide-react"
import Link from "next/link"

export default function BMOGrantDownloadPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    location: "",
    revenue: "",
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
          guideName: "BMO Celebrating Women Grant Guide",
          industry: "Women-Owned Business",
          country: formData.location.includes("canada") ? "Canada" : "USA",
          additionalNotes: `Location: ${formData.location || "N/A"}, Revenue: ${formData.revenue || "N/A"}`,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        router.push("/download/bmo-celebrating-women-grant-guide/thank-you")
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              
              {/* Header Section */}
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-blue-100 text-blue-800 border-blue-200">
                  💼 Free BMO Grant Application Toolkit
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Get Your Free BMO Celebrating Women Grant Application Guide
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Download our comprehensive BMO Celebrating Women Grant application toolkit with women 
                  advancement demonstration framework, business growth planning templates, and proven strategies 
                  to win one of fifteen $10,000 grants plus BMO business advisor support and exclusive resources.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                
                {/* What's Included Section */}
                <Card className="border-blue-200 bg-white">
                  <CardHeader>
                    <CardTitle className="text-blue-700 text-2xl">
                      📦 What's Included in Your Free BMO Grant Toolkit:
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Women Advancement Framework</strong>
                          <p className="text-sm text-gray-600">Complete guide to articulating how your business supports women's health, safety, education, or economic empowerment</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Business Growth Plan Template</strong>
                          <p className="text-sm text-gray-600">Structured framework for high-level growth objectives with realistic timelines and milestones</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Eligibility Verification Checklist</strong>
                          <p className="text-sm text-gray-600">Canadian and U.S. requirements breakdown with 51%+ ownership verification guide</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">$10,000 Use Planning Worksheet</strong>
                          <p className="text-sm text-gray-600">Strategic allocation framework showing how grant funding accelerates specific growth goals</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Essay Question Response Guide</strong>
                          <p className="text-sm text-gray-600">Templates for impact statements, growth strategies, challenges, and quantifiable metrics</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Semi-Finalist Video Preparation</strong>
                          <p className="text-sm text-gray-600">What to expect and how to create compelling short video if selected for round 2</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Application Timeline Calculator</strong>
                          <p className="text-sm text-gray-600">August 5-19, 2025 window planner with no-save-draft submission strategy</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Previous Winner Analysis</strong>
                          <p className="text-sm text-gray-600">Case studies showing what made successful applications stand out to judges</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Shield className="w-5 h-5 text-blue-600 mr-2" />
                        <strong className="text-blue-800">Bonus Resources Included:</strong>
                      </div>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• BMO business advisor program overview</li>
                        <li>• Women-led business network connections</li>
                        <li>• 2-year operating history calculation tool</li>
                        <li>• U.S. 24-state eligibility map</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Lead Capture Form */}
                <div>
                  <Card className="border-cyan-200 bg-white sticky top-4">
                    <CardHeader className="bg-gradient-to-r from-blue-800 to-cyan-900 text-white rounded-t-lg">
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
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Your Business Name"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Location
                          </label>
                          <select 
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="">Select location</option>
                            <option value="canada">Canada (all provinces)</option>
                            <option value="us-eligible">United States (24 eligible states)</option>
                            <option value="us-not-eligible">United States (other states)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Annual Revenue
                          </label>
                          <select 
                            value={formData.revenue}
                            onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="">Select revenue range</option>
                            <option value="under-100k">Under $100K</option>
                            <option value="100k-500k">$100K - $500K</option>
                            <option value="500k-1m">$500K - $1M</option>
                            <option value="1m-5m">$1M - $5M</option>
                            <option value="over-5m">Over $5M (not eligible)</option>
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
                            I agree to receive the BMO Celebrating Women Grant guide and occasional women entrepreneur 
                            grant opportunities. You can unsubscribe anytime. We respect your privacy.
                          </label>
                        </div>

                        <Button 
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-blue-800 to-cyan-900 hover:from-blue-900 hover:to-cyan-950 text-white font-semibold py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <Download className="w-5 h-5 mr-2" />
                              Get Instant Access to BMO Grant Guide
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
                      <div className="text-2xl font-bold text-blue-600">$10K</div>
                      <div className="text-xs text-gray-600">Grant Amount</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-cyan-600">15</div>
                      <div className="text-xs text-gray-600">Recipients</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">$750K+</div>
                      <div className="text-xs text-gray-600">Awarded</div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Additional Benefits */}
              <div className="mt-12 bg-white rounded-lg shadow-sm p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Why Women Entrepreneurs Choose Our BMO Grant Application Guide
                </h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-8 h-8 text-blue-600" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Women Advancement Clarity</h4>
                    <p className="text-sm text-gray-600">
                      Framework to clearly articulate how your business supports women's health, safety, education, or economic growth
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-cyan-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target className="w-8 h-8 text-cyan-600" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Strategic Growth Planning</h4>
                    <p className="text-sm text-gray-600">
                      Templates for realistic business expansion with specific metrics and achievable timelines
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Expert Application Support</h4>
                    <p className="text-sm text-gray-600">
                      Access to grant specialists who understand BMO criteria and can optimize your submission
                    </p>
                  </div>
                </div>
              </div>

              {/* Related Resources */}
              <div className="mt-12 text-center">
                <p className="text-gray-600 mb-4">Want to learn more about BMO Celebrating Women Grant before downloading?</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" asChild>
                    <Link href="/blog/bmo-celebrating-women-grant">
                      Read Complete BMO Grant Guide
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
