import type { Metadata } from "next"
import DownloadClient from "./DownloadClient"

export const metadata: Metadata = {
  title: "Get Your Free Scotiabank Women Initiative Guide | FSI Digital",
  description: "Download our comprehensive Scotiabank Women Initiative toolkit with capital funding access strategies, mentorship program navigation guide, educational ...",
  alternates: {
    canonical: "https://www.fsidigital.ca/blog/scotiabank-women-initiative",
  },
}

export default function Page() {
  return <DownloadClient />
}
