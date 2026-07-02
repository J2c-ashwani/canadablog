import type { Metadata } from "next"
import DownloadClient from "./DownloadClient"

export const metadata: Metadata = {
  title: "Get Your Free Massachusetts Tech Startup Grants Application Guide & Complete Funding Templates | FSI Digital",
  description: "Download our comprehensive Massachusetts technology startup grants toolkit covering SBIR START tiered grants ($100K Round 1, $200K Round 2, $500K Round ...",
  alternates: {
    canonical: "https://www.fsidigital.ca/blog/massachusetts-tech-programs",
  },
}

export default function Page() {
  return <DownloadClient />
}
