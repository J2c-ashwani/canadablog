import type { Metadata } from "next"
import DownloadClient from "./DownloadClient"

export const metadata: Metadata = {
  title: "Get Your Free Women Entrepreneurship Loan Fund Application Guide | FSI Digital",
  description: "Download our comprehensive WELF application toolkit with delivery partner comparison, business plan templates, and proven strategies to secure up to $50...",
  alternates: {
    canonical: "https://www.fsidigital.ca/download/women-entrepreneurship-loan-fund-guide",
  },
}

export default function Page() {
  return <DownloadClient />
}
