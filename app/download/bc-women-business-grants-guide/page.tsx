import type { Metadata } from "next"
import DownloadClient from "./DownloadClient"

export const metadata: Metadata = {
  title: "Get Your Free BC Women Business Grants Guide | FSI Digital",
  description: "Download our comprehensive BC women business grants toolkit covering $650M in provincial innovation support including WeBC loans up to $150,000, Innovat...",
  alternates: {
    canonical: "https://www.fsidigital.ca/blog/bc-women-business-grants",
  },
}

export default function Page() {
  return <DownloadClient />
}
