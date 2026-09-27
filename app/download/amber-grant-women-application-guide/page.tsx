import type { Metadata } from "next"
import DownloadClient from "./DownloadClient"

export const metadata: Metadata = {
  title: "$10K–$25K Amber Grant for Women — 12 Programs Open Now (2026)",
  description: "Apply for the $10K Amber Grant, $25K Cartier Women's Initiative, and IFundWomen grants. Check eligibility in 2 minutes.",
  alternates: {
    canonical: "https://www.fsidigital.ca/download/amber-grant-women-application-guide",
  },
}

export default function Page() {
  return <DownloadClient />
}
