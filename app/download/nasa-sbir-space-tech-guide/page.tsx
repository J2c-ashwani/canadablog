import type { Metadata } from "next"
import DownloadClient from "./DownloadClient"

export const metadata: Metadata = {
  title: "Get Your Free NASA SBIR Space Tech Grants Application Guide & Proposal Templates | FSI Digital",
  description: "Download our comprehensive NASA SBIR/STTR space tech grants toolkit covering Phase I ($150,000) and Phase II ($850,000) application strategies, technica...",
  alternates: {
    canonical: "https://www.fsidigital.ca/blog/nasa-sbir-space-tech-grants",
  },
}

export default function Page() {
  return <DownloadClient />
}
