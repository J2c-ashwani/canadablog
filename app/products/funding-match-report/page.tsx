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
    "mpn": "FSI-REPORT-001",
    "brand": {
      "@type": "Brand",
      "name": "FSI Digital"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "52"
    },
    "review": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Michael K."
        },
        "reviewBody": "Found 3 government grants we qualified for that we didn't even know existed."
      }
    ],
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
      },
      "hasMerchantReturnPolicy": {
        "@type": "MerchantReturnPolicy",
        "applicableCountry": "CA",
        "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnPeriod",
        "merchantReturnDays": 30,
        "returnMethod": "https://schema.org/ReturnMethodOnline",
        "returnFees": "https://schema.org/FreeReturn"
      },
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": "0.00",
          "currency": "CAD"
        },
        "shippingDestination": {
          "@type": "DefinedRegion",
          "addressCountry": "CA"
        },
        "deliveryTime": {
          "@type": "ShippingDeliveryTime",
          "handlingTime": {
            "@type": "QuantitativeValue",
            "minValue": 0,
            "maxValue": 0,
            "unitCode": "DAY"
          },
          "transitTime": {
            "@type": "QuantitativeValue",
            "minValue": 0,
            "maxValue": 0,
            "unitCode": "DAY"
          }
        }
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
