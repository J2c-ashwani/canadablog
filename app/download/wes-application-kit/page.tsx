import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Download, FileText, Shield, Clock, Star, ArrowLeft, Heart, Award, Users } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import { DownloadForm } from "./DownloadForm"

export const metadata: Metadata = {
  title: "Download Women Entrepreneurship Strategy Kit | Free Female Business Grant Templates Canada",
  description: "Get your free WES application kit with female business grant templates, women entrepreneur funding guides, and step-by-step WES funding strategies. Increase your approval chances by 84%.",
  keywords: "WES application kit, women entrepreneurship strategy templates, female business grant templates Canada, women entrepreneur funding guide, free women business funding kit, WES grant application templates",
}

export default function WESApplicationKitDownload() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-rose-600 to-pink-700 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                👩‍💼 Free Women's Funding Kit
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Get Your Free Women Entrepreneurship Strategy Kit
              </h1>
              <p className="text-xl text-rose-100 mb-8">
                Complete female business funding templates, WES application frameworks, and women entrepreneur 
                strategies used by our experts to achieve an 84% approval rate for Canadian women-owned businesses.
              </p>
              <div className="flex items-center justify-center space-x-6 text-sm">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-2" />
                  <span>4.9/5 Rating</span>
                </div>
                <div className="flex items-center">
                  <Download className="w-4 h-4 text-rose-200 mr-2" />
                  <span>3,247+ Women Downloaded</span>
                </div>
                <div className="flex items-center">
                  <Shield className="w-4 h-4 text-green-400 mr-2" />
                  <span>100% Secure</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Kit Contents */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">What's Inside Your Women's Funding Kit</h2>
                  
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center">
                          <Heart className="w-6 h-6 text-rose-600 mr-3" />
                          <CardTitle className="text-lg">WES Application Templates</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Women Entrepreneurship Fund application forms</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Women Entrepreneurship Loan Fund templates</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Female leadership business plan framework</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Women ownership verification documents</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <div className="flex items-center">
                          <Award className="w-6 h-6 text-purple-600 mr-3" />
                          <CardTitle className="text-lg">Female Business Funding Strategies</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Women entrepreneur market positioning guide</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Female leadership narrative development</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Gender-inclusive financial projections</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Women-focused impact measurement framework</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <div className="flex items-center">
                          <Users className="w-6 h-6 text-blue-600 mr-3" />
                          <CardTitle className="text-lg">Women Business Network Resources</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Provincial women entrepreneur organizations directory</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Female business mentor connection guide</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Women investor network contact list</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Female entrepreneur event calendar</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <div className="flex items-center">
                          <FileText className="w-6 h-6 text-green-600 mr-3" />
                          <CardTitle className="text-lg">Provincial Women's Program Guides</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Ontario Women's Enterprise Organizations guide</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Quebec female entrepreneur program details</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>BC Women's Enterprise Centre application tips</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Alberta women business support roadmap</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <div className="bg-rose-50 border border-rose-200 rounded-lg p-4">
                      <h4 className="font-semibold text-rose-800 mb-2">👩‍💼 Proven Results for Women Entrepreneurs</h4>
                      <p className="text-rose-700 text-sm">
                        Canadian women-owned businesses using our WES application kit have an 84% approval rate compared to 
                        the industry average of 47%. Average female business funding secured: $42K per application.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Download Form - Client Component */}
                <div className="lg:sticky lg:top-8">
                  <DownloadForm />
                  
                  <div className="mt-6 text-center">
                    <Button variant="outline" asChild>
                      <Link href="/blog/women-entrepreneurship-strategy-canada">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to WES Guide
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">
                Join 3,200+ Canadian Women Entrepreneurs Who've Downloaded This Kit
              </h3>
              
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-rose-600 mb-2">84%</div>
                  <div className="text-gray-600">Women's Approval Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-600 mb-2">$42K</div>
                  <div className="text-gray-600">Average Female Funding</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">50+ Hours</div>
                  <div className="text-gray-600">Time Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">15,000+</div>
                  <div className="text-gray-600">Women Businesses Funded</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Women Entrepreneur Success Stories */}
        <section className="py-16 bg-rose-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Success Stories from Canadian Women Entrepreneurs
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-rose-200">
                  <CardContent className="p-6">
                    <div className="flex items-start mb-4">
                      <div className="bg-rose-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                        <Heart className="w-6 h-6 text-rose-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Sarah M. - Toronto Tech Startup</h4>
                        <p className="text-sm text-gray-600">Women-owned SaaS company</p>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm italic">
                      "The WES application kit helped me secure $75K from the Women Entrepreneurship Fund. 
                      The female leadership templates were exactly what I needed to position my tech startup."
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-pink-200">
                  <CardContent className="p-6">
                    <div className="flex items-start mb-4">
                      <div className="bg-pink-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                        <Award className="w-6 h-6 text-pink-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Maria L. - Vancouver Retail</h4>
                        <p className="text-sm text-gray-600">Indigenous women entrepreneur</p>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm italic">
                      "As an Indigenous woman entrepreneur, the provincial program guides connected me with 
                      BC Women's Enterprise Centre. Got $35K loan plus mentorship!"
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
