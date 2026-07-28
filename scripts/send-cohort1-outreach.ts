import { config } from "dotenv"
import path from "path"
// Load production keys from Vercel pull first, fallback to .env.local
config({ path: path.join(__dirname, "../.env.vercel.pull") })
config({ path: path.join(__dirname, "../.env.local") })

import { sendEmail } from "../lib/emails/mailer"

interface CohortLead {
  to: string
  name: string
  subject: string
  text: string
  tagType: string
}

const COHORT_1_LEADS: CohortLead[] = [
  {
    to: "pmorency01@gmail.com",
    name: "Patrick",
    subject: "Quick question",
    tagType: "abandonment-outreach-cohort1-patrick",
    text: `Hi Patrick,

I noticed you spent some time reviewing funding options on FSI Digital recently and even looked at one of our funding bundles.

I just wanted to check in personally.

Was there anything that stopped you from moving forward?

No sales pitch—I genuinely want to understand whether something wasn't clear or whether we could have made the process better.

Even a short reply would be really appreciated.

Thanks,

Ashwani K
Founder, FSI Digital`,
  },
  {
    to: "puru@coffeestreet.ca",
    name: "Purushotham",
    subject: "Quick question",
    tagType: "abandonment-outreach-cohort1-purushotham",
    text: `Hi Purushotham,

I noticed you were exploring funding options on FSI Digital recently but didn't end up completing the process.

I just wanted to check in and ask one quick question.

Was there anything that stopped you from moving forward?

It could have been:
• It wasn't the right time
• You weren't sure if your business qualified
• You were looking for something different
• Or something else entirely

Even a one-line reply would really help me understand where we can improve.

If you've already found funding elsewhere, I'd appreciate knowing that too.

Thanks for your time.

Ashwani K
Founder, FSI Digital`,
  },
  {
    to: "chris@whitefoxsoftware.com",
    name: "Chris",
    subject: "Quick question",
    tagType: "abandonment-outreach-cohort1-chris",
    text: `Hi Chris,

I noticed you were exploring funding options on FSI Digital recently but didn't end up completing the process.

I just wanted to check in and ask one quick question.

Was there anything that stopped you from moving forward?

It could have been:
• It wasn't the right time
• You weren't sure if your business qualified
• You were looking for something different
• Or something else entirely

Even a one-line reply would really help me understand where we can improve.

If you've already found funding elsewhere, I'd appreciate knowing that too.

Thanks for your time.

Ashwani K
Founder, FSI Digital`,
  },
]

async function main() {
  console.log("🚀 DISPATCHING COHORT 1 ABANDONMENT OUTREACH (N=3)\n")
  
  for (const lead of COHORT_1_LEADS) {
    console.log(`Sending email to ${lead.name} (${lead.to})...`)
    const result = await sendEmail({
      to: lead.to,
      subject: lead.subject,
      text: lead.text,
      html: lead.text.replace(/\n/g, "<br>"), // Plain-text feel HTML conversion
      tagType: lead.tagType,
      from: "Ashwani K <ashwani@fsidigital.ca>",
      forceResend: true // Use Resend provider API directly
    })

    if (result.success) {
      console.log(`  ✅ SUCCESSFULLY SENT TO ${lead.to}\n`)
    } else {
      console.log(`  ❌ FAILED TO SEND TO ${lead.to}:`, result, "\n")
    }
  }
}

main().catch(console.error)
