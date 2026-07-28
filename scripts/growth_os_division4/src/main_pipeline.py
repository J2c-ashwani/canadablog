import json
import sqlite3
from src.database.db import init_db, get_connection
from src.intelligence.intent_verifier import IntentVerifier
from src.intelligence.dual_scorer import DualScorer
from src.intelligence.knowledge_graph import KnowledgeGraph
from src.intelligence.content_gap import ContentGapEngine
from src.engagement.quality_gate import QualityGate
from src.engagement.risk_scorer import RiskScorer
from src.engagement.timeline_manager import TimelineManager

class GrowthOSPipeline:
    """
    Main Orchestrator Pipeline for Growth OS Division 4 (v3.1 Production)
    Coordinates Intelligence Layer -> Engagement Layer workflow.
    """

    @classmethod
    def process_company(cls, company_data, raw_signals):
        init_db()
        conn = get_connection()
        cursor = conn.cursor()

        company_id = company_data.get('id', 'comp_' + str(abs(hash(company_data['domain'])) % 100000))
        domain = company_data['domain']

        # Save or update company
        cursor.execute("""
            INSERT OR REPLACE INTO intent_companies 
            (id, company_name, domain, industry, province, employee_count, decision_maker_name, decision_maker_title, email)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            company_id,
            company_data['company_name'],
            domain,
            company_data.get('industry', 'Technology'),
            company_data.get('province', 'Ontario'),
            company_data.get('employee_count', '10-50'),
            company_data.get('decision_maker_name', 'Ashwani Kumar'),
            company_data.get('decision_maker_title', 'Founder & CEO'),
            company_data.get('email', 'ashwani@example.com')
        ))

        # 1. Verification Phase (Module 1B)
        verified_signals = []
        for sig in raw_signals:
            v_res = IntentVerifier.verify_signal(
                signal_type=sig['signal_type'],
                description=sig['description'],
                source_url=sig['source_url'],
                signal_date_str=sig['signal_date']
            )
            if v_res['is_verified']:
                sig['is_verified'] = True
                sig['verification_reason'] = v_res['verification_reason']
                verified_signals.append(sig)

                # Save signal to DB
                cursor.execute("""
                    INSERT INTO intent_signals (id, company_id, signal_type, description, source_url, signal_date, is_verified, verification_reason, score_impact)
                    VALUES (lower(hex(randomblob(16))), ?, ?, ?, ?, ?, 1, ?, 20)
                """, (company_id, sig['signal_type'], sig['description'], sig['source_url'], sig['signal_date'], v_res['verification_reason']))

        # 2. Dual-Scoring Phase (Module 3)
        scores = DualScorer.calculate_scores(company_data, verified_signals)
        cursor.execute("""
            UPDATE intent_companies 
            SET intent_score = ?, funding_confidence_pct = ?, priority_level = ?
            WHERE id = ?
        """, (scores['intent_score'], scores['funding_confidence_pct'], scores['priority_level'], company_id))

        # 3. Knowledge Graph & Explainability Phase (Modules 4B & 3B)
        kg_res = KnowledgeGraph.resolve_recommendations(verified_signals, company_data)
        guides = kg_res['recommended_guides']
        explain_reasons = kg_res['explainability_reasons']

        # 4. Draft Generation Phase (Module 5)
        recipient_name = company_data.get('decision_maker_name', 'Founder')
        first_name = recipient_name.split()[0]
        guide1_title = guides[0]['title'] if guides else 'Canadian Grant Guide'
        guide1_url = guides[0]['url'] if guides else 'https://fsidigital.com'

        subject = f"Quick resource for {company_data['company_name']}"
        body_text = f"""Hi {first_name},

While tracking Canadian tech & innovation developments, I noticed {company_data['company_name']}'s recent R&D hiring expansion.

Companies making similar investments in Ontario often qualify for non-dilutive programs like SR&ED tax credits and IRAP grants.

I thought you might find this guide useful:
• {guide1_title}: {guide1_url}

If you ever have questions or want to verify eligibility, I would be glad to point you in the right direction.

Best regards,
Growth OS Team
FSI Digital"""

        email_draft = {
            'subject': subject,
            'body_text': body_text
        }

        # 5. Pre-Queue Quality Gate & Risk Scoring (Modules 16 & 18)
        qg_res = QualityGate.verify_draft(email_draft, company_data, verified_signals, scores['funding_confidence_pct'])
        risk_res = RiskScorer.calculate_risk(company_data, verified_signals, scores['funding_confidence_pct'], qg_res['quality_gate_passed'])

        # Save Outreach Email to DB
        email_id = 'email_' + str(abs(hash(domain + subject)) % 100000)
        cursor.execute("""
            INSERT OR REPLACE INTO outreach_emails 
            (id, company_id, subject, body_text, recommended_guides, explainability_reasons, quality_gate_passed, quality_gate_logs, risk_rating, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending Review')
        """, (
            email_id,
            company_id,
            subject,
            body_text,
            json.dumps(guides),
            json.dumps(explain_reasons),
            1 if qg_res['quality_gate_passed'] else 0,
            json.dumps(qg_res['quality_gate_logs']),
            risk_res['risk_rating']
        ))

        # Close Connection before calling TimelineManager
        conn.commit()
        conn.close()

        # 6. Log Timeline Event (Module 15)
        TimelineManager.log_event(company_id, "signal_verified", f"Verified {len(verified_signals)} signals; Intent Score: {scores['intent_score']}, Confidence: {scores['funding_confidence_pct']}%")
        TimelineManager.log_event(company_id, "email_drafted", f"Generated outreach draft '{subject}' (Risk: {risk_res['risk_rating']})")

        return {
            'company_id': company_id,
            'company_name': company_data['company_name'],
            'intent_score': scores['intent_score'],
            'funding_confidence_pct': scores['funding_confidence_pct'],
            'priority_level': scores['priority_level'],
            'verified_signals': len(verified_signals),
            'recommended_guides': guides,
            'explainability_reasons': explain_reasons,
            'quality_gate_passed': qg_res['quality_gate_passed'],
            'risk_rating': risk_res['risk_rating'],
            'email_draft': email_draft
        }

if __name__ == '__main__':
    from datetime import datetime
    sample_company = {
        'company_name': 'ABC Robotics Inc.',
        'domain': 'abcrobotics.ca',
        'industry': 'Technology',
        'province': 'Ontario',
        'employee_count': '20-50',
        'decision_maker_name': 'John Smith',
        'decision_maker_title': 'Co-Founder & CTO',
        'email': 'john@abcrobotics.ca'
    }

    sample_signals = [
        {
            'signal_type': 'R&D_hiring',
            'description': 'ABC Robotics expands engineering team, hiring 6 Senior Robotics Engineers.',
            'source_url': 'https://betakit.com/abc-robotics-hires-engineers',
            'signal_date': datetime.now().strftime('%Y-%m-%d')
        }
    ]

    out = GrowthOSPipeline.process_company(sample_company, sample_signals)
    print("Pipeline Output:", out['company_name'])
