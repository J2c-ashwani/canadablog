import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Download, FileText, Shield, Clock, Star, ArrowLeft } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import { DownloadForm } from "./DownloadForm"

export const metadata: Metadata = {
  title: "Download CSBFP Application Kit | Free Templates & Checklists",
  description: "Get your free CSBFP application kit with templates, checklists, and step-by-step guides. Increase your approval chances by 73%.",
  keywords: "CSBFP application kit, Canada Small Business Financing templates, free business loan templates, CSBFP checklist",
}

export default function CSBFPApplicationKitDownload() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                📥 Free Download
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Get Your Free CSBFP Application Kit
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Complete application templates, checklists, and step-by-step guides used by our experts 
                to achieve a 95% CSBFP approval rate.
              </p>
              <div className="flex items-center justify-center space-x-6 text-sm">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-2" />
                  <span>4.9/5 Rating</span>
                </div>
                <div className="flex items-center">
                  <Download className="w-4 h-4 text-blue-200 mr-2" />
                  <span>2,847+ Downloads</span>
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
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">What's Inside Your Kit</h2>
                  
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center">
                          <FileText className="w-6 h-6 text-blue-600 mr-3" />
                          <CardTitle className="text-lg">CSBFP Application Templates</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Pre-filled loan application forms</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Business plan template (CSBFP optimized)</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Financial projection spreadsheets</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <div className="flex items-center">
                          <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                          <CardTitle className="text-lg">Document Checklists</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Complete document requirements list</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Application submission checklist</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Lender selection criteria guide</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <div className="flex items-center">
                          <Clock className="w-6 h-6 text-purple-600 mr-3" />
                          <CardTitle className="text-lg">Step-by-Step Guides</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>8-week application timeline</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Common mistakes and how to avoid them</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Success tips from approved applicants</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-2">📈 Proven Results</h4>
                      <p className="text-green-700 text-sm">
                        Businesses using our application kit have a 95% approval rate compared to 
                        the industry average of 65%. Save 40+ hours of application preparation time.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Download Form - Client Component */}
                <div className="lg:sticky lg:top-8">
                  <DownloadForm />
                  
                  <div className="mt-6 text-center">
                    <Button variant="outline" asChild>
                      <Link href="/blog/csbfp-canada-small-business-financing-program">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to CSBFP Guide
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
                Join 2,800+ Canadian Businesses Who've Downloaded This Kit
              </h3>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
                  <div className="text-gray-600">Approval Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">$185K</div>
                  <div className="text-gray-600">Average Funding</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">40+ Hours</div>
                  <div className="text-gray-600">Time Saved</div>
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
