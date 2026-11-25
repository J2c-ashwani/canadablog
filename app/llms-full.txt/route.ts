import { NextResponse } from 'next/server';
import { getAllPrograms } from '@/lib/data/programs';
import { getAllBlogPosts, slugToPath } from '@/lib/data/blogPosts';
import { PRODUCTS } from '@/lib/products/catalog';
import { PARTNER_PACKAGES } from '@/lib/partners/packages';
import { ADVERTISING_PACKAGES } from '@/lib/advertising/config';

export const dynamic = 'force-static';

const SITE_URL = 'https://www.fsidigital.ca';

export async function GET() {
  const programs = getAllPrograms();
  const blogPosts = getAllBlogPosts();

  const selfServeIds = [
    'funding-match-report',
    'funding-toolkit',
    'funding-membership',
    'funding-roadmap',
    'funding-bundle',
  ] as const;

  const productsSection = selfServeIds
    .map((id) => PRODUCTS[id])
    .filter(Boolean)
    .map((p) => {
      const price = p.id === 'funding-membership' ? `$${p.priceUsd}/month USD` : `$${p.priceUsd} USD one-time`;
      return `### ${p.name} (${price})
- ID: \`${p.id}\`
- Description: ${p.description}
- Inclusions:
${p.features.map((f) => `  - ${f}`).join('\n')}`;
    })
    .join('\n\n');

  const partnersSection = PARTNER_PACKAGES.map(
    (pkg) => `### ${pkg.name} ($${pkg.priceUsd} USD — ${pkg.leadCount})
- Lead Type: ${pkg.leadType}
- Description: ${pkg.description}
- Delivery: ${pkg.delivery}
- Highlights: ${pkg.features.join('; ')}`
  ).join('\n\n');

  const adsSection = Object.values(ADVERTISING_PACKAGES)
    .map(
      (pkg) => `### ${pkg.name} (${pkg.priceDisplay})
- Turnaround: ${pkg.turnaround} | Max Links: ${pkg.maxLinks}
- Description: ${pkg.tagline}`
    )
    .join('\n\n');

  const caPrograms = programs.filter((p) => p.country === 'Canada');
  const usPrograms = programs.filter((p) => p.country === 'USA');

  const formatPrograms = (list: typeof programs) =>
    list
      .map((p) => {
        const elig = p.eligibility.slice(0, 3).join('; ');
        return `- **${p.name}** (\`${p.slug}\`) — Agency: ${p.agency} | Region: ${p.region} | Status: ${p.status} | Type: ${p.fundingType} | Amount: ${p.fundingAmount} | Intake: ${p.deadlineType}
  - Summary: ${p.description}
  - Key Eligibility: ${elig}
  - Official Source: ${p.officialWebsite}`;
      })
      .join('\n');

  const postsSection = blogPosts
    .slice(0, 80)
    .map((post) => {
      const rawPath = slugToPath[post.slug] || `/blog/${post.slug}`;
      const url = `${SITE_URL}${rawPath.startsWith('/') ? rawPath : `/blog/${post.slug}`}`;
      const cleanExcerpt = String(post.excerpt || '').replace(/\s+/g, ' ').trim();
      return `- [${post.title}](${url}) (${post.category || post.type} · ${post.date}): ${cleanExcerpt}`;
    })
    .join('\n');

  const body = `# FSI Digital — Complete Knowledge & Program Reference (/llms-full.txt)

> North American non-dilutive funding intelligence platform covering ${programs.length} tracked government grants, tax credits, loans, and financing readiness benchmarks across Canada and all 50 US states + DC.

Canonical Base URL: ${SITE_URL}
Summary Index: ${SITE_URL}/llms.txt
Sitemaps: ${SITE_URL}/sitemap.xml

Disclaimer: FSI Digital provides independent research tools, deterministic eligibility matching, and self-serve funding blueprints. Programs, caps, and intake windows change frequently; applicants must verify current criteria on official agency portals. No government approval or funding outcome is guaranteed.

---

## 1. Self-Serve Commercial Product Ladder

Prior digital product purchases carry 100% upgrade credit automatically via verified server-side checkout. No live phone call is required for self-serve tiers.

${productsSection}

---

## 2. B2B Lead Partnerships & Sponsored Media Offerings

### Partner Lead Packages (${SITE_URL}/partners)
Leads shared with vetted financing partners strictly exclude unconsented contacts and require verified specialist/partner sharing consent.

${partnersSection}

### Sponsored Media & Editorial Packages (${SITE_URL}/advertise)

${adsSection}

---

## 3. Canadian Funding Program Database (${caPrograms.length} Programs)

${formatPrograms(caPrograms)}

---

## 4. US Funding Program Database (${usPrograms.length} Programs)

${formatPrograms(usPrograms)}

---

## 5. Key Insights & Program Coverage Index (${blogPosts.length} Total Articles, Top 80 Listed)

${postsSection}
`;

  return new NextResponse(body.trim() + '\n', {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
