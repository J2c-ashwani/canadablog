import type { Metadata } from "next"
import DownloadClient from "./DownloadClient"

export const metadata: Metadata = {
  title: "Get Your Free Women Social Enterprise Grants & Impact Funding Guide | FSI Digital",
  description: "Download our comprehensive women social enterprise grants toolkit covering social impact funding, community development programs, Investment Readiness P...",
  alternates: {
    canonical: "https://www.fsidigital.ca/blog/women-social-enterprise-grants-canada",
  },
}

export default function Page() {
  return <DownloadClient />
}
