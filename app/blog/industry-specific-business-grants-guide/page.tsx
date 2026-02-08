import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Clock, DollarSign, Target, CheckCircle, AlertCircle, Factory, Stethoscope, Cpu, Wheat, Beaker, BookOpen, HelpCircle, ChevronRight, Building2, FileText } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Industry-Specific Business Grants Guide 2026 | Sector-Focused Funding Programs",
  description: "Complete guide to industry-specific business grants. Find targeted funding for manufacturing, healthcare, technology, agriculture, clean energy, and specialized sectors.",
  keywords: "industry specific grants, sector grants, manufacturing grants, healthcare grants, technology grants, agriculture grants, clean energy grants",
}

export default function IndustrySpecificBusinessGrantsGuide() {
  const faqData = [
    {
      question: "What industries have the most grant funding available?",
      answer: "Healthcare/life sciences (NIH ~$900M/year), defense/aerospace (DOD ~$1.8B/year), clean energy (DOE ~$350M/year), and agriculture (USDA ~$150M/year) have the largest SBIR allocations. Manufacturing, technology, and environmental sectors also receive substantial funding through multiple agencies."
    },
    {
      question: "How do I find grants for my specific industry?",
      answer: "Start with SBIR.gov and filter by your technology area. Check with your industry association and relevant federal agencies. Our industry-specific guides list major programs."
    },
    {
      question: "Do I need industry experience to apply for sector-specific grants?",
      answer: "Yes—reviewers evaluate your team's qualifications. Having industry-experienced personnel or advisors significantly improves your credibility and success rate."
    },
    {
      question: "Can startups apply for industry grants?",
      answer: "Yes! SBIR/STTR is designed for small companies including startups. However, you need a credible team, feasible technology, and commercialization plan."
    },
    {
      question: "What are the biggest industry-specific grant programs in 2026?",
      answer: "NIH SBIR for healthcare/biotech, DOD SBIR for defense technology, NSF SBIR for general technology innovation, DOE SBIR for energy, and USDA SBIR for agriculture. Each agency has multiple topic areas within their SBIR programs targeting specific industry challenges."
    },
    {
      question: "Are there grants for manufacturing businesses?",
      answer: "Yes. Manufacturing grants include DOD ManTech programs, NIST Manufacturing Extension Partnership funding, state manufacturing incentives, and SBIR topics focused on advanced manufacturing, automation, and Industry 4.0 technologies."
    },
    {
      question: "How do I apply for healthcare and biotech grants?",
      answer: "NIH SBIR is the primary source. Start at grants.nih.gov to find relevant Funding Opportunity Announcements (FOAs). NIH uses rigorous peer review, so ensure your scientific approach is sound and your team has relevant credentials. FDA also offers Orphan Products Development grants for rare diseases."
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

        <section id="hospitality" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Hospitality &amp; Tourism Grants</h2>
              <p className="text-gray-700 mb-6">While federal R&D grants rarely target hotels or restaurants, state and local economic development agencies heavily invest in tourism. Grants often focus on facade improvements, workforce training, and tourism marketing.</p>
              <Card className="border-rose-200"><CardContent className="pt-6"><div className="grid md:grid-cols-3 gap-4 mb-4"><div className="flex items-center"><Building2 className="w-5 h-5 text-rose-600 mr-2" /><span><strong>Range:</strong> $5K - $50K</span></div><div className="flex items-center"><Clock className="w-5 h-5 text-blue-600 mr-2" /><span><strong>Duration:</strong> One-time</span></div><div className="flex items-center"><Target className="w-5 h-5 text-purple-600 mr-2" /><span><strong>Focus:</strong> Growth</span></div></div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div><h3 className="font-bold mb-2 text-rose-700">Common Programs</h3><ul className="text-sm space-y-1"><li>• Destination Marketing Grants</li><li>• Facade Improvement Programs</li><li>• Workforce Training Grants</li><li>• Energy Efficiency Rebates</li><li>• Digital Adoption Grants</li></ul></div>
                  <div><h3 className="font-bold mb-2 text-rose-700">Eligible Businesses</h3><ul className="text-sm space-y-1"><li>• Hotels &amp; Motels</li><li>• Restaurants &amp; Cafes</li><li>• Tour Operators</li><li>• Event Venues</li><li>• Cultural Attractions</li></ul></div>
                </div></CardContent></Card>
            </div>
          </div>
        </section>

        <section id="construction" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Construction &amp; Trades Grants</h2>
              <p className="text-gray-700 mb-6">Funding in the construction sector typically targets workforce development (apprenticeships), green building technologies, and affordable housing development. Federal and state agencies incentivize training new tradespeople and adopting sustainable materials.</p>
              <Card className="border-yellow-200"><CardContent className="pt-6"><div className="grid md:grid-cols-3 gap-4 mb-4"><div className="flex items-center"><Factory className="w-5 h-5 text-yellow-600 mr-2" /><span><strong>Range:</strong> $10K - $250K</span></div><div className="flex items-center"><Clock className="w-5 h-5 text-blue-600 mr-2" /><span><strong>Duration:</strong> 1-3 years</span></div><div className="flex items-center"><Target className="w-5 h-5 text-purple-600 mr-2" /><span><strong>Focus:</strong> Training</span></div></div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div><h3 className="font-bold mb-2 text-yellow-700">Funding Types</h3><ul className="text-sm space-y-1"><li>• Apprenticeship Incentives</li><li>• Green Building Grants</li><li>• Brownfield Remediation</li><li>• Rural Housing Development</li><li>• Equipment Upgrades (Clean Diesel)</li></ul></div>
                  <div><h3 className="font-bold mb-2 text-yellow-700">Key Agencies</h3><ul className="text-sm space-y-1"><li>• Dept. of Labor (Apprenticeships)</li><li>• EPA (Brownfields/Diesel)</li><li>• USDA (Rural Housing)</li><li>• HUD (Affordable Housing)</li><li>• State Energy Offices</li></ul></div>
                </div></CardContent></Card>
            </div>
          </div>
        </section>

        <section id="retail" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Retail &amp; E-commerce Grants</h2>
              <p className="text-gray-700 mb-6">Retail grants are almost exclusively found at the local (city/county) level or through corporate programs. Main Street programs support physical storefronts, while digital adoption grants help brick-and-mortar stores move online.</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-cyan-50 rounded-lg border border-cyan-100">
                  <h3 className="font-bold text-cyan-800 mb-3">Main Street Grants</h3>
                  <p className="text-sm text-gray-600 mb-4">Local grants to revitalize downtowns. Funds can be used for signage, painting, awnings, and interior renovations.</p>
                  <p className="text-xs font-bold text-cyan-600 uppercase">Avg: $5,000 - $25,000</p>
                </div>
                <div className="p-6 bg-blue-50 rounded-lg border border-blue-100">
                  <h3 className="font-bold text-blue-800 mb-3">Digital Transformation</h3>
                  <p className="text-sm text-gray-600 mb-4">Programs like Canada's CDAP or local US equivalents help retailers build e-commerce websites and improve SEO.</p>
                  <p className="text-xs font-bold text-blue-600 uppercase">Avg: $2,400 - $15,000</p>
                </div>
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
              <h2 className="text-3xl font-bold mb-6">How to Find Hidden Industry Grants</h2>
              <p className="text-gray-700 mb-8">Most "general" grant searches fail because they are too broad. Expert grant writers use <strong>Boolean Search Strings</strong> to find buried industry-specific Opportunities. Here is how to do it on Google and Grants.gov:</p>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-12">
                <div className="bg-teal-900 text-white p-6">
                  <h3 className="text-xl font-bold flex items-center"><Target className="w-6 h-6 mr-3" /> The "Secret" Search Formulas</h3>
                  <p className="text-teal-100 mt-2">Copy-paste these strings into Google to find programs others miss.</p>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">For Manufacturing:</h4>
                    <div className="bg-gray-100 p-3 rounded font-mono text-sm text-blue-800">
                      (grant OR "funding opportunity") AND (manufacturing OR "supply chain" OR automation) AND (site:.gov OR site:.org) -scholarship
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">For Tech/SaaS:</h4>
                    <div className="bg-gray-100 p-3 rounded font-mono text-sm text-blue-800">
                      "request for proposals" AND (software OR "artificial intelligence" OR SaaS) AND ("economic development" OR accelerator) AND 2026
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">For Healthcare:</h4>
                    <div className="bg-gray-100 p-3 rounded font-mono text-sm text-blue-800">
                      (grant OR cooperative agreement) AND ("rural health" OR telemedicine OR "medical device") AND eligibility "small business"
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center"><div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4"><span className="text-white font-bold text-xl">1</span></div><h4 className="font-bold text-lg mb-3">Trade Associations</h4><p className="text-sm text-gray-600">Check professional and trade associations like NAM (Manufacturing) or HIMSS (Healthcare).</p></div>
                <div className="text-center"><div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4"><span className="text-white font-bold text-xl">2</span></div><h4 className="font-bold text-lg mb-3">Federal Agencies</h4><p className="text-sm text-gray-600">Don't just look at SBA. Look at DOE, USDA, DOT, and EPA specific pages.</p></div>
                <div className="text-center"><div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4"><span className="text-white font-bold text-xl">3</span></div><h4 className="font-bold text-lg mb-3">SBIR.gov</h4><p className="text-sm text-gray-600">The "Topic Search" feature is powerful. Filter by your specific niche keyword.</p></div>
                <div className="text-center"><div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4"><span className="text-white font-bold text-xl">4</span></div><h4 className="font-bold text-lg mb-3">Suppliers</h4><p className="text-sm text-gray-600">Big corporate suppliers (e.g., Cisco, John Deere) often have grant programs for their ecosystem.</p></div>
              </div>
            </div>
          </div>
        </section>

        <section id="naics" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">The NAICS Code Cheat Sheet</h2>
              <p className="text-gray-700 mb-8">
                Government grants often use North American Industry Classification System (NAICS) codes to determine eligibility. If you don't know your code, you might be excluded from the search results.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full bg-white shadow-lg rounded-xl overflow-hidden border">
                  <thead className="bg-teal-900 text-white">
                    <tr>
                      <th className="p-4 text-left">Industry</th>
                      <th className="p-4 text-left">Common NAICS Codes</th>
                      <th className="p-4 text-left">Why It Matters</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-teal-50 transition-colors">
                      <td className="p-4 font-bold">Software &amp; IT</td>
                      <td className="p-4 font-mono text-sm text-blue-600">541511 (Custom Programming)<br />511210 (Software Publishers)<br />541512 (Systems Design)</td>
                      <td className="p-4 text-sm">Required for many NSF and DOD SBIR topics.</td>
                    </tr>
                    <tr className="hover:bg-teal-50 transition-colors">
                      <td className="p-4 font-bold">R&amp;D Services</td>
                      <td className="p-4 font-mono text-sm text-blue-600">541715 (Phys/Eng/Life Sciences)<br />541714 (Biotech R&amp;D)<br />541713 (Nanotech R&amp;D)</td>
                      <td className="p-4 text-sm">Crucial for claiming R&amp;D Tax Credits and NIH grants.</td>
                    </tr>
                    <tr className="hover:bg-teal-50 transition-colors">
                      <td className="p-4 font-bold">Manufacturing</td>
                      <td className="p-4 font-mono text-sm text-blue-600">31-33 (General Mfg)<br />334413 (Semiconductors)<br />336411 (Aircraft Mfg)</td>
                      <td className="p-4 text-sm">Needed for MEP funding and supply chain grants.</td>
                    </tr>
                    <tr className="hover:bg-teal-50 transition-colors">
                      <td className="p-4 font-bold">Agriculture</td>
                      <td className="p-4 font-mono text-sm text-blue-600">111 (Crop Production)<br />112 (Animal Production)<br />115114 (Post-Harvest)</td>
                      <td className="p-4 text-sm">Essential for USDA and Rural Development grants.</td>
                    </tr>
                    <tr className="hover:bg-teal-50 transition-colors">
                      <td className="p-4 font-bold">Construction</td>
                      <td className="p-4 font-mono text-sm text-blue-600">236 (Building)<br />237 (Heavy/Civil)<br />238 (Specialty Trade)</td>
                      <td className="p-4 text-sm">Used for infrastructure act bidding and training grants.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section id="resources" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Industry Resource Hub</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader><CardTitle className="text-lg">Technology</CardTitle></CardHeader>
                  <CardContent className="text-sm space-y-2">
                    <p><a href="https://seedfund.nsf.gov/" target="_blank" className="text-blue-600 hover:underline flex items-center">NSF Seed Fund <ExternalLink className="w-3 h-3 ml-1" /></a></p>
                    <p><a href="https://www.sbir.gov/" target="_blank" className="text-blue-600 hover:underline flex items-center">SBIR.gov <ExternalLink className="w-3 h-3 ml-1" /></a></p>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader><CardTitle className="text-lg">Healthcare</CardTitle></CardHeader>
                  <CardContent className="text-sm space-y-2">
                    <p><a href="https://seed.nih.gov/" target="_blank" className="text-blue-600 hover:underline flex items-center">NIH SEED <ExternalLink className="w-3 h-3 ml-1" /></a></p>
                    <p><a href="https://www.bio.org/" target="_blank" className="text-blue-600 hover:underline flex items-center">BIO Association <ExternalLink className="w-3 h-3 ml-1" /></a></p>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader><CardTitle className="text-lg">Manufacturing</CardTitle></CardHeader>
                  <CardContent className="text-sm space-y-2">
                    <p><a href="https://www.nist.gov/mep" target="_blank" className="text-blue-600 hover:underline flex items-center">NIST MEP <ExternalLink className="w-3 h-3 ml-1" /></a></p>
                    <p><a href="https://www.nam.org/" target="_blank" className="text-blue-600 hover:underline flex items-center">NAM <ExternalLink className="w-3 h-3 ml-1" /></a></p>
                  </CardContent>
                </Card>
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

        <section id="readiness" className="py-16 bg-blue-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Are You "Grant Ready"?</h2>
              <p className="text-gray-700 mb-6">
                Most applications fail not because the idea is bad, but because the business paperwork is disorganized. Reviewers look for these red flags immediately.
              </p>

              <div className="bg-white p-8 rounded-xl shadow-sm border border-blue-100">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-bold text-lg mb-4 flex items-center"><FileText className="w-5 h-5 text-blue-600 mr-2" /> Essential Documents</h3>
                    <ul className="space-y-3 text-sm text-gray-700">
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" /> <strong>Capability Statement:</strong> A 1-page resume for your business. Crucial for government contracts.</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" /> <strong>3 Years of Financials:</strong> Balance sheets and P&amp;L statements. They prove you are solvent.</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" /> <strong>Resumes/Bios:</strong> For all Key Personnel. Show you have the team to execute.</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" /> <strong>Letter of Support:</strong> From a potential customer or industry partner saying they want your product.</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-4 flex items-center"><Building2 className="w-5 h-5 text-blue-600 mr-2" /> System Registrations</h3>
                    <ul className="space-y-3 text-sm text-gray-700">
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" /> <strong>SAM.gov (UEI):</strong> Active registration is mandatory for federal funds.</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" /> <strong>Grants.gov Workspace:</strong> Where you actually submit the forms.</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" /> <strong>SBA Dynamic Small Business Search:</strong> Ensure your profile is updated so agencies can find you.</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" /> <strong>State Vendor Portal:</strong> Register with your state&apos;s procurement system.</li>
                    </ul>
                  </div>
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
              <h2 className="text-3xl font-bold mb-6">State Grant Programs by Region</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <Link href="/usa/california" className="flex items-center p-4 bg-white rounded-lg border hover:border-teal-500 transition-all"><Building2 className="w-5 h-5 text-blue-600 mr-3" /><span>California Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/usa/texas" className="flex items-center p-4 bg-white rounded-lg border hover:border-teal-500 transition-all"><Building2 className="w-5 h-5 text-red-600 mr-3" /><span>Texas Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/usa/new-york" className="flex items-center p-4 bg-white rounded-lg border hover:border-teal-500 transition-all"><Building2 className="w-5 h-5 text-purple-600 mr-3" /><span>New York Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/blog/ontario-government-business-grants" className="flex items-center p-4 bg-white rounded-lg border hover:border-teal-500 transition-all"><Building2 className="w-5 h-5 text-red-500 mr-3" /><span>Ontario Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/blog/alberta-government-business-grants" className="flex items-center p-4 bg-white rounded-lg border hover:border-teal-500 transition-all"><Building2 className="w-5 h-5 text-blue-500 mr-3" /><span>Alberta Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
              </div>
              <h3 className="text-xl font-bold mb-4">Related Funding Guides</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/blog/sbir-sttr-complete-guide" className="flex items-center p-4 bg-white rounded-lg border hover:border-teal-500 transition-all"><BookOpen className="w-5 h-5 text-green-600 mr-3" /><span>SBIR/STTR Complete Guide</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/blog/small-business-grants-complete-guide" className="flex items-center p-4 bg-white rounded-lg border hover:border-teal-500 transition-all"><BookOpen className="w-5 h-5 text-green-600 mr-3" /><span>Small Business Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
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
