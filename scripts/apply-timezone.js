const fs = require('fs');

function setTimezoneJS(filepath) {
  if (!fs.existsSync(filepath)) return;
  let content = fs.readFileSync(filepath, 'utf8');
  if (!content.includes('process.env.TZ')) {
    content = "process.env.TZ = 'America/Toronto';\n" + content;
    fs.writeFileSync(filepath, content);
    console.log('Targeted JS:', filepath);
  }
}

function setTimezoneJSON(filepath) {
  if (!fs.existsSync(filepath)) return;
  let data = JSON.parse(fs.readFileSync(filepath, 'utf8'));
  if (!data.settings) data.settings = {};
  data.settings.timezone = 'America/Toronto';
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
  console.log('Targeted JSON:', filepath);
}

['scripts/generate-newsletter.js', 'scripts/distribution/n8n-trigger.js', 'scripts/sales/buyer-scraper.js', 'scripts/distribution/video-api.js'].forEach(setTimezoneJS);
['scripts/distribution/n8n-workflow-import.json', 'scripts/sales/n8n-ai-sales-agent.json', 'scripts/distribution/n8n-newsletter-workflow.json'].forEach(setTimezoneJSON);
