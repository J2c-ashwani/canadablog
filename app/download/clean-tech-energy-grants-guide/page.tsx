import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Download, Shield, Sparkles, Users, MapPin, DollarSign, Target, Clock, Award, FileText, TrendingUp, Sun, Battery, Wind, Leaf } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Download Free Clean Tech & Energy Grants Guide | $200K DOE SBIR Phase I, $1.6M Phase II Application Templates",
  description: "Get instant access to our clean tech and energy grants guide with DOE SBIR Phase I $200K templates, Phase II $1.6M strategies, EPA environmental programs, state energy funding. Complete toolkit for renewable energy, battery tech, and climate solutions.",
  keywords: "clean tech grants guide, renewable energy startup funding DOE SBIR, solar application templates, battery technology grants",
}

export default function CleanTechEnergyGrantsGuideDownloadPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              
              {/* Hero Section - Clean & Focused */}
              <div className="text-center mb-12 max-w-4xl mx-auto">
                <Badge className="mb-4 bg-green-600 text-white border-green-700 px-4 py-2">
                  🌱 Free Clean Tech & Energy Grants Toolkit
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  Get Your Complete<br />Clean Energy Grants Guide
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 mb-8">
                  Free application templates, strategies, and frameworks for DOE SBIR grants up to $1.6M, EPA environmental programs, and state clean energy funding.
                </p>
                
                {/* Trust Indicators */}
                <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 mb-8">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <span>Instant PDF download</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <span>Used by 400+ clean tech startups</span>
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-5 gap-8 items-start">
                
                {/* What's Included - 3 columns */}
                <div className="lg:col-span-3 space-y-6">
                  
                  {/* Key Stats Cards */}
                  <div className="grid md:grid-cols-3 gap-4 mb-8">
                    <Card className="border-green-200 bg-white">
                      <CardContent className="pt-6 text-center">
                        <div className="text-3xl font-bold text-green-600 mb-1">$200K</div>
                        <div className="text-sm text-gray-600 mb-2">Phase I Maximum</div>
                        <div className="text-xs text-gray-500">6-12 months funding</div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-emerald-200 bg-white">
                      <CardContent className="pt-6 text-center">
                        <div className="text-3xl font-bold text-emerald-600 mb-1">$1.6M</div>
                        <div className="text-sm text-gray-600 mb-2">Phase II Maximum</div>
                        <div className="text-xs text-gray-500">24 months development</div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-teal-200 bg-white">
                      <CardContent className="pt-6 text-center">
                        <div className="text-3xl font-bold text-teal-600 mb-1">0%</div>
                        <div className="text-sm text-gray-600 mb-2">Zero Equity</div>
                        <div className="text-xs text-gray-500">Full ownership retained</div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="border-green-200 bg-white shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
                      <CardTitle className="text-green-800 text-xl flex items-center">
                        <FileText className="w-5 h-5 mr-2" />
                        What&apos;s Inside Your Free Guide
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        
                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <strong className="text-gray-900 block mb-1">DOE SBIR Phase I Templates ($200K)</strong>
                            <p className="text-sm text-gray-600">Complete application templates for solar, battery, wind, hydrogen, and climate tech with energy impact frameworks</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <CheckCircle className="w-5 h-5 text-emerald-600" />
                          </div>
                          <div>
                            <strong className="text-gray-900 block mb-1">Phase II Development Strategies ($1.6M)</strong>
                            <p className="text-sm text-gray-600">Step-by-step roadmap for Phase II proposals including national lab partnerships, TABA support, and commercialization</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <CheckCircle className="w-5 h-5 text-teal-600" />
                          </div>
                          <div>
                            <strong className="text-gray-900 block mb-1">EPA Environmental Tech Programs</strong>
                            <p className="text-sm text-gray-600">Templates for air quality, water treatment, waste management, and environmental monitoring innovations</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <strong className="text-gray-900 block mb-1">Energy Impact Quantification Methods</strong>
                            <p className="text-sm text-gray-600">Framework for calculating energy savings, GHG reductions, LCOE analysis, and performance benchmarking</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <CheckCircle className="w-5 h-5 text-emerald-600" />
                          </div>
                          <div>
                            <strong className="text-gray-900 block mb-1">National Lab Partnership Guide</strong>
                            <p className="text-sm text-gray-600">How to leverage DOE national laboratories for testing, validation, and technology transfer support</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <CheckCircle className="w-5 h-5 text-teal-600" />
                          </div>
                          <div>
                            <strong className="text-gray-900 block mb-1">Technology-Specific Strategies</strong>
                            <p className="text-sm text-gray-600">Specialized approaches for solar, battery storage, wind, hydrogen, carbon capture, and bioenergy applications</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <strong className="text-gray-900 block mb-1">State Clean Energy Programs</strong>
                            <p className="text-sm text-gray-600">Guide to California EPIC, NYSERDA, Texas SECO, and other state-level renewable energy funding opportunities</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <CheckCircle className="w-5 h-5 text-emerald-600" />
                          </div>
                          <div>
                            <strong className="text-gray-900 block mb-1">Success Stories & Case Studies</strong>
                            <p className="text-sm text-gray-600">Real examples from funded clean tech startups in solar, battery, and climate solutions that won DOE grants</p>
                          </div>
                        </div>

                      </div>
                    </CardContent>
                  </Card>

                  {/* Bonus Resources */}
                  <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
                    <CardContent className="pt-6">
                      <div className="flex items-center mb-4">
                        <Award className="w-6 h-6 text-green-600 mr-2" />
                        <strong className="text-green-900 text-lg">Bonus Resources Included</strong>
                      </div>
                      <div className="grid md:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-green-800">DOE office contact strategies</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-green-800">LCOE calculation templates</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-green-800">Clean tech IP strategies</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-green-800">Climate investor pitch deck</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                </div>

                {/* Lead Capture Form - 2 columns, sticky */}
                <div className="lg:col-span-2">
                  <Card className="border-gray-200 bg-white shadow-2xl sticky top-4">
                    <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-700 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-xl mb-1 flex items-center">
                            <Download className="w-5 h-5 mr-2" />
                            Get Instant Access
                          </CardTitle>
                          <p className="text-sm text-green-100">Free PDF download • No credit card</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <form action="/download/clean-tech-energy-grants-guide/thank-you" method="GET" className="space-y-4">
                        
                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Full Name *
                          </label>
                          <input 
                            type="text" 
                            name="name"
                            required
                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                            placeholder="John Smith"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Work Email *
                          </label>
                          <input 
                            type="email" 
                            name="email"
                            required
                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                            placeholder="john@cleantech.com"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Company Name
                          </label>
                          <input 
                            type="text"
                            name="company"
                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                            placeholder="Your Clean Tech Company"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Technology Focus
                          </label>
                          <select 
                            name="category"
                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                          >
                            <option value="">Select your focus area</option>
                            <option value="solar">Solar Energy & Photovoltaics</option>
                            <option value="battery">Battery Storage & Grid Tech</option>
                            <option value="wind">Wind & Water Power</option>
                            <option value="hydrogen">Hydrogen & Fuel Cells</option>
                            <option value="geothermal">Geothermal Energy</option>
                            <option value="bioenergy">Bioenergy & Biofuels</option>
                            <option value="carbon">Carbon Capture & Climate Tech</option>
                            <option value="other">Other Clean Tech</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Current Stage
                          </label>
                          <select 
                            name="stage"
                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                          >
                            <option value="">Where are you now?</option>
                            <option value="researching">Researching Grant Options</option>
                            <option value="prototype">Building Prototype</option>
                            <option value="phase-1">Preparing Phase I Application</option>
                            <option value="phase-2">Ready for Phase II</option>
                            <option value="commercializing">Commercializing Technology</option>
                          </select>
                        </div>

                        <div className="flex items-start pt-2">
                          <input 
                            type="checkbox" 
                            id="consent"
                            name="consent"
                            required 
                            className="mt-1 mr-3 w-4 h-4"
                          />
                          <label htmlFor="consent" className="text-xs text-gray-600">
                            I agree to receive the clean tech grants guide and occasional updates about federal funding opportunities. Unsubscribe anytime.
                          </label>
                        </div>

                        <Button 
                          type="submit" 
                          className="w-full bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white font-bold py-4 text-lg shadow-lg hover:shadow-xl transition-all"
                        >
                          <Download className="w-5 h-5 mr-2" />
                          Download Free Guide Now
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
                            <div className="w-10 h-10 rounded-full bg-green-600 border-2 border-white flex items-center justify-center text-white font-bold">J</div>
                            <div className="w-10 h-10 rounded-full bg-emerald-600 border-2 border-white flex items-center justify-center text-white font-bold">M</div>
                            <div className="w-10 h-10 rounded-full bg-teal-600 border-2 border-white flex items-center justify-center text-white font-bold">S</div>
                            <div className="w-10 h-10 rounded-full bg-green-700 border-2 border-white flex items-center justify-center text-white font-bold text-sm">+400</div>
                          </div>
                        </div>
                        <p className="text-sm font-semibold text-green-800 mb-1">Join 400+ Clean Tech Founders</p>
                        <p className="text-xs text-green-700">Who&apos;ve downloaded this guide to win DOE SBIR grants</p>
                      </div>
                    </CardContent>
                  </Card>

                </div>

              </div>

              {/* Why Choose Section */}
              <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 md:p-12">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
                  Why Clean Tech Startups Trust This Guide
                </h3>
                
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-green-100 to-green-200 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                      <Sun className="w-8 h-8 text-green-700" />
                    </div>
                    <h4 className="font-bold text-lg mb-2 text-gray-900">DOE Office Coverage</h4>
                    <p className="text-sm text-gray-600">
                      Complete coverage of SETO, VTO, WETO, HFTO, GTO, BETO, FECM, and other DOE programs with specific subtopics
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-gradient-to-br from-emerald-100 to-emerald-200 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                      <Battery className="w-8 h-8 text-emerald-700" />
                    </div>
                    <h4 className="font-bold text-lg mb-2 text-gray-900">Energy Impact Methods</h4>
                    <p className="text-sm text-gray-600">
                      Proven frameworks for quantifying energy savings, GHG reductions, LCOE analysis, and performance benchmarking
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-gradient-to-br from-teal-100 to-teal-200 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                      <TrendingUp className="w-8 h-8 text-teal-700" />
                    </div>
                    <h4 className="font-bold text-lg mb-2 text-gray-900">Real Success Examples</h4>
                    <p className="text-sm text-gray-600">
                      Case studies from funded startups in solar, battery, wind, and climate tech that scaled with DOE support
                    </p>
                  </div>
                </div>
              </div>

              {/* Related Resources - Clean CTA */}
              <div className="mt-12 text-center bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Want to Learn More First?</h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Read our complete clean tech grants guide or explore other technology startup funding opportunities
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" className="border-2 border-green-600 text-green-700 hover:bg-green-50" asChild>
                    <Link href="/blog/clean-tech-energy-grants">
                      <FileText className="w-4 h-4 mr-2" />
                      Read Complete Guide
                    </Link>
                  </Button>
                  <Button variant="outline" className="border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50" asChild>
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
