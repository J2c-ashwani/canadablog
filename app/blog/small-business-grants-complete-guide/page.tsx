import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, DollarSign, Target, AlertTriangle, FileText,
  Clock, ChevronRight, ExternalLink, BookOpen, HelpCircle,
  Building, Users, TrendingUp, MapPin, Building2, Award, Shield, Zap, Rocket } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link"
import type { Metadata } from "next"
import { getBlogPostBySlug } from '@/lib/data/blogPosts'
import EEATBadge from '@/components/blog/EEATBadge'
import LastVerifiedBadge from '@/components/blog/LastVerifiedBadge'
import { GrantSuccessTable } from '@/components/blog/GrantSuccessTable'
import { ExpertTipBox } from '@/components/blog/ExpertTipBox'
import EligibleCheck from '@/components/blog/EligibleCheck'
import ShortAnswerBox from '@/components/blog/ShortAnswerBox'
import InlineCTA from '@/components/blog/InlineCTA'
import AdSlot from '@/components/blog/AdSlot';
import AutoLink from '@/components/seo/AutoLink';

export const metadata: Metadata = {
  title: "Small Business Grants Complete Guide 2026 | Federal, State & SBA Funding",
  description: "Comprehensive guide to small business grants in 2026. Learn about SBA loans, SBIR/STTR, federal grants, state programs, and proven strategies. Access up to $5M+.",
  keywords: "small business grants, SBA loans, federal grants small business, business funding guide, SBIR STTR grants, state grants, how to apply for SBIR grants 2026, SBIR eligibility requirements, SBIR vs STTR comparison, how to apply for small business grants complete guide, small business grants complete guide eligibility 2026, step by step small business grants complete guide application guide, best small business grants complete guide for small business Canada, am I eligible for small business grants complete guide, small business grants complete guide deadline 2026",
}

export default function SmallBusinessGrantsGuidePage() {
  // EEAT Data from blogPosts.ts
  const postData = getBlogPostBySlug("small-business-grants-complete-guide");
  const iconMap: Record<string, any> = { DollarSign, Target, TrendingUp, Users, Award, Shield, CheckCircle, Zap, MapPin, Rocket, FileText, Percent: Target, Flag: Target, Gift: Target };

  const faqData = [
    {
      question: "Are there truly 'free money' grants?",
      answer: "Yes, but they're competitive. SBIR/STTR ($4B+ annually) and some state programs don't require repayment. Most business 'grants' are actually low-interest loans."
    },
    {
      question: "Can startups get funding?",
      answer: "Yes. SBA Microloans are designed for startups. Some grant programs specifically target new businesses. Having less history means more documentation may be needed."
    },
    {
      question: "How long does approval take?",
      answer: "SBA loans: 2-8 weeks. Federal grants (SBIR): 3-9 months. State grants: 4-12 weeks. Microloans: 2-4 weeks."
    },
    {
      question: "Do I have to pay taxes on grants?",
      answer: "Generally, yes. Business grants are considered taxable income by the IRS. You must report them on your tax return. Loans (like SBA 7a) are not taxable income."
    },
    {
      question: "Can I use a grant for anything?",
      answer: "No. Grants usually have specific restrictions (e.g., buying equipment, hiring staff, R&D). You must use the funds exactly as proposed in your application."
    },
    {
      question: "What credit score do I need for SBA loans?",
      answer: "For most SBA 7(a) loans, lenders look for a personal credit score of 650+. However, some micro lenders and CDFIs may work with scores in the 575-600 range if you have strong cash flow or collateral."
    },
    {
      question: "Are there grants for veterans?",
      answer: "Yes. The 'Boots to Business' program (SBA) offers training, and specific grants like the 'Hivers and Strivers' angel fund cater to veteran-owned startups. Vets also get reduced fees on SBA loans."
    },
    {
      question: "How do I find local grants?",
      answer: "Check your local Chamber of Commerce and Economic Development Corporation. They often have smaller ($2k-$10k) grants for facade improvements, digital adoption, or local hiring that aren't advertised nationally."
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
      {/* Header Ad */}
      <div className="container mx-auto px-4 py-4">
        <AdSlot adSlot={process.env.NEXT_PUBLIC_ADSENSE_HEADER_AD!} adFormat="horizontal" className="mb-6" style={{ minHeight: '90px' }} />
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="bg-gradient-to-br from-green-700 to-blue-600 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30">
                <Building className="w-3 h-3 mr-1" /> Complete 2026 Guide
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Small Business Grants Complete Guide 2026
              </h1>
              <p className="text-xl text-green-100 mb-8">
                Access billions in funding through SBA loans, federal grants, state programs,
                and private foundations. The definitive guide to small business funding in America.
              </p>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                <Link href="/contact?service=grant-application-help">Get Grant Application Help</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* EEAT ENRICHMENT COMPONENTS */}
        {postData?.shortAnswer && (
          <section className="py-6 bg-emerald-50 dark:bg-emerald-950/20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto bg-white dark:bg-neutral-900 rounded-xl p-6 shadow-sm border border-emerald-200">
                <p className="text-gray-800 dark:text-gray-200 text-base leading-relaxed">
                  <span className="font-bold text-emerald-700">The Short Answer: </span>
                  {postData.shortAnswer}
                </p>
              </div>
            </div>
          </section>
        )}

        {postData?.eligibleCheck && (
          <section className="py-4">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <EligibleCheck />
              </div>
            </div>
          </section>
        )}

        {postData?.metrics && (
          <section className="py-6">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <GrantSuccessTable
                  title="Quick Funding Facts"
                  metrics={postData.metrics.map((m: any) => {
                    const IconComponent = (m.iconName && iconMap[m.iconName]) ? iconMap[m.iconName] : Target;
                    return { ...m, icon: <IconComponent className="w-6 h-6" /> };
                  })}
                />
              </div>
            </div>
          </section>
        )}

        {postData?.expertTip && (
          <section className="py-6">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <ExpertTipBox type={postData.expertTip.type} title={postData.expertTip.title}>
                  <div dangerouslySetInnerHTML={{ __html: postData.expertTip.content }} />
                </ExpertTipBox>
              </div>
            </div>
          </section>
        )}

        <section className="py-2">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <EEATBadge authorName="Ashwani K." authorImage="/author-ashwani.jpg" date={postData?.date || "2025-12-01"} />
            </div>
          </div>
        </section>

        {/* In-Content Horizontal Ad */}
        <div className="container mx-auto px-4 py-4">
          <AdSlot adSlot={process.env.NEXT_PUBLIC_ADSENSE_IN_CONTENT_HORIZONTAL!} adFormat="horizontal" style={{ minHeight: '120px', width: '100%' }} />
        </div>



        {/* Common Questions Section */}
        <section className="py-12 bg-gray-50 border-b border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">❓ Common Questions About Small Business Grants</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <a href="#grants-vs-loans" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                  <h3 className="font-semibold text-blue-900">Are grants really free?</h3>
                  <p className="text-sm text-gray-600 mt-1">Yes, but they are competitive and rare compared to loans.</p>
                </a>
                <a href="#sba-programs" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                  <h3 className="font-semibold text-blue-900">What is the best funding source?</h3>
                  <p className="text-sm text-gray-600 mt-1">SBA 7(a) loans are the most common and accessible source.</p>
                </a>
                <a href="#eligibility" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                  <h3 className="font-semibold text-blue-900">Do I need good credit?</h3>
                  <p className="text-sm text-gray-600 mt-1">Generally 650+ for SBA, but some programs accept lower scores.</p>
                </a>
                <a href="#how-to-apply" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                  <h3 className="font-semibold text-blue-900">How do I apply?</h3>
                  <p className="text-sm text-gray-600 mt-1">Prepare documents and apply through official portals like Grants.gov.</p>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* TOC */}
        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <nav className="p-6 bg-gray-50 rounded-xl">
                <h2 className="text-lg font-bold mb-4">In This Guide</h2>
                <ul className="grid md:grid-cols-2 gap-2 text-sm">
                  <li><a href="#overview" className="text-blue-700 hover:underline">1. Understanding Small Business Grants</a></li>
                  <li><a href="#grants-vs-loans" className="text-blue-700 hover:underline">2. Grants vs Loans: Key Differences</a></li>
                  <li><a href="#sba-programs" className="text-blue-700 hover:underline">3. SBA Loan Programs Overview</a></li>
                  <li><a href="#federal-grants" className="text-blue-700 hover:underline">4. Federal Grant Programs (SBIR/STTR)</a></li>
                  <li><a href="#state-programs" className="text-blue-700 hover:underline">5. State &amp; Local Grants</a></li>
                  <li><a href="#private-grants" className="text-blue-700 hover:underline">6. Private &amp; Corporate Grants</a></li>
                  <li><a href="#eligibility" className="text-blue-700 hover:underline">7. Eligibility Requirements</a></li>
                  <li><a href="#how-to-apply" className="text-blue-700 hover:underline">8. How to Apply Successfully</a></li>
                  <li><a href="#documents" className="text-blue-700 hover:underline">9. Required Documents</a></li>
                  <li><a href="#mistakes" className="text-blue-700 hover:underline">10. Common Mistakes to Avoid</a></li>
                  <li><a href="#success-stories" className="text-blue-700 hover:underline">11. Success Strategies</a></li>
                  <li><a href="#faqs" className="text-blue-700 hover:underline">12. FAQs</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto grid md:grid-cols-4 gap-8 text-center">
              <div><div className="text-3xl font-bold text-green-600 mb-2">$44.8B</div><div className="text-gray-600">SBA Loans (2024)</div></div>
              <div><div className="text-3xl font-bold text-blue-600 mb-2">$4B+</div><div className="text-gray-600">SBIR/STTR Annually</div></div>
              <div><div className="text-3xl font-bold text-purple-600 mb-2">33.2M</div><div className="text-gray-600">US Small Businesses</div></div>
              <div><div className="text-3xl font-bold text-emerald-600 mb-2">50+</div><div className="text-gray-600">State Programs</div></div>
            </div>
          </div>
        </section>

        {/* Overview */}
        <section id="overview" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Understanding Small Business Grants in 2026</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Small business grants encompass a wide range of funding opportunities—from SBA-guaranteed
                loans to federal research grants to state economic development programs. While true &quot;free money&quot;
                grants exist (particularly for R&amp;D and specific demographics), most business funding comes
                through low-interest government-backed loans with favorable terms.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                In 2026, the funding landscape offers unprecedented opportunities. The SBA approved $44.8 billion
                in loans in 2024, SBIR/STTR programs distribute over $4 billion annually in non-dilutive research
                grants, and virtually every state offers economic development incentives. Understanding which
                programs fit your business is the key to funding success.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-green-200"><CardContent className="pt-6">
                  <h3 className="font-bold mb-3 text-green-700">True Grants (No Repayment)</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>SBIR/STTR research grants ($50K-$1.7M)</span></li>
                    <li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>State economic development grants</span></li>
                    <li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>USDA rural business grants</span></li>
                    <li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Corporate foundation grants</span></li>
                    <li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Minority/women-focused grants</span></li>
                  </ul>
                </CardContent></Card>

                <Card className="border-blue-200"><CardContent className="pt-6">
                  <h3 className="font-bold mb-3 text-blue-700">Government-Backed Loans</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start"><ChevronRight className="w-4 h-4 text-blue-500 mr-2 mt-0.5" /><span>SBA 7(a) loans (up to $5M)</span></li>
                    <li className="flex items-start"><ChevronRight className="w-4 h-4 text-blue-500 mr-2 mt-0.5" /><span>CDC/504 real estate loans ($5.5M)</span></li>
                    <li className="flex items-start"><ChevronRight className="w-4 h-4 text-blue-500 mr-2 mt-0.5" /><span>SBA Microloans ($50K)</span></li>
                    <li className="flex items-start"><ChevronRight className="w-4 h-4 text-blue-500 mr-2 mt-0.5" /><span>SBA Disaster Loans ($2M)</span></li>
                    <li className="flex items-start"><ChevronRight className="w-4 h-4 text-blue-500 mr-2 mt-0.5" /><span>State revolving loan funds</span></li>
                  </ul>
                </CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        {/* Grants vs Loans */}
        <section id="grants-vs-loans" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Grants vs Loans: Understanding the Difference</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200 mb-6">
                  <thead><tr className="bg-blue-50"><th className="border px-4 py-3 text-left">Factor</th><th className="border px-4 py-3 text-left">Grants</th><th className="border px-4 py-3 text-left">Loans</th></tr></thead>
                  <tbody>
                    <tr><td className="border px-4 py-3 font-semibold">Repayment</td><td className="border px-4 py-3 text-green-600">Not required</td><td className="border px-4 py-3">Required with interest</td></tr>
                    <tr className="bg-gray-50"><td className="border px-4 py-3 font-semibold">Competition</td><td className="border px-4 py-3">Highly competitive</td><td className="border px-4 py-3 text-green-600">Less competitive</td></tr>
                    <tr><td className="border px-4 py-3 font-semibold">Restrictions</td><td className="border px-4 py-3">Often strict use requirements</td><td className="border px-4 py-3 text-green-600">More flexible</td></tr>
                    <tr className="bg-gray-50"><td className="border px-4 py-3 font-semibold">Availability</td><td className="border px-4 py-3">Limited, specific criteria</td><td className="border px-4 py-3 text-green-600">Widely available</td></tr>
                    <tr><td className="border px-4 py-3 font-semibold">Timeline</td><td className="border px-4 py-3">3-12 months</td><td className="border px-4 py-3 text-green-600">2-8 weeks (SBA)</td></tr>
                  </tbody>
                </table>
              </div>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                <p className="text-gray-700"><strong>Pro Tip:</strong> Don&apos;t limit yourself to &quot;grants only.&quot; SBA loans offer favorable terms (10-15% down, 10-25 year terms) and are far more accessible. A well-structured loan with 7% interest beats waiting 18 months for a competitive grant.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SBA Programs */}
        <section id="sba-programs" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">SBA Loan Programs: Your Primary Funding Source</h2>
              <p className="text-gray-700 mb-6">The Small Business Administration offers the most accessible funding for American small businesses. With $44.8 billion in loans approved in 2024, SBA programs have the highest success rates.</p>

              <div className="space-y-4">
                <Card><CardContent className="pt-6">
                  <div className="flex items-start"><div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0"><DollarSign className="w-6 h-6 text-green-600" /></div><div>
                    <h3 className="font-bold text-lg">7(a) Loans – Up to $5M</h3>
                    <p className="text-gray-600 text-sm mt-1">Most flexible program for working capital, equipment, real estate, expansion, and debt refinancing.</p>
                    <Link href="/blog/sba-7a-loans-complete-guide" className="text-blue-600 text-sm hover:underline mt-2 inline-block">Read 7(a) Guide →</Link>
                  </div></div>
                </CardContent></Card>

                <Card><CardContent className="pt-6">
                  <div className="flex items-start"><div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0"><Building2 className="w-6 h-6 text-blue-600" /></div><div>
                    <h3 className="font-bold text-lg">CDC/504 Loans – Up to $5.5M</h3>
                    <p className="text-gray-600 text-sm mt-1">Long-term, fixed-rate financing for real estate and major equipment. Only 10% down payment.</p>
                  </div></div>
                </CardContent></Card>

                <Card><CardContent className="pt-6">
                  <div className="flex items-start"><div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0"><Target className="w-6 h-6 text-purple-600" /></div><div>
                    <h3 className="font-bold text-lg">Microloans – Up to $50K</h3>
                    <p className="text-gray-600 text-sm mt-1">Perfect for startups. Easier approval, free mentoring included. Avg loan: $13K.</p>
                    <Link href="/blog/sba-microloans-complete-guide" className="text-blue-600 text-sm hover:underline mt-2 inline-block">Read Microloans Guide →</Link>
                  </div></div>
                </CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        {/* Federal Grants */}
        <section id="federal-grants" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Federal Grant Programs: SBIR/STTR</h2>
              <p className="text-gray-700 mb-6">The SBIR (Small Business Innovation Research) and STTR (Small Business Technology Transfer) programs represent the largest source of true grants for small businesses—over $4 billion annually.</p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="p-6 bg-blue-50 rounded-lg"><h3 className="font-bold text-lg mb-3">Phase I: Proof of Concept</h3><ul className="space-y-2 text-sm"><li>💰 $50,000 - $300,000</li><li>⏱️ 6-12 months</li><li>🎯 Feasibility research</li></ul></div>
                <div className="p-6 bg-green-50 rounded-lg"><h3 className="font-bold text-lg mb-3">Phase II: Development</h3><ul className="space-y-2 text-sm"><li>💰 $750,000 - $1.7M</li><li>⏱️ 2 years</li><li>🎯 Full R&amp;D and prototyping</li></ul></div>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <p className="text-gray-700"><strong>11 Participating Agencies:</strong> DOD, NIH, NSF, DOE, NASA, USDA, EPA, Commerce, DHS, DOT, Education. Each has specific focus areas.</p>
              </div>
              <Link href="/blog/sbir-sttr-complete-guide" className="text-blue-600 hover:underline mt-4 inline-block">Read Complete SBIR/STTR Guide →</Link>
            </div>
          </div>
        </section>

        {/* State Programs */}
        <section id="state-programs" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">State &amp; Local Business Grants</h2>
              <p className="text-gray-700 mb-6">Every state offers economic development programs. These often have less competition and specifically target local job creation and business growth.</p>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <Card><CardContent className="pt-6"><h3 className="font-bold mb-2 text-sm">California</h3><p className="text-xs text-gray-600">CalCompetes, SBIR matching</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold mb-2 text-sm">Texas</h3><p className="text-xs text-gray-600">Enterprise Fund, SPGP</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold mb-2 text-sm">New York</h3><p className="text-xs text-gray-600">Excelsior, START-UP NY</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold mb-2 text-sm">Florida</h3><p className="text-xs text-gray-600">QTI Tax Refund, QACF</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold mb-2 text-sm">Illinois</h3><p className="text-xs text-gray-600">EDGE, Intersect Illinois</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold mb-2 text-sm"><MapPin className="w-4 h-4 inline mr-1" />All 50 States</h3><p className="text-xs text-gray-600">Browse state guides</p></CardContent></Card>
              </div>
              <Link href="/usa" className="text-blue-600 hover:underline">Browse All 50 State Guides →</Link>
            </div>
          </div>
        </section>

        {/* Private Grants */}
        <section id="private-grants" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Private &amp; Corporate Grant Programs</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card><CardContent className="pt-6"><h3 className="font-bold mb-3">Corporate Grants</h3><ul className="space-y-1 text-sm"><li>• FedEx Small Business Grant ($25K-$50K)</li><li>• Visa Everywhere Initiative ($100K)</li><li>• Amazon Small Business Grants</li><li>• Chase for Business</li></ul></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold mb-3">Foundation Grants</h3><ul className="space-y-1 text-sm"><li>• Kauffman Foundation</li><li>• Kiva Microfunds (0% interest)</li><li>• Grameen America</li><li>• Amber Grant ($10K monthly)</li></ul></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        {/* Eligibility */}
        <section id="eligibility" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Who is Eligible for Small Business Grants?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card><CardHeader><CardTitle className="text-green-700 flex items-center"><CheckCircle className="w-5 h-5 mr-2" />Requirements</CardTitle></CardHeader><CardContent>
                  <ul className="space-y-2 text-sm"><li>• For-profit small business</li><li>• Meet SBA size standards</li><li>• US-based and majority US-owned</li><li>• In good legal standing</li><li>• Demonstrate ability to repay (loans)</li><li>• No delinquent federal debt</li></ul>
                </CardContent></Card>
                <Card><CardHeader><CardTitle className="text-red-700 flex items-center"><AlertTriangle className="w-5 h-5 mr-2" />Restrictions</CardTitle></CardHeader><CardContent>
                  <ul className="space-y-2 text-sm"><li>• Gambling/adult businesses</li><li>• Multi-level marketing</li><li>• Passive investment activities</li><li>• Financial institutions</li><li>• Non-US businesses</li><li>• Criminal history (varies)</li></ul>
                </CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        {/* How to Apply */}
        <section id="how-to-apply" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">How to Apply for Grants &amp; Loans Successfully</h2>
              <div className="space-y-4">
                <div className="flex items-start p-4 bg-white rounded-lg border"><div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">1</div><div><h3 className="font-bold">Assess Your Funding Needs</h3><p className="text-gray-600 text-sm">Determine how much you need, what for, and whether grants or loans are more appropriate.</p></div></div>
                <div className="flex items-start p-4 bg-white rounded-lg border"><div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">2</div><div><h3 className="font-bold">Research Multiple Programs</h3><p className="text-gray-600 text-sm">Apply to multiple programs. Don&apos;t put all eggs in one basket—especially for competitive grants.</p></div></div>
                <div className="flex items-start p-4 bg-white rounded-lg border"><div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">3</div><div><h3 className="font-bold">Prepare Your Documents</h3><p className="text-gray-600 text-sm">Gather tax returns, financial statements, business plan, and proof of registration in advance.</p></div></div>
                <div className="flex items-start p-4 bg-white rounded-lg border"><div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">4</div><div><h3 className="font-bold">Submit &amp; Follow Up</h3><p className="text-gray-600 text-sm">Submit applications early, respond promptly to requests, and maintain communication.</p></div></div>
              </div>
            </div>
          </div>
        </section>

        {/* Documents */}
        <section id="documents" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Documents You&apos;ll Need</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded-lg border"><h3 className="font-bold mb-3 flex items-center"><FileText className="w-5 h-5 text-blue-600 mr-2" />Personal Documents</h3><ul className="space-y-1 text-sm"><li>• Personal tax returns (2-3 years)</li><li>• Government-issued ID</li><li>• Personal financial statement</li><li>• Resume/bio</li></ul></div>
                <div className="p-6 bg-white rounded-lg border"><h3 className="font-bold mb-3 flex items-center"><FileText className="w-5 h-5 text-green-600 mr-2" />Business Documents</h3><ul className="space-y-1 text-sm"><li>• Business tax returns (2-3 years)</li><li>• Financial statements</li><li>• Business plan</li><li>• Bank statements (6 months)</li></ul></div>
              </div>
            </div>
          </div>
        </section>

        {/* Mistakes */}
        <section id="mistakes" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Common Mistakes to Avoid</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Card><CardContent className="pt-6"><h3 className="font-bold text-red-600 mb-2">❌ Only Chasing &quot;Free Money&quot;</h3><p className="text-sm text-gray-600">Grants are competitive. SBA loans are more accessible and have excellent terms.</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold text-red-600 mb-2">❌ Incomplete Applications</h3><p className="text-sm text-gray-600">Missing documents cause delays and rejections. Double-check everything.</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold text-red-600 mb-2">❌ Waiting for Perfect Credit</h3><p className="text-sm text-gray-600">SBA loans accept 650+ credit. Some programs work with lower scores.</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold text-red-600 mb-2">❌ Applying to Just One Program</h3><p className="text-sm text-gray-600">Diversify applications. Some programs may reject while others approve.</p></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        {/* Success Strategies */}
        <section id="success-stories" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Proven Success Strategies</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div><h3 className="font-bold mb-3 text-green-700">✅ Do This</h3><ul className="space-y-2 text-sm"><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Work with SCORE/SBDC mentors (free)</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Apply to multiple programs simultaneously</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Start with SBA loans for faster approval</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Build relationships with lenders</span></li></ul></div>
                <div><h3 className="font-bold mb-3 text-purple-700">🎯 Pro Tips</h3><ul className="space-y-2 text-sm"><li className="flex items-start"><Target className="w-4 h-4 text-purple-500 mr-2 mt-0.5" /><span>State programs have less competition</span></li><li className="flex items-start"><Target className="w-4 h-4 text-purple-500 mr-2 mt-0.5" /><span>SBIR matching funds double your award</span></li><li className="flex items-start"><Target className="w-4 h-4 text-purple-500 mr-2 mt-0.5" /><span>Women/minority programs are underutilized</span></li><li className="flex items-start"><Target className="w-4 h-4 text-purple-500 mr-2 mt-0.5" /><span>Rural programs often have funds available</span></li></ul></div>
              </div>
            </div>
          </div>
        </section>

        <section id="hidden-grants" className="py-16 bg-blue-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-blue-900">3 "Hidden" Grant Categories</h2>
              <p className="text-blue-800 mb-8">
                Most people only look for "Small Business Grants". Try searching for these specific terms instead.
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                <Card className="border-blue-200">
                  <CardHeader><CardTitle className="text-lg text-blue-900">1. Façade Improvement</CardTitle></CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-2"><strong>Who:</strong> Local BIA (Business Improvement Areas) or City Council.</p>
                    <p className="text-sm text-gray-600"><strong>What:</strong> $2k-$10k to fix your sign, paint your front, or add lighting.</p>
                  </CardContent>
                </Card>
                <Card className="border-blue-200">
                  <CardHeader><CardTitle className="text-lg text-blue-900">2. Digital Adoption</CardTitle></CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-2"><strong>Who:</strong> State/Provincial Economic Development.</p>
                    <p className="text-sm text-gray-600"><strong>What:</strong> $2k-$5k to build a website, set up e-commerce, or buy SEO services.</p>
                  </CardContent>
                </Card>
                <Card className="border-blue-200">
                  <CardHeader><CardTitle className="text-lg text-blue-900">3. Job Training</CardTitle></CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-2"><strong>Who:</strong> Department of Labor / Workforce Boards.</p>
                    <p className="text-sm text-gray-600"><strong>What:</strong> Pays for 50-80% of training courses for your employees.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Success Strategies */}
        <section id="success-stories" className="py-16 bg-white border-t">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Real Success Stories</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-2">The "Bakery" pivot</h4>
                  <p className="text-sm text-gray-600 mb-4"><strong>Challenge:</strong> A local bakery needed a new oven ($15k) but had poor credit.</p>
                  <p className="text-sm text-gray-600"><strong>Strategy:</strong> They applied for a $50k SBA Microloan. They used $15k for the oven and $10k for marketing.</p>
                  <p className="text-sm text-green-700 font-bold mt-2">Result: Approved in 3 weeks. Revenue up 30%.</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-2">The AI Startup</h4>
                  <p className="text-sm text-gray-600 mb-4"><strong>Challenge:</strong> Needed capital for R&D but didn't want to give up equity.</p>
                  <p className="text-sm text-gray-600"><strong>Strategy:</strong> Applied for an NSF SBIR Phase I grant ($275k).</p>
                  <p className="text-sm text-green-700 font-bold mt-2">Result: Won the grant. Built the prototype. Later raised Series A at $20M valuation.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section id="faqs" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqData.map((faq, index) => (
                  <Accordion type="single" collapsible key={index}>
                    <AccordionItem value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        <span className="font-medium text-blue-900">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Official Resources Section */}
        <section className="py-16 bg-white border-t">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Official Resources</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Link href="https://www.grants.gov" target="_blank" rel="noopener noreferrer" className="flex items-start p-6 bg-blue-50 rounded-lg border border-blue-100 hover:shadow-md transition-all">
                  <ExternalLink className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-blue-900 mb-2">Grants.gov</h3>
                    <p className="text-blue-800 text-sm">The centralized database for all federal grant opportunities. Search and apply for government grants.</p>
                  </div>
                </Link>
                <Link href="https://www.sba.gov/funding-programs/grants" target="_blank" rel="noopener noreferrer" className="flex items-start p-6 bg-green-50 rounded-lg border border-green-100 hover:shadow-md transition-all">
                  <ExternalLink className="w-6 h-6 text-green-600 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-green-900 mb-2">SBA Grants Overview</h3>
                    <p className="text-green-800 text-sm">Official guidance on SBA grant programs like STEP and SBDC funding.</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Related Guides */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Related Guides</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/blog/sba-7a-loans-complete-guide" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-blue-600 mr-3" /><span>SBA 7(a) Loans Guide</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/blog/sba-microloans-complete-guide" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-blue-600 mr-3" /><span>SBA Microloans Guide</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/blog/sbir-sttr-complete-guide" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-blue-600 mr-3" /><span>SBIR/STTR Complete Guide</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/usa" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-blue-600 mr-3" /><span>All 50 State Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-green-700 to-blue-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-6">Ready to Secure Funding?</h2>
              <p className="text-xl text-green-100 mb-8">Our team helps businesses identify the right funding programs, prepare winning applications, and maximize approval chances.</p>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                <Link href="/contact?service=grant-application-help">Get Expert Grant Help</Link>
              </Button>
            </div>
          </div>
        </section>
      
            {/* CONTENT EXPANSION: Deep Modifier Sections for Ranking Lift */}
            <div className="mt-12 space-y-8 not-prose">
              <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-4">🎯 Who Qualifies?</h2>
                <div className="text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: `<ul class="list-disc list-inside space-y-2 text-gray-700"><li><strong>Any registered small business</strong> in the US or Canada</li><li><strong>US:</strong> Must meet SBA size standards (varies by NAICS code)</li><li><strong>Canada:</strong> Most programs require Canadian incorporation</li><li><strong>Startups:</strong> Many grants require at least 1 year of operations</li><li><strong>Revenue:</strong> Some programs cap eligible businesses at $1M-$5M annual revenue</li><li><strong>Key requirement:</strong> Must not be delinquent on any government debt</li></ul>` }} />
              </div>
              <div className="bg-amber-50 dark:bg-amber-950/30 rounded-xl p-6 border border-amber-200 dark:border-amber-800">
                <h2 className="text-2xl font-bold text-amber-900 dark:text-amber-100 mb-4">📅 Key Deadlines & Application Windows</h2>
                <div className="text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: `<ul class="list-disc list-inside space-y-2 text-gray-700"><li><strong>Federal grants (US):</strong> Check Grants.gov daily — new FOAs posted constantly</li><li><strong>Federal grants (Canada):</strong> Most are rolling — apply anytime</li><li><strong>State/Provincial programs:</strong> Often quarterly or annual cycles</li><li><strong>Private foundation grants:</strong> Various — Amber Grant is monthly</li><li><strong>Pro tip:</strong> Set up saved searches on Grants.gov and SAM.gov for instant alerts</li></ul>` }} />
              </div>
              <div className="bg-purple-50 dark:bg-purple-950/30 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
                <h2 className="text-2xl font-bold text-purple-900 dark:text-purple-100 mb-4">📊 How Competitive Is This?</h2>
                <div className="text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: `<p class="text-gray-700 mb-3">Varies enormously by type:</p><ul class="list-disc list-inside space-y-2 text-gray-700"><li><strong>Federal research grants (SBIR):</strong> 15-25% success</li><li><strong>SBA loans:</strong> 50-70% approval through preferred lenders</li><li><strong>State economic development grants:</strong> 30-50% success</li><li><strong>Private pitch competitions:</strong> 5-15% success</li><li><strong>Canadian regional programs:</strong> 35-45% success</li></ul><p class="text-gray-700 mt-3"><strong>Best odds:</strong> Local/regional grants have the highest approval rates and the least competition.</p>` }} />
              </div>
              <div className="bg-green-50 dark:bg-green-950/30 rounded-xl p-6 border border-green-200 dark:border-green-800">
                <h2 className="text-2xl font-bold text-green-900 dark:text-green-100 mb-4">🏆 Recent Award Examples</h2>
                <div className="text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: `<ul class="list-disc list-inside space-y-2 text-gray-700"><li><strong>Total US federal grants to small businesses FY2025:</strong> $52B</li><li><strong>Total Canadian federal SME support:</strong> $8.2B</li><li><strong>Most popular program (US):</strong> SBA 7(a) — $27B disbursed</li><li><strong>Most popular program (Canada):</strong> SR&ED — $3.2B in tax credits</li></ul>` }} />
              </div>
            </div>
</div>
      {/* Bottom Ad */}
      <div className="container mx-auto px-4 py-4">
        <AdSlot adSlot={process.env.NEXT_PUBLIC_ADSENSE_IN_CONTENT_RECTANGLE!} adFormat="rectangle" style={{ minHeight: '250px' }} />
      </div>
      <Footer />
    </>
  )
}
