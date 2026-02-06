import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, FileText, Download, Shield, Award, Leaf, PieChart, TrendingUp, HelpCircle, Sprout, Tractor, BookOpen, ExternalLink, Beaker } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Alberta Government Business Grants 2026 | Complete Provincial Funding Guide",
  description: "Complete guide to Alberta government business grants. Access Alberta Innovates, AITC, CAGC, and provincial funding programs for startups, SMEs, and established businesses.",
  keywords: "Alberta government grants, Alberta business funding, Alberta Innovates, AITC, CAGC, provincial grants Alberta, Edmonton grants, Calgary grants",
}

export default function AlbertaGovernmentBusinessGrantsPage() {
  const faqData = [
    {
      question: "Can out-of-province companies apply for Alberta grants?",
      answer: "Some programs require Alberta incorporation. Others accept companies with significant Alberta operations or a firm commitment to expand to Alberta. Check specific program requirements."
    },
    {
      question: "How do Alberta programs work with federal funding?",
      answer: "Many Alberta programs can \"stack\" with federal programs like IRAP, SR&ED, and SBIR. Check stacking rules for each program—some cap total government funding at 75% of project costs."
    },
    {
      question: "What is the fastest way to get Alberta funding?",
      answer: "Alberta Innovates voucher programs typically have the fastest turnaround (4-6 weeks). Larger programs can take 3-6 months from application to funding approval."
    }
  ]

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
  }

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30"><Building className="w-3 h-3 mr-1" /> Provincial Programs</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Alberta Government Business Grants 2026</h1>
              <p className="text-xl text-blue-100 mb-8">Comprehensive guide to Alberta provincial funding programs. Access Alberta Innovates, technology commercialization grants, export development funding, and industry-specific programs.</p>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild><Link href="/grant-finder?province=alberta">Find Alberta Grants</Link></Button>
            </div>
          </div>
        </section>

        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <nav className="p-6 bg-gray-50 rounded-xl">
                <h2 className="text-lg font-bold mb-4">In This Guide</h2>
                <ul className="grid md:grid-cols-2 gap-2 text-sm">
                  <li><a href="#overview" className="text-blue-700 hover:underline">1. Alberta Funding Overview</a></li>
                  <li><a href="#alberta-innovates" className="text-blue-700 hover:underline">2. Alberta Innovates Programs</a></li>
                  <li><a href="#aitc" className="text-blue-700 hover:underline">3. Innovation Technology Programs</a></li>
                  <li><a href="#export" className="text-blue-700 hover:underline">4. Export Development</a></li>
                  <li><a href="#agriculture" className="text-blue-700 hover:underline">5. Agriculture Programs</a></li>
                  <li><a href="#energy" className="text-blue-700 hover:underline">6. Energy &amp; Environment</a></li>
                  <li><a href="#regional" className="text-blue-700 hover:underline">7. Regional Programs</a></li>
                  <li><a href="#eligibility" className="text-blue-700 hover:underline">8. Eligibility Requirements</a></li>
                  <li><a href="#application" className="text-blue-700 hover:underline">9. Application Process</a></li>
                  <li><a href="#mistakes" className="text-blue-700 hover:underline">10. Common Mistakes</a></li>
                  <li><a href="#success" className="text-blue-700 hover:underline">11. Success Strategies</a></li>
                  <li><a href="#faqs" className="text-blue-700 hover:underline">12. FAQs</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto grid md:grid-cols-4 gap-8 text-center">
              <div><div className="text-3xl font-bold text-blue-600 mb-2">$300M+</div><div className="text-gray-600">Annual Provincial Funding</div></div>
              <div><div className="text-3xl font-bold text-green-600 mb-2">50+</div><div className="text-gray-600">Active Programs</div></div>
              <div><div className="text-3xl font-bold text-purple-600 mb-2">$5M</div><div className="text-gray-600">Max Grant Size</div></div>
              <div><div className="text-3xl font-bold text-orange-600 mb-2">4</div><div className="text-gray-600">Key Agencies</div></div>
            </div>
          </div>
        </section>

        <section id="overview" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">How does Alberta Government Funding work?</h2>
              <p className="text-gray-700 leading-relaxed mb-6">Alberta offers one of Canada&apos;s most robust business funding ecosystems, with over $300 million annually available through provincial programs. The province&apos;s focus on economic diversification means strong support for technology (via <Link href="/blog/ideation-research-funding-canada" className="text-blue-700 hover:underline">Early Stage Innovation</Link>), clean energy, agriculture innovation, and export development.</p>
              <p className="text-gray-700 leading-relaxed mb-6">Key funding agencies include Alberta Innovates (innovation and technology), Alberta Enterprise Corporation (venture investment), and Alberta Economic Development and Trade (export and business development). The province also offers sector-specific programs through Agriculture and Forestry, Environment and Parks, and Energy departments.</p>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-blue-200"><CardHeader><CardTitle className="text-blue-700">Key Agencies</CardTitle></CardHeader><CardContent><ul className="text-sm space-y-2"><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Alberta Innovates</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Alberta Enterprise Corporation</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Alberta Economic Development</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Prairies Economic Development Canada</span></li></ul></CardContent></Card>
                <Card className="border-green-200"><CardHeader><CardTitle className="text-green-700">Priority Sectors</CardTitle></CardHeader><CardContent><ul className="text-sm space-y-2"><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Technology &amp; Innovation</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Clean Energy &amp; Environment</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Agriculture &amp; Agri-Food</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Life Sciences &amp; Health</span></li></ul></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        <section id="alberta-innovates" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">How do I get funding from Alberta Innovates?</h2>
              <p className="text-gray-700 mb-6">Alberta Innovates is the province&apos;s primary innovation agency, providing funding across the technology commercialization spectrum from early research to market-ready products. Programs support startups, SMEs, and research institutions.</p>
              <div className="space-y-4">
                <Card className="border-blue-200"><CardContent className="pt-6"><div className="flex items-center mb-3"><Beaker className="w-6 h-6 text-blue-600 mr-3" /><h3 className="font-bold text-lg">Voucher Programs</h3></div><p className="text-gray-700 mb-3">Quick-turnaround funding ($10K-$100K) for product development, market validation, and technology assessments.</p><ul className="text-sm grid md:grid-cols-2 gap-2"><li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Product Development Voucher</li><li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Market Intelligence Voucher</li><li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Technology Assessment Voucher</li><li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Industry Problem Solving</li></ul></CardContent></Card>
                <Card className="border-green-200"><CardContent className="pt-6"><div className="flex items-center mb-3"><TrendingUp className="w-6 h-6 text-green-600 mr-3" /><h3 className="font-bold text-lg">Scale-Up Programs</h3></div><p className="text-gray-700 mb-3">Larger funding ($100K-$2M) for product commercialization, manufacturing scale-up, and market expansion.</p><ul className="text-sm grid md:grid-cols-2 gap-2"><li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Product Commercialization</li><li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Business Acceleration</li><li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Clean Technology Development</li><li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Digital Innovation</li></ul></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        <section id="aitc" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">What Tech Grants are available in Alberta?</h2>
              <p className="text-gray-700 mb-6">Alberta has invested heavily in building a tech ecosystem with dedicated programs for software, AI, fintech, and cybersecurity companies. These complement federal programs like <Link href="/blog/canada-digital-ai-innovation-grants" className="text-blue-700 hover:underline">Digital Adoption Grants (CDAP)</Link> and SR&amp;ED.</p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-white rounded-lg border"><h3 className="font-bold mb-2">Digital Innovation</h3><p className="text-sm text-gray-600">Software, AI/ML, IoT, cloud solutions</p></div>
                <div className="p-4 bg-white rounded-lg border"><h3 className="font-bold mb-2">Fintech</h3><p className="text-sm text-gray-600">Banking, insurance, payment solutions</p></div>
                <div className="p-4 bg-white rounded-lg border"><h3 className="font-bold mb-2">Cleantech</h3><p className="text-sm text-gray-600">Emissions reduction, clean energy</p></div>
              </div>
            </div>
          </div>
        </section>

        <section id="export" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">How to get funding for Exporting?</h2>
              <p className="text-gray-700 mb-6">Alberta provides strong support for companies looking to expand into international markets. Programs cover market research, trade missions, and export readiness activities.</p>
              <div className="bg-blue-50 p-6 rounded-lg"><h3 className="font-bold mb-3">Export Support Activities</h3><ul className="grid md:grid-cols-2 gap-2 text-sm"><li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Trade mission participation</li><li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />International market research</li><li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Trade show exhibition costs</li><li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Export strategy development</li></ul></div>
            </div>
          </div>
        </section>

        <section id="agriculture" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">What Agriculture Grants are available?</h2>
              <p className="text-gray-700 mb-6">Alberta&apos;s agriculture sector benefits from both provincial and federal-provincial cost-shared programs through the Canadian Agricultural Partnership (CAP). Programs support everything from on-farm improvements to agri-tech innovation.</p>
              <div className="grid md:grid-cols-2 gap-6">
                <Card><CardContent className="pt-6"><h3 className="font-bold text-green-700 mb-2 flex items-center"><Tractor className="w-5 h-5 mr-2" />Farm Programs</h3><ul className="text-sm space-y-1"><li>• On-Farm Climate Action Fund</li><li>• Environmental Farm Plan</li><li>• Irrigation District Grants</li><li>• Farm Stewardship</li></ul></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold text-blue-700 mb-2 flex items-center"><Beaker className="w-5 h-5 mr-2" />Agri-Tech Programs</h3><ul className="text-sm space-y-1"><li>• Agriculture Research Funding</li><li>• Food Processing Innovation</li><li>• Precision Agriculture</li><li>• Value-Added Processing</li></ul></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        <section id="energy" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">How to get funding for Clean Energy projects?</h2>
              <p className="text-gray-700 mb-6">Alberta offers significant funding for clean energy, emissions reduction, and environmental technology. Programs support the province&apos;s transition away from traditional energy while maintaining economic competitiveness.</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200"><h3 className="font-bold text-green-700 mb-2">Emissions Reduction Alberta</h3><p className="text-sm text-gray-600">Large-scale funding for industrial emissions reduction projects and clean technology deployment.</p></div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200"><h3 className="font-bold text-blue-700 mb-2">Clean Technology</h3><p className="text-sm text-gray-600">Funding for development and commercialization of clean energy solutions.</p></div>
              </div>
            </div>
          </div>
        </section>

        <section id="regional" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Are there grants for Edmonton and Calgary?</h2>
              <p className="text-gray-700 mb-6">Edmonton, Calgary, and other municipalities offer complementary programs for local businesses. These often stack with provincial and federal funding.</p>
              <div className="grid md:grid-cols-2 gap-6">
                <Card><CardContent className="pt-6"><h3 className="font-bold mb-2">Edmonton Programs</h3><p className="text-sm text-gray-600 mb-2">Edmonton Global, economic development grants, innovation district incentives.</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold mb-2">Calgary Programs</h3><p className="text-sm text-gray-600 mb-2">Calgary Economic Development, Platform Calgary, Innovate Calgary programs.</p></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        <section id="eligibility" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Am I eligible for Alberta Business Grants?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card><CardHeader><CardTitle className="text-green-700 flex items-center"><CheckCircle className="w-5 h-5 mr-2" />General Requirements</CardTitle></CardHeader><CardContent><ul className="space-y-1 text-sm"><li>• Incorporated in Alberta or significant operations</li><li>• For-profit business entity</li><li>• Good financial standing</li><li>• Project benefits Alberta economy</li><li>• Matching funds often required</li></ul></CardContent></Card>
                <Card><CardHeader><CardTitle className="text-red-700 flex items-center"><AlertCircle className="w-5 h-5 mr-2" />Common Restrictions</CardTitle></CardHeader><CardContent><ul className="space-y-1 text-sm"><li>• No basic/fundamental research (use federal programs)</li><li>• No retail/hospitality for innovation programs</li><li>• Limited coverage for working capital</li><li>• Retroactive funding rarely allowed</li><li>• Must maintain Alberta operations</li></ul></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        <section id="application" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">How do I apply for Alberta Funding?</h2>
              <div className="space-y-4">
                <div className="flex items-start p-4 bg-white rounded-lg border"><div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">1</div><div><h3 className="font-bold">Identify Right Program</h3><p className="text-gray-600 text-sm">Match your project stage and sector to available programs. Many have specific eligibility windows.</p></div></div>
                <div className="flex items-start p-4 bg-white rounded-lg border"><div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">2</div><div><h3 className="font-bold">Pre-Application Consultation</h3><p className="text-gray-600 text-sm">Many Alberta Innovates programs require or recommend pre-application calls to assess fit.</p></div></div>
                <div className="flex items-start p-4 bg-white rounded-lg border"><div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">3</div><div><h3 className="font-bold">Prepare Application</h3><p className="text-gray-600 text-sm">Complete application forms with project plan, budget, team qualifications, and expected outcomes.</p></div></div>
                <div className="flex items-start p-4 bg-white rounded-lg border"><div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">4</div><div><h3 className="font-bold">Review &amp; Approval</h3><p className="text-gray-600 text-sm">Applications reviewed on merit. Timeline varies from 4 weeks (vouchers) to 3+ months (large grants).</p></div></div>
              </div>
            </div>
          </div>
        </section>

        <section id="mistakes" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Why do Alberta Grant Applications fail?</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Card><CardContent className="pt-6"><h3 className="font-bold text-red-600 mb-2">❌ Wrong Program Stage</h3><p className="text-sm text-gray-600">Applying to commercialization programs for R&amp;D projects or vice versa.</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold text-red-600 mb-2">❌ Missing Pre-Consultation</h3><p className="text-sm text-gray-600">Skipping recommended pre-application calls that help position your project.</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold text-red-600 mb-2">❌ Weak Alberta Impact</h3><p className="text-sm text-gray-600">Not clearly articulating benefits to Alberta economy and jobs.</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold text-red-600 mb-2">❌ Insufficient Matching</h3><p className="text-sm text-gray-600">Not having secured matching funds before applying.</p></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        <section id="success" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">How to win Alberta Government Grants?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div><h3 className="font-bold mb-3 text-green-700">✅ Winning Approaches</h3><ul className="space-y-2 text-sm"><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Focus on Alberta economic impact (jobs, investment, diversification)</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Stack provincial with federal programs when allowed</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Start with smaller voucher programs to build track record</span></li></ul></div>
                <div><h3 className="font-bold mb-3 text-purple-700">🎯 Pro Tips</h3><ul className="space-y-2 text-sm"><li className="flex items-start"><Target className="w-4 h-4 text-purple-500 mr-2 mt-0.5" /><span>Connect with Alberta Innovates advisors early in process</span></li><li className="flex items-start"><Target className="w-4 h-4 text-purple-500 mr-2 mt-0.5" /><span>Attend Alberta Tech Week and ecosystem events for visibility</span></li><li className="flex items-start"><Target className="w-4 h-4 text-purple-500 mr-2 mt-0.5" /><span>Combine with federal funding like <Link href="/blog/wbdc-equity-match-grant-women" className="text-purple-700 hover:underline">Women&apos;s Equity Grants</Link></span></li></ul></div>
              </div>
            </div>
          </div>
        </section>

        <section id="faqs" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions about Alberta Grants</h2>
              <div className="space-y-4">
                {faqData.map((faq, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <h3 className="font-bold flex items-start">
                        <HelpCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
                        {faq.question}
                      </h3>
                      <p className="text-gray-700 mt-2 ml-7">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Related Guides</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/blog/alberta-small-business-grants-guide" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-blue-600 mr-3" /><span>Alberta Small Business Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/blog/irap-industrial-research-assistance-program" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-blue-600 mr-3" /><span>IRAP Program Guide</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/canada/government-grants" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-blue-600 mr-3" /><span>All Government Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/canada" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-blue-600 mr-3" /><span>Canadian Funding</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-6">Access Alberta Government Funding</h2>
              <p className="text-xl text-blue-100 mb-8">Get expert help navigating Alberta&apos;s funding programs. We&apos;ve helped Alberta businesses secure millions in provincial and federal grants.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild><Link href="/guides/apply-alberta-government-grants"><Download className="w-4 h-4 mr-2" /> Get Alberta Guide</Link></Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild><Link href="/contact?province=alberta">Get Expert Help</Link></Button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
