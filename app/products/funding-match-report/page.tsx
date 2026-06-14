import type { Metadata } from "next";
import { FundingMatchReportLanding } from "./FundingMatchReportLanding";

export const metadata: Metadata = {
  title: "Funding Match Report — See Which Programs You Qualify For | FSI Digital",
  description:
    "Get your personalized Funding Match Report for $19. Discover the government grants, tax credits, and loans your business may qualify for — with estimated funding ranges, application requirements, and priority ranking.",
  openGraph: {
    title: "Funding Match Report — See Which Programs You Qualify For",
    description:
      "Discover the government grants, tax credits, and loans your business may qualify for. Estimated funding ranges, application requirements, and priority ranking — delivered instantly for $19.",
    type: "website",
  },
};

export default function FundingMatchReportPage() {
  return <FundingMatchReportLanding />;
}
