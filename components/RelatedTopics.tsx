'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Compass } from 'lucide-react';

interface TopicItem {
  slug: string;
  label: string;
  desc: string;
  color: string;
  dot: string;
}

const ALL_TOPICS: Record<string, TopicItem> = {
  'sred-tax-credit-eligibility': {
    slug: 'sred-tax-credit-eligibility',
    label: 'SR&ED Tax Credit Eligibility',
    desc: 'Up to 35% refundable credit on R&D spend',
    color: 'hover:border-blue-300',
    dot: 'bg-blue-500'
  },
  'irap-funding-eligibility': {
    slug: 'irap-funding-eligibility',
    label: 'IRAP Funding Eligibility',
    desc: '$50K–$500K+ wage subsidies for Canadian SMEs',
    color: 'hover:border-emerald-300',
    dot: 'bg-emerald-500'
  },
  'ontario-small-business-grants': {
    slug: 'ontario-small-business-grants',
    label: 'Ontario Small Business Grants',
    desc: 'Provincial and federal grants for Ontario businesses',
    color: 'hover:border-red-300',
    dot: 'bg-red-500'
  },
  'startup-grants-canada': {
    slug: 'startup-grants-canada',
    label: 'Startup Grants Canada',
    desc: 'Non-dilutive funding for early-stage companies',
    color: 'hover:border-violet-300',
    dot: 'bg-violet-500'
  },
  'government-loans-small-business-canada': {
    slug: 'government-loans-small-business-canada',
    label: 'Government Loans for Small Business',
    desc: 'CSBFP, BDC, EDC credit & loan options',
    color: 'hover:border-amber-300',
    dot: 'bg-amber-500'
  },
  'how-to-apply-government-grants-canada': {
    slug: 'how-to-apply-government-grants-canada',
    label: 'How to Apply for Government Grants',
    desc: 'Step-by-step proposal and application guides',
    color: 'hover:border-slate-300',
    dot: 'bg-slate-500'
  },
  'federal-grants-small-business-canada': {
    slug: 'federal-grants-small-business-canada',
    label: 'Federal Small Business Grants',
    desc: 'National non-dilutive programs for Canadian SMEs',
    color: 'hover:border-rose-300',
    dot: 'bg-rose-500'
  },
  'canada-digital-adoption-program-grant': {
    slug: 'canada-digital-adoption-program-grant',
    label: 'Canada Digital Adoption Program',
    desc: 'Up to $15K grants + interest-free tech loans',
    color: 'hover:border-indigo-300',
    dot: 'bg-indigo-500'
  },
  'women-entrepreneur-grants-canada': {
    slug: 'women-entrepreneur-grants-canada',
    label: 'Women Entrepreneur Grants',
    desc: 'WES matching funds and dedicated support paths',
    color: 'hover:border-pink-300',
    dot: 'bg-pink-500'
  },
  'hiring-wage-subsidies-canada': {
    slug: 'hiring-wage-subsidies-canada',
    label: 'Hiring & Wage Subsidies',
    desc: 'Offset developer, intern, and new graduate salaries',
    color: 'hover:border-amber-300',
    dot: 'bg-amber-600'
  },
  'government-grants-for-manufacturing-canada': {
    slug: 'government-grants-for-manufacturing-canada',
    label: 'Manufacturing Grants Canada',
    desc: 'SIF, SWOF, and plant automation offsets',
    color: 'hover:border-slate-300',
    dot: 'bg-slate-600'
  },
  'bc-tech-grant': {
    slug: 'bc-tech-grant',
    label: 'BC Tech Grants',
    desc: 'Innovate BC, Ignite, and provincial tech funding',
    color: 'hover:border-teal-300',
    dot: 'bg-teal-500'
  },
  'alberta-innovates-grant': {
    slug: 'alberta-innovates-grant',
    label: 'Alberta Innovates Grants',
    desc: 'Provincial vouchers, R&D credits, and startup capital',
    color: 'hover:border-indigo-305',
    dot: 'bg-indigo-650'
  },
  'quebec-small-business-grants': {
    slug: 'quebec-small-business-grants',
    label: 'Quebec Small Business Grants',
    desc: 'Provincial capital offsets and hiring incentives',
    color: 'hover:border-blue-400',
    dot: 'bg-blue-600'
  },
  'export-grants-canada': {
    slug: 'export-grants-canada',
    label: 'Export Grants Canada',
    desc: 'CanExport SMEs & EDC trade financing',
    color: 'hover:border-purple-300',
    dot: 'bg-purple-500'
  },
  'clean-tech-grants-canada': {
    slug: 'clean-tech-grants-canada',
    label: 'Clean Tech Grants Canada',
    desc: 'Decarbonization, ACT program, and federal green funds',
    color: 'hover:border-emerald-400',
    dot: 'bg-emerald-600'
  },
  'bdc-small-business-loans': {
    slug: 'bdc-small-business-loans',
    label: 'BDC Small Business Loans',
    desc: 'Direct development capital and online loans up to $100K',
    color: 'hover:border-slate-400',
    dot: 'bg-slate-700'
  },
  'csbfp-loans-canada': {
    slug: 'csbfp-loans-canada',
    label: 'CSBFP Loans Canada',
    desc: 'Government-backed bank financing up to $1.15M',
    color: 'hover:border-amber-400',
    dot: 'bg-amber-500'
  },
  'futurpreneur-startup-funding': {
    slug: 'futurpreneur-startup-funding',
    label: 'Futurpreneur Startup Loans',
    desc: 'Unsecured financing up to $60K for founders under 40',
    color: 'hover:border-violet-400',
    dot: 'bg-violet-600'
  },
  'minority-business-grants-canada': {
    slug: 'minority-business-grants-canada',
    label: 'Minority & Diverse Grants',
    desc: 'Indigenous, Black, newcomer, and inclusive funding',
    color: 'hover:border-slate-400',
    dot: 'bg-slate-500'
  },
  'canada-summer-jobs-wage-subsidy': {
    slug: 'canada-summer-jobs-wage-subsidy',
    label: 'Canada Summer Jobs Subsidy',
    desc: 'Federal minimum wage offsets for hiring students & youth',
    color: 'hover:border-amber-450',
    dot: 'bg-amber-600'
  }
};

export function RelatedTopics() {
  const pathname = usePathname();

  // Only show on guides, download, grants, or specific blog articles to build internal mesh
  const isMatchRoute =
    pathname.startsWith('/guides') ||
    pathname.startsWith('/download') ||
    pathname.startsWith('/grants') ||
    pathname.startsWith('/blog') ||
    pathname.startsWith('/canada');

  if (!isMatchRoute || pathname === '/topics') return null;

  const pathLower = pathname.toLowerCase();

  // Determine which topics are relevant to show
  let topicSlugs: string[] = [];

  if (pathLower.includes('sred')) {
    topicSlugs = ['sred-tax-credit-eligibility', 'irap-funding-eligibility', 'startup-grants-canada'];
  } else if (pathLower.includes('irap')) {
    topicSlugs = ['irap-funding-eligibility', 'sred-tax-credit-eligibility', 'startup-grants-canada'];
  } else if (pathLower.includes('ontario')) {
    topicSlugs = ['ontario-small-business-grants', 'quebec-small-business-grants', 'startup-grants-canada'];
  } else if (pathLower.includes('alberta')) {
    topicSlugs = ['alberta-innovates-grant', 'government-loans-small-business-canada', 'startup-grants-canada'];
  } else if (pathLower.includes('british-columbia') || pathLower.includes('bc-') || pathLower.includes('vancouver')) {
    topicSlugs = ['bc-tech-grant', 'startup-grants-canada', 'irap-funding-eligibility'];
  } else if (pathLower.includes('quebec') || pathLower.includes('quebec-')) {
    topicSlugs = ['quebec-small-business-grants', 'ontario-small-business-grants', 'startup-grants-canada'];
  } else if (
    pathLower.includes('women') ||
    pathLower.includes('wes') ||
    pathLower.includes('bmo') ||
    pathLower.includes('cartier') ||
    pathLower.includes('scotiabank') ||
    pathLower.includes('minority') ||
    pathLower.includes('black') ||
    pathLower.includes('indigenous') ||
    pathLower.includes('diverse')
  ) {
    topicSlugs = ['minority-business-grants-canada', 'women-entrepreneur-grants-canada', 'startup-grants-canada'];
  } else if (
    pathLower.includes('youth') ||
    pathLower.includes('hiring') ||
    pathLower.includes('wage') ||
    pathLower.includes('skills') ||
    pathLower.includes('mitacs') ||
    pathLower.includes('student') ||
    pathLower.includes('summer')
  ) {
    topicSlugs = ['hiring-wage-subsidies-canada', 'canada-summer-jobs-wage-subsidy', 'futurpreneur-startup-funding'];
  } else if (
    pathLower.includes('digital') ||
    pathLower.includes('ai') ||
    pathLower.includes('tech') ||
    pathLower.includes('cdap') ||
    pathLower.includes('software')
  ) {
    topicSlugs = ['canada-digital-adoption-program-grant', 'startup-grants-canada', 'bc-tech-grant'];
  } else if (
    pathLower.includes('export') ||
    pathLower.includes('international') ||
    pathLower.includes('trade') ||
    pathLower.includes('canexport') ||
    pathLower.includes('edc')
  ) {
    topicSlugs = ['export-grants-canada', 'startup-grants-canada', 'how-to-apply-government-grants-canada'];
  } else if (
    pathLower.includes('clean') ||
    pathLower.includes('green') ||
    pathLower.includes('eco') ||
    pathLower.includes('energy') ||
    pathLower.includes('carbon') ||
    pathLower.includes('sustainability')
  ) {
    topicSlugs = ['clean-tech-grants-canada', 'government-grants-for-manufacturing-canada', 'federal-grants-small-business-canada'];
  } else if (pathLower.includes('manufacturing') || pathLower.includes('industrial') || pathLower.includes('plant')) {
    topicSlugs = ['government-grants-for-manufacturing-canada', 'clean-tech-grants-canada', 'government-loans-small-business-canada'];
  } else if (
    pathLower.includes('loan') ||
    pathLower.includes('csbfp') ||
    pathLower.includes('bdc')
  ) {
    topicSlugs = ['csbfp-loans-canada', 'bdc-small-business-loans', 'government-loans-small-business-canada'];
  } else {
    // Default general topics
    topicSlugs = [
      'how-to-apply-government-grants-canada',
      'federal-grants-small-business-canada',
      'startup-grants-canada'
    ];
  }

  // Get active items in current list
  const activeTopics = topicSlugs
    .map((slug) => ALL_TOPICS[slug])
    .filter(Boolean);

  if (activeTopics.length === 0) return null;

  return (
    <div className="bg-slate-50 border-t border-slate-200 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-1.5 bg-indigo-50 text-indigo-700 rounded-lg">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">Related Funding Topics</h3>
            <p className="text-xs text-slate-500">Commercial guides & program eligibility checklists</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeTopics.map((topic) => (
            <Link
              key={topic.slug}
              href={`/topics/${topic.slug}`}
              className={`group flex items-center gap-3 p-5 bg-white border border-slate-200/80 rounded-2xl transition-all ${topic.color} hover:shadow-md`}
            >
              <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${topic.dot} group-hover:scale-110 transition-transform`} />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-slate-800 group-hover:text-slate-950 leading-snug">
                  {topic.label}
                </div>
                <div className="text-xs text-slate-500 mt-1 line-clamp-1">
                  {topic.desc}
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-700 shrink-0 transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
