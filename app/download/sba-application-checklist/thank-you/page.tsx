import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Download, ArrowRight, Mail } from "lucide-react";
import Link from "next/link";
import { OTOUpsellCard } from "@/components/download/OTOUpsellCard";

export const metadata = {
  title: "Thank You! Check Your Email | SBA Application Checklist",
  description: "Your SBA application checklist has been sent to your email.",
};

export default function ThankYouPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-150 rounded-full mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
              Your SBA Application Checklist is On Its Way!
            </h1>
            <p className="text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
              We have emailed the complete PDF checklist and submission guidelines package to your business inbox.
            </p>
          </div>

          <Card className="p-8 hover:shadow-xs transition-shadow mb-8">
            <h2 className="text-lg font-bold text-slate-900 mb-6 border-b border-slate-100 pb-2">Next steps:</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-purple-600 font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Check your email</h3>
                  <p className="text-gray-600">The PDF has been sent to you. Check your spam if it doesn't arrive in 5 minutes</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-purple-600 font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Download the file</h3>
                  <p className="text-gray-600">Click the download link to get your comprehensive PDF checklist</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-purple-600 font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Start your application</h3>
                  <p className="text-gray-600">Use the checklist to gather documents and prepare your SBA application</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start">
                <Mail className="w-5 h-5 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-700">
                    <strong>Didn't receive the email?</strong> Check your spam folder or contact us at hello@fsidigital.ca
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Continue Learning</h3>
              <p className="text-gray-600 mb-4 text-sm">
                Read our comprehensive SBA application guide with step-by-step instructions
              </p>
              <Button className="w-full" asChild>
                <Link href="/guides/sba-application-process">
                  Read Full Guide <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Explore SBA Programs</h3>
              <p className="text-gray-600 mb-4 text-sm">
                Discover which SBA loan and grant programs are best for your business
              </p>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/blog/sba-loans-grants-guide">
                  View SBA Programs <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </Card>
          </div>

          <OTOUpsellCard guideName="SBA Application Checklist" />

        </div>
      </div>
      <Footer />
    </>
  );
}
