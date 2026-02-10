"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Download, Shield, Sparkles, Users, MapPin, DollarSign, Target, Clock, Award, FileText, TrendingUp, Lock, Eye, Server, Loader2 } from "lucide-react"
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function CybersecurityGrantsGuideDownloadPage() {
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
          guideName: "Cybersecurity Grants Guide",
          industry: formData.category || "Cybersecurity",
          country: "USA",
          additionalNotes: `Stage: ${formData.stage || "N/A"}`,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        router.push("/download/cybersecurity-grants-guide/thank-you")
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              
              {/* Hero Section - Clean & Focused */}
              <div className="text-center mb-12 max-w-4xl mx-auto">
                <Badge className="mb-4 bg-blue-600 text-white border-blue-700 px-4 py-2">
                  🔒 Free Cybersecurity Grants Toolkit
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  Get Your Complete<br />Cybersecurity Grants Guide
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 mb-8">
                  Free application templates, strategies, and frameworks for DOD SBIR grants up to $1.8M, DHS cybersecurity programs, and NSA research partnerships.
                </p>
                
                {/* Trust Indicators */}
                <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 mb-8">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />
                    <span>Instant PDF download</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />
                    <span>Used by 350+ cyber startups</span>
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-5 gap-8 items-start">
                
                {/* What's Included - 3 columns */}
                <div className="lg:col-span-3 space-y-6">
                  
                  {/* Key Stats Cards */}
                  <div className="grid md:grid-cols-3 gap-4 mb-8">
                    <Card className="border-blue-200 bg-white">
                      <CardContent className="pt-6 text-center">
                        <div className="text-3xl font-bold text-blue-600 mb-1">$400K</div>
                        <div className="text-sm text-gray-600 mb-2">Phase I Maximum</div>
                        <div className="text-xs text-gray-500">6-12 months funding</div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-indigo-200 bg-white">
                      <CardContent className="pt-6 text-center">
                        <div className="text-3xl font-bold text-indigo-600 mb-1">$1.8M</div>
                        <div className="text-sm text-gray-600 mb-2">Phase II Maximum</div>
                        <div className="text-xs text-gray-500">24 months development</div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-purple-200 bg-white">
                      <CardContent className="pt-6 text-center">
                        <div className="text-3xl font-bold text-purple-600 mb-1">106</div>
                        <div className="text-sm text-gray-600 mb-2">DOD Topics 2025</div>
                        <div className="text-xs text-gray-500">Cybersecurity focus</div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="border-blue-200 bg-white shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
                      <CardTitle className="text-blue-800 text-xl flex items-center">
                        <FileText className="w-5 h-5 mr-2" />
                        What&apos;s Inside Your Free Guide
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        
                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <CheckCircle className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <strong className="text-gray-900 block mb-1">DOD SBIR Cyber Templates ($400K)</strong>
                            <p className="text-sm text-gray-600">Complete application templates for zero-trust, threat detection, encryption, and cloud security with defense-specific language</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <CheckCircle className="w-5 h-5 text-indigo-600" />
                          </div>
                          <div>
                            <strong className="text-gray-900 block mb-1">Phase II Development Strategies ($1.8M)</strong>
                            <p className="text-sm text-gray-600">Step-by-step roadmap for Phase II proposals including ATO preparation, FedRAMP certification, and Phase III transition</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <CheckCircle className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <strong className="text-gray-900 block mb-1">DHS Homeland Security Programs</strong>
                            <p className="text-sm text-gray-600">Templates for critical infrastructure protection, border security systems, and CISA coordination opportunities</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <CheckCircle className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <strong className="text-gray-900 block mb-1">FedRAMP & ATO Compliance Roadmap</strong>
                            <p className="text-sm text-gray-600">Complete framework for achieving Authority to Operate including NIST controls, security documentation, and certification timeline</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <CheckCircle className="w-5 h-5 text-indigo-600" />
                          </div>
                          <div>
                            <strong className="text-gray-900 block mb-1">CMMC Preparation Guide</strong>
                            <p className="text-sm text-gray-600">Cybersecurity Maturity Model Certification requirements, Level 2/3 preparation, and DOD contract eligibility strategies</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <CheckCircle className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <strong className="text-gray-900 block mb-1">Technology-Specific Strategies</strong>
                            <p className="text-sm text-gray-600">Specialized approaches for zero-trust, threat intelligence, encryption, cloud security, and vulnerability management</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <CheckCircle className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <strong className="text-gray-900 block mb-1">NSA Research Partnerships</strong>
                            <p className="text-sm text-gray-600">Guide to NSA Research Directorate collaborations, Commercial Solutions for Classified program, and cryptography research</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <CheckCircle className="w-5 h-5 text-indigo-600" />
                          </div>
                          <div>
                            <strong className="text-gray-900 block mb-1">Success Stories & Case Studies</strong>
                            <p className="text-sm text-gray-600">Real examples from funded cybersecurity startups that won DOD grants and secured Phase III defense contracts</p>
                          </div>
                        </div>

                      </div>
                    </CardContent>
                  </Card>

                  {/* Bonus Resources */}
                  <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
                    <CardContent className="pt-6">
                      <div className="flex items-center mb-4">
                        <Award className="w-6 h-6 text-blue-600 mr-2" />
                        <strong className="text-blue-900 text-lg">Bonus Resources Included</strong>
                      </div>
                      <div className="grid md:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-blue-800">MITRE ATT&CK mapping templates</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-blue-800">NIST security controls checklist</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-blue-800">Phase III transition strategies</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-blue-800">Defense contractor pitch deck</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                </div>

                {/* Lead Capture Form - 2 columns, sticky */}
                <div className="lg:col-span-2">
                  <Card className="border-gray-200 bg-white shadow-2xl sticky top-4">
                    <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-xl mb-1 flex items-center">
                            <Download className="w-5 h-5 mr-2" />
                            Get Instant Access
                          </CardTitle>
                          <p className="text-sm text-blue-100">Free PDF download • No credit card</p>
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
                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
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
                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            placeholder="john@cybersecurity.com"
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
                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            placeholder="Your Cybersecurity Company"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Security Focus
                          </label>
                          <select 
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          >
                            <option value="">Select your focus area</option>
                            <option value="zero-trust">Zero-Trust Architecture</option>
                            <option value="threat-detection">Threat Detection & Response</option>
                            <option value="encryption">Encryption & Cryptography</option>
                            <option value="cloud-security">Cloud & Network Security</option>
                            <option value="data-security">Data Security & Privacy</option>
                            <option value="vulnerability">Vulnerability Management</option>
                            <option value="app-security">Application Security</option>
                            <option value="other">Other Cybersecurity</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Current Stage
                          </label>
                          <select 
                            value={formData.stage}
                            onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          >
                            <option value="">Where are you now?</option>
                            <option value="researching">Researching Grant Options</option>
                            <option value="prototype">Building POC/Demo</option>
                            <option value="phase-1">Preparing Phase I Application</option>
                            <option value="phase-2">Ready for Phase II</option>
                            <option value="fedramp">Pursuing FedRAMP/ATO</option>
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
                            I agree to receive the cybersecurity grants guide and occasional updates about federal funding opportunities. Unsubscribe anytime.
                          </label>
                        </div>

                        <Button 
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold py-4 text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
                            <div className="w-10 h-10 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center text-white font-bold">J</div>
                            <div className="w-10 h-10 rounded-full bg-indigo-600 border-2 border-white flex items-center justify-center text-white font-bold">M</div>
                            <div className="w-10 h-10 rounded-full bg-purple-600 border-2 border-white flex items-center justify-center text-white font-bold">S</div>
                            <div className="w-10 h-10 rounded-full bg-blue-700 border-2 border-white flex items-center justify-center text-white font-bold text-sm">+350</div>
                          </div>
                        </div>
                        <p className="text-sm font-semibold text-green-800 mb-1">Join 350+ Cyber Founders</p>
                        <p className="text-xs text-green-700">Who&apos;ve downloaded this guide to win DOD SBIR cyber grants</p>
                      </div>
                    </CardContent>
                  </Card>

                </div>

              </div>

              {/* Why Choose Section */}
              <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 md:p-12">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
                  Why Cybersecurity Startups Trust This Guide
                </h3>
                
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-blue-100 to-blue-200 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                      <Shield className="w-8 h-8 text-blue-700" />
                    </div>
                    <h4 className="font-bold text-lg mb-2 text-gray-900">Defense-Specific Language</h4>
                    <p className="text-sm text-gray-600">
                      Complete coverage of DOD cybersecurity topics, defense terminology, and SBIR application strategies for all branches
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-gradient-to-br from-indigo-100 to-indigo-200 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                      <Lock className="w-8 h-8 text-indigo-700" />
                    </div>
                    <h4 className="font-bold text-lg mb-2 text-gray-900">Compliance Roadmaps</h4>
                    <p className="text-sm text-gray-600">
                      Detailed guidance on FedRAMP, CMMC, ATO, and NIST controls with realistic timelines and cost estimates
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-gradient-to-br from-purple-100 to-purple-200 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                      <TrendingUp className="w-8 h-8 text-purple-700" />
                    </div>
                    <h4 className="font-bold text-lg mb-2 text-gray-900">Phase III Transition</h4>
                    <p className="text-sm text-gray-600">
                      Strategies for securing Phase III defense contracts up to $30M and transitioning from SBIR to operational deployment
                    </p>
                  </div>
                </div>
              </div>

              {/* Related Resources - Clean CTA */}
              <div className="mt-12 text-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Want to Learn More First?</h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Read our complete cybersecurity grants guide or explore other technology startup funding opportunities
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" className="border-2 border-blue-600 text-blue-700 hover:bg-blue-50" asChild>
                    <Link href="/blog/cybersecurity-grants">
                      <FileText className="w-4 h-4 mr-2" />
                      Read Complete Guide
                    </Link>
                  </Button>
                  <Button variant="outline" className="border-2 border-indigo-600 text-indigo-700 hover:bg-indigo-50" asChild>
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
