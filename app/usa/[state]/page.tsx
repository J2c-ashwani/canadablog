// app/usa/[state]/page.tsx - Dynamic State Grant Pages
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GrantSuccessTable } from '@/components/blog/GrantSuccessTable';
import { ExpertTipBox } from '@/components/blog/ExpertTipBox';
import { getStateBySlug, getAllStates } from '@/lib/data/states';
import { ArrowLeft, DollarSign, Users, Briefcase, Target, Building, Zap, TrendingUp, Rocket, Mountain, Globe, Leaf, Cpu, Shield, Clock, Award } from 'lucide-react';

const iconMap: Record<string, any> = {
    DollarSign, Users, Briefcase, Target, Building, Zap, TrendingUp, Rocket, Mountain, Globe, Leaf, Cpu, Shield, Clock, Award
};

export async function generateStaticParams() {
    const states = getAllStates();
    return states.map((state) => ({ state: state.slug }));
}

export async function generateMetadata({ params }: { params: { state: string } }): Promise<Metadata> {
    const state = getStateBySlug(params.state);
    if (!state) return { title: 'State Not Found' };

    return {
        title: `${state.name} Small Business Grants 2026 | ${state.totalFunding} Funding Guide`,
        description: state.description,
        alternates: {
            canonical: `https://www.fsidigital.ca/usa/${state.slug}`,
        },
        robots: { index: true, follow: true },
    };
}

export default function StatePage({ params }: { params: { state: string } }) {
    const state = getStateBySlug(params.state);
    if (!state) return notFound();

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": `${state.name} Small Business Grants 2026`,
        "description": state.description,
        "author": { "@type": "Organization", "name": "FSI Digital" },
    };

    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="py-12">
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                    <div className="mb-8">
                        <Button variant="ghost" asChild>
                            <Link href="/usa"><ArrowLeft className="w-4 h-4 mr-2" />Back to USA Grants</Link>
                        </Button>
                    </div>

                    <header className="mb-10">
                        <Badge className="mb-4 bg-blue-100 text-blue-800">{state.region} Region</Badge>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            {state.name} Small Business Grants 2026
                        </h1>
                        <p className="text-xl text-gray-600">{state.description}</p>
                    </header>

                    {/* Metrics Table */}
                    <section className="mb-10">
                        <GrantSuccessTable
                            title={`${state.name} Funding Snapshot`}
                            metrics={state.metrics.map(m => {
                                const IconComponent = m.iconName ? iconMap[m.iconName] : Target;
                                return { ...m, icon: <IconComponent className="w-6 h-6" /> };
                            })}
                        />
                    </section>

                    {/* Expert Tip */}
                    <section className="mb-10">
                        <ExpertTipBox type={state.expertTip.type} title={state.expertTip.title}>
                            <div dangerouslySetInnerHTML={{ __html: state.expertTip.content }} />
                        </ExpertTipBox>
                    </section>

                    {/* Top Programs */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-bold mb-6">Top {state.name} Grant Programs</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {state.topPrograms.map((program, idx) => (
                                <Card key={idx} className="hover:shadow-lg transition-shadow">
                                    <CardHeader>
                                        <CardTitle className="text-lg">{program.name}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold text-green-600 mb-2">{program.amount}</div>
                                        <p className="text-gray-600 text-sm">{program.focus}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>

                    {/* Key Industries */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-bold mb-4">Key Industries in {state.name}</h2>
                        <div className="flex flex-wrap gap-2">
                            {state.keyIndustries.map((industry, idx) => (
                                <Badge key={idx} variant="outline" className="text-base px-4 py-2">{industry}</Badge>
                            ))}
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="bg-gradient-to-r from-blue-600 to-green-600 rounded-lg p-8 text-white text-center">
                        <h3 className="text-2xl font-bold mb-4">Get Your Free {state.name} Grant Strategy</h3>
                        <p className="mb-6">Expert guidance on accessing {state.totalFunding} in {state.name} funding</p>
                        <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100" asChild>
                            <Link href="/contact">Get Free Consultation</Link>
                        </Button>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}
