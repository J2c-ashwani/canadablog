import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { sendEmail } from "../lib/emails/mailer";
import { buildPurchaseEmail } from "../lib/emails/product-purchase";

async function run() {
  const email = "chintankakani@gmail.com";
  const name = "Chintan Kakani";
  const accessToken = "token_chintankakani_report_2026";
  const paypalOrderId = "MANUAL-CHINTAN-101";
  const amount = "19.00";

  console.log(`🚀 Dispatching Funding Match Report delivery email to ${email}...`);

  const emailContent = buildPurchaseEmail({
    name,
    email,
    accessToken,
    paypalOrderId,
    productName: "Funding Match Report ($19 USD)",
    amount,
  });

  const result = await sendEmail({
    to: email,
    subject: emailContent.subject,
    html: emailContent.html,
    text: emailContent.text,
    tagType: "product_purchase",
    forceResend: true,
  });

  console.log("RESULT:", JSON.stringify(result, null, 2));
}

run().catch(console.error);
