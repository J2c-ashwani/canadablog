import re
from datetime import datetime, timedelta

class IntentVerifier:
    """
    Module 1B: Intent Verification Engine
    Verifies that detected signals are recent (< 365 days, ideally < 90 days),
    from credible sources, and represent actual growth/expansion rather than routine replacements.
    """

    TRUSTED_DOMAINS = [
        'canada.ca', 'ontario.ca', 'nserc-crsng.gc.ca', 'nrc.canada.ca',
        'newswire.ca', 'businesswire.com', 'techcrunch.com', 'betakit.com',
        'globeandmail.com', 'financialpost.com', 'linkedin.com'
    ]

    @classmethod
    def verify_signal(cls, signal_type, description, source_url, signal_date_str):
        reasons = []
        is_verified = True

        # 1. Date Recency Check (< 365 days old)
        try:
            signal_date = datetime.strptime(signal_date_str, '%Y-%m-%d')
            days_old = (datetime.now() - signal_date).days
            if days_old > 365:
                is_verified = False
                reasons.append(f"Signal is stale ({days_old} days old > 365 day max limit)")
            elif days_old <= 90:
                reasons.append(f"High-recency signal detected ({days_old} days old)")
        except ValueError:
            is_verified = False
            reasons.append("Invalid or unparseable signal date format")

        # 2. Source Credibility Check
        domain_match = any(domain in source_url.lower() for domain in cls.TRUSTED_DOMAINS)
        if domain_match:
            reasons.append("Source verified from trusted tier-1 news/registry domain")
        else:
            reasons.append("Secondary market signal source")

        # 3. Context & Negative Keyword Filtering (e.g. routine hiring vs replacement/layoff)
        negative_keywords = ['layoff', 'downsizing', 'closing', 'bankruptcy', 'lawsuit', 'replacement']
        desc_lower = description.lower()
        found_negatives = [kw for kw in negative_keywords if kw in desc_lower]
        if found_negatives:
            is_verified = False
            reasons.append(f"Signal contains negative context indicators: {', '.join(found_negatives)}")
        else:
            reasons.append("Positive expansion intent context verified")

        return {
            'is_verified': is_verified,
            'verification_reason': '; '.join(reasons)
        }

if __name__ == '__main__':
    res = IntentVerifier.verify_signal(
        signal_type='R&D_hiring',
        description='Company expands AI software team by hiring 5 senior engineers in Toronto.',
        source_url='https://betakit.com/company-expands-ai-team',
        signal_date_str=datetime.now().strftime('%Y-%m-%d')
    )
    print("Verification Test Result:", res)
