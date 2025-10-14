import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, BookOpen, FileText, CheckCircle, Download } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Grant Application Guides | How to Apply for Government Grants",
  description:
    "Step-by-step guides for applying to government grants. Learn how to write winning proposals, gather required documents, and increase your success rate.",
  keywords:
    "grant application guide, how to apply for grants, grant writing tips, government grant application, grant proposal writing",
  openGraph: {
    title: "Grant Application Guides | How to Apply for Government Grants",
    description: "Step-by-step guides for applying to government grants.",
    url: "https://grantfinder.pro/guides",
  },
}

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-blue-600 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/20 text-white border-white/30">
              <BookOpen className="w-4 h-4 mr-2" />
              Expert Grant Application Guides
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
              Master the Art of{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Grant Applications
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-100 leading-relaxed text-pretty">
              Learn from experts how to write winning grant proposals, navigate application processes, and maximize your
              funding success rate.
            </p>
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
              <Link href="/newsletter">
                <Download className="w-5 h-5 mr-2" />
                Download Free Guide
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Guides */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Essential Grant Application Guides</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know to successfully apply for and win government grants.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 - USA Federal Grants */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center mr-4">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">USA</Badge>
                </div>
                <CardTitle>How to Apply for USA Government Grants</CardTitle>
                <CardDescription>
                  Complete step-by-step guide for navigating the US federal grant application process.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Federal grant registration process
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Required documentation checklist
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Common application mistakes to avoid
                  </li>
                </ul>
                <Button className="w-full" asChild>
                  <Link href="/guides/apply-federal-grants">
                    Read Guide <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Card 2 - NEW SBA Application Process */}
            <Card className="hover:shadow-lg transition-shadow border-2 border-primary/20">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center mr-4">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex gap-2">
                    <Badge className="bg-green-100 text-green-800">USA</Badge>
                    <Badge className="bg-yellow-100 text-yellow-800">New</Badge>
                  </div>
                </div>
                <CardTitle>SBA Grant Application Process Guide</CardTitle>
                <CardDescription>
                  Master the Small Business Administration application process with step-by-step instructions and insider tips.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Complete document checklist
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Step-by-step application walkthrough
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Common mistakes and how to avoid them
                  </li>
                </ul>
                <Button className="w-full" asChild>
                  <Link href="/guides/sba-application-process">
                    Read Guide <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Card 3 - Canada Business Grants */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-green-500 rounded-lg flex items-center justify-center mr-4">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-red-100 text-red-800">Canada</Badge>
                </div>
                <CardTitle>How to Apply for Canadian IRAP Grants</CardTitle>
                <CardDescription>
                  Navigate the Canadian Innovation Research Assistance Program application system with confidence.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    IRAP eligibility requirements
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Advisory services access
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Application process timeline
                  </li>
                </ul>
                <Button className="w-full" asChild>
                  <Link href="/guides/apply-irap-grants">
                    Read Guide <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Card 4 - Grant Writing */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mr-4">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-purple-100 text-purple-800">Writing</Badge>
                </div>
                <CardTitle>Federal Grant Application Tips</CardTitle>
                <CardDescription>
                  Learn expert tips and strategies for writing compelling federal grant applications that win funding.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Compelling narrative structure
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Budget justification techniques
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Reviewer evaluation criteria
                  </li>
                </ul>
                <Button className="w-full" asChild>
                  <Link href="/guides/federal-grants-application-tips">
                    Read Guide <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Card 5 - SBIR Research */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mr-4">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-orange-100 text-orange-800">Research</Badge>
                </div>
                <CardTitle>SBIR Research Grants Application Guide</CardTitle>
                <CardDescription>
                  Complete guide to applying for Small Business Innovation Research grants for tech companies.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    SBIR Phase I & II process
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Technical proposal writing
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Commercialization planning
                  </li>
                </ul>
                <Button className="w-full" asChild>
                  <Link href="/guides/sbir-research-grants-guide">
                    Read Guide <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Card 6 - Strategic Innovation Fund */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center mr-4">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-green-100 text-green-800">Canada</Badge>
                </div>
                <CardTitle>Strategic Innovation Fund Application</CardTitle>
                <CardDescription>
                  How to apply for large-scale innovation funding through Canada's Strategic Innovation Fund.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Multi-million dollar funding
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Project eligibility criteria
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Partnership requirements
                  </li>
                </ul>
                <Button className="w-full" asChild>
                  <Link href="/guides/apply-strategic-innovation-fund">
                    Read Guide <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* View All Guides Button */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">Explore more specialized guides for your specific needs</p>
            <Button size="lg" variant="outline" asChild>
              <Link href="/grants">
                View All Available Grants <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Success Stats */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Success by the Numbers</h2>
            <p className="text-xl text-gray-600">Businesses that follow our guides see significantly better results</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">85%</div>
              <div className="text-gray-600">Higher Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-secondary mb-2">60%</div>
              <div className="text-gray-600">Faster Applications</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">40%</div>
              <div className="text-gray-600">Larger Awards</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-secondary mb-2">95%</div>
              <div className="text-gray-600">User Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Ready to Win Your Next Grant?</h2>
            <p className="text-xl mb-8 text-green-100 text-pretty">
              Download our comprehensive grant application toolkit and start your funding journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                <Link href="/newsletter">
                  <Download className="w-5 h-5 mr-2" />
                  Download Free Toolkit
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20" asChild>
                <Link href="/grants">
                  Browse All Grants
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
