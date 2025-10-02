"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Loader2, Search, Sparkles, ExternalLink, Target, CheckCircle } from "lucide-react"
import type { GrantFinderRequest, GrantFinderResponse } from "@/lib/ai-grant-matcher"
import { formatFundingRange } from "@/lib/grants-data"
import Link from "next/link"

export function AIGrantFinderForm() {
  const [formData, setFormData] = useState<Partial<GrantFinderRequest>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<GrantFinderResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/grant-finder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to process request")
      }

      const data: GrantFinderResponse = await response.json()
      setResults(data)
    } catch (err) {
      setError("Something went wrong. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const updateFormData = (field: keyof GrantFinderRequest, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (results) {
    return (
      <div className="space-y-8">
        {/* Results Header */}
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl">AI Grant Finder Results</CardTitle>
            <CardDescription className="text-lg">
              Found {results.totalMatches} personalized grant recommendations for your business
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Grant Matches */}
        {results.matches.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold flex items-center">
              <Target className="w-5 h-5 mr-2 text-primary" />
              Recommended Grants
            </h3>
            <div className="grid gap-6">
              {results.matches.map((match, index) => (
                <Card key={match.grant.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                            #{index + 1} Match
                          </Badge>
                          <Badge variant="outline">{Math.round(match.matchScore * 100)}% Match</Badge>
                          <Badge variant={match.grant.status === "Active" ? "default" : "secondary"}>
                            {match.grant.status}
                          </Badge>
                        </div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">{match.grant.name}</h4>
                        <p className="text-gray-600 mb-3">{match.grant.description}</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-gray-600">Funding Amount</div>
                        <div className="font-semibold text-green-600 text-lg">
                          {formatFundingRange(match.grant.fundingMin, match.grant.fundingMax)}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Deadline</div>
                        <div className="font-medium">{match.grant.deadline}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Agency</div>
                        <div className="font-medium">{match.grant.agency}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Region</div>
                        <div className="font-medium">{match.grant.region}</div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-sm text-gray-600 mb-2">Why this matches your business:</div>
                      <div className="space-y-1">
                        {match.matchReasons.map((reason, idx) => (
                          <div key={idx} className="flex items-center text-sm text-gray-700">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            {reason}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button className="flex-1" asChild>
                        <Link href={match.grant.applicationLink} target="_blank" rel="noopener noreferrer">
                          Apply Now <ExternalLink className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                      <Button variant="outline" className="flex-1 bg-transparent">
                        Save for Later
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations */}
        {results.recommendations.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-purple-500" />
                AI Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {results.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Next Steps */}
        {results.nextSteps.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
              <CardDescription>Follow these steps to start your grant application process</CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3">
                {results.nextSteps.map((step, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-0.5 flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-gray-700">{step}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        )}

        {/* Start Over Button */}
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => {
              setResults(null)
              setFormData({})
            }}
          >
            Start New Search
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Card className="shadow-xl">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
        </div>
        <CardTitle className="text-3xl font-bold">AI Grant Finder</CardTitle>
        <CardDescription className="text-lg">Get personalized grant recommendations powered by AI</CardDescription>
      </CardHeader>
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Business Location */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="country" className="text-base font-semibold">
                Country *
              </Label>
              <Select onValueChange={(value) => updateFormData("country", value as "USA" | "Canada")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USA">United States</SelectItem>
                  <SelectItem value="Canada">Canada</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="state" className="text-base font-semibold">
                State/Province *
              </Label>
              <Select onValueChange={(value) => updateFormData("state", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your state/province" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="california">California</SelectItem>
                  <SelectItem value="texas">Texas</SelectItem>
                  <SelectItem value="new-york">New York</SelectItem>
                  <SelectItem value="florida">Florida</SelectItem>
                  <SelectItem value="ontario">Ontario</SelectItem>
                  <SelectItem value="quebec">Quebec</SelectItem>
                  <SelectItem value="alberta">Alberta</SelectItem>
                  <SelectItem value="british-columbia">British Columbia</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Business Details */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="industry" className="text-base font-semibold">
                Industry *
              </Label>
              <Select onValueChange={(value) => updateFormData("industry", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="agriculture">Agriculture</SelectItem>
                  <SelectItem value="energy">Clean Energy</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="services">Professional Services</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="stage" className="text-base font-semibold">
                Business Stage *
              </Label>
              <Select onValueChange={(value) => updateFormData("businessStage", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your business stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="idea">Idea Stage</SelectItem>
                  <SelectItem value="startup">Startup (0-2 years)</SelectItem>
                  <SelectItem value="growth">Growth Stage (2-5 years)</SelectItem>
                  <SelectItem value="established">Established (5+ years)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Funding Details */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-base font-semibold">
                Funding Amount Needed
              </Label>
              <Select onValueChange={(value) => updateFormData("fundingAmount", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select funding range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-25k">Under $25,000</SelectItem>
                  <SelectItem value="25k-100k">$25,000 - $100,000</SelectItem>
                  <SelectItem value="100k-500k">$100,000 - $500,000</SelectItem>
                  <SelectItem value="500k-1m">$500,000 - $1,000,000</SelectItem>
                  <SelectItem value="over-1m">Over $1,000,000</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="purpose" className="text-base font-semibold">
                Funding Purpose
              </Label>
              <Select onValueChange={(value) => updateFormData("fundingPurpose", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select funding purpose" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="research">Research & Development</SelectItem>
                  <SelectItem value="equipment">Equipment & Technology</SelectItem>
                  <SelectItem value="expansion">Business Expansion</SelectItem>
                  <SelectItem value="hiring">Hiring & Training</SelectItem>
                  <SelectItem value="marketing">Marketing & Sales</SelectItem>
                  <SelectItem value="working-capital">Working Capital</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Business Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-base font-semibold">
              Business Description
            </Label>
            <Textarea
              placeholder="Briefly describe your business, products/services, and what makes you unique..."
              className="min-h-[120px]"
              onChange={(e) => updateFormData("businessDescription", e.target.value)}
            />
            <p className="text-sm text-gray-500">
              This helps our AI better understand your business and find more relevant grants.
            </p>
          </div>

          {/* Contact Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base font-semibold">
                Email Address *
              </Label>
              <Input
                type="email"
                placeholder="your@email.com"
                className="h-12"
                onChange={(e) => updateFormData("email", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company" className="text-base font-semibold">
                Company Name
              </Label>
              <Input
                type="text"
                placeholder="Your Company Name"
                className="h-12"
                onChange={(e) => updateFormData("companyName", e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <div className="text-center pt-6">
            <Button
              type="submit"
              size="lg"
              disabled={isLoading}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-12 py-4 text-lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Finding Your Grants...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5 mr-2" />
                  Find My Grants
                </>
              )}
            </Button>
            <p className="text-sm text-gray-500 mt-4">Results will be displayed instantly. No spam, ever.</p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
