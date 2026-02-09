import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Download, Calendar, MessageSquare, FileText, Zap, Users } from "lucide-react"
import Link from "next/link"

export default function AlbertaBusinessGrantsDownloadThankYouPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-orange-600" />
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Your Alberta Business Grants Toolkit is On Its Way!
              </h1>

              <p className="text-xl text-gray-600 mb-8">
                Check your email for instant access to the Alberta Business Grants Application Toolkit.
                If you don't see it in a few minutes, check your spam folder.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-orange-700 flex items-center">
                      <Zap className="w-5 h-5 mr-2" />
                      Next Step 1
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Use the Alberta Program Selection Guide to identify the best provincial funding program for your energy innovation and sector.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-orange-700 flex items-center">
                      <FileText className="w-5 h-5 mr-2" />
                      Next Step 2
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Complete the Clean Technology Development Framework to demonstrate your emission reduction and environmental impact.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-orange-700 flex items-center">
                      <MessageSquare className="w-5 h-5 mr-2" />
                      Next Step 3
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Book your complimentary 30-minute Alberta energy innovation strategy consultation with our provincial funding experts.</p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-orange-50 border border-orange-200 p-6 rounded-lg mb-8">
                <h3 className="font-bold text-orange-800 mb-4">Ready for Expert Alberta Energy Innovation Support?</h3>
                <p className="text-orange-700 mb-4">
                  Our Alberta energy innovation funding specialists have secured $11M+ in provincial funding with an 84% success rate.
                  Get professional guidance for your Alberta provincial application and clean technology development.
                </p>
                <Button size="lg" className="bg-orange-600 hover:bg-orange-700" asChild>
                  <Link href="/contact?service=alberta-business-expert-help&source=download-thank-you">
                    Schedule Free Alberta Strategy Call
                  </Link>
                </Button>
              </div>

              <div className="text-center">
                <p className="text-gray-600 mb-4">Continue exploring Alberta provincial business support:</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" asChild>
                    <Link href="/blog/alberta-business-grants-2025">
                      Read Complete Alberta Government Guide
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/canada/government-grants">
                      Explore All Government Programs
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
