import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Building, MapPin, Users } from "lucide-react"
import Link from "next/link"

export default function IndigenousWomenBusinessGrantsDownloadThankYouPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-orange-600" />
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Your Indigenous Women Business Grants Toolkit is On Its Way!
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                Check your email for instant access to the Indigenous Women Business Grants & NACCA Funding Guide with 
                Aboriginal Entrepreneurship Program strategies, Women Entrepreneurship Loan Fund templates, IFI network 
                directory, and cultural enterprise resources. If you don't see it in a few minutes, check your spam folder.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-orange-700 flex items-center">
                      <Building className="w-5 h-5 mr-2" />
                      Next Step 1
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Use the NACCA Aboriginal Entrepreneurship Program guide and application templates to prepare for up to $100K business funding.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-orange-700 flex items-center">
                      <MapPin className="w-5 h-5 mr-2" />
                      Next Step 2
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Review the IFI network directory to identify your local Indigenous Financial Institution and connect with their business development officer.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-orange-700 flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      Next Step 3
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Schedule your complimentary strategy call with our Indigenous business funding specialists to optimize your NACCA applications.</p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-orange-50 border border-orange-200 p-6 rounded-lg mb-8">
                <h3 className="font-bold text-orange-800 mb-4">Ready for Expert Indigenous Business Funding Support?</h3>
                <p className="text-orange-700 mb-4">
                  Our Indigenous business funding specialists understand NACCA network, Aboriginal Entrepreneurship Program 
                  requirements, and cultural business development. Get personalized guidance to maximize your Indigenous 
                  business funding success with culturally appropriate support.
                </p>
                <Button size="lg" className="bg-orange-700 hover:bg-orange-800" asChild>
                  <Link href="/contact?service=indigenous-women-business-grants-help&source=download-thank-you">
                    Schedule Free Indigenous Business Funding Strategy Call
                  </Link>
                </Button>
              </div>

              <div className="text-center">
                <p className="text-gray-600 mb-4">Continue exploring Indigenous women business funding opportunities:</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" asChild>
                    <Link href="/blog/indigenous-women-business-grants-canada">
                      Read Complete Indigenous Business Grants Blog Post
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
