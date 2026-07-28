class FounderProfileEngine:
    """
    Module 20: Founder Personalisation Profile Engine
    Respectfully analyzes public recipient signals (e.g. LinkedIn posts, speaking topics,
    public writing style) to dynamically adapt email tone (Technical, Conversational, Analytical, Executive).
    """

    TONE_PROFILES = {
        'technical': {
            'greeting_style': 'Direct',
            'vocabulary': 'engineering, technical infrastructure, R&D credits, tax mechanics',
            'length': 'Concise'
        },
        'conversational': {
            'greeting_style': 'Warm',
            'vocabulary': 'growth, scaling team, helpful guides, community',
            'length': 'Medium'
        },
        'analytical': {
            'greeting_style': 'Structured',
            'vocabulary': 'ROI, non-dilutive capital efficiency, grant matching, timelines',
            'length': 'Detailed'
        },
        'executive': {
            'greeting_style': 'Brief',
            'vocabulary': 'strategic growth, capital optimization, government funding',
            'length': 'Very Short'
        }
    }

    @classmethod
    def analyze_profile(cls, title, public_bio=''):
        title_lower = title.lower()
        bio_lower = public_bio.lower()

        if any(w in title_lower or w in bio_lower for w in ['cto', 'engineer', 'developer', 'r&d', 'tech lead']):
            tone = 'technical'
        elif any(w in title_lower or w in bio_lower for w in ['cfo', 'finance', 'investor', 'vp finance']):
            tone = 'analytical'
        elif any(w in title_lower or w in bio_lower for w in ['ceo', 'president', 'managing director']):
            tone = 'executive'
        else:
            tone = 'conversational'

        return {
            'preferred_tone': tone,
            'profile_specs': cls.TONE_PROFILES[tone]
        }

if __name__ == '__main__':
    res = FounderProfileEngine.analyze_profile("Co-Founder & CTO", "Ex-Google engineer building AI robotics.")
    print("Founder Profile Test Result:", res)
