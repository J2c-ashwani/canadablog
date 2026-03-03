const fs = require('fs');
const path = require('path');

const newAnswers = {
  "alberta-small-business-grants": "Alberta small businesses can access targeted provincial grants. Funding is available for digital adoption, specialized training, and market expansion specifically designed for AB-based companies.",
  "amber-grant-for-women": "The Amber Grant awards $10,000 monthly and a $25,000 year-end prize to women entrepreneurs. It's one of the most accessible grants, requiring only a simple story-based application instead of a complex pitch deck.",
  "atlantic-canada-business-grants": "Atlantic Canadian businesses have access to specialized federal funding through ACOA. Programs support export expansion, hiring, and community economic development across the four eastern provinces.",
  "bc-small-business-grants": "BC offers targeted small business grants for local enterprises. Programs cover e-commerce scaling, employee training, and export readiness tailored specifically for British Columbia businesses.",
};

const filePath = path.join(__dirname, '..', 'lib/data/blogPosts.ts');
let content = fs.readFileSync(filePath, 'utf-8');

let updatedCount = 0;

for (const [slug, newAnswer] of Object.entries(newAnswers)) {
  const regex = new RegExp(`(slug:\\s*["']${slug}["'].*?shortAnswer:\\s*)(["'])(.*?)\\2`, 's');
  if (content.match(regex)) {
    content = content.replace(regex, `$1"${newAnswer}"`);
    updatedCount++;
    console.log(`✅ Updated short answer for: ${slug}`);
  } else {
    console.log(`❌ Could not find/match shortAnswer for: ${slug}`);
  }
}

fs.writeFileSync(filePath, content);
console.log(`\n🎉 Total updated: ${updatedCount}`);
