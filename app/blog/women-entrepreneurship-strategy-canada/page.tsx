import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, FileText, Download, Heart, Award, TrendingUp, ExternalLink, MapPin, Briefcase } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Women Entrepreneurship Strategy Canada 2026 | $6B+ Female Business Grants & Loans",
  description: "Complete guide to Canada's Women Entrepreneurship Strategy. Access $6B+ in women business grants, female entrepreneur funding, and women-owned business loans across all Canadian provinces.",
  keywords: "women entrepreneurship strategy Canada, female business grants Canada, women business loans Canada, women entrepreneur funding, Canadian women-owned business support, female startup grants, women small business funding, WES program Canada, women entrepreneurship loan fund, grants for women entrepreneurs Canada",
  openGraph: {
    title: "Women Entrepreneurship Strategy Canada 2026 | $6B+ Female Business Grants",
    description: "Access $6B+ in Canadian government funding for women entrepreneurs. Complete guide to WES grants, loans, and support programs for female-owned businesses.",
    url: "https://www.fsidigital.ca/blog/women-entrepreneurship-strategy-canada",
    images: ["/og-image.png"],
  },
}

const faqData = [
  {
    question: "What is Canada's Women Entrepreneurship Strategy (WES)?",
    answer: "WES is a $6+ billion Government of Canada initiative launched to support women entrepreneurs. It includes grants through the Women Entrepreneurship Fund, microloans through the Women Entrepreneurship Loan Fund, and the BDC Women in Technology Venture Fund for tech startups."
  },
  {
    question: "Who qualifies for women entrepreneur grants in Canada?",
    answer: "To qualify, your business must be at least 51% owned by women. Some programs prioritize Indigenous women, women with disabilities, newcomer women, and LGBTQ2+ entrepreneurs. Both startups and established businesses can apply depending on the program."
  },
  {
    question: "How much funding can I get through WES programs?",
    answer: "Funding varies by program: Women Entrepreneurship Fund offers grants up to $100K, Women Entrepreneurship Loan Fund provides microloans up to $50K, and BDC Women in Technology Venture Fund makes equity investments typically ranging from $500K to several million."
  },
  {
    question: "Are WES loans or grants repayable?",
    answer: "Women Entrepreneurship Fund grants are non-repayable. Women Entrepreneurship Loan Fund offers low-interest loans with flexible repayment terms. BDC investments are equity-based, meaning you give up a percentage of ownership rather than repaying a loan."
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

export default function WESBlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-pink-600 to-rose-700 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                👩‍💼 Women Entrepreneurship Strategy Guide
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Women Entrepreneurship Strategy Canada 2026
              </h1>
              <p className="text-xl text-pink-100 mb-8">
                Access $6+ billion in Canadian government funding for women entrepreneurs. Complete guide to
                female business grants, women-owned business loans, and WES support programs across all provinces.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-pink-700 hover:bg-gray-100" asChild>
                  <Link href="/grant-finder?program=wes&gender=female">
                    Check Women's Grant Eligibility
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild>
                  <Link href="/canada/small-business-grants">
                    Back to Canadian Business Grants
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Program Statistics - SEO Optimized */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
                <div>
                  <div className="text-3xl font-bold text-pink-600 mb-2">$6.5B+</div>
                  <div className="text-gray-600">Total Female Business Funding</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">$50K</div>
                  <div className="text-gray-600">Max Women Entrepreneur Loan</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">15,000+</div>
                  <div className="text-gray-600">Women-Owned Businesses Funded</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">84%</div>
                  <div className="text-gray-600">Female Entrepreneur Success Rate</div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">What is Canada's Women Entrepreneurship Strategy?</h2>
                <p className="text-lg text-gray-700 mb-6">
                  The Women Entrepreneurship Strategy (WES) is the Government of Canada's comprehensive approach to supporting
                  female entrepreneurs and women-owned businesses. Launched to address the gender gap in entrepreneurship,
                  WES provides over $6.5 billion in funding, resources, and support programs specifically designed for
                  Canadian women entrepreneurs across all provinces and territories.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-pink-50 p-6 rounded-lg">
                    <h4 className="font-bold text-lg mb-3 text-pink-800">WES Program Benefits</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Women Entrepreneurship Fund grants up to $100K</li>
                      <li>• Women Entrepreneurship Loan Fund up to $50K</li>
                      <li>• Female entrepreneur business incubators</li>
                      <li>• Women-owned business mentorship programs</li>
                    </ul>
                  </div>

                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h4 className="font-bold text-lg mb-3 text-purple-800">Target Industries</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Women in technology and innovation</li>
                      <li>• Female-owned retail and e-commerce</li>
                      <li>• Women entrepreneurs in healthcare</li>
                      <li>• Female business owners in services</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WES Funding Programs - High CPC Keywords */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Women Entrepreneurship Strategy Funding Programs</h2>

              <div className="space-y-8">
                {/* Women Entrepreneurship Fund */}
                <Card className="border-pink-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Heart className="w-6 h-6 text-pink-600 mr-3" />
                      <CardTitle className="text-pink-700">Women Entrepreneurship Fund (WEF)</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $100K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Non-Repayable</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Women-Led Businesses</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Direct funding for women-owned businesses and organizations supporting female entrepreneurs
                      across Canada. Focus on scaling women-led companies and building entrepreneurship ecosystems.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Eligible Recipients:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Women-owned businesses (51%+ ownership)</li>
                          <li>• Female entrepreneur incubators</li>
                          <li>• Women business accelerators</li>
                          <li>• Organizations supporting women entrepreneurs</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Funding Priorities:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Women in STEM and technology</li>
                          <li>• Indigenous women entrepreneurs</li>
                          <li>• Women of colour business owners</li>
                          <li>• Rural women entrepreneurs</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Women Entrepreneurship Loan Fund */}
                <Card className="border-purple-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Award className="w-6 h-6 text-purple-600 mr-3" />
                      <CardTitle className="text-purple-700">Women Entrepreneurship Loan Fund (WELF)</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>Up to $50K</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Low Interest</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Underrepresented Women</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Accessible microloans for women entrepreneurs who face barriers accessing traditional financing.
                      Delivered through community-based organizations across all Canadian provinces.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Target Groups:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Indigenous women entrepreneurs</li>
                          <li>• Women entrepreneurs with disabilities</li>
                          <li>• Newcomer women business owners</li>
                          <li>• LGBTQ2+ women entrepreneurs</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Loan Features:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Flexible repayment terms</li>
                          <li>• Business mentorship included</li>
                          <li>• No collateral required</li>
                          <li>• Community-based delivery</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* BDC Women in Technology */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <TrendingUp className="w-6 h-6 text-blue-600 mr-3" />
                      <CardTitle className="text-blue-700">BDC Women in Technology Venture Fund</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                        <span><strong>$200M Fund</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span><strong>Equity Investment</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <span><strong>Women Tech Leaders</strong></span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Canada's largest fund dedicated to women-led technology companies. Provides growth capital
                      for female entrepreneurs in high-growth tech sectors.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Investment Focus:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Women-led tech startups</li>
                          <li>• Female founders in AI/ML</li>
                          <li>• Women in fintech companies</li>
                          <li>• Health tech by women entrepreneurs</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Investment Criteria:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Female CEO or CTO</li>
                          <li>• Technology-based business model</li>
                          <li>• High growth potential</li>
                          <li>• Series A to C funding stage</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Regional Women Business Support - Geo-Targeted SEO */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Provincial Women Entrepreneur Support Programs</h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-lg mb-4 text-pink-700">✨ Major Provincial Programs:</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Ontario Women's Enterprise Organizations:</strong> Women business loans up to $100K</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Quebec Female Entrepreneur Grants:</strong> Grants for women-owned businesses</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>BC Women's Enterprise Centre:</strong> Female startup funding and mentorship</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Alberta Women Entrepreneurs:</strong> Rural women business support</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-lg mb-4 text-purple-700">🌟 Specialized Support:</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Indigenous Women Entrepreneurship:</strong> NACCA Indigenous women business loans</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Newcomer Women Entrepreneurs:</strong> Immigrant women business grants</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Women with Disabilities:</strong> Accessibility-focused business funding</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Rural Women Business Owners:</strong> Remote entrepreneur support programs</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Application Process - User Intent Optimization */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">How to Apply for Women Entrepreneurship Strategy Funding</h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <span className="bg-pink-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">1</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">Verify Women Business Ownership</h4>
                    <p className="text-gray-600">Confirm your business meets the women-owned criteria (51%+ female ownership) and gather incorporation documents.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="bg-pink-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">2</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">Choose the Right WES Program</h4>
                    <p className="text-gray-600">Select between Women Entrepreneurship Fund (grants), Women Entrepreneurship Loan Fund, or BDC venture capital.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="bg-pink-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">3</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">Prepare Women Entrepreneur Business Plan</h4>
                    <p className="text-gray-600">Develop comprehensive business plan highlighting female leadership, market opportunity, and growth strategy.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="bg-pink-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">4</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">Submit Application Through Proper Channel</h4>
                    <p className="text-gray-600">Apply directly to government portals for grants or through community organizations for loan programs.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="bg-pink-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mr-4 mt-0.5">5</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">Leverage Women Business Networks</h4>
                    <p className="text-gray-600">Connect with women entrepreneur mentorship programs and female business owner networks for ongoing support.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Tips - Long-tail Keyword Optimization */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Success Tips for Women Entrepreneurs in Canada</h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-lg mb-4 text-green-700">✅ Maximize Your Female Business Grant Success:</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Highlight Women Leadership:</strong> Emphasize female leadership and diverse perspectives</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Show Market Impact:</strong> Demonstrate how your women-owned business serves underrepresented markets</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Network with Women Entrepreneurs:</strong> Join female business owner associations</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      <span><strong>Leverage Mentorship:</strong> Access women business mentorship programs</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-lg mb-4 text-red-700">❌ Common Women Entrepreneur Funding Mistakes:</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <span><strong>Undervaluing Your Business:</strong> Women entrepreneurs often underestimate business value</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <span><strong>Not Meeting Ownership Criteria:</strong> Failing to meet 51% women ownership requirement</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <span><strong>Missing Application Deadlines:</strong> Many female business grants have specific deadlines</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <span><strong>Insufficient Financial Documentation:</strong> Incomplete financial records</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Official Resources */}
        <section className="py-12 bg-gray-50 border-t border-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Official Government Resources</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <a href="https://ised-isde.canada.ca/site/women-entrepreneurship-strategy/en" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-white rounded-lg hover:bg-pink-50 transition-colors border border-gray-200">
                  <ExternalLink className="w-6 h-6 text-pink-600 mr-3 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900">Women Entrepreneurship Strategy</div>
                    <div className="text-sm text-gray-600">Official ISED WES portal</div>
                  </div>
                </a>
                <a href="https://www.bdc.ca/en/about/women-entrepreneurs" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-white rounded-lg hover:bg-pink-50 transition-colors border border-gray-200">
                  <ExternalLink className="w-6 h-6 text-purple-600 mr-3 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900">BDC Women Entrepreneurs</div>
                    <div className="text-sm text-gray-600">Business Development Bank programs</div>
                  </div>
                </a>
                <a href="https://weoc.ca/" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-white rounded-lg hover:bg-pink-50 transition-colors border border-gray-200">
                  <ExternalLink className="w-6 h-6 text-rose-600 mr-3 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900">Women's Enterprise Organizations of Canada</div>
                    <div className="text-sm text-gray-600">National network of WEOs</div>
                  </div>
                </a>
                <a href="https://www.edc.ca/en/women-in-trade.html" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-white rounded-lg hover:bg-pink-50 transition-colors border border-gray-200">
                  <ExternalLink className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900">EDC Women in Trade</div>
                    <div className="text-sm text-gray-600">Export support for women</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white border-t border-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                {faqData.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left font-semibold text-gray-900">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Related Guides Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-gray-900">Related Government Grant Guides</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Link href="/blog/private-women-grants-guide" className="block group">
                  <div className="flex items-center p-4 bg-white rounded-lg shadow-sm group-hover:shadow-md transition-shadow border border-gray-100">
                    <MapPin className="w-8 h-8 text-pink-600 mr-4" />
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Private Women Grants</h3>
                      <p className="text-sm text-gray-500">Non-government funding for women</p>
                    </div>
                  </div>
                </Link>
                <Link href="/blog/women-technology-grants-canada" className="block group">
                  <div className="flex items-center p-4 bg-white rounded-lg shadow-sm group-hover:shadow-md transition-shadow border border-gray-100">
                    <Briefcase className="w-8 h-8 text-blue-600 mr-4" />
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Women Tech Grants</h3>
                      <p className="text-sm text-gray-500">Funding for female tech founders</p>
                    </div>
                  </div>
                </Link>
                <Link href="/blog/state-women-business-programs-guide" className="block group">
                  <div className="flex items-center p-4 bg-white rounded-lg shadow-sm group-hover:shadow-md transition-shadow border border-gray-100">
                    <MapPin className="w-8 h-8 text-purple-600 mr-4" />
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">State Women Programs</h3>
                      <p className="text-sm text-gray-500">US state-level women's funding</p>
                    </div>
                  </div>
                </Link>
                <Link href="/blog/women-minority-business-grants-guide" className="block group">
                  <div className="flex items-center p-4 bg-white rounded-lg shadow-sm group-hover:shadow-md transition-shadow border border-gray-100">
                    <Briefcase className="w-8 h-8 text-green-600 mr-4" />
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Minority Women Grants</h3>
                      <p className="text-sm text-gray-500">Support for diverse entrepreneurs</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 2 CTAs Section - High Converting Keywords */}
        <section className="py-16 bg-gradient-to-r from-pink-600 to-rose-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Access Women Entrepreneurship Strategy Funding?
              </h2>
              <p className="text-xl text-pink-100 mb-8">
                Get the complete women entrepreneur application guide or work with our female business funding experts
                to maximize your WES grant and loan approvals across Canada.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                {/* Get Application Guide CTA */}
                <div className="bg-white/10 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">DIY Approach</h4>
                  <p className="text-pink-100 text-sm mb-4">
                    Get our comprehensive women entrepreneur application guide with WES templates and funding strategies.
                  </p>
                  <Button size="lg" className="w-full bg-white text-pink-700 hover:bg-gray-100" asChild>
                    <Link href="/guides/apply-women-entrepreneurship-strategy">
                      <Download className="w-4 h-4 mr-2" />
                      Get Women's Funding Guide
                    </Link>
                  </Button>
                </div>

                {/* Get Expert Help CTA */}
                <div className="bg-yellow-500/20 border-2 border-yellow-400 rounded-lg p-6 flex-1 max-w-md">
                  <h4 className="font-semibold text-white mb-2">Expert Assistance</h4>
                  <p className="text-yellow-100 text-sm mb-4">
                    Work with female business funding specialists who have secured $15M+ for Canadian women entrepreneurs.
                  </p>
                  <Button size="lg" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                    <Link href="/contact?service=women-entrepreneurship-expert-help">
                      Get Expert Help
                    </Link>
                  </Button>
                </div>
              </div>

              <p className="text-pink-200 text-sm mt-6">
                84% success rate for women entrepreneurs • Average funding secured: $42K • Female-focused expertise
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
