import json
from src.database.db import get_connection
from src.engagement.timeline_manager import TimelineManager

class RevenueAttributionEngine:
    """
    Module 8B: Multi-Touch Revenue Attribution Engine
    Maps exact dollar revenue from digital product sales ($9-$79) and filing services ($3,000-$8,000)
    back to originating outreach emails, campaign variants, and recommended guides.
    """

    @classmethod
    def record_revenue_event(cls, company_id, product_name, revenue_amount, outreach_email_id=None, variant_id=None):
        conn = get_connection()
        cursor = conn.cursor()

        # If email ID wasn't directly passed, find latest sent email for this company
        if not outreach_email_id:
            cursor.execute("""
                SELECT id, experiment_variant_id, recommended_guides 
                FROM outreach_emails 
                WHERE company_id = ? AND status = 'Sent'
                ORDER BY sent_at DESC LIMIT 1
            """, (company_id,))
            email_row = cursor.fetchone()
            if email_row:
                outreach_email_id = email_row['id']
                variant_id = email_row['experiment_variant_id']

        # 1. Record Revenue Attribution Log
        cursor.execute("""
            INSERT INTO revenue_attribution (company_id, outreach_email_id, experiment_variant_id, product_purchased, revenue_amount, currency)
            VALUES (?, ?, ?, ?, ?, 'USD')
        """, (company_id, outreach_email_id, variant_id, product_name, revenue_amount))

        # 2. Update Experiment Variant Revenue Performance
        if variant_id:
            cursor.execute("""
                UPDATE campaign_variants
                SET total_revenue = total_revenue + ?, total_clicked = total_clicked + 1
                WHERE id = ?
            """, (revenue_amount, variant_id))

        # 3. Update Guide Effectiveness Scores
        if outreach_email_id:
            cursor.execute("SELECT recommended_guides FROM outreach_emails WHERE id = ?", (outreach_email_id,))
            e_row = cursor.fetchone()
            if e_row and e_row['recommended_guides']:
                guides = json.loads(e_row['recommended_guides'])
                for g in guides:
                    slug = g['slug']
                    title = g['title']
                    cursor.execute("""
                        INSERT INTO guide_performance (id, guide_slug, guide_title, total_sent, total_clicks, total_conversions, total_revenue)
                        VALUES (lower(hex(randomblob(16))), ?, ?, 1, 1, 1, ?)
                        ON CONFLICT(guide_slug) DO UPDATE SET
                            total_conversions = total_conversions + 1,
                            total_revenue = total_revenue + ?,
                            effectiveness_score = ((total_clicks * 0.3) + (total_conversions * 0.4) + (total_revenue * 0.3))
                    """, (slug, title, revenue_amount, revenue_amount))

        conn.commit()
        conn.close()

        # 4. Log Timeline Event
        TimelineManager.log_event(company_id, "revenue_attributed", f"Purchased '{product_name}' for ${revenue_amount:.2f} USD")

        return {
            'success': True,
            'company_id': company_id,
            'product': product_name,
            'revenue': revenue_amount,
            'attributed_email': outreach_email_id
        }

if __name__ == '__main__':
    res = RevenueAttributionEngine.record_revenue_event('comp_32047', '$79 SR&ED Funding Bundle', 79.00)
    print("Revenue Attribution Result:", res)
