import fs from 'fs';
import path from 'path';
import { Project, SyntaxKind, ObjectLiteralExpression, PropertyAssignment } from 'ts-morph';

const BLOG_DATA_DIR = path.join(__dirname, '../lib/data/blog-posts');

function scanBlogDirectory(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      scanBlogDirectory(filePath, fileList);
    } else if (file.endsWith('.ts')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

function cleanBaseTitle(title: string): string {
  let cleaned = title.split('|')[0].split(':')[0].split('(')[0].split('[')[0].trim();
  cleaned = cleaned.replace(/\s*(202\d\s*-\s*202\d|202\d)/g, '').replace(/\s+/g, ' ').trim();
  return cleaned;
}

function suggestTitle(title: string, maxGrant: string | null): string {
  const base = cleanBaseTitle(title);
  
  let suggestion = '';
  if (maxGrant) {
    suggestion = `${base} 2026: Get Up to ${maxGrant}`;
  } else {
    suggestion = `${base} 2026: Complete Guide`;
  }

  if (suggestion.length > 58) {
    if (maxGrant) {
      suggestion = `${base}: Get Up to ${maxGrant}`;
    } else {
      suggestion = `${base} 2026 Guide`;
    }
  }

  if (suggestion.length > 58) {
    suggestion = suggestion.substring(0, 55) + '...';
  }

  if (suggestion.length < 50) {
    if (maxGrant && !suggestion.includes(maxGrant)) {
      suggestion = `${suggestion} (Get Up to ${maxGrant})`;
    } else if (!suggestion.includes('2026')) {
      suggestion = `${suggestion} 2026 Guide`;
    } else {
      suggestion = `${suggestion} — Apply Now`;
    }
  }

  if (suggestion.length > 58) {
    suggestion = suggestion.substring(0, 58);
  }
  
  return suggestion;
}

function suggestDescription(title: string, maxGrant: string | null): string {
  const base = cleanBaseTitle(title);
  
  let suggestion = `Learn how to qualify and apply for ${base} in 2026. `;
  if (maxGrant) {
    suggestion += `Access up to ${maxGrant} in non-dilutive funding. `;
  } else {
    suggestion += `Access active government grants & loans. `;
  }
  suggestion += `See if you qualify.`;

  if (suggestion.length > 150) {
    suggestion = `Guide to ${base} in 2026. Learn eligibility rules, requirements, and application steps. See if you qualify to apply.`;
  }
  
  if (suggestion.length < 120) {
    suggestion = `Our comprehensive 2026 guide to ${base}. Discover eligibility requirements, funding limits, and professional application steps to win. See if you qualify.`;
  }

  if (suggestion.length > 150) {
    suggestion = suggestion.substring(0, 147) + '...';
  }
  
  return suggestion;
}

function suggestIntent(category: string, title: string): string {
  const text = `${category} ${title}`.toLowerCase();
  if (text.includes('sred') || text.includes('sr&ed') || text.includes('tax credit') || text.includes('tax credits')) {
    return 'r_and_d';
  }
  if (text.includes('export') || text.includes('canexport')) {
    return 'export';
  }
  if (text.includes('hiring') || text.includes('workforce') || text.includes('training') || text.includes('employment')) {
    return 'hiring';
  }
  if (text.includes('loan') || text.includes('loans') || text.includes('csbfp')) {
    return 'loan';
  }
  if (text.includes('women') || text.includes('female')) {
    return 'women';
  }
  if (text.includes('startup') || text.includes('startups') || text.includes('accelerator') || text.includes('accelerators')) {
    return 'startup';
  }
  if (text.includes('manufacturing') || text.includes('industry 4.0') || text.includes('industrial') || text.includes('factory')) {
    return 'manufacturing';
  }
  if (text.includes('enterprise') || text.includes('scale-up')) {
    return 'enterprise';
  }
  if (text.includes('innovation') || text.includes('supercluster') || text.includes('research') || text.includes('nserc')) {
    return 'innovation';
  }
  return 'grant';
}

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
  console.log('🔍 Scanning directory for pending posts...');
  const blogFiles = scanBlogDirectory(BLOG_DATA_DIR);
  const pendingFiles = blogFiles.filter(file => {
    const content = fs.readFileSync(file, 'utf8');
    return !content.includes('seoVersion:');
  });

  console.log(`📊 Found ${blogFiles.length} total files.`);
  console.log(`❌ Found ${pendingFiles.length} pending files that need optimization.\n`);

  if (pendingFiles.length === 0) {
    console.log('✅ All pages are already upgraded. Nothing to do!');
    return;
  }

  // Register ts-node on the fly to import modules
  require('ts-node').register({ transpileOnly: true });

  const project = new Project();
  const timestamp = new Date().toISOString().split('T')[0];
  let updatedCount = 0;

  for (const filePath of pendingFiles) {
    try {
      // 1. Resolve exported post content dynamically
      const module = require(filePath);
      const post = module.default || module.post;
      if (!post) {
        console.warn(`[WARN] No post object found in ${filePath}`);
        continue;
      }

      // 2. Identify max funding/grant if available in metrics
      let maxGrant: string | null = null;
      if (post.metrics && Array.isArray(post.metrics)) {
        const grantMetric = post.metrics.find((m: any) => 
          String(m.label).toLowerCase().includes('max grant') || 
          String(m.label).toLowerCase().includes('fund pool') ||
          String(m.label).toLowerCase().includes('max funding') ||
          String(m.label).toLowerCase().includes('total')
        );
        if (grantMetric) maxGrant = grantMetric.value;
      }

      // 3. Formulate optimization recommendations
      const title = post.title || '';
      const category = post.category || '';
      const suggestedTitle = suggestTitle(title, maxGrant);
      const suggestedDesc = suggestDescription(title, maxGrant);
      const suggestedIntent = suggestIntent(category, title);

      // 4. Update the TS file content AST
      console.log(`Optimizing: [${title}] (${path.basename(filePath)})`);
      const sourceFile = project.addSourceFileAtPath(filePath);
      
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
        console.warn(`[WARN] Could not find post declaration in ${filePath}`);
        continue;
      }

      const objExpr = postDecl.getInitializerIfKind(SyntaxKind.ObjectLiteralExpression);
      if (!objExpr) {
        console.warn(`[WARN] Variable 'post' initializer is not an ObjectLiteralExpression in ${filePath}`);
        continue;
      }

      // Find or create 'seo' block
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

      // Write properties
      setStringProp(seoObj, 'metaTitle', suggestedTitle);
      setStringProp(seoObj, 'metaDescription', suggestedDesc);
      setStringProp(seoObj, 'intent', suggestedIntent);
      setNumberProp(seoObj, 'seoVersion', 1);
      setStringProp(seoObj, 'seoUpdatedAt', timestamp);
      
      // Clean up keywords as per guidelines
      removeProp(seoObj, 'keywords');

      updatedCount += 1;
    } catch (e: any) {
      console.error(`❌ Failed to process ${filePath}: ${e.message}`);
    }
  }

  if (updatedCount > 0) {
    console.log('\nSaving modified source files to disk...');
    await project.save();
    console.log(`\n🎉 WAVE 3 OPTIMIZATION COMPLETE!`);
    console.log(`Successfully upgraded ${updatedCount} / ${pendingFiles.length} pending files.`);
  } else {
    console.log('\nNo files were modified.');
  }
}

run().catch(console.error);
