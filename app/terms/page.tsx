import React from 'react'
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

export default function TermsOfService() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          <div className="bg-white rounded-lg shadow-sm p-8 prose max-w-none">
            <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
            
            <h2>Acceptance of Terms</h2>
            <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>

            <h2>Services</h2>
            <p>This website provides free information about government grants and funding opportunities. We offer educational content, research insights, and comprehensive guides to help businesses understand and navigate funding programs.</p>

            <h2>Disclaimer</h2>
            <p>The information on this website is for general information purposes only. We do not guarantee the accuracy, completeness, or timeliness of any information. Grant eligibility and funding amounts may change without notice. Always verify information with official government sources.</p>

            <h2>No Guarantee of Funding</h2>
            <p>Our information and educational content do not guarantee that you will receive grant funding. Success depends on many factors including eligibility, application quality, competition, and agency decisions. We provide information only and do not submit applications on your behalf.</p>

            <h2>Educational Purpose</h2>
            <p>Our content is provided for informational and educational purposes. Users remain responsible for their own grant research, applications, and compliance with all program requirements. We recommend consulting with qualified professionals for specific advice.</p>

            <h2>Intellectual Property</h2>
            <p>The content, organization, graphics, design, and other matters related to this website are protected under applicable copyrights and other proprietary laws. You may not reproduce, distribute, or create derivative works without our written permission.</p>

            <h2>User Conduct</h2>
            <p>You agree to use this website only for lawful purposes and in a way that does not infringe on the rights of others or restrict their use and enjoyment of the website.</p>

            <h2>Third-Party Links</h2>
            <p>Our website may contain links to third-party websites, including government agencies. We are not responsible for the content or practices of these external sites.</p>

            <h2>Changes to Terms</h2>
            <p>We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on this website. Your continued use constitutes acceptance of modified terms.</p>

            <h2>Limitation of Liability</h2>
            <p>We shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of this website or reliance on the information provided.</p>

            <h2>Contact Information</h2>
            <p>For questions about these Terms of Service, please contact us at legal@grantfinderpro.com</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
