import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, DollarSign, Target, AlertCircle, Building, Users, Download, Shield, TrendingUp, HelpCircle, BookOpen, ExternalLink, Plane, Rocket, ArrowRight } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Canada Aerospace & Defence Innovation Grants 2026 | Complete Funding Guide",
  description: "Complete guide to Canadian aerospace and defence innovation funding. Access ISED, DND, and regional programs for aerospace R&D, defence technology, and space innovation.",
  keywords: "Canada aerospace grants, defence innovation funding, ISED aerospace, DND innovation, Canadian space funding, aerospace R&D grants",
}

export default function CanadaAerospaceDefenceInnovationGrantsPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-br from-slate-700 to-slate-900 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30"><Plane className="w-3 h-3 mr-1" /> Aerospace and Defence</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Canada Aerospace and Defence Innovation Grants 2026</h1>
              <p className="text-xl text-slate-200 mb-8">Comprehensive guide to federal funding for aerospace research and development, defence technology innovation, and space sector advancement. Access billions in strategic sector investment through ISED, DND, and specialized programs.</p>
              <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold" asChild><Link href="/grant-finder?sector=aerospace-defence">Find Aerospace Programs</Link></Button>
            </div>
          </div>
        </section>

        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <nav className="p-6 bg-gray-50 rounded-xl">
                <h2 className="text-lg font-bold mb-4">In This Guide</h2>
                <ul className="grid md:grid-cols-2 gap-2 text-sm">
                  <li><a href="#overview" className="text-blue-700 hover:underline">1. Industry Overview</a></li>
                  <li><a href="#strategic-innovation" className="text-blue-700 hover:underline">2. Strategic Innovation Fund</a></li>
                  <li><a href="#defence" className="text-blue-700 hover:underline">3. Defence Innovation Programs</a></li>
                  <li><a href="#space" className="text-blue-700 hover:underline">4. Canadian Space Agency</a></li>
                  <li><a href="#regional" className="text-blue-700 hover:underline">5. Regional Development</a></li>
                  <li><a href="#sred" className="text-blue-700 hover:underline">6. SR&amp;ED for Aerospace</a></li>
                  <li><a href="#irap" className="text-blue-700 hover:underline">7. IRAP Aerospace Support</a></li>
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
              <div><div className="text-3xl font-bold text-slate-700 mb-2">$28B</div><div className="text-gray-600">Annual Sector Output</div></div>
              <div><div className="text-3xl font-bold text-blue-600 mb-2">$2B+</div><div className="text-gray-600">Available Funding</div></div>
              <div><div className="text-3xl font-bold text-green-600 mb-2">90K+</div><div className="text-gray-600">Industry Jobs</div></div>
              <div><div className="text-3xl font-bold text-purple-600 mb-2">$500M</div><div className="text-gray-600">Max SIF Award</div></div>
            </div>
          </div>
        </section>

        <section id="overview" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">What is the State of Aerospace & Defence in Canada?</h2>
              <p className="text-gray-700 leading-relaxed mb-6">Canada&apos;s aerospace and defence sector represents one of the most strategically important and innovation-intensive industries in the country. The sector generates approximately twenty-eight billion dollars in annual economic output and directly employs over ninety thousand highly skilled workers across the country. Canadian aerospace companies are global leaders in business aviation, regional aircraft, helicopter manufacturing, space systems, and defense technology development. The industry&apos;s concentration of engineering talent and advanced manufacturing capabilities makes it a cornerstone of Canadian innovation policy.</p>
              <p className="text-gray-700 leading-relaxed mb-6">The federal government recognizes aerospace and defence as a priority sector for economic development and national security. This recognition translates into substantial funding availability through multiple program streams. The Strategic Innovation Fund provides large-scale project support reaching hundreds of millions of dollars. Defence innovation programs through the Department of National Defence support technology development for military applications. The Canadian Space Agency funds everything from satellite technology to astronaut programs and lunar exploration initiatives.</p>
              <p className="text-gray-700 leading-relaxed mb-6">Regional considerations significantly shape aerospace funding landscapes. Quebec&apos;s aerospace cluster centered on Montreal represents the largest concentration of aerospace activity in Canada, with companies like Bombardier, Bell Helicopter, and CAE headquartered in the region. Ontario&apos;s aerospace sector focuses on engine manufacturing, avionics, and space systems. Western Canada has growing strength in space technology, satellite communications, and unmanned aerial systems. Each region accesses different combinations of federal and provincial programs based on local priorities and cluster development strategies.</p>
              <p className="text-gray-700 leading-relaxed mb-6">The supply chain structure in aerospace and defence creates funding opportunities across company sizes. Major original equipment manufacturers anchor the industry but depend on hundreds of specialized small and medium enterprises for components, systems integration, and specialized services. Funding programs recognize this structure by targeting both large anchor investments and supplier capability development. Companies at any tier of the supply chain can access appropriate funding programs based on their role, capabilities, and growth objectives.</p>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-slate-200"><CardHeader><CardTitle className="text-slate-700">Sector Strengths</CardTitle></CardHeader><CardContent><ul className="text-sm space-y-2"><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Global leadership in business and regional aviation manufacturing</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Advanced satellite and space systems development capabilities</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>World-class simulation, training, and avionics systems</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Strong maintenance, repair, and overhaul service sector</span></li></ul></CardContent></Card>
                <Card className="border-blue-200"><CardHeader><CardTitle className="text-blue-700">Priority Technologies</CardTitle></CardHeader><CardContent><ul className="text-sm space-y-2"><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Electric and hybrid propulsion systems for aviation</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Autonomous and unmanned aerial vehicle technologies</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Advanced materials including composites and additive manufacturing</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Cybersecurity and secure communication systems</span></li></ul></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        <section id="strategic-innovation" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">What SIF Funding is Available for Aerospace?</h2>
              <p className="text-gray-700 mb-6">The Strategic Innovation Fund, administered by Innovation, Science and Economic Development Canada, represents the largest source of direct federal investment for major aerospace projects. The program provides repayable and non-repayable contributions for large-scale research and development, facility expansion, and technology adoption initiatives. Aerospace has been designated a priority sector under SIF, meaning aerospace projects receive favorable consideration during evaluation and funding allocation processes.</p>
              <p className="text-gray-700 mb-6">SIF aerospace investments have supported transformative industry projects including next-generation aircraft development, advanced manufacturing facility construction, and clean aviation technology research. The program can provide contributions reaching hundreds of millions of dollars for major projects, making it the appropriate program for anchor investments that would reshape industry capabilities. Smaller projects are typically directed to other programs like IRAP or regional development agencies rather than SIF.</p>
              <p className="text-gray-700 mb-6">The program operates through three main streams that aerospace companies can access. The first stream focuses on research and development projects advancing technology readiness levels toward commercial application. The second stream supports facility expansion and equipment acquisition for production scale-up. The third stream targets technology adoption and productivity improvement investments. Most aerospace SIF applications fall under the research and development stream given the industry&apos;s innovation intensity.</p>
              <p className="text-gray-700 mb-6">SIF applications for aerospace projects receive evaluation based on innovation merit, economic benefit, and strategic alignment with government priorities. Clean aviation technologies, advanced manufacturing processes, and supply chain capability development are current priority areas. Applications must demonstrate clear job creation, intellectual property development in Canada, and sustainable competitive advantage. The program&apos;s scale means application preparation typically requires significant investment in business case development and government relations engagement.</p>
              <div className="bg-slate-50 p-6 rounded-lg border border-slate-200"><h3 className="font-bold text-slate-800 mb-3">SIF Aerospace Funding Details</h3><div className="grid md:grid-cols-3 gap-4 text-sm"><div><strong>Maximum:</strong> $500M+ for major projects</div><div><strong>Type:</strong> Repayable and non-repayable</div><div><strong>Focus:</strong> Large-scale strategic investments</div></div></div>
            </div>
          </div>
        </section>

        <section id="defence" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Are there Grants for Defence Innovation (IDEaS)?</h2>
              <p className="text-gray-700 mb-6">The Department of National Defence operates several innovation programs supporting defence technology development by Canadian companies. The Innovation for Defence Excellence and Security program, known as IDEaS, provides funding through competitive challenges focused on specific capability gaps identified by the Canadian Armed Forces. These challenges invite solutions for problems ranging from Arctic operations to cybersecurity to soldier systems. Companies with relevant technology can win contracts worth millions of dollars to develop and demonstrate solutions.</p>
              <p className="text-gray-700 mb-6">The IDEaS program operates through multiple elements targeting different stages of technology development. Competitive projects provide up to one million dollars for proof of concept work addressing specific military capability needs. Innovation networks fund ecosystems and accelerators supporting defence innovation across the country. Test drive opportunities provide access to military facilities and personnel for technology validation. Sandbox challenges offer smaller awards for creative solutions to emerging problems.</p>
              <p className="text-gray-700 mb-6">Defence procurement policies include Industrial and Technological Benefits requirements that create additional opportunity for Canadian suppliers. Major defence acquisitions include obligations for prime contractors to invest in Canadian industry through direct procurement, technology transfer, or research and development. Companies that register as ITB-eligible suppliers can access procurement and investment opportunities flowing from major programs like the Canadian Surface Combatant shipbuilding program or fighter jet replacement.</p>
              <p className="text-gray-700 mb-6">The Build in Canada Innovation Program provides another pathway for defence-applicable technologies. The program allows companies to test and validate innovative products with federal government departments before commercial launch. Defence-related technologies can access testing opportunities within DND environments, providing both funding and the validation needed for defence market entry. Security requirements and clearance processes add complexity to defence innovation programs compared to civilian alternatives.</p>
            </div>
          </div>
        </section>

        <section id="space" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">What Funding Does the Canadian Space Agency Offer?</h2>
              <p className="text-gray-700 mb-6">The Canadian Space Agency provides funding for space technology development, satellite systems, and exploration mission participation. The agency&apos;s Space Technology Development Program supports research and development advancing Canadian capabilities across the space technology spectrum. Projects range from satellite component development to robotics for lunar exploration to earth observation systems. The program provides non-repayable contributions based on competitive evaluation of technical merit and commercial potential.</p>
              <p className="text-gray-700 mb-6">Canada&apos;s participation in international space initiatives creates significant opportunity for Canadian industry. The Lunar Gateway partnership with NASA and other space agencies involves Canadian contributions including the Canadarm3 robotic system. Participation agreements include provisions for Canadian industry involvement in equipment supply and scientific payload development. Companies developing space robotics, life support systems, or exploration technologies can access opportunities flowing from these international partnerships.</p>
              <p className="text-gray-700 mb-6">The satellite and earth observation sector receives substantial CSA support given its economic and societal importance. Programs fund development of next-generation satellite technologies for communications, navigation, and earth observation applications. The RADARSAT Constellation Mission and its successors involve Canadian industry in system development and ground segment operations. Climate monitoring, emergency response, and natural resource management applications drive continued investment in satellite capabilities.</p>
              <p className="text-gray-700 mb-6">Emerging space sector opportunities include small satellite technologies, commercial space services, and space sustainability. CSA programs increasingly support smaller companies developing innovative approaches to space operations. CubeSat and microsatellite projects receive dedicated program attention. Space debris mitigation, in-orbit servicing, and sustainable space operations attract growing policy interest and corresponding funding availability. The commercial space explosion globally creates market opportunity that Canadian companies can address with appropriate technology development support.</p>
              <div className="grid md:grid-cols-2 gap-6">
                <Card><CardContent className="pt-6"><h3 className="font-bold text-blue-700 mb-2 flex items-center"><Rocket className="w-5 h-5 mr-2" />Space Technology Focus</h3><ul className="text-sm space-y-1"><li>Robotics and autonomous systems for space operations</li><li>Health sciences and life support for exploration missions</li><li>Satellite communications and navigation technology</li><li>Earth observation sensors and analytics platforms</li></ul></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold text-green-700 mb-2 flex items-center"><TrendingUp className="w-5 h-5 mr-2" />Emerging Opportunities</h3><ul className="text-sm space-y-1"><li>Lunar surface operations and resource utilization</li><li>Commercial space services and infrastructure</li><li>Small satellite constellations and ground systems</li><li>Space sustainability and debris mitigation</li></ul></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        <section id="regional" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Are there Regional Grants for Aerospace?</h2>
              <p className="text-gray-700 mb-6">Regional development agencies provide important complementary funding for aerospace and defence companies across Canada. Canada Economic Development for Quebec Regions supports the province&apos;s dominant aerospace cluster through sector-specific initiatives and general business development programs. Quebec aerospace companies can access both federal regional funding and dedicated provincial aerospace programs through Investissement Quebec, creating opportunities to stack multiple funding sources for major projects.</p>
              <p className="text-gray-700 mb-6">FedDev Ontario provides funding for the province&apos;s aerospace and space sector companies, particularly those clustered in the Greater Toronto Area and Ottawa regions. The agency supports supplier development, technology commercialization, and facility expansion for companies serving aerospace markets. PrairiesCan and Pacific Economic Development Canada increasingly support aerospace and space technology companies in western provinces as the sector grows beyond traditional Quebec and Ontario concentration.</p>
              <p className="text-gray-700 mb-6">Regional agency funding typically ranges from hundreds of thousands to several million dollars for individual projects, filling the gap between smaller IRAP support and larger Strategic Innovation Fund investments. Companies can often access regional agency funding more quickly than Strategic Innovation Fund support given simpler application processes and shorter review timelines. Regional agencies also provide business advisory services, market development support, and ecosystem connection assistance beyond direct funding.</p>
              <p className="text-gray-700 mb-6">Strategic stacking of regional funding with federal programs multiplies available support for aerospace projects. Many companies successfully combine regional agency contributions with IRAP funding, SR&ED tax credits, and ultimately Strategic Innovation Fund investment as projects mature. The key is understanding how different programs interact and ensuring compliance with stacking limits that apply to some funding combinations. Working with experienced grant consultants helps navigate these complexities and maximize total funding available for aerospace innovation investments across company growth stages.</p>
            </div>
          </div>
        </section>

        <section id="sred" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Can Aerospace Projects Claim SR&ED?</h2>
              <p className="text-gray-700 mb-6">The Scientific Research and Experimental Development tax credit program provides substantial ongoing support for aerospace research and development activities. The program returns up to thirty-five percent of eligible expenditures for Canadian-controlled private corporations, making it one of the most generous research tax incentives globally. Aerospace companies with continuous development programs accumulate significant SR&amp;ED claims annually that substantially offset research costs.</p>
              <p className="text-gray-700 mb-6">Aerospace activities frequently qualify for SR&amp;ED given the industry&apos;s technology development intensity. Design of new aircraft systems, component testing beyond standard validation, manufacturing process development, and software development for aviation applications all potentially qualify. The program rewards technological advancement and uncertainty resolution rather than routine engineering, so claims require careful documentation of the technical challenges addressed and knowledge generated through development work.</p>
              <p className="text-gray-700 mb-6">Successful SR&amp;ED claims in aerospace require meticulous project documentation and technical writing that clearly articulates technological uncertainty and systematic investigation. Companies should establish SR&amp;ED tracking processes at project initiation rather than attempting retrospective claim preparation. Many aerospace companies engage specialized SR&amp;ED consultants to maximize claim value and ensure audit readiness. Annual SR&amp;ED claims ranging from hundreds of thousands to millions of dollars are common in aerospace companies with active development programs.</p>
            </div>
          </div>
        </section>

        <section id="irap" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">How Does IRAP Support Aerospace SMEs?</h2>
              <p className="text-gray-700 mb-6">The Industrial Research Assistance Program provides essential support for small and medium aerospace companies developing innovative technologies. IRAP funding covers salary costs for technical staff working on research and development projects, with contributions typically covering fifty to eighty percent of eligible personnel costs. Projects can receive up to one million dollars in IRAP support, though larger amounts are available for exceptional projects through direct contribution agreements.</p>
              <p className="text-gray-700 mb-6">Beyond direct funding, IRAP Industrial Technology Advisors provide valuable guidance for aerospace companies navigating the innovation funding landscape. ITAs help companies identify appropriate programs, refine project scopes, and connect with potential partners and customers. The aerospace sector ITAs often have deep industry experience and connections that accelerate market access and technology commercialization. Companies should view IRAP relationships as strategic partnerships rather than transactional funding requests.</p>
              <p className="text-gray-700 mb-6">IRAP also provides access to specialized programs relevant to aerospace companies. The Concierge service connects companies to federal and provincial programs beyond IRAP funding. The Canadian International Innovation Program supports collaborative research with international partners, creating opportunity for aerospace companies with global technology relationships. Youth employment programs fund hiring of new graduates for technical roles, expanding team capacity while companies develop their IRAP-funded technologies.</p>
            </div>
          </div>
        </section>

        <section id="eligibility" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Who is Eligible for Aerospace Funding?</h2>
              <p className="text-gray-700 mb-6">Eligibility requirements vary across aerospace and defence funding programs but share common elements. Canadian incorporation and principal place of business in Canada are standard requirements. Security clearance requirements apply for defence-related programs, adding both eligibility barriers and preparation time. Companies must demonstrate technical capability to execute proposed projects and financial capacity to provide required cost-sharing contributions.</p>
              <div className="grid md:grid-cols-2 gap-6">
                <Card><CardHeader><CardTitle className="text-green-700 flex items-center"><CheckCircle className="w-5 h-5 mr-2" />General Requirements</CardTitle></CardHeader><CardContent><ul className="space-y-1 text-sm"><li>Canadian incorporated for-profit business entity</li><li>Principal operations and development work in Canada</li><li>Technical team capable of project execution</li><li>Financial capacity for cost-share obligations</li><li>Intellectual property retention or development in Canada</li></ul></CardContent></Card>
                <Card><CardHeader><CardTitle className="text-red-700 flex items-center"><AlertCircle className="w-5 h-5 mr-2" />Defence-Specific Requirements</CardTitle></CardHeader><CardContent><ul className="space-y-1 text-sm"><li>Security clearances for classified work</li><li>Facility security accreditation where required</li><li>Export control compliance systems</li><li>Canadian Controlled Goods Program registration</li><li>Industrial security screening for personnel</li></ul></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        <section id="application" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">How to Apply for Aerospace Grants?</h2>
              <div className="space-y-4">
                <div className="flex items-start p-4 bg-white rounded-lg border"><div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">1</div><div><h3 className="font-bold">Program Identification</h3><p className="text-gray-600 text-sm">Research available programs to identify best fit for project scope, stage, and funding need. Larger projects require SIF while smaller developments suit IRAP. Contact program officers for pre-application guidance and eligibility confirmation.</p></div></div>
                <div className="flex items-start p-4 bg-white rounded-lg border"><div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">2</div><div><h3 className="font-bold">Business Case Development</h3><p className="text-gray-600 text-sm">Prepare detailed project descriptions including technical approach, market opportunity, and commercialization pathway. Larger programs require extensive business case documentation and third-party market validation.</p></div></div>
                <div className="flex items-start p-4 bg-white rounded-lg border"><div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">3</div><div><h3 className="font-bold">Application Submission</h3><p className="text-gray-600 text-sm">Submit complete applications through program portals with all required supporting documentation. Large SIF applications often involve multiple rounds of questions and supplementary submissions.</p></div></div>
                <div className="flex items-start p-4 bg-white rounded-lg border"><div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">4</div><div><h3 className="font-bold">Negotiation and Approval</h3><p className="text-gray-600 text-sm">Approved projects proceed to contribution agreement negotiation specifying funding terms, milestones, and reporting requirements. SIF negotiations can extend months given deal complexity and ministerial approval requirements.</p></div></div>
              </div>
            </div>
          </div>
        </section>

        <section id="mistakes" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">What are Common Pitfalls in Aerospace Applications?</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Card><CardContent className="pt-6"><h3 className="font-bold text-red-600 mb-2">Underestimating Security Timelines</h3><p className="text-sm text-gray-600">Security clearances for defence programs take months to obtain. Start clearance processes well before project commencement to avoid capability gaps delaying funded work.</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold text-red-600 mb-2">Wrong Program Scale</h3><p className="text-sm text-gray-600">Applying to Strategic Innovation Fund for small projects or IRAP for major investments wastes time. Match project scale to appropriate program thresholds.</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold text-red-600 mb-2">Weak Commercialization Plans</h3><p className="text-sm text-gray-600">Aerospace innovation programs require clear paths to commercial or military application. Technology development without market validation rarely receives funding.</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold text-red-600 mb-2">IP Strategy Gaps</h3><p className="text-sm text-gray-600">Programs increasingly require demonstration of Canadian intellectual property retention. Applications without clear IP strategy face rejection or unfavorable terms.</p></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        <section id="success" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">How to Win Aerospace & Defence Grants?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div><h3 className="font-bold mb-3 text-green-700">Winning Approaches</h3><ul className="space-y-2 text-sm"><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Build relationships with IRAP advisors and program officers before applications</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Demonstrate clear alignment with current policy priorities like clean aviation</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Include letters from potential customers validating market opportunity</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Stack multiple programs strategically across project phases</span></li></ul></div>
                <div><h3 className="font-bold mb-3 text-purple-700">Pro Tips</h3><ul className="space-y-2 text-sm"><li className="flex items-start"><Target className="w-4 h-4 text-purple-500 mr-2 mt-0.5" /><span>Clean aviation and sustainable aviation fuels are current funding priorities</span></li><li className="flex items-start"><Target className="w-4 h-4 text-purple-500 mr-2 mt-0.5" /><span>OEM partnerships strengthen applications for supplier capability development</span></li><li className="flex items-start"><Target className="w-4 h-4 text-purple-500 mr-2 mt-0.5" /><span>Combine federal grants with provincial aerospace program support</span></li></ul></div>
              </div>
            </div>
          </div>
        </section>

        <section id="faqs" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <Card><CardContent className="pt-6"><h3 className="font-bold flex items-start"><HelpCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />Can startups access aerospace funding or is it only for established companies?</h3><p className="text-gray-700 mt-2 ml-7">Yes, startups can access IRAP funding, CSA small projects, and IDEaS challenges. Strategic Innovation Fund typically requires established companies given project scale requirements. Build track record through smaller programs before pursuing large-scale funding.</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold flex items-start"><HelpCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />How do security clearance requirements affect defence innovation programs?</h3><p className="text-gray-700 mt-2 ml-7">Many defence programs require security clearances that take three to six months to obtain. Start clearance processes immediately when pursuing defence opportunities. Some IDEaS challenges operate at unclassified levels accessible without prior clearance.</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold flex items-start"><HelpCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />What aerospace technologies are currently receiving priority funding?</h3><p className="text-gray-700 mt-2 ml-7">Electric and hybrid propulsion, sustainable aviation fuels, autonomous systems, and advanced manufacturing technologies are current priorities. Space sector focuses on lunar exploration contributions, satellite communications, and earth observation applications.</p></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        {/* Official Resources Section */}
        <section className="py-16 bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Official Aerospace & Defence Resources</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Building className="w-5 h-5 mr-2 text-blue-600" />
                    Government Agencies
                  </h3>
                  <ul className="space-y-3">
                    <li>
                      <a href="https://ised-isde.canada.ca/site/strategic-innovation-fund/en" target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:underline">
                        Strategic Innovation Fund (SIF) <ExternalLink className="w-4 h-4 ml-1" />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.canada.ca/en/department-national-defence/programs/defence-ideas.html" target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:underline">
                        IDEaS - Defence Innovation <ExternalLink className="w-4 h-4 ml-1" />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.asc-csa.gc.ca/eng/funding/" target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:underline">
                        Canadian Space Agency Funding <ExternalLink className="w-4 h-4 ml-1" />
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
                    Related Guides
                  </h3>
                  <ul className="space-y-3">
                    <li>
                      <Link href="/blog/strategic-innovation-fund-canada-guide" className="flex items-center text-blue-600 hover:underline">
                        Strategic Innovation Fund Guide <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog/sred-scientific-research-experimental-development" className="flex items-center text-blue-600 hover:underline">
                        SR&ED Tax Credit Guide <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Related Guides</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/blog/strategic-innovation-fund-canada-guide" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-blue-600 mr-3" /><span>Strategic Innovation Fund Guide</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/blog/irap-industrial-research-assistance-program" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-blue-600 mr-3" /><span>IRAP Program Guide</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/blog/sred-scientific-research-experimental-development" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-blue-600 mr-3" /><span>SR&amp;ED Tax Credits</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/canada/government-grants" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-blue-600 mr-3" /><span>All Government Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-r from-slate-700 to-slate-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-6">Access Aerospace and Defence Innovation Funding</h2>
              <p className="text-xl text-slate-200 mb-8">Get expert help navigating Strategic Innovation Fund, defence innovation programs, and space sector funding opportunities. We have helped aerospace companies secure substantial government investment.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold" asChild><Link href="/guides/aerospace-defence-funding"><Download className="w-4 h-4 mr-2" /> Get Aerospace Guide</Link></Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10" asChild><Link href="/contact?sector=aerospace">Get Expert Help</Link></Button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Can startups access aerospace funding?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, startups can access IRAP funding, CSA small projects, and IDEaS challenges. Strategic Innovation Fund typically requires established companies given project scale requirements."
                }
              },
              {
                "@type": "Question",
                "name": "How do security clearance requirements affect defence innovation projects?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Many defence programs require security clearances that can take 3-6 months. It's crucial to start these processes early. Some IDEaS challenges, however, operate at unclassified levels."
                }
              },
              {
                "@type": "Question",
                "name": "What aerospace technologies are funded?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Priorities include electric and hybrid propulsion, sustainable aviation fuels (SAF), autonomous systems, advanced manufacturing, and space technologies like satellite communications and earth observation."
                }
              },
              {
                "@type": "Question",
                "name": "Does SR&ED cover aerospace engineering?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, SR&ED is extensively used in aerospace for experimental development in aerodynamic design, avionics systems, materials science, and manufacturing process improvement."
                }
              }
            ]
          }),
        }}
      />
    </>
  )
}
