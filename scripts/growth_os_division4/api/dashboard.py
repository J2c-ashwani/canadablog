import json
from http.server import BaseHTTPRequestHandler
from datetime import datetime

HTML_PAGE = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Growth OS Division 4 — 24x7 Serverless Control Center</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', sans-serif; background-color: #F8FAFC; color: #1E293B; line-height: 1.5; }
        .header { background-color: #013B6F; color: white; padding: 20px 40px; display: flex; justify-content: space-between; align-items: center; }
        .logo-title { font-size: 22px; font-weight: 800; }
        .sub-title { font-size: 12px; color: #94A3B8; margin-top: 2px; }
        .container { max-width: 1200px; margin: 30px auto; padding: 0 20px; }
        .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 30px; }
        .card { background: white; border-radius: 10px; border: 1px solid #E2E8F0; padding: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.03); }
        .title { font-size: 11px; font-weight: 700; color: #64748B; text-transform: uppercase; margin-bottom: 6px; }
        .val { font-size: 26px; font-weight: 800; color: #013B6F; }
        .sub { font-size: 12px; color: #34A90E; font-weight: 600; margin-top: 4px; }
        .box { background: white; border-radius: 12px; border: 1px solid #E2E8F0; padding: 24px; }
    </style>
</head>
<body>
    <div class="header">
        <div>
            <div class="logo-title">Growth OS Division 4</div>
            <div class="sub-title">24x7 Serverless Vercel Autopilot Engine (Google Sheets Sync)</div>
        </div>
        <div style="font-size: 13px; font-weight: 600; background: #34A90E; padding: 6px 14px; border-radius: 20px;">
            ● 24x7 Serverless Running
        </div>
    </div>

    <div class="container">
        <div class="grid-4">
            <div class="card">
                <div class="title">System Status</div>
                <div class="val" style="color: #34A90E; font-size: 20px;">24x7 Autopilot</div>
                <div class="sub">Vercel Serverless + Cron</div>
            </div>
            <div class="card">
                <div class="title">Cron Trigger Path</div>
                <div class="val" style="font-size: 16px; word-break: break-all;">/api/cron/autopilot</div>
                <div class="sub">cron-jobs.org Ready</div>
            </div>
            <div class="card">
                <div class="title">Google Sheets Sync</div>
                <div class="val" style="font-size: 16px; color: #0284C7;">Automated Webhook</div>
                <div class="sub">Auto-Appends Rows</div>
            </div>
            <div class="card">
                <div class="title">Manual Review</div>
                <div class="val" style="font-size: 18px; color: #64748B;">BYPASSED (0%)</div>
                <div class="sub">100% Hands-Free</div>
            </div>
        </div>

        <div class="box">
            <h3 style="margin-bottom: 12px; color: #013B6F;">⚡ 24x7 Serverless Automation Endpoint</h3>
            <p style="font-size: 14px; color: #475569; margin-bottom: 16px;">
                This system runs completely serverless on Vercel without requiring any local terminal commands or manual intervention.
            </p>
            <div style="background: #F1F5F9; padding: 14px; border-radius: 6px; font-family: monospace; font-size: 13px;">
                <strong>Cron Trigger URL:</strong> <code>https://YOUR-PROJECT.vercel.app/api/cron/autopilot</code>
            </div>
        </div>
    </div>
</body>
</html>
"""

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()
        self.wfile.write(HTML_PAGE.encode('utf-8'))
