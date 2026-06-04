import type { Metadata } from "next"
import BookingClient from "./BookingClient"

export const metadata: Metadata = {
  title: "Schedule Your Strategy Session | FSI Digital",
  description: "Schedule your pre-paid 1-on-1 Business Funding Strategy Consultation. Select a date and time for your private Google Meet.",
  robots: "noindex, nofollow", // Keep this success page private so only paid leads can access it
  alternates: {
    canonical: "https://www.fsidigital.ca/booking",
  },
}

export default function BookingPage() {
  return <BookingClient />
}
