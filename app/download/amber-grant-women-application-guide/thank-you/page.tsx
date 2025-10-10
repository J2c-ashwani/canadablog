import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Download, Calendar, MessageSquare, FileText, Award, Target, Sparkles } from "lucide-react"
import Link from "next/link"

export default function AmberGrantDownloadThankYouPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-amber-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-amber-600" />
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Your Amber Grant Application Toolkit is On Its Way!
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                Check your email for instant access to the Amber Grant Application Guide with monthly deadline 
                tracker and essay templates. If you don't see it in a few minutes, check your spam folder.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-amber-700 flex items-center">
                      <Calendar className="w-5 h-5 mr-2" />
                      Next Step 1
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Review the monthly deadline tracker and choose your optimal submission month based on business stage and category fit.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-amber-700 flex items-center">
                      <FileText className="w-5 h-5 mr-2" />
                      Next Step 2
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Use the essay template and business dream articulation worksheet to craft your compelling application story.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-amber-700 flex items-center">
                      <MessageSquare className="w-5 h-5 mr-2" />
                      Next Step 3
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Book your complimentary essay review with our grant specialists to optimize your application before submission.</p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-amber-50 border border-amber-200 p-6 rounded-lg mb-8">
                <h3 className="font-bold text-amber-800 mb-4">Ready for Expert Amber Grant Application Support?</h3>
                <p className="text-amber-700 mb-4">
                  Our grant specialists have helped women entrepreneurs craft winning Amber Grant applications. 
                  Get professional essay review, category selection guidance, and submission timing optimization 
                  to maximize your chances of winning one of the three monthly $10,000 grants.
                </p>
                <Button size="lg" className="bg-amber-600 hover:bg-amber-700" asChild>
                  <Link href="/contact?service=amber-grant-application-help&source=download-thank-you">
                    Schedule Free Essay Review Call
                  </Link>
                </Button>
              </div>

              <div className="text-center">
                <p className="text-gray-600 mb-4">Continue exploring monthly grant opportunities:</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" asChild>
                    <Link href="/blog/amber-grant-women-canada">
                      Read Complete Amber Grant Blog Post
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
