import fs from 'fs';
import { config } from 'dotenv';
config({ path: '.env.local' });
import { SubscriberRepository } from '../lib/leads/SubscriberRepository';
import { sendEmail, getFirstName } from '../lib/emails/mailer';

async function run() {
    console.log("Analyzing previous run logs...");
    const logPath = '/Users/ashwanikumar/.gemini/antigravity/brain/c98d6492-5ab6-45be-a762-5b4ed8c4aa14/.system_generated/tasks/task-14424.log';
    const logContent = fs.readFileSync(logPath, 'utf8');
    
    // Extract emails that successfully sent
    const sentRegex = /✉️ Email successfully sent to ([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+) via Resend/g;
    const sentEmails = new Set<string>();
    let match;
    while ((match = sentRegex.exec(logContent)) !== null) {
        sentEmails.add(match[1].toLowerCase());
    }
    
    console.log(`Found ${sentEmails.size} emails that successfully received the correction in the last run.`);

    console.log("Fetching all subscribers...");
    const allSubs = await SubscriberRepository.getAllSubscribers();
    
    // Find the original 70 leads
    const affectedLeads = allSubs.filter(sub => {
        try {
            const act = JSON.parse(sub.leadActivity || '{}');
            if (act.reactivationStage === 'day2' && act.reactivationSentAt) {
                const sentDate = new Date(act.reactivationSentAt);
                const now = new Date();
                const hoursSince = (now.getTime() - sentDate.getTime()) / (1000 * 60 * 60);
                return hoursSince < 12;
            }
            return false;
        } catch (e) {
            return false;
        }
    });

    console.log(`Found ${affectedLeads.length} total affected leads.`);
    
    let successCount = 0;
    
    for (const sub of affectedLeads) {
        const emailLower = sub.email.toLowerCase();
        
        let activity = JSON.parse(sub.leadActivity || '{}');
        
        if (sentEmails.has(emailLower)) {
            // Already sent, just update the DB
            activity.experimentTag = "historical_reactivation_batch_001";
            activity.reactivationStage = "completed"; 
            
            await SubscriberRepository.updateSubscriberPreferences(sub.email, {
                leadActivity: JSON.stringify(activity)
            });
            console.log(`✅ DB fixed for already-sent lead: ${sub.email}`);
            successCount++;
            await new Promise(resolve => setTimeout(resolve, 500)); // Google Sheets rate limit
            continue;
        }

        // Needs to be sent
        const firstName = getFirstName(sub.name);
        const link = `https://www.fsidigital.ca/calculator?email=${encodeURIComponent(sub.email)}`;

        const html = `
          <div style="font-family: sans-serif; font-size: 15px; color: #334155; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px;">
            <p>Hi ${firstName},</p>

            <p>Over the past few days we've been reviewing previously completed funding assessments.</p>

            <p>Based on the information you provided, your business appears to qualify for multiple government funding opportunities that may be relevant to your industry, location, and growth plans.</p>

            <p>We've decided to make our Funding Match Report available to a small group of previously assessed businesses for a special introductory price of just <strong>$19</strong>.</p>

            <p>Inside the report you'll receive:</p>
            <ul style="list-style-type: none; padding-left: 0;">
              <li style="margin-bottom: 8px;">✓ Funding programs matched to your business</li>
              <li style="margin-bottom: 8px;">✓ Estimated funding amounts</li>
              <li style="margin-bottom: 8px;">✓ Eligibility requirements</li>
              <li style="margin-bottom: 8px;">✓ Priority opportunities worth reviewing first</li>
              <li style="margin-bottom: 8px;">✓ Direct application resources</li>
              <li style="margin-bottom: 8px;">✓ Recommended next steps</li>
            </ul>

            <p>Your report is available here:</p>
            <p><a href="${link}" style="display: inline-block; padding: 12px 24px; background-color: #059669; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">Unlock Match Report &rarr;</a></p>
            <p><a href="${link}">${link}</a></p>

            <p>This offer is intended for businesses that have already completed an eligibility assessment and may be removed without notice.</p>

            <p>Regards,<br>
            <strong>FSI Digital</strong><br>
            <span style="color: #64748b;">Funding Research & Strategy Team</span></p>
          </div>
        `;

        try {
            const res = await sendEmail({
                to: sub.email,
                subject: "Priority Access: Your Funding Match Report",
                html: html,
                text: "",
                tagType: "historical-fix-resume"
            });

            if (res.success) {
                activity.experimentTag = "historical_reactivation_batch_001";
                activity.reactivationStage = "completed"; 
                
                await SubscriberRepository.updateSubscriberPreferences(sub.email, {
                    leadActivity: JSON.stringify(activity)
                });
                
                successCount++;
                console.log(`✉️✅ Re-sent and DB updated for: ${sub.email}`);
            } else {
                console.error(`❌ Still failed to send to ${sub.email}:`, res.error);
            }

            // Resend rate limiting (2 per second max, we'll do 1 per second)
            await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (err) {
            console.error(`❌ Error processing ${sub.email}:`, err);
        }
    }

    console.log(`Finished resuming. Total processed: ${successCount}`);
}

run();
