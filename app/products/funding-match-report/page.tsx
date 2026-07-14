import type { Metadata } from "next";
import { FundingMatchReportLanding } from "./FundingMatchReportLanding";

export const metadata: Metadata = {
  title: "Funding Match Report — See Which Programs You Qualify For | FSI Digital",
  description:
    "Get your personalized Funding Match Report for $19. Discover the government grants, tax credits, and loans your business may qualify for — with estimated funding ranges, application requirements, and priority ranking.",
  alternates: {
    canonical: "https://www.fsidigital.ca/products/funding-match-report",
  },
  openGraph: {
    title: "Funding Match Report — See Which Programs You Qualify For",
    description:
      "Discover the government grants, tax credits, and loans your business may qualify for. Estimated funding ranges, application requirements, and priority ranking — delivered instantly for $19.",
    type: "website",
  },
};

export default function FundingMatchReportPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Funding Match Report",
    "image": "https://www.fsidigital.ca/product-report-thumbnail.jpg",
    "description": "Get your personalized Funding Match Report. Discover the government grants, tax credits, and loans your business may qualify for.",
    "sku": "FSI-REPORT-001",
    "offers": {
      "@type": "Offer",
      "url": "https://www.fsidigital.ca/products/funding-match-report",
      "priceCurrency": "CAD",
      "price": "19.00",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "FSI Digital"
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <FundingMatchReportLanding />
    </>
  );
}
