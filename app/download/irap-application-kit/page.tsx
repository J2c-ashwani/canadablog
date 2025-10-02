import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Download, FileText, Shield, Clock, Star, ArrowLeft, Lightbulb, Code, Zap } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import { DownloadForm } from "./DownloadForm"

export const metadata: Metadata = {
  title: "Download IRAP Application Kit | Free R&D Grant Templates & Guides",
  description: "Get your free IRAP application kit with technical templates, project frameworks, and step-by-step R&D grant guides. Increase your approval chances by 89%.",
  keywords: "IRAP application kit, Canada R&D grant templates, free tech grant templates, IRAP project framework, NRC funding guide",
}

export default function IRAPApplicationKitDownload() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🔬 Free R&D Kit
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Get Your Free IRAP Application Kit
              </h1>
              <p className="text-xl text-emerald-100 mb-8">
                Complete R&D grant templates, technical frameworks, and project guides used by our experts 
                to achieve an 89% IRAP approval rate for Canadian tech companies.
              </p>
              <div className="flex items-center justify-center space-x-6 text-sm">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-2" />
                  <span>4.9/5 Rating</span>
                </div>
                <div className="flex items-center">
                  <Download className="w-4 h-4 text-emerald-200 mr-2" />
                  <span>1,847+ Downloads</span>
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
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">What's Inside Your R&D Kit</h2>
                  
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center">
                          <Lightbulb className="w-6 h-6 text-emerald-600 mr-3" />
                          <CardTitle className="text-lg">Technical Proposal Templates</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>R&D project description framework</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Technical methodology templates</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Innovation assessment worksheet</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Risk mitigation planning guide</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <div className="flex items-center">
                          <Code className="w-6 h-6 text-blue-600 mr-3" />
                          <CardTitle className="text-lg">Project Planning Tools</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>R&D milestone planning template</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Budget allocation spreadsheet</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Team role definition matrix</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Project timeline generator</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <div className="flex items-center">
                          <Zap className="w-6 h-6 text-purple-600 mr-3" />
                          <CardTitle className="text-lg">Commercialization Strategy</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Market analysis template</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Competitive landscape worksheet</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>IP strategy planning guide</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Revenue model calculator</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <div className="flex items-center">
                          <FileText className="w-6 h-6 text-orange-600 mr-3" />
                          <CardTitle className="text-lg">Expert Guidelines & Checklists</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>ITA engagement strategy guide</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Technical review preparation checklist</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Common mistakes avoidance list</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Success factors analysis framework</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                      <h4 className="font-semibold text-emerald-800 mb-2">🚀 Proven Results</h4>
                      <p className="text-emerald-700 text-sm">
                        Canadian tech companies using our IRAP application kit have an 89% approval rate compared to 
                        the industry average of 52%. Average funding secured: $320K per project.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Download Form - Client Component */}
                <div className="lg:sticky lg:top-8">
                  <DownloadForm />
                  
                  <div className="mt-6 text-center">
                    <Button variant="outline" asChild>
                      <Link href="/blog/irap-industrial-research-assistance-program">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to IRAP Guide
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
                Join 1,800+ Canadian Tech Companies Who've Downloaded This Kit
              </h3>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">89%</div>
                  <div className="text-gray-600">Approval Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">$320K</div>
                  <div className="text-gray-600">Average R&D Funding</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">60+ Hours</div>
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
