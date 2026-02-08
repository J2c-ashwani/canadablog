import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, FileText, DollarSign, Target, AlertCircle, Download, Building, Users, Heart, Award, TrendingUp, HelpCircle, ArrowRight, Lightbulb } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Women Entrepreneurship Strategy 2025 | $100K Grants & Loans",
  description:
    "Complete guide to Canada's Women Entrepreneurship Strategy (WES). Apply for the $100K Entrepreneurship Fund, $50K microloans, and BDC Women in Tech capital.",
  keywords:
    "women entrepreneurship strategy, WES funding, female business grants Canada, women entrepreneur loan, women in tech fund, WEF application",
  alternates: {
    canonical: "https://www.fsidigital.ca/guides/apply-women-entrepreneurship-strategy",
  },
  openGraph: {
    title: "Women Entrepreneurship Strategy 2025 | $100K Funding",
    description: "Step-by-step application guide for WES grants and loans for Canadian women entrepreneurs.",
    url: "https://www.fsidigital.ca/guides/apply-women-entrepreneurship-strategy",
    images: ["/og-image.png"],
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the Women Entrepreneurship Loan Fund?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It provides microloans of up to $50,000 to women entrepreneurs who may not qualify for traditional bank financing, distributed through partners like WEOC and NACCA."
      }
    },
    {
      "@type": "Question",
      "name": "How do I prove my business is women-owned?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You typically need to provide corporate documents showing that the business is at least 51% owned, managed, and controlled by one or more women."
      }
    },
    {
      "@type": "Question",
      "name": "Is the WES Ecosystem Fund a grant for my business?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. The Ecosystem Fund supports non-profit organizations that provide mentorship and training to women. It does not give cash directly to individual businesses."
      }
    },
    {
      "@type": "Question",
      "name": "Does BDC have a specific fund for women?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. The BDC Capital Women in Technology Venture Fund invests in women-led tech companies, and they also offer a $100k online loan specifically for women entrepreneurs."
      }
    }
  ]
}

export default function WESApplicationGuide() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-rose-600 to-pink-700 text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-rose-500/20 text-rose-100 border-rose-400/30 backdrop-blur-sm">
                👩‍💼 Women Entrepreneurship Strategy
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance tracking-tight">
                Women's Business Funding Guide
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-rose-100 leading-relaxed text-pretty">
                The complete handbook for the Women Entrepreneurship Strategy (WES).
                Secure $50k microloans, $100k ecosystem grants, and BDC capital.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-rose-700 hover:bg-rose-50 font-semibold shadow-lg" asChild>
                  <Link href="#programs">
                    View WES Programs
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-rose-800/30 border-rose-400/30 text-rose-100 hover:bg-rose-800/50 backdrop-blur-sm" asChild>
                  <Link href="/blog/women-entrepreneurship-canada-guide">
                    Success Tips
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* QUERY HOOK: Common Questions */}
        <div className="bg-white border-b border-rose-100 sticky top-0 z-20 shadow-sm/80 backdrop-blur-md bg-white/90">
          <div className="container mx-auto px-4 py-3">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-rose-900 gap-4">
              <span className="font-semibold text-rose-900 flex items-center shrink-0">
                <Heart className="w-4 h-4 mr-2 text-rose-600" />
                WES Focus:
              </span>
              <div className="flex gap-6 overflow-x-auto no-scrollbar whitespace-nowrap mask-linear-fade">
                <Link href="#programs" className="hover:text-rose-700 transition-colors flex items-center gap-1"><Target className="w-3 h-3" /> Top Funds</Link>
                <Link href="#loans" className="hover:text-rose-700 transition-colors flex items-center gap-1"><DollarSign className="w-3 h-3" /> Microloans</Link>
                <Link href="#ecosystem" className="hover:text-rose-700 transition-colors flex items-center gap-1"><Users className="w-3 h-3" /> Ecosystem</Link>
                <Link href="#process" className="hover:text-rose-700 transition-colors flex items-center gap-1"><Clock className="w-3 h-3" /> Timeline</Link>
                <Link href="#faq" className="hover:text-rose-700 transition-colors flex items-center gap-1"><HelpCircle className="w-3 h-3" /> FAQs</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <section className="py-12 bg-white border-b border-rose-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center divide-x divide-rose-50">
                <div className="p-4">
                  <div className="text-3xl font-bold text-rose-600 mb-2">$6B+</div>
                  <div className="text-rose-800 text-sm font-medium uppercase tracking-wide">Economic Impact by 2025</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-pink-600 mb-2">$50K</div>
                  <div className="text-rose-800 text-sm font-medium uppercase tracking-wide">WES Microloan Cap</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-purple-600 mb-2">51%</div>
                  <div className="text-rose-800 text-sm font-medium uppercase tracking-wide">Ownership Required</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-orange-600 mb-2">100+</div>
                  <div className="text-rose-800 text-sm font-medium uppercase tracking-wide">Partner Orgs</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Programs Section */}
        <section id="programs" className="py-20 bg-rose-50/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Top Funding for Women Entrepreneurs</h2>

              <div className="space-y-8">
                {/* Loan Fund */}
                <Card id="loans" className="border-l-4 border-l-rose-600 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <DollarSign className="w-8 h-8 text-rose-600" />
                        <CardTitle className="text-xl">Women Entrepreneurship Loan Fund</CardTitle>
                      </div>
                      <Badge variant="outline" className="border-rose-300 text-rose-700">Microloans</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      Designed for women entrepreneurs who struggle to get capital from big banks. Loaned via partners like WEOC, NACCA, and Coralus (SheEO).
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 bg-white border border-rose-100 p-4 rounded-lg text-sm">
                      <div>
                        <strong className="block text-rose-900 mb-2">The Offer:</strong>
                        <ul className="list-disc list-inside text-slate-600 space-y-1">
                          <li>Loans up to $50,000</li>
                          <li>Flexible repayment terms</li>
                          <li>Often bundled with mentorship</li>
                        </ul>
                      </div>
                      <div>
                        <strong className="block text-rose-900 mb-2">Providers:</strong>
                        <ul className="list-disc list-inside text-slate-600 space-y-1">
                          <li>Women's Enterprise Organizations of Canada</li>
                          <li>Northumberland CFDC</li>
                          <li>Coralus (formerly SheEO)</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Ecosystem Fund */}
                <Card id="ecosystem" className="border-l-4 border-l-purple-600 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Users className="w-8 h-8 text-purple-600" />
                        <CardTitle className="text-xl">WES Ecosystem Fund</CardTitle>
                      </div>
                      <Badge variant="outline" className="border-purple-300 text-purple-700">Non-Profit Partners</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      This fund gives money to non-profits to create programs for YOU. Look for "WES Funded" programs in your city.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge className="bg-purple-100 text-purple-800">Free Mentorship</Badge>
                      <Badge className="bg-purple-100 text-purple-800">Business Training</Badge>
                      <Badge className="bg-purple-100 text-purple-800">Networking Events</Badge>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 text-xs text-purple-800">
                      <strong>Pro Tip:</strong> You don't apply for this cash directly, you apply to *join the programs* funded by this cash.
                    </div>
                  </CardContent>
                </Card>

                {/* BDC Women in Tech */}
                <Card className="border-l-4 border-l-blue-600 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <TrendingUp className="w-8 h-8 text-blue-600" />
                        <CardTitle className="text-xl">BDC Women in Technology</CardTitle>
                      </div>
                      <Badge variant="outline" className="border-blue-300 text-blue-700">Venture Capital</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      For high-growth, women-led tech companies looking for equity investment or large scale-up capital.
                    </p>
                    <ul className="text-sm text-slate-600 list-disc list-inside space-y-1">
                      <li><strong>Venture Fund:</strong> Equity investment for scaling tech firms.</li>
                      <li><strong>Excellence Program:</strong> $100k online loan for smaller tech upgrades.</li>
                      <li><strong>Thrive Lab:</strong> $100M initiative for social impact ventures.</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Application Timeline */}
        <section id="process" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">WES Application Timeline</h2>
              <div className="relative border-l-2 border-slate-200 pl-8 space-y-12 ml-4 md:ml-0">

                {/* Step 1 */}
                <div className="relative">
                  <div className="absolute -left-[41px] bg-rose-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">1</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Certification & Ownership</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    Before applying, ensure your corporate minute book is updated. You must prove <strong>51% ownership and control</strong> by women.
                  </p>
                  <div className="bg-rose-50 p-4 rounded border border-rose-200">
                    <span className="text-xs font-mono text-rose-600 bg-rose-100 px-2 py-1 rounded">TIP</span>
                    <span className="text-sm text-rose-800 ml-2">Consider getting certified by WBE Canada or WEConnect International to unlock corporate supply chains too.</span>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative">
                  <div className="absolute -left-[41px] bg-rose-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">2</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Select Your WES Partner</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    For loans, do not go to the government directly. Go to a <strong>loan fund delivery partner</strong> (e.g., WEOC, Coralus) in your region.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="relative">
                  <div className="absolute -left-[41px] bg-rose-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">3</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Submit Business Plan</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    Your plan must show how the loan will generate revenue. WES loans are not "free money" – they must be repaid, so cash flow projections are critical.
                  </p>
                </div>

                {/* Step 4 */}
                <div className="relative">
                  <div className="absolute -left-[41px] bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">4</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Mentorship & Reporting</h3>
                  <p className="text-slate-600 text-sm">
                    Most WES loans come with mandatory mentorship circles. Embrace this—it's often more valuable than the cash itself.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Success Strategies */}
        <section className="py-16 bg-rose-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">WES Winning Strategies</h2>
              <div className="grid md:grid-cols-2 gap-8">

                <Card className="bg-white">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Target className="w-6 h-6 text-rose-600" />
                      <CardTitle className="text-lg">The "Control" Factor</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600">
                      Ownership isn't enough. You must show <strong>control</strong>. If a male partner has veto power over daily operations, you may be disqualified.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Building className="w-6 h-6 text-purple-600" />
                      <CardTitle className="text-lg">Leverage the Ecosystem</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600">
                      Don't just take the loan. Use the WES Ecosystem Fund partners for free marketing, export advice, and legal support.
                    </p>
                  </CardContent>
                </Card>

              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-left">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                <HelpCircle className="w-6 h-6 text-rose-600 mr-2" />
                WES FAQs
              </h2>
              <div className="divide-y divide-rose-100">
                <div className="py-4">
                  <h3 className="font-bold text-slate-900 mb-2">Is the $100k fund a grant?</h3>
                  <p className="text-slate-600 text-sm">Usually no. The main WES instrument for individual businesses is a <strong>loan</strong>. Grants are typically reserved for the non-profits *supporting* the ecosystem.</p>
                </div>
                <div className="py-4">
                  <h3 className="font-bold text-slate-900 mb-2">Can sole proprietors apply?</h3>
                  <p className="text-slate-600 text-sm">Yes, many WES loan partners (like Community Futures) accept sole participators, but verified incorporation is preferred for larger BDC funds.</p>
                </div>
                <div className="py-4">
                  <h3 className="font-bold text-slate-900 mb-2">What if I have bad credit?</h3>
                  <p className="text-slate-600 text-sm">The Women Entrepreneurship Loan Fund is specifically designed to be more inclusive than banks. They look at your character and business plan, not just your credit score.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Common Questions Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Common Questions About WES Funding</h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">1. Is the $100,000 fund a grant?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Usually no. The main WES instrument for individual businesses (like the Women Entrepreneurship Loan Fund) offers <strong>loans</strong>. Grants are typically reserved for the non-profit organizations that <em>support</em> the ecosystem (e.g., mentorship programs), not direct cash to businesses.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">2. Do I need 100% women ownership?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Most programs require <strong>51% ownership and control</strong> by women. This is the standard for WBE certification. Some BDC programs may be more flexible if there is a woman in a C-suite leadership role.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">3. Can startups apply?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Yes. The <a href="https://weoc.ca/loan-fund/" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:underline">WEOC National Loan Program</a> accepts startups, provided you have a solid business plan. Traditional banks often reject startups, which is why this fund exists.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">4. What is the interest rate?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    It varies by partner, but WES loans are typically commercial loans (Prime + variance). They are not interest-free, but they often have more lenient collateral requirements than banks.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">5. How do I get certified?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    You can get certified as a "Women-Owned Business" through organizations like <a href="https://wbecanada.ca/" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:underline">WBE Canada</a> or WEConnect International. This opens doors to corporate supply chains (supplier diversity) but is not strictly required for the government loan.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">6. Can I use the money for salary?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Working capital loans (like the WES loan) can usually be used for operating costs, including salary, rent, and inventory.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Neural Network: Related Guides */}
        <section className="py-16 bg-slate-50 border-t border-slate-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Related Funding Pathways</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <Link href="/guides/apply-small-business-grants" className="group block h-full">
                  <div className="bg-white border hover:border-blue-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-blue-600 font-semibold mb-2">General</div>
                    <h4 className="font-bold text-slate-900 group-hover:text-blue-700 mb-2">Small Business Grants</h4>
                    <p className="text-sm text-slate-500 flex-grow">Broader grants open to all entrepreneurs.</p>
                    <div className="mt-3 text-xs text-blue-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
                <Link href="/guides/apply-startup-grants" className="group block h-full">
                  <div className="bg-white border hover:border-purple-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-purple-600 font-semibold mb-2">Startups</div>
                    <h4 className="font-bold text-slate-900 group-hover:text-purple-700 mb-2">Startup Grants</h4>
                    <p className="text-sm text-slate-500 flex-grow">Funding for new, high-growth ventures.</p>
                    <div className="mt-3 text-xs text-purple-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
                <Link href="/guides/apply-indigenous-rural-business-funding" className="group block h-full">
                  <div className="bg-white border hover:border-orange-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-orange-600 font-semibold mb-2">Specialized</div>
                    <h4 className="font-bold text-slate-900 group-hover:text-orange-700 mb-2">Indigenous & Rural</h4>
                    <p className="text-sm text-slate-500 flex-grow">Specific streams for diverse founders.</p>
                    <div className="mt-3 text-xs text-orange-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-rose-900 to-pink-900 text-white text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Empowering Women Entrepreneurs</h2>
            <p className="text-lg text-rose-100 mb-8 max-w-2xl mx-auto">
              We help you prepare the documentation to prove your eligibility and secure the capital you deserve.
            </p>
            <Button size="lg" className="bg-white text-rose-900 hover:bg-rose-50 font-semibold shadow-lg" asChild>
              <Link href="/contact?service=wes-expert-help">
                Get WES Application Help
              </Link>
            </Button>
          </div>
        </section>

      </div>
      <Footer />
    </>
  )
}
