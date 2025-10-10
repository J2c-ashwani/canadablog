import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Zap, Target, Users } from "lucide-react"
import Link from "next/link"

export default function AlbertaGrantsDownloadThankYouPage() {
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
                Your Alberta Women Business Grants Toolkit is On Its Way!
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                Check your email for instant access to the Alberta Women Business Grants Guide with AWE loan strategies, 
                Women Building Futures programs, and energy sector resources. If you don't see it in a few minutes, 
                check your spam folder.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-700 flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      Next Step 1
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Use the AWE loan application strategy and business plan templates to prepare for up to $150,000 financing access.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-700 flex items-center">
                      <Zap className="w-5 h-5 mr-2" />
                      Next Step 2
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Explore the energy sector women initiatives if in oil & gas, renewable energy, or cleantech industries.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-700 flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      Next Step 3
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Schedule your complimentary strategy call with our Alberta funding specialists for personalized program navigation.</p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-red-50 border border-red-200 p-6 rounded-lg mb-8">
                <h3 className="font-bold text-red-800 mb-4">Ready for Expert Alberta Funding Navigation?</h3>
                <p className="text-red-700 mb-4">
                  Our Alberta funding specialists understand the provincial business ecosystem and can help you navigate 
                  AWE loan applications, Women Building Futures skilled trades programs, energy sector initiatives, and 
                  Alberta Innovates tech funding. Get personalized guidance to maximize Alberta's $580M in women 
                  entrepreneur support.
                </p>
                <Button size="lg" className="bg-red-600 hover:bg-red-700" asChild>
                  <Link href="/contact?service=alberta-women-business-grants-help&source=download-thank-you">
                    Schedule Free Strategy Call
                  </Link>
                </Button>
              </div>

              <div className="text-center">
                <p className="text-gray-600 mb-4">Continue exploring Alberta women entrepreneur support:</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" asChild>
                    <Link href="/blog/alberta-women-business-grants">
                      Read Complete Alberta Blog Post
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
