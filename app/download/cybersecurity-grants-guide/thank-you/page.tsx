import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Download, Sparkles, Calendar, Users, FileText, ArrowRight, Mail, Clock, Shield, Lock, Eye } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Success! Your Cybersecurity Grants Guide is Ready | GrantFinder Pro",
  description: "Your free cybersecurity grants guide with DOD SBIR templates is on its way. Check your email for instant access.",
}

export default function CybersecurityGrantsGuideDownloadThankYouPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              
              {/* Success Hero - Celebratory */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mb-6 shadow-lg">
                  <CheckCircle className="w-12 h-12 text-white" />
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  🎉 Success! Check Your Email
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-600 mb-6 max-w-2xl mx-auto">
                  Your free cybersecurity grants guide with DOD SBIR templates is on its way to your inbox.
                </p>

                {/* What to Expect Box */}
                <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 max-w-2xl mx-auto text-left">
                  <CardContent className="pt-6">
                    <div className="flex items-start mb-4">
                      <Mail className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-bold text-lg text-blue-900 mb-2">What to Expect</h3>
                        <ul className="space-y-2 text-sm text-blue-800">
                          <li className="flex items-start">
                            <Clock className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                            <span><strong>In 2 minutes:</strong> Email arrives with download link to your guide</span>
                          </li>
                          <li className="flex items-start">
                            <Download className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                            <span><strong>Inside the PDF:</strong> DOD SBIR templates, DHS programs, FedRAMP strategies</span>
                          </li>
                          <li className="flex items-start">
                            <Sparkles className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                            <span><strong>Bonus:</strong> Access to exclusive cybersecurity funding updates</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <p className="text-xs text-blue-700 mt-4 bg-blue-100 p-3 rounded-lg">
                      <strong>Don&apos;t see it?</strong> Check your spam/promotions folder. Add us to your contacts to ensure future emails arrive.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Primary CTA - Most Important Action */}
              <Card className="border-2 border-blue-500 bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-2xl mb-12">
                <CardContent className="pt-8 pb-8 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                      <Users className="w-8 h-8 text-blue-600" />
                    </div>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-3">
                    Want Expert Help With Your Cybersecurity Application?
                  </h2>
                  <p className="text-blue-100 text-lg mb-6 max-w-2xl mx-auto">
                    Our DOD SBIR cybersecurity specialists have helped security startups win millions in grants. Get a free 30-minute strategy call to review your project.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
                    <Button 
                      size="lg" 
                      className="bg-white text-blue-700 hover:bg-blue-50 font-bold text-lg px-8 py-6 shadow-lg"
                      asChild
                    >
                      <Link href="/contact?service=cybersecurity-grants-help&source=download-thank-you">
                        <Calendar className="w-5 h-5 mr-2" />
                        Schedule Free Strategy Call
                      </Link>
                    </Button>
                  </div>
                  <p className="text-sm text-blue-100">✓ No sales pitch • ✓ 30 minutes free • ✓ Actionable insights</p>
                </CardContent>
              </Card>

              {/* Next Steps Cards - Clear Priority */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Your Next Steps to Win Cybersecurity Grants
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  
                  <Card className="border-2 border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-6 h-6 text-blue-600" />
                        </div>
                        <Badge className="bg-blue-100 text-blue-800 text-xs">Step 1</Badge>
                      </div>
                      <CardTitle className="text-blue-700 text-lg">
                        Review the Templates
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">
                        Download your guide and review the DOD SBIR cybersecurity application templates and defense-specific frameworks.
                      </p>
                      <p className="text-xs text-blue-700 font-semibold">⏱️ Takes 30 minutes</p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-gray-200 hover:border-indigo-300 hover:shadow-lg transition-all">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                          <Shield className="w-6 h-6 text-indigo-600" />
                        </div>
                        <Badge className="bg-indigo-100 text-indigo-800 text-xs">Step 2</Badge>
                      </div>
                      <CardTitle className="text-indigo-700 text-lg">
                        Plan Compliance
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">
                        Use the FedRAMP and CMMC roadmaps to develop your compliance strategy, timeline, and budget for authorization.
                      </p>
                      <p className="text-xs text-indigo-700 font-semibold">⏱️ Takes 1-2 hours</p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Users className="w-6 h-6 text-purple-600" />
                        </div>
                        <Badge className="bg-purple-100 text-purple-800 text-xs">Step 3</Badge>
                      </div>
                      <CardTitle className="text-purple-700 text-lg">
                        Get Expert Review
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">
                        Schedule a strategy call to get personalized feedback on your cybersecurity approach and improve success rates.
                      </p>
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <Link href="/contact?service=cybersecurity-grants-help">
                          Book Strategy Call
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>

                </div>
              </div>

              {/* Social Proof */}
              <Card className="bg-green-50 border-2 border-green-200 mb-12">
                <CardContent className="pt-6">
                  <div className="text-center mb-4">
                    <div className="flex justify-center mb-3 -space-x-2">
                      <div className="w-12 h-12 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center text-white font-bold">J</div>
                      <div className="w-12 h-12 rounded-full bg-indigo-600 border-2 border-white flex items-center justify-center text-white font-bold">M</div>
                      <div className="w-12 h-12 rounded-full bg-purple-600 border-2 border-white flex items-center justify-center text-white font-bold">S</div>
                      <div className="w-12 h-12 rounded-full bg-blue-700 border-2 border-white flex items-center justify-center text-white font-bold text-sm">+350</div>
                    </div>
                    <p className="text-lg font-bold text-green-800 mb-2">Join 350+ Cyber Founders</p>
                    <p className="text-sm text-green-700">Who&apos;ve used this guide to prepare winning DOD SBIR cybersecurity applications</p>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Resources - Secondary Actions */}
              <div className="text-center bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Continue Exploring Cybersecurity Funding
                </h3>
                <p className="text-gray-600 mb-6">
                  Learn more about DOD SBIR cyber programs, DHS homeland security, and NSA research partnerships
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" className="border-2 border-blue-600 text-blue-700 hover:bg-blue-50" asChild>
                    <Link href="/blog/cybersecurity-grants">
                      <FileText className="w-4 h-4 mr-2" />
                      Read Full Guide
                    </Link>
                  </Button>
                  <Button variant="outline" className="border-2 border-indigo-600 text-indigo-700 hover:bg-indigo-50" asChild>
                    <Link href="/usa/technology-startup-grants">
                      <ArrowRight className="w-4 h-4 mr-2" />
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
