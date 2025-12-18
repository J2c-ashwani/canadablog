import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Download, Calendar, MessageSquare, FileText, MapPin, Building } from "lucide-react"
import Link from "next/link"

export default function RDARegionalDownloadThankYouPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-purple-600" />
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Your RDA Regional Toolkit is On Its Way!
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                Check your email for instant access to the RDA Regional Application Toolkit. 
                If you don't see it in a few minutes, check your spam folder.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-purple-700 flex items-center">
                      <MapPin className="w-5 h-5 mr-2" />
                      Next Step 1
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Use the RDA Agency Selection Guide to confirm the best regional agency for your business and project.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-purple-700 flex items-center">
                      <FileText className="w-5 h-5 mr-2" />
                      Next Step 2
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Complete the Regional Priority Alignment Matrix to ensure your project matches regional economic objectives.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-purple-700 flex items-center">
                      <MessageSquare className="w-5 h-5 mr-2" />
                      Next Step 3
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Book your complimentary 30-minute RDA strategy consultation with our regional development experts.</p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-purple-50 border border-purple-200 p-6 rounded-lg mb-8">
                <h3 className="font-bold text-purple-800 mb-4">Ready for Expert RDA Regional Support?</h3>
                <p className="text-purple-700 mb-4">
                  Our regional development specialists have secured $45M+ in RDA funding across all 7 agencies with an 88% success rate. 
                  Get professional guidance for your RDA application and regional strategy.
                </p>
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700" asChild>
                  <Link href="/contact?service=rda-regional-expert-help&source=download-thank-you">
                    Schedule Free RDA Regional Strategy Call
                  </Link>
                </Button>
              </div>

              <div className="text-center">
                <p className="text-gray-600 mb-4">Continue exploring Canadian regional development:</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" asChild>
                    <Link href="/blog/regional-development-agencies-government-grants">
                      Read Complete RDA Government Guide
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/canada/government-grants">
                      Explore All Federal Programs
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
