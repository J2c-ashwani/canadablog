import type { Metadata } from "next"
import DownloadClient from "./DownloadClient"

export const metadata: Metadata = {
  title: "Get Your Free NIH SBIR Biotech Grants Application Guide & Proposal Templates | FSI Digital",
  description: "Download our comprehensive NIH SBIR/STTR biotech grants toolkit covering Phase I ($285,000) and Phase II ($2,000,000) application strategies, technical ...",
  alternates: {
    canonical: "https://www.fsidigital.ca/download/nih-sbir-biotech-guide",
  },
}

export default function Page() {
  return <DownloadClient />
}
