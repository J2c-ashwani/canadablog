import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Shield, MapPin, Users } from "lucide-react"
import Link from "next/link"

export default function DODSBIRDefenseTechDownloadThankYouPage() {
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
                Your DOD SBIR Defense Tech Grants Toolkit is On Its Way!
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                Check your email for instant access to the DOD SBIR/STTR Defense Tech Grants Application Guide with 
                Phase I/II proposal templates, DOD component strategies, military transition frameworks, dual-use 
                commercialization planning, and Program of Record identification. If you don't see it in a few minutes, 
                check your spam folder.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-slate-700 flex items-center">
                      <Shield className="w-5 h-5 mr-2" />
                      Next Step 1
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Use the Phase I proposal template and military relevance framework to prepare your $256K DOD SBIR application.</p>
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
                    <p className="text-gray-600">Review the DOD component-specific strategies and identify which military service best aligns with your defense technology.</p>
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
                    <p className="text-gray-600">Schedule your complimentary strategy call with our DOD SBIR specialists to optimize your defense tech proposal.</p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-6 rounded-lg mb-8">
                <h3 className="font-bold text-slate-800 mb-4">Ready for Expert DOD SBIR Proposal Support?</h3>
                <p className="text-slate-700 mb-4">
                  Our DOD SBIR specialists understand military requirements, transition pathways, and Program of Record 
                  identification. Get personalized guidance to maximize your Phase I and Phase II approval success with 
                  80% funding rate.
                </p>
                <Button size="lg" className="bg-slate-700 hover:bg-slate-800" asChild>
                  <Link href="/contact?service=dod-sbir-proposal-help&source=download-thank-you">
                    Schedule Free DOD SBIR Strategy Call
                  </Link>
                </Button>
              </div>

              <div className="text-center">
                <p className="text-gray-600 mb-4">Continue exploring DOD SBIR defense tech funding opportunities:</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" asChild>
                    <Link href="/blog/dod-sbir-defense-tech-grants">
                      Read Complete DOD SBIR Blog Post
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
