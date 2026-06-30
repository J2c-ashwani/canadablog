import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Building, DollarSign, Target } from "lucide-react"
import Link from "next/link"
import { OTOUpsellCard } from "@/components/download/OTOUpsellCard"

export default function CSBFPApplicationKitDownloadThankYouPage() {
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
                Your CSBFP Application Kit is On Its Way!
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                Check your email for instant access to the CSBFP Application Kit templates, checklists, 
                and guidelines. If you don't see it in a few minutes, check your spam folder.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-indigo-700 flex items-center">
                      <Building className="w-5 h-5 mr-2" />
                      Next Step 1
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Review the equipment and leasehold requirements list to verify eligible expenditures.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-indigo-700 flex items-center">
                      <DollarSign className="w-5 h-5 mr-2" />
                      Next Step 2
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Prepare your business plan templates to present to any participating Canadian bank.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-indigo-700 flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      Next Step 3
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Schedule a complimentary strategy session to verify your loan stacking options.</p>
                  </CardContent>
                </Card>
              </div>

              <OTOUpsellCard guideName="CSBFP Application Kit" />

              <div className="text-center">
                <p className="text-gray-600 mb-4">Continue exploring Canadian funding opportunities:</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" asChild>
                    <Link href="/topics/government-loans-small-business-canada">
                      Read Government Loans Guide
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
