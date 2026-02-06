import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Target, Building, HelpCircle, BookOpen, ExternalLink, Leaf, TrendingUp, DollarSign, Factory } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Canada Agri-Food Technology Innovation Grants 2026 | Complete Funding Guide",
  description: "Complete guide to Canadian agri-food technology and innovation grants. Access federal and provincial funding for agricultural technology, food processing innovation, and sustainability projects.",
  keywords: "agri-food technology grants Canada, agricultural innovation funding, food processing grants, sustainable agriculture grants, AgriScience funding",
}

export default function AgrifoodTechGrantsGuidePage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30"><Leaf className="w-3 h-3 mr-1" /> Innovation Funding</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Canada Agri-Food Technology Innovation Grants 2026</h1>
              <p className="text-xl text-green-100 mb-8">Comprehensive guide to federal and provincial funding programs supporting agricultural technology development, food processing innovation, and sustainable farming practices. Access over five hundred million dollars in annual funding for transforming Canada&apos;s agri-food sector through technology innovation.</p>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild><Link href="/contact?program=agri-food-tech">Get Funding Guidance</Link></Button>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto grid md:grid-cols-4 gap-8 text-center">
              <div><div className="text-3xl font-bold text-green-600 mb-2">$500M+</div><div className="text-gray-600">Annual Funding</div></div>
              <div><div className="text-3xl font-bold text-blue-600 mb-2">50%</div><div className="text-gray-600">Cost Share Rates</div></div>
              <div><div className="text-3xl font-bold text-purple-600 mb-2">15+</div><div className="text-gray-600">Active Programs</div></div>
              <div><div className="text-3xl font-bold text-orange-600 mb-2">5 Yrs</div><div className="text-gray-600">CAP Framework</div></div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Agri-Food Technology Funding Overview</h2>
              <p className="text-gray-700 leading-relaxed mb-6">Canada&apos;s agri-food sector represents a critical component of the national economy, contributing over one hundred forty billion dollars annually and employing more than two million Canadians across farming, food processing, and related industries. Recognizing the importance of innovation in maintaining global competitiveness, federal and provincial governments have established substantial funding programs supporting technology development, adoption, and commercialization throughout the agri-food value chain.</p>
              <p className="text-gray-700 leading-relaxed mb-6">The Sustainable Canadian Agricultural Partnership framework, known as SCAP, provides the foundation for most agri-food innovation funding through a five-year, three point five billion dollar federal-provincial-territorial agreement. SCAP prioritizes climate change adaptation, environmental sustainability, and technology-driven productivity improvements. Within this framework, Agriculture and Agri-Food Canada administers national programs while provincial partners deliver complementary programming tailored to regional agricultural priorities and industry structures.</p>
              <p className="text-gray-700 leading-relaxed mb-6">Innovation funding spans the full technology development spectrum from early-stage research through commercial deployment. Pre-commercialization support helps research institutions and companies translate discoveries into viable products and services. Technology adoption programs assist producers and processors in implementing new equipment, systems, and practices. Knowledge transfer initiatives ensure that innovations developed through funded research reach end-users who can apply them productively across the sector.</p>
              <p className="text-gray-700 leading-relaxed mb-6">Eligible innovation areas reflect both traditional agricultural challenges and emerging opportunities. Precision agriculture technologies including sensors, automation, and data analytics improve productivity while reducing input costs and environmental impacts. Sustainable production systems address water management, soil health, and biodiversity conservation. Food processing innovation improves efficiency, food safety, and product development. Emerging areas like cellular agriculture, vertical farming, and alternative proteins represent growing investment priorities as the sector evolves.</p>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-green-200"><CardHeader><CardTitle className="text-green-700">Priority Areas</CardTitle></CardHeader><CardContent><ul className="text-sm space-y-2"><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Precision agriculture and digital farming tools</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Climate change adaptation and sustainability</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Food processing efficiency and safety</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Emerging proteins and alternative foods</span></li></ul></CardContent></Card>
                <Card className="border-blue-200"><CardHeader><CardTitle className="text-blue-700">Eligible Activities</CardTitle></CardHeader><CardContent><ul className="text-sm space-y-2"><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Applied research and technology development</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Pilot projects and field demonstrations</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Equipment and technology acquisition</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Knowledge transfer and training programs</span></li></ul></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Federal Agri-Food Innovation Programs</h2>
              <p className="text-gray-700 mb-6">Agriculture and Agri-Food Canada delivers several major innovation funding programs under the SCAP framework. The AgriScience Program represents the largest investment, providing over three hundred forty million dollars over five years for applied research addressing sector-wide challenges. AgriScience supports research clusters bringing together industry organizations, researchers, and government to advance priority areas including plant and animal genetics, sustainable production systems, and food safety enhancement.</p>
              <p className="text-gray-700 mb-6">The AgriInnovate Program supports commercialization and adoption of innovative technologies through cost-shared contributions and repayable loans. Funding supports equipment acquisition, facility construction, and process implementation for producers, processors, and agri-businesses. AgriInnovate prioritizes projects demonstrating significant competitiveness improvements, environmental benefits, or market development potential. Maximum contributions reach several million dollars for qualifying projects with substantial economic impact projections.</p>
              <p className="text-gray-700 mb-6">The AgriAssurance Program supports food safety, plant health, and animal health systems that underpin market access and consumer confidence. Funding helps industry organizations develop and implement traceability systems, quality assurance programs, and biosecurity protocols. These systems increasingly incorporate technology solutions including blockchain-based tracking, digital certification, and automated quality monitoring that qualify for innovation-focused support within the program.</p>
              <p className="text-gray-700 mb-6">The AgriMarketing Program supports market development activities including technology-enabled marketing platforms, e-commerce development, and digital customer engagement tools. While primarily focused on market access, AgriMarketing recognizes that innovative approaches to customer connection and supply chain coordination require technology investments that qualify for program support alongside traditional promotion and relationship-building activities.</p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Provincial Technology Programs</h2>
              <p className="text-gray-700 mb-6">Provincial governments deliver cost-shared programming under SCAP that addresses regional agricultural priorities and industry structures. Ontario&apos;s Canadian Agricultural Partnership programs support technology adoption through competitive grants for equipment, software, and infrastructure investments. Focus areas include precision agriculture, controlled environment agriculture, and processing automation aligned with the province&apos;s diverse agricultural economy.</p>
              <p className="text-gray-700 mb-6">Saskatchewan and Alberta provide substantial technology support through their respective CAP programs, reflecting the Prairie provinces&apos; grain, oilseed, and livestock production focus. Precision agriculture equipment, water management systems, and livestock monitoring technologies receive priority funding. Saskatchewan&apos;s programs also emphasize pulse crop innovation and value-added processing development supporting the province&apos;s leadership in specialty crop production.</p>
              <p className="text-gray-700 mb-6">British Columbia&apos;s programs reflect the province&apos;s diverse agricultural sectors including greenhouse production, viticulture, and organic farming. Technology funding supports controlled environment systems, water conservation technologies, and organic production innovations. The province also emphasizes food processing innovation supporting value-added product development for local and export markets, with particular attention to Indigenous food systems development.</p>
              <p className="text-gray-700 mb-6">Atlantic provinces coordinate technology programming addressing regional challenges including shorter growing seasons, remote farm locations, and specialized production systems. Innovation funding supports season extension technologies, remote monitoring capabilities, and processing innovations for regional specialty products including seafood, berries, and maple products. Collaborative approaches across Atlantic provinces maximize impact of limited regional research capacity.</p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Precision Agriculture Innovation</h2>
              <p className="text-gray-700 mb-6">Precision agriculture represents a major innovation priority across agri-food funding programs, supporting technology adoption that improves productivity while reducing environmental impacts. GPS guidance systems, variable rate application equipment, and aerial imaging technologies have become standard on larger operations, with funding programs supporting adoption by smaller producers and advancement of next-generation capabilities.</p>
              <p className="text-gray-700 mb-6">Data analytics and artificial intelligence applications are emerging priorities within precision agriculture funding. Farm management software integrating equipment data, weather information, and market signals improves decision-making across operations. Machine learning applications for pest detection, yield prediction, and optimization recommendations represent frontier research areas receiving growing investment through federal and provincial innovation programs.</p>
              <p className="text-gray-700 mb-6">Robotics and automation address labor challenges while improving operational precision. Automated guidance, robotic harvesting, and autonomous equipment operation receive substantial research and adoption funding. The Canadian AgriFood Automation and Intelligence Network coordinates national innovation efforts in this area, facilitating collaboration among researchers, technology developers, and agricultural producers to accelerate practical adoption.</p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Sustainability and Environmental Technology</h2>
              <p className="text-gray-700 mb-6">Environmental sustainability represents a cross-cutting priority influencing all agri-food innovation programming. Climate change adaptation and mitigation receive particular emphasis, with funding supporting technologies reducing greenhouse gas emissions, improving carbon sequestration, and building resilience to extreme weather events. The federal Agricultural Clean Technology Program provides targeted support for adoption of clean technologies by farmers and agri-food processors.</p>
              <p className="text-gray-700 mb-6">Water management technologies address both quality and quantity challenges facing Canadian agriculture. Irrigation efficiency improvements, drainage management systems, and water recycling technologies receive substantial adoption support. Nutrient management technologies reducing fertilizer inputs while maintaining productivity serve dual environmental and economic benefits that funding programs prioritize.</p>
              <p className="text-gray-700 mb-6">Renewable energy and bioeconomy applications transform agricultural waste streams into valuable products while reducing fossil fuel dependence. Anaerobic digestion, biochar production, and biofuel development receive research and commercialization support. These technologies also address food waste reduction, with funding supporting innovations that capture value from processing byproducts and extend product shelf life.</p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Application Strategies</h2>
              <div className="space-y-4">
                <div className="flex items-start p-4 bg-gray-50 rounded-lg border"><div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">1</div><div><h3 className="font-bold">Identify Alignment</h3><p className="text-gray-600 text-sm">Review program priorities against your innovation focus. AgriScience supports collaborative research, AgriInnovate funds commercialization, and CAP programs assist technology adoption. Choose programs matching your development stage.</p></div></div>
                <div className="flex items-start p-4 bg-gray-50 rounded-lg border"><div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">2</div><div><h3 className="font-bold">Build Partnerships</h3><p className="text-gray-600 text-sm">Many programs require or prefer industry partnerships, research collaborations, or producer engagement. Build relationships with potential partners before application deadlines to strengthen proposals.</p></div></div>
                <div className="flex items-start p-4 bg-gray-50 rounded-lg border"><div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">3</div><div><h3 className="font-bold">Demonstrate Impact</h3><p className="text-gray-600 text-sm">Quantify expected benefits including productivity improvements, environmental outcomes, and economic impacts. Use industry benchmarks and research evidence to support projections.</p></div></div>
                <div className="flex items-start p-4 bg-gray-50 rounded-lg border"><div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">4</div><div><h3 className="font-bold">Stack Programs</h3><p className="text-gray-600 text-sm">Combine federal and provincial programs, tax incentives, and private financing for comprehensive project funding. Coordinate applications across programs with different contribution limits and eligible costs.</p></div></div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Eligibility and Requirements</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card><CardHeader><CardTitle className="text-green-700 flex items-center"><CheckCircle className="w-5 h-5 mr-2" />Eligible Applicants</CardTitle></CardHeader><CardContent><ul className="space-y-1 text-sm"><li>Farms and agricultural producers</li><li>Food processing companies</li><li>Agri-food technology developers</li><li>Industry associations and organizations</li><li>Research institutions with industry partners</li></ul></CardContent></Card>
                <Card><CardHeader><CardTitle className="text-blue-700 flex items-center"><Building className="w-5 h-5 mr-2" />Typical Requirements</CardTitle></CardHeader><CardContent><ul className="space-y-1 text-sm"><li>Canadian business or organization</li><li>Financial capacity for cost-share</li><li>Clear innovation or technology focus</li><li>Measurable outcomes and impact</li><li>Industry relevance and scalability</li></ul></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <Card><CardContent className="pt-6"><h3 className="font-bold flex items-start"><HelpCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />What funding levels are available?</h3><p className="text-gray-700 mt-2 ml-7">Funding varies by program and project scope. Technology adoption grants may provide fifty percent of eligible costs up to one hundred thousand dollars. AgriInnovate commercialization projects can receive several million dollars in repayable contributions. Research clusters receive multi-million dollar allocations over five-year periods.</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold flex items-start"><HelpCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />Can small farms access innovation funding?</h3><p className="text-gray-700 mt-2 ml-7">Yes, provincial CAP programs specifically target technology adoption by producers of all sizes. Many programs have lower contribution limits and simplified application processes for smaller operations. Farm-level precision agriculture and sustainability investments are priority areas across provinces.</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold flex items-start"><HelpCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />Are technology companies eligible?</h3><p className="text-gray-700 mt-2 ml-7">Agri-food technology developers are eligible for innovation and commercialization programs. Companies benefit from partnerships with agricultural producers who can demonstrate practical application and adoption potential. Industry association membership may strengthen applications.</p></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Related Guides</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/blog/agriculture-agri-food-canada-government-grants" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-blue-600 mr-3" /><span>AAFC Government Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/blog/canada-agriculture-agrifood-grants-guide" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-blue-600 mr-3" /><span>Complete Agriculture Guide</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/blog/canada-clean-technology-innovation-grants" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-blue-600 mr-3" /><span>Clean Technology Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/canada/business-grants" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-blue-600 mr-3" /><span>All Canadian Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-r from-green-600 to-green-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div classtName="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-6">Get Agri-Food Innovation Funding</h2>
              <p className="text-xl text-green-100 mb-8">Access five hundred million dollars in annual funding for agricultural technology development, sustainable farming innovation, and food processing advancement.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild><Link href="/contact?program=agri-food-tech"><Factory className="w-4 h-4 mr-2" /> Get Funding Guidance</Link></Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild><Link href="/canada/business-grants">Explore All Programs</Link></Button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
