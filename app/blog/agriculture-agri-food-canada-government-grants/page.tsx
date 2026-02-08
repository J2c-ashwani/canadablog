import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, Download, Shield, Award, Leaf, TrendingUp, HelpCircle, Sprout, BookOpen, ExternalLink } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Agriculture Canada Grants 2026 | AAFC Federal Funding Guide",
  description: "Complete guide to the $3.5B Sustainable Canadian Agricultural Partnership. Access AgriInnovate, AgriScience, AgriCompetitiveness, and Clean Technology funding for farms, processors, and agri-tech companies.",
  keywords: "Agriculture Agri-Food Canada grants, AAFC federal funding, AgriInnovate, Sustainable CAP funding, farm grants Canada, agri-food grants",
}

export default function AgricultureAgriFoodGovernmentGrantsBlogPage() {
  const faqData = [
    {
      question: "What is the difference between AgriInnovate and AgriScience?",
      answer: "AgriScience funds pre-commercial research and development (TRL 1-7) while AgriInnovate funds commercialization of proven technologies (TRL 8-9). AgriScience provides non-repayable grants while AgriInnovate provides repayable contributions."
    },
    {
      question: "Can technology companies access AAFC funding?",
      answer: "Yes, agricultural technology companies (AgTech) building solutions for the sector can access AgriInnovate for commercialization and AgriScience for research. The technology must have clear application and benefit to agriculture."
    },
    {
      question: "How long do AAFC applications take to process?",
      answer: "Review timelines vary but typically range from 4 to 6 months from complete application to funding decision. Complex AgriInnovate applications involving large repayable contributions may take longer for due diligence."
    },
    {
      question: "What is Sustainable CAP?",
      answer: "Sustainable CAP (Canadian Agricultural Partnership) is the 5-year, $3.5 billion framework that replaced the previous CAP. It governs almost all federal and provincial agriculture funding from 2023 to 2028."
    },
    {
      question: "Do I need to be a farmer to apply?",
      answer: "Not distinctively. While many programs are for producers, AAFC also funds food processors, industry associations, and technology providers. You must be a legal entity capable of entering into a legal agreement."
    },
    {
      question: "Are these grants taxable?",
      answer: "Generally, yes. Government grants and non-repayable contributions are considered taxable income. However, repayable contributions (loans) are not income. Always consult your accountant."
    },
    {
      question: "Can I stack AAFC funding with provincial grants?",
      answer: "Yes, but there are limits. The 'stacking limit' is usually 75% to 90% of total project costs. You must disclose all other funding sources to ensure you don't exceed this cap."
    },
    {
      question: "What is the 'Step' program?",
      answer: "Step is not a federal AAFC program; it's a Saskatchewan-specific trade program. However, many provinces have similar 'Market Access' or 'Export' streams funded under the Sustainable CAP framework."
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
        <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30"><Sprout className="w-3 h-3 mr-1" /> Federal Agri-Food Programs</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Agriculture and Agri-Food Canada Grants 2026</h1>
              <p className="text-xl text-green-100 mb-8">Comprehensive guide to the $3.5 billion Sustainable Canadian Agricultural Partnership funding. From AgriInnovate commercialization to AgriScience research clusters, access federal funding for agricultural innovation, sustainability, and competitiveness.</p>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild><Link href="/grant-finder?program=agriculture">Find AAFC Programs</Link></Button>
            </div>
          </div>
        </section>

        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <nav className="p-6 bg-gray-50 rounded-xl">
                <h2 className="text-lg font-bold mb-4">In This Guide</h2>
                <ul className="grid md:grid-cols-2 gap-2 text-sm">
                  <li><a href="#overview" className="text-blue-700 hover:underline">1. AAFC Funding Overview</a></li>
                  <li><a href="#sustainable-cap" className="text-blue-700 hover:underline">2. Sustainable CAP Framework</a></li>
                  <li><a href="#agriinnovate" className="text-blue-700 hover:underline">3. AgriInnovate Program</a></li>
                  <li><a href="#agriscience" className="text-blue-700 hover:underline">4. AgriScience Program</a></li>
                  <li><a href="#clean-tech" className="text-blue-700 hover:underline">5. Agricultural Clean Technology</a></li>
                  <li><a href="#food-processing" className="text-blue-700 hover:underline">6. Food Processing Programs</a></li>
                  <li><a href="#provincial" className="text-blue-700 hover:underline">7. Provincial Cost-Share Programs</a></li>
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

        {/* Common Questions Section */}
        <section className="py-12 bg-gray-50 border-b border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">❓ Common Questions About AAFC Grants</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <a href="#faqs" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                  <h3 className="font-semibold text-blue-900">AgriInnovate vs AgriScience?</h3>
                  <p className="text-sm text-gray-600 mt-1">AgriScience funds research (TRL 1-7), AgriInnovate funds commercialization (TRL 8-9).</p>
                </a>
                <a href="#faqs" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                  <h3 className="font-semibold text-blue-900">Can tech companies apply?</h3>
                  <p className="text-sm text-gray-600 mt-1">Yes, if your technology benefits Canadian agriculture.</p>
                </a>
                <a href="#faqs" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                  <h3 className="font-semibold text-blue-900">How long for approval?</h3>
                  <p className="text-sm text-gray-600 mt-1">Typically 4-6 months from complete application.</p>
                </a>
                <a href="#faqs" className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
                  <h3 className="font-semibold text-blue-900">Can I stack with provincial?</h3>
                  <p className="text-sm text-gray-600 mt-1">Yes, but respect 75-90% total stacking limits.</p>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto grid md:grid-cols-4 gap-8 text-center">
              <div><div className="text-3xl font-bold text-green-600 mb-2">$3.5B</div><div className="text-gray-600">5-Year Framework</div></div>
              <div><div className="text-3xl font-bold text-blue-600 mb-2">$5M</div><div className="text-gray-600">Max AgriInnovate</div></div>
              <div><div className="text-3xl font-bold text-purple-600 mb-2">50-75%</div><div className="text-gray-600">Cost-Share Ratio</div></div>
              <div><div className="text-3xl font-bold text-orange-600 mb-2">$15M</div><div className="text-gray-600">Max AgriScience</div></div>
            </div>
          </div>
        </section>

        <section id="overview" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Agriculture and Agri-Food Canada Funding Overview</h2>
              <p className="text-gray-700 leading-relaxed mb-6">Agriculture and Agri-Food Canada, commonly known as AAFC, is the federal department responsible for policies and programs supporting the Canadian agriculture and agri-food sector. The department manages billions of dollars in funding through the Sustainable Canadian Agricultural Partnership, which runs from 2023 to 2028 as the latest five-year federal-provincial-territorial agreement.</p>
              <p className="text-gray-700 leading-relaxed mb-6">The Canadian agriculture and agri-food sector generates approximately one hundred and fifty billion dollars annually and employs over two million Canadians. This economic importance means AAFC has substantial funding available for innovation, sustainability, and competitiveness improvements across the entire sector, from primary production through food manufacturing and export development.</p>
              <p className="text-gray-700 leading-relaxed mb-6">AAFC programs are designed to support the entire agri-food value chain. Primary producers can access programs for on-farm technology adoption and environmental sustainability. Food processors can fund automation, new product development, and capacity expansion. Technology companies building agricultural solutions can access commercialization funding to bring innovations to market. Research institutions can partner with industry through science cluster funding.</p>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-green-200"><CardHeader><CardTitle className="text-green-700">Sector Coverage</CardTitle></CardHeader><CardContent><ul className="text-sm space-y-2"><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Primary agricultural production including crops and livestock</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Food and beverage processing and manufacturing</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Agricultural technology and precision farming solutions</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Agricultural research and development institutions</span></li></ul></CardContent></Card>
                <Card className="border-blue-200"><CardHeader><CardTitle className="text-blue-700">Priority Areas</CardTitle></CardHeader><CardContent><ul className="text-sm space-y-2"><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Environmental sustainability and climate adaptation</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Innovation and technology commercialization</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Market development and export growth</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Sector resilience and risk management</span></li></ul></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        <section id="sustainable-cap" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Sustainable Canadian Agricultural Partnership Framework</h2>
              <p className="text-gray-700 mb-6">The Sustainable Canadian Agricultural Partnership, referred to as Sustainable CAP, represents Canada&apos;s flagship agricultural policy framework. This three-point-five billion dollar agreement between the federal government and all provinces and territories runs from April 2023 through March 2028. The partnership replaced the previous Canadian Agricultural Partnership and introduced enhanced focus on environmental sustainability.</p>
              <p className="text-gray-700 mb-6">Sustainable CAP funding flows through two main streams. The first stream consists of federal programs delivered directly by Agriculture and Agri-Food Canada. These include AgriInnovate, AgriScience, AgriMarketing, and AgriCompetitiveness. The second stream consists of cost-shared programs delivered by individual provinces and territories. Each province has flexibility in designing their own initiatives within the framework priorities.</p>
              <p className="text-gray-700 mb-6">The partnership is built around four strategic pillars that guide funding priorities across all programs. Building environmental sustainability addresses climate change, soil health, and biodiversity. Building resilience focuses on business risk management and sector adaptation. Building growth supports innovation, market development, and sector competitiveness. Building public trust addresses food safety, traceability, and consumer confidence.</p>
              <div className="bg-green-50 p-6 rounded-lg border border-green-200 mb-6">
                <h3 className="font-bold text-green-800 mb-4">Sustainable CAP Pillars</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div><h4 className="font-semibold mb-2">Environmental Sustainability</h4><p className="text-sm text-gray-700">Programs addressing climate adaptation, emission reduction, water management, and biodiversity conservation across agricultural operations.</p></div>
                  <div><h4 className="font-semibold mb-2">Sector Resilience</h4><p className="text-sm text-gray-700">Business risk management programs including AgriStability, AgriInsurance, and AgriInvest providing safety nets for producers.</p></div>
                  <div><h4 className="font-semibold mb-2">Growth and Competitiveness</h4><p className="text-sm text-gray-700">Innovation funding, market development support, and value chain development programs to enhance Canadian competitiveness.</p></div>
                  <div><h4 className="font-semibold mb-2">Public Trust</h4><p className="text-sm text-gray-700">Initiatives supporting food safety systems, traceability infrastructure, and consumer education about Canadian agriculture.</p></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="agriinnovate" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">AgriInnovate Program</h2>
              <p className="text-gray-700 mb-6">AgriInnovate is AAFC&apos;s premier commercialization program, providing repayable contributions up to five million dollars for projects that accelerate the pace of innovative products, technologies, processes, or services commercialization in the agriculture and agri-food sector. The program typically funds up to fifty percent of eligible project costs through interest-free repayable contributions.</p>
              <p className="text-gray-700 mb-6">The program targets later-stage innovation activities where technologies have been proven and are ready for market deployment. Projects must demonstrate clear commercial potential with defined market applications and customer demand. AgriInnovate is not for basic research or early-stage development, which would be better suited to AgriScience or other programs.</p>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Key Evaluation Criteria</h3>
                <p className="text-gray-700 mb-4">When AAFC officers review AgriInnovate applications, they are looking for specific attributes that reduce risk and ensure return on investment. The most critical factor is the degree of innovation; is this truly "first-in-Canada" or "first-in-world" technology? Incremental improvements to existing equipment are rarely funded. The innovation must represent a significant leap forward for the sector.</p>
                <p className="text-gray-700 mb-4">Secondly, the financial viability of the applicant is scrutinized heavily. Since the funding is repayable, AAFC acts like a bank. They need to see three years of financial statements (or pro-forma statements for startups) that demonstrate the ability to service the debt. The repayment schedule is typically negotiated based on revenue projections, but the capacity to repay must be evident.</p>
                <p className="text-gray-700">Finally, the broader sector benefits are essential. How does this project help Canadian agriculture? Does it open new export markets, reduce environmental impacts, or increase processing capacity for domestic crops? Projects that benefit only the applicant without generating spillover benefits for the industry struggle to secure funding.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card><CardContent className="pt-6"><h3 className="font-bold text-green-700 mb-2 flex items-center"><Leaf className="w-5 h-5 mr-2" />Eligible Activities</h3><ul className="text-sm space-y-1"><li>Pilot and demonstration projects for proven technologies</li><li>Scale-up of production capacity for commercial deployment</li><li>Equipment and infrastructure for commercialization</li><li>Market testing and customer validation activities</li></ul></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold text-blue-700 mb-2 flex items-center"><DollarSign className="w-5 h-5 mr-2" />Funding Details</h3><ul className="text-sm space-y-1"><li>Maximum contribution: Five million dollars</li><li>Cost-share ratio: Up to fifty percent of eligible costs</li><li>Type: Repayable contribution (interest-free)</li><li>Repayment terms: Based on project success</li></ul></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        <section id="agriscience" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">AgriScience Program</h2>
              <p className="text-gray-700 mb-6">AgriScience is AAFC&apos;s flagship research program, providing non-repayable contributions for pre-commercial science activities that support agriculture and agri-food sector innovation. The program funds science clusters organized around commodity groups and activities, as well as individual research projects outside of clusters. Maximum funding can reach fifteen million dollars for large cluster initiatives.</p>
              <p className="text-gray-700 mb-6">Science clusters bring together industry associations, research institutions, and producers around shared priorities. Current clusters cover commodities including beef, pork, poultry, dairy, pulses, cereals, oilseeds, and specialty crops. Each cluster develops research priorities based on industry needs and funds multi-year research programs addressing those priorities. Industry associations typically lead clusters with research conducted at universities and federal research facilities.</p>

              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-8">
                <h3 className="font-bold text-blue-900 mb-4">How to Participate in Science Clusters</h3>
                <p className="text-gray-700 mb-3">For most businesses and researchers, the most effective way to access AgriScience funding is by joining an existing Cluster rather than applying for a standalone project. Clusters have already secured funding envelopes and established administrative structures, significantly reducing the burden on individual participants.</p>
                <p className="text-gray-700 mb-3"><strong>Step 1: Identify Your Cluster.</strong> Determine which commodity group or theme aligns with your research. If you are developing a new pest resistance trait for canola, connect with the Canola Council of Canada's cluster.</p>
                <p className="text-gray-700 mb-3"><strong>Step 2: Align with Priorities.</strong> Review the cluster's published research strategy. Your proposed project must directly address one of their key priority areas (e.g., climate resiliency, yield improvement, disease management).</p>
                <p className="text-gray-700"><strong>Step 3: Secure Industry Contribution.</strong> Clusters typically require an industry matching contribution (often 30-50%). Having industry partners ready to contribute cash or in-kind resources strengthens your proposal to the cluster administration.</p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200 mb-8">
                <h3 className="font-bold text-gray-900 mb-3">Projects Stream vs. Clusters Stream</h3>
                <p className="text-gray-700 mb-4">While Clusters are industry-led and large-scale, the <strong>Projects Stream</strong> exists for research that falls outside specific commodity boundaries. This is ideal for cross-sectoral initiatives (e.g., a water conservation technology applicable to both livestock and crops) or emerging sectors that don't yet have a formalized cluster (e.g., novel proteins or vertical farming).</p>
                <p className="text-gray-700">Applications to the Projects Stream are evaluated directly by AAFC. Competition is intense, and successful projects usually involve strong partnerships between private sector companies and academic institutions.</p>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200"><h3 className="font-bold text-blue-800 mb-3">Research Priority Areas</h3><ul className="grid md:grid-cols-2 gap-2 text-sm"><li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Climate adaptation and mitigation research</li><li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Sustainable production systems development</li><li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Crop and livestock breeding advances</li><li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Food processing and safety innovations</li><li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Pest and disease management solutions</li><li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Precision agriculture technology</li></ul></div>
            </div>
          </div>
        </section>

        <section id="clean-tech" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Agricultural Clean Technology Program</h2>
              <p className="text-gray-700 mb-6">The Agricultural Clean Technology (ACT) Program supports research, development, demonstration, and adoption of clean technologies to reduce greenhouse gas emissions and address environmental challenges in agriculture. The program provides both repayable contributions for commercialization activities and non-repayable contributions for research and adoption activities. Maximum funding reaches two million dollars per project.</p>

              <div className="bg-white p-6 rounded-lg border border-green-100 mb-8">
                <h3 className="text-xl font-bold text-green-800 mb-4">Adoption Stream vs. Research & Innovation Stream</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Adoption Stream</h4>
                    <p className="text-gray-700 text-sm mb-3">Targeted at producers and processors buying commercially available clean technology. If you are buying a grain dryer that is 50% more efficient than standard models, this is your stream.</p>
                    <ul className="text-sm text-gray-700 space-y-1 ml-2 list-disc">
                      <li>Minimum project size: $50,000</li>
                      <li>Non-repayable contributions (grants)</li>
                      <li>Focus on immediate GHG reductions</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Research & Innovation Stream</h4>
                    <p className="text-gray-700 text-sm mb-3">Targeted at companies developing the nex generation of clean tech. If you are engineering a novel methane-reducing feed additive, this is for you.</p>
                    <ul className="text-sm text-gray-700 space-y-1 ml-2 list-disc">
                      <li>Development and demonstration phase</li>
                      <li>Repayable or non-repayable depending on stage</li>
                      <li>Focus on technology validation</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">High-Priority Technologies</h3>
                <p className="text-gray-700 mb-4">AAFC prioritizes funding for technologies that offer significant, measurable reductions in three specific areas:</p>
                <ul className="space-y-4">
                  <li className="bg-white p-4 rounded border border-gray-200">
                    <strong className="text-green-700 block mb-1">1. Green Energy & Energy Efficiency</strong>
                    <span className="text-gray-700 text-sm">Fuel switching (e.g., diesel to electric or biomass), energy-efficient grain dryers, solar installations for farm power, and heat recovery systems for barns and greenhouses.</span>
                  </li>
                  <li className="bg-white p-4 rounded border border-gray-200">
                    <strong className="text-green-700 block mb-1">2. Precision Agriculture</strong>
                    <span className="text-gray-700 text-sm">Variable rate input technology that reduces fertilizer usage (and thus nitrous oxide emissions), auto-steer systems, and sensor-based nutrient management tools.</span>
                  </li>
                  <li className="bg-white p-4 rounded border border-gray-200">
                    <strong className="text-green-700 block mb-1">3. Bioeconomy Solutions</strong>
                    <span className="text-gray-700 text-sm">technologies that convert agricultural waste into energy (biodigesters) or bioproducts, replacing fossil-fuel based inputs.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="food-processing" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Food Processing Funding Programs</h2>
              <p className="text-gray-700 mb-6">Canadian food and beverage processors can access multiple AAFC programs for capacity expansion, automation, product development, and export readiness. The sector represents over one hundred billion dollars in manufacturing output and is the largest manufacturing employer in Canada. AAFC recognizes the sector&apos;s importance and provides substantial funding for modernization and growth.</p>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Supply Management Processing Investment Fund</h3>
                <p className="text-gray-700 mb-4">This fund is specifically designed for processors in supply-managed sectors (Dairy, Poultry, Eggs) to help them adapt to market changes resulting from trade agreements like CETA and CPTPP. It focuses on productivity improvements.</p>
                <div className="bg-orange-50 p-5 rounded-lg border border-orange-100">
                  <p className="font-bold text-orange-900 mb-2">Key Differentiator:</p>
                  <p className="text-gray-700 text-sm">Unlike AgriInnovate, this program does <strong>not</strong> require the project to be "innovative" in a global sense. Buying standard, state-of-the-art automation equipment to increase throughput is eligible. This makes it an essential fund for plant modernization.</p>
                </div>
              </div>

              <p className="text-gray-700 mb-6">Food processors outside supply-managed sectors (e.g., bakers, meat packers, breweries) often rely on AgriInnovate for major capital projects. However, remember that AgriInnovate requires innovation. If you are simply expanding capacity using standard technology, you should look to <strong>Regional Development Agencies (RDAs)</strong> like FedDev Ontario, PrairiesCan, or ACOA, which often fund standard capacity expansion projects to create jobs.</p>
            </div>
          </div>
        </section>

        <section id="provincial" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Provincial Cost-Share Programs</h2>
              <p className="text-gray-700 mb-6">Under Sustainable CAP, each province and territory delivers cost-shared programs within the framework priorities. These programs combine federal and provincial funding to support activities including environmental farm planning, beneficial management practice adoption, market development, and business development. Funding ratios typically range from fifty percent to seventy-five percent of eligible costs.</p>

              <div className="overflow-x-auto mb-8">
                <table className="w-full bg-white border border-gray-200 rounded-lg text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-3 text-left font-bold border-b">Province</th>
                      <th className="p-3 text-left font-bold border-b">Examples of Key Programs</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-3 font-semibold text-gray-900">Ontario</td>
                      <td className="p-3 text-gray-700">Market Access Initiative, Supply Chain Resilience, Honey Bee Health Initiative</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-semibold text-gray-900">Quebec</td>
                      <td className="p-3 text-gray-700">Innov'Action agroalimentaire, Prime-Vert (environmental improvements)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-semibold text-gray-900">Alberta</td>
                      <td className="p-3 text-gray-700">Effectent Grain Handling Program, Water Program, Emerging Opportunities</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-semibold text-gray-900">British Columbia</td>
                      <td className="p-3 text-gray-700">Traceability Adoption, Extreme Weather Preparedness, Food Safety Systems</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-semibold text-gray-900">Saskatchewan</td>
                      <td className="p-3 text-gray-700">Farm and Ranch Water Infrastructure, Resilient Agricultural Landscapes</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="grid md:grid-cols-2 gap-4"><div className="p-4 bg-white rounded-lg border"><h3 className="font-bold mb-2">Environmental Programs</h3><p className="text-sm text-gray-600">Beneficial management practices, environmental farm planning, and sustainability improvements.</p></div><div className="p-4 bg-white rounded-lg border"><h3 className="font-bold mb-2">Business Development</h3><p className="text-sm text-gray-600">Market expansion, business planning, and capacity development support.</p></div></div>
            </div>
          </div>
        </section>

        <section id="eligibility" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Eligibility Requirements</h2>
              <p className="text-gray-700 mb-6">AAFC program eligibility varies by specific program but generally requires Canadian incorporation or registration with operations in the agriculture and agri-food sector. Organizations must demonstrate clear benefit to Canadian agriculture and show capacity to successfully complete proposed projects.</p>
              <div className="grid md:grid-cols-2 gap-6">
                <Card><CardHeader><CardTitle className="text-green-700 flex items-center"><CheckCircle className="w-5 h-5 mr-2" />Generally Eligible</CardTitle></CardHeader><CardContent><ul className="space-y-1 text-sm"><li>Canadian incorporated for-profit businesses in agri-food</li><li>Agricultural producer organizations and cooperatives</li><li>Food and beverage processing companies</li><li>Agricultural technology companies</li><li>Research institutions and universities for science programs</li></ul></CardContent></Card>
                <Card><CardHeader><CardTitle className="text-red-700 flex items-center"><AlertCircle className="w-5 h-5 mr-2" />Common Restrictions</CardTitle></CardHeader><CardContent><ul className="space-y-1 text-sm"><li>Retailers and restaurants typically not eligible</li><li>Projects must not have started before approval</li><li>Stacking limits with other federal programs</li><li>Must maintain Canadian operations through project</li></ul></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        <section id="application" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Application Process Step-by-Step</h2>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold mr-3 flex-shrink-0">1</div>
                    <h3 className="font-bold text-lg">Program Identification & Consultation</h3>
                  </div>
                  <p className="text-gray-700 text-sm mb-2">Before writing a single word, identify the exact program stream that fits your project. Read the Applicant Guide thoroughly. Crucially, contact the program officers directly to discuss your project idea. A 15-minute conversation can save you 50 hours of work on an ineligible application. Ask about current funding availability and typical processing times.</p>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold mr-3 flex-shrink-0">2</div>
                    <h3 className="font-bold text-lg">Application Package Development</h3>
                  </div>
                  <p className="text-gray-700 text-sm mb-2">This is the documentation phase. You will need to prepare a detailed project description, a comprehensive budget using AAFC's templates, and a work plan. For commercialization programs, your business plan and financial statements are just as important as the technical details. Ensure your environmental metrics are calculated correctly.</p>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold mr-3 flex-shrink-0">3</div>
                    <h3 className="font-bold text-lg">Submission & Review</h3>
                  </div>
                  <p className="text-gray-700 text-sm mb-2">Submit your application through the AAFC online portal. AAFC staff will first conduct an administrative review for completeness. Then, technical experts will review the feasibility of the project. Financial officers will review your company's stability. Expect a "clarification period" where they ask detailed questions about your costs or technical claims.</p>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold mr-3 flex-shrink-0">4</div>
                    <h3 className="font-bold text-lg">Approval & Contribution Agreement</h3>
                  </div>
                  <p className="text-gray-700 text-sm mb-2">If successful, you will receive an approval letter followed by a Contribution Agreement. This is a legal contract. Read it carefully. It outlines your reporting obligations, claim submission schedule, and audit rights. Do not start incurring costs until this agreement is signed (or you have received written authorization regarding retroactivity).</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="mistakes" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Common Mistakes to Avoid</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-l-4 border-red-500 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-red-700 mb-2">1. Starting Projects Too Early</h3>
                    <p className="text-sm text-gray-700">This is the number one reason for funding denial. Costs incurred before the Contribution Agreement is signed are almost never eligible. Do not put a deposit on equipment or hire a consultant until you have formal written approval or a "Retroactivity Clause" in your agreement.</p>
                  </CardContent>
                </Card>
                <Card className="border-l-4 border-red-500 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-red-700 mb-2">2. Misaligned Program Selection</h3>
                    <p className="text-sm text-gray-700">Applying to AgriInnovate for early-stage research or AgriScience for commercialization is a waste of time. Innovation programs fund the "new," while adoption programs fund the "proven." Ensure your technology readiness level (TRL) matches the specific program stream.</p>
                  </CardContent>
                </Card>
                <Card className="border-l-4 border-red-500 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-red-700 mb-2">3. Weak Commercialization Plan</h3>
                    <p className="text-sm text-gray-700">Especially for AgriInnovate, AAFC needs to know <em>how</em> you will make money to repay the contribution. Applications that focus 90% on the technology and only 10% on the sales/marketing strategy often fail. Your go-to-market plan must be as robust as your engineering plan.</p>
                  </CardContent>
                </Card>
                <Card className="border-l-4 border-red-500 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-red-700 mb-2">4. Ignoring Stacking Limits</h3>
                    <p className="text-sm text-gray-700">You cannot simply stack infinite grants. Most programs have a "stacking limit" (often 75% or 90%) for total government funding. If you combine AAFC funding with provincial grants and IRAP, you might breach this limit. Always disclose all potential funding sources to avoid clawbacks.</p>
                  </CardContent>
                </Card>
                <Card className="border-l-4 border-red-500 hover:shadow-lg transition-shadow md:col-span-2">
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-red-700 mb-2">5. Vague Environmental Benefits</h3>
                    <p className="text-sm text-gray-700">In the Sustainable CAP era, vague claims like "this is good for the environment" are insufficient. You need data. "Reduces fertilizer runoff by 15% per acre" or "cuts diesel consumption by 40,000 liters annually." Quantifiable environmental metrics significantly strengthen your application across all program streams.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section id="real-stories" className="py-16 bg-green-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-green-900">Real World Impact</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg border border-green-100 shadow-sm">
                  <h4 className="font-bold text-green-900 mb-2">The Sustainable Greenhouse</h4>
                  <p className="text-sm text-gray-600 mb-4"><strong>Project:</strong> Installing energy curtains and a biomass boiler to reduce natural gas reliance.</p>
                  <p className="text-sm text-gray-600"><strong>Funding:</strong> $500,000 from AgriInnovate (Repayable) + $100,000 from Provincial Cost-Share (Grant).</p>
                  <p className="text-sm text-green-700 font-bold mt-2">Outcome: Reduced energy bill by 35% and carbon footprint by 400 tonnes.</p>
                </div>
                <div className="bg-white p-6 rounded-lg border border-green-100 shadow-sm">
                  <h4 className="font-bold text-green-900 mb-2">The Pulse Processor</h4>
                  <p className="text-sm text-gray-600 mb-4"><strong>Project:</strong> Building a new pea protein fractionation facility to export to Asia.</p>
                  <p className="text-sm text-gray-600"><strong>Funding:</strong> $2.5M from AgriInnovate + $1M from Regional Development Agency.</p>
                  <p className="text-sm text-green-700 font-bold mt-2">Outcome: Created 25 full-time jobs and $10M in annual export sales.</p>
                </div>
                <div className="bg-white p-6 rounded-lg border border-green-100 shadow-sm">
                  <h4 className="font-bold text-green-900 mb-2">The AgTech Startup</h4>
                  <p className="text-sm text-gray-600 mb-4"><strong>Project:</strong> AI-powered drone software for precision herbicide application.</p>
                  <p className="text-sm text-gray-600"><strong>Funding:</strong> $200k AgriScience + $50k IRAP Grant.</p>
                  <p className="text-sm text-green-700 font-bold mt-2">Outcome: Commercial technology now used on 500k acres.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="success" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Success Strategies</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div><h3 className="font-bold mb-3 text-green-700">Winning Approaches</h3><ul className="space-y-2 text-sm"><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Engage program officers early for eligibility guidance</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Demonstrate clear commercial pathway and market demand</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Include industry partnerships and letters of support</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Align project with Sustainable CAP strategic priorities</span></li></ul></div>
                <div><h3 className="font-bold mb-3 text-purple-700">Pro Tips</h3><ul className="space-y-2 text-sm"><li className="flex items-start"><Target className="w-4 h-4 text-purple-500 mr-2 mt-0.5" /><span>Environmental sustainability strengthens all applications</span></li><li className="flex items-start"><Target className="w-4 h-4 text-purple-500 mr-2 mt-0.5" /><span>Combine AAFC with compatible provincial programs</span></li><li className="flex items-start"><Target className="w-4 h-4 text-purple-500 mr-2 mt-0.5" /><span>Join science clusters for easier research funding access</span></li></ul></div>
              </div>
            </div>
          </div>
        </section>

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

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Related Guides</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/blog/canada-agriculture-agrifood-grants-guide" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-blue-600 mr-3" /><span>Complete Agriculture Grants Guide</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/blog/irap-industrial-research-assistance-program" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-blue-600 mr-3" /><span>IRAP Program Guide</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/canada/government-grants" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-blue-600 mr-3" /><span>All Government Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/canada" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-blue-600 mr-3" /><span>Canadian Funding</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-r from-green-600 to-green-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-6">Access AAFC Agricultural Funding</h2>
              <p className="text-xl text-green-100 mb-8">Get expert help navigating the Sustainable Canadian Agricultural Partnership programs. We have helped agricultural businesses and agri-tech companies secure millions in federal funding.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild><Link href="/guides/apply-aafc-grants"><Download className="w-4 h-4 mr-2" /> Get AAFC Guide</Link></Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild><Link href="/contact?program=agriculture">Get Expert Help</Link></Button>
              </div>
            </div>
          </div>
        </section>
      </div >
      <Footer />
    </>
  )
}
