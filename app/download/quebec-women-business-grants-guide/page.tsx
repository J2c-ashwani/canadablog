import type { Metadata } from "next"
import DownloadClient from "./DownloadClient"

export const metadata: Metadata = {
  title: "Get Your Free Quebec Women Business Grants Guide | FSI Digital",
  description: "Download our comprehensive Quebec women business grants toolkit with bilingual resources covering $720M in provincial support including RFAQ network acc...",
  alternates: {
    canonical: "https://www.fsidigital.ca/blog/quebec-women-business-grants",
  },
}

export default function Page() {
  return <DownloadClient />
}
