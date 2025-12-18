import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Download, Calendar, MessageSquare, FileText, Globe, Target, Rocket } from "lucide-react"
import Link from "next/link"

export default function EDCDownloadThankYouPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-teal-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-teal-600" />
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Your EDC Export Financing Toolkit is On Its Way!
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                Check your email for instant access to the EDC Women in Trade Export Financing Guide. 
                If you don't see it in a few minutes, check your spam folder.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-teal-700 flex items-center">
                      <Globe className="w-5 h-5 mr-2" />
                      Next Step 1
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Use the Export Readiness Assessment Tool to evaluate your international market readiness and identify target export markets for expansion.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-teal-700 flex items-center">
                      <FileText className="w-5 h-5 mr-2" />
                      Next Step 2
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Complete the Export Market Entry Strategy using the EDC-specific framework and international market research templates included in your toolkit.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-teal-700 flex items-center">
                      <MessageSquare className="w-5 h-5 mr-2" />
                      Next Step 3
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Book your complimentary 30-minute EDC export financing consultation with our women exporter financing specialists.</p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-teal-50 border border-teal-200 p-6 rounded-lg mb-8">
                <h3 className="font-bold text-teal-800 mb-4">Ready for Expert EDC Export Financing Support?</h3>
                <p className="text-teal-700 mb-4">
                  Our women exporter financing specialists have helped secure $22M+ in EDC export financing with an 87% success rate. 
                  Get professional guidance for export readiness, market entry strategy, and EDC Women in Trade application optimization.
                </p>
                <Button size="lg" className="bg-teal-600 hover:bg-teal-700" asChild>
                  <Link href="/contact?service=edc-women-trade-export-financing-help&source=download-thank-you">
                    Schedule Free EDC Export Strategy Call
                  </Link>
                </Button>
              </div>

              <div className="text-center">
                <p className="text-gray-600 mb-4">Continue exploring women entrepreneur export financing opportunities:</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" asChild>
                    <Link href="/blog/edc-women-trade-export-financing">
                      Read Complete EDC Blog Post
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/canada/women-business-grants">
                      Explore All Women Business Grants
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/guides/edc-women-trade-export-financing-guide">
                      View EDC Application Guide
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
