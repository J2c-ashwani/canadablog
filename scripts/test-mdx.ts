import fs from 'fs';
const page = fs.readFileSync('app/blog/sba-loans-grants-guide/page.tsx', 'utf-8');
const hasComponents = page.match(/<([A-Z][a-zA-Z]+)[ \/]/g);
console.log('Custom Components Found:', [...new Set(hasComponents)]);
