
import type { Metadata } from "next"
import ContactClient from "./ContactClient"

export const metadata: Metadata = {
  title: "Contact FSI Digital | Funding Questions",
  description: "Contact FSI Digital with business funding questions. After submitting your request, you can optionally book a paid strategy session for a researched grant, loan, and tax-credit roadmap.",
  keywords: "contact FSI Digital, funding strategy session, grant application help, government funding consultation, business grants support Canada USA",
  alternates: {
    canonical: "https://www.fsidigital.ca/contact",
  },
}

export default function Contact() {
  return <ContactClient />
}
