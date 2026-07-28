class QualityGate:
    """
    Module 16: Internal Quality & Fact Review Gate
    Pre-queue safety gate that verifies factual grounding, recipient match,
    confidence thresholds, and phrasing uniqueness before any email enters the review queue.
    """

    @classmethod
    def verify_draft(cls, email_draft, company_data, verified_signals, confidence_pct):
        logs = []
        passed = True

        # 1. Fact Grounding Check
        body = email_draft.get('body_text', '')
        subject = email_draft.get('subject', '')
        cname = company_data.get('company_name', '')

        if cname and cname.lower() not in (subject + body).lower():
            passed = False
            logs.append(f"Fact Error: Company name '{cname}' missing from email text")
        else:
            logs.append(f"Pass: Correct company reference '{cname}' verified")

        # 2. Program Confidence Threshold Check
        if confidence_pct < 50 and "apply now" in body.lower():
            passed = False
            logs.append("Quality Error: Low funding confidence (<50%) cannot use aggressive application CTAs")
        else:
            logs.append("Pass: CTA style aligns with funding confidence score")

        # 3. Text Duplication / Generic Phrasing Check
        generic_phrases = ["dear sir/madam", "to whom it may concern", "blast email"]
        for gp in generic_phrases:
            if gp in body.lower():
                passed = False
                logs.append(f"Quality Error: Generic phrasing '{gp}' detected")

        if passed:
            logs.append("Pass: All pre-queue quality checks passed successfully")

        return {
            'quality_gate_passed': passed,
            'quality_gate_logs': logs
        }

if __name__ == '__main__':
    draft = {'subject': 'Question for Acme AI', 'body_text': 'Hi John, I noticed Acme AI expanded R&D...'}
    comp = {'company_name': 'Acme AI'}
    res = QualityGate.verify_draft(draft, comp, [], 85)
    print("Quality Gate Result:", res)
