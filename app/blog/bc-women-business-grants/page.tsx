import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, DollarSign, Target, Mountain, Users, Zap, Shield, Award, HelpCircle, ExternalLink, ArrowRight, AlertTriangle, Lightbulb, Flower2, Briefcase } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "BC Women Business Grants 2026 | WeBC Loans & Funding Guide",
  description: "Complete 2026 guide to funding for women entrepreneurs in British Columbia. Get loans up to $150k from WeBC, access Indigenous women's grants, and find BC tech funding.",
  keywords: "BC women business grants, WeBC loans, women enterprise centre BC, indigenous women grants BC, women in tech BC funding",
}

export default function BCWomenBusinessGrants() {
  const faqData = [
    {
      question: "Is WeBC a government agency?",
      answer: "WeBC (formerly Women's Enterprise Centre) is a non-profit funded by Pacifican (Government). They act as a specialized lender. They are 'arms-length' but distribute government capital."
    },
    {
      question: "What is the maximum loan amount from WeBC?",
      answer: "WeBC offers loans up to $150,000 directly. However, they can partner with BDC to offer a bundled loan of up to $250,000+ for larger projects."
    },
    {
      question: "Do I need a business plan for WeBC?",
      answer: "Yes, absolutely. Unlike some rapid fintech lenders, WeBC requires a solid business plan and cash flow projections. They provide free templates and advisors to help you write it."
    },
    {
      question: "Are there grants for Indigenous women in BC?",
      answer: "Yes! The Indigenous Women's Entrepreneur Program (IWEP) and various offerings from the First Nations Technology Council often provide grants or fully subsidized training."
    },
    {
      question: "Can I get funding for a tech startup?",
      answer: "Yes. In addition to WeBC, check out 'Women in Tech' grants via Innovate BC. Also, the 'Discovery Foundation' often sponsors programs specifically for women founders in tech."
    },
    {
      question: "What if I have bad credit?",
      answer: "WeBC is a 'character-based' lender. They look at your whole story, not just your FICO score. If your credit is damaged due to life events (divorce, illness), they are more understanding than a bank, provided you have a repayment plan."
    },
    {
      question: "Is mentorship required?",
      answer: "It is often a condition of the loan. WeBC assigns you a business advisor for the term of the loan. This is actually a huge benefit, as you get free consulting worth thousands."
    },
    {
      question: "Does BC have a 'Mompreneur' grant?",
      answer: "Not officially named that. However, WeBC's lending criteria are flexible regarding part-time status, recognizing that many women balance caregiving with entrepreneurship."
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
        <section className="bg-gradient-to-br from-teal-900 to-emerald-900 text-white py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-teal-500/20 text-teal-100 border-teal-400/30 px-4 py-1.5 text-sm uppercase tracking-wide">
                🏔️ BC Women's Economy
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                BC Women's Funding: <span className="text-teal-400">Powering the West Coast</span>
              </h1>
              <p className="text-xl text-teal-100 mb-10 leading-relaxed max-w-3xl mx-auto">
                British Columbia has one of Canada's most robust support networks for women entrepreneurs. From <strong>WeBC's $150k loans</strong> to Indigenous-specific grants, capital is available if you know where to look.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white hover:bg-gray-100 text-teal-900 font-bold text-lg px-10 py-6 shadow-xl" asChild>
                  <Link href="#webc-loans">
                    WeBC Loans ($150k)
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-teal-400/50 text-white hover:bg-teal-900/50 font-semibold text-lg px-10 py-6" asChild>
                  <Link href="#indigenous-grants">
                    Indigenous Grants
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* The WeBC Alert */}
        <section className="py-12 bg-white -mt-8 relative z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg shadow-sm">
                <div className="flex items-start">
                  <Lightbulb className="w-8 h-8 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-blue-900 mb-2">The "WeBC" Advantage</h3>
                    <p className="text-blue-800 mb-4">
                      In Ontario, you have scattered providers. In BC, you have a centralized powerhouse: <strong>WeBC</strong>.
                    </p>
                    <p className="text-blue-800">
                      They are not just a lender; they are the "Hub". Even if you don't take a loan, their <strong>mentoring programs</strong> (Mentoring Circles) are highly respected and can connect you to investors.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: WeBC Masterclass */}
        <section id="webc-loans" className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">How do WeBC Loans Work?</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  WeBC loans are the standard for women-owned businesses in BC. They offer better flexibility than a bank and include advisory services.
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-12 items-start">
                <div className="flex-1">
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <Card className="border-teal-100 bg-teal-50/50">
                      <CardHeader><CardTitle className="text-teal-900">Standard Loan</CardTitle></CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-teal-700 mb-2">Up to $150,000</div>
                        <p className="text-sm text-gray-600 mb-4">For working capital, equipment, or leaseholds.</p>
                        <ul className="text-sm space-y-2">
                          <li className="flex items-center"><CheckCircle className="w-3 h-3 text-teal-600 mr-2" /> Flexible repayment terms</li>
                          <li className="flex items-center"><CheckCircle className="w-3 h-3 text-teal-600 mr-2" /> No penalty for early payout</li>
                          <li className="flex items-center"><CheckCircle className="w-3 h-3 text-teal-600 mr-2" /> Business Advisor assigned</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-blue-100 bg-blue-50/50">
                      <CardHeader><CardTitle className="text-blue-900">BDC Partnership</CardTitle></CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-blue-700 mb-2">$150k + $100k</div>
                        <p className="text-sm text-gray-600 mb-4">For larger expansion projects.</p>
                        <ul className="text-sm space-y-2">
                          <li className="flex items-center"><CheckCircle className="w-3 h-3 text-blue-600 mr-2" /> Co-lending model</li>
                          <li className="flex items-center"><CheckCircle className="w-3 h-3 text-blue-600 mr-2" /> One application process</li>
                          <li className="flex items-center"><CheckCircle className="w-3 h-3 text-blue-600 mr-2" /> Access to BDC advisory</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <h3 className="font-bold text-gray-900 mb-3">Eligibility Checklist</h3>
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <ul className="space-y-4">
                      <li className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="w-5 h-5 text-emerald-500 mr-3" />
                        Business is 51% owned and controlled by women
                      </li>
                      <li className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="w-5 h-5 text-emerald-500 mr-3" />
                        Business is registered and operating in BC
                      </li>
                      <li className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="w-5 h-5 text-emerald-500 mr-3" />
                        Applicant resides in BC
                      </li>
                      <li className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="w-5 h-5 text-emerald-500 mr-3" />
                        Viable business plan showing repayment ability
                      </li>
                    </ul>
                    <div className="mt-6">
                      <Button variant="outline" className="w-full" asChild>
                        <a href="https://we-bc.ca/loans/" target="_blank" rel="noopener noreferrer">
                          Visit WeBC Official Loan Page <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Indigenous Women (IWEP) */}
        <section id="indigenous-grants" className="py-20 bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center mb-8">
                <Flower2 className="w-10 h-10 text-rose-600 mr-4" />
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Is there Funding for Indigenous Women?</h2>
                  <p className="text-gray-600">Reconciliation in Action: Targeted Grants</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <p className="text-gray-700 text-lg mb-6">
                      BC has a strong network of Indigenous Capital Corporations (ICCs) and specific streams for Indigenous women. These often include <strong>Non-Repayable Grants</strong> (unlike standard loans).
                    </p>

                    <div className="space-y-4">
                      <Card className="border-rose-100 bg-rose-50/50">
                        <CardHeader className="pb-2"><CardTitle className="text-base text-rose-900">NWAC (National)</CardTitle></CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600">The Native Women's Association of Canada frequently runs micro-grant programs for startups.</p>
                        </CardContent>
                      </Card>
                      <Card className="border-rose-100 bg-rose-50/50">
                        <CardHeader className="pb-2"><CardTitle className="text-base text-rose-900">CCAB (Aboriginal Business)</CardTitle></CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600">Often administers $5,000 micro-grants for marketing/web presence.</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div className="bg-rose-50/50 p-6 rounded-xl border border-rose-100">
                    <h4 className="font-bold text-rose-900 mb-4">Local BC Partners</h4>
                    <ul className="space-y-3 text-sm text-gray-700">
                      <li className="flex items-start">
                        <Map className="w-4 h-4 text-rose-500 mr-2 mt-1" />
                        <span><strong>Tale'awtxw Aboriginal Capital Corporation (TACC):</strong> Serves Coastal Salish territory.</span>
                      </li>
                      <li className="flex items-start">
                        <Map className="w-4 h-4 text-rose-500 mr-2 mt-1" />
                        <span><strong>All Nations Trust Company (ANTCO):</strong> Interior BC focus.</span>
                      </li>
                      <li className="flex items-start">
                        <Map className="w-4 h-4 text-rose-500 mr-2 mt-1" />
                        <span><strong>Nuu-chah-nulth Economic Development (NEDC):</strong> Vancouver Island West Coast.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Deep Dive Text Content - SEO & Authority */}
        <section className="py-20 bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto prose prose-lg prose-teal text-gray-700">
              <h2>How is the BC Funding Model Different?</h2>
              <p>
                British Columbia is unique. Unlike Ontario (focused on manufacturing) or Alberta (energy), BC's economy is dominated by <strong>Smalls Business</strong> (98% of all businesses) and a massive Service Sector.
              </p>
              <p>
                This means the funding landscape is different. In BC, you don't just apply for a grant; you build a relationship with a <strong>CDF (Community Development Financial)</strong> institution like WeBC.
              </p>

              <h3>1. WeBC: The "Arms-Length" Advantage</h3>
              <p>
                <em>WeBC</em> (formerly Women's Enterprise Centre) is the envy of other provinces. It is not a bank. It is a non-profit funded by Pacifican (Federal Government).
              </p>
              <ul>
                <li><strong>Character-Based Lending:</strong> If you are going through a divorce or have a gap in your credit history due to maternity leave, a bank algorithm rejects you. WeBC humans listen to the story.</li>
                <li><strong>Bundled Advisory:</strong> Receiving a WeBC loan is a badge of honor. It comes with a dedicated business advisor who acts like a free consultant. This advisory service alone is worth $5k-$10k per year.</li>
              </ul>

              <h3>2. Winning the "Business Plan" Game</h3>
              <p>
                To get the $150k WeBC loan, your business plan needs three things that standard templates miss:
              </p>
              <ol>
                <li><strong>The "Pivot" Plan:</strong> BC is expensive. Rents are high. They want to see that you have a "Plan B" if your lease goes up 20% next year.</li>
                <li><strong>Digital Adoption:</strong> Even if you run a physical yoga studio in Kitsilano, your plan must show a digital revenue stream (e.g., online classes). This proves resilience.</li>
                <li><strong>Wage Fairness:</strong> BC has a high minimum wage. Your financial projections must reflect realistic staffing costs, or they will be flagged as "Naive."</li>
              </ol>

              <h3>3. Indigenous Women Entrepreneurship</h3>
              <p>
                If you identify as Indigenous, the funding doors open wider. The <strong>BC Indigenous Clean Energy Initiative (BCICEI)</strong> and standard Aboriginal Financial Institution (AFI) networks offer:
              </p>
              <ul>
                <li><strong>Non-Repayable Contributions:</strong> Often up to 40% of project costs.</li>
                <li><strong>Procurement Advantages:</strong> Being certified as an Indigenous-owned business gets you preferential treatment for federal contracts (minimum 5% mandatory set-aside).</li>
              </ul>

              <h3>4. Venture Capital: The "Gerbs" Effect</h3>
              <p>
                Vancouver is home to a strong angel network. Groups like the <strong>Womens Equity Lab</strong> (started in Victoria) allow groups of women to pool money and invest in startups.
              </p>
              <p>
                <strong>Strategy:</strong> Do not just look for government grants. Look for "Angel Syndicates" where 20 women each put in $5k to write you a $100k cheque. It is faster than a grant and comes with 20 brand ambassadors.
              </p>
            </div>
          </div>
        </section>

        <section id="export-navigator" className="py-16 bg-white border-t">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">How does Export Navigator Help?</h2>
              <p className="text-gray-700 mb-6">In BC, if you are a woman-owned business looking to sell outside your community (even to Alberta), you qualify for a free <strong>Export Advisor</strong>.</p>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center"><Mountain className="w-5 h-5 mr-2" /> How it works</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm font-bold text-gray-900 mb-1">1. Designated Advisor</p>
                    <p className="text-xs text-gray-600">You get a human being who knows the grants. They are not a chatbot. They review your business plan.</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 mb-1">2. Women's Stream</p>
                    <p className="text-xs text-gray-600">They have advisors specifically trained to support women and Indigenous founders.</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 mb-1">3. Grant Referrals</p>
                    <p className="text-xs text-gray-600">If a new grant opens (like the elusive "Launch Online"), your advisor emails you before it goes public.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="niche-grants" className="py-16 bg-teal-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-start">
                <Target className="w-10 h-10 text-teal-600 mr-4 flex-shrink-0" />
                <div>
                  <h2 className="text-3xl font-bold mb-4 text-teal-900">What Niche Grants are Available for Women?</h2>
                  <p className="text-teal-800 mb-4">Beyond WeBC, there are hyper-specific funds for BC women.</p>

                  <div className="grid md:grid-cols-2 gap-4 text-slate-900">
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-teal-100">
                      <h4 className="font-bold mb-2">The Waring Chapman Grant</h4>
                      <p className="text-xs">A small, lesser-known grant for women entrepreneurs in BC making a positive social impact.</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-teal-100">
                      <h4 className="font-bold mb-2">Alacrity Foundation</h4>
                      <p className="text-xs">Not a grant, but a funded "Entrepreneurship" program in Victoria. They pay you to come build a tech company.</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-teal-100">
                      <h4 className="font-bold mb-2">Small Business BC (SBBC) Awards</h4>
                      <p className="text-xs">Winning a category gets you $10,000 cash. It is a contest, but the odds are decent for rural women-owned businesses.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Women in Tech (WinT) */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-10">Is there Funding for Women in Tech?</h2>
              <p className="text-lg text-gray-300 text-center mb-12">
                BC is a tech hub (Vancouver/Victoria/Kelowna). If you are building software or hardware, tap into Innovate BC's specific streams.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                  <h4 className="font-bold text-white mb-2">Innovate BC</h4>
                  <p className="text-sm text-gray-400">Often has "hiring grants" that prioritize under-represented groups (women) for R&D roles.</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                  <h4 className="font-bold text-white mb-2">Jely Jelly & CDL-West</h4>
                  <p className="text-sm text-gray-400">While not "Grants", these accelerators have specific cohorts for diverse founders, often leading to angel investment.</p>
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
                      <HelpCircle className="w-5 h-5 text-teal-500 mr-3 mt-0.5 flex-shrink-0" />
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 pl-8">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="common-mistakes" className="py-16 bg-red-50 border-t">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-red-900">Why are Applications Rejected?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg border border-red-100 shadow-sm">
                  <h3 className="font-bold text-red-800 mb-2">1. The "Hobby" Trap</h3>
                  <p className="text-sm text-gray-700">WeBC will not lend to a hobby. You need to show that this business pays your mortgage. If your projections show $500/month profit for 3 years, it's a "lifestyle" business, not a "growth" business.</p>
                </div>
                <div className="bg-white p-6 rounded-lg border border-red-100 shadow-sm">
                  <h3 className="font-bold text-red-800 mb-2">2. Ignoring Rural Points</h3>
                  <p className="text-sm text-gray-700">Many BC grants give bonus points for being outside Vancouver/Victoria. If you are in Prince George or Nanaimo, <em>highlight</em> that fact. It is your competitive advantage.</p>
                </div>
                <div className="bg-white p-6 rounded-lg border border-red-100 shadow-sm">
                  <h3 className="font-bold text-red-800 mb-2">3. Missing the "Green" Angle</h3>
                  <p className="text-sm text-gray-700">BC is obsessed with sustainability. Even if you run a hair salon, mention your eco-friendly products. It aligns with provincial goals.</p>
                </div>
                <div className="bg-white p-6 rounded-lg border border-red-100 shadow-sm">
                  <h3 className="font-bold text-red-800 mb-2">4. Underestimating Living Costs</h3>
                  <p className="text-sm text-gray-700">Adjudicators know how much it costs to live in BC. If your "Owner's Draw" in the budget is $20k/year, they know you will starve. Be realistic.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Guides Section */}
        <section className="py-16 bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Women's Business Programs Across Canada</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <Link href="/canada/ontario" className="flex items-center p-4 bg-white rounded-lg border hover:border-teal-500 transition-all"><Users className="w-5 h-5 text-blue-600 mr-3" /><span>Ontario Women's Programs</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/canada/alberta" className="flex items-center p-4 bg-white rounded-lg border hover:border-teal-500 transition-all"><Award className="w-5 h-5 text-orange-600 mr-3" /><span>Alberta Women Funding</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/canada/quebec" className="flex items-center p-4 bg-white rounded-lg border hover:border-teal-500 transition-all"><Briefcase className="w-5 h-5 text-purple-600 mr-3" /><span>Quebec Entrepreneurship</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/canada/british-columbia" className="flex items-center p-4 bg-white rounded-lg border hover:border-teal-500 transition-all"><Mountain className="w-5 h-5 text-emerald-600 mr-3" /><span>All BC Programs</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/canada" className="flex items-center p-4 bg-white rounded-lg border hover:border-teal-500 transition-all"><Shield className="w-5 h-5 text-red-600 mr-3" /><span>All Provincial Programs</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Related Funding Guides</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/blog/women-entrepreneurship-fund-canada" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><Lightbulb className="w-5 h-5 text-blue-600 mr-3" /><span>Federal Women's Funding</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/blog/indigenous-business-grants-canada" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><Flower2 className="w-5 h-5 text-rose-600 mr-3" /><span>Indigenous Business Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-teal-900 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6">Connect with WeBC</h2>
              <p className="text-xl text-teal-100 mb-10">
                Your first step in BC should always be booking a free advisory call with WeBC. They are the gatekeepers to the ecosystem.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button size="lg" className="bg-white text-teal-900 hover:bg-teal-50 font-bold text-lg px-8 py-4 h-auto" asChild>
                  <Link href="https://we-bc.ca/" target="_blank" rel="noopener noreferrer">
                    <Users className="w-5 h-5 mr-2" />
                    Visit WeBC Website
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-teal-400 text-teal-100 hover:bg-teal-800 hover:text-white font-semibold text-lg px-8 py-4 h-auto" asChild>
                  <Link href="/blog/bc-small-business-grants-guide">
                    See All BC Grants
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

function Map(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
      <line x1="9" x2="9" y1="3" y2="18" />
      <line x1="15" x2="15" y1="6" y2="21" />
    </svg>
  )
}
