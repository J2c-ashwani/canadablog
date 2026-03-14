const fs = require('fs');
const path = require('path');

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  let changedCount = 0;

  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      changedCount += processDirectory(fullPath);
    } else if (/\.(ts|tsx|js|jsx)$/i.test(fullPath)) {
      let originalContent = fs.readFileSync(fullPath, 'utf8');
      let content = originalContent;
      
      // Fix spaces after <: `< p class=` -> `<p class=`
      content = content.replace(/<\s+([a-zA-Z0-9]+)/g, '<$1');
      
      // Fix spaces in closing tags: `< / strong>` -> `</strong>`
      content = content.replace(/<\s*\/\s*([a-zA-Z0-9]+)\s*>/g, '</$1>');
      
      // Fix spaces before >: `class="..." >` -> `class="...">`
      content = content.replace(/\"\s+>/g, '">');
      
      // Fix weird spaces around self closing tags: `< br / >` -> `<br />`
      content = content.replace(/<\s*br\s*\/\s*>/g, '<br />');

      // Specifically handle `< p >` -> `<p>` and `< h2 >` -> `<h2>` without attributes
      content = content.replace(/<\s*([a-zA-Z0-9]+)\s*>/g, '<$1>');
      
      // Specifically handle closing `< / p >` -> `</p>` 
      content = content.replace(/<\/\s*([a-zA-Z0-9]+)\s*>/g, '</$1>');
      
      // Fix class="foo" > to class="foo"> without quotes at end of raw tags like </h2>
      content = content.replace(/([a-zA-Z0-9"'])\s+>/g, '$1>');

      if (content !== originalContent) {
          console.log(`Fixed HTML spacing in: ${file}`);
          fs.writeFileSync(fullPath, content, 'utf8');
          changedCount++;
      }
    }
  }
  return changedCount;
}

const targetDir = path.join(__dirname, 'lib', 'data', 'blog-posts');
console.log('Scanning for broken HTML tags in .ts, .tsx, .js, .jsx...');
const count = processDirectory(targetDir);
console.log(`Done. Fixed ${count} files.`);
