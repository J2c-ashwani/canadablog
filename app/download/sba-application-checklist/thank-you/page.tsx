import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Download, ArrowRight, Mail } from "lucide-react";
import Link from "next/link";

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
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-500 to-blue-500 rounded-full mb-6 animate-bounce">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Check Your Email! 📧
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Your SBA Application Checklist is on its way to your inbox.
            </p>
          </div>

          <Card className="p-8 bg-white mb-8">
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Check your inbox</h3>
                  <p className="text-gray-600">Look for an email from us with subject "Your SBA Application Checklist"</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-green-600 font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Download the checklist</h3>
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
                    <strong>Didn't receive the email?</strong> Check your spam folder or contact us at support@grantfinder.pro
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

          <Card className="p-8 bg-gradient-to-r from-blue-600 to-green-600 text-white text-center">
            <h3 className="text-2xl font-bold mb-3">Need More Help?</h3>
            <p className="mb-6 text-blue-100">
              Explore our complete library of grant application guides and resources
            </p>
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100" asChild>
              <Link href="/guides">
                Browse All Guides <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </Card>

        </div>
      </div>
      <Footer />
    </>
  );
}
