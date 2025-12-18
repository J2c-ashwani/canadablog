import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Download, FileText, Shield, Clock, Star, ArrowLeft, Zap, TrendingUp, Users } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import { DownloadForm } from "./DownloadForm"

export const metadata: Metadata = {
  title: "Download Youth Entrepreneurship Kit | Free CYBF & Young Entrepreneur Grant Templates Canada",
  description: "Get your free youth entrepreneurship kit with CYBF application templates, young entrepreneur funding guides, and step-by-step strategies. Increase your approval chances by 78%.",
  keywords: "youth entrepreneurship kit, CYBF application templates, young entrepreneur grant templates Canada, free youth business funding kit, Futurpreneur application guide, Canadian youth business templates",
}

export default function YouthEntrepreneurshipKitDownload() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🧑‍💼 Free Youth Funding Kit
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Get Your Free Youth Entrepreneurship Kit
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Complete CYBF application templates, young entrepreneur funding strategies, and youth business 
                development guides used by our experts to achieve a 78% approval rate for Canadian entrepreneurs aged 18-35.
              </p>
              <div className="flex items-center justify-center space-x-6 text-sm">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-2" />
                  <span>4.8/5 Rating</span>
                </div>
                <div className="flex items-center">
                  <Download className="w-4 h-4 text-blue-200 mr-2" />
                  <span>4,127+ Young Entrepreneurs</span>
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
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">What's Inside Your Youth Funding Kit</h2>
                  
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center">
                          <Zap className="w-6 h-6 text-blue-600 mr-3" />
                          <CardTitle className="text-lg">CYBF Application Templates</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Complete CYBF loan application forms</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Young entrepreneur business plan template</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Character reference letter templates</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Financial projection worksheets</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <div className="flex items-center">
                          <TrendingUp className="w-6 h-6 text-indigo-600 mr-3" />
                          <CardTitle className="text-lg">Youth Funding Strategy Guides</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Futurpreneur application roadmap</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Provincial youth program selector</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Young entrepreneur positioning framework</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Character assessment preparation guide</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <div className="flex items-center">
                          <Users className="w-6 h-6 text-purple-600 mr-3" />
                          <CardTitle className="text-lg">Young Entrepreneur Networks</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>National young entrepreneur organization directory</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>University startup incubator list</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Youth-focused mentor matching guide</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Young professional networking events calendar</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <div className="flex items-center">
                          <FileText className="w-6 h-6 text-green-600 mr-3" />
                          <CardTitle className="text-lg">Provincial Youth Program Guides</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Ontario Summer Company application guide</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Quebec young entrepreneur funding roadmap</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>BC youth business development resources</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Alberta young professional business support</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">🚀 Proven Results for Young Entrepreneurs</h4>
                      <p className="text-blue-700 text-sm">
                        Young Canadian entrepreneurs using our youth funding kit have a 78% approval rate compared to 
                        the industry average of 42%. Average youth funding secured: $28K per application.
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-4">
                      <h4 className="font-semibold text-indigo-800 mb-2">🎓 Perfect for Students & New Grads</h4>
                      <p className="text-indigo-700 text-sm">
                        Specifically designed for Canadian entrepreneurs aged 18-35, including students, recent graduates, 
                        and early-career professionals starting their first business.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Download Form - Client Component */}
                <div className="lg:sticky lg:top-8">
                  <DownloadForm />
                  
                  <div className="mt-6 text-center">
                    <Button variant="outline" asChild>
                      <Link href="/blog/youth-entrepreneurship-canada-funding">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Youth Funding Guide
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
                Join 4,100+ Canadian Young Entrepreneurs Who've Downloaded This Kit
              </h3>
              
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">78%</div>
                  <div className="text-gray-600">Youth Approval Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">$28K</div>
                  <div className="text-gray-600">Average Youth Funding</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">45+ Hours</div>
                  <div className="text-gray-600">Time Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">25,000+</div>
                  <div className="text-gray-600">Young Businesses Funded</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Young Entrepreneur Success Stories */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Success Stories from Canadian Young Entrepreneurs
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-blue-200">
                  <CardContent className="p-6">
                    <div className="flex items-start mb-4">
                      <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                        <Zap className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Alex K. - Calgary Tech Startup</h4>
                        <p className="text-sm text-gray-600">Age 23, Software Development</p>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm italic">
                      "The CYBF templates were game-changing! Got $40K for my app development startup. 
                      The character assessment prep helped me present my vision confidently."
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-indigo-200">
                  <CardContent className="p-6">
                    <div className="flex items-start mb-4">
                      <div className="bg-indigo-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                        <TrendingUp className="w-6 h-6 text-indigo-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Maya P. - Montreal E-commerce</h4>
                        <p className="text-sm text-gray-600">Age 26, Recent Graduate</p>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm italic">
                      "As a recent grad with no business experience, the youth positioning framework 
                      helped me turn my 'inexperience' into an advantage. Secured $25K through Futurpreneur!"
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
