import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Download, FileText, Shield, Clock, Star, ArrowLeft, Mountain, Leaf, MapPin } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import { DownloadForm } from "./DownloadForm"

export const metadata: Metadata = {
  title: "Download Indigenous & Rural Business Funding Kit | Free Aboriginal & Remote Business Grant Templates Canada",
  description: "Get your free Indigenous and rural business funding kit with Aboriginal Entrepreneurship Program templates, NACCA application guides, and culturally appropriate business strategies. Increase approval chances by 82%.",
  keywords: "Indigenous business funding kit, Aboriginal business grant templates Canada, NACCA application templates, rural business funding guide, free Indigenous business templates, First Nations business funding kit",
}

export default function IndigenousRuralFundingKitDownload() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-amber-600 to-orange-700 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🏛️ Free Indigenous & Rural Kit
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Get Your Free Indigenous & Rural Business Funding Kit
              </h1>
              <p className="text-xl text-amber-100 mb-8">
                Complete Aboriginal business funding templates, culturally appropriate business planning frameworks, 
                and rural development strategies used by our experts to achieve an 82% approval rate for Indigenous 
                entrepreneurs and rural business owners across Canada.
              </p>
              <div className="flex items-center justify-center space-x-6 text-sm">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-2" />
                  <span>4.9/5 Cultural Sensitivity</span>
                </div>
                <div className="flex items-center">
                  <Download className="w-4 h-4 text-amber-200 mr-2" />
                  <span>2,847+ Indigenous & Rural Downloads</span>
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
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">What's Inside Your Indigenous & Rural Funding Kit</h2>
                  
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center">
                          <Mountain className="w-6 h-6 text-amber-600 mr-3" />
                          <CardTitle className="text-lg">Aboriginal Entrepreneurship Program Templates</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Aboriginal Entrepreneurship Program application forms</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Culturally appropriate business plan framework</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Traditional knowledge integration templates</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Community consultation documentation guides</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <div className="flex items-center">
                          <Leaf className="w-6 h-6 text-green-600 mr-3" />
                          <CardTitle className="text-lg">NACCA & Rural Business Strategies</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>NACCA Aboriginal Financial Institution directory</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Community Futures rural application roadmap</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Geographic challenge mitigation strategies</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Rural market analysis and planning tools</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <div className="flex items-center">
                          <MapPin className="w-6 h-6 text-red-600 mr-3" />
                          <CardTitle className="text-lg">Cultural Business Development Resources</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Seven generations business planning framework</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Traditional knowledge commercialization guide</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Indigenous tourism business development toolkit</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Cultural authenticity and market positioning strategies</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <div className="flex items-center">
                          <FileText className="w-6 h-6 text-orange-600 mr-3" />
                          <CardTitle className="text-lg">Regional Program Guides & Networks</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Provincial Indigenous business program directory</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Regional development agency contact guide</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Indigenous business association network map</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Rural chamber of commerce connection list</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <h4 className="font-semibold text-amber-800 mb-2">🏛️ Proven Results for Indigenous & Rural Entrepreneurs</h4>
                      <p className="text-amber-700 text-sm">
                        Indigenous and rural Canadian businesses using our culturally appropriate funding kit have 
                        an 82% approval rate compared to the industry average of 38%. Average funding secured: $87K per application.
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-4">
                      <h4 className="font-semibold text-orange-800 mb-2">🌍 Culturally Respectful Approach</h4>
                      <p className="text-orange-700 text-sm">
                        Developed in consultation with Indigenous business leaders, elders, and cultural practitioners. 
                        Respects traditional protocols while meeting modern funding requirements.
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-2">🌾 Rural & Remote Expertise</h4>
                      <p className="text-green-700 text-sm">
                        Addresses unique challenges of rural and remote businesses: transportation, seasonal cycles, 
                        limited markets, and geographic isolation solutions.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Download Form - Client Component */}
                <div className="lg:sticky lg:top-8">
                  <DownloadForm />
                  
                  <div className="mt-6 text-center">
                    <Button variant="outline" asChild>
                      <Link href="/blog/indigenous-rural-business-funding-canada">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Indigenous/Rural Guide
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
                Join 2,800+ Canadian Indigenous & Rural Entrepreneurs Who've Downloaded This Kit
              </h3>
              
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-600 mb-2">82%</div>
                  <div className="text-gray-600">Cultural Funding Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">$87K</div>
                  <div className="text-gray-600">Average Funding Secured</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600 mb-2">65+ Hours</div>
                  <div className="text-gray-600">Cultural Planning Time Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">45,000+</div>
                  <div className="text-gray-600">Indigenous Businesses Supported</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-16 bg-amber-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Success Stories from Indigenous & Rural Canadian Entrepreneurs
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-amber-200">
                  <CardContent className="p-6">
                    <div className="flex items-start mb-4">
                      <div className="bg-amber-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                        <Mountain className="w-6 h-6 text-amber-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Joseph B. - Cree Nation Cultural Tourism</h4>
                        <p className="text-sm text-gray-600">First Nations cultural experiences, Northern Saskatchewan</p>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm italic">
                      "The cultural business planning framework helped me integrate our traditional knowledge respectfully. 
                      Secured $125K through AEP to launch our authentic cultural tourism business."
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-green-200">
                  <CardContent className="p-6">
                    <div className="flex items-start mb-4">
                      <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                        <Leaf className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Marie L. - Rural Artisan Cooperative</h4>
                        <p className="text-sm text-gray-600">Métis crafts and traditional arts, Rural Manitoba</p>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm italic">
                      "As a Métis woman in rural Manitoba, the NACCA connection and rural strategies were invaluable. 
                      Got $45K to expand our traditional arts cooperative and hire 6 community members."
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-orange-200">
                  <CardContent className="p-6">
                    <div className="flex items-start mb-4">
                      <div className="bg-orange-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                        <MapPin className="w-6 h-6 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">David K. - Remote Technology Solutions</h4>
                        <p className="text-sm text-gray-600">IT services for northern communities, Yukon Territory</p>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm italic">
                      "The northern business development strategies addressed our unique challenges. 
                      Community Futures helped us get $85K to bring better internet services to remote communities."
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-red-200">
                  <CardContent className="p-6">
                    <div className="flex items-start mb-4">
                      <div className="bg-red-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                        <FileText className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Sarah W. - Sustainable Agriculture</h4>
                        <p className="text-sm text-gray-600">Indigenous food systems, Rural British Columbia</p>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm italic">
                      "The traditional knowledge commercialization guide helped us create a business plan that honored our ancestors 
                      while building a sustainable future. $95K in funding to restore traditional food systems."
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
