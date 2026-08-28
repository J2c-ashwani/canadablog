
import type { Metadata } from "next"
import ContactClient from "./ContactClient"

export const metadata: Metadata = {
  title: "Contact FSI Digital | Funding Questions",
  description: "Submit your business funding profile and continue with an instant self-serve grant report, action plan, blueprint, or automated funding watch.",
  keywords: "contact FSI Digital, funding eligibility, grant action plan, government funding report, business grants Canada USA",
  alternates: {
    canonical: "https://www.fsidigital.ca/contact",
  },
  openGraph: {
    title: "Contact FSI Digital | Funding Questions",
    description: "Submit your business funding profile and continue with an instant self-serve grant report, action plan, blueprint, or automated funding watch.",
    url: "https://www.fsidigital.ca/contact",
    type: "website",
    siteName: "FSI Digital",
  },
}

export default function Contact() {
  return <ContactClient />
}
