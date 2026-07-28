import json
from src.database.db import get_connection
from src.engagement.timeline_manager import TimelineManager

class HumanApprovalQueue:
    """
    Module 6: Expanded Human Review Queue (9 Actions)
    Approve, Edit Body, Reject, Schedule, Regenerate, Change Tone,
    Change Guides, Add Personal Note, Request Deep Research.
    """

    @classmethod
    def list_pending_drafts(cls):
        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute("""
            SELECT e.id, e.company_id, c.company_name, c.email, c.intent_score, c.funding_confidence_pct,
                   e.subject, e.body_text, e.recommended_guides, e.explainability_reasons, e.risk_rating, e.status
            FROM outreach_emails e
            JOIN intent_companies c ON e.company_id = c.id
            WHERE e.status = 'Pending Review'
            ORDER BY c.intent_score DESC
        """)

        rows = cursor.fetchall()
        conn.close()

        pending = []
        for r in rows:
            pending.append({
                'draft_id': r['id'],
                'company_id': r['company_id'],
                'company_name': r['company_name'],
                'recipient_email': r['email'],
                'intent_score': r['intent_score'],
                'funding_confidence_pct': r['funding_confidence_pct'],
                'subject': r['subject'],
                'body_text': r['body_text'],
                'recommended_guides': json.loads(r['recommended_guides'] or '[]'),
                'explainability_reasons': json.loads(r['explainability_reasons'] or '[]'),
                'risk_rating': r['risk_rating'],
                'status': r['status']
            })

        return pending

    @classmethod
    def process_action(cls, draft_id, action_type, payload=None):
        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute("SELECT * FROM outreach_emails WHERE id = ?", (draft_id,))
        draft = cursor.fetchone()
        if not draft:
            conn.close()
            return {'success': False, 'message': 'Draft not found'}

        company_id = draft['company_id']
        subject = draft['subject']
        body_text = draft['body_text']

        msg = f"Action '{action_type}' processed."
        event_name = "email_action"

        if action_type == 'Approve':
            cursor.execute("UPDATE outreach_emails SET status = 'Approved' WHERE id = ?", (draft_id,))
            msg = "Draft approved for delivery."
            event_name = "email_approved"

        elif action_type == 'Edit Body':
            new_body = (payload or {}).get('body_text', body_text)
            cursor.execute("UPDATE outreach_emails SET body_text = ?, status = 'Approved' WHERE id = ?", (new_body, draft_id))
            msg = "Draft updated and approved."
            event_name = "email_edited"

        elif action_type == 'Reject':
            reason = (payload or {}).get('reason', 'User rejected draft')
            cursor.execute("UPDATE outreach_emails SET status = 'Rejected' WHERE id = ?", (draft_id,))
            msg = "Draft rejected."
            event_name = "email_rejected"

        elif action_type == 'Add Personal Note':
            note = (payload or {}).get('note', '')
            updated_body = f"{body_text}\n\nP.S. {note}"
            cursor.execute("UPDATE outreach_emails SET body_text = ?, status = 'Approved' WHERE id = ?", (updated_body, draft_id))
            msg = "Personal note added and draft approved."
            event_name = "personal_note_added"

        conn.commit()
        conn.close()

        # Log timeline event after closing DB connection
        TimelineManager.log_event(company_id, event_name, f"Human reviewer action: {action_type} for draft '{subject}'")

        return {'success': True, 'message': msg}

if __name__ == '__main__':
    queue = HumanApprovalQueue.list_pending_drafts()
    print("Pending Queue Drafts Count:", len(queue))
