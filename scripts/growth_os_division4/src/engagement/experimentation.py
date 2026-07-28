import json
import random
from src.database.db import get_connection

class ExperimentationEngine:
    """
    Module 14: Campaign Experimentation Engine & A/B Testing
    Manages campaign experiments (Subject line, Email length, CTA style, Guide count).
    Dynamically routes traffic towards winning variants based on conversion performance and revenue.
    """

    @classmethod
    def create_experiment(cls, name, test_type, variants):
        conn = get_connection()
        cursor = conn.cursor()

        exp_id = 'exp_' + str(abs(hash(name)) % 100000)
        cursor.execute("""
            INSERT OR REPLACE INTO campaign_experiments (id, experiment_name, test_type, status)
            VALUES (?, ?, ?, 'Active')
        """, (exp_id, name, test_type))

        variant_ids = []
        for v in variants:
            vid = 'var_' + str(abs(hash(exp_id + v['label'])) % 100000)
            cursor.execute("""
                INSERT OR REPLACE INTO campaign_variants (id, experiment_id, variant_label, payload)
                VALUES (?, ?, ?, ?)
            """, (vid, exp_id, v['label'], json.dumps(v['payload'])))
            variant_ids.append(vid)

        conn.commit()
        conn.close()
        return {'experiment_id': exp_id, 'variant_ids': variant_ids}

    @classmethod
    def select_variant_for_draft(cls, experiment_name='Default Subject Test'):
        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute("SELECT id FROM campaign_experiments WHERE experiment_name = ?", (experiment_name,))
        exp = cursor.fetchone()
        if not exp:
            # Create default subject experiment if none exists
            cls.create_experiment(
                name='Default Subject Test',
                test_type='subject_line',
                variants=[
                    {'label': 'Variant A (Resource)', 'payload': {'subject_template': 'Quick resource for {company}'}},
                    {'label': 'Variant B (Expansion)', 'payload': {'subject_template': 'Noticed your recent expansion at {company}'}},
                    {'label': 'Variant C (Funding)', 'payload': {'subject_template': 'Funding guides for {company}'}}
                ]
            )
            cursor.execute("SELECT id FROM campaign_experiments WHERE experiment_name = ?", (experiment_name,))
            exp = cursor.fetchone()

        exp_id = exp['id']

        # Fetch variants for this experiment
        cursor.execute("SELECT * FROM campaign_variants WHERE experiment_id = ?", (exp_id,))
        variants = cursor.fetchall()

        if not variants:
            conn.close()
            return None

        # Multi-armed bandit / weighted selection based on total revenue and open rate
        weights = []
        for v in variants:
            score = 1.0 + (v['total_revenue'] * 0.1) + (v['total_opened'] * 0.2)
            weights.append(score)

        chosen_variant = random.choices(variants, weights=weights, k=1)[0]

        cursor.execute("UPDATE campaign_variants SET total_sent = total_sent + 1 WHERE id = ?", (chosen_variant['id'],))
        conn.commit()
        conn.close()

        return {
            'variant_id': chosen_variant['id'],
            'label': chosen_variant['variant_label'],
            'payload': json.loads(chosen_variant['payload'])
        }

if __name__ == '__main__':
    v = ExperimentationEngine.select_variant_for_draft()
    print("Selected Variant Result:", v)
