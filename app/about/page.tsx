
import type { Metadata } from "next"
import AboutClient from "./AboutClient"

export const metadata: Metadata = {
  title: "About FSI Digital | Government Funding & Grant Information",
  description: "Learn about FSI Digital (formerly Grant Finder Pro). We provide free, comprehensive government grant information for USA and Canada businesses.",
  alternates: {
    canonical: "https://www.fsidigital.ca/about",
  },
}

export default function About() {
  return <AboutClient />
}
