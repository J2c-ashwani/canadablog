import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Download, Calendar, MessageSquare, FileText, Heart, Users, Target } from "lucide-react"
import Link from "next/link"

export default function WELFDownloadThankYouPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-pink-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-pink-600" />
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Your WELF Application Toolkit is On Its Way!
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                Check your email for instant access to the Women Entrepreneurship Loan Fund Application Guide. 
                If you don't see it in a few minutes, check your spam folder.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-pink-700 flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      Next Step 1
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Use the Delivery Partner Comparison to select the WELF organization that best matches your entrepreneur profile and business needs.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-pink-700 flex items-center">
                      <FileText className="w-5 h-5 mr-2" />
                      Next Step 2
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Complete the Business Plan Template using the WELF-specific framework and financial projection worksheets included in your toolkit.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-pink-700 flex items-center">
                      <MessageSquare className="w-5 h-5 mr-2" />
                      Next Step 3
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Book your complimentary 30-minute WELF strategy consultation with our women entrepreneur funding specialists.</p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-pink-50 border border-pink-200 p-6 rounded-lg mb-8">
                <h3 className="font-bold text-pink-800 mb-4">Ready for Expert WELF Application Support?</h3>
                <p className="text-pink-700 mb-4">
                  Our women entrepreneur funding specialists have helped secure $8M+ in WELF financing with an 89% success rate. 
                  Get professional guidance for partner selection, business plan development, and application optimization.
                </p>
                <Button size="lg" className="bg-pink-600 hover:bg-pink-700" asChild>
                  <Link href="/contact?service=welf-women-entrepreneur-expert-help&source=download-thank-you">
                    Schedule Free WELF Strategy Call
                  </Link>
                </Button>
              </div>

              <div className="text-center">
                <p className="text-gray-600 mb-4">Continue exploring women entrepreneur funding opportunities:</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" asChild>
                    <Link href="/blog/women-entrepreneurship-loan-fund-canada">
                      Read Complete WELF Blog Post
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/canada/women-business-grants">
                      Explore All Women Business Grants
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/guides/women-entrepreneurship-loan-fund-guide">
                      View WELF Application Guide
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
