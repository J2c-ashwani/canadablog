import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Download, Calendar, MessageSquare, FileText } from "lucide-react"
import Link from "next/link"

export default function NSERCResearchGrantsDownloadThankYouPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-indigo-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-indigo-600" />
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Your NSERC Research Toolkit is On Its Way!
              </h1>

              <p className="text-xl text-gray-600 mb-8">
                Check your email for instant access to the NSERC Research Grants Application Toolkit.
                If you don't see it in a few minutes, check your spam folder.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-indigo-700 flex items-center">
                      <FileText className="w-5 h-5 mr-2" />
                      Next Step 1
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Review the I2I application templates to understand phase requirements and identify the right starting point for your research.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-indigo-700 flex items-center">
                      <Calendar className="w-5 h-5 mr-2" />
                      Next Step 2
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Use the Partnership Strategy Guide to identify potential industry collaborators and develop your technology transfer plan.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-indigo-700 flex items-center">
                      <MessageSquare className="w-5 h-5 mr-2" />
                      Next Step 3
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Book your complimentary 30-minute NSERC research strategy consultation with our university-industry partnership specialists.</p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-lg mb-8">
                <h3 className="font-bold text-indigo-800 mb-4">Ready for Expert NSERC Research Support?</h3>
                <p className="text-indigo-700 mb-4">
                  Our NSERC research specialists have secured $25M+ in funding with 92% success rate and extensive university-industry partnership connections.
                  Get professional guidance for your Natural Sciences & Engineering research applications.
                </p>
                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700" asChild>
                  <Link href="/contact?service=nserc-expert-help&source=download-thank-you">
                    Schedule Free NSERC Strategy Call
                  </Link>
                </Button>
              </div>

              <div className="text-center">
                <p className="text-gray-600 mb-4">Continue exploring Canadian research funding:</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" asChild>
                    <Link href="/blog/nserc-research-grants-canada">
                      Read Complete NSERC Guide
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/contact">
                      Explore Research Grants
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
