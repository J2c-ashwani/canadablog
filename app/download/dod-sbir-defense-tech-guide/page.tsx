import type { Metadata } from "next"
import DownloadClient from "./DownloadClient"

export const metadata: Metadata = {
  title: "Get Your Free DOD SBIR Defense Tech Grants Application Guide & Proposal Templates | FSI Digital",
  description: "Download our comprehensive DOD SBIR/STTR defense tech grants toolkit covering Phase I ($256,000) and Phase II ($1,700,000) application strategies, techn...",
  alternates: {
    canonical: "https://www.fsidigital.ca/blog/dod-sbir-defense-tech-grants",
  },
}

export default function Page() {
  return <DownloadClient />
}
