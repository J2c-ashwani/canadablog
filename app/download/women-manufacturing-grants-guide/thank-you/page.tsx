import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Settings, MapPin, Users, DollarSign } from "lucide-react"
import Link from "next/link"

export default function WomenManufacturingGrantsDownloadThankYouPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-slate-600" />
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Your Women Manufacturing Grants Toolkit is On Its Way!
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                Check your email for instant access to the Women Manufacturing Equipment Grants Guide with NRC IRAP 
                strategies, provincial financing programs, SR&ED optimization, and regional program navigator. If you 
                don't see it in a few minutes, check your spam folder.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-slate-700 flex items-center">
                      <Settings className="w-5 h-5 mr-2" />
                      Next Step 1
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Use the NRC IRAP application strategy guide and proposal templates to prepare for up to $10M manufacturing R&D funding.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-slate-700 flex items-center">
                      <MapPin className="w-5 h-5 mr-2" />
                      Next Step 2
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Review the regional program navigator to identify provincial and municipal equipment grants specific to your manufacturing location.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-slate-700 flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      Next Step 3
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Schedule your complimentary strategy call with our manufacturing funding specialists to optimize your equipment grant applications.</p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-6 rounded-lg mb-8">
                <h3 className="font-bold text-slate-800 mb-4">Ready for Expert Manufacturing Equipment Funding Support?</h3>
                <p className="text-slate-700 mb-4">
                  Our manufacturing funding specialists understand Canadian federal and provincial programs and can help 
                  you navigate NRC IRAP applications, BDC/provincial equipment loans, SR&ED optimization, and regional 
                  economic development grants. Get personalized guidance to maximize your manufacturing equipment funding success.
                </p>
                <Button size="lg" className="bg-slate-700 hover:bg-slate-800" asChild>
                  <Link href="/contact?service=women-manufacturing-grants-help&source=download-thank-you">
                    Schedule Free Manufacturing Funding Strategy Call
                  </Link>
                </Button>
              </div>

              <div className="text-center">
                <p className="text-gray-600 mb-4">Continue exploring women manufacturing funding opportunities:</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" asChild>
                    <Link href="/blog/women-manufacturing-grants-canada">
                      Read Complete Manufacturing Grants Blog Post
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
