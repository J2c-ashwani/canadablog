import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllPseoPages, getPseoPage } from '@/lib/pseo-data';
import { generatePseoSchema } from '@/lib/seo';
import { GrantCalculator } from '@/components/calculator/GrantCalculator';
import { Shield, BookOpen, CheckCircle, Clock } from 'lucide-react';
import Link from 'next/link';

// Generate static params for all possible PSEO pages
export async function generateStaticParams() {
    const pages = getAllPseoPages();
    return pages.map((page) => ({
        province: page.provinceSlug,
        city: page.citySlug,
        industry: page.industrySlug,
    }));
}

// Generate highly targeted metadata
export async function generateMetadata({ params }: { params: { province: string, city: string, industry: string } }): Promise<Metadata> {
    const page = getPseoPage(params.province, params.city, params.industry);

    if (!page) {
        return { title: 'Grants Not Found' };
    }

    // Gatekeeper: If the page isn't published yet, block indexation
    if (!page.isPublished) {
        return {
            title: `Coming Soon: ${page.industryName} Grants in ${page.cityName}`,
            robots: { index: false, follow: false }
        };
    }

    const title = `${page.industryName} Grants in ${page.cityName}, ${page.provinceName} (2026)`;
    const description = `Discover active ${page.industryName} government grants, loans, and financial assistance programs available for businesses in ${page.cityName}, ${page.provinceName}.`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: 'article',
            publishedTime: page.publishedAt,
        }
    };
}

export default function PseoLandingPage({ params }: { params: { province: string, city: string, industry: string } }) {
    const page = getPseoPage(params.province, params.city, params.industry);

    // Hard 404 gatekeeper if the route is invalid or the drip date is in the future
    if (!page || !page.isPublished) {
        notFound();
    }

    const schema = generatePseoSchema(
        page.cityName,
        page.provinceName,
        page.industryName,
        `https://www.fsidigital.ca/grants/${page.provinceSlug}/${page.citySlug}/${page.industrySlug}`,
        page.publishedAt
    );

    return (
        <div className="min-h-screen bg-gray-50/50">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />

            {/* Hero Section */}
            <section className="bg-white border-b border-gray-200 pt-16 pb-12 lg:pt-24 lg:pb-16 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold mb-6">
                        <Shield className="w-4 h-4" />
                        Verified Local Programs
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                            {page.industryName} Grants
                        </span><br />
                        in {page.cityName}, {page.provinceName}
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Find out exactly how much government funding your {page.industryName.toLowerCase()} business qualifies for in {page.cityName}. Take our 60-second assessment below.
                    </p>
                </div>
            </section>

            {/* Main Content & Calculator */}
            <section className="py-12 lg:py-20 px-4">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">

                    {/* Left Column: Contextual Content */}
                    <div className="space-y-8">
                        <div className="prose prose-lg text-gray-700">
                            <h2>Local Funding for {page.cityName} Businesses</h2>
                            <p>
                                The government of {page.provinceName} and federal agencies provide millions of dollars in non-repayable grants and interest-free loans specifically targeted at the <strong>{page.industryName}</strong> sector.
                            </p>
                            <p>
                                Whether you are looking to hire new employees, invest in research and development, or expand your operations in {page.cityName}, there are active programs designed to support your growth.
                            </p>

                            <h3>What programs are available?</h3>
                            <ul className="space-y-3 list-none pl-0">
                                <li className="flex items-start">
                                    <CheckCircle className="w-6 h-6 text-green-500 mr-2 shrink-0 mt-0.5" />
                                    <span><strong>Hiring Subsidies:</strong> Cover up to 50-70% of wages for new hires in {page.cityName}.</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="w-6 h-6 text-green-500 mr-2 shrink-0 mt-0.5" />
                                    <span><strong>Technology Adoption:</strong> Grants for implementing new software and digital tools.</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="w-6 h-6 text-green-500 mr-2 shrink-0 mt-0.5" />
                                    <span><strong>Market Expansion:</strong> Funding to help {page.provinceName} businesses export products globally.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <Clock className="w-6 h-6 text-blue-600" />
                                <h4 className="text-lg font-semibold text-blue-900">Important Note on Deadlines</h4>
                            </div>
                            <p className="text-blue-800">
                                Grant programs are highly competitive and operate on specific intake cycles. Many {page.provinceName} provincial funds deplete long before their official deadline. We strongly recommend assessing your eligibility immediately using the calculator on this page.
                            </p>
                        </div>
                    </div>

                    {/* Right Column: The Calculator */}
                    <div className="lg:sticky lg:top-24">
                        <GrantCalculator />
                    </div>

                </div>
            </section>

            {/* Internal Linking / SEO Silo */}
            <section className="bg-white py-12 px-4 border-t border-gray-200">
                <div className="max-w-4xl mx-auto text-center">
                    <h3 className="text-2xl font-bold mb-6">More Resources for {page.provinceName} Businesses</h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href={`/canada/government-grants`} className="text-primary hover:underline font-medium flex items-center">
                            <BookOpen className="w-4 h-4 mr-2" /> Canada Federal Grants
                        </Link>
                        <span className="hidden sm:inline text-gray-300">|</span>
                        <Link href="/grant-finder" className="text-primary hover:underline font-medium flex items-center">
                            <Shield className="w-4 h-4 mr-2" /> AI Grant Finder Tool
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
