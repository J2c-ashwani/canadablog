import { config } from 'dotenv';
config({ path: '.env.local' });
import { getGoogleSheetsClient } from '../lib/google-sheets';

async function findLoanLeads() {
  try {
    const sheets = await getGoogleSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    
    if (!spreadsheetId) {
      console.error("GOOGLE_SHEET_ID is missing");
      return;
    }
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Leads!A:BW",
    });
    
    const rows = response.data.values || [];
    const dataRows = rows.slice(1);
    
    const CANADIAN_PROVS = ['on', 'bc', 'ab', 'qc', 'ns', 'mb', 'sk', 'nb', 'nl', 'pe', 'territories', 'national'];
    
    const loanLeads: any[] = [];
    
    dataRows.forEach((row, index) => {
      const countryVal = (row[4] || "").trim();
      const countryValUpper = countryVal.toUpperCase();
      const stateVal = (row[5] || "").trim().toLowerCase();
      const emailVal = (row[2] || "").trim().toLowerCase();
      
      let resolvedCountry = "";
      if (
        countryValUpper === "CANADA" || 
        countryValUpper === "CA" || 
        countryValUpper === "CAN" ||
        countryValUpper === "C"
      ) {
        resolvedCountry = "CANADA";
      } else if (CANADIAN_PROVS.includes(stateVal) || emailVal.endsWith(".ca")) {
        resolvedCountry = "CANADA";
      }
      
      if (resolvedCountry !== "CANADA") return;
      
      // Filter for last 60 days (current time is 2026-07-15T21:20:23+05:30)
      // 60 days ago is 2026-05-16
      const leadTime = new Date(row[0] || "").getTime();
      const cutoffTime = new Date("2026-05-16T00:00:00.000Z").getTime();
      if (isNaN(leadTime) || leadTime < cutoffTime) return;
      
      // Check for loan, debt, financing, equipment, or expansion indicators
      const purpose = (row[9] || "").toLowerCase();
      const description = (row[10] || "").toLowerCase();
      const notes = (row[12] || "").toLowerCase();
      const interests = (row[39] || "").toLowerCase();
      const source = (row[1] || "").toLowerCase();
      
      const hasLoanIndicator = 
        purpose.includes("loan") || purpose.includes("debt") || purpose.includes("financing") || purpose.includes("borrow") || purpose.includes("equipment") || purpose.includes("expansion") || purpose.includes("capital") ||
        description.includes("loan") || description.includes("debt") || description.includes("financing") || description.includes("borrow") || description.includes("equipment") || description.includes("expansion") || description.includes("capital") ||
        notes.includes("loan") || notes.includes("debt") || notes.includes("financing") || notes.includes("borrow") || notes.includes("equipment") || notes.includes("expansion") || notes.includes("capital") ||
        interests.includes("loan") || interests.includes("debt") || interests.includes("financing") ||
        source.includes("loan") || source.includes("debt") || source.includes("financing");
        
      if (hasLoanIndicator) {
        // Redact PII
        loanLeads.push({
          rowIndex: index + 2, // 1-based, +1 for header, +1 for slice
          timestamp: row[0] || "N/A",
          source: row[1] || "N/A",
          email: "[REDACTED_EMAIL]",
          name: "[REDACTED_NAME]",
          country: "Canada",
          province: row[5] || "N/A",
          industry: row[6] || "N/A",
          revenue: row[7] || "N/A",
          fundingAmountRange: row[8] || "N/A",
          fundingPurpose: row[9] || "N/A",
          businessDescription: row[10] || "N/A",
          phone: "[REDACTED_PHONE]",
          notes: row[12] || "N/A",
          interests: row[39] || "N/A",
          companyName: "[REDACTED_COMPANY]",
          readinessScore: row[40] || "N/A",
          readinessBand: row[41] || "N/A"
        });
      }
    });
    
    console.log(`Found ${loanLeads.length} Canadian loan/debt leads.`);
    console.log(JSON.stringify(loanLeads.slice(0, 5), null, 2));
  } catch (err) {
    console.error("Error matching loan leads:", err);
  }
}

findLoanLeads();
