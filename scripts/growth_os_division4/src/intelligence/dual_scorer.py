class DualScorer:
    """
    Module 3: Dual-Scoring Engine
    Calculates two independent scores:
    1. Intent Score (0-100): How actively is the company investing and growing?
    2. Funding Eligibility Confidence Score (0-100%): How closely do they match program criteria?
    """

    @classmethod
    def calculate_scores(cls, company_data, verified_signals):
        intent_score = 0
        funding_confidence_pct = 40 # Base baseline for Canadian active business

        # 1. Intent Score Weights
        signal_weights = {
            'facility_expansion': 25,
            'R&D_hiring': 20,
            'AI_funding': 20,
            'equipment_purchase': 15,
            'new_incorporation': 10,
            'net_zero_init': 15,
            'export_expansion': 15
        }

        for sig in verified_signals:
            stype = sig.get('signal_type')
            impact = signal_weights.get(stype, 10)
            intent_score += impact

        intent_score = min(100, intent_score)

        # 2. Funding Eligibility Confidence Weights
        industry = company_data.get('industry', '').lower()
        province = company_data.get('province', '').lower()
        emp_count = company_data.get('employee_count', '1-10')

        # Canadian eligibility boost
        canadian_provinces = ['ontario', 'quebec', 'british columbia', 'alberta', 'nova scotia', 'manitoba']
        if any(p in province for p in canadian_provinces):
            funding_confidence_pct += 20

        # R&D / Tech / Manufacturing boost
        eligible_industries = ['technology', 'software', 'manufacturing', 'cleantech', 'agritech', 'healthcare']
        if any(ind in industry for ind in eligible_industries):
            funding_confidence_pct += 25

        # Employee scale check
        if emp_count not in ['0', '1']:
            funding_confidence_pct += 15

        funding_confidence_pct = min(100, funding_confidence_pct)

        # Priority Level
        if intent_score >= 80 and funding_confidence_pct >= 70:
            priority = 'High'
        elif intent_score >= 50:
            priority = 'Medium'
        else:
            priority = 'Low'

        return {
            'intent_score': intent_score,
            'funding_confidence_pct': funding_confidence_pct,
            'priority_level': priority
        }

if __name__ == '__main__':
    comp = {'industry': 'Technology', 'province': 'Ontario', 'employee_count': '10-50'}
    sigs = [
        {'signal_type': 'R&D_hiring'},
        {'signal_type': 'facility_expansion'}
    ]
    res = DualScorer.calculate_scores(comp, sigs)
    print("Dual Scorer Test Result:", res)
