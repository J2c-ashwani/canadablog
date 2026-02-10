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
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function WashingtonTechGuideDownloadPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
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
          phone: formData.phone,
          name: formData.name,
          company: formData.company,
          guideName: "Washington Tech Grants Guide",
          industry: formData.sector || "Technology",
          country: "USA",
          additionalNotes: `Location: ${formData.location || "N/A"}, Stage: ${formData.stage || "N/A"}, Funding Interest: ${formData.funding || "N/A"}`,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        router.push("/download/washington-tech-guide/thank-you")
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
                  🌲 Free Washington Technology Startup Grants Complete Toolkit
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Get Your Free Washington Tech Startup Grants Application Guide & Complete Funding Templates
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Download our comprehensive Washington technology startup grants toolkit covering WRF Technology Commercialization 
                  Grants comprehensive phased funding program Phase 1 up to $100,000 proof concept, Phase 2 up to $250,000 
                  prototype development, Phase 3 up to $1 million direct costs commercial launch supporting University of Washington 
                  Washington State University technology transfer, Innovation and Modernization Program grants $38,500 to $540,000 
                  maximum fostering innovation culture state agencies digital transformation, Washington Clean Energy Fund supporting 
                  renewable technology innovations, and Innovation Partnership Zones tax incentives.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                
                {/* What's Included Section */}
                <Card className="border-green-200 bg-white">
                  <CardHeader>
                    <CardTitle className="text-green-700 text-2xl">
                      📦 What's Included in Your Free Washington Tech Grants Toolkit:
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">WRF Technology Commercialization Phased Grant Templates</strong>
                          <p className="text-sm text-gray-600">Complete Phase 1 ($100K), Phase 2 ($250K), Phase 3 ($1M) application templates with University of Washington WSU technology transfer strategies</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Innovation Modernization Program Application Guide</strong>
                          <p className="text-sm text-gray-600">Step-by-step guide to $38.5K-$540K maximum grants fostering innovation culture state agencies digital transformation technology adoption</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Washington Clean Energy Fund Frameworks</strong>
                          <p className="text-sm text-gray-600">Comprehensive framework for Clean Energy Fund applications supporting renewable technology solar wind energy storage zero-emission vehicles</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">University Partnership Development Templates</strong>
                          <p className="text-sm text-gray-600">Templates for engaging University of Washington UW Washington State University WSU demonstrating technology transfer commercialization pathways</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Innovation Partnership Zones Tax Incentives Guide</strong>
                          <p className="text-sm text-gray-600">Framework for accessing Innovation Partnership Zones tax benefits sales tax exemptions business credits supporting Washington economic development</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">SBIR Phase 0 Support Application Resources</strong>
                          <p className="text-sm text-gray-600">Complete guide to SBIR Phase 0 support programs helping Washington startups prepare competitive federal SBIR/STTR proposals enhancing success rates</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Washington State Economic Development Commitment Templates</strong>
                          <p className="text-sm text-gray-600">Templates for demonstrating Washington presence headquarters operations job creation supporting state economic development program eligibility</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Regional Washington Innovation Hub Strategies</strong>
                          <p className="text-sm text-gray-600">Specialized strategies for Seattle Bellevue Redmond, Tacoma Everett, Spokane Vancouver, regional Washington ecosystems with sector examples</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Shield className="w-5 h-5 text-green-600 mr-2" />
                        <strong className="text-green-800">Bonus Washington Resources Included:</strong>
                      </div>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Seattle Bellevue ecosystem connections Microsoft Amazon Boeing venture capital investor relationships</li>
                        <li>• University of Washington technology transfer office WRF partnership development commercialization pathways</li>
                        <li>• Washington State University WSU Pullman Spokane research partnerships agricultural technology support</li>
                        <li>• Fred Hutchinson Cancer Research Center biotech corridor partnerships Seattle South Lake Union ecosystem</li>
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
                            placeholder="your.email@startup.com"
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
                            placeholder="Your Washington Tech Startup"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Washington Location
                          </label>
                          <select 
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          >
                            <option value="">Select your Washington region</option>
                            <option value="seattle">Seattle (South Lake Union, Capitol Hill, Fremont)</option>
                            <option value="bellevue">Bellevue (Downtown, Factoria)</option>
                            <option value="redmond">Redmond (Microsoft Campus, Overlake)</option>
                            <option value="kirkland">Kirkland</option>
                            <option value="tacoma">Tacoma</option>
                            <option value="everett">Everett</option>
                            <option value="spokane">Spokane</option>
                            <option value="vancouver">Vancouver</option>
                            <option value="olympia">Olympia</option>
                            <option value="bellingham">Bellingham</option>
                            <option value="other-wa">Other Washington Region</option>
                            <option value="planning-wa">Planning to relocate to Washington</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Technology Sector
                          </label>
                          <select 
                            value={formData.sector}
                            onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          >
                            <option value="">Select primary sector</option>
                            <option value="software">Software & SaaS</option>
                            <option value="cloud-computing">Cloud Computing & Infrastructure</option>
                            <option value="cleantech">Clean Energy & Cleantech</option>
                            <option value="biotech">Biotechnology & Life Sciences</option>
                            <option value="aerospace">Aerospace & Advanced Manufacturing</option>
                            <option value="ai-ml">AI & Machine Learning</option>
                            <option value="maritime">Maritime Technology</option>
                            <option value="agtech">Agricultural Technology</option>
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
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          >
                            <option value="">Select your stage</option>
                            <option value="researching">Researching Washington Grant Programs</option>
                            <option value="wrf-phase1">Preparing WRF Phase 1 Application</option>
                            <option value="wrf-phase2">WRF Phase 1 Complete - Applying Phase 2</option>
                            <option value="innovation">Exploring Innovation Modernization Program</option>
                            <option value="clean-energy">Preparing Clean Energy Fund Application</option>
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
                            <option value="wrf">WRF Technology Commercialization ($100K-$1M)</option>
                            <option value="innovation">Innovation Modernization ($38.5K-$540K)</option>
                            <option value="clean-energy">Clean Energy Fund</option>
                            <option value="ipz">Innovation Partnership Zones</option>
                            <option value="all">All Washington Programs</option>
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
                            I agree to receive the Washington tech grants guide and occasional Washington State funding opportunities 
                            and innovation programs. You can unsubscribe anytime. We respect your privacy.
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
                              Get Instant Access to Washington Tech Guide
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
                      <div className="text-2xl font-bold text-green-600">$1M</div>
                      <div className="text-xs text-gray-600">WRF Phase 3</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-teal-600">$540K</div>
                      <div className="text-xs text-gray-600">Innovation Max</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">$2B+</div>
                      <div className="text-xs text-gray-600">WRF Follow-on</div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Additional Benefits */}
              <div className="mt-12 bg-white rounded-lg shadow-sm p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Why Washington Technology Startups Choose Our Grant Guide
                </h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Complete Washington Coverage</h4>
                    <p className="text-sm text-gray-600">
                      From Seattle tech corridor to Spokane innovation with strategies for all Washington regions statewide
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-8 h-8 text-teal-600" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">University Ecosystem Expertise</h4>
                    <p className="text-sm text-gray-600">
                      Understand UW WSU partnerships for WRF commercialization grants and technology transfer success
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target className="w-8 h-8 text-blue-600" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Multi-Program Strategy</h4>
                    <p className="text-sm text-gray-600">
                      Learn how to stack WRF, Innovation, Clean Energy maximizing total Washington funding for startups
                    </p>
                  </div>
                </div>
              </div>

              {/* Related Resources */}
              <div className="mt-12 text-center">
                <p className="text-gray-600 mb-4">Want to learn more about Washington tech grants before downloading?</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" asChild>
                    <Link href="/blog/washington-tech-programs">
                      Read Complete Washington Tech Guide
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
