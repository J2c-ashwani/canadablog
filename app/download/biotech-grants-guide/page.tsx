"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Download, Shield, Sparkles, Users, MapPin, DollarSign, Target, Clock, Award, FileText, TrendingUp, Loader2 } from "lucide-react"
import Link from "next/link"

export default function BiotechLifeSciencesGrantsGuideDownloadPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    category: "",
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
          guideName: "Biotech & Life Sciences Grants Guide",
          industry: formData.category || "Biotech/Life Sciences",
          country: "USA",
          additionalNotes: `Stage: ${formData.stage || "N/A"}`,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        router.push("/download/biotech-life-sciences-grants-guide/thank-you")
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
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              
              {/* Hero Section - Clean & Focused */}
              <div className="text-center mb-12 max-w-4xl mx-auto">
                <Badge className="mb-4 bg-teal-600 text-white border-teal-700 px-4 py-2">
                  🧬 Free Biotech Grants Toolkit
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  Get Your Complete<br />Biotech Grants Guide
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 mb-8">
                  Free application templates, strategies, and frameworks for NIH SBIR grants up to $2M, FDA Orphan Drug programs, and state life sciences funding.
                </p>
                
                {/* Trust Indicators */}
                <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 mb-8">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-teal-600 mr-2" />
                    <span>Instant PDF download</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-teal-600 mr-2" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-teal-600 mr-2" />
                    <span>Used by 500+ biotech startups</span>
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-5 gap-8 items-start">
                
                {/* What's Included - 3 columns */}
                <div className="lg:col-span-3 space-y-6">
                  
                  {/* Key Stats Cards */}
                  <div className="grid md:grid-cols-3 gap-4 mb-8">
                    <Card className="border-teal-200 bg-white">
                      <CardContent className="pt-6 text-center">
                        <div className="text-3xl font-bold text-teal-600 mb-1">$306K</div>
                        <div className="text-sm text-gray-600 mb-2">Phase I Maximum</div>
                        <div className="text-xs text-gray-500">6-12 months funding</div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-cyan-200 bg-white">
                      <CardContent className="pt-6 text-center">
                        <div className="text-3xl font-bold text-cyan-600 mb-1">$2.04M</div>
                        <div className="text-sm text-gray-600 mb-2">Phase II Maximum</div>
                        <div className="text-xs text-gray-500">24 months development</div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-blue-200 bg-white">
                      <CardContent className="pt-6 text-center">
                        <div className="text-3xl font-bold text-blue-600 mb-1">0%</div>
                        <div className="text-sm text-gray-600 mb-2">Zero Equity</div>
                        <div className="text-xs text-gray-500">Full ownership retained</div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="border-teal-200 bg-white shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50 border-b border-teal-100">
                      <CardTitle className="text-teal-800 text-xl flex items-center">
                        <FileText className="w-5 h-5 mr-2" />
                        What's Inside Your Free Guide
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        
                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <CheckCircle className="w-5 h-5 text-teal-600" />
                          </div>
                          <div>
                            <strong className="text-gray-900 block mb-1">NIH SBIR Phase I Templates ($306K)</strong>
                            <p className="text-sm text-gray-600">Complete application templates for proof-of-concept funding with budget justification and technical approach frameworks</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <CheckCircle className="w-5 h-5 text-cyan-600" />
                          </div>
                          <div>
                            <strong className="text-gray-900 block mb-1">Phase II Development Strategies ($2M)</strong>
                            <p className="text-sm text-gray-600">Step-by-step roadmap for Phase II proposals including clinical trials, regulatory preparation, and commercialization plans</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <CheckCircle className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <strong className="text-gray-900 block mb-1">FDA Regulatory Pathway Guides</strong>
                            <p className="text-sm text-gray-600">Templates for IND/IDE submissions, 510(k) pathways, PMA strategies, and FDA communication protocols</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <CheckCircle className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <strong className="text-gray-900 block mb-1">Orphan Drug Grant Templates</strong>
                            <p className="text-sm text-gray-600">Complete framework for FDA Orphan Drug designation applications and development grants for rare diseases</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <strong className="text-gray-900 block mb-1">Clinical Rationale Frameworks</strong>
                            <p className="text-sm text-gray-600">Proven templates for demonstrating unmet medical needs, target populations, and therapeutic efficacy</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <CheckCircle className="w-5 h-5 text-orange-600" />
                          </div>
                          <div>
                            <strong className="text-gray-900 block mb-1">Technology-Specific Strategies</strong>
                            <p className="text-sm text-gray-600">Specialized approaches for therapeutics, medical devices, gene therapy, diagnostics, and biologics</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <CheckCircle className="w-5 h-5 text-pink-600" />
                          </div>
                          <div>
                            <strong className="text-gray-900 block mb-1">State Life Sciences Programs</strong>
                            <p className="text-sm text-gray-600">Guide to Massachusetts MLSC, California CIRM, and other state-level biotech funding opportunities</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <CheckCircle className="w-5 h-5 text-indigo-600" />
                          </div>
                          <div>
                            <strong className="text-gray-900 block mb-1">Success Stories & Case Studies</strong>
                            <p className="text-sm text-gray-600">Real examples from biotech startups that won NIH SBIR grants and commercialized their innovations</p>
                          </div>
                        </div>

                      </div>
                    </CardContent>
                  </Card>

                  {/* Bonus Resources */}
                  <Card className="border-teal-200 bg-gradient-to-br from-teal-50 to-cyan-50">
                    <CardContent className="pt-6">
                      <div className="flex items-center mb-4">
                        <Award className="w-6 h-6 text-teal-600 mr-2" />
                        <strong className="text-teal-900 text-lg">Bonus Resources Included</strong>
                      </div>
                      <div className="grid md:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-teal-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-teal-800">NIH Program Officer contact strategies</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-teal-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-teal-800">Clinical trial design templates</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-teal-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-teal-800">IP protection strategies for biotech</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-teal-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-teal-800">Series A preparation checklist</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                </div>

                {/* Lead Capture Form - 2 columns, sticky */}
                <div className="lg:col-span-2">
                  <Card className="border-gray-200 bg-white shadow-2xl sticky top-4">
                    <CardHeader className="bg-gradient-to-r from-teal-600 to-cyan-700 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-xl mb-1 flex items-center">
                            <Download className="w-5 h-5 mr-2" />
                            Get Instant Access
                          </CardTitle>
                          <p className="text-sm text-teal-100">Free PDF download • No credit card</p>
                        </div>
                      </div>
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
                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                            placeholder="John Smith"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Work Email *
                          </label>
                          <input 
                            type="email" 
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                            placeholder="john@biotech.com"
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
                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                            placeholder="Your Biotech Company"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Technology Focus
                          </label>
                          <select 
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                          >
                            <option value="">Select your focus area</option>
                            <option value="therapeutics">Therapeutics & Drug Discovery</option>
                            <option value="biologics">Biologics, Antibodies & Vaccines</option>
                            <option value="medical-devices">Medical Devices & Diagnostics</option>
                            <option value="gene-therapy">Gene & Cell Therapy</option>
                            <option value="regenerative">Regenerative Medicine</option>
                            <option value="drug-delivery">Drug Delivery Systems</option>
                            <option value="precision">Precision Medicine & Biomarkers</option>
                            <option value="other">Other Biotech</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Current Stage
                          </label>
                          <select 
                            value={formData.stage}
                            onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                          >
                            <option value="">Where are you now?</option>
                            <option value="researching">Researching Grant Options</option>
                            <option value="phase-1">Preparing Phase I Application</option>
                            <option value="phase-2">Ready for Phase II</option>
                            <option value="fast-track">Exploring Fast-Track</option>
                            <option value="orphan-drug">Exploring Orphan Drug Grants</option>
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
                            className="mt-1 mr-3 w-4 h-4"
                          />
                          <label htmlFor="consent" className="text-xs text-gray-600">
                            I agree to receive the biotech grants guide and occasional updates about federal funding opportunities. Unsubscribe anytime.
                          </label>
                        </div>

                        <Button 
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-teal-600 to-cyan-700 hover:from-teal-700 hover:to-cyan-800 text-white font-bold py-4 text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <Download className="w-5 h-5 mr-2" />
                              Download Free Guide Now
                            </>
                          )}
                        </Button>

                        <div className="flex items-center justify-center text-xs text-gray-500 mt-3">
                          <Shield className="w-4 h-4 mr-1" />
                          Your information is 100% secure
                        </div>
                      </form>
                    </CardContent>
                  </Card>

                  {/* Social Proof Below Form */}
                  <Card className="mt-6 border-green-200 bg-green-50">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="flex justify-center mb-3">
                          <div className="flex -space-x-2">
                            <div className="w-10 h-10 rounded-full bg-teal-600 border-2 border-white flex items-center justify-center text-white font-bold">J</div>
                            <div className="w-10 h-10 rounded-full bg-cyan-600 border-2 border-white flex items-center justify-center text-white font-bold">M</div>
                            <div className="w-10 h-10 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center text-white font-bold">S</div>
                            <div className="w-10 h-10 rounded-full bg-purple-600 border-2 border-white flex items-center justify-center text-white font-bold text-sm">+500</div>
                          </div>
                        </div>
                        <p className="text-sm font-semibold text-green-800 mb-1">Join 500+ Biotech Founders</p>
                        <p className="text-xs text-green-700">Who've downloaded this guide to win NIH SBIR grants</p>
                      </div>
                    </CardContent>
                  </Card>

                </div>

              </div>

              {/* Why Choose Section */}
              <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 md:p-12">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
                  Why Biotech Startups Trust This Guide
                </h3>
                
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-teal-100 to-teal-200 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                      <Sparkles className="w-8 h-8 text-teal-700" />
                    </div>
                    <h4 className="font-bold text-lg mb-2 text-gray-900">Complete NIH Coverage</h4>
                    <p className="text-sm text-gray-600">
                      Everything from Phase I proof-of-concept to Phase II clinical trials with detailed FDA regulatory strategies
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-gradient-to-br from-cyan-100 to-cyan-200 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                      <Target className="w-8 h-8 text-cyan-700" />
                    </div>
                    <h4 className="font-bold text-lg mb-2 text-gray-900">Proven Templates</h4>
                    <p className="text-sm text-gray-600">
                      Real application frameworks used by funded biotech startups that won millions in NIH SBIR grants
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-gradient-to-br from-blue-100 to-blue-200 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                      <TrendingUp className="w-8 h-8 text-blue-700" />
                    </div>
                    <h4 className="font-bold text-lg mb-2 text-gray-900">Expert Strategies</h4>
                    <p className="text-sm text-gray-600">
                      Technology-specific approaches for therapeutics, devices, gene therapy, and diagnostics applications
                    </p>
                  </div>
                </div>
              </div>

              {/* Related Resources - Clean CTA */}
              <div className="mt-12 text-center bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Want to Learn More First?</h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Read our complete biotech grants guide or explore other technology startup funding opportunities
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" className="border-2 border-teal-600 text-teal-700 hover:bg-teal-50" asChild>
                    <Link href="/blog/biotech-life-sciences-grants">
                      <FileText className="w-4 h-4 mr-2" />
                      Read Complete Guide
                    </Link>
                  </Button>
                  <Button variant="outline" className="border-2 border-cyan-600 text-cyan-700 hover:bg-cyan-50" asChild>
                    <Link href="/usa/technology-startup-grants">
                      <MapPin className="w-4 h-4 mr-2" />
                      All Tech Grants
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
