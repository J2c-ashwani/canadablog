import React from 'react'
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import type { Metadata } from "next"
import { Scale, AlertTriangle, BookOpen, FileText, Globe, ShieldCheck, Mail } from "lucide-react"

export const metadata: Metadata = {
  title: "Terms of Service | FSI Digital — Usage Terms & Conditions",
  description: "Terms of Service for FSI Digital. Read the terms and conditions governing your use of our government grant information platform, including disclaimers and limitations of liability.",
  alternates: {
    canonical: "https://www.fsidigital.ca/terms",
  },
  robots: { index: true, follow: true },
}

export default function TermsOfService() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-gray-800 py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <Scale className="w-4 h-4" />
              Legal Agreement
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Terms of Service
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Please read these terms carefully before using FSI Digital. By accessing or using our website, you agree to be bound by these terms.
            </p>
            <p className="text-gray-400 text-sm mt-4">
              Effective Date: January 1, 2026 &nbsp;·&nbsp; Last Updated: March 9, 2026
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-6 py-12">

          {/* Table of Contents */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-10">
            <h2 className="text-lg font-semibold text-slate-900 mb-3">📋 Table of Contents</h2>
            <ol className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <li><a href="#acceptance" className="text-slate-700 hover:text-slate-900 hover:underline">1. Acceptance of Terms</a></li>
              <li><a href="#description" className="text-slate-700 hover:text-slate-900 hover:underline">2. Description of Services</a></li>
              <li><a href="#disclaimer" className="text-slate-700 hover:text-slate-900 hover:underline">3. Important Disclaimers</a></li>
              <li><a href="#no-guarantee" className="text-slate-700 hover:text-slate-900 hover:underline">4. No Guarantee of Funding</a></li>
              <li><a href="#educational" className="text-slate-700 hover:text-slate-900 hover:underline">5. Educational Purpose Only</a></li>
              <li><a href="#not-professional-advice" className="text-slate-700 hover:text-slate-900 hover:underline">6. Not Professional Advice</a></li>
              <li><a href="#user-conduct" className="text-slate-700 hover:text-slate-900 hover:underline">7. User Conduct</a></li>
              <li><a href="#intellectual-property" className="text-slate-700 hover:text-slate-900 hover:underline">8. Intellectual Property</a></li>
              <li><a href="#third-party-links" className="text-slate-700 hover:text-slate-900 hover:underline">9. Third-Party Links</a></li>
              <li><a href="#advertising" className="text-slate-700 hover:text-slate-900 hover:underline">10. Advertising</a></li>
              <li><a href="#limitation" className="text-slate-700 hover:text-slate-900 hover:underline">11. Limitation of Liability</a></li>
              <li><a href="#indemnification" className="text-slate-700 hover:text-slate-900 hover:underline">12. Indemnification</a></li>
              <li><a href="#governing-law" className="text-slate-700 hover:text-slate-900 hover:underline">13. Governing Law</a></li>
              <li><a href="#changes-terms" className="text-slate-700 hover:text-slate-900 hover:underline">14. Changes to Terms</a></li>
              <li><a href="#contact-terms" className="text-slate-700 hover:text-slate-900 hover:underline">15. Contact Information</a></li>
            </ol>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 space-y-10">

            {/* 1. Acceptance */}
            <section id="acceptance">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">1. Acceptance of Terms</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                By accessing and using the FSI Digital website (<a href="https://www.fsidigital.ca" className="text-emerald-600 hover:text-emerald-800 underline">www.fsidigital.ca</a>), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these Terms of Service, you are not authorized to use or access this website.
              </p>
            </section>

            <hr className="border-gray-200" />

            {/* 2. Description */}
            <section id="description">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">2. Description of Services</h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-3">
                FSI Digital provides free, publicly accessible information about government grants and funding opportunities available in the United States and Canada. Our services include:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2"><span className="text-emerald-600 mt-1">•</span><span>Comprehensive educational articles and research guides about government grant programs.</span></li>
                <li className="flex items-start gap-2"><span className="text-emerald-600 mt-1">•</span><span>Grant opportunity alerts and funding deadline notifications via email newsletters.</span></li>
                <li className="flex items-start gap-2"><span className="text-emerald-600 mt-1">•</span><span>Expert analysis, application tips, and strategic guidance for grant applicants.</span></li>
                <li className="flex items-start gap-2"><span className="text-emerald-600 mt-1">•</span><span>Comparison tools and resource directories to help businesses navigate funding options.</span></li>
              </ul>
            </section>

            <hr className="border-gray-200" />

            {/* 3. Important Disclaimers */}
            <section id="disclaimer">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">3. Important Disclaimers</h2>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-4">
                <p className="text-amber-800 font-semibold mb-2">⚠️ Financial Information Disclaimer</p>
                <p className="text-amber-700 text-sm leading-relaxed">
                  The information on this website is for general informational and educational purposes only. FSI Digital is <strong>not</strong> a law firm, financial advisor, accounting firm, or government agency. We do not guarantee the accuracy, completeness, or timeliness of any information published on this website. Grant eligibility criteria, funding amounts, application deadlines, and program details may change without notice. <strong>Always verify information with official government sources before making any financial decisions.</strong>
                </p>
              </div>
              <p className="text-gray-600 leading-relaxed">
                All content is provided &quot;as is&quot; without warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
              </p>
            </section>

            <hr className="border-gray-200" />

            {/* 4. No Guarantee of Funding */}
            <section id="no-guarantee">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. No Guarantee of Funding</h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                Our information and educational content do <strong>not</strong> guarantee that you will receive grant funding. The success of a grant application depends on many factors beyond our control, including but not limited to:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2"><span className="text-emerald-600 mt-1">•</span><span>Your business&apos;s eligibility for specific programs.</span></li>
                <li className="flex items-start gap-2"><span className="text-emerald-600 mt-1">•</span><span>The quality and completeness of your application.</span></li>
                <li className="flex items-start gap-2"><span className="text-emerald-600 mt-1">•</span><span>The level of competition for available funding.</span></li>
                <li className="flex items-start gap-2"><span className="text-emerald-600 mt-1">•</span><span>Agency-level decisions, budgets, and policy changes.</span></li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-3">
                FSI Digital provides <strong>information only</strong> and does not submit applications on your behalf, act as your representative, or have any influence over government funding decisions.
              </p>
            </section>

            <hr className="border-gray-200" />

            {/* 5. Educational Purpose */}
            <section id="educational">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Educational Purpose Only</h2>
              <p className="text-gray-600 leading-relaxed">
                All content on FSI Digital is provided strictly for informational and educational purposes. Users are solely responsible for their own grant research, application submissions, and compliance with all program requirements. We strongly recommend consulting with qualified legal, financial, or business professionals before making any decisions based on the information found on this website.
              </p>
            </section>

            <hr className="border-gray-200" />

            {/* 6. Not Professional Advice */}
            <section id="not-professional-advice">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Not Professional Advice</h2>
              <p className="text-gray-600 leading-relaxed">
                Nothing on this website constitutes professional financial, legal, tax, or investment advice. The content should not be relied upon as a substitute for professional counsel specific to your business situation. FSI Digital disclaims all liability arising from any actions you take or decisions you make based on the information found on this website.
              </p>
            </section>

            <hr className="border-gray-200" />

            {/* 7. User Conduct */}
            <section id="user-conduct">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. User Conduct</h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                You agree to use this website only for lawful purposes and in a manner that does not infringe on the rights of others. You agree <strong>not</strong> to:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2"><span className="text-emerald-600 mt-1">•</span><span>Use automated systems (bots, scrapers) to access the website without our written permission.</span></li>
                <li className="flex items-start gap-2"><span className="text-emerald-600 mt-1">•</span><span>Reproduce, distribute, or create derivative works of our content without authorization.</span></li>
                <li className="flex items-start gap-2"><span className="text-emerald-600 mt-1">•</span><span>Attempt to interfere with the website&apos;s proper functioning or security measures.</span></li>
                <li className="flex items-start gap-2"><span className="text-emerald-600 mt-1">•</span><span>Use the website to transmit spam, malware, or other harmful content.</span></li>
              </ul>
            </section>

            <hr className="border-gray-200" />

            {/* 8. Intellectual Property */}
            <section id="intellectual-property">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">8. Intellectual Property</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                The content, organization, graphics, design, compilation, and other matters related to FSI Digital are protected under applicable copyright, trademark, and other proprietary laws. All original content, including but not limited to articles, guides, analysis, graphics, and logos, is the property of FSI Digital. You may not copy, reproduce, distribute, publish, display, or create derivative works from our content without express written permission, except for personal, non-commercial use with proper attribution.
              </p>
            </section>

            <hr className="border-gray-200" />

            {/* 9. Third-Party Links */}
            <section id="third-party-links">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-cyan-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">9. Third-Party Links</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Our website contains links to third-party websites, including official government agency portals, consulting service providers, and other external resources. These links are provided for your convenience and informational purposes. FSI Digital is not responsible for the content, accuracy, privacy practices, or opinions expressed on these external websites. Inclusion of any linked website does not imply approval or endorsement by FSI Digital.
              </p>
            </section>

            <hr className="border-gray-200" />

            {/* 10. Advertising */}
            <section id="advertising">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Advertising</h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                This website displays advertisements served by third-party ad networks, including Google AdSense. These advertisements may use cookies and similar technologies to serve ads based on your browsing history. For more information about how advertising data is collected and used, please refer to our <a href="/privacy" className="text-emerald-600 hover:text-emerald-800 underline">Privacy Policy</a>.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We may also receive referral fees if you choose to work with one of our recommended consulting partners. However, this <strong>never influences</strong> our editorial ranking of government programs or the accuracy of our content. Our editorial independence is outlined in our <a href="/editorial-policy" className="text-emerald-600 hover:text-emerald-800 underline">Editorial Policy</a>.
              </p>
            </section>

            <hr className="border-gray-200" />

            {/* 11. Limitation of Liability */}
            <section id="limitation">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Limitation of Liability</h2>
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <p className="text-red-800 text-sm leading-relaxed">
                  To the maximum extent permitted by applicable law, FSI Digital and its owners, operators, affiliates, and contributors shall <strong>not</strong> be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, business opportunities, or goodwill, arising from your use of or inability to use this website, reliance on information provided, or any action taken based on the content of this website — even if we have been advised of the possibility of such damages.
                </p>
              </div>
            </section>

            <hr className="border-gray-200" />

            {/* 12. Indemnification */}
            <section id="indemnification">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Indemnification</h2>
              <p className="text-gray-600 leading-relaxed">
                You agree to indemnify, defend, and hold harmless FSI Digital and its officers, directors, employees, agents, and affiliates from and against any and all claims, liabilities, damages, losses, costs, and expenses (including reasonable attorney&apos;s fees) arising from your use of the website, violation of these Terms, or infringement of any intellectual property or other rights of any person or entity.
              </p>
            </section>

            <hr className="border-gray-200" />

            {/* 13. Governing Law */}
            <section id="governing-law">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Governing Law</h2>
              <p className="text-gray-600 leading-relaxed">
                These Terms of Service shall be governed by and construed in accordance with the laws of Canada, without regard to its conflict of law provisions. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts located in Canada.
              </p>
            </section>

            <hr className="border-gray-200" />

            {/* 14. Changes */}
            <section id="changes-terms">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Changes to These Terms</h2>
              <p className="text-gray-600 leading-relaxed">
                We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting on this website. The &quot;Last Updated&quot; date at the top of this page indicates when the most recent revisions were made. Your continued use of the website after any changes constitutes your acceptance of the modified terms. We encourage you to review these Terms periodically.
              </p>
            </section>

            <hr className="border-gray-200" />

            {/* 15. Contact */}
            <section id="contact-terms">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">15. Contact Information</h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                If you have any questions or concerns about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-50 rounded-xl p-6">
                <p className="font-semibold text-gray-800 mb-1">FSI Digital</p>
                <p className="text-gray-600 text-sm">Email: <a href="mailto:hello@fsidigital.ca" className="text-emerald-600 hover:text-emerald-800 underline">hello@fsidigital.ca</a></p>
                <p className="text-gray-600 text-sm">Website: <a href="https://www.fsidigital.ca" className="text-emerald-600 hover:text-emerald-800 underline">www.fsidigital.ca</a></p>
                <p className="text-gray-600 text-sm">Contact Page: <a href="https://www.fsidigital.ca/contact" className="text-emerald-600 hover:text-emerald-800 underline">www.fsidigital.ca/contact</a></p>
              </div>
            </section>

          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
