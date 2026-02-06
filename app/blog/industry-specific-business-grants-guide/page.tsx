import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Clock, DollarSign, Target, CheckCircle, AlertCircle, Factory, Stethoscope, Cpu, Wheat, Beaker, BookOpen, HelpCircle, ChevronRight, Building2 } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Industry-Specific Business Grants Guide 2026 | Sector-Focused Funding Programs",
  description: "Complete guide to industry-specific business grants. Find targeted funding for manufacturing, healthcare, technology, agriculture, clean energy, and specialized sectors.",
  keywords: "industry specific grants, sector grants, manufacturing grants, healthcare grants, technology grants, agriculture grants, clean energy grants",
}

export default function IndustrySpecificBusinessGrantsGuide() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-br from-teal-600 to-cyan-700 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30"><Factory className="w-3 h-3 mr-1" /> Industry-Specific Programs</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Industry-Specific Business Grants Guide 2026</h1>
              <p className="text-xl text-teal-100 mb-8">Find targeted funding programs for your industry sector. Comprehensive guide to grants for manufacturing, healthcare, technology, agriculture, clean energy, and more.</p>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild><Link href="/contact?service=industry-grants">Get Industry Grant Help</Link></Button>
            </div>
          </div>
        </section>

        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <nav className="p-6 bg-gray-50 rounded-xl">
                <h2 className="text-lg font-bold mb-4">In This Guide</h2>
                <ul className="grid md:grid-cols-2 gap-2 text-sm">
                  <li><a href="#overview" className="text-blue-700 hover:underline">1. What Are Industry Grants?</a></li>
                  <li><a href="#healthcare" className="text-blue-700 hover:underline">2. Healthcare &amp; Life Sciences</a></li>
                  <li><a href="#manufacturing" className="text-blue-700 hover:underline">3. Manufacturing &amp; Industrial</a></li>
                  <li><a href="#technology" className="text-blue-700 hover:underline">4. Technology &amp; Software</a></li>
                  <li><a href="#agriculture" className="text-blue-700 hover:underline">5. Agriculture &amp; Food</a></li>
                  <li><a href="#cleanenergy" className="text-blue-700 hover:underline">6. Clean Energy &amp; Environment</a></li>
                  <li><a href="#defense" className="text-blue-700 hover:underline">7. Defense &amp; Aerospace</a></li>
                  <li><a href="#eligibility" className="text-blue-700 hover:underline">8. Eligibility Requirements</a></li>
                  <li><a href="#finding" className="text-blue-700 hover:underline">9. Finding Industry Programs</a></li>
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
              <div><div className="text-3xl font-bold text-teal-600 mb-2">200+</div><div className="text-gray-600">Industry Programs</div></div>
              <div><div className="text-3xl font-bold text-cyan-600 mb-2">$1.7M</div><div className="text-gray-600">Maximum Awards</div></div>
              <div><div className="text-3xl font-bold text-blue-600 mb-2">15</div><div className="text-gray-600">Major Sectors</div></div>
              <div><div className="text-3xl font-bold text-green-600 mb-2">$8B</div><div className="text-gray-600">Annual Industry Grants</div></div>
            </div>
          </div>
        </section>

        <section id="overview" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">What Are Industry-Specific Business Grants?</h2>
              <p className="text-gray-700 leading-relaxed mb-6">Industry-specific business grants are targeted funding programs designed to address the unique needs, challenges, and opportunities within particular business sectors. These grants often focus on innovation, research, modernization, and growth within specialized industries where the government has strategic interests.</p>
              <p className="text-gray-700 leading-relaxed mb-6">Federal agencies such as NIH, DOE, USDA, DOD, and NSF offer industry-specific SBIR/STTR grants. Additionally, state economic development agencies, industry associations, and private foundations provide sector-focused funding. Understanding which programs apply to your industry is the first step to accessing this targeted funding.</p>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-teal-200"><CardHeader><CardTitle className="text-teal-700">Why Industry Grants?</CardTitle></CardHeader><CardContent><ul className="text-sm text-gray-700 space-y-2"><li>• Address sector-specific challenges</li><li>• Promote industry innovation</li><li>• Support economic priorities</li><li>• Meet regulatory requirements</li><li>• Enhance competitiveness</li><li>• Drive technological advancement</li></ul></CardContent></Card>
                <Card className="border-cyan-200"><CardHeader><CardTitle className="text-cyan-700">Funding Sources</CardTitle></CardHeader><CardContent><ul className="text-sm text-gray-700 space-y-2"><li>• Federal agencies (NIH, DOE, USDA, etc.)</li><li>• State economic development programs</li><li>• Industry associations</li><li>• Private foundations</li><li>• Corporate grant programs</li><li>• Professional organizations</li></ul></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        <section id="healthcare" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Healthcare &amp; Life Sciences Grants</h2>
              <p className="text-gray-700 mb-6">The healthcare and life sciences sector receives significant grant funding through NIH, FDA, and private health foundations. These programs support medical device development, pharmaceutical research, digital health solutions, and clinical innovations that improve patient outcomes and advance medical science.</p>
              <Card className="border-pink-200"><CardContent className="pt-6"><div className="grid md:grid-cols-3 gap-4 mb-4"><div className="flex items-center"><Stethoscope className="w-5 h-5 text-pink-600 mr-2" /><span><strong>Range:</strong> $50K - $1M</span></div><div className="flex items-center"><Clock className="w-5 h-5 text-blue-600 mr-2" /><span><strong>Duration:</strong> 1-5 years</span></div><div className="flex items-center"><Target className="w-5 h-5 text-purple-600 mr-2" /><span><strong>Focus:</strong> R&amp;D Innovation</span></div></div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div><h3 className="font-bold mb-2 text-pink-700">Major Programs</h3><ul className="text-sm space-y-1"><li>• NIH SBIR/STTR grants</li><li>• FDA Orphan Products Development</li><li>• BARDA medical countermeasures</li><li>• CDC prevention research</li><li>• Private foundation health grants</li></ul></div>
                  <div><h3 className="font-bold mb-2 text-pink-700">Eligible Activities</h3><ul className="text-sm space-y-1"><li>• Medical device R&amp;D</li><li>• Drug discovery &amp; development</li><li>• Digital health solutions</li><li>• Clinical trials</li><li>• Healthcare delivery innovation</li></ul></div>
                </div></CardContent></Card>
            </div>
          </div>
        </section>

        <section id="manufacturing" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Manufacturing &amp; Industrial Grants</h2>
              <p className="text-gray-700 mb-6">Manufacturing grants support modernization, automation, workforce development, and supply chain resilience. The DOD ManTech program, NIST Manufacturing Extension Partnership, and state manufacturing incentives help manufacturers compete globally through advanced technologies and improved processes.</p>
              <Card className="border-orange-200"><CardContent className="pt-6"><div className="grid md:grid-cols-3 gap-4 mb-4"><div className="flex items-center"><Factory className="w-5 h-5 text-orange-600 mr-2" /><span><strong>Range:</strong> $25K - $500K</span></div><div className="flex items-center"><Clock className="w-5 h-5 text-blue-600 mr-2" /><span><strong>Duration:</strong> 1-3 years</span></div><div className="flex items-center"><Target className="w-5 h-5 text-purple-600 mr-2" /><span><strong>Focus:</strong> Modernization</span></div></div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div><h3 className="font-bold mb-2 text-orange-700">Key Programs</h3><ul className="text-sm space-y-1"><li>• DOD ManTech programs</li><li>• NIST Manufacturing Extension Partnership</li><li>• State manufacturing incentives</li><li>• Industry 4.0 initiatives</li><li>• Supply chain resilience grants</li></ul></div>
                  <div><h3 className="font-bold mb-2 text-orange-700">Funding Areas</h3><ul className="text-sm space-y-1"><li>• Advanced manufacturing R&amp;D</li><li>• Automation &amp; robotics</li><li>• Process improvements</li><li>• Quality systems</li><li>• Workforce development</li></ul></div>
                </div></CardContent></Card>
            </div>
          </div>
        </section>

        <section id="technology" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Technology &amp; Software Development Grants</h2>
              <p className="text-gray-700 mb-6">Technology companies can access significant funding through NSF and DOD SBIR programs, DHS cybersecurity innovation grants, and DOE advanced computing initiatives. These programs support artificial intelligence, cybersecurity, cloud computing, quantum technologies, and blockchain applications.</p>
              <Card className="border-blue-200"><CardContent className="pt-6"><div className="grid md:grid-cols-3 gap-4 mb-4"><div className="flex items-center"><Cpu className="w-5 h-5 text-blue-600 mr-2" /><span><strong>Range:</strong> $50K - $1.7M</span></div><div className="flex items-center"><Clock className="w-5 h-5 text-blue-600 mr-2" /><span><strong>Duration:</strong> 6mo - 2 years</span></div><div className="flex items-center"><Target className="w-5 h-5 text-purple-600 mr-2" /><span><strong>Focus:</strong> Innovation</span></div></div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div><h3 className="font-bold mb-2 text-blue-700">Major Sources</h3><ul className="text-sm space-y-1"><li>• NSF SBIR/STTR programs</li><li>• DOD technology development</li><li>• DHS cybersecurity innovation</li><li>• DOE advanced computing</li><li>• Private tech accelerators</li></ul></div>
                  <div><h3 className="font-bold mb-2 text-blue-700">Technology Areas</h3><ul className="text-sm space-y-1"><li>• Artificial intelligence &amp; ML</li><li>• Cybersecurity solutions</li><li>• Cloud &amp; edge computing</li><li>• Quantum technologies</li><li>• Blockchain applications</li></ul></div>
                </div></CardContent></Card>
            </div>
          </div>
        </section>

        <section id="agriculture" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Agriculture &amp; Food Systems Grants</h2>
              <p className="text-gray-700 mb-6">USDA offers extensive programs for agricultural innovation, food safety, sustainable farming, and rural business development. Value-Added Producer Grants, Specialty Crop Block Grants, and Rural Business Development Grants support farm-to-table innovations and agricultural technology advancement.</p>
              <Card className="border-green-200"><CardContent className="pt-6"><div className="grid md:grid-cols-3 gap-4 mb-4"><div className="flex items-center"><Wheat className="w-5 h-5 text-green-600 mr-2" /><span><strong>Range:</strong> $10K - $600K</span></div><div className="flex items-center"><Clock className="w-5 h-5 text-blue-600 mr-2" /><span><strong>Duration:</strong> 1-4 years</span></div><div className="flex items-center"><Target className="w-5 h-5 text-purple-600 mr-2" /><span><strong>Focus:</strong> Sustainability</span></div></div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div><h3 className="font-bold mb-2 text-green-700">USDA Programs</h3><ul className="text-sm space-y-1"><li>• SBIR Agriculture research</li><li>• Rural Business Development Grants</li><li>• Specialty Crop Block Grants</li><li>• Sustainable Agriculture Research</li><li>• Value-Added Producer Grants</li></ul></div>
                  <div><h3 className="font-bold mb-2 text-green-700">Focus Areas</h3><ul className="text-sm space-y-1"><li>• Precision agriculture</li><li>• Food safety technology</li><li>• Sustainable farming practices</li><li>• Agricultural biotechnology</li><li>• Farm-to-table innovations</li></ul></div>
                </div></CardContent></Card>
            </div>
          </div>
        </section>

        <section id="cleanenergy" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Clean Energy &amp; Environmental Grants</h2>
              <p className="text-gray-700 mb-6">The clean energy sector receives substantial federal support through DOE SBIR programs, EPA environmental innovation grants, and state renewable energy funds. These programs support solar, wind, energy storage, carbon capture, and water treatment technologies as the nation transitions to sustainable energy.</p>
              <Card className="border-emerald-200"><CardContent className="pt-6"><div className="grid md:grid-cols-3 gap-4 mb-4"><div className="flex items-center"><Beaker className="w-5 h-5 text-emerald-600 mr-2" /><span><strong>Range:</strong> $100K - $1.5M</span></div><div className="flex items-center"><Clock className="w-5 h-5 text-blue-600 mr-2" /><span><strong>Duration:</strong> 1-3 years</span></div><div className="flex items-center"><Target className="w-5 h-5 text-purple-600 mr-2" /><span><strong>Focus:</strong> Clean Tech</span></div></div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div><h3 className="font-bold mb-2 text-emerald-700">Major Programs</h3><ul className="text-sm space-y-1"><li>• DOE SBIR clean energy</li><li>• EPA environmental innovation</li><li>• NSF sustainable technology</li><li>• State renewable energy funds</li><li>• Private environmental grants</li></ul></div>
                  <div><h3 className="font-bold mb-2 text-emerald-700">Technology Areas</h3><ul className="text-sm space-y-1"><li>• Solar &amp; wind technology</li><li>• Energy storage systems</li><li>• Water treatment solutions</li><li>• Waste reduction technology</li><li>• Carbon capture &amp; storage</li></ul></div>
                </div></CardContent></Card>
            </div>
          </div>
        </section>

        <section id="defense" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Defense &amp; Aerospace Grants</h2>
              <p className="text-gray-700 mb-6">The Department of Defense is the largest funder of SBIR/STTR grants, providing over $1 billion annually to small businesses developing defense-relevant technologies. Programs span across Army, Navy, Air Force, DARPA, and other DoD components with focus areas including advanced materials, autonomous systems, cybersecurity, and space technologies.</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 bg-indigo-50 rounded-lg"><h3 className="font-bold mb-2 text-indigo-700">DOD SBIR Programs</h3><ul className="text-sm space-y-1"><li>• Army SBIR/STTR</li><li>• Navy SBIR/STTR</li><li>• Air Force SBIR/STTR</li><li>• DARPA programs</li><li>• DLA/Missile Defense</li></ul></div>
                <div className="p-4 bg-slate-50 rounded-lg"><h3 className="font-bold mb-2 text-slate-700">Key Requirements</h3><ul className="text-sm space-y-1"><li>• US-owned/operated business</li><li>• Security clearance potential</li><li>• Technical feasibility</li><li>• Commercialization plan</li><li>• Defense relevance</li></ul></div>
              </div>
            </div>
          </div>
        </section>

        <section id="eligibility" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Eligibility Requirements</h2>
              <p className="text-gray-700 mb-6">Industry grant eligibility varies by program and funding agency. SBIR/STTR programs require small business status (under 500 employees) and US ownership. Industry-specific programs may have additional requirements based on sector regulations, certifications, or technical capabilities.</p>
              <div className="grid md:grid-cols-2 gap-6">
                <Card><CardHeader><CardTitle className="text-green-700 flex items-center"><CheckCircle className="w-5 h-5 mr-2" />Common Requirements</CardTitle></CardHeader><CardContent><ul className="space-y-1 text-sm"><li>• Small business status (500 or fewer employees)</li><li>• US ownership and operation</li><li>• Principal investigator requirements</li><li>• Technical expertise in field</li><li>• Industry-relevant experience</li><li>• Commercialization capability</li></ul></CardContent></Card>
                <Card><CardHeader><CardTitle className="text-red-700 flex items-center"><AlertCircle className="w-5 h-5 mr-2" />Sector-Specific</CardTitle></CardHeader><CardContent><ul className="space-y-1 text-sm"><li>• FDA registration (healthcare)</li><li>• Security clearance (defense)</li><li>• Environmental permits (energy)</li><li>• Professional licenses required</li><li>• Industry certifications needed</li><li>• Regulatory compliance</li></ul></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        <section id="finding" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">How to Find Industry-Specific Grants</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center"><div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4"><span className="text-white font-bold text-xl">1</span></div><h4 className="font-bold text-lg mb-3">Trade Associations</h4><p className="text-sm text-gray-600">Check professional and trade associations in your industry for grant listings.</p></div>
                <div className="text-center"><div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4"><span className="text-white font-bold text-xl">2</span></div><h4 className="font-bold text-lg mb-3">Federal Agencies</h4><p className="text-sm text-gray-600">Research agencies that regulate or support your industry (NIH, DOE, USDA).</p></div>
                <div className="text-center"><div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4"><span className="text-white font-bold text-xl">3</span></div><h4 className="font-bold text-lg mb-3">SBIR.gov</h4><p className="text-sm text-gray-600">Search federal SBIR/STTR opportunities by topic area and agency.</p></div>
                <div className="text-center"><div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4"><span className="text-white font-bold text-xl">4</span></div><h4 className="font-bold text-lg mb-3">Industry Events</h4><p className="text-sm text-gray-600">Attend conferences and networking events to learn about sector opportunities.</p></div>
              </div>
            </div>
          </div>
        </section>

        <section id="mistakes" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Common Mistakes to Avoid</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Card><CardContent className="pt-6"><h3 className="font-bold text-red-600 mb-2">❌ Wrong Terminology</h3><p className="text-sm text-gray-600">Using incorrect industry terminology signals lack of expertise. Have industry peers review applications.</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold text-red-600 mb-2">❌ Missing Regulations</h3><p className="text-sm text-gray-600">Ignoring industry-specific regulations and compliance requirements dooms applications.</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold text-red-600 mb-2">❌ No Market Knowledge</h3><p className="text-sm text-gray-600">Failing to demonstrate understanding of your industry&apos;s market dynamics and trends.</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold text-red-600 mb-2">❌ Generic Approach</h3><p className="text-sm text-gray-600">One-size-fits-all applications don&apos;t work. Tailor each application to the specific agency and topic.</p></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        <section id="success" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Success Strategies</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div><h3 className="font-bold mb-3 text-green-700">✅ Best Practices</h3><ul className="space-y-2 text-sm"><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Demonstrate deep industry knowledge</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Show market need and commercialization path</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Include industry partnerships and letters</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Address sector-specific challenges directly</span></li></ul></div>
                <div><h3 className="font-bold mb-3 text-purple-700">🎯 Pro Tips</h3><ul className="space-y-2 text-sm"><li className="flex items-start"><Target className="w-4 h-4 text-purple-500 mr-2 mt-0.5" /><span>Use correct industry terminology and standards</span></li><li className="flex items-start"><Target className="w-4 h-4 text-purple-500 mr-2 mt-0.5" /><span>Reference relevant regulations in application</span></li><li className="flex items-start"><Target className="w-4 h-4 text-purple-500 mr-2 mt-0.5" /><span>Get industry leader letters of support</span></li><li className="flex items-start"><Target className="w-4 h-4 text-purple-500 mr-2 mt-0.5" /><span>Align with agency strategic priorities</span></li></ul></div>
              </div>
            </div>
          </div>
        </section>

        <section id="faqs" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <Card><CardContent className="pt-6"><h3 className="font-bold flex items-start"><HelpCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />How do I find grants for my specific industry?</h3><p className="text-gray-700 mt-2 ml-7">Start with SBIR.gov and filter by your technology area. Check with your industry association and relevant federal agencies. Our industry-specific guides list major programs.</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold flex items-start"><HelpCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />Do I need industry experience to apply?</h3><p className="text-gray-700 mt-2 ml-7">Yes—reviewers evaluate your team&apos;s qualifications. Having industry-experienced personnel or advisors significantly improves your credibility and success rate.</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold flex items-start"><HelpCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />Can startups apply for industry grants?</h3><p className="text-gray-700 mt-2 ml-7">Yes! SBIR/STTR is designed for small companies including startups. However, you need a credible team, feasible technology, and commercialization plan.</p></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Related Guides</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/blog/sbir-sttr-complete-guide" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-blue-600 mr-3" /><span>SBIR/STTR Complete Guide</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/blog/small-business-grants-complete-guide" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-blue-600 mr-3" /><span>Small Business Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/blog/state-local-business-grants-guide" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-blue-600 mr-3" /><span>State &amp; Local Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/usa" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-blue-600 mr-3" /><span>State-by-State Guides</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-r from-teal-600 to-cyan-700">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-6">Find Your Industry Grants</h2>
              <p className="text-xl text-teal-100 mb-8">Get expert help identifying and applying for grants in your specific industry sector. Our team has helped businesses across all major industries secure funding.</p>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild><Link href="/contact?service=industry-grants">Get Industry Grant Help</Link></Button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
