import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Sparkles, MapPin, Users } from "lucide-react"
import Link from "next/link"

export default function NewYorkTechGuideDownloadThankYouPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-blue-600" />
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Your New York Tech Grants Toolkit is On Its Way!
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                Check your email for instant access to the New York Technology Startup Grants Application Guide with START-UP NY 
                10-year tax-free program templates, Pre-Seed Seed Matching Fund strategies ($50K-$250K), NYSERDA innovation grant 
                frameworks, Empire State Development resources, NYC Economic Development Corporation programs, and university 
                partnership templates. If you don't see it in a few minutes, check your spam folder.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-700 flex items-center">
                      <Sparkles className="w-5 h-5 mr-2" />
                      Next Step 1
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Use the START-UP NY tax-free templates and university partnership frameworks to prepare your 10-year tax-free application.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-700 flex items-center">
                      <MapPin className="w-5 h-5 mr-2" />
                      Next Step 2
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Review the Pre-Seed Matching Fund strategies and identify private co-investors for matching fund eligibility.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-700 flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      Next Step 3
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Schedule your complimentary strategy call with our New York grant specialists to optimize your funding applications.</p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg mb-8">
                <h3 className="font-bold text-blue-800 mb-4">Ready for Expert New York Grant Application Support?</h3>
                <p className="text-blue-700 mb-4">
                  Our New York grant specialists understand START-UP NY university partnership requirements, Pre-Seed Seed Matching 
                  Fund co-investor coordination, NYSERDA clean energy programs, and NYC Manhattan Brooklyn Queens ecosystem. Get 
                  personalized guidance to maximize your New York funding success.
                </p>
                <Button size="lg" className="bg-blue-700 hover:bg-blue-800" asChild>
                  <Link href="/contact?service=newyork-grants-help&source=download-thank-you">
                    Schedule Free New York Grant Strategy Call
                  </Link>
                </Button>
              </div>

              <div className="text-center">
                <p className="text-gray-600 mb-4">Continue exploring New York technology startup funding opportunities:</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" asChild>
                    <Link href="/blog/new-york-tech-programs">
                      Read Complete New York Tech Blog Post
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
