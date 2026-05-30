const fs = require('fs');
const path = require('path');

const METADATA_PATH = path.join(__dirname, '../lib/data/blogMetadata.json');
const OUTPUT_PATH = path.join(__dirname, '../out/social-posts.csv');

// Helpers for CSV escaping
function escapeCSV(field) {
  if (field === undefined || field === null) return '';
  const str = String(field);
  // If no quotes, commas, or newlines, return as is
  if (!/[",\n\r]/.test(str)) return str;
  // Replace quotes with double quotes
  return `"${str.replace(/"/g, '""')}"`;
}

// Helper to extract hook dollar amounts (e.g., $180M)
function getDollarHook(title, shortAnswer) {
  const text = `${title} ${shortAnswer || ''}`;
  const match = text.match(/\$[\d,.]+[KkMmBb]?/);
  return match ? match[0] : null;
}

// Hashtag generator based on category/title
function getHashtags(title, category) {
  const tags = new Set(['#SmallBusiness', '#Grants']);
  
  const text = (title + ' ' + (category || '')).toLowerCase();
  
  if (text.includes('canada') || text.includes('ontario') || text.includes('alberta')) {
    tags.add('#CanadaBusiness');
  } else if (text.includes('usa') || text.includes('texas') || text.includes('california')) {
    tags.add('#USABusiness');
  }

  if (text.includes('tech') || text.includes('ai ') || text.includes('software')) tags.add('#TechStartup');
  if (text.includes('agriculture') || text.includes('agtech')) tags.add('#AgTech');
  if (text.includes('women') || text.includes('female')) tags.add('#WomenInBusiness');
  if (text.includes('minority') || text.includes('black')) tags.add('#MinorityOwned');
  if (text.includes('manufacturing')) tags.add('#Manufacturing');
  
  return Array.from(tags).slice(0, 4).join(' '); // Max 4 tags
}

async function run() {
  console.log('📖 Generating Social Media CSV from Blog Metadata...');
  
  if (!fs.existsSync(METADATA_PATH)) {
    console.error('❌ metadata file not found');
    process.exit(1);
  }

  const fileData = fs.readFileSync(METADATA_PATH, 'utf8');
  const metadataMap = JSON.parse(fileData);
  const posts = metadataMap.metadata;
  
  // Create output directory if it doesn't exist
  if (!fs.existsSync(path.dirname(OUTPUT_PATH))) {
    fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  }

  // Headers for the CSV (Buffer/Hootsuite format: Date, Text, Link)
  // We'll just generate the text and link columns so user can map it in their scheduler.
  let csvContent = 'Date,Text,Link,Platform\n';
  
  const activePosts = posts.filter(p => !p.slug.includes('-archive'));
  console.log(`Found ${activePosts.length} active posts to process.`);

  let postCount = 0;
  
  for (const post of activePosts) {
    const title = post.title;
    const cleanTitle = title.split('|')[0].trim();
    const dollars = getDollarHook(post.title, post.shortAnswer);
    const moneyHook = dollars ? `💰 Looking for up to ${dollars} in non-dilutive funding?` : `🚀 Looking for non-dilutive funding?`;
    
    const url = `https://www.fsidigital.ca/blog/${post.slug}`;
    const hashtags = getHashtags(title, post.category);

    // V1: Twitter / X (Short & Punchy)
    let twitterText = `${moneyHook}\n\nThe ${cleanTitle} is open for applications in ${new Date().getFullYear()}.\n\nCheck your eligibility and learn how to apply 👇\n\n${hashtags}`;
    
    // V2: LinkedIn (Professional & value-driven)
    let linkedInText = `If you're a founder looking for non-dilutive capital, do NOT sleep on government grants.\n\n${moneyHook}\n\nOur team just broke down everything you need to know about the ${cleanTitle}, including:\n✅ Eligibility requirements\n✅ Application steps\n✅ Deadlines\n\nRead the full guide here:\n${url}\n\n${hashtags}`;
    
    // V3: Facebook (Community/Conversational)
    let fbText = `Is your business eligible for the ${cleanTitle}? 🤔\n\nThere is currently ${dollars ? `up to ${dollars} in ` : ''}funding available for qualifying businesses this year.\n\nWe put together a complete guide on how to secure this funding before the deadlines approach. Check it out here: ${url}\n\n${hashtags}`;

    // Write to CSV (Date empty, user can fill or scheduler auto-fills)
    csvContent += `"",${escapeCSV(twitterText)},${escapeCSV(url)},"Twitter"\n`;
    csvContent += `"",${escapeCSV(linkedInText)},${escapeCSV(url)},"LinkedIn"\n`;
    csvContent += `"",${escapeCSV(fbText)},${escapeCSV(url)},"Facebook"\n`;
    
    postCount += 3;
  }

  fs.writeFileSync(OUTPUT_PATH, csvContent, 'utf8');
  console.log(`✅ Successfully generated ${postCount} social media posts.`);
  console.log(`📄 Saved to: ${OUTPUT_PATH}`);
}

run().catch(console.error);
