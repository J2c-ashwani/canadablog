// app/usa/[state]/page.tsx - Comprehensive State Grant Page (2500+ words)
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { GrantSuccessTable } from '@/components/blog/GrantSuccessTable';
import { ExpertTipBox } from '@/components/blog/ExpertTipBox';
import { GlobalGrantGuide } from '@/components/blog/GlobalGrantGuide';
import { getStateDetailBySlug, getAllStateDetails, getQueryBasedSections, getQueryExpanders, getRelatedGuides } from '@/lib/data/stateDetails';
import {

    ArrowLeft, DollarSign, Users, Briefcase, Target, Building, Zap, TrendingUp,
    Rocket, Mountain, Globe, Leaf, Cpu, Shield, Clock, Award, CheckCircle,
    AlertTriangle, FileText, ExternalLink, ChevronRight, List, HelpCircle,
    BookOpen, Lightbulb, MapPin, Grid, Home, Percent, Flag, AlertCircle
} from 'lucide-react';

const iconMap: Record<string, any> = {
    DollarSign, Users, Briefcase, Target, Building, Zap, TrendingUp, Rocket,
    Mountain, Globe, Leaf, Cpu, Shield, Clock, Award, CheckCircle, AlertTriangle,
    FileText, ExternalLink, List, HelpCircle, BookOpen, Lightbulb, MapPin,
    Grid, Home, Percent, Flag, AlertCircle
};

export async function generateStaticParams() {
    const states = getAllStateDetails();
    return states.map((state) => ({ state: state.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }): Promise<Metadata> {
    const { state: stateSlug } = await params;
    const state = getStateDetailBySlug(stateSlug);
    if (!state) return { title: 'State Not Found' };

    return {
        title: `${state.name} Small Business Grants 2026 | ${state.heroStats.totalFunding} Complete Funding Guide`,
        description: state.metaDescription,
        alternates: {
            canonical: `https://www.fsidigital.ca/usa/${state.slug}`,
        },
        robots: { index: true, follow: true },
        openGraph: {
            title: `${state.name} Small Business Grants 2026`,
            description: state.metaDescription,
            type: 'article',
        },
    };
}

export default async function StatePage({ params }: { params: Promise<{ state: string }> }) {
    const { state: stateSlug } = await params;
    const state = getStateDetailBySlug(stateSlug);
    if (!state) return notFound();

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": `${state.name} Small Business Grants 2026 - Complete Guide`,
        "description": state.metaDescription,
        "author": { "@type": "Organization", "name": "FSI Digital" },
        "publisher": { "@type": "Organization", "name": "FSI Digital" },
        "datePublished": new Date().toISOString(),
        "dateModified": new Date().toISOString(),
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": state.faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };

    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="py-8">
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

                <article className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                    {/* Breadcrumb */}
                    <nav className="mb-6">
                        <ol className="flex items-center space-x-2 text-sm text-gray-500">
                            <li><Link href="/" className="hover:text-green-600">Home</Link></li>
                            <ChevronRight className="w-4 h-4" />
                            <li><Link href="/usa" className="hover:text-green-600">USA Grants</Link></li>
                            <ChevronRight className="w-4 h-4" />
                            <li className="text-gray-900 font-medium">{state.name}</li>
                        </ol>
                    </nav>

                    {/* Hero Section */}
                    <header className="mb-12">
                        <Badge className="mb-4 bg-blue-100 text-blue-800">{state.region} Region</Badge>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            {state.name} Small Business Grants 2026
                        </h1>
                        <p className="text-xl text-gray-600 mb-6">
                            Complete guide to {state.heroStats.totalFunding} in {state.name} business funding across {state.heroStats.programCount} programs
                        </p>

                        {/* Hero Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-green-600">{state.heroStats.totalFunding}</div>
                                <div className="text-sm text-gray-600">Total Funding</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-blue-600">{state.heroStats.programCount}</div>
                                <div className="text-sm text-gray-600">Programs</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-purple-600">{state.heroStats.successRate}</div>
                                <div className="text-sm text-gray-600">Success Rate</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-orange-600">{state.heroStats.avgProcessingTime}</div>
                                <div className="text-sm text-gray-600">Processing Time</div>
                            </div>
                        </div>
                    </header>

                    {/* Table of Contents */}
                    <nav className="mb-12 p-6 bg-gray-50 rounded-xl">
                        <h2 className="text-lg font-bold mb-4">Table of Contents</h2>
                        <ul className="grid md:grid-cols-2 gap-2">
                            <li><a href="#overview" className="text-green-600 hover:underline">1. Overview</a></li>
                            <li><a href="#programs" className="text-green-600 hover:underline">2. Top Grant Programs</a></li>
                            <li><a href="#eligibility" className="text-green-600 hover:underline">3. Eligibility Requirements</a></li>
                            <li><a href="#application" className="text-green-600 hover:underline">4. Application Process</a></li>
                            <li><a href="#industries" className="text-green-600 hover:underline">5. Industry Focus</a></li>
                            <li><a href="#success" className="text-green-600 hover:underline">6. Success Stories</a></li>
                            <li><a href="#tips" className="text-green-600 hover:underline">7. Expert Tips</a></li>
                            <li><a href="#faqs" className="text-green-600 hover:underline">8. FAQs</a></li>
                            <li><a href="#common-questions" className="text-green-600 hover:underline">9. Common Questions</a></li>
                            <li><a href="#resources" className="text-green-600 hover:underline">10. Resources</a></li>
                            <li><a href="#related-programs" className="text-green-600 hover:underline">11. Related Programs</a></li>
                            <li><a href="#related-guides" className="text-green-600 hover:underline">12. Related Guides</a></li>
                        </ul>
                    </nav>

                    {/* Overview Section */}
                    <section id="overview" className="mb-12">
                        <h2 className="text-3xl font-bold mb-6 text-gray-900">
                            {state.name} Business Funding Overview
                        </h2>
                        <div className="prose prose-lg max-w-none">
                            <p className="text-gray-700 leading-relaxed mb-4">{state.overview.introduction}</p>
                            <h3 className="text-xl font-semibold mt-6 mb-3">Economic Landscape</h3>
                            <p className="text-gray-700 leading-relaxed mb-4">{state.overview.economicLandscape}</p>
                            <h3 className="text-xl font-semibold mt-6 mb-3">Key Opportunities in 2026</h3>
                            <p className="text-gray-700 leading-relaxed">{state.overview.keyOpportunities}</p>
                        </div>
                    </section>

                    {/* Top Programs Section */}
                    <section id="programs" className="mb-12">
                        <h2 className="text-3xl font-bold mb-6 text-gray-900">
                            Top {state.name} Grant Programs
                        </h2>
                        <div className="space-y-8">
                            {state.topPrograms.map((program, idx) => (
                                <Card key={idx} className="border-l-4 border-l-green-500">
                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <CardTitle className="text-xl text-gray-900">{program.name}</CardTitle>
                                                <CardDescription className="text-gray-600">{program.agency}</CardDescription>
                                            </div>
                                            <Badge className={`${program.fundingType === 'Grant' ? 'bg-green-100 text-green-800' : program.fundingType === 'Tax Credit' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                                                {program.fundingType}
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <span className="text-sm text-gray-500">Funding Amount</span>
                                                <p className="font-bold text-green-600">{program.fundingAmount}</p>
                                            </div>
                                            <div>
                                                <span className="text-sm text-gray-500">Success Rate</span>
                                                <p className="font-bold text-blue-600">{program.successRate}</p>
                                            </div>
                                            <div>
                                                <span className="text-sm text-gray-500">Deadline</span>
                                                <p className="font-medium">{program.deadline}</p>
                                            </div>
                                            <div>
                                                <span className="text-sm text-gray-500">Industries</span>
                                                <p className="font-medium">{program.industries.slice(0, 3).join(', ')}</p>
                                            </div>
                                        </div>
                                        <p className="text-gray-700 mb-4">{program.description}</p>
                                        <div className="mb-4">
                                            <h4 className="font-semibold mb-2">Eligibility Requirements:</h4>
                                            <ul className="list-disc list-inside text-gray-600 space-y-1">
                                                {program.eligibility.map((req, i) => (
                                                    <li key={i}>{req}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="mb-4">
                                            <h4 className="font-semibold mb-2">Application Process:</h4>
                                            <p className="text-gray-600">{program.applicationProcess}</p>
                                        </div>
                                        <a href={program.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-green-600 hover:underline">
                                            Visit Official Website <ExternalLink className="w-4 h-4 ml-1" />
                                        </a>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>

                    {/* Eligibility Section */}
                    <section id="eligibility" className="mb-12">
                        <h2 className="text-3xl font-bold mb-6 text-gray-900">
                            Eligibility Requirements
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center"><CheckCircle className="w-5 h-5 mr-2 text-green-600" />General Requirements</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2">
                                        {state.eligibility.generalRequirements.map((req, i) => (
                                            <li key={i} className="flex items-start">
                                                <CheckCircle className="w-4 h-4 mr-2 text-green-500 mt-1 flex-shrink-0" />
                                                <span className="text-gray-700">{req}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center"><Building className="w-5 h-5 mr-2 text-blue-600" />Eligible Business Types</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2">
                                        {state.eligibility.businessTypes.map((type, i) => (
                                            <li key={i} className="flex items-start">
                                                <CheckCircle className="w-4 h-4 mr-2 text-blue-500 mt-1 flex-shrink-0" />
                                                <span className="text-gray-700">{type}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>

                        <Card className="mb-6">
                            <CardHeader>
                                <CardTitle className="flex items-center"><AlertTriangle className="w-5 h-5 mr-2 text-red-600" />Restrictions & Exclusions</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="grid md:grid-cols-2 gap-2">
                                    {state.eligibility.restrictions.map((restriction, i) => (
                                        <li key={i} className="flex items-start">
                                            <AlertTriangle className="w-4 h-4 mr-2 text-red-500 mt-1 flex-shrink-0" />
                                            <span className="text-gray-700">{restriction}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center"><FileText className="w-5 h-5 mr-2 text-purple-600" />Required Documentation</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="grid md:grid-cols-2 gap-2">
                                    {state.eligibility.documentationNeeded.map((doc, i) => (
                                        <li key={i} className="flex items-start">
                                            <FileText className="w-4 h-4 mr-2 text-purple-500 mt-1 flex-shrink-0" />
                                            <span className="text-gray-700">{doc}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </section>

                    {/* Application Process Section */}
                    <section id="application" className="mb-12">
                        <h2 className="text-3xl font-bold mb-6 text-gray-900">
                            Application Process
                        </h2>

                        <div className="space-y-4 mb-8">
                            {state.applicationProcess.steps.map((step, idx) => (
                                <div key={idx} className="flex items-start p-4 bg-gray-50 rounded-lg">
                                    <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                                        {step.step}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-bold text-gray-900">{step.title}</h3>
                                            <Badge variant="outline">{step.timeframe}</Badge>
                                        </div>
                                        <p className="text-gray-600 mt-1">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Card className="bg-blue-50 border-blue-200">
                            <CardHeader>
                                <CardTitle className="flex items-center"><Lightbulb className="w-5 h-5 mr-2 text-blue-600" />Application Tips</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    {state.applicationProcess.tips.map((tip, i) => (
                                        <li key={i} className="flex items-start">
                                            <Lightbulb className="w-4 h-4 mr-2 text-blue-500 mt-1 flex-shrink-0" />
                                            <span className="text-gray-700">{tip}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </section>

                    {/* Industry Focus Section */}
                    <section id="industries" className="mb-12">
                        <h2 className="text-3xl font-bold mb-6 text-gray-900">
                            Industry Focus Areas
                        </h2>

                        <div className="space-y-4 mb-6">
                            {state.industryFocus.primary.map((industry, idx) => (
                                <Card key={idx}>
                                    <CardHeader>
                                        <div className="flex justify-between items-center">
                                            <CardTitle>{industry.name}</CardTitle>
                                            <Badge className="bg-green-100 text-green-800">{industry.funding}</Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-700">{industry.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <div className="bg-gray-50 p-6 rounded-xl">
                            <h3 className="font-bold mb-4">Emerging Sectors with Growing Funding</h3>
                            <div className="flex flex-wrap gap-2">
                                {state.industryFocus.emerging.map((sector, i) => (
                                    <Badge key={i} variant="outline" className="text-base px-4 py-2">{sector}</Badge>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Success Stories Section */}
                    <section id="success" className="mb-12">
                        <h2 className="text-3xl font-bold mb-6 text-gray-900">
                            Success Stories
                        </h2>

                        <div className="grid md:grid-cols-3 gap-6">
                            {state.successStories.map((story, idx) => (
                                <Card key={idx} className="bg-gradient-to-br from-green-50 to-blue-50">
                                    <CardHeader>
                                        <CardTitle className="text-lg">{story.company}</CardTitle>
                                        <CardDescription>{story.grant}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold text-green-600 mb-2">{story.amount}</div>
                                        <p className="text-gray-600 text-sm">{story.outcome}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>

                    {/* Expert Tips Section */}
                    <section id="tips" className="mb-12">
                        <h2 className="text-3xl font-bold mb-6 text-gray-900">
                            Expert Tips for {state.name} Funding
                        </h2>

                        <div className="space-y-4">
                            {state.expertTips.map((tip, idx) => (
                                <ExpertTipBox key={idx} type={tip.type} title={tip.title}>
                                    <div dangerouslySetInnerHTML={{ __html: tip.content }} />
                                </ExpertTipBox>
                            ))}
                        </div>
                    </section>

                    {/* FAQs Section */}
                    <section id="faqs" className="mb-12">
                        <h2 className="text-3xl font-bold mb-6 text-gray-900">
                            Frequently Asked Questions
                        </h2>

                        <div className="space-y-4">
                            {state.faqs.map((faq, idx) => (
                                <Card key={idx}>
                                    <CardHeader>
                                        <CardTitle className="text-lg flex items-start">
                                            <HelpCircle className="w-5 h-5 mr-2 text-green-600 flex-shrink-0 mt-1" />
                                            {faq.question}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-700 ml-7">{faq.answer}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>

                    {/* Common Questions Section - Query-Based H2s for SEO */}
                    <section id="common-questions" className="mb-12">
                        <h2 className="text-3xl font-bold mb-6 text-gray-900">
                            Common Questions About {state.name} Business Grants
                        </h2>
                        <p className="text-gray-600 mb-8">
                            Get detailed answers to the most frequently searched questions about business funding in {state.name}.
                        </p>

                        <div className="space-y-8">
                            {getQueryBasedSections(state).map((section, idx) => (
                                <article key={idx} className="border-b border-gray-200 pb-6 last:border-0">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                                        {section.question}
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        {section.answer}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </section>

                    {/* Resources Section */}
                    <section id="resources" className="mb-12">
                        <h2 className="text-3xl font-bold mb-6 text-gray-900">

                            Official Resources
                        </h2>

                        <div className="grid md:grid-cols-2 gap-4">
                            {state.resources.map((resource, idx) => (
                                <Card key={idx} className="hover:shadow-lg transition-shadow">
                                    <CardHeader>
                                        <CardTitle className="text-lg flex items-center">
                                            <ExternalLink className="w-4 h-4 mr-2 text-green-600" />
                                            {resource.name}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-600 mb-3">{resource.description}</p>
                                        <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">
                                            Visit Website →
                                        </a>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>

                    {/* Related Programs Section - Query Expanders for Secondary Keywords */}
                    <section id="related-programs" className="mb-12">
                        <h2 className="text-3xl font-bold mb-6 text-gray-900">
                            Related Grant Programs in {state.name}
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Explore additional funding opportunities and related searches for {state.name} businesses.
                        </p>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {getQueryExpanders(state).map((phrase, idx) => (
                                <div key={idx} className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors">
                                    <ChevronRight className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                                    <span className="text-gray-700 text-sm">{phrase}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Related Guides Section - Internal Linking for SEO Authority */}
                    <section id="related-guides" className="mb-12">
                        <h2 className="text-3xl font-bold mb-6 text-gray-900">
                            Related Grant Guides
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Explore our comprehensive guides on grant applications and funding strategies.
                        </p>

                        <div className="grid md:grid-cols-2 gap-4">
                            {getRelatedGuides(state).map((guideSlug, idx) => (
                                <Link
                                    key={idx}
                                    href={`/guides/${guideSlug}`}
                                    className="flex items-center p-4 border rounded-lg hover:border-green-500 hover:shadow-md transition-all group"
                                >
                                    <BookOpen className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                                    <span className="text-gray-700 group-hover:text-green-600 capitalize">
                                        {guideSlug.replace(/-/g, ' ').replace('apply ', 'How to Apply for ').replace('guide', 'Guide')}
                                    </span>
                                    <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                                </Link>
                            ))}
                        </div>

                        {/* Internal Links to Hub Pages */}
                        <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
                            <h3 className="font-bold text-lg mb-4">Explore More Funding Resources</h3>
                            <div className="flex flex-wrap gap-4">
                                <Link href="/usa" className="inline-flex items-center text-green-600 hover:underline">
                                    <MapPin className="w-4 h-4 mr-1" /> All USA State Grants
                                </Link>
                                <Link href="/blog/usa-federal-grants" className="inline-flex items-center text-green-600 hover:underline">
                                    <Building className="w-4 h-4 mr-1" /> Federal Grants Guide
                                </Link>
                                <Link href="/blog/state-province-grants" className="inline-flex items-center text-green-600 hover:underline">
                                    <Globe className="w-4 h-4 mr-1" /> State vs Province Comparison
                                </Link>
                                <Link href="/guides" className="inline-flex items-center text-green-600 hover:underline">
                                    <BookOpen className="w-4 h-4 mr-1" /> All Guides
                                </Link>
                            </div>
                        </div>
                    </section>

                    {/* Global Grant Guide (Universal Content) */}
                    <GlobalGrantGuide />


                    {/* CTA Section */}
                    <section className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-8 text-white text-center">
                        <h3 className="text-2xl font-bold mb-4">Get Your Free {state.name} Grant Strategy</h3>
                        <p className="mb-6 text-green-100">
                            Expert guidance on accessing {state.heroStats.totalFunding} in {state.name} funding opportunities
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100" asChild>
                                <Link href="/contact">Get Free Consultation</Link>
                            </Button>
                            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                                <Link href="/grant-finder">Use Grant Finder Tool</Link>
                            </Button>
                        </div>
                    </section>

                    {/* Last Updated */}
                    <div className="mt-8 text-center text-gray-500 text-sm">
                        Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </div>
                </article>
            </main>
            <Footer />
        </div>
    );
}
