import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Linkedin, Award, BookOpen } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "About the Editor | Ashwani K. | FSI Digital",
    description: "Ashwani K. is a research-focused writer covering Canadian and U.S. government funding programs for startups and small businesses.",
    alternates: {
        canonical: "https://www.fsidigital.ca/about/author",
    },
}

export default function AuthorPage() {
    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-50">
                <section className="bg-white border-b border-gray-200">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-8">

                            {/* Profile Image Placeholer */}
                            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0 border-4 border-white shadow-lg overflow-hidden">
                                <span className="text-4xl text-slate-400 font-bold">AK</span>
                            </div>

                            <div className="text-center md:text-left">
                                <Badge variant="secondary" className="mb-3">Funding Research Writer</Badge>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">Ashwani K.</h1>
                                <p className="text-lg text-gray-600 mb-6">
                                    Research-focused writer covering Canadian and U.S. government funding programs for startups and small businesses.
                                </p>

                                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href="mailto:contact@fsidigital.ca">
                                            <Mail className="w-4 h-4 mr-2" />
                                            Contact
                                        </Link>
                                    </Button>
                                    <Button variant="outline" size="sm" disabled>
                                        <Linkedin className="w-4 h-4 mr-2" />
                                        LinkedIn
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-12">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
                        <div className="prose prose-lg max-w-none text-slate-700">
                            <h3>About the Editor</h3>
                            <p>
                                Ashwani K. is an independent funding research writer specializing in North American government grants, innovation funding programs, and public-sector business incentives.
                            </p>
                            <p>
                                He focuses on analyzing official program documentation, policy updates, and eligibility frameworks to help startups and growing companies better understand how public funding programs work in practice.
                            </p>

                            <h3>Editorial Focus</h3>
                            <p>
                                His work focuses on breaking down complex grant frameworks, eligibility criteria, and application processes into clear, practical guidance for founders and operators.
                            </p>
                            <p>
                                His research emphasizes clarity, accuracy, and responsible interpretation of publicly available information, with a focus on innovation, clean technology, advanced manufacturing, and business growth initiatives across Canada and the United States.
                            </p>

                            <div className="not-prose grid gap-4 my-8">
                                <Card className="bg-blue-50 border-blue-100">
                                    <CardContent className="p-4 flex items-start gap-4">
                                        <Award className="w-6 h-6 text-blue-600 mt-1" />
                                        <div>
                                            <h4 className="font-bold text-blue-900">Core Expertise</h4>
                                            <p className="text-sm text-blue-800">Innovation Funding, Clean Technology Grants, and Manufacturing Incentives.</p>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className="bg-green-50 border-green-100">
                                    <CardContent className="p-4 flex items-start gap-4">
                                        <BookOpen className="w-6 h-6 text-green-600 mt-1" />
                                        <div>
                                            <h4 className="font-bold text-green-900">Research Standards</h4>
                                            <p className="text-sm text-green-800">All content is based on official program guidelines and publicly available government sources.</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <h3>Transparency</h3>
                            <p>
                                All content is written for informational purposes and is based on official program guidelines and publicly available government sources.
                                We do not represent the Government of Canada or any other public body.
                                For our full editorial standards, please view our <Link href="/editorial-policy">Editorial Policy</Link>.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    )
}
