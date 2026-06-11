import fs from 'fs';
import path from 'path';
import { Project, SyntaxKind, ObjectLiteralExpression, PropertyAssignment } from 'ts-morph';

const RECOMMENDATIONS_PATH = path.join(__dirname, 'seo-recommendations.json');
const BLOG_DATA_DIR = path.join(__dirname, '../lib/data');

function setStringProp(obj: ObjectLiteralExpression, name: string, value: string) {
  const prop = obj.getProperty(name);
  const quotedVal = JSON.stringify(value);
  if (prop && prop.getKind() === SyntaxKind.PropertyAssignment) {
    (prop as PropertyAssignment).getInitializer()?.replaceWithText(quotedVal);
  } else {
    obj.addPropertyAssignment({ name, initializer: quotedVal });
  }
}

function setNumberProp(obj: ObjectLiteralExpression, name: string, value: number) {
  const prop = obj.getProperty(name);
  if (prop && prop.getKind() === SyntaxKind.PropertyAssignment) {
    (prop as PropertyAssignment).getInitializer()?.replaceWithText(String(value));
  } else {
    obj.addPropertyAssignment({ name, initializer: String(value) });
  }
}

function removeProp(obj: ObjectLiteralExpression, name: string) {
  const prop = obj.getProperty(name);
  if (prop) {
    prop.remove();
  }
}

async function run() {
  if (!fs.existsSync(RECOMMENDATIONS_PATH)) {
    console.error(`❌ Recommendations JSON not found at ${RECOMMENDATIONS_PATH}. Run find-ctr-opportunities.ts first.`);
    return;
  }

  const recommendations = JSON.parse(fs.readFileSync(RECOMMENDATIONS_PATH, 'utf8'));
  console.log(`Loaded ${recommendations.length} page recommendations for AST update.`);

  const project = new Project();
  const timestamp = new Date().toISOString();

  let updatedCount = 0;

  for (const rec of recommendations) {
    const filePath = path.join(BLOG_DATA_DIR, rec.tsFileRelative);
    if (!fs.existsSync(filePath)) {
      console.warn(`[WARN] File not found: ${filePath}`);
      continue;
    }

    console.log(`Processing file: ${filePath}`);
    const sourceFile = project.addSourceFileAtPath(filePath);
    
    // Find the 'post' variable declaration
    let postDecl = sourceFile.getVariableDeclaration('post');
    if (!postDecl) {
      const decls = sourceFile.getVariableDeclarations();
      postDecl = decls.find(d => {
        const typeStr = d.getType()?.getText() || '';
        const nameStr = d.getName();
        return typeStr.includes('BlogPost') || nameStr.toLowerCase().endsWith('post');
      });
    }

    if (!postDecl) {
      console.warn(`[WARN] Could not find BlogPost variable declaration in ${filePath}`);
      continue;
    }

    const objExpr = postDecl.getInitializerIfKind(SyntaxKind.ObjectLiteralExpression);
    if (!objExpr) {
      console.warn(`[WARN] Variable 'post' initializer is not an ObjectLiteralExpression in ${filePath}`);
      continue;
    }

    // Retrieve or create 'seo' property block
    const seoProp = objExpr.getProperty('seo');
    let seoObj: ObjectLiteralExpression;

    if (!seoProp) {
      const addedProp = objExpr.addPropertyAssignment({
        name: 'seo',
        initializer: '{}'
      });
      seoObj = addedProp.getInitializerIfKindOrThrow(SyntaxKind.ObjectLiteralExpression);
    } else {
      if (seoProp.getKind() === SyntaxKind.PropertyAssignment) {
        const init = (seoProp as PropertyAssignment).getInitializer();
        if (init && init.getKind() === SyntaxKind.ObjectLiteralExpression) {
          seoObj = init as ObjectLiteralExpression;
        } else {
          console.warn(`[WARN] 'seo' property is not an ObjectLiteralExpression in ${filePath}`);
          continue;
        }
      } else {
        console.warn(`[WARN] 'seo' property is not a PropertyAssignment in ${filePath}`);
        continue;
      }
    }

    // Set/update string properties
    setStringProp(seoObj, 'metaTitle', rec.suggestedTitle);
    setStringProp(seoObj, 'metaDescription', rec.suggestedDesc);
    setStringProp(seoObj, 'intent', rec.suggestedIntent);

    // Set/update version tracker properties
    setNumberProp(seoObj, 'seoVersion', 1);
    setStringProp(seoObj, 'seoUpdatedAt', timestamp);

    // Remove keywords to keep metadata clean and minimal (as per founder recommendation)
    removeProp(seoObj, 'keywords');

    updatedCount += 1;
  }

  // Save all modified files
  console.log('\nSaving modified source files...');
  await project.save();
  console.log(`🎉 AST batch updates complete! Successfully updated ${updatedCount} posts.`);
}

run().catch(console.error);
