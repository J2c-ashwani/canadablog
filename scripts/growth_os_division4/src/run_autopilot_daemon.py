import time
import os
import sys
from datetime import datetime
from src.intelligence.search_lead_finder import SearchLeadFinder
from src.autopilot_engine import AutopilotEngine
from src.analytics.daily_founder_brief import DailyFounderBrief
from src.analytics.hot_prospect_alert import HotProspectAlert

def run_fully_automated_cycle():
    print("\n" + "="*70)
    print(f"🤖 GROWTH OS DIVISION 4 — SMART GATED AUTOPILOT [{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}]")
    print("="*70)

    # Step 1: Discover real high-intent leads via Search Engine Finder
    lead_batch = SearchLeadFinder.discover_live_leads()

    sent_receipts = []
    gated_count = 0

    # Step 2: Process batch through Smart Gated Autopilot Engine
    # (Gate Rule: Intent >= 80, Confidence >= 75%, Risk == Low)
    for item in lead_batch:
        res = AutopilotEngine.process_and_send_automatically(item['company'], item['signals'])
        if res.get('success'):
            sent_receipts.append(res)
            print(f"✅ [Autopilot Dispatch] Dispatched to {res.get('recipient')} ({res.get('company_name')}) | Subject: '{res.get('subject')}'")
        elif res.get('gated'):
            gated_count += 1

    print("\n" + "="*70)
    print(f"✅ SMART AUTOPILOT CYCLE COMPLETE — Dispatched {len(sent_receipts)} Verified Emails, Gated {gated_count} Leads in Review Queue.")
    print("="*70 + "\n")

    # Step 3: Trigger Daily Founder Executive Briefing
    DailyFounderBrief.generate_and_send_brief()

    # Step 4: Check & Surface Hot Lead Alerts (e.g. Patrick Morency)
    HotProspectAlert.alert_founder_of_hot_lead({
        'company_name': 'Morency Creative Technologies',
        'email': 'pmorency01@gmail.com',
        'behavior_summary': 'Spent 592 seconds (10 min) on /audit checkout & selected $79 bundle',
        'recommended_action': 'Send personalized $199 strategy session checkout email'
    })

    return sent_receipts

if __name__ == '__main__':
    run_fully_automated_cycle()
