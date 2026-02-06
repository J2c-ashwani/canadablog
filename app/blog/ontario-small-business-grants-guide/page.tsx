import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, DollarSign, Target, MapPin, Users, Zap, Shield, Award, HelpCircle, ExternalLink, ArrowRight, AlertTriangle, Lightbulb, Factory, Briefcase, GraduationCap } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ontario Small Business Grants 2026 | $5k Starter Company & Funding",
  description: "Complete 2026 guide to Ontario government grants. Apply for Starter Company Plus ($5,000), Summer Company ($3,000), and regional funds (SWODF/EODF) for business growth.",
  keywords: "Ontario small business grants, Starter Company Plus, Summer Company program, digital main street grant, SWODF EODF funding, Ontario business loans",
}

export default function OntarioSmallBusinessGrantsGuide() {
  const faqData = [
    {
      question: "Is the Ontario Small Business Support Grant still open?",
      answer: "No. The massive COVID-era 'Support Grant' ($10k-$20k) is permanently closed. In 2026, funding is targeted: specifically for Youth, Digital Adoption, or Manufacturing. There is no 'general' free money just for existing."
    },
    {
      question: "What is Starter Company Plus?",
      answer: "This is Ontario's flagship program for adults (18+). It provides training, mentorship, and a grant of up to $5,000. It is administered by local Small Business Enterprise Centres (SBECs)."
    },
    {
      question: "How do I apply for Summer Company?",
      answer: "Summer Company is for students aged 15-29 returning to school. It offers up to $3,000 ($1,500 upfront, $1,500 on completion) to run a summer business. Applications usually open in March/April."
    },
    {
      question: "What happened to Digital Main Street?",
      answer: "The Digital Main Street (DMS) $2,500 grant runs in cohorts. It often pauses when funding is exhausted and re-opens later. Always check your local Digital Service Squad for current status."
    },
    {
      question: "Are there grants for manufacturing in Ontario?",
      answer: "Yes. The Advanced Manufacturing and Innovation Competitiveness (AMIC) stream and regional funds (SWODF/EODF) provide significant funding (often 15% coverage) for equipment and expansion."
    },
    {
      question: "What is the difference between FedDev and FedNor?",
      answer: "FedDev Ontario covers Southern Ontario (Toronto, London, Ottawa). FedNor covers Northern Ontario (Sudbury, Thunder Bay). They offer similar programs but have different budgets and priorities."
    },
    {
      question: "Can I get funding to hire staff?",
      answer: "Yes, through 'Employment Ontario' programs. They can cover significantly more than federal grants—sometimes up to 50-90% of wages for apprentices or youth facing barriers."
    },
    {
      question: "Do I have to pay back the $5,000 Starter Company grant?",
      answer: "No, it is a grant. However, you must complete the mandatory training and pitch your business plan to a local committee to 'win' it. It is competitive."
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
        <section className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-blue-500/20 text-blue-100 border-blue-400/30 px-4 py-1.5 text-sm uppercase tracking-wide">
                🇨🇦 Ontario Business Ecosystem
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                Ontario Business Grants 2026: <span className="text-blue-400">Beyond "Summer Company"</span>
              </h1>
              <p className="text-xl text-blue-100 mb-10 leading-relaxed max-w-3xl mx-auto">
                Ontario has the most complex funding landscape in Canada. From the <strong>$5,000 Starter Company Plus</strong> to massive <strong>SWODF/EODF</strong> expansion funds, we break down what is actually open.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white hover:bg-gray-100 text-blue-900 font-bold text-lg px-10 py-6 shadow-xl" asChild>
                  <Link href="#starter-company">
                    Starter Company ($5k)
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-blue-400/50 text-white hover:bg-blue-900/50 font-semibold text-lg px-10 py-6" asChild>
                  <Link href="#regional-funds">
                    Regional Funds (Millions)
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* The "SBEC" Alert */}
        <section className="py-12 bg-white -mt-8 relative z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg shadow-sm">
                <div className="flex items-start">
                  <MapPin className="w-8 h-8 text-orange-600 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-orange-900 mb-2">The Golden Key: Your Local "SBEC"</h3>
                    <p className="text-orange-800 mb-4">
                      Most entry-level Ontario grants (Starter Company, Summer Company) are NOT administered by Toronto. They are run by your local <strong>Small Business Enterprise Centre (SBEC)</strong>.
                    </p>
                    <p className="text-orange-800">
                      <strong>Action Item:</strong> Search "SBEC near [Your City]" (e.g., Invest Ottawa, London SBEC, Toronto Enterprise Toronto). You MUST apply through them.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: Starter Company Plus */}
        <section id="starter-company" className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">1. Starter Company Plus</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  The best program for launching or expanding a small business in Ontario. It combines money with mandatory mentorship.
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-12 items-start">
                <div className="flex-1">
                  <div className="bg-indigo-50 border border-indigo-100 p-8 rounded-2xl mb-8">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-indigo-900">The Deal</h3>
                      <Badge className="bg-indigo-600 text-white text-lg px-4 py-1">$5,000 Grant</Badge>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2">Who is it for?</h4>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 text-indigo-500 mr-2" /> 18+ Ontario Residents</li>
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 text-indigo-500 mr-2" /> Not in school full-time</li>
                          <li className="flex items-center"><CheckCircle className="w-4 h-4 text-indigo-500 mr-2" /> Launching OR Expanding</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2">What you commit to:</h4>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li className="flex items-center"><AlertTriangle className="w-4 h-4 text-indigo-500 mr-2" /> 3-6 months mentorship</li>
                          <li className="flex items-center"><AlertTriangle className="w-4 h-4 text-indigo-500 mr-2" /> Write a full Business Plan</li>
                          <li className="flex items-center"><AlertTriangle className="w-4 h-4 text-indigo-500 mr-2" /> "Pitch" for the money</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h3 className="font-bold text-gray-900 mb-3">Comparison: Summer Company</h3>
                  <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg">
                    <table className="min-w-full text-sm text-left">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="p-4 font-bold text-gray-900">Feature</th>
                          <th className="p-4 font-bold text-indigo-700">Starter Company Plus</th>
                          <th className="p-4 font-bold text-orange-700">Summer Company</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        <tr>
                          <td className="p-4 font-medium">Age</td>
                          <td className="p-4">18+ (Adults)</td>
                          <td className="p-4">15-29 (Students)</td>
                        </tr>
                        <tr>
                          <td className="p-4 font-medium">Amount</td>
                          <td className="p-4">$5,000</td>
                          <td className="p-4">$3,000</td>
                        </tr>
                        <tr>
                          <td className="p-4 font-medium">Requirement</td>
                          <td className="p-4">Business Plan Training</td>
                          <td className="p-4">Returning to school in Fall</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Regional Development Funds */}
        <section id="regional-funds" className="py-20 bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center mb-8">
                <MapPin className="w-10 h-10 text-emerald-600 mr-4" />
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">2. The "Acronym" Funds (SWODF, EODF, NOHFC)</h2>
                  <p className="text-gray-600">Where the BIG money lives ($100k+)</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                <p className="text-gray-700 text-lg mb-8">
                  Ontario is divided into economic zones. Each zone has a "Development Fund" (ODF). These are for <strong>Growth and Expansion</strong> projects that create jobs.
                </p>

                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="border-emerald-100 bg-emerald-50/50">
                    <CardHeader><CardTitle className="text-emerald-900">SWODF</CardTitle></CardHeader>
                    <CardContent>
                      <p className="font-bold text-sm mb-2">Southwestern Ontario</p>
                      <p className="text-xs text-gray-600 mb-4">(London, Waterloo, Windsor)</p>
                      <p className="text-emerald-700 font-bold text-lg">15% Grant</p>
                      <p className="text-xs text-gray-500">On projects &gt;$500k</p>
                    </CardContent>
                  </Card>
                  <Card className="border-emerald-100 bg-emerald-50/50">
                    <CardHeader><CardTitle className="text-emerald-900">EODF</CardTitle></CardHeader>
                    <CardContent>
                      <p className="font-bold text-sm mb-2">Eastern Ontario</p>
                      <p className="text-xs text-gray-600 mb-4">(Ottawa, Kingston, Peterborough)</p>
                      <p className="text-emerald-700 font-bold text-lg">15% Grant</p>
                      <p className="text-xs text-gray-500">On projects &gt;$500k</p>
                    </CardContent>
                  </Card>
                  <Card className="border-emerald-100 bg-emerald-50/50">
                    <CardHeader><CardTitle className="text-emerald-900">NOHFC</CardTitle></CardHeader>
                    <CardContent>
                      <p className="font-bold text-sm mb-2">Northern Ontario</p>
                      <p className="text-xs text-gray-600 mb-4">(Sudbury, Thunder Bay)</p>
                      <p className="text-emerald-700 font-bold text-lg">Up to 50%</p>
                      <p className="text-xs text-gray-500">Generous conditional contributions</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-8 bg-emerald-50 p-6 rounded-lg border border-emerald-100">
                  <h4 className="font-bold text-emerald-900 mb-2">The "15% Rule"</h4>
                  <p className="text-sm text-gray-700">
                    Typically, these funds cover 10-15% of eligible costs for a massive expansion (e.g., building a factory). If you spend $1M, you might get a $150k grant (or forgivable loan).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Deep Dive Text Content - SEO & Authority */}
        <section className="py-20 bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto prose prose-lg prose-blue text-gray-700">
              <h2>The "Golden Horseshoe" Myth (And Where to Actually Look)</h2>
              <p>
                A common misconception is that all the money is in Toronto. In reality, the Ontario government incentivizes businesses to <strong>leave Toronto</strong>.
              </p>
              <p>
                If you launch a startup in downtown Toronto, you are competing with 10,000 others. If you launch in <strong>Peterborough (Eastern Ontario)</strong> or <strong>Sarnia (Southwestern Ontario)</strong>, you qualify for arguably the two best regional funds in Canada: EODF and SWODF.
              </p>

              <h3>1. Mastering SWODF / EODF</h3>
              <p>
                These funds are for "Scale-ups," not startups. You generally need to have 3 years of financials.
              </p>
              <ul>
                <li><strong>The "Job Creation" Math:</strong> The province calculates the "ROI" of your grant based on tax revenue from new employees. If you ask for $100k but only plan to hire 1 person at minimum wage, you will be rejected. You generally need to show 5-10 net new high-paying jobs to unlock the six-figure grants.</li>
                <li><strong>Stacking Rule:</strong> You can stack this with federal loans (like BDC), but usually not with other provincial grants.</li>
              </ul>

              <h3>2. Youth Entrepreneurship: Summer Company</h3>
              <p>
                If you are aged 15-29, Ontario is a goldmine.
              </p>
              <p>
                The <strong>Summer Company</strong> program is unique because it combines a $1,500 upfront grant (for startup costs) with a $1,500 completion award (for tuition/savings).
              </p>
              <h4>The Strategy:</h4>
              <p>
                Do not just write a generic "Lawn Care" business plan using ChatGPT. The local committees see 50 of those. To win, pitch a business that solves a <em>local</em> problem.
                <br />
                <em>Example:</em> Instead of "General Lawn Care," pitch "Invasive Species Removal for Local Cottages." It shows market research and differentiation.
              </p>

              <h3>3. Digital Main Street (DMS) 4.0</h3>
              <p>
                While the main $2,500 Digital Transformation Grant comes and goes, the <strong>"ShopHERE"</strong> program is often always open.
              </p>
              <p>
                This program literally builds your Shopify store for you. It is provided by students/interns funded by the government.
                <br />
                <strong>Value:</strong> A basic Shopify setup agency charges $5,000+. You get this for free. Even if you don't get the cash grant, <em>take the free labour</em>.
              </p>

              <h3>4. Futurepreneur Ontario</h3>
              <p>
                While federal, Futurepreneur has a massive footprint in Ontario. Their "Side Hustle" program allows you to keep your day job while accessing a $15k loan to test your idea.
              </p>
              <p>
                <strong>Why this matters:</strong> Banks will not lend to a side hustle. Futurepreneur will. It is the only way to validate a concept without quitting your job and risking your mortgage.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Manufacturing (AMIC) */}
        <section className="py-20 bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center mb-8">
                <Factory className="w-10 h-10 text-gray-700 mr-4" />
                <h2 className="text-3xl font-bold text-gray-900">3. Manufacturing (AMIC)</h2>
              </div>
              <p className="text-lg text-gray-600 mb-10 max-w-3xl">
                The updated <strong>Advanced Manufacturing and Innovation Competitiveness (AMIC)</strong> stream is critical for Ontario's industrial base.
              </p>

              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="font-bold text-xl mb-4">What it funds:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-blue-500 mr-3 mt-1" />
                      <span className="text-gray-700">New Equipment & Machinery</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-blue-500 mr-3 mt-1" />
                      <span className="text-gray-700">ERP Software Implementation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-blue-500 mr-3 mt-1" />
                      <span className="text-gray-700">Facility Retrofits (Energy Efficiency)</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-100 p-6 rounded-xl">
                  <h3 className="font-bold text-xl mb-4">Eligibility</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Must have at least 3 years of financial statements and significantly employ Ontarians.
                  </p>
                  <Button variant="outline" className="w-full bg-white">
                    Check AMIC Guide
                  </Button>
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
                      <HelpCircle className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
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
        <section className="py-24 bg-blue-900 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6">Find Your Local SBEC</h2>
              <p className="text-xl text-blue-100 mb-10">
                You cannot access Starter Company Plus without contacting your local Small Business Enterprise Centre.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 font-bold text-lg px-8 py-4 h-auto" asChild>
                  <Link href="https://www.ontario.ca/page/small-business-enterprise-centre-locations" target="_blank" rel="noopener noreferrer">
                    <MapPin className="w-5 h-5 mr-2" />
                    Locate SBEC Near Me
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-blue-400 text-blue-100 hover:bg-blue-800 hover:text-white font-semibold text-lg px-8 py-4 h-auto" asChild>
                  <Link href="/blog/canada-hiring-training-grants-guide">
                    Explore Hiring Incentives
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
