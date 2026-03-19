const fs = require('fs');
const path = require('path');

const METADATA_PATH = path.join(__dirname, '../lib/data/blogMetadata.json');
const OUTPUT_DIR = path.join(__dirname, '../out');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function formatDate() {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const year = d.getFullYear();
  return year + '-' + month + '-' + day;
}

function extractMoney(title, shortAnswer) {
  const text = (title || '') + ' ' + (shortAnswer || '');
  const match = text.match(/\$[\d,.]+[KkMmBb]?/);
  return match ? match[0] : null;
}

function buildPostBlock(post) {
  const url = 'https://www.fsidigital.ca/blog/' + post.slug;
  const money = extractMoney(post.title, post.shortAnswer);
  const moneyLabel = money ? '\u{1F4B0} Up to ' + money + ' Available' : '\u{1F525} New Opportunity';
  const cleanTitle = (post.title || '').split('|')[0].trim();
  const teaser = ((post.metaDescription || post.shortAnswer || 'Click to read the full eligibility requirements and application steps.')).substring(0, 160) + '...';

  return [
    '                    <div class="post-container">',
    '                        <div class="post-money">' + moneyLabel + '</div>',
    '                        <h2 class="post-title"><a href="' + url + '">' + cleanTitle + '</a></h2>',
    '                        <p class="post-desc">' + teaser + '</p>',
    '                        <div class="btn-container">',
    '                            <a href="' + url + '" class="btn">Read the Guide &amp; Apply &rarr;</a>',
    '                        </div>',
    '                    </div>',
  ].join('\n');
}

function generateHtml(posts) {
  const postBlocks = posts.map(buildPostBlock).join('\n');
  const year = new Date().getFullYear();

  const html = '<!DOCTYPE html>\n'
    + '<html lang="en">\n'
    + '<head>\n'
    + '    <meta charset="utf-8">\n'
    + '    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n'
    + '    <title>FSI Digital Weekly Grants</title>\n'
    + '    <style>\n'
    + '        body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #f4f5f7; }\n'
    + '        .wrapper { width: 100%; table-layout: fixed; background-color: #f4f5f7; padding-bottom: 40px; }\n'
    + '        .main { background-color: #ffffff; margin: 0 auto; width: 100%; max-width: 600px; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); margin-top: 40px;}\n'
    + '        .header { background-color: #1a365d; padding: 30px; text-align: center; }\n'
    + '        .header h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: bold; }\n'
    + '        .body-content { padding: 30px; }\n'
    + '        .intro { color: #4a5568; font-size: 16px; line-height: 1.5; margin-bottom: 25px; }\n'
    + '        .post-container { border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 20px; background-color: #ffffff; }\n'
    + '        .post-title { margin: 0 0 10px 0; font-size: 18px; font-weight: bold; }\n'
    + '        .post-title a { color: #2b6cb0; text-decoration: none; }\n'
    + '        .post-title a:hover { text-decoration: underline; }\n'
    + '        .post-money { display: inline-block; background-color: #c6f6d5; color: #22543d; font-size: 12px; font-weight: bold; padding: 4px 8px; border-radius: 4px; margin-bottom: 10px; }\n'
    + '        .post-desc { color: #4a5568; font-size: 14px; line-height: 1.5; margin: 0 0 15px 0; }\n'
    + '        .btn-container { text-align: left; }\n'
    + '        .btn { display: inline-block; background-color: #3182ce; color: #ffffff !important; text-decoration: none; padding: 10px 20px; border-radius: 4px; font-size: 14px; font-weight: bold; }\n'
    + '        .footer { background-color: #edf2f7; padding: 25px; text-align: center; color: #718096; font-size: 12px; }\n'
    + '        .footer a { color: #4a5568; text-decoration: underline; }\n'
    + '    </style>\n'
    + '</head>\n'
    + '<body style="margin: 0; padding: 0;">\n'
    + '    <center class="wrapper">\n'
    + '        <table class="main" width="100%" cellpadding="0" cellspacing="0" border="0">\n'
    + '            <tr>\n'
    + '                <td class="header">\n'
    + '                    <h1>FSI Digital Grant Alerts \u{1F680}</h1>\n'
    + '                </td>\n'
    + '            </tr>\n'
    + '            <tr>\n'
    + '                <td class="body-content">\n'
    + '                    <p class="intro">\n'
    + '                        <strong>Hi there,</strong><br><br>\n'
    + '                        Here are the top ' + posts.length + ' new business grants you need to know about this week. Do not leave this money on the table!\n'
    + '                    </p>\n'
    + postBlocks + '\n'
    + '                    <p class="intro" style="margin-top: 30px; font-size: 14px;">\n'
    + '                        Need help navigating the application process? Our experts evaluate your business and write winning applications.\n'
    + '                        <a href="https://www.fsidigital.ca/contact" style="color: #2b6cb0;">Book a consultation today.</a>\n'
    + '                    </p>\n'
    + '                </td>\n'
    + '            </tr>\n'
    + '            <tr>\n'
    + '                <td class="footer">\n'
    + '                    &copy; ' + year + ' FSI Digital. All rights reserved.<br><br>\n'
    + '                    You are receiving this email because you subscribed to our grant alert newsletter.<br>\n'
    + '                    <a href="#">Unsubscribe</a>\n'
    + '                </td>\n'
    + '            </tr>\n'
    + '        </table>\n'
    + '    </center>\n'
    + '</body>\n'
    + '</html>';

  return html;
}

async function run() {
  console.log('Generating Mailchimp-compatible HTML Newsletter...');
  const fileData = fs.readFileSync(METADATA_PATH, 'utf8');
  const db = JSON.parse(fileData);

  const posts = db.metadata
    .filter(function(p) { return !p.slug.includes('-archive'); })
    .slice(0, 5);

  const html = generateHtml(posts);
  const outPath = path.join(OUTPUT_DIR, 'newsletter-' + formatDate() + '.html');

  fs.writeFileSync(outPath, html, 'utf8');
  console.log('Newsletter successfully generated with ' + posts.length + ' top grants.');
  console.log('Saved to: ' + outPath);
  console.log('You can now open this HTML file in your browser, then copy-paste it into Mailchimp!');
}

run().catch(console.error);
