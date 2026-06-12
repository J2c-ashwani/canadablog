import { config } from 'dotenv';
config({ path: '.env.local' });
import { getLeadsFromSheet } from '@/lib/google-sheets';

async function inspectLeads() {
  try {
    const allLeads = await getLeadsFromSheet(1000);
    console.log(`Total raw leads in Google Sheet: ${allLeads.length}`);
    
    // Sample the first 10 leads to check their data structures and pricing
    allLeads.slice(0, 10).forEach((l, index) => {
      const interests = l.fundingInterests || [];
      const email = l.email || '';
      const source = l.source || '';
      const unsubscribeToken = l.unsubscribeToken || '';
      const isSubscribed = l.isSubscribed;
      const industry = l.industry || '';
      
      console.log(`[Row ${index + 2}] Email: ${email}`);
      console.log(`  Source: ${source}`);
      console.log(`  Unsubscribe Token: ${unsubscribeToken}`);
      console.log(`  Is Subscribed: ${isSubscribed} (${typeof isSubscribed})`);
      console.log(`  Industry: ${industry}`);
      console.log(`  Interests: ${JSON.stringify(interests)}`);
    });
  } catch (err) {
    console.error('Error inspecting leads:', err);
  }
}

inspectLeads();
