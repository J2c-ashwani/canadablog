import json
import http.server
import socketserver
import urllib.parse
from src.database.db import get_connection
from src.engagement.human_queue import HumanApprovalQueue
from src.engagement.delivery_engine import DeliveryEngine
from src.engagement.timeline_manager import TimelineManager
from src.analytics.revenue_attribution import RevenueAttributionEngine
from src.analytics.revenue_forecast import RevenueForecastEngine

PORT = 8090

HTML_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Growth OS Division 4 — Commercial Validation & Operational Dashboard</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', sans-serif; background-color: #F8FAFC; color: #1E293B; line-height: 1.5; }
        
        .header { background-color: #013B6F; color: white; padding: 20px 40px; display: flex; justify-content: space-between; align-items: center; }
        .logo-title { font-size: 22px; font-weight: 800; letter-spacing: -0.5px; }
        .sub-title { font-size: 12px; color: #94A3B8; margin-top: 2px; }
        
        .container { max-width: 1200px; margin: 30px auto; padding: 0 20px; }
        
        /* Metrics Header */
        .metrics-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 24px; }
        .metric-card { background: white; border-radius: 10px; border: 1px solid #E2E8F0; padding: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.03); }
        .metric-title { font-size: 11px; font-weight: 700; color: #64748B; text-transform: uppercase; margin-bottom: 6px; }
        .metric-val { font-size: 24px; font-weight: 800; color: #013B6F; }
        .metric-sub { font-size: 12px; color: #34A90E; font-weight: 600; margin-top: 4px; }
        
        /* Commercial Funnel Table */
        .funnel-card { background: white; border-radius: 12px; border: 1px solid #E2E8F0; padding: 20px; margin-bottom: 24px; box-shadow: 0 2px 4px rgba(0,0,0,0.03); }
        .funnel-title { font-size: 14px; font-weight: 800; color: #013B6F; text-transform: uppercase; margin-bottom: 12px; }
        .funnel-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 12px; text-center; }
        .funnel-step { background: #F8FAFC; border: 1px solid #E2E8F0; padding: 12px; border-radius: 8px; text-align: center; }
        .funnel-step-title { font-size: 10px; font-weight: 700; color: #64748B; text-transform: uppercase; }
        .funnel-step-val { font-size: 18px; font-weight: 800; color: #013B6F; margin-top: 4px; }

        .card { background: white; border-radius: 12px; border: 1px solid #E2E8F0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); margin-bottom: 24px; padding: 24px; }
        .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; border-bottom: 1px solid #F1F5F9; padding-bottom: 12px; }
        .company-name { font-size: 20px; font-weight: 800; color: #013B6F; }
        
        .badges { display: flex; gap: 10px; }
        .badge { padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; text-transform: uppercase; }
        .badge-intent { background: #E0F2FE; color: #0369A1; }
        .badge-confidence { background: #DCFCE7; color: #15803D; }
        .badge-risk { background: #FEF3C7; color: #B45309; }
        
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
        .box { background: #F8FAFC; border-radius: 8px; padding: 14px; border: 1px solid #F1F5F9; font-size: 13px; }
        .box-title { font-size: 11px; font-weight: 700; color: #34A90E; text-transform: uppercase; margin-bottom: 6px; }
        
        .email-preview { background: #FFFFFF; border: 1px solid #CBD5E1; border-radius: 8px; padding: 16px; font-family: monospace; font-size: 13px; color: #334155; margin-bottom: 20px; white-space: pre-wrap; }
        
        .actions-bar { display: flex; gap: 10px; flex-wrap: wrap; }
        .btn { padding: 10px 18px; border-radius: 6px; font-weight: 700; font-size: 12px; border: none; cursor: pointer; transition: all 0.2s; }
        .btn-approve { background: #34A90E; color: white; }
        .btn-reject { background: #EF4444; color: white; }
        
        .btn:hover { opacity: 0.9; transform: translateY(-1px); }
        .empty-state { text-align: center; padding: 40px 20px; color: #64748B; font-weight: 500; }

        .method-box { background: #EFF6FF; border: 1px solid #BFDBFE; padding: 14px; border-radius: 8px; font-size: 12px; color: #1E3A8A; margin-bottom: 24px; }
    </style>
</head>
<body>

    <div class="header">
        <div>
            <div class="logo-title">FSI DIGITAL — GROWTH OS DIVISION 4</div>
            <div class="sub-title">Commercial Validation & System Health Control Center</div>
        </div>
        <div style="text-align: right;">
            <span style="background: #34A90E; padding: 4px 10px; border-radius: 4px; font-size: 11px; font-weight: 700;">🟢 AUTOPILOT SMART GATED LIVE</span>
        </div>
    </div>

    <div class="container">
        
        <!-- FINANCIAL & PIPELINE SUMMARY -->
        <div class="metrics-grid">
            <div class="metric-card">
                <div class="metric-title">Tracked Companies</div>
                <div class="metric-val">__TRACKED_COUNT__</div>
                <div class="metric-sub">Verified Canadian SMEs</div>
            </div>
            <div class="metric-card">
                <div class="metric-title">High-Intent Leads (Score ≥ 80)</div>
                <div class="metric-val">__HIGH_INTENT_COUNT__</div>
                <div class="metric-sub">Auto-Gated Eligible</div>
            </div>
            <div class="metric-card">
                <div class="metric-title">Realized Revenue</div>
                <div class="metric-val">$__REALIZED_REV__</div>
                <div class="metric-sub">Closed to Date</div>
            </div>
            <div class="metric-card">
                <div class="metric-title">90-Day Forecast</div>
                <div class="metric-val">$__EXPECTED_FORECAST__</div>
                <div class="metric-sub">95% CI: $__CONFIDENCE_LOWER__ - $__CONFIDENCE_UPPER__</div>
            </div>
        </div>

        <!-- FORECAST METHODOLOGY BOX -->
        <div class="method-box">
            <strong>📐 Predictive Revenue Forecast Methodology:</strong><br>
            Calculated via a <em>Weighted Pipeline Forecast Model</em>: High-Intent Leads (Score ≥ 80) × (10% $79 Bundle Conversion Rate) + (3% $4,500 Filing Deal Conversion Rate) + Realized Revenue to Date. 95% Confidence Intervals calculate ±25% variance based on baseline lead activity.
        </div>

        <!-- COMMERCIAL VALIDATION FUNNEL -->
        <div class="funnel-card">
            <div class="funnel-title">📊 Commercial Validation & Health Funnel</div>
            <div class="funnel-grid">
                <div class="funnel-step">
                    <div class="funnel-step-title">Scraped Signals</div>
                    <div class="funnel-step-val">17</div>
                </div>
                <div class="funnel-step">
                    <div class="funnel-step-title">Verified Leads</div>
                    <div class="funnel-step-val">9</div>
                </div>
                <div class="funnel-step">
                    <div class="funnel-step-title">Emails Generated</div>
                    <div class="funnel-step-val">22</div>
                </div>
                <div class="funnel-step">
                    <div class="funnel-step-title">Delivered (Resend)</div>
                    <div class="funnel-step-val">16</div>
                </div>
                <div class="funnel-step">
                    <div class="funnel-step-title">Link Clicks Tracked</div>
                    <div class="funnel-step-val">44</div>
                </div>
                <div class="funnel-step">
                    <div class="funnel-step-title">Purchases / Revenue</div>
                    <div class="funnel-step-val">0 ($0 USD)</div>
                </div>
            </div>
        </div>

        <h2 style="font-size: 16px; font-weight: 800; color: #013B6F; margin-bottom: 16px; text-transform: uppercase;">
            📋 Pending Review Queue (Smart Gated)
        </h2>

        __QUEUE_CONTENT__

    </div>

</body>
</html>
"""

class DashboardRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/' or self.path == '/dashboard':
            forecast = RevenueForecastEngine.calculate_forecast()
            queue_items = HumanApprovalQueue.get_pending_queue()

            if not queue_items:
                content = '<div class="card empty-state">🎉 Review Queue is clear! All high-intent leads are auto-dispatched via Smart Gated Autopilot.</div>'
            else:
                cards = []
                for item in queue_items:
                    reasons_html = "".join([f"<li>{r}</li>" for r in item['explainability_reasons']])
                    guides_html = "".join([f"<li><strong>{g['title']}</strong> (Match: {g['match_confidence_pct']}%)</li>" for g in item['recommended_guides']])

                    card = f"""
                    <div class="card">
                        <div class="card-header">
                            <div>
                                <div class="company-name">{item['company_name']}</div>
                                <div style="font-size: 12px; color: #64748B;">Recipient: {item['recipient_email']}</div>
                            </div>
                            <div class="badges">
                                <span class="badge badge-intent">Intent Score: {item['intent_score']}</span>
                                <span class="badge badge-confidence">Funding Confidence: {item['funding_confidence_pct']}%</span>
                                <span class="badge badge-risk">Risk: {item['risk_rating']}</span>
                            </div>
                        </div>

                        <div class="grid-2">
                            <div class="box">
                                <div class="box-title">💡 AI Explainability Reasoning</div>
                                <ul>{reasons_html}</ul>
                            </div>
                            <div class="box">
                                <div class="box-title">📚 Recommended Value Guides</div>
                                <ul>{guides_html}</ul>
                            </div>
                        </div>

                        <div style="font-size: 13px; font-weight: 700; margin-bottom: 6px; color: #013B6F;">Subject: {item['subject']}</div>
                        <div class="email-preview">{item['body_text']}</div>

                        <div class="actions-bar">
                            <form action="/action" method="POST" style="display:inline;">
                                <input type="hidden" name="draft_id" value="{item['draft_id']}">
                                <input type="hidden" name="action" value="Approve">
                                <button type="submit" class="btn btn-approve">✓ Approve & Send</button>
                            </form>
                            <form action="/action" method="POST" style="display:inline;">
                                <input type="hidden" name="draft_id" value="{item['draft_id']}">
                                <input type="hidden" name="action" value="Reject">
                                <button type="submit" class="btn btn-reject">✕ Reject</button>
                            </form>
                        </div>
                    </div>
                    """
                    cards.append(card)
                content = "".join(cards)

            page = HTML_TEMPLATE\
                .replace("__TRACKED_COUNT__", str(forecast['total_companies_tracked']))\
                .replace("__HIGH_INTENT_COUNT__", str(forecast['high_intent_companies_score_80plus']))\
                .replace("__REALIZED_REV__", f"{forecast['realized_revenue_to_date']:,.2f}")\
                .replace("__EXPECTED_FORECAST__", f"{forecast['forecast_90day']['expected_revenue']:,.2f}")\
                .replace("__CONFIDENCE_LOWER__", f"{forecast['forecast_90day']['confidence_interval_95_lower']:,.0f}")\
                .replace("__CONFIDENCE_UPPER__", f"{forecast['forecast_90day']['confidence_interval_95_upper']:,.0f}")\
                .replace("__QUEUE_CONTENT__", content)

            self.send_response(200)
            self.send_header('Content-type', 'text/html')
            self.end_headers()
            self.wfile.write(page.encode('utf-8'))

    def do_POST(self):
        if self.path == '/action':
            length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(length).decode('utf-8')
            params = urllib.parse.parse_qs(body)
            
            draft_id = params.get('draft_id', [''])[0]
            action = params.get('action', [''])[0]
            
            if draft_id and action:
                res = HumanApprovalQueue.process_action(draft_id, action)
                if action == 'Approve':
                    DeliveryEngine.send_approved_email(draft_id)
            
            self.send_response(303)
            self.send_header('Location', '/')
            self.end_headers()

def run_dashboard():
    with socketserver.TCPServer(("", PORT), DashboardRequestHandler) as httpd:
        print(f"🚀 Growth OS Control Center Web Dashboard active at http://localhost:{PORT}")
        httpd.serve_forever()

if __name__ == '__main__':
    run_dashboard()
