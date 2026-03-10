const fs = require('fs');
const path = require('path');

// The safest approach: replace iconMap in ALL pages that use it,
// using only icons that are almost universally imported.
// For icons that might not be present, we map them to Target which is always added.

const SAFE_ICONMAP = `  const iconMap: Record<string, any> = { DollarSign, Target, TrendingUp, Users, Award, Shield, CheckCircle, Zap, MapPin, Rocket, FileText, Percent: Target, Flag: Target, Gift: Target };`;
// Note: Percent, Flag, Gift are mapped to Target as a fallback since they're not common

const SAFE_ICONS = ['DollarSign', 'Target', 'TrendingUp', 'Users', 'Award', 'Shield', 'CheckCircle', 'Zap', 'MapPin', 'Rocket', 'FileText'];

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

    // Step 1: Replace iconMap declaration with safe version
    const oldIconMapRegex = /\n  const iconMap: Record<string, any> = \{[^}]+\};/;
    if (oldIconMapRegex.test(content)) {
        content = content.replace(oldIconMapRegex, '\n' + SAFE_ICONMAP);
    }

    // Step 2: Ensure all icons referenced in iconMap are actually imported
    // Parse all lucide imports in the file
    const lucideImportRegex = /import\s*\{([^}]+)\}\s*from\s*['"]lucide-react['"]/g;
    let allImportedIcons = new Set();
    let match;
    while ((match = lucideImportRegex.exec(content)) !== null) {
        match[1].split(',').forEach(icon => {
            const trimmed = icon.trim().split(/\s+as\s+/)[0].trim(); // get the actual icon name (before alias)
            if (trimmed) allImportedIcons.add(trimmed);
        });
    }

    // Find which SAFE_ICONS are missing
    const missingIcons = SAFE_ICONS.filter(icon => !allImportedIcons.has(icon));

    if (missingIcons.length > 0) {
        // Try to add to an existing lucide import
        const firstLucideImport = content.match(/import\s*\{([^}]+)\}\s*from\s*['"]lucide-react['"]/);
        if (firstLucideImport) {
            const newIcons = firstLucideImport[1].trim() + ', ' + missingIcons.join(', ');
            content = content.replace(firstLucideImport[0], `import { ${newIcons} } from 'lucide-react'`);
        } else {
            // Add new import
            const lastImportIdx = content.lastIndexOf('\nimport ');
            const endOfLastImport = content.indexOf('\n', lastImportIdx + 1);
            const newImport = `import { ${missingIcons.join(', ')} } from 'lucide-react'`;
            content = content.substring(0, endOfLastImport + 1) + newImport + '\n' + content.substring(endOfLastImport + 1);
        }
    }

    // Step 3: Remove any broken alias-only import lines that might have been added before
    const lines = content.split('\n');
    const cleanLines = lines.filter(line => {
        // Remove import lines that ONLY contain aliased icons (CheckCircle as CheckCircleIcon2, etc)
        if (line.includes('from \'lucide-react\'') || line.includes('from "lucide-react"')) {
            if (line.includes('CheckCircleIcon2') || line.includes('ZapIcon2') || line.includes('FileTextIcon2')) {
                // Check if all entries are aliases we added
                const iconsMatch = line.match(/\{([^}]+)\}/);
                if (iconsMatch) {
                    const parts = iconsMatch[1].split(',').map(s => s.trim());
                    const onlyAliases = parts.every(p =>
                        p.includes(' as CheckCircleIcon2') ||
                        p.includes(' as ZapIcon2') ||
                        p.includes(' as FileTextIcon2')
                    );
                    if (onlyAliases) return false;
                }
            }
        }
        return true;
    });
    content = cleanLines.join('\n');

    fs.writeFileSync(pagePath, content, 'utf8');
    fixed++;
    if (missingIcons.length > 0) {
        console.log(`  ✅ Fixed: ${dir} (added: ${missingIcons.join(', ')})`);
    } else {
        console.log(`  ✅ Fixed iconMap: ${dir}`);
    }
}

console.log('\n=== SUMMARY ===');
console.log('Fixed:', fixed);
console.log('Skipped:', skipped);
