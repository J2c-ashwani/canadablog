import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { AIGrantFinderForm } from "@/components/ai-grant-finder-form"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Target, Clock, CheckCircle, Brain } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI Business Grant Finder | Find Perfect Grants for Your Business",
  description:
    "Use our AI-powered grant finder to discover personalized government funding opportunities. Answer a few questions and get matched with relevant grants.",
  keywords:
    "AI grant finder, business grant finder, grant matching tool, personalized grants, government funding finder",
  openGraph: {
    title: "AI Business Grant Finder | Find Perfect Grants for Your Business",
    description: "Use our AI-powered grant finder to discover personalized government funding opportunities.",
    url: "https://grantfinder.pro/grant-finder",
  },
}

export default function GrantFinderPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 to-blue-600 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/20 text-white border-white/30">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Grant Matching
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
              Find the Perfect Grants for{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Your Business
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100 leading-relaxed text-pretty">
              Answer a few questions about your business and let our AI find the most relevant government grants and
              funding opportunities for you.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How Our AI Grant Finder Works</h2>
            <p className="text-xl text-gray-600">Get personalized grant recommendations in 3 simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Tell Us About Your Business</h3>
              <p className="text-gray-600">
                Share details about your location, industry, business stage, and funding needs.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">AI Analyzes & Matches</h3>
              <p className="text-gray-600">
                Our AI reviews 800+ grants and finds the best matches based on your criteria.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Get Your Results</h3>
              <p className="text-gray-600">
                Receive a personalized list of grants with application details and deadlines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Grant Finder Form */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <AIGrantFinderForm />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Use Our AI Grant Finder?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Save time and increase your chances of finding the right funding opportunities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Target className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4">Personalized Results</h3>
                <p className="text-gray-600">Get grants specifically matched to your business profile and needs.</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4">Save Time</h3>
                <p className="text-gray-600">No more hours of manual searching through hundreds of grant programs.</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4">Higher Success Rate</h3>
                <p className="text-gray-600">Apply to grants you're more likely to qualify for and win.</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Sparkles className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4">Always Updated</h3>
                <p className="text-gray-600">Our database is constantly updated with new grants and opportunities.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
