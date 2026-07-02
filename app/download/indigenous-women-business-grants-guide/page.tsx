import type { Metadata } from "next"
import DownloadClient from "./DownloadClient"

export const metadata: Metadata = {
  title: "Get Your Free Indigenous Women Business Grants & NACCA Funding Guide | FSI Digital",
  description: "Download our comprehensive Indigenous women business funding toolkit covering NACCA Aboriginal Entrepreneurship Program (up to $100K), Women Entrepreneu...",
  alternates: {
    canonical: "https://www.fsidigital.ca/blog/indigenous-women-business-grants-canada",
  },
}

export default function Page() {
  return <DownloadClient />
}
