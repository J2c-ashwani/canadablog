import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Users, TrendingUp, Award } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Newsletter - Weekly Grant Updates | FSI Digital",
  description:
    "Get weekly government grant updates, funding opportunities, and expert tips delivered to your inbox. Plus free Ultimate Grant Guide PDF.",
  keywords: "grant newsletter, funding updates, government grants newsletter, startup funding news",
}

export default function NewsletterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary">
              Join 10,000+ Entrepreneurs
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Never Miss a Grant Opportunity</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Get weekly updates on the latest government grants, funding opportunities, and expert application tips
              delivered straight to your inbox.
            </p>
          </div>

          {/* Newsletter Signup */}
          <div className="mb-16">
            <NewsletterSignup
              title="Get Weekly Grant Updates + Free Guide"
              description="Join thousands of entrepreneurs getting funded with our weekly newsletter and comprehensive grant application guide"
            />
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card>
              <CardHeader>
                <TrendingUp className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Latest Opportunities</CardTitle>
                <CardDescription>
                  Be the first to know about new grant programs and funding opportunities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Federal grant announcements
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    State and local programs
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Industry-specific funding
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Award className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Expert Insights</CardTitle>
                <CardDescription>Learn from successful grant recipients and funding experts</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Application strategies
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Common mistakes to avoid
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Success stories & case studies
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Community Access</CardTitle>
                <CardDescription>Connect with other entrepreneurs and share experiences</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Exclusive webinars
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Q&A sessions with experts
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Networking opportunities
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Testimonials */}
          <div className="bg-white rounded-lg p-8 shadow-sm border">
            <h2 className="text-2xl font-bold text-center mb-8">What Our Subscribers Say</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center">
                <p className="text-gray-600 mb-4 italic">
                  "The weekly newsletter helped me discover a $50,000 SBIR grant that I wouldn't have found otherwise.
                  The application tips were invaluable!"
                </p>
                <div className="font-semibold">Sarah Chen</div>
                <div className="text-sm text-gray-500">Tech Startup Founder</div>
              </div>
              <div className="text-center">
                <p className="text-gray-600 mb-4 italic">
                  "FSI Digital's newsletter is the first email I read every week. It's helped our nonprofit secure
                  over $200,000 in funding."
                </p>
                <div className="font-semibold">Michael Rodriguez</div>
                <div className="text-sm text-gray-500">Nonprofit Director</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
