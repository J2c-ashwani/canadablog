
import type { Metadata } from "next"
import AboutClient from "./AboutClient"

export const metadata: Metadata = {
  title: "About FSI Digital | Government Funding & Grant Information",
  description: "Learn about FSI Digital (formerly Grant Finder Pro). We provide free, comprehensive government grant information for USA and Canada businesses.",
  keywords: "about FSI Digital, government funding experts Canada USA, grant finder team, who writes FSI Digital, trusted grant information source",
  alternates: {
    canonical: "https://www.fsidigital.ca/about",
  },
}

export default function About() {
  return <AboutClient />
}
