import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Sparkles, MapPin, Users } from "lucide-react"
import Link from "next/link"

export default function AIMachineLearningGrantsGuideDownloadThankYouPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-violet-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-violet-600" />
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Your AI & Machine Learning Grants Toolkit is On Its Way!
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                Check your email for instant access to the AI & Machine Learning Technology Startup Grants Application Guide 
                with NSF AI Research Institutes $100 million frameworks, NSF SBIR Phase I $305,000 AI templates, Phase II $1.25 
                million development strategies, Fast-Track Pilot Program $1.555M combined funding, DOD SBIR AI applications 
                defense systems, NIST AI technology standards frameworks, AI model validation demonstration templates, and 
                technology category-specific success strategies. If you don't see it in a few minutes, check your spam folder.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-violet-700 flex items-center">
                      <Sparkles className="w-5 h-5 mr-2" />
                      Next Step 1
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Use the NSF AI Research Institutes frameworks and SBIR Phase I templates to prepare your AI innovation applications.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-violet-700 flex items-center">
                      <MapPin className="w-5 h-5 mr-2" />
                      Next Step 2
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Review the responsible AI trustworthy frameworks and model validation strategies for demonstrating AI system performance.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-violet-700 flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      Next Step 3
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Schedule your complimentary strategy call with our AI/ML grant specialists to optimize your funding applications.</p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-violet-50 border border-violet-200 p-6 rounded-lg mb-8">
                <h3 className="font-bold text-violet-800 mb-4">Ready for Expert AI Grant Application Support?</h3>
                <p className="text-violet-700 mb-4">
                  Our AI/ML grant specialists understand NSF AI Research Institutes requirements, SBIR Phase I Phase II Fast-Track 
                  processes, DOD AI applications, NIST AI standards, responsible AI frameworks, and AI model validation commercial 
                  demonstration. Get personalized guidance to maximize your AI grant success with proven track record winning 
                  applications supporting transformative AI innovations.
                </p>
                <Button size="lg" className="bg-violet-700 hover:bg-violet-800" asChild>
                  <Link href="/contact?service=ai-grants-help&source=download-thank-you">
                    Schedule Free AI Grant Strategy Call
                  </Link>
                </Button>
              </div>

              <div className="text-center">
                <p className="text-gray-600 mb-4">Continue exploring AI and machine learning startup funding opportunities:</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" asChild>
                    <Link href="/blog/ai-machine-learning-grants">
                      Read Complete AI & ML Blog Post
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
