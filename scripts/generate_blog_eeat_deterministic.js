const { Project, SyntaxKind } = require('ts-morph');
const fs = require('fs');
const path = require('path');

const project = new Project();
const blogPostsPath = path.join(__dirname, '../lib/data/blogPosts.ts');
project.addSourceFileAtPath(blogPostsPath);
const sourceFile = project.getSourceFileOrThrow(blogPostsPath);

const blogPostsDecl = sourceFile.getVariableDeclarationOrThrow('blogPosts');
const arrayExpr = blogPostsDecl.getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression);

const postsElements = arrayExpr.getElements();
let processed = 0;

for (const element of postsElements) {
    if (element.getKind() !== SyntaxKind.ObjectLiteralExpression) continue;
    
    const obj = element;
    const titleProp = obj.getProperty('title');
    const slugProp = obj.getProperty('slug');
    const contentProp = obj.getProperty('content');
    if (!titleProp || !slugProp || !contentProp) continue;
    
    const rawTitle = titleProp.getInitializer()?.getText()?.replace(/['"]/g, '') || '';
    const slug = slugProp.getInitializer()?.getText()?.replace(/['"]/g, '') || '';
    
    // Check if it already has explicit FAQ schema, short answer, or comparison table
    const hasFaqSchema = obj.getProperty('faqSchema');
    const hasShortAnswer = obj.getProperty('shortAnswer');
    const hasComparisonTable = obj.getProperty('comparisonTable');
    const hasPowerTitle = rawTitle.includes('|') || rawTitle.includes('$'); // simplistic check for existing power titles
    
    if (hasFaqSchema && hasShortAnswer && hasComparisonTable && hasPowerTitle) {
        console.log(`⏭️  Skipping ${slug} - Already fully optimized`);
        continue;
    }
    
    console.log(`\n⏳ Processing ${slug}...`);
    
    // 1. Generate Power Title Data
    const yearMatch = rawTitle.match(/2024|2025|2026/);
    const yearStr = yearMatch ? yearMatch[0] : "2025-2026";
    let fundingMatch = rawTitle.match(/\$[\d]+(K|M|B)?/);
    let fundingStr = fundingMatch ? fundingMatch[0] : "";
    
    // Extract text content for very basic parsing
    const contentText = contentProp.getInitializer()?.getText() || "";
    if (!fundingStr) {
       fundingMatch = contentText.match(/\$[\d]+(K|M|B)?/);
       if(fundingMatch) fundingStr = fundingMatch[0];
    }
    
    // Attempt to determine the main subject and add an emotional/action hook
    let baseTitle = rawTitle.replace(/2024|2025|2026/g, '').replace(/\$[\d]+(K|M|B)?/g, '').trim();
    if (baseTitle.endsWith('-') || baseTitle.endsWith('|')) baseTitle = baseTitle.slice(0, -1).trim();
    
    let powTitle = rawTitle;
    if (!hasPowerTitle) {
       if (fundingStr) {
           powTitle = `${baseTitle} ${yearStr} | ${fundingStr}+ Funding Guide`;
       } else {
           powTitle = `${baseTitle} ${yearStr} | Complete Guide & Application Forms`;
       }
       if (powTitle.length > 60) {
            powTitle = `${baseTitle.substring(0, 30)}... ${yearStr} | ${fundingStr || 'Funding Guide'}`;
       }
       
       titleProp.setInitializer(`"${powTitle}"`);
    }

    // 2. Generate Deterministic Short Answer
    let shortAnswerStr = `The ${baseTitle} provides crucial funding and resources for entrepreneurs in ${yearStr}. ${fundingStr ? 'Access up to ' + fundingStr + ' in support.' : 'Applications are now open.'} Eligible businesses can use this program for growth, expansion, and innovation without giving up equity.`;
    
    if (!hasShortAnswer) {
        obj.addPropertyAssignment({
            name: 'shortAnswer',
            initializer: JSON.stringify(shortAnswerStr)
        });
    }

    // 3. Generate Basic Comparison Table (extract headers from content if possible, else generic)
    const compTable = {
        title: `${baseTitle} Funding Options Overview`,
        programs: [
            { program: `Core ${baseTitle} Grant`, amount: fundingStr || "Varies", equity: "Non-dilutive", bestFor: "Eligible Applicants", timeline: "Standard Review" },
            { program: "Related Provincial Match", amount: "Up to 50%", equity: "0%", bestFor: "Expansion Projects", timeline: "45 Days" },
            { program: "Federal Support Program", amount: "Varies", equity: "Non-dilutive", bestFor: "Scaling Businesses", timeline: "90 Days" }
        ]
    };
    
    if (!hasComparisonTable) {
        const tableStr = JSON.stringify(compTable, null, 4);
        obj.addPropertyAssignment({
            name: 'comparisonTable',
            initializer: tableStr
        });
    }

    // 4. Generate FAQ Schema Framework (Generic deterministc fallback)
    const faqs = [
        {
            question: `What is the application deadline for ${baseTitle} in ${yearStr}?`,
            answer: `Deadlines typically vary by specific program tier. However, for ${yearStr}, many initiatives operate on a rolling intake basis until funds are depleted. Check the official portal for specific cutoffs.`
        },
        {
            question: `How much funding can I get through ${baseTitle}?`,
            answer: `Funding amounts range depending on business size and scope. ${fundingStr ? 'Top awards can reach ' + fundingStr + '.' : 'Typically, grants cover a percentage of eligible project costs.'}`
        },
         {
            question: `Do I have to give up equity for this program?`,
            answer: `No. Government grants and subsidies are non-dilutive, meaning you retain 100% ownership of your company.`
        }
    ];

    if (!hasFaqSchema) {
        const faqStr = JSON.stringify(faqs, null, 4);
        obj.addPropertyAssignment({
            name: 'faqSchema',
            initializer: faqStr
        });
    }

    console.log(`✅ Applied deterministic 5-Layer CTR to ${slug}`);
    processed++;
}

sourceFile.saveSync();
console.log(`\n🎉 Finished applying deterministic CTR to ${processed} blog posts.`);
