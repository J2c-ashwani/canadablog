import type { Metadata } from "next"
import DownloadClient from "./DownloadClient"

export const metadata: Metadata = {
  title: "Get Your Free RBC Women Entrepreneur Awards Nomination Guide | FSI Digital",
  description: "Download our comprehensive RBC Canadian Women Entrepreneur Awards nomination toolkit with category selection decision matrix, eligibility verification c...",
  alternates: {
    canonical: "https://www.fsidigital.ca/blog/rbc-women-entrepreneur-awards",
  },
}

export default function Page() {
  return <DownloadClient />
}
