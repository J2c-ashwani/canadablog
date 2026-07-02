import type { Metadata } from "next"
import DownloadClient from "./DownloadClient"

export const metadata: Metadata = {
  title: "Get Your Free Alberta Women Business Grants Guide | FSI Digital",
  description: "Download our comprehensive Alberta women business grants toolkit covering $580M in provincial support including Alberta Women Entrepreneurs (AWE) loans ...",
  alternates: {
    canonical: "https://www.fsidigital.ca/blog/alberta-women-business-grants",
  },
}

export default function Page() {
  return <DownloadClient />
}
