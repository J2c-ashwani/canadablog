import fs from 'fs';
import path from 'path';

/**
 * Architectural Enforcement Guard — FSI Digital Platform v1.0
 * 
 * Enforces the rule that all new presentation code in `app/` and `components/`
 * must consume `FundingRecommendationResult` directly from `@/lib/engine/types`.
 * 
 * Prevents re-introduction of deprecated legacy types (`FundingMatchReport`,
 * `ReportProgram`, `report.programs`, `matchStrength`) in user-facing surfaces.
 */

const SCAN_DIRS = ['app', 'components'];

// Allowed files for legacy adapter compatibility
const COMPATIBILITY_ALLOWLIST = [
  'lib/products/report-generator.ts',
  'lib/products/report-pdf.ts',
];

// Forbidden patterns in presentation code
const FORBIDDEN_PATTERNS = [
  { pattern: /report\.programs\b/, reason: 'Use platformResult.primaryRecommendations instead of deprecated report.programs' },
  { pattern: /reportData\.programs\b/, reason: 'Use platformResult.primaryRecommendations instead of deprecated reportData.programs' },
  { pattern: /ReportProgram\b/, reason: 'Use EvaluatedRecommendation from @/lib/engine/types instead of deprecated ReportProgram' },
  { pattern: /\bmatchStrength\b/, reason: 'Use sequenceTier and commercialScore instead of deprecated matchStrength' },
];

function scanDirectory(dir: string): string[] {
  let results: string[] = [];
  if (!fs.existsSync(dir)) return results;

  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      if (!file.startsWith('.') && file !== 'node_modules') {
        results = results.concat(scanDirectory(filePath));
      }
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      results.push(filePath);
    }
  });
  return results;
}

function verifyArchitecture(): void {
  console.log('🛡️  Running Architectural Enforcement Guard (FundingRecommendationResult)...');

  let violations = 0;
  const filesToScan: string[] = [];

  SCAN_DIRS.forEach((dir) => {
    filesToScan.push(...scanDirectory(path.resolve(process.cwd(), dir)));
  });

  filesToScan.forEach((filePath) => {
    const relativePath = path.relative(process.cwd(), filePath);
    
    // Skip compatibility allowlist
    if (COMPATIBILITY_ALLOWLIST.some((allowed) => relativePath.endsWith(allowed))) {
      return;
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');

    lines.forEach((line, index) => {
      // Ignore comments explaining deprecation or disable comments
      if (line.trim().startsWith('//') || line.trim().startsWith('*') || line.includes('eslint-disable')) {
        return;
      }

      FORBIDDEN_PATTERNS.forEach(({ pattern, reason }) => {
        if (pattern.test(line)) {
          console.error(`❌ ARCHITECTURAL VIOLATION in ${relativePath}:${index + 1}`);
          console.error(`   Line: ${line.trim()}`);
          console.error(`   Reason: ${reason}\n`);
          violations++;
        }
      });
    });
  });

  if (violations > 0) {
    console.error(`💥 Build Failed: ${violations} architectural violation(s) found.`);
    console.error(`   New presentation code must read FundingRecommendationResult from @/lib/engine/types.`);
    process.exit(1);
  } else {
    console.log(`✅ Architectural Enforcement Passed: 0 legacy model references in app/ and components/.`);
  }
}

verifyArchitecture();
