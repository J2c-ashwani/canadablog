const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'app/blog');
const dirs = fs.readdirSync(blogDir).filter(d => {
    const stat = fs.statSync(path.join(blogDir, d));
    return stat.isDirectory() && d !== '[slug]';
});

// Need to import lucide icons for the iconMap
const lucideImport = `import { DollarSign, Target, TrendingUp, Users, Award, Shield, CheckCircle as CheckCircleIcon2, Zap as ZapIcon2, MapPin, Gift, Rocket, FileText as FileTextIcon2, Percent, Flag } from 'lucide-react'`;

// The iconMap const declaration to inject inside the function
const iconMapDecl = `  const iconMap: Record<string, any> = { DollarSign, Target, TrendingUp, Users, Award, Shield, CheckCircle: CheckCircleIcon2, Zap: ZapIcon2, MapPin, Gift, Rocket, FileText: FileTextIcon2, Percent, Flag };`;

let fixed = 0;
let skipped = 0;

for (const dir of dirs) {
    const pagePath = path.join(blogDir, dir, 'page.tsx');
    if (!fs.existsSync(pagePath)) {
        skipped++;
        continue;
    }

    let content = fs.readFileSync(pagePath, 'utf8');

    // Only fix pages that reference iconMap but don't define it
    const hasIconMapRef = content.includes('iconMap[');
    const hasIconMapDecl = content.includes('const iconMap');

    if (!hasIconMapRef) {
        skipped++;
        continue;
    }

    if (hasIconMapDecl) {
        // Verify the iconMap declaration already has the needed icons
        skipped++;
        continue;
    }

    // Need to add iconMap declaration
    // Insert after postData = getBlogPostBySlug(...)
    const postDataLine = content.indexOf(`getBlogPostBySlug("${dir}")`);
    if (postDataLine === -1) {
        console.log(`  WARN: No postData line in ${dir}`);
        skipped++;
        continue;
    }

    const lineEnd = content.indexOf('\n', postDataLine);
    content = content.substring(0, lineEnd + 1) + iconMapDecl + '\n' + content.substring(lineEnd + 1);

    // Also add lucide imports if these icons aren't already imported
    const needsLucideIcons = !content.includes('DollarSign') || !content.includes('CheckCircleIcon2') || !content.includes('ZapIcon2');
    if (needsLucideIcons) {
        // Filter only what's missing
        const iconsNeeded = [];
        if (!content.includes('DollarSign')) iconsNeeded.push('DollarSign');
        if (!content.includes('Target')) iconsNeeded.push('Target');
        if (!content.includes('TrendingUp')) iconsNeeded.push('TrendingUp');
        if (!content.includes('Users')) iconsNeeded.push('Users');
        if (!content.includes('Award')) iconsNeeded.push('Award');
        if (!content.includes('Shield')) iconsNeeded.push('Shield');
        if (!content.includes('MapPin')) iconsNeeded.push('MapPin');
        if (!content.includes('Gift')) iconsNeeded.push('Gift');
        if (!content.includes('Rocket')) iconsNeeded.push('Rocket');
        if (!content.includes('Percent')) iconsNeeded.push('Percent');
        if (!content.includes('Flag')) iconsNeeded.push('Flag');

        const aliasNeeded = [];
        // Check if CheckCircle is imported but not as CheckCircleIcon2
        if (!content.includes('CheckCircleIcon2')) aliasNeeded.push('CheckCircle as CheckCircleIcon2');
        // Check if Zap is imported but not as ZapIcon2
        if (!content.includes('ZapIcon2')) aliasNeeded.push('Zap as ZapIcon2');
        // FileText
        if (!content.includes('FileTextIcon2')) aliasNeeded.push('FileText as FileTextIcon2');

        const allIcons = [...iconsNeeded, ...aliasNeeded];
        if (allIcons.length > 0) {
            const addImport = `import { ${allIcons.join(', ')} } from 'lucide-react'`;
            // Find last import
            const lastImportIdx = content.lastIndexOf('\nimport ');
            const endOfLastImport = content.indexOf('\n', lastImportIdx + 1);
            content = content.substring(0, endOfLastImport + 1) + addImport + '\n' + content.substring(endOfLastImport + 1);
        }
    }

    fs.writeFileSync(pagePath, content, 'utf8');
    fixed++;
    console.log(`  ✅ Fixed iconMap in: ${dir}`);
}

console.log(`\n=== SUMMARY ===`);
console.log(`Fixed: ${fixed}`);
console.log(`Skipped: ${skipped}`);
