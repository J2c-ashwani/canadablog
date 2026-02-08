import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Clock, DollarSign, Target, CheckCircle, AlertCircle, Users, TrendingUp, BarChart, HelpCircle, FileText } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "National Women's Business Council (NWBC) Programs Guide 2026 | Federal Women's Business Advisory",
  description: "Complete guide to NWBC programs and initiatives. Learn how the National Women's Business Council supports women entrepreneurs through policy and advocacy.",
  keywords: "NWBC, national womens business council, women business policy, federal women entrepreneur support, women business advocacy",
  openGraph: {
    title: "National Women's Business Council (NWBC) Programs Guide 2026",
    description: "Complete guide to NWBC programs, research initiatives, and policy advocacy for women entrepreneurs.",
    url: "https://www.fsidigital.ca/blog/nwbc-programs-guide",
  },
}

export default function NWBCProgramsGuide() {
  const faqData = [
    {
      question: "Does the NWBC provide grants directly?",
      answer: "No. The NWBC is a federal advisory council, not a funding agency. They influence policy that creates funding programs (like WBCs and WOSB contracting), but they do not distribute money directly to businesses."
    },
    {
      question: "How can I join the National Women's Business Council?",
      answer: "Council members are appointed by the President, the SBA Administrator, and heads of Congressional small business committees. It is a prestigious appointment, typically reserved for accomplished business owners and leaders of major women's organizations."
    },
    {
      question: "Can I attend NWBC meetings?",
      answer: "Yes! Creating opportunities for public engagement is a key part of their mission. Public meetings are held quarterly (often virtually) and include periods for public comment where you can voice your concerns."
    },
    {
      question: "What is the difference between NWBC and a WBC?",
      answer: "The NWBC (Council) operates at the federal level to change laws and policy. A WBC (Center) operates at the local level to provide direct training and counseling to you. Think of NWBC as the 'architect' and WBCs as the 'builders'."
    },
    {
      question: "Where can I find NWBC research reports?",
      answer: "All research reports, annual reports, and policy recommendations are available for free on the official NWBC.gov website. They are excellent resources for understanding market trends and statistics."
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
        <section className="bg-gradient-to-br from-blue-600 to-cyan-700 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🏛️ NWBC Federal Advisory
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                National Women's Business Council Guide
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Everything you need to know about the NWBC's role in advocating for women entrepreneurs and shaping federal policy for women-owned businesses.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
                  Explore NWBC Resources
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild>
                  <Link href="/usa/women-entrepreneurs-grants">
                    Back to Women's Grants
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">30+</div>
                <div className="text-gray-600">Years Advocating for Women</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-cyan-600 mb-2">13M</div>
                <div className="text-gray-600">Women-Owned Businesses Served</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">15</div>
                <div className="text-gray-600">Council Members</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600 mb-2">50+</div>
                <div className="text-gray-600">Policy Recommendations</div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">

              {/* What is NWBC */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">What is the National Women's Business Council (NWBC)?</h2>
                <p className="text-lg text-gray-700 mb-6">
                  The National Women's Business Council is a federal advisory council created to serve as an independent
                  voice for women's business issues. Established in 1988, the NWBC provides policy advice and
                  recommendations to the President, Congress, and the Small Business Administration.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h4 className="font-bold text-lg mb-3 text-blue-800">NWBC Mission</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Advocate for women entrepreneurs at federal level</li>
                      <li>• Research women's business development needs</li>
                      <li>• Recommend policy improvements</li>
                      <li>• Monitor program effectiveness</li>
                    </ul>
                  </div>

                  <div className="bg-cyan-50 p-6 rounded-lg">
                    <h4 className="font-bold text-lg mb-3 text-cyan-800">Key Focus Areas</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Access to capital and credit</li>
                      <li>• Federal contracting opportunities</li>
                      <li>• Business development programs</li>
                      <li>• Economic research and data</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* NWBC Structure */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">NWBC Structure and Leadership</h2>

                <div className="space-y-8">
                  {/* Council Composition */}
                  <Card className="border-blue-200">
                    <CardHeader>
                      <div className="flex items-center mb-2">
                        <Users className="w-6 h-6 text-blue-600 mr-3" />
                        <CardTitle className="text-blue-700">Council Composition</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center">
                          <Target className="w-5 h-5 text-blue-600 mr-2" />
                          <span><strong>Members:</strong> 15 Total</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-5 h-5 text-green-600 mr-2" />
                          <span><strong>Terms:</strong> 3 Years</span>
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="w-5 h-5 text-purple-600 mr-2" />
                          <span><strong>Status:</strong> Volunteer</span>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4">
                        The NWBC consists of 15 members appointed by the President, representing diverse industries,
                        geographic regions, and business sizes to provide comprehensive perspective on women's business issues.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-semibold mb-2">Member Categories:</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Women business owners (majority)</li>
                            <li>• Representatives of women's business organizations</li>
                            <li>• Lending and investment professionals</li>
                            <li>• Academic and research experts</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-2">Selection Criteria:</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Proven expertise in women's business issues</li>
                            <li>• Geographic and industry diversity</li>
                            <li>• Representation across business sizes</li>
                            <li>• Commitment to NWBC mission</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Ex-Officio Members */}
                  <Card className="border-cyan-200">
                    <CardHeader>
                      <div className="flex items-center mb-2">
                        <BarChart className="w-6 h-6 text-cyan-600 mr-3" />
                        <CardTitle className="text-cyan-700">Ex-Officio Federal Representatives</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4">
                        Federal agency representatives serve as non-voting ex-officio members, providing government
                        perspective and ensuring coordination across federal programs.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-semibold mb-2">Key Federal Agencies:</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Small Business Administration (SBA)</li>
                            <li>• Department of Commerce</li>
                            <li>• Department of Labor</li>
                            <li>• Office of Management and Budget</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-2">Role of Ex-Officio Members:</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Provide federal program insights</li>
                            <li>• Ensure policy coordination</li>
                            <li>• Share implementation challenges</li>
                            <li>• Support recommendation development</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Resource Network Deep Dive */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8 border-t-4 border-cyan-500">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Decoding the Support Network: WBC vs. SBDC vs. SCORE</h2>
                <p className="text-lg text-gray-700 mb-8">
                  The NWBC works closely with three major support networks. Understanding which one you need can save you months of time.
                </p>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-pink-50 p-6 rounded-xl border border-pink-100">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center font-bold mr-3">WBC</div>
                      <h3 className="font-bold text-gray-900">Women's Business Centers</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-4 h-20"><strong>Best For:</strong> Women-specific challenges, community, and long-term training.</p>
                    <ul className="text-xs text-gray-700 space-y-2">
                      <li className="flex items-start"><CheckCircle className="w-3 h-3 text-pink-500 mr-2 mt-0.5" /> <span>Mindset & confidence coaching</span></li>
                      <li className="flex items-start"><CheckCircle className="w-3 h-3 text-pink-500 mr-2 mt-0.5" /> <span>Marketing to female demographics</span></li>
                      <li className="flex items-start"><CheckCircle className="w-3 h-3 text-pink-500 mr-2 mt-0.5" /> <span>Work-life balance strategies</span></li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold mr-3">SBDC</div>
                      <h3 className="font-bold text-gray-900">Small Business Dev Centers</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-4 h-20"><strong>Best For:</strong> Technical business planning, financial projections, and loan packaging.</p>
                    <ul className="text-xs text-gray-700 space-y-2">
                      <li className="flex items-start"><CheckCircle className="w-3 h-3 text-blue-500 mr-2 mt-0.5" /> <span>Detailed business plans</span></li>
                      <li className="flex items-start"><CheckCircle className="w-3 h-3 text-blue-500 mr-2 mt-0.5" /> <span>Export/Import regulations</span></li>
                      <li className="flex items-start"><CheckCircle className="w-3 h-3 text-blue-500 mr-2 mt-0.5" /> <span>Manufacturing optimization</span></li>
                    </ul>
                  </div>

                  <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold mr-3">SCORE</div>
                      <h3 className="font-bold text-gray-900">Service Corps of Retired Execs</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-4 h-20"><strong>Best For:</strong> 1-on-1 mentoring from someone who has "been there, done that."</p>
                    <ul className="text-xs text-gray-700 space-y-2">
                      <li className="flex items-start"><CheckCircle className="w-3 h-3 text-orange-500 mr-2 mt-0.5" /> <span>Industry-specific advice</span></li>
                      <li className="flex items-start"><CheckCircle className="w-3 h-3 text-orange-500 mr-2 mt-0.5" /> <span>Crisis management</span></li>
                      <li className="flex items-start"><CheckCircle className="w-3 h-3 text-orange-500 mr-2 mt-0.5" /> <span>Sounding board for ideas</span></li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* NWBC Programs and Initiatives */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">NWBC Programs and Initiatives</h2>

                <div className="space-y-6">
                  <Card className="border-orange-200">
                    <CardHeader>
                      <CardTitle className="text-orange-700">Research and Data Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-3">
                        Comprehensive research studies examining women's business development challenges, opportunities, and economic impact.
                      </p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Annual reports on women-owned business trends</li>
                        <li>• Industry-specific analysis and recommendations</li>
                        <li>• Economic impact studies and forecasting</li>
                        <li>• Access to capital research and surveys</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-teal-200">
                    <CardHeader>
                      <CardTitle className="text-teal-700">Policy Development and Advocacy</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-3">
                        Development of policy recommendations to improve federal programs and eliminate barriers for women entrepreneurs.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-semibold mb-2">Policy Focus Areas:</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Federal contracting programs</li>
                            <li>• Access to capital initiatives</li>
                            <li>• Tax policy recommendations</li>
                            <li>• Regulatory reform proposals</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-2">Advocacy Channels:</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Congressional testimony</li>
                            <li>• White House briefings</li>
                            <li>• Federal agency consultations</li>
                            <li>• Public comment submissions</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-green-200">
                    <CardHeader>
                      <CardTitle className="text-green-700">Program Evaluation and Monitoring</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-3">
                        Ongoing assessment of federal programs serving women entrepreneurs to ensure effectiveness and identify improvements.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-semibold mb-2">Programs Monitored:</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Women's Business Centers (WBC)</li>
                            <li>• WOSB federal contracting program</li>
                            <li>• SBA lending programs</li>
                            <li>• SCORE mentoring services</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-2">Evaluation Metrics:</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Program participation rates</li>
                            <li>• Business outcomes and success</li>
                            <li>• Geographic coverage analysis</li>
                            <li>• Cost-effectiveness assessments</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Key Reports and Publications */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Key NWBC Reports and Publications</h2>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-green-700">📊 Major Research Reports:</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span><strong>Annual Report:</strong> Comprehensive analysis of women's business trends</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span><strong>Access to Capital:</strong> Studies on women's financing challenges</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span><strong>Federal Contracting:</strong> Analysis of WOSB program effectiveness</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span><strong>Industry Studies:</strong> Sector-specific research and recommendations</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-lg mb-4 text-blue-700">🎯 Policy Recommendations:</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
                        <span><strong>Contracting Reform:</strong> Improvements to federal procurement processes</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
                        <span><strong>Capital Access:</strong> Enhanced lending and investment programs</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
                        <span><strong>Program Coordination:</strong> Better integration of federal services</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</span>
                        <span><strong>Data Collection:</strong> Improved tracking of women-owned businesses</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* How to Engage with NWBC */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Engage with NWBC</h2>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                    <div>
                      <p className="text-blue-800 font-medium">Public Participation:</p>
                      <p className="text-blue-700 text-sm">
                        While NWBC doesn't provide direct services to businesses, women entrepreneurs can engage
                        with the council through public meetings, comment periods, and research participation.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-bold text-lg text-purple-600 mb-2">Public Meetings</h4>
                    <p className="text-sm text-gray-600">Attend quarterly meetings to hear discussions and provide public comments</p>
                    <ul className="text-xs text-gray-600 mt-2 space-y-1">
                      <li>• Quarterly council meetings</li>
                      <li>• Public comment periods</li>
                      <li>• Virtual and in-person options</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-bold text-lg text-green-600 mb-2">Research Participation</h4>
                    <p className="text-sm text-gray-600">Participate in surveys and studies to shape policy recommendations</p>
                    <ul className="text-xs text-gray-600 mt-2 space-y-1">
                      <li>• Business surveys</li>
                      <li>• Focus groups</li>
                      <li>• Case study participation</li>
                    </ul>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-bold text-lg text-orange-600 mb-2">Stay Informed</h4>
                    <p className="text-sm text-gray-600">Follow NWBC publications and recommendations</p>
                    <ul className="text-xs text-gray-600 mt-2 space-y-1">
                      <li>• Annual reports</li>
                      <li>• Policy briefs</li>
                      <li>• Meeting minutes</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Policy Advocacy Roadmap */}
              <section className="py-16 bg-gray-50 border-y border-gray-200 -mx-4 sm:-mx-8 px-4 sm:px-8 mb-8">
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Your Voice Matters: The "Policy Roadmap"</h2>
                  <p className="text-lg text-gray-600 mb-10 text-center max-w-2xl mx-auto">
                    Many business owners think federal policy is untouchable. The NWBC was designed to prove that wrong. Here is how a single voice becomes a federal recommendation.
                  </p>

                  <div className="relative">
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-300 to-cyan-300 hidden md:block"></div>

                    <div className="space-y-12">
                      <div className="relative flex flex-col md:flex-row items-center md:items-start md:justify-between">
                        <div className="md:w-1/2 md:pr-8 md:text-right">
                          <h4 className="text-xl font-bold text-blue-900">Step 1: The Local Roundtable</h4>
                          <p className="text-gray-600 mt-2">You attend a local WBC or NWBC roundtable event. You mention a specific barrier (e.g., "The microloan cap is too low for my equipment needs").</p>
                        </div>
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-500 rounded-full border-4 border-white z-10 hidden md:block"></div>
                        <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
                          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">Input Phase</span>
                        </div>
                      </div>

                      <div className="relative flex flex-col md:flex-row items-center md:items-start md:justify-between">
                        <div className="md:w-1/2 md:pr-8 md:text-right order-2 md:order-1 mt-4 md:mt-0">
                          <span className="inline-block px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-xs font-bold">Processing Phase</span>
                        </div>
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-cyan-500 rounded-full border-4 border-white z-10 hidden md:block"></div>
                        <div className="md:w-1/2 md:pl-8 order-1 md:order-2">
                          <h4 className="text-xl font-bold text-cyan-900">Step 2: Council Aggregation</h4>
                          <p className="text-gray-600 mt-2">Council members review notes from roundtables nationwide. They see a pattern: "Women in 5 states are saying the microloan cap is too low."</p>
                        </div>
                      </div>

                      <div className="relative flex flex-col md:flex-row items-center md:items-start md:justify-between">
                        <div className="md:w-1/2 md:pr-8 md:text-right">
                          <h4 className="text-xl font-bold text-green-900">Step 3: The Annual Report</h4>
                          <p className="text-gray-600 mt-2">The NWBC publishes its Annual Report to the President and Congress. Recommendation #4 formally states: "Raise the microloan cap from $50k to $100k."</p>
                        </div>
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-green-500 rounded-full border-4 border-white z-10 hidden md:block"></div>
                        <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
                          <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold">Action Phase</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Case Study: EcoClean Services */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden mb-12">
                <div className="bg-gradient-to-r from-teal-600 to-green-600 p-6 text-white">
                  <h3 className="text-2xl font-bold">Case Study: Advocacy in Action</h3>
                  <p className="text-teal-100">How one voice changed policy for thousands.</p>
                </div>
                <div className="p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">The Entrepreneur</h4>
                      <p className="text-sm text-gray-600 mb-4">Maria, owner of "EcoClean Services," a commercial green cleaning company. She wanted to bid on federal contracts but found the "past performance" requirement impossible for a new firm.</p>
                      <h4 className="font-bold text-gray-900 mb-2">The Action</h4>
                      <p className="text-sm text-gray-600">Maria attended an NWBC "Public Meeting" via Zoom. She submitted a written comment explaining how the 2-year past performance rule was a catch-22 for startups.</p>
                    </div>
                    <div>
                      <div className="bg-green-50 p-4 rounded-lg border border-green-100 h-full">
                        <h4 className="font-bold text-green-800 mb-2">The Outcome</h4>
                        <p className="text-sm text-gray-700 mb-4">The NWBC included "Past Performance Barrier Reduction" in their next policy brief.</p>
                        <div className="flex items-center text-green-700 font-bold">
                          <CheckCircle className="w-5 h-5 mr-2" />
                          <span>Policy Adjusted</span>
                        </div>
                        <p className="text-xs text-green-600 mt-1">SBA eventually released new guidance allowing potential teaming partners' experience to count.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* NWBC Impact */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">NWBC Policy Impact and Achievements</h2>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-800">WOSB Program Enhancement</h4>
                      <p className="text-sm text-gray-600">Advocated for improvements to the Women-Owned Small Business federal contracting program</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-800">WBC Program Expansion</h4>
                      <p className="text-sm text-gray-600">Supported increased funding and expansion of Women's Business Centers nationwide</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Data Collection Improvements</h4>
                      <p className="text-sm text-gray-600">Advocated for better tracking and reporting of women-owned business statistics</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Access to Capital Initiatives</h4>
                      <p className="text-sm text-gray-600">Influenced policies to improve women entrepreneurs' access to loans and investment</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Common Questions About NWBC</h2>
                <div className="space-y-6">
                  {faqData.map((faq, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-100 shadow-sm">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-start">
                        <HelpCircle className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                        {faq.question}
                      </h3>
                      <p className="text-gray-700 ml-9">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lead-Generating CTA Section */}
              <div className="bg-gradient-to-r from-blue-600 to-cyan-700 rounded-lg p-8 text-white text-center">
                <h3 className="text-2xl font-bold mb-4">Navigate Federal Women's Business Programs Like a Pro</h3>
                <p className="text-blue-100 mb-6 text-lg">
                  Get expert guidance on leveraging federal programs, NWBC research, and policy developments to grow your
                  women-owned business. Book your FREE consultation today.
                </p>
                <div className="bg-white/10 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-white mb-2">Your FREE Federal Programs Consultation Includes:</h4>
                  <div className="grid md:grid-cols-2 gap-2 text-sm text-blue-100">
                    <div>✅ Federal program navigation strategy</div>
                    <div>✅ NWBC research application to your business</div>
                    <div>✅ Policy development impact analysis</div>
                    <div>✅ WBC and SBA program optimization</div>
                    <div>✅ Federal contracting readiness assessment</div>
                    <div>✅ Long-term growth planning</div>
                  </div>
                </div>
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                  <Link href="/contact?service=federal-programs-consultation">
                    Book FREE Federal Programs Consultation
                  </Link>
                </Button>
                <p className="text-blue-200 text-xs mt-3">
                  No obligations. Just expert insights into federal women's business programs.
                </p>
              </div>

            </div>
          </div>
        </section>
        {/* Related Guides Section */}
        <section className="py-16 bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Women's Business Resources</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-left">
                    <h4 className="font-bold text-lg mb-2 flex items-center">
                      <FileText className="w-5 h-5 text-blue-600 mr-2" />
                      Women Entrepreneur Strategy
                    </h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Learn about Canada's $7B+ investment in women entrepreneurs.
                    </p>
                    <Button variant="outline" className="w-full text-blue-600 border-blue-200 hover:bg-blue-50" asChild>
                      <Link href="/blog/women-entrepreneurship-strategy-canada">Read Guide</Link>
                    </Button>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-left">
                    <h4 className="font-bold text-lg mb-2 flex items-center">
                      <FileText className="w-5 h-5 text-blue-600 mr-2" />
                      Women's Business Centers
                    </h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Guide to SBA Women's Business Centers and available resources.
                    </p>
                    <Button variant="outline" className="w-full text-blue-600 border-blue-200 hover:bg-blue-50" asChild>
                      <Link href="/blog/women-business-centers-guide">Read Guide</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
