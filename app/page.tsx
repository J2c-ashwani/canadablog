
import type { Metadata } from 'next'
import HomePageClient from "@/components/HomePageClient"

export const metadata: Metadata = {
  title: "FSI Digital | Government Grants for Startups & Businesses",
  description: "Find government grants for startups and small businesses in USA and Canada. Free grant finder tool, application guides, and funding opportunities.",
  alternates: {
    canonical: "https://www.fsidigital.ca",
  },
}

export default function HomePage() {
  return <HomePageClient />
}
