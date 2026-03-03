const fs = require('fs');
const path = require('path');

const newAnswers = {
  "amber-grant-women-canada": "The Amber Grant awards $10,000 monthly and a $25,000 year-end prize to women entrepreneurs. It's one of the most accessible grants, requiring only a simple story-based application instead of a complex pitch deck."
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
