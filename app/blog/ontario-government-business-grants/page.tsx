import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, DollarSign, Target, AlertCircle, Building, MapPin, HelpCircle, TrendingUp, BookOpen, ExternalLink, Factory, Film, Download, Users, FileText, Clock, Lightbulb } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ontario Government Business Grants 2026 | Complete Provincial Funding Guide",
  description: "Complete guide to Ontario government business grants. Access Ontario Creates, NOHFC, SWODF, EODF, and Starter Company Plus for startups, manufacturers, and creative industries.",
  keywords: "Ontario government grants, Ontario business funding, NOHFC grants, SWODF, EODF, Ontario Creates, Starter Company Plus, FedDev Ontario",
}

export default function OntarioGovernmentBusinessGrantsPage() {
  const faqData = [
    {
      question: "What Ontario grants are available for small businesses in 2026?",
      answer: "Ontario offers NOHFC (up to $5M for Northern Ontario), EODF and SWODF for regional development, Starter Company Plus ($5,000 for new businesses), Ontario Creates tax credits (35-45% for digital media/film), and FedDev Ontario programs (up to $10M). Program availability depends on your location and industry."
    },
    {
      question: "How do I apply for Starter Company Plus in Ontario?",
      answer: "Contact your local Small Business Enterprise Centre (SBEC) to register. Complete the required business training program (usually 2-4 weeks). Prepare your business plan with financial projections. Apply for the grant (up to $5,000) and attend a pitch session. Approval takes 2-4 weeks after completing training."
    },
    {
      question: "What is the difference between provincial and federal funding?",
      answer: "Provincial funds (like NOHFC) focus on local job creation and economic development within Ontario. Federal funds (like FedDev Ontario or ISED) focus on broader national goals like productivity, innovation, and export scale-up."
    },
    {
      question: "Are Ontario Creates tax credits better than grants?",
      answer: "Often yes for digital media and film. Tax credits of 35-45% on labour costs are entitlement-based (if you qualify, you get it), whereas grants are competitive and uncertain."
    },
    {
      question: "How many jobs do I need to create to get NOHFC funding?",
      answer: "Regional development funds typically require creating 5-10 permanent full-time jobs for larger grants ($500k+). Smaller programs like Starter Company Plus do not have strict job creation quotas but require self-employment."
    },
    {
      question: "Can I apply for both provincial and federal grants in Ontario?",
      answer: "Yes, this is called 'stacking.' However, you generally cannot cover more than 75% of total project costs with government funds. You must disclose all funding sources in your application."
    },
    {
      question: "What manufacturing grants are available in Ontario?",
      answer: "Manufacturers can access SWODF in Southwestern Ontario, NOHFC in Northern Ontario, FedDev Ontario's Business Scale-Up program, and the Strategic Innovation Fund for major projects. Automotive and EV battery manufacturing receive priority support. Most programs require job creation commitments."
    },
    {
      question: "Do I need to pay back Ontario business grants?",
      answer: "Most true grants (like Starter Company Plus) are non-repayable. However, large regional funds (SWODF, EODF) often offer 'conditionally repayable loans' where a portion (e.g., 20-30%) is forgiven if you meet job targets, and the rest is an interest-free loan."
    },
    {
      question: "Can I use grant money to buy a building or land?",
      answer: "Generally, no. Government grants rarely fund capital assets like real estate. They prefer to fund 'soft costs' like training, R&D, marketing, or equipment that directly increases productivity. BDC offers commercial real estate financing, but that is a loan, not a grant."
    },
    {
      question: "Is there specific funding for women entrepreneurs in Ontario?",
      answer: "Yes. The 'StrikeUP' conference and 'Digital Main Street' often have women-specific streams. Additionally, the federally funded 'Women Entrepreneurship Strategy' (WES) flows capital through local partners. Microlending programs like PARO Centre for Women's Enterprise offer loans and peer support in Ontario."
    },
    {
      question: "How does the Digital Main Street program work?",
      answer: "Digital Main Street (DMS) helps main street businesses go digital. The 'Digital Transformation Grant' provides $2,500 to implement a digital plan (e.g., e-commerce, social media ads). You must complete a series of online training videos to qualify. It's one of the most accessible grants for retail."
    },
    {
      question: "What is the Summer Company program?",
      answer: "Summer Company is an Ontario government program for students aged 15-29 returning to school. It provides up to $3,000 in funding and mentorship to run a summer business. It's an excellent way for young entrepreneurs to test a business idea with low risk."
    },
    {
      question: "Can non-profits apply for Ontario business grants?",
      answer: "Some programs, especially those focused on social enterprise, community development (Trillium Foundation), or tourism/culture (Ontario Creates), open eligibility to non-profits. However, straight 'business growth' funds usually require a for-profit structure."
    },
    {
      question: "Do I need a business plan to apply?",
      answer: "Yes. Almost every grant, from $5,000 to $5 million, requires some form of business plan. For small grants, a 'Business Model Canvas' might suffice. For large funds, you need a 30+ page professional business plan with 3-year pro-forma financial statements."
    },
    {
      question: "How are government grants taxed in Ontario?",
      answer: "Government grants are considered taxable income by the CRA. If you receive a $10,000 grant, you must report it as income, and you will pay tax on it at your corporate tax rate. However, you can deduct the expenses you paid for with the grant, which often neutralizes the tax impact."
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
        <section className="bg-gradient-to-br from-red-600 to-red-800 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30"><Building className="w-3 h-3 mr-1" /> Provincial Programs</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Ontario Government Business Grants 2026</h1>
              <p className="text-xl text-red-100 mb-8">Comprehensive guide to Ontario provincial funding programs. Access Ontario Creates, NOHFC, SWODF, EODF, and Starter Company Plus for businesses across all regions and sectors.</p>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild><Link href="/grant-finder?province=ontario">Find Ontario Grants</Link></Button>
            </div>
          </div>
        </section>

        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <nav className="p-6 bg-gray-50 rounded-xl">
                <h2 className="text-lg font-bold mb-4">In This Guide</h2>
                <ul className="grid md:grid-cols-2 gap-2 text-sm">
                  <li><a href="#overview" className="text-blue-700 hover:underline">1. Ontario Funding Overview</a></li>
                  <li><a href="#regional" className="text-blue-700 hover:underline">2. Regional Development Funds</a></li>
                  <li><a href="#starter" className="text-blue-700 hover:underline">3. Starter Company Plus</a></li>
                  <li><a href="#creates" className="text-blue-700 hover:underline">4. Ontario Creates</a></li>
                  <li><a href="#feddev" className="text-blue-700 hover:underline">5. FedDev Ontario</a></li>
                  <li><a href="#manufacturing" className="text-blue-700 hover:underline">6. Manufacturing Programs</a></li>
                  <li><a href="#tech" className="text-blue-700 hover:underline">7. Tech &amp; Innovation</a></li>
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
              <div><div className="text-3xl font-bold text-red-600 mb-2">$2.5B+</div><div className="text-gray-600">Annual Investment</div></div>
              <div><div className="text-3xl font-bold text-blue-600 mb-2">50+</div><div className="text-gray-600">Active Programs</div></div>
              <div><div className="text-3xl font-bold text-green-600 mb-2">$5M</div><div className="text-gray-600">Max NOHFC</div></div>
              <div><div className="text-3xl font-bold text-purple-600 mb-2">45%</div><div className="text-gray-600">Max Tax Credit</div></div>
            </div>
          </div>
        </section>

        <section id="overview" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">How does Ontario Government Funding work?</h2>
              <p className="text-gray-700 leading-relaxed mb-6">Ontario offers Canada&apos;s most diverse provincial funding ecosystem, with over $2.5 billion annually available. The province emphasizes regional economic development through dedicated funds for Northern, Eastern, and Southwestern Ontario. A manufacturer in Windsor accesses completely different programs than a tech startup in Waterloo—location matters significantly.</p>
              <p className="text-gray-700 leading-relaxed mb-6">Key funding agencies include NOHFC (Northern Ontario), EODF (Eastern Ontario), SWODF (Southwestern Ontario), Ontario Creates (creative industries), and FedDev Ontario (federal regional development). Unlike federal grants which often focus on R&amp;D (like <Link href="/blog/irap-industrial-research-assistance-program" className="text-blue-700 hover:underline">IRAP</Link>), Ontario provincial grants are focused on job creation.</p>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-red-200"><CardHeader><CardTitle className="text-red-700">Regional Funds</CardTitle></CardHeader><CardContent><ul className="text-sm space-y-2"><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>NOHFC (Northern)</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>EODF (Eastern)</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>SWODF (Southwestern)</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>FedDev Ontario</span></li></ul></CardContent></Card>
                <Card className="border-blue-200"><CardHeader><CardTitle className="text-blue-700">Priority Sectors</CardTitle></CardHeader><CardContent><ul className="text-sm space-y-2"><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Advanced Manufacturing</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Automotive &amp; EV</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Film &amp; Digital Media</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Life Sciences</span></li></ul></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        <section id="regional" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Which Regional Fund applies to my business?</h2>
              <p className="text-gray-700 mb-6">Ontario&apos;s approach to business funding is highly regional. Each area has dedicated development funds with different priorities, amounts, and eligibility requirements based on economic development needs.</p>
              <div className="space-y-4">
                <Card className="border-blue-200"><CardContent className="pt-6"><div className="flex items-center mb-3"><MapPin className="w-6 h-6 text-blue-600 mr-3" /><h3 className="font-bold text-lg">Northern Ontario Heritage Fund (NOHFC)</h3></div><p className="text-gray-700 mb-3">Up to $5 million for businesses in Northern Ontario. Strong focus on resource industries, manufacturing expansion, and job creation in communities north of the French River.</p></CardContent></Card>
                <Card className="border-green-200"><CardContent className="pt-6"><div className="flex items-center mb-3"><MapPin className="w-6 h-6 text-green-600 mr-3" /><h3 className="font-bold text-lg">Eastern Ontario Development Fund (EODF)</h3></div><p className="text-gray-700 mb-3">Funding for businesses creating jobs in Eastern Ontario counties. Emphasis on manufacturing, food processing, and tourism industries.</p></CardContent></Card>
                <Card className="border-purple-200"><CardContent className="pt-6"><div className="flex items-center mb-3"><MapPin className="w-6 h-6 text-purple-600 mr-3" /><h3 className="font-bold text-lg">Southwestern Ontario Development Fund (SWODF)</h3></div><p className="text-gray-700 mb-3">Support for businesses in the Windsor-Essex corridor. Strong automotive and manufacturing focus with job creation requirements.</p></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        <section id="starter" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">How can Startups get $5,000 from Starter Company Plus?</h2>
              <p className="text-gray-700 mb-6">Ontario&apos;s flagship entrepreneurship program combines training, mentorship, and grant funding for new businesses. Administered through local Small Business Enterprise Centres (SBECs), it&apos;s often the &quot;first grant&quot; for many entrepreneurs. You must complete a training program to unlock the grant.</p>
              <div className="bg-red-50 p-6 rounded-lg border border-red-200"><h3 className="font-bold text-red-800 mb-4">Program Details</h3><div className="grid md:grid-cols-3 gap-4 text-sm"><div><strong>Grant:</strong> Up to $5,000</div><div><strong>Training:</strong> Required</div><div><strong>Target:</strong> New businesses (&lt;5 years)</div></div></div>
            </div>
          </div>
        </section>

        <section id="creates" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">How do Creative Industries access 45% Tax Credits?</h2>
              <p className="text-gray-700 mb-6">Ontario Creates is the agency for film, TV, music, book publishing, and interactive digital media. They administer both direct funding programs and substantial tax credits that can return 35-45% of eligible labour costs.</p>
              <div className="grid md:grid-cols-2 gap-6">
                <Card><CardContent className="pt-6"><h3 className="font-bold text-purple-700 mb-2 flex items-center"><Film className="w-5 h-5 mr-2" />Tax Credits</h3><ul className="text-sm space-y-1"><li>• OIDMTC (Digital Media): 35-40%</li><li>• OCASE (Animation): Up to 45%</li><li>• OPSTC (Production Services): 21.5%</li></ul></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold text-blue-700 mb-2 flex items-center"><TrendingUp className="w-5 h-5 mr-2" />Direct Funding</h3><ul className="text-sm space-y-1"><li>• IDM Fund</li><li>• Music Investment Fund</li><li>• Book Publishing Fund</li></ul></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        <section id="feddev" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">What funding does FedDev Ontario offer?</h2>
              <p className="text-gray-700 mb-6">FedDev Ontario is the federal regional development agency for southern Ontario. They offer significant funding for business growth, innovation, and community economic development, including conditionally repayable contributions (interest-free loans) up to $10 million.</p>
              <div className="grid md:grid-cols-2 gap-4"><div className="p-4 bg-white rounded-lg border"><h3 className="font-bold mb-2">Business Scale-Up</h3><p className="text-sm text-gray-600">Productivity improvements, equipment, expansion</p></div><div className="p-4 bg-white rounded-lg border"><h3 className="font-bold mb-2">Regional Innovation</h3><p className="text-sm text-gray-600">Ecosystem development, accelerators</p></div></div>
            </div>
          </div>
        </section>

        <section id="manufacturing" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">What Grants are available for Manufacturers?</h2>
              <p className="text-gray-700 mb-6">Ontario has the largest manufacturing base in Canada. Automotive, aerospace, and advanced manufacturing companies can access significant funding for expansion, equipment, and job creation through regional development funds.</p>
              <div className="grid md:grid-cols-2 gap-6">
                <Card><CardContent className="pt-6"><h3 className="font-bold text-blue-700 mb-2 flex items-center"><Factory className="w-5 h-5 mr-2" />Automotive Focus</h3><p className="text-sm text-gray-600">EV battery manufacturing, supply chain development, plant modernization</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold text-green-700 mb-2 flex items-center"><TrendingUp className="w-5 h-5 mr-2" />Advanced Manufacturing</h3><p className="text-sm text-gray-600">Automation, Industry 4.0, digital transformation</p></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        <section id="tech" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">How do Tech Startups get R&amp;D Funding?</h2>
              <p className="text-gray-700 mb-6">Ontario&apos;s tech hubs in Toronto, Waterloo, and Ottawa are supported by ecosystem programs, R&amp;D funding, and talent development initiatives through partnerships with OCE and <Link href="/blog/ideation-research-funding-canada" className="text-blue-700 hover:underline">Idea-stage funding mechanisms</Link>.</p>
              <div className="bg-purple-50 p-6 rounded-lg"><ul className="grid md:grid-cols-2 gap-2 text-sm"><li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Accelerator and incubator funding</li><li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />R&amp;D partnerships (OCE/IRAP)</li><li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Graduate talent programs</li><li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Scale-up support</li></ul></div>
            </div>
          </div>
        </section>

        <section id="eligibility" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Am I eligible for Ontario Business Grants?</h2>
              <p className="text-gray-700 mb-8">Eligibility varies by program, but most Ontario government grants share a common set of baseline requirements. Meeting these "gatekeeper" criteria is essential before spending time on specific applications.</p>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Card className="border-green-200 shadow-sm">
                  <CardHeader className="bg-green-50 border-b border-green-100">
                    <CardTitle className="text-green-800 flex items-center"><CheckCircle className="w-5 h-5 mr-2" /> Mandatory Requirements</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <ul className="space-y-3">
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" /><span className="text-sm"><strong>Ontario Incorporation:</strong> Must be incorporated federally or provincially with a head office in Ontario.</span></li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" /><span className="text-sm"><strong>Financial Stability:</strong> Must demonstrate ability to complete the project (e.g., bank statements, existing revenue).</span></li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" /><span className="text-sm"><strong>Liability Insurance:</strong> Minimum $2M commercial general liability insurance is standard.</span></li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" /><span className="text-sm"><strong>Payroll Account:</strong> Must have valid CRA business number and payroll account for hiring grants.</span></li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-red-200 shadow-sm">
                  <CardHeader className="bg-red-50 border-b border-red-100">
                    <CardTitle className="text-red-800 flex items-center"><AlertCircle className="w-5 h-5 mr-2" /> Deal Breakers</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <ul className="space-y-3">
                      <li className="flex items-start"><AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" /><span className="text-sm"><strong>Retail & Hospitality:</strong> Most innovation/scale-up grants exclude retail, restaurants, and personal services.</span></li>
                      <li className="flex items-start"><AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" /><span className="text-sm"><strong>Debt/Tax Arrears:</strong> Outstanding taxes or legal judgments will immediately disqualify you.</span></li>
                      <li className="flex items-start"><AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" /><span className="text-sm"><strong>Sole Proprietors:</strong> many larger funds (NOHFC, SWODF) require incorporation.</span></li>
                      <li className="flex items-start"><AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" /><span className="text-sm"><strong>Retroactive Costs:</strong> You cannot claim expenses incurred before approval.</span></li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <h3 className="text-2xl font-bold mb-6">Required Document Checklist</h3>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold mb-4 flex items-center text-blue-700"><FileText className="w-5 h-5 mr-2" /> Corporate Documents</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-center"><div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>Articles of Incorporation</li>
                      <li className="flex items-center"><div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>CRA Business Number</li>
                      <li className="flex items-center"><div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>Bank Statements (3-6 months)</li>
                      <li className="flex items-center"><div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>Financial Statements (Notice to Reader)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold mb-4 flex items-center text-blue-700"><Target className="w-5 h-5 mr-2" /> Project Documents</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-center"><div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>Project Plan & Timeline</li>
                      <li className="flex items-center"><div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>Detailed Budget & Quotes</li>
                      <li className="flex items-center"><div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>Marketing/Business Plan</li>
                      <li className="flex items-center"><div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>Job Descriptions for New Hires</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="application" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Step-by-Step Application Guide</h2>
              <p className="text-gray-700 mb-10">Applying for Ontario government funding is a rigorous process. Follow this roadmap to maximize your chances of approval. Expect the entire process to take 3-6 months for major funds.</p>

              <div className="relative border-l-4 border-blue-200 ml-4 space-y-12">
                <div className="relative pl-8">
                  <div className="absolute -left-[22px] top-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold border-4 border-white">1</div>
                  <h3 className="text-xl font-bold mb-2">Pre-Submission Consultation</h3>
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <p className="text-gray-700 mb-3"><strong>Critical Step:</strong> Most Ontario regional funds (SWODF, EODF, NOHFC) require or highly recommend a consultation with a program advisor before you write a single word.</p>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                      <li>Verify eligibility early to avoid wasting time.</li>
                      <li>Get feedback on your "pitch" and project scope.</li>
                      <li>Advisors can tell you if funds are currently depleted or prioritizing specific sectors.</li>
                    </ul>
                  </div>
                </div>

                <div className="relative pl-8">
                  <div className="absolute -left-[22px] top-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold border-4 border-white">2</div>
                  <h3 className="text-xl font-bold mb-2">Stage 1: Eligibility Enrollment</h3>
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <p className="text-gray-700 mb-3">Submit a high-level overview of your company and project. This is a "pass/fail" check.</p>
                    <div className="flex items-center gap-4 text-sm bg-blue-50 p-3 rounded">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span><strong>Timeline:</strong> 2-4 weeks for confirmation.</span>
                    </div>
                  </div>
                </div>

                <div className="relative pl-8">
                  <div className="absolute -left-[22px] top-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold border-4 border-white">3</div>
                  <h3 className="text-xl font-bold mb-2">Stage 2: Full Application</h3>
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <p className="text-gray-700 mb-3">This is the heavy lifting. You will need to provide detailed financial projections, 3-year cash flow forecasts, and a granular project budget.</p>
                    <p className="text-sm text-gray-600 italic"><strong>Tip:</strong> Ensure your "Job Creation" numbers are realistic. You will be held to these targets contractually.</p>
                  </div>
                </div>

                <div className="relative pl-8">
                  <div className="absolute -left-[22px] top-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold border-4 border-white">4</div>
                  <h3 className="text-xl font-bold mb-2">Due Diligence & Approval</h3>
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <p className="text-gray-700 mb-3">Government analysts will audit your financials and business health. They may ask for clarification or supplementary documents.</p>
                    <div className="flex items-center gap-4 text-sm bg-blue-50 p-3 rounded">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span><strong>Timeline:</strong> 3-6 months. Do not start the project yet!</span>
                    </div>
                  </div>
                </div>

                <div className="relative pl-8">
                  <div className="absolute -left-[22px] top-0 w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold border-4 border-white">5</div>
                  <h3 className="text-xl font-bold mb-2">Contract & Claims</h3>
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <p className="text-gray-700 mb-3">Once signed, you can start spending. Grants are reimbursed <strong>after</strong> you spend the money. You will submit claim forms with invoices and proof of payment every quarter or milestone.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="mistakes" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Why do Ontario Grant Applications fail?</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Card><CardContent className="pt-6"><h3 className="font-bold text-red-600 mb-2">❌ Unrealistic Job Targets</h3><p className="text-sm text-gray-600">Committing to job creation you can&apos;t achieve leads to clawbacks.</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold text-red-600 mb-2">❌ Wrong Regional Fund</h3><p className="text-sm text-gray-600">Applying to NOHFC when you&apos;re in Southern Ontario.</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold text-red-600 mb-2">❌ Counting Contractors</h3><p className="text-sm text-gray-600">Job creation requires permanent full-time employees only.</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold text-red-600 mb-2">❌ Skipping SBEC</h3><p className="text-sm text-gray-600">Not building relationship with local Small Business Centre.</p></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        <section id="regional-ecosystems" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Region-by-Region: Where is the money flowing?</h2>
              <p className="text-gray-700 mb-8">Ontario is massive. A "one-size-fits-all" approach fails because funding priorities shift drastically from Toronto to Thunder Bay.</p>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="border border-blue-200 rounded-xl p-6 bg-blue-50">
                  <h3 className="text-2xl font-bold text-blue-800 mb-2">Toronto & Waterloo</h3>
                  <Badge className="bg-blue-600 mb-4">Fintech • AI • Life Sciences</Badge>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex items-start"><CheckCircle className="w-4 h-4 text-blue-600 mr-2 mt-0.5" /><strong>MaRS Discovery District:</strong> The mothership for Toronto tech. Offers advisory services (not direct grants) that unlock funding.</li>
                    <li className="flex items-start"><CheckCircle className="w-4 h-4 text-blue-600 mr-2 mt-0.5" /><strong>Communitech:</strong> Waterloo's hub. Critical for accessing the "Fierce Founders" (women-led) or data-driven grants.</li>
                    <li className="flex items-start"><CheckCircle className="w-4 h-4 text-blue-600 mr-2 mt-0.5" /><strong>City of Toronto Grants:</strong> Look for the "Main Street Innovation Fund" if you have a physical storefront.</li>
                  </ul>
                </div>

                <div className="border border-green-200 rounded-xl p-6 bg-green-50">
                  <h3 className="text-2xl font-bold text-green-800 mb-2">Ottawa & Eastern ON</h3>
                  <Badge className="bg-green-600 mb-4">SaaS • Defense • Telecom</Badge>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5" /><strong>Invest Ottawa:</strong> Offers the "ScaleUp" residence. Best path to get noticed by federal procurement officers.</li>
                    <li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5" /><strong>L-SPARK:</strong> Specialized accelerator for B2B SaaS companies.</li>
                    <li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5" /><strong>EODF Stream:</strong> Eastern Ontario Development Fund has a specific stream for "Regional Economic Development" perfect for manufacturers in rural east.</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 border border-purple-200 rounded-xl p-6 bg-purple-50">
                <h3 className="text-2xl font-bold text-purple-800 mb-2">Northern Ontario (The "Bonus" Zone)</h3>
                <Badge className="bg-purple-600 mb-4">Mining • Forestry • Tourism</Badge>
                <p className="text-sm text-gray-700 mb-4">
                  If you can locate your business in Sudbury, Thunder Bay, or Sault Ste. Marie, you gain access to the <strong>most generous grants in Canada</strong> via NOHFC.
                </p>
                <ul className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                  <li className="flex items-start"><CheckCircle className="w-4 h-4 text-purple-600 mr-2 mt-0.5" /><strong>Invest North:</strong> Up to 50% of project costs (grant + loan).</li>
                  <li className="flex items-start"><CheckCircle className="w-4 h-4 text-purple-600 mr-2 mt-0.5" /><strong>Film & TV:</strong> Higher tax credits than Toronto productions.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="oci" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">The Hidden Giant: Ontario Centre of Innovation (OCI)</h2>
              <p className="text-gray-700 mb-6">While everyone applies for NOHFC, the <strong>Ontario Centre of Innovation</strong> (formerly OCE) quietly funds the most cutting-edge R&D projects. They are the bridge between industry and academia.</p>

              <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-8">
                <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-2 flex items-center"><Target className="w-5 h-5 text-red-600 mr-2" />Voucher for Innovation</h3>
                    <p className="text-sm text-gray-600">Funding to hire a college or university to solve a technical problem for you. You keep the IP.</p>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-2 flex items-center"><TrendingUp className="w-5 h-5 text-blue-600 mr-2" />Ready 4 Market</h3>
                    <p className="text-sm text-gray-600">Co-investment for startups raising their seed round. OCI invests alongside angels.</p>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-2 flex items-center"><Factory className="w-5 h-5 text-gray-600 mr-2" />Vehicle Innovation</h3>
                    <p className="text-sm text-gray-600">Through OVIN, massive grants for EV and autonomous vehicle technologies.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="case-study" className="py-16 bg-white border-t">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Ontario Success Story: The Green Tech Pivot</h2>
              <Card className="bg-green-50 border-green-200">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <Lightbulb className="w-6 h-6 text-green-700" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-green-900 mb-2">From $0 to $500k in Non-Dilutive Funding</h3>
                      <p className="text-gray-700 mb-4">
                        A Guelph-based agricultural tech startup used a smart stacking strategy. They started with a $5,000 <strong>Starter Company Plus</strong> grant to incorporate and buy initial equipment.
                      </p>
                      <p className="text-gray-700 mb-4">
                        Once they had a prototype, they secured $30,000 from the <strong>Bioenterprise</strong> accelerator (funded by FedDev). They used this traction to unlock a $50,000 <strong>IRAP</strong> grant for youth hiring.
                      </p>
                      <p className="text-gray-700">
                        <strong>Key Takeaway:</strong> They didn't go for the "big" grants first. They built a "ladder of funding," using small wins to prove credibility for larger institutional funds like the <strong>Southwestern Ontario Development Fund (SWODF)</strong>.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="success" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">How to win Ontario Business Grants?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div><h3 className="font-bold mb-3 text-green-700">✅ Winning Approaches</h3><ul className="space-y-2 text-sm"><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Emphasize permanent job creation</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Build SBEC advisor relationships</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Stack with federal programs like <Link href="/blog/women-entrepreneurship-strategy-canada" className="text-purple-700 hover:underline">WES</Link></span></li></ul></div>
                <div><h3 className="font-bold mb-3 text-purple-700">🎯 Pro Tips</h3><ul className="space-y-2 text-sm"><li className="flex items-start"><Target className="w-4 h-4 text-purple-500 mr-2 mt-0.5" /><span>Ontario Creates credits often beat grants</span></li><li className="flex items-start"><Target className="w-4 h-4 text-purple-500 mr-2 mt-0.5" /><span>Northern Ontario has most generous programs</span></li><li className="flex items-start"><Target className="w-4 h-4 text-purple-500 mr-2 mt-0.5" /><span>Combine with IRAP for R&amp;D funding</span></li></ul></div>
              </div>
            </div>
          </div>
        </section>

        <section id="glossary" className="py-16 bg-white border-t">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Glossary of Ontario Funding Terms</h2>
              <p className="text-gray-700 mb-8">Government applications use specific jargon. Understanding these terms is crucial to selecting the right program and writing a compliant application.</p>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-slate-50 border-slate-200">
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-slate-900 mb-2">Contribution Agreement</h3>
                    <p className="text-sm text-gray-600">The legal contract you sign after approval. It dictates exactly how you can spend the money, the reporting requirements, and the consequences of defaulting.</p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-50 border-slate-200">
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-slate-900 mb-2">Stacking Limit</h3>
                    <p className="text-sm text-gray-600">The maximum percentage of total project costs that can come from ALL government sources combined. Usually capped at 75%. You must pay the remaining 25%.</p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-50 border-slate-200">
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-slate-900 mb-2">Entitlement vs. Discretionary</h3>
                    <p className="text-sm text-gray-600"><strong>Entitlement:</strong> If you meet the criteria (e.g., Tax Credits), you <em>must</em> get the money. <strong>Discretionary:</strong> Grants are competitive; even if you qualify, you might not get funded.</p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-50 border-slate-200">
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-slate-900 mb-2">Clawback</h3>
                    <p className="text-sm text-gray-600">If you fail to meet your contractual "job creation" or "spending" targets, the government can demand you repay the grant. This is called a clawback.</p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-50 border-slate-200">
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-slate-900 mb-2">In-Kind Contribution</h3>
                    <p className="text-sm text-gray-600">Non-cash contributions to a project, like your own unpaid labor or using existing equipment. Most major grants DO NOT count this as "matching funds."</p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-50 border-slate-200">
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-slate-900 mb-2">Holdback</h3>
                    <p className="text-sm text-gray-600">The government often holds back the final 10-20% of the grant payment until you submit the Final Report and verify all project metrics.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section id="faqs" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions about Ontario Grants</h2>
              <div className="space-y-4">
                {faqData.map((faq, index) => (
                  <Accordion type="single" collapsible key={index}>
                    <AccordionItem value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        <span className="font-medium text-blue-700">{faq.question}</span>
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

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Compare Other Provincial Grant Programs</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <Link href="/blog/alberta-government-business-grants" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><MapPin className="w-5 h-5 text-blue-600 mr-3" /><span>Alberta Business Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/blog/british-columbia-government-business-grants" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><MapPin className="w-5 h-5 text-blue-600 mr-3" /><span>BC Business Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/blog/quebec-government-business-grants" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><MapPin className="w-5 h-5 text-blue-600 mr-3" /><span>Quebec Business Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/blog/saskatchewan-small-business-grants-guide" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><MapPin className="w-5 h-5 text-blue-600 mr-3" /><span>Saskatchewan Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/blog/manitoba-small-business-grants-guide" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><MapPin className="w-5 h-5 text-blue-600 mr-3" /><span>Manitoba Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
              </div>
              <h3 className="text-xl font-bold mb-4">Related Funding Guides</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/blog/irap-industrial-research-assistance-program" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-green-600 mr-3" /><span>IRAP Program Guide</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/blog/canada-federal-grants" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-green-600 mr-3" /><span>Federal Grants Guide</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-r from-red-600 to-red-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-6">Access Ontario Government Funding</h2>
              <p className="text-xl text-red-100 mb-8">Get expert help navigating Ontario&apos;s regional funding programs.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild><Link href="/guides/apply-ontario-grants"><Download className="w-4 h-4 mr-2" /> Get Guide</Link></Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild><Link href="/contact?province=ontario">Get Expert Help</Link></Button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
