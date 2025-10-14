"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Download, Mail, Gift } from "lucide-react"

interface NewsletterSignupProps {
  variant?: "default" | "compact" | "sidebar"
  showPdfOffer?: boolean
  title?: string
  description?: string
}

export function NewsletterSignup({
  variant = "default",
  showPdfOffer = true,
  title,
  description,
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // ✅ FIXED: Now calls /api/subscribe instead of /api/newsletter
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          email,
          name: ''
        }),
      })

      if (response.ok) {
        setIsSubmitted(true)
        // Keep email in state for PDF generation
      }
    } catch (error) {
      console.error("Newsletter signup error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownloadPDF = async () => {
    try {
      // Dynamic import to avoid SSR issues
      const jsPDF = (await import('jspdf')).default;
      const { generateGrantGuidePDF } = await import('@/lib/generate-pdf');
      
      const doc = generateGrantGuidePDF(email);
      doc.save('Ultimate-Grant-Application-Guide.pdf');
    } catch (error) {
      console.error('PDF generation error:', error);
      alert('Sorry, there was an error generating the PDF. Please try again.');
    }
  }

  if (isSubmitted) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="text-center">
            <CheckCircle className="mx-auto h-12 w-12 text-green-600 mb-4" />
            <h3 className="text-lg font-semibold text-green-800 mb-2">Welcome to Grant Finder Pro!</h3>
            <p className="text-green-700 mb-4">Check your email for your free PDF guide and weekly grant updates.</p>
            {showPdfOffer && (
              <Button
                onClick={handleDownloadPDF}
                className="bg-green-600 hover:bg-green-700"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Your Free Guide
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (variant === "compact") {
    return (
      <div className="flex flex-col sm:flex-row gap-2 max-w-md">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1"
        />
        <Button onClick={handleSubmit} disabled={isLoading || !email} className="bg-primary hover:bg-primary/90">
          {isLoading ? "Signing up..." : "Get Updates"}
        </Button>
      </div>
    )
  }

  if (variant === "sidebar") {
    return (
      <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2 mb-2">
            <Gift className="h-5 w-5 text-primary" />
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              Free Guide
            </Badge>
          </div>
          <CardTitle className="text-lg">Get Weekly Grant Updates</CardTitle>
          <CardDescription>Join 10,000+ entrepreneurs getting the latest funding opportunities</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" disabled={isLoading || !email} className="w-full bg-primary hover:bg-primary/90">
              <Mail className="mr-2 h-4 w-4" />
              {isLoading ? "Signing up..." : "Get Free Guide"}
            </Button>
          </form>
          <p className="text-xs text-muted-foreground mt-2 text-center">Unsubscribe anytime. No spam, ever.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Gift className="h-6 w-6 text-primary" />
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            Free PDF Guide
          </Badge>
        </div>
        <CardTitle className="text-2xl">{title || "Get the Ultimate Grant Guide"}</CardTitle>
        <CardDescription className="text-base">
          {description ||
            "Join 10,000+ entrepreneurs getting weekly funding opportunities + free 50-page grant application guide"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
              required
            />
            <Button type="submit" disabled={isLoading || !email} className="bg-primary hover:bg-primary/90 px-8">
              <Mail className="mr-2 h-4 w-4" />
              {isLoading ? "Signing up..." : "Get Free Guide"}
            </Button>
          </div>
        </form>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span>Weekly grant alerts</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span>Application templates</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span>Expert tips & strategies</span>
          </div>
        </div>

        <p className="text-xs text-muted-foreground mt-4 text-center">
          Unsubscribe anytime. No spam, ever. Your email is safe with us.
        </p>
      </CardContent>
    </Card>
  )
}
