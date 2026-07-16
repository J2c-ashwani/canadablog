import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import Link from "next/link"
import type { Metadata } from "next"
import { CheckCircle, ArrowRight, Calculator, Sparkles, Download, AlertCircle, Clock, DollarSign, Users, FileText } from "lucide-react"

export const metadata: Metadata = {
  title: "Minority Business Grants Canada Guide 2026 | Diverse Founder Funding",
  description: "Navigate government grants and funding for diverse entrepreneurs in Canada. Learn about Black, Indigenous, newcomer, and women-led business programs.",
  alternates: {
    canonical: "https://www.fsidigital.ca/topics/minority-business-grants-canada",
  },
  robots: { index: true, follow: true },
}

export default function MinorityGrantsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.fsidigital.ca/topics/minority-business-grants-canada#webpage",
        "url": "https://www.fsidigital.ca/topics/minority-business-grants-canada",
        "name": "Minority Business Grants Canada Guide 2026 | Diverse Founder Funding",
        "description": "Navigate government grants and funding for diverse entrepreneurs in Canada. Learn about Black, Indigenous, newcomer, and women-led business programs.",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.fsidigital.ca" },
            { "@type": "ListItem", "position": 2, "name": "Topics", "item": "https://www.fsidigital.ca/topics" },
            { "@type": "ListItem", "position": 3, "name": "Minority Business Grants", "item": "https://www.fsidigital.ca/topics/minority-business-grants-canada" }
          ]
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.fsidigital.ca/topics/minority-business-grants-canada#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What funding is available for Black entrepreneurs in Canada?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The federal Black Entrepreneurship Program (BEP) provides support, including the Black Entrepreneurship Loan Fund. Administered by the Federation of African Canadian Economics (FACE) in partnership with BDC and other banks, the program offers unsecured and partially secured loans up to $250,000 to Black-owned businesses."
            }
          },
          {
            "@type": "Question",
            "name": "What grants exist for Indigenous business owners?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Indigenous business owners can access the Aboriginal Entrepreneurship Program (AEP), which provides non-repayable contributions up to $99,999 for individuals and higher amounts for community-owned enterprises. Funding is administered through a national network of Aboriginal Financial Institutions (AFIs) coordinated by NACCA."
            }
          },
          {
            "@type": "Question",
            "name": "Are there business grants for newcomers and immigrants to Canada?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "While direct immigrant-only federal grants are rare, BDC offers newcomer financing up to $50,000 for entrepreneurs who have been in Canada for less than 36 months and lack local credit history. Additionally, organizations like Windmill Microlending provide low-interest micro-loans for professional accreditation and business startups."
            }
          },
          {
            "@type": "Question",
            "name": "How does the Women Entrepreneurship Strategy (WES) function?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "WES is a multi-billion dollar federal framework. It funds the WES Ecosystem Fund (helping non-profits support women founders) and the WES Lending Program, which provides micro-loans up to $50,000 through partner delivery organizations to businesses that are at least 51% owned and led by women."
            }
          },
          {
            "@type": "Question",
            "name": "Do minority-focused funding programs require matching capital?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Many minority-focused loan programs (like FACE or BDC newcomer loans) feature highly flexible collateral rules and do not require large matching equity. However, grant programs (like the AEP) often require the entrepreneur to provide a small equity contribution, typically 10% to 25% of the total project costs."
            }
          },
          {
            "@type": "Question",
            "name": "How is a diverse or minority ownership verified?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Verification typically requires showing that the business is at least 51% owned, managed, and controlled by individuals identifying with the target demographic group. Lenders or registry programs will request corporate registries, shareholder logs, and identity documents."
            }
          },
          {
            "@type": "Question",
            "name": "Are there tax credits specifically for diverse-owned companies?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "There are no federal tax credit programs (like SR&ED) reserved solely for diverse owners. All Canadian-incorporated companies have equal access to R&D and digital tax credits. However, diverse-owned companies can stack these tax offsets with demographic-specific grants."
            }
          }
        ]
      }
    ]
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(100,116,139,0.1),transparent)]" />
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-slate-500/10 border border-slate-400/20 text-slate-300 mb-6 uppercase tracking-wider">
              Inclusive Growth Funding
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Funding & Grants for Diverse Entrepreneurs in Canada
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 mb-8 leading-relaxed">
              Empower your growth. Learn about government grants, low-interest micro-loans, and business programs tailored for Indigenous, Black, newcomer, and women-led enterprises.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="#diverse-funding"
                className="bg-slate-700 hover:bg-slate-600 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md inline-flex items-center gap-2 hover:scale-[1.02]"
              >
                Explore Diverse Funding <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/calculator"
                className="bg-slate-900/80 hover:bg-slate-900 text-slate-200 border border-slate-700/60 font-semibold px-6 py-3 rounded-xl transition-all inline-flex items-center gap-2"
              >
                <Calculator className="w-4 h-4 text-slate-400" /> Estimate Your Claim
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-12 bg-white border-y border-slate-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="border-l-4 border-slate-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">Up to $250,000</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Black / AFI Loan Limits</span>
            </div>
            <div className="border-l-4 border-slate-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">Up to $99,999</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Indigenous AEP Grants</span>
            </div>
            <div className="border-l-4 border-slate-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">51% Share rule</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">Minimum Ownership Level</span>
            </div>
            <div className="border-l-4 border-slate-600 pl-4 py-2">
              <span className="block text-3xl font-extrabold text-slate-900">Up to $50,000</span>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider block mt-1">WES Micro-loans</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-12">
            
            {/* Detailed Content */}
            <article className="lg:col-span-8 space-y-12">
              
              <section className="prose prose-slate max-w-none">
                <p className="text-lg leading-relaxed text-slate-700">
                  Economic inclusivity is a central pillar of Canada's economic strategy. Recognizing that systemic barriers, historical underfunding, and credit-score limits often prevent diverse entrepreneurs from launching and scaling enterprises, federal, provincial, and private organizations have created targeted financing streams.
                </p>
                <p className="text-lg leading-relaxed text-slate-700 mt-4">
                  These capital allocations are designed specifically to support underrepresented demographics. Whether you are an Indigenous entrepreneur seeking non-repayable grants, a Black business owner in need of working capital, a newcomer building credit, or a woman founder scaling a tech startup, there are specialized funds structured to match your needs.
                </p>
              </section>

              {/* Core Programs */}
              <section id="diverse-funding" className="space-y-6">
                <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">Active Programs for Underrepresented Founders</h2>
                
                <div className="space-y-6">
                  {/* Black Entrepreneurship Program */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-bold text-slate-950 text-lg">Black Entrepreneurship Loan Fund</h3>
                      <span className="px-2.5 py-1 rounded bg-slate-50 text-slate-700 text-xs font-bold shrink-0">Up to $250K Loan</span>
                    </div>
                    <p className="text-slate-655 text-xs sm:text-sm leading-relaxed">
                      Delivered by the Federation of African Canadian Economics (FACE) in partnership with the federal government and BDC. It offers loans from $10,000 to $250,000 to support Black-owned businesses. These loans feature flexible lending criteria and are designed to help founders who have historically lacked access to conventional banking credit lines.
                    </p>
                  </div>

                  {/* Aboriginal Entrepreneurship Program */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-bold text-slate-950 text-lg">Aboriginal Entrepreneurship Program (AEP)</h3>
                      <span className="px-2.5 py-1 rounded bg-slate-50 text-slate-700 text-xs font-bold shrink-0">Up to $99K Grant</span>
                    </div>
                    <p className="text-slate-655 text-xs sm:text-sm leading-relaxed">
                      Managed by Indigenous Services Canada and delivered throughNACCA and a national network of Aboriginal Financial Institutions (AFIs). The program provides up to $99,999 in non-repayable grant matching for individual Indigenous entrepreneurs, and larger amounts for community-owned businesses, to fund startup costs, marketing, and asset acquisition.
                    </p>
                  </div>

                  {/* WES Lending Program */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-bold text-slate-950 text-lg">Women Entrepreneurship Strategy (WES) Micro-loans</h3>
                      <span className="px-2.5 py-1 rounded bg-slate-50 text-slate-700 text-xs font-bold shrink-0">Up to $50K Loan</span>
                    </div>
                    <p className="text-slate-655 text-xs sm:text-sm leading-relaxed">
                      Under the federal WES program, micro-loans up to $50,000 are provided to businesses that are at least 51% owned and led by women. These funds are distributed through regional delivery organizations, combining financing with business training and mentorship resources.
                    </p>
                  </div>
                </div>
              </section>

              {/* Structuring and Stacking */}
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-950 tracking-tight">Eligibility Checklist for Demographic Funds</h2>
                <p className="text-slate-655 text-sm leading-relaxed">
                  To qualify for demographic-specific funding streams, businesses must generally meet these core parameters:
                </p>
                <ul className="space-y-3 pl-5 list-disc text-slate-655 text-sm">
                  <li><strong>Majority Control:</strong> The target demographic group must hold at least 51% of the voting shares and hold executive leadership roles (e.g. CEO or President).</li>
                  <li><strong>Proof of Status:</strong> Applications must include supporting documents, such as Metis/Status cards, birth certificates, or self-declarations, depending on the program requirements.</li>
                  <li><strong>Active Operations:</strong> For loan programs, the business must demonstrate feasibility or active revenues in Canada, backed by financial statements.</li>
                </ul>
              </section>

              {/* FAQs */}
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-950 tracking-tight">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">What funding is available for Black entrepreneurs in Canada?</h3>
                    <p className="text-slate-655 text-sm leading-relaxed">
                      The federal Black Entrepreneurship Program (BEP) provides support, including the Black Entrepreneurship Loan Fund. Administered by the Federation of African Canadian Economics (FACE) in partnership with BDC and other banks, the program offers unsecured and partially secured loans up to $250,000 to Black-owned businesses.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">What grants exist for Indigenous business owners?</h3>
                    <p className="text-slate-655 text-sm leading-relaxed">
                      Indigenous business owners can access the Aboriginal Entrepreneurship Program (AEP), which provides non-repayable contributions up to $99,999 for individuals and higher amounts for community-owned enterprises. Funding is administered through a national network of Aboriginal Financial Institutions (AFIs) coordinated by NACCA.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">Are there business grants for newcomers and immigrants to Canada?</h3>
                    <p className="text-slate-655 text-sm leading-relaxed">
                      While direct immigrant-only federal grants are rare, BDC offers newcomer financing up to $50,000 for entrepreneurs who have been in Canada for less than 36 months and lack local credit history. Additionally, organizations like Windmill Microlending provide low-interest micro-loans for professional accreditation and business startups.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">How does the Women Entrepreneurship Strategy (WES) function?</h3>
                    <p className="text-slate-655 text-sm leading-relaxed">
                      WES is a multi-billion dollar federal framework. It funds the WES Ecosystem Fund (helping non-profits support women founders) and the WES Lending Program, which provides micro-loans up to $50,000 through partner delivery organizations to businesses that are at least 51% owned and led by women.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">Do minority-focused funding programs require matching capital?</h3>
                    <p className="text-slate-655 text-sm leading-relaxed">
                      Many minority-focused loan programs (like FACE or BDC newcomer loans) feature highly flexible collateral rules and do not require large matching equity. However, grant programs (like the AEP) often require the entrepreneur to provide a small equity contribution, typically 10% to 25% of the total project costs.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">How is a diverse or minority ownership verified?</h3>
                    <p className="text-slate-655 text-sm leading-relaxed">
                      Verification typically requires showing that the business is at least 51% owned, managed, and controlled by individuals identifying with the target demographic group. Lenders or registry programs will request corporate registries, shareholder logs, and identity documents.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-950 mb-2">Are there tax credits specifically for diverse-owned companies?</h3>
                    <p className="text-slate-655 text-sm leading-relaxed">
                      There are no federal tax credit programs (like SR&ED) reserved solely for diverse owners. All Canadian-incorporated companies have equal access to R&D and digital tax credits. However, diverse-owned companies can stack these tax offsets with demographic-specific grants.
                    </p>
                  </div>
                </div>
              </section>

              {/* Related Programs & Topics (Mesh) */}
              <div className="border-t border-slate-200 pt-8 mt-12 space-y-6">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">Related Programs</span>
                  <div className="flex flex-wrap gap-2.5">
                    <Link href="/topics/women-entrepreneur-grants-canada" className="text-xs font-semibold bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full text-slate-800">WES Funding Guide</Link>
                    <Link href="/topics/minority-business-grants-canada" className="text-xs font-semibold bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full text-slate-800">Minority Funding Guide</Link>
                  </div>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">Related Topics</span>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Link href="/topics/women-entrepreneur-grants-canada" className="group p-4 bg-white border border-slate-200 rounded-xl hover:border-slate-355 transition-colors">
                      <h4 className="font-bold text-slate-900 group-hover:text-slate-700 text-sm inline-flex items-center gap-1">Women Entrepreneur Grants <ArrowRight className="w-3 h-3" /></h4>
                      <p className="text-slate-500 text-xs mt-1">Review dedicated federal grants and private funding matrices for women founders.</p>
                    </Link>
                    <Link href="/topics/startup-grants-canada" className="group p-4 bg-white border border-slate-200 rounded-xl hover:border-slate-355 transition-colors">
                      <h4 className="font-bold text-slate-900 group-hover:text-slate-700 text-sm inline-flex items-center gap-1">Startup Grants Canada <ArrowRight className="w-3 h-3" /></h4>
                      <p className="text-slate-500 text-xs mt-1">Review the complete national non-dilutive framework for early-stage companies.</p>
                    </Link>
                  </div>
                </div>
              </div>

            </article>

            {/* Right Column - Premium Sticky CTAs */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="lg:sticky lg:top-8 space-y-6">
                
                {/* CTA 1: Calculator */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 border border-slate-800 shadow-md">
                  <Calculator className="w-8 h-8 text-slate-400 mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">Estimate Your Subsidies</h3>
                  <p className="text-slate-200 text-xs leading-relaxed mb-6">
                    Our funding calculator helps estimate your eligible capital and hiring subsidies across hundreds of federal and provincial programs.
                  </p>
                  <Link
                    href="/calculator"
                    className="w-full bg-slate-700 hover:bg-slate-605 text-white text-center font-bold py-3 rounded-xl transition-all block text-sm"
                  >
                    Estimate Subsidies
                  </Link>
                </div>

                {/* CTA 2: AI Finder */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                  <Sparkles className="w-8 h-8 text-slate-650 mb-4" />
                  <h3 className="text-lg font-bold text-slate-950 mb-2">Match 1,200+ grants</h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-6">
                    Connect with our proprietary AI Funding Finder. Match your business coordinates to active regional, demographic, and national grant programs.
                  </p>
                  <Link
                    href="/grant-finder"
                    className="w-full bg-slate-950 hover:bg-slate-900 text-white text-center font-bold py-3 rounded-xl transition-all block text-sm"
                  >
                    Find Demographics Grants
                  </Link>
                </div>

                {/* CTA 3: PDF Download */}
                <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200/60 text-center">
                  <Download className="w-8 h-8 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-slate-955 mb-1">Download Diversity Kit</h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-6">
                    Download our comprehensive Indigenous and rural business funding kit, containing checklist worksheets and program guides.
                  </p>
                  <Link
                    href="/download/indigenous-rural-funding-kit"
                    className="w-full bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-center font-bold py-3 rounded-xl transition-all block text-sm"
                  >
                    Download Diversity Kit (PDF)
                  </Link>
                </div>

              </div>
            </aside>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
