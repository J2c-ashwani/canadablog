import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Sparkles, MapPin, Users } from "lucide-react"
import Link from "next/link"

export default function USDASBIRAgTechDownloadThankYouPage() {
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
                Your USDA SBIR AgTech Grants Toolkit is On Its Way!
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                Check your email for instant access to the USDA SBIR/STTR AgTech Grants Application Guide with Phase I/II 
                proposal templates, USDA priority area strategies, farmer benefit demonstration frameworks, on-farm testing 
                validation, and distribution partnership planning. If you don't see it in a few minutes, check your spam folder.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-700 flex items-center">
                      <Sparkles className="w-5 h-5 mr-2" />
                      Next Step 1
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Use the Phase I proposal template and farmer benefit framework to prepare your $125K USDA SBIR application.</p>
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
                    <p className="text-gray-600">Review the on-farm testing frameworks and identify farmer cooperators for agricultural technology validation.</p>
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
                    <p className="text-gray-600">Schedule your complimentary strategy call with our USDA SBIR specialists to optimize your AgTech proposal.</p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-green-50 border border-green-200 p-6 rounded-lg mb-8">
                <h3 className="font-bold text-green-800 mb-4">Ready for Expert USDA SBIR Proposal Support?</h3>
                <p className="text-green-700 mb-4">
                  Our USDA SBIR specialists understand farmer needs, on-farm testing requirements, and agricultural distribution 
                  channels. Get personalized guidance to maximize your Phase I and Phase II approval success with 75% funding rate.
                </p>
                <Button size="lg" className="bg-green-700 hover:bg-green-800" asChild>
                  <Link href="/contact?service=usda-sbir-proposal-help&source=download-thank-you">
                    Schedule Free USDA SBIR Strategy Call
                  </Link>
                </Button>
              </div>

              <div className="text-center">
                <p className="text-gray-600 mb-4">Continue exploring USDA SBIR AgTech funding opportunities:</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" asChild>
                    <Link href="/blog/usda-sbir-agtech-grants">
                      Read Complete USDA SBIR Blog Post
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/usa/technology-startup-grants">
                      Explore All Technology Grants
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
