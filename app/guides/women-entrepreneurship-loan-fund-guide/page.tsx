import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, CheckCircle, Clock, FileText, Users, MessageCircle, Lightbulb, Target, DollarSign, AlertTriangle, Download, Shield, Heart, Sparkles, Building, HelpCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

import ShortAnswerBox from '@/components/blog/ShortAnswerBox';
import EEATBadge from '@/components/blog/EEATBadge';
import EligibleCheck from '@/components/blog/EligibleCheck';
import StickyTOC from '@/components/blog/StickyTOC';
import InlineCTA from '@/components/blog/InlineCTA';

export const metadata: Metadata = {
  title: "Women Entrepreneurship Loan Fund (WELF) 2026 | $50K Loans",
  description: "Official guide to the Women Entrepreneurship Loan Fund (WELF). Apply for up to $50,000 in microloans through WEOC, NACCA, and other partners.",
  keywords: "Women Entrepreneurship Loan Fund, WELF loan, women business loans Canada, WEOC loans, NACCA women funding",
  alternates: {
    canonical: "https://www.fsidigital.ca/guides/women-entrepreneurship-loan-fund-guide",
  },
  openGraph: {
    title: "Women Entrepreneurship Loan Fund 2026 | $50K Microloans",
    description: "Step-by-step application guide for WELF microloans via WEOC, NACCA, and Coralus.",
    url: "https://www.fsidigital.ca/guides/women-entrepreneurship-loan-fund-guide",
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
        "text": "It is a $55 million federal program that provides loans of up to $50,000 to women entrepreneurs. It is delivered through partners like WEOC, NACCA, and Coralus."
      }
    },
    {
      "@type": "Question",
      "name": "Can I apply directly to the government?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. You must apply through one of the approved delivery organizations (WEOC, NACCA, Coralus, Evol, etc.) based on your region and profile."
      }
    },
    {
      "@type": "Question",
      "name": "Is the WELF loan interest-free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It depends on the delivery partner. Coralus (formerly SheEO) offers 0% interest loans. Others may charge prime-based interest rates."
      }
    },
    {
      "@type": "Question",
      "name": "Can startups apply for WELF?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. WELF is specifically designed to support startups and underrepresented women entrepreneurs who may struggle to get financing from traditional banks."
      }
    }
  ]
}

export default function WomenEntrepreneurshipLoanFundApplicationGuide() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-pink-600 to-purple-900 text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-pink-500/20 text-pink-100 border-pink-400/30 backdrop-blur-sm">
                💼 Microloan Guide
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance tracking-tight">
                Women Entrepreneurship <br className="hidden md:block" /> Loan Fund (WELF)
              </h1>
              
              <div className="text-left mb-6 max-w-4xl mx-auto shadow-sm mt-6 relative z-20">
                 <ShortAnswerBox content="Women Entrepreneurship Loan Fund Guide — Access low-interest loans through the Women Entrepreneurship Loan Fund program." />
              </div>
              <div className="flex justify-center mb-8 relative z-20">
                 <div className="inline-block text-left bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-xl overflow-hidden">
                    <EEATBadge authorName="Ashwani K." authorImage="/author-ashwani.jpg" date="2026-02-25" />
                 </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-pink-800 hover:bg-pink-50 font-bold shadow-lg" asChild>
                  <Link href="#partners">
                    Find Your Partner
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-pink-800/50 border-pink-400/30 text-pink-100 hover:bg-pink-800/80 backdrop-blur-sm" asChild>
                  <Link href="/guides/women-entrepreneurship-loan-fund-guide">
                    See Requirements
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <div className="container mx-auto px-4 max-w-4xl my-8"><EligibleCheck /></div>

        <StickyTOC links={[
      { title: 'Loans', id: 'loans' }, { title: 'Eligibility', id: 'eligibility' }, { title: 'Application', id: 'application' }, { title: 'FAQ', id: 'faq' }
    ]} />


        {/* QUERY HOOK: Common Questions */}
        <div className="bg-white border-b border-pink-100 sticky top-0 z-20 shadow-sm/80 backdrop-blur-md bg-white/90">
          <div className="container mx-auto px-4 py-3">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-pink-900 gap-4">
              <span className="font-semibold text-pink-900 flex items-center shrink-0">
                <Heart className="w-4 h-4 mr-2 text-pink-600" />
                Quick Nav:
              </span>
              <div className="flex gap-6 overflow-x-auto no-scrollbar whitespace-nowrap mask-linear-fade">
                <Link href="#partners" className="hover:text-pink-700 transition-colors flex items-center gap-1"><Users className="w-3 h-3" /> Delivery Partners</Link>
                <Link href="#eligibility" className="hover:text-pink-700 transition-colors flex items-center gap-1"><Target className="w-3 h-3" /> Who Qualifies?</Link>
                <Link href="#process" className="hover:text-pink-700 transition-colors flex items-center gap-1"><Clock className="w-3 h-3" /> Timeline</Link>
                <Link href="#faq" className="hover:text-pink-700 transition-colors flex items-center gap-1"><HelpCircle className="w-3 h-3" /> FAQs</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Reference Stats */}
        <section className="py-12 bg-white border-b border-pink-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 text-center divide-x divide-pink-50">
                <div className="p-4">
                  <div className="text-3xl font-bold text-pink-600 mb-2">$50K</div>
                  <div className="text-pink-800 text-sm font-medium uppercase tracking-wide">Max Loan</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-purple-600 mb-2">5</div>
                  <div className="text-pink-800 text-sm font-medium uppercase tracking-wide">Major Partners</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-green-600 mb-2">Startups</div>
                  <div className="text-pink-800 text-sm font-medium uppercase tracking-wide">Eligible? Yes</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-orange-600 mb-2">51%</div>
                  <div className="text-pink-800 text-sm font-medium uppercase tracking-wide">Women Owned</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content: Partners */}
        <section id="partners" className="py-16 bg-pink-50/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">

              <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">Step 1: Choose Your Delivery Partner</h2>
              <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
                You cannot apply to the government directly. You must apply through one of these organizations depending on your location and demographics.
              </p>

              <div className="space-y-6">
                {/* WEOC */}
                <Card className="border-pink-200 hover:border-pink-400 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-pink-700 flex items-center">
                      <Sparkles className="w-5 h-5 mr-2" />
                      Women's Enterprise Organizations (WEOC)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">The main provider for most women entrepreneurs across Canada. They have provincial offices in almost every region.</p>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="border-pink-300">General Stream</Badge>
                      <Badge variant="outline" className="border-pink-300">National</Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* NACCA */}
                <Card className="border-blue-200 hover:border-blue-400 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-blue-700 flex items-center">
                      <Heart className="w-5 h-5 mr-2" />
                      NACCA (Indigenous)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">Specifically for First Nations, Métis, and Inuit women. Delivered through a network of Aboriginal Financial Institutions (AFIs).</p>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="border-blue-300">Indigenous Focus</Badge>
                      <Badge variant="outline" className="border-blue-300">Culturally Grounded</Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Coralus */}
                <Card className="border-green-200 hover:border-green-400 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-green-700 flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      Coralus (formerly SheEO)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">Focuses on "Venture" scale businesses with social impact. Known for their unique 0% interest loan model.</p>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="border-green-300">0% Interest</Badge>
                      <Badge variant="outline" className="border-green-300">Social Impact</Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Evol */}
                <Card className="border-orange-200 hover:border-orange-400 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-orange-700 flex items-center">
                      <Building className="w-5 h-5 mr-2" />
                      Evol (Quebec)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">The dedicated partner for Quebec-based women entrepreneurs. Offers loans + grants in some cases.</p>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="border-orange-300">Quebec Only</Badge>
                      <Badge variant="outline" className="border-orange-300">Bilingual</Badge>
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
      description: "Women-owned business? Our funding specialists help you access the right grants, loans, and support programs.",
    }} /></div>
<h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Are You Eligible?</h2>

              <Card className="border-green-200 bg-green-50/30">
                <CardHeader>
                  <CardTitle className="text-green-800 flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Core Criteria
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700"><strong>51% Ownership:</strong> Business must be majority owned and led by women (or gender-diverse people).</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700"><strong>Legal Status:</strong> Must be a registered business (Sole Prop, Partnership, or Corp) in Canada.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700"><strong>Business Plan:</strong> You must have a viable business plan. <span className="text-sm text-slate-500">(All partners require this)</span></span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700"><strong>Turned Down:</strong> Some partners require proof that a traditional bank said "no" to you first.</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Application Timeline */}
        <section id="process" className="py-16 bg-white border-t border-slate-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Application Timeline</h2>

              <div className="relative border-l-2 border-pink-200 pl-8 space-y-12 ml-4 md:ml-0">

                <div className="relative">
                  <div className="absolute -left-[41px] bg-pink-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">1</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Preparation (Weeks 1-2)</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    Download the business plan template from your chosen partner's website. Gather your tax returns and registration docs.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[41px] bg-pink-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">2</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Submission</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    Submit your application online. WEOC and Evol have dedicated portals.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[41px] bg-pink-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">3</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Review & Interview (Weeks 3-6)</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    A loan officer will review your file. You may start working with a "Loan Navigator" who helps you strengthen your case.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[41px] bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">4</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Funding</h3>
                  <p className="text-slate-600 text-sm">
                    Once approved, funds are disbursed. You also gain access to mentorship circles and training.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Common Questions Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Common Questions About WELF</h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">1. Is it a grant or a loan?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    It is a <strong>loan</strong>. You must pay it back. However, the terms are often more generous than a bank loan, with some partners offering lower interest rates or flexible repayment schedules.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">2. Can I apply if I have bad credit?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    The program is designed to be more inclusive than traditional banking. While they will check your credit, they often weigh your character and business plan more heavily than just a credit score.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">3. How do I choose a partner?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    If you are Indigenous, <a href="https://nacca.ca/" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline">NACCA</a> allows you to access additional non-repayable contributions. If you are in Quebec, Evol is your best bet. For most others, <a href="https://weoc.ca/" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline">WEOC</a> is the standard path.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">4. How long does it take to get funds?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Typically 4-6 weeks from submission to funding. It is faster than a large commercial loan but slower than a fintech lender.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">5. Can I use it for my salary?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Usually, no. The funds are for <em>business growth</em> (inventory, marketing, equipment), not owner draws. Check with your specific loan officer for exceptions.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">6. What if I am a startup with $0 revenue?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    You are eligible! The program is explicitly designed for startups. However, your business plan must show a clear path to revenue within a reasonable timeframe.
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
                <Link href="/guides/bdc-women-entrepreneurs-financing-guide" className="group block h-full">
                  <div className="bg-white border hover:border-blue-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-blue-600 font-semibold mb-2">Larger Loans</div>
                    <h4 className="font-bold text-slate-900 group-hover:text-blue-700 mb-2">BDC Women Loans</h4>
                    <p className="text-sm text-slate-500 flex-grow">For loans &gt;$100k.</p>
                    <div className="mt-3 text-xs text-blue-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
                <Link href="/guides/apply-small-business-grants" className="group block h-full">
                  <div className="bg-white border hover:border-purple-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-purple-600 font-semibold mb-2">Grants</div>
                    <h4 className="font-bold text-slate-900 group-hover:text-purple-700 mb-2">Startup Grants</h4>
                    <p className="text-sm text-slate-500 flex-grow">Non-repayable options.</p>
                    <div className="mt-3 text-xs text-purple-600 font-medium flex items-center">Read Guide <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                </Link>
                <Link href="/guides/apply-women-entrepreneurship-strategy" className="group block h-full">
                  <div className="bg-white border hover:border-green-300 rounded-lg p-4 transition-all hover:shadow-md h-full flex flex-col">
                    <div className="text-sm text-green-600 font-semibold mb-2">Strategy</div>
                    <h4 className="font-bold text-slate-900 group-hover:text-green-700 mb-2">WES Strategy</h4>
                    <p className="text-sm text-slate-500 flex-grow">Overview of federal programs.</p>
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
                <HelpCircle className="w-6 h-6 text-pink-600 mr-2" />
                WELF FAQs
              </h2>
              <div className="divide-y divide-pink-100">
                <div className="py-4">
                  <h3 className="font-bold text-slate-900 mb-2">Does WELF affect my credit score?</h3>
                  <p className="text-slate-600 text-sm">Yes. Most delivery partners perform a credit check as part of the due diligence process, similar to a bank loan.</p>
                </div>
                <div className="py-4">
                  <h3 className="font-bold text-slate-900 mb-2">Can I apply to multiple partners?</h3>
                  <p className="text-slate-600 text-sm">Generally, no. You should apply to the partner most aligned with your business (e.g., if you are Indigenous, NACCA is best; if in Quebec, Evol). Double-dipping for the same project is often restricted.</p>
                </div>
                <div className="py-4">
                  <h3 className="font-bold text-slate-900 mb-2">What can I use the funds for?</h3>
                  <p className="text-slate-600 text-sm">Working capital, inventory, equipment, and marketing. You cannot use it to pay off existing debt or for personal use.</p>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-pink-900 to-purple-900 text-white text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Start Your Application</h2>
            <p className="text-lg text-pink-200 mb-8 max-w-2xl mx-auto">
              We can help you navigate the WELF network and choose the perfect delivery partner for your business.
            </p>
            <Button size="lg" className="bg-white text-pink-900 hover:bg-pink-50 font-semibold shadow-lg" asChild>
              <Link href="/contact?service=welf-expert-help">
                Get WELF Help
              </Link>
            </Button>
          </div>
        </section>

      </div>
      <Footer />
    </>
  )
}
