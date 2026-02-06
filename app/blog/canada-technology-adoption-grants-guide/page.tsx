import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, DollarSign, Target, Smartphone, Laptop, ShoppingCart, Server, Shield, Award, HelpCircle, ExternalLink, ArrowRight, AlertTriangle, Lightbulb, Monitor, Globe, Map } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Canada Digital Adoption Program (CDAP) 2026 Guide | $2400 Grants & Alternatives",
  description: "Complete 2026 guide to Canadian technology grants. Status of CDAP 'Grow Your Business Online' ($2400), closure of 'Boost Your Business', and active alternatives like ESSOR and BDC financing.",
  keywords: "Canada Digital Adoption Program 2026, CDAP status, Grow Your Business Online grant, technology adoption grants Canada, ESSOR program Quebec, small business digital grants",
}

export default function CanadaTechnologyAdoptionGrantsGuide() {
  const faqData = [
    {
      question: "Is the $15,000 CDAP Boost Your Business grant still available in 2026?",
      answer: "No. The 'Boost Your Business Technology' stream closed to new applications in February 2024. If you did not secure a grant agreement before then, you cannot apply. This guide details the alternatives."
    },
    {
      question: "Is the $2,400 Grow Your Business Online grant still open?",
      answer: "Yes, as of early 2026, the 'Grow Your Business Online' stream offering $2,400 micro-grants for e-commerce is still active through local service providers."
    },
    {
      question: "Can I still get the BDC 0% interest loan?",
      answer: "Only if you have a valid, pre-existing CDAP 'Boost' grant agreement. New applicants cannot access the CDAP-specific 0% loan anymore. However, BDC offers standard technology financing."
    },
    {
      question: "What replaced CDAP in Quebec?",
      answer: "In Quebec, the PCAN (CDAP) was effectively superseded by the 'Programme ESSOR' and 'Offensive de transformation numérique', which offer substantial funding for audit 4.0 and digital implementation."
    },
    {
      question: "Does CanExport cover digital technology expenses?",
      answer: "Yes, specifically if the technology generates international sales. CanExport SMEs can cover Search Engine Optimization (SEO), online advertising in foreign markets, and website localization."
    },
    {
      question: "What specific costs are eligible for the $2,400 grant?",
      answer: "Eligible costs include: website development labor, e-commerce platform subscriptions (up to 12 months), SEO services, paid social media advertising (ads manager costs), and booking software. Hardware is generally NOT eligible."
    },
    {
      question: "Can I use the grant to buy a laptop?",
      answer: "No. The 'Grow Your Business Online' grant strictly excludes hardware purchases like laptops, cameras, or smartphones. It is for 'intangible' digital adoption costs only."
    },
    {
      question: "Do I need to hire a 'Digital Advisor' for the $2,400 grant?",
      answer: "No. Digital Advisors were required for the closed 'Boost Your Business' stream ($15k). The $2,400 micro-grant does not require an advisor; you can hire any legitimate agency or freelancer."
    },
    {
      question: "Can I apply for the $2,400 grant more than once?",
      answer: "No. The program rule is 'one grant per business number (BN)'. Even if you have multiple websites, you can only receive the funding once."
    },
    {
      question: "How long does the approval take?",
      answer: "Approval times vary by local delivery partner (e.g., Alacrity BC vs. checking with OCC in Ontario), but typical turnaround is 4-6 weeks from submission to approval."
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
                💻 2026 Digital Funding Landscape
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                Canada Technology Grants 2026: <span className="text-blue-400">Post-CDAP Guide</span> & Active Alternatives
              </h1>
              <p className="text-xl text-blue-100 mb-10 leading-relaxed max-w-3xl mx-auto">
                The era of "free $15k digital grants" has changed. While the main CDAP stream is closed, the <span className="font-semibold text-white">$2,400 E-Commerce Grant</span> remains active. Discover the funding that survived and the new alternatives for 2026.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold text-lg px-10 py-6 shadow-xl" asChild>
                  <Link href="#active-grants">
                    See What's Open
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-blue-400/50 text-white hover:bg-blue-900/50 font-semibold text-lg px-10 py-6" asChild>
                  <Link href="/blog/canada-federal-grants">
                    View Federal Alternatives
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Status Alert */}
        <section className="py-12 bg-white -mt-8 relative z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg shadow-sm">
                  <div className="flex items-start">
                    <AlertTriangle className="w-6 h-6 text-red-600 mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-red-900">CLOSED: Boost Your Business</h3>
                      <p className="text-red-700 text-sm mt-1">
                        The $15,000 grant for digital advisors closed in Feb 2024. Do not pay consultants promising access to this stream unless you have a pre-existing agreement.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-lg shadow-sm">
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-emerald-600 mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-emerald-900">OPEN: Grow Your Business Online</h3>
                      <p className="text-emerald-700 text-sm mt-1">
                        The $2,400 micro-grant for e-commerce websites and digital marketing is still accepting applications in 2026 through local providers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Survivor: Grow Your Business Online Masterclass */}
        <section id="active-grants" className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Deep Dive: The $2,400 Micro-Grant</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Often ignored because it's "small", this grant is actually one of the easiest approvals in the Canadian funding ecosystem. Here is exactly how to maximize it.
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-12 items-start mb-16">
                <div className="flex-1">
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-8 mb-8">
                    <h4 className="font-bold text-xl text-blue-900 mb-6">The "Eligible Cost" Checklist</h4>
                    <p className="text-gray-700 mb-6 font-medium">
                      The rule of thumb is: "Does it help you sell to a customer online?" If yes, it's likely eligible. If it's just for office administration, it's not.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-bold text-gray-900 border-b border-blue-200 pb-2 mb-3">✅ Approved</h5>
                        <ul className="space-y-3 text-sm">
                          <li className="flex items-start"><CheckCircle className="w-4 h-4 text-emerald-600 mr-2 mt-0.5" /> <strong>Website Building:</strong> Hiring a freelancer to build a Shopify/Wordpress site.</li>
                          <li className="flex items-start"><CheckCircle className="w-4 h-4 text-emerald-600 mr-2 mt-0.5" /> <strong>SEO Services:</strong> Audits, keyword research, localized content writing.</li>
                          <li className="flex items-start"><CheckCircle className="w-4 h-4 text-emerald-600 mr-2 mt-0.5" /> <strong>Booking Systems:</strong> JaneApp, Calendly, or restaurant reservation software fees.</li>
                          <li className="flex items-start"><CheckCircle className="w-4 h-4 text-emerald-600 mr-2 mt-0.5" /> <strong>Ads:</strong> Costs paid directly to Google/Meta for *advertising*.</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-bold text-gray-900 border-b border-red-200 pb-2 mb-3">❌ Rejected</h5>
                        <ul className="space-y-3 text-sm">
                          <li className="flex items-start"><AlertTriangle className="w-4 h-4 text-red-600 mr-2 mt-0.5" /> <strong>Hardware:</strong> Laptops, iPhones, Cash Registers.</li>
                          <li className="flex items-start"><AlertTriangle className="w-4 h-4 text-red-600 mr-2 mt-0.5" /> <strong>Salaries:</strong> You cannot pay your own staff with this grant.</li>
                          <li className="flex items-start"><AlertTriangle className="w-4 h-4 text-red-600 mr-2 mt-0.5" /> <strong>Office Software:</strong> Microsoft Office, Slack, or Zoom subscriptions.</li>
                          <li className="flex items-start"><AlertTriangle className="w-4 h-4 text-red-600 mr-2 mt-0.5" /> <strong>Renewals:</strong> Pre-existing subscriptions are often rejected; new ones are accepted.</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h3 className="font-bold text-xl text-gray-900 mb-4">Implementation Case Study: "The Local Bakery"</h3>
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-lg">
                    <p className="text-gray-700 mb-4 italic">
                      "Maple Retail", a small bakery, had a static website but took orders by phone. They wanted to automate.
                    </p>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                        <span className="text-gray-600">Total Project Cost:</span>
                        <span className="font-bold text-gray-900">$2,600</span>
                      </div>
                      <div className="pl-4 border-l-2 border-blue-200 space-y-2">
                        <p className="text-sm text-gray-600">Freeland Web Dev (Setup Shopify): $1,500</p>
                        <p className="text-sm text-gray-600">Shopify Subscription (1 Year): $500</p>
                        <p className="text-sm text-gray-600">Google Ads Credit: $600</p>
                      </div>
                      <div className="flex justify-between items-center bg-green-50 p-3 rounded">
                        <span className="font-bold text-green-800">Grant Reimbursement:</span>
                        <span className="font-bold text-green-800">$2,400</span>
                      </div>
                      <div className="flex justify-between items-center bg-gray-50 p-3 rounded">
                        <span className="font-bold text-gray-800">Net Cost to Bakery:</span>
                        <span className="font-bold text-gray-800">$200</span>
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-gray-500">
                      <strong>Result:</strong> They launched online ordering for $200 out of pocket. This is the power of the micro-grant.
                    </p>
                  </div>
                </div>

                <div className="w-full md:w-1/3">
                  <div className="sticky top-24">
                    <Card className="border-2 border-blue-600 shadow-xl overflow-hidden">
                      <div className="bg-blue-600 text-white p-4 text-center">
                        <h3 className="font-bold text-lg">Application Steps</h3>
                      </div>
                      <CardContent className="p-6">
                        <div className="space-y-6 relative">
                          {/* Step 1 */}
                          <div className="flex gap-4">
                            <div className="flex flex-col items-center">
                              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">1</div>
                              <div className="w-0.5 h-full bg-blue-100 my-1"></div>
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900 text-sm">Find Provider</h4>
                              <p className="text-xs text-gray-500">Google "CDAP Grow Your Business + [Your Province]".</p>
                            </div>
                          </div>
                          {/* Step 2 */}
                          <div className="flex gap-4">
                            <div className="flex flex-col items-center">
                              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">2</div>
                              <div className="w-0.5 h-full bg-blue-100 my-1"></div>
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900 text-sm">Submit Plan</h4>
                              <p className="text-xs text-gray-500">Upload a quote from your vendor showing costs &gt; $2,400.</p>
                            </div>
                          </div>
                          {/* Step 3 */}
                          <div className="flex gap-4">
                            <div className="flex flex-col items-center">
                              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">3</div>
                              <div className="w-0.5 h-full bg-blue-100 my-1"></div>
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900 text-sm">Approve & Spend</h4>
                              <p className="text-xs text-gray-500">Wait for the approval email. THEN spend the money.</p>
                            </div>
                          </div>
                          {/* Step 4 */}
                          <div className="flex gap-4">
                            <div className="flex flex-col items-center">
                              <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-sm">4</div>
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900 text-sm">Reimbursement</h4>
                              <p className="text-xs text-gray-500">Submit receipt. Get cheque in 30 days.</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="mt-6 bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                      <h5 className="font-bold text-yellow-800 text-sm mb-2 flex items-center">
                        <AlertTriangle className="w-4 h-4 mr-2" /> Critical Warning
                      </h5>
                      <p className="text-xs text-yellow-700">
                        Do NOT spend the money before you get the approval email. Retroactive costs are 100% rejected. You must wait for the "Green Light".
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Regional Alternatives */}
        <section className="py-20 bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Beyond Federal: Regional Digital Funds</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  When the federal door closes (CDAP Boost), the provincial windows open. Here is where the real "Heavy Lifting" funding is hiding in 2026.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {/* Quebec ESSOR */}
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-center mb-6">
                    <Map className="w-8 h-8 text-blue-600 mr-3" />
                    <h3 className="text-2xl font-bold text-gray-900">Quebec: Programme ESSOR</h3>
                  </div>
                  <p className="text-gray-700 mb-6">
                    ESSOR is arguably better than CDAP ever was. It funds "Audit 4.0" and implementation projects for manufacturers and service businesses.
                  </p>
                  <ul className="space-y-4 mb-8">
                    <li className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-600">Audit Funding:</span>
                      <span className="font-bold text-gray-900">Up to $20,000 (50%)</span>
                    </li>
                    <li className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-600">Implementation:</span>
                      <span className="font-bold text-gray-900">Up to $100,000+ (Investment loan)</span>
                    </li>
                    <li className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-600">Focus:</span>
                      <span className="font-bold text-gray-900">ERP, CRM, Automation</span>
                    </li>
                  </ul>
                  <Button variant="outline" className="w-full text-blue-600 border-blue-200 hover:bg-blue-50">
                    View Investissement Quebec
                  </Button>
                </div>

                {/* Ontario Digital Main Street */}
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-center mb-6">
                    <Map className="w-8 h-8 text-red-600 mr-3" />
                    <h3 className="text-2xl font-bold text-gray-900">Ontario: Digital Main Street</h3>
                  </div>
                  <p className="text-gray-700 mb-6">
                    Typically renewed annually, DMS offers the "Digital Transformation Grant" ($2,500). It is strictly for brick-and-mortar businesses on "Main Streets".
                  </p>
                  <ul className="space-y-4 mb-8">
                    <li className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-600">Grant Amount:</span>
                      <span className="font-bold text-gray-900">$2,500</span>
                    </li>
                    <li className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-600">Training:</span>
                      <span className="font-bold text-gray-900">Required Video Series</span>
                    </li>
                    <li className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-600">Focus:</span>
                      <span className="font-bold text-gray-900">Retail & Hospitality</span>
                    </li>
                  </ul>
                  <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50">
                    Check DMS Eligibility
                  </Button>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-500 italic mb-4">
                  *Programs like "Launch Online" (BC) and others open and close rapidly. Check our <Link href="/blog/state-province-grants" className="text-blue-600 underline">Provincial Guide</Link> for live updates.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CanExport Deep Dive */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="bg-emerald-900 rounded-3xl p-8 md:p-16 text-white text-center md:text-left shadow-2xl relative overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                  <div className="flex-1">
                    <Badge className="bg-emerald-500 text-white mb-6 border-none">Analysis</Badge>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">The "Secret" Tech Grant: CanExport</h2>
                    <p className="text-emerald-100 text-lg mb-8 leading-relaxed">
                      Most people think CanExport is just for travel. WRONG. It is distinctively a <strong>Digital Marketing Grant</strong> for exporters. It covers SEO, Paid Search, and Website Localization for foreign markets.
                    </p>
                    <div className="grid grid-cols-2 gap-6 mb-8">
                      <div>
                        <p className="text-sm text-emerald-300 uppercase tracking-widest font-semibold mb-1">Max Funding</p>
                        <p className="text-3xl font-bold">$50,000</p>
                      </div>
                      <div>
                        <p className="text-sm text-emerald-300 uppercase tracking-widest font-semibold mb-1">Cost Match</p>
                        <p className="text-3xl font-bold">50%</p>
                      </div>
                    </div>
                    <Button size="lg" className="bg-white text-emerald-900 hover:bg-emerald-50 font-bold" asChild>
                      <Link href="/blog/canada-export-development-grants-guide">
                        Read the Full CanExport Guide
                      </Link>
                    </Button>
                  </div>
                  <div className="w-full md:w-1/3 bg-emerald-800 p-8 rounded-2xl border border-emerald-700">
                    <h4 className="font-bold text-xl mb-4 text-emerald-100">Eligible "Tech" Spend</h4>
                    <ul className="space-y-4 text-emerald-50 text-sm">
                      <li className="flex items-center"><Globe className="w-5 h-5 mr-3" /> Translating site to Spanish/German</li>
                      <li className="flex items-center"><Search className="w-5 h-5 mr-3" /> SEO Audit for 'Google.co.uk'</li>
                      <li className="flex items-center"><Monitor className="w-5 h-5 mr-3" /> LinkedIn Ads targeting USA</li>
                    </ul>
                  </div>
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
        <section className="py-24 bg-gray-900 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6">Need a Digital Strategy that Actually Gets Funded?</h2>
              <p className="text-xl text-gray-300 mb-10">
                Stop chasing closed programs. Our experts know exactly which provincial and federal technology grants are open right now.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-8 py-4 h-auto" asChild>
                  <Link href="/contact?service=digital-grant-assessment">
                    <Monitor className="w-5 h-5 mr-2" />
                    Assess My Tech Funding Options
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white font-semibold text-lg px-8 py-4 h-auto" asChild>
                  <Link href="/blog/canada-hiring-training-grants-guide">
                    See Hiring Grants
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

function Search(props: any) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}
