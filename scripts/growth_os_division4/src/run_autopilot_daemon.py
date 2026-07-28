import time
import os
import sys
from datetime import datetime
from src.intelligence.search_lead_finder import SearchLeadFinder
from src.autopilot_engine import AutopilotEngine

def run_fully_automated_cycle():
    print("\n" + "="*70)
    print(f"🤖 GROWTH OS DIVISION 4 — AUTOMATIC ENGINE RUN [{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}]")
    print("="*70)

    # Step 1: Discover real high-intent leads via Search Engine Finder
    lead_batch = SearchLeadFinder.discover_live_leads()

    sent_receipts = []
    # Step 2: Process batch through Autopilot Engine (Score -> Verify -> Quality Gate -> Resend Dispatch -> Log)
    for item in lead_batch:
        res = AutopilotEngine.process_and_send_automatically(item['company'], item['signals'])
        if res.get('success'):
            sent_receipts.append(res)
            print(f"✅ [Autopilot Dispatch] Dispatched to {res.get('recipient')} ({res.get('company_name')}) | Subject: '{res.get('subject')}'")

    print("\n" + "="*70)
    print(f"✅ AUTOMATIC CYCLE COMPLETE — Dispatched {len(sent_receipts)} Verified Emails via Resend API.")
    print("="*70 + "\n")

    return sent_receipts

if __name__ == '__main__':
    run_fully_automated_cycle()
