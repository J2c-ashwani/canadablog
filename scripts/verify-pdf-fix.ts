import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const AUDIT_DIR = '/Users/ashwanikumar/.gemini/antigravity/brain/dd58ef7c-cf4c-4b2b-91fc-3c965c5211ad/visual-audit';

async function main() {
  const browser = await chromium.launch({ headless: true });
  
  const customers = [
    { name: 'Chintan_Kakani', pdfPath: '/Users/ashwanikumar/Downloads/canadablog/scratch/audit-pdfs/Chintan_Kakani_ON_Tech_19.pdf' },
    { name: 'Pooja_Kaushal', pdfPath: '/Users/ashwanikumar/Downloads/canadablog/scratch/audit-pdfs/Pooja_Kaushal_SutraKatha_49.pdf' },
    { name: 'Jessica_Gould', pdfPath: '/Users/ashwanikumar/Downloads/canadablog/scratch/audit-pdfs/Jessica_Gould_PEI_19.pdf' },
  ];

  for (const customer of customers) {
    const imgDir = path.join(AUDIT_DIR, 'pdf-pages-fixed', customer.name);
    fs.mkdirSync(imgDir, { recursive: true });

    const pdfBuffer = fs.readFileSync(customer.pdfPath);
    const base64 = pdfBuffer.toString('base64');

    const context = await browser.newContext({ viewport: { width: 850, height: 1100 } });
    const page = await context.newPage();

    const htmlContent = `<!DOCTYPE html><html><head>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.min.mjs" type="module"></script>
      <style>body{margin:0;padding:0;background:white}canvas{display:block;margin:0 auto}</style>
    </head><body><canvas id="pdfCanvas"></canvas>
    <script type="module">
      import * as pdfjsLib from 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.min.mjs';
      pdfjsLib.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.min.mjs';
      window.renderPage=async function(pageNum){
        const d=atob('${base64}');const u=new Uint8Array(d.length);
        for(let i=0;i<d.length;i++)u[i]=d.charCodeAt(i);
        const pdf=await pdfjsLib.getDocument({data:u}).promise;
        window.totalPages=pdf.numPages;
        const p=await pdf.getPage(pageNum);const scale=2.0;
        const vp=p.getViewport({scale});const canvas=document.getElementById('pdfCanvas');
        canvas.width=vp.width;canvas.height=vp.height;
        const ctx=canvas.getContext('2d');ctx.fillStyle='white';
        ctx.fillRect(0,0,vp.width,vp.height);
        await p.render({canvasContext:ctx,viewport:vp}).promise;
        return pdf.numPages;
      };
    </script></body></html>`;

    try {
      await page.setContent(htmlContent, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(2000);
      const totalPages = await page.evaluate(() => (window as any).renderPage(1));
      
      // Only render page 1 for quick verification
      await page.evaluate(() => (window as any).renderPage(1));
      await page.waitForTimeout(1000);
      const canvas = await page.$('#pdfCanvas');
      if (canvas) {
        await canvas.screenshot({ path: path.join(imgDir, 'page_1_fixed.png') });
        console.log(`✅ ${customer.name} — Page 1 FIXED → page_1_fixed.png`);
      }
    } catch (err) {
      console.error(`❌ ${customer.name}: ${(err as Error).message}`);
    }
    await context.close();
  }
  await browser.close();
}

main().catch(console.error);
