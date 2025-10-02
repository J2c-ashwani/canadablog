import React from 'react'
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function About() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-16">
          <div className="max-w-6xl mx-auto px-6">
            <h1 className="text-5xl font-bold mb-6">About Grant Finder Pro</h1>
            <p className="text-xl text-blue-100 max-w-3xl">
              North America's most comprehensive resource for government funding information, helping entrepreneurs and businesses navigate the complex world of grants and funding opportunities.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-16">
          {/* Mission Section */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-700 text-lg mb-4">
                We believe that access to funding information should be free, comprehensive, and easy to understand. Our mission is to democratize knowledge about government grants and funding opportunities across the United States and Canada.
              </p>
              <p className="text-gray-700 text-lg">
                Through detailed research, expert analysis, and regular updates, we transform complex government documentation into actionable insights that businesses can actually use to secure funding.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">What We Provide</h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-2xl font-bold text-blue-600 mb-2">2,000+</h3>
                  <p className="text-gray-600">Programs Tracked</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-2xl font-bold text-green-600 mb-2">Daily</h3>
                  <p className="text-gray-600">Content Updates</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-2xl font-bold text-purple-600 mb-2">100%</h3>
                  <p className="text-gray-600">Free Information</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-2xl font-bold text-orange-600 mb-2">Expert</h3>
                  <p className="text-gray-600">Analysis & Insights</p>
                </div>
              </div>
            </div>
          </div>

          {/* Information Coverage Section */}
          <div className="bg-white rounded-lg p-8 shadow-sm mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Comprehensive Coverage</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold text-blue-600 mb-4">Federal Programs</h3>
                <p className="text-gray-700">In-depth coverage of SBA, USDA, DOE, NSF, HUD, VA, and EPA programs across both the US and Canada, with detailed eligibility requirements and application guidance.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-green-600 mb-4">Regional & State Programs</h3>
                <p className="text-gray-700">Comprehensive information on state-level initiatives, regional development agencies, and provincial programs that often have less competition.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-purple-600 mb-4">Industry Intelligence</h3>
                <p className="text-gray-700">Specialized insights across manufacturing, healthcare, technology, agriculture, clean energy, and emerging industries with sector-specific opportunities.</p>
              </div>
            </div>
          </div>

          {/* How We Help Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How We Help Businesses Succeed</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-blue-800 mb-4">📚 Educational Content</h3>
                <p className="text-gray-700 mb-4">We break down complex government requirements into understandable guides, helping you identify the right programs for your business.</p>
                <ul className="text-gray-600 space-y-2 text-sm">
                  <li>• Step-by-step application guides</li>
                  <li>• Eligibility requirement explanations</li>
                  <li>• Success stories and case studies</li>
                  <li>• Common mistakes to avoid</li>
                </ul>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-green-800 mb-4">📊 Market Intelligence</h3>
                <p className="text-gray-700 mb-4">Stay informed about funding trends, deadline alerts, and emerging opportunities in your industry and region.</p>
                <ul className="text-gray-600 space-y-2 text-sm">
                  <li>• Real-time funding opportunity alerts</li>
                  <li>• Industry-specific program updates</li>
                  <li>• Regional funding landscape analysis</li>
                  <li>• Application success rate data</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Research Methodology Section */}
          <div className="bg-white rounded-lg p-8 shadow-sm mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Research Methodology</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h4 className="font-bold text-gray-800 mb-2">Monitor</h4>
                <p className="text-gray-600 text-sm">Daily monitoring of 2,000+ funding programs across federal, state, and provincial levels.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 font-bold">2</span>
                </div>
                <h4 className="font-bold text-gray-800 mb-2">Analyze</h4>
                <p className="text-gray-600 text-sm">Expert analysis of program requirements, success factors, and application strategies.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-600 font-bold">3</span>
                </div>
                <h4 className="font-bold text-gray-800 mb-2">Simplify</h4>
                <p className="text-gray-600 text-sm">Transform complex government language into clear, actionable information.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-orange-600 font-bold">4</span>
                </div>
                <h4 className="font-bold text-gray-800 mb-2">Share</h4>
                <p className="text-gray-600 text-sm">Publish comprehensive guides and insights to help businesses succeed.</p>
              </div>
            </div>
          </div>

          {/* Values & Commitment */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Commitment to You</h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto mb-8">
              We're committed to providing the most accurate, up-to-date, and comprehensive government funding information available. Our goal is to level the playing field so that businesses of all sizes can compete for and secure the funding they need to grow and innovate.
            </p>
            
            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Stay Informed</h3>
              <p className="text-gray-700 mb-6">Join thousands of entrepreneurs and business owners who rely on our insights to stay ahead of funding opportunities.</p>
              <div className="max-w-md mx-auto flex gap-3">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-green-700">
                  Get Updates
                </button>
              </div>
              <p className="text-gray-500 text-xs mt-2">Free insights, no spam, unsubscribe anytime.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
