import os
import csv
import json
from datetime import datetime
from src.database.db import init_db, get_connection
from src.main_pipeline import GrowthOSPipeline
from src.engagement.delivery_engine import DeliveryEngine
from src.engagement.timeline_manager import TimelineManager

CSV_LOCAL_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'data', 'Sent_Outreach_Log.csv')

class AutopilotEngine:
    """
    Growth OS Autopilot Engine: Fully Automated Hands-Free Execution Mode.
    Automatically discovers, verifies, scores, drafts, sends outreach emails,
    and logs every sent record to a CSV spreadsheet ready for Google Sheets / Excel.
    """

    @classmethod
    def init_csv(cls):
        os.makedirs(os.path.dirname(CSV_LOCAL_PATH), exist_ok=True)
        headers = [
            'Sent Timestamp', 'Company Name', 'Domain', 'Recipient Email',
            'Decision Maker', 'Intent Score', 'Funding Confidence %',
            'Priority Level', 'Outreach Risk', 'Subject', 'Recommended Guides',
            'Sending Domain', 'Provider', 'Status'
        ]
        
        if not os.path.exists(CSV_LOCAL_PATH):
            with open(CSV_LOCAL_PATH, 'w', newline='', encoding='utf-8') as f:
                writer = csv.writer(f)
                writer.writerow(headers)

    @classmethod
    def log_sent_to_csv(cls, record_dict):
        cls.init_csv()
        row = [
            record_dict.get('sent_at', datetime.now().strftime('%Y-%m-%d %H:%M:%S')),
            record_dict.get('company_name', ''),
            record_dict.get('domain', ''),
            record_dict.get('email', ''),
            record_dict.get('decision_maker', ''),
            record_dict.get('intent_score', 0),
            record_dict.get('funding_confidence_pct', 0),
            record_dict.get('priority_level', 'Medium'),
            record_dict.get('risk_rating', 'Low'),
            record_dict.get('subject', ''),
            ", ".join([g['title'] for g in record_dict.get('recommended_guides', [])]),
            record_dict.get('sending_domain', 'outreach.fsidigital.com'),
            record_dict.get('provider', 'Resend'),
            'SENT (AUTOPILOT)'
        ]

        with open(CSV_LOCAL_PATH, 'a', newline='', encoding='utf-8') as f:
            writer = csv.writer(f)
            writer.writerow(row)

    @classmethod
    def process_and_send_automatically(cls, company_data, raw_signals, sending_domain='outreach.fsidigital.com'):
        init_db()
        
        # 1. Run Pipeline (Verification, Dual Scoring, Knowledge Graph, Draft, Quality Gate)
        pipeline_res = GrowthOSPipeline.process_company(company_data, raw_signals)
        company_id = pipeline_res['company_id']

        conn = get_connection()
        cursor = conn.cursor()

        # 2. Automatically Approve Draft
        cursor.execute("SELECT id, subject, body_text FROM outreach_emails WHERE company_id = ? ORDER BY created_at DESC LIMIT 1", (company_id,))
        draft = cursor.fetchone()
        
        if not draft:
            conn.close()
            return {'success': False, 'reason': 'No draft generated'}

        draft_id = draft['id']
        cursor.execute("UPDATE outreach_emails SET status = 'Approved' WHERE id = ?", (draft_id,))
        conn.commit()
        conn.close()

        # 3. Automatically Send via Adaptive Delivery Engine
        dispatch_res = DeliveryEngine.send_approved_email(draft_id, sending_domain=sending_domain)

        if dispatch_res['success']:
            # 4. Log to CSV Spreadsheet for Google Sheets / Excel
            log_record = {
                'sent_at': dispatch_res['sent_at'],
                'company_name': company_data['company_name'],
                'domain': company_data['domain'],
                'email': company_data.get('email', ''),
                'decision_maker': company_data.get('decision_maker_name', ''),
                'intent_score': pipeline_res['intent_score'],
                'funding_confidence_pct': pipeline_res['funding_confidence_pct'],
                'priority_level': pipeline_res['priority_level'],
                'risk_rating': pipeline_res['risk_rating'],
                'subject': pipeline_res['email_draft']['subject'],
                'recommended_guides': pipeline_res['recommended_guides'],
                'sending_domain': sending_domain,
                'provider': dispatch_res['provider']
            }
            cls.log_sent_to_csv(log_record)
            TimelineManager.log_event(company_id, "autopilot_sent", f"Autopilot sent outreach email & logged to CSV spreadsheet")

            return {
                'success': True,
                'company_name': company_data['company_name'],
                'recipient': company_data.get('email', ''),
                'subject': pipeline_res['email_draft']['subject'],
                'intent_score': pipeline_res['intent_score'],
                'funding_confidence_pct': pipeline_res['funding_confidence_pct'],
                'sent_at': dispatch_res['sent_at'],
                'csv_logged': True
            }
        else:
            return dispatch_res

if __name__ == '__main__':
    sample_company = {
        'company_name': 'Solaris Energy Systems Inc.',
        'domain': 'solarisenergy.ca',
        'industry': 'Clean Technology',
        'province': 'Ontario',
        'employee_count': '30-100',
        'decision_maker_name': 'David Miller',
        'decision_maker_title': 'Founder & VP Clean Tech',
        'email': 'david.miller@solarisenergy.ca'
    }
    sample_signals = [
        {
            'signal_type': 'net_zero_init',
            'description': 'Secured $3.5M solar microgrid research grant in Hamilton.',
            'source_url': 'https://newswire.ca/solaris-grant',
            'signal_date': datetime.now().strftime('%Y-%m-%d')
        }
    ]

    print("⚡ Running Autopilot Hands-Free Execution Engine...")
    res = AutopilotEngine.process_and_send_automatically(sample_company, sample_signals)
    print("Autopilot Result:", json.dumps(res, indent=2))
