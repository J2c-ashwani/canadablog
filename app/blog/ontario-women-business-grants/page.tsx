import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, DollarSign, Target, Heart, Users, Megaphone, Shield, Award, HelpCircle, ExternalLink, ArrowRight, AlertTriangle, Lightbulb, Star, Briefcase } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ontario Women Business Grants 2026 | $50k Loans & Funding",
  description: "Complete 2026 guide to funding for women entrepreneurs in Ontario. Learn about PARO Peer Circles, the Women Entrepreneurship Loan Fund (WELF), and private grants from Visa and Amex.",
  keywords: "Ontario women business grants, women entrepreneur funding Canada, PARO Centre for Women's Enterprise, Women Entrepreneurship Loan Fund, WELF loan, Microlending for women",
}

export default function OntarioWomenBusinessGrants() {
  const faqData = [
    {
      question: "Are there specific government grants just for women?",
      answer: "Direct 'free money' grants solely for being a woman are rare. Most federal funding comes in the form of LOANS (WELF) needs-based support. However, 'Ecosystem' partners like PARO often have micro-grants or subsidized training."
    },
    {
      question: "What is the Women Entrepreneurship Loan Fund (WELF)?",
      answer: "WELF is a national program providing loans of up to $50,000 to women entrepreneurs. In Ontario, it is often delivered through partners like PARO or Coralus (formerly SheEO)."
    },
    {
      question: "How do PARO Peer Lending Circles work?",
      answer: "It is a unique 'SocialCollateral' model. 4 to 7 women form a circle. You approve each other's loans (up to $5,000, then $10,000). If one person defaults, the circle supports them. It requires NO personal credit check/collateral."
    },
    {
      question: "Can I get funding for a home-based business?",
      answer: "Yes! Peer lending and micro-loans (like Rise) are specifically designed for home-based, solo-preneurs, or side hustles that banks ignore."
    },
    {
      question: "Do banks have special programs for women?",
      answer: "Yes. BMO (Celebrating Women), Scotiabank (The Scotiabank Women Initiative), and RBC all have specialized account managers and mentorship programs. They sometimes offer slightly looser lending criteria or fee waivers."
    },
    {
      question: "When do the Visa/Amex grants open?",
      answer: "Private corporate grants (Visa She's Next, Amex Blueprint) usually open annually for short windows (e.g., 4 weeks in Spring or Fall). You must be on their newsletter lists to catch them."
    },
    {
      question: "Is there funding for childcare while I work?",
      answer: "Directly for business? No. But the national $10/day childcare program is the government's primary economic driver to help mothers return to the workforce/entrepreneurship."
    },
    {
      question: "What is StrikeUP?",
      answer: "StrikeUP is a massive digital conference for women entrepreneurs in Canada. While not a grant, it provides access to the ecosystem partners who HOLD the money."
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
        <section className="bg-gradient-to-br from-pink-900 to-rose-900 text-white py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-pink-500/20 text-pink-100 border-pink-400/30 px-4 py-1.5 text-sm uppercase tracking-wide">
                👩‍💼 Women Entrepreneurship Strategy (WES)
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                Ontario Women's Funding: <span className="text-pink-400">Beyond the "Glass Ceiling"</span>
              </h1>
              <p className="text-xl text-pink-100 mb-10 leading-relaxed max-w-3xl mx-auto">
                The landscape has changed. In 2026, funding isn't just about "Grants"; it's about <strong>Peer Lending Circles</strong>, <strong>Gender-Lens Investing</strong>, and the <strong>$50k WELF Loan</strong>.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white hover:bg-gray-100 text-pink-900 font-bold text-lg px-10 py-6 shadow-xl" asChild>
                  <Link href="#welf-loan">
                    WELF Loan ($50k)
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-pink-400/50 text-white hover:bg-pink-900/50 font-semibold text-lg px-10 py-6" asChild>
                  <Link href="#paro-circles">
                    PARO Peer Circles
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* The "Ecosystem" Alert */}
        <section className="py-12 bg-white -mt-8 relative z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="bg-rose-50 border-l-4 border-rose-500 p-6 rounded-r-lg shadow-sm">
                <div className="flex items-start">
                  <Heart className="w-8 h-8 text-rose-600 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-rose-900 mb-2">The "Network Effect" of Funding</h3>
                    <p className="text-rose-800 mb-4">
                      Women-focused funding in Canada is highly relational. You rarely just "submit a form". You join a community (like PARO or Coralus).
                    </p>
                    <p className="text-rose-800">
                      <strong>Why?</strong> The data shows women pay back loans at higher rates when supported by peers. The "Peer Circle" model leverages this trust to bypass traditional credit checks.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: PARO Peer Circles */}
        <section id="paro-circles" className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Masterclass: PARO Peer Lending Circles</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Forget credit scores. In a PARO circle, your "Character" is your collateral. This is the single most accessible funding for Ontario women.
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-12 items-start">
                <div className="flex-1">
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <Card className="border-pink-100 bg-pink-50/50">
                      <CardHeader><CardTitle className="text-pink-900">How it Works</CardTitle></CardHeader>
                      <CardContent>
                        <ol className="list-decimal list-inside space-y-3 text-sm text-gray-700">
                          <li><strong>Form a Circle:</strong> Find 4-7 other trusted women entrepreneurs.</li>
                          <li><strong>Meet Monthly:</strong> Share advice, support, and updates.</li>
                          <li><strong>Approve Loans:</strong> The circle votes to approve each member's loan application.</li>
                        </ol>
                      </CardContent>
                    </Card>
                    <Card className="border-purple-100 bg-purple-50/50">
                      <CardHeader><CardTitle className="text-purple-900">The Money Ladder</CardTitle></CardHeader>
                      <CardContent>
                        <ul className="space-y-3 text-sm text-gray-700">
                          <li className="flex items-center"><CheckCircle className="w-3 h-3 text-purple-600 mr-2" /> <strong>Step 1:</strong> borrowing up to $1,000</li>
                          <li className="flex items-center"><CheckCircle className="w-3 h-3 text-purple-600 mr-2" /> <strong>Step 2:</strong> borrowing up to $2,000</li>
                          <li className="flex items-center"><CheckCircle className="w-3 h-3 text-purple-600 mr-2" /> <strong>Step 3:</strong> borrowing up to $5,000+</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <h4 className="font-bold text-gray-900 mb-4">Why use this instead of a bank?</h4>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 mt-1" />
                        <div>
                          <strong className="text-gray-900">No Collateral Required:</strong>
                          <p className="text-sm text-gray-600">You don't need to put your house on the line. The "Collateral" is the trust of your circle.</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 mt-1" />
                        <div>
                          <strong className="text-gray-900">Mentorship Built-In:</strong>
                          <p className="text-sm text-gray-600">Your "Lenders" are also your advisors. They *want* you to succeed so the circle stays healthy.</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: WELF Loan */}
        <section id="welf-loan" className="py-20 bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center mb-8">
                <Target className="w-10 h-10 text-pink-600 mr-4" />
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">2. Women Entrepreneurship Loan Fund (WELF)</h2>
                  <p className="text-gray-600">The "Micro-Loan" Graduate Program</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <p className="text-gray-700 text-lg mb-6">
                      If you need more than the $5k from a Peer Circle, WELF steps in. The government gave capital to delivery partners to lend to women who might not fit "Standard Bank" boxes.
                    </p>
                    <div className="space-y-4">
                      <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-gray-700">Max Loan Amount:</span>
                        <span className="font-bold text-pink-700">$50,000</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-gray-700">Typical Term:</span>
                        <span className="font-bold text-gray-900">5 Years</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-gray-700">Use of Funds:</span>
                        <span className="font-bold text-gray-900">Equipment, Inventory, Marketing (Working Capital)</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-pink-50/50 p-6 rounded-xl border border-pink-100">
                    <h4 className="font-bold text-pink-900 mb-4">Where to Apply (Ontario)</h4>
                    <p className="text-sm text-gray-600 mb-4">You cannot apply at a bank. You must go through these partners:</p>
                    <ul className="space-y-3">
                      <li className="flex items-center bg-white p-3 rounded shadow-sm">
                        <ExternalLink className="w-4 h-4 text-pink-500 mr-2" />
                        <strong>PARO Centre</strong> (Northern/Eastern Ontario)
                      </li>
                      <li className="flex items-center bg-white p-3 rounded shadow-sm">
                        <ExternalLink className="w-4 h-4 text-pink-500 mr-2" />
                        <strong>Coralus (SheEO)</strong> (Innovative/Social Impact focus)
                      </li>
                      <li className="flex items-center bg-white p-3 rounded shadow-sm">
                        <ExternalLink className="w-4 h-4 text-pink-500 mr-2" />
                        <strong>Northumberland CFDC</strong> (DELIA program)
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
            <div className="max-w-4xl mx-auto prose prose-lg prose-pink text-gray-700">
              <h2>The "Gender Gap" in Lending (And How to Fix It)</h2>
              <p>
                Women entrepreneurs in Canada face a "Double Valley of Death." Not only do you face the standard startup risks, but data from <em>Statistics Canada</em> consistently shows that women-owned businesses are rejected for lending at a rate 15-20% higher than their male counterparts, even with identical credit scores.
              </p>
              <p>
                The <strong>Women Entrepreneurship Strategy (WES)</strong> was designed to fix this system failure. It is not "Charity"; it is economic correction.
              </p>

              <h3>1. The "Social Collateral" Revolution</h3>
              <p>
                Traditional banks rely on "Financial Collateral" (houses, cars, inventory). But many women entrepreneurs run service-based businesses (Consulting, Design, Health) that have no physical assets.
              </p>
              <p>
                Organizations like <strong>PARO</strong> and <strong>Coralus</strong> flipped this model. They use "Social Collateral."
              </p>
              <ul>
                <li><strong>The Theory:</strong> You are less likely to default on a loan if it means letting down 6 other women in your circle than you are to default on a faceless bank algorithm.</li>
                <li><strong>The Result:</strong> Repayment rates for Peer Lending Circles are consistently over 95%, often higher than traditional bank loans.</li>
              </ul>

              <h3>2. Mastering the WELF Application</h3>
              <p>
                The $50,000 WELF loan is competitive. To win, you must frame your business correctly.
              </p>
              <h4>What they look for:</h4>
              <ol>
                <li><strong>Viability over Velocity:</strong> Unlike VCs who want 10x growth, WELF lenders want "Sustainability." Show them how you will reliably generate $5k/month, not how you <em>might</em> generate $1M/month.</li>
                <li><strong>Community Impact:</strong> Are you hiring other women? Are you solving a local problem? WELF has a mandate to support "Equality." Lean into that story.</li>
                <li><strong>Resilience:</strong> Explain how you pivot. Women-owned businesses survived the pandemic at higher rates because they pivoted faster. Highlight your adaptability.</li>
              </ol>

              <h3>3. The "C-Suite" Mentality</h3>
              <p>
                Many women undersell their titles. In your grant applications, do not call yourself a "Freelancer" or "Owner." Call yourself the <strong>CEO</strong>.
              </p>
              <p>
                <strong>Why?</strong>
                <br />
                Grants like the <strong>Visa She's Next</strong> program scan applications for ambition. Using "CEO" signals that you are building an enterprise, not just a job for yourself. It changes the psychology of the reviewer.
              </p>

              <h3>4. Stacking: The Ultimate Strategy</h3>
              <p>
                Can you combine these? Yes.
              </p>
              <ul>
                <li><strong>Stage 1:</strong> Join a PARO Circle. Borrow $5k. Pay it back. (Builds Trust).</li>
                <li><strong>Stage 2:</strong> Use that track record to apply for the $50k WELF loan. (Builds Scale).</li>
                <li><strong>Stage 3:</strong> Use the $50k as "Matching Funds" to apply for larger federal grants like CDAP or CanExport.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3: Private Sector Grants */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Corporate "Free Money" (Private Grants)</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Big brands love to support women entrepreneurs. These are true GRANTS (non-repayable), but they are highly competitive.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <Card className="hover:shadow-lg transition-shadow border-blue-200">
                  <CardHeader>
                    <Star className="w-10 h-10 text-blue-600 mb-2" />
                    <CardTitle className="text-lg">Visa She's Next</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-blue-700 mb-2">$10,000</p>
                    <p className="text-sm text-gray-600 mb-4">+ Coaching. Usually opens twice a year.</p>
                    <Badge variant="outline">High Volume Lottery</Badge>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow border-indigo-200">
                  <CardHeader>
                    <Award className="w-10 h-10 text-indigo-600 mb-2" />
                    <CardTitle className="text-lg">Amex Blueprint</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-indigo-700 mb-2">$10,000</p>
                    <p className="text-sm text-gray-600 mb-4">Often focused on BIPOC women entrepreneurs.</p>
                    <Badge variant="outline">Mentorship Focus</Badge>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow border-yellow-200">
                  <CardHeader>
                    <Megaphone className="w-10 h-10 text-yellow-600 mb-2" />
                    <CardTitle className="text-lg">Telus #StandWithOwners</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-yellow-700 mb-2">$25k - $100k</p>
                    <p className="text-sm text-gray-600 mb-4">Tech/Innovation focused prize packages.</p>
                    <Badge variant="outline">Tech Focus</Badge>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Investment Readiness (WES Ecosystem) */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-10">The WES Ecosystem</h2>
              <p className="text-lg text-gray-300 text-center mb-12">
                The "Women Entrepreneurship Strategy" (WES) put millions into "Ecosystem Fund" organizations. These orgs provide critical <strong>Investment Readiness Training</strong>.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                  <h4 className="font-bold text-white mb-2">Coralus (Formerly SheEO)</h4>
                  <p className="text-sm text-gray-400">Radical generosity model. Interest-free loans funded by "Activators". Focus on social impact and sustainability.</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                  <h4 className="font-bold text-white mb-2">The Forum</h4>
                  <p className="text-sm text-gray-400">Pitch for the Purse. Massive education programs on how to raise capital and structure your business.</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                  <h4 className="font-bold text-white mb-2">IWEF (Indigenous Women)</h4>
                  <p className="text-sm text-gray-400">Specific micro-loans and grants for Indigenous women entrepreneurs. Often administered by CCAB.</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                  <h4 className="font-bold text-white mb-2">Rise</h4>
                  <p className="text-sm text-gray-400">Mental health focus. If you identify as having a mental health challenge, Rise offers low-barrier loans and mentorship.</p>
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
                      <HelpCircle className="w-5 h-5 text-pink-500 mr-3 mt-0.5 flex-shrink-0" />
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 pl-8">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-pink-900 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6">Join a Circle Today</h2>
              <p className="text-xl text-pink-100 mb-10">
                You don't have to build your business alone. The PARO network is the strongest women's business community in Ontario.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button size="lg" className="bg-white text-pink-900 hover:bg-pink-50 font-bold text-lg px-8 py-4 h-auto" asChild>
                  <Link href="https://paro.ca/peer-circles/" target="_blank" rel="noopener noreferrer">
                    <Users className="w-5 h-5 mr-2" />
                    Find a PARO Circle
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-pink-400 text-pink-100 hover:bg-pink-800 hover:text-white font-semibold text-lg px-8 py-4 h-auto" asChild>
                  <Link href="/blog/canada-startup-funding-grants-guide">
                    See General Startup Grants
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
