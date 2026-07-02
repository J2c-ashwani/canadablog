import type { Metadata } from "next"
import DownloadClient from "./DownloadClient"

export const metadata: Metadata = {
  title: "Get Your Free Women Export & Trade Grants International Expansion Guide | FSI Digital",
  description: "Download our comprehensive women export grants toolkit covering CanExport SME program (up to $75K per market), Export Development Canada (EDC) trade fin...",
  alternates: {
    canonical: "https://www.fsidigital.ca/blog/women-export-trade-grants-canada",
  },
}

export default function Page() {
  return <DownloadClient />
}
