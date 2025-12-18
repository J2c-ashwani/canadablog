import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Download, Calendar, MessageSquare, FileText, Globe, Target, Sparkles } from "lucide-react"
import Link from "next/link"

export default function CartierInitiativeDownloadThankYouPage() {
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
                Your Cartier Women's Initiative Toolkit is On Its Way!
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                Check your email for instant access to the Cartier Women's Initiative Application Guide with 
                UN SDG alignment framework and impact articulation templates. If you don't see it in a few minutes, 
                check your spam folder.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-purple-700 flex items-center">
                      <Globe className="w-5 h-5 mr-2" />
                      Next Step 1
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Use the UN SDG alignment framework to clearly identify which of the 17 Sustainable Development Goals your business addresses most directly.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-purple-700 flex items-center">
                      <FileText className="w-5 h-5 mr-2" />
                      Next Step 2
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Complete the impact demonstration templates with measurable metrics showing your social/environmental impact and scale potential.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-purple-700 flex items-center">
                      <MessageSquare className="w-5 h-5 mr-2" />
                      Next Step 3
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Book your complimentary impact strategy call with our specialists to optimize your application before the June 24, 2025 deadline.</p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-purple-50 border border-purple-200 p-6 rounded-lg mb-8">
                <h3 className="font-bold text-purple-800 mb-4">Ready for Expert Cartier Women's Initiative Application Support?</h3>
                <p className="text-purple-700 mb-4">
                  Our impact entrepreneurship specialists understand what Cartier evaluators look for in winning 
                  applications. Get professional UN SDG alignment guidance, impact articulation support, and 
                  application optimization to maximize your chances of winning up to $100,000 plus the 12-month 
                  INSEAD fellowship with global fellows network access.
                </p>
                <Button size="lg" className="bg-purple-800 hover:bg-purple-900" asChild>
                  <Link href="/contact?service=cartier-womens-initiative-application-help&source=download-thank-you">
                    Schedule Free Impact Strategy Call
                  </Link>
                </Button>
              </div>

              <div className="text-center">
                <p className="text-gray-600 mb-4">Continue exploring impact entrepreneur opportunities:</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" asChild>
                    <Link href="/blog/cartier-womens-initiative-canada">
                      Read Complete Cartier Initiative Blog Post
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
