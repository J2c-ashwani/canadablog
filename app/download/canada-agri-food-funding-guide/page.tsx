"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, Download, Sprout, Tractor, Wheat, Leaf, Loader2 } from "lucide-react"
import Link from "next/link"

export default function CanadaAgriFoodFundingDownloadPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    role: "",
    agriculturalSector: "",
    technologyFocus: "",
    developmentStage: "",
    fundingNeeds: "",
    challenges: "",
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
          name: `${formData.firstName} ${formData.lastName}`,
          company: formData.company,
          guideName: "Canada Agri-Food Funding Guide",
          industry: formData.agriculturalSector || "Agriculture/AgriTech",
          country: "Canada",
          additionalNotes: `Role: ${formData.role}, Technology: ${formData.technologyFocus}, Stage: ${formData.developmentStage}, Funding: ${formData.fundingNeeds}, Challenges: ${formData.challenges || "N/A"}`,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        router.push("/download/canada-agrifood-funding-guide/thank-you")
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
      <div className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-br from-green-700 to-emerald-800 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🌾 Free Agri-Food Download
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Canada Agriculture Grants Application Toolkit
              </h1>
              <p className="text-xl text-green-100 mb-8">
                Get instant access to comprehensive agriculture funding guide with AgriInnovate templates, 
                CAP funding tools, precision agriculture strategies, and farm technology frameworks used by agritech 
                companies to secure $78M+ across 32+ agricultural innovation and food processing programs.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Left - What's Included */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">What's Included in Your Agri-Food Toolkit</h2>
                  
                  <div className="space-y-6">
                    <Card className="border-green-200">
                      <CardHeader>
                        <div className="flex items-center">
                          <Sprout className="w-6 h-6 text-green-600 mr-3" />
                          <CardTitle className="text-green-700">AgriInnovate Application Templates</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Complete AgriInnovate project template (up to $10M)</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Agricultural technology commercialization framework</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Farm-level impact assessment templates</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Market analysis and repayment strategy guides</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-emerald-200">
                      <CardHeader>
                        <div className="flex items-center">
                          <Tractor className="w-6 h-6 text-emerald-600 mr-3" />
                          <CardTitle className="text-emerald-700">CAP & Precision Agriculture Tools</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Canadian Agricultural Partnership application templates</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Precision agriculture technology selection guide</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Smart farming ROI calculators</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Provincial cost-share program comparison</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-amber-200">
                      <CardHeader>
                        <div className="flex items-center">
                          <Wheat className="w-6 h-6 text-amber-600 mr-3" />
                          <CardTitle className="text-amber-700">Food Processing & Value-Add Resources</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Food processing technology funding templates</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Value-added agriculture business plans</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Food safety and traceability system guides</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>AgriAssurance program application tools</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-lime-200">
                      <CardHeader>
                        <div className="flex items-center">
                          <Leaf className="w-6 h-6 text-lime-600 mr-3" />
                          <CardTitle className="text-lime-700">Sustainable Agriculture & Business Tools</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Agricultural innovation ROI calculator</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Sustainability impact measurement framework</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Farmer adoption strategy templates</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Multi-program funding stacking strategies</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="mt-8 bg-green-50 border border-green-200 p-6 rounded-lg">
                    <h4 className="font-bold text-green-800 mb-2">Bonus: Expert Agri-Food Consultation</h4>
                    <p className="text-green-700 text-sm">
                      Download includes a complimentary 30-minute agriculture funding strategy consultation 
                      with our agritech specialists who have secured $78M+ in farm technology and food processing grants with 72% success rate.
                    </p>
                  </div>
                </div>

                {/* Right - Lead Capture Form */}
                <div>
                  <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-lg sticky top-8">
                    <div className="text-center mb-6">
                      <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Download className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Download Your Free Agri-Food Toolkit</h3>
                      <p className="text-gray-600">Join 2,100+ agritech innovators who've accessed our agriculture funding resources</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input 
                            id="firstName" 
                            required 
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            placeholder="Your first name"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input 
                            id="lastName" 
                            required 
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            placeholder="Your last name"
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email">Business Email *</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          required 
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="your.email@company.com"
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="company">Company/Farm Operation *</Label>
                        <Input 
                          id="company" 
                          required 
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="Your company/farm name"
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="role">Your Role *</Label>
                        <Select 
                          required
                          value={formData.role}
                          onValueChange={(value) => setFormData({ ...formData, role: value })}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select your role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="farmer">Farmer/Producer</SelectItem>
                            <SelectItem value="ceo">CEO/Founder</SelectItem>
                            <SelectItem value="agtech">AgriTech Company</SelectItem>
                            <SelectItem value="processor">Food Processor</SelectItem>
                            <SelectItem value="researcher">Researcher</SelectItem>
                            <SelectItem value="consultant">Agricultural Consultant</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="agriculturalSector">Agricultural Sector</Label>
                        <Select 
                          value={formData.agriculturalSector}
                          onValueChange={(value) => setFormData({ ...formData, agriculturalSector: value })}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select agricultural sector" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="crop-production">Crop Production</SelectItem>
                            <SelectItem value="livestock">Livestock & Dairy</SelectItem>
                            <SelectItem value="food-processing">Food Processing</SelectItem>
                            <SelectItem value="vertical-farming">Vertical/Indoor Farming</SelectItem>
                            <SelectItem value="organic">Organic Agriculture</SelectItem>
                            <SelectItem value="aquaculture">Aquaculture</SelectItem>
                            <SelectItem value="agtech">Agricultural Technology</SelectItem>
                            <SelectItem value="other">Other Agriculture</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="technologyFocus">Primary Technology Focus</Label>
                        <Select 
                          value={formData.technologyFocus}
                          onValueChange={(value) => setFormData({ ...formData, technologyFocus: value })}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select technology area" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="precision-ag">Precision Agriculture</SelectItem>
                            <SelectItem value="smart-farming">Smart Farming/IoT</SelectItem>
                            <SelectItem value="automation">Farm Automation</SelectItem>
                            <SelectItem value="biotechnology">Agricultural Biotechnology</SelectItem>
                            <SelectItem value="food-processing">Food Processing Technology</SelectItem>
                            <SelectItem value="sustainability">Sustainable Farming Solutions</SelectItem>
                            <SelectItem value="data-analytics">Agricultural Data Analytics</SelectItem>
                            <SelectItem value="other">Other AgriTech</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="developmentStage">Development Stage</Label>
                        <Select 
                          value={formData.developmentStage}
                          onValueChange={(value) => setFormData({ ...formData, developmentStage: value })}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select stage" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="concept">Concept Development</SelectItem>
                            <SelectItem value="prototype">Prototype/Testing</SelectItem>
                            <SelectItem value="pilot">Pilot Farm Testing</SelectItem>
                            <SelectItem value="commercialization">Ready for Market</SelectItem>
                            <SelectItem value="scaling">Scaling/Expansion</SelectItem>
                            <SelectItem value="adoption">On-Farm Adoption</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="fundingNeeds">Estimated Funding Needs</Label>
                        <Select 
                          value={formData.fundingNeeds}
                          onValueChange={(value) => setFormData({ ...formData, fundingNeeds: value })}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select funding range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="under-50k">Under $50K</SelectItem>
                            <SelectItem value="50k-250k">$50K - $250K</SelectItem>
                            <SelectItem value="250k-500k">$250K - $500K</SelectItem>
                            <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                            <SelectItem value="1m-5m">$1M - $5M</SelectItem>
                            <SelectItem value="over-5m">Over $5M</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="challenges">Biggest Agriculture Funding Challenge (Optional)</Label>
                        <Textarea 
                          id="challenges" 
                          value={formData.challenges}
                          onChange={(e) => setFormData({ ...formData, challenges: e.target.value })}
                          placeholder="What's your biggest challenge with agriculture grant applications, AgriInnovate funding, or farm technology adoption?"
                          className="mt-1"
                          rows={3}
                        />
                      </div>

                      {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                          <p className="text-red-800 text-sm">{error}</p>
                        </div>
                      )}

                      <div className="text-xs text-gray-500">
                        <label className="flex items-start space-x-2">
                          <input type="checkbox" className="mt-1" required />
                          <span>
                            I agree to receive email communications about agriculture funding opportunities, 
                            agritech grants, farm technology programs, and related agricultural innovation funding. You can unsubscribe at any time.
                          </span>
                        </label>
                      </div>

                      <Button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-green-700 hover:bg-green-800 text-lg py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Download className="w-5 h-5 mr-2" />
                            Download Free Agri-Food Toolkit Now
                          </>
                        )}
                      </Button>
                    </form>

                    <div className="mt-6 text-center">
                      <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                        <span>🔒 100% Secure</span>
                        <span>📧 No Spam</span>
                        <span>🎯 Instant Access</span>
                      </div>
                    </div>
                  </div>

                  {/* Trust Indicators */}
                  <div className="mt-8 text-center">
                    <h4 className="font-semibold text-gray-800 mb-4">Trusted by AgriTech Leaders</h4>
                    <div className="grid grid-cols-3 gap-4 text-xs text-gray-600">
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="font-bold text-green-600">$78M+</div>
                        <div>AgriTech Grants Secured</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="font-bold text-green-600">72%</div>
                        <div>Success Rate</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="font-bold text-green-600">2,100+</div>
                        <div>Downloads</div>
                      </div>
                    </div>
                  </div>
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
