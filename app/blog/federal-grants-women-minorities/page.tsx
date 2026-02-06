import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, DollarSign, Target, Clock, ChevronRight, ExternalLink, BookOpen, HelpCircle, Users, Heart, Shield } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Federal Grants for Women, Minorities & Veterans 2026 | Complete Certification Guide",
  description: "Comprehensive guide to federal grants for women-owned, minority-owned, and veteran-owned businesses. WOSB, 8(a), HUBZone, VOSB programs explained.",
  keywords: "women business grants, minority business grants, veteran business grants, WOSB, 8a program, HUBZone, VOSB, SDVOSB",
}

export default function FederalGrantsWomenMinoritiesPage() {
  const faqData = [
    {
      question: "How long does certification take?",
      answer: "WOSB: 2-4 weeks using the new SBA portal. 8(a): 90-180 days (more complex). HUBZone: 60-90 days. SDVOSB: 60-90 days. Processing times depend heavily on documentation completeness."
    },
    {
      question: "Can I have multiple certifications?",
      answer: "Yes! Many businesses are 'dual-certified' (e.g., 8(a) + HUBZone or WOSB + SDVOSB). This expands your contract access significantly as you can bid on multiple types of set-asides."
    },
    {
      question: "Is certification free?",
      answer: "SBA certifications (WOSB, 8(a), HUBZone) are free when applied for directly through certify.sba.gov. Third-party certifiers (like WBENC) charge fees but may offer private sector benefits."
    },
    {
      question: "Do certificates expire?",
      answer: "Yes. WOSB requires annual attestation and full recertification every 3 years. 8(a) is a one-time 9-year term. HUBZone requires annual recertification to ensure you still meet residency/employee targets."
    },
    {
      question: "Can I self-certify?",
      answer: "No. Self-certification for WOSB and SDVOSB federal contracts ended in 2020/2023. You must now go through the formal SBA or VA application process to be eligible for set-aside contracts."
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
        <section className="bg-gradient-to-br from-purple-700 to-pink-600 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30"><Heart className="w-3 h-3 mr-1" /> Specialized Federal Programs</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Federal Grants for Women, Minorities &amp; Veterans 2026</h1>
              <p className="text-xl text-purple-100 mb-8">Access billions in federal contracts through specialized certification programs. Complete guide to WOSB, 8(a), HUBZone, and veteran programs.</p>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild><Link href="/contact?service=certification-help">Get Certification Help</Link></Button>
            </div>
          </div>
        </section>

        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <nav className="p-6 bg-gray-50 rounded-xl">
                <h2 className="text-lg font-bold mb-4">In This Guide</h2>
                <ul className="grid md:grid-cols-2 gap-2 text-sm">
                  <li><a href="#overview" className="text-blue-700 hover:underline">1. Why These Programs Exist</a></li>
                  <li><a href="#wosb" className="text-blue-700 hover:underline">2. WOSB &amp; EDWOSB Programs</a></li>
                  <li><a href="#8a" className="text-blue-700 hover:underline">3. 8(a) Business Development</a></li>
                  <li><a href="#hubzone" className="text-blue-700 hover:underline">4. HUBZone Program</a></li>
                  <li><a href="#veteran" className="text-blue-700 hover:underline">5. VOSB &amp; SDVOSB Programs</a></li>
                  <li><a href="#eligibility" className="text-blue-700 hover:underline">6. Eligibility Requirements</a></li>
                  <li><a href="#certification" className="text-blue-700 hover:underline">7. Certification Process</a></li>
                  <li><a href="#benefits" className="text-blue-700 hover:underline">8. Program Benefits</a></li>
                  <li><a href="#contracts" className="text-blue-700 hover:underline">9. Winning Federal Contracts</a></li>
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
              <div><div className="text-3xl font-bold text-pink-600 mb-2">5%</div><div className="text-gray-600">WOSB Contract Goal</div></div>
              <div><div className="text-3xl font-bold text-purple-600 mb-2">5%</div><div className="text-gray-600">8(a) Contract Goal</div></div>
              <div><div className="text-3xl font-bold text-blue-600 mb-2">3%</div><div className="text-gray-600">SDVOSB Contract Goal</div></div>
              <div><div className="text-3xl font-bold text-green-600 mb-2">3%</div><div className="text-gray-600">HUBZone Contract Goal</div></div>
            </div>
          </div>
        </section>

        <section id="overview" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Why These Federal Programs Exist</h2>
              <p className="text-gray-700 leading-relaxed mb-6">The federal government has established targeted programs to increase diversity in federal contracting and support historically underrepresented business owners. These programs set aside a percentage of federal contracts specifically for certified businesses, creating opportunities worth billions annually. In fiscal year 2024, the government awarded over $163 billion to small businesses, with specific goals for women-owned (5%), disadvantaged businesses (5%), service-disabled veterans (3%), and HUBZone businesses (3%). Getting certified opens access to these set-aside opportunities that exclude general competition.</p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 bg-pink-50 rounded-lg text-center"><Heart className="w-10 h-10 text-pink-600 mx-auto mb-3" /><h3 className="font-bold mb-2">Women-Owned</h3><p className="text-sm text-gray-600">WOSB and EDWOSB certification for federal contracting access</p></div>
                <div className="p-6 bg-purple-50 rounded-lg text-center"><Users className="w-10 h-10 text-purple-600 mx-auto mb-3" /><h3 className="font-bold mb-2">Minority-Owned</h3><p className="text-sm text-gray-600">8(a) and disadvantaged business development programs</p></div>
                <div className="p-6 bg-blue-50 rounded-lg text-center"><Shield className="w-10 h-10 text-blue-600 mx-auto mb-3" /><h3 className="font-bold mb-2">Veteran-Owned</h3><p className="text-sm text-gray-600">VOSB and SDVOSB federal priority contracting</p></div>
              </div>
            </div>
          </div>
        </section>

        <section id="wosb" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">WOSB &amp; EDWOSB Programs</h2>
              <p className="text-gray-700 mb-6">The Women-Owned Small Business (WOSB) program helps women entrepreneurs access federal contracts. The government aims to award 5% of all federal contracting dollars to women-owned businesses—worth over $25 billion annually. WOSB certification requires at least 51% ownership by women who control management and daily operations. The Economically Disadvantaged WOSB (EDWOSB) adds income and asset limits for enhanced benefits including additional contract set-asides in more industries.</p>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <Card><CardHeader><CardTitle className="text-pink-700">WOSB Requirements</CardTitle></CardHeader><CardContent><ul className="space-y-2 text-sm"><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>At least 51% owned by women</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Women control management and daily operations</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Women make long-term business decisions</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Meet SBA small business size standards</span></li></ul></CardContent></Card>
                <Card><CardHeader><CardTitle className="text-red-700">EDWOSB (Enhanced)</CardTitle></CardHeader><CardContent><ul className="space-y-2 text-sm"><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>All WOSB requirements plus economic criteria</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Personal net worth under $750K</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Adjusted gross income under $350K (3-yr avg)</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Total assets under $6M</span></li></ul></CardContent></Card>
              </div>
              <div className="bg-pink-50 p-6 rounded-lg"><h3 className="font-bold mb-3">WOSB Benefits</h3><div className="grid md:grid-cols-2 gap-4 text-sm"><div><strong>Contract Access:</strong> Set-aside contracts in 83+ industries</div><div><strong>Sole Source:</strong> Up to $4M (services) / $7M (manufacturing)</div><div><strong>Goal:</strong> 5% of all federal contracts</div><div><strong>Competition:</strong> Compete only against other WOSBs</div></div></div>
            </div>
          </div>
        </section>

        <section id="8a" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">8(a) Business Development Program</h2>
              <p className="text-gray-700 mb-6">The 8(a) program is the SBA&apos;s premier business development program for socially and economically disadvantaged entrepreneurs. It&apos;s a 9-year program that provides business training, counseling, marketing assistance, and access to federal contracting opportunities. Participants get exclusive access to sole-source and set-aside contracts, mentor-protégé partnerships, and intensive business development support. This is the most comprehensive federal small business program available.</p>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg border"><Clock className="w-6 h-6 text-purple-600 mb-2" /><div className="font-bold">9 Years</div><div className="text-sm text-gray-600">Program duration</div></div>
                <div className="bg-white p-4 rounded-lg border"><DollarSign className="w-6 h-6 text-green-600 mb-2" /><div className="font-bold">$4M/$7M</div><div className="text-sm text-gray-600">Sole source threshold</div></div>
                <div className="bg-white p-4 rounded-lg border"><Target className="w-6 h-6 text-blue-600 mb-2" /><div className="font-bold">5%</div><div className="text-sm text-gray-600">Federal contract goal</div></div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-purple-50 rounded-lg"><h3 className="font-bold mb-3 text-purple-700">Eligibility</h3><ul className="space-y-1 text-sm"><li>• 51% owned by socially disadvantaged individual</li><li>• Meet economic disadvantage criteria</li><li>• Good character and potential for success</li><li>• At least 2 years in business</li><li>• Primary industry with growth potential</li></ul></div>
                <div className="p-6 bg-green-50 rounded-lg"><h3 className="font-bold mb-3 text-green-700">Program Benefits</h3><ul className="space-y-1 text-sm"><li>• Set-aside and sole-source contracts</li><li>• Business development assistance</li><li>• Mentor-protégé partnerships</li><li>• Management and technical training</li><li>• Federal contracting support</li></ul></div>
              </div>
            </div>
          </div>
        </section>

        <section id="hubzone" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">HUBZone Program</h2>
              <p className="text-gray-700 mb-6">The Historically Underutilized Business Zone (HUBZone) program encourages economic development in distressed communities by providing preferential access to federal contracts for businesses located in and hiring from these areas. The program has a 3% federal contracting goal and offers a 10% price evaluation preference in competitive bids. Businesses must have their principal office in a qualified HUBZone and employ at least 35% of their workforce from HUBZone areas.</p>
              <div className="grid md:grid-cols-2 gap-6">
                <Card><CardHeader><CardTitle className="text-green-700">HUBZone Requirements</CardTitle></CardHeader><CardContent><ul className="space-y-2 text-sm"><li>• Principal office in HUBZone area</li><li>• At least 35% of employees live in HUBZone</li><li>• At least 51% owned by US citizens</li><li>• Meet SBA size standards</li></ul></CardContent></Card>
                <Card><CardHeader><CardTitle className="text-blue-700">HUBZone Benefits</CardTitle></CardHeader><CardContent><ul className="space-y-2 text-sm"><li>• 3% federal contracting goal</li><li>• 10% price evaluation preference</li><li>• Set-aside and sole-source contracts</li><li>• Subcontracting opportunities</li></ul></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        <section id="veteran" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">VOSB &amp; SDVOSB Programs</h2>
              <p className="text-gray-700 mb-6">The federal government recognizes veterans&apos; service with preferential contracting programs. VOSB (Veteran-Owned Small Business) and SDVOSB (Service-Disabled Veteran-Owned Small Business) certifications provide significant advantages in federal contracting. SDVOSB has a 3% federal contracting goal and receives priority for VA contracts under the Vets First program. Veterans with service-connected disabilities receive additional benefits including higher sole-source thresholds.</p>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-blue-200"><CardHeader><CardTitle className="text-blue-700">VOSB</CardTitle></CardHeader><CardContent><p className="text-sm text-gray-600 mb-3">For businesses 51%+ owned by veterans who control management and daily operations.</p><ul className="space-y-1 text-sm"><li>• Access to set-aside contracts</li><li>• VA priority contracting</li><li>• Subcontracting opportunities</li></ul></CardContent></Card>
                <Card className="border-indigo-200"><CardHeader><CardTitle className="text-indigo-700">SDVOSB</CardTitle></CardHeader><CardContent><p className="text-sm text-gray-600 mb-3">Enhanced program for veterans with service-connected disabilities.</p><ul className="space-y-1 text-sm"><li>• 3% federal contract goal</li><li>• Higher sole-source thresholds</li><li>• VA Vets First contracting priority</li></ul></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        <section id="eligibility" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Eligibility Requirements Summary</h2>
              <p className="text-gray-700 mb-6">Each certification program has specific ownership, control, and operational requirements. Understanding these requirements upfront helps you prepare complete documentation and avoid common rejection issues. Many businesses qualify for multiple certifications, which can be stacked for maximum contract access.</p>
              <div className="overflow-x-auto"><table className="w-full border-collapse border border-gray-200"><thead><tr className="bg-purple-50"><th className="border px-4 py-3 text-left">Program</th><th className="border px-4 py-3 text-left">Ownership</th><th className="border px-4 py-3 text-left">Key Requirements</th></tr></thead><tbody>
                <tr><td className="border px-4 py-3 font-semibold">WOSB</td><td className="border px-4 py-3">51%+ women</td><td className="border px-4 py-3">Women control operations</td></tr>
                <tr className="bg-gray-50"><td className="border px-4 py-3 font-semibold">8(a)</td><td className="border px-4 py-3">51%+ disadvantaged</td><td className="border px-4 py-3">2+ years in business, economic need</td></tr>
                <tr><td className="border px-4 py-3 font-semibold">HUBZone</td><td className="border px-4 py-3">51%+ US citizens</td><td className="border px-4 py-3">Located in HUBZone, 35% employees from area</td></tr>
                <tr className="bg-gray-50"><td className="border px-4 py-3 font-semibold">SDVOSB</td><td className="border px-4 py-3">51%+ disabled veterans</td><td className="border px-4 py-3">VA disability rating, veteran controls business</td></tr>
              </tbody></table></div>
            </div>
          </div>
        </section>

        <section id="certification" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Certification Process</h2>
              <p className="text-gray-700 mb-6">The certification process requires thorough documentation of ownership, control, and business operations. Most certifications are processed through certify.sba.gov, though veteran certifications go through the VA. Plan for 2-6 months depending on the program and your documentation readiness.</p>
              <div className="space-y-4">
                <div className="flex items-start p-4 bg-white rounded-lg border"><div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">1</div><div><h3 className="font-bold">Determine Eligibility</h3><p className="text-gray-600 text-sm">Review program requirements carefully. Some programs have strict ownership and control criteria.</p></div></div>
                <div className="flex items-start p-4 bg-white rounded-lg border"><div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">2</div><div><h3 className="font-bold">Register in SAM.gov</h3><p className="text-gray-600 text-sm">All federal contractors must register in the System for Award Management (SAM).</p></div></div>
                <div className="flex items-start p-4 bg-white rounded-lg border"><div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">3</div><div><h3 className="font-bold">Gather Documentation</h3><p className="text-gray-600 text-sm">Collect ownership documents, tax returns, financial statements, resumes, and control evidence.</p></div></div>
                <div className="flex items-start p-4 bg-white rounded-lg border"><div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">4</div><div><h3 className="font-bold">Submit Application</h3><p className="text-gray-600 text-sm">Apply through appropriate portal (certify.sba.gov for most programs, VA for veteran programs).</p></div></div>
              </div>
            </div>
          </div>
        </section>

        <section id="benefits" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Federal Certification Benefits</h2>
              <p className="text-gray-700 mb-6">Certification opens doors to exclusive contracting opportunities not available to the general market. Benefits include set-aside competitions where only certified firms compete, sole-source awards for contracts under threshold amounts, and access to business development resources and mentor programs.</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-green-50 rounded-lg"><h3 className="font-bold mb-3 text-green-700">Contract Access</h3><ul className="space-y-1 text-sm"><li>• Set-aside competitions (limited to certified firms)</li><li>• Sole-source awards up to $4M-$7M</li><li>• Subcontracting opportunities with large primes</li><li>• Agency-specific programs and preferences</li></ul></div>
                <div className="p-6 bg-blue-50 rounded-lg"><h3 className="font-bold mb-3 text-blue-700">Business Development</h3><ul className="space-y-1 text-sm"><li>• Mentor-protégé programs</li><li>• Training and counseling resources</li><li>• Networking events and matchmaking</li><li>• Technical assistance centers</li></ul></div>
              </div>
            </div>
          </div>
        </section>

        <section id="contracts" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Winning Federal Contracts</h2>
              <p className="text-gray-700 mb-6">Certification alone does not guarantee contracts. Winning requires market research, capability development, relationship building with contracting officers, and competitive pricing. Many successful businesses start as subcontractors to build past performance before pursuing prime contracts.</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div><h3 className="font-bold mb-3 text-purple-700">Finding Opportunities</h3><ul className="space-y-2 text-sm"><li className="flex items-start"><ChevronRight className="w-4 h-4 text-purple-500 mr-2 mt-0.5" /><span>SAM.gov contract opportunities database</span></li><li className="flex items-start"><ChevronRight className="w-4 h-4 text-purple-500 mr-2 mt-0.5" /><span>Agency-specific procurement portals</span></li><li className="flex items-start"><ChevronRight className="w-4 h-4 text-purple-500 mr-2 mt-0.5" /><span>Industry matchmaking events</span></li><li className="flex items-start"><ChevronRight className="w-4 h-4 text-purple-500 mr-2 mt-0.5" /><span>PTAC (Procurement Technical Assistance Centers)</span></li></ul></div>
                <div><h3 className="font-bold mb-3 text-blue-700">Success Strategies</h3><ul className="space-y-2 text-sm"><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Build past performance through subcontracting</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Network with contracting officers</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Pursue joint ventures with experienced firms</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Respond to market research opportunities</span></li></ul></div>
              </div>
            </div>
          </div>
        </section>

        <section id="mistakes" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Common Certification Mistakes</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Card><CardContent className="pt-6"><h3 className="font-bold text-red-600 mb-2">❌ Incomplete Documentation</h3><p className="text-sm text-gray-600">Missing ownership documents, outdated tax returns, or incomplete financial statements delay approval significantly.</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold text-red-600 mb-2">❌ Control Issues</h3><p className="text-sm text-gray-600">Qualifying owner must demonstrate actual control over business decisions and daily operations, not just ownership.</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold text-red-600 mb-2">❌ Missing Recertification</h3><p className="text-sm text-gray-600">Annual recertification is required. Missing deadlines results in immediate loss of certification.</p></CardContent></Card>
                <Card><CardContent className="pt-6"><h3 className="font-bold text-red-600 mb-2">❌ Pass-Through Arrangements</h3><p className="text-sm text-gray-600">Using certification only to win contracts then subcontracting most work is fraud and results in debarment.</p></CardContent></Card>
              </div>
            </div>
          </div>
        </section>

        <section id="success" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Success Strategies</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div><h3 className="font-bold mb-3 text-green-700">✅ Do This</h3><ul className="space-y-2 text-sm"><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Get professional help with certification applications</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Pursue multiple certifications (stack them for access)</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Start building federal experience early through subcontracts</span></li><li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" /><span>Attend local PTAC training and events</span></li></ul></div>
                <div><h3 className="font-bold mb-3 text-purple-700">🎯 Pro Tips</h3><ul className="space-y-2 text-sm"><li className="flex items-start"><Target className="w-4 h-4 text-purple-500 mr-2 mt-0.5" /><span>8(a) can be combined with HUBZone for dual benefits</span></li><li className="flex items-start"><Target className="w-4 h-4 text-purple-500 mr-2 mt-0.5" /><span>Women veterans can get WOSB + SDVOSB certifications</span></li><li className="flex items-start"><Target className="w-4 h-4 text-purple-500 mr-2 mt-0.5" /><span>Join mentor-protégé programs immediately after certification</span></li><li className="flex items-start"><Target className="w-4 h-4 text-purple-500 mr-2 mt-0.5" /><span>VA contracts prioritize SDVOSBs through Vets First</span></li></ul></div>
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
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <h3 className="font-bold flex items-start">
                        <HelpCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
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

        {/* Official Resources Section */}
        <section className="py-16 bg-white border-t">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Official Resources</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Link href="https://wosb.certify.sba.gov/" target="_blank" rel="noopener noreferrer" className="flex items-start p-6 bg-pink-50 rounded-lg border border-pink-100 hover:shadow-md transition-all">
                  <ExternalLink className="w-6 h-6 text-pink-600 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-pink-900 mb-2">SBA WOSB Certification</h3>
                    <p className="text-pink-800 text-sm">Official portal to apply for Women-Owned Small Business (WOSB) certification.</p>
                  </div>
                </Link>
                <Link href="https://assist.sba.gov/" target="_blank" rel="noopener noreferrer" className="flex items-start p-6 bg-purple-50 rounded-lg border border-purple-100 hover:shadow-md transition-all">
                  <ExternalLink className="w-6 h-6 text-purple-600 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-purple-900 mb-2">SBA 8(a) Application</h3>
                    <p className="text-purple-800 text-sm">Access the 8(a) Business Development Program application and management system.</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Related Guides</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/blog/women-business-centers-guide" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-blue-600 mr-3" /><span>Women&apos;s Business Centers</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/blog/sba-7a-loans-complete-guide" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-blue-600 mr-3" /><span>SBA 7(a) Loans</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/blog/small-business-grants-complete-guide" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-blue-600 mr-3" /><span>Small Business Grants</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
                <Link href="/usa" className="flex items-center p-4 bg-white rounded-lg border hover:border-blue-500 transition-all"><BookOpen className="w-5 h-5 text-blue-600 mr-3" /><span>State-by-State Guides</span><ExternalLink className="w-4 h-4 text-gray-400 ml-auto" /></Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-r from-purple-700 to-pink-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-6">Ready to Get Certified?</h2>
              <p className="text-xl text-purple-100 mb-8">Our team helps businesses navigate the certification process, prepare documentation, and win federal contracts.</p>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild><Link href="/contact?service=certification-help">Get Certification Help</Link></Button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
