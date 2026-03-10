const fs = require('fs');
const path = require('path');

// Instead of aliased imports, use whatever is already imported in the file.
// Strategy: if a file already imports CheckCircle (not CheckCircleIcon2), Zap, FileText
// then iconMap should reference those directly.

const blogDir = path.join(__dirname, 'app/blog');
const dirs = fs.readdirSync(blogDir).filter(d => {
    const stat = fs.statSync(path.join(blogDir, d));
    return stat.isDirectory() && d !== '[slug]';
});

let fixed = 0;
let skipped = 0;
let errors = [];

for (const dir of dirs) {
    const pagePath = path.join(blogDir, dir, 'page.tsx');
    if (!fs.existsSync(pagePath)) {
        skipped++;
        continue;
    }

    let content = fs.readFileSync(pagePath, 'utf8');

    // Only process files with iconMap issues
    if (!content.includes('iconMap[')) {
        skipped++;
        continue;
    }

    // Fix: Remove any broken alias imports we added (CheckCircle as CheckCircleIcon2, etc.)
    // These were being added even when the file already imported CheckCircle
    const badImportPattern = /import\s*\{([^}]*(?:CheckCircle as CheckCircleIcon2|Zap as ZapIcon2|FileText as FileTextIcon2)[^}]*)\}\s*from\s*['"]lucide-react['"];?\n/g;
    content = content.replace(badImportPattern, (match, icons) => {
        // Remove only the alias parts, keep plain icon names if any others are in the list
        const iconList = icons.split(',').map(i => i.trim()).filter(i => {
            return !i.includes('CheckCircleIcon2') && !i.includes('ZapIcon2') && !i.includes('FileTextIcon2');
        });
        if (iconList.length === 0) return ''; // Remove entire import line if all were aliases
        return `import { ${iconList.join(', ')} } from 'lucide-react';\n`;
    });

    // Now fix iconMap declaration to use the actual names available in the file
    // Determine what's actually imported/available:
    const hasCheckCircleIcon2 = content.includes('CheckCircleIcon2');
    const hasZapIcon2 = content.includes('ZapIcon2');
    const hasFileTextIcon2 = content.includes('FileTextIcon2');
    const hasCheckCircle = content.includes('CheckCircle') && !content.includes('CheckCircle as');
    const hasZap = content.includes('Zap') && !content.includes('Zap as');
    const hasFileText = content.includes('FileText') && !content.includes('FileText as');

    // Build a clean iconMap using whatever mapping is available
    const checkCircleName = hasCheckCircleIcon2 ? 'CheckCircleIcon2' : (hasCheckCircle ? 'CheckCircle' : 'Target');
    const zapName = hasZapIcon2 ? 'ZapIcon2' : (hasZap ? 'Zap' : 'Target');
    const fileTextName = hasFileTextIcon2 ? 'FileTextIcon2' : (hasFileText ? 'FileText' : 'Target');

    const iconMapDecl = `  const iconMap: Record<string, any> = { DollarSign, Target, TrendingUp, Users, Award, Shield, CheckCircle: ${checkCircleName}, Zap: ${zapName}, MapPin, Gift, Rocket, FileText: ${fileTextName}, Percent, Flag };`;

    // Replace any existing broken iconMap declaration
    const existingIconMapRegex = /  const iconMap: Record<string, any> = \{[^}]+\};/;
    if (existingIconMapRegex.test(content)) {
        content = content.replace(existingIconMapRegex, iconMapDecl);
        fixed++;
        console.log(`  ✅ Updated iconMap in: ${dir}`);
    } else {
        // No iconMap yet, this shouldn't happen at this point but handle it
        console.log(`  WARN: No iconMap declaration found in ${dir}`);
        errors.push(dir);
    }

    fs.writeFileSync(pagePath, content, 'utf8');
}

console.log('\n=== SUMMARY ===');
console.log('Fixed:', fixed);
console.log('Skipped:', skipped);
console.log('Errors:', errors.length);
if (errors.length > 0) console.log('Error slugs:', errors.join(', '));
