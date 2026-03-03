import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, DollarSign, Target, Heart, Users, Megaphone, Shield, Award, HelpCircle, ExternalLink, ArrowRight, AlertTriangle, Lightbulb, Map, Briefcase, Mountain } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Women Entrepreneurship Loan Fund (WELF) 2026 | $50k Funding Guide",
  description: "Complete 2026 guide to the Women Entrepreneurship Loan Fund. Get up to $50,000 in loans via delivery partners like Coralus, PARO, and NACCA.",
  keywords: "women entrepreneurship loan fund WELF, WELF delivery partners, loans for women Canada, Coralus funding, PARO loans, NACCA indigenous loans",
}

export default function WomenUserLoanFundGuide() {
  const faqData = [
    {
      question: "Is WELF a grant or a loan?",
      answer: "It is a LOAN. You must pay it back. However, it is designed to be more accessible than bank loans, often with lower barriers to entry and built-in mentorship."
    },
    {
      question: "What is the maximum amount I can borrow?",
      answer: "Typically up to $50,000. Some partners may offer smaller micro-loans (e.g., $5,000 or $10,000) for startups, while the full $50k is often reserved for expansion."
    },
    {
      question: "Where do I apply?",
      answer: "You cannot apply on a government website. You must apply through a 'Delivery Partner' (like Coralus, PARO, or NACCA) that serves your region or demographic."
    },
    {
      question: "Do I need good credit?",
      answer: "WELF lenders are 'Character Based'. They do check personal credit, but they are more forgiving of life events (divorce, health issues) than major banks."
    },
    {
      question: "Can I use the money to pay off debt?",
      answer: "Usually, no. WELF is for 'Growth' (marketing, inventory, equipment, hiring). Using it to refinance existing high-interest debt is typically not allowed."
    },
    {
      question: "Is there a mentorship requirement?",
      answer: "Yes. Most partners require you to participate in advisory circles or mentorship programs. This is a feature, not a bug—it connects you with other founders."
    },
    {
      question: "How long does it take to get approved?",
      answer: "It varies by partner, but typically 4-8 weeks. It is not an instant 'click-loan'. You will need to submit a business plan and cash flow projections."
    },
    {
      question: "Is this different from the 'Women Entrepreneurship Fund'?",
      answer: "Yes. The 'Women Entrepreneurship Fund' (WEF) was a direct GRANT program that ended in 2019/2020. WELF is the current LOAN program active in 2026."
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
        <section className="bg-gradient-to-br from-purple-900 to-indigo-900 text-white py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-purple-500/20 text-purple-100 border-purple-400/30 px-4 py-1.5 text-sm uppercase tracking-wide">
                🏦 The WELF Handbook
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                Women Entrepreneurship Loan Fund: <span className="text-purple-400">Your $50k Guide</span>
              </h1>
              <p className="text-xl text-purple-100 mb-10 leading-relaxed max-w-3xl mx-auto">
                The government allocated $55 Million to loan funds specifically for women. But you can't apply to "The Government". You must find the right <strong>Delivery Partner</strong> for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white hover:bg-gray-100 text-purple-900 font-bold text-lg px-10 py-6 shadow-xl" asChild>
                  <Link href="#delivery-directory">
                    Find Your Partner
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-purple-400/50 text-white hover:bg-purple-900/50 font-semibold text-lg px-10 py-6" asChild>
                  <Link href="#welf-terms">
                    Loan Terms
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* The "Partner" Alert */}
        <section className="py-12 bg-white -mt-8 relative z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-lg shadow-sm">
                <div className="flex items-start">
                  <Heart className="w-8 h-8 text-indigo-600 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-indigo-900 mb-2">Crucial: Pick the Right Partner</h3>
                    <p className="text-indigo-800 mb-4">
                      Each "Delivery Partner" has a specific focus. Some are for Indigenous women, some for Francophones, some for broad startups.
                    </p>
                    <p className="text-indigo-800">
                      <strong>Do not carpet bomb applications.</strong> Pick the one that aligns with your identity and location.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: Delivery Partner Directory */}
        <section id="delivery-directory" className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">The WELF Directory</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Who holds the chequebook?
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-purple-100 bg-purple-50/50">
                  <CardHeader><CardTitle className="text-purple-900">Coralus (Formerly SheEO)</CardTitle></CardHeader>
                  <CardContent>
                    <Badge className="mb-2 bg-purple-200 text-purple-800">National</Badge>
                    <p className="text-sm text-gray-600 mb-4">Focus on "Radical Generosity". Community funded loops. Very strong for social impact businesses.</p>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-center"><CheckCircle className="w-3 h-3 text-purple-600 mr-2" /> 0% Interest Loans (Often)</li>
                      <li className="flex items-center"><CheckCircle className="w-3 h-3 text-purple-600 mr-2" /> Massive global network</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-pink-100 bg-pink-50/50">
                  <CardHeader><CardTitle className="text-pink-900">PARO Settlement Services</CardTitle></CardHeader>
                  <CardContent>
                    <Badge className="mb-2 bg-pink-200 text-pink-800">Ontario / National Reach</Badge>
                    <p className="text-sm text-gray-600 mb-4">Famous for "Peer Lending Circles". You form a group of 4-7 women who co-vouch for loans.</p>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-center"><CheckCircle className="w-3 h-3 text-pink-600 mr-2" /> Tiered borrowing ($1k -&gt; $5k)</li>
                      <li className="flex items-center"><CheckCircle className="w-3 h-3 text-pink-600 mr-2" /> No collateral needed</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-rose-100 bg-rose-50/50">
                  <CardHeader><CardTitle className="text-rose-900">NACCA (Indigenous)</CardTitle></CardHeader>
                  <CardContent>
                    <Badge className="mb-2 bg-rose-200 text-rose-800">National (Indigenous)</Badge>
                    <p className="text-sm text-gray-600 mb-4">National Aboriginal Capital Corporations Association. Delivers loans through local Aboriginal Financial Institutions (AFIs).</p>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-center"><CheckCircle className="w-3 h-3 text-rose-600 mr-2" /> Up to $50k (sometimes more)</li>
                      <li className="flex items-center"><CheckCircle className="w-3 h-3 text-rose-600 mr-2" /> Often includes non-repayable grants</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-blue-100 bg-blue-50/50">
                  <CardHeader><CardTitle className="text-blue-900">Northumberland CFDC (DELIA)</CardTitle></CardHeader>
                  <CardContent>
                    <Badge className="mb-2 bg-blue-200 text-blue-800">Eastern Ontario / Pilot</Badge>
                    <p className="text-sm text-gray-600 mb-4">The "DELIA" program offers micro-loans specifically aiming for automated, faster approval processes.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Loan Terms */}
        <section id="welf-terms" className="py-20 bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center mb-8">
                <Target className="w-10 h-10 text-purple-600 mr-4" />
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">2. The Terms</h2>
                  <p className="text-gray-600">What you are signing up for</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <p className="text-gray-700 text-lg mb-6">
                      WELF loans are generally more favorable than bank loans, but they are serious financial commitments.
                    </p>

                    <div className="space-y-4">
                      <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-gray-700">Interest Rate:</span>
                        <span className="font-bold text-purple-700">Often Prime + 2% (or Fixed low rate)</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-gray-700">Term Length:</span>
                        <span className="font-bold text-gray-900">Up to 5 Years</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-gray-700">Personal Guarantee:</span>
                        <span className="font-bold text-gray-900">Often Required (but rarely collateralized against home)</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50/50 p-6 rounded-xl border border-purple-100">
                    <h4 className="font-bold text-purple-900 mb-4">The "Character Based" Difference</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Traditional banks use algorithms. WELF partners use committees.
                    </p>
                    <p className="text-sm text-gray-600">
                      If you have a 600 credit score because of a divorce 3 years ago, a bank auto-rejects you. A WELF partner listens to the story, looks at your current cash flow, and *can* approve you.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Mentorship */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">The Hidden Benefit: Mentorship</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  You come for the money. You stay for the advice.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <Card className="hover:shadow-lg transition-shadow border-blue-200 bg-blue-50/20">
                  <CardHeader>
                    <Users className="w-10 h-10 text-blue-600 mb-2" />
                    <CardTitle className="text-lg">Peer Circles</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">With PARO or Coralus, you join a cohort. These women become your first customers, your advisors, and your friends.</p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow border-indigo-200 bg-indigo-50/20">
                  <CardHeader>
                    <Megaphone className="w-10 h-10 text-indigo-600 mb-2" />
                    <CardTitle className="text-lg">Visibility</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">Successful WELF recipients are heavily promoted by the government and partners. It is free PR.</p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow border-yellow-200 bg-yellow-50/20">
                  <CardHeader>
                    <Award className="w-10 h-10 text-yellow-600 mb-2" />
                    <CardTitle className="text-lg">Follow-on Funding</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">Repaying a WELF loan builds a "Business Credit History", unlocking larger BDC loans ($100k+) later.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Deep Dive Text Content - SEO & Authority */}
        <section className="py-20 bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto prose prose-lg prose-purple text-gray-700">
              <h2>The "Alternative Lending" Revolution</h2>
              <p>
                To understand WELF, you must understand why it exists. Traditional banks reject women entrepreneurs at a disproportionately high rate. Why? Because banks value <strong>Collateral</strong> (Houses, Cars, Assets).
              </p>
              <p>
                WELF partners value <strong>Community</strong> and <strong>Cash Flow</strong>. They use "Character-Based Lending".
              </p>

              <h3>1. The Coralus (SheEO) Model: "Radical Generosity"</h3>
              <p>
                <strong>Coralus</strong> (formerly SheEO) is arguably the most unique lender in the world. The money does not come from a bank; it comes from "Activators"—thousands of women who donate their own money to a perpetual fund.
              </p>
              <ul>
                <li><strong>0% Interest:</strong> Loans are often interest-free.</li>
                <li><strong>The Flow:</strong> When you pay back the loan, the money is loaned out to the <em>next</em> woman. It is a virtuous cycle.</li>
                <li><strong>The Network:</strong> Getting a Coralus loan gives you access to a global directory of female CEOs who are eager to buy from you.</li>
              </ul>

              <h3>2. The PARO Model: "Social Collateral"</h3>
              <p>
                <strong>PARO Settlement Services</strong> (based in Ontario but with national reach) uses a Nobel Prize-winning concept: <strong>Peer Lending Circles</strong>.
              </p>
              <ul>
                <li><strong>How it works:</strong> You form a "Circle" with 4-7 other women. You meet monthly.</li>
                <li><strong>The Magic:</strong> If you need a loan, the other women in your circle vote to approve it. They do not put up their own money, but they "Vouch" for you.</li>
                <li><strong>Repayment:</strong> If you default, it reflects poorly on the circle (though they are not always financially liable). This "Social Pressure" results in repayment rates higher than major banks (often &gt;98%).</li>
              </ul>

              <h3>3. NACCA: Indigenous Sovereignty</h3>
              <p>
                For Indigenous women (First Nations, Inuit, Métis), <strong>NACCA</strong> is the path. They operate through a network of 50+ Aboriginal Financial Institutions (AFIs).
              </p>
              <p>
                <strong>The "Grant-Loan" Hybrid:</strong> Unlike other streams, many AFIs offer a "Non-Repayable Portion" (a grant) alongside the loan. For example, you might get $50,000, but only have to pay back $35,000 if you meet certain targets.
              </p>

              <h2>Application Checklist: What You Need</h2>
              <p>
                Even though these are "Friendly" lenders, they are still lenders. Dealing with them requires preparation.
              </p>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 not-prose mb-8">
                <h4 className="font-bold text-gray-900 mb-4">Required Documents</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                    <div>
                      <strong>Business Plan:</strong> Does not need to be 50 pages. A solid 10-page deck covering Market, Product, and Team is sufficient.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                    <div>
                      <strong>Cash Flow Projections (12 Months):</strong>
                      <span className="text-sm text-gray-600 block">Show exactly how the loan helps you generate revenue to pay it back.</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                    <div>
                      <strong>Personal Financial Statement:</strong> Used to assess "Character". Be honest about debts.
                    </div>
                  </li>
                </ul>
              </div>

              <h3>The "Use of Funds" Trap</h3>
              <p>
                <strong>Do Not Say:</strong> "I need money to pay my rent." (This signals distress).
              </p>
              <p>
                <strong>Do Say:</strong> "I need money to buy bulk inventory for the holiday season, which will increase my margin by 15%." (This signals growth).
              </p>
            </div>
          </div>
        </section>

        <section id="common-mistakes" className="py-16 bg-white border-t">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-red-900">Why 50% of WELF Applications are Rejected</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg border border-red-100 shadow-sm">
                  <h3 className="font-bold text-red-800 mb-2">1. "Zombie Business" Syndrome</h3>
                  <p className="text-sm text-gray-700">WELF is not for saving a dying business. If your revenue has been declining for 3 years, they will not lend to you. You must show a clear path to turnaround or growth.</p>
                </div>
                <div className="bg-white p-6 rounded-lg border border-red-100 shadow-sm">
                  <h3 className="font-bold text-red-800 mb-2">2. The "Solo Founder" Risk</h3>
                  <p className="text-sm text-gray-700">Lenders hate seeing a business that collapses if you get sick. Show them you have a team, a contractor, or at least a documented manual of operations.</p>
                </div>
                <div className="bg-white p-6 rounded-lg border border-red-100 shadow-sm">
                  <h3 className="font-bold text-red-800 mb-2">3. Ignoring the "Impact" Question</h3>
                  <p className="text-sm text-gray-700">Especially for Coralus/SheEO, they want to know how your business makes the world better. "I sell widgets" is not enough. "I sell widgets made of recycled plastic" is better.</p>
                </div>
                <div className="bg-white p-6 rounded-lg border border-red-100 shadow-sm">
                  <h3 className="font-bold text-red-800 mb-2">4. Carpet Bombing</h3>
                  <p className="text-sm text-gray-700">Applying to NACCA (Indigenous) when you are not Indigenous will get you blacklisted. Applying to PARO (Ontario) when you live in BC will get you ignored. <strong>Read the eligibility.</strong></p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="success-strategy" className="py-16 bg-blue-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/3">
                <div className="bg-blue-100 rounded-full p-8 inline-block">
                  <Lightbulb className="w-16 h-16 text-blue-600" />
                </div>
              </div>
              <div className="md:w-2/3">
                <h2 className="text-2xl font-bold text-blue-900 mb-4">Pro Tip: Stack Your Funding</h2>
                <p className="text-blue-800 mb-4">
                  The smartest acceptance strategy is to use WELF as "Junior Debt".
                </p>
                <ul className="space-y-2 text-sm text-blue-900">
                  <li className="flex items-start"><CheckCircle className="w-4 h-4 text-blue-600 mr-2 mt-1" /> <strong>Step 1:</strong> Get a $50k WELF loan (easier approval).</li>
                  <li className="flex items-start"><CheckCircle className="w-4 h-4 text-blue-600 mr-2 mt-1" /> <strong>Step 2:</strong> Go to BDC or a Bank. Show them you have $50k in the bank.</li>
                  <li className="flex items-start"><CheckCircle className="w-4 h-4 text-blue-600 mr-2 mt-1" /> <strong>Step 3:</strong> They treat that $50k as "Equity" or "Cash Injection", unlocking a $100k line of credit.</li>
                </ul>
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
                      <HelpCircle className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 pl-8">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Related Guides Section */}
        <section className="py-16 bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Provincial Women&apos;s Funding Programs</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <Link href="/canada/ontario" className="flex items-center p-4 bg-white rounded-lg border hover:border-purple-500 transition-all"><Users className="w-5 h-5 text-blue-600 mr-3" /><span>Ontario Programs</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/canada/british-columbia" className="flex items-center p-4 bg-white rounded-lg border hover:border-purple-500 transition-all"><Mountain className="w-5 h-5 text-emerald-600 mr-3" /><span>BC Programs</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/canada/alberta" className="flex items-center p-4 bg-white rounded-lg border hover:border-purple-500 transition-all"><Award className="w-5 h-5 text-orange-600 mr-3" /><span>Alberta Programs</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/canada/quebec" className="flex items-center p-4 bg-white rounded-lg border hover:border-purple-500 transition-all"><Briefcase className="w-5 h-5 text-purple-600 mr-3" /><span>Quebec Programs</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/canada" className="flex items-center p-4 bg-white rounded-lg border hover:border-purple-500 transition-all"><Shield className="w-5 h-5 text-red-600 mr-3" /><span>All Provincial Programs</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Related Funding Guides</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/blog/women-entrepreneurship-fund-canada" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><Lightbulb className="w-5 h-5 text-blue-600 mr-3" /><span>Federal Women&apos;s Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/blog/bc-women-business-grants" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><Heart className="w-5 h-5 text-pink-600 mr-3" /><span>BC Women Entrepreneurs</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white border-t border-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">WELF in Action: Real Scenarios</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Scenario A: The Manufacturer</h4>
                  <p className="text-sm text-gray-600 mb-2"><strong>Sarah</strong> runs a gluten-free bakery. She needs a new $40k oven.</p>
                  <p className="text-sm text-gray-600"><strong>Bank:</strong> Rejected. "Restaurant industry too risky."</p>
                  <p className="text-sm text-gray-600"><strong>WELF (Coralus):</strong> Approved. The community voted for her because she sources local ingredients. She pays 0% interest.</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Scenario B: The Service Biz</h4>
                  <p className="text-sm text-gray-600 mb-2"><strong>Elena</strong> runs a marketing agency. She needs $30k to hire a junior dev.</p>
                  <p className="text-sm text-gray-600"><strong>Bank:</strong> Rejected. "No assets to collateralize."</p>
                  <p className="text-sm text-gray-600"><strong>WELF (PARO):</strong> Approved. She joined a peer circle, attended 4 meetings, and her circle vouched for her character.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-purple-900 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6">Start Your Application</h2>
              <p className="text-xl text-purple-100 mb-10">
                The first step is checking eligibility with the partner nearest you.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button size="lg" className="bg-white text-purple-900 hover:bg-purple-50 font-bold text-lg px-8 py-4 h-auto" asChild>
                  <Link href="https://ised-isde.canada.ca/site/women-entrepreneurship-strategy/en/women-entrepreneurship-loan-fund" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Official WELF Partner List
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-purple-400 text-purple-100 hover:bg-purple-800 hover:text-white font-semibold text-lg px-8 py-4 h-auto" asChild>
                  <Link href="/blog/ontario-women-business-grants">
                    See Ontario Women's Grants
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
