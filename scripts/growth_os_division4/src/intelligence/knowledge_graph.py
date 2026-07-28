class KnowledgeGraph:
    """
    Module 4B: Growth OS Knowledge Graph & AI Explainability Engine (Module 3B)
    Relational ontology mapping Signals & Company Context -> Programs -> Value Guides -> Products.
    """

    PROGRAM_MAP = {
        'R&D_hiring': {
            'program': 'SR&ED Tax Credit Program & IRAP Innovation Grant',
            'guides': [
                {'title': 'Complete SR&ED Tax Credit Guide', 'slug': 'sred-guide', 'url': 'https://fsidigital.com/guides/sred'},
                {'title': 'IRAP Innovation Funding Playbook', 'slug': 'irap-guide', 'url': 'https://fsidigital.com/guides/irap'}
            ],
            'products': ['SR&ED Calculator', 'IRAP Funding Report', 'Full Filing Package']
        },
        'facility_expansion': {
            'program': 'Manufacturing & Regional Economic Development Fund',
            'guides': [
                {'title': 'Manufacturing Equipment & Facility Expansion Grants', 'slug': 'manufacturing-funding', 'url': 'https://fsidigital.com/guides/manufacturing'},
                {'title': 'Industrial Automation Tax Credits', 'slug': 'automation-credits', 'url': 'https://fsidigital.com/guides/automation'}
            ],
            'products': ['Equipment Funding Calculator', 'Regional Grant Bundle']
        },
        'export_expansion': {
            'program': 'CanExport & International Market Expansion Grant',
            'guides': [
                {'title': 'CanExport Grant Application Guide', 'slug': 'canexport-guide', 'url': 'https://fsidigital.com/guides/canexport'}
            ],
            'products': ['Export Grant Assessment', 'Global Expansion Bundle']
        },
        'net_zero_init': {
            'program': 'Clean Technology & Net-Zero Transition Fund',
            'guides': [
                {'title': 'Clean Tech Investment Tax Credit Guide', 'slug': 'cleantech-guide', 'url': 'https://fsidigital.com/guides/cleantech'}
            ],
            'products': ['Clean Tech Tax Calculator']
        }
    }

    @classmethod
    def resolve_recommendations(cls, verified_signals, company_info):
        recommended_guides = []
        explainability_reasons = []

        seen_slugs = set()

        for sig in verified_signals:
            stype = sig.get('signal_type')
            desc = sig.get('description', '')
            if stype in cls.PROGRAM_MAP:
                mapping = cls.PROGRAM_MAP[stype]
                explainability_reasons.append(f"Detected verified {stype.replace('_', ' ')}: '{desc}'")
                
                for g in mapping['guides']:
                    if g['slug'] not in seen_slugs:
                        seen_slugs.add(g['slug'])
                        recommended_guides.append(g)

        # Fallback if no specific signal map matched
        if not recommended_guides:
            recommended_guides.append({
                'title': 'Canada Small Business & Innovation Grants Guide',
                'slug': 'small-business-funding',
                'url': 'https://fsidigital.com/guides/small-business'
            })
            explainability_reasons.append("Defaulted to general small business funding guide based on Canadian incorporation status")

        return {
            'recommended_guides': recommended_guides[:2], # Limit to max 2 guides per rule
            'explainability_reasons': explainability_reasons
        }

if __name__ == '__main__':
    sigs = [{'signal_type': 'R&D_hiring', 'description': 'Hired 4 AI Engineers'}]
    comp = {'company_name': 'Acme AI'}
    res = KnowledgeGraph.resolve_recommendations(sigs, comp)
    print("Knowledge Graph Output:", res)
