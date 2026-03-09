import React from 'react'
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import type { Metadata } from "next"
import { Shield, Cookie, Eye, Lock, Bell, Users, ExternalLink, Mail } from "lucide-react"

export const metadata: Metadata = {
  title: "Privacy Policy | FSI Digital — How We Protect Your Data",
  description: "Learn how FSI Digital collects, uses, and protects your personal information. Our privacy policy covers cookies, Google AdSense, analytics, and your data rights.",
  alternates: {
    canonical: "https://www.fsidigital.ca/privacy",
  },
  robots: { index: true, follow: true },
}

export default function PrivacyPolicy() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-800 py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <Shield className="w-4 h-4" />
              Your Privacy Matters
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
              We are committed to protecting your privacy and being transparent about how we handle your information.
            </p>
            <p className="text-emerald-200/80 text-sm mt-4">
              Effective Date: January 1, 2026 &nbsp;·&nbsp; Last Updated: March 9, 2026
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-6 py-12">
          
          {/* Table of Contents */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 mb-10">
            <h2 className="text-lg font-semibold text-emerald-900 mb-3">📋 What&apos;s in This Policy</h2>
            <ol className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <li><a href="#information-we-collect" className="text-emerald-700 hover:text-emerald-900 hover:underline">1. Information We Collect</a></li>
              <li><a href="#how-we-use" className="text-emerald-700 hover:text-emerald-900 hover:underline">2. How We Use Your Information</a></li>
              <li><a href="#cookies" className="text-emerald-700 hover:text-emerald-900 hover:underline">3. Cookies &amp; Tracking Technologies</a></li>
              <li><a href="#google-adsense" className="text-emerald-700 hover:text-emerald-900 hover:underline">4. Google AdSense &amp; Advertising</a></li>
              <li><a href="#google-analytics" className="text-emerald-700 hover:text-emerald-900 hover:underline">5. Google Analytics</a></li>
              <li><a href="#third-party" className="text-emerald-700 hover:text-emerald-900 hover:underline">6. Third-Party Services</a></li>
              <li><a href="#data-sharing" className="text-emerald-700 hover:text-emerald-900 hover:underline">7. Data Sharing &amp; Disclosure</a></li>
              <li><a href="#data-security" className="text-emerald-700 hover:text-emerald-900 hover:underline">8. Data Security</a></li>
              <li><a href="#your-rights" className="text-emerald-700 hover:text-emerald-900 hover:underline">9. Your Rights &amp; Choices</a></li>
              <li><a href="#children" className="text-emerald-700 hover:text-emerald-900 hover:underline">10. Children&apos;s Privacy</a></li>
              <li><a href="#international" className="text-emerald-700 hover:text-emerald-900 hover:underline">11. International Users</a></li>
              <li><a href="#changes" className="text-emerald-700 hover:text-emerald-900 hover:underline">12. Changes to This Policy</a></li>
              <li><a href="#contact" className="text-emerald-700 hover:text-emerald-900 hover:underline">13. Contact Us</a></li>
            </ol>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 space-y-10">

            {/* 1. Information We Collect */}
            <section id="information-we-collect">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">1. Information We Collect</h2>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mt-5 mb-2">Information You Provide Directly</h3>
              <p className="text-gray-600 leading-relaxed mb-3">
                When you interact with FSI Digital, you may voluntarily provide us with personal information, including:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2"><span className="text-emerald-600 mt-1">•</span><span><strong>Contact Information:</strong> Name, email address, phone number when subscribing to our newsletter or contacting us.</span></li>
                <li className="flex items-start gap-2"><span className="text-emerald-600 mt-1">•</span><span><strong>Business Information:</strong> Company name, industry, and location when requesting grant consultation services.</span></li>
                <li className="flex items-start gap-2"><span className="text-emerald-600 mt-1">•</span><span><strong>Communication Data:</strong> Messages, feedback, and inquiries you send through our contact forms.</span></li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mt-5 mb-2">Information Collected Automatically</h3>
              <p className="text-gray-600 leading-relaxed mb-3">
                When you visit our website, we automatically collect certain technical information, including:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2"><span className="text-emerald-600 mt-1">•</span><span><strong>Device Information:</strong> Browser type, operating system, device type, and screen resolution.</span></li>
                <li className="flex items-start gap-2"><span className="text-emerald-600 mt-1">•</span><span><strong>Usage Data:</strong> Pages visited, time spent on pages, click patterns, and referring URLs.</span></li>
                <li className="flex items-start gap-2"><span className="text-emerald-600 mt-1">•</span><span><strong>IP Address:</strong> Your Internet Protocol address, which may indicate your general geographic location.</span></li>
              </ul>
            </section>

            <hr className="border-gray-200" />

            {/* 2. How We Use */}
            <section id="how-we-use">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">2. How We Use Your Information</h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">We use the information we collect for the following purposes:</p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2"><span className="text-emerald-600 mt-1">•</span><span>To provide, maintain, and improve our grant information services and educational content.</span></li>
                <li className="flex items-start gap-2"><span className="text-emerald-600 mt-1">•</span><span>To send you grant opportunity alerts, funding deadlines, and educational newsletters (only if you opt in).</span></li>
                <li className="flex items-start gap-2"><span className="text-emerald-600 mt-1">•</span><span>To respond to your inquiries, feedback, and support requests.</span></li>
                <li className="flex items-start gap-2"><span className="text-emerald-600 mt-1">•</span><span>To analyze website traffic, user behavior, and content performance to improve our services.</span></li>
                <li className="flex items-start gap-2"><span className="text-emerald-600 mt-1">•</span><span>To display relevant advertisements through Google AdSense (see Section 4).</span></li>
                <li className="flex items-start gap-2"><span className="text-emerald-600 mt-1">•</span><span>To detect, prevent, and address technical issues, fraud, or security concerns.</span></li>
                <li className="flex items-start gap-2"><span className="text-emerald-600 mt-1">•</span><span>To comply with legal obligations and protect our rights.</span></li>
              </ul>
            </section>

            <hr className="border-gray-200" />

            {/* 3. Cookies */}
            <section id="cookies">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                  <Cookie className="w-5 h-5 text-amber-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">3. Cookies &amp; Tracking Technologies</h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our website uses cookies and similar tracking technologies to enhance your browsing experience. A cookie is a small text file stored on your device by your web browser.
              </p>
              <h3 className="text-lg font-semibold text-gray-800 mt-5 mb-3">Types of Cookies We Use</h3>
              <div className="space-y-3">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="font-semibold text-gray-800">Essential Cookies</p>
                  <p className="text-gray-600 text-sm">Required for the website to function properly (e.g., session management, security).</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="font-semibold text-gray-800">Analytics Cookies</p>
                  <p className="text-gray-600 text-sm">Help us understand how visitors interact with our website (e.g., Google Analytics).</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="font-semibold text-gray-800">Advertising Cookies</p>
                  <p className="text-gray-600 text-sm">Used by Google AdSense and third-party ad networks to serve personalized advertisements based on your browsing history.</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="font-semibold text-gray-800">Preference Cookies</p>
                  <p className="text-gray-600 text-sm">Remember your settings and preferences for a better experience on return visits.</p>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed mt-4">
                You can manage or disable cookies through your browser settings. Please note that disabling certain cookies may affect the functionality of our website.
              </p>
            </section>

            <hr className="border-gray-200" />

            {/* 4. Google AdSense */}
            <section id="google-adsense">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                  <ExternalLink className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">4. Google AdSense &amp; Advertising</h2>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-4">
                <p className="text-blue-800 font-semibold mb-2">📢 Important Disclosure</p>
                <p className="text-blue-700 text-sm leading-relaxed">
                  This website uses Google AdSense, a web advertising service provided by Google LLC (&quot;Google&quot;). Google AdSense uses cookies, including the DoubleClick cookie, to serve advertisements based on your prior visits to this website and other websites on the Internet.
                </p>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2"><span className="text-emerald-600 mt-1">•</span><span><strong>Third-party vendors,</strong> including Google, use cookies to serve ads based on your prior visits to this website or other websites.</span></li>
                <li className="flex items-start gap-2"><span className="text-emerald-600 mt-1">•</span><span><strong>Google&apos;s use of advertising cookies</strong> enables it and its partners to serve ads based on your visit to this site and/or other sites on the Internet.</span></li>
                <li className="flex items-start gap-2"><span className="text-emerald-600 mt-1">•</span><span><strong>You may opt out</strong> of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-800 underline">Google Ads Settings</a>.</span></li>
                <li className="flex items-start gap-2"><span className="text-emerald-600 mt-1">•</span><span><strong>Alternatively,</strong> you can opt out of third-party vendor cookies for personalized advertising by visiting <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-800 underline">www.aboutads.info</a>.</span></li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-4">
                We do not have access to or control over cookies that are used by third-party advertisers. We encourage you to review the privacy policies of these third-party ad servers for more detailed information on their practices.
              </p>
            </section>

            <hr className="border-gray-200" />

            {/* 5. Google Analytics */}
            <section id="google-analytics">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">5. Google Analytics</h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-3">
                We use Google Analytics, a web analytics service provided by Google LLC, to analyze website traffic and user behavior. Google Analytics uses cookies to collect information, including:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2"><span className="text-emerald-600 mt-1">•</span><span>Pages visited and time spent on each page.</span></li>
                <li className="flex items-start gap-2"><span className="text-emerald-600 mt-1">•</span><span>Your approximate geographic location (city/country level).</span></li>
                <li className="flex items-start gap-2"><span className="text-emerald-600 mt-1">•</span><span>The website or search engine that referred you to our site.</span></li>
                <li className="flex items-start gap-2"><span className="text-emerald-600 mt-1">•</span><span>Your browser type, device, and operating system.</span></li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-3">
                You can opt out of Google Analytics by installing the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-800 underline">Google Analytics Opt-out Browser Add-on</a>.
              </p>
            </section>

            <hr className="border-gray-200" />

            {/* 6. Third-Party */}
            <section id="third-party">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Third-Party Services</h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                Our website may contain links to third-party websites, including official government agency portals. We are not responsible for the privacy practices or content of these external sites. We encourage you to read the privacy policies of any third-party website you visit.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We may also use third-party service providers for email delivery, hosting, and other operational purposes. These providers may have access to your personal information only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
              </p>
            </section>

            <hr className="border-gray-200" />

            {/* 7. Data Sharing */}
            <section id="data-sharing">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Data Sharing &amp; Disclosure</h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                We do <strong>not</strong> sell, trade, or rent your personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information with our business partners, trusted affiliates, and advertisers for the purposes outlined above.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or government agency).
              </p>
            </section>

            <hr className="border-gray-200" />

            {/* 8. Data Security */}
            <section id="data-security">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">8. Data Security</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Our website is served over HTTPS (SSL/TLS encryption), and we regularly review our security practices. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <hr className="border-gray-200" />

            {/* 9. Your Rights */}
            <section id="your-rights">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-teal-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">9. Your Rights &amp; Choices</h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-3">Depending on your jurisdiction, you may have the following rights:</p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2"><span className="text-emerald-600 mt-1">•</span><span><strong>Access:</strong> Request a copy of the personal data we hold about you.</span></li>
                <li className="flex items-start gap-2"><span className="text-emerald-600 mt-1">•</span><span><strong>Correction:</strong> Request correction of inaccurate or incomplete data.</span></li>
                <li className="flex items-start gap-2"><span className="text-emerald-600 mt-1">•</span><span><strong>Deletion:</strong> Request deletion of your personal data, subject to legal obligations.</span></li>
                <li className="flex items-start gap-2"><span className="text-emerald-600 mt-1">•</span><span><strong>Opt-Out:</strong> Unsubscribe from marketing emails at any time using the link in our emails.</span></li>
                <li className="flex items-start gap-2"><span className="text-emerald-600 mt-1">•</span><span><strong>Cookie Preferences:</strong> Manage cookie settings through your browser.</span></li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-3">
                To exercise any of these rights, please contact us at <a href="mailto:hello@fsidigital.ca" className="text-emerald-600 hover:text-emerald-800 underline">hello@fsidigital.ca</a>.
              </p>
            </section>

            <hr className="border-gray-200" />

            {/* 10. Children */}
            <section id="children">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Children&apos;s Privacy</h2>
              <p className="text-gray-600 leading-relaxed">
                Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately and we will take steps to remove such information.
              </p>
            </section>

            <hr className="border-gray-200" />

            {/* 11. International */}
            <section id="international">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. International Users</h2>
              <p className="text-gray-600 leading-relaxed">
                FSI Digital is based in Canada and primarily serves users in the United States and Canada. If you are accessing our website from outside these countries, please be aware that your information may be transferred to, stored, and processed in Canada or the United States. By using our website, you consent to the transfer of information to these countries, which may have different data protection laws than your country of residence.
              </p>
            </section>

            <hr className="border-gray-200" />

            {/* 12. Changes */}
            <section id="changes">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Changes to This Policy</h2>
              <p className="text-gray-600 leading-relaxed">
                We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements. When we make material changes, we will update the &quot;Last Updated&quot; date at the top of this page. We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.
              </p>
            </section>

            <hr className="border-gray-200" />

            {/* 13. Contact */}
            <section id="contact">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">13. Contact Us</h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us:
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
