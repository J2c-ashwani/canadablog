import os
import json
import urllib.request
from datetime import datetime

class HotProspectAlert:
    """
    Growth OS Real-Time Module: Hot Prospect Surfacing Engine
    Surfaces high-intent lead signals (multiple opens, long session duration, package selection)
    and sends an immediate direct alert to the founder for manual high-ticket closing.
    """

    @classmethod
    def alert_founder_of_hot_lead(cls, lead_details, founder_email="advisors@fsidigital.ca"):
        company = lead_details.get('company_name', 'High-Intent Prospect')
        email = lead_details.get('email', 'N/A')
        behavior = lead_details.get('behavior_summary', 'Spent 10 minutes on checkout & selected $79 bundle')
        action = lead_details.get('recommended_action', 'Send direct tokenized $199 Audit checkout link')

        alert_text = f"""🔥 HIGH-INTENT PROSPECT DETECTED — ACTION REQUIRED

Company: {company}
Contact Email: {email}
Engagement Score: 100/100 (Tier A Candidate)

BEHAVIOR SUMMARY:
• {behavior}

RECOMMENDED CLOSING ACTION:
👉 {action}

Direct Tokenized Link:
https://www.fsidigital.ca/audit?token=v2_a79f65d390228b9dd0dde738441eb969

---
Growth OS Enterprise OS • FSI Digital
"""

        print("\n" + "="*70)
        print(f"🔥 DISPATCHING HOT PROSPECT ALERT FOR {company}:")
        print("="*70)
        print(alert_text)

        resend_api_key = os.environ.get("RESEND_API_KEY", "").strip()
        if resend_api_key:
            try:
                from_email = os.environ.get("RESEND_FROM_EMAIL", "FSI Digital <hello@fsidigital.ca>")
                payload = {
                    "from": from_email,
                    "to": [founder_email],
                    "subject": f"🔥 Hot Lead Alert: {company} ({email})",
                    "text": alert_text
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
                    print(f"🚀 [Hot Prospect Alert Sent] Alert sent to founder for {company}")
            except Exception as e:
                print(f"⚠️ [Hot Prospect Alert Error] {e}")

        return alert_text

if __name__ == '__main__':
    HotProspectAlert.alert_founder_of_hot_lead({
        'company_name': 'Morency Creative Technologies',
        'email': 'pmorency01@gmail.com',
        'behavior_summary': 'Spent 592 seconds (10 min) on /audit checkout & selected $79 bundle',
        'recommended_action': 'Send personalized $199 strategy session checkout email'
    })
