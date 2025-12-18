import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Download, Calendar, MessageSquare, FileText, Rocket, Target, Zap } from "lucide-react"
import Link from "next/link"

export default function WEFDownloadThankYouPage() {
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
                Your WEF Grant Application Toolkit is On Its Way!
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                Check your email for instant access to the Women Entrepreneurship Fund Grant Application Guide. 
                If you don't see it in a few minutes, check your spam folder.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-purple-700 flex items-center">
                      <Rocket className="w-5 h-5 mr-2" />
                      Next Step 1
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Use the Funding Category Breakdown to identify which WEF grant stream best matches your business expansion goals and growth strategy.</p>
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
                    <p className="text-gray-600">Complete the Business Expansion Plan Template using the WEF-specific framework and economic impact assessment tools included in your toolkit.</p>
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
                    <p className="text-gray-600">Book your complimentary 30-minute WEF grant strategy consultation with our women entrepreneur funding specialists.</p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-purple-50 border border-purple-200 p-6 rounded-lg mb-8">
                <h3 className="font-bold text-purple-800 mb-4">Ready for Expert WEF Grant Application Support?</h3>
                <p className="text-purple-700 mb-4">
                  Our women entrepreneur grant specialists have helped secure $12M+ in WEF non-repayable funding with a 91% success rate. 
                  Get professional guidance for funding category selection, expansion strategy development, and grant application optimization.
                </p>
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700" asChild>
                  <Link href="/contact?service=wef-women-entrepreneur-expert-help&source=download-thank-you">
                    Schedule Free WEF Grant Strategy Call
                  </Link>
                </Button>
              </div>

              <div className="text-center">
                <p className="text-gray-600 mb-4">Continue exploring women entrepreneur grant funding opportunities:</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" asChild>
                    <Link href="/blog/women-entrepreneurship-fund-canada">
                      Read Complete WEF Blog Post
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/canada/women-business-grants">
                      Explore All Women Business Grants
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/guides/women-entrepreneurship-fund-guide">
                      View WEF Application Guide
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
