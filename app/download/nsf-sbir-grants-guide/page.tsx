import type { Metadata } from "next"
import DownloadClient from "./DownloadClient"

export const metadata: Metadata = {
  title: "Get Your Free NSF SBIR Grants Application Guide & Proposal Templates | FSI Digital",
  description: "Download our comprehensive NSF SBIR/STTR grants toolkit covering Phase I ($275,000) and Phase II ($2,000,000) application strategies, technical proposal...",
  alternates: {
    canonical: "https://www.fsidigital.ca/download/nsf-sbir-grants-guide",
  },
}

export default function Page() {
  return <DownloadClient />
}
