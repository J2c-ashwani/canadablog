"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Download, Loader2 } from "lucide-react"

export function DownloadForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    businessType: "",
    location: "",
    contactNumber: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          phone: formData.phone,
          name: formData.name,
          company: formData.businessName,
          guideName: "Indigenous Rural Funding Kit",
          industry: formData.businessType || "Indigenous/Rural Business",
          country: "Canada",
          additionalNotes: `Location: ${formData.location || "N/A"}, Phone: ${formData.contactNumber || "N/A"}`,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        router.push("/download/indigenous-rural-funding-kit/thank-you")
      } else {
        setError(data.error || "Failed to process download")
      }
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="shadow-lg border-amber-200">
      <CardHeader className="bg-gradient-to-r from-amber-600 to-orange-700 text-white rounded-t-lg">
        <CardTitle className="text-2xl">
          Download Your Free Indigenous & Rural Kit
        </CardTitle>
        <p className="text-sm text-amber-100 mt-2">
          Get culturally appropriate templates and rural business strategies
        </p>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Your Name"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="joseph@indigenousbusiness.ca"
              className="mt-1"
            />
          </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input 
                          id="phone" 
                          type="tel" 
                          required 
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+1 (555) 000-0000"
                          className="mt-1"
                        />
                      </div>

          <div>
            <Label htmlFor="businessName">Business Name/Concept *</Label>
            <Input
              id="businessName"
              required
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              placeholder="Your Indigenous or Rural Business"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="businessType">Business Type *</Label>
            <select
              id="businessType"
              required
              value={formData.businessType}
              onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-white text-gray-900 focus:border-amber-500 focus:ring-amber-500"
            >
              <option value="">Select business type</option>
              <option value="first-nations">First Nations Business</option>
              <option value="metis">Métis Business</option>
              <option value="inuit">Inuit Business</option>
              <option value="rural-non-indigenous">Rural Non-Indigenous Business</option>
              <option value="northern-remote">Northern/Remote Business</option>
              <option value="cultural-tourism">Cultural Tourism</option>
              <option value="traditional-crafts">Traditional Crafts/Arts</option>
              <option value="agriculture">Agriculture/Food Systems</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <Label htmlFor="location">Community/Location *</Label>
            <Input
              id="location"
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Community, Province/Territory"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="contactNumber">Phone Number *</Label>
            <Input
              id="contactNumber"
              type="tel"
              required
              value={formData.contactNumber}
              onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
              placeholder="+1 (555) 123-4567"
              className="mt-1"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          <div className="flex items-start pt-2">
            <input
              type="checkbox"
              id="consent"
              required
              className="mt-1 mr-3"
            />
            <label htmlFor="consent" className="text-xs text-gray-600">
              I agree to receive the Indigenous & rural business funding kit and occasional emails about 
              culturally appropriate funding opportunities. I understand my cultural information will be 
              respected and protected. I can unsubscribe at any time.
            </label>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Download className="w-5 h-5 mr-2" />
                Get Free Indigenous/Rural Kit
              </>
            )}
          </Button>

          <p className="text-xs text-center text-gray-500 mt-3">
            🔒 Your cultural information is secure and protected
          </p>
        </form>

        <div className="mt-6 pt-6 border-t">
          <p className="text-center text-sm text-gray-600 mb-2">
            <strong>Culturally Respectful + Business Expert Review</strong>
          </p>
        </div>

        <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-3">
          <div className="text-center text-xs text-amber-700">
            <strong>Special Bonus:</strong> Connect with Aboriginal Financial Institutions and Indigenous business networks
          </div>
        </div>

        <div className="mt-4 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-3">
          <div className="text-center text-xs">
            <strong className="text-orange-700">🏛️ Culturally Respectful:</strong> 
            <span className="text-gray-600"> Developed with Indigenous business leaders and elders</span>
          </div>
        </div>

        <div className="mt-4 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-3">
          <div className="text-center text-xs">
            <strong className="text-green-700">🌾 Rural Expertise:</strong> 
            <span className="text-gray-600"> Specialized support for remote and rural businesses</span>
          </div>
        </div>

        <div className="mt-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-3">
          <div className="text-center text-xs">
            <strong className="text-blue-700">🤝 Community-Focused:</strong> 
            <span className="text-gray-600"> Emphasizing community benefit and cultural preservation</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
