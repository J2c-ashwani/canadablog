import type { Metadata } from "next"
import DownloadClient from "./DownloadClient"

export const metadata: Metadata = {
  title: "Get Your Free DOE SBIR Clean Energy Grants Application Guide & Proposal Templates | FSI Digital",
  description: "Download our comprehensive DOE SBIR/STTR clean energy grants toolkit covering Phase I ($200,000) and Phase II ($1,850,000) application strategies, techn...",
  alternates: {
    canonical: "https://www.fsidigital.ca/blog/doe-sbir-clean-energy-grants",
  },
}

export default function Page() {
  return <DownloadClient />
}
