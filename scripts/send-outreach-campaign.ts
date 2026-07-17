import fs from "fs";
import path from "path";
import { config } from "dotenv";

// Load local environment variables
config({ path: ".env.local" });

import { sendEmail } from "../lib/emails/mailer";

// Simple command-line arguments parser
const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const forceTime = args.includes("--force-time");
const limitArgIndex = args.indexOf("--limit");
const limit = limitArgIndex !== -1 ? parseInt(args[limitArgIndex + 1], 10) : 10;

const STATUS_PATH = path.join(process.cwd(), "scratch", "outreach_status.json");

// Helper to escape HTML characters
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Check if current time is within North Star business hours (9:00 AM - 5:00 PM Eastern Time, Mon-Fri)
function isNorthStarBusinessHours(): { isHours: boolean; reason: string } {
  try {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/New_York",
      hour: "numeric",
      hour12: false,
      weekday: "short"
    });
    const parts = formatter.formatToParts(new Date());
    
    let hourStr = "";
    let weekdayStr = "";
    for (const part of parts) {
      if (part.type === "hour") hourStr = part.value;
      if (part.type === "weekday") weekdayStr = part.value;
    }
    
    const hour = parseInt(hourStr, 10);
    const isWeekend = weekdayStr === "Sat" || weekdayStr === "Sun";
    const isHours = hour >= 9 && hour < 17 && !isWeekend;
    
    return {
      isHours,
      reason: `Eastern Time: ${weekdayStr} ${hour}:00 (Target: Mon-Fri 9:00-17:00)`
    };
  } catch (e) {
    // Fallback if Intl is not supported
    return { isHours: true, reason: "Intl check failed, default to true" };
  }
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
    // If it's a local business centre (SBEC) or county
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
      // General National Directory Pitch
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
    // Academic or general tech incubator
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
      // Tech Accelerator / B2B Blog
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
    // Women Entrepreneurs Guides
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
    // General B2B directory / Loans / Federal
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

// Function to calculate and output the Performance Scorecard
function printPerformanceScorecard(prospects: any[]) {
  const sentList = prospects.filter((p: any) => p.status === "sent");
  const totalSent = sentList.length;

  const bounces = prospects.filter((p: any) => p.deliveryStatus === "bounced").length;
  // Emails that are sent and not bounced are considered delivered by default
  const delivered = Math.max(0, totalSent - bounces);
  
  const replies = prospects.filter((p: any) => p.replied === true).length;
  const positiveConversations = prospects.filter((p: any) => p.positiveConversation === true).length;
  const backlinksEarned = prospects.filter((p: any) => p.backlinkEarned === true).length;

  const deliveryRate = totalSent > 0 ? (delivered / totalSent) * 100 : 0;
  const bounceRate = totalSent > 0 ? (bounces / totalSent) * 100 : 0;
  const replyRate = totalSent > 0 ? (replies / totalSent) * 100 : 0;
  const positiveConvRate = totalSent > 0 ? (positiveConversations / totalSent) * 100 : 0;

  console.log(`\n======================================================================`);
  console.log(`📈  CAMPAIGN PERFORMANCE SCORECARD`);
  console.log(`======================================================================`);
  console.log(`Total Dispatched:       ${totalSent}`);
  console.log(`Delivery Rate:          ${deliveryRate.toFixed(1)}%  (Target: >95%)  [Delivered: ${delivered}, Bounces: ${bounces}]`);
  console.log(`Bounce Rate:            ${bounceRate.toFixed(1)}%    (Target: <5%)`);
  console.log(`Reply Rate:             ${replyRate.toFixed(1)}%   (Target: >10%)  [Replies: ${replies}]`);
  console.log(`Positive Conversation:  ${positiveConvRate.toFixed(1)}%   (Target: >3-5%) [Positive: ${positiveConversations}]`);
  console.log(`Backlinks Earned:       ${backlinksEarned} verified`);
  console.log(`======================================================================\n`);
}

async function run() {
  // Check North Star business hours constraint
  const { isHours, reason } = isNorthStarBusinessHours();
  console.log(`⏰ Time validation check: ${reason}`);
  
  if (!isHours && !forceTime && !dryRun) {
    console.warn(`⚠️ SKIPPED: Current time is outside North Star (EST/EDT) business hours (Mon-Fri 9:00 AM - 5:00 PM).`);
    console.log(`💡 Override this restriction for testing or manual overrides using the "--force-time" flag.`);
    return;
  }

  if (!fs.existsSync(STATUS_PATH)) {
    console.error(`❌ Status database file not found at: ${STATUS_PATH}`);
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(STATUS_PATH, "utf8"));
  const pendingProspects = data.prospects.filter((p: any) => p.status === "pending");

  console.log(`🔍 Total prospects: ${data.prospects.length}`);
  console.log(`⏳ Pending prospects: ${pendingProspects.length}`);
  
  if (pendingProspects.length === 0) {
    console.log("✅ No pending prospects left in the campaign directory.");
    printPerformanceScorecard(data.prospects);
    return;
  }

  const batch = pendingProspects.slice(0, limit);
  console.log(`🚀 Executing batch of ${batch.length} outreach emails (Limit: ${limit})...`);

  for (const prospect of batch) {
    const { subject, html } = compileEmail(prospect);

    if (dryRun) {
      console.log(`\n=================== [DRY RUN PREVIEW] ===================`);
      console.log(`To: ${prospect.email}`);
      console.log(`Subject: ${subject}`);
      console.log(`HTML Payload (Truncated):\n${html.trim().slice(0, 500)}...\n`);
      console.log(`=========================================================\n`);
    } else {
      console.log(`✉️ Dispatched email to ${prospect.email} (${prospect.prospectName})...`);
      
      const result = await sendEmail({
        to: prospect.email,
        subject,
        html,
        text: `Please view this email in HTML format.`,
        tagType: "backlink_outreach",
        companyName: prospect.prospectName,
        forceResend: true // direct to Resend API
      });

      if (result.success) {
        prospect.status = "sent";
        prospect.sentAt = new Date().toISOString();
        prospect.deliveryStatus = "delivered"; // Assume delivered unless updated via bounce checks
      } else {
        console.error(`❌ Failed to send email to ${prospect.email}:`, result.error);
        prospect.status = "failed";
      }

      // Safe rate-limit pause between dispatches (1.5 seconds)
      await new Promise((r) => setTimeout(r, 1500));
    }
  }

  if (!dryRun) {
    fs.writeFileSync(STATUS_PATH, JSON.stringify(data, null, 2));
    console.log("💾 Status log saved with updated timestamps.");
    printPerformanceScorecard(data.prospects);
  } else {
    console.log("ℹ️ Dry-run completed. No emails were actually dispatched, and logs were not modified.");
    printPerformanceScorecard(data.prospects);
  }
}

run().catch((e) => {
  console.error("❌ Fatal execution error:", e);
  process.exit(1);
});
