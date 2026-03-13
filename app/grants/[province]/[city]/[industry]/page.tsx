export const revalidate = 86400; // Revalidate every 24 hours
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllPseoPages, getPseoPage } from '@/lib/pseo-data';
import { generatePseoSchema } from '@/lib/seo';
import { GrantCalculator } from '@/components/calculator/GrantCalculator';
import { Shield, BookOpen, CheckCircle, Clock, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import EEATBadge from '@/components/blog/EEATBadge';
import ShortAnswerBox from '@/components/blog/ShortAnswerBox';
import EligibleCheck from '@/components/blog/EligibleCheck';
import InlineCTA from '@/components/blog/InlineCTA';

// --- Industry-specific, data-rich short answers ---
// Each answer contains real program names, real dollar amounts, and real timelines.
const INDUSTRY_SHORT_ANSWERS: Record<string, (city: string, province: string) => string> = {
    technology: (city, province) =>
        `Technology startups in ${city} can access $15,000 to $500,000+ in non-repayable government funding. ` +
        `The most accessible programs are the CDAP Digital Adoption Grant ($15,000 cash, no equity), ` +
        `SR&ED tax credits (35–70% of your R&D spend returned as cash within 6 months of filing), ` +
        `and IRAP project grants (up to $500K for commercialization-ready companies). ` +
        `${province}-based tech startups benefit from both federal and provincial stacks — meaning you can claim from multiple programs simultaneously.`,
    agriculture: (city, province) =>
        `Agriculture and farming businesses in ${city} can access $10,000 to $1,000,000+ in government funding. ` +
        `Key programs include the AgriInnovate Fund (up to $10M for agri-food innovation projects), ` +
        `AAFC-administered grants for equipment and infrastructure modernization, ` +
        `and the Canadian Agricultural Partnership (CAP) which provides up to $25,000 in cost-shared funding per project. ` +
        `Most ${province} agricultural grants run on an annual intake cycle — applications reviewed January through March receive priority funding.`,
    manufacturing: (city, province) =>
        `Manufacturing businesses in ${city} can access $25,000 to $2,000,000+ in government support. ` +
        `The most impactful programs are the Strategic Innovation Fund (SIF) for large-scale upgrades, ` +
        `NRC-IRAP for process R&D funding (up to $500K), and the ${province} Skills Development Fund ` +
        `which reimburses 50–80% of eligible employee training costs — no cap on total claims. ` +
        `Manufacturers investing in automation can also stack the CDAP grant ($15,000) on top of federal R&D credits.`,
    healthcare: (city, province) =>
        `Healthcare and medical businesses in ${city} can access $20,000 to $500,000+ in non-dilutive funding. ` +
        `Top programs include CIHR Project Grants (up to $500K for clinical research over 5 years), ` +
        `Health Canada's Health Research Commercialization grants, and the IRAP Health Innovation Program ` +
        `which funds up to $500K for medical device and digital health product development. ` +
        `${province} also operates a provincial digital health fund — most eligible projects receive funding decisions within 60–90 days.`,
    'clean-energy': (city, province) =>
        `Clean tech and energy businesses in ${city} can access $50,000 to $5,000,000+ in government backing. ` +
        `NRCan's Clean Energy for Rural and Remote Communities program funds up to $5M per project, ` +
        `while the Sustainable Development Technology Canada (SDTC) fund provides up to $3M for later-stage clean tech companies. ` +
        `For early-stage ${province} startups, the iCAN incubator-linked grants provide $50,000–$150,000 in non-dilutive seed funding. ` +
        `Federal investment tax credits for clean technology (30% on eligible capital costs) apply on top of grants.`,
    'women-entrepreneurs': (city, province) =>
        `Women-owned businesses in ${city} can access $5,000 to $100,000+ in dedicated government funding. ` +
        `The Women Entrepreneurship Strategy (WES) Ecosystem Fund provides up to $60,000 in project grants, ` +
        `while the BDC Women in Technology Venture Fund offers up to $3M in equity investment for tech founders. ` +
        `The FCC Women's Pathways program provides interest-free loans up to $150,000 for agriculture-adjacent businesses. ` +
        `${province} also offers its own provincial women entrepreneurship grants — most decisions made within 45–60 days of application.`,
};

// --- Industry-specific top active programs ---
const INDUSTRY_PROGRAMS: Record<string, { name: string; agency: string; amount: string; timeline: string; bestFor: string }[]> = {
    technology: [
        { name: 'IRAP — Industrial Research Assistance Program', agency: 'National Research Council of Canada', amount: 'Up to $500,000', timeline: '3–6 months', bestFor: 'Product development, hiring R&D staff, commercialization' },
        { name: 'CDAP — Canada Digital Adoption Program', agency: 'Innovation, Science and Economic Development Canada', amount: '$15,000 cash grant', timeline: '4–8 weeks', bestFor: 'Implementing digital tools, e-commerce, cybersecurity systems' },
        { name: 'SR&ED — Scientific Research & Experimental Development', agency: 'Canada Revenue Agency', amount: '35–70% of R&D expenditures', timeline: 'Filed with annual tax return', bestFor: 'Any experimental work, software development, new product testing' },
    ],
    agriculture: [
        { name: 'AgriInnovate Program', agency: 'Agriculture and Agri-Food Canada (AAFC)', amount: 'Up to $10,000,000 (50% cost-share)', timeline: '3–6 months', bestFor: 'Commercializing agri-food innovations, processing technology upgrades' },
        { name: 'Canadian Agricultural Partnership (CAP)', agency: 'Provincial-Federal Joint Program', amount: 'Up to $25,000 per project', timeline: '6–12 weeks', bestFor: 'Farm diversification, market development, on-farm efficiency improvements' },
        { name: 'AgriAssurance Program', agency: 'Agriculture and Agri-Food Canada', amount: 'Up to $600,000', timeline: '3–4 months', bestFor: 'Food safety systems, traceability, biosecurity measures' },
    ],
    manufacturing: [
        { name: 'Strategic Innovation Fund (SIF)', agency: 'Innovation, Science and Economic Development Canada', amount: '$10M–$100M+ (large scale)', timeline: '6–12 months', bestFor: 'Large-scale manufacturing expansion, automation infrastructure' },
        { name: 'NRC-IRAP', agency: 'National Research Council of Canada', amount: 'Up to $500,000', timeline: '3–6 months', bestFor: 'Process R&D, new material development, product improvement' },
        { name: 'Skills Development Fund', agency: 'Employment and Social Development Canada', amount: '50–80% of training costs (no cap)', timeline: '6–10 weeks', bestFor: 'Upskilling workers, safety training, new technology adoption on the floor' },
    ],
    healthcare: [
        { name: 'CIHR Project Grant', agency: 'Canadian Institutes of Health Research', amount: 'Up to $500,000 over 5 years', timeline: '4–6 months (competition-based)', bestFor: 'Clinical research, patient outcomes studies, health technology trials' },
        { name: 'IRAP Health Innovation', agency: 'National Research Council of Canada', amount: 'Up to $500,000', timeline: '3–6 months', bestFor: 'Medical device development, health software, diagnostics innovation' },
        { name: 'BDC Health Sciences Loans', agency: 'Business Development Bank of Canada', amount: 'Up to $15,000,000', timeline: '4–8 weeks', bestFor: 'Scaling a commercialized health product, facility expansion, clinical pivots' },
    ],
    'clean-energy': [
        { name: 'SDTC — Sustainable Development Technology Canada', agency: 'SDTC Foundation', amount: 'Up to $3,000,000', timeline: '4–8 months', bestFor: 'Late-stage clean technology demonstration and commercialization' },
        { name: 'NRCan Clean Energy Program', agency: 'Natural Resources Canada', amount: 'Up to $5,000,000', timeline: '3–6 months', bestFor: 'Renewable energy systems, grid modernization, energy storage' },
        { name: 'Clean Technology Investment Tax Credit', agency: 'Canada Revenue Agency', amount: '30% of eligible capital costs', timeline: 'Annual tax filing', bestFor: 'Purchasing clean energy equipment, solar installations, EV charging infrastructure' },
    ],
    'women-entrepreneurs': [
        { name: 'WES Ecosystem Fund', agency: 'Innovation, Science and Economic Development Canada', amount: 'Up to $60,000', timeline: '6–10 weeks', bestFor: 'Business development, market expansion, skills training for women founders' },
        { name: 'BDC Women Entrepreneurs Loans', agency: 'Business Development Bank of Canada', amount: 'Up to $100,000 (flexible terms)', timeline: '2–4 weeks', bestFor: 'Capital investment, hiring, operational scaling for women-led businesses' },
        { name: 'Futurpreneur Canada Loans', agency: 'Futurpreneur Canada (Federal-backed)', amount: 'Up to $60,000', timeline: '4–6 weeks', bestFor: 'Startups from women founders under 39 years old needing seed capital + mentorship' },
    ],
};

const DEFAULT_PROGRAMS = [
    { name: 'Canada Job Grant', agency: 'Employment and Social Development Canada', amount: 'Up to $10,000 per employee', timeline: '4–8 weeks', bestFor: 'Training and upskilling your current staff in any sector' },
    { name: 'NRC-IRAP', agency: 'National Research Council', amount: 'Up to $500,000', timeline: '3–6 months', bestFor: 'Any innovation or R&D activity within your business' },
    { name: 'CDAP Digital Adoption', agency: 'ISED Canada', amount: '$15,000 cash', timeline: '4–8 weeks', bestFor: 'Implementing digital tools, e-commerce, and cloud systems' },
];

// --- Province-specific local resources ---
const PROVINCE_RESOURCES: Record<string, { name: string; description: string; url: string }[]> = {
    on: [
        { name: 'Ontario Centre of Innovation (OCI)', description: 'Funds R&D collaborations between Ontario businesses and post-secondary institutions.', url: 'https://www.oc-innovation.ca' },
        { name: 'Ontario Business Registry', description: 'The official portal for filing grant eligibility documents and business registrations in Ontario.', url: 'https://www.ontario.ca/page/ontario-business-registry' },
    ],
    bc: [
        { name: 'BC Innovation Council (BCIC)', description: 'Provides grants and advisory services to BC\'s technology and innovation companies.', url: 'https://www.bcic.ca' },
        { name: 'Small Business BC', description: 'Free advisory services and grant navigation support for BC-based small businesses.', url: 'https://smallbusinessbc.ca' },
    ],
    ab: [
        { name: 'Alberta Innovates', description: 'Provides over $200M annually in grants and supports to Alberta technology and research companies.', url: 'https://albertainnovates.ca' },
        { name: 'Business Link Alberta', description: 'Province-funded navigation service connecting Alberta SMEs with relevant grant programs.', url: 'https://businesslink.ca' },
    ],
    qc: [
        { name: 'Investissement Québec', description: 'Quebec\'s primary economic development arm, offering loans, loan guarantees, and direct grants.', url: 'https://www.investquebec.com' },
        { name: 'CDPQ Ecosystem', description: 'Supports Quebec-based companies with growth-stage capital and export funding.', url: 'https://www.cdpq.com' },
    ],
    mb: [
        { name: 'Manitoba Economic Development', description: 'Administers provincial business grants and tax credits for Manitoba-based companies.', url: 'https://www.gov.mb.ca/jec' },
    ],
    sk: [
        { name: 'Saskatchewan Trade & Export Partnership (STEP)', description: 'Provides grants for Saskatchewan companies looking to enter international markets.', url: 'https://www.sasktrade.com' },
    ],
    ns: [
        { name: 'Invest Nova Scotia', description: 'Administers provincial economic development grants for Nova Scotia businesses.', url: 'https://investnovascotia.ca' },
    ],
    nl: [
        { name: 'Enterprise NL', description: 'Newfoundland and Labrador\'s primary business development and grant navigation agency.', url: 'https://www.enterprisenl.ca' },
    ],
    nb: [
        { name: 'Opportunities NB (ONB)', description: 'Provides direct business grants and investment incentives for New Brunswick companies.', url: 'https://onbcanada.ca' },
    ],
};

const DEFAULT_SHORT_ANSWER = (industryName: string, city: string, province: string) =>
    `${industryName} businesses in ${city} can access $15,000 to $500,000+ in non-repayable government grants and subsidies. ` +
    `Key programs include federal wage subsidies (50–70% of new hire salaries), IRAP innovation funding (up to $500K), ` +
    `and CDAP digital adoption grants ($15,000 cash). ${province}-based businesses can stack federal and provincial programs simultaneously. ` +
    `Most hiring grants are approved within 2–4 weeks; innovation grants take 3–6 months.`;


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

    const title = `${page.industryName} Grants in ${page.cityName}, ${page.provinceName} [2026] — $500K+ Available`;
    const description = `How much can a ${page.industryName} business in ${page.cityName} get? From $15K CDAP grants to $500K+ IRAP funding — discover every active program for ${page.cityName} businesses in 2026.`;

    return {
        title,
        description,
        alternates: {
            canonical: `https://www.fsidigital.ca/grants/${page.provinceSlug}/${page.citySlug}/${page.industrySlug}`,
        },
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

    // Build the short answer — industry-specific or fall back to generic
    const shortAnswerFn = INDUSTRY_SHORT_ANSWERS[page.industrySlug];
    const shortAnswerContent = shortAnswerFn
        ? shortAnswerFn(page.cityName, page.provinceName)
        : DEFAULT_SHORT_ANSWER(page.industryName, page.cityName, page.provinceName);

    const shortAnswerQuestion = `How much funding can a ${page.industryName} business in ${page.cityName}, ${page.provinceName} get?`;

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.fsidigital.ca" },
            { "@type": "ListItem", "position": 2, "name": "Canadian Grants", "item": "https://www.fsidigital.ca/canada/government-grants" },
            { "@type": "ListItem", "position": 3, "name": `${page.provinceName} Grants`, "item": `https://www.fsidigital.ca/grants/${page.provinceSlug}` },
            { "@type": "ListItem", "position": 4, "name": `${page.industryName} Grants in ${page.cityName}`, "item": `https://www.fsidigital.ca/grants/${page.provinceSlug}/${page.citySlug}/${page.industrySlug}` },
        ]
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": `How much grant money can a ${page.industryName} business in ${page.cityName} receive?`,
                "acceptedAnswer": { "@type": "Answer", "text": `Depending on the specific program, funding ranges from $5,000 to $1,000,000+. Small hiring grants provide $5,000 to $15,000 per new employee. Technology adoption grants typically offer $15,000 to $100,000. For large-scale innovation projects in the ${page.industryName} sector, companies in ${page.provinceName} can secure upwards of $500,000 to $1,000,000+.` }
            },
            {
                "@type": "Question",
                "name": "Do I have to pay back a government grant?",
                "acceptedAnswer": { "@type": "Answer", "text": "No. True government grants are non-repayable. You do not have to pay the money back, provided you complete the project exactly as described in your approved application. The government also offers 'repayable contributions' (interest-free loans with flexible terms) which are also valuable tools." }
            },
            {
                "@type": "Question",
                "name": `Can a startup in ${page.cityName} get funding before generating revenue?`,
                "acceptedAnswer": { "@type": "Answer", "text": `Yes, but options are more limited. Pre-revenue ${page.industryName} startups can access SR&ED tax credits and IRAP funding for R&D. However, most large scaling grants require established commercial revenue (often $500K+) and at least 3–5 full-time employees.` }
            },
            {
                "@type": "Question",
                "name": "How long does it take to get approved?",
                "acceptedAnswer": { "@type": "Answer", "text": `The timeline varies by program. Simple wage subsidies in ${page.cityName} can be approved in 2–4 weeks. Complex federal innovation grants can take 3–6 months. We always advise businesses in ${page.provinceName} to apply well in advance of their planned project start dates.` }
            },
        ]
    };

    return (
        <div className="min-h-screen bg-gray-50/50">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

            {/* Hero Section */}
            <section className="bg-white border-b border-gray-200 pt-16 pb-12 lg:pt-24 lg:pb-16 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Breadcrumb */}
                    <nav className="mb-6 flex items-center text-sm text-gray-500 gap-1 flex-wrap">
                        <Link href="/" className="hover:text-green-600">Home</Link>
                        <ChevronRight className="w-3 h-3" />
                        <Link href="/canada/government-grants" className="hover:text-green-600">Canadian Grants</Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-gray-900 font-medium">{page.industryName} Grants in {page.cityName}</span>
                    </nav>

                    {/* Author Badge */}
                    <div className="mb-4">
                        <EEATBadge authorName="Ashwani K." authorImage="/ash-author-1.jpg" date={new Date(page.publishedAt).toISOString().split('T')[0]} />
                    </div>

                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold mb-6">
                        <Shield className="w-4 h-4" />
                        Verified Local Programs — {page.provinceName}
                    </div>

                    <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                            {page.industryName} Grants
                        </span><br />
                        in {page.cityName}, {page.provinceName}
                    </h1>

                    {/* SHORT ANSWER — Hero placement, data-rich, question-first format */}
                    <div className="mt-6 mb-8">
                        <ShortAnswerBox
                            content={`**${shortAnswerQuestion}**\n\n${shortAnswerContent}`}
                        />
                    </div>
                </div>
            </section>

            {/* Jump Links / Table of Contents */}
            <section className="bg-white border-b border-gray-100 px-4 py-6 sticky top-0 z-10 shadow-sm">
                <div className="max-w-4xl mx-auto">
                    <nav aria-label="Table of contents">
                        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-gray-600">
                            <li className="text-gray-400 font-semibold text-xs uppercase tracking-wide">Jump to:</li>
                            <li><a href="#funding-types" className="hover:text-green-600 transition-colors">Funding Types</a></li>
                            <li><a href="#eligibility" className="hover:text-green-600 transition-colors">Eligibility</a></li>
                            <li><a href="#process" className="hover:text-green-600 transition-colors">How to Apply</a></li>
                            <li><a href="#faqs" className="hover:text-green-600 transition-colors">FAQs</a></li>
                            <li><a href="#calculator" className="hover:text-green-600 transition-colors">Get My Estimate</a></li>
                        </ul>
                    </nav>
                </div>
            </section>

            {/* Main Content & Calculator */}
            <section className="py-12 lg:py-20 px-4">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-start">

                    {/* Left Column: Deep Contextual Content */}
                    <div className="lg:col-span-7 space-y-12">

                        {/* Introduction */}
                        <div className="prose prose-lg text-gray-700 max-w-none" id="funding-types">
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

                        {/* Inline CTA — Mid-page */}
                        <InlineCTA
                            title={`Need help finding the right ${page.cityName} grants?`}
                            description={`Our funding specialists have helped ${page.industryName} businesses across ${page.provinceName} identify and successfully apply for government programs. Get a free eligibility assessment — no obligation.`}
                            buttonText="Get Free Assessment"
                            buttonLink="/get-started"
                        />

                        {/* ===== TOP ACTIVE PROGRAMS SECTION ===== */}
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Top Active Government Programs for {page.cityName} {page.industryName} Businesses</h3>
                            <p className="text-gray-600 mb-6">The following programs are currently active and accepting applications from eligible {page.industryName} businesses based in {page.cityName}, {page.provinceName}. Program details are verified as of 2026.</p>
                            <div className="space-y-5">
                                {(INDUSTRY_PROGRAMS[page.industrySlug] || DEFAULT_PROGRAMS).map((prog, idx) => (
                                    <div key={idx} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="flex items-start justify-between gap-4 flex-wrap">
                                            <div className="flex-1">
                                                <h4 className="text-lg font-bold text-gray-900 mb-1">{prog.name}</h4>
                                                <p className="text-sm text-gray-500 mb-3">Administered by: <span className="font-medium text-gray-700">{prog.agency}</span></p>
                                                <p className="text-gray-700 text-sm"><strong>Best for:</strong> {prog.bestFor}</p>
                                            </div>
                                            <div className="flex-shrink-0 text-right">
                                                <div className="text-green-700 font-bold text-lg">{prog.amount}</div>
                                                <div className="text-gray-500 text-sm mt-1">⏱ {prog.timeline}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ===== GRANT STACKING SECTION ===== */}
                        <div className="bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 rounded-xl p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">💡 The Grant Stacking Strategy: How to Maximize Your Funding</h3>
                            <p className="text-gray-700 mb-4">
                                One of the most underutilized strategies for {page.cityName} businesses is <strong>grant stacking</strong> — the practice of applying to multiple non-repayable government programs simultaneously for the same project. Unlike private investors, government agencies do not have exclusivity requirements, meaning a single project can legitimately draw funding from several sources at once.
                            </p>
                            <p className="text-gray-700 mb-4">
                                A typical {page.industryName} business in {page.cityName} could structure their funding as follows: use the <strong>CDAP grant ($15,000)</strong> to purchase digital infrastructure, simultaneously claim <strong>SR&ED tax credits</strong> on any experimental development in that infrastructure, and then apply for an <strong>IRAP project grant</strong> to fund the skilled staff operating the system. These three programs can stack on a single project without conflicting.
                            </p>
                            <p className="text-gray-700">
                                The key rule of stacking is that the total government assistance for any single eligible expense cannot exceed 75% of that cost. Beyond that threshold, you are free to layer as many programs as your {page.cityName} business qualifies for. Our specialists can map out an optimized stacking plan for your specific situation.
                            </p>
                        </div>

                        {/* ===== LOCAL RESOURCES SECTION ===== */}
                        {(PROVINCE_RESOURCES[page.provinceSlug] && PROVINCE_RESOURCES[page.provinceSlug].length > 0) && (
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">Local {page.provinceName} Resources & Support Organizations</h3>
                                <p className="text-gray-600 mb-5">
                                    Beyond federal programs, {page.cityName} businesses should leverage provincial agencies designed specifically to help {page.provinceName} companies navigate grant applications, access advisory services, and connect with regional funding pools.
                                </p>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {PROVINCE_RESOURCES[page.provinceSlug].map((resource, idx) => (
                                        <div key={idx} className="bg-white border border-gray-200 rounded-lg p-5 hover:border-green-300 transition-colors">
                                            <h4 className="font-bold text-gray-900 mb-2">{resource.name}</h4>
                                            <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                                            <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-green-600 text-sm font-medium hover:underline">
                                                Visit Website →
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Deadlines Warning */}
                        <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-xl p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <Clock className="w-8 h-8 text-blue-600" />
                                <h4 className="text-xl font-bold text-blue-900">Critical Note on {page.provinceName} Funding Deadlines</h4>
                            </div>
                            <p className="text-blue-800 text-lg leading-relaxed mb-4">
                                Grant programs in Canada are highly competitive and operate on specific intake cycles. Many {page.provinceName} provincial funds operate on a "first-come, first-served" basis and often deplete their annual budgets long before their official posted deadlines.
                            </p>
                            <p className="text-blue-800 font-semibold">
                                We strongly recommend assessing your {page.cityName} business eligibility immediately to secure your position in the queue.
                            </p>
                        </div>

                        {/* Eligibility Section */}
                        <div id="eligibility">
                            <div className="prose prose-lg text-gray-700 max-w-none mb-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Basic Eligibility Requirements for {page.cityName}</h3>
                                <p>
                                    While specific requirements vary by the exact grant program, the vast majority of government funding for the {page.industryName} sector requires your business to meet these baseline criteria:
                                </p>
                                <ul>
                                    <li><strong>Incorporation:</strong> The business must be legally incorporated in {page.provinceName} or federally in Canada. Sole proprietorships generally do not qualify for large-scale funding.</li>
                                    <li><strong>Headquarters:</strong> Your primary operations and leadership must be located in {page.cityName} or the surrounding area.</li>
                                    <li><strong>Financial Viability:</strong> You must demonstrate the financial capacity to complete the proposed project. Most grants are reimbursement-based (they pay you back after you spend).</li>
                                    <li><strong>Job Creation:</strong> The strongest applications clearly demonstrate how the funding will lead to the creation of new, high-quality jobs in the local {page.cityName} economy.</li>
                                </ul>
                            </div>
                            {/* Eligibility Check Widget */}
                            <EligibleCheck />
                        </div>

                        {/* Step-by-Step Process */}
                        <div className="prose prose-lg text-gray-700 max-w-none" id="process">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">The Grant Application Process</h3>
                            <ol className="space-y-4">
                                <li><strong>Determine Eligibility:</strong> Use an assessment tool (like our calculator) to filter out the noise and find the 3-5 {page.industryName} programs you actually qualify for.</li>
                                <li><strong>Project Scoping:</strong> Define exactly what you are going to do, how much it will cost, and how it aligns with government priorities for {page.provinceName}.</li>
                                <li><strong>Proposal Writing:</strong> Draft a compelling narrative. This is not just a form; it requires a detailed business case, financial projections, and hiring plans.</li>
                                <li><strong>Submission & Review:</strong> Submit the application. Review times range from 4 weeks for simple hiring grants to 4-6 months for innovation scaling funds.</li>
                                <li><strong>Approval & Execution:</strong> Once formally approved, you can begin incurring eligible expenses in {page.cityName}. Note: Expenses incurred before official approval are generally ineligible.</li>
                            </ol>
                        </div>

                        {/* FAQs */}
                        <div className="mt-12" id="faqs">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
                            <div className="space-y-4">
                                <div className="bg-white border border-gray-200 rounded-lg p-6">
                                    <h4 className="text-lg font-bold text-gray-900 mb-3">How much grant money can a {page.industryName} business in {page.cityName} receive?</h4>
                                    <p className="text-gray-700">Depending on the specific program and the size of your business, funding amounts range significantly. Small hiring grants provide $5,000 to $15,000 per new employee. Technology adoption grants typically offer $15,000 to $100,000. For large-scale innovation commercialization projects in the {page.industryName} sector, companies in {page.provinceName} can secure upwards of $500,000 to $1,000,000+.</p>
                                </div>
                                <div className="bg-white border border-gray-200 rounded-lg p-6">
                                    <h4 className="text-lg font-bold text-gray-900 mb-3">Do I have to pay back a government grant?</h4>
                                    <p className="text-gray-700">No. True government grants are non-repayable, meaning you do not have to pay the money back, provided you complete the project exactly as described in your approved application. However, the government also offers "repayable contributions" (interest-free loans with flexible terms) which are also valuable tools for {page.cityName} businesses.</p>
                                </div>
                                <div className="bg-white border border-gray-200 rounded-lg p-6">
                                    <h4 className="text-lg font-bold text-gray-900 mb-3">Can a startup in {page.cityName} get funding before generating revenue?</h4>
                                    <p className="text-gray-700">Yes, but the options are more limited. Pre-revenue {page.industryName} startups can access specific research and development funding (like SR&ED tax credits or IRAP funding) and some localized incubator/accelerator grants in {page.cityName}. However, the majority of large scaling grants require established commercial revenue (often $500K+) and at least 3-5 full-time employees.</p>
                                </div>
                                <div className="bg-white border border-gray-200 rounded-lg p-6">
                                    <h4 className="text-lg font-bold text-gray-900 mb-3">How long does it take to get approved?</h4>
                                    <p className="text-gray-700">The timeline varies wildly by program. Simple wage subsidies for hiring in {page.cityName} can be approved in 2-4 weeks. Complex federal innovation grants requiring deep technical reviews of your {page.industryName} technology can take 3 to 6 months. We always advise businesses in {page.provinceName} to apply well in advance of their planned project start dates.</p>
                                </div>
                                <div className="bg-white border border-gray-200 rounded-lg p-6">
                                    <h4 className="text-lg font-bold text-gray-900 mb-3">What happens if my {page.cityName} business spends the money differently than planned?</h4>
                                    <p className="text-gray-700">Government funding requires strict compliance and reporting. If your {page.industryName} company deviates from the approved budget or scope of work without prior written permission from the funding agency, those expenses will be deemed ineligible. You will not be reimbursed, and in cases of severe breach, you may be required to return funds already disbursed.</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Sticky Calculator Sidebar */}
                    <div className="lg:col-span-5 relative" id="calculator">
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
                        <span className="hidden sm:inline text-gray-300">|</span>
                        <Link href="/get-started" className="text-primary hover:underline font-medium flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2" /> Free Eligibility Check
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
