import { Header } from "@/components/Header"
import type { Metadata } from "next"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Sparkles, MapPin, Users } from "lucide-react"
import Link from "next/link"
import { OTOUpsellCard } from "@/components/download/OTOUpsellCard"

export const metadata: Metadata = {
  title: "Thank You - Download Confirmation | FSI Digital",
  description: "Your download request has been successfully processed. Check your email for instant access to your guide and templates.",
  robots: { index: false, follow: false }
}

export default function ColoradoTechGuideDownloadThankYouPage() {
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
                Your Colorado Tech Grants Toolkit is On Its Way!
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                Check your email for instant access to the Colorado Technology Startup Grants Application Guide with Advanced 
                Industries Accelerator Early-Stage Capital grant templates ($250,000 maximum), Proof of Concept grant strategies 
                ($150,000 research institutions), Investment Tax Credit 35% rural Enterprise Zones frameworks, SBIR State Matching 
                resources, Colorado Clean Energy Fund programs, and seven advanced industries alignment templates. If you don't 
                see it in a few minutes, check your spam folder.
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
                    <p className="text-gray-600">Use the Early-Stage Capital grant templates and seven advanced industries alignment frameworks to prepare your application.</p>
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
                    <p className="text-gray-600">Review the Colorado operations and job creation commitment strategies for demonstrating state economic development impact.</p>
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
                    <p className="text-gray-600">Schedule your complimentary strategy call with our Colorado grant specialists to optimize your funding applications.</p>
                  </CardContent>
                </Card>
              </div>

              <OTOUpsellCard guideName="Colorado Tech Grants Toolkit" />

              <div className="text-center">
                <p className="text-gray-600 mb-4">Continue exploring Colorado technology startup funding opportunities:</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" asChild>
                    <Link href="/blog/colorado-tech-programs">
                      Read Complete Colorado Tech Blog Post
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
