import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { HelpCircle } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "USA Small Business Grants FAQ 2025 | Common Questions Answered",
  description:
    "Get answers to frequently asked questions about USA small business grants. Expert guidance on eligibility, applications, deadlines, and funding requirements.",
  keywords:
    "USA small business grants FAQ, government grants questions, small business funding FAQ, grant application help",
  alternates: {
    canonical: "https://grantfinder.pro/faq-usa",
  },
}

export default function FAQUSAPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <HelpCircle className="h-6 w-6 text-primary" />
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Frequently Asked Questions
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">USA Small Business Grants FAQ</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Get expert answers to the most common questions about USA government grants, eligibility requirements,
              application processes, and funding opportunities.
            </p>
          </div>

          {/* FAQ Sections */}
          <div className="space-y-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle>General Grant Questions</CardTitle>
                <CardDescription>Basic information about USA government grants</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="what-are-grants">
                    <AccordionTrigger>What are government grants for small businesses?</AccordionTrigger>
                    <AccordionContent>
                      Government grants are non-repayable funds provided by federal, state, or local government agencies
                      to support specific business activities, research, or economic development. Unlike loans, grants
                      do not need to be repaid if you meet the program requirements and use the funds as specified.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="who-qualifies">
                    <AccordionTrigger>Who qualifies for USA small business grants?</AccordionTrigger>
                    <AccordionContent>
                      Qualification varies by program, but generally includes: businesses with fewer than 500 employees,
                      annual revenue under SBA size standards, US citizenship or legal residency, business registration
                      in the US, and specific industry or demographic criteria depending on the grant program.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="how-much-funding">
                    <AccordionTrigger>How much funding can I get from government grants?</AccordionTrigger>
                    <AccordionContent>
                      Grant amounts vary widely from $1,000 for local programs to over $1 million for major federal
                      initiatives. Most small business grants range from $10,000 to $500,000. The amount depends on the
                      program, your project scope, and matching fund requirements.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="free-money">
                    <AccordionTrigger>Are government grants really "free money"?</AccordionTrigger>
                    <AccordionContent>
                      While grants don't need to be repaid, they're not "free money." Recipients must meet strict
                      requirements, use funds only for approved purposes, provide detailed reporting, and often
                      contribute matching funds. Non-compliance can result in repayment requirements and penalties.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Eligibility and Requirements</CardTitle>
                <CardDescription>Understanding who can apply and what's required</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="startup-eligible">
                    <AccordionTrigger>Can startups apply for government grants?</AccordionTrigger>
                    <AccordionContent>
                      Yes, many grants specifically target startups and early-stage businesses. However, most require
                      business registration, a solid business plan, and demonstration of viability. Some programs
                      require operational history, while others focus on innovation and growth potential.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="matching-funds">
                    <AccordionTrigger>What are matching funds and are they required?</AccordionTrigger>
                    <AccordionContent>
                      Matching funds are your contribution to the project, typically 10-50% of the total project cost.
                      They can be cash, in-kind services, equipment, or volunteer time. Not all grants require matching
                      funds, but those that do often view higher matches favorably during evaluation.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="credit-score">
                    <AccordionTrigger>Do I need good credit to get a government grant?</AccordionTrigger>
                    <AccordionContent>
                      Most grants don't require credit checks since they're not loans. However, some programs may review
                      financial stability as part of the evaluation process. Focus on demonstrating your ability to
                      manage the grant funds responsibly and achieve project objectives.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="multiple-grants">
                    <AccordionTrigger>Can I apply for multiple grants at the same time?</AccordionTrigger>
                    <AccordionContent>
                      Yes, you can apply for multiple grants simultaneously, but you must disclose other pending
                      applications and funding sources. Ensure you don't double-fund the same expenses and can manage
                      multiple grant requirements if awarded.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Application Process</CardTitle>
                <CardDescription>How to apply and what to expect</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="how-long-process">
                    <AccordionTrigger>How long does the grant application process take?</AccordionTrigger>
                    <AccordionContent>
                      The timeline varies significantly: preparation can take 2-8 weeks, review periods range from 30
                      days to 6 months, and funding disbursement may take additional weeks. Federal grants typically
                      take longer than state or local programs. Start early and plan accordingly.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="success-rates">
                    <AccordionTrigger>What are typical success rates for grant applications?</AccordionTrigger>
                    <AccordionContent>
                      Success rates vary widely by program, typically ranging from 10-40%. Highly competitive federal
                      programs may have success rates under 10%, while local or specialized programs might exceed 50%.
                      Quality applications that closely match program objectives have higher success rates.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="application-cost">
                    <AccordionTrigger>Does it cost money to apply for grants?</AccordionTrigger>
                    <AccordionContent>
                      Legitimate government grants never charge application fees. Be wary of "grant writers" or services
                      that guarantee funding for upfront fees. While you may choose to hire professional grant writers,
                      the application itself should always be free.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="rejected-reapply">
                    <AccordionTrigger>If my application is rejected, can I reapply?</AccordionTrigger>
                    <AccordionContent>
                      Most programs allow reapplication in future funding cycles. Request reviewer feedback to
                      understand weaknesses in your application. Use this feedback to strengthen your proposal, address
                      concerns, and improve your chances in the next round.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>After Award</CardTitle>
                <CardDescription>Managing your grant once awarded</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="fund-restrictions">
                    <AccordionTrigger>What can I use grant funds for?</AccordionTrigger>
                    <AccordionContent>
                      Grant funds must be used exactly as specified in your approved application. Common allowed
                      expenses include equipment, supplies, personnel, training, and direct project costs. Personal
                      expenses, existing debt payments, and activities outside the project scope are typically
                      prohibited.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="reporting-requirements">
                    <AccordionTrigger>What reporting is required after receiving a grant?</AccordionTrigger>
                    <AccordionContent>
                      Most grants require regular progress reports (quarterly or annually), financial reports showing
                      how funds were spent, and final reports documenting outcomes. Some require site visits or audits.
                      Maintain detailed records of all grant-related activities and expenses.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="unused-funds">
                    <AccordionTrigger>What happens if I don't use all the grant money?</AccordionTrigger>
                    <AccordionContent>
                      Unused funds typically must be returned to the granting agency. Some programs allow budget
                      modifications or no-cost extensions if requested in advance. Never use grant funds for
                      unauthorized purposes, even if you have money remaining.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="tax-implications">
                    <AccordionTrigger>Are government grants taxable income?</AccordionTrigger>
                    <AccordionContent>
                      Generally, government grants are taxable income unless specifically excluded by law. Consult with
                      a tax professional to understand your specific situation. Keep detailed records of grant income
                      and related expenses for tax reporting purposes.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {/* Newsletter CTA */}
          <div className="mb-8">
            <NewsletterSignup
              title="Get More Grant Guidance"
              description="Receive expert tips, application templates, and updates on new funding opportunities"
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
