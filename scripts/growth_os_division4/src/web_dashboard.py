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
    <title>Growth OS Division 4 — Revenue & Outreach Control Center</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', sans-serif; background-color: #F8FAFC; color: #1E293B; line-height: 1.5; }
        
        .header { background-color: #013B6F; color: white; padding: 20px 40px; display: flex; justify-content: space-between; align-items: center; }
        .logo-title { font-size: 22px; font-weight: 800; letter-spacing: -0.5px; }
        .sub-title { font-size: 12px; color: #94A3B8; margin-top: 2px; }
        
        .container { max-width: 1200px; margin: 30px auto; padding: 0 20px; }
        
        /* Metrics Header */
        .metrics-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 30px; }
        .metric-card { background: white; border-radius: 10px; border: 1px solid #E2E8F0; padding: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.03); }
        .metric-title { font-size: 11px; font-weight: 700; color: #64748B; text-transform: uppercase; margin-bottom: 6px; }
        .metric-val { font-size: 26px; font-weight: 800; color: #013B6F; }
        .metric-sub { font-size: 12px; color: #34A90E; font-weight: 600; margin-top: 4px; }
        
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
        .empty-state { text-align: center; padding: 60px 20px; color: #64748B; font-weight: 500; }
    </style>
</head>
<body>
    <div class="header">
        <div>
            <div class="logo-title">Growth OS Division 4</div>
            <div class="sub-title">AI Revenue Intelligence & Founder Outreach Engine (v3.1)</div>
        </div>
        <div style="font-size: 13px; font-weight: 600; background: #0284C7; padding: 6px 14px; border-radius: 20px;">
            ● Active System
        </div>
    </div>

    <div class="container">
        <!-- Module 21 Revenue Forecast Header Metrics -->
        <div class="metrics-grid">
            <div class="metric-card">
                <div class="metric-title">Tracked Companies</div>
                <div class="metric-val">__TRACKED_COUNT__</div>
                <div class="metric-sub">__HIGH_INTENT_COUNT__ High Intent (≥80)</div>
            </div>
            <div class="metric-card">
                <div class="metric-title">Realized Revenue</div>
                <div class="metric-val">$__REALIZED_REV__</div>
                <div class="metric-sub">Attributed to Date</div>
            </div>
            <div class="metric-card">
                <div class="metric-title">90-Day Expected Forecast</div>
                <div class="metric-val">$__EXPECTED_FORECAST__</div>
                <div class="metric-sub">Module 21 Predictive Engine</div>
            </div>
            <div class="metric-card">
                <div class="metric-title">95% Confidence Interval</div>
                <div class="metric-val">$__CONFIDENCE_LOWER__ - $__CONFIDENCE_UPPER__</div>
                <div class="metric-sub">Range (95% Probability)</div>
            </div>
        </div>

        <h2 style="margin-bottom: 20px; font-size: 18px; color: #334155;">Pending Review Queue</h2>
        <div id="queue-container">__QUEUE_CONTENT__</div>
    </div>
</body>
</html>
"""

class DashboardHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/' or self.path.startswith('/queue'):
            pending = HumanApprovalQueue.list_pending_drafts()
            forecast = RevenueForecastEngine.calculate_forecast()
            
            if not pending:
                content = '<div class="card empty-state">🎉 All pending drafts have been reviewed! No items in queue.</div>'
            else:
                cards = []
                for item in pending:
                    guides_html = "".join([f"<li><a href='{g['url']}' target='_blank'>{g['title']}</a></li>" for g in item['recommended_guides']])
                    reasons_html = "".join([f"<li>{r}</li>" for r in item['explainability_reasons']])
                    
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

def run_server():
    print(f"🚀 Growth OS Division 4 Web Dashboard running at http://localhost:{PORT}")
    with socketserver.TCPServer(("", PORT), DashboardHandler) as httpd:
        httpd.serve_forever()

if __name__ == '__main__':
    run_server()
