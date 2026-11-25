import { NextResponse } from 'next/server';
import { getAllPrograms } from '@/lib/data/programs';
import { PRODUCTS } from '@/lib/products/catalog';
import { PARTNER_PACKAGES } from '@/lib/partners/packages';
import { ADVERTISING_PACKAGES } from '@/lib/advertising/config';

export const dynamic = 'force-static';

const SITE_URL = 'https://www.fsidigital.ca';

const CORE_GUIDES: Array<{ slug: string; title: string; summary: string }> = [
  { slug: 'apply-federal-grants', title: 'How to Apply for Canadian Federal Business Grants', summary: 'Step-by-step preparation guide for SR&ED, IRAP, and federal R&D programs.' },
  { slug: 'apply-ontario-business-grants', title: 'Ontario Business Grants Application Guide', summary: 'Provincial hiring, innovation, and regional development funding workflows.' },
  { slug: 'apply-alberta-business-grants', title: 'Alberta Business Grants Application Guide', summary: 'Clean-tech, innovation, and SME expansion grants across Alberta.' },
  { slug: 'apply-british-columbia-grants', title: 'British Columbia Business Grants Guide', summary: 'Provincial hiring credits, digital adoption, and BC innovation funding.' },
  { slug: 'apply-quebec-business-grants', title: 'Quebec Business Grants Application Guide', summary: 'Investissement Québec, R&D credits, and provincial SME incentives.' },
  { slug: 'sred-application-guide', title: 'SR&ED Tax Credit Application & Audit Readiness Guide', summary: 'Contemporaneous technical log standards, T661 preparation, and CRA documentation.' },
  { slug: 'apply-irap-grants', title: 'NRC IRAP Funding Application Guide', summary: 'Preparing ITA technical pitches, project milestones, and wage-support claims.' },
  { slug: 'apply-csbfp-government-financing', title: 'Canada Small Business Financing Program (CSBFP) Guide', summary: 'Government-backed loan guarantees up to $1.15M for equipment, leasehold, and real property.' },
  { slug: 'sba-application-process', title: 'US SBA Financing & Application Readiness Guide', summary: 'US SBA 7(a), 504, and microloan qualification and lender packaging standards.' },
  { slug: 'sbir-research-grants-guide', title: 'US SBIR / STTR R&D Grants Guide', summary: 'Phase I and Phase II federal research commercialization pathways.' },
];

export async function GET() {
  const programs = getAllPrograms();
  const openPrograms = programs.filter((p) => p.status === 'Open');
  const caOpen = openPrograms.filter((p) => p.country === 'Canada').length;
  const usOpen = openPrograms.filter((p) => p.country === 'USA').length;

  const selfServeIds = [
    'funding-match-report',
    'funding-toolkit',
    'funding-membership',
    'funding-roadmap',
    'funding-bundle',
  ] as const;

  const productLines = selfServeIds
    .map((id) => PRODUCTS[id])
    .filter(Boolean)
    .map((p) => {
      const priceLabel = p.id === 'funding-membership' ? `$${p.priceUsd}/month USD` : `$${p.priceUsd} USD one-time`;
      const pathUrl =
        p.id === 'funding-match-report'
          ? '/products/funding-match-report'
          : p.id === 'funding-toolkit'
            ? '/products/toolkit'
            : p.id === 'funding-membership'
              ? '/membership'
              : p.id === 'funding-roadmap'
                ? '/products/action-plan'
                : '/products/bundle';
      return `- [${p.name} (${priceLabel})](${SITE_URL}${pathUrl}): ${p.tagline}`;
    })
    .join('\n');

  const partnerLines = PARTNER_PACKAGES.map(
    (pkg) => `- [${pkg.name} ($${pkg.priceUsd} USD — ${pkg.leadCount})](${SITE_URL}/partners): ${pkg.description}`
  ).join('\n');

  const adLines = Object.values(ADVERTISING_PACKAGES)
    .filter((pkg) => pkg.directCheckout)
    .map((pkg) => `- [${pkg.name} (${pkg.priceDisplay})](${SITE_URL}/advertise): ${pkg.tagline}`)
    .join('\n');

  const topPrograms = openPrograms
    .slice(0, 12)
    .map((p) => `- [${p.name} (${p.country} — ${p.region})](${p.officialWebsite}): ${p.fundingType} (${p.fundingAmount}). ${p.description}`)
    .join('\n');

  const body = `# FSI Digital

> Commercial Funding Intelligence Platform helping Canadian and US founders evaluate non-dilutive government grants, tax credits, loans, and financing readiness across ${programs.length} tracked programs (${caOpen} open in Canada, ${usOpen} open in the USA).

FSI Digital provides deterministic cross-border eligibility matching (all Canadian provinces/territories plus 50 US states and DC), self-serve diagnostic reports, document readiness checklists, and vetted funding partner introductions where explicitly consented. FSI Digital is an independent intelligence and workflow platform—not a government agency—and never guarantees grant approval or financing outcomes.

## Core Interactive Tools

- [Business Funding Eligibility Calculator](${SITE_URL}/calculator): Multi-step non-dilutive grant, tax credit, and loan matcher for Canada & USA.
- [AI Grant Finder](${SITE_URL}/grant-finder): Fast profile-based federal, provincial, and state program screening.
- [Working Capital & MCA Readiness Calculator](${SITE_URL}/funding-calculator): Revenue-based financing estimate and qualification screener.
- [Priority Financing Readiness Application](${SITE_URL}/apply): Partner-consented working capital and commercial readiness intake.

## Self-Serve Products & Pricing Ladder

${productLines}

## Regional & Sector Funding Hubs

- [Canada Business Grants Hub](${SITE_URL}/canada): Complete index of Canadian federal, provincial, and territorial programs.
- [Canada Government Grants](${SITE_URL}/canada/government-grants): Federal and provincial grant directory for incorporated SMEs and startups.
- [Canada Small Business Grants](${SITE_URL}/canada/small-business-grants): Growth, hiring, and working-capital funding opportunities across Canada.
- [Canada Innovation & R&D Grants](${SITE_URL}/canada/innovation-grants): SR&ED, IRAP, MITACS, and R&D commercialization programs.
- [USA Grants & State Hub](${SITE_URL}/usa): Cross-border federal, SBA, SBIR/STTR, and 50-state program directory.
- [USA Federal Grants](${SITE_URL}/usa/federal-grants): Federal innovation, energy, and small-business funding resources.
- [USA Small Business Grants](${SITE_URL}/usa/small-business-grants): State and local SME grant pathways across the United States.

## Application Guides

${CORE_GUIDES.map((g) => `- [${g.title}](${SITE_URL}/guides/${g.slug}): ${g.summary}`).join('\n')}

## Representative Open Programs

${topPrograms}

## B2B Partner & Sponsored Media Offerings

${partnerLines}
${adLines}

## Documentation & Optional

- [Full Structured Corpus (/llms-full.txt)](${SITE_URL}/llms-full.txt): Complete markdown catalog of all ${programs.length} tracked funding programs, products, and guides.
- [Editorial Insights & Grant News](${SITE_URL}/blog): Program deadline updates, compliance briefs, and non-dilutive funding analysis.
- [Contact](${SITE_URL}/contact): Business inquiries and automated funding alert opt-in.
- [Privacy Policy](${SITE_URL}/privacy) & [Terms of Service](${SITE_URL}/terms)
`;

  return new NextResponse(body.trim() + '\n', {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
