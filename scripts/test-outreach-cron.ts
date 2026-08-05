import { getOutreachProspectsFromSheet, updateOutreachProspectInSheet } from "../lib/google-sheets";
import { sendEmail } from "../lib/emails/mailer";
import { config } from "dotenv";

// Load production environment variables pulled from Vercel
config({ path: ".env.local" });

// Helper to escape HTML characters
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Custom templates compiler
function compileEmail(prospect: any): { subject: string; html: string } {
  const name = escapeHtml(prospect.name);
  const org = escapeHtml(prospect.prospectName);
  const hook = escapeHtml(prospect.personalizedHook);
  const website = escapeHtml(prospect.website);

  let subject = "";
  let html = "";

  if (prospect.targetPage === "/canada/small-business-grants") {
    const isLocalCentre = website.includes("sbec") || 
                          website.includes("orangeville") || 
                          website.includes("hamilton") || 
                          website.includes("halton") || 
                          website.includes("guelph") || 
                          website.includes("peterborough") || 
                          website.includes("kingston") || 
                          website.includes("toronto") || 
                          website.includes("london") || 
                          website.includes("windsor") ||
                          website.includes("richmondhill") ||
                          website.includes("waterloo");

    if (isLocalCentre) {
      subject = "Small business training grant resource";
      html = `
        <div style="font-family: sans-serif; font-size: 15px; color: #334155; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px;">
          <p>Hi ${name},</p>
          <p>I was reviewing your local entrepreneur resource section and wanted to suggest a new tool that might help local businesses looking to scale their teams.</p>
          <p>I’m the founder of FSI Digital. We recently compiled a regional guide detailing the Canada-Ontario Job Grant eligibility and training rebates (which cover up to 83% of staff training costs):</p>
          <p><a href="https://www.fsidigital.ca/canada/small-business-grants" style="color: #2563eb; font-weight: bold; text-decoration: underline;">https://www.fsidigital.ca/canada/small-business-grants</a></p>
          <p>We also drafted a simple checklist that outlines common training grant application rejection mistakes to save founders time.</p>
          <p>Would your team be open to reviewing this resource? If it fits your criteria, I think it would be a useful addition to your resource directory for local business owners.</p>
          <p>Thank you for your dedication to our local business community,</p>
          <p>Regards,<br><strong>Ashwani Kumar</strong><br><span style="color: #64748b; font-size: 13px;">Founder, FSI Digital</span></p>
        </div>
      `;
    } else {
      subject = "Suggestion for your startup resources list";
      html = `
        <div style="font-family: sans-serif; font-size: 15px; color: #334155; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px;">
          <p>Hi ${name},</p>
          <p>I was reviewing your startup resources page and noticed you list directories that help founders find early-stage capital.</p>
          <p>I’m the founder of FSI Digital (fsidigital.ca). We recently compiled a clean, analyst-reviewed directory of active small business grants and funding programs across Canada for 2026:</p>
          <p><a href="https://www.fsidigital.ca/canada/small-business-grants" style="color: #2563eb; font-weight: bold; text-decoration: underline;">https://www.fsidigital.ca/canada/small-business-grants</a></p>
          <p>I wanted to share this because it covers local provincial matching rules (like Ontario Job Grants and BC training rebates) and Futurpreneur/BDC loan criteria, which aren't always easy for founders to track down in one place.</p>
          <p>Would you be open to taking a look at it? If you think it genuinely helps your audience, I'd be grateful if you'd consider adding it to your resource section.</p>
          <p>Thanks for your time, and keep up the great work with your startup guides.</p>
          <p>Regards,<br><strong>Ashwani Kumar</strong><br><span style="color: #64748b; font-size: 13px;">Founder, FSI Digital</span></p>
        </div>
      `;
    }
  } else if (prospect.targetPage === "/canada/innovation-grants") {
    const isAcademic = website.includes(".edu") || 
                        website.includes("ubc") || 
                        website.includes("utoronto") || 
                        website.includes("mcgill") || 
                        website.includes("sfu") || 
                        website.includes("mcmaster");

    if (isAcademic) {
      subject = "Resource addition for your student startup guide";
      html = `
        <div style="font-family: sans-serif; font-size: 15px; color: #334155; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px;">
          <p>Dear ${name},</p>
          <p>I was looking through the ${org} entrepreneurship resource directories and wanted to thank your team—your subject guides are highly practical research anchors for student founders.</p>
          <p>I’m the founder of FSI Digital. To support student researchers and founders navigating the funding landscape, we developed a non-affiliated, citation-backed Government Funding Database that catalogs active grants and R&D tax credits:</p>
          <p><a href="https://www.fsidigital.ca/canada/small-business-grants" style="color: #2563eb; font-weight: bold; text-decoration: underline;">https://www.fsidigital.ca/canada/small-business-grants</a></p>
          <p>Our database is free, requires no login, and maintains a strict Government Non-Affiliation and Editorial Disclosure to preserve research integrity and trust.</p>
          <p>Would your team be open to reviewing this database as an external reference link on your Entrepreneurship Resource Guides to assist student founders?</p>
          <p>Thank you for your time and support of student entrepreneurship,</p>
          <p>Regards,<br><strong>Ashwani Kumar</strong><br><span style="color: #64748b; font-size: 13px;">Founder, FSI Digital</span></p>
        </div>
      `;
    } else {
      subject = "Compliance guide for tech founders";
      html = `
        <div style="font-family: sans-serif; font-size: 15px; color: #334155; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px;">
          <p>Hi ${name},</p>
          <p>I came across your resources about ${hook} and thought it was really well put together.</p>
          <p>I’m a developer and the founder of FSI Digital. With runways tightening, many tech startups are trying to stack federal wage subsidies (like NRC-IRAP) with research tax credits (SR&ED) to survive. However, many fall into the trap of exceeding the CRA’s strict 75% public funding ceiling.</p>
          <p>To help founders avoid retroactive audits, we put together a practical guide explaining stacking compliance and timesheet rules in plain English:</p>
          <p><a href="https://www.fsidigital.ca/canada/innovation-grants" style="color: #2563eb; font-weight: bold; text-decoration: underline;">https://www.fsidigital.ca/canada/innovation-grants</a></p>
          <p>Would your team be open to reviewing this resource? If you think it would add value for your startups, I'd be happy to write a short, educational post summarizing the core rules for your blog.</p>
          <p>Thanks for your time,</p>
          <p>Regards,<br><strong>Ashwani Kumar</strong><br><span style="color: #64748b; font-size: 13px;">Founder, FSI Digital</span></p>
        </div>
      `;
    }
  } else if (prospect.targetPage === "/canada/women-business-grants") {
    subject = "Suggestion for your startup resources list";
    html = `
      <div style="font-family: sans-serif; font-size: 15px; color: #334155; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px;">
        <p>Hi ${name},</p>
        <p>I was reviewing your local entrepreneur resource section and wanted to suggest a new tool that might help women business owners looking to scale.</p>
        <p>I’m the founder of FSI Digital (fsidigital.ca). We recently compiled a clean, analyst-reviewed directory of women entrepreneurship grants, low-interest microloans, and supplier diversity guidelines across Canada for 2026:</p>
        <p><a href="https://www.fsidigital.ca/canada/women-business-grants" style="color: #2563eb; font-weight: bold; text-decoration: underline;">https://www.fsidigital.ca/canada/women-business-grants</a></p>
        <p>I wanted to share this because it highlights the specific 51% ownership guidelines, loan limits, and stacking criteria that help female founders coordinate their funding roadmap.</p>
        <p>Would you be open to reviewing this resource? If you think it genuinely helps your audience, I'd be grateful if you'd consider adding it to your resource portal.</p>
        <p>Thank you for your time and continued support of women entrepreneurship,</p>
        <p>Regards,<br><strong>Ashwani Kumar</strong><br><span style="color: #64748b; font-size: 13px;">Founder, FSI Digital</span></p>
      </div>
    `;
  } else {
    subject = "Suggestion for your startup resources list";
    html = `
      <div style="font-family: sans-serif; font-size: 15px; color: #334155; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px;">
        <p>Hi ${name},</p>
        <p>I was reviewing your startup resources guide and noticed you list tools to help founders find early-stage capital.</p>
        <p>I’m the founder of FSI Digital (fsidigital.ca). We recently compiled a clean, analyst-reviewed index of active federal funding and government-backed loan programs in Canada:</p>
        <p><a href="https://www.fsidigital.ca/blog/canada-federal-grants" style="color: #2563eb; font-weight: bold; text-decoration: underline;">https://www.fsidigital.ca/blog/canada-federal-grants</a></p>
        <p>I wanted to share this because it covers non-repayable matching grants and BDC financing rules that are highly practical for business owners looking to stretch their runway.</p>
        <p>Would you be open to taking a look at it? If you think it genuinely helps your audience, I'd be grateful if you'd consider adding it to your resources list.</p>
        <p>Thanks for your time,</p>
        <p>Regards,<br><strong>Ashwani Kumar</strong><br><span style="color: #64748b; font-size: 13px;">Founder, FSI Digital</span></p>
      </div>
    `;
  }

  return { subject, html };
}

async function run() {
  console.log("Loading prospects database from Google Sheets...");
  const prospects = await getOutreachProspectsFromSheet();
  const pending = prospects.filter(p => p.status === "pending");

  console.log(`Found ${pending.length} pending prospects.`);
  if (pending.length === 0) {
    console.log("No pending prospects to process.");
    return;
  }

  // Trigger the first 5 dispatches immediately
  const batch = pending.slice(0, 5);
  console.log(`🚀 Dispatching first 5 emails via Resend...`);

  for (const prospect of batch) {
    const { subject, html } = compileEmail(prospect);

    console.log(`✉️ Sending to ${prospect.email} (${prospect.prospectName})...`);
    const result = await sendEmail({
      to: prospect.email,
      subject,
      html,
      text: "Please view this email in HTML format.",
      tagType: "backlink_outreach",
      companyName: prospect.prospectName,
      forceResend: true
    });

    if (result.success) {
      console.log(`✅ Success for ${prospect.email}`);
      await updateOutreachProspectInSheet(prospect.rowIndex, {
        status: "sent",
        sentAt: new Date().toISOString(),
        deliveryStatus: "delivered"
      });
    } else {
      console.error(`❌ Failed for ${prospect.email}:`, result.error);
      await updateOutreachProspectInSheet(prospect.rowIndex, {
        status: "failed"
      });
    }

    // Wait 1.5 seconds between sends
    await new Promise(r => setTimeout(r, 1500));
  }

  console.log("🎉 Initial outreach dispatch execution complete!");
}

run().catch(console.error);
