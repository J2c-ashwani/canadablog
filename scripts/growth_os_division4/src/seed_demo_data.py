from datetime import datetime
from src.database.db import init_db
from src.main_pipeline import GrowthOSPipeline
from src.analytics.revenue_attribution import RevenueAttributionEngine

def seed_sample_companies():
    init_db()

    companies_data = [
        {
            'company': {
                'company_name': 'AeroVanguard Systems Inc.',
                'domain': 'aerovanguard.ca',
                'industry': 'Clean Technology & Aerospace',
                'province': 'Ontario',
                'employee_count': '50-100',
                'decision_maker_name': 'Marcus Vance',
                'decision_maker_title': 'Founder & CEO',
                'email': 'marcus@aerovanguard.ca'
            },
            'signals': [
                {
                    'signal_type': 'net_zero_init',
                    'description': 'Secured $2M net-zero grant for hydrogen propulsion R&D testing.',
                    'source_url': 'https://newswire.ca/aerovanguard-netzero',
                    'signal_date': datetime.now().strftime('%Y-%m-%d')
                },
                {
                    'signal_type': 'R&D_hiring',
                    'description': 'Hiring 12 Propulsion Engineers and Clean Tech Specialists.',
                    'source_url': 'https://betakit.com/aerovanguard-hiring',
                    'signal_date': datetime.now().strftime('%Y-%m-%d')
                }
            ]
        },
        {
            'company': {
                'company_name': 'BioPharma Health Innovations',
                'domain': 'biopharmahealth.ca',
                'industry': 'Healthcare & Medical Devices',
                'province': 'British Columbia',
                'employee_count': '20-50',
                'decision_maker_name': 'Dr. Elena Rostova',
                'decision_maker_title': 'Chief Scientific Officer',
                'email': 'elena@biopharmahealth.ca'
            },
            'signals': [
                {
                    'signal_type': 'R&D_hiring',
                    'description': 'Commenced Phase II clinical trials for non-invasive diagnostic sensors.',
                    'source_url': 'https://techcrunch.com/biopharma-trials',
                    'signal_date': datetime.now().strftime('%Y-%m-%d')
                }
            ]
        },
        {
            'company': {
                'company_name': 'Nordic AgriTech Solutions',
                'domain': 'nordicagri.ca',
                'industry': 'Agriculture & Food Processing',
                'province': 'Alberta',
                'employee_count': '10-50',
                'decision_maker_name': 'Lars Lindqvist',
                'decision_maker_title': 'Managing Director',
                'email': 'lars@nordicagri.ca'
            },
            'signals': [
                {
                    'signal_type': 'facility_expansion',
                    'description': 'Constructing automated indoor vertical farming facility in Calgary.',
                    'source_url': 'https://financialpost.com/nordic-agri-calgary',
                    'signal_date': datetime.now().strftime('%Y-%m-%d')
                },
                {
                    'signal_type': 'export_expansion',
                    'description': 'Announced export expansion into European Union markets.',
                    'source_url': 'https://globeandmail.com/nordic-agri-export',
                    'signal_date': datetime.now().strftime('%Y-%m-%d')
                }
            ]
        }
    ]

    print("🌱 Seeding demo companies into Growth OS Division 4...")
    for item in companies_data:
        res = GrowthOSPipeline.process_company(item['company'], item['signals'])
        print(f"   [+] Processed {res['company_name']} -> Intent Score: {res['intent_score']}, Risk: {res['risk_rating']}")

    # Seed initial realized revenue attribution
    RevenueAttributionEngine.record_revenue_event('comp_aerovanguard', '$79 SR&ED Funding Bundle', 79.00)
    RevenueAttributionEngine.record_revenue_event('comp_nordicagri', 'CanExport Grant Application Package', 4500.00)

    print("\n✅ Seed completed! Open http://localhost:8090 in your web browser to view the live dashboard!")

if __name__ == '__main__':
    seed_sample_companies()
