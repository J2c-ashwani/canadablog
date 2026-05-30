#!/usr/env node
/**
 * 📄 LinkedIn Carousel PDF Generator
 * 
 * Uses Puppeteer to turn beautifully designed HTML carousel templates
 * into native high-resolution PDF documents for LinkedIn Company Page uploads.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

async function generatePDF(htmlFilePath, outputPdfPath) {
    let puppeteer;
    try {
        puppeteer = require('puppeteer');
    } catch {
        console.log('📦 Installing puppeteer...');
        execSync('npm install puppeteer', { cwd: path.join(__dirname, '../..'), stdio: 'inherit' });
        puppeteer = require('puppeteer');
    }

    console.log(`\n📄 Starting PDF generation for: ${path.basename(htmlFilePath)}`);

    const browser = await puppeteer.launch({ 
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox'] 
    });
    
    const page = await browser.newPage();
    
    // Convert to absolute local file URI
    const fileUrl = `file://${path.resolve(htmlFilePath)}`;
    
    console.log('   ⏳ Loading HTML into headless browser...');
    await page.goto(fileUrl, { waitUntil: 'networkidle0' });

    console.log('   🖨️  Printing to PDF (1080x1350 format)...');
    
    // LinkedIn Carousel Dimensions (1080x1350 is the optimal 4:5 portrait size)
    await page.pdf({
        path: outputPdfPath,
        width: '1080px',
        height: '1350px',
        printBackground: true,   // Crucial for colors/images to show
        pageRanges: '',          // All pages
        margin: { top: 0, right: 0, bottom: 0, left: 0 }
    });

    await browser.close();
    console.log(`   ✅ Success! PDF saved to: ${outputPdfPath}\n`);
    
    return outputPdfPath;
}

// Allow running directly from command line
if (require.main === module) {
    const args = process.argv.slice(2);
    if (!args[0]) {
        console.error('Usage: node generate-pdf.js <path_to_html_file> [output_pdf_path]');
        process.exit(1);
    }
    
    const inputHtml = path.resolve(args[0]);
    if (!fs.existsSync(inputHtml)) {
        console.error(`❌ Error: Could not find input file: ${inputHtml}`);
        process.exit(1);
    }

    let outPdf = args[1];
    if (!outPdf) {
        // Output to out/pdfs/
        const rootDir = path.join(__dirname, '../../out/pdfs');
        fs.mkdirSync(rootDir, { recursive: true });
        
        const baseName = path.parse(inputHtml).name;
        const timestamp = new Date().toISOString().split('T')[0];
        outPdf = path.join(rootDir, `${timestamp}-${baseName}.pdf`);
    }

    generatePDF(inputHtml, outPdf).catch(console.error);
}

module.exports = { generatePDF };
