import { NextResponse } from 'next/server';

export const revalidate = 604800; // 7 days

const PARTNERS_VERIFIED_DATE = '2026-10-10T00:00:00.000Z';

const PARTNER_ROUTES = [
  '/partners',
  '/partners/business-loan-leads',
  '/partners/government-grant-leads',
  '/partners/startup-funding-leads',
  '/partners/tax-credit-leads',
  '/partners/sred-leads',
  '/partners/canada-funding-leads',
  '/partners/usa-funding-leads',
  '/partners/merchant-cash-advance-leads',
  '/partners/equipment-financing-leads',
  '/partners/working-capital-leads',
  '/partners/commercial-real-estate-leads',
  '/partners/sbir-grant-leads',
  '/partners/usda-grant-leads',
  '/partners/clean-energy-grant-leads',
  '/partners/women-owned-business-leads',
  '/partners/nonprofit-grant-leads',
  '/partners/invoice-financing-leads',
  '/partners/purchase-order-financing-leads',
  '/partners/asset-based-lending-leads',
  '/partners/sba-loan-leads',
  '/partners/agriculture-funding-leads',
  '/partners/franchise-financing-leads',
  '/partners/accounts-receivable-factoring-leads',
  '/partners/bridge-loan-leads',
  '/partners/rd-tax-credit-leads',
  '/partners/export-funding-leads',
  '/partners/venture-debt-leads',
  '/partners/business-line-of-credit-leads',
  '/partners/unsecured-business-loan-leads',
  '/partners/minority-owned-business-leads',
];

export async function GET() {
  const baseUrl = 'https://www.fsidigital.ca';

  const urlElements = PARTNER_ROUTES.map(route => `
    <url>
      <loc>${baseUrl}${route}</loc>
      <lastmod>${PARTNERS_VERIFIED_DATE}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.9</priority>
    </url>`).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urlElements}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=604800',
    },
  });
}
