import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Shield, FileText, Scale, UserCheck, AlertTriangle } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Editorial Policy & Standards | FSI Digital",
    description: "Our commitment to accuracy, independence, and transparency in reporting on government grants and business funding for USA and Canada.",
    alternates: {
        canonical: "https://www.fsidigital.ca/editorial-policy",
    },
    robots: { index: true, follow: true },
}

export default function EditorialPolicyPage() {
    return (
        <>
            <Header />
            <div className="min-h-screen bg-white">
                <section className="bg-slate-900 text-white py-16">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <h1 className="text-4xl font-bold mb-4">Editorial Policy & Standards</h1>
                        <p className="text-xl text-slate-300 max-w-2xl">
                            We operate with a strict code of ethics to ensure Canadian business owners receive accurate, unbiased, and actionable funding intelligence.
                        </p>
                    </div>
                </section>

                <section className="py-16">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">

                        <div className="grid gap-12">
                            {/* Core Principles */}
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                                    <Shield className="w-6 h-6 mr-3 text-blue-600" />
                                    Core Principles
                                </h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-lg">1. Independence</CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-slate-600 text-sm">
                                            Our content is researched and written independently of government agencies.
                                            We are a private entity and not affiliated with the Government of Canada or any provincial body.
                                            Government agencies do not pay for placement or coverage.
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-lg">2. Accuracy</CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-slate-600 text-sm">
                                            We verify all program details against official government sources (Canada.ca, Ontario.ca, etc.) at the time of publication.
                                            However, grant programs change rapidly. We commit to auditing our core "Hub Pages" monthly.
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>

                            {/* Review Process */}
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                                    <UserCheck className="w-6 h-6 mr-3 text-green-600" />
                                    Our Review Process
                                </h2>
                                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                                    <ul className="space-y-4">
                                        <li className="flex items-start">
                                            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                                            <div>
                                                <strong className="text-slate-900">Research Pivot:</strong>
                                                <p className="text-sm text-slate-600">Every article begins with a review of official program guidelines, not third-party aggregators.</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                                            <div>
                                                <strong className="text-slate-900">Expert Verification:</strong>
                                                <p className="text-sm text-slate-600">Content regarding complex eligibility (e.g. SR&ED, AgriInnovate) is reviewed by sector specialists.</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                                            <div>
                                                <strong className="text-slate-900">Human-First:</strong>
                                                <p className="text-sm text-slate-600">We do not publish unedited AI-generated content. All tools are used under strict human supervision for outlining and partial drafting, followed by human rewrite.</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Warnings & Disclaimers */}
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                                    <Scale className="w-6 h-6 mr-3 text-red-600" />
                                    Financial Disclaimer
                                </h2>
                                <div className="bg-red-50 p-6 rounded-xl border border-red-100">
                                    <div className="flex items-start mb-4">
                                        <AlertTriangle className="w-6 h-6 text-red-600 mr-3" />
                                        <p className="text-sm text-red-800 font-semibold">
                                            We are an informational publisher, not a law firm or financial advisor.
                                        </p>
                                    </div>
                                    <p className="text-sm text-slate-700 mb-4">
                                        The information provided on FSI Digital is for educational purposes only.
                                        Applying for government grants involves risk, and success is never guaranteed.
                                        Decisions to invest time or money in an application should be made with professional counsel.
                                    </p>
                                    <p className="text-sm text-slate-700">
                                        We may receive a referral fee if you choose to work with one of our recommended consulting partners,
                                        but this never influences our editorial ranking of government programs.
                                    </p>
                                </div>
                            </div>

                        </div>

                    </div>
                </section>
            </div>
            <Footer />
        </>
    )
}
