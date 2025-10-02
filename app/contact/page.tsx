import React from 'react'
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function Contact() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
            <p className="text-xl text-gray-600">Questions about government funding? We're here to help with information and guidance.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">How can we help?</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>General Question</option>
                    <option>Program Information Request</option>
                    <option>Website Feedback</option>
                    <option>Content Suggestion</option>
                    <option>Technical Issue</option>
                    <option>Media Inquiry</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Tell us more about your question or how we can help..."></textarea>
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information & Resources */}
            <div>
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Get in Touch</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900">Email</h4>
                    <p className="text-gray-600">info@grantfinderpro.com</p>
                    <p className="text-gray-500 text-sm">We respond to all inquiries within 24 hours</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Response Time</h4>
                    <p className="text-gray-600">24-48 hours for most inquiries</p>
                    <p className="text-gray-500 text-sm">Faster responses for urgent program deadlines</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Best Times to Reach Us</h4>
                    <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                  </div>
                </div>
              </div>

              {/* FAQ/Help Section */}
              <div className="bg-green-50 rounded-lg p-8 mb-8">
                <h3 className="text-xl font-bold text-green-900 mb-4">📚 Quick Help Resources</h3>
                <p className="text-green-800 mb-4">Before contacting us, check out these helpful resources:</p>
                <ul className="space-y-2">
                  <li>
                    <a href="/blog" className="text-green-700 hover:text-green-900 text-sm font-medium">
                      • Browse our comprehensive grant guides →
                    </a>
                  </li>
                  <li>
                    <a href="/usa" className="text-green-700 hover:text-green-900 text-sm font-medium">
                      • Explore USA funding programs →
                    </a>
                  </li>
                  <li>
                    <a href="/canada" className="text-green-700 hover:text-green-900 text-sm font-medium">
                      • Discover Canada grant opportunities →
                    </a>
                  </li>
                </ul>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-blue-50 rounded-lg p-8">
                <h3 className="text-xl font-bold text-blue-900 mb-4">💡 Stay Informed</h3>
                <p className="text-blue-800 mb-4">Get the latest funding opportunities and application tips delivered to your inbox:</p>
                <div className="space-y-3">
                  <input 
                    type="email" 
                    placeholder="Enter your email address" 
                    className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    Subscribe to Grant Alerts
                  </button>
                  <p className="text-blue-600 text-xs">Free updates • No spam • Unsubscribe anytime</p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-16 bg-white rounded-lg shadow-sm p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-gray-800 mb-2">Do you charge for information?</h4>
                <p className="text-gray-600 text-sm mb-4">No, all of our grant information and resources are completely free. We believe funding information should be accessible to everyone.</p>
                
                <h4 className="font-bold text-gray-800 mb-2">Can you help me apply for grants?</h4>
                <p className="text-gray-600 text-sm mb-4">We provide comprehensive information and guidance, but you'll need to submit applications directly to the funding agencies. Our detailed guides walk you through the entire process.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-2">How often is your information updated?</h4>
                <p className="text-gray-600 text-sm mb-4">We monitor and update our database daily to ensure you have access to the most current funding opportunities and deadline information.</p>
                
                <h4 className="font-bold text-gray-800 mb-2">What if I can't find what I'm looking for?</h4>
                <p className="text-gray-600 text-sm">Contact us with your specific needs, and we'll help point you to the right resources or consider adding new content to address your question.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
