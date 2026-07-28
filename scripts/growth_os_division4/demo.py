import json
from src.database.db import init_db
from src.main_pipeline import GrowthOSPipeline
from src.engagement.human_queue import HumanApprovalQueue
from src.engagement.delivery_engine import DeliveryEngine
from src.engagement.timeline_manager import TimelineManager

def run_full_demo():
    print("================================================================================")
    print("🚀 GROWTH OS DIVISION 4 — AI INTENT DISCOVERY & OUTREACH ENGINE (v3.1)")
    print("================================================================================\n")

    # Step 1: Initialize Database
    init_db()

    # Step 2: Define Company & Public Signals
    company = {
        'company_name': 'Quantum Robotics & Automation Inc.',
        'domain': 'quantumrobotics.ca',
        'industry': 'Manufacturing & Robotics',
        'province': 'Ontario',
        'employee_count': '25-100',
        'decision_maker_name': 'Sarah Lin',
        'decision_maker_title': 'Co-Founder & VP of Engineering',
        'email': 'sarah.lin@quantumrobotics.ca'
    }

    signals = [
        {
            'signal_type': 'facility_expansion',
            'description': 'Quantum Robotics opens new 25,000 sq ft automation facility in Kitchener-Waterloo.',
            'source_url': 'https://newswire.ca/quantum-robotics-expansion',
            'signal_date': '2026-07-25'
        },
        {
            'signal_type': 'R&D_hiring',
            'description': 'Hiring 8 Embedded AI Engineers and Mechatronics Specialists.',
            'source_url': 'https://betakit.com/quantum-robotics-hiring-spree',
            'signal_date': '2026-07-27'
        }
    ]

    print("Step 1: Running Intelligence Layer Scrapers & Scorer...")
    result = GrowthOSPipeline.process_company(company, signals)

    print(f"\n📊 Company Profile & Scoring Results:")
    print(f"   • Company: {result['company_name']}")
    print(f"   • Intent Score: {result['intent_score']} / 100")
    print(f"   • Funding Eligibility Confidence: {result['funding_confidence_pct']}%")
    print(f"   • Priority Level: {result['priority_level']}")
    print(f"   • Pre-Queue Quality Gate: {'PASSED ✅' if result['quality_gate_passed'] else 'FAILED ❌'}")
    print(f"   • Outreach Risk Rating: {result['risk_rating']}")

    print(f"\n💡 AI Explainability Reasoning:")
    for reason in result['explainability_reasons']:
        print(f"   - {reason}")

    print(f"\n📚 Recommended Value Guides:")
    for g in result['recommended_guides']:
        print(f"   - {g['title']} ({g['url']})")

    # Step 3: Human Review Queue Inspection
    print("\nStep 2: Inspecting Human Review Queue...")
    pending = HumanApprovalQueue.list_pending_drafts()
    print(f"   • Total Pending Drafts in Queue: {len(pending)}")
    target_draft = pending[0]

    print("\nDraft Subject:", target_draft['subject'])
    print("Draft Body Text:\n" + "-"*40 + "\n" + target_draft['body_text'] + "\n" + "-"*40)

    # Step 4: Human Approval Action
    print("\nStep 3: Executing Human Reviewer Action ('Approve')...")
    action_res = HumanApprovalQueue.process_action(target_draft['draft_id'], 'Approve')
    print("   • Action Result:", action_res['message'])

    # Step 5: Delivery Engine Dispatch
    print("\nStep 4: Executing Adaptive Delivery Engine Dispatch...")
    dispatch_res = DeliveryEngine.send_approved_email(target_draft['draft_id'])
    print("   • Dispatch Result:", dispatch_res)

    # Step 6: Inspect Company Relationship Timeline
    print("\nStep 5: Inspecting Company Relationship Timeline (Module 15)...")
    timeline = TimelineManager.get_timeline(target_draft['company_id'])
    for t in timeline:
        print(f"   [{t['created_at']}] {t['event_type'].upper()}: {t['summary']}")

    print("\n================================================================================")
    print("✅ Growth OS Division 4 End-to-End Pipeline Execution Complete!")
    print("================================================================================\n")

if __name__ == '__main__':
    run_full_demo()
