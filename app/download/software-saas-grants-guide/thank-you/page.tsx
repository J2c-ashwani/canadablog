import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Sparkles, MapPin, Users } from "lucide-react"
import Link from "next/link"

export default function SoftwareSaaSGrantsGuideDownloadThankYouPage() {
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
                Your Software & SaaS Grants Toolkit is On Its Way!
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                Check your email for instant access to the Software & SaaS Technology Startup Grants Application Guide with 
                NSF SBIR Phase I $305,000 templates, Phase II $1.25 million development strategies, Fast-Track Pilot Program 
                $1.555M combined funding frameworks, Project Pitch three-page fast feedback process templates, NSF Program 
                Director relationship building strategies, DOD software modernization resources, market pull commercial 
                validation frameworks, and technology category-specific success strategies. If you don't see it in a few 
                minutes, check your spam folder.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-indigo-700 flex items-center">
                      <Sparkles className="w-5 h-5 mr-2" />
                      Next Step 1
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Use the NSF SBIR Phase I templates and Project Pitch frameworks to prepare your three-page fast feedback submission.</p>
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
                    <p className="text-gray-600">Review the NSF Program Director relationship building strategies and identify relevant directors for your software category.</p>
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
                    <p className="text-gray-600">Schedule your complimentary strategy call with our NSF SBIR specialists to optimize your software grant applications.</p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-lg mb-8">
                <h3 className="font-bold text-indigo-800 mb-4">Ready for Expert Software Grant Application Support?</h3>
                <p className="text-indigo-700 mb-4">
                  Our NSF SBIR specialists understand Phase I Phase II Fast-Track requirements, Project Pitch fast feedback 
                  process, NSF Program Director relationship strategies, market pull commercial validation, and software 
                  technology innovation differentiation. Get personalized guidance to maximize your software grant success 
                  with proven track record winning applications.
                </p>
                <Button size="lg" className="bg-indigo-700 hover:bg-indigo-800" asChild>
                  <Link href="/contact?service=software-grants-help&source=download-thank-you">
                    Schedule Free Software Grant Strategy Call
                  </Link>
                </Button>
              </div>

              <div className="text-center">
                <p className="text-gray-600 mb-4">Continue exploring software and SaaS startup funding opportunities:</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" asChild>
                    <Link href="/blog/software-saas-startup-grants">
                      Read Complete Software & SaaS Blog Post
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
