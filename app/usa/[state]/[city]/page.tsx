
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ExpertTipBox } from '@/components/blog/ExpertTipBox';
import { GlobalGrantGuide } from '@/components/blog/GlobalGrantGuide';
import { getStateDetailBySlug, getAllStateDetails, getRelatedGuides } from '@/lib/data/stateDetails';
import {
    ArrowLeft, DollarSign, Users, Briefcase, Target, Building, Zap, TrendingUp,
    Rocket, Mountain, Globe, Leaf, Cpu, Shield, Clock, Award, CheckCircle,
    AlertTriangle, FileText, ExternalLink, ChevronRight, List, HelpCircle,
    BookOpen, Lightbulb, MapPin, Locate
} from 'lucide-react';

// Helper to create slugs from names
function toSlug(text: string): string {
    return text.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}

export async function generateStaticParams() {
    const states = getAllStateDetails();
    const params: { state: string; city: string }[] = [];

    states.forEach(state => {
        if (state.cityGuides) {
            state.cityGuides.forEach(city => {
                params.push({
                    state: state.slug,
                    city: toSlug(city.city)
                });
            });
        }
    });

    return params;
}

export async function generateMetadata({ params }: { params: { state: string; city: string } }): Promise<Metadata> {
    const state = getStateDetailBySlug(params.state);
    if (!state || !state.cityGuides) return { title: 'City Not Found' };

    const cityData = state.cityGuides.find(c => toSlug(c.city) === params.city);
    if (!cityData) return { title: 'City Not Found' };

    return {
        title: `${cityData.city} Small Business Grants 2026 | ${state.name} Funding Guide`,
        description: `Complete guide to small business grants and funding in ${cityData.city}, ${state.name}. Access local ${cityData.city} programs, ${state.name} incentives, and federal opportunities.`,
        alternates: {
            canonical: `https://www.fsidigital.ca/usa/${state.slug}/${params.city}`,
        },
        robots: { index: true, follow: true },
        openGraph: {
            title: `${cityData.city} Small Business Grants 2026`,
            description: `Find funding for your business in ${cityData.city}, ${state.name}. Local grants, state incentives, and expert support.`,
            type: 'article',
        },
    };
}

export default function CityPage({ params }: { params: { state: string; city: string } }) {
    const state = getStateDetailBySlug(params.state);
    if (!state || !state.cityGuides) return notFound();

    const cityData = state.cityGuides.find(c => toSlug(c.city) === params.city);
    if (!cityData) return notFound();

    // Find local resources that match this city
    const localResources = state.localResources?.filter(r =>
        toSlug(r.location).includes(params.city) || params.city.includes(toSlug(r.location))
    ) || [];

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": `${cityData.city} Small Business Grants and Funding 2026`,
        "description": cityData.description,
        "author": { "@type": "Organization", "name": "FSI Digital" },
        "publisher": { "@type": "Organization", "name": "FSI Digital" },
        "datePublished": new Date().toISOString(),
        "dateModified": new Date().toISOString(),
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://www.fsidigital.ca/usa/${state.slug}/${params.city}`
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="py-8">
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

                <article className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                    {/* Breadcrumb */}
                    <nav className="mb-6">
                        <ol className="flex items-center space-x-2 text-sm text-gray-500">
                            <li><Link href="/" className="hover:text-green-600">Home</Link></li>
                            <ChevronRight className="w-4 h-4" />
                            <li><Link href="/usa" className="hover:text-green-600">USA Grants</Link></li>
                            <ChevronRight className="w-4 h-4" />
                            <li><Link href={`/usa/${state.slug}`} className="hover:text-green-600">{state.name}</Link></li>
                            <ChevronRight className="w-4 h-4" />
                            <li className="text-gray-900 font-medium">{cityData.city}</li>
                        </ol>
                    </nav>

                    {/* Hero Section */}
                    <header className="mb-12">
                        <Badge className="mb-4 bg-green-100 text-green-800">{cityData.city} Funding</Badge>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Small Business Grants in {cityData.city}, {state.name}
                        </h1>
                        <p className="text-xl text-gray-600 mb-6">
                            {cityData.description}
                        </p>

                        <div className="flex flex-wrap gap-4 mt-6">
                            <div className="flex items-center text-gray-600">
                                <MapPin className="w-5 h-5 mr-2 text-green-600" />
                                <span>Serving {cityData.city} Region</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                                <Building className="w-5 h-5 mr-2 text-blue-600" />
                                <span>{state.name} State Programs Apply</span>
                            </div>
                        </div>
                    </header>

                    {/* Key Industries */}
                    <section className="mb-12 bg-gray-50 p-6 rounded-xl">
                        <h2 className="text-2xl font-bold mb-4 flex items-center">
                            <Briefcase className="w-6 h-6 mr-2 text-purple-600" />
                            Key Industries & Opportunities
                        </h2>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {cityData.keyIndustries.map((industry, i) => (
                                <Badge key={i} variant="secondary" className="text-base px-4 py-2 bg-white border border-gray-200 shadow-sm">
                                    {industry}
                                </Badge>
                            ))}
                        </div>
                        <p className="text-gray-600">
                            Businesses in these sectors often have access to specialized local funding and incentives in {cityData.city}.
                        </p>
                    </section>

                    {/* Local Programs */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-6 text-gray-900">
                            {cityData.city} Specific Programs
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {cityData.programs.map((programName, idx) => (
                                <Card key={idx} className="hover:shadow-md transition-shadow">
                                    <CardHeader>
                                        <CardTitle className="text-lg">{programName}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-600 mb-4">
                                            This is a targeted program serving the {cityData.city} area.
                                            Check with local economic development offices for current application windows.
                                        </p>
                                        <Link href={`/usa/${state.slug}#resources`} className="text-green-600 font-medium hover:underline flex items-center">
                                            Find Agency Contacts <ChevronRight className="w-4 h-4 ml-1" />
                                        </Link>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>

                    {/* Local Resources (SBDC etc) */}
                    {localResources.length > 0 && (
                        <section className="mb-12">
                            <h2 className="text-3xl font-bold mb-6 text-gray-900">
                                Local Support & Resources
                            </h2>
                            <div className="grid gap-4">
                                {localResources.map((resource, idx) => (
                                    <Card key={idx} className="border-l-4 border-l-orange-500">
                                        <CardContent className="pt-6">
                                            <h3 className="font-bold text-lg mb-2">{resource.name}</h3>
                                            <p className="text-gray-600 mb-3">{resource.location}</p>
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {resource.services.map((service, i) => (
                                                    <Badge key={i} variant="outline" className="text-xs">{service}</Badge>
                                                ))}
                                            </div>
                                            <a href={resource.website} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline flex items-center">
                                                Visit Website <ExternalLink className="w-3 h-3 ml-1" />
                                            </a>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* State Programs Reminder */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-6 text-gray-900">
                            Don't Forget {state.name} State Funding
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-6">
                            While local {cityData.city} grants are valuable, the largest pools of funding often come from the state of {state.name}.
                            These programs are available to businesses in {cityData.city} as well.
                        </p>

                        <div className="space-y-4">
                            {state.topPrograms.slice(0, 3).map((program, idx) => (
                                <div key={idx} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-gray-900">{program.name}</h3>
                                        <Badge variant="outline">{program.fundingType}</Badge>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-2">{program.fundingAmount}</p>
                                    <Link href={`/usa/${state.slug}#programs`} className="text-green-600 text-sm font-medium hover:underline">
                                        View Details →
                                    </Link>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 text-center">
                            <Link href={`/usa/${state.slug}`} className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                                View All {state.name} State Grants
                            </Link>
                        </div>
                    </section>

                    <GlobalGrantGuide />
                </article>
            </main>
            <Footer />
        </div>
    );
}
