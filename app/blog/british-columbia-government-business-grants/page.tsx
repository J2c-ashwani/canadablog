import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, FileText, Download, Shield, Award, Mountain, PieChart, TrendingUp, HelpCircle, Lightbulb, Zap, BookOpen, ExternalLink, Leaf, Film } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "British Columbia Government Business Grants 2026 | Complete BC Provincial Funding Guide",
  description: "Complete guide to British Columbia government business grants. Access Innovate BC, CleanBC, Creative BC, and PacifiCan funding programs for tech, clean energy, and creative industries.",
  keywords: "BC government grants, British Columbia business funding, Innovate BC grants, CleanBC funding, Creative BC, PacifiCan grants, Vancouver startup grants",
}

export default function BritishColumbiaGovernmentBusinessGrantsPage() {
  return (
    <>
      <Header />
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
              <div className="grid md:grid-cols-2 gap-6">
                <Card><CardHeader><CardTitle className="text-green-700 flex items-center"><CheckCircle className="w-5 h-5 mr-2" />General Requirements</CardTitle></CardHeader><CardContent><ul className="space-y-1 text-sm"><li>• Incorporated in BC or significant operations</li><li>• For-profit business entity</li><li>• Project benefits BC economy</li><li>• Matching funds often required</li><li>• Good standing with government</li></ul></CardContent></Card>
                <Card><CardHeader><CardTitle className="text-red-700 flex items-center"><AlertCircle className="w-5 h-5 mr-2" />Common Restrictions</CardTitle></CardHeader><CardContent><ul className="space-y-1 text-sm"><li>• No retail/hospitality for innovation programs</li><li>• IP ownership requirements (Innovate BC)</li><li>• Retroactive funding rarely allowed</li><li>• Must maintain BC operations</li><li>• Some exclude Metro Vancouver priority</li></ul></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        <section id="application" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">How do I apply for BC Funding?</h2>
              <div className="space-y-4">
                <div className="flex items-start p-4 bg-white rounded-lg border"><div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">1</div><div><h3 className="font-bold">Identify Right Program</h3><p className="text-gray-600 text-sm">Match your sector and stage to available programs. Innovate BC for tech, CleanBC for emissions, Creative BC for film.</p></div></div>
                <div className="flex items-start p-4 bg-white rounded-lg border"><div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">2</div><div><h3 className="font-bold">Pre-Application (If Required)</h3><p className="text-gray-600 text-sm">Many programs require or recommend pre-application calls. PacifiCan and Innovate BC both have intake processes.</p></div></div>
                <div className="flex items-start p-4 bg-white rounded-lg border"><div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">3</div><div><h3 className="font-bold">Prepare Application</h3><p className="text-gray-600 text-sm">Complete application with project plan, budget, team qualifications, and expected outcomes. Emphasize BC economic impact.</p></div></div>
                <div className="flex items-start p-4 bg-white rounded-lg border"><div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">4</div><div><h3 className="font-bold">Review &amp; Approval</h3><p className="text-gray-600 text-sm">Timeline varies from 4-8 weeks for smaller programs to 3-6 months for PacifiCan BSP.</p></div></div>
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

        <section id="faqs" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions about BC Grants</h2>
              <div className="space-y-4">
                <Card><CardContent className="pt-6"><h3 className="font-bold flex items-start"><HelpCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />What is the difference between Innovate BC and PacifiCan?</h3><p className="text-gray-700 mt-2 ml-7">Innovate BC is a provincial agency focusing on grants for early-stage R&amp;D and tech commercialization. PacifiCan is a federal agency focusing on interest-free loans for companies ready to scale up and export.</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold flex items-start"><HelpCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />Can I get BC funding if I am not in Vancouver?</h3><p className="text-gray-700 mt-2 ml-7">Yes! In fact, many programs like the Regional Innovation Ecosystems (RIE) prioritize businesses in regions like the Okanagan, Kootenays, and Northern BC to promote balanced economic growth.</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold flex items-start"><HelpCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />Are there grants for film production in BC?</h3><p className="text-gray-700 mt-2 ml-7">BC offers some of North America&apos;s most competitive film tax credits (28-35%+ of labour costs). These are crucial for the industry, but they are tax credits (paid after filing taxes), not upfront cash grants.</p></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Related Guides</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/blog/bc-small-business-grants-guide" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-blue-600 mr-3" /><span>BC Small Business Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/blog/irap-industrial-research-assistance-program" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-blue-600 mr-3" /><span>IRAP Program Guide</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/canada/government-grants" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-blue-600 mr-3" /><span>All Government Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/canada" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-blue-600 mr-3" /><span>Canadian Funding</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
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
      </div>
      <Footer />
    </>
  )
}
