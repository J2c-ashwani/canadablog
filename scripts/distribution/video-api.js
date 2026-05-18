process.env.TZ = 'America/Toronto';
const express = require('express');
const { spawn, execSync } = require('child_process');
const path = require('path');

const app = express();
const PORT = 3001;
let publicBaseUrl = `http://host.docker.internal:${PORT}`;

// Serve the videos directory statically!
const OUTPUT_DIR = path.join(__dirname, '../../out/videos');
app.use('/videos', express.static(OUTPUT_DIR));

// Serve PDFs statically
const PDF_DIR = path.join(__dirname, '../../out/pdfs');
app.use('/pdfs', express.static(PDF_DIR));

// Expose the JSON workflow file for headless browser import
app.get('/workflow.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'n8n-workflow-import.json'));
});

// Automatically start a Cloudflare tunnel
function startTunnel() {
    console.log('[API] Starting public Cloudflare tunnel for Instagram...');
    // cloudflared outputs to stderr by design
    const cf = spawn('cloudflared', ['tunnel', '--url', `http://localhost:${PORT}`]);
    
    cf.stderr.on('data', (data) => {
        const output = data.toString();
        const match = output.match(/https:\/\/[a-zA-Z0-9-]+\.trycloudflare\.com/);
        if (match) {
            publicBaseUrl = match[0];
            console.log(`[API] 🌐 PUBLIC TUNNEL ONLINE: ${publicBaseUrl}`);
            console.log(`[API] Instagram can now download videos successfully!`);
        }
    });

    cf.on('close', () => {
        console.log('[API] Tunnel closed. Reconnecting...');
        setTimeout(startTunnel, 3000);
    });
}
startTunnel();

app.get('/generate-video', (req, res) => {
    try {
        console.log('[API] Received request from n8n to generate video...');
        
        // Execute the trigger script
        const triggerScript = path.join(__dirname, 'n8n-trigger.js');
        const output = execSync(`node "${triggerScript}"`, { encoding: 'utf8' });
        
        // n8n-trigger.js outputs pure JSON at the end, find it
        const lines = output.trim().split('\n');
        const jsonOutput = lines[lines.length - 1]; // The script logs pure JSON on the last line
        
        const payload = JSON.parse(jsonOutput);
        
        // Give n8n the direct HTTP download link to the video
        const videoFilename = path.basename(payload.videoPath);
        payload.videoDownloadUrl = `${publicBaseUrl}/videos/${videoFilename}`;
        
        console.log(`[API] Success! Generated video for: ${payload.topic}`);
        console.log(`[API] Passing public URL to n8n: ${payload.videoDownloadUrl}`);
        
        res.json(payload);

    } catch (err) {
        console.error('[API] Error generating video:', err.message);
        res.status(500).json({ 
            success: false, 
            error: "Video generation failed", 
            details: err.output ? err.output.toString() : err.message 
        });
    }
});

app.get('/generate-carousel', (req, res) => {
    try {
        console.log('[API] Received request from n8n to generate PDF carousel...');
        
        const script = path.join(__dirname, 'generate-carousel-pdf.js');
        // Take a template path query param, or default to the main one you provided
        const inputHtml = req.query.template || '/Users/ashwanikumar/Downloads/fsi_women_grants_CAROUSEL.html';
        
        execSync(`node "${script}" "${inputHtml}"`, { encoding: 'utf8' });
        
        const fs = require('fs');
        const files = fs.readdirSync(PDF_DIR).filter(f => f.endsWith('.pdf'));
        files.sort((a, b) => fs.statSync(path.join(PDF_DIR, b)).mtimeMs - fs.statSync(path.join(PDF_DIR, a)).mtimeMs);
        
        const latestPdf = files[0];
        const payload = {
            success: true,
            pdfDownloadUrl: `${publicBaseUrl}/pdfs/${latestPdf}`,
            pdfFileName: latestPdf
        };
        
        console.log(`[API] Success! Passing public PDF URL to n8n: ${payload.pdfDownloadUrl}`);
        res.json(payload);
    } catch (err) {
        console.error('[API] Error generating carousel:', err.message);
        res.status(500).json({ success: false, error: err.message });
    }
});

app.get('/generate-newsletter', (req, res) => {
    try {
        console.log('[API] Received request from n8n to generate newsletter...');
        const script = path.join(__dirname, '../generate-newsletter.js');
        execSync(`node "${script}"`, { encoding: 'utf8' });
        
        const d = new Date();
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        const formattedDate = `${yyyy}-${mm}-${dd}`;
        const outPath = path.join(__dirname, '../../out', `newsletter-${formattedDate}.html`);
        
        const fs = require('fs');
        const htmlContent = fs.readFileSync(outPath, 'utf8');

        console.log('[API] Success! Generated weekly newsletter HTML.');
        res.json({ success: true, html: htmlContent });
    } catch (err) {
        console.error('[API] Error generating newsletter:', err.message);
        res.status(500).json({ success: false, error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Video Generation API running on http://localhost:${PORT}`);
    console.log(`📡 n8n should connect to http://host.docker.internal:${PORT}/generate-video`);
});
