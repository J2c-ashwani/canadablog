import { config } from 'dotenv';
config({ path: '.env.local' });
import { getGoogleSheetsClient } from '../lib/google-sheets';

async function countCountries() {
  try {
    const sheets = await getGoogleSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    
    if (!spreadsheetId) {
      console.error("GOOGLE_SHEET_ID is missing");
      return;
    }
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Leads!A:F", // Columns A to F
    });
    
    const rows = response.data.values || [];
    console.log(`Total rows in sheet (including header): ${rows.length}`);
    
    const CANADIAN_PROVS = ['on', 'bc', 'ab', 'qc', 'ns', 'mb', 'sk', 'nb', 'nl', 'pe', 'territories', 'national'];
    const US_STATES = [
      'az', 'ca', 'co', 'fl', 'ga', 'hi', 'id', 'il', 'in', 'ky', 'la', 'ma', 'md', 'mi', 'mn',
      'nc', 'ne', 'nj', 'nm', 'nv', 'ny', 'oh', 'ok', 'pa', 'tn', 'tx', 'va', 'wa', 'wi'
    ];

    const otherCountries = new Map<string, number>();
    const unresolvedTLDs = new Map<string, number>();
    const corporateDomains = new Map<string, number>();
    const genericDomains = ['gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com', 'icloud.com', 'aol.com', 'mail.com', 'zoho.com', 'protonmail.com', 'proton.me', 'yandex.ru', 'live.com', 'gmx.com', 'hotmail.co.uk'];

    let canadaCount = 0;
    let usaCount = 0;
    let otherCount = 0;

    // Skip header row
    const dataRows = rows.slice(1);
    dataRows.forEach((row) => {
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
      } else if (
        countryValUpper === "USA" || 
        countryValUpper === "US" || 
        countryValUpper === "UNITED STATES" || 
        countryValUpper === "U"
      ) {
        resolvedCountry = "USA";
      } else {
        // Resolve based on state
        if (CANADIAN_PROVS.includes(stateVal)) {
          resolvedCountry = "CANADA";
        } else if (US_STATES.includes(stateVal)) {
          resolvedCountry = "USA";
        }
      }

      // If still unresolved, inspect email domain
      if (!resolvedCountry && emailVal) {
        if (emailVal.endsWith(".ca")) {
          resolvedCountry = "CANADA";
        } else if (emailVal.endsWith(".us")) {
          resolvedCountry = "USA";
        } else {
          // Extract TLD and domain
          const parts = emailVal.split("@");
          if (parts.length === 2) {
            const domain = parts[1];
            const domainParts = domain.split(".");
            const tld = domainParts[domainParts.length - 1];
            unresolvedTLDs.set(tld, (unresolvedTLDs.get(tld) || 0) + 1);
            
            if (!genericDomains.includes(domain)) {
              corporateDomains.set(domain, (corporateDomains.get(domain) || 0) + 1);
            }
          }
        }
      }

      if (resolvedCountry === "CANADA") {
        canadaCount++;
      } else if (resolvedCountry === "USA") {
        usaCount++;
      } else {
        otherCount++;
        const key = `${countryVal || "EMPTY"} | ${stateVal || "EMPTY"}`;
        otherCountries.set(key, (otherCountries.get(key) || 0) + 1);
      }
    });
    
    console.log(`RESULT_COUNTS:`);
    console.log(`CANADA_LEADS (Explicit + Inferred + Domain): ${canadaCount}`);
    console.log(`USA_LEADS (Explicit + Inferred + Domain): ${usaCount}`);
    console.log(`OTHER_UNRESOLVED_LEADS: ${otherCount}`);
    console.log("Unresolved categories [Country | State]:", Array.from(otherCountries.entries()));
    console.log("TLDs for remaining unresolved leads:", Array.from(unresolvedTLDs.entries()));
    console.log("Corporate domains for unresolved leads:", Array.from(corporateDomains.entries()).sort((a,b) => b[1] - a[1]));
  } catch (err) {
    console.error("Error executing query:", err);
  }
}

countCountries();
