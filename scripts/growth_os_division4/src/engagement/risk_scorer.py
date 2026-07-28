class RiskScorer:
    """
    Module 18: Outreach Risk Scoring Engine
    Rates email drafts as Low, Medium, or High risk based on signal freshness,
    contact frequency, and funding confidence alignment.
    High-risk drafts require mandatory manual editing before queue approval.
    """

    @classmethod
    def calculate_risk(cls, company_data, verified_signals, confidence_pct, is_quality_gate_passed):
        risk = 'Low'
        reasons = []

        if not is_quality_gate_passed:
            risk = 'High'
            reasons.append("Quality gate failed")

        if confidence_pct < 50:
            risk = 'High' if risk != 'High' else 'High'
            reasons.append("Low funding confidence (<50%) requires careful review")

        if not verified_signals:
            risk = 'Medium'
            reasons.append("No direct primary verified signal; relying on general industry fallback")

        # Check recency of oldest signal
        for sig in verified_signals:
            if 'days_old' in sig and sig['days_old'] > 180:
                if risk == 'Low': risk = 'Medium'
                reasons.append("Signal is > 180 days old")

        if risk == 'Low':
            reasons.append("High signal recency, strong confidence match, clean quality gate")

        return {
            'risk_rating': risk,
            'risk_reasons': reasons
        }

if __name__ == '__main__':
    res = RiskScorer.calculate_risk({'company_name': 'Acme'}, [{'days_old': 30}], 85, True)
    print("Risk Scorer Result:", res)
