const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'app/blog');
const dirs = fs.readdirSync(blogDir).filter(d => {
  const stat = fs.statSync(path.join(blogDir, d));
  return stat.isDirectory() && d !== '[slug]';
});

console.log(`Found ${dirs.length} hardcoded blog page directories.`);

// Read blogPosts.ts to get EEAT data for each slug
const bpContent = fs.readFileSync(path.join(__dirname, 'lib/data/blogPosts.ts'), 'utf8');

let injected = 0;
let skipped = 0;
let errors = [];

for (const dir of dirs) {
  const pagePath = path.join(blogDir, dir, 'page.tsx');
  if (!fs.existsSync(pagePath)) {
    console.log(`  SKIP: No page.tsx in ${dir}`);
    skipped++;
    continue;
  }

  let pageContent = fs.readFileSync(pagePath, 'utf8');

  // Check if already has EEAT components
  if (pageContent.includes('EEATBadge') || pageContent.includes('ShortAnswerBox') || pageContent.includes('GrantSuccessTable')) {
    console.log(`  SKIP: ${dir} already has EEAT components`);
    skipped++;
    continue;
  }

  // Find the slug's data in blogPosts.ts
  const slugIdx = bpContent.indexOf(`slug: "${dir}"`);
  if (slugIdx === -1) {
    console.log(`  WARN: ${dir} not found in blogPosts.ts`);
    errors.push(dir);
    continue;
  }

  // Extract the shortAnswer for this slug
  const postBlock = bpContent.substring(slugIdx, bpContent.indexOf('\n  {', slugIdx + 1) > 0 ? bpContent.indexOf('\n  {', slugIdx + 1) : bpContent.length);
  
  const shortAnswerMatch = postBlock.match(/shortAnswer:\s*"((?:[^"\\]|\\.)*)"/);
  const shortAnswer = shortAnswerMatch ? shortAnswerMatch[1] : null;
  
  const hasMetrics = postBlock.includes('metrics:');
  const hasExpertTip = postBlock.includes('expertTip:');
  const hasEligibleCheck = postBlock.includes('eligibleCheck:');

  // Strategy: Add imports at the top and inject components after the hero section
  // 1. Add imports
  const newImports = [
    `import { getBlogPostBySlug } from '@/lib/data/blogPosts'`,
    `import EEATBadge from '@/components/blog/EEATBadge'`,
    `import LastVerifiedBadge from '@/components/blog/LastVerifiedBadge'`,
    `import { GrantSuccessTable } from '@/components/blog/GrantSuccessTable'`,
    `import { ExpertTipBox } from '@/components/blog/ExpertTipBox'`,
    `import EligibleCheck from '@/components/blog/EligibleCheck'`,
    `import ShortAnswerBox from '@/components/blog/ShortAnswerBox'`,
    `import InlineCTA from '@/components/blog/InlineCTA'`,
    `import { DollarSign, Target, TrendingUp, Users, Award, Shield, CheckCircle as CheckCircleIcon2, Zap as ZapIcon2, MapPin, Gift, Rocket, FileText as FileTextIcon2, Percent, Flag } from 'lucide-react'`,
  ];

  // Add imports that don't already exist
  const importsToAdd = newImports.filter(imp => {
    const moduleName = imp.match(/from\s+['"](.+?)['"]/)?.[1];
    if (!moduleName) return true;
    return !pageContent.includes(moduleName);
  });

  if (importsToAdd.length > 0) {
    // Find the last import statement
    const lastImportIdx = pageContent.lastIndexOf('\nimport ');
    const endOfLastImport = pageContent.indexOf('\n', lastImportIdx + 1);
    pageContent = pageContent.substring(0, endOfLastImport + 1) + importsToAdd.join('\n') + '\n' + pageContent.substring(endOfLastImport + 1);
  }

  // 2. Add data fetching at the start of the component function  
  const dataFetchCode = `\n  // EEAT Data from blogPosts.ts\n  const postData = getBlogPostBySlug("${dir}");\n`;

  // Find the function body opening
  // Look for patterns like `export default function ...() {` or `export default async function ...() {`
  const funcMatch = pageContent.match(/export\s+default\s+(async\s+)?function\s+\w+\s*\([^)]*\)\s*\{/);
  if (funcMatch) {
    const funcEnd = pageContent.indexOf('{', pageContent.indexOf(funcMatch[0])) + 1;
    pageContent = pageContent.substring(0, funcEnd) + dataFetchCode + pageContent.substring(funcEnd);
  }

  // 3. Inject EEAT components after the hero section
  // Look for a closing </section> after the hero - typically the first </section>
  const heroEndPattern = /{\/\*\s*Hero\s*(?:Section)?\s*\*\/}[\s\S]*?<\/section>/i;
  const heroMatch = pageContent.match(heroEndPattern);
  
  const iconMap = `const iconMap: Record<string, any> = { DollarSign, Target, TrendingUp, Users, Award, Shield, CheckCircle: CheckCircleIcon2, Zap: ZapIcon2, MapPin, Gift, Rocket, FileText: FileTextIcon2, Percent, Flag };`;

  const eeatBlock = `
        {/* EEAT ENRICHMENT COMPONENTS */}
        {postData?.shortAnswer && (
          <section className="py-6 bg-emerald-50 dark:bg-emerald-950/20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto bg-white dark:bg-neutral-900 rounded-xl p-6 shadow-sm border border-emerald-200">
                <p className="text-gray-800 dark:text-gray-200 text-base leading-relaxed">
                  <span className="font-bold text-emerald-700">The Short Answer: </span>
                  {postData.shortAnswer}
                </p>
              </div>
            </div>
          </section>
        )}

        {postData?.eligibleCheck && (
          <section className="py-4">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <EligibleCheck />
              </div>
            </div>
          </section>
        )}

        {postData?.metrics && (
          <section className="py-6">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <GrantSuccessTable
                  title="Quick Funding Facts"
                  metrics={postData.metrics.map((m: any) => {
                    const IconComponent = (m.iconName && iconMap[m.iconName]) ? iconMap[m.iconName] : Target;
                    return { ...m, icon: <IconComponent className="w-6 h-6" /> };
                  })}
                />
              </div>
            </div>
          </section>
        )}

        {postData?.expertTip && (
          <section className="py-6">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <ExpertTipBox type={postData.expertTip.type} title={postData.expertTip.title}>
                  <div dangerouslySetInnerHTML={{ __html: postData.expertTip.content }} />
                </ExpertTipBox>
              </div>
            </div>
          </section>
        )}

        <section className="py-2">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <EEATBadge authorName="Ashwani K." authorImage="/author-ashwani.jpg" date={postData?.date || "2025-12-01"} />
            </div>
          </div>
        </section>
`;

  if (heroMatch) {
    const insertPos = pageContent.indexOf(heroMatch[0]) + heroMatch[0].length;
    pageContent = pageContent.substring(0, insertPos) + '\n' + eeatBlock + pageContent.substring(insertPos);
  } else {
    // Fallback: insert after the first </section>
    const firstSectionEnd = pageContent.indexOf('</section>');
    if (firstSectionEnd !== -1) {
      const insertPos = firstSectionEnd + '</section>'.length;
      pageContent = pageContent.substring(0, insertPos) + '\n' + eeatBlock + pageContent.substring(insertPos);
    } else {
      console.log(`  ERROR: Could not find insertion point in ${dir}`);
      errors.push(dir);
      continue;
    }
  }

  // Add iconMap declaration inside the function body (after data fetch)
  if (!pageContent.includes('iconMap')) {
    const dataFetchEnd = pageContent.indexOf('getBlogPostBySlug("' + dir + '")');
    if (dataFetchEnd !== -1) {
      const lineEnd = pageContent.indexOf('\n', dataFetchEnd);
      pageContent = pageContent.substring(0, lineEnd + 1) + '  ' + iconMap + '\n' + pageContent.substring(lineEnd + 1);
    }
  }

  fs.writeFileSync(pagePath, pageContent, 'utf8');
  injected++;
  console.log(`  ✅ Injected EEAT into: ${dir}`);
}

console.log(`\n=== SUMMARY ===`);
console.log(`Injected: ${injected}`);
console.log(`Skipped: ${skipped}`);
console.log(`Errors: ${errors.length}`);
if (errors.length > 0) console.log(`Error slugs: ${errors.join(', ')}`);
