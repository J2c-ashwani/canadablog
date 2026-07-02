import { Header } from "@/components/Header"
import type { Metadata } from "next"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Lightbulb, Code, Target } from "lucide-react"
import Link from "next/link"
import { OTOUpsellCard } from "@/components/download/OTOUpsellCard"

export const metadata: Metadata = {
  title: "Thank You - Download Confirmation | FSI Digital",
  description: "Your download request has been successfully processed. Check your email for instant access to your guide and templates.",
  robots: { index: false, follow: false }
}

export default function IRAPApplicationKitDownloadThankYouPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-emerald-600" />
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Your IRAP Application Kit is On Its Way!
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                Check your email for instant access to the IRAP Application Kit templates, worksheets, 
                and guides. If you don't see it in a few minutes, check your spam folder.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-emerald-700 flex items-center">
                      <Lightbulb className="w-5 h-5 mr-2" />
                      Next Step 1
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Review the R&D project description framework to outline your innovation goals.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-emerald-700 flex items-center">
                      <Code className="w-5 h-5 mr-2" />
                      Next Step 2
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Map out your engineering salary guidelines to maximize potential wage subsidies.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-emerald-700 flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      Next Step 3
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Schedule a complimentary strategy session to verify your stacked funding options.</p>
                  </CardContent>
                </Card>
              </div>

              <OTOUpsellCard guideName="IRAP Application Kit" />

              <div className="text-center">
                <p className="text-gray-600 mb-4">Continue exploring Canadian funding opportunities:</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" asChild>
                    <Link href="/topics/irap-funding-eligibility">
                      Read IRAP Stacking Guide
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/grants">
                      Search Grant Database
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
