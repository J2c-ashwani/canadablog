import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Download, TrendingUp, Users, DollarSign, Calendar, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="hero-section text-white py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 sm:mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30 text-xs sm:text-sm px-3 py-1.5 inline-block max-w-full">
              <span className="block sm:inline">🎯 Updated</span>
              <span className="block sm:inline sm:ml-1">- New Grant Opportunities Available</span>
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-balance leading-tight">
              Find Government Grants for Your{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Startup or Business
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-blue-100 leading-relaxed text-pretty px-4 sm:px-0">
              Discover thousands of government funding opportunities in USA and Canada. Get our AI-powered grant finder
              and free PDF guide with top 50 startup grants.
            </p>

            <div className="flex flex-col gap-4 justify-center items-center mb-8 sm:mb-12 px-4 sm:px-0">
              <div className="flex flex-col gap-3 w-full max-w-md sm:max-w-lg">
                <Input
                  type="email"
                  placeholder="Enter your email for free PDF guide"
                  className="bg-white text-gray-900 border-0 h-12 sm:h-14 text-base w-full rounded-lg"
                />
                <Button
                  size="lg"
                  className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold h-12 sm:h-14 px-6 sm:px-8 w-full"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Get Free PDF Guide
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto px-4 sm:px-0">
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 h-12"
              >
                <Search className="w-4 h-4 mr-2" />
                AI Grant Finder
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 h-12"
              >
                Browse USA Grants
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 h-12"
              >
                Browse Canada Grants
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-2">$2.5B+</div>
              <div className="text-gray-600 text-sm sm:text-base">Available Funding</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary mb-2">1,200+</div>
              <div className="text-gray-600 text-sm sm:text-base">Active Grants</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-2">50,000+</div>
              <div className="text-gray-600 text-sm sm:text-base">Businesses Funded</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary mb-2">98%</div>
              <div className="text-gray-600 text-sm sm:text-base">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Grants */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-balance">
              Featured Grant Opportunities
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto text-pretty px-4 sm:px-0">
              Discover the most popular and high-value grants available right now for startups and small businesses.
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* USA Federal Grant */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge className="bg-blue-100 text-blue-800">USA Federal</Badge>
                  <span className="text-sm text-gray-500">Deadline: Mar 15</span>
                </div>
                <CardTitle className="text-xl">Small Business Innovation Research</CardTitle>
                <CardDescription>Federal funding for R&D projects with commercial potential</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Funding Amount:</span>
                    <span className="font-semibold text-green-600">Up to $1.7M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Eligibility:</span>
                    <span className="text-sm">Small businesses</span>
                  </div>
                  <Button className="w-full mt-4" asChild>
                    <Link href="/usa/federal-grants">
                      View Details <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Canada Innovation Grant */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge className="bg-red-100 text-red-800">Canada Federal</Badge>
                  <span className="text-sm text-gray-500">Deadline: Apr 30</span>
                </div>
                <CardTitle className="text-xl">Strategic Innovation Fund</CardTitle>
                <CardDescription>Support for large-scale, transformative projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Funding Amount:</span>
                    <span className="font-semibold text-green-600">$10M+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Eligibility:</span>
                    <span className="text-sm">All businesses</span>
                  </div>
                  <Button className="w-full mt-4" asChild>
                    <Link href="/canada/innovation-grants">
                      View Details <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Women Entrepreneurs */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge className="bg-purple-100 text-purple-800">Women-Owned</Badge>
                  <span className="text-sm text-gray-500">Rolling</span>
                </div>
                <CardTitle className="text-xl">Women Entrepreneur Grants</CardTitle>
                <CardDescription>Dedicated funding for women-owned businesses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Funding Amount:</span>
                    <span className="font-semibold text-green-600">$10K - $500K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Eligibility:</span>
                    <span className="text-sm">Women entrepreneurs</span>
                  </div>
                  <Button className="w-full mt-4" asChild>
                    <Link href="/usa/women-entrepreneur-grants">
                      View Details <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link href="/grants">
                View All 1,200+ Grants <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* AdSense Placement */}
      <div className="ad-container">
        <div className="ad-banner">
          <p className="text-gray-500 text-sm">Advertisement</p>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-balance">
              Everything You Need to Find Funding
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto text-pretty px-4 sm:px-0">
              Our comprehensive platform provides all the tools and resources you need to discover and apply for
              government grants.
            </p>
          </div>

          <div className="grid gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-3">
            <div className="text-center px-4 sm:px-0">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Search className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">AI-Powered Grant Finder</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Answer a few questions about your business and get personalized grant recommendations powered by AI.
              </p>
            </div>

            <div className="text-center px-4 sm:px-0">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Download className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Free PDF Guides</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Download our comprehensive guides including "Top 50 USA & Canada Startup Grants 2025" absolutely free.
              </p>
            </div>

            <div className="text-center px-4 sm:px-0">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Calendar className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Grant Deadline Calendar</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Never miss a deadline with our interactive calendar showing all upcoming grant application deadlines.
              </p>
            </div>

            <div className="text-center px-4 sm:px-0">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <TrendingUp className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Grant Comparison Tables</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Compare grants side-by-side with detailed information on funding amounts, eligibility, and deadlines.
              </p>
            </div>

            <div className="text-center px-4 sm:px-0">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Users className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Expert Application Guides</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Step-by-step guides and templates to help you write winning grant applications and proposals.
              </p>
            </div>

            <div className="text-center px-4 sm:px-0">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <DollarSign className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Grant Alerts</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Get notified about new grant opportunities and upcoming deadlines via email and push notifications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="newsletter-form max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-balance">
              Get the Top 50 Startup Grants Guide
            </h2>
            <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-blue-100 text-pretty px-4 sm:px-0">
              Download our comprehensive PDF guide featuring the best government grants for startups and small
              businesses in USA and Canada.
            </p>

            <div className="flex flex-col gap-3 sm:gap-4 justify-center items-center max-w-sm sm:max-w-md mx-auto px-4 sm:px-0">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="bg-white text-gray-900 border-0 h-12 sm:h-14 text-base w-full"
              />
              <Button
                size="lg"
                className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold h-12 sm:h-14 px-6 sm:px-8 w-full"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Free
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center mt-4 sm:mt-6 space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-blue-100">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                Instant Download
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                No Spam
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                Updated Monthly
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
