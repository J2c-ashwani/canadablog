"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Download, Shield, Heart, Users, MapPin, DollarSign, Building, Loader2 } from "lucide-react"
import Link from "next/link"

export default function IndigenousWomenBusinessGrantsDownloadPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    business: "",
    province: "",
    identity: "",
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
          company: formData.business,
          guideName: "Indigenous Women Business Grants Guide",
          industry: formData.identity || "Indigenous Business",
          country: "Canada",
          additionalNotes: `Province: ${formData.province || "N/A"}, Stage: ${formData.stage || "N/A"}, Funding Interest: ${formData.funding || "N/A"}`,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        router.push("/download/indigenous-women-business-grants-guide/thank-you")
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
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              
              {/* Header Section */}
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-orange-100 text-orange-800 border-orange-200">
                  🪶 Free Indigenous Women Business Grants Toolkit
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Get Your Free Indigenous Women Business Grants & NACCA Funding Guide
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Download our comprehensive Indigenous women business funding toolkit covering NACCA Aboriginal 
                  Entrepreneurship Program (up to $100K), Women Entrepreneurship Loan Fund ($50K microloans), Indigenous 
                  Financial Institutions directory (50+ IFIs), cultural enterprise development resources, application 
                  templates, and regional program navigator for First Nations, Métis, and Inuit women entrepreneurs 
                  across Ontario, BC, Alberta, Manitoba, Saskatchewan, Quebec, Atlantic Canada, and Northern territories 
                  supporting traditional businesses, modern enterprises, and cultural preservation.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                
                {/* What's Included Section */}
                <Card className="border-orange-200 bg-white">
                  <CardHeader>
                    <CardTitle className="text-orange-700 text-2xl">
                      📦 What's Included in Your Free Indigenous Business Toolkit:
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">NACCA Aboriginal Entrepreneurship Program Guide</strong>
                          <p className="text-sm text-gray-600">Complete framework for accessing up to $100K individual or $250K community business funding with application templates and IFI contact information</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Women Entrepreneurship Loan Fund (WELF) Application Templates</strong>
                          <p className="text-sm text-gray-600">Step-by-step guide to accessing up to $50K WELF microloans for Indigenous women entrepreneurs with business plan templates</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Indigenous Financial Institutions (IFI) Network Directory</strong>
                          <p className="text-sm text-gray-600">Complete list of 50+ IFIs across Canada with contact information, services offered, and regional coverage for First Nations, Métis, Inuit women</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Cultural Enterprise Development Resources</strong>
                          <p className="text-sm text-gray-600">Specialized guides for Indigenous arts, crafts, tourism, traditional knowledge businesses preserving culture while generating revenue</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Provincial/Territorial Indigenous Business Support Directory</strong>
                          <p className="text-sm text-gray-600">Ontario, BC, Alberta, Manitoba, Saskatchewan, Quebec, Atlantic, Northern territories Indigenous economic development programs</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Indigenous Women Entrepreneurship Fund (IWEF) Guide</strong>
                          <p className="text-sm text-gray-600">Application process for $2,500 IWEF grants through Canadian Council for Indigenous Business (CCIB) with membership benefits</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Business Planning Templates for Indigenous Entrepreneurs</strong>
                          <p className="text-sm text-gray-600">Culturally appropriate business plan templates, financial projections, market analysis worksheets designed for Indigenous businesses</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Community Support and Partnership Building Guide</strong>
                          <p className="text-sm text-gray-600">Frameworks for obtaining Band Council support, community letters, partnership agreements for Indigenous business funding applications</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Shield className="w-5 h-5 text-orange-600 mr-2" />
                        <strong className="text-orange-800">Bonus Resources Included:</strong>
                      </div>
                      <ul className="text-sm text-orange-700 space-y-1">
                        <li>• Status verification and eligibility documentation checklist</li>
                        <li>• Cultural tourism business development guide</li>
                        <li>• Indigenous arts and crafts e-commerce setup</li>
                        <li>• Multiple funding source stacking strategies for Indigenous businesses</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Lead Capture Form */}
                <div>
                  <Card className="border-gray-200 bg-white sticky top-4">
                    <CardHeader className="bg-gradient-to-r from-orange-700 to-red-900 text-white rounded-t-lg">
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
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            placeholder="Your Name"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Email Address *
                          </label>
                          <input 
                            type="email" 
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            placeholder="your.email@example.com"
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
                            Business Name (if applicable)
                          </label>
                          <input 
                            type="text"
                            value={formData.business}
                            onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            placeholder="Your Business or Enterprise"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Province/Territory
                          </label>
                          <select 
                            value={formData.province}
                            onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          >
                            <option value="">Select your province/territory</option>
                            <option value="ontario">Ontario (Toronto, Ottawa, Thunder Bay, Sudbury)</option>
                            <option value="bc">British Columbia (Vancouver, Victoria, Prince George)</option>
                            <option value="alberta">Alberta (Calgary, Edmonton, Red Deer)</option>
                            <option value="manitoba">Manitoba (Winnipeg, Brandon)</option>
                            <option value="saskatchewan">Saskatchewan (Regina, Saskatoon)</option>
                            <option value="quebec">Quebec (Montreal, Quebec City)</option>
                            <option value="atlantic">Atlantic Canada (Halifax, Moncton, St. John's)</option>
                            <option value="yukon">Yukon (Whitehorse)</option>
                            <option value="nwt">Northwest Territories (Yellowknife)</option>
                            <option value="nunavut">Nunavut (Iqaluit)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Indigenous Identity
                          </label>
                          <select 
                            value={formData.identity}
                            onChange={(e) => setFormData({ ...formData, identity: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          >
                            <option value="">Select identity (optional)</option>
                            <option value="first-nations">First Nations (Status/Non-Status)</option>
                            <option value="metis">Métis</option>
                            <option value="inuit">Inuit</option>
                            <option value="prefer-not">Prefer not to say</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Business Stage
                          </label>
                          <select 
                            value={formData.stage}
                            onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          >
                            <option value="">Select business stage</option>
                            <option value="idea">Business Idea/Planning Stage</option>
                            <option value="startup">Startup (0-2 years)</option>
                            <option value="growing">Growing Business (2+ years)</option>
                            <option value="expanding">Expansion/Scaling Stage</option>
                            <option value="established">Established Business</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Funding Interest
                          </label>
                          <select 
                            value={formData.funding}
                            onChange={(e) => setFormData({ ...formData, funding: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          >
                            <option value="">Select primary interest</option>
                            <option value="nacca-aep">NACCA Aboriginal Entrepreneurship Program ($100K)</option>
                            <option value="welf">Women Entrepreneurship Loan Fund ($50K)</option>
                            <option value="iwef">Indigenous Women Entrepreneurship Fund ($2,500)</option>
                            <option value="cultural">Cultural Enterprise Development</option>
                            <option value="tourism">Indigenous Tourism Business</option>
                            <option value="all">All Indigenous Business Funding</option>
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
                            I agree to receive the Indigenous women business grants guide and occasional Indigenous 
                            business funding opportunities. You can unsubscribe anytime. We respect your privacy.
                          </label>
                        </div>

                        <Button 
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-orange-700 to-red-900 hover:from-orange-800 hover:to-red-950 text-white font-semibold py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <Download className="w-5 h-5 mr-2" />
                              Get Instant Access to Indigenous Business Guide
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
                      <div className="text-2xl font-bold text-orange-600">$100K</div>
                      <div className="text-xs text-gray-600">NACCA Maximum</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-red-600">50+ IFIs</div>
                      <div className="text-xs text-gray-600">Network</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-yellow-600">$830M</div>
                      <div className="text-xs text-gray-600">10-Year Fund</div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Additional Benefits */}
              <div className="mt-12 bg-white rounded-lg shadow-sm p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Why Indigenous Women Entrepreneurs Choose Our Grants Guide
                </h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Building className="w-8 h-8 text-orange-600" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Complete NACCA Funding Coverage</h4>
                    <p className="text-sm text-gray-600">
                      From Aboriginal Entrepreneurship Program to Women Entrepreneurship Loan Fund and IFI network all in one guide
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-8 h-8 text-red-600" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Regional IFI Navigator</h4>
                    <p className="text-sm text-gray-600">
                      Territory-specific Indigenous Financial Institutions for First Nations, Métis, Inuit women across all provinces
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-8 h-8 text-yellow-600" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Cultural Business Focus</h4>
                    <p className="text-sm text-gray-600">
                      Specialized resources for cultural enterprises, traditional businesses, and Indigenous entrepreneurship preserving heritage
                    </p>
                  </div>
                </div>
              </div>

              {/* Related Resources */}
              <div className="mt-12 text-center">
                <p className="text-gray-600 mb-4">Want to learn more about Indigenous women business grants before downloading?</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" asChild>
                    <Link href="/blog/indigenous-women-business-grants-canada">
                      Read Complete Indigenous Business Grants Guide
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
