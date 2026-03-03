const fs = require('fs');
const path = require('path');

// ============================================================
// BLOG POSTS — 3 remaining bad entries
// ============================================================
const blogFixes = {
    "alberta-women-business-grants": "Alberta Women Entrepreneurs (AWE) offers loans up to $150K plus free advisory services. Women Building Futures provides dedicated industry-ready training, and Innovate BC funds women-led tech startups across the province.",
    "atlantic-small-business-grants-guide": "Atlantic Canada distributes $850M+ through ACOA and 4 provincial programs. ACOA's Business Development Program covers up to 50% of eligible costs, while Nova Scotia, New Brunswick, PEI, and Newfoundland each offer targeted SME grants.",
    "bc-women-business-grants": "BC supports women entrepreneurs through WeBC loans up to $150K, Innovate BC tech funding, and free 1-on-1 business coaching. The Women Enterprise Centre is the best starting point for accessing all provincial and federal women-focused programs.",
};

// ============================================================
// GUIDES — 16 title-only entries
// ============================================================
const guideFixes = {
    "apply-sba-loans": "SBA 7(a) loans go up to $5M with terms to 25 years, 504 loans up to $5.5M for real estate/equipment, and Microloans up to $50K. Start at SBA.gov/lender-match — you apply through an approved lender, not directly through the SBA.",
    "apply-minority-grants": "The SBA 8(a) Business Development Program provides 9 years of contracting preferences, mentorship, and technical assistance. MBE certification also unlocks MBDA grants, HUBZone preferences, and state-level minority set-aside contracts worth billions annually.",
    "sba-growth-accelerator-fund-guide": "The SBA Growth Accelerator Fund Competition awards $50,000 prizes to accelerators and incubators serving underrepresented entrepreneurs. Winners receive cash plus technical assistance — no equity taken, no matching funds required.",
    "apply-doe-clean-energy-grants": "The DOE distributes $30B+ annually for clean energy R&D. ARPA-E funds high-risk breakthrough projects ($500K-$10M), while the Loan Programs Office offers loan guarantees up to $40B for commercial-scale deployment of proven technologies.",
    "california-loan-guarantee-guide": "The California Small Business Loan Guarantee Program (SBLGP) guarantees up to 80% of loans from $20K to $1.25M. This dramatically reduces lender risk, making it easier for startups and small businesses to get bank financing they'd otherwise be denied.",
    "apply-strategic-innovation-fund": "SIF provides repayable and non-repayable contributions for large-scale projects over $10M. It prioritizes AI, clean tech, and biomanufacturing. Applications require a 3-year business plan and proof of economic benefit — approval takes 6-12 months.",
    "apply-irap-government-grants": "IRAP provides non-repayable contributions covering up to 80% of eligible labour costs for R&D projects. You cannot apply online — contact an Industrial Technology Advisor at 1-877-994-4727 to start the process. Approval cycles run monthly.",
    "irap-innovation-application-guide": "IRAP's Innovation Assistance Program funds technical projects from $50K to $10M. Your assigned ITA will help scope the project, define milestones, and build your application — their involvement significantly increases approval rates.",
    "women-entrepreneurship-loan-fund-guide": "The Women Entrepreneurship Loan Fund provides loans up to $100K at below-market rates through participating organizations. Unlike traditional bank loans, it requires no collateral for amounts under $50K and includes free business advisory services.",
    "apply-youth-entrepreneurship-funding": "Futurpreneur Canada offers $20K in startup loans plus $40K from BDC for entrepreneurs aged 18-39. It includes 2 years of free mentorship. You need a business plan — use their free Business Plan Writer tool at futurpreneur.ca to start.",
    "bdc-women-entrepreneurs-financing-guide": "BDC offers women-only financing from $100K to $5M with flexible repayment terms and reduced rates. Beyond capital, their Growth Driver program provides free strategic advisory and their Women in Tech Venture Fund invests in women-led tech companies.",
    "canada-digital-ai-funding-guide": "CDAP provides a $15K grant for a digital adoption plan, unlocking a $100K interest-free BDC loan to implement it. Scale AI funds large supply-chain AI projects. Stack both programs to digitize operations at minimal cost.",
    "edc-women-trade-export-financing-guide": "EDC's Women in Trade program offers export financing, insurance, and bonding specifically for women-led exporters. Their Export Guarantee Program covers up to 90% of export losses, reducing the financial risk of entering international markets.",
    "nserc-research-grants-guide": "NSERC Discovery Grants fund 5-year research programs ($30K-$50K/year) in natural sciences and engineering. Engage Grants ($25K, 6-month) fund industry-academic partnerships. Alliance Grants co-fund larger collaborative R&D projects with private sector partners.",
    "apply-regional-development-agencies": "Canada's 7 Regional Development Agencies (FedDev Ontario, PacifiCan, PrairiesCan, CED Quebec, ACOA, FedNor, CanNor) each offer region-specific grants and zero-interest loans. Contact your local agency first — they have dedicated advisors who help shape applications.",
    "apply-indigenous-rural-business-funding": "The Aboriginal Business and Entrepreneurship Development (ABED) program provides non-repayable contributions up to $99,999. The Indigenous Growth Fund offers loans up to $250K. Rural businesses can additionally access CERP and regional agency funding for infrastructure and market access.",
};

function fixFile(filePath, fixes) {
    let content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    let updatedCount = 0;

    for (let i = 0; i < lines.length; i++) {
        const sm = lines[i].match(/slug:\s*["']([^"']+)["']/);
        if (sm && fixes[sm[1]]) {
            for (let j = i; j < i + 60 && j < lines.length; j++) {
                if (lines[j].includes('shortAnswer:')) {
                    const prefixMatch = lines[j].match(/^(\s*(?:\},?\s*)?shortAnswer:\s*)/);
                    if (prefixMatch) {
                        const escapedAnswer = fixes[sm[1]].replace(/\\/g, '\\\\').replace(/"/g, '\\"');
                        lines[j] = `${prefixMatch[1]}"${escapedAnswer}",`;
                        updatedCount++;
                        console.log(`✅ Fixed: ${sm[1]}`);
                    }
                    break;
                }
            }
        }
    }

    fs.writeFileSync(filePath, lines.join('\n'));
    return updatedCount;
}

// Fix blogPosts.ts
console.log('=== Fixing blogPosts.ts ===');
const blogCount = fixFile(path.join(__dirname, '..', 'lib/data/blogPosts.ts'), blogFixes);
console.log(`Blog posts fixed: ${blogCount}\n`);

// Fix guides.ts
console.log('=== Fixing guides.ts ===');
const guideCount = fixFile(path.join(__dirname, '..', 'lib/data/guides.ts'), guideFixes);
console.log(`Guides fixed: ${guideCount}\n`);

console.log(`🎉 Total fixed: ${blogCount + guideCount}`);
