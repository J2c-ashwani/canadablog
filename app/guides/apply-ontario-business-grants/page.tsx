import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, FileText, DollarSign, Target, AlertCircle, Download, Building, Users, Shield, Award, TrendingUp, MapPin, MessageCircle, HelpCircle, ExternalLink, Lightbulb, ArrowRight, Zap, Globe, BarChart3 } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ontario Business Grants 2026: Complete Application Guide | Starter Company Plus, OCI, Ontario Creates",
  description: "Complete step-by-step guide to applying for Ontario business grants and provincial funding. Get Ontario application templates, provincial strategies, and proven frameworks for Starter Company Plus, Ontario Creates, and OCI programs.",
  keywords: "Ontario business grants application guide, Ontario provincial funding application process, Starter Company Plus application, Ontario Creates funding application, how to apply Ontario grants, OCI funding",
  alternates: {
    canonical: "https://www.fsidigital.ca/guides/apply-ontario-business-grants",
  },
  openGraph: {
    title: "Ontario Business Grants Application Guide 2026 | Provincial Funding Process",
    description: "Step-by-step guide with templates and strategies for successful Ontario provincial funding applications.",
    url: "https://www.fsidigital.ca/guides/apply-ontario-business-grants",
    images: ["/og-image.png"],
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the Starter Company Plus program in Ontario?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Starter Company Plus provides up to $5,000 in grant funding to new Ontario businesses less than 3 years old. It includes mandatory business training, mentorship, and requires full-time commitment to the business. The program is delivered through regional Small Business Enterprise Centres."
      }
    },
    {
      "@type": "Question",
      "name": "How long does the Ontario grant application process take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The timeline varies by program: Starter Company Plus takes 4-8 weeks including training; Ontario Creates typically 8-12 weeks; and OCI (Ontario Centre for Innovation) programs can take 10-16 weeks for larger technology projects."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need to be incorporated in Ontario to apply for provincial grants?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most Ontario programs require Ontario incorporation or registration with significant provincial operations. You must demonstrate economic impact and job creation within Ontario. Federal corporations with Ontario operations may also qualify."
      }
    },
    {
      "@type": "Question",
      "name": "What is Ontario Creates and who is eligible?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ontario Creates is the provincial agency supporting cultural and creative industries including film, TV, music, publishing, and interactive digital media. Eligible applicants include production companies, publishers, game studios, and music labels with Ontario operations."
      }
    },
    {
      "@type": "Question",
      "name": "Can I combine Ontario provincial grants with federal funding?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! Many Ontario businesses successfully stack provincial funding with federal programs like IRAP, SR&ED, and FedDev Ontario. This is encouraged and can significantly increase total funding available for your project."
      }
    },
    {
      "@type": "Question",
      "name": "What is the maximum funding available through Ontario programs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Funding varies widely: Starter Company Plus offers up to $5,000; Ontario Creates offers project funding from $5,000 to $500,000+; OCI technology programs can provide $50,000 to $5M+ for major innovation projects."
      }
    }
  ]
}

export default function OntarioBusinessGrantsGuide() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-red-600 to-red-800 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30">
                🍁 Provincial Business Funding Application Guide 2026
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
                How to Apply for Ontario Business Grants
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-red-100 leading-relaxed text-pretty">
                Step-by-step guide to successfully applying for Ontario provincial business grants and funding.
                Complete with program-specific templates, provincial compliance strategies, and proven application frameworks.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                  <Link href="#programs">
                    View Programs
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-red-700/30 border-white/30 text-white hover:bg-white/20" asChild>
                  <Link href="#timeline">
                    See Timeline
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
                <MessageCircle className="w-4 h-4 mr-2 text-red-600" />
                Common Questions:
              </span>
              <div className="flex gap-4 overflow-x-auto no-scrollbar whitespace-nowrap">
                <Link href="#starter-company" className="hover:text-red-600 transition-colors">Starter Company?</Link>
                <Link href="#ontario-creates" className="hover:text-red-600 transition-colors">Ontario Creates?</Link>
                <Link href="#timeline" className="hover:text-red-600 transition-colors">How Long?</Link>
                <Link href="#eligibility" className="hover:text-red-600 transition-colors">Who Qualifies?</Link>
                <Link href="#faq" className="hover:text-red-600 transition-colors">FAQs</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Reference Stats */}
        <section className="py-12 bg-white border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-red-600 mb-2">4-12 Weeks</div>
                  <div className="text-gray-600">Average Application Process</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">50+ Programs</div>
                  <div className="text-gray-600">Ontario Provincial Streams</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">$5K-$5M</div>
                  <div className="text-gray-600">Funding Range Available</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">16 Regions</div>
                  <div className="text-gray-600">Delivery Partner Network</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">

              {/* Understanding Ontario's Funding Ecosystem */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">How does the Ontario funding ecosystem work?</h2>

                <p className="text-gray-700 mb-6 leading-relaxed">
                  Ontario operates Canada's largest provincial business funding ecosystem, with over 50 distinct programs delivered
                  through a network of regional partners, sector agencies, and provincial ministries. Unlike Quebec's centralized model,
                  Ontario's system is distributed—which means more entry points but also more complexity to navigate.
                </p>

                <div className="bg-red-50 border border-red-100 rounded-lg p-6 mb-6">
                  <div className="flex items-start">
                    <Lightbulb className="w-8 h-8 text-red-600 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-red-900 mb-2">The Ontario Advantage: Regional Delivery</h4>
                      <p className="text-red-800 leading-relaxed">
                        Ontario's 47 Small Business Enterprise Centres (SBECs) act as local "front doors" to provincial funding.
                        Building a relationship with your local SBEC is often the fastest path to funding—they know which programs
                        fit your business and can guide you through the application process.
                      </p>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4">Key Funding Agencies in Ontario</h3>

                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-gray-900">Ontario Ministry of Economic Development</h4>
                      <Badge variant="secondary">Umbrella</Badge>
                    </div>
                    <p className="text-sm text-gray-600">Oversees Starter Company Plus, regional development initiatives, and sector-specific programs.</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-gray-900">Ontario Centre for Innovation (OCI)</h4>
                      <Badge variant="secondary">Tech/R&D</Badge>
                    </div>
                    <p className="text-sm text-gray-600">Focuses on technology commercialization, with programs for AI, cybersecurity, cleantech, and advanced manufacturing.</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-gray-900">Ontario Creates</h4>
                      <Badge variant="secondary">Creative</Badge>
                    </div>
                    <p className="text-sm text-gray-600">Supports film, TV, music, publishing, and interactive digital media with tax credits and development funding.</p>
                  </div>
                </div>
              </div>

              {/* Top Ontario Programs */}
              <div id="programs" className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">What are the top Ontario grant programs?</h2>

                <div className="space-y-6">
                  {/* Starter Company Plus */}
                  <div id="starter-company" className="border border-red-200 rounded-lg p-6 bg-red-50/30">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-xl text-red-700 flex items-center">
                        <Building className="w-5 h-5 mr-2" />
                        Starter Company Plus
                      </h3>
                      <Badge className="bg-red-100 text-red-800">Up to $5,000</Badge>
                    </div>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      Ontario's flagship program for new entrepreneurs. Provides grant funding (non-repayable) combined with
                      mandatory business training and mentorship. Ideal for early-stage businesses in their first 3 years.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Key Requirements:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li className="flex items-start"><ArrowRight className="w-3 h-3 mr-2 mt-1 text-red-500" /> Business less than 3 years old</li>
                          <li className="flex items-start"><ArrowRight className="w-3 h-3 mr-2 mt-1 text-red-500" /> 18 years or older, Ontario resident</li>
                          <li className="flex items-start"><ArrowRight className="w-3 h-3 mr-2 mt-1 text-red-500" /> Full-time commitment to business</li>
                          <li className="flex items-start"><ArrowRight className="w-3 h-3 mr-2 mt-1 text-red-500" /> Complete mandatory training program</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">What You Get:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li className="flex items-start"><CheckCircle className="w-3 h-3 mr-2 mt-1 text-green-500" /> Up to $5,000 grant funding</li>
                          <li className="flex items-start"><CheckCircle className="w-3 h-3 mr-2 mt-1 text-green-500" /> Business training and workshops</li>
                          <li className="flex items-start"><CheckCircle className="w-3 h-3 mr-2 mt-1 text-green-500" /> One-on-one business coaching</li>
                          <li className="flex items-start"><CheckCircle className="w-3 h-3 mr-2 mt-1 text-green-500" /> Peer networking opportunities</li>
                        </ul>
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded border border-red-100 text-sm">
                      <strong className="text-red-800">Pro Tip:</strong> Apply early in the fiscal year (April-June). Funding is
                      allocated regionally, and some SBECs exhaust their budgets by Q3.
                    </div>
                  </div>

                  {/* Ontario Creates */}
                  <div id="ontario-creates" className="border border-blue-200 rounded-lg p-6 bg-blue-50/30">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-xl text-blue-700 flex items-center">
                        <Award className="w-5 h-5 mr-2" />
                        Ontario Creates
                      </h3>
                      <Badge className="bg-blue-100 text-blue-800">$5K-$500K+</Badge>
                    </div>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      Provincial support agency for Ontario's creative industries. Offers tax credits, production funding,
                      market development support, and export assistance for film, TV, music, publishing, and interactive digital media.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Program Streams:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Film & TV Production Funding</li>
                          <li>• Interactive Digital Media Fund</li>
                          <li>• Music Industry Development</li>
                          <li>• Book Publishing Support</li>
                          <li>• Export Market Development</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Eligible Applicants:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Production companies</li>
                          <li>• Game development studios</li>
                          <li>• Music labels and publishers</li>
                          <li>• Book and magazine publishers</li>
                          <li>• Digital content creators</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* OCI Programs */}
                  <div className="border border-purple-200 rounded-lg p-6 bg-purple-50/30">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-xl text-purple-700 flex items-center">
                        <Zap className="w-5 h-5 mr-2" />
                        Ontario Centre for Innovation (OCI)
                      </h3>
                      <Badge className="bg-purple-100 text-purple-800">$50K-$5M</Badge>
                    </div>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      Ontario's technology commercialization hub. Connects companies with funding for R&D projects,
                      industry partnerships, and market access. Focuses on sectors including AI, automotive, cybersecurity,
                      cleantech, and advanced manufacturing.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Focus Areas:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Artificial Intelligence & Machine Learning</li>
                          <li>• Autonomous Vehicles & Smart Mobility</li>
                          <li>• Cybersecurity & Privacy Tech</li>
                          <li>• Clean Technology & Energy</li>
                          <li>• Advanced Manufacturing (Industry 4.0)</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Program Types:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Market Readiness Funding</li>
                          <li>• Collaborative R&D Projects</li>
                          <li>• Industry-Academic Partnerships</li>
                          <li>• Scale-up & Commercialization</li>
                          <li>• Talent Development Initiatives</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Regional Programs */}
                  <div className="border border-green-200 rounded-lg p-6 bg-green-50/30">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-xl text-green-700 flex items-center">
                        <MapPin className="w-5 h-5 mr-2" />
                        Regional Development Programs
                      </h3>
                      <Badge className="bg-green-100 text-green-800">Varies by Region</Badge>
                    </div>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      Ontario offers targeted funding for specific regions, especially Northern Ontario (through NOHFC) and
                      Eastern/Southwestern Ontario development funds. These often provide higher funding amounts and more
                      flexible terms than provincial-wide programs.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-white p-3 rounded">
                        <h5 className="font-semibold text-gray-900 mb-1 text-sm">NOHFC (Northern)</h5>
                        <p className="text-xs text-gray-600">Up to 50% project costs for Northern Ontario businesses</p>
                      </div>
                      <div className="bg-white p-3 rounded">
                        <h5 className="font-semibold text-gray-900 mb-1 text-sm">EODF (Eastern)</h5>
                        <p className="text-xs text-gray-600">Manufacturing and rural development focus</p>
                      </div>
                      <div className="bg-white p-3 rounded">
                        <h5 className="font-semibold text-gray-900 mb-1 text-sm">SWODF (Southwestern)</h5>
                        <p className="text-xs text-gray-600">Industrial competitiveness and job creation</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Application Timeline */}
              <div id="timeline" className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">How long does the Ontario application process take?</h2>

                <p className="text-gray-700 mb-6 leading-relaxed">
                  Timeline varies significantly by program type and complexity. Starter Company Plus is the fastest path to funding,
                  while larger OCI technology projects require more extensive due diligence.
                </p>

                <div className="relative border-l-2 border-red-100 pl-8 ml-4 space-y-8">
                  <div className="relative">
                    <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-red-600 border-4 border-white shadow-sm flex items-center justify-center text-white text-xs font-bold">1</div>
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Program Selection & Eligibility Check</h4>
                    <p className="text-gray-600 mb-2">Week 1-2</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Contact your local SBEC or sector agency</li>
                      <li>• Complete eligibility pre-screening</li>
                      <li>• Identify the best-fit program stream</li>
                      <li>• Gather initial documentation requirements</li>
                    </ul>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-red-600 border-4 border-white shadow-sm flex items-center justify-center text-white text-xs font-bold">2</div>
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Training & Development (Starter Company)</h4>
                    <p className="text-gray-600 mb-2">Week 2-5 (if applicable)</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Complete mandatory business training modules</li>
                      <li>• Work with assigned business coach</li>
                      <li>• Develop or refine business plan</li>
                      <li>• Participate in peer learning sessions</li>
                    </ul>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-red-600 border-4 border-white shadow-sm flex items-center justify-center text-white text-xs font-bold">3</div>
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Application Preparation & Submission</h4>
                    <p className="text-gray-600 mb-2">Week 3-8 (varies)</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Complete all application forms</li>
                      <li>• Submit business plan and financial projections</li>
                      <li>• Provide supporting documentation</li>
                      <li>• Address any clarification requests</li>
                    </ul>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-green-600 border-4 border-white shadow-sm flex items-center justify-center text-white text-xs font-bold">4</div>
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Review & Funding Decision</h4>
                    <p className="text-gray-600 mb-2">Week 6-12</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Program staff review and assessment</li>
                      <li>• Panel or committee approval (larger programs)</li>
                      <li>• Funding agreement negotiation</li>
                      <li>• Funds disbursement upon milestones</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="py-3 px-4 text-left font-semibold text-gray-900">Program</th>
                        <th className="py-3 px-4 text-left font-semibold text-gray-900">Typical Timeline</th>
                        <th className="py-3 px-4 text-left font-semibold text-gray-900">Key Factor</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="py-3 px-4 text-gray-700">Starter Company Plus</td>
                        <td className="py-3 px-4 text-gray-600">4-8 weeks</td>
                        <td className="py-3 px-4 text-gray-500">Training completion speed</td>
                      </tr>
                      <tr className="bg-gray-50/50">
                        <td className="py-3 px-4 text-gray-700">Ontario Creates</td>
                        <td className="py-3 px-4 text-gray-600">8-12 weeks</td>
                        <td className="py-3 px-4 text-gray-500">Application deadline cycles</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-gray-700">OCI Technology Programs</td>
                        <td className="py-3 px-4 text-gray-600">10-16 weeks</td>
                        <td className="py-3 px-4 text-gray-500">Technical due diligence depth</td>
                      </tr>
                      <tr className="bg-gray-50/50">
                        <td className="py-3 px-4 text-gray-700">Regional (NOHFC/EODF)</td>
                        <td className="py-3 px-4 text-gray-600">8-14 weeks</td>
                        <td className="py-3 px-4 text-gray-500">Project complexity & size</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Eligibility Section */}
              <div id="eligibility" className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Who is eligible for Ontario business grants?</h2>

                <p className="text-gray-700 mb-6 leading-relaxed">
                  Eligibility varies by program, but most Ontario grants share common baseline requirements. Understanding these
                  helps you quickly identify which programs match your business situation.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h4 className="font-bold text-green-800 mb-4 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Generally Eligible
                    </h4>
                    <ul className="text-green-700 space-y-2 text-sm">
                      <li>✓ Ontario-incorporated or federally incorporated with Ontario operations</li>
                      <li>✓ For-profit businesses (most programs)</li>
                      <li>✓ Businesses with job creation potential</li>
                      <li>✓ Good standing with provincial taxes</li>
                      <li>✓ Canadian citizens or permanent residents (for entrepreneur programs)</li>
                      <li>✓ Businesses with identified growth opportunity</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h4 className="font-bold text-red-800 mb-4 flex items-center">
                      <AlertCircle className="w-5 h-5 mr-2" />
                      Generally Ineligible
                    </h4>
                    <ul className="text-red-700 space-y-2 text-sm">
                      <li>✗ Businesses with no Ontario presence</li>
                      <li>✗ Franchises (some programs)</li>
                      <li>✗ Retail sales only businesses (Starter Company)</li>
                      <li>✗ Real estate or passive investment</li>
                      <li>✗ Businesses in arrears with government</li>
                      <li>✗ MLM or network marketing</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-yellow-800 text-sm">
                    <strong>Important:</strong> Don't self-disqualify too early. If you're uncertain about eligibility, contact
                    your local SBEC or the program office directly. Many businesses are surprised to learn they qualify for
                    programs they initially thought were out of reach.
                  </p>
                </div>
              </div>

              {/* Common Mistakes */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">What are common Ontario application mistakes?</h2>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-red-700 flex items-center">
                      <AlertCircle className="w-5 h-5 mr-2" />
                      Application Killers
                    </h4>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</div>
                        <div>
                          <strong>Weak Economic Impact Case</strong>
                          <p className="text-sm text-gray-600">Not clearly demonstrating job creation and Ontario economic benefit</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</div>
                        <div>
                          <strong>Generic Business Plan</strong>
                          <p className="text-sm text-gray-600">Using a template without tailoring to Ontario program requirements</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</div>
                        <div>
                          <strong>Incomplete Training (Starter Company)</strong>
                          <p className="text-sm text-gray-600">Not fully engaging with mandatory coaching and training requirements</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-orange-700 flex items-center">
                      <AlertCircle className="w-5 h-5 mr-2" />
                      Process Errors
                    </h4>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</div>
                        <div>
                          <strong>Wrong Program Selection</strong>
                          <p className="text-sm text-gray-600">Applying to mismatched programs rather than finding the right fit</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</div>
                        <div>
                          <strong>Missing Deadlines</strong>
                          <p className="text-sm text-gray-600">Ontario Creates and OCI have strict intake windows</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</div>
                        <div>
                          <strong>Skipping SBEC Relationship</strong>
                          <p className="text-sm text-gray-600">Not leveraging local support that can strengthen applications</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* FAQ Block */}
              <div id="faq" className="bg-gray-50 rounded-xl p-8 mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <HelpCircle className="w-6 h-6 text-red-600 mr-2" />
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-2">1. Is Starter Company Plus available everywhere in Ontario?</h3>
                    <p className="text-gray-600 text-sm">Yes, the program is delivered through 47 Small Business Enterprise Centres across Ontario. Find your nearest <Link href="https://www.ontario.ca/page/small-business-enterprise-centre-locations" className="text-red-600 hover:underline" target="_blank" rel="noopener noreferrer">SBEC location</Link> through the Ontario.ca business portal.</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-2">2. Can I apply to multiple Ontario programs simultaneously?</h3>
                    <p className="text-gray-600 text-sm">Generally yes, but you cannot "double-dip" on the same expenses. Different programs can fund different project components. Always disclose all funding sources in your applications.</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-2">3. Are Ontario grants taxable income?</h3>
                    <p className="text-gray-600 text-sm">Yes, business grants are generally considered taxable income. Consult with an accountant or review <Link href="https://www.canada.ca/en/revenue-agency.html" className="text-red-600 hover:underline" target="_blank" rel="noopener noreferrer">CRA guidelines</Link> to understand the tax implications.</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-2">4. What if my business operates in multiple provinces?</h3>
                    <p className="text-gray-600 text-sm">You can still apply if you have significant Ontario operations. Focus your application on the Ontario-specific aspects of your project and job creation within the province.</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-2">5. How do Ontario provincial programs work with federal funding?</h3>
                    <p className="text-gray-600 text-sm">They stack well! Many Ontario businesses combine provincial grants with federal programs like <Link href="/guides/apply-irap-government-grants" className="text-red-600 hover:underline">IRAP</Link>, SR&ED, and FedDev Ontario. This is encouraged and can maximize your total funding.</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-2">6. Is there funding for hiring?</h3>
                    <p className="text-gray-600 text-sm">Yes. In addition to Starter Company Plus, Ontario offers hiring grants through <Link href="https://www.ontario.ca/page/employment-ontario" className="text-red-600 hover:underline" target="_blank" rel="noopener noreferrer">Employment Ontario</Link> for training and hiring young workers or those with disabilities.</p>
                  </div>
                </div>
              </div>

              {/* Neural Network: Related Guides */}
              <div className="border-t border-gray-200 pt-12 mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Explore Related Funding Opportunities</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <Link href="/guides/apply-quebec-business-grants" className="group block">
                    <div className="bg-white border hover:border-blue-300 rounded-lg p-4 transition-all hover:shadow-md h-full">
                      <div className="text-sm text-blue-600 font-semibold mb-2">Provincial Peer</div>
                      <h4 className="font-bold text-gray-900 group-hover:text-blue-700 mb-2">Quebec Business Grants</h4>
                      <p className="text-sm text-gray-500">Compare Ontario with Quebec's centralized IQ model.</p>
                    </div>
                  </Link>
                  <Link href="/guides/irap-innovation-application-guide" className="group block">
                    <div className="bg-white border hover:border-purple-300 rounded-lg p-4 transition-all hover:shadow-md h-full">
                      <div className="text-sm text-purple-600 font-semibold mb-2">Federal Stacking</div>
                      <h4 className="font-bold text-gray-900 group-hover:text-purple-700 mb-2">IRAP Grant Guide</h4>
                      <p className="text-sm text-gray-500">Stack Ontario funding with federal IRAP for R&D projects.</p>
                    </div>
                  </Link>
                  <Link href="/guides/sred-application-guide" className="group block">
                    <div className="bg-white border hover:border-green-300 rounded-lg p-4 transition-all hover:shadow-md h-full">
                      <div className="text-sm text-green-600 font-semibold mb-2">Tax Credits</div>
                      <h4 className="font-bold text-gray-900 group-hover:text-green-700 mb-2">SR&ED Guide</h4>
                      <p className="text-sm text-gray-500">Recover R&D costs with federal and Ontario R&D tax credits.</p>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Official Resources */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Official Ontario Resources</h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-red-200 shadow-none">
                    <CardHeader>
                      <CardTitle className="text-red-800 text-lg flex items-center">
                        <Building className="w-5 h-5 mr-2" />
                        Ontario.ca Business Portal
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-600">Central hub for all Ontario business programs, SBEC locations, and funding opportunities.</p>
                      <Button size="sm" variant="outline" className="w-full justify-between" asChild>
                        <Link href="https://www.ontario.ca/page/starting-business" target="_blank" rel="noopener noreferrer">
                          Visit Portal <ExternalLink className="w-3 h-3 ml-2" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-200 shadow-none">
                    <CardHeader>
                      <CardTitle className="text-blue-800 text-lg flex items-center">
                        <Award className="w-5 h-5 mr-2" />
                        Ontario Creates
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-600">Creative industries funding for film, TV, music, publishing, and interactive digital media.</p>
                      <Button size="sm" className="w-full justify-between bg-blue-600 hover:bg-blue-700 text-white" asChild>
                        <Link href="https://www.ontariocreates.ca/" target="_blank" rel="noopener noreferrer">
                          Visit Ontario Creates <ExternalLink className="w-3 h-3 ml-2" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* CTA Section */}
              <div className="bg-gradient-to-r from-red-700 to-red-800 rounded-xl p-8 text-white text-center">
                <h3 className="text-2xl font-bold mb-4">Need Help with Your Ontario Application?</h3>
                <p className="text-red-100 mb-6 max-w-xl mx-auto">
                  Our Ontario funding specialists have helped secure over $12M in provincial funding.
                  Get expert guidance through Starter Company Plus, OCI, and Ontario Creates applications.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-white text-red-800 hover:bg-red-50 font-semibold" asChild>
                    <Link href="/contact?service=ontario-business-expert-help">
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
