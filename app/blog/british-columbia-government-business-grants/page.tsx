import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowRight, DollarSign, BarChart, Target, AlertTriangle, BookOpen, Users, Lightbulb, Download, Shield, Award, Mountain, PieChart, TrendingUp, HelpCircle, Zap, ExternalLink, Leaf, Film, Building, FileText, Clock } from "lucide-react";
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "British Columbia Government Business Grants 2026 | Complete BC Provincial Funding Guide",
  description: "Complete guide to British Columbia government business grants. Access Innovate BC, CleanBC, Creative BC, and PacifiCan funding programs for tech, clean energy, and creative industries.",
  keywords: "BC government grants, British Columbia business funding, Innovate BC grants, CleanBC funding, Creative BC, PacifiCan grants, Vancouver startup grants",
}

export default function BritishColumbiaGovernmentBusinessGrantsPage() {
  const faqData = [
    {
      question: "What grants are available for BC tech startups in 2026?",
      answer: "Innovate BC offers the Ignite Program (up to $300K for R&D), Digital Skills Internship (wage subsidies), and Venture Acceleration Program (free mentorship). PacifiCan provides interest-free loans up to $5M for scale-up. CleanBC offers grants for clean technology development."
    },
    {
      question: "How do I apply for Innovate BC grants?",
      answer: "Start by contacting Innovate BC advisors for a pre-consultation. Prepare your application with a detailed project plan, budget, team qualifications, and IP strategy. Most programs require matching investment (often 1:3 ratio). Processing takes 4-8 weeks for most programs."
    },
    {
      question: "What is the difference between Innovate BC and PacifiCan?",
      answer: "Innovate BC is a provincial agency focusing on grants for early-stage R&D and tech commercialization. PacifiCan is a federal agency focusing on interest-free loans for companies ready to scale up and export."
    },
    {
      question: "Can I get BC funding if I am not in Vancouver?",
      answer: "Yes! In fact, many programs like the Regional Innovation Ecosystems (RIE) prioritize businesses in regions like the Okanagan, Kootenays, and Northern BC to promote balanced economic growth."
    },
    {
      question: "What are the BC film and TV tax credits for 2026?",
      answer: "BC offers some of North America's most competitive film tax credits: BC Production Services Tax Credit (28%), BC Film & TV Tax Credit (35%), plus regional and distant location bonuses. These are refundable tax credits (paid after filing taxes), not upfront grants."
    },
    {
      question: "How does CleanBC funding work for businesses?",
      answer: "CleanBC offers Go Electric rebates for commercial vehicles and chargers, industrial emissions reduction grants through the CleanBC Industry Fund, and building efficiency incentives. Programs can often be stacked with federal iZEV and other incentives."
    },
    {
      question: "What is the fastest way to get business funding in BC?",
      answer: "Innovate BC's voucher programs and Digital Skills Internship have 4-8 week turnarounds. CleanBC Go Electric rebates process quickly. Larger PacifiCan BSP loans take 3-6 months. Film tax credits are claimed annually with tax returns."
    },
    {
      question: "Are there grants for buying a business in BC?",
      answer: "Generally no. Grants fund 'growth' (marketing, R&D, hiring), not 'acquisitions.' However, financing programs like Community Futures or BDC provide loans specifically for buying existing businesses, especially in rural areas."
    },
    {
      question: "What is the Alacrity Canada Cleantech Program?",
      answer: "Alacrity is a specialized program in BC that helps cleantech companies scale. They provide funding, but more importantly, they open doors to international markets and customer pilots, which is often more valuable than cash."
    },
    {
      question: "Can I get funding for a cannabis business in BC?",
      answer: "It is difficult but possible. Innovate BC and federal agricultural programs may fund the 'agri-tech' or 'processing' side of cannabis (e.g., energy-efficient grow lights), but will not fund general retail operations."
    },
    {
      question: "Does BC have a 'Digital Main Street' equivalent?",
      answer: "Yes, the 'Launch Online' grant was a similar popular program. Currently, the 'Canada Digital Adoption Program' (CDAP) serves this role, offering up to $2,400 for e-commerce and $15,000 for digital strategy, administered via Alacrity Canada and Small Business BC."
    },
    {
      question: "What is the difference between a grant and a tax credit?",
      answer: "A grant is money given upfront (or reimbursed) to pay for a project. A tax credit (like SR&ED or Film) is a reduction in taxes aimed to reduce your tax bill, or a refund check sent after you file your corporate taxes. Tax credits are slower but more reliable."
    },
    {
      question: "Are there specific grants for Indigenous entrepreneurs in BC?",
      answer: "Yes. The Indigenous Business & Investment Council (IBIC) lists many resources. The New Relationship Trust provides funding for Indigenous community economic development and entrepreneurship projects in BC."
    },
    {
      question: "How do export grants work in BC?",
      answer: "CanExport (federal) matches 50% of marketing costs for international expansion. BC Trade & Invest provides on-the-ground support via trade offices in Asia, Europe, and the US to help you find customers."
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
        <section className="bg-gradient-to-br from-blue-600 to-teal-700 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30"><Mountain className="w-3 h-3 mr-1" /> Provincial Programs</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">British Columbia Government Business Grants 2026</h1>
              <p className="text-xl text-blue-100 mb-8">Comprehensive guide to BC provincial funding programs. Access Innovate BC, CleanBC, Creative BC, and PacifiCan grants for tech startups, clean energy, film production, and export businesses.</p>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild><Link href="/grant-finder?province=bc">Find BC Grants</Link></Button>
            </div>
          </div>
        </section>

        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <nav className="p-6 bg-gray-50 rounded-xl">
                <h2 className="text-lg font-bold mb-4">In This Guide</h2>
                <ul className="grid md:grid-cols-2 gap-2 text-sm">
                  <li><a href="#overview" className="text-blue-700 hover:underline">1. BC Funding Overview</a></li>
                  <li><a href="#innovate-bc" className="text-blue-700 hover:underline">2. Innovate BC Programs</a></li>
                  <li><a href="#cleanbc" className="text-blue-700 hover:underline">3. CleanBC Programs</a></li>
                  <li><a href="#creative" className="text-blue-700 hover:underline">4. Creative BC &amp; Film</a></li>
                  <li><a href="#pacifican" className="text-blue-700 hover:underline">5. PacifiCan Federal</a></li>
                  <li><a href="#export" className="text-blue-700 hover:underline">6. Export Development</a></li>
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
              <div><div className="text-3xl font-bold text-blue-600 mb-2">$1.8B+</div><div className="text-gray-600">Annual BC Funding</div></div>
              <div><div className="text-3xl font-bold text-green-600 mb-2">$280M</div><div className="text-gray-600">CleanBC Fund</div></div>
              <div><div className="text-3xl font-bold text-purple-600 mb-2">$300K</div><div className="text-gray-600">Max Ignite Grant</div></div>
              <div><div className="text-3xl font-bold text-teal-600 mb-2">$5M</div><div className="text-gray-600">PacifiCan Cap</div></div>
            </div>
          </div>
        </section>



        {/* Common Questions Section */}
        <section className="py-12 bg-blue-50 border-b border-blue-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">❓ Common Questions About BC Govt Grants</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <a href="#innovate-bc" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-blue-100">
                  <h3 className="font-semibold text-blue-700">How do I apply for Innovate BC?</h3>
                  <p className="text-sm text-gray-600 mt-1">Tech grants for R&D and hiring.</p>
                </a>
                <a href="#cleanbc" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-blue-100">
                  <h3 className="font-semibold text-blue-700">What does CleanBC fund?</h3>
                  <p className="text-sm text-gray-600 mt-1">Rebates for EVs, chargers, and emissions reduction.</p>
                </a>
                <a href="#creative" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-blue-100">
                  <h3 className="font-semibold text-blue-700">How do film tax credits work?</h3>
                  <p className="text-sm text-gray-600 mt-1">Refundable credits for production and labor.</p>
                </a>
                <a href="#pacifican" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-blue-100">
                  <h3 className="font-semibold text-blue-700">What is PacifiCan?</h3>
                  <p className="text-sm text-gray-600 mt-1">Federal interest-free loans for scaling businesses.</p>
                </a>
                <a href="#success" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-blue-100">
                  <h3 className="font-semibold text-blue-700">Is there funding for startups?</h3>
                  <p className="text-sm text-gray-600 mt-1">Yes, specifically for tech innovation and export.</p>
                </a>
                <a href="#eligibility" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-blue-100">
                  <h3 className="font-semibold text-blue-700">Am I eligible for grants?</h3>
                  <p className="text-sm text-gray-600 mt-1">Check requirements for key provincial programs.</p>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="overview" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">How does BC Government Funding work?</h2>
              <p className="text-gray-700 leading-relaxed mb-6">British Columbia offers one of Canada&apos;s most diverse funding ecosystems, with over $1.8 billion annually available through provincial and federal programs. BC&apos;s focus areas include clean technology, digital innovation (supported by <Link href="/blog/canada-digital-ai-innovation-grants" className="text-blue-700 hover:underline">Digital Grants</Link>), creative industries (particularly film), and export development.</p>
              <p className="text-gray-700 leading-relaxed mb-6">Key funding agencies include Innovate BC (technology and innovation), CleanBC (clean energy and emissions reduction), Creative BC (film, TV, and creative industries), and PacifiCan (federal regional development). The province also offers world-leading tax credits for R&amp;D and film production.</p>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-blue-200"><CardHeader><CardTitle className="text-blue-700">Provincial Agencies</CardTitle></CardHeader><CardContent><ul className="text-sm space-y-2"><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Innovate BC</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>CleanBC</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Creative BC</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>BC Trade &amp; Invest</span></li></ul></CardContent></Card>
                <Card className="border-green-200"><CardHeader><CardTitle className="text-green-700">Priority Sectors</CardTitle></CardHeader><CardContent><ul className="text-sm space-y-2"><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Clean Technology</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Digital &amp; Tech</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Film &amp; Creative</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Forestry &amp; Natural Resources</span></li></ul></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        <section id="innovate-bc" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">What Tech Grants does Innovate BC offer?</h2>
              <p className="text-gray-700 mb-6">Innovate BC is the province&apos;s primary technology innovation agency, providing funding, programs, and support to help BC tech companies grow and scale. Their programs range from small grants to significant R&amp;D funding.</p>
              <div className="space-y-4">
                <Card className="border-blue-200"><CardContent className="pt-6"><div className="flex items-center mb-3"><Zap className="w-6 h-6 text-blue-600 mr-3" /><h3 className="font-bold text-lg">Ignite Program</h3></div><p className="text-gray-700 mb-3">Up to $300,000 in non-repayable funding for R&amp;D projects. Requires matching investment and focuses on technology commercialization.</p><ul className="text-sm grid md:grid-cols-2 gap-2"><li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Technology R&amp;D</li><li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Product Development</li><li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Market Validation</li><li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Scale-Up Activities</li></ul></CardContent></Card>
                <Card className="border-green-200"><CardContent className="pt-6"><div className="flex items-center mb-3"><Users className="w-6 h-6 text-green-600 mr-3" /><h3 className="font-bold text-lg">Digital Skills Internship</h3></div><p className="text-gray-700 mb-3">Wage subsidies covering 50-100% of intern salaries for tech companies hiring students or new graduates. Perfect for startups building their first team.</p></CardContent></Card>
                <Card className="border-purple-200"><CardContent className="pt-6"><div className="flex items-center mb-3"><Lightbulb className="w-6 h-6 text-purple-600 mr-3" /><h3 className="font-bold text-lg">Venture Acceleration Program</h3></div><p className="text-gray-700 mb-3">Free mentorship, workshops, and connections to investors for high-potential BC tech startups. Strong track record of helping companies raise funding.</p></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        <section id="cleanbc" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">How to get funding for Clean Energy projects?</h2>
              <p className="text-gray-700 mb-6">CleanBC is the province&apos;s initiative to reduce greenhouse gas emissions and transition to clean energy. With $280+ million in funding, programs support electric vehicle adoption, industrial emissions reduction, building efficiency, and clean technology development.</p>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-green-200"><CardContent className="pt-6"><h3 className="font-bold text-green-700 mb-2 flex items-center"><Leaf className="w-5 h-5 mr-2" />Go Electric Programs</h3><ul className="text-sm space-y-1"><li>• Commercial Vehicle Rebates</li><li>• Charger Infrastructure Funding</li><li>• Fleet Electrification Support</li><li>• Specialty Vehicle Rebates</li></ul><p className="text-sm text-gray-600 mt-3">Stack with federal iZEV for up to $15K+ combined savings per vehicle.</p></CardContent></Card>
                <Card className="border-blue-200"><CardContent className="pt-6"><h3 className="font-bold text-blue-700 mb-2 flex items-center"><Mountain className="w-5 h-5 mr-2" />Industrial Programs</h3><ul className="text-sm space-y-1"><li>• CleanBC Industry Fund</li><li>• Emissions Reduction Grants</li><li>• Process Electrification</li><li>• Carbon Capture Support</li></ul><p className="text-sm text-gray-600 mt-3">Large-scale funding for industrial emissions reduction projects.</p></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        <section id="creative" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">How to claim 35% BC Film Tax Credits?</h2>
              <p className="text-gray-700 mb-6">BC is North America&apos;s third-largest film and TV production center. Creative BC administers programs and tax credits for film, TV, animation, music, and interactive digital media. Tax credits can cover 30-50%+ of eligible production costs.</p>
              <div className="grid md:grid-cols-2 gap-6">
                <Card><CardContent className="pt-6"><h3 className="font-bold text-purple-700 mb-2 flex items-center"><Film className="w-5 h-5 mr-2" />Film &amp; TV Tax Credits</h3><ul className="text-sm space-y-1"><li>• BC Production Services Tax Credit (28%)</li><li>• BC Film &amp; TV Tax Credit (35%)</li><li>• Regional and Distant Location Credits</li><li>• Training Tax Credit</li></ul></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold text-blue-700 mb-2 flex items-center"><Lightbulb className="w-5 h-5 mr-2" />Interactive Digital Media</h3><ul className="text-sm space-y-1"><li>• IDMTC (17.5% refundable)</li><li>• Video game development</li><li>• Educational software</li><li>• Animation and VFX</li></ul></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        <section id="pacifican" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">What interest-free loans does PacifiCan offer?</h2>
              <p className="text-gray-700 mb-6">PacifiCan is the federal regional development agency for BC, offering programs for business scale-up, community economic development, and tourism. Their Business Scale-Up and Productivity (BSP) program provides interest-free loans up to $5 million.</p>
              <div className="bg-teal-50 p-6 rounded-lg border border-teal-200 mb-6">
                <h3 className="font-bold text-teal-800 mb-4">Business Scale-Up Program</h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div><strong>Amount:</strong> Up to $5M</div>
                  <div><strong>Interest:</strong> 0%</div>
                  <div><strong>Grace Period:</strong> Up to 2 years</div>
                </div>
                <p className="text-sm text-gray-700 mt-3">Interest-free, conditionally repayable contribution for productivity improvements, equipment, expansion, and export development.</p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-lg border"><h3 className="font-bold mb-2">Community Economic Development</h3><p className="text-sm text-gray-600">Funding for non-profit organizations, Indigenous groups, and community projects.</p></div>
                <div className="p-4 bg-white rounded-lg border"><h3 className="font-bold mb-2">Tourism Growth Program</h3><p className="text-sm text-gray-600">Support for tourism destination development and marketing.</p></div>
              </div>
            </div>
          </div>
        </section>

        <section id="export" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">How to get funding for Exporting?</h2>
              <p className="text-gray-700 mb-6">BC Trade &amp; Invest helps BC companies expand into international markets. Programs cover trade missions, market research, and export readiness activities.</p>
              <div className="bg-blue-50 p-6 rounded-lg"><h3 className="font-bold mb-3">Export Support Activities</h3><ul className="grid md:grid-cols-2 gap-2 text-sm"><li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Trade mission participation</li><li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />International market research</li><li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Trade show support</li><li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Export strategy development</li></ul></div>
            </div>
          </div>
        </section>

        <section id="regional" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Are there grants for regions outside Vancouver?</h2>
              <p className="text-gray-700 mb-6">Vancouver, Victoria, and other municipalities offer complementary programs. Businesses outside Metro Vancouver often receive priority scoring in provincial programs to encourage regional economic development.</p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-white rounded-lg border"><h3 className="font-bold mb-2">Vancouver</h3><p className="text-sm text-gray-600">Vancouver Economic Commission, Start-Up City initiatives</p></div>
                <div className="p-4 bg-white rounded-lg border"><h3 className="font-bold mb-2">Victoria</h3><p className="text-sm text-gray-600">VIATEC, Accelerate Okanagan partners</p></div>
                <div className="p-4 bg-white rounded-lg border"><h3 className="font-bold mb-2">Northern BC</h3><p className="text-sm text-gray-600">Community Futures, Northern Development Trust</p></div>
              </div>
            </div>
          </div>
        </section>

        <section id="eligibility" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Am I eligible for BC Business Grants?</h2>
              <p className="text-gray-700 mb-8">British Columbia has distinct eligibility criteria for its different major agencies. Innovate BC focuses on IP-owning tech companies, while CleanBC targets emissions reductions.</p>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Card className="border-blue-200 shadow-sm">
                  <CardHeader className="bg-blue-50 border-b border-blue-100">
                    <CardTitle className="text-blue-800 flex items-center"><CheckCircle className="w-5 h-5 mr-2" /> Innovate BC Criteria</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <ul className="space-y-3">
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" /><span className="text-sm"><strong>BC Incorporation:</strong> Must be a BC-based company.</span></li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" /><span className="text-sm"><strong>IP Ownership:</strong> Must own or control the Intellectual Property being developed.</span></li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" /><span className="text-sm"><strong>Scalability:</strong> Must show potential for high growth and export.</span></li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-teal-200 shadow-sm">
                  <CardHeader className="bg-teal-50 border-b border-teal-100">
                    <CardTitle className="text-teal-800 flex items-center"><Mountain className="w-5 h-5 mr-2" /> PacifiCan Criteria</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <ul className="space-y-3">
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-teal-600 mr-3 mt-0.5 flex-shrink-0" /><span className="text-sm"><strong>High Growth:</strong> For "Business Scale-Up", must have 20%+ year-over-year growth potential.</span></li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-teal-600 mr-3 mt-0.5 flex-shrink-0" /><span className="text-sm"><strong>Market Ready:</strong> Technology must be proven (TRL 7-9).</span></li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-teal-600 mr-3 mt-0.5 flex-shrink-0" /><span className="text-sm"><strong>Financial Health:</strong> Must be profitable or show clear path to profitability to repay the loan.</span></li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <h3 className="text-2xl font-bold mb-6">What Documents do I need?</h3>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold mb-4 flex items-center text-blue-700"><FileText className="w-5 h-5 mr-2" /> Corporate Documents</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-center"><div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>Certificate of Incorporation</li>
                      <li className="flex items-center"><div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>Central Securities Register</li>
                      <li className="flex items-center"><div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>Financial Statements (2 years)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold mb-4 flex items-center text-blue-700"><Target className="w-5 h-5 mr-2" /> Project Documents</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-center"><div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>Project Charter / Plan</li>
                      <li className="flex items-center"><div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>IP Strategy Document</li>
                      <li className="flex items-center"><div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>Market Validation Evidence</li>
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
              <h2 className="text-3xl font-bold mb-6">How do I Apply?</h2>
              <p className="text-gray-700 mb-10">Application processes differ significantly between small Innovate BC grants (fast) and large PacifiCan loans (slow). This guide covers the general flow.</p>

              <div className="relative border-l-4 border-blue-200 ml-4 space-y-12">
                <div className="relative pl-8">
                  <div className="absolute -left-[22px] top-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold border-4 border-white">1</div>
                  <h3 className="text-xl font-bold mb-2">Expression of Interest (EOI)</h3>
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <p className="text-gray-700 mb-3">Many BC programs use an EOI stage to filter applicants. This is a short proposal (5-10 pages) outlining the project concept and eligibility.</p>
                    <p className="text-sm text-gray-600 italic"><strong>PacifiCan:</strong> Opening dates for EOIs are specific and competitive (usually Spring/Fall).</p>
                  </div>
                </div>

                <div className="relative pl-8">
                  <div className="absolute -left-[22px] top-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold border-4 border-white">2</div>
                  <h3 className="text-xl font-bold mb-2">Detailed Application</h3>
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <p className="text-gray-700 mb-3">If shortlisted, you will submit the full application. For Innovate BC, this focuses on technical merit. For PacifiCan, it focuses on financial viability and repayment capacity.</p>
                    <div className="flex items-center gap-4 text-sm bg-blue-50 p-3 rounded">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span><strong>Effort:</strong> Expect to spend 40-80 hours preparing this.</span>
                    </div>
                  </div>
                </div>

                <div className="relative pl-8">
                  <div className="absolute -left-[22px] top-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold border-4 border-white">3</div>
                  <h3 className="text-xl font-bold mb-2">Evaluation</h3>
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <p className="text-gray-700 mb-3">Applications are scored on: Innovation, Market Potential, Management Team, and Economic Benefits to BC (jobs, revenue).</p>
                  </div>
                </div>

                <div className="relative pl-8">
                  <div className="absolute -left-[22px] top-0 w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold border-4 border-white">4</div>
                  <h3 className="text-xl font-bold mb-2">Agreement & Reporting</h3>
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <p className="text-gray-700 mb-3">Successful applicants sign a Contribution Agreement. You must report on metrics like "Jobs maintained" and "Revenue growth" annually for 3-5 years.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="mistakes" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Why do BC Grant Applications fail?</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Card><CardContent className="pt-6"><h3 className="font-bold text-red-600 mb-2">❌ Missing IP Strategy</h3><p className="text-sm text-gray-600">Innovate BC prioritizes companies that own their IP. Not having trademarks/patents weakens applications.</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold text-red-600 mb-2">❌ Wrong Sector Fit</h3><p className="text-sm text-gray-600">Applying to CleanBC without emissions reduction impact or Innovate BC without tech innovation.</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold text-red-600 mb-2">❌ Weak BC Impact</h3><p className="text-sm text-gray-600">Not clearly articulating job creation and economic benefits to British Columbia.</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold text-red-600 mb-2">❌ Insufficient Matching</h3><p className="text-sm text-gray-600">Not having secured matching funds before applying (1:3 match often required).</p></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        <section id="export-navigator" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">How does Export Navigator Help?</h2>
              <p className="text-gray-700 mb-6">While not a direct cash grant, <strong>Export Navigator</strong> is arguably the most valuable program for BC businesses looking to grow. It offers free, personalized guidance from an export specialist.</p>

              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-xl mb-8">
                <h3 className="text-xl font-bold text-blue-900 mb-2">Why apply?</h3>
                <p className="text-gray-700">Your advisor helps you find <strong>hidden international grants</strong> (like CanExport), connects you with foreign buyers, and reviews your export plan for free. It is a "gateway" program that drastically increases your success rate with other funding.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="p-4 border rounded-lg bg-gray-50">
                  <div className="text-2xl font-bold text-blue-600 mb-1">FREE</div>
                  <div className="text-sm text-gray-600">Cost to Join</div>
                </div>
                <div className="p-4 border rounded-lg bg-gray-50">
                  <div className="text-2xl font-bold text-blue-600 mb-1">1-on-1</div>
                  <div className="text-sm text-gray-600">Advisor Support</div>
                </div>
                <div className="p-4 border rounded-lg bg-gray-50">
                  <div className="text-2xl font-bold text-blue-600 mb-1">Global</div>
                  <div className="text-sm text-gray-600">Market Access</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="indigenous-support" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Is there Funding for Indigenous Businesses?</h2>
              <p className="text-gray-700 mb-6">British Columbia has a robust ecosystem of support for Indigenous entrepreneurs, with dedicated capital pools and grant programs that are often less competitive than general streams.</p>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-teal-200">
                  <CardHeader>
                    <CardTitle className="text-teal-800">New Relationship Trust (NRT)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 mb-4">Offers non-repayable grants for Indigenous community-owned businesses and entrepreneurs.</p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start"><CheckCircle className="w-4 h-4 text-teal-600 mr-2 mt-0.5" /><strong>Equity Match:</strong> Up to $50,000 for business startup/expansion.</li>
                      <li className="flex items-start"><CheckCircle className="w-4 h-4 text-teal-600 mr-2 mt-0.5" /><strong>Cold Storage:</strong> Specific grants for food sovereignty projects.</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-purple-800">IBIC Resources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 mb-4">The Indigenous Business & Investment Council connects businesses with:</p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start"><CheckCircle className="w-4 h-4 text-purple-600 mr-2 mt-0.5" /><strong>Capital:</strong> Lists of Aboriginal Financial Institutions (AFIs).</li>
                      <li className="flex items-start"><CheckCircle className="w-4 h-4 text-purple-600 mr-2 mt-0.5" /><strong>Procurement:</strong> BC government set-asides for Indigenous vendors.</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section id="sector-comparison" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">What is the difference between Tech and Resource Sector Funding?</h2>
              <p className="text-gray-700 mb-8">BC&apos;s economy is a "dual engine"—traditional resources (Forestry, Mining) and modern tech. Funding sources are completely distinct.</p>

              <div className="overflow-hidden rounded-xl border border-gray-200">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-100 text-gray-700">
                    <tr>
                      <th className="p-4">Feature</th>
                      <th className="p-4 text-blue-700">Technology Focus</th>
                      <th className="p-4 text-green-700">Resource Focus</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="bg-white">
                      <td className="p-4 font-semibold">Primary Agency</td>
                      <td className="p-4">Innovate BC</td>
                      <td className="p-4">CleanBC / Forestry Innovation</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-4 font-semibold">Goal</td>
                      <td className="p-4">IP creation, Export scale-up</td>
                      <td className="p-4">Efficiency, Emissions reduction</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="p-4 font-semibold">Typical Grant</td>
                      <td className="p-4"><strong>Ignite:</strong> $300k (R&D)</td>
                      <td className="p-4"><strong>BC Mass Timber:</strong> $500k+ (Construction)</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-4 font-semibold">Key Requirement</td>
                      <td className="p-4">Must own the IP</td>
                      <td className="p-4">Must reduce carbon footprint</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section id="case-study" className="py-16 bg-white border-t">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Real World Example: How a Cleantech Company Scaled?</h2>
              <Card className="bg-teal-50 border-teal-200">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-teal-100 p-3 rounded-full">
                      <Lightbulb className="w-6 h-6 text-teal-700" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-teal-900 mb-2">From Prototype to Export</h3>
                      <p className="text-gray-700 mb-4">
                        A Vancouver-based water treatment company used <strong>Innovate BC's</strong> "Ignite" program ($300k) to finalize their commercial unit. To market it, they didn't spend their own cash.
                      </p>
                      <p className="text-gray-700 mb-4">
                        They utilized the federal <strong>CanExport</strong> program to cover 50% of travel costs to trade shows in California and Europe. Simultaneously, they hired 2 UBC grad students using the <strong>Mitacs Accelerate</strong> program to optimize their filtration data.
                      </p>
                      <p className="text-gray-700">
                        <strong>Key Takeaway:</strong> They separated their needs: R&D funded by Innovate BC, Marketing funded by CanExport, and Hiring funded by Mitacs. This "stacking" approach reduced their burn rate by 40%.
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
              <h2 className="text-3xl font-bold mb-6">How to win BC Government Grants?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div><h3 className="font-bold mb-3 text-green-700">✅ Winning Approaches</h3><ul className="space-y-2 text-sm"><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Show clear BC economic impact (jobs, exports, IP)</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Stack CleanBC with federal programs when allowed</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Consider regional expansion for priority scoring as suggested in our <Link href="/blog/bc-small-business-grants-guide" className="text-blue-700 hover:underline">Small Business Guide</Link></span></li></ul></div>
                <div><h3 className="font-bold mb-3 text-purple-700">🎯 Pro Tips</h3><ul className="space-y-2 text-sm"><li className="flex items-start"><Target className="w-4 h-4 text-purple-500 mr-2 mt-0.5" /><span>Connect with Innovate BC advisors before applying</span></li><li className="flex items-start"><Target className="w-4 h-4 text-purple-500 mr-2 mt-0.5" /><span>Attend BC Tech Summit and ecosystem events</span></li><li className="flex items-start"><Target className="w-4 h-4 text-purple-500 mr-2 mt-0.5" /><span>Film projects should consult Creative BC first</span></li></ul></div>
              </div>
            </div>
          </div>
        </section>

        <section id="glossary" className="py-16 bg-white border-t">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">What Key Terms should I know?</h2>
              <p className="text-gray-700 mb-8">Navigating the BC ecosystem requires knowing the language. These key terms appear frequently in Innovate BC and CleanBC guides.</p>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-slate-50 border-slate-200">
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-slate-900 mb-2">Refundable Tax Credit</h3>
                    <p className="text-sm text-gray-600">A tax credit (like for Film or IDM) that pays you cash if the credit amount is typically higher than your tax bill. This is effectively a "backend grant."</p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-50 border-slate-200">
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-slate-900 mb-2">Conditionally Repayable</h3>
                    <p className="text-sm text-gray-600">PacifiCan loans are often "conditionally repayable," meaning you only start paying back once the project generates revenue, or after a grace period.</p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-50 border-slate-200">
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-slate-900 mb-2">CleanBC Industry Fund</h3>
                    <p className="text-sm text-gray-600">A specific fund using carbon tax revenue to pay for industrial emission reduction projects. It's a "recycling" of carbon tax dollars back to industry.</p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-50 border-slate-200">
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-slate-900 mb-2">IP Strategy</h3>
                    <p className="text-sm text-gray-600">A formal document outlining how you will protect your innovations (patents, trade secrets). Innovate BC <strong>requires</strong> this for most R&D grants.</p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-50 border-slate-200">
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-slate-900 mb-2">Regional Index</h3>
                    <p className="text-sm text-gray-600">Some grants give "bonus points" if you are located outside Metro Vancouver (e.g., Prince George, Kelowna) to spur regional development.</p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-50 border-slate-200">
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-slate-900 mb-2">Contribution</h3>
                    <p className="text-sm text-gray-600">Federal/Provincial term for "Grant" or "Funding." A "Non-repayable Contribution" is a grant. A "Repayable Contribution" is a loan.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section id="faqs" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions about BC Grants</h2>
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
              <h2 className="text-3xl font-bold mb-6">Compare Other Provincial Grant Programs</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <Link href="/blog/ontario-government-business-grants" className="flex items-center p-4 bg-white rounded-lg border hover:border-teal-500 transition-all"><Building className="w-5 h-5 text-red-600 mr-3" /><span>Ontario Business Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/blog/alberta-government-business-grants" className="flex items-center p-4 bg-white rounded-lg border hover:border-teal-500 transition-all"><Building className="w-5 h-5 text-blue-600 mr-3" /><span>Alberta Business Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/blog/quebec-government-business-grants" className="flex items-center p-4 bg-white rounded-lg border hover:border-teal-500 transition-all"><Building className="w-5 h-5 text-purple-600 mr-3" /><span>Quebec Business Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/blog/saskatchewan-small-business-grants-guide" className="flex items-center p-4 bg-white rounded-lg border hover:border-teal-500 transition-all"><Building className="w-5 h-5 text-green-600 mr-3" /><span>Saskatchewan Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/blog/manitoba-small-business-grants-guide" className="flex items-center p-4 bg-white rounded-lg border hover:border-teal-500 transition-all"><Building className="w-5 h-5 text-yellow-600 mr-3" /><span>Manitoba Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
              </div>
              <h3 className="text-xl font-bold mb-4">Related Funding Guides</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/blog/irap-industrial-research-assistance-program" className="flex items-center p-4 bg-white rounded-lg border hover:border-teal-500 transition-all"><BookOpen className="w-5 h-5 text-green-600 mr-3" /><span>IRAP Program Guide</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/blog/canada-federal-grants" className="flex items-center p-4 bg-white rounded-lg border hover:border-teal-500 transition-all"><BookOpen className="w-5 h-5 text-green-600 mr-3" /><span>Federal Grants Guide</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-700">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-6">Access BC Government Funding</h2>
              <p className="text-xl text-blue-100 mb-8">Get expert help navigating BC&apos;s funding programs. We&apos;ve helped BC businesses secure millions in provincial and federal grants.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild><Link href="/guides/apply-bc-government-grants"><Download className="w-4 h-4 mr-2" /> Get BC Guide</Link></Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild><Link href="/contact?province=bc">Get Expert Help</Link></Button>
              </div>
            </div>
          </div>
        </section>
      </div >
      <Footer />
    </>
  )
}
