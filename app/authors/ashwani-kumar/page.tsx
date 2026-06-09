import type { Metadata } from "next"
import AuthorClient from "./AuthorClient"

export const metadata: Metadata = {
  title: "Ashwani Kumar - Founder & Managing Director | FSI Digital",
  description: "Profile of Ashwani Kumar, Founder & Managing Director of FSI Digital and Funding Research Lead. Researches government grants, tax credits, and business incentives.",
  alternates: {
    canonical: "https://www.fsidigital.ca/authors/ashwani-kumar",
  },
  robots: { index: true, follow: true },
}

export default function AuthorPage() {
  return <AuthorClient />
}
