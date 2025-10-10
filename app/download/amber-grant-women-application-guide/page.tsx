import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Download, Shield, FileText, Target, Users, Calendar, Award } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Download Free Amber Grant Application Guide | Monthly $10K Grant Toolkit",
  description: "Get instant access to our Amber Grant application toolkit with monthly deadline tracker, essay templates, and winning strategies for $10,000 grants.",
  keywords: "Amber Grant application guide, women business grant toolkit, monthly grant tracker, essay templates",
}

export default function AmberGrantDownloadPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              
              {/* Header Section */}
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-amber-100 text-amber-800 border-amber-200">
                  🏆 Free Amber Grant Application Toolkit
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Get Your Free Amber Grant Application Guide
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Download our comprehensive Amber Grant application toolkit with monthly deadline tracker, 
                  essay templates, category selection guide, and proven strategies to win one of the three 
                  $10,000 monthly grants or $25,000 year-end award.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                
                {/* What's Included Section */}
                <Card className="border-amber-200 bg-white">
                  <CardHeader>
                    <CardTitle className="text-amber-700 text-2xl">
                      📦 What's Included in Your Free Amber Grant Toolkit:
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Monthly Application Deadline Tracker</strong>
                          <p className="text-sm text-gray-600">12-month calendar with submission deadlines and announcement dates for planning</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Essay Template & Structure Guide</strong>
                          <p className="text-sm text-gray-600">Proven essay framework with prompts and examples for compelling applications</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Grant Category Selection Tool</strong>
                          <p className="text-sm text-gray-600">Decision matrix to choose between Monthly, Startup, and Category grants</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Business Dream Articulation Worksheet</strong>
                          <p className="text-sm text-gray-600">Step-by-step guide to clearly communicate your business vision and passion</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">$10,000 Use Planning Template</strong>
                          <p className="text-sm text-gray-600">Framework for explaining specific grant fund allocation and business impact</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Application Checklist</strong>
                          <p className="text-sm text-gray-600">Complete submission requirements with verification before you apply</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Winner Success Stories Analysis</strong>
                          <p className="text-sm text-gray-600">Case studies of GloveStix and other recipients with winning strategies</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Common Mistakes to Avoid Guide</strong>
                          <p className="text-sm text-gray-600">Learn from unsuccessful applications and what judges look for</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Shield className="w-5 h-5 text-amber-600 mr-2" />
                        <strong className="text-amber-800">Bonus Resources Included:</strong>
                      </div>
                      <ul className="text-sm text-amber-700 space-y-1">
                        <li>• $15 application fee budget planning</li>
                        <li>• Year-end $25K award eligibility tracker</li>
                        <li>• Reapplication strategy for non-winners</li>
                        <li>• Alternative women business grants list</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Lead Capture Form */}
                <div>
                  <Card className="border-orange-200 bg-white sticky top-4">
                    <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-700 text-white rounded-t-lg">
                      <CardTitle className="text-2xl flex items-center">
                        <Download className="w-6 h-6 mr-2" />
                        Download Your Free Guide Now
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <form action="/download/amber-grant-women-application-guide/thank-you" method="GET" className="space-y-4">
                        
                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Full Name *
                          </label>
                          <input 
                            type="text" 
                            name="name"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                            placeholder="Jane Smith"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Business Email *
                          </label>
                          <input 
                            type="email" 
                            name="email"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                            placeholder="jane@yourbusiness.com"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Company Name
                          </label>
                          <input 
                            type="text"
                            name="company"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                            placeholder="Your Business Name"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Business Stage
                          </label>
                          <select 
                            name="stage"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                          >
                            <option value="">Select your stage</option>
                            <option value="idea">Idea/Pre-launch</option>
                            <option value="startup">Startup (0-2 years)</option>
                            <option value="growth">Growth (2-5 years)</option>
                            <option value="established">Established (5+ years)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Application Timeline
                          </label>
                          <select 
                            name="timeline"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                          >
                            <option value="">When are you applying?</option>
                            <option value="this-month">This month</option>
                            <option value="next-month">Next month</option>
                            <option value="3-months">Within 3 months</option>
                            <option value="researching">Just researching</option>
                          </select>
                        </div>

                        <div className="flex items-start pt-2">
                          <input 
                            type="checkbox" 
                            id="consent"
                            name="consent"
                            required 
                            className="mt-1 mr-3"
                          />
                          <label htmlFor="consent" className="text-xs text-gray-600">
                            I agree to receive the Amber Grant application guide and occasional women entrepreneur 
                            grant opportunities. You can unsubscribe anytime. We respect your privacy.
                          </label>
                        </div>

                        <Button 
                          type="submit" 
                          className="w-full bg-gradient-to-r from-amber-500 to-orange-700 hover:from-amber-600 hover:to-orange-800 text-white font-semibold py-4 text-lg"
                        >
                          <Download className="w-5 h-5 mr-2" />
                          Get Instant Access to Amber Grant Guide
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
                      <div className="text-2xl font-bold text-amber-600">4,800+</div>
                      <div className="text-xs text-gray-600">Downloads</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">Monthly</div>
                      <div className="text-xs text-gray-600">Opportunities</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-orange-600">$10M+</div>
                      <div className="text-xs text-gray-600">Awarded</div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Additional Benefits */}
              <div className="mt-12 bg-white rounded-lg shadow-sm p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Why Women Entrepreneurs Choose Our Amber Grant Application Guide
                </h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calendar className="w-8 h-8 text-amber-600" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Monthly Deadline Tracking</h4>
                    <p className="text-sm text-gray-600">
                      Never miss a submission deadline with our 12-month calendar and reminder system
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Proven Essay Templates</h4>
                    <p className="text-sm text-gray-600">
                      Based on actual winner essays and what judges look for in compelling applications
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-blue-600" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Expert Support Available</h4>
                    <p className="text-sm text-gray-600">
                      Access to grant specialists who can review your essay and optimize your application
                    </p>
                  </div>
                </div>
              </div>

              {/* Related Resources */}
              <div className="mt-12 text-center">
                <p className="text-gray-600 mb-4">Want to learn more about Amber Grant before downloading?</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" asChild>
                    <Link href="/blog/amber-grant-women-canada">
                      Read Complete Amber Grant Guide
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/canada/women-business-grants">
                      Explore More Women Business Grants
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
