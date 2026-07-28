import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), 'data', 'growth_os.db')

def get_connection():
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_connection()
    cursor = conn.cursor()

    # 1. Target Companies
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS intent_companies (
        id TEXT PRIMARY KEY,
        company_name TEXT NOT NULL,
        domain TEXT UNIQUE NOT NULL,
        industry TEXT,
        province TEXT,
        employee_count TEXT,
        intent_score INTEGER DEFAULT 0,
        funding_confidence_pct INTEGER DEFAULT 0,
        risk_score TEXT DEFAULT 'Low',
        priority_level TEXT DEFAULT 'Medium',
        decision_maker_name TEXT,
        decision_maker_title TEXT,
        email TEXT NOT NULL,
        personalisation_profile TEXT, -- JSON
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    ''')

    # 2. Intent Signals
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS intent_signals (
        id TEXT PRIMARY KEY,
        company_id TEXT NOT NULL,
        signal_type TEXT NOT NULL,
        description TEXT,
        source_url TEXT,
        signal_date TEXT NOT NULL,
        is_verified INTEGER DEFAULT 0,
        verification_reason TEXT,
        score_impact INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (company_id) REFERENCES intent_companies(id) ON DELETE CASCADE
    );
    ''')

    # 3. Campaign Experiments & Variants
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS campaign_experiments (
        id TEXT PRIMARY KEY,
        experiment_name TEXT NOT NULL,
        test_type TEXT NOT NULL,
        status TEXT DEFAULT 'Active',
        winning_variant_id TEXT,
        confidence_score REAL DEFAULT 0.00,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    ''')

    cursor.execute('''
    CREATE TABLE IF NOT EXISTS campaign_variants (
        id TEXT PRIMARY KEY,
        experiment_id TEXT NOT NULL,
        variant_label TEXT NOT NULL,
        payload TEXT NOT NULL, -- JSON
        total_sent INTEGER DEFAULT 0,
        total_opened INTEGER DEFAULT 0,
        total_clicked INTEGER DEFAULT 0,
        total_replied INTEGER DEFAULT 0,
        total_revenue REAL DEFAULT 0.00,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (experiment_id) REFERENCES campaign_experiments(id) ON DELETE CASCADE
    );
    ''')

    # 4. Generated Outreach Emails
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS outreach_emails (
        id TEXT PRIMARY KEY,
        company_id TEXT NOT NULL,
        experiment_variant_id TEXT,
        subject TEXT NOT NULL,
        body_text TEXT NOT NULL,
        recommended_guides TEXT, -- JSON
        explainability_reasons TEXT, -- JSON
        quality_gate_passed INTEGER DEFAULT 0,
        quality_gate_logs TEXT, -- JSON
        risk_rating TEXT DEFAULT 'Low',
        status TEXT DEFAULT 'Pending Review',
        sending_domain TEXT,
        sent_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (company_id) REFERENCES intent_companies(id) ON DELETE CASCADE
    );
    ''')

    # 5. Company Relationship Timeline
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS company_timeline_events (
        id TEXT PRIMARY KEY,
        company_id TEXT NOT NULL,
        event_type TEXT NOT NULL,
        summary TEXT NOT NULL,
        metadata TEXT, -- JSON
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (company_id) REFERENCES intent_companies(id) ON DELETE CASCADE
    );
    ''')

    # 6. Sending Domains (Adaptive Limits)
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS sending_domains (
        id TEXT PRIMARY KEY,
        domain_name TEXT UNIQUE NOT NULL,
        daily_limit INTEGER DEFAULT 50,
        emails_sent_today INTEGER DEFAULT 0,
        health_score REAL DEFAULT 100.00,
        is_active INTEGER DEFAULT 1,
        last_reset_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    ''')

    # 7. Funding Programme Intelligence
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS funding_programmes (
        id TEXT PRIMARY KEY,
        programme_name TEXT NOT NULL,
        governing_body TEXT,
        status TEXT DEFAULT 'Open',
        eligibility_criteria TEXT, -- JSON
        last_scraped_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    ''')

    # 8. Content Gap Signals
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS content_gap_signals (
        id TEXT PRIMARY KEY,
        topic_name TEXT NOT NULL,
        detected_count INTEGER DEFAULT 1,
        sample_company_domains TEXT, -- JSON
        status TEXT DEFAULT 'Open',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    ''')

    # 9. Compliance Suppressions
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS compliance_suppressions (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        domain TEXT NOT NULL,
        reason TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    ''')

    # 10. Multi-Touch Revenue Attribution
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS revenue_attribution (
        id TEXT PRIMARY KEY,
        company_id TEXT NOT NULL,
        outreach_email_id TEXT,
        experiment_variant_id TEXT,
        touchpoint_sequence TEXT, -- JSON
        product_purchased TEXT,
        revenue_amount REAL NOT NULL,
        currency TEXT DEFAULT 'USD',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    ''')

    conn.commit()
    conn.close()
    print("Growth OS Division 4 Database initialized successfully!")

if __name__ == '__main__':
    init_db()
