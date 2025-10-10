import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, MapPin, Target, Users, FileText } from "lucide-react"
import Link from "next/link"

export default function OntarioGrantsDownloadThankYouPage() {
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
                Your Ontario Women Business Grants Toolkit is On Its Way!
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                Check your email for instant access to the Ontario Women Business Grants Guide with program 
                navigator, SBEC calculator, and regional directory. If you don't see it in a few minutes, 
                check your spam folder.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-700 flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      Next Step 1
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Use the program navigator to identify which Ontario programs (WES, SBEC, Summer Company, regional) match your business profile.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-700 flex items-center">
                      <MapPin className="w-5 h-5 mr-2" />
                      Next Step 2
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Review the regional program directory for your Ontario location and explore municipal women business support opportunities.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-700 flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      Next Step 3
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Schedule your complimentary strategy call with our Ontario funding specialists to optimize your application approach.</p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-green-50 border border-green-200 p-6 rounded-lg mb-8">
                <h3 className="font-bold text-green-800 mb-4">Ready for Expert Ontario Funding Navigation?</h3>
                <p className="text-green-700 mb-4">
                  Our Ontario funding specialists understand the provincial landscape and can help you navigate 
                  WES ecosystem organizations, SBEC applications, Summer Company eligibility, and regional programs. 
                  Get personalized guidance to maximize your access to Ontario's $800M+ in women entrepreneur support.
                </p>
                <Button size="lg" className="bg-green-600 hover:bg-green-700" asChild>
                  <Link href="/contact?service=ontario-women-business-grants-help&source=download-thank-you">
                    Schedule Free Strategy Call
                  </Link>
                </Button>
              </div>

              <div className="text-center">
                <p className="text-gray-600 mb-4">Continue exploring Ontario women entrepreneur support:</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" asChild>
                    <Link href="/blog/ontario-women-business-grants">
                      Read Complete Ontario Blog Post
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
