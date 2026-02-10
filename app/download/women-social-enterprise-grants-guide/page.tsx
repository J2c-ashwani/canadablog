"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Download, Shield, Heart, Users, MapPin, DollarSign, Target, Loader2 } from "lucide-react"
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function WomenSocialEnterpriseGrantsDownloadPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    province: "",
    sector: "",
    priority: "",
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
          company: formData.organization,
          guideName: "Women Social Enterprise Grants Guide",
          industry: formData.sector || "Social Enterprise",
          country: "Canada",
          additionalNotes: `Province: ${formData.province || "N/A"}, Funding Priority: ${formData.priority || "N/A"}`,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        router.push("/download/women-social-enterprise-grants-guide/thank-you")
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
                  ❤️ Free Women Social Enterprise Grants Toolkit
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Get Your Free Women Social Enterprise Grants & Impact Funding Guide
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Download our comprehensive women social enterprise grants toolkit covering social impact funding, 
                  community development programs, Investment Readiness Program application strategies up to $300K, 
                  provincial social economy support, Social Finance Fund opportunities, impact measurement frameworks, 
                  and regional funding navigator for all Canadian communities creating positive social change.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                
                {/* What's Included Section */}
                <Card className="border-purple-200 bg-white">
                  <CardHeader>
                    <CardTitle className="text-purple-700 text-2xl">
                      📦 What's Included in Your Free Social Enterprise Toolkit:
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Investment Readiness Program Application Guide</strong>
                          <p className="text-sm text-gray-600">Complete framework for accessing up to $300K IRP grants with proposal templates and ecosystem partner directory</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Social Finance Fund Navigator</strong>
                          <p className="text-sm text-gray-600">Complete guide to federal social finance ecosystem, intermediaries, community loan funds, impact investment opportunities</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Provincial Social Economy Program Directory</strong>
                          <p className="text-sm text-gray-600">Ontario Trillium Foundation, Quebec Chantier économie sociale, BC social innovation, Alberta social purpose funding comparison</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Impact Measurement Framework Templates</strong>
                          <p className="text-sm text-gray-600">Theory of change development, social impact metrics, outcome indicators, data collection methods, reporting frameworks</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Community Development Corporation Network</strong>
                          <p className="text-sm text-gray-600">Complete directory of CDEC Montreal, CLD Quebec, Community Futures rural Canada supporting women social entrepreneurs</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Social Impact Sector Funding Matrix</strong>
                          <p className="text-sm text-gray-600">Affordable housing, employment training, environmental sustainability, food security, healthcare, education programs funding sources</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Regional Municipal Social Enterprise Support</strong>
                          <p className="text-sm text-gray-600">City of Toronto, Montreal, Vancouver, Calgary community development grants and social innovation programs for women</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Application Success Strategies</strong>
                          <p className="text-sm text-gray-600">Proven strategies for demonstrating social impact, sustainable revenue models, community engagement, organizational capacity</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Shield className="w-5 h-5 text-purple-600 mr-2" />
                        <strong className="text-purple-800">Bonus Resources Included:</strong>
                      </div>
                      <ul className="text-sm text-purple-700 space-y-1">
                        <li>• Business model canvas for social enterprises</li>
                        <li>• Financial projection worksheets for impact businesses</li>
                        <li>• Stakeholder engagement and partnership templates</li>
                        <li>• Multiple funding source stacking strategies</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Lead Capture Form */}
                <div>
                  <Card className="border-gray-200 bg-white sticky top-4">
                    <CardHeader className="bg-gradient-to-r from-purple-700 to-indigo-900 text-white rounded-t-lg">
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
                            placeholder="jane@socialenterprise.com"
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
                            Organization Name
                          </label>
                          <input 
                            type="text"
                            value={formData.organization}
                            onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            placeholder="Your Social Enterprise or Non-Profit"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Province/Region
                          </label>
                          <select 
                            value={formData.province}
                            onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          >
                            <option value="">Select your province</option>
                            <option value="ontario">Ontario (Toronto, Ottawa, Hamilton, Mississauga)</option>
                            <option value="quebec">Quebec (Montreal, Quebec City, Laval)</option>
                            <option value="bc">British Columbia (Vancouver, Surrey, Burnaby)</option>
                            <option value="alberta">Alberta (Calgary, Edmonton, Red Deer)</option>
                            <option value="manitoba">Manitoba</option>
                            <option value="saskatchewan">Saskatchewan</option>
                            <option value="atlantic">Atlantic Canada</option>
                            <option value="other">Other Province/Territory</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Social Impact Focus Area
                          </label>
                          <select 
                            value={formData.sector}
                            onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          >
                            <option value="">Select primary impact area</option>
                            <option value="housing">Affordable Housing & Homelessness</option>
                            <option value="employment">Employment Training & Workforce Development</option>
                            <option value="environment">Environmental Sustainability & Climate Action</option>
                            <option value="food">Food Security & Sustainable Agriculture</option>
                            <option value="education">Education, Literacy & Skills Development</option>
                            <option value="healthcare">Healthcare Access & Community Wellness</option>
                            <option value="arts">Arts, Culture & Heritage</option>
                            <option value="indigenous">Indigenous Reconciliation</option>
                            <option value="newcomer">Newcomer & Refugee Integration</option>
                            <option value="other">Other Social Impact Area</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Social Enterprise Funding Priority
                          </label>
                          <select 
                            value={formData.priority}
                            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          >
                            <option value="">Select primary interest</option>
                            <option value="irp">Investment Readiness Program ($300K)</option>
                            <option value="social-finance">Social Finance Fund Opportunities</option>
                            <option value="community-dev">Community Development Grants</option>
                            <option value="provincial">Provincial Social Economy Support</option>
                            <option value="impact-investment">Impact Investment Preparation</option>
                            <option value="all">All Social Enterprise Funding</option>
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
                            I agree to receive the women social enterprise grants guide and occasional social impact 
                            funding opportunities. You can unsubscribe anytime. We respect your privacy.
                          </label>
                        </div>

                        <Button 
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-purple-700 to-indigo-900 hover:from-purple-800 hover:to-indigo-950 text-white font-semibold py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <Download className="w-5 h-5 mr-2" />
                              Get Instant Access to Social Impact Guide
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
                      <div className="text-2xl font-bold text-purple-600">$300K</div>
                      <div className="text-xs text-gray-600">IRP Maximum</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-indigo-600">Impact</div>
                      <div className="text-xs text-gray-600">Social + Financial</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-pink-600">Community</div>
                      <div className="text-xs text-gray-600">Development</div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Additional Benefits */}
              <div className="mt-12 bg-white rounded-lg shadow-sm p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Why Women Social Entrepreneurs Choose Our Grants Guide
                </h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-8 h-8 text-purple-600" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Complete Social Impact Funding Coverage</h4>
                    <p className="text-sm text-gray-600">
                      From Investment Readiness Program to provincial social economy funding and community development grants all in one guide
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-8 h-8 text-indigo-600" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Regional Program Navigator</h4>
                    <p className="text-sm text-gray-600">
                      City-specific social enterprise funding programs for Toronto, Vancouver, Montreal, Calgary, and all major Canadian regions
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-pink-600" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Expert Social Enterprise Support</h4>
                    <p className="text-sm text-gray-600">
                      Access to specialists who understand Canadian social innovation landscape, impact measurement, and funding processes
                    </p>
                  </div>
                </div>
              </div>

              {/* Related Resources */}
              <div className="mt-12 text-center">
                <p className="text-gray-600 mb-4">Want to learn more about women social enterprise grants before downloading?</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" asChild>
                    <Link href="/blog/women-social-enterprise-grants-canada">
                      Read Complete Social Enterprise Grants Guide
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
