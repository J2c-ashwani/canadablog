import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, CheckCircle, Clock, FileText, Users, MessageCircle, Rocket, Target, DollarSign, AlertTriangle, TrendingUp, HelpCircle, ArrowRight, BookOpen } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

import ShortAnswerBox from '@/components/blog/ShortAnswerBox';
import EEATBadge from '@/components/blog/EEATBadge';
import EligibleCheck from '@/components/blog/EligibleCheck';
import StickyTOC from '@/components/blog/StickyTOC';
import InlineCTA from '@/components/blog/InlineCTA';

export const metadata: Metadata = {
  title: "SBA Growth Accelerator Fund 2026 | $200K Prizes",
  description: "Guide to the SBA Growth Accelerator Fund Competition (GAFC). Funding for incubators, accelerators, and ecosystem builders supporting STEM/R&D startups.",
  keywords: "SBA growth accelerator fund, GAFC 2025, incubator grants, accelerator funding, ecosystem builder grants, STEM startup support",
  alternates: {
    canonical: "https://www.fsidigital.ca/guides/sba-growth-accelerator-fund-guide",
  },
  openGraph: {
    title: "SBA Growth Accelerator Fund Competition 2026",
    description: "Win up to $200,000 to built your startup ecosystem. Application guide for accelerators and incubators.",
    url: "https://www.fsidigital.ca/guides/sba-growth-accelerator-fund-guide",
    images: ["/og-image.png"],
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Who is eligible for the Growth Accelerator Fund?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Accelerators, incubators, co-working spaces, and non-profits that support STEM/R&D entrepreneurs. You must focus on underserved communities or specific tech themes."
      }
    },
    {
      "@type": "Question",
      "name": "Is this a grant for my startup?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. This funding is for the ORGANIZATIONS (accelerators) that help startups, not the startups themselves. If you are a startup, look for SBIR grants instead."
      }
    },
    {
      "@type": "Question",
      "name": "How much funding is available?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Prizes typically range from $50,000 to $200,000 depending on the stage (Stage 1 vs Stage 2) and the specific theme of the competition year."
      }
    },
    {
      "@type": "Question",
      "name": "What can the funds be used for?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Operating costs, program recruitment, mentor compensation, and prize money for your cohort. Funds cannot be used for direct investing in startups (equity purchases)."
      }
    }
  ]
}

export default function SBAGrowthAcceleratorFundGuide() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-teal-700 to-emerald-900 text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-teal-500/20 text-teal-100 border-teal-400/30 backdrop-blur-sm">
                🏆 Ecosystem Builder Guide
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance tracking-tight">
                SBA Growth Accelerator <br className="hidden md:block" /> Fund (2026)
              </h1>
              
              <div className="text-left mb-6 max-w-4xl mx-auto shadow-sm mt-6 relative z-20">
                 <ShortAnswerBox content="SBA Growth Accelerator Fund Application Guide — Guide to applying for SBA funding supporting business accelerators and incubators." />
              </div>
              <div className="flex justify-center mb-8 relative z-20">
                 <div className="inline-block text-left bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-xl overflow-hidden">
                    <EEATBadge authorName="Ashwani K." authorImage="/author-ashwani.jpg" date="2026-02-25" />
                 </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-teal-900 hover:bg-teal-50 font-bold shadow-lg" asChild>
                  <Link href="#eligibility">
                    Check Eligibility
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-teal-800/50 border-teal-400/30 text-teal-100 hover:bg-teal-800/80 backdrop-blur-sm" asChild>
                  <Link href="/guides/sba-growth-accelerator-fund-guide">
                    Download Template
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <div className="container mx-auto px-4 max-w-4xl my-8"><EligibleCheck /></div>

        <StickyTOC links={[
      { title: 'Overview', id: 'overview' }, { title: 'Eligibility', id: 'eligibility' }, { title: 'How to Apply', id: 'how-to-apply' }, { title: 'Tips', id: 'tips' }
    ]} />


        {/* QUERY HOOK: Common Questions */}
        <div className="bg-white border-b border-teal-100 sticky top-0 z-20 shadow-sm/80 backdrop-blur-md bg-white/90">
          <div className="container mx-auto px-4 py-3">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-teal-900 gap-4">
              <span className="font-semibold text-teal-900 flex items-center shrink-0">
                <Rocket className="w-4 h-4 mr-2 text-teal-600" />
                Topic:
              </span>
              <div className="flex gap-6 overflow-x-auto no-scrollbar whitespace-nowrap mask-linear-fade">
                <Link href="#structure" className="hover:text-teal-700 transition-colors flex items-center gap-1"><TrendingUp className="w-3 h-3" /> Prizes</Link>
                <Link href="#eligibility" className="hover:text-teal-700 transition-colors flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Who Can Apply</Link>
                <Link href="#process" className="hover:text-teal-700 transition-colors flex items-center gap-1"><Clock className="w-3 h-3" /> Timeline</Link>
                <Link href="#faq" className="hover:text-teal-700 transition-colors flex items-center gap-1"><HelpCircle className="w-3 h-3" /> FAQs</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Reference Stats */}
        <section className="py-12 bg-white border-b border-teal-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center divide-x divide-teal-50">
                <div className="p-4">
                  <div className="text-3xl font-bold text-teal-600 mb-2">$50K+</div>
                  <div className="text-teal-800 text-sm font-medium uppercase tracking-wide">Base Prize</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-purple-600 mb-2">$3M</div>
                  <div className="text-teal-800 text-sm font-medium uppercase tracking-wide">Total Pool</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-green-600 mb-2">2 Stages</div>
                  <div className="text-teal-800 text-sm font-medium uppercase tracking-wide">Competition Format</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-orange-600 mb-2">Annual</div>
                  <div className="text-teal-800 text-sm font-medium uppercase tracking-wide">Frequency</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section id="structure" className="py-16 bg-teal-50/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">

              <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Competition Structure</h2>

              <div className="space-y-8">
                {/* Stage 1 */}
                <Card className="border-l-4 border-l-purple-600 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Target className="w-8 h-8 text-purple-600" />
                        <CardTitle className="text-xl">Stage 1: The Catalyst</CardTitle>
                      </div>
                      <Badge variant="secondary" className="bg-purple-100 text-purple-800">$50,000 Prize</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      Focuses on your <strong>strategy</strong>. You win this by submitting a killer video pitch and slide deck showing how you will foster connections for STEM entrepreneurs.
                    </p>
                    <div className="bg-white border border-purple-100 p-4 rounded-lg">
                      <strong className="text-purple-800 block mb-2">Deliverables:</strong>
                      <div className="grid grid-cols-2 gap-4 text-sm text-slate-600">
                        <div className="flex items-center"><CheckCircle className="w-4 h-4 text-purple-500 mr-2" /> 90-Second Video</div>
                        <div className="flex items-center"><CheckCircle className="w-4 h-4 text-purple-500 mr-2" /> 10-Slide Deck</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Stage 2 */}
                <Card className="border-l-4 border-l-teal-600 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <TrendingUp className="w-8 h-8 text-teal-600" />
                        <CardTitle className="text-xl">Stage 2: The Accelerator</CardTitle>
                      </div>
                      <Badge variant="secondary" className="bg-teal-100 text-teal-800">$50k - $150k Bonus</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      Focuses on <strong>execution</strong>. Only Stage 1 winners can apply. You win this by proving you built the partnerships you promised in Stage 1.
                    </p>
                    <div className="text-sm bg-teal-50 p-3 rounded text-teal-800">
                      <strong>Goal:</strong> Foster R&D innovation (SBIR/STTR) readiness in your cohort.
                    </div>
                  </CardContent>
                </Card>

              </div>
            </div>
          </div>
        </section>

        {/* Eligibility Section */}
        <section id="eligibility" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              
        <div className="container mx-auto px-4 max-w-4xl my-12"><InlineCTA {...{
      description: "Not sure which SBA program fits? Our funding specialists match you to the right opportunity.",
    }} /></div>
<h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Are You Eligible?</h2>
              <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
                This is NOT for individual startups. This is for the "Ecosystem Builders" who help startups succeed.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700">Eligible Entities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span className="text-sm text-slate-700"><strong>Accelerators & Incubators:</strong> Established programs.</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span className="text-sm text-slate-700"><strong>Universities:</strong> Education entrepreneurship centers.</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span className="text-sm text-slate-700"><strong>Non-Profits:</strong> 501(c)(3) serving founders.</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <span className="text-sm text-slate-700"><strong>Co-Working Spaces:</strong> With structured programming.</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border-red-200">
                  <CardHeader>
                    <CardTitle className="text-red-700">Focus Areas (Must Have)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Target className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span className="text-sm text-slate-700"><strong>STEM/R&D focus:</strong> You must help startups that are relevant to national security, manufacturing, climate, etc.</span>
                      </li>
                      <li className="flex items-start">
                        <Target className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                        <span className="text-sm text-slate-700"><strong>Underserved:</strong> Priority strategies supporting women, minority, or rural founders.</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Common Questions Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Common Questions About the Growth Accelerator Fund</h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">1. What is the difference between Stage 1 and Stage 2 prizes?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Stage 1 (The Catalyst) is awarded based on your <strong>proposal</strong> and ability to articulate a strategy for connecting STEM entrepreneurs. It is typically a $50,000 cash prize. Stage 2 (The Accelerator) is a follow-on prize awarded only to Stage 1 winners who successfully execute their proposed activities and demonstrate impact. Stage 2 prizes range from $50,000 to $150,000.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">2. Can I use GAFC funds to invest in startups?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    No. This is a critical distinction. The funds are for <strong>operating costs</strong> of your accelerator organization (e.g., staff salaries, mentor fees, marketing, venue rental). You cannot use the prize money to take equity in startups or provide direct capital investment into the portfolio companies.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">3. Do I need to be a non-profit to apply?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    No. Both for-profit and non-profit entities are eligible. This includes private accelerators, university-backed incubators, co-working spaces, and economic development organizations. The key requirement is that you serve entrepreneurs in STEM/R&D.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">4. What counts as a STEM/R&D focus?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Your program should support entrepreneurs working in Science, Technology, Engineering, or Math. This is broadly defined but often aligns with SBIR/STTR topic areas such as biotechnology, advanced manufacturing, artificial intelligence, clean energy, or national security technologies.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">5. How competitive is the GAFC?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    It is moderately competitive. In recent years, the SBA has awarded roughly 40-60 Stage 1 prizes annually. Success depends heavily on your ability to reach specific underserved communities (rural, women, minority) or address specific geography gaps identified by the <a href="https://www.sba.gov/partners/incubators-accelerators-growth-accelerator-fund-competition" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">SBA's verified list</a>.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">6. Can I apply if I am a new accelerator?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Yes, but you must demonstrate an existing capacity to serve. While you don't need a 10-year track record, you generally need more than just an idea. You should have a legal entity formed and a clear plan for recruitment and programming.
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
              <h3 className="text-xl font-bold text-slate-900 mb-6">Explore More Funding</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <Link href="/guides/apply-sbir-grants" className="group block h-full">
                  <div className="bg-white border hover:border-blue-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-blue-600 font-semibold mb-2">Startup Grants</div>
                    <h4 className="font-bold text-slate-900 group-hover:text-blue-700 mb-2">SBIR Guide</h4>
                    <p className="text-sm text-slate-500 flex-grow">The grants your cohort needs.</p>
                    <div className="mt-3 text-xs text-blue-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
                <Link href="/guides/apply-regional-development-agencies" className="group block h-full">
                  <div className="bg-white border hover:border-purple-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-purple-600 font-semibold mb-2">Ecosystem</div>
                    <h4 className="font-bold text-slate-900 group-hover:text-purple-700 mb-2">Regional Development</h4>
                    <p className="text-sm text-slate-500 flex-grow">Canadian ecosystem funding.</p>
                    <div className="mt-3 text-xs text-purple-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
                <Link href="/guides/apply-sba-loans" className="group block h-full">
                  <div className="bg-white border hover:border-green-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-green-600 font-semibold mb-2">Loans</div>
                    <h4 className="font-bold text-slate-900 group-hover:text-green-700 mb-2">SBA Loans</h4>
                    <p className="text-sm text-slate-500 flex-grow">Capital for your graduates.</p>
                    <div className="mt-3 text-xs text-green-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-left">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                <HelpCircle className="w-6 h-6 text-teal-600 mr-2" />
                GAFC FAQs
              </h2>
              <div className="divide-y divide-teal-100">
                <div className="py-4">
                  <h3 className="font-bold text-slate-900 mb-2">When do applications open?</h3>
                  <p className="text-slate-600 text-sm">Historically, the competition opens in <strong>January</strong> with Stage 1 submissions due in late February or March.</p>
                </div>
                <div className="py-4">
                  <h3 className="font-bold text-slate-900 mb-2">Is the video pitch public?</h3>
                  <p className="text-slate-600 text-sm">Typically, no. It is submitted for judge review. However, winning organizations often have their profiles shared publicly by the SBA.</p>
                </div>
                <div className="py-4">
                  <h3 className="font-bold text-slate-900 mb-2">Can I apply if I won before?</h3>
                  <p className="text-slate-600 text-sm">Yes! Past winners are eligible to apply again, provided they have met the reporting requirements of their previous award.</p>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-teal-900 to-emerald-900 text-white text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Build Your Ecosystem</h2>
            <p className="text-lg text-teal-200 mb-8 max-w-2xl mx-auto">
              Ready to submit your Stage 1 deck? We help incubators craft winning narratives.
            </p>
            <Button size="lg" className="bg-white text-teal-900 hover:bg-teal-50 font-semibold shadow-lg" asChild>
              <Link href="/contact?service=accelerator-grant-writing">
                Get Proposal Help
              </Link>
            </Button>
          </div>
        </section>

      </div>
      <Footer />
    </>
  )
}
