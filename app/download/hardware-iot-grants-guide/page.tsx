"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Download, Shield, Sparkles, Users, MapPin, DollarSign, Target, Clock, Award, FileText, TrendingUp, Wifi, Cpu, Cog, Loader2 } from "lucide-react"
import Link from "next/link"

export default function HardwareIoTGrantsGuideDownloadPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
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
          name: formData.name,
          company: formData.company,
          guideName: "Hardware IoT Grants Guide",
          industry: formData.category || "Hardware/IoT",
          country: "USA",
          additionalNotes: `Stage: ${formData.stage || "N/A"}`,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        router.push("/download/hardware-iot-grants-guide/thank-you")
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
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              
              {/* Hero Section - Clean & Focused */}
              <div className="text-center mb-12 max-w-4xl mx-auto">
                <Badge className="mb-4 bg-orange-600 text-white border-orange-700 px-4 py-2">
                  ⚡ Free Hardware & IoT Grants Toolkit
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  Get Your Complete<br />Hardware & IoT Grants Guide
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 mb-8">
                  Free application templates, strategies, and frameworks for NSF SBIR grants up to $1.25M, DOD electronics programs, and advanced manufacturing funding.
                </p>
                
                {/* Trust Indicators */}
                <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 mb-8">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-orange-600 mr-2" />
                    <span>Instant PDF download</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-orange-600 mr-2" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-orange-600 mr-2" />
                    <span>Used by 300+ hardware startups</span>
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-5 gap-8 items-start">
                
                {/* What's Included - 3 columns */}
                <div className="lg:col-span-3 space-y-6">
                  
                  {/* Key Stats Cards */}
                  <div className="grid md:grid-cols-3 gap-4 mb-8">
                    <Card className="border-orange-200 bg-white">
                      <CardContent className="pt-6 text-center">
                        <div className="text-3xl font-bold text-orange-600 mb-1">$305K</div>
                        <div className="text-sm text-gray-600 mb-2">Phase I Maximum</div>
                        <div className="text-xs text-gray-500">6-18 months funding</div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-amber-200 bg-white">
                      <CardContent className="pt-6 text-center">
                        <div className="text-3xl font-bold text-amber-600 mb-1">$1.25M</div>
                        <div className="text-sm text-gray-600 mb-2">Phase II Maximum</div>
                        <div className="text-xs text-gray-500">24 months development</div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-yellow-200 bg-white">
                      <CardContent className="pt-6 text-center">
                        <div className="text-3xl font-bold text-yellow-600 mb-1">0%</div>
                        <div className="text-sm text-gray-600 mb-2">Zero Equity</div>
                        <div className="text-xs text-gray-500">Full ownership retained</div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="border-orange-200 bg-white shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 border-b border-orange-100">
                      <CardTitle className="text-orange-800 text-xl flex items-center">
                        <FileText className="w-5 h-5 mr-2" />
                        What&apos;s Inside Your Free Guide
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        
                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <CheckCircle className="w-5 h-5 text-orange-600" />
                          </div>
                          <div>
                            <strong className="text-gray-900 block mb-1">NSF SBIR IoT Templates ($305K)</strong>
                            <p className="text-sm text-gray-600">Complete application templates for connected devices, sensors, and IoT platforms with technical approach frameworks</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <CheckCircle className="w-5 h-5 text-amber-600" />
                          </div>
                          <div>
                            <strong className="text-gray-900 block mb-1">Phase II Manufacturing Strategies ($1.25M)</strong>
                            <p className="text-sm text-gray-600">Step-by-step hardware development roadmap including DFM, supply chain setup, pilot production, and scaling plans</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <CheckCircle className="w-5 h-5 text-yellow-600" />
                          </div>
                          <div>
                            <strong className="text-gray-900 block mb-1">DOD Electronics Program Guide</strong>
                            <p className="text-sm text-gray-600">Templates for defense electronics applications including secure hardware, semiconductors, and military-grade systems</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <CheckCircle className="w-5 h-5 text-orange-600" />
                          </div>
                          <div>
                            <strong className="text-gray-900 block mb-1">Certification & Compliance Roadmap</strong>
                            <p className="text-sm text-gray-600">Complete framework for FCC, UL, CE, and industry-specific certifications with timeline and budget guidance</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <CheckCircle className="w-5 h-5 text-amber-600" />
                          </div>
                          <div>
                            <strong className="text-gray-900 block mb-1">Hardware Prototype Best Practices</strong>
                            <p className="text-sm text-gray-600">Proven strategies for demonstrating technical feasibility, building proof-of-concept hardware, and prototype testing</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <CheckCircle className="w-5 h-5 text-yellow-600" />
                          </div>
                          <div>
                            <strong className="text-gray-900 block mb-1">Technology-Specific Strategies</strong>
                            <p className="text-sm text-gray-600">Specialized approaches for IoT devices, sensors, robotics, semiconductors, and embedded systems</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <CheckCircle className="w-5 h-5 text-orange-600" />
                          </div>
                          <div>
                            <strong className="text-gray-900 block mb-1">Manufacturing Scale-Up Guide</strong>
                            <p className="text-sm text-gray-600">Detailed playbook for DFM optimization, supply chain development, quality systems, and production readiness</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <CheckCircle className="w-5 h-5 text-amber-600" />
                          </div>
                          <div>
                            <strong className="text-gray-900 block mb-1">Success Stories & Case Studies</strong>
                            <p className="text-sm text-gray-600">Real examples from goTenna, Red Balloon Security, and other hardware startups that won NSF SBIR grants</p>
                          </div>
                        </div>

                      </div>
                    </CardContent>
                  </Card>

                  {/* Bonus Resources */}
                  <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50">
                    <CardContent className="pt-6">
                      <div className="flex items-center mb-4">
                        <Award className="w-6 h-6 text-orange-600 mr-2" />
                        <strong className="text-orange-900 text-lg">Bonus Resources Included</strong>
                      </div>
                      <div className="grid md:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-orange-800">Bill of materials (BOM) templates</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-orange-800">Hardware IP protection strategies</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-orange-800">Manufacturing partner sourcing guide</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-orange-800">Hardware-focused investor pitch deck</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                </div>

                {/* Lead Capture Form - 2 columns, sticky */}
                <div className="lg:col-span-2">
                  <Card className="border-gray-200 bg-white shadow-2xl sticky top-4">
                    <CardHeader className="bg-gradient-to-r from-orange-600 to-amber-700 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-xl mb-1 flex items-center">
                            <Download className="w-5 h-5 mr-2" />
                            Get Instant Access
                          </CardTitle>
                          <p className="text-sm text-orange-100">Free PDF download • No credit card</p>
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
                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
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
                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                            placeholder="john@hardwarecompany.com"
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
                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                            placeholder="Your Hardware Company"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Hardware Focus
                          </label>
                          <select 
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                          >
                            <option value="">Select your focus area</option>
                            <option value="iot-devices">IoT & Connected Devices</option>
                            <option value="sensors">Sensors & Actuators</option>
                            <option value="electronics">Electronics & Semiconductors</option>
                            <option value="robotics">Robotics & Automation</option>
                            <option value="wireless">Wireless & Communications</option>
                            <option value="embedded">Embedded Systems</option>
                            <option value="manufacturing">Advanced Manufacturing</option>
                            <option value="other">Other Hardware</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Current Stage
                          </label>
                          <select 
                            value={formData.stage}
                            onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                          >
                            <option value="">Where are you now?</option>
                            <option value="researching">Researching Grant Options</option>
                            <option value="prototype">Building Prototype</option>
                            <option value="phase-1">Preparing Phase I Application</option>
                            <option value="phase-2">Ready for Phase II</option>
                            <option value="manufacturing">Scaling Manufacturing</option>
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
                            I agree to receive the hardware grants guide and occasional updates about federal funding opportunities. Unsubscribe anytime.
                          </label>
                        </div>

                        <Button 
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-orange-600 to-amber-700 hover:from-orange-700 hover:to-amber-800 text-white font-bold py-4 text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
                            <div className="w-10 h-10 rounded-full bg-orange-600 border-2 border-white flex items-center justify-center text-white font-bold">J</div>
                            <div className="w-10 h-10 rounded-full bg-amber-600 border-2 border-white flex items-center justify-center text-white font-bold">M</div>
                            <div className="w-10 h-10 rounded-full bg-yellow-600 border-2 border-white flex items-center justify-center text-white font-bold">S</div>
                            <div className="w-10 h-10 rounded-full bg-orange-700 border-2 border-white flex items-center justify-center text-white font-bold text-sm">+300</div>
                          </div>
                        </div>
                        <p className="text-sm font-semibold text-green-800 mb-1">Join 300+ Hardware Founders</p>
                        <p className="text-xs text-green-700">Who&apos;ve downloaded this guide to win NSF SBIR IoT grants</p>
                      </div>
                    </CardContent>
                  </Card>

                </div>

              </div>

              {/* Why Choose Section */}
              <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 md:p-12">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
                  Why Hardware Startups Trust This Guide
                </h3>
                
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-orange-100 to-orange-200 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                      <Wifi className="w-8 h-8 text-orange-700" />
                    </div>
                    <h4 className="font-bold text-lg mb-2 text-gray-900">IoT-Specific Templates</h4>
                    <p className="text-sm text-gray-600">
                      Complete NSF SBIR subtopic coverage for connected devices, sensors, communications, and integrated systems
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-gradient-to-br from-amber-100 to-amber-200 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                      <Cog className="w-8 h-8 text-amber-700" />
                    </div>
                    <h4 className="font-bold text-lg mb-2 text-gray-900">Manufacturing Expertise</h4>
                    <p className="text-sm text-gray-600">
                      Detailed guidance on DFM, supply chain, production scale-up, and quality systems for hardware commercialization
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                      <TrendingUp className="w-8 h-8 text-yellow-700" />
                    </div>
                    <h4 className="font-bold text-lg mb-2 text-gray-900">Proven Success Stories</h4>
                    <p className="text-sm text-gray-600">
                      Real examples from funded hardware startups like goTenna mesh networking and Red Balloon Security
                    </p>
                  </div>
                </div>
              </div>

              {/* Related Resources - Clean CTA */}
              <div className="mt-12 text-center bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Want to Learn More First?</h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Read our complete hardware grants guide or explore other technology startup funding opportunities
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" className="border-2 border-orange-600 text-orange-700 hover:bg-orange-50" asChild>
                    <Link href="/blog/hardware-iot-startup-grants">
                      <FileText className="w-4 h-4 mr-2" />
                      Read Complete Guide
                    </Link>
                  </Button>
                  <Button variant="outline" className="border-2 border-amber-600 text-amber-700 hover:bg-amber-50" asChild>
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
