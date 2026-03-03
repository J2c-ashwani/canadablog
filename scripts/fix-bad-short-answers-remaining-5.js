const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'lib/data/blogPosts.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// Target 1: atlantic-canada-business-grants
content = content.replace(
  /shortAnswer:\s*"Complete guide to Atlantic Canada business grants\. Funding amounts average various funding amounts for eligible applicants\."/g,
  'shortAnswer: "Atlantic Canadian businesses have access to specialized federal funding through ACOA. Programs support export expansion, hiring, and community economic development across the four eastern provinces."'
);

// Target 2: canada-advanced-manufacturing-innovation-grants (Line 853 artifact)
content = content.replace(
  /shortAnswer:\s*"Advanced manufacturers can access Advanced manufacturers can access Complete guide to Canadian advanced manufacturing innovation grants\. Funding amounts average various funding amounts for eligible applicants\.\.1B\+ in scale-up capital\. NGen and the Strategic Innovation Fund provide heavy subsidies for adopting Industry 4\.0, robotics, and automation technologies\.\.1B\+ in scale-up capital\. NGen and the Strategic Innovation Fund provide heavy subsidies for adopting Industry 4\.0, robotics, and automation technologies\."/g,
  'shortAnswer: "Advanced manufacturers can access $3.1B+ in scale-up capital. NGen and the Strategic Innovation Fund provide heavy subsidies for adopting Industry 4.0, robotics, and automation technologies."'
);

// Target 3: canada-manufacturing-industry-grants-guide (Line 1564 artifact)
content = content.replace(
  /shortAnswer:\s*"Manufacturers can tap into Manufacturers can tap into Manufacturers can tap into Yes — Complete guide to Canada\. Funding amounts average various funding amounts for eligible applicants\. Our article covers the application process and specific eligibility requirements\.\.1B\+ for facility upgrades and Industry 4\.0 adoption\. NGen and regional programs offer millions in non-repayable funding for automation and advanced manufacturing tech\.\.1B\+ for facility upgrades and Industry 4\.0 adoption\. NGen and regional programs offer millions in non-repayable funding for automation and advanced manufacturing tech\.\.1B\+ for facility upgrades and Industry 4\.0 adoption\. NGen and regional programs offer millions in non-repayable funding for automation and advanced manufacturing tech\."/g,
  'shortAnswer: "Manufacturers can tap into $3.1B+ for facility upgrades and Industry 4.0 adoption. NGen and regional programs offer millions in non-repayable funding for automation and advanced manufacturing tech."'
);

fs.writeFileSync(filePath, content);
console.log("✅ Replaced the 3 lingering edge cases!");
