import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Download, Calendar, MessageSquare, FileText, Leaf, Building } from "lucide-react"
import Link from "next/link"

export default function AgricultureAgriFoodDownloadThankYouPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Your AAFC Agricultural Toolkit is On Its Way!
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                Check your email for instant access to the Agriculture & Agri-Food Canada Application Toolkit. 
                If you don't see it in a few minutes, check your spam folder.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-700 flex items-center">
                      <Leaf className="w-5 h-5 mr-2" />
                      Next Step 1
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Use the Agricultural Sector Strategy Guide to align your project with federal agricultural priorities and AAFC objectives.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-700 flex items-center">
                      <FileText className="w-5 h-5 mr-2" />
                      Next Step 2
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Complete the Federal Agricultural Compliance Checklist to ensure your application meets all AAFC requirements.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-700 flex items-center">
                      <MessageSquare className="w-5 h-5 mr-2" />
                      Next Step 3
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Book your complimentary 30-minute AAFC strategy consultation with our agricultural funding experts.</p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-green-50 border border-green-200 p-6 rounded-lg mb-8">
                <h3 className="font-bold text-green-800 mb-4">Ready for Expert AAFC Agricultural Support?</h3>
                <p className="text-green-700 mb-4">
                  Our agricultural funding specialists have secured $18M+ in AAFC funding with a 91% success rate. 
                  Get professional guidance for your Agriculture & Agri-Food Canada application and sector strategy.
                </p>
                <Button size="lg" className="bg-green-600 hover:bg-green-700" asChild>
                  <Link href="/contact?service=agriculture-agri-food-expert-help&source=download-thank-you">
                    Schedule Free AAFC Agricultural Strategy Call
                  </Link>
                </Button>
              </div>

              <div className="text-center">
                <p className="text-gray-600 mb-4">Continue exploring Canadian federal agricultural programs:</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" asChild>
                    <Link href="/blog/agriculture-agri-food-canada-government-grants">
                      Read Complete AAFC Government Guide
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
