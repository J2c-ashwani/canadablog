import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Download, Calendar, MessageSquare, FileText } from "lucide-react"
import Link from "next/link"

export default function CanadaManufacturingFundingDownloadThankYouPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-gray-700" />
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Your Manufacturing Funding Toolkit is On Its Way!
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                Check your email for instant access to the Canada Manufacturing Funding Toolkit. 
                If you don't see it in a few minutes, check your spam folder.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-gray-800 flex items-center">
                      <FileText className="w-5 h-5 mr-2" />
                      Next Step 1
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Review the NGen and IRAP templates to determine which programs best fit your manufacturing automation needs.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-gray-800 flex items-center">
                      <Calendar className="w-5 h-5 mr-2" />
                      Next Step 2
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Use the ROI calculator to build your business case and quantify productivity improvements for your funding application.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-gray-800 flex items-center">
                      <MessageSquare className="w-5 h-5 mr-2" />
                      Next Step 3
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Book your complimentary 30-minute manufacturing funding strategy consultation with our Industry 4.0 specialists.</p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-gray-100 border border-gray-300 p-6 rounded-lg mb-8">
                <h3 className="font-bold text-gray-800 mb-4">Ready for Expert Manufacturing Funding Support?</h3>
                <p className="text-gray-700 mb-4">
                  Our manufacturing funding specialists have secured $120M+ with 82% success rate across NGen, IRAP, CDAP, 
                  and regional manufacturing programs. Get professional guidance for your automation and Industry 4.0 applications.
                </p>
                <Button size="lg" className="bg-gray-800 hover:bg-gray-900" asChild>
                  <Link href="/contact?service=manufacturing-expert-help&source=download-thank-you">
                    Schedule Free Manufacturing Strategy Call
                  </Link>
                </Button>
              </div>

              <div className="text-center">
                <p className="text-gray-600 mb-4">Continue exploring manufacturing funding:</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" asChild>
                    <Link href="/blog/canada-advanced-manufacturing-innovation-grants">
                      Read Complete Manufacturing Guide
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/canada/innovation-grants">
                      Explore Innovation Grants
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
