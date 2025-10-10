import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Download, Calendar, MessageSquare, FileText, DollarSign, Users, Lightbulb } from "lucide-react"
import Link from "next/link"

export default function ScotiabankWomenDownloadThankYouPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-red-600" />
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Your Scotiabank Women Initiative Toolkit is On Its Way!
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                Check your email for instant access to the Scotiabank Women Initiative Guide with capital 
                access strategies, mentorship program details, and educational resources. If you don't see it 
                in a few minutes, check your spam folder.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-700 flex items-center">
                      <DollarSign className="w-5 h-5 mr-2" />
                      Next Step 1
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Review the capital access strategy guide and identify which financing solutions align with your business growth needs.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-700 flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      Next Step 2
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Explore the mentorship program navigation guide and connect with Scotiabank business advisors and industry experts.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-700 flex items-center">
                      <MessageSquare className="w-5 h-5 mr-2" />
                      Next Step 3
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Book your complimentary strategy call with our banking specialists to optimize your Scotiabank Women Initiative access.</p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-red-50 border border-red-200 p-6 rounded-lg mb-8">
                <h3 className="font-bold text-red-800 mb-4">Ready for Expert Scotiabank Women Initiative Navigation Support?</h3>
                <p className="text-red-700 mb-4">
                  Our banking specialists understand Scotiabank's comprehensive suite of women entrepreneur support 
                  programs. Get professional guidance for capital funding access, mentorship program enrollment, 
                  educational resource utilization, and maximizing all available benefits for your women-led business growth.
                </p>
                <Button size="lg" className="bg-red-700 hover:bg-red-800" asChild>
                  <Link href="/contact?service=scotiabank-women-initiative-help&source=download-thank-you">
                    Schedule Free Strategy Call
                  </Link>
                </Button>
              </div>

              <div className="text-center">
                <p className="text-gray-600 mb-4">Continue exploring women entrepreneur banking and support:</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" asChild>
                    <Link href="/blog/scotiabank-women-initiative">
                      Read Complete Scotiabank Blog Post
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/canada/women-business-grants">
                      Explore All Women Business Grants
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
