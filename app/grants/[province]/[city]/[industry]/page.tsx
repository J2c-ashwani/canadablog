export const revalidate = 86400; // Revalidate every 24 hours
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllPseoPages, getPseoPage, type PseoPage } from '@/lib/pseo-data';
import { getStateDetailBySlugOrAbbreviation, type StateDetailedGrant } from '@/lib/data/stateDetails';
import { generatePseoSchema } from '@/lib/seo';
import { GrantCalculator } from '@/components/calculator/GrantCalculator';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Shield, BookOpen, CheckCircle, Clock, ChevronRight, MapPin } from 'lucide-react';
import Link from 'next/link';
import EEATBadge from '@/components/blog/EEATBadge';
import ShortAnswerBox from '@/components/blog/ShortAnswerBox';
import EligibleCheck from '@/components/blog/EligibleCheck';
import InlineCTA from '@/components/blog/InlineCTA';
import AdSlot from '@/components/blog/AdSlot';
import { INDUSTRY_DEEP_DIVES } from '@/lib/pseo-content';
import { spinParagraph, shuffleArray } from '@/lib/pseo-rewriter';
import PseoMasterclass from '@/components/pseo/PseoMasterclass';
import RelatedPseoLinks from '@/components/pseo/RelatedPseoLinks';
import { composePseoBlocks, BlockIntent } from '@/lib/pseo-engine/composer';
import AnchorBlock from '@/components/pseo/blocks/AnchorBlock';
import FundingRealityCheck from '@/components/pseo/blocks/FundingRealityCheck';
import BestEntryStrategy from '@/components/pseo/blocks/BestEntryStrategy';
import DisqualifiersList from '@/components/pseo/blocks/DisqualifiersList';
import WhoWinsMatrix from '@/components/pseo/blocks/WhoWinsMatrix';
import FundingDensitySnapshot from '@/components/pseo/blocks/FundingDensitySnapshot';
import LocalBrokerStrategy from '@/components/pseo/blocks/LocalBrokerStrategy';
import NearbyAlternatives from '@/components/pseo/blocks/NearbyAlternatives';
import FundingDecisionTree from '@/components/pseo/blocks/FundingDecisionTree';
import LocalAdvantageHack from '@/components/pseo/blocks/LocalAdvantageHack';
import WhoShouldLeave from '@/components/pseo/blocks/WhoShouldLeave';
import KeyLocalInstitutions from '@/components/pseo/blocks/KeyLocalInstitutions';
import InsiderInsightQuotes from '@/components/pseo/blocks/InsiderInsightQuotes';
import MicroFAQ from '@/components/pseo/blocks/MicroFAQ';

const CANADIAN_REGION_SLUGS = new Set(['on', 'bc', 'ab', 'qc', 'mb', 'sk', 'ns', 'nl', 'nb', 'pe']);

function isCanadianRegion(regionSlug: string) {
    return CANADIAN_REGION_SLUGS.has(regionSlug);
}

function getRegionType(regionSlug: string) {
    return isCanadianRegion(regionSlug) ? 'province' : 'state';
}

function getCountryName(regionSlug: string) {
    return isCanadianRegion(regionSlug) ? 'Canada' : 'United States';
}

function getTopProgramNames(stateDetail?: StateDetailedGrant) {
    const programs = stateDetail?.topPrograms?.slice(0, 2).map(program => program.name).filter(Boolean) || [];
    return {
        first: programs[0] || 'state economic development incentives',
        second: programs[1] || 'local workforce training grants',
    };
}

// --- Industry-specific, data-rich short answers ---
// Each answer contains real program names, real dollar amounts, and real timelines.
const CANADA_INDUSTRY_SHORT_ANSWERS: Record<string, (city: string, province: string) => string> = {
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

const US_INDUSTRY_SHORT_ANSWERS: Record<string, (city: string, state: string, stateDetail?: StateDetailedGrant) => string> = {
    technology: (city, state, stateDetail) => {
        const { first, second } = getTopProgramNames(stateDetail);
        return `Technology startups in ${city} should start with a stack of federal R&D programs, ${state} incentives, and local startup support. ` +
            `The strongest U.S. routes are SBIR/STTR awards for technical innovation, R&D tax credits for qualified development work, and ${first} or ${second} for state-level growth. ` +
            `Most serious applications need a clear technical milestone, customer proof, job-creation plan, and enough working capital to bridge reimbursement timing.`;
    },
    agriculture: (city, state, stateDetail) => {
        const { first, second } = getTopProgramNames(stateDetail);
        return `Agriculture and farming businesses in ${city} can pursue USDA-backed grants, rural development loans, conservation incentives, and ${state} economic-development programs. ` +
            `Start with USDA Rural Development, USDA REAP for energy projects, ${first}, and ${second}. ` +
            `The best applications connect equipment, processing, export, or sustainability spending to measurable local jobs and farm productivity.`;
    },
    manufacturing: (city, state, stateDetail) => {
        const { first, second } = getTopProgramNames(stateDetail);
        return `Manufacturing companies in ${city} usually win support through workforce training grants, equipment incentives, tax credits, and expansion packages rather than simple cash grants. ` +
            `Compare ${first}, ${second}, state workforce funds, MEP support, and federal programs tied to reshoring, clean energy, or defense supply chains. ` +
            `Strong applications show capital investment, hiring commitments, supplier impact, and a realistic reimbursement timeline.`;
    },
    healthcare: (city, state, stateDetail) => {
        const { first, second } = getTopProgramNames(stateDetail);
        return `Healthcare and MedTech businesses in ${city} can combine NIH SBIR/STTR, state innovation incentives, hospital or university partnerships, and SBA-backed capital. ` +
            `For ${state} applicants, ${first} and ${second} are useful starting points when the project creates jobs, improves patient access, or commercializes validated technology. ` +
            `Expect reviewers to ask for compliance readiness, clinical evidence, budget controls, and a clear commercialization path.`;
    },
    'clean-energy': (city, state, stateDetail) => {
        const { first, second } = getTopProgramNames(stateDetail);
        return `Clean energy businesses in ${city} can target DOE funding, USDA REAP where eligible, clean-energy tax credits, utility rebates, and ${state} growth programs. ` +
            `Review ${first}, ${second}, local energy incentives, and federal programs tied to efficiency, grid modernization, or renewable deployment. ` +
            `The strongest applications quantify energy savings, emissions reductions, customer demand, and the capital needed before reimbursement.`;
    },
    'women-entrepreneurs': (city, state, stateDetail) => {
        const { first, second } = getTopProgramNames(stateDetail);
        return `Women-owned businesses in ${city} should compare SBA-backed lending, Women's Business Center support, supplier-diversity programs, local microgrants, and ${state} incentives. ` +
            `${first} and ${second} can be useful if the project creates jobs, expands facilities, or supports a priority industry. ` +
            `For very early-stage companies, private foundation grants and local business competitions may be faster than state discretionary awards.`;
    },
};

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

const DEFAULT_CANADA_SHORT_ANSWER = (industryName: string, city: string, province: string) =>
    `${industryName} businesses in ${city} can access $15,000 to $500,000+ in non-repayable government grants and subsidies. ` +
    `Key programs include federal wage subsidies (50–70% of new hire salaries), IRAP innovation funding (up to $500K), ` +
    `and CDAP digital adoption grants ($15,000 cash). ${province}-based businesses can stack federal and provincial programs simultaneously. ` +
    `Most hiring grants are approved within 2–4 weeks; innovation grants take 3–6 months.`;

const DEFAULT_US_SHORT_ANSWER = (
    industryName: string,
    city: string,
    state: string,
    stateDetail?: StateDetailedGrant
) => {
    const { first, second } = getTopProgramNames(stateDetail);

    return `${industryName} businesses in ${city} can pursue a mix of federal small-business programs, ${state} incentives, local workforce grants, and tax credits. ` +
        `Start with ${first}, ${second}, SBA or SBDC support, and industry-specific federal programs where the project fits. ` +
        `Most competitive applications show a clear use of funds, matching capital, local job impact, and documentation before spending begins.`;
};

function UsPseoGrantContent({
    page,
    stateDetail,
    regionType,
    countryName,
}: {
    page: PseoPage;
    stateDetail?: StateDetailedGrant;
    regionType: 'state' | 'province';
    countryName: 'United States' | 'Canada';
}) {
    const topPrograms = stateDetail?.topPrograms?.slice(0, 3) || [
        {
            name: 'SBIR/STTR Federal Research Awards',
            agency: 'U.S. federal agencies',
            fundingAmount: '$50,000 to $2,000,000+',
            deadline: 'Agency-specific solicitations',
            applicationProcess: 'Register, match a solicitation, submit a technical proposal, budget, and commercialization plan.',
            description: 'Non-dilutive research and development awards for companies building technically risky products with commercial potential.',
            eligibility: ['U.S. small business', 'Technical innovation', 'Commercialization plan'],
        },
        {
            name: 'SBA and SBDC Funding Support',
            agency: 'Small Business Administration',
            fundingAmount: 'Varies by program',
            deadline: 'Rolling',
            applicationProcess: 'Work with a local SBDC or lender to prepare eligibility, financials, and funding documentation.',
            description: 'Business counseling, lender readiness, loan support, and local program navigation for small businesses.',
            eligibility: ['Small business', 'Documented financials', 'Clear use of funds'],
        },
        {
            name: `${page.provinceName} Economic Development Incentives`,
            agency: `${page.provinceName} economic development agencies`,
            fundingAmount: 'Varies by project',
            deadline: 'Program-specific',
            applicationProcess: 'Confirm fit before spending, gather quotes, and document job creation or capital investment.',
            description: 'State or local incentives tied to hiring, facility expansion, training, equipment, or priority industries.',
            eligibility: ['Local presence', 'Measurable economic impact', 'Project not already completed'],
        },
    ];
    const primaryProgram = topPrograms[0];
    const secondaryProgram = topPrograms[1] || topPrograms[0];
    const resources = [
        ...(stateDetail?.resources?.slice(0, 4) || []),
        ...(stateDetail?.localResources?.slice(0, 2).map(resource => ({
            name: resource.name,
            url: resource.website,
            description: `${resource.location} support for ${resource.services.slice(0, 2).join(' and ')}.`,
        })) || []),
    ];

    return (
        <>
            <div id="landscape" className="prose prose-lg text-gray-700 max-w-none">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">{page.cityName} {page.industryName} Funding Landscape</h2>
                <p className="lead text-xl text-gray-800">
                    Funding for {page.industryName} businesses in {page.cityName} usually comes from a stack of federal programs, {page.provinceName} incentives, local economic-development support, and tax credits. The strongest opportunity is rarely a single grant; it is a documented project that matches a public goal such as job creation, workforce training, commercialization, rural development, export growth, or energy efficiency.
                </p>
                <p>
                    For a {page.provinceName} applicant, the first filter is fit. A company buying routine supplies, covering payroll gaps, or asking after expenses have already been incurred will struggle. A company that can show a project budget, matching funds, hiring impact, and a realistic implementation timeline has a much better chance of moving from research to approval.
                </p>
                <p>
                    Start with {primaryProgram.name} and {secondaryProgram.name}, then layer in SBA/SBDC support, industry-specific federal programs, and city or county incentives. This approach gives Google and users a clearer local funding map than a generic national grant list.
                </p>
            </div>

            <div id="top-programs" className="mt-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Top Programs to Check First</h2>
                <p className="text-xl text-gray-700 mb-8">
                    These programs are the practical starting points for {page.industryName} companies comparing funding in {page.cityName}, {page.provinceName}.
                </p>
                <div className="space-y-6">
                    {topPrograms.map((program, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                            <div className="flex items-start">
                                <div className="bg-blue-100 p-3 rounded-lg mr-4 mt-1">
                                    <BookOpen className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{program.name}</h3>
                                    <p className="text-sm font-semibold text-gray-500 mb-3">{program.agency} - {program.fundingAmount}</p>
                                    <p className="text-gray-700 leading-relaxed text-lg mb-5">{program.description}</p>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="bg-gray-50 border border-gray-200 p-4 rounded-md">
                                            <h4 className="font-bold text-gray-900 mb-2">Best Fit</h4>
                                            <ul className="list-disc pl-5 text-gray-700 space-y-1">
                                                {program.eligibility.slice(0, 3).map((item, itemIdx) => (
                                                    <li key={itemIdx}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="bg-yellow-50 border border-yellow-300 p-4 rounded-md">
                                            <h4 className="font-bold text-yellow-900 mb-2">Application Note</h4>
                                            <p className="text-yellow-900 text-sm">{program.applicationProcess}</p>
                                            <p className="text-yellow-900 text-sm mt-2">Timing: {program.deadline}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="my-12">
                <InlineCTA
                    title={`Need help finding the right ${page.cityName} grants?`}
                    description={`Our funding specialists help ${page.industryName} businesses compare federal, state, and local programs before they spend time on the wrong application.`}
                    buttonText="Get Free Assessment"
                    buttonLink="/get-started"
                />
            </div>

            <div className="my-8">
                <AdSlot adSlot={process.env.NEXT_PUBLIC_ADSENSE_IN_CONTENT_HORIZONTAL!} adFormat="horizontal" style={{ minHeight: '120px', width: '100%' }} />
            </div>

            <div id="capital-stacking" className="bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 rounded-xl p-10 mt-12 shadow-sm">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Capital Stacking Strategy</h2>
                <div className="space-y-4 text-gray-800 text-lg leading-relaxed">
                    <p>
                        A practical U.S. funding stack starts with the project, not the grant. Define the expense category first: hiring, equipment, R&D, facility expansion, export development, clean energy, or training. Then match that expense to the correct funding lane.
                    </p>
                    <p>
                        For {page.cityName} businesses, a common stack is local advisor support through an SBDC, a {page.provinceName} incentive or workforce program, federal support where the project qualifies, and a tax credit or lender-backed capital source for the portion that grants will not cover.
                    </p>
                    <p>
                        The key rule is timing. Many programs reimburse approved expenses, so spending before approval can make the cost ineligible. Keep quotes, payroll estimates, board approvals, and project milestones ready before submitting.
                    </p>
                </div>
            </div>

            <div id="tax-implications" className="prose prose-lg text-gray-700 max-w-none mt-12 bg-white border border-gray-200 p-8 rounded-xl shadow-sm">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-4">Tax and Compliance Notes</h2>
                <div className="space-y-4">
                    <p>
                        Grants, rebates, tax credits, and loan support do not behave the same way in your books. Some awards may be taxable income, some reduce eligible basis, and some require wage, investment, or location commitments after approval.
                    </p>
                    <p>
                        If your {page.industryName} project uses R&D tax credits, workforce credits, or clean-energy incentives, keep separate records for salaries, contractors, equipment, and dates of service. Do not blend grant-funded costs with unsupported operating expenses.
                    </p>
                    <p>
                        Before signing vendors or buying equipment, confirm whether the program requires pre-approval. This single timing mistake is one of the most common reasons otherwise strong applications are rejected.
                    </p>
                </div>
            </div>

            <div id="expert-framework" className="mt-16">
                <h2 className="text-4xl font-extrabold text-gray-900 mb-10">Application Framework</h2>
                <div className="space-y-10">
                    {[
                        {
                            phase: 'Step 1: Define the funded project',
                            details: `Write a one-page project brief for your ${page.cityName} operation: the problem, budget, timeline, expected jobs, measurable outcome, and why outside funding changes the speed or scope.`,
                        },
                        {
                            phase: 'Step 2: Match the right program lane',
                            details: `Compare ${primaryProgram.name}, ${secondaryProgram.name}, SBA/SBDC support, and federal programs tied to your industry. Eliminate programs that require a larger hiring commitment, different location, or expenses you have already incurred.`,
                        },
                        {
                            phase: 'Step 3: Build the evidence file',
                            details: `Prepare quotes, payroll records, tax documents, incorporation records, project milestones, and proof of matching funds. Reviewers need to see that the project is ready, not just interesting.`,
                        },
                        {
                            phase: 'Step 4: Apply before spending',
                            details: `For reimbursement programs, submit and wait for approval before committing funds. If you need to move quickly, ask the agency whether a formal notice to proceed is required.`,
                        },
                    ].map((step, idx) => (
                        <div key={idx} className="relative pl-12 border-l-4 border-primary pb-4">
                            <div className="absolute -left-5 top-0 bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-md ring-4 ring-white">
                                {idx + 1}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3 mt-1">{step.phase}</h3>
                            <p className="text-gray-700 text-lg leading-relaxed">{step.details}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div id="disqualifiers" className="bg-gray-50 border border-gray-200 rounded-xl p-10 mt-16 shadow-inner">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                    <Shield className="w-8 h-8 text-red-600" /> Common Reasons Applications Fail
                </h2>
                <ul className="space-y-4">
                    {[
                        'Expenses were incurred before the approval date.',
                        'The project does not create measurable local economic impact.',
                        'The company cannot show matching capital or bridge financing.',
                        'The application uses a generic business plan instead of the program scoring criteria.',
                        'The business is too early for discretionary state incentives and should start with SBDC, local, or private funding paths.',
                    ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-4">
                            <div className="bg-red-100 p-1.5 rounded-full mt-1 shrink-0">
                                <ChevronRight className="w-5 h-5 text-red-600" />
                            </div>
                            <span className="text-gray-800 text-lg font-medium">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 mt-16 shadow-sm">
                <h2 className="text-2xl font-bold text-blue-900 mb-4">{page.provinceName} Local Ecosystem Resources</h2>
                <p className="text-blue-800 mb-6 font-medium">Useful public resources for businesses comparing grants near {page.cityName}:</p>
                <div className="grid sm:grid-cols-2 gap-4">
                    {resources.length > 0 ? resources.map((resource, i) => (
                        <a key={i} href={resource.url} target="_blank" rel="noopener noreferrer" className="block bg-white p-4 rounded border border-blue-100 hover:border-blue-400 hover:shadow-md transition-all group">
                            <h4 className="font-bold text-gray-900 group-hover:text-blue-700 mb-2">{resource.name}</h4>
                            <p className="text-sm text-gray-600">{resource.description}</p>
                        </a>
                    )) : (
                        <p className="text-gray-600 italic">Start with the local SBDC, city economic development office, and {page.provinceName} business incentive portal.</p>
                    )}
                </div>
            </div>

            <PseoMasterclass
                industryName={page.industryName}
                cityName={page.cityName}
                provinceName={page.provinceName}
                regionType={regionType}
                countryName={countryName}
            />

            <div className="mt-16">
                <EligibleCheck />
            </div>
        </>
    );
}


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
export async function generateMetadata({ params }: { params: Promise<{ province: string, city: string, industry: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const page = getPseoPage(resolvedParams.province, resolvedParams.city, resolvedParams.industry);

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

    const isCanada = isCanadianRegion(page.provinceSlug);
    const countryName = getCountryName(page.provinceSlug);
    const stateDetail = isCanada ? undefined : getStateDetailBySlugOrAbbreviation(page.provinceSlug);
    const topPrograms = getTopProgramNames(stateDetail);

    const canadaTitlePatterns: Record<string, string> = {
        technology: `Best ${page.industryName} Grants in ${page.cityName}, ${page.provinceName} (2026) | IRAP, CDAP & SR&ED`,
        agriculture: `How to Get Agriculture Grants in ${page.cityName}, ${page.provinceName} [2026] | AgriInnovate, CAP & AAFC`,
        manufacturing: `${page.cityName} Manufacturing Grants 2026 | IRAP, SIF & ${page.provinceName} Funding`,
        healthcare: `Healthcare & MedTech Grants in ${page.cityName}, ${page.provinceName} (2026) | CIHR, IRAP & BDC`,
        'clean-energy': `Clean Tech Grants Near ${page.cityName}, ${page.provinceName} [2026] | SDTC, NRCan & Green Energy`,
        'women-entrepreneurs': `Best Grants for Women Entrepreneurs in ${page.cityName}, ${page.provinceName} (2026) | WES, BDC & FCC`,
    };
    const usTitlePatterns: Record<string, string> = {
        technology: `Best ${page.industryName} Grants in ${page.cityName}, ${page.provinceName} (2026) | SBIR, R&D Credits & State Incentives`,
        agriculture: `How to Get Agriculture Grants in ${page.cityName}, ${page.provinceName} [2026] | USDA, REAP & State Funding`,
        manufacturing: `${page.cityName} Manufacturing Grants 2026 | Workforce Funds, Tax Credits & ${page.provinceName} Incentives`,
        healthcare: `Healthcare & MedTech Grants in ${page.cityName}, ${page.provinceName} (2026) | NIH SBIR, SBA & State Programs`,
        'clean-energy': `Clean Energy Grants Near ${page.cityName}, ${page.provinceName} [2026] | DOE, USDA REAP & State Incentives`,
        'women-entrepreneurs': `Best Grants for Women Entrepreneurs in ${page.cityName}, ${page.provinceName} (2026) | SBA, State & Local Funds`,
    };
    const titlePatterns = isCanada ? canadaTitlePatterns : usTitlePatterns;
    const title = titlePatterns[page.industrySlug] ||
        `${page.industryName} Grants in ${page.cityName}, ${page.provinceName} [2026] | ${countryName} Funding Guide`;

    const canadaDescPatterns: Record<string, string> = {
        technology: `How to apply for technology grants in ${page.cityName}? Compare IRAP, CDAP, and SR&ED tax credits for ${page.provinceName} startups. 2026 guide with eligibility, amounts, and deadlines.`,
        agriculture: `${page.cityName} agriculture grants for 2026: AgriInnovate, CAP, and AAFC programs. Find out which ${page.provinceName} farming grants you qualify for with timelines and stacking tips.`,
        manufacturing: `Compare the best manufacturing grants in ${page.cityName}: SIF vs IRAP vs Skills Fund. ${page.provinceName} businesses can stack federal and provincial funding in 2026.`,
        healthcare: `Healthcare grants in ${page.cityName}: CIHR, IRAP Health Innovation, and BDC financing. ${page.provinceName} medtech startups can compare eligibility, timelines, and funding paths.`,
        'clean-energy': `Clean energy funding near ${page.cityName}: SDTC, NRCan, and clean-tech tax credits. ${page.provinceName} green businesses can compare federal and provincial programs.`,
        'women-entrepreneurs': `Government grants for women entrepreneurs in ${page.cityName}: WES, BDC, Futurpreneur, and ${page.provinceName} programs. Compare eligibility, deadlines, and application steps.`,
    };
    const usDescPatterns: Record<string, string> = {
        technology: `Technology grants in ${page.cityName}: compare SBIR/STTR, R&D tax credits, ${topPrograms.first}, and local startup support for ${page.provinceName} businesses in 2026.`,
        agriculture: `${page.cityName} agriculture grants for 2026: compare USDA Rural Development, REAP, ${topPrograms.first}, and ${page.provinceName} farm or rural business incentives.`,
        manufacturing: `Compare manufacturing grants in ${page.cityName}: workforce training funds, MEP support, tax credits, ${topPrograms.first}, and ${page.provinceName} expansion incentives.`,
        healthcare: `Healthcare and MedTech grants in ${page.cityName}: compare NIH SBIR/STTR, SBA-backed capital, ${topPrograms.first}, and ${page.provinceName} innovation programs.`,
        'clean-energy': `Clean energy funding near ${page.cityName}: compare DOE programs, USDA REAP, clean-energy tax credits, utility rebates, and ${page.provinceName} incentives.`,
        'women-entrepreneurs': `Grants and funding for women entrepreneurs in ${page.cityName}: compare SBA support, local microgrants, Women's Business Centers, and ${page.provinceName} incentives.`,
    };
    const descPatterns = isCanada ? canadaDescPatterns : usDescPatterns;
    const description = descPatterns[page.industrySlug] ||
        `How much can a ${page.industryName} business in ${page.cityName} get? Compare federal programs, ${page.provinceName} incentives, local grants, tax credits, and application steps for 2026.`;

    const canadaKeywords = [
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
    const usKeywords = [
        `${page.industryName.toLowerCase()} grants ${page.cityName}`,
        `small business grants ${page.cityName} ${page.provinceName}`,
        `how to apply for business grants in ${page.cityName}`,
        `best grants for ${page.industryName.toLowerCase()} ${page.provinceName}`,
        `${page.cityName} business funding 2026`,
        `SBIR grants ${page.provinceName}`,
        `SBA grants ${page.cityName}`,
        `R&D tax credits ${page.provinceName}`,
        `state incentives ${page.provinceName}`,
        `workforce training grants ${page.cityName}`,
        `non-dilutive funding ${page.cityName} ${page.provinceName}`,
        `${page.industryName.toLowerCase()} startup funding United States`,
        `government funding ${page.industryName.toLowerCase()} ${page.provinceName} 2026`,
    ];
    const baseKeywords = isCanada ? canadaKeywords : usKeywords;

    return {
        title,
        description,
        keywords: baseKeywords.join(', '),
        alternates: {
            canonical: `https://www.fsidigital.ca/grants/${page.provinceSlug}/${page.citySlug}/${page.industrySlug}`,
        },
        robots: {
            index: true,
            follow: true
        },
        openGraph: {
            title,
            description,
            type: 'article',
            publishedTime: page.publishedAt,
        }
    };
}

export default async function PseoLandingPage({ params }: { params: Promise<{ province: string, city: string, industry: string }> }) {
    const resolvedParams = await params;
    const page = getPseoPage(resolvedParams.province, resolvedParams.city, resolvedParams.industry);

    // Hard 404 gatekeeper if the route is invalid or the drip date is in the future
    if (!page || !page.isPublished) {
        notFound();
    }

    const isCanada = isCanadianRegion(page.provinceSlug);
    const regionType = getRegionType(page.provinceSlug);
    const countryName = getCountryName(page.provinceSlug);
    const stateDetail = isCanada ? undefined : getStateDetailBySlugOrAbbreviation(page.provinceSlug);

    const schema = generatePseoSchema(
        page.cityName,
        page.provinceName,
        page.industryName,
        `https://www.fsidigital.ca/grants/${page.provinceSlug}/${page.citySlug}/${page.industrySlug}`,
        page.publishedAt
    );

    // Build the short answer — industry-specific or fall back to generic
    const canadaShortAnswerFn = CANADA_INDUSTRY_SHORT_ANSWERS[page.industrySlug];
    const usShortAnswerFn = US_INDUSTRY_SHORT_ANSWERS[page.industrySlug];
    const shortAnswerContent = isCanada
        ? (canadaShortAnswerFn
            ? canadaShortAnswerFn(page.cityName, page.provinceName)
            : DEFAULT_CANADA_SHORT_ANSWER(page.industryName, page.cityName, page.provinceName))
        : (usShortAnswerFn
            ? usShortAnswerFn(page.cityName, page.provinceName, stateDetail)
            : DEFAULT_US_SHORT_ANSWER(page.industryName, page.cityName, page.provinceName, stateDetail));

    // --- PHASE 4 COMPOSER LOGIC ---
    const intents: BlockIntent[] = ['informational', 'transactional', 'comparative'];
    const assignedIntent = intents[(page.citySlug.length + page.provinceSlug.length + page.industrySlug.length) % 3];

    const blocksData = composePseoBlocks({
        tier: (page.tier as any) || 'C',
        industrySlug: page.industrySlug,
        citySlug: page.citySlug,
        cityName: page.cityName,
        stateSlug: page.provinceSlug,
        intent: assignedIntent
    });

    const shortAnswerQuestion = `How much funding can a ${page.industryName} business in ${page.cityName}, ${page.provinceName} get?`;

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.fsidigital.ca" },
            { "@type": "ListItem", "position": 2, "name": "Grant Database", "item": "https://www.fsidigital.ca/grants" },
            { "@type": "ListItem", "position": 3, "name": `${page.provinceName} Grants`, "item": `https://www.fsidigital.ca/grants/${page.provinceSlug}` },
            { "@type": "ListItem", "position": 4, "name": `${page.cityName} Grants`, "item": `https://www.fsidigital.ca/grants/${page.provinceSlug}/${page.citySlug}` },
            { "@type": "ListItem", "position": 5, "name": `${page.industryName} Grants in ${page.cityName}`, "item": `https://www.fsidigital.ca/grants/${page.provinceSlug}/${page.citySlug}/${page.industrySlug}` },
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
            {/* Hero Section */}
            <section className="bg-white border-b border-gray-200 pt-16 pb-12 lg:pt-24 lg:pb-16 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Breadcrumb */}
                    <nav className="mb-6 flex items-center text-sm text-gray-500 gap-1 flex-wrap">
                        <Link href="/" className="hover:text-green-600">Home</Link>
                        <ChevronRight className="w-3 h-3" />
                        <Link href="/grants" className="hover:text-green-600">Grant Database</Link>
                        <ChevronRight className="w-3 h-3" />
                        <Link href={`/grants/${page.provinceSlug}`} className="hover:text-green-600">{page.provinceName}</Link>
                        <ChevronRight className="w-3 h-3" />
                        <Link href={`/grants/${page.provinceSlug}/${page.citySlug}`} className="hover:text-green-600">{page.cityName}</Link>
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
                    
                    {/* PHASE 4: Dynamic Composed Blocks Render Output */}
                    <div className="mt-12 mb-8">
                        {blocksData.map((block, idx) => {
                            switch (block.type) {
                                case 'AnchorBlock': return <AnchorBlock key={idx} {...block.props} />;
                                case 'FundingRealityCheck': return <FundingRealityCheck key={idx} {...block.props} />;
                                case 'BestEntryStrategy': return <BestEntryStrategy key={idx} {...block.props} />;
                                case 'DisqualifiersList': return <DisqualifiersList key={idx} {...block.props} />;
                                case 'WhoWinsMatrix': return <WhoWinsMatrix key={idx} />;
                                case 'FundingDensitySnapshot': return <FundingDensitySnapshot key={idx} />;
                                case 'LocalBrokerStrategy': return <LocalBrokerStrategy key={idx} />;
                                case 'NearbyAlternatives': return <NearbyAlternatives key={idx} {...block.props} />;
                                case 'FundingDecisionTree': return <FundingDecisionTree key={idx} />;
                                case 'LocalAdvantageHack': return <LocalAdvantageHack key={idx} />;
                                case 'WhoShouldLeave': return <WhoShouldLeave key={idx} />;
                                case 'KeyLocalInstitutions': return <KeyLocalInstitutions key={idx} />;
                                case 'InsiderInsightQuotes': return <InsiderInsightQuotes key={idx} />;
                                case 'MicroFAQ': return <MicroFAQ key={idx} {...block.props} />;
                                default: return null; 
                            }
                        })}
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
                            if (!isCanada) {
                                return (
                                    <UsPseoGrantContent
                                        page={page}
                                        stateDetail={stateDetail}
                                        regionType={regionType}
                                        countryName={countryName}
                                    />
                                );
                            }

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

                                    
                                    {/* SEO Word Count Expansion Module (Interaction Safe) */}
                                    <PseoMasterclass 
                                        industryName={page.industryName} 
                                        cityName={page.cityName} 
                                        provinceName={page.provinceName} 
                                        regionType={regionType}
                                        countryName={countryName}
                                    />
                                    
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
                        <Link href={`/grants/${page.provinceSlug}`} className="text-primary hover:underline font-medium flex items-center">
                            <BookOpen className="w-4 h-4 mr-2" /> {page.provinceName} Grant Hub
                        </Link>
                        <span className="hidden sm:inline text-gray-300">|</span>
                        <Link href={`/grants/${page.provinceSlug}/${page.citySlug}`} className="text-primary hover:underline font-medium flex items-center">
                            <MapPin className="w-4 h-4 mr-2" /> {page.cityName} Grant Hub
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
            
            {/* Massive Internal Linking Expansion */}
            <RelatedPseoLinks 
                currentProvinceSlug={page.provinceSlug} 
                currentCitySlug={page.citySlug} 
                currentIndustrySlug={page.industrySlug} 
            />

            </div>
            {/* Bottom Ad */}
            <div className="container mx-auto px-4 py-4">
              <AdSlot adSlot={process.env.NEXT_PUBLIC_ADSENSE_IN_CONTENT_RECTANGLE!} adFormat="rectangle" style={{ minHeight: '250px' }} />
            </div>
            <Footer />
        </div>
    );
}
