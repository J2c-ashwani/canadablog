import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Rocket, MapPin, Users } from "lucide-react"
import Link from "next/link"

export default function NASASBIRSpaceTechDownloadThankYouPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-indigo-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-indigo-600" />
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Your NASA SBIR Space Tech Grants Toolkit is On Its Way!
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                Check your email for instant access to the NASA SBIR/STTR Space Tech Grants Application Guide with 
                Phase I/II proposal templates, NASA mission alignment strategies, space qualification frameworks, 
                commercial space market planning, and dual-use technology commercialization. If you don't see it in 
                a few minutes, check your spam folder.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-indigo-700 flex items-center">
                      <Rocket className="w-5 h-5 mr-2" />
                      Next Step 1
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Use the Phase I proposal template and NASA mission alignment framework to prepare your $150K NASA SBIR application.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-indigo-700 flex items-center">
                      <MapPin className="w-5 h-5 mr-2" />
                      Next Step 2
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Review the space qualification frameworks and identify testing requirements for your space technology validation.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-indigo-700 flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      Next Step 3
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Schedule your complimentary strategy call with our NASA SBIR specialists to optimize your space tech proposal.</p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-lg mb-8">
                <h3 className="font-bold text-indigo-800 mb-4">Ready for Expert NASA SBIR Proposal Support?</h3>
                <p className="text-indigo-700 mb-4">
                  Our NASA SBIR specialists understand mission requirements, space qualification, and commercial space 
                  markets. Get personalized guidance to maximize your Phase I and Phase II approval success with 75% 
                  funding rate.
                </p>
                <Button size="lg" className="bg-indigo-700 hover:bg-indigo-800" asChild>
                  <Link href="/contact?service=nasa-sbir-proposal-help&source=download-thank-you">
                    Schedule Free NASA SBIR Strategy Call
                  </Link>
                </Button>
              </div>

              <div className="text-center">
                <p className="text-gray-600 mb-4">Continue exploring NASA SBIR space tech funding opportunities:</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" asChild>
                    <Link href="/blog/nasa-sbir-space-tech-grants">
                      Read Complete NASA SBIR Blog Post
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
