import json
from src.database.db import get_connection

class TimelineManager:
    """
    Module 15: Company Relationship Timeline Manager
    Maintains a unified chronological event history per company to ensure thread continuity.
    """

    @classmethod
    def log_event(cls, company_id, event_type, summary, metadata=None):
        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute("""
            INSERT INTO company_timeline_events (id, company_id, event_type, summary, metadata)
            VALUES (lower(hex(randomblob(16))), ?, ?, ?, ?)
        """, (company_id, event_type, summary, json.dumps(metadata or {})))

        conn.commit()
        conn.close()
        print(f"Timeline Event Logged [{event_type}]: {summary} (Company ID: {company_id})")

    @classmethod
    def get_timeline(cls, company_id):
        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute("""
            SELECT event_type, summary, metadata, created_at
            FROM company_timeline_events
            WHERE company_id = ?
            ORDER BY created_at ASC
        """, (company_id,))

        rows = cursor.fetchall()
        conn.close()

        timeline = []
        for r in rows:
            timeline.append({
                'event_type': r['event_type'],
                'summary': r['summary'],
                'metadata': json.loads(r['metadata'] or '{}'),
                'created_at': r['created_at']
            })

        return timeline

if __name__ == '__main__':
    TimelineManager.log_event("comp_123", "signal_detected", "R&D hiring signal detected")
    print("Fetched Timeline:", TimelineManager.get_timeline("comp_123"))
