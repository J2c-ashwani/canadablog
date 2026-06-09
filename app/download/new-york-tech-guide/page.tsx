import type { Metadata } from "next"
import DownloadClient from "./DownloadClient"

export const metadata: Metadata = {
  title: "Get Your Free New York Tech Startup Grants Application Guide & Complete Funding Templates | FSI Digital",
  description: "Download our comprehensive New York technology startup grants toolkit covering START-UP NY program 10-year tax-free operation on or near eligible univer...",
  alternates: {
    canonical: "https://www.fsidigital.ca/download/new-york-tech-guide",
  },
}

export default function Page() {
  return <DownloadClient />
}
