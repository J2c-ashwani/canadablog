import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Download, Calendar, MessageSquare, FileText, Heart, Target, Users } from "lucide-react"
import Link from "next/link"

export default function BMOGrantDownloadThankYouPage() {
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
                Your BMO Celebrating Women Grant Toolkit is On Its Way!
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                Check your email for instant access to the BMO Celebrating Women Grant Application Guide with 
                women advancement framework and growth planning templates. If you don't see it in a few minutes, 
                check your spam folder.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-700 flex items-center">
                      <Heart className="w-5 h-5 mr-2" />
                      Next Step 1
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Use the women advancement framework to clearly articulate how your business supports women's health, safety, education, or economic empowerment.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-700 flex items-center">
                      <FileText className="w-5 h-5 mr-2" />
                      Next Step 2
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Complete the business growth plan template with specific objectives, metrics, and how $10,000 accelerates your expansion goals.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-700 flex items-center">
                      <MessageSquare className="w-5 h-5 mr-2" />
                      Next Step 3
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Book your complimentary application review with our grant specialists before the August 5-19, 2025 submission window.</p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg mb-8">
                <h3 className="font-bold text-blue-800 mb-4">Ready for Expert BMO Grant Application Support?</h3>
                <p className="text-blue-700 mb-4">
                  Our grant specialists understand what BMO and Deloitte evaluators look for in winning applications. 
                  Get professional women advancement demonstration guidance, business growth planning support, and 
                  application optimization to maximize your chances of being selected as one of the fifteen $10,000 
                  grant recipients with BMO business advisor access and exclusive resources.
                </p>
                <Button size="lg" className="bg-blue-800 hover:bg-blue-900" asChild>
                  <Link href="/contact?service=bmo-celebrating-women-grant-help&source=download-thank-you">
                    Schedule Free Application Review Call
                  </Link>
                </Button>
              </div>

              <div className="text-center">
                <p className="text-gray-600 mb-4">Continue exploring women entrepreneur grant opportunities:</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" asChild>
                    <Link href="/blog/bmo-celebrating-women-grant">
                      Read Complete BMO Grant Blog Post
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
