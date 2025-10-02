import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
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
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold">
              <Download className="w-5 h-5 mr-2" />
              Download Free Guide
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
                  <Link href="/guides/how-to-apply-usa">
                    Read Guide <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-green-500 rounded-lg flex items-center justify-center mr-4">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-red-100 text-red-800">Canada</Badge>
                </div>
                <CardTitle>How to Apply for Canadian Business Grants</CardTitle>
                <CardDescription>
                  Navigate the Canadian federal and provincial grant application systems with confidence.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Federal vs provincial applications
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    CRA business number requirements
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Timeline and deadline management
                  </li>
                </ul>
                <Button className="w-full" asChild>
                  <Link href="/guides/how-to-apply-canada">
                    Read Guide <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mr-4">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-purple-100 text-purple-800">Writing</Badge>
                </div>
                <CardTitle>Grant Proposal Writing Secrets</CardTitle>
                <CardDescription>
                  Learn the insider secrets to writing compelling grant proposals that win funding.
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
                  <Link href="/guides/grant-proposal-writing">
                    Read Guide <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mr-4">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-orange-100 text-orange-800">Requirements</Badge>
                </div>
                <CardTitle>Documents Required for Grant Applications</CardTitle>
                <CardDescription>
                  Complete checklist of all documents you'll need for successful grant applications.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Financial statements and tax returns
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Business registration documents
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Project plans and budgets
                  </li>
                </ul>
                <Button className="w-full" asChild>
                  <Link href="/guides/documents-required">
                    Read Guide <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center mr-4">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-green-100 text-green-800">Strategy</Badge>
                </div>
                <CardTitle>Federal vs Provincial Grants Explained</CardTitle>
                <CardDescription>
                  Understand the differences between federal and provincial/state grants and when to apply for each.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Funding amount differences
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Eligibility requirements comparison
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Application timeline differences
                  </li>
                </ul>
                <Button className="w-full" asChild>
                  <Link href="/guides/federal-vs-provincial">
                    Read Guide <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mr-4">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800">Tips</Badge>
                </div>
                <CardTitle>Common Grant Application Mistakes</CardTitle>
                <CardDescription>
                  Learn from others' mistakes and avoid the most common pitfalls that lead to rejection.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Incomplete application submissions
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Unrealistic budget projections
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Missing eligibility requirements
                  </li>
                </ul>
                <Button className="w-full" asChild>
                  <Link href="/guides/common-mistakes">
                    Read Guide <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
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
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold">
                <Download className="w-5 h-5 mr-2" />
                Download Free Toolkit
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                Browse All Guides
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
