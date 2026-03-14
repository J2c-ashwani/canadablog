const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

async function auditPage() {
    console.log("Starting Content Depth and E-E-A-T Audit...\n");
    
    // Pick a page that was generated 
    const targetPath = path.join(__dirname, '../.next/server/app/grants/sk/regina/technology.html');
    
    if (!fs.existsSync(targetPath)) {
        console.error(`Page not found: ${targetPath}`);
        return;
    }

    const html = fs.readFileSync(targetPath, 'utf8');
    const $ = cheerio.load(html);

    console.log("=== E-E-A-T Component Audit ===");
    
    // 1. Check for Q&A H1
    const h1 = $('h1').first().text().trim();
    console.log(`[H1 Check] Found H1: "${h1}"`);
    if (h1.includes('?')) {
        console.log("✅ Q&A H1 is present and ends with a question mark.");
    } else {
        console.log("❌ Warning: H1 does not appear to be a direct question.");
    }

    // 2. Check for EEAT Badge
    const isBadgePresent = html.includes('Ashwani K.') && html.includes('Verified Local Programs');
    console.log(`[Reviewed Badge Check] Present: ${isBadgePresent ? '✅' : '❌'}`);

    // 3. Check for Jump Links
    const jumpLinks = $('a[href="#landscape"]').length;
    console.log(`[Jump Links Check] Found jump links. ${jumpLinks > 0 ? '✅' : '❌'}`);

    // 4. Check for Eligibility Widget
    const eligibilityWidget = html.includes('Check Your Eligibility') || html.includes('Does your business primarily operate in');
    console.log(`[Eligibility Check Widget] Present: ${eligibilityWidget ? '✅' : '❌'}`);

    // 5. Check for Inline CTA
    const inlineCTA = html.includes('Get Free Assessment') && html.includes('Need help finding the right');
    console.log(`[Inline CTA Check] Present: ${inlineCTA ? '✅' : '❌'}`);


    console.log("\n=== Content Depth Audit ===");
    
    // Strip HTML and count words
    const strippedText = $('body').text().replace(/\s+/g, ' ').trim();
    const wordCount = strippedText.split(' ').length;
    
    console.log(`[Word Count] Total Words: ${wordCount}`);
    
    if (wordCount >= 1500) {
        console.log("✅ Content meets or exceeds the 1500+ word requirement.");
    } else {
        console.log("❌ Warning: Content is below the 1500 word threshold.");
    }

    // Checking for presence of Deep Dive specifics
    const hasStacking = html.includes('Capital Stacking');
    const hasDisqualifiers = html.includes('Disqualifiers');
    
    console.log(`[Deep Dive Context] Stacking Present: ${hasStacking ? '✅' : '❌'}`);
    console.log(`[Deep Dive Context] Disqualifiers Present: ${hasDisqualifiers ? '✅' : '❌'}`);
}

auditPage();
