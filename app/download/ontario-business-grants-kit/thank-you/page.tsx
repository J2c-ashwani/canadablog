import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Download, Calendar, MessageSquare, FileText, MapPin, Target, Building } from "lucide-react"
import Link from "next/link"

export default function OntarioBusinessGrantsThankYouPage() {
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
                Your Ontario Business Grants Toolkit is On Its Way!
              </h1>

              <p className="text-xl text-gray-600 mb-8">
                Check your email for instant access to the Ontario Business Grants Application Toolkit with provincial
                program templates, regional development strategies, funding calculators, and Ontario business ecosystem
                access guides. If you don't see it in a few minutes, check your spam folder.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-700 flex items-center">
                      <FileText className="w-5 h-5 mr-2" />
                      Next Step 1
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Use the provincial application templates to prepare your Starter Company Plus, Ontario Creates, or OCI funding application.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-700 flex items-center">
                      <MapPin className="w-5 h-5 mr-2" />
                      Next Step 2
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Review the regional development strategies specific to your Ontario region and identify local delivery partners.</p>
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
                    <p className="text-gray-600">Schedule your complimentary 30-minute Ontario funding consultation with our provincial grant specialists.</p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-red-50 border border-red-200 p-6 rounded-lg mb-8">
                <h3 className="font-bold text-red-800 mb-4">Ready for Expert Ontario Funding Support?</h3>
                <p className="text-red-700 mb-4">
                  Our Ontario business grant specialists have helped secure $12M+ in provincial funding approvals with an
                  87% success rate. Get personalized guidance for program selection, application optimization, and regional
                  economic impact demonstration tailored to your Ontario location.
                </p>
                <Button size="lg" className="bg-red-600 hover:bg-red-700" asChild>
                  <Link href="/contact?service=ontario-business-grants-help&source=download-thank-you">
                    Schedule Free Ontario Funding Strategy Call
                  </Link>
                </Button>
              </div>

              <div className="text-center">
                <p className="text-gray-600 mb-4">Continue exploring Ontario provincial business funding opportunities:</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" asChild>
                    <Link href="/blog/ontario-business-grants">
                      Read Complete Ontario Grants Guide
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/contact">
                      Explore All Ontario Programs
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/guides/ontario-business-grants-application-guide">
                      View Ontario Application Guide
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
