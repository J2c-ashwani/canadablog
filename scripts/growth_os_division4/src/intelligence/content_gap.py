import json
from src.database.db import get_connection

class ContentGapEngine:
    """
    Module 17: Content Gap & Opportunity Engine
    Detects market demand for topics where Growth OS lacks an existing guide,
    logging gap signals to inform SEO & content creation strategy.
    """

    @classmethod
    def record_unmatched_signal(cls, topic_name, company_domain):
        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute("SELECT * FROM content_gap_signals WHERE topic_name = ?", (topic_name,))
        row = cursor.fetchone()

        if row:
            domains = json.loads(row['sample_company_domains'] or '[]')
            if company_domain not in domains:
                domains.append(company_domain)
            new_count = row['detected_count'] + 1
            cursor.execute("""
                UPDATE content_gap_signals
                SET detected_count = ?, sample_company_domains = ?
                WHERE topic_name = ?
            """, (new_count, json.dumps(domains), topic_name))
        else:
            cursor.execute("""
                INSERT INTO content_gap_signals (id, topic_name, detected_count, sample_company_domains)
                VALUES (lower(hex(randomblob(16))), ?, 1, ?)
            """, (topic_name, json.dumps([company_domain])))

        conn.commit()
        conn.close()
        print(f"Recorded content gap signal for: '{topic_name}' (Company: {company_domain})")

if __name__ == '__main__':
    ContentGapEngine.record_unmatched_signal("Battery Manufacturing Grants", "batterytech.io")
