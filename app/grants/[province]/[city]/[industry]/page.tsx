export const revalidate = 86400; // Revalidate every 24 hours
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllPseoPages, getPseoPage } from '@/lib/pseo-data';
import { generatePseoSchema } from '@/lib/seo';
import { GrantCalculator } from '@/components/calculator/GrantCalculator';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Shield, BookOpen, CheckCircle, Clock, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import EEATBadge from '@/components/blog/EEATBadge';
import ShortAnswerBox from '@/components/blog/ShortAnswerBox';
import EligibleCheck from '@/components/blog/EligibleCheck';
import InlineCTA from '@/components/blog/InlineCTA';
import AdSlot from '@/components/blog/AdSlot';
import { INDUSTRY_DEEP_DIVES } from '@/lib/pseo-content';
import { spinParagraph, shuffleArray } from '@/lib/pseo-rewriter';

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

// Generate highly targeted metadata with long-tail SEO/AEO/GEO keywords
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

    // Long-tail, intent-rich title — rotates pattern per industry for diversity
    const titlePatterns: Record<string, string> = {
        technology: `Best ${page.industryName} Grants in ${page.cityName}, ${page.provinceName} (2026) | How to Apply for IRAP, CDAP & SR&ED`,
        agriculture: `How to Get Agriculture Grants in ${page.cityName}, ${page.provinceName} [2026] | AgriInnovate, CAP & AAFC Funding`,
        manufacturing: `${page.cityName} Manufacturing Grants 2026 — IRAP vs SIF | Best ${page.provinceName} Funding Programs`,
        healthcare: `Healthcare & MedTech Grants in ${page.cityName}, ${page.provinceName} (2026) | CIHR, IRAP & BDC Funding Guide`,
        'clean-energy': `Clean Tech Grants Near ${page.cityName}, ${page.provinceName} [2026] | SDTC, NRCan & Green Energy Funding`,
        'women-entrepreneurs': `Best Grants for Women Entrepreneurs in ${page.cityName}, ${page.provinceName} (2026) | WES, BDC & FCC Programs`,
    };
    const title = titlePatterns[page.industrySlug] || `${page.industryName} Grants in ${page.cityName}, ${page.provinceName} [2026] — $500K+ Available`;

    // Unique, intent-rich meta description per industry — not a generic template
    const descPatterns: Record<string, string> = {
        technology: `How to apply for technology grants in ${page.cityName}? Compare IRAP ($500K), CDAP ($15K), and SR&ED tax credits for ${page.provinceName} startups. Step-by-step 2026 guide with eligibility checker, real dollar amounts, and application deadlines.`,
        agriculture: `${page.cityName} agriculture grants for 2026: AgriInnovate ($10M), CAP ($25K), and AAFC programs. Find out which ${page.provinceName} farming grants you qualify for — free eligibility check, real timelines, and stacking strategies.`,
        manufacturing: `Compare the best manufacturing grants in ${page.cityName}: SIF vs IRAP vs Skills Fund. ${page.provinceName} businesses can stack federal + provincial funding. 2026 guide with amounts, deadlines, and application tips.`,
        healthcare: `Healthcare grants in ${page.cityName}: CIHR ($500K), IRAP Health Innovation ($500K), and BDC loans ($15M). ${page.provinceName} medtech startups — check eligibility, compare programs, and apply for 2026 funding.`,
        'clean-energy': `Clean energy funding near ${page.cityName}: SDTC ($3M), NRCan ($5M), and 30% clean tech tax credits. ${page.provinceName} green businesses — 2026 guide to federal vs provincial grants, stacking strategies, and fast-track applications.`,
        'women-entrepreneurs': `Government grants for women entrepreneurs in ${page.cityName}: WES ($60K), BDC loans ($100K), Futurpreneur ($60K). Best ${page.provinceName} programs for women-led startups in 2026 — eligibility, deadlines, and how to apply.`,
    };
    const description = descPatterns[page.industrySlug] || `How much can a ${page.industryName} business in ${page.cityName} get? From $15K CDAP grants to $500K+ IRAP funding — discover every active program for ${page.cityName} businesses in 2026.`;

    // Long-tail + geo-targeted + AEO keywords
    const baseKeywords = [
        `${page.industryName.toLowerCase()} grants ${page.cityName}`,
        `government grants ${page.cityName} ${page.provinceName}`,
        `how to apply for grants in ${page.cityName}`,
        `best grants for ${page.industryName.toLowerCase()} ${page.provinceName}`,
        `${page.cityName} business funding 2026`,
        `IRAP grants ${page.provinceName}`,
        `CDAP grant ${page.cityName}`,
        `SR&ED tax credits ${page.provinceName}`,
        `federal vs provincial grants ${page.provinceName}`,
        `small business grants near ${page.cityName}`,
        `non-repayable grants ${page.cityName} ${page.provinceName}`,
        `${page.industryName.toLowerCase()} startup funding Canada`,
        `government funding ${page.industryName.toLowerCase()} ${page.provinceName} 2026`,
    ];

    return {
        title,
        description,
        keywords: baseKeywords.join(', '),
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
        <div className="min-h-screen bg-white">
            <Header />
            {/* Header Ad */}
            <div className="container mx-auto px-4 py-4">
              <AdSlot adSlot={process.env.NEXT_PUBLIC_ADSENSE_HEADER_AD!} adFormat="horizontal" className="mb-6" style={{ minHeight: '90px' }} />
            </div>
            <div className="bg-gray-50/50">
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
                        <EEATBadge authorName="Ashwani K." authorImage="/author-ashwani.jpg" date={new Date(page.publishedAt).toISOString().split('T')[0]} />
                    </div>

                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold mb-6">
                        <Shield className="w-4 h-4" />
                        Verified Local Programs — {page.provinceName}
                    </div>

                    {/* SHORT ANSWER — Hero placement, Direct Question as H1 per EEAT Guidelines */}
                    <div className="mt-8 mb-8">
                        <ShortAnswerBox
                            question={shortAnswerQuestion}
                            content={shortAnswerContent}
                            isH1={true}
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
                            <li><a href="#landscape" className="hover:text-green-600 transition-colors">Landscape</a></li>
                            <li><a href="#top-programs" className="hover:text-green-600 transition-colors">Top Programs</a></li>
                            <li><a href="#capital-stacking" className="hover:text-green-600 transition-colors">Capital Stacking</a></li>
                            <li><a href="#tax-implications" className="hover:text-green-600 transition-colors">Tax Strategy</a></li>
                            <li><a href="#expert-framework" className="hover:text-green-600 transition-colors">Application Framework</a></li>
                            <li><a href="#disqualifiers" className="hover:text-green-600 transition-colors">Disqualifiers</a></li>
                            <li><a href="#calculator" className="hover:text-green-600 transition-colors">Calculator</a></li>
                        </ul>
                    </nav>
                </div>
            </section>

            {/* Main Content & Calculator */}
            <section className="py-12 lg:py-20 px-4">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-start">

                    {/* Left Column: Deep Contextual Content */}
                    <div className="lg:col-span-7 space-y-12">

                        {/* Deep Contextual Content */}
                        {(() => {
                            const deepDive = INDUSTRY_DEEP_DIVES[page.industrySlug];
                            // Graceful fallback for undiscovered slugs
                            if (!deepDive) return <div className="text-red-500 font-bold p-8">Error: Deep dive content not found for industry slug: {page.industrySlug}</div>;

                            return (
                                <>
                                    {/* Landscape */}
                                    <div id="landscape" className="prose prose-lg text-gray-700 max-w-none">
                                        <h2 className="text-3xl font-bold text-gray-900 mb-6">{deepDive.landscape.title}</h2>
                                        {deepDive.landscape.content.map((p, i) => {
                                            const spunP = spinParagraph(p, page.cityName, page.provinceName, page.industryName, `landscape-${i}`);
                                            return <p key={i} className={i === 0 ? "lead text-xl text-gray-800" : ""}>{spunP}</p>;
                                        })}
                                    </div>

                                    {/* Anatomy of Top Programs */}
                                    <div id="top-programs" className="mt-12">
                                        <h2 className="text-3xl font-bold text-gray-900 mb-4">{deepDive.anatomy.title}</h2>
                                        <p className="text-xl text-gray-700 mb-8">{spinParagraph(deepDive.anatomy.introduction, page.cityName, page.provinceName, page.industryName, 'anatomy-intro')}</p>
                                        <div className="space-y-6">
                                            {shuffleArray(deepDive.anatomy.programs, `programs-${page.cityName}`).map((prog, idx) => (
                                                <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                                    <div className="flex items-start">
                                                        <div className="bg-blue-100 p-3 rounded-lg mr-4 mt-1">
                                                            <BookOpen className="w-6 h-6 text-blue-600" />
                                                        </div>
                                                        <div>
                                                            <h3 className="text-2xl font-bold text-gray-900 mb-3">{prog.name}</h3>
                                                            <p className="text-gray-700 leading-relaxed text-lg mb-6">{spinParagraph(prog.description, page.cityName, page.provinceName, page.industryName, `prog-desc-${idx}`)}</p>
                                                            
                                                            <div className="bg-red-50 border-l-4 border-red-500 p-5 mb-5 rounded-r-md">
                                                                <h4 className="font-bold text-red-900 mb-3 flex items-center gap-2">
                                                                    <Shield className="w-5 h-5" /> Critical Disqualifiers
                                                                </h4>
                                                                <ul className="list-disc pl-5 text-red-800 space-y-2">
                                                                    {shuffleArray(prog.disqualifiers, `dq-${page.cityName}-${idx}`).map((dq, dIdx) => (
                                                                        <li key={dIdx}>{dq}</li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                            <div className="bg-yellow-50 border border-yellow-300 p-5 rounded-md shadow-sm">
                                                                <p className="text-yellow-900"><strong>💡 Insider Tip:</strong> {spinParagraph(prog.insiderTip, page.cityName, page.provinceName, page.industryName, `tip-${idx}`)}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Inline CTA — Mid-page */}
                                    <div className="my-12">
                                        <InlineCTA
                                            title={`Need help finding the right ${page.cityName} grants?`}
                                            description={`Our funding specialists have helped ${page.industryName} businesses across ${page.provinceName} identify and successfully apply for government programs. Get a free eligibility assessment — no obligation.`}
                                            buttonText="Get Free Assessment"
                                            buttonLink="/get-started"
                                        />
                                    </div>

                                    {/* In-Content Horizontal Ad */}
                                    <div className="my-8">
                                        <AdSlot adSlot={process.env.NEXT_PUBLIC_ADSENSE_IN_CONTENT_HORIZONTAL!} adFormat="horizontal" style={{ minHeight: '120px', width: '100%' }} />
                                    </div>

                                    {/* Capital Stacking */}
                                    <div id="capital-stacking" className="bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 rounded-xl p-10 mt-12 shadow-sm">
                                        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                            <span className="text-4xl">📚</span> {deepDive.stackingPlaybook.title}
                                        </h2>
                                        <div className="space-y-4 text-gray-800 text-lg leading-relaxed">
                                            {deepDive.stackingPlaybook.content.map((p, i) => (
                                                <p key={i}>{spinParagraph(p, page.cityName, page.provinceName, page.industryName, `stack-${i}`)}</p>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Tax Implications */}
                                    <div id="tax-implications" className="prose prose-lg text-gray-700 max-w-none mt-12 bg-white border border-gray-200 p-8 rounded-xl shadow-sm">
                                        <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-4">{deepDive.taxImplications.title}</h2>
                                        <div className="space-y-4">
                                            {deepDive.taxImplications.content.map((p, i) => (
                                                <p key={i} className="leading-relaxed">{spinParagraph(p, page.cityName, page.provinceName, page.industryName, `tax-${i}`)}</p>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Expert Application Framework */}
                                    <div id="expert-framework" className="mt-16">
                                        <h2 className="text-4xl font-extrabold text-gray-900 mb-10">{deepDive.expertFramework.title}</h2>
                                        <div className="space-y-10">
                                            {deepDive.expertFramework.steps.map((step, idx) => (
                                                <div key={idx} className="relative pl-12 border-l-4 border-primary pb-4">
                                                    <div className="absolute -left-5 top-0 bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-md ring-4 ring-white">
                                                        {idx + 1}
                                                    </div>
                                                    <h3 className="text-2xl font-bold text-gray-900 mb-3 mt-1">{step.phase}</h3>
                                                    <p className="text-gray-700 text-lg leading-relaxed">{spinParagraph(step.details, page.cityName, page.provinceName, page.industryName, `framework-${idx}`)}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Disqualifiers */}
                                    <div id="disqualifiers" className="bg-gray-50 border border-gray-200 rounded-xl p-10 mt-16 shadow-inner">
                                        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                                            <Shield className="w-8 h-8 text-red-600" /> {deepDive.commonDisqualifiers.title}
                                        </h2>
                                        <ul className="space-y-4">
                                            {shuffleArray(deepDive.commonDisqualifiers.list, `disq-${page.cityName}`).map((dq, idx) => (
                                                <li key={idx} className="flex items-start gap-4">
                                                    <div className="bg-red-100 p-1.5 rounded-full mt-1 shrink-0">
                                                        <ChevronRight className="w-5 h-5 text-red-600" />
                                                    </div>
                                                    <span className="text-gray-800 text-lg font-medium">{dq}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Geographic Resources Hub */}
                                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 mt-16 shadow-sm">
                                        <h2 className="text-2xl font-bold text-blue-900 mb-4">{page.provinceName} Local Ecosystem Resources</h2>
                                        <p className="text-blue-800 mb-6 font-medium">Local support centers and navigation agencies based near {page.cityName}:</p>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            {PROVINCE_RESOURCES[page.provinceSlug]?.map((res, i) => (
                                                <a key={i} href={res.url} target="_blank" rel="noopener noreferrer" className="block bg-white p-4 rounded border border-blue-100 hover:border-blue-400 hover:shadow-md transition-all group">
                                                    <h4 className="font-bold text-gray-900 group-hover:text-blue-700 mb-2">{res.name}</h4>
                                                    <p className="text-sm text-gray-600">{res.description}</p>
                                                </a>
                                            )) || (
                                                <p className="text-gray-600 italic">Central federal hubs coordinate funding navigation for the {page.provinceName} region.</p>
                                            )}
                                        </div>
                                    </div>

                                    
                                    {/* Eligibility Check Widget */}
                                    <div className="mt-16">
                                        <EligibleCheck />
                                    </div>
                                </>
                            );
                        })()}

                    </div>

                    {/* Right Column: Sticky Calculator Sidebar */}
                    <div className="lg:col-span-5 relative" id="calculator">
                        <div className="lg:sticky lg:top-24 mt-8 lg:mt-0">
                            <GrantCalculator />
                            {/* Sidebar Ad below Calculator */}
                            <div className="mt-8">
                                <AdSlot adSlot={process.env.NEXT_PUBLIC_ADSENSE_SIDEBAR_AD!} adFormat="vertical" style={{ minHeight: '600px' }} />
                            </div>
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
            {/* Bottom Ad */}
            <div className="container mx-auto px-4 py-4">
              <AdSlot adSlot={process.env.NEXT_PUBLIC_ADSENSE_IN_CONTENT_RECTANGLE!} adFormat="rectangle" style={{ minHeight: '250px' }} />
            </div>
            <Footer />
        </div>
    );
}
