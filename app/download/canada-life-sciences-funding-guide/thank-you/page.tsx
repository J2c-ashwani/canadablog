import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Download, Calendar, MessageSquare, FileText } from "lucide-react"
import Link from "next/link"

export default function CanadaLifeSciencesFundingDownloadThankYouPage() {
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
                Your Life Sciences Funding Toolkit is On Its Way!
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                Check your email for instant access to the Canada Life Sciences Grants Application Toolkit. 
                If you don't see it in a few minutes, check your spam folder.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-teal-700 flex items-center">
                      <FileText className="w-5 h-5 mr-2" />
                      Next Step 1
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Review the IRAP biotech templates and clinical trials checklists to determine which life sciences programs match your development stage.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-teal-700 flex items-center">
                      <Calendar className="w-5 h-5 mr-2" />
                      Next Step 2
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Use the medical device regulatory tools and biomanufacturing calculators to build your funding application and regulatory strategy.</p>
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
                    <p className="text-gray-600">Book your complimentary 30-minute life sciences funding strategy consultation with our biotech grant specialists.</p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-teal-50 border border-teal-200 p-6 rounded-lg mb-8">
                <h3 className="font-bold text-teal-800 mb-4">Ready for Expert Life Sciences Funding Support?</h3>
                <p className="text-teal-700 mb-4">
                  Our life sciences funding specialists have secured $95M+ with 76% success rate across IRAP biotech, 
                  clinical trials, medical device programs, and biomanufacturing initiatives. Get professional guidance for your drug development and health technology applications.
                </p>
                <Button size="lg" className="bg-teal-600 hover:bg-teal-700" asChild>
                  <Link href="/contact?service=lifesciences-expert-help&source=download-thank-you">
                    Schedule Free Life Sciences Strategy Call
                  </Link>
                </Button>
              </div>

              <div className="text-center">
                <p className="text-gray-600 mb-4">Continue exploring life sciences funding:</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" asChild>
                    <Link href="/blog/canada-life-sciences-innovation-grants">
                      Read Complete Life Sciences Guide
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/canada/innovation-grants">
                      Explore All Innovation Grants
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
