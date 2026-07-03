const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const downloadDir = path.join(root, 'app/download');

console.log('🤖 Starting Automated Download Guide Redirect Integrity Test...\n');

if (!fs.existsSync(downloadDir)) {
  console.error('❌ Error: app/download directory not found.');
  process.exit(1);
}

const folders = fs.readdirSync(downloadDir).filter(f => {
  const full = path.join(downloadDir, f);
  return fs.statSync(full).isDirectory();
});

let failed = 0;
let passed = 0;

folders.forEach(folder => {
  const clientPath = path.join(downloadDir, folder, 'DownloadClient.tsx');
  if (!fs.existsSync(clientPath)) {
    console.log(`⚠️  [SKIP] ${folder}: DownloadClient.tsx not found.`);
    return;
  }

  const content = fs.readFileSync(clientPath, 'utf8');
  
  // Find router.push("/download/.../thank-you")
  const regex = /router\.push\(\s*["']\/download\/([^"']+)\/thank-you["']\s*\)/;
  const match = content.match(regex);

  if (!match) {
    console.log(`❌ [FAIL] ${folder}: Could not find a valid thank-you redirect pattern in DownloadClient.tsx.`);
    failed++;
    return;
  }

  const redirectSlug = match[1];
  const thankYouPath = path.join(downloadDir, redirectSlug, 'thank-you', 'page.tsx');

  if (fs.existsSync(thankYouPath)) {
    console.log(`✅ [PASS] ${folder} -> Redirects to /download/${redirectSlug}/thank-you (Exists!)`);
    passed++;
  } else {
    console.error(`❌ [FAIL] ${folder} -> Redirects to /download/${redirectSlug}/thank-you (404 NOT FOUND!)`);
    console.error(`          Expected file at: ${thankYouPath}`);
    failed++;
  }
});

console.log(`\n📊 Redirect Integrity Test Results:`);
console.log(`   Passed: ${passed}`);
console.log(`   Failed: ${failed}`);

if (failed > 0) {
  console.error('\n❌ BUILD FAILED: One or more download guide redirect routes are broken.');
  process.exit(1);
} else {
  console.log('\n🟢 BUILD SUCCESS: All download guide redirects are verified and healthy.');
  process.exit(0);
}
