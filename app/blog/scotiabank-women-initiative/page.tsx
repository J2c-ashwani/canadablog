import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, DollarSign, Target, AlertCircle, Building, Clock, Download, TrendingUp, HelpCircle, BookOpen, ExternalLink, Award, Users, Heart, Briefcase } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Scotiabank Women Initiative 2026 | $3B Capital, Free Advisory & Business Education",
  description: "Complete guide to Scotiabank Women Initiative for women entrepreneurs. Access $3 billion in capital commitment, free specialized advisory services, business education from partner institutions like Rotman and Ivey, plus networking with 10,000+ women business owners.",
  keywords: "Scotiabank Women Initiative 2026, $3 billion women entrepreneur funding, Scotiabank women business loans, women entrepreneur advisory services Canada, women business support programs, Scotiabank small business women, free business education women entrepreneurs",
  openGraph: {
    title: "Scotiabank Women Initiative 2026 | $3B Capital + Free Advisory",
    description: "Access $3B in capital, free advisory services, business education from Rotman and Ivey, and networking with 10,000+ women entrepreneurs.",
    url: "https://www.fsidigital.ca/blog/scotiabank-women-initiative",
    images: ["/images/blog/women-business-theme.png"],
  },
}

const faqData = [
  {
    question: "Do I need to be a majority business owner to participate in the Scotiabank Women Initiative?",
    answer: "No, the program serves women with any ownership percentage as well as women executives and leaders in business roles without ownership. The focus is on supporting women in business leadership regardless of specific ownership structure."
  },
  {
    question: "Are there fees for Scotiabank Women Initiative participation?",
    answer: "Advisory services, core education programming, and networking events are available at no additional cost beyond standard banking product fees. Some partner programs may have separate costs, but the core initiative resources are included."
  },
  {
    question: "Does the Scotiabank Women Initiative provide grants or only loans?",
    answer: "The Scotiabank Women Initiative provides commercial banking products including loans and credit facilities rather than grants. The $3 billion capital commitment reflects lending availability. Grants are available through government programs which can complement this initiative."
  },
  {
    question: "Are there specific industries Scotiabank prefers?",
    answer: "While Scotiabank lends to all industries, they have deep expertise in Healthcare (physicians/dentists), Agriculture, and Manufacturing. Women-led businesses in these sectors often find the adjudication process smoother due to the bank's sectoral knowledge."
  },
  {
    question: "Can I use the Scotiabank Women Initiative if I bank elsewhere?",
    answer: "You can access some educational webinars and open networking events as a non-client. However, to access the $3B capital pool or the 1-on-1 Advisory Services, you must move your primary business banking relationship to Scotiabank."
  },
  {
    question: "What credit score do I need?",
    answer: "For commercial loans under $50,000, your personal credit score (ideally 680+) is heavily weighted. For larger lines of credit or term loans ($250k+), the bank focuses more on your business's Debt Service Coverage Ratio (DSCR) - your ability to generate enough cash to cover loan payments."
  },
  {
    question: "Does this program help with VC funding?",
    answer: "Directly, no. Scotiabank provides debt, not equity. However, the 'Women Initiative' network includes many angel investors and VC partners (like The51). Advisors can often make warm introductions to equity partners if debt financing isn't the right fit."
  },
  {
    question: "What is the 'StrikeUP' conference relation?",
    answer: "Scotiabank is a major sponsor of StrikeUP, Canada's flagship digital conference for women entrepreneurs. It's a key venue where the Initiative launches new tools and where participants can network with thousands of peers."
  }
  ,
  {
    question: "How do I get started with the Scotiabank Women Initiative?",
    answer: "Contact Scotiabank small business banking through branch visit, phone, or online. Request information about the Women Initiative and connection to a program advisor. Existing customers can request transfer to program-specialized advisors."
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

export default function ScotiabankWomenInitiativePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <div className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-br from-red-600 to-red-800 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30"><Heart className="w-3 h-3 mr-1" /> Women Entrepreneurs</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Scotiabank Women Initiative 2026</h1>
              <p className="text-xl text-red-100 mb-8">Comprehensive guide to Canada&apos;s leading bank-sponsored women entrepreneur program. Access three billion dollars in committed capital, specialized advisory services, business education programming, and a powerful network of successful women business owners across Canada.</p>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild><Link href="/contact?program=scotiabank-women">Get Connected</Link></Button>
            </div>
          </div>
        </section>

        {/* Common Questions Section */}
        <section className="py-12 bg-gray-50 border-b border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">❓ Common Questions About The Initiative</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <a href="#capital" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                  <h3 className="font-semibold text-red-900">How much funding is available?</h3>
                  <p className="text-sm text-gray-600 mt-1">$3 Billion in committed capital for women-owned businesses.</p>
                </a>
                <a href="#advisory" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                  <h3 className="font-semibold text-red-900">Is the advisory free?</h3>
                  <p className="text-sm text-gray-600 mt-1">Yes, specialized advisory services are included at no extra cost.</p>
                </a>
                <a href="#eligibility" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                  <h3 className="font-semibold text-red-900">Do I need to be 100% owner?</h3>
                  <p className="text-sm text-gray-600 mt-1">No, meaningful ownership or a leadership role is sufficient.</p>
                </a>
                <a href="#education" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                  <h3 className="font-semibold text-red-900">What education is offered?</h3>
                  <p className="text-sm text-gray-600 mt-1">Workshops and courses from partners like Rotman and Ivey.</p>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <nav className="p-6 bg-gray-50 rounded-xl">
                <h2 className="text-lg font-bold mb-4">In This Guide</h2>
                <ul className="grid md:grid-cols-2 gap-2 text-sm">
                  <li><a href="#overview" className="text-blue-700 hover:underline">1. Initiative Overview</a></li>
                  <li><a href="#capital" className="text-blue-700 hover:underline">2. Capital Access</a></li>
                  <li><a href="#advisory" className="text-blue-700 hover:underline">3. Advisory Services</a></li>
                  <li><a href="#education" className="text-blue-700 hover:underline">4. Business Education</a></li>
                  <li><a href="#community" className="text-blue-700 hover:underline">5. Community Network</a></li>
                  <li><a href="#global" className="text-blue-700 hover:underline">6. Global Expansion</a></li>
                  <li><a href="#eligibility" className="text-blue-700 hover:underline">7. Eligibility</a></li>
                  <li><a href="#getting-started" className="text-blue-700 hover:underline">8. Getting Started</a></li>
                  <li><a href="#comparison" className="text-blue-700 hover:underline">9. Program Comparison</a></li>
                  <li><a href="#success" className="text-blue-700 hover:underline">10. Success Stories</a></li>
                  <li><a href="#tips" className="text-blue-700 hover:underline">11. Maximizing Benefits</a></li>
                  <li><a href="#faqs" className="text-blue-700 hover:underline">12. FAQs</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto grid md:grid-cols-4 gap-8 text-center">
              <div><div className="text-3xl font-bold text-red-600 mb-2">$3B</div><div className="text-gray-600">Capital Committed</div></div>
              <div><div className="text-3xl font-bold text-blue-600 mb-2">10K+</div><div className="text-gray-600">Women Entrepreneurs</div></div>
              <div><div className="text-3xl font-bold text-green-600 mb-2">Free</div><div className="text-gray-600">Advisory Services</div></div>
              <div><div className="text-3xl font-bold text-purple-600 mb-2">Global</div><div className="text-gray-600">Network Access</div></div>
            </div>
          </div>
        </section>

        {/* Program Pillars */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">Four Pillars of Support</h2>
              <p className="text-lg text-gray-600 text-center mb-10 max-w-3xl mx-auto">
                The Scotiabank Women Initiative provides comprehensive support across capital, advisory, education, and community.
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border-2 border-red-200 hover:shadow-xl transition-all hover:-translate-y-1">
                  <CardHeader className="bg-gradient-to-br from-red-50 to-rose-50">
                    <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-3">
                      <DollarSign className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-red-700">Capital Access</CardTitle>
                    <div className="text-2xl font-bold text-gray-900">$3 Billion</div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Operating lines of credit</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Term loans &amp; equipment financing</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Commercial mortgages</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-2 border-blue-200 hover:shadow-xl transition-all hover:-translate-y-1">
                  <CardHeader className="bg-gradient-to-br from-blue-50 to-indigo-50">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-3">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-blue-700">Advisory Services</CardTitle>
                    <div className="text-2xl font-bold text-gray-900">Free</div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Specialized small business advisors</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Cash flow optimization</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Financial planning support</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-2 border-green-200 hover:shadow-xl transition-all hover:-translate-y-1">
                  <CardHeader className="bg-gradient-to-br from-green-50 to-emerald-50">
                    <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-3">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-green-700">Education</CardTitle>
                    <div className="text-2xl font-bold text-gray-900">Partner Programs</div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Rotman School of Management</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Ivey Business School</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Online courses &amp; webinars</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-2 border-purple-200 hover:shadow-xl transition-all hover:-translate-y-1">
                  <CardHeader className="bg-gradient-to-br from-purple-50 to-pink-50">
                    <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-3">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-purple-700">Community</CardTitle>
                    <div className="text-2xl font-bold text-gray-900">10,000+</div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>National networking events</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Peer mentorship matching</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Global expansion support</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section id="overview" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Scotiabank Women Initiative Overview</h2>
              <p className="text-gray-700 leading-relaxed mb-6">The Scotiabank Women Initiative represents one of the most comprehensive bank-sponsored programs supporting women entrepreneurs in Canada and internationally. Launched with a three billion dollar capital commitment, the initiative provides women business owners and executives with access to financing, education, advisory services, and networking opportunities specifically designed to address the unique challenges women face in business ownership and leadership.</p>
              <p className="text-gray-700 leading-relaxed mb-6">The initiative recognizes that women entrepreneurs face persistent barriers to business growth including limited access to capital, insufficient business networks, and lack of targeted advisory support. Research consistently shows that women-owned businesses receive less than five percent of venture capital investment and face higher loan rejection rates than male-owned businesses despite comparable creditworthiness. The Scotiabank Women Initiative directly addresses these gaps through dedicated programs and commitments.</p>
              <p className="text-gray-700 leading-relaxed mb-6">Program components integrate capital access with capability building. The financing commitment ensures women entrepreneurs have access to credit products including operating lines, term loans, and commercial mortgages with dedicated underwriting attention. Advisory services provide one-on-one support from specialized small business advisors trained in the unique needs of women-owned businesses. Education programming builds business skills through workshops, webinars, and partnerships with business schools and entrepreneurship organizations.</p>
              <p className="text-gray-700 leading-relaxed mb-6">The initiative operates across Scotiabank&apos;s Canadian branch network with enhanced availability in major urban centers where program specialists concentrate. Women entrepreneurs in any industry can access the program, from retail and professional services to manufacturing, technology, and healthcare. The program serves businesses at all stages from startups seeking initial financing through established companies pursuing expansion, acquisition, or succession planning.</p>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-red-200"><CardHeader><CardTitle className="text-red-700">Program Pillars</CardTitle></CardHeader><CardContent><ul className="text-sm space-y-2"><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Three billion dollars in dedicated capital for women entrepreneurs</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Specialized advisory services from trained small business experts</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Business education through workshops and online programming</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Community network connecting women entrepreneurs nationally</span></li></ul></CardContent></Card>
                <Card className="border-blue-200"><CardHeader><CardTitle className="text-blue-700">Unique Benefits</CardTitle></CardHeader><CardContent><ul className="text-sm space-y-2"><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>No program fees for advisory services and education</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Access to business education from partner institutions</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Networking events connecting women business owners</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>International expansion support through global network</span></li></ul></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        <section id="capital" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Capital Access and Financing</h2>
              <p className="text-gray-700 mb-6">The capital commitment represents the initiative&apos;s foundational pillar, with three billion dollars dedicated to financing women-owned and women-led businesses. This commitment encompasses the full range of Scotiabank business credit products including operating lines of credit, term loans for equipment and expansion, commercial mortgages, and trade financing for international business. The dedicated capital pool ensures that women entrepreneurs receive focused attention rather than competing in general lending queues.</p>
              <p className="text-gray-700 mb-6">Financing decisions benefit from specialized underwriting consideration that recognizes the characteristics of women-owned businesses. Research shows that women entrepreneurs often bootstrap longer before seeking external financing, may have different collateral profiles, and frequently operate in service sectors with different asset characteristics than traditional manufacturing businesses. Program advisors help structure financing requests to present business strengths effectively and connect applicants with appropriate credit products.</p>
              <p className="text-gray-700 mb-6">The initiative provides financing across business stages and sizes. Startups can access initial operating capital and equipment financing to launch operations. Growing businesses can secure expansion financing for facility growth, additional inventory, or equipment upgrades. Established businesses can access acquisition financing for growth through purchase or succession financing to support ownership transitions. Commercial mortgage products enable property acquisition for businesses ready to own rather than lease their facilities.</p>
              <p className="text-gray-700 mb-6">Interest rates and loan terms follow Scotiabank&apos;s standard commercial lending practices, with specific pricing determined by individual creditworthiness and loan characteristics. The initiative does not provide grants or below-market financing but ensures that women entrepreneurs receive fair consideration and appropriate products for their business needs. Some promotional rates may be available during specific campaigns or for qualifying business profiles. Women entrepreneurs should discuss current rate offerings and any special programs with their advisors during the application process to maximize financing value.</p>
            </div>
          </div>
        </section>

        <section id="advisory" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Advisory Services: How to Prepare</h2>
              <p className="text-gray-700 mb-8">Meeting with a Scotiabank Women Initiative advisor is more than a sales call; it&apos;s a strategic session. To get the most out of these free services, preparation is key.</p>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-12">
                <div className="bg-blue-900 text-white p-6">
                  <h3 className="text-xl font-bold flex items-center"><Briefcase className="w-6 h-6 mr-3" /> The "First Meeting" Checklist</h3>
                  <p className="text-blue-100 mt-2">Bring these items to your first consultation to signal you are serious and "bank-ready".</p>
                </div>
                <div className="p-6 grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-4 border-b pb-2">Financial Documents</h4>
                    <ul className="space-y-3 text-sm text-gray-600">
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" /> Last 2 years of Notice of Assessments (T1 or T2)</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" /> Current Year-to-Date Balance Sheet & Income Statement</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" /> List of current business debts and monthly payments</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" /> Personal Net Worth Statement (assets vs liabilities)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-4 border-b pb-2">Business Context</h4>
                    <ul className="space-y-3 text-sm text-gray-600">
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0" /> <strong>The "Ask":</strong> Know exactly how much you need and what it&apos;s for.</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0" /> <strong>The Repayment:</strong> Simple explanation of how cash flow covers the loan.</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0" /> <strong>Orbit Chart:</strong> Who are your key suppliers and customers?</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0" /> <strong>Growth Plan:</strong> One-page summary of next 12 months.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-6">Success Stories: Initiative in Action</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2">
                    <Badge className="w-fit mb-2 bg-purple-100 text-purple-800 hover:bg-purple-200">Expansion</Badge>
                    <CardTitle className="text-lg">Tech Scale-Up "DataFlow"</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4"><strong>Challenge:</strong> rapid growth required 3 new senior hires ($400k/yr) before revenue caught up. Traditional banks saw "negative cash flow" and said no.</p>
                    <div className="bg-gray-50 p-3 rounded text-sm">
                      <strong>Solution:</strong> SWI Advisor structured a $500k operating line based on <em>recurring revenue contracts</em> rather than historical EBITDA, bridging the cash gap.
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2">
                    <Badge className="w-fit mb-2 bg-green-100 text-green-800 hover:bg-green-200">Acquisition</Badge>
                    <CardTitle className="text-lg">Retailer "GreenHome"</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4"><strong>Challenge:</strong> Founder wanted to buy her competitor using vendor take-back financing but needed $200k for down payment.</p>
                    <div className="bg-gray-50 p-3 rounded text-sm">
                      <strong>Solution:</strong> SWI Advisor used the <span className="font-semibold">CSBFP program</span> (government guarantee) stacked with a term loan to secure the real estate, freeing up cash for the acquisition.
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section id="education" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Business Education Programming</h2>
              <p className="text-gray-700 mb-6">The education pillar provides structured learning opportunities addressing the capabilities women entrepreneurs identify as most valuable for business growth. Programming partnerships with business schools and entrepreneurship organizations bring credible, research-based content to participants. Topics range from financial management fundamentals through advanced strategy, leadership development, and specific functional skills like marketing and operations management.</p>
              <p className="text-gray-700 mb-6">Content delivery formats accommodate diverse learning preferences and schedule constraints. In-person workshops provide intensive skill building with direct instructor interaction and peer networking. Virtual programming enables participation regardless of geographic location or travel constraints. Self-paced online modules allow learning on individual schedules. Combinations of formats enable customized learning paths matching individual needs and availability.</p>
              <p className="text-gray-700 mb-6">Educational partnerships extend program reach and credibility. Collaborations with Rotman School of Management, Ivey Business School, and other leading institutions bring academic rigor to practical business content. Partnerships with organizations like the Forum for Women Entrepreneurs provide access to established entrepreneurship education programming. International partners enable learning opportunities for women entrepreneurs expanding into new markets.</p>
              <p className="text-gray-700 mb-6">Program participants can access education content at no additional cost beyond their banking relationship. This includes workshops, webinars, online courses, and networking events organized through the initiative. Some partner programs may have separate fees, but the core Scotiabank Women Initiative education offerings are included as program benefits. Participants receive information about upcoming programming through their advisor relationships and program communications.</p>
            </div>
          </div>
        </section>

        <section id="community" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Community and Networking</h2>
              <p className="text-gray-700 mb-6">The community pillar recognizes that networks significantly impact business success, and women entrepreneurs often lack access to the informal networks that support male-dominated industries. The initiative creates structured networking opportunities connecting women business owners across industries, stages, and geographies. These connections provide peer support, potential business partnerships, and mentorship relationships that accelerate business development.</p>
              <p className="text-gray-700 mb-6">Networking events occur at regional and national levels throughout the year. Regional events gather women entrepreneurs in specific markets for relationship building and local resource sharing. National events bring together participants from across Canada for broader perspective sharing and cross-regional connection building. Virtual networking options extend connection opportunities beyond in-person event attendance.</p>
              <p className="text-gray-700 mb-6">The community includes successful women business owners who provide mentorship and role modeling for earlier-stage entrepreneurs. Formal mentorship matching connects experienced business owners with those seeking guidance. Speaking opportunities at program events elevate profiles of successful participants. Recognition programs celebrate achievements of women entrepreneurs within the community, providing inspiration and visibility.</p>
              <p className="text-gray-700 mb-6">Building genuine relationships within the community delivers value that extends far beyond individual transactions. Women entrepreneurs who actively participate report gaining clients, suppliers, strategic partners, and employees through initiative connections. The shared experience of navigating business ownership challenges creates authentic bonds that facilitate frank conversation and mutual support. Long-term relationships forged through the program often become the most valuable aspect for sustained participants. Community members support each other through business challenges, celebrate successes together, and create informal referral networks that generate ongoing business opportunities for participants throughout their entrepreneurial journeys.</p>
              <p className="text-gray-700 mb-6">The networking infrastructure includes both formal and informal components designed to maximize connection opportunities. Formal events follow structured formats with facilitated introductions, topical discussions, and dedicated networking time. Informal gatherings provide more relaxed settings for relationship deepening. Online community platforms enable ongoing communication between events. Special interest groups form around specific industries, business stages, or geographic regions, creating focused networking within the broader community.</p>
            </div>
          </div>
        </section>

        <section id="global" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Global Expansion Support</h2>
              <p className="text-gray-700 mb-6">Scotiabank&apos;s international presence enables unique expansion support for women entrepreneurs seeking to grow beyond Canadian borders. The bank operates extensively across Latin America, the Caribbean, and other international markets where program participants may have expansion opportunities. Local Scotiabank teams in target markets can provide market intelligence, banking services, and connection to local business resources.</p>
              <p className="text-gray-700 mb-6">Trade financing products support international business operations including foreign exchange management, trade credit insurance, and documentary credit services. Women entrepreneurs entering export markets can access trade advisory services helping navigate international payment terms, currency risks, and trade compliance requirements. Connections to trade promotion organizations and government export programs complement Scotiabank&apos;s direct international services.</p>
              <p className="text-gray-700 mb-6">International networking extends community benefits across borders. Connections to women entrepreneur networks in other Scotiabank markets provide market entry support and partnership opportunities. International programming shares best practices and innovations from women entrepreneurs globally. Travel for business purposes can connect participants with local program resources in Scotiabank international markets.</p>
              <p className="text-gray-700 mb-6">The international dimension particularly benefits businesses in sectors where cross-border trade represents significant growth opportunities. Technology companies can leverage Scotiabank connections in emerging markets where digital adoption creates new customer bases. Manufacturing businesses can explore supply chain relationships with international partners. Service businesses can identify licensing or franchise opportunities in markets where the bank maintains strong presence. The combination of banking infrastructure, trade services, and relationship networks creates comprehensive support for international growth ambitions that distinguish this program from purely domestic alternatives.</p>
            </div>
          </div>
        </section>

        <section id="eligibility" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Eligibility Requirements</h2>
              <p className="text-gray-700 mb-6">The Scotiabank Women Initiative serves women who own or lead businesses in Canada. Program participation does not require majority ownership but does require meaningful ownership stake or leadership role. Women executives in businesses owned by others can access program resources including education and networking even without ownership positions. The inclusive definition ensures that women in various business roles can benefit from initiative resources.</p>
              <p className="text-gray-700 mb-6">Industry eligibility extends across all sectors with no restrictions based on business type or field. Retail businesses, professional service firms, manufacturing operations, technology startups, and every other category can participate. Business size does not limit eligibility as both sole proprietors and firms with hundreds of employees can access appropriate resources. Geographic eligibility extends throughout Canada wherever Scotiabank maintains branch presence serving small business customers. The broad eligibility framework reflects the initiative commitment to supporting women in business regardless of their specific circumstances or business characteristics.</p>
              <div className="grid md:grid-cols-2 gap-6">
                <Card><CardHeader><CardTitle className="text-green-700 flex items-center"><CheckCircle className="w-5 h-5 mr-2" />Eligible Participants</CardTitle></CardHeader><CardContent><ul className="space-y-1 text-sm"><li>Women business owners with any ownership percentage</li><li>Women executives and leaders in business roles</li><li>Startups and established businesses at all stages</li><li>Any industry or business type</li><li>Canadian businesses or Canadian operations</li></ul></CardContent></Card>
                <Card><CardHeader><CardTitle className="text-blue-700 flex items-center"><Building className="w-5 h-5 mr-2" />Getting Started</CardTitle></CardHeader><CardContent><ul className="space-y-1 text-sm"><li>Contact Scotiabank small business banking</li><li>Request connection to Women Initiative advisor</li><li>Complete intake process to identify needs</li><li>Begin accessing relevant program resources</li><li>Participate in education and networking</li></ul></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        <section id="getting-started" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Getting Started with the Initiative</h2>
              <div className="space-y-4">
                <div className="flex items-start p-4 bg-gray-50 rounded-lg border"><div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">1</div><div><h3 className="font-bold">Initial Contact</h3><p className="text-gray-600 text-sm">Connect with Scotiabank small business banking through branch visit, phone, or online contact. Request information about the Women Initiative and connection to a program advisor. Existing customers can request transfer to program-specialized advisors.</p></div></div>
                <div className="flex items-start p-4 bg-gray-50 rounded-lg border"><div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">2</div><div><h3 className="font-bold">Needs Assessment</h3><p className="text-gray-600 text-sm">Work with your advisor to assess current business situation and identify priority needs. Discuss financing requirements, capability gaps, and growth objectives. Develop a plan for engaging with relevant program resources.</p></div></div>
                <div className="flex items-start p-4 bg-gray-50 rounded-lg border"><div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">3</div><div><h3 className="font-bold">Resource Access</h3><p className="text-gray-600 text-sm">Begin participating in education programming, networking events, and advisory relationships. Apply for financing as appropriate for business needs. Engage with community resources and peer connections.</p></div></div>
                <div className="flex items-start p-4 bg-gray-50 rounded-lg border"><div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">4</div><div><h3 className="font-bold">Ongoing Relationship</h3><p className="text-gray-600 text-sm">Maintain regular contact with program advisor as business evolves. Access additional resources as needs change. Participate in community building by sharing experiences and supporting other women entrepreneurs.</p></div></div>
              </div>
            </div>
          </div>
        </section>

        <section id="comparison" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Compare Your Funding Options</h2>
              <p className="text-gray-700 mb-8 text-center max-w-3xl mx-auto">
                The Scotiabank Women Initiative is excellent, but it's not the only game in town. Here is how it stacks up against other funding sources for women entrepreneurs.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full bg-white shadow-sm rounded-lg overflow-hidden">
                  <thead className="bg-gray-900 text-white">
                    <tr>
                      <th className="p-4 text-left">Funding Source</th>
                      <th className="p-4 text-left">Best For...</th>
                      <th className="p-4 text-left">Pros</th>
                      <th className="p-4 text-left">Cons</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="p-4 font-bold text-red-700">Scotiabank Women Initiative</td>
                      <td className="p-4">Established businesses needing operating capital, commercial real estate, or expansion loans.</td>
                      <td className="p-4"><ul className="list-disc list-inside text-sm text-green-700"><li>Dedicated advisor support</li><li>Market interest rates</li><li>Relationship building</li></ul></td>
                      <td className="p-4 text-sm text-gray-600">Strictly debt financing (must be repaid); requires collateral/cash flow coverage.</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-4 font-bold text-blue-700">BDC Woman Entrepreneur Loan</td>
                      <td className="p-4">Startups or scale-ups who lack tangible collateral (assets) for traditional bank loans.</td>
                      <td className="p-4"><ul className="list-disc list-inside text-sm text-green-700"><li>Flexible repayment terms</li><li>Higher risk tolerance</li><li>Online application</li></ul></td>
                      <td className="p-4 text-sm text-gray-600">Interest rates are typically higher than Scotiabank (Base + Variance).</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-4 font-bold text-purple-700">Women Entrepreneurship Strategy (WES)</td>
                      <td className="p-4">Specific projects (digital adoption, export) aligned with government priorities.</td>
                      <td className="p-4"><ul className="list-disc list-inside text-sm text-green-700"><li>Non-repayable grants</li><li>Access to ecosystem partners</li></ul></td>
                      <td className="p-4 text-sm text-gray-600">Highly competitive; specific application windows; strict reporting requirements.</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-4 font-bold text-teal-700">StartUp Canada / Parsa Trust</td>
                      <td className="p-4">Early-stage social enterprises or micro-businesses.</td>
                      <td className="p-4"><ul className="list-disc list-inside text-sm text-green-700"><li>Micro-grants ($5k-$10k)</li><li>Community focus</li></ul></td>
                      <td className="p-4 text-sm text-gray-600">Small amounts; minimal impact for large scale-ups.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-8 p-6 bg-yellow-50 rounded-lg border border-yellow-200">
                <h3 className="font-bold text-yellow-800 flex items-center mb-2">
                  <Target className="w-5 h-5 mr-2" /> Expert Recommendation
                </h3>
                <p className="text-yellow-900 text-sm">
                  Most successful women entrepreneurs <strong>stack</strong> these. They use a massive Scotiabank operating line for daily cash flow, a BDC loan for equipment financing (longer amortization), and apply for WES grants for special projects like "going digital."
                </p>
              </div>

            </div>
          </div>
        </section>

        <section id="tips" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Maximizing Program Benefits</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div><h3 className="font-bold mb-3 text-green-700">Best Practices</h3><ul className="space-y-2 text-sm"><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Establish regular advisor contact beyond financing transactions</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Participate actively in education programming and events</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Build genuine connections at networking opportunities</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Combine with government grants and other programs</span></li></ul></div>
                <div><h3 className="font-bold mb-3 text-purple-700">Pro Tips</h3><ul className="space-y-2 text-sm"><li className="flex items-start"><Target className="w-4 h-4 text-purple-500 mr-2 mt-0.5" /><span>Request specific advisor training background information</span></li><li className="flex items-start"><Target className="w-4 h-4 text-purple-500 mr-2 mt-0.5" /><span>Ask about partner education programming availability</span></li><li className="flex items-start"><Target className="w-4 h-4 text-purple-500 mr-2 mt-0.5" /><span>Explore international expansion resources if relevant</span></li></ul></div>
              </div>
            </div>
          </div>
        </section>

        <section id="faqs" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqData.map((faq, index) => (
                  <Accordion type="single" collapsible key={index}>
                    <AccordionItem value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        <span className="font-medium text-blue-900">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Related Guides</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/blog/women-entrepreneurship-strategy-canada" className="flex items-center p-4 bg-gray-50 rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-blue-600 mr-3" /><span>Women Entrepreneurship Strategy</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/blog/bdc-women-entrepreneurs-financing" className="flex items-center p-4 bg-gray-50 rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-blue-600 mr-3" /><span>BDC Women Financing</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/blog/bmo-celebrating-women-grant" className="flex items-center p-4 bg-gray-50 rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-blue-600 mr-3" /><span>BMO Celebrating Women Grant</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/canada/women-business-grants" className="flex items-center p-4 bg-gray-50 rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-blue-600 mr-3" /><span>All Women Business Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-r from-red-600 to-red-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-6">Connect with the Scotiabank Women Initiative</h2>
              <p className="text-xl text-red-100 mb-8">Access three billion dollars in committed capital, specialized advisory services, business education, and a powerful network of successful women entrepreneurs. Start your journey with Canada&apos;s leading bank-sponsored women entrepreneur program.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild><Link href="/contact?program=scotiabank-women"><Users className="w-4 h-4 mr-2" /> Get Connected</Link></Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild><Link href="/canada/women-business-grants">Explore All Programs</Link></Button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
