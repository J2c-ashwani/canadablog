import type { Metadata } from 'next'
import DatabaseClient from "./DatabaseClient"

export const metadata: Metadata = {
  title: "Government Funding Database | FSI Digital",
  description: "Browse our comprehensive, real-time database of over 100+ active government grants, loans, and tax credits in Canada and the United States.",
  alternates: {
    canonical: "https://www.fsidigital.ca/database",
  },
  robots: { index: true, follow: true },
}

export default function DatabasePage() {
  return <DatabaseClient />
}
