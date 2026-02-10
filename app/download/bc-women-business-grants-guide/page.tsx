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
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function BCWomenGrantsDownloadPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
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
          phone: formData.phone,
          name: formData.name,
          company: formData.company,
          guideName: "BC Women Business Grants Guide",
          industry: "Women-Owned Business",
          country: "Canada",
          state: formData.region,
          additionalNotes: `Interest: ${formData.interest || "N/A"}`,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        router.push("/download/bc-women-business-grants-guide/thank-you")
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
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              
              {/* Header Section */}
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-emerald-100 text-emerald-800 border-emerald-200">
                  🏔️ Free BC Women Innovation Toolkit
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Get Your Free BC Women Business Grants Guide
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Download our comprehensive BC women business grants toolkit covering $650M in provincial innovation 
                  support including WeBC loans up to $150,000, Innovate BC tech programs, Indigenous Women Entrepreneurship 
                  Fund, and comprehensive resources for BC's dynamic women entrepreneur ecosystem.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                
                {/* What's Included Section */}
                <Card className="border-emerald-200 bg-white">
                  <CardHeader>
                    <CardTitle className="text-emerald-700 text-2xl">
                      📦 What's Included in Your Free BC Toolkit:
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">WeBC Loan Application Strategy</strong>
                          <p className="text-sm text-gray-600">Complete guide to accessing up to $150,000 through Women's Enterprise Centre with eligibility calculator</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Innovate BC Women Programs Navigator</strong>
                          <p className="text-sm text-gray-600">Access framework for tech and innovation funding, acceleration programs, and mentorship</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Indigenous Women Entrepreneurship Fund (IWEF)</strong>
                          <p className="text-sm text-gray-600">Annual grant program guide for Indigenous women-owned businesses through CCIB partnership</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Tech Women Leadership Programs</strong>
                          <p className="text-sm text-gray-600">Directory of BC tech sector programs, accelerators, and leadership development for women</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Regional Program Directory</strong>
                          <p className="text-sm text-gray-600">Vancouver, Victoria, Kelowna, and rural BC women business organizations and funding</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">WELF BC Access Guide</strong>
                          <p className="text-sm text-gray-600">How to access up to $50,000 Women Entrepreneurship Loan Fund through WeBC delivery</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Market-Ready Business Assessment</strong>
                          <p className="text-sm text-gray-600">WeBC eligibility checklist and 25% equity contribution planning worksheet</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Innovation Sector Focus Guide</strong>
                          <p className="text-sm text-gray-600">Clean tech, AI, software, and digital innovation funding specific to BC women entrepreneurs</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Shield className="w-5 h-5 text-emerald-600 mr-2" />
                        <strong className="text-emerald-800">Bonus Resources Included:</strong>
                      </div>
                      <ul className="text-sm text-emerald-700 space-y-1">
                        <li>• BC tech ecosystem networking map</li>
                        <li>• Vancouver startup accelerator directory</li>
                        <li>• Rural BC women business support resources</li>
                        <li>• Cross-platform development funding opportunities</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Lead Capture Form */}
                <div>
                  <Card className="border-teal-200 bg-white sticky top-4">
                    <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-800 text-white rounded-t-lg">
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
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
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
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="jane@yourbusiness.com"
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
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="Your BC Business"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            BC Region
                          </label>
                          <select 
                            value={formData.region}
                            onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          >
                            <option value="">Select your region</option>
                            <option value="vancouver">Greater Vancouver</option>
                            <option value="victoria">Victoria</option>
                            <option value="kelowna">Kelowna</option>
                            <option value="kamloops">Kamloops</option>
                            <option value="northern">Northern BC</option>
                            <option value="rural">Rural BC</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Primary Interest
                          </label>
                          <select 
                            value={formData.interest}
                            onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          >
                            <option value="">Select focus area</option>
                            <option value="webc">WeBC Loans & Advisory</option>
                            <option value="innovation">Innovate BC Tech Programs</option>
                            <option value="indigenous">Indigenous Women Programs</option>
                            <option value="tech">Women in Technology</option>
                            <option value="all">All BC Programs</option>
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
                            I agree to receive the BC women business grants guide and occasional BC women entrepreneur 
                            funding opportunities. You can unsubscribe anytime. We respect your privacy.
                          </label>
                        </div>

                        <Button 
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-emerald-600 to-teal-800 hover:from-emerald-700 hover:to-teal-900 text-white font-semibold py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <Download className="w-5 h-5 mr-2" />
                              Get Instant Access to BC Guide
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
                      <div className="text-2xl font-bold text-emerald-600">$650M</div>
                      <div className="text-xs text-gray-600">Innovation Support</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-teal-600">$150K</div>
                      <div className="text-xs text-gray-600">WeBC Loans</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">Tech</div>
                      <div className="text-xs text-gray-600">Innovation Hub</div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Additional Benefits */}
              <div className="mt-12 bg-white rounded-lg shadow-sm p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Why BC Women Entrepreneurs Choose Our Innovation Guide
                </h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Zap className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Innovation Focus</h4>
                    <p className="text-sm text-gray-600">
                      Complete guide to BC's tech and innovation ecosystem with specific women entrepreneur programs
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target className="w-8 h-8 text-teal-600" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">WeBC Loan Optimization</h4>
                    <p className="text-sm text-gray-600">
                      Strategic approach to securing up to $150,000 with market-ready business requirements
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Expert BC Support</h4>
                    <p className="text-sm text-gray-600">
                      Access to specialists who understand BC's unique innovation and business environment
                    </p>
                  </div>
                </div>
              </div>

              {/* Related Resources */}
              <div className="mt-12 text-center">
                <p className="text-gray-600 mb-4">Want to learn more about BC women business grants before downloading?</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" asChild>
                    <Link href="/blog/bc-women-business-grants">
                      Read Complete BC Grants Guide
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
