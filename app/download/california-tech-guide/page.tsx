import type { Metadata } from "next"
import DownloadClient from "./DownloadClient"

export const metadata: Metadata = {
  title: "Get Your Free California Tech Startup Grants Application Guide & Complete Funding Templates | FSI Digital",
  description: "Download our comprehensive California technology startup grants toolkit covering CalSEED clean energy grants ($50,000 non-dilutive), SBIR State Match Pr...",
  alternates: {
    canonical: "https://www.fsidigital.ca/blog/california-tech-programs",
  },
}

export default function Page() {
  return <DownloadClient />
}
