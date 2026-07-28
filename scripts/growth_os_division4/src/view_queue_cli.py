import json
from src.engagement.human_queue import HumanApprovalQueue
from src.analytics.revenue_forecast import RevenueForecastEngine

def display_cli_summary():
    print("================================================================================")
    print("🚀 GROWTH OS DIVISION 4 — REVENUE & OUTREACH CONTROL CENTER (CLI VIEW)")
    print("================================================================================\n")

    # 1. Predictive Revenue Metrics
    forecast = RevenueForecastEngine.calculate_forecast()
    print("📊 REVENUE & PIPELINE METRICS:")
    print(f"   • Total Tracked Companies: {forecast['total_companies_tracked']}")
    print(f"   • High-Intent Companies (Score ≥ 80): {forecast['high_intent_companies_score_80plus']}")
    print(f"   • Realized Attributed Revenue: ${forecast['realized_revenue_to_date']:,.2f} USD")
    print(f"   • 90-Day Expected Revenue Forecast: ${forecast['forecast_90day']['expected_revenue']:,.2f} USD")
    print(f"   • 95% Confidence Interval Range: ${forecast['forecast_90day']['confidence_interval_95_lower']:,.0f} - ${forecast['forecast_90day']['confidence_interval_95_upper']:,.0f} USD\n")

    # 2. Pending Human Review Queue
    pending = HumanApprovalQueue.list_pending_drafts()
    print(f"📥 PENDING HUMAN REVIEW QUEUE ({len(pending)} Drafts Waiting):\n" + "-"*80)

    for idx, item in enumerate(pending, 1):
        print(f"[{idx}] COMPANY: {item['company_name']} (ID: {item['company_id']})")
        print(f"    Recipient: {item['recipient_email']}")
        print(f"    Intent Score: {item['intent_score']} | Funding Confidence: {item['funding_confidence_pct']}% | Risk: {item['risk_rating']}")
        print(f"    Subject: {item['subject']}")
        print(f"    AI Explainability Reasons:")
        for r in item['explainability_reasons']:
            print(f"       - {r}")
        print(f"    Recommended Guides:")
        for g in item['recommended_guides']:
            print(f"       - {g['title']} ({g['url']})")
        print("    Email Body Preview:")
        print("    " + "\n    ".join(item['body_text'].splitlines()))
        print("-" * 80)

if __name__ == '__main__':
    display_cli_summary()
