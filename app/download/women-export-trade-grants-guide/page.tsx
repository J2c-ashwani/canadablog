"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Download, Shield, Globe, Users, MapPin, DollarSign, Target, Loader2 } from "lucide-react"
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function WomenExportTradeGrantsDownloadPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    province: "",
    market: "",
    sector: "",
    stage: "",
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
          guideName: "Women Export & Trade Grants Guide",
          industry: formData.sector || "Export/International Trade",
          country: "Canada",
          additionalNotes: `Province: ${formData.province || "N/A"}, Target Market: ${formData.market || "N/A"}, Export Stage: ${formData.stage || "N/A"}`,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        router.push("/download/women-export-trade-grants-guide/thank-you")
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              
              {/* Header Section */}
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-blue-100 text-blue-800 border-blue-200">
                  🌍 Free Women Export Grants Toolkit
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Get Your Free Women Export & Trade Grants International Expansion Guide
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Download our comprehensive women export grants toolkit covering CanExport SME program (up to $75K per 
                  market), Export Development Canada (EDC) trade financing solutions, Trade Commissioner Service global 
                  network (160+ offices in 100+ countries), provincial export programs, international market entry strategies, 
                  and global expansion resources for women entrepreneurs pursuing international business growth.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                
                {/* What's Included Section */}
                <Card className="border-blue-200 bg-white">
                  <CardHeader>
                    <CardTitle className="text-blue-700 text-2xl">
                      📦 What's Included in Your Free Export Funding Toolkit:
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">CanExport SME Application Guide & Templates</strong>
                          <p className="text-sm text-gray-600">Complete framework for accessing up to $75K per market (max $150K total) with detailed application templates, eligibility checklist, and activity budget worksheets</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Trade Commissioner Service Global Directory</strong>
                          <p className="text-sm text-gray-600">Complete directory of 160+ Trade Commissioner offices worldwide with contact information, services offered, and regional market expertise for women exporters</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">EDC Export Financing Solutions Overview</strong>
                          <p className="text-sm text-gray-600">Export Development Canada trade financing options including export credit insurance, working capital loans, buyer financing, performance guarantees for women exporters</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">International Market Entry Strategy Framework</strong>
                          <p className="text-sm text-gray-600">Step-by-step market selection, entry strategy development, competitive analysis, distribution channel identification, and export readiness assessment tools</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Provincial Export Program Directory</strong>
                          <p className="text-sm text-gray-600">Ontario, Quebec, BC, Alberta, Manitoba, Saskatchewan export support programs complementing federal CanExport funding with additional grants and services</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Target Market Profiles - USA, EU, Asia-Pacific</strong>
                          <p className="text-sm text-gray-600">Detailed market profiles for top export destinations including United States, European Union, United Kingdom, China, Japan, Australia with entry requirements and opportunities</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Export Sector-Specific Strategies</strong>
                          <p className="text-sm text-gray-600">Specialized export guides for technology, manufacturing, professional services, food & beverage, fashion, clean tech sectors with sector-specific funding and market intelligence</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Trade Mission & Trade Show Calendar</strong>
                          <p className="text-sm text-gray-600">Comprehensive calendar of government-led trade missions, major international trade shows, networking events, and export development opportunities worldwide</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Shield className="w-5 h-5 text-blue-600 mr-2" />
                        <strong className="text-blue-800">Bonus Resources Included:</strong>
                      </div>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Export documentation and regulatory compliance checklist</li>
                        <li>• International payment terms and currency risk management</li>
                        <li>• Digital export and e-commerce international expansion guide</li>
                        <li>• Multiple funding source stacking strategies for exporters</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Lead Capture Form */}
                <div>
                  <Card className="border-gray-200 bg-white sticky top-4">
                    <CardHeader className="bg-gradient-to-r from-blue-700 to-indigo-900 text-white rounded-t-lg">
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
                            placeholder="your.email@company.com"
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
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Your Company"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Province/Region
                          </label>
                          <select 
                            value={formData.province}
                            onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="">Select your province</option>
                            <option value="ontario">Ontario (Toronto, Ottawa, Hamilton, Mississauga)</option>
                            <option value="quebec">Quebec (Montreal, Quebec City, Laval)</option>
                            <option value="bc">British Columbia (Vancouver, Surrey, Richmond, Victoria)</option>
                            <option value="alberta">Alberta (Calgary, Edmonton, Red Deer)</option>
                            <option value="manitoba">Manitoba (Winnipeg, Brandon)</option>
                            <option value="saskatchewan">Saskatchewan (Regina, Saskatoon)</option>
                            <option value="atlantic">Atlantic Canada</option>
                            <option value="other">Other Province/Territory</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Target Export Market
                          </label>
                          <select 
                            value={formData.market}
                            onChange={(e) => setFormData({ ...formData, market: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="">Select primary export target</option>
                            <option value="usa">United States</option>
                            <option value="eu">European Union</option>
                            <option value="uk">United Kingdom</option>
                            <option value="china">China</option>
                            <option value="japan">Japan</option>
                            <option value="australia">Australia</option>
                            <option value="asia-pacific">Other Asia-Pacific</option>
                            <option value="latin-america">Latin America</option>
                            <option value="middle-east">Middle East</option>
                            <option value="other">Other/Multiple Markets</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Export Industry/Sector
                          </label>
                          <select 
                            value={formData.sector}
                            onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="">Select your industry</option>
                            <option value="technology">Technology & Software</option>
                            <option value="manufacturing">Manufacturing & Industrial</option>
                            <option value="professional-services">Professional Services</option>
                            <option value="food-beverage">Food & Beverage</option>
                            <option value="fashion">Fashion & Apparel</option>
                            <option value="clean-tech">Clean Technology</option>
                            <option value="healthcare">Healthcare & Life Sciences</option>
                            <option value="agriculture">Agriculture & Agri-food</option>
                            <option value="other">Other Industry</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Export Stage
                          </label>
                          <select 
                            value={formData.stage}
                            onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="">Select export readiness stage</option>
                            <option value="exploring">Exploring Export Opportunities</option>
                            <option value="ready">Export Ready - Planning Market Entry</option>
                            <option value="exporting">Currently Exporting - Want to Expand</option>
                            <option value="established">Established Exporter - Multiple Markets</option>
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
                            I agree to receive the women export grants guide and occasional international trade funding 
                            opportunities. You can unsubscribe anytime. We respect your privacy.
                          </label>
                        </div>

                        <Button 
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-blue-700 to-indigo-900 hover:from-blue-800 hover:to-indigo-950 text-white font-semibold py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <Download className="w-5 h-5 mr-2" />
                              Get Instant Access to Export Funding Guide
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
                      <div className="text-2xl font-bold text-blue-600">$75K</div>
                      <div className="text-xs text-gray-600">CanExport Max</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-indigo-600">160+</div>
                      <div className="text-xs text-gray-600">TCS Offices</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-cyan-600">100+</div>
                      <div className="text-xs text-gray-600">Countries</div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Additional Benefits */}
              <div className="mt-12 bg-white rounded-lg shadow-sm p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Why Women Exporters Choose Our Grants Guide
                </h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Globe className="w-8 h-8 text-blue-600" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Complete Export Funding Coverage</h4>
                    <p className="text-sm text-gray-600">
                      From CanExport to EDC financing and Trade Commissioner Service all in one comprehensive guide
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-8 h-8 text-indigo-600" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Global Market Navigator</h4>
                    <p className="text-sm text-gray-600">
                      Market-specific insights for USA, EU, Asia-Pacific with Trade Commissioner contacts in 100+ countries
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-cyan-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target className="w-8 h-8 text-cyan-600" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Export Success Framework</h4>
                    <p className="text-sm text-gray-600">
                      Proven market entry strategies and application templates from successful women exporters
                    </p>
                  </div>
                </div>
              </div>

              {/* Related Resources */}
              <div className="mt-12 text-center">
                <p className="text-gray-600 mb-4">Want to learn more about women export grants before downloading?</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" asChild>
                    <Link href="/blog/women-export-trade-grants-canada">
                      Read Complete Export Grants Guide
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
