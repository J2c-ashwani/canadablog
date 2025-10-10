import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Download, Shield, FileText, Target, Users, Calendar, Award } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Download Free RBC Awards Nomination Guide | Women Entrepreneur Recognition Toolkit",
  description: "Get instant access to our RBC Canadian Women Entrepreneur Awards nomination toolkit with category selection tool, eligibility checklist, and winning strategies.",
  keywords: "RBC Women Entrepreneur Awards guide, nomination toolkit, business awards Canada, women recognition",
}

export default function RBCAwardsDownloadPage() {
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
                  🏆 Free RBC Awards Nomination Toolkit
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Get Your Free RBC Women Entrepreneur Awards Nomination Guide
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Download our comprehensive RBC Canadian Women Entrepreneur Awards nomination toolkit with 
                  category selection decision matrix, eligibility verification checklist, and proven strategies 
                  to win national recognition at Canada's premier women entrepreneur awards gala.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                
                {/* What's Included Section */}
                <Card className="border-blue-200 bg-white">
                  <CardHeader>
                    <CardTitle className="text-blue-700 text-2xl">
                      📦 What's Included in Your Free RBC Awards Toolkit:
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Category Selection Decision Matrix</strong>
                          <p className="text-sm text-gray-600">Interactive tool to match your business to the perfect award category from all 8 options</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Eligibility Verification Checklist</strong>
                          <p className="text-sm text-gray-600">Complete requirements breakdown by category with pass/fail assessment</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Nomination Form Template & Guide</strong>
                          <p className="text-sm text-gray-600">Section-by-section breakdown with what judges look for in winning nominations</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Impact Demonstration Framework</strong>
                          <p className="text-sm text-gray-600">Templates to articulate business achievements, growth metrics, and economic contribution</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Social Change Documentation Guide</strong>
                          <p className="text-sm text-gray-600">Framework for Regional and National Social Change award applications</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Growth Metrics Calculation Worksheets</strong>
                          <p className="text-sm text-gray-600">Tools for Momentum Award 10%+ yearly growth documentation</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Application Timeline Planner</strong>
                          <p className="text-sm text-gray-600">March 21 deadline countdown with document preparation schedule</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <strong className="text-gray-900">Past Winner Success Analysis</strong>
                          <p className="text-sm text-gray-600">Case studies showing what made previous recipients stand out</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Shield className="w-5 h-5 text-blue-600 mr-2" />
                        <strong className="text-blue-800">Bonus Resources Included:</strong>
                      </div>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• November 14, 2025 gala preparation guide</li>
                        <li>• Self-nomination vs third-party strategy</li>
                        <li>• Financial statement requirements by category</li>
                        <li>• Women of Influence+ networking opportunities</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Lead Capture Form */}
                <div>
                  <Card className="border-indigo-200 bg-white sticky top-4">
                    <CardHeader className="bg-gradient-to-r from-blue-700 to-indigo-900 text-white rounded-t-lg">
                      <CardTitle className="text-2xl flex items-center">
                        <Download className="w-6 h-6 mr-2" />
                        Download Your Free Guide Now
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <form action="/download/rbc-women-entrepreneur-awards-guide/thank-you" method="GET" className="space-y-4">
                        
                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Full Name *
                          </label>
                          <input 
                            type="text" 
                            name="name"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Your Business Name"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Business Age
                          </label>
                          <select 
                            name="age"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="">Select business age</option>
                            <option value="1-3">1-3 years (Ones to Watch)</option>
                            <option value="3-5">3-5 years (Start-Up)</option>
                            <option value="5-10">5-10 years</option>
                            <option value="10+">10+ years (Excellence)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Annual Revenue Range
                          </label>
                          <select 
                            name="revenue"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="">Select revenue</option>
                            <option value="under-1m">Under $1M (Micro-Business)</option>
                            <option value="1-5m">$1M - $5M</option>
                            <option value="5-25m">$5M - $25M</option>
                            <option value="25m+">$25M+ (Excellence)</option>
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
                            I agree to receive the RBC Awards nomination guide and occasional women entrepreneur 
                            recognition opportunities. You can unsubscribe anytime. We respect your privacy.
                          </label>
                        </div>

                        <Button 
                          type="submit" 
                          className="w-full bg-gradient-to-r from-blue-700 to-indigo-900 hover:from-blue-800 hover:to-indigo-950 text-white font-semibold py-4 text-lg"
                        >
                          <Download className="w-5 h-5 mr-2" />
                          Get Instant Access to RBC Awards Guide
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
                      <div className="text-2xl font-bold text-blue-600">33rd</div>
                      <div className="text-xs text-gray-600">Annual Awards</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-indigo-600">8</div>
                      <div className="text-xs text-gray-600">Categories</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">National</div>
                      <div className="text-xs text-gray-600">Recognition</div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Additional Benefits */}
              <div className="mt-12 bg-white rounded-lg shadow-sm p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Why Entrepreneurs Choose Our RBC Awards Nomination Guide
                </h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target className="w-8 h-8 text-blue-600" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Perfect Category Match</h4>
                    <p className="text-sm text-gray-600">
                      Decision matrix ensures you apply to the category where you have the strongest chance of winning
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-8 h-8 text-indigo-600" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Judge-Ready Applications</h4>
                    <p className="text-sm text-gray-600">
                      Templates based on what independent judging panels look for in winning nominations
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Expert Nomination Support</h4>
                    <p className="text-sm text-gray-600">
                      Access to awards specialists who can review your nomination and optimize for selection
                    </p>
                  </div>
                </div>
              </div>

              {/* Related Resources */}
              <div className="mt-12 text-center">
                <p className="text-gray-600 mb-4">Want to learn more about RBC Awards before downloading?</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" asChild>
                    <Link href="/blog/rbc-women-entrepreneur-awards">
                      Read Complete RBC Awards Guide
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
