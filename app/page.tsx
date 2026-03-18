
import type { Metadata } from 'next'
import HomePageClient from "@/components/HomePageClient"

export const metadata: Metadata = {
  title: "FSI Digital | Government Grants for Startups & Businesses",
  description: "Find government grants for startups and small businesses in USA and Canada. Free grant finder tool, application guides, and funding opportunities.",
  keywords: "government grants for startups, small business grants Canada, USA business grants 2026, how to apply for government grants, free grant finder tool, IRAP grants, SBIR grants, non-repayable business funding, startup funding eligibility checker, best grants for small business",
  alternates: {
    canonical: "https://www.fsidigital.ca",
  },
}

export default function HomePage() {
  return <HomePageClient />
}
