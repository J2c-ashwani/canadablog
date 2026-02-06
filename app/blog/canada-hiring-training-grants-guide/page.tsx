import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, DollarSign, Target, Users, BookOpen, GraduationCap, Briefcase, Shield, Award, HelpCircle, ExternalLink, ArrowRight, AlertTriangle, Lightbulb, UserPlus, Map } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Canada Hiring & Training Grants 2026 | SWPP & Canada Job Grant Guide",
  description: "Complete 2026 guide to Canadian hiring grants. Get up to $7,000 per student hire (SWPP), $10,000 for employee training (CJG), and youth employment subsidies.",
  keywords: "Canada hiring grants 2026, Student Work Placement Program SWPP, Canada Job Grant, employee training grants, hiring subsidies Canada, Canada Summer Jobs",
}

export default function CanadaHiringTrainingGrantsGuide() {
  const faqData = [
    {
      question: "What is the Student Work Placement Program (SWPP)?",
      answer: "SWPP is a federal wage subsidy that pays up to 70% (max $7,000) of a post-secondary student's wage for a work term (typically 4 months). It is designed to help students get real-world experience and helps employers reduce payroll costs."
    },
    {
      question: "Can I receive the grant before I pay the student?",
      answer: "No. SWPP is a reimbursement program. You must pay the student first (on standard payroll, with CPP/EI deductions) and then submit paystubs to get the cheque back from the government (usually 4-8 weeks later)."
    },
    {
      question: "What is the 'Net New' rule?",
      answer: "This is the most critical rule. You must increase the number of student placements compared to your 'baseline' year (usually the year before you first applied). You cannot just fire a full-time employee and hire a subsidized student."
    },
    {
      question: "Can I hire the same student twice?",
      answer: "Yes! You can hire the same student for multiple terms (e.g., Fall term and Winter term) and receive the $7,000 grant for EACH term, provided the student remains eligible."
    },
    {
      question: "Does the Canada Job Grant (CJG) cover travel?",
      answer: "Generally, no. CJG covers tuition, textbooks, and examination fees for third-party training. It rarely covers travel, accommodation, or the employee's wages *while* they are training."
    },
    {
      question: "Can I train myself (the business owner)?",
      answer: "Usually, no. The Canada Job Grant is for 'Arm's Length' employees. Owners with a significant stake (>10%) or their immediate family members are typically ineligible."
    },
    {
      question: "What is the difference between Technation and Magnet?",
      answer: "Technation and Magnet are both 'Delivery Partners' for SWPP. The money comes from the same pot (ESDC), but they have different portals and sometimes different niche focuses (e.g., Technation focuses on Tech roles, BioTalent on Bio-economy)."
    },
    {
      question: "Are international students eligible for SWPP?",
      answer: "No. For federal SWPP grants, the student must be a Canadian Citizen, Permanent Resident, or Refuguee. International students on study permits are NOT eligible."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-indigo-900 to-blue-900 text-white py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-indigo-500/20 text-indigo-100 border-indigo-400/30 px-4 py-1.5 text-sm uppercase tracking-wide">
                🧑‍💻 2026 Workforce Tactics
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                Canada Hiring Grants: <span className="text-indigo-400">Reduce Payroll by 70%</span>
              </h1>
              <p className="text-xl text-indigo-100 mb-10 leading-relaxed max-w-3xl mx-auto">
                Payroll is your biggest expense. Smart companies use the <strong>Student Work Placement Program (SWPP)</strong> to hire top talent for 30 cents on the dollar, and the <strong>Canada Job Grant</strong> to upskill them for free.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white hover:bg-gray-100 text-indigo-900 font-bold text-lg px-10 py-6 shadow-xl" asChild>
                  <Link href="#swpp-deep-dive">
                    SWPP: Get $7,000/Hire
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-indigo-400/50 text-white hover:bg-indigo-900/50 font-semibold text-lg px-10 py-6" asChild>
                  <Link href="#canada-job-grant">
                    Canada Job Grant ($10k)
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* The "Net New" Alert */}
        <section className="py-12 bg-white -mt-8 relative z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg shadow-sm">
                <div className="flex items-start">
                  <Lightbulb className="w-8 h-8 text-yellow-600 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-yellow-900 mb-2">Critical Rule: "Net New" Placements</h3>
                    <p className="text-yellow-800 mb-4">
                      Most hiring grants require you to increase your headcount. You cannot fire an employee and replace them with a subsidized student.
                    </p>
                    <p className="text-yellow-800 font-medium">
                      <strong>The Math:</strong> If you hired 2 students last year (your baseline), you usually need to hire 3 this year to get funding for the 3rd one. *Note: Some delivery partners relax this rule periodically, but always check first.*
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: SWPP Deep Dive */}
        <section id="swpp-deep-dive" className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center mb-8">
                <GraduationCap className="w-10 h-10 text-indigo-600 mr-4" />
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">1. Student Work Placement Program (SWPP)</h2>
                  <p className="text-gray-600">The "Bread and Butter" of Canadian Startup Hiring</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-12 mb-12">
                <div>
                  <p className="text-lg text-gray-700 mb-6">
                    SWPP is not one single program; it is delivered by roughly 12 different "Industry Partners". You apply to the partner that matches the <strong>role</strong> of the student, not necessarily your industry.
                  </p>
                  <Card className="border-indigo-100 bg-indigo-50/50 mb-6">
                    <CardHeader><CardTitle className="text-indigo-900">Funding Rates</CardTitle></CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700">Standard Student:</span>
                        <span className="font-bold text-indigo-700">50% up to $5,000</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Under-represented / 1st Year:</span>
                        <span className="font-bold text-indigo-700">70% up to $7,000</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">*Includes Women in STEM, Indigenous, Persons with Disabilities, Recent Immigrants.</p>
                    </CardContent>
                  </Card>

                  <h4 className="font-bold text-gray-900 mb-4">Top Delivery Partners</h4>
                  <ul className="space-y-4">
                    <li className="flex items-start bg-white p-3 rounded border border-gray-200 shadow-sm">
                      <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 mt-0.5" />
                      <div>
                        <strong className="block text-gray-900">TECHNATION (Formerly ITAC)</strong>
                        <span className="text-sm text-gray-600">Best for: Tech roles (Developers, UX Designers, Product Managers). High volume, good portal.</span>
                      </div>
                    </li>
                    <li className="flex items-start bg-white p-3 rounded border border-gray-200 shadow-sm">
                      <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 mt-0.5" />
                      <div>
                        <strong className="block text-gray-900">Magnet</strong>
                        <span className="text-sm text-gray-600">Best for: General roles. Use Magnet if you don't fit perfectly into a specific niche.</span>
                      </div>
                    </li>
                    <li className="flex items-start bg-white p-3 rounded border border-gray-200 shadow-sm">
                      <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 mt-0.5" />
                      <div>
                        <strong className="block text-gray-900">BioTalent</strong>
                        <span className="text-sm text-gray-600">Best for: Science, Lab techs, Healthcare roles.</span>
                      </div>
                    </li>
                    <li className="flex items-start bg-white p-3 rounded border border-gray-200 shadow-sm">
                      <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 mt-0.5" />
                      <div>
                        <strong className="block text-gray-900">Venture for Canada</strong>
                        <span className="text-sm text-gray-600">Best for: Entrepreneurial students. Bonus: They provide training camps for the students.</span>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-100 p-8 rounded-xl border border-gray-200">
                  <h3 className="font-bold text-xl text-gray-900 mb-6">Step-by-Step: Getting the Cheque</h3>
                  <div className="space-y-6 relative">
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">1</div>
                        <div className="w-0.5 h-full bg-indigo-200 my-1"></div>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm">Post Job & Apply</h4>
                        <p className="text-xs text-gray-600">Create account on partner portal (e.g., Technation). Submit job description. Get "Pre-approval".</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">2</div>
                        <div className="w-0.5 h-full bg-indigo-200 my-1"></div>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm">Hire & Add Student</h4>
                        <p className="text-xs text-gray-600">Interview and hire eligible student. Add their proof of citizenship and enrollment to portal.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">3</div>
                        <div className="w-0.5 h-full bg-indigo-200 my-1"></div>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm">Pay Wages</h4>
                        <p className="text-xs text-gray-600">Run payroll as normal. Student gets full salary. Keep all paystubs.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm">4</div>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm">Submit Claims</h4>
                        <p className="text-xs text-gray-600">Upload paystubs at end of term (or mid-term). Receive direct deposit within 6 weeks.</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 bg-white p-4 rounded border border-indigo-200">
                    <p className="text-sm font-bold text-indigo-900 mb-1">💡 Insider Tip:</p>
                    <p className="text-xs text-gray-600">
                      Apply BEFORE the student starts. Many partners reject retroactive applications. The safest bet is to apply as soon as you post the job.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Canada Job Grant */}
        <section id="canada-job-grant" className="py-20 bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">2. The Canada Job Grant (CJG)</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Need to train your EXISTING staff? The CJG pays for third-party training. It is provincially administered, so names vary (COJG, CAJG, etc.).
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <Card className="hover:shadow-lg transition-shadow border-blue-200 bg-white">
                  <CardHeader>
                    <BookOpen className="w-10 h-10 text-blue-600 mb-2" />
                    <CardTitle className="text-xl text-gray-900">The Deal</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4">
                      Government covers <strong>2/3rds</strong> of training costs. You cover 1/3rd.
                    </p>
                    <div className="bg-blue-50 p-3 rounded">
                      <p className="text-sm font-bold text-blue-900">Example:</p>
                      <p className="text-xs text-blue-800">$3,000 Course Cost</p>
                      <p className="text-xs text-blue-800">Gov pays: $2,000</p>
                      <p className="text-xs text-blue-800">You pay: $1,000</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow border-blue-200 bg-white">
                  <CardHeader>
                    <UserPlus className="w-10 h-10 text-blue-600 mb-2" />
                    <CardTitle className="text-xl text-gray-900">Hiring Unemployed?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4">
                      If you hire and train an unemployed person, the government covers <strong>100%</strong> of training costs (up to $15k).
                    </p>
                    <div className="bg-emerald-50 p-3 rounded">
                      <p className="text-sm font-bold text-emerald-900">Total Cover:</p>
                      <p className="text-xs text-emerald-800">$15,000 Training</p>
                      <p className="text-xs text-emerald-800">You pay: $0</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow border-blue-200 bg-white">
                  <CardHeader>
                    <Map className="w-10 h-10 text-blue-600 mb-2" />
                    <CardTitle className="text-xl text-gray-900">Provincial Names</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-2 text-gray-600">
                      <li><strong>Ontario:</strong> COJG (Canada-Ontario Job Grant)</li>
                      <li><strong>Alberta:</strong> CAJG (Canada-Alberta Job Grant)</li>
                      <li><strong>BC:</strong> ETG (Employer Training Grant)</li>
                      <li><strong>Quebec:</strong> Workforce Skills Development</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-12 bg-white border border-gray-200 p-8 rounded-xl shadow-sm">
                <h4 className="font-bold text-lg text-gray-900 mb-4">What Training Qualifies?</h4>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h5 className="font-bold text-emerald-700 mb-2">✅ Eligible</h5>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-center"><CheckCircle className="w-3 h-3 text-emerald-500 mr-2" /> Third-party trainer (College, Private Institute)</li>
                      <li className="flex items-center"><CheckCircle className="w-3 h-3 text-emerald-500 mr-2" /> "Soft Skills" (Leadership, Sales Training)</li>
                      <li className="flex items-center"><CheckCircle className="w-3 h-3 text-emerald-500 mr-2" /> Technical Certification (PMP, Agile, AWS)</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-bold text-red-700 mb-2">❌ Ineligible</h5>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-center"><AlertTriangle className="w-3 h-3 text-red-500 mr-2" /> Internal training (You teaching your staff)</li>
                      <li className="flex items-center"><AlertTriangle className="w-3 h-3 text-red-500 mr-2" /> Conferences (Unless there is a curriculum)</li>
                      <li className="flex items-center"><AlertTriangle className="w-3 h-3 text-red-500 mr-2" /> Product usage training (e.g. standard onboarding)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: The "Stack" Case Study */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="bg-indigo-900 text-white rounded-3xl p-8 md:p-12 shadow-2xl">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <Badge className="bg-indigo-500 text-white mb-6 border-none">Case Study</Badge>
                    <h2 className="text-3xl font-bold mb-6">How "TechStart Inc" Saved $35,000</h2>
                    <p className="text-indigo-100 text-lg mb-6 leading-relaxed">
                      TechStart Inc need to build an MVP and train their Sales Lead. They didn't have $100k for payroll. Here is how they stacked the grants.
                    </p>
                    <div className="space-y-4">
                      <div className="flex justify-between border-b border-indigo-700 pb-2">
                        <span>3 Student Devs (SWPP):</span>
                        <span className="text-emerald-400">+$21,000 Refund</span>
                      </div>
                      <div className="flex justify-between border-b border-indigo-700 pb-2">
                        <span>Sales Training (COJG):</span>
                        <span className="text-emerald-400">+$6,600 Refund</span>
                      </div>
                      <div className="flex justify-between border-b border-indigo-700 pb-2">
                        <span>Summer Student (CSJ):</span>
                        <span className="text-emerald-400">+$4,200 Refund</span>
                      </div>
                      <div className="flex justify-between text-2xl font-bold pt-4">
                        <span>Total Savings:</span>
                        <span className="text-emerald-400">$31,800</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-indigo-800 p-8 rounded-xl border border-indigo-700 text-center">
                    <h4 className="font-bold text-xl mb-4 text-white">The "Paperwork" Reality</h4>
                    <p className="text-indigo-200 text-sm mb-6">
                      It took them about 10 hours of paperwork total. That's a return of <strong>$3,180 per hour</strong> of administrative work.
                    </p>
                    <p className="text-indigo-200 text-sm font-bold">
                      Is 10 hours of paperwork worth $31,000 to you?
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed FAQ Section */}
        <section className="py-20 bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {faqData.map((faq, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-2 flex items-start">
                      <HelpCircle className="w-5 h-5 text-indigo-500 mr-3 mt-0.5 flex-shrink-0" />
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 pl-8">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-gray-900 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6">Start Hiring for Less</h2>
              <p className="text-xl text-gray-300 mb-10">
                You don't need to navigate the 12+ SWPP partners alone. Our guide helps you pick the right one.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg px-8 py-4 h-auto" asChild>
                  <Link href="/contact?service=hiring-grants-setup">
                    <UserPlus className="w-5 h-5 mr-2" />
                    Get Help with SWPP
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white font-semibold text-lg px-8 py-4 h-auto" asChild>
                  <Link href="/blog/canada-startup-funding-grants-guide">
                    Explore Startup Funding
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}
