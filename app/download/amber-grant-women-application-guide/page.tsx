import type { Metadata } from "next"
import DownloadClient from "./DownloadClient"

export const metadata: Metadata = {
  title: "Get Your Free Amber Grant Application Guide | FSI Digital",
  description: "Download our comprehensive Amber Grant application toolkit with monthly deadline tracker, essay templates, category selection guide, and proven strategi...",
  alternates: {
    canonical: "https://www.fsidigital.ca/blog/amber-grant-women-canada",
  },
}

export default function Page() {
  return <DownloadClient />
}
