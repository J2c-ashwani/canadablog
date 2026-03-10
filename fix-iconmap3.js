const fs = require('fs');
const path = require('path');

// The complete set of icons that the iconMap needs
// We'll use simple names (no aliases) - just remap CheckCircle->CheckCircle, Zap->Zap, FileText->FileText
const REQUIRED_ICONS = ['DollarSign', 'Target', 'TrendingUp', 'Users', 'Award', 'Shield', 'CheckCircle', 'Zap', 'MapPin', 'Gift', 'Rocket', 'FileText', 'Percent', 'Flag'];

// Updated iconMap that doesn't use aliases - safe for all files
const CLEAN_ICONMAP = `  const iconMap: Record<string, any> = { DollarSign, Target, TrendingUp, Users, Award, Shield, CheckCircle, Zap, MapPin, Gift, Rocket, FileText, Percent, Flag };`;

const blogDir = path.join(__dirname, 'app/blog');
const dirs = fs.readdirSync(blogDir).filter(d => {
    const stat = fs.statSync(path.join(blogDir, d));
    return stat.isDirectory() && d !== '[slug]';
});

let fixed = 0;
let skipped = 0;

for (const dir of dirs) {
    const pagePath = path.join(blogDir, dir, 'page.tsx');
    if (!fs.existsSync(pagePath)) {
        skipped++;
        continue;
    }

    let content = fs.readFileSync(pagePath, 'utf8');

    // Only process files that use iconMap
    if (!content.includes('iconMap[')) {
        skipped++;
        continue;
    }

    // Step 1: Clean up any broken alias imports we added from previous scripts
    // Remove any line that imports aliases like "CheckCircle as CheckCircleIcon2" etc.
    const lines = content.split('\n');
    const cleanLines = lines.filter(line => {
        if (line.includes('from \'lucide-react\'') &&
            (line.includes('CheckCircle as CheckCircleIcon2') ||
                line.includes('Zap as ZapIcon2') ||
                line.includes('FileText as FileTextIcon2'))) {
            // Check if there are other non-aliased icons in this import
            const iconsInImport = line.match(/\{([^}]+)\}/)?.[1] || '';
            const parts = iconsInImport.split(',').map(s => s.trim());
            const nonAlias = parts.filter(p => !p.includes(' as CheckCircleIcon2') && !p.includes(' as ZapIcon2') && !p.includes(' as FileTextIcon2'));
            if (nonAlias.length === 0) return false; // Remove entire line
        }
        return true;
    });
    content = cleanLines.join('\n');

    // Step 2: Fix the iconMap declaration to not use aliases
    const oldIconMapRegex = /\s*const iconMap: Record<string, any> = \{[^}]+\};/;
    if (oldIconMapRegex.test(content)) {
        content = content.replace(oldIconMapRegex, '\n' + CLEAN_ICONMAP);
    }

    // Step 3: Ensure all required icons are imported from lucide-react
    const missingIcons = REQUIRED_ICONS.filter(icon => {
        // Check if this icon is imported (as bare name or as alias)
        const importedDirectly = new RegExp(`[{,]\\s*${icon}\\s*[},]`).test(content);
        const importedAsAlias = new RegExp(`${icon}\\s+as\\s+`).test(content); // icon is source in alias
        return !importedDirectly && !importedAsAlias;
    });

    if (missingIcons.length > 0) {
        // Add missing icons to the lucide-react import if one exists, or create a new import
        const lucideImportRegex = /import\s*\{([^}]+)\}\s*from\s*['"]lucide-react['"]/;
        const match = content.match(lucideImportRegex);

        if (match) {
            // Add missing icons to existing import
            const existingIcons = match[1];
            const newIcons = existingIcons.trim() + ', ' + missingIcons.join(', ');
            content = content.replace(lucideImportRegex, `import { ${newIcons} } from 'lucide-react'`);
        } else {
            // Add new import at the top (after existing imports)
            const lastImportIdx = content.lastIndexOf('\nimport ');
            const endOfLastImport = content.indexOf('\n', lastImportIdx + 1);
            const newImport = `import { ${missingIcons.join(', ')} } from 'lucide-react'`;
            content = content.substring(0, endOfLastImport + 1) + newImport + '\n' + content.substring(endOfLastImport + 1);
        }
    }

    fs.writeFileSync(pagePath, content, 'utf8');
    fixed++;
    console.log(`  ✅ Fixed: ${dir} (missing: ${missingIcons.length > 0 ? missingIcons.join(', ') : 'none, just iconMap'})`);
}

console.log('\n=== SUMMARY ===');
console.log('Fixed:', fixed);
console.log('Skipped:', skipped);
