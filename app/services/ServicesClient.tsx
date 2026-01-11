'use client';

import React from 'react'
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import Link from 'next/link'
import { Search, BookOpen, Bell, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react'

export default function ServicesClient() {
    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-50">
                {/* Hero Section */}
                <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-20">
                    <div className="max-w-6xl mx-auto px-6 text-center">
                        <h1 className="text-5xl font-bold mb-6">Our Services</h1>
                        <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                            Comprehensive tools and resources to help your business secure government funding in the USA and Canada.
                        </p>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto px-6 py-16">

                    {/* Main Services Grid */}
                    <div className="grid md:grid-cols-3 gap-8 mb-20">
                        {/* Grant Finder */}
                        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                                <Search className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Grant Finder Engine</h3>
                            <p className="text-gray-600 mb-6">
                                Access our powerful search database of over 2,000+ active government grants, loans, and tax credits. Filter by region, industry, and funding type to find the perfect match.
                            </p>
                            <Link href="/grant-finder" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800">
                                Start Searching <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </div>

                        {/* Learning Center */}
                        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                                <BookOpen className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Application Guides</h3>
                            <p className="text-gray-600 mb-6">
                                Step-by-step tutorials and expert guides on how to navigate complex application processes. We break down requirements into simple, actionable steps.
                            </p>
                            <Link href="/guides" className="inline-flex items-center text-green-600 font-semibold hover:text-green-800">
                                Browse Guides <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </div>

                        {/* Alerts & Monitoring */}
                        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                                <Bell className="w-8 h-8 text-purple-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Deadline Alerts</h3>
                            <p className="text-gray-600 mb-6">
                                Never miss an opportunity. Our system monitors thousands of programs daily and alerts you about new openings and approaching deadlines.
                            </p>
                            <Link href="/contact" className="inline-flex items-center text-purple-600 font-semibold hover:text-purple-800">
                                Get Alerts <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </div>
                    </div>

                    {/* Detailed Features Section */}
                    <div className="mb-20">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Businesses Trust Us</h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                We go beyond simple lists. We provide the intelligence and tools you need to succeed.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="space-y-6">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 mt-1">
                                            <CheckCircle className="w-6 h-6 text-green-500" />
                                        </div>
                                        <div className="ml-4">
                                            <h4 className="text-lg font-bold text-gray-900">Real-Time Updates</h4>
                                            <p className="text-gray-600">Our database is updated daily to reflect the latest program changes and new funding announcements.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 mt-1">
                                            <CheckCircle className="w-6 h-6 text-green-500" />
                                        </div>
                                        <div className="ml-4">
                                            <h4 className="text-lg font-bold text-gray-900">Expert Analysis</h4>
                                            <p className="text-gray-600">We analyze eligibility criteria to save you time applying for programs you don't qualify for.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 mt-1">
                                            <CheckCircle className="w-6 h-6 text-green-500" />
                                        </div>
                                        <div className="ml-4">
                                            <h4 className="text-lg font-bold text-gray-900">Cross-Border Coverage</h4>
                                            <p className="text-gray-600">Unified platform covering both USA and Canada markets, perfect for North American businesses.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-100 rounded-2xl p-8">
                                <div className="bg-white rounded-xl shadow-lg p-6">
                                    <div className="flex items-center mb-4">
                                        <TrendingUp className="w-6 h-6 text-blue-600 mr-3" />
                                        <h4 className="font-bold text-gray-900">Success Metrics</h4>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="text-gray-600">Programs Tracked</span>
                                                <span className="font-bold text-gray-900">2,000+</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="text-gray-600">Daily Updates</span>
                                                <span className="font-bold text-gray-900">24/7</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="bg-blue-900 rounded-2xl p-12 text-center text-white">
                        <h2 className="text-3xl font-bold mb-6">Ready to Find Funding?</h2>
                        <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                            Start searching our database today and discover the grants and loans your business qualifies for.
                        </p>
                        <div className="flex justify-center gap-4 flex-col sm:flex-row">
                            <Link href="/grant-finder" className="bg-white text-blue-900 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors">
                                Access Grant Finder
                            </Link>
                            <Link href="/contact" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white/10 transition-colors">
                                Contact Support
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    )
}
