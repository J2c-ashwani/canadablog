import { config } from 'dotenv';
config({ path: '.env.local' });
import { getGoogleSheetsClient } from '../lib/google-sheets';
import { getFirstName } from '../lib/emails/mailer';
import { sendMissingFundingAlertEmail } from '../lib/emails/newsletter-marketing';
import crypto from 'crypto';

async function run() {
  const dryRun = !process.argv.includes('--execute');
  const limitArg = process.argv.find(arg => arg.startsWith('--limit='));
  const limit = limitArg ? parseInt(limitArg.split('=')[1], 10) : 70;

  console.log(`Campaign script started. Mode: ${dryRun ? 'DRY RUN (Simulated)' : 'EXECUTE (Live)'}`);
  console.log(`Limit: ${limit} leads`);

  try {
    const sheets = await getGoogleSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    console.log('Fetching leads from Google Sheet...');
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Leads!A:BO',
    });

    const rows = response.data.values || [];
    if (rows.length === 0) {
      console.error('No rows found in sheet.');
      return;
    }

    console.log(`Total rows read (including header): ${rows.length}`);

    const emailIndex = 2; // Column C
    const nameIndex = 3;  // Column D
    const regionIndex = 5; // Column F
    const industryIndex = 6; // Column G
    const businessStageIndex = 7; // Column H
    const isSubscribedIndex = 33; // Column AH
    const loginTokenIndex = 42; // Column AQ
    const companyNameIndex = 47; // Column AV
    const reportPurchasedIndex = 48; // Column AW
    const leadActivityIndex = 51; // Column AZ

    // 1. Identify emails already processed in previous runs/batches
    const alreadyProcessedEmails = new Set<string>();

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      const email = (row[emailIndex] || '').toLowerCase().trim();
      if (!email) continue;

      const leadActivity = row[leadActivityIndex] || '{}';
      try {
        if (leadActivity && leadActivity !== 'N/A') {
          const act = JSON.parse(leadActivity);
          if (act.reactivationStage || act.experimentTag === "historical_reactivation_batch_001") {
            alreadyProcessedEmails.add(email);
          }
        }
      } catch (e) {
        // ignore JSON parsing errors
      }
    }

    console.log(`Found ${alreadyProcessedEmails.size} emails already processed in previous batches.`);

    // 2. Identify candidates starting from row 2 (index 1) downward
    const candidates: {
      email: string;
      name: string;
      region: string;
      industry: string;
      businessStage: string;
      loginToken: string;
      companyName: string;
      rowNumbers: number[];
      signupDate: string;
    }[] = [];
    
    const seenEmailsInThisRun = new Set<string>();
    const CUTOFF_DATE = new Date('2026-06-16T00:00:00.000Z'); // Leads signed up up to June 15, 2026 inclusive

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      const email = (row[emailIndex] || '').toLowerCase().trim();
      if (!email) continue;

      // Skip if already processed in a previous batch
      if (alreadyProcessedEmails.has(email)) continue;

      // Deduplicate: If seen in this run, just record the row number so we update all matching rows
      if (seenEmailsInThisRun.has(email)) {
        const existing = candidates.find(c => c.email === email);
        if (existing) {
          existing.rowNumbers.push(i + 1);
        }
        continue;
      }

      // Check date: must be up to June 15, 2026
      const timestamp = row[0];
      if (!timestamp) continue;
      const signupDate = new Date(timestamp);
      if (isNaN(signupDate.getTime()) || signupDate >= CUTOFF_DATE) continue;

      // Check unsubscribe status: skip if "No"
      const isSubscribedStr = row[isSubscribedIndex] || '';
      if (isSubscribedStr.toLowerCase() === 'no') continue;

      // Check purchase status: skip if they bought a report already
      const reportPurchasedStr = row[reportPurchasedIndex] || '';
      if (reportPurchasedStr.toLowerCase() === 'yes') continue;

      // Determine or generate login token
      let token = row[loginTokenIndex] || '';
      if (!token || token === 'N/A') {
        token = crypto.createHash("sha256").update(email + "fsi-login-token-2026").digest("hex").slice(0, 32);
      }

      // Valid candidate!
      seenEmailsInThisRun.add(email);
      candidates.push({
        email,
        name: row[nameIndex] || '',
        region: row[regionIndex] || '',
        industry: row[industryIndex] || '',
        businessStage: row[businessStageIndex] || '',
        loginToken: token,
        companyName: row[companyNameIndex] || '',
        rowNumbers: [i + 1],
        signupDate: timestamp,
      });
    }

    console.log(`Total unique candidates eligible: ${candidates.length}`);

    // Slice to the batch limit
    const batch = candidates.slice(0, limit);
    console.log(`Processing batch of ${batch.length} leads...`);

    let successCount = 0;

    for (const candidate of batch) {
      const firstName = getFirstName(candidate.name);

      if (dryRun) {
        console.log(`[DRY RUN] Would email: ${candidate.email} (Name: ${firstName}, Company: ${candidate.companyName || 'N/A'}, Region: ${candidate.region || 'N/A'}, Industry: ${candidate.industry || 'N/A'}, Stage: ${candidate.businessStage || 'N/A'}, Signup: ${candidate.signupDate}). Associated sheet rows: ${candidate.rowNumbers.join(', ')}`);
        successCount++;
      } else {
        try {
          console.log(`Sending email to ${candidate.email}...`);
          const res = await sendMissingFundingAlertEmail({
            to: candidate.email,
            name: candidate.name,
            loginToken: candidate.loginToken,
            companyName: candidate.companyName,
            missingFundingAmount: "$19",
            region: candidate.region,
            industry: candidate.industry,
            businessStage: candidate.businessStage,
          });

          if (res.success) {
            console.log(`✉️ Email successfully sent to ${candidate.email}. Updating sheet rows: ${candidate.rowNumbers.join(', ')}`);

            for (const rowNum of candidate.rowNumbers) {
              const rowData = rows[rowNum - 1];
              const currentLeadActivity = rowData[leadActivityIndex] || '{}';
              let activity: any = {};
              try {
                if (currentLeadActivity && currentLeadActivity !== 'N/A') {
                  activity = JSON.parse(currentLeadActivity);
                }
              } catch (e) {
                // ignore
              }

              activity.reactivationStage = "completed";
              activity.experimentTag = "historical_reactivation_batch_001";
              activity.reactivationSentAt = new Date().toISOString();

              const range = `Leads!AZ${rowNum}`;
              await sheets.spreadsheets.values.update({
                spreadsheetId,
                range,
                valueInputOption: 'USER_ENTERED',
                requestBody: {
                  values: [[JSON.stringify(activity)]],
                },
              });

              // Cooldown delay to stay well under Sheets 60 req/min limit
              await new Promise(resolve => setTimeout(resolve, 800));
            }

            successCount++;
            console.log(`✅ Sheet updated for ${candidate.email}.`);
          } else {
            console.error(`❌ Failed to send email to ${candidate.email}:`, res.error);
          }

          // Delay between emails
          await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (err) {
          console.error(`❌ Exception processing ${candidate.email}:`, err);
        }
      }
    }

    console.log(`\nCampaign run finished. Processed: ${successCount}/${batch.length} leads successfully.`);

  } catch (error) {
    console.error('Error during campaign execution:', error);
  }
}

run();
