import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Heart, MapPin, Users, Target } from "lucide-react"
import Link from "next/link"

export default function WomenSocialEnterpriseGrantsDownloadThankYouPage() {
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
                Your Women Social Enterprise Grants Toolkit is On Its Way!
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                Check your email for instant access to the Women Social Enterprise Grants & Impact Funding Guide with 
                Investment Readiness Program strategies, provincial social economy support, Social Finance Fund opportunities, 
                and regional program navigator. If you don't see it in a few minutes, check your spam folder.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-purple-700 flex items-center">
                      <Heart className="w-5 h-5 mr-2" />
                      Next Step 1
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Use the Investment Readiness Program guide and proposal templates to prepare for up to $300K social enterprise funding.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-purple-700 flex items-center">
                      <MapPin className="w-5 h-5 mr-2" />
                      Next Step 2
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Review the regional program navigator to identify provincial and municipal social enterprise grants specific to your community.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-purple-700 flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      Next Step 3
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Schedule your complimentary strategy call with our social enterprise funding specialists to optimize your impact funding applications.</p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-purple-50 border border-purple-200 p-6 rounded-lg mb-8">
                <h3 className="font-bold text-purple-800 mb-4">Ready for Expert Social Enterprise Funding Support?</h3>
                <p className="text-purple-700 mb-4">
                  Our social enterprise funding specialists understand Canadian social innovation ecosystem and can help 
                  you navigate Investment Readiness Program applications, Social Finance Fund opportunities, provincial 
                  social economy programs, and community development grants. Get personalized guidance to maximize your 
                  social impact funding success.
                </p>
                <Button size="lg" className="bg-purple-700 hover:bg-purple-800" asChild>
                  <Link href="/contact?service=women-social-enterprise-grants-help&source=download-thank-you">
                    Schedule Free Social Enterprise Funding Strategy Call
                  </Link>
                </Button>
              </div>

              <div className="text-center">
                <p className="text-gray-600 mb-4">Continue exploring women social enterprise funding opportunities:</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" asChild>
                    <Link href="/blog/women-social-enterprise-grants-canada">
                      Read Complete Social Enterprise Grants Blog Post
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
