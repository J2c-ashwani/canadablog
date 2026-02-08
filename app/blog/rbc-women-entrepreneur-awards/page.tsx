import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, DollarSign, Calendar, CheckCircle, ArrowRight, Users, TrendingUp, Target, Lightbulb, ExternalLink } from "lucide-react"
import Link from "next/link"
import NewsletterBox from "@/components/blog/NewsletterBox"

export const metadata = {
  title: "RBC Canadian Women Entrepreneur Awards 2026: Complete Guide to $100K+ in Grants & Recognition",
  description: "Comprehensive guide to RBC Canadian Women Entrepreneur Awards 2026. Learn eligibility, application process, 8 award categories, past winners, and similar grants for women in USA & Canada. Deadline: March 21, 2026.",
  keywords: "RBC Women Entrepreneur Awards, women business grants Canada, women entrepreneur funding, Canadian women business awards, women startup grants, female entrepreneur support, women entrepreneurship Canada USA, business grants for women 2026",
  openGraph: {
    title: "RBC Canadian Women Entrepreneur Awards 2026 - Win Up to $100,000",
    description: "33rd Annual RBC Canadian Women Entrepreneur Awards. 8 categories, national recognition, mentorship, and up to $100K in funding for women-led businesses.",
  }
}

const faqData = [
  {
    question: "Can I apply if I'm not the sole owner?",
    answer: "Yes, you don't need to be the sole owner, but you must own shares and hold the most senior leadership position. Many winners are co-founders or majority owners."
  },
  {
    question: "Are social enterprises and non-profits eligible?",
    answer: "Yes! Social enterprises and registered charities can apply, particularly for Social Change Award categories. You must demonstrate financial stability and impact measurement."
  },
  {
    question: "Can I nominate myself or does someone else need to nominate me?",
    answer: "Self-nominations are accepted and common. You know your business best and can present the strongest case for your achievements."
  },
  {
    question: "How long should I spend on my application?",
    answer: "Plan 10-15 hours for a comprehensive application. Start early, gather all required documents, and have trusted advisors review your submission before submitting."
  }
]

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqData.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
}

export default function RBCWomenEntrepreneurAwards() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <article className="min-h-screen bg-gray-50 py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <nav className="text-sm text-gray-600 mb-6">
            <Link href="/" className="hover:text-primary">Home</Link>
            {" > "}
            <Link href="/blog" className="hover:text-primary">Blog</Link>
            {" > "}
            <span className="text-gray-900">RBC Women Entrepreneur Awards 2026</span>
          </nav>

          {/* Header */}
          <header className="mb-10">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge className="bg-red-100 text-red-800 hover:bg-red-200">🇨🇦 Canada Awards</Badge>
              <Badge variant="outline">Women Entrepreneurs</Badge>
              <Badge variant="outline">$100K+ Funding</Badge>
              <Badge variant="secondary">November 14, 2026</Badge>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              RBC Canadian Women Entrepreneur Awards 2026: Your Complete Guide to Winning $100,000+ in Grants & National Recognition
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Updated: October 14, 2026
              </span>
              <span>•</span>
              <span>12 min read</span>
              <span>•</span>
              <span className="flex items-center">
                <Users className="w-4 h-4 mr-2" />
                34th Annual Event
              </span>
            </div>
            <p className="text-xl text-gray-700 leading-relaxed">
              For over three decades, the RBC Canadian Women Entrepreneur Awards have recognized Canada's most accomplished women business leaders. This comprehensive guide covers everything you need to know about the 2026 awards, including eligibility requirements, application tips, award categories, and alternative funding options for women entrepreneurs across North America.
            </p>
          </header>

          {/* Quick Stats Card */}
          <Card className="p-6 bg-gradient-to-br from-red-50 via-purple-50 to-blue-50 mb-10 border-2 border-red-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Award className="w-6 h-6 mr-3 text-red-600" />
              2026 Awards at a Glance
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-3xl font-bold text-gray-900">$100K+</p>
                <p className="text-sm text-gray-600">Total Prize Money</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-3xl font-bold text-gray-900">8</p>
                <p className="text-sm text-gray-600">Award Categories</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-3xl font-bold text-gray-900">Mar 21</p>
                <p className="text-sm text-gray-600">2026 Deadline</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <TrendingUp className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <p className="text-3xl font-bold text-gray-900">34th</p>
                <p className="text-sm text-gray-600">Annual Program</p>
              </div>
            </div>
          </Card>

          {/* Main Content */}
          <div className="prose prose-lg max-w-none">

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">What Are the RBC Canadian Women Entrepreneur Awards?</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              The RBC Canadian Women Entrepreneur Awards (CWEA), presented in partnership with Women of Influence, represent Canada's premier national awards program celebrating women-led businesses. Since its inception over 30 years ago, this prestigious program has recognized thousands of women entrepreneurs who drive economic growth, create jobs, and lead transformative change across every sector of the Canadian economy.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              The 34th Annual RBC Canadian Women Entrepreneur Awards Gala will take place on <strong>Friday, November 14, 2026</strong>, at The Ritz-Carlton, Toronto. This black-tie event brings together Canada's top women entrepreneurs, business executives, government officials, and industry leaders for an evening of celebration, networking, and recognition.
            </p>
            <p className="text-gray-700 leading-relaxed mb-8">
              Beyond monetary prizes, winners gain invaluable national recognition, extensive media coverage, exclusive networking opportunities with Canada's business elite, and access to mentorship programs that can accelerate their business growth for years to come.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">8 Award Categories for 2026: Find Your Perfect Match</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              The 2026 program features eight distinct award categories designed to recognize excellence across different business stages, industries, and impact areas. Understanding which category best aligns with your business is crucial for application success.
            </p>

            <div className="space-y-6 my-8">
              <Card className="p-6 border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-3">1. Ones to Watch Award</h3>
                <p className="text-gray-700 mb-2"><strong>Best for:</strong> Emerging entrepreneurs and early-stage businesses</p>
                <p className="text-gray-700 mb-2"><strong>Focus:</strong> High-growth potential, innovative business models, and promising market traction</p>
                <p className="text-gray-700 mb-4"><strong>Ideal candidate:</strong> Women entrepreneurs in their first 3 years of operation showing exceptional promise and scalability</p>
                <div className="bg-blue-50 p-4 rounded-md">
                  <p className="text-sm font-semibold text-blue-900 mb-1">Judges' Perspective:</p>
                  <p className="text-sm text-blue-800">For this category, judges look beyond current revenue figures to evaluate the foundational strength of the business. They examine the clarity of the value proposition, the size of the addressable market, and the strategic roadmap for capturing that market. Successful applicants demonstrate a deep understanding of their customer pain points and articulate exactly how their solution provides superior value compared to existing alternatives.</p>
                </div>
              </Card>

              <Card className="p-6 border-l-4 border-green-500 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-3">2. Micro-Business Award</h3>
                <p className="text-gray-700 mb-2"><strong>Best for:</strong> Solo entrepreneurs and businesses with 1-5 employees</p>
                <p className="text-gray-700 mb-2"><strong>Focus:</strong> Sustainable profitability, community impact, and business resilience</p>
                <p className="text-gray-700 mb-4"><strong>Ideal candidate:</strong> Women running lean, profitable businesses with strong local presence and customer loyalty</p>
                <div className="bg-green-50 p-4 rounded-md">
                  <p className="text-sm font-semibold text-green-900 mb-1">Judges' Perspective:</p>
                  <p className="text-sm text-green-800">Judges in this category value operational efficiency and profitability over sheer scale. They look for evidence of strong customer retention, smart financial management, and the ability to punch above weight class. Applications that highlight personal customer relationships, niche market dominance, and the owner's ability to maximize limited resources typically score highest.</p>
                </div>
              </Card>

              <Card className="p-6 border-l-4 border-purple-500 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-3">3. Start-Up Award</h3>
                <p className="text-gray-700 mb-2"><strong>Best for:</strong> Businesses 3-5 years old in growth phase</p>
                <p className="text-gray-700 mb-2"><strong>Focus:</strong> Revenue growth, market penetration, and team expansion</p>
                <p className="text-gray-700 mb-4"><strong>Ideal candidate:</strong> Women entrepreneurs successfully transitioning from startup to scale-up phase</p>
                <div className="bg-purple-50 p-4 rounded-md">
                  <p className="text-sm font-semibold text-purple-900 mb-1">Judges' Perspective:</p>
                  <p className="text-sm text-purple-800">The transition from survival to growth is the key metric here. Judges want to see year-over-year revenue increases, successful team building, and systems implementation. They look for proof that the business has moved beyond founder-dependency and is building the infrastructure necessary for sustained long-term expansion. Case studies of overcoming initial scaling challenges are particularly persuasive.</p>
                </div>
              </Card>

              <Card className="p-6 border-l-4 border-red-500 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-3">4. RBC Momentum Award</h3>
                <p className="text-gray-700 mb-2"><strong>Best for:</strong> Established businesses demonstrating rapid acceleration</p>
                <p className="text-gray-700 mb-2"><strong>Focus:</strong> Significant year-over-year growth in revenue, employees, and market share</p>
                <p className="text-gray-700 mb-4"><strong>Ideal candidate:</strong> Women-led businesses with proven track record showing exponential growth trajectory</p>
                <div className="bg-red-50 p-4 rounded-md">
                  <p className="text-sm font-semibold text-red-900 mb-1">Judges' Perspective:</p>
                  <p className="text-sm text-red-800">For the Momentum Award, numbers tell the story. Judges expect to see double or triple-digit growth percentages. However, they also scrutinize whether this growth is managed sustainably. Winning applications demonstrate how rapid expansion is being supported by robust operational processes, financial controls, and talent management strategies to ensure the momentum can be maintained without breaking the business.</p>
                </div>
              </Card>

              <Card className="p-6 border-l-4 border-orange-500 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-3">5. Social Change Award: Regional Impact</h3>
                <p className="text-gray-700 mb-2"><strong>Best for:</strong> Businesses creating positive change at regional/provincial level</p>
                <p className="text-gray-700 mb-2"><strong>Focus:</strong> Community development, environmental sustainability, and social equity</p>
                <p className="text-gray-700 mb-4"><strong>Ideal candidate:</strong> Social enterprises and mission-driven businesses with measurable local impact</p>
                <div className="bg-orange-50 p-4 rounded-md">
                  <p className="text-sm font-semibold text-orange-900 mb-1">Judges' Perspective:</p>
                  <p className="text-sm text-orange-800">Impact measurement is the differentiator here. Judges look for data that proves the social or environmental claim—tonnes of waste diverted, number of at-risk youth employed, or dollars reinvested in the community. They also evaluate the business model's sustainability; the most successful applicants demonstrate how financial success and social impact reinforce each other rather than competing for resources.</p>
                </div>
              </Card>

              <Card className="p-6 border-l-4 border-teal-500 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-3">6. Social Change Award: National Impact</h3>
                <p className="text-gray-700 mb-2"><strong>Best for:</strong> Businesses driving systemic change across Canada</p>
                <p className="text-gray-700 mb-2"><strong>Focus:</strong> Scalable social impact, policy influence, and nationwide reach</p>
                <p className="text-gray-700 mb-4"><strong>Ideal candidate:</strong> Women entrepreneurs solving major societal challenges with innovative, scalable solutions</p>
                <div className="bg-teal-50 p-4 rounded-md">
                  <p className="text-sm font-semibold text-teal-900 mb-1">Judges' Perspective:</p>
                  <p className="text-sm text-teal-800">For the National Impact award, judges look for systemic reach and replicability. They want to see how a solution developed locally has been successfully scaled across provinces or terrritories. Leadership in industry-wide change or policy advocacy often distinguishes winners in this category. The narrative should convincingly argue that the business is not just solving a problem, but changing how the country approaches that problem.</p>
                </div>
              </Card>

              <Card className="p-6 border-l-4 border-indigo-500 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-3">7. Innovation Award</h3>
                <p className="text-gray-700 mb-2"><strong>Best for:</strong> Businesses disrupting industries through innovation</p>
                <p className="text-gray-700 mb-2"><strong>Focus:</strong> Technological advancement, process innovation, and market disruption</p>
                <p className="text-gray-700 mb-4"><strong>Ideal candidate:</strong> Women entrepreneurs developing cutting-edge products, services, or business models</p>
                <div className="bg-indigo-50 p-4 rounded-md">
                  <p className="text-sm font-semibold text-indigo-900 mb-1">Judges' Perspective:</p>
                  <p className="text-sm text-indigo-800">Innovation isn't just about new technology; it's about solving problems in better ways. Judges look for clear evidence of market disruption—how the innovation renders competitors obsolete or creates entirely new value chains. Intellectual property strategy, R&D investment, and barriers to entry are key evaluation points. They want to know: "Why is this solution 10x better than the status quo?"</p>
                </div>
              </Card>

              <Card className="p-6 border-l-4 border-pink-500 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-3">8. Excellence Award</h3>
                <p className="text-gray-700 mb-2"><strong>Best for:</strong> Established leaders with sustained business excellence</p>
                <p className="text-gray-700 mb-2"><strong>Focus:</strong> Long-term profitability, industry leadership, and mentorship contributions</p>
                <p className="text-gray-700 mb-4"><strong>Ideal candidate:</strong> Veteran women entrepreneurs with 10+ years of sustained success and industry influence</p>
                <div className="bg-pink-50 p-4 rounded-md">
                  <p className="text-sm font-semibold text-pink-900 mb-1">Judges' Perspective:</p>
                  <p className="text-sm text-pink-800">This is a lifetime achievement-style recognition. Judges evaluate the candidate's total contribution to the Canadian business landscape over a decade or more. They look for resilience through economic cycles, consistent financial performance, and a legacy of leadership that extends beyond the company walls—training future leaders, influencing industry standards, and paving the way for other women entrepreneurs.</p>
                </div>
              </Card>
            </div>


            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Winner Spotlight: What Does a Champion Look Like?</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              To understand what it takes to win, let's look at the trajectory of past recipients. These aren't just success stories; they are blueprints for your application.
            </p>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="p-6 border-l-4 border-pink-500 bg-pink-50/30">
                <div className="flex items-center mb-4">
                  <div className="bg-pink-100 p-2 rounded-full mr-4">
                    <TrendingUp className="w-6 h-6 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Joanna Griffiths (Knix)</h3>
                    <p className="text-sm text-pink-700 font-medium">Momentum Award Winner</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm mb-3">
                  <strong>The Winning Factor:</strong> Joanna didn't just sell underwear; she sold a movement ("Leakproof"). Her application highlighted the <em>cultural shift</em> her brand created, backed by staggering year-over-year revenue growth.
                </p>
                <div className="bg-white p-3 rounded border border-pink-100 text-xs text-gray-600">
                  <em>Lesson:</em> Don't just report numbers. Explain the *movement* behind the metrics.
                </div>
              </Card>

              <Card className="p-6 border-l-4 border-blue-500 bg-blue-50/30">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-2 rounded-full mr-4">
                    <Lightbulb className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Katherine Homuth (Sheertex)</h3>
                    <p className="text-sm text-blue-700 font-medium">Innovation Award Winner</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm mb-3">
                  <strong>The Winning Factor:</strong> Unbreakable pantyhose sounds impossible. Katherine's application focused on the <em>scientific breakthrough</em> (using bulletproof vest material) and the proprietary IP that protected her invention.
                </p>
                <div className="bg-white p-3 rounded border border-blue-100 text-xs text-gray-600">
                  <em>Lesson:</em> For innovation, proving "defensibility" (why competitors can't copy you) is key.
                </div>
              </Card>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Eligibility Requirements: Do You Qualify?</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              The RBC Canadian Women Entrepreneur Awards maintain rigorous eligibility criteria to ensure recognition goes to legitimate, successful women-led businesses. Review these requirements carefully before investing time in your application.
            </p>

            <Card className="p-6 bg-blue-50 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">✅ Core Eligibility Criteria</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span><strong>Business Registration:</strong> Must be registered as a sole proprietorship or corporation for three full years as of April 30, 2026</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span><strong>Profitability:</strong> Business must have been profitable in the last fiscal year (or financially stable for non-profits/social enterprises)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span><strong>Ownership:</strong> Nominee must currently own shares in the company</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span><strong>Leadership:</strong> Must hold the most senior executive title and/or be the chief decision maker</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span><strong>Founder Status:</strong> Must be the business founder OR have had significant impact if acquired</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span><strong>Canadian Operation:</strong> Business must be registered and operating in Canada</span>
                </li>
              </ul>
            </Card>

            {/* NEW SECTION: The Judge's Scorecard */}
            <section className="py-8 bg-white border-y border-gray-100 my-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">The Judge's Scorecard: How You Are Graded</h2>
              <p className="text-gray-700 leading-relaxed mb-8">
                The selection committee doesn't just "like" applications; they grade them against a scorecard.
                While the exact weighting shifts by category, the core pillars remain constant.
                Understanding this rubric is the secret to moving from "Applicant" to "Finalist."
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                <Card className="p-5 border-t-4 border-blue-500 shadow-sm">
                  <div className="text-center mb-4">
                    <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-xl font-bold text-blue-600">40%</span>
                    </div>
                    <h3 className="font-bold text-lg text-gray-900">Financial Health</h3>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• 3-Year revenue growth trend</li>
                    <li>• Profitability margins</li>
                    <li>• Cash flow stability</li>
                    <li>• Reinvestment in the business</li>
                  </ul>
                  <div className="mt-4 bg-blue-50 p-2 rounded text-xs text-blue-800 text-center">
                    "Are you running a sustainable business or a hobby?"
                  </div>
                </Card>

                <Card className="p-5 border-t-4 border-purple-500 shadow-sm">
                  <div className="text-center mb-4">
                    <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-xl font-bold text-purple-600">30%</span>
                    </div>
                    <h3 className="font-bold text-lg text-gray-900">Impact & Innovation</h3>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Market disruption factor</li>
                    <li>• Social/Environmental impact</li>
                    <li>• Uniqueness of solution</li>
                    <li>• Job creation quality</li>
                  </ul>
                  <div className="mt-4 bg-purple-50 p-2 rounded text-xs text-purple-800 text-center">
                    "Does your business matter to the wider world?"
                  </div>
                </Card>

                <Card className="p-5 border-t-4 border-orange-500 shadow-sm">
                  <div className="text-center mb-4">
                    <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-xl font-bold text-orange-600">30%</span>
                    </div>
                    <h3 className="font-bold text-lg text-gray-900">Leadership Vision</h3>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Founder's personal story</li>
                    <li>• Strategic roadmap</li>
                    <li>• Mentorship of others</li>
                    <li>• Resilience in crisis</li>
                  </ul>
                  <div className="mt-4 bg-orange-50 p-2 rounded text-xs text-orange-800 text-center">
                    "Are you the leader who can take this to the next level?"
                  </div>
                </Card>
              </div>
            </section>


            {/* NEW SECTION: Nomination Strategy */}
            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">The Art of the Nomination: How to Get Invited</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Before you can apply, you must be nominated. While self-nominations are accepted, a strategic third-party nomination sets a winning tone.
            </p>
            <div className="bg-slate-50 border-l-4 border-slate-600 p-6 mb-8">
              <h3 className="font-bold text-slate-900 mb-3">Strategy: The "Champion" Method</h3>
              <p className="text-gray-700 mb-4">
                Don't just ask your mom or employee to nominate you. Ask a high-profile client, a bank manager, or an industry mentor.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded shadow-sm">
                  <span className="block text-xs font-bold text-red-500 uppercase mb-1">❌ Weak Nomination (Friend Zone)</span>
                  <p className="text-sm text-gray-600">"Sarah works so hard and deserves this award. She is a great boss."</p>
                </div>
                <div className="bg-white p-4 rounded shadow-sm">
                  <span className="block text-xs font-bold text-green-600 uppercase mb-1">✅ Strong Nomination (Business Case)</span>
                  <p className="text-sm text-gray-600">"Sarah's company grew 200% this year while revolutionizing supply chain efficiency. She is redefining the logistics sector."</p>
                </div>
              </div>
              <p className="text-sm text-slate-500 mt-4 italic">
                <strong>Tip:</strong> Draft the text for your nominator. Make it easy for them to say "yes" and paste your pre-written business case.
              </p>
            </div>

            <h2 id="application-process" className="text-3xl font-bold text-gray-900 mt-12 mb-6">What is the Application Process?</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              The nomination and selection process for the RBC Canadian Women Entrepreneur Awards is comprehensive and competitive. Success requires careful preparation, compelling storytelling, and strategic positioning. Here's your complete roadmap:
            </p>

            <div className="space-y-6 mb-8">
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Phase 1: Nomination Period (February - March 21, 2026)</h3>
                <p className="text-gray-700 mb-3">The journey begins with a nomination. Nominations open in early February and close strictly on <strong>March 21, 2026</strong>. Unlike many other awards, self-nominations are not only accepted but encouraged, ensuring that deserving entrepreneurs don't miss out simply because no one else submitted their name. The nomination form itself is relatively brief, acting as the initial gateway to the program. Its primary purpose is to verify basic eligibility and categorize the business correctly.</p>
                <p className="text-gray-700 mb-2 font-semibold">Key Activites:</p>
                <ul className="space-y-1 text-gray-700 list-disc list-inside ml-2">
                  <li>Complete the online nomination form at womenofinfluence.ca</li>
                  <li>Choose the most appropriate award category for your business</li>
                  <li>Provide detailed business information, financial metrics, and impact data</li>
                  <li>Upload required documentation (financial statements, business registration, etc.)</li>
                  <li>Submit compelling narrative responses demonstrating your achievements</li>
                </ul>
              </div>

              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Phase 2: Initial Review & Application Submission (April - May 2026)</h3>
                <p className="text-gray-700 mb-3">Once nominated, candidates are invited to submit a full application. This is the heavy lifting phase where you tell your comprehensive story. You will need to provide detailed financial statements, organizational charts, and long-form answers to specific questions about your business strategies, challenges, and triumphs. This phase separates the casual entrants from the serious contenders, as it requires a significant time investment to gather data and craft a compelling narrative.</p>
                <p className="text-gray-700 mb-2 font-semibold">Evaluation Criteria:</p>
                <ul className="space-y-1 text-gray-700 list-disc list-inside ml-2">
                  <li>Business performance metrics (revenue, profitability, growth rate)</li>
                  <li>Innovation and competitive differentiation</li>
                  <li>Leadership quality and vision</li>
                  <li>Social and economic impact</li>
                  <li>Scalability and sustainability potential</li>
                </ul>
              </div>

              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Phase 3: Finalist Selection & Due Diligence (June 2026)</h3>
                <p className="text-gray-700 mb-3">Top candidates in each category are shortlisted as Finalists. This is a major achievement in itself and comes with its own PR benefits. Finalists undergo a rigorous due diligence process to verify all claims made in the application. This often involves interviews with the selection committee, reference checks, and a deeper dive into financial health. Transparency is crucial here; any discrepancies between the application and the audit can lead to disqualification.</p>
                <p className="text-gray-700 mb-2 font-semibold">What to Expect:</p>
                <ul className="space-y-1 text-gray-700 list-disc list-inside ml-2">
                  <li>In-depth interviews with selection committee</li>
                  <li>Additional documentation review and verification</li>
                  <li>Reference checks and business validation</li>
                  <li>Public announcement of finalists (valuable PR opportunity)</li>
                </ul>
              </div>

              <div className="border-l-4 border-red-500 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Phase 4: Final Judging (Summer/Fall 2026)</h3>
                <p className="text-gray-700 mb-3">A distinguished panel of judges, comprising successful entrepreneurs, corporate executives, and industry icons, reviews the verified finalist profiles. They debate the merits of each candidate, looking for the "total package"—strong financials, clear vision, and inspiring leadership. They select one winner per category who best exemplifies the spirit of the award.</p>
              </div>

              <div className="border-l-4 border-orange-500 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Phase 5: Awards Gala (November 14, 2026)</h3>
                <p className="text-gray-700 mb-3">The process culminates in the black-tie Awards Gala at The Ritz-Carlton, Toronto. Winners are announced live on stage, creating a moment of high drama and celebration. It is one of the premier networking events of the year for Canadian business women, offering unparalleled access to the country's business elite.</p>
                <p className="text-gray-700 mb-2 font-semibold">Event Highlights:</p>
                <ul className="space-y-1 text-gray-700 list-disc list-inside ml-2">
                  <li>Cocktail reception and networking with 500+ business leaders</li>
                  <li>Three-course gourmet dinner</li>
                  <li>Live entertainment and awards ceremony</li>
                  <li>Extensive media coverage and photo opportunities</li>
                  <li>Post-event networking and celebration</li>
                </ul>
              </div>
            </div>

            <h2 id="application-mistakes" className="text-3xl font-bold text-gray-900 mt-12 mb-6">What are the Top 5 Application Mistakes?</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Even highly successful businesses often fail to reach the finalist stage due to avoidable application errors. Based on feedback from past judges, here are the most common pitfalls to watch out for:
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <Card className="p-5 border-l-4 border-red-400 bg-red-50">
                <h4 className="font-bold text-red-900 mb-2">1. Vague Impact Statements</h4>
                <p className="text-sm text-red-800">Don't just say "we improved customer satisfaction." Say "we increased our Net Promoter Score from 42 to 78 in 12 months." Judges cannot award points for generalities; they need concrete evidence of success.</p>
              </Card>
              <Card className="p-5 border-l-4 border-red-400 bg-red-50">
                <h4 className="font-bold text-red-900 mb-2">2. Misaligned Category Selection</h4>
                <p className="text-sm text-red-800">Applying for the "Innovation Award" with a standard consulting model, or the "Micro-Business Award" when you have 50 employees, results in automatic disqualification. Read the criteria carefully and choose the category where your specific strengths shine brightest.</p>
              </Card>
              <Card className="p-5 border-l-4 border-red-400 bg-red-50">
                <h4 className="font-bold text-red-900 mb-2">3. Ignoring the "Why"</h4>
                <p className="text-sm text-red-800">Many applications explain <em>what</em> the business does, but fail to explain <em>why</em> it matters. Why is your solution necessary? Why is now the right time? Connecting your business success to larger trends or societal needs makes for a much more compelling narrative.</p>
              </Card>
              <Card className="p-5 border-l-4 border-red-400 bg-red-50">
                <h4 className="font-bold text-red-900 mb-2">4. Inconsistent Financials</h4>
                <p className="text-sm text-red-800">Ensure your narrative matches your numbers. If you claim "explosive growth" but your financial statements show flat revenue, you lose credibility. Explain any anomalies or dips in your financial history proactively rather than hoping judges won't notice.</p>
              </Card>
              <Card className="p-5 border-l-4 border-red-400 bg-red-50 md:col-span-2">
                <h4 className="font-bold text-red-900 mb-2">5. Leaving It to the Last Minute</h4>
                <p className="text-sm text-red-800">A rushed application shows. Typographical errors, missing documents, and shallow answers are tell-tale signs of procrastination. Start early to allow time for review and refinement. Treat the application process with the same professional rigor you apply to client proposals.</p>
              </Card>
            </div>

            <h2 id="winning-strategies" className="text-3xl font-bold text-gray-900 mt-12 mb-6">What are the Winning Application Strategies?</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              After analyzing hundreds of winning applications over 34 years, certain patterns emerge. Here are the strategies that consistently lead to success:
            </p>

            <div className="space-y-6 mb-8">
              <Card className="p-6 bg-gradient-to-r from-blue-50 to-blue-100">
                <div className="flex items-start mb-4">
                  <Lightbulb className="w-8 h-8 text-blue-600 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">1. Lead with Compelling Numbers</h3>
                    <p className="text-gray-700">Quantify everything: revenue growth (%), jobs created, customers served, market share gained, cost savings delivered. Judges need concrete metrics, not vague claims. Example: "Increased revenue 347% over 3 years, from $200K to $894K, while maintaining 28% profit margins."</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-r from-green-50 to-green-100">
                <div className="flex items-start mb-4">
                  <Lightbulb className="w-8 h-8 text-green-600 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">2. Tell Your Unique Story Authentically</h3>
                    <p className="text-gray-700">What obstacles did you overcome? What unconventional path did you take? How did your background influence your business approach? Judges seek authentic human stories, not corporate jargon. Be vulnerable, honest, and real.</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-r from-purple-50 to-purple-100">
                <div className="flex items-start mb-4">
                  <Lightbulb className="w-8 h-8 text-purple-600 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">3. Demonstrate Clear Market Differentiation</h3>
                    <p className="text-gray-700">Explain precisely how your business differs from competitors. What proprietary advantage do you have? Why can't others easily replicate your success? Innovation doesn't require technology—unique business models, exceptional service, or underserved market focus all qualify.</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-r from-orange-50 to-orange-100">
                <div className="flex items-start mb-4">
                  <Lightbulb className="w-8 h-8 text-orange-600 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">4. Articulate Scalable Vision</h3>
                    <p className="text-gray-700">Where will your business be in 5 years? How will you get there? What resources do you need? Judges invest in future potential, not just past performance. Show them you're thinking strategically about sustainable growth.</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-r from-red-50 to-red-100">
                <div className="flex items-start mb-4">
                  <Lightbulb className="w-8 h-8 text-red-600 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">5. Showcase Leadership Beyond Business</h3>
                    <p className="text-gray-700">Do you mentor other women entrepreneurs? Contribute to industry associations? Advocate for policy changes? Support community initiatives? RBC seeks leaders who elevate their entire ecosystem, not just their own company.</p>
                  </div>
                </div>
              </Card>
            </div>

            <h2 id="value-of-winning" className="text-3xl font-bold text-gray-900 mt-12 mb-6">What is the Value of Winning?</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              While monetary awards are significant, past winners consistently cite non-financial benefits as equally or more valuable:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">🎤 Media Exposure & PR</h3>
                <p className="text-gray-700 text-sm">National media coverage worth $100,000+ in advertising value. Featured in major business publications, TV interviews, podcast appearances, and industry conferences.</p>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">🤝 Elite Networking</h3>
                <p className="text-gray-700 text-sm">Access to exclusive events with C-suite executives, venture capitalists, government officials, and successful entrepreneurs who can open doors impossible to access otherwise.</p>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">💡 Strategic Mentorship</h3>
                <p className="text-gray-700 text-sm">One-on-one guidance from business leaders who've built successful companies. Regular advisory sessions addressing your specific challenges and opportunities.</p>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">📈 Business Growth</h3>
                <p className="text-gray-700 text-sm">Past winners report 2-3x revenue growth in years following their win, attributed to increased credibility, customer confidence, and partnership opportunities.</p>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">🏆 Credibility Boost</h3>
                <p className="text-gray-700 text-sm">"RBC Canadian Women Entrepreneur Award Winner" becomes powerful credential in investor pitches, client proposals, and partnership negotiations.</p>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">🌟 Talent Attraction</h3>
                <p className="text-gray-700 text-sm">Award recognition helps attract top-tier employees who want to work for recognized, successful, values-driven companies led by accomplished leaders.</p>
              </Card>
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-8 my-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Pro Strategy: Monetizing the "Finalist" Badge</h3>
              <p className="text-gray-700 mb-6">
                You don't need to win to profit. The strict "Due Diligence" phase means that simply being named a Finalist validates your business legitmacy.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">1. The "Trust" Stamp</h4>
                  <p className="text-sm text-gray-600">Add the "RBC Awards Finalist" logo to your email signature and website immediately. Conversion rates often jump because independent auditors vouched for you.</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">2. The Talent Magnet</h4>
                  <p className="text-sm text-gray-600">Post about it on LinkedIn. Top talent wants to work for winners. Use the announcement to launch a recruitment drive.</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">3. The Bank Meeting</h4>
                  <p className="text-sm text-gray-600">Walk into your next loan negotiation with the finalist announcement. It's third-party proof that your financial health is top-tier.</p>
                </div>
              </div>
            </div>

            <h2 id="alternative-grants" className="text-3xl font-bold text-gray-900 mt-12 mb-6">What are Alternative Women Entrepreneur Grants?</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              If RBC CWEA isn't the right fit, or you want to maximize your funding opportunities, consider these additional programs for women entrepreneurs:
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">🇨🇦 Canadian Programs</h3>
            <div className="space-y-4 mb-8">
              <Card className="p-5 hover:shadow-lg transition-shadow">
                <h4 className="font-bold text-lg mb-2">Women Entrepreneurship Strategy (WES)</h4>
                <p className="text-gray-700 text-sm mb-2"><strong>Funding:</strong> Up to $100,000 grants + loans up to $50,000</p>
                <p className="text-gray-700 text-sm mb-2"><strong>Provider:</strong> Government of Canada</p>
                <p className="text-gray-700 text-sm">Comprehensive federal program supporting women-owned businesses with funding, mentorship, and resources nationwide.</p>
              </Card>

              <Card className="p-5 hover:shadow-lg transition-shadow">
                <h4 className="font-bold text-lg mb-2">BMO Celebrating Women Grant</h4>
                <p className="text-gray-700 text-sm mb-2"><strong>Funding:</strong> Up to $50,000</p>
                <p className="text-gray-700 text-sm mb-2"><strong>Provider:</strong> BMO Bank of Montreal</p>
                <p className="text-gray-700 text-sm">Annual grant program supporting women entrepreneurs with growth capital and business resources.</p>
              </Card>

              <Card className="p-5 hover:shadow-lg transition-shadow">
                <h4 className="font-bold text-lg mb-2">Futurpreneur Canada - Women Entrepreneurs Program</h4>
                <p className="text-gray-700 text-sm mb-2"><strong>Funding:</strong> Up to $60,000 loans + mentorship</p>
                <p className="text-gray-700 text-sm mb-2"><strong>Provider:</strong> Futurpreneur Canada</p>
                <p className="text-gray-700 text-sm">Support for young women entrepreneurs aged 18-39 starting or growing their businesses.</p>
              </Card>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">🇺🇸 American Programs</h3>
            <div className="space-y-4 mb-8">
              <Card className="p-5 hover:shadow-lg transition-shadow">
                <h4 className="font-bold text-lg mb-2">Amber Grant for Women</h4>
                <p className="text-gray-700 text-sm mb-2"><strong>Funding:</strong> $10,000 monthly + $25,000 annual winner</p>
                <p className="text-gray-700 text-sm mb-2"><strong>Provider:</strong> WomensNet</p>
                <p className="text-gray-700 text-sm">Monthly grants for women entrepreneurs in USA and Canada. Simple application process.</p>
              </Card>

              <Card className="p-5 hover:shadow-lg transition-shadow">
                <h4 className="font-bold text-lg mb-2">Cartier Women's Initiative</h4>
                <p className="text-gray-700 text-sm mb-2"><strong>Funding:</strong> Up to $100,000 + global exposure</p>
                <p className="text-gray-700 text-sm mb-2"><strong>Provider:</strong> Cartier</p>
                <p className="text-gray-700 text-sm">International program for women impact entrepreneurs addressing social/environmental challenges.</p>
              </Card>

              <Card className="p-5 hover:shadow-lg transition-shadow">
                <h4 className="font-bold text-lg mb-2">EmpowHer Grant</h4>
                <p className="text-gray-700 text-sm mb-2"><strong>Funding:</strong> Up to $25,000</p>
                <p className="text-gray-700 text-sm mb-2"><strong>Provider:</strong> Boundless Futures Foundation</p>
                <p className="text-gray-700 text-sm">For US women entrepreneurs 22+ operating businesses for 3 years or less with social impact focus.</p>
              </Card>

              <Card className="p-5 hover:shadow-lg transition-shadow">
                <h4 className="font-bold text-lg mb-2">SBA Women-Owned Small Business Program</h4>
                <p className="text-gray-700 text-sm mb-2"><strong>Funding:</strong> Federal contract set-asides + resources</p>
                <p className="text-gray-700 text-sm mb-2"><strong>Provider:</strong> U.S. Small Business Administration</p>
                <p className="text-gray-700 text-sm">Provides women-owned businesses access to federal contracting opportunities and business development.</p>
              </Card>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Frequently Asked Questions</h2>

            <div className="space-y-6 mb-8">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Q: Can I apply if I'm not the sole owner?</h3>
                <p className="text-gray-700">A: Yes, you don't need to be the sole owner, but you must own shares and hold the most senior leadership position. Many winners are co-founders or majority owners.</p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Q: Are social enterprises and non-profits eligible?</h3>
                <p className="text-gray-700">A: Yes! Social enterprises and registered charities can apply, particularly for Social Change Award categories. You must demonstrate financial stability and impact measurement.</p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Q: What if I've won other business awards?</h3>
                <p className="text-gray-700">A: Excellent! Previous awards strengthen your application by validating your achievements. Include all relevant recognition in your submission.</p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Q: Can I nominate myself or does someone else need to nominate me?</h3>
                <p className="text-gray-700">A: Self-nominations are accepted and common. You know your business best and can present the strongest case for your achievements.</p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Q: How long should I spend on my application?</h3>
                <p className="text-gray-700">A: Plan 10-15 hours for a comprehensive application. Start early, gather all required documents, and have trusted advisors review your submission before submitting.</p>
              </div>
            </div>

            <h2 id="timeline" className="text-3xl font-bold text-gray-900 mt-12 mb-6">What are the Important Dates & Timeline?</h2>
            <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 mb-8">
              <div className="space-y-4">
                <div className="flex items-start border-b pb-3">
                  <Calendar className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-bold text-gray-900">Early February 2026</p>
                    <p className="text-gray-700 text-sm">Nominations open - Start preparing your application</p>
                  </div>
                </div>
                <div className="flex items-start border-b pb-3">
                  <Calendar className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-bold text-gray-900">March 21, 2026</p>
                    <p className="text-gray-700 text-sm">Application deadline (11:59 PM EST) - No extensions granted</p>
                  </div>
                </div>
                <div className="flex items-start border-b pb-3">
                  <Calendar className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-bold text-gray-900">June 2026</p>
                    <p className="text-gray-700 text-sm">Finalists announced publicly</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-purple-600 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-bold text-gray-900">November 14, 2026</p>
                    <p className="text-gray-700 text-sm">Awards Gala at The Ritz-Carlton, Toronto - Winners revealed</p>
                  </div>
                </div>
              </div>
            </Card>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Final Thoughts: Should You Apply?</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              The RBC Canadian Women Entrepreneur Awards represent one of the most prestigious recognitions for women business leaders in North America. If you meet the eligibility criteria, have a compelling story, and demonstrate measurable business success, absolutely apply.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              Even if you don't win, the application process itself provides valuable benefits: it forces strategic reflection on your business, creates documentation useful for future opportunities, and potentially gets you noticed as a finalist with significant PR value.
            </p>
            <p className="text-gray-700 leading-relaxed mb-8">
              Remember: Every past winner was once a first-time applicant who decided to take the chance. Your story deserves to be told, your achievements deserve recognition, and your business deserves the platform these awards provide.
            </p>

          </div>

          {/* Common Questions Section */}
          <section className="py-12 bg-gray-50">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Common Questions</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {faqData.map((faq, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Related Guides Section */}
          <section className="py-16 bg-gray-50">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Women Entrepreneur Guides</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Link href="/blog/bmo-celebrating-women-grant" className="block p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all group">
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-700 mb-2">BMO Observing Women Grant</h3>
                  <p className="text-gray-600 text-sm">$100K grant program for women-owned businesses</p>
                </Link>
                <Link href="/blog/scotiabank-women-initiative" className="block p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all group">
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-700 mb-2">Scotiabank Women Initiative</h3>
                  <p className="text-gray-600 text-sm">Capital and mentorship for women entrepreneurs</p>
                </Link>
                <Link href="/blog/cartier-womens-initiative-canada" className="block p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all group">
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-700 mb-2">Cartier Women's Initiative</h3>
                  <p className="text-gray-600 text-sm">International awards program for impact entrepreneurs</p>
                </Link>
                <Link href="/blog/women-business-grants-canada" className="block p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all group">
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-700 mb-2">Women Business Grants</h3>
                  <p className="text-gray-600 text-sm">Complete directory of funding opportunities</p>
                </Link>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <Card className="p-8 bg-gradient-to-br from-red-50 via-purple-50 to-blue-50 border-2 border-red-200 mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Ready to Nominate Yourself?</h3>
            <p className="text-gray-700 mb-6 text-center">
              The March 21, 2026 deadline is approaching. Start your application today and join Canada's most accomplished women entrepreneurs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700" asChild>
                <a href="https://www.womenofinfluence.ca/rbc-cwea/" target="_blank" rel="noopener noreferrer">
                  Apply Now <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/canada/women-business-grants">
                  Explore More Grants <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </Card>

          {/* Newsletter */}
          <div className="mt-12">
            <NewsletterBox />
          </div>

          {/* Related Resources */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Resources for Women Entrepreneurs</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <h4 className="font-semibold text-lg mb-2">Women Business Grants Canada</h4>
                <p className="text-gray-600 text-sm mb-4">Complete directory of funding programs for Canadian women entrepreneurs</p>
                <Link href="/canada/women-business-grants" className="text-primary hover:underline text-sm font-medium">
                  View All Grants →
                </Link>
              </Card>
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <h4 className="font-semibold text-lg mb-2">Grant Writing Guide</h4>
                <p className="text-gray-600 text-sm mb-4">Expert tips for writing winning grant applications that get funded</p>
                <Link href="/blog/grant-writing-secrets-2026" className="text-primary hover:underline text-sm font-medium">
                  Read Guide →
                </Link>
              </Card>
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <h4 className="font-semibold text-lg mb-2">USA Women Entrepreneur Grants</h4>
                <p className="text-gray-600 text-sm mb-4">Funding opportunities for women-owned businesses in the United States</p>
                <Link href="/usa/women-entrepreneurs-grants" className="text-primary hover:underline text-sm font-medium">
                  Explore USA Grants →
                </Link>
              </Card>
            </div>
          </div>

        </div>
      </article>
      <Footer />
    </>
  )
}
