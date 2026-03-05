export const revalidate = 86400; // Revalidate every 24 hours
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
                <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-start">

                    {/* Left Column: Deep Contextual Content (7 columns wide on desktop) */}
                    <div className="lg:col-span-7 space-y-12">

                        {/* Introduction & Overview */}
                        <div className="prose prose-lg text-gray-700 max-w-none">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Local Funding for {page.cityName} {page.industryName} Businesses</h2>
                            <p className="lead text-xl text-gray-800">
                                The government of {page.provinceName} and federal Canadian agencies provide millions of dollars in non-repayable grants, wage subsidies, and interest-free loans specifically targeted at the <strong>{page.industryName}</strong> sector in {page.cityName}.
                            </p>
                            <p>
                                Unlike traditional bank loans, government grants do not need to be repaid and do not require giving up equity in your company. Whether you are looking to hire new employees, invest in research and development, purchase new equipment, or expand your {page.industryName} operations globally, there are active funding programs designed to accelerate your growth.
                            </p>
                            <p>
                                The key to accessing these funds is understanding exactly which programs your business in {page.cityName} qualifies for, what the specific intake periods are, and how to structure your application to match the government's current economic priorities for {page.provinceName}.
                            </p>
                        </div>

                        {/* Core Funding Categories */}
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Primary Types of {page.industryName} Funding Available</h3>
                            <div className="space-y-6">
                                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-start">
                                        <div className="bg-green-100 p-3 rounded-lg mr-4">
                                            <CheckCircle className="w-6 h-6 text-green-600" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-gray-900 mb-2">Hiring & Wage Subsidies</h4>
                                            <p className="text-gray-700">One of the most accessible forms of funding in {page.cityName}. Programs can cover between 50% to 70% of the wages for new hires, particularly for youth (under 30), recent graduates, or specialized technical roles within the {page.industryName} space.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-start">
                                        <div className="bg-blue-100 p-3 rounded-lg mr-4">
                                            <CheckCircle className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-gray-900 mb-2">Technology & Software Adoption</h4>
                                            <p className="text-gray-700">Grants designed to help {page.cityName} businesses modernize. If your {page.industryName} company needs to implement an ERP system, upgrade cybersecurity, adopt AI infrastructure, or digitize operations, you can secure up to $100,000 in support.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-start">
                                        <div className="bg-purple-100 p-3 rounded-lg mr-4">
                                            <CheckCircle className="w-6 h-6 text-purple-600" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-gray-900 mb-2">Market Expansion & Exporting</h4>
                                            <p className="text-gray-700">Looking to sell your {page.industryName} products or services outside of {page.provinceName}? The CanExport program and regional equivalents provide up to $50,000 to cover travel to trade shows, marketing localization, and legal fees for new market entry.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Deadlines Warning Block */}
                        <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-xl p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <Clock className="w-8 h-8 text-blue-600" />
                                <h4 className="text-xl font-bold text-blue-900">Critical Note on {page.provinceName} Funding Deadlines</h4>
                            </div>
                            <p className="text-blue-800 text-lg leading-relaxed mb-4">
                                Grant programs in Canada are highly competitive and operate on specific intake cycles. Many {page.provinceName} provincial funds operate on a "first-come, first-served" basis and often deplete their annual budgets long before their official posted deadlines.
                            </p>
                            <p className="text-blue-800 font-semibold">
                                We strongly recommend continuously monitoring intakes and assessing your {page.cityName} business eligibility immediately using the calculator to secure your position in the queue.
                            </p>
                        </div>

                        {/* Eligibility & Qualifications */}
                        <div className="prose prose-lg text-gray-700 max-w-none">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Basic Eligibility Requirements for {page.cityName}</h3>
                            <p>
                                While specific requirements vary by the exact grant program, the vast majority of government funding for the {page.industryName} sector requires your business to meet these baseline criteria:
                            </p>
                            <ul>
                                <li><strong>Incorporation:</strong> The business must be legally incorporated in {page.provinceName} or federally in Canada. Sole proprietorships generally do not qualify for large-scale funding.</li>
                                <li><strong>Headquarters:</strong> Your primary operations and leadership must be located in {page.cityName} or the surrounding area.</li>
                                <li><strong>Financial Viability:</strong> You must demonstrate the financial capacity to complete the proposed project. Most grants are reimbursement-based (they pay you back after you spend the money).</li>
                                <li><strong>Job Creation:</strong> The strongest applications for {page.industryName} grants clearly demonstrate how the funding will lead to the creation of new, high-quality jobs in the local {page.cityName} economy.</li>
                            </ul>
                        </div>

                        {/* Step-by-Step Process */}
                        <div className="prose prose-lg text-gray-700 max-w-none">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">The Grant Application Process</h3>
                            <ol className="space-y-4">
                                <li><strong>Determine Eligibility:</strong> Use an assessment tool (like our calculator) to filter out the noise and find the 3-5 {page.industryName} programs you actually qualify for.</li>
                                <li><strong>Project Scoping:</strong> Define exactly what you are going to do, how much it will cost, and how it aligns with government priorities for {page.provinceName}.</li>
                                <li><strong>Proposal Writing:</strong> Draft a compelling narrative. This is not just a form; it requires a detailed business case, financial projections, and hiring plans.</li>
                                <li><strong>Submission & Review:</strong> Submit the application. Review times range from 4 weeks for simple hiring grants to 4-6 months for massive innovation scaling funds.</li>
                                <li><strong>Approval & Execution:</strong> Once formally approved, you can begin incurring eligible expenses in {page.cityName}. Note: Expenses incurred before official approval are generally ineligible.</li>
                            </ol>
                        </div>

                        {/* Localized FAQs - KEY FOR AEO/GEO! */}
                        <div className="mt-12">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
                            <div className="space-y-4">
                                <div className="bg-white border border-gray-200 rounded-lg p-6">
                                    <h4 className="text-lg font-bold text-gray-900 mb-3 short-answer">How much grant money can a {page.industryName} business in {page.cityName} receive?</h4>
                                    <p className="text-gray-700">Depending on the specific program and the size of your business, funding amounts range significantly. Small hiring grants provide $5,000 to $15,000 per new employee. Technology adoption grants typically offer $15,000 to $100,000. For large-scale innovation commercialization projects in the {page.industryName} sector, companies in {page.provinceName} can secure upwards of $500,000 to $1,000,000+.</p>
                                </div>
                                <div className="bg-white border border-gray-200 rounded-lg p-6">
                                    <h4 className="text-lg font-bold text-gray-900 mb-3 short-answer">Do I have to pay back a government grant?</h4>
                                    <p className="text-gray-700">No. True government grants are non-repayable, meaning you do not have to pay the money back, provided you complete the project exactly as described in your approved application. However, the government also offers highly favorable "repayable contributions" (interest-free loans with flexible terms) which are also valuable tools for {page.cityName} businesses.</p>
                                </div>
                                <div className="bg-white border border-gray-200 rounded-lg p-6">
                                    <h4 className="text-lg font-bold text-gray-900 mb-3 short-answer">Can a startup in {page.cityName} get funding before generating revenue?</h4>
                                    <p className="text-gray-700">Yes, but the options are more limited. Pre-revenue {page.industryName} startups can access specific research and development funding (like SR&ED tax credits or IRAP funding) and some localized incubator/accelerator grants in {page.cityName}. However, the majority of large scaling grants require the business to have established commercial revenue (often $500k+) and at least 3-5 full-time employees.</p>
                                </div>
                                <div className="bg-white border border-gray-200 rounded-lg p-6">
                                    <h4 className="text-lg font-bold text-gray-900 mb-3 short-answer">How long does it take to get approved?</h4>
                                    <p className="text-gray-700">The timeline varies wildly by program. Simple wage subsidies for hiring an intern in {page.cityName} can be approved in 2-4 weeks. Complex federal innovation grants requiring deep technical reviews of your {page.industryName} technology can take 3 to 6 months. We always advise businesses in {page.provinceName} to apply well in advance of their planned project start dates.</p>
                                </div>
                                <div className="bg-white border border-gray-200 rounded-lg p-6">
                                    <h4 className="text-lg font-bold text-gray-900 mb-3 short-answer">What happens if my {page.cityName} business spends the money differently than planned?</h4>
                                    <p className="text-gray-700">Government funding requires strict compliance and reporting. If your {page.industryName} company deviates from the approved budget or scope of work without prior written permission from the funding agency, those expenses will be deemed ineligible. You will not be reimbursed, and in cases of severe breach, you may be required to return funds already disbursed.</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Sticky Calculator Sidebar (5 columns wide) */}
                    <div className="lg:col-span-5 relative">
                        <div className="lg:sticky lg:top-24 mt-8 lg:mt-0">
                            <GrantCalculator />
                        </div>
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
