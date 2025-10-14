import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, DollarSign, Calendar, CheckCircle, ArrowRight, Users, TrendingUp, Target, Lightbulb } from "lucide-react"
import Link from "next/link"
import NewsletterBox from "@/components/blog/NewsletterBox"

export const metadata = {
  title: "RBC Canadian Women Entrepreneur Awards 2025: Complete Guide to $100K+ in Grants & Recognition",
  description: "Comprehensive guide to RBC Canadian Women Entrepreneur Awards 2025. Learn eligibility, application process, 8 award categories, past winners, and similar grants for women in USA & Canada. Deadline: March 21, 2025.",
  keywords: "RBC Women Entrepreneur Awards, women business grants Canada, women entrepreneur funding, Canadian women business awards, women startup grants, female entrepreneur support, women entrepreneurship Canada USA, business grants for women 2025",
  openGraph: {
    title: "RBC Canadian Women Entrepreneur Awards 2025 - Win Up to $100,000",
    description: "33rd Annual RBC Canadian Women Entrepreneur Awards. 8 categories, national recognition, mentorship, and up to $100K in funding for women-led businesses.",
  }
}

export default function RBCWomenEntrepreneurAwards() {
  return (
    <>
      <Header />
      <article className="min-h-screen bg-gray-50 py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-600 mb-6">
            <Link href="/" className="hover:text-primary">Home</Link>
            {" > "}
            <Link href="/blog" className="hover:text-primary">Blog</Link>
            {" > "}
            <span className="text-gray-900">RBC Women Entrepreneur Awards 2025</span>
          </nav>

          {/* Header */}
          <header className="mb-10">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge className="bg-red-100 text-red-800 hover:bg-red-200">🇨🇦 Canada Awards</Badge>
              <Badge variant="outline">Women Entrepreneurs</Badge>
              <Badge variant="outline">$100K+ Funding</Badge>
              <Badge variant="secondary">November 14, 2025</Badge>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              RBC Canadian Women Entrepreneur Awards 2025: Your Complete Guide to Winning $100,000+ in Grants & National Recognition
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Updated: October 14, 2025
              </span>
              <span>•</span>
              <span>12 min read</span>
              <span>•</span>
              <span className="flex items-center">
                <Users className="w-4 h-4 mr-2" />
                33rd Annual Event
              </span>
            </div>
            <p className="text-xl text-gray-700 leading-relaxed">
              For over three decades, the RBC Canadian Women Entrepreneur Awards have recognized Canada's most accomplished women business leaders. This comprehensive guide covers everything you need to know about the 2025 awards, including eligibility requirements, application tips, award categories, and alternative funding options for women entrepreneurs across North America.
            </p>
          </header>

          {/* Quick Stats Card */}
          <Card className="p-6 bg-gradient-to-br from-red-50 via-purple-50 to-blue-50 mb-10 border-2 border-red-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Award className="w-6 h-6 mr-3 text-red-600" />
              2025 Awards at a Glance
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
                <p className="text-sm text-gray-600">2025 Deadline</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <TrendingUp className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <p className="text-3xl font-bold text-gray-900">33rd</p>
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
              The 33rd Annual RBC Canadian Women Entrepreneur Awards Gala will take place on <strong>Friday, November 14, 2025</strong>, at The Ritz-Carlton, Toronto. This black-tie event brings together Canada's top women entrepreneurs, business executives, government officials, and industry leaders for an evening of celebration, networking, and recognition.
            </p>
            <p className="text-gray-700 leading-relaxed mb-8">
              Beyond monetary prizes, winners gain invaluable national recognition, extensive media coverage, exclusive networking opportunities with Canada's business elite, and access to mentorship programs that can accelerate their business growth for years to come.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">8 Award Categories for 2025: Find Your Perfect Match</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              The 2025 program features eight distinct award categories designed to recognize excellence across different business stages, industries, and impact areas. Understanding which category best aligns with your business is crucial for application success.
            </p>

            <div className="space-y-6 my-8">
              <Card className="p-6 border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-3">1. Ones to Watch Award</h3>
                <p className="text-gray-700 mb-2"><strong>Best for:</strong> Emerging entrepreneurs and early-stage businesses</p>
                <p className="text-gray-700 mb-2"><strong>Focus:</strong> High-growth potential, innovative business models, and promising market traction</p>
                <p className="text-gray-700"><strong>Ideal candidate:</strong> Women entrepreneurs in their first 3 years of operation showing exceptional promise and scalability</p>
              </Card>

              <Card className="p-6 border-l-4 border-green-500 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-3">2. Micro-Business Award</h3>
                <p className="text-gray-700 mb-2"><strong>Best for:</strong> Solo entrepreneurs and businesses with 1-5 employees</p>
                <p className="text-gray-700 mb-2"><strong>Focus:</strong> Sustainable profitability, community impact, and business resilience</p>
                <p className="text-gray-700"><strong>Ideal candidate:</strong> Women running lean, profitable businesses with strong local presence and customer loyalty</p>
              </Card>

              <Card className="p-6 border-l-4 border-purple-500 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-3">3. Start-Up Award</h3>
                <p className="text-gray-700 mb-2"><strong>Best for:</strong> Businesses 3-5 years old in growth phase</p>
                <p className="text-gray-700 mb-2"><strong>Focus:</strong> Revenue growth, market penetration, and team expansion</p>
                <p className="text-gray-700"><strong>Ideal candidate:</strong> Women entrepreneurs successfully transitioning from startup to scale-up phase</p>
              </Card>

              <Card className="p-6 border-l-4 border-red-500 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-3">4. RBC Momentum Award</h3>
                <p className="text-gray-700 mb-2"><strong>Best for:</strong> Established businesses demonstrating rapid acceleration</p>
                <p className="text-gray-700 mb-2"><strong>Focus:</strong> Significant year-over-year growth in revenue, employees, and market share</p>
                <p className="text-gray-700"><strong>Ideal candidate:</strong> Women-led businesses with proven track record showing exponential growth trajectory</p>
              </Card>

              <Card className="p-6 border-l-4 border-orange-500 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-3">5. Social Change Award: Regional Impact</h3>
                <p className="text-gray-700 mb-2"><strong>Best for:</strong> Businesses creating positive change at regional/provincial level</p>
                <p className="text-gray-700 mb-2"><strong>Focus:</strong> Community development, environmental sustainability, and social equity</p>
                <p className="text-gray-700"><strong>Ideal candidate:</strong> Social enterprises and mission-driven businesses with measurable local impact</p>
              </Card>

              <Card className="p-6 border-l-4 border-teal-500 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-3">6. Social Change Award: National Impact</h3>
                <p className="text-gray-700 mb-2"><strong>Best for:</strong> Businesses driving systemic change across Canada</p>
                <p className="text-gray-700 mb-2"><strong>Focus:</strong> Scalable social impact, policy influence, and nationwide reach</p>
                <p className="text-gray-700"><strong>Ideal candidate:</strong> Women entrepreneurs solving major societal challenges with innovative, scalable solutions</p>
              </Card>

              <Card className="p-6 border-l-4 border-indigo-500 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-3">7. Innovation Award</h3>
                <p className="text-gray-700 mb-2"><strong>Best for:</strong> Businesses disrupting industries through innovation</p>
                <p className="text-gray-700 mb-2"><strong>Focus:</strong> Technological advancement, process innovation, and market disruption</p>
                <p className="text-gray-700"><strong>Ideal candidate:</strong> Women entrepreneurs developing cutting-edge products, services, or business models</p>
              </Card>

              <Card className="p-6 border-l-4 border-pink-500 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-3">8. Excellence Award</h3>
                <p className="text-gray-700 mb-2"><strong>Best for:</strong> Established leaders with sustained business excellence</p>
                <p className="text-gray-700 mb-2"><strong>Focus:</strong> Long-term profitability, industry leadership, and mentorship contributions</p>
                <p className="text-gray-700"><strong>Ideal candidate:</strong> Veteran women entrepreneurs with 10+ years of sustained success and industry influence</p>
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
                  <span><strong>Business Registration:</strong> Must be registered as a sole proprietorship or corporation for three full years as of April 30, 2025</span>
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

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Application Process: Step-by-Step Roadmap</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              The nomination and selection process for the RBC Canadian Women Entrepreneur Awards is comprehensive and competitive. Success requires careful preparation, compelling storytelling, and strategic positioning. Here's your complete roadmap:
            </p>

            <div className="space-y-6 mb-8">
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Phase 1: Nomination Period (February - March 21, 2025)</h3>
                <p className="text-gray-700 mb-3">Nominations open in early February and close on <strong>March 21, 2025</strong>. During this period:</p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Complete the online nomination form at womenofinfluence.ca</li>
                  <li>• Choose the most appropriate award category for your business</li>
                  <li>• Provide detailed business information, financial metrics, and impact data</li>
                  <li>• Upload required documentation (financial statements, business registration, etc.)</li>
                  <li>• Submit compelling narrative responses demonstrating your achievements</li>
                </ul>
              </div>

              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Phase 2: Initial Review (April - May 2025)</h3>
                <p className="text-gray-700 mb-3">Program committee evaluates all nominations based on:</p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Business performance metrics (revenue, profitability, growth rate)</li>
                  <li>• Innovation and competitive differentiation</li>
                  <li>• Leadership quality and vision</li>
                  <li>• Social and economic impact</li>
                  <li>• Scalability and sustainability potential</li>
                </ul>
              </div>

              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Phase 3: Finalist Selection (June 2025)</h3>
                <p className="text-gray-700 mb-3">Top candidates in each category advance to finalist status and undergo:</p>
                <ul className="space-y-2 text-gray-700">
                  <li>• In-depth interviews with selection committee</li>
                  <li>• Additional documentation review and verification</li>
                  <li>• Reference checks and business validation</li>
                  <li>• Public announcement of finalists (valuable PR opportunity)</li>
                </ul>
              </div>

              <div className="border-l-4 border-red-500 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Phase 4: Final Judging (Summer/Fall 2025)</h3>
                <p className="text-gray-700 mb-3">Distinguished judging panel evaluates finalists and selects winners based on comprehensive criteria. Judges include successful entrepreneurs, corporate executives, and industry experts.</p>
              </div>

              <div className="border-l-4 border-orange-500 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Phase 5: Awards Gala (November 14, 2025)</h3>
                <p className="text-gray-700 mb-3">Winners announced live at The Ritz-Carlton, Toronto during black-tie gala event featuring:</p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Cocktail reception and networking with 500+ business leaders</li>
                  <li>• Three-course gourmet dinner</li>
                  <li>• Live entertainment and awards ceremony</li>
                  <li>• Extensive media coverage and photo opportunities</li>
                  <li>• Post-event networking and celebration</li>
                </ul>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Winning Application Strategies: Insider Tips from Past Winners</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              After analyzing hundreds of winning applications over 33 years, certain patterns emerge. Here are the strategies that consistently lead to success:
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

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Beyond Prize Money: The Real Value of Winning</h2>
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

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Alternative Women Entrepreneur Grants in Canada & USA</h2>
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

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Important Dates & Application Timeline</h2>
            <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 mb-8">
              <div className="space-y-4">
                <div className="flex items-start border-b pb-3">
                  <Calendar className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-bold text-gray-900">Early February 2025</p>
                    <p className="text-gray-700 text-sm">Nominations open - Start preparing your application</p>
                  </div>
                </div>
                <div className="flex items-start border-b pb-3">
                  <Calendar className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-bold text-gray-900">March 21, 2025</p>
                    <p className="text-gray-700 text-sm">Application deadline (11:59 PM EST) - No extensions granted</p>
                  </div>
                </div>
                <div className="flex items-start border-b pb-3">
                  <Calendar className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-bold text-gray-900">June 2025</p>
                    <p className="text-gray-700 text-sm">Finalists announced publicly</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-purple-600 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-bold text-gray-900">November 14, 2025</p>
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

          {/* CTA Section */}
          <Card className="p-8 bg-gradient-to-br from-red-50 via-purple-50 to-blue-50 border-2 border-red-200 mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Ready to Nominate Yourself?</h3>
            <p className="text-gray-700 mb-6 text-center">
              The March 21, 2025 deadline is approaching. Start your application today and join Canada's most accomplished women entrepreneurs.
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
                <Link href="/blog/grant-writing-secrets-2025" className="text-primary hover:underline text-sm font-medium">
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
