// lib/data/comparisons.ts

export interface ComparisonPoint {
  dimension: string;
  prog1Value: string;
  prog2Value: string;
}

export interface ProgramComparison {
  slug: string;
  title: string;
  description: string;
  prog1Id: string;
  prog2Id: string;
  points: ComparisonPoint[];
  stackingRecommendation: string;
}

export const comparisonsDatabase: ProgramComparison[] = [
  {
    slug: 'irap-vs-sred',
    title: 'IRAP vs. SR&ED: Comparing Canada’s Top R&D Funding Options',
    description: 'Compare the NRC-IRAP wage subsidy grant against the CRA’s Scientific Research & Experimental Development (SR&ED) tax refund program. Learn how to qualify, calculate yields, and stack them.',
    prog1Id: 'irap-grant',
    prog2Id: 'sred-tax-credit',
    points: [
      {
        dimension: 'Funding Type',
        prog1Value: 'Non-repayable wage grant (pre-approved)',
        prog2Value: 'Refundable/Non-refundable tax credit (filed year-end)'
      },
      {
        dimension: 'Maximum Amount',
        prog1Value: 'Typically $50,000 to $500,000+ (reimburses 50-80% of wages)',
        prog2Value: 'Up to 64% of qualified salaries, 32% of contractors, 55% overhead proxy'
      },
      {
        dimension: 'Timing of Capital',
        prog1Value: 'Front-loaded: monthly reimbursement claims submitted during project',
        prog2Value: 'Retroactive: paid as a tax refund 3–18 months after fiscal year-end'
      },
      {
        dimension: 'Review Criteria',
        prog1Value: 'Commercialization potential, technical innovation, business viability',
        prog2Value: 'Technological uncertainty, systematic investigation, technical advancement'
      },
      {
        dimension: 'Audit Risk',
        prog1Value: 'Low: managed directly via relationship with assigned ITA officer',
        prog2Value: 'Moderate-High: subject to CRA desk reviews and detailed technical audits'
      }
    ],
    stackingRecommendation: `
      <p><strong>Yes, you can and should stack IRAP and SR&ED!</strong> This is the single highest-yielding strategy for Canadian software and hardware startups.</p>
      <p>The stacking workflow operates as follows:</p>
      <ol class="list-decimal pl-6 space-y-2 text-sm text-slate-600">
        <li><strong>Step 1:</strong> Apply for the IRAP wage grant to cover up to 80% of your primary developers' salaries during the active development period.</li>
        <li><strong>Step 2:</strong> At your fiscal year-end, claim the SR&ED tax credit on all remaining eligible expenditures.</li>
        <li><strong>Step 3 (The Grind):</strong> When compiling your SR&ED claim, you must declare the IRAP funding received as "assistance." CRA will deduct (grind) the IRAP amount from your qualified pool, but you will still claim tax refunds on the remaining 20-50% of wages that were paid out-of-pocket.</li>
      </ol>
    `
  },
  {
    slug: 'nsf-vs-nih-sbir',
    title: 'NSF SBIR vs. NIH SBIR: U.S. Federal Innovation Grants Compared',
    description: 'Compare the National Science Foundation (NSF) against the National Institutes of Health (NIH) Small Business Innovation Research (SBIR) program. Learn which deep-tech R&D grants fit your startup.',
    prog1Id: 'nsf-sbir',
    prog2Id: 'nih-sbir',
    points: [
      {
        dimension: 'Primary Focus',
        prog1Value: 'Broad deep-tech: software, AI, hardware, new materials, space tech',
        prog2Value: 'Life sciences: drug discovery, medical devices, diagnostics, digital health'
      },
      {
        dimension: 'Commercialization Model',
        prog1Value: 'High focus on market potential, private funding matching, commercial scale',
        prog2Value: 'Focus on scientific rigour, clinical efficacy, patient impact, NIH relevance'
      },
      {
        dimension: 'Phase I Amount',
        prog1Value: 'Up to $275,000 (usually 6–12 months duration)',
        prog2Value: 'Up to $275,000+ (usually 6–24 months duration)'
      },
      {
        dimension: 'First Contact',
        prog1Value: 'Mandatory 3-page "Project Pitch" portal review before full application',
        prog2Value: 'Optional contact with Program Officer; applications submitted on fixed cycles'
      },
      {
        dimension: 'University Partnership',
        prog1Value: 'Encouraged but optional; small business must lead the research',
        prog2Value: 'STTR option requires university/hospital partnership (min 30% project lead)'
      }
    ],
    stackingRecommendation: `
      <p>Startups cannot stack NSF and NIH funding to cover the exact same technical research project (that is considered "duplicate funding" and is illegal). However, you can stack them across separate project areas:</p>
      <ul class="list-disc pl-6 space-y-2 text-sm text-slate-600">
        <li><strong>Complementary Projects:</strong> Use NIH SBIR to fund the medical validation and clinical testing of your health device, and use NSF SBIR to fund the core machine-learning model or computer vision pipeline that powers it.</li>
        <li><strong>Phase Stacking:</strong> Startups frequently secure an NSF Phase I grant to prove general product feasibility, and then target NIH Phase II or separate clinical study allocations once patient impact criteria are defined.</li>
      </ul>
    `
  },
  {
    slug: 'canexport-vs-step',
    title: 'CanExport SMEs vs. Global NY STEP: Export Marketing Grants Compared',
    description: 'Compare Canada’s CanExport SMEs program against the United States STEP trade expansion program. Choose the right export cost-sharing program for trade shows and marketing.',
    prog1Id: 'canexport',
    prog2Id: 'new-york-step',
    points: [
      {
        dimension: 'Eligible Region',
        prog1Value: 'Federal Canada (all provinces)',
        prog2Value: 'New York State (other states have separate STEP programs)'
      },
      {
        dimension: 'Maximum Amount',
        prog1Value: 'Up to $50,000 (reimburses 50% of project costs)',
        prog2Value: 'Up to $10,000 (reimburses 70% of project costs)'
      },
      {
        dimension: 'Eligible Costs',
        prog1Value: 'Travel, marketing translation, IP protection, trade show booths',
        prog2Value: 'Exhibit space fees, flight tickets, international SEO, translations'
      },
      {
        dimension: 'Min Corporate Revenue',
        prog1Value: '$100,000 to $100 Million (declared in tax history)',
        prog2Value: 'No fixed minimum; must match SBA small business size thresholds'
      },
      {
        dimension: 'Intake Schedule',
        prog1Value: 'Annual cycle starting April (rapidly runs out of funds)',
        prog2Value: 'Rolling intake throughout the fiscal year'
      }
    ],
    stackingRecommendation: `
      <p>Export grants are region-locked based on corporate registration. A Canadian CCPC will use CanExport to subsidize international expansion, whereas a US entity registered in New York will leverage NY STEP. </p>
      <p><strong>Optimization Playbook:</strong></p>
      <ul class="list-disc pl-6 space-y-2 text-sm text-slate-600">
        <li>Always obtain formal written approval <strong>prior</strong> to booking flights or signing contracts with international trade show organizers. Retrospective claims are universally rejected.</li>
        <li>Combine these export travel subsidies with local training grants (such as Ohio TechCred or Ontario Skills Development Fund) to cover the costs of training your sales representatives on localized foreign CRM modules.</li>
      </ul>
    `
  }
];

export function getAllComparisons(): ProgramComparison[] {
  return comparisonsDatabase;
}

export function getComparisonBySlug(slug: string): ProgramComparison | undefined {
  return comparisonsDatabase.find((c) => c.slug === slug);
}
