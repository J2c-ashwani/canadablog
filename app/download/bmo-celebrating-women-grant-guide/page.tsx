import type { Metadata } from "next"
import DownloadClient from "./DownloadClient"

export const metadata: Metadata = {
  title: "Get Your Free BMO Celebrating Women Grant Application Guide | FSI Digital",
  description: "Download our comprehensive BMO Celebrating Women Grant application toolkit with women advancement demonstration framework, business growth planning temp...",
  alternates: {
    canonical: "https://www.fsidigital.ca/download/bmo-celebrating-women-grant-guide",
  },
}

export default function Page() {
  return <DownloadClient />
}
