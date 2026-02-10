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

export default function MassachusettsTechGuideDownloadPage() {
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
          guideName: "Massachusetts Tech Grant Guide",
          industry: formData.sector || "Technology",
          country: "USA",
          additionalNotes: `Location: ${formData.location || "N/A"}, Stage: ${formData.stage || "N/A"}, Funding Interest: ${formData.funding || "N/A"}`,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Redirect to thank you page
        router.push("/download/massachusetts-tech-guide/thank-you")
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
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-blue-50">
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              
              {/* Header Section */}
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-red-100 text-red-800 border-red-200">
                  🏛️ Free Massachusetts Technology Startup Grants Complete Toolkit
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Get Your Free Massachusetts Tech Startup Grants Application Guide & Complete Funding Templates
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Download our comprehensive Massachusetts technology startup grants toolkit covering SBIR START tiered grants 
                  ($100K Round 1, $200K Round 2, $500K Round 3) from MassVentures enhancing federal Phase II SBIR/STTR awards, 
                  MassCEC InnovateMass clean energy deployment grants ($350,000), Massachusetts Life Sciences Center MLSC 
                  comprehensive biotech life sciences funding programs. Complete application strategies, proposal templates for 
                  Boston Seaport Innovation District biotech hub, Cambridge Kendall Square MIT Harvard ecosystem, Longwood Medical 
                  Area life sciences corridor, Worcester biomedical manufacturing cluster, Route 128 technology corridor, eligibility 
                  requirements, submission timelines, and success strategies for biotechnology, pharmaceuticals, medical devices, 
                  diagnostics, digital health, clean energy, software, hardware, AI/ML startups pursuing non-dilutive Massachusetts 
                  state funding complementing federal SBIR/STTR grants, venture capital investment supporting Massachusetts innovation 
                  ecosystem leadership, economic competitiveness, job creation advancing Massachusetts technology startup growth statewide.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                
                {/* What's Included Section */}
                <Card className="border-red-200 bg-white">
                  <CardHeader>
                    <CardTitle className="text-red-700 text-2xl">
                      📦 What's Included in Your Free Massachusetts Tech Grants Toolkit:
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-red-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">SBIR START Tiered Grants Application Templates</strong>
                          <p className="text-sm text-gray-600">Complete Round 1 ($100K), Round 2 ($200K), Round 3 ($500K) MassVentures proposal templates with federal Phase II SBIR/STTR enhancement strategies</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-red-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">MassCEC InnovateMass Clean Energy Grant Templates</strong>
                          <p className="text-sm text-gray-600">Step-by-step $350,000 InnovateMass deployment grant application templates for renewable energy storage grid zero-emission vehicles cleantech</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-red-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">MLSC Life Sciences Center Biotech Funding Guide</strong>
                          <p className="text-sm text-gray-600">Comprehensive framework for Massachusetts Life Sciences Center capital infrastructure research commercialization workforce programs biotech applications</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-red-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Massachusetts Jobs Creation Commitment Framework</strong>
                          <p className="text-sm text-gray-600">Templates for demonstrating Massachusetts operations headquarters R&D facilities manufacturing commitment creating maintaining Massachusetts jobs</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-red-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Commercialization Traction Demonstration Strategy</strong>
                          <p className="text-sm text-gray-600">Framework for proving Massachusetts customer validation revenue partnerships pilot deployments commercial viability for grant applications</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-red-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">MIT Harvard University Ecosystem Partnership Templates</strong>
                          <p className="text-sm text-gray-600">Templates for engaging MIT Technology Licensing Office, Harvard Innovation Labs, Boston University, Northeastern demonstrating Massachusetts academic connections</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-red-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Boston Cambridge Biotech Ecosystem Navigation Guide</strong>
                          <p className="text-sm text-gray-600">Specialized strategies for Boston Seaport Innovation District, Cambridge Kendall Square, Longwood Medical Area with Massachusetts hospital partnerships</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-red-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Technology Sector-Specific Massachusetts Guidance</strong>
                          <p className="text-sm text-gray-600">Specialized strategies for biotech, cleantech, medical devices, digital health with Massachusetts sector examples and ecosystem connections</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Shield className="w-5 h-5 text-red-600 mr-2" />
                        <strong className="text-red-800">Bonus Massachusetts Resources Included:</strong>
                      </div>
                      <ul className="text-sm text-red-700 space-y-1">
                        <li>• MassVentures business guidance mentorship network access and entrepreneur connections</li>
                        <li>• Massachusetts hospital partnerships Brigham Women's Massachusetts General Dana-Farber clinical validation</li>
                        <li>• Boston Cambridge venture capital ecosystem connections investor introduction strategies</li>
                        <li>• Worcester biomedical manufacturing cluster development UMass Medical School partnerships regional opportunities</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Lead Capture Form */}
                <div>
                  <Card className="border-gray-200 bg-white sticky top-4">
                    <CardHeader className="bg-gradient-to-r from-red-700 to-blue-900 text-white rounded-t-lg">
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
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
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
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                            placeholder="Your Massachusetts Tech Startup"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Massachusetts Location
                          </label>
                          <select 
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                          >
                            <option value="">Select your Massachusetts region</option>
                            <option value="boston">Boston (Seaport, Financial District, Back Bay)</option>
                            <option value="cambridge">Cambridge (Kendall Square, MIT, Harvard)</option>
                            <option value="cambridge-other">Cambridge (Porter, Central, East Cambridge)</option>
                            <option value="somerville">Somerville</option>
                            <option value="longwood">Longwood Medical Area</option>
                            <option value="route-128">Route 128 (Waltham, Burlington, Lexington)</option>
                            <option value="worcester">Worcester</option>
                            <option value="lowell">Lowell</option>
                            <option value="springfield">Springfield Western Mass</option>
                            <option value="other-ma">Other Massachusetts Region</option>
                            <option value="planning-ma">Planning to relocate to Massachusetts</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Technology Sector
                          </label>
                          <select 
                            value={formData.sector}
                            onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                          >
                            <option value="">Select primary sector</option>
                            <option value="biotech">Biotechnology & Life Sciences</option>
                            <option value="pharma">Pharmaceuticals & Drug Development</option>
                            <option value="medical-devices">Medical Devices & Diagnostics</option>
                            <option value="digital-health">Digital Health & Healthcare IT</option>
                            <option value="cleantech">Clean Energy & Cleantech</option>
                            <option value="software">Software & SaaS</option>
                            <option value="ai-ml">AI & Machine Learning</option>
                            <option value="hardware">Hardware & Robotics</option>
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
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                          >
                            <option value="">Select your stage</option>
                            <option value="researching">Researching Massachusetts Grant Programs</option>
                            <option value="sbir-start">Have Federal Phase II - Need START</option>
                            <option value="masscec">Preparing MassCEC InnovateMass</option>
                            <option value="mlsc">Exploring MLSC Biotech Programs</option>
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
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                          >
                            <option value="">Select primary interest</option>
                            <option value="sbir-start">SBIR START Tiered Grants ($100K-$500K)</option>
                            <option value="masscec">MassCEC InnovateMass ($350K)</option>
                            <option value="mlsc">MLSC Life Sciences Programs</option>
                            <option value="all">All Massachusetts Programs</option>
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
                            I agree to receive the Massachusetts tech grants guide and occasional Massachusetts state funding 
                            opportunities and innovation programs. You can unsubscribe anytime. We respect your privacy.
                          </label>
                        </div>

                        <Button 
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-red-700 to-blue-900 hover:from-red-800 hover:to-blue-950 text-white font-semibold py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <Download className="w-5 h-5 mr-2" />
                              Get Instant Access to Massachusetts Tech Guide
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
                      <div className="text-2xl font-bold text-red-600">$500K</div>
                      <div className="text-xs text-gray-600">START Round 3</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">$350K</div>
                      <div className="text-xs text-gray-600">MassCEC Max</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-indigo-600">$5.1B</div>
                      <div className="text-xs text-gray-600">START Follow-on</div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Additional Benefits */}
              <div className="mt-12 bg-white rounded-lg shadow-sm p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Why Massachusetts Technology Startups Choose Our Grant Guide
                </h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="w-8 h-8 text-red-600" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Complete Massachusetts Coverage</h4>
                    <p className="text-sm text-gray-600">
                      From Boston biotech hub to Worcester manufacturing with strategies for all Massachusetts innovation regions
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-8 h-8 text-blue-600" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Ecosystem Expertise</h4>
                    <p className="text-sm text-gray-600">
                      Understand Cambridge Kendall Square MIT Harvard, Boston Seaport, Longwood Medical Area ecosystems
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target className="w-8 h-8 text-indigo-600" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Multi-Program Strategy</h4>
                    <p className="text-sm text-gray-600">
                      Learn how to stack START, MassCEC, MLSC maximizing total Massachusetts funding for startups
                    </p>
                  </div>
                </div>
              </div>

              {/* Related Resources */}
              <div className="mt-12 text-center">
                <p className="text-gray-600 mb-4">Want to learn more about Massachusetts tech grants before downloading?</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" asChild>
                    <Link href="/blog/massachusetts-tech-programs">
                      Read Complete Massachusetts Tech Guide
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
