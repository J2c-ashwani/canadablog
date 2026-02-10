"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Download, Shield, Settings, Target, Users, MapPin, DollarSign, Loader2 } from "lucide-react"
import Link from "next/link"

export default function WomenManufacturingGrantsDownloadPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
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
          company: formData.company,
          guideName: "Women Manufacturing Grants Guide",
          industry: formData.sector || "Manufacturing",
          country: "Canada",
          additionalNotes: `Province: ${formData.province || "N/A"}, Funding Priority: ${formData.priority || "N/A"}`,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        router.push("/download/women-manufacturing-grants-guide/thank-you")
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-50">
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              
              {/* Header Section */}
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-slate-100 text-slate-800 border-slate-200">
                  🏭 Free Women Manufacturing Grants Toolkit
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Get Your Free Women Manufacturing Equipment Grants Guide
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Download our comprehensive women manufacturing grants toolkit covering equipment financing, 
                  automation funding, productivity improvement loans with NRC IRAP application strategies up to $10M, 
                  provincial equipment programs, SR&ED tax credit optimization, and regional funding navigator for all 
                  Canadian manufacturing regions.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                
                {/* What's Included Section */}
                <Card className="border-slate-200 bg-white">
                  <CardHeader>
                    <CardTitle className="text-slate-700 text-2xl">
                      📦 What's Included in Your Free Manufacturing Toolkit:
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">NRC IRAP Application Strategy Guide</strong>
                          <p className="text-sm text-gray-600">Complete framework for accessing up to $10M manufacturing R&D funding with proposal templates</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Provincial Equipment Financing Navigator</strong>
                          <p className="text-sm text-gray-600">Ontario OMITC calculator, Quebec Investissement Québec programs, BC WeBC loans, Alberta AWE financing comparison</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">SR&ED Tax Credit Optimization Tool</strong>
                          <p className="text-sm text-gray-600">Maximize up to 35% refundable credits for manufacturing R&D expenses with regional calculation examples</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">BDC Equipment Loan Application Templates</strong>
                          <p className="text-sm text-gray-600">Complete application package for Business Development Bank manufacturing equipment financing up to $5M</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Industry 4.0 & Automation Funding Matrix</strong>
                          <p className="text-sm text-gray-600">CDEM digital manufacturing transformation, robotics integration, IoT systems funding sources</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Regional Economic Development Grants Directory</strong>
                          <p className="text-sm text-gray-600">GTA, Metro Vancouver, Greater Montreal, Calgary Region municipal manufacturing equipment programs</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Sector-Specific Funding Guide</strong>
                          <p className="text-sm text-gray-600">Food processing, automotive, aerospace, pharmaceutical, electronics, clean tech manufacturing programs</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">ROI Documentation Templates</strong>
                          <p className="text-sm text-gray-600">Frameworks to demonstrate equipment productivity improvements, quality enhancements, cost reductions</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Shield className="w-5 h-5 text-slate-600 mr-2" />
                        <strong className="text-slate-800">Bonus Resources Included:</strong>
                      </div>
                      <ul className="text-sm text-slate-700 space-y-1">
                        <li>• Equipment supplier quote comparison templates</li>
                        <li>• Financial projection worksheets for lenders</li>
                        <li>• Quality certification funding programs (ISO, AS9100, etc.)</li>
                        <li>• Multiple funding source stacking strategies</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Lead Capture Form */}
                <div>
                  <Card className="border-gray-200 bg-white sticky top-4">
                    <CardHeader className="bg-gradient-to-r from-slate-700 to-gray-900 text-white rounded-t-lg">
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
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                            placeholder="jane@manufacturing.com"
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
                            placeholder="Your Manufacturing Business"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Province/Region
                          </label>
                          <select 
                            value={formData.province}
                            onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
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
                            Manufacturing Sector
                          </label>
                          <select 
                            value={formData.sector}
                            onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                          >
                            <option value="">Select manufacturing sector</option>
                            <option value="food-beverage">Food & Beverage Processing</option>
                            <option value="automotive">Automotive Parts Manufacturing</option>
                            <option value="aerospace">Aerospace Components</option>
                            <option value="pharmaceutical">Pharmaceutical & Medical Devices</option>
                            <option value="electronics">Electronics Assembly</option>
                            <option value="metal">Metal Fabrication & Machining</option>
                            <option value="plastics">Plastics & Composites</option>
                            <option value="cleantech">Clean Technology Manufacturing</option>
                            <option value="other">Other Manufacturing</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Equipment Funding Priority
                          </label>
                          <select 
                            value={formData.priority}
                            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                          >
                            <option value="">Select primary interest</option>
                            <option value="equipment">Equipment Purchase Grants</option>
                            <option value="automation">Automation & Robotics Funding</option>
                            <option value="productivity">Productivity Improvement Loans</option>
                            <option value="nrc-irap">NRC IRAP R&D Grants</option>
                            <option value="sred">SR&ED Tax Credits</option>
                            <option value="all">All Manufacturing Funding</option>
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
                            I agree to receive the women manufacturing grants guide and occasional manufacturing equipment 
                            funding opportunities. You can unsubscribe anytime. We respect your privacy.
                          </label>
                        </div>

                        <Button 
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-slate-700 to-gray-900 hover:from-slate-800 hover:to-gray-950 text-white font-semibold py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <Download className="w-5 h-5 mr-2" />
                              Get Instant Access to Manufacturing Guide
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
                      <div className="text-2xl font-bold text-slate-600">$10M</div>
                      <div className="text-xs text-gray-600">NRC IRAP Max</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">35%</div>
                      <div className="text-xs text-gray-600">SR&ED Credits</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">Equipment</div>
                      <div className="text-xs text-gray-600">Financing</div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Additional Benefits */}
              <div className="mt-12 bg-white rounded-lg shadow-sm p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Why Women Manufacturing Entrepreneurs Choose Our Grants Guide
                </h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Settings className="w-8 h-8 text-slate-600" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Complete Equipment Funding Coverage</h4>
                    <p className="text-sm text-gray-600">
                      From NRC IRAP R&D to provincial equipment grants and BDC loans all in one comprehensive guide
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Regional Program Navigator</h4>
                    <p className="text-sm text-gray-600">
                      City-specific funding programs for Toronto, Vancouver, Montreal, Calgary, and all major manufacturing regions
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-blue-600" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Expert Manufacturing Support</h4>
                    <p className="text-sm text-gray-600">
                      Access to specialists who understand Canadian manufacturing funding landscape and application processes
                    </p>
                  </div>
                </div>
              </div>

              {/* Related Resources */}
              <div className="mt-12 text-center">
                <p className="text-gray-600 mb-4">Want to learn more about women manufacturing grants before downloading?</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" asChild>
                    <Link href="/blog/women-manufacturing-grants-canada">
                      Read Complete Manufacturing Grants Guide
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
