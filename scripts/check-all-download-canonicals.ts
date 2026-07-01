import fs from 'fs';
import path from 'path';
import { Project, SyntaxKind, ObjectLiteralExpression, PropertyAssignment } from 'ts-morph';

const DOWNLOADS_DIR = path.join(__dirname, '../app/download');

function getDownloadDirectories(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter(item => item.isDirectory())
    .map(item => path.join(dir, item.name));
}

async function run() {
  const dirs = getDownloadDirectories(DOWNLOADS_DIR);
  console.log(`📡 Scanning ${dirs.length} download guide directories...`);

  const project = new Project();
  let missingCanonicalCount = 0;
  let updatedCount = 0;

  for (const dirPath of dirs) {
    const pagePath = path.join(dirPath, 'page.tsx');
    if (!fs.existsSync(pagePath)) {
      continue;
    }

    const relativeFolder = path.basename(dirPath);
    const content = fs.readFileSync(pagePath, 'utf8');

    // Check if canonical is already defined
    if (content.includes('canonical:')) {
      continue;
    }

    missingCanonicalCount += 1;
    console.log(`⚠️ Missing canonical: /download/${relativeFolder} (${pagePath})`);

    try {
      const sourceFile = project.addSourceFileAtPath(pagePath);
      
      // Find the metadata declaration
      let metadataDecl = sourceFile.getVariableDeclaration('metadata');
      if (!metadataDecl) {
        // Try other names or direct exports
        const decls = sourceFile.getVariableDeclarations();
        metadataDecl = decls.find(d => d.getName() === 'metadata');
      }

      if (!metadataDecl) {
        console.warn(`  [WARN] Could not find metadata declaration in ${pagePath}`);
        continue;
      }

      const objExpr = metadataDecl.getInitializerIfKind(SyntaxKind.ObjectLiteralExpression);
      if (!objExpr) {
        console.warn(`  [WARN] Metadata is not an ObjectLiteralExpression in ${pagePath}`);
        continue;
      }

      // Check if alternates property exists
      const alternatesProp = objExpr.getProperty('alternates');
      let alternatesObj: ObjectLiteralExpression;

      const canonicalUrl = `https://www.fsidigital.ca/download/${relativeFolder}`;

      if (!alternatesProp) {
        const addedProp = objExpr.addPropertyAssignment({
          name: 'alternates',
          initializer: `{ canonical: ${JSON.stringify(canonicalUrl)} }`
        });
        updatedCount += 1;
      } else {
        if (alternatesProp.getKind() === SyntaxKind.PropertyAssignment) {
          const init = (alternatesProp as PropertyAssignment).getInitializer();
          if (init && init.getKind() === SyntaxKind.ObjectLiteralExpression) {
            alternatesObj = init as ObjectLiteralExpression;
            
            // Set or update canonical
            const canonicalProp = alternatesObj.getProperty('canonical');
            if (canonicalProp && canonicalProp.getKind() === SyntaxKind.PropertyAssignment) {
              (canonicalProp as PropertyAssignment).getInitializer()?.replaceWithText(JSON.stringify(canonicalUrl));
            } else {
              alternatesObj.addPropertyAssignment({
                name: 'canonical',
                initializer: JSON.stringify(canonicalUrl)
              });
            }
            updatedCount += 1;
          } else {
            console.warn(`  [WARN] 'alternates' is not an ObjectLiteralExpression in ${pagePath}`);
          }
        }
      }
    } catch (e: any) {
      console.error(`  ❌ Failed to process ${pagePath}: ${e.message}`);
    }
  }

  console.log(`\n📊 Scan complete:`);
  console.log(`  Total directories: ${dirs.length}`);
  console.log(`  Missing canonicals: ${missingCanonicalCount}`);

  if (updatedCount > 0) {
    console.log(`Saving ${updatedCount} modified page.tsx files to disk...`);
    await project.save();
    console.log('🎉 Successfully added/updated all download page canonical tags!');
  } else {
    console.log('✅ All download pages already have canonical tags configured.');
  }
}

run().catch(console.error);
