import React from 'react'
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

export default function PrivacyPolicy() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          <div className="bg-white rounded-lg shadow-sm p-8 prose max-w-none">
            <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
            
            <h2>Information We Collect</h2>
            <p>We collect information you provide directly to us, such as when you subscribe to our newsletter, request consultations, or contact us. This may include your name, email address, phone number, and business information.</p>

            <h2>How We Use Your Information</h2>
            <ul>
              <li>To provide and improve our services</li>
              <li>To send you grant opportunity alerts and educational content</li>
              <li>To respond to your inquiries and provide customer support</li>
              <li>To analyze website usage and improve user experience</li>
            </ul>

            <h2>Google AdSense</h2>
            <p>This website uses Google AdSense, a web advertising service. AdSense uses cookies to serve ads based on your visits to this site and other sites on the internet. You may opt out of personalized advertising by visiting Google's Ad Settings.</p>

            <h2>Google Analytics</h2>
            <p>We use Google Analytics to analyze website traffic. Google Analytics uses cookies to collect information about your use of our website. This information is used to compile reports and improve our services.</p>

            <h2>Cookies</h2>
            <p>Our website uses cookies to enhance your experience. You can choose to disable cookies through your browser settings, though this may affect website functionality.</p>

            <h2>Data Security</h2>
            <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>

            <h2>Contact Us</h2>
            <p>If you have questions about this Privacy Policy, please contact us at privacy@grantfinderpro.com</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
