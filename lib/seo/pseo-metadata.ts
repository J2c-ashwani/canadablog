// lib/seo/pseo-metadata.ts
// CTR-optimized metadata generation for pSEO grant pages
// Separated from page.tsx for maintainability
import type { Metadata } from 'next';
import { getPseoPage, type PseoPage } from '@/lib/pseo-data';
import { getStateDetailBySlugOrAbbreviation, type StateDetailedGrant } from '@/lib/data/stateDetails';
import { isSearchDistributionCohortPath } from '@/lib/seo/searchDistributionRollout';

const CANADIAN_REGION_SLUGS = new Set(['on', 'bc', 'ab', 'qc', 'mb', 'sk', 'ns', 'nl', 'nb', 'pe']);

function isCanadianRegion(regionSlug: string) {
    return CANADIAN_REGION_SLUGS.has(regionSlug);
}

function getCountryName(regionSlug: string) {
    return isCanadianRegion(regionSlug) ? 'Canada' : 'United States';
}

// --- CTR-optimized title data: real dollar amounts and program counts per industry ---
const INDUSTRY_FUNDING_DATA: Record<string, { fundingRange: string; programCount: number; topProgram: string }> = {
    technology: { fundingRange: '$15K–$500K+', programCount: 9, topProgram: 'SR&ED' },
    agriculture: { fundingRange: '$10K–$1M+', programCount: 5, topProgram: 'AgriInnovate' },
    manufacturing: { fundingRange: '$25K–$2M+', programCount: 9, topProgram: 'SIF' },
    healthcare: { fundingRange: '$20K–$500K+', programCount: 6, topProgram: 'CIHR' },
    'clean-energy': { fundingRange: '$50K–$5M+', programCount: 7, topProgram: 'NRCan' },
    'women-entrepreneurs': { fundingRange: '$5K–$100K+', programCount: 6, topProgram: 'WES' },
    'restaurants-hospitality': { fundingRange: '$2K–$75K', programCount: 4, topProgram: 'CDAP' },
    retail: { fundingRange: '$5K–$100K+', programCount: 5, topProgram: 'CanExport' },
    'non-profits': { fundingRange: '$10K–$500K', programCount: 3, topProgram: 'CSRF' },
    veterans: { fundingRange: '$10K–$250K+', programCount: 4, topProgram: 'VAC' },
    'minority-owned': { fundingRange: '$5K–$100K+', programCount: 4, topProgram: 'BEP' },
    'arts-entertainment': { fundingRange: '$15K–$250K+', programCount: 5, topProgram: 'CMF' },
    education: { fundingRange: '$20K–$350K+', programCount: 4, topProgram: 'Mitacs' },
    logistics: { fundingRange: '$20K–$500K+', programCount: 5, topProgram: 'Green Fleet' },
    construction: { fundingRange: '$10K–$250K+', programCount: 4, topProgram: 'Canada Job Grant' },
};

// Audience-friendly short names for industries in titles
const INDUSTRY_TITLE_LABELS: Record<string, string> = {
    technology: 'Tech Startups',
    agriculture: 'Farm & Agri-Food',
    manufacturing: 'Manufacturers',
    healthcare: 'Healthcare & MedTech',
    'clean-energy': 'Clean Energy',
    'women-entrepreneurs': 'Women-Owned Businesses',
    'restaurants-hospitality': 'Restaurants & Hospitality',
    retail: 'Retail & E-Commerce',
    'non-profits': 'Non-Profits',
    veterans: 'Veteran-Owned Businesses',
    'minority-owned': 'Minority-Owned Businesses',
    'arts-entertainment': 'Arts & Creative',
    education: 'Education & EdTech',
    logistics: 'Logistics & Supply Chain',
    construction: 'Construction & Trades',
};

function getStateFundingHighlight(stateDetail: StateDetailedGrant | undefined) {
    if (!stateDetail || !stateDetail.topPrograms?.length) {
        return { topName: '', programCount: 0 };
    }
    return {
        topName: stateDetail.topPrograms[0]?.name || '',
        programCount: stateDetail.topPrograms.length,
    };
}

/**
 * Generates CTR-optimized metadata for pSEO grant pages.
 * Title formula: [Dollar Amount] + [Audience] + [City] — [Program Count] + [Urgency]
 * Description formula: [City] [audience]: [Program1] ($amount), [Program2], [Program3]. Check eligibility.
 */
export function generatePseoMetadata(page: PseoPage): Metadata {
    const isCanada = isCanadianRegion(page.provinceSlug);
    const stateDetail = isCanada ? undefined : getStateDetailBySlugOrAbbreviation(page.provinceSlug);
    const stateHighlight = getStateFundingHighlight(stateDetail);
    const industryData = INDUSTRY_FUNDING_DATA[page.industrySlug] || { fundingRange: '$5K–$250K+', programCount: 4, topProgram: 'Federal' };
    const audienceLabel = INDUSTRY_TITLE_LABELS[page.industrySlug] || page.industryName;
    const stateAbbr = page.provinceSlug.toUpperCase();

    // ------- TITLE GENERATION -------
    let title: string;

    if (isCanada) {
        const canadaTitles: Record<string, string> = {
            technology: `${industryData.fundingRange} for Tech Startups in ${page.cityName} — ${industryData.programCount} Grants Open`,
            agriculture: `${industryData.fundingRange} Farm & Agri-Food Grants in ${page.cityName} (2026 Guide)`,
            manufacturing: `${industryData.fundingRange} Manufacturing Grants in ${page.cityName} — ${industryData.programCount} Open`,
            healthcare: `${industryData.fundingRange} Healthcare & MedTech Grants in ${page.cityName} (2026)`,
            'clean-energy': `${industryData.fundingRange} Clean Energy Grants in ${page.cityName} — ${industryData.programCount} Programs`,
            'women-entrepreneurs': `${industryData.fundingRange} Grants for Women Entrepreneurs in ${page.cityName} (2026)`,
            'restaurants-hospitality': `${industryData.fundingRange} Grants for Restaurants in ${page.cityName} — 4 Open (2026)`,
            retail: `${industryData.fundingRange} Retail & E-Commerce Grants in ${page.cityName} (2026)`,
            'non-profits': `${industryData.fundingRange} Non-Profit Grants in ${page.cityName} — ${industryData.programCount} Programs Open`,
            veterans: `${industryData.fundingRange} Veteran Business Grants in ${page.cityName} (2026 Guide)`,
            'minority-owned': `${industryData.fundingRange} Grants for Minority-Owned Businesses in ${page.cityName} (2026)`,
            'arts-entertainment': `${industryData.fundingRange} Arts & Creative Grants in ${page.cityName} — ${industryData.programCount} Programs`,
            education: `${industryData.fundingRange} Education & EdTech Grants in ${page.cityName} (2026)`,
            logistics: `${industryData.fundingRange} Logistics & Transport Grants in ${page.cityName} (2026)`,
            construction: `${industryData.fundingRange} Construction & Trade Grants in ${page.cityName} (2026)`,
        };
        title = canadaTitles[page.industrySlug] ||
            `${industryData.fundingRange} ${page.industryName} Grants in ${page.cityName} (2026)`;
    } else {
        const stateProgramName = stateHighlight.topName ? ` — ${stateHighlight.topName}` : '';
        const totalPrograms = Math.max(industryData.programCount, stateHighlight.programCount);

        const usTitles: Record<string, string> = {
            technology: `${industryData.fundingRange} Tech Startup Grants in ${page.cityName}, ${stateAbbr} — SBIR + State`,
            agriculture: `${industryData.fundingRange} Farm & AgTech Grants in ${page.cityName}, ${stateAbbr} (2026)`,
            manufacturing: `${industryData.fundingRange} Manufacturing Grants in ${page.cityName}, ${stateAbbr} (2026)`,
            healthcare: `${industryData.fundingRange} Healthcare & MedTech Grants in ${page.cityName}, ${stateAbbr}`,
            'clean-energy': `${industryData.fundingRange} Clean Energy Grants in ${page.cityName}, ${stateAbbr} (2026)`,
            'women-entrepreneurs': `${industryData.fundingRange} Grants for Women Entrepreneurs in ${page.cityName}, ${stateAbbr} (2026)`,
            'restaurants-hospitality': `${industryData.fundingRange} Restaurant Grants in ${page.cityName}, ${stateAbbr} (2026 Guide)`,
            retail: `${industryData.fundingRange} Retail & Small Business Grants in ${page.cityName}, ${stateAbbr} (2026)`,
            'non-profits': `${industryData.fundingRange} Non-Profit Grants in ${page.cityName}, ${stateAbbr} (2026 Guide)`,
            veterans: `${industryData.fundingRange} Veteran Business Grants in ${page.cityName}, ${stateAbbr} (2026)`,
            'minority-owned': `${industryData.fundingRange} Minority Business Grants in ${page.cityName}, ${stateAbbr} (2026)`,
            'arts-entertainment': `${industryData.fundingRange} Arts & Creative Grants in ${page.cityName}, ${stateAbbr} (2026)`,
            education: `${industryData.fundingRange} Education & EdTech Grants in ${page.cityName}, ${stateAbbr} (2026)`,
            logistics: `${industryData.fundingRange} Logistics & Supply Chain Grants in ${page.cityName}, ${stateAbbr}`,
            construction: `${industryData.fundingRange} Construction & Trade Grants in ${page.cityName}, ${stateAbbr} (2026)`,
        };
        title = usTitles[page.industrySlug] ||
            `${industryData.fundingRange} ${page.industryName} Grants in ${page.cityName}, ${stateAbbr} (2026)`;
    }

    // ------- DESCRIPTION GENERATION -------
    let description: string;

    if (isCanada) {
        const canadaDescs: Record<string, string> = {
            technology: `${page.cityName} tech startups: CDAP ($15K cash), SR&ED (35–70% R&D costs back), IRAP (up to $500K). Stack federal + ${page.provinceName} grants. Check eligibility now.`,
            agriculture: `${page.cityName} farmers: AgriInnovate (up to $10M), CAP ($25K cost-shared), AAFC equipment grants. ${page.provinceName} applications reviewed Jan–Mar for priority funding.`,
            manufacturing: `${page.cityName} manufacturers: SIF for large upgrades, IRAP ($500K R&D), ${page.provinceName} Skills Fund (50–80% training costs). Stack CDAP + federal credits.`,
            healthcare: `${page.cityName} medtech: CIHR ($500K over 5 years), IRAP Health Innovation ($500K), ${page.provinceName} digital health fund. Decisions in 60–90 days.`,
            'clean-energy': `${page.cityName} clean tech: NRCan ($5M), SDTC ($3M), 30% clean-tech investment tax credit. ${page.provinceName} startups also qualify for iCAN seed funding.`,
            'women-entrepreneurs': `${page.cityName} women founders: WES ($60K grants), BDC Women in Tech ($3M), FCC Pathways ($150K interest-free). No equity required.`,
            'restaurants-hospitality': `${page.cityName} restaurants: CDAP ($2,400 microgrant), provincial hiring vouchers (50% wages), energy retrofit grants ($15K). ${page.provinceName} seasonal priority.`,
            retail: `${page.cityName} retailers: CDAP ($15K for POS/ERP), CanExport ($50K export costs), local storefront grants. Stack federal + ${page.provinceName} credits.`,
            'non-profits': `${page.cityName} non-profits: CSRF grants, Canada Summer Jobs (100% wage subsidy), Mitacs (50% intern stipends). ${page.provinceName} requires audited financials.`,
            veterans: `${page.cityName} veteran businesses: VAC Entrepreneur Program, regional agency grants, training subsidies (83% costs). Diverse Supplier fast-track in ${page.provinceName}.`,
            'minority-owned': `${page.cityName} BIPOC founders: BEP ecosystem grants, Indigenous Business Canada, diverse supplier matching. Stack with ${page.provinceName} micro-finance.`,
            'arts-entertainment': `${page.cityName} arts orgs: Cultural Spaces Fund, CMF digital media, IDM tax credits (40% labor). ${page.provinceName} arts councils — biannual intakes.`,
            education: `${page.cityName} EdTech: Mitacs Accelerate (50% stipends), curriculum vouchers, CDAP ($15K for LMS). Stack R&D credits + ${page.provinceName} youth hiring subsidies.`,
            logistics: `${page.cityName} logistics: Green vehicle rebates ($50K/truck), transport safety grants, CDAP for ERP. ${page.provinceName} R&D credits for routing algorithms.`,
            construction: `${page.cityName} trades: Canada Job Grant (83% training costs), apprentice credits ($10K/year), retrofit programs. ${page.provinceName} priority for skills fund.`,
        };
        description = canadaDescs[page.industrySlug] ||
            `${page.cityName} ${page.industryName.toLowerCase()} businesses: compare ${industryData.programCount} federal + ${page.provinceName} programs worth ${industryData.fundingRange}. Check eligibility — no equity required.`;
    } else {
        const statePrograms = stateDetail?.topPrograms?.slice(0, 2) || [];
        const prog1 = statePrograms[0] ? `${statePrograms[0].name} (${statePrograms[0].fundingAmount.split(' ')[0]})` : 'state incentives';
        const prog2 = statePrograms[1] ? `${statePrograms[1].name}` : 'workforce grants';

        const usDescs: Record<string, string> = {
            technology: `${page.cityName} tech startups: SBIR ($150K–$1M), R&D tax credits, ${prog1}, ${prog2}. ${page.provinceName} businesses — check eligibility now.`,
            agriculture: `${page.cityName} farms: USDA Rural Dev, REAP, ${prog1}. Compare ${page.provinceName} agriculture incentives. No equity, no repayment on grants.`,
            manufacturing: `${page.cityName} manufacturers: MEP support, workforce training, ${prog1}, ${prog2}. ${page.provinceName} tax credits + federal programs.`,
            healthcare: `${page.cityName} medtech: NIH SBIR ($250K–$2M), SBA capital, ${prog1}. ${page.provinceName} innovation programs — check eligibility.`,
            'clean-energy': `${page.cityName} clean energy: DOE grants, USDA REAP, utility rebates, ${prog1}. ${page.provinceName} incentives for green businesses.`,
            'women-entrepreneurs': `${page.cityName} women founders: SBA WOSB set-asides, local microgrants, WBCs, ${prog1}. ${page.provinceName} programs — no equity required.`,
            'restaurants-hospitality': `${page.cityName} restaurants: SBA microloans, ${prog1}, workforce grants, utility rebates. ${page.provinceName} programs for dining + hospitality.`,
            retail: `${page.cityName} retailers: SBA capital, ${prog1}, export support, storefront improvement grants. ${page.provinceName} tax credits for small business.`,
            'non-profits': `${page.cityName} non-profits: SBA Growth Accelerator, ${prog1}, community development grants. ${page.provinceName} programs open — apply 2026.`,
            veterans: `${page.cityName} veteran businesses: SBA VOSB set-asides, ${prog1}, procurement programs. ${page.provinceName} veteran incentives — check eligibility.`,
            'minority-owned': `${page.cityName} minority founders: ${prog1}, ${prog2}, SBA 8(a) Business Development. ${page.provinceName} inclusion grants — apply now.`,
            'arts-entertainment': `${page.cityName} arts orgs: NEA grants, ${prog1}, municipal cultural funds. ${page.provinceName} creative incentives — applications open.`,
            education: `${page.cityName} EdTech: ${prog1}, workforce development, SBIR education grants. ${page.provinceName} programs for training providers.`,
            logistics: `${page.cityName} logistics: SBIR, ${prog1}, green fleet rebates, ${prog2}. ${page.provinceName} supply chain incentives — apply 2026.`,
            construction: `${page.cityName} trades: ${prog1}, apprenticeship credits, workforce training. ${page.provinceName} construction incentives — check eligibility.`,
        };
        description = usDescs[page.industrySlug] ||
            `${page.cityName} ${page.industryName.toLowerCase()} businesses: compare SBIR, ${prog1}, and ${page.provinceName} incentives. ${industryData.programCount} programs worth ${industryData.fundingRange}. Check eligibility.`;
    }

    const keywords = isCanada
        ? [
            `${page.industryName.toLowerCase()} grants ${page.cityName}`,
            `government grants ${page.cityName} ${page.provinceName}`,
            `how to apply for grants in ${page.cityName}`,
            `${page.cityName} business funding 2026`,
            `small business grants near ${page.cityName}`,
            `non-repayable grants ${page.cityName} ${page.provinceName}`,
            `how much funding ${page.industryName.toLowerCase()} ${page.cityName}`,
        ]
        : [
            `${page.industryName.toLowerCase()} grants ${page.cityName}`,
            `small business grants ${page.cityName} ${page.provinceName}`,
            `${page.cityName} business funding 2026`,
            `SBIR grants ${page.provinceName}`,
            `non-dilutive funding ${page.cityName} ${page.provinceName}`,
            `how much funding ${page.industryName.toLowerCase()} ${page.cityName}`,
        ];

    return {
        title,
        description,
        keywords: keywords.join(', '),
        alternates: {
            canonical: `https://www.fsidigital.ca/grants/${page.provinceSlug}/${page.citySlug}/${page.industrySlug}`,
        },
        robots: { index: true, follow: true },
        openGraph: {
            title,
            description,
            type: 'article',
            publishedTime: page.publishedAt,
        },
    };
}
