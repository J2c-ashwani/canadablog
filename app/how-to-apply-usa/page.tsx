import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, FileText, Clock, AlertCircle } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "How to Apply for Government Grants USA 2025 | Step-by-Step Guide",
  description:
    "Complete guide on how to apply for government grants in the USA. Step-by-step process, required documents, deadlines, and expert tips for successful applications.",
  keywords:
    "how to apply for government grants USA, grant application process, USA grant applications, government funding application",
  alternates: {
    canonical: "https://www.fsidigital.ca/how-to-apply-usa",
  },
}

export default function HowToApplyUSAPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary">
              Complete Guide
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How to Apply for Government Grants USA
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Master the government grant application process with our comprehensive step-by-step guide. Learn insider
              tips, avoid common mistakes, and increase your chances of success.
            </p>
          </div>

          {/* Step-by-Step Process */}
          <div className="space-y-8 mb-12">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <CardTitle>Research and Identify Grants</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Start by identifying grants that align with your business goals, industry, and eligibility criteria.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Key Resources:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Grants.gov - Federal grant database</li>
                      <li>• SBA.gov - Small Business Administration</li>
                      <li>• State economic development agencies</li>
                      <li>• Industry-specific grant databases</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Evaluation Criteria:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Funding amount and match requirements</li>
                      <li>• Eligibility requirements</li>
                      <li>• Application deadlines</li>
                      <li>• Success rates and competition level</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <CardTitle>Prepare Required Documentation</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Gather all necessary documents before starting your application. Missing documentation is a common
                  cause of rejection.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Business Documents:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Business registration and licenses</li>
                      <li>• Tax returns (3 years)</li>
                      <li>• Financial statements</li>
                      <li>• Bank statements</li>
                      <li>• Insurance certificates</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Project Documents:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Detailed project description</li>
                      <li>• Budget and financial projections</li>
                      <li>• Timeline and milestones</li>
                      <li>• Letters of support</li>
                      <li>• Environmental assessments (if required)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <CardTitle>Register in Required Systems</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Most federal grants require registration in multiple government systems. Start this process early as
                  it can take weeks.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <strong>SAM.gov Registration</strong> - System for Award Management (required for federal grants)
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <strong>Grants.gov Account</strong> - Federal grant application portal
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <strong>DUNS Number</strong> - Unique business identifier (now UEI)
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <strong>EIN Number</strong> - Employer Identification Number from IRS
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                  <CardTitle>Write a Compelling Application</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Your application narrative is crucial. Follow the guidelines exactly and address all evaluation
                  criteria.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Key Components:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Executive summary</li>
                      <li>• Project description and objectives</li>
                      <li>• Methodology and approach</li>
                      <li>• Budget justification</li>
                      <li>• Evaluation and outcomes</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Writing Tips:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Use clear, concise language</li>
                      <li>• Address all evaluation criteria</li>
                      <li>• Include specific, measurable outcomes</li>
                      <li>• Provide supporting data and evidence</li>
                      <li>• Follow formatting requirements exactly</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                    5
                  </div>
                  <CardTitle>Submit and Follow Up</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Submit your application well before the deadline and maintain communication with the funding agency.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <strong>Submit Early</strong> - Aim to submit at least 48 hours before the deadline
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <strong>Confirmation</strong> - Save confirmation receipts and tracking numbers
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <strong>Follow Up</strong> - Monitor application status and respond to requests promptly
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Common Mistakes */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-red-600">Common Mistakes to Avoid</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-red-600">Application Errors:</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Missing required documents</li>
                    <li>• Incomplete registration in government systems</li>
                    <li>• Not following formatting guidelines</li>
                    <li>• Submitting after the deadline</li>
                    <li>• Failing to address evaluation criteria</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-red-600">Content Issues:</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Vague or unrealistic objectives</li>
                    <li>• Insufficient budget justification</li>
                    <li>• Lack of supporting evidence</li>
                    <li>• Poor project timeline</li>
                    <li>• No clear evaluation metrics</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Newsletter CTA */}
          <div className="mb-8">
            <NewsletterSignup
              title="Get Grant Application Tips"
              description="Receive expert tips, templates, and updates on new grant opportunities"
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
