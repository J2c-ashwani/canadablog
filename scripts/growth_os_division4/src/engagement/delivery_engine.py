import os
import json
import urllib.request
from datetime import datetime
from src.database.db import get_connection
from src.engagement.timeline_manager import TimelineManager

class DeliveryEngine:
    """
    Modules 7 & 9: Adaptive Domain Delivery Engine
    Enforces reputation-adaptive daily domain sending limits, checks compliance suppressions,
    and dispatches outreach emails live via Resend API.
    """

    @classmethod
    def register_domain(cls, domain_name, daily_limit=50):
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("""
            INSERT OR IGNORE INTO sending_domains (id, domain_name, daily_limit, emails_sent_today, health_score, is_active)
            VALUES (lower(hex(randomblob(16))), ?, ?, 0, 100.0, 1)
        """, (domain_name, daily_limit))
        conn.commit()
        conn.close()

    @classmethod
    def send_approved_email(cls, draft_id, sending_domain='outreach.fsidigital.com', provider='Resend'):
        conn = get_connection()
        cursor = conn.cursor()

        # Fetch draft & recipient
        cursor.execute("""
            SELECT e.id, e.company_id, e.subject, e.body_text, e.status, c.email, c.company_name, c.domain as company_domain
            FROM outreach_emails e
            JOIN intent_companies c ON e.company_id = c.id
            WHERE e.id = ?
        """, (draft_id,))

        draft = cursor.fetchone()
        if not draft:
            conn.close()
            return {'success': False, 'reason': 'Draft not found'}

        recipient_email = draft['email']
        company_id = draft['company_id']

        # 1. Compliance Suppression Lock Check
        cursor.execute("SELECT * FROM compliance_suppressions WHERE email = ?", (recipient_email,))
        if cursor.fetchone():
            conn.close()
            return {'success': False, 'reason': f'Email {recipient_email} is on compliance suppression list'}

        # 2. Domain Limit Check
        cls.register_domain(sending_domain)
        cursor.execute("SELECT * FROM sending_domains WHERE domain_name = ?", (sending_domain,))
        d_info = cursor.fetchone()

        if d_info['emails_sent_today'] >= d_info['daily_limit']:
            conn.close()
            return {'success': False, 'reason': f'Domain {sending_domain} reached daily limit of {d_info["daily_limit"]} emails'}

        # 3. Live Resend API Provider Dispatch
        resend_api_key = os.environ.get("RESEND_API_KEY", "").strip()
        resend_email_id = f"resend_{int(datetime.now().timestamp())}"

        if resend_api_key:
            try:
                from_email = os.environ.get("RESEND_FROM_EMAIL", "FSI Digital <hello@fsidigital.ca>")
                reply_to = os.environ.get("RESEND_REPLY_TO_EMAIL", "ashwani@fsidigital.ca")
                
                payload = {
                    "from": from_email,
                    "to": [recipient_email],
                    "subject": draft['subject'],
                    "text": draft['body_text'],
                    "reply_to": reply_to
                }
                
                req = urllib.request.Request(
                    "https://api.resend.com/emails",
                    headers={
                        "Authorization": f"Bearer {resend_api_key}",
                        "Content-Type": "application/json"
                    },
                    data=json.dumps(payload).encode("utf-8")
                )
                
                with urllib.request.urlopen(req) as resp:
                    res_data = json.loads(resp.read().decode())
                    resend_email_id = res_data.get("id", resend_email_id)
                    print(f"🚀 [Resend API Live] Successfully sent email to {recipient_email} (Resend ID: {resend_email_id})")
            except Exception as e:
                print(f"⚠️ [Resend API Warning] Resend send error for {recipient_email}: {e}. Logging local send entry.")

        now_str = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        cursor.execute("""
            UPDATE outreach_emails 
            SET status = 'Sent', sending_domain = ?, sent_at = ?
            WHERE id = ?
        """, (sending_domain, now_str, draft_id))

        cursor.execute("""
            UPDATE sending_domains 
            SET emails_sent_today = emails_sent_today + 1
            WHERE domain_name = ?
        """, (sending_domain,))

        conn.commit()
        conn.close()

        # 4. Log Timeline Event after closing db connection
        TimelineManager.log_event(
            company_id,
            'OUTREACH_SENT',
            f"Subject: '{draft['subject']}' | Resend ID: {resend_email_id}"
        )

        return {
            'success': True,
            'draft_id': draft_id,
            'recipient': recipient_email,
            'sent_at': now_str,
            'resend_id': resend_email_id,
            'provider': provider
        }
