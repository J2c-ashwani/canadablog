import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, DollarSign, Target, Clock, Building, Users, Zap } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ontario Small Business Grants 2025 | $2.1B+ Available for Ontario SMEs",
  description: "Complete guide to Ontario small business grants and funding. Access Ontario Small Business Support Grant, Digital Main Street, Jobs & Prosperity Fund, and provincial tax credits.",
  keywords: "Ontario small business grants, Ontario business funding, Ontario Small Business Support Grant, Digital Main Street program, Jobs and Prosperity Fund, Ontario Innovation Tax Credit",
}

export default function OntarioSmallBusinessGrantsGuide() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-red-600 to-orange-700 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30">
                🏢 Ontario Business Funding
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Ontario Small Business Grants 2025
              </h1>
              <p className="text-xl text-red-100 mb-8">
                Access $2.1B+ in Ontario government funding for small businesses. From startup grants 
                to growth funding - complete guide to Ontario's business support programs.
              </p>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-4" asChild>
                <Link href="/contact?service=ontario-business-grants-expert-help">
                  Get Expert Help with Ontario Grants
                </Link>
              </Button>
              <p className="text-red-200 text-sm mt-4">
                Free consultation • 87% Ontario success rate • Average funding secured: $67K
              </p>
            </div>
          </div>
        </section>

        {/* Key Statistics */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-red-600 mb-2">$2.1B+</div>
                  <div className="text-gray-600">Ontario SME Funding Available</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">45+</div>
                  <div className="text-gray-600">Active Ontario Programs</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">87%</div>
                  <div className="text-gray-600">Expert Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Major Ontario Programs */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Major Ontario Small Business Grants</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Ontario Small Business Support Grant */}
                <Card className="border-2 border-red-200">
                  <CardHeader>
                    <CardTitle className="text-red-700">Ontario Small Business Support Grant</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $20K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>All Industries</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Direct financial support for Ontario small businesses facing economic challenges.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Non-repayable funding</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Quick application process</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Covers operational expenses</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Jobs and Prosperity Fund */}
                <Card className="border-2 border-orange-200">
                  <CardHeader>
                    <CardTitle className="text-orange-700">Jobs and Prosperity Fund</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $5M</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Job Creation</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Major funding for significant business expansion and job creation projects in Ontario.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Large-scale expansion projects</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Strategic economic investments</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Significant job creation requirements</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Digital Main Street */}
                <Card className="border-2 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700">Digital Main Street Program</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $2.4K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Zap className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Digital Transformation</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Help Ontario small businesses go digital with grants and expert support services.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>E-commerce platform setup</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Digital skills training</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Online marketing support</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Ontario Innovation Tax Credit */}
                <Card className="border-2 border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-purple-700">Ontario Innovation Tax Credit</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>3.5% Credit</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Building className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>R&D Focus</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Refundable tax credit for R&D expenditures by Ontario corporations.
                    </p>
                    <ul className="space-y-2 mb-4 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Refundable tax credit</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Innovation and R&D focus</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>Additional to federal credits</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Strong Single CTA Section */}
        <section className="py-20 bg-gradient-to-r from-red-600 to-orange-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-6">
                Don't Navigate Ontario Grants Alone
              </h2>
              <p className="text-xl text-red-100 mb-8">
                Ontario has $2.1B+ in funding, but the application process is complex. Our Ontario grant experts 
                have secured over $15M for local businesses with an 87% success rate. Get personalized guidance today.
              </p>
              <div className="bg-white/10 rounded-lg p-6 mb-8">
                <h4 className="font-semibold mb-4">Our Ontario Grant Success Package Includes:</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Complete Ontario program eligibility analysis</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Professional application writing and submission</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Provincial deadline management</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Follow-up and compliance support</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>87% success rate vs 31% DIY average</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Local Ontario team with deep program knowledge</span>
                  </div>
                </div>
              </div>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-4" asChild>
                <Link href="/contact?service=ontario-grants-expert-help">
                  Get Expert Help with Ontario Grants
                </Link>
              </Button>
              <p className="text-red-200 text-sm mt-4">
                Free consultation • No success, no full fee • Ontario grant specialists
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
