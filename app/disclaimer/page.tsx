import React from 'react'
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function Disclaimer() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Disclaimer</h1>
          <div className="bg-white rounded-lg shadow-sm p-8 prose max-w-none">
            <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
            
            <h2>Information Accuracy</h2>
            <p>While we strive to provide accurate and up-to-date information about government grants and funding opportunities, program details, eligibility requirements, and funding amounts may change without notice. Government agencies frequently update their programs, deadlines, and criteria.</p>
            <p><strong>Always verify information with official government sources before making any decisions or submitting applications.</strong></p>

            <h2>No Guarantee of Funding</h2>
            <p>The information and educational content provided on this website do not guarantee that you will receive grant funding. Success in obtaining grants depends on numerous factors including but not limited to:</p>
            <ul>
              <li>Meeting all eligibility requirements</li>
              <li>Quality and completeness of your application</li>
              <li>Level of competition from other applicants</li>
              <li>Available funding at the time of application</li>
              <li>Government agency decisions and priorities</li>
              <li>Economic and political factors affecting funding availability</li>
            </ul>

            <h2>Educational Purpose Only</h2>
            <p>The content on this website is provided for informational and educational purposes only and should not be considered as:</p>
            <ul>
              <li>Professional legal advice</li>
              <li>Financial consultation</li>
              <li>Business planning services</li>
              <li>Grant application preparation services</li>
              <li>Personalized funding recommendations</li>
            </ul>
            <p>Consult with qualified professionals for advice specific to your situation and business needs.</p>

            <h2>Government Affiliation</h2>
            <p>Grant Finder Pro is <strong>not affiliated with, endorsed by, or sponsored by any government agency</strong>, including but not limited to:</p>
            <ul>
              <li>Small Business Administration (SBA)</li>
              <li>U.S. Department of Agriculture (USDA)</li>
              <li>Department of Energy (DOE)</li>
              <li>National Science Foundation (NSF)</li>
              <li>Innovation, Science and Economic Development Canada</li>
              <li>Any federal, state, provincial, or local government entity</li>
            </ul>
            <p>We are an independent information and research service providing educational content about publicly available funding programs.</p>

            <h2>External Links and References</h2>
            <p>Our website contains links to external websites, including official government portals, agency websites, and other resources. We are not responsible for:</p>
            <ul>
              <li>The content, accuracy, or availability of external sites</li>
              <li>The privacy practices of linked websites</li>
              <li>Any damages or issues arising from your use of external sites</li>
              <li>Changes to external website content or structure</li>
            </ul>

            <h2>Program Changes and Updates</h2>
            <p>Government funding programs are subject to:</p>
            <ul>
              <li>Legislative changes and budget allocations</li>
              <li>Policy updates and regulatory modifications</li>
              <li>Seasonal availability and funding cycles</li>
              <li>Emergency suspensions or program terminations</li>
            </ul>
            <p>We make reasonable efforts to update our information regularly, but cannot guarantee real-time accuracy of all program details.</p>

            <h2>Individual Results May Vary</h2>
            <p>Success stories, case studies, and examples provided on this website represent individual experiences and results. These should not be interpreted as typical results or guarantees of similar outcomes for other applicants.</p>

            <h2>Application Responsibility</h2>
            <p>Users are solely responsible for:</p>
            <ul>
              <li>Verifying their eligibility for any funding program</li>
              <li>Preparing and submitting their own applications</li>
              <li>Meeting all deadlines and requirements</li>
              <li>Complying with all program terms and conditions</li>
              <li>Maintaining accurate records and reporting</li>
            </ul>

            <h2>Limitation of Liability</h2>
            <p>Under no circumstances shall Grant Finder Pro be liable for any direct, indirect, incidental, consequential, or punitive damages arising from:</p>
            <ul>
              <li>Use of or inability to use this website</li>
              <li>Reliance on information provided</li>
              <li>Missed opportunities or failed applications</li>
              <li>Changes in government programs or policies</li>
              <li>Technical issues or website downtime</li>
            </ul>

            <h2>Geographic Scope</h2>
            <p>Our content primarily focuses on government funding programs available in the United States and Canada. Information about programs in other countries may be limited or outdated.</p>

            <h2>Questions and Concerns</h2>
            <p>If you have questions about this disclaimer or concerns about information accuracy, please contact us at <strong>info@grantfinderpro.com</strong>. We welcome feedback and work continuously to improve our content quality.</p>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mt-8">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    <strong>Important Reminder:</strong> Always verify grant information directly with the official government agency or program administrator before making any business decisions or submitting applications.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
