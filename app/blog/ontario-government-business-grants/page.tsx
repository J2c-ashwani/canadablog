import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, DollarSign, Target, AlertCircle, Building, MapPin, HelpCircle, TrendingUp, BookOpen, ExternalLink, Factory, Film, Download, Users } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ontario Government Business Grants 2026 | Complete Provincial Funding Guide",
  description: "Complete guide to Ontario government business grants. Access Ontario Creates, NOHFC, SWODF, EODF, and Starter Company Plus for startups, manufacturers, and creative industries.",
  keywords: "Ontario government grants, Ontario business funding, NOHFC grants, SWODF, EODF, Ontario Creates, Starter Company Plus, FedDev Ontario",
}

export default function OntarioGovernmentBusinessGrantsPage() {
  return (
    <>
      <Header />
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
              <div className="grid md:grid-cols-2 gap-6">
                <Card><CardHeader><CardTitle className="text-green-700 flex items-center"><CheckCircle className="w-5 h-5 mr-2" />Requirements</CardTitle></CardHeader><CardContent><ul className="space-y-1 text-sm"><li>• Ontario-based operations</li><li>• For-profit business entity</li><li>• Job creation commitments</li><li>• Project within eligible region</li></ul></CardContent></Card>
                <Card><CardHeader><CardTitle className="text-red-700 flex items-center"><AlertCircle className="w-5 h-5 mr-2" />Restrictions</CardTitle></CardHeader><CardContent><ul className="space-y-1 text-sm"><li>• Regional funds require location</li><li>• Contractors don&apos;t count for jobs</li><li>• Retroactive costs rarely covered</li><li>• Must maintain Ontario operations</li></ul></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        <section id="application" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">How do I apply for Ontario Grants?</h2>
              <div className="space-y-4">
                <div className="flex items-start p-4 bg-white rounded-lg border"><div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">1</div><div><h3 className="font-bold">Identify Your Region</h3><p className="text-gray-600 text-sm">Determine if you&apos;re in Northern, Eastern, Southwestern, or Southern Ontario.</p></div></div>
                <div className="flex items-start p-4 bg-white rounded-lg border"><div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">2</div><div><h3 className="font-bold">Pre-Application Consultation</h3><p className="text-gray-600 text-sm">Most programs require pre-application calls to assess fit.</p></div></div>
                <div className="flex items-start p-4 bg-white rounded-lg border"><div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">3</div><div><h3 className="font-bold">Build Job Creation Plan</h3><p className="text-gray-600 text-sm">Prepare detailed hiring plans with timelines and FTE targets.</p></div></div>
                <div className="flex items-start p-4 bg-white rounded-lg border"><div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">4</div><div><h3 className="font-bold">Submit &amp; Negotiate</h3><p className="text-gray-600 text-sm">Review timelines vary from 4 weeks to 3-6 months.</p></div></div>
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

        <section id="faqs" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions about Ontario Grants</h2>
              <div className="space-y-4">
                <Card><CardContent className="pt-6"><h3 className="font-bold flex items-start"><HelpCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />What is the difference between provincial and federal funding?</h3><p className="text-gray-700 mt-2 ml-7">Provincial funds (like NOHFC) focus on local job creation and economic development within Ontario. Federal funds (like FedDev Ontario or ISED) focus on broader national goals like productivity, innovation, and export scale-up.</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold flex items-start"><HelpCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />Are Ontario Creates tax credits better than grants?</h3><p className="text-gray-700 mt-2 ml-7">Often yes for digital media and film. Tax credits of 35-45% on labour costs are entitlement-based (if you qualify, you get it), whereas grants are competitive and uncertain.</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold flex items-start"><HelpCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />How many jobs do I need to create to get funding?</h3><p className="text-gray-700 mt-2 ml-7">Regional development funds typically require creating 5-10 permanent full-time jobs for larger grants ($500k+). Smaller programs like Starter Company Plus do not have strict job creation quotas but require self-employment.</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold flex items-start"><HelpCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />Can I apply for both provincial and federal grants?</h3><p className="text-gray-700 mt-2 ml-7">Yes, this is called "stacking." However, you generally cannot cover more than 75% of total project costs with government funds. You must disclose all funding sources in your application.</p></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Related Guides</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/blog/ontario-small-business-grants-guide" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-blue-600 mr-3" /><span>Ontario Small Business Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/blog/irap-industrial-research-assistance-program" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-blue-600 mr-3" /><span>IRAP Program Guide</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/canada/government-grants" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-blue-600 mr-3" /><span>All Government Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/canada" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-blue-600 mr-3" /><span>Canadian Funding</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
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
