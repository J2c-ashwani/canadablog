import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Zap, Target, Users } from "lucide-react"
import Link from "next/link"

export default function BCGrantsDownloadThankYouPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-emerald-600" />
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Your BC Women Business Grants Toolkit is On Its Way!
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                Check your email for instant access to the BC Women Business Grants Guide with WeBC loan strategies, 
                Innovate BC programs, and Indigenous women funding resources. If you don't see it in a few minutes, 
                check your spam folder.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-emerald-700 flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      Next Step 1
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Use the WeBC loan application strategy and market-ready assessment to determine your eligibility for up to $150,000 financing.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-emerald-700 flex items-center">
                      <Zap className="w-5 h-5 mr-2" />
                      Next Step 2
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Explore the Innovate BC navigator if you're in tech/innovation, and review Indigenous women programs if applicable.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-emerald-700 flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      Next Step 3
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Schedule your complimentary strategy call with our BC funding specialists for personalized program navigation.</p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-lg mb-8">
                <h3 className="font-bold text-emerald-800 mb-4">Ready for Expert BC Funding Navigation?</h3>
                <p className="text-emerald-700 mb-4">
                  Our BC funding specialists understand the provincial innovation ecosystem and can help you navigate 
                  WeBC loan applications, Innovate BC tech programs, Indigenous women funding, and regional resources. 
                  Get personalized guidance to maximize BC's $650M in women entrepreneur innovation support.
                </p>
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700" asChild>
                  <Link href="/contact?service=bc-women-business-grants-help&source=download-thank-you">
                    Schedule Free Strategy Call
                  </Link>
                </Button>
              </div>

              <div className="text-center">
                <p className="text-gray-600 mb-4">Continue exploring BC women entrepreneur innovation support:</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" asChild>
                    <Link href="/blog/bc-women-business-grants">
                      Read Complete BC Blog Post
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
