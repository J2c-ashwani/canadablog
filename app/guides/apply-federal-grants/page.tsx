import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, CheckCircle, Clock, FileText, Users, MessageCircle, Search, Award, TrendingUp, AlertTriangle, HelpCircle, ArrowRight, DollarSign, Target, Building } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "How to Apply for Federal Grants 2025 | Complete Application Guide | Grants.gov, SAM.gov, SBIR",
  description: "Step-by-step guide to applying for federal grants. Learn eligibility requirements, application process, winning strategies, and access billions in government funding through Grants.gov, SBIR, and more.",
  keywords: "federal grants application, how to apply federal grants, government grants, grants.gov application, federal funding guide, SBIR grants, SAM registration",
  alternates: {
    canonical: "https://www.fsidigital.ca/guides/apply-federal-grants",
  },
  openGraph: {
    title: "How to Apply for Federal Grants 2025",
    description: "Complete guide to applying for federal grants with winning strategies and step-by-step process.",
    url: "https://www.fsidigital.ca/guides/apply-federal-grants",
    images: ["/og-image.png"],
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the difference between grants and loans?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Grants are free money that doesn't need to be repaid. Loans must be paid back with interest. Federal grants are awarded based on merit, eligibility, and alignment with program objectives. Loans are based on creditworthiness and ability to repay."
      }
    },
    {
      "@type": "Question",
      "name": "How long does SAM.gov registration take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SAM.gov registration typically takes 7-10 business days for processing. However, it can take up to 3-4 weeks if there are issues with your information. You must renew your SAM registration annually to remain eligible for federal grants."
      }
    },
    {
      "@type": "Question",
      "name": "What is Grants.gov and how do I use it?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Grants.gov is the central portal for finding and applying to federal grant opportunities. You can search for grants by keyword, agency, or eligibility. After finding an opportunity, you download the application package, complete it, and submit through the portal."
      }
    },
    {
      "@type": "Question",
      "name": "What are SBIR and STTR grants?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SBIR (Small Business Innovation Research) and STTR (Small Business Technology Transfer) are federal programs that provide R&D funding to small businesses. SBIR has three phases with funding up to $1.7M+. STTR requires partnership with a research institution."
      }
    },
    {
      "@type": "Question",
      "name": "What is the success rate for federal grants?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Success rates vary by program and agency, typically ranging from 5% to 30%. SBIR Phase I has around 15-20% success rates. Competitive research grants from NIH/NSF can be 10-25%. Strong proposals with expert guidance significantly improve chances."
      }
    },
    {
      "@type": "Question",
      "name": "Can for-profit businesses apply for federal grants?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! Many federal grants are available to for-profit businesses, especially through SBIR/STTR, SBA programs, and industry-specific grants from agencies like DOE, USDA, and DoD. However, some grants are limited to nonprofits or government entities."
      }
    }
  ]
}

export default function ApplyFederalGrantsGuide() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30">
                🇺🇸 Federal Grants Application Guide 2025
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
                How to Apply for Federal Grants
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed text-pretty">
                Complete step-by-step guide to applying for federal grants. Learn how to navigate the federal funding landscape
                and secure government grants for your business, nonprofit, or research project.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                  <Link href="#programs">
                    View Programs
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-blue-700/30 border-white/30 text-white hover:bg-white/20" asChild>
                  <Link href="#process">
                    See Process
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* QUERY HOOK: Common Questions */}
        <div className="bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm/50">
          <div className="container mx-auto px-4 py-4">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-gray-600 gap-4">
              <span className="font-semibold text-gray-900 flex items-center">
                <MessageCircle className="w-4 h-4 mr-2 text-blue-600" />
                Common Questions:
              </span>
              <div className="flex gap-4 overflow-x-auto no-scrollbar whitespace-nowrap">
                <Link href="#sbir" className="hover:text-blue-600 transition-colors">SBIR Grants?</Link>
                <Link href="#registration" className="hover:text-blue-600 transition-colors">SAM.gov?</Link>
                <Link href="#process" className="hover:text-blue-600 transition-colors">How Long?</Link>
                <Link href="#eligibility" className="hover:text-blue-600 transition-colors">Who Qualifies?</Link>
                <Link href="#faq" className="hover:text-blue-600 transition-colors">FAQs</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Overview */}
        <section className="py-12 bg-white border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">$750B+</div>
                  <div className="text-gray-600">Federal Grants Annually</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">26</div>
                  <div className="text-gray-600">Federal Agencies</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">2,000+</div>
                  <div className="text-gray-600">Grant Programs Available</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">15%</div>
                  <div className="text-gray-600">Average Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">

              {/* Understanding Federal Grants */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">How do federal grants work?</h2>

                <p className="text-gray-700 mb-6 leading-relaxed">
                  Federal grants are non-repayable funding awards from the U.S. government to eligible entities including
                  businesses, nonprofits, state/local governments, and educational institutions. Unlike loans, grants don't
                  need to be paid back—but they come with strict eligibility requirements and reporting obligations.
                </p>

                <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mb-6">
                  <div className="flex items-start">
                    <DollarSign className="w-8 h-8 text-blue-600 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-blue-900 mb-2">The Federal Funding Landscape</h4>
                      <p className="text-blue-800 leading-relaxed">
                        Over $750 billion in federal grants are awarded annually across 26 agencies. The largest funders
                        include Health and Human Services (HHS), Education, and Defense. Competition is intense, but with
                        strategic preparation, success is achievable.
                      </p>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4">Types of Federal Grant Recipients</h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-bold text-gray-900 mb-2">For-Profit Businesses</h4>
                    <p className="text-sm text-gray-600">SBIR/STTR, DOE, USDA, DoD, and industry-specific programs.</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-bold text-gray-900 mb-2">Nonprofits</h4>
                    <p className="text-sm text-gray-600">Social services, education, healthcare, arts, and community development.</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-bold text-gray-900 mb-2">Educational Institutions</h4>
                    <p className="text-sm text-gray-600">Research grants, student programs, facility improvements.</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-bold text-gray-900 mb-2">State/Local Government</h4>
                    <p className="text-sm text-gray-600">Infrastructure, public safety, economic development.</p>
                  </div>
                </div>
              </div>

              {/* Major Federal Grant Programs */}
              <div id="programs" className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">What are the major federal grant programs?</h2>

                <div className="space-y-6">
                  {/* SBIR/STTR */}
                  <div id="sbir" className="border border-blue-200 rounded-lg p-6 bg-blue-50/30">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-xl text-blue-700 flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2" />
                        SBIR/STTR Programs
                      </h3>
                      <Badge className="bg-blue-100 text-blue-800">$50K-$1.7M+</Badge>
                    </div>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      The Small Business Innovation Research (SBIR) and Small Business Technology Transfer (STTR) programs
                      provide R&D funding to small businesses. Eleven federal agencies participate, with DoD, NIH, DOE, and
                      NSF being the largest funders.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">SBIR Phases:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li className="flex items-start"><ArrowRight className="w-3 h-3 mr-2 mt-1 text-blue-500" /> Phase I: Feasibility ($50K-$275K)</li>
                          <li className="flex items-start"><ArrowRight className="w-3 h-3 mr-2 mt-1 text-blue-500" /> Phase II: Development ($750K-$1.7M)</li>
                          <li className="flex items-start"><ArrowRight className="w-3 h-3 mr-2 mt-1 text-blue-500" /> Phase III: Commercialization (no cap)</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Key Requirements:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li className="flex items-start"><CheckCircle className="w-3 h-3 mr-2 mt-1 text-green-500" /> U.S.-owned small business (&lt;500 employees)</li>
                          <li className="flex items-start"><CheckCircle className="w-3 h-3 mr-2 mt-1 text-green-500" /> Principal investigator primarily employed</li>
                          <li className="flex items-start"><CheckCircle className="w-3 h-3 mr-2 mt-1 text-green-500" /> R&D focus with commercial potential</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Research & Development */}
                  <div className="border border-green-200 rounded-lg p-6 bg-green-50/30">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-xl text-green-700 flex items-center">
                        <Award className="w-5 h-5 mr-2" />
                        Research & Development Grants
                      </h3>
                      <Badge className="bg-green-100 text-green-800">NIH, NSF, DOE</Badge>
                    </div>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      Major research agencies provide substantial funding for scientific and technological advancement.
                      NIH alone distributes over $40 billion annually, while NSF funds approximately $9 billion in research.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Major Research Agencies:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• National Institutes of Health (NIH)</li>
                          <li>• National Science Foundation (NSF)</li>
                          <li>• Department of Energy (DOE)</li>
                          <li>• Department of Defense (DoD)</li>
                          <li>• NASA Research Programs</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Focus Areas:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Basic & Applied Sciences</li>
                          <li>• Health & Medical Research</li>
                          <li>• Climate & Energy</li>
                          <li>• Technology & Innovation</li>
                          <li>• Defense & Security</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Economic Development */}
                  <div className="border border-purple-200 rounded-lg p-6 bg-purple-50/30">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-xl text-purple-700 flex items-center">
                        <Building className="w-5 h-5 mr-2" />
                        Economic Development & Business
                      </h3>
                      <Badge className="bg-purple-100 text-purple-800">SBA, EDA, USDA</Badge>
                    </div>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      The Small Business Administration (SBA), Economic Development Administration (EDA), and USDA
                      Rural Development provide funding for business growth, community development, and rural economic
                      initiatives.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-white p-3 rounded">
                        <h5 className="font-semibold text-gray-900 mb-1 text-sm">SBA Programs</h5>
                        <p className="text-xs text-gray-600">Growth accelerators, export assistance, disaster relief</p>
                      </div>
                      <div className="bg-white p-3 rounded">
                        <h5 className="font-semibold text-gray-900 mb-1 text-sm">EDA Grants</h5>
                        <p className="text-xs text-gray-600">Infrastructure, innovation hubs, regional development</p>
                      </div>
                      <div className="bg-white p-3 rounded">
                        <h5 className="font-semibold text-gray-900 mb-1 text-sm">USDA Rural</h5>
                        <p className="text-xs text-gray-600">Rural business development, ag innovation, infrastructure</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Application Process */}
              <div id="process" className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">How long does the federal grant process take?</h2>

                <p className="text-gray-700 mb-6 leading-relaxed">
                  Federal grant applications are complex and time-intensive. Plan for 6-12 months from initial research
                  to submission, with award decisions taking an additional 3-6 months after deadline.
                </p>

                <div className="relative border-l-2 border-blue-100 pl-8 ml-4 space-y-8">
                  <div className="relative">
                    <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-blue-600 border-4 border-white shadow-sm flex items-center justify-center text-white text-xs font-bold">1</div>
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Strategic Planning (6-12 Months Before)</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Research funding opportunities and agencies</li>
                      <li>• Build partnerships and collaborations</li>
                      <li>• Develop preliminary project concepts</li>
                    </ul>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-blue-600 border-4 border-white shadow-sm flex items-center justify-center text-white text-xs font-bold">2</div>
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Pre-Application (3-6 Months Before)</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Complete SAM.gov and Grants.gov registration</li>
                      <li>• Contact program officers for guidance</li>
                      <li>• Attend informational webinars</li>
                    </ul>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-blue-600 border-4 border-white shadow-sm flex items-center justify-center text-white text-xs font-bold">3</div>
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Application Development (1-3 Months)</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Write proposal and narrative sections</li>
                      <li>• Develop detailed budget and justification</li>
                      <li>• Gather required documents and letters</li>
                    </ul>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-green-600 border-4 border-white shadow-sm flex items-center justify-center text-white text-xs font-bold">4</div>
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Final Review & Submission (2-4 Weeks)</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Internal reviews and edits</li>
                      <li>• Test submission in Grants.gov</li>
                      <li>• Submit before deadline with buffer time</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <div className="flex items-start">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-yellow-800 mb-2">💡 Pro Tip: Start Early</h4>
                      <p className="text-yellow-700 text-sm">
                        Federal grants are highly competitive. Starting 6-12 months before the deadline gives you time
                        to develop strong partnerships, gather preliminary data, and craft a compelling proposal.
                        Last-minute applications rarely succeed.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Registration Requirements */}
              <div id="registration" className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">What registrations are required?</h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border border-blue-200 rounded-lg p-6">
                    <h4 className="font-bold text-lg text-blue-700 mb-4">SAM.gov Registration</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      System for Award Management - Required for ALL federal awards.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li className="flex items-center"><Clock className="w-4 h-4 mr-2 text-blue-500" /> Processing: 7-10 business days</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" /> Annual renewal required</li>
                      <li className="flex items-center"><DollarSign className="w-4 h-4 mr-2 text-gray-500" /> No cost to register</li>
                    </ul>
                  </div>
                  <div className="border border-green-200 rounded-lg p-6">
                    <h4 className="font-bold text-lg text-green-700 mb-4">Grants.gov Registration</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Federal grant application portal - Where you find and apply.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" /> Requires active SAM registration</li>
                      <li className="flex items-center"><Users className="w-4 h-4 mr-2 text-blue-500" /> Organization workspace setup</li>
                      <li className="flex items-center"><FileText className="w-4 h-4 mr-2 text-purple-500" /> Authorized representative designation</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Eligibility */}
              <div id="eligibility" className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Who is eligible for federal grants?</h2>

                <p className="text-gray-700 mb-6 leading-relaxed">
                  Eligibility varies significantly by program. Some grants are open to businesses, while others are
                  limited to nonprofits, educational institutions, or government entities.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h4 className="font-bold text-green-800 mb-4 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Common Eligible Entities
                    </h4>
                    <ul className="text-green-700 space-y-2 text-sm">
                      <li>✓ Small businesses (SBIR/STTR)</li>
                      <li>✓ 501(c)(3) nonprofit organizations</li>
                      <li>✓ State and local governments</li>
                      <li>✓ Educational institutions</li>
                      <li>✓ Tribal organizations</li>
                      <li>✓ Research institutions</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h4 className="font-bold text-red-800 mb-4 flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      Common Disqualifiers
                    </h4>
                    <ul className="text-red-700 space-y-2 text-sm">
                      <li>✗ Debarred or suspended entities</li>
                      <li>✗ Outstanding federal debt</li>
                      <li>✗ Incomplete SAM registration</li>
                      <li>✗ Previous fraud or misuse of funds</li>
                      <li>✗ Late applications (no exceptions)</li>
                      <li>✗ Ineligible business types for specific programs</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* FAQ Block */}
              <div id="faq" className="bg-gray-50 rounded-xl p-8 mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <HelpCircle className="w-6 h-6 text-blue-600 mr-2" />
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-2">Can I apply for multiple federal grants simultaneously?</h3>
                    <p className="text-gray-600">Yes, you can apply to multiple grants. However, you must disclose all funding sources and cannot receive duplicate funding for the same activities. Some agencies limit concurrent applications.</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-2">What happens if my application is rejected?</h3>
                    <p className="text-gray-600">Request reviewer feedback (usually available within 30-60 days). Use this to strengthen your next application. Many successful grantees were rejected on their first attempt.</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-2">Are grant funds taxable?</h3>
                    <p className="text-gray-600">Generally yes, for businesses. However, treatment varies by entity type and use of funds. Consult a tax professional familiar with federal grants.</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-2">Can international companies apply?</h3>
                    <p className="text-gray-600">Most federal grants require U.S. presence. Some programs allow foreign participation, but typically require a U.S. subsidiary or partner entity.</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-2">What is cost share/matching?</h3>
                    <p className="text-gray-600">Many grants require recipients to contribute a portion of project costs. This can be cash or in-kind contributions. SBIR Phase I typically has no match requirement.</p>
                  </div>
                </div>
              </div>

              {/* Neural Network: Related Guides */}
              <div className="border-t border-gray-200 pt-12 mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Explore Related Funding Guides</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <Link href="/guides/sbir-research-grants-guide" className="group block">
                    <div className="bg-white border hover:border-blue-300 rounded-lg p-4 transition-all hover:shadow-md h-full">
                      <div className="text-sm text-blue-600 font-semibold mb-2">Federal R&D</div>
                      <h4 className="font-bold text-gray-900 group-hover:text-blue-700 mb-2">SBIR Grants Guide</h4>
                      <p className="text-sm text-gray-500">Deep dive into SBIR/STTR application strategies.</p>
                    </div>
                  </Link>
                  <Link href="/guides/apply-csbfp-government-financing" className="group block">
                    <div className="bg-white border hover:border-green-300 rounded-lg p-4 transition-all hover:shadow-md h-full">
                      <div className="text-sm text-green-600 font-semibold mb-2">Canadian Alternative</div>
                      <h4 className="font-bold text-gray-900 group-hover:text-green-700 mb-2">CSBFP Loans Guide</h4>
                      <p className="text-sm text-gray-500">Government-backed financing for Canadian businesses.</p>
                    </div>
                  </Link>
                  <Link href="/guides/irap-innovation-application-guide" className="group block">
                    <div className="bg-white border hover:border-purple-300 rounded-lg p-4 transition-all hover:shadow-md h-full">
                      <div className="text-sm text-purple-600 font-semibold mb-2">Canadian R&D</div>
                      <h4 className="font-bold text-gray-900 group-hover:text-purple-700 mb-2">IRAP Grant Guide</h4>
                      <p className="text-sm text-gray-500">Canada's premier innovation funding program.</p>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Official Resources */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Official Federal Grant Resources</h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-blue-200 shadow-none">
                    <CardHeader>
                      <CardTitle className="text-blue-700">Primary Portals</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">Grants.gov</h5>
                          <p className="text-sm text-gray-600">Find and apply for federal grants</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://www.grants.gov/" target="_blank" rel="noopener noreferrer">
                            Visit <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">SAM.gov</h5>
                          <p className="text-sm text-gray-600">Entity registration and validation</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://sam.gov/" target="_blank" rel="noopener noreferrer">
                            Visit <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">SBIR.gov</h5>
                          <p className="text-sm text-gray-600">Small business R&D opportunities</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://www.sbir.gov/" target="_blank" rel="noopener noreferrer">
                            Visit <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-green-200 shadow-none">
                    <CardHeader>
                      <CardTitle className="text-green-700">Support Resources</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">Grants Learning Center</h5>
                          <p className="text-sm text-gray-600">Training and resources</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://www.grants.gov/learn-grants" target="_blank" rel="noopener noreferrer">
                            Visit <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">Federal Register</h5>
                          <p className="text-sm text-gray-600">Official announcements</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://www.federalregister.gov/" target="_blank" rel="noopener noreferrer">
                            Visit <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <h5 className="font-semibold">USA.gov Grants</h5>
                          <p className="text-sm text-gray-600">Government grants info hub</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="https://www.usa.gov/grants" target="_blank" rel="noopener noreferrer">
                            Visit <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* CTA Section */}
              <div className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-xl p-8 text-white text-center">
                <h3 className="text-2xl font-bold mb-4">Need Help with Your Federal Grant Application?</h3>
                <p className="text-blue-100 mb-6 max-w-xl mx-auto">
                  Federal grants are highly competitive. Our grant writing experts can help you navigate
                  the process, develop winning strategies, and maximize your chances of success.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-white text-blue-800 hover:bg-blue-50 font-semibold" asChild>
                    <Link href="/contact?service=federal-grants-expert-help">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Get Expert Help
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" asChild>
                    <Link href="/grant-finder">
                      Browse All Programs
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
