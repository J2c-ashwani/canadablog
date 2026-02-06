import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, DollarSign, Target, AlertCircle, Building, Users, FileText, BookOpen, ExternalLink, HelpCircle, ChevronRight, Award, Briefcase, Shield } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "USA Federal Business Grants 2026 | Complete Guide to Federal Funding Programs",
  description: "Comprehensive guide to USA federal business grants including SBIR, STTR, SBA programs, minority grants, women-owned business grants, and state-specific funding opportunities.",
  keywords: "federal business grants USA, federal funding programs, SBIR grants, STTR grants, SBA grants, government grants for small business",
}

export default function USAFederalGrantsPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-br from-blue-800 to-indigo-900 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30"><Shield className="w-3 h-3 mr-1" /> Federal Programs</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">USA Federal Business Grants Guide 2026</h1>
              <p className="text-xl text-blue-100 mb-8">Complete guide to federal funding programs for American businesses. Access SBIR, STTR, SBA programs, and agency-specific grants totaling over $50 billion annually.</p>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild><Link href="/usa">Browse All USA Programs</Link></Button>
            </div>
          </div>
        </section>

        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <nav className="p-6 bg-gray-50 rounded-xl">
                <h2 className="text-lg font-bold mb-4">In This Guide</h2>
                <ul className="grid md:grid-cols-2 gap-2 text-sm">
                  <li><a href="#overview" className="text-blue-700 hover:underline">1. Federal Grants Overview</a></li>
                  <li><a href="#sbir" className="text-blue-700 hover:underline">2. SBIR/STTR Programs</a></li>
                  <li><a href="#sba" className="text-blue-700 hover:underline">3. SBA Programs</a></li>
                  <li><a href="#agencies" className="text-blue-700 hover:underline">4. Federal Agencies</a></li>
                  <li><a href="#women" className="text-blue-700 hover:underline">5. Women-Owned Business</a></li>
                  <li><a href="#minority" className="text-blue-700 hover:underline">6. Minority Programs</a></li>
                  <li><a href="#veteran" className="text-blue-700 hover:underline">7. Veteran Programs</a></li>
                  <li><a href="#states" className="text-blue-700 hover:underline">8. State Programs</a></li>
                  <li><a href="#eligibility" className="text-blue-700 hover:underline">9. Eligibility</a></li>
                  <li><a href="#application" className="text-blue-700 hover:underline">10. Application Process</a></li>
                  <li><a href="#mistakes" className="text-blue-700 hover:underline">11. Common Mistakes</a></li>
                  <li><a href="#faqs" className="text-blue-700 hover:underline">12. FAQs</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto grid md:grid-cols-4 gap-8 text-center">
              <div><div className="text-3xl font-bold text-blue-600 mb-2">$50B+</div><div className="text-gray-600">Annual Federal Grants</div></div>
              <div><div className="text-3xl font-bold text-green-600 mb-2">11</div><div className="text-gray-600">SBIR Agencies</div></div>
              <div><div className="text-3xl font-bold text-purple-600 mb-2">$1.7M</div><div className="text-gray-600">Max SBIR Phase II</div></div>
              <div><div className="text-3xl font-bold text-orange-600 mb-2">50</div><div className="text-gray-600">States with Programs</div></div>
            </div>
          </div>
        </section>

        <section id="overview" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Federal Business Grants Overview</h2>
              <p className="text-gray-700 leading-relaxed mb-6">The United States federal government provides over $50 billion annually in grants, loans, and other financial assistance to small businesses. These programs are administered by various federal agencies, each focusing on different industries, technologies, and business types.</p>
              <p className="text-gray-700 leading-relaxed mb-6">Federal grants differ from loans—they don&apos;t need to be repaid. However, they come with strict eligibility requirements, competitive application processes, and compliance obligations. The most accessible programs for small businesses include SBIR/STTR grants, SBA programs, and agency-specific initiatives.</p>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-blue-200"><CardHeader><CardTitle className="text-blue-700">Grant Programs</CardTitle></CardHeader><CardContent><ul className="text-sm space-y-2"><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>SBIR/STTR research grants</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Agency-specific R&amp;D funding</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Economic development grants</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Minority/women business programs</span></li></ul></CardContent></Card>
                <Card className="border-green-200"><CardHeader><CardTitle className="text-green-700">Loan Programs</CardTitle></CardHeader><CardContent><ul className="text-sm space-y-2"><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>SBA 7(a) business loans</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>SBA 504 real estate loans</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>SBA Microloans</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Disaster assistance loans</span></li></ul></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        <section id="sbir" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">SBIR/STTR Programs</h2>
              <p className="text-gray-700 mb-6">The Small Business Innovation Research (SBIR) and Small Business Technology Transfer (STTR) programs are America&apos;s largest source of early-stage technology funding for small businesses. Eleven federal agencies participate, providing over $4 billion annually to innovative companies.</p>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <Card className="border-blue-200"><CardContent className="pt-6"><h3 className="font-bold text-blue-700 mb-3">SBIR Program</h3><ul className="text-sm space-y-1"><li><strong>Phase I:</strong> $50K-$275K (feasibility)</li><li><strong>Phase II:</strong> Up to $1.7M (development)</li><li><strong>Phase III:</strong> Commercialization (non-SBIR funds)</li><li><strong>Requirements:</strong> US-owned, &lt;500 employees</li></ul></CardContent></Card>
                <Card className="border-green-200"><CardContent className="pt-6"><h3 className="font-bold text-green-700 mb-3">STTR Program</h3><ul className="text-sm space-y-1"><li><strong>Phase I:</strong> $50K-$275K (feasibility)</li><li><strong>Phase II:</strong> Up to $1.7M (development)</li><li><strong>Difference:</strong> Requires research institution partner</li><li><strong>Split:</strong> 40% minimum to small business</li></ul></CardContent></Card>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg"><h3 className="font-bold mb-3">Participating Agencies</h3><div className="grid md:grid-cols-3 gap-2 text-sm"><div>• DOD (largest funder)</div><div>• NIH</div><div>• DOE</div><div>• NSF</div><div>• NASA</div><div>• USDA</div><div>• EPA</div><div>• DHS</div><div>• DOT</div></div></div>
            </div>
          </div>
        </section>

        <section id="sba" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">SBA Programs</h2>
              <p className="text-gray-700 mb-6">The Small Business Administration offers loan guarantees, counseling, and contracting assistance. While SBA doesn&apos;t provide direct grants (except disaster relief), their loan guarantee programs make it easier for small businesses to access capital from private lenders.</p>
              <div className="grid md:grid-cols-3 gap-4">
                <Card><CardContent className="pt-6"><h3 className="font-bold text-blue-700 mb-2">7(a) Loans</h3><p className="text-sm text-gray-600 mb-2">Up to $5M for working capital, equipment, real estate</p><Link href="/blog/sba-7a-loans-complete-guide" className="text-blue-600 text-sm hover:underline">Learn More →</Link></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold text-green-700 mb-2">504 Loans</h3><p className="text-sm text-gray-600 mb-2">Long-term fixed-rate financing for real estate and equipment</p><Link href="/blog/sba-loans-grants-guide" className="text-blue-600 text-sm hover:underline">Learn More →</Link></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold text-purple-700 mb-2">Microloans</h3><p className="text-sm text-gray-600 mb-2">Up to $50K for startups and small businesses</p><Link href="/blog/sba-microloans-complete-guide" className="text-blue-600 text-sm hover:underline">Learn More →</Link></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        <section id="agencies" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Federal Agency Programs</h2>
              <p className="text-gray-700 mb-6">Beyond SBIR/STTR, individual federal agencies offer grant and contract opportunities in their focus areas. Understanding which agencies align with your business can help you identify funding sources.</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg"><h3 className="font-bold mb-2">Department of Defense (DOD)</h3><p className="text-sm text-gray-600">Defense technology, cybersecurity, advanced materials, autonomous systems</p></div>
                <div className="p-4 bg-gray-50 rounded-lg"><h3 className="font-bold mb-2">National Institutes of Health (NIH)</h3><p className="text-sm text-gray-600">Healthcare, medical devices, pharmaceuticals, biotech</p></div>
                <div className="p-4 bg-gray-50 rounded-lg"><h3 className="font-bold mb-2">Department of Energy (DOE)</h3><p className="text-sm text-gray-600">Clean energy, advanced manufacturing, energy efficiency</p></div>
                <div className="p-4 bg-gray-50 rounded-lg"><h3 className="font-bold mb-2">National Science Foundation (NSF)</h3><p className="text-sm text-gray-600">Fundamental research, deep tech, AI/ML, quantum computing</p></div>
                <div className="p-4 bg-gray-50 rounded-lg"><h3 className="font-bold mb-2">USDA</h3><p className="text-sm text-gray-600">Agriculture, food systems, rural development</p></div>
                <div className="p-4 bg-gray-50 rounded-lg"><h3 className="font-bold mb-2">NASA</h3><p className="text-sm text-gray-600">Aerospace, space technology, satellite systems</p></div>
              </div>
            </div>
          </div>
        </section>

        <section id="women" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Women-Owned Business Programs</h2>
              <p className="text-gray-700 mb-6">The federal government has set-aside contracting goals for women-owned small businesses. Certification as a WOSB or EDWOSB opens access to billions in sole-source and set-aside contracts.</p>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-pink-200"><CardContent className="pt-6"><h3 className="font-bold text-pink-700 mb-2">WOSB Program</h3><p className="text-sm text-gray-600 mb-3">Women-Owned Small Business Federal Contracting Program provides access to set-aside contracts in designated industries.</p><Link href="/blog/federal-grants-women-minorities" className="text-blue-600 text-sm hover:underline">Full WOSB Guide →</Link></CardContent></Card>
                <Card className="border-purple-200"><CardContent className="pt-6"><h3 className="font-bold text-purple-700 mb-2">EDWOSB Program</h3><p className="text-sm text-gray-600 mb-3">Economically Disadvantaged Women-Owned Small Business certification for additional contract opportunities.</p><Link href="/blog/wosb-federal-contracting-guide" className="text-blue-600 text-sm hover:underline">EDWOSB Guide →</Link></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        <section id="minority" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Minority Business Programs</h2>
              <p className="text-gray-700 mb-6">SBA&apos;s 8(a) Business Development Program and HUBZone program provide contracting preferences and business development assistance to socially and economically disadvantaged businesses.</p>
              <div className="grid md:grid-cols-2 gap-6">
                <Card><CardContent className="pt-6"><h3 className="font-bold text-blue-700 mb-2">8(a) Program</h3><p className="text-sm text-gray-600">9-year business development program with mentoring, training, and sole-source contract access.</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold text-green-700 mb-2">HUBZone Program</h3><p className="text-sm text-gray-600">Preferences for businesses in historically underutilized business zones.</p></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        <section id="veteran" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Veteran Business Programs</h2>
              <p className="text-gray-700 mb-6">Service-Disabled Veteran-Owned Small Business (SDVOSB) and Veteran-Owned Small Business (VOSB) certifications provide enhanced access to federal contracting opportunities.</p>
              <div className="bg-green-50 p-6 rounded-lg"><h3 className="font-bold mb-3">SDVOSB Benefits</h3><ul className="grid md:grid-cols-2 gap-2 text-sm"><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Sole-source contracts up to $5M</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>3% federal contracting goal</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Set-aside competitions</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>VA priority contracting</span></li></ul></div>
            </div>
          </div>
        </section>

        <section id="states" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">State-Level Programs</h2>
              <p className="text-gray-700 mb-6">All 50 states offer their own grant, loan, and incentive programs that complement federal funding. State programs often have less competition and more accessible requirements for local businesses.</p>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <Link href="/usa/california" className="p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors"><h3 className="font-bold">California</h3><p className="text-sm text-gray-600">CalCompetes, innovation grants</p></Link>
                <Link href="/usa/texas" className="p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors"><h3 className="font-bold">Texas</h3><p className="text-sm text-gray-600">Enterprise Fund, job creation</p></Link>
                <Link href="/usa/new-york" className="p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors"><h3 className="font-bold">New York</h3><p className="text-sm text-gray-600">Excelsior Jobs Program</p></Link>
              </div>
              <Button variant="outline" asChild><Link href="/usa">View All 50 State Guides →</Link></Button>
            </div>
          </div>
        </section>

        <section id="eligibility" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Eligibility Requirements</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card><CardHeader><CardTitle className="text-green-700 flex items-center"><CheckCircle className="w-5 h-5 mr-2" />General Requirements</CardTitle></CardHeader><CardContent><ul className="space-y-1 text-sm"><li>• For-profit US business</li><li>• Meet SBA size standards (&lt;500 employees typically)</li><li>• 51%+ US ownership</li><li>• Good standing with government</li><li>• Principal place of business in US</li></ul></CardContent></Card>
                <Card><CardHeader><CardTitle className="text-blue-700 flex items-center"><Award className="w-5 h-5 mr-2" />SBIR-Specific</CardTitle></CardHeader><CardContent><ul className="space-y-1 text-sm"><li>• Principal investigator primarily employed by applicant</li><li>• Majority US citizen/permanent resident employees</li><li>• Research performed in US</li><li>• Socially/economically disadvantaged preferences</li><li>• Women-owned preferences</li></ul></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        <section id="application" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Application Process</h2>
              <div className="space-y-4">
                <div className="flex items-start p-4 bg-gray-50 rounded-lg border"><div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">1</div><div><h3 className="font-bold">Register on SAM.gov</h3><p className="text-gray-600 text-sm">Required for all federal funding. Get your DUNS/UEI number and complete SAM registration.</p></div></div>
                <div className="flex items-start p-4 bg-gray-50 rounded-lg border"><div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">2</div><div><h3 className="font-bold">Identify Programs</h3><p className="text-gray-600 text-sm">Search SBIR.gov, Grants.gov, and agency websites for relevant opportunities.</p></div></div>
                <div className="flex items-start p-4 bg-gray-50 rounded-lg border"><div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">3</div><div><h3 className="font-bold">Prepare Application</h3><p className="text-gray-600 text-sm">Develop technical proposal, commercialization plan, and budget following agency guidelines.</p></div></div>
                <div className="flex items-start p-4 bg-gray-50 rounded-lg border"><div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">4</div><div><h3 className="font-bold">Submit Before Deadline</h3><p className="text-gray-600 text-sm">Federal deadlines are strict. Submit at least 48 hours early to avoid technical issues.</p></div></div>
              </div>
            </div>
          </div>
        </section>

        <section id="mistakes" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Common Mistakes to Avoid</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Card><CardContent className="pt-6"><h3 className="font-bold text-red-600 mb-2">❌ Late SAM Registration</h3><p className="text-sm text-gray-600">SAM.gov registration takes weeks. Start the process well before applying.</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold text-red-600 mb-2">❌ Wrong Program Fit</h3><p className="text-sm text-gray-600">Each agency has specific priorities. Match your technology to the right solicitation topics.</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold text-red-600 mb-2">❌ Weak Commercialization</h3><p className="text-sm text-gray-600">Federal grants now emphasize commercialization potential. Have a clear market path.</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold text-red-600 mb-2">❌ Missing Page Limits</h3><p className="text-sm text-gray-600">Exceeding page limits results in automatic rejection. Follow guidelines exactly.</p></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        <section id="faqs" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <Card><CardContent className="pt-6"><h3 className="font-bold flex items-start"><HelpCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />Do I have to repay federal grants?</h3><p className="text-gray-700 mt-2 ml-7">True grants don&apos;t require repayment. However, you must use funds as specified and may have reporting requirements. Loans (like SBA 7a) must be repaid.</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold flex items-start"><HelpCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />Can startups apply for federal grants?</h3><p className="text-gray-700 mt-2 ml-7">Yes! SBIR Phase I is specifically designed for early-stage companies. You need a viable concept and qualified team, but don&apos;t need revenue or significant track record.</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold flex items-start"><HelpCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />How competitive are federal grants?</h3><p className="text-gray-700 mt-2 ml-7">SBIR acceptance rates vary from 10-25% depending on agency and topic. Strong technical proposals with clear commercialization plans have the best success.</p></CardContent></Card>
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
                <Link href="/blog/sba-7a-loans-complete-guide" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-blue-600 mr-3" /><span>SBA 7(a) Loans Guide</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/blog/federal-grants-women-minorities" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-blue-600 mr-3" /><span>Women &amp; Minority Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/blog/state-local-business-grants-guide" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-blue-600 mr-3" /><span>State &amp; Local Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-r from-blue-800 to-indigo-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-6">Find Your Federal Funding</h2>
              <p className="text-xl text-blue-100 mb-8">Browse our comprehensive guides to federal grants, SBA programs, and state funding opportunities across all 50 states.</p>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild><Link href="/usa">Browse All USA Programs</Link></Button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
