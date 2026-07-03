import fs from 'fs';
import path from 'path';

console.log('🔍 Running Pre-Deployment Commercial Revenue Integrity Verification...');

const REQUIRED_FILES = [
  'FSI-Grant-Budget-Builder.xlsx',
  'FSI-Cash-Flow-Forecast.xlsx',
  'FSI-Hiring-Plan-Template.docx',
  'FSI-Project-Proposal-Framework.docx',
  'FSI-Readiness-Preflight-Checklist.pdf',
  'FSI-Application-Tracking-Sheet.xlsx',
  'FSI-Funding-Approval-Guide.pdf',
];

const TEMPLATE_DIR = path.join(process.cwd(), 'public/templates');
let pass = true;

// 1. Verify public/templates folder exists
if (!fs.existsSync(TEMPLATE_DIR)) {
  console.error('❌ FAIL: public/templates folder does not exist!');
  pass = false;
} else {
  console.log('✅ PASS: public/templates folder exists.');
  
  // 2. Verify all files exist and have non-zero size
  REQUIRED_FILES.forEach(file => {
    const filePath = path.join(TEMPLATE_DIR, file);
    if (!fs.existsSync(filePath)) {
      console.error(`❌ FAIL: Missing template file: ${file}`);
      pass = false;
    } else {
      const stat = fs.statSync(filePath);
      if (stat.size === 0) {
        console.error(`❌ FAIL: Template file ${file} is empty (0 bytes)!`);
        pass = false;
      } else {
        console.log(`✅ PASS: Verified ${file} (${stat.size} bytes).`);
      }
    }
  });
}

// 3. Verify footer has the new links
const footerPath = path.join(process.cwd(), 'components/Footer.tsx');
if (!fs.existsSync(footerPath)) {
  console.error('❌ FAIL: Footer.tsx not found!');
  pass = false;
} else {
  const footerContent = fs.readFileSync(footerPath, 'utf8');
  const expectedLinks = [
    '/products/funding-match-report',
    '/products/action-plan',
    '/products/toolkit',
    '/products/approval-library',
    '/membership',
  ];
  
  expectedLinks.forEach(link => {
    if (!footerContent.includes(link)) {
      console.error(`❌ FAIL: Footer.tsx is missing link: ${link}`);
      pass = false;
    } else {
      console.log(`✅ PASS: Verified footer link for ${link}`);
    }
  });
}

if (!pass) {
  console.error('\n🚨 VERIFICATION FAILED: Fix the blockers before building/deploying!');
  process.exit(1);
} else {
  console.log('\n🌟 VERIFICATION SUCCESSFUL: All revenue integrity assets are in place!');
  process.exit(0);
}
