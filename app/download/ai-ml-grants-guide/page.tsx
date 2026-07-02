import type { Metadata } from "next"
import DownloadClient from "./DownloadClient"

export const metadata: Metadata = {
  title: "Get Your Free AI & Machine Learning Startup Grants Application Guide & Complete Funding Templates | FSI Digital",
  description: "Download our comprehensive AI and machine learning technology startup grants toolkit covering NSF AI Research Institutes $100 million funding establishi...",
  alternates: {
    canonical: "https://www.fsidigital.ca/blog/ai-machine-learning-grants",
  },
}

export default function Page() {
  return <DownloadClient />
}
