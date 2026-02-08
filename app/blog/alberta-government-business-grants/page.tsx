import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ArrowRight, DollarSign, BarChart, Target, AlertTriangle, BookOpen, Users, Lightbulb, Download, Shield, Award, Leaf, PieChart, TrendingUp, HelpCircle, Sprout, Tractor, ExternalLink, Beaker, Building, FileText, Clock, Zap } from "lucide-react"
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
      question: "What grants are available for Alberta small businesses in 2026?",
      answer: "Alberta offers Alberta Innovates vouchers ($10K-$100K), scale-up programs ($100K-$2M), Emissions Reduction Alberta for cleantech, CAP agricultural grants, and PrairiesCan regional development funding. Calgary and Edmonton also have municipal economic development programs."
    },
    {
      question: "How do I apply for Alberta Innovates funding?",
      answer: "Start with a pre-application consultation call (recommended for most programs). Complete the online application with project plan, budget, and team qualifications. Voucher programs take 4-6 weeks; larger grants take 3-6 months for review and approval."
    },
    {
      question: "Can out-of-province companies apply for Alberta grants?",
      answer: "Some programs require Alberta incorporation. Others accept companies with significant Alberta operations or a firm commitment to expand to Alberta. Check specific program requirements."
    },
    {
      question: "How do Alberta programs work with federal funding?",
      answer: "Many Alberta programs can 'stack' with federal programs like IRAP, SR&ED, and SBIR. Check stacking rules for each program—some cap total government funding at 75% of project costs."
    },
    {
      question: "What is the fastest way to get Alberta business funding?",
      answer: "Alberta Innovates voucher programs typically have the fastest turnaround (4-6 weeks). Larger programs can take 3-6 months from application to funding approval."
    },
    {
      question: "What cleantech and energy grants are available in Alberta?",
      answer: "Emissions Reduction Alberta funds large-scale industrial emissions projects. Alberta Innovates offers Clean Technology Development grants. Federal programs like the Clean Growth Hub and SIF also support Alberta energy transition projects."
    },
    {
      question: "Are there agricultural grants for Alberta farmers and agribusiness?",
      answer: "Yes. The Canadian Agricultural Partnership (CAP) funds on-farm improvements, environmental stewardship, and value-added processing. Alberta Agriculture provides irrigation grants, Alberta Agri-Food Research funding, and the On-Farm Climate Action Fund."
    },
    {
      question: "What is CARES funding?",
      answer: "The Community and Regional Economic Support (CARES) program funds initiatives that promote long-term economic growth in Alberta communities. It's often used by municipalities and non-profits, but businesses can partner on projects."
    },
    {
      question: "Does Alberta have a film tax credit?",
      answer: "Yes. The Alberta Film and Television Tax Credit (FTTC) offers a refundable tax credit of up to 30% on eligible Alberta production and labor costs. It's instrumental for the province's growing film industry."
    },
    {
      question: "What support is available for Indigenous businesses in Alberta?",
      answer: "Besides federal programs, the Alberta Indigenous Opportunities Corporation (AIOC) offers loan guarantees to help Indigenous groups take equity positions in major resource projects. There are also specific streams in Alberta Innovates for Indigenous entrepreneurs."
    },
    {
      question: "Can I get funding for hiring students in Alberta?",
      answer: "Absolutely. The 'Alberta Jobs Now' program (when active) and the 'MITACS' program are popular. MITACS connects companies with graduate students for research interns, covering 50% of their stipend. It's a gold standard for R&D hiring."
    },
    {
      question: "What is the 'Alberta Catalyzer' program?",
      answer: "Alberta Catalyzer is a pre-accelerator for early-stage tech startups, delivered by Innovate Edmonton and Platform Calgary. While not a direct cash grant, it provides free, intensive coaching worth thousands and positions you for future funding."
    },
    {
      question: "Are there grants for tourism businesses in Alberta?",
      answer: "Travel Alberta often has cooperative marketing funds. The 'Tourism Growth Program' (federal, delivered by PrairiesCan) also supports tourism assets helping to draw visitors to rural and urban regions."
    },
    {
      question: "What if my business is in the oil and gas sector?",
      answer: "Direct grants for oil extraction are rare, but 'innovation' grants for the sector are huge. Programs like Emissions Reduction Alberta (ERA) fund technologies that reduce carbon footprints, methane emissions, or improve water efficiency in the energy sector."
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
              <p className="text-gray-700 mb-8">Alberta Innovates and other provincial agencies use specific criteria to evaluate applicants. Understanding "Technical Readiness Levels" (TRL) is often key for innovation grants.</p>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Card className="border-blue-200 shadow-sm">
                  <CardHeader className="bg-blue-50 border-b border-blue-100">
                    <CardTitle className="text-blue-800 flex items-center"><CheckCircle className="w-5 h-5 mr-2" /> Base Requirements</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <ul className="space-y-3">
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" /><span className="text-sm"><strong>Alberta Presence:</strong> Must be legally incorporated in Alberta or paying corporate taxes here.</span></li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" /><span className="text-sm"><strong>Fewer than 500 Employees:</strong> Most SME programs are capped at 499 staff.</span></li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" /><span className="text-sm"><strong>Matching Funds:</strong> You usually need to cover 25-50% of project costs personally or through investment.</span></li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-purple-200 shadow-sm">
                  <CardHeader className="bg-purple-50 border-b border-purple-100">
                    <CardTitle className="text-purple-800 flex items-center"><Beaker className="w-5 h-5 mr-2" /> TRL Requirements</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <ul className="space-y-3">
                      <li className="flex items-start"><span className="font-bold text-gray-900 mr-2 w-16 flex-shrink-0">TRL 1-3:</span><span className="text-sm">Proof of Concept. Use <strong>Voucher Programs</strong>.</span></li>
                      <li className="flex items-start"><span className="font-bold text-gray-900 mr-2 w-16 flex-shrink-0">TRL 4-6:</span><span className="text-sm">Prototyping. Use <strong>Product Scale-Up</strong> grants.</span></li>
                      <li className="flex items-start"><span className="font-bold text-gray-900 mr-2 w-16 flex-shrink-0">TRL 7-9:</span><span className="text-sm">Commercialization. Use <strong>Commercialization Associates</strong> or Federal funds.</span></li>
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
                      <li className="flex items-center"><div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>Certificate of Incorporation</li>
                      <li className="flex items-center"><div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>Cap Table (Shareholder list)</li>
                      <li className="flex items-center"><div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>Financial Statements (Year-end)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold mb-4 flex items-center text-blue-700"><Target className="w-5 h-5 mr-2" /> Project Documents</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-center"><div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>Project Plan (Gantt Chart)</li>
                      <li className="flex items-center"><div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>Budget with Quotes</li>
                      <li className="flex items-center"><div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>Team Resume/Bios</li>
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
              <p className="text-gray-700 mb-10">Alberta Innovates uses an online portal for most applications. The process is streamlined but requires preparation.</p>

              <div className="relative border-l-4 border-blue-200 ml-4 space-y-12">
                <div className="relative pl-8">
                  <div className="absolute -left-[22px] top-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold border-4 border-white">1</div>
                  <h3 className="text-xl font-bold mb-2">Connect with a Technology Development Advisor (TDA)</h3>
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <p className="text-gray-700 mb-3"><strong>Pro Tip:</strong> Do not skip this. Alberta Innovates has TDAs across the province. They act as "coaches" for your application and can tell you immediately if you fit or what to fix.</p>
                  </div>
                </div>

                <div className="relative pl-8">
                  <div className="absolute -left-[22px] top-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold border-4 border-white">2</div>
                  <h3 className="text-xl font-bold mb-2">Intake Application</h3>
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <p className="text-gray-700 mb-3">Complete the initial intake form on the SmartSimple portal. This covers basic company info and a project summary.</p>
                    <div className="flex items-center gap-4 text-sm bg-blue-50 p-3 rounded">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span><strong>Timing:</strong> Ongoing rolling intake for most programs.</span>
                    </div>
                  </div>
                </div>

                <div className="relative pl-8">
                  <div className="absolute -left-[22px] top-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold border-4 border-white">3</div>
                  <h3 className="text-xl font-bold mb-2">Full Proposal & Review</h3>
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <p className="text-gray-700 mb-3">If invited, submit the full proposal. Your TDA may provide feedback during this stage. The application will be reviewed by internal and external experts.</p>
                    <div className="flex items-center gap-4 text-sm bg-blue-50 p-3 rounded">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span><strong>Timeline:</strong> 4-8 weeks for Vouchers; 3-4 months for larger grants.</span>
                    </div>
                  </div>
                </div>

                <div className="relative pl-8">
                  <div className="absolute -left-[22px] top-0 w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold border-4 border-white">4</div>
                  <h3 className="text-xl font-bold mb-2">Project Execution & Reporting</h3>
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <p className="text-gray-700 mb-3">For vouchers, Alberta Innovates often pays the service provider directly (no out-of-pocket for you). For other grants, it is milestone-based reimbursement. You must submit a final report to close the project.</p>
                  </div>
                </div>
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

        <section id="regional-ecosystems" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Calgary vs. Edmonton: Where should you apply?</h2>
              <p className="text-gray-700 mb-8">While many grants are province-wide, Alberta&apos;s two major cities have distinct tech ecosystems with specialized local funding and support.</p>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="border border-blue-200 rounded-xl p-6 bg-blue-50">
                  <h3 className="text-2xl font-bold text-blue-800 mb-2">Calgary</h3>
                  <Badge className="bg-blue-600 mb-4">Fintech • AgTech • Energy</Badge>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex items-start"><CheckCircle className="w-4 h-4 text-blue-600 mr-2 mt-0.5" /><strong>Platform Calgary:</strong> The central hub for startup incubation and accelerator programs.</li>
                    <li className="flex items-start"><CheckCircle className="w-4 h-4 text-blue-600 mr-2 mt-0.5" /><strong>OCIF:</strong> The Opportunity Calgary Investment Fund offers major funding for high-impact corporate expansions.</li>
                    <li className="flex items-start"><CheckCircle className="w-4 h-4 text-blue-600 mr-2 mt-0.5" /><strong>CDL Rockies:</strong> Creative Destruction Lab offers mentorship-to-investment for massive-scale science ventures.</li>
                  </ul>
                </div>

                <div className="border border-green-200 rounded-xl p-6 bg-green-50">
                  <h3 className="text-2xl font-bold text-green-800 mb-2">Edmonton</h3>
                  <Badge className="bg-green-600 mb-4">AI/ML • Health • Biotech</Badge>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5" /><strong>Innovate Edmonton:</strong> Manages local startup grants and coaching programs.</li>
                    <li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5" /><strong>Amii:</strong> Alberta Machine Intelligence Institute offers subsidized AI talent and adoption support.</li>
                    <li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5" /><strong>Health City:</strong> Connects health-tech companies with validation pilots in local hospitals.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="energy-transition" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Grants for the Energy Transition</h2>
              <p className="text-gray-700 mb-6">Alberta is actively funding the pivot from traditional oil & gas to cleaner energy sources. If your business helps this transition, you have access to specialized pools of capital.</p>

              <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-8">
                <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-2 flex items-center"><Zap className="w-5 h-5 text-yellow-600 mr-2" />Hydrogen</h3>
                    <p className="text-sm text-gray-600">Funding for production, storage, and retrofitting heavy transport to hydrogen fuel cells.</p>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-2 flex items-center"><Leaf className="w-5 h-5 text-green-600 mr-2" />CCUS</h3>
                    <p className="text-sm text-gray-600">Carbon Capture, Utilization, and Storage projects are priority Tier 1 funding targets for ERA.</p>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-2 flex items-center"><TrendingUp className="w-5 h-5 text-blue-600 mr-2" />Digital Oilfield</h3>
                    <p className="text-sm text-gray-600">Sensors and AI that reduce methane leaks or improve water usage efficiency in extraction.</p>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4">Comparison: Major Agency Cheat Sheet</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-100 text-gray-700 font-bold">
                    <tr>
                      <th className="p-3 rounded-tl-lg">Agency</th>
                      <th className="p-3">Sweet Spot</th>
                      <th className="p-3">Funding Type</th>
                      <th className="p-3 rounded-tr-lg">Avg. Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="bg-white">
                      <td className="p-3 font-semibold text-blue-700">Alberta Innovates</td>
                      <td className="p-3">High-tech R&D, pre-revenue startups</td>
                      <td className="p-3">Grant (Voucher)</td>
                      <td className="p-3">$10k - $200k</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-3 font-semibold text-green-700">ERA</td>
                      <td className="p-3">GHG reduction, industrial scale pilots</td>
                      <td className="p-3">Grant (Matching)</td>
                      <td className="p-3">$250k - $5M+</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="p-3 font-semibold text-purple-700">CARES</td>
                      <td className="p-3">Community economic growth projects</td>
                      <td className="p-3">Grant</td>
                      <td className="p-3">$25k - $100k</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-3 font-semibold text-orange-700">Travel Alberta</td>
                      <td className="p-3">Tourism assets, festivals, experiences</td>
                      <td className="p-3">Co-op Marketing</td>
                      <td className="p-3">$5k - $50k</td>
                    </tr>
                  </tbody>
                </table>
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

        <section id="glossary" className="py-16 bg-white border-t">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Glossary of Alberta Funding Terms</h2>
              <p className="text-gray-700 mb-8">Alberta&apos;s ecosystem has its own language. Mastering these terms will help you navigate Alberta Innovates and PrairiesCan documentation.</p>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-slate-50 border-slate-200">
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-slate-900 mb-2">TDA (Technology Development Advisor)</h3>
                    <p className="text-sm text-gray-600">A dedicated coach provided by Alberta Innovates. TDAs are gatekeepers; getting one on your side significantly increases your chances of approval.</p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-50 border-slate-200">
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-slate-900 mb-2">Voucher</h3>
                    <p className="text-sm text-gray-600">A specific type of grant where the government pays a service provider (e.g., a marketing firm or lab) directly on your behalf, rather than giving you cash.</p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-50 border-slate-200">
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-slate-900 mb-2">Stacking</h3>
                    <p className="text-sm text-gray-600">Using multiple grants for one project. In Alberta, you can often stack Alberta Innovates funding with federal IRAP funding, sometimes reaching 75% coverage.</p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-50 border-slate-200">
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-slate-900 mb-2">Diversification</h3>
                    <p className="text-sm text-gray-600">A key policy goal. Projects that help Alberta&apos;s economy move beyond oil and gas (e.g., tech, agri-food, tourism) get higher scoring.</p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-50 border-slate-200">
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-slate-900 mb-2">Milestone Payments</h3>
                    <p className="text-sm text-gray-600">Funding released in chunks upon completing specific project steps (e.g., "Prototype Finalized"), rather than all at once.</p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-50 border-slate-200">
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-slate-900 mb-2">HQC (Highly Qualified Personnel)</h3>
                    <p className="text-sm text-gray-600">Staff with advanced degrees (Masters, PhD). Grants often specifically subsidize hiring HQCs to build intellectual capacity in Alberta firms.</p>
                  </CardContent>
                </Card>
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
              <h2 className="text-3xl font-bold mb-6">Compare Other Provincial Grant Programs</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <Link href="/blog/ontario-government-business-grants" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><Building className="w-5 h-5 text-red-600 mr-3" /><span>Ontario Business Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/blog/british-columbia-government-business-grants" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><Building className="w-5 h-5 text-blue-600 mr-3" /><span>BC Business Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/blog/saskatchewan-small-business-grants-guide" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><Building className="w-5 h-5 text-green-600 mr-3" /><span>Saskatchewan Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/blog/manitoba-small-business-grants-guide" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><Building className="w-5 h-5 text-yellow-600 mr-3" /><span>Manitoba Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/blog/quebec-government-business-grants" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><Building className="w-5 h-5 text-purple-600 mr-3" /><span>Quebec Business Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
              </div>
              <h3 className="text-xl font-bold mb-4">Related Funding Guides</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/blog/irap-industrial-research-assistance-program" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-green-600 mr-3" /><span>IRAP Program Guide</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/blog/canada-federal-grants" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-green-600 mr-3" /><span>Federal Grants Guide</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
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
