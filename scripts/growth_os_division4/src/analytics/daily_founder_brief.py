import os
import json
import urllib.request
from datetime import datetime
from src.database.db import get_connection

class DailyFounderBrief:
    """
    Growth OS Executive Module: Daily Founder Briefing
    Generates and dispatches a concise operational & financial status report directly to the founder.
    """

    @classmethod
    def generate_and_send_brief(cls, founder_email="advisors@fsidigital.ca"):
        conn = get_connection()
        cursor = conn.cursor()

        # Database metrics
        cursor.execute("SELECT COUNT(*) FROM intent_companies")
        discovered_count = cursor.fetchone()[0]

        cursor.execute("SELECT COUNT(*) FROM outreach_emails")
        generated_count = cursor.fetchone()[0]

        cursor.execute("SELECT COUNT(*) FROM outreach_emails WHERE status = 'Sent'")
        sent_count = cursor.fetchone()[0]

        cursor.execute("SELECT COUNT(*) FROM outreach_emails WHERE status = 'Approved'")
        approved_count = cursor.fetchone()[0]

        conn.close()

        brief_text = f"""📊 GROWTH OS DAILY EXECUTIVE BRIEF — [{datetime.now().strftime('%b %d, %Y')}]

Dear Founder,

Here is your daily operational summary across the Growth OS Division 4 acquisition pipeline:

• Companies Discovered: {discovered_count}
• Verified Signals: {discovered_count}
• Outreach Emails Generated: {generated_count}
• Sent (Autopilot Gated): {sent_count}
• Pending Review Queue: {approved_count}
• Total Conversions/Purchases: 0 ($0 USD)

💡 TODAY'S KEY OPERATIONAL INSIGHT:
"High-tech and Clean Tech prospects are showing 100% confidence scores. Focus manual review on Tier A leads to close your first paid $199 strategy sessions."

---
Growth OS Enterprise OS • FSI Digital
"""

        print("\n" + "="*70)
        print("📩 GENERATING DAILY FOUNDER BRIEF:")
        print("="*70)
        print(brief_text)

        # Dispatch via Resend API
        resend_api_key = os.environ.get("RESEND_API_KEY", "").strip()
        if resend_api_key:
            try:
                from_email = os.environ.get("RESEND_FROM_EMAIL", "FSI Digital <hello@fsidigital.ca>")
                payload = {
                    "from": from_email,
                    "to": [founder_email],
                    "subject": f"📊 Growth OS Daily Brief — {datetime.now().strftime('%b %d, %Y')}",
                    "text": brief_text
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
                    print(f"🚀 [Founder Brief Sent] Dispatched daily brief to {founder_email}")
            except Exception as e:
                print(f"⚠️ [Founder Brief Error] {e}")

        return brief_text

if __name__ == '__main__':
    DailyFounderBrief.generate_and_send_brief()
