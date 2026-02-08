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
import { CheckCircle, DollarSign, Target, XCircle, Users, RefreshCw, Shield, Award, HelpCircle, ExternalLink, ArrowRight, AlertTriangle, Lightbulb, History, Briefcase, FileText } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Women Entrepreneurship Fund (WEF) 2026 | Status & Alternatives",
  description: "Is the Women Entrepreneurship Fund still open? No. Learn about the 2026 alternatives: The $50k WELF loan and the Ecosystem Fund.",
  keywords: "Women Entrepreneurship Fund application, WEF grant status, Canada women business grants, WELF vs WEF, women entrepreneur funding Canada 2026",
}

export default function WomenEntrepreneurshipFundGuide() {
  const faqData = [
    {
      question: "What is the Women Entrepreneurship Fund in Canada 2026?",
      answer: "The Women Entrepreneurship Fund (WEF) was a one-time $20 million grant program that closed in 2019. The current 2026 alternatives are the Women Entrepreneurship Loan Fund (WELF) offering up to $50k in loans, and the Ecosystem Fund supporting non-profits that help women entrepreneurs."
    },
    {
      question: "How do I apply for women small business grants in Canada?",
      answer: "Direct government grants like WEF are closed. For 2026, apply for the WELF loan through BDC-affiliated lenders for up to $50k. For actual grants, look at private options like Visa She's Next ($10k) or Amex Blueprint ($10k), or sector-specific programs like SWPP hiring grants."
    },
    {
      question: "Is the Women Entrepreneurship Fund (WEF) still accepting applications?",
      answer: "No. The direct grant portion of the strategy (WEF) closed in 2019/2020. It was a one-time injection. The current strategy focuses on LOANS (WELF) and Ecosystem support."
    },
    {
      question: "Will the $100,000 grant ever come back?",
      answer: "It is unlikely. The government has shifted its focus to 'sustainable' capital (loans) via the Women Entrepreneurship Loan Fund (WELF), which recycles capital for future borrowers."
    },
    {
      question: "What replaced the WEF?",
      answer: "Two things: 1) The 'Women Entrepreneurship Loan Fund' (up to $50k loans), and 2) The 'Ecosystem Fund' (funding for non-profits to provide free training to you)."
    },
    {
      question: "Are there ANY grants left for women?",
      answer: "Yes, but they are smaller and mostly private. Visa She's Next and Amex Blueprint offer $10,000 grants. Government grants are now mostly sector-specific (e.g., Tech, Agriculture)."
    },
    {
      question: "Can I apply for the Ecosystem Fund?",
      answer: "Only if you are a non-profit organization helping women. If you are a business owner, you cannot apply for the Ecosystem Fund; you BENEFIT from it by accessing the free services it funds."
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
        <section className="bg-gradient-to-br from-gray-900 to-slate-900 text-white py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-red-500/20 text-red-100 border-red-400/30 px-4 py-1.5 text-sm uppercase tracking-wide">
                🚫 Program Status: CLOSED
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                Women Entrepreneurship Fund: <span className="text-gray-400">The 2026 Realities</span>
              </h1>
              <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-3xl mx-auto">
                Many websites still list the "WEF Grant" as active. They are wrong. The direct grant program ended years ago. Here is where the money actually is in 2026.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg px-10 py-6 shadow-xl" asChild>
                  <Link href="/blog/women-entrepreneurship-loan-fund-canada">
                    Go to Active Loan Fund ($50k)
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-gray-400/50 text-white hover:bg-gray-800 font-semibold text-lg px-10 py-6" asChild>
                  <Link href="#alternatives">
                    See Alternatives
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* The "Reality Check" Alert */}
        <section className="py-12 bg-white -mt-8 relative z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg shadow-sm">
                <div className="flex items-start">
                  <XCircle className="w-8 h-8 text-red-600 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-red-900 mb-2">Stop Searching for "WEF Application"</h3>
                    <p className="text-red-800 mb-4">
                      Scammers often set up fake sites claiming to offer the "Women Entrepreneurship Fund Application".
                    </p>
                    <p className="text-red-800">
                      <strong>Fact:</strong> The official WEF portal has been closed since 2019. Any site asking for an application fee for this grant is a scam.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Common Questions Section */}
        <section className="py-12 bg-gradient-to-r from-pink-50 to-purple-50 border-b-2 border-pink-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">❓ Common Questions About the Women Entrepreneurship Fund</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <a href="#history" className="p-5 bg-white rounded-lg shadow hover:shadow-md transition border border-pink-100">
                  <h3 className="font-semibold text-pink-900 mb-2">Is the WEF still accepting applications?</h3>
                  <p className="text-sm text-gray-600">Program status and closure timeline</p>
                </a>
                <a href="#alternatives" className="p-5 bg-white rounded-lg shadow hover:shadow-md transition border border-purple-100">
                  <h3 className="font-semibold text-purple-900 mb-2">What replaced the $100k grant?</h3>
                  <p className="text-sm text-gray-600">Current 2026 funding alternatives</p>
                </a>
                <a href="#welf-guide" className="p-5 bg-white rounded-lg shadow hover:shadow-md transition border border-emerald-100">
                  <h3 className="font-semibold text-emerald-900 mb-2">How do I apply for WELF loans?</h3>
                  <p className="text-sm text-gray-600">Step-by-step application process</p>
                </a>
                <a href="#partners" className="p-5 bg-white rounded-lg shadow hover:shadow-md transition border border-blue-100">
                  <h3 className="font-semibold text-blue-900 mb-2">Which organizations offer free help?</h3>
                  <p className="text-sm text-gray-600">Ecosystem Fund partners and services</p>
                </a>
                <a href="#crowdfunding" className="p-5 bg-white rounded-lg shadow hover:shadow-md transition border border-orange-100">
                  <h3 className="font-semibold text-orange-900 mb-2">Are there private grant alternatives?</h3>
                  <p className="text-sm text-gray-600">Visa She's Next, Amex Blueprint, angel networks</p>
                </a>
                <a href="#application-checklist" className="p-5 bg-white rounded-lg shadow hover:shadow-md transition border border-indigo-100">
                  <h3 className="font-semibold text-indigo-900 mb-2">What documents do I need?</h3>
                  <p className="text-sm text-gray-600">Complete application checklist</p>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: What happened? */}
        <section id="history" className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">What happened to the Grant?</h2>
                  <p className="text-lg text-gray-700 mb-6">
                    In 2018, the Government announced a $20 Million direct grant fund. It was overwhelmed. They received thousands of applications for a small pot of money.
                  </p>
                  <p className="text-lg text-gray-700 mb-6">
                    <strong>The Pivot:</strong> Realizing grants were unsustainable, the government shifted the remaining billions of the Strategy into:
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <RefreshCw className="w-6 h-6 text-blue-600 mr-3" />
                      <div>
                        <strong className="text-gray-900">Revolving Loans (WELF):</strong> By lending money, they can get it back and lend it again to the next woman.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Users className="w-6 h-6 text-blue-600 mr-3" />
                      <div>
                        <strong className="text-gray-900">Ecosystem Fund:</strong> Funding organizations (like Coralus, PARO, The Forum) to support thousands of women instead of giving cash to just a few.
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="flex-1 bg-gray-100 p-8 rounded-xl">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">WEF Timeline</h3>
                  <div className="space-y-6 border-l-2 border-gray-300 pl-6 relative">
                    <div className="relative">
                      <span className="absolute -left-[31px] bg-gray-500 w-4 h-4 rounded-full"></span>
                      <p className="text-sm font-bold text-gray-500">2018</p>
                      <p className="text-gray-700">Program Launched ($100k Grants)</p>
                    </div>
                    <div className="relative">
                      <span className="absolute -left-[31px] bg-red-500 w-4 h-4 rounded-full"></span>
                      <p className="text-sm font-bold text-red-500">2019</p>
                      <p className="text-gray-900 font-bold">Applications Closed Permanently</p>
                    </div>
                    <div className="relative">
                      <span className="absolute -left-[31px] bg-emerald-500 w-4 h-4 rounded-full"></span>
                      <p className="text-sm font-bold text-emerald-600">2022-Present</p>
                      <p className="text-gray-700">Focus shift to WELF (Loans)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Alternatives */}
        <section id="alternatives" className="py-20 bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center mb-8">
                <Target className="w-10 h-10 text-emerald-600 mr-4" />
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Where to apply in 2026</h2>
                  <p className="text-gray-600">The money is still there, it just changed form.</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <Card className="border-emerald-100 bg-emerald-50/50">
                  <CardHeader><CardTitle className="text-emerald-900">1. WELF (The Loan)</CardTitle></CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-emerald-700 mb-2">$50,000</div>
                    <p className="text-sm text-gray-600 mb-4">The direct successor. If you wanted the grant to grow your business, this is the tool you use now.</p>
                    <Button className="w-full bg-emerald-600" asChild>
                      <Link href="/blog/women-entrepreneurship-loan-fund-canada">View Guide</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-blue-100 bg-blue-50/50">
                  <CardHeader><CardTitle className="text-blue-900">2. Private Grants</CardTitle></CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-700 mb-2">$10,000</div>
                    <p className="text-sm text-gray-600 mb-4">Visa She's Next and Amex Blueprint still offer actual cash grants. They are competitive lotteries.</p>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/blog/ontario-women-business-grants">View Private Options</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-purple-100 bg-purple-50/50">
                  <CardHeader><CardTitle className="text-purple-900">3. Inclusive Hiring</CardTitle></CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-purple-700 mb-2">$7,000</div>
                    <p className="text-sm text-gray-600 mb-4">Grants to hire students (SWPP). They often prioritize women in STEM roles.</p>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/blog/canada-hiring-training-grants-guide">View Hiring Grants</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Deep Dive Text Content - SEO & Authority */}
        <section className="py-20 bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto prose prose-lg prose-red text-gray-700">
              <h2>The "Fake Grant" Epidemic</h2>
              <p>
                Because the <strong>Women Entrepreneurship Fund</strong> was so popular, it has become a magnet for scams. At <em>Canada Grants Guide</em>, we receive emails weekly from founders asking if an "Approval Email" they received is real.
              </p>

              <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500 not-prose my-8">
                <h4 className="font-bold text-red-900 mb-4 text-xl">How to Spot a WEF Scam</h4>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <AlertTriangle className="w-6 h-6 text-red-600 mr-3 flex-shrink-0" />
                    <div>
                      <strong className="text-red-900">The "Processing Fee":</strong>
                      <p className="text-sm text-red-800">Real government grants NEVER charge a fee to apply. If a website asks for $29, $49, or $99 to "Process your Application," it is a scam.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="w-6 h-6 text-red-600 mr-3 flex-shrink-0" />
                    <div>
                      <strong className="text-red-900">The "Guaranteed" Approval:</strong>
                      <p className="text-sm text-red-800">No grant is guaranteed. The original WEF had a success rate of less than 10%. Anyone promising you money is lying.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="w-6 h-6 text-red-600 mr-3 flex-shrink-0" />
                    <div>
                      <strong className="text-red-900">The "Facebook Agent":</strong>
                      <p className="text-sm text-red-800">Government officials do not message you on Facebook or Instagram. Official communication comes from an <code>@canada.ca</code> email address.</p>
                    </div>
                  </li>
                </ul>
              </div>

              <h2>Lessons from the "Winners" (2018/2019)</h2>
              <p>
                Although the fund is closed, looking at who won helps you understand what the government funds <em>today</em> in other programs.
              </p>
              <p>
                When we analyzed the ~300 winning companies from the original cohort, two patterns emerged:
              </p>

              <h3>1. The "Export" Pivot</h3>
              <p>
                Companies that won didn't just ask for money to "sustain" operations. they asked for money to <strong>Export</strong>.
                <br />
                <em>Example:</em> A female-led organic skincare brand in Vancouver didn't ask for rent money. They asked for money to certify their products for the EU market. Result: <strong>Funded</strong>.
              </p>
              <p>
                <strong>Lesson for 2026:</strong> If you want funding today (from CanExport or BDC), frame your request around "Entering New Markets".
              </p>

              <h3>2. The "IP" Pivot</h3>
              <p>
                Winners often owned their own Intellectual Property.
                <br />
                <em>Example:</em> A software consultancy didn't get funded. But a consultancy that was <em>building a proprietary data platform</em> DID get funded.
              </p>
              <p>
                <strong>Lesson for 2026:</strong> Service businesses are hard to fund. Product businesses (SaaS, CPG, Hardware) are easier. Try to productize your service.
              </p>

              <h2>The "Ecosystem" Map</h2>
              <p>
                The government realized that giving cash to 300 women left 3,000 angry. So they created the <strong>Women Entrepreneurship Knowledge Hub (WEKH)</strong> and the <strong>Ecosystem Fund</strong>.
              </p>
              <p>
                This funding goes to non-profits who then offer YOU free services. You should use them—you already paid for them with your taxes!
              </p>

              <ul>
                <li><strong>The Forum (formerly Forum for Women Entrepreneurs):</strong> Uses government funds to run the "Pitch for the Purse" and massive mentorship programs.</li>
                <li><strong>Coralus (SheEO):</strong> Subsidized by the Ecosystem Fund to expand their loan reach.</li>
                <li><strong>Women's Enterprise Organizations of Canada (WEOC):</strong> The national body that certifies "Women Owned" businesses (WBE Certification). Getting certified often costs money, but Ecosystem funding often subsidizes it.</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="welf-guide" className="py-16 bg-white border-t">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">How to Apply for the WELF Loan (Step-by-Step)</h2>
              <p className="text-gray-700 mb-8">Since the grant is gone, the $50,000 WELF loan is your best government-backed option. It's administered by different partners depending on your region.</p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-emerald-100 p-3 rounded-full mr-4">
                    <Target className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Step 1: Choose Your Lender</h3>
                    <p className="text-gray-600 text-sm">You don't apply to the government directly. You apply to a Delivery Organization. Common ones include <strong>Coralus (formerly SheEO)</strong>, <strong>Evol (Quebec)</strong>, and <strong>Women's Enterprise Organizations of Canada (WEOC)</strong>.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Step 2: Prepare the "Growth Plan"</h3>
                    <p className="text-gray-600 text-sm">Unlike a standard bank loan, WELF requires a "Growth Plan" rather than just a business plan. Focus on how the money generates revenue immediately (e.g., buying inventory to fill orders), not just paying rent.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-purple-100 p-3 rounded-full mr-4">
                    <CheckCircle className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Step 3: The "Micro-Loan" Stage</h3>
                    <p className="text-gray-600 text-sm">Many lenders start you with a smaller amount (e.g., $5k-$10k). Repaying this successfully unlocks the full $50k tier. It's a ladder system.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="partners" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Ecosystem Fund Partners: Free Help</h2>
              <p className="text-gray-700 mb-6">The government pays these organizations to help you for free. If you pay a consultant for a business plan, you are wasting money. Go to these non-profits instead.</p>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-pink-200">
                  <CardHeader className="bg-pink-50">
                    <CardTitle className="text-pink-900 text-lg">The Forum (National)</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-sm text-gray-700 mb-3"><strong>Best For:</strong> Mentorship and Pitch Training.</p>
                    <p className="text-xs text-gray-600">Runs distinct programs like "E-Series" and "Pitch for the Purse." Massive community of mentors.</p>
                  </CardContent>
                </Card>
                <Card className="border-purple-200">
                  <CardHeader className="bg-purple-50">
                    <CardTitle className="text-purple-900 text-lg">Coralus (Global/National)</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-sm text-gray-700 mb-3"><strong>Best For:</strong> "Radical Generosity" and 0% Interest Loans.</p>
                    <p className="text-xs text-gray-600">Community-funded loans where the network buys your products to help you repay.</p>
                  </CardContent>
                </Card>
                <Card className="border-blue-200">
                  <CardHeader className="bg-blue-50">
                    <CardTitle className="text-blue-900 text-lg">PARO Centre (Ontario/North)</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-sm text-gray-700 mb-3"><strong>Best For:</strong> Peer Lending Circles.</p>
                    <p className="text-xs text-gray-600">Join a "Circle" of 4-7 women. You approve each other's loans. High approval rates.</p>
                  </CardContent>
                </Card>
                <Card className="border-orange-200">
                  <CardHeader className="bg-orange-50">
                    <CardTitle className="text-orange-900 text-lg">Women's Enterprise Centre (BC/MB)</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-sm text-gray-700 mb-3"><strong>Best For:</strong> Traditional Business Training.</p>
                    <p className="text-xs text-gray-600">Excellent workshops on cash flow, marketing, and export.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section id="crowdfunding" className="py-16 bg-white border-t">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Alternative: Crowdfunding & Angel Investors</h2>
              <p className="text-gray-700 mb-6">If you don't want a loan (WELF), consider equity crowdfunding or angel networks. Women-led startups actually outperform men in crowdfunding campaigns.</p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-purple-50 p-6 rounded-lg border border-purple-100">
                  <h3 className="font-bold text-purple-900 mb-3 flex items-center"><Users className="w-5 h-5 mr-2" /> Crowdfunding Platforms</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li><strong>iFundWomen:</strong> The only platform dedicated 100% to women. Includes coaching.</li>
                    <li><strong>FrontFundr:</strong> Equity crowdfunding. Sell shares of your company to the public (not just rich people).</li>
                    <li><strong>Kickstarter:</strong> Product-based. Best for CPG brands (food, beauty, fashion).</li>
                  </ul>
                </div>
                <div className="bg-pink-50 p-6 rounded-lg border border-pink-100">
                  <h3 className="font-bold text-pink-900 mb-3 flex items-center"><Target className="w-5 h-5 mr-2" /> Angel Networks</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li><strong>The51:</strong> Financial feminist platform in Calgary/Toronto.</li>
                    <li><strong>Phoenix Fire:</strong> Angel network for women in Ontario.</li>
                    <li><strong>Women's Equity Lab:</strong> Early-stage investing in BC.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="application-checklist" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Application Checklist: Be Ready</h2>
              <p className="text-gray-700 mb-6">When you apply for the WELF loan or any private grant, have these ready. Missing documents = automatic rejection.</p>

              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" /><span className="text-sm">Proof of 50%+ Woman Ownership (Shareholder Agreement)</span></div>
                  <div className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" /><span className="text-sm">2 Years of Financial Statements (Notice to Reader)</span></div>
                  <div className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" /><span className="text-sm">Current Month Balance Sheet</span></div>
                  <div className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" /><span className="text-sm">12-Month Cash Flow Forecast</span></div>
                  <div className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" /><span className="text-sm">Personal Net Worth Statement</span></div>
                  <div className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" /><span className="text-sm">The "Growth Plan" (How you spend the money)</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed FAQ Section */}
        <section className="py-20 bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {faqData.map((faq, index) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-2 flex items-start">
                      <HelpCircle className="w-5 h-5 text-gray-500 mr-3 mt-0.5 flex-shrink-0" />
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
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Provincial Women's Grant Programs</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <Link href="/canada/ontario" className="flex items-center p-4 bg-white rounded-lg border hover:border-pink-500 transition-all"><Users className="w-5 h-5 text-pink-600 mr-3" /><span>Ontario Programs</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/canada/british-columbia" className="flex items-center p-4 bg-white rounded-lg border hover:border-pink-500 transition-all"><Users className="w-5 h-5 text-purple-600 mr-3" /><span>BC Programs</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/canada/alberta" className="flex items-center p-4 bg-white rounded-lg border hover:border-pink-500 transition-all"><Users className="w-5 h-5 text-blue-600 mr-3" /><span>Alberta Programs</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/canada/quebec" className="flex items-center p-4 bg-white rounded-lg border hover:border-pink-500 transition-all"><Users className="w-5 h-5 text-orange-600 mr-3" /><span>Quebec Programs</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/canada" className="flex items-center p-4 bg-white rounded-lg border hover:border-pink-500 transition-all"><Shield className="w-5 h-5 text-green-600 mr-3" /><span>All Provincial Programs</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Related Funding Guides</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/blog/women-entrepreneurship-loan-fund-canada" className="flex items-center p-4 bg-white rounded-lg border hover:border-emerald-500 transition-all"><DollarSign className="w-5 h-5 text-emerald-600 mr-3" /><span>WELF Loan Fund ($50k)</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/blog/bdc-women-entrepreneurs-financing" className="flex items-center p-4 bg-white rounded-lg border hover:border-emerald-500 transition-all"><Briefcase className="w-5 h-5 text-blue-600 mr-3" /><span>BDC Women Financing</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-gray-900 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6">Don't Get Stuck in the Past</h2>
              <p className="text-xl text-gray-300 mb-10">
                The WEF grant is history. The WELF loan is the present. Move forward with the funding that is actually available.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 font-bold text-lg px-8 py-4 h-auto" asChild>
                  <Link href="/blog/women-entrepreneurship-loan-fund-canada">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Apply for WELF Loan
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
