process.env.TZ = 'America/Toronto';
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🎯 The exact search queries to find your buyers in Canada
const TARGET_QUERIES = [
    "boutique accounting firm toronto",
    "tax consultant small business vancouver",
    "SR&ED consultants calgary",
    "business grants consultant ontario"
];

const CSV_PATH = path.join(__dirname, 'lead-buyers.csv');

// Regex to find email addresses in HTML text
const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

// Helper to delay to avoid bot detection
const delay = (ms) => new Promise(res => setTimeout(res, ms));

async function scrapeBuyers() {
    console.log(`🚀 Starting Revenue Generation Engine: Scraping Lead Buyers...`);
    
    // Initialize the CSV file with headers
    fs.writeFileSync(CSV_PATH, 'Company Name,Website,Contact Email,Found via Query\n');

    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    // Pretend to be a normal browser to avoid blocks
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    for (const query of TARGET_QUERIES) {
        console.log(`\n🔍 Searching for: "${query}"...`);
        try {
            // We use DuckDuckGo HTML version. It is VERY bot-friendly and has zero CAPTCHAs.
            const searchUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
            await page.goto(searchUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
            await delay(2000);

            // Extract the organic search result URLs (avoiding ads)
            const firmUrls = await page.evaluate(() => {
                const results = [];
                const links = document.querySelectorAll('a.result__url');
                links.forEach(link => {
                    const href = link.getAttribute('href');
                    const text = link.innerText;
                    // Ignore big aggregator sites like clutch, linkedin, yelp
                    if (href && text && !text.includes('linkedin.com') && !text.includes('yelp.') && !text.includes('clutch.co') && !text.includes('facebook') && !text.includes('duckduckgo')) {
                        // DuckDuckGo redirects, the actual URL is often in the text or easily parsed
                        results.push(text.startsWith('http') ? text : `https://${text}`);
                    }
                });
                return results.slice(0, 10); // Grab top 10 results per query
            });

            console.log(`Found ${firmUrls.length} potential firm websites. Extracting emails...`);

            // Now, visit each firm's website and hunt for their Email Address!
            for (const firmUrl of firmUrls) {
                console.log(`  -> Scanning: ${firmUrl}`);
                try {
                    const firmPage = await browser.newPage();
                    await firmPage.setDefaultNavigationTimeout(15000); // 15 seconds max
                    await firmPage.goto(firmUrl, { waitUntil: 'domcontentloaded' });
                    
                    // Pull all the text from the website's homepage
                    const bodyText = await firmPage.evaluate(() => document.body.innerText);
                    
                    // Use Regex to find any matching email addresses!
                    const foundEmails = bodyText.match(EMAIL_REGEX);
                    
                    if (foundEmails && foundEmails.length > 0) {
                        // De-duplicate and filter out generic image files if regex misfired
                        const uniqueEmails = [...new Set(foundEmails)].filter(e => !e.includes('.png') && !e.includes('.jpg'));
                        
                        if (uniqueEmails.length > 0) {
                            const primaryEmail = uniqueEmails[0]; // Take the first valid email found
                            
                            // Extract a pseudo company name from the URL
                            const companyNameMatch = firmUrl.match(/(?:https?:\/\/)?(?:www\.)?([^\/]+)/i);
                            const companyName = companyNameMatch ? companyNameMatch[1] : 'Unknown Firm';

                            console.log(`     ✅ BINGO! Found email: ${primaryEmail}`);
                            
                            // Save it to our CSV file immediately
                            const csvRow = `"${companyName}","${firmUrl}","${primaryEmail}","${query}"\n`;
                            fs.appendFileSync(CSV_PATH, csvRow);

                            // 🤖 DISPATCH TO n8n AI SALES AGENT (Silent Webhook)
                            try {
                                await fetch('http://localhost:5678/webhook/ai-sales-agent', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                        companyName,
                                        website: firmUrl,
                                        email: primaryEmail,
                                        sourceQuery: query
                                    })
                                });
                                console.log(`     🤖 Sent lead to n8n AI Agent successfully!`);
                            } catch (err) {
                                // Webhook might not be up yet, that's fine.
                            }
                        } else {
                             console.log(`     ❌ No valid emails found on homepage.`);
                        }
                    } else {
                        console.log(`     ❌ No emails found on homepage.`);
                    }
                    await firmPage.close();
                } catch (e) {
                    console.log(`     ⚠️ Could not load website (timeout or block)`);
                }
            }

        } catch (error) {
            console.error(`Error searching query: ${query}`, error.message);
        }
        await delay(5000); // Wait 5 seconds between search queries so we don't get banned
    }

    await browser.close();
    console.log(`\n🎉 Web scraping complete! All buyer leads saved to: ${CSV_PATH}`);
}

scrapeBuyers();
